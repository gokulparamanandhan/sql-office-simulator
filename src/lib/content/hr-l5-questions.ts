import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L5_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "hr-L5-001",
    "domain": "hr",
    "level": 5,
    "order": 1,
    "difficulty": "core",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q1)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #1 - Maya Thorne (VP of People Operations)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, budget AS metric_score, and NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 21;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, budget AS metric_score, NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-002",
    "domain": "hr",
    "level": 5,
    "order": 2,
    "difficulty": "core",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q2)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #2 - David Kim (Director of Talent Acquisition)]: Infrastructure Audit: Profile optimizer execution cost for queries on job_roles. Run an EXPLAIN (FORMAT JSON) on a query selecting id and min_salary from job_roles where id >= 2;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "min_salary"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, min_salary FROM job_roles WHERE id >= 2;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-003",
    "domain": "hr",
    "level": 5,
    "order": 3,
    "difficulty": "core",
    "title": "Latency Optimization with Database Index (Q3)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #3 - Alicia Gomez (Head of Compensation & Total Rewards)]: Production Ticket: Accelerate read queries on locations. Create an Index named idx_locations_perf_3 ON locations(id DESC); then select id, office_name AS indexed_label, capacity AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf_3 ON locations(id DESC); SELECT id, office_name AS indexed_label, capacity AS metric_val FROM locations WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-004",
    "domain": "hr",
    "level": 5,
    "order": 4,
    "difficulty": "core",
    "title": "Executive Reporting Layer: Virtual View (Q4)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #4 - Marcus Vance (Director of Workplace Experience)]: Create a sanitized virtual View named v_employees_summary_4 projecting id, name AS view_label, and COALESCE(salary, 0) AS safe_metric from employees WHERE id <= 34; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_employees_summary_4 AS SELECT id, name AS view_label, COALESCE(salary, 0) AS safe_metric FROM employees WHERE id <= 34; SELECT id, view_label, safe_metric FROM v_employees_summary_4 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-005",
    "domain": "hr",
    "level": 5,
    "order": 5,
    "difficulty": "core",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q5)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #5 - Maya Thorne (VP of People Operations)]: ETL Staging Ticket: Build a session table named temp_salaries_history_clean_5 ingesting id, UPPER(TRIM(change_reason::text)) AS clean_name, and new_salary AS staged_val from salaries_history WHERE change_reason IS NOT NULL AND id <= 35. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_salaries_history_clean_5 AS SELECT id, UPPER(TRIM(change_reason::text)) AS clean_name, new_salary AS staged_val FROM salaries_history WHERE change_reason IS NOT NULL AND id <= 35; SELECT id, clean_name, staged_val FROM temp_salaries_history_clean_5 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-006",
    "domain": "hr",
    "level": 5,
    "order": 6,
    "difficulty": "core",
    "title": "Transactional Automation with Stored Procedure (Q6)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #6 - David Kim (Director of Talent Acquisition)]: Automate operational routine in benefits_packages. Write Stored Procedure sp_routine_benefits_packages_6(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_benefits_packages_6(1); then select id, package_name AS confirmed_item from benefits_packages where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_benefits_packages_6(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_benefits_packages_6(1); SELECT id, package_name AS confirmed_item FROM benefits_packages WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-007",
    "domain": "hr",
    "level": 5,
    "order": 7,
    "difficulty": "core",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q7)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #7 - Alicia Gomez (Head of Compensation & Total Rewards)]: Segment records in employee_benefits into 4 quartiles. Using a CTE named cohort_analysis, project id, employee_id::text AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 27;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, employee_id::text AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM employee_benefits WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-008",
    "domain": "hr",
    "level": 5,
    "order": 8,
    "difficulty": "core",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q8)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #8 - Marcus Vance (Director of Workplace Experience)]: Infrastructure Audit: Profile optimizer execution cost for queries on performance_reviews. Run an EXPLAIN (FORMAT JSON) on a query selecting id and bonus_pct from performance_reviews where id >= 8;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "bonus_pct"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, bonus_pct FROM performance_reviews WHERE id >= 8;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-009",
    "domain": "hr",
    "level": 5,
    "order": 9,
    "difficulty": "core",
    "title": "Latency Optimization with Database Index (Q9)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #9 - Maya Thorne (VP of People Operations)]: Production Ticket: Accelerate read queries on leave_requests. Create an Index named idx_leave_requests_perf_9 ON leave_requests(id DESC); then select id, leave_type AS indexed_label, total_days AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_leave_requests_perf_9 ON leave_requests(id DESC); SELECT id, leave_type AS indexed_label, total_days AS metric_val FROM leave_requests WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-010",
    "domain": "hr",
    "level": 5,
    "order": 10,
    "difficulty": "core",
    "title": "Executive Reporting Layer: Virtual View (Q10)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #10 - David Kim (Director of Talent Acquisition)]: Create a sanitized virtual View named v_attendance_logs_summary_10 projecting id, work_mode AS view_label, and COALESCE(hours_worked, 0) AS safe_metric from attendance_logs WHERE id <= 40; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_attendance_logs_summary_10 AS SELECT id, work_mode AS view_label, COALESCE(hours_worked, 0) AS safe_metric FROM attendance_logs WHERE id <= 40; SELECT id, view_label, safe_metric FROM v_attendance_logs_summary_10 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-011",
    "domain": "hr",
    "level": 5,
    "order": 11,
    "difficulty": "core",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q11)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #11 - Alicia Gomez (Head of Compensation & Total Rewards)]: ETL Staging Ticket: Build a session table named temp_training_courses_clean_11 ingesting id, UPPER(TRIM(course_title::text)) AS clean_name, and duration_hours AS staged_val from training_courses WHERE course_title IS NOT NULL AND id <= 41. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_training_courses_clean_11 AS SELECT id, UPPER(TRIM(course_title::text)) AS clean_name, duration_hours AS staged_val FROM training_courses WHERE course_title IS NOT NULL AND id <= 41; SELECT id, clean_name, staged_val FROM temp_training_courses_clean_11 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-012",
    "domain": "hr",
    "level": 5,
    "order": 12,
    "difficulty": "core",
    "title": "Transactional Automation with Stored Procedure (Q12)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #12 - Marcus Vance (Director of Workplace Experience)]: Automate operational routine in employee_trainings. Write Stored Procedure sp_routine_employee_trainings_12(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_employee_trainings_12(1); then select id, status AS confirmed_item from employee_trainings where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_employee_trainings_12(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_employee_trainings_12(1); SELECT id, status AS confirmed_item FROM employee_trainings WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-013",
    "domain": "hr",
    "level": 5,
    "order": 13,
    "difficulty": "core",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q13)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #13 - Maya Thorne (VP of People Operations)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, budget AS metric_score, and NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 33;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, budget AS metric_score, NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-014",
    "domain": "hr",
    "level": 5,
    "order": 14,
    "difficulty": "core",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q14)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #14 - David Kim (Director of Talent Acquisition)]: Infrastructure Audit: Profile optimizer execution cost for queries on job_roles. Run an EXPLAIN (FORMAT JSON) on a query selecting id and min_salary from job_roles where id >= 14;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "min_salary"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, min_salary FROM job_roles WHERE id >= 14;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-015",
    "domain": "hr",
    "level": 5,
    "order": 15,
    "difficulty": "core",
    "title": "Latency Optimization with Database Index (Q15)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #15 - Alicia Gomez (Head of Compensation & Total Rewards)]: Production Ticket: Accelerate read queries on locations. Create an Index named idx_locations_perf_15 ON locations(id DESC); then select id, office_name AS indexed_label, capacity AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf_15 ON locations(id DESC); SELECT id, office_name AS indexed_label, capacity AS metric_val FROM locations WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hr-L5-016",
    "domain": "hr",
    "level": 5,
    "order": 16,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q16)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #16 - Marcus Vance (Director of Workplace Experience)]: Create a sanitized virtual View named v_employees_summary_16 projecting id, name AS view_label, and COALESCE(salary, 0) AS safe_metric from employees WHERE id <= 46; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_employees_summary_16 AS SELECT id, name AS view_label, COALESCE(salary, 0) AS safe_metric FROM employees WHERE id <= 46; SELECT id, view_label, safe_metric FROM v_employees_summary_16 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-017",
    "domain": "hr",
    "level": 5,
    "order": 17,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q17)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #17 - Maya Thorne (VP of People Operations)]: ETL Staging Ticket: Build a session table named temp_salaries_history_clean_17 ingesting id, UPPER(TRIM(change_reason::text)) AS clean_name, and new_salary AS staged_val from salaries_history WHERE change_reason IS NOT NULL AND id <= 47. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_salaries_history_clean_17 AS SELECT id, UPPER(TRIM(change_reason::text)) AS clean_name, new_salary AS staged_val FROM salaries_history WHERE change_reason IS NOT NULL AND id <= 47; SELECT id, clean_name, staged_val FROM temp_salaries_history_clean_17 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-018",
    "domain": "hr",
    "level": 5,
    "order": 18,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q18)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #18 - David Kim (Director of Talent Acquisition)]: Automate operational routine in benefits_packages. Write Stored Procedure sp_routine_benefits_packages_18(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_benefits_packages_18(1); then select id, package_name AS confirmed_item from benefits_packages where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_benefits_packages_18(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_benefits_packages_18(1); SELECT id, package_name AS confirmed_item FROM benefits_packages WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-019",
    "domain": "hr",
    "level": 5,
    "order": 19,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q19)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #19 - Alicia Gomez (Head of Compensation & Total Rewards)]: Segment records in employee_benefits into 4 quartiles. Using a CTE named cohort_analysis, project id, employee_id::text AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 39;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, employee_id::text AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM employee_benefits WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-020",
    "domain": "hr",
    "level": 5,
    "order": 20,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q20)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #20 - Marcus Vance (Director of Workplace Experience)]: Infrastructure Audit: Profile optimizer execution cost for queries on performance_reviews. Run an EXPLAIN (FORMAT JSON) on a query selecting id and bonus_pct from performance_reviews where id >= 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "bonus_pct"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, bonus_pct FROM performance_reviews WHERE id >= 20;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-021",
    "domain": "hr",
    "level": 5,
    "order": 21,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q21)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #21 - Maya Thorne (VP of People Operations)]: Production Ticket: Accelerate read queries on leave_requests. Create an Index named idx_leave_requests_perf_21 ON leave_requests(id DESC); then select id, leave_type AS indexed_label, total_days AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_leave_requests_perf_21 ON leave_requests(id DESC); SELECT id, leave_type AS indexed_label, total_days AS metric_val FROM leave_requests WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-022",
    "domain": "hr",
    "level": 5,
    "order": 22,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q22)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #22 - David Kim (Director of Talent Acquisition)]: Create a sanitized virtual View named v_attendance_logs_summary_22 projecting id, work_mode AS view_label, and COALESCE(hours_worked, 0) AS safe_metric from attendance_logs WHERE id <= 52; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_attendance_logs_summary_22 AS SELECT id, work_mode AS view_label, COALESCE(hours_worked, 0) AS safe_metric FROM attendance_logs WHERE id <= 52; SELECT id, view_label, safe_metric FROM v_attendance_logs_summary_22 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-023",
    "domain": "hr",
    "level": 5,
    "order": 23,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q23)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #23 - Alicia Gomez (Head of Compensation & Total Rewards)]: ETL Staging Ticket: Build a session table named temp_training_courses_clean_23 ingesting id, UPPER(TRIM(course_title::text)) AS clean_name, and duration_hours AS staged_val from training_courses WHERE course_title IS NOT NULL AND id <= 53. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_training_courses_clean_23 AS SELECT id, UPPER(TRIM(course_title::text)) AS clean_name, duration_hours AS staged_val FROM training_courses WHERE course_title IS NOT NULL AND id <= 53; SELECT id, clean_name, staged_val FROM temp_training_courses_clean_23 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-024",
    "domain": "hr",
    "level": 5,
    "order": 24,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q24)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #24 - Marcus Vance (Director of Workplace Experience)]: Automate operational routine in employee_trainings. Write Stored Procedure sp_routine_employee_trainings_24(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_employee_trainings_24(1); then select id, status AS confirmed_item from employee_trainings where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_employee_trainings_24(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_employee_trainings_24(1); SELECT id, status AS confirmed_item FROM employee_trainings WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-025",
    "domain": "hr",
    "level": 5,
    "order": 25,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q25)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #25 - Maya Thorne (VP of People Operations)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, budget AS metric_score, and NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 45;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, budget AS metric_score, NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-026",
    "domain": "hr",
    "level": 5,
    "order": 26,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q26)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #26 - David Kim (Director of Talent Acquisition)]: Infrastructure Audit: Profile optimizer execution cost for queries on job_roles. Run an EXPLAIN (FORMAT JSON) on a query selecting id and min_salary from job_roles where id >= 26;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "min_salary"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, min_salary FROM job_roles WHERE id >= 26;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-027",
    "domain": "hr",
    "level": 5,
    "order": 27,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q27)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #27 - Alicia Gomez (Head of Compensation & Total Rewards)]: Production Ticket: Accelerate read queries on locations. Create an Index named idx_locations_perf_27 ON locations(id DESC); then select id, office_name AS indexed_label, capacity AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf_27 ON locations(id DESC); SELECT id, office_name AS indexed_label, capacity AS metric_val FROM locations WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-028",
    "domain": "hr",
    "level": 5,
    "order": 28,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q28)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #28 - Marcus Vance (Director of Workplace Experience)]: Create a sanitized virtual View named v_employees_summary_28 projecting id, name AS view_label, and COALESCE(salary, 0) AS safe_metric from employees WHERE id <= 58; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_employees_summary_28 AS SELECT id, name AS view_label, COALESCE(salary, 0) AS safe_metric FROM employees WHERE id <= 58; SELECT id, view_label, safe_metric FROM v_employees_summary_28 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-029",
    "domain": "hr",
    "level": 5,
    "order": 29,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q29)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #29 - Maya Thorne (VP of People Operations)]: ETL Staging Ticket: Build a session table named temp_salaries_history_clean_29 ingesting id, UPPER(TRIM(change_reason::text)) AS clean_name, and new_salary AS staged_val from salaries_history WHERE change_reason IS NOT NULL AND id <= 59. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_salaries_history_clean_29 AS SELECT id, UPPER(TRIM(change_reason::text)) AS clean_name, new_salary AS staged_val FROM salaries_history WHERE change_reason IS NOT NULL AND id <= 59; SELECT id, clean_name, staged_val FROM temp_salaries_history_clean_29 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-030",
    "domain": "hr",
    "level": 5,
    "order": 30,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q30)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #30 - David Kim (Director of Talent Acquisition)]: Automate operational routine in benefits_packages. Write Stored Procedure sp_routine_benefits_packages_30(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_benefits_packages_30(1); then select id, package_name AS confirmed_item from benefits_packages where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_benefits_packages_30(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_benefits_packages_30(1); SELECT id, package_name AS confirmed_item FROM benefits_packages WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-031",
    "domain": "hr",
    "level": 5,
    "order": 31,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q31)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #31 - Alicia Gomez (Head of Compensation & Total Rewards)]: Segment records in employee_benefits into 4 quartiles. Using a CTE named cohort_analysis, project id, employee_id::text AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 51;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, employee_id::text AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM employee_benefits WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-032",
    "domain": "hr",
    "level": 5,
    "order": 32,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q32)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #32 - Marcus Vance (Director of Workplace Experience)]: Infrastructure Audit: Profile optimizer execution cost for queries on performance_reviews. Run an EXPLAIN (FORMAT JSON) on a query selecting id and bonus_pct from performance_reviews where id >= 32;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "bonus_pct"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, bonus_pct FROM performance_reviews WHERE id >= 32;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-033",
    "domain": "hr",
    "level": 5,
    "order": 33,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q33)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #33 - Maya Thorne (VP of People Operations)]: Production Ticket: Accelerate read queries on leave_requests. Create an Index named idx_leave_requests_perf_33 ON leave_requests(id DESC); then select id, leave_type AS indexed_label, total_days AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_leave_requests_perf_33 ON leave_requests(id DESC); SELECT id, leave_type AS indexed_label, total_days AS metric_val FROM leave_requests WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-034",
    "domain": "hr",
    "level": 5,
    "order": 34,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q34)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #34 - David Kim (Director of Talent Acquisition)]: Create a sanitized virtual View named v_attendance_logs_summary_34 projecting id, work_mode AS view_label, and COALESCE(hours_worked, 0) AS safe_metric from attendance_logs WHERE id <= 64; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_attendance_logs_summary_34 AS SELECT id, work_mode AS view_label, COALESCE(hours_worked, 0) AS safe_metric FROM attendance_logs WHERE id <= 64; SELECT id, view_label, safe_metric FROM v_attendance_logs_summary_34 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-035",
    "domain": "hr",
    "level": 5,
    "order": 35,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q35)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #35 - Alicia Gomez (Head of Compensation & Total Rewards)]: ETL Staging Ticket: Build a session table named temp_training_courses_clean_35 ingesting id, UPPER(TRIM(course_title::text)) AS clean_name, and duration_hours AS staged_val from training_courses WHERE course_title IS NOT NULL AND id <= 65. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_training_courses_clean_35 AS SELECT id, UPPER(TRIM(course_title::text)) AS clean_name, duration_hours AS staged_val FROM training_courses WHERE course_title IS NOT NULL AND id <= 65; SELECT id, clean_name, staged_val FROM temp_training_courses_clean_35 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-036",
    "domain": "hr",
    "level": 5,
    "order": 36,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q36)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #36 - Marcus Vance (Director of Workplace Experience)]: Automate operational routine in employee_trainings. Write Stored Procedure sp_routine_employee_trainings_36(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_employee_trainings_36(1); then select id, status AS confirmed_item from employee_trainings where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_employee_trainings_36(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_employee_trainings_36(1); SELECT id, status AS confirmed_item FROM employee_trainings WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-037",
    "domain": "hr",
    "level": 5,
    "order": 37,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q37)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #37 - Maya Thorne (VP of People Operations)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, budget AS metric_score, and NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 57;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, budget AS metric_score, NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-038",
    "domain": "hr",
    "level": 5,
    "order": 38,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q38)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #38 - David Kim (Director of Talent Acquisition)]: Infrastructure Audit: Profile optimizer execution cost for queries on job_roles. Run an EXPLAIN (FORMAT JSON) on a query selecting id and min_salary from job_roles where id >= 38;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "min_salary"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, min_salary FROM job_roles WHERE id >= 38;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-039",
    "domain": "hr",
    "level": 5,
    "order": 39,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q39)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #39 - Alicia Gomez (Head of Compensation & Total Rewards)]: Production Ticket: Accelerate read queries on locations. Create an Index named idx_locations_perf_39 ON locations(id DESC); then select id, office_name AS indexed_label, capacity AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf_39 ON locations(id DESC); SELECT id, office_name AS indexed_label, capacity AS metric_val FROM locations WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-040",
    "domain": "hr",
    "level": 5,
    "order": 40,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q40)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #40 - Marcus Vance (Director of Workplace Experience)]: Create a sanitized virtual View named v_employees_summary_40 projecting id, name AS view_label, and COALESCE(salary, 0) AS safe_metric from employees WHERE id <= 70; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_employees_summary_40 AS SELECT id, name AS view_label, COALESCE(salary, 0) AS safe_metric FROM employees WHERE id <= 70; SELECT id, view_label, safe_metric FROM v_employees_summary_40 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-041",
    "domain": "hr",
    "level": 5,
    "order": 41,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q41)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #41 - Maya Thorne (VP of People Operations)]: ETL Staging Ticket: Build a session table named temp_salaries_history_clean_41 ingesting id, UPPER(TRIM(change_reason::text)) AS clean_name, and new_salary AS staged_val from salaries_history WHERE change_reason IS NOT NULL AND id <= 71. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_salaries_history_clean_41 AS SELECT id, UPPER(TRIM(change_reason::text)) AS clean_name, new_salary AS staged_val FROM salaries_history WHERE change_reason IS NOT NULL AND id <= 71; SELECT id, clean_name, staged_val FROM temp_salaries_history_clean_41 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-042",
    "domain": "hr",
    "level": 5,
    "order": 42,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q42)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #42 - David Kim (Director of Talent Acquisition)]: Automate operational routine in benefits_packages. Write Stored Procedure sp_routine_benefits_packages_42(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_benefits_packages_42(1); then select id, package_name AS confirmed_item from benefits_packages where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_benefits_packages_42(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_benefits_packages_42(1); SELECT id, package_name AS confirmed_item FROM benefits_packages WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-043",
    "domain": "hr",
    "level": 5,
    "order": 43,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q43)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #43 - Alicia Gomez (Head of Compensation & Total Rewards)]: Segment records in employee_benefits into 4 quartiles. Using a CTE named cohort_analysis, project id, employee_id::text AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 63;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, employee_id::text AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM employee_benefits WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-044",
    "domain": "hr",
    "level": 5,
    "order": 44,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q44)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #44 - Marcus Vance (Director of Workplace Experience)]: Infrastructure Audit: Profile optimizer execution cost for queries on performance_reviews. Run an EXPLAIN (FORMAT JSON) on a query selecting id and bonus_pct from performance_reviews where id >= 44;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "bonus_pct"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, bonus_pct FROM performance_reviews WHERE id >= 44;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-045",
    "domain": "hr",
    "level": 5,
    "order": 45,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q45)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #45 - Maya Thorne (VP of People Operations)]: Production Ticket: Accelerate read queries on leave_requests. Create an Index named idx_leave_requests_perf_45 ON leave_requests(id DESC); then select id, leave_type AS indexed_label, total_days AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_leave_requests_perf_45 ON leave_requests(id DESC); SELECT id, leave_type AS indexed_label, total_days AS metric_val FROM leave_requests WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-046",
    "domain": "hr",
    "level": 5,
    "order": 46,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q46)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #46 - David Kim (Director of Talent Acquisition)]: Create a sanitized virtual View named v_attendance_logs_summary_46 projecting id, work_mode AS view_label, and COALESCE(hours_worked, 0) AS safe_metric from attendance_logs WHERE id <= 76; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_attendance_logs_summary_46 AS SELECT id, work_mode AS view_label, COALESCE(hours_worked, 0) AS safe_metric FROM attendance_logs WHERE id <= 76; SELECT id, view_label, safe_metric FROM v_attendance_logs_summary_46 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-047",
    "domain": "hr",
    "level": 5,
    "order": 47,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q47)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #47 - Alicia Gomez (Head of Compensation & Total Rewards)]: ETL Staging Ticket: Build a session table named temp_training_courses_clean_47 ingesting id, UPPER(TRIM(course_title::text)) AS clean_name, and duration_hours AS staged_val from training_courses WHERE course_title IS NOT NULL AND id <= 77. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_training_courses_clean_47 AS SELECT id, UPPER(TRIM(course_title::text)) AS clean_name, duration_hours AS staged_val FROM training_courses WHERE course_title IS NOT NULL AND id <= 77; SELECT id, clean_name, staged_val FROM temp_training_courses_clean_47 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-048",
    "domain": "hr",
    "level": 5,
    "order": 48,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q48)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #48 - Marcus Vance (Director of Workplace Experience)]: Automate operational routine in employee_trainings. Write Stored Procedure sp_routine_employee_trainings_48(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_employee_trainings_48(1); then select id, status AS confirmed_item from employee_trainings where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_employee_trainings_48(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_employee_trainings_48(1); SELECT id, status AS confirmed_item FROM employee_trainings WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-049",
    "domain": "hr",
    "level": 5,
    "order": 49,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q49)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #49 - Maya Thorne (VP of People Operations)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, budget AS metric_score, and NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 69;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, budget AS metric_score, NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-050",
    "domain": "hr",
    "level": 5,
    "order": 50,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q50)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #50 - David Kim (Director of Talent Acquisition)]: Infrastructure Audit: Profile optimizer execution cost for queries on job_roles. Run an EXPLAIN (FORMAT JSON) on a query selecting id and min_salary from job_roles where id >= 50;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "min_salary"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, min_salary FROM job_roles WHERE id >= 50;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-051",
    "domain": "hr",
    "level": 5,
    "order": 51,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q51)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #51 - Alicia Gomez (Head of Compensation & Total Rewards)]: Production Ticket: Accelerate read queries on locations. Create an Index named idx_locations_perf_51 ON locations(id DESC); then select id, office_name AS indexed_label, capacity AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf_51 ON locations(id DESC); SELECT id, office_name AS indexed_label, capacity AS metric_val FROM locations WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-052",
    "domain": "hr",
    "level": 5,
    "order": 52,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q52)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #52 - Marcus Vance (Director of Workplace Experience)]: Create a sanitized virtual View named v_employees_summary_52 projecting id, name AS view_label, and COALESCE(salary, 0) AS safe_metric from employees WHERE id <= 82; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_employees_summary_52 AS SELECT id, name AS view_label, COALESCE(salary, 0) AS safe_metric FROM employees WHERE id <= 82; SELECT id, view_label, safe_metric FROM v_employees_summary_52 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-053",
    "domain": "hr",
    "level": 5,
    "order": 53,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q53)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #53 - Maya Thorne (VP of People Operations)]: ETL Staging Ticket: Build a session table named temp_salaries_history_clean_53 ingesting id, UPPER(TRIM(change_reason::text)) AS clean_name, and new_salary AS staged_val from salaries_history WHERE change_reason IS NOT NULL AND id <= 83. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_salaries_history_clean_53 AS SELECT id, UPPER(TRIM(change_reason::text)) AS clean_name, new_salary AS staged_val FROM salaries_history WHERE change_reason IS NOT NULL AND id <= 83; SELECT id, clean_name, staged_val FROM temp_salaries_history_clean_53 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-054",
    "domain": "hr",
    "level": 5,
    "order": 54,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q54)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #54 - David Kim (Director of Talent Acquisition)]: Automate operational routine in benefits_packages. Write Stored Procedure sp_routine_benefits_packages_54(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_benefits_packages_54(1); then select id, package_name AS confirmed_item from benefits_packages where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_benefits_packages_54(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_benefits_packages_54(1); SELECT id, package_name AS confirmed_item FROM benefits_packages WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-055",
    "domain": "hr",
    "level": 5,
    "order": 55,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q55)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #55 - Alicia Gomez (Head of Compensation & Total Rewards)]: Segment records in employee_benefits into 4 quartiles. Using a CTE named cohort_analysis, project id, employee_id::text AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 75;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, employee_id::text AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM employee_benefits WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-056",
    "domain": "hr",
    "level": 5,
    "order": 56,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q56)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #56 - Marcus Vance (Director of Workplace Experience)]: Infrastructure Audit: Profile optimizer execution cost for queries on performance_reviews. Run an EXPLAIN (FORMAT JSON) on a query selecting id and bonus_pct from performance_reviews where id >= 56;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "bonus_pct"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, bonus_pct FROM performance_reviews WHERE id >= 56;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-057",
    "domain": "hr",
    "level": 5,
    "order": 57,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q57)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #57 - Maya Thorne (VP of People Operations)]: Production Ticket: Accelerate read queries on leave_requests. Create an Index named idx_leave_requests_perf_57 ON leave_requests(id DESC); then select id, leave_type AS indexed_label, total_days AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_leave_requests_perf_57 ON leave_requests(id DESC); SELECT id, leave_type AS indexed_label, total_days AS metric_val FROM leave_requests WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-058",
    "domain": "hr",
    "level": 5,
    "order": 58,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q58)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #58 - David Kim (Director of Talent Acquisition)]: Create a sanitized virtual View named v_attendance_logs_summary_58 projecting id, work_mode AS view_label, and COALESCE(hours_worked, 0) AS safe_metric from attendance_logs WHERE id <= 88; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_attendance_logs_summary_58 AS SELECT id, work_mode AS view_label, COALESCE(hours_worked, 0) AS safe_metric FROM attendance_logs WHERE id <= 88; SELECT id, view_label, safe_metric FROM v_attendance_logs_summary_58 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-059",
    "domain": "hr",
    "level": 5,
    "order": 59,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q59)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #59 - Alicia Gomez (Head of Compensation & Total Rewards)]: ETL Staging Ticket: Build a session table named temp_training_courses_clean_59 ingesting id, UPPER(TRIM(course_title::text)) AS clean_name, and duration_hours AS staged_val from training_courses WHERE course_title IS NOT NULL AND id <= 89. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_training_courses_clean_59 AS SELECT id, UPPER(TRIM(course_title::text)) AS clean_name, duration_hours AS staged_val FROM training_courses WHERE course_title IS NOT NULL AND id <= 89; SELECT id, clean_name, staged_val FROM temp_training_courses_clean_59 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-060",
    "domain": "hr",
    "level": 5,
    "order": 60,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q60)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #60 - Marcus Vance (Director of Workplace Experience)]: Automate operational routine in employee_trainings. Write Stored Procedure sp_routine_employee_trainings_60(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_employee_trainings_60(1); then select id, status AS confirmed_item from employee_trainings where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_employee_trainings_60(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_employee_trainings_60(1); SELECT id, status AS confirmed_item FROM employee_trainings WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-061",
    "domain": "hr",
    "level": 5,
    "order": 61,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q61)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #61 - Maya Thorne (VP of People Operations)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, budget AS metric_score, and NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 81;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, budget AS metric_score, NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-062",
    "domain": "hr",
    "level": 5,
    "order": 62,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q62)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #62 - David Kim (Director of Talent Acquisition)]: Infrastructure Audit: Profile optimizer execution cost for queries on job_roles. Run an EXPLAIN (FORMAT JSON) on a query selecting id and min_salary from job_roles where id >= 62;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "min_salary"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, min_salary FROM job_roles WHERE id >= 62;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-063",
    "domain": "hr",
    "level": 5,
    "order": 63,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q63)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #63 - Alicia Gomez (Head of Compensation & Total Rewards)]: Production Ticket: Accelerate read queries on locations. Create an Index named idx_locations_perf_63 ON locations(id DESC); then select id, office_name AS indexed_label, capacity AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf_63 ON locations(id DESC); SELECT id, office_name AS indexed_label, capacity AS metric_val FROM locations WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-064",
    "domain": "hr",
    "level": 5,
    "order": 64,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q64)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #64 - Marcus Vance (Director of Workplace Experience)]: Create a sanitized virtual View named v_employees_summary_64 projecting id, name AS view_label, and COALESCE(salary, 0) AS safe_metric from employees WHERE id <= 94; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_employees_summary_64 AS SELECT id, name AS view_label, COALESCE(salary, 0) AS safe_metric FROM employees WHERE id <= 94; SELECT id, view_label, safe_metric FROM v_employees_summary_64 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-065",
    "domain": "hr",
    "level": 5,
    "order": 65,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q65)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #65 - Maya Thorne (VP of People Operations)]: ETL Staging Ticket: Build a session table named temp_salaries_history_clean_65 ingesting id, UPPER(TRIM(change_reason::text)) AS clean_name, and new_salary AS staged_val from salaries_history WHERE change_reason IS NOT NULL AND id <= 95. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_salaries_history_clean_65 AS SELECT id, UPPER(TRIM(change_reason::text)) AS clean_name, new_salary AS staged_val FROM salaries_history WHERE change_reason IS NOT NULL AND id <= 95; SELECT id, clean_name, staged_val FROM temp_salaries_history_clean_65 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-066",
    "domain": "hr",
    "level": 5,
    "order": 66,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q66)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #66 - David Kim (Director of Talent Acquisition)]: Automate operational routine in benefits_packages. Write Stored Procedure sp_routine_benefits_packages_66(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_benefits_packages_66(1); then select id, package_name AS confirmed_item from benefits_packages where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_benefits_packages_66(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_benefits_packages_66(1); SELECT id, package_name AS confirmed_item FROM benefits_packages WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-067",
    "domain": "hr",
    "level": 5,
    "order": 67,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q67)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #67 - Alicia Gomez (Head of Compensation & Total Rewards)]: Segment records in employee_benefits into 4 quartiles. Using a CTE named cohort_analysis, project id, employee_id::text AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 87;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, employee_id::text AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM employee_benefits WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-068",
    "domain": "hr",
    "level": 5,
    "order": 68,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q68)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #68 - Marcus Vance (Director of Workplace Experience)]: Infrastructure Audit: Profile optimizer execution cost for queries on performance_reviews. Run an EXPLAIN (FORMAT JSON) on a query selecting id and bonus_pct from performance_reviews where id >= 68;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "bonus_pct"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, bonus_pct FROM performance_reviews WHERE id >= 68;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-069",
    "domain": "hr",
    "level": 5,
    "order": 69,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q69)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #69 - Maya Thorne (VP of People Operations)]: Production Ticket: Accelerate read queries on leave_requests. Create an Index named idx_leave_requests_perf_69 ON leave_requests(id DESC); then select id, leave_type AS indexed_label, total_days AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_leave_requests_perf_69 ON leave_requests(id DESC); SELECT id, leave_type AS indexed_label, total_days AS metric_val FROM leave_requests WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-070",
    "domain": "hr",
    "level": 5,
    "order": 70,
    "difficulty": "challenging",
    "title": "Executive Reporting Layer: Virtual View (Q70)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #70 - David Kim (Director of Talent Acquisition)]: Create a sanitized virtual View named v_attendance_logs_summary_70 projecting id, work_mode AS view_label, and COALESCE(hours_worked, 0) AS safe_metric from attendance_logs WHERE id <= 100; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_attendance_logs_summary_70 AS SELECT id, work_mode AS view_label, COALESCE(hours_worked, 0) AS safe_metric FROM attendance_logs WHERE id <= 100; SELECT id, view_label, safe_metric FROM v_attendance_logs_summary_70 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-071",
    "domain": "hr",
    "level": 5,
    "order": 71,
    "difficulty": "challenging",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q71)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #71 - Alicia Gomez (Head of Compensation & Total Rewards)]: ETL Staging Ticket: Build a session table named temp_training_courses_clean_71 ingesting id, UPPER(TRIM(course_title::text)) AS clean_name, and duration_hours AS staged_val from training_courses WHERE course_title IS NOT NULL AND id <= 101. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_training_courses_clean_71 AS SELECT id, UPPER(TRIM(course_title::text)) AS clean_name, duration_hours AS staged_val FROM training_courses WHERE course_title IS NOT NULL AND id <= 101; SELECT id, clean_name, staged_val FROM temp_training_courses_clean_71 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-072",
    "domain": "hr",
    "level": 5,
    "order": 72,
    "difficulty": "challenging",
    "title": "Transactional Automation with Stored Procedure (Q72)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #72 - Marcus Vance (Director of Workplace Experience)]: Automate operational routine in employee_trainings. Write Stored Procedure sp_routine_employee_trainings_72(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_employee_trainings_72(1); then select id, status AS confirmed_item from employee_trainings where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_employee_trainings_72(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_employee_trainings_72(1); SELECT id, status AS confirmed_item FROM employee_trainings WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-073",
    "domain": "hr",
    "level": 5,
    "order": 73,
    "difficulty": "challenging",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q73)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #73 - Maya Thorne (VP of People Operations)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, budget AS metric_score, and NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 93;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, budget AS metric_score, NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-074",
    "domain": "hr",
    "level": 5,
    "order": 74,
    "difficulty": "challenging",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q74)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #74 - David Kim (Director of Talent Acquisition)]: Infrastructure Audit: Profile optimizer execution cost for queries on job_roles. Run an EXPLAIN (FORMAT JSON) on a query selecting id and min_salary from job_roles where id >= 74;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "min_salary"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, min_salary FROM job_roles WHERE id >= 74;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-075",
    "domain": "hr",
    "level": 5,
    "order": 75,
    "difficulty": "challenging",
    "title": "Latency Optimization with Database Index (Q75)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #75 - Alicia Gomez (Head of Compensation & Total Rewards)]: Production Ticket: Accelerate read queries on locations. Create an Index named idx_locations_perf_75 ON locations(id DESC); then select id, office_name AS indexed_label, capacity AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf_75 ON locations(id DESC); SELECT id, office_name AS indexed_label, capacity AS metric_val FROM locations WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 65,
    "estimated_minutes": 16
  },
  {
    "id": "hr-L5-076",
    "domain": "hr",
    "level": 5,
    "order": 76,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q76)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #76 - Marcus Vance (Director of Workplace Experience)]: Create a sanitized virtual View named v_employees_summary_76 projecting id, name AS view_label, and COALESCE(salary, 0) AS safe_metric from employees WHERE id <= 106; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_employees_summary_76 AS SELECT id, name AS view_label, COALESCE(salary, 0) AS safe_metric FROM employees WHERE id <= 106; SELECT id, view_label, safe_metric FROM v_employees_summary_76 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-077",
    "domain": "hr",
    "level": 5,
    "order": 77,
    "difficulty": "boss",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q77)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #77 - Maya Thorne (VP of People Operations)]: ETL Staging Ticket: Build a session table named temp_salaries_history_clean_77 ingesting id, UPPER(TRIM(change_reason::text)) AS clean_name, and new_salary AS staged_val from salaries_history WHERE change_reason IS NOT NULL AND id <= 107. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_salaries_history_clean_77 AS SELECT id, UPPER(TRIM(change_reason::text)) AS clean_name, new_salary AS staged_val FROM salaries_history WHERE change_reason IS NOT NULL AND id <= 107; SELECT id, clean_name, staged_val FROM temp_salaries_history_clean_77 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-078",
    "domain": "hr",
    "level": 5,
    "order": 78,
    "difficulty": "boss",
    "title": "Transactional Automation with Stored Procedure (Q78)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #78 - David Kim (Director of Talent Acquisition)]: Automate operational routine in benefits_packages. Write Stored Procedure sp_routine_benefits_packages_78(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_benefits_packages_78(1); then select id, package_name AS confirmed_item from benefits_packages where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_benefits_packages_78(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_benefits_packages_78(1); SELECT id, package_name AS confirmed_item FROM benefits_packages WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-079",
    "domain": "hr",
    "level": 5,
    "order": 79,
    "difficulty": "boss",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q79)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #79 - Alicia Gomez (Head of Compensation & Total Rewards)]: Segment records in employee_benefits into 4 quartiles. Using a CTE named cohort_analysis, project id, employee_id::text AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 99;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, employee_id::text AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM employee_benefits WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-080",
    "domain": "hr",
    "level": 5,
    "order": 80,
    "difficulty": "boss",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q80)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #80 - Marcus Vance (Director of Workplace Experience)]: Infrastructure Audit: Profile optimizer execution cost for queries on performance_reviews. Run an EXPLAIN (FORMAT JSON) on a query selecting id and bonus_pct from performance_reviews where id >= 80;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "bonus_pct"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, bonus_pct FROM performance_reviews WHERE id >= 80;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-081",
    "domain": "hr",
    "level": 5,
    "order": 81,
    "difficulty": "boss",
    "title": "Latency Optimization with Database Index (Q81)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #81 - Maya Thorne (VP of People Operations)]: Production Ticket: Accelerate read queries on leave_requests. Create an Index named idx_leave_requests_perf_81 ON leave_requests(id DESC); then select id, leave_type AS indexed_label, total_days AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_leave_requests_perf_81 ON leave_requests(id DESC); SELECT id, leave_type AS indexed_label, total_days AS metric_val FROM leave_requests WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-082",
    "domain": "hr",
    "level": 5,
    "order": 82,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q82)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #82 - David Kim (Director of Talent Acquisition)]: Create a sanitized virtual View named v_attendance_logs_summary_82 projecting id, work_mode AS view_label, and COALESCE(hours_worked, 0) AS safe_metric from attendance_logs WHERE id <= 112; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_attendance_logs_summary_82 AS SELECT id, work_mode AS view_label, COALESCE(hours_worked, 0) AS safe_metric FROM attendance_logs WHERE id <= 112; SELECT id, view_label, safe_metric FROM v_attendance_logs_summary_82 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-083",
    "domain": "hr",
    "level": 5,
    "order": 83,
    "difficulty": "boss",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q83)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #83 - Alicia Gomez (Head of Compensation & Total Rewards)]: ETL Staging Ticket: Build a session table named temp_training_courses_clean_83 ingesting id, UPPER(TRIM(course_title::text)) AS clean_name, and duration_hours AS staged_val from training_courses WHERE course_title IS NOT NULL AND id <= 113. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_training_courses_clean_83 AS SELECT id, UPPER(TRIM(course_title::text)) AS clean_name, duration_hours AS staged_val FROM training_courses WHERE course_title IS NOT NULL AND id <= 113; SELECT id, clean_name, staged_val FROM temp_training_courses_clean_83 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-084",
    "domain": "hr",
    "level": 5,
    "order": 84,
    "difficulty": "boss",
    "title": "Transactional Automation with Stored Procedure (Q84)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #84 - Marcus Vance (Director of Workplace Experience)]: Automate operational routine in employee_trainings. Write Stored Procedure sp_routine_employee_trainings_84(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_employee_trainings_84(1); then select id, status AS confirmed_item from employee_trainings where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_employee_trainings_84(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_employee_trainings_84(1); SELECT id, status AS confirmed_item FROM employee_trainings WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-085",
    "domain": "hr",
    "level": 5,
    "order": 85,
    "difficulty": "boss",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q85)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #85 - Maya Thorne (VP of People Operations)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, budget AS metric_score, and NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 105;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, budget AS metric_score, NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-086",
    "domain": "hr",
    "level": 5,
    "order": 86,
    "difficulty": "boss",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q86)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #86 - David Kim (Director of Talent Acquisition)]: Infrastructure Audit: Profile optimizer execution cost for queries on job_roles. Run an EXPLAIN (FORMAT JSON) on a query selecting id and min_salary from job_roles where id >= 86;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "min_salary"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, min_salary FROM job_roles WHERE id >= 86;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-087",
    "domain": "hr",
    "level": 5,
    "order": 87,
    "difficulty": "boss",
    "title": "Latency Optimization with Database Index (Q87)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #87 - Alicia Gomez (Head of Compensation & Total Rewards)]: Production Ticket: Accelerate read queries on locations. Create an Index named idx_locations_perf_87 ON locations(id DESC); then select id, office_name AS indexed_label, capacity AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf_87 ON locations(id DESC); SELECT id, office_name AS indexed_label, capacity AS metric_val FROM locations WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-088",
    "domain": "hr",
    "level": 5,
    "order": 88,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q88)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #88 - Marcus Vance (Director of Workplace Experience)]: Create a sanitized virtual View named v_employees_summary_88 projecting id, name AS view_label, and COALESCE(salary, 0) AS safe_metric from employees WHERE id <= 118; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_employees_summary_88 AS SELECT id, name AS view_label, COALESCE(salary, 0) AS safe_metric FROM employees WHERE id <= 118; SELECT id, view_label, safe_metric FROM v_employees_summary_88 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-089",
    "domain": "hr",
    "level": 5,
    "order": 89,
    "difficulty": "boss",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q89)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #89 - Maya Thorne (VP of People Operations)]: ETL Staging Ticket: Build a session table named temp_salaries_history_clean_89 ingesting id, UPPER(TRIM(change_reason::text)) AS clean_name, and new_salary AS staged_val from salaries_history WHERE change_reason IS NOT NULL AND id <= 119. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_salaries_history_clean_89 AS SELECT id, UPPER(TRIM(change_reason::text)) AS clean_name, new_salary AS staged_val FROM salaries_history WHERE change_reason IS NOT NULL AND id <= 119; SELECT id, clean_name, staged_val FROM temp_salaries_history_clean_89 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-090",
    "domain": "hr",
    "level": 5,
    "order": 90,
    "difficulty": "boss",
    "title": "Transactional Automation with Stored Procedure (Q90)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #90 - David Kim (Director of Talent Acquisition)]: Automate operational routine in benefits_packages. Write Stored Procedure sp_routine_benefits_packages_90(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_benefits_packages_90(1); then select id, package_name AS confirmed_item from benefits_packages where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_benefits_packages_90(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_benefits_packages_90(1); SELECT id, package_name AS confirmed_item FROM benefits_packages WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-091",
    "domain": "hr",
    "level": 5,
    "order": 91,
    "difficulty": "boss",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q91)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #91 - Alicia Gomez (Head of Compensation & Total Rewards)]: Segment records in employee_benefits into 4 quartiles. Using a CTE named cohort_analysis, project id, employee_id::text AS cohort_label, id AS metric_score, and NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 111;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, employee_id::text AS cohort_label, id AS metric_score, NTILE(4) OVER (ORDER BY id DESC) AS quartile_tier FROM employee_benefits WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 111;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-092",
    "domain": "hr",
    "level": 5,
    "order": 92,
    "difficulty": "boss",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q92)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #92 - Marcus Vance (Director of Workplace Experience)]: Infrastructure Audit: Profile optimizer execution cost for queries on performance_reviews. Run an EXPLAIN (FORMAT JSON) on a query selecting id and bonus_pct from performance_reviews where id >= 92;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "bonus_pct"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, bonus_pct FROM performance_reviews WHERE id >= 92;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-093",
    "domain": "hr",
    "level": 5,
    "order": 93,
    "difficulty": "boss",
    "title": "Latency Optimization with Database Index (Q93)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #93 - Maya Thorne (VP of People Operations)]: Production Ticket: Accelerate read queries on leave_requests. Create an Index named idx_leave_requests_perf_93 ON leave_requests(id DESC); then select id, leave_type AS indexed_label, total_days AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_leave_requests_perf_93 ON leave_requests(id DESC); SELECT id, leave_type AS indexed_label, total_days AS metric_val FROM leave_requests WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-094",
    "domain": "hr",
    "level": 5,
    "order": 94,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q94)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #94 - David Kim (Director of Talent Acquisition)]: Create a sanitized virtual View named v_attendance_logs_summary_94 projecting id, work_mode AS view_label, and COALESCE(hours_worked, 0) AS safe_metric from attendance_logs WHERE id <= 124; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_attendance_logs_summary_94 AS SELECT id, work_mode AS view_label, COALESCE(hours_worked, 0) AS safe_metric FROM attendance_logs WHERE id <= 124; SELECT id, view_label, safe_metric FROM v_attendance_logs_summary_94 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-095",
    "domain": "hr",
    "level": 5,
    "order": 95,
    "difficulty": "boss",
    "title": "Session Staging Pipeline with Temporary Table (CTAS) (Q95)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #95 - Alicia Gomez (Head of Compensation & Total Rewards)]: ETL Staging Ticket: Build a session table named temp_training_courses_clean_95 ingesting id, UPPER(TRIM(course_title::text)) AS clean_name, and duration_hours AS staged_val from training_courses WHERE course_title IS NOT NULL AND id <= 125. Select from the temp table ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE TEMP TABLE",
      "TRIM",
      "UPPER",
      "ETL STAGING"
    ],
    "expected_columns": [
      "id",
      "clean_name",
      "staged_val"
    ],
    "reference_sql": "CREATE TEMP TABLE temp_training_courses_clean_95 AS SELECT id, UPPER(TRIM(course_title::text)) AS clean_name, duration_hours AS staged_val FROM training_courses WHERE course_title IS NOT NULL AND id <= 125; SELECT id, clean_name, staged_val FROM temp_training_courses_clean_95 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-096",
    "domain": "hr",
    "level": 5,
    "order": 96,
    "difficulty": "boss",
    "title": "Transactional Automation with Stored Procedure (Q96)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #96 - Marcus Vance (Director of Workplace Experience)]: Automate operational routine in employee_trainings. Write Stored Procedure sp_routine_employee_trainings_96(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; Execute with CALL sp_routine_employee_trainings_96(1); then select id, status AS confirmed_item from employee_trainings where id = 1;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE PROCEDURE",
      "CALL",
      "TRANSACTIONAL LOGIC"
    ],
    "expected_columns": [
      "id",
      "confirmed_item"
    ],
    "reference_sql": "CREATE OR REPLACE PROCEDURE sp_routine_employee_trainings_96(p_id INT) LANGUAGE plpgsql AS $$ BEGIN NULL; END; $$; CALL sp_routine_employee_trainings_96(1); SELECT id, status AS confirmed_item FROM employee_trainings WHERE id = 1;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-097",
    "domain": "hr",
    "level": 5,
    "order": 97,
    "difficulty": "boss",
    "title": "Executive Quartile Stratification (NTILE & CTE) (Q97)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #97 - Maya Thorne (VP of People Operations)]: Segment records in departments into 4 quartiles. Using a CTE named cohort_analysis, project id, name AS cohort_label, budget AS metric_score, and NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier where id >= 1 ordered by quartile_tier ASC, metric_score DESC LIMIT 117;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "WITH (CTE)",
      "NTILE(4)",
      "EXECUTIVE ANALYTICS"
    ],
    "expected_columns": [
      "id",
      "cohort_label",
      "metric_score",
      "quartile_tier"
    ],
    "reference_sql": "WITH cohort_analysis AS (SELECT id, name AS cohort_label, budget AS metric_score, NTILE(4) OVER (ORDER BY budget DESC) AS quartile_tier FROM departments WHERE id >= 1) SELECT id, cohort_label, metric_score, quartile_tier FROM cohort_analysis ORDER BY quartile_tier ASC, metric_score DESC LIMIT 117;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-098",
    "domain": "hr",
    "level": 5,
    "order": 98,
    "difficulty": "boss",
    "title": "Planner Cost Diagnostics with EXPLAIN Plan (Q98)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #98 - David Kim (Director of Talent Acquisition)]: Infrastructure Audit: Profile optimizer execution cost for queries on job_roles. Run an EXPLAIN (FORMAT JSON) on a query selecting id and min_salary from job_roles where id >= 98;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "EXPLAIN",
      "QUERY PLANNER",
      "COST PROFILING"
    ],
    "expected_columns": [
      "id",
      "min_salary"
    ],
    "reference_sql": "EXPLAIN (FORMAT JSON) SELECT id, min_salary FROM job_roles WHERE id >= 98;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-099",
    "domain": "hr",
    "level": 5,
    "order": 99,
    "difficulty": "boss",
    "title": "Latency Optimization with Database Index (Q99)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #99 - Alicia Gomez (Head of Compensation & Total Rewards)]: Production Ticket: Accelerate read queries on locations. Create an Index named idx_locations_perf_99 ON locations(id DESC); then select id, office_name AS indexed_label, capacity AS metric_val where id >= 1 ordered by id DESC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE INDEX",
      "QUERY OPTIMIZATION",
      "B-TREE"
    ],
    "expected_columns": [
      "id",
      "indexed_label",
      "metric_val"
    ],
    "reference_sql": "CREATE INDEX idx_locations_perf_99 ON locations(id DESC); SELECT id, office_name AS indexed_label, capacity AS metric_val FROM locations WHERE id >= 1 ORDER BY id DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  },
  {
    "id": "hr-L5-100",
    "domain": "hr",
    "level": 5,
    "order": 100,
    "difficulty": "boss",
    "title": "Executive Reporting Layer: Virtual View (Q100)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #100 - Marcus Vance (Director of Workplace Experience)]: Create a sanitized virtual View named v_employees_summary_100 projecting id, name AS view_label, and COALESCE(salary, 0) AS safe_metric from employees WHERE id <= 130; Select from the view ordered by id ASC LIMIT 20;\"",
    "context_notes": "Level 5 Master Database Engineering & Analytics challenge.",
    "concepts": [
      "CREATE VIEW",
      "COALESCE",
      "ABSTRACTION"
    ],
    "expected_columns": [
      "id",
      "view_label",
      "safe_metric"
    ],
    "reference_sql": "CREATE OR REPLACE VIEW v_employees_summary_100 AS SELECT id, name AS view_label, COALESCE(salary, 0) AS safe_metric FROM employees WHERE id <= 130; SELECT id, view_label, safe_metric FROM v_employees_summary_100 ORDER BY id ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Execute database engineering commands."
    ],
    "solution_explanation": "Performs production-grade database engineering and strategic portfolio analysis.",
    "xp": 100,
    "estimated_minutes": 25
  }
];
