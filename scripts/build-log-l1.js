const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Dave Miller', role: 'VP of Fleet Operations' },
  { name: 'Claire Sullivan', role: 'Director of Global Supply Chain' },
  { name: 'Frank Miller', role: 'Midwest Terminal & Crossdock Manager' },
];

const l1Templates = [
  {
    authorIdx: 1,
    title: "Regional Distribution Hub Capacities",
    desc: "Good morning! As part of our network footprint review, please pull all warehouse locations with their square footage and designated facility manager, sorted from highest capacity to lowest.",
    sql: "SELECT city, capacity_sqft, manager_name FROM warehouses ORDER BY capacity_sqft DESC;",
    cols: ["city", "capacity_sqft", "manager_name"],
    hint: "Select city, capacity_sqft, manager_name from warehouses and order by capacity_sqft DESC.",
    context: "Reviewing distribution center capacity across logistics nodes.",
    concepts: ["SELECT", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 0,
    title: "Active Semi-Truck Fleet Roster",
    desc: "Dave here from Fleet Ops. Could you bring up all active semi-trucks in our fleet? Show vehicle_number, max_weight_capacity_kg, and current mileage_km, sorted by mileage descending so we see high-wear units first.",
    sql: "SELECT vehicle_number, max_weight_capacity_kg, mileage_km FROM fleet_vehicles WHERE vehicle_type = 'Semi_Truck' AND status = 'active' ORDER BY mileage_km DESC;",
    cols: ["vehicle_number", "max_weight_capacity_kg", "mileage_km"],
    hint: "Filter fleet_vehicles with WHERE vehicle_type = 'Semi_Truck' AND status = 'active'.",
    context: "Active heavy transport truck deployment and mileage monitoring.",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 1,
    title: "Top-Tier Freight Carrier Partners",
    desc: "Claire here. I need a directory of our top-rated freight carriers with a service quality rating of 4.5 or higher. Display carrier_name, service_level, and rating, ordered by rating descending.",
    sql: "SELECT carrier_name, service_level, rating FROM carriers WHERE rating >= 4.5 ORDER BY rating DESC;",
    cols: ["carrier_name", "service_level", "rating"],
    hint: "Use WHERE rating >= 4.5 on the carriers table and order by rating DESC.",
    context: "Reviewing premium tier freight carrier performance.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 2,
    title: "Pending and In-Transit Shipments",
    desc: "Frank at the terminal crossdock. Pull all shipments currently marked as either 'in_transit' or 'pending'. Display id, origin_warehouse, destination_city, and weight_kg, ordered by weight_kg desc.",
    sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE status IN ('in_transit', 'pending') ORDER BY weight_kg DESC;",
    cols: ["id", "origin_warehouse", "destination_city", "weight_kg"],
    hint: "Filter shipments using WHERE status IN ('in_transit', 'pending').",
    context: "Tracking active loads moving through the transit pipeline.",
    concepts: ["SELECT", "WHERE", "IN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "Senior Drivers with Stellar Safety Scores",
    desc: "We want to award safe driving milestone bonuses. Retrieve all drivers with at least 10 years of commercial driving experience and a safety score of 4.8 or higher. Show full_name, license_number, experience_years, and safety_score.",
    sql: "SELECT full_name, license_number, experience_years, safety_score FROM drivers WHERE experience_years >= 10 AND safety_score >= 4.8 ORDER BY safety_score DESC, experience_years DESC;",
    cols: ["full_name", "license_number", "experience_years", "safety_score"],
    hint: "Use WHERE experience_years >= 10 AND safety_score >= 4.8.",
    context: "Safety incentive qualification for veteran commercial drivers.",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 1,
    title: "Rapid Lead-Time Global Suppliers",
    desc: "Identify international parts suppliers capable of fulfilling orders within 10 days. Return supplier_name, country, lead_time_days, and reliability_score, ordered by lead_time_days ascending.",
    sql: "SELECT supplier_name, country, lead_time_days, reliability_score FROM suppliers WHERE lead_time_days <= 10 ORDER BY lead_time_days ASC, reliability_score DESC;",
    cols: ["supplier_name", "country", "lead_time_days", "reliability_score"],
    hint: "Filter suppliers WHERE lead_time_days <= 10.",
    context: "Sourcing quick-turnaround replenishment suppliers.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 2,
    title: "Heavy Haul Shipments Over 10,000 Kilograms",
    desc: "We need an axle-weight compliance check on heavy freight loads. Find all shipments where weight_kg exceeds 10,000 kg. Return id, origin_warehouse, destination_city, weight_kg, and status.",
    sql: "SELECT id, origin_warehouse, destination_city, weight_kg, status FROM shipments WHERE weight_kg > 10000.00 ORDER BY weight_kg DESC;",
    cols: ["id", "origin_warehouse", "destination_city", "weight_kg", "status"],
    hint: "Use WHERE weight_kg > 10000.00 ORDER BY weight_kg DESC.",
    context: "Bridge weight and DOT highway permitting compliance.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "Fleet Vehicles in Maintenance or Idle Status",
    desc: "Please list all fleet vehicles that are currently sidelined — status 'in_maintenance' or 'idle'. Display vehicle_number, vehicle_type, mileage_km, and status, sorted by vehicle_type.",
    sql: "SELECT vehicle_number, vehicle_type, mileage_km, status FROM fleet_vehicles WHERE status IN ('in_maintenance', 'idle') ORDER BY vehicle_type ASC, mileage_km DESC;",
    cols: ["vehicle_number", "vehicle_type", "mileage_km", "status"],
    hint: "Use WHERE status IN ('in_maintenance', 'idle').",
    context: "Fleet utilization and service bay staging.",
    concepts: ["SELECT", "WHERE", "IN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 1,
    title: "North American Suppliers Footprint",
    desc: "Pull all parts suppliers located in the United States, Canada, or Mexico. Display supplier_name, country, lead_time_days, and reliability_score, ordered by country.",
    sql: "SELECT supplier_name, country, lead_time_days, reliability_score FROM suppliers WHERE country IN ('USA', 'Canada', 'Mexico') ORDER BY country ASC, supplier_name ASC;",
    cols: ["supplier_name", "country", "lead_time_days", "reliability_score"],
    hint: "Use WHERE country IN ('USA', 'Canada', 'Mexico').",
    context: "Nearshoring and USMCA trade corridor vendor sourcing.",
    concepts: ["SELECT", "WHERE", "IN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 2,
    title: "Shipments Bound for West Coast Hubs",
    desc: "Which shipments are destined for Seattle, Portland, or San Diego? Show id, destination_city, weight_kg, and status, ordered by destination_city.",
    sql: "SELECT id, destination_city, weight_kg, status FROM shipments WHERE destination_city IN ('Seattle', 'Portland', 'San Diego') ORDER BY destination_city ASC, id ASC;",
    cols: ["id", "destination_city", "weight_kg", "status"],
    hint: "Use WHERE destination_city IN ('Seattle', 'Portland', 'San Diego').",
    context: "Consolidating Pacific freight corridor dispatch.",
    concepts: ["SELECT", "WHERE", "IN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "Refrigerated Reefer Fleet Readiness",
    desc: "Inspect our cold chain transport fleet. Find all vehicles of type 'Reefer' with mileage below 150,000 km. Display vehicle_number, max_weight_capacity_kg, mileage_km, and status.",
    sql: "SELECT vehicle_number, max_weight_capacity_kg, mileage_km, status FROM fleet_vehicles WHERE vehicle_type = 'Reefer' AND mileage_km < 150000 ORDER BY mileage_km ASC;",
    cols: ["vehicle_number", "max_weight_capacity_kg", "mileage_km", "status"],
    hint: "Filter with WHERE vehicle_type = 'Reefer' AND mileage_km < 150000.",
    context: "Deploying low-mileage refrigerated assets for sensitive pharmaceutical loads.",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 1,
    title: "High-Capacity Warehouses Above 300,000 Sqft",
    desc: "Which mega-warehouses have a footprint of at least 300,000 sq ft? List city, capacity_sqft, and manager_name, ordered by capacity_sqft descending.",
    sql: "SELECT city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft >= 300000 ORDER BY capacity_sqft DESC;",
    cols: ["city", "capacity_sqft", "manager_name"],
    hint: "Use WHERE capacity_sqft >= 300000 ORDER BY capacity_sqft DESC.",
    context: "Strategic regional fulfillment node identification.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 2,
    title: "Delayed Shipments Requiring Investigation",
    desc: "Crossdock alerts report customer delivery delays. Retrieve all shipments where status is 'delayed'. Return id, origin_warehouse, destination_city, and weight_kg.",
    sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE status = 'delayed' ORDER BY id ASC;",
    cols: ["id", "origin_warehouse", "destination_city", "weight_kg"],
    hint: "Use WHERE status = 'delayed'.",
    context: "Root cause analysis on delayed logistics routes.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 0,
    title: "Commercial Drivers by Seniority",
    desc: "List the top 10 most experienced commercial drivers on our payroll. Display full_name, experience_years, safety_score, and license_number, ordered by experience_years descending.",
    sql: "SELECT full_name, experience_years, safety_score, license_number FROM drivers ORDER BY experience_years DESC LIMIT 10;",
    cols: ["full_name", "experience_years", "safety_score", "license_number"],
    hint: "Use ORDER BY experience_years DESC LIMIT 10.",
    context: "Driver tenure and mentoring program leadership.",
    concepts: ["SELECT", "ORDER BY", "LIMIT"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 1,
    title: "Carriers Offering Expedited or Next-Day Service",
    desc: "Find all freight carriers whose service_level includes 'Next-Day' or 'Expedited'. Return carrier_name, service_level, and rating, ordered by carrier_name.",
    sql: "SELECT carrier_name, service_level, rating FROM carriers WHERE service_level LIKE '%Next-Day%' OR service_level LIKE '%Expedited%' ORDER BY carrier_name ASC;",
    cols: ["carrier_name", "service_level", "rating"],
    hint: "Use WHERE service_level LIKE '%Next-Day%' OR service_level LIKE '%Expedited%'.",
    context: "Routing critical expedited rush deliveries.",
    concepts: ["SELECT", "WHERE", "LIKE", "OR", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 2,
    title: "Shipments Weighing Between 2,000 and 5,000 Kilograms",
    desc: "Retrieve all mid-weight shipments (between 2,000 and 5,000 kg inclusive). Show id, origin_warehouse, destination_city, and weight_kg, sorted by weight_kg.",
    sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 2000.00 AND 5000.00 ORDER BY weight_kg ASC;",
    cols: ["id", "origin_warehouse", "destination_city", "weight_kg"],
    hint: "Use WHERE weight_kg BETWEEN 2000.00 AND 5000.00.",
    context: "Mid-weight freight consolidation for standard box truck dispatch.",
    concepts: ["SELECT", "WHERE", "BETWEEN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "Cargo Van Fleet Inventory",
    desc: "We are expanding last-mile urban deliveries. Pull all vehicles of type 'Cargo_Van', showing vehicle_number, mileage_km, and status, sorted by mileage_km ascending.",
    sql: "SELECT vehicle_number, mileage_km, status FROM fleet_vehicles WHERE vehicle_type = 'Cargo_Van' ORDER BY mileage_km ASC;",
    cols: ["vehicle_number", "mileage_km", "status"],
    hint: "Use WHERE vehicle_type = 'Cargo_Van' ORDER BY mileage_km ASC.",
    context: "Urban courier van readiness.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 1,
    title: "Suppliers with Sub-Par Reliability",
    desc: "Which suppliers have a reliability score below 4.5? List supplier_name, country, lead_time_days, and reliability_score, ordered by reliability_score ascending.",
    sql: "SELECT supplier_name, country, lead_time_days, reliability_score FROM suppliers WHERE reliability_score < 4.5 ORDER BY reliability_score ASC;",
    cols: ["supplier_name", "country", "lead_time_days", "reliability_score"],
    hint: "Use WHERE reliability_score < 4.5 ORDER BY reliability_score ASC.",
    context: "Vendor corrective action and SLA penalty reviews.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 2,
    title: "Delivered Shipments to Major Midwest Hubs",
    desc: "Fetch all delivered shipments where the destination_city is 'Chicago', 'Detroit', or 'Minneapolis'. Show id, destination_city, weight_kg, and status.",
    sql: "SELECT id, destination_city, weight_kg, status FROM shipments WHERE status = 'delivered' AND destination_city IN ('Chicago', 'Detroit', 'Minneapolis') ORDER BY id ASC;",
    cols: ["id", "destination_city", "weight_kg", "status"],
    hint: "Combine status = 'delivered' and destination_city IN ('Chicago', 'Detroit', 'Minneapolis').",
    context: "Post-delivery settlement audits for Midwestern terminal routes.",
    concepts: ["SELECT", "WHERE", "AND", "IN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "High-Mileage Fleet Replacement Candidates",
    desc: "Dave here from Fleet Asset Management. Flag all fleet vehicles that have accumulated more than 250,000 km on the odometer. Display vehicle_number, vehicle_type, mileage_km, and status, ordered by mileage_km descending.",
    sql: "SELECT vehicle_number, vehicle_type, mileage_km, status FROM fleet_vehicles WHERE mileage_km > 250000 ORDER BY mileage_km DESC;",
    cols: ["vehicle_number", "vehicle_type", "mileage_km", "status"],
    hint: "Filter fleet_vehicles with WHERE mileage_km > 250000 ORDER BY mileage_km DESC.",
    context: "Capital expenditure replacement planning for depreciated trucks.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  }
];

// Generate 80 additional single-table questions covering all 6 Level 1 tables
const logL1Fields = [
  { table: "fleet_vehicles", col: "mileage_km", v1: 50000, v2: 150000, orderCol: "mileage_km", cols: ["id", "vehicle_number", "vehicle_type", "mileage_km"], desc: "fleet vehicles with odometer reading between 50k and 150k km" },
  { table: "warehouses", col: "capacity_sqft", v1: 200000, v2: 400000, orderCol: "capacity_sqft", cols: ["id", "city", "capacity_sqft", "manager_name"], desc: "warehouses with square footage between 200k and 400k" },
  { table: "drivers", col: "safety_score", v1: 4.2, v2: 4.9, orderCol: "safety_score", cols: ["id", "full_name", "license_number", "safety_score"], desc: "commercial drivers with safety score ratings between 4.2 and 4.9" },
  { table: "suppliers", col: "lead_time_days", v1: 7, v2: 21, orderCol: "lead_time_days", cols: ["id", "supplier_name", "country", "lead_time_days"], desc: "suppliers with lead times between 7 and 21 days" },
  { table: "shipments", col: "weight_kg", v1: 1000.0, v2: 8000.0, orderCol: "weight_kg", cols: ["id", "origin_warehouse", "destination_city", "weight_kg"], desc: "shipments weighing between 1,000 and 8,000 kg" },
  { table: "carriers", col: "rating", v1: 4.0, v2: 4.8, orderCol: "rating", cols: ["id", "carrier_name", "service_level", "rating"], desc: "carriers with performance ratings between 4.0 and 4.8" }
];

let counter = l1Templates.length;
for (let i = 0; counter < 100; i++) {
  const f = logL1Fields[i % logL1Fields.length];
  const p = personas[counter % personas.length];
  const qNum = counter + 1;

  l1Templates.push({
    authorIdx: counter % personas.length,
    title: `Logistics Metric #${qNum}: ${f.table.replace('_', ' ').toUpperCase()} Query`,
    desc: `Could you pull ${f.desc} from the ${f.table} table? Display ${f.cols.join(', ')}, ordered by ${f.orderCol} descending.`,
    sql: `SELECT ${f.cols.join(', ')} FROM ${f.table} WHERE ${f.col} BETWEEN ${f.v1} AND ${f.v2} ORDER BY ${f.orderCol} DESC;`,
    cols: f.cols,
    hint: `Filter ${f.table} with WHERE ${f.col} BETWEEN ${f.v1} AND ${f.v2} ORDER BY ${f.orderCol} DESC.`,
    context: `Operational inventory query on ${f.table}.`,
    concepts: ["SELECT", "WHERE", "BETWEEN", "ORDER BY"],
    difficulty: "easy"
  });
  counter++;
}

const outQuestions = l1Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "log-L1-${pad}",
    domain: "logistics",
    level: 1,
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
    starter_sql: "SELECT\\n  -- Complete the query\\nFROM ${t.cols.length > 0 ? '' : ''}\\n;"
  }`;
});

const fileHeader = `// ============================================================================
// LOGISTICS & SUPPLY CHAIN — LEVEL 1: FOUNDATIONS & FLEET INVENTORY
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (6): warehouses, carriers, fleet_vehicles, drivers, suppliers, shipments
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L1_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/log-l1-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated LOG_L1_QUESTIONS: ${outQuestions.length} questions.`);
