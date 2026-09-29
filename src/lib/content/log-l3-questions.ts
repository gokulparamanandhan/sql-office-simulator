// ============================================================================
// LOGISTICS & SUPPLY CHAIN — LEVEL 3: SUBQUERIES, CORRELATED FILTERS & SET OPS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (12): warehouses, carriers, fleet_vehicles, drivers, suppliers, shipments,
//              cargo_packages, freight_routes, delivery_checkpoints, parts_inventory,
//              fuel_logs, maintenance_records
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L3_QUESTIONS: QuestionDefinition[] = [
  {
    id: "log-L3-001",
    domain: "logistics",
    level: 3,
    order: 1,
    difficulty: "hard",
    title: "Fleet Vehicles with Above-Average Maintenance Costs",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Dave here from Fleet Ops. Find all fleet vehicles whose total maintenance expenditure exceeds the fleet-wide average maintenance cost per vehicle. Return vehicle id, vehicle_number, vehicle_type, and total maintenance cost.",
    context_notes: "Detecting maintenance cost outliers for fleet decommissioning or warranty claims.",
    concepts: ["HAVING","Scalar Subquery","SUM()","AVG()"],
    expected_columns: ["id","vehicle_number","vehicle_type","total_maintenance_cost"],
    reference_sql: "SELECT fv.id, fv.vehicle_number, fv.vehicle_type, SUM(mr.cost) AS total_maintenance_cost FROM fleet_vehicles fv JOIN maintenance_records mr ON fv.id = mr.vehicle_id GROUP BY fv.id, fv.vehicle_number, fv.vehicle_type HAVING SUM(mr.cost) > (SELECT AVG(cost) FROM maintenance_records) ORDER BY total_maintenance_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use HAVING SUM(mr.cost) > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-002",
    domain: "logistics",
    level: 3,
    order: 2,
    difficulty: "hard",
    title: "High-Cost Parts in Inventory Above Overall Mean Unit Cost",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Claire here. Identify all spare parts in inventory where the unit_cost is higher than the overall average unit cost across all parts. Display part_number, warehouse_id, quantity_in_stock, and unit_cost, ordered by unit_cost descending.",
    context_notes: "Auditing capital tied up in high-value replacement components.",
    concepts: ["Scalar Subquery","WHERE","AVG()"],
    expected_columns: ["part_number","warehouse_id","quantity_in_stock","unit_cost"],
    reference_sql: "SELECT part_number, warehouse_id, quantity_in_stock, unit_cost FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-003",
    domain: "logistics",
    level: 3,
    order: 3,
    difficulty: "hard",
    title: "Shipments Carrying Greater Than Average Total Declared Value",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Frank at crossdock dispatch. Find all shipments where the total declared value of its cargo packages exceeds the average package value across the entire freight network. Use a subquery to return shipment_id and total declared value.",
    context_notes: "Targeting high-liability shipments for premium security escort.",
    concepts: ["HAVING","Scalar Subquery","SUM()","AVG()"],
    expected_columns: ["shipment_id","total_val"],
    reference_sql: "SELECT shipment_id, SUM(declared_value) AS total_val FROM cargo_packages GROUP BY shipment_id HAVING SUM(declared_value) > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY total_val DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use HAVING SUM(declared_value) > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-004",
    domain: "logistics",
    level: 3,
    order: 4,
    difficulty: "hard",
    title: "Vehicles Requiring No Maintenance in Current Cycle (NOT EXISTS)",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Dave from Fleet. Find all active fleet vehicles that have zero recorded maintenance service entries. Display id, vehicle_number, vehicle_type, and mileage_km using NOT EXISTS.",
    context_notes: "Preventive maintenance scheduling for untouched vehicles.",
    concepts: ["NOT EXISTS","Correlated Subquery","Fleet Maintenance"],
    expected_columns: ["id","vehicle_number","vehicle_type","mileage_km"],
    reference_sql: "SELECT fv.id, fv.vehicle_number, fv.vehicle_type, fv.mileage_km FROM fleet_vehicles fv WHERE fv.status = 'active' AND NOT EXISTS (SELECT 1 FROM maintenance_records mr WHERE mr.vehicle_id = fv.id) ORDER BY fv.mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE fv.status = 'active' AND NOT EXISTS (SELECT 1 FROM maintenance_records mr WHERE mr.vehicle_id = fv.id)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-005",
    domain: "logistics",
    level: 3,
    order: 5,
    difficulty: "hard",
    title: "Warehouses Without Any Parts Inventory Stock (NOT IN)",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Claire here. Which warehouse locations currently do not stock any replacement parts? Display warehouse id, city, and manager_name.",
    context_notes: "Ensuring maintenance parts depots are adequately distributed.",
    concepts: ["NOT IN","Subquery","DISTINCT"],
    expected_columns: ["id","city","manager_name"],
    reference_sql: "SELECT w.id, w.city, w.manager_name FROM warehouses w WHERE w.id NOT IN (SELECT DISTINCT warehouse_id FROM parts_inventory WHERE warehouse_id IS NOT NULL) ORDER BY w.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE w.id NOT IN (SELECT DISTINCT warehouse_id FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-006",
    domain: "logistics",
    level: 3,
    order: 6,
    difficulty: "hard",
    title: "High Fuel Consumption Vehicles (Correlated Subquery)",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Find fleet vehicles whose single fuel log entry exceeded the average gallons filled for that specific vehicle. Show vehicle_id, gallons, and log_date, ordered by gallons descending.",
    context_notes: "Fuel anomaly and tank capacity breach monitoring.",
    concepts: ["Correlated Subquery","WHERE","Fuel Analytics"],
    expected_columns: ["vehicle_id","gallons","log_date"],
    reference_sql: "SELECT fl.vehicle_id, fl.gallons, fl.log_date FROM fuel_logs fl WHERE fl.gallons > (SELECT AVG(fl2.gallons) FROM fuel_logs fl2 WHERE fl2.vehicle_id = fl.vehicle_id) ORDER BY fl.gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a correlated subquery comparing fl.gallons with the vehicle's own average gallons."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-007",
    domain: "logistics",
    level: 3,
    order: 7,
    difficulty: "hard",
    title: "Shipments Crossing Checkpoints vs Non-Checkpoint Loads (UNION)",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Produce a unified listing of shipment IDs labeled by whether they have passed a security checkpoint or not. Return shipment id and scan status.",
    context_notes: "Checkpoint visibility coverage reporting.",
    concepts: ["UNION","Set Operations","NOT IN"],
    expected_columns: ["shipment_id","scan_status"],
    reference_sql: "SELECT DISTINCT shipment_id, 'scanned' AS scan_status FROM delivery_checkpoints UNION SELECT id AS shipment_id, 'unscanned' AS scan_status FROM shipments WHERE id NOT IN (SELECT DISTINCT shipment_id FROM delivery_checkpoints) ORDER BY shipment_id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Combine scanned shipments and unscanned shipments using UNION."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-008",
    domain: "logistics",
    level: 3,
    order: 8,
    difficulty: "hard",
    title: "Suppliers with Top Reliability and Fast Lead Times (INTERSECT)",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Find suppliers that are in both the top reliability group (score >= 4.7) AND the fast delivery group (lead time <= 12 days) using INTERSECT. Display supplier id and supplier_name.",
    context_notes: "Identifying gold-standard vendor partners.",
    concepts: ["INTERSECT","Set Operations","Supplier Evaluation"],
    expected_columns: ["id","supplier_name"],
    reference_sql: "SELECT id, supplier_name FROM suppliers WHERE reliability_score >= 4.7 INTERSECT SELECT id, supplier_name FROM suppliers WHERE lead_time_days <= 12 ORDER BY id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the INTERSECT operator between the high-reliability and fast-lead-time queries."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-009",
    domain: "logistics",
    level: 3,
    order: 9,
    difficulty: "hard",
    title: "Vehicle with Maximum Mileage in Each Vehicle Type (Derived Table)",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each vehicle_type, identify the vehicle with the maximum odometer mileage. Use a derived table subquery to return vehicle_type, vehicle_number, and mileage_km.",
    context_notes: "Fleet wear-and-tear leadership profiling.",
    concepts: ["Derived Tables","JOIN","Subqueries"],
    expected_columns: ["vehicle_type","vehicle_number","mileage_km"],
    reference_sql: "SELECT fv.vehicle_type, fv.vehicle_number, fv.mileage_km FROM fleet_vehicles fv JOIN (SELECT vehicle_type, MAX(mileage_km) AS max_km FROM fleet_vehicles GROUP BY vehicle_type) max_fv ON fv.vehicle_type = max_fv.vehicle_type AND fv.mileage_km = max_fv.max_km ORDER BY fv.vehicle_type ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join fleet_vehicles with a subquery grouping by vehicle_type and taking MAX(mileage_km)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-010",
    domain: "logistics",
    level: 3,
    order: 10,
    difficulty: "hard",
    title: "Shipments Carrying Weight Above Regional Warehouse Average",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify shipments whose weight_kg exceeds the average weight of shipments originating from the same warehouse. Show id, origin_warehouse, and weight_kg.",
    context_notes: "Detecting localized freight loading anomalies.",
    concepts: ["Correlated Subquery","WHERE","AVG()"],
    expected_columns: ["id","origin_warehouse","weight_kg"],
    reference_sql: "SELECT s.id, s.origin_warehouse, s.weight_kg FROM shipments s WHERE s.weight_kg > (SELECT AVG(s2.weight_kg) FROM shipments s2 WHERE s2.warehouse_id = s.warehouse_id) ORDER BY s.weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a correlated subquery in WHERE comparing shipment weight to that warehouse's average weight."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-011",
    domain: "logistics",
    level: 3,
    order: 11,
    difficulty: "hard",
    title: "Logistics Benchmark Query #11: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-012",
    domain: "logistics",
    level: 3,
    order: 12,
    difficulty: "hard",
    title: "Logistics Benchmark Query #12: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-013",
    domain: "logistics",
    level: 3,
    order: 13,
    difficulty: "hard",
    title: "Logistics Benchmark Query #13: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-014",
    domain: "logistics",
    level: 3,
    order: 14,
    difficulty: "hard",
    title: "Logistics Benchmark Query #14: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-015",
    domain: "logistics",
    level: 3,
    order: 15,
    difficulty: "hard",
    title: "Logistics Benchmark Query #15: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-016",
    domain: "logistics",
    level: 3,
    order: 16,
    difficulty: "hard",
    title: "Logistics Benchmark Query #16: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-017",
    domain: "logistics",
    level: 3,
    order: 17,
    difficulty: "hard",
    title: "Logistics Benchmark Query #17: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-018",
    domain: "logistics",
    level: 3,
    order: 18,
    difficulty: "hard",
    title: "Logistics Benchmark Query #18: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-019",
    domain: "logistics",
    level: 3,
    order: 19,
    difficulty: "hard",
    title: "Logistics Benchmark Query #19: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-020",
    domain: "logistics",
    level: 3,
    order: 20,
    difficulty: "hard",
    title: "Logistics Benchmark Query #20: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-021",
    domain: "logistics",
    level: 3,
    order: 21,
    difficulty: "hard",
    title: "Logistics Benchmark Query #21: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-022",
    domain: "logistics",
    level: 3,
    order: 22,
    difficulty: "hard",
    title: "Logistics Benchmark Query #22: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-023",
    domain: "logistics",
    level: 3,
    order: 23,
    difficulty: "hard",
    title: "Logistics Benchmark Query #23: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-024",
    domain: "logistics",
    level: 3,
    order: 24,
    difficulty: "hard",
    title: "Logistics Benchmark Query #24: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-025",
    domain: "logistics",
    level: 3,
    order: 25,
    difficulty: "hard",
    title: "Logistics Benchmark Query #25: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-026",
    domain: "logistics",
    level: 3,
    order: 26,
    difficulty: "hard",
    title: "Logistics Benchmark Query #26: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-027",
    domain: "logistics",
    level: 3,
    order: 27,
    difficulty: "hard",
    title: "Logistics Benchmark Query #27: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-028",
    domain: "logistics",
    level: 3,
    order: 28,
    difficulty: "hard",
    title: "Logistics Benchmark Query #28: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-029",
    domain: "logistics",
    level: 3,
    order: 29,
    difficulty: "hard",
    title: "Logistics Benchmark Query #29: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-030",
    domain: "logistics",
    level: 3,
    order: 30,
    difficulty: "hard",
    title: "Logistics Benchmark Query #30: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-031",
    domain: "logistics",
    level: 3,
    order: 31,
    difficulty: "hard",
    title: "Logistics Benchmark Query #31: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-032",
    domain: "logistics",
    level: 3,
    order: 32,
    difficulty: "hard",
    title: "Logistics Benchmark Query #32: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-033",
    domain: "logistics",
    level: 3,
    order: 33,
    difficulty: "hard",
    title: "Logistics Benchmark Query #33: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-034",
    domain: "logistics",
    level: 3,
    order: 34,
    difficulty: "hard",
    title: "Logistics Benchmark Query #34: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-035",
    domain: "logistics",
    level: 3,
    order: 35,
    difficulty: "hard",
    title: "Logistics Benchmark Query #35: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-036",
    domain: "logistics",
    level: 3,
    order: 36,
    difficulty: "hard",
    title: "Logistics Benchmark Query #36: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-037",
    domain: "logistics",
    level: 3,
    order: 37,
    difficulty: "hard",
    title: "Logistics Benchmark Query #37: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-038",
    domain: "logistics",
    level: 3,
    order: 38,
    difficulty: "hard",
    title: "Logistics Benchmark Query #38: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-039",
    domain: "logistics",
    level: 3,
    order: 39,
    difficulty: "hard",
    title: "Logistics Benchmark Query #39: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-040",
    domain: "logistics",
    level: 3,
    order: 40,
    difficulty: "hard",
    title: "Logistics Benchmark Query #40: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-041",
    domain: "logistics",
    level: 3,
    order: 41,
    difficulty: "hard",
    title: "Logistics Benchmark Query #41: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-042",
    domain: "logistics",
    level: 3,
    order: 42,
    difficulty: "hard",
    title: "Logistics Benchmark Query #42: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-043",
    domain: "logistics",
    level: 3,
    order: 43,
    difficulty: "hard",
    title: "Logistics Benchmark Query #43: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-044",
    domain: "logistics",
    level: 3,
    order: 44,
    difficulty: "hard",
    title: "Logistics Benchmark Query #44: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-045",
    domain: "logistics",
    level: 3,
    order: 45,
    difficulty: "hard",
    title: "Logistics Benchmark Query #45: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-046",
    domain: "logistics",
    level: 3,
    order: 46,
    difficulty: "hard",
    title: "Logistics Benchmark Query #46: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-047",
    domain: "logistics",
    level: 3,
    order: 47,
    difficulty: "hard",
    title: "Logistics Benchmark Query #47: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-048",
    domain: "logistics",
    level: 3,
    order: 48,
    difficulty: "hard",
    title: "Logistics Benchmark Query #48: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-049",
    domain: "logistics",
    level: 3,
    order: 49,
    difficulty: "hard",
    title: "Logistics Benchmark Query #49: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-050",
    domain: "logistics",
    level: 3,
    order: 50,
    difficulty: "hard",
    title: "Logistics Benchmark Query #50: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-051",
    domain: "logistics",
    level: 3,
    order: 51,
    difficulty: "hard",
    title: "Logistics Benchmark Query #51: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-052",
    domain: "logistics",
    level: 3,
    order: 52,
    difficulty: "hard",
    title: "Logistics Benchmark Query #52: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-053",
    domain: "logistics",
    level: 3,
    order: 53,
    difficulty: "hard",
    title: "Logistics Benchmark Query #53: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-054",
    domain: "logistics",
    level: 3,
    order: 54,
    difficulty: "hard",
    title: "Logistics Benchmark Query #54: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-055",
    domain: "logistics",
    level: 3,
    order: 55,
    difficulty: "hard",
    title: "Logistics Benchmark Query #55: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-056",
    domain: "logistics",
    level: 3,
    order: 56,
    difficulty: "hard",
    title: "Logistics Benchmark Query #56: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-057",
    domain: "logistics",
    level: 3,
    order: 57,
    difficulty: "hard",
    title: "Logistics Benchmark Query #57: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-058",
    domain: "logistics",
    level: 3,
    order: 58,
    difficulty: "hard",
    title: "Logistics Benchmark Query #58: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-059",
    domain: "logistics",
    level: 3,
    order: 59,
    difficulty: "hard",
    title: "Logistics Benchmark Query #59: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-060",
    domain: "logistics",
    level: 3,
    order: 60,
    difficulty: "hard",
    title: "Logistics Benchmark Query #60: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-061",
    domain: "logistics",
    level: 3,
    order: 61,
    difficulty: "hard",
    title: "Logistics Benchmark Query #61: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-062",
    domain: "logistics",
    level: 3,
    order: 62,
    difficulty: "hard",
    title: "Logistics Benchmark Query #62: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-063",
    domain: "logistics",
    level: 3,
    order: 63,
    difficulty: "hard",
    title: "Logistics Benchmark Query #63: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-064",
    domain: "logistics",
    level: 3,
    order: 64,
    difficulty: "hard",
    title: "Logistics Benchmark Query #64: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-065",
    domain: "logistics",
    level: 3,
    order: 65,
    difficulty: "hard",
    title: "Logistics Benchmark Query #65: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-066",
    domain: "logistics",
    level: 3,
    order: 66,
    difficulty: "hard",
    title: "Logistics Benchmark Query #66: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-067",
    domain: "logistics",
    level: 3,
    order: 67,
    difficulty: "hard",
    title: "Logistics Benchmark Query #67: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-068",
    domain: "logistics",
    level: 3,
    order: 68,
    difficulty: "hard",
    title: "Logistics Benchmark Query #68: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-069",
    domain: "logistics",
    level: 3,
    order: 69,
    difficulty: "hard",
    title: "Logistics Benchmark Query #69: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-070",
    domain: "logistics",
    level: 3,
    order: 70,
    difficulty: "hard",
    title: "Logistics Benchmark Query #70: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-071",
    domain: "logistics",
    level: 3,
    order: 71,
    difficulty: "hard",
    title: "Logistics Benchmark Query #71: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-072",
    domain: "logistics",
    level: 3,
    order: 72,
    difficulty: "hard",
    title: "Logistics Benchmark Query #72: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-073",
    domain: "logistics",
    level: 3,
    order: 73,
    difficulty: "hard",
    title: "Logistics Benchmark Query #73: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-074",
    domain: "logistics",
    level: 3,
    order: 74,
    difficulty: "hard",
    title: "Logistics Benchmark Query #74: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-075",
    domain: "logistics",
    level: 3,
    order: 75,
    difficulty: "hard",
    title: "Logistics Benchmark Query #75: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-076",
    domain: "logistics",
    level: 3,
    order: 76,
    difficulty: "hard",
    title: "Logistics Benchmark Query #76: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-077",
    domain: "logistics",
    level: 3,
    order: 77,
    difficulty: "hard",
    title: "Logistics Benchmark Query #77: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-078",
    domain: "logistics",
    level: 3,
    order: 78,
    difficulty: "hard",
    title: "Logistics Benchmark Query #78: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-079",
    domain: "logistics",
    level: 3,
    order: 79,
    difficulty: "hard",
    title: "Logistics Benchmark Query #79: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-080",
    domain: "logistics",
    level: 3,
    order: 80,
    difficulty: "hard",
    title: "Logistics Benchmark Query #80: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-081",
    domain: "logistics",
    level: 3,
    order: 81,
    difficulty: "hard",
    title: "Logistics Benchmark Query #81: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-082",
    domain: "logistics",
    level: 3,
    order: 82,
    difficulty: "hard",
    title: "Logistics Benchmark Query #82: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-083",
    domain: "logistics",
    level: 3,
    order: 83,
    difficulty: "hard",
    title: "Logistics Benchmark Query #83: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-084",
    domain: "logistics",
    level: 3,
    order: 84,
    difficulty: "hard",
    title: "Logistics Benchmark Query #84: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-085",
    domain: "logistics",
    level: 3,
    order: 85,
    difficulty: "hard",
    title: "Logistics Benchmark Query #85: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-086",
    domain: "logistics",
    level: 3,
    order: 86,
    difficulty: "hard",
    title: "Logistics Benchmark Query #86: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-087",
    domain: "logistics",
    level: 3,
    order: 87,
    difficulty: "hard",
    title: "Logistics Benchmark Query #87: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-088",
    domain: "logistics",
    level: 3,
    order: 88,
    difficulty: "hard",
    title: "Logistics Benchmark Query #88: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-089",
    domain: "logistics",
    level: 3,
    order: 89,
    difficulty: "hard",
    title: "Logistics Benchmark Query #89: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-090",
    domain: "logistics",
    level: 3,
    order: 90,
    difficulty: "hard",
    title: "Logistics Benchmark Query #90: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-091",
    domain: "logistics",
    level: 3,
    order: 91,
    difficulty: "hard",
    title: "Logistics Benchmark Query #91: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-092",
    domain: "logistics",
    level: 3,
    order: 92,
    difficulty: "hard",
    title: "Logistics Benchmark Query #92: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-093",
    domain: "logistics",
    level: 3,
    order: 93,
    difficulty: "hard",
    title: "Logistics Benchmark Query #93: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-094",
    domain: "logistics",
    level: 3,
    order: 94,
    difficulty: "hard",
    title: "Logistics Benchmark Query #94: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-095",
    domain: "logistics",
    level: 3,
    order: 95,
    difficulty: "hard",
    title: "Logistics Benchmark Query #95: Vehicle Mileage Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from fleet_vehicles where mileage_km is strictly greater than the overall average mileage_km. Return id, mileage_km, and vehicle_type, ordered by mileage_km descending.",
    context_notes: "Benchmark analysis on fleet_vehicles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fleet_vehicles"],
    expected_columns: ["id","mileage_km","vehicle_type"],
    reference_sql: "SELECT id, mileage_km, vehicle_type FROM fleet_vehicles WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles) ORDER BY mileage_km DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE mileage_km > (SELECT AVG(mileage_km) FROM fleet_vehicles)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-096",
    domain: "logistics",
    level: 3,
    order: 96,
    difficulty: "hard",
    title: "Logistics Benchmark Query #96: Fuel Refueling Volume Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from fuel_logs where gallons is strictly greater than the overall average gallons. Return id, gallons, and vehicle_id, ordered by gallons descending.",
    context_notes: "Benchmark analysis on fuel_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","fuel_logs"],
    expected_columns: ["id","gallons","vehicle_id"],
    reference_sql: "SELECT id, gallons, vehicle_id FROM fuel_logs WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs) ORDER BY gallons DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE gallons > (SELECT AVG(gallons) FROM fuel_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-097",
    domain: "logistics",
    level: 3,
    order: 97,
    difficulty: "hard",
    title: "Logistics Benchmark Query #97: Maintenance Service Cost Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from maintenance_records where cost is strictly greater than the overall average cost. Return id, cost, and service_type, ordered by cost descending.",
    context_notes: "Benchmark analysis on maintenance_records exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","maintenance_records"],
    expected_columns: ["id","cost","service_type"],
    reference_sql: "SELECT id, cost, service_type FROM maintenance_records WHERE cost > (SELECT AVG(cost) FROM maintenance_records) ORDER BY cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE cost > (SELECT AVG(cost) FROM maintenance_records)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-098",
    domain: "logistics",
    level: 3,
    order: 98,
    difficulty: "hard",
    title: "Logistics Benchmark Query #98: Parts Inventory Unit Value Benchmark",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify records from parts_inventory where unit_cost is strictly greater than the overall average unit_cost. Return id, unit_cost, and warehouse_id, ordered by unit_cost descending.",
    context_notes: "Benchmark analysis on parts_inventory exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","parts_inventory"],
    expected_columns: ["id","unit_cost","warehouse_id"],
    reference_sql: "SELECT id, unit_cost, warehouse_id FROM parts_inventory WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory) ORDER BY unit_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE unit_cost > (SELECT AVG(unit_cost) FROM parts_inventory)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-099",
    domain: "logistics",
    level: 3,
    order: 99,
    difficulty: "hard",
    title: "Logistics Benchmark Query #99: Cargo Declared Value Benchmark",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Identify records from cargo_packages where declared_value is strictly greater than the overall average declared_value. Return id, declared_value, and shipment_id, ordered by declared_value descending.",
    context_notes: "Benchmark analysis on cargo_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","cargo_packages"],
    expected_columns: ["id","declared_value","shipment_id"],
    reference_sql: "SELECT id, declared_value, shipment_id FROM cargo_packages WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages) ORDER BY declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE declared_value > (SELECT AVG(declared_value) FROM cargo_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  },
  {
    id: "log-L3-100",
    domain: "logistics",
    level: 3,
    order: 100,
    difficulty: "hard",
    title: "Logistics Benchmark Query #100: Freight Route Toll Tollway Benchmark",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify records from freight_routes where toll_costs is strictly greater than the overall average toll_costs. Return id, toll_costs, and distance_km, ordered by toll_costs descending.",
    context_notes: "Benchmark analysis on freight_routes exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","freight_routes"],
    expected_columns: ["id","toll_costs","distance_km"],
    reference_sql: "SELECT id, toll_costs, distance_km FROM freight_routes WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes) ORDER BY toll_costs DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with a scalar subquery: WHERE toll_costs > (SELECT AVG(toll_costs) FROM freight_routes)."
    ],
    starter_sql: "SELECT\n  -- Complete the subquery or set operation\nFROM \n;"
  }
];
