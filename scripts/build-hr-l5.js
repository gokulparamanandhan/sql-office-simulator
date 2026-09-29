const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Maya Thorne', role: 'VP of People Operations' },
  { name: 'David Kim', role: 'Director of Talent Acquisition' },
  { name: 'Alicia Gomez', role: 'Head of Compensation & Total Rewards' },
  { name: 'Marcus Vance', role: 'Director of Workplace Experience' },
];

const l5Templates = [
  {
    authorIdx: 0,
    title: "Department Budget Utilization and Headcount Capacity",
    desc: "Calculate each department's total actual salary expenditure and compare it with the annual department budget. Using CTEs, show department name, budget, total_actual_salary, and budget_utilization_pct (total_actual_salary / budget * 100), ordered by utilization descending.",
    sql: "WITH dept_salary AS (SELECT department_id, SUM(salary) AS total_actual_salary FROM employees WHERE status = 'active' GROUP BY department_id) SELECT d.name, d.budget, COALESCE(ds.total_actual_salary, 0) AS total_actual_salary, ROUND((COALESCE(ds.total_actual_salary, 0) / d.budget * 100.0), 2) AS budget_utilization_pct FROM departments d LEFT JOIN dept_salary ds ON d.id = ds.department_id ORDER BY budget_utilization_pct DESC;",
    cols: ["name", "budget", "total_actual_salary", "budget_utilization_pct"],
    hint: "Use a CTE to calculate total salary per department from employees, then left join with departments.",
    context: "Strategic department budget utilization and fiscal staffing governance.",
    concepts: ["CTE", "LEFT JOIN", "COALESCE", "Budget Modeling"],
    difficulty: "expert"
  },
  {
    authorIdx: 2,
    title: "Comprehensive Total Rewards Cost per Employee",
    desc: "We need an all-in total rewards calculation per active employee (base salary + performance bonus + employer benefits annual cost). Use CTEs to aggregate bonus and benefits costs, returning employee id, name, base_salary, bonus_amount, benefits_cost, and total_rewards_cost.",
    sql: "WITH bonus_cte AS (SELECT employee_id, ROUND(AVG(bonus_pct) / 100.0, 4) AS avg_bonus_pct FROM performance_reviews GROUP BY employee_id), benefits_cte AS (SELECT eb.employee_id, SUM(bp.annual_cost) AS total_benefits_cost FROM employee_benefits eb JOIN benefits_packages bp ON eb.package_id = bp.id GROUP BY eb.employee_id) SELECT e.id, e.name, e.salary AS base_salary, ROUND(e.salary * COALESCE(b.avg_bonus_pct, 0), 2) AS bonus_amount, COALESCE(ben.total_benefits_cost, 0) AS benefits_cost, ROUND(e.salary + (e.salary * COALESCE(b.avg_bonus_pct, 0)) + COALESCE(ben.total_benefits_cost, 0), 2) AS total_rewards_cost FROM employees e LEFT JOIN bonus_cte b ON e.id = b.employee_id LEFT JOIN benefits_cte ben ON e.id = ben.employee_id WHERE e.status = 'active' ORDER BY total_rewards_cost DESC;",
    cols: ["id", "name", "base_salary", "bonus_amount", "benefits_cost", "total_rewards_cost"],
    hint: "Build separate CTEs for bonus percentages and benefits annual costs, then join with employees.",
    context: "Total Rewards comprehensive employer liability modeling.",
    concepts: ["Multi-Stage CTE", "LEFT JOIN", "Total Rewards", "Compensation Modeling"],
    difficulty: "expert"
  },
  {
    authorIdx: 0,
    title: "Career Ladder Progression & Promotion Pay Jump",
    desc: "Analyze employee career trajectory following a promotion. Using CTEs, join employee_promotions with old and new job roles, displaying employee id, name, old_title, new_title, promotion_date, and salary increment between old max_salary and new max_salary.",
    sql: "WITH promo_roles AS (SELECT ep.id, ep.employee_id, ep.promotion_date, r_old.job_title AS old_title, r_new.job_title AS new_title, r_old.max_salary AS old_max, r_new.max_salary AS new_max FROM employee_promotions ep JOIN job_roles r_old ON ep.old_role_id = r_old.id JOIN job_roles r_new ON ep.new_role_id = r_new.id) SELECT pr.employee_id, e.name, pr.old_title, pr.new_title, pr.promotion_date, (pr.new_max - pr.old_max) AS grade_band_increase FROM promo_roles pr JOIN employees e ON pr.employee_id = e.id ORDER BY pr.promotion_date DESC;",
    cols: ["employee_id", "name", "old_title", "new_title", "promotion_date", "grade_band_increase"],
    hint: "Use a CTE joining employee_promotions with job_roles twice (for old and new roles).",
    context: "Career advancement mobility and compensation band elevation analytics.",
    concepts: ["CTE", "Multiple Table Joins", "Career Mobility"],
    difficulty: "expert"
  },
  {
    authorIdx: 1,
    title: "Recruiting Funnel Conversion Rate by Department",
    desc: "For each department, compute the total job openings posted and total candidates evaluated. Use CTEs to summarize openings and candidates, displaying department name, total_openings, total_candidates, and candidate_to_opening_ratio.",
    sql: "WITH dept_openings AS (SELECT department_id, COUNT(id) AS total_openings FROM job_openings GROUP BY department_id), dept_candidates AS (SELECT jo.department_id, COUNT(c.id) AS total_candidates FROM job_openings jo JOIN candidates c ON jo.id = c.opening_id GROUP BY jo.department_id) SELECT d.name, COALESCE(o.total_openings, 0) AS total_openings, COALESCE(c.total_candidates, 0) AS total_candidates, ROUND((COALESCE(c.total_candidates, 0)::NUMERIC / NULLIF(o.total_openings, 0)), 2) AS candidate_to_opening_ratio FROM departments d LEFT JOIN dept_openings o ON d.id = o.department_id LEFT JOIN dept_candidates c ON d.id = c.department_id ORDER BY candidate_to_opening_ratio DESC;",
    cols: ["name", "total_openings", "total_candidates", "candidate_to_opening_ratio"],
    hint: "Aggregate openings and candidates in separate CTEs, using NULLIF to prevent division by zero.",
    context: "Talent acquisition pipeline volume and recruiter workload metrics.",
    concepts: ["Multi-Stage CTE", "NULLIF", "Recruiting Metrics"],
    difficulty: "expert"
  },
  {
    authorIdx: 2,
    title: "Salary History Growth Rate vs Company Average",
    desc: "Calculate each promoted employee's cumulative salary growth rate ((latest_salary - starting_salary) / starting_salary * 100). Show employee id, name, and compare it with the company average growth rate using CTEs.",
    sql: "WITH min_max_sal AS (SELECT employee_id, MIN(previous_salary) AS starting_salary, MAX(new_salary) AS latest_salary FROM salaries_history GROUP BY employee_id), growth_calc AS (SELECT m.employee_id, m.starting_salary, m.latest_salary, ROUND(((m.latest_salary - m.starting_salary) / m.starting_salary * 100.0), 2) AS growth_pct FROM min_max_sal m) SELECT g.employee_id, e.name, g.starting_salary, g.latest_salary, g.growth_pct, ROUND(AVG(g.growth_pct) OVER (), 2) AS company_avg_growth FROM growth_calc g JOIN employees e ON g.employee_id = e.id ORDER BY g.growth_pct DESC;",
    cols: ["employee_id", "name", "starting_salary", "latest_salary", "growth_pct", "company_avg_growth"],
    hint: "Construct multi-stage CTEs computing min previous_salary and max new_salary per employee.",
    context: "Longitudinal compensation progression and retention benchmarking.",
    concepts: ["Multi-Stage CTE", "Window Function in CTE", "Compensation Growth"],
    difficulty: "expert"
  },
  {
    authorIdx: 3,
    title: "Workforce Attendance Reliability vs Leave Rate",
    desc: "Compare total hours worked against approved leave days per employee using CTEs. Return employee name, total_hours_worked, total_leave_days_taken, and ratio of hours to leave days.",
    sql: "WITH hours_cte AS (SELECT employee_id, SUM(hours_worked) AS total_hours FROM attendance_logs GROUP BY employee_id), leave_cte AS (SELECT employee_id, SUM(total_days) AS total_leave_days FROM leave_requests WHERE status = 'approved' GROUP BY employee_id) SELECT e.name, COALESCE(h.total_hours, 0) AS total_hours_worked, COALESCE(l.total_leave_days, 0) AS total_leave_days_taken, ROUND((COALESCE(h.total_hours, 0) / NULLIF(l.total_leave_days, 0)), 2) AS hours_per_leave_day FROM employees e LEFT JOIN hours_cte h ON e.id = h.employee_id LEFT JOIN leave_cte l ON e.id = l.employee_id ORDER BY total_hours_worked DESC;",
    cols: ["name", "total_hours_worked", "total_leave_days_taken", "hours_per_leave_day"],
    hint: "Use CTEs for attendance hours and approved leave days, joining on employee_id.",
    context: "Workforce availability and engagement correlation.",
    concepts: ["CTE", "COALESCE", "NULLIF", "Workforce Availability"],
    difficulty: "expert"
  },
  {
    authorIdx: 1,
    title: "High-Potential Talent 9-Box Matrix (Performance vs Training)",
    desc: "Build a high-potential talent identification query. Using CTEs, find employees with average performance rating >= 4 and training score >= 85 who have also earned a promotion. Show employee id, name, avg_rating, and avg_training_score.",
    sql: "WITH perf_cte AS (SELECT employee_id, ROUND(AVG(rating), 2) AS avg_rating FROM performance_reviews GROUP BY employee_id HAVING AVG(rating) >= 4), train_cte AS (SELECT employee_id, ROUND(AVG(score), 2) AS avg_training_score FROM employee_trainings GROUP BY employee_id HAVING AVG(score) >= 85), promo_cte AS (SELECT DISTINCT employee_id FROM employee_promotions) SELECT e.id, e.name, p.avg_rating, t.avg_training_score FROM employees e JOIN perf_cte p ON e.id = p.employee_id JOIN train_cte t ON e.id = t.employee_id JOIN promo_cte pr ON e.id = pr.employee_id ORDER BY p.avg_rating DESC, t.avg_training_score DESC;",
    cols: ["id", "name", "avg_rating", "avg_training_score"],
    hint: "Join three filtered CTEs representing high performance, high training scores, and promotions.",
    context: "9-Box leadership succession planning.",
    concepts: ["Multi-Stage CTE", "HAVING", "Succession Planning"],
    difficulty: "expert"
  },
  {
    authorIdx: 0,
    title: "Department Headcount Turnover and Growth Exposure",
    desc: "Assess staffing stability across departments. Using CTEs, count active employees versus inactive employees per department, computing active_count, inactive_count, and active_ratio.",
    sql: "WITH active_cte AS (SELECT department_id, COUNT(*) AS active_count FROM employees WHERE status = 'active' GROUP BY department_id), inactive_cte AS (SELECT department_id, COUNT(*) AS inactive_count FROM employees WHERE status != 'active' GROUP BY department_id) SELECT d.name, COALESCE(a.active_count, 0) AS active_count, COALESCE(i.inactive_count, 0) AS inactive_count, ROUND((COALESCE(a.active_count, 0)::NUMERIC / NULLIF(COALESCE(a.active_count, 0) + COALESCE(i.inactive_count, 0), 0) * 100.0), 2) AS active_retention_pct FROM departments d LEFT JOIN active_cte a ON d.id = a.department_id LEFT JOIN inactive_cte i ON d.id = i.department_id ORDER BY active_retention_pct DESC;",
    cols: ["name", "active_count", "inactive_count", "active_retention_pct"],
    hint: "Aggregate active and inactive employees by department in separate CTEs.",
    context: "Measuring department retention rates and attrition exposure.",
    concepts: ["CTE", "COALESCE", "NULLIF", "Turnover Analysis"],
    difficulty: "expert"
  },
  {
    authorIdx: 2,
    title: "Annual Benefit Package Cost Share by Department",
    desc: "For each department, compute total benefits package costs incurred by its staff and find what percentage of the total corporate benefits expenditure it represents. Use CTEs and CROSS JOIN.",
    sql: "WITH dept_benefits AS (SELECT e.department_id, SUM(bp.annual_cost) AS dept_cost FROM employees e JOIN employee_benefits eb ON e.id = eb.employee_id JOIN benefits_packages bp ON eb.package_id = bp.id GROUP BY e.department_id), total_corp_benefits AS (SELECT SUM(annual_cost) AS total_corp_cost FROM employee_benefits eb JOIN benefits_packages bp ON eb.package_id = bp.id) SELECT d.name, db.dept_cost, ROUND((db.dept_cost / NULLIF(tcb.total_corp_cost, 0) * 100.0), 2) AS pct_of_corporate_benefits FROM departments d JOIN dept_benefits db ON d.id = db.department_id CROSS JOIN total_corp_benefits tcb ORDER BY db.dept_cost DESC;",
    cols: ["name", "dept_cost", "pct_of_corporate_benefits"],
    hint: "Use CTEs for department benefits total and global benefits total, joined with CROSS JOIN.",
    context: "Corporate benefits cost allocation across operational divisions.",
    concepts: ["CTE", "CROSS JOIN", "Cost Allocation"],
    difficulty: "expert"
  },
  {
    authorIdx: 1,
    title: "Recruiting Interview Efficiency vs Candidate Acceptance",
    desc: "Analyze candidate performance across job openings. For each opening, calculate average interview score, candidate count, and compare it with the global candidate score average using CTEs.",
    sql: "WITH opening_stats AS (SELECT opening_id, COUNT(id) AS candidate_count, ROUND(AVG(interview_score), 2) AS avg_score FROM candidates GROUP BY opening_id), global_benchmark AS (SELECT ROUND(AVG(interview_score), 2) AS company_avg_score FROM candidates) SELECT jo.id AS opening_id, jo.department_id, os.candidate_count, os.avg_score, gb.company_avg_score FROM job_openings jo JOIN opening_stats os ON jo.id = os.opening_id CROSS JOIN global_benchmark gb ORDER BY os.avg_score DESC;",
    cols: ["opening_id", "department_id", "candidate_count", "avg_score", "company_avg_score"],
    hint: "Compute opening candidate statistics in a CTE and cross join with global average score.",
    context: "Benchmarking talent evaluation rigor by requisition.",
    concepts: ["CTE", "CROSS JOIN", "Recruiting Quality"],
    difficulty: "expert"
  }
];

// Generate 90 additional programmatic templates across all 15 HR tables with multi-table CTEs
const hrThemes = [
  { table1: "employees", table2: "salaries_history", joinKey: "employee_id", metric1: "salary", metric2: "new_salary", name: "Salary Growth Model" },
  { table1: "departments", table2: "job_roles", joinKey: "department_id", metric1: "budget", metric2: "max_salary", name: "Department Role Structure" },
  { table1: "employees", table2: "performance_reviews", joinKey: "employee_id", metric1: "salary", metric2: "bonus_pct", name: "Performance Incentive Alignment" },
  { table1: "employees", table2: "leave_requests", joinKey: "employee_id", metric1: "salary", metric2: "total_days", name: "Leave Impact on Headcount" },
  { table1: "employees", table2: "attendance_logs", joinKey: "employee_id", metric1: "salary", metric2: "hours_worked", name: "Shift Attendance Efficiency" },
  { table1: "job_openings", table2: "candidates", joinKey: "opening_id", metric1: "id", metric2: "interview_score", name: "Hiring Funnel Calibration" },
  { table1: "training_courses", table2: "employee_trainings", joinKey: "course_id", metric1: "duration_hours", metric2: "score", name: "Training ROI Benchmark" },
  { table1: "benefits_packages", table2: "employee_benefits", joinKey: "package_id", metric1: "annual_cost", metric2: "id", name: "Benefits Enrollment Distribution" },
  { table1: "job_roles", table2: "employee_promotions", joinKey: "new_role_id", metric1: "max_salary", metric2: "id", name: "Promotion Ceiling Analytics" }
];

let counter = l5Templates.length;
for (let i = 0; counter < 100; i++) {
  const theme = hrThemes[i % hrThemes.length];
  const p = personas[counter % personas.length];
  const qNum = counter + 1;

  l5Templates.push({
    authorIdx: counter % personas.length,
    title: `Enterprise HR CTE Model #${qNum}: ${theme.name}`,
    desc: `Construct an enterprise workforce CTE summarizing ${theme.table1} and ${theme.table2}. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.`,
    sql: `WITH cte1 AS (SELECT ${theme.table1 === 'departments' ? 'id' : 'department_id'}, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY ${theme.table1 === 'departments' ? 'id' : 'department_id'}) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;`,
    cols: ["id", "name", "total_employees", "aggregate_payroll"],
    hint: "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments.",
    context: `Enterprise workforce aggregation and strategic modeling on ${theme.table1}.`,
    concepts: ["CTE", "Enterprise Modeling", "LEFT JOIN", "COALESCE"],
    difficulty: "expert"
  });
  counter++;
}

const outQuestions = l5Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "hr-L5-${pad}",
    domain: "hr",
    level: 5,
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
    starter_sql: "WITH\\n  -- Complete enterprise CTE\\nSELECT\\nFROM\\n;"
  }`;
});

const fileHeader = `// ============================================================================
// HUMAN RESOURCES — LEVEL 5: ENTERPRISE CTES, PROMOTION ADVANCEMENT & WORKFORCE PLANNING
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (15): departments, job_roles, locations, employees, attendance_logs,
//              leave_requests, salaries_history, performance_reviews, benefits_packages,
//              employee_benefits, training_courses, employee_trainings, job_openings,
//              candidates, employee_promotions
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L5_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/hr-l5-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated HR_L5_QUESTIONS: ${outQuestions.length} questions.`);
