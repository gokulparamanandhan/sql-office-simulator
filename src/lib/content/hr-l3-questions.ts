import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L3_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "hr-L3-001",
    "domain": "hr",
    "level": 3,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Benchmark Segmentation with Subquery in job_roles (Q1)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #1 - Maya Thorne (VP of People Operations)]: Isolate records in job_roles. Select id, job_title AS item_title, and min_salary AS metric_score where min_salary >= (SELECT MIN(min_salary) FROM job_roles) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 11;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(min_salary)"
    ],
    "reference_sql": "SELECT id, job_title AS item_title, min_salary AS metric_score FROM job_roles WHERE min_salary >= (SELECT MIN(min_salary) FROM job_roles) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-002",
    "domain": "hr",
    "level": 3,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Dynamic Relation Filtering with IN Subquery (Q2)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #2 - David Kim (Director of Talent Acquisition)]: Filter employees using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM employees WHERE id >= 3) ORDER BY id ASC LIMIT 12;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM employees WHERE id IN (SELECT id FROM employees WHERE id >= 3) ORDER BY id ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-003",
    "domain": "hr",
    "level": 3,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Conditional Tier Classification with CASE WHEN (Q3)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #3 - Alicia Gomez (Head of Compensation & Total Rewards)]: Classify entries in salaries_history. Select id, change_reason AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from salaries_history ORDER BY id ASC LIMIT 13;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, change_reason AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM salaries_history ORDER BY id ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-004",
    "domain": "hr",
    "level": 3,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Registry Integration with UNION ALL (Q4)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #4 - Marcus Vance (Director of Workplace Experience)]: Combine registry names from employee_benefits and departments. Select employee_id::text::text AS entity_name, 'Primary Stream' AS source_tier from employee_benefits WHERE employee_id::text IS NOT NULL AND id <= 34 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 14;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT employee_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM employee_benefits WHERE employee_id::text IS NOT NULL AND id <= 34 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-005",
    "domain": "hr",
    "level": 3,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Relational Verification with EXISTS (Q5)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #5 - Maya Thorne (VP of People Operations)]: Verify relational existence in performance_reviews. Return t.id and t.employee_id::text AS confirmed_item WHERE EXISTS (SELECT 1 FROM performance_reviews sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 15;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.employee_id::text AS confirmed_item FROM performance_reviews t WHERE EXISTS (SELECT 1 FROM performance_reviews sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-006",
    "domain": "hr",
    "level": 3,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Inline Derived Table Transformation in leave_requests (Q6)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #6 - David Kim (Director of Talent Acquisition)]: Query derived table from leave_requests. Project dt.id, dt.leave_type AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 16;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "leave_type",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.leave_type AS derived_name, dt.score FROM (SELECT id, leave_type, total_days AS score FROM leave_requests WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-007",
    "domain": "hr",
    "level": 3,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Benchmark Segmentation with Subquery in attendance_logs (Q7)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #7 - Alicia Gomez (Head of Compensation & Total Rewards)]: Isolate records in attendance_logs. Select id, work_mode AS item_title, and hours_worked AS metric_score where hours_worked >= (SELECT MIN(hours_worked) FROM attendance_logs) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 17;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(hours_worked)"
    ],
    "reference_sql": "SELECT id, work_mode AS item_title, hours_worked AS metric_score FROM attendance_logs WHERE hours_worked >= (SELECT MIN(hours_worked) FROM attendance_logs) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-008",
    "domain": "hr",
    "level": 3,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Dynamic Relation Filtering with IN Subquery (Q8)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #8 - Marcus Vance (Director of Workplace Experience)]: Filter employee_trainings using an IN subquery against active ids. Return id and status AS filtered_name where id IN (SELECT id FROM employee_trainings WHERE id >= 4) ORDER BY id ASC LIMIT 18;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, status AS filtered_name FROM employee_trainings WHERE id IN (SELECT id FROM employee_trainings WHERE id >= 4) ORDER BY id ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-009",
    "domain": "hr",
    "level": 3,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Conditional Tier Classification with CASE WHEN (Q9)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #9 - Maya Thorne (VP of People Operations)]: Classify entries in job_roles. Select id, job_title AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from job_roles ORDER BY id ASC LIMIT 19;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, job_title AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM job_roles ORDER BY id ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-010",
    "domain": "hr",
    "level": 3,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Registry Integration with UNION ALL (Q10)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #10 - David Kim (Director of Talent Acquisition)]: Combine registry names from employees and employee_benefits. Select name::text AS entity_name, 'Primary Stream' AS source_tier from employees WHERE name IS NOT NULL AND id <= 40 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier from employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 20;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT name::text AS entity_name, 'Primary Stream' AS source_tier FROM employees WHERE name IS NOT NULL AND id <= 40 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier FROM employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-011",
    "domain": "hr",
    "level": 3,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Relational Verification with EXISTS (Q11)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #11 - Alicia Gomez (Head of Compensation & Total Rewards)]: Verify relational existence in salaries_history. Return t.id and t.change_reason AS confirmed_item WHERE EXISTS (SELECT 1 FROM salaries_history sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 21;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.change_reason AS confirmed_item FROM salaries_history t WHERE EXISTS (SELECT 1 FROM salaries_history sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-012",
    "domain": "hr",
    "level": 3,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Inline Derived Table Transformation in employee_benefits (Q12)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #12 - Marcus Vance (Director of Workplace Experience)]: Query derived table from employee_benefits. Project dt.id, dt.employee_id::text AS derived_name, and dt.score from inline derived table where id >= 3 ordered by score DESC LIMIT 22;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.employee_id::text AS derived_name, dt.score FROM (SELECT id, employee_id::text, id AS score FROM employee_benefits WHERE id >= 3) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-013",
    "domain": "hr",
    "level": 3,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Benchmark Segmentation with Subquery in performance_reviews (Q13)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #13 - Maya Thorne (VP of People Operations)]: Isolate records in performance_reviews. Select id, employee_id::text AS item_title, and bonus_pct AS metric_score where bonus_pct >= (SELECT MIN(bonus_pct) FROM performance_reviews) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 23;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(bonus_pct)"
    ],
    "reference_sql": "SELECT id, employee_id::text AS item_title, bonus_pct AS metric_score FROM performance_reviews WHERE bonus_pct >= (SELECT MIN(bonus_pct) FROM performance_reviews) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-014",
    "domain": "hr",
    "level": 3,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Dynamic Relation Filtering with IN Subquery (Q14)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #14 - David Kim (Director of Talent Acquisition)]: Filter leave_requests using an IN subquery against active ids. Return id and leave_type AS filtered_name where id IN (SELECT id FROM leave_requests WHERE id >= 5) ORDER BY id ASC LIMIT 24;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, leave_type AS filtered_name FROM leave_requests WHERE id IN (SELECT id FROM leave_requests WHERE id >= 5) ORDER BY id ASC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-015",
    "domain": "hr",
    "level": 3,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Conditional Tier Classification with CASE WHEN (Q15)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #15 - Alicia Gomez (Head of Compensation & Total Rewards)]: Classify entries in attendance_logs. Select id, work_mode AS entry_title, and CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from attendance_logs ORDER BY id ASC LIMIT 25;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, work_mode AS entry_title, CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM attendance_logs ORDER BY id ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hr-L3-016",
    "domain": "hr",
    "level": 3,
    "order": 16,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q16)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #16 - Marcus Vance (Director of Workplace Experience)]: Combine registry names from employee_trainings and departments. Select status::text AS entity_name, 'Primary Stream' AS source_tier from employee_trainings WHERE status IS NOT NULL AND id <= 46 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 26;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT status::text AS entity_name, 'Primary Stream' AS source_tier FROM employee_trainings WHERE status IS NOT NULL AND id <= 46 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-017",
    "domain": "hr",
    "level": 3,
    "order": 17,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q17)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #17 - Maya Thorne (VP of People Operations)]: Verify relational existence in job_roles. Return t.id and t.job_title AS confirmed_item WHERE EXISTS (SELECT 1 FROM job_roles sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 27;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.job_title AS confirmed_item FROM job_roles t WHERE EXISTS (SELECT 1 FROM job_roles sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-018",
    "domain": "hr",
    "level": 3,
    "order": 18,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in employees (Q18)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #18 - David Kim (Director of Talent Acquisition)]: Query derived table from employees. Project dt.id, dt.name AS derived_name, and dt.score from inline derived table where id >= 4 ordered by score DESC LIMIT 28;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "name",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.name AS derived_name, dt.score FROM (SELECT id, name, salary AS score FROM employees WHERE id >= 4) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-019",
    "domain": "hr",
    "level": 3,
    "order": 19,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in salaries_history (Q19)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #19 - Alicia Gomez (Head of Compensation & Total Rewards)]: Isolate records in salaries_history. Select id, change_reason AS item_title, and new_salary AS metric_score where new_salary >= (SELECT MIN(new_salary) FROM salaries_history) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 29;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(new_salary)"
    ],
    "reference_sql": "SELECT id, change_reason AS item_title, new_salary AS metric_score FROM salaries_history WHERE new_salary >= (SELECT MIN(new_salary) FROM salaries_history) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-020",
    "domain": "hr",
    "level": 3,
    "order": 20,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q20)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #20 - Marcus Vance (Director of Workplace Experience)]: Filter employee_benefits using an IN subquery against active ids. Return id and employee_id::text AS filtered_name where id IN (SELECT id FROM employee_benefits WHERE id >= 1) ORDER BY id ASC LIMIT 30;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, employee_id::text AS filtered_name FROM employee_benefits WHERE id IN (SELECT id FROM employee_benefits WHERE id >= 1) ORDER BY id ASC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-021",
    "domain": "hr",
    "level": 3,
    "order": 21,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q21)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #21 - Maya Thorne (VP of People Operations)]: Classify entries in performance_reviews. Select id, employee_id::text AS entry_title, and CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from performance_reviews ORDER BY id ASC LIMIT 31;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entry_title, CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM performance_reviews ORDER BY id ASC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-022",
    "domain": "hr",
    "level": 3,
    "order": 22,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q22)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #22 - David Kim (Director of Talent Acquisition)]: Combine registry names from leave_requests and employee_benefits. Select leave_type::text AS entity_name, 'Primary Stream' AS source_tier from leave_requests WHERE leave_type IS NOT NULL AND id <= 52 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier from employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 32;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT leave_type::text AS entity_name, 'Primary Stream' AS source_tier FROM leave_requests WHERE leave_type IS NOT NULL AND id <= 52 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier FROM employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-023",
    "domain": "hr",
    "level": 3,
    "order": 23,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q23)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #23 - Alicia Gomez (Head of Compensation & Total Rewards)]: Verify relational existence in attendance_logs. Return t.id and t.work_mode AS confirmed_item WHERE EXISTS (SELECT 1 FROM attendance_logs sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 33;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.work_mode AS confirmed_item FROM attendance_logs t WHERE EXISTS (SELECT 1 FROM attendance_logs sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-024",
    "domain": "hr",
    "level": 3,
    "order": 24,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in employee_trainings (Q24)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #24 - Marcus Vance (Director of Workplace Experience)]: Query derived table from employee_trainings. Project dt.id, dt.status AS derived_name, and dt.score from inline derived table where id >= 5 ordered by score DESC LIMIT 34;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "status",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.status AS derived_name, dt.score FROM (SELECT id, status, score AS score FROM employee_trainings WHERE id >= 5) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-025",
    "domain": "hr",
    "level": 3,
    "order": 25,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in job_roles (Q25)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #25 - Maya Thorne (VP of People Operations)]: Isolate records in job_roles. Select id, job_title AS item_title, and min_salary AS metric_score where min_salary >= (SELECT MIN(min_salary) FROM job_roles) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 35;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(min_salary)"
    ],
    "reference_sql": "SELECT id, job_title AS item_title, min_salary AS metric_score FROM job_roles WHERE min_salary >= (SELECT MIN(min_salary) FROM job_roles) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-026",
    "domain": "hr",
    "level": 3,
    "order": 26,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q26)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #26 - David Kim (Director of Talent Acquisition)]: Filter employees using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM employees WHERE id >= 2) ORDER BY id ASC LIMIT 36;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM employees WHERE id IN (SELECT id FROM employees WHERE id >= 2) ORDER BY id ASC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-027",
    "domain": "hr",
    "level": 3,
    "order": 27,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q27)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #27 - Alicia Gomez (Head of Compensation & Total Rewards)]: Classify entries in salaries_history. Select id, change_reason AS entry_title, and CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from salaries_history ORDER BY id ASC LIMIT 37;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, change_reason AS entry_title, CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM salaries_history ORDER BY id ASC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-028",
    "domain": "hr",
    "level": 3,
    "order": 28,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q28)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #28 - Marcus Vance (Director of Workplace Experience)]: Combine registry names from employee_benefits and departments. Select employee_id::text::text AS entity_name, 'Primary Stream' AS source_tier from employee_benefits WHERE employee_id::text IS NOT NULL AND id <= 58 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 38;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT employee_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM employee_benefits WHERE employee_id::text IS NOT NULL AND id <= 58 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-029",
    "domain": "hr",
    "level": 3,
    "order": 29,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q29)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #29 - Maya Thorne (VP of People Operations)]: Verify relational existence in performance_reviews. Return t.id and t.employee_id::text AS confirmed_item WHERE EXISTS (SELECT 1 FROM performance_reviews sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 39;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.employee_id::text AS confirmed_item FROM performance_reviews t WHERE EXISTS (SELECT 1 FROM performance_reviews sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-030",
    "domain": "hr",
    "level": 3,
    "order": 30,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in leave_requests (Q30)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #30 - David Kim (Director of Talent Acquisition)]: Query derived table from leave_requests. Project dt.id, dt.leave_type AS derived_name, and dt.score from inline derived table where id >= 1 ordered by score DESC LIMIT 40;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "leave_type",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.leave_type AS derived_name, dt.score FROM (SELECT id, leave_type, total_days AS score FROM leave_requests WHERE id >= 1) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-031",
    "domain": "hr",
    "level": 3,
    "order": 31,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in attendance_logs (Q31)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #31 - Alicia Gomez (Head of Compensation & Total Rewards)]: Isolate records in attendance_logs. Select id, work_mode AS item_title, and hours_worked AS metric_score where hours_worked >= (SELECT MIN(hours_worked) FROM attendance_logs) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 41;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(hours_worked)"
    ],
    "reference_sql": "SELECT id, work_mode AS item_title, hours_worked AS metric_score FROM attendance_logs WHERE hours_worked >= (SELECT MIN(hours_worked) FROM attendance_logs) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-032",
    "domain": "hr",
    "level": 3,
    "order": 32,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q32)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #32 - Marcus Vance (Director of Workplace Experience)]: Filter employee_trainings using an IN subquery against active ids. Return id and status AS filtered_name where id IN (SELECT id FROM employee_trainings WHERE id >= 3) ORDER BY id ASC LIMIT 42;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, status AS filtered_name FROM employee_trainings WHERE id IN (SELECT id FROM employee_trainings WHERE id >= 3) ORDER BY id ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-033",
    "domain": "hr",
    "level": 3,
    "order": 33,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q33)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #33 - Maya Thorne (VP of People Operations)]: Classify entries in job_roles. Select id, job_title AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from job_roles ORDER BY id ASC LIMIT 43;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, job_title AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM job_roles ORDER BY id ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-034",
    "domain": "hr",
    "level": 3,
    "order": 34,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q34)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #34 - David Kim (Director of Talent Acquisition)]: Combine registry names from employees and employee_benefits. Select name::text AS entity_name, 'Primary Stream' AS source_tier from employees WHERE name IS NOT NULL AND id <= 64 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier from employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 44;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT name::text AS entity_name, 'Primary Stream' AS source_tier FROM employees WHERE name IS NOT NULL AND id <= 64 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier FROM employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-035",
    "domain": "hr",
    "level": 3,
    "order": 35,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q35)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #35 - Alicia Gomez (Head of Compensation & Total Rewards)]: Verify relational existence in salaries_history. Return t.id and t.change_reason AS confirmed_item WHERE EXISTS (SELECT 1 FROM salaries_history sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 45;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.change_reason AS confirmed_item FROM salaries_history t WHERE EXISTS (SELECT 1 FROM salaries_history sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-036",
    "domain": "hr",
    "level": 3,
    "order": 36,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in employee_benefits (Q36)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #36 - Marcus Vance (Director of Workplace Experience)]: Query derived table from employee_benefits. Project dt.id, dt.employee_id::text AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 46;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.employee_id::text AS derived_name, dt.score FROM (SELECT id, employee_id::text, id AS score FROM employee_benefits WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-037",
    "domain": "hr",
    "level": 3,
    "order": 37,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in performance_reviews (Q37)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #37 - Maya Thorne (VP of People Operations)]: Isolate records in performance_reviews. Select id, employee_id::text AS item_title, and bonus_pct AS metric_score where bonus_pct >= (SELECT MIN(bonus_pct) FROM performance_reviews) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 47;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(bonus_pct)"
    ],
    "reference_sql": "SELECT id, employee_id::text AS item_title, bonus_pct AS metric_score FROM performance_reviews WHERE bonus_pct >= (SELECT MIN(bonus_pct) FROM performance_reviews) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-038",
    "domain": "hr",
    "level": 3,
    "order": 38,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q38)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #38 - David Kim (Director of Talent Acquisition)]: Filter leave_requests using an IN subquery against active ids. Return id and leave_type AS filtered_name where id IN (SELECT id FROM leave_requests WHERE id >= 4) ORDER BY id ASC LIMIT 48;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, leave_type AS filtered_name FROM leave_requests WHERE id IN (SELECT id FROM leave_requests WHERE id >= 4) ORDER BY id ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-039",
    "domain": "hr",
    "level": 3,
    "order": 39,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q39)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #39 - Alicia Gomez (Head of Compensation & Total Rewards)]: Classify entries in attendance_logs. Select id, work_mode AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from attendance_logs ORDER BY id ASC LIMIT 49;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, work_mode AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM attendance_logs ORDER BY id ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-040",
    "domain": "hr",
    "level": 3,
    "order": 40,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q40)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #40 - Marcus Vance (Director of Workplace Experience)]: Combine registry names from employee_trainings and departments. Select status::text AS entity_name, 'Primary Stream' AS source_tier from employee_trainings WHERE status IS NOT NULL AND id <= 70 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 50;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT status::text AS entity_name, 'Primary Stream' AS source_tier FROM employee_trainings WHERE status IS NOT NULL AND id <= 70 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-041",
    "domain": "hr",
    "level": 3,
    "order": 41,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q41)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #41 - Maya Thorne (VP of People Operations)]: Verify relational existence in job_roles. Return t.id and t.job_title AS confirmed_item WHERE EXISTS (SELECT 1 FROM job_roles sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 51;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.job_title AS confirmed_item FROM job_roles t WHERE EXISTS (SELECT 1 FROM job_roles sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-042",
    "domain": "hr",
    "level": 3,
    "order": 42,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in employees (Q42)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #42 - David Kim (Director of Talent Acquisition)]: Query derived table from employees. Project dt.id, dt.name AS derived_name, and dt.score from inline derived table where id >= 3 ordered by score DESC LIMIT 52;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "name",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.name AS derived_name, dt.score FROM (SELECT id, name, salary AS score FROM employees WHERE id >= 3) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-043",
    "domain": "hr",
    "level": 3,
    "order": 43,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in salaries_history (Q43)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #43 - Alicia Gomez (Head of Compensation & Total Rewards)]: Isolate records in salaries_history. Select id, change_reason AS item_title, and new_salary AS metric_score where new_salary >= (SELECT MIN(new_salary) FROM salaries_history) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 53;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(new_salary)"
    ],
    "reference_sql": "SELECT id, change_reason AS item_title, new_salary AS metric_score FROM salaries_history WHERE new_salary >= (SELECT MIN(new_salary) FROM salaries_history) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-044",
    "domain": "hr",
    "level": 3,
    "order": 44,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q44)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #44 - Marcus Vance (Director of Workplace Experience)]: Filter employee_benefits using an IN subquery against active ids. Return id and employee_id::text AS filtered_name where id IN (SELECT id FROM employee_benefits WHERE id >= 5) ORDER BY id ASC LIMIT 54;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, employee_id::text AS filtered_name FROM employee_benefits WHERE id IN (SELECT id FROM employee_benefits WHERE id >= 5) ORDER BY id ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-045",
    "domain": "hr",
    "level": 3,
    "order": 45,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q45)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #45 - Maya Thorne (VP of People Operations)]: Classify entries in performance_reviews. Select id, employee_id::text AS entry_title, and CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from performance_reviews ORDER BY id ASC LIMIT 55;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entry_title, CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM performance_reviews ORDER BY id ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-046",
    "domain": "hr",
    "level": 3,
    "order": 46,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q46)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #46 - David Kim (Director of Talent Acquisition)]: Combine registry names from leave_requests and employee_benefits. Select leave_type::text AS entity_name, 'Primary Stream' AS source_tier from leave_requests WHERE leave_type IS NOT NULL AND id <= 76 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier from employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 56;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT leave_type::text AS entity_name, 'Primary Stream' AS source_tier FROM leave_requests WHERE leave_type IS NOT NULL AND id <= 76 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier FROM employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-047",
    "domain": "hr",
    "level": 3,
    "order": 47,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q47)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #47 - Alicia Gomez (Head of Compensation & Total Rewards)]: Verify relational existence in attendance_logs. Return t.id and t.work_mode AS confirmed_item WHERE EXISTS (SELECT 1 FROM attendance_logs sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 57;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.work_mode AS confirmed_item FROM attendance_logs t WHERE EXISTS (SELECT 1 FROM attendance_logs sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-048",
    "domain": "hr",
    "level": 3,
    "order": 48,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in employee_trainings (Q48)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #48 - Marcus Vance (Director of Workplace Experience)]: Query derived table from employee_trainings. Project dt.id, dt.status AS derived_name, and dt.score from inline derived table where id >= 4 ordered by score DESC LIMIT 58;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "status",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.status AS derived_name, dt.score FROM (SELECT id, status, score AS score FROM employee_trainings WHERE id >= 4) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-049",
    "domain": "hr",
    "level": 3,
    "order": 49,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in job_roles (Q49)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #49 - Maya Thorne (VP of People Operations)]: Isolate records in job_roles. Select id, job_title AS item_title, and min_salary AS metric_score where min_salary >= (SELECT MIN(min_salary) FROM job_roles) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 59;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(min_salary)"
    ],
    "reference_sql": "SELECT id, job_title AS item_title, min_salary AS metric_score FROM job_roles WHERE min_salary >= (SELECT MIN(min_salary) FROM job_roles) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-050",
    "domain": "hr",
    "level": 3,
    "order": 50,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q50)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #50 - David Kim (Director of Talent Acquisition)]: Filter employees using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM employees WHERE id >= 1) ORDER BY id ASC LIMIT 60;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM employees WHERE id IN (SELECT id FROM employees WHERE id >= 1) ORDER BY id ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-051",
    "domain": "hr",
    "level": 3,
    "order": 51,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q51)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #51 - Alicia Gomez (Head of Compensation & Total Rewards)]: Classify entries in salaries_history. Select id, change_reason AS entry_title, and CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from salaries_history ORDER BY id ASC LIMIT 61;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, change_reason AS entry_title, CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM salaries_history ORDER BY id ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-052",
    "domain": "hr",
    "level": 3,
    "order": 52,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q52)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #52 - Marcus Vance (Director of Workplace Experience)]: Combine registry names from employee_benefits and departments. Select employee_id::text::text AS entity_name, 'Primary Stream' AS source_tier from employee_benefits WHERE employee_id::text IS NOT NULL AND id <= 82 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 62;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT employee_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM employee_benefits WHERE employee_id::text IS NOT NULL AND id <= 82 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-053",
    "domain": "hr",
    "level": 3,
    "order": 53,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q53)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #53 - Maya Thorne (VP of People Operations)]: Verify relational existence in performance_reviews. Return t.id and t.employee_id::text AS confirmed_item WHERE EXISTS (SELECT 1 FROM performance_reviews sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 63;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.employee_id::text AS confirmed_item FROM performance_reviews t WHERE EXISTS (SELECT 1 FROM performance_reviews sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-054",
    "domain": "hr",
    "level": 3,
    "order": 54,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in leave_requests (Q54)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #54 - David Kim (Director of Talent Acquisition)]: Query derived table from leave_requests. Project dt.id, dt.leave_type AS derived_name, and dt.score from inline derived table where id >= 5 ordered by score DESC LIMIT 64;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "leave_type",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.leave_type AS derived_name, dt.score FROM (SELECT id, leave_type, total_days AS score FROM leave_requests WHERE id >= 5) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-055",
    "domain": "hr",
    "level": 3,
    "order": 55,
    "difficulty": "core",
    "title": "Benchmark Segmentation with Subquery in attendance_logs (Q55)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #55 - Alicia Gomez (Head of Compensation & Total Rewards)]: Isolate records in attendance_logs. Select id, work_mode AS item_title, and hours_worked AS metric_score where hours_worked >= (SELECT MIN(hours_worked) FROM attendance_logs) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 65;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(hours_worked)"
    ],
    "reference_sql": "SELECT id, work_mode AS item_title, hours_worked AS metric_score FROM attendance_logs WHERE hours_worked >= (SELECT MIN(hours_worked) FROM attendance_logs) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-056",
    "domain": "hr",
    "level": 3,
    "order": 56,
    "difficulty": "core",
    "title": "Dynamic Relation Filtering with IN Subquery (Q56)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #56 - Marcus Vance (Director of Workplace Experience)]: Filter employee_trainings using an IN subquery against active ids. Return id and status AS filtered_name where id IN (SELECT id FROM employee_trainings WHERE id >= 2) ORDER BY id ASC LIMIT 66;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, status AS filtered_name FROM employee_trainings WHERE id IN (SELECT id FROM employee_trainings WHERE id >= 2) ORDER BY id ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-057",
    "domain": "hr",
    "level": 3,
    "order": 57,
    "difficulty": "core",
    "title": "Conditional Tier Classification with CASE WHEN (Q57)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #57 - Maya Thorne (VP of People Operations)]: Classify entries in job_roles. Select id, job_title AS entry_title, and CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from job_roles ORDER BY id ASC LIMIT 67;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, job_title AS entry_title, CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM job_roles ORDER BY id ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-058",
    "domain": "hr",
    "level": 3,
    "order": 58,
    "difficulty": "core",
    "title": "Registry Integration with UNION ALL (Q58)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #58 - David Kim (Director of Talent Acquisition)]: Combine registry names from employees and employee_benefits. Select name::text AS entity_name, 'Primary Stream' AS source_tier from employees WHERE name IS NOT NULL AND id <= 88 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier from employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 68;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT name::text AS entity_name, 'Primary Stream' AS source_tier FROM employees WHERE name IS NOT NULL AND id <= 88 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier FROM employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-059",
    "domain": "hr",
    "level": 3,
    "order": 59,
    "difficulty": "core",
    "title": "Relational Verification with EXISTS (Q59)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #59 - Alicia Gomez (Head of Compensation & Total Rewards)]: Verify relational existence in salaries_history. Return t.id and t.change_reason AS confirmed_item WHERE EXISTS (SELECT 1 FROM salaries_history sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 69;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.change_reason AS confirmed_item FROM salaries_history t WHERE EXISTS (SELECT 1 FROM salaries_history sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-060",
    "domain": "hr",
    "level": 3,
    "order": 60,
    "difficulty": "core",
    "title": "Inline Derived Table Transformation in employee_benefits (Q60)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #60 - Marcus Vance (Director of Workplace Experience)]: Query derived table from employee_benefits. Project dt.id, dt.employee_id::text AS derived_name, and dt.score from inline derived table where id >= 1 ordered by score DESC LIMIT 70;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.employee_id::text AS derived_name, dt.score FROM (SELECT id, employee_id::text, id AS score FROM employee_benefits WHERE id >= 1) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L3-061",
    "domain": "hr",
    "level": 3,
    "order": 61,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in performance_reviews (Q61)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #61 - Maya Thorne (VP of People Operations)]: Isolate records in performance_reviews. Select id, employee_id::text AS item_title, and bonus_pct AS metric_score where bonus_pct >= (SELECT MIN(bonus_pct) FROM performance_reviews) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 71;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(bonus_pct)"
    ],
    "reference_sql": "SELECT id, employee_id::text AS item_title, bonus_pct AS metric_score FROM performance_reviews WHERE bonus_pct >= (SELECT MIN(bonus_pct) FROM performance_reviews) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-062",
    "domain": "hr",
    "level": 3,
    "order": 62,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q62)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #62 - David Kim (Director of Talent Acquisition)]: Filter leave_requests using an IN subquery against active ids. Return id and leave_type AS filtered_name where id IN (SELECT id FROM leave_requests WHERE id >= 3) ORDER BY id ASC LIMIT 72;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, leave_type AS filtered_name FROM leave_requests WHERE id IN (SELECT id FROM leave_requests WHERE id >= 3) ORDER BY id ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-063",
    "domain": "hr",
    "level": 3,
    "order": 63,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q63)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #63 - Alicia Gomez (Head of Compensation & Total Rewards)]: Classify entries in attendance_logs. Select id, work_mode AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from attendance_logs ORDER BY id ASC LIMIT 73;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, work_mode AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM attendance_logs ORDER BY id ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-064",
    "domain": "hr",
    "level": 3,
    "order": 64,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q64)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #64 - Marcus Vance (Director of Workplace Experience)]: Combine registry names from employee_trainings and departments. Select status::text AS entity_name, 'Primary Stream' AS source_tier from employee_trainings WHERE status IS NOT NULL AND id <= 94 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 74;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT status::text AS entity_name, 'Primary Stream' AS source_tier FROM employee_trainings WHERE status IS NOT NULL AND id <= 94 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-065",
    "domain": "hr",
    "level": 3,
    "order": 65,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q65)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #65 - Maya Thorne (VP of People Operations)]: Verify relational existence in job_roles. Return t.id and t.job_title AS confirmed_item WHERE EXISTS (SELECT 1 FROM job_roles sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 75;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.job_title AS confirmed_item FROM job_roles t WHERE EXISTS (SELECT 1 FROM job_roles sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-066",
    "domain": "hr",
    "level": 3,
    "order": 66,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in employees (Q66)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #66 - David Kim (Director of Talent Acquisition)]: Query derived table from employees. Project dt.id, dt.name AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 76;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "name",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.name AS derived_name, dt.score FROM (SELECT id, name, salary AS score FROM employees WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-067",
    "domain": "hr",
    "level": 3,
    "order": 67,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in salaries_history (Q67)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #67 - Alicia Gomez (Head of Compensation & Total Rewards)]: Isolate records in salaries_history. Select id, change_reason AS item_title, and new_salary AS metric_score where new_salary >= (SELECT MIN(new_salary) FROM salaries_history) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 77;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(new_salary)"
    ],
    "reference_sql": "SELECT id, change_reason AS item_title, new_salary AS metric_score FROM salaries_history WHERE new_salary >= (SELECT MIN(new_salary) FROM salaries_history) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-068",
    "domain": "hr",
    "level": 3,
    "order": 68,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q68)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #68 - Marcus Vance (Director of Workplace Experience)]: Filter employee_benefits using an IN subquery against active ids. Return id and employee_id::text AS filtered_name where id IN (SELECT id FROM employee_benefits WHERE id >= 4) ORDER BY id ASC LIMIT 78;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, employee_id::text AS filtered_name FROM employee_benefits WHERE id IN (SELECT id FROM employee_benefits WHERE id >= 4) ORDER BY id ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-069",
    "domain": "hr",
    "level": 3,
    "order": 69,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q69)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #69 - Maya Thorne (VP of People Operations)]: Classify entries in performance_reviews. Select id, employee_id::text AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from performance_reviews ORDER BY id ASC LIMIT 79;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM performance_reviews ORDER BY id ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-070",
    "domain": "hr",
    "level": 3,
    "order": 70,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q70)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #70 - David Kim (Director of Talent Acquisition)]: Combine registry names from leave_requests and employee_benefits. Select leave_type::text AS entity_name, 'Primary Stream' AS source_tier from leave_requests WHERE leave_type IS NOT NULL AND id <= 100 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier from employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 80;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT leave_type::text AS entity_name, 'Primary Stream' AS source_tier FROM leave_requests WHERE leave_type IS NOT NULL AND id <= 100 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier FROM employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-071",
    "domain": "hr",
    "level": 3,
    "order": 71,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q71)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #71 - Alicia Gomez (Head of Compensation & Total Rewards)]: Verify relational existence in attendance_logs. Return t.id and t.work_mode AS confirmed_item WHERE EXISTS (SELECT 1 FROM attendance_logs sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 81;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.work_mode AS confirmed_item FROM attendance_logs t WHERE EXISTS (SELECT 1 FROM attendance_logs sub WHERE sub.id = t.id AND sub.id >= 2) ORDER BY t.id ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-072",
    "domain": "hr",
    "level": 3,
    "order": 72,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in employee_trainings (Q72)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #72 - Marcus Vance (Director of Workplace Experience)]: Query derived table from employee_trainings. Project dt.id, dt.status AS derived_name, and dt.score from inline derived table where id >= 3 ordered by score DESC LIMIT 82;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "status",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.status AS derived_name, dt.score FROM (SELECT id, status, score AS score FROM employee_trainings WHERE id >= 3) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-073",
    "domain": "hr",
    "level": 3,
    "order": 73,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in job_roles (Q73)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #73 - Maya Thorne (VP of People Operations)]: Isolate records in job_roles. Select id, job_title AS item_title, and min_salary AS metric_score where min_salary >= (SELECT MIN(min_salary) FROM job_roles) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 83;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(min_salary)"
    ],
    "reference_sql": "SELECT id, job_title AS item_title, min_salary AS metric_score FROM job_roles WHERE min_salary >= (SELECT MIN(min_salary) FROM job_roles) AND id >= 4 ORDER BY metric_score DESC, id ASC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-074",
    "domain": "hr",
    "level": 3,
    "order": 74,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q74)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #74 - David Kim (Director of Talent Acquisition)]: Filter employees using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM employees WHERE id >= 5) ORDER BY id ASC LIMIT 84;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM employees WHERE id IN (SELECT id FROM employees WHERE id >= 5) ORDER BY id ASC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-075",
    "domain": "hr",
    "level": 3,
    "order": 75,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q75)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #75 - Alicia Gomez (Head of Compensation & Total Rewards)]: Classify entries in salaries_history. Select id, change_reason AS entry_title, and CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from salaries_history ORDER BY id ASC LIMIT 85;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, change_reason AS entry_title, CASE WHEN id >= 10 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM salaries_history ORDER BY id ASC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-076",
    "domain": "hr",
    "level": 3,
    "order": 76,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q76)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #76 - Marcus Vance (Director of Workplace Experience)]: Combine registry names from employee_benefits and departments. Select employee_id::text::text AS entity_name, 'Primary Stream' AS source_tier from employee_benefits WHERE employee_id::text IS NOT NULL AND id <= 106 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 86;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT employee_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM employee_benefits WHERE employee_id::text IS NOT NULL AND id <= 106 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-077",
    "domain": "hr",
    "level": 3,
    "order": 77,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q77)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #77 - Maya Thorne (VP of People Operations)]: Verify relational existence in performance_reviews. Return t.id and t.employee_id::text AS confirmed_item WHERE EXISTS (SELECT 1 FROM performance_reviews sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 87;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.employee_id::text AS confirmed_item FROM performance_reviews t WHERE EXISTS (SELECT 1 FROM performance_reviews sub WHERE sub.id = t.id AND sub.id >= 3) ORDER BY t.id ASC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-078",
    "domain": "hr",
    "level": 3,
    "order": 78,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in leave_requests (Q78)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #78 - David Kim (Director of Talent Acquisition)]: Query derived table from leave_requests. Project dt.id, dt.leave_type AS derived_name, and dt.score from inline derived table where id >= 4 ordered by score DESC LIMIT 88;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "leave_type",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.leave_type AS derived_name, dt.score FROM (SELECT id, leave_type, total_days AS score FROM leave_requests WHERE id >= 4) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-079",
    "domain": "hr",
    "level": 3,
    "order": 79,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in attendance_logs (Q79)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #79 - Alicia Gomez (Head of Compensation & Total Rewards)]: Isolate records in attendance_logs. Select id, work_mode AS item_title, and hours_worked AS metric_score where hours_worked >= (SELECT MIN(hours_worked) FROM attendance_logs) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 89;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(hours_worked)"
    ],
    "reference_sql": "SELECT id, work_mode AS item_title, hours_worked AS metric_score FROM attendance_logs WHERE hours_worked >= (SELECT MIN(hours_worked) FROM attendance_logs) AND id >= 5 ORDER BY metric_score DESC, id ASC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-080",
    "domain": "hr",
    "level": 3,
    "order": 80,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q80)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #80 - Marcus Vance (Director of Workplace Experience)]: Filter employee_trainings using an IN subquery against active ids. Return id and status AS filtered_name where id IN (SELECT id FROM employee_trainings WHERE id >= 1) ORDER BY id ASC LIMIT 90;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, status AS filtered_name FROM employee_trainings WHERE id IN (SELECT id FROM employee_trainings WHERE id >= 1) ORDER BY id ASC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-081",
    "domain": "hr",
    "level": 3,
    "order": 81,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q81)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #81 - Maya Thorne (VP of People Operations)]: Classify entries in job_roles. Select id, job_title AS entry_title, and CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from job_roles ORDER BY id ASC LIMIT 91;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, job_title AS entry_title, CASE WHEN id >= 16 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM job_roles ORDER BY id ASC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-082",
    "domain": "hr",
    "level": 3,
    "order": 82,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q82)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #82 - David Kim (Director of Talent Acquisition)]: Combine registry names from employees and employee_benefits. Select name::text AS entity_name, 'Primary Stream' AS source_tier from employees WHERE name IS NOT NULL AND id <= 112 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier from employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 92;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT name::text AS entity_name, 'Primary Stream' AS source_tier FROM employees WHERE name IS NOT NULL AND id <= 112 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier FROM employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-083",
    "domain": "hr",
    "level": 3,
    "order": 83,
    "difficulty": "challenging",
    "title": "Relational Verification with EXISTS (Q83)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #83 - Alicia Gomez (Head of Compensation & Total Rewards)]: Verify relational existence in salaries_history. Return t.id and t.change_reason AS confirmed_item WHERE EXISTS (SELECT 1 FROM salaries_history sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 93;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.change_reason AS confirmed_item FROM salaries_history t WHERE EXISTS (SELECT 1 FROM salaries_history sub WHERE sub.id = t.id AND sub.id >= 4) ORDER BY t.id ASC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-084",
    "domain": "hr",
    "level": 3,
    "order": 84,
    "difficulty": "challenging",
    "title": "Inline Derived Table Transformation in employee_benefits (Q84)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #84 - Marcus Vance (Director of Workplace Experience)]: Query derived table from employee_benefits. Project dt.id, dt.employee_id::text AS derived_name, and dt.score from inline derived table where id >= 5 ordered by score DESC LIMIT 94;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "text",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.employee_id::text AS derived_name, dt.score FROM (SELECT id, employee_id::text, id AS score FROM employee_benefits WHERE id >= 5) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-085",
    "domain": "hr",
    "level": 3,
    "order": 85,
    "difficulty": "challenging",
    "title": "Benchmark Segmentation with Subquery in performance_reviews (Q85)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #85 - Maya Thorne (VP of People Operations)]: Isolate records in performance_reviews. Select id, employee_id::text AS item_title, and bonus_pct AS metric_score where bonus_pct >= (SELECT MIN(bonus_pct) FROM performance_reviews) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 95;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(bonus_pct)"
    ],
    "reference_sql": "SELECT id, employee_id::text AS item_title, bonus_pct AS metric_score FROM performance_reviews WHERE bonus_pct >= (SELECT MIN(bonus_pct) FROM performance_reviews) AND id >= 1 ORDER BY metric_score DESC, id ASC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-086",
    "domain": "hr",
    "level": 3,
    "order": 86,
    "difficulty": "challenging",
    "title": "Dynamic Relation Filtering with IN Subquery (Q86)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #86 - David Kim (Director of Talent Acquisition)]: Filter leave_requests using an IN subquery against active ids. Return id and leave_type AS filtered_name where id IN (SELECT id FROM leave_requests WHERE id >= 2) ORDER BY id ASC LIMIT 96;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, leave_type AS filtered_name FROM leave_requests WHERE id IN (SELECT id FROM leave_requests WHERE id >= 2) ORDER BY id ASC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-087",
    "domain": "hr",
    "level": 3,
    "order": 87,
    "difficulty": "challenging",
    "title": "Conditional Tier Classification with CASE WHEN (Q87)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #87 - Alicia Gomez (Head of Compensation & Total Rewards)]: Classify entries in attendance_logs. Select id, work_mode AS entry_title, and CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from attendance_logs ORDER BY id ASC LIMIT 97;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, work_mode AS entry_title, CASE WHEN id >= 22 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM attendance_logs ORDER BY id ASC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-088",
    "domain": "hr",
    "level": 3,
    "order": 88,
    "difficulty": "challenging",
    "title": "Registry Integration with UNION ALL (Q88)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #88 - Marcus Vance (Director of Workplace Experience)]: Combine registry names from employee_trainings and departments. Select status::text AS entity_name, 'Primary Stream' AS source_tier from employee_trainings WHERE status IS NOT NULL AND id <= 118 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 98;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT status::text AS entity_name, 'Primary Stream' AS source_tier FROM employee_trainings WHERE status IS NOT NULL AND id <= 118 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 55,
    "estimated_minutes": 15
  },
  {
    "id": "hr-L3-089",
    "domain": "hr",
    "level": 3,
    "order": 89,
    "difficulty": "boss",
    "title": "Relational Verification with EXISTS (Q89)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #89 - Maya Thorne (VP of People Operations)]: Verify relational existence in job_roles. Return t.id and t.job_title AS confirmed_item WHERE EXISTS (SELECT 1 FROM job_roles sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 99;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.job_title AS confirmed_item FROM job_roles t WHERE EXISTS (SELECT 1 FROM job_roles sub WHERE sub.id = t.id AND sub.id >= 5) ORDER BY t.id ASC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "hr-L3-090",
    "domain": "hr",
    "level": 3,
    "order": 90,
    "difficulty": "boss",
    "title": "Inline Derived Table Transformation in employees (Q90)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #90 - David Kim (Director of Talent Acquisition)]: Query derived table from employees. Project dt.id, dt.name AS derived_name, and dt.score from inline derived table where id >= 1 ordered by score DESC LIMIT 100;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "name",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.name AS derived_name, dt.score FROM (SELECT id, name, salary AS score FROM employees WHERE id >= 1) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "hr-L3-091",
    "domain": "hr",
    "level": 3,
    "order": 91,
    "difficulty": "boss",
    "title": "Benchmark Segmentation with Subquery in salaries_history (Q91)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #91 - Alicia Gomez (Head of Compensation & Total Rewards)]: Isolate records in salaries_history. Select id, change_reason AS item_title, and new_salary AS metric_score where new_salary >= (SELECT MIN(new_salary) FROM salaries_history) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 101;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(new_salary)"
    ],
    "reference_sql": "SELECT id, change_reason AS item_title, new_salary AS metric_score FROM salaries_history WHERE new_salary >= (SELECT MIN(new_salary) FROM salaries_history) AND id >= 2 ORDER BY metric_score DESC, id ASC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "hr-L3-092",
    "domain": "hr",
    "level": 3,
    "order": 92,
    "difficulty": "boss",
    "title": "Dynamic Relation Filtering with IN Subquery (Q92)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #92 - Marcus Vance (Director of Workplace Experience)]: Filter employee_benefits using an IN subquery against active ids. Return id and employee_id::text AS filtered_name where id IN (SELECT id FROM employee_benefits WHERE id >= 3) ORDER BY id ASC LIMIT 102;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, employee_id::text AS filtered_name FROM employee_benefits WHERE id IN (SELECT id FROM employee_benefits WHERE id >= 3) ORDER BY id ASC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "hr-L3-093",
    "domain": "hr",
    "level": 3,
    "order": 93,
    "difficulty": "boss",
    "title": "Conditional Tier Classification with CASE WHEN (Q93)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #93 - Maya Thorne (VP of People Operations)]: Classify entries in performance_reviews. Select id, employee_id::text AS entry_title, and CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from performance_reviews ORDER BY id ASC LIMIT 103;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, employee_id::text AS entry_title, CASE WHEN id >= 13 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM performance_reviews ORDER BY id ASC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "hr-L3-094",
    "domain": "hr",
    "level": 3,
    "order": 94,
    "difficulty": "boss",
    "title": "Registry Integration with UNION ALL (Q94)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #94 - David Kim (Director of Talent Acquisition)]: Combine registry names from leave_requests and employee_benefits. Select leave_type::text AS entity_name, 'Primary Stream' AS source_tier from leave_requests WHERE leave_type IS NOT NULL AND id <= 124 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier from employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 104;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT leave_type::text AS entity_name, 'Primary Stream' AS source_tier FROM leave_requests WHERE leave_type IS NOT NULL AND id <= 124 UNION ALL SELECT employee_id::text::text AS entity_name, 'Secondary Stream' AS source_tier FROM employee_benefits WHERE employee_id::text IS NOT NULL ORDER BY entity_name ASC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "hr-L3-095",
    "domain": "hr",
    "level": 3,
    "order": 95,
    "difficulty": "boss",
    "title": "Relational Verification with EXISTS (Q95)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #95 - Alicia Gomez (Head of Compensation & Total Rewards)]: Verify relational existence in attendance_logs. Return t.id and t.work_mode AS confirmed_item WHERE EXISTS (SELECT 1 FROM attendance_logs sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 105;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CORRELATED SUBQUERY",
      "EXISTS",
      "SEMI-JOIN"
    ],
    "expected_columns": [
      "1"
    ],
    "reference_sql": "SELECT t.id, t.work_mode AS confirmed_item FROM attendance_logs t WHERE EXISTS (SELECT 1 FROM attendance_logs sub WHERE sub.id = t.id AND sub.id >= 1) ORDER BY t.id ASC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "hr-L3-096",
    "domain": "hr",
    "level": 3,
    "order": 96,
    "difficulty": "boss",
    "title": "Inline Derived Table Transformation in employee_trainings (Q96)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #96 - Marcus Vance (Director of Workplace Experience)]: Query derived table from employee_trainings. Project dt.id, dt.status AS derived_name, and dt.score from inline derived table where id >= 2 ordered by score DESC LIMIT 106;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "DERIVED TABLE",
      "SUBQUERY IN FROM",
      "ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "status",
      "score"
    ],
    "reference_sql": "SELECT dt.id, dt.status AS derived_name, dt.score FROM (SELECT id, status, score AS score FROM employee_trainings WHERE id >= 2) dt ORDER BY dt.score DESC, dt.id ASC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "hr-L3-097",
    "domain": "hr",
    "level": 3,
    "order": 97,
    "difficulty": "boss",
    "title": "Benchmark Segmentation with Subquery in job_roles (Q97)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #97 - Maya Thorne (VP of People Operations)]: Isolate records in job_roles. Select id, job_title AS item_title, and min_salary AS metric_score where min_salary >= (SELECT MIN(min_salary) FROM job_roles) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 107;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "MIN(min_salary)"
    ],
    "reference_sql": "SELECT id, job_title AS item_title, min_salary AS metric_score FROM job_roles WHERE min_salary >= (SELECT MIN(min_salary) FROM job_roles) AND id >= 3 ORDER BY metric_score DESC, id ASC LIMIT 107;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "hr-L3-098",
    "domain": "hr",
    "level": 3,
    "order": 98,
    "difficulty": "boss",
    "title": "Dynamic Relation Filtering with IN Subquery (Q98)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #98 - David Kim (Director of Talent Acquisition)]: Filter employees using an IN subquery against active ids. Return id and name AS filtered_name where id IN (SELECT id FROM employees WHERE id >= 4) ORDER BY id ASC LIMIT 108;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "SUBQUERY",
      "IN",
      "FILTERING"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id, name AS filtered_name FROM employees WHERE id IN (SELECT id FROM employees WHERE id >= 4) ORDER BY id ASC LIMIT 108;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "hr-L3-099",
    "domain": "hr",
    "level": 3,
    "order": 99,
    "difficulty": "boss",
    "title": "Conditional Tier Classification with CASE WHEN (Q99)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #99 - Alicia Gomez (Head of Compensation & Total Rewards)]: Classify entries in salaries_history. Select id, change_reason AS entry_title, and CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier from salaries_history ORDER BY id ASC LIMIT 109;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "CASE WHEN",
      "CONDITIONAL LOGIC",
      "CLASSIFICATION"
    ],
    "expected_columns": [
      "id",
      "entry_title",
      "status_tier"
    ],
    "reference_sql": "SELECT id, change_reason AS entry_title, CASE WHEN id >= 19 THEN 'Tier Alpha' ELSE 'Tier Beta' END AS status_tier FROM salaries_history ORDER BY id ASC LIMIT 109;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  },
  {
    "id": "hr-L3-100",
    "domain": "hr",
    "level": 3,
    "order": 100,
    "difficulty": "boss",
    "title": "Registry Integration with UNION ALL (Q100)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #100 - Marcus Vance (Director of Workplace Experience)]: Combine registry names from employee_benefits and departments. Select employee_id::text::text AS entity_name, 'Primary Stream' AS source_tier from employee_benefits WHERE employee_id::text IS NOT NULL AND id <= 130 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier from departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 110;\"",
    "context_notes": "Level 3 Advanced Subquery & Conditional Analytical Query.",
    "concepts": [
      "UNION ALL",
      "SET OPERATIONS",
      "DATA INTEGRATION"
    ],
    "expected_columns": [
      "entity_name",
      "source_tier"
    ],
    "reference_sql": "SELECT employee_id::text::text AS entity_name, 'Primary Stream' AS source_tier FROM employee_benefits WHERE employee_id::text IS NOT NULL AND id <= 130 UNION ALL SELECT name::text AS entity_name, 'Secondary Stream' AS source_tier FROM departments WHERE name IS NOT NULL ORDER BY entity_name ASC LIMIT 110;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Apply subquery or CASE logic."
    ],
    "solution_explanation": "Uses subqueries, conditional evaluation, and set logic to analyze database entities.",
    "xp": 85,
    "estimated_minutes": 22
  }
];
