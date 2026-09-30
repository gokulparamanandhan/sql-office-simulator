# SQL Office Simulator 🏢⚡
> **Learn SQL by working in a real company.** Practice real database queries across 7 simulated industry domains with progressive datasets, dual-engine validation, and interactive company operations.

[![Live Web App](https://img.shields.io/badge/Live%20Simulator-sql--office--simulator.vercel.app-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://sql-office-simulator.vercel.app/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](/terms)

---

## 🚀 Play Live in Your Browser (No Setup Required!)

> ### 💡 **Want to start practicing SQL immediately?**
> You **do not** need to clone the repo, install Node.js/Docker, or configure databases on your machine!
>
> 👉 **[Launch SQL Office Simulator Live on Vercel: sql-office-simulator.vercel.app](https://sql-office-simulator.vercel.app/)** 👈
>
> * ⚡ **Instant Access**: Zero dependencies, fully hosted, and 100% free forever.
> * 🗄️ **In-Browser WebAssembly PostgreSQL**: High-performance query execution powered by `@electric-sql/pglite`.
> * 🏢 **All 7 Industry Domains**: E-Commerce, Healthcare, Banking, SaaS, Logistics, HR, and Restaurants.
> * 🏆 **Career Progression**: From Level 1 (Startup Generalist) to Level 5 (Global Corp Head of Data).

---

## 🌟 Overview

**SQL Office Simulator** transforms traditional SQL learning into an immersive workplace experience. Instead of abstract math problems or disconnected puzzles, learners take on the role of a data analyst solving real business dilemmas across 7 distinct departments:

* 🛒 **E-Commerce & Retail** (Customers, Orders, Order Items, Products, Shipments, Returns)
* 🏥 **Healthcare & Clinical Operations** (Patients, Appointments, Doctors, Diagnoses, Prescriptions, Billing)
* ☁️ **SaaS & Subscription Analytics** (Users, Accounts, Subscriptions, Feature Usage, Incidents, Invoices)
* 💳 **Banking & Financial Services** (Accounts, Customers, Transactions, Loans, Cards, Fraud Alerts)
* 🚚 **Logistics & Global Supply Chain** (Shipments, Vehicles, Drivers, Routes, Warehouses, Delivery Events)
* 👥 **Human Resources & Talent Management** (Employees, Departments, Salaries, Attendance, Reviews)
* 🍽️ **Restaurant Chain Operations** (Restaurants, Menu Items, Orders, Staff, Shifts, Reservations)

---

## 🚀 Key Features

* 💻 **In-Browser Monaco SQL Editor**: Full autocomplete, syntax highlighting, keyboard shortcuts, and schema tooltips.
* 🛡️ **Dual-Dataset Anti-Cheat Grading**: Queries are automatically tested against both standard and hidden validation datasets to guarantee genuine logic rather than hardcoded filters.
* 🔐 **Secure Account & Progress Tracking**: Stateless JWT with HTTP-only cookies, security question recovery, and onboarding orientation.
* 👨‍💼 **Simulated Workplace Communications**: Receive tickets, Slack-style urgent stakeholder requests, and analytical briefs.
* 🔐 **Admin Portal & Google Authenticator MFA**: Enterprise-grade Time-Based One-Time Password (TOTP RFC 6238) two-factor authentication.
* ❓ **Security Question Account Recovery**: Completely self-contained password recovery without requiring external SMTP email servers.
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
* **Deployment**: [Vercel](https://vercel.com/) at [sql-office-simulator.vercel.app](https://sql-office-simulator.vercel.app/)

---

## 📦 How to Use: Cloud vs. Local

You have two choices depending on your objective:

| Pathway | Purpose | Link / Method |
| :--- | :--- | :--- |
| **Option 1: Live Cloud App (Recommended)** | Practice SQL, solve tickets, and build skills immediately with zero setup | 🌐 **[sql-office-simulator.vercel.app](https://sql-office-simulator.vercel.app/)** |
| **Option 2: Run Locally** | Fork the code, contribute new questions, customize features, or run offline | Follow the local instructions below |

---

### Running Locally (For Developers & Contributors)

If you wish to run the simulator locally or contribute to the open-source repository:

#### 1. Clone the repository
```bash
git clone https://github.com/gokulparamanandhan/sql-office-simulator.git
cd sql-office-simulator
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Configure Environment Variables
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

#### 4. Initialize Database Schema
```bash
npx prisma db push
```

#### 5. Launch the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser!

*(Remember: If you do not want to manage local environment variables and databases, you can always use the production deployment directly at **[sql-office-simulator.vercel.app](https://sql-office-simulator.vercel.app/)**)*

---

## 👨‍💻 Author & Maintainer

* **Created by**: [Gokul Paramanandhan](https://github.com/gokulparamanandhan)
* **Live Deployment**: [sql-office-simulator.vercel.app](https://sql-office-simulator.vercel.app/)
* **Feedback Form**: [Submit Feedback & Suggestions](https://forms.gle/BwdcTBKeKJAkXSsn8)

---

## 📄 License & Terms

This project is open-source for personal, educational, and non-commercial learning. Any unauthorized commercial exploitation or redistribution of this software is strictly prohibited under the platform [Terms & Conditions](/terms).
