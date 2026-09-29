// ============================================================================
// LOGISTICS & SUPPLY CHAIN — LEVEL 4: WINDOW FUNCTIONS & FREIGHT ANALYTICS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (14): warehouses, carriers, fleet_vehicles, drivers, suppliers, shipments,
//              cargo_packages, freight_routes, delivery_checkpoints, parts_inventory,
//              fuel_logs, maintenance_records, customs_declarations, freight_invoices
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L4_QUESTIONS: QuestionDefinition[] = [
  {
    id: "log-L4-001",
    domain: "logistics",
    level: 4,
    order: 1,
    difficulty: "hard",
    title: "Customs Duty Rankings by Port of Entry",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Claire here. Rank our international shipments by customs duty liability within each port of entry. Display port_of_entry, shipment_id, duty_amount, and rank (highest duty = 1), ordered by port_of_entry, then duty_rank.",
    context_notes: "Customs tariff profiling across international trade gateways.",
    concepts: ["Window Functions","DENSE_RANK()","Customs Compliance"],
    expected_columns: ["port_of_entry","shipment_id","duty_amount","duty_rank"],
    reference_sql: "SELECT port_of_entry, shipment_id, duty_amount, DENSE_RANK() OVER (PARTITION BY port_of_entry ORDER BY duty_amount DESC) AS duty_rank FROM customs_declarations ORDER BY port_of_entry, duty_rank;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use DENSE_RANK() OVER (PARTITION BY port_of_entry ORDER BY duty_amount DESC)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-002",
    domain: "logistics",
    level: 4,
    order: 2,
    difficulty: "hard",
    title: "Cumulative Freight Invoicing Running Sum",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Frank at terminal accounting. We need a running cumulative billing audit. Show id, shipment_id, total_billed, and running cumulative total of billed amounts ordered by due_date and id.",
    context_notes: "Accounts receivable tracking and cash flow forecasting.",
    concepts: ["Window Functions","SUM() OVER","Financial Operations"],
    expected_columns: ["id","shipment_id","total_billed","running_billed_total"],
    reference_sql: "SELECT id, shipment_id, total_billed, SUM(total_billed) OVER (ORDER BY due_date, id) AS running_billed_total FROM freight_invoices ORDER BY due_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(total_billed) OVER (ORDER BY due_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-003",
    domain: "logistics",
    level: 4,
    order: 3,
    difficulty: "hard",
    title: "Fuel Price per Gallon Variance vs Prior Fill-Up",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Dave from Fleet Ops. Track diesel price volatility. For each fuel log entry, return vehicle_id, log_date, price_per_gallon, and the previous fill-up price using LAG.",
    context_notes: "Fleet fuel price volatility and regional terminal pricing.",
    concepts: ["Window Functions","LAG()","Fuel Volatility"],
    expected_columns: ["vehicle_id","log_date","price_per_gallon","prior_price_per_gal"],
    reference_sql: "SELECT vehicle_id, log_date, price_per_gallon, LAG(price_per_gallon, 1) OVER (PARTITION BY vehicle_id ORDER BY log_date, id) AS prior_price_per_gal FROM fuel_logs ORDER BY vehicle_id, log_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use LAG(price_per_gallon, 1) OVER (PARTITION BY vehicle_id ORDER BY log_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-004",
    domain: "logistics",
    level: 4,
    order: 4,
    difficulty: "hard",
    title: "Cargo Package Declared Value Quartiles",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Claire here. Divide all cargo packages into 4 valuation quartiles based on declared_value. Return shipment_id, weight_kg, declared_value, and the quartile (1 = top value).",
    context_notes: "Cargo value segmentation for tiered freight security handling.",
    concepts: ["Window Functions","NTILE()","Cargo Valuation"],
    expected_columns: ["shipment_id","weight_kg","declared_value","value_quartile"],
    reference_sql: "SELECT shipment_id, weight_kg, declared_value, NTILE(4) OVER (ORDER BY declared_value DESC) AS value_quartile FROM cargo_packages ORDER BY value_quartile, declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use NTILE(4) OVER (ORDER BY declared_value DESC)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-005",
    domain: "logistics",
    level: 4,
    order: 5,
    difficulty: "hard",
    title: "Running Cumulative Outbound Weight per Origin Warehouse",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Calculate running cumulative freight weight dispatched from each warehouse over time. Display warehouse_id, id AS shipment_id, weight_kg, and cumulative weight.",
    context_notes: "Tracking warehouse outbound loading dock volume over time.",
    concepts: ["Window Functions","SUM() OVER","Warehouse Logistics"],
    expected_columns: ["warehouse_id","shipment_id","weight_kg","running_warehouse_weight"],
    reference_sql: "SELECT warehouse_id, id AS shipment_id, weight_kg, SUM(weight_kg) OVER (PARTITION BY warehouse_id ORDER BY id) AS running_warehouse_weight FROM shipments ORDER BY warehouse_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(weight_kg) OVER (PARTITION BY warehouse_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-006",
    domain: "logistics",
    level: 4,
    order: 6,
    difficulty: "hard",
    title: "Top 2 Most Expensive Maintenance Services per Vehicle",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Dave from Fleet. Find the top 2 highest cost maintenance records for each fleet vehicle. Display vehicle_id, service_type, cost, and rank using a derived table.",
    context_notes: "Identifying major mechanical overhaul items per vehicle.",
    concepts: ["Window Functions","DENSE_RANK()","Subqueries"],
    expected_columns: ["vehicle_id","service_type","cost","rnk"],
    reference_sql: "SELECT vehicle_id, service_type, cost, rnk FROM (SELECT vehicle_id, service_type, cost, DENSE_RANK() OVER (PARTITION BY vehicle_id ORDER BY cost DESC) AS rnk FROM maintenance_records) sub WHERE rnk <= 2 ORDER BY vehicle_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter on DENSE_RANK() <= 2 inside a subquery."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-007",
    domain: "logistics",
    level: 4,
    order: 7,
    difficulty: "hard",
    title: "Freight Invoice Amount vs Status Cohort Average",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compare each freight invoice's total_billed with the average invoice amount for invoices having the same payment_status. Return id, payment_status, total_billed, and cohort average.",
    context_notes: "Auditing billing variance across paid versus overdue accounts.",
    concepts: ["Window Functions","AVG() OVER","Billing Auditing"],
    expected_columns: ["id","payment_status","total_billed","status_avg_billed"],
    reference_sql: "SELECT id, payment_status, total_billed, ROUND(AVG(total_billed) OVER (PARTITION BY payment_status), 2) AS status_avg_billed FROM freight_invoices ORDER BY payment_status, total_billed DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use AVG(total_billed) OVER (PARTITION BY payment_status)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-008",
    domain: "logistics",
    level: 4,
    order: 8,
    difficulty: "hard",
    title: "Shipment Checkpoint Scan Time Differences",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each shipment's checkpoints, calculate the elapsed time between consecutive scans. Show shipment_id, location_name, scanned_at, and the previous scan timestamp using LAG.",
    context_notes: "Transit time tracking between regional scan milestones.",
    concepts: ["Window Functions","LAG()","Tracking Visibility"],
    expected_columns: ["shipment_id","location_name","scanned_at","prev_scanned_at"],
    reference_sql: "SELECT shipment_id, location_name, scanned_at, LAG(scanned_at, 1) OVER (PARTITION BY shipment_id ORDER BY scanned_at, id) AS prev_scanned_at FROM delivery_checkpoints ORDER BY shipment_id, scanned_at;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use LAG(scanned_at, 1) OVER (PARTITION BY shipment_id ORDER BY scanned_at, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-009",
    domain: "logistics",
    level: 4,
    order: 9,
    difficulty: "hard",
    title: "Driver Safety Score Percentile Ranking",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Dave from Fleet. Calculate the percentile ranking of driver safety scores across our commercial driver roster. Show full_name, experience_years, safety_score, and percentile rank.",
    context_notes: "Driver safety benchmarking and compliance tiering.",
    concepts: ["Window Functions","PERCENT_RANK()","Driver Safety"],
    expected_columns: ["full_name","experience_years","safety_score","safety_percentile"],
    reference_sql: "SELECT full_name, experience_years, safety_score, PERCENT_RANK() OVER (ORDER BY safety_score) AS safety_percentile FROM drivers ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use PERCENT_RANK() OVER (ORDER BY safety_score)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-010",
    domain: "logistics",
    level: 4,
    order: 10,
    difficulty: "hard",
    title: "Customs Duty Amount vs Port Mean Liability",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Claire here. Show each customs declaration's shipment_id, port_of_entry, duty_amount, and how much it deviates from the average duty amount at that port.",
    context_notes: "Auditing customs entry tariffs against port norms.",
    concepts: ["Window Functions","AVG() OVER","Customs Tariffs"],
    expected_columns: ["shipment_id","port_of_entry","duty_amount","diff_from_port_avg"],
    reference_sql: "SELECT shipment_id, port_of_entry, duty_amount, ROUND((duty_amount - AVG(duty_amount) OVER (PARTITION BY port_of_entry)), 2) AS diff_from_port_avg FROM customs_declarations ORDER BY port_of_entry, duty_amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Subtract AVG(duty_amount) OVER (PARTITION BY port_of_entry) from duty_amount."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-011",
    domain: "logistics",
    level: 4,
    order: 11,
    difficulty: "hard",
    title: "CUSTOMS DECLARATIONS: Running Total by port of_entry",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute the cumulative running total of duty_amount partitioned by port_of_entry in customs_declarations, ordered by id.",
    context_notes: "Analytic logistics computation on customs_declarations utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","running_duty_amount"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id, id) AS running_duty_amount FROM customs_declarations ORDER BY port_of_entry, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-012",
    domain: "logistics",
    level: 4,
    order: 12,
    difficulty: "hard",
    title: "CUSTOMS DECLARATIONS: Rank by Magnitude by port of_entry",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Rank records within each port_of_entry in customs_declarations based on duty_amount descending.",
    context_notes: "Analytic logistics computation on customs_declarations utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","rnk"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, RANK() OVER (PARTITION BY port_of_entry ORDER BY duty_amount DESC) AS rnk FROM customs_declarations ORDER BY port_of_entry, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-013",
    domain: "logistics",
    level: 4,
    order: 13,
    difficulty: "hard",
    title: "CUSTOMS DECLARATIONS: Dense Rank by Magnitude by port of_entry",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute dense ranking of duty_amount within each port_of_entry in customs_declarations.",
    context_notes: "Analytic logistics computation on customs_declarations utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","dense_rnk"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, DENSE_RANK() OVER (PARTITION BY port_of_entry ORDER BY duty_amount DESC) AS dense_rnk FROM customs_declarations ORDER BY port_of_entry, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-014",
    domain: "logistics",
    level: 4,
    order: 14,
    difficulty: "hard",
    title: "CUSTOMS DECLARATIONS: Previous Record Lag Comparison by port of_entry",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Retrieve preceding duty_amount for each port_of_entry record in customs_declarations to measure operational step changes.",
    context_notes: "Analytic logistics computation on customs_declarations utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","prev_duty_amount"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, LAG(duty_amount, 1) OVER (PARTITION BY port_of_entry ORDER BY id, id) AS prev_duty_amount FROM customs_declarations ORDER BY port_of_entry, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-015",
    domain: "logistics",
    level: 4,
    order: 15,
    difficulty: "hard",
    title: "CUSTOMS DECLARATIONS: Next Record Lead Projection by port of_entry",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compare each record's duty_amount with the subsequent record's duty_amount within port_of_entry in customs_declarations.",
    context_notes: "Analytic logistics computation on customs_declarations utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","next_duty_amount"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, LEAD(duty_amount, 1) OVER (PARTITION BY port_of_entry ORDER BY id, id) AS next_duty_amount FROM customs_declarations ORDER BY port_of_entry, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-016",
    domain: "logistics",
    level: 4,
    order: 16,
    difficulty: "hard",
    title: "CUSTOMS DECLARATIONS: Cohort Average Benchmark by port of_entry",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Benchmark individual duty_amount against the cohort average duty_amount across the same port_of_entry in customs_declarations.",
    context_notes: "Analytic logistics computation on customs_declarations utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","avg_duty_amount_cohort"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, AVG(duty_amount) OVER (PARTITION BY port_of_entry) AS avg_duty_amount_cohort FROM customs_declarations ORDER BY port_of_entry, duty_amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-017",
    domain: "logistics",
    level: 4,
    order: 17,
    difficulty: "hard",
    title: "CUSTOMS DECLARATIONS: Quartile Distribution by port of_entry",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Distribute records in customs_declarations into 4 equal quartiles based on duty_amount within each port_of_entry.",
    context_notes: "Analytic logistics computation on customs_declarations utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","quartile"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, NTILE(4) OVER (PARTITION BY port_of_entry ORDER BY duty_amount DESC) AS quartile FROM customs_declarations ORDER BY port_of_entry, quartile, duty_amount DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-018",
    domain: "logistics",
    level: 4,
    order: 18,
    difficulty: "hard",
    title: "FREIGHT INVOICES: Running Total by payment status",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute the cumulative running total of total_billed partitioned by payment_status in freight_invoices, ordered by id.",
    context_notes: "Analytic logistics computation on freight_invoices utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","freight_invoices"],
    expected_columns: ["id","payment_status","total_billed","running_total_billed"],
    reference_sql: "SELECT id, payment_status, total_billed, SUM(total_billed) OVER (PARTITION BY payment_status ORDER BY id, id) AS running_total_billed FROM freight_invoices ORDER BY payment_status, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-019",
    domain: "logistics",
    level: 4,
    order: 19,
    difficulty: "hard",
    title: "FREIGHT INVOICES: Rank by Magnitude by payment status",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Rank records within each payment_status in freight_invoices based on total_billed descending.",
    context_notes: "Analytic logistics computation on freight_invoices utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","freight_invoices"],
    expected_columns: ["id","payment_status","total_billed","rnk"],
    reference_sql: "SELECT id, payment_status, total_billed, RANK() OVER (PARTITION BY payment_status ORDER BY total_billed DESC) AS rnk FROM freight_invoices ORDER BY payment_status, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-020",
    domain: "logistics",
    level: 4,
    order: 20,
    difficulty: "hard",
    title: "FREIGHT INVOICES: Dense Rank by Magnitude by payment status",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute dense ranking of total_billed within each payment_status in freight_invoices.",
    context_notes: "Analytic logistics computation on freight_invoices utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","freight_invoices"],
    expected_columns: ["id","payment_status","total_billed","dense_rnk"],
    reference_sql: "SELECT id, payment_status, total_billed, DENSE_RANK() OVER (PARTITION BY payment_status ORDER BY total_billed DESC) AS dense_rnk FROM freight_invoices ORDER BY payment_status, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-021",
    domain: "logistics",
    level: 4,
    order: 21,
    difficulty: "hard",
    title: "FREIGHT INVOICES: Previous Record Lag Comparison by payment status",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Retrieve preceding total_billed for each payment_status record in freight_invoices to measure operational step changes.",
    context_notes: "Analytic logistics computation on freight_invoices utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","freight_invoices"],
    expected_columns: ["id","payment_status","total_billed","prev_total_billed"],
    reference_sql: "SELECT id, payment_status, total_billed, LAG(total_billed, 1) OVER (PARTITION BY payment_status ORDER BY id, id) AS prev_total_billed FROM freight_invoices ORDER BY payment_status, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-022",
    domain: "logistics",
    level: 4,
    order: 22,
    difficulty: "hard",
    title: "FREIGHT INVOICES: Next Record Lead Projection by payment status",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compare each record's total_billed with the subsequent record's total_billed within payment_status in freight_invoices.",
    context_notes: "Analytic logistics computation on freight_invoices utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","freight_invoices"],
    expected_columns: ["id","payment_status","total_billed","next_total_billed"],
    reference_sql: "SELECT id, payment_status, total_billed, LEAD(total_billed, 1) OVER (PARTITION BY payment_status ORDER BY id, id) AS next_total_billed FROM freight_invoices ORDER BY payment_status, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-023",
    domain: "logistics",
    level: 4,
    order: 23,
    difficulty: "hard",
    title: "FREIGHT INVOICES: Cohort Average Benchmark by payment status",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Benchmark individual total_billed against the cohort average total_billed across the same payment_status in freight_invoices.",
    context_notes: "Analytic logistics computation on freight_invoices utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","freight_invoices"],
    expected_columns: ["id","payment_status","total_billed","avg_total_billed_cohort"],
    reference_sql: "SELECT id, payment_status, total_billed, AVG(total_billed) OVER (PARTITION BY payment_status) AS avg_total_billed_cohort FROM freight_invoices ORDER BY payment_status, total_billed DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-024",
    domain: "logistics",
    level: 4,
    order: 24,
    difficulty: "hard",
    title: "FREIGHT INVOICES: Quartile Distribution by payment status",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Distribute records in freight_invoices into 4 equal quartiles based on total_billed within each payment_status.",
    context_notes: "Analytic logistics computation on freight_invoices utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","freight_invoices"],
    expected_columns: ["id","payment_status","total_billed","quartile"],
    reference_sql: "SELECT id, payment_status, total_billed, NTILE(4) OVER (PARTITION BY payment_status ORDER BY total_billed DESC) AS quartile FROM freight_invoices ORDER BY payment_status, quartile, total_billed DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-025",
    domain: "logistics",
    level: 4,
    order: 25,
    difficulty: "hard",
    title: "FUEL LOGS: Running Total by vehicle id",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute the cumulative running total of gallons partitioned by vehicle_id in fuel_logs, ordered by log_date.",
    context_notes: "Analytic logistics computation on fuel_logs utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","fuel_logs"],
    expected_columns: ["id","vehicle_id","gallons","running_gallons"],
    reference_sql: "SELECT id, vehicle_id, gallons, SUM(gallons) OVER (PARTITION BY vehicle_id ORDER BY log_date, id) AS running_gallons FROM fuel_logs ORDER BY vehicle_id, log_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-026",
    domain: "logistics",
    level: 4,
    order: 26,
    difficulty: "hard",
    title: "FUEL LOGS: Rank by Magnitude by vehicle id",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Rank records within each vehicle_id in fuel_logs based on gallons descending.",
    context_notes: "Analytic logistics computation on fuel_logs utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","fuel_logs"],
    expected_columns: ["id","vehicle_id","gallons","rnk"],
    reference_sql: "SELECT id, vehicle_id, gallons, RANK() OVER (PARTITION BY vehicle_id ORDER BY gallons DESC) AS rnk FROM fuel_logs ORDER BY vehicle_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-027",
    domain: "logistics",
    level: 4,
    order: 27,
    difficulty: "hard",
    title: "FUEL LOGS: Dense Rank by Magnitude by vehicle id",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute dense ranking of gallons within each vehicle_id in fuel_logs.",
    context_notes: "Analytic logistics computation on fuel_logs utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","fuel_logs"],
    expected_columns: ["id","vehicle_id","gallons","dense_rnk"],
    reference_sql: "SELECT id, vehicle_id, gallons, DENSE_RANK() OVER (PARTITION BY vehicle_id ORDER BY gallons DESC) AS dense_rnk FROM fuel_logs ORDER BY vehicle_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-028",
    domain: "logistics",
    level: 4,
    order: 28,
    difficulty: "hard",
    title: "FUEL LOGS: Previous Record Lag Comparison by vehicle id",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Retrieve preceding gallons for each vehicle_id record in fuel_logs to measure operational step changes.",
    context_notes: "Analytic logistics computation on fuel_logs utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","fuel_logs"],
    expected_columns: ["id","vehicle_id","gallons","prev_gallons"],
    reference_sql: "SELECT id, vehicle_id, gallons, LAG(gallons, 1) OVER (PARTITION BY vehicle_id ORDER BY log_date, id) AS prev_gallons FROM fuel_logs ORDER BY vehicle_id, log_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-029",
    domain: "logistics",
    level: 4,
    order: 29,
    difficulty: "hard",
    title: "FUEL LOGS: Next Record Lead Projection by vehicle id",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compare each record's gallons with the subsequent record's gallons within vehicle_id in fuel_logs.",
    context_notes: "Analytic logistics computation on fuel_logs utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","fuel_logs"],
    expected_columns: ["id","vehicle_id","gallons","next_gallons"],
    reference_sql: "SELECT id, vehicle_id, gallons, LEAD(gallons, 1) OVER (PARTITION BY vehicle_id ORDER BY log_date, id) AS next_gallons FROM fuel_logs ORDER BY vehicle_id, log_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-030",
    domain: "logistics",
    level: 4,
    order: 30,
    difficulty: "hard",
    title: "FUEL LOGS: Cohort Average Benchmark by vehicle id",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Benchmark individual gallons against the cohort average gallons across the same vehicle_id in fuel_logs.",
    context_notes: "Analytic logistics computation on fuel_logs utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","fuel_logs"],
    expected_columns: ["id","vehicle_id","gallons","avg_gallons_cohort"],
    reference_sql: "SELECT id, vehicle_id, gallons, AVG(gallons) OVER (PARTITION BY vehicle_id) AS avg_gallons_cohort FROM fuel_logs ORDER BY vehicle_id, gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-031",
    domain: "logistics",
    level: 4,
    order: 31,
    difficulty: "hard",
    title: "FUEL LOGS: Quartile Distribution by vehicle id",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Distribute records in fuel_logs into 4 equal quartiles based on gallons within each vehicle_id.",
    context_notes: "Analytic logistics computation on fuel_logs utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","fuel_logs"],
    expected_columns: ["id","vehicle_id","gallons","quartile"],
    reference_sql: "SELECT id, vehicle_id, gallons, NTILE(4) OVER (PARTITION BY vehicle_id ORDER BY gallons DESC) AS quartile FROM fuel_logs ORDER BY vehicle_id, quartile, gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-032",
    domain: "logistics",
    level: 4,
    order: 32,
    difficulty: "hard",
    title: "MAINTENANCE RECORDS: Running Total by service type",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute the cumulative running total of cost partitioned by service_type in maintenance_records, ordered by id.",
    context_notes: "Analytic logistics computation on maintenance_records utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","maintenance_records"],
    expected_columns: ["id","service_type","cost","running_cost"],
    reference_sql: "SELECT id, service_type, cost, SUM(cost) OVER (PARTITION BY service_type ORDER BY id, id) AS running_cost FROM maintenance_records ORDER BY service_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-033",
    domain: "logistics",
    level: 4,
    order: 33,
    difficulty: "hard",
    title: "MAINTENANCE RECORDS: Rank by Magnitude by service type",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Rank records within each service_type in maintenance_records based on cost descending.",
    context_notes: "Analytic logistics computation on maintenance_records utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","maintenance_records"],
    expected_columns: ["id","service_type","cost","rnk"],
    reference_sql: "SELECT id, service_type, cost, RANK() OVER (PARTITION BY service_type ORDER BY cost DESC) AS rnk FROM maintenance_records ORDER BY service_type, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-034",
    domain: "logistics",
    level: 4,
    order: 34,
    difficulty: "hard",
    title: "MAINTENANCE RECORDS: Dense Rank by Magnitude by service type",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute dense ranking of cost within each service_type in maintenance_records.",
    context_notes: "Analytic logistics computation on maintenance_records utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","maintenance_records"],
    expected_columns: ["id","service_type","cost","dense_rnk"],
    reference_sql: "SELECT id, service_type, cost, DENSE_RANK() OVER (PARTITION BY service_type ORDER BY cost DESC) AS dense_rnk FROM maintenance_records ORDER BY service_type, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-035",
    domain: "logistics",
    level: 4,
    order: 35,
    difficulty: "hard",
    title: "MAINTENANCE RECORDS: Previous Record Lag Comparison by service type",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Retrieve preceding cost for each service_type record in maintenance_records to measure operational step changes.",
    context_notes: "Analytic logistics computation on maintenance_records utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","maintenance_records"],
    expected_columns: ["id","service_type","cost","prev_cost"],
    reference_sql: "SELECT id, service_type, cost, LAG(cost, 1) OVER (PARTITION BY service_type ORDER BY id, id) AS prev_cost FROM maintenance_records ORDER BY service_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-036",
    domain: "logistics",
    level: 4,
    order: 36,
    difficulty: "hard",
    title: "MAINTENANCE RECORDS: Next Record Lead Projection by service type",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compare each record's cost with the subsequent record's cost within service_type in maintenance_records.",
    context_notes: "Analytic logistics computation on maintenance_records utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","maintenance_records"],
    expected_columns: ["id","service_type","cost","next_cost"],
    reference_sql: "SELECT id, service_type, cost, LEAD(cost, 1) OVER (PARTITION BY service_type ORDER BY id, id) AS next_cost FROM maintenance_records ORDER BY service_type, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-037",
    domain: "logistics",
    level: 4,
    order: 37,
    difficulty: "hard",
    title: "MAINTENANCE RECORDS: Cohort Average Benchmark by service type",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Benchmark individual cost against the cohort average cost across the same service_type in maintenance_records.",
    context_notes: "Analytic logistics computation on maintenance_records utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","maintenance_records"],
    expected_columns: ["id","service_type","cost","avg_cost_cohort"],
    reference_sql: "SELECT id, service_type, cost, AVG(cost) OVER (PARTITION BY service_type) AS avg_cost_cohort FROM maintenance_records ORDER BY service_type, cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-038",
    domain: "logistics",
    level: 4,
    order: 38,
    difficulty: "hard",
    title: "MAINTENANCE RECORDS: Quartile Distribution by service type",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Distribute records in maintenance_records into 4 equal quartiles based on cost within each service_type.",
    context_notes: "Analytic logistics computation on maintenance_records utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","maintenance_records"],
    expected_columns: ["id","service_type","cost","quartile"],
    reference_sql: "SELECT id, service_type, cost, NTILE(4) OVER (PARTITION BY service_type ORDER BY cost DESC) AS quartile FROM maintenance_records ORDER BY service_type, quartile, cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-039",
    domain: "logistics",
    level: 4,
    order: 39,
    difficulty: "hard",
    title: "SHIPMENTS: Running Total by warehouse id",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute the cumulative running total of weight_kg partitioned by warehouse_id in shipments, ordered by id.",
    context_notes: "Analytic logistics computation on shipments utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","shipments"],
    expected_columns: ["id","warehouse_id","weight_kg","running_weight_kg"],
    reference_sql: "SELECT id, warehouse_id, weight_kg, SUM(weight_kg) OVER (PARTITION BY warehouse_id ORDER BY id, id) AS running_weight_kg FROM shipments ORDER BY warehouse_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-040",
    domain: "logistics",
    level: 4,
    order: 40,
    difficulty: "hard",
    title: "SHIPMENTS: Rank by Magnitude by warehouse id",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Rank records within each warehouse_id in shipments based on weight_kg descending.",
    context_notes: "Analytic logistics computation on shipments utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","shipments"],
    expected_columns: ["id","warehouse_id","weight_kg","rnk"],
    reference_sql: "SELECT id, warehouse_id, weight_kg, RANK() OVER (PARTITION BY warehouse_id ORDER BY weight_kg DESC) AS rnk FROM shipments ORDER BY warehouse_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-041",
    domain: "logistics",
    level: 4,
    order: 41,
    difficulty: "hard",
    title: "SHIPMENTS: Dense Rank by Magnitude by warehouse id",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute dense ranking of weight_kg within each warehouse_id in shipments.",
    context_notes: "Analytic logistics computation on shipments utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","shipments"],
    expected_columns: ["id","warehouse_id","weight_kg","dense_rnk"],
    reference_sql: "SELECT id, warehouse_id, weight_kg, DENSE_RANK() OVER (PARTITION BY warehouse_id ORDER BY weight_kg DESC) AS dense_rnk FROM shipments ORDER BY warehouse_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-042",
    domain: "logistics",
    level: 4,
    order: 42,
    difficulty: "hard",
    title: "SHIPMENTS: Previous Record Lag Comparison by warehouse id",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Retrieve preceding weight_kg for each warehouse_id record in shipments to measure operational step changes.",
    context_notes: "Analytic logistics computation on shipments utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","shipments"],
    expected_columns: ["id","warehouse_id","weight_kg","prev_weight_kg"],
    reference_sql: "SELECT id, warehouse_id, weight_kg, LAG(weight_kg, 1) OVER (PARTITION BY warehouse_id ORDER BY id, id) AS prev_weight_kg FROM shipments ORDER BY warehouse_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-043",
    domain: "logistics",
    level: 4,
    order: 43,
    difficulty: "hard",
    title: "SHIPMENTS: Next Record Lead Projection by warehouse id",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compare each record's weight_kg with the subsequent record's weight_kg within warehouse_id in shipments.",
    context_notes: "Analytic logistics computation on shipments utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","shipments"],
    expected_columns: ["id","warehouse_id","weight_kg","next_weight_kg"],
    reference_sql: "SELECT id, warehouse_id, weight_kg, LEAD(weight_kg, 1) OVER (PARTITION BY warehouse_id ORDER BY id, id) AS next_weight_kg FROM shipments ORDER BY warehouse_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-044",
    domain: "logistics",
    level: 4,
    order: 44,
    difficulty: "hard",
    title: "SHIPMENTS: Cohort Average Benchmark by warehouse id",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Benchmark individual weight_kg against the cohort average weight_kg across the same warehouse_id in shipments.",
    context_notes: "Analytic logistics computation on shipments utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","shipments"],
    expected_columns: ["id","warehouse_id","weight_kg","avg_weight_kg_cohort"],
    reference_sql: "SELECT id, warehouse_id, weight_kg, AVG(weight_kg) OVER (PARTITION BY warehouse_id) AS avg_weight_kg_cohort FROM shipments ORDER BY warehouse_id, weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-045",
    domain: "logistics",
    level: 4,
    order: 45,
    difficulty: "hard",
    title: "SHIPMENTS: Quartile Distribution by warehouse id",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Distribute records in shipments into 4 equal quartiles based on weight_kg within each warehouse_id.",
    context_notes: "Analytic logistics computation on shipments utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","shipments"],
    expected_columns: ["id","warehouse_id","weight_kg","quartile"],
    reference_sql: "SELECT id, warehouse_id, weight_kg, NTILE(4) OVER (PARTITION BY warehouse_id ORDER BY weight_kg DESC) AS quartile FROM shipments ORDER BY warehouse_id, quartile, weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-046",
    domain: "logistics",
    level: 4,
    order: 46,
    difficulty: "hard",
    title: "CARGO PACKAGES: Running Total by shipment id",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute the cumulative running total of declared_value partitioned by shipment_id in cargo_packages, ordered by id.",
    context_notes: "Analytic logistics computation on cargo_packages utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","cargo_packages"],
    expected_columns: ["id","shipment_id","declared_value","running_declared_value"],
    reference_sql: "SELECT id, shipment_id, declared_value, SUM(declared_value) OVER (PARTITION BY shipment_id ORDER BY id, id) AS running_declared_value FROM cargo_packages ORDER BY shipment_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-047",
    domain: "logistics",
    level: 4,
    order: 47,
    difficulty: "hard",
    title: "CARGO PACKAGES: Rank by Magnitude by shipment id",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Rank records within each shipment_id in cargo_packages based on declared_value descending.",
    context_notes: "Analytic logistics computation on cargo_packages utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","cargo_packages"],
    expected_columns: ["id","shipment_id","declared_value","rnk"],
    reference_sql: "SELECT id, shipment_id, declared_value, RANK() OVER (PARTITION BY shipment_id ORDER BY declared_value DESC) AS rnk FROM cargo_packages ORDER BY shipment_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-048",
    domain: "logistics",
    level: 4,
    order: 48,
    difficulty: "hard",
    title: "CARGO PACKAGES: Dense Rank by Magnitude by shipment id",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute dense ranking of declared_value within each shipment_id in cargo_packages.",
    context_notes: "Analytic logistics computation on cargo_packages utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","cargo_packages"],
    expected_columns: ["id","shipment_id","declared_value","dense_rnk"],
    reference_sql: "SELECT id, shipment_id, declared_value, DENSE_RANK() OVER (PARTITION BY shipment_id ORDER BY declared_value DESC) AS dense_rnk FROM cargo_packages ORDER BY shipment_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-049",
    domain: "logistics",
    level: 4,
    order: 49,
    difficulty: "hard",
    title: "CARGO PACKAGES: Previous Record Lag Comparison by shipment id",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Retrieve preceding declared_value for each shipment_id record in cargo_packages to measure operational step changes.",
    context_notes: "Analytic logistics computation on cargo_packages utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","cargo_packages"],
    expected_columns: ["id","shipment_id","declared_value","prev_declared_value"],
    reference_sql: "SELECT id, shipment_id, declared_value, LAG(declared_value, 1) OVER (PARTITION BY shipment_id ORDER BY id, id) AS prev_declared_value FROM cargo_packages ORDER BY shipment_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-050",
    domain: "logistics",
    level: 4,
    order: 50,
    difficulty: "hard",
    title: "CARGO PACKAGES: Next Record Lead Projection by shipment id",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compare each record's declared_value with the subsequent record's declared_value within shipment_id in cargo_packages.",
    context_notes: "Analytic logistics computation on cargo_packages utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","cargo_packages"],
    expected_columns: ["id","shipment_id","declared_value","next_declared_value"],
    reference_sql: "SELECT id, shipment_id, declared_value, LEAD(declared_value, 1) OVER (PARTITION BY shipment_id ORDER BY id, id) AS next_declared_value FROM cargo_packages ORDER BY shipment_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-051",
    domain: "logistics",
    level: 4,
    order: 51,
    difficulty: "hard",
    title: "CARGO PACKAGES: Cohort Average Benchmark by shipment id",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Benchmark individual declared_value against the cohort average declared_value across the same shipment_id in cargo_packages.",
    context_notes: "Analytic logistics computation on cargo_packages utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","cargo_packages"],
    expected_columns: ["id","shipment_id","declared_value","avg_declared_value_cohort"],
    reference_sql: "SELECT id, shipment_id, declared_value, AVG(declared_value) OVER (PARTITION BY shipment_id) AS avg_declared_value_cohort FROM cargo_packages ORDER BY shipment_id, declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-052",
    domain: "logistics",
    level: 4,
    order: 52,
    difficulty: "hard",
    title: "CARGO PACKAGES: Quartile Distribution by shipment id",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Distribute records in cargo_packages into 4 equal quartiles based on declared_value within each shipment_id.",
    context_notes: "Analytic logistics computation on cargo_packages utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","cargo_packages"],
    expected_columns: ["id","shipment_id","declared_value","quartile"],
    reference_sql: "SELECT id, shipment_id, declared_value, NTILE(4) OVER (PARTITION BY shipment_id ORDER BY declared_value DESC) AS quartile FROM cargo_packages ORDER BY shipment_id, quartile, declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-053",
    domain: "logistics",
    level: 4,
    order: 53,
    difficulty: "hard",
    title: "PARTS INVENTORY: Running Total by warehouse id",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute the cumulative running total of quantity_in_stock partitioned by warehouse_id in parts_inventory, ordered by id.",
    context_notes: "Analytic logistics computation on parts_inventory utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","parts_inventory"],
    expected_columns: ["id","warehouse_id","quantity_in_stock","running_quantity_in_stock"],
    reference_sql: "SELECT id, warehouse_id, quantity_in_stock, SUM(quantity_in_stock) OVER (PARTITION BY warehouse_id ORDER BY id, id) AS running_quantity_in_stock FROM parts_inventory ORDER BY warehouse_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-054",
    domain: "logistics",
    level: 4,
    order: 54,
    difficulty: "hard",
    title: "PARTS INVENTORY: Rank by Magnitude by warehouse id",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Rank records within each warehouse_id in parts_inventory based on quantity_in_stock descending.",
    context_notes: "Analytic logistics computation on parts_inventory utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","parts_inventory"],
    expected_columns: ["id","warehouse_id","quantity_in_stock","rnk"],
    reference_sql: "SELECT id, warehouse_id, quantity_in_stock, RANK() OVER (PARTITION BY warehouse_id ORDER BY quantity_in_stock DESC) AS rnk FROM parts_inventory ORDER BY warehouse_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-055",
    domain: "logistics",
    level: 4,
    order: 55,
    difficulty: "hard",
    title: "PARTS INVENTORY: Dense Rank by Magnitude by warehouse id",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute dense ranking of quantity_in_stock within each warehouse_id in parts_inventory.",
    context_notes: "Analytic logistics computation on parts_inventory utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","parts_inventory"],
    expected_columns: ["id","warehouse_id","quantity_in_stock","dense_rnk"],
    reference_sql: "SELECT id, warehouse_id, quantity_in_stock, DENSE_RANK() OVER (PARTITION BY warehouse_id ORDER BY quantity_in_stock DESC) AS dense_rnk FROM parts_inventory ORDER BY warehouse_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-056",
    domain: "logistics",
    level: 4,
    order: 56,
    difficulty: "hard",
    title: "PARTS INVENTORY: Previous Record Lag Comparison by warehouse id",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Retrieve preceding quantity_in_stock for each warehouse_id record in parts_inventory to measure operational step changes.",
    context_notes: "Analytic logistics computation on parts_inventory utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","parts_inventory"],
    expected_columns: ["id","warehouse_id","quantity_in_stock","prev_quantity_in_stock"],
    reference_sql: "SELECT id, warehouse_id, quantity_in_stock, LAG(quantity_in_stock, 1) OVER (PARTITION BY warehouse_id ORDER BY id, id) AS prev_quantity_in_stock FROM parts_inventory ORDER BY warehouse_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-057",
    domain: "logistics",
    level: 4,
    order: 57,
    difficulty: "hard",
    title: "PARTS INVENTORY: Next Record Lead Projection by warehouse id",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compare each record's quantity_in_stock with the subsequent record's quantity_in_stock within warehouse_id in parts_inventory.",
    context_notes: "Analytic logistics computation on parts_inventory utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","parts_inventory"],
    expected_columns: ["id","warehouse_id","quantity_in_stock","next_quantity_in_stock"],
    reference_sql: "SELECT id, warehouse_id, quantity_in_stock, LEAD(quantity_in_stock, 1) OVER (PARTITION BY warehouse_id ORDER BY id, id) AS next_quantity_in_stock FROM parts_inventory ORDER BY warehouse_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-058",
    domain: "logistics",
    level: 4,
    order: 58,
    difficulty: "hard",
    title: "PARTS INVENTORY: Cohort Average Benchmark by warehouse id",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Benchmark individual quantity_in_stock against the cohort average quantity_in_stock across the same warehouse_id in parts_inventory.",
    context_notes: "Analytic logistics computation on parts_inventory utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","parts_inventory"],
    expected_columns: ["id","warehouse_id","quantity_in_stock","avg_quantity_in_stock_cohort"],
    reference_sql: "SELECT id, warehouse_id, quantity_in_stock, AVG(quantity_in_stock) OVER (PARTITION BY warehouse_id) AS avg_quantity_in_stock_cohort FROM parts_inventory ORDER BY warehouse_id, quantity_in_stock DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-059",
    domain: "logistics",
    level: 4,
    order: 59,
    difficulty: "hard",
    title: "PARTS INVENTORY: Quartile Distribution by warehouse id",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Distribute records in parts_inventory into 4 equal quartiles based on quantity_in_stock within each warehouse_id.",
    context_notes: "Analytic logistics computation on parts_inventory utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","parts_inventory"],
    expected_columns: ["id","warehouse_id","quantity_in_stock","quartile"],
    reference_sql: "SELECT id, warehouse_id, quantity_in_stock, NTILE(4) OVER (PARTITION BY warehouse_id ORDER BY quantity_in_stock DESC) AS quartile FROM parts_inventory ORDER BY warehouse_id, quartile, quantity_in_stock DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-060",
    domain: "logistics",
    level: 4,
    order: 60,
    difficulty: "hard",
    title: "Logistics Window Metric #60",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-061",
    domain: "logistics",
    level: 4,
    order: 61,
    difficulty: "hard",
    title: "Logistics Window Metric #61",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-062",
    domain: "logistics",
    level: 4,
    order: 62,
    difficulty: "hard",
    title: "Logistics Window Metric #62",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-063",
    domain: "logistics",
    level: 4,
    order: 63,
    difficulty: "hard",
    title: "Logistics Window Metric #63",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-064",
    domain: "logistics",
    level: 4,
    order: 64,
    difficulty: "hard",
    title: "Logistics Window Metric #64",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-065",
    domain: "logistics",
    level: 4,
    order: 65,
    difficulty: "hard",
    title: "Logistics Window Metric #65",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-066",
    domain: "logistics",
    level: 4,
    order: 66,
    difficulty: "hard",
    title: "Logistics Window Metric #66",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-067",
    domain: "logistics",
    level: 4,
    order: 67,
    difficulty: "hard",
    title: "Logistics Window Metric #67",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-068",
    domain: "logistics",
    level: 4,
    order: 68,
    difficulty: "hard",
    title: "Logistics Window Metric #68",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-069",
    domain: "logistics",
    level: 4,
    order: 69,
    difficulty: "hard",
    title: "Logistics Window Metric #69",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-070",
    domain: "logistics",
    level: 4,
    order: 70,
    difficulty: "hard",
    title: "Logistics Window Metric #70",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-071",
    domain: "logistics",
    level: 4,
    order: 71,
    difficulty: "hard",
    title: "Logistics Window Metric #71",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-072",
    domain: "logistics",
    level: 4,
    order: 72,
    difficulty: "hard",
    title: "Logistics Window Metric #72",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-073",
    domain: "logistics",
    level: 4,
    order: 73,
    difficulty: "hard",
    title: "Logistics Window Metric #73",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-074",
    domain: "logistics",
    level: 4,
    order: 74,
    difficulty: "hard",
    title: "Logistics Window Metric #74",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-075",
    domain: "logistics",
    level: 4,
    order: 75,
    difficulty: "hard",
    title: "Logistics Window Metric #75",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-076",
    domain: "logistics",
    level: 4,
    order: 76,
    difficulty: "hard",
    title: "Logistics Window Metric #76",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-077",
    domain: "logistics",
    level: 4,
    order: 77,
    difficulty: "hard",
    title: "Logistics Window Metric #77",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-078",
    domain: "logistics",
    level: 4,
    order: 78,
    difficulty: "hard",
    title: "Logistics Window Metric #78",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-079",
    domain: "logistics",
    level: 4,
    order: 79,
    difficulty: "hard",
    title: "Logistics Window Metric #79",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-080",
    domain: "logistics",
    level: 4,
    order: 80,
    difficulty: "hard",
    title: "Logistics Window Metric #80",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-081",
    domain: "logistics",
    level: 4,
    order: 81,
    difficulty: "hard",
    title: "Logistics Window Metric #81",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-082",
    domain: "logistics",
    level: 4,
    order: 82,
    difficulty: "hard",
    title: "Logistics Window Metric #82",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-083",
    domain: "logistics",
    level: 4,
    order: 83,
    difficulty: "hard",
    title: "Logistics Window Metric #83",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-084",
    domain: "logistics",
    level: 4,
    order: 84,
    difficulty: "hard",
    title: "Logistics Window Metric #84",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-085",
    domain: "logistics",
    level: 4,
    order: 85,
    difficulty: "hard",
    title: "Logistics Window Metric #85",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-086",
    domain: "logistics",
    level: 4,
    order: 86,
    difficulty: "hard",
    title: "Logistics Window Metric #86",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-087",
    domain: "logistics",
    level: 4,
    order: 87,
    difficulty: "hard",
    title: "Logistics Window Metric #87",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-088",
    domain: "logistics",
    level: 4,
    order: 88,
    difficulty: "hard",
    title: "Logistics Window Metric #88",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-089",
    domain: "logistics",
    level: 4,
    order: 89,
    difficulty: "hard",
    title: "Logistics Window Metric #89",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-090",
    domain: "logistics",
    level: 4,
    order: 90,
    difficulty: "hard",
    title: "Logistics Window Metric #90",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-091",
    domain: "logistics",
    level: 4,
    order: 91,
    difficulty: "hard",
    title: "Logistics Window Metric #91",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-092",
    domain: "logistics",
    level: 4,
    order: 92,
    difficulty: "hard",
    title: "Logistics Window Metric #92",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-093",
    domain: "logistics",
    level: 4,
    order: 93,
    difficulty: "hard",
    title: "Logistics Window Metric #93",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-094",
    domain: "logistics",
    level: 4,
    order: 94,
    difficulty: "hard",
    title: "Logistics Window Metric #94",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-095",
    domain: "logistics",
    level: 4,
    order: 95,
    difficulty: "hard",
    title: "Logistics Window Metric #95",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-096",
    domain: "logistics",
    level: 4,
    order: 96,
    difficulty: "hard",
    title: "Logistics Window Metric #96",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-097",
    domain: "logistics",
    level: 4,
    order: 97,
    difficulty: "hard",
    title: "Logistics Window Metric #97",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-098",
    domain: "logistics",
    level: 4,
    order: 98,
    difficulty: "hard",
    title: "Logistics Window Metric #98",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-099",
    domain: "logistics",
    level: 4,
    order: 99,
    difficulty: "hard",
    title: "Logistics Window Metric #99",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "log-L4-100",
    domain: "logistics",
    level: 4,
    order: 100,
    difficulty: "hard",
    title: "Logistics Window Metric #100",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Compute running cumulative duty amounts partitioned by port_of_entry. Show id, port_of_entry, duty_amount, and cumulative duty.",
    context_notes: "Customs duty tracking over international arrival ports.",
    concepts: ["Window Functions","SUM() OVER","customs_declarations"],
    expected_columns: ["id","port_of_entry","duty_amount","cumulative_duty"],
    reference_sql: "SELECT id, port_of_entry, duty_amount, SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id) AS cumulative_duty FROM customs_declarations ORDER BY port_of_entry, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(duty_amount) OVER (PARTITION BY port_of_entry ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  }
];
