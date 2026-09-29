// ============================================================================
// HUMAN RESOURCES — LEVEL 3: SUBQUERIES, CORRELATED FILTERS & SET OPERATIONS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (12): departments, job_roles, locations, employees, attendance_logs,
//              leave_requests, salaries_history, performance_reviews, benefits_packages,
//              employee_benefits, training_courses, employee_trainings
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L3_QUESTIONS: QuestionDefinition[] = [
  {
    id: "hr-L3-001",
    domain: "hr",
    level: 3,
    order: 1,
    difficulty: "hard",
    title: "Employees Earning Above Department Average",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify employees who earn more than the average salary of their respective department. Show employee name, department_id, and salary, ordered by salary descending.",
    context_notes: "Detecting internal salary pay equity deviations across department cohorts.",
    concepts: ["Correlated Subquery","WHERE","AVG()"],
    expected_columns: ["name","department_id","salary"],
    reference_sql: "SELECT e.name, e.department_id, e.salary FROM employees e WHERE e.salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.department_id = e.department_id) ORDER BY e.salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a correlated subquery in the WHERE clause: WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-002",
    domain: "hr",
    level: 3,
    order: 2,
    difficulty: "hard",
    title: "Employees Who Completed All Compliance Trainings",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Find employees who have enrolled in and completed training courses with a passing score of at least 80. Return employee id, name, and salary for those with at least one top training record using EXISTS.",
    context_notes: "Talent development compliance tracking.",
    concepts: ["EXISTS","Subqueries","WHERE"],
    expected_columns: ["id","name","salary"],
    reference_sql: "SELECT e.id, e.name, e.salary FROM employees e WHERE EXISTS (SELECT 1 FROM employee_trainings et WHERE et.employee_id = e.id AND et.status = 'completed' AND et.score >= 80) ORDER BY e.name ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE EXISTS (SELECT 1 FROM employee_trainings et WHERE et.employee_id = e.id AND ...)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-003",
    domain: "hr",
    level: 3,
    order: 3,
    difficulty: "hard",
    title: "Employees Enrolled in Most Expensive Benefits Packages",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Which employees are enrolled in benefits packages whose annual cost is strictly higher than the average annual cost of all packages? Display employee name, package_name, and annual_cost.",
    context_notes: "Reviewing high-cost health and welfare benefit enrollments.",
    concepts: ["Scalar Subquery","Multi-Table JOIN","AVG()"],
    expected_columns: ["name","package_name","annual_cost"],
    reference_sql: "SELECT e.name, bp.package_name, bp.annual_cost FROM employees e JOIN employee_benefits eb ON e.id = eb.employee_id JOIN benefits_packages bp ON eb.package_id = bp.id WHERE bp.annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY bp.annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter with WHERE bp.annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-004",
    domain: "hr",
    level: 3,
    order: 4,
    difficulty: "hard",
    title: "Departments With Zero Pending Leave Requests",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "List departments that currently have no pending leave requests among their staff. Show department id and name.",
    context_notes: "Identifying business units with clean, fully resolved leave queues.",
    concepts: ["NOT IN","Subquery","DISTINCT"],
    expected_columns: ["id","name"],
    reference_sql: "SELECT d.id, d.name FROM departments d WHERE d.id NOT IN (SELECT DISTINCT e.department_id FROM employees e JOIN leave_requests lr ON e.id = lr.employee_id WHERE lr.status = 'pending') ORDER BY d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE d.id NOT IN (SELECT DISTINCT e.department_id FROM ... WHERE lr.status = 'pending')."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-005",
    domain: "hr",
    level: 3,
    order: 5,
    difficulty: "hard",
    title: "Employees with 5-Star Reviews But No Salary History Change",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Find all employees who earned a top performance rating of 5 in performance_reviews, but have never had a record entered in salaries_history. Return employee id and name using EXCEPT.",
    context_notes: "Identifying unrewarded high performers for upcoming compensation review cycles.",
    concepts: ["EXCEPT","Set Operations","Talent Retention"],
    expected_columns: ["id","name"],
    reference_sql: "SELECT e.id, e.name FROM employees e JOIN performance_reviews pr ON e.id = pr.employee_id WHERE pr.rating = 5 EXCEPT SELECT e.id, e.name FROM employees e JOIN salaries_history sh ON e.id = sh.employee_id ORDER BY id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the EXCEPT operator between the high-rated employees query and the salary-changed employees query."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-006",
    domain: "hr",
    level: 3,
    order: 6,
    difficulty: "hard",
    title: "Employees Exceeding Global Shift Average Hours",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Find employees whose average logged attendance hours per shift are higher than the overall company average shift length. Show employee_id, avg_hours (rounded to 2 decimals), ordered highest first.",
    context_notes: "Auditing shift duration outliers across company locations.",
    concepts: ["HAVING","Scalar Subquery","AVG()"],
    expected_columns: ["employee_id","avg_hours"],
    reference_sql: "SELECT al.employee_id, ROUND(AVG(al.hours_worked), 2) AS avg_hours FROM attendance_logs al GROUP BY al.employee_id HAVING AVG(al.hours_worked) > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY avg_hours DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use HAVING AVG(hours_worked) > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-007",
    domain: "hr",
    level: 3,
    order: 7,
    difficulty: "hard",
    title: "Courses Completed by Engineering Staff (UNION Query)",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Produce a unified list of course titles taken by either Engineering staff (department 1) or Product staff (department 2). Show course_title and category.",
    context_notes: "Assessing shared technical skill curriculums between engineering and product teams.",
    concepts: ["UNION","Set Operations","Multi-Table JOIN"],
    expected_columns: ["course_title","category"],
    reference_sql: "SELECT tc.course_title, tc.category FROM training_courses tc JOIN employee_trainings et ON tc.id = et.course_id JOIN employees e ON et.employee_id = e.id WHERE e.department_id = 1 UNION SELECT tc.course_title, tc.category FROM training_courses tc JOIN employee_trainings et ON tc.id = et.course_id JOIN employees e ON et.employee_id = e.id WHERE e.department_id = 2 ORDER BY course_title ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Combine two SELECT queries using UNION."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-008",
    domain: "hr",
    level: 3,
    order: 8,
    difficulty: "hard",
    title: "Employees Without Benefits Enrollment (NOT EXISTS)",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Find all active employees who have not yet enrolled in any company benefits package. Display employee id, name, and hire_date.",
    context_notes: "HR onboarding benefit enrollment compliance follow-up.",
    concepts: ["NOT EXISTS","Subquery","Compliance"],
    expected_columns: ["id","name","hire_date"],
    reference_sql: "SELECT e.id, e.name, e.hire_date FROM employees e WHERE e.status = 'active' AND NOT EXISTS (SELECT 1 FROM employee_benefits eb WHERE eb.employee_id = e.id) ORDER BY e.hire_date DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use WHERE NOT EXISTS (SELECT 1 FROM employee_benefits eb WHERE eb.employee_id = e.id)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-009",
    domain: "hr",
    level: 3,
    order: 9,
    difficulty: "hard",
    title: "Highest Paid Employee in Each Department (Derived Table)",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each department, find the employee who commands the maximum salary. Use a derived table subquery to return department_id, name, and salary, ordered by department_id.",
    context_notes: "Executive compensation tier auditing by organizational unit.",
    concepts: ["Derived Tables","JOIN","Subqueries"],
    expected_columns: ["department_id","name","salary"],
    reference_sql: "SELECT e.department_id, e.name, e.salary FROM employees e JOIN (SELECT department_id, MAX(salary) AS max_sal FROM employees GROUP BY department_id) max_dept ON e.department_id = max_dept.department_id AND e.salary = max_dept.max_sal ORDER BY e.department_id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join employees against a derived subquery grouping by department_id and computing MAX(salary)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-010",
    domain: "hr",
    level: 3,
    order: 10,
    difficulty: "hard",
    title: "Training Courses with Above-Average Scores",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "List all training courses whose average participant score exceeds the overall average score across all employee trainings. Show course_title, category, and average score rounded to 2 decimals.",
    context_notes: "Evaluating learning course curriculum effectiveness.",
    concepts: ["HAVING","Scalar Subquery","AVG()"],
    expected_columns: ["course_title","category","avg_course_score"],
    reference_sql: "SELECT tc.course_title, tc.category, ROUND(AVG(et.score), 2) AS avg_course_score FROM training_courses tc JOIN employee_trainings et ON tc.id = et.course_id GROUP BY tc.course_title, tc.category HAVING AVG(et.score) > (SELECT AVG(score) FROM employee_trainings) ORDER BY avg_course_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Group by course title and filter with HAVING AVG(score) > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-011",
    domain: "hr",
    level: 3,
    order: 11,
    difficulty: "hard",
    title: "HR Advanced Analysis #11: Department Salary Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-012",
    domain: "hr",
    level: 3,
    order: 12,
    difficulty: "hard",
    title: "HR Advanced Analysis #12: Attendance Shift Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-013",
    domain: "hr",
    level: 3,
    order: 13,
    difficulty: "hard",
    title: "HR Advanced Analysis #13: Training Score Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-014",
    domain: "hr",
    level: 3,
    order: 14,
    difficulty: "hard",
    title: "HR Advanced Analysis #14: Annual Bonus Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-015",
    domain: "hr",
    level: 3,
    order: 15,
    difficulty: "hard",
    title: "HR Advanced Analysis #15: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-016",
    domain: "hr",
    level: 3,
    order: 16,
    difficulty: "hard",
    title: "HR Advanced Analysis #16: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-017",
    domain: "hr",
    level: 3,
    order: 17,
    difficulty: "hard",
    title: "HR Advanced Analysis #17: Department Salary Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-018",
    domain: "hr",
    level: 3,
    order: 18,
    difficulty: "hard",
    title: "HR Advanced Analysis #18: Attendance Shift Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-019",
    domain: "hr",
    level: 3,
    order: 19,
    difficulty: "hard",
    title: "HR Advanced Analysis #19: Training Score Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-020",
    domain: "hr",
    level: 3,
    order: 20,
    difficulty: "hard",
    title: "HR Advanced Analysis #20: Annual Bonus Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-021",
    domain: "hr",
    level: 3,
    order: 21,
    difficulty: "hard",
    title: "HR Advanced Analysis #21: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-022",
    domain: "hr",
    level: 3,
    order: 22,
    difficulty: "hard",
    title: "HR Advanced Analysis #22: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-023",
    domain: "hr",
    level: 3,
    order: 23,
    difficulty: "hard",
    title: "HR Advanced Analysis #23: Department Salary Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-024",
    domain: "hr",
    level: 3,
    order: 24,
    difficulty: "hard",
    title: "HR Advanced Analysis #24: Attendance Shift Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-025",
    domain: "hr",
    level: 3,
    order: 25,
    difficulty: "hard",
    title: "HR Advanced Analysis #25: Training Score Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-026",
    domain: "hr",
    level: 3,
    order: 26,
    difficulty: "hard",
    title: "HR Advanced Analysis #26: Annual Bonus Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-027",
    domain: "hr",
    level: 3,
    order: 27,
    difficulty: "hard",
    title: "HR Advanced Analysis #27: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-028",
    domain: "hr",
    level: 3,
    order: 28,
    difficulty: "hard",
    title: "HR Advanced Analysis #28: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-029",
    domain: "hr",
    level: 3,
    order: 29,
    difficulty: "hard",
    title: "HR Advanced Analysis #29: Department Salary Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-030",
    domain: "hr",
    level: 3,
    order: 30,
    difficulty: "hard",
    title: "HR Advanced Analysis #30: Attendance Shift Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-031",
    domain: "hr",
    level: 3,
    order: 31,
    difficulty: "hard",
    title: "HR Advanced Analysis #31: Training Score Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-032",
    domain: "hr",
    level: 3,
    order: 32,
    difficulty: "hard",
    title: "HR Advanced Analysis #32: Annual Bonus Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-033",
    domain: "hr",
    level: 3,
    order: 33,
    difficulty: "hard",
    title: "HR Advanced Analysis #33: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-034",
    domain: "hr",
    level: 3,
    order: 34,
    difficulty: "hard",
    title: "HR Advanced Analysis #34: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-035",
    domain: "hr",
    level: 3,
    order: 35,
    difficulty: "hard",
    title: "HR Advanced Analysis #35: Department Salary Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-036",
    domain: "hr",
    level: 3,
    order: 36,
    difficulty: "hard",
    title: "HR Advanced Analysis #36: Attendance Shift Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-037",
    domain: "hr",
    level: 3,
    order: 37,
    difficulty: "hard",
    title: "HR Advanced Analysis #37: Training Score Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-038",
    domain: "hr",
    level: 3,
    order: 38,
    difficulty: "hard",
    title: "HR Advanced Analysis #38: Annual Bonus Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-039",
    domain: "hr",
    level: 3,
    order: 39,
    difficulty: "hard",
    title: "HR Advanced Analysis #39: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-040",
    domain: "hr",
    level: 3,
    order: 40,
    difficulty: "hard",
    title: "HR Advanced Analysis #40: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-041",
    domain: "hr",
    level: 3,
    order: 41,
    difficulty: "hard",
    title: "HR Advanced Analysis #41: Department Salary Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-042",
    domain: "hr",
    level: 3,
    order: 42,
    difficulty: "hard",
    title: "HR Advanced Analysis #42: Attendance Shift Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-043",
    domain: "hr",
    level: 3,
    order: 43,
    difficulty: "hard",
    title: "HR Advanced Analysis #43: Training Score Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-044",
    domain: "hr",
    level: 3,
    order: 44,
    difficulty: "hard",
    title: "HR Advanced Analysis #44: Annual Bonus Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-045",
    domain: "hr",
    level: 3,
    order: 45,
    difficulty: "hard",
    title: "HR Advanced Analysis #45: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-046",
    domain: "hr",
    level: 3,
    order: 46,
    difficulty: "hard",
    title: "HR Advanced Analysis #46: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-047",
    domain: "hr",
    level: 3,
    order: 47,
    difficulty: "hard",
    title: "HR Advanced Analysis #47: Department Salary Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-048",
    domain: "hr",
    level: 3,
    order: 48,
    difficulty: "hard",
    title: "HR Advanced Analysis #48: Attendance Shift Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-049",
    domain: "hr",
    level: 3,
    order: 49,
    difficulty: "hard",
    title: "HR Advanced Analysis #49: Training Score Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-050",
    domain: "hr",
    level: 3,
    order: 50,
    difficulty: "hard",
    title: "HR Advanced Analysis #50: Annual Bonus Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-051",
    domain: "hr",
    level: 3,
    order: 51,
    difficulty: "hard",
    title: "HR Advanced Analysis #51: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-052",
    domain: "hr",
    level: 3,
    order: 52,
    difficulty: "hard",
    title: "HR Advanced Analysis #52: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-053",
    domain: "hr",
    level: 3,
    order: 53,
    difficulty: "hard",
    title: "HR Advanced Analysis #53: Department Salary Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-054",
    domain: "hr",
    level: 3,
    order: 54,
    difficulty: "hard",
    title: "HR Advanced Analysis #54: Attendance Shift Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-055",
    domain: "hr",
    level: 3,
    order: 55,
    difficulty: "hard",
    title: "HR Advanced Analysis #55: Training Score Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-056",
    domain: "hr",
    level: 3,
    order: 56,
    difficulty: "hard",
    title: "HR Advanced Analysis #56: Annual Bonus Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-057",
    domain: "hr",
    level: 3,
    order: 57,
    difficulty: "hard",
    title: "HR Advanced Analysis #57: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-058",
    domain: "hr",
    level: 3,
    order: 58,
    difficulty: "hard",
    title: "HR Advanced Analysis #58: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-059",
    domain: "hr",
    level: 3,
    order: 59,
    difficulty: "hard",
    title: "HR Advanced Analysis #59: Department Salary Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-060",
    domain: "hr",
    level: 3,
    order: 60,
    difficulty: "hard",
    title: "HR Advanced Analysis #60: Attendance Shift Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-061",
    domain: "hr",
    level: 3,
    order: 61,
    difficulty: "hard",
    title: "HR Advanced Analysis #61: Training Score Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-062",
    domain: "hr",
    level: 3,
    order: 62,
    difficulty: "hard",
    title: "HR Advanced Analysis #62: Annual Bonus Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-063",
    domain: "hr",
    level: 3,
    order: 63,
    difficulty: "hard",
    title: "HR Advanced Analysis #63: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-064",
    domain: "hr",
    level: 3,
    order: 64,
    difficulty: "hard",
    title: "HR Advanced Analysis #64: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-065",
    domain: "hr",
    level: 3,
    order: 65,
    difficulty: "hard",
    title: "HR Advanced Analysis #65: Department Salary Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-066",
    domain: "hr",
    level: 3,
    order: 66,
    difficulty: "hard",
    title: "HR Advanced Analysis #66: Attendance Shift Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-067",
    domain: "hr",
    level: 3,
    order: 67,
    difficulty: "hard",
    title: "HR Advanced Analysis #67: Training Score Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-068",
    domain: "hr",
    level: 3,
    order: 68,
    difficulty: "hard",
    title: "HR Advanced Analysis #68: Annual Bonus Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-069",
    domain: "hr",
    level: 3,
    order: 69,
    difficulty: "hard",
    title: "HR Advanced Analysis #69: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-070",
    domain: "hr",
    level: 3,
    order: 70,
    difficulty: "hard",
    title: "HR Advanced Analysis #70: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-071",
    domain: "hr",
    level: 3,
    order: 71,
    difficulty: "hard",
    title: "HR Advanced Analysis #71: Department Salary Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-072",
    domain: "hr",
    level: 3,
    order: 72,
    difficulty: "hard",
    title: "HR Advanced Analysis #72: Attendance Shift Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-073",
    domain: "hr",
    level: 3,
    order: 73,
    difficulty: "hard",
    title: "HR Advanced Analysis #73: Training Score Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-074",
    domain: "hr",
    level: 3,
    order: 74,
    difficulty: "hard",
    title: "HR Advanced Analysis #74: Annual Bonus Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-075",
    domain: "hr",
    level: 3,
    order: 75,
    difficulty: "hard",
    title: "HR Advanced Analysis #75: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-076",
    domain: "hr",
    level: 3,
    order: 76,
    difficulty: "hard",
    title: "HR Advanced Analysis #76: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-077",
    domain: "hr",
    level: 3,
    order: 77,
    difficulty: "hard",
    title: "HR Advanced Analysis #77: Department Salary Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-078",
    domain: "hr",
    level: 3,
    order: 78,
    difficulty: "hard",
    title: "HR Advanced Analysis #78: Attendance Shift Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-079",
    domain: "hr",
    level: 3,
    order: 79,
    difficulty: "hard",
    title: "HR Advanced Analysis #79: Training Score Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-080",
    domain: "hr",
    level: 3,
    order: 80,
    difficulty: "hard",
    title: "HR Advanced Analysis #80: Annual Bonus Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-081",
    domain: "hr",
    level: 3,
    order: 81,
    difficulty: "hard",
    title: "HR Advanced Analysis #81: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-082",
    domain: "hr",
    level: 3,
    order: 82,
    difficulty: "hard",
    title: "HR Advanced Analysis #82: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-083",
    domain: "hr",
    level: 3,
    order: 83,
    difficulty: "hard",
    title: "HR Advanced Analysis #83: Department Salary Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-084",
    domain: "hr",
    level: 3,
    order: 84,
    difficulty: "hard",
    title: "HR Advanced Analysis #84: Attendance Shift Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-085",
    domain: "hr",
    level: 3,
    order: 85,
    difficulty: "hard",
    title: "HR Advanced Analysis #85: Training Score Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-086",
    domain: "hr",
    level: 3,
    order: 86,
    difficulty: "hard",
    title: "HR Advanced Analysis #86: Annual Bonus Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-087",
    domain: "hr",
    level: 3,
    order: 87,
    difficulty: "hard",
    title: "HR Advanced Analysis #87: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-088",
    domain: "hr",
    level: 3,
    order: 88,
    difficulty: "hard",
    title: "HR Advanced Analysis #88: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-089",
    domain: "hr",
    level: 3,
    order: 89,
    difficulty: "hard",
    title: "HR Advanced Analysis #89: Department Salary Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-090",
    domain: "hr",
    level: 3,
    order: 90,
    difficulty: "hard",
    title: "HR Advanced Analysis #90: Attendance Shift Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-091",
    domain: "hr",
    level: 3,
    order: 91,
    difficulty: "hard",
    title: "HR Advanced Analysis #91: Training Score Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-092",
    domain: "hr",
    level: 3,
    order: 92,
    difficulty: "hard",
    title: "HR Advanced Analysis #92: Annual Bonus Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-093",
    domain: "hr",
    level: 3,
    order: 93,
    difficulty: "hard",
    title: "HR Advanced Analysis #93: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-094",
    domain: "hr",
    level: 3,
    order: 94,
    difficulty: "hard",
    title: "HR Advanced Analysis #94: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-095",
    domain: "hr",
    level: 3,
    order: 95,
    difficulty: "hard",
    title: "HR Advanced Analysis #95: Department Salary Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from employees where salary is strictly greater than the overall average salary. Return id, salary, and department_id, ordered by salary descending.",
    context_notes: "Benchmark analysis on employees exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employees"],
    expected_columns: ["id","salary","department_id"],
    reference_sql: "SELECT id, salary, department_id FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-096",
    domain: "hr",
    level: 3,
    order: 96,
    difficulty: "hard",
    title: "HR Advanced Analysis #96: Attendance Shift Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from attendance_logs where hours_worked is strictly greater than the overall average hours_worked. Return id, hours_worked, and employee_id, ordered by hours_worked descending.",
    context_notes: "Benchmark analysis on attendance_logs exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","attendance_logs"],
    expected_columns: ["id","hours_worked","employee_id"],
    reference_sql: "SELECT id, hours_worked, employee_id FROM attendance_logs WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs) ORDER BY hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE hours_worked > (SELECT AVG(hours_worked) FROM attendance_logs)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-097",
    domain: "hr",
    level: 3,
    order: 97,
    difficulty: "hard",
    title: "HR Advanced Analysis #97: Training Score Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Identify records from employee_trainings where score is strictly greater than the overall average score. Return id, score, and course_id, ordered by score descending.",
    context_notes: "Benchmark analysis on employee_trainings exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","employee_trainings"],
    expected_columns: ["id","score","course_id"],
    reference_sql: "SELECT id, score, course_id FROM employee_trainings WHERE score > (SELECT AVG(score) FROM employee_trainings) ORDER BY score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE score > (SELECT AVG(score) FROM employee_trainings)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-098",
    domain: "hr",
    level: 3,
    order: 98,
    difficulty: "hard",
    title: "HR Advanced Analysis #98: Annual Bonus Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify records from performance_reviews where bonus_pct is strictly greater than the overall average bonus_pct. Return id, bonus_pct, and review_year, ordered by bonus_pct descending.",
    context_notes: "Benchmark analysis on performance_reviews exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","performance_reviews"],
    expected_columns: ["id","bonus_pct","review_year"],
    reference_sql: "SELECT id, bonus_pct, review_year FROM performance_reviews WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews) ORDER BY bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE bonus_pct > (SELECT AVG(bonus_pct) FROM performance_reviews)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-099",
    domain: "hr",
    level: 3,
    order: 99,
    difficulty: "hard",
    title: "HR Advanced Analysis #99: Health Plan Cost Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Identify records from benefits_packages where annual_cost is strictly greater than the overall average annual_cost. Return id, annual_cost, and health_plan, ordered by annual_cost descending.",
    context_notes: "Benchmark analysis on benefits_packages exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","benefits_packages"],
    expected_columns: ["id","annual_cost","health_plan"],
    reference_sql: "SELECT id, annual_cost, health_plan FROM benefits_packages WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages) ORDER BY annual_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE annual_cost > (SELECT AVG(annual_cost) FROM benefits_packages)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  },
  {
    id: "hr-L3-100",
    domain: "hr",
    level: 3,
    order: 100,
    difficulty: "hard",
    title: "HR Advanced Analysis #100: Grade Level Max Salary Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Identify records from job_roles where max_salary is strictly greater than the overall average max_salary. Return id, max_salary, and grade_level, ordered by max_salary descending.",
    context_notes: "Benchmark analysis on job_roles exceeding overall mean metrics.",
    concepts: ["Scalar Subquery","WHERE","AVG()","job_roles"],
    expected_columns: ["id","max_salary","grade_level"],
    reference_sql: "SELECT id, max_salary, grade_level FROM job_roles WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles) ORDER BY max_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a scalar subquery: WHERE max_salary > (SELECT AVG(max_salary) FROM job_roles)."
    ],
    starter_sql: "SELECT\n  -- Complete subquery or set operation\nFROM \n;"
  }
];
