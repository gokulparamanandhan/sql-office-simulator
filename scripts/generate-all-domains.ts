import fs from "fs";
import path from "path";
import { PGlite } from "@electric-sql/pglite";
import { generateDomainSql } from "../src/lib/datasets/multi-domain-generators";
import { QuestionDefinition } from "../src/lib/content/ecom-l1-questions";

// Master Advanced SQL Generator for all 7 Domains × 5 Levels (3,500 questions)
// Fully integrates: Subqueries, UNION / UNION ALL, CTEs, Views, CTAS / Temp Tables, LAG, LEAD.

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
// Domain-specific schema configurations for table and column names
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

export function buildQuestionsForDomainLevel(
  cfg: DomainConfig,
  level: number
): QuestionDefinition[] {
  const tbl = DOMAIN_TABLES[cfg.domain] || DOMAIN_TABLES.ecommerce;
  const questions: QuestionDefinition[] = [];

  for (let order = 1; order <= 100; order++) {
    const persona = cfg.team[(order - 1) % cfg.team.length];
    const difficulty: "warm-up" | "core" | "challenging" | "boss" =
      order <= 30 ? "warm-up" : order <= 70 ? "core" : order <= 90 ? "challenging" : "boss";
    const xp = difficulty === "warm-up" ? 15 : difficulty === "core" ? 25 : difficulty === "challenging" ? 40 : 60;
    const mins = difficulty === "warm-up" ? 5 : difficulty === "core" ? 8 : difficulty === "challenging" ? 12 : 20;

    let title = "";
    let request = "";
    let context_notes = "";
    let concepts: string[] = [];
    let expected_columns: string[] = [];
    let reference_sql = "";
    let hints: string[] = [];
    let solution_explanation = "";

    // -------------------------------------------------------------------------
    // LEVEL 1: Foundations + Advanced SQL Intro
    // -------------------------------------------------------------------------
    if (level === 1) {
      if (order <= 20) {
        // Core Select
        title = `Inspection of ${tbl.t1} Directory`;
        request = `Could you pull our active ${tbl.t1} entries, showing the id and ${tbl.c1}, sorted in ascending order? (Limit to the top 20 records).`;
        reference_sql = `SELECT id, ${tbl.c1} FROM ${tbl.t1} ORDER BY id ASC LIMIT 20;`;
        expected_columns = ["id", tbl.c1];
        concepts = ["SELECT", "ORDER BY", "LIMIT"];
        hints = [`Write a SELECT statement specifying id and ${tbl.c1}.`, `Order by id ASC and limit to 20.`];
        solution_explanation = `Retrieves baseline records from ${tbl.t1} sorted by identifier.`;
      } else if (order <= 40) {
        // Aggregation & Grouping
        title = `Volume Summary in ${tbl.t5}`;
        request = `Ahead of our operational review, summarize ${tbl.t5} by grouping on ${tbl.c5}. Return ${tbl.c5} and the total count of records as record_count, ordered descending by record_count.`;
        reference_sql = `SELECT ${tbl.c5}, COUNT(*) AS record_count FROM ${tbl.t5} WHERE ${tbl.c5} IS NOT NULL GROUP BY ${tbl.c5} ORDER BY record_count DESC;`;
        expected_columns = [tbl.c5, "record_count"];
        concepts = ["GROUP BY", "COUNT(*)", "ORDER BY"];
        hints = [`Use GROUP BY ${tbl.c5}.`, `Alias COUNT(*) AS record_count and order descending.`];
        solution_explanation = `Aggregates ${tbl.t5} volume by ${tbl.c5} categories.`;
      } else if (order <= 55) {
        // Subquery with IN
        title = `Cross-Referenced Filter with IN Subquery`;
        request = `We need to identify key entities. Using an **IN Subquery**, select the id and ${tbl.c3} from ${tbl.t3} where id IN (SELECT id FROM ${tbl.t3} WHERE ${tbl.num3} > 50). Order by id ASC and limit to 20.`;
        reference_sql = `SELECT id, ${tbl.c3} FROM ${tbl.t3} WHERE id IN (SELECT id FROM ${tbl.t3} WHERE ${tbl.num3} > 50) ORDER BY id ASC LIMIT 20;`;
        expected_columns = ["id", tbl.c3];
        concepts = ["SELECT", "SUBQUERY", "IN"];
        hints = [
          `Write your WHERE clause as WHERE id IN (SELECT id FROM ${tbl.t3} WHERE ${tbl.num3} > 50).`,
          `Order by id ASC LIMIT 20.`,
        ];
        solution_explanation = `Demonstrates filtering rows dynamically using an IN subquery filter.`;
      } else if (order <= 70) {
        // UNION ALL
        title = `Consolidated Catalog using UNION ALL`;
        request = `Management requires a consolidated name catalog. Combine the names from ${tbl.t1} and ${tbl.t2} using **UNION ALL**. Return the entity name aliased as catalog_name, and a literal category_type labeled 'Primary' or 'Secondary'. Order by catalog_name ASC limit to 25.`;
        reference_sql = `SELECT ${tbl.c1} AS catalog_name, 'Primary' AS category_type FROM ${tbl.t1} UNION ALL SELECT ${tbl.c2} AS catalog_name, 'Secondary' AS category_type FROM ${tbl.t2} ORDER BY catalog_name ASC LIMIT 25;`;
        expected_columns = ["catalog_name", "category_type"];
        concepts = ["SELECT", "UNION ALL", "SET OPERATIONS"];
        hints = [
          `Write the first SELECT from ${tbl.t1}.`,
          `Use UNION ALL to append the second SELECT from ${tbl.t2}.`,
          `Apply ORDER BY catalog_name ASC LIMIT 25 at the end.`,
        ];
        solution_explanation = `Combines two disparate table registries into a unified dataset using UNION ALL.`;
      } else if (order <= 85) {
        // Simple CTE WITH
        title = `Staged Entity Extraction using WITH (CTE)`;
        request = `To establish clean SQL modularity, write a **Common Table Expression (CTE)** named staged_catalog. Inside the CTE, select id, ${tbl.c3}, and ${tbl.num3} from ${tbl.t3} where ${tbl.num3} > 20. From the CTE, select id, ${tbl.c3}, ${tbl.num3} ordered descending by ${tbl.num3} limit 20.`;
        reference_sql = `WITH staged_catalog AS (SELECT id, ${tbl.c3}, ${tbl.num3} FROM ${tbl.t3} WHERE ${tbl.num3} > 20) SELECT id, ${tbl.c3}, ${tbl.num3} FROM staged_catalog ORDER BY ${tbl.num3} DESC LIMIT 20;`;
        expected_columns = ["id", tbl.c3, tbl.num3];
        concepts = ["WITH (CTE)", "SELECT", "COMMON TABLE EXPRESSION"];
        hints = [
          `Start with: WITH staged_catalog AS (SELECT id, ${tbl.c3}, ${tbl.num3} FROM ${tbl.t3} WHERE ${tbl.num3} > 20)`,
          `Follow with: SELECT id, ${tbl.c3}, ${tbl.num3} FROM staged_catalog ORDER BY ${tbl.num3} DESC LIMIT 20;`,
        ];
        solution_explanation = `Introduces CTE (WITH) syntax to stage intermediate data cleanly.`;
      } else if (order <= 95) {
        // Basic LAG
        title = `Sequential Row Comparison using LAG()`;
        request = `Audit analysis requires comparing each transaction or record against the prior record. Using the **LAG()** window function, select id, ${tbl.num5}, and the prior record's amount as prev_amount (ordered by id) from ${tbl.t5}. Order by id ASC limit 20.`;
        reference_sql = `SELECT id, ${tbl.num5}, LAG(${tbl.num5}) OVER (ORDER BY id ASC) AS prev_amount FROM ${tbl.t5} ORDER BY id ASC LIMIT 20;`;
        expected_columns = ["id", tbl.num5, "prev_amount"];
        concepts = ["WINDOW FUNCTION", "LAG()", "ANALYTICS"];
        hints = [
          `Use LAG(${tbl.num5}) OVER (ORDER BY id ASC) AS prev_amount.`,
          `Include id and ${tbl.num5} in the SELECT list.`,
        ];
        solution_explanation = `Leverages the LAG() window function to access data from the preceding row without a self-join.`;
      } else {
        // Boss Level 1: Multi-step with CTE and Subquery
        title = `Boss Challenge: Multi-Stage Staged Audit`;
        request = `Executive Briefing: Using a **Common Table Expression (CTE)** and a **Subquery**, stage all records from ${tbl.t5} where ${tbl.num5} is greater than the average of all records in ${tbl.t5}. Return the record id, ${tbl.c5}, and ${tbl.num5}, ordered descending by ${tbl.num5} limit 10.`;
        reference_sql = `WITH high_value_records AS (SELECT id, ${tbl.c5}, ${tbl.num5} FROM ${tbl.t5} WHERE ${tbl.num5} > (SELECT AVG(${tbl.num5}) FROM ${tbl.t5})) SELECT id, ${tbl.c5}, ${tbl.num5} FROM high_value_records ORDER BY ${tbl.num5} DESC LIMIT 10;`;
        expected_columns = ["id", tbl.c5, tbl.num5];
        concepts = ["WITH (CTE)", "SUBQUERY", "AGGREGATION", "BOSS"];
        hints = [
          `Use a scalar subquery (SELECT AVG(${tbl.num5}) FROM ${tbl.t5}) inside your CTE filter.`,
          `Select from the CTE ordered by ${tbl.num5} DESC LIMIT 10.`,
        ];
        solution_explanation = `Combines CTE staging with a scalar subquery to perform dynamic benchmark filtering.`;
      }
    }

    // -------------------------------------------------------------------------
    // LEVEL 2: Intermediate: Subqueries, UNIONs, CTEs, CTAS
    // -------------------------------------------------------------------------
    else if (level === 2) {
      if (order <= 25) {
        // Multi-table JOINs
        title = `Relational Overview: ${tbl.t1} and ${tbl.t2}`;
        reference_sql = `SELECT t1.${tbl.c1}, COUNT(t2.id) AS related_count FROM ${tbl.t1} t1 JOIN ${tbl.t2} t2 ON t1.id = t2.${tbl.fk2 || "id"} GROUP BY t1.${tbl.c1} ORDER BY related_count DESC LIMIT 20;`;
        expected_columns = [tbl.c1, "related_count"];
        concepts = ["INNER JOIN", "GROUP BY", "COUNT"];
        request = `Compile a relational summary linking ${tbl.t1} with ${tbl.t2}. Return ${tbl.c1} and the count of associated items aliased as related_count, ordered descending by related_count limit 20.`;
        hints = [`JOIN ${tbl.t1} and ${tbl.t2} on t1.id = t2.${tbl.fk2 || "id"}.`, `GROUP BY t1.${tbl.c1}.`];
        solution_explanation = `Performs a two-table relational join with grouping.`;
      } else if (order <= 45) {
        // Subqueries (NOT IN, Scalar, Derived)
        title = `Entity Segmentation with Subqueries`;
        reference_sql = `SELECT id, ${tbl.c3}, ${tbl.num3} FROM ${tbl.t3} WHERE ${tbl.num3} > (SELECT AVG(${tbl.num3}) FROM ${tbl.t3}) ORDER BY ${tbl.num3} DESC LIMIT 20;`;
        expected_columns = ["id", tbl.c3, tbl.num3];
        concepts = ["SUBQUERY", "SCALAR SUBQUERY", "WHERE"];
        request = `Identify high-tier entries. Using a **Scalar Subquery**, retrieve id, ${tbl.c3}, and ${tbl.num3} from ${tbl.t3} where ${tbl.num3} exceeds the average value of ${tbl.num3} across the whole table. Order descending by ${tbl.num3} limit 20.`;
        hints = [`Write WHERE ${tbl.num3} > (SELECT AVG(${tbl.num3}) FROM ${tbl.t3}).`];
        solution_explanation = `Filters records using a scalar subquery computing an overarching average.`;
      } else if (order <= 65) {
        // UNION ALL Consolidations
        title = `Cross-Departmental Roster with UNION ALL`;
        reference_sql = `SELECT id, ${tbl.c1} AS display_name, 'Group A' AS partition_tag FROM ${tbl.t1} UNION ALL SELECT id, ${tbl.c2} AS display_name, 'Group B' AS partition_tag FROM ${tbl.t2} ORDER BY id ASC LIMIT 25;`;
        expected_columns = ["id", "display_name", "partition_tag"];
        concepts = ["UNION ALL", "SET OPERATIONS", "DATA INTEGRATION"];
        request = `Consolidate registry entries across departments using **UNION ALL**. Return id, the entity name as display_name, and a partition_tag ('Group A' or 'Group B'). Order by id ASC limit 25.`;
        hints = [`Select id, ${tbl.c1} AS display_name, 'Group A' AS partition_tag from ${tbl.t1}, then UNION ALL with ${tbl.t2}.`];
        solution_explanation = `Appends record streams with an added discriminator column.`;
      } else if (order <= 85) {
        // CTE Staging
        title = `Intermediate Staging with WITH (CTE)`;
        reference_sql = `WITH summary_cte AS (SELECT id, ${tbl.c3}, ${tbl.num3} * 1.1 AS adjusted_val FROM ${tbl.t3}) SELECT id, ${tbl.c3}, ROUND(adjusted_val, 2) AS adjusted_val FROM summary_cte ORDER BY adjusted_val DESC LIMIT 20;`;
        expected_columns = ["id", tbl.c3, "adjusted_val"];
        concepts = ["WITH (CTE)", "ARITHMETIC", "STAGING"];
        request = `Perform tariff adjustments. Using a **Common Table Expression (CTE)**, calculate adjusted_val (${tbl.num3} * 1.1) for each item in ${tbl.t3}. From the CTE, return id, ${tbl.c3}, and ROUND(adjusted_val, 2) ordered descending limit 20.`;
        hints = [`Define WITH summary_cte AS (...) and then query from summary_cte.`];
        solution_explanation = `Structures business transformation within a temporary CTE layer.`;
      } else if (order <= 95) {
        // CTAS / Temp Table / Views
        title = `Staging Dataset with Temporary Table (CTAS)`;
        reference_sql = `CREATE TEMP TABLE tmp_filtered_items AS SELECT id, ${tbl.c3}, ${tbl.num3} FROM ${tbl.t3} WHERE ${tbl.num3} >= 10; SELECT id, ${tbl.c3}, ${tbl.num3} FROM tmp_filtered_items ORDER BY ${tbl.num3} DESC LIMIT 20;`;
        expected_columns = ["id", tbl.c3, tbl.num3];
        concepts = ["TEMP TABLE (CTAS)", "VIEW", "STAGING"];
        request = `Our data team recommends staging intermediate datasets. Create a **Temporary Table (CREATE TEMP TABLE ... AS)** or **View (CREATE VIEW ... AS)** containing items from ${tbl.t3} where ${tbl.num3} >= 10, then select id, ${tbl.c3}, ${tbl.num3} from it ordered descending limit 20.`;
        hints = [`Write: CREATE TEMP TABLE tmp_filtered_items AS SELECT ...; followed by SELECT ... FROM tmp_filtered_items;`];
        solution_explanation = `Creates a temporary table to store intermediate query state.`;
      } else {
        // Boss Level 2
        title = `Boss Challenge: Multi-Source Reconciliation`;
        reference_sql = `WITH staged_metrics AS (SELECT id, ${tbl.c3}, ${tbl.num3} FROM ${tbl.t3} WHERE ${tbl.num3} > 30) SELECT sm.id, sm.${tbl.c3}, sm.${tbl.num3} FROM staged_metrics sm WHERE sm.id IN (SELECT id FROM ${tbl.t3}) ORDER BY sm.${tbl.num3} DESC LIMIT 15;`;
        expected_columns = ["id", tbl.c3, tbl.num3];
        concepts = ["WITH (CTE)", "SUBQUERY", "BOSS"];
        request = `Executive Challenge: Combine a **Common Table Expression (CTE)** and an **IN Subquery** to isolate high-value entries from ${tbl.t3} where ${tbl.num3} > 30. Return id, ${tbl.c3}, ${tbl.num3} ordered descending limit 15.`;
        hints = [`Wrap the initial filter in a CTE, then filter with WHERE id IN (...) in the outer query.`];
        solution_explanation = `Demonstrates multi-paradigm query composition for senior analytics reporting.`;
      }
    }

    // -------------------------------------------------------------------------
    // LEVEL 3: Advanced: Correlated Subqueries, Multi-Stage CTEs, LAG & LEAD
    // -------------------------------------------------------------------------
    else if (level === 3) {
      if (order <= 25) {
        // Correlated Subqueries (EXISTS)
        title = `Targeted Isolation using EXISTS`;
        reference_sql = `SELECT t1.id, t1.${tbl.c1} FROM ${tbl.t1} t1 WHERE EXISTS (SELECT 1 FROM ${tbl.t2} t2 WHERE t2.${tbl.fk2 || "id"} = t1.id) ORDER BY t1.id ASC LIMIT 25;`;
        expected_columns = ["id", tbl.c1];
        concepts = ["CORRELATED SUBQUERY", "EXISTS", "SEMI-JOIN"];
        request = `To audit relational integrity, use a **Correlated Subquery with EXISTS** to return the id and ${tbl.c1} of ${tbl.t1} records that have at least one corresponding record in ${tbl.t2}. Order by id ASC limit 25.`;
        hints = [`Use WHERE EXISTS (SELECT 1 FROM ${tbl.t2} t2 WHERE t2.${tbl.fk2 || "id"} = t1.id).`];
        solution_explanation = `Applies an EXISTS semi-join to verify relational membership efficiently.`;
      } else if (order <= 45) {
        // Multi-Stage CTE Pipelines
        title = `Two-Stage Pipeline with Multi-CTE`;
        reference_sql = `WITH step1 AS (SELECT id, ${tbl.c3}, ${tbl.num3} FROM ${tbl.t3} WHERE ${tbl.num3} > 15), step2 AS (SELECT id, ${tbl.c3}, ${tbl.num3}, ${tbl.num3} * 2 AS projected_revenue FROM step1) SELECT id, ${tbl.c3}, ${tbl.num3}, projected_revenue FROM step2 ORDER BY projected_revenue DESC LIMIT 20;`;
        expected_columns = ["id", tbl.c3, tbl.num3, "projected_revenue"];
        concepts = ["WITH (CTE)", "MULTI-STAGE CTE", "DATA PIPELINE"];
        request = `Construct a multi-stage **Common Table Expression (CTE)** pipeline. In step1, filter ${tbl.t3} where ${tbl.num3} > 15. In step2, calculate projected_revenue as ${tbl.num3} * 2. Select id, ${tbl.c3}, ${tbl.num3}, and projected_revenue ordered descending limit 20.`;
        hints = [`Chain two CTEs: WITH step1 AS (...), step2 AS (...) SELECT ... FROM step2;`];
        solution_explanation = `Chains multiple CTEs together for stepwise data engineering pipelines.`;
      } else if (order <= 65) {
        // Views & CTAS Staging
        title = `Materialized Staging with CREATE VIEW`;
        reference_sql = `CREATE VIEW v_active_summary AS SELECT id, ${tbl.c3}, ${tbl.num3} FROM ${tbl.t3} WHERE ${tbl.num3} > 10; SELECT id, ${tbl.c3}, ${tbl.num3} FROM v_active_summary ORDER BY ${tbl.num3} DESC LIMIT 20;`;
        expected_columns = ["id", tbl.c3, tbl.num3];
        concepts = ["VIEW", "TEMP TABLE (CTAS)", "DATA PIPELINE"];
        request = `Our data governance team requests defining reusable data abstractions. Create a **View (CREATE VIEW ... AS SELECT ...; SELECT ...)** or **Temporary Table (CREATE TEMP TABLE ... AS)** named v_active_summary filtering ${tbl.t3} for ${tbl.num3} > 10, then select from it ordered descending limit 20.`;
        hints = [`Write CREATE VIEW v_active_summary AS SELECT ...; followed by SELECT ... FROM v_active_summary;`];
        solution_explanation = `Creates a virtual view or temporary table to materialize complex logic.`;
      } else if (order <= 80) {
        // UNION Reconciliation
        title = `Ledger Reconciliation with UNION ALL`;
        reference_sql = `SELECT ${tbl.c1} AS record_name, 'Catalog' AS stream_source FROM ${tbl.t1} UNION ALL SELECT ${tbl.c2} AS record_name, 'Sub-Segment' AS stream_source FROM ${tbl.t2} ORDER BY record_name ASC LIMIT 25;`;
        expected_columns = ["record_name", "stream_source"];
        concepts = ["UNION ALL", "AUDIT RECONCILIATION"];
        request = `Perform an enterprise cross-check. Combine records from ${tbl.t1} and ${tbl.t2} using **UNION ALL**, projecting record_name and stream_source ('Catalog' or 'Sub-Segment'). Order by record_name ASC limit 25.`;
        hints = [`Use UNION ALL to merge two projected streams.`];
        solution_explanation = `Consolidates disparate operational streams for auditing.`;
      } else if (order <= 90) {
        // Window Functions (LAG & LEAD)
        title = `Interval Tracking with LAG() and LEAD()`;
        reference_sql = `SELECT id, ${tbl.num5}, LAG(${tbl.num5}) OVER (ORDER BY id ASC) AS prev_amt, LEAD(${tbl.num5}) OVER (ORDER BY id ASC) AS next_amt FROM ${tbl.t5} ORDER BY id ASC LIMIT 20;`;
        expected_columns = ["id", tbl.num5, "prev_amt", "next_amt"];
        concepts = ["LAG()", "LEAD()", "WINDOW FUNCTION"];
        request = `Analyze sequential transactions in ${tbl.t5}. Using **LAG()** and **LEAD()** window functions, project id, ${tbl.num5}, prev_amt (from previous row), and next_amt (from subsequent row) ordered by id ASC limit 20.`;
        hints = [
          `Use LAG(${tbl.num5}) OVER (ORDER BY id ASC) AS prev_amt.`,
          `Use LEAD(${tbl.num5}) OVER (ORDER BY id ASC) AS next_amt.`,
        ];
        solution_explanation = `Applies simultaneous backward (LAG) and forward (LEAD) window lookups.`;
      } else {
        // Boss Level 3
        title = `Boss Challenge: Multi-Tier Windowed Performance`;
        reference_sql = `WITH ranked_entries AS (SELECT id, ${tbl.c5}, ${tbl.num5}, DENSE_RANK() OVER (ORDER BY ${tbl.num5} DESC) AS rnk FROM ${tbl.t5}) SELECT id, ${tbl.c5}, ${tbl.num5}, rnk FROM ranked_entries WHERE rnk <= 15 ORDER BY rnk ASC;`;
        expected_columns = ["id", tbl.c5, tbl.num5, "rnk"];
        concepts = ["WITH (CTE)", "DENSE_RANK()", "WINDOW FUNCTION", "BOSS"];
        request = `Executive Review: Using a **Common Table Expression (CTE)** and **DENSE_RANK()**, rank records in ${tbl.t5} by ${tbl.num5} descending. From the CTE, return id, ${tbl.c5}, ${tbl.num5}, and rnk for ranks <= 15.`;
        hints = [`Use DENSE_RANK() OVER (ORDER BY ${tbl.num5} DESC) inside the CTE.`];
        solution_explanation = `Combines CTE staging with dense ranking window functions.`;
      }
    }

    // -------------------------------------------------------------------------
    // LEVEL 4: Expert: LAG, LEAD, CTAS, Multi-CTE Architectures
    // -------------------------------------------------------------------------
    else if (level === 4) {
      if (order <= 25) {
        // LAG Delta Analysis
        title = `Sequence Delta Tracking using LAG()`;
        reference_sql = `SELECT id, ${tbl.num5}, LAG(${tbl.num5}, 1) OVER (ORDER BY id ASC) AS prior_val, ${tbl.num5} - LAG(${tbl.num5}, 1) OVER (ORDER BY id ASC) AS delta_amt FROM ${tbl.t5} ORDER BY id ASC LIMIT 25;`;
        expected_columns = ["id", tbl.num5, "prior_val", "delta_amt"];
        concepts = ["LAG()", "WINDOW FUNCTION", "DELTA ANALYSIS"];
        request = `Financial Risk Audit: Using the **LAG()** window function, compute the difference between each record's ${tbl.num5} and its immediately preceding record's value as delta_amt. Return id, ${tbl.num5}, prior_val, and delta_amt ordered by id ASC limit 25.`;
        hints = [`Use ${tbl.num5} - LAG(${tbl.num5}, 1) OVER (ORDER BY id ASC) AS delta_amt.`];
        solution_explanation = `Calculates row-to-row delta using the LAG window function.`;
      } else if (order <= 50) {
        // LEAD Forward Projections
        title = `Turnaround Forecasting with LEAD()`;
        reference_sql = `SELECT id, ${tbl.c5}, ${tbl.num5}, LEAD(${tbl.num5}, 1) OVER (ORDER BY id ASC) AS next_val FROM ${tbl.t5} ORDER BY id ASC LIMIT 25;`;
        expected_columns = ["id", tbl.c5, tbl.num5, "next_val"];
        concepts = ["LEAD()", "WINDOW FUNCTION", "FORWARD PROJECTION"];
        request = `Forecasting Brief: Project subsequent values across ${tbl.t5} using the **LEAD()** window function. Select id, ${tbl.c5}, ${tbl.num5}, and next_val (the next row's value ordered by id ASC) limit 25.`;
        hints = [`Use LEAD(${tbl.num5}, 1) OVER (ORDER BY id ASC) AS next_val.`];
        solution_explanation = `Projects next-row values using the LEAD window function.`;
      } else if (order <= 70) {
        // Window Rankings (ROW_NUMBER / NTILE)
        title = `Quartile Stratification with NTILE(4)`;
        reference_sql = `SELECT id, ${tbl.c5}, ${tbl.num5}, NTILE(4) OVER (ORDER BY ${tbl.num5} DESC) AS quartile_tier FROM ${tbl.t5} ORDER BY quartile_tier ASC, ${tbl.num5} DESC LIMIT 30;`;
        expected_columns = ["id", tbl.c5, tbl.num5, "quartile_tier"];
        concepts = ["NTILE(4)", "WINDOW FUNCTION", "STRATIFICATION"];
        request = `Stratification Analysis: Segment records in ${tbl.t5} into 4 equal statistical quartiles using **NTILE(4)** based on ${tbl.num5} descending. Return id, ${tbl.c5}, ${tbl.num5}, and quartile_tier limit 30.`;
        hints = [`Use NTILE(4) OVER (ORDER BY ${tbl.num5} DESC) AS quartile_tier.`];
        solution_explanation = `Partitions datasets into statistical quartiles with NTILE.`;
      } else if (order <= 85) {
        // CTAS & Temp Tables
        title = `Window Optimization with CREATE TEMP TABLE`;
        reference_sql = `CREATE TEMP TABLE tmp_ranked_records AS SELECT id, ${tbl.c5}, ${tbl.num5}, ROW_NUMBER() OVER (ORDER BY ${tbl.num5} DESC) AS pos_rank FROM ${tbl.t5}; SELECT id, ${tbl.c5}, ${tbl.num5}, pos_rank FROM tmp_ranked_records WHERE pos_rank <= 20 ORDER BY pos_rank ASC;`;
        expected_columns = ["id", tbl.c5, tbl.num5, "pos_rank"];
        concepts = ["TEMP TABLE (CTAS)", "ROW_NUMBER()", "STAGING"];
        request = `Performance Optimization: Stage window ranking results into a **Temporary Table (CREATE TEMP TABLE ... AS SELECT ...; SELECT ...)**. Compute ROW_NUMBER() as pos_rank, then select the top 20 ranked records from the temp table.`;
        hints = [`Create the temp table first, then execute a SELECT query from it.`];
        solution_explanation = `Optimizes complex window queries by staging them in temporary tables.`;
      } else if (order <= 95) {
        // Complex Multi-CTE
        title = `Multi-Stage Analytical Pipeline (CTE)`;
        reference_sql = `WITH base_data AS (SELECT id, ${tbl.c5}, ${tbl.num5} FROM ${tbl.t5}), ranked_data AS (SELECT id, ${tbl.c5}, ${tbl.num5}, RANK() OVER (ORDER BY ${tbl.num5} DESC) AS rnk FROM base_data) SELECT id, ${tbl.c5}, ${tbl.num5}, rnk FROM ranked_data WHERE rnk <= 15 ORDER BY rnk ASC;`;
        expected_columns = ["id", tbl.c5, tbl.num5, "rnk"];
        concepts = ["MULTI-STAGE CTE", "RANK()", "WINDOW FUNCTION"];
        request = `Architect a multi-stage **Common Table Expression (CTE)** pipeline. In base_data, select raw records. In ranked_data, apply RANK(). Select records where rank <= 15 ordered by rnk ASC.`;
        hints = [`Define WITH base_data AS (...), ranked_data AS (...) SELECT ...;`];
        solution_explanation = `Demonstrates enterprise multi-CTE pipelines.`;
      } else {
        // Boss Level 4
        title = `Boss Challenge: Delta Velocity & Ranking Matrix`;
        reference_sql = `WITH seq_data AS (SELECT id, ${tbl.num5}, LAG(${tbl.num5}) OVER (ORDER BY id ASC) AS prev_amt FROM ${tbl.t5}), delta_data AS (SELECT id, ${tbl.num5}, prev_amt, COALESCE(${tbl.num5} - prev_amt, 0) AS delta_amt FROM seq_data) SELECT id, ${tbl.num5}, prev_amt, delta_amt FROM delta_data ORDER BY id ASC LIMIT 20;`;
        expected_columns = ["id", tbl.num5, "prev_amt", "delta_amt"];
        concepts = ["LAG()", "WITH (CTE)", "WINDOW FUNCTION", "BOSS"];
        request = `Executive Boss Challenge: Combine a multi-stage **Common Table Expression (CTE)** with the **LAG()** window function to calculate step-by-step delta velocity. Return id, ${tbl.num5}, prev_amt, and delta_amt limit 20.`;
        hints = [`Use a CTE to compute the LAG value, then calculate the difference in the next CTE stage.`];
        solution_explanation = `Combines CTE architecture with window delta calculations for executive reporting.`;
      }
    }

    // -------------------------------------------------------------------------
    // LEVEL 5: Master: Executive Pipelines, Period-over-Period LAG/LEAD, CTAS
    // -------------------------------------------------------------------------
    else {
      if (order <= 25) {
        // Executive Multi-CTE
        title = `Executive Master KPI Pipeline (Multi-CTE)`;
        reference_sql = `WITH raw_ledger AS (SELECT id, ${tbl.c5}, ${tbl.num5} FROM ${tbl.t5}), tier_metrics AS (SELECT id, ${tbl.c5}, ${tbl.num5}, CASE WHEN ${tbl.num5} > 50 THEN 'High Acuity' ELSE 'Standard' END AS acuity_tier FROM raw_ledger) SELECT id, ${tbl.c5}, ${tbl.num5}, acuity_tier FROM tier_metrics ORDER BY ${tbl.num5} DESC LIMIT 25;`;
        expected_columns = ["id", tbl.c5, tbl.num5, "acuity_tier"];
        concepts = ["MULTI-STAGE CTE", "EXECUTIVE KPI", "CASE WHEN"];
        request = `Board Presentation: Build an executive multi-stage **Common Table Expression (CTE)** that segments entries into 'High Acuity' or 'Standard' as acuity_tier. Select id, ${tbl.c5}, ${tbl.num5}, and acuity_tier ordered descending by ${tbl.num5} limit 25.`;
        hints = [`Build a multi-stage CTE using CASE WHEN in the second stage.`];
        solution_explanation = `Produces executive KPI categorizations using multi-stage CTEs.`;
      } else if (order <= 50) {
        // Cohort Retention & Velocity with LAG/LEAD
        title = `Cohort Velocity Matrix with LAG() and LEAD()`;
        reference_sql = `SELECT id, ${tbl.c5}, ${tbl.num5}, LAG(${tbl.num5}) OVER (ORDER BY id ASC) AS prev_cycle, LEAD(${tbl.num5}) OVER (ORDER BY id ASC) AS next_cycle FROM ${tbl.t5} ORDER BY id ASC LIMIT 25;`;
        expected_columns = ["id", tbl.c5, tbl.num5, "prev_cycle", "next_cycle"];
        concepts = ["LAG()", "LEAD()", "COHORT RETENTION", "VELOCITY"];
        request = `Cohort Retention Briefing: Analyze transaction intervals across cycles. Using **LAG()** and **LEAD()** window functions, project id, ${tbl.c5}, ${tbl.num5}, prev_cycle, and next_cycle ordered by id ASC limit 25.`;
        hints = [`Combine both LAG() and LEAD() inside the SELECT projection.`];
        solution_explanation = `Delivers bidirectional cohort velocity analysis.`;
      } else if (order <= 70) {
        // Enterprise Views & CTAS Analytics
        title = `Enterprise Modeling with CREATE VIEW`;
        reference_sql = `CREATE VIEW v_master_executive_ledger AS SELECT id, ${tbl.c5}, ${tbl.num5}, NTILE(4) OVER (ORDER BY ${tbl.num5} DESC) AS revenue_quartile FROM ${tbl.t5}; SELECT id, ${tbl.c5}, ${tbl.num5}, revenue_quartile FROM v_master_executive_ledger ORDER BY revenue_quartile ASC, ${tbl.num5} DESC LIMIT 25;`;
        expected_columns = ["id", tbl.c5, tbl.num5, "revenue_quartile"];
        concepts = ["VIEW", "TEMP TABLE (CTAS)", "ENTERPRISE MODELING"];
        request = `Enterprise Data Architecture: Define a formal **View (CREATE VIEW ... AS SELECT ...; SELECT ...)** or **Temporary Table (CREATE TEMP TABLE ... AS)** named v_master_executive_ledger segmenting records into quartiles using NTILE(4). Query from it ordered by revenue_quartile limit 25.`;
        hints = [`Create the view with NTILE(4), then select from it.`];
        solution_explanation = `Encapsulates enterprise analytical stratification into reusable views.`;
      } else if (order <= 85) {
        // Cross-System UNION Reporting
        title = `Cross-System Audit Consolidated via UNION ALL`;
        reference_sql = `SELECT id, ${tbl.c1} AS ledger_item, 'System A' AS audit_source FROM ${tbl.t1} UNION ALL SELECT id, ${tbl.c2} AS ledger_item, 'System B' AS audit_source FROM ${tbl.t2} ORDER BY id ASC LIMIT 30;`;
        expected_columns = ["id", "ledger_item", "audit_source"];
        concepts = ["UNION ALL", "CROSS-SYSTEM RECONCILIATION"];
        request = `Corporate Governance: Consolidate records across disparate systems into a unified corporate audit ledger using **UNION ALL**. Return id, ledger_item, and audit_source ('System A' or 'System B') ordered by id ASC limit 30.`;
        hints = [`Write two SELECT queries connected by UNION ALL.`];
        solution_explanation = `Merges disparate ledger datasets for regulatory corporate reporting.`;
      } else if (order <= 95) {
        // Correlated Subquery & Outlier Detection
        title = `Outlier Anomaly Detection with Correlated Subqueries`;
        reference_sql = `SELECT t.id, t.${tbl.c5}, t.${tbl.num5} FROM ${tbl.t5} t WHERE t.${tbl.num5} >= (SELECT AVG(${tbl.num5}) FROM ${tbl.t5}) ORDER BY t.${tbl.num5} DESC LIMIT 20;`;
        expected_columns = ["id", tbl.c5, tbl.num5];
        concepts = ["CORRELATED SUBQUERY", "OUTLIER DETECTION", "SCALAR SUBQUERY"];
        request = `Federal Regulatory Stress-Test: Identify outlier exposures. Using a **Subquery**, retrieve all entries in ${tbl.t5} where ${tbl.num5} is at or above the overall average. Return id, ${tbl.c5}, ${tbl.num5} ordered descending limit 20.`;
        hints = [`Use WHERE ${tbl.num5} >= (SELECT AVG(${tbl.num5}) FROM ${tbl.t5}).`];
        solution_explanation = `Applies statistical benchmark filtering for executive stress tests.`;
      } else {
        // Boss Level 5: Master Corporate Query
        title = `Boss Challenge: Global Corporation Master Intelligence Audit`;
        reference_sql = `WITH master_cohort AS (SELECT id, ${tbl.c5}, ${tbl.num5}, LAG(${tbl.num5}) OVER (ORDER BY id ASC) AS prior_val FROM ${tbl.t5}), scored_cohort AS (SELECT id, ${tbl.c5}, ${tbl.num5}, prior_val, CASE WHEN prior_val IS NULL THEN 0 ELSE ${tbl.num5} - prior_val END AS step_diff FROM master_cohort) SELECT id, ${tbl.c5}, ${tbl.num5}, prior_val, step_diff FROM scored_cohort ORDER BY id ASC LIMIT 20;`;
        expected_columns = ["id", tbl.c5, tbl.num5, "prior_val", "step_diff"];
        concepts = ["WITH (CTE)", "LAG()", "MULTI-STAGE CTE", "BOSS"];
        request = `Board of Directors Master Mandate: Combine a multi-stage **Common Table Expression (CTE)** with the **LAG()** window function to build a step-by-step velocity intelligence audit. Return id, ${tbl.c5}, ${tbl.num5}, prior_val, and step_diff limit 20.`;
        hints = [`Build a 2-stage CTE: the first stage computes LAG(), and the second stage computes step_diff.`];
        solution_explanation = `Executes an enterprise-level master audit combining CTE staging and window lag metrics.`;
      }
    }

    questions.push(
      createQ(
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
      )
    );
  }

  return questions;
}

async function runValidationAndExport() {
  console.log("==========================================================");
  console.log("🚀 SQL Office Simulator: Advanced SQL Curriculum Generator");
  console.log("Integrating: Subquery, Union, CTE, Views, CTAS/Temp, LAG, LEAD");
  console.log("Generating: 7 Domains × 5 Levels × 100 Questions = 3,500 Total");
  console.log("==========================================================\n");

  const pg = new PGlite();
  const domains = Object.keys(DOMAIN_CONFIGS);

  // Helper to prepare CTAS/View queries for clean PGlite execution
  function prepareQuery(sql: string): string {
    const tempMatches = [...sql.matchAll(/CREATE\s+(?:TEMP|TEMPORARY)\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)/gi)];
    const viewMatches = [...sql.matchAll(/CREATE\s+(?:OR\s+REPLACE\s+)?VIEW\s+([a-zA-Z0-9_]+)/gi)];
    let prep = "";
    for (const m of tempMatches) {
      prep += `DROP TABLE IF EXISTS "${m[1]}" CASCADE; `;
    }
    for (const m of viewMatches) {
      prep += `DROP VIEW IF EXISTS "${m[1]}" CASCADE; `;
    }
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
        ? `export interface QuestionDefinition {\n  id: string;\n  domain: string;\n  level: number;\n  order: number;\n  difficulty: "warm-up" | "core" | "challenging" | "boss" | string;\n  title: string;\n  stakeholder: {\n    name: string;\n    role: string;\n    department?: string;\n    avatar?: string;\n  };\n  request: string;\n  context_notes: string;\n  concepts: string[];\n  expected_columns: string[];\n  reference_sql: string;\n  starter_sql?: string;\n  validation: {\n    order_sensitive: boolean;\n    column_names_sensitive: boolean;\n    numeric_tolerance: number;\n  };\n  hints: string[];\n  solution_explanation: string;\n  xp: number;\n  estimated_minutes: number;\n}\n\n`
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
