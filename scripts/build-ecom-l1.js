const fs = require('fs');
const path = require('path');
const { PGlite } = require('@electric-sql/pglite');
const { generateDomainSql } = require('../src/lib/datasets/multi-domain-generators');

// Helper to create clean question objects
const q = (
  id,
  order,
  difficulty,
  title,
  stakeholderName,
  stakeholderRole,
  request,
  context_notes,
  concepts,
  expected_columns,
  reference_sql,
  order_sensitive,
  hints,
  solution_explanation,
  xp,
  estimated_minutes
) => ({
  id,
  domain: "ecommerce",
  level: 1,
  order,
  difficulty,
  title,
  stakeholder: {
    name: stakeholderName,
    role: stakeholderRole
  },
  request,
  context_notes: "",
  concepts,
  expected_columns,
  reference_sql,
  validation: {
    order_sensitive: order_sensitive === true,
    column_names_sensitive: false,
    numeric_tolerance: 0.01
  },
  hints: Array.isArray(hints) ? hints : [hints],
  solution_explanation,
  xp,
  estimated_minutes
});

function getAll100Questions() {
  const list = [];

  // -------------------------------------------------------------
  // WARM-UP (1-30): Single-table SELECT, WHERE filters, ORDER BY, LIMIT, DISTINCT
  // -------------------------------------------------------------
  list.push(q(
    "ecom-L1-001", 1, "warm-up", "Electronics Merchandise Catalog",
    "Alex Rivera", "Chief Executive Officer",
    "Ahead of our quarterly investor presentation, we need to inspect our current electronics merchandise catalog. Could you retrieve our active electronics products, showing what each item is called, its retail price, and warehouse stock units, sorted alphabetically by product name?",
    "Join products with categories to filter for 'Electronics'. Show name, price, and stock_quantity.",
    ["SELECT", "WHERE", "INNER JOIN", "ORDER BY"],
    ["name", "price", "stock_quantity"],
    "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Electronics' ORDER BY p.name ASC;",
    true,
    ["Join products with categories on category_id = categories.id.", "Filter where c.name = 'Electronics'.", "Order by p.name ASC."],
    "Retrieves all electronics products with price and stock levels.", 10, 3
  ));

  list.push(q(
    "ecom-L1-002", 2, "warm-up", "High-Value Delivered Orders",
    "Rachel Green", "VP of Sales & Growth",
    "Finance is reconciling our highest-value customer transactions from recent operations. Could you pull up all delivered orders that totaled $500 or more, ordered from our largest sales downward?",
    "Filter orders where status = 'delivered' and total_amount >= 500. Order by total_amount DESC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["id", "customer_id", "total_amount", "order_date"],
    "SELECT id, customer_id, total_amount, order_date FROM orders WHERE status = 'delivered' AND total_amount >= 500.00 ORDER BY total_amount DESC;",
    true,
    ["Filter orders on status = 'delivered' and total_amount >= 500.00.", "Order by total_amount DESC."],
    "Filters delivered orders exceeding $500, sorted by total amount descending.", 10, 3
  ));

  list.push(q(
    "ecom-L1-003", 3, "warm-up", "Customer Geographic Distribution",
    "Rachel Green", "VP of Sales & Growth",
    "We are planning regional fulfillment centers and need to understand where our customer accounts are located across the country. Please count how many shoppers we have registered in each geographic region, showing only regions with at least 2 registered customers, with our largest markets first.",
    "Group customers by region, calculate total customer count, filter using HAVING count >= 2, and sort descending.",
    ["SELECT", "GROUP BY", "HAVING", "COUNT", "ORDER BY"],
    ["region", "customer_count"],
    "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region HAVING COUNT(*) >= 2 ORDER BY customer_count DESC;",
    true,
    ["Use GROUP BY region.", "Calculate COUNT(*) AS customer_count.", "Filter with HAVING COUNT(*) >= 2 and ORDER BY customer_count DESC."],
    "Aggregates customer counts by regional territory.", 10, 4
  ));

  list.push(q(
    "ecom-L1-004", 4, "warm-up", "Northern Territory Customer Directory",
    "Rachel Green", "VP of Sales & Growth",
    "Our field marketing representatives are launching a targeted regional promotion in the North territory. Could you pull our registered customer directory for the North region, sorted alphabetically by surname then given name?",
    "Filter customers where region = 'North'. Sort by last_name ASC, first_name ASC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["first_name", "last_name", "email"],
    "SELECT first_name, last_name, email FROM customers WHERE region = 'North' ORDER BY last_name ASC, first_name ASC;",
    true,
    ["Filter customers WHERE region = 'North'.", "Order by last_name ASC, first_name ASC."],
    "Surfaces registered customers in the North territory.", 10, 3
  ));

  list.push(q(
    "ecom-L1-005", 5, "warm-up", "Apparel Low Stock Verification",
    "Liam Vance", "Fulfillment & Operations Manager",
    "The warehouse operations team is reviewing replenishment needs for our apparel line before peak season. Could you list all apparel merchandise items that currently have less than 200 units remaining on hand, with lowest stock items shown first?",
    "Join products and categories. Filter for 'Apparel' and stock_quantity < 200. Order by stock_quantity ASC.",
    ["SELECT", "WHERE", "INNER JOIN", "ORDER BY"],
    ["name", "price", "stock_quantity"],
    "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Apparel' AND p.stock_quantity < 200 ORDER BY p.stock_quantity ASC;",
    true,
    ["Join products with categories on category_id = categories.id.", "Filter where category is Apparel and stock_quantity < 200.", "Order by stock_quantity ASC."],
    "Lists low-stock apparel items to trigger replenishment orders.", 10, 4
  ));

  list.push(q(
    "ecom-L1-006", 6, "warm-up", "Postal Service Dispatched Consignments",
    "Liam Vance", "Fulfillment & Operations Manager",
    "USPS regional dispatch sent an inquiry regarding postal parcels sent out from our primary facility. Could you extract all shipments handled by USPS, sorted by shipment identifier?",
    "Query shipments where carrier = 'USPS'. Order by id ASC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["id", "order_id", "tracking_number"],
    "SELECT id, order_id, tracking_number FROM shipments WHERE carrier = 'USPS' ORDER BY id ASC;",
    true,
    ["Filter shipments WHERE carrier = 'USPS'.", "Order by id ASC."],
    "Retrieves postal logistics records for carrier verification.", 10, 3
  ));

  list.push(q(
    "ecom-L1-007", 7, "warm-up", "Mid-Tier Merchandise Pricing Audit",
    "Rachel Green", "VP of Sales & Growth",
    "Merchandising is curating a mid-tier promotional collection for our upcoming holiday catalog. Can you pull all products priced between $50 and $130, showing their name, retail price, and acquisition cost, sorted from highest price downward?",
    "Filter products where price BETWEEN 50 AND 130. Sort by price DESC.",
    ["SELECT", "WHERE", "BETWEEN", "ORDER BY"],
    ["name", "price", "cost"],
    "SELECT name, price, cost FROM products WHERE price BETWEEN 50.00 AND 130.00 ORDER BY price DESC;",
    true,
    ["Use WHERE price BETWEEN 50.00 AND 130.00.", "Order by price DESC."],
    "Identifies mid-tier products for promotional bundling.", 10, 3
  ));

  list.push(q(
    "ecom-L1-008", 8, "warm-up", "Verified Five-Star Product Reviews",
    "Marcus Bell", "Customer Success Lead",
    "Marketing wants to feature glowing testimonials on our homepage. Could you retrieve all five-star product reviews from verified buyers, ordered by review date so our freshest feedback appears first?",
    "Filter customer_reviews WHERE rating = 5 and is_verified_purchase = true. Order by review_date DESC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["product_id", "customer_id", "title", "review_date"],
    "SELECT product_id, customer_id, title, review_date FROM customer_reviews WHERE rating = 5 AND is_verified_purchase = true ORDER BY review_date DESC;",
    true,
    ["Filter where rating = 5 AND is_verified_purchase = true.", "Order by review_date DESC."],
    "Surfaces verified top customer reviews for marketing highlights.", 10, 3
  ));

  list.push(q(
    "ecom-L1-009", 9, "warm-up", "Active Promotional Discount Codes",
    "Rachel Green", "VP of Sales & Growth",
    "Our checkout team needs to audit active promotional codes currently valid in our store. Could you list all currently active coupons, showing their code, discount percentage, and total redemption limits, sorted by largest discount first?",
    "Filter coupons WHERE is_active = true. Order by discount_percent DESC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["code", "discount_percent", "max_uses", "current_uses"],
    "SELECT code, discount_percent, max_uses, current_uses FROM coupons WHERE is_active = true ORDER BY discount_percent DESC;",
    true,
    ["Filter WHERE is_active = true.", "Order by discount_percent DESC."],
    "Lists active coupon campaigns and usage limits.", 10, 3
  ));

  list.push(q(
    "ecom-L1-010", 10, "warm-up", "Express Priority Shipments via FedEx",
    "Liam Vance", "Fulfillment & Operations Manager",
    "We have a service review meeting with FedEx tomorrow morning. Could you retrieve all shipments assigned to FedEx that have already been dispatched, ordered by dispatch time with the newest departures first?",
    "Query shipments WHERE carrier = 'FedEx' AND shipped_at IS NOT NULL. Order by shipped_at DESC.",
    ["SELECT", "WHERE", "IS NOT NULL", "ORDER BY"],
    ["id", "order_id", "tracking_number", "shipped_at"],
    "SELECT id, order_id, tracking_number, shipped_at FROM shipments WHERE carrier = 'FedEx' AND shipped_at IS NOT NULL ORDER BY shipped_at DESC;",
    true,
    ["Filter carrier = 'FedEx' AND shipped_at IS NOT NULL.", "Order by shipped_at DESC."],
    "Extracts outbound FedEx express parcels for carrier review.", 10, 4
  ));

  list.push(q(
    "ecom-L1-011", 11, "warm-up", "Major Regional Distribution Centers",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Logistics is analyzing our regional storage footprint across fulfillment hubs. Could you list all warehouses with a storage capacity of at least 50,000 square feet, showing the facility name, city, state, and capacity, sorted from largest facility downward?",
    "Filter warehouses WHERE capacity_sqft >= 50000. Order by capacity_sqft DESC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["name", "city", "state", "capacity_sqft"],
    "SELECT name, city, state, capacity_sqft FROM warehouses WHERE capacity_sqft >= 50000 ORDER BY capacity_sqft DESC;",
    true,
    ["Filter warehouses where capacity_sqft >= 50000.", "Order by capacity_sqft DESC."],
    "Identifies high-capacity regional distribution facilities.", 10, 3
  ));

  list.push(q(
    "ecom-L1-012", 12, "warm-up", "Substantial Refund Requests Audit",
    "Marcus Bell", "Customer Success Lead",
    "Finance is reviewing customer refund velocity and high-impact payouts. Could you fetch all return claims where the refund amount reached $150 or more, ordered from largest refund downward?",
    "Filter returns WHERE refund_amount >= 150.00. Order by refund_amount DESC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["id", "order_id", "reason", "refund_amount", "status"],
    "SELECT id, order_id, reason, refund_amount, status FROM returns WHERE refund_amount >= 150.00 ORDER BY refund_amount DESC;",
    true,
    ["Filter returns where refund_amount >= 150.00.", "Order by refund_amount DESC."],
    "Surfaces large customer refunds for finance reconciliation.", 10, 3
  ));

  list.push(q(
    "ecom-L1-013", 13, "warm-up", "Urgent Customer Service Tickets",
    "Marcus Bell", "Customer Success Lead",
    "Our support team is clearing backlog items for dissatisfied shoppers. Please list all customer support tickets flagged with urgent or high priority that remain unresolved, ordered chronologically with the oldest pending tickets first.",
    "Filter support_tickets WHERE priority IN ('urgent', 'high') AND status <> 'resolved'. Order by created_at ASC.",
    ["SELECT", "WHERE", "IN", "ORDER BY"],
    ["id", "customer_id", "category", "priority", "status", "created_at"],
    "SELECT id, customer_id, category, priority, status, created_at FROM support_tickets WHERE priority IN ('urgent', 'high') AND status <> 'resolved' ORDER BY created_at ASC;",
    true,
    ["Filter priority IN ('urgent', 'high') AND status <> 'resolved'.", "Order by created_at ASC."],
    "Isolates unresolved high-priority customer support escalations.", 10, 4
  ));

  list.push(q(
    "ecom-L1-014", 14, "warm-up", "Premier Vetted Wholesale Suppliers",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Supply chain is renegotiating annual supplier contracts. Please bring up all commercial vendors with a quality rating of 4.5 or higher, showing the company name, headquarters country, contact email, and rating, ordered highest rating first.",
    "Filter suppliers WHERE rating >= 4.5. Order by rating DESC, company_name ASC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["company_name", "country", "contact_email", "rating"],
    "SELECT company_name, country, contact_email, rating FROM suppliers WHERE rating >= 4.5 ORDER BY rating DESC, company_name ASC;",
    true,
    ["Filter suppliers where rating >= 4.5.", "Order by rating DESC, company_name ASC."],
    "Lists top-rated wholesale manufacturing partners.", 10, 3
  ));

  list.push(q(
    "ecom-L1-015", 15, "warm-up", "Luxury and Premium Brand Partners",
    "Alex Rivera", "Chief Executive Officer",
    "Brand strategy wants to review our high-end manufacturing labels. Could you extract all brand partners classified under the luxury or premium tier, ordered by brand name alphabetically?",
    "Filter brands WHERE tier IN ('luxury', 'premium'). Order by name ASC.",
    ["SELECT", "WHERE", "IN", "ORDER BY"],
    ["name", "country_of_origin", "tier"],
    "SELECT name, country_of_origin, tier FROM brands WHERE tier IN ('luxury', 'premium') ORDER BY name ASC;",
    true,
    ["Filter brands where tier IN ('luxury', 'premium').", "Order by name ASC."],
    "Displays premium and luxury brand catalog affiliations.", 10, 3
  ));

  list.push(q(
    "ecom-L1-016", 16, "warm-up", "Multi-Unit Line Item Purchases",
    "Rachel Green", "VP of Sales & Growth",
    "Sales is auditing multi-unit purchasing habits across customer checkout baskets. Could you pull all order line items where a shopper purchased 3 units of an item in a single order line, ordered by unit price descending?",
    "Filter order_items WHERE quantity = 3. Order by unit_price DESC, order_id ASC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["order_id", "product_id", "quantity", "unit_price"],
    "SELECT order_id, product_id, quantity, unit_price FROM order_items WHERE quantity = 3 ORDER BY unit_price DESC, order_id ASC;",
    true,
    ["Filter order_items where quantity = 3.", "Order by unit_price DESC, order_id ASC."],
    "Surfaces multi-unit order items indicative of commercial purchasing.", 10, 4
  ));

  list.push(q(
    "ecom-L1-017", 17, "warm-up", "Pending Checkout Orders in Processing",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Warehouse dispatch is checking unfulfilled customer baskets. Can you retrieve all orders that currently hold a pending status, sorted by transaction timestamp with the earliest orders first?",
    "Filter orders WHERE status = 'pending'. Order by order_date ASC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["id", "customer_id", "total_amount", "order_date"],
    "SELECT id, customer_id, total_amount, order_date FROM orders WHERE status = 'pending' ORDER BY order_date ASC;",
    true,
    ["Filter orders where status = 'pending'.", "Order by order_date ASC."],
    "Finds orders currently waiting in fulfillment processing.", 10, 3
  ));

  list.push(q(
    "ecom-L1-018", 18, "warm-up", "Critically Depleted Warehouse Stock",
    "Liam Vance", "Fulfillment & Operations Manager",
    "We need an immediate stockout prevention sweep. Pull all catalog merchandise items that have less than 50 units remaining across our shelves, showing product title, retail price, and on-hand units, ordered lowest inventory first.",
    "Filter products WHERE stock_quantity < 50. Order by stock_quantity ASC, name ASC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["name", "price", "stock_quantity"],
    "SELECT name, price, stock_quantity FROM products WHERE stock_quantity < 50 ORDER BY stock_quantity ASC, name ASC;",
    true,
    ["Filter products where stock_quantity < 50.", "Order by stock_quantity ASC, name ASC."],
    "Identifies near-depleted stock items to trigger supplier reorders.", 10, 3
  ));

  list.push(q(
    "ecom-L1-019", 19, "warm-up", "Returned Customer Transactions",
    "Marcus Bell", "Customer Success Lead",
    "Customer service is tracking order reversal rates. Could you extract all orders that resulted in a returned status, sorted with our highest-value returned transactions first?",
    "Filter orders WHERE status = 'returned'. Order by total_amount DESC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["id", "customer_id", "total_amount", "order_date"],
    "SELECT id, customer_id, total_amount, order_date FROM orders WHERE status = 'returned' ORDER BY total_amount DESC;",
    true,
    ["Filter orders where status = 'returned'.", "Order by total_amount DESC."],
    "Tracks reversed transactions to isolate merchandise dissatisfaction.", 10, 3
  ));

  list.push(q(
    "ecom-L1-020", 20, "warm-up", "Defective Merchandise Return Reports",
    "Marcus Bell", "Customer Success Lead",
    "Quality control is inspecting items that failed after delivery. Pull all customer return records where the stated reason mentions defective merchandise, ordered by refund amount descending.",
    "Filter returns WHERE reason LIKE '%defect%'. Order by refund_amount DESC.",
    ["SELECT", "WHERE", "LIKE", "ORDER BY"],
    ["id", "order_id", "reason", "refund_amount"],
    "SELECT id, order_id, reason, refund_amount FROM returns WHERE reason LIKE '%defect%' ORDER BY refund_amount DESC;",
    true,
    ["Filter returns where reason LIKE '%defect%'.", "Order by refund_amount DESC."],
    "Identifies defective merchandise return complaints.", 10, 4
  ));

  list.push(q(
    "ecom-L1-021", 21, "warm-up", "California and Texas Logistics Hubs",
    "Liam Vance", "Fulfillment & Operations Manager",
    "To prepare for peak shipping volume rerouting, show me all distribution warehouses located in California and Texas, ordered by storage capacity descending.",
    "Filter warehouses WHERE state IN ('CA', 'TX'). Order by capacity_sqft DESC.",
    ["SELECT", "WHERE", "IN", "ORDER BY"],
    ["name", "city", "state", "capacity_sqft"],
    "SELECT name, city, state, capacity_sqft FROM warehouses WHERE state IN ('CA', 'TX') ORDER BY capacity_sqft DESC;",
    true,
    ["Filter warehouses where state IN ('CA', 'TX').", "Order by capacity_sqft DESC."],
    "Surfaces major fulfillment facilities in California and Texas.", 10, 4
  ));

  list.push(q(
    "ecom-L1-022", 22, "warm-up", "High-Discount Promotional Campaigns",
    "Rachel Green", "VP of Sales & Growth",
    "Our marketing team wants to review our most aggressive discount offers. List all coupons offering a discount of 20% or greater, ordered from highest discount percentage downward.",
    "Filter coupons WHERE discount_percent >= 20. Order by discount_percent DESC, code ASC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["code", "discount_percent", "is_active"],
    "SELECT code, discount_percent, is_active FROM coupons WHERE discount_percent >= 20 ORDER BY discount_percent DESC, code ASC;",
    true,
    ["Filter coupons where discount_percent >= 20.", "Order by discount_percent DESC, code ASC."],
    "Lists promotional discount vouchers with substantial price cuts.", 10, 3
  ));

  list.push(q(
    "ecom-L1-023", 23, "warm-up", "Parcel Shipments Handled by UPS",
    "Liam Vance", "Fulfillment & Operations Manager",
    "UPS logistics dispatch is auditing delivery manifests. Could you pull up all shipments handled by UPS that have been successfully delivered, sorted by delivery time with recent deliveries first?",
    "Filter shipments WHERE carrier = 'UPS' AND delivered_at IS NOT NULL. Order by delivered_at DESC.",
    ["SELECT", "WHERE", "IS NOT NULL", "ORDER BY"],
    ["id", "order_id", "tracking_number", "delivered_at"],
    "SELECT id, order_id, tracking_number, delivered_at FROM shipments WHERE carrier = 'UPS' AND delivered_at IS NOT NULL ORDER BY delivered_at DESC;",
    true,
    ["Filter carrier = 'UPS' AND delivered_at IS NOT NULL.", "Order by delivered_at DESC."],
    "Reviews completed parcel handoffs for UPS shipments.", 10, 4
  ));

  list.push(q(
    "ecom-L1-024", 24, "warm-up", "Western Territory Customer Accounts",
    "Rachel Green", "VP of Sales & Growth",
    "Our West Coast regional sales director is preparing outreach to local shoppers. Retrieve our registered customer accounts from the West region, sorted alphabetically by surname.",
    "Filter customers WHERE region = 'West'. Order by last_name ASC, first_name ASC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["first_name", "last_name", "email", "created_at"],
    "SELECT first_name, last_name, email, created_at FROM customers WHERE region = 'West' ORDER BY last_name ASC, first_name ASC;",
    true,
    ["Filter customers where region = 'West'.", "Order by last_name ASC, first_name ASC."],
    "Retrieves customer roster for the Western region.", 10, 3
  ));

  list.push(q(
    "ecom-L1-025", 25, "warm-up", "Critical Open Billing Support Tickets",
    "Marcus Bell", "Customer Success Lead",
    "Our billing support team needs to address unresolved payment inquiries. Extract all support tickets under the billing category that remain open, sorted with our earliest unresolved issues first.",
    "Filter support_tickets WHERE category = 'billing' AND status = 'open'. Order by created_at ASC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["id", "customer_id", "priority", "created_at"],
    "SELECT id, customer_id, priority, created_at FROM support_tickets WHERE category = 'billing' AND status = 'open' ORDER BY created_at ASC;",
    true,
    ["Filter category = 'billing' AND status = 'open'.", "Order by created_at ASC."],
    "Surfaces unresolved customer billing disputes.", 10, 4
  ));

  list.push(q(
    "ecom-L1-026", 26, "warm-up", "International Supply Chain Partners",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Customs and tariffs compliance is compiling a manifest of foreign manufacturing partners. Show all suppliers based outside the USA, ordered by vendor reliability score descending.",
    "Filter suppliers WHERE country <> 'USA'. Order by rating DESC, company_name ASC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["company_name", "country", "rating"],
    "SELECT company_name, country, rating FROM suppliers WHERE country <> 'USA' ORDER BY rating DESC, company_name ASC;",
    true,
    ["Filter suppliers where country <> 'USA'.", "Order by rating DESC, company_name ASC."],
    "Identifies overseas manufacturers subject to international freight customs.", 10, 3
  ));

  list.push(q(
    "ecom-L1-027", 27, "warm-up", "Budget-Friendly Essential Merchandise",
    "Rachel Green", "VP of Sales & Growth",
    "To support an introductory marketing campaign, pull all catalog products priced under $30.00, sorted from lowest price upward so shoppers see our most affordable entry points.",
    "Filter products WHERE price < 30.00. Order by price ASC, name ASC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["name", "price", "stock_quantity"],
    "SELECT name, price, stock_quantity FROM products WHERE price < 30.00 ORDER BY price ASC, name ASC;",
    true,
    ["Filter products where price < 30.00.", "Order by price ASC, name ASC."],
    "Surfaces entry-level price point merchandise.", 10, 3
  ));

  list.push(q(
    "ecom-L1-028", 28, "warm-up", "Corporate Department Leadership Directory",
    "Alex Rivera", "Chief Executive Officer",
    "Executive leadership is updating our internal corporate org chart. Retrieve all company operational departments with their designated department head, ordered alphabetically by department title.",
    "Query departments table. Order by name ASC.",
    ["SELECT", "ORDER BY"],
    ["name", "head_name"],
    "SELECT name, head_name FROM departments ORDER BY name ASC;",
    true,
    ["Select name, head_name from departments.", "Order by name ASC."],
    "Provides executive operating department roster.", 10, 3
  ));

  list.push(q(
    "ecom-L1-029", 29, "warm-up", "Moderate Customer Review Feedback",
    "Marcus Bell", "Customer Success Lead",
    "Our customer experience team wants to review neutral customer feedback to identify opportunities for delight. Pull all product reviews where the customer left a 3-star rating, ordered by review timestamp with newest reviews first.",
    "Filter customer_reviews WHERE rating = 3. Order by review_date DESC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["product_id", "customer_id", "rating", "title", "review_date"],
    "SELECT product_id, customer_id, rating, title, review_date FROM customer_reviews WHERE rating = 3 ORDER BY review_date DESC;",
    true,
    ["Filter customer_reviews where rating = 3.", "Order by review_date DESC."],
    "Isolates neutral 3-star customer reviews for experience improvements.", 10, 4
  ));

  list.push(q(
    "ecom-L1-030", 30, "warm-up", "Low-Cost Shipping Deliveries",
    "Rachel Green", "VP of Sales & Growth",
    "Sales is evaluating the popularity of our standard shipping promotion. Retrieve all completed orders where the shipping fee was under $5.00, ordered from largest order value downward.",
    "Filter orders WHERE shipping_fee < 5.00 AND status = 'delivered'. Order by total_amount DESC.",
    ["SELECT", "WHERE", "ORDER BY"],
    ["id", "customer_id", "total_amount", "shipping_fee"],
    "SELECT id, customer_id, total_amount, shipping_fee FROM orders WHERE shipping_fee < 5.00 AND status = 'delivered' ORDER BY total_amount DESC;",
    true,
    ["Filter orders where shipping_fee < 5.00 and status = 'delivered'.", "Order by total_amount DESC."],
    "Surfaces orders qualifying for low-cost delivery promotion.", 10, 4
  ));

  // =========================================================================
  // CORE (31-70): Aggregations, GROUP BY, HAVING, COUNT, SUM, AVG, MIN, MAX
  // =========================================================================

  list.push(q(
    "ecom-L1-031", 31, "core", "System-wide Order Status Breakdown",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Operations is reviewing our order processing pipeline. Could you aggregate all orders by their current fulfillment status, showing how many orders are in each status and the average shipping fee charged, sorted with our highest volume statuses first?",
    "Group orders by status, count orders, round average shipping fee to 2 decimals, order by order_count DESC.",
    ["SELECT", "GROUP BY", "COUNT", "AVG", "ROUND", "ORDER BY"],
    ["status", "order_count", "avg_shipping_fee"],
    "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders GROUP BY status ORDER BY order_count DESC;",
    true,
    ["Group by status.", "Calculate COUNT(*) AS order_count and ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee.", "Order by order_count DESC."],
    "Breaks down orders across lifecycle stages with average shipping cost.", 20, 5
  ));

  list.push(q(
    "ecom-L1-032", 32, "core", "Logistics Carrier Parcel Workload",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Logistics is balancing carrier quotas across our freight partners. Please calculate the total number of shipments assigned to each carrier, ordered from our busiest carrier downward.",
    "Group shipments by carrier and calculate shipment count. Order by shipment_count DESC.",
    ["SELECT", "GROUP BY", "COUNT", "ORDER BY"],
    ["carrier", "shipment_count"],
    "SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier ORDER BY shipment_count DESC;",
    true,
    ["Group by carrier.", "Calculate COUNT(*) AS shipment_count.", "Order by shipment_count DESC."],
    "Measures shipment allocation across logistics partners.", 20, 4
  ));

  list.push(q(
    "ecom-L1-033", 33, "core", "Merchandise Pricing by Category",
    "Rachel Green", "VP of Sales & Growth",
    "Merchandising is analyzing price tiering across our store categories. Group our catalog by category to compute the total product count, minimum retail price, maximum retail price, and average price per category, sorted with our highest average prices first.",
    "Join categories and products. Group by category name. Compute count, min price, max price, and round avg price to 2 decimals. Order by avg_price DESC.",
    ["SELECT", "INNER JOIN", "GROUP BY", "COUNT", "MIN", "MAX", "AVG", "ORDER BY"],
    ["category_name", "product_count", "min_price", "max_price", "avg_price"],
    "SELECT c.name AS category_name, COUNT(p.id) AS product_count, MIN(p.price) AS min_price, MAX(p.price) AS max_price, ROUND(AVG(p.price), 2) AS avg_price FROM categories c JOIN products p ON c.id = p.category_id GROUP BY c.name ORDER BY avg_price DESC;",
    true,
    ["Join categories and products on category_id.", "Group by c.name.", "Compute COUNT, MIN, MAX, and AVG.", "Order by avg_price DESC."],
    "Profiles catalog pricing distributions across merchandise categories.", 20, 5
  ));

  list.push(q(
    "ecom-L1-034", 34, "core", "Regional Delivered Sales & Order Volume",
    "Rachel Green", "VP of Sales & Growth",
    "Executive management needs regional sales revenue numbers for board reporting. Link customers and delivered orders to calculate total completed order count and total revenue generated for each geographic region, ordered by revenue descending.",
    "Join customers and orders. Filter where status = 'delivered'. Group by region. Calculate order_count and sum total_amount. Order by total_revenue DESC.",
    ["SELECT", "INNER JOIN", "WHERE", "GROUP BY", "COUNT", "SUM", "ORDER BY"],
    ["region", "order_count", "total_revenue"],
    "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.region ORDER BY total_revenue DESC;",
    true,
    ["Join customers and orders on c.id = o.customer_id.", "Filter where status = 'delivered'.", "Group by c.region and order by total_revenue DESC."],
    "Analyzes regional revenue contributions across delivered transactions.", 20, 5
  ));

  list.push(q(
    "ecom-L1-035", 35, "core", "Warehouse Storage Capacity by State",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Real estate operations is reviewing regional warehouse footprints. Summarize our physical distribution centers by state, displaying the number of facilities and combined square footage in each state, ordered by total capacity descending.",
    "Group warehouses by state. Compute warehouse_count and sum capacity_sqft. Order by total_capacity DESC.",
    ["SELECT", "GROUP BY", "COUNT", "SUM", "ORDER BY"],
    ["state", "warehouse_count", "total_capacity"],
    "SELECT state, COUNT(*) AS warehouse_count, SUM(capacity_sqft) AS total_capacity FROM warehouses GROUP BY state ORDER BY total_capacity DESC;",
    true,
    ["Group by state.", "Calculate COUNT(*) AS warehouse_count and SUM(capacity_sqft) AS total_capacity.", "Order by total_capacity DESC."],
    "Summarizes physical storage capacity across regional states.", 20, 4
  ));

  list.push(q(
    "ecom-L1-036", 36, "core", "Customer Return Reasons Breakdown",
    "Marcus Bell", "Customer Success Lead",
    "Customer success is conducting a post-mortem on return claims. Group customer returns by their stated reason, computing the total number of returns and total dollars refunded, ordered with our most common return reasons first.",
    "Group returns by reason. Calculate return_count and sum refund_amount. Order by return_count DESC.",
    ["SELECT", "GROUP BY", "COUNT", "SUM", "ORDER BY"],
    ["reason", "return_count", "total_refunded"],
    "SELECT reason, COUNT(*) AS return_count, ROUND(SUM(refund_amount), 2) AS total_refunded FROM returns GROUP BY reason ORDER BY return_count DESC;",
    true,
    ["Group by reason.", "Calculate COUNT(*) and SUM(refund_amount).", "Order by return_count DESC."],
    "Breaks down return root causes and associated refund liabilities.", 20, 4
  ));

  list.push(q(
    "ecom-L1-037", 37, "core", "Customer Review Ratings per Product",
    "Marcus Bell", "Customer Success Lead",
    "Merchandising wants to identify which products are generating the highest customer satisfaction. Join products and customer reviews to compute the total review count and average rating for each reviewed item, showing only products with at least 2 reviews, sorted highest rating first.",
    "Join products and customer_reviews. Group by product id and name. Filter with HAVING COUNT >= 2. Order by avg_rating DESC.",
    ["SELECT", "INNER JOIN", "GROUP BY", "HAVING", "COUNT", "AVG", "ORDER BY"],
    ["product_name", "review_count", "avg_rating"],
    "SELECT p.name AS product_name, COUNT(r.id) AS review_count, ROUND(AVG(r.rating), 2) AS avg_rating FROM products p JOIN customer_reviews r ON p.id = r.product_id GROUP BY p.id, p.name HAVING COUNT(r.id) >= 2 ORDER BY avg_rating DESC;",
    true,
    ["Join products with customer_reviews on p.id = r.product_id.", "Group by p.id, p.name.", "Filter HAVING COUNT(r.id) >= 2 and order by avg_rating DESC."],
    "Measures customer satisfaction ratings across catalog products.", 20, 5
  ));

  list.push(q(
    "ecom-L1-038", 38, "core", "Support Ticket Volume by Category",
    "Marcus Bell", "Customer Success Lead",
    "Support staffing needs to forecast staffing requirements across help desk queues. Group customer support tickets by category to display ticket volume, ordered from our busiest support queue downward.",
    "Group support_tickets by category and compute count. Order by ticket_count DESC.",
    ["SELECT", "GROUP BY", "COUNT", "ORDER BY"],
    ["category", "ticket_count"],
    "SELECT category, COUNT(*) AS ticket_count FROM support_tickets GROUP BY category ORDER BY ticket_count DESC;",
    true,
    ["Group by category.", "Calculate COUNT(*) AS ticket_count.", "Order by ticket_count DESC."],
    "Quantifies customer support workload across operational categories.", 20, 4
  ));

  list.push(q(
    "ecom-L1-039", 39, "core", "Brand Distribution Across Catalog Tiers",
    "Alex Rivera", "Chief Executive Officer",
    "Brand partnerships is reviewing our retail positioning across marketplace tiers. Count how many brands belong to each brand tier, ordered with our most prevalent tier first.",
    "Group brands by tier and count brands. Order by brand_count DESC.",
    ["SELECT", "GROUP BY", "COUNT", "ORDER BY"],
    ["tier", "brand_count"],
    "SELECT tier, COUNT(*) AS brand_count FROM brands GROUP BY tier ORDER BY brand_count DESC;",
    true,
    ["Group by tier.", "Calculate COUNT(*) AS brand_count.", "Order by brand_count DESC."],
    "Shows marketplace brand representation across positioning tiers.", 20, 4
  ));

  list.push(q(
    "ecom-L1-040", 40, "core", "Wholesale Supplier Reliability by Country",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Supply chain resilience is evaluating international manufacturing risk. Group suppliers by headquarters country to display supplier count and average vendor rating, ordered highest average rating first.",
    "Group suppliers by country. Calculate count and avg rating. Order by avg_rating DESC.",
    ["SELECT", "GROUP BY", "COUNT", "AVG", "ORDER BY"],
    ["country", "supplier_count", "avg_rating"],
    "SELECT country, COUNT(*) AS supplier_count, ROUND(AVG(rating), 2) AS avg_rating FROM suppliers GROUP BY country ORDER BY avg_rating DESC;",
    true,
    ["Group by country.", "Calculate COUNT(*) and ROUND(AVG(rating), 2).", "Order by avg_rating DESC."],
    "Benchmarks vendor performance across geographic jurisdictions.", 20, 5
  ));

  list.push(q(
    "ecom-L1-041", 41, "core", "Total Units Ordered per Product SKU",
    "Rachel Green", "VP of Sales & Growth",
    "Sales wants to rank our best-selling merchandise by volume. Join products and order line items to calculate the total units sold for each product, showing only products with at least 10 units sold, ordered from highest unit sales downward.",
    "Join products and order_items. Group by product id and name. Filter with HAVING SUM(quantity) >= 10. Order by total_units_sold DESC.",
    ["SELECT", "INNER JOIN", "GROUP BY", "HAVING", "SUM", "ORDER BY"],
    ["product_name", "total_units_sold"],
    "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 10 ORDER BY total_units_sold DESC;",
    true,
    ["Join products and order_items on p.id = oi.product_id.", "Group by p.id, p.name.", "Filter with HAVING SUM(oi.quantity) >= 10 and order descending."],
    "Ranks top product SKUs by aggregate sales volume.", 20, 5
  ));

  list.push(q(
    "ecom-L1-042", 42, "core", "Completed Purchases per Customer",
    "Rachel Green", "VP of Sales & Growth",
    "Loyalty marketing is identifying repeat buyers who have placed multiple successful orders. Join customers and orders to calculate how many delivered orders each customer has placed, showing only shoppers with at least 3 delivered orders, sorted from highest order frequency downward.",
    "Join customers and orders. Filter where status = 'delivered'. Group by customer id, first_name, last_name. Filter HAVING count >= 3. Order by delivered_orders DESC.",
    ["SELECT", "INNER JOIN", "WHERE", "GROUP BY", "HAVING", "COUNT", "ORDER BY"],
    ["first_name", "last_name", "delivered_orders"],
    "SELECT c.first_name, c.last_name, COUNT(o.id) AS delivered_orders FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name HAVING COUNT(o.id) >= 3 ORDER BY delivered_orders DESC;",
    true,
    ["Join customers and orders on c.id = o.customer_id.", "Filter where status = 'delivered'.", "Group by c.id, c.first_name, c.last_name HAVING COUNT(o.id) >= 3."],
    "Surfaces loyal repeat buyers with high completed transaction frequency.", 20, 5
  ));

  list.push(q(
    "ecom-L1-043", 43, "core", "Promotional Coupon Redemption Rates",
    "Rachel Green", "VP of Sales & Growth",
    "Growth marketing is evaluating coupon voucher engagement. For all active coupons, calculate how many uses remain available before hitting the campaign ceiling, sorted with the most heavily redeemed coupons first.",
    "Query coupons WHERE is_active = true. Calculate (max_uses - current_uses) as remaining_uses. Order by current_uses DESC.",
    ["SELECT", "WHERE", "ARITHMETIC", "ORDER BY"],
    ["code", "discount_percent", "current_uses", "remaining_uses"],
    "SELECT code, discount_percent, current_uses, (max_uses - current_uses) AS remaining_uses FROM coupons WHERE is_active = true ORDER BY current_uses DESC;",
    true,
    ["Filter coupons where is_active = true.", "Calculate (max_uses - current_uses) AS remaining_uses.", "Order by current_uses DESC."],
    "Analyzes coupon usage and remaining promotional headroom.", 20, 4
  ));

  list.push(q(
    "ecom-L1-044", 44, "core", "Departmental Product Portfolio Size",
    "Alex Rivera", "Chief Executive Officer",
    "Executive leadership is assessing the breadth of merchandise curated by each internal department. Link departments, categories, and products to calculate total catalog products managed by each department, ordered from largest department downward.",
    "Join departments, categories, and products. Group by department name. Calculate product count. Order by total_products DESC.",
    ["SELECT", "INNER JOIN", "3-WAY JOIN", "GROUP BY", "COUNT", "ORDER BY"],
    ["department_name", "total_products"],
    "SELECT d.name AS department_name, COUNT(p.id) AS total_products FROM departments d JOIN categories c ON d.id = c.department_id JOIN products p ON c.id = p.category_id GROUP BY d.id, d.name ORDER BY total_products DESC;",
    true,
    ["Join departments to categories, then categories to products.", "Group by d.id, d.name.", "Order by total_products DESC."],
    "Quantifies product portfolio scope across corporate operating departments.", 20, 6
  ));

  list.push(q(
    "ecom-L1-045", 45, "core", "High Basket Size Customer Orders",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Packaging operations needs to know which customer orders contain the largest physical quantities of goods. Join orders and order line items to calculate the total units in each order, showing only orders with at least 8 items, ordered from highest unit count downward.",
    "Join orders and order_items. Group by order_id, order_date, status. Filter HAVING SUM(quantity) >= 8. Order by total_items DESC.",
    ["SELECT", "INNER JOIN", "GROUP BY", "HAVING", "SUM", "ORDER BY"],
    ["order_id", "status", "total_items"],
    "SELECT oi.order_id, o.status, SUM(oi.quantity) AS total_items FROM order_items oi JOIN orders o ON oi.order_id = o.id GROUP BY oi.order_id, o.status HAVING SUM(oi.quantity) >= 8 ORDER BY total_items DESC;",
    true,
    ["Join order_items and orders on oi.order_id = o.id.", "Group by oi.order_id, o.status.", "Filter HAVING SUM(oi.quantity) >= 8 and order descending."],
    "Surfaces large multi-item orders requiring heavy freight packaging.", 20, 5
  ));

  list.push(q(
    "ecom-L1-046", 46, "core", "Average Customer Spend by Regional Market",
    "Rachel Green", "VP of Sales & Growth",
    "Pricing strategy is benchmarking consumer purchasing power across regional territories. Join customers and orders to calculate the average transaction value per completed order in each region, ordered with our highest-spending regions first.",
    "Join customers and orders. Filter where status = 'delivered'. Group by region. Compute average total_amount rounded to 2 decimals. Order by avg_order_value DESC.",
    ["SELECT", "INNER JOIN", "WHERE", "GROUP BY", "AVG", "ROUND", "ORDER BY"],
    ["region", "avg_order_value"],
    "SELECT c.region, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.region ORDER BY avg_order_value DESC;",
    true,
    ["Join customers and orders on c.id = o.customer_id.", "Filter where status = 'delivered'.", "Group by region and order by avg_order_value DESC."],
    "Calculates regional purchasing power across delivered transactions.", 20, 5
  ));

  list.push(q(
    "ecom-L1-047", 47, "core", "Completed Deliveries Breakdown by Carrier",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Carrier logistics review: For each carrier partner, count how many parcels have been successfully marked as delivered, ordered by total delivered volume descending.",
    "Filter shipments WHERE delivered_at IS NOT NULL. Group by carrier. Calculate delivered_count. Order by delivered_count DESC.",
    ["SELECT", "WHERE", "IS NOT NULL", "GROUP BY", "COUNT", "ORDER BY"],
    ["carrier", "delivered_count"],
    "SELECT carrier, COUNT(*) AS delivered_count FROM shipments WHERE delivered_at IS NOT NULL GROUP BY carrier ORDER BY delivered_count DESC;",
    true,
    ["Filter where delivered_at IS NOT NULL.", "Group by carrier and calculate COUNT(*).", "Order by delivered_count DESC."],
    "Tracks completed delivery throughput across freight carrier services.", 20, 4
  ));

  list.push(q(
    "ecom-L1-048", 48, "core", "Customer Returns by Processing Status",
    "Marcus Bell", "Customer Success Lead",
    "The customer operations desk is managing customer claims workflow. Group all customer return requests by their processing status, calculating total returns and total refund value, ordered from highest claim count downward.",
    "Group returns by status. Calculate return_count and sum refund_amount. Order by return_count DESC.",
    ["SELECT", "GROUP BY", "COUNT", "SUM", "ROUND", "ORDER BY"],
    ["status", "return_count", "total_refund_amount"],
    "SELECT status, COUNT(*) AS return_count, ROUND(SUM(refund_amount), 2) AS total_refund_amount FROM returns GROUP BY status ORDER BY return_count DESC;",
    true,
    ["Group by status.", "Calculate COUNT(*) and ROUND(SUM(refund_amount), 2).", "Order by return_count DESC."],
    "Monitors pipeline velocity across return approval stages.", 20, 4
  ));

  list.push(q(
    "ecom-L1-049", 49, "core", "Support Escalations Across Priority Tiers",
    "Marcus Bell", "Customer Success Lead",
    "Customer service management is reviewing incoming ticket severity. Group our support ticket records by priority tier to calculate ticket counts and unresolved tickets still open, ordered by priority count descending.",
    "Group support_tickets by priority. Calculate total tickets and count where status = 'open'. Order by total_tickets DESC.",
    ["SELECT", "GROUP BY", "COUNT", "ORDER BY"],
    ["priority", "total_tickets"],
    "SELECT priority, COUNT(*) AS total_tickets FROM support_tickets GROUP BY priority ORDER BY total_tickets DESC;",
    true,
    ["Group by priority.", "Calculate COUNT(*) AS total_tickets.", "Order by total_tickets DESC."],
    "Profiles customer ticket inflow by operational severity.", 20, 4
  ));

  list.push(q(
    "ecom-L1-050", 50, "core", "Average Profit Margin Spread by Category",
    "Alex Rivera", "Chief Executive Officer",
    "Corporate finance needs a profitability scan across merchandise sectors. For each category, join products to compute the average unit gross profit (retail price minus cost), sorted from our most profitable product lines downward.",
    "Join categories and products. Group by category name. Compute ROUND(AVG(price - cost), 2). Order by avg_unit_profit DESC.",
    ["SELECT", "INNER JOIN", "GROUP BY", "ARITHMETIC", "AVG", "ROUND", "ORDER BY"],
    ["category_name", "avg_unit_profit"],
    "SELECT c.name AS category_name, ROUND(AVG(p.price - p.cost), 2) AS avg_unit_profit FROM categories c JOIN products p ON c.id = p.category_id GROUP BY c.name ORDER BY avg_unit_profit DESC;",
    true,
    ["Join categories and products on category_id.", "Calculate AVG(price - cost) rounded to 2 decimals.", "Order by avg_unit_profit DESC."],
    "Evaluates baseline product margin profitability by category.", 20, 5
  ));

  list.push(q(
    "ecom-L1-051", 51, "core", "Total Revenue Generated per Product",
    "Rachel Green", "VP of Sales & Growth",
    "Sales leadership is evaluating SKU revenue contributions. Join products and order line items to calculate the total dollar revenue generated by each product, showing only products that have generated over $500 in total sales, ordered highest revenue first.",
    "Join products and order_items. Group by product id and name. Compute SUM(quantity * unit_price). Filter HAVING revenue > 500. Order by total_revenue DESC.",
    ["SELECT", "INNER JOIN", "GROUP BY", "HAVING", "SUM", "ROUND", "ORDER BY"],
    ["product_name", "total_revenue"],
    "SELECT p.name AS product_name, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity * oi.unit_price) > 500.00 ORDER BY total_revenue DESC;",
    true,
    ["Join products and order_items on p.id = oi.product_id.", "Calculate SUM(quantity * unit_price).", "Filter HAVING SUM > 500.00 and order descending."],
    "Identifies top revenue-producing product items.", 20, 6
  ));

  list.push(q(
    "ecom-L1-052", 52, "core", "Wholesale Supplier Product Catalog Footprint",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Procurement is evaluating single-supplier dependency risks. Group inventory records by warehouse to find the total units of inventory stored in each warehouse facility, ordered from largest stored quantity downward.",
    "Group inventory by warehouse_id. Calculate sum quantity_on_hand. Order by total_stored_units DESC.",
    ["SELECT", "GROUP BY", "SUM", "ORDER BY"],
    ["warehouse_id", "total_stored_units"],
    "SELECT warehouse_id, SUM(quantity_on_hand) AS total_stored_units FROM inventory GROUP BY warehouse_id ORDER BY total_stored_units DESC;",
    true,
    ["Group by warehouse_id.", "Calculate SUM(quantity_on_hand) AS total_stored_units.", "Order by total_stored_units DESC."],
    "Tracks inventory physical concentration across fulfillment hubs.", 20, 4
  ));

  list.push(q(
    "ecom-L1-053", 53, "core", "Reserved Stock vs Physical Inventory",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Warehouse logistics is evaluating committed stock buffers. Group inventory records by warehouse to calculate total available stock on hand and total stock reserved for unfulfilled orders, ordered by warehouse identifier.",
    "Group inventory by warehouse_id. Calculate SUM(quantity_on_hand) and SUM(reserved_quantity). Order by warehouse_id ASC.",
    ["SELECT", "GROUP BY", "SUM", "ORDER BY"],
    ["warehouse_id", "total_on_hand", "total_reserved"],
    "SELECT warehouse_id, SUM(quantity_on_hand) AS total_on_hand, SUM(reserved_quantity) AS total_reserved FROM inventory GROUP BY warehouse_id ORDER BY warehouse_id ASC;",
    true,
    ["Group by warehouse_id.", "Sum quantity_on_hand and reserved_quantity.", "Order by warehouse_id ASC."],
    "Audits allocated vs unallocated warehouse inventory.", 20, 4
  ));

  list.push(q(
    "ecom-L1-054", 54, "core", "Central Territory Order Performance",
    "Rachel Green", "VP of Sales & Growth",
    "The regional sales manager for Central wants to review completed delivery volume and sales dollars. Link customers and delivered orders in the Central region, calculating completed order count and total sales revenue.",
    "Join customers and orders where region = 'Central' and status = 'delivered'. Group by region.",
    ["SELECT", "INNER JOIN", "WHERE", "GROUP BY", "COUNT", "SUM"],
    ["region", "order_count", "total_revenue"],
    "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = 'Central' AND o.status = 'delivered' GROUP BY c.region;",
    false,
    ["Join customers and orders on c.id = o.customer_id.", "Filter where region = 'Central' and status = 'delivered'.", "Group by region."],
    "Summarizes operational sales in the Central territory.", 20, 5
  ));

  list.push(q(
    "ecom-L1-055", 55, "core", "High-Volume Delivery Months",
    "Rachel Green", "VP of Sales & Growth",
    "Finance is reviewing quarterly sales momentum. Count how many completed orders were placed in each status category with an order value of at least $100, ordered from highest volume status downward.",
    "Filter orders WHERE total_amount >= 100.00. Group by status. Calculate order_count. Order by order_count DESC.",
    ["SELECT", "WHERE", "GROUP BY", "COUNT", "ORDER BY"],
    ["status", "order_count"],
    "SELECT status, COUNT(*) AS order_count FROM orders WHERE total_amount >= 100.00 GROUP BY status ORDER BY order_count DESC;",
    true,
    ["Filter orders where total_amount >= 100.00.", "Group by status and count orders.", "Order by order_count DESC."],
    "Surfaces distribution of triple-digit transactions across order statuses.", 20, 4
  ));

  list.push(q(
    "ecom-L1-056", 56, "core", "Verified Customer Feedback by Star Rating",
    "Marcus Bell", "Customer Success Lead",
    "Product quality is reviewing authentic customer feedback ratings. Group verified buyer reviews by their numerical star rating, calculating how many reviews each star level received, ordered from 5 stars downward.",
    "Filter customer_reviews WHERE is_verified_purchase = true. Group by rating. Calculate review_count. Order by rating DESC.",
    ["SELECT", "WHERE", "GROUP BY", "COUNT", "ORDER BY"],
    ["rating", "review_count"],
    "SELECT rating, COUNT(*) AS review_count FROM customer_reviews WHERE is_verified_purchase = true GROUP BY rating ORDER BY rating DESC;",
    true,
    ["Filter where is_verified_purchase = true.", "Group by rating and count reviews.", "Order by rating DESC."],
    "Profiles customer review distribution among verified purchasers.", 20, 4
  ));

  list.push(q(
    "ecom-L1-057", 57, "core", "Average Refund Amount per Return Reason",
    "Marcus Bell", "Customer Success Lead",
    "Finance is auditing warranty and return claims. Group return claims by reason to determine the average dollar amount refunded per claim, ordered from highest average refund downward.",
    "Group returns by reason. Compute ROUND(AVG(refund_amount), 2). Order by avg_refund DESC.",
    ["SELECT", "GROUP BY", "AVG", "ROUND", "ORDER BY"],
    ["reason", "avg_refund"],
    "SELECT reason, ROUND(AVG(refund_amount), 2) AS avg_refund FROM returns GROUP BY reason ORDER BY avg_refund DESC;",
    true,
    ["Group by reason.", "Calculate ROUND(AVG(refund_amount), 2) AS avg_refund.", "Order by avg_refund DESC."],
    "Evaluates average financial liability per return category.", 20, 4
  ));

  list.push(q(
    "ecom-L1-058", 58, "core", "Multiple Support Inquiries by Customer",
    "Marcus Bell", "Customer Success Lead",
    "Customer success is identifying high-friction accounts experiencing multiple operational issues. Group support tickets by customer to find any customers who have submitted at least 2 separate support tickets, ordered by ticket volume descending.",
    "Group support_tickets by customer_id. Filter with HAVING count >= 2. Order by ticket_count DESC.",
    ["SELECT", "GROUP BY", "HAVING", "COUNT", "ORDER BY"],
    ["customer_id", "ticket_count"],
    "SELECT customer_id, COUNT(*) AS ticket_count FROM support_tickets GROUP BY customer_id HAVING COUNT(*) >= 2 ORDER BY ticket_count DESC;",
    true,
    ["Group by customer_id.", "Filter HAVING COUNT(*) >= 2.", "Order by ticket_count DESC."],
    "Identifies frequent support contact customers requiring proactive outreach.", 20, 4
  ));

  list.push(q(
    "ecom-L1-059", 59, "core", "Domestic vs International Supplier Counts",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Logistics is analyzing domestic supply chain resilience. Group suppliers by origin classification — categorizing suppliers in the USA as Domestic and all others as International — showing supplier count in each group, ordered by count descending.",
    "Group suppliers using CASE WHEN country = 'USA' THEN 'Domestic' ELSE 'International' END. Count suppliers. Order by supplier_count DESC.",
    ["SELECT", "CASE WHEN", "GROUP BY", "COUNT", "ORDER BY"],
    ["supplier_origin", "supplier_count"],
    "SELECT CASE WHEN country = 'USA' THEN 'Domestic' ELSE 'International' END AS supplier_origin, COUNT(*) AS supplier_count FROM suppliers GROUP BY CASE WHEN country = 'USA' THEN 'Domestic' ELSE 'International' END ORDER BY supplier_count DESC;",
    true,
    ["Use CASE WHEN country = 'USA' THEN 'Domestic' ELSE 'International' END.", "Group by the case expression.", "Order by supplier_count DESC."],
    "Segments suppliers into domestic vs offshore manufacturing cohorts.", 20, 5
  ));

  list.push(q(
    "ecom-L1-060", 60, "core", "Low-Stock SKU Concentration by Category",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Inventory replenishment needs to know which categories suffer from low inventory levels. For all products with under 100 units in stock, join categories and calculate the count of low-stock items in each category, ordered highest count first.",
    "Join categories and products WHERE stock_quantity < 100. Group by category name. Calculate count. Order by low_stock_items DESC.",
    ["SELECT", "INNER JOIN", "WHERE", "GROUP BY", "COUNT", "ORDER BY"],
    ["category_name", "low_stock_items"],
    "SELECT c.name AS category_name, COUNT(p.id) AS low_stock_items FROM categories c JOIN products p ON c.id = p.category_id WHERE p.stock_quantity < 100 GROUP BY c.name ORDER BY low_stock_items DESC;",
    true,
    ["Join categories and products.", "Filter where stock_quantity < 100.", "Group by category name and order by count descending."],
    "Isolates categories vulnerable to imminent stockout events.", 20, 5
  ));

  list.push(q(
    "ecom-L1-061", 61, "core", "Total Billed Revenue by Order Status",
    "Alex Rivera", "Chief Executive Officer",
    "Executive leadership is auditing gross financial ledger flows. Calculate the total billed transaction dollars across each order status, ordered with our largest dollar volume categories first.",
    "Group orders by status. Sum total_amount rounded to 2 decimals. Order by total_billed DESC.",
    ["SELECT", "GROUP BY", "SUM", "ROUND", "ORDER BY"],
    ["status", "total_billed"],
    "SELECT status, ROUND(SUM(total_amount), 2) AS total_billed FROM orders GROUP BY status ORDER BY total_billed DESC;",
    true,
    ["Group by status.", "Calculate ROUND(SUM(total_amount), 2) AS total_billed.", "Order by total_billed DESC."],
    "Provides high-level ledger totals across order fulfillment states.", 20, 4
  ));

  list.push(q(
    "ecom-L1-062", 62, "core", "Average Order Value Across Customer Accounts",
    "Rachel Green", "VP of Sales & Growth",
    "Sales is evaluating order sizes among repeat shoppers. Join customers and orders to calculate each shopper's average order value across completed deliveries, showing only customers who have placed at least 2 delivered orders, ordered highest average spend first, limited to top 15.",
    "Join customers and orders WHERE status = 'delivered'. Group by customer id, first_name, last_name. Filter HAVING count >= 2. Order by avg_spend DESC LIMIT 15.",
    ["SELECT", "INNER JOIN", "WHERE", "GROUP BY", "HAVING", "AVG", "ROUND", "ORDER BY", "LIMIT"],
    ["first_name", "last_name", "avg_spend"],
    "SELECT c.first_name, c.last_name, ROUND(AVG(o.total_amount), 2) AS avg_spend FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name HAVING COUNT(o.id) >= 2 ORDER BY avg_spend DESC LIMIT 15;",
    true,
    ["Join customers and orders on c.id = o.customer_id.", "Filter status = 'delivered'.", "Group by customer, filter HAVING COUNT >= 2, ORDER BY avg_spend DESC LIMIT 15."],
    "Identifies high-spending repeat shoppers for premium loyalty perks.", 20, 6
  ));

  list.push(q(
    "ecom-L1-063", 63, "core", "Southern Territory Completed Order Performance",
    "Rachel Green", "VP of Sales & Growth",
    "Sales leadership is evaluating growth in the South territory. Calculate total delivered orders and total revenue generated by customers located in the South region.",
    "Join customers and orders WHERE region = 'South' and status = 'delivered'. Group by region.",
    ["SELECT", "INNER JOIN", "WHERE", "GROUP BY", "COUNT", "SUM"],
    ["region", "order_count", "total_revenue"],
    "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = 'South' AND o.status = 'delivered' GROUP BY c.region;",
    false,
    ["Join customers and orders on c.id = o.customer_id.", "Filter region = 'South' and status = 'delivered'.", "Group by region."],
    "Quantifies Southern regional sales performance.", 20, 5
  ));

  list.push(q(
    "ecom-L1-064", 64, "core", "Customer Resolution Rates in Support",
    "Marcus Bell", "Customer Success Lead",
    "Support leadership is tracking SLA resolution efficiency. Group support tickets by status to calculate ticket volume across each workflow status, ordered by ticket count descending.",
    "Group support_tickets by status. Compute count. Order by ticket_count DESC.",
    ["SELECT", "GROUP BY", "COUNT", "ORDER BY"],
    ["status", "ticket_count"],
    "SELECT status, COUNT(*) AS ticket_count FROM support_tickets GROUP BY status ORDER BY ticket_count DESC;",
    true,
    ["Group by status.", "Calculate COUNT(*) AS ticket_count.", "Order by ticket_count DESC."],
    "Benchmarks customer support resolution rates.", 20, 4
  ));

  list.push(q(
    "ecom-L1-065", 65, "core", "Inventory Stored by Product Category",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Warehouse management is reviewing space allocation by department line. Join categories, products, and inventory to calculate the total units of inventory stored in warehouses for each category, ordered highest quantity first.",
    "Join categories, products, and inventory. Group by category name. Sum quantity_on_hand. Order by total_units DESC.",
    ["SELECT", "INNER JOIN", "3-WAY JOIN", "GROUP BY", "SUM", "ORDER BY"],
    ["category_name", "total_units"],
    "SELECT c.name AS category_name, SUM(i.quantity_on_hand) AS total_units FROM categories c JOIN products p ON c.id = p.category_id JOIN inventory i ON p.id = i.product_id GROUP BY c.name ORDER BY total_units DESC;",
    true,
    ["Join categories to products, then products to inventory.", "Group by category name.", "Sum quantity_on_hand and order descending."],
    "Profiles physical storage space allocated to merchandise categories.", 20, 6
  ));

  list.push(q(
    "ecom-L1-066", 66, "core", "Orders with Elevated Shipping Surcharges",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Logistics is analyzing heavy freight fees passed to consumers. Group orders with shipping fees of $10.00 or higher by their current status to see order counts and average shipping fee, ordered by count descending.",
    "Filter orders WHERE shipping_fee >= 10.00. Group by status. Compute count and avg shipping fee. Order by order_count DESC.",
    ["SELECT", "WHERE", "GROUP BY", "COUNT", "AVG", "ROUND", "ORDER BY"],
    ["status", "order_count", "avg_shipping_fee"],
    "SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders WHERE shipping_fee >= 10.00 GROUP BY status ORDER BY order_count DESC;",
    true,
    ["Filter where shipping_fee >= 10.00.", "Group by status.", "Calculate COUNT(*) and ROUND(AVG(shipping_fee), 2).", "Order by count descending."],
    "Audits orders carrying substantial delivery surcharges.", 20, 5
  ));

  list.push(q(
    "ecom-L1-067", 67, "core", "Customer Review Ratings Distribution",
    "Marcus Bell", "Customer Success Lead",
    "Marketing is analyzing review polarity across our customer base. Group all customer reviews by rating to calculate how many total reviews were submitted for each star rating, ordered from 5 stars down to 1 star.",
    "Group customer_reviews by rating. Compute review_count. Order by rating DESC.",
    ["SELECT", "GROUP BY", "COUNT", "ORDER BY"],
    ["rating", "review_count"],
    "SELECT rating, COUNT(*) AS review_count FROM customer_reviews GROUP BY rating ORDER BY rating DESC;",
    true,
    ["Group by rating.", "Calculate COUNT(*) AS review_count.", "Order by rating DESC."],
    "Visualizes overall customer feedback rating curves.", 20, 4
  ));

  list.push(q(
    "ecom-L1-068", 68, "core", "Multi-Line Customer Orders",
    "Rachel Green", "VP of Sales & Growth",
    "Merchandising wants to see orders containing diverse items. Group order line items by order to calculate the number of distinct products purchased in each order, showing only orders with at least 3 distinct products, ordered highest product variety first, limited to top 15.",
    "Group order_items by order_id. Filter HAVING COUNT(DISTINCT product_id) >= 3. Order by distinct_products DESC LIMIT 15.",
    ["SELECT", "GROUP BY", "HAVING", "COUNT", "DISTINCT", "ORDER BY", "LIMIT"],
    ["order_id", "distinct_products"],
    "SELECT order_id, COUNT(DISTINCT product_id) AS distinct_products FROM order_items GROUP BY order_id HAVING COUNT(DISTINCT product_id) >= 3 ORDER BY distinct_products DESC LIMIT 15;",
    true,
    ["Group order_items by order_id.", "Filter with HAVING COUNT(DISTINCT product_id) >= 3.", "Order by distinct_products DESC LIMIT 15."],
    "Isolates diverse basket transactions indicating broad shopper interest.", 20, 5
  ));

  list.push(q(
    "ecom-L1-069", 69, "core", "Eastern Territory Completed Sales",
    "Rachel Green", "VP of Sales & Growth",
    "Our East Coast regional team is auditing order delivery performance. Join customers and orders to calculate completed order volume and total collected revenue for customers in the East region.",
    "Join customers and orders WHERE region = 'East' and status = 'delivered'. Group by region.",
    ["SELECT", "INNER JOIN", "WHERE", "GROUP BY", "COUNT", "SUM"],
    ["region", "order_count", "total_revenue"],
    "SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = 'East' AND o.status = 'delivered' GROUP BY c.region;",
    false,
    ["Join customers and orders on c.id = o.customer_id.", "Filter region = 'East' and status = 'delivered'.", "Group by region."],
    "Quantifies Eastern regional completed revenue totals.", 20, 5
  ));

  list.push(q(
    "ecom-L1-070", 70, "core", "Customer Registrations by Regional Market",
    "Rachel Green", "VP of Sales & Growth",
    "Growth strategy is planning regional acquisition budgets. Count the total registered customers in each geographic region, ordered from our largest user base downward.",
    "Group customers by region. Compute customer_count. Order by customer_count DESC.",
    ["SELECT", "GROUP BY", "COUNT", "ORDER BY"],
    ["region", "customer_count"],
    "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region ORDER BY customer_count DESC;",
    true,
    ["Group by region.", "Calculate COUNT(*) AS customer_count.", "Order by customer_count DESC."],
    "Measures regional customer adoption across territorial markets.", 20, 4
  ));

  // =========================================================================
  // CHALLENGING (71-90): Multi-table joins (3-4 tables), margins, complex filters
  // =========================================================================

  list.push(q(
    "ecom-L1-071", 71, "challenging", "VIP High-Spend Customer Cohort",
    "Rachel Green", "VP of Sales & Growth",
    "Marketing is launching an exclusive concierge reward tier for our top patrons. Join customers and completed delivered orders to identify all customers who have accumulated more than $400 in total completed purchases, showing their names, email, and cumulative spend, ordered from highest spend downward.",
    "Join customers and orders on c.id = o.customer_id WHERE o.status = 'delivered'. Group by customer id, first_name, last_name, email. Filter HAVING SUM > 400. Order by total_spent DESC.",
    ["INNER JOIN", "WHERE", "GROUP BY", "HAVING", "SUM", "ROUND", "ORDER BY"],
    ["first_name", "last_name", "email", "total_spent"],
    "SELECT c.first_name, c.last_name, c.email, ROUND(SUM(o.total_amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.email HAVING SUM(o.total_amount) > 400.00 ORDER BY total_spent DESC;",
    true,
    ["Join customers and orders on c.id = o.customer_id.", "Filter where status = 'delivered'.", "Group by customer id and details, filter HAVING SUM > 400.00, order descending."],
    "Surfaces high-value customer accounts for VIP retention campaigns.", 35, 8
  ));

  list.push(q(
    "ecom-L1-072", 72, "challenging", "High Gross Margin Merchandise SKUs",
    "Alex Rivera", "Chief Executive Officer",
    "Executive management is reviewing unit gross profitability across our product catalog. Calculate each item's unit profit in dollars (retail price minus cost) and profit margin percentage (profit divided by price), showing products with a margin of at least 50%, ordered highest dollar profit first, limited to top 15.",
    "Query products WHERE (price - cost) / price >= 0.50. Calculate profit and margin_pct. Order by unit_profit DESC LIMIT 15.",
    ["SELECT", "WHERE", "ARITHMETIC", "ROUND", "ORDER BY", "LIMIT"],
    ["name", "price", "cost", "unit_profit", "margin_pct"],
    "SELECT name, price, cost, (price - cost) AS unit_profit, ROUND(((price - cost) / price) * 100, 2) AS margin_pct FROM products WHERE ((price - cost) / price) >= 0.50 ORDER BY unit_profit DESC LIMIT 15;",
    true,
    ["Calculate (price - cost) AS unit_profit.", "Calculate ROUND(((price - cost) / price) * 100, 2) AS margin_pct.", "Filter where margin >= 0.50, order by unit_profit DESC LIMIT 15."],
    "Identifies high-margin products that generate substantial gross profit.", 35, 7
  ));

  list.push(q(
    "ecom-L1-073", 73, "challenging", "Department Revenue & Unit Sales Contribution",
    "Alex Rivera", "Chief Executive Officer",
    "Corporate finance needs an end-to-end performance audit across operating departments. Link departments, categories, products, and order items to calculate total units sold and total dollar revenue generated by each department, ordered from highest revenue downward.",
    "Join departments, categories, products, and order_items. Group by department name. Sum quantity and sum line revenue. Order by total_revenue DESC.",
    ["INNER JOIN", "4-WAY JOIN", "GROUP BY", "SUM", "ROUND", "ORDER BY"],
    ["department_name", "units_sold", "total_revenue"],
    "SELECT d.name AS department_name, SUM(oi.quantity) AS units_sold, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM departments d JOIN categories c ON d.id = c.department_id JOIN products p ON c.id = p.category_id JOIN order_items oi ON p.id = oi.product_id GROUP BY d.id, d.name ORDER BY total_revenue DESC;",
    true,
    ["Join departments -> categories -> products -> order_items.", "Group by d.id, d.name.", "Calculate SUM(quantity) and SUM(quantity * unit_price).", "Order by total_revenue DESC."],
    "Calculates departmental enterprise sales revenue across retail divisions.", 35, 9
  ));

  list.push(q(
    "ecom-L1-074", 74, "challenging", "Carrier Shipping Performance on Large Orders",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Logistics is analyzing carrier handling of our highest-value orders. Join shipments and orders for all delivered orders of $300 or greater to calculate shipment volume and average shipping fee per carrier, ordered by shipment count descending.",
    "Join shipments and orders WHERE o.status = 'delivered' and o.total_amount >= 300.00. Group by carrier. Compute count and avg shipping fee. Order by shipment_count DESC.",
    ["INNER JOIN", "WHERE", "GROUP BY", "COUNT", "AVG", "ROUND", "ORDER BY"],
    ["carrier", "shipment_count", "avg_shipping_fee"],
    "SELECT s.carrier, COUNT(s.id) AS shipment_count, ROUND(AVG(o.shipping_fee), 2) AS avg_shipping_fee FROM shipments s JOIN orders o ON s.order_id = o.id WHERE o.status = 'delivered' AND o.total_amount >= 300.00 GROUP BY s.carrier ORDER BY shipment_count DESC;",
    true,
    ["Join shipments and orders on s.order_id = o.id.", "Filter where status = 'delivered' and total_amount >= 300.00.", "Group by carrier and order descending."],
    "Examines carrier assignment on premium high-value customer orders.", 35, 8
  ));

  list.push(q(
    "ecom-L1-075", 75, "challenging", "Top-Rated Products with Substantial Reviews",
    "Marcus Bell", "Customer Success Lead",
    "Marketing wants to launch an 'Editor's Choice' badge on our best-reviewed catalog items. Join products, categories, and customer reviews to find all items that have an average customer rating of at least 4.0 across at least 2 reviews, showing product title, category, review count, and average rating, ordered highest rating first.",
    "Join products, categories, and customer_reviews. Group by product id, name, category name. Filter HAVING count >= 2 AND avg rating >= 4.0. Order by avg_rating DESC, review_count DESC.",
    ["INNER JOIN", "3-WAY JOIN", "GROUP BY", "HAVING", "COUNT", "AVG", "ROUND", "ORDER BY"],
    ["product_name", "category_name", "review_count", "avg_rating"],
    "SELECT p.name AS product_name, c.name AS category_name, COUNT(r.id) AS review_count, ROUND(AVG(r.rating), 2) AS avg_rating FROM products p JOIN categories c ON p.category_id = c.id JOIN customer_reviews r ON p.id = r.product_id GROUP BY p.id, p.name, c.name HAVING COUNT(r.id) >= 2 AND AVG(r.rating) >= 4.0 ORDER BY avg_rating DESC, review_count DESC;",
    true,
    ["Join products with categories and customer_reviews.", "Group by product and category.", "Filter HAVING COUNT(r.id) >= 2 AND AVG(r.rating) >= 4.0.", "Order by avg_rating DESC."],
    "Highlights proven crowd-favorite merchandise with strong customer ratings.", 35, 8
  ));

  list.push(q(
    "ecom-L1-076", 76, "challenging", "Merchandise Return Liability by Category",
    "Marcus Bell", "Customer Success Lead",
    "Quality control is assessing which product sectors suffer from the highest refund exposure. Link categories, products, order items, orders, and returns to calculate total refund claims and total dollar refund volume per category, ordered highest refund amount first.",
    "Join categories, products, order_items, orders, and returns. Group by category name. Calculate return count and sum refund amount. Order by total_refunded DESC.",
    ["INNER JOIN", "MULTI-TABLE JOIN", "GROUP BY", "COUNT", "SUM", "ROUND", "ORDER BY"],
    ["category_name", "return_count", "total_refunded"],
    "SELECT c.name AS category_name, COUNT(DISTINCT ret.id) AS return_count, ROUND(SUM(ret.refund_amount), 2) AS total_refunded FROM categories c JOIN products p ON c.id = p.category_id JOIN order_items oi ON p.id = oi.product_id JOIN orders o ON oi.order_id = o.id JOIN returns ret ON o.id = ret.order_id GROUP BY c.name ORDER BY total_refunded DESC;",
    true,
    ["Join categories -> products -> order_items -> orders -> returns.", "Group by category name.", "Calculate COUNT(DISTINCT ret.id) and SUM(refund_amount).", "Order by total_refunded DESC."],
    "Measures warranty and return financial liabilities across catalog categories.", 35, 9
  ));

  list.push(q(
    "ecom-L1-077", 77, "challenging", "Customer Support Escalations on High-Value Shoppers",
    "Marcus Bell", "Customer Success Lead",
    "Customer success is conducting VIP service recovery. Join customers, support tickets, and orders to locate customers who have filed support tickets and also placed high-value orders ($250+), displaying customer names, ticket category, priority, and order spend, ordered highest spend first.",
    "Join customers, support_tickets, and orders WHERE o.total_amount >= 250.00. Show customer details, ticket details, and total_amount. Order by total_amount DESC.",
    ["INNER JOIN", "3-WAY JOIN", "WHERE", "ORDER BY"],
    ["first_name", "last_name", "category", "priority", "total_amount"],
    "SELECT c.first_name, c.last_name, st.category, st.priority, o.total_amount FROM customers c JOIN support_tickets st ON c.id = st.customer_id JOIN orders o ON c.id = o.customer_id WHERE o.total_amount >= 250.00 ORDER BY o.total_amount DESC;",
    true,
    ["Join customers with support_tickets and orders.", "Filter where total_amount >= 250.00.", "Order by total_amount DESC."],
    "Cross-references support inquiries against premium customer purchase history.", 35, 8
  ));

  list.push(q(
    "ecom-L1-078", 78, "challenging", "Total Warehouse Stock Valuation",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Accounting is preparing our physical inventory balance sheet. Join warehouses, inventory, and products to calculate the total units stored and total cost value of goods held in each warehouse facility, ordered from highest value facility downward.",
    "Join warehouses, inventory, and products. Group by warehouse id and name. Compute sum quantity and sum (quantity * cost). Order by total_inventory_cost DESC.",
    ["INNER JOIN", "3-WAY JOIN", "GROUP BY", "SUM", "ROUND", "ORDER BY"],
    ["warehouse_name", "total_units", "total_inventory_cost"],
    "SELECT w.name AS warehouse_name, SUM(i.quantity_on_hand) AS total_units, ROUND(SUM(i.quantity_on_hand * p.cost), 2) AS total_inventory_cost FROM warehouses w JOIN inventory i ON w.id = i.warehouse_id JOIN products p ON i.product_id = p.id GROUP BY w.id, w.name ORDER BY total_inventory_cost DESC;",
    true,
    ["Join warehouses -> inventory -> products.", "Group by w.id, w.name.", "Sum quantity_on_hand and sum(quantity_on_hand * cost).", "Order by total_inventory_cost DESC."],
    "Computes balance sheet asset valuation for physical inventory across regional hubs.", 35, 8
  ));

  list.push(q(
    "ecom-L1-079", 79, "challenging", "Frequent Shoppers with High Cumulative Spend",
    "Rachel Green", "VP of Sales & Growth",
    "Marketing wants to identify our top customer cohort for annual rewards. Join customers and completed orders to locate all customers who have placed at least 3 delivered orders AND accumulated over $600 in total sales, ordered by spend descending.",
    "Join customers and orders WHERE status = 'delivered'. Group by customer id and details. Filter HAVING count >= 3 AND sum > 600. Order by total_spend DESC.",
    ["INNER JOIN", "WHERE", "GROUP BY", "HAVING", "COUNT", "SUM", "ROUND", "ORDER BY"],
    ["first_name", "last_name", "delivered_orders", "total_spend"],
    "SELECT c.first_name, c.last_name, COUNT(o.id) AS delivered_orders, ROUND(SUM(o.total_amount), 2) AS total_spend FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name HAVING COUNT(o.id) >= 3 AND SUM(o.total_amount) > 600.00 ORDER BY total_spend DESC;",
    true,
    ["Join customers and orders on c.id = o.customer_id.", "Filter where status = 'delivered'.", "Group by customer, filter HAVING count >= 3 and sum > 600.00, order by spend desc."],
    "Isolates the highest-tier patron cohort combining frequency and volume.", 35, 8
  ));

  list.push(q(
    "ecom-L1-080", 80, "challenging", "High-Volume Best-Selling Product SKUs",
    "Rachel Green", "VP of Sales & Growth",
    "Merchandising needs our all-star merchandise list for banner ads. Join products, categories, and order line items to calculate total units sold and total line sales revenue for each product, showing only products with at least 15 units sold, ordered highest revenue first.",
    "Join products, categories, and order_items. Group by product id, name, category name. Filter HAVING sum quantity >= 15. Order by total_revenue DESC.",
    ["INNER JOIN", "3-WAY JOIN", "GROUP BY", "HAVING", "SUM", "ROUND", "ORDER BY"],
    ["product_name", "category_name", "total_units_sold", "total_revenue"],
    "SELECT p.name AS product_name, c.name AS category_name, SUM(oi.quantity) AS total_units_sold, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM products p JOIN categories c ON p.category_id = c.id JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name, c.name HAVING SUM(oi.quantity) >= 15 ORDER BY total_revenue DESC;",
    true,
    ["Join products with categories and order_items.", "Group by product and category.", "Filter HAVING sum quantity >= 15 and order by revenue desc."],
    "Ranks premier high-velocity revenue generating merchandise items.", 35, 8
  ));

  list.push(q(
    "ecom-L1-081", 81, "challenging", "Regional Product Sales Distribution",
    "Rachel Green", "VP of Sales & Growth",
    "Territory planners need to see where customer demand concentrates geographically. Link customers, orders, and order items to find total units purchased by customers in each geographic region, ordered highest unit volume first.",
    "Join customers, orders, and order_items WHERE o.status = 'delivered'. Group by region. Sum quantity. Order by total_units DESC.",
    ["INNER JOIN", "3-WAY JOIN", "WHERE", "GROUP BY", "SUM", "ORDER BY"],
    ["region", "total_units"],
    "SELECT c.region, SUM(oi.quantity) AS total_units FROM customers c JOIN orders o ON c.id = o.customer_id JOIN order_items oi ON o.id = oi.order_id WHERE o.status = 'delivered' GROUP BY c.region ORDER BY total_units DESC;",
    true,
    ["Join customers -> orders -> order_items.", "Filter where status = 'delivered'.", "Group by region and sum units ordered."],
    "Quantifies physical unit demand across geographic territories.", 35, 7
  ));

  list.push(q(
    "ecom-L1-082", 82, "challenging", "Active Supplier Catalog Depth and Reliability",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Vendor management is reviewing supplier partnerships. Join suppliers and products to calculate how many distinct products each vendor manufactures and their vendor rating, ordered by product count descending, then rating descending.",
    "Join suppliers and products. Group by supplier id, company_name, rating. Count products. Order by catalog_items DESC, rating DESC.",
    ["INNER JOIN", "GROUP BY", "COUNT", "ORDER BY"],
    ["company_name", "rating", "catalog_items"],
    "SELECT s.company_name, s.rating, COUNT(p.id) AS catalog_items FROM suppliers s JOIN products p ON s.id = p.category_id GROUP BY s.id, s.company_name, s.rating ORDER BY catalog_items DESC, s.rating DESC;",
    true,
    ["Join suppliers and products.", "Group by supplier id, company_name, rating.", "Count products and order descending."],
    "Measures supplier catalog footprint and reliability scores.", 35, 7
  ));

  list.push(q(
    "ecom-L1-083", 83, "challenging", "Price Spread and Margin Ratios by Department",
    "Alex Rivera", "Chief Executive Officer",
    "Finance is reviewing pricing consistency across corporate departments. Link departments, categories, and products to calculate the lowest price, highest price, and average price per unit across each department, ordered by average price descending.",
    "Join departments, categories, and products. Group by department name. Compute MIN, MAX, and ROUND(AVG(price), 2). Order by avg_price DESC.",
    ["INNER JOIN", "3-WAY JOIN", "GROUP BY", "MIN", "MAX", "AVG", "ROUND", "ORDER BY"],
    ["department_name", "min_price", "max_price", "avg_price"],
    "SELECT d.name AS department_name, MIN(p.price) AS min_price, MAX(p.price) AS max_price, ROUND(AVG(p.price), 2) AS avg_price FROM departments d JOIN categories c ON d.id = c.department_id JOIN products p ON c.id = p.category_id GROUP BY d.id, d.name ORDER BY avg_price DESC;",
    true,
    ["Join departments -> categories -> products.", "Group by department name.", "Compute MIN, MAX, and AVG of price.", "Order by avg_price DESC."],
    "Profiles pricing spread and catalog positioning across operating departments.", 35, 8
  ));

  list.push(q(
    "ecom-L1-084", 84, "challenging", "Shipments Assigned to High-Value Orders",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Logistics is conducting premium order tracking. Join shipments and orders to locate all shipments dispatched for customer orders that reached $350 or more, ordered from highest order value downward.",
    "Join shipments and orders on s.order_id = o.id WHERE o.total_amount >= 350.00. Order by o.total_amount DESC, s.id ASC.",
    ["INNER JOIN", "WHERE", "ORDER BY"],
    ["id", "order_id", "carrier", "tracking_number", "total_amount"],
    "SELECT s.id, s.order_id, s.carrier, s.tracking_number, o.total_amount FROM shipments s JOIN orders o ON s.order_id = o.id WHERE o.total_amount >= 350.00 ORDER BY o.total_amount DESC, s.id ASC;",
    true,
    ["Join shipments and orders on s.order_id = o.id.", "Filter where o.total_amount >= 350.00.", "Order by o.total_amount DESC, s.id ASC."],
    "Tracks carrier parcel dispatches assigned to premium customer orders.", 35, 7
  ));

  list.push(q(
    "ecom-L1-085", 85, "challenging", "Top Selling Products Free of Return Complaints",
    "Marcus Bell", "Customer Success Lead",
    "Product quality wants to celebrate flawlessly manufactured items. Find product line sales for items that have generated at least 8 units sold, ordered highest sales volume first.",
    "Join products and order_items. Group by product id and name. Filter HAVING sum quantity >= 8. Order by units_sold DESC.",
    ["INNER JOIN", "GROUP BY", "HAVING", "SUM", "ORDER BY"],
    ["product_name", "units_sold"],
    "SELECT p.name AS product_name, SUM(oi.quantity) AS units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 8 ORDER BY units_sold DESC;",
    true,
    ["Join products and order_items.", "Group by product id and name.", "Filter HAVING sum quantity >= 8 and order descending."],
    "Surfaces high-volume catalog merchandise with flawless customer adoption.", 35, 7
  ));

  list.push(q(
    "ecom-L1-086", 86, "challenging", "Customer Support Volume by Priority and Region",
    "Marcus Bell", "Customer Success Lead",
    "Operations is reviewing regional customer friction. Join customers and support tickets to calculate total support inquiries submitted across each region, ordered with our highest ticket volume territories first.",
    "Join customers and support_tickets. Group by region. Count tickets. Order by total_tickets DESC.",
    ["INNER JOIN", "GROUP BY", "COUNT", "ORDER BY"],
    ["region", "total_tickets"],
    "SELECT c.region, COUNT(st.id) AS total_tickets FROM customers c JOIN support_tickets st ON c.id = st.customer_id GROUP BY c.region ORDER BY total_tickets DESC;",
    true,
    ["Join customers and support_tickets on c.id = st.customer_id.", "Group by region and count tickets.", "Order by total_tickets DESC."],
    "Measures customer service workload distribution across geographic markets.", 35, 7
  ));

  list.push(q(
    "ecom-L1-087", 87, "challenging", "Average Delivery Transit Duration by Carrier",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Logistics is reviewing on-time delivery service level agreements. For all shipments that have both dispatch and delivery timestamps, calculate total fulfilled shipments per carrier, ordered by volume descending.",
    "Filter shipments WHERE shipped_at IS NOT NULL AND delivered_at IS NOT NULL. Group by carrier. Calculate shipment count. Order by fulfilled_shipments DESC.",
    ["SELECT", "WHERE", "IS NOT NULL", "GROUP BY", "COUNT", "ORDER BY"],
    ["carrier", "fulfilled_shipments"],
    "SELECT carrier, COUNT(*) AS fulfilled_shipments FROM shipments WHERE shipped_at IS NOT NULL AND delivered_at IS NOT NULL GROUP BY carrier ORDER BY fulfilled_shipments DESC;",
    true,
    ["Filter where shipped_at and delivered_at are both not null.", "Group by carrier and count shipments.", "Order by volume descending."],
    "Measures completed door-to-door transit volume across carrier partners.", 35, 7
  ));

  list.push(q(
    "ecom-L1-088", 88, "challenging", "Luxury and Premium Brand Sales Volume",
    "Alex Rivera", "Chief Executive Officer",
    "Executive leadership is assessing the financial traction of our high-end brand partnerships. Join brands, products, and order items to calculate total units sold and total gross revenue generated by brand partners classified as luxury or premium, ordered by total revenue descending.",
    "Join brands, products, and order_items WHERE tier IN ('luxury', 'premium'). Group by brand name, tier. Calculate units and revenue. Order by total_revenue DESC.",
    ["INNER JOIN", "3-WAY JOIN", "WHERE", "GROUP BY", "SUM", "ROUND", "ORDER BY"],
    ["brand_name", "tier", "units_sold", "total_revenue"],
    "SELECT b.name AS brand_name, b.tier, SUM(oi.quantity) AS units_sold, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM brands b JOIN products p ON b.id = p.category_id JOIN order_items oi ON p.id = oi.product_id WHERE b.tier IN ('luxury', 'premium') GROUP BY b.id, b.name, b.tier ORDER BY total_revenue DESC;",
    true,
    ["Join brands to products, then products to order_items.", "Filter WHERE tier in luxury or premium.", "Group by brand name and tier, calculate revenue, order descending."],
    "Tracks revenue throughput for high-margin prestige brands.", 35, 8
  ));

  list.push(q(
    "ecom-L1-089", 89, "challenging", "Defective Merchandise Return Impact on Orders",
    "Marcus Bell", "Customer Success Lead",
    "Quality control is cross-referencing customer refunds against initial transaction values. Join orders and customer returns where the stated reason is defective merchandise, displaying order id, initial order amount, and refund amount, ordered by refund amount descending.",
    "Join orders and returns WHERE ret.reason LIKE '%defect%'. Show o.id, o.total_amount, ret.refund_amount. Order by ret.refund_amount DESC.",
    ["INNER JOIN", "WHERE", "LIKE", "ORDER BY"],
    ["order_id", "total_amount", "refund_amount"],
    "SELECT o.id AS order_id, o.total_amount, ret.refund_amount FROM orders o JOIN returns ret ON o.id = ret.order_id WHERE ret.reason LIKE '%defect%' ORDER BY ret.refund_amount DESC;",
    true,
    ["Join orders and returns on o.id = ret.order_id.", "Filter where reason LIKE '%defect%'.", "Order by refund_amount DESC."],
    "Cross-references refund claims directly against original order values.", 35, 7
  ));

  list.push(q(
    "ecom-L1-090", 90, "challenging", "Total Inventory Reserved Across Warehouse Facilities",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Logistics is reviewing warehouse buffer allocations across distribution facilities. Join warehouses and inventory to calculate total on-hand inventory units and total reserved inventory units for each warehouse facility, ordered by reserved units descending.",
    "Join warehouses and inventory. Group by warehouse id and name. Sum on hand and reserved. Order by total_reserved DESC.",
    ["INNER JOIN", "GROUP BY", "SUM", "ORDER BY"],
    ["warehouse_name", "total_on_hand", "total_reserved"],
    "SELECT w.name AS warehouse_name, SUM(i.quantity_on_hand) AS total_on_hand, SUM(i.reserved_quantity) AS total_reserved FROM warehouses w JOIN inventory i ON w.id = i.warehouse_id GROUP BY w.id, w.name ORDER BY total_reserved DESC;",
    true,
    ["Join warehouses and inventory on w.id = i.warehouse_id.", "Group by warehouse id and name.", "Sum quantity_on_hand and reserved_quantity, order by reserved descending."],
    "Examines stock commitment ratios across physical fulfillment centers.", 35, 8
  ));

  // =========================================================================
  // BOSS QUESTIONS (91-100): 10 Distinct Culminating Executive Audits
  // =========================================================================

  list.push(q(
    "ecom-L1-091", 91, "boss", "Boss Audit #1: Executive Revenue Leaderboard",
    "Alex Rivera", "Chief Executive Officer",
    "Board presentation deliverable: We need an authoritative executive revenue leaderboard of our top 10 lifetime customers. Join customer accounts and completed delivered orders to compute each shopper's total orders placed, cumulative revenue collected, and average order value, ordered with our biggest patrons first, limited to the top 10.",
    "Join customers and orders WHERE status = 'delivered'. Group by customer id, first_name, last_name, region. Compute order count, sum total_amount, avg total_amount. Order by total_revenue DESC LIMIT 10.",
    ["MULTI-TABLE JOIN", "WHERE", "GROUP BY", "DISTINCT", "SUM", "AVG", "ROUND", "ORDER BY", "LIMIT"],
    ["first_name", "last_name", "region", "orders_placed", "total_revenue", "avg_order_value"],
    "SELECT c.first_name, c.last_name, c.region, COUNT(DISTINCT o.id) AS orders_placed, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region ORDER BY total_revenue DESC LIMIT 10;",
    true,
    ["Join customers and orders on c.id = o.customer_id.", "Filter where status = 'delivered'.", "Calculate COUNT(DISTINCT o.id), SUM(total_amount), and AVG(total_amount).", "Order by total_revenue DESC LIMIT 10."],
    "Generates the definitive executive lifetime patron leaderboard.", 60, 12
  ));

  list.push(q(
    "ecom-L1-092", 92, "boss", "Boss Audit #2: Department Profitability & Gross Margin Matrix",
    "Alex Rivera", "Chief Executive Officer",
    "Executive financial analysis: I need a cross-divisional profitability scorecard for our board audit. Join departments, categories, products, and order items to calculate total units sold, gross sales revenue, estimated wholesale cost of goods sold, and total net gross profit for each department, ordered from highest gross profit downward.",
    "Join departments, categories, products, and order_items. Group by department id and name. Compute units sold, gross revenue, cost of goods, and net profit (revenue - cost). Order by net_gross_profit DESC.",
    ["MULTI-TABLE JOIN", "4-WAY JOIN", "GROUP BY", "SUM", "ARITHMETIC", "ROUND", "ORDER BY"],
    ["department_name", "units_sold", "gross_revenue", "cost_of_goods", "net_gross_profit"],
    "SELECT d.name AS department_name, SUM(oi.quantity) AS units_sold, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS gross_revenue, ROUND(SUM(oi.quantity * p.cost), 2) AS cost_of_goods, ROUND(SUM(oi.quantity * (oi.unit_price - p.cost)), 2) AS net_gross_profit FROM departments d JOIN categories c ON d.id = c.department_id JOIN products p ON c.id = p.category_id JOIN order_items oi ON p.id = oi.product_id GROUP BY d.id, d.name ORDER BY net_gross_profit DESC;",
    true,
    ["Join departments -> categories -> products -> order_items.", "Group by d.id, d.name.", "Compute SUM(quantity), SUM(quantity * unit_price), SUM(quantity * cost), and SUM(quantity * (unit_price - cost)).", "Order by net_gross_profit DESC."],
    "Constructs full departmental margin and profitability reconciliation.", 60, 15
  ));

  list.push(q(
    "ecom-L1-093", 93, "boss", "Boss Audit #3: Carrier Logistics SLA & Fulfillment Velocity",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Carrier contract renegotiation: Liam here. We need a comprehensive logistics scorecard evaluating our delivery partners. For each freight carrier, compute total shipments handled, count of successfully delivered parcels, and average shipping fee billed, ordered from our largest carrier partner downward.",
    "Join shipments and orders on s.order_id = o.id. Group by carrier. Compute total shipments, count of delivered shipments, and average shipping fee. Order by total_shipments DESC.",
    ["MULTI-TABLE JOIN", "INNER JOIN", "GROUP BY", "COUNT", "AVG", "ROUND", "ORDER BY"],
    ["carrier", "total_shipments", "delivered_count", "avg_shipping_fee"],
    "SELECT s.carrier, COUNT(s.id) AS total_shipments, COUNT(s.delivered_at) AS delivered_count, ROUND(AVG(o.shipping_fee), 2) AS avg_shipping_fee FROM shipments s JOIN orders o ON s.order_id = o.id GROUP BY s.carrier ORDER BY total_shipments DESC;",
    true,
    ["Join shipments and orders on s.order_id = o.id.", "Group by carrier.", "Calculate COUNT(s.id), COUNT(s.delivered_at), and ROUND(AVG(o.shipping_fee), 2).", "Order by total_shipments DESC."],
    "Audits delivery fulfillment throughput and shipping fees per carrier.", 60, 12
  ));

  list.push(q(
    "ecom-L1-094", 94, "boss", "Boss Audit #4: Inventory Capital Exposure & Stagnant Stock",
    "Liam Vance", "Fulfillment & Operations Manager",
    "Executive supply audit: We need to quantify company capital tied up on warehouse shelves. Join categories, products, and inventory to calculate total warehouse stock on hand, total reserved inventory, and total asset valuation (quantity on hand multiplied by cost) for each category, ordered highest capital exposure first.",
    "Join categories, products, and inventory. Group by category name. Compute sum quantity_on_hand, sum reserved_quantity, and sum (quantity_on_hand * cost). Order by total_asset_value DESC.",
    ["MULTI-TABLE JOIN", "3-WAY JOIN", "GROUP BY", "SUM", "ARITHMETIC", "ROUND", "ORDER BY"],
    ["category_name", "total_stock_on_hand", "total_reserved", "total_asset_value"],
    "SELECT c.name AS category_name, SUM(i.quantity_on_hand) AS total_stock_on_hand, SUM(i.reserved_quantity) AS total_reserved, ROUND(SUM(i.quantity_on_hand * p.cost), 2) AS total_asset_value FROM categories c JOIN products p ON c.id = p.category_id JOIN inventory i ON p.id = i.product_id GROUP BY c.name ORDER BY total_asset_value DESC;",
    true,
    ["Join categories -> products -> inventory.", "Group by category name.", "Calculate SUM(quantity_on_hand), SUM(reserved_quantity), and SUM(quantity_on_hand * cost).", "Order by total_asset_value DESC."],
    "Computes warehouse capital tie-up across merchandise categories.", 60, 14
  ));

  list.push(q(
    "ecom-L1-095", 95, "boss", "Boss Audit #5: Regional Market Penetration & Value Matrix",
    "Rachel Green", "VP of Sales & Growth",
    "Territory expansion briefing: Rachel here. We need a holistic market penetration matrix across our 5 operating regions. Join customers and orders to calculate total registered shoppers, total completed delivered orders, and total net revenue collected per region, ordered by revenue descending.",
    "Join customers and orders on c.id = o.customer_id. Group by region. Count distinct customers, count delivered orders, sum total_amount for delivered orders. Order by regional_revenue DESC.",
    ["MULTI-TABLE JOIN", "GROUP BY", "DISTINCT", "COUNT", "SUM", "ROUND", "ORDER BY"],
    ["region", "customer_count", "delivered_orders", "regional_revenue"],
    "SELECT c.region, COUNT(DISTINCT c.id) AS customer_count, COUNT(DISTINCT CASE WHEN o.status = 'delivered' THEN o.id END) AS delivered_orders, ROUND(SUM(CASE WHEN o.status = 'delivered' THEN o.total_amount ELSE 0 END), 2) AS regional_revenue FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.region ORDER BY regional_revenue DESC;",
    true,
    ["Join customers left join orders.", "Group by region.", "Calculate COUNT(DISTINCT c.id), count of delivered orders, and sum of delivered revenue.", "Order by regional_revenue DESC."],
    "Benchmarks regional market share and revenue throughput across territories.", 60, 15
  ));

  list.push(q(
    "ecom-L1-096", 96, "boss", "Boss Audit #6: Repeat Buyer Lifetime Retention Cohort",
    "Rachel Green", "VP of Sales & Growth",
    "Investor deck analysis: We need to demonstrate strong shopper retention. Join customers and delivered orders to identify repeat patrons who have placed 3 or more separate delivered orders, displaying their names, region, total orders placed, cumulative spend, and average basket size, ordered by cumulative spend descending, limited to top 10.",
    "Join customers and orders WHERE o.status = 'delivered'. Group by customer id, first_name, last_name, region. Filter HAVING count >= 3. Order by cumulative_spend DESC LIMIT 10.",
    ["MULTI-TABLE JOIN", "WHERE", "GROUP BY", "HAVING", "COUNT", "SUM", "AVG", "ROUND", "ORDER BY", "LIMIT"],
    ["first_name", "last_name", "region", "delivered_orders", "cumulative_spend", "avg_basket_size"],
    "SELECT c.first_name, c.last_name, c.region, COUNT(o.id) AS delivered_orders, ROUND(SUM(o.total_amount), 2) AS cumulative_spend, ROUND(AVG(o.total_amount), 2) AS avg_basket_size FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region HAVING COUNT(o.id) >= 3 ORDER BY cumulative_spend DESC LIMIT 10;",
    true,
    ["Join customers and orders.", "Filter where status = 'delivered'.", "Group by customer details, filter HAVING COUNT >= 3.", "Order by cumulative_spend DESC LIMIT 10."],
    "Proves customer retention and high-frequency repeat purchasing power.", 60, 14
  ));

  list.push(q(
    "ecom-L1-097", 97, "boss", "Boss Audit #7: Commercial Brand Tier Financial Performance",
    "Alex Rivera", "Chief Executive Officer",
    "Marketplace positioning review: Alex here. We need to evaluate which brand tiers generate the most sales. Join brands, products, and order line items to calculate total units sold, gross merchandise revenue, and average selling price across brand positioning tiers, ordered from highest gross revenue downward.",
    "Join brands, products, and order_items. Group by brand tier. Compute units sold, gross revenue, and avg unit price. Order by gross_revenue DESC.",
    ["MULTI-TABLE JOIN", "3-WAY JOIN", "GROUP BY", "SUM", "AVG", "ROUND", "ORDER BY"],
    ["tier", "units_sold", "gross_revenue", "avg_selling_price"],
    "SELECT b.tier, SUM(oi.quantity) AS units_sold, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS gross_revenue, ROUND(AVG(oi.unit_price), 2) AS avg_selling_price FROM brands b JOIN products p ON b.id = p.category_id JOIN order_items oi ON p.id = oi.product_id GROUP BY b.tier ORDER BY gross_revenue DESC;",
    true,
    ["Join brands -> products -> order_items.", "Group by brand tier.", "Compute SUM(quantity), SUM(quantity * unit_price), and AVG(unit_price).", "Order by gross_revenue DESC."],
    "Benchmarks sales volume and price elasticity across brand tiers.", 60, 13
  ));

  list.push(q(
    "ecom-L1-098", 98, "boss", "Boss Audit #8: Returns & Customer Dissatisfaction Exposure",
    "Marcus Bell", "Customer Success Lead",
    "Risk mitigation meeting: Marcus here. We must present our full returns exposure to the executive committee. Group return records by reason to calculate total refund claims, total refunded capital, average refund per incident, and minimum/maximum refund values, ordered from highest total refunded amount downward.",
    "Group returns by reason. Compute count, sum refund, avg refund, min refund, max refund. Order by total_refunded DESC.",
    ["GROUP BY", "COUNT", "SUM", "AVG", "MIN", "MAX", "ROUND", "ORDER BY"],
    ["reason", "claim_count", "total_refunded", "avg_refund", "max_refund"],
    "SELECT reason, COUNT(*) AS claim_count, ROUND(SUM(refund_amount), 2) AS total_refunded, ROUND(AVG(refund_amount), 2) AS avg_refund, MAX(refund_amount) AS max_refund FROM returns GROUP BY reason ORDER BY total_refunded DESC;",
    true,
    ["Group returns by reason.", "Calculate COUNT(*), SUM(refund_amount), AVG(refund_amount), and MAX(refund_amount).", "Order by total_refunded DESC."],
    "Quantifies warranty loss exposure and claim severity per return reason.", 60, 12
  ));

  list.push(q(
    "ecom-L1-099", 99, "boss", "Boss Audit #9: Verified Customer Sentiment & Satisfaction",
    "Marcus Bell", "Customer Success Lead",
    "Annual brand health check: We want to audit customer satisfaction across our merchandise lines. Join categories, products, and customer reviews from verified buyers to calculate review count and average satisfaction rating for each category, ordered highest rating first.",
    "Join categories, products, and customer_reviews WHERE is_verified_purchase = true. Group by category name. Compute count and avg rating. Order by avg_rating DESC.",
    ["MULTI-TABLE JOIN", "3-WAY JOIN", "WHERE", "GROUP BY", "COUNT", "AVG", "ROUND", "ORDER BY"],
    ["category_name", "verified_reviews", "avg_rating"],
    "SELECT c.name AS category_name, COUNT(r.id) AS verified_reviews, ROUND(AVG(r.rating), 2) AS avg_rating FROM categories c JOIN products p ON c.id = p.category_id JOIN customer_reviews r ON p.id = r.product_id WHERE r.is_verified_purchase = true GROUP BY c.name ORDER BY avg_rating DESC;",
    true,
    ["Join categories -> products -> customer_reviews.", "Filter where is_verified_purchase = true.", "Group by category name, calculate count and avg rating, order descending."],
    "Benchmarks customer sentiment and verified review satisfaction by category.", 60, 13
  ));

  list.push(q(
    "ecom-L1-100", 100, "boss", "Boss Audit #10: Enterprise OmniCart Master Ledger Audit",
    "Alex Rivera", "Chief Executive Officer",
    "The ultimate startup audit: Alex Rivera here. To conclude our Startup Stage at OmniCart Direct, I need an all-hands master ledger summary. Join customer accounts and completed delivered orders to compute our total delivered order volume, total enterprise revenue collected, average shipping fee per order, and average order transaction size, grouped by customer region, ordered from highest revenue market downward.",
    "Join customers and orders WHERE status = 'delivered'. Group by region. Compute delivered orders, total revenue, average shipping fee, and average transaction size. Order by total_revenue DESC.",
    ["MULTI-TABLE JOIN", "WHERE", "GROUP BY", "COUNT", "SUM", "AVG", "ROUND", "ORDER BY"],
    ["region", "delivered_orders", "total_revenue", "avg_shipping_fee", "avg_order_value"],
    "SELECT c.region, COUNT(o.id) AS delivered_orders, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.shipping_fee), 2) AS avg_shipping_fee, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.region ORDER BY total_revenue DESC;",
    true,
    ["Join customers and orders on c.id = o.customer_id.", "Filter where status = 'delivered'.", "Group by c.region.", "Calculate COUNT(o.id), SUM(total_amount), AVG(shipping_fee), and AVG(total_amount).", "Order by total_revenue DESC."],
    "Final Level 1 culminating master audit evaluating OmniCart regional operations.", 75, 15
  ));

  return list;
}

async function verifyAndGenerate() {
  console.log("=== Building & Verifying 100 Curated E-Commerce L1 Questions ===");
  const questions = getAll100Questions();
  console.log(`Generated ${questions.length} questions.`);

  if (questions.length !== 100) {
    throw new Error(`Expected exactly 100 questions, got ${questions.length}`);
  }

  // 1. Verify Uniqueness
  const idSet = new Set();
  const titleSet = new Set();
  const sqlSet = new Set();
  const reqSet = new Set();

  for (const item of questions) {
    if (idSet.has(item.id)) throw new Error(`Duplicate ID: ${item.id}`);
    idSet.add(item.id);

    if (titleSet.has(item.title)) throw new Error(`Duplicate title: ${item.title}`);
    titleSet.add(item.title);

    if (sqlSet.has(item.reference_sql)) throw new Error(`Duplicate reference_sql in ${item.id}: ${item.reference_sql}`);
    sqlSet.add(item.reference_sql);

    if (reqSet.has(item.request)) throw new Error(`Duplicate request text in ${item.id}`);
    reqSet.add(item.request);

    // Verify no underscore column names in request (Issue 3)
    const underscoreMatch = item.request.match(/\b[a-z]+_[a-z]+\b/g);
    if (underscoreMatch) {
      console.warn(`[Column Name Warning in ${item.id}]: Found possible column names: ${underscoreMatch.join(', ')}`);
    }
  }

  console.log("✓ All 100 question IDs, titles, queries, and requests are 100% UNIQUE!");

  // 2. Test Execution against PGlite database
  console.log("\n--- Testing all 100 queries against live PGlite ecom_l1 schema ---");
  const pg = new PGlite();
  const ddl = generateDomainSql("ecommerce", "main", "ecom_l1");
  await pg.exec(ddl);
  await pg.exec('SET search_path = "ecom_l1";');

  let passed = 0;
  for (const item of questions) {
    try {
      const res = await pg.query(item.reference_sql);
      if (!res.rows || res.rows.length === 0) {
        console.warn(`⚠ ${item.id} returned 0 rows! Title: "${item.title}"`);
      } else {
        passed++;
      }
    } catch (err) {
      console.error(`❌ Execution FAILED on ${item.id}: ${err.message}`);
      console.error(`   SQL: ${item.reference_sql}`);
      process.exit(1);
    }
  }
  console.log(`✓ All ${passed}/100 queries executed successfully with non-empty results!`);

  // 3. Write to src/lib/content/ecom-l1-questions.ts
  const targetFile = path.join(__dirname, '../src/lib/content/ecom-l1-questions.ts');
  const fileHeader = `export interface QuestionDefinition {
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

// 100 Fully Curated, Authentic Business Questions for E-Commerce Level 1 (Startup Stage)
// Every question has a unique scenario, unique query, and leadership business request with no schema jargon.
export const ECOM_L1_QUESTIONS: QuestionDefinition[] = `;

  const fileContent = fileHeader + JSON.stringify(questions, null, 2) + ";\n";
  fs.writeFileSync(targetFile, fileContent, 'utf8');
  console.log(`✓ Successfully updated: ${targetFile}`);

  // Also update content/ecommerce/level-1.json if it exists
  const jsonTarget = path.join(__dirname, '../content/ecommerce/level-1.json');
  if (fs.existsSync(path.dirname(jsonTarget))) {
    fs.writeFileSync(jsonTarget, JSON.stringify(questions, null, 2), 'utf8');
    console.log(`✓ Updated ${jsonTarget}`);
  }
}

verifyAndGenerate().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
