// ============================================================================
// HUMAN RESOURCES — LEVEL 2: RELATIONAL JOINS & WORKFORCE AGGREGATIONS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (9): departments, job_roles, locations, employees, attendance_logs,
//             leave_requests, salaries_history, performance_reviews, benefits_packages
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L2_QUESTIONS: QuestionDefinition[] = [
  {
    id: "hr-L2-001",
    domain: "hr",
    level: 2,
    order: 1,
    difficulty: "medium",
    title: "Department Headcount and Total Payroll Expenditure",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Ahead of our quarterly budget rebalancing, calculate total headcount and total annual salary expenditure for each department. Show department name, employee count as headcount, and total salary, ordered by total salary descending.",
    context_notes: "Departmental payroll liability and staffing density evaluation.",
    concepts: ["LEFT JOIN","GROUP BY","SUM()","COUNT()"],
    expected_columns: ["name","headcount","total_payroll"],
    reference_sql: "SELECT d.name, COUNT(e.id) AS headcount, SUM(e.salary) AS total_payroll FROM departments d LEFT JOIN employees e ON d.id = e.department_id GROUP BY d.name ORDER BY total_payroll DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments with employees using LEFT JOIN on d.id = e.department_id and aggregate with COUNT() and SUM()."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-002",
    domain: "hr",
    level: 2,
    order: 2,
    difficulty: "medium",
    title: "Employee Job Title and Salary Grade Mapping",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Please provide a roster matching employees with their official job role. Display employee name, job_title, grade_level, and the employee's current salary, ordered alphabetically by employee name.",
    context_notes: "Organizational mapping of active staff to formal compensation grades.",
    concepts: ["INNER JOIN","SELECT","ORDER BY"],
    expected_columns: ["name","job_title","grade_level","salary"],
    reference_sql: "SELECT e.name, jr.job_title, jr.grade_level, e.salary FROM employees e JOIN job_roles jr ON e.role_id = jr.id ORDER BY e.name ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Perform an INNER JOIN between employees and job_roles on e.role_id = jr.id."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-003",
    domain: "hr",
    level: 2,
    order: 3,
    difficulty: "medium",
    title: "Average Performance Rating by Department",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "We need to identify department performance trends. Join departments, employees, and performance_reviews to calculate the average performance rating per department, showing department name and avg_rating, ordered highest rating first.",
    context_notes: "Calibrating annual performance review scores across business units.",
    concepts: ["Multi-Table JOIN","GROUP BY","AVG()","ROUND()"],
    expected_columns: ["name","avg_rating"],
    reference_sql: "SELECT d.name, ROUND(AVG(pr.rating), 2) AS avg_rating FROM departments d JOIN employees e ON d.id = e.department_id JOIN performance_reviews pr ON e.id = pr.employee_id GROUP BY d.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees to performance_reviews, grouping by department name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-004",
    domain: "hr",
    level: 2,
    order: 4,
    difficulty: "medium",
    title: "Salary History Growth Analysis",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employee who has had a salary adjustment, show their name, effective_date, previous_salary, new_salary, and the net increase (new_salary - previous_salary) as salary_increase, ordered by salary_increase descending.",
    context_notes: "Reviewing historical compensation increments and merit adjustments.",
    concepts: ["INNER JOIN","Arithmetic Expressions","ORDER BY"],
    expected_columns: ["name","effective_date","previous_salary","new_salary","salary_increase"],
    reference_sql: "SELECT e.name, sh.effective_date, sh.previous_salary, sh.new_salary, (sh.new_salary - sh.previous_salary) AS salary_increase FROM employees e JOIN salaries_history sh ON e.id = sh.employee_id ORDER BY salary_increase DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees and salaries_history on e.id = sh.employee_id, calculating (new_salary - previous_salary)."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-005",
    domain: "hr",
    level: 2,
    order: 5,
    difficulty: "medium",
    title: "Average Salary by Job Role Grade Level",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Calculate the average employee salary grouped by grade_level. Show grade_level, count of employees as role_count, and average salary rounded to 2 decimal places, ordered by grade_level.",
    context_notes: "Auditing internal salary benchmarks by formal career levels.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["grade_level","role_count","avg_salary"],
    reference_sql: "SELECT jr.grade_level, COUNT(e.id) AS role_count, ROUND(AVG(e.salary), 2) AS avg_salary FROM job_roles jr JOIN employees e ON jr.id = e.role_id GROUP BY jr.grade_level ORDER BY jr.grade_level ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles with employees and group by jr.grade_level."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-006",
    domain: "hr",
    level: 2,
    order: 6,
    difficulty: "medium",
    title: "Total Leave Days Taken per Employee",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Find all employees who have taken approved leave. Return employee name, total approved days taken (sum of total_days), and count of leave requests, ordered by total days descending.",
    context_notes: "Monitoring employee paid time off utilization.",
    concepts: ["INNER JOIN","WHERE","GROUP BY","SUM()"],
    expected_columns: ["name","total_leave_days","total_requests"],
    reference_sql: "SELECT e.name, SUM(lr.total_days) AS total_leave_days, COUNT(lr.id) AS total_requests FROM employees e JOIN leave_requests lr ON e.id = lr.employee_id WHERE lr.status = 'approved' GROUP BY e.name ORDER BY total_leave_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests, filtering WHERE lr.status = 'approved' and grouping by employee name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-007",
    domain: "hr",
    level: 2,
    order: 7,
    difficulty: "medium",
    title: "Total Hours Worked by Work Mode",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Aggregate our attendance logs to compare remote versus onsite work. Show work_mode, total_hours (sum of hours_worked), and average hours per shift, ordered by total_hours descending.",
    context_notes: "Comparing productivity hours across remote, hybrid, and onsite modalities.",
    concepts: ["GROUP BY","SUM()","AVG()"],
    expected_columns: ["work_mode","total_hours","avg_shift_hours"],
    reference_sql: "SELECT work_mode, SUM(hours_worked) AS total_hours, ROUND(AVG(hours_worked), 2) AS avg_shift_hours FROM attendance_logs GROUP BY work_mode ORDER BY total_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Group attendance_logs by work_mode and compute SUM and AVG."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-008",
    domain: "hr",
    level: 2,
    order: 8,
    difficulty: "medium",
    title: "Top Bonus Percentage Earners",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Retrieve employees who received a performance bonus of 10% or higher. Display employee name, review_year, rating, and bonus_pct, ordered by bonus_pct descending.",
    context_notes: "Executive review of top incentive compensation payouts.",
    concepts: ["INNER JOIN","WHERE","ORDER BY"],
    expected_columns: ["name","review_year","rating","bonus_pct"],
    reference_sql: "SELECT e.name, pr.review_year, pr.rating, pr.bonus_pct FROM employees e JOIN performance_reviews pr ON e.id = pr.employee_id WHERE pr.bonus_pct >= 10.0 ORDER BY pr.bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees and performance_reviews with WHERE pr.bonus_pct >= 10.0."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-009",
    domain: "hr",
    level: 2,
    order: 9,
    difficulty: "medium",
    title: "Departments with High Average Salary (HAVING Clause)",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify departments where the average employee salary exceeds $85,000. Display department name, employee count, and average salary, ordered by average salary descending.",
    context_notes: "Detecting high-cost department organizations.",
    concepts: ["INNER JOIN","GROUP BY","HAVING","AVG()"],
    expected_columns: ["name","employee_count","avg_salary"],
    reference_sql: "SELECT d.name, COUNT(e.id) AS employee_count, ROUND(AVG(e.salary), 2) AS avg_salary FROM departments d JOIN employees e ON d.id = e.department_id GROUP BY d.name HAVING AVG(e.salary) > 85000 ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use GROUP BY d.name HAVING AVG(e.salary) > 85000."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-010",
    domain: "hr",
    level: 2,
    order: 10,
    difficulty: "warm-up",
    title: "Benefits Packages Cost vs Retirement Match",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "List all benefits packages showing package_name, health_plan, retirement_match_pct, and annual_cost, ordered by annual_cost descending.",
    context_notes: "Reviewing employer benefit plan tier structures.",
    concepts: ["SELECT","ORDER BY"],
    expected_columns: ["package_name","health_plan","retirement_match_pct","annual_cost"],
    reference_sql: "SELECT package_name, health_plan, retirement_match_pct, annual_cost FROM benefits_packages ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Select the packages ordered by annual_cost DESC."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-011",
    domain: "hr",
    level: 2,
    order: 11,
    difficulty: "medium",
    title: "HR Relational Metric #11: Department Salary Metrics",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-012",
    domain: "hr",
    level: 2,
    order: 12,
    difficulty: "medium",
    title: "HR Relational Metric #12: Job Role Compensation Distribution",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-013",
    domain: "hr",
    level: 2,
    order: 13,
    difficulty: "medium",
    title: "HR Relational Metric #13: Employee Salary Adjustment History",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-014",
    domain: "hr",
    level: 2,
    order: 14,
    difficulty: "medium",
    title: "HR Relational Metric #14: Employee Performance Review Ratings",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-015",
    domain: "hr",
    level: 2,
    order: 15,
    difficulty: "medium",
    title: "HR Relational Metric #15: Employee Leave Duration Summary",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-016",
    domain: "hr",
    level: 2,
    order: 16,
    difficulty: "medium",
    title: "HR Relational Metric #16: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-017",
    domain: "hr",
    level: 2,
    order: 17,
    difficulty: "medium",
    title: "HR Relational Metric #17: Department Salary Metrics",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-018",
    domain: "hr",
    level: 2,
    order: 18,
    difficulty: "medium",
    title: "HR Relational Metric #18: Job Role Compensation Distribution",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-019",
    domain: "hr",
    level: 2,
    order: 19,
    difficulty: "medium",
    title: "HR Relational Metric #19: Employee Salary Adjustment History",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-020",
    domain: "hr",
    level: 2,
    order: 20,
    difficulty: "medium",
    title: "HR Relational Metric #20: Employee Performance Review Ratings",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-021",
    domain: "hr",
    level: 2,
    order: 21,
    difficulty: "medium",
    title: "HR Relational Metric #21: Employee Leave Duration Summary",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-022",
    domain: "hr",
    level: 2,
    order: 22,
    difficulty: "medium",
    title: "HR Relational Metric #22: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-023",
    domain: "hr",
    level: 2,
    order: 23,
    difficulty: "medium",
    title: "HR Relational Metric #23: Department Salary Metrics",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-024",
    domain: "hr",
    level: 2,
    order: 24,
    difficulty: "medium",
    title: "HR Relational Metric #24: Job Role Compensation Distribution",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-025",
    domain: "hr",
    level: 2,
    order: 25,
    difficulty: "medium",
    title: "HR Relational Metric #25: Employee Salary Adjustment History",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-026",
    domain: "hr",
    level: 2,
    order: 26,
    difficulty: "medium",
    title: "HR Relational Metric #26: Employee Performance Review Ratings",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-027",
    domain: "hr",
    level: 2,
    order: 27,
    difficulty: "medium",
    title: "HR Relational Metric #27: Employee Leave Duration Summary",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-028",
    domain: "hr",
    level: 2,
    order: 28,
    difficulty: "medium",
    title: "HR Relational Metric #28: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-029",
    domain: "hr",
    level: 2,
    order: 29,
    difficulty: "medium",
    title: "HR Relational Metric #29: Department Salary Metrics",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-030",
    domain: "hr",
    level: 2,
    order: 30,
    difficulty: "medium",
    title: "HR Relational Metric #30: Job Role Compensation Distribution",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-031",
    domain: "hr",
    level: 2,
    order: 31,
    difficulty: "medium",
    title: "HR Relational Metric #31: Employee Salary Adjustment History",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-032",
    domain: "hr",
    level: 2,
    order: 32,
    difficulty: "medium",
    title: "HR Relational Metric #32: Employee Performance Review Ratings",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-033",
    domain: "hr",
    level: 2,
    order: 33,
    difficulty: "medium",
    title: "HR Relational Metric #33: Employee Leave Duration Summary",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-034",
    domain: "hr",
    level: 2,
    order: 34,
    difficulty: "medium",
    title: "HR Relational Metric #34: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-035",
    domain: "hr",
    level: 2,
    order: 35,
    difficulty: "medium",
    title: "HR Relational Metric #35: Department Salary Metrics",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-036",
    domain: "hr",
    level: 2,
    order: 36,
    difficulty: "medium",
    title: "HR Relational Metric #36: Job Role Compensation Distribution",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-037",
    domain: "hr",
    level: 2,
    order: 37,
    difficulty: "medium",
    title: "HR Relational Metric #37: Employee Salary Adjustment History",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-038",
    domain: "hr",
    level: 2,
    order: 38,
    difficulty: "medium",
    title: "HR Relational Metric #38: Employee Performance Review Ratings",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-039",
    domain: "hr",
    level: 2,
    order: 39,
    difficulty: "medium",
    title: "HR Relational Metric #39: Employee Leave Duration Summary",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-040",
    domain: "hr",
    level: 2,
    order: 40,
    difficulty: "medium",
    title: "HR Relational Metric #40: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-041",
    domain: "hr",
    level: 2,
    order: 41,
    difficulty: "medium",
    title: "HR Relational Metric #41: Department Salary Metrics",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-042",
    domain: "hr",
    level: 2,
    order: 42,
    difficulty: "medium",
    title: "HR Relational Metric #42: Job Role Compensation Distribution",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-043",
    domain: "hr",
    level: 2,
    order: 43,
    difficulty: "medium",
    title: "HR Relational Metric #43: Employee Salary Adjustment History",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-044",
    domain: "hr",
    level: 2,
    order: 44,
    difficulty: "medium",
    title: "HR Relational Metric #44: Employee Performance Review Ratings",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-045",
    domain: "hr",
    level: 2,
    order: 45,
    difficulty: "medium",
    title: "HR Relational Metric #45: Employee Leave Duration Summary",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-046",
    domain: "hr",
    level: 2,
    order: 46,
    difficulty: "medium",
    title: "HR Relational Metric #46: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-047",
    domain: "hr",
    level: 2,
    order: 47,
    difficulty: "medium",
    title: "HR Relational Metric #47: Department Salary Metrics",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-048",
    domain: "hr",
    level: 2,
    order: 48,
    difficulty: "medium",
    title: "HR Relational Metric #48: Job Role Compensation Distribution",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-049",
    domain: "hr",
    level: 2,
    order: 49,
    difficulty: "medium",
    title: "HR Relational Metric #49: Employee Salary Adjustment History",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-050",
    domain: "hr",
    level: 2,
    order: 50,
    difficulty: "medium",
    title: "HR Relational Metric #50: Employee Performance Review Ratings",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-051",
    domain: "hr",
    level: 2,
    order: 51,
    difficulty: "medium",
    title: "HR Relational Metric #51: Employee Leave Duration Summary",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-052",
    domain: "hr",
    level: 2,
    order: 52,
    difficulty: "medium",
    title: "HR Relational Metric #52: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-053",
    domain: "hr",
    level: 2,
    order: 53,
    difficulty: "medium",
    title: "HR Relational Metric #53: Department Salary Metrics",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-054",
    domain: "hr",
    level: 2,
    order: 54,
    difficulty: "medium",
    title: "HR Relational Metric #54: Job Role Compensation Distribution",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-055",
    domain: "hr",
    level: 2,
    order: 55,
    difficulty: "medium",
    title: "HR Relational Metric #55: Employee Salary Adjustment History",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-056",
    domain: "hr",
    level: 2,
    order: 56,
    difficulty: "medium",
    title: "HR Relational Metric #56: Employee Performance Review Ratings",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-057",
    domain: "hr",
    level: 2,
    order: 57,
    difficulty: "medium",
    title: "HR Relational Metric #57: Employee Leave Duration Summary",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-058",
    domain: "hr",
    level: 2,
    order: 58,
    difficulty: "medium",
    title: "HR Relational Metric #58: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-059",
    domain: "hr",
    level: 2,
    order: 59,
    difficulty: "medium",
    title: "HR Relational Metric #59: Department Salary Metrics",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-060",
    domain: "hr",
    level: 2,
    order: 60,
    difficulty: "medium",
    title: "HR Relational Metric #60: Job Role Compensation Distribution",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-061",
    domain: "hr",
    level: 2,
    order: 61,
    difficulty: "medium",
    title: "HR Relational Metric #61: Employee Salary Adjustment History",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-062",
    domain: "hr",
    level: 2,
    order: 62,
    difficulty: "medium",
    title: "HR Relational Metric #62: Employee Performance Review Ratings",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-063",
    domain: "hr",
    level: 2,
    order: 63,
    difficulty: "medium",
    title: "HR Relational Metric #63: Employee Leave Duration Summary",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-064",
    domain: "hr",
    level: 2,
    order: 64,
    difficulty: "medium",
    title: "HR Relational Metric #64: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-065",
    domain: "hr",
    level: 2,
    order: 65,
    difficulty: "medium",
    title: "HR Relational Metric #65: Department Salary Metrics",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-066",
    domain: "hr",
    level: 2,
    order: 66,
    difficulty: "medium",
    title: "HR Relational Metric #66: Job Role Compensation Distribution",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-067",
    domain: "hr",
    level: 2,
    order: 67,
    difficulty: "medium",
    title: "HR Relational Metric #67: Employee Salary Adjustment History",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-068",
    domain: "hr",
    level: 2,
    order: 68,
    difficulty: "medium",
    title: "HR Relational Metric #68: Employee Performance Review Ratings",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-069",
    domain: "hr",
    level: 2,
    order: 69,
    difficulty: "medium",
    title: "HR Relational Metric #69: Employee Leave Duration Summary",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-070",
    domain: "hr",
    level: 2,
    order: 70,
    difficulty: "medium",
    title: "HR Relational Metric #70: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-071",
    domain: "hr",
    level: 2,
    order: 71,
    difficulty: "medium",
    title: "HR Relational Metric #71: Department Salary Metrics",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-072",
    domain: "hr",
    level: 2,
    order: 72,
    difficulty: "medium",
    title: "HR Relational Metric #72: Job Role Compensation Distribution",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-073",
    domain: "hr",
    level: 2,
    order: 73,
    difficulty: "medium",
    title: "HR Relational Metric #73: Employee Salary Adjustment History",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-074",
    domain: "hr",
    level: 2,
    order: 74,
    difficulty: "medium",
    title: "HR Relational Metric #74: Employee Performance Review Ratings",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-075",
    domain: "hr",
    level: 2,
    order: 75,
    difficulty: "medium",
    title: "HR Relational Metric #75: Employee Leave Duration Summary",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-076",
    domain: "hr",
    level: 2,
    order: 76,
    difficulty: "medium",
    title: "HR Relational Metric #76: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-077",
    domain: "hr",
    level: 2,
    order: 77,
    difficulty: "medium",
    title: "HR Relational Metric #77: Department Salary Metrics",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-078",
    domain: "hr",
    level: 2,
    order: 78,
    difficulty: "medium",
    title: "HR Relational Metric #78: Job Role Compensation Distribution",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-079",
    domain: "hr",
    level: 2,
    order: 79,
    difficulty: "medium",
    title: "HR Relational Metric #79: Employee Salary Adjustment History",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-080",
    domain: "hr",
    level: 2,
    order: 80,
    difficulty: "medium",
    title: "HR Relational Metric #80: Employee Performance Review Ratings",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-081",
    domain: "hr",
    level: 2,
    order: 81,
    difficulty: "medium",
    title: "HR Relational Metric #81: Employee Leave Duration Summary",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-082",
    domain: "hr",
    level: 2,
    order: 82,
    difficulty: "medium",
    title: "HR Relational Metric #82: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-083",
    domain: "hr",
    level: 2,
    order: 83,
    difficulty: "medium",
    title: "HR Relational Metric #83: Department Salary Metrics",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-084",
    domain: "hr",
    level: 2,
    order: 84,
    difficulty: "medium",
    title: "HR Relational Metric #84: Job Role Compensation Distribution",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-085",
    domain: "hr",
    level: 2,
    order: 85,
    difficulty: "medium",
    title: "HR Relational Metric #85: Employee Salary Adjustment History",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-086",
    domain: "hr",
    level: 2,
    order: 86,
    difficulty: "medium",
    title: "HR Relational Metric #86: Employee Performance Review Ratings",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-087",
    domain: "hr",
    level: 2,
    order: 87,
    difficulty: "medium",
    title: "HR Relational Metric #87: Employee Leave Duration Summary",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-088",
    domain: "hr",
    level: 2,
    order: 88,
    difficulty: "medium",
    title: "HR Relational Metric #88: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-089",
    domain: "hr",
    level: 2,
    order: 89,
    difficulty: "medium",
    title: "HR Relational Metric #89: Department Salary Metrics",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-090",
    domain: "hr",
    level: 2,
    order: 90,
    difficulty: "medium",
    title: "HR Relational Metric #90: Job Role Compensation Distribution",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-091",
    domain: "hr",
    level: 2,
    order: 91,
    difficulty: "medium",
    title: "HR Relational Metric #91: Employee Salary Adjustment History",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-092",
    domain: "hr",
    level: 2,
    order: 92,
    difficulty: "medium",
    title: "HR Relational Metric #92: Employee Performance Review Ratings",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-093",
    domain: "hr",
    level: 2,
    order: 93,
    difficulty: "medium",
    title: "HR Relational Metric #93: Employee Leave Duration Summary",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-094",
    domain: "hr",
    level: 2,
    order: 94,
    difficulty: "medium",
    title: "HR Relational Metric #94: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-095",
    domain: "hr",
    level: 2,
    order: 95,
    difficulty: "medium",
    title: "HR Relational Metric #95: Department Salary Metrics",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each departments, calculate the total and average salary from employees. Display the name, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between departments and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM departments a JOIN employees b ON a.id = b.department_id GROUP BY a.name ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join departments to employees on a.id = b.department_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-096",
    domain: "hr",
    level: 2,
    order: 96,
    difficulty: "medium",
    title: "HR Relational Metric #96: Job Role Compensation Distribution",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each job_roles, calculate the total and average salary from employees. Display the job_title, total count of records, and average salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between job_roles and employees.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["job_title","total_records","avg_salary"],
    reference_sql: "SELECT a.job_title, COUNT(b.id) AS total_records, ROUND(AVG(b.salary), 2) AS avg_salary FROM job_roles a JOIN employees b ON a.id = b.role_id GROUP BY a.job_title ORDER BY avg_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join job_roles to employees on a.id = b.role_id and group by a.job_title."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-097",
    domain: "hr",
    level: 2,
    order: 97,
    difficulty: "medium",
    title: "HR Relational Metric #97: Employee Salary Adjustment History",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "For each employees, calculate the total and average new_salary from salaries_history. Display the name, total count of records, and average new_salary rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and salaries_history.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_new_salary"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.new_salary), 2) AS avg_new_salary FROM employees a JOIN salaries_history b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to salaries_history on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-098",
    domain: "hr",
    level: 2,
    order: 98,
    difficulty: "medium",
    title: "HR Relational Metric #98: Employee Performance Review Ratings",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each employees, calculate the total and average rating from performance_reviews. Display the name, total count of records, and average rating rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and performance_reviews.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_rating"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.rating), 2) AS avg_rating FROM employees a JOIN performance_reviews b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_rating DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to performance_reviews on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-099",
    domain: "hr",
    level: 2,
    order: 99,
    difficulty: "medium",
    title: "HR Relational Metric #99: Employee Leave Duration Summary",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each employees, calculate the total and average total_days from leave_requests. Display the name, total count of records, and average total_days rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and leave_requests.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_total_days"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.total_days), 2) AS avg_total_days FROM employees a JOIN leave_requests b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to leave_requests on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  },
  {
    id: "hr-L2-100",
    domain: "hr",
    level: 2,
    order: 100,
    difficulty: "medium",
    title: "HR Relational Metric #100: Employee Shift Attendance Aggregates",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employees, calculate the total and average hours_worked from attendance_logs. Display the name, total count of records, and average hours_worked rounded to 2 decimal places, ordered by average descending.",
    context_notes: "Cross-table relational aggregation between employees and attendance_logs.",
    concepts: ["INNER JOIN","GROUP BY","AVG()","COUNT()"],
    expected_columns: ["name","total_records","avg_hours_worked"],
    reference_sql: "SELECT a.name, COUNT(b.id) AS total_records, ROUND(AVG(b.hours_worked), 2) AS avg_hours_worked FROM employees a JOIN attendance_logs b ON a.id = b.employee_id GROUP BY a.name ORDER BY avg_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees to attendance_logs on a.id = b.employee_id and group by a.name."
    ],
    starter_sql: "SELECT\n  -- Complete relational join query\nFROM \n;"
  }
];
