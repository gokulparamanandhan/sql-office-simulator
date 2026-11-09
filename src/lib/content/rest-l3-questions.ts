import { QuestionDefinition } from "./ecom-l1-questions";

export const REST_L3_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "rest-L3-001",
    "domain": "restaurants",
    "level": 3,
    "order": 1,
    "difficulty": "warm-up",
    "title": "High-Rated Suppliers",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "We need to review our premium vendor roster — pull all suppliers who maintain a quality rating of 4.8 or higher.",
    "context_notes": "Filter suppliers table by rating >= 4.8.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "supplier_name",
      "category",
      "rating"
    ],
    "reference_sql": "SELECT supplier_name, category, rating FROM suppliers WHERE rating >= 4.8 ORDER BY rating DESC, supplier_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query suppliers table with WHERE rating >= 4.8.",
      "Order by rating DESC, supplier_name."
    ],
    "solution_explanation": "Filters suppliers meeting the executive quality threshold.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-002",
    "domain": "restaurants",
    "level": 3,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Low Stock Raw Ingredients",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which raw ingredients are running low? Show anything with current stock below 100 units so the prep team can reorder.",
    "context_notes": "Filter ingredients where current_stock_qty < 100.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "ingredient_name",
      "category",
      "current_stock_qty"
    ],
    "reference_sql": "SELECT ingredient_name, category, current_stock_qty FROM ingredients WHERE current_stock_qty < 100 ORDER BY current_stock_qty ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter ingredients table with WHERE current_stock_qty < 100.",
      "Sort ascending by stock to spot most urgent items."
    ],
    "solution_explanation": "Spots low-stock ingredients for immediate replenishment.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-003",
    "domain": "restaurants",
    "level": 3,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Total Spend With Verona Importers",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "How much have we spent in total with Verona Italian Importers for our cellar and pantry imports?",
    "context_notes": "JOIN ingredient_purchases with suppliers for Verona Italian Importers.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM"
    ],
    "expected_columns": [
      "total_spend"
    ],
    "reference_sql": "SELECT SUM(ip.total_amount) AS total_spend FROM ingredient_purchases ip JOIN suppliers s ON ip.supplier_id = s.id WHERE s.supplier_name = 'Verona Italian Importers';",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join ingredient_purchases ip with suppliers s on ip.supplier_id = s.id.",
      "Filter WHERE s.supplier_name = Verona Italian Importers."
    ],
    "solution_explanation": "Calculates cumulative procurement spend with key vendor.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-004",
    "domain": "restaurants",
    "level": 3,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Venues Purchasing From Organic Meats",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which of our restaurants have active procurement orders with Hudson Valley Organic Meats?",
    "context_notes": "Subquery or JOIN on ingredient_purchases with suppliers and restaurants.",
    "concepts": [
      "SELECT",
      "DISTINCT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "restaurant_name"
    ],
    "reference_sql": "SELECT DISTINCT r.name AS restaurant_name FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id JOIN suppliers s ON ip.supplier_id = s.id WHERE s.supplier_name = 'Hudson Valley Organic Meats' ORDER BY r.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants, ingredient_purchases, and suppliers.",
      "Filter WHERE s.supplier_name = Hudson Valley Organic Meats."
    ],
    "solution_explanation": "Lists all venues sourcing organic meats.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-005",
    "domain": "restaurants",
    "level": 3,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Purchases Over $2000",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For corporate audit review, pull all individual ingredient purchase invoices exceeding $2,000 with the venue name.",
    "context_notes": "JOIN ingredient_purchases with restaurants where total_amount > 2000.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "restaurant_name",
      "total_amount",
      "purchase_date"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, ip.total_amount, ip.purchase_date FROM ingredient_purchases ip JOIN restaurants r ON ip.restaurant_id = r.id WHERE ip.total_amount > 2000 ORDER BY ip.total_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join ingredient_purchases with restaurants.",
      "Filter WHERE ip.total_amount > 2000."
    ],
    "solution_explanation": "Identifies large procurement invoices requiring audit sign-off.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-006",
    "domain": "restaurants",
    "level": 3,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Ingredients Costing Over $10 Per Unit",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Identify our high-value inventory items — show all ingredients where the unit cost is at least $10.",
    "context_notes": "Filter ingredients where unit_cost >= 10.00.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "ingredient_name",
      "category",
      "unit_cost"
    ],
    "reference_sql": "SELECT ingredient_name, category, unit_cost FROM ingredients WHERE unit_cost >= 10.00 ORDER BY unit_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter ingredients table with WHERE unit_cost >= 10.00.",
      "Order by unit_cost DESC."
    ],
    "solution_explanation": "Surfaces high-cost culinary inventory.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-007",
    "domain": "restaurants",
    "level": 3,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Total Inventory Asset Valuation",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "What is the total dollar valuation of our on-hand pantry and cellar inventory right now?",
    "context_notes": "SUM(unit_cost * current_stock_qty) from ingredients.",
    "concepts": [
      "SELECT",
      "SUM",
      "Arithmetic"
    ],
    "expected_columns": [
      "total_inventory_value"
    ],
    "reference_sql": "SELECT ROUND(SUM(unit_cost * current_stock_qty), 2) AS total_inventory_value FROM ingredients;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Multiply unit_cost by current_stock_qty for each item.",
      "Sum across all ingredients and round to 2 decimals."
    ],
    "solution_explanation": "Calculates total balance-sheet inventory valuation.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-008",
    "domain": "restaurants",
    "level": 3,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Suppliers in Meat and Seafood",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Pull all suppliers specializing in either Meat or Seafood along with their quality rating.",
    "context_notes": "Filter suppliers table WHERE category IN (Meat, Seafood).",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "supplier_name",
      "category",
      "rating"
    ],
    "reference_sql": "SELECT supplier_name, category, rating FROM suppliers WHERE category IN ('Meat', 'Seafood') ORDER BY category, rating DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query suppliers with WHERE category IN (Meat, Seafood).",
      "Order by category, rating DESC."
    ],
    "solution_explanation": "Surfaces animal protein vendors for quality benchmarking.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-009",
    "domain": "restaurants",
    "level": 3,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Restaurants Without Purchases",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Are there any restaurant locations that have recorded zero ingredient purchase records in our system?",
    "context_notes": "Subquery NOT IN on ingredient_purchases.",
    "concepts": [
      "SELECT",
      "WHERE",
      "NOT IN"
    ],
    "expected_columns": [
      "restaurant_name"
    ],
    "reference_sql": "SELECT name AS restaurant_name FROM restaurants WHERE id NOT IN (SELECT DISTINCT restaurant_id FROM ingredient_purchases) ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery: SELECT DISTINCT restaurant_id FROM ingredient_purchases.",
      "Outer: SELECT name FROM restaurants WHERE id NOT IN (...)."
    ],
    "solution_explanation": "Finds venues lacking procurement transactions.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-010",
    "domain": "restaurants",
    "level": 3,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Dishes More Expensive Than Average",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Show every menu item whose menu price is higher than the overall average dish price across our restaurants.",
    "context_notes": "WHERE price > (SELECT AVG(price) FROM menu_items).",
    "concepts": [
      "SELECT",
      "WHERE",
      "Subquery",
      "AVG"
    ],
    "expected_columns": [
      "name",
      "price"
    ],
    "reference_sql": "SELECT name, price FROM menu_items WHERE price > (SELECT AVG(price) FROM menu_items) ORDER BY price DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery: SELECT AVG(price) FROM menu_items.",
      "Outer: Filter WHERE price > (subquery)."
    ],
    "solution_explanation": "Surfaces above-average price items for luxury menu positioning.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-011",
    "domain": "restaurants",
    "level": 3,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Dry Goods Inventory Valuation",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "What is the total dollar value of our Dry Goods inventory currently on hand?",
    "context_notes": "SUM(unit_cost * current_stock_qty) WHERE category = Dry Goods.",
    "concepts": [
      "SELECT",
      "SUM",
      "WHERE",
      "Arithmetic"
    ],
    "expected_columns": [
      "dry_goods_value"
    ],
    "reference_sql": "SELECT ROUND(SUM(unit_cost * current_stock_qty), 2) AS dry_goods_value FROM ingredients WHERE category = 'Dry Goods';",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE category = Dry Goods.",
      "Sum unit_cost * current_stock_qty."
    ],
    "solution_explanation": "Evaluates dry storage stock value.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-012",
    "domain": "restaurants",
    "level": 3,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Purchases Handled by Artisan Dairy Guild",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Show all individual invoice amounts and dates for cheese and butter orders from Artisan Dairy Guild.",
    "context_notes": "JOIN ingredient_purchases with suppliers for Artisan Dairy Guild.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "total_amount",
      "purchase_date"
    ],
    "reference_sql": "SELECT ip.total_amount, ip.purchase_date FROM ingredient_purchases ip JOIN suppliers s ON ip.supplier_id = s.id WHERE s.supplier_name = 'Artisan Dairy Guild' ORDER BY ip.purchase_date DESC, ip.total_amount DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join ingredient_purchases with suppliers.",
      "Filter WHERE s.supplier_name = Artisan Dairy Guild."
    ],
    "solution_explanation": "Reviews dairy procurement billing lines.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-013",
    "domain": "restaurants",
    "level": 3,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Top 3 Priciest Ingredients",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which 3 ingredients carry our highest per-unit cost? Name, category, and unit cost.",
    "context_notes": "ORDER BY unit_cost DESC LIMIT 3.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "ingredient_name",
      "category",
      "unit_cost"
    ],
    "reference_sql": "SELECT ingredient_name, category, unit_cost FROM ingredients ORDER BY unit_cost DESC LIMIT 3;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Order by unit_cost DESC and LIMIT 3."
    ],
    "solution_explanation": "Identifies our top cost-driver raw ingredients.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-014",
    "domain": "restaurants",
    "level": 3,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Dishes With Cost Above Median Sample",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "List all dishes where the raw food cost is strictly greater than $10.00 per portion.",
    "context_notes": "Filter menu_items WHERE cost > 10.00.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "cost",
      "price"
    ],
    "reference_sql": "SELECT name, cost, price FROM menu_items WHERE cost > 10.00 ORDER BY cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query menu_items with WHERE cost > 10.00.",
      "Order by cost DESC."
    ],
    "solution_explanation": "Highlights high food-cost menu offerings.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-015",
    "domain": "restaurants",
    "level": 3,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Suppliers Supplying All Venues Check",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Show all supplier names alongside their assigned category and rating for the vendor directory.",
    "context_notes": "Simple SELECT from suppliers.",
    "concepts": [
      "SELECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "supplier_name",
      "category",
      "rating"
    ],
    "reference_sql": "SELECT supplier_name, category, rating FROM suppliers ORDER BY supplier_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select supplier_name, category, rating from suppliers.",
      "Order alphabetically by supplier_name."
    ],
    "solution_explanation": "Vendor directory for operations binder.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-016",
    "domain": "restaurants",
    "level": 3,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Ingredients With Stock Exceeding 200",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which ingredients do we have comfortable inventory for — current stock of at least 200 units?",
    "context_notes": "Filter ingredients WHERE current_stock_qty >= 200.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "ingredient_name",
      "current_stock_qty"
    ],
    "reference_sql": "SELECT ingredient_name, current_stock_qty FROM ingredients WHERE current_stock_qty >= 200 ORDER BY current_stock_qty DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query ingredients with WHERE current_stock_qty >= 200."
    ],
    "solution_explanation": "Verifies well-stocked ingredients.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-017",
    "domain": "restaurants",
    "level": 3,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Flagship Trattoria Total Procurement Spend",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "What is the total procurement expenditure recorded so far for our Gusto Flagship Trattoria?",
    "context_notes": "JOIN ingredient_purchases with restaurants WHERE name = Gusto Flagship Trattoria.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM"
    ],
    "expected_columns": [
      "flagship_spend"
    ],
    "reference_sql": "SELECT SUM(ip.total_amount) AS flagship_spend FROM ingredient_purchases ip JOIN restaurants r ON ip.restaurant_id = r.id WHERE r.name = 'Gusto Flagship Trattoria';",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join ingredient_purchases with restaurants.",
      "Filter WHERE r.name = Gusto Flagship Trattoria and SUM."
    ],
    "solution_explanation": "Total procurement cost for the flagship venue.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-018",
    "domain": "restaurants",
    "level": 3,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Ingredients in the Produce Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "List all produce ingredients we track, showing unit cost and stock on hand.",
    "context_notes": "Filter ingredients WHERE category = Produce.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "ingredient_name",
      "unit_cost",
      "current_stock_qty"
    ],
    "reference_sql": "SELECT ingredient_name, unit_cost, current_stock_qty FROM ingredients WHERE category = 'Produce' ORDER BY ingredient_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter ingredients table with WHERE category = Produce."
    ],
    "solution_explanation": "Produce inventory review for freshness checking.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-019",
    "domain": "restaurants",
    "level": 3,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Vendors Rated Exactly 4.9",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which of our suppliers have achieved an elite rating of exactly 4.9 out of 5.0?",
    "context_notes": "Filter suppliers WHERE rating = 4.9.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "supplier_name",
      "category"
    ],
    "reference_sql": "SELECT supplier_name, category FROM suppliers WHERE rating = 4.9 ORDER BY supplier_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter suppliers table with WHERE rating = 4.9."
    ],
    "solution_explanation": "Finds top tier vendors with 4.9 rating.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-020",
    "domain": "restaurants",
    "level": 3,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Orders Larger Than Average Order Amount",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Show all dining orders where the guest bill was higher than the company-wide average order total.",
    "context_notes": "WHERE total_amount > (SELECT AVG(total_amount) FROM orders).",
    "concepts": [
      "SELECT",
      "WHERE",
      "Subquery",
      "AVG"
    ],
    "expected_columns": [
      "id",
      "total_amount",
      "server_name"
    ],
    "reference_sql": "SELECT id, total_amount, server_name FROM orders WHERE total_amount > (SELECT AVG(total_amount) FROM orders) ORDER BY total_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery calculates AVG(total_amount) from orders.",
      "Outer query filters WHERE total_amount > average."
    ],
    "solution_explanation": "Surfaces big-ticket dining checks.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-021",
    "domain": "restaurants",
    "level": 3,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Smallest Ingredient Purchase Recorded",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "What was the smallest individual purchase amount recorded across all supplier transactions?",
    "context_notes": "MIN(total_amount) from ingredient_purchases.",
    "concepts": [
      "SELECT",
      "MIN"
    ],
    "expected_columns": [
      "min_purchase_amount"
    ],
    "reference_sql": "SELECT MIN(total_amount) AS min_purchase_amount FROM ingredient_purchases;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select MIN(total_amount) from ingredient_purchases."
    ],
    "solution_explanation": "Finds minimum procurement ticket size.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-022",
    "domain": "restaurants",
    "level": 3,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Dairy Inventory Items Valuation",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "List each dairy ingredient with its individual total inventory holding value (unit cost times stock).",
    "context_notes": "SELECT ingredient_name, unit_cost * current_stock_qty WHERE category = Dairy.",
    "concepts": [
      "SELECT",
      "WHERE",
      "Arithmetic"
    ],
    "expected_columns": [
      "ingredient_name",
      "holding_value"
    ],
    "reference_sql": "SELECT ingredient_name, ROUND(unit_cost * current_stock_qty, 2) AS holding_value FROM ingredients WHERE category = 'Dairy' ORDER BY holding_value DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE category = Dairy.",
      "Multiply unit_cost by current_stock_qty."
    ],
    "solution_explanation": "Evaluates dairy inventory risk and cash tie-up.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-023",
    "domain": "restaurants",
    "level": 3,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Total Number of Supplier Purchase Invoices",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "How many total procurement invoices have been entered into the system to date?",
    "context_notes": "COUNT(*) from ingredient_purchases.",
    "concepts": [
      "SELECT",
      "COUNT"
    ],
    "expected_columns": [
      "total_invoices"
    ],
    "reference_sql": "SELECT COUNT(*) AS total_invoices FROM ingredient_purchases;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select COUNT(*) AS total_invoices from ingredient_purchases."
    ],
    "solution_explanation": "Counts total procurement vouchers.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-024",
    "domain": "restaurants",
    "level": 3,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Dishes With Profit Margin Above $20",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Show dishes where our unit gross profit (price minus cost) is strictly higher than $20.00.",
    "context_notes": "Filter menu_items WHERE price - cost > 20.",
    "concepts": [
      "SELECT",
      "WHERE",
      "Arithmetic"
    ],
    "expected_columns": [
      "name",
      "price",
      "cost",
      "unit_profit"
    ],
    "reference_sql": "SELECT name, price, cost, ROUND(price - cost, 2) AS unit_profit FROM menu_items WHERE price - cost > 20.00 ORDER BY unit_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate price - cost AS unit_profit.",
      "Filter WHERE price - cost > 20.00."
    ],
    "solution_explanation": "Identifies core high-margin profit drivers.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-025",
    "domain": "restaurants",
    "level": 3,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Average Purchase Invoice by Category",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Join our purchases to suppliers and compute the average invoice size for each supplier category.",
    "context_notes": "JOIN ingredient_purchases with suppliers, GROUP BY category.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "GROUP BY"
    ],
    "expected_columns": [
      "category",
      "avg_invoice_amount"
    ],
    "reference_sql": "SELECT s.category, ROUND(AVG(ip.total_amount), 2) AS avg_invoice_amount FROM ingredient_purchases ip JOIN suppliers s ON ip.supplier_id = s.id GROUP BY s.category ORDER BY avg_invoice_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join ingredient_purchases with suppliers.",
      "Group by s.category and take AVG(ip.total_amount)."
    ],
    "solution_explanation": "Benchmarks procurement order sizes across supply categories.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-026",
    "domain": "restaurants",
    "level": 3,
    "order": 26,
    "difficulty": "core",
    "title": "Supplier Spend Breakdown",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Give me our total spend with every single supplier: supplier name, category, rating, and total dollar amount paid.",
    "context_notes": "JOIN suppliers with ingredient_purchases, GROUP BY supplier.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "supplier_name",
      "category",
      "rating",
      "total_spend"
    ],
    "reference_sql": "SELECT s.supplier_name, s.category, s.rating, SUM(ip.total_amount) AS total_spend FROM suppliers s JOIN ingredient_purchases ip ON s.id = ip.supplier_id GROUP BY s.supplier_name, s.category, s.rating ORDER BY total_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join suppliers s with ingredient_purchases ip on s.id = ip.supplier_id.",
      "Group by supplier details and calculate SUM(ip.total_amount)."
    ],
    "solution_explanation": "Ranks supplier relationships by cumulative procurement volume.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-027",
    "domain": "restaurants",
    "level": 3,
    "order": 27,
    "difficulty": "core",
    "title": "Procurement Spend Per Restaurant",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "How much has each restaurant spent on ingredient purchases? Show venue name, city, and total procurement spend.",
    "context_notes": "JOIN restaurants with ingredient_purchases, GROUP BY restaurant.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "total_purchases"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, SUM(ip.total_amount) AS total_purchases FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id GROUP BY r.name, r.city ORDER BY total_purchases DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with ingredient_purchases.",
      "Group by r.name, r.city and calculate SUM(ip.total_amount)."
    ],
    "solution_explanation": "Compares venue-level food procurement budgets.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-028",
    "domain": "restaurants",
    "level": 3,
    "order": 28,
    "difficulty": "core",
    "title": "Inventory Value by Ingredient Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Break down total inventory valuation by ingredient category — which category ties up the most cash?",
    "context_notes": "GROUP BY category, SUM(unit_cost * current_stock_qty).",
    "concepts": [
      "SELECT",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "category_value"
    ],
    "reference_sql": "SELECT category, ROUND(SUM(unit_cost * current_stock_qty), 2) AS category_value FROM ingredients GROUP BY category ORDER BY category_value DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group by category on ingredients table.",
      "Compute SUM(unit_cost * current_stock_qty) as category_value."
    ],
    "solution_explanation": "Capital allocation breakdown across food supply categories.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-029",
    "domain": "restaurants",
    "level": 3,
    "order": 29,
    "difficulty": "core",
    "title": "Venues Spending Above Average Procurement",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which restaurants have total procurement spend exceeding the average venue spend across all active locations?",
    "context_notes": "HAVING SUM(ip.total_amount) > (SELECT AVG of venue sums).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "HAVING",
      "Subquery"
    ],
    "expected_columns": [
      "restaurant_name",
      "total_spend"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, SUM(ip.total_amount) AS total_spend FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id GROUP BY r.name HAVING SUM(ip.total_amount) > (SELECT AVG(v_spend) FROM (SELECT SUM(total_amount) AS v_spend FROM ingredient_purchases GROUP BY restaurant_id) sub) ORDER BY total_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery computes average venue procurement spend.",
      "HAVING clause filters venues above that average."
    ],
    "solution_explanation": "Flags high-spending culinary operations for budget review.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L3-030",
    "domain": "restaurants",
    "level": 3,
    "order": 30,
    "difficulty": "core",
    "title": "Purchases Count and Average by Supplier",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "For each supplier, how many purchase orders have been placed and what is their average order size?",
    "context_notes": "JOIN suppliers with ingredient_purchases, COUNT and AVG.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "supplier_name",
      "po_count",
      "avg_po_amount"
    ],
    "reference_sql": "SELECT s.supplier_name, COUNT(ip.id) AS po_count, ROUND(AVG(ip.total_amount), 2) AS avg_po_amount FROM suppliers s JOIN ingredient_purchases ip ON s.id = ip.supplier_id GROUP BY s.supplier_name ORDER BY po_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join suppliers with ingredient_purchases.",
      "Aggregate COUNT(ip.id) and AVG(ip.total_amount).",
      "Group by supplier_name."
    ],
    "solution_explanation": "Evaluates supplier order frequency vs ticket size.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-031",
    "domain": "restaurants",
    "level": 3,
    "order": 31,
    "difficulty": "core",
    "title": "Most Expensive Dish in Each Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find the highest priced dish within each menu category: show category, dish name, and that peak price.",
    "context_notes": "Correlated subquery or GROUP BY with MAX.",
    "concepts": [
      "SELECT",
      "WHERE",
      "Subquery"
    ],
    "expected_columns": [
      "category",
      "name",
      "price"
    ],
    "reference_sql": "SELECT m.category, m.name, m.price FROM menu_items m WHERE m.price = (SELECT MAX(m2.price) FROM menu_items m2 WHERE m2.category = m.category) ORDER BY m.category, m.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlated subquery matches MAX(price) per category.",
      "Outer query returns category, name, price."
    ],
    "solution_explanation": "Surfaces top-priced flagship dish for each category.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L3-032",
    "domain": "restaurants",
    "level": 3,
    "order": 32,
    "difficulty": "core",
    "title": "Restaurants With Seafood and Meat Orders",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which restaurants have purchased from both Meat AND Seafood suppliers? Show restaurant name and city.",
    "context_notes": "INTERSECT or EXISTS matching both categories.",
    "concepts": [
      "SELECT",
      "INTERSECT"
    ],
    "expected_columns": [
      "restaurant_name",
      "city"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id JOIN suppliers s ON ip.supplier_id = s.id WHERE s.category = 'Meat' INTERSECT SELECT r.name AS restaurant_name, r.city FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id JOIN suppliers s ON ip.supplier_id = s.id WHERE s.category = 'Seafood' ORDER BY restaurant_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query restaurants buying Meat INTERSECT restaurants buying Seafood.",
      "Order by restaurant_name."
    ],
    "solution_explanation": "Finds restaurants executing full surf-and-turf procurement.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L3-033",
    "domain": "restaurants",
    "level": 3,
    "order": 33,
    "difficulty": "core",
    "title": "Dishes Never Ordered in Pasta Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Are there any pasta dishes that have literally never been ordered in any guest check?",
    "context_notes": "NOT IN subquery on order_items filtered by pasta category.",
    "concepts": [
      "SELECT",
      "WHERE",
      "NOT IN"
    ],
    "expected_columns": [
      "name"
    ],
    "reference_sql": "SELECT name FROM menu_items WHERE category = 'pasta' AND id NOT IN (SELECT DISTINCT menu_item_id FROM order_items) ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter menu_items WHERE category = pasta.",
      "Exclude items present in order_items via NOT IN subquery."
    ],
    "solution_explanation": "Identifies dead-weight pasta recipes for menu revision.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-034",
    "domain": "restaurants",
    "level": 3,
    "order": 34,
    "difficulty": "core",
    "title": "Cities With Multiple Restaurant Venues",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Which metropolitan cities host 2 or more of our restaurants? Show city name and the venue count.",
    "context_notes": "GROUP BY city, HAVING COUNT(*) >= 2.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "city",
      "venue_count"
    ],
    "reference_sql": "SELECT city, COUNT(*) AS venue_count FROM restaurants GROUP BY city HAVING COUNT(*) >= 2 ORDER BY venue_count DESC, city ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group restaurants by city.",
      "Filter HAVING COUNT(*) >= 2 and order by venue_count DESC."
    ],
    "solution_explanation": "Identifies cluster markets with multiple operating branches.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-035",
    "domain": "restaurants",
    "level": 3,
    "order": 35,
    "difficulty": "core",
    "title": "Ingredients With Stock Value Below Average",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which individual ingredients hold a total stock value (cost * qty) that is below the average stock value across all ingredients?",
    "context_notes": "WHERE unit_cost * current_stock_qty < (SELECT AVG of total values).",
    "concepts": [
      "SELECT",
      "WHERE",
      "Subquery",
      "Arithmetic",
      "AVG"
    ],
    "expected_columns": [
      "ingredient_name",
      "stock_value"
    ],
    "reference_sql": "SELECT ingredient_name, ROUND(unit_cost * current_stock_qty, 2) AS stock_value FROM ingredients WHERE unit_cost * current_stock_qty < (SELECT AVG(unit_cost * current_stock_qty) FROM ingredients) ORDER BY stock_value ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery calculates AVG(unit_cost * current_stock_qty).",
      "Outer query filters below average stock values."
    ],
    "solution_explanation": "Pins under-stocked or low-capital ingredients.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L3-036",
    "domain": "restaurants",
    "level": 3,
    "order": 36,
    "difficulty": "core",
    "title": "Orders Sourcing From Specific Servers",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Find total revenue and order count for server Marco V. compared to Luca B. using a single query.",
    "context_notes": "Filter orders WHERE server_name IN, GROUP BY server_name.",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN",
      "COUNT",
      "SUM",
      "GROUP BY"
    ],
    "expected_columns": [
      "server_name",
      "order_count",
      "total_sales"
    ],
    "reference_sql": "SELECT server_name, COUNT(*) AS order_count, SUM(total_amount) AS total_sales FROM orders WHERE server_name IN ('Marco V.', 'Luca B.') GROUP BY server_name ORDER BY total_sales DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE server_name IN (Marco V., Luca B.).",
      "Group by server_name with COUNT and SUM."
    ],
    "solution_explanation": "Direct head-to-head comparison of lead floor servers.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-037",
    "domain": "restaurants",
    "level": 3,
    "order": 37,
    "difficulty": "core",
    "title": "Dishes With Above Average Margin Percentage",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which dishes achieve a gross margin percentage higher than the company-wide average margin percentage?",
    "context_notes": "(price - cost) / price > subquery avg.",
    "concepts": [
      "SELECT",
      "WHERE",
      "Subquery",
      "Arithmetic"
    ],
    "expected_columns": [
      "name",
      "category",
      "margin_pct"
    ],
    "reference_sql": "SELECT name, category, ROUND(((price - cost) / price) * 100, 1) AS margin_pct FROM menu_items WHERE ((price - cost) / price) > (SELECT AVG((price - cost) / price) FROM menu_items) ORDER BY margin_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery computes average ((price - cost) / price).",
      "Outer query filters items above this ratio."
    ],
    "solution_explanation": "Ranks premium margin contributors across the culinary menu.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L3-038",
    "domain": "restaurants",
    "level": 3,
    "order": 38,
    "difficulty": "core",
    "title": "Suppliers Not Used in April 2024",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Identify any suppliers who have zero purchase orders recorded in April 2024.",
    "context_notes": "Suppliers NOT IN purchase records for that date range.",
    "concepts": [
      "SELECT",
      "WHERE",
      "NOT IN"
    ],
    "expected_columns": [
      "supplier_name",
      "category"
    ],
    "reference_sql": "SELECT supplier_name, category FROM suppliers WHERE id NOT IN (SELECT DISTINCT supplier_id FROM ingredient_purchases WHERE purchase_date BETWEEN '2024-04-01' AND '2024-04-30') ORDER BY supplier_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery finds suppliers active in April 2024.",
      "Outer query checks NOT IN."
    ],
    "solution_explanation": "Finds idle suppliers during the monthly cycle.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-039",
    "domain": "restaurants",
    "level": 3,
    "order": 39,
    "difficulty": "core",
    "title": "Venues With High Capacity and High Spend",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Which restaurants have seating capacity > 150 AND total ingredient purchases over $5,000?",
    "context_notes": "JOIN restaurants and ingredient_purchases, HAVING SUM > 5000 and capacity > 150.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "SUM",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "restaurant_name",
      "seating_capacity",
      "total_spend"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.seating_capacity, SUM(ip.total_amount) AS total_spend FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id WHERE r.seating_capacity > 150 GROUP BY r.name, r.seating_capacity HAVING SUM(ip.total_amount) > 5000 ORDER BY total_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter restaurants WHERE seating_capacity > 150.",
      "Group by venue and filter HAVING SUM(ip.total_amount) > 5000."
    ],
    "solution_explanation": "Correlates physical venue scale with heavy purchasing volume.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L3-040",
    "domain": "restaurants",
    "level": 3,
    "order": 40,
    "difficulty": "core",
    "title": "Ingredients In Stock Below Reorder Threshold",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "List all ingredients where stock is lower than 150 units, displaying ingredient name, category, unit cost, and stock.",
    "context_notes": "Filter ingredients WHERE current_stock_qty < 150.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "ingredient_name",
      "category",
      "unit_cost",
      "current_stock_qty"
    ],
    "reference_sql": "SELECT ingredient_name, category, unit_cost, current_stock_qty FROM ingredients WHERE current_stock_qty < 150 ORDER BY current_stock_qty ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter ingredients table with WHERE current_stock_qty < 150.",
      "Order ascending to highlight the lowest stocks."
    ],
    "solution_explanation": "Operational restock triage list.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-041",
    "domain": "restaurants",
    "level": 3,
    "order": 41,
    "difficulty": "core",
    "title": "Suppliers With Highest Single Purchase Invoices",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "What was the largest single purchase amount made with each supplier? Supplier name and peak invoice amount.",
    "context_notes": "JOIN suppliers with ingredient_purchases, MAX(total_amount).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "MAX",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "supplier_name",
      "max_single_purchase"
    ],
    "reference_sql": "SELECT s.supplier_name, MAX(ip.total_amount) AS max_single_purchase FROM suppliers s JOIN ingredient_purchases ip ON s.id = ip.supplier_id GROUP BY s.supplier_name ORDER BY max_single_purchase DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join suppliers with ingredient_purchases.",
      "Aggregate MAX(ip.total_amount) grouped by supplier_name."
    ],
    "solution_explanation": "Identifies maximum credit exposure per vendor.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-042",
    "domain": "restaurants",
    "level": 3,
    "order": 42,
    "difficulty": "core",
    "title": "Dishes Ordered More Than 5 Times With Cost > 10",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which dishes with food cost exceeding $10 have been ordered more than 5 times? Show dish name, cost, and times ordered.",
    "context_notes": "JOIN order_items and menu_items, WHERE cost > 10, HAVING COUNT > 5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "COUNT",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "name",
      "cost",
      "times_ordered"
    ],
    "reference_sql": "SELECT mi.name, mi.cost, COUNT(oi.id) AS times_ordered FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id WHERE mi.cost > 10.00 GROUP BY mi.name, mi.cost HAVING COUNT(oi.id) > 5 ORDER BY times_ordered DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter menu_items WHERE cost > 10.00.",
      "Group by dish and filter HAVING COUNT(oi.id) > 5."
    ],
    "solution_explanation": "High-cost popular dishes needing tighter kitchen portion control.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L3-043",
    "domain": "restaurants",
    "level": 3,
    "order": 43,
    "difficulty": "core",
    "title": "Total Guest Covers by City",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "How many total guest covers have booked reservations across each city? Show city and total covers.",
    "context_notes": "JOIN reservations with restaurants, SUM(party_size) GROUP BY city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "city",
      "total_covers"
    ],
    "reference_sql": "SELECT r.city, SUM(res.party_size) AS total_covers FROM restaurants r JOIN reservations res ON r.id = res.restaurant_id GROUP BY r.city ORDER BY total_covers DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with reservations.",
      "Group by city and calculate SUM(res.party_size)."
    ],
    "solution_explanation": "Geographic breakdown of reservation patronage.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-044",
    "domain": "restaurants",
    "level": 3,
    "order": 44,
    "difficulty": "core",
    "title": "Categories Having More Than 4 Dishes",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Which menu categories offer more than 4 distinct dishes? Show category name and dish count.",
    "context_notes": "GROUP BY category on menu_items, HAVING COUNT(*) > 4.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "dish_count"
    ],
    "reference_sql": "SELECT category, COUNT(*) AS dish_count FROM menu_items GROUP BY category HAVING COUNT(*) > 4 ORDER BY dish_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group menu_items by category.",
      "Filter HAVING COUNT(*) > 4."
    ],
    "solution_explanation": "Checks menu depth across culinary categories.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-045",
    "domain": "restaurants",
    "level": 3,
    "order": 45,
    "difficulty": "core",
    "title": "Purchases by Restaurant in Boston or Chicago",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Pull all ingredient purchase lines for venues located in either Boston or Chicago with restaurant name and purchase date.",
    "context_notes": "JOIN ingredient_purchases with restaurants WHERE city IN (Boston, Chicago).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "total_amount",
      "purchase_date"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, ip.total_amount, ip.purchase_date FROM ingredient_purchases ip JOIN restaurants r ON ip.restaurant_id = r.id WHERE r.city IN ('Boston', 'Chicago') ORDER BY r.city, ip.total_amount DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join ingredient_purchases with restaurants.",
      "Filter WHERE r.city IN (Boston, Chicago)."
    ],
    "solution_explanation": "Regional procurement tracking for East and Midwest hubs.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-046",
    "domain": "restaurants",
    "level": 3,
    "order": 46,
    "difficulty": "core",
    "title": "Dishes With Cost Higher Than Average Cost in Same Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Show each dish whose cost is strictly higher than the average cost of dishes within its own category.",
    "context_notes": "Correlated subquery: cost > (SELECT AVG(cost) WHERE category = outer.category).",
    "concepts": [
      "SELECT",
      "WHERE",
      "Subquery",
      "AVG"
    ],
    "expected_columns": [
      "name",
      "category",
      "cost"
    ],
    "reference_sql": "SELECT m.name, m.category, m.cost FROM menu_items m WHERE m.cost > (SELECT AVG(m2.cost) FROM menu_items m2 WHERE m2.category = m.category) ORDER BY m.category, m.cost DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlated subquery calculates AVG(cost) for m.category.",
      "Filter outer row where cost exceeds category average."
    ],
    "solution_explanation": "Identifies cost outliers relative to peer category items.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L3-047",
    "domain": "restaurants",
    "level": 3,
    "order": 47,
    "difficulty": "core",
    "title": "Suppliers Providing Meat or Dry Goods With Rating >= 4.8",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Which suppliers in Meat or Dry Goods maintain a rating of at least 4.8? Name, category, rating.",
    "context_notes": "Filter suppliers WHERE category IN (Meat, Dry Goods) AND rating >= 4.8.",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN",
      "AND"
    ],
    "expected_columns": [
      "supplier_name",
      "category",
      "rating"
    ],
    "reference_sql": "SELECT supplier_name, category, rating FROM suppliers WHERE category IN ('Meat', 'Dry Goods') AND rating >= 4.8 ORDER BY rating DESC, supplier_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter suppliers WHERE category IN (Meat, Dry Goods) AND rating >= 4.8."
    ],
    "solution_explanation": "High-reliability vendors in essential categories.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-048",
    "domain": "restaurants",
    "level": 3,
    "order": 48,
    "difficulty": "core",
    "title": "Difference Between Recorded and Theoretical Food Cost",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each dish, display name, selling price, food cost, and the food cost percentage (cost / price * 100).",
    "context_notes": "SELECT name, price, cost, ROUND(cost / price * 100, 1) AS food_cost_pct.",
    "concepts": [
      "SELECT",
      "Arithmetic"
    ],
    "expected_columns": [
      "name",
      "price",
      "cost",
      "food_cost_pct"
    ],
    "reference_sql": "SELECT name, price, cost, ROUND((cost / price) * 100, 1) AS food_cost_pct FROM menu_items ORDER BY food_cost_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute (cost / price) * 100 rounded to 1 decimal place.",
      "Order descending by food cost percentage."
    ],
    "solution_explanation": "Menu engineering matrix: highlights high food-cost percentage dishes.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-049",
    "domain": "restaurants",
    "level": 3,
    "order": 49,
    "difficulty": "core",
    "title": "Venues With Above Average Seating Capacity",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "List all restaurants whose seating capacity is strictly above the average seating capacity of all venues.",
    "context_notes": "WHERE seating_capacity > (SELECT AVG(seating_capacity) FROM restaurants).",
    "concepts": [
      "SELECT",
      "WHERE",
      "Subquery",
      "AVG"
    ],
    "expected_columns": [
      "name",
      "city",
      "seating_capacity"
    ],
    "reference_sql": "SELECT name, city, seating_capacity FROM restaurants WHERE seating_capacity > (SELECT AVG(seating_capacity) FROM restaurants) ORDER BY seating_capacity DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery calculates AVG(seating_capacity) from restaurants.",
      "Filter WHERE seating_capacity > subquery."
    ],
    "solution_explanation": "Identifies large-capacity dining halls.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-050",
    "domain": "restaurants",
    "level": 3,
    "order": 50,
    "difficulty": "core",
    "title": "Active Orders With Order Items Count",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each order, display the order id, server name, order total, and the total count of item lines attached to it.",
    "context_notes": "JOIN orders with order_items, GROUP BY order.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "order_id",
      "server_name",
      "total_amount",
      "item_count"
    ],
    "reference_sql": "SELECT o.id AS order_id, o.server_name, o.total_amount, COUNT(oi.id) AS item_count FROM orders o JOIN order_items oi ON o.id = oi.order_id GROUP BY o.id, o.server_name, o.total_amount ORDER BY item_count DESC, o.total_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join orders with order_items.",
      "Group by order details and calculate COUNT(oi.id)."
    ],
    "solution_explanation": "Checks check density and item counts per dining ticket.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-051",
    "domain": "restaurants",
    "level": 3,
    "order": 51,
    "difficulty": "challenging",
    "title": "Venues With Purchases From All Categories",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Find restaurants that have placed purchases with suppliers across at least 3 distinct categories.",
    "context_notes": "JOIN restaurants, ingredient_purchases, suppliers. HAVING COUNT(DISTINCT s.category) >= 3.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT DISTINCT",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "restaurant_name",
      "distinct_categories"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, COUNT(DISTINCT s.category) AS distinct_categories FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id JOIN suppliers s ON ip.supplier_id = s.id GROUP BY r.name HAVING COUNT(DISTINCT s.category) >= 3 ORDER BY distinct_categories DESC, r.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants, ingredient_purchases, and suppliers.",
      "Group by restaurant and filter HAVING COUNT(DISTINCT s.category) >= 3."
    ],
    "solution_explanation": "Verifies diversified supply chain integration per venue.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-052",
    "domain": "restaurants",
    "level": 3,
    "order": 52,
    "difficulty": "challenging",
    "title": "Dishes Ordered More Than Any Dessert",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find all non-dessert dishes whose total units sold strictly exceed the units sold of the best-selling dessert.",
    "context_notes": "WHERE category != dessert and total_sold > (SELECT MAX sold of desserts).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "WHERE",
      "GROUP BY",
      "HAVING",
      "Subquery"
    ],
    "expected_columns": [
      "dish_name",
      "total_sold"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, SUM(oi.quantity) AS total_sold FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id WHERE mi.category != 'dessert' GROUP BY mi.name HAVING SUM(oi.quantity) > (SELECT MAX(d_sales) FROM (SELECT SUM(oi2.quantity) AS d_sales FROM menu_items mi2 JOIN order_items oi2 ON mi2.id = oi2.menu_item_id WHERE mi2.category = 'dessert' GROUP BY mi2.id) sub) ORDER BY total_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery finds maximum sales volume among desserts.",
      "Outer query compares non-dessert dishes against this threshold."
    ],
    "solution_explanation": "Benchmarks mains and starters against peak dessert volume.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L3-053",
    "domain": "restaurants",
    "level": 3,
    "order": 53,
    "difficulty": "challenging",
    "title": "Supplier Market Share in Total Procurement",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Calculate each supplier percentage share of total company procurement expenditure across all restaurants.",
    "context_notes": "SUM(ip.total_amount) / (SELECT SUM(total_amount)) * 100.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "Subquery",
      "GROUP BY"
    ],
    "expected_columns": [
      "supplier_name",
      "total_spent",
      "spend_percentage"
    ],
    "reference_sql": "SELECT s.supplier_name, SUM(ip.total_amount) AS total_spent, ROUND((SUM(ip.total_amount) / (SELECT SUM(total_amount) FROM ingredient_purchases)) * 100, 2) AS spend_percentage FROM suppliers s JOIN ingredient_purchases ip ON s.id = ip.supplier_id GROUP BY s.supplier_name ORDER BY total_spent DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join suppliers with ingredient_purchases.",
      "Divide supplier spend by total company spend in subquery."
    ],
    "solution_explanation": "Evaluates vendor concentration and spend dominance.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-054",
    "domain": "restaurants",
    "level": 3,
    "order": 54,
    "difficulty": "challenging",
    "title": "Restaurants Operating at Zero Guest Complaints",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Which restaurants have received guest reviews but have NEVER received a rating below 4 stars?",
    "context_notes": "EXISTS reviews AND NOT EXISTS review < 4.",
    "concepts": [
      "SELECT",
      "WHERE",
      "EXISTS",
      "NOT EXISTS"
    ],
    "expected_columns": [
      "restaurant_name",
      "city"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city FROM restaurants r WHERE EXISTS (SELECT 1 FROM guest_reviews gr WHERE gr.restaurant_id = r.id) AND NOT EXISTS (SELECT 1 FROM guest_reviews gr WHERE gr.restaurant_id = r.id AND gr.rating < 4) ORDER BY r.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Check EXISTS reviews for restaurant.",
      "Check NOT EXISTS reviews with rating < 4."
    ],
    "solution_explanation": "Finds immaculate hospitality venues with zero sub-4 ratings.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-055",
    "domain": "restaurants",
    "level": 3,
    "order": 55,
    "difficulty": "challenging",
    "title": "Top Spending Venue For Each Supplier",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "For each supplier, identify the restaurant that has spent the most money with them.",
    "context_notes": "Correlated subquery on restaurant spend per supplier.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "Subquery"
    ],
    "expected_columns": [
      "supplier_name",
      "restaurant_name",
      "max_spend"
    ],
    "reference_sql": "SELECT s.supplier_name, r.name AS restaurant_name, SUM(ip.total_amount) AS max_spend FROM suppliers s JOIN ingredient_purchases ip ON s.id = ip.supplier_id JOIN restaurants r ON ip.restaurant_id = r.id GROUP BY s.supplier_name, r.name HAVING SUM(ip.total_amount) = (SELECT MAX(v_spend) FROM (SELECT ip2.supplier_id, ip2.restaurant_id, SUM(ip2.total_amount) AS v_spend FROM ingredient_purchases ip2 GROUP BY ip2.supplier_id, ip2.restaurant_id) sub WHERE sub.supplier_id = s.id) ORDER BY s.supplier_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group spend by supplier and restaurant.",
      "Correlated subquery matches max spend for that supplier."
    ],
    "solution_explanation": "Identifies anchor account venues for each vendor.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L3-056",
    "domain": "restaurants",
    "level": 3,
    "order": 56,
    "difficulty": "challenging",
    "title": "High Cost Low Sales Dishes",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Flag problematic menu items: dishes with cost > $10 whose total units sold are less than 10.",
    "context_notes": "JOIN menu_items with order_items, WHERE cost > 10, HAVING SUM(quantity) < 10.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "SUM",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "dish_name",
      "cost",
      "total_units"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, mi.cost, COALESCE(SUM(oi.quantity), 0) AS total_units FROM menu_items mi LEFT JOIN order_items oi ON mi.id = oi.menu_item_id WHERE mi.cost > 10.00 GROUP BY mi.name, mi.cost HAVING COALESCE(SUM(oi.quantity), 0) < 10 ORDER BY mi.cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Left join menu_items with order_items.",
      "Filter WHERE cost > 10.00 and HAVING total quantity < 10."
    ],
    "solution_explanation": "Highlights underperforming capital-heavy menu items.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-057",
    "domain": "restaurants",
    "level": 3,
    "order": 57,
    "difficulty": "challenging",
    "title": "Venues With Higher Spend Than Sales",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Compare total procurement spend against total order revenue for each venue: show venues where spend exceeds $3,000.",
    "context_notes": "JOIN restaurants with purchases SUM and orders SUM.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "restaurant_name",
      "procurement_spend"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, SUM(ip.total_amount) AS procurement_spend FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id GROUP BY r.name HAVING SUM(ip.total_amount) > 3000 ORDER BY procurement_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group ingredient_purchases by restaurant.",
      "Filter HAVING SUM(total_amount) > 3000."
    ],
    "solution_explanation": "Spots venues with elevated food procurement expenditure.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L3-058",
    "domain": "restaurants",
    "level": 3,
    "order": 58,
    "difficulty": "challenging",
    "title": "Dishes Ordered Together in Same Check",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find pairs of distinct dishes that were ordered together in the exact same order ticket at least twice.",
    "context_notes": "Self join on order_items with menu_items.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "dish_1",
      "dish_2",
      "times_paired"
    ],
    "reference_sql": "SELECT m1.name AS dish_1, m2.name AS dish_2, COUNT(*) AS times_paired FROM order_items o1 JOIN order_items o2 ON o1.order_id = o2.order_id AND o1.menu_item_id < o2.menu_item_id JOIN menu_items m1 ON o1.menu_item_id = m1.id JOIN menu_items m2 ON o2.menu_item_id = m2.id GROUP BY m1.name, m2.name HAVING COUNT(*) >= 2 ORDER BY times_paired DESC, dish_1, dish_2;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Self-join order_items on order_id with o1.menu_item_id < o2.menu_item_id.",
      "Join menu_items to resolve names.",
      "Filter HAVING COUNT(*) >= 2."
    ],
    "solution_explanation": "Basket pairing analysis for combo meal promotions.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L3-059",
    "domain": "restaurants",
    "level": 3,
    "order": 59,
    "difficulty": "challenging",
    "title": "Unsold Ingredients Inventory Risk",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "List ingredients where current stock is greater than 150 AND unit cost is above $8, ordered by tied-up cash.",
    "context_notes": "Filter ingredients where current_stock_qty > 150 AND unit_cost > 8.",
    "concepts": [
      "SELECT",
      "WHERE",
      "Arithmetic",
      "ORDER BY"
    ],
    "expected_columns": [
      "ingredient_name",
      "category",
      "unit_cost",
      "current_stock_qty",
      "cash_tied_up"
    ],
    "reference_sql": "SELECT ingredient_name, category, unit_cost, current_stock_qty, ROUND(unit_cost * current_stock_qty, 2) AS cash_tied_up FROM ingredients WHERE current_stock_qty > 150 AND unit_cost > 8.00 ORDER BY cash_tied_up DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter ingredients table with stock > 150 and cost > 8.",
      "Calculate unit_cost * current_stock_qty."
    ],
    "solution_explanation": "Surfaces high-capital exposure in raw food inventory.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-060",
    "domain": "restaurants",
    "level": 3,
    "order": 60,
    "difficulty": "challenging",
    "title": "Venues With Above Average Reviews and Bookings",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Which restaurants have both an above-average reservation count AND an above-average review count?",
    "context_notes": "Subqueries comparing venue counts to company averages.",
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
      "reservation_count",
      "review_count"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, COUNT(DISTINCT res.id) AS reservation_count, COUNT(DISTINCT gr.id) AS review_count FROM restaurants r LEFT JOIN reservations res ON r.id = res.restaurant_id LEFT JOIN guest_reviews gr ON r.id = gr.restaurant_id GROUP BY r.name HAVING COUNT(DISTINCT res.id) > (SELECT AVG(r_cnt) FROM (SELECT COUNT(id) AS r_cnt FROM reservations GROUP BY restaurant_id) s1) AND COUNT(DISTINCT gr.id) > (SELECT AVG(g_cnt) FROM (SELECT COUNT(id) AS g_cnt FROM guest_reviews GROUP BY restaurant_id) s2) ORDER BY reservation_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate reservation and review counts per restaurant.",
      "HAVING clause checks both against subquery averages."
    ],
    "solution_explanation": "Identifies star operating units firing on all cylinders.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L3-061",
    "domain": "restaurants",
    "level": 3,
    "order": 61,
    "difficulty": "challenging",
    "title": "Most Frequent Server For Large Parties",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Which server has handled the highest number of large parties (reservations with party size >= 6)?",
    "context_notes": "Count reservations >= 6 grouped by server or table.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "party_size",
      "booking_count"
    ],
    "reference_sql": "SELECT party_size, COUNT(*) AS booking_count FROM reservations WHERE party_size >= 6 GROUP BY party_size ORDER BY booking_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter reservations WHERE party_size >= 6.",
      "Group by party_size and count."
    ],
    "solution_explanation": "Analyzes volume of banquets and group bookings.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-062",
    "domain": "restaurants",
    "level": 3,
    "order": 62,
    "difficulty": "challenging",
    "title": "Purchases Over Vendor Average Amount",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "List individual purchase invoices where the invoice total exceeds that vendor average invoice amount.",
    "context_notes": "Correlated subquery: total_amount > (SELECT AVG for same supplier).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "Subquery",
      "AVG"
    ],
    "expected_columns": [
      "supplier_name",
      "total_amount",
      "purchase_date"
    ],
    "reference_sql": "SELECT s.supplier_name, ip.total_amount, ip.purchase_date FROM ingredient_purchases ip JOIN suppliers s ON ip.supplier_id = s.id WHERE ip.total_amount > (SELECT AVG(ip2.total_amount) FROM ingredient_purchases ip2 WHERE ip2.supplier_id = ip.supplier_id) ORDER BY s.supplier_name, ip.total_amount DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlated subquery computes AVG(total_amount) for that supplier_id.",
      "Filter where purchase exceeds supplier average."
    ],
    "solution_explanation": "Spots unusually large purchase tickets.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L3-063",
    "domain": "restaurants",
    "level": 3,
    "order": 63,
    "difficulty": "challenging",
    "title": "Cities Where All Venues Are Post 2018",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find all cities where EVERY operating restaurant was opened in 2018 or later.",
    "context_notes": "GROUP BY city, HAVING MIN(opened_year) >= 2018.",
    "concepts": [
      "SELECT",
      "MIN",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "city",
      "oldest_venue_year"
    ],
    "reference_sql": "SELECT city, MIN(opened_year) AS oldest_venue_year FROM restaurants GROUP BY city HAVING MIN(opened_year) >= 2018 ORDER BY city;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group by city and calculate MIN(opened_year).",
      "Filter HAVING MIN(opened_year) >= 2018."
    ],
    "solution_explanation": "Finds modern, newly established regional clusters.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-064",
    "domain": "restaurants",
    "level": 3,
    "order": 64,
    "difficulty": "challenging",
    "title": "Average Guest Rating vs Seating Capacity Quartiles",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Compare the average guest rating for small venues (<=120 seats) vs large venues (>120 seats).",
    "context_notes": "CASE WHEN on seating_capacity with AVG(gr.rating).",
    "concepts": [
      "SELECT",
      "AVG",
      "CASE WHEN",
      "GROUP BY"
    ],
    "expected_columns": [
      "venue_size_tier",
      "avg_rating"
    ],
    "reference_sql": "SELECT CASE WHEN r.seating_capacity <= 120 THEN 'Boutique (<=120)' ELSE 'Grand (>120)' END AS venue_size_tier, ROUND(AVG(gr.rating), 2) AS avg_rating FROM restaurants r JOIN guest_reviews gr ON r.id = gr.restaurant_id GROUP BY CASE WHEN r.seating_capacity <= 120 THEN 'Boutique (<=120)' ELSE 'Grand (>120)' END ORDER BY avg_rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use CASE WHEN to categorize venue scale.",
      "Compute AVG(rating) for each tier."
    ],
    "solution_explanation": "Hospitality study: does boutique scale drive higher guest satisfaction?",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L3-065",
    "domain": "restaurants",
    "level": 3,
    "order": 65,
    "difficulty": "challenging",
    "title": "Highest Margin Dish in Each Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each menu category, return the dish that achieves the highest gross profit dollar margin (price - cost).",
    "context_notes": "Correlated subquery finding MAX(price - cost) per category.",
    "concepts": [
      "SELECT",
      "WHERE",
      "Subquery"
    ],
    "expected_columns": [
      "category",
      "name",
      "max_unit_margin"
    ],
    "reference_sql": "SELECT m.category, m.name, ROUND(m.price - m.cost, 2) AS max_unit_margin FROM menu_items m WHERE (m.price - m.cost) = (SELECT MAX(m2.price - m2.cost) FROM menu_items m2 WHERE m2.category = m.category) ORDER BY m.category;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlated subquery calculates MAX(price - cost) for each category.",
      "Outer query returns category, name, margin."
    ],
    "solution_explanation": "Pins the primary profit anchor for each kitchen station.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L3-066",
    "domain": "restaurants",
    "level": 3,
    "order": 66,
    "difficulty": "challenging",
    "title": "Suppliers With Invoices in Multiple Months",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Which suppliers have purchase records spanning more than 1 distinct calendar month?",
    "context_notes": "GROUP BY supplier, HAVING COUNT(DISTINCT EXTRACT(MONTH)).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT DISTINCT",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "supplier_name",
      "active_months"
    ],
    "reference_sql": "SELECT s.supplier_name, COUNT(DISTINCT EXTRACT(MONTH FROM ip.purchase_date)) AS active_months FROM suppliers s JOIN ingredient_purchases ip ON s.id = ip.supplier_id GROUP BY s.supplier_name ORDER BY active_months DESC, s.supplier_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Extract month from purchase_date.",
      "Count distinct months per supplier."
    ],
    "solution_explanation": "Checks supplier persistence across reporting periods.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L3-067",
    "domain": "restaurants",
    "level": 3,
    "order": 67,
    "difficulty": "challenging",
    "title": "Orders Containing Both Food and Wine",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Find all order IDs that include at least one food entree AND at least one beverage item.",
    "context_notes": "INTERSECT or EXISTS matching both categories for order_id.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "INTERSECT"
    ],
    "expected_columns": [
      "order_id"
    ],
    "reference_sql": "SELECT oi.order_id FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE mi.category = 'entree' INTERSECT SELECT oi.order_id FROM order_items oi JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE mi.category = 'beverage' ORDER BY order_id;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query orders with entree INTERSECT orders with beverage."
    ],
    "solution_explanation": "Evaluates beverage attachment rate on dining checks.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-068",
    "domain": "restaurants",
    "level": 3,
    "order": 68,
    "difficulty": "challenging",
    "title": "Total Spent on Dairy vs Produce Ingredients",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Calculate total inventory value on hand for Dairy vs Produce side-by-side using CASE WHEN aggregation.",
    "context_notes": "SUM(CASE WHEN) for Dairy and Produce stock value.",
    "concepts": [
      "SELECT",
      "SUM",
      "CASE WHEN",
      "Arithmetic"
    ],
    "expected_columns": [
      "dairy_value",
      "produce_value"
    ],
    "reference_sql": "SELECT ROUND(SUM(CASE WHEN category = 'Dairy' THEN unit_cost * current_stock_qty ELSE 0 END), 2) AS dairy_value, ROUND(SUM(CASE WHEN category = 'Produce' THEN unit_cost * current_stock_qty ELSE 0 END), 2) AS produce_value FROM ingredients;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use CASE WHEN inside SUM to isolate Dairy and Produce inventory value."
    ],
    "solution_explanation": "Pivots pantry valuation across perishable groups.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-069",
    "domain": "restaurants",
    "level": 3,
    "order": 69,
    "difficulty": "challenging",
    "title": "Confirmed Reservations Share by Venue",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each restaurant, what percentage of all reservations are confirmed bookings? Minimum 3 reservations.",
    "context_notes": "SUM(CASE WHEN status = confirmed) / COUNT(*) * 100.",
    "concepts": [
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
      "total_bookings",
      "confirmation_pct"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, COUNT(res.id) AS total_bookings, ROUND((SUM(CASE WHEN res.status = 'confirmed' THEN 1 ELSE 0 END)::NUMERIC / COUNT(res.id)) * 100, 1) AS confirmation_pct FROM restaurants r JOIN reservations res ON r.id = res.restaurant_id GROUP BY r.name HAVING COUNT(res.id) >= 3 ORDER BY confirmation_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with reservations.",
      "Compute confirmation percentage using conditional SUM over COUNT."
    ],
    "solution_explanation": "Measures front-of-house booking conversion quality.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-070",
    "domain": "restaurants",
    "level": 3,
    "order": 70,
    "difficulty": "challenging",
    "title": "Venues With Largest Reservation Volume",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Top 3 restaurants by total booked covers with their opening year and city.",
    "context_notes": "JOIN restaurants with reservations, SUM(party_size) LIMIT 3.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "opened_year",
      "total_covers"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, r.opened_year, SUM(res.party_size) AS total_covers FROM restaurants r JOIN reservations res ON r.id = res.restaurant_id GROUP BY r.name, r.city, r.opened_year ORDER BY total_covers DESC LIMIT 3;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with reservations.",
      "Group by venue and order by SUM(party_size) DESC LIMIT 3."
    ],
    "solution_explanation": "Ranks podium venues by guest cover throughput.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-071",
    "domain": "restaurants",
    "level": 3,
    "order": 71,
    "difficulty": "challenging",
    "title": "Supplier Ranking by Average Spend Per Order",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Rank our suppliers by average invoice ticket size, showing supplier name, category, and average amount.",
    "context_notes": "JOIN suppliers with ingredient_purchases, AVG(total_amount).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "supplier_name",
      "category",
      "avg_spend"
    ],
    "reference_sql": "SELECT s.supplier_name, s.category, ROUND(AVG(ip.total_amount), 2) AS avg_spend FROM suppliers s JOIN ingredient_purchases ip ON s.id = ip.supplier_id GROUP BY s.supplier_name, s.category ORDER BY avg_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join suppliers with ingredient_purchases.",
      "Aggregate AVG(total_amount) grouped by supplier_name, category."
    ],
    "solution_explanation": "Highlights vendor purchasing scale per order.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-072",
    "domain": "restaurants",
    "level": 3,
    "order": 72,
    "difficulty": "challenging",
    "title": "Dishes Accounting for Over 15% of Category Revenue",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find any dish whose revenue makes up more than 15% of its category total revenue.",
    "context_notes": "Correlated subquery comparing dish revenue to category revenue.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "HAVING",
      "Subquery"
    ],
    "expected_columns": [
      "dish_name",
      "category",
      "dish_revenue"
    ],
    "reference_sql": "SELECT mi.name AS dish_name, mi.category, SUM(oi.quantity * mi.price) AS dish_revenue FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.name, mi.category HAVING SUM(oi.quantity * mi.price) > 0.15 * (SELECT SUM(oi2.quantity * mi2.price) FROM menu_items mi2 JOIN order_items oi2 ON mi2.id = oi2.menu_item_id WHERE mi2.category = mi.category) ORDER BY dish_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate dish revenue with SUM(quantity * price).",
      "HAVING checks against 0.15 * category revenue subquery."
    ],
    "solution_explanation": "Identifies dominant menu stars within each culinary section.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L3-073",
    "domain": "restaurants",
    "level": 3,
    "order": 73,
    "difficulty": "challenging",
    "title": "Restaurants Sourcing Exclusively High Rated Suppliers",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Find restaurants where every single supplier they buy from has a rating of 4.8 or higher.",
    "context_notes": "NOT EXISTS supplier with rating < 4.8.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "NOT EXISTS"
    ],
    "expected_columns": [
      "restaurant_name",
      "city"
    ],
    "reference_sql": "SELECT DISTINCT r.name AS restaurant_name, r.city FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id WHERE NOT EXISTS (SELECT 1 FROM ingredient_purchases ip2 JOIN suppliers s ON ip2.supplier_id = s.id WHERE ip2.restaurant_id = r.id AND s.rating < 4.8) ORDER BY r.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Check NOT EXISTS purchase where supplier rating < 4.8.",
      "Ensures rigorous quality compliance across all vendor relationships."
    ],
    "solution_explanation": "Identifies venues maintaining strict tier-1 vendor standards.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L3-074",
    "domain": "restaurants",
    "level": 3,
    "order": 74,
    "difficulty": "challenging",
    "title": "Pantry Stock Turnover Warning",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Identify ingredients where unit cost is under $5.00 but current stock is over 300 units — potential overstocking.",
    "context_notes": "Filter ingredients WHERE unit_cost < 5.00 AND current_stock_qty > 300.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "ingredient_name",
      "category",
      "unit_cost",
      "current_stock_qty"
    ],
    "reference_sql": "SELECT ingredient_name, category, unit_cost, current_stock_qty FROM ingredients WHERE unit_cost < 5.00 AND current_stock_qty > 300 ORDER BY current_stock_qty DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter ingredients table with unit_cost < 5.00 and current_stock_qty > 300."
    ],
    "solution_explanation": "Flags overstocked low-cost goods taking up shelf volume.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-075",
    "domain": "restaurants",
    "level": 3,
    "order": 75,
    "difficulty": "challenging",
    "title": "Venues With Multiple Dining Sections",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "List all restaurants that have 2 or more distinct dining sections, showing venue name, city, and section count.",
    "context_notes": "JOIN restaurants with dining_sections, GROUP BY restaurant, HAVING COUNT >= 2.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "section_count"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, COUNT(ds.id) AS section_count FROM restaurants r JOIN dining_sections ds ON r.id = ds.restaurant_id GROUP BY r.name, r.city HAVING COUNT(ds.id) >= 2 ORDER BY section_count DESC, r.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with dining_sections.",
      "Group by venue and filter HAVING COUNT(ds.id) >= 2."
    ],
    "solution_explanation": "Finds complex multi-zone dining environments.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-076",
    "domain": "restaurants",
    "level": 3,
    "order": 76,
    "difficulty": "boss",
    "title": "Executive Procurement P&L Overview",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Executive overview: total supplier invoices, total spend, average spend per invoice, and highest single invoice amount.",
    "context_notes": "Aggregate ingredient_purchases: COUNT, SUM, AVG, MAX.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "AVG",
      "MAX"
    ],
    "expected_columns": [
      "total_invoices",
      "total_procurement_spend",
      "avg_invoice_size",
      "largest_single_invoice"
    ],
    "reference_sql": "SELECT COUNT(*) AS total_invoices, ROUND(SUM(total_amount), 2) AS total_procurement_spend, ROUND(AVG(total_amount), 2) AS avg_invoice_size, MAX(total_amount) AS largest_single_invoice FROM ingredient_purchases;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate ingredient_purchases table for corporate P&L summary."
    ],
    "solution_explanation": "Corporate board procurement expenditure card.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-077",
    "domain": "restaurants",
    "level": 3,
    "order": 77,
    "difficulty": "boss",
    "title": "Supplier Scorecard With Performance Tiers",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Complete supplier scorecard: name, category, rating, order count, total revenue received, and tier label based on spend.",
    "context_notes": "JOIN suppliers with purchases, CASE WHEN on total spend for tier.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "supplier_name",
      "category",
      "rating",
      "order_count",
      "total_spend",
      "partner_tier"
    ],
    "reference_sql": "SELECT s.supplier_name, s.category, s.rating, COUNT(ip.id) AS order_count, SUM(ip.total_amount) AS total_spend, CASE WHEN SUM(ip.total_amount) >= 25000 THEN 'Strategic Platinum' WHEN SUM(ip.total_amount) >= 15000 THEN 'Preferred Gold' ELSE 'Standard Silver' END AS partner_tier FROM suppliers s JOIN ingredient_purchases ip ON s.id = ip.supplier_id GROUP BY s.supplier_name, s.category, s.rating ORDER BY total_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join suppliers with ingredient_purchases.",
      "Aggregate spend and classify into Strategic, Preferred, Standard tiers."
    ],
    "solution_explanation": "Comprehensive supplier relationship tiering system.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L3-078",
    "domain": "restaurants",
    "level": 3,
    "order": 78,
    "difficulty": "boss",
    "title": "Venue Efficiency: Revenue vs Purchasing Ratio",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For each venue that has recorded purchases, compute total procurement spend and total tables available.",
    "context_notes": "JOIN restaurants with ingredient_purchases and dining_tables.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT DISTINCT",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "city",
      "table_count",
      "total_procurement"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.city, COUNT(DISTINCT dt.id) AS table_count, SUM(ip.total_amount) AS total_procurement FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id LEFT JOIN dining_tables dt ON r.id = dt.restaurant_id GROUP BY r.name, r.city ORDER BY total_procurement DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with ingredient_purchases and dining_tables.",
      "Group by venue and compute table count alongside procurement spend."
    ],
    "solution_explanation": "Operational capacity vs procurement capital allocation.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L3-079",
    "domain": "restaurants",
    "level": 3,
    "order": 79,
    "difficulty": "boss",
    "title": "Full Inventory Valuation and Risk Audit",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Complete inventory audit: total items tracked, total valuation, count of items below 100 units, and count of items above $10 cost.",
    "context_notes": "COUNT, SUM, and conditional SUMs on ingredients.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "Arithmetic"
    ],
    "expected_columns": [
      "total_ingredients",
      "total_valuation",
      "low_stock_items",
      "premium_cost_items"
    ],
    "reference_sql": "SELECT COUNT(*) AS total_ingredients, ROUND(SUM(unit_cost * current_stock_qty), 2) AS total_valuation, SUM(CASE WHEN current_stock_qty < 100 THEN 1 ELSE 0 END) AS low_stock_items, SUM(CASE WHEN unit_cost >= 10.00 THEN 1 ELSE 0 END) AS premium_cost_items FROM ingredients;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Full-table aggregate on ingredients with conditional sums for KPI tracking."
    ],
    "solution_explanation": "Balance sheet inventory risk scorecard.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-080",
    "domain": "restaurants",
    "level": 3,
    "order": 80,
    "difficulty": "boss",
    "title": "Dish Contribution Margin and Volume Leaderboard",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "For all dishes ordered at least 3 times: dish name, category, total units sold, gross revenue, food cost, and net gross profit.",
    "context_notes": "JOIN menu_items with order_items, multiple SUMs, HAVING COUNT >= 3.",
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
      "name",
      "category",
      "units_sold",
      "gross_revenue",
      "total_food_cost",
      "net_gross_profit"
    ],
    "reference_sql": "SELECT mi.name, mi.category, SUM(oi.quantity) AS units_sold, ROUND(SUM(oi.quantity * mi.price), 2) AS gross_revenue, ROUND(SUM(oi.quantity * mi.cost), 2) AS total_food_cost, ROUND(SUM(oi.quantity * (mi.price - mi.cost)), 2) AS net_gross_profit FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id GROUP BY mi.name, mi.category HAVING SUM(oi.quantity) >= 3 ORDER BY net_gross_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join menu_items with order_items.",
      "Compute revenue, food cost, and profit aggregates with volume filter."
    ],
    "solution_explanation": "Executive dish profitability and contribution matrix.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L3-081",
    "domain": "restaurants",
    "level": 3,
    "order": 81,
    "difficulty": "boss",
    "title": "Top Performing Restaurant in Each Metro Area",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each city with reviews, identify the single restaurant with the highest average rating.",
    "context_notes": "Correlated subquery finding MAX avg rating per city.",
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
      "best_rating"
    ],
    "reference_sql": "SELECT r.city, r.name AS restaurant_name, ROUND(AVG(gr.rating), 2) AS best_rating FROM restaurants r JOIN guest_reviews gr ON r.id = gr.restaurant_id GROUP BY r.city, r.name HAVING AVG(gr.rating) = (SELECT MAX(sub.avg_r) FROM (SELECT r2.city, r2.name, AVG(gr2.rating) AS avg_r FROM restaurants r2 JOIN guest_reviews gr2 ON r2.id = gr2.restaurant_id GROUP BY r2.city, r2.name) sub WHERE sub.city = r.city) ORDER BY r.city;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group by city and venue.",
      "Correlated subquery identifies top rating per metro market."
    ],
    "solution_explanation": "Metropolitan flagship recognition report.",
    "xp": 40,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L3-082",
    "domain": "restaurants",
    "level": 3,
    "order": 82,
    "difficulty": "boss",
    "title": "Pantry Category Balance: High vs Low Volume Categories",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Pantry category summary: category name, number of ingredients, average unit cost, total stock on hand, and total holding value.",
    "context_notes": "GROUP BY category on ingredients table with multiple aggregates.",
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
      "total_stock_units",
      "total_holding_value"
    ],
    "reference_sql": "SELECT category, COUNT(*) AS ingredient_count, ROUND(AVG(unit_cost), 2) AS avg_unit_cost, ROUND(SUM(current_stock_qty), 2) AS total_stock_units, ROUND(SUM(unit_cost * current_stock_qty), 2) AS total_holding_value FROM ingredients GROUP BY category ORDER BY total_holding_value DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group ingredients by category.",
      "Compute item count, avg unit cost, total units, and total value."
    ],
    "solution_explanation": "Category-level inventory balance assessment.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-083",
    "domain": "restaurants",
    "level": 3,
    "order": 83,
    "difficulty": "boss",
    "title": "Server Sales Mix: Appetizer vs Entree Ratio",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "For each server, calculate total sales from appetizers vs total sales from entrees.",
    "context_notes": "3-way JOIN orders, order_items, menu_items with CASE WHEN aggregation.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "server_name",
      "appetizer_sales",
      "entree_sales"
    ],
    "reference_sql": "SELECT o.server_name, ROUND(SUM(CASE WHEN mi.category = 'appetizer' THEN oi.quantity * mi.price ELSE 0 END), 2) AS appetizer_sales, ROUND(SUM(CASE WHEN mi.category = 'entree' THEN oi.quantity * mi.price ELSE 0 END), 2) AS entree_sales FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN menu_items mi ON oi.menu_item_id = mi.id GROUP BY o.server_name ORDER BY entree_sales DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join orders, order_items, menu_items.",
      "Use CASE WHEN inside SUM to separate sales by category per server."
    ],
    "solution_explanation": "Evaluates server upselling effectiveness on starters vs mains.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L3-084",
    "domain": "restaurants",
    "level": 3,
    "order": 84,
    "difficulty": "boss",
    "title": "Supply Chain Dependency on Single Vendor",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Find restaurants where over 50% of their total procurement spend went to a single supplier.",
    "context_notes": "Subquery comparing supplier spend per venue to total venue spend.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "HAVING",
      "Subquery"
    ],
    "expected_columns": [
      "restaurant_name",
      "supplier_name",
      "vendor_spend",
      "venue_total_spend"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, s.supplier_name, SUM(ip.total_amount) AS vendor_spend, (SELECT SUM(ip2.total_amount) FROM ingredient_purchases ip2 WHERE ip2.restaurant_id = r.id) AS venue_total_spend FROM restaurants r JOIN ingredient_purchases ip ON r.id = ip.restaurant_id JOIN suppliers s ON ip.supplier_id = s.id GROUP BY r.id, r.name, s.supplier_name HAVING SUM(ip.total_amount) > 0.50 * (SELECT SUM(ip2.total_amount) FROM ingredient_purchases ip2 WHERE ip2.restaurant_id = r.id) ORDER BY vendor_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group by venue and supplier.",
      "Filter HAVING vendor spend > 50% of venue total spend."
    ],
    "solution_explanation": "Critical supply chain single-point-of-failure risk analysis.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L3-085",
    "domain": "restaurants",
    "level": 3,
    "order": 85,
    "difficulty": "boss",
    "title": "Venues With High Capacity but Below Average Covers",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Spot underutilized venues: restaurants with seating capacity > 140 whose total booked covers are below average.",
    "context_notes": "WHERE seating_capacity > 140 AND SUM(party_size) < subquery avg.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "HAVING",
      "Subquery"
    ],
    "expected_columns": [
      "restaurant_name",
      "seating_capacity",
      "total_covers"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.seating_capacity, SUM(res.party_size) AS total_covers FROM restaurants r JOIN reservations res ON r.id = res.restaurant_id WHERE r.seating_capacity > 140 GROUP BY r.name, r.seating_capacity HAVING SUM(res.party_size) < (SELECT AVG(covers) FROM (SELECT SUM(party_size) AS covers FROM reservations GROUP BY restaurant_id) sub) ORDER BY r.seating_capacity DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter venues with seating_capacity > 140.",
      "HAVING clause checks total covers against subquery average."
    ],
    "solution_explanation": "Pinpoints underperforming large-scale venues for marketing pushes.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "rest-L3-086",
    "domain": "restaurants",
    "level": 3,
    "order": 86,
    "difficulty": "boss",
    "title": "Most Profitable Dining Table Number Across Network",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Across all venues, which table numbers have generated the highest cumulative order billings? Top 5 table numbers.",
    "context_notes": "GROUP BY table_number on orders, SUM(total_amount) LIMIT 5.",
    "concepts": [
      "SELECT",
      "SUM",
      "COUNT",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "table_number",
      "total_revenue",
      "checks_served"
    ],
    "reference_sql": "SELECT table_number, ROUND(SUM(total_amount), 2) AS total_revenue, COUNT(*) AS checks_served FROM orders GROUP BY table_number ORDER BY total_revenue DESC LIMIT 5;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group orders by table_number.",
      "Sum total_amount and count checks. Order DESC LIMIT 5."
    ],
    "solution_explanation": "Identifies most lucrative floor table placements.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-087",
    "domain": "restaurants",
    "level": 3,
    "order": 87,
    "difficulty": "boss",
    "title": "Suppliers Fulfilling Across All Regions",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Find suppliers who have fulfilled purchase orders for restaurants in at least 5 different cities.",
    "context_notes": "JOIN suppliers, ingredient_purchases, restaurants. HAVING COUNT(DISTINCT r.city) >= 5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT DISTINCT",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "supplier_name",
      "cities_served"
    ],
    "reference_sql": "SELECT s.supplier_name, COUNT(DISTINCT r.city) AS cities_served FROM suppliers s JOIN ingredient_purchases ip ON s.id = ip.supplier_id JOIN restaurants r ON ip.restaurant_id = r.id GROUP BY s.supplier_name HAVING COUNT(DISTINCT r.city) >= 5 ORDER BY cities_served DESC, s.supplier_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join suppliers, ingredient_purchases, and restaurants.",
      "Group by supplier and filter HAVING COUNT(DISTINCT city) >= 5."
    ],
    "solution_explanation": "Verifies national distribution reach for core partners.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-088",
    "domain": "restaurants",
    "level": 3,
    "order": 88,
    "difficulty": "boss",
    "title": "Menu Cannibalization: Similar Items Sales Gap",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Compare sales between our two top pasta dishes: Truffle Tagliatelle and Fettuccine Al Ragu.",
    "context_notes": "Filter menu_items by names, compute units sold and revenue side-by-side.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "IN",
      "SUM",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "units_sold",
      "total_revenue"
    ],
    "reference_sql": "SELECT mi.name, SUM(oi.quantity) AS units_sold, ROUND(SUM(oi.quantity * mi.price), 2) AS total_revenue FROM menu_items mi JOIN order_items oi ON mi.id = oi.menu_item_id WHERE mi.name IN ('Truffle Tagliatelle', 'Fettuccine Al Ragu') GROUP BY mi.name ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter menu items WHERE name IN (Truffle Tagliatelle, Fettuccine Al Ragu).",
      "Compute units sold and total revenue per dish."
    ],
    "solution_explanation": "Direct head-to-head pasta category cannibalization analysis.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L3-089",
    "domain": "restaurants",
    "level": 3,
    "order": 89,
    "difficulty": "boss",
    "title": "Composite Venue Performance Scorecard",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Comprehensive venue scorecard: restaurant name, seating capacity, total reservations, confirmed count, and review average.",
    "context_notes": "LEFT JOIN restaurants with reservations and guest_reviews with conditional aggregates.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "COUNT DISTINCT",
      "SUM",
      "AVG",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "restaurant_name",
      "seating_capacity",
      "total_reservations",
      "confirmed_reservations",
      "avg_rating"
    ],
    "reference_sql": "SELECT r.name AS restaurant_name, r.seating_capacity, COUNT(DISTINCT res.id) AS total_reservations, SUM(CASE WHEN res.status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed_reservations, ROUND(AVG(gr.rating), 2) AS avg_rating FROM restaurants r LEFT JOIN reservations res ON r.id = res.restaurant_id LEFT JOIN guest_reviews gr ON r.id = gr.restaurant_id GROUP BY r.name, r.seating_capacity ORDER BY avg_rating DESC NULLS LAST, total_reservations DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Multi-table LEFT JOIN combining reservations and guest reviews per restaurant."
    ],
    "solution_explanation": "Full 360-degree venue operations and guest sentiment scorecard.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "rest-L3-090",
    "domain": "restaurants",
    "level": 3,
    "order": 90,
    "difficulty": "boss",
    "title": "Cost Inefficiency: Dishes Priced Near Food Cost",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Audit pricing safety: find any dishes where the food cost is greater than 40% of the retail selling price.",
    "context_notes": "Filter menu_items WHERE (cost / price) > 0.40.",
    "concepts": [
      "SELECT",
      "WHERE",
      "Arithmetic"
    ],
    "expected_columns": [
      "name",
      "category",
      "price",
      "cost",
      "cost_ratio"
    ],
    "reference_sql": "SELECT name, category, price, cost, ROUND((cost / price) * 100, 1) AS cost_ratio FROM menu_items WHERE (cost / price) > 0.40 ORDER BY cost_ratio DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter menu_items WHERE (cost / price) > 0.40.",
      "Display retail price, food cost, and cost ratio percentage."
    ],
    "solution_explanation": "Red-flag audit for dishes threatening kitchen margin thresholds.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-091",
    "domain": "restaurants",
    "level": 3,
    "order": 91,
    "difficulty": "boss",
    "title": "Venues Generating Highest Beverage Margin Dollar",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Calculate total beverage gross profit generated per order across all orders that included drinks.",
    "context_notes": "3-way JOIN orders, order_items, menu_items WHERE category = beverage.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "order_id",
      "server_name",
      "beverage_profit"
    ],
    "reference_sql": "SELECT o.id AS order_id, o.server_name, ROUND(SUM(oi.quantity * (mi.price - mi.cost)), 2) AS beverage_profit FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE mi.category = 'beverage' GROUP BY o.id, o.server_name ORDER BY beverage_profit DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join orders, order_items, menu_items where category = beverage.",
      "Calculate SUM(oi.quantity * (mi.price - mi.cost)) grouped by order."
    ],
    "solution_explanation": "Identifies top cellar-driven guest tickets.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-092",
    "domain": "restaurants",
    "level": 3,
    "order": 92,
    "difficulty": "boss",
    "title": "Cities With Zero Guest Complaints Recorded",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Find cities where every recorded guest review across all restaurants in that city has a rating of 5 stars.",
    "context_notes": "GROUP BY city, HAVING MIN(gr.rating) = 5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "MIN",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "city"
    ],
    "reference_sql": "SELECT r.city FROM restaurants r JOIN guest_reviews gr ON r.id = gr.restaurant_id GROUP BY r.city HAVING MIN(gr.rating) = 5 ORDER BY r.city;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with guest_reviews.",
      "Group by city and filter HAVING MIN(gr.rating) = 5."
    ],
    "solution_explanation": "Pinpoints metropolitan regions delivering flaw-free experiences.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-093",
    "domain": "restaurants",
    "level": 3,
    "order": 93,
    "difficulty": "boss",
    "title": "Cumulative Supply Spend by Month and Category",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Monthly procurement trends: extract year and month from purchase_date, showing spend per supplier category.",
    "context_notes": "GROUP BY EXTRACT(YEAR), EXTRACT(MONTH), s.category.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "purchase_year",
      "purchase_month",
      "category",
      "monthly_spend"
    ],
    "reference_sql": "SELECT EXTRACT(YEAR FROM ip.purchase_date)::INT AS purchase_year, EXTRACT(MONTH FROM ip.purchase_date)::INT AS purchase_month, s.category, ROUND(SUM(ip.total_amount), 2) AS monthly_spend FROM ingredient_purchases ip JOIN suppliers s ON ip.supplier_id = s.id GROUP BY EXTRACT(YEAR FROM ip.purchase_date), EXTRACT(MONTH FROM ip.purchase_date), s.category ORDER BY purchase_year, purchase_month, monthly_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Extract year and month from purchase_date.",
      "Group with supplier category and compute SUM(total_amount)."
    ],
    "solution_explanation": "Monthly budget tracking by procurement supply segment.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "rest-L3-094",
    "domain": "restaurants",
    "level": 3,
    "order": 94,
    "difficulty": "boss",
    "title": "Average Check Size for Parties Above 4",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "What is the average party size and total guest count for confirmed group reservations of 5 or more people?",
    "context_notes": "AVG(party_size) and SUM(party_size) WHERE status = confirmed AND party_size >= 5.",
    "concepts": [
      "SELECT",
      "AVG",
      "SUM",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "avg_group_size",
      "total_group_guests"
    ],
    "reference_sql": "SELECT ROUND(AVG(party_size), 1) AS avg_group_size, SUM(party_size) AS total_group_guests FROM reservations WHERE status = 'confirmed' AND party_size >= 5;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter reservations WHERE status = confirmed AND party_size >= 5.",
      "Compute AVG and SUM of party_size."
    ],
    "solution_explanation": "Capacity modeling for large banquet sections.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "rest-L3-095",
    "domain": "restaurants",
    "level": 3,
    "order": 95,
    "difficulty": "boss",
    "title": "Inventory Replacement Cost by Supplier Category",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Join ingredients to suppliers matching category names, and calculate total value of inventory supplied by category.",
    "context_notes": "JOIN ingredients with suppliers on category, SUM(unit_cost * current_stock_qty).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "supplier_category",
      "total_category_stock_value"
    ],
    "reference_sql": "SELECT s.category AS supplier_category, ROUND(SUM(i.unit_cost * i.current_stock_qty), 2) AS total_category_stock_value FROM ingredients i JOIN suppliers s ON i.category = s.category GROUP BY s.category ORDER BY total_category_stock_value DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join ingredients with suppliers matching category.",
      "Group by category and sum stock holding values."
    ],
    "solution_explanation": "Aligns physical warehouse stock value with supply contracts.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-096",
    "domain": "restaurants",
    "level": 3,
    "order": 96,
    "difficulty": "boss",
    "title": "Venues With Full Outdoor Garden Capacity",
    "stakeholder": {
      "name": "Giulia Conti",
      "role": "Director of Hospitality"
    },
    "request": "Find restaurants that have at least one outdoor dining section and more than 100 total seats.",
    "context_notes": "JOIN restaurants with dining_sections WHERE is_outdoor = TRUE and seating_capacity > 100.",
    "concepts": [
      "SELECT",
      "DISTINCT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "name",
      "city",
      "seating_capacity"
    ],
    "reference_sql": "SELECT DISTINCT r.name, r.city, r.seating_capacity FROM restaurants r JOIN dining_sections ds ON r.id = ds.restaurant_id WHERE ds.is_outdoor = TRUE AND r.seating_capacity > 100 ORDER BY r.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join restaurants with dining_sections.",
      "Filter WHERE is_outdoor = TRUE AND seating_capacity > 100."
    ],
    "solution_explanation": "Summer campaign marketing candidates with outdoor terraces.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-097",
    "domain": "restaurants",
    "level": 3,
    "order": 97,
    "difficulty": "boss",
    "title": "Unordered Menu Items Impact on Revenue Potential",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "List all menu items that have zero orders recorded, displaying potential revenue if each sold 10 units.",
    "context_notes": "LEFT JOIN menu_items with order_items WHERE oi.id IS NULL.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "WHERE",
      "IS NULL",
      "Arithmetic"
    ],
    "expected_columns": [
      "name",
      "category",
      "price",
      "potential_lost_revenue"
    ],
    "reference_sql": "SELECT mi.name, mi.category, mi.price, ROUND(mi.price * 10, 2) AS potential_lost_revenue FROM menu_items mi LEFT JOIN order_items oi ON mi.id = oi.menu_item_id WHERE oi.id IS NULL ORDER BY mi.price DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Left join menu_items with order_items.",
      "Filter WHERE oi.id IS NULL and calculate price * 10."
    ],
    "solution_explanation": "Highlights unrealized gross potential on dead-stock recipes.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "rest-L3-098",
    "domain": "restaurants",
    "level": 3,
    "order": 98,
    "difficulty": "boss",
    "title": "Top 3 Suppliers by Spend in New York",
    "stakeholder": {
      "name": "Elena Rossi",
      "role": "Beverage & Cellar Director"
    },
    "request": "Which 3 suppliers receive the highest procurement spend from restaurants located in New York City?",
    "context_notes": "JOIN suppliers, ingredient_purchases, restaurants WHERE city = New York.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "SUM",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "supplier_name",
      "ny_spend"
    ],
    "reference_sql": "SELECT s.supplier_name, SUM(ip.total_amount) AS ny_spend FROM suppliers s JOIN ingredient_purchases ip ON s.id = ip.supplier_id JOIN restaurants r ON ip.restaurant_id = r.id WHERE r.city = 'New York' GROUP BY s.supplier_name ORDER BY ny_spend DESC LIMIT 3;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join suppliers, ingredient_purchases, restaurants.",
      "Filter WHERE city = New York and sum spend LIMIT 3."
    ],
    "solution_explanation": "Key supplier exposure in our largest metropolitan territory.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "rest-L3-099",
    "domain": "restaurants",
    "level": 3,
    "order": 99,
    "difficulty": "boss",
    "title": "Comprehensive Menu Margin vs Food Cost Audit",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Full kitchen audit: count of dishes, average retail price, average food cost, and overall network average gross margin %.",
    "context_notes": "Single-row aggregate over menu_items.",
    "concepts": [
      "SELECT",
      "COUNT",
      "AVG",
      "Arithmetic"
    ],
    "expected_columns": [
      "total_dishes",
      "avg_price",
      "avg_cost",
      "overall_margin_pct"
    ],
    "reference_sql": "SELECT COUNT(*) AS total_dishes, ROUND(AVG(price), 2) AS avg_price, ROUND(AVG(cost), 2) AS avg_cost, ROUND(AVG((price - cost) / price) * 100, 1) AS overall_margin_pct FROM menu_items;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate entire menu_items catalog for culinary executive benchmark."
    ],
    "solution_explanation": "Executive culinary unit economics health scorecard.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "rest-L3-100",
    "domain": "restaurants",
    "level": 3,
    "order": 100,
    "difficulty": "boss",
    "title": "Grand Food Cost vs Revenue Reconciliation",
    "stakeholder": {
      "name": "Chef Marco Vieri",
      "role": "Executive Chef & Founder"
    },
    "request": "Grand corporate reconciliation: total order revenue recorded, total ingredient purchases recorded, and gross purchasing ratio %.",
    "context_notes": "Cross-table reconciliation combining orders and ingredient_purchases totals.",
    "concepts": [
      "SELECT",
      "SUM",
      "Arithmetic",
      "Subquery"
    ],
    "expected_columns": [
      "total_order_revenue",
      "total_procurement_cost",
      "cost_of_goods_pct"
    ],
    "reference_sql": "SELECT (SELECT ROUND(SUM(total_amount), 2) FROM orders) AS total_order_revenue, (SELECT ROUND(SUM(total_amount), 2) FROM ingredient_purchases) AS total_procurement_cost, ROUND(((SELECT SUM(total_amount) FROM ingredient_purchases) / (SELECT SUM(total_amount) FROM orders)) * 100, 1) AS cost_of_goods_pct;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Scalar subqueries calculate total order sales and total procurement costs.",
      "Compute procurement-to-sales ratio percentage."
    ],
    "solution_explanation": "The ultimate corporate food-cost ratio benchmark across the enterprise.",
    "xp": 50,
    "estimated_minutes": 15
  }
];
