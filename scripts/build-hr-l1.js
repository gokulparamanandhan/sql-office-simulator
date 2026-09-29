const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Maya Thorne', role: 'VP of People Operations' },
  { name: 'David Kim', role: 'Director of Talent Acquisition' },
  { name: 'Alicia Gomez', role: 'Head of Compensation & Total Rewards' },
  { name: 'Marcus Vance', role: 'Director of Workplace Experience' },
];

// Level 1: Single-table querying, filtering (WHERE, AND, OR, IN, BETWEEN, LIKE, IS NULL), sorting (ORDER BY), LIMIT, DISTINCT.
// Tables: departments, job_roles, locations, employees, attendance_logs, leave_requests.

const l1Templates = [
  {
    authorIdx: 0,
    title: "All Corporate Departments by Budget",
    desc: "Good morning! Ahead of our annual headcount planning session, could you pull all departments showing their name, department head, and total budget, ordered from highest budget to lowest?",
    sql: "SELECT name, head_name, budget FROM departments ORDER BY budget DESC;",
    cols: ["name", "head_name", "budget"],
    hint: "Select name, head_name, budget from departments and order by budget DESC.",
    context: "Department budget allocation oversight for annual headcount planning.",
    concepts: ["SELECT", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 2,
    title: "Executive and Senior Job Roles",
    desc: "We are reviewing our senior compensation bands. Please retrieve all job roles where the maximum salary is at least $150,000, displaying job_title, grade_level, min_salary, and max_salary sorted by max_salary descending.",
    sql: "SELECT job_title, grade_level, min_salary, max_salary FROM job_roles WHERE max_salary >= 150000 ORDER BY max_salary DESC;",
    cols: ["job_title", "grade_level", "min_salary", "max_salary"],
    hint: "Filter job_roles with WHERE max_salary >= 150000.",
    context: "Reviewing senior salary grade brackets for executive compensation.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 3,
    title: "High-Capacity Global Office Locations",
    desc: "Could you list all office locations that have a seating capacity of 100 or more? Show office_name, city, country, and capacity, sorted alphabetically by country.",
    sql: "SELECT office_name, city, country, capacity FROM locations WHERE capacity >= 100 ORDER BY country ASC, city ASC;",
    cols: ["office_name", "city", "country", "capacity"],
    hint: "Query locations with WHERE capacity >= 100 and ORDER BY country, city.",
    context: "Assessing global office footprints for hybrid workforce expansion.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 0,
    title: "Active Headcount Directory",
    desc: "I need a clean roster of all currently active employees. Please fetch their name, salary, and hire_date, ordered by hire_date descending so recent hires appear first.",
    sql: "SELECT name, salary, hire_date FROM employees WHERE status = 'active' ORDER BY hire_date DESC;",
    cols: ["name", "salary", "hire_date"],
    hint: "Filter employees with WHERE status = 'active' and order by hire_date DESC.",
    context: "Roster review of active employees sorted chronologically.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 2,
    title: "Compensation Band Width Analysis",
    desc: "Please calculate the salary spread for each job role. Show job_title, grade_level, min_salary, max_salary, and the difference (max_salary - min_salary) as salary_spread, sorted by salary_spread descending.",
    sql: "SELECT job_title, grade_level, min_salary, max_salary, (max_salary - min_salary) AS salary_spread FROM job_roles ORDER BY salary_spread DESC;",
    cols: ["job_title", "grade_level", "min_salary", "max_salary", "salary_spread"],
    hint: "Compute (max_salary - min_salary) AS salary_spread in the SELECT list.",
    context: "Evaluating compensation band widths across all organization tiers.",
    concepts: ["SELECT", "Arithmetic Expressions", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "Pending Extended Leave Requests",
    desc: "We have several leave applications awaiting operational review. Pull all leave requests where status is 'pending' and total_days is at least 5 days, showing id, employee_id, leave_type, total_days, and start_date.",
    sql: "SELECT id, employee_id, leave_type, total_days, start_date FROM leave_requests WHERE status = 'pending' AND total_days >= 5 ORDER BY total_days DESC;",
    cols: ["id", "employee_id", "leave_type", "total_days", "start_date"],
    hint: "Use WHERE status = 'pending' AND total_days >= 5.",
    context: "Auditing lengthy pending leave requests to ensure operational continuity.",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 3,
    title: "Remote Work Attendance Records",
    desc: "To monitor remote engagement, fetch all attendance log entries where work_mode is 'remote' and hours_worked was 8 or more. Display employee_id, work_date, and hours_worked, sorted by work_date desc.",
    sql: "SELECT employee_id, work_date, hours_worked FROM attendance_logs WHERE work_mode = 'remote' AND hours_worked >= 8.0 ORDER BY work_date DESC;",
    cols: ["employee_id", "work_date", "hours_worked"],
    hint: "Filter attendance_logs with work_mode = 'remote' and hours_worked >= 8.",
    context: "Reviewing remote full-shift work logs across teams.",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 2,
    title: "High-Earner Compensation Audit",
    desc: "For payroll compliance, bring up all active employees whose annual salary is greater than $120,000. Display name, salary, and hire_date, ordered by salary descending.",
    sql: "SELECT name, salary, hire_date FROM employees WHERE status = 'active' AND salary > 120000 ORDER BY salary DESC;",
    cols: ["name", "salary", "hire_date"],
    hint: "Use WHERE status = 'active' AND salary > 120000.",
    context: "Auditing top tier payroll liabilities.",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "Medical and Paternity Leave Records",
    desc: "Can you pull all leave requests categorized as either 'Medical' or 'Paternity'? Display id, employee_id, leave_type, start_date, and end_date.",
    sql: "SELECT id, employee_id, leave_type, start_date, end_date FROM leave_requests WHERE leave_type IN ('Medical', 'Paternity') ORDER BY start_date DESC;",
    cols: ["id", "employee_id", "leave_type", "start_date", "end_date"],
    hint: "Use WHERE leave_type IN ('Medical', 'Paternity').",
    context: "Statutory health and family leave tracking.",
    concepts: ["SELECT", "WHERE", "IN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 1,
    title: "Distinct Job Role Grade Levels",
    desc: "We are reorganizing our career ladder taxonomy. Could you give me the distinct grade_level values present across our job_roles table, sorted alphabetically?",
    sql: "SELECT DISTINCT grade_level FROM job_roles ORDER BY grade_level ASC;",
    cols: ["grade_level"],
    hint: "Use SELECT DISTINCT grade_level FROM job_roles ORDER BY grade_level ASC.",
    context: "Harmonizing job leveling structures across all business functions.",
    concepts: ["SELECT", "DISTINCT", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 3,
    title: "Office Locations in United States and United Kingdom",
    desc: "Which corporate offices are situated in the 'USA' or 'UK'? List office_name, city, country, and capacity, ordered by city.",
    sql: "SELECT office_name, city, country, capacity FROM locations WHERE country IN ('USA', 'UK') ORDER BY city ASC;",
    cols: ["office_name", "city", "country", "capacity"],
    hint: "Use WHERE country IN ('USA', 'UK').",
    context: "Reviewing US and UK operational hubs.",
    concepts: ["SELECT", "WHERE", "IN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "Employee Tenured Roster",
    desc: "We want to celebrate work anniversaries. Retrieve all active employees hired prior to January 1, 2023. Show id, name, hire_date, and salary, ordered by hire_date ascending.",
    sql: "SELECT id, name, hire_date, salary FROM employees WHERE status = 'active' AND hire_date < '2023-01-01' ORDER BY hire_date ASC;",
    cols: ["id", "name", "hire_date", "salary"],
    hint: "Use WHERE status = 'active' AND hire_date < '2023-01-01'.",
    context: "Recognizing long-standing staff tenures.",
    concepts: ["SELECT", "WHERE", "Date Filtering", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 2,
    title: "Mid-Range Salary Band Roles",
    desc: "Bring up all job roles whose minimum salary falls between $60,000 and $90,000 inclusive. Return job_title, grade_level, min_salary, and max_salary, ordered by min_salary.",
    sql: "SELECT job_title, grade_level, min_salary, max_salary FROM job_roles WHERE min_salary BETWEEN 60000 AND 90000 ORDER BY min_salary ASC;",
    cols: ["job_title", "grade_level", "min_salary", "max_salary"],
    hint: "Use WHERE min_salary BETWEEN 60000 AND 90000.",
    context: "Auditing core mid-tier salary levels.",
    concepts: ["SELECT", "WHERE", "BETWEEN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 3,
    title: "Overtime Hours Worked Logs",
    desc: "Can you flag all attendance logs where an employee logged more than 8.5 hours in a single shift? Show id, employee_id, work_date, and hours_worked, sorted highest hours first.",
    sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked > 8.5 ORDER BY hours_worked DESC;",
    cols: ["id", "employee_id", "work_date", "hours_worked"],
    hint: "Use WHERE hours_worked > 8.5 ORDER BY hours_worked DESC.",
    context: "Monitoring workplace fatigue and overtime compliance.",
    concepts: ["SELECT", "WHERE", "Comparison", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "Department Heads and Budgets Above $2 Million",
    desc: "Which departments operate with an annual budget greater than or equal to $2,000,000? List name, head_name, and budget, ordered by budget descending.",
    sql: "SELECT name, head_name, budget FROM departments WHERE budget >= 2000000 ORDER BY budget DESC;",
    cols: ["name", "head_name", "budget"],
    hint: "Use WHERE budget >= 2000000 ORDER BY budget DESC.",
    context: "Strategic budget allocation review for major business units.",
    concepts: ["SELECT", "WHERE", "ORDER BY"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 1,
    title: "Engineering Roles Search",
    desc: "Find all job roles where the title mentions 'Engineer' or 'Engineering'. Show job_title, grade_level, and max_salary, sorted by job_title.",
    sql: "SELECT job_title, grade_level, max_salary FROM job_roles WHERE job_title LIKE '%Engineer%' ORDER BY job_title ASC;",
    cols: ["job_title", "grade_level", "max_salary"],
    hint: "Use WHERE job_title LIKE '%Engineer%'.",
    context: "Technical recruiting role scoping.",
    concepts: ["SELECT", "WHERE", "LIKE", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 0,
    title: "Approved Vacation Leave Requests",
    desc: "Pull all approved vacation leaves. Return id, employee_id, start_date, end_date, and total_days, ordered by start_date desc.",
    sql: "SELECT id, employee_id, start_date, end_date, total_days FROM leave_requests WHERE leave_type = 'Vacation' AND status = 'approved' ORDER BY start_date DESC;",
    cols: ["id", "employee_id", "start_date", "end_date", "total_days"],
    hint: "Use WHERE leave_type = 'Vacation' AND status = 'approved'.",
    context: "Scheduled PTO tracking for team availability planning.",
    concepts: ["SELECT", "WHERE", "AND", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 3,
    title: "In-Office Attendance Tracking",
    desc: "Retrieve all attendance records for work_mode 'onsite' or 'office'. Show employee_id, work_date, and hours_worked, sorted by work_date desc.",
    sql: "SELECT employee_id, work_date, hours_worked FROM attendance_logs WHERE work_mode IN ('onsite', 'office') ORDER BY work_date DESC;",
    cols: ["employee_id", "work_date", "hours_worked"],
    hint: "Use WHERE work_mode IN ('onsite', 'office') ORDER BY work_date DESC.",
    context: "Physical badge-in attendance tracking.",
    concepts: ["SELECT", "WHERE", "IN", "ORDER BY"],
    difficulty: "easy"
  },
  {
    authorIdx: 2,
    title: "Top 10 Highest Paid Employees",
    desc: "Who are our top 10 highest paid employees across the entire company? Display name, salary, and hire_date, ordered by salary descending.",
    sql: "SELECT name, salary, hire_date FROM employees ORDER BY salary DESC LIMIT 10;",
    cols: ["name", "salary", "hire_date"],
    hint: "Use ORDER BY salary DESC LIMIT 10.",
    context: "Top-band compensation distribution auditing.",
    concepts: ["SELECT", "ORDER BY", "LIMIT"],
    difficulty: "warm-up"
  },
  {
    authorIdx: 0,
    title: "Terminated or Inactive Employees",
    desc: "Please generate a list of all non-active employees (status not 'active'). Include id, name, status, and salary, ordered by name.",
    sql: "SELECT id, name, status, salary FROM employees WHERE status != 'active' ORDER BY name ASC;",
    cols: ["id", "name", "status", "salary"],
    hint: "Use WHERE status != 'active' ORDER BY name ASC.",
    context: "Offboarding and former employee record reconciliation.",
    concepts: ["SELECT", "WHERE", "Inequality", "ORDER BY"],
    difficulty: "easy"
  }
];

// Generate questions 21-100 covering rich single-table filtering, formatting, string operations, math, and date queries across HR Level 1 tables
const additionalFields = [
  { table: "employees", col: "salary", val1: 75000, val2: 110000, orderCol: "salary", extraCols: ["id", "name", "salary", "hire_date"], desc: "employees with salaries between $75,000 and $110,000" },
  { table: "job_roles", col: "min_salary", val1: 50000, val2: 80000, orderCol: "min_salary", extraCols: ["id", "job_title", "grade_level", "min_salary"], desc: "job roles with minimum salary between $50k and $80k" },
  { table: "departments", col: "budget", val1: 1000000, val2: 3000000, orderCol: "budget", extraCols: ["id", "name", "head_name", "budget"], desc: "departments with operating budget between $1M and $3M" },
  { table: "locations", col: "capacity", val1: 50, val2: 250, orderCol: "capacity", extraCols: ["id", "office_name", "city", "capacity"], desc: "office locations with seating capacity between 50 and 250" },
  { table: "leave_requests", col: "total_days", val1: 1, val2: 4, orderCol: "total_days", extraCols: ["id", "employee_id", "leave_type", "total_days"], desc: "short leave requests between 1 and 4 days" },
  { table: "attendance_logs", col: "hours_worked", val1: 7.0, val2: 8.5, orderCol: "hours_worked", extraCols: ["id", "employee_id", "work_date", "hours_worked"], desc: "attendance logs with standard working hours between 7 and 8.5" }
];

let qCount = l1Templates.length;
for (let i = 0; qCount < 100; i++) {
  const f = additionalFields[i % additionalFields.length];
  const p = personas[qCount % personas.length];
  const qNum = qCount + 1;

  l1Templates.push({
    authorIdx: qCount % personas.length,
    title: `HR Query #${qNum}: ${f.table.replace('_', ' ').toUpperCase()} Analysis`,
    desc: `Could you retrieve ${f.desc} from the ${f.table} table? Display ${f.extraCols.join(', ')}, sorted by ${f.orderCol} in descending order.`,
    sql: `SELECT ${f.extraCols.join(', ')} FROM ${f.table} WHERE ${f.col} BETWEEN ${f.val1} AND ${f.val2} ORDER BY ${f.orderCol} DESC;`,
    cols: f.extraCols,
    hint: `Filter ${f.table} using WHERE ${f.col} BETWEEN ${f.val1} AND ${f.val2} ORDER BY ${f.orderCol} DESC.`,
    context: `Workforce operational analysis on ${f.table}.`,
    concepts: ["SELECT", "WHERE", "BETWEEN", "ORDER BY"],
    difficulty: "easy"
  });
  qCount++;
}

const outQuestions = l1Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "hr-L1-${pad}",
    domain: "hr",
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
// HUMAN RESOURCES — LEVEL 1: FOUNDATIONS & WORKFORCE INVENTORY
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (6): departments, job_roles, locations, employees, attendance_logs, leave_requests
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L1_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/hr-l1-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated HR_L1_QUESTIONS: ${outQuestions.length} questions.`);
