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
    "title": "Electronics Merchandise Catalog",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Ahead of our quarterly investor presentation, we need to inspect our current electronics merchandise catalog. Could you retrieve our active electronics products, showing what each item is called, its retail price, and warehouse stock units, sorted alphabetically by product name?",
    "context_notes": "Join products with categories to filter for 'Electronics'. Show name, price, and stock_quantity.",
    "concepts": [
      "SELECT",
      "WHERE",
      "INNER JOIN",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "price",
      "stock_quantity"
    ],
    "reference_sql": "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Electronics' ORDER BY p.name ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products with categories on category_id = categories.id.",
      "Filter where c.name = 'Electronics'.",
      "Order by p.name ASC."
    ],
    "solution_explanation": "Retrieves all electronics products with price and stock levels.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-002",
    "domain": "ecommerce",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "High-Value Delivered Orders",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Finance is reconciling our highest-value customer transactions from recent operations. Could you pull up all delivered orders that totaled $500 or more, ordered from our largest sales downward?",
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
    "reference_sql": "SELECT id, customer_id, total_amount, order_date FROM orders WHERE status = 'delivered' AND total_amount >= 500.00 ORDER BY total_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter orders on status = 'delivered' and total_amount >= 500.00.",
      "Order by total_amount DESC."
    ],
    "solution_explanation": "Filters delivered orders exceeding $500, sorted by total amount descending.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-003",
    "domain": "ecommerce",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Customer Geographic Distribution",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "We are planning regional fulfillment centers and need to understand where our customer accounts are located across the country. Please count how many shoppers we have registered in each geographic region, showing only regions with at least 2 registered customers, with our largest markets first.",
    "context_notes": "Group customers by region, calculate total customer count, filter using HAVING count >= 2, and sort descending.",
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
      "Use GROUP BY region.",
      "Calculate COUNT(*) AS customer_count.",
      "Filter with HAVING COUNT(*) >= 2 and ORDER BY customer_count DESC."
    ],
    "solution_explanation": "Aggregates customer counts by regional territory.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-004",
    "domain": "ecommerce",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Northern Territory Customer Directory",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Our field marketing representatives are launching a targeted regional promotion in the North territory. Could you pull our registered customer directory for the North region, sorted alphabetically by surname then given name?",
    "context_notes": "Filter customers where region = 'North'. Sort by last_name ASC, first_name ASC.",
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
    "reference_sql": "SELECT first_name, last_name, email FROM customers WHERE region = 'North' ORDER BY last_name ASC, first_name ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter customers WHERE region = 'North'.",
      "Order by last_name ASC, first_name ASC."
    ],
    "solution_explanation": "Surfaces registered customers in the North territory.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-005",
    "domain": "ecommerce",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Apparel Low Stock Verification",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "The warehouse operations team is reviewing replenishment needs for our apparel line before peak season. Could you list all apparel merchandise items that currently have less than 200 units remaining on hand, with lowest stock items shown first?",
    "context_notes": "Join products and categories. Filter for 'Apparel' and stock_quantity < 200. Order by stock_quantity ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "INNER JOIN",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "price",
      "stock_quantity"
    ],
    "reference_sql": "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Apparel' AND p.stock_quantity < 200 ORDER BY p.stock_quantity ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products with categories on category_id = categories.id.",
      "Filter where category is Apparel and stock_quantity < 200.",
      "Order by stock_quantity ASC."
    ],
    "solution_explanation": "Lists low-stock apparel items to trigger replenishment orders.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-006",
    "domain": "ecommerce",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Postal Service Dispatched Consignments",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "USPS regional dispatch sent an inquiry regarding postal parcels sent out from our primary facility. Could you extract all shipments handled by USPS, sorted by shipment identifier?",
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
      "Filter shipments WHERE carrier = 'USPS'.",
      "Order by id ASC."
    ],
    "solution_explanation": "Retrieves postal logistics records for carrier verification.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-007",
    "domain": "ecommerce",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Mid-Tier Merchandise Pricing Audit",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Merchandising is curating a mid-tier promotional collection for our upcoming holiday catalog. Can you pull all products priced between $50 and $130, showing their name, retail price, and acquisition cost, sorted from highest price downward?",
    "context_notes": "Filter products where price BETWEEN 50 AND 130. Sort by price DESC.",
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
    "reference_sql": "SELECT name, price, cost FROM products WHERE price BETWEEN 50.00 AND 130.00 ORDER BY price DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use WHERE price BETWEEN 50.00 AND 130.00.",
      "Order by price DESC."
    ],
    "solution_explanation": "Identifies mid-tier products for promotional bundling.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-008",
    "domain": "ecommerce",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Verified Five-Star Product Reviews",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Marketing wants to feature glowing testimonials on our homepage. Could you retrieve all five-star product reviews from verified buyers, ordered by review date so our freshest feedback appears first?",
    "context_notes": "Filter customer_reviews WHERE rating = 5 and is_verified_purchase = true. Order by review_date DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_id",
      "customer_id",
      "title",
      "review_date"
    ],
    "reference_sql": "SELECT product_id, customer_id, title, review_date FROM customer_reviews WHERE rating = 5 AND is_verified_purchase = true ORDER BY review_date DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter where rating = 5 AND is_verified_purchase = true.",
      "Order by review_date DESC."
    ],
    "solution_explanation": "Surfaces verified top customer reviews for marketing highlights.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-009",
    "domain": "ecommerce",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Active Promotional Discount Codes",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Our checkout team needs to audit active promotional codes currently valid in our store. Could you list all currently active coupons, showing their code, discount percentage, and total redemption limits, sorted by largest discount first?",
    "context_notes": "Filter coupons WHERE is_active = true. Order by discount_percent DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "code",
      "discount_percent",
      "max_uses",
      "current_uses"
    ],
    "reference_sql": "SELECT code, discount_percent, max_uses, current_uses FROM coupons WHERE is_active = true ORDER BY discount_percent DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter WHERE is_active = true.",
      "Order by discount_percent DESC."
    ],
    "solution_explanation": "Lists active coupon campaigns and usage limits.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-010",
    "domain": "ecommerce",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Express Priority Shipments via FedEx",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "We have a service review meeting with FedEx tomorrow morning. Could you retrieve all shipments assigned to FedEx that have already been dispatched, ordered by dispatch time with the newest departures first?",
    "context_notes": "Query shipments WHERE carrier = 'FedEx' AND shipped_at IS NOT NULL. Order by shipped_at DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "order_id",
      "tracking_number",
      "shipped_at"
    ],
    "reference_sql": "SELECT id, order_id, tracking_number, shipped_at FROM shipments WHERE carrier = 'FedEx' AND shipped_at IS NOT NULL ORDER BY shipped_at DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter carrier = 'FedEx' AND shipped_at IS NOT NULL.",
      "Order by shipped_at DESC."
    ],
    "solution_explanation": "Extracts outbound FedEx express parcels for carrier review.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-011",
    "domain": "ecommerce",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Major Regional Distribution Centers",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Logistics is analyzing our regional storage footprint across fulfillment hubs. Could you list all warehouses with a storage capacity of at least 50,000 square feet, showing the facility name, city, state, and capacity, sorted from largest facility downward?",
    "context_notes": "Filter warehouses WHERE capacity_sqft >= 50000. Order by capacity_sqft DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "city",
      "state",
      "capacity_sqft"
    ],
    "reference_sql": "SELECT name, city, state, capacity_sqft FROM warehouses WHERE capacity_sqft >= 50000 ORDER BY capacity_sqft DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter warehouses where capacity_sqft >= 50000.",
      "Order by capacity_sqft DESC."
    ],
    "solution_explanation": "Identifies high-capacity regional distribution facilities.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-012",
    "domain": "ecommerce",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Substantial Refund Requests Audit",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Finance is reviewing customer refund velocity and high-impact payouts. Could you fetch all return claims where the refund amount reached $150 or more, ordered from largest refund downward?",
    "context_notes": "Filter returns WHERE refund_amount >= 150.00. Order by refund_amount DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "order_id",
      "reason",
      "refund_amount",
      "status"
    ],
    "reference_sql": "SELECT id, order_id, reason, refund_amount, status FROM returns WHERE refund_amount >= 150.00 ORDER BY refund_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter returns where refund_amount >= 150.00.",
      "Order by refund_amount DESC."
    ],
    "solution_explanation": "Surfaces large customer refunds for finance reconciliation.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-013",
    "domain": "ecommerce",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Urgent Customer Service Tickets",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Our support team is clearing backlog items for dissatisfied shoppers. Please list all customer support tickets flagged with urgent or high priority that remain unresolved, ordered chronologically with the oldest pending tickets first.",
    "context_notes": "Filter support_tickets WHERE priority IN ('urgent', 'high') AND status <> 'resolved'. Order by created_at ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "category",
      "priority",
      "status",
      "created_at"
    ],
    "reference_sql": "SELECT id, customer_id, category, priority, status, created_at FROM support_tickets WHERE priority IN ('urgent', 'high') AND status <> 'resolved' ORDER BY created_at ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter priority IN ('urgent', 'high') AND status <> 'resolved'.",
      "Order by created_at ASC."
    ],
    "solution_explanation": "Isolates unresolved high-priority customer support escalations.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-014",
    "domain": "ecommerce",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Premier Vetted Wholesale Suppliers",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Supply chain is renegotiating annual supplier contracts. Please bring up all commercial vendors with a quality rating of 4.5 or higher, showing the company name, headquarters country, contact email, and rating, ordered highest rating first.",
    "context_notes": "Filter suppliers WHERE rating >= 4.5. Order by rating DESC, company_name ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "company_name",
      "country",
      "contact_email",
      "rating"
    ],
    "reference_sql": "SELECT company_name, country, contact_email, rating FROM suppliers WHERE rating >= 4.5 ORDER BY rating DESC, company_name ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter suppliers where rating >= 4.5.",
      "Order by rating DESC, company_name ASC."
    ],
    "solution_explanation": "Lists top-rated wholesale manufacturing partners.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-015",
    "domain": "ecommerce",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Luxury and Premium Brand Partners",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Brand strategy wants to review our high-end manufacturing labels. Could you extract all brand partners classified under the luxury or premium tier, ordered by brand name alphabetically?",
    "context_notes": "Filter brands WHERE tier IN ('luxury', 'premium'). Order by name ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "country_of_origin",
      "tier"
    ],
    "reference_sql": "SELECT name, country_of_origin, tier FROM brands WHERE tier IN ('luxury', 'premium') ORDER BY name ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter brands where tier IN ('luxury', 'premium').",
      "Order by name ASC."
    ],
    "solution_explanation": "Displays premium and luxury brand catalog affiliations.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-016",
    "domain": "ecommerce",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Multi-Unit Line Item Purchases",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Sales is auditing multi-unit purchasing habits across customer checkout baskets. Could you pull all order line items where a shopper purchased 3 units of an item in a single order line, ordered by unit price descending?",
    "context_notes": "Filter order_items WHERE quantity = 3. Order by unit_price DESC, order_id ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "order_id",
      "product_id",
      "quantity",
      "unit_price"
    ],
    "reference_sql": "SELECT order_id, product_id, quantity, unit_price FROM order_items WHERE quantity = 3 ORDER BY unit_price DESC, order_id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter order_items where quantity = 3.",
      "Order by unit_price DESC, order_id ASC."
    ],
    "solution_explanation": "Surfaces multi-unit order items indicative of commercial purchasing.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-017",
    "domain": "ecommerce",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Pending Checkout Orders in Processing",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Warehouse dispatch is checking unfulfilled customer baskets. Can you retrieve all orders that currently hold a pending status, sorted by transaction timestamp with the earliest orders first?",
    "context_notes": "Filter orders WHERE status = 'pending'. Order by order_date ASC.",
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
    "reference_sql": "SELECT id, customer_id, total_amount, order_date FROM orders WHERE status = 'pending' ORDER BY order_date ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter orders where status = 'pending'.",
      "Order by order_date ASC."
    ],
    "solution_explanation": "Finds orders currently waiting in fulfillment processing.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-018",
    "domain": "ecommerce",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Critically Depleted Warehouse Stock",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "We need an immediate stockout prevention sweep. Pull all catalog merchandise items that have less than 50 units remaining across our shelves, showing product title, retail price, and on-hand units, ordered lowest inventory first.",
    "context_notes": "Filter products WHERE stock_quantity < 50. Order by stock_quantity ASC, name ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "price",
      "stock_quantity"
    ],
    "reference_sql": "SELECT name, price, stock_quantity FROM products WHERE stock_quantity < 50 ORDER BY stock_quantity ASC, name ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter products where stock_quantity < 50.",
      "Order by stock_quantity ASC, name ASC."
    ],
    "solution_explanation": "Identifies near-depleted stock items to trigger supplier reorders.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-019",
    "domain": "ecommerce",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Returned Customer Transactions",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Customer service is tracking order reversal rates. Could you extract all orders that resulted in a returned status, sorted with our highest-value returned transactions first?",
    "context_notes": "Filter orders WHERE status = 'returned'. Order by total_amount DESC.",
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
    "reference_sql": "SELECT id, customer_id, total_amount, order_date FROM orders WHERE status = 'returned' ORDER BY total_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter orders where status = 'returned'.",
      "Order by total_amount DESC."
    ],
    "solution_explanation": "Tracks reversed transactions to isolate merchandise dissatisfaction.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-020",
    "domain": "ecommerce",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Defective Merchandise Return Reports",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Quality control is inspecting items that failed after delivery. Pull all customer return records where the stated reason mentions defective merchandise, ordered by refund amount descending.",
    "context_notes": "Filter returns WHERE reason LIKE '%defect%'. Order by refund_amount DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "LIKE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "order_id",
      "reason",
      "refund_amount"
    ],
    "reference_sql": "SELECT id, order_id, reason, refund_amount FROM returns WHERE reason LIKE '%defect%' ORDER BY refund_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter returns where reason LIKE '%defect%'.",
      "Order by refund_amount DESC."
    ],
    "solution_explanation": "Identifies defective merchandise return complaints.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-021",
    "domain": "ecommerce",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "California and Texas Logistics Hubs",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "To prepare for peak shipping volume rerouting, show me all distribution warehouses located in California and Texas, ordered by storage capacity descending.",
    "context_notes": "Filter warehouses WHERE state IN ('CA', 'TX'). Order by capacity_sqft DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "city",
      "state",
      "capacity_sqft"
    ],
    "reference_sql": "SELECT name, city, state, capacity_sqft FROM warehouses WHERE state IN ('CA', 'TX') ORDER BY capacity_sqft DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter warehouses where state IN ('CA', 'TX').",
      "Order by capacity_sqft DESC."
    ],
    "solution_explanation": "Surfaces major fulfillment facilities in California and Texas.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-022",
    "domain": "ecommerce",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "High-Discount Promotional Campaigns",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Our marketing team wants to review our most aggressive discount offers. List all coupons offering a discount of 20% or greater, ordered from highest discount percentage downward.",
    "context_notes": "Filter coupons WHERE discount_percent >= 20. Order by discount_percent DESC, code ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "code",
      "discount_percent",
      "is_active"
    ],
    "reference_sql": "SELECT code, discount_percent, is_active FROM coupons WHERE discount_percent >= 20 ORDER BY discount_percent DESC, code ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter coupons where discount_percent >= 20.",
      "Order by discount_percent DESC, code ASC."
    ],
    "solution_explanation": "Lists promotional discount vouchers with substantial price cuts.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-023",
    "domain": "ecommerce",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Parcel Shipments Handled by UPS",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "UPS logistics dispatch is auditing delivery manifests. Could you pull up all shipments handled by UPS that have been successfully delivered, sorted by delivery time with recent deliveries first?",
    "context_notes": "Filter shipments WHERE carrier = 'UPS' AND delivered_at IS NOT NULL. Order by delivered_at DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "order_id",
      "tracking_number",
      "delivered_at"
    ],
    "reference_sql": "SELECT id, order_id, tracking_number, delivered_at FROM shipments WHERE carrier = 'UPS' AND delivered_at IS NOT NULL ORDER BY delivered_at DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter carrier = 'UPS' AND delivered_at IS NOT NULL.",
      "Order by delivered_at DESC."
    ],
    "solution_explanation": "Reviews completed parcel handoffs for UPS shipments.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-024",
    "domain": "ecommerce",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Western Territory Customer Accounts",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Our West Coast regional sales director is preparing outreach to local shoppers. Retrieve our registered customer accounts from the West region, sorted alphabetically by surname.",
    "context_notes": "Filter customers WHERE region = 'West'. Order by last_name ASC, first_name ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email",
      "created_at"
    ],
    "reference_sql": "SELECT first_name, last_name, email, created_at FROM customers WHERE region = 'West' ORDER BY last_name ASC, first_name ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter customers where region = 'West'.",
      "Order by last_name ASC, first_name ASC."
    ],
    "solution_explanation": "Retrieves customer roster for the Western region.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-025",
    "domain": "ecommerce",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Critical Open Billing Support Tickets",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Our billing support team needs to address unresolved payment inquiries. Extract all support tickets under the billing category that remain open, sorted with our earliest unresolved issues first.",
    "context_notes": "Filter support_tickets WHERE category = 'billing' AND status = 'open'. Order by created_at ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "priority",
      "created_at"
    ],
    "reference_sql": "SELECT id, customer_id, priority, created_at FROM support_tickets WHERE category = 'billing' AND status = 'open' ORDER BY created_at ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter category = 'billing' AND status = 'open'.",
      "Order by created_at ASC."
    ],
    "solution_explanation": "Surfaces unresolved customer billing disputes.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-026",
    "domain": "ecommerce",
    "level": 1,
    "order": 26,
    "difficulty": "warm-up",
    "title": "International Supply Chain Partners",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Customs and tariffs compliance is compiling a manifest of foreign manufacturing partners. Show all suppliers based outside the USA, ordered by vendor reliability score descending.",
    "context_notes": "Filter suppliers WHERE country <> 'USA'. Order by rating DESC, company_name ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "company_name",
      "country",
      "rating"
    ],
    "reference_sql": "SELECT company_name, country, rating FROM suppliers WHERE country <> 'USA' ORDER BY rating DESC, company_name ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter suppliers where country <> 'USA'.",
      "Order by rating DESC, company_name ASC."
    ],
    "solution_explanation": "Identifies overseas manufacturers subject to international freight customs.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-027",
    "domain": "ecommerce",
    "level": 1,
    "order": 27,
    "difficulty": "warm-up",
    "title": "Budget-Friendly Essential Merchandise",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "To support an introductory marketing campaign, pull all catalog products priced under $30.00, sorted from lowest price upward so shoppers see our most affordable entry points.",
    "context_notes": "Filter products WHERE price < 30.00. Order by price ASC, name ASC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "price",
      "stock_quantity"
    ],
    "reference_sql": "SELECT name, price, stock_quantity FROM products WHERE price < 30.00 ORDER BY price ASC, name ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter products where price < 30.00.",
      "Order by price ASC, name ASC."
    ],
    "solution_explanation": "Surfaces entry-level price point merchandise.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-028",
    "domain": "ecommerce",
    "level": 1,
    "order": 28,
    "difficulty": "warm-up",
    "title": "Corporate Department Leadership Directory",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Executive leadership is updating our internal corporate org chart. Retrieve all company operational departments with their designated department head, ordered alphabetically by department title.",
    "context_notes": "Query departments table. Order by name ASC.",
    "concepts": [
      "SELECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "head_name"
    ],
    "reference_sql": "SELECT name, head_name FROM departments ORDER BY name ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Select name, head_name from departments.",
      "Order by name ASC."
    ],
    "solution_explanation": "Provides executive operating department roster.",
    "xp": 10,
    "estimated_minutes": 3
  },
  {
    "id": "ecom-L1-029",
    "domain": "ecommerce",
    "level": 1,
    "order": 29,
    "difficulty": "warm-up",
    "title": "Moderate Customer Review Feedback",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Our customer experience team wants to review neutral customer feedback to identify opportunities for delight. Pull all product reviews where the customer left a 3-star rating, ordered by review timestamp with newest reviews first.",
    "context_notes": "Filter customer_reviews WHERE rating = 3. Order by review_date DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_id",
      "customer_id",
      "rating",
      "title",
      "review_date"
    ],
    "reference_sql": "SELECT product_id, customer_id, rating, title, review_date FROM customer_reviews WHERE rating = 3 ORDER BY review_date DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter customer_reviews where rating = 3.",
      "Order by review_date DESC."
    ],
    "solution_explanation": "Isolates neutral 3-star customer reviews for experience improvements.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-030",
    "domain": "ecommerce",
    "level": 1,
    "order": 30,
    "difficulty": "warm-up",
    "title": "Low-Cost Shipping Deliveries",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Sales is evaluating the popularity of our standard shipping promotion. Retrieve all completed orders where the shipping fee was under $5.00, ordered from largest order value downward.",
    "context_notes": "Filter orders WHERE shipping_fee < 5.00 AND status = 'delivered'. Order by total_amount DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "customer_id",
      "total_amount",
      "shipping_fee"
    ],
    "reference_sql": "SELECT id, customer_id, total_amount, shipping_fee FROM orders WHERE shipping_fee < 5.00 AND status = 'delivered' ORDER BY total_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter orders where shipping_fee < 5.00 and status = 'delivered'.",
      "Order by total_amount DESC."
    ],
    "solution_explanation": "Surfaces orders qualifying for low-cost delivery promotion.",
    "xp": 10,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-031",
    "domain": "ecommerce",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "System-wide Order Status Breakdown",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Operations is reviewing our order processing pipeline. Could you aggregate all orders by their current fulfillment status, showing how many orders are in each status and the average shipping fee charged, sorted with our highest volume statuses first?",
    "context_notes": "Group orders by status, count orders, round average shipping fee to 2 decimals, order by order_count DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
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
    "reference_sql": "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders GROUP BY status ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by status.",
      "Calculate COUNT(*) AS order_count and ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee.",
      "Order by order_count DESC."
    ],
    "solution_explanation": "Breaks down orders across lifecycle stages with average shipping cost.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-032",
    "domain": "ecommerce",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "Logistics Carrier Parcel Workload",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Logistics is balancing carrier quotas across our freight partners. Please calculate the total number of shipments assigned to each carrier, ordered from our busiest carrier downward.",
    "context_notes": "Group shipments by carrier and calculate shipment count. Order by shipment_count DESC.",
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
      "Group by carrier.",
      "Calculate COUNT(*) AS shipment_count.",
      "Order by shipment_count DESC."
    ],
    "solution_explanation": "Measures shipment allocation across logistics partners.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-033",
    "domain": "ecommerce",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "Merchandise Pricing by Category",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Merchandising is analyzing price tiering across our store categories. Group our catalog by category to compute the total product count, minimum retail price, maximum retail price, and average price per category, sorted with our highest average prices first.",
    "context_notes": "Join categories and products. Group by category name. Compute count, min price, max price, and round avg price to 2 decimals. Order by avg_price DESC.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "COUNT",
      "MIN",
      "MAX",
      "AVG",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_name",
      "product_count",
      "min_price",
      "max_price",
      "avg_price"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(p.id) AS product_count, MIN(p.price) AS min_price, MAX(p.price) AS max_price, ROUND(AVG(p.price), 2) AS avg_price FROM categories c JOIN products p ON c.id = p.category_id GROUP BY c.name ORDER BY avg_price DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories and products on category_id.",
      "Group by c.name.",
      "Compute COUNT, MIN, MAX, and AVG.",
      "Order by avg_price DESC."
    ],
    "solution_explanation": "Profiles catalog pricing distributions across merchandise categories.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-034",
    "domain": "ecommerce",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "Regional Delivered Sales & Order Volume",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Executive management needs regional sales revenue numbers for board reporting. Link customers and delivered orders to calculate total completed order count and total revenue generated for each geographic region, ordered by revenue descending.",
    "context_notes": "Join customers and orders. Filter where status = 'delivered'. Group by region. Calculate order_count and sum total_amount. Order by total_revenue DESC.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "region",
      "order_count",
      "total_revenue"
    ],
    "reference_sql": "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.region ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter where status = 'delivered'.",
      "Group by c.region and order by total_revenue DESC."
    ],
    "solution_explanation": "Analyzes regional revenue contributions across delivered transactions.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-035",
    "domain": "ecommerce",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "Warehouse Storage Capacity by State",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Real estate operations is reviewing regional warehouse footprints. Summarize our physical distribution centers by state, displaying the number of facilities and combined square footage in each state, ordered by total capacity descending.",
    "context_notes": "Group warehouses by state. Compute warehouse_count and sum capacity_sqft. Order by total_capacity DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "state",
      "warehouse_count",
      "total_capacity"
    ],
    "reference_sql": "SELECT state, COUNT(*) AS warehouse_count, SUM(capacity_sqft) AS total_capacity FROM warehouses GROUP BY state ORDER BY total_capacity DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by state.",
      "Calculate COUNT(*) AS warehouse_count and SUM(capacity_sqft) AS total_capacity.",
      "Order by total_capacity DESC."
    ],
    "solution_explanation": "Summarizes physical storage capacity across regional states.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-036",
    "domain": "ecommerce",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "Customer Return Reasons Breakdown",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Customer success is conducting a post-mortem on return claims. Group customer returns by their stated reason, computing the total number of returns and total dollars refunded, ordered with our most common return reasons first.",
    "context_notes": "Group returns by reason. Calculate return_count and sum refund_amount. Order by return_count DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "reason",
      "return_count",
      "total_refunded"
    ],
    "reference_sql": "SELECT reason, COUNT(*) AS return_count, ROUND(SUM(refund_amount), 2) AS total_refunded FROM returns GROUP BY reason ORDER BY return_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by reason.",
      "Calculate COUNT(*) and SUM(refund_amount).",
      "Order by return_count DESC."
    ],
    "solution_explanation": "Breaks down return root causes and associated refund liabilities.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-037",
    "domain": "ecommerce",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "Customer Review Ratings per Product",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Merchandising wants to identify which products are generating the highest customer satisfaction. Join products and customer reviews to compute the total review count and average rating for each reviewed item, showing only products with at least 2 reviews, sorted highest rating first.",
    "context_notes": "Join products and customer_reviews. Group by product id and name. Filter with HAVING COUNT >= 2. Order by avg_rating DESC.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "review_count",
      "avg_rating"
    ],
    "reference_sql": "SELECT p.name AS product_name, COUNT(r.id) AS review_count, ROUND(AVG(r.rating), 2) AS avg_rating FROM products p JOIN customer_reviews r ON p.id = r.product_id GROUP BY p.id, p.name HAVING COUNT(r.id) >= 2 ORDER BY avg_rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products with customer_reviews on p.id = r.product_id.",
      "Group by p.id, p.name.",
      "Filter HAVING COUNT(r.id) >= 2 and order by avg_rating DESC."
    ],
    "solution_explanation": "Measures customer satisfaction ratings across catalog products.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-038",
    "domain": "ecommerce",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "Support Ticket Volume by Category",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Support staffing needs to forecast staffing requirements across help desk queues. Group customer support tickets by category to display ticket volume, ordered from our busiest support queue downward.",
    "context_notes": "Group support_tickets by category and compute count. Order by ticket_count DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category",
      "ticket_count"
    ],
    "reference_sql": "SELECT category, COUNT(*) AS ticket_count FROM support_tickets GROUP BY category ORDER BY ticket_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by category.",
      "Calculate COUNT(*) AS ticket_count.",
      "Order by ticket_count DESC."
    ],
    "solution_explanation": "Quantifies customer support workload across operational categories.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-039",
    "domain": "ecommerce",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "Brand Distribution Across Catalog Tiers",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Brand partnerships is reviewing our retail positioning across marketplace tiers. Count how many brands belong to each brand tier, ordered with our most prevalent tier first.",
    "context_notes": "Group brands by tier and count brands. Order by brand_count DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "tier",
      "brand_count"
    ],
    "reference_sql": "SELECT tier, COUNT(*) AS brand_count FROM brands GROUP BY tier ORDER BY brand_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by tier.",
      "Calculate COUNT(*) AS brand_count.",
      "Order by brand_count DESC."
    ],
    "solution_explanation": "Shows marketplace brand representation across positioning tiers.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-040",
    "domain": "ecommerce",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "Wholesale Supplier Reliability by Country",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Supply chain resilience is evaluating international manufacturing risk. Group suppliers by headquarters country to display supplier count and average vendor rating, ordered highest average rating first.",
    "context_notes": "Group suppliers by country. Calculate count and avg rating. Order by avg_rating DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "AVG",
      "ORDER BY"
    ],
    "expected_columns": [
      "country",
      "supplier_count",
      "avg_rating"
    ],
    "reference_sql": "SELECT country, COUNT(*) AS supplier_count, ROUND(AVG(rating), 2) AS avg_rating FROM suppliers GROUP BY country ORDER BY avg_rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by country.",
      "Calculate COUNT(*) and ROUND(AVG(rating), 2).",
      "Order by avg_rating DESC."
    ],
    "solution_explanation": "Benchmarks vendor performance across geographic jurisdictions.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-041",
    "domain": "ecommerce",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "Total Units Ordered per Product SKU",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Sales wants to rank our best-selling merchandise by volume. Join products and order line items to calculate the total units sold for each product, showing only products with at least 10 units sold, ordered from highest unit sales downward.",
    "context_notes": "Join products and order_items. Group by product id and name. Filter with HAVING SUM(quantity) >= 10. Order by total_units_sold DESC.",
    "concepts": [
      "SELECT",
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
    "reference_sql": "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 10 ORDER BY total_units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and order_items on p.id = oi.product_id.",
      "Group by p.id, p.name.",
      "Filter with HAVING SUM(oi.quantity) >= 10 and order descending."
    ],
    "solution_explanation": "Ranks top product SKUs by aggregate sales volume.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-042",
    "domain": "ecommerce",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "Completed Purchases per Customer",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Loyalty marketing is identifying repeat buyers who have placed multiple successful orders. Join customers and orders to calculate how many delivered orders each customer has placed, showing only shoppers with at least 3 delivered orders, sorted from highest order frequency downward.",
    "context_notes": "Join customers and orders. Filter where status = 'delivered'. Group by customer id, first_name, last_name. Filter HAVING count >= 3. Order by delivered_orders DESC.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "delivered_orders"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, COUNT(o.id) AS delivered_orders FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name HAVING COUNT(o.id) >= 3 ORDER BY delivered_orders DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter where status = 'delivered'.",
      "Group by c.id, c.first_name, c.last_name HAVING COUNT(o.id) >= 3."
    ],
    "solution_explanation": "Surfaces loyal repeat buyers with high completed transaction frequency.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-043",
    "domain": "ecommerce",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "Promotional Coupon Redemption Rates",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Growth marketing is evaluating coupon voucher engagement. For all active coupons, calculate how many uses remain available before hitting the campaign ceiling, sorted with the most heavily redeemed coupons first.",
    "context_notes": "Query coupons WHERE is_active = true. Calculate (max_uses - current_uses) as remaining_uses. Order by current_uses DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "code",
      "discount_percent",
      "current_uses",
      "remaining_uses"
    ],
    "reference_sql": "SELECT code, discount_percent, current_uses, (max_uses - current_uses) AS remaining_uses FROM coupons WHERE is_active = true ORDER BY current_uses DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter coupons where is_active = true.",
      "Calculate (max_uses - current_uses) AS remaining_uses.",
      "Order by current_uses DESC."
    ],
    "solution_explanation": "Analyzes coupon usage and remaining promotional headroom.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-044",
    "domain": "ecommerce",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "Departmental Product Portfolio Size",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Executive leadership is assessing the breadth of merchandise curated by each internal department. Link departments, categories, and products to calculate total catalog products managed by each department, ordered from largest department downward.",
    "context_notes": "Join departments, categories, and products. Group by department name. Calculate product count. Order by total_products DESC.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "3-WAY JOIN",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "total_products"
    ],
    "reference_sql": "SELECT d.name AS department_name, COUNT(p.id) AS total_products FROM departments d JOIN categories c ON d.id = c.department_id JOIN products p ON c.id = p.category_id GROUP BY d.id, d.name ORDER BY total_products DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments to categories, then categories to products.",
      "Group by d.id, d.name.",
      "Order by total_products DESC."
    ],
    "solution_explanation": "Quantifies product portfolio scope across corporate operating departments.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-045",
    "domain": "ecommerce",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "High Basket Size Customer Orders",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Packaging operations needs to know which customer orders contain the largest physical quantities of goods. Join orders and order line items to calculate the total units in each order, showing only orders with at least 8 items, ordered from highest unit count downward.",
    "context_notes": "Join orders and order_items. Group by order_id, order_date, status. Filter HAVING SUM(quantity) >= 8. Order by total_items DESC.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "order_id",
      "status",
      "total_items"
    ],
    "reference_sql": "SELECT oi.order_id, o.status, SUM(oi.quantity) AS total_items FROM order_items oi JOIN orders o ON oi.order_id = o.id GROUP BY oi.order_id, o.status HAVING SUM(oi.quantity) >= 8 ORDER BY total_items DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join order_items and orders on oi.order_id = o.id.",
      "Group by oi.order_id, o.status.",
      "Filter HAVING SUM(oi.quantity) >= 8 and order descending."
    ],
    "solution_explanation": "Surfaces large multi-item orders requiring heavy freight packaging.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-046",
    "domain": "ecommerce",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "Average Customer Spend by Regional Market",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Pricing strategy is benchmarking consumer purchasing power across regional territories. Join customers and orders to calculate the average transaction value per completed order in each region, ordered with our highest-spending regions first.",
    "context_notes": "Join customers and orders. Filter where status = 'delivered'. Group by region. Compute average total_amount rounded to 2 decimals. Order by avg_order_value DESC.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "region",
      "avg_order_value"
    ],
    "reference_sql": "SELECT c.region, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.region ORDER BY avg_order_value DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter where status = 'delivered'.",
      "Group by region and order by avg_order_value DESC."
    ],
    "solution_explanation": "Calculates regional purchasing power across delivered transactions.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-047",
    "domain": "ecommerce",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "Completed Deliveries Breakdown by Carrier",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Carrier logistics review: For each carrier partner, count how many parcels have been successfully marked as delivered, ordered by total delivered volume descending.",
    "context_notes": "Filter shipments WHERE delivered_at IS NOT NULL. Group by carrier. Calculate delivered_count. Order by delivered_count DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "IS NOT NULL",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "delivered_count"
    ],
    "reference_sql": "SELECT carrier, COUNT(*) AS delivered_count FROM shipments WHERE delivered_at IS NOT NULL GROUP BY carrier ORDER BY delivered_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter where delivered_at IS NOT NULL.",
      "Group by carrier and calculate COUNT(*).",
      "Order by delivered_count DESC."
    ],
    "solution_explanation": "Tracks completed delivery throughput across freight carrier services.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-048",
    "domain": "ecommerce",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "Customer Returns by Processing Status",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "The customer operations desk is managing customer claims workflow. Group all customer return requests by their processing status, calculating total returns and total refund value, ordered from highest claim count downward.",
    "context_notes": "Group returns by status. Calculate return_count and sum refund_amount. Order by return_count DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "SUM",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "return_count",
      "total_refund_amount"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS return_count, ROUND(SUM(refund_amount), 2) AS total_refund_amount FROM returns GROUP BY status ORDER BY return_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by status.",
      "Calculate COUNT(*) and ROUND(SUM(refund_amount), 2).",
      "Order by return_count DESC."
    ],
    "solution_explanation": "Monitors pipeline velocity across return approval stages.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-049",
    "domain": "ecommerce",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "Support Escalations Across Priority Tiers",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Customer service management is reviewing incoming ticket severity. Group our support ticket records by priority tier to calculate ticket counts and unresolved tickets still open, ordered by priority count descending.",
    "context_notes": "Group support_tickets by priority. Calculate total tickets and count where status = 'open'. Order by total_tickets DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "priority",
      "total_tickets"
    ],
    "reference_sql": "SELECT priority, COUNT(*) AS total_tickets FROM support_tickets GROUP BY priority ORDER BY total_tickets DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by priority.",
      "Calculate COUNT(*) AS total_tickets.",
      "Order by total_tickets DESC."
    ],
    "solution_explanation": "Profiles customer ticket inflow by operational severity.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-050",
    "domain": "ecommerce",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "Average Profit Margin Spread by Category",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Corporate finance needs a profitability scan across merchandise sectors. For each category, join products to compute the average unit gross profit (retail price minus cost), sorted from our most profitable product lines downward.",
    "context_notes": "Join categories and products. Group by category name. Compute ROUND(AVG(price - cost), 2). Order by avg_unit_profit DESC.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "ARITHMETIC",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_name",
      "avg_unit_profit"
    ],
    "reference_sql": "SELECT c.name AS category_name, ROUND(AVG(p.price - p.cost), 2) AS avg_unit_profit FROM categories c JOIN products p ON c.id = p.category_id GROUP BY c.name ORDER BY avg_unit_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories and products on category_id.",
      "Calculate AVG(price - cost) rounded to 2 decimals.",
      "Order by avg_unit_profit DESC."
    ],
    "solution_explanation": "Evaluates baseline product margin profitability by category.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-051",
    "domain": "ecommerce",
    "level": 1,
    "order": 51,
    "difficulty": "core",
    "title": "Total Revenue Generated per Product",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Sales leadership is evaluating SKU revenue contributions. Join products and order line items to calculate the total dollar revenue generated by each product, showing only products that have generated over $500 in total sales, ordered highest revenue first.",
    "context_notes": "Join products and order_items. Group by product id and name. Compute SUM(quantity * unit_price). Filter HAVING revenue > 500. Order by total_revenue DESC.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "total_revenue"
    ],
    "reference_sql": "SELECT p.name AS product_name, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity * oi.unit_price) > 500.00 ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and order_items on p.id = oi.product_id.",
      "Calculate SUM(quantity * unit_price).",
      "Filter HAVING SUM > 500.00 and order descending."
    ],
    "solution_explanation": "Identifies top revenue-producing product items.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-052",
    "domain": "ecommerce",
    "level": 1,
    "order": 52,
    "difficulty": "core",
    "title": "Wholesale Supplier Product Catalog Footprint",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Procurement is evaluating single-supplier dependency risks. Group inventory records by warehouse to find the total units of inventory stored in each warehouse facility, ordered from largest stored quantity downward.",
    "context_notes": "Group inventory by warehouse_id. Calculate sum quantity_on_hand. Order by total_stored_units DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "warehouse_id",
      "total_stored_units"
    ],
    "reference_sql": "SELECT warehouse_id, SUM(quantity_on_hand) AS total_stored_units FROM inventory GROUP BY warehouse_id ORDER BY total_stored_units DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by warehouse_id.",
      "Calculate SUM(quantity_on_hand) AS total_stored_units.",
      "Order by total_stored_units DESC."
    ],
    "solution_explanation": "Tracks inventory physical concentration across fulfillment hubs.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-053",
    "domain": "ecommerce",
    "level": 1,
    "order": 53,
    "difficulty": "core",
    "title": "Reserved Stock vs Physical Inventory",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Warehouse logistics is evaluating committed stock buffers. Group inventory records by warehouse to calculate total available stock on hand and total stock reserved for unfulfilled orders, ordered by warehouse identifier.",
    "context_notes": "Group inventory by warehouse_id. Calculate SUM(quantity_on_hand) and SUM(reserved_quantity). Order by warehouse_id ASC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "warehouse_id",
      "total_on_hand",
      "total_reserved"
    ],
    "reference_sql": "SELECT warehouse_id, SUM(quantity_on_hand) AS total_on_hand, SUM(reserved_quantity) AS total_reserved FROM inventory GROUP BY warehouse_id ORDER BY warehouse_id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by warehouse_id.",
      "Sum quantity_on_hand and reserved_quantity.",
      "Order by warehouse_id ASC."
    ],
    "solution_explanation": "Audits allocated vs unallocated warehouse inventory.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-054",
    "domain": "ecommerce",
    "level": 1,
    "order": 54,
    "difficulty": "core",
    "title": "Central Territory Order Performance",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "The regional sales manager for Central wants to review completed delivery volume and sales dollars. Link customers and delivered orders in the Central region, calculating completed order count and total sales revenue.",
    "context_notes": "Join customers and orders where region = 'Central' and status = 'delivered'. Group by region.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "SUM"
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
      "Join customers and orders on c.id = o.customer_id.",
      "Filter where region = 'Central' and status = 'delivered'.",
      "Group by region."
    ],
    "solution_explanation": "Summarizes operational sales in the Central territory.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-055",
    "domain": "ecommerce",
    "level": 1,
    "order": 55,
    "difficulty": "core",
    "title": "High-Volume Delivery Months",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Finance is reviewing quarterly sales momentum. Count how many completed orders were placed in each status category with an order value of at least $100, ordered from highest volume status downward.",
    "context_notes": "Filter orders WHERE total_amount >= 100.00. Group by status. Calculate order_count. Order by order_count DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "order_count"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS order_count FROM orders WHERE total_amount >= 100.00 GROUP BY status ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter orders where total_amount >= 100.00.",
      "Group by status and count orders.",
      "Order by order_count DESC."
    ],
    "solution_explanation": "Surfaces distribution of triple-digit transactions across order statuses.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-056",
    "domain": "ecommerce",
    "level": 1,
    "order": 56,
    "difficulty": "core",
    "title": "Verified Customer Feedback by Star Rating",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Product quality is reviewing authentic customer feedback ratings. Group verified buyer reviews by their numerical star rating, calculating how many reviews each star level received, ordered from 5 stars downward.",
    "context_notes": "Filter customer_reviews WHERE is_verified_purchase = true. Group by rating. Calculate review_count. Order by rating DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "rating",
      "review_count"
    ],
    "reference_sql": "SELECT rating, COUNT(*) AS review_count FROM customer_reviews WHERE is_verified_purchase = true GROUP BY rating ORDER BY rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter where is_verified_purchase = true.",
      "Group by rating and count reviews.",
      "Order by rating DESC."
    ],
    "solution_explanation": "Profiles customer review distribution among verified purchasers.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-057",
    "domain": "ecommerce",
    "level": 1,
    "order": 57,
    "difficulty": "core",
    "title": "Average Refund Amount per Return Reason",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Finance is auditing warranty and return claims. Group return claims by reason to determine the average dollar amount refunded per claim, ordered from highest average refund downward.",
    "context_notes": "Group returns by reason. Compute ROUND(AVG(refund_amount), 2). Order by avg_refund DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "reason",
      "avg_refund"
    ],
    "reference_sql": "SELECT reason, ROUND(AVG(refund_amount), 2) AS avg_refund FROM returns GROUP BY reason ORDER BY avg_refund DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by reason.",
      "Calculate ROUND(AVG(refund_amount), 2) AS avg_refund.",
      "Order by avg_refund DESC."
    ],
    "solution_explanation": "Evaluates average financial liability per return category.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-058",
    "domain": "ecommerce",
    "level": 1,
    "order": 58,
    "difficulty": "core",
    "title": "Multiple Support Inquiries by Customer",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Customer success is identifying high-friction accounts experiencing multiple operational issues. Group support tickets by customer to find any customers who have submitted at least 2 separate support tickets, ordered by ticket volume descending.",
    "context_notes": "Group support_tickets by customer_id. Filter with HAVING count >= 2. Order by ticket_count DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "customer_id",
      "ticket_count"
    ],
    "reference_sql": "SELECT customer_id, COUNT(*) AS ticket_count FROM support_tickets GROUP BY customer_id HAVING COUNT(*) >= 2 ORDER BY ticket_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by customer_id.",
      "Filter HAVING COUNT(*) >= 2.",
      "Order by ticket_count DESC."
    ],
    "solution_explanation": "Identifies frequent support contact customers requiring proactive outreach.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-059",
    "domain": "ecommerce",
    "level": 1,
    "order": 59,
    "difficulty": "core",
    "title": "Domestic vs International Supplier Counts",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Logistics is analyzing domestic supply chain resilience. Group suppliers by origin classification — categorizing suppliers in the USA as Domestic and all others as International — showing supplier count in each group, ordered by count descending.",
    "context_notes": "Group suppliers using CASE WHEN country = 'USA' THEN 'Domestic' ELSE 'International' END. Count suppliers. Order by supplier_count DESC.",
    "concepts": [
      "SELECT",
      "CASE WHEN",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "supplier_origin",
      "supplier_count"
    ],
    "reference_sql": "SELECT CASE WHEN country = 'USA' THEN 'Domestic' ELSE 'International' END AS supplier_origin, COUNT(*) AS supplier_count FROM suppliers GROUP BY CASE WHEN country = 'USA' THEN 'Domestic' ELSE 'International' END ORDER BY supplier_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use CASE WHEN country = 'USA' THEN 'Domestic' ELSE 'International' END.",
      "Group by the case expression.",
      "Order by supplier_count DESC."
    ],
    "solution_explanation": "Segments suppliers into domestic vs offshore manufacturing cohorts.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-060",
    "domain": "ecommerce",
    "level": 1,
    "order": 60,
    "difficulty": "core",
    "title": "Low-Stock SKU Concentration by Category",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Inventory replenishment needs to know which categories suffer from low inventory levels. For all products with under 100 units in stock, join categories and calculate the count of low-stock items in each category, ordered highest count first.",
    "context_notes": "Join categories and products WHERE stock_quantity < 100. Group by category name. Calculate count. Order by low_stock_items DESC.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_name",
      "low_stock_items"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(p.id) AS low_stock_items FROM categories c JOIN products p ON c.id = p.category_id WHERE p.stock_quantity < 100 GROUP BY c.name ORDER BY low_stock_items DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories and products.",
      "Filter where stock_quantity < 100.",
      "Group by category name and order by count descending."
    ],
    "solution_explanation": "Isolates categories vulnerable to imminent stockout events.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-061",
    "domain": "ecommerce",
    "level": 1,
    "order": 61,
    "difficulty": "core",
    "title": "Total Billed Revenue by Order Status",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Executive leadership is auditing gross financial ledger flows. Calculate the total billed transaction dollars across each order status, ordered with our largest dollar volume categories first.",
    "context_notes": "Group orders by status. Sum total_amount rounded to 2 decimals. Order by total_billed DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "total_billed"
    ],
    "reference_sql": "SELECT status, ROUND(SUM(total_amount), 2) AS total_billed FROM orders GROUP BY status ORDER BY total_billed DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by status.",
      "Calculate ROUND(SUM(total_amount), 2) AS total_billed.",
      "Order by total_billed DESC."
    ],
    "solution_explanation": "Provides high-level ledger totals across order fulfillment states.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-062",
    "domain": "ecommerce",
    "level": 1,
    "order": 62,
    "difficulty": "core",
    "title": "Average Order Value Across Customer Accounts",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Sales is evaluating order sizes among repeat shoppers. Join customers and orders to calculate each shopper's average order value across completed deliveries, showing only customers who have placed at least 2 delivered orders, ordered highest average spend first, limited to top 15.",
    "context_notes": "Join customers and orders WHERE status = 'delivered'. Group by customer id, first_name, last_name. Filter HAVING count >= 2. Order by avg_spend DESC LIMIT 15.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "HAVING",
      "AVG",
      "ROUND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "avg_spend"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, ROUND(AVG(o.total_amount), 2) AS avg_spend FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name HAVING COUNT(o.id) >= 2 ORDER BY avg_spend DESC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter status = 'delivered'.",
      "Group by customer, filter HAVING COUNT >= 2, ORDER BY avg_spend DESC LIMIT 15."
    ],
    "solution_explanation": "Identifies high-spending repeat shoppers for premium loyalty perks.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-063",
    "domain": "ecommerce",
    "level": 1,
    "order": 63,
    "difficulty": "core",
    "title": "Southern Territory Completed Order Performance",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Sales leadership is evaluating growth in the South territory. Calculate total delivered orders and total revenue generated by customers located in the South region.",
    "context_notes": "Join customers and orders WHERE region = 'South' and status = 'delivered'. Group by region.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "SUM"
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
      "Join customers and orders on c.id = o.customer_id.",
      "Filter region = 'South' and status = 'delivered'.",
      "Group by region."
    ],
    "solution_explanation": "Quantifies Southern regional sales performance.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-064",
    "domain": "ecommerce",
    "level": 1,
    "order": 64,
    "difficulty": "core",
    "title": "Customer Resolution Rates in Support",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Support leadership is tracking SLA resolution efficiency. Group support tickets by status to calculate ticket volume across each workflow status, ordered by ticket count descending.",
    "context_notes": "Group support_tickets by status. Compute count. Order by ticket_count DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "ticket_count"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS ticket_count FROM support_tickets GROUP BY status ORDER BY ticket_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by status.",
      "Calculate COUNT(*) AS ticket_count.",
      "Order by ticket_count DESC."
    ],
    "solution_explanation": "Benchmarks customer support resolution rates.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-065",
    "domain": "ecommerce",
    "level": 1,
    "order": 65,
    "difficulty": "core",
    "title": "Inventory Stored by Product Category",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Warehouse management is reviewing space allocation by department line. Join categories, products, and inventory to calculate the total units of inventory stored in warehouses for each category, ordered highest quantity first.",
    "context_notes": "Join categories, products, and inventory. Group by category name. Sum quantity_on_hand. Order by total_units DESC.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "3-WAY JOIN",
      "GROUP BY",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_name",
      "total_units"
    ],
    "reference_sql": "SELECT c.name AS category_name, SUM(i.quantity_on_hand) AS total_units FROM categories c JOIN products p ON c.id = p.category_id JOIN inventory i ON p.id = i.product_id GROUP BY c.name ORDER BY total_units DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories to products, then products to inventory.",
      "Group by category name.",
      "Sum quantity_on_hand and order descending."
    ],
    "solution_explanation": "Profiles physical storage space allocated to merchandise categories.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "ecom-L1-066",
    "domain": "ecommerce",
    "level": 1,
    "order": 66,
    "difficulty": "core",
    "title": "Orders with Elevated Shipping Surcharges",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Logistics is analyzing heavy freight fees passed to consumers. Group orders with shipping fees of $10.00 or higher by their current status to see order counts and average shipping fee, ordered by count descending.",
    "context_notes": "Filter orders WHERE shipping_fee >= 10.00. Group by status. Compute count and avg shipping fee. Order by order_count DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "GROUP BY",
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
    "reference_sql": "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders WHERE shipping_fee >= 10.00 GROUP BY status ORDER BY order_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter where shipping_fee >= 10.00.",
      "Group by status.",
      "Calculate COUNT(*) and ROUND(AVG(shipping_fee), 2).",
      "Order by count descending."
    ],
    "solution_explanation": "Audits orders carrying substantial delivery surcharges.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-067",
    "domain": "ecommerce",
    "level": 1,
    "order": 67,
    "difficulty": "core",
    "title": "Customer Review Ratings Distribution",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Marketing is analyzing review polarity across our customer base. Group all customer reviews by rating to calculate how many total reviews were submitted for each star rating, ordered from 5 stars down to 1 star.",
    "context_notes": "Group customer_reviews by rating. Compute review_count. Order by rating DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "rating",
      "review_count"
    ],
    "reference_sql": "SELECT rating, COUNT(*) AS review_count FROM customer_reviews GROUP BY rating ORDER BY rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by rating.",
      "Calculate COUNT(*) AS review_count.",
      "Order by rating DESC."
    ],
    "solution_explanation": "Visualizes overall customer feedback rating curves.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-068",
    "domain": "ecommerce",
    "level": 1,
    "order": 68,
    "difficulty": "core",
    "title": "Multi-Line Customer Orders",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Merchandising wants to see orders containing diverse items. Group order line items by order to calculate the number of distinct products purchased in each order, showing only orders with at least 3 distinct products, ordered highest product variety first, limited to top 15.",
    "context_notes": "Group order_items by order_id. Filter HAVING COUNT(DISTINCT product_id) >= 3. Order by distinct_products DESC LIMIT 15.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "DISTINCT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "order_id",
      "distinct_products"
    ],
    "reference_sql": "SELECT order_id, COUNT(DISTINCT product_id) AS distinct_products FROM order_items GROUP BY order_id HAVING COUNT(DISTINCT product_id) >= 3 ORDER BY distinct_products DESC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group order_items by order_id.",
      "Filter with HAVING COUNT(DISTINCT product_id) >= 3.",
      "Order by distinct_products DESC LIMIT 15."
    ],
    "solution_explanation": "Isolates diverse basket transactions indicating broad shopper interest.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-069",
    "domain": "ecommerce",
    "level": 1,
    "order": 69,
    "difficulty": "core",
    "title": "Eastern Territory Completed Sales",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Our East Coast regional team is auditing order delivery performance. Join customers and orders to calculate completed order volume and total collected revenue for customers in the East region.",
    "context_notes": "Join customers and orders WHERE region = 'East' and status = 'delivered'. Group by region.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "SUM"
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
      "Join customers and orders on c.id = o.customer_id.",
      "Filter region = 'East' and status = 'delivered'.",
      "Group by region."
    ],
    "solution_explanation": "Quantifies Eastern regional completed revenue totals.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "ecom-L1-070",
    "domain": "ecommerce",
    "level": 1,
    "order": 70,
    "difficulty": "core",
    "title": "Customer Registrations by Regional Market",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Growth strategy is planning regional acquisition budgets. Count the total registered customers in each geographic region, ordered from our largest user base downward.",
    "context_notes": "Group customers by region. Compute customer_count. Order by customer_count DESC.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "region",
      "customer_count"
    ],
    "reference_sql": "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region ORDER BY customer_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group by region.",
      "Calculate COUNT(*) AS customer_count.",
      "Order by customer_count DESC."
    ],
    "solution_explanation": "Measures regional customer adoption across territorial markets.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "ecom-L1-071",
    "domain": "ecommerce",
    "level": 1,
    "order": 71,
    "difficulty": "challenging",
    "title": "VIP High-Spend Customer Cohort",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Marketing is launching an exclusive concierge reward tier for our top patrons. Join customers and completed delivered orders to identify all customers who have accumulated more than $400 in total completed purchases, showing their names, email, and cumulative spend, ordered from highest spend downward.",
    "context_notes": "Join customers and orders on c.id = o.customer_id WHERE o.status = 'delivered'. Group by customer id, first_name, last_name, email. Filter HAVING SUM > 400. Order by total_spent DESC.",
    "concepts": [
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "email",
      "total_spent"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.email, ROUND(SUM(o.total_amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.email HAVING SUM(o.total_amount) > 400.00 ORDER BY total_spent DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter where status = 'delivered'.",
      "Group by customer id and details, filter HAVING SUM > 400.00, order descending."
    ],
    "solution_explanation": "Surfaces high-value customer accounts for VIP retention campaigns.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L1-072",
    "domain": "ecommerce",
    "level": 1,
    "order": 72,
    "difficulty": "challenging",
    "title": "High Gross Margin Merchandise SKUs",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Executive management is reviewing unit gross profitability across our product catalog. Calculate each item's unit profit in dollars (retail price minus cost) and profit margin percentage (profit divided by price), showing products with a margin of at least 50%, ordered highest dollar profit first, limited to top 15.",
    "context_notes": "Query products WHERE (price - cost) / price >= 0.50. Calculate profit and margin_pct. Order by unit_profit DESC LIMIT 15.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ARITHMETIC",
      "ROUND",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "name",
      "price",
      "cost",
      "unit_profit",
      "margin_pct"
    ],
    "reference_sql": "SELECT name, price, cost, (price - cost) AS unit_profit, ROUND(((price - cost) / price) * 100, 2) AS margin_pct FROM products WHERE ((price - cost) / price) >= 0.50 ORDER BY unit_profit DESC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Calculate (price - cost) AS unit_profit.",
      "Calculate ROUND(((price - cost) / price) * 100, 2) AS margin_pct.",
      "Filter where margin >= 0.50, order by unit_profit DESC LIMIT 15."
    ],
    "solution_explanation": "Identifies high-margin products that generate substantial gross profit.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "ecom-L1-073",
    "domain": "ecommerce",
    "level": 1,
    "order": 73,
    "difficulty": "challenging",
    "title": "Department Revenue & Unit Sales Contribution",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Corporate finance needs an end-to-end performance audit across operating departments. Link departments, categories, products, and order items to calculate total units sold and total dollar revenue generated by each department, ordered from highest revenue downward.",
    "context_notes": "Join departments, categories, products, and order_items. Group by department name. Sum quantity and sum line revenue. Order by total_revenue DESC.",
    "concepts": [
      "INNER JOIN",
      "4-WAY JOIN",
      "GROUP BY",
      "SUM",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "units_sold",
      "total_revenue"
    ],
    "reference_sql": "SELECT d.name AS department_name, SUM(oi.quantity) AS units_sold, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM departments d JOIN categories c ON d.id = c.department_id JOIN products p ON c.id = p.category_id JOIN order_items oi ON p.id = oi.product_id GROUP BY d.id, d.name ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments -> categories -> products -> order_items.",
      "Group by d.id, d.name.",
      "Calculate SUM(quantity) and SUM(quantity * unit_price).",
      "Order by total_revenue DESC."
    ],
    "solution_explanation": "Calculates departmental enterprise sales revenue across retail divisions.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-074",
    "domain": "ecommerce",
    "level": 1,
    "order": 74,
    "difficulty": "challenging",
    "title": "Carrier Shipping Performance on Large Orders",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Logistics is analyzing carrier handling of our highest-value orders. Join shipments and orders for all delivered orders of $300 or greater to calculate shipment volume and average shipping fee per carrier, ordered by shipment count descending.",
    "context_notes": "Join shipments and orders WHERE o.status = 'delivered' and o.total_amount >= 300.00. Group by carrier. Compute count and avg shipping fee. Order by shipment_count DESC.",
    "concepts": [
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "shipment_count",
      "avg_shipping_fee"
    ],
    "reference_sql": "SELECT s.carrier, COUNT(s.id) AS shipment_count, ROUND(AVG(o.shipping_fee), 2) AS avg_shipping_fee FROM shipments s JOIN orders o ON s.order_id = o.id WHERE o.status = 'delivered' AND o.total_amount >= 300.00 GROUP BY s.carrier ORDER BY shipment_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join shipments and orders on s.order_id = o.id.",
      "Filter where status = 'delivered' and total_amount >= 300.00.",
      "Group by carrier and order descending."
    ],
    "solution_explanation": "Examines carrier assignment on premium high-value customer orders.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L1-075",
    "domain": "ecommerce",
    "level": 1,
    "order": 75,
    "difficulty": "challenging",
    "title": "Top-Rated Products with Substantial Reviews",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Marketing wants to launch an 'Editor's Choice' badge on our best-reviewed catalog items. Join products, categories, and customer reviews to find all items that have an average customer rating of at least 4.0 across at least 2 reviews, showing product title, category, review count, and average rating, ordered highest rating first.",
    "context_notes": "Join products, categories, and customer_reviews. Group by product id, name, category name. Filter HAVING count >= 2 AND avg rating >= 4.0. Order by avg_rating DESC, review_count DESC.",
    "concepts": [
      "INNER JOIN",
      "3-WAY JOIN",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "category_name",
      "review_count",
      "avg_rating"
    ],
    "reference_sql": "SELECT p.name AS product_name, c.name AS category_name, COUNT(r.id) AS review_count, ROUND(AVG(r.rating), 2) AS avg_rating FROM products p JOIN categories c ON p.category_id = c.id JOIN customer_reviews r ON p.id = r.product_id GROUP BY p.id, p.name, c.name HAVING COUNT(r.id) >= 2 AND AVG(r.rating) >= 4.0 ORDER BY avg_rating DESC, review_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products with categories and customer_reviews.",
      "Group by product and category.",
      "Filter HAVING COUNT(r.id) >= 2 AND AVG(r.rating) >= 4.0.",
      "Order by avg_rating DESC."
    ],
    "solution_explanation": "Highlights proven crowd-favorite merchandise with strong customer ratings.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L1-076",
    "domain": "ecommerce",
    "level": 1,
    "order": 76,
    "difficulty": "challenging",
    "title": "Merchandise Return Liability by Category",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Quality control is assessing which product sectors suffer from the highest refund exposure. Link categories, products, order items, orders, and returns to calculate total refund claims and total dollar refund volume per category, ordered highest refund amount first.",
    "context_notes": "Join categories, products, order_items, orders, and returns. Group by category name. Calculate return count and sum refund amount. Order by total_refunded DESC.",
    "concepts": [
      "INNER JOIN",
      "MULTI-TABLE JOIN",
      "GROUP BY",
      "COUNT",
      "SUM",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_name",
      "return_count",
      "total_refunded"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(DISTINCT ret.id) AS return_count, ROUND(SUM(ret.refund_amount), 2) AS total_refunded FROM categories c JOIN products p ON c.id = p.category_id JOIN order_items oi ON p.id = oi.product_id JOIN orders o ON oi.order_id = o.id JOIN returns ret ON o.id = ret.order_id GROUP BY c.name ORDER BY total_refunded DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories -> products -> order_items -> orders -> returns.",
      "Group by category name.",
      "Calculate COUNT(DISTINCT ret.id) and SUM(refund_amount).",
      "Order by total_refunded DESC."
    ],
    "solution_explanation": "Measures warranty and return financial liabilities across catalog categories.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "ecom-L1-077",
    "domain": "ecommerce",
    "level": 1,
    "order": 77,
    "difficulty": "challenging",
    "title": "Customer Support Escalations on High-Value Shoppers",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Customer success is conducting VIP service recovery. Join customers, support tickets, and orders to locate customers who have filed support tickets and also placed high-value orders ($250+), displaying customer names, ticket category, priority, and order spend, ordered highest spend first.",
    "context_notes": "Join customers, support_tickets, and orders WHERE o.total_amount >= 250.00. Show customer details, ticket details, and total_amount. Order by total_amount DESC.",
    "concepts": [
      "INNER JOIN",
      "3-WAY JOIN",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "category",
      "priority",
      "total_amount"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, st.category, st.priority, o.total_amount FROM customers c JOIN support_tickets st ON c.id = st.customer_id JOIN orders o ON c.id = o.customer_id WHERE o.total_amount >= 250.00 ORDER BY o.total_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers with support_tickets and orders.",
      "Filter where total_amount >= 250.00.",
      "Order by total_amount DESC."
    ],
    "solution_explanation": "Cross-references support inquiries against premium customer purchase history.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L1-078",
    "domain": "ecommerce",
    "level": 1,
    "order": 78,
    "difficulty": "challenging",
    "title": "Total Warehouse Stock Valuation",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Accounting is preparing our physical inventory balance sheet. Join warehouses, inventory, and products to calculate the total units stored and total cost value of goods held in each warehouse facility, ordered from highest value facility downward.",
    "context_notes": "Join warehouses, inventory, and products. Group by warehouse id and name. Compute sum quantity and sum (quantity * cost). Order by total_inventory_cost DESC.",
    "concepts": [
      "INNER JOIN",
      "3-WAY JOIN",
      "GROUP BY",
      "SUM",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "warehouse_name",
      "total_units",
      "total_inventory_cost"
    ],
    "reference_sql": "SELECT w.name AS warehouse_name, SUM(i.quantity_on_hand) AS total_units, ROUND(SUM(i.quantity_on_hand * p.cost), 2) AS total_inventory_cost FROM warehouses w JOIN inventory i ON w.id = i.warehouse_id JOIN products p ON i.product_id = p.id GROUP BY w.id, w.name ORDER BY total_inventory_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join warehouses -> inventory -> products.",
      "Group by w.id, w.name.",
      "Sum quantity_on_hand and sum(quantity_on_hand * cost).",
      "Order by total_inventory_cost DESC."
    ],
    "solution_explanation": "Computes balance sheet asset valuation for physical inventory across regional hubs.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L1-079",
    "domain": "ecommerce",
    "level": 1,
    "order": 79,
    "difficulty": "challenging",
    "title": "Frequent Shoppers with High Cumulative Spend",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Marketing wants to identify our top customer cohort for annual rewards. Join customers and completed orders to locate all customers who have placed at least 3 delivered orders AND accumulated over $600 in total sales, ordered by spend descending.",
    "context_notes": "Join customers and orders WHERE status = 'delivered'. Group by customer id and details. Filter HAVING count >= 3 AND sum > 600. Order by total_spend DESC.",
    "concepts": [
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "HAVING",
      "COUNT",
      "SUM",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "delivered_orders",
      "total_spend"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, COUNT(o.id) AS delivered_orders, ROUND(SUM(o.total_amount), 2) AS total_spend FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name HAVING COUNT(o.id) >= 3 AND SUM(o.total_amount) > 600.00 ORDER BY total_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter where status = 'delivered'.",
      "Group by customer, filter HAVING count >= 3 and sum > 600.00, order by spend desc."
    ],
    "solution_explanation": "Isolates the highest-tier patron cohort combining frequency and volume.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L1-080",
    "domain": "ecommerce",
    "level": 1,
    "order": 80,
    "difficulty": "challenging",
    "title": "High-Volume Best-Selling Product SKUs",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Merchandising needs our all-star merchandise list for banner ads. Join products, categories, and order line items to calculate total units sold and total line sales revenue for each product, showing only products with at least 15 units sold, ordered highest revenue first.",
    "context_notes": "Join products, categories, and order_items. Group by product id, name, category name. Filter HAVING sum quantity >= 15. Order by total_revenue DESC.",
    "concepts": [
      "INNER JOIN",
      "3-WAY JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "category_name",
      "total_units_sold",
      "total_revenue"
    ],
    "reference_sql": "SELECT p.name AS product_name, c.name AS category_name, SUM(oi.quantity) AS total_units_sold, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM products p JOIN categories c ON p.category_id = c.id JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name, c.name HAVING SUM(oi.quantity) >= 15 ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products with categories and order_items.",
      "Group by product and category.",
      "Filter HAVING sum quantity >= 15 and order by revenue desc."
    ],
    "solution_explanation": "Ranks premier high-velocity revenue generating merchandise items.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L1-081",
    "domain": "ecommerce",
    "level": 1,
    "order": 81,
    "difficulty": "challenging",
    "title": "Regional Product Sales Distribution",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Territory planners need to see where customer demand concentrates geographically. Link customers, orders, and order items to find total units purchased by customers in each geographic region, ordered highest unit volume first.",
    "context_notes": "Join customers, orders, and order_items WHERE o.status = 'delivered'. Group by region. Sum quantity. Order by total_units DESC.",
    "concepts": [
      "INNER JOIN",
      "3-WAY JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "region",
      "total_units"
    ],
    "reference_sql": "SELECT c.region, SUM(oi.quantity) AS total_units FROM customers c JOIN orders o ON c.id = o.customer_id JOIN order_items oi ON o.id = oi.order_id WHERE o.status = 'delivered' GROUP BY c.region ORDER BY total_units DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers -> orders -> order_items.",
      "Filter where status = 'delivered'.",
      "Group by region and sum units ordered."
    ],
    "solution_explanation": "Quantifies physical unit demand across geographic territories.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "ecom-L1-082",
    "domain": "ecommerce",
    "level": 1,
    "order": 82,
    "difficulty": "challenging",
    "title": "Active Supplier Catalog Depth and Reliability",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Vendor management is reviewing supplier partnerships. Join suppliers and products to calculate how many distinct products each vendor manufactures and their vendor rating, ordered by product count descending, then rating descending.",
    "context_notes": "Join suppliers and products. Group by supplier id, company_name, rating. Count products. Order by catalog_items DESC, rating DESC.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "company_name",
      "rating",
      "catalog_items"
    ],
    "reference_sql": "SELECT s.company_name, s.rating, COUNT(p.id) AS catalog_items FROM suppliers s JOIN products p ON s.id = p.category_id GROUP BY s.id, s.company_name, s.rating ORDER BY catalog_items DESC, s.rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join suppliers and products.",
      "Group by supplier id, company_name, rating.",
      "Count products and order descending."
    ],
    "solution_explanation": "Measures supplier catalog footprint and reliability scores.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "ecom-L1-083",
    "domain": "ecommerce",
    "level": 1,
    "order": 83,
    "difficulty": "challenging",
    "title": "Price Spread and Margin Ratios by Department",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Finance is reviewing pricing consistency across corporate departments. Link departments, categories, and products to calculate the lowest price, highest price, and average price per unit across each department, ordered by average price descending.",
    "context_notes": "Join departments, categories, and products. Group by department name. Compute MIN, MAX, and ROUND(AVG(price), 2). Order by avg_price DESC.",
    "concepts": [
      "INNER JOIN",
      "3-WAY JOIN",
      "GROUP BY",
      "MIN",
      "MAX",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "min_price",
      "max_price",
      "avg_price"
    ],
    "reference_sql": "SELECT d.name AS department_name, MIN(p.price) AS min_price, MAX(p.price) AS max_price, ROUND(AVG(p.price), 2) AS avg_price FROM departments d JOIN categories c ON d.id = c.department_id JOIN products p ON c.id = p.category_id GROUP BY d.id, d.name ORDER BY avg_price DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments -> categories -> products.",
      "Group by department name.",
      "Compute MIN, MAX, and AVG of price.",
      "Order by avg_price DESC."
    ],
    "solution_explanation": "Profiles pricing spread and catalog positioning across operating departments.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L1-084",
    "domain": "ecommerce",
    "level": 1,
    "order": 84,
    "difficulty": "challenging",
    "title": "Shipments Assigned to High-Value Orders",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Logistics is conducting premium order tracking. Join shipments and orders to locate all shipments dispatched for customer orders that reached $350 or more, ordered from highest order value downward.",
    "context_notes": "Join shipments and orders on s.order_id = o.id WHERE o.total_amount >= 350.00. Order by o.total_amount DESC, s.id ASC.",
    "concepts": [
      "INNER JOIN",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "order_id",
      "carrier",
      "tracking_number",
      "total_amount"
    ],
    "reference_sql": "SELECT s.id, s.order_id, s.carrier, s.tracking_number, o.total_amount FROM shipments s JOIN orders o ON s.order_id = o.id WHERE o.total_amount >= 350.00 ORDER BY o.total_amount DESC, s.id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join shipments and orders on s.order_id = o.id.",
      "Filter where o.total_amount >= 350.00.",
      "Order by o.total_amount DESC, s.id ASC."
    ],
    "solution_explanation": "Tracks carrier parcel dispatches assigned to premium customer orders.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "ecom-L1-085",
    "domain": "ecommerce",
    "level": 1,
    "order": 85,
    "difficulty": "challenging",
    "title": "Top Selling Products Free of Return Complaints",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Product quality wants to celebrate flawlessly manufactured items. Find product line sales for items that have generated at least 8 units sold, ordered highest sales volume first.",
    "context_notes": "Join products and order_items. Group by product id and name. Filter HAVING sum quantity >= 8. Order by units_sold DESC.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "product_name",
      "units_sold"
    ],
    "reference_sql": "SELECT p.name AS product_name, SUM(oi.quantity) AS units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 8 ORDER BY units_sold DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join products and order_items.",
      "Group by product id and name.",
      "Filter HAVING sum quantity >= 8 and order descending."
    ],
    "solution_explanation": "Surfaces high-volume catalog merchandise with flawless customer adoption.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "ecom-L1-086",
    "domain": "ecommerce",
    "level": 1,
    "order": 86,
    "difficulty": "challenging",
    "title": "Customer Support Volume by Priority and Region",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Operations is reviewing regional customer friction. Join customers and support tickets to calculate total support inquiries submitted across each region, ordered with our highest ticket volume territories first.",
    "context_notes": "Join customers and support_tickets. Group by region. Count tickets. Order by total_tickets DESC.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "region",
      "total_tickets"
    ],
    "reference_sql": "SELECT c.region, COUNT(st.id) AS total_tickets FROM customers c JOIN support_tickets st ON c.id = st.customer_id GROUP BY c.region ORDER BY total_tickets DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and support_tickets on c.id = st.customer_id.",
      "Group by region and count tickets.",
      "Order by total_tickets DESC."
    ],
    "solution_explanation": "Measures customer service workload distribution across geographic markets.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "ecom-L1-087",
    "domain": "ecommerce",
    "level": 1,
    "order": 87,
    "difficulty": "challenging",
    "title": "Average Delivery Transit Duration by Carrier",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Logistics is reviewing on-time delivery service level agreements. For all shipments that have both dispatch and delivery timestamps, calculate total fulfilled shipments per carrier, ordered by volume descending.",
    "context_notes": "Filter shipments WHERE shipped_at IS NOT NULL AND delivered_at IS NOT NULL. Group by carrier. Calculate shipment count. Order by fulfilled_shipments DESC.",
    "concepts": [
      "SELECT",
      "WHERE",
      "IS NOT NULL",
      "GROUP BY",
      "COUNT",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "fulfilled_shipments"
    ],
    "reference_sql": "SELECT carrier, COUNT(*) AS fulfilled_shipments FROM shipments WHERE shipped_at IS NOT NULL AND delivered_at IS NOT NULL GROUP BY carrier ORDER BY fulfilled_shipments DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Filter where shipped_at and delivered_at are both not null.",
      "Group by carrier and count shipments.",
      "Order by volume descending."
    ],
    "solution_explanation": "Measures completed door-to-door transit volume across carrier partners.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "ecom-L1-088",
    "domain": "ecommerce",
    "level": 1,
    "order": 88,
    "difficulty": "challenging",
    "title": "Luxury and Premium Brand Sales Volume",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Executive leadership is assessing the financial traction of our high-end brand partnerships. Join brands, products, and order items to calculate total units sold and total gross revenue generated by brand partners classified as luxury or premium, ordered by total revenue descending.",
    "context_notes": "Join brands, products, and order_items WHERE tier IN ('luxury', 'premium'). Group by brand name, tier. Calculate units and revenue. Order by total_revenue DESC.",
    "concepts": [
      "INNER JOIN",
      "3-WAY JOIN",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "brand_name",
      "tier",
      "units_sold",
      "total_revenue"
    ],
    "reference_sql": "SELECT b.name AS brand_name, b.tier, SUM(oi.quantity) AS units_sold, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM brands b JOIN products p ON b.id = p.category_id JOIN order_items oi ON p.id = oi.product_id WHERE b.tier IN ('luxury', 'premium') GROUP BY b.id, b.name, b.tier ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join brands to products, then products to order_items.",
      "Filter WHERE tier in luxury or premium.",
      "Group by brand name and tier, calculate revenue, order descending."
    ],
    "solution_explanation": "Tracks revenue throughput for high-margin prestige brands.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L1-089",
    "domain": "ecommerce",
    "level": 1,
    "order": 89,
    "difficulty": "challenging",
    "title": "Defective Merchandise Return Impact on Orders",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Quality control is cross-referencing customer refunds against initial transaction values. Join orders and customer returns where the stated reason is defective merchandise, displaying order id, initial order amount, and refund amount, ordered by refund amount descending.",
    "context_notes": "Join orders and returns WHERE ret.reason LIKE '%defect%'. Show o.id, o.total_amount, ret.refund_amount. Order by ret.refund_amount DESC.",
    "concepts": [
      "INNER JOIN",
      "WHERE",
      "LIKE",
      "ORDER BY"
    ],
    "expected_columns": [
      "order_id",
      "total_amount",
      "refund_amount"
    ],
    "reference_sql": "SELECT o.id AS order_id, o.total_amount, ret.refund_amount FROM orders o JOIN returns ret ON o.id = ret.order_id WHERE ret.reason LIKE '%defect%' ORDER BY ret.refund_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join orders and returns on o.id = ret.order_id.",
      "Filter where reason LIKE '%defect%'.",
      "Order by refund_amount DESC."
    ],
    "solution_explanation": "Cross-references refund claims directly against original order values.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "ecom-L1-090",
    "domain": "ecommerce",
    "level": 1,
    "order": 90,
    "difficulty": "challenging",
    "title": "Total Inventory Reserved Across Warehouse Facilities",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Logistics is reviewing warehouse buffer allocations across distribution facilities. Join warehouses and inventory to calculate total on-hand inventory units and total reserved inventory units for each warehouse facility, ordered by reserved units descending.",
    "context_notes": "Join warehouses and inventory. Group by warehouse id and name. Sum on hand and reserved. Order by total_reserved DESC.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "ORDER BY"
    ],
    "expected_columns": [
      "warehouse_name",
      "total_on_hand",
      "total_reserved"
    ],
    "reference_sql": "SELECT w.name AS warehouse_name, SUM(i.quantity_on_hand) AS total_on_hand, SUM(i.reserved_quantity) AS total_reserved FROM warehouses w JOIN inventory i ON w.id = i.warehouse_id GROUP BY w.id, w.name ORDER BY total_reserved DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join warehouses and inventory on w.id = i.warehouse_id.",
      "Group by warehouse id and name.",
      "Sum quantity_on_hand and reserved_quantity, order by reserved descending."
    ],
    "solution_explanation": "Examines stock commitment ratios across physical fulfillment centers.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "ecom-L1-091",
    "domain": "ecommerce",
    "level": 1,
    "order": 91,
    "difficulty": "boss",
    "title": "Boss Audit #1: Executive Revenue Leaderboard",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Board presentation deliverable: We need an authoritative executive revenue leaderboard of our top 10 lifetime customers. Join customer accounts and completed delivered orders to compute each shopper's total orders placed, cumulative revenue collected, and average order value, ordered with our biggest patrons first, limited to the top 10.",
    "context_notes": "Join customers and orders WHERE status = 'delivered'. Group by customer id, first_name, last_name, region. Compute order count, sum total_amount, avg total_amount. Order by total_revenue DESC LIMIT 10.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "WHERE",
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
      "Filter where status = 'delivered'.",
      "Calculate COUNT(DISTINCT o.id), SUM(total_amount), and AVG(total_amount).",
      "Order by total_revenue DESC LIMIT 10."
    ],
    "solution_explanation": "Generates the definitive executive lifetime patron leaderboard.",
    "xp": 60,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L1-092",
    "domain": "ecommerce",
    "level": 1,
    "order": 92,
    "difficulty": "boss",
    "title": "Boss Audit #2: Department Profitability & Gross Margin Matrix",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Executive financial analysis: I need a cross-divisional profitability scorecard for our board audit. Join departments, categories, products, and order items to calculate total units sold, gross sales revenue, estimated wholesale cost of goods sold, and total net gross profit for each department, ordered from highest gross profit downward.",
    "context_notes": "Join departments, categories, products, and order_items. Group by department id and name. Compute units sold, gross revenue, cost of goods, and net profit (revenue - cost). Order by net_gross_profit DESC.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "4-WAY JOIN",
      "GROUP BY",
      "SUM",
      "ARITHMETIC",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "units_sold",
      "gross_revenue",
      "cost_of_goods",
      "net_gross_profit"
    ],
    "reference_sql": "SELECT d.name AS department_name, SUM(oi.quantity) AS units_sold, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS gross_revenue, ROUND(SUM(oi.quantity * p.cost), 2) AS cost_of_goods, ROUND(SUM(oi.quantity * (oi.unit_price - p.cost)), 2) AS net_gross_profit FROM departments d JOIN categories c ON d.id = c.department_id JOIN products p ON c.id = p.category_id JOIN order_items oi ON p.id = oi.product_id GROUP BY d.id, d.name ORDER BY net_gross_profit DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join departments -> categories -> products -> order_items.",
      "Group by d.id, d.name.",
      "Compute SUM(quantity), SUM(quantity * unit_price), SUM(quantity * cost), and SUM(quantity * (unit_price - cost)).",
      "Order by net_gross_profit DESC."
    ],
    "solution_explanation": "Constructs full departmental margin and profitability reconciliation.",
    "xp": 60,
    "estimated_minutes": 15
  },
  {
    "id": "ecom-L1-093",
    "domain": "ecommerce",
    "level": 1,
    "order": 93,
    "difficulty": "boss",
    "title": "Boss Audit #3: Carrier Logistics SLA & Fulfillment Velocity",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Carrier contract renegotiation: Liam here. We need a comprehensive logistics scorecard evaluating our delivery partners. For each freight carrier, compute total shipments handled, count of successfully delivered parcels, and average shipping fee billed, ordered from our largest carrier partner downward.",
    "context_notes": "Join shipments and orders on s.order_id = o.id. Group by carrier. Compute total shipments, count of delivered shipments, and average shipping fee. Order by total_shipments DESC.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "INNER JOIN",
      "GROUP BY",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "carrier",
      "total_shipments",
      "delivered_count",
      "avg_shipping_fee"
    ],
    "reference_sql": "SELECT s.carrier, COUNT(s.id) AS total_shipments, COUNT(s.delivered_at) AS delivered_count, ROUND(AVG(o.shipping_fee), 2) AS avg_shipping_fee FROM shipments s JOIN orders o ON s.order_id = o.id GROUP BY s.carrier ORDER BY total_shipments DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join shipments and orders on s.order_id = o.id.",
      "Group by carrier.",
      "Calculate COUNT(s.id), COUNT(s.delivered_at), and ROUND(AVG(o.shipping_fee), 2).",
      "Order by total_shipments DESC."
    ],
    "solution_explanation": "Audits delivery fulfillment throughput and shipping fees per carrier.",
    "xp": 60,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L1-094",
    "domain": "ecommerce",
    "level": 1,
    "order": 94,
    "difficulty": "boss",
    "title": "Boss Audit #4: Inventory Capital Exposure & Stagnant Stock",
    "stakeholder": {
      "name": "Liam Vance",
      "role": "Fulfillment & Operations Manager"
    },
    "request": "Executive supply audit: We need to quantify company capital tied up on warehouse shelves. Join categories, products, and inventory to calculate total warehouse stock on hand, total reserved inventory, and total asset valuation (quantity on hand multiplied by cost) for each category, ordered highest capital exposure first.",
    "context_notes": "Join categories, products, and inventory. Group by category name. Compute sum quantity_on_hand, sum reserved_quantity, and sum (quantity_on_hand * cost). Order by total_asset_value DESC.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "3-WAY JOIN",
      "GROUP BY",
      "SUM",
      "ARITHMETIC",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_name",
      "total_stock_on_hand",
      "total_reserved",
      "total_asset_value"
    ],
    "reference_sql": "SELECT c.name AS category_name, SUM(i.quantity_on_hand) AS total_stock_on_hand, SUM(i.reserved_quantity) AS total_reserved, ROUND(SUM(i.quantity_on_hand * p.cost), 2) AS total_asset_value FROM categories c JOIN products p ON c.id = p.category_id JOIN inventory i ON p.id = i.product_id GROUP BY c.name ORDER BY total_asset_value DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories -> products -> inventory.",
      "Group by category name.",
      "Calculate SUM(quantity_on_hand), SUM(reserved_quantity), and SUM(quantity_on_hand * cost).",
      "Order by total_asset_value DESC."
    ],
    "solution_explanation": "Computes warehouse capital tie-up across merchandise categories.",
    "xp": 60,
    "estimated_minutes": 14
  },
  {
    "id": "ecom-L1-095",
    "domain": "ecommerce",
    "level": 1,
    "order": 95,
    "difficulty": "boss",
    "title": "Boss Audit #5: Regional Market Penetration & Value Matrix",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Territory expansion briefing: Rachel here. We need a holistic market penetration matrix across our 5 operating regions. Join customers and orders to calculate total registered shoppers, total completed delivered orders, and total net revenue collected per region, ordered by revenue descending.",
    "context_notes": "Join customers and orders on c.id = o.customer_id. Group by region. Count distinct customers, count delivered orders, sum total_amount for delivered orders. Order by regional_revenue DESC.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "GROUP BY",
      "DISTINCT",
      "COUNT",
      "SUM",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "region",
      "customer_count",
      "delivered_orders",
      "regional_revenue"
    ],
    "reference_sql": "SELECT c.region, COUNT(DISTINCT c.id) AS customer_count, COUNT(DISTINCT CASE WHEN o.status = 'delivered' THEN o.id END) AS delivered_orders, ROUND(SUM(CASE WHEN o.status = 'delivered' THEN o.total_amount ELSE 0 END), 2) AS regional_revenue FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.region ORDER BY regional_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers left join orders.",
      "Group by region.",
      "Calculate COUNT(DISTINCT c.id), count of delivered orders, and sum of delivered revenue.",
      "Order by regional_revenue DESC."
    ],
    "solution_explanation": "Benchmarks regional market share and revenue throughput across territories.",
    "xp": 60,
    "estimated_minutes": 15
  },
  {
    "id": "ecom-L1-096",
    "domain": "ecommerce",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Boss Audit #6: Repeat Buyer Lifetime Retention Cohort",
    "stakeholder": {
      "name": "Rachel Green",
      "role": "VP of Sales & Growth"
    },
    "request": "Investor deck analysis: We need to demonstrate strong shopper retention. Join customers and delivered orders to identify repeat patrons who have placed 3 or more separate delivered orders, displaying their names, region, total orders placed, cumulative spend, and average basket size, ordered by cumulative spend descending, limited to top 10.",
    "context_notes": "Join customers and orders WHERE o.status = 'delivered'. Group by customer id, first_name, last_name, region. Filter HAVING count >= 3. Order by cumulative_spend DESC LIMIT 10.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "WHERE",
      "GROUP BY",
      "HAVING",
      "COUNT",
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
      "delivered_orders",
      "cumulative_spend",
      "avg_basket_size"
    ],
    "reference_sql": "SELECT c.first_name, c.last_name, c.region, COUNT(o.id) AS delivered_orders, ROUND(SUM(o.total_amount), 2) AS cumulative_spend, ROUND(AVG(o.total_amount), 2) AS avg_basket_size FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region HAVING COUNT(o.id) >= 3 ORDER BY cumulative_spend DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders.",
      "Filter where status = 'delivered'.",
      "Group by customer details, filter HAVING COUNT >= 3.",
      "Order by cumulative_spend DESC LIMIT 10."
    ],
    "solution_explanation": "Proves customer retention and high-frequency repeat purchasing power.",
    "xp": 60,
    "estimated_minutes": 14
  },
  {
    "id": "ecom-L1-097",
    "domain": "ecommerce",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Boss Audit #7: Commercial Brand Tier Financial Performance",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "Marketplace positioning review: Alex here. We need to evaluate which brand tiers generate the most sales. Join brands, products, and order line items to calculate total units sold, gross merchandise revenue, and average selling price across brand positioning tiers, ordered from highest gross revenue downward.",
    "context_notes": "Join brands, products, and order_items. Group by brand tier. Compute units sold, gross revenue, and avg unit price. Order by gross_revenue DESC.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "3-WAY JOIN",
      "GROUP BY",
      "SUM",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "tier",
      "units_sold",
      "gross_revenue",
      "avg_selling_price"
    ],
    "reference_sql": "SELECT b.tier, SUM(oi.quantity) AS units_sold, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS gross_revenue, ROUND(AVG(oi.unit_price), 2) AS avg_selling_price FROM brands b JOIN products p ON b.id = p.category_id JOIN order_items oi ON p.id = oi.product_id GROUP BY b.tier ORDER BY gross_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join brands -> products -> order_items.",
      "Group by brand tier.",
      "Compute SUM(quantity), SUM(quantity * unit_price), and AVG(unit_price).",
      "Order by gross_revenue DESC."
    ],
    "solution_explanation": "Benchmarks sales volume and price elasticity across brand tiers.",
    "xp": 60,
    "estimated_minutes": 13
  },
  {
    "id": "ecom-L1-098",
    "domain": "ecommerce",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Boss Audit #8: Returns & Customer Dissatisfaction Exposure",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Risk mitigation meeting: Marcus here. We must present our full returns exposure to the executive committee. Group return records by reason to calculate total refund claims, total refunded capital, average refund per incident, and minimum/maximum refund values, ordered from highest total refunded amount downward.",
    "context_notes": "Group returns by reason. Compute count, sum refund, avg refund, min refund, max refund. Order by total_refunded DESC.",
    "concepts": [
      "GROUP BY",
      "COUNT",
      "SUM",
      "AVG",
      "MIN",
      "MAX",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "reason",
      "claim_count",
      "total_refunded",
      "avg_refund",
      "max_refund"
    ],
    "reference_sql": "SELECT reason, COUNT(*) AS claim_count, ROUND(SUM(refund_amount), 2) AS total_refunded, ROUND(AVG(refund_amount), 2) AS avg_refund, MAX(refund_amount) AS max_refund FROM returns GROUP BY reason ORDER BY total_refunded DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Group returns by reason.",
      "Calculate COUNT(*), SUM(refund_amount), AVG(refund_amount), and MAX(refund_amount).",
      "Order by total_refunded DESC."
    ],
    "solution_explanation": "Quantifies warranty loss exposure and claim severity per return reason.",
    "xp": 60,
    "estimated_minutes": 12
  },
  {
    "id": "ecom-L1-099",
    "domain": "ecommerce",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Boss Audit #9: Verified Customer Sentiment & Satisfaction",
    "stakeholder": {
      "name": "Marcus Bell",
      "role": "Customer Success Lead"
    },
    "request": "Annual brand health check: We want to audit customer satisfaction across our merchandise lines. Join categories, products, and customer reviews from verified buyers to calculate review count and average satisfaction rating for each category, ordered highest rating first.",
    "context_notes": "Join categories, products, and customer_reviews WHERE is_verified_purchase = true. Group by category name. Compute count and avg rating. Order by avg_rating DESC.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "3-WAY JOIN",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_name",
      "verified_reviews",
      "avg_rating"
    ],
    "reference_sql": "SELECT c.name AS category_name, COUNT(r.id) AS verified_reviews, ROUND(AVG(r.rating), 2) AS avg_rating FROM categories c JOIN products p ON c.id = p.category_id JOIN customer_reviews r ON p.id = r.product_id WHERE r.is_verified_purchase = true GROUP BY c.name ORDER BY avg_rating DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join categories -> products -> customer_reviews.",
      "Filter where is_verified_purchase = true.",
      "Group by category name, calculate count and avg rating, order descending."
    ],
    "solution_explanation": "Benchmarks customer sentiment and verified review satisfaction by category.",
    "xp": 60,
    "estimated_minutes": 13
  },
  {
    "id": "ecom-L1-100",
    "domain": "ecommerce",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "Boss Audit #10: Enterprise OmniCart Master Ledger Audit",
    "stakeholder": {
      "name": "Alex Rivera",
      "role": "Chief Executive Officer"
    },
    "request": "The ultimate startup audit: Alex Rivera here. To conclude our Startup Stage at OmniCart Direct, I need an all-hands master ledger summary. Join customer accounts and completed delivered orders to compute our total delivered order volume, total enterprise revenue collected, average shipping fee per order, and average order transaction size, grouped by customer region, ordered from highest revenue market downward.",
    "context_notes": "Join customers and orders WHERE status = 'delivered'. Group by region. Compute delivered orders, total revenue, average shipping fee, and average transaction size. Order by total_revenue DESC.",
    "concepts": [
      "MULTI-TABLE JOIN",
      "WHERE",
      "GROUP BY",
      "COUNT",
      "SUM",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "region",
      "delivered_orders",
      "total_revenue",
      "avg_shipping_fee",
      "avg_order_value"
    ],
    "reference_sql": "SELECT c.region, COUNT(o.id) AS delivered_orders, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.shipping_fee), 2) AS avg_shipping_fee, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.region ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join customers and orders on c.id = o.customer_id.",
      "Filter where status = 'delivered'.",
      "Group by c.region.",
      "Calculate COUNT(o.id), SUM(total_amount), AVG(shipping_fee), and AVG(total_amount).",
      "Order by total_revenue DESC."
    ],
    "solution_explanation": "Final Level 1 culminating master audit evaluating OmniCart regional operations.",
    "xp": 75,
    "estimated_minutes": 15
  }
];
