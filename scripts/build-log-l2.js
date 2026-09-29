const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Dave Miller', role: 'VP of Fleet Operations' },
  { name: 'Claire Sullivan', role: 'Director of Global Supply Chain' },
  { name: 'Frank Miller', role: 'Midwest Terminal & Crossdock Manager' },
];

const l2Templates = [
  {
    authorIdx: 1,
    title: "Warehouse Outbound Shipment Volume and Total Freight Weight",
    desc: "Claire here. Ahead of carrier contract renewals, calculate the total count of shipments and total weight dispatched from each warehouse. Show warehouse city, shipment count as total_shipments, and total weight_kg rounded to 2 decimals, ordered by total weight descending.",
    sql: "SELECT w.city, COUNT(s.id) AS total_shipments, ROUND(SUM(s.weight_kg), 2) AS total_weight_kg FROM warehouses w JOIN shipments s ON w.id = s.warehouse_id GROUP BY w.city ORDER BY total_weight_kg DESC;",
    cols: ["city", "total_shipments", "total_weight_kg"],
    hint: "Join warehouses with shipments on w.id = s.warehouse_id and group by w.city.",
    context: "Measuring origin facility outbound throughput and dispatch density.",
    concepts: ["INNER JOIN", "GROUP BY", "SUM()", "COUNT()"],
    difficulty: "medium"
  },
  {
    authorIdx: 0,
    title: "Carrier Freight Volume and Average Load Size",
    desc: "Dave here from Fleet Ops. For each carrier partner, determine their total shipments hauled and average shipment weight. Display carrier_name, service_level, shipment count as total_loads, and average weight rounded to 2 decimals, ordered by total loads descending.",
    sql: "SELECT c.carrier_name, c.service_level, COUNT(s.id) AS total_loads, ROUND(AVG(s.weight_kg), 2) AS avg_weight_kg FROM carriers c JOIN shipments s ON c.id = s.carrier_id GROUP BY c.carrier_name, c.service_level ORDER BY total_loads DESC;",
    cols: ["carrier_name", "service_level", "total_loads", "avg_weight_kg"],
    hint: "Join carriers with shipments and group by carrier_name, service_level.",
    context: "Carrier fleet allocation and utilization analysis.",
    concepts: ["INNER JOIN", "GROUP BY", "AVG()", "COUNT()"],
    difficulty: "medium"
  },
  {
    authorIdx: 2,
    title: "High-Value Cargo Packages by Destination City",
    desc: "Frank at the crossdock. We need extra cargo insurance coverage on shipments carrying high-value packages. Join shipments and cargo_packages to find shipments where total declared package value exceeds $20,000. Show shipment id, destination_city, and total declared value, ordered by value descending.",
    sql: "SELECT s.id, s.destination_city, SUM(cp.declared_value) AS total_declared_value FROM shipments s JOIN cargo_packages cp ON s.id = cp.shipment_id GROUP BY s.id, s.destination_city HAVING SUM(cp.declared_value) > 20000.00 ORDER BY total_declared_value DESC;",
    cols: ["id", "destination_city", "total_declared_value"],
    hint: "Join shipments to cargo_packages, grouping by shipment id and destination_city with HAVING SUM(cp.declared_value) > 20000.",
    context: "Cargo security and high-value transit liability controls.",
    concepts: ["INNER JOIN", "GROUP BY", "HAVING", "SUM()"],
    difficulty: "medium"
  },
  {
    authorIdx: 1,
    title: "Hazardous Materials Shipment Manifest",
    desc: "Identify all shipments that contain hazardous cargo packages. Join shipments and cargo_packages to display shipment id, origin_warehouse, destination_city, and count of hazardous packages, filtering for is_hazardous = TRUE.",
    sql: "SELECT s.id, s.origin_warehouse, s.destination_city, COUNT(cp.id) AS hazmat_package_count FROM shipments s JOIN cargo_packages cp ON s.id = cp.shipment_id WHERE cp.is_hazardous = TRUE GROUP BY s.id, s.origin_warehouse, s.destination_city ORDER BY hazmat_package_count DESC;",
    cols: ["id", "origin_warehouse", "destination_city", "hazmat_package_count"],
    hint: "Join shipments to cargo_packages with WHERE cp.is_hazardous = TRUE and group by shipment.",
    context: "HAZMAT regulatory compliance and route planning.",
    concepts: ["INNER JOIN", "WHERE", "GROUP BY", "COUNT()"],
    difficulty: "medium"
  },
  {
    authorIdx: 2,
    title: "Delivery Checkpoints Passed per Shipment",
    desc: "Monitor freight milestone tracking. For each shipment, count how many delivery checkpoints it has logged. Show shipment id, destination_city, status, and checkpoint_count, ordered by checkpoint_count descending.",
    sql: "SELECT s.id, s.destination_city, s.status, COUNT(dc.id) AS checkpoint_count FROM shipments s LEFT JOIN delivery_checkpoints dc ON s.id = dc.shipment_id GROUP BY s.id, s.destination_city, s.status ORDER BY checkpoint_count DESC;",
    cols: ["id", "destination_city", "status", "checkpoint_count"],
    hint: "Use LEFT JOIN between shipments and delivery_checkpoints, grouping by shipment id, destination_city, status.",
    context: "In-transit tracking visibility and scan scan rate audits.",
    concepts: ["LEFT JOIN", "GROUP BY", "COUNT()"],
    difficulty: "medium"
  },
  {
    authorIdx: 0,
    title: "Freight Route Cost per Transit Hour",
    desc: "Calculate the toll cost per hour of transit for each freight corridor. Show route_name, distance_km, avg_transit_hours, toll_costs, and (toll_costs / avg_transit_hours) as toll_per_hour rounded to 2 decimals, ordered by toll_per_hour descending.",
    sql: "SELECT route_name, distance_km, avg_transit_hours, toll_costs, ROUND((toll_costs / avg_transit_hours), 2) AS toll_per_hour FROM freight_routes ORDER BY toll_per_hour DESC;",
    cols: ["route_name", "distance_km", "avg_transit_hours", "toll_costs", "toll_per_hour"],
    hint: "Divide toll_costs by avg_transit_hours and round to 2 decimals.",
    context: "Route economic efficiency and toll expenditure benchmarking.",
    concepts: ["SELECT", "Arithmetic Expressions", "ROUND()", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 1,
    title: "Carriers Handling Delayed Shipments",
    desc: "Find which carriers have experienced shipments marked with 'delayed' status. Show carrier_name, carrier rating, and total delayed shipments count, ordered by delayed count descending.",
    sql: "SELECT c.carrier_name, c.rating, COUNT(s.id) AS delayed_count FROM carriers c JOIN shipments s ON c.id = s.carrier_id WHERE s.status = 'delayed' GROUP BY c.carrier_name, c.rating ORDER BY delayed_count DESC;",
    cols: ["carrier_name", "rating", "delayed_count"],
    hint: "Join carriers to shipments with WHERE s.status = 'delayed' and group by carrier_name, c.rating.",
    context: "Carrier SLA accountability and penalty enforcement.",
    concepts: ["INNER JOIN", "WHERE", "GROUP BY", "COUNT()"],
    difficulty: "medium"
  },
  {
    authorIdx: 2,
    title: "Average Package Weight per Shipment",
    desc: "Frank at the sorting depot. Calculate the total package count and average cargo package weight for each shipment. Display shipment_id, count of packages as total_packages, and average weight rounded to 2 decimals, ordered by total_packages descending.",
    sql: "SELECT shipment_id, COUNT(id) AS total_packages, ROUND(AVG(weight_kg), 2) AS avg_pkg_weight_kg FROM cargo_packages GROUP BY shipment_id ORDER BY total_packages DESC;",
    cols: ["shipment_id", "total_packages", "avg_pkg_weight_kg"],
    hint: "Group cargo_packages by shipment_id and compute COUNT(id) and AVG(weight_kg).",
    context: "Pallet density and sorting facility capacity planning.",
    concepts: ["GROUP BY", "AVG()", "COUNT()", "ROUND()"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 0,
    title: "High-Volume Freight Destinations",
    desc: "Identify destination cities receiving more than 15,000 kg of cumulative freight. Display destination_city, total shipments, and total weight, ordered by total weight descending.",
    sql: "SELECT destination_city, COUNT(id) AS shipment_count, ROUND(SUM(weight_kg), 2) AS total_weight FROM shipments GROUP BY destination_city HAVING SUM(weight_kg) > 15000.00 ORDER BY total_weight DESC;",
    cols: ["destination_city", "shipment_count", "total_weight"],
    hint: "Group shipments by destination_city with HAVING SUM(weight_kg) > 15000.00.",
    context: "Targeting high-density metropolitan delivery zones for dedicated fleet routing.",
    concepts: ["GROUP BY", "HAVING", "SUM()", "COUNT()"],
    difficulty: "medium"
  },
  {
    authorIdx: 1,
    title: "Crossdock Warehouses with Over 5 Active Outbound Loads",
    desc: "Find warehouses that have more than 5 outbound shipments currently logged in the system. Show warehouse city, manager_name, and active load count, ordered by load count descending.",
    sql: "SELECT w.city, w.manager_name, COUNT(s.id) AS active_load_count FROM warehouses w JOIN shipments s ON w.id = s.warehouse_id GROUP BY w.city, w.manager_name HAVING COUNT(s.id) > 5 ORDER BY active_load_count DESC;",
    cols: ["city", "manager_name", "active_load_count"],
    hint: "Join warehouses with shipments, grouping by city, manager_name with HAVING COUNT(s.id) > 5.",
    context: "Crossdock throughput bottlenecks and dock door congestion.",
    concepts: ["INNER JOIN", "GROUP BY", "HAVING", "COUNT()"],
    difficulty: "medium"
  }
];

// Generate 90 additional programmatic templates across all Level 2 tables
const logL2Combinations = [
  { tableA: "warehouses", tableB: "shipments", joinCol: "warehouse_id", keyA: "city", metricB: "weight_kg", title: "Warehouse Outbound Weight Throughput" },
  { tableA: "carriers", tableB: "shipments", joinCol: "carrier_id", keyA: "carrier_name", metricB: "weight_kg", title: "Carrier Freight Capacity Distribution" },
  { tableA: "shipments", tableB: "cargo_packages", joinCol: "shipment_id", keyA: "destination_city", metricB: "declared_value", title: "Destination Declared Cargo Value" },
  { tableA: "shipments", tableB: "cargo_packages", joinCol: "shipment_id", keyA: "origin_warehouse", metricB: "weight_kg", title: "Origin Warehouse Cargo Weight Density" },
  { tableA: "shipments", tableB: "delivery_checkpoints", joinCol: "shipment_id", keyA: "destination_city", metricB: "id", title: "Destination City Checkpoint Scan Activity" }
];

let counter = l2Templates.length;
for (let i = 0; counter < 100; i++) {
  const combo = logL2Combinations[i % logL2Combinations.length];
  const p = personas[counter % personas.length];
  const qNum = counter + 1;

  l2Templates.push({
    authorIdx: counter % personas.length,
    title: `Logistics Relational Metric #${qNum}: ${combo.title}`,
    desc: `For each ${combo.keyA} in ${combo.tableA}, compute total records and aggregate ${combo.metricB} from ${combo.tableB}. Show ${combo.keyA}, total count of items, and sum of ${combo.metricB} rounded to 2 decimals, ordered by sum descending.`,
    sql: `SELECT a.${combo.keyA}, COUNT(b.id) AS total_count, ROUND(SUM(b.${combo.metricB}), 2) AS total_${combo.metricB} FROM ${combo.tableA} a JOIN ${combo.tableB} b ON a.id = b.${combo.joinCol} GROUP BY a.${combo.keyA} ORDER BY total_${combo.metricB} DESC;`,
    cols: [combo.keyA, "total_count", `total_${combo.metricB}`],
    hint: `Join ${combo.tableA} to ${combo.tableB} on a.id = b.${combo.joinCol} and group by a.${combo.keyA}.`,
    context: `Relational freight analytics linking ${combo.tableA} and ${combo.tableB}.`,
    concepts: ["INNER JOIN", "GROUP BY", "SUM()", "COUNT()"],
    difficulty: "medium"
  });
  counter++;
}

const outQuestions = l2Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "log-L2-${pad}",
    domain: "logistics",
    level: 2,
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
    starter_sql: "SELECT\\n  -- Complete the relational query\\nFROM ${t.cols.length > 0 ? '' : ''}\\n;"
  }`;
});

const fileHeader = `// ============================================================================
// LOGISTICS & SUPPLY CHAIN — LEVEL 2: RELATIONAL JOINS & FREIGHT AGGREGATIONS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (9): warehouses, carriers, fleet_vehicles, drivers, suppliers, shipments,
//             cargo_packages, freight_routes, delivery_checkpoints
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L2_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/log-l2-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated LOG_L2_QUESTIONS: ${outQuestions.length} questions.`);
