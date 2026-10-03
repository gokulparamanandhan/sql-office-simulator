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
      tagline: "Next-day direct-to-consumer essentials & omnichannel marketplace",
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
        name: "departments",
        description: "Corporate operating units.",
        columns: [
          { name: "id", type: "INTEGER", description: "Department key", isPk: true },
          { name: "name", type: "VARCHAR(80)", description: "Department title" },
          { name: "head_name", type: "VARCHAR(80)", description: "Executive lead" },
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
        name: "suppliers",
        description: "Wholesale manufacturers providing merchandise.",
        columns: [
          { name: "id", type: "INTEGER", description: "Supplier key", isPk: true },
          { name: "company_name", type: "VARCHAR(100)", description: "Supplier enterprise name" },
          { name: "contact_email", type: "VARCHAR(100)", description: "Rep email" },
          { name: "phone", type: "VARCHAR(30)", description: "Office phone" },
          { name: "country", type: "VARCHAR(50)", description: "Headquarters country" },
          { name: "rating", type: "NUMERIC(3,1)", description: "Vendor reliability score (1-5)" },
        ],
      },
      {
        name: "warehouses",
        description: "Physical regional distribution fulfillment centers.",
        columns: [
          { name: "id", type: "INTEGER", description: "Facility key", isPk: true },
          { name: "name", type: "VARCHAR(100)", description: "Distribution center name" },
          { name: "city", type: "VARCHAR(80)", description: "Location city" },
          { name: "state", type: "VARCHAR(50)", description: "State or province" },
          { name: "capacity_sqft", type: "INTEGER", description: "Square footage" },
        ],
      },
      {
        name: "inventory",
        description: "Item stock quantities per fulfillment center.",
        columns: [
          { name: "id", type: "INTEGER", description: "Inventory line key", isPk: true },
          { name: "product_id", type: "INTEGER", description: "SKU key", fkTarget: "products.id" },
          { name: "warehouse_id", type: "INTEGER", description: "Warehouse key", fkTarget: "warehouses.id" },
          { name: "quantity_on_hand", type: "INTEGER", description: "Physical units available" },
          { name: "reserved_quantity", type: "INTEGER", description: "Units allocated to pending orders" },
        ],
      },
      {
        name: "coupons",
        description: "Promotional discount vouchers and campaigns.",
        columns: [
          { name: "id", type: "INTEGER", description: "Coupon key", isPk: true },
          { name: "code", type: "VARCHAR(30)", description: "Promo voucher code" },
          { name: "discount_percent", type: "INTEGER", description: "Discount percentage" },
          { name: "max_uses", type: "INTEGER", description: "Total redemption limit" },
          { name: "current_uses", type: "INTEGER", description: "Times redeemed" },
          { name: "is_active", type: "BOOLEAN", description: "Campaign active flag" },
        ],
      },
      {
        name: "customer_reviews",
        description: "Product ratings and verified customer reviews.",
        columns: [
          { name: "id", type: "INTEGER", description: "Review key", isPk: true },
          { name: "customer_id", type: "INTEGER", description: "Author key", fkTarget: "customers.id" },
          { name: "product_id", type: "INTEGER", description: "Product SKU", fkTarget: "products.id" },
          { name: "rating", type: "INTEGER", description: "Star rating (1 to 5)" },
          { name: "title", type: "VARCHAR(120)", description: "Review summary headline" },
          { name: "is_verified_purchase", type: "BOOLEAN", description: "Verified buyer flag" },
          { name: "review_date", type: "DATE", description: "Submission date" },
        ],
      },
      {
        name: "returns",
        description: "Item return merchandise authorizations and refunds.",
        columns: [
          { name: "id", type: "INTEGER", description: "Return RMA key", isPk: true },
          { name: "order_id", type: "INTEGER", description: "Origin order", fkTarget: "orders.id" },
          { name: "product_id", type: "INTEGER", description: "Returned SKU", fkTarget: "products.id" },
          { name: "reason", type: "VARCHAR(100)", description: "defective, wrong_size, not_needed, late_delivery" },
          { name: "refund_amount", type: "NUMERIC(10,2)", description: "Amount refunded to buyer" },
          { name: "status", type: "VARCHAR(30)", description: "approved, processing, rejected, completed" },
        ],
      },
      {
        name: "support_tickets",
        description: "Customer service inquiries and escalations.",
        columns: [
          { name: "id", type: "INTEGER", description: "Ticket key", isPk: true },
          { name: "customer_id", type: "INTEGER", description: "Shopper", fkTarget: "customers.id" },
          { name: "order_id", type: "INTEGER", description: "Associated order", fkTarget: "orders.id" },
          { name: "category", type: "VARCHAR(50)", description: "delivery, product, billing, account" },
          { name: "priority", type: "VARCHAR(20)", description: "low, medium, high, urgent" },
          { name: "status", type: "VARCHAR(30)", description: "open, in_progress, resolved, closed" },
          { name: "created_at", type: "TIMESTAMP", description: "Ticket opened time" },
        ],
      },
      {
        name: "brands",
        description: "Consumer brands and manufacturer trademarks.",
        columns: [
          { name: "id", type: "INTEGER", description: "Brand key", isPk: true },
          { name: "name", type: "VARCHAR(100)", description: "Brand name" },
          { name: "country_of_origin", type: "VARCHAR(50)", description: "Origin country" },
          { name: "tier", type: "VARCHAR(30)", description: "value, premium, luxury" },
        ],
      },
    ],
  },

  healthcare: {
    company: {
      name: "PulseHealth Medical Network",
      tagline: "Integrated regional acute care hospital & ambulatory network",
      stageName: "Level 1: Community Hospital System",
      employeeCount: "450 Medical & Clinical Staff",
      dataHireRole: "Clinical Data Analyst",
      story:
        "You are the senior data specialist at PulseHealth Medical Network! Our regional health system operates 12 ambulatory centers, specialized surgical wings, high-throughput pathology laboratories, and an inpatient acute care facility. Hospital leadership, department chiefs, and insurance auditors rely on your SQL analytics for clinical outcome monitoring, bed utilization, and revenue cycle reconciliation.",
      welcomeMemo:
        "From: Dr. Evelyn Reed (Chief Medical Officer) — Welcome to PulseHealth! We manage complex clinical workflows across 15 core relational systems. From doctor staffing to prescription compliance and insurance claim settlements, our patients' health and hospital solvency depend on accurate SQL insight.",
    },
    team: [
      {
        id: "evelyn-reed",
        name: "Dr. Evelyn Reed",
        role: "Chief Medical Officer",
        department: "Clinical Governance",
        avatarText: "ER",
        avatarBg: "var(--ocean)",
        bio: "Tracks patient outcomes, diagnostic trends, wait times, and clinical quality thresholds.",
      },
      {
        id: "jordan-chen",
        name: "Jordan Chen",
        role: "Director of Billing & Claims",
        department: "Revenue Cycle",
        avatarText: "JC",
        avatarBg: "var(--sun)",
        bio: "Audits insurance claim approval rates, copays, out-of-pocket patient balances, and billing aging.",
      },
      {
        id: "sarah-patel",
        name: "Dr. Sarah Patel",
        role: "Head of Surgical Services",
        department: "Surgery",
        avatarText: "SP",
        avatarBg: "var(--sky)",
        bio: "Oversees operating theatre utilization, inpatient bed capacity, and post-op care timelines.",
      },
      {
        id: "marcus-thorne",
        name: "Marcus Thorne",
        role: "Chief Nursing Officer",
        department: "Patient Operations",
        avatarText: "MT",
        avatarBg: "var(--mist)",
        bio: "Monitors nurse-to-patient staffing ratios, bed occupancy rates, and triage turnaround.",
      },
    ],
    schema: [
      {
        name: "departments",
        description: "Hospital specialty wings, wards, and administrative clinical divisions.",
        columns: [
          { name: "id", type: "INTEGER", description: "Department primary key", isPk: true },
          { name: "name", type: "VARCHAR(80)", description: "Department name (Cardiology, Pediatrics, Surgery, Oncology)" },
          { name: "building", type: "VARCHAR(50)", description: "Hospital pavilion building" },
          { name: "floor", type: "INTEGER", description: "Floor level" },
          { name: "head_doctor_id", type: "INTEGER", description: "Department chief" },
        ],
      },
      {
        name: "doctors",
        description: "Licensed physicians, specialists, and surgical consultants.",
        columns: [
          { name: "id", type: "INTEGER", description: "Doctor license ID", isPk: true },
          { name: "name", type: "VARCHAR(100)", description: "Full physician name" },
          { name: "specialty", type: "VARCHAR(80)", description: "Clinical specialty" },
          { name: "department_id", type: "INTEGER", description: "Clinical department key", fkTarget: "departments.id" },
          { name: "email", type: "VARCHAR(100)", description: "Hospital secure email" },
          { name: "phone", type: "VARCHAR(30)", description: "Extension / pager" },
          { name: "license_number", type: "VARCHAR(40)", description: "Medical board license" },
        ],
      },
      {
        name: "nurses",
        description: "Registered clinical nurses, nurse practitioners, and charge staff.",
        columns: [
          { name: "id", type: "INTEGER", description: "Nurse ID", isPk: true },
          { name: "name", type: "VARCHAR(100)", description: "Full nurse name" },
          { name: "department_id", type: "INTEGER", description: "Assigned department", fkTarget: "departments.id" },
          { name: "shift", type: "VARCHAR(20)", description: "Day, Night, Weekend, Rotating" },
          { name: "certification_level", type: "VARCHAR(30)", description: "RN, BSN, NP, CRNA" },
        ],
      },
      {
        name: "patients",
        description: "Registered patient demographic and health coverage records.",
        columns: [
          { name: "id", type: "INTEGER", description: "Patient Medical Record Number (MRN)", isPk: true },
          { name: "first_name", type: "VARCHAR(50)", description: "Patient first name" },
          { name: "last_name", type: "VARCHAR(50)", description: "Patient surname" },
          { name: "dob", type: "DATE", description: "Date of birth" },
          { name: "gender", type: "VARCHAR(10)", description: "Biological sex (Female, Male, Other)" },
          { name: "blood_type", type: "VARCHAR(5)", description: "Blood group (A+, O+, B-, etc.)" },
          { name: "insurance_provider", type: "VARCHAR(80)", description: "Primary payer (BlueCross, Aetna, Medicare, Cigna)" },
          { name: "city", type: "VARCHAR(50)", description: "Residential city" },
          { name: "created_at", type: "DATE", description: "Record registration date" },
        ],
      },
      {
        name: "rooms",
        description: "Hospital ward rooms, intensive care units, and recovery beds.",
        columns: [
          { name: "id", type: "INTEGER", description: "Room key", isPk: true },
          { name: "room_number", type: "VARCHAR(20)", description: "Room identifier (e.g. 302-A)" },
          { name: "department_id", type: "INTEGER", description: "Associated ward", fkTarget: "departments.id" },
          { name: "room_type", type: "VARCHAR(40)", description: "Standard, ICU, Semi-Private, Isolation, Suite" },
          { name: "daily_rate", type: "NUMERIC(10,2)", description: "Per-diem bed charge" },
          { name: "is_occupied", type: "BOOLEAN", description: "Current occupancy status" },
        ],
      },
      {
        name: "appointments",
        description: "Scheduled and completed outpatient encounters.",
        columns: [
          { name: "id", type: "INTEGER", description: "Encounter key", isPk: true },
          { name: "patient_id", type: "INTEGER", description: "Patient key", fkTarget: "patients.id" },
          { name: "doctor_id", type: "INTEGER", description: "Attending doctor", fkTarget: "doctors.id" },
          { name: "appointment_date", type: "TIMESTAMP", description: "Consultation time" },
          { name: "appointment_type", type: "VARCHAR(40)", description: "Checkup, Follow-up, Urgent, Specialist, Telehealth" },
          { name: "status", type: "VARCHAR(30)", description: "completed, cancelled, no_show, in_progress" },
          { name: "fee", type: "NUMERIC(10,2)", description: "Consultation charge in USD" },
        ],
      },
      {
        name: "diagnoses",
        description: "Documented patient clinical conditions with ICD-10 codes.",
        columns: [
          { name: "id", type: "INTEGER", description: "Diagnosis record key", isPk: true },
          { name: "patient_id", type: "INTEGER", description: "Patient key", fkTarget: "patients.id" },
          { name: "appointment_id", type: "INTEGER", description: "Clinical encounter", fkTarget: "appointments.id" },
          { name: "icd10_code", type: "VARCHAR(15)", description: "Standard diagnostic code (e.g. I10, E11.9, J45)" },
          { name: "description", type: "VARCHAR(150)", description: "Condition description" },
          { name: "severity", type: "VARCHAR(20)", description: "Mild, Moderate, Severe, Critical" },
          { name: "diagnosis_date", type: "DATE", description: "Date diagnosed" },
        ],
      },
      {
        name: "medications",
        description: "Formulary pharmaceutical catalogue with dosages and unit costs.",
        columns: [
          { name: "id", type: "INTEGER", description: "Medication key", isPk: true },
          { name: "name", type: "VARCHAR(100)", description: "Trade name" },
          { name: "generic_name", type: "VARCHAR(100)", description: "Chemical active compound" },
          { name: "dosage_form", type: "VARCHAR(50)", description: "Tablet, Capsule, Liquid, Injection, Inhaler" },
          { name: "strength", type: "VARCHAR(30)", description: "Dosage strength (e.g. 500mg, 10mg/ml)" },
          { name: "unit_cost", type: "NUMERIC(8,2)", description: "Pharmacy acquisition cost" },
        ],
      },
      {
        name: "prescriptions",
        description: "Medication orders issued by doctors for patient therapy.",
        columns: [
          { name: "id", type: "INTEGER", description: "Prescription key", isPk: true },
          { name: "appointment_id", type: "INTEGER", description: "Encounter key", fkTarget: "appointments.id" },
          { name: "patient_id", type: "INTEGER", description: "Patient key", fkTarget: "patients.id" },
          { name: "doctor_id", type: "INTEGER", description: "Prescribing doctor", fkTarget: "doctors.id" },
          { name: "medication_name", type: "VARCHAR(100)", description: "Medication compound title" },
          { name: "dosage", type: "VARCHAR(50)", description: "Dosage instructions" },
          { name: "refills", type: "INTEGER", description: "Authorized refills remaining" },
        ],
      },
      {
        name: "lab_tests",
        description: "Clinical laboratory test catalogue with normal diagnostic reference ranges.",
        columns: [
          { name: "id", type: "INTEGER", description: "Lab test key", isPk: true },
          { name: "test_name", type: "VARCHAR(100)", description: "Test title (e.g. Complete Blood Count, Lipid Panel, HbA1c)" },
          { name: "category", type: "VARCHAR(50)", description: "Hematology, Biochemistry, Immunology, Microbiology" },
          { name: "standard_fee", type: "NUMERIC(10,2)", description: "Standard test price" },
          { name: "normal_range_min", type: "NUMERIC(8,2)", description: "Lower normal bound" },
          { name: "normal_range_max", type: "NUMERIC(8,2)", description: "Upper normal bound" },
        ],
      },
      {
        name: "patient_lab_results",
        description: "Diagnostic specimen results, measured values, and clinical flags.",
        columns: [
          { name: "id", type: "INTEGER", description: "Lab result key", isPk: true },
          { name: "patient_id", type: "INTEGER", description: "Patient key", fkTarget: "patients.id" },
          { name: "test_id", type: "INTEGER", description: "Lab test identifier", fkTarget: "lab_tests.id" },
          { name: "result_value", type: "NUMERIC(8,2)", description: "Quantitative test measurement" },
          { name: "flag", type: "VARCHAR(20)", description: "NORMAL, HIGH, LOW, CRITICAL" },
          { name: "performed_date", type: "DATE", description: "Specimen analysis date" },
        ],
      },
      {
        name: "billing",
        description: "Consolidated patient invoices for clinical encounters.",
        columns: [
          { name: "id", type: "INTEGER", description: "Bill statement key", isPk: true },
          { name: "patient_id", type: "INTEGER", description: "Billed patient", fkTarget: "patients.id" },
          { name: "appointment_id", type: "INTEGER", description: "Associated visit", fkTarget: "appointments.id" },
          { name: "total_charge", type: "NUMERIC(10,2)", description: "Gross charge billed" },
          { name: "copay_amount", type: "NUMERIC(10,2)", description: "Immediate patient copay" },
          { name: "insurance_covered", type: "NUMERIC(10,2)", description: "Amount paid by insurer" },
          { name: "patient_balance", type: "NUMERIC(10,2)", description: "Remaining balance owed by patient" },
          { name: "status", type: "VARCHAR(30)", description: "paid, pending_insurance, overdue, disputed" },
        ],
      },
      {
        name: "insurance_claims",
        description: "Claims submitted to third-party commercial and federal payers.",
        columns: [
          { name: "id", type: "INTEGER", description: "Claim key", isPk: true },
          { name: "billing_id", type: "INTEGER", description: "Associated invoice", fkTarget: "billing.id" },
          { name: "insurance_provider", type: "VARCHAR(80)", description: "Payer organisation" },
          { name: "claim_amount", type: "NUMERIC(10,2)", description: "Reimbursement requested" },
          { name: "approved_amount", type: "NUMERIC(10,2)", description: "Amount approved by adjuster" },
          { name: "status", type: "VARCHAR(30)", description: "submitted, approved, denied, appeals_process" },
          { name: "settlement_days", type: "INTEGER", description: "Turnaround time in calendar days" },
        ],
      },
      {
        name: "inpatient_admissions",
        description: "Overnight hospitalizations and surgical admissions.",
        columns: [
          { name: "id", type: "INTEGER", description: "Admission record key", isPk: true },
          { name: "patient_id", type: "INTEGER", description: "Admitted patient", fkTarget: "patients.id" },
          { name: "room_id", type: "INTEGER", description: "Assigned hospital room", fkTarget: "rooms.id" },
          { name: "admitting_doctor_id", type: "INTEGER", description: "Attending doctor", fkTarget: "doctors.id" },
          { name: "admission_date", type: "DATE", description: "Date admitted" },
          { name: "discharge_date", type: "DATE", description: "Discharge date" },
          { name: "discharge_disposition", type: "VARCHAR(50)", description: "Home, Rehab, Transfer, Deceased" },
        ],
      },
      {
        name: "medical_procedures",
        description: "Catalogue of surgeries, therapies, and clinical procedures.",
        columns: [
          { name: "id", type: "INTEGER", description: "Procedure key", isPk: true },
          { name: "code", type: "VARCHAR(20)", description: "CPT procedure code" },
          { name: "procedure_name", type: "VARCHAR(120)", description: "Procedure clinical name" },
          { name: "department_id", type: "INTEGER", description: "Performing specialty wing", fkTarget: "departments.id" },
          { name: "duration_minutes", type: "INTEGER", description: "Expected procedure duration" },
          { name: "standard_cost", type: "NUMERIC(10,2)", description: "Standard facility cost" },
        ],
      },
    ],
  },

  finance: {
    company: {
      name: "Meridian Capital Group",
      tagline: "Commercial boutique banking, treasury & wealth management",
      stageName: "Level 1: Boutique Financial Institution",
      employeeCount: "250 Finance, Treasury & Risk Staff",
      dataHireRole: "Risk & Portfolio Analyst",
      story:
        "Welcome to Meridian Capital! As our dedicated financial data specialist, you audit high-volume transaction flows, evaluate borrower credit risk across regional branches, analyze lending yields, detect money laundering anomalies, and audit portfolio allocations.",
      welcomeMemo:
        "From: Victor Vance (Head of Risk) — Accurate data is the foundation of solvency and compliance. Our 15 core financial ledgers record everything from daily ATM withdrawals to million-dollar commercial credit facilities. Take a deep dive into our schema!",
    },
    team: [
      {
        id: "victor-vance",
        name: "Victor Vance",
        role: "Head of Risk & Compliance",
        department: "Risk Management",
        avatarText: "VV",
        avatarBg: "var(--ocean)",
        bio: "Tracks transaction anomalies, exposure thresholds, capital adequacy ratios, and audit requirements.",
      },
      {
        id: "elena-rostova",
        name: "Elena Rostova",
        role: "VP of Retail & Commercial Lending",
        department: "Lending",
        avatarText: "ER",
        avatarBg: "var(--sun)",
        bio: "Monitors loan delinquency rates, origination volumes, and interest yields across branches.",
      },
      {
        id: "arthur-pendleton",
        name: "Arthur Pendleton",
        role: "Chief Wealth Advisor",
        department: "Wealth Management",
        avatarText: "AP",
        avatarBg: "var(--sky)",
        bio: "Manages high-net-worth portfolio allocations, asset returns, and dividend performance.",
      },
    ],
    schema: [
      {
        name: "branches",
        description: "Regional bank branches and physical financial centers.",
        columns: [
          { name: "id", type: "INTEGER", description: "Branch code", isPk: true },
          { name: "branch_name", type: "VARCHAR(80)", description: "Branch title" },
          { name: "city", type: "VARCHAR(50)", description: "Municipality" },
          { name: "state", type: "VARCHAR(30)", description: "State or territory" },
          { name: "manager_name", type: "VARCHAR(80)", description: "Branch general manager" },
          { name: "vault_cash_limit", type: "NUMERIC(12,2)", description: "Maximum authorized vault cash" },
        ],
      },
      {
        name: "customers",
        description: "Retail and commercial banking clientele.",
        columns: [
          { name: "id", type: "INTEGER", description: "Customer CID", isPk: true },
          { name: "name", type: "VARCHAR(100)", description: "Individual or enterprise client name" },
          { name: "credit_score", type: "INTEGER", description: "FICO credit score (300-850)" },
          { name: "branch_city", type: "VARCHAR(50)", description: "Primary branch location" },
          { name: "annual_income", type: "NUMERIC(12,2)", description: "Verified annual revenue/income" },
          { name: "risk_rating", type: "VARCHAR(20)", description: "Low, Moderate, High, Speculative" },
          { name: "created_at", type: "DATE", description: "Client relationship onboarding date" },
        ],
      },
      {
        name: "account_types",
        description: "Banking product catalog and deposit account terms.",
        columns: [
          { name: "id", type: "INTEGER", description: "Product code", isPk: true },
          { name: "type_name", type: "VARCHAR(40)", description: "checking, savings, money_market, cd, investment" },
          { name: "min_balance", type: "NUMERIC(10,2)", description: "Minimum balance to waive fee" },
          { name: "annual_interest_rate", type: "NUMERIC(5,2)", description: "Annual percentage yield (APY %)" },
          { name: "monthly_fee", type: "NUMERIC(6,2)", description: "Monthly maintenance charge" },
        ],
      },
      {
        name: "accounts",
        description: "Customer depository and credit accounts.",
        columns: [
          { name: "id", type: "INTEGER", description: "Account primary key", isPk: true },
          { name: "customer_id", type: "INTEGER", description: "Account holder key", fkTarget: "customers.id" },
          { name: "branch_id", type: "INTEGER", description: "Originating branch", fkTarget: "branches.id" },
          { name: "account_type", type: "VARCHAR(30)", description: "checking, savings, investment, credit" },
          { name: "balance", type: "NUMERIC(12,2)", description: "Current cleared balance in USD" },
          { name: "status", type: "VARCHAR(20)", description: "active, frozen, closed, under_audit" },
        ],
      },
      {
        name: "transactions",
        description: "General ledger entries of debits, credits, and wire movements.",
        columns: [
          { name: "id", type: "INTEGER", description: "Transaction ID", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Account key", fkTarget: "accounts.id" },
          { name: "amount", type: "NUMERIC(10,2)", description: "Transaction cash value" },
          { name: "transaction_type", type: "VARCHAR(20)", description: "deposit, withdrawal, transfer, fee, wire" },
          { name: "description", type: "VARCHAR(120)", description: "Transaction narrative" },
          { name: "created_at", type: "TIMESTAMP", description: "Timestamp settled" },
        ],
      },
      {
        name: "merchants",
        description: "Commercial businesses enrolled in point-of-sale processing.",
        columns: [
          { name: "id", type: "INTEGER", description: "Merchant ID", isPk: true },
          { name: "name", type: "VARCHAR(100)", description: "Merchant business trade name" },
          { name: "category", type: "VARCHAR(50)", description: "Grocery, Travel, Electronics, Dining, Fuel" },
          { name: "city", type: "VARCHAR(50)", description: "Merchant city" },
          { name: "country", type: "VARCHAR(50)", description: "Settlement country" },
          { name: "risk_level", type: "VARCHAR(20)", description: "Standard, Medium, High_Risk" },
        ],
      },
      {
        name: "cards",
        description: "Debit and credit payment cards issued to account holders.",
        columns: [
          { name: "id", type: "INTEGER", description: "Card token ID", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Linked deposit/credit account", fkTarget: "accounts.id" },
          { name: "card_type", type: "VARCHAR(20)", description: "Visa_Debit, Mastercard_Credit, Platinum_Amex" },
          { name: "card_number_masked", type: "VARCHAR(20)", description: "Masked PAN (e.g. ****-****-****-1234)" },
          { name: "daily_limit", type: "NUMERIC(10,2)", description: "Daily spending threshold" },
          { name: "status", type: "VARCHAR(20)", description: "active, blocked, expired" },
        ],
      },
      {
        name: "card_swipes",
        description: "Point-of-sale card terminal transaction authorizations.",
        columns: [
          { name: "id", type: "INTEGER", description: "Swipe auth key", isPk: true },
          { name: "card_id", type: "INTEGER", description: "Card key", fkTarget: "cards.id" },
          { name: "merchant_id", type: "INTEGER", description: "Merchant terminal", fkTarget: "merchants.id" },
          { name: "amount", type: "NUMERIC(10,2)", description: "Authorized amount" },
          { name: "is_contactless", type: "BOOLEAN", description: "Tap-to-pay flag" },
          { name: "fraud_score", type: "INTEGER", description: "Real-time ML risk score (0-100)" },
          { name: "transaction_date", type: "TIMESTAMP", description: "Swipe timestamp" },
        ],
      },
      {
        name: "loans",
        description: "Consumer mortgages, auto loans, and commercial credit lines.",
        columns: [
          { name: "id", type: "INTEGER", description: "Loan commitment key", isPk: true },
          { name: "customer_id", type: "INTEGER", description: "Borrower key", fkTarget: "customers.id" },
          { name: "branch_id", type: "INTEGER", description: "Origin branch", fkTarget: "branches.id" },
          { name: "loan_type", type: "VARCHAR(30)", description: "Mortgage, Auto, Business, Personal, Student" },
          { name: "principal_amount", type: "NUMERIC(12,2)", description: "Disbursed principal" },
          { name: "interest_rate", type: "NUMERIC(5,2)", description: "Annual percentage rate (APR)" },
          { name: "term_months", type: "INTEGER", description: "Loan duration in months" },
          { name: "status", type: "VARCHAR(20)", description: "current, late, in_default, paid_off" },
        ],
      },
      {
        name: "loan_payments",
        description: "Monthly installment repayments against active loan principal.",
        columns: [
          { name: "id", type: "INTEGER", description: "Payment ledger ID", isPk: true },
          { name: "loan_id", type: "INTEGER", description: "Loan key", fkTarget: "loans.id" },
          { name: "payment_amount", type: "NUMERIC(10,2)", description: "Total payment received" },
          { name: "principal_portion", type: "NUMERIC(10,2)", description: "Principal reduction amount" },
          { name: "interest_portion", type: "NUMERIC(10,2)", description: "Accrued interest paid" },
          { name: "payment_date", type: "DATE", description: "Posting date" },
          { name: "status", type: "VARCHAR(20)", description: "completed, bounced, reversed" },
        ],
      },
      {
        name: "credit_lines",
        description: "Revolving lines of credit and overdraft protection facilities.",
        columns: [
          { name: "id", type: "INTEGER", description: "Facility key", isPk: true },
          { name: "customer_id", type: "INTEGER", description: "Borrower key", fkTarget: "customers.id" },
          { name: "total_limit", type: "NUMERIC(12,2)", description: "Maximum approved limit" },
          { name: "used_amount", type: "NUMERIC(12,2)", description: "Current outstanding balance" },
          { name: "interest_rate", type: "NUMERIC(5,2)", description: "Revolving APR" },
          { name: "status", type: "VARCHAR(20)", description: "active, suspended, closed" },
        ],
      },
      {
        name: "fraud_alerts",
        description: "Automated AML and card fraud alerts flagged for compliance review.",
        columns: [
          { name: "id", type: "INTEGER", description: "Alert key", isPk: true },
          { name: "transaction_id", type: "INTEGER", description: "Suspicious transaction", fkTarget: "transactions.id" },
          { name: "severity", type: "VARCHAR(20)", description: "LOW, MEDIUM, HIGH, CRITICAL" },
          { name: "rule_triggered", type: "VARCHAR(100)", description: "AML velocity, Unusual geography, High amount" },
          { name: "status", type: "VARCHAR(30)", description: "under_review, confirmed_fraud, false_positive" },
          { name: "alert_date", type: "DATE", description: "Date flagged" },
        ],
      },
      {
        name: "investments",
        description: "Wealth management portfolios, index funds, and bond holdings.",
        columns: [
          { name: "id", type: "INTEGER", description: "Portfolio key", isPk: true },
          { name: "customer_id", type: "INTEGER", description: "Investor key", fkTarget: "customers.id" },
          { name: "portfolio_type", type: "VARCHAR(40)", description: "Aggressive_Growth, Balanced, Fixed_Income, ESG" },
          { name: "total_invested", type: "NUMERIC(12,2)", description: "Cost basis in USD" },
          { name: "current_value", type: "NUMERIC(12,2)", description: "Current mark-to-market value" },
          { name: "risk_profile", type: "VARCHAR(20)", description: "Conservative, Moderate, Aggressive" },
        ],
      },
      {
        name: "teller_sessions",
        description: "Cash drawer shift balancing and in-branch counter activity.",
        columns: [
          { name: "id", type: "INTEGER", description: "Session key", isPk: true },
          { name: "branch_id", type: "INTEGER", description: "Branch location", fkTarget: "branches.id" },
          { name: "teller_name", type: "VARCHAR(80)", description: "Teller staff member" },
          { name: "opening_cash", type: "NUMERIC(10,2)", description: "Drawer open float" },
          { name: "closing_cash", type: "NUMERIC(10,2)", description: "Drawer close balance" },
          { name: "session_date", type: "DATE", description: "Shift date" },
        ],
      },
      {
        name: "audit_logs",
        description: "Security and compliance audit trail of critical ledger updates.",
        columns: [
          { name: "id", type: "INTEGER", description: "Log key", isPk: true },
          { name: "entity_type", type: "VARCHAR(40)", description: "account, loan, wire, customer" },
          { name: "action", type: "VARCHAR(40)", description: "CREATE, UPDATE_BALANCE, FREEZE, OVERRIDE" },
          { name: "performed_by", type: "VARCHAR(80)", description: "User or system agent" },
          { name: "timestamp", type: "TIMESTAMP", description: "Timestamp of audit event" },
        ],
      },
    ],
  },

  hr: {
    company: {
      name: "TalentFlow Global",
      tagline: "Enterprise workforce operations & people analytics",
      stageName: "Level 1: People Ops & Workforce Hub",
      employeeCount: "1,200 Global Employees",
      dataHireRole: "People Analytics Specialist",
      story:
        "You've joined TalentFlow Global! Help our executive leadership evaluate department compensation, track tenure and turnover risk, audit annual performance cycles, optimize benefit packages, and streamline recruitment pipelines across our 15 HR enterprise tables.",
      welcomeMemo:
        "From: Maya Thorne (VP of People) — Great people build great companies. We look to you for equitable compensation metrics, attrition insights, training completion rates, and headcount forecasting.",
    },
    team: [
      {
        id: "maya-thorne",
        name: "Maya Thorne",
        role: "VP of People Operations",
        department: "Human Resources",
        avatarText: "MT",
        avatarBg: "var(--sky)",
        bio: "Drives salary benchmarking, turnover analysis, leadership succession, and diversity metrics.",
      },
      {
        id: "david-kim",
        name: "David Kim",
        role: "Director of Talent Acquisition",
        department: "Recruiting",
        avatarText: "DK",
        avatarBg: "var(--ocean)",
        bio: "Tracks candidate pipelines, offer acceptance rates, time-to-hire, and recruitment budgets.",
      },
    ],
    schema: [
      {
        name: "departments",
        description: "Organizational business units and cost centers.",
        columns: [
          { name: "id", type: "INTEGER", description: "Department key", isPk: true },
          { name: "name", type: "VARCHAR(80)", description: "Department title" },
          { name: "head_name", type: "VARCHAR(80)", description: "Executive lead" },
          { name: "budget", type: "NUMERIC(12,2)", description: "Annual operational budget" },
        ],
      },
      {
        name: "job_roles",
        description: "Career job ladder titles, salary bands, and job grades.",
        columns: [
          { name: "id", type: "INTEGER", description: "Role key", isPk: true },
          { name: "job_title", type: "VARCHAR(80)", description: "Position title" },
          { name: "department_id", type: "INTEGER", description: "Department key", fkTarget: "departments.id" },
          { name: "grade_level", type: "VARCHAR(10)", description: "Seniority grade (L1 to L8)" },
          { name: "min_salary", type: "NUMERIC(10,2)", description: "Band minimum salary" },
          { name: "max_salary", type: "NUMERIC(10,2)", description: "Band maximum salary" },
        ],
      },
      {
        name: "locations",
        description: "Company regional offices, campus headquarters, and remote hubs.",
        columns: [
          { name: "id", type: "INTEGER", description: "Location key", isPk: true },
          { name: "office_name", type: "VARCHAR(80)", description: "Campus name" },
          { name: "city", type: "VARCHAR(50)", description: "City" },
          { name: "country", type: "VARCHAR(50)", description: "Country" },
          { name: "capacity", type: "INTEGER", description: "Desk capacity" },
        ],
      },
      {
        name: "employees",
        description: "Staff roster across all divisions and subsidiaries.",
        columns: [
          { name: "id", type: "INTEGER", description: "Employee ID", isPk: true },
          { name: "name", type: "VARCHAR(100)", description: "Full legal name" },
          { name: "department_id", type: "INTEGER", description: "Assigned department", fkTarget: "departments.id" },
          { name: "role_id", type: "INTEGER", description: "Job title role", fkTarget: "job_roles.id" },
          { name: "salary", type: "NUMERIC(10,2)", description: "Annual base salary" },
          { name: "hire_date", type: "DATE", description: "Employment start date" },
          { name: "status", type: "VARCHAR(20)", description: "active, on_leave, terminated" },
        ],
      },
      {
        name: "salaries_history",
        description: "Audit ledger of employee compensation changes, raises, and bonuses.",
        columns: [
          { name: "id", type: "INTEGER", description: "Salary history key", isPk: true },
          { name: "employee_id", type: "INTEGER", description: "Employee key", fkTarget: "employees.id" },
          { name: "effective_date", type: "DATE", description: "Date adjustment took effect" },
          { name: "previous_salary", type: "NUMERIC(10,2)", description: "Former base salary" },
          { name: "new_salary", type: "NUMERIC(10,2)", description: "Adjusted new base salary" },
          { name: "change_reason", type: "VARCHAR(80)", description: "Annual_Review, Promotion, Market_Adjustment" },
        ],
      },
      {
        name: "benefits_packages",
        description: "Corporate healthcare, 401k match, and wellness tiers.",
        columns: [
          { name: "id", type: "INTEGER", description: "Package key", isPk: true },
          { name: "package_name", type: "VARCHAR(80)", description: "Plan name (Gold PPO, Silver HDHP, Exec Care)" },
          { name: "health_plan", type: "VARCHAR(50)", description: "Health insurer" },
          { name: "retirement_match_pct", type: "NUMERIC(4,2)", description: "Company match percentage" },
          { name: "annual_cost", type: "NUMERIC(8,2)", description: "Company contribution cost" },
        ],
      },
      {
        name: "employee_benefits",
        description: "Active benefit package enrollments per staff member.",
        columns: [
          { name: "id", type: "INTEGER", description: "Enrollment key", isPk: true },
          { name: "employee_id", type: "INTEGER", description: "Employee key", fkTarget: "employees.id" },
          { name: "package_id", type: "INTEGER", description: "Benefits plan", fkTarget: "benefits_packages.id" },
          { name: "enrolled_date", type: "DATE", description: "Enrollment date" },
        ],
      },
      {
        name: "performance_reviews",
        description: "Annual and semi-annual employee evaluation ratings.",
        columns: [
          { name: "id", type: "INTEGER", description: "Review record key", isPk: true },
          { name: "employee_id", type: "INTEGER", description: "Evaluated employee", fkTarget: "employees.id" },
          { name: "review_year", type: "INTEGER", description: "Performance cycle year" },
          { name: "rating", type: "INTEGER", description: "Score (1: Unsatisfactory, 5: Exceptional)" },
          { name: "bonus_pct", type: "NUMERIC(5,2)", description: "Performance bonus percentage awarded" },
        ],
      },
      {
        name: "leave_requests",
        description: "Paid time off, sick leave, parental, and sabbatical logs.",
        columns: [
          { name: "id", type: "INTEGER", description: "Request key", isPk: true },
          { name: "employee_id", type: "INTEGER", description: "Requesting employee", fkTarget: "employees.id" },
          { name: "leave_type", type: "VARCHAR(30)", description: "PTO, Sick, Parental, Bereavement, Unpaid" },
          { name: "start_date", type: "DATE", description: "Leave start date" },
          { name: "end_date", type: "DATE", description: "Leave end date" },
          { name: "total_days", type: "INTEGER", description: "Business days taken" },
          { name: "status", type: "VARCHAR(20)", description: "approved, pending, rejected" },
        ],
      },
      {
        name: "attendance_logs",
        description: "Daily office badge badge-in and remote login telemetry.",
        columns: [
          { name: "id", type: "INTEGER", description: "Log key", isPk: true },
          { name: "employee_id", type: "INTEGER", description: "Employee key", fkTarget: "employees.id" },
          { name: "work_date", type: "DATE", description: "Date worked" },
          { name: "work_mode", type: "VARCHAR(20)", description: "In_Office, Remote, Travel" },
          { name: "hours_worked", type: "NUMERIC(4,2)", description: "Total hours logged" },
        ],
      },
      {
        name: "training_courses",
        description: "Professional development and compliance courses.",
        columns: [
          { name: "id", type: "INTEGER", description: "Course key", isPk: true },
          { name: "course_title", type: "VARCHAR(120)", description: "Curriculum title" },
          { name: "category", type: "VARCHAR(50)", description: "Compliance, Technical, Leadership, Security" },
          { name: "duration_hours", type: "INTEGER", description: "Course length" },
        ],
      },
      {
        name: "employee_trainings",
        description: "Course enrollment, test scores, and completion certificates.",
        columns: [
          { name: "id", type: "INTEGER", description: "Training line ID", isPk: true },
          { name: "employee_id", type: "INTEGER", description: "Employee", fkTarget: "employees.id" },
          { name: "course_id", type: "INTEGER", description: "Course", fkTarget: "training_courses.id" },
          { name: "status", type: "VARCHAR(20)", description: "completed, in_progress, overdue" },
          { name: "score", type: "INTEGER", description: "Assessment exam score (0-100)" },
        ],
      },
      {
        name: "job_openings",
        description: "Active headcount requisitions approved for external hiring.",
        columns: [
          { name: "id", type: "INTEGER", description: "Requisition ID", isPk: true },
          { name: "department_id", type: "INTEGER", description: "Target department", fkTarget: "departments.id" },
          { name: "role_id", type: "INTEGER", description: "Job title", fkTarget: "job_roles.id" },
          { name: "status", type: "VARCHAR(20)", description: "open, interviewing, offer_extended, filled" },
          { name: "posting_date", type: "DATE", description: "Publication date" },
        ],
      },
      {
        name: "candidates",
        description: "Recruitment applicants and pipeline stages.",
        columns: [
          { name: "id", type: "INTEGER", description: "Candidate key", isPk: true },
          { name: "opening_id", type: "INTEGER", description: "Target requisition", fkTarget: "job_openings.id" },
          { name: "name", type: "VARCHAR(100)", description: "Applicant full name" },
          { name: "stage", type: "VARCHAR(30)", description: "Screening, Technical, Final_Round, Offer, Rejected" },
          { name: "interview_score", type: "INTEGER", description: "Candidate interview rating (1-5)" },
        ],
      },
      {
        name: "employee_promotions",
        description: "Career progression and title promotions log.",
        columns: [
          { name: "id", type: "INTEGER", description: "Promotion key", isPk: true },
          { name: "employee_id", type: "INTEGER", description: "Promoted employee", fkTarget: "employees.id" },
          { name: "old_role_id", type: "INTEGER", description: "Prior position", fkTarget: "job_roles.id" },
          { name: "new_role_id", type: "INTEGER", description: "New elevated position", fkTarget: "job_roles.id" },
          { name: "promotion_date", type: "DATE", description: "Effective date" },
        ],
      },
    ],
  },

  logistics: {
    company: {
      name: "Apex Freight & Distribution",
      tagline: "Multimodal freight logistics, cross-dock hubs & global supply chain",
      stageName: "Level 1: Freight Dispatch Hub",
      employeeCount: "850 Dispatch, Warehouse & Fleet Personnel",
      dataHireRole: "Logistics Optimization Analyst",
      story:
        "Welcome to Apex Freight! Keep our global multimodal supply chain humming by analyzing freight manifests, delivery turnaround times, fuel efficiency, warehouse bay utilization, and customs clearance across our 15 supply chain tables.",
      welcomeMemo:
        "From: Captain Dave Miller (VP Fleet Ops) — On-time delivery is our currency. Let's make sure our routes, fleet fuel logs, driver schedules, and cross-dock bays are mathematically optimized.",
    },
    team: [
      {
        id: "dave-miller",
        name: "Dave Miller",
        role: "VP of Fleet Operations",
        department: "Logistics",
        avatarText: "DM",
        avatarBg: "var(--mist)",
        bio: "Monitors vehicle dispatch, carrier transit times, maintenance schedules, and cross-dock distribution centers.",
      },
      {
        id: "claire-sullivan",
        name: "Claire Sullivan",
        role: "Director of Supply Chain Planning",
        department: "Supply Chain",
        avatarText: "CS",
        avatarBg: "var(--ocean)",
        bio: "Tracks supplier lead times, port clearances, warehouse capacity constraints, and freight billing.",
      },
    ],
    schema: [
      {
        name: "warehouses",
        description: "Cross-dock facilities, cold-chain hubs, and distribution centers.",
        columns: [
          { name: "id", type: "INTEGER", description: "Facility key", isPk: true },
          { name: "city", type: "VARCHAR(80)", description: "Hub municipality" },
          { name: "capacity_sqft", type: "INTEGER", description: "Storage space" },
          { name: "manager_name", type: "VARCHAR(80)", description: "Facility director" },
        ],
      },
      {
        name: "carriers",
        description: "Third-party and contracted freight carriers.",
        columns: [
          { name: "id", type: "INTEGER", description: "Carrier key", isPk: true },
          { name: "carrier_name", type: "VARCHAR(80)", description: "Carrier corporate name" },
          { name: "service_level", type: "VARCHAR(40)", description: "Next-Day, Standard Ground, Expedited Air, Intermodal" },
          { name: "rating", type: "NUMERIC(3,1)", description: "Carrier scorecard rating (1.0 - 5.0)" },
        ],
      },
      {
        name: "fleet_vehicles",
        description: "Company-owned tractor trailers, refrigerated trucks, and cargo vans.",
        columns: [
          { name: "id", type: "INTEGER", description: "Vehicle key", isPk: true },
          { name: "vehicle_number", type: "VARCHAR(30)", description: "Vehicle unit code" },
          { name: "vehicle_type", type: "VARCHAR(40)", description: "Semi_Truck, Box_Truck, Reefer, Cargo_Van" },
          { name: "max_weight_capacity_kg", type: "NUMERIC(10,2)", description: "Payload limit in KG" },
          { name: "mileage_km", type: "INTEGER", description: "Odometer reading" },
          { name: "status", type: "VARCHAR(20)", description: "active, in_maintenance, decommissioned" },
        ],
      },
      {
        name: "drivers",
        description: "Commercial CDL drivers and transport operators.",
        columns: [
          { name: "id", type: "INTEGER", description: "Driver ID", isPk: true },
          { name: "full_name", type: "VARCHAR(100)", description: "Full driver name" },
          { name: "license_number", type: "VARCHAR(30)", description: "CDL license code" },
          { name: "experience_years", type: "INTEGER", description: "Years in freight" },
          { name: "safety_score", type: "NUMERIC(3,1)", description: "DOT safety compliance rating" },
        ],
      },
      {
        name: "suppliers",
        description: "Component and raw cargo vendors feeding manufacturing networks.",
        columns: [
          { name: "id", type: "INTEGER", description: "Supplier ID", isPk: true },
          { name: "supplier_name", type: "VARCHAR(100)", description: "Enterprise name" },
          { name: "country", type: "VARCHAR(50)", description: "Country of manufacture" },
          { name: "lead_time_days", type: "INTEGER", description: "Average fulfillment transit time" },
          { name: "reliability_score", type: "NUMERIC(3,1)", description: "Supplier on-time score (1-5)" },
        ],
      },
      {
        name: "parts_inventory",
        description: "Raw material and spare part inventory in warehouse bays.",
        columns: [
          { name: "id", type: "INTEGER", description: "Inventory SKU", isPk: true },
          { name: "part_number", type: "VARCHAR(50)", description: "Component part code" },
          { name: "warehouse_id", type: "INTEGER", description: "Holding facility", fkTarget: "warehouses.id" },
          { name: "quantity_in_stock", type: "INTEGER", description: "Units on pallet racks" },
          { name: "unit_cost", type: "NUMERIC(8,2)", description: "Cost per unit" },
        ],
      },
      {
        name: "shipments",
        description: "Freight cargo consignments and transport manifests.",
        columns: [
          { name: "id", type: "INTEGER", description: "Shipment key", isPk: true },
          { name: "warehouse_id", type: "INTEGER", description: "Departure hub", fkTarget: "warehouses.id" },
          { name: "carrier_id", type: "INTEGER", description: "Assigned carrier", fkTarget: "carriers.id" },
          { name: "origin_warehouse", type: "VARCHAR(80)", description: "Origin facility label" },
          { name: "destination_city", type: "VARCHAR(80)", description: "Destination destination" },
          { name: "weight_kg", type: "NUMERIC(8,2)", description: "Freight consignment weight in KG" },
          { name: "status", type: "VARCHAR(30)", description: "in_transit, delivered, delayed, pending" },
        ],
      },
      {
        name: "cargo_packages",
        description: "Individual pallets and high-value cargo crates.",
        columns: [
          { name: "id", type: "INTEGER", description: "Pallet barcode ID", isPk: true },
          { name: "shipment_id", type: "INTEGER", description: "Associated manifest", fkTarget: "shipments.id" },
          { name: "weight_kg", type: "NUMERIC(8,2)", description: "Package weight" },
          { name: "declared_value", type: "NUMERIC(10,2)", description: "Insurance valuation in USD" },
          { name: "is_hazardous", type: "BOOLEAN", description: "HAZMAT classification flag" },
        ],
      },
      {
        name: "freight_routes",
        description: "Standard highway and intermodal transit corridors.",
        columns: [
          { name: "id", type: "INTEGER", description: "Route key", isPk: true },
          { name: "route_name", type: "VARCHAR(100)", description: "Corridor description" },
          { name: "distance_km", type: "INTEGER", description: "Highway distance" },
          { name: "avg_transit_hours", type: "INTEGER", description: "Target transit time" },
          { name: "toll_costs", type: "NUMERIC(8,2)", description: "Highway tolls" },
        ],
      },
      {
        name: "delivery_checkpoints",
        description: "GPS scan events and waypoint arrivals along freight transit corridors.",
        columns: [
          { name: "id", type: "INTEGER", description: "Checkpoint key", isPk: true },
          { name: "shipment_id", type: "INTEGER", description: "Consignment", fkTarget: "shipments.id" },
          { name: "location_name", type: "VARCHAR(80)", description: "Weigh station / hub location" },
          { name: "scanned_at", type: "TIMESTAMP", description: "Scan timestamp" },
          { name: "status", type: "VARCHAR(30)", description: "passed, inspected, customs_hold, released" },
        ],
      },
      {
        name: "fuel_logs",
        description: "Fleet diesel refuel transactions and fuel economy tracking.",
        columns: [
          { name: "id", type: "INTEGER", description: "Fuel ticket key", isPk: true },
          { name: "vehicle_id", type: "INTEGER", description: "Vehicle key", fkTarget: "fleet_vehicles.id" },
          { name: "gallons", type: "NUMERIC(8,2)", description: "Gallons pumped" },
          { name: "price_per_gallon", type: "NUMERIC(5,2)", description: "Fuel rate per gallon" },
          { name: "log_date", type: "DATE", description: "Refuel date" },
        ],
      },
      {
        name: "maintenance_records",
        description: "Scheduled preventive maintenance and breakdown service tickets.",
        columns: [
          { name: "id", type: "INTEGER", description: "Maintenance log key", isPk: true },
          { name: "vehicle_id", type: "INTEGER", description: "Serviced vehicle", fkTarget: "fleet_vehicles.id" },
          { name: "service_type", type: "VARCHAR(50)", description: "Oil_Change, Brake_Overhaul, Tire_Rotation, Transmission" },
          { name: "cost", type: "NUMERIC(10,2)", description: "Repair cost in USD" },
          { name: "service_date", type: "DATE", description: "Maintenance completion date" },
        ],
      },
      {
        name: "customs_declarations",
        description: "Cross-border customs filings and international tariff documentation.",
        columns: [
          { name: "id", type: "INTEGER", description: "Customs declaration ID", isPk: true },
          { name: "shipment_id", type: "INTEGER", description: "Shipment key", fkTarget: "shipments.id" },
          { name: "port_of_entry", type: "VARCHAR(50)", description: "Customs clearance port" },
          { name: "duty_amount", type: "NUMERIC(10,2)", description: "Tariff billed" },
          { name: "status", type: "VARCHAR(30)", description: "cleared, under_inspection, duty_unpaid" },
        ],
      },
      {
        name: "freight_invoices",
        description: "Billed freight statements issued to shippers and logistics clients.",
        columns: [
          { name: "id", type: "INTEGER", description: "Invoice key", isPk: true },
          { name: "shipment_id", type: "INTEGER", description: "Consignment", fkTarget: "shipments.id" },
          { name: "total_billed", type: "NUMERIC(10,2)", description: "Final invoice amount" },
          { name: "payment_status", type: "VARCHAR(20)", description: "paid, pending, overdue" },
          { name: "due_date", type: "DATE", description: "Settlement due date" },
        ],
      },
      {
        name: "incidents",
        description: "Cargo damage, delays, traffic bottlenecks, and cargo loss insurance logs.",
        columns: [
          { name: "id", type: "INTEGER", description: "Incident ID", isPk: true },
          { name: "shipment_id", type: "INTEGER", description: "Shipment key", fkTarget: "shipments.id" },
          { name: "incident_type", type: "VARCHAR(40)", description: "Cargo_Damage, Weather_Delay, Mechanical_Failure, Theft" },
          { name: "claim_cost", type: "NUMERIC(10,2)", description: "Insurance claim liability" },
          { name: "reported_date", type: "DATE", description: "Date reported" },
        ],
      },
    ],
  },

  restaurants: {
    company: {
      name: "Gusto Hospitality Group",
      tagline: "Multi-concept culinary dining venues, bistros & cocktail lounges",
      stageName: "Level 1: Flagship Bistro & Trattoria",
      employeeCount: "350 Culinary & Front-of-House Staff",
      dataHireRole: "Restaurant Operations Analyst",
      story:
        "You are the data specialist for Gusto Hospitality Group! We operate 8 high-end restaurants, artisan pizzerias, and rooftop cocktail venues. Analyze menu item gross margins, peak dining covers, table turn rates, server tips, ingredient spoilage, and supplier purchasing across our 15 restaurant operational tables.",
      welcomeMemo:
        "From: Chef Marco Vieri (Executive Chef & Founder) — A good kitchen runs on passion; a great restaurant group runs on data. Dive into our POS sales, recipes, inventory, and table turnover logs.",
    },
    team: [
      {
        id: "marco-vieri",
        name: "Chef Marco Vieri",
        role: "Executive Chef & Founder",
        department: "Culinary Operations",
        avatarText: "MV",
        avatarBg: "var(--sun)",
        bio: "Tracks food cost percentages, ticket turn times, plate profitability, and signature specials.",
      },
      {
        id: "giulia-conti",
        name: "Giulia Conti",
        role: "Director of Hospitality & Service",
        department: "Front of House",
        avatarText: "GC",
        avatarBg: "var(--sky)",
        bio: "Optimizes reservation turn times, server sales averages, and guest dining ratings.",
      },
    ],
    schema: [
      {
        name: "restaurants",
        description: "Dining locations, bistros, and cocktail lounges in the group.",
        columns: [
          { name: "id", type: "INTEGER", description: "Venue key", isPk: true },
          { name: "name", type: "VARCHAR(80)", description: "Restaurant name" },
          { name: "city", type: "VARCHAR(50)", description: "City" },
          { name: "seating_capacity", type: "INTEGER", description: "Total dining seats" },
          { name: "opened_year", type: "INTEGER", description: "Year established" },
        ],
      },
      {
        name: "dining_sections",
        description: "Dining zones (Main Dining, Patio, Bar, Private Salon, Terrace).",
        columns: [
          { name: "id", type: "INTEGER", description: "Section key", isPk: true },
          { name: "restaurant_id", type: "INTEGER", description: "Venue", fkTarget: "restaurants.id" },
          { name: "section_name", type: "VARCHAR(50)", description: "Dining zone label" },
          { name: "is_outdoor", type: "BOOLEAN", description: "Al fresco outdoor flag" },
        ],
      },
      {
        name: "dining_tables",
        description: "Physical table assignments and seating arrangements.",
        columns: [
          { name: "id", type: "INTEGER", description: "Table ID", isPk: true },
          { name: "restaurant_id", type: "INTEGER", description: "Venue", fkTarget: "restaurants.id" },
          { name: "section_id", type: "INTEGER", description: "Section key", fkTarget: "dining_sections.id" },
          { name: "table_number", type: "INTEGER", description: "Floor table number" },
          { name: "max_seats", type: "INTEGER", description: "Seat capacity" },
        ],
      },
      {
        name: "menu_categories",
        description: "Beverage and dish taxonomies (Appetizer, Entree, Pasta, Dessert, Wine).",
        columns: [
          { name: "id", type: "INTEGER", description: "Category ID", isPk: true },
          { name: "name", type: "VARCHAR(50)", description: "Category label" },
          { name: "is_alcoholic", type: "BOOLEAN", description: "Alcohol compliance flag" },
        ],
      },
      {
        name: "menu_items",
        description: "Dishes, culinary specials, and beverage selections.",
        columns: [
          { name: "id", type: "INTEGER", description: "Menu item key", isPk: true },
          { name: "name", type: "VARCHAR(100)", description: "Dish commercial name" },
          { name: "category", type: "VARCHAR(50)", description: "appetizer, entree, dessert, beverage, pasta" },
          { name: "price", type: "NUMERIC(8,2)", description: "Menu retail price" },
          { name: "cost", type: "NUMERIC(8,2)", description: "Ingredient plate cost" },
        ],
      },
      {
        name: "ingredients",
        description: "Raw pantry items, meats, dairy, produce, and fine wines.",
        columns: [
          { name: "id", type: "INTEGER", description: "Ingredient key", isPk: true },
          { name: "ingredient_name", type: "VARCHAR(80)", description: "Raw ingredient description" },
          { name: "category", type: "VARCHAR(50)", description: "Produce, Dairy, Meat, Seafood, Dry Goods, Wine" },
          { name: "unit_cost", type: "NUMERIC(6,2)", description: "Cost per unit" },
          { name: "current_stock_qty", type: "NUMERIC(8,2)", description: "Pantry stock on hand" },
        ],
      },
      {
        name: "suppliers",
        description: "Farm-to-table organic purveyors, butchers, and distributors.",
        columns: [
          { name: "id", type: "INTEGER", description: "Supplier key", isPk: true },
          { name: "supplier_name", type: "VARCHAR(100)", description: "Vendor name" },
          { name: "category", type: "VARCHAR(50)", description: "Seafood, Wagyu_Beef, Organic_Greens, Bakery, Dairy" },
          { name: "rating", type: "NUMERIC(3,1)", description: "Freshness & reliability score" },
        ],
      },
      {
        name: "ingredient_purchases",
        description: "Wholesale food purchase orders received by kitchen stations.",
        columns: [
          { name: "id", type: "INTEGER", description: "Purchase order ID", isPk: true },
          { name: "supplier_id", type: "INTEGER", description: "Vendor key", fkTarget: "suppliers.id" },
          { name: "restaurant_id", type: "INTEGER", description: "Receiving venue", fkTarget: "restaurants.id" },
          { name: "total_amount", type: "NUMERIC(10,2)", description: "Invoice purchase cost" },
          { name: "purchase_date", type: "DATE", description: "Receiving date" },
        ],
      },
      {
        name: "reservations",
        description: "Guest table bookings and VIP hospitality preferences.",
        columns: [
          { name: "id", type: "INTEGER", description: "Booking key", isPk: true },
          { name: "restaurant_id", type: "INTEGER", description: "Venue", fkTarget: "restaurants.id" },
          { name: "guest_name", type: "VARCHAR(80)", description: "Guest party name" },
          { name: "party_size", type: "INTEGER", description: "Number of covers" },
          { name: "reservation_time", type: "TIMESTAMP", description: "Scheduled booking time" },
          { name: "status", type: "VARCHAR(20)", description: "seated, confirmed, cancelled, no_show" },
        ],
      },
      {
        name: "orders",
        description: "Dining checks and point-of-sale customer tickets.",
        columns: [
          { name: "id", type: "INTEGER", description: "Order ticket key", isPk: true },
          { name: "table_number", type: "INTEGER", description: "Dining table number" },
          { name: "order_time", type: "TIMESTAMP", description: "Ticket timestamp" },
          { name: "total_amount", type: "NUMERIC(8,2)", description: "Total billed check" },
          { name: "server_name", type: "VARCHAR(80)", description: "Attending waitstaff" },
        ],
      },
      {
        name: "order_items",
        description: "Individual dishes and beverages fired on kitchen tickets.",
        columns: [
          { name: "id", type: "INTEGER", description: "Item ticket line", isPk: true },
          { name: "order_id", type: "INTEGER", description: "Check key", fkTarget: "orders.id" },
          { name: "menu_item_id", type: "INTEGER", description: "Ordered dish", fkTarget: "menu_items.id" },
          { name: "quantity", type: "INTEGER", description: "Portions ordered" },
        ],
      },
      {
        name: "staff_members",
        description: "Sous chefs, line cooks, sommeliers, bartenders, and servers.",
        columns: [
          { name: "id", type: "INTEGER", description: "Staff ID", isPk: true },
          { name: "name", type: "VARCHAR(80)", description: "Staff name" },
          { name: "restaurant_id", type: "INTEGER", description: "Home venue", fkTarget: "restaurants.id" },
          { name: "role", type: "VARCHAR(40)", description: "Executive_Chef, Sous_Chef, Server, Bartender, Host" },
          { name: "hourly_rate", type: "NUMERIC(6,2)", description: "Base pay rate" },
        ],
      },
      {
        name: "shifts",
        description: "Staff shift scheduling and clock-in logs.",
        columns: [
          { name: "id", type: "INTEGER", description: "Shift record key", isPk: true },
          { name: "staff_id", type: "INTEGER", description: "Staff member", fkTarget: "staff_members.id" },
          { name: "shift_type", type: "VARCHAR(20)", description: "Lunch, Dinner, Late_Night, Prep" },
          { name: "hours_worked", type: "NUMERIC(4,2)", description: "Total hours logged" },
          { name: "shift_date", type: "DATE", description: "Calendar date" },
        ],
      },
      {
        name: "guest_reviews",
        description: "Diner feedback, Google review ratings, and food critiques.",
        columns: [
          { name: "id", type: "INTEGER", description: "Review ID", isPk: true },
          { name: "restaurant_id", type: "INTEGER", description: "Venue", fkTarget: "restaurants.id" },
          { name: "rating", type: "INTEGER", description: "Score (1 to 5 stars)" },
          { name: "comments", type: "VARCHAR(200)", description: "Guest feedback" },
          { name: "review_date", type: "DATE", description: "Date published" },
        ],
      },
      {
        name: "waste_logs",
        description: "Kitchen prep waste, expired food shrinkage, and damaged inventory.",
        columns: [
          { name: "id", type: "INTEGER", description: "Waste log ID", isPk: true },
          { name: "ingredient_id", type: "INTEGER", description: "Discarded item", fkTarget: "ingredients.id" },
          { name: "quantity_wasted", type: "NUMERIC(6,2)", description: "Weight or count discarded" },
          { name: "reason", type: "VARCHAR(50)", description: "Spoilage, Over_Prep, Burnt, Drop" },
          { name: "log_date", type: "DATE", description: "Incident date" },
        ],
      },
    ],
  },

  saas: {
    company: {
      name: "CloudScale Metrics",
      tagline: "B2B cloud infrastructure, telemetry & developer platform",
      stageName: "Level 1: High-Growth SaaS",
      employeeCount: "120 Engineers, Product & GTM Professionals",
      dataHireRole: "Product & Growth Analyst",
      story:
        "Welcome to CloudScale Metrics! Track recurring subscription revenue (MRR/ARR), customer churn, feature engagement telemetry, cluster usage costs, and developer API limits across our 15 SaaS infrastructure tables.",
      welcomeMemo:
        "From: Samira Khan (CEO & Founder) — We build mission-critical developer tools. Our unit economics, Net Revenue Retention (NRR), churn cohorts, and cloud infrastructure margins drive our quarterly board meetings. Let's dig into the SQL data!",
    },
    team: [
      {
        id: "samira-khan",
        name: "Samira Khan",
        role: "CEO & Founder",
        department: "Executive",
        avatarText: "SK",
        avatarBg: "var(--ocean)",
        bio: "Focuses on Net Revenue Retention (NRR), LTV/CAC ratios, churn cohorts, and investor financial reports.",
      },
      {
        id: "tariq-mansoor",
        name: "Tariq Mansoor",
        role: "VP of Engineering & Cloud Ops",
        department: "Infrastructure",
        avatarText: "TM",
        avatarBg: "var(--sun)",
        bio: "Monitors API latency, cloud cluster hosting costs, error rates, and tenant usage quotas.",
      },
    ],
    schema: [
      {
        name: "accounts",
        description: "Registered B2B client organizations and enterprise tenants.",
        columns: [
          { name: "id", type: "INTEGER", description: "Tenant account ID", isPk: true },
          { name: "company_name", type: "VARCHAR(100)", description: "Client company name" },
          { name: "industry", type: "VARCHAR(60)", description: "Client industry (Fintech, Healthtech, DevTools)" },
          { name: "tier", type: "VARCHAR(30)", description: "starter, growth, enterprise" },
          { name: "created_at", type: "DATE", description: "Account creation date" },
        ],
      },
      {
        name: "pricing_plans",
        description: "SaaS packaging tiers, feature gates, and subscription prices.",
        columns: [
          { name: "id", type: "INTEGER", description: "Plan key", isPk: true },
          { name: "plan_name", type: "VARCHAR(40)", description: "starter, professional, enterprise" },
          { name: "monthly_price", type: "NUMERIC(8,2)", description: "Monthly list price in USD" },
          { name: "included_api_calls", type: "INTEGER", description: "Monthly API call quota" },
        ],
      },
      {
        name: "subscriptions",
        description: "Active recurring subscription contracts and monthly billing.",
        columns: [
          { name: "id", type: "INTEGER", description: "Subscription key", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Tenant key", fkTarget: "accounts.id" },
          { name: "plan", type: "VARCHAR(30)", description: "starter, professional, enterprise" },
          { name: "mrr", type: "NUMERIC(10,2)", description: "Monthly recurring revenue in USD" },
          { name: "status", type: "VARCHAR(20)", description: "active, past_due, cancelled, trialing" },
          { name: "started_at", type: "DATE", description: "Contract inception date" },
        ],
      },
      {
        name: "invoices",
        description: "Automated recurring credit card statements and invoices.",
        columns: [
          { name: "id", type: "INTEGER", description: "Invoice ID", isPk: true },
          { name: "subscription_id", type: "INTEGER", description: "Contract", fkTarget: "subscriptions.id" },
          { name: "account_id", type: "INTEGER", description: "Tenant key", fkTarget: "accounts.id" },
          { name: "amount", type: "NUMERIC(10,2)", description: "Billed invoice charge" },
          { name: "is_paid", type: "BOOLEAN", description: "Settlement indicator" },
          { name: "invoice_date", type: "DATE", description: "Billing statement date" },
        ],
      },
      {
        name: "users",
        description: "Individual developer and workspace team members.",
        columns: [
          { name: "id", type: "INTEGER", description: "User key", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Organization", fkTarget: "accounts.id" },
          { name: "full_name", type: "VARCHAR(80)", description: "User name" },
          { name: "email", type: "VARCHAR(100)", description: "Work email" },
          { name: "role", type: "VARCHAR(30)", description: "Owner, Admin, Developer, Viewer" },
        ],
      },
      {
        name: "api_keys",
        description: "Programmatic API tokens generated for cloud authentication.",
        columns: [
          { name: "id", type: "INTEGER", description: "API key token ID", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Tenant key", fkTarget: "accounts.id" },
          { name: "key_name", type: "VARCHAR(60)", description: "Token label (e.g. Production_Ingest)" },
          { name: "is_revoked", type: "BOOLEAN", description: "Revocation status" },
          { name: "created_at", type: "DATE", description: "Date generated" },
        ],
      },
      {
        name: "feature_usage",
        description: "Product feature events logged per tenant organization.",
        columns: [
          { name: "id", type: "INTEGER", description: "Usage event key", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Tenant key", fkTarget: "accounts.id" },
          { name: "feature_name", type: "VARCHAR(80)", description: "api_calls, webhook_delivery, audit_export, custom_dashboard" },
          { name: "monthly_events", type: "INTEGER", description: "Event volume recorded in period" },
        ],
      },
      {
        name: "cloud_clusters",
        description: "Dedicated and multi-tenant Kubernetes worker clusters.",
        columns: [
          { name: "id", type: "INTEGER", description: "Cluster key", isPk: true },
          { name: "cluster_name", type: "VARCHAR(80)", description: "Node pool name" },
          { name: "cloud_provider", type: "VARCHAR(30)", description: "AWS, GCP, Azure" },
          { name: "region", type: "VARCHAR(40)", description: "us-east-1, eu-central-1, us-west-2" },
          { name: "monthly_cost_usd", type: "NUMERIC(10,2)", description: "Cloud provider infrastructure bill" },
        ],
      },
      {
        name: "support_tickets",
        description: "Customer developer support tickets, SLA alerts, and bug reports.",
        columns: [
          { name: "id", type: "INTEGER", description: "Ticket key", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Tenant key", fkTarget: "accounts.id" },
          { name: "priority", type: "VARCHAR(20)", description: "P1_Urgent, P2_High, P3_Normal, P4_Low" },
          { name: "status", type: "VARCHAR(20)", description: "open, pending_user, resolved, closed" },
          { name: "resolution_hours", type: "INTEGER", description: "Time to resolution" },
        ],
      },
      {
        name: "churn_events",
        description: "Customer cancellation feedback and churned revenue log.",
        columns: [
          { name: "id", type: "INTEGER", description: "Churn ID", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Lost tenant", fkTarget: "accounts.id" },
          { name: "churn_date", type: "DATE", description: "Date subscription cancelled" },
          { name: "arr_lost", type: "NUMERIC(10,2)", description: "Annual recurring revenue lost" },
          { name: "reason", type: "VARCHAR(80)", description: "Price, Missing_Feature, Switched_Competitor, Inactive" },
        ],
      },
      {
        name: "integrations",
        description: "Third-party connector configurations (GitHub, Slack, Datadog, Snowflake).",
        columns: [
          { name: "id", type: "INTEGER", description: "Integration key", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Tenant", fkTarget: "accounts.id" },
          { name: "provider", type: "VARCHAR(50)", description: "Slack, GitHub, Datadog, Snowflake, Jira" },
          { name: "is_active", type: "BOOLEAN", description: "Active sync status" },
        ],
      },
      {
        name: "audit_events",
        description: "Security audit logs of tenant role modifications and security tokens.",
        columns: [
          { name: "id", type: "INTEGER", description: "Audit key", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Tenant", fkTarget: "accounts.id" },
          { name: "action", type: "VARCHAR(50)", description: "API_KEY_GENERATED, USER_INVITED, ROLE_CHANGED, MFA_ENFORCED" },
          { name: "timestamp", type: "TIMESTAMP", description: "Time executed" },
        ],
      },
      {
        name: "nps_surveys",
        description: "Net Promoter Score satisfaction surveys from workspace administrators.",
        columns: [
          { name: "id", type: "INTEGER", description: "Survey key", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Tenant", fkTarget: "accounts.id" },
          { name: "score", type: "INTEGER", description: "Rating score (0 to 10)" },
          { name: "survey_date", type: "DATE", description: "Submission date" },
        ],
      },
      {
        name: "feature_flags",
        description: "Enterprise beta feature toggles and progressive rollout flags.",
        columns: [
          { name: "id", type: "INTEGER", description: "Flag key", isPk: true },
          { name: "flag_key", type: "VARCHAR(60)", description: "Toggle identifier (e.g. ai_insights, streaming_v2)" },
          { name: "min_tier", type: "VARCHAR(30)", description: "starter, growth, enterprise" },
          { name: "is_enabled", type: "BOOLEAN", description: "Global activation flag" },
        ],
      },
      {
        name: "usage_alerts",
        description: "Automated quota notifications when API limit thresholds exceed 80%.",
        columns: [
          { name: "id", type: "INTEGER", description: "Alert key", isPk: true },
          { name: "account_id", type: "INTEGER", description: "Tenant", fkTarget: "accounts.id" },
          { name: "pct_consumed", type: "INTEGER", description: "Percentage quota consumed (e.g. 85%)" },
          { name: "alert_date", type: "DATE", description: "Date sent" },
        ],
      },
    ],
  },
};

const DOMAIN_LEVEL_STAGES: Record<string, Record<number, {
  stageName: string;
  employeeCount: string;
  dataHireRole: string;
  story: string;
  welcomeMemo: string;
}>> = {
  ecommerce: {
    1: {
      stageName: "Stage 1: Seed / Early-Stage Operations",
      employeeCount: "14 Team Members",
      dataHireRole: "Solo Data Generalist (#1 Data Hire)",
      story: "You have just joined OmniCart Direct as our very first dedicated data professional! Up until today, our founders and operations team were making decisions using chaotic shared spreadsheets. We've just migrated our core operational database to PostgreSQL, and leadership needs accurate SQL answers immediately.",
      welcomeMemo: "From: Alex Rivera (CEO) — Welcome to OmniCart! Everyone is eager to ask you questions. Take a look at your Inbox, review our database schema, and let's get building!",
    },
    2: {
      stageName: "Stage 2: Regional Scaling & Review Feedback",
      employeeCount: "85 Team Members",
      dataHireRole: "Growth & Customer Retention Analyst",
      story: "OmniCart has scaled rapidly across multiple regions! With thousands of daily orders, promotional coupons, customer reviews, and carrier shipments in flight, leadership needs aggregated metrics, cohort analysis, and promotional performance data.",
      welcomeMemo: "From: Rachel Green (VP of Sales) — Fantastic work on our core tables! We've just added reviews, shipments, and coupon tracking. Let's analyze customer loyalty and discount velocity.",
    },
    3: {
      stageName: "Stage 3: National Fulfillment & Multi-Warehouse Supply Chain",
      employeeCount: "350 Team Members",
      dataHireRole: "Supply Chain & Procurement Analytics Lead",
      story: "We've opened 4 major fulfillment depots across the country and integrated dozens of primary product suppliers! Management relies on your multi-table joins to monitor warehouse stock levels, supplier lead times, and fulfillment turnaround.",
      welcomeMemo: "From: Liam Vance (Fulfillment Director) — We've unlocked inventory, warehouses, and supplier tables. We need cross-table joins to ensure our regional hubs stay fully stocked.",
    },
    4: {
      stageName: "Stage 4: Omnichannel Brand Expansion & Reverse Logistics",
      employeeCount: "1,100 Team Members",
      dataHireRole: "Staff Analytics Architect & Operations Lead",
      story: "With premium brand partnerships and national scale, our returns department and product tier governance require high-level analytics. You write analytical window functions and CTEs to manage return rates, product margin ranks, and carrier SLA compliance.",
      welcomeMemo: "From: Alex Rivera (CEO) — As we scale toward an enterprise footprint, our brand tiering and returns data are critical to sustaining gross margins. Dive into the advanced queries!",
    },
    5: {
      stageName: "Stage 5: Global E-Commerce Marketplace & ML Data Warehouse",
      employeeCount: "4,200 Global Employees",
      dataHireRole: "Principal Data Scientist / Head of Enterprise Intelligence",
      story: "OmniCart is now a market-leading enterprise marketplace! You govern our complete 15-table data warehouse, running predictive customer churn analysis, support ticket sentiment benchmarks, recursive inventory rebalancing, and board-level reporting.",
      welcomeMemo: "From: Executive Board — Congratulations on reaching the top tier of our data organization. You now have full enterprise access to all 15 operational and customer support tables.",
    },
  },
  restaurants: {
    1: {
      stageName: "Stage 1: Flagship Bistro Launch (The Startup)",
      employeeCount: "25 Culinary & Dining Staff",
      dataHireRole: "Solo Restaurant Operations Analyst",
      story: "You have joined Gusto Hospitality Group at our initial flagship venue! The founders are transitioning from paper order tickets and spreadsheets to our first PostgreSQL operational database. You are responsible for answering fundamental operational questions about our dining rooms, menu pricing, table configurations, and daily customer tickets.",
      welcomeMemo: "From: Chef Marco Vieri (Founder) — A good kitchen runs on passion; a great restaurant group runs on data. Start by exploring our dining tables, menu pricing, and customer checks.",
    },
    2: {
      stageName: "Stage 2: Regional Venue Expansion & VIP Hospitality",
      employeeCount: "120 Culinary & Service Staff",
      dataHireRole: "Hospitality & Revenue Analyst",
      story: "Gusto has expanded from a single flagship to 4 bustling metropolitan bistros! With multi-course orders, VIP reservations, and diner reviews flooding in, leadership needs queries analyzing check sizes, reservation turnover, and guest feedback.",
      welcomeMemo: "From: Giulia Conti (Director of Hospitality) — Welcome to Stage 2! We've introduced reservations, order items, and guest reviews. Help us identify our most popular dishes and highest-rated dining experiences.",
    },
    3: {
      stageName: "Stage 3: Farm-to-Table Supply Chain & Central Commissary",
      employeeCount: "380 Staff across 8 Metropolitan Venues",
      dataHireRole: "Procurement & Cost Analytics Lead",
      story: "Gusto now runs an integrated supply chain sourcing organic produce, prime wagyu, and fine wines directly from regional suppliers. Leadership relies on you to join purchase orders, supplier reliability ratings, and recipe costs to optimize food margins.",
      welcomeMemo: "From: Elena Rossi (Beverage & Cellar Director) — We've unlocked ingredients, suppliers, and ingredient purchases. Join these with our menu items to uncover plate profitability and supplier pricing trends.",
    },
    4: {
      stageName: "Stage 4: Multi-Unit Labor Optimization & Shift Intelligence",
      employeeCount: "850 Hospitality Professionals",
      dataHireRole: "Workforce & Labor Analytics Architect",
      story: "Labor is the largest operating expense in hospitality. With over 800 culinary and floor staff, leadership needs cross-table analytics on hourly wages, overtime shifts, peak-hour coverage, and server sales performance using window functions and CTEs.",
      welcomeMemo: "From: Chef Marco Vieri (Founder) — Managing kitchen shifts and floor coverage across 8 venues requires precision. Let's analyze shift hours and labor costs against peak sales windows.",
    },
    5: {
      stageName: "Stage 5: Enterprise Hospitality Empire & Zero-Waste Sustainability",
      employeeCount: "2,100 Staff across 30 Venues",
      dataHireRole: "Principal Data Architect / Head of Business Intelligence",
      story: "As a premier hospitality empire with 30 nationwide venues, Gusto leverages advanced enterprise analytics. You oversee our complete 15-table data warehouse — analyzing kitchen prep spoilage, multi-venue margin variance, seasonal menu modeling, and executive board metrics.",
      welcomeMemo: "From: Gusto Executive Board — You've reached Master level! You now have unrestricted access to all 15 operational tables including waste logs, labor shifts, and full supply chain telemetry.",
    },
  },
  healthcare: {
    1: {
      stageName: "Stage 1: Outpatient Community Clinic",
      employeeCount: "35 Clinical Staff",
      dataHireRole: "Junior Clinical Data Analyst",
      story: "You have joined Horizon Health Clinic as our foundational data analyst. We have digitized our clinic records into PostgreSQL, and clinical leadership needs rapid answers regarding physician schedules, patient demographics, and department ward allocations.",
      welcomeMemo: "From: Dr. Evelyn Reed (CMO) — Welcome to Horizon Health! Our patient care depends on accurate data. Review our doctors, patients, rooms, and appointment registers.",
    },
    2: {
      stageName: "Stage 2: Specialty Surgical Center & Regional Care",
      employeeCount: "180 Medical Professionals",
      dataHireRole: "Healthcare Operations & Revenue Analyst",
      story: "Horizon has expanded into a full specialty surgical center! With new diagnostic coding, prescription tracking, and billing claims, the revenue cycle team needs aggregate queries on treatment charges, insurance coverage ratios, and clinical diagnoses.",
      welcomeMemo: "From: Jordan Chen (Director of Billing) — We have unlocked diagnoses, prescriptions, and billing tables. Help us analyze outstanding patient copays and prescription volume.",
    },
    3: {
      stageName: "Stage 3: Multi-Pavilion Hospital & Diagnostic Laboratories",
      employeeCount: "650 Physicians, Nurses & Lab Techs",
      dataHireRole: "Senior Health Informatics Engineer",
      story: "Horizon is now a comprehensive regional hospital with on-site pathology and diagnostic laboratories. Clinical leadership needs multi-table joins linking lab results, insurance carrier claims, and diagnostic test profiles.",
      welcomeMemo: "From: Dr. Sarah Patel (Head of Surgery) — Diagnostic lab tests and insurance claim approvals are now live. Connect lab results with patient records to pinpoint critical diagnostic trends.",
    },
    4: {
      stageName: "Stage 4: Academic Medical Center & Inpatient Network",
      employeeCount: "1,800 Healthcare Workers",
      dataHireRole: "Clinical Intelligence & Compliance Architect",
      story: "As an academic hospital handling emergency admissions and intensive care, leadership relies on your window functions and CTEs to rank inpatient stays, analyze bed turnover turnaround, and track high-cost medication dispensing.",
      welcomeMemo: "From: Marcus Thorne (Chief Nursing Officer) — Inpatient admissions and high-cost medications are unlocked. Use analytical queries to optimize bed occupancy and medication protocols.",
    },
    5: {
      stageName: "Stage 5: Integrated Health System & Predictive Medicine",
      employeeCount: "5,500 Medical Staff",
      dataHireRole: "Chief Health Informatics Scientist",
      story: "Horizon Health is now an integrated statewide hospital network! You oversee our complete 15-table clinical data warehouse, executing complex procedure cost comparisons, readmission risk modeling, and federal compliance audits.",
      welcomeMemo: "From: Horizon Health Board — You have attained Chief Data Architect status with complete clearance across all 15 clinical, inpatient, laboratory, and surgical procedure ledgers.",
    },
  },
  finance: {
    1: {
      stageName: "Stage 1: Community Credit Union & Regional Branch",
      employeeCount: "30 Financial Officers",
      dataHireRole: "Junior Ledger & Branch Analyst",
      story: "You have joined Apex Trust Financial at our foundational regional branch! We have migrated our retail banking core to PostgreSQL, and bank leadership needs queries on customer account balances, card issuances, and transaction ledgers.",
      welcomeMemo: "From: Victor Vance (Head of Risk) — Welcome to Apex Trust. Maintaining ledger integrity is our highest obligation. Start by analyzing customer accounts, branch locations, and transactions.",
    },
    2: {
      stageName: "Stage 2: Commercial Retail Banking & Consumer Credit",
      employeeCount: "150 Banking Associates",
      dataHireRole: "Credit Risk & Portfolio Analyst",
      story: "Apex Trust has expanded into consumer lending and credit card issuing! With card swipes, personal loans, and credit lines active, risk officers need aggregate metrics on average loan balances, credit line utilization, and merchant payment velocity.",
      welcomeMemo: "From: Elena Rostova (VP of Lending) — We've unlocked card swipes, loans, and credit lines. Let's analyze borrower interest brackets and credit card payment trends.",
    },
    3: {
      stageName: "Stage 3: Commercial Lending, Fraud Shield & Wealth Management",
      employeeCount: "520 Wealth & Risk Analysts",
      dataHireRole: "Senior Risk & Quantitative Analytics Engineer",
      story: "We have established institutional wealth management portfolios and real-time fraud monitoring. Leadership relies on your multi-table joins to cross-reference loan repayments, fraud alert severity scores, and investment assets under management.",
      welcomeMemo: "From: Arthur Pendleton (Chief Wealth Advisor) — Investments, fraud alerts, and loan payment ledgers are now active. Help us identify high-yield portfolios and suspicious transaction clusters.",
    },
    4: {
      stageName: "Stage 4: Institutional Treasury & High-Volume Teller Clearing",
      employeeCount: "1,600 Financial Professionals",
      dataHireRole: "Lead Financial Data Architect",
      story: "Apex Trust now handles institutional treasury operations and commercial cash clearing. You employ window functions and CTEs to reconcile teller drawer cash limits, calculate running account balances, and evaluate fee structures across account types.",
      welcomeMemo: "From: Victor Vance (Head of Risk) — Daily teller session balancing and tiered account fee structures are unlocked. Build running ledger reconciliations and balance rankings.",
    },
    5: {
      stageName: "Stage 5: Tier-1 Global Financial Institution & Regulatory Audit",
      employeeCount: "6,000 Global Employees",
      dataHireRole: "Principal Quantitative Strategist",
      story: "As a tier-1 multinational financial institution, Apex Trust operates under strict central bank regulatory oversight. You govern our complete 15-table core banking warehouse, building compliance audit trails, liquidity stress tests, and automated capital reserve modeling.",
      welcomeMemo: "From: Bank Executive Committee — You have unlocked full institutional access to all 15 financial ledgers including forensic audit logs, investment portfolios, and fraud detection feeds.",
    },
  },
  hr: {
    1: {
      stageName: "Stage 1: Startup People Operations",
      employeeCount: "45 Employees",
      dataHireRole: "People Analytics Coordinator",
      story: "You have joined NextWave Technologies as our initial People Data Analyst. As our team grows, people leadership needs accurate queries on headcount by department, job role salary bands, office locations, attendance patterns, and PTO leave requests.",
      welcomeMemo: "From: Maya Thorne (VP of People) — Welcome to NextWave! A great workplace is built on transparency and equity. Explore our employee directory, job roles, and attendance records.",
    },
    2: {
      stageName: "Stage 2: Scale-Up Performance Benchmarks & Total Rewards",
      employeeCount: "220 Employees",
      dataHireRole: "Compensation & Talent Analyst",
      story: "NextWave is scaling into a mid-sized technology powerhouse! With annual performance reviews, salary revision histories, and healthcare benefits packages active, leadership needs aggregate summaries of average review scores, bonus distributions, and benefit costs.",
      welcomeMemo: "From: Alicia Gomez (Head of Compensation) — Performance reviews, salary history, and benefits packages are live. Help us audit our compensation brackets and rating distributions.",
    },
    3: {
      stageName: "Stage 3: Multi-Office Talent Development & Benefit Architecture",
      employeeCount: "750 Employees across 5 Hubs",
      dataHireRole: "Senior People Intelligence Engineer",
      story: "With distributed engineering hubs across the globe, we have launched professional development academies. You construct multi-table joins linking employee course completions, benefit enrollments, and career advancement milestones.",
      welcomeMemo: "From: David Kim (Director of Talent) — Employee benefit enrollments and training academy courses are unlocked. Analyze employee upskilling progress against department performance.",
    },
    4: {
      stageName: "Stage 4: Global Recruitment Pipeline & Candidate Velocity",
      employeeCount: "2,200 Global Employees",
      dataHireRole: "Workforce Strategy Architect",
      story: "We are hiring hundreds of engineers and sales professionals each quarter. Using CTEs and window functions, you rank candidate interview scores, analyze hiring pipeline velocity across open roles, and calculate salary percentiles.",
      welcomeMemo: "From: David Kim (Director of Talent) — Job openings and candidate pipeline tables are unlocked. Help us rank top-scoring candidates and calculate time-to-hire across departments.",
    },
    5: {
      stageName: "Stage 5: Enterprise Organization Science & Executive Mobility",
      employeeCount: "8,000 Global Staff",
      dataHireRole: "Head of People Analytics & Organizational Science",
      story: "As a global enterprise, NextWave leads the industry in people analytics. You govern our complete 15-table HR warehouse, executing promotion velocity models, executive succession pipelines, retention risk scores, and executive diversity indices.",
      welcomeMemo: "From: NextWave Executive Leadership — Full enterprise clearance granted. You have complete visibility across all 15 workforce tables including promotion histories, executive recruiting, and global compensation models.",
    },
  },
  logistics: {
    1: {
      stageName: "Stage 1: Local Terminal Fleet & Drayage Carrier",
      employeeCount: "28 Drivers & Dispatchers",
      dataHireRole: "Fleet Logistics Coordinator",
      story: "You have joined SwiftRoute Global at our primary Midwest freight hub! We've deployed PostgreSQL to orchestrate our logistics operations, and dispatch needs queries on warehouse capacity, fleet vehicle payloads, driver safety ratings, and active shipments.",
      welcomeMemo: "From: Dave Miller (VP of Fleet Ops) — Welcome to SwiftRoute! Trucks need to roll and freight needs to move on time. Start by querying our warehouses, carriers, vehicles, and shipments.",
    },
    2: {
      stageName: "Stage 2: Multi-State Freight Corridors & Checkpoint Telemetry",
      employeeCount: "140 Logistics Specialists",
      dataHireRole: "Freight Routing & Carrier Analyst",
      story: "SwiftRoute now runs daily routes across interstate transit corridors! With cargo packages, transit checkpoints, and designated freight highways active, operations needs aggregated metrics on average package weights, checkpoint transit times, and highway toll expenses.",
      welcomeMemo: "From: Frank Miller (Terminal Manager) — Checkpoints, cargo packages, and freight routes are unlocked. Let's analyze corridor transit delays and package weight distributions.",
    },
    3: {
      stageName: "Stage 3: National Intermodal Freight & Maintenance Engineering",
      employeeCount: "600 Fleet Personnel",
      dataHireRole: "Senior Supply Chain & Fleet Engineer",
      story: "Our national fleet now includes hundreds of semi-trucks, reefers, and flatbeds. Management relies on your multi-table joins to monitor vehicle maintenance schedules, diesel fuel efficiency, and warehouse spare parts inventory.",
      welcomeMemo: "From: Claire Sullivan (Director of Supply Chain) — We've unlocked parts inventory, fuel logs, and maintenance records. Join fleet vehicles with repair costs to uncover maintenance bottlenecks.",
    },
    4: {
      stageName: "Stage 4: Cross-Border Customs & Port Intermodal Superhubs",
      employeeCount: "1,900 Transport Professionals",
      dataHireRole: "Lead Logistics Intelligence Architect",
      story: "SwiftRoute is managing international port shipments and ocean/air freight forwarding. Using window functions and CTEs, you rank carrier invoice totals, calculate running shipment weight per route, and audit customs import duty assessments.",
      welcomeMemo: "From: Dave Miller (VP of Fleet Ops) — International customs declarations and freight invoices are live. Build analytical CTEs to benchmark carrier on-time billing and duty clearances.",
    },
    5: {
      stageName: "Stage 5: Global Supply Chain Autonomous Orchestration",
      employeeCount: "7,500 Global Operations Staff",
      dataHireRole: "Principal Transportation Data Scientist",
      story: "SwiftRoute is now an international logistics powerhouse managing global intermodal trade. You oversee our complete 15-table freight data warehouse, analyzing incident insurance liability claims, route optimization models, autonomous fleet telematics, and executive supply chain KPIs.",
      welcomeMemo: "From: SwiftRoute Board of Directors — Full global logistics clearance unlocked! You have complete analytical access across all 15 warehouse, fleet, customs, and incident response ledgers.",
    },
  },
  saas: {
    1: {
      stageName: "Stage 1: Early-Stage Cloud B2B Startup",
      employeeCount: "18 Team Members",
      dataHireRole: "Founding Analytics Engineer (#1 Data Hire)",
      story: "You have joined CloudPulse AI as our foundational data hire! We've launched our developer cloud platform, and leadership needs queries on client accounts, pricing tier distributions, monthly recurring revenue (MRR), and API access key issuances.",
      welcomeMemo: "From: Samira Khan (CEO) — Welcome to CloudPulse! We're building the future of cloud infrastructure. Explore our accounts, pricing plans, subscriptions, and active users.",
    },
    2: {
      stageName: "Stage 2: Series A Multi-Cluster Scale & Support Operations",
      employeeCount: "80 Cloud & Product Specialists",
      dataHireRole: "Product Analytics & Usage Specialist",
      story: "CloudPulse has closed Series A funding! With multi-cloud Kubernetes clusters running across AWS and GCP, customer feature usage logging, and support tickets filing in, leadership needs aggregate metrics on API usage volume and cloud hosting infrastructure costs.",
      welcomeMemo: "From: Tariq Mansoor (VP of Engineering) — Feature usage, cloud clusters, and support tickets are unlocked. Help us track compute spend per cluster and identify high-volume accounts.",
    },
    3: {
      stageName: "Stage 3: Series B Enterprise Integrations & Churn Diagnostics",
      employeeCount: "260 Software & Cloud Engineers",
      dataHireRole: "Senior Data Platform Engineer",
      story: "We have launched enterprise integrations with Datadog, Snowflake, and Slack. Leadership relies on your multi-table joins to analyze account churn root causes, security audit logs, and third-party integration adoption.",
      welcomeMemo: "From: Chloe Vance (Head of Product Analytics) — Integrations, audit events, and churn logs are live. Join account subscriptions with churn reasons to pinpoint retention drivers.",
    },
    4: {
      stageName: "Stage 4: Pre-IPO High-Concurrency Infrastructure & Feature Rollouts",
      employeeCount: "950 Global Technologists",
      dataHireRole: "Staff Telemetry & Data Architect",
      story: "Preparing for our public market debut, CloudPulse manages millions of API calls per second. You employ window functions and CTEs to analyze NPS customer sentiment percentiles, feature flag rollout cohorts, and enterprise contract MRR rankings.",
      welcomeMemo: "From: Samira Khan (CEO) — Feature flags and customer NPS survey scores are unlocked. Use analytical window functions to benchmark customer satisfaction across pricing tiers.",
    },
    5: {
      stageName: "Stage 5: Public Cloud Enterprise & Real-Time Predictive AI",
      employeeCount: "3,800 Global Engineers",
      dataHireRole: "Head of Enterprise Data & AI Platforms",
      story: "CloudPulse is now a publicly traded cloud titan! You govern our complete 15-table cloud intelligence warehouse, orchestrating quota consumption alerts, predictive churn prevention models, global cluster arbitrage, and board-level ARR telemetry.",
      welcomeMemo: "From: CloudPulse Executive Board — Full enterprise platform access granted. You now have unrestricted visibility into all 15 operational, telemetry, billing, and cloud infrastructure ledgers.",
    },
  },
};

export function getDomainOfficeMetadata(
  domainSlug: string,
  levelParam: number | string = 1
): DomainOfficeData {
  const norm = domainSlug.toLowerCase();
  const base = ALL_DOMAINS_OFFICE_METADATA[norm] || ALL_DOMAINS_OFFICE_METADATA.ecommerce;
  
  const rawLvl = typeof levelParam === "string" 
    ? parseInt(levelParam.replace(/^level-/, ""), 10) || 1 
    : levelParam || 1;
  const level = Math.max(1, Math.min(5, rawLvl));

  // Always provide the complete domain schema (all 15 tables and all columns)
  // so learners can find and query any table/column required by workplace questions.
  const completeSchema = base.schema;

  // Resolve progressive company stage profile
  const stageInfo = DOMAIN_LEVEL_STAGES[norm]?.[level] || DOMAIN_LEVEL_STAGES.ecommerce[level];
  const dynamicCompany = {
    ...base.company,
    stageName: stageInfo.stageName,
    employeeCount: stageInfo.employeeCount,
    dataHireRole: stageInfo.dataHireRole,
    story: stageInfo.story,
    welcomeMemo: stageInfo.welcomeMemo,
  };

  return {
    company: dynamicCompany,
    team: base.team,
    schema: completeSchema,
  };
}
