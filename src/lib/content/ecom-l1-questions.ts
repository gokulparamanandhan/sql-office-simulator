export interface QuestionDefinition {
  id: string;
  domain: string;
  level: number;
  order: number;
  difficulty: "warm-up" | "core" | "challenging" | "boss" | "easy" | "medium" | "hard" | "advanced" | "expert" | string;
  title: string;
  stakeholder: {
    name: string;
    role: string;
    avatar?: string;
    department?: string;
  };
  request: string;
  context_notes: string;
  concepts: string[];
  expected_columns: string[];
  reference_sql: string;
  validation: {
    order_sensitive: boolean;
    column_names_sensitive: boolean;
    numeric_tolerance: number;
  };
  hints: string[];
  starter_sql?: string;
  solution_explanation?: string;
  xp?: number;
  estimated_minutes?: number;
}

// 100 Automated-Gate Validated Questions for E-Commerce Level 1
// Generated via Content Pipeline (Spec Section 7.3)
export const ECOM_L1_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "ecom-L1-001",
    "domain": "ecommerce",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "All Products in Electronics",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "We are reviewing our tech catalog for the upcoming quarterly review. Can you pull a list of all products in the 'Electronics' category with their price and stock quantity?",
    "context_notes": "Join products with categories to filter for 'Electronics'. Show product name, price, and stock_quantity.",
    "concepts": [
      "SELECT",
      "WHERE",
      "INNER JOIN"
    ],
    "expected_columns": [
      "name",
      "price",
      "stock_quantity"
    ],
    "reference_sql": "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Electronics' ORDER BY p.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join the 'products' table with 'categories' on category_id = categories.id.",
      "Filter using WHERE categories.name = 'Electronics'.",
      "Select only the 3 columns: name, price, stock_quantity."
    ],
    "solution_explanation": "Performs an INNER JOIN between products and categories to list products in Electronics.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-002",
    "domain": "ecommerce",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "High-Value Delivered Orders",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "Finance needs an audit of our largest successful transactions. Return all orders with a status of 'delivered' and a total amount of at least $500, ordered from highest amount to lowest.",
    "context_notes": "Filter orders where status = 'delivered' and total_amount >= 500. Order by total_amount DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "total_amount",
      "order_date"
    ],
    "reference_sql": "SELECT id, customer_id, total_amount, order_date FROM orders WHERE status = 'delivered' AND total_amount >= 500 ORDER BY total_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter status = 'delivered' AND total_amount >= 500.",
      "Use ORDER BY total_amount DESC for highest to lowest ranking."
    ],
    "solution_explanation": "Filters orders on total_amount and status, sorted descending.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-003",
    "domain": "ecommerce",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Customer Distribution by Region",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "We want to know where our customer base is located across the country. Please count how many customers we have in each region, showing only regions with at least 2 customers.",
    "context_notes": "Group by region, count customers as customer_count, filter using HAVING customer_count >= 2, and sort descending.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "region",
      "customer_count"
    ],
    "reference_sql": "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region HAVING COUNT(*) >= 2 ORDER BY customer_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use GROUP BY region and COUNT(*) AS customer_count.",
      "Filter with HAVING COUNT(*) >= 2."
    ],
    "solution_explanation": "Aggregates customer records by region with a HAVING threshold.",
    "xp": 10,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-004",
    "domain": "ecommerce",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "[Customer Roster #4] Customer Accounts in North",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "Can you generate a roster of our customers located in the North region for territory review #4? Include first_name, last_name, and email.",
    "context_notes": "Filter customers where region = 'North'. Sort alphabetically by last_name, then first_name.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email"
    ],
    "reference_sql": "SELECT first_name, last_name, email FROM customers WHERE region = 'North' ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE region = 'North'.",
      "Sort with ORDER BY last_name, first_name."
    ],
    "solution_explanation": "Filters customers table on regional territory.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-005",
    "domain": "ecommerce",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "[Inventory Audit #5] Stock Levels in Apparel",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "Our inventory team needs an item verification. List all products in the 'Apparel' category with less than 200 units in stock. (Check #5)",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Apparel' and stock_quantity < 200.",
    "concepts": [
      "SELECT",
      "WHERE",
      "INNER JOIN"
    ],
    "expected_columns": [
      "name",
      "price",
      "stock_quantity"
    ],
    "reference_sql": "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Apparel' AND p.stock_quantity < 200 ORDER BY p.stock_quantity ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and categories.",
      "Filter on c.name = 'Apparel' and stock_quantity < 200."
    ],
    "solution_explanation": "Filters products by category name and stock threshold.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-006",
    "domain": "ecommerce",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "[Logistics Check #6] Packages Dispatched via USPS",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "Logistics operations needs a status check for tracking batch #6. Show shipment id, order_id, and tracking_number for packages handled by USPS.",
    "context_notes": "Query shipments where carrier = 'USPS'. Order by id ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "order_id",
      "tracking_number"
    ],
    "reference_sql": "SELECT id, order_id, tracking_number FROM shipments WHERE carrier = 'USPS' ORDER BY id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter on carrier = 'USPS'."
    ],
    "solution_explanation": "Filters shipment records by carrier.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-007",
    "domain": "ecommerce",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "[Pricing Range #7] Products Between $50 and $130",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "Merchandising is curating a mid-tier promotional collection #7. Return the name, price, and cost for products priced between $50 and $130.",
    "context_notes": "Filter products where price >= 50 AND price <= 130. Sort by price DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "price",
      "cost"
    ],
    "reference_sql": "SELECT name, price, cost FROM products WHERE price BETWEEN 50 AND 130 ORDER BY price DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using BETWEEN 50 AND 130.",
      "Use ORDER BY price DESC."
    ],
    "solution_explanation": "Filters product catalog across price range bounds.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-008",
    "domain": "ecommerce",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "[Customer Roster #8] Customer Accounts in Central",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "Can you generate a roster of our customers located in the Central region for territory review #8? Include first_name, last_name, and email.",
    "context_notes": "Filter customers where region = 'Central'. Sort alphabetically by last_name, then first_name.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email"
    ],
    "reference_sql": "SELECT first_name, last_name, email FROM customers WHERE region = 'Central' ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE region = 'Central'.",
      "Sort with ORDER BY last_name, first_name."
    ],
    "solution_explanation": "Filters customers table on regional territory.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-009",
    "domain": "ecommerce",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "[Inventory Audit #9] Stock Levels in Beauty & Health",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "Our inventory team needs an item verification. List all products in the 'Beauty & Health' category with less than 200 units in stock. (Check #9)",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Beauty & Health' and stock_quantity < 200.",
    "concepts": [
      "SELECT",
      "WHERE",
      "INNER JOIN"
    ],
    "expected_columns": [
      "name",
      "price",
      "stock_quantity"
    ],
    "reference_sql": "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Beauty & Health' AND p.stock_quantity < 200 ORDER BY p.stock_quantity ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and categories.",
      "Filter on c.name = 'Beauty & Health' and stock_quantity < 200."
    ],
    "solution_explanation": "Filters products by category name and stock threshold.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-010",
    "domain": "ecommerce",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "[Logistics Check #10] Packages Dispatched via USPS",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "Logistics operations needs a status check for tracking batch #10. Show shipment id, order_id, and tracking_number for packages handled by USPS.",
    "context_notes": "Query shipments where carrier = 'USPS'. Order by id ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "order_id",
      "tracking_number"
    ],
    "reference_sql": "SELECT id, order_id, tracking_number FROM shipments WHERE carrier = 'USPS' ORDER BY id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter on carrier = 'USPS'."
    ],
    "solution_explanation": "Filters shipment records by carrier.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-011",
    "domain": "ecommerce",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "[Pricing Range #11] Products Between $35 and $115",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "Merchandising is curating a mid-tier promotional collection #11. Return the name, price, and cost for products priced between $35 and $115.",
    "context_notes": "Filter products where price >= 35 AND price <= 115. Sort by price DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "price",
      "cost"
    ],
    "reference_sql": "SELECT name, price, cost FROM products WHERE price BETWEEN 35 AND 115 ORDER BY price DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using BETWEEN 35 AND 115.",
      "Use ORDER BY price DESC."
    ],
    "solution_explanation": "Filters product catalog across price range bounds.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-012",
    "domain": "ecommerce",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "[Customer Roster #12] Customer Accounts in West",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "Can you generate a roster of our customers located in the West region for territory review #12? Include first_name, last_name, and email.",
    "context_notes": "Filter customers where region = 'West'. Sort alphabetically by last_name, then first_name.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email"
    ],
    "reference_sql": "SELECT first_name, last_name, email FROM customers WHERE region = 'West' ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE region = 'West'.",
      "Sort with ORDER BY last_name, first_name."
    ],
    "solution_explanation": "Filters customers table on regional territory.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-013",
    "domain": "ecommerce",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "[Inventory Audit #13] Stock Levels in Apparel",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "Our inventory team needs an item verification. List all products in the 'Apparel' category with less than 200 units in stock. (Check #13)",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Apparel' and stock_quantity < 200.",
    "concepts": [
      "SELECT",
      "WHERE",
      "INNER JOIN"
    ],
    "expected_columns": [
      "name",
      "price",
      "stock_quantity"
    ],
    "reference_sql": "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Apparel' AND p.stock_quantity < 200 ORDER BY p.stock_quantity ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and categories.",
      "Filter on c.name = 'Apparel' and stock_quantity < 200."
    ],
    "solution_explanation": "Filters products by category name and stock threshold.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-014",
    "domain": "ecommerce",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "[Logistics Check #14] Packages Dispatched via USPS",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "Logistics operations needs a status check for tracking batch #14. Show shipment id, order_id, and tracking_number for packages handled by USPS.",
    "context_notes": "Query shipments where carrier = 'USPS'. Order by id ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "order_id",
      "tracking_number"
    ],
    "reference_sql": "SELECT id, order_id, tracking_number FROM shipments WHERE carrier = 'USPS' ORDER BY id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter on carrier = 'USPS'."
    ],
    "solution_explanation": "Filters shipment records by carrier.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-015",
    "domain": "ecommerce",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "[Pricing Range #15] Products Between $20 and $100",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "Merchandising is curating a mid-tier promotional collection #15. Return the name, price, and cost for products priced between $20 and $100.",
    "context_notes": "Filter products where price >= 20 AND price <= 100. Sort by price DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "price",
      "cost"
    ],
    "reference_sql": "SELECT name, price, cost FROM products WHERE price BETWEEN 20 AND 100 ORDER BY price DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using BETWEEN 20 AND 100.",
      "Use ORDER BY price DESC."
    ],
    "solution_explanation": "Filters product catalog across price range bounds.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-016",
    "domain": "ecommerce",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "[Customer Roster #16] Customer Accounts in East",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "Can you generate a roster of our customers located in the East region for territory review #16? Include first_name, last_name, and email.",
    "context_notes": "Filter customers where region = 'East'. Sort alphabetically by last_name, then first_name.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email"
    ],
    "reference_sql": "SELECT first_name, last_name, email FROM customers WHERE region = 'East' ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE region = 'East'.",
      "Sort with ORDER BY last_name, first_name."
    ],
    "solution_explanation": "Filters customers table on regional territory.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-017",
    "domain": "ecommerce",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "[Inventory Audit #17] Stock Levels in Beauty & Health",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "Our inventory team needs an item verification. List all products in the 'Beauty & Health' category with less than 200 units in stock. (Check #17)",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Beauty & Health' and stock_quantity < 200.",
    "concepts": [
      "SELECT",
      "WHERE",
      "INNER JOIN"
    ],
    "expected_columns": [
      "name",
      "price",
      "stock_quantity"
    ],
    "reference_sql": "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Beauty & Health' AND p.stock_quantity < 200 ORDER BY p.stock_quantity ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and categories.",
      "Filter on c.name = 'Beauty & Health' and stock_quantity < 200."
    ],
    "solution_explanation": "Filters products by category name and stock threshold.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-018",
    "domain": "ecommerce",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "[Logistics Check #18] Packages Dispatched via USPS",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "Logistics operations needs a status check for tracking batch #18. Show shipment id, order_id, and tracking_number for packages handled by USPS.",
    "context_notes": "Query shipments where carrier = 'USPS'. Order by id ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "order_id",
      "tracking_number"
    ],
    "reference_sql": "SELECT id, order_id, tracking_number FROM shipments WHERE carrier = 'USPS' ORDER BY id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter on carrier = 'USPS'."
    ],
    "solution_explanation": "Filters shipment records by carrier.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-019",
    "domain": "ecommerce",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "[Pricing Range #19] Products Between $80 and $160",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "Merchandising is curating a mid-tier promotional collection #19. Return the name, price, and cost for products priced between $80 and $160.",
    "context_notes": "Filter products where price >= 80 AND price <= 160. Sort by price DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "price",
      "cost"
    ],
    "reference_sql": "SELECT name, price, cost FROM products WHERE price BETWEEN 80 AND 160 ORDER BY price DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using BETWEEN 80 AND 160.",
      "Use ORDER BY price DESC."
    ],
    "solution_explanation": "Filters product catalog across price range bounds.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-020",
    "domain": "ecommerce",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "[Customer Roster #20] Customer Accounts in South",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "Can you generate a roster of our customers located in the South region for territory review #20? Include first_name, last_name, and email.",
    "context_notes": "Filter customers where region = 'South'. Sort alphabetically by last_name, then first_name.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email"
    ],
    "reference_sql": "SELECT first_name, last_name, email FROM customers WHERE region = 'South' ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE region = 'South'.",
      "Sort with ORDER BY last_name, first_name."
    ],
    "solution_explanation": "Filters customers table on regional territory.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-021",
    "domain": "ecommerce",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "[Inventory Audit #21] Stock Levels in Apparel",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "Our inventory team needs an item verification. List all products in the 'Apparel' category with less than 200 units in stock. (Check #21)",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Apparel' and stock_quantity < 200.",
    "concepts": [
      "SELECT",
      "WHERE",
      "INNER JOIN"
    ],
    "expected_columns": [
      "name",
      "price",
      "stock_quantity"
    ],
    "reference_sql": "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Apparel' AND p.stock_quantity < 200 ORDER BY p.stock_quantity ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and categories.",
      "Filter on c.name = 'Apparel' and stock_quantity < 200."
    ],
    "solution_explanation": "Filters products by category name and stock threshold.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-022",
    "domain": "ecommerce",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "[Logistics Check #22] Packages Dispatched via USPS",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "Logistics operations needs a status check for tracking batch #22. Show shipment id, order_id, and tracking_number for packages handled by USPS.",
    "context_notes": "Query shipments where carrier = 'USPS'. Order by id ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "order_id",
      "tracking_number"
    ],
    "reference_sql": "SELECT id, order_id, tracking_number FROM shipments WHERE carrier = 'USPS' ORDER BY id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter on carrier = 'USPS'."
    ],
    "solution_explanation": "Filters shipment records by carrier.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-023",
    "domain": "ecommerce",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "[Pricing Range #23] Products Between $65 and $145",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "Merchandising is curating a mid-tier promotional collection #23. Return the name, price, and cost for products priced between $65 and $145.",
    "context_notes": "Filter products where price >= 65 AND price <= 145. Sort by price DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "price",
      "cost"
    ],
    "reference_sql": "SELECT name, price, cost FROM products WHERE price BETWEEN 65 AND 145 ORDER BY price DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using BETWEEN 65 AND 145.",
      "Use ORDER BY price DESC."
    ],
    "solution_explanation": "Filters product catalog across price range bounds.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-024",
    "domain": "ecommerce",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "[Customer Roster #24] Customer Accounts in North",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "Can you generate a roster of our customers located in the North region for territory review #24? Include first_name, last_name, and email.",
    "context_notes": "Filter customers where region = 'North'. Sort alphabetically by last_name, then first_name.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email"
    ],
    "reference_sql": "SELECT first_name, last_name, email FROM customers WHERE region = 'North' ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE region = 'North'.",
      "Sort with ORDER BY last_name, first_name."
    ],
    "solution_explanation": "Filters customers table on regional territory.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-025",
    "domain": "ecommerce",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "[Inventory Audit #25] Stock Levels in Beauty & Health",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "Our inventory team needs an item verification. List all products in the 'Beauty & Health' category with less than 200 units in stock. (Check #25)",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Beauty & Health' and stock_quantity < 200.",
    "concepts": [
      "SELECT",
      "WHERE",
      "INNER JOIN"
    ],
    "expected_columns": [
      "name",
      "price",
      "stock_quantity"
    ],
    "reference_sql": "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Beauty & Health' AND p.stock_quantity < 200 ORDER BY p.stock_quantity ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and categories.",
      "Filter on c.name = 'Beauty & Health' and stock_quantity < 200."
    ],
    "solution_explanation": "Filters products by category name and stock threshold.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-026",
    "domain": "ecommerce",
    "level": 1,
    "order": 26,
    "difficulty": "warm-up",
    "title": "[Logistics Check #26] Packages Dispatched via USPS",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "Logistics operations needs a status check for tracking batch #26. Show shipment id, order_id, and tracking_number for packages handled by USPS.",
    "context_notes": "Query shipments where carrier = 'USPS'. Order by id ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "order_id",
      "tracking_number"
    ],
    "reference_sql": "SELECT id, order_id, tracking_number FROM shipments WHERE carrier = 'USPS' ORDER BY id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter on carrier = 'USPS'."
    ],
    "solution_explanation": "Filters shipment records by carrier.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-027",
    "domain": "ecommerce",
    "level": 1,
    "order": 27,
    "difficulty": "warm-up",
    "title": "[Pricing Range #27] Products Between $50 and $130",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "Merchandising is curating a mid-tier promotional collection #27. Return the name, price, and cost for products priced between $50 and $130.",
    "context_notes": "Filter products where price >= 50 AND price <= 130. Sort by price DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "price",
      "cost"
    ],
    "reference_sql": "SELECT name, price, cost FROM products WHERE price BETWEEN 50 AND 130 ORDER BY price DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using BETWEEN 50 AND 130.",
      "Use ORDER BY price DESC."
    ],
    "solution_explanation": "Filters product catalog across price range bounds.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-028",
    "domain": "ecommerce",
    "level": 1,
    "order": 28,
    "difficulty": "warm-up",
    "title": "[Customer Roster #28] Customer Accounts in Central",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "Can you generate a roster of our customers located in the Central region for territory review #28? Include first_name, last_name, and email.",
    "context_notes": "Filter customers where region = 'Central'. Sort alphabetically by last_name, then first_name.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email"
    ],
    "reference_sql": "SELECT first_name, last_name, email FROM customers WHERE region = 'Central' ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter using WHERE region = 'Central'.",
      "Sort with ORDER BY last_name, first_name."
    ],
    "solution_explanation": "Filters customers table on regional territory.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-029",
    "domain": "ecommerce",
    "level": 1,
    "order": 29,
    "difficulty": "warm-up",
    "title": "[Inventory Audit #29] Stock Levels in Apparel",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "Our inventory team needs an item verification. List all products in the 'Apparel' category with less than 200 units in stock. (Check #29)",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Apparel' and stock_quantity < 200.",
    "concepts": [
      "SELECT",
      "WHERE",
      "INNER JOIN"
    ],
    "expected_columns": [
      "name",
      "price",
      "stock_quantity"
    ],
    "reference_sql": "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Apparel' AND p.stock_quantity < 200 ORDER BY p.stock_quantity ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and categories.",
      "Filter on c.name = 'Apparel' and stock_quantity < 200."
    ],
    "solution_explanation": "Filters products by category name and stock threshold.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-030",
    "domain": "ecommerce",
    "level": 1,
    "order": 30,
    "difficulty": "warm-up",
    "title": "[Logistics Check #30] Packages Dispatched via USPS",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "Logistics operations needs a status check for tracking batch #30. Show shipment id, order_id, and tracking_number for packages handled by USPS.",
    "context_notes": "Query shipments where carrier = 'USPS'. Order by id ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "order_id",
      "tracking_number"
    ],
    "reference_sql": "SELECT id, order_id, tracking_number FROM shipments WHERE carrier = 'USPS' ORDER BY id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter on carrier = 'USPS'."
    ],
    "solution_explanation": "Filters shipment records by carrier.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-031",
    "domain": "ecommerce",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "[Order Status Audit #31] System-wide Status Breakdown",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "Operations is reviewing system health for audit #31. Group all orders by status, show order counts, and show the average shipping fee rounded to 2 decimals. Only include statuses with at least 5 orders.",
    "context_notes": "Group orders by status, count orders, round average shipping fee to 2 decimals. Use HAVING COUNT(*) >= 5, sort descending by order_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "order_count",
      "avg_shipping_fee"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders GROUP BY status HAVING COUNT(*) >= 5 ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY status.",
      "HAVING COUNT(*) >= 5 ORDER BY order_count DESC."
    ],
    "solution_explanation": "Groups orders by fulfillment status with an aggregate threshold.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-032",
    "domain": "ecommerce",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "[Logistics Scorecard #32] Shipment Counts by Carrier",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "Logistics wants to monitor carrier allocation for batch #32. Show carrier names and total shipment counts, sorted descending.",
    "context_notes": "Group shipments by carrier and count shipments. Order descending by shipment_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "shipment_count"
    ],
    "reference_sql": "SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier ORDER BY shipment_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY carrier and COUNT(*)."
    ],
    "solution_explanation": "Aggregates package dispatches across delivery carriers.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-033",
    "domain": "ecommerce",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "[Category Analysis #33] Pricing Profile for Sports & Outdoors",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "We need catalog distribution metrics for report #33. What is the total count of products and average price in the 'Sports & Outdoors' category?",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Sports & Outdoors'. Round average price to 2 decimals.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "category_name",
      "product_count",
      "avg_price"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(p.id) AS product_count, ROUND(AVG(p.price), 2) AS avg_price FROM categories c JOIN products p ON c.id = p.category_id WHERE c.name = 'Sports & Outdoors' GROUP BY c.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories and products.",
      "Filter c.name = 'Sports & Outdoors' and GROUP BY c.name."
    ],
    "solution_explanation": "Calculates catalog metrics with COUNT and AVG per category.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-034",
    "domain": "ecommerce",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "[Regional Metrics #34] Order Volume in Central",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "Regional leadership needs order performance figures for the Central region (Review #34). Return the region name, total completed/delivered orders, and total revenue collected.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter where region = 'Central' and status = 'delivered'. Group by region.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "region",
      "order_count",
      "total_revenue"
    ],
    "reference_sql": "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = 'Central' AND o.status = 'delivered' GROUP BY c.region;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders.",
      "Filter c.region = 'Central' and o.status = 'delivered'."
    ],
    "solution_explanation": "Aggregates customer orders by regional boundary.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-035",
    "domain": "ecommerce",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "[Order Status Audit #35] System-wide Status Breakdown",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "Operations is reviewing system health for audit #35. Group all orders by status, show order counts, and show the average shipping fee rounded to 2 decimals. Only include statuses with at least 5 orders.",
    "context_notes": "Group orders by status, count orders, round average shipping fee to 2 decimals. Use HAVING COUNT(*) >= 5, sort descending by order_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "order_count",
      "avg_shipping_fee"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders GROUP BY status HAVING COUNT(*) >= 5 ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY status.",
      "HAVING COUNT(*) >= 5 ORDER BY order_count DESC."
    ],
    "solution_explanation": "Groups orders by fulfillment status with an aggregate threshold.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-036",
    "domain": "ecommerce",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "[Logistics Scorecard #36] Shipment Counts by Carrier",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "Logistics wants to monitor carrier allocation for batch #36. Show carrier names and total shipment counts, sorted descending.",
    "context_notes": "Group shipments by carrier and count shipments. Order descending by shipment_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "shipment_count"
    ],
    "reference_sql": "SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier ORDER BY shipment_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY carrier and COUNT(*)."
    ],
    "solution_explanation": "Aggregates package dispatches across delivery carriers.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-037",
    "domain": "ecommerce",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "[Category Analysis #37] Pricing Profile for Office Supplies",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "We need catalog distribution metrics for report #37. What is the total count of products and average price in the 'Office Supplies' category?",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Office Supplies'. Round average price to 2 decimals.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "category_name",
      "product_count",
      "avg_price"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(p.id) AS product_count, ROUND(AVG(p.price), 2) AS avg_price FROM categories c JOIN products p ON c.id = p.category_id WHERE c.name = 'Office Supplies' GROUP BY c.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories and products.",
      "Filter c.name = 'Office Supplies' and GROUP BY c.name."
    ],
    "solution_explanation": "Calculates catalog metrics with COUNT and AVG per category.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-038",
    "domain": "ecommerce",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "[Regional Metrics #38] Order Volume in West",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "Regional leadership needs order performance figures for the West region (Review #38). Return the region name, total completed/delivered orders, and total revenue collected.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter where region = 'West' and status = 'delivered'. Group by region.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "region",
      "order_count",
      "total_revenue"
    ],
    "reference_sql": "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = 'West' AND o.status = 'delivered' GROUP BY c.region;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders.",
      "Filter c.region = 'West' and o.status = 'delivered'."
    ],
    "solution_explanation": "Aggregates customer orders by regional boundary.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-039",
    "domain": "ecommerce",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "[Order Status Audit #39] System-wide Status Breakdown",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "Operations is reviewing system health for audit #39. Group all orders by status, show order counts, and show the average shipping fee rounded to 2 decimals. Only include statuses with at least 5 orders.",
    "context_notes": "Group orders by status, count orders, round average shipping fee to 2 decimals. Use HAVING COUNT(*) >= 5, sort descending by order_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "order_count",
      "avg_shipping_fee"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders GROUP BY status HAVING COUNT(*) >= 5 ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY status.",
      "HAVING COUNT(*) >= 5 ORDER BY order_count DESC."
    ],
    "solution_explanation": "Groups orders by fulfillment status with an aggregate threshold.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-040",
    "domain": "ecommerce",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "[Logistics Scorecard #40] Shipment Counts by Carrier",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "Logistics wants to monitor carrier allocation for batch #40. Show carrier names and total shipment counts, sorted descending.",
    "context_notes": "Group shipments by carrier and count shipments. Order descending by shipment_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "shipment_count"
    ],
    "reference_sql": "SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier ORDER BY shipment_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY carrier and COUNT(*)."
    ],
    "solution_explanation": "Aggregates package dispatches across delivery carriers.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-041",
    "domain": "ecommerce",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "[Category Analysis #41] Pricing Profile for Sports & Outdoors",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "We need catalog distribution metrics for report #41. What is the total count of products and average price in the 'Sports & Outdoors' category?",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Sports & Outdoors'. Round average price to 2 decimals.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "category_name",
      "product_count",
      "avg_price"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(p.id) AS product_count, ROUND(AVG(p.price), 2) AS avg_price FROM categories c JOIN products p ON c.id = p.category_id WHERE c.name = 'Sports & Outdoors' GROUP BY c.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories and products.",
      "Filter c.name = 'Sports & Outdoors' and GROUP BY c.name."
    ],
    "solution_explanation": "Calculates catalog metrics with COUNT and AVG per category.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-042",
    "domain": "ecommerce",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "[Regional Metrics #42] Order Volume in East",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "Regional leadership needs order performance figures for the East region (Review #42). Return the region name, total completed/delivered orders, and total revenue collected.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter where region = 'East' and status = 'delivered'. Group by region.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "region",
      "order_count",
      "total_revenue"
    ],
    "reference_sql": "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = 'East' AND o.status = 'delivered' GROUP BY c.region;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders.",
      "Filter c.region = 'East' and o.status = 'delivered'."
    ],
    "solution_explanation": "Aggregates customer orders by regional boundary.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-043",
    "domain": "ecommerce",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "[Order Status Audit #43] System-wide Status Breakdown",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "Operations is reviewing system health for audit #43. Group all orders by status, show order counts, and show the average shipping fee rounded to 2 decimals. Only include statuses with at least 5 orders.",
    "context_notes": "Group orders by status, count orders, round average shipping fee to 2 decimals. Use HAVING COUNT(*) >= 5, sort descending by order_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "order_count",
      "avg_shipping_fee"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders GROUP BY status HAVING COUNT(*) >= 5 ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY status.",
      "HAVING COUNT(*) >= 5 ORDER BY order_count DESC."
    ],
    "solution_explanation": "Groups orders by fulfillment status with an aggregate threshold.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-044",
    "domain": "ecommerce",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "[Logistics Scorecard #44] Shipment Counts by Carrier",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "Logistics wants to monitor carrier allocation for batch #44. Show carrier names and total shipment counts, sorted descending.",
    "context_notes": "Group shipments by carrier and count shipments. Order descending by shipment_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "shipment_count"
    ],
    "reference_sql": "SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier ORDER BY shipment_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY carrier and COUNT(*)."
    ],
    "solution_explanation": "Aggregates package dispatches across delivery carriers.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-045",
    "domain": "ecommerce",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "[Category Analysis #45] Pricing Profile for Office Supplies",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "We need catalog distribution metrics for report #45. What is the total count of products and average price in the 'Office Supplies' category?",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Office Supplies'. Round average price to 2 decimals.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "category_name",
      "product_count",
      "avg_price"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(p.id) AS product_count, ROUND(AVG(p.price), 2) AS avg_price FROM categories c JOIN products p ON c.id = p.category_id WHERE c.name = 'Office Supplies' GROUP BY c.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories and products.",
      "Filter c.name = 'Office Supplies' and GROUP BY c.name."
    ],
    "solution_explanation": "Calculates catalog metrics with COUNT and AVG per category.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-046",
    "domain": "ecommerce",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "[Regional Metrics #46] Order Volume in South",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "Regional leadership needs order performance figures for the South region (Review #46). Return the region name, total completed/delivered orders, and total revenue collected.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter where region = 'South' and status = 'delivered'. Group by region.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "region",
      "order_count",
      "total_revenue"
    ],
    "reference_sql": "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = 'South' AND o.status = 'delivered' GROUP BY c.region;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders.",
      "Filter c.region = 'South' and o.status = 'delivered'."
    ],
    "solution_explanation": "Aggregates customer orders by regional boundary.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-047",
    "domain": "ecommerce",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "[Order Status Audit #47] System-wide Status Breakdown",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "Operations is reviewing system health for audit #47. Group all orders by status, show order counts, and show the average shipping fee rounded to 2 decimals. Only include statuses with at least 5 orders.",
    "context_notes": "Group orders by status, count orders, round average shipping fee to 2 decimals. Use HAVING COUNT(*) >= 5, sort descending by order_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "order_count",
      "avg_shipping_fee"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders GROUP BY status HAVING COUNT(*) >= 5 ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY status.",
      "HAVING COUNT(*) >= 5 ORDER BY order_count DESC."
    ],
    "solution_explanation": "Groups orders by fulfillment status with an aggregate threshold.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-048",
    "domain": "ecommerce",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "[Logistics Scorecard #48] Shipment Counts by Carrier",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "Logistics wants to monitor carrier allocation for batch #48. Show carrier names and total shipment counts, sorted descending.",
    "context_notes": "Group shipments by carrier and count shipments. Order descending by shipment_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "shipment_count"
    ],
    "reference_sql": "SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier ORDER BY shipment_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY carrier and COUNT(*)."
    ],
    "solution_explanation": "Aggregates package dispatches across delivery carriers.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-049",
    "domain": "ecommerce",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "[Category Analysis #49] Pricing Profile for Sports & Outdoors",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "We need catalog distribution metrics for report #49. What is the total count of products and average price in the 'Sports & Outdoors' category?",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Sports & Outdoors'. Round average price to 2 decimals.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "category_name",
      "product_count",
      "avg_price"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(p.id) AS product_count, ROUND(AVG(p.price), 2) AS avg_price FROM categories c JOIN products p ON c.id = p.category_id WHERE c.name = 'Sports & Outdoors' GROUP BY c.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories and products.",
      "Filter c.name = 'Sports & Outdoors' and GROUP BY c.name."
    ],
    "solution_explanation": "Calculates catalog metrics with COUNT and AVG per category.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-050",
    "domain": "ecommerce",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "[Regional Metrics #50] Order Volume in North",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "Regional leadership needs order performance figures for the North region (Review #50). Return the region name, total completed/delivered orders, and total revenue collected.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter where region = 'North' and status = 'delivered'. Group by region.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "region",
      "order_count",
      "total_revenue"
    ],
    "reference_sql": "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = 'North' AND o.status = 'delivered' GROUP BY c.region;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders.",
      "Filter c.region = 'North' and o.status = 'delivered'."
    ],
    "solution_explanation": "Aggregates customer orders by regional boundary.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-051",
    "domain": "ecommerce",
    "level": 1,
    "order": 51,
    "difficulty": "core",
    "title": "[Order Status Audit #51] System-wide Status Breakdown",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "Operations is reviewing system health for audit #51. Group all orders by status, show order counts, and show the average shipping fee rounded to 2 decimals. Only include statuses with at least 5 orders.",
    "context_notes": "Group orders by status, count orders, round average shipping fee to 2 decimals. Use HAVING COUNT(*) >= 5, sort descending by order_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "order_count",
      "avg_shipping_fee"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders GROUP BY status HAVING COUNT(*) >= 5 ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY status.",
      "HAVING COUNT(*) >= 5 ORDER BY order_count DESC."
    ],
    "solution_explanation": "Groups orders by fulfillment status with an aggregate threshold.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-052",
    "domain": "ecommerce",
    "level": 1,
    "order": 52,
    "difficulty": "core",
    "title": "[Logistics Scorecard #52] Shipment Counts by Carrier",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "Logistics wants to monitor carrier allocation for batch #52. Show carrier names and total shipment counts, sorted descending.",
    "context_notes": "Group shipments by carrier and count shipments. Order descending by shipment_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "shipment_count"
    ],
    "reference_sql": "SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier ORDER BY shipment_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY carrier and COUNT(*)."
    ],
    "solution_explanation": "Aggregates package dispatches across delivery carriers.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-053",
    "domain": "ecommerce",
    "level": 1,
    "order": 53,
    "difficulty": "core",
    "title": "[Category Analysis #53] Pricing Profile for Office Supplies",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "We need catalog distribution metrics for report #53. What is the total count of products and average price in the 'Office Supplies' category?",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Office Supplies'. Round average price to 2 decimals.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "category_name",
      "product_count",
      "avg_price"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(p.id) AS product_count, ROUND(AVG(p.price), 2) AS avg_price FROM categories c JOIN products p ON c.id = p.category_id WHERE c.name = 'Office Supplies' GROUP BY c.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories and products.",
      "Filter c.name = 'Office Supplies' and GROUP BY c.name."
    ],
    "solution_explanation": "Calculates catalog metrics with COUNT and AVG per category.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-054",
    "domain": "ecommerce",
    "level": 1,
    "order": 54,
    "difficulty": "core",
    "title": "[Regional Metrics #54] Order Volume in Central",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "Regional leadership needs order performance figures for the Central region (Review #54). Return the region name, total completed/delivered orders, and total revenue collected.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter where region = 'Central' and status = 'delivered'. Group by region.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "region",
      "order_count",
      "total_revenue"
    ],
    "reference_sql": "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = 'Central' AND o.status = 'delivered' GROUP BY c.region;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders.",
      "Filter c.region = 'Central' and o.status = 'delivered'."
    ],
    "solution_explanation": "Aggregates customer orders by regional boundary.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-055",
    "domain": "ecommerce",
    "level": 1,
    "order": 55,
    "difficulty": "core",
    "title": "[Order Status Audit #55] System-wide Status Breakdown",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "Operations is reviewing system health for audit #55. Group all orders by status, show order counts, and show the average shipping fee rounded to 2 decimals. Only include statuses with at least 5 orders.",
    "context_notes": "Group orders by status, count orders, round average shipping fee to 2 decimals. Use HAVING COUNT(*) >= 5, sort descending by order_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "order_count",
      "avg_shipping_fee"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders GROUP BY status HAVING COUNT(*) >= 5 ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY status.",
      "HAVING COUNT(*) >= 5 ORDER BY order_count DESC."
    ],
    "solution_explanation": "Groups orders by fulfillment status with an aggregate threshold.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-056",
    "domain": "ecommerce",
    "level": 1,
    "order": 56,
    "difficulty": "core",
    "title": "[Logistics Scorecard #56] Shipment Counts by Carrier",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "Logistics wants to monitor carrier allocation for batch #56. Show carrier names and total shipment counts, sorted descending.",
    "context_notes": "Group shipments by carrier and count shipments. Order descending by shipment_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "shipment_count"
    ],
    "reference_sql": "SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier ORDER BY shipment_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY carrier and COUNT(*)."
    ],
    "solution_explanation": "Aggregates package dispatches across delivery carriers.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-057",
    "domain": "ecommerce",
    "level": 1,
    "order": 57,
    "difficulty": "core",
    "title": "[Category Analysis #57] Pricing Profile for Sports & Outdoors",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "We need catalog distribution metrics for report #57. What is the total count of products and average price in the 'Sports & Outdoors' category?",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Sports & Outdoors'. Round average price to 2 decimals.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "category_name",
      "product_count",
      "avg_price"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(p.id) AS product_count, ROUND(AVG(p.price), 2) AS avg_price FROM categories c JOIN products p ON c.id = p.category_id WHERE c.name = 'Sports & Outdoors' GROUP BY c.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories and products.",
      "Filter c.name = 'Sports & Outdoors' and GROUP BY c.name."
    ],
    "solution_explanation": "Calculates catalog metrics with COUNT and AVG per category.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-058",
    "domain": "ecommerce",
    "level": 1,
    "order": 58,
    "difficulty": "core",
    "title": "[Regional Metrics #58] Order Volume in West",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "Regional leadership needs order performance figures for the West region (Review #58). Return the region name, total completed/delivered orders, and total revenue collected.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter where region = 'West' and status = 'delivered'. Group by region.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "region",
      "order_count",
      "total_revenue"
    ],
    "reference_sql": "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = 'West' AND o.status = 'delivered' GROUP BY c.region;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders.",
      "Filter c.region = 'West' and o.status = 'delivered'."
    ],
    "solution_explanation": "Aggregates customer orders by regional boundary.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-059",
    "domain": "ecommerce",
    "level": 1,
    "order": 59,
    "difficulty": "core",
    "title": "[Order Status Audit #59] System-wide Status Breakdown",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "Operations is reviewing system health for audit #59. Group all orders by status, show order counts, and show the average shipping fee rounded to 2 decimals. Only include statuses with at least 5 orders.",
    "context_notes": "Group orders by status, count orders, round average shipping fee to 2 decimals. Use HAVING COUNT(*) >= 5, sort descending by order_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "order_count",
      "avg_shipping_fee"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders GROUP BY status HAVING COUNT(*) >= 5 ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY status.",
      "HAVING COUNT(*) >= 5 ORDER BY order_count DESC."
    ],
    "solution_explanation": "Groups orders by fulfillment status with an aggregate threshold.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-060",
    "domain": "ecommerce",
    "level": 1,
    "order": 60,
    "difficulty": "core",
    "title": "[Logistics Scorecard #60] Shipment Counts by Carrier",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "Logistics wants to monitor carrier allocation for batch #60. Show carrier names and total shipment counts, sorted descending.",
    "context_notes": "Group shipments by carrier and count shipments. Order descending by shipment_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "shipment_count"
    ],
    "reference_sql": "SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier ORDER BY shipment_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY carrier and COUNT(*)."
    ],
    "solution_explanation": "Aggregates package dispatches across delivery carriers.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-061",
    "domain": "ecommerce",
    "level": 1,
    "order": 61,
    "difficulty": "core",
    "title": "[Category Analysis #61] Pricing Profile for Office Supplies",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "We need catalog distribution metrics for report #61. What is the total count of products and average price in the 'Office Supplies' category?",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Office Supplies'. Round average price to 2 decimals.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "category_name",
      "product_count",
      "avg_price"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(p.id) AS product_count, ROUND(AVG(p.price), 2) AS avg_price FROM categories c JOIN products p ON c.id = p.category_id WHERE c.name = 'Office Supplies' GROUP BY c.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories and products.",
      "Filter c.name = 'Office Supplies' and GROUP BY c.name."
    ],
    "solution_explanation": "Calculates catalog metrics with COUNT and AVG per category.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-062",
    "domain": "ecommerce",
    "level": 1,
    "order": 62,
    "difficulty": "core",
    "title": "[Regional Metrics #62] Order Volume in East",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "Regional leadership needs order performance figures for the East region (Review #62). Return the region name, total completed/delivered orders, and total revenue collected.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter where region = 'East' and status = 'delivered'. Group by region.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "region",
      "order_count",
      "total_revenue"
    ],
    "reference_sql": "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = 'East' AND o.status = 'delivered' GROUP BY c.region;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders.",
      "Filter c.region = 'East' and o.status = 'delivered'."
    ],
    "solution_explanation": "Aggregates customer orders by regional boundary.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-063",
    "domain": "ecommerce",
    "level": 1,
    "order": 63,
    "difficulty": "core",
    "title": "[Order Status Audit #63] System-wide Status Breakdown",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "Operations is reviewing system health for audit #63. Group all orders by status, show order counts, and show the average shipping fee rounded to 2 decimals. Only include statuses with at least 5 orders.",
    "context_notes": "Group orders by status, count orders, round average shipping fee to 2 decimals. Use HAVING COUNT(*) >= 5, sort descending by order_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "order_count",
      "avg_shipping_fee"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders GROUP BY status HAVING COUNT(*) >= 5 ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY status.",
      "HAVING COUNT(*) >= 5 ORDER BY order_count DESC."
    ],
    "solution_explanation": "Groups orders by fulfillment status with an aggregate threshold.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-064",
    "domain": "ecommerce",
    "level": 1,
    "order": 64,
    "difficulty": "core",
    "title": "[Logistics Scorecard #64] Shipment Counts by Carrier",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "Logistics wants to monitor carrier allocation for batch #64. Show carrier names and total shipment counts, sorted descending.",
    "context_notes": "Group shipments by carrier and count shipments. Order descending by shipment_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "shipment_count"
    ],
    "reference_sql": "SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier ORDER BY shipment_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY carrier and COUNT(*)."
    ],
    "solution_explanation": "Aggregates package dispatches across delivery carriers.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-065",
    "domain": "ecommerce",
    "level": 1,
    "order": 65,
    "difficulty": "core",
    "title": "[Category Analysis #65] Pricing Profile for Sports & Outdoors",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "We need catalog distribution metrics for report #65. What is the total count of products and average price in the 'Sports & Outdoors' category?",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Sports & Outdoors'. Round average price to 2 decimals.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "category_name",
      "product_count",
      "avg_price"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(p.id) AS product_count, ROUND(AVG(p.price), 2) AS avg_price FROM categories c JOIN products p ON c.id = p.category_id WHERE c.name = 'Sports & Outdoors' GROUP BY c.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories and products.",
      "Filter c.name = 'Sports & Outdoors' and GROUP BY c.name."
    ],
    "solution_explanation": "Calculates catalog metrics with COUNT and AVG per category.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-066",
    "domain": "ecommerce",
    "level": 1,
    "order": 66,
    "difficulty": "core",
    "title": "[Regional Metrics #66] Order Volume in South",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "Regional leadership needs order performance figures for the South region (Review #66). Return the region name, total completed/delivered orders, and total revenue collected.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter where region = 'South' and status = 'delivered'. Group by region.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "region",
      "order_count",
      "total_revenue"
    ],
    "reference_sql": "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = 'South' AND o.status = 'delivered' GROUP BY c.region;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders.",
      "Filter c.region = 'South' and o.status = 'delivered'."
    ],
    "solution_explanation": "Aggregates customer orders by regional boundary.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-067",
    "domain": "ecommerce",
    "level": 1,
    "order": 67,
    "difficulty": "core",
    "title": "[Order Status Audit #67] System-wide Status Breakdown",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "Operations is reviewing system health for audit #67. Group all orders by status, show order counts, and show the average shipping fee rounded to 2 decimals. Only include statuses with at least 5 orders.",
    "context_notes": "Group orders by status, count orders, round average shipping fee to 2 decimals. Use HAVING COUNT(*) >= 5, sort descending by order_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "order_count",
      "avg_shipping_fee"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders GROUP BY status HAVING COUNT(*) >= 5 ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY status.",
      "HAVING COUNT(*) >= 5 ORDER BY order_count DESC."
    ],
    "solution_explanation": "Groups orders by fulfillment status with an aggregate threshold.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-068",
    "domain": "ecommerce",
    "level": 1,
    "order": 68,
    "difficulty": "core",
    "title": "[Logistics Scorecard #68] Shipment Counts by Carrier",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "Logistics wants to monitor carrier allocation for batch #68. Show carrier names and total shipment counts, sorted descending.",
    "context_notes": "Group shipments by carrier and count shipments. Order descending by shipment_count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "shipment_count"
    ],
    "reference_sql": "SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier ORDER BY shipment_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "GROUP BY carrier and COUNT(*)."
    ],
    "solution_explanation": "Aggregates package dispatches across delivery carriers.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-069",
    "domain": "ecommerce",
    "level": 1,
    "order": 69,
    "difficulty": "core",
    "title": "[Category Analysis #69] Pricing Profile for Office Supplies",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "We need catalog distribution metrics for report #69. What is the total count of products and average price in the 'Office Supplies' category?",
    "context_notes": "Join products with categories on category_id = categories.id. Filter for 'Office Supplies'. Round average price to 2 decimals.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "category_name",
      "product_count",
      "avg_price"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(p.id) AS product_count, ROUND(AVG(p.price), 2) AS avg_price FROM categories c JOIN products p ON c.id = p.category_id WHERE c.name = 'Office Supplies' GROUP BY c.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories and products.",
      "Filter c.name = 'Office Supplies' and GROUP BY c.name."
    ],
    "solution_explanation": "Calculates catalog metrics with COUNT and AVG per category.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-070",
    "domain": "ecommerce",
    "level": 1,
    "order": 70,
    "difficulty": "core",
    "title": "[Regional Metrics #70] Order Volume in North",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "Regional leadership needs order performance figures for the North region (Review #70). Return the region name, total completed/delivered orders, and total revenue collected.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter where region = 'North' and status = 'delivered'. Group by region.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "region",
      "order_count",
      "total_revenue"
    ],
    "reference_sql": "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = 'North' AND o.status = 'delivered' GROUP BY c.region;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders.",
      "Filter c.region = 'North' and o.status = 'delivered'."
    ],
    "solution_explanation": "Aggregates customer orders by regional boundary.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-071",
    "domain": "ecommerce",
    "level": 1,
    "order": 71,
    "difficulty": "challenging",
    "title": "[VIP Cohort #71] High-Value Customers (Exceeding $400)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "Marketing wants to reward repeat VIPs for cohort review #71. Find all customers who have accumulated more than $400 in total delivered orders. Return their first_name, last_name, email, and total spent.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter orders on status = 'delivered'. Group by customer, use HAVING SUM(orders.total_amount) > 400, sort descending.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email",
      "total_spent"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.email, ROUND(SUM(o.total_amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.email HAVING SUM(o.total_amount) > 400 ORDER BY total_spent DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter o.status = 'delivered'.",
      "Use HAVING SUM(o.total_amount) > 400."
    ],
    "solution_explanation": "Aggregates customer spend across delivered orders with a HAVING threshold.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-072",
    "domain": "ecommerce",
    "level": 1,
    "order": 72,
    "difficulty": "challenging",
    "title": "[Fast Mover #72] Products with At Least 5 Units Ordered",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "Merchandising wants to see our fastest-moving items for reorder review #72. Return product names with their total quantity sold across all orders, showing only products with at least 5 units sold.",
    "context_notes": "Join products with order_items on products.id = order_items.product_id. Group by product name, use HAVING SUM(quantity) >= 5, sort descending by total_units_sold.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "total_units_sold"
    ],
    "reference_sql": "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 5 ORDER BY total_units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and order_items.",
      "GROUP BY p.name and use HAVING SUM(quantity) >= 5."
    ],
    "solution_explanation": "Summarizes units sold per product using an aggregate filter.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-073",
    "domain": "ecommerce",
    "level": 1,
    "order": 73,
    "difficulty": "challenging",
    "title": "[VIP Cohort #73] High-Value Customers (Exceeding $600)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "Marketing wants to reward repeat VIPs for cohort review #73. Find all customers who have accumulated more than $600 in total delivered orders. Return their first_name, last_name, email, and total spent.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter orders on status = 'delivered'. Group by customer, use HAVING SUM(orders.total_amount) > 600, sort descending.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email",
      "total_spent"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.email, ROUND(SUM(o.total_amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.email HAVING SUM(o.total_amount) > 600 ORDER BY total_spent DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter o.status = 'delivered'.",
      "Use HAVING SUM(o.total_amount) > 600."
    ],
    "solution_explanation": "Aggregates customer spend across delivered orders with a HAVING threshold.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-074",
    "domain": "ecommerce",
    "level": 1,
    "order": 74,
    "difficulty": "challenging",
    "title": "[Fast Mover #74] Products with At Least 9 Units Ordered",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "Merchandising wants to see our fastest-moving items for reorder review #74. Return product names with their total quantity sold across all orders, showing only products with at least 9 units sold.",
    "context_notes": "Join products with order_items on products.id = order_items.product_id. Group by product name, use HAVING SUM(quantity) >= 9, sort descending by total_units_sold.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "total_units_sold"
    ],
    "reference_sql": "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 9 ORDER BY total_units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and order_items.",
      "GROUP BY p.name and use HAVING SUM(quantity) >= 9."
    ],
    "solution_explanation": "Summarizes units sold per product using an aggregate filter.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-075",
    "domain": "ecommerce",
    "level": 1,
    "order": 75,
    "difficulty": "challenging",
    "title": "[VIP Cohort #75] High-Value Customers (Exceeding $300)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "Marketing wants to reward repeat VIPs for cohort review #75. Find all customers who have accumulated more than $300 in total delivered orders. Return their first_name, last_name, email, and total spent.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter orders on status = 'delivered'. Group by customer, use HAVING SUM(orders.total_amount) > 300, sort descending.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email",
      "total_spent"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.email, ROUND(SUM(o.total_amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.email HAVING SUM(o.total_amount) > 300 ORDER BY total_spent DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter o.status = 'delivered'.",
      "Use HAVING SUM(o.total_amount) > 300."
    ],
    "solution_explanation": "Aggregates customer spend across delivered orders with a HAVING threshold.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-076",
    "domain": "ecommerce",
    "level": 1,
    "order": 76,
    "difficulty": "challenging",
    "title": "[Fast Mover #76] Products with At Least 5 Units Ordered",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "Merchandising wants to see our fastest-moving items for reorder review #76. Return product names with their total quantity sold across all orders, showing only products with at least 5 units sold.",
    "context_notes": "Join products with order_items on products.id = order_items.product_id. Group by product name, use HAVING SUM(quantity) >= 5, sort descending by total_units_sold.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "total_units_sold"
    ],
    "reference_sql": "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 5 ORDER BY total_units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and order_items.",
      "GROUP BY p.name and use HAVING SUM(quantity) >= 5."
    ],
    "solution_explanation": "Summarizes units sold per product using an aggregate filter.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-077",
    "domain": "ecommerce",
    "level": 1,
    "order": 77,
    "difficulty": "challenging",
    "title": "[VIP Cohort #77] High-Value Customers (Exceeding $500)",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "Marketing wants to reward repeat VIPs for cohort review #77. Find all customers who have accumulated more than $500 in total delivered orders. Return their first_name, last_name, email, and total spent.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter orders on status = 'delivered'. Group by customer, use HAVING SUM(orders.total_amount) > 500, sort descending.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email",
      "total_spent"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.email, ROUND(SUM(o.total_amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.email HAVING SUM(o.total_amount) > 500 ORDER BY total_spent DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter o.status = 'delivered'.",
      "Use HAVING SUM(o.total_amount) > 500."
    ],
    "solution_explanation": "Aggregates customer spend across delivered orders with a HAVING threshold.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-078",
    "domain": "ecommerce",
    "level": 1,
    "order": 78,
    "difficulty": "challenging",
    "title": "[Fast Mover #78] Products with At Least 9 Units Ordered",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "Merchandising wants to see our fastest-moving items for reorder review #78. Return product names with their total quantity sold across all orders, showing only products with at least 9 units sold.",
    "context_notes": "Join products with order_items on products.id = order_items.product_id. Group by product name, use HAVING SUM(quantity) >= 9, sort descending by total_units_sold.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "total_units_sold"
    ],
    "reference_sql": "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 9 ORDER BY total_units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and order_items.",
      "GROUP BY p.name and use HAVING SUM(quantity) >= 9."
    ],
    "solution_explanation": "Summarizes units sold per product using an aggregate filter.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-079",
    "domain": "ecommerce",
    "level": 1,
    "order": 79,
    "difficulty": "challenging",
    "title": "[VIP Cohort #79] High-Value Customers (Exceeding $700)",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "Marketing wants to reward repeat VIPs for cohort review #79. Find all customers who have accumulated more than $700 in total delivered orders. Return their first_name, last_name, email, and total spent.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter orders on status = 'delivered'. Group by customer, use HAVING SUM(orders.total_amount) > 700, sort descending.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email",
      "total_spent"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.email, ROUND(SUM(o.total_amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.email HAVING SUM(o.total_amount) > 700 ORDER BY total_spent DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter o.status = 'delivered'.",
      "Use HAVING SUM(o.total_amount) > 700."
    ],
    "solution_explanation": "Aggregates customer spend across delivered orders with a HAVING threshold.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-080",
    "domain": "ecommerce",
    "level": 1,
    "order": 80,
    "difficulty": "challenging",
    "title": "[Fast Mover #80] Products with At Least 5 Units Ordered",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "Merchandising wants to see our fastest-moving items for reorder review #80. Return product names with their total quantity sold across all orders, showing only products with at least 5 units sold.",
    "context_notes": "Join products with order_items on products.id = order_items.product_id. Group by product name, use HAVING SUM(quantity) >= 5, sort descending by total_units_sold.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "total_units_sold"
    ],
    "reference_sql": "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 5 ORDER BY total_units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and order_items.",
      "GROUP BY p.name and use HAVING SUM(quantity) >= 5."
    ],
    "solution_explanation": "Summarizes units sold per product using an aggregate filter.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-081",
    "domain": "ecommerce",
    "level": 1,
    "order": 81,
    "difficulty": "challenging",
    "title": "[VIP Cohort #81] High-Value Customers (Exceeding $400)",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "Marketing wants to reward repeat VIPs for cohort review #81. Find all customers who have accumulated more than $400 in total delivered orders. Return their first_name, last_name, email, and total spent.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter orders on status = 'delivered'. Group by customer, use HAVING SUM(orders.total_amount) > 400, sort descending.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email",
      "total_spent"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.email, ROUND(SUM(o.total_amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.email HAVING SUM(o.total_amount) > 400 ORDER BY total_spent DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter o.status = 'delivered'.",
      "Use HAVING SUM(o.total_amount) > 400."
    ],
    "solution_explanation": "Aggregates customer spend across delivered orders with a HAVING threshold.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-082",
    "domain": "ecommerce",
    "level": 1,
    "order": 82,
    "difficulty": "challenging",
    "title": "[Fast Mover #82] Products with At Least 9 Units Ordered",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "Merchandising wants to see our fastest-moving items for reorder review #82. Return product names with their total quantity sold across all orders, showing only products with at least 9 units sold.",
    "context_notes": "Join products with order_items on products.id = order_items.product_id. Group by product name, use HAVING SUM(quantity) >= 9, sort descending by total_units_sold.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "total_units_sold"
    ],
    "reference_sql": "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 9 ORDER BY total_units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and order_items.",
      "GROUP BY p.name and use HAVING SUM(quantity) >= 9."
    ],
    "solution_explanation": "Summarizes units sold per product using an aggregate filter.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-083",
    "domain": "ecommerce",
    "level": 1,
    "order": 83,
    "difficulty": "challenging",
    "title": "[VIP Cohort #83] High-Value Customers (Exceeding $600)",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "Marketing wants to reward repeat VIPs for cohort review #83. Find all customers who have accumulated more than $600 in total delivered orders. Return their first_name, last_name, email, and total spent.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter orders on status = 'delivered'. Group by customer, use HAVING SUM(orders.total_amount) > 600, sort descending.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email",
      "total_spent"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.email, ROUND(SUM(o.total_amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.email HAVING SUM(o.total_amount) > 600 ORDER BY total_spent DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter o.status = 'delivered'.",
      "Use HAVING SUM(o.total_amount) > 600."
    ],
    "solution_explanation": "Aggregates customer spend across delivered orders with a HAVING threshold.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-084",
    "domain": "ecommerce",
    "level": 1,
    "order": 84,
    "difficulty": "challenging",
    "title": "[Fast Mover #84] Products with At Least 5 Units Ordered",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "Merchandising wants to see our fastest-moving items for reorder review #84. Return product names with their total quantity sold across all orders, showing only products with at least 5 units sold.",
    "context_notes": "Join products with order_items on products.id = order_items.product_id. Group by product name, use HAVING SUM(quantity) >= 5, sort descending by total_units_sold.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "total_units_sold"
    ],
    "reference_sql": "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 5 ORDER BY total_units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and order_items.",
      "GROUP BY p.name and use HAVING SUM(quantity) >= 5."
    ],
    "solution_explanation": "Summarizes units sold per product using an aggregate filter.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-085",
    "domain": "ecommerce",
    "level": 1,
    "order": 85,
    "difficulty": "challenging",
    "title": "[VIP Cohort #85] High-Value Customers (Exceeding $300)",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "Marketing wants to reward repeat VIPs for cohort review #85. Find all customers who have accumulated more than $300 in total delivered orders. Return their first_name, last_name, email, and total spent.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter orders on status = 'delivered'. Group by customer, use HAVING SUM(orders.total_amount) > 300, sort descending.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email",
      "total_spent"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.email, ROUND(SUM(o.total_amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.email HAVING SUM(o.total_amount) > 300 ORDER BY total_spent DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter o.status = 'delivered'.",
      "Use HAVING SUM(o.total_amount) > 300."
    ],
    "solution_explanation": "Aggregates customer spend across delivered orders with a HAVING threshold.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-086",
    "domain": "ecommerce",
    "level": 1,
    "order": 86,
    "difficulty": "challenging",
    "title": "[Fast Mover #86] Products with At Least 9 Units Ordered",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "Merchandising wants to see our fastest-moving items for reorder review #86. Return product names with their total quantity sold across all orders, showing only products with at least 9 units sold.",
    "context_notes": "Join products with order_items on products.id = order_items.product_id. Group by product name, use HAVING SUM(quantity) >= 9, sort descending by total_units_sold.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "total_units_sold"
    ],
    "reference_sql": "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 9 ORDER BY total_units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and order_items.",
      "GROUP BY p.name and use HAVING SUM(quantity) >= 9."
    ],
    "solution_explanation": "Summarizes units sold per product using an aggregate filter.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-087",
    "domain": "ecommerce",
    "level": 1,
    "order": 87,
    "difficulty": "challenging",
    "title": "[VIP Cohort #87] High-Value Customers (Exceeding $500)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "Marketing wants to reward repeat VIPs for cohort review #87. Find all customers who have accumulated more than $500 in total delivered orders. Return their first_name, last_name, email, and total spent.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter orders on status = 'delivered'. Group by customer, use HAVING SUM(orders.total_amount) > 500, sort descending.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email",
      "total_spent"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.email, ROUND(SUM(o.total_amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.email HAVING SUM(o.total_amount) > 500 ORDER BY total_spent DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter o.status = 'delivered'.",
      "Use HAVING SUM(o.total_amount) > 500."
    ],
    "solution_explanation": "Aggregates customer spend across delivered orders with a HAVING threshold.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-088",
    "domain": "ecommerce",
    "level": 1,
    "order": 88,
    "difficulty": "challenging",
    "title": "[Fast Mover #88] Products with At Least 5 Units Ordered",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "Merchandising wants to see our fastest-moving items for reorder review #88. Return product names with their total quantity sold across all orders, showing only products with at least 5 units sold.",
    "context_notes": "Join products with order_items on products.id = order_items.product_id. Group by product name, use HAVING SUM(quantity) >= 5, sort descending by total_units_sold.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "total_units_sold"
    ],
    "reference_sql": "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 5 ORDER BY total_units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and order_items.",
      "GROUP BY p.name and use HAVING SUM(quantity) >= 5."
    ],
    "solution_explanation": "Summarizes units sold per product using an aggregate filter.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-089",
    "domain": "ecommerce",
    "level": 1,
    "order": 89,
    "difficulty": "challenging",
    "title": "[VIP Cohort #89] High-Value Customers (Exceeding $700)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "Marketing wants to reward repeat VIPs for cohort review #89. Find all customers who have accumulated more than $700 in total delivered orders. Return their first_name, last_name, email, and total spent.",
    "context_notes": "Join customers and orders on customers.id = orders.customer_id. Filter orders on status = 'delivered'. Group by customer, use HAVING SUM(orders.total_amount) > 700, sort descending.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email",
      "total_spent"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.email, ROUND(SUM(o.total_amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.email HAVING SUM(o.total_amount) > 700 ORDER BY total_spent DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter o.status = 'delivered'.",
      "Use HAVING SUM(o.total_amount) > 700."
    ],
    "solution_explanation": "Aggregates customer spend across delivered orders with a HAVING threshold.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-090",
    "domain": "ecommerce",
    "level": 1,
    "order": 90,
    "difficulty": "challenging",
    "title": "[Fast Mover #90] Products with At Least 9 Units Ordered",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "Merchandising wants to see our fastest-moving items for reorder review #90. Return product names with their total quantity sold across all orders, showing only products with at least 9 units sold.",
    "context_notes": "Join products with order_items on products.id = order_items.product_id. Group by product name, use HAVING SUM(quantity) >= 9, sort descending by total_units_sold.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "total_units_sold"
    ],
    "reference_sql": "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 9 ORDER BY total_units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and order_items.",
      "GROUP BY p.name and use HAVING SUM(quantity) >= 9."
    ],
    "solution_explanation": "Summarizes units sold per product using an aggregate filter.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-091",
    "domain": "ecommerce",
    "level": 1,
    "order": 91,
    "difficulty": "boss",
    "title": "Boss Question #1: Executive Revenue Leaderboard",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "Executive Leadership requires an end-of-quarter performance matrix for \"Executive Revenue Leaderboard\". Join customers and orders to compute each customer's total order count, total revenue generated, and average order value across delivered orders. Return customers with at least 1 delivered order, sorted by total revenue descending, limited to top 10.",
    "context_notes": "Join customers and orders. Filter orders where status = 'delivered'. Group by customer id, first_name, last_name, region. Calculate count of distinct orders, sum of total_amount, and round average order amount to 2 decimals. Order by total_revenue DESC and LIMIT 10.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "GROUP BY",
      "DISTINCT",
      "SUM",
      "AVG",
      "ROUND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "region",
      "orders_placed",
      "total_revenue",
      "avg_order_value"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.region, COUNT(DISTINCT o.id) AS orders_placed, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region ORDER BY total_revenue DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter for o.status = 'delivered'.",
      "Calculate COUNT(DISTINCT o.id), SUM(o.total_amount), and AVG(o.total_amount).",
      "ORDER BY total_revenue DESC LIMIT 10."
    ],
    "solution_explanation": "Executive boss question joining customer accounts with completed orders to produce a revenue leaderboard.",
    "xp": 60,
    "estimated_minutes": 15
  },
  {
    "id": "ecom-L1-092",
    "domain": "ecommerce",
    "level": 1,
    "order": 92,
    "difficulty": "boss",
    "title": "Boss Question #2: Regional High-Roller Matrix",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "Executive Leadership requires an end-of-quarter performance matrix for \"Regional High-Roller Matrix\". Join customers and orders to compute each customer's total order count, total revenue generated, and average order value across delivered orders. Return customers with at least 1 delivered order, sorted by total revenue descending, limited to top 10.",
    "context_notes": "Join customers and orders. Filter orders where status = 'delivered'. Group by customer id, first_name, last_name, region. Calculate count of distinct orders, sum of total_amount, and round average order amount to 2 decimals. Order by total_revenue DESC and LIMIT 10.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "GROUP BY",
      "DISTINCT",
      "SUM",
      "AVG",
      "ROUND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "region",
      "orders_placed",
      "total_revenue",
      "avg_order_value"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.region, COUNT(DISTINCT o.id) AS orders_placed, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region ORDER BY total_revenue DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter for o.status = 'delivered'.",
      "Calculate COUNT(DISTINCT o.id), SUM(o.total_amount), and AVG(o.total_amount).",
      "ORDER BY total_revenue DESC LIMIT 10."
    ],
    "solution_explanation": "Executive boss question joining customer accounts with completed orders to produce a revenue leaderboard.",
    "xp": 60,
    "estimated_minutes": 15
  },
  {
    "id": "ecom-L1-093",
    "domain": "ecommerce",
    "level": 1,
    "order": 93,
    "difficulty": "boss",
    "title": "Boss Question #3: Customer Lifetime Value",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "Executive Leadership requires an end-of-quarter performance matrix for \"Customer Lifetime Value\". Join customers and orders to compute each customer's total order count, total revenue generated, and average order value across delivered orders. Return customers with at least 1 delivered order, sorted by total revenue descending, limited to top 10.",
    "context_notes": "Join customers and orders. Filter orders where status = 'delivered'. Group by customer id, first_name, last_name, region. Calculate count of distinct orders, sum of total_amount, and round average order amount to 2 decimals. Order by total_revenue DESC and LIMIT 10.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "GROUP BY",
      "DISTINCT",
      "SUM",
      "AVG",
      "ROUND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "region",
      "orders_placed",
      "total_revenue",
      "avg_order_value"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.region, COUNT(DISTINCT o.id) AS orders_placed, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region ORDER BY total_revenue DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter for o.status = 'delivered'.",
      "Calculate COUNT(DISTINCT o.id), SUM(o.total_amount), and AVG(o.total_amount).",
      "ORDER BY total_revenue DESC LIMIT 10."
    ],
    "solution_explanation": "Executive boss question joining customer accounts with completed orders to produce a revenue leaderboard.",
    "xp": 60,
    "estimated_minutes": 15
  },
  {
    "id": "ecom-L1-094",
    "domain": "ecommerce",
    "level": 1,
    "order": 94,
    "difficulty": "boss",
    "title": "Boss Question #4: VIP Repeat Buyer Cohort",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Inventory Lead"
    },
    "request": "Executive Leadership requires an end-of-quarter performance matrix for \"VIP Repeat Buyer Cohort\". Join customers and orders to compute each customer's total order count, total revenue generated, and average order value across delivered orders. Return customers with at least 1 delivered order, sorted by total revenue descending, limited to top 10.",
    "context_notes": "Join customers and orders. Filter orders where status = 'delivered'. Group by customer id, first_name, last_name, region. Calculate count of distinct orders, sum of total_amount, and round average order amount to 2 decimals. Order by total_revenue DESC and LIMIT 10.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "GROUP BY",
      "DISTINCT",
      "SUM",
      "AVG",
      "ROUND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "region",
      "orders_placed",
      "total_revenue",
      "avg_order_value"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.region, COUNT(DISTINCT o.id) AS orders_placed, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region ORDER BY total_revenue DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter for o.status = 'delivered'.",
      "Calculate COUNT(DISTINCT o.id), SUM(o.total_amount), and AVG(o.total_amount).",
      "ORDER BY total_revenue DESC LIMIT 10."
    ],
    "solution_explanation": "Executive boss question joining customer accounts with completed orders to produce a revenue leaderboard.",
    "xp": 60,
    "estimated_minutes": 15
  },
  {
    "id": "ecom-L1-095",
    "domain": "ecommerce",
    "level": 1,
    "order": 95,
    "difficulty": "boss",
    "title": "Boss Question #5: Fulfillment Speed & Value Audit",
    "stakeholder": {
      "name": "Elena Rostova",
      "role": "Director of Finance"
    },
    "request": "Executive Leadership requires an end-of-quarter performance matrix for \"Fulfillment Speed & Value Audit\". Join customers and orders to compute each customer's total order count, total revenue generated, and average order value across delivered orders. Return customers with at least 1 delivered order, sorted by total revenue descending, limited to top 10.",
    "context_notes": "Join customers and orders. Filter orders where status = 'delivered'. Group by customer id, first_name, last_name, region. Calculate count of distinct orders, sum of total_amount, and round average order amount to 2 decimals. Order by total_revenue DESC and LIMIT 10.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "GROUP BY",
      "DISTINCT",
      "SUM",
      "AVG",
      "ROUND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "region",
      "orders_placed",
      "total_revenue",
      "avg_order_value"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.region, COUNT(DISTINCT o.id) AS orders_placed, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region ORDER BY total_revenue DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter for o.status = 'delivered'.",
      "Calculate COUNT(DISTINCT o.id), SUM(o.total_amount), and AVG(o.total_amount).",
      "ORDER BY total_revenue DESC LIMIT 10."
    ],
    "solution_explanation": "Executive boss question joining customer accounts with completed orders to produce a revenue leaderboard.",
    "xp": 60,
    "estimated_minutes": 15
  },
  {
    "id": "ecom-L1-096",
    "domain": "ecommerce",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Boss Question #6: Departmental Margin Matrix",
    "stakeholder": {
      "name": "David Kim",
      "role": "Customer Success Lead"
    },
    "request": "Executive Leadership requires an end-of-quarter performance matrix for \"Departmental Margin Matrix\". Join customers and orders to compute each customer's total order count, total revenue generated, and average order value across delivered orders. Return customers with at least 1 delivered order, sorted by total revenue descending, limited to top 10.",
    "context_notes": "Join customers and orders. Filter orders where status = 'delivered'. Group by customer id, first_name, last_name, region. Calculate count of distinct orders, sum of total_amount, and round average order amount to 2 decimals. Order by total_revenue DESC and LIMIT 10.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "GROUP BY",
      "DISTINCT",
      "SUM",
      "AVG",
      "ROUND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "region",
      "orders_placed",
      "total_revenue",
      "avg_order_value"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.region, COUNT(DISTINCT o.id) AS orders_placed, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region ORDER BY total_revenue DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter for o.status = 'delivered'.",
      "Calculate COUNT(DISTINCT o.id), SUM(o.total_amount), and AVG(o.total_amount).",
      "ORDER BY total_revenue DESC LIMIT 10."
    ],
    "solution_explanation": "Executive boss question joining customer accounts with completed orders to produce a revenue leaderboard.",
    "xp": 60,
    "estimated_minutes": 15
  },
  {
    "id": "ecom-L1-097",
    "domain": "ecommerce",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Boss Question #7: Omnichannel Basket Analysis",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "Merchandising Manager"
    },
    "request": "Executive Leadership requires an end-of-quarter performance matrix for \"Omnichannel Basket Analysis\". Join customers and orders to compute each customer's total order count, total revenue generated, and average order value across delivered orders. Return customers with at least 1 delivered order, sorted by total revenue descending, limited to top 10.",
    "context_notes": "Join customers and orders. Filter orders where status = 'delivered'. Group by customer id, first_name, last_name, region. Calculate count of distinct orders, sum of total_amount, and round average order amount to 2 decimals. Order by total_revenue DESC and LIMIT 10.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "GROUP BY",
      "DISTINCT",
      "SUM",
      "AVG",
      "ROUND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "region",
      "orders_placed",
      "total_revenue",
      "avg_order_value"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.region, COUNT(DISTINCT o.id) AS orders_placed, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region ORDER BY total_revenue DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter for o.status = 'delivered'.",
      "Calculate COUNT(DISTINCT o.id), SUM(o.total_amount), and AVG(o.total_amount).",
      "ORDER BY total_revenue DESC LIMIT 10."
    ],
    "solution_explanation": "Executive boss question joining customer accounts with completed orders to produce a revenue leaderboard.",
    "xp": 60,
    "estimated_minutes": 15
  },
  {
    "id": "ecom-L1-098",
    "domain": "ecommerce",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Boss Question #8: Customer Acquisition ROI",
    "stakeholder": {
      "name": "Carlos Mendez",
      "role": "Operations Supervisor"
    },
    "request": "Executive Leadership requires an end-of-quarter performance matrix for \"Customer Acquisition ROI\". Join customers and orders to compute each customer's total order count, total revenue generated, and average order value across delivered orders. Return customers with at least 1 delivered order, sorted by total revenue descending, limited to top 10.",
    "context_notes": "Join customers and orders. Filter orders where status = 'delivered'. Group by customer id, first_name, last_name, region. Calculate count of distinct orders, sum of total_amount, and round average order amount to 2 decimals. Order by total_revenue DESC and LIMIT 10.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "GROUP BY",
      "DISTINCT",
      "SUM",
      "AVG",
      "ROUND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "region",
      "orders_placed",
      "total_revenue",
      "avg_order_value"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.region, COUNT(DISTINCT o.id) AS orders_placed, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region ORDER BY total_revenue DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter for o.status = 'delivered'.",
      "Calculate COUNT(DISTINCT o.id), SUM(o.total_amount), and AVG(o.total_amount).",
      "ORDER BY total_revenue DESC LIMIT 10."
    ],
    "solution_explanation": "Executive boss question joining customer accounts with completed orders to produce a revenue leaderboard.",
    "xp": 60,
    "estimated_minutes": 15
  },
  {
    "id": "ecom-L1-099",
    "domain": "ecommerce",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Boss Question #9: Inventory Turnover Matrix",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "CEO"
    },
    "request": "Executive Leadership requires an end-of-quarter performance matrix for \"Inventory Turnover Matrix\". Join customers and orders to compute each customer's total order count, total revenue generated, and average order value across delivered orders. Return customers with at least 1 delivered order, sorted by total revenue descending, limited to top 10.",
    "context_notes": "Join customers and orders. Filter orders where status = 'delivered'. Group by customer id, first_name, last_name, region. Calculate count of distinct orders, sum of total_amount, and round average order amount to 2 decimals. Order by total_revenue DESC and LIMIT 10.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "GROUP BY",
      "DISTINCT",
      "SUM",
      "AVG",
      "ROUND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "region",
      "orders_placed",
      "total_revenue",
      "avg_order_value"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.region, COUNT(DISTINCT o.id) AS orders_placed, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region ORDER BY total_revenue DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter for o.status = 'delivered'.",
      "Calculate COUNT(DISTINCT o.id), SUM(o.total_amount), and AVG(o.total_amount).",
      "ORDER BY total_revenue DESC LIMIT 10."
    ],
    "solution_explanation": "Executive boss question joining customer accounts with completed orders to produce a revenue leaderboard.",
    "xp": 60,
    "estimated_minutes": 15
  },
  {
    "id": "ecom-L1-100",
    "domain": "ecommerce",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "Boss Question #10: All-Hands Corporate Financial Audit",
    "stakeholder": {
      "name": "Sarah Lin",
      "role": "Head of Sales"
    },
    "request": "Executive Leadership requires an end-of-quarter performance matrix for \"All-Hands Corporate Financial Audit\". Join customers and orders to compute each customer's total order count, total revenue generated, and average order value across delivered orders. Return customers with at least 1 delivered order, sorted by total revenue descending, limited to top 10.",
    "context_notes": "Join customers and orders. Filter orders where status = 'delivered'. Group by customer id, first_name, last_name, region. Calculate count of distinct orders, sum of total_amount, and round average order amount to 2 decimals. Order by total_revenue DESC and LIMIT 10.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "GROUP BY",
      "DISTINCT",
      "SUM",
      "AVG",
      "ROUND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "region",
      "orders_placed",
      "total_revenue",
      "avg_order_value"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.region, COUNT(DISTINCT o.id) AS orders_placed, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region ORDER BY total_revenue DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter for o.status = 'delivered'.",
      "Calculate COUNT(DISTINCT o.id), SUM(o.total_amount), and AVG(o.total_amount).",
      "ORDER BY total_revenue DESC LIMIT 10."
    ],
    "solution_explanation": "Executive boss question joining customer accounts with completed orders to produce a revenue leaderboard.",
    "xp": 60,
    "estimated_minutes": 15
  }
];
