import { QuestionDefinition, ECOM_L1_QUESTIONS } from "./ecom-l1-questions";
import { REST_L1_QUESTIONS } from "./rest-l1-questions";
import { REST_L2_QUESTIONS } from "./rest-l2-questions";
import { REST_L3_QUESTIONS } from "./rest-l3-questions";
import { REST_L4_QUESTIONS } from "./rest-l4-questions";
import { REST_L5_QUESTIONS } from "./rest-l5-questions";
import { HC_L1_QUESTIONS } from "./hc-l1-questions";
import { HC_L2_QUESTIONS } from "./hc-l2-questions";
import { HC_L3_QUESTIONS } from "./hc-l3-questions";
import { HC_L4_QUESTIONS } from "./hc-l4-questions";
import { HC_L5_QUESTIONS } from "./hc-l5-questions";
import { FIN_L1_QUESTIONS } from "./fin-l1-questions";
import { FIN_L2_QUESTIONS } from "./fin-l2-questions";
import { FIN_L3_QUESTIONS } from "./fin-l3-questions";
import { FIN_L4_QUESTIONS } from "./fin-l4-questions";
import { FIN_L5_QUESTIONS } from "./fin-l5-questions";
import { HR_L1_QUESTIONS } from "./hr-l1-questions";
import { HR_L2_QUESTIONS } from "./hr-l2-questions";
import { HR_L3_QUESTIONS } from "./hr-l3-questions";
import { HR_L4_QUESTIONS } from "./hr-l4-questions";
import { HR_L5_QUESTIONS } from "./hr-l5-questions";
import { LOG_L1_QUESTIONS } from "./log-l1-questions";
import { LOG_L2_QUESTIONS } from "./log-l2-questions";
import { LOG_L3_QUESTIONS } from "./log-l3-questions";
import { LOG_L4_QUESTIONS } from "./log-l4-questions";
import { LOG_L5_QUESTIONS } from "./log-l5-questions";
import { SAAS_L1_QUESTIONS } from "./saas-l1-questions";
import { SAAS_L2_QUESTIONS } from "./saas-l2-questions";
import { SAAS_L3_QUESTIONS } from "./saas-l3-questions";
import { SAAS_L4_QUESTIONS } from "./saas-l4-questions";
import { SAAS_L5_QUESTIONS } from "./saas-l5-questions";

// In-memory cache for ultra-fast, zero-overhead retrieval (<1ms)
const questionsCache = new Map<string, QuestionDefinition[]>();

interface DomainPersona {
  name: string;
  role: string;
  department: string;
  avatar: string;
}

interface DomainConfig {
  domain: string;
  prefix: string;
  team: DomainPersona[];
  levelTables: Record<number, string[]>;
  tables: Record<string, string[]>;
}

const DOMAIN_CONFIGS: Record<string, DomainConfig> = {
  ecommerce: {
    domain: "ecommerce",
    prefix: "ecom",
    team: [
      { name: "Alex Rivera", role: "CEO", department: "Executive", avatar: "AR" },
      { name: "Rachel Green", role: "VP of Sales", department: "Sales & Marketing", avatar: "RG" },
      { name: "Liam Vance", role: "Fulfillment Director", department: "Operations", avatar: "LV" },
      { name: "Marcus Bell", role: "Support Lead", department: "Support", avatar: "MB" },
    ],
    levelTables: {
      1: ["departments", "categories", "products", "customers", "orders", "order_items"],
      2: ["customer_reviews", "shipments", "coupons"],
      3: ["warehouses", "suppliers", "inventory"],
      4: ["brands", "returns"],
      5: ["support_tickets"],
    },
    tables: {
      products: ["name", "price", "cost", "stock_quantity"],
      orders: ["customer_id", "status", "total_amount", "shipping_fee", "order_date"],
      customers: ["first_name", "last_name", "email", "region", "created_at"],
      categories: ["name", "department_id"],
      departments: ["name", "head_name"],
      shipments: ["carrier", "tracking_number", "shipped_at", "delivered_at"],
      suppliers: ["company_name", "contact_email", "phone", "country", "rating"],
      warehouses: ["name", "city", "state", "capacity_sqft"],
      inventory: ["product_id", "warehouse_id", "quantity_on_hand", "reserved_quantity"],
      coupons: ["code", "discount_percent", "max_uses", "current_uses", "is_active"],
      customer_reviews: ["rating", "title", "is_verified_purchase", "review_date"],
      returns: ["reason", "refund_amount", "status"],
      support_tickets: ["category", "priority", "status", "created_at"],
      brands: ["name", "country_of_origin", "tier"],
      order_items: ["quantity", "unit_price"],
    },
  },
  healthcare: {
    domain: "healthcare",
    prefix: "hc",
    team: [
      { name: "Dr. Evelyn Reed", role: "Chief Medical Officer", department: "Clinical Governance", avatar: "ER" },
      { name: "Jordan Chen", role: "Director of Billing", department: "Revenue Cycle", avatar: "JC" },
      { name: "Dr. Sarah Patel", role: "Head of Surgery", department: "Surgery", avatar: "SP" },
      { name: "Marcus Thorne", role: "Chief Nursing Officer", department: "Nursing Ops", avatar: "MT" },
    ],
    levelTables: {
      1: ["departments", "doctors", "nurses", "patients", "rooms", "appointments"],
      2: ["diagnoses", "prescriptions", "billing"],
      3: ["lab_tests", "patient_lab_results", "insurance_claims"],
      4: ["medications", "inpatient_admissions"],
      5: ["medical_procedures"],
    },
    tables: {
      doctors: ["name", "specialty", "department_id", "email", "phone", "license_number"],
      patients: ["first_name", "last_name", "dob", "gender", "blood_type", "insurance_provider", "city"],
      appointments: ["patient_id", "doctor_id", "appointment_date", "appointment_type", "status", "fee"],
      departments: ["name", "building", "floor"],
      nurses: ["name", "department_id", "shift", "certification_level"],
      rooms: ["room_number", "department_id", "room_type", "daily_rate", "is_occupied"],
      diagnoses: ["icd10_code", "description", "severity", "diagnosis_date"],
      medications: ["name", "generic_name", "dosage_form", "strength", "unit_cost"],
      prescriptions: ["medication_name", "dosage", "refills"],
      lab_tests: ["test_name", "category", "standard_fee", "normal_range_min", "normal_range_max"],
      patient_lab_results: ["patient_id", "test_id", "result_value", "flag", "performed_date"],
      billing: ["total_charge", "copay_amount", "insurance_covered", "patient_balance", "status"],
      insurance_claims: ["insurance_provider", "claim_amount", "approved_amount", "status", "settlement_days"],
      inpatient_admissions: ["admission_date", "discharge_date", "discharge_disposition"],
      medical_procedures: ["code", "procedure_name", "duration_minutes", "standard_cost"],
    },
  },
  finance: {
    domain: "finance",
    prefix: "fin",
    team: [
      { name: "Victor Vance", role: "Head of Risk & Compliance", department: "Risk", avatar: "VV" },
      { name: "Elena Rostova", role: "VP of Retail Lending", department: "Lending", avatar: "ER" },
      { name: "Arthur Pendleton", role: "Chief Wealth Advisor", department: "Wealth", avatar: "AP" },
    ],
    levelTables: {
      1: ["branches", "customers", "accounts", "transactions", "cards", "merchants"],
      2: ["card_swipes", "loans", "credit_lines"],
      3: ["loan_payments", "fraud_alerts", "investments"],
      4: ["teller_sessions", "account_types"],
      5: ["audit_logs"],
    },
    tables: {
      accounts: ["customer_id", "branch_id", "account_type", "balance", "status"],
      customers: ["name", "credit_score", "branch_city", "annual_income", "risk_rating", "created_at"],
      transactions: ["account_id", "amount", "transaction_type", "description", "created_at"],
      branches: ["branch_name", "city", "state", "manager_name", "vault_cash_limit"],
      merchants: ["name", "category", "city", "country", "risk_level"],
      cards: ["card_type", "card_number_masked", "daily_limit", "status"],
      card_swipes: ["amount", "is_contactless", "fraud_score", "transaction_date"],
      loans: ["loan_type", "principal_amount", "interest_rate", "term_months", "status"],
      loan_payments: ["payment_amount", "principal_portion", "interest_portion", "status"],
      credit_lines: ["total_limit", "used_amount", "interest_rate", "status"],
      fraud_alerts: ["severity", "rule_triggered", "status", "alert_date"],
      investments: ["portfolio_type", "total_invested", "current_value", "risk_profile"],
      teller_sessions: ["teller_name", "opening_cash", "closing_cash", "session_date"],
      audit_logs: ["entity_type", "action", "performed_by", "timestamp"],
      account_types: ["type_name", "min_balance", "annual_interest_rate", "monthly_fee"],
    },
  },
  hr: {
    domain: "hr",
    prefix: "hr",
    team: [
      { name: "Maya Thorne", role: "VP of People Operations", department: "HR", avatar: "MT" },
      { name: "David Kim", role: "Director of Talent Acquisition", department: "Recruiting", avatar: "DK" },
      { name: "Alicia Gomez", role: "Head of Compensation", department: "People Ops", avatar: "AG" },
    ],
    levelTables: {
      1: ["departments", "job_roles", "locations", "employees", "attendance_logs", "leave_requests"],
      2: ["salaries_history", "performance_reviews", "benefits_packages"],
      3: ["employee_benefits", "training_courses", "employee_trainings"],
      4: ["job_openings", "candidates"],
      5: ["employee_promotions"],
    },
    tables: {
      employees: ["name", "department_id", "role_id", "salary", "hire_date", "status"],
      departments: ["name", "head_name", "budget"],
      job_roles: ["job_title", "grade_level", "min_salary", "max_salary"],
      locations: ["office_name", "city", "country", "capacity"],
      salaries_history: ["effective_date", "previous_salary", "new_salary", "change_reason"],
      benefits_packages: ["package_name", "health_plan", "retirement_match_pct", "annual_cost"],
      employee_benefits: ["enrolled_date"],
      performance_reviews: ["review_year", "rating", "bonus_pct"],
      leave_requests: ["leave_type", "start_date", "end_date", "total_days", "status"],
      attendance_logs: ["work_date", "work_mode", "hours_worked"],
      training_courses: ["course_title", "category", "duration_hours"],
      employee_trainings: ["status", "score"],
      job_openings: ["status", "posting_date"],
      candidates: ["name", "stage", "interview_score"],
      employee_promotions: ["promotion_date"],
    },
  },
  logistics: {
    domain: "logistics",
    prefix: "log",
    team: [
      { name: "Dave Miller", role: "VP of Fleet Operations", department: "Logistics", avatar: "DM" },
      { name: "Claire Sullivan", role: "Director of Supply Chain", department: "Supply Chain", avatar: "CS" },
      { name: "Frank Miller", role: "Midwest Terminal Manager", department: "Operations", avatar: "FM" },
    ],
    levelTables: {
      1: ["warehouses", "carriers", "fleet_vehicles", "drivers", "suppliers", "shipments"],
      2: ["cargo_packages", "freight_routes", "delivery_checkpoints"],
      3: ["parts_inventory", "fuel_logs", "maintenance_records"],
      4: ["customs_declarations", "freight_invoices"],
      5: ["incidents"],
    },
    tables: {
      shipments: ["origin_warehouse", "destination_city", "weight_kg", "status"],
      warehouses: ["city", "capacity_sqft", "manager_name"],
      carriers: ["carrier_name", "service_level", "rating"],
      fleet_vehicles: ["vehicle_number", "vehicle_type", "max_weight_capacity_kg", "mileage_km", "status"],
      drivers: ["full_name", "license_number", "experience_years", "safety_score"],
      suppliers: ["supplier_name", "country", "lead_time_days", "reliability_score"],
      parts_inventory: ["part_number", "quantity_in_stock", "unit_cost"],
      cargo_packages: ["weight_kg", "declared_value", "is_hazardous"],
      freight_routes: ["route_name", "distance_km", "avg_transit_hours", "toll_costs"],
      delivery_checkpoints: ["location_name", "scanned_at", "status"],
      fuel_logs: ["gallons", "price_per_gallon", "log_date"],
      maintenance_records: ["service_type", "cost", "service_date"],
      customs_declarations: ["port_of_entry", "duty_amount", "status"],
      freight_invoices: ["total_billed", "payment_status", "due_date"],
      incidents: ["incident_type", "claim_cost", "reported_date"],
    },
  },
  restaurants: {
    domain: "restaurants",
    prefix: "rest",
    team: [
      { name: "Chef Marco Vieri", role: "Executive Chef & Founder", department: "Culinary Ops", avatar: "MV" },
      { name: "Giulia Conti", role: "Director of Hospitality", department: "Front of House", avatar: "GC" },
      { name: "Elena Rossi", role: "Beverage & Cellar Director", department: "Hospitality", avatar: "ER" },
    ],
    levelTables: {
      1: ["restaurants", "dining_sections", "dining_tables", "menu_categories", "menu_items", "orders"],
      2: ["order_items", "reservations", "guest_reviews"],
      3: ["ingredients", "suppliers", "ingredient_purchases"],
      4: ["staff_members", "shifts"],
      5: ["waste_logs"],
    },
    tables: {
      restaurants: ["name", "city", "seating_capacity", "opened_year"],
      dining_sections: ["section_name", "is_outdoor"],
      dining_tables: ["table_number", "max_seats"],
      menu_items: ["name", "category", "price", "cost"],
      ingredients: ["ingredient_name", "category", "unit_cost", "current_stock_qty"],
      suppliers: ["supplier_name", "category", "rating"],
      ingredient_purchases: ["total_amount", "purchase_date"],
      reservations: ["guest_name", "party_size", "reservation_time", "status"],
      orders: ["table_number", "order_time", "total_amount", "server_name"],
      order_items: ["quantity"],
      staff_members: ["name", "role", "hourly_rate"],
      shifts: ["shift_type", "hours_worked", "shift_date"],
      guest_reviews: ["rating", "comments", "review_date"],
      waste_logs: ["quantity_wasted", "reason", "log_date"],
      menu_categories: ["name", "is_alcoholic"],
    },
  },
  saas: {
    domain: "saas",
    prefix: "saas",
    team: [
      { name: "Samira Khan", role: "CEO & Founder", department: "Executive", avatar: "SK" },
      { name: "Tariq Mansoor", role: "VP of Engineering & Cloud Ops", department: "Infrastructure", avatar: "TM" },
      { name: "Chloe Vance", role: "Head of Product Analytics", department: "Product", avatar: "CV" },
    ],
    levelTables: {
      1: ["accounts", "pricing_plans", "subscriptions", "invoices", "users", "api_keys"],
      2: ["feature_usage", "cloud_clusters", "support_tickets"],
      3: ["integrations", "audit_events", "churn_events"],
      4: ["nps_surveys", "feature_flags"],
      5: ["usage_alerts"],
    },
    tables: {
      accounts: ["company_name", "industry", "tier", "created_at"],
      subscriptions: ["plan", "mrr", "status", "started_at"],
      pricing_plans: ["plan_name", "monthly_price", "included_api_calls"],
      invoices: ["amount", "is_paid", "invoice_date"],
      users: ["full_name", "email", "role"],
      api_keys: ["key_name", "is_revoked", "created_at"],
      feature_usage: ["feature_name", "monthly_events"],
      cloud_clusters: ["cluster_name", "cloud_provider", "region", "monthly_cost_usd"],
      support_tickets: ["priority", "status", "resolution_hours"],
      churn_events: ["churn_date", "arr_lost", "reason"],
      integrations: ["provider", "is_active"],
      audit_events: ["action", "timestamp"],
      nps_surveys: ["score", "survey_date"],
      feature_flags: ["flag_key", "min_tier", "is_enabled"],
      usage_alerts: ["pct_consumed", "alert_date"],
    },
  },
};

export function generateDomainLevelQuestions(
  domain: string,
  level: number
): QuestionDefinition[] {
  const norm = domain.toLowerCase();

  // Hand-curated domain/level overrides (authentic stakeholder questions)
  if ((norm === "ecommerce" || norm === "ecom") && level === 1) {
    return ECOM_L1_QUESTIONS;
  }
  if (norm === "restaurants") {
    if (level === 1) return REST_L1_QUESTIONS;
    if (level === 2) return REST_L2_QUESTIONS;
    if (level === 3) return REST_L3_QUESTIONS;
    if (level === 4) return REST_L4_QUESTIONS;
    if (level === 5) return REST_L5_QUESTIONS;
  }
  if (norm === "healthcare") {
    if (level === 1) return HC_L1_QUESTIONS;
    if (level === 2) return HC_L2_QUESTIONS;
    if (level === 3) return HC_L3_QUESTIONS;
    if (level === 4) return HC_L4_QUESTIONS;
    if (level === 5) return HC_L5_QUESTIONS;
  }
  if (norm === "finance" || norm === "finance & banking" || norm === "banking") {
    if (level === 1) return FIN_L1_QUESTIONS;
    if (level === 2) return FIN_L2_QUESTIONS;
    if (level === 3) return FIN_L3_QUESTIONS;
    if (level === 4) return FIN_L4_QUESTIONS;
    if (level === 5) return FIN_L5_QUESTIONS;
  }
  if (norm === "hr" || norm === "human resources" || norm === "human_resources") {
    if (level === 1) return HR_L1_QUESTIONS;
    if (level === 2) return HR_L2_QUESTIONS;
    if (level === 3) return HR_L3_QUESTIONS;
    if (level === 4) return HR_L4_QUESTIONS;
    if (level === 5) return HR_L5_QUESTIONS;
  }
  if (norm === "logistics" || norm === "supply" || norm === "supply_chain" || norm === "logistics & supply") {
    if (level === 1) return LOG_L1_QUESTIONS;
    if (level === 2) return LOG_L2_QUESTIONS;
    if (level === 3) return LOG_L3_QUESTIONS;
    if (level === 4) return LOG_L4_QUESTIONS;
    if (level === 5) return LOG_L5_QUESTIONS;
  }
  if (norm === "saas" || norm === "software" || norm === "cloud") {
    if (level === 1) return SAAS_L1_QUESTIONS;
    if (level === 2) return SAAS_L2_QUESTIONS;
    if (level === 3) return SAAS_L3_QUESTIONS;
    if (level === 4) return SAAS_L4_QUESTIONS;
    if (level === 5) return SAAS_L5_QUESTIONS;
  }

  const cacheKey = `${norm}_L${level}`;
  if (questionsCache.has(cacheKey)) {
    return questionsCache.get(cacheKey)!;
  }

  const cfg = DOMAIN_CONFIGS[norm] || DOMAIN_CONFIGS.ecommerce;
  const questions: QuestionDefinition[] = [];

  // Generate exactly 100 questions for this domain and level
  for (let order = 1; order <= 100; order++) {
    const pad = String(order).padStart(3, "0");
    const id = `${cfg.prefix}-L${level}-${pad}`;
    const persona = cfg.team[(order - 1) % cfg.team.length];

    const q = buildQuestionForDomainLevelOrder(cfg, level, order, id, persona);
    questions.push(q);
  }

  questionsCache.set(cacheKey, questions);
  return questions;
}

function buildQuestionForDomainLevelOrder(
  cfg: DomainConfig,
  level: number,
  order: number,
  id: string,
  persona: DomainPersona
): QuestionDefinition {
  const domain = cfg.domain;

  if (level === 1) {
    return generateL1Question(cfg, order, id, persona);
  } else if (level === 2) {
    return generateL2Question(cfg, order, id, persona);
  } else if (level === 3) {
    return generateL3Question(cfg, order, id, persona);
  } else if (level === 4) {
    return generateL4Question(cfg, order, id, persona);
  } else {
    return generateL5Question(cfg, order, id, persona);
  }
}

// -------------------------------------------------------------
// LEVEL 1: BEGINNER & CORE FUNDAMENTALS
// Single table, SELECT, WHERE, ORDER BY, LIMIT, DISTINCT, Arithmetic
// Tables: strictly levelTables[1] (6 core operational tables)
// -------------------------------------------------------------
function generateL1Question(
  cfg: DomainConfig,
  order: number,
  id: string,
  persona: DomainPersona
): QuestionDefinition {
  const allowedTables = cfg.levelTables[1] || Object.keys(cfg.tables).slice(0, 6);
  const targetTable = allowedTables[(order - 1) % allowedTables.length];
  const columns = cfg.tables[targetTable] || ["id"];
  const col1 = columns[0] || "id";
  const col2 = columns.length > 1 ? columns[1] : col1;
  const friendlyName = targetTable.replace(/_/g, " ");

  const intros = [
    `Good morning! Ahead of our quarterly operational review,`,
    `Hello! As we calibrate our baseline department records,`,
    `Hi there! Our leadership team requested an operational snapshot, and`,
    `Greetings! Before our upcoming stakeholder briefing,`,
    `Hi! We are auditing our active primary registers, and`,
  ];
  const intro = intros[(order - 1) % intros.length];

  let title = `Review ${friendlyName} records`;
  let request = `From: ${persona.name} (${persona.role})\n\n"${intro} could you pull up an operational overview from our ${friendlyName} register? Please organize the records in ascending order. (Limit to the first 25 records)."`;
  let refSql = `SELECT ${col1}, ${col2} FROM ${targetTable} ORDER BY ${col1} ASC LIMIT 25;`;
  let expectedCols = [col1, col2];
  let concepts = ["SELECT", "ORDER BY", "LIMIT"];

  // Varied authentic business inquiries
  if (order % 4 === 1) {
    title = `Operational verification of ${friendlyName}`;
    request = `From: ${persona.name} (${persona.role})\n\n"${intro} could you retrieve a baseline report of our ${friendlyName} entries? Please sort the dataset in ascending order. (Limit to the top 20 records)."`;
    refSql = `SELECT ${col1}, ${col2} FROM ${targetTable} ORDER BY ${col1} ASC LIMIT 20;`;
    expectedCols = [col1, col2];
    concepts = ["SELECT", "ORDER BY ASC", "LIMIT"];
  } else if (order % 4 === 2) {
    title = `Distinct entries in ${friendlyName}`;
    request = `From: ${persona.name} (${persona.role})\n\n"${intro} our compliance officers need a clean catalog of every unique category or status entry recorded in our ${friendlyName} register. Please return only unique non-null entries in alphabetical order."`;
    refSql = `SELECT DISTINCT ${col2} FROM ${targetTable} WHERE ${col2} IS NOT NULL ORDER BY ${col2} ASC;`;
    expectedCols = [col2];
    concepts = ["SELECT", "DISTINCT", "WHERE", "ORDER BY"];
  } else if (order % 4 === 3) {
    title = `Top sorted entries from ${friendlyName}`;
    request = `From: ${persona.name} (${persona.role})\n\n"${intro} could you extract the leading entries from our ${friendlyName} system? Please arrange the records in descending order. (Limit to the first 15 records)."`;
    refSql = `SELECT ${col1}, ${col2} FROM ${targetTable} ORDER BY ${col1} DESC LIMIT 15;`;
    expectedCols = [col1, col2];
    concepts = ["SELECT", "ORDER BY DESC", "LIMIT"];
  }

  const isWarmup = order <= 25;

  return {
    id,
    domain: cfg.domain,
    level: 1,
    order,
    difficulty: isWarmup ? "warm-up" : "core",
    title,
    stakeholder: persona,
    request,
    context_notes: `Query the '${targetTable}' table. Return columns: ${expectedCols.join(", ")}.`,
    concepts,
    expected_columns: expectedCols,
    reference_sql: refSql,
    validation: { order_sensitive: false, column_names_sensitive: false, numeric_tolerance: 0.01 },
    hints: [
      `Write a SELECT statement specifying ${expectedCols.join(", ")}.`,
      `Specify FROM ${targetTable}.`,
      `Add the requested ORDER BY clause and row limit if specified.`,
    ],
    solution_explanation: `Retrieves targeted attributes from the ${targetTable} table with deterministic ordering.`,
    xp: isWarmup ? 10 : 15,
    estimated_minutes: 3,
  };
}

// -------------------------------------------------------------
// LEVEL 2: INTERMEDIATE
// GROUP BY, HAVING, COUNT, SUM, AVG, MIN, MAX, 2-Table Joins
// Tables: strictly levelTables[1] + levelTables[2] (9 tables)
// -------------------------------------------------------------
function generateL2Question(
  cfg: DomainConfig,
  order: number,
  id: string,
  persona: DomainPersona
): QuestionDefinition {
  const allowedTables = [...(cfg.levelTables[1] || []), ...(cfg.levelTables[2] || [])];
  const tIndex = (order - 1) % allowedTables.length;
  const targetTable = allowedTables[tIndex];
  const columns = cfg.tables[targetTable] || ["id"];
  const groupCol = columns[1] || columns[0] || "id";
  const friendlyName = targetTable.replace(/_/g, " ");

  const aggIntros = [
    `Good afternoon! We are compiling our executive monthly scorecard.`,
    `Hello! As part of our regional performance benchmarking,`,
    `Hi there! We need to understand the volume distribution across our categories.`,
    `Greetings! Our strategy group is analyzing segment concentration in our operations.`,
  ];
  const aggIntro = aggIntros[(order - 1) % aggIntros.length];

  let title = `Total volume in ${friendlyName} grouped by ${groupCol}`;
  let request = `From: ${persona.name} (${persona.role})\n\n"${aggIntro} Could you summarize our '${targetTable}' table by grouping records according to '${groupCol}'? Please compute the total count of entries for each group (aliased as record_count), and sort descending by count."`;
  let refSql = `SELECT ${groupCol}, COUNT(*) AS record_count FROM ${targetTable} WHERE ${groupCol} IS NOT NULL GROUP BY ${groupCol} ORDER BY record_count DESC;`;
  let expectedCols = [groupCol, "record_count"];
  let concepts = ["GROUP BY", "COUNT(*)", "ORDER BY"];

  if (order % 3 === 1) {
    title = `High-volume ${groupCol} segments in ${friendlyName}`;
    request = `From: ${persona.name} (${persona.role})\n\n"${aggIntro} We want to identify active volume clusters in '${targetTable}'. Group by '${groupCol}', calculate the total frequency as record_count, and only include groups that have at least 1 record. Please sort descending by count."`;
    refSql = `SELECT ${groupCol}, COUNT(*) AS record_count FROM ${targetTable} WHERE ${groupCol} IS NOT NULL GROUP BY ${groupCol} HAVING COUNT(*) >= 1 ORDER BY record_count DESC;`;
    expectedCols = [groupCol, "record_count"];
    concepts = ["GROUP BY", "HAVING", "COUNT(*)"];
  } else if (order % 3 === 2) {
    title = `Volume and max identifier in ${friendlyName}`;
    request = `From: ${persona.name} (${persona.role})\n\n"${aggIntro} Could you compute the total count (as total_items) and the highest assigned primary key (as max_id) for each '${groupCol}' in '${targetTable}'? Please order by total_items descending."`;
    refSql = `SELECT ${groupCol}, COUNT(*) AS total_items, MAX(id) AS max_id FROM ${targetTable} WHERE ${groupCol} IS NOT NULL GROUP BY ${groupCol} ORDER BY total_items DESC;`;
    expectedCols = [groupCol, "total_items", "max_id"];
    concepts = ["GROUP BY", "COUNT", "MAX", "ORDER BY"];
  }

  const isCore = order <= 40;

  return {
    id,
    domain: cfg.domain,
    level: 2,
    order,
    difficulty: isCore ? "core" : "challenging",
    title,
    stakeholder: persona,
    request,
    context_notes: `Perform an aggregate query on '${targetTable}'. Return columns: ${expectedCols.join(", ")}.`,
    concepts,
    expected_columns: expectedCols,
    reference_sql: refSql,
    validation: { order_sensitive: false, column_names_sensitive: false, numeric_tolerance: 0.01 },
    hints: [
      `Use GROUP BY ${groupCol} to aggregate rows.`,
      `Use COUNT(*) AS ${expectedCols[1]} to compute group totals.`,
      `Apply HAVING or WHERE conditions as requested.`,
    ],
    solution_explanation: `Groups table records by attribute to derive segment frequencies and totals.`,
    xp: isCore ? 20 : 25,
    estimated_minutes: 5,
  };
}

// -------------------------------------------------------------
// LEVEL 3: ADVANCED
// Multi-Table Joins (3-4 tables), Subqueries, CASE WHEN, COALESCE
// Tables: strictly levelTables[1] + levelTables[2] + levelTables[3] (12 tables)
// -------------------------------------------------------------
function generateL3Question(
  cfg: DomainConfig,
  order: number,
  id: string,
  persona: DomainPersona
): QuestionDefinition {
  const allowedTables = [
    ...(cfg.levelTables[1] || []),
    ...(cfg.levelTables[2] || []),
    ...(cfg.levelTables[3] || []),
  ];
  const t1 = allowedTables[(order - 1) % allowedTables.length];
  const t2 = allowedTables[order % allowedTables.length];

  let title = `Relational classification in ${t1.replace(/_/g, " ")}`;
  let request = `From: ${persona.name} (${persona.role})\n\n"Good afternoon! We are analyzing records in our '${t1}' ledger. Could you extract the identifier and classify each entry with a CASE statement as 'Tier A' if id > 10, else 'Tier B' (aliased as tier_status)? Please order ascending by id. (Limit to the top 20 records)."`;

  let refSql = `SELECT t.id, CASE WHEN t.id > 10 THEN 'Tier A' ELSE 'Tier B' END AS tier_status FROM ${t1} t ORDER BY t.id ASC LIMIT 20;`;
  let expectedCols = ["id", "tier_status"];
  let concepts = ["CASE WHEN", "CONDITIONAL LOGIC", "ORDER BY"];

  if (cfg.domain === "healthcare") {
    if (order % 3 === 0) {
      title = "Physicians and Completed Appointments with Fees";
      request = `From: ${persona.name} (${persona.role})\n\n"Good morning! Clinical governance is reviewing completed patient consultations. Could you compile a report showing each physician's name, clinical specialty, and the completed appointment fee? Please order by fee descending. (Limit to 20 records)."`;
      refSql = `SELECT d.name, d.specialty, a.fee FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' ORDER BY a.fee DESC LIMIT 20;`;
      expectedCols = ["name", "specialty", "fee"];
      concepts = ["INNER JOIN", "WHERE", "ORDER BY"];
    } else if (order % 3 === 1) {
      title = "Abnormal Patient Diagnostic Lab Results";
      request = `From: ${persona.name} (${persona.role})\n\n"Hello! We are auditing patient diagnostic flags. Please extract all patient lab results that were flagged as abnormal (anything other than 'NORMAL'). Return the patient ID, diagnostic test name, numerical result value, and the severity flag, sorted by test date descending. (Limit to 25 records)."`;
      refSql = `SELECT r.patient_id, t.test_name, r.result_value, r.flag FROM patient_lab_results r JOIN lab_tests t ON r.test_id = t.id WHERE r.flag <> 'NORMAL' ORDER BY r.performed_date DESC LIMIT 25;`;
      expectedCols = ["patient_id", "test_name", "result_value", "flag"];
      concepts = ["INNER JOIN", "FILTER", "ORDER BY"];
    } else {
      title = "Billing Stratification by Payment Bracket";
      request = `From: ${persona.name} (${persona.role})\n\n"Hi! Our revenue cycle team needs to segment patient bills into payment brackets. Return the patient ID, total charge, and an evaluated 'payment_bracket' marked 'High Charge' if total charge > 1000, else 'Standard Charge'. Order by total charge descending. (Limit to 30 records)."`;
      refSql = `SELECT b.patient_id, b.total_charge, CASE WHEN b.total_charge > 1000 THEN 'High Charge' ELSE 'Standard Charge' END AS payment_bracket FROM billing b ORDER BY b.total_charge DESC LIMIT 30;`;
      expectedCols = ["patient_id", "total_charge", "payment_bracket"];
      concepts = ["CASE WHEN", "ORDER BY", "LIMIT"];
    }
  } else if (cfg.domain === "finance") {
    if (order % 3 === 0) {
      title = "Customer Accounts with Home Branch Locations";
      request = `From: ${persona.name} (${persona.role})\n\n"Hello! We are conducting our quarterly depository audit across our retail branch network. Can you pull customer accounts joined with their home branch, showing the customer name, account type, cleared balance, and branch name? Please sort by balance descending. (Limit to 25 records)."`;
      refSql = `SELECT c.name, a.account_type, a.balance, b.branch_name FROM accounts a JOIN customers c ON a.customer_id = c.id JOIN branches b ON a.branch_id = b.id ORDER BY a.balance DESC LIMIT 25;`;
      expectedCols = ["name", "account_type", "balance", "branch_name"];
      concepts = ["3-WAY JOIN", "ORDER BY"];
    } else if (order % 3 === 1) {
      title = "Transactions with Amount Movement Classification";
      request = `From: ${persona.name} (${persona.role})\n\n"Good afternoon! As part of our anti-money laundering monitoring, please classify our ledger transactions by size. Return the transaction ID, amount, and an 'audit_flag' labeled 'Large Movement' if the amount is $2,500 or greater, otherwise 'Standard'. Order descending by amount. (Limit to 30 records)."`;
      refSql = `SELECT t.id, t.amount, CASE WHEN t.amount >= 2500 THEN 'Large Movement' ELSE 'Standard' END AS audit_flag FROM transactions t ORDER BY t.amount DESC LIMIT 30;`;
      expectedCols = ["id", "amount", "audit_flag"];
      concepts = ["CASE WHEN", "CONDITIONAL LOGIC"];
    } else {
      title = "Elevated Risk Card Swipes with Merchant Details";
      request = `From: ${persona.name} (${persona.role})\n\n"Greetings! Our card security team needs to review high-risk POS transactions. Please extract card swipes where the fraud risk score reached 50 or above, showing card ID, merchant name, transaction amount, and fraud score, ordered from highest fraud risk downward."`;
      refSql = `SELECT s.card_id, m.name, s.amount, s.fraud_score FROM card_swipes s JOIN merchants m ON s.merchant_id = m.id WHERE s.fraud_score >= 50 ORDER BY s.fraud_score DESC;`;
      expectedCols = ["card_id", "name", "amount", "fraud_score"];
      concepts = ["INNER JOIN", "WHERE", "ORDER BY"];
    }
  } else if (cfg.domain === "hr") {
    if (order % 3 === 0) {
      title = "Employee Compensation with Department and Job Role";
      request = `From: ${persona.name} (${persona.role})\n\n"Good morning! We are preparing the annual compensation report for the board. Could you generate a roster of employees displaying their full name, department title, job role title, and current salary? Please sort descending by salary. (Limit to 30 records)."`;
      refSql = `SELECT e.name, d.name AS dept_name, j.job_title, e.salary FROM employees e JOIN departments d ON e.department_id = d.id JOIN job_roles j ON e.role_id = j.id ORDER BY e.salary DESC LIMIT 30;`;
      expectedCols = ["name", "dept_name", "job_title", "salary"];
      concepts = ["3-WAY JOIN", "ORDER BY"];
    } else if (order % 3 === 1) {
      title = "Performance Rating Compensation Brackets";
      request = `From: ${persona.name} (${persona.role})\n\n"Hi! We are calibrating performance bonus bands ahead of annual reviews. Can you return the employee ID, performance review rating, and a 'bonus_tier' marked 'Top Tier' for rating 5, 'Mid Tier' for rating 3 or 4, and 'Improvement Needed' otherwise? Sort descending by rating."`;
      refSql = `SELECT employee_id, rating, CASE WHEN rating = 5 THEN 'Top Tier' WHEN rating >= 3 THEN 'Mid Tier' ELSE 'Improvement Needed' END AS bonus_tier FROM performance_reviews ORDER BY rating DESC;`;
      expectedCols = ["employee_id", "rating", "bonus_tier"];
      concepts = ["CASE WHEN", "CONDITIONAL BRANCHING"];
    } else {
      title = "Active Staff with Approved Leave Records";
      request = `From: ${persona.name} (${persona.role})\n\n"Hello! Our workforce operations team is auditing approved PTO leaves. Could you pull our employee names, their requested leave type, and total leave days for all approved requests, sorted by days descending? (Limit to 25 records)."`;
      refSql = `SELECT e.name, l.leave_type, l.total_days FROM employees e JOIN leave_requests l ON e.id = l.employee_id WHERE l.status = 'approved' ORDER BY l.total_days DESC LIMIT 25;`;
      expectedCols = ["name", "leave_type", "total_days"];
      concepts = ["INNER JOIN", "WHERE"];
    }
  } else if (cfg.domain === "logistics") {
    if (order % 3 === 0) {
      title = "Shipment Manifest with Origin Warehouse and Carrier";
      request = `From: ${persona.name} (${persona.role})\n\n"Morning dispatch briefing: Could you generate a freight manifest linking each shipment to its departure warehouse and assigned carrier? Please return the shipment ID, origin warehouse city, carrier name, weight in kg, and shipment status, sorted by weight descending. (Limit to 25 records)."`;
      refSql = `SELECT s.id, w.city AS origin_city, c.carrier_name, s.weight_kg, s.status FROM shipments s JOIN warehouses w ON s.warehouse_id = w.id JOIN carriers c ON s.carrier_id = c.id ORDER BY s.weight_kg DESC LIMIT 25;`;
      expectedCols = ["id", "origin_city", "carrier_name", "weight_kg", "status"];
      concepts = ["3-WAY JOIN", "ORDER BY"];
    } else {
      title = "Transport Fleet Payload Capacity Tiers";
      request = `From: ${persona.name} (${persona.role})\n\n"Hello! To prepare for heavy route assignments, we need to classify our transport fleet. Show the vehicle number, max weight capacity in kg, and a 'capacity_tier' categorized as 'Heavy' if capacity is 15,000 kg or greater, otherwise 'Medium'. Sort by capacity descending."`;
      refSql = `SELECT vehicle_number, max_weight_capacity_kg, CASE WHEN max_weight_capacity_kg >= 15000 THEN 'Heavy' ELSE 'Medium' END AS capacity_tier FROM fleet_vehicles ORDER BY max_weight_capacity_kg DESC;`;
      expectedCols = ["vehicle_number", "max_weight_capacity_kg", "capacity_tier"];
      concepts = ["CASE WHEN", "FILTERING"];
    }
  } else if (cfg.domain === "restaurants") {
    if (order % 3 === 0) {
      title = "Menu Items with Gross Profit Margin Brackets";
      request = `From: ${persona.name} (${persona.role})\n\n"Good morning! We're recalibrating our seasonal dinner menu and need to audit our dish profitability. Could you calculate the profit margin (price - cost) for each item, and label it as 'High' if profit is at least $15.00, otherwise 'Standard'? Please sort with highest profit first."`;
      refSql = `SELECT name, price, cost, (price - cost) AS profit, CASE WHEN (price - cost) >= 15.00 THEN 'High' ELSE 'Standard' END AS margin_tier FROM menu_items ORDER BY profit DESC;`;
      expectedCols = ["name", "price", "cost", "profit", "margin_tier"];
      concepts = ["ARITHMETIC", "CASE WHEN", "ORDER BY"];
    } else {
      title = "Dining Room Checks with Server Name and Check Total";
      request = `From: ${persona.name} (${persona.role})\n\n"Hi! Before the Friday dinner rush, could you pull up our dining room orders showing the order ID, table number, attending server name, and total amount billed? Please focus on checks of $75 or more, ordered from largest check to smallest. (Limit to 25 records)."`;
      refSql = `SELECT o.id, o.table_number, o.server_name, o.total_amount FROM orders o WHERE o.total_amount >= 75.00 ORDER BY o.total_amount DESC LIMIT 25;`;
      expectedCols = ["id", "table_number", "server_name", "total_amount"];
      concepts = ["WHERE", "ORDER BY", "FILTER"];
    }
  } else {
    // SaaS or E-Commerce L3
    title = `Client Accounts with Active Subscriptions and Plan Tiers`;
    request = `From: ${persona.name} (${persona.role})\n\n"Hey there! Ahead of our investor update, could you run a cross-table join of our client accounts with active subscriptions? Return the company name, subscription plan, and MRR, sorted from highest MRR to lowest. (Limit to 25 records)."`;
    refSql = `SELECT a.company_name, s.plan, s.mrr FROM accounts a JOIN subscriptions s ON a.id = s.account_id WHERE s.status = 'active' ORDER BY s.mrr DESC LIMIT 25;`;
    expectedCols = ["company_name", "plan", "mrr"];
    concepts = ["INNER JOIN", "WHERE", "ORDER BY"];
  }

  const isBoss = order > 70;

  return {
    id,
    domain: cfg.domain,
    level: 3,
    order,
    difficulty: isBoss ? "boss" : "challenging",
    title,
    stakeholder: persona,
    request,
    context_notes: `Join relevant domain tables or construct CASE conditional logic. Return columns: ${expectedCols.join(", ")}.`,
    concepts,
    expected_columns: expectedCols,
    reference_sql: refSql,
    validation: { order_sensitive: false, column_names_sensitive: false, numeric_tolerance: 0.01 },
    hints: [
      `Use explicit JOIN syntax (e.g. JOIN table ON condition).`,
      `Use CASE WHEN condition THEN val ELSE val END for conditional classification.`,
      `Ensure all requested columns (${expectedCols.join(", ")}) are projected.`,
    ],
    solution_explanation: `Executes a relational join and conditional expressions across business tables.`,
    xp: isBoss ? 35 : 30,
    estimated_minutes: 8,
  };
}

// -------------------------------------------------------------
// LEVEL 4: EXPERT
// Common Table Expressions (CTEs), Window Functions: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD
// Tables: strictly levelTables[1]..[4] (14 tables)
// -------------------------------------------------------------
function generateL4Question(
  cfg: DomainConfig,
  order: number,
  id: string,
  persona: DomainPersona
): QuestionDefinition {
  let title = `Window Ranking Analysis across ${cfg.domain} entities`;
  let request = `From: ${persona.name} (${persona.role})\n\n"Good afternoon! We are conducting an executive benchmarking exercise. Could you apply window ranking functions using a Common Table Expression (CTE) to determine positional ranks across our ledger entries? Return the identifier, amount, and assigned rank_pos."`;
  let refSql = `WITH ranked_data AS (
    SELECT id, total_amount, ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS rank_pos
    FROM orders
  )
  SELECT id, total_amount, rank_pos FROM ranked_data WHERE rank_pos <= 10;`;
  let expectedCols = ["id", "total_amount", "rank_pos"];
  let concepts = ["WITH (CTE)", "ROW_NUMBER() OVER", "WINDOW FUNCTION"];

  if (cfg.domain === "healthcare") {
    if (order % 2 === 0) {
      title = "Rank Physicians by Consultation Fee using DENSE_RANK";
      request = `From: ${persona.name} (${persona.role})\n\n"Good morning! Our medical executive committee is benchmarking physician fee structures. Using a window function, could you assign a dense rank to each doctor based on appointment fee within their department? Return doctor_id, fee, and fee_rank (using DENSE_RANK ordered by fee descending). (Limit to 25 records)."`;
      refSql = `SELECT doctor_id, fee, DENSE_RANK() OVER (ORDER BY fee DESC) AS fee_rank FROM appointments WHERE status = 'completed' ORDER BY fee_rank ASC LIMIT 25;`;
      expectedCols = ["doctor_id", "fee", "fee_rank"];
      concepts = ["DENSE_RANK() OVER", "WINDOW FUNCTION"];
    } else {
      title = "Running Cumulative Total of Hospital Billing using CTE";
      request = `From: ${persona.name} (${persona.role})\n\n"Hi! We are analyzing cash collection velocity across the hospital network. Using a CTE, calculate a cumulative running total of patient billing charges ordered chronologically. Return billing id, total_charge, and running_total. (Limit to 30 records)."`;
      refSql = `WITH billing_cte AS (
        SELECT id, total_charge, SUM(total_charge) OVER (ORDER BY id ASC) AS running_total
        FROM billing
      )
      SELECT id, total_charge, running_total FROM billing_cte LIMIT 30;`;
      expectedCols = ["id", "total_charge", "running_total"];
      concepts = ["WITH (CTE)", "SUM() OVER (ORDER BY)", "RUNNING TOTAL"];
    }
  } else if (cfg.domain === "finance") {
    if (order % 2 === 0) {
      title = "Rank Accounts by Cleared Balance using ROW_NUMBER";
      request = `From: ${persona.name} (${persona.role})\n\n"Hello! For our daily liquidity assessment, please provide a ranked roster of our largest active accounts. Return the account id, customer_id, balance, and balance_rank (using ROW_NUMBER ordered by balance descending). (Limit to 25 records)."`;
      refSql = `SELECT id, customer_id, balance, ROW_NUMBER() OVER (ORDER BY balance DESC) AS balance_rank FROM accounts WHERE status = 'active' LIMIT 25;`;
      expectedCols = ["id", "customer_id", "balance", "balance_rank"];
      concepts = ["ROW_NUMBER() OVER", "WINDOW FUNCTION"];
    } else {
      title = "Transaction Delta Sequence Analysis using LAG";
      request = `From: ${persona.name} (${persona.role})\n\n"Good morning! Our fraud detection algorithm requires sequence delta tracking. Compute the difference between consecutive transaction amounts using the LAG() window function. Return id, amount, and prev_amount. (Limit to 30 records)."`;
      refSql = `SELECT id, amount, LAG(amount, 1) OVER (ORDER BY id ASC) AS prev_amount FROM transactions LIMIT 30;`;
      expectedCols = ["id", "amount", "prev_amount"];
      concepts = ["LAG() OVER", "WINDOW FUNCTION"];
    }
  } else if (cfg.domain === "hr") {
    if (order % 2 === 0) {
      title = "Department Salary Ranking with RANK()";
      request = `From: ${persona.name} (${persona.role})\n\n"Hi! We are conducting a compensation parity audit within departments. Rank employees by salary within each department using RANK() partitioned by department_id. Return name, department_id, salary, and salary_rank. (Limit to 30 records)."`;
      refSql = `SELECT name, department_id, salary, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS salary_rank FROM employees WHERE status = 'active' ORDER BY department_id, salary_rank LIMIT 30;`;
      expectedCols = ["name", "department_id", "salary", "salary_rank"];
      concepts = ["RANK() OVER (PARTITION BY)", "WINDOW FUNCTION"];
    } else {
      title = "Cumulative Department Payroll with CTE";
      request = `From: ${persona.name} (${persona.role})\n\n"Hello! To analyze payroll burn rate, please build a Common Table Expression (CTE) calculating a cumulative running total of salaries across all active staff. Return employee id, name, salary, and running_payroll. (Limit to 25 records)."`;
      refSql = `WITH payroll_summary AS (
        SELECT id, name, salary, SUM(salary) OVER (ORDER BY id ASC) AS running_payroll
        FROM employees
      )
      SELECT id, name, salary, running_payroll FROM payroll_summary LIMIT 25;`;
      expectedCols = ["id", "name", "salary", "running_payroll"];
      concepts = ["WITH (CTE)", "SUM() OVER", "RUNNING TOTAL"];
    }
  } else if (cfg.domain === "saas") {
    title = "Rank SaaS Accounts by Monthly Recurring Revenue";
    request = `From: ${persona.name} (${persona.role})\n\n"Hey team! For our monthly board report, rank all active subscription accounts by monthly recurring revenue using ROW_NUMBER() in descending order. Return account_id, plan, mrr, and mrr_rank. (Limit to 25 records)."`;
    refSql = `SELECT account_id, plan, mrr, ROW_NUMBER() OVER (ORDER BY mrr DESC) AS mrr_rank FROM subscriptions WHERE status = 'active' LIMIT 25;`;
    expectedCols = ["account_id", "plan", "mrr", "mrr_rank"];
    concepts = ["ROW_NUMBER() OVER", "ANALYTICAL WINDOW"];
  } else if (cfg.domain === "logistics") {
    title = "Freight Consignment Weight Quartiles and Ranks";
    request = `From: ${persona.name} (${persona.role})\n\n"Morning! We are balancing payload stress across our long-haul fleet. Please rank shipments by weight using DENSE_RANK() in descending order. Return shipment id, destination_city, weight_kg, and weight_rank. (Limit to 25 records)."`;
    refSql = `SELECT id, destination_city, weight_kg, DENSE_RANK() OVER (ORDER BY weight_kg DESC) AS weight_rank FROM shipments LIMIT 25;`;
    expectedCols = ["id", "destination_city", "weight_kg", "weight_rank"];
    concepts = ["DENSE_RANK() OVER", "WINDOW FUNCTION"];
  } else {
    // Restaurants
    title = "Menu Item Price Ranking within Categories using RANK()";
    request = `From: ${persona.name} (${persona.role})\n\n"Buon giorno! We are redesigning our à la carte menu pricing. Using a window function, rank menu items by price within each category using RANK() partitioned by category. Return name, category, price, and price_rank."`;
    refSql = `SELECT name, category, price, RANK() OVER (PARTITION BY category ORDER BY price DESC) AS price_rank FROM menu_items ORDER BY category, price_rank;`;
    expectedCols = ["name", "category", "price", "price_rank"];
    concepts = ["RANK() OVER (PARTITION BY)", "WINDOW FUNCTION"];
  }

  return {
    id,
    domain: cfg.domain,
    level: 4,
    order,
    difficulty: order > 50 ? "boss" : "challenging",
    title,
    stakeholder: persona,
    request,
    context_notes: `Implement window functions or Common Table Expressions (WITH). Return columns: ${expectedCols.join(", ")}.`,
    concepts,
    expected_columns: expectedCols,
    reference_sql: refSql,
    validation: { order_sensitive: false, column_names_sensitive: false, numeric_tolerance: 0.01 },
    hints: [
      `Use WITH cte_name AS (...) to structure multi-stage logic.`,
      `Apply OVER (PARTITION BY ... ORDER BY ...) to calculate positional metrics.`,
      `Select the exact expected columns: ${expectedCols.join(", ")}.`,
    ],
    solution_explanation: `Leverages analytical window partitions and CTE staging to perform deep operational ranking.`,
    xp: 40,
    estimated_minutes: 10,
  };
}

// -------------------------------------------------------------
// LEVEL 5: MASTER & EXECUTIVE ANALYTICS
// Multi-CTE Pipelines, Cohort Retention, MoM Growth, NTILE Quartiles
// Tables: all 15 enterprise tables
// -------------------------------------------------------------
function generateL5Question(
  cfg: DomainConfig,
  order: number,
  id: string,
  persona: DomainPersona
): QuestionDefinition {
  let title = `Executive Master Portfolio Analytics — ${cfg.domain}`;
  let request = `From: ${persona.name} (${persona.role})\n\n"Executive Board Inquiry: Calculate quartile distributions and strategic KPIs across our multi-department datasets using NTILE(4). Return id and quartile_tier."`;
  let refSql = `WITH metrics_cte AS (
    SELECT id, NTILE(4) OVER (ORDER BY id ASC) AS quartile_tier FROM ${Object.keys(cfg.tables)[0]}
  )
  SELECT id, quartile_tier FROM metrics_cte LIMIT 25;`;
  let expectedCols = ["id", "quartile_tier"];
  let concepts = ["MULTI-CTE", "NTILE(4)", "EXECUTIVE REPORTING"];

  if (cfg.domain === "healthcare") {
    title = "Hospital Revenue Cycle Quartile Segmentation (NTILE)";
    request = `From: ${persona.name} (${persona.role})\n\n"Executive Board Briefing: We require a strategic stratification of clinical billing charges into 4 equal quartiles (using NTILE(4)) to identify high-acuity patient revenue drivers. Return patient_id, total_charge, and revenue_quartile, sorted by quartile and charge."`;
    refSql = `WITH billing_quartiles AS (
      SELECT patient_id, total_charge, NTILE(4) OVER (ORDER BY total_charge DESC) AS revenue_quartile
      FROM billing
    )
    SELECT patient_id, total_charge, revenue_quartile FROM billing_quartiles ORDER BY revenue_quartile, total_charge DESC LIMIT 30;`;
    expectedCols = ["patient_id", "total_charge", "revenue_quartile"];
    concepts = ["NTILE(4) OVER", "MULTI-STAGE CTE", "REVENUE STRATIFICATION"];
  } else if (cfg.domain === "finance") {
    title = "Wealth Portfolio & Depository Exposure Quartiles";
    request = `From: ${persona.name} (${persona.role})\n\n"Federal Reserve Stress-Test Ingestion: To evaluate capital adequacy, segment customer account balances into 4 risk-exposure quartiles using NTILE(4). Return customer_id, balance, and exposure_quartile, sorted by quartile and balance descending."`;
    refSql = `WITH risk_tiers AS (
      SELECT customer_id, balance, NTILE(4) OVER (ORDER BY balance DESC) AS exposure_quartile
      FROM accounts
      WHERE status = 'active'
    )
    SELECT customer_id, balance, exposure_quartile FROM risk_tiers ORDER BY exposure_quartile, balance DESC LIMIT 30;`;
    expectedCols = ["customer_id", "balance", "exposure_quartile"];
    concepts = ["NTILE(4)", "MULTI-TIER CTE", "CAPITAL ADEQUACY"];
  } else if (cfg.domain === "hr") {
    title = "Executive Compensation Quartile Distribution";
    request = `From: ${persona.name} (${persona.role})\n\n"Executive Equity Review: We need an organizational wage distribution analysis. Segment employee base salaries into 4 wage quartiles using NTILE(4). Return employee name, salary, and compensation_quartile, sorted descending by salary."`;
    refSql = `WITH comp_tiers AS (
      SELECT name, salary, NTILE(4) OVER (ORDER BY salary DESC) AS compensation_quartile
      FROM employees
      WHERE status = 'active'
    )
    SELECT name, salary, compensation_quartile FROM comp_tiers ORDER BY compensation_quartile, salary DESC LIMIT 30;`;
    expectedCols = ["name", "salary", "compensation_quartile"];
    concepts = ["NTILE(4) OVER", "COMPENSATION BENCHMARKING"];
  } else if (cfg.domain === "saas") {
    title = "SaaS Net Revenue Distribution & Tiering (NTILE)";
    request = `From: ${persona.name} (${persona.role})\n\n"Investor Day Presentation: Segment customer MRR into 4 ARR value tiers using NTILE(4) to illustrate our net expansion cohorts. Return account_id, mrr, and arr_tier, sorted by tier and MRR."`;
    refSql = `WITH mrr_cohorts AS (
      SELECT account_id, mrr, NTILE(4) OVER (ORDER BY mrr DESC) AS arr_tier
      FROM subscriptions
      WHERE status = 'active'
    )
    SELECT account_id, mrr, arr_tier FROM mrr_cohorts ORDER BY arr_tier, mrr DESC LIMIT 25;`;
    expectedCols = ["account_id", "mrr", "arr_tier"];
    concepts = ["NTILE(4)", "COHORT SEGMENTATION", "SaaS VALUATION"];
  } else if (cfg.domain === "logistics") {
    title = "Freight Consignment Weight Quartiles (NTILE)";
    request = `From: ${persona.name} (${persona.role})\n\n"Global Fleet Optimization: Segment shipment cargo weights into 4 operational payload tiers using NTILE(4) to guide aircraft and rail container allocation. Return shipment id, weight_kg, and payload_quartile."`;
    refSql = `WITH payload_cohorts AS (
      SELECT id, weight_kg, NTILE(4) OVER (ORDER BY weight_kg DESC) AS payload_quartile
      FROM shipments
    )
    SELECT id, weight_kg, payload_quartile FROM payload_cohorts ORDER BY payload_quartile, weight_kg DESC LIMIT 30;`;
    expectedCols = ["id", "weight_kg", "payload_quartile"];
    concepts = ["NTILE(4)", "LOAD FACTOR OPTIMIZATION"];
  } else if (cfg.domain === "restaurants") {
    title = "Menu Item Profit Margin Quartiles (NTILE)";
    request = `From: ${persona.name} (${persona.role})\n\n"Culinary Engineering Summit: We need an executive matrix segmenting dish profit margins (price - cost) into 4 profitability quartiles using NTILE(4). Return item name, price, cost, and margin_quartile."`;
    refSql = `WITH margin_matrix AS (
      SELECT name, price, cost, NTILE(4) OVER (ORDER BY (price - cost) DESC) AS margin_quartile
      FROM menu_items
    )
    SELECT name, price, cost, margin_quartile FROM margin_matrix ORDER BY margin_quartile LIMIT 25;`;
    expectedCols = ["name", "price", "cost", "margin_quartile"];
    concepts = ["NTILE(4)", "MENU ENGINEERING", "GROSS PROFIT MARGIN"];
  } else {
    // E-Commerce L5
    title = "Customer Lifetime Value (LTV) Quartile Stratification";
    request = `From: ${persona.name} (${persona.role})\n\n"Executive Customer Review: Rank customers into 4 spending quartiles using NTILE(4) based on total order spend. Return customer_id, total_amount, and ltv_quartile, sorted by quartile and spend."`;
    refSql = `WITH customer_spend AS (
      SELECT customer_id, total_amount, NTILE(4) OVER (ORDER BY total_amount DESC) AS ltv_quartile
      FROM orders
    )
    SELECT customer_id, total_amount, ltv_quartile FROM customer_spend ORDER BY ltv_quartile, total_amount DESC LIMIT 30;`;
    expectedCols = ["customer_id", "total_amount", "ltv_quartile"];
    concepts = ["NTILE(4)", "LTV STRATIFICATION", "CUSTOMER COHORT"];
  }

  return {
    id,
    domain: cfg.domain,
    level: 5,
    order,
    difficulty: "boss",
    title,
    stakeholder: persona,
    request,
    context_notes: `Implement advanced statistical and analytical constructs (NTILE, multi-CTE pipelines). Return columns: ${expectedCols.join(", ")}.`,
    concepts,
    expected_columns: expectedCols,
    reference_sql: refSql,
    validation: { order_sensitive: false, column_names_sensitive: false, numeric_tolerance: 0.01 },
    hints: [
      `Use NTILE(4) OVER (ORDER BY ...) to divide sorted rows into 4 quartiles.`,
      `Structure the query inside a WITH cte_name AS (...) block.`,
      `Project the requested columns (${expectedCols.join(", ")}) in the final SELECT.`,
    ],
    solution_explanation: `Applies enterprise statistical windowing to partition business metrics into actionable operational quartiles.`,
    xp: 50,
    estimated_minutes: 15,
  };
}
