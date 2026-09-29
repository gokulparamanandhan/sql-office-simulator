# SQL Office Simulator 🏢⚡
> **Learn SQL by working in a real company.** Practice real database queries across 7 simulated industry domains with progressive datasets, dual-engine validation, and interactive company operations.

---

## 🌟 Overview

**SQL Office Simulator** transforms traditional SQL learning into an immersive workplace experience. Instead of abstract math problems, learners take on the role of a data analyst solving real business dilemmas across 7 distinct departments:

* 🛒 **E-Commerce & Retail** (Customers, Orders, Order Items, Products, Shipments)
* 🏥 **Healthcare & Clinical Operations** (Patients, Appointments, Doctors, Billing Records)
* ☁️ **SaaS & Subscription Analytics** (Accounts, Plans, Subscriptions, Invoices, Usage Logs)
* 💳 **Banking & Financial Services** (Accounts, Transactions, Loans, Branches)
* 🚚 **Logistics & Global Supply Chain** (Warehouses, Carriers, Shipments, Route Tracking)
* 👥 **Human Resources & Talent Management** (Employees, Departments, Salaries, Performance Reviews)
* 🍽️ **Restaurant Chain Operations** (Restaurants, Menu Items, Orders, Dine-in vs. Delivery)

---

## 🚀 Key Features

* 💻 **In-Browser Monaco SQL Editor**: Full autocomplete, syntax highlighting, keyboard shortcuts, and schema tooltips.
* 🛡️ **Dual-Dataset Anti-Cheat Grading**: Queries are automatically tested against both standard and hidden validation datasets to guarantee genuine logic rather than hardcoded filters.
* 🔐 **Admin Portal & Google Authenticator MFA**: Enterprise-grade Time-Based One-Time Password (TOTP RFC 6238) two-factor authentication compatible with Google Authenticator.
* ❓ **Security Question Account Recovery**: Completely self-contained password recovery using personal security questions without requiring external SMTP email servers.
* 📜 **Honor Pledge & Terms**: Built-in learner academic integrity pledge and commercial usage protections.
* 💬 **Feedback Integration**: Instant feedback loop for learners to suggest new questions and report challenges.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions & Route Handlers)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Database**: [PostgreSQL](https://www.postgresql.org/) via [Supabase](https://supabase.com/) & [Prisma ORM](https://www.prisma.io/)
* **In-Memory Sandbox Engine**: [@electric-sql/pglite](https://pglite.electric-sql.com/) (WebAssembly PostgreSQL)
* **Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)
* **Authentication**: Stateless JWT with HTTP-Only secure cookies (`jose`, `bcryptjs`)
* **Styling**: Modern, responsive UI with Tailwind CSS & Lucide Icons

---

## 📦 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/gokulparamanandhan/sql-office-simulator.git
cd sql-office-simulator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase connection strings:
```env
APP_DATABASE_URL="postgresql://postgres.[ref]:[PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres"
NEXTAUTH_SECRET="your-development-secret-key"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="YourSecureAdminPassword"
```

### 4. Initialize Database Schema
```bash
npx prisma db push
```

### 5. Launch the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## 👨‍💻 Author & Maintainer

* **Created by**: [Gokul Paramanandhan](https://github.com/gokulparamanandhan)
* **Feedback Form**: [Submit Feedback & Suggestions](https://forms.gle/BwdcTBKeKJAkXSsn8)

---

## 📄 License & Terms

This project is open-source for personal, educational, and non-commercial learning. Any unauthorized commercial exploitation or redistribution of this software is strictly prohibited under the platform [Terms & Conditions](/terms).
