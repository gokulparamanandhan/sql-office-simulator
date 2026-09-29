// ============================================================================
// LOGISTICS & SUPPLY CHAIN — LEVEL 2: RELATIONAL JOINS & FREIGHT AGGREGATIONS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (9): warehouses, carriers, fleet_vehicles, drivers, suppliers, shipments,
//             cargo_packages, freight_routes, delivery_checkpoints
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const LOG_L2_QUESTIONS: QuestionDefinition[] = [
  {
    id: "log-L2-001",
    domain: "logistics",
    level: 2,
    order: 1,
    difficulty: "medium",
    title: "Warehouse Outbound Shipment Volume and Total Freight Weight",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Claire here. Ahead of carrier contract renewals, calculate the total count of shipments and total weight dispatched from each warehouse. Show warehouse city, shipment count as total_shipments, and total weight_kg rounded to 2 decimals, ordered by total weight descending.",
    context_notes: "Measuring origin facility outbound throughput and dispatch density.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_shipments","total_weight_kg"],
    reference_sql: "SELECT w.city, COUNT(s.id) AS total_shipments, ROUND(SUM(s.weight_kg), 2) AS total_weight_kg FROM warehouses w JOIN shipments s ON w.id = s.warehouse_id GROUP BY w.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses with shipments on w.id = s.warehouse_id and group by w.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-002",
    domain: "logistics",
    level: 2,
    order: 2,
    difficulty: "medium",
    title: "Carrier Freight Volume and Average Load Size",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Dave here from Fleet Ops. For each carrier partner, determine their total shipments hauled and average shipment weight. Display carrier_name, service_level, shipment count as total_loads, and average weight rounded to 2 decimals, ordered by total loads descending.",
    context_notes: "Carrier fleet allocation and utilization analysis.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["carrier_name","service_level","total_loads","avg_weight_kg"],
    reference_sql: "SELECT c.carrier_name, c.service_level, COUNT(s.id) AS total_loads, ROUND(AVG(s.weight_kg), 2) AS avg_weight_kg FROM carriers c JOIN shipments s ON c.id = s.carrier_id GROUP BY c.carrier_name, c.service_level ORDER BY total_loads DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers with shipments and group by carrier_name, service_level."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-003",
    domain: "logistics",
    level: 2,
    order: 3,
    difficulty: "medium",
    title: "High-Value Cargo Packages by Destination City",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Frank at the crossdock. We need extra cargo insurance coverage on shipments carrying high-value packages. Join shipments and cargo_packages to find shipments where total declared package value exceeds $20,000. Show shipment id, destination_city, and total declared value, ordered by value descending.",
    context_notes: "Cargo security and high-value transit liability controls.",
    concepts: ["INNER JOIN","GROUP BY","HAVING","SUM()"],
    expected_columns: ["id","destination_city","total_declared_value"],
    reference_sql: "SELECT s.id, s.destination_city, SUM(cp.declared_value) AS total_declared_value FROM shipments s JOIN cargo_packages cp ON s.id = cp.shipment_id GROUP BY s.id, s.destination_city HAVING SUM(cp.declared_value) > 20000.00 ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages, grouping by shipment id and destination_city with HAVING SUM(cp.declared_value) > 20000."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-004",
    domain: "logistics",
    level: 2,
    order: 4,
    difficulty: "medium",
    title: "Hazardous Materials Shipment Manifest",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Identify all shipments that contain hazardous cargo packages. Join shipments and cargo_packages to display shipment id, origin_warehouse, destination_city, and count of hazardous packages, filtering for is_hazardous = TRUE.",
    context_notes: "HAZMAT regulatory compliance and route planning.",
    concepts: ["INNER JOIN","WHERE","GROUP BY","COUNT()"],
    expected_columns: ["id","origin_warehouse","destination_city","hazmat_package_count"],
    reference_sql: "SELECT s.id, s.origin_warehouse, s.destination_city, COUNT(cp.id) AS hazmat_package_count FROM shipments s JOIN cargo_packages cp ON s.id = cp.shipment_id WHERE cp.is_hazardous = TRUE GROUP BY s.id, s.origin_warehouse, s.destination_city ORDER BY hazmat_package_count DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages with WHERE cp.is_hazardous = TRUE and group by shipment."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-005",
    domain: "logistics",
    level: 2,
    order: 5,
    difficulty: "medium",
    title: "Delivery Checkpoints Passed per Shipment",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Monitor freight milestone tracking. For each shipment, count how many delivery checkpoints it has logged. Show shipment id, destination_city, status, and checkpoint_count, ordered by checkpoint_count descending.",
    context_notes: "In-transit tracking visibility and scan scan rate audits.",
    concepts: ["LEFT JOIN","GROUP BY","COUNT()"],
    expected_columns: ["id","destination_city","status","checkpoint_count"],
    reference_sql: "SELECT s.id, s.destination_city, s.status, COUNT(dc.id) AS checkpoint_count FROM shipments s LEFT JOIN delivery_checkpoints dc ON s.id = dc.shipment_id GROUP BY s.id, s.destination_city, s.status ORDER BY checkpoint_count DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use LEFT JOIN between shipments and delivery_checkpoints, grouping by shipment id, destination_city, status."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-006",
    domain: "logistics",
    level: 2,
    order: 6,
    difficulty: "warm-up",
    title: "Freight Route Cost per Transit Hour",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Calculate the toll cost per hour of transit for each freight corridor. Show route_name, distance_km, avg_transit_hours, toll_costs, and (toll_costs / avg_transit_hours) as toll_per_hour rounded to 2 decimals, ordered by toll_per_hour descending.",
    context_notes: "Route economic efficiency and toll expenditure benchmarking.",
    concepts: ["SELECT","Arithmetic Expressions","ROUND()","ORDER BY"],
    expected_columns: ["route_name","distance_km","avg_transit_hours","toll_costs","toll_per_hour"],
    reference_sql: "SELECT route_name, distance_km, avg_transit_hours, toll_costs, ROUND((toll_costs / avg_transit_hours), 2) AS toll_per_hour FROM freight_routes ORDER BY toll_per_hour DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Divide toll_costs by avg_transit_hours and round to 2 decimals."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-007",
    domain: "logistics",
    level: 2,
    order: 7,
    difficulty: "medium",
    title: "Carriers Handling Delayed Shipments",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Find which carriers have experienced shipments marked with 'delayed' status. Show carrier_name, carrier rating, and total delayed shipments count, ordered by delayed count descending.",
    context_notes: "Carrier SLA accountability and penalty enforcement.",
    concepts: ["INNER JOIN","WHERE","GROUP BY","COUNT()"],
    expected_columns: ["carrier_name","rating","delayed_count"],
    reference_sql: "SELECT c.carrier_name, c.rating, COUNT(s.id) AS delayed_count FROM carriers c JOIN shipments s ON c.id = s.carrier_id WHERE s.status = 'delayed' GROUP BY c.carrier_name, c.rating ORDER BY delayed_count DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments with WHERE s.status = 'delayed' and group by carrier_name, c.rating."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-008",
    domain: "logistics",
    level: 2,
    order: 8,
    difficulty: "warm-up",
    title: "Average Package Weight per Shipment",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "Frank at the sorting depot. Calculate the total package count and average cargo package weight for each shipment. Display shipment_id, count of packages as total_packages, and average weight rounded to 2 decimals, ordered by total_packages descending.",
    context_notes: "Pallet density and sorting facility capacity planning.",
    concepts: ["GROUP BY","AVG()","COUNT()","ROUND()"],
    expected_columns: ["shipment_id","total_packages","avg_pkg_weight_kg"],
    reference_sql: "SELECT shipment_id, COUNT(id) AS total_packages, ROUND(AVG(weight_kg), 2) AS avg_pkg_weight_kg FROM cargo_packages GROUP BY shipment_id ORDER BY total_packages DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Group cargo_packages by shipment_id and compute COUNT(id) and AVG(weight_kg)."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-009",
    domain: "logistics",
    level: 2,
    order: 9,
    difficulty: "medium",
    title: "High-Volume Freight Destinations",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "Identify destination cities receiving more than 15,000 kg of cumulative freight. Display destination_city, total shipments, and total weight, ordered by total weight descending.",
    context_notes: "Targeting high-density metropolitan delivery zones for dedicated fleet routing.",
    concepts: ["GROUP BY","HAVING","SUM()","COUNT()"],
    expected_columns: ["destination_city","shipment_count","total_weight"],
    reference_sql: "SELECT destination_city, COUNT(id) AS shipment_count, ROUND(SUM(weight_kg), 2) AS total_weight FROM shipments GROUP BY destination_city HAVING SUM(weight_kg) > 15000.00 ORDER BY total_weight DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Group shipments by destination_city with HAVING SUM(weight_kg) > 15000.00."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-010",
    domain: "logistics",
    level: 2,
    order: 10,
    difficulty: "medium",
    title: "Crossdock Warehouses with Over 5 Active Outbound Loads",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "Find warehouses that have more than 5 outbound shipments currently logged in the system. Show warehouse city, manager_name, and active load count, ordered by load count descending.",
    context_notes: "Crossdock throughput bottlenecks and dock door congestion.",
    concepts: ["INNER JOIN","GROUP BY","HAVING","COUNT()"],
    expected_columns: ["city","manager_name","active_load_count"],
    reference_sql: "SELECT w.city, w.manager_name, COUNT(s.id) AS active_load_count FROM warehouses w JOIN shipments s ON w.id = s.warehouse_id GROUP BY w.city, w.manager_name HAVING COUNT(s.id) > 5 ORDER BY active_load_count DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses with shipments, grouping by city, manager_name with HAVING COUNT(s.id) > 5."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-011",
    domain: "logistics",
    level: 2,
    order: 11,
    difficulty: "medium",
    title: "Logistics Relational Metric #11: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-012",
    domain: "logistics",
    level: 2,
    order: 12,
    difficulty: "medium",
    title: "Logistics Relational Metric #12: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-013",
    domain: "logistics",
    level: 2,
    order: 13,
    difficulty: "medium",
    title: "Logistics Relational Metric #13: Destination Declared Cargo Value",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-014",
    domain: "logistics",
    level: 2,
    order: 14,
    difficulty: "medium",
    title: "Logistics Relational Metric #14: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-015",
    domain: "logistics",
    level: 2,
    order: 15,
    difficulty: "medium",
    title: "Logistics Relational Metric #15: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-016",
    domain: "logistics",
    level: 2,
    order: 16,
    difficulty: "medium",
    title: "Logistics Relational Metric #16: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-017",
    domain: "logistics",
    level: 2,
    order: 17,
    difficulty: "medium",
    title: "Logistics Relational Metric #17: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-018",
    domain: "logistics",
    level: 2,
    order: 18,
    difficulty: "medium",
    title: "Logistics Relational Metric #18: Destination Declared Cargo Value",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-019",
    domain: "logistics",
    level: 2,
    order: 19,
    difficulty: "medium",
    title: "Logistics Relational Metric #19: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-020",
    domain: "logistics",
    level: 2,
    order: 20,
    difficulty: "medium",
    title: "Logistics Relational Metric #20: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-021",
    domain: "logistics",
    level: 2,
    order: 21,
    difficulty: "medium",
    title: "Logistics Relational Metric #21: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-022",
    domain: "logistics",
    level: 2,
    order: 22,
    difficulty: "medium",
    title: "Logistics Relational Metric #22: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-023",
    domain: "logistics",
    level: 2,
    order: 23,
    difficulty: "medium",
    title: "Logistics Relational Metric #23: Destination Declared Cargo Value",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-024",
    domain: "logistics",
    level: 2,
    order: 24,
    difficulty: "medium",
    title: "Logistics Relational Metric #24: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-025",
    domain: "logistics",
    level: 2,
    order: 25,
    difficulty: "medium",
    title: "Logistics Relational Metric #25: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-026",
    domain: "logistics",
    level: 2,
    order: 26,
    difficulty: "medium",
    title: "Logistics Relational Metric #26: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-027",
    domain: "logistics",
    level: 2,
    order: 27,
    difficulty: "medium",
    title: "Logistics Relational Metric #27: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-028",
    domain: "logistics",
    level: 2,
    order: 28,
    difficulty: "medium",
    title: "Logistics Relational Metric #28: Destination Declared Cargo Value",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-029",
    domain: "logistics",
    level: 2,
    order: 29,
    difficulty: "medium",
    title: "Logistics Relational Metric #29: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-030",
    domain: "logistics",
    level: 2,
    order: 30,
    difficulty: "medium",
    title: "Logistics Relational Metric #30: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-031",
    domain: "logistics",
    level: 2,
    order: 31,
    difficulty: "medium",
    title: "Logistics Relational Metric #31: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-032",
    domain: "logistics",
    level: 2,
    order: 32,
    difficulty: "medium",
    title: "Logistics Relational Metric #32: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-033",
    domain: "logistics",
    level: 2,
    order: 33,
    difficulty: "medium",
    title: "Logistics Relational Metric #33: Destination Declared Cargo Value",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-034",
    domain: "logistics",
    level: 2,
    order: 34,
    difficulty: "medium",
    title: "Logistics Relational Metric #34: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-035",
    domain: "logistics",
    level: 2,
    order: 35,
    difficulty: "medium",
    title: "Logistics Relational Metric #35: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-036",
    domain: "logistics",
    level: 2,
    order: 36,
    difficulty: "medium",
    title: "Logistics Relational Metric #36: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-037",
    domain: "logistics",
    level: 2,
    order: 37,
    difficulty: "medium",
    title: "Logistics Relational Metric #37: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-038",
    domain: "logistics",
    level: 2,
    order: 38,
    difficulty: "medium",
    title: "Logistics Relational Metric #38: Destination Declared Cargo Value",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-039",
    domain: "logistics",
    level: 2,
    order: 39,
    difficulty: "medium",
    title: "Logistics Relational Metric #39: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-040",
    domain: "logistics",
    level: 2,
    order: 40,
    difficulty: "medium",
    title: "Logistics Relational Metric #40: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-041",
    domain: "logistics",
    level: 2,
    order: 41,
    difficulty: "medium",
    title: "Logistics Relational Metric #41: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-042",
    domain: "logistics",
    level: 2,
    order: 42,
    difficulty: "medium",
    title: "Logistics Relational Metric #42: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-043",
    domain: "logistics",
    level: 2,
    order: 43,
    difficulty: "medium",
    title: "Logistics Relational Metric #43: Destination Declared Cargo Value",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-044",
    domain: "logistics",
    level: 2,
    order: 44,
    difficulty: "medium",
    title: "Logistics Relational Metric #44: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-045",
    domain: "logistics",
    level: 2,
    order: 45,
    difficulty: "medium",
    title: "Logistics Relational Metric #45: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-046",
    domain: "logistics",
    level: 2,
    order: 46,
    difficulty: "medium",
    title: "Logistics Relational Metric #46: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-047",
    domain: "logistics",
    level: 2,
    order: 47,
    difficulty: "medium",
    title: "Logistics Relational Metric #47: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-048",
    domain: "logistics",
    level: 2,
    order: 48,
    difficulty: "medium",
    title: "Logistics Relational Metric #48: Destination Declared Cargo Value",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-049",
    domain: "logistics",
    level: 2,
    order: 49,
    difficulty: "medium",
    title: "Logistics Relational Metric #49: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-050",
    domain: "logistics",
    level: 2,
    order: 50,
    difficulty: "medium",
    title: "Logistics Relational Metric #50: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-051",
    domain: "logistics",
    level: 2,
    order: 51,
    difficulty: "medium",
    title: "Logistics Relational Metric #51: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-052",
    domain: "logistics",
    level: 2,
    order: 52,
    difficulty: "medium",
    title: "Logistics Relational Metric #52: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-053",
    domain: "logistics",
    level: 2,
    order: 53,
    difficulty: "medium",
    title: "Logistics Relational Metric #53: Destination Declared Cargo Value",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-054",
    domain: "logistics",
    level: 2,
    order: 54,
    difficulty: "medium",
    title: "Logistics Relational Metric #54: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-055",
    domain: "logistics",
    level: 2,
    order: 55,
    difficulty: "medium",
    title: "Logistics Relational Metric #55: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-056",
    domain: "logistics",
    level: 2,
    order: 56,
    difficulty: "medium",
    title: "Logistics Relational Metric #56: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-057",
    domain: "logistics",
    level: 2,
    order: 57,
    difficulty: "medium",
    title: "Logistics Relational Metric #57: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-058",
    domain: "logistics",
    level: 2,
    order: 58,
    difficulty: "medium",
    title: "Logistics Relational Metric #58: Destination Declared Cargo Value",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-059",
    domain: "logistics",
    level: 2,
    order: 59,
    difficulty: "medium",
    title: "Logistics Relational Metric #59: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-060",
    domain: "logistics",
    level: 2,
    order: 60,
    difficulty: "medium",
    title: "Logistics Relational Metric #60: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-061",
    domain: "logistics",
    level: 2,
    order: 61,
    difficulty: "medium",
    title: "Logistics Relational Metric #61: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-062",
    domain: "logistics",
    level: 2,
    order: 62,
    difficulty: "medium",
    title: "Logistics Relational Metric #62: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-063",
    domain: "logistics",
    level: 2,
    order: 63,
    difficulty: "medium",
    title: "Logistics Relational Metric #63: Destination Declared Cargo Value",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-064",
    domain: "logistics",
    level: 2,
    order: 64,
    difficulty: "medium",
    title: "Logistics Relational Metric #64: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-065",
    domain: "logistics",
    level: 2,
    order: 65,
    difficulty: "medium",
    title: "Logistics Relational Metric #65: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-066",
    domain: "logistics",
    level: 2,
    order: 66,
    difficulty: "medium",
    title: "Logistics Relational Metric #66: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-067",
    domain: "logistics",
    level: 2,
    order: 67,
    difficulty: "medium",
    title: "Logistics Relational Metric #67: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-068",
    domain: "logistics",
    level: 2,
    order: 68,
    difficulty: "medium",
    title: "Logistics Relational Metric #68: Destination Declared Cargo Value",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-069",
    domain: "logistics",
    level: 2,
    order: 69,
    difficulty: "medium",
    title: "Logistics Relational Metric #69: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-070",
    domain: "logistics",
    level: 2,
    order: 70,
    difficulty: "medium",
    title: "Logistics Relational Metric #70: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-071",
    domain: "logistics",
    level: 2,
    order: 71,
    difficulty: "medium",
    title: "Logistics Relational Metric #71: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-072",
    domain: "logistics",
    level: 2,
    order: 72,
    difficulty: "medium",
    title: "Logistics Relational Metric #72: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-073",
    domain: "logistics",
    level: 2,
    order: 73,
    difficulty: "medium",
    title: "Logistics Relational Metric #73: Destination Declared Cargo Value",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-074",
    domain: "logistics",
    level: 2,
    order: 74,
    difficulty: "medium",
    title: "Logistics Relational Metric #74: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-075",
    domain: "logistics",
    level: 2,
    order: 75,
    difficulty: "medium",
    title: "Logistics Relational Metric #75: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-076",
    domain: "logistics",
    level: 2,
    order: 76,
    difficulty: "medium",
    title: "Logistics Relational Metric #76: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-077",
    domain: "logistics",
    level: 2,
    order: 77,
    difficulty: "medium",
    title: "Logistics Relational Metric #77: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-078",
    domain: "logistics",
    level: 2,
    order: 78,
    difficulty: "medium",
    title: "Logistics Relational Metric #78: Destination Declared Cargo Value",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-079",
    domain: "logistics",
    level: 2,
    order: 79,
    difficulty: "medium",
    title: "Logistics Relational Metric #79: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-080",
    domain: "logistics",
    level: 2,
    order: 80,
    difficulty: "medium",
    title: "Logistics Relational Metric #80: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-081",
    domain: "logistics",
    level: 2,
    order: 81,
    difficulty: "medium",
    title: "Logistics Relational Metric #81: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-082",
    domain: "logistics",
    level: 2,
    order: 82,
    difficulty: "medium",
    title: "Logistics Relational Metric #82: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-083",
    domain: "logistics",
    level: 2,
    order: 83,
    difficulty: "medium",
    title: "Logistics Relational Metric #83: Destination Declared Cargo Value",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-084",
    domain: "logistics",
    level: 2,
    order: 84,
    difficulty: "medium",
    title: "Logistics Relational Metric #84: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-085",
    domain: "logistics",
    level: 2,
    order: 85,
    difficulty: "medium",
    title: "Logistics Relational Metric #85: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-086",
    domain: "logistics",
    level: 2,
    order: 86,
    difficulty: "medium",
    title: "Logistics Relational Metric #86: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-087",
    domain: "logistics",
    level: 2,
    order: 87,
    difficulty: "medium",
    title: "Logistics Relational Metric #87: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-088",
    domain: "logistics",
    level: 2,
    order: 88,
    difficulty: "medium",
    title: "Logistics Relational Metric #88: Destination Declared Cargo Value",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-089",
    domain: "logistics",
    level: 2,
    order: 89,
    difficulty: "medium",
    title: "Logistics Relational Metric #89: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-090",
    domain: "logistics",
    level: 2,
    order: 90,
    difficulty: "medium",
    title: "Logistics Relational Metric #90: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-091",
    domain: "logistics",
    level: 2,
    order: 91,
    difficulty: "medium",
    title: "Logistics Relational Metric #91: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-092",
    domain: "logistics",
    level: 2,
    order: 92,
    difficulty: "medium",
    title: "Logistics Relational Metric #92: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-093",
    domain: "logistics",
    level: 2,
    order: 93,
    difficulty: "medium",
    title: "Logistics Relational Metric #93: Destination Declared Cargo Value",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-094",
    domain: "logistics",
    level: 2,
    order: 94,
    difficulty: "medium",
    title: "Logistics Relational Metric #94: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-095",
    domain: "logistics",
    level: 2,
    order: 95,
    difficulty: "medium",
    title: "Logistics Relational Metric #95: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-096",
    domain: "logistics",
    level: 2,
    order: 96,
    difficulty: "medium",
    title: "Logistics Relational Metric #96: Warehouse Outbound Weight Throughput",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each city in warehouses, compute total records and aggregate weight_kg from shipments. Show city, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking warehouses and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["city","total_count","total_weight_kg"],
    reference_sql: "SELECT a.city, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM warehouses a JOIN shipments b ON a.id = b.warehouse_id GROUP BY a.city ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join warehouses to shipments on a.id = b.warehouse_id and group by a.city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-097",
    domain: "logistics",
    level: 2,
    order: 97,
    difficulty: "medium",
    title: "Logistics Relational Metric #97: Carrier Freight Capacity Distribution",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each carrier_name in carriers, compute total records and aggregate weight_kg from shipments. Show carrier_name, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking carriers and shipments.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["carrier_name","total_count","total_weight_kg"],
    reference_sql: "SELECT a.carrier_name, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM carriers a JOIN shipments b ON a.id = b.carrier_id GROUP BY a.carrier_name ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join carriers to shipments on a.id = b.carrier_id and group by a.carrier_name."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-098",
    domain: "logistics",
    level: 2,
    order: 98,
    difficulty: "medium",
    title: "Logistics Relational Metric #98: Destination Declared Cargo Value",
    stakeholder: {
      name: "Claire Sullivan",
      role: "Director of Global Supply Chain"
    },
    request: "For each destination_city in shipments, compute total records and aggregate declared_value from cargo_packages. Show destination_city, total count of items, and sum of declared_value rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_declared_value"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.declared_value), 2) AS total_declared_value FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_declared_value DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-099",
    domain: "logistics",
    level: 2,
    order: 99,
    difficulty: "medium",
    title: "Logistics Relational Metric #99: Origin Warehouse Cargo Weight Density",
    stakeholder: {
      name: "Frank Miller",
      role: "Midwest Terminal & Crossdock Manager"
    },
    request: "For each origin_warehouse in shipments, compute total records and aggregate weight_kg from cargo_packages. Show origin_warehouse, total count of items, and sum of weight_kg rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and cargo_packages.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["origin_warehouse","total_count","total_weight_kg"],
    reference_sql: "SELECT a.origin_warehouse, COUNT(b.id) AS total_count, ROUND(SUM(b.weight_kg), 2) AS total_weight_kg FROM shipments a JOIN cargo_packages b ON a.id = b.shipment_id GROUP BY a.origin_warehouse ORDER BY total_weight_kg DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to cargo_packages on a.id = b.shipment_id and group by a.origin_warehouse."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  },
  {
    id: "log-L2-100",
    domain: "logistics",
    level: 2,
    order: 100,
    difficulty: "medium",
    title: "Logistics Relational Metric #100: Destination City Checkpoint Scan Activity",
    stakeholder: {
      name: "Dave Miller",
      role: "VP of Fleet Operations"
    },
    request: "For each destination_city in shipments, compute total records and aggregate id from delivery_checkpoints. Show destination_city, total count of items, and sum of id rounded to 2 decimals, ordered by sum descending.",
    context_notes: "Relational freight analytics linking shipments and delivery_checkpoints.",
    concepts: ["INNER JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["destination_city","total_count","total_id"],
    reference_sql: "SELECT a.destination_city, COUNT(b.id) AS total_count, ROUND(SUM(b.id), 2) AS total_id FROM shipments a JOIN delivery_checkpoints b ON a.id = b.shipment_id GROUP BY a.destination_city ORDER BY total_id DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join shipments to delivery_checkpoints on a.id = b.shipment_id and group by a.destination_city."
    ],
    starter_sql: "SELECT\n  -- Complete the relational query\nFROM \n;"
  }
];
