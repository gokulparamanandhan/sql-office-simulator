// ============================================================================
// HUMAN RESOURCES — LEVEL 4: WINDOW FUNCTIONS & ANALYTIC TALENT BENCHMARKS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (14): departments, job_roles, locations, employees, attendance_logs,
//              leave_requests, salaries_history, performance_reviews, benefits_packages,
//              employee_benefits, training_courses, employee_trainings, job_openings, candidates
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L4_QUESTIONS: QuestionDefinition[] = [
  {
    id: "hr-L4-001",
    domain: "hr",
    level: 4,
    order: 1,
    difficulty: "hard",
    title: "Candidate Interview Score Rankings by Job Opening",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Rank candidates for each open requisition by their interview score. Display opening_id, candidate name, stage, interview_score, and rank, ordered by opening_id, then rank ascending.",
    context_notes: "Candidate talent shortlisting across active recruiting pipelines.",
    concepts: ["Window Functions","DENSE_RANK()","Recruiting Analytics"],
    expected_columns: ["opening_id","name","stage","interview_score","candidate_rank"],
    reference_sql: "SELECT opening_id, name, stage, interview_score, DENSE_RANK() OVER (PARTITION BY opening_id ORDER BY interview_score DESC) AS candidate_rank FROM candidates ORDER BY opening_id, candidate_rank;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use DENSE_RANK() OVER (PARTITION BY opening_id ORDER BY interview_score DESC)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-002",
    domain: "hr",
    level: 4,
    order: 2,
    difficulty: "hard",
    title: "Employee Salary Ranking within Department",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "We need an equity audit of salaries within departments. For each employee, display department_id, name, salary, and their salary rank within that department (highest paid = 1).",
    context_notes: "Departmental salary hierarchy and compensation distribution.",
    concepts: ["Window Functions","DENSE_RANK()","Compensation Equity"],
    expected_columns: ["department_id","name","salary","dept_salary_rank"],
    reference_sql: "SELECT department_id, name, salary, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_salary_rank FROM employees ORDER BY department_id, dept_salary_rank;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-003",
    domain: "hr",
    level: 4,
    order: 3,
    difficulty: "hard",
    title: "Cumulative Department Payroll Running Sum",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Calculate a running cumulative sum of employee salaries within each department, ordered by employee hire_date and id. Show department_id, id, name, salary, and running_payroll.",
    context_notes: "Tracking headcount expense accumulation over time.",
    concepts: ["Window Functions","SUM() OVER","Payroll Modeling"],
    expected_columns: ["department_id","id","name","salary","running_payroll"],
    reference_sql: "SELECT department_id, id, name, salary, SUM(salary) OVER (PARTITION BY department_id ORDER BY hire_date, id) AS running_payroll FROM employees ORDER BY department_id, hire_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(salary) OVER (PARTITION BY department_id ORDER BY hire_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-004",
    domain: "hr",
    level: 4,
    order: 4,
    difficulty: "hard",
    title: "Salary History Raise Delta vs Previous Adjustment",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Track salary trajectory per employee. Display employee_id, effective_date, new_salary, and the previous new_salary using LAG to measure raise cadence.",
    context_notes: "Longitudinal compensation progression tracking.",
    concepts: ["Window Functions","LAG()","Compensation History"],
    expected_columns: ["employee_id","effective_date","new_salary","prior_adjustment_salary"],
    reference_sql: "SELECT employee_id, effective_date, new_salary, LAG(new_salary, 1) OVER (PARTITION BY employee_id ORDER BY effective_date, id) AS prior_adjustment_salary FROM salaries_history ORDER BY employee_id, effective_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use LAG(new_salary, 1) OVER (PARTITION BY employee_id ORDER BY effective_date, id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-005",
    domain: "hr",
    level: 4,
    order: 5,
    difficulty: "hard",
    title: "Candidate Talent Score Quartiles",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Segment all interviewed candidates into 4 performance quartiles based on interview_score. Return name, opening_id, interview_score, and quartile (1 = top quartile).",
    context_notes: "Recruiting applicant talent tier segmentation.",
    concepts: ["Window Functions","NTILE()","Talent Analytics"],
    expected_columns: ["name","opening_id","interview_score","score_quartile"],
    reference_sql: "SELECT name, opening_id, interview_score, NTILE(4) OVER (ORDER BY interview_score DESC) AS score_quartile FROM candidates ORDER BY score_quartile, interview_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use NTILE(4) OVER (ORDER BY interview_score DESC)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-006",
    domain: "hr",
    level: 4,
    order: 6,
    difficulty: "hard",
    title: "Consecutive Shift Hours Difference",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "For each employee's attendance logs, calculate the difference between hours worked on the current shift and hours worked on the previous shift.",
    context_notes: "Shift fatigue and hour variance monitoring.",
    concepts: ["Window Functions","LAG()","Attendance Analysis"],
    expected_columns: ["employee_id","work_date","hours_worked","hours_delta"],
    reference_sql: "SELECT employee_id, work_date, hours_worked, (hours_worked - LAG(hours_worked, 1) OVER (PARTITION BY employee_id ORDER BY work_date, id)) AS hours_delta FROM attendance_logs ORDER BY employee_id, work_date;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Subtract LAG(hours_worked, 1) from hours_worked partitioned by employee_id."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-007",
    domain: "hr",
    level: 4,
    order: 7,
    difficulty: "hard",
    title: "Employee Salary Deviation from Department Average",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Show each employee's name, department_id, salary, and the average department salary, along with the difference (salary - avg_dept_salary).",
    context_notes: "Pay parity and salary band compression auditing.",
    concepts: ["Window Functions","AVG() OVER","Compensation Parity"],
    expected_columns: ["name","department_id","salary","dept_avg_sal","diff_from_dept_avg"],
    reference_sql: "SELECT name, department_id, salary, ROUND(AVG(salary) OVER (PARTITION BY department_id), 2) AS dept_avg_sal, ROUND((salary - AVG(salary) OVER (PARTITION BY department_id)), 2) AS diff_from_dept_avg FROM employees ORDER BY department_id, salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Compute AVG(salary) OVER (PARTITION BY department_id) and subtract it from salary."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-008",
    domain: "hr",
    level: 4,
    order: 8,
    difficulty: "hard",
    title: "Top 2 Highest Paid Employees per Department",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Retrieve the top 2 highest paid employees for every department. Display department_id, name, salary, and rank using a subquery over ROW_NUMBER().",
    context_notes: "Department compensation leadership benchmarking.",
    concepts: ["Window Functions","ROW_NUMBER()","Subqueries"],
    expected_columns: ["department_id","name","salary","rnk"],
    reference_sql: "SELECT department_id, name, salary, rnk FROM (SELECT department_id, name, salary, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk FROM employees) sub WHERE rnk <= 2 ORDER BY department_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Filter on ROW_NUMBER() <= 2 inside a subquery."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-009",
    domain: "hr",
    level: 4,
    order: 9,
    difficulty: "hard",
    title: "Top Candidate per Job Opening",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Identify the single highest-scoring candidate for each job opening. Display opening_id, name, interview_score, and stage.",
    context_notes: "Requisition offer selection prioritization.",
    concepts: ["Window Functions","ROW_NUMBER()","Recruiting"],
    expected_columns: ["opening_id","name","interview_score","stage"],
    reference_sql: "SELECT opening_id, name, interview_score, stage FROM (SELECT opening_id, name, interview_score, stage, ROW_NUMBER() OVER (PARTITION BY opening_id ORDER BY interview_score DESC) AS rnk FROM candidates) sub WHERE rnk = 1 ORDER BY opening_id ASC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use ROW_NUMBER() OVER (PARTITION BY opening_id ORDER BY interview_score DESC) in a subquery and filter for rnk = 1."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-010",
    domain: "hr",
    level: 4,
    order: 10,
    difficulty: "hard",
    title: "Performance Review Rating Percentile",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Calculate the percentile ranking of performance review ratings across all reviews. Show employee_id, review_year, rating, and percentile rank.",
    context_notes: "Performance bell curve normalization.",
    concepts: ["Window Functions","PERCENT_RANK()","Performance Management"],
    expected_columns: ["employee_id","review_year","rating","rating_percentile"],
    reference_sql: "SELECT employee_id, review_year, rating, PERCENT_RANK() OVER (ORDER BY rating) AS rating_percentile FROM performance_reviews ORDER BY rating DESC, employee_id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use PERCENT_RANK() OVER (ORDER BY rating)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-011",
    domain: "hr",
    level: 4,
    order: 11,
    difficulty: "hard",
    title: "EMPLOYEES: Running Total by department id",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Calculate the cumulative running total of salary partitioned by department_id in employees, ordered chronologically by id.",
    context_notes: "Analytic workforce computation on employees utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","employees"],
    expected_columns: ["id","department_id","salary","running_salary"],
    reference_sql: "SELECT id, department_id, salary, SUM(salary) OVER (PARTITION BY department_id ORDER BY id, id) AS running_salary FROM employees ORDER BY department_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-012",
    domain: "hr",
    level: 4,
    order: 12,
    difficulty: "hard",
    title: "EMPLOYEES: Rank by Magnitude by department id",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Rank records within each department_id in employees based on salary descending.",
    context_notes: "Analytic workforce computation on employees utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","employees"],
    expected_columns: ["id","department_id","salary","rnk"],
    reference_sql: "SELECT id, department_id, salary, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk FROM employees ORDER BY department_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-013",
    domain: "hr",
    level: 4,
    order: 13,
    difficulty: "hard",
    title: "EMPLOYEES: Dense Rank by Magnitude by department id",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compute dense ranking of salary within each department_id in employees.",
    context_notes: "Analytic workforce computation on employees utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","employees"],
    expected_columns: ["id","department_id","salary","dense_rnk"],
    reference_sql: "SELECT id, department_id, salary, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dense_rnk FROM employees ORDER BY department_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-014",
    domain: "hr",
    level: 4,
    order: 14,
    difficulty: "hard",
    title: "EMPLOYEES: Previous Record Lag Comparison by department id",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Retrieve preceding salary for each department_id record in employees to track step changes.",
    context_notes: "Analytic workforce computation on employees utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","employees"],
    expected_columns: ["id","department_id","salary","prev_salary"],
    reference_sql: "SELECT id, department_id, salary, LAG(salary, 1) OVER (PARTITION BY department_id ORDER BY id, id) AS prev_salary FROM employees ORDER BY department_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-015",
    domain: "hr",
    level: 4,
    order: 15,
    difficulty: "hard",
    title: "EMPLOYEES: Next Record Lead Projection by department id",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compare each record's salary with the subsequent record's salary within department_id in employees.",
    context_notes: "Analytic workforce computation on employees utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","employees"],
    expected_columns: ["id","department_id","salary","next_salary"],
    reference_sql: "SELECT id, department_id, salary, LEAD(salary, 1) OVER (PARTITION BY department_id ORDER BY id, id) AS next_salary FROM employees ORDER BY department_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-016",
    domain: "hr",
    level: 4,
    order: 16,
    difficulty: "hard",
    title: "EMPLOYEES: Cohort Average Benchmark by department id",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Benchmark individual salary against the cohort average salary across the same department_id in employees.",
    context_notes: "Analytic workforce computation on employees utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","employees"],
    expected_columns: ["id","department_id","salary","avg_salary_cohort"],
    reference_sql: "SELECT id, department_id, salary, AVG(salary) OVER (PARTITION BY department_id) AS avg_salary_cohort FROM employees ORDER BY department_id, salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-017",
    domain: "hr",
    level: 4,
    order: 17,
    difficulty: "hard",
    title: "EMPLOYEES: Quartile Distribution by department id",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Distribute records in employees into 4 equal quartiles based on salary within each department_id.",
    context_notes: "Analytic workforce computation on employees utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","employees"],
    expected_columns: ["id","department_id","salary","quartile"],
    reference_sql: "SELECT id, department_id, salary, NTILE(4) OVER (PARTITION BY department_id ORDER BY salary DESC) AS quartile FROM employees ORDER BY department_id, quartile, salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-018",
    domain: "hr",
    level: 4,
    order: 18,
    difficulty: "hard",
    title: "CANDIDATES: Running Total by opening id",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Calculate the cumulative running total of interview_score partitioned by opening_id in candidates, ordered chronologically by id.",
    context_notes: "Analytic workforce computation on candidates utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","candidates"],
    expected_columns: ["id","opening_id","interview_score","running_interview_score"],
    reference_sql: "SELECT id, opening_id, interview_score, SUM(interview_score) OVER (PARTITION BY opening_id ORDER BY id, id) AS running_interview_score FROM candidates ORDER BY opening_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-019",
    domain: "hr",
    level: 4,
    order: 19,
    difficulty: "hard",
    title: "CANDIDATES: Rank by Magnitude by opening id",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Rank records within each opening_id in candidates based on interview_score descending.",
    context_notes: "Analytic workforce computation on candidates utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","candidates"],
    expected_columns: ["id","opening_id","interview_score","rnk"],
    reference_sql: "SELECT id, opening_id, interview_score, RANK() OVER (PARTITION BY opening_id ORDER BY interview_score DESC) AS rnk FROM candidates ORDER BY opening_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-020",
    domain: "hr",
    level: 4,
    order: 20,
    difficulty: "hard",
    title: "CANDIDATES: Dense Rank by Magnitude by opening id",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compute dense ranking of interview_score within each opening_id in candidates.",
    context_notes: "Analytic workforce computation on candidates utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","candidates"],
    expected_columns: ["id","opening_id","interview_score","dense_rnk"],
    reference_sql: "SELECT id, opening_id, interview_score, DENSE_RANK() OVER (PARTITION BY opening_id ORDER BY interview_score DESC) AS dense_rnk FROM candidates ORDER BY opening_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-021",
    domain: "hr",
    level: 4,
    order: 21,
    difficulty: "hard",
    title: "CANDIDATES: Previous Record Lag Comparison by opening id",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Retrieve preceding interview_score for each opening_id record in candidates to track step changes.",
    context_notes: "Analytic workforce computation on candidates utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","candidates"],
    expected_columns: ["id","opening_id","interview_score","prev_interview_score"],
    reference_sql: "SELECT id, opening_id, interview_score, LAG(interview_score, 1) OVER (PARTITION BY opening_id ORDER BY id, id) AS prev_interview_score FROM candidates ORDER BY opening_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-022",
    domain: "hr",
    level: 4,
    order: 22,
    difficulty: "hard",
    title: "CANDIDATES: Next Record Lead Projection by opening id",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Compare each record's interview_score with the subsequent record's interview_score within opening_id in candidates.",
    context_notes: "Analytic workforce computation on candidates utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","candidates"],
    expected_columns: ["id","opening_id","interview_score","next_interview_score"],
    reference_sql: "SELECT id, opening_id, interview_score, LEAD(interview_score, 1) OVER (PARTITION BY opening_id ORDER BY id, id) AS next_interview_score FROM candidates ORDER BY opening_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-023",
    domain: "hr",
    level: 4,
    order: 23,
    difficulty: "hard",
    title: "CANDIDATES: Cohort Average Benchmark by opening id",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Benchmark individual interview_score against the cohort average interview_score across the same opening_id in candidates.",
    context_notes: "Analytic workforce computation on candidates utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","candidates"],
    expected_columns: ["id","opening_id","interview_score","avg_interview_score_cohort"],
    reference_sql: "SELECT id, opening_id, interview_score, AVG(interview_score) OVER (PARTITION BY opening_id) AS avg_interview_score_cohort FROM candidates ORDER BY opening_id, interview_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-024",
    domain: "hr",
    level: 4,
    order: 24,
    difficulty: "hard",
    title: "CANDIDATES: Quartile Distribution by opening id",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Distribute records in candidates into 4 equal quartiles based on interview_score within each opening_id.",
    context_notes: "Analytic workforce computation on candidates utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","candidates"],
    expected_columns: ["id","opening_id","interview_score","quartile"],
    reference_sql: "SELECT id, opening_id, interview_score, NTILE(4) OVER (PARTITION BY opening_id ORDER BY interview_score DESC) AS quartile FROM candidates ORDER BY opening_id, quartile, interview_score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-025",
    domain: "hr",
    level: 4,
    order: 25,
    difficulty: "hard",
    title: "SALARIES HISTORY: Running Total by employee id",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Calculate the cumulative running total of new_salary partitioned by employee_id in salaries_history, ordered chronologically by effective_date.",
    context_notes: "Analytic workforce computation on salaries_history utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","salaries_history"],
    expected_columns: ["id","employee_id","new_salary","running_new_salary"],
    reference_sql: "SELECT id, employee_id, new_salary, SUM(new_salary) OVER (PARTITION BY employee_id ORDER BY effective_date, id) AS running_new_salary FROM salaries_history ORDER BY employee_id, effective_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-026",
    domain: "hr",
    level: 4,
    order: 26,
    difficulty: "hard",
    title: "SALARIES HISTORY: Rank by Magnitude by employee id",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Rank records within each employee_id in salaries_history based on new_salary descending.",
    context_notes: "Analytic workforce computation on salaries_history utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","salaries_history"],
    expected_columns: ["id","employee_id","new_salary","rnk"],
    reference_sql: "SELECT id, employee_id, new_salary, RANK() OVER (PARTITION BY employee_id ORDER BY new_salary DESC) AS rnk FROM salaries_history ORDER BY employee_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-027",
    domain: "hr",
    level: 4,
    order: 27,
    difficulty: "hard",
    title: "SALARIES HISTORY: Dense Rank by Magnitude by employee id",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compute dense ranking of new_salary within each employee_id in salaries_history.",
    context_notes: "Analytic workforce computation on salaries_history utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","salaries_history"],
    expected_columns: ["id","employee_id","new_salary","dense_rnk"],
    reference_sql: "SELECT id, employee_id, new_salary, DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY new_salary DESC) AS dense_rnk FROM salaries_history ORDER BY employee_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-028",
    domain: "hr",
    level: 4,
    order: 28,
    difficulty: "hard",
    title: "SALARIES HISTORY: Previous Record Lag Comparison by employee id",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Retrieve preceding new_salary for each employee_id record in salaries_history to track step changes.",
    context_notes: "Analytic workforce computation on salaries_history utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","salaries_history"],
    expected_columns: ["id","employee_id","new_salary","prev_new_salary"],
    reference_sql: "SELECT id, employee_id, new_salary, LAG(new_salary, 1) OVER (PARTITION BY employee_id ORDER BY effective_date, id) AS prev_new_salary FROM salaries_history ORDER BY employee_id, effective_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-029",
    domain: "hr",
    level: 4,
    order: 29,
    difficulty: "hard",
    title: "SALARIES HISTORY: Next Record Lead Projection by employee id",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compare each record's new_salary with the subsequent record's new_salary within employee_id in salaries_history.",
    context_notes: "Analytic workforce computation on salaries_history utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","salaries_history"],
    expected_columns: ["id","employee_id","new_salary","next_new_salary"],
    reference_sql: "SELECT id, employee_id, new_salary, LEAD(new_salary, 1) OVER (PARTITION BY employee_id ORDER BY effective_date, id) AS next_new_salary FROM salaries_history ORDER BY employee_id, effective_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-030",
    domain: "hr",
    level: 4,
    order: 30,
    difficulty: "hard",
    title: "SALARIES HISTORY: Cohort Average Benchmark by employee id",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Benchmark individual new_salary against the cohort average new_salary across the same employee_id in salaries_history.",
    context_notes: "Analytic workforce computation on salaries_history utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","salaries_history"],
    expected_columns: ["id","employee_id","new_salary","avg_new_salary_cohort"],
    reference_sql: "SELECT id, employee_id, new_salary, AVG(new_salary) OVER (PARTITION BY employee_id) AS avg_new_salary_cohort FROM salaries_history ORDER BY employee_id, new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-031",
    domain: "hr",
    level: 4,
    order: 31,
    difficulty: "hard",
    title: "SALARIES HISTORY: Quartile Distribution by employee id",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Distribute records in salaries_history into 4 equal quartiles based on new_salary within each employee_id.",
    context_notes: "Analytic workforce computation on salaries_history utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","salaries_history"],
    expected_columns: ["id","employee_id","new_salary","quartile"],
    reference_sql: "SELECT id, employee_id, new_salary, NTILE(4) OVER (PARTITION BY employee_id ORDER BY new_salary DESC) AS quartile FROM salaries_history ORDER BY employee_id, quartile, new_salary DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-032",
    domain: "hr",
    level: 4,
    order: 32,
    difficulty: "hard",
    title: "ATTENDANCE LOGS: Running Total by employee id",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Calculate the cumulative running total of hours_worked partitioned by employee_id in attendance_logs, ordered chronologically by work_date.",
    context_notes: "Analytic workforce computation on attendance_logs utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","attendance_logs"],
    expected_columns: ["id","employee_id","hours_worked","running_hours_worked"],
    reference_sql: "SELECT id, employee_id, hours_worked, SUM(hours_worked) OVER (PARTITION BY employee_id ORDER BY work_date, id) AS running_hours_worked FROM attendance_logs ORDER BY employee_id, work_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-033",
    domain: "hr",
    level: 4,
    order: 33,
    difficulty: "hard",
    title: "ATTENDANCE LOGS: Rank by Magnitude by employee id",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Rank records within each employee_id in attendance_logs based on hours_worked descending.",
    context_notes: "Analytic workforce computation on attendance_logs utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","attendance_logs"],
    expected_columns: ["id","employee_id","hours_worked","rnk"],
    reference_sql: "SELECT id, employee_id, hours_worked, RANK() OVER (PARTITION BY employee_id ORDER BY hours_worked DESC) AS rnk FROM attendance_logs ORDER BY employee_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-034",
    domain: "hr",
    level: 4,
    order: 34,
    difficulty: "hard",
    title: "ATTENDANCE LOGS: Dense Rank by Magnitude by employee id",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Compute dense ranking of hours_worked within each employee_id in attendance_logs.",
    context_notes: "Analytic workforce computation on attendance_logs utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","attendance_logs"],
    expected_columns: ["id","employee_id","hours_worked","dense_rnk"],
    reference_sql: "SELECT id, employee_id, hours_worked, DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY hours_worked DESC) AS dense_rnk FROM attendance_logs ORDER BY employee_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-035",
    domain: "hr",
    level: 4,
    order: 35,
    difficulty: "hard",
    title: "ATTENDANCE LOGS: Previous Record Lag Comparison by employee id",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Retrieve preceding hours_worked for each employee_id record in attendance_logs to track step changes.",
    context_notes: "Analytic workforce computation on attendance_logs utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","attendance_logs"],
    expected_columns: ["id","employee_id","hours_worked","prev_hours_worked"],
    reference_sql: "SELECT id, employee_id, hours_worked, LAG(hours_worked, 1) OVER (PARTITION BY employee_id ORDER BY work_date, id) AS prev_hours_worked FROM attendance_logs ORDER BY employee_id, work_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-036",
    domain: "hr",
    level: 4,
    order: 36,
    difficulty: "hard",
    title: "ATTENDANCE LOGS: Next Record Lead Projection by employee id",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compare each record's hours_worked with the subsequent record's hours_worked within employee_id in attendance_logs.",
    context_notes: "Analytic workforce computation on attendance_logs utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","attendance_logs"],
    expected_columns: ["id","employee_id","hours_worked","next_hours_worked"],
    reference_sql: "SELECT id, employee_id, hours_worked, LEAD(hours_worked, 1) OVER (PARTITION BY employee_id ORDER BY work_date, id) AS next_hours_worked FROM attendance_logs ORDER BY employee_id, work_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-037",
    domain: "hr",
    level: 4,
    order: 37,
    difficulty: "hard",
    title: "ATTENDANCE LOGS: Cohort Average Benchmark by employee id",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Benchmark individual hours_worked against the cohort average hours_worked across the same employee_id in attendance_logs.",
    context_notes: "Analytic workforce computation on attendance_logs utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","attendance_logs"],
    expected_columns: ["id","employee_id","hours_worked","avg_hours_worked_cohort"],
    reference_sql: "SELECT id, employee_id, hours_worked, AVG(hours_worked) OVER (PARTITION BY employee_id) AS avg_hours_worked_cohort FROM attendance_logs ORDER BY employee_id, hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-038",
    domain: "hr",
    level: 4,
    order: 38,
    difficulty: "hard",
    title: "ATTENDANCE LOGS: Quartile Distribution by employee id",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Distribute records in attendance_logs into 4 equal quartiles based on hours_worked within each employee_id.",
    context_notes: "Analytic workforce computation on attendance_logs utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","attendance_logs"],
    expected_columns: ["id","employee_id","hours_worked","quartile"],
    reference_sql: "SELECT id, employee_id, hours_worked, NTILE(4) OVER (PARTITION BY employee_id ORDER BY hours_worked DESC) AS quartile FROM attendance_logs ORDER BY employee_id, quartile, hours_worked DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-039",
    domain: "hr",
    level: 4,
    order: 39,
    difficulty: "hard",
    title: "LEAVE REQUESTS: Running Total by employee id",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Calculate the cumulative running total of total_days partitioned by employee_id in leave_requests, ordered chronologically by start_date.",
    context_notes: "Analytic workforce computation on leave_requests utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","leave_requests"],
    expected_columns: ["id","employee_id","total_days","running_total_days"],
    reference_sql: "SELECT id, employee_id, total_days, SUM(total_days) OVER (PARTITION BY employee_id ORDER BY start_date, id) AS running_total_days FROM leave_requests ORDER BY employee_id, start_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-040",
    domain: "hr",
    level: 4,
    order: 40,
    difficulty: "hard",
    title: "LEAVE REQUESTS: Rank by Magnitude by employee id",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Rank records within each employee_id in leave_requests based on total_days descending.",
    context_notes: "Analytic workforce computation on leave_requests utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","leave_requests"],
    expected_columns: ["id","employee_id","total_days","rnk"],
    reference_sql: "SELECT id, employee_id, total_days, RANK() OVER (PARTITION BY employee_id ORDER BY total_days DESC) AS rnk FROM leave_requests ORDER BY employee_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-041",
    domain: "hr",
    level: 4,
    order: 41,
    difficulty: "hard",
    title: "LEAVE REQUESTS: Dense Rank by Magnitude by employee id",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compute dense ranking of total_days within each employee_id in leave_requests.",
    context_notes: "Analytic workforce computation on leave_requests utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","leave_requests"],
    expected_columns: ["id","employee_id","total_days","dense_rnk"],
    reference_sql: "SELECT id, employee_id, total_days, DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY total_days DESC) AS dense_rnk FROM leave_requests ORDER BY employee_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-042",
    domain: "hr",
    level: 4,
    order: 42,
    difficulty: "hard",
    title: "LEAVE REQUESTS: Previous Record Lag Comparison by employee id",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Retrieve preceding total_days for each employee_id record in leave_requests to track step changes.",
    context_notes: "Analytic workforce computation on leave_requests utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","leave_requests"],
    expected_columns: ["id","employee_id","total_days","prev_total_days"],
    reference_sql: "SELECT id, employee_id, total_days, LAG(total_days, 1) OVER (PARTITION BY employee_id ORDER BY start_date, id) AS prev_total_days FROM leave_requests ORDER BY employee_id, start_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-043",
    domain: "hr",
    level: 4,
    order: 43,
    difficulty: "hard",
    title: "LEAVE REQUESTS: Next Record Lead Projection by employee id",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compare each record's total_days with the subsequent record's total_days within employee_id in leave_requests.",
    context_notes: "Analytic workforce computation on leave_requests utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","leave_requests"],
    expected_columns: ["id","employee_id","total_days","next_total_days"],
    reference_sql: "SELECT id, employee_id, total_days, LEAD(total_days, 1) OVER (PARTITION BY employee_id ORDER BY start_date, id) AS next_total_days FROM leave_requests ORDER BY employee_id, start_date, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-044",
    domain: "hr",
    level: 4,
    order: 44,
    difficulty: "hard",
    title: "LEAVE REQUESTS: Cohort Average Benchmark by employee id",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Benchmark individual total_days against the cohort average total_days across the same employee_id in leave_requests.",
    context_notes: "Analytic workforce computation on leave_requests utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","leave_requests"],
    expected_columns: ["id","employee_id","total_days","avg_total_days_cohort"],
    reference_sql: "SELECT id, employee_id, total_days, AVG(total_days) OVER (PARTITION BY employee_id) AS avg_total_days_cohort FROM leave_requests ORDER BY employee_id, total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-045",
    domain: "hr",
    level: 4,
    order: 45,
    difficulty: "hard",
    title: "LEAVE REQUESTS: Quartile Distribution by employee id",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Distribute records in leave_requests into 4 equal quartiles based on total_days within each employee_id.",
    context_notes: "Analytic workforce computation on leave_requests utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","leave_requests"],
    expected_columns: ["id","employee_id","total_days","quartile"],
    reference_sql: "SELECT id, employee_id, total_days, NTILE(4) OVER (PARTITION BY employee_id ORDER BY total_days DESC) AS quartile FROM leave_requests ORDER BY employee_id, quartile, total_days DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-046",
    domain: "hr",
    level: 4,
    order: 46,
    difficulty: "hard",
    title: "PERFORMANCE REVIEWS: Running Total by review year",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Calculate the cumulative running total of bonus_pct partitioned by review_year in performance_reviews, ordered chronologically by id.",
    context_notes: "Analytic workforce computation on performance_reviews utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","performance_reviews"],
    expected_columns: ["id","review_year","bonus_pct","running_bonus_pct"],
    reference_sql: "SELECT id, review_year, bonus_pct, SUM(bonus_pct) OVER (PARTITION BY review_year ORDER BY id, id) AS running_bonus_pct FROM performance_reviews ORDER BY review_year, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-047",
    domain: "hr",
    level: 4,
    order: 47,
    difficulty: "hard",
    title: "PERFORMANCE REVIEWS: Rank by Magnitude by review year",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Rank records within each review_year in performance_reviews based on bonus_pct descending.",
    context_notes: "Analytic workforce computation on performance_reviews utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","performance_reviews"],
    expected_columns: ["id","review_year","bonus_pct","rnk"],
    reference_sql: "SELECT id, review_year, bonus_pct, RANK() OVER (PARTITION BY review_year ORDER BY bonus_pct DESC) AS rnk FROM performance_reviews ORDER BY review_year, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-048",
    domain: "hr",
    level: 4,
    order: 48,
    difficulty: "hard",
    title: "PERFORMANCE REVIEWS: Dense Rank by Magnitude by review year",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compute dense ranking of bonus_pct within each review_year in performance_reviews.",
    context_notes: "Analytic workforce computation on performance_reviews utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","performance_reviews"],
    expected_columns: ["id","review_year","bonus_pct","dense_rnk"],
    reference_sql: "SELECT id, review_year, bonus_pct, DENSE_RANK() OVER (PARTITION BY review_year ORDER BY bonus_pct DESC) AS dense_rnk FROM performance_reviews ORDER BY review_year, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-049",
    domain: "hr",
    level: 4,
    order: 49,
    difficulty: "hard",
    title: "PERFORMANCE REVIEWS: Previous Record Lag Comparison by review year",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Retrieve preceding bonus_pct for each review_year record in performance_reviews to track step changes.",
    context_notes: "Analytic workforce computation on performance_reviews utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","performance_reviews"],
    expected_columns: ["id","review_year","bonus_pct","prev_bonus_pct"],
    reference_sql: "SELECT id, review_year, bonus_pct, LAG(bonus_pct, 1) OVER (PARTITION BY review_year ORDER BY id, id) AS prev_bonus_pct FROM performance_reviews ORDER BY review_year, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-050",
    domain: "hr",
    level: 4,
    order: 50,
    difficulty: "hard",
    title: "PERFORMANCE REVIEWS: Next Record Lead Projection by review year",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Compare each record's bonus_pct with the subsequent record's bonus_pct within review_year in performance_reviews.",
    context_notes: "Analytic workforce computation on performance_reviews utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","performance_reviews"],
    expected_columns: ["id","review_year","bonus_pct","next_bonus_pct"],
    reference_sql: "SELECT id, review_year, bonus_pct, LEAD(bonus_pct, 1) OVER (PARTITION BY review_year ORDER BY id, id) AS next_bonus_pct FROM performance_reviews ORDER BY review_year, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-051",
    domain: "hr",
    level: 4,
    order: 51,
    difficulty: "hard",
    title: "PERFORMANCE REVIEWS: Cohort Average Benchmark by review year",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Benchmark individual bonus_pct against the cohort average bonus_pct across the same review_year in performance_reviews.",
    context_notes: "Analytic workforce computation on performance_reviews utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","performance_reviews"],
    expected_columns: ["id","review_year","bonus_pct","avg_bonus_pct_cohort"],
    reference_sql: "SELECT id, review_year, bonus_pct, AVG(bonus_pct) OVER (PARTITION BY review_year) AS avg_bonus_pct_cohort FROM performance_reviews ORDER BY review_year, bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-052",
    domain: "hr",
    level: 4,
    order: 52,
    difficulty: "hard",
    title: "PERFORMANCE REVIEWS: Quartile Distribution by review year",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Distribute records in performance_reviews into 4 equal quartiles based on bonus_pct within each review_year.",
    context_notes: "Analytic workforce computation on performance_reviews utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","performance_reviews"],
    expected_columns: ["id","review_year","bonus_pct","quartile"],
    reference_sql: "SELECT id, review_year, bonus_pct, NTILE(4) OVER (PARTITION BY review_year ORDER BY bonus_pct DESC) AS quartile FROM performance_reviews ORDER BY review_year, quartile, bonus_pct DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-053",
    domain: "hr",
    level: 4,
    order: 53,
    difficulty: "hard",
    title: "EMPLOYEE TRAININGS: Running Total by course id",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Calculate the cumulative running total of score partitioned by course_id in employee_trainings, ordered chronologically by id.",
    context_notes: "Analytic workforce computation on employee_trainings utilizing SUM() OVER (PARTITION BY ... ORDER BY ...).",
    concepts: ["Window Functions","Running Total","employee_trainings"],
    expected_columns: ["id","course_id","score","running_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id, id) AS running_score FROM employee_trainings ORDER BY course_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: SUM() OVER (PARTITION BY ... ORDER BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-054",
    domain: "hr",
    level: 4,
    order: 54,
    difficulty: "hard",
    title: "EMPLOYEE TRAININGS: Rank by Magnitude by course id",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Rank records within each course_id in employee_trainings based on score descending.",
    context_notes: "Analytic workforce computation on employee_trainings utilizing RANK() OVER (...).",
    concepts: ["Window Functions","Rank by Magnitude","employee_trainings"],
    expected_columns: ["id","course_id","score","rnk"],
    reference_sql: "SELECT id, course_id, score, RANK() OVER (PARTITION BY course_id ORDER BY score DESC) AS rnk FROM employee_trainings ORDER BY course_id, rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-055",
    domain: "hr",
    level: 4,
    order: 55,
    difficulty: "hard",
    title: "EMPLOYEE TRAININGS: Dense Rank by Magnitude by course id",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compute dense ranking of score within each course_id in employee_trainings.",
    context_notes: "Analytic workforce computation on employee_trainings utilizing DENSE_RANK() OVER (...).",
    concepts: ["Window Functions","Dense Rank by Magnitude","employee_trainings"],
    expected_columns: ["id","course_id","score","dense_rnk"],
    reference_sql: "SELECT id, course_id, score, DENSE_RANK() OVER (PARTITION BY course_id ORDER BY score DESC) AS dense_rnk FROM employee_trainings ORDER BY course_id, dense_rnk;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: DENSE_RANK() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-056",
    domain: "hr",
    level: 4,
    order: 56,
    difficulty: "hard",
    title: "EMPLOYEE TRAININGS: Previous Record Lag Comparison by course id",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Retrieve preceding score for each course_id record in employee_trainings to track step changes.",
    context_notes: "Analytic workforce computation on employee_trainings utilizing LAG() OVER (...).",
    concepts: ["Window Functions","Previous Record Lag Comparison","employee_trainings"],
    expected_columns: ["id","course_id","score","prev_score"],
    reference_sql: "SELECT id, course_id, score, LAG(score, 1) OVER (PARTITION BY course_id ORDER BY id, id) AS prev_score FROM employee_trainings ORDER BY course_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LAG() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-057",
    domain: "hr",
    level: 4,
    order: 57,
    difficulty: "hard",
    title: "EMPLOYEE TRAININGS: Next Record Lead Projection by course id",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compare each record's score with the subsequent record's score within course_id in employee_trainings.",
    context_notes: "Analytic workforce computation on employee_trainings utilizing LEAD() OVER (...).",
    concepts: ["Window Functions","Next Record Lead Projection","employee_trainings"],
    expected_columns: ["id","course_id","score","next_score"],
    reference_sql: "SELECT id, course_id, score, LEAD(score, 1) OVER (PARTITION BY course_id ORDER BY id, id) AS next_score FROM employee_trainings ORDER BY course_id, id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: LEAD() OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-058",
    domain: "hr",
    level: 4,
    order: 58,
    difficulty: "hard",
    title: "EMPLOYEE TRAININGS: Cohort Average Benchmark by course id",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Benchmark individual score against the cohort average score across the same course_id in employee_trainings.",
    context_notes: "Analytic workforce computation on employee_trainings utilizing AVG() OVER (PARTITION BY ...).",
    concepts: ["Window Functions","Cohort Average Benchmark","employee_trainings"],
    expected_columns: ["id","course_id","score","avg_score_cohort"],
    reference_sql: "SELECT id, course_id, score, AVG(score) OVER (PARTITION BY course_id) AS avg_score_cohort FROM employee_trainings ORDER BY course_id, score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: AVG() OVER (PARTITION BY ...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-059",
    domain: "hr",
    level: 4,
    order: 59,
    difficulty: "hard",
    title: "EMPLOYEE TRAININGS: Quartile Distribution by course id",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Distribute records in employee_trainings into 4 equal quartiles based on score within each course_id.",
    context_notes: "Analytic workforce computation on employee_trainings utilizing NTILE(4) OVER (...).",
    concepts: ["Window Functions","Quartile Distribution","employee_trainings"],
    expected_columns: ["id","course_id","score","quartile"],
    reference_sql: "SELECT id, course_id, score, NTILE(4) OVER (PARTITION BY course_id ORDER BY score DESC) AS quartile FROM employee_trainings ORDER BY course_id, quartile, score DESC;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use the analytic window function: NTILE(4) OVER (...)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-060",
    domain: "hr",
    level: 4,
    order: 60,
    difficulty: "hard",
    title: "Workforce Window Metric #60",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-061",
    domain: "hr",
    level: 4,
    order: 61,
    difficulty: "hard",
    title: "Workforce Window Metric #61",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-062",
    domain: "hr",
    level: 4,
    order: 62,
    difficulty: "hard",
    title: "Workforce Window Metric #62",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-063",
    domain: "hr",
    level: 4,
    order: 63,
    difficulty: "hard",
    title: "Workforce Window Metric #63",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-064",
    domain: "hr",
    level: 4,
    order: 64,
    difficulty: "hard",
    title: "Workforce Window Metric #64",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-065",
    domain: "hr",
    level: 4,
    order: 65,
    difficulty: "hard",
    title: "Workforce Window Metric #65",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-066",
    domain: "hr",
    level: 4,
    order: 66,
    difficulty: "hard",
    title: "Workforce Window Metric #66",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-067",
    domain: "hr",
    level: 4,
    order: 67,
    difficulty: "hard",
    title: "Workforce Window Metric #67",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-068",
    domain: "hr",
    level: 4,
    order: 68,
    difficulty: "hard",
    title: "Workforce Window Metric #68",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-069",
    domain: "hr",
    level: 4,
    order: 69,
    difficulty: "hard",
    title: "Workforce Window Metric #69",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-070",
    domain: "hr",
    level: 4,
    order: 70,
    difficulty: "hard",
    title: "Workforce Window Metric #70",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-071",
    domain: "hr",
    level: 4,
    order: 71,
    difficulty: "hard",
    title: "Workforce Window Metric #71",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-072",
    domain: "hr",
    level: 4,
    order: 72,
    difficulty: "hard",
    title: "Workforce Window Metric #72",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-073",
    domain: "hr",
    level: 4,
    order: 73,
    difficulty: "hard",
    title: "Workforce Window Metric #73",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-074",
    domain: "hr",
    level: 4,
    order: 74,
    difficulty: "hard",
    title: "Workforce Window Metric #74",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-075",
    domain: "hr",
    level: 4,
    order: 75,
    difficulty: "hard",
    title: "Workforce Window Metric #75",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-076",
    domain: "hr",
    level: 4,
    order: 76,
    difficulty: "hard",
    title: "Workforce Window Metric #76",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-077",
    domain: "hr",
    level: 4,
    order: 77,
    difficulty: "hard",
    title: "Workforce Window Metric #77",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-078",
    domain: "hr",
    level: 4,
    order: 78,
    difficulty: "hard",
    title: "Workforce Window Metric #78",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-079",
    domain: "hr",
    level: 4,
    order: 79,
    difficulty: "hard",
    title: "Workforce Window Metric #79",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-080",
    domain: "hr",
    level: 4,
    order: 80,
    difficulty: "hard",
    title: "Workforce Window Metric #80",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-081",
    domain: "hr",
    level: 4,
    order: 81,
    difficulty: "hard",
    title: "Workforce Window Metric #81",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-082",
    domain: "hr",
    level: 4,
    order: 82,
    difficulty: "hard",
    title: "Workforce Window Metric #82",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-083",
    domain: "hr",
    level: 4,
    order: 83,
    difficulty: "hard",
    title: "Workforce Window Metric #83",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-084",
    domain: "hr",
    level: 4,
    order: 84,
    difficulty: "hard",
    title: "Workforce Window Metric #84",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-085",
    domain: "hr",
    level: 4,
    order: 85,
    difficulty: "hard",
    title: "Workforce Window Metric #85",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-086",
    domain: "hr",
    level: 4,
    order: 86,
    difficulty: "hard",
    title: "Workforce Window Metric #86",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-087",
    domain: "hr",
    level: 4,
    order: 87,
    difficulty: "hard",
    title: "Workforce Window Metric #87",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-088",
    domain: "hr",
    level: 4,
    order: 88,
    difficulty: "hard",
    title: "Workforce Window Metric #88",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-089",
    domain: "hr",
    level: 4,
    order: 89,
    difficulty: "hard",
    title: "Workforce Window Metric #89",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-090",
    domain: "hr",
    level: 4,
    order: 90,
    difficulty: "hard",
    title: "Workforce Window Metric #90",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-091",
    domain: "hr",
    level: 4,
    order: 91,
    difficulty: "hard",
    title: "Workforce Window Metric #91",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-092",
    domain: "hr",
    level: 4,
    order: 92,
    difficulty: "hard",
    title: "Workforce Window Metric #92",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-093",
    domain: "hr",
    level: 4,
    order: 93,
    difficulty: "hard",
    title: "Workforce Window Metric #93",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-094",
    domain: "hr",
    level: 4,
    order: 94,
    difficulty: "hard",
    title: "Workforce Window Metric #94",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-095",
    domain: "hr",
    level: 4,
    order: 95,
    difficulty: "hard",
    title: "Workforce Window Metric #95",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-096",
    domain: "hr",
    level: 4,
    order: 96,
    difficulty: "hard",
    title: "Workforce Window Metric #96",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-097",
    domain: "hr",
    level: 4,
    order: 97,
    difficulty: "hard",
    title: "Workforce Window Metric #97",
    stakeholder: {
      name: "Maya Thorne",
      role: "VP of People Operations"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-098",
    domain: "hr",
    level: 4,
    order: 98,
    difficulty: "hard",
    title: "Workforce Window Metric #98",
    stakeholder: {
      name: "David Kim",
      role: "Director of Talent Acquisition"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-099",
    domain: "hr",
    level: 4,
    order: 99,
    difficulty: "hard",
    title: "Workforce Window Metric #99",
    stakeholder: {
      name: "Alicia Gomez",
      role: "Head of Compensation & Total Rewards"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  },
  {
    id: "hr-L4-100",
    domain: "hr",
    level: 4,
    order: 100,
    difficulty: "hard",
    title: "Workforce Window Metric #100",
    stakeholder: {
      name: "Marcus Vance",
      role: "Director of Workplace Experience"
    },
    request: "Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.",
    context_notes: "Cumulative training performance tracking.",
    concepts: ["Window Functions","SUM() OVER","employee_trainings"],
    expected_columns: ["id","course_id","score","cumulative_score"],
    reference_sql: "SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;",
    validation: {
      order_sensitive: false,
      column_names_sensitive: false,
      numeric_tolerance: 0
    },
    hints: [
      "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id)."
    ],
    starter_sql: "SELECT\n  -- Complete window function query\nFROM \n;"
  }
];
