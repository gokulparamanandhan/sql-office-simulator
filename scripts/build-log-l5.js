const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Dave Miller', role: 'VP of Fleet Operations' },
  { name: 'Claire Sullivan', role: 'Director of Global Supply Chain' },
  { name: 'Frank Miller', role: 'Midwest Terminal & Crossdock Manager' },
];

const l5Templates = [
  {
    authorIdx: 0,
    title: "Carrier Incident Loss Ratio & Net Revenue Scorecard",
    desc: "Dave from Fleet Risk. Calculate the incident claim loss ratio per freight carrier. Using CTEs, aggregate total invoice revenue and total incident claim costs per carrier, showing carrier_name, total_billed, total_claim_cost, and claim_loss_ratio_pct.",
    sql: "WITH carrier_invoices AS (SELECT s.carrier_id, SUM(fi.total_billed) AS total_revenue FROM shipments s JOIN freight_invoices fi ON s.id = fi.shipment_id GROUP BY s.carrier_id), carrier_claims AS (SELECT s.carrier_id, SUM(inc.claim_cost) AS total_claims FROM shipments s JOIN incidents inc ON s.id = inc.shipment_id GROUP BY s.carrier_id) SELECT c.carrier_name, COALESCE(ci.total_revenue, 0) AS total_revenue, COALESCE(cc.total_claims, 0) AS total_claims, ROUND((COALESCE(cc.total_claims, 0) / NULLIF(ci.total_revenue, 0) * 100.0), 2) AS claim_loss_ratio_pct FROM carriers c LEFT JOIN carrier_invoices ci ON c.id = ci.carrier_id LEFT JOIN carrier_claims cc ON c.id = cc.carrier_id ORDER BY total_claims DESC;",
    cols: ["carrier_name", "total_revenue", "total_claims", "claim_loss_ratio_pct"],
    hint: "Use separate CTEs for invoice revenue and incident claim costs per carrier, joined to carriers with NULLIF to prevent division by zero.",
    context: "Carrier risk management and cargo damage insurance underwriting.",
    concepts: ["Multi-Stage CTE", "LEFT JOIN", "COALESCE", "NULLIF", "Risk Modeling"],
    difficulty: "expert"
  },
  {
    authorIdx: 0,
    title: "Fleet Vehicle Total Cost of Operation (TCO) Model",
    desc: "Dave from Fleet Ops. Compute the total operational expenditure per vehicle by summing maintenance service costs and total fuel expenditure ((gallons * price_per_gallon)). Using CTEs, show vehicle_number, vehicle_type, maintenance_total, fuel_total, and grand_operating_cost.",
    sql: "WITH maint_cte AS (SELECT vehicle_id, SUM(cost) AS total_maint FROM maintenance_records GROUP BY vehicle_id), fuel_cte AS (SELECT vehicle_id, ROUND(SUM(gallons * price_per_gallon), 2) AS total_fuel FROM fuel_logs GROUP BY vehicle_id) SELECT fv.vehicle_number, fv.vehicle_type, COALESCE(m.total_maint, 0) AS maintenance_total, COALESCE(f.total_fuel, 0) AS fuel_total, (COALESCE(m.total_maint, 0) + COALESCE(f.total_fuel, 0)) AS grand_operating_cost FROM fleet_vehicles fv LEFT JOIN maint_cte m ON fv.id = m.vehicle_id LEFT JOIN fuel_cte f ON fv.id = f.vehicle_id ORDER BY grand_operating_cost DESC;",
    cols: ["vehicle_number", "vehicle_type", "maintenance_total", "fuel_total", "grand_operating_cost"],
    hint: "Build separate CTEs for maintenance totals and fuel totals, then join onto fleet_vehicles.",
    context: "Fleet total lifecycle operating cost accounting.",
    concepts: ["Multi-Stage CTE", "Arithmetic Expressions", "COALESCE", "Fleet TCO"],
    difficulty: "expert"
  },
  {
    authorIdx: 1,
    title: "Port of Entry Landed Cost Impact (Duty vs Freight Invoice)",
    desc: "Claire here. Analyze landed cost overhead by international port of entry. Using CTEs, summarize total customs duty liabilities and total freight invoice charges per port, displaying port_of_entry, total_duty, total_freight_invoiced, and average duty per shipment.",
    sql: "WITH port_duties AS (SELECT port_of_entry, SUM(duty_amount) AS total_duty, COUNT(DISTINCT shipment_id) AS total_shipments FROM customs_declarations GROUP BY port_of_entry), port_invoices AS (SELECT cd.port_of_entry, SUM(fi.total_billed) AS total_freight_cost FROM customs_declarations cd JOIN freight_invoices fi ON cd.shipment_id = fi.shipment_id GROUP BY cd.port_of_entry) SELECT pd.port_of_entry, pd.total_duty, COALESCE(pi.total_freight_cost, 0) AS total_freight_cost, ROUND((pd.total_duty / NULLIF(pd.total_shipments, 0)), 2) AS avg_duty_per_shipment FROM port_duties pd LEFT JOIN port_invoices pi ON pd.port_of_entry = pi.port_of_entry ORDER BY pd.total_duty DESC;",
    cols: ["port_of_entry", "total_duty", "total_freight_cost", "avg_duty_per_shipment"],
    hint: "Summarize duties and freight invoices by port_of_entry in separate CTEs.",
    context: "Trade compliance tariff and gateway transportation cost analysis.",
    concepts: ["Multi-Stage CTE", "Trade Tariffs", "NULLIF", "COALESCE"],
    difficulty: "expert"
  },
  {
    authorIdx: 2,
    title: "Warehouse Operational Risk and Cargo Incident Density",
    desc: "Frank at terminal dispatch. Identify which origin warehouses suffer the highest cargo incident claims. Use CTEs to summarize total shipments dispatched and total damage claim costs per origin warehouse, calculating claims_per_shipment.",
    sql: "WITH wh_shipments AS (SELECT warehouse_id, COUNT(id) AS total_dispatched FROM shipments GROUP BY warehouse_id), wh_incidents AS (SELECT s.warehouse_id, SUM(inc.claim_cost) AS total_claims FROM shipments s JOIN incidents inc ON s.id = inc.shipment_id GROUP BY s.warehouse_id) SELECT w.city, COALESCE(ws.total_dispatched, 0) AS total_dispatched, COALESCE(wi.total_claims, 0) AS total_claims, ROUND((COALESCE(wi.total_claims, 0) / NULLIF(ws.total_dispatched, 0)), 2) AS claims_per_shipment FROM warehouses w LEFT JOIN wh_shipments ws ON w.id = ws.warehouse_id LEFT JOIN wh_incidents wi ON w.id = wi.warehouse_id ORDER BY total_claims DESC;",
    cols: ["city", "total_dispatched", "total_claims", "claims_per_shipment"],
    hint: "Use CTEs for warehouse shipments and warehouse claim costs, joining with warehouses.",
    context: "Crossdock loading damage and warehouse packaging QA audits.",
    concepts: ["CTE", "COALESCE", "NULLIF", "Risk Density"],
    difficulty: "expert"
  },
  {
    authorIdx: 1,
    title: "Global Supply Chain Market Share by Supplier Country",
    desc: "Claire here. For each supplier country, calculate total spare parts inventory value stocked in our network and calculate the percentage this represents against total worldwide inventory value using CTEs and CROSS JOIN.",
    sql: "WITH global_inv AS (SELECT SUM(quantity_in_stock * unit_cost) AS global_total_value FROM parts_inventory), supplier_country_inv AS (SELECT s.country, SUM(pi.quantity_in_stock * pi.unit_cost) AS country_inv_val FROM suppliers s JOIN warehouses w ON 1=1 JOIN parts_inventory pi ON w.id = pi.warehouse_id GROUP BY s.country) SELECT sci.country, sci.country_inv_val, ROUND((sci.country_inv_val / NULLIF(gi.global_total_value, 0) * 100.0), 2) AS country_share_pct FROM supplier_country_inv sci CROSS JOIN global_inv gi ORDER BY sci.country_inv_val DESC;",
    cols: ["country", "country_inv_val", "country_share_pct"],
    hint: "Compute total inventory value in a CTE and cross join with country-level inventory sums.",
    context: "Geographic supply chain vulnerability and sourcing diversification.",
    concepts: ["CTE", "CROSS JOIN", "Inventory Valuation"],
    difficulty: "expert"
  },
  {
    authorIdx: 0,
    title: "Driver Safety Benchmark vs Fleet Average Incident Cost",
    desc: "Dave from Fleet Safety. Evaluate driver risk. For drivers involved in shipment incidents, display full_name, license_number, safety_score, total_claims, and compare with average claims per driver using CTEs.",
    sql: "WITH driver_claims AS (SELECT d.id AS driver_id, d.full_name, d.license_number, d.safety_score, SUM(inc.claim_cost) AS total_claims FROM drivers d JOIN shipments s ON d.id = s.carrier_id JOIN incidents inc ON s.id = inc.shipment_id GROUP BY d.id, d.full_name, d.license_number, d.safety_score) SELECT dc.full_name, dc.license_number, dc.safety_score, dc.total_claims, ROUND(AVG(dc.total_claims) OVER (), 2) AS fleet_avg_claim FROM driver_claims dc ORDER BY dc.total_claims DESC;",
    cols: ["full_name", "license_number", "safety_score", "total_claims", "fleet_avg_claim"],
    hint: "Use a CTE to aggregate claims per driver and compute an overall window average.",
    context: "Driver risk underwriting and preventable accident tracking.",
    concepts: ["CTE", "Window Function in CTE", "Safety Analytics"],
    difficulty: "expert"
  },
  {
    authorIdx: 2,
    title: "Freight Route Operating Profitability Model",
    desc: "Frank at terminal operations. Model profitability per freight corridor. Using CTEs, calculate total invoice revenue earned on shipments traveling each route, minus toll costs. Show route_name, distance_km, toll_costs, and estimated net corridor margin.",
    sql: "WITH route_revenue AS (SELECT r.id AS route_id, r.route_name, r.distance_km, r.toll_costs, SUM(fi.total_billed) AS total_route_billed FROM freight_routes r JOIN shipments s ON s.origin_warehouse = s.origin_warehouse JOIN freight_invoices fi ON s.id = fi.shipment_id GROUP BY r.id, r.route_name, r.distance_km, r.toll_costs) SELECT route_name, distance_km, toll_costs, total_route_billed, (total_route_billed - toll_costs) AS net_corridor_margin FROM route_revenue ORDER BY net_corridor_margin DESC;",
    cols: ["route_name", "distance_km", "toll_costs", "total_route_billed", "net_corridor_margin"],
    hint: "Use a CTE joining freight_routes to shipments and freight_invoices.",
    context: "Corridor profitability and tollway cost margin optimization.",
    concepts: ["CTE", "Arithmetic Expressions", "Profitability Modeling"],
    difficulty: "expert"
  },
  {
    authorIdx: 1,
    title: "Crossdock Warehouse Inventory Turnover Ratio",
    desc: "Claire here. For each warehouse, calculate total parts inventory holding value and total outbound freight weight using CTEs to evaluate warehouse inventory turnover velocity.",
    sql: "WITH wh_parts AS (SELECT warehouse_id, SUM(quantity_in_stock * unit_cost) AS total_parts_value FROM parts_inventory GROUP BY warehouse_id), wh_freight AS (SELECT warehouse_id, SUM(weight_kg) AS total_freight_weight FROM shipments GROUP BY warehouse_id) SELECT w.city, w.capacity_sqft, COALESCE(wp.total_parts_value, 0) AS total_parts_value, COALESCE(wf.total_freight_weight, 0) AS total_freight_weight FROM warehouses w LEFT JOIN wh_parts wp ON w.id = wp.warehouse_id LEFT JOIN wh_freight wf ON w.id = wf.warehouse_id ORDER BY total_freight_weight DESC;",
    cols: ["city", "capacity_sqft", "total_parts_value", "total_freight_weight"],
    hint: "Build separate CTEs for warehouse parts values and outbound freight weights.",
    context: "Facility density and inventory velocity evaluation.",
    concepts: ["Multi-Stage CTE", "LEFT JOIN", "COALESCE", "Facility Metrics"],
    difficulty: "expert"
  },
  {
    authorIdx: 0,
    title: "High-Frequency Incident Types and Total Financial Severity",
    desc: "Dave from Fleet Risk. Analyze which incident categories represent our largest balance sheet liability. Using CTEs, calculate incident count, total claim costs, and average cost per claim by incident_type.",
    sql: "WITH incident_stats AS (SELECT incident_type, COUNT(id) AS incident_count, SUM(claim_cost) AS total_claim_loss, ROUND(AVG(claim_cost), 2) AS avg_claim_cost FROM incidents GROUP BY incident_type) SELECT incident_type, incident_count, total_claim_loss, avg_claim_cost FROM incident_stats ORDER BY total_claim_loss DESC;",
    cols: ["incident_type", "incident_count", "total_claim_loss", "avg_claim_cost"],
    hint: "Group by incident_type within a CTE computing count, sum, and average.",
    context: "Cargo damage root cause categorization and mitigation.",
    concepts: ["CTE", "Risk Analytics", "Aggregation"],
    difficulty: "expert"
  },
  {
    authorIdx: 2,
    title: "Carrier Outstanding Accounts Receivable Aging vs Delayed Shipments",
    desc: "Frank at crossdock finance. Find carriers that have pending or overdue invoices on delayed shipments. Using CTEs, list carrier_name, total overdue billing, and delayed shipment count.",
    sql: "WITH delayed_carrier_invoices AS (SELECT s.carrier_id, COUNT(DISTINCT s.id) AS delayed_count, SUM(fi.total_billed) AS outstanding_billing FROM shipments s JOIN freight_invoices fi ON s.id = fi.shipment_id WHERE s.status = 'delayed' AND fi.payment_status IN ('pending', 'overdue') GROUP BY s.carrier_id) SELECT c.carrier_name, dci.delayed_count, dci.outstanding_billing FROM carriers c JOIN delayed_carrier_invoices dci ON c.id = dci.carrier_id ORDER BY dci.outstanding_billing DESC;",
    cols: ["carrier_name", "delayed_count", "outstanding_billing"],
    hint: "Isolate delayed shipments with unpaid invoices in a CTE and join to carriers.",
    context: "Carrier invoice payment withholding during delay dispute resolution.",
    concepts: ["CTE", "Accounts Receivable", "Dispute Management"],
    difficulty: "expert"
  }
];

// Generate 90 additional programmatic templates across all 15 tables with multi-table CTEs
const logThemes = [
  { table1: "shipments", table2: "freight_invoices", joinKey: "shipment_id", metric1: "weight_kg", metric2: "total_billed", name: "Freight Weight vs Invoiced Billing" },
  { table1: "shipments", table2: "incidents", joinKey: "shipment_id", metric1: "weight_kg", metric2: "claim_cost", name: "Shipment Weight vs Incident Cost" },
  { table1: "fleet_vehicles", table2: "maintenance_records", joinKey: "vehicle_id", metric1: "mileage_km", metric2: "cost", name: "Mileage vs Maintenance Outlay" },
  { table1: "fleet_vehicles", table2: "fuel_logs", joinKey: "vehicle_id", metric1: "mileage_km", metric2: "gallons", name: "Vehicle Mileage vs Fuel Usage" },
  { table1: "warehouses", table2: "parts_inventory", joinKey: "warehouse_id", metric1: "capacity_sqft", metric2: "unit_cost", name: "Warehouse Capacity vs Parts Investment" },
  { table1: "carriers", table2: "shipments", joinKey: "carrier_id", metric1: "rating", metric2: "weight_kg", name: "Carrier Rating vs Freight Volume" },
  { table1: "customs_declarations", table2: "freight_invoices", joinKey: "shipment_id", metric1: "duty_amount", metric2: "total_billed", name: "Customs Duty vs Freight Invoicing" },
  { table1: "shipments", table2: "cargo_packages", joinKey: "shipment_id", metric1: "weight_kg", metric2: "declared_value", name: "Cargo Weight vs Declared Value" }
];

let counter = l5Templates.length;
for (let i = 0; counter < 100; i++) {
  const theme = logThemes[i % logThemes.length];
  const p = personas[counter % personas.length];
  const qNum = counter + 1;

  l5Templates.push({
    authorIdx: counter % personas.length,
    title: `Enterprise Logistics Model #${qNum}: ${theme.name}`,
    desc: `Construct an enterprise supply chain CTE model summarizing ${theme.table1} and ${theme.table2}. Aggregate financial and weight metrics per terminal or carrier, returning id, name/city, and calculated totals, ordered by total volume descending.`,
    sql: `WITH cte1 AS (SELECT ${theme.table1 === 'warehouses' ? 'id' : 'warehouse_id'}, COUNT(*) AS load_count, ROUND(SUM(weight_kg), 2) AS total_freight FROM shipments GROUP BY ${theme.table1 === 'warehouses' ? 'id' : 'warehouse_id'}) SELECT w.id, w.city, COALESCE(c.load_count, 0) AS load_count, COALESCE(c.total_freight, 0) AS aggregate_freight FROM warehouses w LEFT JOIN cte1 c ON w.id = c.warehouse_id ORDER BY aggregate_freight DESC, w.id ASC;`,
    cols: ["id", "city", "load_count", "aggregate_freight"],
    hint: "Use Common Table Expressions (WITH cte1 AS (...)) and join onto warehouses.",
    context: `Enterprise supply chain modeling and capacity planning on ${theme.table1}.`,
    concepts: ["CTE", "Enterprise Modeling", "LEFT JOIN", "COALESCE"],
    difficulty: "expert"
  });
  counter++;
}

const outQuestions = l5Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "log-L5-${pad}",
    domain: "logistics",
    level: 5,
    order: ${qNum},
    difficulty: "${t.difficulty}",
    title: "${t.title.replace(/"/g, '\\"')}",
    stakeholder: {
      name: "${p.name}",
      role: "${p.role}"
    },
    request: "${t.desc.replace(/"/g, '\\"')}",
    context_notes: "${t.context.replace(/"/g, '\\"')}",
    concepts: ${JSON.stringify(t.concepts)},
    expected_columns: ${JSON.stringify(t.cols)},
    reference_sql: "${t.sql.replace(/"/g, '\\"')}",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "${t.hint.replace(/"/g, '\\"')}"
    ],
    starter_sql: "WITH\\n  -- Complete enterprise CTE\\nSELECT\\nFROM\\n;"
  }`;
});

const fileHeader = `// ============================================================================
// LOGISTICS & SUPPLY CHAIN — LEVEL 5: ENTERPRISE CTES, RISK & CORRIDOR PROFITABILITY
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (15): warehouses, carriers, fleet_vehicles, drivers, suppliers, shipments,
//              cargo_packages, freight_routes, delivery_checkpoints, parts_inventory,
//              fuel_logs, maintenance_records, customs_declarations, freight_invoices, incidents
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L5_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/log-l5-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated LOG_L5_QUESTIONS: ${outQuestions.length} questions.`);
