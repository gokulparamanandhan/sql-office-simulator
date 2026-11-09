import { QuestionDefinition } from "./ecom-l1-questions";

export const REST_L5_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "rest-L5-001",
    "domain": "restaurants",
    "level": 5,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Total Food Waste Dollar Loss",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "What is the total dollar cost of all logged culinary waste across our kitchens (quantity wasted times ingredient unit cost)?",
    "context_notes": "CTE joining waste_logs with ingredients, compute SUM(quantity_wasted * unit_cost).",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic"
    ],
    "expected_columns": [
      "total_waste_dollars"
    ],
    "reference_sql": "WITH waste_summary AS (SELECT wl.quantity_wasted * i.unit_cost AS waste_cost FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id) SELECT ROUND(SUM(waste_cost), 2) AS total_waste_dollars FROM waste_summary;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Define CTE waste_summary joining waste_logs with ingredients.",
      "Multiply quantity_wasted by unit_cost and sum the total."
    ],
    "solution_explanation": "Establishes baseline culinary shrinkage loss across all venues.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-002",
    "domain": "restaurants",
    "level": 5,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Waste Loss by Reason Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Break down our kitchen waste cost by reason: Spoilage, Over_Prep, Burnt, Drop. Which reason costs us the most?",
    "context_notes": "CTE grouping waste_logs by reason, computing total dollars lost. ",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "reason",
      "total_waste_loss"
    ],
    "reference_sql": "WITH waste_by_reason AS (SELECT wl.reason, SUM(wl.quantity_wasted * i.unit_cost) AS total_loss FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY wl.reason) SELECT reason, ROUND(total_loss, 2) AS total_waste_loss FROM waste_by_reason ORDER BY total_waste_loss DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Create CTE waste_by_reason joining waste_logs and ingredients.",
      "Group by reason and calculate SUM(quantity_wasted * unit_cost)."
    ],
    "solution_explanation": "Pinpoints primary operational root cause of food waste.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-003",
    "domain": "restaurants",
    "level": 5,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Top Wasted Raw Ingredients",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which specific ingredients generate our highest total waste loss? Rank them from highest dollar loss to lowest.",
    "context_notes": "CTE summing waste dollars per ingredient, joined to ingredients. ",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "ingredient_name",
      "category",
      "total_loss"
    ],
    "reference_sql": "WITH ingredient_loss AS (SELECT i.ingredient_name, i.category, SUM(wl.quantity_wasted * i.unit_cost) AS total_loss FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY i.ingredient_name, i.category) SELECT ingredient_name, category, ROUND(total_loss, 2) AS total_loss FROM ingredient_loss ORDER BY total_loss DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join waste_logs with ingredients inside CTE.",
      "Group by ingredient_name and compute total loss dollars."
    ],
    "solution_explanation": "Identifies key ingredients bleeding kitchen budget.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-004",
    "domain": "restaurants",
    "level": 5,
    "order": 4,
    "difficulty": "warm-up",
    "title": "High-Value Orders Identified via CTE",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Using a CTE to filter VIP checks: find all dining orders exceeding $200, showing order id, server name, and total.",
    "context_notes": "WITH vip_orders AS (SELECT * FROM orders WHERE total_amount > 200).",
    "concepts": [
      "WITH",
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "server_name",
      "total_amount"
    ],
    "reference_sql": "WITH vip_orders AS (SELECT id, server_name, total_amount FROM orders WHERE total_amount > 200.00) SELECT id, server_name, total_amount FROM vip_orders ORDER BY total_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Define CTE vip_orders filtering total_amount > 200.",
      "Select and order by total_amount DESC."
    ],
    "solution_explanation": "Isolates premier dining checks for executive review.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L5-005",
    "domain": "restaurants",
    "level": 5,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Labor Cost Summary by Venue via CTE",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Build a CTE of total labor cost per restaurant, then list venues with labor cost strictly exceeding $300.",
    "context_notes": "WITH venue_labor AS (...) SELECT WHERE labor_cost > 300.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "WHERE"
    ],
    "expected_columns": [
      "restaurant_name",
      "labor_cost"
    ],
    "reference_sql": "WITH venue_labor AS (SELECT r.name AS restaurant_name, ROUND(SUM(s.hours_worked * sm.hourly_rate), 2) AS labor_cost FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id JOIN shifts s ON sm.id = s.staff_id GROUP BY r.name) SELECT restaurant_name, labor_cost FROM venue_labor WHERE labor_cost > 300.00 ORDER BY labor_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates labor cost by joining restaurants, staff, shifts.",
      "Outer query filters WHERE labor_cost > 300."
    ],
    "solution_explanation": "Screens restaurants with elevated labor expense.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L5-006",
    "domain": "restaurants",
    "level": 5,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Spoilage Waste Audit",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Pull all waste log entries specifically flagged as Spoilage, showing ingredient name, quantity wasted, and waste dollar cost.",
    "context_notes": "CTE filtering waste_logs for Spoilage joined to ingredients.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "Arithmetic"
    ],
    "expected_columns": [
      "ingredient_name",
      "quantity_wasted",
      "waste_cost"
    ],
    "reference_sql": "WITH spoilage_records AS (SELECT i.ingredient_name, wl.quantity_wasted, ROUND(wl.quantity_wasted * i.unit_cost, 2) AS waste_cost FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id WHERE wl.reason = 'Spoilage') SELECT ingredient_name, quantity_wasted, waste_cost FROM spoilage_records ORDER BY waste_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE filters waste_logs WHERE reason = Spoilage.",
      "Calculates dollar impact of spoiled goods."
    ],
    "solution_explanation": "Inventory freshness and cold-chain compliance audit.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-007",
    "domain": "restaurants",
    "level": 5,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Server Average Check CTE Benchmark",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Using a CTE for server stats, list servers whose average ticket size is higher than $160.",
    "context_notes": "WITH server_metrics AS (...) SELECT WHERE avg_check > 160.",
    "concepts": [
      "WITH",
      "SELECT",
      "AVG",
      "COUNT",
      "GROUP BY",
      "WHERE"
    ],
    "expected_columns": [
      "server_name",
      "orders_count",
      "avg_check"
    ],
    "reference_sql": "WITH server_metrics AS (SELECT server_name, COUNT(*) AS orders_count, ROUND(AVG(total_amount), 2) AS avg_check FROM orders GROUP BY server_name) SELECT server_name, orders_count, avg_check FROM server_metrics WHERE avg_check > 160.00 ORDER BY avg_check DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE aggregates order count and avg check per server.",
      "Outer query filters WHERE avg_check > 160."
    ],
    "solution_explanation": "Highlights high-performing server sales champions.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-008",
    "domain": "restaurants",
    "level": 5,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Waste Loss by Ingredient Category",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "What is the total food waste cost broken down by ingredient category (Meat, Seafood, Dairy, Produce, Dry Goods)?",
    "context_notes": "CTE grouping waste by ingredient category.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "category_waste_loss"
    ],
    "reference_sql": "WITH category_waste AS (SELECT i.category, SUM(wl.quantity_wasted * i.unit_cost) AS total_loss FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY i.category) SELECT category, ROUND(total_loss, 2) AS category_waste_loss FROM category_waste ORDER BY category_waste_loss DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE groups waste dollars by ingredient category.",
      "Orders from highest category waste to lowest."
    ],
    "solution_explanation": "Departmental kitchen shrinkage allocation.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-009",
    "domain": "restaurants",
    "level": 5,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Popular Dishes With High Margin Using CTE",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Create a CTE of dishes sold at least 8 times, then filter for those with a unit profit margin of at least $15.",
    "context_notes": "WITH popular_dishes AS (...) SELECT WHERE unit_profit >= 15.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "category",
      "total_units",
      "unit_profit"
    ],
    "reference_sql": "WITH popular_dishes AS (SELECT mi.name, mi.category, SUM(oi.quantity) AS total_units, ROUND(mi.price - mi.cost, 2) AS unit_profit FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.name, mi.category, mi.price, mi.cost HAVING SUM(oi.quantity) >= 8) SELECT name, category, total_units, unit_profit FROM popular_dishes WHERE unit_profit >= 15.00 ORDER BY total_units DESC, unit_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE identifies dishes with >= 8 units sold.",
      "Outer query filters unit_profit >= 15."
    ],
    "solution_explanation": "Highlights our high-volume, high-profit culinary gems.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L5-010",
    "domain": "restaurants",
    "level": 5,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Supplier Spend Concentration via CTE",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Using a CTE, find suppliers whose total invoice billing exceeds $15,000 across our restaurants.",
    "context_notes": "WITH vendor_spend AS (...) SELECT WHERE total_spend > 15000.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "WHERE"
    ],
    "expected_columns": [
      "supplier_name",
      "category",
      "total_spend"
    ],
    "reference_sql": "WITH vendor_spend AS (SELECT s.supplier_name, s.category, SUM(ip.total_amount) AS total_spend FROM suppliers s JOIN ingredient_purchases ip ON s.id = ip.supplier_id GROUP BY s.supplier_name, s.category) SELECT supplier_name, category, total_spend FROM vendor_spend WHERE total_spend > 15000.00 ORDER BY total_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates cumulative spend per supplier.",
      "Outer query isolates major tier-1 vendor partnerships."
    ],
    "solution_explanation": "Identifies core enterprise vendor contracts.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-011",
    "domain": "restaurants",
    "level": 5,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Over-Prep Waste Analysis",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find all instances of Over_Prep waste, showing ingredient name, wasted quantity, and total lost money.",
    "context_notes": "CTE filtering waste_logs for Over_Prep.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "Arithmetic"
    ],
    "expected_columns": [
      "ingredient_name",
      "quantity_wasted",
      "waste_cost"
    ],
    "reference_sql": "WITH overprep_records AS (SELECT i.ingredient_name, wl.quantity_wasted, ROUND(wl.quantity_wasted * i.unit_cost, 2) AS waste_cost FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id WHERE wl.reason = 'Over_Prep') SELECT ingredient_name, quantity_wasted, waste_cost FROM overprep_records ORDER BY waste_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE filters waste_logs WHERE reason = Over_Prep.",
      "Calculates financial impact of excessive daily prep."
    ],
    "solution_explanation": "Prep station portioning and batch-size optimization.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-012",
    "domain": "restaurants",
    "level": 5,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Venues With Zero Waste Logs Recorded",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Count the total number of distinct ingredients logged in waste records versus total tracked ingredients.",
    "context_notes": "CTE comparing count of distinct wasted ingredients to total ingredients.",
    "concepts": [
      "WITH",
      "SELECT",
      "COUNT",
      "Arithmetic"
    ],
    "expected_columns": [
      "total_ingredients",
      "wasted_ingredients_count"
    ],
    "reference_sql": "WITH waste_summary AS (SELECT COUNT(DISTINCT ingredient_id) AS wasted_count FROM waste_logs) SELECT (SELECT COUNT(*) FROM ingredients) AS total_ingredients, wasted_count AS wasted_ingredients_count FROM waste_summary;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE counts distinct wasted ingredients.",
      "Compares against total ingredients catalog."
    ],
    "solution_explanation": "Monitors kitchen logging compliance across pantry items.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-013",
    "domain": "restaurants",
    "level": 5,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Running Total of Waste Cost Over Time",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each waste log entry chronologically, compute the running cumulative dollar loss from food waste.",
    "context_notes": "CTE with SUM OVER running total of waste cost.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM OVER",
      "Arithmetic",
      "WINDOW"
    ],
    "expected_columns": [
      "id",
      "log_date",
      "ingredient_name",
      "waste_cost",
      "running_waste_loss"
    ],
    "reference_sql": "WITH logged_waste AS (SELECT wl.id, wl.log_date, i.ingredient_name, ROUND(wl.quantity_wasted * i.unit_cost, 2) AS waste_cost FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id) SELECT id, log_date, ingredient_name, waste_cost, ROUND(SUM(waste_cost) OVER (ORDER BY log_date, id), 2) AS running_waste_loss FROM logged_waste ORDER BY log_date, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE computes individual waste ticket dollar cost.",
      "Outer query applies SUM() OVER running total."
    ],
    "solution_explanation": "Chronological accumulation of kitchen waste loss.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-014",
    "domain": "restaurants",
    "level": 5,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Reservation Conversion Funnel CTE",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Build a CTE of reservation counts by status (confirmed, seated, completed) and calculate total bookings.",
    "context_notes": "WITH status_counts AS (...) SELECT breakdown with percentage.",
    "concepts": [
      "WITH",
      "SELECT",
      "COUNT",
      "SUM",
      "GROUP BY"
    ],
    "expected_columns": [
      "status",
      "booking_count"
    ],
    "reference_sql": "WITH status_counts AS (SELECT status, COUNT(*) AS booking_count FROM reservations GROUP BY status) SELECT status, booking_count FROM status_counts ORDER BY booking_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE groups reservations by status.",
      "Provides clean front-of-house booking stage breakdown."
    ],
    "solution_explanation": "Booking pipeline status report for host management.",
    "xp": 30,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L5-015",
    "domain": "restaurants",
    "level": 5,
    "order": 15,
    "difficulty": "warm-up",
    "title": "High Earning Shifts Identified via CTE",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Using a CTE, find all shifts where the total wage expense exceeded $200.00.",
    "context_notes": "WITH shift_wages AS (...) SELECT WHERE wage_cost > 200.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "Arithmetic",
      "WHERE"
    ],
    "expected_columns": [
      "staff_name",
      "role",
      "shift_type",
      "shift_wage"
    ],
    "reference_sql": "WITH shift_wages AS (SELECT sm.name AS staff_name, sm.role, s.shift_type, ROUND(s.hours_worked * sm.hourly_rate, 2) AS shift_wage FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id) SELECT staff_name, role, shift_type, shift_wage FROM shift_wages WHERE shift_wage > 200.00 ORDER BY shift_wage DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates labor cost per shift.",
      "Outer query filters WHERE shift_wage > 200."
    ],
    "solution_explanation": "Flags top single-shift payroll disbursements.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-016",
    "domain": "restaurants",
    "level": 5,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Wasted Quantity as Share of Current Stock",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each wasted ingredient, compute total quantity wasted and compare it as a percentage against current stock.",
    "context_notes": "CTE summing waste per ingredient and dividing by current_stock_qty.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "ingredient_name",
      "total_wasted",
      "current_stock",
      "waste_to_stock_pct"
    ],
    "reference_sql": "WITH ingredient_waste AS (SELECT i.ingredient_name, i.current_stock_qty, SUM(wl.quantity_wasted) AS total_wasted FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY i.ingredient_name, i.current_stock_qty) SELECT ingredient_name, ROUND(total_wasted, 2) AS total_wasted, current_stock_qty AS current_stock, ROUND((total_wasted / current_stock_qty) * 100, 1) AS waste_to_stock_pct FROM ingredient_waste ORDER BY waste_to_stock_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates total quantity wasted per ingredient.",
      "Computes ratio of wasted stock to on-hand inventory."
    ],
    "solution_explanation": "Highlights ingredients suffering from high inventory shrinkage.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-017",
    "domain": "restaurants",
    "level": 5,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Wine Cellar Revenue Leaderboard via CTE",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Create a CTE of beverage sales and return all drinks that have produced over $150 in gross revenue.",
    "context_notes": "WITH drink_sales AS (...) SELECT WHERE revenue > 150.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "units_sold",
      "gross_revenue"
    ],
    "reference_sql": "WITH drink_sales AS (SELECT mi.name, SUM(oi.quantity) AS units_sold, ROUND(SUM(oi.quantity * mi.price), 2) AS gross_revenue FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id WHERE mi.category = 'beverage' GROUP BY mi.name) SELECT name, units_sold, gross_revenue FROM drink_sales WHERE gross_revenue > 150.00 ORDER BY gross_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE filters for beverages and calculates gross revenue.",
      "Outer query isolates top-shelf revenue leaders."
    ],
    "solution_explanation": "Cellar sales champions list for wine list optimization.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L5-018",
    "domain": "restaurants",
    "level": 5,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Burnt and Dropped Kitchen Food Waste",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find all culinary waste caused by execution errors (Burnt or Drop): ingredient, quantity, cost, and reason.",
    "context_notes": "CTE filtering waste_logs for Burnt or Drop.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "IN",
      "Arithmetic"
    ],
    "expected_columns": [
      "ingredient_name",
      "reason",
      "quantity_wasted",
      "error_cost"
    ],
    "reference_sql": "WITH execution_errors AS (SELECT i.ingredient_name, wl.reason, wl.quantity_wasted, ROUND(wl.quantity_wasted * i.unit_cost, 2) AS error_cost FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id WHERE wl.reason IN ('Burnt', 'Drop')) SELECT ingredient_name, reason, quantity_wasted, error_cost FROM execution_errors ORDER BY error_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE filters for culinary handling errors: Burnt and Drop.",
      "Calculates dollar cost of kitchen execution mishaps."
    ],
    "solution_explanation": "Line cook execution and culinary training audit.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-019",
    "domain": "restaurants",
    "level": 5,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Venues With Multiple High Spend Invoices CTE",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Build a CTE of procurement invoices > $2,000, and find restaurants that have 2 or more such invoices.",
    "context_notes": "WITH big_invoices AS (...) GROUP BY restaurant HAVING COUNT >= 2.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "restaurant_name",
      "big_invoice_count"
    ],
    "reference_sql": "WITH big_invoices AS (SELECT r.name AS restaurant_name, ip.total_amount FROM ingredient_purchases ip JOIN restaurants r ON ip.restaurant_id = r.id WHERE ip.total_amount > 2000.00) SELECT restaurant_name, COUNT(*) AS big_invoice_count FROM big_invoices GROUP BY restaurant_name HAVING COUNT(*) >= 2 ORDER BY big_invoice_count DESC, restaurant_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE filters purchases > 2000.",
      "Outer query groups by restaurant with HAVING COUNT(*) >= 2."
    ],
    "solution_explanation": "Audits repeated high-ticket procurement outlays.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L5-020",
    "domain": "restaurants",
    "level": 5,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Server Average Table Turn Proxy via CTE",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Using a CTE, calculate each server total checks, gross revenue, and rank them by average bill size.",
    "context_notes": "WITH server_pnl AS (...) SELECT with DENSE_RANK.",
    "concepts": [
      "WITH",
      "SELECT",
      "COUNT",
      "SUM",
      "AVG",
      "DENSE_RANK"
    ],
    "expected_columns": [
      "server_name",
      "checks_served",
      "total_sales",
      "avg_check",
      "rank_by_check"
    ],
    "reference_sql": "WITH server_pnl AS (SELECT server_name, COUNT(*) AS checks_served, ROUND(SUM(total_amount), 2) AS total_sales, ROUND(AVG(total_amount), 2) AS avg_check FROM orders GROUP BY server_name) SELECT server_name, checks_served, total_sales, avg_check, DENSE_RANK() OVER (ORDER BY avg_check DESC) AS rank_by_check FROM server_pnl ORDER BY rank_by_check;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE computes order count, total sales, and avg check.",
      "Outer query ranks servers by avg check using DENSE_RANK()."
    ],
    "solution_explanation": "Floor sales upselling proficiency ranking.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L5-021",
    "domain": "restaurants",
    "level": 5,
    "order": 21,
    "difficulty": "warm-up",
    "title": "High Waste Days Identified via CTE",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which dates saw the highest food waste loss? Show log date and total waste dollars lost, highest first.",
    "context_notes": "CTE grouping waste_logs by log_date.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "log_date",
      "daily_waste_loss"
    ],
    "reference_sql": "WITH daily_waste AS (SELECT wl.log_date, SUM(wl.quantity_wasted * i.unit_cost) AS daily_loss FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY wl.log_date) SELECT log_date, ROUND(daily_loss, 2) AS daily_waste_loss FROM daily_waste ORDER BY daily_waste_loss DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE groups waste dollars by log_date.",
      "Orders days by waste magnitude."
    ],
    "solution_explanation": "Spots specific calendar dates with elevated kitchen shrinkage.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-022",
    "domain": "restaurants",
    "level": 5,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Staff Compensation Tier Breakdown CTE",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Group staff members into compensation tiers: Senior (>= $28/hr), Mid ($22-$27.99), Entry (< $22) and count headcount.",
    "context_notes": "WITH wage_tiers AS (...) SELECT tier and headcount.",
    "concepts": [
      "WITH",
      "SELECT",
      "CASE WHEN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "wage_tier",
      "staff_count"
    ],
    "reference_sql": "WITH wage_tiers AS (SELECT CASE WHEN hourly_rate >= 28.00 THEN 'Senior Tier (>= $28)' WHEN hourly_rate >= 22.00 THEN 'Mid Tier ($22-$27.99)' ELSE 'Entry Tier (< $22)' END AS wage_tier FROM staff_members) SELECT wage_tier, COUNT(*) AS staff_count FROM wage_tiers GROUP BY wage_tier ORDER BY staff_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE categorizes staff into compensation tiers.",
      "Outer query counts staff members per tier."
    ],
    "solution_explanation": "Workforce compensation distribution overview.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-023",
    "domain": "restaurants",
    "level": 5,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Total Spend on Seafood vs Meat via CTE",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Compare total procurement spend on Meat vs Seafood suppliers using a CTE and conditional aggregation.",
    "context_notes": "WITH supplier_spend AS (...) SELECT CASE WHEN comparison.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "CASE WHEN",
      "GROUP BY"
    ],
    "expected_columns": [
      "meat_spend",
      "seafood_spend"
    ],
    "reference_sql": "WITH supplier_spend AS (SELECT s.category, SUM(ip.total_amount) AS total_spend FROM ingredient_purchases ip JOIN suppliers s ON ip.supplier_id = s.id GROUP BY s.category) SELECT ROUND(SUM(CASE WHEN category = 'Meat' THEN total_spend ELSE 0 END), 2) AS meat_spend, ROUND(SUM(CASE WHEN category = 'Seafood' THEN total_spend ELSE 0 END), 2) AS seafood_spend FROM supplier_spend;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE aggregates spend by supplier category.",
      "Outer query pivots Meat vs Seafood spend side-by-side."
    ],
    "solution_explanation": "Protein procurement budget comparison.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L5-024",
    "domain": "restaurants",
    "level": 5,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Dishes With Zero Waste Ever Logged",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "List ingredients that have NEVER had any waste logged against them in the waste logs table.",
    "context_notes": "WITH wasted_ids AS (...) SELECT ingredients WHERE id NOT IN.",
    "concepts": [
      "WITH",
      "SELECT",
      "WHERE",
      "NOT IN",
      "ORDER BY"
    ],
    "expected_columns": [
      "ingredient_name",
      "category",
      "unit_cost"
    ],
    "reference_sql": "WITH wasted_ids AS (SELECT DISTINCT ingredient_id FROM waste_logs) SELECT ingredient_name, category, unit_cost FROM ingredients WHERE id NOT IN (SELECT ingredient_id FROM wasted_ids) ORDER BY ingredient_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE selects distinct ingredient IDs from waste_logs.",
      "Outer query filters ingredients NOT IN this set."
    ],
    "solution_explanation": "Flawless stock items with zero recorded loss.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-025",
    "domain": "restaurants",
    "level": 5,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Average Hourly Wage by Role CTE",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Using a CTE, calculate average hourly wage by role and list roles paying above the overall company average wage.",
    "context_notes": "WITH role_wages AS (...) SELECT WHERE avg_rate > company_avg.",
    "concepts": [
      "WITH",
      "SELECT",
      "AVG",
      "GROUP BY",
      "WHERE",
      "Subquery"
    ],
    "expected_columns": [
      "role",
      "avg_hourly_rate"
    ],
    "reference_sql": "WITH role_wages AS (SELECT role, ROUND(AVG(hourly_rate), 2) AS avg_hourly_rate FROM staff_members GROUP BY role) SELECT role, avg_hourly_rate FROM role_wages WHERE avg_hourly_rate > (SELECT AVG(hourly_rate) FROM staff_members) ORDER BY avg_hourly_rate DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates average wage per role.",
      "Outer query filters roles above overall mean."
    ],
    "solution_explanation": "Identifies premium culinary and management roles.",
    "xp": 35,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L5-026",
    "domain": "restaurants",
    "level": 5,
    "order": 26,
    "difficulty": "core",
    "title": "Net Recipe Profit After Factoring Waste Loss",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each ingredient category, calculate gross recipe revenue and subtract food waste dollar loss to find Net Culinary Yield.",
    "context_notes": "Chained CTEs: revenue per category, waste per category, joined on category.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "category",
      "gross_revenue",
      "waste_loss",
      "net_culinary_yield"
    ],
    "reference_sql": "WITH cat_revenue AS (SELECT mi.category, SUM(oi.quantity * mi.price) AS revenue FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.category), cat_waste AS (SELECT i.category, SUM(wl.quantity_wasted * i.unit_cost) AS waste FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY i.category) SELECT r.category, ROUND(r.revenue, 2) AS gross_revenue, ROUND(COALESCE(w.waste, 0), 2) AS waste_loss, ROUND(r.revenue - COALESCE(w.waste, 0), 2) AS net_culinary_yield FROM cat_revenue r LEFT JOIN cat_waste w ON LOWER(r.category) = LOWER(w.category) ORDER BY net_culinary_yield DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 calculates gross sales by category.",
      "CTE 2 calculates waste dollar loss by category.",
      "Join both to determine net culinary yield."
    ],
    "solution_explanation": "True culinary margin accounting for kitchen shrinkage.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-027",
    "domain": "restaurants",
    "level": 5,
    "order": 27,
    "difficulty": "core",
    "title": "Venue Prime Cost Statement via Chained CTEs",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each restaurant, compute Food Purchases, Labor Payroll, and total Prime Cost (Purchases + Labor) using chained CTEs.",
    "context_notes": "Chained CTEs: venue_purchases, venue_labor, joined to restaurants.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "LEFT JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "food_purchases",
      "labor_cost",
      "total_prime_cost"
    ],
    "reference_sql": "WITH venue_purchases AS (SELECT restaurant_id, SUM(total_amount) AS purchases FROM ingredient_purchases GROUP BY restaurant_id), venue_labor AS (SELECT sm.restaurant_id, SUM(s.hours_worked * sm.hourly_rate) AS labor FROM staff_members sm JOIN shifts s ON sm.id = s.staff_id GROUP BY sm.restaurant_id) SELECT r.name AS restaurant_name, r.city, ROUND(COALESCE(vp.purchases, 0), 2) AS food_purchases, ROUND(COALESCE(vl.labor, 0), 2) AS labor_cost, ROUND(COALESCE(vp.purchases, 0) + COALESCE(vl.labor, 0), 2) AS total_prime_cost FROM restaurants r LEFT JOIN venue_purchases vp ON r.id = vp.restaurant_id LEFT JOIN venue_labor vl ON r.id = vl.restaurant_id WHERE vp.purchases IS NOT NULL OR vl.labor IS NOT NULL ORDER BY total_prime_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 calculates procurement spend per restaurant.",
      "CTE 2 calculates labor expense per restaurant.",
      "Outer query combines both into corporate Prime Cost."
    ],
    "solution_explanation": "Foundational restaurant unit-level prime cost statement.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L5-028",
    "domain": "restaurants",
    "level": 5,
    "order": 28,
    "difficulty": "core",
    "title": "Server Net Floor Contribution",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each server, calculate gross order sales, estimated labor cost (hours * rate), and server net floor margin.",
    "context_notes": "Chained CTEs: server_sales from orders, server_labor from shifts, joined on server name.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "server_name",
      "gross_sales",
      "labor_cost",
      "net_floor_margin"
    ],
    "reference_sql": "WITH server_sales AS (SELECT server_name, SUM(total_amount) AS sales FROM orders GROUP BY server_name), server_labor AS (SELECT sm.name AS server_name, SUM(s.hours_worked * sm.hourly_rate) AS labor FROM staff_members sm JOIN shifts s ON sm.id = s.staff_id WHERE sm.role = 'Server' GROUP BY sm.name) SELECT ss.server_name, ROUND(ss.sales, 2) AS gross_sales, ROUND(COALESCE(sl.labor, 0), 2) AS labor_cost, ROUND(ss.sales - COALESCE(sl.labor, 0), 2) AS net_floor_margin FROM server_sales ss LEFT JOIN server_labor sl ON ss.server_name = sl.server_name ORDER BY net_floor_margin DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 computes total sales generated per server.",
      "CTE 2 computes wage dollars earned by that server.",
      "Computes net floor contribution per staff member."
    ],
    "solution_explanation": "Server return-on-labor investment index.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "rest-L5-029",
    "domain": "restaurants",
    "level": 5,
    "order": 29,
    "difficulty": "core",
    "title": "Shrinkage Rate: Food Waste vs Procurement Spend",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Calculate our company-wide food shrinkage rate: total waste dollars divided by total ingredient purchases as a percentage.",
    "context_notes": "Chained CTEs: total_waste, total_purchases, compute ratio.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "Arithmetic"
    ],
    "expected_columns": [
      "total_waste_cost",
      "total_purchases_cost",
      "shrinkage_rate_pct"
    ],
    "reference_sql": "WITH waste_total AS (SELECT SUM(wl.quantity_wasted * i.unit_cost) AS total_waste FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id), purchase_total AS (SELECT SUM(total_amount) AS total_purchases FROM ingredient_purchases) SELECT ROUND(wt.total_waste, 2) AS total_waste_cost, ROUND(pt.total_purchases, 2) AS total_purchases_cost, ROUND((wt.total_waste / pt.total_purchases) * 100, 2) AS shrinkage_rate_pct FROM waste_total wt CROSS JOIN purchase_total pt;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 sums total food waste dollars.",
      "CTE 2 sums total ingredient procurement spend.",
      "Cross join to compute global shrinkage rate percentage."
    ],
    "solution_explanation": "Enterprise food cost leakage and shrinkage benchmark.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-030",
    "domain": "restaurants",
    "level": 5,
    "order": 30,
    "difficulty": "core",
    "title": "Rank Dishes by Margin Percentage and Sales Volume",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Create a CTE ranking dishes by profit margin %, and another ranking by units sold, joining both to spot misalignment.",
    "context_notes": "Chained CTEs: margin_ranked, volume_ranked, joined on dish id.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "DENSE_RANK",
      "Arithmetic"
    ],
    "expected_columns": [
      "name",
      "category",
      "margin_pct",
      "margin_rank",
      "units_sold",
      "volume_rank"
    ],
    "reference_sql": "WITH dish_margin AS (SELECT id, name, category, ROUND(((price - cost) / price) * 100, 1) AS margin_pct, DENSE_RANK() OVER (ORDER BY ((price - cost) / price) DESC) AS margin_rank FROM menu_items), dish_volume AS (SELECT menu_item_id, SUM(quantity) AS units_sold, DENSE_RANK() OVER (ORDER BY SUM(quantity) DESC) AS volume_rank FROM order_items GROUP BY menu_item_id) SELECT dm.name, dm.category, dm.margin_pct, dm.margin_rank, COALESCE(dv.units_sold, 0) AS units_sold, dv.volume_rank FROM dish_margin dm LEFT JOIN dish_volume dv ON dm.id = dv.menu_item_id ORDER BY dm.margin_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 ranks dishes by margin percentage.",
      "CTE 2 ranks dishes by sales volume.",
      "Joined to identify menu stars vs pricing anomalies."
    ],
    "solution_explanation": "Dual-axis menu engineering alignment matrix.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L5-031",
    "domain": "restaurants",
    "level": 5,
    "order": 31,
    "difficulty": "core",
    "title": "Kitchen Labor Cost vs Kitchen Waste Loss by Venue",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Examine operational discipline: for venues with staff and purchases, compare culinary shift payroll against waste loss.",
    "context_notes": "Chained CTEs: venue_culinary_labor, total waste summary.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "culinary_payroll"
    ],
    "reference_sql": "WITH kitchen_labor AS (SELECT r.name AS restaurant_name, ROUND(SUM(s.hours_worked * sm.hourly_rate), 2) AS culinary_payroll FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id JOIN shifts s ON sm.id = s.staff_id WHERE sm.role IN ('Executive_Chef', 'Sous_Chef', 'Line_Cook') GROUP BY r.name) SELECT restaurant_name, culinary_payroll FROM kitchen_labor ORDER BY culinary_payroll DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE aggregates culinary wages (Chefs and Line Cooks).",
      "Ranks venues by kitchen production labor commitment."
    ],
    "solution_explanation": "Back-of-house payroll allocation by operating branch.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L5-032",
    "domain": "restaurants",
    "level": 5,
    "order": 32,
    "difficulty": "core",
    "title": "Inventory Carrying Cost vs Weekly Purchases",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Compare total inventory value on hand against total ingredient purchases to determine inventory turnover coverage.",
    "context_notes": "Chained CTEs: inventory_val, total_purchases.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "Arithmetic"
    ],
    "expected_columns": [
      "current_inventory_value",
      "total_purchases_value",
      "inventory_to_purchase_ratio"
    ],
    "reference_sql": "WITH inventory_val AS (SELECT SUM(unit_cost * current_stock_qty) AS inv_value FROM ingredients), purchase_val AS (SELECT SUM(total_amount) AS po_value FROM ingredient_purchases) SELECT ROUND(iv.inv_value, 2) AS current_inventory_value, ROUND(pv.po_value, 2) AS total_purchases_value, ROUND(iv.inv_value / pv.po_value, 3) AS inventory_to_purchase_ratio FROM inventory_val iv CROSS JOIN purchase_val pv;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 calculates total current stock dollar value.",
      "CTE 2 calculates total historical purchases.",
      "Cross join computes inventory coverage ratio."
    ],
    "solution_explanation": "Working capital efficiency and balance sheet liquidity metric.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L5-033",
    "domain": "restaurants",
    "level": 5,
    "order": 33,
    "difficulty": "core",
    "title": "Server Ticket Size Percentile Distribution",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Group orders by server, compute avg ticket, and assign servers to performance deciles using NTILE(10).",
    "context_notes": "WITH server_avg AS (...) SELECT with NTILE(10).",
    "concepts": [
      "WITH",
      "SELECT",
      "AVG",
      "COUNT",
      "NTILE",
      "GROUP BY"
    ],
    "expected_columns": [
      "server_name",
      "orders_count",
      "avg_ticket",
      "performance_decile"
    ],
    "reference_sql": "WITH server_avg AS (SELECT server_name, COUNT(*) AS orders_count, ROUND(AVG(total_amount), 2) AS avg_ticket FROM orders GROUP BY server_name) SELECT server_name, orders_count, avg_ticket, NTILE(10) OVER (ORDER BY avg_ticket DESC) AS performance_decile FROM server_avg ORDER BY performance_decile, avg_ticket DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates average check per server.",
      "Outer query segments servers into deciles via NTILE(10)."
    ],
    "solution_explanation": "Server upselling distribution curve for incentive compensation.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-034",
    "domain": "restaurants",
    "level": 5,
    "order": 34,
    "difficulty": "core",
    "title": "Spoilage Waste Rate by Ingredient Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each ingredient category, calculate what percentage of its total waste loss is due strictly to Spoilage.",
    "context_notes": "WITH cat_waste AS (...) compute Spoilage share of category waste.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "CASE WHEN",
      "GROUP BY"
    ],
    "expected_columns": [
      "category",
      "total_waste_loss",
      "spoilage_loss",
      "spoilage_pct"
    ],
    "reference_sql": "WITH cat_waste AS (SELECT i.category, SUM(wl.quantity_wasted * i.unit_cost) AS total_waste, SUM(CASE WHEN wl.reason = 'Spoilage' THEN wl.quantity_wasted * i.unit_cost ELSE 0 END) AS spoilage_waste FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY i.category) SELECT category, ROUND(total_waste, 2) AS total_waste_loss, ROUND(spoilage_waste, 2) AS spoilage_loss, ROUND((spoilage_waste / total_waste) * 100, 1) AS spoilage_pct FROM cat_waste ORDER BY spoilage_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE computes total waste and conditional spoilage waste by category.",
      "Outer query calculates spoilage percentage."
    ],
    "solution_explanation": "Cold-chain integrity and perishable shelf-life management.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-035",
    "domain": "restaurants",
    "level": 5,
    "order": 35,
    "difficulty": "core",
    "title": "Running Net Revenue Statement Over Time",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each order date chronologically, compute daily order revenue and running cumulative revenue company-wide.",
    "context_notes": "WITH daily_rev AS (...) SELECT with SUM OVER running total.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "SUM OVER",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "order_date",
      "daily_sales",
      "running_sales"
    ],
    "reference_sql": "WITH daily_rev AS (SELECT DATE(order_time) AS order_date, SUM(total_amount) AS daily_sales FROM orders GROUP BY DATE(order_time)) SELECT order_date, ROUND(daily_sales, 2) AS daily_sales, ROUND(SUM(daily_sales) OVER (ORDER BY order_date), 2) AS running_sales FROM daily_rev ORDER BY order_date;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE aggregates order totals by calendar date.",
      "Outer query applies SUM() OVER running total."
    ],
    "solution_explanation": "Executive daily sales pacing and cumulative run-rate.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-036",
    "domain": "restaurants",
    "level": 5,
    "order": 36,
    "difficulty": "core",
    "title": "Dishes Contributing to 80 Percent of Gross Profit",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Using a CTE and running total of gross profit over all sold dishes, show each dish profit and cumulative profit.",
    "context_notes": "WITH dish_profits AS (...) SELECT with running SUM OVER.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "SUM OVER",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "category",
      "dish_profit",
      "running_profit"
    ],
    "reference_sql": "WITH dish_profits AS (SELECT mi.name, mi.category, ROUND(SUM(oi.quantity * (mi.price - mi.cost)), 2) AS dish_profit FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.name, mi.category) SELECT name, category, dish_profit, ROUND(SUM(dish_profit) OVER (ORDER BY dish_profit DESC), 2) AS running_profit FROM dish_profits ORDER BY dish_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates net gross profit per dish.",
      "Outer query computes cumulative profit curve."
    ],
    "solution_explanation": "Pareto 80/20 profit driver distribution analysis.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-037",
    "domain": "restaurants",
    "level": 5,
    "order": 37,
    "difficulty": "core",
    "title": "Venue Headcount vs Seating Density Ranking",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Using a CTE, compute staff headcount per 100 seats for each restaurant and rank venues by staffing density.",
    "context_notes": "WITH venue_stats AS (...) SELECT with DENSE_RANK on seats per staff.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "Arithmetic",
      "DENSE_RANK",
      "GROUP BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "seating_capacity",
      "headcount",
      "staff_per_100_seats",
      "density_rank"
    ],
    "reference_sql": "WITH venue_stats AS (SELECT r.name AS restaurant_name, r.city, r.seating_capacity, COUNT(sm.id) AS headcount, ROUND((COUNT(sm.id)::NUMERIC / r.seating_capacity) * 100, 2) AS staff_per_100_seats FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id GROUP BY r.name, r.city, r.seating_capacity) SELECT restaurant_name, city, seating_capacity, headcount, staff_per_100_seats, DENSE_RANK() OVER (ORDER BY staff_per_100_seats DESC) AS density_rank FROM venue_stats ORDER BY density_rank, restaurant_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates staff per 100 seats per restaurant.",
      "Outer query ranks venues by staffing density using DENSE_RANK()."
    ],
    "solution_explanation": "Hospitality service ratio: luxury high-touch vs high-volume model.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-038",
    "domain": "restaurants",
    "level": 5,
    "order": 38,
    "difficulty": "core",
    "title": "High Waste Ingredients Impact on Recipe Profit",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Identify ingredients whose cumulative waste loss exceeds $100, and show their category and unit cost.",
    "context_notes": "WITH wasted_summary AS (...) SELECT WHERE total_waste > 100.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "WHERE"
    ],
    "expected_columns": [
      "ingredient_name",
      "category",
      "unit_cost",
      "total_waste_cost"
    ],
    "reference_sql": "WITH wasted_summary AS (SELECT i.ingredient_name, i.category, i.unit_cost, ROUND(SUM(wl.quantity_wasted * i.unit_cost), 2) AS total_waste_cost FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY i.ingredient_name, i.category, i.unit_cost) SELECT ingredient_name, category, unit_cost, total_waste_cost FROM wasted_summary WHERE total_waste_cost > 100.00 ORDER BY total_waste_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE aggregates waste cost per ingredient.",
      "Outer query filters items crossing $100 threshold."
    ],
    "solution_explanation": "Targets specific ingredients causing severe financial leakage.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-039",
    "domain": "restaurants",
    "level": 5,
    "order": 39,
    "difficulty": "core",
    "title": "Server Floor Sales vs Tip Rate Estimate",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Using a CTE, calculate each server total sales, average check, and rank them by check count.",
    "context_notes": "WITH server_summary AS (...) SELECT with ROW_NUMBER.",
    "concepts": [
      "WITH",
      "SELECT",
      "COUNT",
      "SUM",
      "AVG",
      "ROW_NUMBER"
    ],
    "expected_columns": [
      "server_name",
      "checks_served",
      "gross_sales",
      "avg_check",
      "rank_by_volume"
    ],
    "reference_sql": "WITH server_summary AS (SELECT server_name, COUNT(*) AS checks_served, ROUND(SUM(total_amount), 2) AS gross_sales, ROUND(AVG(total_amount), 2) AS avg_check FROM orders GROUP BY server_name) SELECT server_name, checks_served, gross_sales, avg_check, ROW_NUMBER() OVER (ORDER BY checks_served DESC) AS rank_by_volume FROM server_summary ORDER BY rank_by_volume;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE summarizes server order counts, sales, and avg check.",
      "Outer query assigns volume rank via ROW_NUMBER()."
    ],
    "solution_explanation": "Floor workload throughput and ticket size overview.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-040",
    "domain": "restaurants",
    "level": 5,
    "order": 40,
    "difficulty": "core",
    "title": "Suppliers Meeting Quality and Volume Thresholds",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Find suppliers who have rating >= 4.8 AND total invoice volume exceeding $10,000 using a CTE.",
    "context_notes": "WITH vendor_totals AS (...) SELECT WHERE rating >= 4.8 AND total_spend > 10000.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "WHERE"
    ],
    "expected_columns": [
      "supplier_name",
      "category",
      "rating",
      "total_spend"
    ],
    "reference_sql": "WITH vendor_totals AS (SELECT s.supplier_name, s.category, s.rating, SUM(ip.total_amount) AS total_spend FROM suppliers s JOIN ingredient_purchases ip ON s.id = ip.supplier_id GROUP BY s.supplier_name, s.category, s.rating) SELECT supplier_name, category, rating, total_spend FROM vendor_totals WHERE rating >= 4.8 AND total_spend > 10000.00 ORDER BY total_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE aggregates supplier spend alongside quality rating.",
      "Outer query filters for elite tier vendors meeting both criteria."
    ],
    "solution_explanation": "Strategic vendor partners combining volume and premium quality.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-041",
    "domain": "restaurants",
    "level": 5,
    "order": 41,
    "difficulty": "core",
    "title": "Daily Labor Cost vs Daily Order Sales Variance",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each calendar date with orders, compute total dining sales and compare it against average daily sales.",
    "context_notes": "WITH daily_sales AS (...) SELECT with difference from average.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "AVG OVER",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "order_date",
      "daily_sales",
      "diff_from_avg_day"
    ],
    "reference_sql": "WITH daily_sales AS (SELECT DATE(order_time) AS order_date, ROUND(SUM(total_amount), 2) AS daily_sales FROM orders GROUP BY DATE(order_time)) SELECT order_date, daily_sales, ROUND(daily_sales - AVG(daily_sales) OVER (), 2) AS diff_from_avg_day FROM daily_sales ORDER BY order_date;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE groups orders by day.",
      "Outer query computes variance against company daily average."
    ],
    "solution_explanation": "Volatility analysis for daily sales pacing.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-042",
    "domain": "restaurants",
    "level": 5,
    "order": 42,
    "difficulty": "core",
    "title": "Top Wasted Ingredient per Category via CTE and Dense Rank",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each ingredient category, identify the single ingredient that generated the highest total waste cost.",
    "context_notes": "Chained CTE with DENSE_RANK() OVER (PARTITION BY category ORDER BY waste DESC) = 1.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "DENSE_RANK",
      "PARTITION BY",
      "WHERE"
    ],
    "expected_columns": [
      "category",
      "ingredient_name",
      "max_waste_cost"
    ],
    "reference_sql": "WITH cat_item_waste AS (SELECT i.category, i.ingredient_name, ROUND(SUM(wl.quantity_wasted * i.unit_cost), 2) AS waste_cost, DENSE_RANK() OVER (PARTITION BY i.category ORDER BY SUM(wl.quantity_wasted * i.unit_cost) DESC) AS rnk FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY i.category, i.ingredient_name) SELECT category, ingredient_name, waste_cost AS max_waste_cost FROM cat_item_waste WHERE rnk = 1 ORDER BY waste_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates waste cost per ingredient with DENSE_RANK per category.",
      "Outer query filters top wasted item for each category."
    ],
    "solution_explanation": "Focus list of worst shrinkage offender for each kitchen station.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "rest-L5-043",
    "domain": "restaurants",
    "level": 5,
    "order": 43,
    "difficulty": "core",
    "title": "Venues With High Spend and High Review Volume",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Find restaurants that have both above-average procurement spend AND above-average guest review count.",
    "context_notes": "Chained CTEs comparing venue spend and review count against network means.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "GROUP BY",
      "WHERE"
    ],
    "expected_columns": [
      "restaurant_name",
      "total_spend",
      "review_count"
    ],
    "reference_sql": "WITH venue_spend AS (SELECT r.id, r.name AS restaurant_name, SUM(ip.total_amount) AS total_spend FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id GROUP BY r.id, r.name), venue_reviews AS (SELECT r.id, COUNT(gr.id) AS review_count FROM restaurants r LEFT JOIN guest_reviews gr ON r.id = gr.restaurant_id GROUP BY r.id) SELECT vs.restaurant_name, vs.total_spend, vr.review_count FROM venue_spend vs JOIN venue_reviews vr ON vs.id = vr.id WHERE vs.total_spend > (SELECT AVG(total_spend) FROM venue_spend) AND vr.review_count > (SELECT AVG(review_count) FROM venue_reviews) ORDER BY vs.total_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 computes spend per venue.",
      "CTE 2 computes review count per venue.",
      "Outer query filters venues beating both averages."
    ],
    "solution_explanation": "Identifies vibrant, high-throughput operating locations.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "rest-L5-044",
    "domain": "restaurants",
    "level": 5,
    "order": 44,
    "difficulty": "core",
    "title": "Kitchen Staff Shift Hours vs Front of House Ratio",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Calculate total shift hours worked by Kitchen staff (Chefs, Cooks) vs Front of House (Servers, Hosts, Bartenders).",
    "context_notes": "WITH role_hours AS (...) SELECT ratio of kitchen to FOH hours.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "CASE WHEN",
      "Arithmetic"
    ],
    "expected_columns": [
      "kitchen_hours",
      "foh_hours",
      "kitchen_to_foh_ratio"
    ],
    "reference_sql": "WITH role_hours AS (SELECT SUM(CASE WHEN sm.role IN ('Executive_Chef', 'Sous_Chef', 'Line_Cook') THEN s.hours_worked ELSE 0 END) AS kitchen_h, SUM(CASE WHEN sm.role IN ('Server', 'Host', 'Bartender', 'Sommelier') THEN s.hours_worked ELSE 0 END) AS foh_h FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id) SELECT ROUND(kitchen_h, 2) AS kitchen_hours, ROUND(foh_h, 2) AS foh_hours, ROUND(kitchen_h / NULLIF(foh_h, 0), 2) AS kitchen_to_foh_ratio FROM role_hours;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE aggregates hours worked by kitchen vs front-of-house roles.",
      "Computes ratio of kitchen hours to front-of-house hours."
    ],
    "solution_explanation": "Staffing balance benchmark between culinary production and hospitality.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-045",
    "domain": "restaurants",
    "level": 5,
    "order": 45,
    "difficulty": "core",
    "title": "Unsold Inventory Capital vs Active Recipe Cost",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Using a CTE, find all menu items whose raw food cost is strictly higher than the average cost of all active menu items.",
    "context_notes": "WITH menu_stats AS (...) SELECT WHERE cost > avg_cost.",
    "concepts": [
      "WITH",
      "SELECT",
      "AVG",
      "WHERE",
      "Subquery",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "category",
      "cost",
      "cost_premium_over_avg"
    ],
    "reference_sql": "WITH menu_stats AS (SELECT AVG(cost) AS avg_cost FROM menu_items) SELECT m.name, m.category, m.cost, ROUND(m.cost - ms.avg_cost, 2) AS cost_premium_over_avg FROM menu_items m CROSS JOIN menu_stats ms WHERE m.cost > ms.avg_cost ORDER BY m.cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE computes global average dish food cost.",
      "Outer query lists items exceeding this cost and computes premium."
    ],
    "solution_explanation": "Identifies dishes carrying heaviest per-portion financial commitment.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-046",
    "domain": "restaurants",
    "level": 5,
    "order": 46,
    "difficulty": "core",
    "title": "Waste Loss per Seat Capacity by Restaurant",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Join restaurants with purchases and compute total procurement spend normalized per seating capacity unit.",
    "context_notes": "WITH venue_purchases AS (...) SELECT purchases / seating_capacity.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "seating_capacity",
      "spend_per_seat"
    ],
    "reference_sql": "WITH venue_purchases AS (SELECT r.name AS restaurant_name, r.city, r.seating_capacity, SUM(ip.total_amount) AS total_spend FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id GROUP BY r.name, r.city, r.seating_capacity) SELECT restaurant_name, city, seating_capacity, ROUND(total_spend / seating_capacity, 2) AS spend_per_seat FROM venue_purchases ORDER BY spend_per_seat DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE aggregates procurement spend per venue.",
      "Divides total spend by seating capacity."
    ],
    "solution_explanation": "Normalizes procurement efficiency relative to venue physical scale.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-047",
    "domain": "restaurants",
    "level": 5,
    "order": 47,
    "difficulty": "core",
    "title": "Dishes With High Sales but Low Margin Percentage",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find high-volume low-margin menu traps: dishes with >= 10 units sold whose gross margin percentage is under 70%.",
    "context_notes": "WITH dish_metrics AS (...) SELECT WHERE volume >= 10 AND margin < 70.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "category",
      "units_sold",
      "margin_pct"
    ],
    "reference_sql": "WITH dish_metrics AS (SELECT mi.name, mi.category, SUM(oi.quantity) AS units_sold, ROUND(((mi.price - mi.cost) / mi.price) * 100, 1) AS margin_pct FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.name, mi.category, mi.price, mi.cost) SELECT name, category, units_sold, margin_pct FROM dish_metrics WHERE units_sold >= 10 AND margin_pct < 70.0 ORDER BY units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates sales volume and margin % per dish.",
      "Outer query isolates high-volume dishes with sub-70% margins."
    ],
    "solution_explanation": "Identifies plowhorse dishes requiring recipe cost adjustments.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-048",
    "domain": "restaurants",
    "level": 5,
    "order": 48,
    "difficulty": "core",
    "title": "Server Daily Billing Consistency Score",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Using a CTE, calculate each server daily billings, and return the server with the highest single-day sales volume.",
    "context_notes": "WITH server_daily AS (...) SELECT highest single day.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "server_name",
      "order_date",
      "daily_sales"
    ],
    "reference_sql": "WITH server_daily AS (SELECT server_name, DATE(order_time) AS order_date, ROUND(SUM(total_amount), 2) AS daily_sales FROM orders GROUP BY server_name, DATE(order_time)) SELECT server_name, order_date, daily_sales FROM server_daily ORDER BY daily_sales DESC LIMIT 1;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE groups server sales by date.",
      "Outer query finds the single highest daily server revenue record."
    ],
    "solution_explanation": "Spotlights all-time single-day server revenue record.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-049",
    "domain": "restaurants",
    "level": 5,
    "order": 49,
    "difficulty": "core",
    "title": "Venues With Complete Service Suite (Main, Patio, Lounge)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Find restaurants that have both an indoor dining section AND an outdoor dining section using a CTE.",
    "context_notes": "WITH outdoor_venues AS (...), indoor_venues AS (...) INTERSECT.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "INTERSECT"
    ],
    "expected_columns": [
      "restaurant_name",
      "city"
    ],
    "reference_sql": "WITH outdoor_venues AS (SELECT DISTINCT r.name AS restaurant_name, r.city FROM restaurants r JOIN dining_sections ds ON r.id = ds.restaurant_id WHERE ds.is_outdoor = TRUE), indoor_venues AS (SELECT DISTINCT r.name AS restaurant_name, r.city FROM restaurants r JOIN dining_sections ds ON r.id = ds.restaurant_id WHERE ds.is_outdoor = FALSE) SELECT restaurant_name, city FROM outdoor_venues INTERSECT SELECT restaurant_name, city FROM indoor_venues ORDER BY restaurant_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 finds restaurants with outdoor dining sections.",
      "CTE 2 finds restaurants with indoor dining sections.",
      "Intersect produces hybrid venues offering both environments."
    ],
    "solution_explanation": "Identifies versatile all-weather hospitality properties.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-050",
    "domain": "restaurants",
    "level": 5,
    "order": 50,
    "difficulty": "core",
    "title": "Procurement Seasonality: Monthly Spend Trend via CTE",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Calculate total procurement spend grouped by calendar month using a CTE, displaying month and total expenditure.",
    "context_notes": "WITH monthly_spend AS (...) SELECT month, spend, running total.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "SUM OVER",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "purchase_month",
      "monthly_spend",
      "running_spend"
    ],
    "reference_sql": "WITH monthly_spend AS (SELECT EXTRACT(MONTH FROM purchase_date)::INT AS purchase_month, ROUND(SUM(total_amount), 2) AS monthly_spend FROM ingredient_purchases GROUP BY EXTRACT(MONTH FROM purchase_date)) SELECT purchase_month, monthly_spend, ROUND(SUM(monthly_spend) OVER (ORDER BY purchase_month), 2) AS running_spend FROM monthly_spend ORDER BY purchase_month;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE aggregates ingredient purchases by month.",
      "Outer query applies SUM() OVER running total."
    ],
    "solution_explanation": "Monthly purchasing cadence and cash outlay trend.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-051",
    "domain": "restaurants",
    "level": 5,
    "order": 51,
    "difficulty": "challenging",
    "title": "Comprehensive Venue EBITDA Proxy Statement",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each restaurant with data: Gross Order Sales, Food Purchases, Labor Expense, and Net Operating Margin.",
    "context_notes": "Chained CTEs: venue_sales, venue_food, venue_labor, combined in master query.",
    "concepts": [
      "WITH",
      "SELECT",
      "LEFT JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "total_sales",
      "cogs_purchases",
      "labor_payroll",
      "operating_margin_dollars"
    ],
    "reference_sql": "WITH venue_sales AS (SELECT (SELECT ROUND(SUM(total_amount), 2) FROM orders) AS all_sales), venue_purchases AS (SELECT restaurant_id, SUM(total_amount) AS cogs FROM ingredient_purchases GROUP BY restaurant_id), venue_labor AS (SELECT sm.restaurant_id, SUM(s.hours_worked * sm.hourly_rate) AS labor FROM staff_members sm JOIN shifts s ON sm.id = s.staff_id GROUP BY sm.restaurant_id) SELECT r.name AS restaurant_name, r.city, ROUND(COALESCE(vp.cogs, 0), 2) AS cogs_purchases, ROUND(COALESCE(vl.labor, 0), 2) AS labor_payroll, ROUND(COALESCE(vp.cogs, 0) + COALESCE(vl.labor, 0), 2) AS operating_expenses FROM restaurants r LEFT JOIN venue_purchases vp ON r.id = vp.restaurant_id LEFT JOIN venue_labor vl ON r.id = vl.restaurant_id WHERE vp.cogs IS NOT NULL OR vl.labor IS NOT NULL ORDER BY operating_expenses DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Chained CTEs aggregate cogs and labor per venue.",
      "Combines expenses into total operating expense view."
    ],
    "solution_explanation": "Unit-level operating expense statement across branches.",
    "xp": 50,
    "estimated_minutes": 15
  },
  {
    "id": "rest-L5-052",
    "domain": "restaurants",
    "level": 5,
    "order": 52,
    "difficulty": "challenging",
    "title": "Waste Loss Impact on Gross Margin Percentage",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Compute theoretical gross margin % vs actual gross margin % after deducting food waste dollar loss from recipe gross profit.",
    "context_notes": "Chained CTEs: order_revenue, theoretical_cogs, actual_waste.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "Arithmetic"
    ],
    "expected_columns": [
      "gross_sales",
      "theoretical_margin_pct",
      "actual_margin_pct",
      "waste_drag_pct"
    ],
    "reference_sql": "WITH sales_summary AS (SELECT SUM(oi.quantity * mi.price) AS total_rev, SUM(oi.quantity * mi.cost) AS total_food_cost FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id), waste_summary AS (SELECT SUM(wl.quantity_wasted * i.unit_cost) AS total_waste FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id) SELECT ROUND(s.total_rev, 2) AS gross_sales, ROUND(((s.total_rev - s.total_food_cost) / s.total_rev) * 100, 1) AS theoretical_margin_pct, ROUND(((s.total_rev - s.total_food_cost - w.total_waste) / s.total_rev) * 100, 1) AS actual_margin_pct, ROUND((w.total_waste / s.total_rev) * 100, 1) AS waste_drag_pct FROM sales_summary s CROSS JOIN waste_summary w;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 calculates theoretical sales and raw food cost.",
      "CTE 2 calculates total food waste dollars.",
      "Computes margin drag caused by kitchen shrinkage."
    ],
    "solution_explanation": "Measures precise gross profit degradation caused by food waste.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "rest-L5-053",
    "domain": "restaurants",
    "level": 5,
    "order": 53,
    "difficulty": "challenging",
    "title": "Server Sales Productivity Decile vs Wage Efficiency",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Join server sales decile with their actual hourly wage to find top sales producers on moderate hourly rates.",
    "context_notes": "Chained CTEs: server_sales with NTILE(5), joined to staff_members on name.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "NTILE",
      "GROUP BY"
    ],
    "expected_columns": [
      "server_name",
      "hourly_rate",
      "total_sales",
      "sales_tier"
    ],
    "reference_sql": "WITH server_sales AS (SELECT server_name, ROUND(SUM(total_amount), 2) AS total_sales, NTILE(5) OVER (ORDER BY SUM(total_amount) DESC) AS sales_tier FROM orders GROUP BY server_name) SELECT sm.name AS server_name, sm.hourly_rate, ss.total_sales, ss.sales_tier FROM server_sales ss JOIN staff_members sm ON ss.server_name = sm.name WHERE sm.role = 'Server' ORDER BY ss.sales_tier, ss.total_sales DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE computes server sales and assigns NTILE(5) tiers.",
      "Joins to staff_members to incorporate hourly wage."
    ],
    "solution_explanation": "Evaluates server sales output relative to compensation tier.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L5-054",
    "domain": "restaurants",
    "level": 5,
    "order": 54,
    "difficulty": "challenging",
    "title": "Supplier Quality vs Waste Correlation Proxy",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each ingredient category, compare the average supplier rating against total logged waste dollar loss.",
    "context_notes": "Chained CTEs: supplier_ratings by category, waste_by_cat, joined on category.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "AVG",
      "SUM",
      "GROUP BY"
    ],
    "expected_columns": [
      "category",
      "avg_supplier_rating",
      "total_waste_loss"
    ],
    "reference_sql": "WITH supplier_ratings AS (SELECT category, ROUND(AVG(rating), 2) AS avg_supplier_rating FROM suppliers GROUP BY category), waste_by_cat AS (SELECT i.category, ROUND(SUM(wl.quantity_wasted * i.unit_cost), 2) AS total_waste_loss FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY i.category) SELECT sr.category, sr.avg_supplier_rating, COALESCE(wbc.total_waste_loss, 0) AS total_waste_loss FROM supplier_ratings sr LEFT JOIN waste_by_cat wbc ON sr.category = wbc.category ORDER BY total_waste_loss DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 computes average supplier rating per category.",
      "CTE 2 computes total waste loss per category.",
      "Joined to test if lower supplier ratings correlate with waste."
    ],
    "solution_explanation": "Supply chain QA: does vendor rating predict kitchen waste?",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "rest-L5-055",
    "domain": "restaurants",
    "level": 5,
    "order": 55,
    "difficulty": "challenging",
    "title": "Dishes Carrying Disproportionate Waste Risk",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find raw ingredients where total wasted dollars exceed 10% of their total current on-hand inventory valuation.",
    "context_notes": "Chained CTEs: waste_per_item, inventory_per_item, compute waste ratio.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "WHERE"
    ],
    "expected_columns": [
      "ingredient_name",
      "category",
      "waste_loss",
      "stock_value",
      "waste_to_val_pct"
    ],
    "reference_sql": "WITH item_waste AS (SELECT ingredient_id, SUM(quantity_wasted) AS total_wasted FROM waste_logs GROUP BY ingredient_id) SELECT i.ingredient_name, i.category, ROUND(COALESCE(iw.total_wasted, 0) * i.unit_cost, 2) AS waste_loss, ROUND(i.unit_cost * i.current_stock_qty, 2) AS stock_value, ROUND(((COALESCE(iw.total_wasted, 0) * i.unit_cost) / (i.unit_cost * i.current_stock_qty)) * 100, 1) AS waste_to_val_pct FROM ingredients i JOIN item_waste iw ON i.id = iw.ingredient_id WHERE ((COALESCE(iw.total_wasted, 0) * i.unit_cost) / (i.unit_cost * i.current_stock_qty)) > 0.10 ORDER BY waste_to_val_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates wasted units per ingredient.",
      "Computes waste dollars vs total stock valuation.",
      "Filters ingredients where waste exceeds 10% of inventory value."
    ],
    "solution_explanation": "Identifies extreme inventory spoilage and shrinkage risks.",
    "xp": 50,
    "estimated_minutes": 13
  },
  {
    "id": "rest-L5-056",
    "domain": "restaurants",
    "level": 5,
    "order": 56,
    "difficulty": "challenging",
    "title": "Kitchen Efficiency: Prep Hours per Unit of Food Sold",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Calculate total culinary prep hours worked against total culinary food units sold across all checks.",
    "context_notes": "Chained CTEs: total_prep_hours, total_food_units_sold.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "Arithmetic"
    ],
    "expected_columns": [
      "total_prep_hours",
      "total_food_units",
      "prep_minutes_per_dish"
    ],
    "reference_sql": "WITH prep_hours AS (SELECT SUM(s.hours_worked) AS prep_h FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id WHERE s.shift_type = 'Prep' AND sm.role IN ('Line_Cook', 'Sous_Chef', 'Executive_Chef')), food_units AS (SELECT SUM(oi.quantity) AS total_units FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE mi.category != 'beverage') SELECT ROUND(ph.prep_h, 2) AS total_prep_hours, fu.total_units AS total_food_units, ROUND((ph.prep_h * 60) / fu.total_units, 1) AS prep_minutes_per_dish FROM prep_hours ph CROSS JOIN food_units fu;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 calculates total kitchen Prep shift hours.",
      "CTE 2 calculates total food portions sold.",
      "Cross join computes prep labor minutes per served portion."
    ],
    "solution_explanation": "Back-of-house culinary productivity benchmark.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L5-057",
    "domain": "restaurants",
    "level": 5,
    "order": 57,
    "difficulty": "challenging",
    "title": "Front-of-House Labor Cost Percentage of Gross Revenue",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Calculate front-of-house labor expense (Servers, Hosts, Bartenders) as a percentage of gross order sales.",
    "context_notes": "Chained CTEs: foh_labor, gross_sales, compute percentage.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "Arithmetic"
    ],
    "expected_columns": [
      "foh_labor_cost",
      "gross_sales",
      "foh_labor_pct"
    ],
    "reference_sql": "WITH foh_labor AS (SELECT SUM(s.hours_worked * sm.hourly_rate) AS foh_cost FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id WHERE sm.role IN ('Server', 'Host', 'Bartender', 'Sommelier')), gross_sales AS (SELECT SUM(total_amount) AS total_rev FROM orders) SELECT ROUND(fl.foh_cost, 2) AS foh_labor_cost, ROUND(gs.total_rev, 2) AS gross_sales, ROUND((fl.foh_cost / gs.total_rev) * 100, 2) AS foh_labor_pct FROM foh_labor fl CROSS JOIN gross_sales gs;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 calculates front-of-house payroll.",
      "CTE 2 calculates total order revenue.",
      "Cross join determines FOH labor to sales percentage."
    ],
    "solution_explanation": "Front-of-house payroll efficiency index.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "rest-L5-058",
    "domain": "restaurants",
    "level": 5,
    "order": 58,
    "difficulty": "challenging",
    "title": "Venues With High Capacity Utilization and High Rating",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Find restaurants that have seating capacity > 100, total booked covers > 15, and average rating >= 4.5.",
    "context_notes": "Chained CTEs: venue_covers, venue_ratings, joined to restaurants.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "seating_capacity",
      "total_covers",
      "avg_rating"
    ],
    "reference_sql": "WITH venue_covers AS (SELECT restaurant_id, SUM(party_size) AS covers FROM reservations GROUP BY restaurant_id), venue_ratings AS (SELECT restaurant_id, ROUND(AVG(rating), 2) AS avg_score FROM guest_reviews GROUP BY restaurant_id) SELECT r.name AS restaurant_name, r.city, r.seating_capacity, vc.covers AS total_covers, vr.avg_score AS avg_rating FROM restaurants r JOIN venue_covers vc ON r.id = vc.restaurant_id JOIN venue_ratings vr ON r.id = vr.restaurant_id WHERE r.seating_capacity > 100 AND vc.covers > 15 AND vr.avg_score >= 4.5 ORDER BY vr.avg_score DESC, vc.covers DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 sums reservation covers per venue.",
      "CTE 2 computes average review rating per venue.",
      "Outer query filters for premier scale, high throughput, and top satisfaction."
    ],
    "solution_explanation": "Identifies crown-jewel flagship operations.",
    "xp": 50,
    "estimated_minutes": 13
  },
  {
    "id": "rest-L5-059",
    "domain": "restaurants",
    "level": 5,
    "order": 59,
    "difficulty": "challenging",
    "title": "Menu Cannibalization Matrix Within Pasta Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Compare every pasta dish revenue and units sold against the total pasta department volume using a CTE.",
    "context_notes": "WITH pasta_summary AS (...) SELECT dish revenue and percentage of pasta total.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "dish_name",
      "units_sold",
      "dish_revenue",
      "dept_share_pct"
    ],
    "reference_sql": "WITH pasta_orders AS (SELECT mi.name AS dish_name, SUM(oi.quantity) AS units_sold, SUM(oi.quantity * mi.price) AS dish_revenue FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id WHERE mi.category = 'pasta' GROUP BY mi.name) SELECT dish_name, units_sold, ROUND(dish_revenue, 2) AS dish_revenue, ROUND((dish_revenue / SUM(dish_revenue) OVER ()) * 100, 1) AS dept_share_pct FROM pasta_orders ORDER BY dish_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE aggregates units and sales for pasta items.",
      "Outer query applies SUM() OVER () to compute department revenue share."
    ],
    "solution_explanation": "Category sales concentration and cannibalization analysis.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "rest-L5-060",
    "domain": "restaurants",
    "level": 5,
    "order": 60,
    "difficulty": "challenging",
    "title": "Waste Loss Breakdown by Day of Week",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Determine which day of the week generates our highest kitchen food waste loss using EXTRACT(DOW).",
    "context_notes": "WITH dow_waste AS (...) GROUP BY day_of_week.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "day_of_week_num",
      "total_waste_loss"
    ],
    "reference_sql": "WITH dow_waste AS (SELECT EXTRACT(DOW FROM wl.log_date)::INT AS day_of_week_num, SUM(wl.quantity_wasted * i.unit_cost) AS total_loss FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY EXTRACT(DOW FROM wl.log_date)) SELECT day_of_week_num, ROUND(total_loss, 2) AS total_waste_loss FROM dow_waste ORDER BY total_waste_loss DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE extracts day of week from log_date.",
      "Sums waste dollars per weekday number."
    ],
    "solution_explanation": "Weekly food waste pattern: identifies problem shifts.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L5-061",
    "domain": "restaurants",
    "level": 5,
    "order": 61,
    "difficulty": "challenging",
    "title": "Labor Cost per Seated Hour by Shift Type",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each shift type (Lunch, Dinner, Prep), compute total hours worked, total labor dollars, and hourly burn rate.",
    "context_notes": "WITH shift_pnl AS (...) GROUP BY shift_type.",
    "concepts": [
      "WITH",
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
      "total_cost",
      "hourly_burn_rate"
    ],
    "reference_sql": "WITH shift_pnl AS (SELECT s.shift_type, s.hours_worked, s.hours_worked * sm.hourly_rate AS shift_cost FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id) SELECT shift_type, ROUND(SUM(hours_worked), 2) AS total_hours, ROUND(SUM(shift_cost), 2) AS total_cost, ROUND(SUM(shift_cost) / SUM(hours_worked), 2) AS hourly_burn_rate FROM shift_pnl GROUP BY shift_type ORDER BY hourly_burn_rate DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE computes individual shift hours and cost.",
      "Outer query calculates blended hourly burn rate by shift type."
    ],
    "solution_explanation": "Shift labor expenditure efficiency profile.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-062",
    "domain": "restaurants",
    "level": 5,
    "order": 62,
    "difficulty": "challenging",
    "title": "Top 5 Most Wasteful Ingredients Normalized by Unit Cost",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Rank ingredients by units wasted, showing ingredient name, category, unit cost, quantity wasted, and total loss.",
    "context_notes": "WITH waste_by_ing AS (...) SELECT top 5.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "ingredient_name",
      "category",
      "unit_cost",
      "total_units_wasted",
      "total_loss"
    ],
    "reference_sql": "WITH waste_by_ing AS (SELECT i.ingredient_name, i.category, i.unit_cost, SUM(wl.quantity_wasted) AS total_units_wasted, SUM(wl.quantity_wasted * i.unit_cost) AS total_loss FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY i.ingredient_name, i.category, i.unit_cost) SELECT ingredient_name, category, unit_cost, ROUND(total_units_wasted, 2) AS total_units_wasted, ROUND(total_loss, 2) AS total_loss FROM waste_by_ing ORDER BY total_loss DESC LIMIT 5;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE aggregates wasted units and dollars per ingredient.",
      "Orders by total dollar loss DESC LIMIT 5."
    ],
    "solution_explanation": "Pantry shrinkage priority hit-list for Chef Marco.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-063",
    "domain": "restaurants",
    "level": 5,
    "order": 63,
    "difficulty": "challenging",
    "title": "Dishes Accounting for Over 10 Percent of Total Food Cost",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Identify any dishes whose food cost consumption makes up more than 10% of total company food costs.",
    "context_notes": "WITH dish_costs AS (...) SELECT WHERE share > 10%.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "dish_name",
      "category",
      "total_food_cost",
      "cost_share_pct"
    ],
    "reference_sql": "WITH dish_costs AS (SELECT mi.name AS dish_name, mi.category, SUM(oi.quantity * mi.cost) AS total_food_cost FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.name, mi.category) SELECT dish_name, category, ROUND(total_food_cost, 2) AS total_food_cost, ROUND((total_food_cost / SUM(total_food_cost) OVER ()) * 100, 2) AS cost_share_pct FROM dish_costs ORDER BY total_food_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates total cost of goods sold per dish.",
      "Outer query uses SUM() OVER () to compute percentage share of all food costs."
    ],
    "solution_explanation": "Surfaces dishes creating the largest operational cost burden.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "rest-L5-064",
    "domain": "restaurants",
    "level": 5,
    "order": 64,
    "difficulty": "challenging",
    "title": "Venues With Consistent 5-Star Reviews vs Capacity",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find restaurants where at least 50% of all received reviews are 5-star ratings, showing total reviews and 5-star pct.",
    "context_notes": "WITH review_stats AS (...) SELECT WHERE five_star_pct >= 50.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "total_reviews",
      "five_star_reviews",
      "five_star_pct"
    ],
    "reference_sql": "WITH review_stats AS (SELECT r.name AS restaurant_name, r.city, COUNT(gr.id) AS total_reviews, SUM(CASE WHEN gr.rating = 5 THEN 1 ELSE 0 END) AS five_star_reviews, ROUND((SUM(CASE WHEN gr.rating = 5 THEN 1 ELSE 0 END)::NUMERIC / COUNT(gr.id)) * 100, 1) AS five_star_pct FROM restaurants r JOIN guest_reviews gr ON r.id = gr.restaurant_id GROUP BY r.name, r.city HAVING COUNT(gr.id) >= 3) SELECT restaurant_name, city, total_reviews, five_star_reviews, five_star_pct FROM review_stats WHERE five_star_pct >= 50.0 ORDER BY five_star_pct DESC, total_reviews DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates review count, 5-star count, and percentage per venue.",
      "Filters venues where 5-star ratings exceed 50%."
    ],
    "solution_explanation": "Highlights top culinary execution excellence across venues.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "rest-L5-065",
    "domain": "restaurants",
    "level": 5,
    "order": 65,
    "difficulty": "challenging",
    "title": "Cumulative Headcount and Payroll by Seniority Tier",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Group staff by role, compute headcount, average wage, and running cumulative payroll commitment across roles.",
    "context_notes": "WITH role_pnl AS (...) SELECT with running SUM OVER.",
    "concepts": [
      "WITH",
      "SELECT",
      "COUNT",
      "AVG",
      "SUM",
      "SUM OVER",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "role",
      "headcount",
      "avg_hourly_wage",
      "role_hourly_payroll",
      "running_payroll"
    ],
    "reference_sql": "WITH role_pnl AS (SELECT role, COUNT(*) AS headcount, ROUND(AVG(hourly_rate), 2) AS avg_hourly_wage, ROUND(SUM(hourly_rate), 2) AS role_hourly_payroll FROM staff_members GROUP BY role) SELECT role, headcount, avg_hourly_wage, role_hourly_payroll, ROUND(SUM(role_hourly_payroll) OVER (ORDER BY role_hourly_payroll DESC), 2) AS running_payroll FROM role_pnl ORDER BY role_hourly_payroll DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE calculates headcount and wage sums by job role.",
      "Outer query applies SUM() OVER running total."
    ],
    "solution_explanation": "Workforce compensation concentration across departments.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-066",
    "domain": "restaurants",
    "level": 5,
    "order": 66,
    "difficulty": "challenging",
    "title": "Waste Loss Percentage of Total Inventory Valuation",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Compare total food waste dollar loss against total on-hand inventory valuation company-wide using a CTE.",
    "context_notes": "Chained CTEs: total_waste, total_inventory, compute ratio.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "Arithmetic"
    ],
    "expected_columns": [
      "total_waste_loss",
      "total_inventory_value",
      "waste_to_inventory_pct"
    ],
    "reference_sql": "WITH waste_val AS (SELECT SUM(wl.quantity_wasted * i.unit_cost) AS total_waste FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id), stock_val AS (SELECT SUM(unit_cost * current_stock_qty) AS total_stock FROM ingredients) SELECT ROUND(wv.total_waste, 2) AS total_waste_loss, ROUND(sv.total_stock, 2) AS total_inventory_value, ROUND((wv.total_waste / sv.total_stock) * 100, 2) AS waste_to_inventory_pct FROM waste_val wv CROSS JOIN stock_val sv;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 calculates cumulative waste loss dollars.",
      "CTE 2 calculates total inventory balance sheet value.",
      "Cross join computes loss percentage of active stock."
    ],
    "solution_explanation": "Enterprise inventory shrinkage ratio against balance sheet.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-067",
    "domain": "restaurants",
    "level": 5,
    "order": 67,
    "difficulty": "challenging",
    "title": "Top 3 Server Revenue Contribution Within Lunch Shift Proxy",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Rank servers by sales volume strictly for checks closed prior to 19:30 using DENSE_RANK.",
    "context_notes": "WITH lunch_orders AS (...) SELECT with DENSE_RANK LIMIT 3.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "DENSE_RANK",
      "WHERE",
      "GROUP BY",
      "LIMIT"
    ],
    "expected_columns": [
      "server_name",
      "early_sales",
      "early_rank"
    ],
    "reference_sql": "WITH early_orders AS (SELECT server_name, ROUND(SUM(total_amount), 2) AS early_sales, DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS early_rank FROM orders WHERE order_time < '2024-04-20 19:30:00' GROUP BY server_name) SELECT server_name, early_sales, early_rank FROM early_orders ORDER BY early_rank, server_name LIMIT 3;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE filters orders before peak dinner hour and ranks servers.",
      "Outer query returns top 3 servers by early sales."
    ],
    "solution_explanation": "Identifies top daytime and early-service floor producers.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L5-068",
    "domain": "restaurants",
    "level": 5,
    "order": 68,
    "difficulty": "challenging",
    "title": "Dishes With High Food Cost and High Waste Frequency",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find ingredients with unit cost >= $10 that have been logged in waste records at least twice.",
    "context_notes": "WITH high_cost_waste AS (...) GROUP BY ingredient HAVING COUNT >= 2.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "WHERE",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "ingredient_name",
      "category",
      "unit_cost",
      "times_logged_waste",
      "total_waste_loss"
    ],
    "reference_sql": "WITH high_cost_waste AS (SELECT i.ingredient_name, i.category, i.unit_cost, COUNT(wl.id) AS times_logged_waste, ROUND(SUM(wl.quantity_wasted * i.unit_cost), 2) AS total_waste_loss FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id WHERE i.unit_cost >= 10.00 GROUP BY i.ingredient_name, i.category, i.unit_cost HAVING COUNT(wl.id) >= 2) SELECT ingredient_name, category, unit_cost, times_logged_waste, total_waste_loss FROM high_cost_waste ORDER BY total_waste_loss DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE joins waste_logs with premium ingredients (cost >= 10).",
      "Filters for items logged in waste at least twice."
    ],
    "solution_explanation": "High-value recurring food loss triage list.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "rest-L5-069",
    "domain": "restaurants",
    "level": 5,
    "order": 69,
    "difficulty": "challenging",
    "title": "Monthly Procurement vs Food Waste Trend via Chained CTEs",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Compare total procurement spend against total food waste by month using chained CTEs.",
    "context_notes": "Chained CTEs: monthly_purchases, monthly_waste, joined on month.",
    "concepts": [
      "WITH",
      "SELECT",
      "FULL JOIN",
      "SUM",
      "GROUP BY"
    ],
    "expected_columns": [
      "purchase_month",
      "procurement_spend",
      "food_waste_loss"
    ],
    "reference_sql": "WITH monthly_po AS (SELECT EXTRACT(MONTH FROM purchase_date)::INT AS po_month, ROUND(SUM(total_amount), 2) AS po_spend FROM ingredient_purchases GROUP BY EXTRACT(MONTH FROM purchase_date)), monthly_waste AS (SELECT EXTRACT(MONTH FROM wl.log_date)::INT AS waste_month, ROUND(SUM(wl.quantity_wasted * i.unit_cost), 2) AS waste_loss FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY EXTRACT(MONTH FROM wl.log_date)) SELECT COALESCE(mp.po_month, mw.waste_month) AS purchase_month, COALESCE(mp.po_spend, 0) AS procurement_spend, COALESCE(mw.waste_loss, 0) AS food_waste_loss FROM monthly_po mp FULL JOIN monthly_waste mw ON mp.po_month = mw.waste_month ORDER BY purchase_month;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 aggregates purchases by month.",
      "CTE 2 aggregates waste by month.",
      "Full outer join aligns monthly procurement vs food loss."
    ],
    "solution_explanation": "Monthly food procurement vs kitchen shrinkage pacing.",
    "xp": 50,
    "estimated_minutes": 13
  },
  {
    "id": "rest-L5-070",
    "domain": "restaurants",
    "level": 5,
    "order": 70,
    "difficulty": "challenging",
    "title": "Server Sales Yield per Shift Worked",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For servers with both orders and shifts, calculate total order sales divided by total shifts worked.",
    "context_notes": "Chained CTEs: server_sales, server_shifts, compute sales per shift.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "server_name",
      "total_sales",
      "shifts_worked",
      "sales_per_shift"
    ],
    "reference_sql": "WITH server_sales AS (SELECT server_name, SUM(total_amount) AS sales FROM orders GROUP BY server_name), server_shifts AS (SELECT sm.name AS server_name, COUNT(s.id) AS shift_count FROM staff_members sm JOIN shifts s ON sm.id = s.staff_id WHERE sm.role = 'Server' GROUP BY sm.name) SELECT ss.server_name, ROUND(ss.sales, 2) AS total_sales, sc.shift_count AS shifts_worked, ROUND(ss.sales / NULLIF(sc.shift_count, 0), 2) AS sales_per_shift FROM server_sales ss JOIN server_shifts sc ON ss.server_name = sc.server_name ORDER BY sales_per_shift DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 computes total sales generated per server.",
      "CTE 2 computes shift count worked per server.",
      "Computes revenue throughput normalized per shift."
    ],
    "solution_explanation": "Floor sales productivity normalized per scheduled shift.",
    "xp": 50,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L5-071",
    "domain": "restaurants",
    "level": 5,
    "order": 71,
    "difficulty": "challenging",
    "title": "Venues Achieving Target Rating and Cover Thresholds",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Find restaurants that have achieved an average rating >= 4.0 AND total reservation covers >= 10.",
    "context_notes": "Chained CTEs: venue_ratings, venue_covers, joined to restaurants.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "avg_rating",
      "total_covers"
    ],
    "reference_sql": "WITH venue_ratings AS (SELECT restaurant_id, ROUND(AVG(rating), 2) AS avg_score FROM guest_reviews GROUP BY restaurant_id), venue_covers AS (SELECT restaurant_id, SUM(party_size) AS covers FROM reservations GROUP BY restaurant_id) SELECT r.name AS restaurant_name, r.city, vr.avg_score AS avg_rating, vc.covers AS total_covers FROM restaurants r JOIN venue_ratings vr ON r.id = vr.restaurant_id JOIN venue_covers vc ON r.id = vc.restaurant_id WHERE vr.avg_score >= 4.0 AND vc.covers >= 10 ORDER BY vr.avg_score DESC, vc.covers DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 computes average review rating per restaurant.",
      "CTE 2 computes total covers per restaurant.",
      "Outer query filters for rating >= 4.0 and covers >= 10."
    ],
    "solution_explanation": "Identifies high-performing venues meeting operational targets.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-072",
    "domain": "restaurants",
    "level": 5,
    "order": 72,
    "difficulty": "challenging",
    "title": "Top 3 Highest Profit Categories With Waste Deduction",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Rank menu categories by net profit after subtracting food waste cost, returning the top 3 categories.",
    "context_notes": "Chained CTEs: cat_gross_profit, cat_waste, joined on category LIMIT 3.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "LEFT JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "category",
      "gross_profit",
      "waste_cost",
      "net_category_profit"
    ],
    "reference_sql": "WITH cat_gross AS (SELECT mi.category, SUM(oi.quantity * (mi.price - mi.cost)) AS gross_profit FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.category), cat_waste AS (SELECT i.category, SUM(wl.quantity_wasted * i.unit_cost) AS waste FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY i.category) SELECT cg.category, ROUND(cg.gross_profit, 2) AS gross_profit, ROUND(COALESCE(cw.waste, 0), 2) AS waste_cost, ROUND(cg.gross_profit - COALESCE(cw.waste, 0), 2) AS net_category_profit FROM cat_gross cg LEFT JOIN cat_waste cw ON LOWER(cg.category) = LOWER(cw.category) ORDER BY net_category_profit DESC LIMIT 3;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 computes gross profit per menu category.",
      "CTE 2 computes food waste loss per category.",
      "Returns top 3 categories by net bottom-line profit."
    ],
    "solution_explanation": "Category contribution leaderboard after shrinkage adjustment.",
    "xp": 50,
    "estimated_minutes": 13
  },
  {
    "id": "rest-L5-073",
    "domain": "restaurants",
    "level": 5,
    "order": 73,
    "difficulty": "challenging",
    "title": "Staff Wage Inflation vs Experience Role Ladder",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each role, calculate minimum wage, maximum wage, and ratio of maximum to minimum wage.",
    "context_notes": "WITH role_bounds AS (...) SELECT max / min wage ratio.",
    "concepts": [
      "WITH",
      "SELECT",
      "MIN",
      "MAX",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "role",
      "min_wage",
      "max_wage",
      "wage_spread_ratio"
    ],
    "reference_sql": "WITH role_bounds AS (SELECT role, MIN(hourly_rate) AS min_w, MAX(hourly_rate) AS max_w FROM staff_members GROUP BY role) SELECT role, min_w AS min_wage, max_w AS max_wage, ROUND(max_w / NULLIF(min_w, 0), 2) AS wage_spread_ratio FROM role_bounds ORDER BY wage_spread_ratio DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE computes min and max hourly rate per role.",
      "Outer query calculates spread ratio."
    ],
    "solution_explanation": "Wage band dispersion analysis across job families.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-074",
    "domain": "restaurants",
    "level": 5,
    "order": 74,
    "difficulty": "challenging",
    "title": "Waste Frequency by Reason and Category Heatmap",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Count number of waste incidents grouped by ingredient category and waste reason using a CTE.",
    "context_notes": "WITH waste_matrix AS (...) GROUP BY category and reason.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "reason",
      "incident_count"
    ],
    "reference_sql": "WITH waste_matrix AS (SELECT i.category, wl.reason, COUNT(*) AS incident_count FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY i.category, wl.reason) SELECT category, reason, incident_count FROM waste_matrix ORDER BY category, incident_count DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE joins waste_logs with ingredients.",
      "Groups incident frequency by category and reason."
    ],
    "solution_explanation": "Cross-tabulation matrix of kitchen waste drivers.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-075",
    "domain": "restaurants",
    "level": 5,
    "order": 75,
    "difficulty": "challenging",
    "title": "Venues With Higher Prime Cost Than Network Median",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find restaurants whose combined prime cost (purchases + labor) is strictly above the average venue prime cost.",
    "context_notes": "Chained CTEs: venue_prime_costs, compare against average.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "LEFT JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "WHERE"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "total_prime_cost"
    ],
    "reference_sql": "WITH venue_cogs AS (SELECT restaurant_id, SUM(total_amount) AS cogs FROM ingredient_purchases GROUP BY restaurant_id), venue_labor AS (SELECT sm.restaurant_id, SUM(s.hours_worked * sm.hourly_rate) AS labor FROM staff_members sm JOIN shifts s ON sm.id = s.staff_id GROUP BY sm.restaurant_id), venue_prime AS (SELECT r.name AS restaurant_name, r.city, ROUND(COALESCE(vc.cogs, 0) + COALESCE(vl.labor, 0), 2) AS prime_cost FROM restaurants r LEFT JOIN venue_cogs vc ON r.id = vc.restaurant_id LEFT JOIN venue_labor vl ON r.id = vl.restaurant_id WHERE vc.cogs IS NOT NULL OR vl.labor IS NOT NULL) SELECT restaurant_name, city, prime_cost AS total_prime_cost FROM venue_prime WHERE prime_cost > (SELECT AVG(prime_cost) FROM venue_prime) ORDER BY prime_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Chained CTEs compute COGS, labor, and total prime cost per venue.",
      "Outer query filters venues exceeding the network average."
    ],
    "solution_explanation": "Flags high-cost operating locations for cost rationalization.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "rest-L5-076",
    "domain": "restaurants",
    "level": 5,
    "order": 76,
    "difficulty": "boss",
    "title": "Master Corporate P&L Statement With Waste Deduction",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Complete corporate P&L statement: Gross Sales, COGS Purchases, Direct Labor, Food Waste Loss, Prime Cost, and Operating Profit.",
    "context_notes": "5 Chained CTEs: sales, cogs, labor, waste, combined into consolidated P&L.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "Arithmetic"
    ],
    "expected_columns": [
      "gross_sales",
      "cogs_purchases",
      "direct_labor",
      "food_waste_loss",
      "prime_cost",
      "gross_operating_profit"
    ],
    "reference_sql": "WITH sales_summary AS (SELECT SUM(total_amount) AS gross_sales FROM orders), cogs_summary AS (SELECT SUM(total_amount) AS cogs FROM ingredient_purchases), labor_summary AS (SELECT SUM(s.hours_worked * sm.hourly_rate) AS labor FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id), waste_summary AS (SELECT SUM(wl.quantity_wasted * i.unit_cost) AS waste FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id) SELECT ROUND(s.gross_sales, 2) AS gross_sales, ROUND(c.cogs, 2) AS cogs_purchases, ROUND(l.labor, 2) AS direct_labor, ROUND(w.waste, 2) AS food_waste_loss, ROUND(c.cogs + l.labor, 2) AS prime_cost, ROUND(s.gross_sales - (c.cogs + l.labor + w.waste), 2) AS gross_operating_profit FROM sales_summary s CROSS JOIN cogs_summary c CROSS JOIN labor_summary l CROSS JOIN waste_summary w;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Consolidates sales, procurement COGS, payroll, and kitchen shrinkage into GAAP P&L."
    ],
    "solution_explanation": "The definitive C-suite executive financial statement for the restaurant network.",
    "xp": 60,
    "estimated_minutes": 18
  },
  {
    "id": "rest-L5-077",
    "domain": "restaurants",
    "level": 5,
    "order": 77,
    "difficulty": "boss",
    "title": "Venue 360 Health Scorecard Across 5 Dimensions",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Comprehensive venue scorecard: name, city, seating, total covers, total reviews, avg rating, and procurement spend.",
    "context_notes": "Chained CTEs: venue_covers, venue_revs, venue_spend, joined to restaurants.",
    "concepts": [
      "WITH",
      "SELECT",
      "LEFT JOIN",
      "COUNT",
      "SUM",
      "AVG",
      "GROUP BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "seating_capacity",
      "total_covers",
      "review_count",
      "avg_rating",
      "procurement_spend"
    ],
    "reference_sql": "WITH v_covers AS (SELECT restaurant_id, SUM(party_size) AS covers FROM reservations GROUP BY restaurant_id), v_reviews AS (SELECT restaurant_id, COUNT(id) AS rev_cnt, ROUND(AVG(rating), 2) AS avg_r FROM guest_reviews GROUP BY restaurant_id), v_spend AS (SELECT restaurant_id, ROUND(SUM(total_amount), 2) AS spend FROM ingredient_purchases GROUP BY restaurant_id) SELECT r.name AS restaurant_name, r.city, r.seating_capacity, COALESCE(vc.covers, 0) AS total_covers, COALESCE(vr.rev_cnt, 0) AS review_count, vr.avg_r AS avg_rating, COALESCE(vs.spend, 0) AS procurement_spend FROM restaurants r LEFT JOIN v_covers vc ON r.id = vc.restaurant_id LEFT JOIN v_reviews vr ON r.id = vr.restaurant_id LEFT JOIN v_spend vs ON r.id = vs.restaurant_id ORDER BY vr.avg_r DESC NULLS LAST, total_covers DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Consolidates reservations, guest sentiment, and procurement spend per venue."
    ],
    "solution_explanation": "360-degree multi-dimensional venue operations report card.",
    "xp": 55,
    "estimated_minutes": 16
  },
  {
    "id": "rest-L5-078",
    "domain": "restaurants",
    "level": 5,
    "order": 78,
    "difficulty": "boss",
    "title": "Menu Engineering BCG Matrix with Waste Adjustments",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Complete menu engineering analysis: recipe price, cost, margin %, units sold, waste dollars, and final net profit.",
    "context_notes": "Chained CTEs: item_sales, item_waste, joined to menu_items.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "LEFT JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "dish_name",
      "category",
      "price",
      "cost",
      "margin_pct",
      "units_sold",
      "gross_profit"
    ],
    "reference_sql": "WITH item_sales AS (SELECT menu_item_id, SUM(quantity) AS units_sold, SUM(quantity * mi.price) AS revenue, SUM(quantity * (mi.price - mi.cost)) AS gross_profit FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY menu_item_id) SELECT mi.name AS dish_name, mi.category, mi.price, mi.cost, ROUND(((mi.price - mi.cost) / mi.price) * 100, 1) AS margin_pct, COALESCE(its.units_sold, 0) AS units_sold, ROUND(COALESCE(its.gross_profit, 0), 2) AS gross_profit FROM menu_items mi LEFT JOIN item_sales its ON mi.id = its.menu_item_id ORDER BY gross_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Combines sales volume, recipe cost, and gross profit into menu engineering matrix."
    ],
    "solution_explanation": "Master menu optimization and profitability engineering sheet.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "rest-L5-079",
    "domain": "restaurants",
    "level": 5,
    "order": 79,
    "difficulty": "boss",
    "title": "Server Tip & Labor PnL Matrix",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each server, calculate total checks closed, gross sales, hours worked, wage cost, and sales-to-payroll multiplier.",
    "context_notes": "Chained CTEs: server_sales, server_hours, compute revenue multiplier.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "server_name",
      "checks_served",
      "gross_sales",
      "hours_worked",
      "labor_cost",
      "revenue_multiplier"
    ],
    "reference_sql": "WITH server_sales AS (SELECT server_name, COUNT(*) AS checks, SUM(total_amount) AS sales FROM orders GROUP BY server_name), server_hours AS (SELECT sm.name AS server_name, SUM(s.hours_worked) AS hours, SUM(s.hours_worked * sm.hourly_rate) AS labor FROM staff_members sm JOIN shifts s ON sm.id = s.staff_id WHERE sm.role = 'Server' GROUP BY sm.name) SELECT ss.server_name, ss.checks AS checks_served, ROUND(ss.sales, 2) AS gross_sales, ROUND(sh.hours, 2) AS hours_worked, ROUND(sh.labor, 2) AS labor_cost, ROUND(ss.sales / NULLIF(sh.labor, 0), 2) AS revenue_multiplier FROM server_sales ss JOIN server_hours sh ON ss.server_name = sh.server_name ORDER BY revenue_multiplier DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 computes sales and checks per server.",
      "CTE 2 computes hours and wages earned.",
      "Computes revenue-to-labor efficiency multiplier."
    ],
    "solution_explanation": "Server ROI scorecard: dollars of sales generated per dollar of payroll.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "rest-L5-080",
    "domain": "restaurants",
    "level": 5,
    "order": 80,
    "difficulty": "boss",
    "title": "Supplier Quality vs Reliability Matrix",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Complete supplier assessment: name, category, rating, invoice count, total spend, and average invoice size.",
    "context_notes": "JOIN suppliers with ingredient_purchases, full aggregations.",
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
      "supplier_name",
      "category",
      "rating",
      "invoice_count",
      "total_spend",
      "avg_invoice"
    ],
    "reference_sql": "SELECT s.supplier_name, s.category, s.rating, COUNT(ip.id) AS invoice_count, ROUND(SUM(ip.total_amount), 2) AS total_spend, ROUND(AVG(ip.total_amount), 2) AS avg_invoice FROM suppliers s JOIN ingredient_purchases ip ON s.id = ip.supplier_id GROUP BY s.supplier_name, s.category, s.rating ORDER BY total_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregates total vendor spend, transaction volume, and ticket size."
    ],
    "solution_explanation": "Vendor contract performance and reliability assessment.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-081",
    "domain": "restaurants",
    "level": 5,
    "order": 81,
    "difficulty": "boss",
    "title": "Pantry Capital Allocation & Stock Depletion Risk",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Rank ingredient categories by total holding value, showing item count, average unit cost, and total inventory value.",
    "context_notes": "GROUP BY category on ingredients, multiple aggregates.",
    "concepts": [
      "SELECT",
      "COUNT",
      "AVG",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "ingredient_count",
      "avg_unit_cost",
      "total_holding_value"
    ],
    "reference_sql": "SELECT category, COUNT(*) AS ingredient_count, ROUND(AVG(unit_cost), 2) AS avg_unit_cost, ROUND(SUM(unit_cost * current_stock_qty), 2) AS total_holding_value FROM ingredients GROUP BY category ORDER BY total_holding_value DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregates raw pantry valuation by category."
    ],
    "solution_explanation": "Capital allocation across fresh vs frozen vs dry inventory.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-082",
    "domain": "restaurants",
    "level": 5,
    "order": 82,
    "difficulty": "boss",
    "title": "Venue Seating Density vs Revenue Generation Capacity",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Rank restaurants by total dining tables available and show city, seating capacity, and table count.",
    "context_notes": "JOIN restaurants with dining_tables, GROUP BY restaurant, ORDER BY table_count DESC.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "seating_capacity",
      "table_count"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, r.seating_capacity, COUNT(dt.id) AS table_count FROM restaurants r JOIN dining_tables dt ON r.id = dt.restaurant_id GROUP BY r.name, r.city, r.seating_capacity ORDER BY table_count DESC, r.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Counts physical dining tables per restaurant location."
    ],
    "solution_explanation": "Floor asset inventory across all regional venues.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L5-083",
    "domain": "restaurants",
    "level": 5,
    "order": 83,
    "difficulty": "boss",
    "title": "Kitchen Headcount vs Preparation Shift Coverage",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each restaurant, calculate culinary staff headcount (Chefs, Line Cooks) and total kitchen shift hours worked.",
    "context_notes": "JOIN restaurants, staff_members, shifts WHERE culinary roles.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT DISTINCT",
      "SUM",
      "WHERE",
      "IN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "kitchen_headcount",
      "kitchen_hours_worked"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, COUNT(DISTINCT sm.id) AS kitchen_headcount, ROUND(SUM(s.hours_worked), 2) AS kitchen_hours_worked FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id JOIN shifts s ON sm.id = s.staff_id WHERE sm.role IN ('Executive_Chef', 'Sous_Chef', 'Line_Cook') GROUP BY r.name, r.city ORDER BY kitchen_hours_worked DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregates culinary kitchen staff headcount and total hours worked per venue."
    ],
    "solution_explanation": "Back-of-house culinary capacity and production labor strength.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "rest-L5-084",
    "domain": "restaurants",
    "level": 5,
    "order": 84,
    "difficulty": "boss",
    "title": "Dishes With Peak Gross Profit in Each Food Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find the single highest total gross profit dish within each menu category using ROW_NUMBER.",
    "context_notes": "Chained CTE with ROW_NUMBER() OVER (PARTITION BY category ORDER BY profit DESC) = 1.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "ROW_NUMBER",
      "PARTITION BY",
      "SUM",
      "GROUP BY",
      "WHERE"
    ],
    "expected_columns": [
      "category",
      "dish_name",
      "total_profit"
    ],
    "reference_sql": "WITH dish_pnl AS (SELECT mi.category, mi.name AS dish_name, ROUND(SUM(oi.quantity * (mi.price - mi.cost)), 2) AS total_profit, ROW_NUMBER() OVER (PARTITION BY mi.category ORDER BY SUM(oi.quantity * (mi.price - mi.cost)) DESC) AS rn FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.category, mi.name) SELECT category, dish_name, total_profit FROM dish_pnl WHERE rn = 1 ORDER BY total_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Ranks dishes by gross profit within each menu category.",
      "Filters top rank profit generator per station."
    ],
    "solution_explanation": "Identifies primary profit engine for every kitchen station.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "rest-L5-085",
    "domain": "restaurants",
    "level": 5,
    "order": 85,
    "difficulty": "boss",
    "title": "Hospitality Satisfaction Index: Rating vs Volume Quartiles",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Group restaurants into 4 satisfaction tiers based on average review score and show review volume.",
    "context_notes": "WITH venue_reviews AS (...) SELECT with NTILE(4).",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "AVG",
      "COUNT",
      "NTILE",
      "GROUP BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "review_count",
      "avg_rating",
      "satisfaction_tier"
    ],
    "reference_sql": "WITH venue_reviews AS (SELECT r.name AS restaurant_name, r.city, COUNT(gr.id) AS review_count, ROUND(AVG(gr.rating), 2) AS avg_rating FROM restaurants r JOIN guest_reviews gr ON r.id = gr.restaurant_id GROUP BY r.name, r.city) SELECT restaurant_name, city, review_count, avg_rating, NTILE(4) OVER (ORDER BY avg_rating DESC) AS satisfaction_tier FROM venue_reviews ORDER BY satisfaction_tier, avg_rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE computes review metrics per restaurant.",
      "Outer query groups venues into quartiles based on rating."
    ],
    "solution_explanation": "Corporate hospitality satisfaction quartile ranking.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-086",
    "domain": "restaurants",
    "level": 5,
    "order": 86,
    "difficulty": "boss",
    "title": "Waste Logs Summary: Spoilage vs Preparation Errors Ratio",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Calculate total waste dollars lost from Spoilage vs preparation errors (Over_Prep, Burnt, Drop) side-by-side.",
    "context_notes": "WITH waste_breakdown AS (...) compute comparison.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "CASE WHEN",
      "Arithmetic"
    ],
    "expected_columns": [
      "spoilage_dollars",
      "prep_error_dollars",
      "prep_to_spoilage_ratio"
    ],
    "reference_sql": "WITH waste_breakdown AS (SELECT SUM(CASE WHEN wl.reason = 'Spoilage' THEN wl.quantity_wasted * i.unit_cost ELSE 0 END) AS spoilage_loss, SUM(CASE WHEN wl.reason IN ('Over_Prep', 'Burnt', 'Drop') THEN wl.quantity_wasted * i.unit_cost ELSE 0 END) AS prep_error_loss FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id) SELECT ROUND(spoilage_loss, 2) AS spoilage_dollars, ROUND(prep_error_loss, 2) AS prep_error_dollars, ROUND(prep_error_loss / NULLIF(spoilage_loss, 0), 2) AS prep_to_spoilage_ratio FROM waste_breakdown;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE separates spoilage vs culinary human error losses.",
      "Computes operational error to spoilage ratio."
    ],
    "solution_explanation": "Operational diagnosis: inventory shelf-life vs culinary kitchen execution.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-087",
    "domain": "restaurants",
    "level": 5,
    "order": 87,
    "difficulty": "boss",
    "title": "Server Floor Pacing: Average Ticket Turn Speed",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For server Alessandro M., show each order id, order time, ticket amount, and running check count.",
    "context_notes": "Filter orders for Alessandro M. with COUNT OVER running sequence.",
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
      "shift_order_num",
      "running_sales"
    ],
    "reference_sql": "SELECT id, order_time, total_amount, COUNT(*) OVER (ORDER BY order_time, id) AS shift_order_num, ROUND(SUM(total_amount) OVER (ORDER BY order_time, id), 2) AS running_sales FROM orders WHERE server_name = 'Alessandro M.' ORDER BY order_time, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter orders for specific lead server.",
      "Compute running order sequence and cumulative sales."
    ],
    "solution_explanation": "Tracks lead server shift momentum and pace.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L5-088",
    "domain": "restaurants",
    "level": 5,
    "order": 88,
    "difficulty": "boss",
    "title": "Cellar Inventory Valuation vs Monthly Beverage Sales",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Compare total dollar value of fine wine and beverage menu sales against total dry goods inventory holding value.",
    "context_notes": "Chained CTEs: beverage_sales, dry_goods_stock.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "WHERE",
      "Arithmetic"
    ],
    "expected_columns": [
      "gross_beverage_sales",
      "dry_goods_stock_value",
      "beverage_sales_to_stock_ratio"
    ],
    "reference_sql": "WITH beverage_sales AS (SELECT SUM(oi.quantity * mi.price) AS sales FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id WHERE mi.category = 'beverage'), dry_goods AS (SELECT SUM(unit_cost * current_stock_qty) AS stock FROM ingredients WHERE category = 'Dry Goods') SELECT ROUND(bs.sales, 2) AS gross_beverage_sales, ROUND(dg.stock, 2) AS dry_goods_stock_value, ROUND(bs.sales / NULLIF(dg.stock, 0), 2) AS beverage_sales_to_stock_ratio FROM beverage_sales bs CROSS JOIN dry_goods dg;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 calculates beverage order sales.",
      "CTE 2 calculates dry goods inventory value.",
      "Computes ratio of beverage sales to inventory."
    ],
    "solution_explanation": "Cellar stock turnover and liquidity balance.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-089",
    "domain": "restaurants",
    "level": 5,
    "order": 89,
    "difficulty": "boss",
    "title": "Venues With Complete Leadership Triangle (Chef, Host, Sommelier)",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Find restaurants that have all three key leadership roles on staff: an Executive Chef, a Host, and a Sommelier.",
    "context_notes": "Chained CTEs or INTERSECT matching all 3 roles per restaurant.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "INTERSECT"
    ],
    "expected_columns": [
      "restaurant_name",
      "city"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id WHERE sm.role = 'Executive_Chef' INTERSECT SELECT r.name AS restaurant_name, r.city FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id WHERE sm.role = 'Host' INTERSECT SELECT r.name AS restaurant_name, r.city FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id WHERE sm.role = 'Sommelier' ORDER BY restaurant_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Finds venues staffed with Executive_Chef INTERSECT Host INTERSECT Sommelier."
    ],
    "solution_explanation": "Identifies locations with complete luxury hospitality staffing triangles.",
    "xp": 50,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L5-090",
    "domain": "restaurants",
    "level": 5,
    "order": 90,
    "difficulty": "boss",
    "title": "Recipe Margin Erosion: Food Waste per Menu Portion Sold",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Calculate total food waste dollars divided by total menu portions sold across all checks to find Waste Tax per plate.",
    "context_notes": "Chained CTEs: total_waste, total_portions_sold.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "Arithmetic"
    ],
    "expected_columns": [
      "total_waste_loss",
      "total_portions_sold",
      "waste_loss_per_plate"
    ],
    "reference_sql": "WITH total_waste AS (SELECT SUM(wl.quantity_wasted * i.unit_cost) AS waste FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id), total_portions AS (SELECT SUM(quantity) AS portions FROM order_items) SELECT ROUND(tw.waste, 2) AS total_waste_loss, tp.portions AS total_portions_sold, ROUND(tw.waste / tp.portions, 2) AS waste_loss_per_plate FROM total_waste tw CROSS JOIN total_portions tp;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 sums total food waste dollars.",
      "CTE 2 sums total dish portions sold.",
      "Calculates average food waste cost incurred per plate served."
    ],
    "solution_explanation": "Culinary efficiency metric: average waste drag per plate.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-091",
    "domain": "restaurants",
    "level": 5,
    "order": 91,
    "difficulty": "boss",
    "title": "Top 3 Largest Purchase Transactions with Vendor and Venue Detail",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Identify the 3 largest single procurement purchase orders: invoice id, supplier name, restaurant name, city, amount, and date.",
    "context_notes": "3-way JOIN: ingredient_purchases, suppliers, restaurants. ORDER BY total_amount DESC LIMIT 3.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "supplier_name",
      "restaurant_name",
      "city",
      "total_amount",
      "purchase_date"
    ],
    "reference_sql": "SELECT ip.id, s.supplier_name, r.name AS restaurant_name, r.city, ip.total_amount, ip.purchase_date FROM ingredient_purchases ip JOIN suppliers s ON ip.supplier_id = s.id JOIN restaurants r ON ip.restaurant_id = r.id ORDER BY ip.total_amount DESC LIMIT 3;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join ingredient_purchases with suppliers and restaurants.",
      "Order by total_amount DESC LIMIT 3."
    ],
    "solution_explanation": "Audit records for top procurement transactions.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L5-092",
    "domain": "restaurants",
    "level": 5,
    "order": 92,
    "difficulty": "boss",
    "title": "Server Earnings vs Revenue Generation Rank Comparison",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Compare server rank by gross revenue closed against their rank by shift hours worked using DENSE_RANK.",
    "context_notes": "Chained CTEs: server_rev_rank, server_hours_rank, joined on name.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "DENSE_RANK",
      "GROUP BY"
    ],
    "expected_columns": [
      "server_name",
      "gross_sales",
      "sales_rank",
      "hours_worked",
      "hours_rank"
    ],
    "reference_sql": "WITH server_rev AS (SELECT server_name, ROUND(SUM(total_amount), 2) AS gross_sales, DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS sales_rank FROM orders GROUP BY server_name), server_hrs AS (SELECT sm.name AS server_name, ROUND(SUM(s.hours_worked), 2) AS hours_worked, DENSE_RANK() OVER (ORDER BY SUM(s.hours_worked) DESC) AS hours_rank FROM staff_members sm JOIN shifts s ON sm.id = s.staff_id WHERE sm.role = 'Server' GROUP BY sm.name) SELECT sr.server_name, sr.gross_sales, sr.sales_rank, sh.hours_worked, sh.hours_rank FROM server_rev sr JOIN server_hrs sh ON sr.server_name = sh.server_name ORDER BY sr.sales_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 ranks servers by revenue.",
      "CTE 2 ranks servers by hours worked.",
      "Joined to identify high-efficiency servers."
    ],
    "solution_explanation": "Identifies floor servers generating top sales in fewer scheduled hours.",
    "xp": 50,
    "estimated_minutes": 13
  },
  {
    "id": "rest-L5-093",
    "domain": "restaurants",
    "level": 5,
    "order": 93,
    "difficulty": "boss",
    "title": "Venues With Below Average Prime Cost and Above Average Rating",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find high-efficiency star restaurants: venues whose prime cost is below average but whose review rating is above average.",
    "context_notes": "Chained CTEs: venue_prime, venue_rating, combined with WHERE filters.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "LEFT JOIN",
      "SUM",
      "AVG",
      "GROUP BY",
      "WHERE"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "prime_cost",
      "avg_rating"
    ],
    "reference_sql": "WITH venue_prime AS (SELECT r.id, r.name AS restaurant_name, r.city, ROUND(COALESCE(SUM(ip.total_amount), 0), 2) AS prime_cost FROM restaurants r LEFT JOIN ingredient_purchases ip ON r.id = ip.restaurant_id GROUP BY r.id, r.name, r.city), venue_ratings AS (SELECT restaurant_id, ROUND(AVG(rating), 2) AS avg_score FROM guest_reviews GROUP BY restaurant_id) SELECT vp.restaurant_name, vp.city, vp.prime_cost, vr.avg_score AS avg_rating FROM venue_prime vp JOIN venue_ratings vr ON vp.id = vr.restaurant_id WHERE vp.prime_cost < (SELECT AVG(prime_cost) FROM venue_prime) AND vr.avg_score > (SELECT AVG(avg_score) FROM venue_ratings) ORDER BY vr.avg_score DESC, vp.prime_cost ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 computes procurement prime cost per venue.",
      "CTE 2 computes average review score.",
      "Filters venues with low cost and high satisfaction."
    ],
    "solution_explanation": "The Holy Grail: lean cost structure with superior guest ratings.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "rest-L5-094",
    "domain": "restaurants",
    "level": 5,
    "order": 94,
    "difficulty": "boss",
    "title": "Dishes Contributing to 90 Percent of Total Units Sold",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Calculate running cumulative units sold across all dishes ordered by volume DESC, showing dish name, units, and running sum.",
    "context_notes": "WITH dish_units AS (...) SELECT with running SUM OVER.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "SUM OVER",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "category",
      "units_sold",
      "running_units_sold"
    ],
    "reference_sql": "WITH dish_units AS (SELECT mi.name, mi.category, SUM(oi.quantity) AS units_sold FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.name, mi.category) SELECT name, category, units_sold, SUM(units_sold) OVER (ORDER BY units_sold DESC) AS running_units_sold FROM dish_units ORDER BY units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE computes total units sold per dish.",
      "Outer query applies SUM() OVER running total."
    ],
    "solution_explanation": "Volume concentration curve across all 30 menu items.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L5-095",
    "domain": "restaurants",
    "level": 5,
    "order": 95,
    "difficulty": "boss",
    "title": "Total Culinary Payroll by Restaurant Scale Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Compare total culinary shift payroll across Boutique (<=120 seats) vs Grand (>120 seats) restaurants.",
    "context_notes": "JOIN restaurants, staff_members, shifts WHERE culinary roles, CASE WHEN on capacity.",
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
      "venue_scale",
      "total_culinary_payroll"
    ],
    "reference_sql": "SELECT CASE WHEN r.seating_capacity <= 120 THEN 'Boutique (<=120)' ELSE 'Grand (>120)' END AS venue_scale, ROUND(SUM(s.hours_worked * sm.hourly_rate), 2) AS total_culinary_payroll FROM restaurants r JOIN staff_members sm ON r.id = sm.restaurant_id JOIN shifts s ON sm.id = s.staff_id WHERE sm.role IN ('Executive_Chef', 'Sous_Chef', 'Line_Cook') GROUP BY CASE WHEN r.seating_capacity <= 120 THEN 'Boutique (<=120)' ELSE 'Grand (>120)' END ORDER BY total_culinary_payroll DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Groups culinary shifts by boutique vs grand venue footprint.",
      "Sums hours * rate for kitchen staff."
    ],
    "solution_explanation": "Culinary payroll allocation by venue operating model.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L5-096",
    "domain": "restaurants",
    "level": 5,
    "order": 96,
    "difficulty": "boss",
    "title": "Consecutive Waste Day Spikes Detection via LAG",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each date with logged waste, compare that day waste dollar loss against the previous day waste loss using LAG.",
    "context_notes": "WITH daily_waste AS (...) SELECT with LAG and variance.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "LAG",
      "Arithmetic",
      "GROUP BY",
      "WINDOW"
    ],
    "expected_columns": [
      "log_date",
      "daily_waste",
      "prev_day_waste",
      "daily_waste_delta"
    ],
    "reference_sql": "WITH daily_waste AS (SELECT wl.log_date, ROUND(SUM(wl.quantity_wasted * i.unit_cost), 2) AS daily_waste FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id GROUP BY wl.log_date) SELECT log_date, daily_waste, LAG(daily_waste, 1) OVER (ORDER BY log_date) AS prev_day_waste, ROUND(daily_waste - LAG(daily_waste, 1) OVER (ORDER BY log_date), 2) AS daily_waste_delta FROM daily_waste ORDER BY log_date;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE computes total waste cost per calendar date.",
      "Outer query uses LAG to calculate day-over-day waste change."
    ],
    "solution_explanation": "Day-over-day food waste surge detection.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L5-097",
    "domain": "restaurants",
    "level": 5,
    "order": 97,
    "difficulty": "boss",
    "title": "Floor Server Productivity Index: Sales per Labor Dollar",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Calculate sales-to-payroll ratio for all servers, ranking them by return on labor dollar using DENSE_RANK.",
    "context_notes": "Chained CTEs: server_sales, server_labor, compute ratio and rank.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "DENSE_RANK",
      "GROUP BY"
    ],
    "expected_columns": [
      "server_name",
      "gross_sales",
      "labor_cost",
      "sales_per_labor_dollar",
      "productivity_rank"
    ],
    "reference_sql": "WITH server_sales AS (SELECT server_name, SUM(total_amount) AS sales FROM orders GROUP BY server_name), server_labor AS (SELECT sm.name AS server_name, SUM(s.hours_worked * sm.hourly_rate) AS labor FROM staff_members sm JOIN shifts s ON sm.id = s.staff_id WHERE sm.role = 'Server' GROUP BY sm.name) SELECT ss.server_name, ROUND(ss.sales, 2) AS gross_sales, ROUND(sl.labor, 2) AS labor_cost, ROUND(ss.sales / NULLIF(sl.labor, 0), 2) AS sales_per_labor_dollar, DENSE_RANK() OVER (ORDER BY (ss.sales / NULLIF(sl.labor, 0)) DESC) AS productivity_rank FROM server_sales ss JOIN server_labor sl ON ss.server_name = sl.server_name ORDER BY productivity_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "CTE 1 computes total sales by server.",
      "CTE 2 computes payroll by server.",
      "Ranks servers by sales generated per dollar of wage."
    ],
    "solution_explanation": "Definitive server return-on-labor-cost leaderboard.",
    "xp": 50,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L5-098",
    "domain": "restaurants",
    "level": 5,
    "order": 98,
    "difficulty": "boss",
    "title": "Venues With Balanced Operations: Low Waste, High Ratings, High Bookings",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find operating venues that maintain guest ratings >= 4.0, total covers >= 10, and recorded procurement spend.",
    "context_notes": "Chained CTEs combining venue reviews, reservations, and purchases.",
    "concepts": [
      "WITH",
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "avg_rating",
      "total_covers",
      "total_purchases"
    ],
    "reference_sql": "WITH v_reviews AS (SELECT restaurant_id, ROUND(AVG(rating), 2) AS avg_score FROM guest_reviews GROUP BY restaurant_id), v_covers AS (SELECT restaurant_id, SUM(party_size) AS covers FROM reservations GROUP BY restaurant_id), v_purchases AS (SELECT restaurant_id, ROUND(SUM(total_amount), 2) AS spend FROM ingredient_purchases GROUP BY restaurant_id) SELECT r.name AS restaurant_name, r.city, vr.avg_score AS avg_rating, vc.covers AS total_covers, vp.spend AS total_purchases FROM restaurants r JOIN v_reviews vr ON r.id = vr.restaurant_id JOIN v_covers vc ON r.id = vc.restaurant_id JOIN v_purchases vp ON r.id = vp.restaurant_id WHERE vr.avg_score >= 4.0 AND vc.covers >= 10 ORDER BY vr.avg_score DESC, vc.covers DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Consolidates guest sentiment, covers, and procurement spend.",
      "Filters venues meeting high performance standards across all three."
    ],
    "solution_explanation": "Comprehensive high-performance venue recognition.",
    "xp": 50,
    "estimated_minutes": 13
  },
  {
    "id": "rest-L5-099",
    "domain": "restaurants",
    "level": 5,
    "order": 99,
    "difficulty": "boss",
    "title": "Consolidated Enterprise Food & Beverage Operations Audit",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Consolidated executive audit: total menu items, total active servers, total restaurants, total suppliers, and total inventory value.",
    "context_notes": "Single-row enterprise executive summary combining all organizational entities.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "Arithmetic",
      "Subquery"
    ],
    "expected_columns": [
      "total_restaurants",
      "total_menu_dishes",
      "active_staff_headcount",
      "active_suppliers",
      "total_inventory_valuation"
    ],
    "reference_sql": "SELECT (SELECT COUNT(*) FROM restaurants) AS total_restaurants, (SELECT COUNT(*) FROM menu_items) AS total_menu_dishes, (SELECT COUNT(*) FROM staff_members) AS active_staff_headcount, (SELECT COUNT(*) FROM suppliers) AS active_suppliers, (SELECT ROUND(SUM(unit_cost * current_stock_qty), 2) FROM ingredients) AS total_inventory_valuation;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Consolidates master entity counts and balance sheet inventory into a single row."
    ],
    "solution_explanation": "Executive enterprise scale and asset foundation KPI card.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L5-100",
    "domain": "restaurants",
    "level": 5,
    "order": 100,
    "difficulty": "boss",
    "title": "The Ultimate Hospitality Financial & Operational Masterpiece",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Grand Level 5 Capstone: Consolidated Network P&L with Gross Revenue, COGS, Direct Labor, Kitchen Waste Loss, Net Profit, and Operating Margin %.",
    "context_notes": "Chained Master CTEs: all financial streams synthesized into enterprise operating statement.",
    "concepts": [
      "WITH",
      "SELECT",
      "SUM",
      "Arithmetic"
    ],
    "expected_columns": [
      "network_gross_sales",
      "ingredient_cogs",
      "direct_labor_payroll",
      "food_waste_shrinkage",
      "net_operating_profit",
      "operating_margin_pct"
    ],
    "reference_sql": "WITH revenue_stream AS (SELECT SUM(total_amount) AS total_revenue FROM orders), cogs_stream AS (SELECT SUM(total_amount) AS total_cogs FROM ingredient_purchases), labor_stream AS (SELECT SUM(s.hours_worked * sm.hourly_rate) AS total_labor FROM shifts s JOIN staff_members sm ON s.staff_id = sm.id), waste_stream AS (SELECT SUM(wl.quantity_wasted * i.unit_cost) AS total_waste FROM waste_logs wl JOIN ingredients i ON wl.ingredient_id = i.id) SELECT ROUND(r.total_revenue, 2) AS network_gross_sales, ROUND(c.total_cogs, 2) AS ingredient_cogs, ROUND(l.total_labor, 2) AS direct_labor_payroll, ROUND(w.total_waste, 2) AS food_waste_shrinkage, ROUND(r.total_revenue - (c.total_cogs + l.total_labor + w.total_waste), 2) AS net_operating_profit, ROUND(((r.total_revenue - (c.total_cogs + l.total_labor + w.total_waste)) / r.total_revenue) * 100, 1) AS operating_margin_pct FROM revenue_stream r CROSS JOIN cogs_stream c CROSS JOIN labor_stream l CROSS JOIN waste_stream w;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Synthesizes all 15 tables and operational streams into the definitive restaurant EBITDA statement."
    ],
    "solution_explanation": "The crowning Level 5 executive capstone query: complete enterprise P&L and net margin.",
    "xp": 75,
    "estimated_minutes": 20
  }
];
