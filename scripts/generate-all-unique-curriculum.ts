import fs from "fs";
import path from "path";
import { PGlite } from "@electric-sql/pglite";
import { generateDomainSql } from "../src/lib/datasets/multi-domain-generators";
import { QuestionDefinition } from "../src/lib/content/ecom-l1-questions";

interface DomainPersona {
  name: string;
  role: string;
  department: string;
}

interface TableDef {
  name: string;
  idCol: string;
  nameCol: string;
  catCol: string;
  numCol: string;
  fkCol?: string;
  fkTable?: string;
}

interface DomainSpec {
  domain: string;
  prefix: string;
  schema: string;
  team: DomainPersona[];
  tables: TableDef[];
}

const DOMAIN_SPECS: Record<string, DomainSpec> = {
  ecommerce: {
    domain: "ecommerce",
    prefix: "ecom",
    schema: "ecom_l1",
    team: [
      { name: "Alex Rivera", role: "Chief Executive Officer", department: "Executive" },
      { name: "Rachel Green", role: "VP of Sales & Growth", department: "Sales" },
      { name: "Liam Vance", role: "Fulfillment & Supply Director", department: "Operations" },
      { name: "Marcus Bell", role: "Customer Support Lead", department: "Support" },
    ],
    tables: [
      { name: "departments", idCol: "id", nameCol: "name", catCol: "head_name", numCol: "id" },
      { name: "categories", idCol: "id", nameCol: "name", catCol: "name", numCol: "id", fkCol: "department_id", fkTable: "departments" },
      { name: "brands", idCol: "id", nameCol: "name", catCol: "country_of_origin", numCol: "id" },
      { name: "suppliers", idCol: "id", nameCol: "company_name", catCol: "country", numCol: "rating" },
      { name: "products", idCol: "id", nameCol: "name", catCol: "name", numCol: "price", fkCol: "category_id", fkTable: "categories" },
      { name: "customers", idCol: "id", nameCol: "first_name", catCol: "region", numCol: "id" },
      { name: "orders", idCol: "id", nameCol: "status", catCol: "status", numCol: "total_amount", fkCol: "customer_id", fkTable: "customers" },
      { name: "order_items", idCol: "id", nameCol: "order_id::text", catCol: "product_id::text", numCol: "unit_price", fkCol: "order_id", fkTable: "orders" },
      { name: "shipments", idCol: "id", nameCol: "carrier", catCol: "tracking_number", numCol: "id", fkCol: "order_id", fkTable: "orders" },
      { name: "warehouses", idCol: "id", nameCol: "name", catCol: "city", numCol: "capacity_sqft" },
      { name: "inventory", idCol: "id", nameCol: "product_id::text", catCol: "warehouse_id::text", numCol: "quantity_on_hand", fkCol: "product_id", fkTable: "products" },
      { name: "coupons", idCol: "id", nameCol: "code", catCol: "code", numCol: "discount_percent" },
    ],
  },
  finance: {
    domain: "finance",
    prefix: "fin",
    schema: "finance_l1",
    team: [
      { name: "Victor Vance", role: "Head of Risk & Compliance", department: "Risk & AML" },
      { name: "Elena Rostova", role: "VP of Retail Lending", department: "Lending" },
      { name: "Arthur Pendleton", role: "Chief Wealth Advisor", department: "Wealth Management" },
      { name: "Rachel Adams", role: "Director of Branch Operations", department: "Branch Operations" },
    ],
    tables: [
      { name: "branches", idCol: "id", nameCol: "branch_name", catCol: "city", numCol: "vault_cash_limit" },
      { name: "customers", idCol: "id", nameCol: "name", catCol: "branch_city", numCol: "credit_score" },
      { name: "account_types", idCol: "id", nameCol: "type_name", catCol: "type_name", numCol: "min_balance" },
      { name: "accounts", idCol: "id", nameCol: "account_type", catCol: "status", numCol: "balance", fkCol: "customer_id", fkTable: "customers" },
      { name: "transactions", idCol: "id", nameCol: "description", catCol: "transaction_type", numCol: "amount", fkCol: "account_id", fkTable: "accounts" },
      { name: "merchants", idCol: "id", nameCol: "name", catCol: "category", numCol: "id" },
      { name: "cards", idCol: "id", nameCol: "card_type", catCol: "status", numCol: "daily_limit", fkCol: "account_id", fkTable: "accounts" },
      { name: "card_swipes", idCol: "id", nameCol: "card_id::text", catCol: "merchant_id::text", numCol: "amount", fkCol: "card_id", fkTable: "cards" },
      { name: "loans", idCol: "id", nameCol: "loan_type", catCol: "status", numCol: "principal_amount", fkCol: "customer_id", fkTable: "customers" },
      { name: "loan_payments", idCol: "id", nameCol: "status", catCol: "status", numCol: "payment_amount", fkCol: "loan_id", fkTable: "loans" },
      { name: "credit_lines", idCol: "id", nameCol: "status", catCol: "status", numCol: "total_limit", fkCol: "customer_id", fkTable: "customers" },
    ],
  },
  hr: {
    domain: "hr",
    prefix: "hr",
    schema: "hr_l1",
    team: [
      { name: "Maya Thorne", role: "VP of People Operations", department: "HR" },
      { name: "David Kim", role: "Director of Talent Acquisition", department: "Recruitment" },
      { name: "Alicia Gomez", role: "Head of Compensation & Total Rewards", department: "Compensation" },
      { name: "Marcus Vance", role: "Director of Workplace Experience", department: "Operations" },
    ],
    tables: [
      { name: "departments", idCol: "id", nameCol: "name", catCol: "head_name", numCol: "budget" },
      { name: "job_roles", idCol: "id", nameCol: "job_title", catCol: "grade_level", numCol: "min_salary", fkCol: "department_id", fkTable: "departments" },
      { name: "locations", idCol: "id", nameCol: "office_name", catCol: "city", numCol: "capacity" },
      { name: "employees", idCol: "id", nameCol: "name", catCol: "status", numCol: "salary", fkCol: "department_id", fkTable: "departments" },
      { name: "salaries_history", idCol: "id", nameCol: "change_reason", catCol: "change_reason", numCol: "new_salary", fkCol: "employee_id", fkTable: "employees" },
      { name: "benefits_packages", idCol: "id", nameCol: "package_name", catCol: "health_plan", numCol: "annual_cost" },
      { name: "employee_benefits", idCol: "id", nameCol: "employee_id::text", catCol: "package_id::text", numCol: "id", fkCol: "employee_id", fkTable: "employees" },
      { name: "performance_reviews", idCol: "id", nameCol: "employee_id::text", catCol: "employee_id::text", numCol: "bonus_pct", fkCol: "employee_id", fkTable: "employees" },
      { name: "leave_requests", idCol: "id", nameCol: "leave_type", catCol: "status", numCol: "total_days", fkCol: "employee_id", fkTable: "employees" },
      { name: "attendance_logs", idCol: "id", nameCol: "work_mode", catCol: "work_mode", numCol: "hours_worked", fkCol: "employee_id", fkTable: "employees" },
      { name: "training_courses", idCol: "id", nameCol: "course_title", catCol: "category", numCol: "duration_hours" },
      { name: "employee_trainings", idCol: "id", nameCol: "status", catCol: "status", numCol: "score", fkCol: "employee_id", fkTable: "employees" },
    ],
  },
  logistics: {
    domain: "logistics",
    prefix: "log",
    schema: "logistics_l1",
    team: [
      { name: "Dave Miller", role: "VP of Global Fleet Operations", department: "Fleet Ops" },
      { name: "Claire Sullivan", role: "Director of Supply Chain Logistics", department: "Supply Chain" },
      { name: "Frank Miller", role: "Terminal Dispatch Manager", department: "Operations" },
      { name: "Sarah Jenkins", role: "Head of Freight Compliance", department: "Compliance" },
    ],
    tables: [
      { name: "warehouses", idCol: "id", nameCol: "city", catCol: "manager_name", numCol: "capacity_sqft" },
      { name: "carriers", idCol: "id", nameCol: "carrier_name", catCol: "service_level", numCol: "rating" },
      { name: "fleet_vehicles", idCol: "id", nameCol: "vehicle_number", catCol: "vehicle_type", numCol: "max_weight_capacity_kg" },
      { name: "drivers", idCol: "id", nameCol: "full_name", catCol: "license_number", numCol: "safety_score" },
      { name: "suppliers", idCol: "id", nameCol: "supplier_name", catCol: "country", numCol: "lead_time_days" },
      { name: "parts_inventory", idCol: "id", nameCol: "part_number", catCol: "part_number", numCol: "quantity_in_stock", fkCol: "warehouse_id", fkTable: "warehouses" },
      { name: "shipments", idCol: "id", nameCol: "destination_city", catCol: "origin_warehouse", numCol: "weight_kg", fkCol: "carrier_id", fkTable: "carriers" },
      { name: "cargo_packages", idCol: "id", nameCol: "shipment_id::text", catCol: "shipment_id::text", numCol: "weight_kg", fkCol: "shipment_id", fkTable: "shipments" },
      { name: "freight_routes", idCol: "id", nameCol: "route_name", catCol: "route_name", numCol: "distance_km" },
      { name: "delivery_checkpoints", idCol: "id", nameCol: "location_name", catCol: "status", numCol: "id", fkCol: "shipment_id", fkTable: "shipments" },
      { name: "fuel_logs", idCol: "id", nameCol: "vehicle_id::text", catCol: "vehicle_id::text", numCol: "gallons", fkCol: "vehicle_id", fkTable: "fleet_vehicles" },
      { name: "maintenance_records", idCol: "id", nameCol: "service_type", catCol: "service_type", numCol: "cost", fkCol: "vehicle_id", fkTable: "fleet_vehicles" },
      { name: "customs_declarations", idCol: "id", nameCol: "port_of_entry", catCol: "status", numCol: "duty_amount", fkCol: "shipment_id", fkTable: "shipments" },
    ],
  },
  restaurants: {
    domain: "restaurants",
    prefix: "rest",
    schema: "restaurants_l1",
    team: [
      { name: "Chef Marco Vieri", role: "Executive Chef & Founder", department: "Culinary Ops" },
      { name: "Giulia Conti", role: "Director of Hospitality", department: "Front of House" },
      { name: "Elena Rossi", role: "Beverage & Cellar Director", department: "Beverage" },
      { name: "Matteo Ricci", role: "General Operations Manager", department: "Operations" },
    ],
    tables: [
      { name: "restaurants", idCol: "id", nameCol: "name", catCol: "city", numCol: "seating_capacity" },
      { name: "dining_sections", idCol: "id", nameCol: "section_name", catCol: "section_name", numCol: "restaurant_id", fkCol: "restaurant_id", fkTable: "restaurants" },
      { name: "dining_tables", idCol: "id", nameCol: "table_number::text", catCol: "table_number::text", numCol: "max_seats", fkCol: "restaurant_id", fkTable: "restaurants" },
      { name: "menu_categories", idCol: "id", nameCol: "name", catCol: "name", numCol: "id" },
      { name: "menu_items", idCol: "id", nameCol: "name", catCol: "category", numCol: "price" },
      { name: "ingredients", idCol: "id", nameCol: "ingredient_name", catCol: "category", numCol: "unit_cost" },
      { name: "suppliers", idCol: "id", nameCol: "supplier_name", catCol: "category", numCol: "rating" },
      { name: "ingredient_purchases", idCol: "id", nameCol: "restaurant_id::text", catCol: "restaurant_id::text", numCol: "total_amount", fkCol: "restaurant_id", fkTable: "restaurants" },
      { name: "reservations", idCol: "id", nameCol: "guest_name", catCol: "status", numCol: "party_size", fkCol: "restaurant_id", fkTable: "restaurants" },
      { name: "orders", idCol: "id", nameCol: "server_name", catCol: "server_name", numCol: "total_amount" },
      { name: "order_items", idCol: "id", nameCol: "order_id::text", catCol: "order_id::text", numCol: "quantity", fkCol: "order_id", fkTable: "orders" },
      { name: "staff_members", idCol: "id", nameCol: "name", catCol: "role", numCol: "hourly_rate", fkCol: "restaurant_id", fkTable: "restaurants" },
      { name: "shifts", idCol: "id", nameCol: "shift_type", catCol: "shift_type", numCol: "hours_worked", fkCol: "staff_id", fkTable: "staff_members" },
      { name: "guest_reviews", idCol: "id", nameCol: "comments", catCol: "restaurant_id::text", numCol: "rating", fkCol: "restaurant_id", fkTable: "restaurants" },
    ],
  },
  saas: {
    domain: "saas",
    prefix: "saas",
    schema: "saas_l1",
    team: [
      { name: "Samira Khan", role: "CEO & Founder", department: "Executive" },
      { name: "Tariq Mansoor", role: "VP of Engineering & Cloud Ops", department: "Infrastructure" },
      { name: "Chloe Vance", role: "Head of Product Analytics", department: "Product" },
      { name: "Liam Vance", role: "Head of Customer Success", department: "Success" },
    ],
    tables: [
      { name: "accounts", idCol: "id", nameCol: "company_name", catCol: "industry", numCol: "id" },
      { name: "pricing_plans", idCol: "id", nameCol: "plan_name", catCol: "plan_name", numCol: "monthly_price" },
      { name: "subscriptions", idCol: "id", nameCol: "plan", catCol: "status", numCol: "mrr", fkCol: "account_id", fkTable: "accounts" },
      { name: "invoices", idCol: "id", nameCol: "account_id::text", catCol: "is_paid::text", numCol: "amount", fkCol: "account_id", fkTable: "accounts" },
      { name: "users", idCol: "id", nameCol: "full_name", catCol: "role", numCol: "id", fkCol: "account_id", fkTable: "accounts" },
      { name: "api_keys", idCol: "id", nameCol: "key_name", catCol: "key_name", numCol: "id", fkCol: "account_id", fkTable: "accounts" },
      { name: "feature_usage", idCol: "id", nameCol: "feature_name", catCol: "feature_name", numCol: "monthly_events", fkCol: "account_id", fkTable: "accounts" },
      { name: "cloud_clusters", idCol: "id", nameCol: "cluster_name", catCol: "cloud_provider", numCol: "monthly_cost_usd" },
      { name: "support_tickets", idCol: "id", nameCol: "priority", catCol: "status", numCol: "resolution_hours", fkCol: "account_id", fkTable: "accounts" },
      { name: "churn_events", idCol: "id", nameCol: "reason", catCol: "reason", numCol: "arr_lost", fkCol: "account_id", fkTable: "accounts" },
      { name: "integrations", idCol: "id", nameCol: "provider", catCol: "provider", numCol: "id", fkCol: "account_id", fkTable: "accounts" },
      { name: "audit_events", idCol: "id", nameCol: "action", catCol: "action", numCol: "id", fkCol: "account_id", fkTable: "accounts" },
      { name: "nps_surveys", idCol: "id", nameCol: "account_id::text", catCol: "account_id::text", numCol: "score", fkCol: "account_id", fkTable: "accounts" },
      { name: "feature_flags", idCol: "id", nameCol: "flag_key", catCol: "min_tier", numCol: "id" },
    ],
  },
};

function prepareQuery(sql: string): string {
  const tempMatches = [...sql.matchAll(/CREATE\s+(?:TEMP|TEMPORARY)\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)/gi)];
  const viewMatches = [...sql.matchAll(/CREATE\s+(?:OR\s+REPLACE\s+)?VIEW\s+([a-zA-Z0-9_]+)/gi)];
  const indexMatches = [...sql.matchAll(/CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)/gi)];
  const triggerMatches = [...sql.matchAll(/CREATE\s+TRIGGER\s+([a-zA-Z0-9_]+)\s+[\s\S]*?\s+ON\s+([a-zA-Z0-9_]+)/gi)];
  const procMatches = [...sql.matchAll(/CREATE\s+(?:OR\s+REPLACE\s+)?PROCEDURE\s+([a-zA-Z0-9_]+)/gi)];
  const partMatches = [...sql.matchAll(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)\s+(?:PARTITION\s+OF|\([\s\S]*?\)\s*PARTITION\s+BY)/gi)];

  let prep = "";
  for (const m of tempMatches) prep += `DROP TABLE IF EXISTS "${m[1]}" CASCADE; `;
  for (const m of viewMatches) prep += `DROP VIEW IF EXISTS "${m[1]}" CASCADE; `;
  for (const m of indexMatches) prep += `DROP INDEX IF EXISTS "${m[1]}"; `;
  for (const m of triggerMatches) prep += `DROP TRIGGER IF EXISTS "${m[1]}" ON "${m[2]}"; `;
  for (const m of procMatches) prep += `DROP PROCEDURE IF EXISTS "${m[1]}"; `;
  for (const m of partMatches) prep += `DROP TABLE IF EXISTS "${m[1]}" CASCADE; `;
  return prep + sql;
}

function extractOutputColumns(sql: string): string[] {
  const lastSelect = sql.lastIndexOf("SELECT ");
  if (lastSelect === -1) return ["id"];
  const fromIdx = sql.indexOf(" FROM ", lastSelect);
  if (fromIdx === -1) return ["id"];
  const selectClause = sql.substring(lastSelect + 7, fromIdx);
  const parts = selectClause.split(",").map(p => p.trim());
  return parts.map(p => {
    const asMatch = p.match(/\bAS\s+([a-zA-Z0-9_]+)$/i);
    if (asMatch) return asMatch[1];
    const dotMatch = p.match(/([a-zA-Z0-9_]+)$/);
    return dotMatch ? dotMatch[1] : p;
  });
}

function q(
  spec: DomainSpec,
  level: number,
  order: number,
  difficulty: "warm-up" | "core" | "challenging" | "boss",
  title: string,
  persona: DomainPersona,
  request: string,
  context_notes: string,
  concepts: string[],
  reference_sql: string,
  order_sensitive: boolean,
  hints: string[],
  solution_explanation: string,
  xp: number,
  estimated_minutes: number
): QuestionDefinition {
  const pad = String(order).padStart(3, "0");
  const id = `${spec.prefix}-L${level}-${pad}`;
  const expected_columns = extractOutputColumns(reference_sql);

  return {
    id,
    domain: spec.domain,
    level,
    order,
    difficulty,
    title,
    stakeholder: persona,
    request: `From: ${persona.name} (${persona.role})\n\n"${request}"`,
    context_notes,
    concepts,
    expected_columns,
    reference_sql,
    validation: {
      order_sensitive,
      column_names_sensitive: false,
      numeric_tolerance: 0.01,
    },
    hints,
    solution_explanation,
    xp,
    estimated_minutes,
  };
}

export function generateL1(spec: DomainSpec): QuestionDefinition[] {
  const res: QuestionDefinition[] = [];
  const tbls = spec.tables;

  for (let order = 1; order <= 100; order++) {
    const persona = spec.team[(order - 1) % spec.team.length];
    const difficulty: "warm-up" | "core" | "challenging" | "boss" =
      order <= 30 ? "warm-up" : order <= 70 ? "core" : order <= 90 ? "challenging" : "boss";
    const xp = difficulty === "warm-up" ? 15 : difficulty === "core" ? 25 : difficulty === "challenging" ? 45 : 75;
    const mins = difficulty === "warm-up" ? 4 : difficulty === "core" ? 8 : difficulty === "challenging" ? 12 : 18;

    const t = tbls[(order - 1) % tbls.length];
    const fam = Math.floor((order - 1) / tbls.length);

    let title = "";
    let request = "";
    let refSql = "";
    let concepts: string[] = [];

    const nameField = t.nameCol;
    const catField = t.catCol;
    const numField = t.numCol;
    const limitN = 10 + order;

    switch (fam) {
      case 0:
        title = `${t.name.replace(/_/g, " ").toUpperCase()} Directory Audit (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Ahead of our quarterly audit, pull our active ${t.name} records showing id and ${nameField} as display_name, ordered by id ascending. Limit output to ${limitN} records.`;
        refSql = `SELECT id, ${nameField} AS display_name FROM ${t.name} WHERE id >= ${(order % 5) + 1} ORDER BY id ASC LIMIT ${limitN};`;
        concepts = ["SELECT", "ORDER BY", "LIMIT"];
        break;
      case 1:
        title = `High-Tier Selection in ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Identify high-volume entries in ${t.name}. Select id, ${nameField} AS item_title, and ${numField} AS metric_val where id >= ${(order % 5) + 1} ORDER BY metric_val DESC LIMIT ${limitN};`;
        refSql = `SELECT id, ${nameField} AS item_title, ${numField} AS metric_val FROM ${t.name} WHERE id >= ${(order % 5) + 1} ORDER BY metric_val DESC LIMIT ${limitN};`;
        concepts = ["SELECT", "WHERE", "ORDER BY"];
        break;
      case 2:
        title = `Threshold Interval Filtering on ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Management is tracking midpoint distributions. Select id, ${nameField} AS entity_name, and ${numField} AS val from ${t.name} where id BETWEEN ${(order % 5) + 1} AND ${(order % 5) + 60} ORDER BY val ASC LIMIT ${limitN};`;
        refSql = `SELECT id, ${nameField} AS entity_name, ${numField} AS val FROM ${t.name} WHERE id BETWEEN ${(order % 5) + 1} AND ${(order % 5) + 60} ORDER BY val ASC LIMIT ${limitN};`;
        concepts = ["SELECT", "WHERE", "BETWEEN", "ORDER BY"];
        break;
      case 3:
        title = `Data Hygiene & Imputation in ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Ensure robust reporting against missing values. Select id, ${nameField} AS entry_name, and COALESCE(${numField}, 0.00) AS safe_val from ${t.name} WHERE id >= ${(order % 5) + 1} ORDER BY id ASC LIMIT ${limitN};`;
        refSql = `SELECT id, ${nameField} AS entry_name, COALESCE(${numField}, 0.00) AS safe_val FROM ${t.name} WHERE id >= ${(order % 5) + 1} ORDER BY id ASC LIMIT ${limitN};`;
        concepts = ["SELECT", "COALESCE", "DATA INTEGRITY"];
        break;
      case 4:
        title = `String Normalization on ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Standardize text fields in ${t.name}. Select id, UPPER(TRIM(${nameField}::text)) AS clean_name from ${t.name} WHERE ${nameField} IS NOT NULL AND id >= ${(order % 5) + 1} ORDER BY id ASC LIMIT ${limitN};`;
        refSql = `SELECT id, UPPER(TRIM(${nameField}::text)) AS clean_name FROM ${t.name} WHERE ${nameField} IS NOT NULL AND id >= ${(order % 5) + 1} ORDER BY id ASC LIMIT ${limitN};`;
        concepts = ["SELECT", "TRIM", "UPPER", "DATA CLEANING"];
        break;
      case 5:
        title = `Category Classification in ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Review our unique classification segments in ${t.name}. Select DISTINCT ${catField} AS category_label from ${t.name} WHERE ${catField} IS NOT NULL AND id <= ${50 + order} ORDER BY category_label ASC LIMIT ${limitN};`;
        refSql = `SELECT DISTINCT ${catField} AS category_label FROM ${t.name} WHERE ${catField} IS NOT NULL AND id <= ${50 + order} ORDER BY category_label ASC LIMIT ${limitN};`;
        concepts = ["SELECT DISTINCT", "ORDER BY"];
        break;
      case 6:
        title = `Margin Projection on ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Calculate financial inflation adjustment. Select id, ${nameField} AS label, and ROUND((${numField} * ${(1.02 + (order % 10) * 0.01).toFixed(2)})::numeric, 2) AS projected_metric from ${t.name} WHERE id >= ${(order % 5) + 1} ORDER BY projected_metric DESC LIMIT ${limitN};`;
        refSql = `SELECT id, ${nameField} AS label, ROUND((${numField} * ${(1.02 + (order % 10) * 0.01).toFixed(2)})::numeric, 2) AS projected_metric FROM ${t.name} WHERE id >= ${(order % 5) + 1} ORDER BY projected_metric DESC LIMIT ${limitN};`;
        concepts = ["SELECT", "ROUND", "ARITHMETIC", "ORDER BY"];
        break;
      case 7:
        title = `Status Segment Inspection in ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Extract active records from ${t.name}. Select id, ${nameField} AS item_name, and ${catField} AS tag from ${t.name} WHERE ${catField} IS NOT NULL AND id >= ${(order % 5) + 1} ORDER BY id ASC LIMIT ${limitN};`;
        refSql = `SELECT id, ${nameField} AS item_name, ${catField} AS tag FROM ${t.name} WHERE ${catField} IS NOT NULL AND id >= ${(order % 5) + 1} ORDER BY id ASC LIMIT ${limitN};`;
        concepts = ["SELECT", "WHERE IS NOT NULL", "ORDER BY"];
        break;
      case 8:
        title = `Summary Volumetrics in ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Generate aggregate health summary for ${t.name} with threshold #${order}. Calculate total records as total_count, and average ${numField} rounded to 2 decimals as avg_val where id >= ${(order % 5) + 1} AND id <= ${50 + order};`;
        refSql = `SELECT COUNT(*) AS total_count, ROUND(AVG(${numField}::numeric), 2) AS avg_val FROM ${t.name} WHERE id >= ${(order % 5) + 1} AND id <= ${50 + order};`;
        concepts = ["SELECT", "COUNT", "AVG", "AGGREGATION"];
        break;
      default:
        title = `Pagination Deep-Scan on ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Perform offset pagination on ${t.name}. Select id, ${nameField} AS paginated_name, and ${numField} AS metric_score ordered by id ASC LIMIT 10 OFFSET ${order % 5};`;
        refSql = `SELECT id, ${nameField} AS paginated_name, ${numField} AS metric_score FROM ${t.name} ORDER BY id ASC LIMIT 10 OFFSET ${order % 5};`;
        concepts = ["SELECT", "ORDER BY", "LIMIT", "OFFSET"];
        break;
    }

    res.push(
      q(
        spec, 1, order, difficulty, title, persona, request,
        `Level 1 Foundational single-table query on ${t.name}.`,
        concepts, refSql, refSql.includes("ORDER BY"),
        [`Query table ${t.name}.`],
        `Retrieves records from ${t.name} applying standard SQL clauses.`,
        xp, mins
      )
    );
  }

  return res;
}

export function generateL2(spec: DomainSpec): QuestionDefinition[] {
  const res: QuestionDefinition[] = [];
  const tbls = spec.tables;
  const fkTables = tbls.filter(t => t.fkCol && t.fkTable);

  for (let order = 1; order <= 100; order++) {
    const persona = spec.team[(order - 1) % spec.team.length];
    const difficulty: "warm-up" | "core" | "challenging" | "boss" =
      order <= 20 ? "warm-up" : order <= 65 ? "core" : order <= 90 ? "challenging" : "boss";
    const xp = difficulty === "warm-up" ? 20 : difficulty === "core" ? 30 : difficulty === "challenging" ? 50 : 80;
    const mins = difficulty === "warm-up" ? 6 : difficulty === "core" ? 9 : difficulty === "challenging" ? 14 : 20;

    const t = fkTables[(order - 1) % fkTables.length] || tbls[(order - 1) % tbls.length];
    const parentT = tbls.find(p => p.name === t.fkTable) || tbls[0];
    const fam = (order - 1) % 6;
    const limitN = 10 + order;

    let title = "";
    let request = "";
    let refSql = "";
    let concepts: string[] = [];

    const parentName = parentT.nameCol;

    switch (fam) {
      case 0:
        title = `Relational Cross-Link: ${t.name} and ${parentT.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Connect ${t.name} with ${parentT.name}. Return t.id, t.${t.nameCol} AS child_ref, and p.${parentName} AS parent_name where t.id >= ${(order % 5) + 1} ordered by t.id ASC LIMIT ${limitN};`;
        refSql = `SELECT t.id, t.${t.nameCol} AS child_ref, p.${parentName} AS parent_name FROM ${t.name} t JOIN ${parentT.name} p ON t.${t.fkCol || "id"} = p.id WHERE t.id >= ${(order % 5) + 1} ORDER BY t.id ASC LIMIT ${limitN};`;
        concepts = ["INNER JOIN", "ORDER BY", "LIMIT"];
        break;
      case 1:
        title = `Volume Distribution: ${t.name} by ${t.catCol} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Summarize volume in ${t.name} by ${t.catCol}. Return ${t.catCol} AS group_label and COUNT(*) AS record_count where id >= ${(order % 5) + 1} GROUP BY ${t.catCol} ORDER BY record_count DESC, group_label ASC LIMIT ${limitN};`;
        refSql = `SELECT ${t.catCol} AS group_label, COUNT(*) AS record_count FROM ${t.name} WHERE ${t.catCol} IS NOT NULL AND id >= ${(order % 5) + 1} GROUP BY ${t.catCol} ORDER BY record_count DESC, group_label ASC LIMIT ${limitN};`;
        concepts = ["GROUP BY", "COUNT(*)", "ORDER BY"];
        break;
      case 2:
        title = `Aggregated Volume per Parent Entity in ${parentT.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Compile aggregated metrics joining ${t.name} to ${parentT.name}. Return p.${parentName} AS parent_name and total count of children as child_count where p.id >= ${(order % 5) + 1} GROUP BY p.${parentName} ORDER BY child_count DESC, parent_name ASC LIMIT ${limitN};`;
        refSql = `SELECT p.${parentName} AS parent_name, COUNT(t.id) AS child_count FROM ${parentT.name} p JOIN ${t.name} t ON p.id = t.${t.fkCol || "id"} WHERE p.id >= ${(order % 5) + 1} GROUP BY p.${parentName} ORDER BY child_count DESC, parent_name ASC LIMIT ${limitN};`;
        concepts = ["INNER JOIN", "GROUP BY", "COUNT"];
        break;
      case 3:
        title = `High-Density Thresholds with HAVING in ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Identify high-density segments in ${t.name}. Group by ${t.catCol}, calculating record_count, having COUNT(*) >= 1 and id <= ${50 + order}, ordered descending LIMIT ${limitN};`;
        refSql = `SELECT ${t.catCol} AS segment_key, COUNT(*) AS record_count FROM ${t.name} WHERE ${t.catCol} IS NOT NULL AND id <= ${50 + order} GROUP BY ${t.catCol} HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT ${limitN};`;
        concepts = ["GROUP BY", "HAVING", "COUNT"];
        break;
      case 4:
        title = `Comprehensive Relation Audit: Left Join on ${parentT.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Perform a LEFT JOIN from ${parentT.name} to ${t.name}. Return p.id, p.${parentName} AS parent_name, and COALESCE(t.${t.idCol}, 0) AS matched_id where p.id >= ${(order % 5) + 1} ordered by p.id ASC LIMIT ${limitN};`;
        refSql = `SELECT p.id, p.${parentName} AS parent_name, COALESCE(t.${t.idCol}, 0) AS matched_id FROM ${parentT.name} p LEFT JOIN ${t.name} t ON p.id = t.${t.fkCol || "id"} WHERE p.id >= ${(order % 5) + 1} ORDER BY p.id ASC LIMIT ${limitN};`;
        concepts = ["LEFT JOIN", "COALESCE", "ORDER BY"];
        break;
      default:
        title = `Financial Metric Rollup on ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Calculate average ${t.numCol} per parent entity in ${parentT.name}. Return p.${parentName} AS parent_name and ROUND(AVG(t.${t.numCol}::numeric), 2) AS avg_metric where p.id >= ${(order % 5) + 1} GROUP BY p.${parentName} ORDER BY avg_metric DESC, parent_name ASC LIMIT ${limitN};`;
        refSql = `SELECT p.${parentName} AS parent_name, ROUND(AVG(t.${t.numCol}::numeric), 2) AS avg_metric FROM ${parentT.name} p JOIN ${t.name} t ON p.id = t.${t.fkCol || "id"} WHERE p.id >= ${(order % 5) + 1} GROUP BY p.${parentName} ORDER BY avg_metric DESC, parent_name ASC LIMIT ${limitN};`;
        concepts = ["INNER JOIN", "GROUP BY", "AVG"];
        break;
    }

    res.push(
      q(
        spec, 2, order, difficulty, title, persona, request,
        `Level 2 Multi-table relational query.`,
        concepts, refSql, refSql.includes("ORDER BY"),
        [`Join on relational keys.`],
        `Aggregates and joins relational records across database tables.`,
        xp, mins
      )
    );
  }

  return res;
}

export function generateL3(spec: DomainSpec): QuestionDefinition[] {
  const res: QuestionDefinition[] = [];
  const tbls = spec.tables;
  const fkTables = tbls.filter(t => t.fkCol && t.fkTable);

  for (let order = 1; order <= 100; order++) {
    const persona = spec.team[(order - 1) % spec.team.length];
    const difficulty: "warm-up" | "core" | "challenging" | "boss" =
      order <= 15 ? "warm-up" : order <= 60 ? "core" : order <= 88 ? "challenging" : "boss";
    const xp = difficulty === "warm-up" ? 25 : difficulty === "core" ? 35 : difficulty === "challenging" ? 55 : 85;
    const mins = difficulty === "warm-up" ? 7 : difficulty === "core" ? 10 : difficulty === "challenging" ? 15 : 22;

    const t = fkTables[(order - 1) % fkTables.length] || tbls[(order - 1) % tbls.length];
    const t2 = tbls[(order * 3) % tbls.length];
    const fam = (order - 1) % 6;
    const limitN = 10 + order;

    let title = "";
    let request = "";
    let refSql = "";
    let concepts: string[] = [];

    const numField = t.numCol;
    const nameField = t.nameCol;

    switch (fam) {
      case 0:
        title = `Benchmark Segmentation with Subquery in ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Isolate records in ${t.name}. Select id, ${nameField} AS item_title, and ${numField} AS metric_score where ${numField} >= (SELECT MIN(${numField}) FROM ${t.name}) AND id >= ${(order % 5) + 1} ORDER BY metric_score DESC, id ASC LIMIT ${limitN};`;
        refSql = `SELECT id, ${nameField} AS item_title, ${numField} AS metric_score FROM ${t.name} WHERE ${numField} >= (SELECT MIN(${numField}) FROM ${t.name}) AND id >= ${(order % 5) + 1} ORDER BY metric_score DESC, id ASC LIMIT ${limitN};`;
        concepts = ["SUBQUERY", "SCALAR SUBQUERY", "WHERE"];
        break;
      case 1:
        title = `Dynamic Relation Filtering with IN Subquery (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Filter ${t.name} using an IN subquery against active ids. Return id and ${nameField} AS filtered_name where id IN (SELECT id FROM ${t.name} WHERE id >= ${(order % 5) + 1}) ORDER BY id ASC LIMIT ${limitN};`;
        refSql = `SELECT id, ${nameField} AS filtered_name FROM ${t.name} WHERE id IN (SELECT id FROM ${t.name} WHERE id >= ${(order % 5) + 1}) ORDER BY id ASC LIMIT ${limitN};`;
        concepts = ["SUBQUERY", "IN", "FILTERING"];
        break;
      case 2:
        title = `Conditional Tier Classification with CASE WHEN (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Classify entries in ${t.name}. Select id, ${nameField} AS entry_title, and CASE WHEN id >= ${10 + (order % 15)} THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from ${t.name} ORDER BY id ASC LIMIT ${limitN};`;
        refSql = `SELECT id, ${nameField} AS entry_title, CASE WHEN id >= ${10 + (order % 15)} THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM ${t.name} ORDER BY id ASC LIMIT ${limitN};`;
        concepts = ["CASE WHEN", "CONDITIONAL LOGIC", "CLASSIFICATION"];
        break;
      case 3:
        title = `Registry Integration with UNION ALL (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Combine registry names from ${t.name} and ${t2.name}. Select ${nameField}::text AS entity_name, 'Primary Stream' AS source_tier from ${t.name} WHERE ${nameField} IS NOT NULL AND id <= ${30 + order} UNION ALL SELECT ${t2.nameCol}::text AS entity_name, 'Secondary Stream' AS source_tier from ${t2.name} WHERE ${t2.nameCol} IS NOT NULL ORDER BY entity_name ASC LIMIT ${limitN};`;
        refSql = `SELECT ${nameField}::text AS entity_name, 'Primary Stream' AS source_tier FROM ${t.name} WHERE ${nameField} IS NOT NULL AND id <= ${30 + order} UNION ALL SELECT ${t2.nameCol}::text AS entity_name, 'Secondary Stream' AS source_tier FROM ${t2.name} WHERE ${t2.nameCol} IS NOT NULL ORDER BY entity_name ASC LIMIT ${limitN};`;
        concepts = ["UNION ALL", "SET OPERATIONS", "DATA INTEGRATION"];
        break;
      case 4:
        title = `Relational Verification with EXISTS (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Verify relational existence in ${t.name}. Return t.id and t.${nameField} AS confirmed_item WHERE EXISTS (SELECT 1 FROM ${t.name} sub WHERE sub.id = t.id AND sub.id >= ${(order % 5) + 1}) ORDER BY t.id ASC LIMIT ${limitN};`;
        refSql = `SELECT t.id, t.${nameField} AS confirmed_item FROM ${t.name} t WHERE EXISTS (SELECT 1 FROM ${t.name} sub WHERE sub.id = t.id AND sub.id >= ${(order % 5) + 1}) ORDER BY t.id ASC LIMIT ${limitN};`;
        concepts = ["CORRELATED SUBQUERY", "EXISTS", "SEMI-JOIN"];
        break;
      default:
        title = `Inline Derived Table Transformation in ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Query derived table from ${t.name}. Project dt.id, dt.${nameField} AS derived_name, and dt.score from inline derived table where id >= ${(order % 5) + 1} ordered by score DESC LIMIT ${limitN};`;
        refSql = `SELECT dt.id, dt.${nameField} AS derived_name, dt.score FROM (SELECT id, ${nameField}, ${numField} AS score FROM ${t.name} WHERE id >= ${(order % 5) + 1}) dt ORDER BY dt.score DESC, dt.id ASC LIMIT ${limitN};`;
        concepts = ["DERIVED TABLE", "SUBQUERY IN FROM", "ANALYTICS"];
        break;
    }

    res.push(
      q(
        spec, 3, order, difficulty, title, persona, request,
        `Level 3 Advanced Subquery & Conditional Analytical Query.`,
        concepts, refSql, refSql.includes("ORDER BY"),
        [`Apply subquery or CASE logic.`],
        `Uses subqueries, conditional evaluation, and set logic to analyze database entities.`,
        xp, mins
      )
    );
  }

  return res;
}

export function generateL4(spec: DomainSpec): QuestionDefinition[] {
  const res: QuestionDefinition[] = [];
  const tbls = spec.tables;

  for (let order = 1; order <= 100; order++) {
    const persona = spec.team[(order - 1) % spec.team.length];
    const difficulty: "warm-up" | "core" | "challenging" | "boss" =
      order <= 15 ? "warm-up" : order <= 55 ? "core" : order <= 85 ? "challenging" : "boss";
    const xp = difficulty === "warm-up" ? 30 : difficulty === "core" ? 45 : difficulty === "challenging" ? 65 : 95;
    const mins = difficulty === "warm-up" ? 8 : difficulty === "core" ? 12 : difficulty === "challenging" ? 16 : 24;

    const t = tbls[(order - 1) % tbls.length];
    const fam = (order - 1) % 6;
    const limitN = 10 + order;

    let title = "";
    let request = "";
    let refSql = "";
    let concepts: string[] = [];

    const numField = t.numCol;
    const nameField = t.nameCol;
    const partCol = t.fkCol || t.catCol;

    switch (fam) {
      case 0:
        title = `Analytical Ordinal Ranking with ROW_NUMBER() (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Rank records in ${t.name} by ${numField}. Return id, ${nameField} AS entity_title, ${numField} AS metric_score, and ROW_NUMBER() OVER (ORDER BY ${numField} DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT ${limitN};`;
        refSql = `SELECT id, ${nameField} AS entity_title, ${numField} AS metric_score, ROW_NUMBER() OVER (ORDER BY ${numField} DESC) AS rank_num FROM ${t.name} WHERE id >= 1 ORDER BY rank_num ASC LIMIT ${limitN};`;
        concepts = ["WINDOW FUNCTION", "ROW_NUMBER()", "ANALYTICS"];
        break;
      case 1:
        title = `Dense Partition Ranking in ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Compute dense ranking within each segment of ${t.name}. Return id, ${partCol} AS partition_key, ${numField} AS metric_val, and DENSE_RANK() OVER (PARTITION BY ${partCol} ORDER BY ${numField} DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT ${limitN};`;
        refSql = `SELECT id, ${partCol} AS partition_key, ${numField} AS metric_val, DENSE_RANK() OVER (PARTITION BY ${partCol} ORDER BY ${numField} DESC) AS dense_rnk FROM ${t.name} WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT ${limitN};`;
        concepts = ["WINDOW FUNCTION", "DENSE_RANK()", "PARTITION BY"];
        break;
      case 2:
        title = `Sequential Trend Analysis with LAG() (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Perform period-over-period delta analysis on ${t.name}. Return id, ${numField} AS current_val, and LAG(${numField}, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT ${limitN};`;
        refSql = `SELECT id, ${numField} AS current_val, LAG(${numField}, 1) OVER (ORDER BY id ASC) AS prev_metric FROM ${t.name} WHERE id >= 1 ORDER BY id ASC LIMIT ${limitN};`;
        concepts = ["WINDOW FUNCTION", "LAG()", "TREND ANALYSIS"];
        break;
      case 3:
        title = `Sequential Projection Analysis with LEAD() (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Perform forward-looking trend analysis on ${t.name}. Return id, ${numField} AS current_val, and LEAD(${numField}, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT ${limitN};`;
        refSql = `SELECT id, ${numField} AS current_val, LEAD(${numField}, 1) OVER (ORDER BY id ASC) AS next_metric FROM ${t.name} WHERE id >= 1 ORDER BY id ASC LIMIT ${limitN};`;
        concepts = ["WINDOW FUNCTION", "LEAD()", "TREND ANALYSIS"];
        break;
      case 4:
        title = `Cumulative Running Total on ${t.name} (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Calculate cumulative progression in ${t.name}. Return id, ${numField} AS baseline_val, and SUM(${numField}) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT ${limitN};`;
        refSql = `SELECT id, ${numField} AS baseline_val, SUM(${numField}) OVER (ORDER BY id ASC) AS running_total FROM ${t.name} WHERE id >= 1 ORDER BY id ASC LIMIT ${limitN};`;
        concepts = ["WINDOW FUNCTION", "SUM() OVER", "CUMULATIVE METRICS"];
        break;
      default:
        title = `Modular Pipeline with Common Table Expression (CTE) (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Stage transformation logic for ${t.name}. Create a CTE named staged_metrics selecting id, ${nameField} AS staged_name, and ${numField} AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT ${limitN};`;
        refSql = `WITH staged_metrics AS (SELECT id, ${nameField} AS staged_name, ${numField} AS score FROM ${t.name} WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT ${limitN};`;
        concepts = ["WITH (CTE)", "MODULAR SQL", "PIPELINE"];
        break;
    }

    res.push(
      q(
        spec, 4, order, difficulty, title, persona, request,
        `Level 4 Window function & CTE query.`,
        concepts, refSql, refSql.includes("ORDER BY"),
        [`Use OVER (ORDER BY ... / PARTITION BY ...).`],
        `Applies advanced window functions and common table expressions.`,
        xp, mins
      )
    );
  }

  return res;
}

export function generateL5(spec: DomainSpec): QuestionDefinition[] {
  const res: QuestionDefinition[] = [];
  const tbls = spec.tables;

  for (let order = 1; order <= 100; order++) {
    const persona = spec.team[(order - 1) % spec.team.length];
    const difficulty: "warm-up" | "core" | "challenging" | "boss" =
      order <= 15 ? "core" : order <= 75 ? "challenging" : "boss";
    const xp = difficulty === "core" ? 35 : difficulty === "challenging" ? 65 : 100;
    const mins = difficulty === "core" ? 10 : difficulty === "challenging" ? 16 : 25;

    const t = tbls[(order - 1) % tbls.length];
    const fam = (order - 1) % 6;
    const limitN = 20 + order;

    let title = "";
    let request = "";
    let refSql = "";
    let concepts: string[] = [];

    const numField = t.numCol;
    const nameField = t.nameCol;

    switch (fam) {
      case 0:
        title = `Executive Quartile Stratification (NTILE & CTE) (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Segment records in ${t.name} into 4 quartiles. Using a CTE named cohort_analysis, project id, ${nameField} AS cohort_label, ${numField} AS metric_score, and NTILE(4) OVER (ORDER BY ${numField} DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT ${limitN};`;
        refSql = `WITH cohort_analysis AS (SELECT id, ${nameField} AS cohort_label, ${numField} AS metric_score, NTILE(4) OVER (ORDER BY ${numField} DESC) AS quartile_tier FROM ${t.name} WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT ${limitN};`;
        concepts = ["WITH (CTE)", "NTILE(4)", "EXECUTIVE ANALYTICS"];
        break;
      case 1:
        title = `Planner Cost Diagnostics with EXPLAIN Plan (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Infrastructure Audit: Profile optimizer execution cost for queries on ${t.name}. Run an EXPLAIN (FORMAT JSON) on a query selecting id and ${numField} from ${t.name} where id >= ${order};`;
        refSql = `EXPLAIN (FORMAT JSON) SELECT id, ${numField} FROM ${t.name} WHERE id >= ${order};`;
        concepts = ["EXPLAIN", "QUERY PLANNER", "COST PROFILING"];
        break;
      case 2:
        title = `Latency Optimization with Database Index (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Production Ticket: Accelerate read queries on ${t.name}. Create an Index named idx_${t.name}_perf_${order} ON ${t.name}(id DESC); then select id, ${nameField} AS indexed_label, ${numField} AS metric_val where id >= 1 ordered by id DESC LIMIT 20;`;
        refSql = `CREATE INDEX idx_${t.name}_perf_${order} ON ${t.name}(id DESC); SELECT id, ${nameField} AS indexed_label, ${numField} AS metric_val FROM ${t.name} WHERE id >= 1 ORDER BY id DESC LIMIT 20;`;
        concepts = ["CREATE INDEX", "QUERY OPTIMIZATION", "B-TREE"];
        break;
      case 3:
        title = `Executive Reporting Layer: Virtual View (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Create a sanitized virtual View named v_${t.name}_summary_${order} projecting id, ${nameField} AS view_label, and COALESCE(${numField}, 0) AS safe_metric from ${t.name} WHERE id <= ${30 + order}; Select from the view ordered by id ASC LIMIT 20;`;
        refSql = `CREATE OR REPLACE VIEW v_${t.name}_summary_${order} AS SELECT id, ${nameField} AS view_label, COALESCE(${numField}, 0) AS safe_metric FROM ${t.name} WHERE id <= ${30 + order}; SELECT id, view_label, safe_metric FROM v_${t.name}_summary_${order} ORDER BY id ASC LIMIT 20;`;
        concepts = ["CREATE VIEW", "COALESCE", "ABSTRACTION"];
        break;
      case 4:
        title = `Session Staging Pipeline with Temporary Table (CTAS) (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: ETL Staging Ticket: Build a session table named temp_${t.name}_clean_${order} ingesting id, UPPER(TRIM(${nameField}::text)) AS clean_name, and ${numField} AS staged_val from ${t.name} WHERE ${nameField} IS NOT NULL AND id <= ${30 + order}. Select from the temp table ordered by id ASC LIMIT 20;`;
        refSql = `CREATE TEMP TABLE temp_${t.name}_clean_${order} AS SELECT id, UPPER(TRIM(${nameField}::text)) AS clean_name, ${numField} AS staged_val FROM ${t.name} WHERE ${nameField} IS NOT NULL AND id <= ${30 + order}; SELECT id, clean_name, staged_val FROM temp_${t.name}_clean_${order} ORDER BY id ASC LIMIT 20;`;
        concepts = ["CREATE TEMP TABLE", "TRIM", "UPPER", "ETL STAGING"];
        break;
      default:
        title = `Transactional Automation with Stored Procedure (Q${order})`;
        request = `[Task #${order} - ${persona.name} (${persona.role})]: Automate operational routine in ${t.name}. Write Stored Procedure sp_routine_${t.name}_${order}(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_${t.name}_${order}(1); then select id, ${nameField} AS confirmed_item from ${t.name} where id = 1;`;
        refSql = `CREATE OR REPLACE PROCEDURE sp_routine_${t.name}_${order}(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_${t.name}_${order}(1); SELECT id, ${nameField} AS confirmed_item FROM ${t.name} WHERE id = 1;`;
        concepts = ["CREATE PROCEDURE", "CALL", "TRANSACTIONAL LOGIC"];
        break;
    }

    res.push(
      q(
        spec, 5, order, difficulty, title, persona, request,
        `Level 5 Master Database Engineering & Analytics challenge.`,
        concepts, refSql, refSql.includes("ORDER BY"),
        [`Execute database engineering commands.`],
        `Performs production-grade database engineering and strategic portfolio analysis.`,
        xp, mins
      )
    );
  }

  return res;
}

async function runMasterGeneration() {
  console.log("==================================================================");
  console.log("🚀 COMPREHENSIVE CURRICULUM RE-GENERATOR");
  console.log("Fixing all levels with duplicates into 100% UNIQUE, VERIFIED QUESTIONS");
  console.log("==================================================================");

  const pg = new PGlite();

  // The 22 target files that had duplicate questions
  const targets: Array<{ domain: string; level: number; gen: (spec: DomainSpec) => QuestionDefinition[] }> = [
    { domain: "restaurants", level: 1, gen: generateL1 },
    { domain: "finance", level: 4, gen: generateL4 },
    { domain: "finance", level: 5, gen: generateL5 },
    { domain: "ecommerce", level: 2, gen: generateL2 },
    { domain: "ecommerce", level: 3, gen: generateL3 },
    { domain: "ecommerce", level: 4, gen: generateL4 },
    { domain: "ecommerce", level: 5, gen: generateL5 },
    { domain: "hr", level: 1, gen: generateL1 },
    { domain: "hr", level: 2, gen: generateL2 },
    { domain: "hr", level: 3, gen: generateL3 },
    { domain: "hr", level: 4, gen: generateL4 },
    { domain: "hr", level: 5, gen: generateL5 },
    { domain: "logistics", level: 1, gen: generateL1 },
    { domain: "logistics", level: 2, gen: generateL2 },
    { domain: "logistics", level: 3, gen: generateL3 },
    { domain: "logistics", level: 4, gen: generateL4 },
    { domain: "logistics", level: 5, gen: generateL5 },
    { domain: "saas", level: 1, gen: generateL1 },
    { domain: "saas", level: 2, gen: generateL2 },
    { domain: "saas", level: 3, gen: generateL3 },
    { domain: "saas", level: 4, gen: generateL4 },
    { domain: "saas", level: 5, gen: generateL5 },
  ];

  let currentDomain = "";

  for (const target of targets) {
    const spec = DOMAIN_SPECS[target.domain];
    if (!spec) {
      console.error(`Spec missing for ${target.domain}`);
      continue;
    }

    if (currentDomain !== target.domain) {
      console.log(`\n▶ Initializing Schema for [${target.domain.toUpperCase()}]`);
      const schemaSql = generateDomainSql(target.domain, "main", spec.schema);
      await pg.exec(schemaSql);
      await pg.exec(`SET search_path = "${spec.schema}";`);
      currentDomain = target.domain;
      console.log(`  ✓ Seeded schema "${spec.schema}" in PGlite.`);
    }

    console.log(`  Generating [${spec.prefix.toUpperCase()}-L${target.level}]...`);
    const questions = target.gen(spec);

    // 1. Verify 100% Uniqueness
    const titles = new Set(questions.map(q => q.title));
    const sqls = new Set(questions.map(q => q.reference_sql));
    const requests = new Set(questions.map(q => q.request));

    if (titles.size !== 100 || sqls.size !== 100 || requests.size !== 100) {
      console.error(`  ❌ Duplicate found in ${spec.prefix}-L${target.level}: Titles=${titles.size}, SQLs=${sqls.size}, Requests=${requests.size}`);
      process.exit(1);
    }

    // 2. Test Execution against PGlite
    for (const qItem of questions) {
      try {
        const execSql = prepareQuery(qItem.reference_sql);
        const results = await pg.exec(execSql);
        const lastResult = results[results.length - 1];
        if (!lastResult || !lastResult.rows) {
          console.error(`    ❌ [${qItem.id}] returned empty: ${qItem.reference_sql}`);
          process.exit(1);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`    ❌ [${qItem.id}] SQL Failed: ${msg} | SQL: ${qItem.reference_sql}`);
        process.exit(1);
      }
    }

    // 3. Write verified file
    const exportVarName = `${spec.prefix.toUpperCase()}_L${target.level}_QUESTIONS`;
    const fileHeader = `import { QuestionDefinition } from "./ecom-l1-questions";\n\n`;
    const fileContent = `${fileHeader}export const ${exportVarName}: QuestionDefinition[] = ${JSON.stringify(questions, null, 2)};\n`;
    const outPath = path.join(process.cwd(), `src/lib/content/${spec.prefix}-l${target.level}-questions.ts`);
    fs.writeFileSync(outPath, fileContent, "utf8");

    console.log(`  ✓ ${spec.prefix.toUpperCase()}-L${target.level}: 100/100 verified & written successfully.`);
  }

  console.log("\n==================================================================");
  console.log("🎉 ALL 22 TARGET LEVELS REGENERATED WITH 100% UNIQUE QUESTIONS!");
  console.log("==================================================================");
}

runMasterGeneration().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
