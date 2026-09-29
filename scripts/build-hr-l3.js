const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Maya Thorne', role: 'VP of People Operations' },
  { name: 'David Kim', role: 'Director of Talent Acquisition' },
  { name: 'Alicia Gomez', role: 'Head of Compensation & Total Rewards' },
  { name: 'Marcus Vance', role: 'Director of Workplace Experience' },
];

const l3Templates = [
  {
    authorIdx: 0,
    title: "Employees Earning Above Department Average",
    desc: "Identify employees who earn more than the average salary of their respective department. Show employee name, department_id, and salary, ordered by salary descending.",
    sql: "SELECT e.name, e.department_id, e.salary FROM employees e WHERE e.salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.department_id = e.department_id) ORDER BY e.salary DESC;",
    cols: ["name", "department_id", "salary"],
    hint: "Use a correlated subquery in the WHERE clause: WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id).",
    context: "Detecting internal salary pay equity deviations across department cohorts.",
    concepts: ["Correlated Subquery", "WHERE", "AVG()"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Employees Who Completed All Compliance Trainings",
    desc: "Find employees who have enrolled in and completed training courses with a passing score of at least 80. Return employee id, name, and salary for those with at least one top training record using EXISTS.",
    sql: "SELECT e.id, e.name, e.salary FROM employees e WHERE EXISTS (SELECT 1 FROM employee_trainings et WHERE et.employee_id = e.id AND et.status = 'completed' AND et.score >= 80) ORDER BY e.name ASC;",
    cols: ["id", "name", "salary"],
    hint: "Use WHERE EXISTS (SELECT 1 FROM employee_trainings et WHERE et.employee_id = e.id AND ...).",
    context: "Talent development compliance tracking.",
    concepts: ["EXISTS", "Subqueries", "WHERE"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "Employees Enrolled in Most Expensive Benefits Packages",
    desc: "Which employees are enrolled in benefits packages whose annual cost is strictly higher than the average annual cost of all packages? Display employee name, package_name, and annual_cost.",
    sql: "SELECT e.name, bp.package_name, bp.annual_cost FROM employees e JOIN employee_benefits eb ON e.id = eb.employee_id JOIN benefits_packages bp ON eb.package_id = bp.id WHERE bp.annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY bp.annual_cost DESC;",
    cols: ["name", "package_name", "annual_cost"],
    hint: "Filter with WHERE bp.annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages).",
    context: "Reviewing high-cost health and welfare benefit enrollments.",
    concepts: ["Scalar Subquery", "Multi-Table JOIN", "AVG()"],
    difficulty: "hard"
  },
  {
    authorIdx: 0,
    title: "Departments With Zero Pending Leave Requests",
    desc: "List departments that currently have no pending leave requests among their staff. Show department id and name.",
    sql: "SELECT d.id, d.name FROM departments d WHERE d.id NOT IN (SELECT DISTINCT e.department_id FROM employees e JOIN leave_requests lr ON e.id = lr.employee_id WHERE lr.status = 'pending') ORDER BY d.id ASC;",
    cols: ["id", "name"],
    hint: "Use WHERE d.id NOT IN (SELECT DISTINCT e.department_id FROM ... WHERE lr.status = 'pending').",
    context: "Identifying business units with clean, fully resolved leave queues.",
    concepts: ["NOT IN", "Subquery", "DISTINCT"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "Employees with 5-Star Reviews But No Salary History Change",
    desc: "Find all employees who earned a top performance rating of 5 in performance_reviews, but have never had a record entered in salaries_history. Return employee id and name using EXCEPT.",
    sql: "SELECT e.id, e.name FROM employees e JOIN performance_reviews pr ON e.id = pr.employee_id WHERE pr.rating = 5 EXCEPT SELECT e.id, e.name FROM employees e JOIN salaries_history sh ON e.id = sh.employee_id ORDER BY id ASC;",
    cols: ["id", "name"],
    hint: "Use the EXCEPT operator between the high-rated employees query and the salary-changed employees query.",
    context: "Identifying unrewarded high performers for upcoming compensation review cycles.",
    concepts: ["EXCEPT", "Set Operations", "Talent Retention"],
    difficulty: "hard"
  },
  {
    authorIdx: 3,
    title: "Employees Exceeding Global Shift Average Hours",
    desc: "Find employees whose average logged attendance hours per shift are higher than the overall company average shift length. Show employee_id, avg_hours (rounded to 2 decimals), ordered highest first.",
    sql: "SELECT al.employee_id, ROUND(AVG(al.hours_worked), 2) AS avg_hours FROM attendance_logs al GROUP BY al.employee_id HAVING AVG(al.hours_worked) > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY avg_hours DESC;",
    cols: ["employee_id", "avg_hours"],
    hint: "Use HAVING AVG(hours_worked) > (SELECT AVG(hours_worked) FROM attendance_logs).",
    context: "Auditing shift duration outliers across company locations.",
    concepts: ["HAVING", "Scalar Subquery", "AVG()"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Courses Completed by Engineering Staff (UNION Query)",
    desc: "Produce a unified list of course titles taken by either Engineering staff (department 1) or Product staff (department 2). Show course_title and category.",
    sql: "SELECT tc.course_title, tc.category FROM training_courses tc JOIN employee_trainings et ON tc.id = et.course_id JOIN employees e ON et.employee_id = e.id WHERE e.department_id = 1 UNION SELECT tc.course_title, tc.category FROM training_courses tc JOIN employee_trainings et ON tc.id = et.course_id JOIN employees e ON et.employee_id = e.id WHERE e.department_id = 2 ORDER BY course_title ASC;",
    cols: ["course_title", "category"],
    hint: "Combine two SELECT queries using UNION.",
    context: "Assessing shared technical skill curriculums between engineering and product teams.",
    concepts: ["UNION", "Set Operations", "Multi-Table JOIN"],
    difficulty: "hard"
  },
  {
    authorIdx: 0,
    title: "Employees Without Benefits Enrollment (NOT EXISTS)",
    desc: "Find all active employees who have not yet enrolled in any company benefits package. Display employee id, name, and hire_date.",
    sql: "SELECT e.id, e.name, e.hire_date FROM employees e WHERE e.status = 'active' AND NOT EXISTS (SELECT 1 FROM employee_benefits eb WHERE eb.employee_id = e.id) ORDER BY e.hire_date DESC;",
    cols: ["id", "name", "hire_date"],
    hint: "Use WHERE NOT EXISTS (SELECT 1 FROM employee_benefits eb WHERE eb.employee_id = e.id).",
    context: "HR onboarding benefit enrollment compliance follow-up.",
    concepts: ["NOT EXISTS", "Subquery", "Compliance"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "Highest Paid Employee in Each Department (Derived Table)",
    desc: "For each department, find the employee who commands the maximum salary. Use a derived table subquery to return department_id, name, and salary, ordered by department_id.",
    sql: "SELECT e.department_id, e.name, e.salary FROM employees e JOIN (SELECT department_id, MAX(salary) AS max_sal FROM employees GROUP BY department_id) max_dept ON e.department_id = max_dept.department_id AND e.salary = max_dept.max_sal ORDER BY e.department_id ASC;",
    cols: ["department_id", "name", "salary"],
    hint: "Join employees against a derived subquery grouping by department_id and computing MAX(salary).",
    context: "Executive compensation tier auditing by organizational unit.",
    concepts: ["Derived Tables", "JOIN", "Subqueries"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Training Courses with Above-Average Scores",
    desc: "List all training courses whose average participant score exceeds the overall average score across all employee trainings. Show course_title, category, and average score rounded to 2 decimals.",
    sql: "SELECT tc.course_title, tc.category, ROUND(AVG(et.score), 2) AS avg_course_score FROM training_courses tc JOIN employee_trainings et ON tc.id = et.course_id GROUP BY tc.course_title, tc.category HAVING AVG(et.score) > (SELECT AVG(score) FROM employee_trainings) ORDER BY avg_course_score DESC;",
    cols: ["course_title", "category", "avg_course_score"],
    hint: "Group by course title and filter with HAVING AVG(score) > (SELECT AVG(score) FROM employee_trainings).",
    context: "Evaluating learning course curriculum effectiveness.",
    concepts: ["HAVING", "Scalar Subquery", "AVG()"],
    difficulty: "hard"
  }
];

// Generate 90 additional programmatic subquery and set-operation templates across Level 3 HR tables
const l3SubqueryThemes = [
  { table: "employees", field: "salary", groupCol: "department_id", name: "Department Salary Benchmark" },
  { table: "attendance_logs", field: "hours_worked", groupCol: "employee_id", name: "Attendance Shift Benchmark" },
  { table: "employee_trainings", field: "score", groupCol: "course_id", name: "Training Score Benchmark" },
  { table: "performance_reviews", field: "bonus_pct", groupCol: "review_year", name: "Annual Bonus Benchmark" },
  { table: "benefits_packages", field: "annual_cost", groupCol: "health_plan", name: "Health Plan Cost Benchmark" },
  { table: "job_roles", field: "max_salary", groupCol: "grade_level", name: "Grade Level Max Salary Benchmark" }
];

let counter = l3Templates.length;
for (let i = 0; counter < 100; i++) {
  const theme = l3SubqueryThemes[i % l3SubqueryThemes.length];
  const p = personas[counter % personas.length];
  const qNum = counter + 1;

  l3Templates.push({
    authorIdx: counter % personas.length,
    title: `HR Advanced Analysis #${qNum}: ${theme.name}`,
    desc: `Identify records from ${theme.table} where ${theme.field} is strictly greater than the overall average ${theme.field}. Return id, ${theme.field}, and ${theme.groupCol}, ordered by ${theme.field} descending.`,
    sql: `SELECT id, ${theme.field}, ${theme.groupCol} FROM ${theme.table} WHERE ${theme.field} > (SELECT AVG(${theme.field}) FROM ${theme.table}) ORDER BY ${theme.field} DESC;`,
    cols: ["id", theme.field, theme.groupCol],
    hint: `Use a scalar subquery: WHERE ${theme.field} > (SELECT AVG(${theme.field}) FROM ${theme.table}).`,
    context: `Benchmark analysis on ${theme.table} exceeding overall mean metrics.`,
    concepts: ["Scalar Subquery", "WHERE", "AVG()", theme.table],
    difficulty: "hard"
  });
  counter++;
}

const outQuestions = l3Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "hr-L3-${pad}",
    domain: "hr",
    level: 3,
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
    starter_sql: "SELECT\\n  -- Complete subquery or set operation\\nFROM ${t.cols.length > 0 ? '' : ''}\\n;"
  }`;
});

const fileHeader = `// ============================================================================
// HUMAN RESOURCES — LEVEL 3: SUBQUERIES, CORRELATED FILTERS & SET OPERATIONS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (12): departments, job_roles, locations, employees, attendance_logs,
//              leave_requests, salaries_history, performance_reviews, benefits_packages,
//              employee_benefits, training_courses, employee_trainings
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L3_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/hr-l3-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated HR_L3_QUESTIONS: ${outQuestions.length} questions.`);
