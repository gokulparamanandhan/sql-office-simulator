import { OfficeCompanyProfile, StakeholderMember, SchemaTableDefinition } from "./office-metadata";

export interface DomainOfficeData {
  company: OfficeCompanyProfile;
  team: StakeholderMember[];
  schema: SchemaTableDefinition[];
}

export const ALL_DOMAINS_OFFICE_METADATA: Record<string, DomainOfficeData> = {
  ecommerce: {
    company: {
      name: "OmniCart Direct",
      tagline: "Next-day direct-to-consumer essentials",
      stageName: "Level 1: The Startup",
      employeeCount: "14 Team Members",
      dataHireRole: "Solo Data Generalist (#1 Data Hire)",
      story:
        "You have just joined OmniCart Direct as our very first dedicated data professional! Up until today, our founders and operations team were making million-dollar decisions using chaotic shared spreadsheets. We've just migrated our core operational database to PostgreSQL, and leadership needs accurate SQL answers immediately.",
      welcomeMemo:
        "From: Alex Rivera (CEO) — Welcome to OmniCart! Everyone is eager to ask you questions. Take a look at your Inbox, review our database schema, and let's get building!",
    },
    team: [
      {
        id: "alex-rivera",
        name: "Alex Rivera",
        role: "Chief Executive Officer",
        department: "Executive",
        avatarText: "AR",
        avatarBg: "var(--ocean)",
        bio: "Co-founded OmniCart 18 months ago. Needs high-level business summaries, revenue breakdowns, and board metrics.",
      },
      {
        id: "rachel-green",
        name: "Rachel Green",
        role: "VP of Sales & Growth",
        department: "Sales & Marketing",
        avatarText: "RG",
        avatarBg: "var(--sky)",
        bio: "Focuses on high-value orders, customer basket sizes, and sales velocity across promotional cycles.",
      },
      {
        id: "liam-vance",
        name: "Liam Vance",
        role: "Fulfillment & Operations Manager",
        department: "Operations",
        avatarText: "LV",
        avatarBg: "var(--mist)",
        bio: "Oversees warehouse dispatch, carrier on-time delivery rates, and transit bottleneck escalations.",
      },
      {
        id: "marcus-bell",
        name: "Marcus Bell",
        role: "Customer Success Lead",
        department: "Support",
        avatarText: "MB",
        avatarBg: "var(--sun)",
        bio: "Monitors refund rates, delivery delays, and VIP customer retention initiatives.",
      },
    ],
    schema: [
      {
        name: "customers",
        description: "Registered shoppers with account details and geographic territory.",
        columns: [
          { name: "id", type: "INTEGER", description: "Primary key", isPk: true },
          { name: "first_name", type: "VARCHAR(50)", description: "Customer first name" },
          { name: "last_name", type: "VARCHAR(50)", description: "Customer last name" },
          { name: "email", type: "VARCHAR(100)", description: "Contact email" },
          { name: "region", type: "VARCHAR(50)", description: "Geographic region (North, South, East, West, Central)" },
          { name: "created_at", type: "TIMESTAMP", description: "Account creation timestamp" },
        ],
      },
      {
        name: "orders",
        description: "Checkout orders with total spend and fulfillment status.",
        columns: [
          { name: "id", type: "INTEGER", description: "Order identifier", isPk: true },
          { name: "customer_id", type: "INTEGER", description: "Foreign key to customers", fkTarget: "customers.id" },
          { name: "status", type: "VARCHAR(30)", description: "delivered, completed, cancelled, returned, pending" },
          { name: "total_amount", type: "NUMERIC(10,2)", description: "Total billed amount in USD" },
          { name: "shipping_fee", type: "NUMERIC(10,2)", description: "Shipping surcharge" },
          { name: "order_date", type: "TIMESTAMP", description: "Transaction timestamp" },
        ],
      },
      {
        name: "order_items",
        description: "Individual item line records for every order.",
        columns: [
          { name: "id", type: "INTEGER", description: "Line item identifier", isPk: true },
          { name: "order_id", type: "INTEGER", description: "Order key", fkTarget: "orders.id" },
          { name: "product_id", type: "INTEGER", description: "Product key", fkTarget: "products.id" },
          { name: "quantity", type: "INTEGER", description: "Number of units ordered" },
          { name: "unit_price", type: "NUMERIC(10,2)", description: "Price per unit at sale time" },
        ],
      },
      {
        name: "products",
        description: "Catalog merchandise items with pricing, costs, and warehouse stock.",
        columns: [
          { name: "id", type: "INTEGER", description: "Product SKU key", isPk: true },
          { name: "name", type: "VARCHAR(120)", description: "Product commercial title" },
          { name: "category_id", type: "INTEGER", description: "Category foreign key", fkTarget: "categories.id" },
          { name: "price", type: "NUMERIC(10,2)", description: "Retail price in USD" },
          { name: "cost", type: "NUMERIC(10,2)", description: "Cost of goods sold" },
          { name: "stock_quantity", type: "INTEGER", description: "Units currently on warehouse shelves" },
        ],
      },
      {
        name: "categories",
        description: "Merchandise taxonomic classifications.",
        columns: [
          { name: "id", type: "INTEGER", description: "Category key", isPk: true },
          { name: "name", type: "VARCHAR(80)", description: "Category label" },
          { name: "department_id", type: "INTEGER", description: "Owning department key", fkTarget: "departments.id" },
        ],
      },
      {
        name: "shipments",
        description: "Outbound logistics parcels with carrier and tracking.",
        columns: [
          { name: "id", type: "INTEGER", description: "Shipment record", isPk: true },
          { name: "order_id", type: "INTEGER", description: "Order key", fkTarget: "orders.id" },
          { name: "carrier", type: "VARCHAR(40)", description: "Carrier (FedEx, UPS, USPS, DHL)" },
          { name: "tracking_number", type: "VARCHAR(50)", description: "Carrier tracking code" },
          { name: "shipped_at", type: "TIMESTAMP", description: "Dispatch timestamp" },
          { name: "delivered_at", type: "TIMESTAMP", description: "Delivery timestamp" },
        ],
      },
      {
        name: "departments",
        description: "Corporate operating units.",
        columns: [
          { name: "id", type: "INTEGER", description: "Department key", isPk: true },
          { name: "name", type: "VARCHAR(80)", description: "Department title" },
          { name: "head_name", type: "VARCHAR(80)", description: "Executive lead" },
        ],
      },
    ],
  },

  healthcare: {
    company: {
      name: "PulseHealth Medical",
      tagline: "Integrated regional ambulatory clinic network",
      stageName: "Level 1: Community Clinic",
      employeeCount: "22 Medical & Admin Staff",
      dataHireRole: "Clinical Data Analyst",
      story:
        "You are the data lead at PulseHealth! Our clinical network handles hundreds of patient appointments, lab diagnostics, and insurance billing claims each week across multiple regional care clinics.",
      welcomeMemo:
        "From: Dr. Evelyn Reed (Chief Medical Officer) — Welcome to PulseHealth! We rely on data to optimize clinic throughput, track chronic diagnoses, and audit insurance claim reimbursements.",
    },
    team: [
      {
        id: "evelyn-reed",
        name: "Dr. Evelyn Reed",
        role: "Chief Medical Officer",
        department: "Clinical Governance",
        avatarText: "ER",
        avatarBg: "var(--ocean)",
        bio: "Tracks appointment wait times, diagnostic trends, and clinical quality metrics.",
      },
      {
        id: "jordan-chen",
        name: "Jordan Chen",
        role: "Director of Billing & Claims",
        department: "Revenue Cycle",
        avatarText: "JC",
        avatarBg: "var(--sun)",
        bio: "Audits insurance claim approval rates, copays, and patient billing balances.",
      },
    ],
    schema: [
      {
        name: "patients",
        description: "Registered patients receiving medical care.",
        columns: [
          { name: "id", type: "INTEGER", description: "Patient identifier", isPk: true },
          { name: "first_name", type: "VARCHAR(50)", description: "First name" },
          { name: "last_name", type: "VARCHAR(50)", description: "Last name" },
          { name: "dob", type: "DATE", description: "Date of birth" },
          { name: "gender", type: "VARCHAR(10)", description: "Gender" },
          { name: "insurance_provider", type: "VARCHAR(80)", description: "Insurance company" },
        ],
      },
      {
        name: "appointments",
        description: "Clinical encounters scheduled and completed.",
        columns: [
          { name: "id", type: "INTEGER", description: "Appointment key", isPk: true },
          { name: "patient_id", type: "INTEGER", description: "Patient key", fkTarget: "patients.id" },
          { name: "doctor_id", type: "INTEGER", description: "Attending doctor", fkTarget: "doctors.id" },
          { name: "appointment_date", type: "TIMESTAMP", description: "Scheduled time" },
          { name: "status", type: "VARCHAR(30)", description: "completed, cancelled, no_show" },
          { name: "fee", type: "NUMERIC(10,2)", description: "Visit consultation fee" },
        ],
      },
      {
        name: "doctors",
        description: "Attending physicians and specialists.",
        columns: [
          { name: "id", type: "INTEGER", description: "Doctor identifier", isPk: true },
          { name: "name", type: "VARCHAR(100)", description: "Physician name" },
          { name: "specialty", type: "VARCHAR(80)", description: "Medical specialty" },
          { name: "department_id", type: "INTEGER", description: "Clinical department", fkTarget: "departments.id" },
        ],
      },
      {
        name: "prescriptions",
        description: "Medications prescribed during patient encounters.",
        columns: [
          { name: "id", type: "INTEGER", description: "Prescription key", isPk: true },
          { name: "appointment_id", type: "INTEGER", description: "Encounter key", fkTarget: "appointments.id" },
          { name: "medication_name", type: "VARCHAR(100)", description: "Pharmaceutical compound" },
          { name: "dosage", type: "VARCHAR(50)", description: "Prescribed dose" },
          { name: "refills", type: "INTEGER", description: "Authorized refills" },
        ],
      },
    ],
  },

  finance: {
    company: {
      name: "Meridian Capital Group",
      tagline: "Commercial boutique banking & asset services",
      stageName: "Level 1: Boutique Bank",
      employeeCount: "35 Finance & Risk Staff",
      dataHireRole: "Risk & Portfolio Analyst",
      story:
        "Welcome to Meridian Capital! As our dedicated financial analyst, you audit transaction flows, monitor credit risk across regional branches, and identify potential fraud anomalies.",
      welcomeMemo:
        "From: Victor Vance (Head of Risk) — Accurate data is the foundation of solvency. Review our account balances, transaction logs, and fraud alerts.",
    },
    team: [
      {
        id: "victor-vance",
        name: "Victor Vance",
        role: "Head of Risk & Compliance",
        department: "Risk",
        avatarText: "VV",
        avatarBg: "var(--ocean)",
        bio: "Tracks transaction anomalies, exposure thresholds, and audit requirements.",
      },
    ],
    schema: [
      {
        name: "accounts",
        description: "Customer checking, savings, and investment accounts.",
        columns: [
          { name: "id", type: "INTEGER", description: "Account number", isPk: true },
          { name: "customer_id", type: "INTEGER", description: "Holder key" },
          { name: "account_type", type: "VARCHAR(30)", description: "checking, savings, credit" },
          { name: "balance", type: "NUMERIC(12,2)", description: "Current cleared balance" },
          { name: "status", type: "VARCHAR(20)", description: "active, frozen, closed" },
        ],
      },
      {
        name: "transactions",
        description: "Ledger movements of credits and debits.",
        columns: [
          { name: "id", type: "INTEGER", description: "Transaction ID", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Account key", fkTarget: "accounts.id" },
          { name: "amount", type: "NUMERIC(10,2)", description: "Transaction amount" },
          { name: "transaction_type", type: "VARCHAR(20)", description: "deposit, withdrawal, transfer" },
          { name: "created_at", type: "TIMESTAMP", description: "Settlement timestamp" },
        ],
      },
    ],
  },

  hr: {
    company: {
      name: "TalentFlow Global",
      tagline: "Modern enterprise workforce operations",
      stageName: "Level 1: People Ops",
      employeeCount: "18 HR Staff",
      dataHireRole: "People Analytics Specialist",
      story:
        "You've joined TalentFlow Global! Help our leadership evaluate department compensation, track tenure and retention, and audit performance evaluations.",
      welcomeMemo:
        "From: Maya Thorne (VP of People) — Great people make great companies. We look to you for equitable compensation metrics and retention insights.",
    },
    team: [
      {
        id: "maya-thorne",
        name: "Maya Thorne",
        role: "VP of People Operations",
        department: "HR",
        avatarText: "MT",
        avatarBg: "var(--sky)",
        bio: "Drives salary benchmarking, turnover analysis, and diversity metrics.",
      },
    ],
    schema: [
      {
        name: "employees",
        description: "Staff roster across all divisions.",
        columns: [
          { name: "id", type: "INTEGER", description: "Employee ID", isPk: true },
          { name: "name", type: "VARCHAR(100)", description: "Full name" },
          { name: "department_id", type: "INTEGER", description: "Department key" },
          { name: "salary", type: "NUMERIC(10,2)", description: "Annual base salary" },
          { name: "hire_date", type: "DATE", description: "Start date" },
          { name: "status", type: "VARCHAR(20)", description: "active, on_leave, terminated" },
        ],
      },
    ],
  },

  logistics: {
    company: {
      name: "Apex Freight & Distribution",
      tagline: "Cross-dock logistics and fleet management",
      stageName: "Level 1: Dispatch Hub",
      employeeCount: "40 Fleet & Warehouse Staff",
      dataHireRole: "Logistics Optimization Analyst",
      story:
        "Welcome to Apex Freight! Keep our supply chain humming by analyzing freight manifests, delivery turnaround times, and fuel efficiency.",
      welcomeMemo:
        "From: Captain Dave Miller (VP Fleet Ops) — On-time delivery is our currency. Let's make sure our routes are optimized.",
    },
    team: [
      {
        id: "dave-miller",
        name: "Dave Miller",
        role: "VP of Fleet Operations",
        department: "Logistics",
        avatarText: "DM",
        avatarBg: "var(--mist)",
        bio: "Monitors vehicle dispatch, carrier transit times, and distribution centers.",
      },
    ],
    schema: [
      {
        name: "shipments",
        description: "Freight cargo consignments.",
        columns: [
          { name: "id", type: "INTEGER", description: "Tracking key", isPk: true },
          { name: "origin_warehouse", type: "VARCHAR(80)", description: "Departure hub" },
          { name: "destination_city", type: "VARCHAR(80)", description: "Delivery city" },
          { name: "weight_kg", type: "NUMERIC(8,2)", description: "Cargo weight" },
          { name: "status", type: "VARCHAR(30)", description: "in_transit, delivered, delayed" },
        ],
      },
    ],
  },

  restaurants: {
    company: {
      name: "Gusto Hospitality Group",
      tagline: "Multi-concept culinary dining venues",
      stageName: "Level 1: Flagship Bistro",
      employeeCount: "30 Culinary & Service Staff",
      dataHireRole: "Restaurant Operations Analyst",
      story:
        "You are the data specialist for Gusto Hospitality! Analyze menu item profitability, peak dining covers, table turn rates, and ingredient waste.",
      welcomeMemo:
        "From: Chef Marco Vieri (Executive Chef & Founder) — A good kitchen runs on passion; a great restaurant group runs on data.",
    },
    team: [
      {
        id: "marco-vieri",
        name: "Chef Marco Vieri",
        role: "Executive Chef & Founder",
        department: "Culinary Ops",
        avatarText: "MV",
        avatarBg: "var(--sun)",
        bio: "Tracks food cost percentages, ticket turn times, and guest favorites.",
      },
    ],
    schema: [
      {
        name: "menu_items",
        description: "Dishes and beverage offerings.",
        columns: [
          { name: "id", type: "INTEGER", description: "Item key", isPk: true },
          { name: "name", type: "VARCHAR(100)", description: "Dish title" },
          { name: "category", type: "VARCHAR(50)", description: "appetizer, entree, dessert, beverage" },
          { name: "price", type: "NUMERIC(8,2)", description: "Menu price" },
          { name: "cost", type: "NUMERIC(8,2)", description: "Ingredient cost" },
        ],
      },
    ],
  },

  saas: {
    company: {
      name: "CloudScale Metrics",
      tagline: "B2B infrastructure telemetry platform",
      stageName: "Level 1: Bootstrapped SaaS",
      employeeCount: "12 Engineering & Product Staff",
      dataHireRole: "Product & Growth Analyst",
      story:
        "Welcome to CloudScale Metrics! Track recurring subscription revenue (MRR), customer churn, feature engagement events, and plan upgrades.",
      welcomeMemo:
        "From: Samira Khan (CEO & Founder) — We build developer tools. Our metrics drive our roadmap and investor updates.",
    },
    team: [
      {
        id: "samira-khan",
        name: "Samira Khan",
        role: "CEO & Founder",
        department: "Executive",
        avatarText: "SK",
        avatarBg: "var(--ocean)",
        bio: "Focuses on Net Revenue Retention (NRR), churn cohorts, and trial conversions.",
      },
    ],
    schema: [
      {
        name: "subscriptions",
        description: "Customer recurring billing plans.",
        columns: [
          { name: "id", type: "INTEGER", description: "Subscription key", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Customer account" },
          { name: "plan", type: "VARCHAR(30)", description: "starter, professional, enterprise" },
          { name: "mrr", type: "NUMERIC(10,2)", description: "Monthly recurring revenue" },
          { name: "status", type: "VARCHAR(20)", description: "active, past_due, cancelled" },
        ],
      },
    ],
  },
};

export function getDomainOfficeMetadata(domainSlug: string): DomainOfficeData {
  return ALL_DOMAINS_OFFICE_METADATA[domainSlug] || ALL_DOMAINS_OFFICE_METADATA.ecommerce;
}
