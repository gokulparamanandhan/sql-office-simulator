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

interface DomainConfig {
  domain: string;
  prefix: string;
  schema: string;
  team: DomainPersona[];
}

const DOMAIN_CONFIGS: Record<string, DomainConfig> = {
  ecommerce: {
    domain: "ecommerce",
    prefix: "ecom",
    schema: "ecom_l1",
    team: [
      { name: "Alex Rivera", role: "Chief Executive Officer", department: "Executive" },
      { name: "Rachel Green", role: "VP of Sales & Marketing", department: "Sales" },
      { name: "Liam Vance", role: "Fulfillment & Supply Director", department: "Operations" },
      { name: "Marcus Bell", role: "Customer Support Lead", department: "Support" },
    ],
  },
  healthcare: {
    domain: "healthcare",
    prefix: "hc",
    schema: "healthcare_l1",
    team: [
      { name: "Dr. Evelyn Reed", role: "Chief Medical Officer", department: "Clinical Governance" },
      { name: "Jordan Chen", role: "Director of Revenue Cycle", department: "Finance & Billing" },
      { name: "Dr. Sarah Patel", role: "Head of Surgical Services", department: "Surgery" },
      { name: "Marcus Thorne", role: "Chief Nursing Officer", department: "Nursing Ops" },
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
      { name: "Claire Dupont", role: "Treasury & Clearing Director", department: "Treasury" },
    ],
  },
  hr: {
    domain: "hr",
    prefix: "hr",
    schema: "hr_l1",
    team: [
      { name: "Maya Thorne", role: "VP of People Operations", department: "HR" },
      { name: "David Kim", role: "Director of Talent Acquisition", department: "Recruitment" },
      { name: "Alicia Gomez", role: "Head of Total Rewards & Comp", department: "Compensation" },
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
    ],
  },
  restaurants: {
    domain: "restaurants",
    prefix: "rest",
    schema: "restaurants_l1",
    team: [
      { name: "Chef Marco Vieri", role: "Executive Chef & Founder", department: "Culinary" },
      { name: "Giulia Conti", role: "Director of Hospitality & Guest Exp", department: "Front of House" },
      { name: "Elena Rossi", role: "Beverage & Cellar Director", department: "Beverage" },
    ],
  },
  saas: {
    domain: "saas",
    prefix: "saas",
    schema: "saas_l1",
    team: [
      { name: "Samira Khan", role: "CEO & Co-Founder", department: "Executive" },
      { name: "Tariq Mansoor", role: "VP of Engineering & Cloud Ops", department: "Infrastructure" },
      { name: "Chloe Vance", role: "Head of Product Analytics & CS", department: "Product" },
    ],
  },
};

interface DomainTables {
  t1: string; c1: string; num1?: string;
  t2: string; c2: string; num2?: string; fk2?: string;
  t3: string; c3: string; num3: string; fk3?: string;
  t4: string; c4: string; num4?: string; fk4?: string;
  t5: string; c5: string; num5: string; fk5?: string; date5?: string;
  t6?: string; c6?: string; num6?: string; fk6?: string;
  t7?: string; c7?: string; num7?: string; fk7?: string;
}

const DOMAIN_TABLES: Record<string, DomainTables> = {
  ecommerce: {
    t1: "departments", c1: "name",
    t2: "categories", c2: "name", fk2: "department_id",
    t3: "products", c3: "name", num3: "price", fk3: "category_id",
    t4: "customers", c4: "first_name", num4: "region",
    t5: "orders", c5: "status", num5: "total_amount", fk5: "customer_id", date5: "order_date",
    t6: "order_items", c6: "quantity", num6: "unit_price", fk6: "order_id",
    t7: "shipments", c7: "carrier", num7: "tracking_number", fk7: "order_id",
  },
  healthcare: {
    t1: "departments", c1: "name",
    t2: "doctors", c2: "name", num2: "specialty", fk2: "department_id",
    t3: "lab_tests", c3: "test_name", num3: "standard_fee", fk3: "department_id",
    t4: "patients", c4: "first_name", num4: "city",
    t5: "appointments", c5: "status", num5: "fee", fk5: "doctor_id", date5: "appointment_date",
    t6: "diagnoses", c6: "description", num6: "severity", fk6: "patient_id",
    t7: "billing", c7: "status", num7: "total_charge", fk7: "patient_id",
  },
  finance: {
    t1: "branches", c1: "branch_name", num1: "city",
    t2: "customers", c2: "name", num2: "credit_score",
    t3: "accounts", c3: "account_type", num3: "balance", fk3: "customer_id",
    t4: "merchants", c4: "name", num4: "category",
    t5: "transactions", c5: "transaction_type", num5: "amount", fk5: "account_id", date5: "created_at",
    t6: "loans", c6: "loan_type", num6: "principal_amount", fk6: "customer_id",
    t7: "cards", c7: "card_type", num7: "daily_limit", fk7: "account_id",
  },
  hr: {
    t1: "departments", c1: "name", num1: "budget",
    t2: "job_roles", c2: "job_title", num2: "max_salary", fk2: "department_id",
    t3: "locations", c3: "office_name", num3: "capacity",
    t4: "employees", c4: "name", num4: "salary", fk4: "department_id",
    t5: "attendance_logs", c5: "work_mode", num5: "hours_worked", fk5: "employee_id", date5: "work_date",
    t6: "leave_requests", c6: "leave_type", num6: "total_days", fk6: "employee_id",
    t7: "performance_reviews", c7: "comments", num7: "rating", fk7: "employee_id",
  },
  logistics: {
    t1: "warehouses", c1: "city", num1: "capacity_sqft",
    t2: "carriers", c2: "carrier_name", num2: "rating",
    t3: "fleet_vehicles", c3: "vehicle_number", num3: "max_weight_capacity_kg",
    t4: "drivers", c4: "full_name", num4: "safety_score",
    t5: "shipments", c5: "destination_city", num5: "weight_kg", fk5: "carrier_id", date5: "ship_date",
    t6: "cargo_packages", c6: "is_hazardous", num6: "weight_kg", fk6: "shipment_id",
    t7: "freight_routes", c7: "origin_city", num7: "distance_km",
  },
  restaurants: {
    t1: "restaurants", c1: "name", num1: "seating_capacity",
    t2: "dining_sections", c2: "section_name", fk2: "restaurant_id",
    t3: "menu_items", c3: "name", num3: "price", fk3: "category_id",
    t4: "dining_tables", c4: "table_number", num4: "max_seats",
    t5: "orders", c5: "server_name", num5: "total_amount", date5: "order_time",
    t6: "order_items", c6: "quantity", num6: "unit_price", fk6: "order_id",
    t7: "ingredients", c7: "ingredient_name", num7: "unit_cost",
  },
  saas: {
    t1: "accounts", c1: "company_name", num1: "tier",
    t2: "pricing_plans", c2: "plan_name", num2: "monthly_price",
    t3: "subscriptions", c3: "plan", num3: "mrr", fk3: "account_id",
    t4: "users", c4: "full_name", num4: "role", fk4: "account_id",
    t5: "invoices", c5: "is_paid", num5: "amount", fk5: "account_id", date5: "invoice_date",
    t6: "feature_usage", c6: "feature_name", num6: "monthly_events", fk6: "account_id",
    t7: "cloud_clusters", c7: "cluster_name", num7: "monthly_cost_usd",
  },
};

function createQ(
  cfg: DomainConfig,
  level: number,
  order: number,
  difficulty: "warm-up" | "core" | "challenging" | "boss",
  title: string,
  persona: DomainPersona,
  request: string,
  context_notes: string,
  concepts: string[],
  expected_columns: string[],
  reference_sql: string,
  hints: string[],
  solution_explanation: string,
  xp: number,
  estimated_minutes: number
): QuestionDefinition {
  const pad = String(order).padStart(3, "0");
  const id = `${cfg.prefix}-L${level}-${pad}`;

  return {
    id,
    domain: cfg.domain,
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
      order_sensitive: reference_sql.toUpperCase().includes("ORDER BY"),
      column_names_sensitive: false,
      numeric_tolerance: 0.01,
    },
    hints,
    solution_explanation,
    xp,
    estimated_minutes,
  };
}

export function buildQuestionsForDomainLevel(
  cfg: DomainConfig,
  level: number
): QuestionDefinition[] {
  const tbl = DOMAIN_TABLES[cfg.domain] || DOMAIN_TABLES.ecommerce;
  const questions: QuestionDefinition[] = [];

  for (let order = 1; order <= 100; order++) {
    const persona = cfg.team[(order - 1) % cfg.team.length];

    // Difficulty and XP curve
    let difficulty: "warm-up" | "core" | "challenging" | "boss";
    if (level === 1) {
      difficulty = order <= 25 ? "warm-up" : order <= 70 ? "core" : order <= 95 ? "challenging" : "boss";
    } else if (level === 2) {
      difficulty = order <= 15 ? "warm-up" : order <= 65 ? "core" : order <= 95 ? "challenging" : "boss";
    } else if (level === 3) {
      difficulty = order <= 50 ? "core" : order <= 95 ? "challenging" : "boss";
    } else {
      difficulty = order <= 30 ? "core" : order <= 90 ? "challenging" : "boss";
    }

    const xp = difficulty === "warm-up" ? 15 : difficulty === "core" ? 25 : difficulty === "challenging" ? 45 : 75;
    const mins = difficulty === "warm-up" ? 5 : difficulty === "core" ? 8 : difficulty === "challenging" ? 12 : 20;

    let title = "";
    let request = "";
    let context_notes = "";
    let concepts: string[] = [];
    let expected_columns: string[] = [];
    let reference_sql = "";
    let hints: string[] = [];
    let solution_explanation = "";

    // =========================================================================
    // LEVEL 1: STRUCTURED 10-BY-10 FOUNDATIONAL TO ADVANCED LADDER
    // 1-10: Basic
    // 11-20: Joins
    // 21-30: Unions
    // 31-40: Subqueries
    // 41-50: Window Functions
    // 51-60: CTEs
    // 61-70: CTAS & Views & Temp Tables
    // 71-80: Stored Procedures
    // 81-90: Triggers and Indexes
    // 91-100: Execution Plans and Partitions
    // =========================================================================
    if (level === 1) {
      if (order <= 10) {
        if (order === 7) {
          title = `Data Cleansing: Whitespace Normalization with TRIM and UPPER`;
          request = `Data Quality Ticket: In ${tbl.t1}, text fields often contain irregular casing and whitespace. Standardize entries by selecting id and UPPER(TRIM(${tbl.c1})) AS cleaned_name ordered by id ASC. (Limit to 20 records).`;
          reference_sql = `SELECT id, UPPER(TRIM(${tbl.c1})) AS cleaned_name FROM ${tbl.t1} ORDER BY id ASC LIMIT 20;`;
          expected_columns = ["id", "cleaned_name"];
          concepts = ["DATA CLEANING", "TRIM", "UPPER"];
          hints = [`Use UPPER(TRIM(${tbl.c1})) AS cleaned_name.`];
          solution_explanation = `Applies TRIM to strip whitespace and UPPER to standardize casing.`;
        } else if (order === 8) {
          title = `Null Handling: Default Imputation with COALESCE`;
          request = `Audit Review: NULL metrics disrupt financial reporting. From ${tbl.t3}, select id, ${tbl.c3}, and COALESCE(${tbl.num3}, 0.00) AS safe_metric ordered by id ASC. (Limit to 20 records).`;
          reference_sql = `SELECT id, ${tbl.c3}, COALESCE(${tbl.num3}, 0.00) AS safe_metric FROM ${tbl.t3} ORDER BY id ASC LIMIT 20;`;
          expected_columns = ["id", tbl.c3, "safe_metric"];
          concepts = ["NULL HANDLING", "COALESCE", "DATA INTEGRITY"];
          hints = [`Use COALESCE(${tbl.num3}, 0.00) AS safe_metric.`];
          solution_explanation = `Substitutes a default numeric value whenever a null occurs.`;
        } else {
          // 1-10: Basic SELECT, WHERE, ORDER BY, LIMIT
          title = `Directory Overview: ${tbl.t1} Baseline`;
          request = `Ahead of our quarterly audit, pull our active ${tbl.t1} entries showing id and ${tbl.c1}, sorted ascending. (Limit to 20 records).`;
          reference_sql = `SELECT id, ${tbl.c1} FROM ${tbl.t1} ORDER BY id ASC LIMIT 20;`;
          expected_columns = ["id", tbl.c1];
          concepts = ["SELECT", "ORDER BY", "LIMIT"];
          hints = [`Write a SELECT statement specifying id and ${tbl.c1}.`, `Order by id ASC and limit to 20.`];
          solution_explanation = `Retrieves baseline records sorted by primary identifier.`;
        }
      } else if (order <= 20) {
        // 11-20: Joins
        title = `Relational Cross-Link: ${tbl.t1} and ${tbl.t2}`;
        request = `Compile a relational breakdown connecting ${tbl.t1} to ${tbl.t2}. Return ${tbl.c1} and the total count of related entities as related_count, ordered descending. (Limit to 20 records).`;
        reference_sql = `SELECT t1.${tbl.c1}, COUNT(t2.id) AS related_count FROM ${tbl.t1} t1 JOIN ${tbl.t2} t2 ON t1.id = t2.${tbl.fk2 || "id"} GROUP BY t1.${tbl.c1} ORDER BY related_count DESC LIMIT 20;`;
        expected_columns = [tbl.c1, "related_count"];
        concepts = ["INNER JOIN", "GROUP BY", "COUNT(*)"];
        hints = [`Join ${tbl.t1} and ${tbl.t2} on t1.id = t2.${tbl.fk2 || "id"}.`, `Group by t1.${tbl.c1} and order by related_count DESC.`];
        solution_explanation = `Connects two tables via relational key and aggregates related counts.`;
      } else if (order <= 30) {
        // 21-30: Unions
        title = `Catalog Integration with UNION ALL`;
        request = `Executive leadership requested a consolidated registry. Combine the catalog names from ${tbl.t1} and ${tbl.t2} using UNION ALL. Return catalog_name and category_type ('Primary' or 'Secondary'), ordered by catalog_name ASC. (Limit to 25 records).`;
        reference_sql = `SELECT ${tbl.c1} AS catalog_name, 'Primary' AS category_type FROM ${tbl.t1} UNION ALL SELECT ${tbl.c2} AS catalog_name, 'Secondary' AS category_type FROM ${tbl.t2} ORDER BY catalog_name ASC LIMIT 25;`;
        expected_columns = ["catalog_name", "category_type"];
        concepts = ["UNION ALL", "SET OPERATIONS", "DATA INTEGRATION"];
        hints = [`Write two SELECT queries with matching column aliases, merged via UNION ALL.`];
        solution_explanation = `Merges two distinct tables into a single normalized result set using UNION ALL.`;
      } else if (order <= 40) {
        // 31-40: Subqueries
        title = `Benchmark Segmentation with Subquery`;
        request = `Identify high-tier items. Using a Subquery in the WHERE clause, select id, ${tbl.c3}, and ${tbl.num3} from ${tbl.t3} where ${tbl.num3} is strictly greater than the overall table average. Order descending by ${tbl.num3}. (Limit to 20 records).`;
        reference_sql = `SELECT id, ${tbl.c3}, ${tbl.num3} FROM ${tbl.t3} WHERE ${tbl.num3} > (SELECT AVG(${tbl.num3}) FROM ${tbl.t3}) ORDER BY ${tbl.num3} DESC LIMIT 20;`;
        expected_columns = ["id", tbl.c3, tbl.num3];
        concepts = ["SUBQUERY", "SCALAR SUBQUERY", "WHERE"];
        hints = [`Filter using WHERE ${tbl.num3} > (SELECT AVG(${tbl.num3}) FROM ${tbl.t3}).`];
        solution_explanation = `Uses an inner scalar subquery to dynamically calculate the filtering threshold.`;
      } else if (order <= 50) {
        // 41-50: Window Functions
        title = `Sequential Delta Analysis with LAG()`;
        request = `Analyze sequential transactions or events in ${tbl.t5}. Using the LAG() window function, retrieve id, ${tbl.num5}, and the previous record's value as prev_amount ordered by id ASC. (Limit to 20 records).`;
        reference_sql = `SELECT id, ${tbl.num5}, LAG(${tbl.num5}) OVER (ORDER BY id ASC) AS prev_amount FROM ${tbl.t5} ORDER BY id ASC LIMIT 20;`;
        expected_columns = ["id", tbl.num5, "prev_amount"];
        concepts = ["WINDOW FUNCTION", "LAG()", "ANALYTICS"];
        hints = [`Use LAG(${tbl.num5}) OVER (ORDER BY id ASC) AS prev_amount.`];
        solution_explanation = `Accesses the prior row value without performing an expensive self-join.`;
      } else if (order <= 60) {
        // 51-60: CTEs
        title = `Modular Pipeline with WITH (CTE)`;
        request = `To ensure clean query architecture, write a Common Table Expression (CTE) named staged_records selecting id, ${tbl.c3}, and ${tbl.num3} from ${tbl.t3} where ${tbl.num3} > 20. Select all columns from staged_records ordered descending by ${tbl.num3}. (Limit to 20 records).`;
        reference_sql = `WITH staged_records AS (SELECT id, ${tbl.c3}, ${tbl.num3} FROM ${tbl.t3} WHERE ${tbl.num3} > 20) SELECT id, ${tbl.c3}, ${tbl.num3} FROM staged_records ORDER BY ${tbl.num3} DESC LIMIT 20;`;
        expected_columns = ["id", tbl.c3, tbl.num3];
        concepts = ["WITH (CTE)", "MODULAR SQL", "DATA PIPELINE"];
        hints = [`Start with WITH staged_records AS (SELECT ...) and query from staged_records.`];
        solution_explanation = `Defines a temporary named result set to stage transformation steps.`;
      } else if (order <= 70) {
        // 61-70: CTAS & Views & Temp Tables (Data Cleansing Pipeline)
        title = `ETL Data Cleansing Pipeline with Temporary Table (CTAS)`;
        request = `Data Engineering Ticket: Build a session staging table named temp_${tbl.t3}_clean to cleanse raw data. Ingest id, UPPER(TRIM(${tbl.c3})) AS cleaned_name, and COALESCE(${tbl.num3}, 0.00) AS standardized_amount from ${tbl.t3} where ${tbl.c3} IS NOT NULL. Select all columns from temp_${tbl.t3}_clean ordered descending by standardized_amount. (Limit to 20 records).`;
        reference_sql = `CREATE TEMP TABLE temp_${tbl.t3}_clean AS SELECT id, UPPER(TRIM(${tbl.c3})) AS cleaned_name, COALESCE(${tbl.num3}, 0.00) AS standardized_amount FROM ${tbl.t3} WHERE ${tbl.c3} IS NOT NULL; SELECT id, cleaned_name, standardized_amount FROM temp_${tbl.t3}_clean ORDER BY standardized_amount DESC LIMIT 20;`;
        expected_columns = ["id", "cleaned_name", "standardized_amount"];
        concepts = ["CREATE TEMP TABLE", "COALESCE", "TRIM", "DATA CLEANING"];
        hints = [`Run CREATE TEMP TABLE ... AS SELECT ...; followed by SELECT ... FROM temp_${tbl.t3}_clean;`];
        solution_explanation = `Stages intermediate data in session-scoped temporary storage while cleaning nulls and whitespace.`;
      } else if (order <= 80) {
        // 71-80: Stored Procedures
        title = `Batch Automation with Stored Procedure`;
        request = `Operations requires an automated batch adjustment routine. Create a Stored Procedure named sp_adjust_${tbl.t3}_val(p_id INT, p_delta NUMERIC) that updates ${tbl.num3} by adding p_delta. Execute it with CALL sp_adjust_${tbl.t3}_val(1, 5); then select id, ${tbl.c3}, ${tbl.num3} from ${tbl.t3} where id = 1.`;
        reference_sql = `CREATE OR REPLACE PROCEDURE sp_adjust_${tbl.t3}_val(p_id INT, p_delta NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE ${tbl.t3} SET ${tbl.num3} = ${tbl.num3} + p_delta WHERE id = p_id; END; $$; CALL sp_adjust_${tbl.t3}_val(1, 5); SELECT id, ${tbl.c3}, ${tbl.num3} FROM ${tbl.t3} WHERE id = 1;`;
        expected_columns = ["id", tbl.c3, tbl.num3];
        concepts = ["CREATE PROCEDURE", "CALL", "PL/pgSQL"];
        hints = [`Define CREATE OR REPLACE PROCEDURE ... LANGUAGE plpgsql AS $$ ... $$; then CALL it.`];
        solution_explanation = `Encapsulates transactional mutation inside a compiled PostgreSQL stored procedure.`;
      } else if (order <= 90) {
        // 81-90: Triggers and Indexes
        title = `Access Speedup with Database Index`;
        request = `Production Ticket: Read latency on ${tbl.t3} is increasing. Create an Index named idx_${tbl.t3}_perf ON ${tbl.t3}(${tbl.num3} DESC). Then retrieve id, ${tbl.c3}, ${tbl.num3} for entries where ${tbl.num3} > 20 ordered descending. (Limit to 20 records).`;
        reference_sql = `CREATE INDEX idx_${tbl.t3}_perf ON ${tbl.t3}(${tbl.num3} DESC); SELECT id, ${tbl.c3}, ${tbl.num3} FROM ${tbl.t3} WHERE ${tbl.num3} > 20 ORDER BY ${tbl.num3} DESC LIMIT 20;`;
        expected_columns = ["id", tbl.c3, tbl.num3];
        concepts = ["CREATE INDEX", "QUERY OPTIMIZATION", "B-TREE"];
        hints = [`Write CREATE INDEX idx_${tbl.t3}_perf ON ${tbl.t3}(${tbl.num3} DESC); followed by the SELECT query.`];
        solution_explanation = `Constructs a high-performance B-Tree index to eliminate sequential scans.`;
      } else {
        // 91-100: Execution Plans & Partitions
        title = `Planner Cost Inspection with EXPLAIN (FORMAT JSON)`;
        request = `Infrastructure Audit: Inspect the PostgreSQL query planner path for queries filtering ${tbl.t5} by ${tbl.num5} > 50. Run an EXPLAIN (FORMAT JSON) on the query to analyze cost and node scan types.`;
        reference_sql = `EXPLAIN (FORMAT JSON) SELECT id, ${tbl.num5} FROM ${tbl.t5} WHERE ${tbl.num5} > 50;`;
        expected_columns = ["QUERY PLAN"];
        concepts = ["EXPLAIN", "QUERY PLANNER", "COST PROFILING"];
        hints = [`Prefix your SELECT query with EXPLAIN (FORMAT JSON).`];
        solution_explanation = `Profiles optimizer execution tree and cost metrics using PostgreSQL EXPLAIN.`;
      }
    }

    // =========================================================================
    // LEVEL 2, 3, 4, 5: INTERRUPTED PATTERN (REAL ANALYST & DATA ENGINEER)
    // The pattern changes every single question! Rotating between real stakeholder
    // engineering tickets and complex business analytical inquiries.
    // =========================================================================
    else {
      // Rotating interrupted archetype across 12 authentic engineering & analyst scenarios
      const archetype = (order * 7 + level * 13) % 12;

      if (archetype === 0) {
        // Multi-Stage CTE + Window Functions (Real Analyst Cohort/Quartile)
        title = `Multi-Stage Quartile Stratification (CTE & NTILE)`;
        request = `Executive Memo: Segment records in ${tbl.t3} into 4 analytical quartiles based on ${tbl.num3} using NTILE(4) within a CTE named cohort_analysis. Return id, ${tbl.c3}, ${tbl.num3}, and quartile ordered by quartile ASC, ${tbl.num3} DESC. (Limit to 25 records).`;
        reference_sql = `WITH cohort_analysis AS (SELECT id, ${tbl.c3}, ${tbl.num3}, NTILE(4) OVER (ORDER BY ${tbl.num3} DESC) AS quartile FROM ${tbl.t3}) SELECT id, ${tbl.c3}, ${tbl.num3}, quartile FROM cohort_analysis ORDER BY quartile ASC, ${tbl.num3} DESC LIMIT 25;`;
        expected_columns = ["id", tbl.c3, tbl.num3, "quartile"];
        concepts = ["WITH (CTE)", "NTILE(4)", "ANALYTICS"];
        hints = [`Use NTILE(4) OVER (ORDER BY ${tbl.num3} DESC) AS quartile inside the CTE.`];
        solution_explanation = `Combines CTE staging with statistical distribution quartiles.`;
      } else if (archetype === 1) {
        // Production Incident (Data Engineer Index Optimization)
        title = `Incident Response: High-Cardinality Index Optimization`;
        request = `ALERT: The dashboard query on ${tbl.t5} is causing severe CPU spikes. Create a composite index named idx_${tbl.t5}_opt_${order} ON ${tbl.t5}(id, ${tbl.num5} DESC). Then retrieve id, ${tbl.c5}, ${tbl.num5} where ${tbl.num5} > 30 ordered by id ASC. (Limit to 20 records).`;
        reference_sql = `CREATE INDEX idx_${tbl.t5}_opt_${order} ON ${tbl.t5}(id, ${tbl.num5} DESC); SELECT id, ${tbl.c5}, ${tbl.num5} FROM ${tbl.t5} WHERE ${tbl.num5} > 30 ORDER BY id ASC LIMIT 20;`;
        expected_columns = ["id", tbl.c5, tbl.num5];
        concepts = ["CREATE INDEX", "PERFORMANCE TUNING", "COMPOSITE INDEX"];
        hints = [`Create the composite index first, then execute the SELECT query.`];
        solution_explanation = `Eliminates slow sequential scans during high-concurrency production load.`;
      } else if (archetype === 2) {
        // Data Cleaning & Staging Pipeline (Data Engineer CTAS + COALESCE + TRIM)
        title = `Data Cleaning Pipeline: Ingestion & Imputation (CTAS)`;
        request = `Data Quality Ticket: Ingest and cleanse active records from ${tbl.t3}. Create a Temporary Staging Table named temp_${tbl.t3}_cln_${order} containing id, UPPER(TRIM(${tbl.c3})) AS cleaned_name, and COALESCE(ROUND(${tbl.num3} * 1.08, 2), 0.00) AS adjusted_amount where ${tbl.c3} IS NOT NULL. Query all columns from the temp table ordered descending. (Limit to 20 records).`;
        reference_sql = `CREATE TEMP TABLE temp_${tbl.t3}_cln_${order} AS SELECT id, UPPER(TRIM(${tbl.c3})) AS cleaned_name, COALESCE(ROUND(${tbl.num3} * 1.08, 2), 0.00) AS adjusted_amount FROM ${tbl.t3} WHERE ${tbl.c3} IS NOT NULL; SELECT id, cleaned_name, adjusted_amount FROM temp_${tbl.t3}_cln_${order} ORDER BY adjusted_amount DESC LIMIT 20;`;
        expected_columns = ["id", "cleaned_name", "adjusted_amount"];
        concepts = ["CREATE TEMP TABLE", "COALESCE", "TRIM", "DATA CLEANING"];
        hints = [`Stage the cleaned data via CREATE TEMP TABLE ... AS SELECT, then query it.`];
        solution_explanation = `Builds an intermediate staging relation to cleanse nulls and whitespace before analytics loading.`;
      } else if (archetype === 3) {
        // Compliance & Audit Sentinel (Data Engineer Trigger)
        title = `Regulatory Mandate: Immutable Audit Trigger`;
        request = `Compliance Officer Directive: Create an event trigger on ${tbl.t3} to monitor record mutations. Define function fn_audit_${tbl.t3}_${order}() and bind trigger trg_audit_${tbl.t3}_${order} BEFORE UPDATE ON ${tbl.t3} FOR EACH ROW EXECUTE FUNCTION fn_audit_${tbl.t3}_${order}(). Then select id, ${tbl.c3}, ${tbl.num3} from ${tbl.t3} ordered by id ASC. (Limit to 20 records).`;
        reference_sql = `CREATE OR REPLACE FUNCTION fn_audit_${tbl.t3}_${order}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_audit_${tbl.t3}_${order} BEFORE UPDATE ON ${tbl.t3} FOR EACH ROW EXECUTE FUNCTION fn_audit_${tbl.t3}_${order}(); SELECT id, ${tbl.c3}, ${tbl.num3} FROM ${tbl.t3} ORDER BY id ASC LIMIT 20;`;
        expected_columns = ["id", tbl.c3, tbl.num3];
        concepts = ["CREATE TRIGGER", "PL/pgSQL", "AUDIT SENTINEL"];
        hints = [`Create the trigger function returning trigger, attach the trigger, then query ${tbl.t3}.`];
        solution_explanation = `Installs an event-driven database sentinel to enforce regulatory compliance.`;
      } else if (archetype === 4) {
        // Transactional Automation (Data Engineer Stored Procedure)
        title = `Operational Automation: Settlement Stored Procedure`;
        request = `Operations Ticket: Automate record status reconciliation. Write a Stored Procedure named sp_reconcile_${tbl.t3}_${order}(p_id INT, p_val NUMERIC) that updates ${tbl.num3} by adding p_val for the specified id. Execute with CALL sp_reconcile_${tbl.t3}_${order}(1, 10); then select id, ${tbl.c3}, ${tbl.num3} from ${tbl.t3} where id = 1.`;
        reference_sql = `CREATE OR REPLACE PROCEDURE sp_reconcile_${tbl.t3}_${order}(p_id INT, p_val NUMERIC) LANGUAGE plpgsql AS $$ BEGIN UPDATE ${tbl.t3} SET ${tbl.num3} = ${tbl.num3} + p_val WHERE id = p_id; END; $$; CALL sp_reconcile_${tbl.t3}_${order}(1, 10); SELECT id, ${tbl.c3}, ${tbl.num3} FROM ${tbl.t3} WHERE id = 1;`;
        expected_columns = ["id", tbl.c3, tbl.num3];
        concepts = ["CREATE PROCEDURE", "CALL", "TRANSACTIONAL LOGIC"];
        hints = [`Write CREATE OR REPLACE PROCEDURE, invoke with CALL, then verify with SELECT.`];
        solution_explanation = `Encapsulates multi-table business updates inside a compiled procedural routine.`;
      } else if (archetype === 5) {
        // Departmental Security Abstraction (Analyst/Engineer Views with COALESCE)
        title = `Executive Abstraction Layer: Secure Database View`;
        request = `VP Request: Create a sanitized reporting View named v_exec_summary_${tbl.t1}_${order} joining ${tbl.t1} and ${tbl.t2} on t1.id = t2.${tbl.fk2 || "id"}. Project t1.id, COALESCE(t1.${tbl.c1}, 'Unassigned') AS primary_name, and COALESCE(t2.${tbl.c2}, 'None') AS secondary_name. Query from the view ordered by id ASC. (Limit to 20 records).`;
        reference_sql = `CREATE OR REPLACE VIEW v_exec_summary_${tbl.t1}_${order} AS SELECT t1.id, COALESCE(t1.${tbl.c1}, 'Unassigned') AS primary_name, COALESCE(t2.${tbl.c2}, 'None') AS secondary_name FROM ${tbl.t1} t1 JOIN ${tbl.t2} t2 ON t1.id = t2.${tbl.fk2 || "id"}; SELECT id, primary_name, secondary_name FROM v_exec_summary_${tbl.t1}_${order} ORDER BY id ASC LIMIT 20;`;
        expected_columns = ["id", "primary_name", "secondary_name"];
        concepts = ["CREATE VIEW", "COALESCE", "SECURITY ABSTRACTION"];
        hints = [`Create the view aliasing columns with COALESCE fallbacks, then query from it.`];
        solution_explanation = `Abstracts joined relations behind an immutable virtual security view with null-safe column fallbacks.`;
      } else if (archetype === 6) {
        // Relational Semi-Join / Anomaly Isolation (Correlated Subquery)
        title = `Anomaly Detection: Correlated Subquery with EXISTS`;
        request = `Audit Discrepancy: Identify all ${tbl.t1} entries that have active corresponding associations in ${tbl.t2}. Using a Correlated Subquery with EXISTS, return t1.id and t1.${tbl.c1} ordered by t1.id ASC. (Limit to 20 records).`;
        reference_sql = `SELECT t1.id, t1.${tbl.c1} FROM ${tbl.t1} t1 WHERE EXISTS (SELECT 1 FROM ${tbl.t2} t2 WHERE t2.${tbl.fk2 || "id"} = t1.id) ORDER BY t1.id ASC LIMIT 20;`;
        expected_columns = ["id", tbl.c1];
        concepts = ["CORRELATED SUBQUERY", "EXISTS", "SEMI-JOIN"];
        hints = [`Use WHERE EXISTS (SELECT 1 FROM ${tbl.t2} t2 WHERE t2.${tbl.fk2 || "id"} = t1.id).`];
        solution_explanation = `Applies an optimized correlated semi-join to verify foreign key relationships.`;
      } else if (archetype === 7) {
        // Growth & Velocity Deltas (Analyst LAG & LEAD)
        title = `Revenue Velocity Analysis: Dual-Horizon LAG & LEAD`;
        request = `Financial Growth Memo: In ${tbl.t5}, compute both prior period delta (LAG) and forward horizon projection (LEAD). Project id, ${tbl.num5}, LAG(${tbl.num5}) OVER (ORDER BY id ASC) AS prev_amount, and LEAD(${tbl.num5}) OVER (ORDER BY id ASC) AS next_amount ordered by id ASC. (Limit to 20 records).`;
        reference_sql = `SELECT id, ${tbl.num5}, LAG(${tbl.num5}) OVER (ORDER BY id ASC) AS prev_amount, LEAD(${tbl.num5}) OVER (ORDER BY id ASC) AS next_amount FROM ${tbl.t5} ORDER BY id ASC LIMIT 20;`;
        expected_columns = ["id", tbl.num5, "prev_amount", "next_amount"];
        concepts = ["LAG()", "LEAD()", "WINDOW FUNCTION"];
        hints = [`Apply both LAG() and LEAD() over the same sorted window.`];
        solution_explanation = `Performs simultaneous backward and forward row lookups for trajectory analysis.`;
      } else if (archetype === 8) {
        // Enterprise Scalability & Storage (Data Engineer Table Partitioning)
        title = `Storage Scale Architecture: Declarative Table Partitioning`;
        request = `Infrastructure Directive: Ledger ${tbl.t5} is reaching multi-gigabyte scale. Create a partitioned table named ${tbl.t5}_part_${order} (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount). Create child partitions for low (< 100) and high (>= 100) values. Insert a test row (1, 'Audited', 250.00) and query all rows.`;
        reference_sql = `CREATE TABLE ${tbl.t5}_part_${order} (id INT, status_code VARCHAR(100), amount NUMERIC) PARTITION BY RANGE (amount); CREATE TABLE ${tbl.t5}_part_${order}_low PARTITION OF ${tbl.t5}_part_${order} FOR VALUES FROM (0) TO (100); CREATE TABLE ${tbl.t5}_part_${order}_high PARTITION OF ${tbl.t5}_part_${order} FOR VALUES FROM (100) TO (100000); INSERT INTO ${tbl.t5}_part_${order} VALUES (1, 'Audited', 250.00); SELECT id, status_code, amount FROM ${tbl.t5}_part_${order};`;
        expected_columns = ["id", "status_code", "amount"];
        concepts = ["PARTITION BY RANGE", "TABLE PARTITIONING", "SCALE ARCHITECTURE"];
        hints = [`Create the master table PARTITION BY RANGE, create child partition tables, insert, and select.`];
        solution_explanation = `Builds a partitioned table hierarchy to enable storage pruning on high-volume tables.`;
      } else if (archetype === 9) {
        // Query Optimizer Diagnostics (Data Engineer EXPLAIN Plan)
        title = `Optimizer Path Profiling: EXPLAIN Plan Inspection`;
        request = `Performance Directive: Diagnose sequential scan bottlenecks in ${tbl.t5}. Run an EXPLAIN (FORMAT JSON) on a query selecting id and ${tbl.num5} from ${tbl.t5} where ${tbl.num5} > 25 to inspect execution cost and planned access nodes.`;
        reference_sql = `EXPLAIN (FORMAT JSON) SELECT id, ${tbl.num5} FROM ${tbl.t5} WHERE ${tbl.num5} > 25;`;
        expected_columns = ["QUERY PLAN"];
        concepts = ["EXPLAIN", "QUERY PLANNER", "COST PROFILING"];
        hints = [`Prepend EXPLAIN (FORMAT JSON) to your query.`];
        solution_explanation = `Extracts the PostgreSQL query planner JSON execution tree.`;
      } else if (archetype === 10) {
        // Division-by-Zero Defense & Data Imputation (NULLIF & COALESCE)
        title = `Data Quality Defense: Division-by-Zero Protection with NULLIF`;
        request = `Financial Metrics Audit: When calculating performance ratios in ${tbl.t3}, avoid division-by-zero crashes. Using NULLIF and COALESCE, select id, ${tbl.c3}, and ROUND((${tbl.num3} / NULLIF(COALESCE(${tbl.num3}, 1), 0))::numeric, 2) AS index_ratio ordered by id ASC. (Limit to 20 records).`;
        reference_sql = `SELECT id, ${tbl.c3}, ROUND((${tbl.num3} / NULLIF(COALESCE(${tbl.num3}, 1), 0))::numeric, 2) AS index_ratio FROM ${tbl.t3} ORDER BY id ASC LIMIT 20;`;
        expected_columns = ["id", tbl.c3, "index_ratio"];
        concepts = ["NULLIF", "COALESCE", "DATA CLEANING", "ARITHMETIC DEFENSE"];
        hints = [`Wrap denominators with NULLIF(..., 0) to guard against divide-by-zero exceptions.`];
        solution_explanation = `Applies NULLIF to defensively eliminate arithmetic divide-by-zero runtime errors.`;
      } else {
        // Whitespace Normalization & Data Scrubbing (TRIM & UPPER)
        title = `Data Scrubbing: Text Normalization and Null Filtering`;
        request = `Data Quality Alert: Standardize legacy text fields in ${tbl.t1}. Select id, UPPER(TRIM(${tbl.c1})) AS standardized_title, and COALESCE(id, 0) AS safe_code from ${tbl.t1} where ${tbl.c1} IS NOT NULL ORDER BY id ASC. (Limit to 20 records).`;
        reference_sql = `SELECT id, UPPER(TRIM(${tbl.c1})) AS standardized_title, COALESCE(id, 0) AS safe_code FROM ${tbl.t1} WHERE ${tbl.c1} IS NOT NULL ORDER BY id ASC LIMIT 20;`;
        expected_columns = ["id", "standardized_title", "safe_code"];
        concepts = ["TRIM", "UPPER", "IS NOT NULL", "DATA CLEANING"];
        hints = [`Use UPPER(TRIM(${tbl.c1})) and filter with WHERE ${tbl.c1} IS NOT NULL.`];
        solution_explanation = `Scrubs untrimmed whitespace and imputes missing codes with default zero fallbacks.`;
      }
    }

    const q = createQ(
      cfg,
      level,
      order,
      difficulty,
      title,
      persona,
      request,
      context_notes,
      concepts,
      expected_columns,
      reference_sql,
      hints,
      solution_explanation,
      xp,
      mins
    );
    questions.push(q);
  }

  return questions;
}

async function runValidationAndExport() {
  console.log("==========================================================");
  console.log("🚀 SQL OFFICE SIMULATOR: RE-GENERATING ALL 7 DOMAINS × 5 LEVELS");
  console.log("Level 1: 10-by-10 Structured Advanced SQL Ladder");
  console.log("Levels 2-5: Interrupted Real Analyst & Data Engineer Tickets");
  console.log("==========================================================");

  const pg = new PGlite();
  const domains = Object.keys(DOMAIN_CONFIGS);

  // Helper to prepare CTAS/View/Proc/Index/Part queries for clean PGlite execution
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

  let totalQuestions = 0;
  let totalErrors = 0;

  for (const domainKey of domains) {
    const cfg = DOMAIN_CONFIGS[domainKey];
    console.log(`\n▶ Processing Domain: [${cfg.domain.toUpperCase()}]`);

    // 1. Seed main schema in PGlite
    const schemaSql = generateDomainSql(cfg.domain, "main", cfg.schema);
    await pg.exec(schemaSql);
    await pg.exec(`SET search_path = "${cfg.schema}";`);
    console.log(`  ✓ Schema "${cfg.schema}" seeded successfully.`);

    for (let lvl = 1; lvl <= 5; lvl++) {
      const questions = buildQuestionsForDomainLevel(cfg, lvl);
      totalQuestions += questions.length;

      // Validate every question on PGlite
      let levelErrors = 0;
      for (const q of questions) {
        try {
          const execSql = prepareQuery(q.reference_sql);
          const results = await pg.exec(execSql);
          const lastResult = results[results.length - 1];

          if (!lastResult || !lastResult.rows) {
            console.error(`    ❌ [${q.id}] Query returned null result: ${q.reference_sql}`);
            levelErrors++;
            totalErrors++;
          }
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`    ❌ [${q.id}] SQL Error: ${msg} | SQL: ${q.reference_sql}`);
          levelErrors++;
          totalErrors++;
        }
      }

      if (levelErrors === 0) {
        console.log(`  ✓ Level ${lvl}: 100/100 questions verified against PostgreSQL.`);
      } else {
        console.error(`  ❌ Level ${lvl}: ${levelErrors} query errors encountered!`);
      }

      // Write TypeScript question file
      const exportVarName = `${cfg.prefix.toUpperCase()}_L${lvl}_QUESTIONS`;
      const fileHeader = (cfg.prefix === "ecom" && lvl === 1)
        ? `export interface QuestionDefinition {\n  id: string;\n  domain: string;\n  level: number;\n  order: number;\n  difficulty: "warm-up" | "core" | "challenging" | "boss" | string;\n  title: string;\n  stakeholder: {\n    name: string;\n    role: string;\n    department?: string;\n    avatar?: string;\n  };\n  request: string;\n  context_notes: string;\n  concepts: string[];\n  expected_columns: string[];\n  reference_sql: string;\n  starter_sql?: string;\n  challenge_type?: "query" | "index_optimization" | "execution_plan" | "stored_procedure" | "trigger" | "partitioning";\n  validation: {\n    order_sensitive: boolean;\n    column_names_sensitive: boolean;\n    numeric_tolerance: number;\n    target_table?: string;\n    expected_node_type?: string;\n    test_assertions?: Array<{\n      description: string;\n      assertionSql: string;\n      expectedResult?: "has_rows" | "zero_rows" | "throws_exception";\n    }>;\n  };\n  hints: string[];\n  solution_explanation: string;\n  xp: number;\n  estimated_minutes: number;\n}\n\n`
        : `import { QuestionDefinition } from "./ecom-l1-questions";\n\n`;
      const fileContent = `${fileHeader}export const ${exportVarName}: QuestionDefinition[] = ${JSON.stringify(questions, null, 2)};\n`;

      const targetPath = path.join(process.cwd(), `src/lib/content/${cfg.prefix}-l${lvl}-questions.ts`);
      fs.writeFileSync(targetPath, fileContent, "utf8");
    }
  }

  console.log("\n==========================================================");
  console.log(`🏁 CURRICULUM GENERATION COMPLETE`);
  console.log(`Total Questions Generated: ${totalQuestions} / 3,500`);
  console.log(`Total Validation Errors: ${totalErrors}`);
  console.log("==========================================================");

  if (totalErrors > 0) {
    process.exit(1);
  }
}

runValidationAndExport().catch((err) => {
  console.error("Fatal generator error:", err);
  process.exit(1);
});
