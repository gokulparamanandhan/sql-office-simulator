export interface OfficeCompanyProfile {
  name: string;
  tagline: string;
  stageName: string;
  employeeCount: string;
  dataHireRole: string;
  story: string;
  welcomeMemo: string;
}

export interface StakeholderMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatarText: string;
  avatarBg: string;
  bio: string;
}

export interface SchemaTableColumn {
  name: string;
  type: string;
  description: string;
  isPk?: boolean;
  fkTarget?: string;
}

export interface SchemaTableDefinition {
  name: string;
  description: string;
  columns: SchemaTableColumn[];
}

export const ECOM_L1_OFFICE_METADATA = {
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
  } as OfficeCompanyProfile,

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
      avatarBg: "var(--sun)",
      bio: "Oversees warehouse logistics, delivery timeliness, order status tracking, and fulfillment bottlenecks.",
    },
    {
      id: "marcus-bell",
      name: "Marcus Bell",
      role: "Head of Customer Support",
      department: "Customer Experience",
      avatarText: "MB",
      avatarBg: "var(--mist)",
      bio: "Passionate about regional customer distribution, return rates, and support ticket origins.",
    },
    {
      id: "priya-nair",
      name: "Priya Nair",
      role: "Finance & Accounting Lead",
      department: "Finance",
      avatarText: "PN",
      avatarBg: "var(--sky)",
      bio: "Tracks category margins, shipping cost variances, refunds, and daily cash collection.",
    },
    {
      id: "sarah-jenkins",
      name: "Sarah Jenkins",
      role: "VP of Marketing",
      department: "Growth",
      avatarText: "SJ",
      avatarBg: "var(--ocean)",
      bio: "Drives email retention campaigns, average order values, and marketing channel attribution.",
    },
    {
      id: "daniel-craig",
      name: "Daniel Craig",
      role: "Growth Analyst",
      department: "Growth",
      avatarText: "DC",
      avatarBg: "var(--sun)",
      bio: "Analyzes signup cohorts, non-purchasing accounts, and reactivation opportunities.",
    },
    {
      id: "chloe-bennett",
      name: "Chloe Bennett",
      role: "VP Customer Success",
      department: "Customer Experience",
      avatarText: "CB",
      avatarBg: "var(--mist)",
      bio: "Tracks loyal accounts, repeat customer frequency, and VIP loyalty programs.",
    },
    {
      id: "tony-stark",
      name: "Tony Stark",
      role: "Warehouse Supervisor",
      department: "Operations",
      avatarText: "TS",
      avatarBg: "var(--ocean)",
      bio: "Manages shelf stock levels, supplier replenishment orders, and low-inventory warnings.",
    },
  ] as StakeholderMember[],

  schema: [
    {
      name: "departments",
      description: "Company organizational divisions and department heads",
      columns: [
        { name: "id", type: "INT", description: "Primary Key", isPk: true },
        { name: "name", type: "VARCHAR(100)", description: "Department title (Executive, Operations, etc.)" },
        { name: "head_name", type: "VARCHAR(100)", description: "Full name of the department head" },
      ],
    },
    {
      name: "categories",
      description: "Product catalog classifications",
      columns: [
        { name: "id", type: "INT", description: "Primary Key", isPk: true },
        { name: "name", type: "VARCHAR(100)", description: "Category name (Electronics, Apparel, etc.)" },
        { name: "department_id", type: "INT", description: "FK to departments.id", fkTarget: "departments.id" },
      ],
    },
    {
      name: "products",
      description: "Items available for sale in the OmniCart catalog",
      columns: [
        { name: "id", type: "INT", description: "Primary Key", isPk: true },
        { name: "name", type: "VARCHAR(150)", description: "Full product title" },
        { name: "category_id", type: "INT", description: "FK to categories.id", fkTarget: "categories.id" },
        { name: "price", type: "NUMERIC(10,2)", description: "Retail selling price" },
        { name: "cost", type: "NUMERIC(10,2)", description: "Wholesale acquisition cost" },
        { name: "stock_quantity", type: "INT", description: "Units physically remaining in warehouse" },
      ],
    },
    {
      name: "customers",
      description: "Registered shopper accounts",
      columns: [
        { name: "id", type: "INT", description: "Primary Key", isPk: true },
        { name: "first_name", type: "VARCHAR(50)", description: "Customer first name" },
        { name: "last_name", type: "VARCHAR(50)", description: "Customer family name" },
        { name: "email", type: "VARCHAR(150)", description: "Unique contact email address" },
        { name: "region", type: "VARCHAR(50)", description: "Territory: North, South, East, West, Central" },
        { name: "created_at", type: "TIMESTAMP", description: "Account creation date" },
      ],
    },
    {
      name: "orders",
      description: "Customer purchasing transactions",
      columns: [
        { name: "id", type: "INT", description: "Primary Key", isPk: true },
        { name: "customer_id", type: "INT", description: "FK to customers.id", fkTarget: "customers.id" },
        { name: "status", type: "VARCHAR(30)", description: "delivered, completed, cancelled, returned, pending" },
        { name: "total_amount", type: "NUMERIC(10,2)", description: "Gross transaction total including shipping" },
        { name: "shipping_fee", type: "NUMERIC(10,2)", description: "Charged freight cost" },
        { name: "order_date", type: "TIMESTAMP", description: "Order placement timestamp" },
      ],
    },
    {
      name: "order_items",
      description: "Line-item breakdown of individual products inside an order",
      columns: [
        { name: "id", type: "INT", description: "Primary Key", isPk: true },
        { name: "order_id", type: "INT", description: "FK to orders.id", fkTarget: "orders.id" },
        { name: "product_id", type: "INT", description: "FK to products.id", fkTarget: "products.id" },
        { name: "quantity", type: "INT", description: "Quantity of units ordered" },
        { name: "unit_price", type: "NUMERIC(10,2)", description: "Price per unit at time of sale" },
      ],
    },
    {
      name: "shipments",
      description: "Logistics tracking events for outbound orders",
      columns: [
        { name: "id", type: "INT", description: "Primary Key", isPk: true },
        { name: "order_id", type: "INT", description: "FK to orders.id", fkTarget: "orders.id" },
        { name: "carrier", type: "VARCHAR(50)", description: "FedEx, UPS, USPS, DHL" },
        { name: "tracking_number", type: "VARCHAR(100)", description: "Waybill tracking reference" },
        { name: "shipped_at", type: "TIMESTAMP", description: "Dispatch timestamp" },
        { name: "delivered_at", type: "TIMESTAMP", description: "Customer handover timestamp (NULL if pending)" },
      ],
    },
  ] as SchemaTableDefinition[],
};
