import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L4_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "hr-L4-001",
    "domain": "hr",
    "level": 4,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q1)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #1 - Maya Thorne (VP of People Operations)]: Rank records in departments by budget. Return id, name AS entity_title, budget AS metric_score, and ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 11;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, name AS entity_title, budget AS metric_score, ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-002",
    "domain": "hr",
    "level": 4,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in job_roles (Q2)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #2 - David Kim (Director of Talent Acquisition)]: Compute dense ranking within each segment of job_roles. Return id, department_id AS partition_key, min_salary AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 12;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, department_id AS partition_key, min_salary AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk FROM job_roles WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-003",
    "domain": "hr",
    "level": 4,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q3)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #3 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform period-over-period delta analysis on locations. Return id, capacity AS current_val, and LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 13;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, capacity AS current_val, LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric FROM locations WHERE id >= 1 ORDER BY id ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-004",
    "domain": "hr",
    "level": 4,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Sequential Projection Analysis with LEAD() (Q4)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #4 - Marcus Vance (Director of Workplace Experience)]: Perform forward-looking trend analysis on employees. Return id, salary AS current_val, and LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 14;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "salary",
      "next_metric"
    ],
    "reference_sql": "SELECT id, salary AS current_val, LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric FROM employees WHERE id >= 1 ORDER BY id ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-005",
    "domain": "hr",
    "level": 4,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Cumulative Running Total on salaries_history (Q5)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #5 - Maya Thorne (VP of People Operations)]: Calculate cumulative progression in salaries_history. Return id, new_salary AS baseline_val, and SUM(new_salary) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 15;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, new_salary AS baseline_val, SUM(new_salary) OVER (ORDER BY id ASC) AS running_total FROM salaries_history WHERE id >= 1 ORDER BY id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-006",
    "domain": "hr",
    "level": 4,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q6)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #6 - David Kim (Director of Talent Acquisition)]: Stage transformation logic for benefits_packages. Create a CTE named staged_metrics selecting id, package_name AS staged_name, and annual_cost AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 16;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, package_name AS staged_name, annual_cost AS score FROM benefits_packages WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-007",
    "domain": "hr",
    "level": 4,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q7)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #7 - Alicia Gomez (Head of Compensation & Total Rewards)]: Rank records in employee_benefits by id. Return id, employee_id::text AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 17;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM employee_benefits WHERE id >= 1 ORDER BY rank_num ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-008",
    "domain": "hr",
    "level": 4,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in performance_reviews (Q8)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #8 - Marcus Vance (Director of Workplace Experience)]: Compute dense ranking within each segment of performance_reviews. Return id, employee_id AS partition_key, bonus_pct AS metric_val, and DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 18;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, employee_id AS partition_key, bonus_pct AS metric_val, DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk FROM performance_reviews WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-009",
    "domain": "hr",
    "level": 4,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q9)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #9 - Maya Thorne (VP of People Operations)]: Perform period-over-period delta analysis on leave_requests. Return id, total_days AS current_val, and LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 19;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "total_days",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, total_days AS current_val, LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric FROM leave_requests WHERE id >= 1 ORDER BY id ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-010",
    "domain": "hr",
    "level": 4,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Sequential Projection Analysis with LEAD() (Q10)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #10 - David Kim (Director of Talent Acquisition)]: Perform forward-looking trend analysis on attendance_logs. Return id, hours_worked AS current_val, and LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "hours_worked",
      "next_metric"
    ],
    "reference_sql": "SELECT id, hours_worked AS current_val, LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric FROM attendance_logs WHERE id >= 1 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-011",
    "domain": "hr",
    "level": 4,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Cumulative Running Total on training_courses (Q11)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #11 - Alicia Gomez (Head of Compensation & Total Rewards)]: Calculate cumulative progression in training_courses. Return id, duration_hours AS baseline_val, and SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 21;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, duration_hours AS baseline_val, SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total FROM training_courses WHERE id >= 1 ORDER BY id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-012",
    "domain": "hr",
    "level": 4,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q12)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #12 - Marcus Vance (Director of Workplace Experience)]: Stage transformation logic for employee_trainings. Create a CTE named staged_metrics selecting id, status AS staged_name, and score AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 22;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, status AS staged_name, score AS score FROM employee_trainings WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-013",
    "domain": "hr",
    "level": 4,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q13)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #13 - Maya Thorne (VP of People Operations)]: Rank records in departments by budget. Return id, name AS entity_title, budget AS metric_score, and ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 23;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, name AS entity_title, budget AS metric_score, ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-014",
    "domain": "hr",
    "level": 4,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Dense Partition Ranking in job_roles (Q14)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #14 - David Kim (Director of Talent Acquisition)]: Compute dense ranking within each segment of job_roles. Return id, department_id AS partition_key, min_salary AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 24;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, department_id AS partition_key, min_salary AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk FROM job_roles WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-015",
    "domain": "hr",
    "level": 4,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Sequential Trend Analysis with LAG() (Q15)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #15 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform period-over-period delta analysis on locations. Return id, capacity AS current_val, and LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 25;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, capacity AS current_val, LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric FROM locations WHERE id >= 1 ORDER BY id ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L4-016",
    "domain": "hr",
    "level": 4,
    "order": 16,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q16)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #16 - Marcus Vance (Director of Workplace Experience)]: Perform forward-looking trend analysis on employees. Return id, salary AS current_val, and LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 26;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "salary",
      "next_metric"
    ],
    "reference_sql": "SELECT id, salary AS current_val, LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric FROM employees WHERE id >= 1 ORDER BY id ASC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-017",
    "domain": "hr",
    "level": 4,
    "order": 17,
    "difficulty": "core",
    "title": "Cumulative Running Total on salaries_history (Q17)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #17 - Maya Thorne (VP of People Operations)]: Calculate cumulative progression in salaries_history. Return id, new_salary AS baseline_val, and SUM(new_salary) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 27;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, new_salary AS baseline_val, SUM(new_salary) OVER (ORDER BY id ASC) AS running_total FROM salaries_history WHERE id >= 1 ORDER BY id ASC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-018",
    "domain": "hr",
    "level": 4,
    "order": 18,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q18)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #18 - David Kim (Director of Talent Acquisition)]: Stage transformation logic for benefits_packages. Create a CTE named staged_metrics selecting id, package_name AS staged_name, and annual_cost AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 28;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, package_name AS staged_name, annual_cost AS score FROM benefits_packages WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-019",
    "domain": "hr",
    "level": 4,
    "order": 19,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q19)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #19 - Alicia Gomez (Head of Compensation & Total Rewards)]: Rank records in employee_benefits by id. Return id, employee_id::text AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 29;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM employee_benefits WHERE id >= 1 ORDER BY rank_num ASC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-020",
    "domain": "hr",
    "level": 4,
    "order": 20,
    "difficulty": "core",
    "title": "Dense Partition Ranking in performance_reviews (Q20)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #20 - Marcus Vance (Director of Workplace Experience)]: Compute dense ranking within each segment of performance_reviews. Return id, employee_id AS partition_key, bonus_pct AS metric_val, and DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 30;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, employee_id AS partition_key, bonus_pct AS metric_val, DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk FROM performance_reviews WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-021",
    "domain": "hr",
    "level": 4,
    "order": 21,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q21)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #21 - Maya Thorne (VP of People Operations)]: Perform period-over-period delta analysis on leave_requests. Return id, total_days AS current_val, and LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 31;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "total_days",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, total_days AS current_val, LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric FROM leave_requests WHERE id >= 1 ORDER BY id ASC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-022",
    "domain": "hr",
    "level": 4,
    "order": 22,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q22)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #22 - David Kim (Director of Talent Acquisition)]: Perform forward-looking trend analysis on attendance_logs. Return id, hours_worked AS current_val, and LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 32;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "hours_worked",
      "next_metric"
    ],
    "reference_sql": "SELECT id, hours_worked AS current_val, LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric FROM attendance_logs WHERE id >= 1 ORDER BY id ASC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-023",
    "domain": "hr",
    "level": 4,
    "order": 23,
    "difficulty": "core",
    "title": "Cumulative Running Total on training_courses (Q23)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #23 - Alicia Gomez (Head of Compensation & Total Rewards)]: Calculate cumulative progression in training_courses. Return id, duration_hours AS baseline_val, and SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 33;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, duration_hours AS baseline_val, SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total FROM training_courses WHERE id >= 1 ORDER BY id ASC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-024",
    "domain": "hr",
    "level": 4,
    "order": 24,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q24)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #24 - Marcus Vance (Director of Workplace Experience)]: Stage transformation logic for employee_trainings. Create a CTE named staged_metrics selecting id, status AS staged_name, and score AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 34;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, status AS staged_name, score AS score FROM employee_trainings WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-025",
    "domain": "hr",
    "level": 4,
    "order": 25,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q25)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #25 - Maya Thorne (VP of People Operations)]: Rank records in departments by budget. Return id, name AS entity_title, budget AS metric_score, and ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 35;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, name AS entity_title, budget AS metric_score, ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-026",
    "domain": "hr",
    "level": 4,
    "order": 26,
    "difficulty": "core",
    "title": "Dense Partition Ranking in job_roles (Q26)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #26 - David Kim (Director of Talent Acquisition)]: Compute dense ranking within each segment of job_roles. Return id, department_id AS partition_key, min_salary AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 36;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, department_id AS partition_key, min_salary AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk FROM job_roles WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-027",
    "domain": "hr",
    "level": 4,
    "order": 27,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q27)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #27 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform period-over-period delta analysis on locations. Return id, capacity AS current_val, and LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 37;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, capacity AS current_val, LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric FROM locations WHERE id >= 1 ORDER BY id ASC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-028",
    "domain": "hr",
    "level": 4,
    "order": 28,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q28)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #28 - Marcus Vance (Director of Workplace Experience)]: Perform forward-looking trend analysis on employees. Return id, salary AS current_val, and LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 38;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "salary",
      "next_metric"
    ],
    "reference_sql": "SELECT id, salary AS current_val, LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric FROM employees WHERE id >= 1 ORDER BY id ASC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-029",
    "domain": "hr",
    "level": 4,
    "order": 29,
    "difficulty": "core",
    "title": "Cumulative Running Total on salaries_history (Q29)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #29 - Maya Thorne (VP of People Operations)]: Calculate cumulative progression in salaries_history. Return id, new_salary AS baseline_val, and SUM(new_salary) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 39;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, new_salary AS baseline_val, SUM(new_salary) OVER (ORDER BY id ASC) AS running_total FROM salaries_history WHERE id >= 1 ORDER BY id ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-030",
    "domain": "hr",
    "level": 4,
    "order": 30,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q30)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #30 - David Kim (Director of Talent Acquisition)]: Stage transformation logic for benefits_packages. Create a CTE named staged_metrics selecting id, package_name AS staged_name, and annual_cost AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 40;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, package_name AS staged_name, annual_cost AS score FROM benefits_packages WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-031",
    "domain": "hr",
    "level": 4,
    "order": 31,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q31)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #31 - Alicia Gomez (Head of Compensation & Total Rewards)]: Rank records in employee_benefits by id. Return id, employee_id::text AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 41;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM employee_benefits WHERE id >= 1 ORDER BY rank_num ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-032",
    "domain": "hr",
    "level": 4,
    "order": 32,
    "difficulty": "core",
    "title": "Dense Partition Ranking in performance_reviews (Q32)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #32 - Marcus Vance (Director of Workplace Experience)]: Compute dense ranking within each segment of performance_reviews. Return id, employee_id AS partition_key, bonus_pct AS metric_val, and DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 42;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, employee_id AS partition_key, bonus_pct AS metric_val, DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk FROM performance_reviews WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-033",
    "domain": "hr",
    "level": 4,
    "order": 33,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q33)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #33 - Maya Thorne (VP of People Operations)]: Perform period-over-period delta analysis on leave_requests. Return id, total_days AS current_val, and LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 43;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "total_days",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, total_days AS current_val, LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric FROM leave_requests WHERE id >= 1 ORDER BY id ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-034",
    "domain": "hr",
    "level": 4,
    "order": 34,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q34)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #34 - David Kim (Director of Talent Acquisition)]: Perform forward-looking trend analysis on attendance_logs. Return id, hours_worked AS current_val, and LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 44;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "hours_worked",
      "next_metric"
    ],
    "reference_sql": "SELECT id, hours_worked AS current_val, LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric FROM attendance_logs WHERE id >= 1 ORDER BY id ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-035",
    "domain": "hr",
    "level": 4,
    "order": 35,
    "difficulty": "core",
    "title": "Cumulative Running Total on training_courses (Q35)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #35 - Alicia Gomez (Head of Compensation & Total Rewards)]: Calculate cumulative progression in training_courses. Return id, duration_hours AS baseline_val, and SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 45;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, duration_hours AS baseline_val, SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total FROM training_courses WHERE id >= 1 ORDER BY id ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-036",
    "domain": "hr",
    "level": 4,
    "order": 36,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q36)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #36 - Marcus Vance (Director of Workplace Experience)]: Stage transformation logic for employee_trainings. Create a CTE named staged_metrics selecting id, status AS staged_name, and score AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 46;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, status AS staged_name, score AS score FROM employee_trainings WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-037",
    "domain": "hr",
    "level": 4,
    "order": 37,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q37)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #37 - Maya Thorne (VP of People Operations)]: Rank records in departments by budget. Return id, name AS entity_title, budget AS metric_score, and ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 47;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, name AS entity_title, budget AS metric_score, ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-038",
    "domain": "hr",
    "level": 4,
    "order": 38,
    "difficulty": "core",
    "title": "Dense Partition Ranking in job_roles (Q38)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #38 - David Kim (Director of Talent Acquisition)]: Compute dense ranking within each segment of job_roles. Return id, department_id AS partition_key, min_salary AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 48;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, department_id AS partition_key, min_salary AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk FROM job_roles WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-039",
    "domain": "hr",
    "level": 4,
    "order": 39,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q39)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #39 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform period-over-period delta analysis on locations. Return id, capacity AS current_val, and LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 49;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, capacity AS current_val, LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric FROM locations WHERE id >= 1 ORDER BY id ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-040",
    "domain": "hr",
    "level": 4,
    "order": 40,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q40)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #40 - Marcus Vance (Director of Workplace Experience)]: Perform forward-looking trend analysis on employees. Return id, salary AS current_val, and LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 50;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "salary",
      "next_metric"
    ],
    "reference_sql": "SELECT id, salary AS current_val, LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric FROM employees WHERE id >= 1 ORDER BY id ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-041",
    "domain": "hr",
    "level": 4,
    "order": 41,
    "difficulty": "core",
    "title": "Cumulative Running Total on salaries_history (Q41)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #41 - Maya Thorne (VP of People Operations)]: Calculate cumulative progression in salaries_history. Return id, new_salary AS baseline_val, and SUM(new_salary) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 51;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, new_salary AS baseline_val, SUM(new_salary) OVER (ORDER BY id ASC) AS running_total FROM salaries_history WHERE id >= 1 ORDER BY id ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-042",
    "domain": "hr",
    "level": 4,
    "order": 42,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q42)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #42 - David Kim (Director of Talent Acquisition)]: Stage transformation logic for benefits_packages. Create a CTE named staged_metrics selecting id, package_name AS staged_name, and annual_cost AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 52;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, package_name AS staged_name, annual_cost AS score FROM benefits_packages WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-043",
    "domain": "hr",
    "level": 4,
    "order": 43,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q43)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #43 - Alicia Gomez (Head of Compensation & Total Rewards)]: Rank records in employee_benefits by id. Return id, employee_id::text AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 53;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM employee_benefits WHERE id >= 1 ORDER BY rank_num ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-044",
    "domain": "hr",
    "level": 4,
    "order": 44,
    "difficulty": "core",
    "title": "Dense Partition Ranking in performance_reviews (Q44)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #44 - Marcus Vance (Director of Workplace Experience)]: Compute dense ranking within each segment of performance_reviews. Return id, employee_id AS partition_key, bonus_pct AS metric_val, and DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 54;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, employee_id AS partition_key, bonus_pct AS metric_val, DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk FROM performance_reviews WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-045",
    "domain": "hr",
    "level": 4,
    "order": 45,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q45)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #45 - Maya Thorne (VP of People Operations)]: Perform period-over-period delta analysis on leave_requests. Return id, total_days AS current_val, and LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 55;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "total_days",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, total_days AS current_val, LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric FROM leave_requests WHERE id >= 1 ORDER BY id ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-046",
    "domain": "hr",
    "level": 4,
    "order": 46,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q46)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #46 - David Kim (Director of Talent Acquisition)]: Perform forward-looking trend analysis on attendance_logs. Return id, hours_worked AS current_val, and LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 56;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "hours_worked",
      "next_metric"
    ],
    "reference_sql": "SELECT id, hours_worked AS current_val, LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric FROM attendance_logs WHERE id >= 1 ORDER BY id ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-047",
    "domain": "hr",
    "level": 4,
    "order": 47,
    "difficulty": "core",
    "title": "Cumulative Running Total on training_courses (Q47)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #47 - Alicia Gomez (Head of Compensation & Total Rewards)]: Calculate cumulative progression in training_courses. Return id, duration_hours AS baseline_val, and SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 57;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, duration_hours AS baseline_val, SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total FROM training_courses WHERE id >= 1 ORDER BY id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-048",
    "domain": "hr",
    "level": 4,
    "order": 48,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q48)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #48 - Marcus Vance (Director of Workplace Experience)]: Stage transformation logic for employee_trainings. Create a CTE named staged_metrics selecting id, status AS staged_name, and score AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 58;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, status AS staged_name, score AS score FROM employee_trainings WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-049",
    "domain": "hr",
    "level": 4,
    "order": 49,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q49)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #49 - Maya Thorne (VP of People Operations)]: Rank records in departments by budget. Return id, name AS entity_title, budget AS metric_score, and ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 59;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, name AS entity_title, budget AS metric_score, ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-050",
    "domain": "hr",
    "level": 4,
    "order": 50,
    "difficulty": "core",
    "title": "Dense Partition Ranking in job_roles (Q50)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #50 - David Kim (Director of Talent Acquisition)]: Compute dense ranking within each segment of job_roles. Return id, department_id AS partition_key, min_salary AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 60;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, department_id AS partition_key, min_salary AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk FROM job_roles WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-051",
    "domain": "hr",
    "level": 4,
    "order": 51,
    "difficulty": "core",
    "title": "Sequential Trend Analysis with LAG() (Q51)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #51 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform period-over-period delta analysis on locations. Return id, capacity AS current_val, and LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 61;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, capacity AS current_val, LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric FROM locations WHERE id >= 1 ORDER BY id ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-052",
    "domain": "hr",
    "level": 4,
    "order": 52,
    "difficulty": "core",
    "title": "Sequential Projection Analysis with LEAD() (Q52)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #52 - Marcus Vance (Director of Workplace Experience)]: Perform forward-looking trend analysis on employees. Return id, salary AS current_val, and LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 62;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "salary",
      "next_metric"
    ],
    "reference_sql": "SELECT id, salary AS current_val, LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric FROM employees WHERE id >= 1 ORDER BY id ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-053",
    "domain": "hr",
    "level": 4,
    "order": 53,
    "difficulty": "core",
    "title": "Cumulative Running Total on salaries_history (Q53)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #53 - Maya Thorne (VP of People Operations)]: Calculate cumulative progression in salaries_history. Return id, new_salary AS baseline_val, and SUM(new_salary) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 63;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, new_salary AS baseline_val, SUM(new_salary) OVER (ORDER BY id ASC) AS running_total FROM salaries_history WHERE id >= 1 ORDER BY id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-054",
    "domain": "hr",
    "level": 4,
    "order": 54,
    "difficulty": "core",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q54)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #54 - David Kim (Director of Talent Acquisition)]: Stage transformation logic for benefits_packages. Create a CTE named staged_metrics selecting id, package_name AS staged_name, and annual_cost AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 64;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, package_name AS staged_name, annual_cost AS score FROM benefits_packages WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-055",
    "domain": "hr",
    "level": 4,
    "order": 55,
    "difficulty": "core",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q55)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #55 - Alicia Gomez (Head of Compensation & Total Rewards)]: Rank records in employee_benefits by id. Return id, employee_id::text AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 65;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM employee_benefits WHERE id >= 1 ORDER BY rank_num ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L4-056",
    "domain": "hr",
    "level": 4,
    "order": 56,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in performance_reviews (Q56)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #56 - Marcus Vance (Director of Workplace Experience)]: Compute dense ranking within each segment of performance_reviews. Return id, employee_id AS partition_key, bonus_pct AS metric_val, and DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 66;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, employee_id AS partition_key, bonus_pct AS metric_val, DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk FROM performance_reviews WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-057",
    "domain": "hr",
    "level": 4,
    "order": 57,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q57)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #57 - Maya Thorne (VP of People Operations)]: Perform period-over-period delta analysis on leave_requests. Return id, total_days AS current_val, and LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 67;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "total_days",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, total_days AS current_val, LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric FROM leave_requests WHERE id >= 1 ORDER BY id ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-058",
    "domain": "hr",
    "level": 4,
    "order": 58,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q58)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #58 - David Kim (Director of Talent Acquisition)]: Perform forward-looking trend analysis on attendance_logs. Return id, hours_worked AS current_val, and LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 68;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "hours_worked",
      "next_metric"
    ],
    "reference_sql": "SELECT id, hours_worked AS current_val, LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric FROM attendance_logs WHERE id >= 1 ORDER BY id ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-059",
    "domain": "hr",
    "level": 4,
    "order": 59,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on training_courses (Q59)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #59 - Alicia Gomez (Head of Compensation & Total Rewards)]: Calculate cumulative progression in training_courses. Return id, duration_hours AS baseline_val, and SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 69;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, duration_hours AS baseline_val, SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total FROM training_courses WHERE id >= 1 ORDER BY id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-060",
    "domain": "hr",
    "level": 4,
    "order": 60,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q60)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #60 - Marcus Vance (Director of Workplace Experience)]: Stage transformation logic for employee_trainings. Create a CTE named staged_metrics selecting id, status AS staged_name, and score AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 70;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, status AS staged_name, score AS score FROM employee_trainings WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-061",
    "domain": "hr",
    "level": 4,
    "order": 61,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q61)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #61 - Maya Thorne (VP of People Operations)]: Rank records in departments by budget. Return id, name AS entity_title, budget AS metric_score, and ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 71;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, name AS entity_title, budget AS metric_score, ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-062",
    "domain": "hr",
    "level": 4,
    "order": 62,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in job_roles (Q62)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #62 - David Kim (Director of Talent Acquisition)]: Compute dense ranking within each segment of job_roles. Return id, department_id AS partition_key, min_salary AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 72;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, department_id AS partition_key, min_salary AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk FROM job_roles WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-063",
    "domain": "hr",
    "level": 4,
    "order": 63,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q63)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #63 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform period-over-period delta analysis on locations. Return id, capacity AS current_val, and LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 73;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, capacity AS current_val, LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric FROM locations WHERE id >= 1 ORDER BY id ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-064",
    "domain": "hr",
    "level": 4,
    "order": 64,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q64)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #64 - Marcus Vance (Director of Workplace Experience)]: Perform forward-looking trend analysis on employees. Return id, salary AS current_val, and LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 74;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "salary",
      "next_metric"
    ],
    "reference_sql": "SELECT id, salary AS current_val, LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric FROM employees WHERE id >= 1 ORDER BY id ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-065",
    "domain": "hr",
    "level": 4,
    "order": 65,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on salaries_history (Q65)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #65 - Maya Thorne (VP of People Operations)]: Calculate cumulative progression in salaries_history. Return id, new_salary AS baseline_val, and SUM(new_salary) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 75;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, new_salary AS baseline_val, SUM(new_salary) OVER (ORDER BY id ASC) AS running_total FROM salaries_history WHERE id >= 1 ORDER BY id ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-066",
    "domain": "hr",
    "level": 4,
    "order": 66,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q66)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #66 - David Kim (Director of Talent Acquisition)]: Stage transformation logic for benefits_packages. Create a CTE named staged_metrics selecting id, package_name AS staged_name, and annual_cost AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 76;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, package_name AS staged_name, annual_cost AS score FROM benefits_packages WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-067",
    "domain": "hr",
    "level": 4,
    "order": 67,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q67)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #67 - Alicia Gomez (Head of Compensation & Total Rewards)]: Rank records in employee_benefits by id. Return id, employee_id::text AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 77;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM employee_benefits WHERE id >= 1 ORDER BY rank_num ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-068",
    "domain": "hr",
    "level": 4,
    "order": 68,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in performance_reviews (Q68)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #68 - Marcus Vance (Director of Workplace Experience)]: Compute dense ranking within each segment of performance_reviews. Return id, employee_id AS partition_key, bonus_pct AS metric_val, and DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 78;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, employee_id AS partition_key, bonus_pct AS metric_val, DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk FROM performance_reviews WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-069",
    "domain": "hr",
    "level": 4,
    "order": 69,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q69)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #69 - Maya Thorne (VP of People Operations)]: Perform period-over-period delta analysis on leave_requests. Return id, total_days AS current_val, and LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 79;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "total_days",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, total_days AS current_val, LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric FROM leave_requests WHERE id >= 1 ORDER BY id ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-070",
    "domain": "hr",
    "level": 4,
    "order": 70,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q70)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #70 - David Kim (Director of Talent Acquisition)]: Perform forward-looking trend analysis on attendance_logs. Return id, hours_worked AS current_val, and LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 80;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "hours_worked",
      "next_metric"
    ],
    "reference_sql": "SELECT id, hours_worked AS current_val, LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric FROM attendance_logs WHERE id >= 1 ORDER BY id ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-071",
    "domain": "hr",
    "level": 4,
    "order": 71,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on training_courses (Q71)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #71 - Alicia Gomez (Head of Compensation & Total Rewards)]: Calculate cumulative progression in training_courses. Return id, duration_hours AS baseline_val, and SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 81;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, duration_hours AS baseline_val, SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total FROM training_courses WHERE id >= 1 ORDER BY id ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-072",
    "domain": "hr",
    "level": 4,
    "order": 72,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q72)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #72 - Marcus Vance (Director of Workplace Experience)]: Stage transformation logic for employee_trainings. Create a CTE named staged_metrics selecting id, status AS staged_name, and score AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 82;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, status AS staged_name, score AS score FROM employee_trainings WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-073",
    "domain": "hr",
    "level": 4,
    "order": 73,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q73)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #73 - Maya Thorne (VP of People Operations)]: Rank records in departments by budget. Return id, name AS entity_title, budget AS metric_score, and ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 83;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, name AS entity_title, budget AS metric_score, ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-074",
    "domain": "hr",
    "level": 4,
    "order": 74,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in job_roles (Q74)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #74 - David Kim (Director of Talent Acquisition)]: Compute dense ranking within each segment of job_roles. Return id, department_id AS partition_key, min_salary AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 84;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, department_id AS partition_key, min_salary AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk FROM job_roles WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-075",
    "domain": "hr",
    "level": 4,
    "order": 75,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q75)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #75 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform period-over-period delta analysis on locations. Return id, capacity AS current_val, and LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 85;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, capacity AS current_val, LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric FROM locations WHERE id >= 1 ORDER BY id ASC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-076",
    "domain": "hr",
    "level": 4,
    "order": 76,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q76)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #76 - Marcus Vance (Director of Workplace Experience)]: Perform forward-looking trend analysis on employees. Return id, salary AS current_val, and LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 86;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "salary",
      "next_metric"
    ],
    "reference_sql": "SELECT id, salary AS current_val, LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric FROM employees WHERE id >= 1 ORDER BY id ASC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-077",
    "domain": "hr",
    "level": 4,
    "order": 77,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on salaries_history (Q77)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #77 - Maya Thorne (VP of People Operations)]: Calculate cumulative progression in salaries_history. Return id, new_salary AS baseline_val, and SUM(new_salary) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 87;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, new_salary AS baseline_val, SUM(new_salary) OVER (ORDER BY id ASC) AS running_total FROM salaries_history WHERE id >= 1 ORDER BY id ASC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-078",
    "domain": "hr",
    "level": 4,
    "order": 78,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q78)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #78 - David Kim (Director of Talent Acquisition)]: Stage transformation logic for benefits_packages. Create a CTE named staged_metrics selecting id, package_name AS staged_name, and annual_cost AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 88;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, package_name AS staged_name, annual_cost AS score FROM benefits_packages WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-079",
    "domain": "hr",
    "level": 4,
    "order": 79,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q79)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #79 - Alicia Gomez (Head of Compensation & Total Rewards)]: Rank records in employee_benefits by id. Return id, employee_id::text AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 89;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM employee_benefits WHERE id >= 1 ORDER BY rank_num ASC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-080",
    "domain": "hr",
    "level": 4,
    "order": 80,
    "difficulty": "challenging",
    "title": "Dense Partition Ranking in performance_reviews (Q80)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #80 - Marcus Vance (Director of Workplace Experience)]: Compute dense ranking within each segment of performance_reviews. Return id, employee_id AS partition_key, bonus_pct AS metric_val, and DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 90;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, employee_id AS partition_key, bonus_pct AS metric_val, DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk FROM performance_reviews WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-081",
    "domain": "hr",
    "level": 4,
    "order": 81,
    "difficulty": "challenging",
    "title": "Sequential Trend Analysis with LAG() (Q81)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #81 - Maya Thorne (VP of People Operations)]: Perform period-over-period delta analysis on leave_requests. Return id, total_days AS current_val, and LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 91;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "total_days",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, total_days AS current_val, LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric FROM leave_requests WHERE id >= 1 ORDER BY id ASC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-082",
    "domain": "hr",
    "level": 4,
    "order": 82,
    "difficulty": "challenging",
    "title": "Sequential Projection Analysis with LEAD() (Q82)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #82 - David Kim (Director of Talent Acquisition)]: Perform forward-looking trend analysis on attendance_logs. Return id, hours_worked AS current_val, and LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 92;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "hours_worked",
      "next_metric"
    ],
    "reference_sql": "SELECT id, hours_worked AS current_val, LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric FROM attendance_logs WHERE id >= 1 ORDER BY id ASC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-083",
    "domain": "hr",
    "level": 4,
    "order": 83,
    "difficulty": "challenging",
    "title": "Cumulative Running Total on training_courses (Q83)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #83 - Alicia Gomez (Head of Compensation & Total Rewards)]: Calculate cumulative progression in training_courses. Return id, duration_hours AS baseline_val, and SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 93;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, duration_hours AS baseline_val, SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total FROM training_courses WHERE id >= 1 ORDER BY id ASC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-084",
    "domain": "hr",
    "level": 4,
    "order": 84,
    "difficulty": "challenging",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q84)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #84 - Marcus Vance (Director of Workplace Experience)]: Stage transformation logic for employee_trainings. Create a CTE named staged_metrics selecting id, status AS staged_name, and score AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 94;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, status AS staged_name, score AS score FROM employee_trainings WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-085",
    "domain": "hr",
    "level": 4,
    "order": 85,
    "difficulty": "challenging",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q85)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #85 - Maya Thorne (VP of People Operations)]: Rank records in departments by budget. Return id, name AS entity_title, budget AS metric_score, and ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 95;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, name AS entity_title, budget AS metric_score, ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L4-086",
    "domain": "hr",
    "level": 4,
    "order": 86,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in job_roles (Q86)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #86 - David Kim (Director of Talent Acquisition)]: Compute dense ranking within each segment of job_roles. Return id, department_id AS partition_key, min_salary AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 96;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, department_id AS partition_key, min_salary AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk FROM job_roles WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-087",
    "domain": "hr",
    "level": 4,
    "order": 87,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q87)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #87 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform period-over-period delta analysis on locations. Return id, capacity AS current_val, and LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 97;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, capacity AS current_val, LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric FROM locations WHERE id >= 1 ORDER BY id ASC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-088",
    "domain": "hr",
    "level": 4,
    "order": 88,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q88)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #88 - Marcus Vance (Director of Workplace Experience)]: Perform forward-looking trend analysis on employees. Return id, salary AS current_val, and LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 98;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "salary",
      "next_metric"
    ],
    "reference_sql": "SELECT id, salary AS current_val, LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric FROM employees WHERE id >= 1 ORDER BY id ASC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-089",
    "domain": "hr",
    "level": 4,
    "order": 89,
    "difficulty": "boss",
    "title": "Cumulative Running Total on salaries_history (Q89)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #89 - Maya Thorne (VP of People Operations)]: Calculate cumulative progression in salaries_history. Return id, new_salary AS baseline_val, and SUM(new_salary) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 99;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, new_salary AS baseline_val, SUM(new_salary) OVER (ORDER BY id ASC) AS running_total FROM salaries_history WHERE id >= 1 ORDER BY id ASC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-090",
    "domain": "hr",
    "level": 4,
    "order": 90,
    "difficulty": "boss",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q90)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #90 - David Kim (Director of Talent Acquisition)]: Stage transformation logic for benefits_packages. Create a CTE named staged_metrics selecting id, package_name AS staged_name, and annual_cost AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 100;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, package_name AS staged_name, annual_cost AS score FROM benefits_packages WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-091",
    "domain": "hr",
    "level": 4,
    "order": 91,
    "difficulty": "boss",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q91)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #91 - Alicia Gomez (Head of Compensation & Total Rewards)]: Rank records in employee_benefits by id. Return id, employee_id::text AS entity_title, id AS metric_score, and ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 101;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entity_title, id AS metric_score, ROW_NUMBER() OVER (ORDER BY id DESC) AS rank_num FROM employee_benefits WHERE id >= 1 ORDER BY rank_num ASC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-092",
    "domain": "hr",
    "level": 4,
    "order": 92,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in performance_reviews (Q92)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #92 - Marcus Vance (Director of Workplace Experience)]: Compute dense ranking within each segment of performance_reviews. Return id, employee_id AS partition_key, bonus_pct AS metric_val, and DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 102;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, employee_id AS partition_key, bonus_pct AS metric_val, DENSE_RANK() OVER (PARTITION BY employee_id ORDER BY bonus_pct DESC) AS dense_rnk FROM performance_reviews WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-093",
    "domain": "hr",
    "level": 4,
    "order": 93,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q93)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #93 - Maya Thorne (VP of People Operations)]: Perform period-over-period delta analysis on leave_requests. Return id, total_days AS current_val, and LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 103;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "total_days",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, total_days AS current_val, LAG(total_days, 1) OVER (ORDER BY id ASC) AS prev_metric FROM leave_requests WHERE id >= 1 ORDER BY id ASC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-094",
    "domain": "hr",
    "level": 4,
    "order": 94,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q94)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #94 - David Kim (Director of Talent Acquisition)]: Perform forward-looking trend analysis on attendance_logs. Return id, hours_worked AS current_val, and LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 104;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "hours_worked",
      "next_metric"
    ],
    "reference_sql": "SELECT id, hours_worked AS current_val, LEAD(hours_worked, 1) OVER (ORDER BY id ASC) AS next_metric FROM attendance_logs WHERE id >= 1 ORDER BY id ASC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-095",
    "domain": "hr",
    "level": 4,
    "order": 95,
    "difficulty": "boss",
    "title": "Cumulative Running Total on training_courses (Q95)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #95 - Alicia Gomez (Head of Compensation & Total Rewards)]: Calculate cumulative progression in training_courses. Return id, duration_hours AS baseline_val, and SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total where id >= 1 ordered by id ASC LIMIT 105;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "SUM() OVER",
      "CUMULATIVE METRICS"
    ],
    "expected_columns": [
      "id",
      "baseline_val",
      "running_total"
    ],
    "reference_sql": "SELECT id, duration_hours AS baseline_val, SUM(duration_hours) OVER (ORDER BY id ASC) AS running_total FROM training_courses WHERE id >= 1 ORDER BY id ASC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-096",
    "domain": "hr",
    "level": 4,
    "order": 96,
    "difficulty": "boss",
    "title": "Modular Pipeline with Common Table Expression (CTE) (Q96)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #96 - Marcus Vance (Director of Workplace Experience)]: Stage transformation logic for employee_trainings. Create a CTE named staged_metrics selecting id, status AS staged_name, and score AS score where id >= 1. Query from staged_metrics ordered by score DESC, id ASC LIMIT 106;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WITH (CTE)",
      "MODULAR SQL",
      "PIPELINE"
    ],
    "expected_columns": [
      "id",
      "staged_name",
      "score"
    ],
    "reference_sql": "WITH staged_metrics AS (SELECT id, status AS staged_name, score AS score FROM employee_trainings WHERE id >= 1) SELECT id, staged_name, score FROM staged_metrics ORDER BY score DESC, id ASC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-097",
    "domain": "hr",
    "level": 4,
    "order": 97,
    "difficulty": "boss",
    "title": "Analytical Ordinal Ranking with ROW_NUMBER() (Q97)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #97 - Maya Thorne (VP of People Operations)]: Rank records in departments by budget. Return id, name AS entity_title, budget AS metric_score, and ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num where id >= 1 ordered by rank_num ASC LIMIT 107;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "ROW_NUMBER()",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "entity_title",
      "metric_score",
      "rank_num"
    ],
    "reference_sql": "SELECT id, name AS entity_title, budget AS metric_score, ROW_NUMBER() OVER (ORDER BY budget DESC) AS rank_num FROM departments WHERE id >= 1 ORDER BY rank_num ASC LIMIT 107;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-098",
    "domain": "hr",
    "level": 4,
    "order": 98,
    "difficulty": "boss",
    "title": "Dense Partition Ranking in job_roles (Q98)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #98 - David Kim (Director of Talent Acquisition)]: Compute dense ranking within each segment of job_roles. Return id, department_id AS partition_key, min_salary AS metric_val, and DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk where id >= 1 ordered by partition_key ASC, dense_rnk ASC LIMIT 108;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "DENSE_RANK()",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "partition_key",
      "metric_val",
      "dense_rnk"
    ],
    "reference_sql": "SELECT id, department_id AS partition_key, min_salary AS metric_val, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY min_salary DESC) AS dense_rnk FROM job_roles WHERE id >= 1 ORDER BY partition_key ASC, dense_rnk ASC LIMIT 108;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-099",
    "domain": "hr",
    "level": 4,
    "order": 99,
    "difficulty": "boss",
    "title": "Sequential Trend Analysis with LAG() (Q99)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #99 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform period-over-period delta analysis on locations. Return id, capacity AS current_val, and LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric where id >= 1 ordered by id ASC LIMIT 109;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LAG()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "capacity",
      "prev_metric"
    ],
    "reference_sql": "SELECT id, capacity AS current_val, LAG(capacity, 1) OVER (ORDER BY id ASC) AS prev_metric FROM locations WHERE id >= 1 ORDER BY id ASC LIMIT 109;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  },
  {
    "id": "hr-L4-100",
    "domain": "hr",
    "level": 4,
    "order": 100,
    "difficulty": "boss",
    "title": "Sequential Projection Analysis with LEAD() (Q100)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #100 - Marcus Vance (Director of Workplace Experience)]: Perform forward-looking trend analysis on employees. Return id, salary AS current_val, and LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric where id >= 1 ordered by id ASC LIMIT 110;\"",
    "context_notes": "Level 4 Window function & CTE query.",
    "concepts": [
      "WINDOW FUNCTION",
      "LEAD()",
      "TREND ANALYSIS"
    ],
    "expected_columns": [
      "id",
      "current_val",
      "salary",
      "next_metric"
    ],
    "reference_sql": "SELECT id, salary AS current_val, LEAD(salary, 1) OVER (ORDER BY id ASC) AS next_metric FROM employees WHERE id >= 1 ORDER BY id ASC LIMIT 110;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Use OVER (ORDER BY ... / PARTITION BY ...)."
    ],
    "solution_explanation": "Applies advanced window functions and common table expressions.",
    "xp": 95,
    "estimated_minutes": 24
  }
];
