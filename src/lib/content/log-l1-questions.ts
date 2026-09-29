// ============================================================================
// LOGISTICS & SUPPLY CHAIN — LEVEL 1: FOUNDATIONS & FLEET INVENTORY
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (6): warehouses, carriers, fleet_vehicles, drivers, suppliers, shipments
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L1_QUESTIONS: QuestionDefinition[] = [
  {
    id: "log-L1-001",
    domain: "logistics",
    level: 1,
    order: 1,
    difficulty: "warm-up",
    title: "Regional Distribution Hub Capacities",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Good morning! As part of our network footprint review, please pull all warehouse locations with their square footage and designated facility manager, sorted from highest capacity to lowest.",
    context_notes: "Reviewing distribution center capacity across logistics nodes.",
    concepts: ["SELECT","ORDER BY"],
    expected_columns: ["city","capacity_sqft","manager_name"],
    reference_sql: "SELECT city, capacity_sqft, manager_name FROM warehouses ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Select city, capacity_sqft, manager_name from warehouses and order by capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-002",
    domain: "logistics",
    level: 1,
    order: 2,
    difficulty: "warm-up",
    title: "Active Semi-Truck Fleet Roster",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Dave here from Fleet Ops. Could you bring up all active semi-trucks in our fleet? Show vehicle_number, max_weight_capacity_kg, and current mileage_km, sorted by mileage descending so we see high-wear units first.",
    context_notes: "Active heavy transport truck deployment and mileage monitoring.",
    concepts: ["SELECT","WHERE","AND","ORDER BY"],
    expected_columns: ["vehicle_number","max_weight_capacity_kg","mileage_km"],
    reference_sql: "SELECT vehicle_number, max_weight_capacity_kg, mileage_km FROM fleet_vehicles WHERE vehicle_type = 'Semi_Truck' AND status = 'active' ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE vehicle_type = 'Semi_Truck' AND status = 'active'."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-003",
    domain: "logistics",
    level: 1,
    order: 3,
    difficulty: "warm-up",
    title: "Top-Tier Freight Carrier Partners",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Claire here. I need a directory of our top-rated freight carriers with a service quality rating of 4.5 or higher. Display carrier_name, service_level, and rating, ordered by rating descending.",
    context_notes: "Reviewing premium tier freight carrier performance.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["carrier_name","service_level","rating"],
    reference_sql: "SELECT carrier_name, service_level, rating FROM carriers WHERE rating >= 4.5 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE rating >= 4.5 on the carriers table and order by rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-004",
    domain: "logistics",
    level: 1,
    order: 4,
    difficulty: "easy",
    title: "Pending and In-Transit Shipments",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Frank at the terminal crossdock. Pull all shipments currently marked as either 'in_transit' or 'pending'. Display id, origin_warehouse, destination_city, and weight_kg, ordered by weight_kg desc.",
    context_notes: "Tracking active loads moving through the transit pipeline.",
    concepts: ["SELECT","WHERE","IN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE status IN ('in_transit', 'pending') ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments using WHERE status IN ('in_transit', 'pending')."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-005",
    domain: "logistics",
    level: 1,
    order: 5,
    difficulty: "easy",
    title: "Senior Drivers with Stellar Safety Scores",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "We want to award safe driving milestone bonuses. Retrieve all drivers with at least 10 years of commercial driving experience and a safety score of 4.8 or higher. Show full_name, license_number, experience_years, and safety_score.",
    context_notes: "Safety incentive qualification for veteran commercial drivers.",
    concepts: ["SELECT","WHERE","AND","ORDER BY"],
    expected_columns: ["full_name","license_number","experience_years","safety_score"],
    reference_sql: "SELECT full_name, license_number, experience_years, safety_score FROM drivers WHERE experience_years >= 10 AND safety_score >= 4.8 ORDER BY safety_score DESC, experience_years DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE experience_years >= 10 AND safety_score >= 4.8."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-006",
    domain: "logistics",
    level: 1,
    order: 6,
    difficulty: "easy",
    title: "Rapid Lead-Time Global Suppliers",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify international parts suppliers capable of fulfilling orders within 10 days. Return supplier_name, country, lead_time_days, and reliability_score, ordered by lead_time_days ascending.",
    context_notes: "Sourcing quick-turnaround replenishment suppliers.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["supplier_name","country","lead_time_days","reliability_score"],
    reference_sql: "SELECT supplier_name, country, lead_time_days, reliability_score FROM suppliers WHERE lead_time_days <= 10 ORDER BY lead_time_days ASC, reliability_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers WHERE lead_time_days <= 10."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-007",
    domain: "logistics",
    level: 1,
    order: 7,
    difficulty: "easy",
    title: "Heavy Haul Shipments Over 10,000 Kilograms",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "We need an axle-weight compliance check on heavy freight loads. Find all shipments where weight_kg exceeds 10,000 kg. Return id, origin_warehouse, destination_city, weight_kg, and status.",
    context_notes: "Bridge weight and DOT highway permitting compliance.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg","status"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg, status FROM shipments WHERE weight_kg > 10000.00 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE weight_kg > 10000.00 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-008",
    domain: "logistics",
    level: 1,
    order: 8,
    difficulty: "easy",
    title: "Fleet Vehicles in Maintenance or Idle Status",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Please list all fleet vehicles that are currently sidelined — status 'in_maintenance' or 'idle'. Display vehicle_number, vehicle_type, mileage_km, and status, sorted by vehicle_type.",
    context_notes: "Fleet utilization and service bay staging.",
    concepts: ["SELECT","WHERE","IN","ORDER BY"],
    expected_columns: ["vehicle_number","vehicle_type","mileage_km","status"],
    reference_sql: "SELECT vehicle_number, vehicle_type, mileage_km, status FROM fleet_vehicles WHERE status IN ('in_maintenance', 'idle') ORDER BY vehicle_type ASC, mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE status IN ('in_maintenance', 'idle')."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-009",
    domain: "logistics",
    level: 1,
    order: 9,
    difficulty: "easy",
    title: "North American Suppliers Footprint",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Pull all parts suppliers located in the United States, Canada, or Mexico. Display supplier_name, country, lead_time_days, and reliability_score, ordered by country.",
    context_notes: "Nearshoring and USMCA trade corridor vendor sourcing.",
    concepts: ["SELECT","WHERE","IN","ORDER BY"],
    expected_columns: ["supplier_name","country","lead_time_days","reliability_score"],
    reference_sql: "SELECT supplier_name, country, lead_time_days, reliability_score FROM suppliers WHERE country IN ('USA', 'Canada', 'Mexico') ORDER BY country ASC, supplier_name ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE country IN ('USA', 'Canada', 'Mexico')."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-010",
    domain: "logistics",
    level: 1,
    order: 10,
    difficulty: "easy",
    title: "Shipments Bound for West Coast Hubs",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Which shipments are destined for Seattle, Portland, or San Diego? Show id, destination_city, weight_kg, and status, ordered by destination_city.",
    context_notes: "Consolidating Pacific freight corridor dispatch.",
    concepts: ["SELECT","WHERE","IN","ORDER BY"],
    expected_columns: ["id","destination_city","weight_kg","status"],
    reference_sql: "SELECT id, destination_city, weight_kg, status FROM shipments WHERE destination_city IN ('Seattle', 'Portland', 'San Diego') ORDER BY destination_city ASC, id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE destination_city IN ('Seattle', 'Portland', 'San Diego')."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-011",
    domain: "logistics",
    level: 1,
    order: 11,
    difficulty: "easy",
    title: "Refrigerated Reefer Fleet Readiness",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Inspect our cold chain transport fleet. Find all vehicles of type 'Reefer' with mileage below 150,000 km. Display vehicle_number, max_weight_capacity_kg, mileage_km, and status.",
    context_notes: "Deploying low-mileage refrigerated assets for sensitive pharmaceutical loads.",
    concepts: ["SELECT","WHERE","AND","ORDER BY"],
    expected_columns: ["vehicle_number","max_weight_capacity_kg","mileage_km","status"],
    reference_sql: "SELECT vehicle_number, max_weight_capacity_kg, mileage_km, status FROM fleet_vehicles WHERE vehicle_type = 'Reefer' AND mileage_km < 150000 ORDER BY mileage_km ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with WHERE vehicle_type = 'Reefer' AND mileage_km < 150000."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-012",
    domain: "logistics",
    level: 1,
    order: 12,
    difficulty: "warm-up",
    title: "High-Capacity Warehouses Above 300,000 Sqft",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Which mega-warehouses have a footprint of at least 300,000 sq ft? List city, capacity_sqft, and manager_name, ordered by capacity_sqft descending.",
    context_notes: "Strategic regional fulfillment node identification.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["city","capacity_sqft","manager_name"],
    reference_sql: "SELECT city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft >= 300000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE capacity_sqft >= 300000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-013",
    domain: "logistics",
    level: 1,
    order: 13,
    difficulty: "warm-up",
    title: "Delayed Shipments Requiring Investigation",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Crossdock alerts report customer delivery delays. Retrieve all shipments where status is 'delayed'. Return id, origin_warehouse, destination_city, and weight_kg.",
    context_notes: "Root cause analysis on delayed logistics routes.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE status = 'delayed' ORDER BY id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE status = 'delayed'."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-014",
    domain: "logistics",
    level: 1,
    order: 14,
    difficulty: "warm-up",
    title: "Commercial Drivers by Seniority",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "List the top 10 most experienced commercial drivers on our payroll. Display full_name, experience_years, safety_score, and license_number, ordered by experience_years descending.",
    context_notes: "Driver tenure and mentoring program leadership.",
    concepts: ["SELECT","ORDER BY","LIMIT"],
    expected_columns: ["full_name","experience_years","safety_score","license_number"],
    reference_sql: "SELECT full_name, experience_years, safety_score, license_number FROM drivers ORDER BY experience_years DESC LIMIT 10;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use ORDER BY experience_years DESC LIMIT 10."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-015",
    domain: "logistics",
    level: 1,
    order: 15,
    difficulty: "easy",
    title: "Carriers Offering Expedited or Next-Day Service",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Find all freight carriers whose service_level includes 'Next-Day' or 'Expedited'. Return carrier_name, service_level, and rating, ordered by carrier_name.",
    context_notes: "Routing critical expedited rush deliveries.",
    concepts: ["SELECT","WHERE","LIKE","OR","ORDER BY"],
    expected_columns: ["carrier_name","service_level","rating"],
    reference_sql: "SELECT carrier_name, service_level, rating FROM carriers WHERE service_level LIKE '%Next-Day%' OR service_level LIKE '%Expedited%' ORDER BY carrier_name ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE service_level LIKE '%Next-Day%' OR service_level LIKE '%Expedited%'."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-016",
    domain: "logistics",
    level: 1,
    order: 16,
    difficulty: "easy",
    title: "Shipments Weighing Between 2,000 and 5,000 Kilograms",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Retrieve all mid-weight shipments (between 2,000 and 5,000 kg inclusive). Show id, origin_warehouse, destination_city, and weight_kg, sorted by weight_kg.",
    context_notes: "Mid-weight freight consolidation for standard box truck dispatch.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 2000.00 AND 5000.00 ORDER BY weight_kg ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE weight_kg BETWEEN 2000.00 AND 5000.00."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-017",
    domain: "logistics",
    level: 1,
    order: 17,
    difficulty: "warm-up",
    title: "Cargo Van Fleet Inventory",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "We are expanding last-mile urban deliveries. Pull all vehicles of type 'Cargo_Van', showing vehicle_number, mileage_km, and status, sorted by mileage_km ascending.",
    context_notes: "Urban courier van readiness.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["vehicle_number","mileage_km","status"],
    reference_sql: "SELECT vehicle_number, mileage_km, status FROM fleet_vehicles WHERE vehicle_type = 'Cargo_Van' ORDER BY mileage_km ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE vehicle_type = 'Cargo_Van' ORDER BY mileage_km ASC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-018",
    domain: "logistics",
    level: 1,
    order: 18,
    difficulty: "easy",
    title: "Suppliers with Sub-Par Reliability",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Which suppliers have a reliability score below 4.5? List supplier_name, country, lead_time_days, and reliability_score, ordered by reliability_score ascending.",
    context_notes: "Vendor corrective action and SLA penalty reviews.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["supplier_name","country","lead_time_days","reliability_score"],
    reference_sql: "SELECT supplier_name, country, lead_time_days, reliability_score FROM suppliers WHERE reliability_score < 4.5 ORDER BY reliability_score ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE reliability_score < 4.5 ORDER BY reliability_score ASC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-019",
    domain: "logistics",
    level: 1,
    order: 19,
    difficulty: "easy",
    title: "Delivered Shipments to Major Midwest Hubs",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Fetch all delivered shipments where the destination_city is 'Chicago', 'Detroit', or 'Minneapolis'. Show id, destination_city, weight_kg, and status.",
    context_notes: "Post-delivery settlement audits for Midwestern terminal routes.",
    concepts: ["SELECT","WHERE","AND","IN","ORDER BY"],
    expected_columns: ["id","destination_city","weight_kg","status"],
    reference_sql: "SELECT id, destination_city, weight_kg, status FROM shipments WHERE status = 'delivered' AND destination_city IN ('Chicago', 'Detroit', 'Minneapolis') ORDER BY id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Combine status = 'delivered' and destination_city IN ('Chicago', 'Detroit', 'Minneapolis')."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-020",
    domain: "logistics",
    level: 1,
    order: 20,
    difficulty: "warm-up",
    title: "High-Mileage Fleet Replacement Candidates",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Dave here from Fleet Asset Management. Flag all fleet vehicles that have accumulated more than 250,000 km on the odometer. Display vehicle_number, vehicle_type, mileage_km, and status, ordered by mileage_km descending.",
    context_notes: "Capital expenditure replacement planning for depreciated trucks.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["vehicle_number","vehicle_type","mileage_km","status"],
    reference_sql: "SELECT vehicle_number, vehicle_type, mileage_km, status FROM fleet_vehicles WHERE mileage_km > 250000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km > 250000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-021",
    domain: "logistics",
    level: 1,
    order: 21,
    difficulty: "easy",
    title: "Logistics Metric #21: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-022",
    domain: "logistics",
    level: 1,
    order: 22,
    difficulty: "easy",
    title: "Logistics Metric #22: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-023",
    domain: "logistics",
    level: 1,
    order: 23,
    difficulty: "easy",
    title: "Logistics Metric #23: DRIVERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull commercial drivers with safety score ratings between 4.2 and 4.9 from the drivers table? Display id, full_name, license_number, safety_score, ordered by safety_score descending.",
    context_notes: "Operational inventory query on drivers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","full_name","license_number","safety_score"],
    reference_sql: "SELECT id, full_name, license_number, safety_score FROM drivers WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter drivers with WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-024",
    domain: "logistics",
    level: 1,
    order: 24,
    difficulty: "easy",
    title: "Logistics Metric #24: SUPPLIERS Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull suppliers with lead times between 7 and 21 days from the suppliers table? Display id, supplier_name, country, lead_time_days, ordered by lead_time_days descending.",
    context_notes: "Operational inventory query on suppliers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","supplier_name","country","lead_time_days"],
    reference_sql: "SELECT id, supplier_name, country, lead_time_days FROM suppliers WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers with WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-025",
    domain: "logistics",
    level: 1,
    order: 25,
    difficulty: "easy",
    title: "Logistics Metric #25: SHIPMENTS Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull shipments weighing between 1,000 and 8,000 kg from the shipments table? Display id, origin_warehouse, destination_city, weight_kg, ordered by weight_kg descending.",
    context_notes: "Operational inventory query on shipments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments with WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-026",
    domain: "logistics",
    level: 1,
    order: 26,
    difficulty: "easy",
    title: "Logistics Metric #26: CARRIERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull carriers with performance ratings between 4.0 and 4.8 from the carriers table? Display id, carrier_name, service_level, rating, ordered by rating descending.",
    context_notes: "Operational inventory query on carriers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","carrier_name","service_level","rating"],
    reference_sql: "SELECT id, carrier_name, service_level, rating FROM carriers WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter carriers with WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-027",
    domain: "logistics",
    level: 1,
    order: 27,
    difficulty: "easy",
    title: "Logistics Metric #27: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-028",
    domain: "logistics",
    level: 1,
    order: 28,
    difficulty: "easy",
    title: "Logistics Metric #28: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-029",
    domain: "logistics",
    level: 1,
    order: 29,
    difficulty: "easy",
    title: "Logistics Metric #29: DRIVERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull commercial drivers with safety score ratings between 4.2 and 4.9 from the drivers table? Display id, full_name, license_number, safety_score, ordered by safety_score descending.",
    context_notes: "Operational inventory query on drivers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","full_name","license_number","safety_score"],
    reference_sql: "SELECT id, full_name, license_number, safety_score FROM drivers WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter drivers with WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-030",
    domain: "logistics",
    level: 1,
    order: 30,
    difficulty: "easy",
    title: "Logistics Metric #30: SUPPLIERS Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull suppliers with lead times between 7 and 21 days from the suppliers table? Display id, supplier_name, country, lead_time_days, ordered by lead_time_days descending.",
    context_notes: "Operational inventory query on suppliers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","supplier_name","country","lead_time_days"],
    reference_sql: "SELECT id, supplier_name, country, lead_time_days FROM suppliers WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers with WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-031",
    domain: "logistics",
    level: 1,
    order: 31,
    difficulty: "easy",
    title: "Logistics Metric #31: SHIPMENTS Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull shipments weighing between 1,000 and 8,000 kg from the shipments table? Display id, origin_warehouse, destination_city, weight_kg, ordered by weight_kg descending.",
    context_notes: "Operational inventory query on shipments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments with WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-032",
    domain: "logistics",
    level: 1,
    order: 32,
    difficulty: "easy",
    title: "Logistics Metric #32: CARRIERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull carriers with performance ratings between 4.0 and 4.8 from the carriers table? Display id, carrier_name, service_level, rating, ordered by rating descending.",
    context_notes: "Operational inventory query on carriers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","carrier_name","service_level","rating"],
    reference_sql: "SELECT id, carrier_name, service_level, rating FROM carriers WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter carriers with WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-033",
    domain: "logistics",
    level: 1,
    order: 33,
    difficulty: "easy",
    title: "Logistics Metric #33: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-034",
    domain: "logistics",
    level: 1,
    order: 34,
    difficulty: "easy",
    title: "Logistics Metric #34: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-035",
    domain: "logistics",
    level: 1,
    order: 35,
    difficulty: "easy",
    title: "Logistics Metric #35: DRIVERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull commercial drivers with safety score ratings between 4.2 and 4.9 from the drivers table? Display id, full_name, license_number, safety_score, ordered by safety_score descending.",
    context_notes: "Operational inventory query on drivers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","full_name","license_number","safety_score"],
    reference_sql: "SELECT id, full_name, license_number, safety_score FROM drivers WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter drivers with WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-036",
    domain: "logistics",
    level: 1,
    order: 36,
    difficulty: "easy",
    title: "Logistics Metric #36: SUPPLIERS Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull suppliers with lead times between 7 and 21 days from the suppliers table? Display id, supplier_name, country, lead_time_days, ordered by lead_time_days descending.",
    context_notes: "Operational inventory query on suppliers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","supplier_name","country","lead_time_days"],
    reference_sql: "SELECT id, supplier_name, country, lead_time_days FROM suppliers WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers with WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-037",
    domain: "logistics",
    level: 1,
    order: 37,
    difficulty: "easy",
    title: "Logistics Metric #37: SHIPMENTS Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull shipments weighing between 1,000 and 8,000 kg from the shipments table? Display id, origin_warehouse, destination_city, weight_kg, ordered by weight_kg descending.",
    context_notes: "Operational inventory query on shipments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments with WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-038",
    domain: "logistics",
    level: 1,
    order: 38,
    difficulty: "easy",
    title: "Logistics Metric #38: CARRIERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull carriers with performance ratings between 4.0 and 4.8 from the carriers table? Display id, carrier_name, service_level, rating, ordered by rating descending.",
    context_notes: "Operational inventory query on carriers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","carrier_name","service_level","rating"],
    reference_sql: "SELECT id, carrier_name, service_level, rating FROM carriers WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter carriers with WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-039",
    domain: "logistics",
    level: 1,
    order: 39,
    difficulty: "easy",
    title: "Logistics Metric #39: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-040",
    domain: "logistics",
    level: 1,
    order: 40,
    difficulty: "easy",
    title: "Logistics Metric #40: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-041",
    domain: "logistics",
    level: 1,
    order: 41,
    difficulty: "easy",
    title: "Logistics Metric #41: DRIVERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull commercial drivers with safety score ratings between 4.2 and 4.9 from the drivers table? Display id, full_name, license_number, safety_score, ordered by safety_score descending.",
    context_notes: "Operational inventory query on drivers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","full_name","license_number","safety_score"],
    reference_sql: "SELECT id, full_name, license_number, safety_score FROM drivers WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter drivers with WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-042",
    domain: "logistics",
    level: 1,
    order: 42,
    difficulty: "easy",
    title: "Logistics Metric #42: SUPPLIERS Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull suppliers with lead times between 7 and 21 days from the suppliers table? Display id, supplier_name, country, lead_time_days, ordered by lead_time_days descending.",
    context_notes: "Operational inventory query on suppliers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","supplier_name","country","lead_time_days"],
    reference_sql: "SELECT id, supplier_name, country, lead_time_days FROM suppliers WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers with WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-043",
    domain: "logistics",
    level: 1,
    order: 43,
    difficulty: "easy",
    title: "Logistics Metric #43: SHIPMENTS Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull shipments weighing between 1,000 and 8,000 kg from the shipments table? Display id, origin_warehouse, destination_city, weight_kg, ordered by weight_kg descending.",
    context_notes: "Operational inventory query on shipments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments with WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-044",
    domain: "logistics",
    level: 1,
    order: 44,
    difficulty: "easy",
    title: "Logistics Metric #44: CARRIERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull carriers with performance ratings between 4.0 and 4.8 from the carriers table? Display id, carrier_name, service_level, rating, ordered by rating descending.",
    context_notes: "Operational inventory query on carriers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","carrier_name","service_level","rating"],
    reference_sql: "SELECT id, carrier_name, service_level, rating FROM carriers WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter carriers with WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-045",
    domain: "logistics",
    level: 1,
    order: 45,
    difficulty: "easy",
    title: "Logistics Metric #45: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-046",
    domain: "logistics",
    level: 1,
    order: 46,
    difficulty: "easy",
    title: "Logistics Metric #46: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-047",
    domain: "logistics",
    level: 1,
    order: 47,
    difficulty: "easy",
    title: "Logistics Metric #47: DRIVERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull commercial drivers with safety score ratings between 4.2 and 4.9 from the drivers table? Display id, full_name, license_number, safety_score, ordered by safety_score descending.",
    context_notes: "Operational inventory query on drivers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","full_name","license_number","safety_score"],
    reference_sql: "SELECT id, full_name, license_number, safety_score FROM drivers WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter drivers with WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-048",
    domain: "logistics",
    level: 1,
    order: 48,
    difficulty: "easy",
    title: "Logistics Metric #48: SUPPLIERS Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull suppliers with lead times between 7 and 21 days from the suppliers table? Display id, supplier_name, country, lead_time_days, ordered by lead_time_days descending.",
    context_notes: "Operational inventory query on suppliers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","supplier_name","country","lead_time_days"],
    reference_sql: "SELECT id, supplier_name, country, lead_time_days FROM suppliers WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers with WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-049",
    domain: "logistics",
    level: 1,
    order: 49,
    difficulty: "easy",
    title: "Logistics Metric #49: SHIPMENTS Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull shipments weighing between 1,000 and 8,000 kg from the shipments table? Display id, origin_warehouse, destination_city, weight_kg, ordered by weight_kg descending.",
    context_notes: "Operational inventory query on shipments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments with WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-050",
    domain: "logistics",
    level: 1,
    order: 50,
    difficulty: "easy",
    title: "Logistics Metric #50: CARRIERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull carriers with performance ratings between 4.0 and 4.8 from the carriers table? Display id, carrier_name, service_level, rating, ordered by rating descending.",
    context_notes: "Operational inventory query on carriers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","carrier_name","service_level","rating"],
    reference_sql: "SELECT id, carrier_name, service_level, rating FROM carriers WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter carriers with WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-051",
    domain: "logistics",
    level: 1,
    order: 51,
    difficulty: "easy",
    title: "Logistics Metric #51: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-052",
    domain: "logistics",
    level: 1,
    order: 52,
    difficulty: "easy",
    title: "Logistics Metric #52: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-053",
    domain: "logistics",
    level: 1,
    order: 53,
    difficulty: "easy",
    title: "Logistics Metric #53: DRIVERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull commercial drivers with safety score ratings between 4.2 and 4.9 from the drivers table? Display id, full_name, license_number, safety_score, ordered by safety_score descending.",
    context_notes: "Operational inventory query on drivers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","full_name","license_number","safety_score"],
    reference_sql: "SELECT id, full_name, license_number, safety_score FROM drivers WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter drivers with WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-054",
    domain: "logistics",
    level: 1,
    order: 54,
    difficulty: "easy",
    title: "Logistics Metric #54: SUPPLIERS Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull suppliers with lead times between 7 and 21 days from the suppliers table? Display id, supplier_name, country, lead_time_days, ordered by lead_time_days descending.",
    context_notes: "Operational inventory query on suppliers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","supplier_name","country","lead_time_days"],
    reference_sql: "SELECT id, supplier_name, country, lead_time_days FROM suppliers WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers with WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-055",
    domain: "logistics",
    level: 1,
    order: 55,
    difficulty: "easy",
    title: "Logistics Metric #55: SHIPMENTS Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull shipments weighing between 1,000 and 8,000 kg from the shipments table? Display id, origin_warehouse, destination_city, weight_kg, ordered by weight_kg descending.",
    context_notes: "Operational inventory query on shipments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments with WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-056",
    domain: "logistics",
    level: 1,
    order: 56,
    difficulty: "easy",
    title: "Logistics Metric #56: CARRIERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull carriers with performance ratings between 4.0 and 4.8 from the carriers table? Display id, carrier_name, service_level, rating, ordered by rating descending.",
    context_notes: "Operational inventory query on carriers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","carrier_name","service_level","rating"],
    reference_sql: "SELECT id, carrier_name, service_level, rating FROM carriers WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter carriers with WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-057",
    domain: "logistics",
    level: 1,
    order: 57,
    difficulty: "easy",
    title: "Logistics Metric #57: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-058",
    domain: "logistics",
    level: 1,
    order: 58,
    difficulty: "easy",
    title: "Logistics Metric #58: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-059",
    domain: "logistics",
    level: 1,
    order: 59,
    difficulty: "easy",
    title: "Logistics Metric #59: DRIVERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull commercial drivers with safety score ratings between 4.2 and 4.9 from the drivers table? Display id, full_name, license_number, safety_score, ordered by safety_score descending.",
    context_notes: "Operational inventory query on drivers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","full_name","license_number","safety_score"],
    reference_sql: "SELECT id, full_name, license_number, safety_score FROM drivers WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter drivers with WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-060",
    domain: "logistics",
    level: 1,
    order: 60,
    difficulty: "easy",
    title: "Logistics Metric #60: SUPPLIERS Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull suppliers with lead times between 7 and 21 days from the suppliers table? Display id, supplier_name, country, lead_time_days, ordered by lead_time_days descending.",
    context_notes: "Operational inventory query on suppliers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","supplier_name","country","lead_time_days"],
    reference_sql: "SELECT id, supplier_name, country, lead_time_days FROM suppliers WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers with WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-061",
    domain: "logistics",
    level: 1,
    order: 61,
    difficulty: "easy",
    title: "Logistics Metric #61: SHIPMENTS Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull shipments weighing between 1,000 and 8,000 kg from the shipments table? Display id, origin_warehouse, destination_city, weight_kg, ordered by weight_kg descending.",
    context_notes: "Operational inventory query on shipments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments with WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-062",
    domain: "logistics",
    level: 1,
    order: 62,
    difficulty: "easy",
    title: "Logistics Metric #62: CARRIERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull carriers with performance ratings between 4.0 and 4.8 from the carriers table? Display id, carrier_name, service_level, rating, ordered by rating descending.",
    context_notes: "Operational inventory query on carriers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","carrier_name","service_level","rating"],
    reference_sql: "SELECT id, carrier_name, service_level, rating FROM carriers WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter carriers with WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-063",
    domain: "logistics",
    level: 1,
    order: 63,
    difficulty: "easy",
    title: "Logistics Metric #63: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-064",
    domain: "logistics",
    level: 1,
    order: 64,
    difficulty: "easy",
    title: "Logistics Metric #64: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-065",
    domain: "logistics",
    level: 1,
    order: 65,
    difficulty: "easy",
    title: "Logistics Metric #65: DRIVERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull commercial drivers with safety score ratings between 4.2 and 4.9 from the drivers table? Display id, full_name, license_number, safety_score, ordered by safety_score descending.",
    context_notes: "Operational inventory query on drivers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","full_name","license_number","safety_score"],
    reference_sql: "SELECT id, full_name, license_number, safety_score FROM drivers WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter drivers with WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-066",
    domain: "logistics",
    level: 1,
    order: 66,
    difficulty: "easy",
    title: "Logistics Metric #66: SUPPLIERS Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull suppliers with lead times between 7 and 21 days from the suppliers table? Display id, supplier_name, country, lead_time_days, ordered by lead_time_days descending.",
    context_notes: "Operational inventory query on suppliers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","supplier_name","country","lead_time_days"],
    reference_sql: "SELECT id, supplier_name, country, lead_time_days FROM suppliers WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers with WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-067",
    domain: "logistics",
    level: 1,
    order: 67,
    difficulty: "easy",
    title: "Logistics Metric #67: SHIPMENTS Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull shipments weighing between 1,000 and 8,000 kg from the shipments table? Display id, origin_warehouse, destination_city, weight_kg, ordered by weight_kg descending.",
    context_notes: "Operational inventory query on shipments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments with WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-068",
    domain: "logistics",
    level: 1,
    order: 68,
    difficulty: "easy",
    title: "Logistics Metric #68: CARRIERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull carriers with performance ratings between 4.0 and 4.8 from the carriers table? Display id, carrier_name, service_level, rating, ordered by rating descending.",
    context_notes: "Operational inventory query on carriers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","carrier_name","service_level","rating"],
    reference_sql: "SELECT id, carrier_name, service_level, rating FROM carriers WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter carriers with WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-069",
    domain: "logistics",
    level: 1,
    order: 69,
    difficulty: "easy",
    title: "Logistics Metric #69: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-070",
    domain: "logistics",
    level: 1,
    order: 70,
    difficulty: "easy",
    title: "Logistics Metric #70: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-071",
    domain: "logistics",
    level: 1,
    order: 71,
    difficulty: "easy",
    title: "Logistics Metric #71: DRIVERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull commercial drivers with safety score ratings between 4.2 and 4.9 from the drivers table? Display id, full_name, license_number, safety_score, ordered by safety_score descending.",
    context_notes: "Operational inventory query on drivers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","full_name","license_number","safety_score"],
    reference_sql: "SELECT id, full_name, license_number, safety_score FROM drivers WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter drivers with WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-072",
    domain: "logistics",
    level: 1,
    order: 72,
    difficulty: "easy",
    title: "Logistics Metric #72: SUPPLIERS Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull suppliers with lead times between 7 and 21 days from the suppliers table? Display id, supplier_name, country, lead_time_days, ordered by lead_time_days descending.",
    context_notes: "Operational inventory query on suppliers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","supplier_name","country","lead_time_days"],
    reference_sql: "SELECT id, supplier_name, country, lead_time_days FROM suppliers WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers with WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-073",
    domain: "logistics",
    level: 1,
    order: 73,
    difficulty: "easy",
    title: "Logistics Metric #73: SHIPMENTS Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull shipments weighing between 1,000 and 8,000 kg from the shipments table? Display id, origin_warehouse, destination_city, weight_kg, ordered by weight_kg descending.",
    context_notes: "Operational inventory query on shipments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments with WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-074",
    domain: "logistics",
    level: 1,
    order: 74,
    difficulty: "easy",
    title: "Logistics Metric #74: CARRIERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull carriers with performance ratings between 4.0 and 4.8 from the carriers table? Display id, carrier_name, service_level, rating, ordered by rating descending.",
    context_notes: "Operational inventory query on carriers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","carrier_name","service_level","rating"],
    reference_sql: "SELECT id, carrier_name, service_level, rating FROM carriers WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter carriers with WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-075",
    domain: "logistics",
    level: 1,
    order: 75,
    difficulty: "easy",
    title: "Logistics Metric #75: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-076",
    domain: "logistics",
    level: 1,
    order: 76,
    difficulty: "easy",
    title: "Logistics Metric #76: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-077",
    domain: "logistics",
    level: 1,
    order: 77,
    difficulty: "easy",
    title: "Logistics Metric #77: DRIVERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull commercial drivers with safety score ratings between 4.2 and 4.9 from the drivers table? Display id, full_name, license_number, safety_score, ordered by safety_score descending.",
    context_notes: "Operational inventory query on drivers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","full_name","license_number","safety_score"],
    reference_sql: "SELECT id, full_name, license_number, safety_score FROM drivers WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter drivers with WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-078",
    domain: "logistics",
    level: 1,
    order: 78,
    difficulty: "easy",
    title: "Logistics Metric #78: SUPPLIERS Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull suppliers with lead times between 7 and 21 days from the suppliers table? Display id, supplier_name, country, lead_time_days, ordered by lead_time_days descending.",
    context_notes: "Operational inventory query on suppliers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","supplier_name","country","lead_time_days"],
    reference_sql: "SELECT id, supplier_name, country, lead_time_days FROM suppliers WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers with WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-079",
    domain: "logistics",
    level: 1,
    order: 79,
    difficulty: "easy",
    title: "Logistics Metric #79: SHIPMENTS Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull shipments weighing between 1,000 and 8,000 kg from the shipments table? Display id, origin_warehouse, destination_city, weight_kg, ordered by weight_kg descending.",
    context_notes: "Operational inventory query on shipments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments with WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-080",
    domain: "logistics",
    level: 1,
    order: 80,
    difficulty: "easy",
    title: "Logistics Metric #80: CARRIERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull carriers with performance ratings between 4.0 and 4.8 from the carriers table? Display id, carrier_name, service_level, rating, ordered by rating descending.",
    context_notes: "Operational inventory query on carriers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","carrier_name","service_level","rating"],
    reference_sql: "SELECT id, carrier_name, service_level, rating FROM carriers WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter carriers with WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-081",
    domain: "logistics",
    level: 1,
    order: 81,
    difficulty: "easy",
    title: "Logistics Metric #81: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-082",
    domain: "logistics",
    level: 1,
    order: 82,
    difficulty: "easy",
    title: "Logistics Metric #82: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-083",
    domain: "logistics",
    level: 1,
    order: 83,
    difficulty: "easy",
    title: "Logistics Metric #83: DRIVERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull commercial drivers with safety score ratings between 4.2 and 4.9 from the drivers table? Display id, full_name, license_number, safety_score, ordered by safety_score descending.",
    context_notes: "Operational inventory query on drivers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","full_name","license_number","safety_score"],
    reference_sql: "SELECT id, full_name, license_number, safety_score FROM drivers WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter drivers with WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-084",
    domain: "logistics",
    level: 1,
    order: 84,
    difficulty: "easy",
    title: "Logistics Metric #84: SUPPLIERS Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull suppliers with lead times between 7 and 21 days from the suppliers table? Display id, supplier_name, country, lead_time_days, ordered by lead_time_days descending.",
    context_notes: "Operational inventory query on suppliers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","supplier_name","country","lead_time_days"],
    reference_sql: "SELECT id, supplier_name, country, lead_time_days FROM suppliers WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers with WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-085",
    domain: "logistics",
    level: 1,
    order: 85,
    difficulty: "easy",
    title: "Logistics Metric #85: SHIPMENTS Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull shipments weighing between 1,000 and 8,000 kg from the shipments table? Display id, origin_warehouse, destination_city, weight_kg, ordered by weight_kg descending.",
    context_notes: "Operational inventory query on shipments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments with WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-086",
    domain: "logistics",
    level: 1,
    order: 86,
    difficulty: "easy",
    title: "Logistics Metric #86: CARRIERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull carriers with performance ratings between 4.0 and 4.8 from the carriers table? Display id, carrier_name, service_level, rating, ordered by rating descending.",
    context_notes: "Operational inventory query on carriers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","carrier_name","service_level","rating"],
    reference_sql: "SELECT id, carrier_name, service_level, rating FROM carriers WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter carriers with WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-087",
    domain: "logistics",
    level: 1,
    order: 87,
    difficulty: "easy",
    title: "Logistics Metric #87: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-088",
    domain: "logistics",
    level: 1,
    order: 88,
    difficulty: "easy",
    title: "Logistics Metric #88: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-089",
    domain: "logistics",
    level: 1,
    order: 89,
    difficulty: "easy",
    title: "Logistics Metric #89: DRIVERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull commercial drivers with safety score ratings between 4.2 and 4.9 from the drivers table? Display id, full_name, license_number, safety_score, ordered by safety_score descending.",
    context_notes: "Operational inventory query on drivers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","full_name","license_number","safety_score"],
    reference_sql: "SELECT id, full_name, license_number, safety_score FROM drivers WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter drivers with WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-090",
    domain: "logistics",
    level: 1,
    order: 90,
    difficulty: "easy",
    title: "Logistics Metric #90: SUPPLIERS Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull suppliers with lead times between 7 and 21 days from the suppliers table? Display id, supplier_name, country, lead_time_days, ordered by lead_time_days descending.",
    context_notes: "Operational inventory query on suppliers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","supplier_name","country","lead_time_days"],
    reference_sql: "SELECT id, supplier_name, country, lead_time_days FROM suppliers WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers with WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-091",
    domain: "logistics",
    level: 1,
    order: 91,
    difficulty: "easy",
    title: "Logistics Metric #91: SHIPMENTS Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull shipments weighing between 1,000 and 8,000 kg from the shipments table? Display id, origin_warehouse, destination_city, weight_kg, ordered by weight_kg descending.",
    context_notes: "Operational inventory query on shipments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments with WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-092",
    domain: "logistics",
    level: 1,
    order: 92,
    difficulty: "easy",
    title: "Logistics Metric #92: CARRIERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull carriers with performance ratings between 4.0 and 4.8 from the carriers table? Display id, carrier_name, service_level, rating, ordered by rating descending.",
    context_notes: "Operational inventory query on carriers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","carrier_name","service_level","rating"],
    reference_sql: "SELECT id, carrier_name, service_level, rating FROM carriers WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter carriers with WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-093",
    domain: "logistics",
    level: 1,
    order: 93,
    difficulty: "easy",
    title: "Logistics Metric #93: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-094",
    domain: "logistics",
    level: 1,
    order: 94,
    difficulty: "easy",
    title: "Logistics Metric #94: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-095",
    domain: "logistics",
    level: 1,
    order: 95,
    difficulty: "easy",
    title: "Logistics Metric #95: DRIVERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull commercial drivers with safety score ratings between 4.2 and 4.9 from the drivers table? Display id, full_name, license_number, safety_score, ordered by safety_score descending.",
    context_notes: "Operational inventory query on drivers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","full_name","license_number","safety_score"],
    reference_sql: "SELECT id, full_name, license_number, safety_score FROM drivers WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter drivers with WHERE safety_score BETWEEN 4.2 AND 4.9 ORDER BY safety_score DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-096",
    domain: "logistics",
    level: 1,
    order: 96,
    difficulty: "easy",
    title: "Logistics Metric #96: SUPPLIERS Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull suppliers with lead times between 7 and 21 days from the suppliers table? Display id, supplier_name, country, lead_time_days, ordered by lead_time_days descending.",
    context_notes: "Operational inventory query on suppliers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","supplier_name","country","lead_time_days"],
    reference_sql: "SELECT id, supplier_name, country, lead_time_days FROM suppliers WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter suppliers with WHERE lead_time_days BETWEEN 7 AND 21 ORDER BY lead_time_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-097",
    domain: "logistics",
    level: 1,
    order: 97,
    difficulty: "easy",
    title: "Logistics Metric #97: SHIPMENTS Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull shipments weighing between 1,000 and 8,000 kg from the shipments table? Display id, origin_warehouse, destination_city, weight_kg, ordered by weight_kg descending.",
    context_notes: "Operational inventory query on shipments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","origin_warehouse","destination_city","weight_kg"],
    reference_sql: "SELECT id, origin_warehouse, destination_city, weight_kg FROM shipments WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter shipments with WHERE weight_kg BETWEEN 1000 AND 8000 ORDER BY weight_kg DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-098",
    domain: "logistics",
    level: 1,
    order: 98,
    difficulty: "easy",
    title: "Logistics Metric #98: CARRIERS Query",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Could you pull carriers with performance ratings between 4.0 and 4.8 from the carriers table? Display id, carrier_name, service_level, rating, ordered by rating descending.",
    context_notes: "Operational inventory query on carriers.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","carrier_name","service_level","rating"],
    reference_sql: "SELECT id, carrier_name, service_level, rating FROM carriers WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter carriers with WHERE rating BETWEEN 4 AND 4.8 ORDER BY rating DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-099",
    domain: "logistics",
    level: 1,
    order: 99,
    difficulty: "easy",
    title: "Logistics Metric #99: FLEET VEHICLES Query",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Could you pull fleet vehicles with odometer reading between 50k and 150k km from the fleet_vehicles table? Display id, vehicle_number, vehicle_type, mileage_km, ordered by mileage_km descending.",
    context_notes: "Operational inventory query on fleet_vehicles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT id, vehicle_number, vehicle_type, mileage_km FROM fleet_vehicles WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter fleet_vehicles with WHERE mileage_km BETWEEN 50000 AND 150000 ORDER BY mileage_km DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "log-L1-100",
    domain: "logistics",
    level: 1,
    order: 100,
    difficulty: "easy",
    title: "Logistics Metric #100: WAREHOUSES Query",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Could you pull warehouses with square footage between 200k and 400k from the warehouses table? Display id, city, capacity_sqft, manager_name, ordered by capacity_sqft descending.",
    context_notes: "Operational inventory query on warehouses.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","city","capacity_sqft","manager_name"],
    reference_sql: "SELECT id, city, capacity_sqft, manager_name FROM warehouses WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter warehouses with WHERE capacity_sqft BETWEEN 200000 AND 400000 ORDER BY capacity_sqft DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  }
];
