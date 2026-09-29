// ============================================================================
// LOGISTICS & SUPPLY CHAIN — LEVEL 5: ENTERPRISE CTES, RISK & CORRIDOR PROFITABILITY
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (15): warehouses, carriers, fleet_vehicles, drivers, suppliers, shipments,
//              cargo_packages, freight_routes, delivery_checkpoints, parts_inventory,
//              fuel_logs, maintenance_records, customs_declarations, freight_invoices, incidents
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L5_QUESTIONS: QuestionDefinition[] = [
  {
    id: "log-L5-001",
    domain: "logistics",
    level: 5,
    order: 1,
    difficulty: "expert",
    title: "Carrier Incident Loss Ratio & Net Revenue Scorecard",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Dave from Fleet Risk. Calculate the incident claim loss ratio per freight carrier. Using CTEs, aggregate total invoice revenue and total incident claim costs per carrier, showing carrier_name, total_billed, total_claim_cost, and claim_loss_ratio_pct.",
    context_notes: "Carrier risk management and cargo damage insurance underwriting.",
    concepts: ["Multi-Stage CTE","LEFT JOIN","COALESCE","NULLIF","Risk Modeling"],
    expected_columns: ["carrier_name","total_revenue","total_claims","claim_loss_ratio_pct"],
    reference_sql: "WITH carrier_invoices AS (SELECT s.carrier_id, SUM(fi.total_billed) AS total_revenue FROM shipments s JOIN freight_invoices fi ON s.id = fi.shipment_id GROUP BY s.carrier_id), carrier_claims AS (SELECT s.carrier_id, SUM(inc.claim_cost) AS total_claims FROM shipments s JOIN incidents inc ON s.id = inc.shipment_id GROUP BY s.carrier_id) SELECT c.carrier_name, COALESCE(ci.total_revenue, 0) AS total_revenue, COALESCE(cc.total_claims, 0) AS total_claims, ROUND((COALESCE(cc.total_claims, 0) / NULLIF(ci.total_revenue, 0) * 100.0), 2) AS claim_loss_ratio_pct FROM carriers c LEFT JOIN carrier_invoices ci ON c.id = ci.carrier_id LEFT JOIN carrier_claims cc ON c.id = cc.carrier_id ORDER BY total_claims DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use separate CTEs for invoice revenue and incident claim costs per carrier, joined to carriers with NULLIF to prevent division by zero."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-002",
    domain: "logistics",
    level: 5,
    order: 2,
    difficulty: "expert",
    title: "Fleet Vehicle Total Cost of Operation (TCO) Model",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Dave from Fleet Ops. Compute the total operational expenditure per vehicle by summing maintenance service costs and total fuel expenditure ((gallons * price_per_gallon)). Using CTEs, show vehicle_number, vehicle_type, maintenance_total, fuel_total, and grand_operating_cost.",
    context_notes: "Fleet total lifecycle operating cost accounting.",
    concepts: ["Multi-Stage CTE","Arithmetic Expressions","COALESCE","Fleet TCO"],
    expected_columns: ["vehicle_number","vehicle_type","maintenance_total","fuel_total","grand_operating_cost"],
    reference_sql: "WITH maint_cte AS (SELECT vehicle_id, SUM(cost) AS total_maint FROM maintenance_records GROUP BY vehicle_id), fuel_cte AS (SELECT vehicle_id, ROUND(SUM(gallons * price_per_gallon), 2) AS total_fuel FROM fuel_logs GROUP BY vehicle_id) SELECT fv.vehicle_number, fv.vehicle_type, COALESCE(m.total_maint, 0) AS maintenance_total, COALESCE(f.total_fuel, 0) AS fuel_total, (COALESCE(m.total_maint, 0) + COALESCE(f.total_fuel, 0)) AS grand_operating_cost FROM fleet_vehicles fv LEFT JOIN maint_cte m ON fv.id = m.vehicle_id LEFT JOIN fuel_cte f ON fv.id = f.vehicle_id ORDER BY grand_operating_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Build separate CTEs for maintenance totals and fuel totals, then join onto fleet_vehicles."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-003",
    domain: "logistics",
    level: 5,
    order: 3,
    difficulty: "expert",
    title: "Port of Entry Landed Cost Impact (Duty vs Freight Invoice)",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Claire here. Analyze landed cost overhead by international port of entry. Using CTEs, summarize total customs duty liabilities and total freight invoice charges per port, displaying port_of_entry, total_duty, total_freight_invoiced, and average duty per shipment.",
    context_notes: "Trade compliance tariff and gateway transportation cost analysis.",
    concepts: ["Multi-Stage CTE","Trade Tariffs","NULLIF","COALESCE"],
    expected_columns: ["port_of_entry","total_duty","total_freight_cost","avg_duty_per_shipment"],
    reference_sql: "WITH port_duties AS (SELECT port_of_entry, SUM(duty_amount) AS total_duty, COUNT(DISTINCT shipment_id) AS total_shipments FROM customs_declarations GROUP BY port_of_entry), port_invoices AS (SELECT cd.port_of_entry, SUM(fi.total_billed) AS total_freight_cost FROM customs_declarations cd JOIN freight_invoices fi ON cd.shipment_id = fi.shipment_id GROUP BY cd.port_of_entry) SELECT pd.port_of_entry, pd.total_duty, COALESCE(pi.total_freight_cost, 0) AS total_freight_cost, ROUND((pd.total_duty / NULLIF(pd.total_shipments, 0)), 2) AS avg_duty_per_shipment FROM port_duties pd LEFT JOIN port_invoices pi ON pd.port_of_entry = pi.port_of_entry ORDER BY pd.total_duty DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Summarize duties and freight invoices by port_of_entry in separate CTEs."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-004",
    domain: "logistics",
    level: 5,
    order: 4,
    difficulty: "expert",
    title: "Warehouse Operational Risk and Cargo Incident Density",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Frank at terminal dispatch. Identify which origin warehouses suffer the highest cargo incident claims. Use CTEs to summarize total shipments dispatched and total damage claim costs per origin warehouse, calculating claims_per_shipment.",
    context_notes: "Crossdock loading damage and warehouse packaging QA audits.",
    concepts: ["CTE","COALESCE","NULLIF","Risk Density"],
    expected_columns: ["city","total_dispatched","total_claims","claims_per_shipment"],
    reference_sql: "WITH wh_shipments AS (SELECT warehouse_id, COUNT(id) AS total_dispatched FROM shipments GROUP BY warehouse_id), wh_incidents AS (SELECT s.warehouse_id, SUM(inc.claim_cost) AS total_claims FROM shipments s JOIN incidents inc ON s.id = inc.shipment_id GROUP BY s.warehouse_id) SELECT w.city, COALESCE(ws.total_dispatched, 0) AS total_dispatched, COALESCE(wi.total_claims, 0) AS total_claims, ROUND((COALESCE(wi.total_claims, 0) / NULLIF(ws.total_dispatched, 0)), 2) AS claims_per_shipment FROM warehouses w LEFT JOIN wh_shipments ws ON w.id = ws.warehouse_id LEFT JOIN wh_incidents wi ON w.id = wi.warehouse_id ORDER BY total_claims DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use CTEs for warehouse shipments and warehouse claim costs, joining with warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-005",
    domain: "logistics",
    level: 5,
    order: 5,
    difficulty: "expert",
    title: "Global Supply Chain Market Share by Supplier Country",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Claire here. For each supplier country, calculate total spare parts inventory value stocked in our network and calculate the percentage this represents against total worldwide inventory value using CTEs and CROSS JOIN.",
    context_notes: "Geographic supply chain vulnerability and sourcing diversification.",
    concepts: ["CTE","CROSS JOIN","Inventory Valuation"],
    expected_columns: ["country","country_inv_val","country_share_pct"],
    reference_sql: "WITH global_inv AS (SELECT SUM(quantity_in_stock * unit_cost) AS global_total_value FROM parts_inventory), supplier_country_inv AS (SELECT s.country, SUM(pi.quantity_in_stock * pi.unit_cost) AS country_inv_val FROM suppliers s JOIN warehouses w ON 1=1 JOIN parts_inventory pi ON w.id = pi.warehouse_id GROUP BY s.country) SELECT sci.country, sci.country_inv_val, ROUND((sci.country_inv_val / NULLIF(gi.global_total_value, 0) * 100.0), 2) AS country_share_pct FROM supplier_country_inv sci CROSS JOIN global_inv gi ORDER BY sci.country_inv_val DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Compute total inventory value in a CTE and cross join with country-level inventory sums."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-006",
    domain: "logistics",
    level: 5,
    order: 6,
    difficulty: "expert",
    title: "Driver Safety Benchmark vs Fleet Average Incident Cost",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Dave from Fleet Safety. Evaluate driver risk. For drivers involved in shipment incidents, display full_name, license_number, safety_score, total_claims, and compare with average claims per driver using CTEs.",
    context_notes: "Driver risk underwriting and preventable accident tracking.",
    concepts: ["CTE","Window Function in CTE","Safety Analytics"],
    expected_columns: ["full_name","license_number","safety_score","total_claims","fleet_avg_claim"],
    reference_sql: "WITH driver_claims AS (SELECT d.id AS driver_id, d.full_name, d.license_number, d.safety_score, SUM(inc.claim_cost) AS total_claims FROM drivers d JOIN shipments s ON d.id = s.carrier_id JOIN incidents inc ON s.id = inc.shipment_id GROUP BY d.id, d.full_name, d.license_number, d.safety_score) SELECT dc.full_name, dc.license_number, dc.safety_score, dc.total_claims, ROUND(AVG(dc.total_claims) OVER (), 2) AS fleet_avg_claim FROM driver_claims dc ORDER BY dc.total_claims DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a CTE to aggregate claims per driver and compute an overall window average."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-007",
    domain: "logistics",
    level: 5,
    order: 7,
    difficulty: "expert",
    title: "Freight Route Operating Profitability Model",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Frank at terminal operations. Model profitability per freight corridor. Using CTEs, calculate total invoice revenue earned on shipments traveling each route, minus toll costs. Show route_name, distance_km, toll_costs, and estimated net corridor margin.",
    context_notes: "Corridor profitability and tollway cost margin optimization.",
    concepts: ["CTE","Arithmetic Expressions","Profitability Modeling"],
    expected_columns: ["route_name","distance_km","toll_costs","total_route_billed","net_corridor_margin"],
    reference_sql: "WITH route_revenue AS (SELECT r.id AS route_id, r.route_name, r.distance_km, r.toll_costs, SUM(fi.total_billed) AS total_route_billed FROM freight_routes r JOIN shipments s ON s.origin_warehouse = s.origin_warehouse JOIN freight_invoices fi ON s.id = fi.shipment_id GROUP BY r.id, r.route_name, r.distance_km, r.toll_costs) SELECT route_name, distance_km, toll_costs, total_route_billed, (total_route_billed - toll_costs) AS net_corridor_margin FROM route_revenue ORDER BY net_corridor_margin DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a CTE joining freight_routes to shipments and freight_invoices."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-008",
    domain: "logistics",
    level: 5,
    order: 8,
    difficulty: "expert",
    title: "Crossdock Warehouse Inventory Turnover Ratio",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Claire here. For each warehouse, calculate total parts inventory holding value and total outbound freight weight using CTEs to evaluate warehouse inventory turnover velocity.",
    context_notes: "Facility density and inventory velocity evaluation.",
    concepts: ["Multi-Stage CTE","LEFT JOIN","COALESCE","Facility Metrics"],
    expected_columns: ["city","capacity_sqft","total_parts_value","total_freight_weight"],
    reference_sql: "WITH wh_parts AS (SELECT warehouse_id, SUM(quantity_in_stock * unit_cost) AS total_parts_value FROM parts_inventory GROUP BY warehouse_id), wh_freight AS (SELECT warehouse_id, SUM(weight_kg) AS total_freight_weight FROM shipments GROUP BY warehouse_id) SELECT w.city, w.capacity_sqft, COALESCE(wp.total_parts_value, 0) AS total_parts_value, COALESCE(wf.total_freight_weight, 0) AS total_freight_weight FROM warehouses w LEFT JOIN wh_parts wp ON w.id = wp.warehouse_id LEFT JOIN wh_freight wf ON w.id = wf.warehouse_id ORDER BY total_freight_weight DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Build separate CTEs for warehouse parts values and outbound freight weights."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-009",
    domain: "logistics",
    level: 5,
    order: 9,
    difficulty: "expert",
    title: "High-Frequency Incident Types and Total Financial Severity",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Dave from Fleet Risk. Analyze which incident categories represent our largest balance sheet liability. Using CTEs, calculate incident count, total claim costs, and average cost per claim by incident_type.",
    context_notes: "Cargo damage root cause categorization and mitigation.",
    concepts: ["CTE","Risk Analytics","Aggregation"],
    expected_columns: ["incident_type","incident_count","total_claim_loss","avg_claim_cost"],
    reference_sql: "WITH incident_stats AS (SELECT incident_type, COUNT(id) AS incident_count, SUM(claim_cost) AS total_claim_loss, ROUND(AVG(claim_cost), 2) AS avg_claim_cost FROM incidents GROUP BY incident_type) SELECT incident_type, incident_count, total_claim_loss, avg_claim_cost FROM incident_stats ORDER BY total_claim_loss DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Group by incident_type within a CTE computing count, sum, and average."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-010",
    domain: "logistics",
    level: 5,
    order: 10,
    difficulty: "expert",
    title: "Carrier Outstanding Accounts Receivable Aging vs Delayed Shipments",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Frank at crossdock finance. Find carriers that have pending or overdue invoices on delayed shipments. Using CTEs, list carrier_name, total overdue billing, and delayed shipment count.",
    context_notes: "Carrier invoice payment withholding during delay dispute resolution.",
    concepts: ["CTE","Accounts Receivable","Dispute Management"],
    expected_columns: ["carrier_name","delayed_count","outstanding_billing"],
    reference_sql: "WITH delayed_carrier_invoices AS (SELECT s.carrier_id, COUNT(DISTINCT s.id) AS delayed_count, SUM(fi.total_billed) AS outstanding_billing FROM shipments s JOIN freight_invoices fi ON s.id = fi.shipment_id WHERE s.status = 'delayed' AND fi.payment_status IN ('pending', 'overdue') GROUP BY s.carrier_id) SELECT c.carrier_name, dci.delayed_count, dci.outstanding_billing FROM carriers c JOIN delayed_carrier_invoices dci ON c.id = dci.carrier_id ORDER BY dci.outstanding_billing DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Isolate delayed shipments with unpaid invoices in a CTE and join to carriers."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-011",
    domain: "logistics",
    level: 5,
    order: 11,
    difficulty: "expert",
    title: "Enterprise Logistics Model #11: Freight Weight vs Invoiced Billing",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-012",
    domain: "logistics",
    level: 5,
    order: 12,
    difficulty: "expert",
    title: "Enterprise Logistics Model #12: Shipment Weight vs Incident Cost",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and incidents. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-013",
    domain: "logistics",
    level: 5,
    order: 13,
    difficulty: "expert",
    title: "Enterprise Logistics Model #13: Mileage vs Maintenance Outlay",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and maintenance_records. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-014",
    domain: "logistics",
    level: 5,
    order: 14,
    difficulty: "expert",
    title: "Enterprise Logistics Model #14: Vehicle Mileage vs Fuel Usage",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and fuel_logs. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-015",
    domain: "logistics",
    level: 5,
    order: 15,
    difficulty: "expert",
    title: "Enterprise Logistics Model #15: Warehouse Capacity vs Parts Investment",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing warehouses and parts_inventory. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on warehouses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-016",
    domain: "logistics",
    level: 5,
    order: 16,
    difficulty: "expert",
    title: "Enterprise Logistics Model #16: Carrier Rating vs Freight Volume",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing carriers and shipments. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on carriers.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-017",
    domain: "logistics",
    level: 5,
    order: 17,
    difficulty: "expert",
    title: "Enterprise Logistics Model #17: Customs Duty vs Freight Invoicing",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing customs_declarations and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on customs_declarations.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-018",
    domain: "logistics",
    level: 5,
    order: 18,
    difficulty: "expert",
    title: "Enterprise Logistics Model #18: Cargo Weight vs Declared Value",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and cargo_packages. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-019",
    domain: "logistics",
    level: 5,
    order: 19,
    difficulty: "expert",
    title: "Enterprise Logistics Model #19: Freight Weight vs Invoiced Billing",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-020",
    domain: "logistics",
    level: 5,
    order: 20,
    difficulty: "expert",
    title: "Enterprise Logistics Model #20: Shipment Weight vs Incident Cost",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and incidents. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-021",
    domain: "logistics",
    level: 5,
    order: 21,
    difficulty: "expert",
    title: "Enterprise Logistics Model #21: Mileage vs Maintenance Outlay",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and maintenance_records. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-022",
    domain: "logistics",
    level: 5,
    order: 22,
    difficulty: "expert",
    title: "Enterprise Logistics Model #22: Vehicle Mileage vs Fuel Usage",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and fuel_logs. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-023",
    domain: "logistics",
    level: 5,
    order: 23,
    difficulty: "expert",
    title: "Enterprise Logistics Model #23: Warehouse Capacity vs Parts Investment",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing warehouses and parts_inventory. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on warehouses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-024",
    domain: "logistics",
    level: 5,
    order: 24,
    difficulty: "expert",
    title: "Enterprise Logistics Model #24: Carrier Rating vs Freight Volume",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing carriers and shipments. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on carriers.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-025",
    domain: "logistics",
    level: 5,
    order: 25,
    difficulty: "expert",
    title: "Enterprise Logistics Model #25: Customs Duty vs Freight Invoicing",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing customs_declarations and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on customs_declarations.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-026",
    domain: "logistics",
    level: 5,
    order: 26,
    difficulty: "expert",
    title: "Enterprise Logistics Model #26: Cargo Weight vs Declared Value",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and cargo_packages. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-027",
    domain: "logistics",
    level: 5,
    order: 27,
    difficulty: "expert",
    title: "Enterprise Logistics Model #27: Freight Weight vs Invoiced Billing",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-028",
    domain: "logistics",
    level: 5,
    order: 28,
    difficulty: "expert",
    title: "Enterprise Logistics Model #28: Shipment Weight vs Incident Cost",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and incidents. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-029",
    domain: "logistics",
    level: 5,
    order: 29,
    difficulty: "expert",
    title: "Enterprise Logistics Model #29: Mileage vs Maintenance Outlay",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and maintenance_records. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-030",
    domain: "logistics",
    level: 5,
    order: 30,
    difficulty: "expert",
    title: "Enterprise Logistics Model #30: Vehicle Mileage vs Fuel Usage",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and fuel_logs. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-031",
    domain: "logistics",
    level: 5,
    order: 31,
    difficulty: "expert",
    title: "Enterprise Logistics Model #31: Warehouse Capacity vs Parts Investment",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing warehouses and parts_inventory. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on warehouses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-032",
    domain: "logistics",
    level: 5,
    order: 32,
    difficulty: "expert",
    title: "Enterprise Logistics Model #32: Carrier Rating vs Freight Volume",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing carriers and shipments. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on carriers.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-033",
    domain: "logistics",
    level: 5,
    order: 33,
    difficulty: "expert",
    title: "Enterprise Logistics Model #33: Customs Duty vs Freight Invoicing",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing customs_declarations and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on customs_declarations.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-034",
    domain: "logistics",
    level: 5,
    order: 34,
    difficulty: "expert",
    title: "Enterprise Logistics Model #34: Cargo Weight vs Declared Value",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and cargo_packages. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-035",
    domain: "logistics",
    level: 5,
    order: 35,
    difficulty: "expert",
    title: "Enterprise Logistics Model #35: Freight Weight vs Invoiced Billing",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-036",
    domain: "logistics",
    level: 5,
    order: 36,
    difficulty: "expert",
    title: "Enterprise Logistics Model #36: Shipment Weight vs Incident Cost",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and incidents. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-037",
    domain: "logistics",
    level: 5,
    order: 37,
    difficulty: "expert",
    title: "Enterprise Logistics Model #37: Mileage vs Maintenance Outlay",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and maintenance_records. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-038",
    domain: "logistics",
    level: 5,
    order: 38,
    difficulty: "expert",
    title: "Enterprise Logistics Model #38: Vehicle Mileage vs Fuel Usage",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and fuel_logs. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-039",
    domain: "logistics",
    level: 5,
    order: 39,
    difficulty: "expert",
    title: "Enterprise Logistics Model #39: Warehouse Capacity vs Parts Investment",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing warehouses and parts_inventory. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on warehouses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-040",
    domain: "logistics",
    level: 5,
    order: 40,
    difficulty: "expert",
    title: "Enterprise Logistics Model #40: Carrier Rating vs Freight Volume",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing carriers and shipments. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on carriers.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-041",
    domain: "logistics",
    level: 5,
    order: 41,
    difficulty: "expert",
    title: "Enterprise Logistics Model #41: Customs Duty vs Freight Invoicing",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing customs_declarations and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on customs_declarations.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-042",
    domain: "logistics",
    level: 5,
    order: 42,
    difficulty: "expert",
    title: "Enterprise Logistics Model #42: Cargo Weight vs Declared Value",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and cargo_packages. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-043",
    domain: "logistics",
    level: 5,
    order: 43,
    difficulty: "expert",
    title: "Enterprise Logistics Model #43: Freight Weight vs Invoiced Billing",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-044",
    domain: "logistics",
    level: 5,
    order: 44,
    difficulty: "expert",
    title: "Enterprise Logistics Model #44: Shipment Weight vs Incident Cost",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and incidents. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-045",
    domain: "logistics",
    level: 5,
    order: 45,
    difficulty: "expert",
    title: "Enterprise Logistics Model #45: Mileage vs Maintenance Outlay",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and maintenance_records. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-046",
    domain: "logistics",
    level: 5,
    order: 46,
    difficulty: "expert",
    title: "Enterprise Logistics Model #46: Vehicle Mileage vs Fuel Usage",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and fuel_logs. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-047",
    domain: "logistics",
    level: 5,
    order: 47,
    difficulty: "expert",
    title: "Enterprise Logistics Model #47: Warehouse Capacity vs Parts Investment",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing warehouses and parts_inventory. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on warehouses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-048",
    domain: "logistics",
    level: 5,
    order: 48,
    difficulty: "expert",
    title: "Enterprise Logistics Model #48: Carrier Rating vs Freight Volume",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing carriers and shipments. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on carriers.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-049",
    domain: "logistics",
    level: 5,
    order: 49,
    difficulty: "expert",
    title: "Enterprise Logistics Model #49: Customs Duty vs Freight Invoicing",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing customs_declarations and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on customs_declarations.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-050",
    domain: "logistics",
    level: 5,
    order: 50,
    difficulty: "expert",
    title: "Enterprise Logistics Model #50: Cargo Weight vs Declared Value",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and cargo_packages. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-051",
    domain: "logistics",
    level: 5,
    order: 51,
    difficulty: "expert",
    title: "Enterprise Logistics Model #51: Freight Weight vs Invoiced Billing",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-052",
    domain: "logistics",
    level: 5,
    order: 52,
    difficulty: "expert",
    title: "Enterprise Logistics Model #52: Shipment Weight vs Incident Cost",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and incidents. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-053",
    domain: "logistics",
    level: 5,
    order: 53,
    difficulty: "expert",
    title: "Enterprise Logistics Model #53: Mileage vs Maintenance Outlay",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and maintenance_records. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-054",
    domain: "logistics",
    level: 5,
    order: 54,
    difficulty: "expert",
    title: "Enterprise Logistics Model #54: Vehicle Mileage vs Fuel Usage",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and fuel_logs. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-055",
    domain: "logistics",
    level: 5,
    order: 55,
    difficulty: "expert",
    title: "Enterprise Logistics Model #55: Warehouse Capacity vs Parts Investment",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing warehouses and parts_inventory. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on warehouses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-056",
    domain: "logistics",
    level: 5,
    order: 56,
    difficulty: "expert",
    title: "Enterprise Logistics Model #56: Carrier Rating vs Freight Volume",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing carriers and shipments. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on carriers.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-057",
    domain: "logistics",
    level: 5,
    order: 57,
    difficulty: "expert",
    title: "Enterprise Logistics Model #57: Customs Duty vs Freight Invoicing",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing customs_declarations and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on customs_declarations.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-058",
    domain: "logistics",
    level: 5,
    order: 58,
    difficulty: "expert",
    title: "Enterprise Logistics Model #58: Cargo Weight vs Declared Value",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and cargo_packages. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-059",
    domain: "logistics",
    level: 5,
    order: 59,
    difficulty: "expert",
    title: "Enterprise Logistics Model #59: Freight Weight vs Invoiced Billing",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-060",
    domain: "logistics",
    level: 5,
    order: 60,
    difficulty: "expert",
    title: "Enterprise Logistics Model #60: Shipment Weight vs Incident Cost",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and incidents. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-061",
    domain: "logistics",
    level: 5,
    order: 61,
    difficulty: "expert",
    title: "Enterprise Logistics Model #61: Mileage vs Maintenance Outlay",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and maintenance_records. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-062",
    domain: "logistics",
    level: 5,
    order: 62,
    difficulty: "expert",
    title: "Enterprise Logistics Model #62: Vehicle Mileage vs Fuel Usage",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and fuel_logs. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-063",
    domain: "logistics",
    level: 5,
    order: 63,
    difficulty: "expert",
    title: "Enterprise Logistics Model #63: Warehouse Capacity vs Parts Investment",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing warehouses and parts_inventory. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on warehouses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-064",
    domain: "logistics",
    level: 5,
    order: 64,
    difficulty: "expert",
    title: "Enterprise Logistics Model #64: Carrier Rating vs Freight Volume",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing carriers and shipments. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on carriers.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-065",
    domain: "logistics",
    level: 5,
    order: 65,
    difficulty: "expert",
    title: "Enterprise Logistics Model #65: Customs Duty vs Freight Invoicing",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing customs_declarations and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on customs_declarations.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-066",
    domain: "logistics",
    level: 5,
    order: 66,
    difficulty: "expert",
    title: "Enterprise Logistics Model #66: Cargo Weight vs Declared Value",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and cargo_packages. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-067",
    domain: "logistics",
    level: 5,
    order: 67,
    difficulty: "expert",
    title: "Enterprise Logistics Model #67: Freight Weight vs Invoiced Billing",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-068",
    domain: "logistics",
    level: 5,
    order: 68,
    difficulty: "expert",
    title: "Enterprise Logistics Model #68: Shipment Weight vs Incident Cost",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and incidents. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-069",
    domain: "logistics",
    level: 5,
    order: 69,
    difficulty: "expert",
    title: "Enterprise Logistics Model #69: Mileage vs Maintenance Outlay",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and maintenance_records. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-070",
    domain: "logistics",
    level: 5,
    order: 70,
    difficulty: "expert",
    title: "Enterprise Logistics Model #70: Vehicle Mileage vs Fuel Usage",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and fuel_logs. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-071",
    domain: "logistics",
    level: 5,
    order: 71,
    difficulty: "expert",
    title: "Enterprise Logistics Model #71: Warehouse Capacity vs Parts Investment",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing warehouses and parts_inventory. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on warehouses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-072",
    domain: "logistics",
    level: 5,
    order: 72,
    difficulty: "expert",
    title: "Enterprise Logistics Model #72: Carrier Rating vs Freight Volume",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing carriers and shipments. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on carriers.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-073",
    domain: "logistics",
    level: 5,
    order: 73,
    difficulty: "expert",
    title: "Enterprise Logistics Model #73: Customs Duty vs Freight Invoicing",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing customs_declarations and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on customs_declarations.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-074",
    domain: "logistics",
    level: 5,
    order: 74,
    difficulty: "expert",
    title: "Enterprise Logistics Model #74: Cargo Weight vs Declared Value",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and cargo_packages. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-075",
    domain: "logistics",
    level: 5,
    order: 75,
    difficulty: "expert",
    title: "Enterprise Logistics Model #75: Freight Weight vs Invoiced Billing",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-076",
    domain: "logistics",
    level: 5,
    order: 76,
    difficulty: "expert",
    title: "Enterprise Logistics Model #76: Shipment Weight vs Incident Cost",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and incidents. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-077",
    domain: "logistics",
    level: 5,
    order: 77,
    difficulty: "expert",
    title: "Enterprise Logistics Model #77: Mileage vs Maintenance Outlay",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and maintenance_records. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-078",
    domain: "logistics",
    level: 5,
    order: 78,
    difficulty: "expert",
    title: "Enterprise Logistics Model #78: Vehicle Mileage vs Fuel Usage",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and fuel_logs. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-079",
    domain: "logistics",
    level: 5,
    order: 79,
    difficulty: "expert",
    title: "Enterprise Logistics Model #79: Warehouse Capacity vs Parts Investment",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing warehouses and parts_inventory. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on warehouses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-080",
    domain: "logistics",
    level: 5,
    order: 80,
    difficulty: "expert",
    title: "Enterprise Logistics Model #80: Carrier Rating vs Freight Volume",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing carriers and shipments. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on carriers.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-081",
    domain: "logistics",
    level: 5,
    order: 81,
    difficulty: "expert",
    title: "Enterprise Logistics Model #81: Customs Duty vs Freight Invoicing",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing customs_declarations and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on customs_declarations.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-082",
    domain: "logistics",
    level: 5,
    order: 82,
    difficulty: "expert",
    title: "Enterprise Logistics Model #82: Cargo Weight vs Declared Value",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and cargo_packages. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-083",
    domain: "logistics",
    level: 5,
    order: 83,
    difficulty: "expert",
    title: "Enterprise Logistics Model #83: Freight Weight vs Invoiced Billing",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-084",
    domain: "logistics",
    level: 5,
    order: 84,
    difficulty: "expert",
    title: "Enterprise Logistics Model #84: Shipment Weight vs Incident Cost",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and incidents. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-085",
    domain: "logistics",
    level: 5,
    order: 85,
    difficulty: "expert",
    title: "Enterprise Logistics Model #85: Mileage vs Maintenance Outlay",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and maintenance_records. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-086",
    domain: "logistics",
    level: 5,
    order: 86,
    difficulty: "expert",
    title: "Enterprise Logistics Model #86: Vehicle Mileage vs Fuel Usage",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and fuel_logs. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-087",
    domain: "logistics",
    level: 5,
    order: 87,
    difficulty: "expert",
    title: "Enterprise Logistics Model #87: Warehouse Capacity vs Parts Investment",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing warehouses and parts_inventory. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on warehouses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-088",
    domain: "logistics",
    level: 5,
    order: 88,
    difficulty: "expert",
    title: "Enterprise Logistics Model #88: Carrier Rating vs Freight Volume",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing carriers and shipments. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on carriers.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-089",
    domain: "logistics",
    level: 5,
    order: 89,
    difficulty: "expert",
    title: "Enterprise Logistics Model #89: Customs Duty vs Freight Invoicing",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing customs_declarations and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on customs_declarations.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-090",
    domain: "logistics",
    level: 5,
    order: 90,
    difficulty: "expert",
    title: "Enterprise Logistics Model #90: Cargo Weight vs Declared Value",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and cargo_packages. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-091",
    domain: "logistics",
    level: 5,
    order: 91,
    difficulty: "expert",
    title: "Enterprise Logistics Model #91: Freight Weight vs Invoiced Billing",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-092",
    domain: "logistics",
    level: 5,
    order: 92,
    difficulty: "expert",
    title: "Enterprise Logistics Model #92: Shipment Weight vs Incident Cost",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and incidents. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-093",
    domain: "logistics",
    level: 5,
    order: 93,
    difficulty: "expert",
    title: "Enterprise Logistics Model #93: Mileage vs Maintenance Outlay",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and maintenance_records. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-094",
    domain: "logistics",
    level: 5,
    order: 94,
    difficulty: "expert",
    title: "Enterprise Logistics Model #94: Vehicle Mileage vs Fuel Usage",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing fleet_vehicles and fuel_logs. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on fleet_vehicles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-095",
    domain: "logistics",
    level: 5,
    order: 95,
    difficulty: "expert",
    title: "Enterprise Logistics Model #95: Warehouse Capacity vs Parts Investment",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing warehouses and parts_inventory. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on warehouses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-096",
    domain: "logistics",
    level: 5,
    order: 96,
    difficulty: "expert",
    title: "Enterprise Logistics Model #96: Carrier Rating vs Freight Volume",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing carriers and shipments. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on carriers.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-097",
    domain: "logistics",
    level: 5,
    order: 97,
    difficulty: "expert",
    title: "Enterprise Logistics Model #97: Customs Duty vs Freight Invoicing",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing customs_declarations and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on customs_declarations.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-098",
    domain: "logistics",
    level: 5,
    order: 98,
    difficulty: "expert",
    title: "Enterprise Logistics Model #98: Cargo Weight vs Declared Value",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and cargo_packages. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-099",
    domain: "logistics",
    level: 5,
    order: 99,
    difficulty: "expert",
    title: "Enterprise Logistics Model #99: Freight Weight vs Invoiced Billing",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and freight_invoices. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "log-L5-100",
    domain: "logistics",
    level: 5,
    order: 100,
    difficulty: "expert",
    title: "Enterprise Logistics Model #100: Shipment Weight vs Incident Cost",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Construct an enterprise supply chain CTE model summarizing shipments and incidents. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.",
    context_notes: "Enterprise supply chain modeling and capacity planning on shipments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","city","load_count","aggregate_freight"],
    reference_sql: "WITH cte1 AS (SELECT warehouse_id, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY warehouse_id) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  }
];
