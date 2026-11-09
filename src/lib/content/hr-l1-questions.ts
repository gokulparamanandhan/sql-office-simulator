import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L1_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "hr-L1-001",
    "domain": "hr",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "DEPARTMENTS Directory Audit (Q1)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #1 - Maya Thorne (VP of People Operations)]: Ahead of our quarterly audit, pull our active departments records showing id and name as display_name, ordered by id ascending. Limit output to 11 records.\"",
    "context_notes": "Level 1 Foundational single-table query on departments.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, name AS display_name FROM departments WHERE id >= 2 ORDER BY id ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table departments."
    ],
    "solution_explanation": "Retrieves records from departments applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-002",
    "domain": "hr",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "JOB ROLES Directory Audit (Q2)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #2 - David Kim (Director of Talent Acquisition)]: Ahead of our quarterly audit, pull our active job_roles records showing id and job_title as display_name, ordered by id ascending. Limit output to 12 records.\"",
    "context_notes": "Level 1 Foundational single-table query on job_roles.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, job_title AS display_name FROM job_roles WHERE id >= 3 ORDER BY id ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table job_roles."
    ],
    "solution_explanation": "Retrieves records from job_roles applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-003",
    "domain": "hr",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "LOCATIONS Directory Audit (Q3)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #3 - Alicia Gomez (Head of Compensation & Total Rewards)]: Ahead of our quarterly audit, pull our active locations records showing id and office_name as display_name, ordered by id ascending. Limit output to 13 records.\"",
    "context_notes": "Level 1 Foundational single-table query on locations.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, office_name AS display_name FROM locations WHERE id >= 4 ORDER BY id ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table locations."
    ],
    "solution_explanation": "Retrieves records from locations applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-004",
    "domain": "hr",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "EMPLOYEES Directory Audit (Q4)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #4 - Marcus Vance (Director of Workplace Experience)]: Ahead of our quarterly audit, pull our active employees records showing id and name as display_name, ordered by id ascending. Limit output to 14 records.\"",
    "context_notes": "Level 1 Foundational single-table query on employees.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, name AS display_name FROM employees WHERE id >= 5 ORDER BY id ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employees."
    ],
    "solution_explanation": "Retrieves records from employees applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-005",
    "domain": "hr",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "SALARIES HISTORY Directory Audit (Q5)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #5 - Maya Thorne (VP of People Operations)]: Ahead of our quarterly audit, pull our active salaries_history records showing id and change_reason as display_name, ordered by id ascending. Limit output to 15 records.\"",
    "context_notes": "Level 1 Foundational single-table query on salaries_history.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, change_reason AS display_name FROM salaries_history WHERE id >= 1 ORDER BY id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table salaries_history."
    ],
    "solution_explanation": "Retrieves records from salaries_history applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-006",
    "domain": "hr",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "BENEFITS PACKAGES Directory Audit (Q6)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #6 - David Kim (Director of Talent Acquisition)]: Ahead of our quarterly audit, pull our active benefits_packages records showing id and package_name as display_name, ordered by id ascending. Limit output to 16 records.\"",
    "context_notes": "Level 1 Foundational single-table query on benefits_packages.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, package_name AS display_name FROM benefits_packages WHERE id >= 2 ORDER BY id ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table benefits_packages."
    ],
    "solution_explanation": "Retrieves records from benefits_packages applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-007",
    "domain": "hr",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "EMPLOYEE BENEFITS Directory Audit (Q7)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #7 - Alicia Gomez (Head of Compensation & Total Rewards)]: Ahead of our quarterly audit, pull our active employee_benefits records showing id and employee_id::text as display_name, ordered by id ascending. Limit output to 17 records.\"",
    "context_notes": "Level 1 Foundational single-table query on employee_benefits.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, employee_id::text AS display_name FROM employee_benefits WHERE id >= 3 ORDER BY id ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_benefits."
    ],
    "solution_explanation": "Retrieves records from employee_benefits applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-008",
    "domain": "hr",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "PERFORMANCE REVIEWS Directory Audit (Q8)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #8 - Marcus Vance (Director of Workplace Experience)]: Ahead of our quarterly audit, pull our active performance_reviews records showing id and employee_id::text as display_name, ordered by id ascending. Limit output to 18 records.\"",
    "context_notes": "Level 1 Foundational single-table query on performance_reviews.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, employee_id::text AS display_name FROM performance_reviews WHERE id >= 4 ORDER BY id ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table performance_reviews."
    ],
    "solution_explanation": "Retrieves records from performance_reviews applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-009",
    "domain": "hr",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "LEAVE REQUESTS Directory Audit (Q9)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #9 - Maya Thorne (VP of People Operations)]: Ahead of our quarterly audit, pull our active leave_requests records showing id and leave_type as display_name, ordered by id ascending. Limit output to 19 records.\"",
    "context_notes": "Level 1 Foundational single-table query on leave_requests.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, leave_type AS display_name FROM leave_requests WHERE id >= 5 ORDER BY id ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table leave_requests."
    ],
    "solution_explanation": "Retrieves records from leave_requests applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-010",
    "domain": "hr",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "ATTENDANCE LOGS Directory Audit (Q10)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #10 - David Kim (Director of Talent Acquisition)]: Ahead of our quarterly audit, pull our active attendance_logs records showing id and work_mode as display_name, ordered by id ascending. Limit output to 20 records.\"",
    "context_notes": "Level 1 Foundational single-table query on attendance_logs.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, work_mode AS display_name FROM attendance_logs WHERE id >= 1 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table attendance_logs."
    ],
    "solution_explanation": "Retrieves records from attendance_logs applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-011",
    "domain": "hr",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "TRAINING COURSES Directory Audit (Q11)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #11 - Alicia Gomez (Head of Compensation & Total Rewards)]: Ahead of our quarterly audit, pull our active training_courses records showing id and course_title as display_name, ordered by id ascending. Limit output to 21 records.\"",
    "context_notes": "Level 1 Foundational single-table query on training_courses.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, course_title AS display_name FROM training_courses WHERE id >= 2 ORDER BY id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table training_courses."
    ],
    "solution_explanation": "Retrieves records from training_courses applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-012",
    "domain": "hr",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "EMPLOYEE TRAININGS Directory Audit (Q12)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #12 - Marcus Vance (Director of Workplace Experience)]: Ahead of our quarterly audit, pull our active employee_trainings records showing id and status as display_name, ordered by id ascending. Limit output to 22 records.\"",
    "context_notes": "Level 1 Foundational single-table query on employee_trainings.",
    "concepts": [
      "SELECT",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "display_name"
    ],
    "reference_sql": "SELECT id, status AS display_name FROM employee_trainings WHERE id >= 3 ORDER BY id ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_trainings."
    ],
    "solution_explanation": "Retrieves records from employee_trainings applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-013",
    "domain": "hr",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in departments (Q13)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #13 - Maya Thorne (VP of People Operations)]: Identify high-volume entries in departments. Select id, name AS item_title, and budget AS metric_val where id >= 4 ORDER BY metric_val DESC LIMIT 23;\"",
    "context_notes": "Level 1 Foundational single-table query on departments.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, name AS item_title, budget AS metric_val FROM departments WHERE id >= 4 ORDER BY metric_val DESC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table departments."
    ],
    "solution_explanation": "Retrieves records from departments applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-014",
    "domain": "hr",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in job_roles (Q14)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #14 - David Kim (Director of Talent Acquisition)]: Identify high-volume entries in job_roles. Select id, job_title AS item_title, and min_salary AS metric_val where id >= 5 ORDER BY metric_val DESC LIMIT 24;\"",
    "context_notes": "Level 1 Foundational single-table query on job_roles.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, job_title AS item_title, min_salary AS metric_val FROM job_roles WHERE id >= 5 ORDER BY metric_val DESC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table job_roles."
    ],
    "solution_explanation": "Retrieves records from job_roles applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-015",
    "domain": "hr",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in locations (Q15)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #15 - Alicia Gomez (Head of Compensation & Total Rewards)]: Identify high-volume entries in locations. Select id, office_name AS item_title, and capacity AS metric_val where id >= 1 ORDER BY metric_val DESC LIMIT 25;\"",
    "context_notes": "Level 1 Foundational single-table query on locations.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, office_name AS item_title, capacity AS metric_val FROM locations WHERE id >= 1 ORDER BY metric_val DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table locations."
    ],
    "solution_explanation": "Retrieves records from locations applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-016",
    "domain": "hr",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in employees (Q16)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #16 - Marcus Vance (Director of Workplace Experience)]: Identify high-volume entries in employees. Select id, name AS item_title, and salary AS metric_val where id >= 2 ORDER BY metric_val DESC LIMIT 26;\"",
    "context_notes": "Level 1 Foundational single-table query on employees.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, name AS item_title, salary AS metric_val FROM employees WHERE id >= 2 ORDER BY metric_val DESC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employees."
    ],
    "solution_explanation": "Retrieves records from employees applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-017",
    "domain": "hr",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in salaries_history (Q17)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #17 - Maya Thorne (VP of People Operations)]: Identify high-volume entries in salaries_history. Select id, change_reason AS item_title, and new_salary AS metric_val where id >= 3 ORDER BY metric_val DESC LIMIT 27;\"",
    "context_notes": "Level 1 Foundational single-table query on salaries_history.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, change_reason AS item_title, new_salary AS metric_val FROM salaries_history WHERE id >= 3 ORDER BY metric_val DESC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table salaries_history."
    ],
    "solution_explanation": "Retrieves records from salaries_history applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-018",
    "domain": "hr",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in benefits_packages (Q18)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #18 - David Kim (Director of Talent Acquisition)]: Identify high-volume entries in benefits_packages. Select id, package_name AS item_title, and annual_cost AS metric_val where id >= 4 ORDER BY metric_val DESC LIMIT 28;\"",
    "context_notes": "Level 1 Foundational single-table query on benefits_packages.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, package_name AS item_title, annual_cost AS metric_val FROM benefits_packages WHERE id >= 4 ORDER BY metric_val DESC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table benefits_packages."
    ],
    "solution_explanation": "Retrieves records from benefits_packages applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-019",
    "domain": "hr",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in employee_benefits (Q19)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #19 - Alicia Gomez (Head of Compensation & Total Rewards)]: Identify high-volume entries in employee_benefits. Select id, employee_id::text AS item_title, and id AS metric_val where id >= 5 ORDER BY metric_val DESC LIMIT 29;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_benefits.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, employee_id::text AS item_title, id AS metric_val FROM employee_benefits WHERE id >= 5 ORDER BY metric_val DESC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_benefits."
    ],
    "solution_explanation": "Retrieves records from employee_benefits applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-020",
    "domain": "hr",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in performance_reviews (Q20)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #20 - Marcus Vance (Director of Workplace Experience)]: Identify high-volume entries in performance_reviews. Select id, employee_id::text AS item_title, and bonus_pct AS metric_val where id >= 1 ORDER BY metric_val DESC LIMIT 30;\"",
    "context_notes": "Level 1 Foundational single-table query on performance_reviews.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, employee_id::text AS item_title, bonus_pct AS metric_val FROM performance_reviews WHERE id >= 1 ORDER BY metric_val DESC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table performance_reviews."
    ],
    "solution_explanation": "Retrieves records from performance_reviews applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-021",
    "domain": "hr",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in leave_requests (Q21)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #21 - Maya Thorne (VP of People Operations)]: Identify high-volume entries in leave_requests. Select id, leave_type AS item_title, and total_days AS metric_val where id >= 2 ORDER BY metric_val DESC LIMIT 31;\"",
    "context_notes": "Level 1 Foundational single-table query on leave_requests.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, leave_type AS item_title, total_days AS metric_val FROM leave_requests WHERE id >= 2 ORDER BY metric_val DESC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table leave_requests."
    ],
    "solution_explanation": "Retrieves records from leave_requests applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-022",
    "domain": "hr",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in attendance_logs (Q22)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #22 - David Kim (Director of Talent Acquisition)]: Identify high-volume entries in attendance_logs. Select id, work_mode AS item_title, and hours_worked AS metric_val where id >= 3 ORDER BY metric_val DESC LIMIT 32;\"",
    "context_notes": "Level 1 Foundational single-table query on attendance_logs.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, work_mode AS item_title, hours_worked AS metric_val FROM attendance_logs WHERE id >= 3 ORDER BY metric_val DESC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table attendance_logs."
    ],
    "solution_explanation": "Retrieves records from attendance_logs applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-023",
    "domain": "hr",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in training_courses (Q23)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #23 - Alicia Gomez (Head of Compensation & Total Rewards)]: Identify high-volume entries in training_courses. Select id, course_title AS item_title, and duration_hours AS metric_val where id >= 4 ORDER BY metric_val DESC LIMIT 33;\"",
    "context_notes": "Level 1 Foundational single-table query on training_courses.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, course_title AS item_title, duration_hours AS metric_val FROM training_courses WHERE id >= 4 ORDER BY metric_val DESC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table training_courses."
    ],
    "solution_explanation": "Retrieves records from training_courses applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-024",
    "domain": "hr",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "High-Tier Selection in employee_trainings (Q24)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #24 - Marcus Vance (Director of Workplace Experience)]: Identify high-volume entries in employee_trainings. Select id, status AS item_title, and score AS metric_val where id >= 5 ORDER BY metric_val DESC LIMIT 34;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_trainings.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_title",
      "metric_val"
    ],
    "reference_sql": "SELECT id, status AS item_title, score AS metric_val FROM employee_trainings WHERE id >= 5 ORDER BY metric_val DESC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_trainings."
    ],
    "solution_explanation": "Retrieves records from employee_trainings applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-025",
    "domain": "hr",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on departments (Q25)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #25 - Maya Thorne (VP of People Operations)]: Management is tracking midpoint distributions. Select id, name AS entity_name, and budget AS val from departments where id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 35;\"",
    "context_notes": "Level 1 Foundational single-table query on departments.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, name AS entity_name, budget AS val FROM departments WHERE id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table departments."
    ],
    "solution_explanation": "Retrieves records from departments applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-026",
    "domain": "hr",
    "level": 1,
    "order": 26,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on job_roles (Q26)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #26 - David Kim (Director of Talent Acquisition)]: Management is tracking midpoint distributions. Select id, job_title AS entity_name, and min_salary AS val from job_roles where id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 36;\"",
    "context_notes": "Level 1 Foundational single-table query on job_roles.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, job_title AS entity_name, min_salary AS val FROM job_roles WHERE id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table job_roles."
    ],
    "solution_explanation": "Retrieves records from job_roles applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-027",
    "domain": "hr",
    "level": 1,
    "order": 27,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on locations (Q27)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #27 - Alicia Gomez (Head of Compensation & Total Rewards)]: Management is tracking midpoint distributions. Select id, office_name AS entity_name, and capacity AS val from locations where id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 37;\"",
    "context_notes": "Level 1 Foundational single-table query on locations.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, office_name AS entity_name, capacity AS val FROM locations WHERE id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table locations."
    ],
    "solution_explanation": "Retrieves records from locations applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-028",
    "domain": "hr",
    "level": 1,
    "order": 28,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on employees (Q28)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #28 - Marcus Vance (Director of Workplace Experience)]: Management is tracking midpoint distributions. Select id, name AS entity_name, and salary AS val from employees where id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 38;\"",
    "context_notes": "Level 1 Foundational single-table query on employees.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, name AS entity_name, salary AS val FROM employees WHERE id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employees."
    ],
    "solution_explanation": "Retrieves records from employees applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-029",
    "domain": "hr",
    "level": 1,
    "order": 29,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on salaries_history (Q29)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #29 - Maya Thorne (VP of People Operations)]: Management is tracking midpoint distributions. Select id, change_reason AS entity_name, and new_salary AS val from salaries_history where id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 39;\"",
    "context_notes": "Level 1 Foundational single-table query on salaries_history.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, change_reason AS entity_name, new_salary AS val FROM salaries_history WHERE id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table salaries_history."
    ],
    "solution_explanation": "Retrieves records from salaries_history applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-030",
    "domain": "hr",
    "level": 1,
    "order": 30,
    "difficulty": "warm-up",
    "title": "Threshold Interval Filtering on benefits_packages (Q30)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #30 - David Kim (Director of Talent Acquisition)]: Management is tracking midpoint distributions. Select id, package_name AS entity_name, and annual_cost AS val from benefits_packages where id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 40;\"",
    "context_notes": "Level 1 Foundational single-table query on benefits_packages.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, package_name AS entity_name, annual_cost AS val FROM benefits_packages WHERE id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table benefits_packages."
    ],
    "solution_explanation": "Retrieves records from benefits_packages applying standard SQL clauses.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hr-L1-031",
    "domain": "hr",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on employee_benefits (Q31)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #31 - Alicia Gomez (Head of Compensation & Total Rewards)]: Management is tracking midpoint distributions. Select id, employee_id::text AS entity_name, and id AS val from employee_benefits where id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 41;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_benefits.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entity_name, id AS val FROM employee_benefits WHERE id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_benefits."
    ],
    "solution_explanation": "Retrieves records from employee_benefits applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-032",
    "domain": "hr",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on performance_reviews (Q32)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #32 - Marcus Vance (Director of Workplace Experience)]: Management is tracking midpoint distributions. Select id, employee_id::text AS entity_name, and bonus_pct AS val from performance_reviews where id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 42;\"",
    "context_notes": "Level 1 Foundational single-table query on performance_reviews.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entity_name, bonus_pct AS val FROM performance_reviews WHERE id BETWEEN 3 AND 62 ORDER BY val ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table performance_reviews."
    ],
    "solution_explanation": "Retrieves records from performance_reviews applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-033",
    "domain": "hr",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on leave_requests (Q33)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #33 - Maya Thorne (VP of People Operations)]: Management is tracking midpoint distributions. Select id, leave_type AS entity_name, and total_days AS val from leave_requests where id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 43;\"",
    "context_notes": "Level 1 Foundational single-table query on leave_requests.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, leave_type AS entity_name, total_days AS val FROM leave_requests WHERE id BETWEEN 4 AND 63 ORDER BY val ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table leave_requests."
    ],
    "solution_explanation": "Retrieves records from leave_requests applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-034",
    "domain": "hr",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on attendance_logs (Q34)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #34 - David Kim (Director of Talent Acquisition)]: Management is tracking midpoint distributions. Select id, work_mode AS entity_name, and hours_worked AS val from attendance_logs where id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 44;\"",
    "context_notes": "Level 1 Foundational single-table query on attendance_logs.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, work_mode AS entity_name, hours_worked AS val FROM attendance_logs WHERE id BETWEEN 5 AND 64 ORDER BY val ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table attendance_logs."
    ],
    "solution_explanation": "Retrieves records from attendance_logs applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-035",
    "domain": "hr",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on training_courses (Q35)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #35 - Alicia Gomez (Head of Compensation & Total Rewards)]: Management is tracking midpoint distributions. Select id, course_title AS entity_name, and duration_hours AS val from training_courses where id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 45;\"",
    "context_notes": "Level 1 Foundational single-table query on training_courses.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, course_title AS entity_name, duration_hours AS val FROM training_courses WHERE id BETWEEN 1 AND 60 ORDER BY val ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table training_courses."
    ],
    "solution_explanation": "Retrieves records from training_courses applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-036",
    "domain": "hr",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "Threshold Interval Filtering on employee_trainings (Q36)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #36 - Marcus Vance (Director of Workplace Experience)]: Management is tracking midpoint distributions. Select id, status AS entity_name, and score AS val from employee_trainings where id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 46;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_trainings.",
    "concepts": [
      "SELECT",
      "WHERE",
      "BETWEEN",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "entity_name",
      "val"
    ],
    "reference_sql": "SELECT id, status AS entity_name, score AS val FROM employee_trainings WHERE id BETWEEN 2 AND 61 ORDER BY val ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_trainings."
    ],
    "solution_explanation": "Retrieves records from employee_trainings applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-037",
    "domain": "hr",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in departments (Q37)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #37 - Maya Thorne (VP of People Operations)]: Ensure robust reporting against missing values. Select id, name AS entry_name, and COALESCE(budget, 0.00) AS safe_val from departments WHERE id >= 3 ORDER BY id ASC LIMIT 47;\"",
    "context_notes": "Level 1 Foundational single-table query on departments.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "budget",
      "safe_val"
    ],
    "reference_sql": "SELECT id, name AS entry_name, COALESCE(budget, 0.00) AS safe_val FROM departments WHERE id >= 3 ORDER BY id ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table departments."
    ],
    "solution_explanation": "Retrieves records from departments applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-038",
    "domain": "hr",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in job_roles (Q38)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #38 - David Kim (Director of Talent Acquisition)]: Ensure robust reporting against missing values. Select id, job_title AS entry_name, and COALESCE(min_salary, 0.00) AS safe_val from job_roles WHERE id >= 4 ORDER BY id ASC LIMIT 48;\"",
    "context_notes": "Level 1 Foundational single-table query on job_roles.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "min_salary",
      "safe_val"
    ],
    "reference_sql": "SELECT id, job_title AS entry_name, COALESCE(min_salary, 0.00) AS safe_val FROM job_roles WHERE id >= 4 ORDER BY id ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table job_roles."
    ],
    "solution_explanation": "Retrieves records from job_roles applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-039",
    "domain": "hr",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in locations (Q39)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #39 - Alicia Gomez (Head of Compensation & Total Rewards)]: Ensure robust reporting against missing values. Select id, office_name AS entry_name, and COALESCE(capacity, 0.00) AS safe_val from locations WHERE id >= 5 ORDER BY id ASC LIMIT 49;\"",
    "context_notes": "Level 1 Foundational single-table query on locations.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "capacity",
      "safe_val"
    ],
    "reference_sql": "SELECT id, office_name AS entry_name, COALESCE(capacity, 0.00) AS safe_val FROM locations WHERE id >= 5 ORDER BY id ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table locations."
    ],
    "solution_explanation": "Retrieves records from locations applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-040",
    "domain": "hr",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in employees (Q40)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #40 - Marcus Vance (Director of Workplace Experience)]: Ensure robust reporting against missing values. Select id, name AS entry_name, and COALESCE(salary, 0.00) AS safe_val from employees WHERE id >= 1 ORDER BY id ASC LIMIT 50;\"",
    "context_notes": "Level 1 Foundational single-table query on employees.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "salary",
      "safe_val"
    ],
    "reference_sql": "SELECT id, name AS entry_name, COALESCE(salary, 0.00) AS safe_val FROM employees WHERE id >= 1 ORDER BY id ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employees."
    ],
    "solution_explanation": "Retrieves records from employees applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-041",
    "domain": "hr",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in salaries_history (Q41)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #41 - Maya Thorne (VP of People Operations)]: Ensure robust reporting against missing values. Select id, change_reason AS entry_name, and COALESCE(new_salary, 0.00) AS safe_val from salaries_history WHERE id >= 2 ORDER BY id ASC LIMIT 51;\"",
    "context_notes": "Level 1 Foundational single-table query on salaries_history.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "new_salary",
      "safe_val"
    ],
    "reference_sql": "SELECT id, change_reason AS entry_name, COALESCE(new_salary, 0.00) AS safe_val FROM salaries_history WHERE id >= 2 ORDER BY id ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table salaries_history."
    ],
    "solution_explanation": "Retrieves records from salaries_history applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-042",
    "domain": "hr",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in benefits_packages (Q42)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #42 - David Kim (Director of Talent Acquisition)]: Ensure robust reporting against missing values. Select id, package_name AS entry_name, and COALESCE(annual_cost, 0.00) AS safe_val from benefits_packages WHERE id >= 3 ORDER BY id ASC LIMIT 52;\"",
    "context_notes": "Level 1 Foundational single-table query on benefits_packages.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "annual_cost",
      "safe_val"
    ],
    "reference_sql": "SELECT id, package_name AS entry_name, COALESCE(annual_cost, 0.00) AS safe_val FROM benefits_packages WHERE id >= 3 ORDER BY id ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table benefits_packages."
    ],
    "solution_explanation": "Retrieves records from benefits_packages applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-043",
    "domain": "hr",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in employee_benefits (Q43)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #43 - Alicia Gomez (Head of Compensation & Total Rewards)]: Ensure robust reporting against missing values. Select id, employee_id::text AS entry_name, and COALESCE(id, 0.00) AS safe_val from employee_benefits WHERE id >= 4 ORDER BY id ASC LIMIT 53;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_benefits.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "id",
      "safe_val"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entry_name, COALESCE(id, 0.00) AS safe_val FROM employee_benefits WHERE id >= 4 ORDER BY id ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_benefits."
    ],
    "solution_explanation": "Retrieves records from employee_benefits applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-044",
    "domain": "hr",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in performance_reviews (Q44)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #44 - Marcus Vance (Director of Workplace Experience)]: Ensure robust reporting against missing values. Select id, employee_id::text AS entry_name, and COALESCE(bonus_pct, 0.00) AS safe_val from performance_reviews WHERE id >= 5 ORDER BY id ASC LIMIT 54;\"",
    "context_notes": "Level 1 Foundational single-table query on performance_reviews.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "bonus_pct",
      "safe_val"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entry_name, COALESCE(bonus_pct, 0.00) AS safe_val FROM performance_reviews WHERE id >= 5 ORDER BY id ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table performance_reviews."
    ],
    "solution_explanation": "Retrieves records from performance_reviews applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-045",
    "domain": "hr",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in leave_requests (Q45)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #45 - Maya Thorne (VP of People Operations)]: Ensure robust reporting against missing values. Select id, leave_type AS entry_name, and COALESCE(total_days, 0.00) AS safe_val from leave_requests WHERE id >= 1 ORDER BY id ASC LIMIT 55;\"",
    "context_notes": "Level 1 Foundational single-table query on leave_requests.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "total_days",
      "safe_val"
    ],
    "reference_sql": "SELECT id, leave_type AS entry_name, COALESCE(total_days, 0.00) AS safe_val FROM leave_requests WHERE id >= 1 ORDER BY id ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table leave_requests."
    ],
    "solution_explanation": "Retrieves records from leave_requests applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-046",
    "domain": "hr",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in attendance_logs (Q46)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #46 - David Kim (Director of Talent Acquisition)]: Ensure robust reporting against missing values. Select id, work_mode AS entry_name, and COALESCE(hours_worked, 0.00) AS safe_val from attendance_logs WHERE id >= 2 ORDER BY id ASC LIMIT 56;\"",
    "context_notes": "Level 1 Foundational single-table query on attendance_logs.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "hours_worked",
      "safe_val"
    ],
    "reference_sql": "SELECT id, work_mode AS entry_name, COALESCE(hours_worked, 0.00) AS safe_val FROM attendance_logs WHERE id >= 2 ORDER BY id ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table attendance_logs."
    ],
    "solution_explanation": "Retrieves records from attendance_logs applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-047",
    "domain": "hr",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in training_courses (Q47)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #47 - Alicia Gomez (Head of Compensation & Total Rewards)]: Ensure robust reporting against missing values. Select id, course_title AS entry_name, and COALESCE(duration_hours, 0.00) AS safe_val from training_courses WHERE id >= 3 ORDER BY id ASC LIMIT 57;\"",
    "context_notes": "Level 1 Foundational single-table query on training_courses.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "duration_hours",
      "safe_val"
    ],
    "reference_sql": "SELECT id, course_title AS entry_name, COALESCE(duration_hours, 0.00) AS safe_val FROM training_courses WHERE id >= 3 ORDER BY id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table training_courses."
    ],
    "solution_explanation": "Retrieves records from training_courses applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-048",
    "domain": "hr",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "Data Hygiene & Imputation in employee_trainings (Q48)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #48 - Marcus Vance (Director of Workplace Experience)]: Ensure robust reporting against missing values. Select id, status AS entry_name, and COALESCE(score, 0.00) AS safe_val from employee_trainings WHERE id >= 4 ORDER BY id ASC LIMIT 58;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_trainings.",
    "concepts": [
      "SELECT",
      "COALESCE",
      "DATA INTEGRITY"
    ],
    "expected_columns": [
      "id",
      "entry_name",
      "score",
      "safe_val"
    ],
    "reference_sql": "SELECT id, status AS entry_name, COALESCE(score, 0.00) AS safe_val FROM employee_trainings WHERE id >= 4 ORDER BY id ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_trainings."
    ],
    "solution_explanation": "Retrieves records from employee_trainings applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-049",
    "domain": "hr",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "String Normalization on departments (Q49)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #49 - Maya Thorne (VP of People Operations)]: Standardize text fields in departments. Select id, UPPER(TRIM(name::text)) AS clean_name from departments WHERE name IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 59;\"",
    "context_notes": "Level 1 Foundational single-table query on departments.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(name::text)) AS clean_name FROM departments WHERE name IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table departments."
    ],
    "solution_explanation": "Retrieves records from departments applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-050",
    "domain": "hr",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "String Normalization on job_roles (Q50)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #50 - David Kim (Director of Talent Acquisition)]: Standardize text fields in job_roles. Select id, UPPER(TRIM(job_title::text)) AS clean_name from job_roles WHERE job_title IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 60;\"",
    "context_notes": "Level 1 Foundational single-table query on job_roles.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(job_title::text)) AS clean_name FROM job_roles WHERE job_title IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table job_roles."
    ],
    "solution_explanation": "Retrieves records from job_roles applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-051",
    "domain": "hr",
    "level": 1,
    "order": 51,
    "difficulty": "core",
    "title": "String Normalization on locations (Q51)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #51 - Alicia Gomez (Head of Compensation & Total Rewards)]: Standardize text fields in locations. Select id, UPPER(TRIM(office_name::text)) AS clean_name from locations WHERE office_name IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 61;\"",
    "context_notes": "Level 1 Foundational single-table query on locations.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(office_name::text)) AS clean_name FROM locations WHERE office_name IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table locations."
    ],
    "solution_explanation": "Retrieves records from locations applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-052",
    "domain": "hr",
    "level": 1,
    "order": 52,
    "difficulty": "core",
    "title": "String Normalization on employees (Q52)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #52 - Marcus Vance (Director of Workplace Experience)]: Standardize text fields in employees. Select id, UPPER(TRIM(name::text)) AS clean_name from employees WHERE name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 62;\"",
    "context_notes": "Level 1 Foundational single-table query on employees.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(name::text)) AS clean_name FROM employees WHERE name IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employees."
    ],
    "solution_explanation": "Retrieves records from employees applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-053",
    "domain": "hr",
    "level": 1,
    "order": 53,
    "difficulty": "core",
    "title": "String Normalization on salaries_history (Q53)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #53 - Maya Thorne (VP of People Operations)]: Standardize text fields in salaries_history. Select id, UPPER(TRIM(change_reason::text)) AS clean_name from salaries_history WHERE change_reason IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 63;\"",
    "context_notes": "Level 1 Foundational single-table query on salaries_history.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(change_reason::text)) AS clean_name FROM salaries_history WHERE change_reason IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table salaries_history."
    ],
    "solution_explanation": "Retrieves records from salaries_history applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-054",
    "domain": "hr",
    "level": 1,
    "order": 54,
    "difficulty": "core",
    "title": "String Normalization on benefits_packages (Q54)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #54 - David Kim (Director of Talent Acquisition)]: Standardize text fields in benefits_packages. Select id, UPPER(TRIM(package_name::text)) AS clean_name from benefits_packages WHERE package_name IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 64;\"",
    "context_notes": "Level 1 Foundational single-table query on benefits_packages.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(package_name::text)) AS clean_name FROM benefits_packages WHERE package_name IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table benefits_packages."
    ],
    "solution_explanation": "Retrieves records from benefits_packages applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-055",
    "domain": "hr",
    "level": 1,
    "order": 55,
    "difficulty": "core",
    "title": "String Normalization on employee_benefits (Q55)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #55 - Alicia Gomez (Head of Compensation & Total Rewards)]: Standardize text fields in employee_benefits. Select id, UPPER(TRIM(employee_id::text::text)) AS clean_name from employee_benefits WHERE employee_id::text IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 65;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_benefits.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(employee_id::text::text)) AS clean_name FROM employee_benefits WHERE employee_id::text IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_benefits."
    ],
    "solution_explanation": "Retrieves records from employee_benefits applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-056",
    "domain": "hr",
    "level": 1,
    "order": 56,
    "difficulty": "core",
    "title": "String Normalization on performance_reviews (Q56)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #56 - Marcus Vance (Director of Workplace Experience)]: Standardize text fields in performance_reviews. Select id, UPPER(TRIM(employee_id::text::text)) AS clean_name from performance_reviews WHERE employee_id::text IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 66;\"",
    "context_notes": "Level 1 Foundational single-table query on performance_reviews.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(employee_id::text::text)) AS clean_name FROM performance_reviews WHERE employee_id::text IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table performance_reviews."
    ],
    "solution_explanation": "Retrieves records from performance_reviews applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-057",
    "domain": "hr",
    "level": 1,
    "order": 57,
    "difficulty": "core",
    "title": "String Normalization on leave_requests (Q57)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #57 - Maya Thorne (VP of People Operations)]: Standardize text fields in leave_requests. Select id, UPPER(TRIM(leave_type::text)) AS clean_name from leave_requests WHERE leave_type IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 67;\"",
    "context_notes": "Level 1 Foundational single-table query on leave_requests.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(leave_type::text)) AS clean_name FROM leave_requests WHERE leave_type IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table leave_requests."
    ],
    "solution_explanation": "Retrieves records from leave_requests applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-058",
    "domain": "hr",
    "level": 1,
    "order": 58,
    "difficulty": "core",
    "title": "String Normalization on attendance_logs (Q58)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #58 - David Kim (Director of Talent Acquisition)]: Standardize text fields in attendance_logs. Select id, UPPER(TRIM(work_mode::text)) AS clean_name from attendance_logs WHERE work_mode IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 68;\"",
    "context_notes": "Level 1 Foundational single-table query on attendance_logs.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(work_mode::text)) AS clean_name FROM attendance_logs WHERE work_mode IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table attendance_logs."
    ],
    "solution_explanation": "Retrieves records from attendance_logs applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-059",
    "domain": "hr",
    "level": 1,
    "order": 59,
    "difficulty": "core",
    "title": "String Normalization on training_courses (Q59)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #59 - Alicia Gomez (Head of Compensation & Total Rewards)]: Standardize text fields in training_courses. Select id, UPPER(TRIM(course_title::text)) AS clean_name from training_courses WHERE course_title IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 69;\"",
    "context_notes": "Level 1 Foundational single-table query on training_courses.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(course_title::text)) AS clean_name FROM training_courses WHERE course_title IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table training_courses."
    ],
    "solution_explanation": "Retrieves records from training_courses applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-060",
    "domain": "hr",
    "level": 1,
    "order": 60,
    "difficulty": "core",
    "title": "String Normalization on employee_trainings (Q60)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #60 - Marcus Vance (Director of Workplace Experience)]: Standardize text fields in employee_trainings. Select id, UPPER(TRIM(status::text)) AS clean_name from employee_trainings WHERE status IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 70;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_trainings.",
    "concepts": [
      "SELECT",
      "TRIM",
      "UPPER",
      "DATA CLEANING"
    ],
    "expected_columns": [
      "id",
      "clean_name"
    ],
    "reference_sql": "SELECT id, UPPER(TRIM(status::text)) AS clean_name FROM employee_trainings WHERE status IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_trainings."
    ],
    "solution_explanation": "Retrieves records from employee_trainings applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-061",
    "domain": "hr",
    "level": 1,
    "order": 61,
    "difficulty": "core",
    "title": "Category Classification in departments (Q61)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #61 - Maya Thorne (VP of People Operations)]: Review our unique classification segments in departments. Select DISTINCT head_name AS category_label from departments WHERE head_name IS NOT NULL AND id <= 111 ORDER BY category_label ASC LIMIT 71;\"",
    "context_notes": "Level 1 Foundational single-table query on departments.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT head_name AS category_label FROM departments WHERE head_name IS NOT NULL AND id <= 111 ORDER BY category_label ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table departments."
    ],
    "solution_explanation": "Retrieves records from departments applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-062",
    "domain": "hr",
    "level": 1,
    "order": 62,
    "difficulty": "core",
    "title": "Category Classification in job_roles (Q62)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #62 - David Kim (Director of Talent Acquisition)]: Review our unique classification segments in job_roles. Select DISTINCT grade_level AS category_label from job_roles WHERE grade_level IS NOT NULL AND id <= 112 ORDER BY category_label ASC LIMIT 72;\"",
    "context_notes": "Level 1 Foundational single-table query on job_roles.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT grade_level AS category_label FROM job_roles WHERE grade_level IS NOT NULL AND id <= 112 ORDER BY category_label ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table job_roles."
    ],
    "solution_explanation": "Retrieves records from job_roles applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-063",
    "domain": "hr",
    "level": 1,
    "order": 63,
    "difficulty": "core",
    "title": "Category Classification in locations (Q63)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #63 - Alicia Gomez (Head of Compensation & Total Rewards)]: Review our unique classification segments in locations. Select DISTINCT city AS category_label from locations WHERE city IS NOT NULL AND id <= 113 ORDER BY category_label ASC LIMIT 73;\"",
    "context_notes": "Level 1 Foundational single-table query on locations.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT city AS category_label FROM locations WHERE city IS NOT NULL AND id <= 113 ORDER BY category_label ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table locations."
    ],
    "solution_explanation": "Retrieves records from locations applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-064",
    "domain": "hr",
    "level": 1,
    "order": 64,
    "difficulty": "core",
    "title": "Category Classification in employees (Q64)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #64 - Marcus Vance (Director of Workplace Experience)]: Review our unique classification segments in employees. Select DISTINCT status AS category_label from employees WHERE status IS NOT NULL AND id <= 114 ORDER BY category_label ASC LIMIT 74;\"",
    "context_notes": "Level 1 Foundational single-table query on employees.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT status AS category_label FROM employees WHERE status IS NOT NULL AND id <= 114 ORDER BY category_label ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employees."
    ],
    "solution_explanation": "Retrieves records from employees applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-065",
    "domain": "hr",
    "level": 1,
    "order": 65,
    "difficulty": "core",
    "title": "Category Classification in salaries_history (Q65)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #65 - Maya Thorne (VP of People Operations)]: Review our unique classification segments in salaries_history. Select DISTINCT change_reason AS category_label from salaries_history WHERE change_reason IS NOT NULL AND id <= 115 ORDER BY category_label ASC LIMIT 75;\"",
    "context_notes": "Level 1 Foundational single-table query on salaries_history.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT change_reason AS category_label FROM salaries_history WHERE change_reason IS NOT NULL AND id <= 115 ORDER BY category_label ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table salaries_history."
    ],
    "solution_explanation": "Retrieves records from salaries_history applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-066",
    "domain": "hr",
    "level": 1,
    "order": 66,
    "difficulty": "core",
    "title": "Category Classification in benefits_packages (Q66)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #66 - David Kim (Director of Talent Acquisition)]: Review our unique classification segments in benefits_packages. Select DISTINCT health_plan AS category_label from benefits_packages WHERE health_plan IS NOT NULL AND id <= 116 ORDER BY category_label ASC LIMIT 76;\"",
    "context_notes": "Level 1 Foundational single-table query on benefits_packages.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT health_plan AS category_label FROM benefits_packages WHERE health_plan IS NOT NULL AND id <= 116 ORDER BY category_label ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table benefits_packages."
    ],
    "solution_explanation": "Retrieves records from benefits_packages applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-067",
    "domain": "hr",
    "level": 1,
    "order": 67,
    "difficulty": "core",
    "title": "Category Classification in employee_benefits (Q67)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #67 - Alicia Gomez (Head of Compensation & Total Rewards)]: Review our unique classification segments in employee_benefits. Select DISTINCT package_id::text AS category_label from employee_benefits WHERE package_id::text IS NOT NULL AND id <= 117 ORDER BY category_label ASC LIMIT 77;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_benefits.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT package_id::text AS category_label FROM employee_benefits WHERE package_id::text IS NOT NULL AND id <= 117 ORDER BY category_label ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_benefits."
    ],
    "solution_explanation": "Retrieves records from employee_benefits applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-068",
    "domain": "hr",
    "level": 1,
    "order": 68,
    "difficulty": "core",
    "title": "Category Classification in performance_reviews (Q68)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #68 - Marcus Vance (Director of Workplace Experience)]: Review our unique classification segments in performance_reviews. Select DISTINCT employee_id::text AS category_label from performance_reviews WHERE employee_id::text IS NOT NULL AND id <= 118 ORDER BY category_label ASC LIMIT 78;\"",
    "context_notes": "Level 1 Foundational single-table query on performance_reviews.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT employee_id::text AS category_label FROM performance_reviews WHERE employee_id::text IS NOT NULL AND id <= 118 ORDER BY category_label ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table performance_reviews."
    ],
    "solution_explanation": "Retrieves records from performance_reviews applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-069",
    "domain": "hr",
    "level": 1,
    "order": 69,
    "difficulty": "core",
    "title": "Category Classification in leave_requests (Q69)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #69 - Maya Thorne (VP of People Operations)]: Review our unique classification segments in leave_requests. Select DISTINCT status AS category_label from leave_requests WHERE status IS NOT NULL AND id <= 119 ORDER BY category_label ASC LIMIT 79;\"",
    "context_notes": "Level 1 Foundational single-table query on leave_requests.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT status AS category_label FROM leave_requests WHERE status IS NOT NULL AND id <= 119 ORDER BY category_label ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table leave_requests."
    ],
    "solution_explanation": "Retrieves records from leave_requests applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-070",
    "domain": "hr",
    "level": 1,
    "order": 70,
    "difficulty": "core",
    "title": "Category Classification in attendance_logs (Q70)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #70 - David Kim (Director of Talent Acquisition)]: Review our unique classification segments in attendance_logs. Select DISTINCT work_mode AS category_label from attendance_logs WHERE work_mode IS NOT NULL AND id <= 120 ORDER BY category_label ASC LIMIT 80;\"",
    "context_notes": "Level 1 Foundational single-table query on attendance_logs.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT work_mode AS category_label FROM attendance_logs WHERE work_mode IS NOT NULL AND id <= 120 ORDER BY category_label ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table attendance_logs."
    ],
    "solution_explanation": "Retrieves records from attendance_logs applying standard SQL clauses.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hr-L1-071",
    "domain": "hr",
    "level": 1,
    "order": 71,
    "difficulty": "challenging",
    "title": "Category Classification in training_courses (Q71)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #71 - Alicia Gomez (Head of Compensation & Total Rewards)]: Review our unique classification segments in training_courses. Select DISTINCT category AS category_label from training_courses WHERE category IS NOT NULL AND id <= 121 ORDER BY category_label ASC LIMIT 81;\"",
    "context_notes": "Level 1 Foundational single-table query on training_courses.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT category AS category_label FROM training_courses WHERE category IS NOT NULL AND id <= 121 ORDER BY category_label ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table training_courses."
    ],
    "solution_explanation": "Retrieves records from training_courses applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-072",
    "domain": "hr",
    "level": 1,
    "order": 72,
    "difficulty": "challenging",
    "title": "Category Classification in employee_trainings (Q72)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #72 - Marcus Vance (Director of Workplace Experience)]: Review our unique classification segments in employee_trainings. Select DISTINCT status AS category_label from employee_trainings WHERE status IS NOT NULL AND id <= 122 ORDER BY category_label ASC LIMIT 82;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_trainings.",
    "concepts": [
      "SELECT DISTINCT",
      "ORDER BY"
    ],
    "expected_columns": [
      "category_label"
    ],
    "reference_sql": "SELECT DISTINCT status AS category_label FROM employee_trainings WHERE status IS NOT NULL AND id <= 122 ORDER BY category_label ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_trainings."
    ],
    "solution_explanation": "Retrieves records from employee_trainings applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-073",
    "domain": "hr",
    "level": 1,
    "order": 73,
    "difficulty": "challenging",
    "title": "Margin Projection on departments (Q73)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #73 - Maya Thorne (VP of People Operations)]: Calculate financial inflation adjustment. Select id, name AS label, and ROUND((budget * 1.05)::numeric, 2) AS projected_metric from departments WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 83;\"",
    "context_notes": "Level 1 Foundational single-table query on departments.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, name AS label, ROUND((budget * 1.05)::numeric, 2) AS projected_metric FROM departments WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table departments."
    ],
    "solution_explanation": "Retrieves records from departments applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-074",
    "domain": "hr",
    "level": 1,
    "order": 74,
    "difficulty": "challenging",
    "title": "Margin Projection on job_roles (Q74)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #74 - David Kim (Director of Talent Acquisition)]: Calculate financial inflation adjustment. Select id, job_title AS label, and ROUND((min_salary * 1.06)::numeric, 2) AS projected_metric from job_roles WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 84;\"",
    "context_notes": "Level 1 Foundational single-table query on job_roles.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, job_title AS label, ROUND((min_salary * 1.06)::numeric, 2) AS projected_metric FROM job_roles WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table job_roles."
    ],
    "solution_explanation": "Retrieves records from job_roles applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-075",
    "domain": "hr",
    "level": 1,
    "order": 75,
    "difficulty": "challenging",
    "title": "Margin Projection on locations (Q75)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #75 - Alicia Gomez (Head of Compensation & Total Rewards)]: Calculate financial inflation adjustment. Select id, office_name AS label, and ROUND((capacity * 1.07)::numeric, 2) AS projected_metric from locations WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 85;\"",
    "context_notes": "Level 1 Foundational single-table query on locations.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, office_name AS label, ROUND((capacity * 1.07)::numeric, 2) AS projected_metric FROM locations WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table locations."
    ],
    "solution_explanation": "Retrieves records from locations applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-076",
    "domain": "hr",
    "level": 1,
    "order": 76,
    "difficulty": "challenging",
    "title": "Margin Projection on employees (Q76)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #76 - Marcus Vance (Director of Workplace Experience)]: Calculate financial inflation adjustment. Select id, name AS label, and ROUND((salary * 1.08)::numeric, 2) AS projected_metric from employees WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 86;\"",
    "context_notes": "Level 1 Foundational single-table query on employees.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, name AS label, ROUND((salary * 1.08)::numeric, 2) AS projected_metric FROM employees WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employees."
    ],
    "solution_explanation": "Retrieves records from employees applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-077",
    "domain": "hr",
    "level": 1,
    "order": 77,
    "difficulty": "challenging",
    "title": "Margin Projection on salaries_history (Q77)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #77 - Maya Thorne (VP of People Operations)]: Calculate financial inflation adjustment. Select id, change_reason AS label, and ROUND((new_salary * 1.09)::numeric, 2) AS projected_metric from salaries_history WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 87;\"",
    "context_notes": "Level 1 Foundational single-table query on salaries_history.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, change_reason AS label, ROUND((new_salary * 1.09)::numeric, 2) AS projected_metric FROM salaries_history WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table salaries_history."
    ],
    "solution_explanation": "Retrieves records from salaries_history applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-078",
    "domain": "hr",
    "level": 1,
    "order": 78,
    "difficulty": "challenging",
    "title": "Margin Projection on benefits_packages (Q78)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #78 - David Kim (Director of Talent Acquisition)]: Calculate financial inflation adjustment. Select id, package_name AS label, and ROUND((annual_cost * 1.10)::numeric, 2) AS projected_metric from benefits_packages WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 88;\"",
    "context_notes": "Level 1 Foundational single-table query on benefits_packages.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, package_name AS label, ROUND((annual_cost * 1.10)::numeric, 2) AS projected_metric FROM benefits_packages WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table benefits_packages."
    ],
    "solution_explanation": "Retrieves records from benefits_packages applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-079",
    "domain": "hr",
    "level": 1,
    "order": 79,
    "difficulty": "challenging",
    "title": "Margin Projection on employee_benefits (Q79)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #79 - Alicia Gomez (Head of Compensation & Total Rewards)]: Calculate financial inflation adjustment. Select id, employee_id::text AS label, and ROUND((id * 1.11)::numeric, 2) AS projected_metric from employee_benefits WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 89;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_benefits.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, employee_id::text AS label, ROUND((id * 1.11)::numeric, 2) AS projected_metric FROM employee_benefits WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_benefits."
    ],
    "solution_explanation": "Retrieves records from employee_benefits applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-080",
    "domain": "hr",
    "level": 1,
    "order": 80,
    "difficulty": "challenging",
    "title": "Margin Projection on performance_reviews (Q80)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #80 - Marcus Vance (Director of Workplace Experience)]: Calculate financial inflation adjustment. Select id, employee_id::text AS label, and ROUND((bonus_pct * 1.02)::numeric, 2) AS projected_metric from performance_reviews WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 90;\"",
    "context_notes": "Level 1 Foundational single-table query on performance_reviews.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, employee_id::text AS label, ROUND((bonus_pct * 1.02)::numeric, 2) AS projected_metric FROM performance_reviews WHERE id >= 1 ORDER BY projected_metric DESC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table performance_reviews."
    ],
    "solution_explanation": "Retrieves records from performance_reviews applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-081",
    "domain": "hr",
    "level": 1,
    "order": 81,
    "difficulty": "challenging",
    "title": "Margin Projection on leave_requests (Q81)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #81 - Maya Thorne (VP of People Operations)]: Calculate financial inflation adjustment. Select id, leave_type AS label, and ROUND((total_days * 1.03)::numeric, 2) AS projected_metric from leave_requests WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 91;\"",
    "context_notes": "Level 1 Foundational single-table query on leave_requests.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, leave_type AS label, ROUND((total_days * 1.03)::numeric, 2) AS projected_metric FROM leave_requests WHERE id >= 2 ORDER BY projected_metric DESC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table leave_requests."
    ],
    "solution_explanation": "Retrieves records from leave_requests applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-082",
    "domain": "hr",
    "level": 1,
    "order": 82,
    "difficulty": "challenging",
    "title": "Margin Projection on attendance_logs (Q82)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #82 - David Kim (Director of Talent Acquisition)]: Calculate financial inflation adjustment. Select id, work_mode AS label, and ROUND((hours_worked * 1.04)::numeric, 2) AS projected_metric from attendance_logs WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 92;\"",
    "context_notes": "Level 1 Foundational single-table query on attendance_logs.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, work_mode AS label, ROUND((hours_worked * 1.04)::numeric, 2) AS projected_metric FROM attendance_logs WHERE id >= 3 ORDER BY projected_metric DESC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table attendance_logs."
    ],
    "solution_explanation": "Retrieves records from attendance_logs applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-083",
    "domain": "hr",
    "level": 1,
    "order": 83,
    "difficulty": "challenging",
    "title": "Margin Projection on training_courses (Q83)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #83 - Alicia Gomez (Head of Compensation & Total Rewards)]: Calculate financial inflation adjustment. Select id, course_title AS label, and ROUND((duration_hours * 1.05)::numeric, 2) AS projected_metric from training_courses WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 93;\"",
    "context_notes": "Level 1 Foundational single-table query on training_courses.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, course_title AS label, ROUND((duration_hours * 1.05)::numeric, 2) AS projected_metric FROM training_courses WHERE id >= 4 ORDER BY projected_metric DESC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table training_courses."
    ],
    "solution_explanation": "Retrieves records from training_courses applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-084",
    "domain": "hr",
    "level": 1,
    "order": 84,
    "difficulty": "challenging",
    "title": "Margin Projection on employee_trainings (Q84)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #84 - Marcus Vance (Director of Workplace Experience)]: Calculate financial inflation adjustment. Select id, status AS label, and ROUND((score * 1.06)::numeric, 2) AS projected_metric from employee_trainings WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 94;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_trainings.",
    "concepts": [
      "SELECT",
      "ROUND",
      "ARITHMETIC",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "label",
      "numeric",
      "projected_metric"
    ],
    "reference_sql": "SELECT id, status AS label, ROUND((score * 1.06)::numeric, 2) AS projected_metric FROM employee_trainings WHERE id >= 5 ORDER BY projected_metric DESC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_trainings."
    ],
    "solution_explanation": "Retrieves records from employee_trainings applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-085",
    "domain": "hr",
    "level": 1,
    "order": 85,
    "difficulty": "challenging",
    "title": "Status Segment Inspection in departments (Q85)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #85 - Maya Thorne (VP of People Operations)]: Extract active records from departments. Select id, name AS item_name, and head_name AS tag from departments WHERE head_name IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 95;\"",
    "context_notes": "Level 1 Foundational single-table query on departments.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, name AS item_name, head_name AS tag FROM departments WHERE head_name IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table departments."
    ],
    "solution_explanation": "Retrieves records from departments applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-086",
    "domain": "hr",
    "level": 1,
    "order": 86,
    "difficulty": "challenging",
    "title": "Status Segment Inspection in job_roles (Q86)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #86 - David Kim (Director of Talent Acquisition)]: Extract active records from job_roles. Select id, job_title AS item_name, and grade_level AS tag from job_roles WHERE grade_level IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 96;\"",
    "context_notes": "Level 1 Foundational single-table query on job_roles.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, job_title AS item_name, grade_level AS tag FROM job_roles WHERE grade_level IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table job_roles."
    ],
    "solution_explanation": "Retrieves records from job_roles applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-087",
    "domain": "hr",
    "level": 1,
    "order": 87,
    "difficulty": "challenging",
    "title": "Status Segment Inspection in locations (Q87)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #87 - Alicia Gomez (Head of Compensation & Total Rewards)]: Extract active records from locations. Select id, office_name AS item_name, and city AS tag from locations WHERE city IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 97;\"",
    "context_notes": "Level 1 Foundational single-table query on locations.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, office_name AS item_name, city AS tag FROM locations WHERE city IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table locations."
    ],
    "solution_explanation": "Retrieves records from locations applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-088",
    "domain": "hr",
    "level": 1,
    "order": 88,
    "difficulty": "challenging",
    "title": "Status Segment Inspection in employees (Q88)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #88 - Marcus Vance (Director of Workplace Experience)]: Extract active records from employees. Select id, name AS item_name, and status AS tag from employees WHERE status IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 98;\"",
    "context_notes": "Level 1 Foundational single-table query on employees.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, name AS item_name, status AS tag FROM employees WHERE status IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employees."
    ],
    "solution_explanation": "Retrieves records from employees applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-089",
    "domain": "hr",
    "level": 1,
    "order": 89,
    "difficulty": "challenging",
    "title": "Status Segment Inspection in salaries_history (Q89)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #89 - Maya Thorne (VP of People Operations)]: Extract active records from salaries_history. Select id, change_reason AS item_name, and change_reason AS tag from salaries_history WHERE change_reason IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 99;\"",
    "context_notes": "Level 1 Foundational single-table query on salaries_history.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, change_reason AS item_name, change_reason AS tag FROM salaries_history WHERE change_reason IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table salaries_history."
    ],
    "solution_explanation": "Retrieves records from salaries_history applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-090",
    "domain": "hr",
    "level": 1,
    "order": 90,
    "difficulty": "challenging",
    "title": "Status Segment Inspection in benefits_packages (Q90)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #90 - David Kim (Director of Talent Acquisition)]: Extract active records from benefits_packages. Select id, package_name AS item_name, and health_plan AS tag from benefits_packages WHERE health_plan IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 100;\"",
    "context_notes": "Level 1 Foundational single-table query on benefits_packages.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, package_name AS item_name, health_plan AS tag FROM benefits_packages WHERE health_plan IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table benefits_packages."
    ],
    "solution_explanation": "Retrieves records from benefits_packages applying standard SQL clauses.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hr-L1-091",
    "domain": "hr",
    "level": 1,
    "order": 91,
    "difficulty": "boss",
    "title": "Status Segment Inspection in employee_benefits (Q91)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #91 - Alicia Gomez (Head of Compensation & Total Rewards)]: Extract active records from employee_benefits. Select id, employee_id::text AS item_name, and package_id::text AS tag from employee_benefits WHERE package_id::text IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 101;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_benefits.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, employee_id::text AS item_name, package_id::text AS tag FROM employee_benefits WHERE package_id::text IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_benefits."
    ],
    "solution_explanation": "Retrieves records from employee_benefits applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "hr-L1-092",
    "domain": "hr",
    "level": 1,
    "order": 92,
    "difficulty": "boss",
    "title": "Status Segment Inspection in performance_reviews (Q92)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #92 - Marcus Vance (Director of Workplace Experience)]: Extract active records from performance_reviews. Select id, employee_id::text AS item_name, and employee_id::text AS tag from performance_reviews WHERE employee_id::text IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 102;\"",
    "context_notes": "Level 1 Foundational single-table query on performance_reviews.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, employee_id::text AS item_name, employee_id::text AS tag FROM performance_reviews WHERE employee_id::text IS NOT NULL AND id >= 3 ORDER BY id ASC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table performance_reviews."
    ],
    "solution_explanation": "Retrieves records from performance_reviews applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "hr-L1-093",
    "domain": "hr",
    "level": 1,
    "order": 93,
    "difficulty": "boss",
    "title": "Status Segment Inspection in leave_requests (Q93)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #93 - Maya Thorne (VP of People Operations)]: Extract active records from leave_requests. Select id, leave_type AS item_name, and status AS tag from leave_requests WHERE status IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 103;\"",
    "context_notes": "Level 1 Foundational single-table query on leave_requests.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, leave_type AS item_name, status AS tag FROM leave_requests WHERE status IS NOT NULL AND id >= 4 ORDER BY id ASC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table leave_requests."
    ],
    "solution_explanation": "Retrieves records from leave_requests applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "hr-L1-094",
    "domain": "hr",
    "level": 1,
    "order": 94,
    "difficulty": "boss",
    "title": "Status Segment Inspection in attendance_logs (Q94)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #94 - David Kim (Director of Talent Acquisition)]: Extract active records from attendance_logs. Select id, work_mode AS item_name, and work_mode AS tag from attendance_logs WHERE work_mode IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 104;\"",
    "context_notes": "Level 1 Foundational single-table query on attendance_logs.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, work_mode AS item_name, work_mode AS tag FROM attendance_logs WHERE work_mode IS NOT NULL AND id >= 5 ORDER BY id ASC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table attendance_logs."
    ],
    "solution_explanation": "Retrieves records from attendance_logs applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "hr-L1-095",
    "domain": "hr",
    "level": 1,
    "order": 95,
    "difficulty": "boss",
    "title": "Status Segment Inspection in training_courses (Q95)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #95 - Alicia Gomez (Head of Compensation & Total Rewards)]: Extract active records from training_courses. Select id, course_title AS item_name, and category AS tag from training_courses WHERE category IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 105;\"",
    "context_notes": "Level 1 Foundational single-table query on training_courses.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, course_title AS item_name, category AS tag FROM training_courses WHERE category IS NOT NULL AND id >= 1 ORDER BY id ASC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table training_courses."
    ],
    "solution_explanation": "Retrieves records from training_courses applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "hr-L1-096",
    "domain": "hr",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Status Segment Inspection in employee_trainings (Q96)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #96 - Marcus Vance (Director of Workplace Experience)]: Extract active records from employee_trainings. Select id, status AS item_name, and status AS tag from employee_trainings WHERE status IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 106;\"",
    "context_notes": "Level 1 Foundational single-table query on employee_trainings.",
    "concepts": [
      "SELECT",
      "WHERE IS NOT NULL",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "item_name",
      "tag"
    ],
    "reference_sql": "SELECT id, status AS item_name, status AS tag FROM employee_trainings WHERE status IS NOT NULL AND id >= 2 ORDER BY id ASC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employee_trainings."
    ],
    "solution_explanation": "Retrieves records from employee_trainings applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "hr-L1-097",
    "domain": "hr",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Summary Volumetrics in departments (Q97)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #97 - Maya Thorne (VP of People Operations)]: Generate aggregate health summary for departments with threshold #97. Calculate total records as total_count, and average budget rounded to 2 decimals as avg_val where id >= 3 AND id <= 147;\"",
    "context_notes": "Level 1 Foundational single-table query on departments.",
    "concepts": [
      "SELECT",
      "COUNT",
      "AVG",
      "AGGREGATION"
    ],
    "expected_columns": [
      "total_count",
      "ROUND(AVG(budget::numeric)",
      "avg_val"
    ],
    "reference_sql": "SELECT COUNT(*) AS total_count, ROUND(AVG(budget::numeric), 2) AS avg_val FROM departments WHERE id >= 3 AND id <= 147;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table departments."
    ],
    "solution_explanation": "Retrieves records from departments applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "hr-L1-098",
    "domain": "hr",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Summary Volumetrics in job_roles (Q98)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #98 - David Kim (Director of Talent Acquisition)]: Generate aggregate health summary for job_roles with threshold #98. Calculate total records as total_count, and average min_salary rounded to 2 decimals as avg_val where id >= 4 AND id <= 148;\"",
    "context_notes": "Level 1 Foundational single-table query on job_roles.",
    "concepts": [
      "SELECT",
      "COUNT",
      "AVG",
      "AGGREGATION"
    ],
    "expected_columns": [
      "total_count",
      "ROUND(AVG(min_salary::numeric)",
      "avg_val"
    ],
    "reference_sql": "SELECT COUNT(*) AS total_count, ROUND(AVG(min_salary::numeric), 2) AS avg_val FROM job_roles WHERE id >= 4 AND id <= 148;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table job_roles."
    ],
    "solution_explanation": "Retrieves records from job_roles applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "hr-L1-099",
    "domain": "hr",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Summary Volumetrics in locations (Q99)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #99 - Alicia Gomez (Head of Compensation & Total Rewards)]: Generate aggregate health summary for locations with threshold #99. Calculate total records as total_count, and average capacity rounded to 2 decimals as avg_val where id >= 5 AND id <= 149;\"",
    "context_notes": "Level 1 Foundational single-table query on locations.",
    "concepts": [
      "SELECT",
      "COUNT",
      "AVG",
      "AGGREGATION"
    ],
    "expected_columns": [
      "total_count",
      "ROUND(AVG(capacity::numeric)",
      "avg_val"
    ],
    "reference_sql": "SELECT COUNT(*) AS total_count, ROUND(AVG(capacity::numeric), 2) AS avg_val FROM locations WHERE id >= 5 AND id <= 149;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table locations."
    ],
    "solution_explanation": "Retrieves records from locations applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  },
  {
    "id": "hr-L1-100",
    "domain": "hr",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "Summary Volumetrics in employees (Q100)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #100 - Marcus Vance (Director of Workplace Experience)]: Generate aggregate health summary for employees with threshold #100. Calculate total records as total_count, and average salary rounded to 2 decimals as avg_val where id >= 1 AND id <= 150;\"",
    "context_notes": "Level 1 Foundational single-table query on employees.",
    "concepts": [
      "SELECT",
      "COUNT",
      "AVG",
      "AGGREGATION"
    ],
    "expected_columns": [
      "total_count",
      "ROUND(AVG(salary::numeric)",
      "avg_val"
    ],
    "reference_sql": "SELECT COUNT(*) AS total_count, ROUND(AVG(salary::numeric), 2) AS avg_val FROM employees WHERE id >= 1 AND id <= 150;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Query table employees."
    ],
    "solution_explanation": "Retrieves records from employees applying standard SQL clauses.",
    "xp": 75,
    "estimated_minutes": 18
  }
];
