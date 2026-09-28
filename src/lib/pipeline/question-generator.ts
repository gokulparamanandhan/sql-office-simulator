import { QuestionDefinition } from "../content/ecom-l1-questions";
import { generateLevel1Blueprint } from "./blueprint-generator";

export function generate100EcomL1Questions(): QuestionDefinition[] {
  const blueprint = generateLevel1Blueprint();
  const questions: QuestionDefinition[] = [];

  const categoryNames = [
    "Electronics",
    "Apparel",
    "Home & Kitchen",
    "Sports & Outdoors",
    "Books",
    "Beauty & Health",
    "Toys & Games",
    "Office Supplies",
  ];
  const regions = ["North", "South", "East", "West", "Central"];
  const carriers = ["FedEx", "UPS", "USPS", "DHL"];
  const orderStatuses = ["delivered", "completed", "cancelled", "returned", "pending"];

  for (const slot of blueprint) {
    const num = slot.order;
    const id = `ecom-L1-${String(num).padStart(3, "0")}`;

    if (num === 1) {
      questions.push({
        id,
        domain: "ecommerce",
        level: 1,
        order: 1,
        difficulty: "warm-up",
        title: "All Products in Electronics",
        stakeholder: slot.stakeholder,
        request: "We are reviewing our tech catalog for the upcoming quarterly review. Can you pull a list of all products in the 'Electronics' category with their price and stock quantity?",
        context_notes: "Join products with categories to filter for 'Electronics'. Show product name, price, and stock_quantity.",
        concepts: ["SELECT", "WHERE", "INNER JOIN"],
        expected_columns: ["name", "price", "stock_quantity"],
        reference_sql: `SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Electronics' ORDER BY p.name;`,
        validation: { order_sensitive: false, column_names_sensitive: false, numeric_tolerance: 0.01 },
        hints: [
          "Join the 'products' table with 'categories' on category_id = categories.id.",
          "Filter using WHERE categories.name = 'Electronics'.",
          "Select only the 3 columns: name, price, stock_quantity.",
        ],
        solution_explanation: "Performs an INNER JOIN between products and categories to list products in Electronics.",
        xp: 10,
        estimated_minutes: 4,
      });
      continue;
    }

    if (num === 2) {
      questions.push({
        id,
        domain: "ecommerce",
        level: 1,
        order: 2,
        difficulty: "warm-up",
        title: "High-Value Delivered Orders",
        stakeholder: slot.stakeholder,
        request: "Finance needs an audit of our largest successful transactions. Return all orders with a status of 'delivered' and a total amount of at least $500, ordered from highest amount to lowest.",
        context_notes: "Filter orders where status = 'delivered' and total_amount >= 500. Order by total_amount DESC.",
        concepts: ["SELECT", "WHERE", "ORDER BY"],
        expected_columns: ["id", "customer_id", "total_amount", "order_date"],
        reference_sql: `SELECT id, customer_id, total_amount, order_date FROM orders WHERE status = 'delivered' AND total_amount >= 500 ORDER BY total_amount DESC;`,
        validation: { order_sensitive: true, column_names_sensitive: false, numeric_tolerance: 0.01 },
        hints: [
          "Filter status = 'delivered' AND total_amount >= 500.",
          "Use ORDER BY total_amount DESC for highest to lowest ranking.",
        ],
        solution_explanation: "Filters orders on total_amount and status, sorted descending.",
        xp: 10,
        estimated_minutes: 4,
      });
      continue;
    }

    if (num === 3) {
      questions.push({
        id,
        domain: "ecommerce",
        level: 1,
        order: 3,
        difficulty: "warm-up",
        title: "Customer Distribution by Region",
        stakeholder: slot.stakeholder,
        request: "We want to know where our customer base is located across the country. Please count how many customers we have in each region, showing only regions with at least 2 customers.",
        context_notes: "Group by region, count customers as customer_count, filter using HAVING customer_count >= 2, and sort descending.",
        concepts: ["SELECT", "GROUP BY", "HAVING", "COUNT", "ORDER BY"],
        expected_columns: ["region", "customer_count"],
        reference_sql: `SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region HAVING COUNT(*) >= 2 ORDER BY customer_count DESC;`,
        validation: { order_sensitive: true, column_names_sensitive: false, numeric_tolerance: 0.01 },
        hints: ["Use GROUP BY region and COUNT(*) AS customer_count.", "Filter with HAVING COUNT(*) >= 2."],
        solution_explanation: "Aggregates customer records by region with a HAVING threshold.",
        xp: 10,
        estimated_minutes: 5,
      });
      continue;
    }

    // Warm-up procedural (4 to 30)
    if (slot.difficulty === "warm-up") {
      const cat = categoryNames[(num - 4) % categoryNames.length];
      const reg = regions[(num - 4) % regions.length];
      const carrier = carriers[(num - 4) % carriers.length];
      const minPrice = 20 + (num % 5) * 15;
      const maxPrice = minPrice + 80;

      if (num % 4 === 0) {
        questions.push({
          id,
          domain: "ecommerce",
          level: 1,
          order: num,
          difficulty: "warm-up",
          title: `[Customer Roster #${num}] Customer Accounts in ${reg}`,
          stakeholder: slot.stakeholder,
          request: `Can you generate a roster of our customers located in the ${reg} region for territory review #${num}? Include first_name, last_name, and email.`,
          context_notes: `Filter customers where region = '${reg}'. Sort alphabetically by last_name, then first_name.`,
          concepts: ["SELECT", "WHERE", "ORDER BY"],
          expected_columns: ["first_name", "last_name", "email"],
          reference_sql: `SELECT first_name, last_name, email FROM customers WHERE region = '${reg}' ORDER BY last_name, first_name;`,
          validation: { order_sensitive: true, column_names_sensitive: false, numeric_tolerance: 0.01 },
          hints: [`Filter using WHERE region = '${reg}'.`, "Sort with ORDER BY last_name, first_name."],
          solution_explanation: `Filters customers table on regional territory.`,
          xp: 10,
          estimated_minutes: 4,
        });
      } else if (num % 4 === 1) {
        questions.push({
          id,
          domain: "ecommerce",
          level: 1,
          order: num,
          difficulty: "warm-up",
          title: `[Inventory Audit #${num}] Stock Levels in ${cat}`,
          stakeholder: slot.stakeholder,
          request: `Our inventory team needs an item verification. List all products in the '${cat}' category with less than 200 units in stock. (Check #${num})`,
          context_notes: `Join products with categories on category_id = categories.id. Filter for '${cat}' and stock_quantity < 200.`,
          concepts: ["SELECT", "WHERE", "INNER JOIN"],
          expected_columns: ["name", "price", "stock_quantity"],
          reference_sql: `SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = '${cat}' AND p.stock_quantity < 200 ORDER BY p.stock_quantity ASC;`,
          validation: { order_sensitive: false, column_names_sensitive: false, numeric_tolerance: 0.01 },
          hints: [`Join products and categories.`, `Filter on c.name = '${cat}' and stock_quantity < 200.`],
          solution_explanation: `Filters products by category name and stock threshold.`,
          xp: 10,
          estimated_minutes: 4,
        });
      } else if (num % 4 === 2) {
        questions.push({
          id,
          domain: "ecommerce",
          level: 1,
          order: num,
          difficulty: "warm-up",
          title: `[Logistics Check #${num}] Packages Dispatched via ${carrier}`,
          stakeholder: slot.stakeholder,
          request: `Logistics operations needs a status check for tracking batch #${num}. Show shipment id, order_id, and tracking_number for packages handled by ${carrier}.`,
          context_notes: `Query shipments where carrier = '${carrier}'. Order by id ASC.`,
          concepts: ["SELECT", "WHERE", "ORDER BY"],
          expected_columns: ["id", "order_id", "tracking_number"],
          reference_sql: `SELECT id, order_id, tracking_number FROM shipments WHERE carrier = '${carrier}' ORDER BY id ASC;`,
          validation: { order_sensitive: true, column_names_sensitive: false, numeric_tolerance: 0.01 },
          hints: [`Filter on carrier = '${carrier}'.`],
          solution_explanation: `Filters shipment records by carrier.`,
          xp: 10,
          estimated_minutes: 4,
        });
      } else {
        questions.push({
          id,
          domain: "ecommerce",
          level: 1,
          order: num,
          difficulty: "warm-up",
          title: `[Pricing Range #${num}] Products Between $${minPrice} and $${maxPrice}`,
          stakeholder: slot.stakeholder,
          request: `Merchandising is curating a mid-tier promotional collection #${num}. Return the name, price, and cost for products priced between $${minPrice} and $${maxPrice}.`,
          context_notes: `Filter products where price >= ${minPrice} AND price <= ${maxPrice}. Sort by price DESC.`,
          concepts: ["SELECT", "WHERE", "BETWEEN", "ORDER BY"],
          expected_columns: ["name", "price", "cost"],
          reference_sql: `SELECT name, price, cost FROM products WHERE price BETWEEN ${minPrice} AND ${maxPrice} ORDER BY price DESC;`,
          validation: { order_sensitive: true, column_names_sensitive: false, numeric_tolerance: 0.01 },
          hints: [`Filter using BETWEEN ${minPrice} AND ${maxPrice}.`, "Use ORDER BY price DESC."],
          solution_explanation: `Filters product catalog across price range bounds.`,
          xp: 10,
          estimated_minutes: 4,
        });
      }
    } else if (slot.difficulty === "core") {
      // Core procedural (31 to 70)
      const cat = categoryNames[(num - 30) % categoryNames.length];
      const reg = regions[(num - 30) % regions.length];
      const status = orderStatuses[(num - 30) % orderStatuses.length];

      if (num % 4 === 1) {
        questions.push({
          id,
          domain: "ecommerce",
          level: 1,
          order: num,
          difficulty: "core",
          title: `[Category Analysis #${num}] Pricing Profile for ${cat}`,
          stakeholder: slot.stakeholder,
          request: `We need catalog distribution metrics for report #${num}. What is the total count of products and average price in the '${cat}' category?`,
          context_notes: `Join products with categories on category_id = categories.id. Filter for '${cat}'. Round average price to 2 decimals.`,
          concepts: ["SELECT", "INNER JOIN", "COUNT", "AVG", "ROUND"],
          expected_columns: ["category_name", "product_count", "avg_price"],
          reference_sql: `SELECT c.name AS category_name, COUNT(p.id) AS product_count, ROUND(AVG(p.price), 2) AS avg_price FROM categories c JOIN products p ON c.id = p.category_id WHERE c.name = '${cat}' GROUP BY c.name;`,
          validation: { order_sensitive: false, column_names_sensitive: false, numeric_tolerance: 0.01 },
          hints: ["Join categories and products.", `Filter c.name = '${cat}' and GROUP BY c.name.`],
          solution_explanation: `Calculates catalog metrics with COUNT and AVG per category.`,
          xp: 20,
          estimated_minutes: 6,
        });
      } else if (num % 4 === 2) {
        questions.push({
          id,
          domain: "ecommerce",
          level: 1,
          order: num,
          difficulty: "core",
          title: `[Regional Metrics #${num}] Order Volume in ${reg}`,
          stakeholder: slot.stakeholder,
          request: `Regional leadership needs order performance figures for the ${reg} region (Review #${num}). Return the region name, total completed/delivered orders, and total revenue collected.`,
          context_notes: `Join customers and orders on customers.id = orders.customer_id. Filter where region = '${reg}' and status = 'delivered'. Group by region.`,
          concepts: ["SELECT", "INNER JOIN", "GROUP BY", "SUM", "COUNT"],
          expected_columns: ["region", "order_count", "total_revenue"],
          reference_sql: `SELECT c.region, COUNT(o.id) AS order_count, ROUND(SUM(o.total_amount), 2) AS total_revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.region = '${reg}' AND o.status = 'delivered' GROUP BY c.region;`,
          validation: { order_sensitive: false, column_names_sensitive: false, numeric_tolerance: 0.01 },
          hints: ["Join customers and orders.", `Filter c.region = '${reg}' and o.status = 'delivered'.`],
          solution_explanation: `Aggregates customer orders by regional boundary.`,
          xp: 20,
          estimated_minutes: 6,
        });
      } else if (num % 4 === 3) {
        questions.push({
          id,
          domain: "ecommerce",
          level: 1,
          order: num,
          difficulty: "core",
          title: `[Order Status Audit #${num}] System-wide Status Breakdown`,
          stakeholder: slot.stakeholder,
          request: `Operations is reviewing system health for audit #${num}. Group all orders by status, show order counts, and show the average shipping fee rounded to 2 decimals. Only include statuses with at least 5 orders.`,
          context_notes: `Group orders by status, count orders, round average shipping fee to 2 decimals. Use HAVING COUNT(*) >= 5, sort descending by order_count.`,
          concepts: ["SELECT", "GROUP BY", "HAVING", "COUNT", "AVG", "ROUND", "ORDER BY"],
          expected_columns: ["status", "order_count", "avg_shipping_fee"],
          reference_sql: `SELECT status, COUNT(*) AS order_count, ROUND(AVG(shipping_fee), 2) AS avg_shipping_fee FROM orders GROUP BY status HAVING COUNT(*) >= 5 ORDER BY order_count DESC;`,
          validation: { order_sensitive: true, column_names_sensitive: false, numeric_tolerance: 0.01 },
          hints: ["GROUP BY status.", "HAVING COUNT(*) >= 5 ORDER BY order_count DESC."],
          solution_explanation: `Groups orders by fulfillment status with an aggregate threshold.`,
          xp: 20,
          estimated_minutes: 6,
        });
      } else {
        questions.push({
          id,
          domain: "ecommerce",
          level: 1,
          order: num,
          difficulty: "core",
          title: `[Logistics Scorecard #${num}] Shipment Counts by Carrier`,
          stakeholder: slot.stakeholder,
          request: `Logistics wants to monitor carrier allocation for batch #${num}. Show carrier names and total shipment counts, sorted descending.`,
          context_notes: `Group shipments by carrier and count shipments. Order descending by shipment_count.`,
          concepts: ["SELECT", "GROUP BY", "COUNT", "ORDER BY"],
          expected_columns: ["carrier", "shipment_count"],
          reference_sql: `SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier ORDER BY shipment_count DESC;`,
          validation: { order_sensitive: true, column_names_sensitive: false, numeric_tolerance: 0.01 },
          hints: ["GROUP BY carrier and COUNT(*)."],
          solution_explanation: `Aggregates package dispatches across delivery carriers.`,
          xp: 20,
          estimated_minutes: 6,
        });
      }
    } else if (slot.difficulty === "challenging") {
      // Challenging procedural (71 to 90)
      const threshold = 300 + (num % 5) * 100;
      const minQty = 5 + (num % 4) * 2;

      if (num % 2 === 1) {
        questions.push({
          id,
          domain: "ecommerce",
          level: 1,
          order: num,
          difficulty: "challenging",
          title: `[VIP Cohort #${num}] High-Value Customers (Exceeding $${threshold})`,
          stakeholder: slot.stakeholder,
          request: `Marketing wants to reward repeat VIPs for cohort review #${num}. Find all customers who have accumulated more than $${threshold} in total delivered orders. Return their first_name, last_name, email, and total spent.`,
          context_notes: `Join customers and orders on customers.id = orders.customer_id. Filter orders on status = 'delivered'. Group by customer, use HAVING SUM(orders.total_amount) > ${threshold}, sort descending.`,
          concepts: ["INNER JOIN", "GROUP BY", "HAVING", "SUM", "ORDER BY"],
          expected_columns: ["first_name", "last_name", "email", "total_spent"],
          reference_sql: `SELECT c.first_name, c.last_name, c.email, ROUND(SUM(o.total_amount), 2) AS total_spent FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.email HAVING SUM(o.total_amount) > ${threshold} ORDER BY total_spent DESC;`,
          validation: { order_sensitive: true, column_names_sensitive: false, numeric_tolerance: 0.01 },
          hints: [
            "Join customers and orders on c.id = o.customer_id.",
            "Filter o.status = 'delivered'.",
            `Use HAVING SUM(o.total_amount) > ${threshold}.`,
          ],
          solution_explanation: `Aggregates customer spend across delivered orders with a HAVING threshold.`,
          xp: 35,
          estimated_minutes: 9,
        });
      } else {
        questions.push({
          id,
          domain: "ecommerce",
          level: 1,
          order: num,
          difficulty: "challenging",
          title: `[Fast Mover #${num}] Products with At Least ${minQty} Units Ordered`,
          stakeholder: slot.stakeholder,
          request: `Merchandising wants to see our fastest-moving items for reorder review #${num}. Return product names with their total quantity sold across all orders, showing only products with at least ${minQty} units sold.`,
          context_notes: `Join products with order_items on products.id = order_items.product_id. Group by product name, use HAVING SUM(quantity) >= ${minQty}, sort descending by total_units_sold.`,
          concepts: ["INNER JOIN", "GROUP BY", "HAVING", "SUM", "ORDER BY"],
          expected_columns: ["product_name", "total_units_sold"],
          reference_sql: `SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= ${minQty} ORDER BY total_units_sold DESC;`,
          validation: { order_sensitive: true, column_names_sensitive: false, numeric_tolerance: 0.01 },
          hints: ["Join products and order_items.", `GROUP BY p.name and use HAVING SUM(quantity) >= ${minQty}.`],
          solution_explanation: `Summarizes units sold per product using an aggregate filter.`,
          xp: 35,
          estimated_minutes: 9,
        });
      }
    } else {
      // Boss procedural (91 to 100)
      const rankIdx = num - 90;
      const deptThemes = [
        "Executive Revenue Leaderboard",
        "Regional High-Roller Matrix",
        "Customer Lifetime Value",
        "VIP Repeat Buyer Cohort",
        "Fulfillment Speed & Value Audit",
        "Departmental Margin Matrix",
        "Omnichannel Basket Analysis",
        "Customer Acquisition ROI",
        "Inventory Turnover Matrix",
        "All-Hands Corporate Financial Audit",
      ];
      const deptFocus = deptThemes[rankIdx - 1];

      questions.push({
        id,
        domain: "ecommerce",
        level: 1,
        order: num,
        difficulty: "boss",
        title: `Boss Question #${rankIdx}: ${deptFocus}`,
        stakeholder: slot.stakeholder,
        request: `Executive Leadership requires an end-of-quarter performance matrix for "${deptFocus}". Join customers and orders to compute each customer's total order count, total revenue generated, and average order value across delivered orders. Return customers with at least 1 delivered order, sorted by total revenue descending, limited to top 10.`,
        context_notes: `Join customers and orders. Filter orders where status = 'delivered'. Group by customer id, first_name, last_name, region. Calculate count of distinct orders, sum of total_amount, and round average order amount to 2 decimals. Order by total_revenue DESC and LIMIT 10.`,
        concepts: ["MULTI-TABLE JOIN", "GROUP BY", "DISTINCT", "SUM", "AVG", "ROUND", "ORDER BY", "LIMIT"],
        expected_columns: ["first_name", "last_name", "region", "orders_placed", "total_revenue", "avg_order_value"],
        reference_sql: `SELECT c.first_name, c.last_name, c.region, COUNT(DISTINCT o.id) AS orders_placed, ROUND(SUM(o.total_amount), 2) AS total_revenue, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers c JOIN orders o ON c.id = o.customer_id WHERE o.status = 'delivered' GROUP BY c.id, c.first_name, c.last_name, c.region ORDER BY total_revenue DESC LIMIT 10;`,
        validation: { order_sensitive: true, column_names_sensitive: false, numeric_tolerance: 0.01 },
        hints: [
          "Join customers and orders on c.id = o.customer_id.",
          "Filter for o.status = 'delivered'.",
          "Calculate COUNT(DISTINCT o.id), SUM(o.total_amount), and AVG(o.total_amount).",
          "ORDER BY total_revenue DESC LIMIT 10.",
        ],
        solution_explanation: `Executive boss question joining customer accounts with completed orders to produce a revenue leaderboard.`,
        xp: 60,
        estimated_minutes: 15,
      });
    }
  }

  return questions;
}
