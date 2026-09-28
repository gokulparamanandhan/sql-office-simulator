/**
 * E-Commerce Level 1 Dataset Generator (Spec Section 6, 10.2)
 * Generates 7 tables (~5,000 rows):
 * - departments (4)
 * - categories (8)
 * - products (50)
 * - customers (500)
 * - orders (1,500)
 * - order_items (3,500)
 * - shipments (1,200)
 * Supports deterministic seeded variants (main vs hidden validation).
 */

// Simple Linear Congruential Generator for reproducible seeded datasets
class SeededRandom {
  private seed: number;
  constructor(seed: number) {
    this.seed = seed;
  }
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  range(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
  pick<T>(arr: T[]): T {
    return arr[Math.floor(this.next() * arr.length)];
  }
}

export function generateEcomL1Data(variant: "main" | "validation" = "main") {
  const seed = variant === "main" ? 1042 : 2084;
  const rng = new SeededRandom(seed);
  const schemaName = variant === "main" ? "ecom_l1" : "ecom_l1_val";

  const regions = ["North", "South", "East", "West", "Central"];
  const orderStatuses = ["delivered", "completed", "cancelled", "returned", "pending"];
  const carriers = ["FedEx", "UPS", "USPS", "DHL"];

  // 1. Departments
  const departments = [
    { id: 1, name: "Executive", head_name: "Alex Rivera" },
    { id: 2, name: "Sales & Marketing", head_name: "Rachel Green" },
    { id: 3, name: "Fulfillment & Operations", head_name: "Liam Vance" },
    { id: 4, name: "Customer Support", head_name: "Marcus Bell" },
  ];

  // 2. Categories
  const categories = [
    { id: 1, name: "Electronics", department_id: 2 },
    { id: 2, name: "Apparel", department_id: 2 },
    { id: 3, name: "Home & Kitchen", department_id: 3 },
    { id: 4, name: "Sports & Outdoors", department_id: 3 },
    { id: 5, name: "Books", department_id: 2 },
    { id: 6, name: "Beauty & Health", department_id: 4 },
    { id: 7, name: "Toys & Games", department_id: 3 },
    { id: 8, name: "Office Supplies", department_id: 3 },
  ];

  // 3. Products (50 items)
  const productAdjectives = ["Wireless", "Ergonomic", "Pro", "Eco", "Smart", "Ultra", "Classic", "Premium"];
  const productNouns = ["Headphones", "Desk Lamp", "Water Bottle", "Running Shoes", "Backpack", "Coffee Maker", "Keyboard", "Notebook", "Serum", "Fitness Tracker"];
  
  const products: Array<{
    id: number;
    name: string;
    category_id: number;
    price: number;
    cost: number;
    stock_quantity: number;
  }> = [];

  for (let i = 1; i <= 50; i++) {
    const catId = (i % 8) + 1;
    const price = rng.range(15, 250);
    const cost = Math.round(price * (rng.range(35, 65) / 100) * 100) / 100;
    const stock = rng.range(0, 300);
    const name = `${rng.pick(productAdjectives)} ${rng.pick(productNouns)} ${i}`;
    products.push({ id: i, name, category_id: catId, price, cost, stock_quantity: stock });
  }

  // 4. Customers (500)
  const firstNames = ["James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "Benjamin", "Isabella", "Lucas", "Mia", "Henry", "Evelyn", "Alexander", "Harper", "Sebastian", "Camila", "Jack", "Gianna"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

  const customers: Array<{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    region: string;
    created_at: string;
  }> = [];

  for (let i = 1; i <= 500; i++) {
    const fn = rng.pick(firstNames);
    const ln = rng.pick(lastNames);
    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.com`;
    const region = rng.pick(regions);
    const month = String(rng.range(1, 12)).padStart(2, "0");
    const day = String(rng.range(1, 28)).padStart(2, "0");
    customers.push({
      id: i,
      first_name: fn,
      last_name: ln,
      email,
      region,
      created_at: `2025-${month}-${day} 10:00:00`,
    });
  }

  // 5. Orders (~1,500)
  // Some customers have 0 orders, some have 1-6 orders
  const orders: Array<{
    id: number;
    customer_id: number;
    status: string;
    total_amount: number;
    shipping_fee: number;
    order_date: string;
  }> = [];

  let orderId = 1;
  // Use first 420 customers for orders (leaving 80 customers with 0 orders for query testing)
  for (let c = 1; c <= 420; c++) {
    const orderCount = rng.range(1, 5);
    for (let o = 0; o < orderCount; o++) {
      const month = String(rng.range(1, 12)).padStart(2, "0");
      const day = String(rng.range(1, 28)).padStart(2, "0");
      const hour = String(rng.range(8, 21)).padStart(2, "0");
      const minute = String(rng.range(10, 59)).padStart(2, "0");
      
      const statusWeight = rng.range(1, 100);
      let status = "delivered";
      if (statusWeight > 90) status = "cancelled";
      else if (statusWeight > 80) status = "returned";
      else if (statusWeight > 70) status = "completed";
      else if (statusWeight > 65) status = "pending";

      orders.push({
        id: orderId++,
        customer_id: c,
        status,
        total_amount: 0, // Calculated after items
        shipping_fee: rng.range(0, 15),
        order_date: `2025-${month}-${day} ${hour}:${minute}:00`,
      });
      if (orderId > 1500) break;
    }
    if (orderId > 1500) break;
  }

  // 6. Order Items (~3,500)
  const orderItems: Array<{
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
  }> = [];

  let itemId = 1;
  for (const ord of orders) {
    const itemCount = rng.range(1, 4);
    let orderTotal = ord.shipping_fee;

    for (let it = 0; it < itemCount; it++) {
      const prod = rng.pick(products);
      const qty = rng.range(1, 3);
      orderTotal += prod.price * qty;

      orderItems.push({
        id: itemId++,
        order_id: ord.id,
        product_id: prod.id,
        quantity: qty,
        unit_price: prod.price,
      });
    }
    ord.total_amount = Math.round(orderTotal * 100) / 100;
  }

  // 7. Shipments (~1,200)
  const shipments: Array<{
    id: number;
    order_id: number;
    carrier: string;
    tracking_number: string;
    shipped_at: string;
    delivered_at: string | null;
  }> = [];

  let shipmentId = 1;
  for (const ord of orders) {
    if (ord.status === "delivered" || ord.status === "completed") {
      const carrier = rng.pick(carriers);
      const track = `${carrier.substring(0, 2).toUpperCase()}${rng.range(10000000, 99999999)}`;
      shipments.push({
        id: shipmentId++,
        order_id: ord.id,
        carrier,
        tracking_number: track,
        shipped_at: ord.order_date,
        delivered_at: ord.order_date, // simplified timestamp
      });
    }
  }

  return {
    schemaName,
    departments,
    categories,
    products,
    customers,
    orders,
    orderItems,
    shipments,
  };
}

export function generateEcomL1Sql(variant: "main" | "validation" = "main"): string {
  const data = generateEcomL1Data(variant);
  const schema = data.schemaName;

  const sqlStatements: string[] = [
    `CREATE SCHEMA IF NOT EXISTS "${schema}";`,
    `SET search_path = "${schema}";`,

    // Departments
    `DROP TABLE IF EXISTS "${schema}"."order_items" CASCADE;`,
    `DROP TABLE IF EXISTS "${schema}"."shipments" CASCADE;`,
    `DROP TABLE IF EXISTS "${schema}"."orders" CASCADE;`,
    `DROP TABLE IF EXISTS "${schema}"."customers" CASCADE;`,
    `DROP TABLE IF EXISTS "${schema}"."products" CASCADE;`,
    `DROP TABLE IF EXISTS "${schema}"."categories" CASCADE;`,
    `DROP TABLE IF EXISTS "${schema}"."departments" CASCADE;`,

    `CREATE TABLE "${schema}"."departments" (
      id INT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      head_name VARCHAR(100) NOT NULL
    );`,

    `CREATE TABLE "${schema}"."categories" (
      id INT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      department_id INT REFERENCES "${schema}"."departments"(id)
    );`,

    `CREATE TABLE "${schema}"."products" (
      id INT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      category_id INT REFERENCES "${schema}"."categories"(id),
      price NUMERIC(10, 2) NOT NULL,
      cost NUMERIC(10, 2) NOT NULL,
      stock_quantity INT NOT NULL
    );`,

    `CREATE TABLE "${schema}"."customers" (
      id INT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      region VARCHAR(50) NOT NULL,
      created_at TIMESTAMP NOT NULL
    );`,

    `CREATE TABLE "${schema}"."orders" (
      id INT PRIMARY KEY,
      customer_id INT REFERENCES "${schema}"."customers"(id),
      status VARCHAR(30) NOT NULL,
      total_amount NUMERIC(10, 2) NOT NULL,
      shipping_fee NUMERIC(10, 2) NOT NULL,
      order_date TIMESTAMP NOT NULL
    );`,

    `CREATE TABLE "${schema}"."order_items" (
      id INT PRIMARY KEY,
      order_id INT REFERENCES "${schema}"."orders"(id),
      product_id INT REFERENCES "${schema}"."products"(id),
      quantity INT NOT NULL,
      unit_price NUMERIC(10, 2) NOT NULL
    );`,

    `CREATE TABLE "${schema}"."shipments" (
      id INT PRIMARY KEY,
      order_id INT REFERENCES "${schema}"."orders"(id),
      carrier VARCHAR(50) NOT NULL,
      tracking_number VARCHAR(100) NOT NULL,
      shipped_at TIMESTAMP NOT NULL,
      delivered_at TIMESTAMP
    );`,
  ];

  // Inserts
  for (const d of data.departments) {
    sqlStatements.push(`INSERT INTO "${schema}"."departments" (id, name, head_name) VALUES (${d.id}, '${d.name}', '${d.head_name}');`);
  }

  for (const c of data.categories) {
    sqlStatements.push(`INSERT INTO "${schema}"."categories" (id, name, department_id) VALUES (${c.id}, '${c.name}', ${c.department_id});`);
  }

  for (const p of data.products) {
    const cleanName = p.name.replace(/'/g, "''");
    sqlStatements.push(`INSERT INTO "${schema}"."products" (id, name, category_id, price, cost, stock_quantity) VALUES (${p.id}, '${cleanName}', ${p.category_id}, ${p.price}, ${p.cost}, ${p.stock_quantity});`);
  }

  for (const cu of data.customers) {
    sqlStatements.push(`INSERT INTO "${schema}"."customers" (id, first_name, last_name, email, region, created_at) VALUES (${cu.id}, '${cu.first_name}', '${cu.last_name}', '${cu.email}', '${cu.region}', '${cu.created_at}');`);
  }

  for (const o of data.orders) {
    sqlStatements.push(`INSERT INTO "${schema}"."orders" (id, customer_id, status, total_amount, shipping_fee, order_date) VALUES (${o.id}, ${o.customer_id}, '${o.status}', ${o.total_amount}, ${o.shipping_fee}, '${o.order_date}');`);
  }

  for (const oi of data.orderItems) {
    sqlStatements.push(`INSERT INTO "${schema}"."order_items" (id, order_id, product_id, quantity, unit_price) VALUES (${oi.id}, ${oi.order_id}, ${oi.product_id}, ${oi.quantity}, ${oi.unit_price});`);
  }

  for (const s of data.shipments) {
    const del = s.delivered_at ? `'${s.delivered_at}'` : "NULL";
    sqlStatements.push(`INSERT INTO "${schema}"."shipments" (id, order_id, carrier, tracking_number, shipped_at, delivered_at) VALUES (${s.id}, ${s.order_id}, '${s.carrier}', '${s.tracking_number}', '${s.shipped_at}', ${del});`);
  }

  return sqlStatements.join("\n");
}
