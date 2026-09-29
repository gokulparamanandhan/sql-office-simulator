// ============================================================================
// HUMAN RESOURCES — LEVEL 5: ENTERPRISE CTES, PROMOTION ADVANCEMENT & WORKFORCE PLANNING
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (15): departments, job_roles, locations, employees, attendance_logs,
//              leave_requests, salaries_history, performance_reviews, benefits_packages,
//              employee_benefits, training_courses, employee_trainings, job_openings,
//              candidates, employee_promotions
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L5_QUESTIONS: QuestionDefinition[] = [
  {
    id: "hr-L5-001",
    domain: "hr",
    level: 5,
    order: 1,
    difficulty: "expert",
    title: "Department Budget Utilization and Headcount Capacity",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Calculate each department's total actual salary expenditure and compare it with the annual department budget. Using CTEs, show department name, budget, total_actual_salary, and budget_utilization_pct (total_actual_salary / budget * 100), ordered by utilization descending.",
    context_notes: "Strategic department budget utilization and fiscal staffing governance.",
    concepts: ["CTE","LEFT JOIN","COALESCE","Budget Modeling"],
    expected_columns: ["name","budget","total_actual_salary","budget_utilization_pct"],
    reference_sql: "WITH dept_salary AS (SELECT department_id, SUM(salary) AS total_actual_salary FROM employees WHERE status = 'active' GROUP BY department_id) SELECT d.name, d.budget, COALESCE(ds.total_actual_salary, 0) AS total_actual_salary, ROUND((COALESCE(ds.total_actual_salary, 0) / d.budget * 100.0), 2) AS budget_utilization_pct FROM departments d LEFT JOIN dept_salary ds ON d.id = ds.department_id ORDER BY budget_utilization_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a CTE to calculate total salary per department from employees, then left join with departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-002",
    domain: "hr",
    level: 5,
    order: 2,
    difficulty: "expert",
    title: "Comprehensive Total Rewards Cost per Employee",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "We need an all-in total rewards calculation per active employee (base salary + performance bonus + employer benefits annual cost). Use CTEs to aggregate bonus and benefits costs, returning employee id, name, base_salary, bonus_amount, benefits_cost, and total_rewards_cost.",
    context_notes: "Total Rewards comprehensive employer liability modeling.",
    concepts: ["Multi-Stage CTE","LEFT JOIN","Total Rewards","Compensation Modeling"],
    expected_columns: ["id","name","base_salary","bonus_amount","benefits_cost","total_rewards_cost"],
    reference_sql: "WITH bonus_cte AS (SELECT employee_id, ROUND(AVG(bonus_pct) / 100.0, 4) AS avg_bonus_pct FROM performance_reviews GROUP BY employee_id), benefits_cte AS (SELECT eb.employee_id, SUM(bp.annual_cost) AS total_benefits_cost FROM employee_benefits eb JOIN benefits_packages bp ON eb.package_id = bp.id GROUP BY eb.employee_id) SELECT e.id, e.name, e.salary AS base_salary, ROUND(e.salary * COALESCE(b.avg_bonus_pct, 0), 2) AS bonus_amount, COALESCE(ben.total_benefits_cost, 0) AS benefits_cost, ROUND(e.salary + (e.salary * COALESCE(b.avg_bonus_pct, 0)) + COALESCE(ben.total_benefits_cost, 0), 2) AS total_rewards_cost FROM employees e LEFT JOIN bonus_cte b ON e.id = b.employee_id LEFT JOIN benefits_cte ben ON e.id = ben.employee_id WHERE e.status = 'active' ORDER BY total_rewards_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Build separate CTEs for bonus percentages and benefits annual costs, then join with employees."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-003",
    domain: "hr",
    level: 5,
    order: 3,
    difficulty: "expert",
    title: "Career Ladder Progression & Promotion Pay Jump",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Analyze employee career trajectory following a promotion. Using CTEs, join employee_promotions with old and new job roles, displaying employee id, name, old_title, new_title, promotion_date, and salary increment between old max_salary and new max_salary.",
    context_notes: "Career advancement mobility and compensation band elevation analytics.",
    concepts: ["CTE","Multiple Table Joins","Career Mobility"],
    expected_columns: ["employee_id","name","old_title","new_title","promotion_date","grade_band_increase"],
    reference_sql: "WITH promo_roles AS (SELECT ep.id, ep.employee_id, ep.promotion_date, r_old.job_title AS old_title, r_new.job_title AS new_title, r_old.max_salary AS old_max, r_new.max_salary AS new_max FROM employee_promotions ep JOIN job_roles r_old ON ep.old_role_id = r_old.id JOIN job_roles r_new ON ep.new_role_id = r_new.id) SELECT pr.employee_id, e.name, pr.old_title, pr.new_title, pr.promotion_date, (pr.new_max - pr.old_max) AS grade_band_increase FROM promo_roles pr JOIN employees e ON pr.employee_id = e.id ORDER BY pr.promotion_date DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use a CTE joining employee_promotions with job_roles twice (for old and new roles)."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-004",
    domain: "hr",
    level: 5,
    order: 4,
    difficulty: "expert",
    title: "Recruiting Funnel Conversion Rate by Department",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "For each department, compute the total job openings posted and total candidates evaluated. Use CTEs to summarize openings and candidates, displaying department name, total_openings, total_candidates, and candidate_to_opening_ratio.",
    context_notes: "Talent acquisition pipeline volume and recruiter workload metrics.",
    concepts: ["Multi-Stage CTE","NULLIF","Recruiting Metrics"],
    expected_columns: ["name","total_openings","total_candidates","candidate_to_opening_ratio"],
    reference_sql: "WITH dept_openings AS (SELECT department_id, COUNT(id) AS total_openings FROM job_openings GROUP BY department_id), dept_candidates AS (SELECT jo.department_id, COUNT(c.id) AS total_candidates FROM job_openings jo JOIN candidates c ON jo.id = c.opening_id GROUP BY jo.department_id) SELECT d.name, COALESCE(o.total_openings, 0) AS total_openings, COALESCE(c.total_candidates, 0) AS total_candidates, ROUND((COALESCE(c.total_candidates, 0)::NUMERIC / NULLIF(o.total_openings, 0)), 2) AS candidate_to_opening_ratio FROM departments d LEFT JOIN dept_openings o ON d.id = o.department_id LEFT JOIN dept_candidates c ON d.id = c.department_id ORDER BY candidate_to_opening_ratio DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Aggregate openings and candidates in separate CTEs, using NULLIF to prevent division by zero."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-005",
    domain: "hr",
    level: 5,
    order: 5,
    difficulty: "expert",
    title: "Salary History Growth Rate vs Company Average",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Calculate each promoted employee's cumulative salary growth rate ((latest_salary - starting_salary) / starting_salary * 100). Show employee id, name, and compare it with the company average growth rate using CTEs.",
    context_notes: "Longitudinal compensation progression and retention benchmarking.",
    concepts: ["Multi-Stage CTE","Window Function in CTE","Compensation Growth"],
    expected_columns: ["employee_id","name","starting_salary","latest_salary","growth_pct","company_avg_growth"],
    reference_sql: "WITH min_max_sal AS (SELECT employee_id, MIN(previous_salary) AS starting_salary, MAX(new_salary) AS latest_salary FROM salaries_history GROUP BY employee_id), growth_calc AS (SELECT m.employee_id, m.starting_salary, m.latest_salary, ROUND(((m.latest_salary - m.starting_salary) / m.starting_salary * 100.0), 2) AS growth_pct FROM min_max_sal m) SELECT g.employee_id, e.name, g.starting_salary, g.latest_salary, g.growth_pct, ROUND(AVG(g.growth_pct) OVER (), 2) AS company_avg_growth FROM growth_calc g JOIN employees e ON g.employee_id = e.id ORDER BY g.growth_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Construct multi-stage CTEs computing min previous_salary and max new_salary per employee."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-006",
    domain: "hr",
    level: 5,
    order: 6,
    difficulty: "expert",
    title: "Workforce Attendance Reliability vs Leave Rate",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compare total hours worked against approved leave days per employee using CTEs. Return employee name, total_hours_worked, total_leave_days_taken, and ratio of hours to leave days.",
    context_notes: "Workforce availability and engagement correlation.",
    concepts: ["CTE","COALESCE","NULLIF","Workforce Availability"],
    expected_columns: ["name","total_hours_worked","total_leave_days_taken","hours_per_leave_day"],
    reference_sql: "WITH hours_cte AS (SELECT employee_id, SUM(hours_worked) AS total_hours FROM attendance_logs GROUP BY employee_id), leave_cte AS (SELECT employee_id, SUM(total_days) AS total_leave_days FROM leave_requests WHERE status = 'approved' GROUP BY employee_id) SELECT e.name, COALESCE(h.total_hours, 0) AS total_hours_worked, COALESCE(l.total_leave_days, 0) AS total_leave_days_taken, ROUND((COALESCE(h.total_hours, 0) / NULLIF(l.total_leave_days, 0)), 2) AS hours_per_leave_day FROM employees e LEFT JOIN hours_cte h ON e.id = h.employee_id LEFT JOIN leave_cte l ON e.id = l.employee_id ORDER BY total_hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use CTEs for attendance hours and approved leave days, joining on employee_id."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-007",
    domain: "hr",
    level: 5,
    order: 7,
    difficulty: "expert",
    title: "High-Potential Talent 9-Box Matrix (Performance vs Training)",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Build a high-potential talent identification query. Using CTEs, find employees with average performance rating >= 4 and training score >= 85 who have also earned a promotion. Show employee id, name, avg_rating, and avg_training_score.",
    context_notes: "9-Box leadership succession planning.",
    concepts: ["Multi-Stage CTE","HAVING","Succession Planning"],
    expected_columns: ["id","name","avg_rating","avg_training_score"],
    reference_sql: "WITH perf_cte AS (SELECT employee_id, ROUND(AVG(rating), 2) AS avg_rating FROM performance_reviews GROUP BY employee_id HAVING AVG(rating) >= 4), train_cte AS (SELECT employee_id, ROUND(AVG(score), 2) AS avg_training_score FROM employee_trainings GROUP BY employee_id HAVING AVG(score) >= 85), promo_cte AS (SELECT DISTINCT employee_id FROM employee_promotions) SELECT e.id, e.name, p.avg_rating, t.avg_training_score FROM employees e JOIN perf_cte p ON e.id = p.employee_id JOIN train_cte t ON e.id = t.employee_id JOIN promo_cte pr ON e.id = pr.employee_id ORDER BY p.avg_rating DESC, t.avg_training_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Join three filtered CTEs representing high performance, high training scores, and promotions."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-008",
    domain: "hr",
    level: 5,
    order: 8,
    difficulty: "expert",
    title: "Department Headcount Turnover and Growth Exposure",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Assess staffing stability across departments. Using CTEs, count active employees versus inactive employees per department, computing active_count, inactive_count, and active_ratio.",
    context_notes: "Measuring department retention rates and attrition exposure.",
    concepts: ["CTE","COALESCE","NULLIF","Turnover Analysis"],
    expected_columns: ["name","active_count","inactive_count","active_retention_pct"],
    reference_sql: "WITH active_cte AS (SELECT department_id, COUNT(*) AS active_count FROM employees WHERE status = 'active' GROUP BY department_id), inactive_cte AS (SELECT department_id, COUNT(*) AS inactive_count FROM employees WHERE status != 'active' GROUP BY department_id) SELECT d.name, COALESCE(a.active_count, 0) AS active_count, COALESCE(i.inactive_count, 0) AS inactive_count, ROUND((COALESCE(a.active_count, 0)::NUMERIC / NULLIF(COALESCE(a.active_count, 0) + COALESCE(i.inactive_count, 0), 0) * 100.0), 2) AS active_retention_pct FROM departments d LEFT JOIN active_cte a ON d.id = a.department_id LEFT JOIN inactive_cte i ON d.id = i.department_id ORDER BY active_retention_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Aggregate active and inactive employees by department in separate CTEs."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-009",
    domain: "hr",
    level: 5,
    order: 9,
    difficulty: "expert",
    title: "Annual Benefit Package Cost Share by Department",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "For each department, compute total benefits package costs incurred by its staff and find what percentage of the total corporate benefits expenditure it represents. Use CTEs and CROSS JOIN.",
    context_notes: "Corporate benefits cost allocation across operational divisions.",
    concepts: ["CTE","CROSS JOIN","Cost Allocation"],
    expected_columns: ["name","dept_cost","pct_of_corporate_benefits"],
    reference_sql: "WITH dept_benefits AS (SELECT e.department_id, SUM(bp.annual_cost) AS dept_cost FROM employees e JOIN employee_benefits eb ON e.id = eb.employee_id JOIN benefits_packages bp ON eb.package_id = bp.id GROUP BY e.department_id), total_corp_benefits AS (SELECT SUM(annual_cost) AS total_corp_cost FROM employee_benefits eb JOIN benefits_packages bp ON eb.package_id = bp.id) SELECT d.name, db.dept_cost, ROUND((db.dept_cost / NULLIF(tcb.total_corp_cost, 0) * 100.0), 2) AS pct_of_corporate_benefits FROM departments d JOIN dept_benefits db ON d.id = db.department_id CROSS JOIN total_corp_benefits tcb ORDER BY db.dept_cost DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use CTEs for department benefits total and global benefits total, joined with CROSS JOIN."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-010",
    domain: "hr",
    level: 5,
    order: 10,
    difficulty: "expert",
    title: "Recruiting Interview Efficiency vs Candidate Acceptance",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Analyze candidate performance across job openings. For each opening, calculate average interview score, candidate count, and compare it with the global candidate score average using CTEs.",
    context_notes: "Benchmarking talent evaluation rigor by requisition.",
    concepts: ["CTE","CROSS JOIN","Recruiting Quality"],
    expected_columns: ["opening_id","department_id","candidate_count","avg_score","company_avg_score"],
    reference_sql: "WITH opening_stats AS (SELECT opening_id, COUNT(id) AS candidate_count, ROUND(AVG(interview_score), 2) AS avg_score FROM candidates GROUP BY opening_id), global_benchmark AS (SELECT ROUND(AVG(interview_score), 2) AS company_avg_score FROM candidates) SELECT jo.id AS opening_id, jo.department_id, os.candidate_count, os.avg_score, gb.company_avg_score FROM job_openings jo JOIN opening_stats os ON jo.id = os.opening_id CROSS JOIN global_benchmark gb ORDER BY os.avg_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Compute opening candidate statistics in a CTE and cross join with global average score."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-011",
    domain: "hr",
    level: 5,
    order: 11,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #11: Salary Growth Model",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and salaries_history. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-012",
    domain: "hr",
    level: 5,
    order: 12,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #12: Department Role Structure",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing departments and job_roles. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on departments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-013",
    domain: "hr",
    level: 5,
    order: 13,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #13: Performance Incentive Alignment",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and performance_reviews. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-014",
    domain: "hr",
    level: 5,
    order: 14,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #14: Leave Impact on Headcount",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and leave_requests. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-015",
    domain: "hr",
    level: 5,
    order: 15,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #15: Shift Attendance Efficiency",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and attendance_logs. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-016",
    domain: "hr",
    level: 5,
    order: 16,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #16: Hiring Funnel Calibration",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing job_openings and candidates. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_openings.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-017",
    domain: "hr",
    level: 5,
    order: 17,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #17: Training ROI Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing training_courses and employee_trainings. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on training_courses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-018",
    domain: "hr",
    level: 5,
    order: 18,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #18: Benefits Enrollment Distribution",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing benefits_packages and employee_benefits. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on benefits_packages.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-019",
    domain: "hr",
    level: 5,
    order: 19,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #19: Promotion Ceiling Analytics",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing job_roles and employee_promotions. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_roles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-020",
    domain: "hr",
    level: 5,
    order: 20,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #20: Salary Growth Model",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and salaries_history. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-021",
    domain: "hr",
    level: 5,
    order: 21,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #21: Department Role Structure",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing departments and job_roles. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on departments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-022",
    domain: "hr",
    level: 5,
    order: 22,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #22: Performance Incentive Alignment",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and performance_reviews. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-023",
    domain: "hr",
    level: 5,
    order: 23,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #23: Leave Impact on Headcount",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and leave_requests. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-024",
    domain: "hr",
    level: 5,
    order: 24,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #24: Shift Attendance Efficiency",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and attendance_logs. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-025",
    domain: "hr",
    level: 5,
    order: 25,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #25: Hiring Funnel Calibration",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing job_openings and candidates. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_openings.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-026",
    domain: "hr",
    level: 5,
    order: 26,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #26: Training ROI Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing training_courses and employee_trainings. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on training_courses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-027",
    domain: "hr",
    level: 5,
    order: 27,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #27: Benefits Enrollment Distribution",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing benefits_packages and employee_benefits. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on benefits_packages.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-028",
    domain: "hr",
    level: 5,
    order: 28,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #28: Promotion Ceiling Analytics",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing job_roles and employee_promotions. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_roles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-029",
    domain: "hr",
    level: 5,
    order: 29,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #29: Salary Growth Model",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and salaries_history. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-030",
    domain: "hr",
    level: 5,
    order: 30,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #30: Department Role Structure",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing departments and job_roles. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on departments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-031",
    domain: "hr",
    level: 5,
    order: 31,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #31: Performance Incentive Alignment",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and performance_reviews. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-032",
    domain: "hr",
    level: 5,
    order: 32,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #32: Leave Impact on Headcount",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and leave_requests. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-033",
    domain: "hr",
    level: 5,
    order: 33,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #33: Shift Attendance Efficiency",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and attendance_logs. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-034",
    domain: "hr",
    level: 5,
    order: 34,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #34: Hiring Funnel Calibration",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing job_openings and candidates. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_openings.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-035",
    domain: "hr",
    level: 5,
    order: 35,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #35: Training ROI Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing training_courses and employee_trainings. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on training_courses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-036",
    domain: "hr",
    level: 5,
    order: 36,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #36: Benefits Enrollment Distribution",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing benefits_packages and employee_benefits. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on benefits_packages.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-037",
    domain: "hr",
    level: 5,
    order: 37,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #37: Promotion Ceiling Analytics",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing job_roles and employee_promotions. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_roles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-038",
    domain: "hr",
    level: 5,
    order: 38,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #38: Salary Growth Model",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and salaries_history. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-039",
    domain: "hr",
    level: 5,
    order: 39,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #39: Department Role Structure",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing departments and job_roles. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on departments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-040",
    domain: "hr",
    level: 5,
    order: 40,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #40: Performance Incentive Alignment",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and performance_reviews. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-041",
    domain: "hr",
    level: 5,
    order: 41,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #41: Leave Impact on Headcount",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and leave_requests. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-042",
    domain: "hr",
    level: 5,
    order: 42,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #42: Shift Attendance Efficiency",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and attendance_logs. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-043",
    domain: "hr",
    level: 5,
    order: 43,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #43: Hiring Funnel Calibration",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing job_openings and candidates. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_openings.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-044",
    domain: "hr",
    level: 5,
    order: 44,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #44: Training ROI Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing training_courses and employee_trainings. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on training_courses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-045",
    domain: "hr",
    level: 5,
    order: 45,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #45: Benefits Enrollment Distribution",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing benefits_packages and employee_benefits. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on benefits_packages.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-046",
    domain: "hr",
    level: 5,
    order: 46,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #46: Promotion Ceiling Analytics",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing job_roles and employee_promotions. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_roles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-047",
    domain: "hr",
    level: 5,
    order: 47,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #47: Salary Growth Model",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and salaries_history. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-048",
    domain: "hr",
    level: 5,
    order: 48,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #48: Department Role Structure",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing departments and job_roles. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on departments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-049",
    domain: "hr",
    level: 5,
    order: 49,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #49: Performance Incentive Alignment",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and performance_reviews. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-050",
    domain: "hr",
    level: 5,
    order: 50,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #50: Leave Impact on Headcount",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and leave_requests. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-051",
    domain: "hr",
    level: 5,
    order: 51,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #51: Shift Attendance Efficiency",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and attendance_logs. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-052",
    domain: "hr",
    level: 5,
    order: 52,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #52: Hiring Funnel Calibration",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing job_openings and candidates. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_openings.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-053",
    domain: "hr",
    level: 5,
    order: 53,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #53: Training ROI Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing training_courses and employee_trainings. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on training_courses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-054",
    domain: "hr",
    level: 5,
    order: 54,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #54: Benefits Enrollment Distribution",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing benefits_packages and employee_benefits. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on benefits_packages.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-055",
    domain: "hr",
    level: 5,
    order: 55,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #55: Promotion Ceiling Analytics",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing job_roles and employee_promotions. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_roles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-056",
    domain: "hr",
    level: 5,
    order: 56,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #56: Salary Growth Model",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and salaries_history. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-057",
    domain: "hr",
    level: 5,
    order: 57,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #57: Department Role Structure",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing departments and job_roles. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on departments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-058",
    domain: "hr",
    level: 5,
    order: 58,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #58: Performance Incentive Alignment",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and performance_reviews. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-059",
    domain: "hr",
    level: 5,
    order: 59,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #59: Leave Impact on Headcount",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and leave_requests. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-060",
    domain: "hr",
    level: 5,
    order: 60,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #60: Shift Attendance Efficiency",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and attendance_logs. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-061",
    domain: "hr",
    level: 5,
    order: 61,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #61: Hiring Funnel Calibration",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing job_openings and candidates. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_openings.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-062",
    domain: "hr",
    level: 5,
    order: 62,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #62: Training ROI Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing training_courses and employee_trainings. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on training_courses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-063",
    domain: "hr",
    level: 5,
    order: 63,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #63: Benefits Enrollment Distribution",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing benefits_packages and employee_benefits. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on benefits_packages.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-064",
    domain: "hr",
    level: 5,
    order: 64,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #64: Promotion Ceiling Analytics",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing job_roles and employee_promotions. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_roles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-065",
    domain: "hr",
    level: 5,
    order: 65,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #65: Salary Growth Model",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and salaries_history. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-066",
    domain: "hr",
    level: 5,
    order: 66,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #66: Department Role Structure",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing departments and job_roles. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on departments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-067",
    domain: "hr",
    level: 5,
    order: 67,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #67: Performance Incentive Alignment",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and performance_reviews. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-068",
    domain: "hr",
    level: 5,
    order: 68,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #68: Leave Impact on Headcount",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and leave_requests. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-069",
    domain: "hr",
    level: 5,
    order: 69,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #69: Shift Attendance Efficiency",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and attendance_logs. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-070",
    domain: "hr",
    level: 5,
    order: 70,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #70: Hiring Funnel Calibration",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing job_openings and candidates. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_openings.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-071",
    domain: "hr",
    level: 5,
    order: 71,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #71: Training ROI Benchmark",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing training_courses and employee_trainings. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on training_courses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-072",
    domain: "hr",
    level: 5,
    order: 72,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #72: Benefits Enrollment Distribution",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing benefits_packages and employee_benefits. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on benefits_packages.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-073",
    domain: "hr",
    level: 5,
    order: 73,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #73: Promotion Ceiling Analytics",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing job_roles and employee_promotions. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_roles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-074",
    domain: "hr",
    level: 5,
    order: 74,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #74: Salary Growth Model",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and salaries_history. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-075",
    domain: "hr",
    level: 5,
    order: 75,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #75: Department Role Structure",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing departments and job_roles. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on departments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-076",
    domain: "hr",
    level: 5,
    order: 76,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #76: Performance Incentive Alignment",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and performance_reviews. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-077",
    domain: "hr",
    level: 5,
    order: 77,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #77: Leave Impact on Headcount",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and leave_requests. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-078",
    domain: "hr",
    level: 5,
    order: 78,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #78: Shift Attendance Efficiency",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and attendance_logs. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-079",
    domain: "hr",
    level: 5,
    order: 79,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #79: Hiring Funnel Calibration",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing job_openings and candidates. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_openings.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-080",
    domain: "hr",
    level: 5,
    order: 80,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #80: Training ROI Benchmark",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing training_courses and employee_trainings. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on training_courses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-081",
    domain: "hr",
    level: 5,
    order: 81,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #81: Benefits Enrollment Distribution",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing benefits_packages and employee_benefits. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on benefits_packages.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-082",
    domain: "hr",
    level: 5,
    order: 82,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #82: Promotion Ceiling Analytics",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing job_roles and employee_promotions. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_roles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-083",
    domain: "hr",
    level: 5,
    order: 83,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #83: Salary Growth Model",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and salaries_history. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-084",
    domain: "hr",
    level: 5,
    order: 84,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #84: Department Role Structure",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing departments and job_roles. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on departments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-085",
    domain: "hr",
    level: 5,
    order: 85,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #85: Performance Incentive Alignment",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and performance_reviews. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-086",
    domain: "hr",
    level: 5,
    order: 86,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #86: Leave Impact on Headcount",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and leave_requests. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-087",
    domain: "hr",
    level: 5,
    order: 87,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #87: Shift Attendance Efficiency",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and attendance_logs. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-088",
    domain: "hr",
    level: 5,
    order: 88,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #88: Hiring Funnel Calibration",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing job_openings and candidates. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_openings.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-089",
    domain: "hr",
    level: 5,
    order: 89,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #89: Training ROI Benchmark",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing training_courses and employee_trainings. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on training_courses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-090",
    domain: "hr",
    level: 5,
    order: 90,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #90: Benefits Enrollment Distribution",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing benefits_packages and employee_benefits. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on benefits_packages.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-091",
    domain: "hr",
    level: 5,
    order: 91,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #91: Promotion Ceiling Analytics",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing job_roles and employee_promotions. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_roles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-092",
    domain: "hr",
    level: 5,
    order: 92,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #92: Salary Growth Model",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and salaries_history. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-093",
    domain: "hr",
    level: 5,
    order: 93,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #93: Department Role Structure",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing departments and job_roles. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on departments.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-094",
    domain: "hr",
    level: 5,
    order: 94,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #94: Performance Incentive Alignment",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and performance_reviews. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-095",
    domain: "hr",
    level: 5,
    order: 95,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #95: Leave Impact on Headcount",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and leave_requests. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-096",
    domain: "hr",
    level: 5,
    order: 96,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #96: Shift Attendance Efficiency",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing employees and attendance_logs. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on employees.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-097",
    domain: "hr",
    level: 5,
    order: 97,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #97: Hiring Funnel Calibration",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Construct an enterprise workforce CTE summarizing job_openings and candidates. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_openings.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-098",
    domain: "hr",
    level: 5,
    order: 98,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #98: Training ROI Benchmark",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Construct an enterprise workforce CTE summarizing training_courses and employee_trainings. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on training_courses.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-099",
    domain: "hr",
    level: 5,
    order: 99,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #99: Benefits Enrollment Distribution",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Construct an enterprise workforce CTE summarizing benefits_packages and employee_benefits. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on benefits_packages.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  },
  {
    id: "hr-L5-100",
    domain: "hr",
    level: 5,
    order: 100,
    difficulty: "expert",
    title: "Enterprise HR CTE Model #100: Promotion Ceiling Analytics",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Construct an enterprise workforce CTE summarizing job_roles and employee_promotions. Aggregate personnel metrics by department or employee, returning identifier, name, and calculated totals, ordered by primary volume descending.",
    context_notes: "Enterprise workforce aggregation and strategic modeling on job_roles.",
    concepts: ["CTE","Enterprise Modeling","LEFT JOIN","COALESCE"],
    expected_columns: ["id","name","total_employees","aggregate_payroll"],
    reference_sql: "WITH cte1 AS (SELECT department_id, COUNT(*) AS item_count, SUM(salary) AS total_payroll FROM employees GROUP BY department_id) SELECT d.id, d.name, COALESCE(c.item_count, 0) AS total_employees, COALESCE(c.total_payroll, 0) AS aggregate_payroll FROM departments d LEFT JOIN cte1 c ON d.id = c.department_id ORDER BY aggregate_payroll DESC, d.id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use Common Table Expressions (WITH cte1 AS (...)) and join onto departments."
    ],
    starter_sql: "WITH\n  -- Complete enterprise CTE\nSELECT\nFROM\n;"
  }
];
