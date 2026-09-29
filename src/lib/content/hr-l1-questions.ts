// ============================================================================
// HUMAN RESOURCES — LEVEL 1: FOUNDATIONS & WORKFORCE INVENTORY
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (6): departments, job_roles, locations, employees, attendance_logs, leave_requests
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L1_QUESTIONS: QuestionDefinition[] = [
  {
    id: "hr-L1-001",
    domain: "hr",
    level: 1,
    order: 1,
    difficulty: "warm-up",
    title: "All Corporate Departments by Budget",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Good morning! Ahead of our annual headcount planning session, could you pull all departments showing their name, department head, and total budget, ordered from highest budget to lowest?",
    context_notes: "Department budget allocation oversight for annual headcount planning.",
    concepts: ["SELECT","ORDER BY"],
    expected_columns: ["name","head_name","budget"],
    reference_sql: "SELECT name, head_name, budget FROM departments ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Select name, head_name, budget from departments and order by budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-002",
    domain: "hr",
    level: 1,
    order: 2,
    difficulty: "warm-up",
    title: "Executive and Senior Job Roles",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "We are reviewing our senior compensation bands. Please retrieve all job roles where the maximum salary is at least $150,000, displaying job_title, grade_level, min_salary, and max_salary sorted by max_salary descending.",
    context_notes: "Reviewing senior salary grade brackets for executive compensation.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["job_title","grade_level","min_salary","max_salary"],
    reference_sql: "SELECT job_title, grade_level, min_salary, max_salary FROM job_roles WHERE max_salary >= 150000 ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles with WHERE max_salary >= 150000."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-003",
    domain: "hr",
    level: 1,
    order: 3,
    difficulty: "warm-up",
    title: "High-Capacity Global Office Locations",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you list all office locations that have a seating capacity of 100 or more? Show office_name, city, country, and capacity, sorted alphabetically by country.",
    context_notes: "Assessing global office footprints for hybrid workforce expansion.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["office_name","city","country","capacity"],
    reference_sql: "SELECT office_name, city, country, capacity FROM locations WHERE capacity >= 100 ORDER BY country ASC, city ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Query locations with WHERE capacity >= 100 and ORDER BY country, city."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-004",
    domain: "hr",
    level: 1,
    order: 4,
    difficulty: "warm-up",
    title: "Active Headcount Directory",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "I need a clean roster of all currently active employees. Please fetch their name, salary, and hire_date, ordered by hire_date descending so recent hires appear first.",
    context_notes: "Roster review of active employees sorted chronologically.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["name","salary","hire_date"],
    reference_sql: "SELECT name, salary, hire_date FROM employees WHERE status = 'active' ORDER BY hire_date DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees with WHERE status = 'active' and order by hire_date DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-005",
    domain: "hr",
    level: 1,
    order: 5,
    difficulty: "easy",
    title: "Compensation Band Width Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Please calculate the salary spread for each job role. Show job_title, grade_level, min_salary, max_salary, and the difference (max_salary - min_salary) as salary_spread, sorted by salary_spread descending.",
    context_notes: "Evaluating compensation band widths across all organization tiers.",
    concepts: ["SELECT","Arithmetic Expressions","ORDER BY"],
    expected_columns: ["job_title","grade_level","min_salary","max_salary","salary_spread"],
    reference_sql: "SELECT job_title, grade_level, min_salary, max_salary, (max_salary - min_salary) AS salary_spread FROM job_roles ORDER BY salary_spread DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Compute (max_salary - min_salary) AS salary_spread in the SELECT list."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-006",
    domain: "hr",
    level: 1,
    order: 6,
    difficulty: "easy",
    title: "Pending Extended Leave Requests",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "We have several leave applications awaiting operational review. Pull all leave requests where status is 'pending' and total_days is at least 5 days, showing id, employee_id, leave_type, total_days, and start_date.",
    context_notes: "Auditing lengthy pending leave requests to ensure operational continuity.",
    concepts: ["SELECT","WHERE","AND","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days","start_date"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days, start_date FROM leave_requests WHERE status = 'pending' AND total_days >= 5 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE status = 'pending' AND total_days >= 5."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-007",
    domain: "hr",
    level: 1,
    order: 7,
    difficulty: "easy",
    title: "Remote Work Attendance Records",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "To monitor remote engagement, fetch all attendance log entries where work_mode is 'remote' and hours_worked was 8 or more. Display employee_id, work_date, and hours_worked, sorted by work_date desc.",
    context_notes: "Reviewing remote full-shift work logs across teams.",
    concepts: ["SELECT","WHERE","AND","ORDER BY"],
    expected_columns: ["employee_id","work_date","hours_worked"],
    reference_sql: "SELECT employee_id, work_date, hours_worked FROM attendance_logs WHERE work_mode = 'remote' AND hours_worked >= 8.0 ORDER BY work_date DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs with work_mode = 'remote' and hours_worked >= 8."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-008",
    domain: "hr",
    level: 1,
    order: 8,
    difficulty: "easy",
    title: "High-Earner Compensation Audit",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For payroll compliance, bring up all active employees whose annual salary is greater than $120,000. Display name, salary, and hire_date, ordered by salary descending.",
    context_notes: "Auditing top tier payroll liabilities.",
    concepts: ["SELECT","WHERE","AND","ORDER BY"],
    expected_columns: ["name","salary","hire_date"],
    reference_sql: "SELECT name, salary, hire_date FROM employees WHERE status = 'active' AND salary > 120000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE status = 'active' AND salary > 120000."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-009",
    domain: "hr",
    level: 1,
    order: 9,
    difficulty: "easy",
    title: "Medical and Paternity Leave Records",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Can you pull all leave requests categorized as either 'Medical' or 'Paternity'? Display id, employee_id, leave_type, start_date, and end_date.",
    context_notes: "Statutory health and family leave tracking.",
    concepts: ["SELECT","WHERE","IN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","start_date","end_date"],
    reference_sql: "SELECT id, employee_id, leave_type, start_date, end_date FROM leave_requests WHERE leave_type IN ('Medical', 'Paternity') ORDER BY start_date DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE leave_type IN ('Medical', 'Paternity')."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-010",
    domain: "hr",
    level: 1,
    order: 10,
    difficulty: "warm-up",
    title: "Distinct Job Role Grade Levels",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "We are reorganizing our career ladder taxonomy. Could you give me the distinct grade_level values present across our job_roles table, sorted alphabetically?",
    context_notes: "Harmonizing job leveling structures across all business functions.",
    concepts: ["SELECT","DISTINCT","ORDER BY"],
    expected_columns: ["grade_level"],
    reference_sql: "SELECT DISTINCT grade_level FROM job_roles ORDER BY grade_level ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SELECT DISTINCT grade_level FROM job_roles ORDER BY grade_level ASC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-011",
    domain: "hr",
    level: 1,
    order: 11,
    difficulty: "easy",
    title: "Office Locations in United States and United Kingdom",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Which corporate offices are situated in the 'USA' or 'UK'? List office_name, city, country, and capacity, ordered by city.",
    context_notes: "Reviewing US and UK operational hubs.",
    concepts: ["SELECT","WHERE","IN","ORDER BY"],
    expected_columns: ["office_name","city","country","capacity"],
    reference_sql: "SELECT office_name, city, country, capacity FROM locations WHERE country IN ('USA', 'UK') ORDER BY city ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE country IN ('USA', 'UK')."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-012",
    domain: "hr",
    level: 1,
    order: 12,
    difficulty: "easy",
    title: "Employee Tenured Roster",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "We want to celebrate work anniversaries. Retrieve all active employees hired prior to January 1, 2023. Show id, name, hire_date, and salary, ordered by hire_date ascending.",
    context_notes: "Recognizing long-standing staff tenures.",
    concepts: ["SELECT","WHERE","Date Filtering","ORDER BY"],
    expected_columns: ["id","name","hire_date","salary"],
    reference_sql: "SELECT id, name, hire_date, salary FROM employees WHERE status = 'active' AND hire_date < '2023-01-01' ORDER BY hire_date ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE status = 'active' AND hire_date < '2023-01-01'."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-013",
    domain: "hr",
    level: 1,
    order: 13,
    difficulty: "easy",
    title: "Mid-Range Salary Band Roles",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Bring up all job roles whose minimum salary falls between $60,000 and $90,000 inclusive. Return job_title, grade_level, min_salary, and max_salary, ordered by min_salary.",
    context_notes: "Auditing core mid-tier salary levels.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["job_title","grade_level","min_salary","max_salary"],
    reference_sql: "SELECT job_title, grade_level, min_salary, max_salary FROM job_roles WHERE min_salary BETWEEN 60000 AND 90000 ORDER BY min_salary ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE min_salary BETWEEN 60000 AND 90000."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-014",
    domain: "hr",
    level: 1,
    order: 14,
    difficulty: "easy",
    title: "Overtime Hours Worked Logs",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Can you flag all attendance logs where an employee logged more than 8.5 hours in a single shift? Show id, employee_id, work_date, and hours_worked, sorted highest hours first.",
    context_notes: "Monitoring workplace fatigue and overtime compliance.",
    concepts: ["SELECT","WHERE","Comparison","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked > 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE hours_worked > 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-015",
    domain: "hr",
    level: 1,
    order: 15,
    difficulty: "warm-up",
    title: "Department Heads and Budgets Above $2 Million",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Which departments operate with an annual budget greater than or equal to $2,000,000? List name, head_name, and budget, ordered by budget descending.",
    context_notes: "Strategic budget allocation review for major business units.",
    concepts: ["SELECT","WHERE","ORDER BY"],
    expected_columns: ["name","head_name","budget"],
    reference_sql: "SELECT name, head_name, budget FROM departments WHERE budget >= 2000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE budget >= 2000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-016",
    domain: "hr",
    level: 1,
    order: 16,
    difficulty: "easy",
    title: "Engineering Roles Search",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Find all job roles where the title mentions 'Engineer' or 'Engineering'. Show job_title, grade_level, and max_salary, sorted by job_title.",
    context_notes: "Technical recruiting role scoping.",
    concepts: ["SELECT","WHERE","LIKE","ORDER BY"],
    expected_columns: ["job_title","grade_level","max_salary"],
    reference_sql: "SELECT job_title, grade_level, max_salary FROM job_roles WHERE job_title LIKE '%Engineer%' ORDER BY job_title ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE job_title LIKE '%Engineer%'."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-017",
    domain: "hr",
    level: 1,
    order: 17,
    difficulty: "easy",
    title: "Approved Vacation Leave Requests",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Pull all approved vacation leaves. Return id, employee_id, start_date, end_date, and total_days, ordered by start_date desc.",
    context_notes: "Scheduled PTO tracking for team availability planning.",
    concepts: ["SELECT","WHERE","AND","ORDER BY"],
    expected_columns: ["id","employee_id","start_date","end_date","total_days"],
    reference_sql: "SELECT id, employee_id, start_date, end_date, total_days FROM leave_requests WHERE leave_type = 'Vacation' AND status = 'approved' ORDER BY start_date DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE leave_type = 'Vacation' AND status = 'approved'."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-018",
    domain: "hr",
    level: 1,
    order: 18,
    difficulty: "easy",
    title: "In-Office Attendance Tracking",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Retrieve all attendance records for work_mode 'onsite' or 'office'. Show employee_id, work_date, and hours_worked, sorted by work_date desc.",
    context_notes: "Physical badge-in attendance tracking.",
    concepts: ["SELECT","WHERE","IN","ORDER BY"],
    expected_columns: ["employee_id","work_date","hours_worked"],
    reference_sql: "SELECT employee_id, work_date, hours_worked FROM attendance_logs WHERE work_mode IN ('onsite', 'office') ORDER BY work_date DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE work_mode IN ('onsite', 'office') ORDER BY work_date DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-019",
    domain: "hr",
    level: 1,
    order: 19,
    difficulty: "warm-up",
    title: "Top 10 Highest Paid Employees",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Who are our top 10 highest paid employees across the entire company? Display name, salary, and hire_date, ordered by salary descending.",
    context_notes: "Top-band compensation distribution auditing.",
    concepts: ["SELECT","ORDER BY","LIMIT"],
    expected_columns: ["name","salary","hire_date"],
    reference_sql: "SELECT name, salary, hire_date FROM employees ORDER BY salary DESC LIMIT 10;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use ORDER BY salary DESC LIMIT 10."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-020",
    domain: "hr",
    level: 1,
    order: 20,
    difficulty: "easy",
    title: "Terminated or Inactive Employees",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Please generate a list of all non-active employees (status not 'active'). Include id, name, status, and salary, ordered by name.",
    context_notes: "Offboarding and former employee record reconciliation.",
    concepts: ["SELECT","WHERE","Inequality","ORDER BY"],
    expected_columns: ["id","name","status","salary"],
    reference_sql: "SELECT id, name, status, salary FROM employees WHERE status != 'active' ORDER BY name ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE status != 'active' ORDER BY name ASC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-021",
    domain: "hr",
    level: 1,
    order: 21,
    difficulty: "easy",
    title: "HR Query #21: EMPLOYEES Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-022",
    domain: "hr",
    level: 1,
    order: 22,
    difficulty: "easy",
    title: "HR Query #22: JOB ROLES Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-023",
    domain: "hr",
    level: 1,
    order: 23,
    difficulty: "easy",
    title: "HR Query #23: DEPARTMENTS Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve departments with operating budget between $1M and $3M from the departments table? Display id, name, head_name, budget, sorted by budget in descending order.",
    context_notes: "Workforce operational analysis on departments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","head_name","budget"],
    reference_sql: "SELECT id, name, head_name, budget FROM departments WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter departments using WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-024",
    domain: "hr",
    level: 1,
    order: 24,
    difficulty: "easy",
    title: "HR Query #24: LOCATIONS Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve office locations with seating capacity between 50 and 250 from the locations table? Display id, office_name, city, capacity, sorted by capacity in descending order.",
    context_notes: "Workforce operational analysis on locations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","office_name","city","capacity"],
    reference_sql: "SELECT id, office_name, city, capacity FROM locations WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter locations using WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-025",
    domain: "hr",
    level: 1,
    order: 25,
    difficulty: "easy",
    title: "HR Query #25: LEAVE REQUESTS Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve short leave requests between 1 and 4 days from the leave_requests table? Display id, employee_id, leave_type, total_days, sorted by total_days in descending order.",
    context_notes: "Workforce operational analysis on leave_requests.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days FROM leave_requests WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter leave_requests using WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-026",
    domain: "hr",
    level: 1,
    order: 26,
    difficulty: "easy",
    title: "HR Query #26: ATTENDANCE LOGS Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve attendance logs with standard working hours between 7 and 8.5 from the attendance_logs table? Display id, employee_id, work_date, hours_worked, sorted by hours_worked in descending order.",
    context_notes: "Workforce operational analysis on attendance_logs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs using WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-027",
    domain: "hr",
    level: 1,
    order: 27,
    difficulty: "easy",
    title: "HR Query #27: EMPLOYEES Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-028",
    domain: "hr",
    level: 1,
    order: 28,
    difficulty: "easy",
    title: "HR Query #28: JOB ROLES Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-029",
    domain: "hr",
    level: 1,
    order: 29,
    difficulty: "easy",
    title: "HR Query #29: DEPARTMENTS Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve departments with operating budget between $1M and $3M from the departments table? Display id, name, head_name, budget, sorted by budget in descending order.",
    context_notes: "Workforce operational analysis on departments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","head_name","budget"],
    reference_sql: "SELECT id, name, head_name, budget FROM departments WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter departments using WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-030",
    domain: "hr",
    level: 1,
    order: 30,
    difficulty: "easy",
    title: "HR Query #30: LOCATIONS Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve office locations with seating capacity between 50 and 250 from the locations table? Display id, office_name, city, capacity, sorted by capacity in descending order.",
    context_notes: "Workforce operational analysis on locations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","office_name","city","capacity"],
    reference_sql: "SELECT id, office_name, city, capacity FROM locations WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter locations using WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-031",
    domain: "hr",
    level: 1,
    order: 31,
    difficulty: "easy",
    title: "HR Query #31: LEAVE REQUESTS Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve short leave requests between 1 and 4 days from the leave_requests table? Display id, employee_id, leave_type, total_days, sorted by total_days in descending order.",
    context_notes: "Workforce operational analysis on leave_requests.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days FROM leave_requests WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter leave_requests using WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-032",
    domain: "hr",
    level: 1,
    order: 32,
    difficulty: "easy",
    title: "HR Query #32: ATTENDANCE LOGS Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve attendance logs with standard working hours between 7 and 8.5 from the attendance_logs table? Display id, employee_id, work_date, hours_worked, sorted by hours_worked in descending order.",
    context_notes: "Workforce operational analysis on attendance_logs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs using WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-033",
    domain: "hr",
    level: 1,
    order: 33,
    difficulty: "easy",
    title: "HR Query #33: EMPLOYEES Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-034",
    domain: "hr",
    level: 1,
    order: 34,
    difficulty: "easy",
    title: "HR Query #34: JOB ROLES Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-035",
    domain: "hr",
    level: 1,
    order: 35,
    difficulty: "easy",
    title: "HR Query #35: DEPARTMENTS Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve departments with operating budget between $1M and $3M from the departments table? Display id, name, head_name, budget, sorted by budget in descending order.",
    context_notes: "Workforce operational analysis on departments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","head_name","budget"],
    reference_sql: "SELECT id, name, head_name, budget FROM departments WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter departments using WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-036",
    domain: "hr",
    level: 1,
    order: 36,
    difficulty: "easy",
    title: "HR Query #36: LOCATIONS Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve office locations with seating capacity between 50 and 250 from the locations table? Display id, office_name, city, capacity, sorted by capacity in descending order.",
    context_notes: "Workforce operational analysis on locations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","office_name","city","capacity"],
    reference_sql: "SELECT id, office_name, city, capacity FROM locations WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter locations using WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-037",
    domain: "hr",
    level: 1,
    order: 37,
    difficulty: "easy",
    title: "HR Query #37: LEAVE REQUESTS Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve short leave requests between 1 and 4 days from the leave_requests table? Display id, employee_id, leave_type, total_days, sorted by total_days in descending order.",
    context_notes: "Workforce operational analysis on leave_requests.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days FROM leave_requests WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter leave_requests using WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-038",
    domain: "hr",
    level: 1,
    order: 38,
    difficulty: "easy",
    title: "HR Query #38: ATTENDANCE LOGS Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve attendance logs with standard working hours between 7 and 8.5 from the attendance_logs table? Display id, employee_id, work_date, hours_worked, sorted by hours_worked in descending order.",
    context_notes: "Workforce operational analysis on attendance_logs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs using WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-039",
    domain: "hr",
    level: 1,
    order: 39,
    difficulty: "easy",
    title: "HR Query #39: EMPLOYEES Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-040",
    domain: "hr",
    level: 1,
    order: 40,
    difficulty: "easy",
    title: "HR Query #40: JOB ROLES Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-041",
    domain: "hr",
    level: 1,
    order: 41,
    difficulty: "easy",
    title: "HR Query #41: DEPARTMENTS Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve departments with operating budget between $1M and $3M from the departments table? Display id, name, head_name, budget, sorted by budget in descending order.",
    context_notes: "Workforce operational analysis on departments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","head_name","budget"],
    reference_sql: "SELECT id, name, head_name, budget FROM departments WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter departments using WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-042",
    domain: "hr",
    level: 1,
    order: 42,
    difficulty: "easy",
    title: "HR Query #42: LOCATIONS Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve office locations with seating capacity between 50 and 250 from the locations table? Display id, office_name, city, capacity, sorted by capacity in descending order.",
    context_notes: "Workforce operational analysis on locations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","office_name","city","capacity"],
    reference_sql: "SELECT id, office_name, city, capacity FROM locations WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter locations using WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-043",
    domain: "hr",
    level: 1,
    order: 43,
    difficulty: "easy",
    title: "HR Query #43: LEAVE REQUESTS Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve short leave requests between 1 and 4 days from the leave_requests table? Display id, employee_id, leave_type, total_days, sorted by total_days in descending order.",
    context_notes: "Workforce operational analysis on leave_requests.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days FROM leave_requests WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter leave_requests using WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-044",
    domain: "hr",
    level: 1,
    order: 44,
    difficulty: "easy",
    title: "HR Query #44: ATTENDANCE LOGS Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve attendance logs with standard working hours between 7 and 8.5 from the attendance_logs table? Display id, employee_id, work_date, hours_worked, sorted by hours_worked in descending order.",
    context_notes: "Workforce operational analysis on attendance_logs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs using WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-045",
    domain: "hr",
    level: 1,
    order: 45,
    difficulty: "easy",
    title: "HR Query #45: EMPLOYEES Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-046",
    domain: "hr",
    level: 1,
    order: 46,
    difficulty: "easy",
    title: "HR Query #46: JOB ROLES Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-047",
    domain: "hr",
    level: 1,
    order: 47,
    difficulty: "easy",
    title: "HR Query #47: DEPARTMENTS Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve departments with operating budget between $1M and $3M from the departments table? Display id, name, head_name, budget, sorted by budget in descending order.",
    context_notes: "Workforce operational analysis on departments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","head_name","budget"],
    reference_sql: "SELECT id, name, head_name, budget FROM departments WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter departments using WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-048",
    domain: "hr",
    level: 1,
    order: 48,
    difficulty: "easy",
    title: "HR Query #48: LOCATIONS Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve office locations with seating capacity between 50 and 250 from the locations table? Display id, office_name, city, capacity, sorted by capacity in descending order.",
    context_notes: "Workforce operational analysis on locations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","office_name","city","capacity"],
    reference_sql: "SELECT id, office_name, city, capacity FROM locations WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter locations using WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-049",
    domain: "hr",
    level: 1,
    order: 49,
    difficulty: "easy",
    title: "HR Query #49: LEAVE REQUESTS Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve short leave requests between 1 and 4 days from the leave_requests table? Display id, employee_id, leave_type, total_days, sorted by total_days in descending order.",
    context_notes: "Workforce operational analysis on leave_requests.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days FROM leave_requests WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter leave_requests using WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-050",
    domain: "hr",
    level: 1,
    order: 50,
    difficulty: "easy",
    title: "HR Query #50: ATTENDANCE LOGS Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve attendance logs with standard working hours between 7 and 8.5 from the attendance_logs table? Display id, employee_id, work_date, hours_worked, sorted by hours_worked in descending order.",
    context_notes: "Workforce operational analysis on attendance_logs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs using WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-051",
    domain: "hr",
    level: 1,
    order: 51,
    difficulty: "easy",
    title: "HR Query #51: EMPLOYEES Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-052",
    domain: "hr",
    level: 1,
    order: 52,
    difficulty: "easy",
    title: "HR Query #52: JOB ROLES Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-053",
    domain: "hr",
    level: 1,
    order: 53,
    difficulty: "easy",
    title: "HR Query #53: DEPARTMENTS Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve departments with operating budget between $1M and $3M from the departments table? Display id, name, head_name, budget, sorted by budget in descending order.",
    context_notes: "Workforce operational analysis on departments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","head_name","budget"],
    reference_sql: "SELECT id, name, head_name, budget FROM departments WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter departments using WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-054",
    domain: "hr",
    level: 1,
    order: 54,
    difficulty: "easy",
    title: "HR Query #54: LOCATIONS Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve office locations with seating capacity between 50 and 250 from the locations table? Display id, office_name, city, capacity, sorted by capacity in descending order.",
    context_notes: "Workforce operational analysis on locations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","office_name","city","capacity"],
    reference_sql: "SELECT id, office_name, city, capacity FROM locations WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter locations using WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-055",
    domain: "hr",
    level: 1,
    order: 55,
    difficulty: "easy",
    title: "HR Query #55: LEAVE REQUESTS Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve short leave requests between 1 and 4 days from the leave_requests table? Display id, employee_id, leave_type, total_days, sorted by total_days in descending order.",
    context_notes: "Workforce operational analysis on leave_requests.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days FROM leave_requests WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter leave_requests using WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-056",
    domain: "hr",
    level: 1,
    order: 56,
    difficulty: "easy",
    title: "HR Query #56: ATTENDANCE LOGS Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve attendance logs with standard working hours between 7 and 8.5 from the attendance_logs table? Display id, employee_id, work_date, hours_worked, sorted by hours_worked in descending order.",
    context_notes: "Workforce operational analysis on attendance_logs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs using WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-057",
    domain: "hr",
    level: 1,
    order: 57,
    difficulty: "easy",
    title: "HR Query #57: EMPLOYEES Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-058",
    domain: "hr",
    level: 1,
    order: 58,
    difficulty: "easy",
    title: "HR Query #58: JOB ROLES Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-059",
    domain: "hr",
    level: 1,
    order: 59,
    difficulty: "easy",
    title: "HR Query #59: DEPARTMENTS Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve departments with operating budget between $1M and $3M from the departments table? Display id, name, head_name, budget, sorted by budget in descending order.",
    context_notes: "Workforce operational analysis on departments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","head_name","budget"],
    reference_sql: "SELECT id, name, head_name, budget FROM departments WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter departments using WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-060",
    domain: "hr",
    level: 1,
    order: 60,
    difficulty: "easy",
    title: "HR Query #60: LOCATIONS Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve office locations with seating capacity between 50 and 250 from the locations table? Display id, office_name, city, capacity, sorted by capacity in descending order.",
    context_notes: "Workforce operational analysis on locations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","office_name","city","capacity"],
    reference_sql: "SELECT id, office_name, city, capacity FROM locations WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter locations using WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-061",
    domain: "hr",
    level: 1,
    order: 61,
    difficulty: "easy",
    title: "HR Query #61: LEAVE REQUESTS Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve short leave requests between 1 and 4 days from the leave_requests table? Display id, employee_id, leave_type, total_days, sorted by total_days in descending order.",
    context_notes: "Workforce operational analysis on leave_requests.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days FROM leave_requests WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter leave_requests using WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-062",
    domain: "hr",
    level: 1,
    order: 62,
    difficulty: "easy",
    title: "HR Query #62: ATTENDANCE LOGS Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve attendance logs with standard working hours between 7 and 8.5 from the attendance_logs table? Display id, employee_id, work_date, hours_worked, sorted by hours_worked in descending order.",
    context_notes: "Workforce operational analysis on attendance_logs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs using WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-063",
    domain: "hr",
    level: 1,
    order: 63,
    difficulty: "easy",
    title: "HR Query #63: EMPLOYEES Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-064",
    domain: "hr",
    level: 1,
    order: 64,
    difficulty: "easy",
    title: "HR Query #64: JOB ROLES Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-065",
    domain: "hr",
    level: 1,
    order: 65,
    difficulty: "easy",
    title: "HR Query #65: DEPARTMENTS Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve departments with operating budget between $1M and $3M from the departments table? Display id, name, head_name, budget, sorted by budget in descending order.",
    context_notes: "Workforce operational analysis on departments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","head_name","budget"],
    reference_sql: "SELECT id, name, head_name, budget FROM departments WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter departments using WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-066",
    domain: "hr",
    level: 1,
    order: 66,
    difficulty: "easy",
    title: "HR Query #66: LOCATIONS Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve office locations with seating capacity between 50 and 250 from the locations table? Display id, office_name, city, capacity, sorted by capacity in descending order.",
    context_notes: "Workforce operational analysis on locations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","office_name","city","capacity"],
    reference_sql: "SELECT id, office_name, city, capacity FROM locations WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter locations using WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-067",
    domain: "hr",
    level: 1,
    order: 67,
    difficulty: "easy",
    title: "HR Query #67: LEAVE REQUESTS Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve short leave requests between 1 and 4 days from the leave_requests table? Display id, employee_id, leave_type, total_days, sorted by total_days in descending order.",
    context_notes: "Workforce operational analysis on leave_requests.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days FROM leave_requests WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter leave_requests using WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-068",
    domain: "hr",
    level: 1,
    order: 68,
    difficulty: "easy",
    title: "HR Query #68: ATTENDANCE LOGS Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve attendance logs with standard working hours between 7 and 8.5 from the attendance_logs table? Display id, employee_id, work_date, hours_worked, sorted by hours_worked in descending order.",
    context_notes: "Workforce operational analysis on attendance_logs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs using WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-069",
    domain: "hr",
    level: 1,
    order: 69,
    difficulty: "easy",
    title: "HR Query #69: EMPLOYEES Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-070",
    domain: "hr",
    level: 1,
    order: 70,
    difficulty: "easy",
    title: "HR Query #70: JOB ROLES Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-071",
    domain: "hr",
    level: 1,
    order: 71,
    difficulty: "easy",
    title: "HR Query #71: DEPARTMENTS Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve departments with operating budget between $1M and $3M from the departments table? Display id, name, head_name, budget, sorted by budget in descending order.",
    context_notes: "Workforce operational analysis on departments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","head_name","budget"],
    reference_sql: "SELECT id, name, head_name, budget FROM departments WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter departments using WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-072",
    domain: "hr",
    level: 1,
    order: 72,
    difficulty: "easy",
    title: "HR Query #72: LOCATIONS Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve office locations with seating capacity between 50 and 250 from the locations table? Display id, office_name, city, capacity, sorted by capacity in descending order.",
    context_notes: "Workforce operational analysis on locations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","office_name","city","capacity"],
    reference_sql: "SELECT id, office_name, city, capacity FROM locations WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter locations using WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-073",
    domain: "hr",
    level: 1,
    order: 73,
    difficulty: "easy",
    title: "HR Query #73: LEAVE REQUESTS Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve short leave requests between 1 and 4 days from the leave_requests table? Display id, employee_id, leave_type, total_days, sorted by total_days in descending order.",
    context_notes: "Workforce operational analysis on leave_requests.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days FROM leave_requests WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter leave_requests using WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-074",
    domain: "hr",
    level: 1,
    order: 74,
    difficulty: "easy",
    title: "HR Query #74: ATTENDANCE LOGS Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve attendance logs with standard working hours between 7 and 8.5 from the attendance_logs table? Display id, employee_id, work_date, hours_worked, sorted by hours_worked in descending order.",
    context_notes: "Workforce operational analysis on attendance_logs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs using WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-075",
    domain: "hr",
    level: 1,
    order: 75,
    difficulty: "easy",
    title: "HR Query #75: EMPLOYEES Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-076",
    domain: "hr",
    level: 1,
    order: 76,
    difficulty: "easy",
    title: "HR Query #76: JOB ROLES Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-077",
    domain: "hr",
    level: 1,
    order: 77,
    difficulty: "easy",
    title: "HR Query #77: DEPARTMENTS Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve departments with operating budget between $1M and $3M from the departments table? Display id, name, head_name, budget, sorted by budget in descending order.",
    context_notes: "Workforce operational analysis on departments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","head_name","budget"],
    reference_sql: "SELECT id, name, head_name, budget FROM departments WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter departments using WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-078",
    domain: "hr",
    level: 1,
    order: 78,
    difficulty: "easy",
    title: "HR Query #78: LOCATIONS Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve office locations with seating capacity between 50 and 250 from the locations table? Display id, office_name, city, capacity, sorted by capacity in descending order.",
    context_notes: "Workforce operational analysis on locations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","office_name","city","capacity"],
    reference_sql: "SELECT id, office_name, city, capacity FROM locations WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter locations using WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-079",
    domain: "hr",
    level: 1,
    order: 79,
    difficulty: "easy",
    title: "HR Query #79: LEAVE REQUESTS Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve short leave requests between 1 and 4 days from the leave_requests table? Display id, employee_id, leave_type, total_days, sorted by total_days in descending order.",
    context_notes: "Workforce operational analysis on leave_requests.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days FROM leave_requests WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter leave_requests using WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-080",
    domain: "hr",
    level: 1,
    order: 80,
    difficulty: "easy",
    title: "HR Query #80: ATTENDANCE LOGS Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve attendance logs with standard working hours between 7 and 8.5 from the attendance_logs table? Display id, employee_id, work_date, hours_worked, sorted by hours_worked in descending order.",
    context_notes: "Workforce operational analysis on attendance_logs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs using WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-081",
    domain: "hr",
    level: 1,
    order: 81,
    difficulty: "easy",
    title: "HR Query #81: EMPLOYEES Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-082",
    domain: "hr",
    level: 1,
    order: 82,
    difficulty: "easy",
    title: "HR Query #82: JOB ROLES Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-083",
    domain: "hr",
    level: 1,
    order: 83,
    difficulty: "easy",
    title: "HR Query #83: DEPARTMENTS Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve departments with operating budget between $1M and $3M from the departments table? Display id, name, head_name, budget, sorted by budget in descending order.",
    context_notes: "Workforce operational analysis on departments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","head_name","budget"],
    reference_sql: "SELECT id, name, head_name, budget FROM departments WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter departments using WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-084",
    domain: "hr",
    level: 1,
    order: 84,
    difficulty: "easy",
    title: "HR Query #84: LOCATIONS Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve office locations with seating capacity between 50 and 250 from the locations table? Display id, office_name, city, capacity, sorted by capacity in descending order.",
    context_notes: "Workforce operational analysis on locations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","office_name","city","capacity"],
    reference_sql: "SELECT id, office_name, city, capacity FROM locations WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter locations using WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-085",
    domain: "hr",
    level: 1,
    order: 85,
    difficulty: "easy",
    title: "HR Query #85: LEAVE REQUESTS Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve short leave requests between 1 and 4 days from the leave_requests table? Display id, employee_id, leave_type, total_days, sorted by total_days in descending order.",
    context_notes: "Workforce operational analysis on leave_requests.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days FROM leave_requests WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter leave_requests using WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-086",
    domain: "hr",
    level: 1,
    order: 86,
    difficulty: "easy",
    title: "HR Query #86: ATTENDANCE LOGS Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve attendance logs with standard working hours between 7 and 8.5 from the attendance_logs table? Display id, employee_id, work_date, hours_worked, sorted by hours_worked in descending order.",
    context_notes: "Workforce operational analysis on attendance_logs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs using WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-087",
    domain: "hr",
    level: 1,
    order: 87,
    difficulty: "easy",
    title: "HR Query #87: EMPLOYEES Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-088",
    domain: "hr",
    level: 1,
    order: 88,
    difficulty: "easy",
    title: "HR Query #88: JOB ROLES Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-089",
    domain: "hr",
    level: 1,
    order: 89,
    difficulty: "easy",
    title: "HR Query #89: DEPARTMENTS Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve departments with operating budget between $1M and $3M from the departments table? Display id, name, head_name, budget, sorted by budget in descending order.",
    context_notes: "Workforce operational analysis on departments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","head_name","budget"],
    reference_sql: "SELECT id, name, head_name, budget FROM departments WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter departments using WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-090",
    domain: "hr",
    level: 1,
    order: 90,
    difficulty: "easy",
    title: "HR Query #90: LOCATIONS Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve office locations with seating capacity between 50 and 250 from the locations table? Display id, office_name, city, capacity, sorted by capacity in descending order.",
    context_notes: "Workforce operational analysis on locations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","office_name","city","capacity"],
    reference_sql: "SELECT id, office_name, city, capacity FROM locations WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter locations using WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-091",
    domain: "hr",
    level: 1,
    order: 91,
    difficulty: "easy",
    title: "HR Query #91: LEAVE REQUESTS Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve short leave requests between 1 and 4 days from the leave_requests table? Display id, employee_id, leave_type, total_days, sorted by total_days in descending order.",
    context_notes: "Workforce operational analysis on leave_requests.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days FROM leave_requests WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter leave_requests using WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-092",
    domain: "hr",
    level: 1,
    order: 92,
    difficulty: "easy",
    title: "HR Query #92: ATTENDANCE LOGS Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve attendance logs with standard working hours between 7 and 8.5 from the attendance_logs table? Display id, employee_id, work_date, hours_worked, sorted by hours_worked in descending order.",
    context_notes: "Workforce operational analysis on attendance_logs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs using WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-093",
    domain: "hr",
    level: 1,
    order: 93,
    difficulty: "easy",
    title: "HR Query #93: EMPLOYEES Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-094",
    domain: "hr",
    level: 1,
    order: 94,
    difficulty: "easy",
    title: "HR Query #94: JOB ROLES Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-095",
    domain: "hr",
    level: 1,
    order: 95,
    difficulty: "easy",
    title: "HR Query #95: DEPARTMENTS Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve departments with operating budget between $1M and $3M from the departments table? Display id, name, head_name, budget, sorted by budget in descending order.",
    context_notes: "Workforce operational analysis on departments.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","head_name","budget"],
    reference_sql: "SELECT id, name, head_name, budget FROM departments WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter departments using WHERE budget BETWEEN 1000000 AND 3000000 ORDER BY budget DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-096",
    domain: "hr",
    level: 1,
    order: 96,
    difficulty: "easy",
    title: "HR Query #96: LOCATIONS Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve office locations with seating capacity between 50 and 250 from the locations table? Display id, office_name, city, capacity, sorted by capacity in descending order.",
    context_notes: "Workforce operational analysis on locations.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","office_name","city","capacity"],
    reference_sql: "SELECT id, office_name, city, capacity FROM locations WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter locations using WHERE capacity BETWEEN 50 AND 250 ORDER BY capacity DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-097",
    domain: "hr",
    level: 1,
    order: 97,
    difficulty: "easy",
    title: "HR Query #97: LEAVE REQUESTS Analysis",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Could you retrieve short leave requests between 1 and 4 days from the leave_requests table? Display id, employee_id, leave_type, total_days, sorted by total_days in descending order.",
    context_notes: "Workforce operational analysis on leave_requests.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","leave_type","total_days"],
    reference_sql: "SELECT id, employee_id, leave_type, total_days FROM leave_requests WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter leave_requests using WHERE total_days BETWEEN 1 AND 4 ORDER BY total_days DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-098",
    domain: "hr",
    level: 1,
    order: 98,
    difficulty: "easy",
    title: "HR Query #98: ATTENDANCE LOGS Analysis",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Could you retrieve attendance logs with standard working hours between 7 and 8.5 from the attendance_logs table? Display id, employee_id, work_date, hours_worked, sorted by hours_worked in descending order.",
    context_notes: "Workforce operational analysis on attendance_logs.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","employee_id","work_date","hours_worked"],
    reference_sql: "SELECT id, employee_id, work_date, hours_worked FROM attendance_logs WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter attendance_logs using WHERE hours_worked BETWEEN 7 AND 8.5 ORDER BY hours_worked DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-099",
    domain: "hr",
    level: 1,
    order: 99,
    difficulty: "easy",
    title: "HR Query #99: EMPLOYEES Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Could you retrieve employees with salaries between $75,000 and $110,000 from the employees table? Display id, name, salary, hire_date, sorted by salary in descending order.",
    context_notes: "Workforce operational analysis on employees.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","name","salary","hire_date"],
    reference_sql: "SELECT id, name, salary, hire_date FROM employees WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter employees using WHERE salary BETWEEN 75000 AND 110000 ORDER BY salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  },
  {
    id: "hr-L1-100",
    domain: "hr",
    level: 1,
    order: 100,
    difficulty: "easy",
    title: "HR Query #100: JOB ROLES Analysis",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Could you retrieve job roles with minimum salary between $50k and $80k from the job_roles table? Display id, job_title, grade_level, min_salary, sorted by min_salary in descending order.",
    context_notes: "Workforce operational analysis on job_roles.",
    concepts: ["SELECT","WHERE","BETWEEN","ORDER BY"],
    expected_columns: ["id","job_title","grade_level","min_salary"],
    reference_sql: "SELECT id, job_title, grade_level, min_salary FROM job_roles WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter job_roles using WHERE min_salary BETWEEN 50000 AND 80000 ORDER BY min_salary DESC."
    ],
    starter_sql: "SELECT\n  -- Complete the query\nFROM \n;"
  }
];
