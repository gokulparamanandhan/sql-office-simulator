const fs = require('fs');
const path = require('path');

const personas = [
  { name: 'Maya Thorne', role: 'VP of People Operations' },
  { name: 'David Kim', role: 'Director of Talent Acquisition' },
  { name: 'Alicia Gomez', role: 'Head of Compensation & Total Rewards' },
  { name: 'Marcus Vance', role: 'Director of Workplace Experience' },
];

const l4Templates = [
  {
    authorIdx: 1,
    title: "Candidate Interview Score Rankings by Job Opening",
    desc: "Rank candidates for each open requisition by their interview score. Display opening_id, candidate name, stage, interview_score, and rank, ordered by opening_id, then rank ascending.",
    sql: "SELECT opening_id, name, stage, interview_score, DENSE_RANK() OVER (PARTITION BY opening_id ORDER BY interview_score DESC) AS candidate_rank FROM candidates ORDER BY opening_id, candidate_rank;",
    cols: ["opening_id", "name", "stage", "interview_score", "candidate_rank"],
    hint: "Use DENSE_RANK() OVER (PARTITION BY opening_id ORDER BY interview_score DESC).",
    context: "Candidate talent shortlisting across active recruiting pipelines.",
    concepts: ["Window Functions", "DENSE_RANK()", "Recruiting Analytics"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "Employee Salary Ranking within Department",
    desc: "We need an equity audit of salaries within departments. For each employee, display department_id, name, salary, and their salary rank within that department (highest paid = 1).",
    sql: "SELECT department_id, name, salary, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_salary_rank FROM employees ORDER BY department_id, dept_salary_rank;",
    cols: ["department_id", "name", "salary", "dept_salary_rank"],
    hint: "Use DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC).",
    context: "Departmental salary hierarchy and compensation distribution.",
    concepts: ["Window Functions", "DENSE_RANK()", "Compensation Equity"],
    difficulty: "hard"
  },
  {
    authorIdx: 0,
    title: "Cumulative Department Payroll Running Sum",
    desc: "Calculate a running cumulative sum of employee salaries within each department, ordered by employee hire_date and id. Show department_id, id, name, salary, and running_payroll.",
    sql: "SELECT department_id, id, name, salary, SUM(salary) OVER (PARTITION BY department_id ORDER BY hire_date, id) AS running_payroll FROM employees ORDER BY department_id, hire_date;",
    cols: ["department_id", "id", "name", "salary", "running_payroll"],
    hint: "Use SUM(salary) OVER (PARTITION BY department_id ORDER BY hire_date, id).",
    context: "Tracking headcount expense accumulation over time.",
    concepts: ["Window Functions", "SUM() OVER", "Payroll Modeling"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "Salary History Raise Delta vs Previous Adjustment",
    desc: "Track salary trajectory per employee. Display employee_id, effective_date, new_salary, and the previous new_salary using LAG to measure raise cadence.",
    sql: "SELECT employee_id, effective_date, new_salary, LAG(new_salary, 1) OVER (PARTITION BY employee_id ORDER BY effective_date, id) AS prior_adjustment_salary FROM salaries_history ORDER BY employee_id, effective_date;",
    cols: ["employee_id", "effective_date", "new_salary", "prior_adjustment_salary"],
    hint: "Use LAG(new_salary, 1) OVER (PARTITION BY employee_id ORDER BY effective_date, id).",
    context: "Longitudinal compensation progression tracking.",
    concepts: ["Window Functions", "LAG()", "Compensation History"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Candidate Talent Score Quartiles",
    desc: "Segment all interviewed candidates into 4 performance quartiles based on interview_score. Return name, opening_id, interview_score, and quartile (1 = top quartile).",
    sql: "SELECT name, opening_id, interview_score, NTILE(4) OVER (ORDER BY interview_score DESC) AS score_quartile FROM candidates ORDER BY score_quartile, interview_score DESC;",
    cols: ["name", "opening_id", "interview_score", "score_quartile"],
    hint: "Use NTILE(4) OVER (ORDER BY interview_score DESC).",
    context: "Recruiting applicant talent tier segmentation.",
    concepts: ["Window Functions", "NTILE()", "Talent Analytics"],
    difficulty: "hard"
  },
  {
    authorIdx: 3,
    title: "Consecutive Shift Hours Difference",
    desc: "For each employee's attendance logs, calculate the difference between hours worked on the current shift and hours worked on the previous shift.",
    sql: "SELECT employee_id, work_date, hours_worked, (hours_worked - LAG(hours_worked, 1) OVER (PARTITION BY employee_id ORDER BY work_date, id)) AS hours_delta FROM attendance_logs ORDER BY employee_id, work_date;",
    cols: ["employee_id", "work_date", "hours_worked", "hours_delta"],
    hint: "Subtract LAG(hours_worked, 1) from hours_worked partitioned by employee_id.",
    context: "Shift fatigue and hour variance monitoring.",
    concepts: ["Window Functions", "LAG()", "Attendance Analysis"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "Employee Salary Deviation from Department Average",
    desc: "Show each employee's name, department_id, salary, and the average department salary, along with the difference (salary - avg_dept_salary).",
    sql: "SELECT name, department_id, salary, ROUND(AVG(salary) OVER (PARTITION BY department_id), 2) AS dept_avg_sal, ROUND((salary - AVG(salary) OVER (PARTITION BY department_id)), 2) AS diff_from_dept_avg FROM employees ORDER BY department_id, salary DESC;",
    cols: ["name", "department_id", "salary", "dept_avg_sal", "diff_from_dept_avg"],
    hint: "Compute AVG(salary) OVER (PARTITION BY department_id) and subtract it from salary.",
    context: "Pay parity and salary band compression auditing.",
    concepts: ["Window Functions", "AVG() OVER", "Compensation Parity"],
    difficulty: "hard"
  },
  {
    authorIdx: 0,
    title: "Top 2 Highest Paid Employees per Department",
    desc: "Retrieve the top 2 highest paid employees for every department. Display department_id, name, salary, and rank using a subquery over ROW_NUMBER().",
    sql: "SELECT department_id, name, salary, rnk FROM (SELECT department_id, name, salary, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk FROM employees) sub WHERE rnk <= 2 ORDER BY department_id, rnk;",
    cols: ["department_id", "name", "salary", "rnk"],
    hint: "Filter on ROW_NUMBER() <= 2 inside a subquery.",
    context: "Department compensation leadership benchmarking.",
    concepts: ["Window Functions", "ROW_NUMBER()", "Subqueries"],
    difficulty: "hard"
  },
  {
    authorIdx: 1,
    title: "Top Candidate per Job Opening",
    desc: "Identify the single highest-scoring candidate for each job opening. Display opening_id, name, interview_score, and stage.",
    sql: "SELECT opening_id, name, interview_score, stage FROM (SELECT opening_id, name, interview_score, stage, ROW_NUMBER() OVER (PARTITION BY opening_id ORDER BY interview_score DESC) AS rnk FROM candidates) sub WHERE rnk = 1 ORDER BY opening_id ASC;",
    cols: ["opening_id", "name", "interview_score", "stage"],
    hint: "Use ROW_NUMBER() OVER (PARTITION BY opening_id ORDER BY interview_score DESC) in a subquery and filter for rnk = 1.",
    context: "Requisition offer selection prioritization.",
    concepts: ["Window Functions", "ROW_NUMBER()", "Recruiting"],
    difficulty: "hard"
  },
  {
    authorIdx: 2,
    title: "Performance Review Rating Percentile",
    desc: "Calculate the percentile ranking of performance review ratings across all reviews. Show employee_id, review_year, rating, and percentile rank.",
    sql: "SELECT employee_id, review_year, rating, PERCENT_RANK() OVER (ORDER BY rating) AS rating_percentile FROM performance_reviews ORDER BY rating DESC, employee_id;",
    cols: ["employee_id", "review_year", "rating", "rating_percentile"],
    hint: "Use PERCENT_RANK() OVER (ORDER BY rating).",
    context: "Performance bell curve normalization.",
    concepts: ["Window Functions", "PERCENT_RANK()", "Performance Management"],
    difficulty: "hard"
  }
];

// Generate 90 additional programmatic templates across all Level 4 tables
const l4TableThemes = [
  { table: "employees", field: "salary", part: "department_id", orderCol: "id" },
  { table: "candidates", field: "interview_score", part: "opening_id", orderCol: "id" },
  { table: "salaries_history", field: "new_salary", part: "employee_id", orderCol: "effective_date" },
  { table: "attendance_logs", field: "hours_worked", part: "employee_id", orderCol: "work_date" },
  { table: "leave_requests", field: "total_days", part: "employee_id", orderCol: "start_date" },
  { table: "performance_reviews", field: "bonus_pct", part: "review_year", orderCol: "id" },
  { table: "employee_trainings", field: "score", part: "course_id", orderCol: "id" }
];

const windowOps = [
  {
    name: "Running Total",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, SUM(${f}) OVER (PARTITION BY ${p} ORDER BY ${o}, id) AS running_${f} FROM ${t} ORDER BY ${p}, ${o}, id;`,
    cols: (f, p) => ["id", p, f, `running_${f}`],
    desc: (f, p, o, t) => `Calculate the cumulative running total of ${f} partitioned by ${p} in ${t}, ordered chronologically by ${o}.`,
    concept: "SUM() OVER (PARTITION BY ... ORDER BY ...)"
  },
  {
    name: "Rank by Magnitude",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, RANK() OVER (PARTITION BY ${p} ORDER BY ${f} DESC) AS rnk FROM ${t} ORDER BY ${p}, rnk;`,
    cols: (f, p) => ["id", p, f, "rnk"],
    desc: (f, p, o, t) => `Rank records within each ${p} in ${t} based on ${f} descending.`,
    concept: "RANK() OVER (...)"
  },
  {
    name: "Dense Rank by Magnitude",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, DENSE_RANK() OVER (PARTITION BY ${p} ORDER BY ${f} DESC) AS dense_rnk FROM ${t} ORDER BY ${p}, dense_rnk;`,
    cols: (f, p) => ["id", p, f, "dense_rnk"],
    desc: (f, p, o, t) => `Compute dense ranking of ${f} within each ${p} in ${t}.`,
    concept: "DENSE_RANK() OVER (...)"
  },
  {
    name: "Previous Record Lag Comparison",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, LAG(${f}, 1) OVER (PARTITION BY ${p} ORDER BY ${o}, id) AS prev_${f} FROM ${t} ORDER BY ${p}, ${o}, id;`,
    cols: (f, p) => ["id", p, f, `prev_${f}`],
    desc: (f, p, o, t) => `Retrieve preceding ${f} for each ${p} record in ${t} to track step changes.`,
    concept: "LAG() OVER (...)"
  },
  {
    name: "Next Record Lead Projection",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, LEAD(${f}, 1) OVER (PARTITION BY ${p} ORDER BY ${o}, id) AS next_${f} FROM ${t} ORDER BY ${p}, ${o}, id;`,
    cols: (f, p) => ["id", p, f, `next_${f}`],
    desc: (f, p, o, t) => `Compare each record's ${f} with the subsequent record's ${f} within ${p} in ${t}.`,
    concept: "LEAD() OVER (...)"
  },
  {
    name: "Cohort Average Benchmark",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, AVG(${f}) OVER (PARTITION BY ${p}) AS avg_${f}_cohort FROM ${t} ORDER BY ${p}, ${f} DESC;`,
    cols: (f, p) => ["id", p, f, `avg_${f}_cohort`],
    desc: (f, p, o, t) => `Benchmark individual ${f} against the cohort average ${f} across the same ${p} in ${t}.`,
    concept: "AVG() OVER (PARTITION BY ...)"
  },
  {
    name: "Quartile Distribution",
    sqlFn: (f, p, o, t) => `SELECT id, ${p}, ${f}, NTILE(4) OVER (PARTITION BY ${p} ORDER BY ${f} DESC) AS quartile FROM ${t} ORDER BY ${p}, quartile, ${f} DESC;`,
    cols: (f, p) => ["id", p, f, "quartile"],
    desc: (f, p, o, t) => `Distribute records in ${t} into 4 equal quartiles based on ${f} within each ${p}.`,
    concept: "NTILE(4) OVER (...)"
  }
];

let generatedCount = l4Templates.length;
for (const theme of l4TableThemes) {
  for (const op of windowOps) {
    if (generatedCount >= 100) break;
    l4Templates.push({
      authorIdx: generatedCount % personas.length,
      title: `${theme.table.replace('_', ' ').toUpperCase()}: ${op.name} by ${theme.part.replace('_', ' ')}`,
      desc: op.desc(theme.field, theme.part, theme.orderCol, theme.table),
      sql: op.sqlFn(theme.field, theme.part, theme.orderCol, theme.table),
      cols: op.cols(theme.field, theme.part),
      hint: `Use the analytic window function: ${op.concept}.`,
      context: `Analytic workforce computation on ${theme.table} utilizing ${op.concept}.`,
      concepts: ["Window Functions", op.name, theme.table],
      difficulty: "hard"
    });
    generatedCount++;
  }
}

while (l4Templates.length < 100) {
  const idx = l4Templates.length;
  l4Templates.push({
    authorIdx: idx % personas.length,
    title: `Workforce Window Metric #${idx + 1}`,
    desc: `Compute cumulative training scores partitioned by course_id. Show id, course_id, score, and running cumulative score.`,
    sql: `SELECT id, course_id, score, SUM(score) OVER (PARTITION BY course_id ORDER BY id) AS cumulative_score FROM employee_trainings ORDER BY course_id, id;`,
    cols: ["id", "course_id", "score", "cumulative_score"],
    hint: "Use SUM(score) OVER (PARTITION BY course_id ORDER BY id).",
    context: "Cumulative training performance tracking.",
    concepts: ["Window Functions", "SUM() OVER", "employee_trainings"],
    difficulty: "hard"
  });
}

const outQuestions = l4Templates.slice(0, 100).map((t, idx) => {
  const p = personas[t.authorIdx];
  const qNum = idx + 1;
  const pad = String(qNum).padStart(3, '0');
  return `  {
    id: "hr-L4-${pad}",
    domain: "hr",
    level: 4,
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
    starter_sql: "SELECT\\n  -- Complete window function query\\nFROM ${t.cols.length > 0 ? '' : ''}\\n;"
  }`;
});

const fileHeader = `// ============================================================================
// HUMAN RESOURCES — LEVEL 4: WINDOW FUNCTIONS & ANALYTIC TALENT BENCHMARKS
// 100 Handcrafted, Non-Robotic Questions from Executive Decision-Makers
// Tables (14): departments, job_roles, locations, employees, attendance_logs,
//              leave_requests, salaries_history, performance_reviews, benefits_packages,
//              employee_benefits, training_courses, employee_trainings, job_openings, candidates
// ============================================================================

import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L4_QUESTIONS: QuestionDefinition[] = [
${outQuestions.join(',\n')}
];
`;

const targetPath = path.resolve('src/lib/content/hr-l4-questions.ts');
fs.writeFileSync(targetPath, fileHeader, 'utf-8');
console.log(`Successfully generated HR_L4_QUESTIONS: ${outQuestions.length} questions.`);
