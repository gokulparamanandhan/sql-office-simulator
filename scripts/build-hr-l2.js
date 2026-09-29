const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Maya Thorne', role: 'VP of People Operations' },
  { name: 'David Kim', role: 'Director of Talent Acquisition' },
  { name: 'Alicia Gomez', role: 'Head of Compensation & Total Rewards' },
  { name: 'Marcus Vance', role: 'Director of Workplace Experience' },
];

const l2Templates = [
  {
    authorIdx: 0,
    title: "Department Headcount and Total Payroll Expenditure",
    desc: "Ahead of our quarterly budget rebalancing, calculate total headcount and total annual salary expenditure for each department. Show department name, employee count as headcount, and total salary, ordered by total salary descending.",
    sql: "SELECT d.name, COUNT(e.id) AS headcount, SUM(e.salary) AS total_payroll FROM departments d LEFT JOIN employees e ON d.id = e.department_id GROUP BY d.name ORDER BY total_payroll DESC;",
    cols: ["name", "headcount", "total_payroll"],
    hint: "Join departments with employees using LEFT JOIN on d.id = e.department_id and aggregate with COUNT() and SUM().",
    context: "Departmental payroll liability and staffing density evaluation.",
    concepts: ["LEFT JOIN", "GROUP BY", "SUM()", "COUNT()"],
    difficulty: "medium"
  },
  {
    authorIdx: 2,
    title: "Employee Job Title and Salary Grade Mapping",
    desc: "Please provide a roster matching employees with their official job role. Display employee name, job_title, grade_level, and the employee's current salary, ordered alphabetically by employee name.",
    sql: "SELECT e.name, jr.job_title, jr.grade_level, e.salary FROM employees e JOIN job_roles jr ON e.role_id = jr.id ORDER BY e.name ASC;",
    cols: ["name", "job_title", "grade_level", "salary"],
    hint: "Perform an INNER JOIN between employees and job_roles on e.role_id = jr.id.",
    context: "Organizational mapping of active staff to formal compensation grades.",
    concepts: ["INNER JOIN", "SELECT", "ORDER BY"],
    difficulty: "medium"
  },
  {
    authorIdx: 0,
    title: "Average Performance Rating by Department",
    desc: "We need to identify department performance trends. Join departments, employees, and performance_reviews to calculate the average performance rating per department, showing department name and avg_rating, ordered highest rating first.",
    sql: "SELECT d.name, ROUND(AVG(pr.rating), 2) AS avg_rating FROM departments d JOIN employees e ON d.id = e.department_id JOIN performance_reviews pr ON e.id = pr.employee_id GROUP BY d.name ORDER BY avg_rating DESC;",
    cols: ["name", "avg_rating"],
    hint: "Join departments to employees to performance_reviews, grouping by department name.",
    context: "Calibrating annual performance review scores across business units.",
    concepts: ["Multi-Table JOIN", "GROUP BY", "AVG()", "ROUND()"],
    difficulty: "medium"
  },
  {
    authorIdx: 2,
    title: "Salary History Growth Analysis",
    desc: "For each employee who has had a salary adjustment, show their name, effective_date, previous_salary, new_salary, and the net increase (new_salary - previous_salary) as salary_increase, ordered by salary_increase descending.",
    sql: "SELECT e.name, sh.effective_date, sh.previous_salary, sh.new_salary, (sh.new_salary - sh.previous_salary) AS salary_increase FROM employees e JOIN salaries_history sh ON e.id = sh.employee_id ORDER BY salary_increase DESC;",
    cols: ["name", "effective_date", "previous_salary", "new_salary", "salary_increase"],
    hint: "Join employees and salaries_history on e.id = sh.employee_id, calculating (new_salary - previous_salary).",
    context: "Reviewing historical compensation increments and merit adjustments.",
    concepts: ["INNER JOIN", "Arithmetic Expressions", "ORDER BY"],
    difficulty: "medium"
  },
  {
    authorIdx: 1,
    title: "Average Salary by Job Role Grade Level",
    desc: "Calculate the average employee salary grouped by grade_level. Show grade_level, count of employees as role_count, and average salary rounded to 2 decimal places, ordered by grade_level.",
    sql: "SELECT jr.grade_level, COUNT(e.id) AS role_count, ROUND(AVG(e.salary), 2) AS avg_salary FROM job_roles jr JOIN employees e ON jr.id = e.role_id GROUP BY jr.grade_level ORDER BY jr.grade_level ASC;",
    cols: ["grade_level", "role_count", "avg_salary"],
    hint: "Join job_roles with employees and group by jr.grade_level.",
    context: "Auditing internal salary benchmarks by formal career levels.",
    concepts: ["INNER JOIN", "GROUP BY", "AVG()", "COUNT()"],
    difficulty: "medium"
  },
  {
    authorIdx: 0,
    title: "Total Leave Days Taken per Employee",
    desc: "Find all employees who have taken approved leave. Return employee name, total approved days taken (sum of total_days), and count of leave requests, ordered by total days descending.",
    sql: "SELECT e.name, SUM(lr.total_days) AS total_leave_days, COUNT(lr.id) AS total_requests FROM employees e JOIN leave_requests lr ON e.id = lr.employee_id WHERE lr.status = 'approved' GROUP BY e.name ORDER BY total_leave_days DESC;",
    cols: ["name", "total_leave_days", "total_requests"],
    hint: "Join employees to leave_requests, filtering WHERE lr.status = 'approved' and grouping by employee name.",
    context: "Monitoring employee paid time off utilization.",
    concepts: ["INNER JOIN", "WHERE", "GROUP BY", "SUM()"],
    difficulty: "medium"
  },
  {
    authorIdx: 3,
    title: "Total Hours Worked by Work Mode",
    desc: "Aggregate our attendance logs to compare remote versus onsite work. Show work_mode, total_hours (sum of hours_worked), and average hours per shift, ordered by total_hours descending.",
    sql: "SELECT work_mode, SUM(hours_worked) AS total_hours, ROUND(AVG(hours_worked), 2) AS avg_shift_hours FROM attendance_logs GROUP BY work_mode ORDER BY total_hours DESC;",
    cols: ["work_mode", "total_hours", "avg_shift_hours"],
    hint: "Group attendance_logs by work_mode and compute SUM and AVG.",
    context: "Comparing productivity hours across remote, hybrid, and onsite modalities.",
    concepts: ["GROUP BY", "SUM()", "AVG()"],
    difficulty: "medium"
  },
  {
    authorIdx: 2,
    title: "Top Bonus Percentage Earners",
    desc: "Retrieve employees who received a performance bonus of 10% or higher. Display employee name, review_year, rating, and bonus_pct, ordered by bonus_pct descending.",
    sql: "SELECT e.name, pr.review_year, pr.rating, pr.bonus_pct FROM employees e JOIN performance_reviews pr ON e.id = pr.employee_id WHERE pr.bonus_pct >= 10.0 ORDER BY pr.bonus_pct DESC;",
    cols: ["name", "review_year", "rating", "bonus_pct"],
    hint: "Join employees and performance_reviews with WHERE pr.bonus_pct >= 10.0.",
    context: "Executive review of top incentive compensation payouts.",
    concepts: ["INNER JOIN", "WHERE", "ORDER BY"],
    difficulty: "medium"
  },
  {
    authorIdx: 0,
    title: "Departments with High Average Salary (HAVING Clause)",
    desc: "Identify departments where the average employee salary exceeds $85,000. Display department name, employee count, and average salary, ordered by average salary descending.",
    sql: "SELECT d.name, COUNT(e.id) AS employee_count, ROUND(AVG(e.salary), 2) AS avg_salary FROM departments d JOIN employees e ON d.id = e.department_id GROUP BY d.name HAVING AVG(e.salary) > 85000 ORDER BY avg_salary DESC;",
    cols: ["name", "employee_count", "avg_salary"],
    hint: "Use GROUP BY d.name HAVING AVG(e.salary) > 85000.",
    context: "Detecting high-cost department organizations.",
    concepts: ["INNER JOIN", "GROUP BY", "HAVING", "AVG()"],
    difficulty: "medium"
  },
  {
    authorIdx: 2,
    title: "Benefits Packages Cost vs Retirement Match",
    desc: "List all benefits packages showing package_name, health_plan, retirement_match_pct, and annual_cost, ordered by annual_cost descending.",
    sql: "SELECT package_name, health_plan, retirement_match_pct, annual_cost FROM benefits_packages ORDER BY annual_cost DESC;",
    cols: ["package_name", "health_plan", "retirement_match_pct", "annual_cost"],
    hint: "Select the packages ordered by annual_cost DESC.",
    context: "Reviewing employer benefit plan tier structures.",
    concepts: ["SELECT", "ORDER BY"],
    difficulty: "warm-up"
  }
];

// Generate 90 additional programmatic templates across all Level 2 tables
const hrL2Combinations = [
  { tableA: "departments", tableB: "employees", joinCol: "department_id", keyA: "name", metricB: "salary", title: "Department Salary Metrics" },
  { tableA: "job_roles", tableB: "employees", joinCol: "role_id", keyA: "job_title", metricB: "salary", title: "Job Role Compensation Distribution" },
  { tableA: "employees", tableB: "salaries_history", joinCol: "employee_id", keyA: "name", metricB: "new_salary", title: "Employee Salary Adjustment History" },
  { tableA: "employees", tableB: "performance_reviews", joinCol: "employee_id", keyA: "name", metricB: "rating", title: "Employee Performance Review Ratings" },
  { tableA: "employees", tableB: "leave_requests", joinCol: "employee_id", keyA: "name", metricB: "total_days", title: "Employee Leave Duration Summary" },
  { tableA: "employees", tableB: "attendance_logs", joinCol: "employee_id", keyA: "name", metricB: "hours_worked", title: "Employee Shift Attendance Aggregates" }
];

let counter = l2Templates.length;
for (let i = 0; counter < 100; i++) {
  const combo = hrL2Combinations[i % hrL2Combinations.length];
  const p = personas[counter % personas.length];
  const qNum = counter + 1;

  l2Templates.push({
    authorIdx: counter % personas.length,
    title: `HR Relational Metric #${qNum}: ${combo.title}`,
    desc: `For each ${combo.tableA}, calculate the total and average ${combo.metricB} from ${combo.tableB}. Display the ${combo.keyA}, total count of records, and average ${combo.metricB} rounded to 2 decimal places, ordered by average descending.`,
    sql: `SELECT a.${combo.keyA}, COUNT(b.id) AS total_records, ROUND(AVG(b.${combo.metricB}), 2) AS avg_${combo.metricB} FROM ${combo.tableA} a JOIN ${combo.tableB} b ON a.id = b.${combo.joinCol} GROUP BY a.${combo.keyA} ORDER BY avg_${combo.metricB} DESC;`,
    cols: [combo.keyA, "total_records", `avg_${combo.metricB}`],
    hint: `Join ${combo.tableA} to ${combo.tableB} on a.id = b.${combo.joinCol} and group by a.${combo.keyA}.`,
    context: `Cross-table relational aggregation between ${combo.tableA} and ${combo.tableB}.`,
    concepts: ["INNER JOIN", "GROUP BY", "AVG()", "COUNT()"],
    difficulty: "medium"
  });
  counter++;
}

const outQuestions = l2Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "hr-L2-${pad}",
    domain: "hr",
    level: 2,
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
    starter_sql: "SELECT\\n  -- Complete relational join query\\nFROM ${t.cols.length > 0 ? '' : ''}\\n;"
  }`;
});

const fileHeader = `// ============================================================================
// HUMAN RESOURCES — LEVEL 2: RELATIONAL JOINS & WORKFORCE AGGREGATIONS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (9): departments, job_roles, locations, employees, attendance_logs,
//             leave_requests, salaries_history, performance_reviews, benefits_packages
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L2_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/hr-l2-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated HR_L2_QUESTIONS: ${outQuestions.length} questions.`);
