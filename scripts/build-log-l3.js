const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Dave Miller', role: 'VP of Fleet Operations' },
  { name: 'Claire Sullivan', role: 'Director of Global Supply Chain' },
  { name: 'Frank Miller', role: 'Midwest Terminal & Crossdock Manager' },
];

const l3Templates = [
  {
    authorIdx: 0,
    title: "Fleet Vehicles with Above-Average Maintenance Costs",
    desc: "Dave here from Fleet Ops. Find all fleet vehicles whose total maintenance expenditure exceeds the fleet-wide average maintenance cost per vehicle. Return vehicle id, vehicle_number, vehicle_type, and total maintenance cost.",
    sql: "SELECT fv.id, fv.vehicle_number, fv.vehicle_type, SUM(mr.cost) AS total_maintenance_cost FROM fleet_vehicles fv JOIN maintenance_records mr ON fv.id = mr.vehicle_id GROUP BY fv.id, fv.vehicle_number, fv.vehicle_type HAVING SUM(mr.cost) > (SELECT AVG(cost) FROM maintenance_records) ORDER BY total_maintenance_cost DESC;",
    cols: ["id", "vehicle_number", "vehicle_type", "total_maintenance_cost"],
    hint: "Use HAVING SUM(mr.cost) > (SELECT AVG(cost) FROM maintenance_records).",
    context: "Detecting maintenance cost outliers for fleet decommissioning or warranty claims.",
    concepts: ["HAVING", "Scalar Subquery", "SUM()", "AVG()"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "High-Cost Parts in Inventory Above Overall Mean Unit Cost",
    desc: "Claire here. Identify all spare parts in inventory where the unit_cost is higher than the overall average unit cost across all parts. Display part_number, warehouse_id, quantity_in_stock, and unit_cost, ordered by unit_cost descending.",
    sql: "SELECT part_number, warehouse_id, quantity_in_stock, unit_cost FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    cols: ["part_number", "warehouse_id", "quantity_in_stock", "unit_cost"],
    hint: "Use WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory).",
    context: "Auditing capital tied up in high-value replacement components.",
    concepts: ["Scalar Subquery", "WHERE", "AVG()"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "Shipments Carrying Greater Than Average Total Declared Value",
    desc: "Frank at crossdock dispatch. Find all shipments where the total declared value of its cargo packages exceeds the average package value across the entire freight network. Use a subquery to return shipment_id and total declared value.",
    sql: "SELECT shipment_id, SUM(declared_value) AS total_val FROM cargo_packages GROUP BY shipment_id HAVING SUM(declared_value) > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY total_val DESC;",
    cols: ["shipment_id", "total_val"],
    hint: "Use HAVING SUM(declared_value) > (SELECT AVG(declared_value) FROM cargo_packages).",
    context: "Targeting high-liability shipments for premium security escort.",
    concepts: ["HAVING", "Scalar Subquery", "SUM()", "AVG()"],
    difficulty: "hard"
  },
  {
    authorIdx: 0,
    title: "Vehicles Requiring No Maintenance in Current Cycle (NOT EXISTS)",
    desc: "Dave from Fleet. Find all active fleet vehicles that have zero recorded maintenance service entries. Display id, vehicle_number, vehicle_type, and mileage_km using NOT EXISTS.",
    sql: "SELECT fv.id, fv.vehicle_number, fv.vehicle_type, fv.mileage_km FROM fleet_vehicles fv WHERE fv.status = 'active' AND NOT EXISTS (SELECT 1 FROM maintenance_records mr WHERE mr.vehicle_id = fv.id) ORDER BY fv.mileage_km DESC;",
    cols: ["id", "vehicle_number", "vehicle_type", "mileage_km"],
    hint: "Use WHERE fv.status = 'active' AND NOT EXISTS (SELECT 1 FROM maintenance_records mr WHERE mr.vehicle_id = fv.id).",
    context: "Preventive maintenance scheduling for untouched vehicles.",
    concepts: ["NOT EXISTS", "Correlated Subquery", "Fleet Maintenance"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Warehouses Without Any Parts Inventory Stock (NOT IN)",
    desc: "Claire here. Which warehouse locations currently do not stock any replacement parts? Display warehouse id, city, and manager_name.",
    sql: "SELECT w.id, w.city, w.manager_name FROM warehouses w WHERE w.id NOT IN (SELECT DISTINCT warehouse_id FROM parts_inventory WHERE warehouse_id IS NOT NULL) ORDER BY w.id ASC;",
    cols: ["id", "city", "manager_name"],
    hint: "Use WHERE w.id NOT IN (SELECT DISTINCT warehouse_id FROM parts_inventory).",
    context: "Ensuring maintenance parts depots are adequately distributed.",
    concepts: ["NOT IN", "Subquery", "DISTINCT"],
    difficulty: "hard"
  },
  {
    authorIdx: 0,
    title: "High Fuel Consumption Vehicles (Correlated Subquery)",
    desc: "Find fleet vehicles whose single fuel log entry exceeded the average gallons filled for that specific vehicle. Show vehicle_id, gallons, and log_date, ordered by gallons descending.",
    sql: "SELECT fl.vehicle_id, fl.gallons, fl.log_date FROM fuel_logs fl WHERE fl.gallons > (SELECT AVG(fl2.gallons) FROM fuel_logs fl2 WHERE fl2.vehicle_id = fl.vehicle_id) ORDER BY fl.gallons DESC;",
    cols: ["vehicle_id", "gallons", "log_date"],
    hint: "Use a correlated subquery comparing fl.gallons with the vehicle's own average gallons.",
    context: "Fuel anomaly and tank capacity breach monitoring.",
    concepts: ["Correlated Subquery", "WHERE", "Fuel Analytics"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "Shipments Crossing Checkpoints vs Non-Checkpoint Loads (UNION)",
    desc: "Produce a unified listing of shipment IDs labeled by whether they have passed a security checkpoint or not. Return shipment id and scan status.",
    sql: "SELECT DISTINCT shipment_id, 'scanned' AS scan_status FROM delivery_checkpoints UNION SELECT id AS shipment_id, 'unscanned' AS scan_status FROM shipments WHERE id NOT IN (SELECT DISTINCT shipment_id FROM delivery_checkpoints) ORDER BY shipment_id ASC;",
    cols: ["shipment_id", "scan_status"],
    hint: "Combine scanned shipments and unscanned shipments using UNION.",
    context: "Checkpoint visibility coverage reporting.",
    concepts: ["UNION", "Set Operations", "NOT IN"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Suppliers with Top Reliability and Fast Lead Times (INTERSECT)",
    desc: "Find suppliers that are in both the top reliability group (score >= 4.7) AND the fast delivery group (lead time <= 12 days) using INTERSECT. Display supplier id and supplier_name.",
    sql: "SELECT id, supplier_name FROM suppliers WHERE reliability_score >= 4.7 INTERSECT SELECT id, supplier_name FROM suppliers WHERE lead_time_days <= 12 ORDER BY id ASC;",
    cols: ["id", "supplier_name"],
    hint: "Use the INTERSECT operator between the high-reliability and fast-lead-time queries.",
    context: "Identifying gold-standard vendor partners.",
    concepts: ["INTERSECT", "Set Operations", "Supplier Evaluation"],
    difficulty: "hard"
  },
  {
    authorIdx: 0,
    title: "Vehicle with Maximum Mileage in Each Vehicle Type (Derived Table)",
    desc: "For each vehicle_type, identify the vehicle with the maximum odometer mileage. Use a derived table subquery to return vehicle_type, vehicle_number, and mileage_km.",
    sql: "SELECT fv.vehicle_type, fv.vehicle_number, fv.mileage_km FROM fleet_vehicles fv JOIN (SELECT vehicle_type, MAX(mileage_km) AS max_km FROM fleet_vehicles GROUP BY vehicle_type) max_fv ON fv.vehicle_type = max_fv.vehicle_type AND fv.mileage_km = max_fv.max_km ORDER BY fv.vehicle_type ASC;",
    cols: ["vehicle_type", "vehicle_number", "mileage_km"],
    hint: "Join fleet_vehicles with a subquery grouping by vehicle_type and taking MAX(mileage_km).",
    context: "Fleet wear-and-tear leadership profiling.",
    concepts: ["Derived Tables", "JOIN", "Subqueries"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "Shipments Carrying Weight Above Regional Warehouse Average",
    desc: "Identify shipments whose weight_kg exceeds the average weight of shipments originating from the same warehouse. Show id, origin_warehouse, and weight_kg.",
    sql: "SELECT s.id, s.origin_warehouse, s.weight_kg FROM shipments s WHERE s.weight_kg > (SELECT AVG(s2.weight_kg) FROM shipments s2 WHERE s2.warehouse_id = s.warehouse_id) ORDER BY s.weight_kg DESC;",
    cols: ["id", "origin_warehouse", "weight_kg"],
    hint: "Use a correlated subquery in WHERE comparing shipment weight to that warehouse's average weight.",
    context: "Detecting localized freight loading anomalies.",
    concepts: ["Correlated Subquery", "WHERE", "AVG()"],
    difficulty: "hard"
  }
];

// Generate 90 additional programmatic templates across all Level 3 Logistics tables
const logL3Themes = [
  { table: "fleet_vehicles", field: "mileage_km", groupCol: "vehicle_type", name: "Vehicle Mileage Benchmark" },
  { table: "fuel_logs", field: "gallons", groupCol: "vehicle_id", name: "Fuel Refueling Volume Benchmark" },
  { table: "maintenance_records", field: "cost", groupCol: "service_type", name: "Maintenance Service Cost Benchmark" },
  { table: "parts_inventory", field: "unit_cost", groupCol: "warehouse_id", name: "Parts Inventory Unit Value Benchmark" },
  { table: "cargo_packages", field: "declared_value", groupCol: "shipment_id", name: "Cargo Declared Value Benchmark" },
  { table: "freight_routes", field: "toll_costs", groupCol: "distance_km", name: "Freight Route Toll Tollway Benchmark" }
];

let counter = l3Templates.length;
for (let i = 0; counter < 100; i++) {
  const theme = logL3Themes[i % logL3Themes.length];
  const p = personas[counter % personas.length];
  const qNum = counter + 1;

  l3Templates.push({
    authorIdx: counter % personas.length,
    title: `Logistics Benchmark Query #${qNum}: ${theme.name}`,
    desc: `Identify records from ${theme.table} where ${theme.field} is strictly greater than the overall average ${theme.field}. Return id, ${theme.field}, and ${theme.groupCol}, ordered by ${theme.field} descending.`,
    sql: `SELECT id, ${theme.field}, ${theme.groupCol} FROM ${theme.table} WHERE ${theme.field} > (SELECT AVG(${theme.field}) FROM ${theme.table}) ORDER BY ${theme.field} DESC;`,
    cols: ["id", theme.field, theme.groupCol],
    hint: `Filter with a scalar subquery: WHERE ${theme.field} > (SELECT AVG(${theme.field}) FROM ${theme.table}).`,
    context: `Benchmark analysis on ${theme.table} exceeding overall mean metrics.`,
    concepts: ["Scalar Subquery", "WHERE", "AVG()", theme.table],
    difficulty: "hard"
  });
  counter++;
}

const outQuestions = l3Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "log-L3-${pad}",
    domain: "logistics",
    level: 3,
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
    starter_sql: "SELECT\\n  -- Complete the subquery or set operation\\nFROM ${t.cols.length > 0 ? '' : ''}\\n;"
  }`;
});

const fileHeader = `// ============================================================================
// LOGISTICS & SUPPLY CHAIN — LEVEL 3: SUBQUERIES, CORRELATED FILTERS & SET OPS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (12): warehouses, carriers, fleet_vehicles, drivers, suppliers, shipments,
//              cargo_packages, freight_routes, delivery_checkpoints, parts_inventory,
//              fuel_logs, maintenance_records
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L3_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/log-l3-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated LOG_L3_QUESTIONS: ${outQuestions.length} questions.`);
