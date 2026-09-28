import { generateEcomL1Sql } from "./ecom-l1-generator";

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

export function generateDomainSql(
  domain: string,
  variant: "main" | "validation" = "main"
): string {
  const normDomain = domain.toLowerCase();

  if (normDomain === "ecommerce") {
    return generateEcomL1Sql(variant);
  }

  const baseSchema = `${normDomain}_l1`;
  const schema = variant === "main" ? baseSchema : `${baseSchema}_val`;
  const seed = variant === "main" ? 31415 : 92653;
  const rng = new SeededRandom(seed);

  const sql: string[] = [
    `CREATE SCHEMA IF NOT EXISTS "${schema}";`,
  ];

  if (normDomain === "healthcare") {
    sql.push(
      `DROP TABLE IF EXISTS "${schema}"."prescriptions" CASCADE;`,
      `DROP TABLE IF EXISTS "${schema}"."appointments" CASCADE;`,
      `DROP TABLE IF EXISTS "${schema}"."doctors" CASCADE;`,
      `DROP TABLE IF EXISTS "${schema}"."patients" CASCADE;`,
      `CREATE TABLE "${schema}"."patients" (
        id INT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        dob DATE NOT NULL,
        gender VARCHAR(10) NOT NULL,
        insurance_provider VARCHAR(80) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."doctors" (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        specialty VARCHAR(80) NOT NULL,
        department VARCHAR(50) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."appointments" (
        id INT PRIMARY KEY,
        patient_id INT REFERENCES "${schema}"."patients"(id),
        doctor_id INT REFERENCES "${schema}"."doctors"(id),
        appointment_date TIMESTAMP NOT NULL,
        status VARCHAR(30) NOT NULL,
        fee NUMERIC(10,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."prescriptions" (
        id INT PRIMARY KEY,
        appointment_id INT REFERENCES "${schema}"."appointments"(id),
        medication_name VARCHAR(100) NOT NULL,
        dosage VARCHAR(50) NOT NULL,
        refills INT NOT NULL
      );`
    );

    // Patients
    const ins = ["BlueCross", "Aetna", "UnitedHealth", "Cigna", "Kaiser", "Medicare"];
    const fn = ["James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "Lucas", "Isabella"];
    const ln = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez"];
    for (let i = 1; i <= 40; i++) {
      sql.push(`INSERT INTO "${schema}"."patients" VALUES (${i}, '${rng.pick(fn)}', '${rng.pick(ln)}', '${1960 + rng.range(0, 45)}-0${rng.range(1, 9)}-15', '${rng.pick(["Female", "Male"])}', '${rng.pick(ins)}');`);
    }

    // Doctors
    const docs = [
      [1, "Dr. Sarah Chen", "Cardiology", "Cardiovascular"],
      [2, "Dr. Michael Ross", "Pediatrics", "Primary Care"],
      [3, "Dr. Emily Taylor", "Neurology", "Neuroscience"],
      [4, "Dr. Robert Patel", "Orthopedics", "Surgical"],
      [5, "Dr. Lisa Wong", "General Practice", "Primary Care"],
    ];
    for (const d of docs) {
      sql.push(`INSERT INTO "${schema}"."doctors" VALUES (${d[0]}, '${d[1]}', '${d[2]}', '${d[3]}');`);
    }

    // Appointments
    const statuses = ["completed", "completed", "completed", "cancelled", "no_show"];
    for (let i = 1; i <= 60; i++) {
      sql.push(`INSERT INTO "${schema}"."appointments" VALUES (${i}, ${rng.range(1, 40)}, ${rng.range(1, 5)}, '2024-0${rng.range(1, 6)}-${rng.range(10, 28)} 09:30:00', '${rng.pick(statuses)}', ${rng.range(75, 250)}.00);`);
    }

    // Prescriptions
    const meds = [
      ["Amoxicillin", "500mg", 1],
      ["Lipitor", "20mg", 3],
      ["Metformin", "1000mg", 2],
      ["Lisinopril", "10mg", 3],
      ["Albuterol", "90mcg", 2],
    ];
    for (let i = 1; i <= 40; i++) {
      const m = rng.pick(meds);
      sql.push(`INSERT INTO "${schema}"."prescriptions" VALUES (${i}, ${rng.range(1, 50)}, '${m[0]}', '${m[1]}', ${m[2]});`);
    }
  } else if (normDomain === "finance") {
    sql.push(
      `DROP TABLE IF EXISTS "${schema}"."transactions" CASCADE;`,
      `DROP TABLE IF EXISTS "${schema}"."accounts" CASCADE;`,
      `DROP TABLE IF EXISTS "${schema}"."customers" CASCADE;`,
      `CREATE TABLE "${schema}"."customers" (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        credit_score INT NOT NULL,
        branch_city VARCHAR(50) NOT NULL,
        created_at DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."accounts" (
        id INT PRIMARY KEY,
        customer_id INT REFERENCES "${schema}"."customers"(id),
        account_type VARCHAR(30) NOT NULL,
        balance NUMERIC(12,2) NOT NULL,
        status VARCHAR(20) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."transactions" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        amount NUMERIC(10,2) NOT NULL,
        transaction_type VARCHAR(20) NOT NULL,
        created_at TIMESTAMP NOT NULL
      );`
    );

    const cities = ["New York", "Chicago", "San Francisco", "Austin", "Boston", "Seattle"];
    const names = ["Apex Trading LLC", "Quantum Fund", "Helios Partners", "Horizon Logistics", "Beacon Retail", "Vanguard Media"];
    for (let i = 1; i <= 30; i++) {
      sql.push(`INSERT INTO "${schema}"."customers" VALUES (${i}, '${rng.pick(names)} ${i}', ${rng.range(620, 810)}, '${rng.pick(cities)}', '2023-0${rng.range(1, 9)}-01');`);
    }

    const types = ["checking", "savings", "investment", "credit"];
    const accStatuses = ["active", "active", "active", "frozen", "closed"];
    for (let i = 1; i <= 50; i++) {
      sql.push(`INSERT INTO "${schema}"."accounts" VALUES (${i}, ${rng.range(1, 30)}, '${rng.pick(types)}', ${rng.range(1500, 75000)}.50, '${rng.pick(accStatuses)}');`);
    }

    const txTypes = ["deposit", "withdrawal", "transfer", "fee"];
    for (let i = 1; i <= 80; i++) {
      sql.push(`INSERT INTO "${schema}"."transactions" VALUES (${i}, ${rng.range(1, 50)}, ${rng.range(50, 4800)}.00, '${rng.pick(txTypes)}', '2024-0${rng.range(1, 6)}-${rng.range(10, 28)} 14:20:00');`);
    }
  } else if (normDomain === "hr") {
    sql.push(
      `DROP TABLE IF EXISTS "${schema}"."performance_reviews" CASCADE;`,
      `DROP TABLE IF EXISTS "${schema}"."employees" CASCADE;`,
      `DROP TABLE IF EXISTS "${schema}"."departments" CASCADE;`,
      `CREATE TABLE "${schema}"."departments" (
        id INT PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        head_name VARCHAR(80) NOT NULL,
        budget NUMERIC(12,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."employees" (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        department_id INT REFERENCES "${schema}"."departments"(id),
        salary NUMERIC(10,2) NOT NULL,
        hire_date DATE NOT NULL,
        status VARCHAR(20) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."performance_reviews" (
        id INT PRIMARY KEY,
        employee_id INT REFERENCES "${schema}"."employees"(id),
        review_year INT NOT NULL,
        rating INT NOT NULL,
        bonus_pct NUMERIC(5,2) NOT NULL
      );`
    );

    const depts = [
      [1, "Engineering", "David Kim", 1200000],
      [2, "Product & Design", "Alicia Gomez", 650000],
      [3, "Sales", "Marcus Vance", 900000],
      [4, "People Operations", "Maya Thorne", 400000],
      [5, "Customer Success", "Chloe Bennett", 350000],
    ];
    for (const d of depts) {
      sql.push(`INSERT INTO "${schema}"."departments" VALUES (${d[0]}, '${d[1]}', '${d[2]}', ${d[3]}.00);`);
    }

    const empNames = ["Alex Smith", "Jordan Lee", "Taylor Swift", "Chris Martin", "Sam Wilson", "Robin Brooks", "Casey Morgan", "Morgan Riley"];
    const statuses = ["active", "active", "active", "on_leave", "terminated"];
    for (let i = 1; i <= 40; i++) {
      sql.push(`INSERT INTO "${schema}"."employees" VALUES (${i}, '${rng.pick(empNames)} ${i}', ${rng.range(1, 5)}, ${rng.range(65000, 160000)}.00, '2022-0${rng.range(1, 9)}-15', '${rng.pick(statuses)}');`);
    }

    for (let i = 1; i <= 40; i++) {
      sql.push(`INSERT INTO "${schema}"."performance_reviews" VALUES (${i}, ${i}, 2023, ${rng.range(2, 5)}, ${rng.range(5, 20)}.00);`);
    }
  } else if (normDomain === "logistics") {
    sql.push(
      `DROP TABLE IF EXISTS "${schema}"."shipments" CASCADE;`,
      `DROP TABLE IF EXISTS "${schema}"."warehouses" CASCADE;`,
      `DROP TABLE IF EXISTS "${schema}"."carriers" CASCADE;`,
      `CREATE TABLE "${schema}"."warehouses" (
        id INT PRIMARY KEY,
        city VARCHAR(80) NOT NULL,
        capacity_sqft INT NOT NULL,
        manager_name VARCHAR(80) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."carriers" (
        id INT PRIMARY KEY,
        carrier_name VARCHAR(80) NOT NULL,
        service_level VARCHAR(40) NOT NULL,
        rating NUMERIC(3,1) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."shipments" (
        id INT PRIMARY KEY,
        warehouse_id INT REFERENCES "${schema}"."warehouses"(id),
        carrier_id INT REFERENCES "${schema}"."carriers"(id),
        origin_warehouse VARCHAR(80) NOT NULL,
        destination_city VARCHAR(80) NOT NULL,
        weight_kg NUMERIC(8,2) NOT NULL,
        status VARCHAR(30) NOT NULL
      );`
    );

    const whs = [
      [1, "Chicago Hub", 150000, "Frank Miller"],
      [2, "Dallas Crossdock", 220000, "Sandra Ruiz"],
      [3, "Newark Gateway", 180000, "Dave Miller"],
      [4, "Atlanta South", 120000, "Kevin Young"],
    ];
    for (const w of whs) {
      sql.push(`INSERT INTO "${schema}"."warehouses" VALUES (${w[0]}, '${w[1]}', ${w[2]}, '${w[3]}');`);
    }

    const crs = [
      [1, "Apex Express", "Next-Day Freight", 4.8],
      [2, "SwiftLine Logistics", "Standard Ground", 4.2],
      [3, "Titan Cargo", "Heavy Haul", 4.5],
      [4, "Metro Couriers", "Same-Day Urban", 4.9],
    ];
    for (const c of crs) {
      sql.push(`INSERT INTO "${schema}"."carriers" VALUES (${c[0]}, '${c[1]}', '${c[2]}', ${c[3]});`);
    }

    const dests = ["Denver", "Phoenix", "Seattle", "Miami", "Boston", "Houston", "Philadelphia"];
    const shipStatuses = ["in_transit", "delivered", "delivered", "delayed", "pending"];
    for (let i = 1; i <= 60; i++) {
      const whId = rng.range(1, 4);
      const whName = whs[whId - 1][1];
      sql.push(`INSERT INTO "${schema}"."shipments" VALUES (${i}, ${whId}, ${rng.range(1, 4)}, '${whName}', '${rng.pick(dests)}', ${rng.range(120, 8500)}.50, '${rng.pick(shipStatuses)}');`);
    }
  } else if (normDomain === "restaurants") {
    sql.push(
      `DROP TABLE IF EXISTS "${schema}"."order_items" CASCADE;`,
      `DROP TABLE IF EXISTS "${schema}"."orders" CASCADE;`,
      `DROP TABLE IF EXISTS "${schema}"."menu_items" CASCADE;`,
      `CREATE TABLE "${schema}"."menu_items" (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        price NUMERIC(8,2) NOT NULL,
        cost NUMERIC(8,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."orders" (
        id INT PRIMARY KEY,
        table_number INT NOT NULL,
        order_time TIMESTAMP NOT NULL,
        total_amount NUMERIC(8,2) NOT NULL,
        server_name VARCHAR(80) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."order_items" (
        id INT PRIMARY KEY,
        order_id INT REFERENCES "${schema}"."orders"(id),
        menu_item_id INT REFERENCES "${schema}"."menu_items"(id),
        quantity INT NOT NULL
      );`
    );

    const dishes = [
      [1, "Truffle Tagliatelle", "entree", 28.0, 7.5],
      [2, "Wood-Fired Margherita", "entree", 19.5, 4.2],
      [3, "Crispy Calamari", "appetizer", 16.0, 3.8],
      [4, "Caesar Alla Griglia", "appetizer", 14.0, 2.9],
      [5, "Tiramisu Tradizionale", "dessert", 11.0, 2.1],
      [6, "Artisan Chianti Glass", "beverage", 15.0, 3.5],
      [7, "Sparkling San Pellegrino", "beverage", 6.0, 0.9],
      [8, "Prime Ribeye 12oz", "entree", 46.0, 16.0],
    ];
    for (const d of dishes) {
      sql.push(`INSERT INTO "${schema}"."menu_items" VALUES (${d[0]}, '${d[1]}', '${d[2]}', ${d[3]}, ${d[4]});`);
    }

    const servers = ["Marco V.", "Elena S.", "Matteo R.", "Gianna P."];
    for (let i = 1; i <= 50; i++) {
      sql.push(`INSERT INTO "${schema}"."orders" VALUES (${i}, ${rng.range(1, 24)}, '2024-04-${rng.range(10, 28)} 19:${rng.range(10, 55)}:00', ${rng.range(42, 195)}.00, '${rng.pick(servers)}');`);
    }

    for (let i = 1; i <= 100; i++) {
      sql.push(`INSERT INTO "${schema}"."order_items" VALUES (${i}, ${rng.range(1, 50)}, ${rng.range(1, 8)}, ${rng.range(1, 3)});`);
    }
  } else if (normDomain === "saas") {
    sql.push(
      `DROP TABLE IF EXISTS "${schema}"."feature_usage" CASCADE;`,
      `DROP TABLE IF EXISTS "${schema}"."subscriptions" CASCADE;`,
      `DROP TABLE IF EXISTS "${schema}"."accounts" CASCADE;`,
      `CREATE TABLE "${schema}"."accounts" (
        id INT PRIMARY KEY,
        company_name VARCHAR(100) NOT NULL,
        industry VARCHAR(60) NOT NULL,
        tier VARCHAR(30) NOT NULL,
        created_at DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."subscriptions" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        plan VARCHAR(30) NOT NULL,
        mrr NUMERIC(10,2) NOT NULL,
        status VARCHAR(20) NOT NULL,
        started_at DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."feature_usage" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        feature_name VARCHAR(80) NOT NULL,
        monthly_events INT NOT NULL
      );`
    );

    const coNames = ["Acme Devs", "StackCloud", "Nexus AI", "HyperScale", "DataFlow Inc", "OmniLayer", "ByteWise"];
    const indus = ["Fintech", "Healthtech", "DevTools", "E-Commerce", "EdTech"];
    for (let i = 1; i <= 30; i++) {
      sql.push(`INSERT INTO "${schema}"."accounts" VALUES (${i}, '${rng.pick(coNames)} ${i}', '${rng.pick(indus)}', '${rng.pick(["starter", "growth", "enterprise"])}', '2023-0${rng.range(1, 9)}-10');`);
    }

    const plans = [
      ["starter", 99.0],
      ["professional", 499.0],
      ["enterprise", 2499.0],
    ];
    const subStatuses = ["active", "active", "active", "past_due", "cancelled"];
    for (let i = 1; i <= 30; i++) {
      const p = rng.pick(plans);
      sql.push(`INSERT INTO "${schema}"."subscriptions" VALUES (${i}, ${i}, '${p[0]}', ${p[1]}, '${rng.pick(subStatuses)}', '2023-11-01');`);
    }

    const features = ["api_calls", "webhook_delivery", "audit_export", "custom_dashboard"];
    let fId = 1;
    for (let acc = 1; acc <= 30; acc++) {
      for (const feat of features) {
        sql.push(`INSERT INTO "${schema}"."feature_usage" VALUES (${fId++}, ${acc}, '${feat}', ${rng.range(500, 150000)});`);
      }
    }
  }

  return sql.join("\n");
}
