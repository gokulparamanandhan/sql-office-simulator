import { generateEcomL1Data } from "./ecom-l1-generator";

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
  variant: "main" | "validation" = "main",
  targetSchemaParam?: string
): string {
  const normDomain = domain.toLowerCase();
  const baseSchema = normDomain === "ecommerce" || normDomain === "ecom" ? "ecom_l1" : `${normDomain}_l1`;
  const defaultSchema = variant === "main" ? baseSchema : `${baseSchema}_val`;
  const schema = targetSchemaParam || defaultSchema;

  const seed = variant === "main" ? 31415 : 92653;
  const rng = new SeededRandom(seed);

  const sql: string[] = [
    `CREATE SCHEMA IF NOT EXISTS "${schema}";`,
  ];

  if (normDomain === "ecommerce" || normDomain === "ecom") {
    // 1. Drop existing ecom tables
    const ecomTables = [
      "support_tickets", "returns", "customer_reviews", "coupons", "inventory",
      "warehouses", "suppliers", "brands", "shipments", "order_items", "orders",
      "products", "categories", "departments", "customers"
    ];
    for (const tbl of ecomTables) {
      sql.push(`DROP TABLE IF EXISTS "${schema}"."${tbl}" CASCADE;`);
    }

    // DDL for all 15 E-Commerce tables
    sql.push(
      `CREATE TABLE "${schema}"."departments" (
        id INT PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        head_name VARCHAR(80) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."categories" (
        id INT PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        department_id INT REFERENCES "${schema}"."departments"(id)
      );`,
      `CREATE TABLE "${schema}"."brands" (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        country_of_origin VARCHAR(50) NOT NULL,
        tier VARCHAR(30) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."suppliers" (
        id INT PRIMARY KEY,
        company_name VARCHAR(100) NOT NULL,
        contact_email VARCHAR(100) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        country VARCHAR(50) NOT NULL,
        rating NUMERIC(3,1) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."products" (
        id INT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        category_id INT REFERENCES "${schema}"."categories"(id),
        price NUMERIC(10,2) NOT NULL,
        cost NUMERIC(10,2) NOT NULL,
        stock_quantity INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."customers" (
        id INT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        region VARCHAR(50) NOT NULL,
        created_at TIMESTAMP NOT NULL
      );`,
      `CREATE TABLE "${schema}"."orders" (
        id INT PRIMARY KEY,
        customer_id INT REFERENCES "${schema}"."customers"(id),
        status VARCHAR(30) NOT NULL,
        total_amount NUMERIC(10,2) NOT NULL,
        shipping_fee NUMERIC(10,2) NOT NULL,
        order_date TIMESTAMP NOT NULL
      );`,
      `CREATE TABLE "${schema}"."order_items" (
        id INT PRIMARY KEY,
        order_id INT REFERENCES "${schema}"."orders"(id),
        product_id INT REFERENCES "${schema}"."products"(id),
        quantity INT NOT NULL,
        unit_price NUMERIC(10,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."shipments" (
        id INT PRIMARY KEY,
        order_id INT REFERENCES "${schema}"."orders"(id),
        carrier VARCHAR(40) NOT NULL,
        tracking_number VARCHAR(50) NOT NULL,
        shipped_at TIMESTAMP,
        delivered_at TIMESTAMP
      );`,
      `CREATE TABLE "${schema}"."warehouses" (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        city VARCHAR(80) NOT NULL,
        state VARCHAR(50) NOT NULL,
        capacity_sqft INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."inventory" (
        id INT PRIMARY KEY,
        product_id INT REFERENCES "${schema}"."products"(id),
        warehouse_id INT REFERENCES "${schema}"."warehouses"(id),
        quantity_on_hand INT NOT NULL,
        reserved_quantity INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."coupons" (
        id INT PRIMARY KEY,
        code VARCHAR(30) NOT NULL,
        discount_percent INT NOT NULL,
        max_uses INT NOT NULL,
        current_uses INT NOT NULL,
        is_active BOOLEAN NOT NULL
      );`,
      `CREATE TABLE "${schema}"."customer_reviews" (
        id INT PRIMARY KEY,
        customer_id INT REFERENCES "${schema}"."customers"(id),
        product_id INT REFERENCES "${schema}"."products"(id),
        rating INT NOT NULL,
        title VARCHAR(120) NOT NULL,
        is_verified_purchase BOOLEAN NOT NULL,
        review_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."returns" (
        id INT PRIMARY KEY,
        order_id INT REFERENCES "${schema}"."orders"(id),
        product_id INT REFERENCES "${schema}"."products"(id),
        reason VARCHAR(100) NOT NULL,
        refund_amount NUMERIC(10,2) NOT NULL,
        status VARCHAR(30) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."support_tickets" (
        id INT PRIMARY KEY,
        customer_id INT REFERENCES "${schema}"."customers"(id),
        order_id INT REFERENCES "${schema}"."orders"(id),
        category VARCHAR(50) NOT NULL,
        priority VARCHAR(20) NOT NULL,
        status VARCHAR(30) NOT NULL,
        created_at TIMESTAMP NOT NULL
      );`
    );

    // Seed original 7 tables using existing generator logic for 100% test compatibility
    const ecomData = generateEcomL1Data(variant);
    for (const d of ecomData.departments) {
      sql.push(`INSERT INTO "${schema}"."departments" VALUES (${d.id}, '${d.name}', '${d.head_name}');`);
    }
    for (const c of ecomData.categories) {
      sql.push(`INSERT INTO "${schema}"."categories" VALUES (${c.id}, '${c.name}', ${c.department_id});`);
    }
    for (const p of ecomData.products) {
      sql.push(`INSERT INTO "${schema}"."products" VALUES (${p.id}, '${p.name.replace(/'/g, "''")}', ${p.category_id}, ${p.price}, ${p.cost}, ${p.stock_quantity});`);
    }
    for (const c of ecomData.customers) {
      sql.push(`INSERT INTO "${schema}"."customers" VALUES (${c.id}, '${c.first_name}', '${c.last_name}', '${c.email}', '${c.region}', '${c.created_at}');`);
    }
    for (const o of ecomData.orders) {
      sql.push(`INSERT INTO "${schema}"."orders" VALUES (${o.id}, ${o.customer_id}, '${o.status}', ${o.total_amount}, ${o.shipping_fee}, '${o.order_date}');`);
    }
    for (const oi of ecomData.orderItems) {
      sql.push(`INSERT INTO "${schema}"."order_items" VALUES (${oi.id}, ${oi.order_id}, ${oi.product_id}, ${oi.quantity}, ${oi.unit_price});`);
    }
    for (const s of ecomData.shipments) {
      const delivered = s.delivered_at ? `'${s.delivered_at}'` : "NULL";
      sql.push(`INSERT INTO "${schema}"."shipments" VALUES (${s.id}, ${s.order_id}, '${s.carrier}', '${s.tracking_number}', '${s.shipped_at}', ${delivered});`);
    }

    // Seed additional 8 E-Commerce tables
    const brands = [
      [1, "HyperTech", "USA", "premium"],
      [2, "AeroStyle", "Italy", "luxury"],
      [3, "EcoLife Goods", "Sweden", "value"],
      [4, "Apex Sport", "Germany", "premium"],
      [5, "PureGlow Labs", "France", "luxury"],
    ];
    for (const b of brands) {
      sql.push(`INSERT INTO "${schema}"."brands" VALUES (${b[0]}, '${b[1]}', '${b[2]}', '${b[3]}');`);
    }

    const suppliers = [
      [1, "Global Chip Components", "procure@globalchip.com", "+1-415-555-0199", "USA", 4.8],
      [2, "SilkRoad Textiles Co", "orders@silkroadtextiles.cn", "+86-21-555-0812", "China", 4.4],
      [3, "Nordic Craft Furniture", "sales@nordiccraft.se", "+46-8-555-1200", "Sweden", 4.9],
      [4, "Bavaria Precision Tooling", "logistics@bavariaprecision.de", "+49-89-555-7788", "Germany", 4.7],
    ];
    for (const s of suppliers) {
      sql.push(`INSERT INTO "${schema}"."suppliers" VALUES (${s[0]}, '${s[1]}', '${s[2]}', '${s[3]}', '${s[4]}', ${s[5]});`);
    }

    const warehouses = [
      [1, "East Coast Fulfillment Hub", "Allentown", "PA", 350000],
      [2, "Midwest Gateway DC", "Indianapolis", "IN", 420000],
      [3, "West Coast Mega Depot", "Ontario", "CA", 500000],
      [4, "Southern Crossdock", "Dallas", "TX", 280000],
    ];
    for (const w of warehouses) {
      sql.push(`INSERT INTO "${schema}"."warehouses" VALUES (${w[0]}, '${w[1]}', '${w[2]}', '${w[3]}', ${w[4]});`);
    }

    let invId = 1;
    for (let p = 1; p <= 50; p++) {
      for (let w = 1; w <= 4; w++) {
        sql.push(`INSERT INTO "${schema}"."inventory" VALUES (${invId++}, ${p}, ${w}, ${rng.range(50, 600)}, ${rng.range(5, 50)});`);
      }
    }

    const coupons = [
      [1, "SAVE10", 10, 5000, 1420, true],
      [2, "FLASH25", 25, 1000, 890, true],
      [3, "SUMMER15", 15, 2000, 2000, false],
      [4, "WELCOME20", 20, 10000, 4310, true],
      [5, "VIP30", 30, 500, 245, true],
    ];
    for (const c of coupons) {
      sql.push(`INSERT INTO "${schema}"."coupons" VALUES (${c[0]}, '${c[1]}', ${c[2]}, ${c[3]}, ${c[4]}, ${c[5]});`);
    }

    const reviewTitles = ["Exceeded expectations!", "Decent value for money", "Solid quality and build", "Would definitely buy again", "Average experience"];
    for (let r = 1; r <= 80; r++) {
      sql.push(`INSERT INTO "${schema}"."customer_reviews" VALUES (${r}, ${rng.range(1, 100)}, ${rng.range(1, 50)}, ${rng.range(3, 5)}, '${rng.pick(reviewTitles)}', true, '2024-0${rng.range(1, 5)}-${rng.range(10, 28)}');`);
    }

    const returnReasons = ["defective", "wrong_size", "not_needed", "late_delivery"];
    const returnStatuses = ["completed", "approved", "processing"];
    for (let rt = 1; rt <= 40; rt++) {
      sql.push(`INSERT INTO "${schema}"."returns" VALUES (${rt}, ${rng.range(1, 200)}, ${rng.range(1, 50)}, '${rng.pick(returnReasons)}', ${rng.range(25, 180)}.00, '${rng.pick(returnStatuses)}');`);
    }

    const ticketCats = ["delivery", "product", "billing", "account"];
    const ticketPriorities = ["low", "medium", "high", "urgent"];
    const ticketStatuses = ["open", "in_progress", "resolved", "closed"];
    for (let t = 1; t <= 50; t++) {
      sql.push(`INSERT INTO "${schema}"."support_tickets" VALUES (${t}, ${rng.range(1, 100)}, ${rng.range(1, 200)}, '${rng.pick(ticketCats)}', '${rng.pick(ticketPriorities)}', '${rng.pick(ticketStatuses)}', '2024-0${rng.range(1, 5)}-${rng.range(10, 28)} 11:30:00');`);
    }

  } else if (normDomain === "healthcare") {
    const hcTables = [
      "medical_procedures", "inpatient_admissions", "insurance_claims", "billing",
      "patient_lab_results", "lab_tests", "prescriptions", "medications", "diagnoses",
      "appointments", "rooms", "patients", "nurses", "doctors", "departments"
    ];
    for (const tbl of hcTables) {
      sql.push(`DROP TABLE IF EXISTS "${schema}"."${tbl}" CASCADE;`);
    }

    sql.push(
      `CREATE TABLE "${schema}"."departments" (
        id INT PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        building VARCHAR(50) NOT NULL,
        floor INT NOT NULL,
        head_doctor_id INT
      );`,
      `CREATE TABLE "${schema}"."doctors" (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        specialty VARCHAR(80) NOT NULL,
        department_id INT REFERENCES "${schema}"."departments"(id),
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        license_number VARCHAR(40) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."nurses" (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        department_id INT REFERENCES "${schema}"."departments"(id),
        shift VARCHAR(20) NOT NULL,
        certification_level VARCHAR(30) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."patients" (
        id INT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        dob DATE NOT NULL,
        gender VARCHAR(10) NOT NULL,
        blood_type VARCHAR(5) NOT NULL,
        insurance_provider VARCHAR(80) NOT NULL,
        city VARCHAR(50) NOT NULL,
        created_at DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."rooms" (
        id INT PRIMARY KEY,
        room_number VARCHAR(20) NOT NULL,
        department_id INT REFERENCES "${schema}"."departments"(id),
        room_type VARCHAR(40) NOT NULL,
        daily_rate NUMERIC(10,2) NOT NULL,
        is_occupied BOOLEAN NOT NULL
      );`,
      `CREATE TABLE "${schema}"."appointments" (
        id INT PRIMARY KEY,
        patient_id INT REFERENCES "${schema}"."patients"(id),
        doctor_id INT REFERENCES "${schema}"."doctors"(id),
        appointment_date TIMESTAMP NOT NULL,
        appointment_type VARCHAR(40) NOT NULL,
        status VARCHAR(30) NOT NULL,
        fee NUMERIC(10,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."diagnoses" (
        id INT PRIMARY KEY,
        patient_id INT REFERENCES "${schema}"."patients"(id),
        appointment_id INT REFERENCES "${schema}"."appointments"(id),
        icd10_code VARCHAR(15) NOT NULL,
        description VARCHAR(150) NOT NULL,
        severity VARCHAR(20) NOT NULL,
        diagnosis_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."medications" (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        generic_name VARCHAR(100) NOT NULL,
        dosage_form VARCHAR(50) NOT NULL,
        strength VARCHAR(30) NOT NULL,
        unit_cost NUMERIC(8,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."prescriptions" (
        id INT PRIMARY KEY,
        appointment_id INT REFERENCES "${schema}"."appointments"(id),
        patient_id INT REFERENCES "${schema}"."patients"(id),
        doctor_id INT REFERENCES "${schema}"."doctors"(id),
        medication_name VARCHAR(100) NOT NULL,
        dosage VARCHAR(50) NOT NULL,
        refills INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."lab_tests" (
        id INT PRIMARY KEY,
        test_name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        standard_fee NUMERIC(10,2) NOT NULL,
        normal_range_min NUMERIC(8,2) NOT NULL,
        normal_range_max NUMERIC(8,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."patient_lab_results" (
        id INT PRIMARY KEY,
        patient_id INT REFERENCES "${schema}"."patients"(id),
        test_id INT REFERENCES "${schema}"."lab_tests"(id),
        result_value NUMERIC(8,2) NOT NULL,
        flag VARCHAR(20) NOT NULL,
        performed_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."billing" (
        id INT PRIMARY KEY,
        patient_id INT REFERENCES "${schema}"."patients"(id),
        appointment_id INT REFERENCES "${schema}"."appointments"(id),
        total_charge NUMERIC(10,2) NOT NULL,
        copay_amount NUMERIC(10,2) NOT NULL,
        insurance_covered NUMERIC(10,2) NOT NULL,
        patient_balance NUMERIC(10,2) NOT NULL,
        status VARCHAR(30) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."insurance_claims" (
        id INT PRIMARY KEY,
        billing_id INT REFERENCES "${schema}"."billing"(id),
        insurance_provider VARCHAR(80) NOT NULL,
        claim_amount NUMERIC(10,2) NOT NULL,
        approved_amount NUMERIC(10,2) NOT NULL,
        status VARCHAR(30) NOT NULL,
        settlement_days INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."inpatient_admissions" (
        id INT PRIMARY KEY,
        patient_id INT REFERENCES "${schema}"."patients"(id),
        room_id INT REFERENCES "${schema}"."rooms"(id),
        admitting_doctor_id INT REFERENCES "${schema}"."doctors"(id),
        admission_date DATE NOT NULL,
        discharge_date DATE,
        discharge_disposition VARCHAR(50)
      );`,
      `CREATE TABLE "${schema}"."medical_procedures" (
        id INT PRIMARY KEY,
        code VARCHAR(20) NOT NULL,
        procedure_name VARCHAR(120) NOT NULL,
        department_id INT REFERENCES "${schema}"."departments"(id),
        duration_minutes INT NOT NULL,
        standard_cost NUMERIC(10,2) NOT NULL
      );`
    );

    // Seed Departments
    const depts = [
      [1, "Cardiology", "West Pavilion", 3],
      [2, "Pediatrics", "Childrens Wing", 2],
      [3, "Surgery", "Surgical Tower", 4],
      [4, "Neurology", "North Wing", 5],
      [5, "Oncology", "Cancer Institute", 1],
      [6, "Primary Care", "Ambulatory Clinic", 1],
    ];
    for (const d of depts) {
      sql.push(`INSERT INTO "${schema}"."departments" VALUES (${d[0]}, '${d[1]}', '${d[2]}', ${d[3]}, NULL);`);
    }

    // Seed Doctors (Expanded to 24 clinical physicians)
    const specialties = [
      ["Cardiology", 1], ["Pediatrics", 2], ["Surgery", 3], ["Neurology", 4],
      ["Oncology", 5], ["Primary Care", 6], ["Orthopedics", 3], ["Dermatology", 6],
      ["Emergency Medicine", 3], ["Psychiatry", 6], ["Gastroenterology", 1], ["Radiology", 3]
    ];
    const docNames = [
      "Dr. Sarah Chen", "Dr. Michael Ross", "Dr. Emily Taylor", "Dr. Robert Patel", "Dr. Lisa Wong",
      "Dr. Evelyn Reed", "Dr. David Kim", "Dr. Marcus Thorne", "Dr. Allison Becker", "Dr. Carlos Mendez",
      "Dr. Rachel Green", "Dr. James Wilson", "Dr. Natalie Portman", "Dr. Benjamin Hayes", "Dr. Priya Sharma",
      "Dr. Gregory House", "Dr. Cristina Yang", "Dr. Meredith Grey", "Dr. John Dorian", "Dr. Christopher Turk",
      "Dr. Leonard McCoy", "Dr. Beverly Crusher", "Dr. Julian Bashir", "Dr. Michaela Quinn"
    ];
    for (let d = 0; d < docNames.length; d++) {
      const spec = specialties[d % specialties.length];
      sql.push(`INSERT INTO "${schema}"."doctors" VALUES (${d + 1}, '${docNames[d]}', '${spec[0]}', ${spec[1]}, 'doc${d + 1}@pulsehealth.org', 'x${4400 + d}', 'MD-NY-${70000 + d}');`);
    }

    // Seed Nurses (20 registered nurses)
    const nurseNames = ["Elena Vasquez", "Brian Miller", "Chloe Zhao", "Derrick Lewis", "Hannah Abbott", "Grace Hopper", "Florence Nightingale", "Clara Barton", "Mary Seacole", "Walt Whitman"];
    for (let n = 1; n <= 20; n++) {
      sql.push(`INSERT INTO "${schema}"."nurses" VALUES (${n}, '${nurseNames[(n - 1) % nurseNames.length]} ${n}', ${(n % 6) + 1}, '${n % 2 === 0 ? "Day" : "Night"}', '${n % 3 === 0 ? "NP" : "BSN"}');`);
    }

    // Seed Patients (100 demographic records)
    const ins = ["BlueCross", "Aetna", "UnitedHealth", "Cigna", "Kaiser", "Medicare"];
    const bloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-"];
    const fn = ["James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "Lucas", "Isabella", "Ethan", "Mia", "Alexander", "Charlotte", "Daniel"];
    const ln = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin"];
    const cities = ["New York", "Brooklyn", "Queens", "Bronx", "White Plains", "Yonkers"];
    for (let i = 1; i <= 100; i++) {
      sql.push(`INSERT INTO "${schema}"."patients" VALUES (${i}, '${rng.pick(fn)}', '${rng.pick(ln)}', '${1950 + rng.range(0, 50)}-0${rng.range(1, 9)}-15', '${rng.pick(["Female", "Male"])}', '${rng.pick(bloodTypes)}', '${rng.pick(ins)}', '${rng.pick(cities)}', '2023-0${rng.range(1, 9)}-01');`);
    }

    // Seed Rooms (40 inpatient beds)
    const roomTypes = ["Standard", "ICU", "Semi-Private", "Suite"];
    for (let r = 1; r <= 40; r++) {
      sql.push(`INSERT INTO "${schema}"."rooms" VALUES (${r}, '${100 + r}', ${(r % 6) + 1}, '${rng.pick(roomTypes)}', ${rng.range(450, 2200)}.00, ${r % 3 === 0});`);
    }

    // Seed Appointments (150 clinical encounters)
    const apptTypes = ["Checkup", "Follow-up", "Specialist", "Telehealth", "Urgent"];
    const apptStatuses = ["completed", "completed", "completed", "cancelled", "no_show"];
    for (let a = 1; a <= 150; a++) {
      sql.push(`INSERT INTO "${schema}"."appointments" VALUES (${a}, ${rng.range(1, 100)}, ${rng.range(1, 24)}, '2024-0${rng.range(1, 6)}-${rng.range(10, 28)} 09:${rng.range(10, 50)}:00', '${rng.pick(apptTypes)}', '${rng.pick(apptStatuses)}', ${rng.range(90, 350)}.00);`);
    }

    // Seed Diagnoses
    const icdCodes = [
      ["I10", "Essential Hypertension", "Mild"],
      ["E11.9", "Type 2 Diabetes Mellitus", "Moderate"],
      ["J45", "Chronic Allergic Asthma", "Moderate"],
      ["M54.5", "Low Back Pain", "Mild"],
      ["K21.9", "Gastro-Esophageal Reflux Disease", "Mild"],
      ["I25.1", "Atherosclerotic Heart Disease", "Severe"],
    ];
    for (let dg = 1; dg <= 80; dg++) {
      const c = rng.pick(icdCodes);
      sql.push(`INSERT INTO "${schema}"."diagnoses" VALUES (${dg}, ${rng.range(1, 60)}, ${rng.range(1, 100)}, '${c[0]}', '${c[1]}', '${c[2]}', '2024-0${rng.range(1, 5)}-${rng.range(10, 28)}');`);
    }

    // Seed Medications
    const meds = [
      [1, "Amoxicillin", "Amoxicillin Trihydrate", "Capsule", "500mg", 4.50],
      [2, "Lipitor", "Atorvastatin Calcium", "Tablet", "20mg", 18.20],
      [3, "Glucophage", "Metformin HCl", "Tablet", "1000mg", 6.80],
      [4, "Zestril", "Lisinopril", "Tablet", "10mg", 5.10],
      [5, "ProAir", "Albuterol Sulfate", "Inhaler", "90mcg", 34.00],
      [6, "Plavix", "Clopidogrel Bisulfate", "Tablet", "75mg", 22.50],
    ];
    for (const m of meds) {
      sql.push(`INSERT INTO "${schema}"."medications" VALUES (${m[0]}, '${m[1]}', '${m[2]}', '${m[3]}', '${m[4]}', ${m[5]});`);
    }

    // Seed Prescriptions
    for (let pr = 1; pr <= 70; pr++) {
      const med = rng.pick(meds);
      sql.push(`INSERT INTO "${schema}"."prescriptions" VALUES (${pr}, ${rng.range(1, 100)}, ${rng.range(1, 60)}, ${rng.range(1, 8)}, '${med[1]}', '${med[4]} daily', ${rng.range(1, 3)});`);
    }

    // Seed Lab Tests
    const labs = [
      [1, "Complete Blood Count (CBC)", "Hematology", 65.00, 4.0, 11.0],
      [2, "Comprehensive Metabolic Panel (CMP)", "Biochemistry", 110.00, 70.0, 99.0],
      [3, "Lipid Panel", "Biochemistry", 85.00, 125.0, 200.0],
      [4, "Hemoglobin A1c", "Endocrinology", 95.00, 4.0, 5.6],
      [5, "Thyroid Stimulating Hormone (TSH)", "Immunology", 120.00, 0.4, 4.0],
    ];
    for (const l of labs) {
      sql.push(`INSERT INTO "${schema}"."lab_tests" VALUES (${l[0]}, '${l[1]}', '${l[2]}', ${l[3]}, ${l[4]}, ${l[5]});`);
    }

    // Seed Patient Lab Results
    const flags = ["NORMAL", "NORMAL", "HIGH", "LOW"];
    for (let lr = 1; lr <= 100; lr++) {
      sql.push(`INSERT INTO "${schema}"."patient_lab_results" VALUES (${lr}, ${rng.range(1, 60)}, ${rng.range(1, 5)}, ${rng.range(20, 250)}.50, '${rng.pick(flags)}', '2024-0${rng.range(1, 5)}-${rng.range(10, 28)}');`);
    }

    // Seed Billing
    const billStatuses = ["paid", "pending_insurance", "overdue"];
    for (let b = 1; b <= 100; b++) {
      const total = rng.range(250, 3200);
      const copay = rng.range(25, 100);
      const insCov = Math.floor((total - copay) * 0.8);
      const bal = total - copay - insCov;
      sql.push(`INSERT INTO "${schema}"."billing" VALUES (${b}, ${rng.range(1, 60)}, ${b}, ${total}.00, ${copay}.00, ${insCov}.00, ${bal}.00, '${rng.pick(billStatuses)}');`);
    }

    // Seed Insurance Claims
    const claimStatuses = ["approved", "approved", "submitted", "denied"];
    for (let ic = 1; ic <= 70; ic++) {
      const claimAmt = rng.range(400, 2500);
      const approvedAmt = Math.round(claimAmt * 0.9);
      sql.push(`INSERT INTO "${schema}"."insurance_claims" VALUES (${ic}, ${ic}, '${rng.pick(ins)}', ${claimAmt}.00, ${approvedAmt}.00, '${rng.pick(claimStatuses)}', ${rng.range(12, 45)});`);
    }

    // Seed Inpatient Admissions
    const disps = ["Home", "Rehab", "Transfer"];
    for (let ia = 1; ia <= 30; ia++) {
      sql.push(`INSERT INTO "${schema}"."inpatient_admissions" VALUES (${ia}, ${rng.range(1, 60)}, ${rng.range(1, 20)}, ${rng.range(1, 8)}, '2024-02-10', '2024-02-16', '${rng.pick(disps)}');`);
    }

    // Seed Medical Procedures
    const procs = [
      [1, "99213", "Office outpatient visit low-mod", 6, 20, 125.00],
      [2, "93000", "Electrocardiogram routine 12-lead", 1, 15, 95.00],
      [3, "29881", "Arthroscopy knee surgical with meniscectomy", 3, 90, 3400.00],
      [4, "45378", "Diagnostic colonoscopy with wash", 6, 45, 1850.00],
      [5, "99285", "Emergency department visit high severity", 3, 60, 890.00],
    ];
    for (const p of procs) {
      sql.push(`INSERT INTO "${schema}"."medical_procedures" VALUES (${p[0]}, '${p[1]}', '${p[2]}', ${p[3]}, ${p[4]}, ${p[5]});`);
    }

  } else if (normDomain === "finance") {
    const finTables = [
      "audit_logs", "teller_sessions", "investments", "fraud_alerts", "credit_lines",
      "loan_payments", "loans", "card_swipes", "cards", "merchants", "transactions",
      "accounts", "account_types", "customers", "branches"
    ];
    for (const tbl of finTables) {
      sql.push(`DROP TABLE IF EXISTS "${schema}"."${tbl}" CASCADE;`);
    }

    sql.push(
      `CREATE TABLE "${schema}"."branches" (
        id INT PRIMARY KEY,
        branch_name VARCHAR(80) NOT NULL,
        city VARCHAR(50) NOT NULL,
        state VARCHAR(30) NOT NULL,
        manager_name VARCHAR(80) NOT NULL,
        vault_cash_limit NUMERIC(12,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."customers" (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        credit_score INT NOT NULL,
        branch_city VARCHAR(50) NOT NULL,
        annual_income NUMERIC(12,2) NOT NULL,
        risk_rating VARCHAR(20) NOT NULL,
        created_at DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."account_types" (
        id INT PRIMARY KEY,
        type_name VARCHAR(40) NOT NULL,
        min_balance NUMERIC(10,2) NOT NULL,
        annual_interest_rate NUMERIC(5,2) NOT NULL,
        monthly_fee NUMERIC(6,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."accounts" (
        id INT PRIMARY KEY,
        customer_id INT REFERENCES "${schema}"."customers"(id),
        branch_id INT REFERENCES "${schema}"."branches"(id),
        account_type VARCHAR(30) NOT NULL,
        balance NUMERIC(12,2) NOT NULL,
        status VARCHAR(20) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."transactions" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        amount NUMERIC(10,2) NOT NULL,
        transaction_type VARCHAR(20) NOT NULL,
        description VARCHAR(120) NOT NULL,
        created_at TIMESTAMP NOT NULL
      );`,
      `CREATE TABLE "${schema}"."merchants" (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        city VARCHAR(50) NOT NULL,
        country VARCHAR(50) NOT NULL,
        risk_level VARCHAR(20) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."cards" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        card_type VARCHAR(20) NOT NULL,
        card_number_masked VARCHAR(20) NOT NULL,
        daily_limit NUMERIC(10,2) NOT NULL,
        status VARCHAR(20) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."card_swipes" (
        id INT PRIMARY KEY,
        card_id INT REFERENCES "${schema}"."cards"(id),
        merchant_id INT REFERENCES "${schema}"."merchants"(id),
        amount NUMERIC(10,2) NOT NULL,
        is_contactless BOOLEAN NOT NULL,
        fraud_score INT NOT NULL,
        transaction_date TIMESTAMP NOT NULL
      );`,
      `CREATE TABLE "${schema}"."loans" (
        id INT PRIMARY KEY,
        customer_id INT REFERENCES "${schema}"."customers"(id),
        branch_id INT REFERENCES "${schema}"."branches"(id),
        loan_type VARCHAR(30) NOT NULL,
        principal_amount NUMERIC(12,2) NOT NULL,
        interest_rate NUMERIC(5,2) NOT NULL,
        term_months INT NOT NULL,
        status VARCHAR(20) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."loan_payments" (
        id INT PRIMARY KEY,
        loan_id INT REFERENCES "${schema}"."loans"(id),
        payment_amount NUMERIC(10,2) NOT NULL,
        principal_portion NUMERIC(10,2) NOT NULL,
        interest_portion NUMERIC(10,2) NOT NULL,
        payment_date DATE NOT NULL,
        status VARCHAR(20) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."credit_lines" (
        id INT PRIMARY KEY,
        customer_id INT REFERENCES "${schema}"."customers"(id),
        total_limit NUMERIC(12,2) NOT NULL,
        used_amount NUMERIC(12,2) NOT NULL,
        interest_rate NUMERIC(5,2) NOT NULL,
        status VARCHAR(20) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."fraud_alerts" (
        id INT PRIMARY KEY,
        transaction_id INT REFERENCES "${schema}"."transactions"(id),
        severity VARCHAR(20) NOT NULL,
        rule_triggered VARCHAR(100) NOT NULL,
        status VARCHAR(30) NOT NULL,
        alert_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."investments" (
        id INT PRIMARY KEY,
        customer_id INT REFERENCES "${schema}"."customers"(id),
        portfolio_type VARCHAR(40) NOT NULL,
        total_invested NUMERIC(12,2) NOT NULL,
        current_value NUMERIC(12,2) NOT NULL,
        risk_profile VARCHAR(20) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."teller_sessions" (
        id INT PRIMARY KEY,
        branch_id INT REFERENCES "${schema}"."branches"(id),
        teller_name VARCHAR(80) NOT NULL,
        opening_cash NUMERIC(10,2) NOT NULL,
        closing_cash NUMERIC(10,2) NOT NULL,
        session_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."audit_logs" (
        id INT PRIMARY KEY,
        entity_type VARCHAR(40) NOT NULL,
        action VARCHAR(40) NOT NULL,
        performed_by VARCHAR(80) NOT NULL,
        timestamp TIMESTAMP NOT NULL
      );`
    );

    // Seed Branches (20 regional banking centers)
    const branchNames = [
      ["Wall Street Main Financial", "New York", "NY", "Victor Vance", 25000000.00],
      ["Back Bay Commercial", "Boston", "MA", "Sarah Jenkins", 12000000.00],
      ["Loop Financial Center", "Chicago", "IL", "Michael Scott", 18000000.00],
      ["Silicon Valley Private Bank", "San Francisco", "CA", "Elena Rostova", 35000000.00],
      ["Lone Star Branch", "Austin", "TX", "Arthur Pendleton", 10000000.00],
      ["Midtown Capital Hub", "New York", "NY", "David Sterling", 22000000.00],
      ["Brickell Financial Plaza", "Miami", "FL", "Sofia Vergara", 15000000.00],
      ["Pacific Heights Banking", "San Francisco", "CA", "Marcus Vance", 28000000.00],
      ["Buckhead Commercial Trust", "Atlanta", "GA", "Chloe Bennett", 14000000.00],
      ["Cherry Creek Wealth Center", "Denver", "CO", "Alexander Cross", 11000000.00],
      ["Center City Federal", "Philadelphia", "PA", "Rachel Adams", 16000000.00],
      ["Piedmont Regional", "Charlotte", "NC", "Lucas Gray", 13000000.00],
      ["Gateway Arch Banking", "St. Louis", "MO", "Emma Watson", 9500000.00],
      ["Puget Sound Financial", "Seattle", "WA", "Benjamin Cole", 19000000.00],
      ["Canyon Creek Commercial", "Phoenix", "AZ", "Olivia Taylor", 10500000.00],
      ["Old Town Treasury", "Alexandria", "VA", "William Harper", 12500000.00],
      ["Magnolia Commercial", "Dallas", "TX", "Jonathan Swift", 17500000.00],
      ["Music City Trust", "Nashville", "TN", "Hannah Abbott", 11500000.00],
      ["Bayou Financial Hub", "Houston", "TX", "Carlos Santana", 16500000.00],
      ["Beacon Hill Private Banking", "Boston", "MA", "Eleanor Roosevelt", 21000000.00],
    ];
    for (let b = 0; b < branchNames.length; b++) {
      const bn = branchNames[b];
      sql.push(`INSERT INTO "${schema}"."branches" VALUES (${b + 1}, '${bn[0]}', '${bn[1]}', '${bn[2]}', '${bn[3]}', ${bn[4]});`);
    }

    // Seed Customers (120 commercial and retail account holders)
    const names = [
      "Apex Trading LLC", "Quantum Capital Fund", "Helios Partners", "Horizon Logistics", "Beacon Retail Group",
      "Vanguard Media", "Altair Holdings", "BlueRock Global", "Pinnacle Dynamics", "Summit Wealth LLC",
      "Atlas Commodities", "Crestview Holdings", "Sterling Aerospace", "OmniGlobal Ventures", "VenturePoint Capital",
      "Endeavor Life Sciences", "Blackwood Real Estate", "Titan Industrial", "Aegis Maritime", "Solaris Renewable Energy"
    ];
    const riskRatings = ["Low", "Moderate", "High", "Speculative"];
    for (let c = 1; c <= 120; c++) {
      const branchCity = branchNames[(c % branchNames.length)][1];
      sql.push(`INSERT INTO "${schema}"."customers" VALUES (${c}, '${names[(c - 1) % names.length]} #${c}', ${rng.range(620, 830)}, '${branchCity}', ${rng.range(85000, 450000)}.00, '${rng.pick(riskRatings)}', '2023-0${rng.range(1, 9)}-01');`);
    }

    // Seed Account Types
    const accTypes = [
      [1, "checking", 1500.00, 0.25, 12.00],
      [2, "savings", 5000.00, 4.10, 0.00],
      [3, "money_market", 25000.00, 4.85, 25.00],
      [4, "investment", 50000.00, 7.50, 50.00],
      [5, "credit", 0.00, 18.99, 95.00],
    ];
    for (const at of accTypes) {
      sql.push(`INSERT INTO "${schema}"."account_types" VALUES (${at[0]}, '${at[1]}', ${at[2]}, ${at[3]}, ${at[4]});`);
    }

    // Seed Accounts (150 active and monitored accounts)
    const accStatuses = ["active", "active", "active", "frozen", "closed"];
    for (let a = 1; a <= 150; a++) {
      const typeStr = accTypes[(a % 5)][1];
      sql.push(`INSERT INTO "${schema}"."accounts" VALUES (${a}, ${rng.range(1, 120)}, ${rng.range(1, 20)}, '${typeStr}', ${rng.range(2500, 185000)}.50, '${rng.pick(accStatuses)}');`);
    }

    // Seed Transactions (250 ledger transaction entries)
    const txTypes = ["deposit", "withdrawal", "transfer", "fee", "wire"];
    for (let tx = 1; tx <= 250; tx++) {
      sql.push(`INSERT INTO "${schema}"."transactions" VALUES (${tx}, ${rng.range(1, 150)}, ${rng.range(50, 9500)}.00, '${rng.pick(txTypes)}', 'Settlement ref #${10000 + tx}', '2024-0${rng.range(1, 6)}-${rng.range(10, 28)} 14:30:00');`);
    }

    // Seed Merchants
    const merchants = [
      [1, "Whole Foods Market", "Grocery", "New York", "USA", "Standard"],
      [2, "Delta Air Lines", "Travel", "Atlanta", "USA", "Standard"],
      [3, "Apple Retail Store", "Electronics", "San Francisco", "USA", "Standard"],
      [4, "Four Seasons Hotel", "Dining", "Boston", "USA", "Standard"],
      [5, "CoinDesk Crypto ATM", "Crypto", "Miami", "USA", "High_Risk"],
    ];
    for (const m of merchants) {
      sql.push(`INSERT INTO "${schema}"."merchants" VALUES (${m[0]}, '${m[1]}', '${m[2]}', '${m[3]}', '${m[4]}', '${m[5]}');`);
    }

    // Seed Cards
    const cardTypes = ["Visa_Debit", "Mastercard_Credit", "Platinum_Amex"];
    for (let cr = 1; cr <= 60; cr++) {
      sql.push(`INSERT INTO "${schema}"."cards" VALUES (${cr}, ${rng.range(1, 80)}, '${rng.pick(cardTypes)}', '****-****-****-${1000 + cr}', ${rng.range(2500, 10000)}.00, 'active');`);
    }

    // Seed Card Swipes
    for (let cs = 1; cs <= 100; cs++) {
      sql.push(`INSERT INTO "${schema}"."card_swipes" VALUES (${cs}, ${rng.range(1, 60)}, ${rng.range(1, 5)}, ${rng.range(12, 1450)}.00, ${cs % 2 === 0}, ${rng.range(5, 88)}, '2024-0${rng.range(1, 5)}-${rng.range(10, 28)} 16:45:00');`);
    }

    // Seed Loans
    const loanTypes = ["Mortgage", "Auto", "Business", "Personal"];
    const loanStatuses = ["current", "current", "current", "late", "paid_off"];
    for (let l = 1; l <= 50; l++) {
      sql.push(`INSERT INTO "${schema}"."loans" VALUES (${l}, ${rng.range(1, 50)}, ${rng.range(1, 5)}, '${rng.pick(loanTypes)}', ${rng.range(25000, 650000)}.00, ${rng.range(4, 11)}.25, ${rng.range(24, 360)}, '${rng.pick(loanStatuses)}');`);
    }

    // Seed Loan Payments
    for (let lp = 1; lp <= 80; lp++) {
      const pmt = rng.range(800, 3500);
      const principal = Math.round(pmt * 0.7);
      const interest = Math.round(pmt * 0.3);
      sql.push(`INSERT INTO "${schema}"."loan_payments" VALUES (${lp}, ${rng.range(1, 50)}, ${pmt}.00, ${principal}.00, ${interest}.00, '2024-0${rng.range(1, 5)}-01', 'completed');`);
    }

    // Seed Credit Lines
    for (let cl = 1; cl <= 40; cl++) {
      const limit = rng.range(10000, 100000);
      const usedAmt = Math.round(limit * 0.4);
      sql.push(`INSERT INTO "${schema}"."credit_lines" VALUES (${cl}, ${rng.range(1, 50)}, ${limit}.00, ${usedAmt}.00, 14.50, 'active');`);
    }

    // Seed Fraud Alerts
    const severities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    for (let fa = 1; fa <= 30; fa++) {
      sql.push(`INSERT INTO "${schema}"."fraud_alerts" VALUES (${fa}, ${rng.range(1, 100)}, '${rng.pick(severities)}', 'Velocity anomaly detected', 'under_review', '2024-04-12');`);
    }

    // Seed Investments
    const portTypes = ["Aggressive_Growth", "Balanced", "Fixed_Income", "ESG"];
    for (let inv = 1; inv <= 40; inv++) {
      const cost = rng.range(50000, 500000);
      const currVal = Math.round(cost * 1.15);
      sql.push(`INSERT INTO "${schema}"."investments" VALUES (${inv}, ${rng.range(1, 50)}, '${rng.pick(portTypes)}', ${cost}.00, ${currVal}.00, 'Moderate');`);
    }

    // Seed Teller Sessions
    for (let ts = 1; ts <= 20; ts++) {
      sql.push(`INSERT INTO "${schema}"."teller_sessions" VALUES (${ts}, ${rng.range(1, 5)}, 'Teller Officer #${ts}', 25000.00, ${rng.range(24000, 32000)}.00, '2024-04-22');`);
    }

    // Seed Audit Logs
    for (let al = 1; al <= 40; al++) {
      sql.push(`INSERT INTO "${schema}"."audit_logs" VALUES (${al}, 'account', 'UPDATE_BALANCE', 'system_core', '2024-04-20 08:00:00');`);
    }

  } else if (normDomain === "hr") {
    const hrTables = [
      "employee_promotions", "candidates", "job_openings", "employee_trainings", "training_courses",
      "attendance_logs", "leave_requests", "performance_reviews", "employee_benefits", "benefits_packages",
      "salaries_history", "employees", "locations", "job_roles", "departments"
    ];
    for (const tbl of hrTables) {
      sql.push(`DROP TABLE IF EXISTS "${schema}"."${tbl}" CASCADE;`);
    }

    sql.push(
      `CREATE TABLE "${schema}"."departments" (
        id INT PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        head_name VARCHAR(80) NOT NULL,
        budget NUMERIC(12,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."job_roles" (
        id INT PRIMARY KEY,
        job_title VARCHAR(80) NOT NULL,
        department_id INT REFERENCES "${schema}"."departments"(id),
        grade_level VARCHAR(10) NOT NULL,
        min_salary NUMERIC(10,2) NOT NULL,
        max_salary NUMERIC(10,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."locations" (
        id INT PRIMARY KEY,
        office_name VARCHAR(80) NOT NULL,
        city VARCHAR(50) NOT NULL,
        country VARCHAR(50) NOT NULL,
        capacity INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."employees" (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        department_id INT REFERENCES "${schema}"."departments"(id),
        role_id INT REFERENCES "${schema}"."job_roles"(id),
        salary NUMERIC(10,2) NOT NULL,
        hire_date DATE NOT NULL,
        status VARCHAR(20) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."salaries_history" (
        id INT PRIMARY KEY,
        employee_id INT REFERENCES "${schema}"."employees"(id),
        effective_date DATE NOT NULL,
        previous_salary NUMERIC(10,2) NOT NULL,
        new_salary NUMERIC(10,2) NOT NULL,
        change_reason VARCHAR(80) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."benefits_packages" (
        id INT PRIMARY KEY,
        package_name VARCHAR(80) NOT NULL,
        health_plan VARCHAR(50) NOT NULL,
        retirement_match_pct NUMERIC(4,2) NOT NULL,
        annual_cost NUMERIC(8,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."employee_benefits" (
        id INT PRIMARY KEY,
        employee_id INT REFERENCES "${schema}"."employees"(id),
        package_id INT REFERENCES "${schema}"."benefits_packages"(id),
        enrolled_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."performance_reviews" (
        id INT PRIMARY KEY,
        employee_id INT REFERENCES "${schema}"."employees"(id),
        review_year INT NOT NULL,
        rating INT NOT NULL,
        bonus_pct NUMERIC(5,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."leave_requests" (
        id INT PRIMARY KEY,
        employee_id INT REFERENCES "${schema}"."employees"(id),
        leave_type VARCHAR(30) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        total_days INT NOT NULL,
        status VARCHAR(20) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."attendance_logs" (
        id INT PRIMARY KEY,
        employee_id INT REFERENCES "${schema}"."employees"(id),
        work_date DATE NOT NULL,
        work_mode VARCHAR(20) NOT NULL,
        hours_worked NUMERIC(4,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."training_courses" (
        id INT PRIMARY KEY,
        course_title VARCHAR(120) NOT NULL,
        category VARCHAR(50) NOT NULL,
        duration_hours INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."employee_trainings" (
        id INT PRIMARY KEY,
        employee_id INT REFERENCES "${schema}"."employees"(id),
        course_id INT REFERENCES "${schema}"."training_courses"(id),
        status VARCHAR(20) NOT NULL,
        score INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."job_openings" (
        id INT PRIMARY KEY,
        department_id INT REFERENCES "${schema}"."departments"(id),
        role_id INT REFERENCES "${schema}"."job_roles"(id),
        status VARCHAR(20) NOT NULL,
        posting_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."candidates" (
        id INT PRIMARY KEY,
        opening_id INT REFERENCES "${schema}"."job_openings"(id),
        name VARCHAR(100) NOT NULL,
        stage VARCHAR(30) NOT NULL,
        interview_score INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."employee_promotions" (
        id INT PRIMARY KEY,
        employee_id INT REFERENCES "${schema}"."employees"(id),
        old_role_id INT REFERENCES "${schema}"."job_roles"(id),
        new_role_id INT REFERENCES "${schema}"."job_roles"(id),
        promotion_date DATE NOT NULL
      );`
    );

    // Seed Departments
    const depts = [
      [1, "Engineering", "David Kim", 4500000.00],
      [2, "Product & Design", "Alicia Gomez", 1800000.00],
      [3, "Sales & Partnerships", "Marcus Vance", 2800000.00],
      [4, "People Operations", "Maya Thorne", 1200000.00],
      [5, "Customer Success", "Chloe Bennett", 1400000.00],
    ];
    for (const d of depts) {
      sql.push(`INSERT INTO "${schema}"."departments" VALUES (${d[0]}, '${d[1]}', '${d[2]}', ${d[3]});`);
    }

    // Seed Job Roles
    const roles = [
      [1, "Software Engineer I", 1, "L3", 90000.00, 130000.00],
      [2, "Senior Software Engineer", 1, "L5", 150000.00, 210000.00],
      [3, "Product Manager", 2, "L4", 120000.00, 175000.00],
      [4, "Account Executive", 3, "L4", 85000.00, 140000.00],
      [5, "People Operations Specialist", 4, "L3", 75000.00, 105000.00],
      [6, "Customer Support Lead", 5, "L4", 80000.00, 115000.00],
    ];
    for (const r of roles) {
      sql.push(`INSERT INTO "${schema}"."job_roles" VALUES (${r[0]}, '${r[1]}', ${r[2]}, '${r[3]}', ${r[4]}, ${r[5]});`);
    }

    // Seed Locations
    const locs = [
      [1, "New York HQ", "New York", "USA", 500],
      [2, "London Tech Center", "London", "UK", 300],
      [3, "San Francisco Design Hub", "San Francisco", "USA", 200],
      [4, "Remote Global", "Remote", "Worldwide", 1000],
    ];
    for (const l of locs) {
      sql.push(`INSERT INTO "${schema}"."locations" VALUES (${l[0]}, '${l[1]}', '${l[2]}', '${l[3]}', ${l[4]});`);
    }

    // Seed Employees (120 global enterprise staff members)
    const empNames = [
      "Alex Smith", "Jordan Lee", "Taylor Swift", "Chris Martin", "Sam Wilson",
      "Robin Brooks", "Casey Morgan", "Morgan Riley", "Jamie Vance", "Quinn Parker",
      "Liam Vance", "Emma Watson", "Ethan Hunt", "Lucas Scott", "Isabella Ross",
      "Nathan Drake", "Sophia Turner", "Oliver Queen", "Amelia Earhart", "Benjamin Franklin"
    ];
    const statuses = ["active", "active", "active", "active", "on_leave", "terminated"];
    for (let e = 1; e <= 120; e++) {
      const deptId = (e % 5) + 1;
      const roleId = (e % 6) + 1;
      sql.push(`INSERT INTO "${schema}"."employees" VALUES (${e}, '${empNames[(e - 1) % empNames.length]} #${e}', ${deptId}, ${roleId}, ${rng.range(75000, 185000)}.00, '2022-0${rng.range(1, 9)}-15', '${rng.pick(statuses)}');`);
    }

    // Seed Salaries History (100 compensation change events)
    for (let sh = 1; sh <= 100; sh++) {
      const oldSal = rng.range(70000, 140000);
      const newSal = Math.round(oldSal * 1.08);
      sql.push(`INSERT INTO "${schema}"."salaries_history" VALUES (${sh}, ${rng.range(1, 120)}, '2023-12-15', ${oldSal}.00, ${newSal}.00, 'Annual_Review');`);
    }

    // Seed Benefits
    const packages = [
      [1, "Gold Comprehensive PPO", "BlueCross", 5.00, 8500.00],
      [2, "Silver High Deductible HDHP", "Aetna", 4.00, 5200.00],
      [3, "Executive Platinum Wellness", "Cigna", 8.00, 14000.00],
    ];
    for (const p of packages) {
      sql.push(`INSERT INTO "${schema}"."benefits_packages" VALUES (${p[0]}, '${p[1]}', '${p[2]}', ${p[3]}, ${p[4]});`);
    }

    for (let eb = 1; eb <= 120; eb++) {
      sql.push(`INSERT INTO "${schema}"."employee_benefits" VALUES (${eb}, ${eb}, ${rng.range(1, 3)}, '2023-01-01');`);
    }

    // Seed Performance Reviews (100 annual evaluations)
    for (let pr = 1; pr <= 100; pr++) {
      sql.push(`INSERT INTO "${schema}"."performance_reviews" VALUES (${pr}, ${pr}, 2023, ${rng.range(2, 5)}, ${rng.range(5, 20)}.00);`);
    }

    // Seed Leave Requests (100 paid time off logs)
    const leaveTypes = ["PTO", "Sick", "Parental", "Bereavement"];
    for (let lr = 1; lr <= 100; lr++) {
      sql.push(`INSERT INTO "${schema}"."leave_requests" VALUES (${lr}, ${rng.range(1, 120)}, '${rng.pick(leaveTypes)}', '2024-03-10', '2024-03-15', ${rng.range(1, 8)}, '${rng.pick(["approved", "pending"])}');`);
    }

    // Seed Attendance (150 office and remote checkins)
    for (let att = 1; att <= 150; att++) {
      sql.push(`INSERT INTO "${schema}"."attendance_logs" VALUES (${att}, ${rng.range(1, 120)}, '2024-04-18', '${rng.pick(["In_Office", "Remote"])}', 8.00);`);
    }

    // Seed Training Courses
    const courses = [
      [1, "Annual SOC2 Security Compliance", "Compliance", 4],
      [2, "Inclusive Leadership at Scale", "Leadership", 12],
      [3, "Advanced PostgreSQL Performance", "Technical", 16],
    ];
    for (const c of courses) {
      sql.push(`INSERT INTO "${schema}"."training_courses" VALUES (${c[0]}, '${c[1]}', '${c[2]}', ${c[3]});`);
    }

    for (let et = 1; et <= 60; et++) {
      sql.push(`INSERT INTO "${schema}"."employee_trainings" VALUES (${et}, ${rng.range(1, 60)}, ${rng.range(1, 3)}, 'completed', ${rng.range(75, 100)});`);
    }

    // Seed Job Openings
    for (let jo = 1; jo <= 10; jo++) {
      sql.push(`INSERT INTO "${schema}"."job_openings" VALUES (${jo}, ${rng.range(1, 5)}, ${rng.range(1, 6)}, 'open', '2024-03-01');`);
    }

    // Seed Candidates
    for (let can = 1; can <= 30; can++) {
      sql.push(`INSERT INTO "${schema}"."candidates" VALUES (${can}, ${rng.range(1, 10)}, 'Candidate applicant #${can}', 'Technical', ${rng.range(3, 5)});`);
    }

    // Seed Promotions
    for (let prm = 1; prm <= 20; prm++) {
      sql.push(`INSERT INTO "${schema}"."employee_promotions" VALUES (${prm}, ${rng.range(1, 60)}, 1, 2, '2024-01-15');`);
    }

  } else if (normDomain === "logistics") {
    const logTables = [
      "incidents", "freight_invoices", "customs_declarations", "maintenance_records", "fuel_logs",
      "delivery_checkpoints", "freight_routes", "cargo_packages", "shipments", "parts_inventory",
      "suppliers", "drivers", "fleet_vehicles", "carriers", "warehouses"
    ];
    for (const tbl of logTables) {
      sql.push(`DROP TABLE IF EXISTS "${schema}"."${tbl}" CASCADE;`);
    }

    sql.push(
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
      `CREATE TABLE "${schema}"."fleet_vehicles" (
        id INT PRIMARY KEY,
        vehicle_number VARCHAR(30) NOT NULL,
        vehicle_type VARCHAR(40) NOT NULL,
        max_weight_capacity_kg NUMERIC(10,2) NOT NULL,
        mileage_km INT NOT NULL,
        status VARCHAR(20) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."drivers" (
        id INT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        license_number VARCHAR(30) NOT NULL,
        experience_years INT NOT NULL,
        safety_score NUMERIC(3,1) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."suppliers" (
        id INT PRIMARY KEY,
        supplier_name VARCHAR(100) NOT NULL,
        country VARCHAR(50) NOT NULL,
        lead_time_days INT NOT NULL,
        reliability_score NUMERIC(3,1) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."parts_inventory" (
        id INT PRIMARY KEY,
        part_number VARCHAR(50) NOT NULL,
        warehouse_id INT REFERENCES "${schema}"."warehouses"(id),
        quantity_in_stock INT NOT NULL,
        unit_cost NUMERIC(8,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."shipments" (
        id INT PRIMARY KEY,
        warehouse_id INT REFERENCES "${schema}"."warehouses"(id),
        carrier_id INT REFERENCES "${schema}"."carriers"(id),
        origin_warehouse VARCHAR(80) NOT NULL,
        destination_city VARCHAR(80) NOT NULL,
        weight_kg NUMERIC(8,2) NOT NULL,
        status VARCHAR(30) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."cargo_packages" (
        id INT PRIMARY KEY,
        shipment_id INT REFERENCES "${schema}"."shipments"(id),
        weight_kg NUMERIC(8,2) NOT NULL,
        declared_value NUMERIC(10,2) NOT NULL,
        is_hazardous BOOLEAN NOT NULL
      );`,
      `CREATE TABLE "${schema}"."freight_routes" (
        id INT PRIMARY KEY,
        route_name VARCHAR(100) NOT NULL,
        distance_km INT NOT NULL,
        avg_transit_hours INT NOT NULL,
        toll_costs NUMERIC(8,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."delivery_checkpoints" (
        id INT PRIMARY KEY,
        shipment_id INT REFERENCES "${schema}"."shipments"(id),
        location_name VARCHAR(80) NOT NULL,
        scanned_at TIMESTAMP NOT NULL,
        status VARCHAR(30) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."fuel_logs" (
        id INT PRIMARY KEY,
        vehicle_id INT REFERENCES "${schema}"."fleet_vehicles"(id),
        gallons NUMERIC(8,2) NOT NULL,
        price_per_gallon NUMERIC(5,2) NOT NULL,
        log_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."maintenance_records" (
        id INT PRIMARY KEY,
        vehicle_id INT REFERENCES "${schema}"."fleet_vehicles"(id),
        service_type VARCHAR(50) NOT NULL,
        cost NUMERIC(10,2) NOT NULL,
        service_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."customs_declarations" (
        id INT PRIMARY KEY,
        shipment_id INT REFERENCES "${schema}"."shipments"(id),
        port_of_entry VARCHAR(50) NOT NULL,
        duty_amount NUMERIC(10,2) NOT NULL,
        status VARCHAR(30) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."freight_invoices" (
        id INT PRIMARY KEY,
        shipment_id INT REFERENCES "${schema}"."shipments"(id),
        total_billed NUMERIC(10,2) NOT NULL,
        payment_status VARCHAR(20) NOT NULL,
        due_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."incidents" (
        id INT PRIMARY KEY,
        shipment_id INT REFERENCES "${schema}"."shipments"(id),
        incident_type VARCHAR(40) NOT NULL,
        claim_cost NUMERIC(10,2) NOT NULL,
        reported_date DATE NOT NULL
      );`
    );

    // Seed Warehouses (20 hubs)
    const whs = [
      [1, "Chicago Midwest Freight Hub", 250000, "Frank Miller"],
      [2, "Dallas-Fort Worth Superhub", 320000, "Sandra Ruiz"],
      [3, "Newark Gateway Air/Sea Terminal", 280000, "Dave Miller"],
      [4, "Atlanta Southeast Crossdock", 220000, "Kevin Young"],
      [5, "Ontario West Coast Mega DC", 450000, "Claire Sullivan"],
      [6, "Memphis Aerotropolis DC", 380000, "Marcus Brody"],
      [7, "Louisville WorldPort Hub", 340000, "Sarah Jenkins"],
      [8, "Indianapolis Crossroads Center", 260000, "Bradley Cox"],
      [9, "Columbus Heartland Depot", 210000, "Alicia Simmons"],
      [10, "Phoenix Desert Distribution Hub", 190000, "Carlos Mendoza"],
      [11, "Seattle Pacific Gateway", 230000, "Elena Rostova"],
      [12, "Denver Rocky Mountain Terminal", 180000, "Trevor Vance"],
      [13, "Kansas City Inland Port", 240000, "Hannah Abbott"],
      [14, "Jacksonville Intermodal Center", 200000, "Derrick Washington"],
      [15, "Bethlehem Lehigh Valley DC", 310000, "Megan Gallagher"],
      [16, "Reno Tahoe Logistics Center", 195000, "Logan Pierce"],
      [17, "Charlotte Piedmont DC", 225000, "Chloe Bennett"],
      [18, "Nashville Music City Crossdock", 185000, "Owen Campbell"],
      [19, "Salt Lake Wasatch Hub", 175000, "Rachel Kim"],
      [20, "Houston Gulf Coast Terminal", 290000, "Javier Ortiz"],
    ];
    for (const w of whs) {
      sql.push(`INSERT INTO "${schema}"."warehouses" VALUES (${w[0]}, '${w[1]}', ${w[2]}, '${w[3]}');`);
    }

    // Seed Carriers (20 freight carriers)
    const crs = [
      [1, "Apex Express", "Next-Day Freight", 4.8],
      [2, "SwiftLine Logistics", "Standard Ground", 4.2],
      [3, "Titan Cargo Systems", "Heavy Haul & Flatbed", 4.5],
      [4, "Metro Couriers Direct", "Same-Day Urban", 4.9],
      [5, "Polar Reefer Transport", "Refrigerated Cold Chain", 4.7],
      [6, "Eagle Intermodal Rail", "Intermodal Rail", 4.4],
      [7, "TransGlobal Air Freight", "Expedited Air Cargo", 4.8],
      [8, "Continental Haulers", "Full Truckload (FTL)", 4.3],
      [9, "PacWest Logistics", "Less-Than-Truckload (LTL)", 4.6],
      [10, "Great Lakes Express", "Regional Ground", 4.5],
      [11, "Lone Star Freightways", "Heavy Haul", 4.1],
      [12, "Atlantic Coastal Freight", "Standard Ground", 4.4],
      [13, "Sunbelt Crossdockers", "Expedited Dedicated", 4.8],
      [14, "Cascade Mountain Freight", "Specialized Hazardous", 4.7],
      [15, "Piedmont Carriers", "Regional Ground", 4.3],
      [16, "Evergreen Intermodal", "Intermodal Container", 4.6],
      [17, "Frontier Transport Co", "Flatbed & Oversized", 4.2],
      [18, "Chesapeake Logistics", "Port Drayage", 4.5],
      [19, "Midwest Consolidated", "Less-Than-Truckload (LTL)", 4.0],
      [20, "National Vanguard Express", "Next-Day Guaranteed", 4.9],
    ];
    for (const c of crs) {
      sql.push(`INSERT INTO "${schema}"."carriers" VALUES (${c[0]}, '${c[1]}', '${c[2]}', ${c[3]});`);
    }

    // Seed Fleet Vehicles (50 vehicles)
    const vehTypes = ["Semi_Truck", "Box_Truck", "Reefer", "Cargo_Van", "Flatbed"];
    const vehStatuses = ["active", "active", "active", "in_maintenance", "idle"];
    for (let v = 1; v <= 50; v++) {
      sql.push(`INSERT INTO "${schema}"."fleet_vehicles" VALUES (${v}, 'TRK-${1000 + v}', '${rng.pick(vehTypes)}', ${rng.range(6000, 28000)}.00, ${rng.range(35000, 380000)}, '${rng.pick(vehStatuses)}');`);
    }

    // Seed Drivers (50 drivers)
    const driverFirstNames = ["John", "Hector", "Tyrone", "Mark", "Svetlana", "Derrick", "Carlos", "Mateo", "Brian", "Guillermo", "Andre", "Kevin", "Arthur", "Leon", "Marcus"];
    const driverLastNames = ["Miller", "Ramirez", "Jackson", "Peterson", "Novak", "Washington", "Flores", "Santos", "O''Connor", "Valdez", "Dubois", "Kowalski", "Henderson", "Chen", "Sterling"];
    for (let d = 1; d <= 50; d++) {
      const name = `${rng.pick(driverFirstNames)} ${rng.pick(driverLastNames)}`;
      sql.push(`INSERT INTO "${schema}"."drivers" VALUES (${d}, '${name}', 'CDL-${24000 + d}', ${rng.range(3, 25)}, ${rng.range(4, 5)}.${rng.range(0, 9)});`);
    }

    // Seed Suppliers (20 industrial suppliers)
    const suppliers = [
      [1, "Global Steel Forge", "USA", 7, 4.8],
      [2, "Pacific Rim Electronics", "Taiwan", 21, 4.5],
      [3, "EuroAuto Castings", "Germany", 14, 4.9],
      [4, "Apex Hydraulic Valves", "USA", 5, 4.7],
      [5, "Kyoto Precision Bearings", "Japan", 18, 4.9],
      [6, "Nordic Heavy Plastics", "Sweden", 12, 4.6],
      [7, "Bavaria Diesel Components", "Germany", 10, 4.8],
      [8, "Ontario Rubber & Belts", "Canada", 8, 4.4],
      [9, "Seoul Micro Sensor Tech", "South Korea", 16, 4.7],
      [10, "Taipei Power Inverters", "Taiwan", 19, 4.3],
      [11, "Midwest Fastener Corp", "USA", 4, 4.8],
      [12, "Shenzhen Battery Cell Co", "China", 25, 4.2],
      [13, "Milan Hydraulic Systems", "Italy", 15, 4.6],
      [14, "Guadalajara Wire Harnesses", "Mexico", 9, 4.5],
      [15, "Bristol Marine & Cargo Gear", "UK", 14, 4.7],
      [16, "Allegheny Alloy Works", "USA", 6, 4.9],
      [17, "Stuttgart Turbochargers", "Germany", 11, 4.8],
      [18, "Yokohama Pneumatics", "Japan", 17, 4.6],
      [19, "Sao Paulo Freight Pallets", "Brazil", 22, 4.1],
      [20, "Zurich Logistics Sensorics", "Switzerland", 13, 4.9],
    ];
    for (const s of suppliers) {
      sql.push(`INSERT INTO "${schema}"."suppliers" VALUES (${s[0]}, '${s[1]}', '${s[2]}', ${s[3]}, ${s[4]});`);
    }

    // Seed Parts Inventory (80 parts)
    for (let pi = 1; pi <= 80; pi++) {
      sql.push(`INSERT INTO "${schema}"."parts_inventory" VALUES (${pi}, 'PART-${1000 + pi}', ${rng.range(1, 20)}, ${rng.range(50, 1800)}, ${rng.range(15, 450)}.00);`);
    }

    // Seed Shipments (150 shipments)
    const dests = ["Denver", "Phoenix", "Seattle", "Miami", "Boston", "Houston", "Philadelphia", "San Diego", "Minneapolis", "Detroit", "Portland", "Austin", "Charlotte", "Baltimore", "Tampa"];
    const shipStatuses = ["in_transit", "delivered", "delivered", "delivered", "delayed", "pending"];
    for (let s = 1; s <= 150; s++) {
      const wh = whs[(s - 1) % whs.length];
      const weight = rng.range(250, 14500) + (rng.range(10, 90) / 100);
      sql.push(`INSERT INTO "${schema}"."shipments" VALUES (${s}, ${wh[0]}, ${rng.range(1, 20)}, '${wh[1]}', '${rng.pick(dests)}', ${weight.toFixed(2)}, '${rng.pick(shipStatuses)}');`);
    }

    // Seed Cargo Packages (200 packages)
    for (let cp = 1; cp <= 200; cp++) {
      const pkgWeight = rng.range(10, 650) + (rng.range(10, 90) / 100);
      const pkgValue = rng.range(350, 45000) + (rng.range(0, 99) / 100);
      sql.push(`INSERT INTO "${schema}"."cargo_packages" VALUES (${cp}, ${rng.range(1, 150)}, ${pkgWeight.toFixed(2)}, ${pkgValue.toFixed(2)}, ${cp % 8 === 0});`);
    }

    // Seed Freight Routes (20 transit corridors)
    const routes = [
      [1, "I-80 Midwest Expressway (Chicago to Omaha)", 780, 12, 140.00],
      [2, "I-95 Eastern Seaboard Corridor (Newark to Richmond)", 520, 9, 210.00],
      [3, "I-10 Southern Transcon (Houston to Phoenix)", 1180, 18, 85.00],
      [4, "I-5 West Coast Spine (Seattle to Sacramento)", 750, 13, 160.00],
      [5, "I-70 Heartland Transcontinental (Columbus to Denver)", 1260, 20, 115.00],
      [6, "I-40 Mid-South Link (Nashville to Amarillo)", 980, 15, 95.00],
      [7, "I-35 NAFTA Freight Artery (Dallas to Kansas City)", 510, 8, 70.00],
      [8, "I-15 Western Mountain Pass (Salt Lake to Las Vegas)", 420, 7, 60.00],
      [9, "I-75 Great Lakes to Gulf (Detroit to Atlanta)", 720, 11, 130.00],
      [10, "I-90 Northern Tier Supercorridor (Chicago to Buffalo)", 530, 8, 175.00],
      [11, "I-20 Southern Industrial Arc (Atlanta to Dallas)", 780, 12, 90.00],
      [12, "I-81 Appalachian Freight Trunk (Harrisburg to Knoxville)", 490, 8, 110.00],
      [13, "I-65 Auto Valley Corridor (Indianapolis to Birmingham)", 480, 8, 85.00],
      [14, "I-44 Ozark Expressway (St. Louis to Oklahoma City)", 500, 8, 65.00],
      [15, "I-84 Northwest Mountain Gateway (Salt Lake to Portland)", 760, 13, 105.00],
      [16, "I-16 Georgia Port Rail Connection (Savannah to Macon)", 170, 3, 40.00],
      [17, "I-55 Mississippi Valley Line (Chicago to Memphis)", 530, 9, 95.00],
      [18, "I-94 Upper Midwest Corridor (Detroit to Minneapolis)", 690, 11, 120.00],
      [19, "I-26 Carolina Cargo Corridor (Charleston to Asheville)", 210, 4, 50.00],
      [20, "I-77 Mid-Atlantic Industrial Run (Cleveland to Charlotte)", 430, 7, 80.00],
    ];
    for (const r of routes) {
      sql.push(`INSERT INTO "${schema}"."freight_routes" VALUES (${r[0]}, '${r[1]}', ${r[2]}, ${r[3]}, ${r[4]});`);
    }

    // Seed Delivery Checkpoints (150 checkpoints)
    const checkNames = ["Weigh Station", "Terminal Crossdock", "Border Gate", "Security Inspection", "Cold Chain Sensor Bay", "Toll Interchange"];
    for (let dc = 1; dc <= 150; dc++) {
      const location = `${rng.pick(checkNames)} #${(dc % 25) + 1}`;
      sql.push(`INSERT INTO "${schema}"."delivery_checkpoints" VALUES (${dc}, ${rng.range(1, 150)}, '${location}', '2024-04-${String(rng.range(1, 28)).padStart(2, "0")} 10:${String(rng.range(10, 59)).padStart(2, "0")}:00', 'passed');`);
    }

    // Seed Fuel Logs (120 logs)
    for (let fl = 1; fl <= 120; fl++) {
      const gallons = rng.range(75, 260) + (rng.range(10, 90) / 100);
      const pricePerGal = 3.65 + (rng.range(0, 80) / 100);
      sql.push(`INSERT INTO "${schema}"."fuel_logs" VALUES (${fl}, ${rng.range(1, 50)}, ${gallons.toFixed(2)}, ${pricePerGal.toFixed(2)}, '2024-04-${String(rng.range(1, 28)).padStart(2, "0")}');`);
    }

    // Seed Maintenance Records (80 records)
    const serviceTypes = ["Brake_Overhaul", "Engine_Oil_Service", "Transmission_Flush", "Tire_Replacement_10x", "Reefer_Cooling_Calibration", "Suspension_Alignment"];
    for (let mr = 1; mr <= 80; mr++) {
      sql.push(`INSERT INTO "${schema}"."maintenance_records" VALUES (${mr}, ${rng.range(1, 50)}, '${rng.pick(serviceTypes)}', ${rng.range(380, 3600)}.00, '2024-03-${String(rng.range(1, 28)).padStart(2, "0")}');`);
    }

    // Seed Customs Declarations (60 declarations)
    const ports = ["Port of Newark", "Port of Long Beach", "Port of Houston", "Port of Savannah", "Detroit Ambassador Bridge", "Laredo World Trade Bridge"];
    for (let cd = 1; cd <= 60; cd++) {
      sql.push(`INSERT INTO "${schema}"."customs_declarations" VALUES (${cd}, ${rng.range(1, 150)}, '${rng.pick(ports)}', ${rng.range(650, 9500)}.00, 'cleared');`);
    }

    // Seed Freight Invoices (150 invoices)
    const invStatuses = ["paid", "paid", "paid", "pending", "overdue"];
    for (let fi = 1; fi <= 150; fi++) {
      sql.push(`INSERT INTO "${schema}"."freight_invoices" VALUES (${fi}, ${fi}, ${rng.range(950, 8200)}.00, '${rng.pick(invStatuses)}', '2024-05-${String(rng.range(1, 28)).padStart(2, "0")}');`);
    }

    // Seed Incidents (40 incidents)
    const incTypes = ["Cargo_Damage", "Reefer_Temp_Deviation", "Minor_Collision", "Roadside_Flat_Tire", "Detention_Delay", "Weather_Halt"];
    for (let inc = 1; inc <= 40; inc++) {
      sql.push(`INSERT INTO "${schema}"."incidents" VALUES (${inc}, ${rng.range(1, 150)}, '${rng.pick(incTypes)}', ${rng.range(400, 6500)}.00, '2024-04-${String(rng.range(1, 25)).padStart(2, "0")}');`);
    }

  } else if (normDomain === "restaurants") {
    const restTables = [
      "waste_logs", "guest_reviews", "shifts", "staff_members", "order_items",
      "orders", "reservations", "ingredient_purchases", "suppliers", "ingredients",
      "menu_items", "menu_categories", "dining_tables", "dining_sections", "restaurants"
    ];
    for (const tbl of restTables) {
      sql.push(`DROP TABLE IF EXISTS "${schema}"."${tbl}" CASCADE;`);
    }

    sql.push(
      `CREATE TABLE "${schema}"."restaurants" (
        id INT PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        city VARCHAR(50) NOT NULL,
        seating_capacity INT NOT NULL,
        opened_year INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."dining_sections" (
        id INT PRIMARY KEY,
        restaurant_id INT REFERENCES "${schema}"."restaurants"(id),
        section_name VARCHAR(50) NOT NULL,
        is_outdoor BOOLEAN NOT NULL
      );`,
      `CREATE TABLE "${schema}"."dining_tables" (
        id INT PRIMARY KEY,
        restaurant_id INT REFERENCES "${schema}"."restaurants"(id),
        section_id INT REFERENCES "${schema}"."dining_sections"(id),
        table_number INT NOT NULL,
        max_seats INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."menu_categories" (
        id INT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        is_alcoholic BOOLEAN NOT NULL
      );`,
      `CREATE TABLE "${schema}"."menu_items" (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        price NUMERIC(8,2) NOT NULL,
        cost NUMERIC(8,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."ingredients" (
        id INT PRIMARY KEY,
        ingredient_name VARCHAR(80) NOT NULL,
        category VARCHAR(50) NOT NULL,
        unit_cost NUMERIC(6,2) NOT NULL,
        current_stock_qty NUMERIC(8,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."suppliers" (
        id INT PRIMARY KEY,
        supplier_name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        rating NUMERIC(3,1) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."ingredient_purchases" (
        id INT PRIMARY KEY,
        supplier_id INT REFERENCES "${schema}"."suppliers"(id),
        restaurant_id INT REFERENCES "${schema}"."restaurants"(id),
        total_amount NUMERIC(10,2) NOT NULL,
        purchase_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."reservations" (
        id INT PRIMARY KEY,
        restaurant_id INT REFERENCES "${schema}"."restaurants"(id),
        guest_name VARCHAR(80) NOT NULL,
        party_size INT NOT NULL,
        reservation_time TIMESTAMP NOT NULL,
        status VARCHAR(20) NOT NULL
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
      );`,
      `CREATE TABLE "${schema}"."staff_members" (
        id INT PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        restaurant_id INT REFERENCES "${schema}"."restaurants"(id),
        role VARCHAR(40) NOT NULL,
        hourly_rate NUMERIC(6,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."shifts" (
        id INT PRIMARY KEY,
        staff_id INT REFERENCES "${schema}"."staff_members"(id),
        shift_type VARCHAR(20) NOT NULL,
        hours_worked NUMERIC(4,2) NOT NULL,
        shift_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."guest_reviews" (
        id INT PRIMARY KEY,
        restaurant_id INT REFERENCES "${schema}"."restaurants"(id),
        rating INT NOT NULL,
        comments VARCHAR(200) NOT NULL,
        review_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."waste_logs" (
        id INT PRIMARY KEY,
        ingredient_id INT REFERENCES "${schema}"."ingredients"(id),
        quantity_wasted NUMERIC(6,2) NOT NULL,
        reason VARCHAR(50) NOT NULL,
        log_date DATE NOT NULL
      );`
    );

    // Seed Restaurants (Expanded to 30 metropolitan venues)
    const citiesList = [
      "New York", "Miami", "Chicago", "San Francisco", "Boston", "Austin", "Los Angeles", 
      "Seattle", "Denver", "Atlanta", "Philadelphia", "Dallas", "Houston", "San Diego", 
      "Washington DC", "Nashville", "Las Vegas", "Portland", "New Orleans", "Scottsdale"
    ];
    const restTypes = ["Trattoria", "Osteria", "Bistro", "Steakhouse", "Grill", "Rooftop Lounge", "Pizzeria", "Brasserie"];
    for (let r = 1; r <= 30; r++) {
      const city = citiesList[(r - 1) % citiesList.length];
      const type = restTypes[(r - 1) % restTypes.length];
      const name = r === 1 ? "Gusto Flagship Trattoria" : `Gusto ${city} ${type}`;
      sql.push(`INSERT INTO "${schema}"."restaurants" VALUES (${r}, '${name}', '${city}', ${rng.range(80, 240)}, ${2015 + (r % 9)});`);
    }

    // Seed Sections
    const sections = [
      [1, 1, "Main Dining Room", false],
      [2, 1, "Garden Patio", true],
      [3, 2, "Waterfront Deck", true],
      [4, 3, "Skylight Lounge", false],
    ];
    for (const s of sections) {
      sql.push(`INSERT INTO "${schema}"."dining_sections" VALUES (${s[0]}, ${s[1]}, '${s[2]}', ${s[3]});`);
    }

    // Seed Tables (120 dining tables across venues)
    for (let t = 1; t <= 120; t++) {
      const restId = (t % 30) + 1;
      const secId = (t % 4) + 1;
      sql.push(`INSERT INTO "${schema}"."dining_tables" VALUES (${t}, ${restId}, ${secId}, ${(t % 25) + 1}, ${rng.pick([2, 4, 6, 8, 10])});`);
    }

    // Seed Menu Categories
    const categories = [
      [1, "Appetizer", false],
      [2, "Entree", false],
      [3, "Pasta", false],
      [4, "Dessert", false],
      [5, "Fine Wine", true],
    ];
    for (const c of categories) {
      sql.push(`INSERT INTO "${schema}"."menu_categories" VALUES (${c[0]}, '${c[1]}', ${c[2]});`);
    }

    // Seed Menu Items (30 curated culinary dishes & wines)
    const dishes = [
      [1, "Truffle Tagliatelle", "pasta", 28.00, 7.50],
      [2, "Wood-Fired Margherita", "entree", 19.50, 4.20],
      [3, "Crispy Calamari", "appetizer", 16.00, 3.80],
      [4, "Caesar Alla Griglia", "appetizer", 14.00, 2.90],
      [5, "Tiramisu Tradizionale", "dessert", 11.00, 2.10],
      [6, "Artisan Chianti Classico", "beverage", 15.00, 3.50],
      [7, "Sparkling San Pellegrino", "beverage", 6.00, 0.90],
      [8, "Prime Ribeye 12oz", "entree", 46.00, 16.00],
      [9, "Lobster Ravioli", "pasta", 32.00, 9.80],
      [10, "Burrata Pugliese", "appetizer", 17.50, 4.50],
      [11, "Pan-Seared Sea Bass", "entree", 38.00, 12.00],
      [12, "Wild Mushroom Risotto", "pasta", 26.00, 6.20],
      [13, "Cannoli Siciliani", "dessert", 9.50, 1.80],
      [14, "Barolo Riserva 2018", "beverage", 24.00, 7.00],
      [15, "Prosecco Superiore", "beverage", 14.00, 3.20],
      [16, "Osso Buco Milanese", "entree", 42.00, 14.50],
      [17, "Polenta Con Funghi", "appetizer", 15.00, 3.10],
      [18, "Affogato Al Caffe", "dessert", 8.50, 1.50],
      [19, "Fettuccine Al Ragu", "pasta", 24.00, 5.80],
      [20, "Gnocchi Gorgonzola", "pasta", 22.00, 5.00],
      [21, "Grilled Octopus", "appetizer", 19.00, 5.50],
      [22, "Veal Saltimbocca", "entree", 36.00, 11.20],
      [23, "Panna Cotta Al Frutti", "dessert", 10.00, 1.90],
      [24, "Pinot Grigio Friuli", "beverage", 13.00, 2.80],
      [25, "Aperol Spritz", "beverage", 14.50, 2.50],
      [26, "Negroni Classico", "beverage", 16.00, 3.00],
      [27, "Bistecca Fiorentina", "entree", 55.00, 21.00],
      [28, "Carpaccio Di Manzo", "appetizer", 18.00, 4.80],
      [29, "Torta Al Cioccolato", "dessert", 12.00, 2.40],
      [30, "Espresso Romano", "beverage", 5.00, 0.60],
    ];
    for (const d of dishes) {
      sql.push(`INSERT INTO "${schema}"."menu_items" VALUES (${d[0]}, '${d[1]}', '${d[2]}', ${d[3]}, ${d[4]});`);
    }

    // Seed Ingredients (30 raw ingredients)
    const ings = [
      [1, "Black Truffle Butter", "Dairy", 12.50, 85.00],
      [2, "San Marzano Tomatoes", "Produce", 2.20, 450.00],
      [3, "Prime Beef Ribeye", "Meat", 18.00, 220.00],
      [4, "Parmigiano-Reggiano", "Dairy", 9.50, 140.00],
      [5, "Wild Alaskan Halibut", "Seafood", 16.50, 95.00],
      [6, "Fresh Mozzarella Di Bufala", "Dairy", 7.80, 180.00],
      [7, "Carnaroli Risotto Rice", "Dry Goods", 3.40, 300.00],
      [8, "Porcini Mushrooms", "Produce", 14.00, 65.00],
      [9, "Prosciutto Di Parma", "Meat", 15.50, 110.00],
      [10, "Extra Virgin Olive Oil", "Dry Goods", 11.00, 250.00],
    ];
    for (const i of ings) {
      sql.push(`INSERT INTO "${schema}"."ingredients" VALUES (${i[0]}, '${i[1]}', '${i[2]}', ${i[3]}, ${i[4]});`);
    }

    // Seed Suppliers
    const suppliers = [
      [1, "Verona Italian Importers", "Dry Goods", 4.9],
      [2, "Hudson Valley Organic Meats", "Meat", 4.8],
      [3, "Nantucket Seafood Wholesalers", "Seafood", 4.7],
      [4, "Artisan Dairy Guild", "Dairy", 4.9],
    ];
    for (const s of suppliers) {
      sql.push(`INSERT INTO "${schema}"."suppliers" VALUES (${s[0]}, '${s[1]}', '${s[2]}', ${s[3]});`);
    }

    // Seed Purchases
    for (let p = 1; p <= 50; p++) {
      sql.push(`INSERT INTO "${schema}"."ingredient_purchases" VALUES (${p}, ${rng.range(1, 4)}, ${rng.range(1, 30)}, ${rng.range(450, 3200)}.00, '2024-04-10');`);
    }

    // Seed Reservations (100 guest bookings)
    const guestNames = [
      "Victoria Sterling", "Marcus Dupont", "Sophia Loren", "David Harrison", "Eleanor Vance",
      "Robert Chen", "Isabella Rossi", "Jonathan Miller", "Chloe Bennett", "Arthur Pendelton"
    ];
    for (let res = 1; res <= 100; res++) {
      sql.push(`INSERT INTO "${schema}"."reservations" VALUES (${res}, ${rng.range(1, 30)}, '${rng.pick(guestNames)} #${res}', ${rng.range(2, 8)}, '2024-04-${rng.range(15, 30)} 19:${rng.range(10, 50)}:00', '${rng.pick(["confirmed", "seated", "completed"])}');`);
    }

    // Seed Orders (150 dining checks)
    const servers = ["Marco V.", "Elena S.", "Matteo R.", "Gianna P.", "Luca B.", "Sofia D.", "Alessandro M.", "Chiara T."];
    for (let o = 1; o <= 150; o++) {
      sql.push(`INSERT INTO "${schema}"."orders" VALUES (${o}, ${rng.range(1, 120)}, '2024-04-${rng.range(10, 28)} 19:${rng.range(10, 55)}:00', ${rng.range(35, 290)}.00, '${rng.pick(servers)}');`);
    }

    // Seed Order Items (300 items)
    for (let oi = 1; oi <= 300; oi++) {
      sql.push(`INSERT INTO "${schema}"."order_items" VALUES (${oi}, ${rng.range(1, 150)}, ${rng.range(1, 30)}, ${rng.range(1, 4)});`);
    }

    // Seed Staff Members (60 staff members)
    const staffRoles = ["Executive_Chef", "Sous_Chef", "Line_Cook", "Server", "Bartender", "Host", "Sommelier"];
    for (let sm = 1; sm <= 60; sm++) {
      sql.push(`INSERT INTO "${schema}"."staff_members" VALUES (${sm}, '${servers[sm % servers.length]} ${sm}', ${(sm % 30) + 1}, '${rng.pick(staffRoles)}', ${rng.range(18, 35)}.50);`);
    }

    // Seed Shifts (80 shifts)
    for (let sh = 1; sh <= 80; sh++) {
      sql.push(`INSERT INTO "${schema}"."shifts" VALUES (${sh}, ${rng.range(1, 60)}, '${rng.pick(["Lunch", "Dinner", "Prep"])}', ${rng.range(5, 8)}.50, '2024-04-${rng.range(10, 25)}');`);
    }

    // Seed Reviews (100 guest reviews)
    for (let gr = 1; gr <= 100; gr++) {
      sql.push(`INSERT INTO "${schema}"."guest_reviews" VALUES (${gr}, ${rng.range(1, 30)}, ${rng.range(3, 5)}, 'Exceptional dining atmosphere and culinary execution!', '2024-04-${rng.range(10, 25)}');`);
    }

    // Seed Waste Logs (40 waste logs)
    const wasteReasons = ["Spoilage", "Over_Prep", "Burnt", "Drop"];
    for (let wl = 1; wl <= 40; wl++) {
      sql.push(`INSERT INTO "${schema}"."waste_logs" VALUES (${wl}, ${rng.range(1, 10)}, ${rng.range(1, 8)}.50, '${rng.pick(wasteReasons)}', '2024-04-${rng.range(10, 25)}');`);
    }

  } else if (normDomain === "saas") {
    const saasTables = [
      "usage_alerts", "feature_flags", "nps_surveys", "audit_events", "integrations",
      "churn_events", "support_tickets", "cloud_clusters", "feature_usage", "api_keys",
      "users", "invoices", "subscriptions", "pricing_plans", "accounts"
    ];
    for (const tbl of saasTables) {
      sql.push(`DROP TABLE IF EXISTS "${schema}"."${tbl}" CASCADE;`);
    }

    sql.push(
      `CREATE TABLE "${schema}"."accounts" (
        id INT PRIMARY KEY,
        company_name VARCHAR(100) NOT NULL,
        industry VARCHAR(60) NOT NULL,
        tier VARCHAR(30) NOT NULL,
        created_at DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."pricing_plans" (
        id INT PRIMARY KEY,
        plan_name VARCHAR(40) NOT NULL,
        monthly_price NUMERIC(8,2) NOT NULL,
        included_api_calls INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."subscriptions" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        plan VARCHAR(30) NOT NULL,
        mrr NUMERIC(10,2) NOT NULL,
        status VARCHAR(20) NOT NULL,
        started_at DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."invoices" (
        id INT PRIMARY KEY,
        subscription_id INT REFERENCES "${schema}"."subscriptions"(id),
        account_id INT REFERENCES "${schema}"."accounts"(id),
        amount NUMERIC(10,2) NOT NULL,
        is_paid BOOLEAN NOT NULL,
        invoice_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."users" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        full_name VARCHAR(80) NOT NULL,
        email VARCHAR(100) NOT NULL,
        role VARCHAR(30) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."api_keys" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        key_name VARCHAR(60) NOT NULL,
        is_revoked BOOLEAN NOT NULL,
        created_at DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."feature_usage" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        feature_name VARCHAR(80) NOT NULL,
        monthly_events INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."cloud_clusters" (
        id INT PRIMARY KEY,
        cluster_name VARCHAR(80) NOT NULL,
        cloud_provider VARCHAR(30) NOT NULL,
        region VARCHAR(40) NOT NULL,
        monthly_cost_usd NUMERIC(10,2) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."support_tickets" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        priority VARCHAR(20) NOT NULL,
        status VARCHAR(20) NOT NULL,
        resolution_hours INT NOT NULL
      );`,
      `CREATE TABLE "${schema}"."churn_events" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        churn_date DATE NOT NULL,
        arr_lost NUMERIC(10,2) NOT NULL,
        reason VARCHAR(80) NOT NULL
      );`,
      `CREATE TABLE "${schema}"."integrations" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        provider VARCHAR(50) NOT NULL,
        is_active BOOLEAN NOT NULL
      );`,
      `CREATE TABLE "${schema}"."audit_events" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        action VARCHAR(50) NOT NULL,
        timestamp TIMESTAMP NOT NULL
      );`,
      `CREATE TABLE "${schema}"."nps_surveys" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        score INT NOT NULL,
        survey_date DATE NOT NULL
      );`,
      `CREATE TABLE "${schema}"."feature_flags" (
        id INT PRIMARY KEY,
        flag_key VARCHAR(60) NOT NULL,
        min_tier VARCHAR(30) NOT NULL,
        is_enabled BOOLEAN NOT NULL
      );`,
      `CREATE TABLE "${schema}"."usage_alerts" (
        id INT PRIMARY KEY,
        account_id INT REFERENCES "${schema}"."accounts"(id),
        pct_consumed INT NOT NULL,
        alert_date DATE NOT NULL
      );`
    );

    // Seed Accounts
    const coNames = ["Acme Devs", "StackCloud", "Nexus AI", "HyperScale", "DataFlow Inc", "OmniLayer", "ByteWise", "Apex Systems", "CloudForge", "Quantum Ops"];
    const indus = ["Fintech", "Healthtech", "DevTools", "E-Commerce", "EdTech"];
    for (let a = 1; a <= 100; a++) {
      const coNames = [
        "Acme Cloud Systems", "StackFlow Analytics", "Nexus Intelligence AI", "HyperScale Database", "DataStream Global",
        "OmniLayer Infrastructure", "ByteWise DevTools", "Apex Security Mesh", "CloudForge AI", "Quantum Ops Platform",
        "Vercel Deploy Partner", "Supabase DB Core", "Datadog Telemetry Lab", "Snowflake BI Hub", "Segment Ingest Co",
        "Stripe Payments Edge", "HashiCorp Cluster Corp", "Twilio Messaging Hub", "PagerDuty Incident Co", "Figma Design Engine"
      ];
      const baseName = coNames[(a - 1) % coNames.length];
      const companyName = `${baseName} ${Math.floor((a - 1) / coNames.length) + 1}`;
      sql.push(`INSERT INTO "${schema}"."accounts" VALUES (${a}, '${companyName}', '${rng.pick(indus)}', '${rng.pick(["starter", "growth", "growth", "enterprise"])}', '2023-0${rng.range(1, 9)}-10');`);
    }

    // Seed Pricing Plans (6 tiers)
    const plans = [
      [1, "developer_free", 0.00, 10000],
      [2, "starter", 99.00, 100000],
      [3, "growth", 299.00, 500000],
      [4, "professional", 799.00, 2000000],
      [5, "enterprise", 2499.00, 10000000],
      [6, "dedicated_cloud", 5999.00, 50000000],
    ];
    for (const p of plans) {
      sql.push(`INSERT INTO "${schema}"."pricing_plans" VALUES (${p[0]}, '${p[1]}', ${p[2]}, ${p[3]});`);
    }

    // Seed Subscriptions (120 subscriptions)
    const subStatuses = ["active", "active", "active", "active", "past_due", "cancelled"];
    for (let s = 1; s <= 120; s++) {
      const p = plans[(s % 5) + 1]; // avoid free for paid sub table
      sql.push(`INSERT INTO "${schema}"."subscriptions" VALUES (${s}, ${((s - 1) % 100) + 1}, '${p[1]}', ${p[2]}, '${rng.pick(subStatuses)}', '2023-${String(rng.range(1, 12)).padStart(2, "0")}-01');`);
    }

    // Seed Invoices (150 invoices)
    for (let inv = 1; inv <= 150; inv++) {
      const planCost = rng.pick([99, 299, 799, 2499, 5999]);
      sql.push(`INSERT INTO "${schema}"."invoices" VALUES (${inv}, ${rng.range(1, 120)}, ${rng.range(1, 100)}, ${planCost}.00, ${inv % 10 !== 0}, '2024-0${rng.range(1, 4)}-${String(rng.range(1, 28)).padStart(2, "0")}');`);
    }

    // Seed Users (150 users)
    const userRoles = ["Owner", "Admin", "Staff_Engineer", "DevOps_Architect", "Data_Analyst", "Product_Manager", "Security_Lead"];
    const userFirstNames = ["Alex", "Elena", "Liam", "Sophia", "Marcus", "Chloe", "David", "Aaliyah", "James", "Sarah", "Gabriel", "Maya", "Tariq", "Zoe", "Vikram"];
    for (let u = 1; u <= 150; u++) {
      const fn = rng.pick(userFirstNames);
      sql.push(`INSERT INTO "${schema}"."users" VALUES (${u}, ${rng.range(1, 100)}, '${fn} ${u}', '${fn.toLowerCase()}${u}@clientorg.io', '${rng.pick(userRoles)}');`);
    }

    // Seed API Keys (100 api keys)
    const keyPurposes = ["Production_Ingest", "Read_Analytics_RO", "Webhook_Delivery", "Staging_Integration", "CI_CD_Automation"];
    for (let ak = 1; ak <= 100; ak++) {
      sql.push(`INSERT INTO "${schema}"."api_keys" VALUES (${ak}, ${rng.range(1, 100)}, '${rng.pick(keyPurposes)}_${ak}', ${ak % 15 === 0}, '2023-12-${String(rng.range(1, 28)).padStart(2, "0")}');`);
    }

    // Seed Feature Usage (200 records)
    let fId = 1;
    for (let acc = 1; acc <= 50; acc++) {
      for (const feat of ["api_calls", "webhook_delivery", "audit_export", "custom_dashboard"]) {
        sql.push(`INSERT INTO "${schema}"."feature_usage" VALUES (${fId++}, ${acc}, '${feat}', ${rng.range(1200, 450000)});`);
      }
    }

    // Seed Cloud Clusters (15 clusters)
    const clusters = [
      [1, "us-east-prod-k8s-01", "AWS", "us-east-1", 4800.00],
      [2, "us-east-analytics-spark-01", "AWS", "us-east-1", 7200.00],
      [3, "us-west-gpu-training-01", "GCP", "us-west-1", 9600.00],
      [4, "eu-central-prod-k8s-01", "AWS", "eu-central-1", 5100.00],
      [5, "eu-west-db-aurora-primary", "AWS", "eu-west-1", 6400.00],
      [6, "ap-southeast-edge-ingress", "Azure", "ap-southeast-1", 3900.00],
      [7, "us-central-search-elastic", "GCP", "us-central1", 4400.00],
      [8, "us-east-backup-glacier", "AWS", "us-east-1", 1800.00],
      [9, "eu-north-analytics-databricks", "Azure", "eu-north-1", 5800.00],
      [10, "ap-northeast-prod-k8s-02", "AWS", "ap-northeast-1", 4600.00],
      [11, "sa-east-latency-cache", "AWS", "sa-east-1", 3200.00],
      [12, "us-west-storage-ceph-01", "GCP", "us-west-2", 4100.00],
      [13, "ca-central-compliance-node", "Azure", "ca-central-1", 3700.00],
      [14, "me-central-gcc-ingress", "AWS", "me-central-1", 4900.00],
      [15, "us-east-dr-standby-01", "AWS", "us-east-2", 3500.00],
    ];
    for (const cl of clusters) {
      sql.push(`INSERT INTO "${schema}"."cloud_clusters" VALUES (${cl[0]}, '${cl[1]}', '${cl[2]}', '${cl[3]}', ${cl[4]});`);
    }

    // Seed Support Tickets (100 tickets)
    const priorities = ["P1_Critical", "P2_High", "P3_Medium", "P4_Low"];
    const statuses = ["resolved", "resolved", "resolved", "open", "in_progress"];
    for (let st = 1; st <= 100; st++) {
      sql.push(`INSERT INTO "${schema}"."support_tickets" VALUES (${st}, ${rng.range(1, 100)}, '${rng.pick(priorities)}', '${rng.pick(statuses)}', ${rng.range(1, 48)});`);
    }

    // Seed Churn Events (30 events)
    const churnReasons = ["Switched to Competitor", "Budget Reduction", "Missing Advanced Feature", "Pricing Increase", "Company Dissolved"];
    for (let ce = 1; ce <= 30; ce++) {
      sql.push(`INSERT INTO "${schema}"."churn_events" VALUES (${ce}, ${rng.range(1, 100)}, '2024-0${rng.range(1, 4)}-${String(rng.range(1, 28)).padStart(2, "0")}', ${rng.range(2400, 75000)}.00, '${rng.pick(churnReasons)}');`);
    }

    // Seed Integrations (100 integrations)
    const providers = ["Slack", "GitHub", "Datadog", "Snowflake", "Salesforce", "Jira", "PagerDuty", "Segment", "Zapier", "Kubernetes"];
    for (let intg = 1; intg <= 100; intg++) {
      sql.push(`INSERT INTO "${schema}"."integrations" VALUES (${intg}, ${rng.range(1, 100)}, '${rng.pick(providers)}', ${intg % 10 !== 0});`);
    }

    // Seed Audit Events (150 audit events)
    const auditActions = ["API_KEY_GENERATED", "TEAM_MEMBER_INVITED", "BILLING_PLAN_UPGRADED", "SSO_CONFIG_UPDATED", "IP_WHITELIST_MODIFIED", "SECRET_ROTATED"];
    for (let ae = 1; ae <= 150; ae++) {
      sql.push(`INSERT INTO "${schema}"."audit_events" VALUES (${ae}, ${rng.range(1, 100)}, '${rng.pick(auditActions)}', '2024-04-${String(rng.range(1, 28)).padStart(2, "0")} ${String(rng.range(10, 22)).padStart(2, "0")}:00:00');`);
    }

    // Seed NPS Surveys (100 surveys)
    for (let nps = 1; nps <= 100; nps++) {
      sql.push(`INSERT INTO "${schema}"."nps_surveys" VALUES (${nps}, ${rng.range(1, 100)}, ${rng.range(6, 10)}, '2024-04-${String(rng.range(1, 28)).padStart(2, "0")}');`);
    }

    // Seed Feature Flags (10 flags)
    const flags = [
      [1, "ai_query_copilot", "enterprise", true],
      [2, "streaming_telemetry_v2", "growth", true],
      [3, "snowflake_bi_sync", "enterprise", true],
      [4, "zero_trust_saml_enforcement", "enterprise", true],
      [5, "custom_domain_routing", "professional", true],
      [6, "dark_mode_v2_beta", "starter", true],
      [7, "automated_failover_multi_region", "enterprise", false],
      [8, "extended_audit_retention_7yr", "enterprise", true],
      [9, "graphql_federated_gateway", "growth", true],
      [10, "fine_grained_rbac_policies", "enterprise", true],
    ];
    for (const ff of flags) {
      sql.push(`INSERT INTO "${schema}"."feature_flags" VALUES (${ff[0]}, '${ff[1]}', '${ff[2]}', ${ff[3]});`);
    }

    // Seed Usage Alerts (60 usage alerts)
    for (let ua = 1; ua <= 60; ua++) {
      sql.push(`INSERT INTO "${schema}"."usage_alerts" VALUES (${ua}, ${rng.range(1, 100)}, ${rng.range(80, 99)}, '2024-04-${String(rng.range(1, 28)).padStart(2, "0")}');`);
    }
  }

  return sql.join("\n");
}
