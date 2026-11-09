import { QuestionDefinition } from "./ecom-l1-questions";

export const HR_L2_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "hr-L2-001",
    "domain": "hr",
    "level": 2,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: job_roles and departments (Q1)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #1 - Maya Thorne (VP of People Operations)]: Connect job_roles with departments. Return t.id, t.job_title AS child_ref, and p.name AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 11;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.job_title AS child_ref, p.name AS parent_name FROM job_roles t JOIN departments p ON t.department_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 11;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-002",
    "domain": "hr",
    "level": 2,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Volume Distribution: employees by status (Q2)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #2 - David Kim (Director of Talent Acquisition)]: Summarize volume in employees by status. Return status AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 12;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM employees WHERE status IS NOT NULL AND id >= 3 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 12;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-003",
    "domain": "hr",
    "level": 2,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Aggregated Volume per Parent Entity in employees (Q3)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #3 - Alicia Gomez (Head of Compensation & Total Rewards)]: Compile aggregated metrics joining salaries_history to employees. Return p.name AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 13;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM employees p JOIN salaries_history t ON p.id = t.employee_id WHERE p.id >= 4 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 13;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-004",
    "domain": "hr",
    "level": 2,
    "order": 4,
    "difficulty": "warm-up",
    "title": "High-Density Thresholds with HAVING in employee_benefits (Q4)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #4 - Marcus Vance (Director of Workplace Experience)]: Identify high-density segments in employee_benefits. Group by package_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 54, ordered descending LIMIT 14;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT package_id::text AS segment_key, COUNT(*) AS record_count FROM employee_benefits WHERE package_id::text IS NOT NULL AND id <= 54 GROUP BY package_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 14;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-005",
    "domain": "hr",
    "level": 2,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Comprehensive Relation Audit: Left Join on employees (Q5)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #5 - Maya Thorne (VP of People Operations)]: Perform a LEFT JOIN from employees to performance_reviews. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 15;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM employees p LEFT JOIN performance_reviews t ON p.id = t.employee_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-006",
    "domain": "hr",
    "level": 2,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Financial Metric Rollup on leave_requests (Q6)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #6 - David Kim (Director of Talent Acquisition)]: Calculate average total_days per parent entity in employees. Return p.name AS parent_name and ROUND(AVG(t.total_days::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 16;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.total_days::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.total_days::numeric), 2) AS avg_metric FROM employees p JOIN leave_requests t ON p.id = t.employee_id WHERE p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 16;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-007",
    "domain": "hr",
    "level": 2,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: attendance_logs and employees (Q7)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #7 - Alicia Gomez (Head of Compensation & Total Rewards)]: Connect attendance_logs with employees. Return t.id, t.work_mode AS child_ref, and p.name AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 17;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.work_mode AS child_ref, p.name AS parent_name FROM attendance_logs t JOIN employees p ON t.employee_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 17;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-008",
    "domain": "hr",
    "level": 2,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Volume Distribution: employee_trainings by status (Q8)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #8 - Marcus Vance (Director of Workplace Experience)]: Summarize volume in employee_trainings by status. Return status AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 18;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM employee_trainings WHERE status IS NOT NULL AND id >= 4 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 18;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-009",
    "domain": "hr",
    "level": 2,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Aggregated Volume per Parent Entity in departments (Q9)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #9 - Maya Thorne (VP of People Operations)]: Compile aggregated metrics joining job_roles to departments. Return p.name AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 19;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM departments p JOIN job_roles t ON p.id = t.department_id WHERE p.id >= 5 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 19;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-010",
    "domain": "hr",
    "level": 2,
    "order": 10,
    "difficulty": "warm-up",
    "title": "High-Density Thresholds with HAVING in employees (Q10)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #10 - David Kim (Director of Talent Acquisition)]: Identify high-density segments in employees. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 60, ordered descending LIMIT 20;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM employees WHERE status IS NOT NULL AND id <= 60 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-011",
    "domain": "hr",
    "level": 2,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Comprehensive Relation Audit: Left Join on employees (Q11)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #11 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform a LEFT JOIN from employees to salaries_history. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 2 ordered by p.id ASC LIMIT 21;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM employees p LEFT JOIN salaries_history t ON p.id = t.employee_id WHERE p.id >= 2 ORDER BY p.id ASC LIMIT 21;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-012",
    "domain": "hr",
    "level": 2,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Financial Metric Rollup on employee_benefits (Q12)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #12 - Marcus Vance (Director of Workplace Experience)]: Calculate average id per parent entity in employees. Return p.name AS parent_name and ROUND(AVG(t.id::numeric), 2) AS avg_metric where p.id >= 3 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 22;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.id::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.id::numeric), 2) AS avg_metric FROM employees p JOIN employee_benefits t ON p.id = t.employee_id WHERE p.id >= 3 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 22;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-013",
    "domain": "hr",
    "level": 2,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: performance_reviews and employees (Q13)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #13 - Maya Thorne (VP of People Operations)]: Connect performance_reviews with employees. Return t.id, t.employee_id::text AS child_ref, and p.name AS parent_name where t.id >= 4 ordered by t.id ASC LIMIT 23;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.employee_id::text AS child_ref, p.name AS parent_name FROM performance_reviews t JOIN employees p ON t.employee_id = p.id WHERE t.id >= 4 ORDER BY t.id ASC LIMIT 23;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-014",
    "domain": "hr",
    "level": 2,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Volume Distribution: leave_requests by status (Q14)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #14 - David Kim (Director of Talent Acquisition)]: Summarize volume in leave_requests by status. Return status AS group_label and COUNT(*) AS record_count where id >= 5 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 24;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM leave_requests WHERE status IS NOT NULL AND id >= 5 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-015",
    "domain": "hr",
    "level": 2,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Aggregated Volume per Parent Entity in employees (Q15)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #15 - Alicia Gomez (Head of Compensation & Total Rewards)]: Compile aggregated metrics joining attendance_logs to employees. Return p.name AS parent_name and total count of children as child_count where p.id >= 1 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 25;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM employees p JOIN attendance_logs t ON p.id = t.employee_id WHERE p.id >= 1 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-016",
    "domain": "hr",
    "level": 2,
    "order": 16,
    "difficulty": "warm-up",
    "title": "High-Density Thresholds with HAVING in employee_trainings (Q16)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #16 - Marcus Vance (Director of Workplace Experience)]: Identify high-density segments in employee_trainings. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 66, ordered descending LIMIT 26;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM employee_trainings WHERE status IS NOT NULL AND id <= 66 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 26;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-017",
    "domain": "hr",
    "level": 2,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Comprehensive Relation Audit: Left Join on departments (Q17)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #17 - Maya Thorne (VP of People Operations)]: Perform a LEFT JOIN from departments to job_roles. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 3 ordered by p.id ASC LIMIT 27;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM departments p LEFT JOIN job_roles t ON p.id = t.department_id WHERE p.id >= 3 ORDER BY p.id ASC LIMIT 27;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-018",
    "domain": "hr",
    "level": 2,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Financial Metric Rollup on employees (Q18)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #18 - David Kim (Director of Talent Acquisition)]: Calculate average salary per parent entity in departments. Return p.name AS parent_name and ROUND(AVG(t.salary::numeric), 2) AS avg_metric where p.id >= 4 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 28;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.salary::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.salary::numeric), 2) AS avg_metric FROM departments p JOIN employees t ON p.id = t.department_id WHERE p.id >= 4 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 28;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-019",
    "domain": "hr",
    "level": 2,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Relational Cross-Link: salaries_history and employees (Q19)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #19 - Alicia Gomez (Head of Compensation & Total Rewards)]: Connect salaries_history with employees. Return t.id, t.change_reason AS child_ref, and p.name AS parent_name where t.id >= 5 ordered by t.id ASC LIMIT 29;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.change_reason AS child_ref, p.name AS parent_name FROM salaries_history t JOIN employees p ON t.employee_id = p.id WHERE t.id >= 5 ORDER BY t.id ASC LIMIT 29;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-020",
    "domain": "hr",
    "level": 2,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Volume Distribution: employee_benefits by package_id::text (Q20)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #20 - Marcus Vance (Director of Workplace Experience)]: Summarize volume in employee_benefits by package_id::text. Return package_id::text AS group_label and COUNT(*) AS record_count where id >= 1 GROUP BY package_id::text ORDER BY record_count DESC, group_label ASC LIMIT 30;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT package_id::text AS group_label, COUNT(*) AS record_count FROM employee_benefits WHERE package_id::text IS NOT NULL AND id >= 1 GROUP BY package_id::text ORDER BY record_count DESC, group_label ASC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hr-L2-021",
    "domain": "hr",
    "level": 2,
    "order": 21,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in employees (Q21)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #21 - Maya Thorne (VP of People Operations)]: Compile aggregated metrics joining performance_reviews to employees. Return p.name AS parent_name and total count of children as child_count where p.id >= 2 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 31;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM employees p JOIN performance_reviews t ON p.id = t.employee_id WHERE p.id >= 2 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 31;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-022",
    "domain": "hr",
    "level": 2,
    "order": 22,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in leave_requests (Q22)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #22 - David Kim (Director of Talent Acquisition)]: Identify high-density segments in leave_requests. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 72, ordered descending LIMIT 32;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM leave_requests WHERE status IS NOT NULL AND id <= 72 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 32;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-023",
    "domain": "hr",
    "level": 2,
    "order": 23,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on employees (Q23)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #23 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform a LEFT JOIN from employees to attendance_logs. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 4 ordered by p.id ASC LIMIT 33;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM employees p LEFT JOIN attendance_logs t ON p.id = t.employee_id WHERE p.id >= 4 ORDER BY p.id ASC LIMIT 33;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-024",
    "domain": "hr",
    "level": 2,
    "order": 24,
    "difficulty": "core",
    "title": "Financial Metric Rollup on employee_trainings (Q24)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #24 - Marcus Vance (Director of Workplace Experience)]: Calculate average score per parent entity in employees. Return p.name AS parent_name and ROUND(AVG(t.score::numeric), 2) AS avg_metric where p.id >= 5 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 34;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.score::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.score::numeric), 2) AS avg_metric FROM employees p JOIN employee_trainings t ON p.id = t.employee_id WHERE p.id >= 5 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 34;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-025",
    "domain": "hr",
    "level": 2,
    "order": 25,
    "difficulty": "core",
    "title": "Relational Cross-Link: job_roles and departments (Q25)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #25 - Maya Thorne (VP of People Operations)]: Connect job_roles with departments. Return t.id, t.job_title AS child_ref, and p.name AS parent_name where t.id >= 1 ordered by t.id ASC LIMIT 35;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.job_title AS child_ref, p.name AS parent_name FROM job_roles t JOIN departments p ON t.department_id = p.id WHERE t.id >= 1 ORDER BY t.id ASC LIMIT 35;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-026",
    "domain": "hr",
    "level": 2,
    "order": 26,
    "difficulty": "core",
    "title": "Volume Distribution: employees by status (Q26)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #26 - David Kim (Director of Talent Acquisition)]: Summarize volume in employees by status. Return status AS group_label and COUNT(*) AS record_count where id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 36;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM employees WHERE status IS NOT NULL AND id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 36;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-027",
    "domain": "hr",
    "level": 2,
    "order": 27,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in employees (Q27)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #27 - Alicia Gomez (Head of Compensation & Total Rewards)]: Compile aggregated metrics joining salaries_history to employees. Return p.name AS parent_name and total count of children as child_count where p.id >= 3 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 37;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM employees p JOIN salaries_history t ON p.id = t.employee_id WHERE p.id >= 3 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 37;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-028",
    "domain": "hr",
    "level": 2,
    "order": 28,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in employee_benefits (Q28)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #28 - Marcus Vance (Director of Workplace Experience)]: Identify high-density segments in employee_benefits. Group by package_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 78, ordered descending LIMIT 38;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT package_id::text AS segment_key, COUNT(*) AS record_count FROM employee_benefits WHERE package_id::text IS NOT NULL AND id <= 78 GROUP BY package_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 38;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-029",
    "domain": "hr",
    "level": 2,
    "order": 29,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on employees (Q29)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #29 - Maya Thorne (VP of People Operations)]: Perform a LEFT JOIN from employees to performance_reviews. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 5 ordered by p.id ASC LIMIT 39;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM employees p LEFT JOIN performance_reviews t ON p.id = t.employee_id WHERE p.id >= 5 ORDER BY p.id ASC LIMIT 39;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-030",
    "domain": "hr",
    "level": 2,
    "order": 30,
    "difficulty": "core",
    "title": "Financial Metric Rollup on leave_requests (Q30)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #30 - David Kim (Director of Talent Acquisition)]: Calculate average total_days per parent entity in employees. Return p.name AS parent_name and ROUND(AVG(t.total_days::numeric), 2) AS avg_metric where p.id >= 1 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 40;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.total_days::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.total_days::numeric), 2) AS avg_metric FROM employees p JOIN leave_requests t ON p.id = t.employee_id WHERE p.id >= 1 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 40;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-031",
    "domain": "hr",
    "level": 2,
    "order": 31,
    "difficulty": "core",
    "title": "Relational Cross-Link: attendance_logs and employees (Q31)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #31 - Alicia Gomez (Head of Compensation & Total Rewards)]: Connect attendance_logs with employees. Return t.id, t.work_mode AS child_ref, and p.name AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 41;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.work_mode AS child_ref, p.name AS parent_name FROM attendance_logs t JOIN employees p ON t.employee_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 41;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-032",
    "domain": "hr",
    "level": 2,
    "order": 32,
    "difficulty": "core",
    "title": "Volume Distribution: employee_trainings by status (Q32)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #32 - Marcus Vance (Director of Workplace Experience)]: Summarize volume in employee_trainings by status. Return status AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 42;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM employee_trainings WHERE status IS NOT NULL AND id >= 3 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 42;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-033",
    "domain": "hr",
    "level": 2,
    "order": 33,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in departments (Q33)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #33 - Maya Thorne (VP of People Operations)]: Compile aggregated metrics joining job_roles to departments. Return p.name AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 43;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM departments p JOIN job_roles t ON p.id = t.department_id WHERE p.id >= 4 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 43;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-034",
    "domain": "hr",
    "level": 2,
    "order": 34,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in employees (Q34)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #34 - David Kim (Director of Talent Acquisition)]: Identify high-density segments in employees. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 84, ordered descending LIMIT 44;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM employees WHERE status IS NOT NULL AND id <= 84 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 44;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-035",
    "domain": "hr",
    "level": 2,
    "order": 35,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on employees (Q35)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #35 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform a LEFT JOIN from employees to salaries_history. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 45;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM employees p LEFT JOIN salaries_history t ON p.id = t.employee_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 45;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-036",
    "domain": "hr",
    "level": 2,
    "order": 36,
    "difficulty": "core",
    "title": "Financial Metric Rollup on employee_benefits (Q36)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #36 - Marcus Vance (Director of Workplace Experience)]: Calculate average id per parent entity in employees. Return p.name AS parent_name and ROUND(AVG(t.id::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 46;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.id::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.id::numeric), 2) AS avg_metric FROM employees p JOIN employee_benefits t ON p.id = t.employee_id WHERE p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 46;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-037",
    "domain": "hr",
    "level": 2,
    "order": 37,
    "difficulty": "core",
    "title": "Relational Cross-Link: performance_reviews and employees (Q37)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #37 - Maya Thorne (VP of People Operations)]: Connect performance_reviews with employees. Return t.id, t.employee_id::text AS child_ref, and p.name AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 47;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.employee_id::text AS child_ref, p.name AS parent_name FROM performance_reviews t JOIN employees p ON t.employee_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 47;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-038",
    "domain": "hr",
    "level": 2,
    "order": 38,
    "difficulty": "core",
    "title": "Volume Distribution: leave_requests by status (Q38)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #38 - David Kim (Director of Talent Acquisition)]: Summarize volume in leave_requests by status. Return status AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 48;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM leave_requests WHERE status IS NOT NULL AND id >= 4 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 48;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-039",
    "domain": "hr",
    "level": 2,
    "order": 39,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in employees (Q39)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #39 - Alicia Gomez (Head of Compensation & Total Rewards)]: Compile aggregated metrics joining attendance_logs to employees. Return p.name AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 49;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM employees p JOIN attendance_logs t ON p.id = t.employee_id WHERE p.id >= 5 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 49;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-040",
    "domain": "hr",
    "level": 2,
    "order": 40,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in employee_trainings (Q40)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #40 - Marcus Vance (Director of Workplace Experience)]: Identify high-density segments in employee_trainings. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 90, ordered descending LIMIT 50;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM employee_trainings WHERE status IS NOT NULL AND id <= 90 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 50;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-041",
    "domain": "hr",
    "level": 2,
    "order": 41,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on departments (Q41)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #41 - Maya Thorne (VP of People Operations)]: Perform a LEFT JOIN from departments to job_roles. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 2 ordered by p.id ASC LIMIT 51;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM departments p LEFT JOIN job_roles t ON p.id = t.department_id WHERE p.id >= 2 ORDER BY p.id ASC LIMIT 51;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-042",
    "domain": "hr",
    "level": 2,
    "order": 42,
    "difficulty": "core",
    "title": "Financial Metric Rollup on employees (Q42)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #42 - David Kim (Director of Talent Acquisition)]: Calculate average salary per parent entity in departments. Return p.name AS parent_name and ROUND(AVG(t.salary::numeric), 2) AS avg_metric where p.id >= 3 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 52;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.salary::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.salary::numeric), 2) AS avg_metric FROM departments p JOIN employees t ON p.id = t.department_id WHERE p.id >= 3 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 52;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-043",
    "domain": "hr",
    "level": 2,
    "order": 43,
    "difficulty": "core",
    "title": "Relational Cross-Link: salaries_history and employees (Q43)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #43 - Alicia Gomez (Head of Compensation & Total Rewards)]: Connect salaries_history with employees. Return t.id, t.change_reason AS child_ref, and p.name AS parent_name where t.id >= 4 ordered by t.id ASC LIMIT 53;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.change_reason AS child_ref, p.name AS parent_name FROM salaries_history t JOIN employees p ON t.employee_id = p.id WHERE t.id >= 4 ORDER BY t.id ASC LIMIT 53;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-044",
    "domain": "hr",
    "level": 2,
    "order": 44,
    "difficulty": "core",
    "title": "Volume Distribution: employee_benefits by package_id::text (Q44)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #44 - Marcus Vance (Director of Workplace Experience)]: Summarize volume in employee_benefits by package_id::text. Return package_id::text AS group_label and COUNT(*) AS record_count where id >= 5 GROUP BY package_id::text ORDER BY record_count DESC, group_label ASC LIMIT 54;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT package_id::text AS group_label, COUNT(*) AS record_count FROM employee_benefits WHERE package_id::text IS NOT NULL AND id >= 5 GROUP BY package_id::text ORDER BY record_count DESC, group_label ASC LIMIT 54;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-045",
    "domain": "hr",
    "level": 2,
    "order": 45,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in employees (Q45)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #45 - Maya Thorne (VP of People Operations)]: Compile aggregated metrics joining performance_reviews to employees. Return p.name AS parent_name and total count of children as child_count where p.id >= 1 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 55;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM employees p JOIN performance_reviews t ON p.id = t.employee_id WHERE p.id >= 1 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 55;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-046",
    "domain": "hr",
    "level": 2,
    "order": 46,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in leave_requests (Q46)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #46 - David Kim (Director of Talent Acquisition)]: Identify high-density segments in leave_requests. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 96, ordered descending LIMIT 56;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM leave_requests WHERE status IS NOT NULL AND id <= 96 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 56;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-047",
    "domain": "hr",
    "level": 2,
    "order": 47,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on employees (Q47)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #47 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform a LEFT JOIN from employees to attendance_logs. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 3 ordered by p.id ASC LIMIT 57;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM employees p LEFT JOIN attendance_logs t ON p.id = t.employee_id WHERE p.id >= 3 ORDER BY p.id ASC LIMIT 57;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-048",
    "domain": "hr",
    "level": 2,
    "order": 48,
    "difficulty": "core",
    "title": "Financial Metric Rollup on employee_trainings (Q48)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #48 - Marcus Vance (Director of Workplace Experience)]: Calculate average score per parent entity in employees. Return p.name AS parent_name and ROUND(AVG(t.score::numeric), 2) AS avg_metric where p.id >= 4 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 58;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.score::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.score::numeric), 2) AS avg_metric FROM employees p JOIN employee_trainings t ON p.id = t.employee_id WHERE p.id >= 4 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 58;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-049",
    "domain": "hr",
    "level": 2,
    "order": 49,
    "difficulty": "core",
    "title": "Relational Cross-Link: job_roles and departments (Q49)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #49 - Maya Thorne (VP of People Operations)]: Connect job_roles with departments. Return t.id, t.job_title AS child_ref, and p.name AS parent_name where t.id >= 5 ordered by t.id ASC LIMIT 59;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.job_title AS child_ref, p.name AS parent_name FROM job_roles t JOIN departments p ON t.department_id = p.id WHERE t.id >= 5 ORDER BY t.id ASC LIMIT 59;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-050",
    "domain": "hr",
    "level": 2,
    "order": 50,
    "difficulty": "core",
    "title": "Volume Distribution: employees by status (Q50)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #50 - David Kim (Director of Talent Acquisition)]: Summarize volume in employees by status. Return status AS group_label and COUNT(*) AS record_count where id >= 1 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 60;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM employees WHERE status IS NOT NULL AND id >= 1 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 60;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-051",
    "domain": "hr",
    "level": 2,
    "order": 51,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in employees (Q51)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #51 - Alicia Gomez (Head of Compensation & Total Rewards)]: Compile aggregated metrics joining salaries_history to employees. Return p.name AS parent_name and total count of children as child_count where p.id >= 2 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 61;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM employees p JOIN salaries_history t ON p.id = t.employee_id WHERE p.id >= 2 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 61;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-052",
    "domain": "hr",
    "level": 2,
    "order": 52,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in employee_benefits (Q52)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #52 - Marcus Vance (Director of Workplace Experience)]: Identify high-density segments in employee_benefits. Group by package_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 102, ordered descending LIMIT 62;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT package_id::text AS segment_key, COUNT(*) AS record_count FROM employee_benefits WHERE package_id::text IS NOT NULL AND id <= 102 GROUP BY package_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 62;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-053",
    "domain": "hr",
    "level": 2,
    "order": 53,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on employees (Q53)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #53 - Maya Thorne (VP of People Operations)]: Perform a LEFT JOIN from employees to performance_reviews. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 4 ordered by p.id ASC LIMIT 63;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM employees p LEFT JOIN performance_reviews t ON p.id = t.employee_id WHERE p.id >= 4 ORDER BY p.id ASC LIMIT 63;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-054",
    "domain": "hr",
    "level": 2,
    "order": 54,
    "difficulty": "core",
    "title": "Financial Metric Rollup on leave_requests (Q54)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #54 - David Kim (Director of Talent Acquisition)]: Calculate average total_days per parent entity in employees. Return p.name AS parent_name and ROUND(AVG(t.total_days::numeric), 2) AS avg_metric where p.id >= 5 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 64;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.total_days::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.total_days::numeric), 2) AS avg_metric FROM employees p JOIN leave_requests t ON p.id = t.employee_id WHERE p.id >= 5 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 64;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-055",
    "domain": "hr",
    "level": 2,
    "order": 55,
    "difficulty": "core",
    "title": "Relational Cross-Link: attendance_logs and employees (Q55)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #55 - Alicia Gomez (Head of Compensation & Total Rewards)]: Connect attendance_logs with employees. Return t.id, t.work_mode AS child_ref, and p.name AS parent_name where t.id >= 1 ordered by t.id ASC LIMIT 65;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.work_mode AS child_ref, p.name AS parent_name FROM attendance_logs t JOIN employees p ON t.employee_id = p.id WHERE t.id >= 1 ORDER BY t.id ASC LIMIT 65;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-056",
    "domain": "hr",
    "level": 2,
    "order": 56,
    "difficulty": "core",
    "title": "Volume Distribution: employee_trainings by status (Q56)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #56 - Marcus Vance (Director of Workplace Experience)]: Summarize volume in employee_trainings by status. Return status AS group_label and COUNT(*) AS record_count where id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 66;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM employee_trainings WHERE status IS NOT NULL AND id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 66;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-057",
    "domain": "hr",
    "level": 2,
    "order": 57,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in departments (Q57)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #57 - Maya Thorne (VP of People Operations)]: Compile aggregated metrics joining job_roles to departments. Return p.name AS parent_name and total count of children as child_count where p.id >= 3 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 67;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM departments p JOIN job_roles t ON p.id = t.department_id WHERE p.id >= 3 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 67;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-058",
    "domain": "hr",
    "level": 2,
    "order": 58,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in employees (Q58)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #58 - David Kim (Director of Talent Acquisition)]: Identify high-density segments in employees. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 108, ordered descending LIMIT 68;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM employees WHERE status IS NOT NULL AND id <= 108 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 68;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-059",
    "domain": "hr",
    "level": 2,
    "order": 59,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on employees (Q59)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #59 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform a LEFT JOIN from employees to salaries_history. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 5 ordered by p.id ASC LIMIT 69;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM employees p LEFT JOIN salaries_history t ON p.id = t.employee_id WHERE p.id >= 5 ORDER BY p.id ASC LIMIT 69;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-060",
    "domain": "hr",
    "level": 2,
    "order": 60,
    "difficulty": "core",
    "title": "Financial Metric Rollup on employee_benefits (Q60)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #60 - Marcus Vance (Director of Workplace Experience)]: Calculate average id per parent entity in employees. Return p.name AS parent_name and ROUND(AVG(t.id::numeric), 2) AS avg_metric where p.id >= 1 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 70;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.id::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.id::numeric), 2) AS avg_metric FROM employees p JOIN employee_benefits t ON p.id = t.employee_id WHERE p.id >= 1 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 70;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-061",
    "domain": "hr",
    "level": 2,
    "order": 61,
    "difficulty": "core",
    "title": "Relational Cross-Link: performance_reviews and employees (Q61)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #61 - Maya Thorne (VP of People Operations)]: Connect performance_reviews with employees. Return t.id, t.employee_id::text AS child_ref, and p.name AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 71;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.employee_id::text AS child_ref, p.name AS parent_name FROM performance_reviews t JOIN employees p ON t.employee_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 71;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-062",
    "domain": "hr",
    "level": 2,
    "order": 62,
    "difficulty": "core",
    "title": "Volume Distribution: leave_requests by status (Q62)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #62 - David Kim (Director of Talent Acquisition)]: Summarize volume in leave_requests by status. Return status AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 72;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM leave_requests WHERE status IS NOT NULL AND id >= 3 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 72;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-063",
    "domain": "hr",
    "level": 2,
    "order": 63,
    "difficulty": "core",
    "title": "Aggregated Volume per Parent Entity in employees (Q63)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #63 - Alicia Gomez (Head of Compensation & Total Rewards)]: Compile aggregated metrics joining attendance_logs to employees. Return p.name AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 73;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM employees p JOIN attendance_logs t ON p.id = t.employee_id WHERE p.id >= 4 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 73;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-064",
    "domain": "hr",
    "level": 2,
    "order": 64,
    "difficulty": "core",
    "title": "High-Density Thresholds with HAVING in employee_trainings (Q64)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #64 - Marcus Vance (Director of Workplace Experience)]: Identify high-density segments in employee_trainings. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 114, ordered descending LIMIT 74;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM employee_trainings WHERE status IS NOT NULL AND id <= 114 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 74;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-065",
    "domain": "hr",
    "level": 2,
    "order": 65,
    "difficulty": "core",
    "title": "Comprehensive Relation Audit: Left Join on departments (Q65)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #65 - Maya Thorne (VP of People Operations)]: Perform a LEFT JOIN from departments to job_roles. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 75;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM departments p LEFT JOIN job_roles t ON p.id = t.department_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 75;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hr-L2-066",
    "domain": "hr",
    "level": 2,
    "order": 66,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on employees (Q66)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #66 - David Kim (Director of Talent Acquisition)]: Calculate average salary per parent entity in departments. Return p.name AS parent_name and ROUND(AVG(t.salary::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 76;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.salary::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.salary::numeric), 2) AS avg_metric FROM departments p JOIN employees t ON p.id = t.department_id WHERE p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 76;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-067",
    "domain": "hr",
    "level": 2,
    "order": 67,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: salaries_history and employees (Q67)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #67 - Alicia Gomez (Head of Compensation & Total Rewards)]: Connect salaries_history with employees. Return t.id, t.change_reason AS child_ref, and p.name AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 77;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.change_reason AS child_ref, p.name AS parent_name FROM salaries_history t JOIN employees p ON t.employee_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 77;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-068",
    "domain": "hr",
    "level": 2,
    "order": 68,
    "difficulty": "challenging",
    "title": "Volume Distribution: employee_benefits by package_id::text (Q68)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #68 - Marcus Vance (Director of Workplace Experience)]: Summarize volume in employee_benefits by package_id::text. Return package_id::text AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY package_id::text ORDER BY record_count DESC, group_label ASC LIMIT 78;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT package_id::text AS group_label, COUNT(*) AS record_count FROM employee_benefits WHERE package_id::text IS NOT NULL AND id >= 4 GROUP BY package_id::text ORDER BY record_count DESC, group_label ASC LIMIT 78;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-069",
    "domain": "hr",
    "level": 2,
    "order": 69,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in employees (Q69)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #69 - Maya Thorne (VP of People Operations)]: Compile aggregated metrics joining performance_reviews to employees. Return p.name AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 79;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM employees p JOIN performance_reviews t ON p.id = t.employee_id WHERE p.id >= 5 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 79;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-070",
    "domain": "hr",
    "level": 2,
    "order": 70,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in leave_requests (Q70)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #70 - David Kim (Director of Talent Acquisition)]: Identify high-density segments in leave_requests. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 120, ordered descending LIMIT 80;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM leave_requests WHERE status IS NOT NULL AND id <= 120 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 80;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-071",
    "domain": "hr",
    "level": 2,
    "order": 71,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on employees (Q71)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #71 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform a LEFT JOIN from employees to attendance_logs. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 2 ordered by p.id ASC LIMIT 81;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM employees p LEFT JOIN attendance_logs t ON p.id = t.employee_id WHERE p.id >= 2 ORDER BY p.id ASC LIMIT 81;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-072",
    "domain": "hr",
    "level": 2,
    "order": 72,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on employee_trainings (Q72)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #72 - Marcus Vance (Director of Workplace Experience)]: Calculate average score per parent entity in employees. Return p.name AS parent_name and ROUND(AVG(t.score::numeric), 2) AS avg_metric where p.id >= 3 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 82;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.score::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.score::numeric), 2) AS avg_metric FROM employees p JOIN employee_trainings t ON p.id = t.employee_id WHERE p.id >= 3 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 82;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-073",
    "domain": "hr",
    "level": 2,
    "order": 73,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: job_roles and departments (Q73)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #73 - Maya Thorne (VP of People Operations)]: Connect job_roles with departments. Return t.id, t.job_title AS child_ref, and p.name AS parent_name where t.id >= 4 ordered by t.id ASC LIMIT 83;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.job_title AS child_ref, p.name AS parent_name FROM job_roles t JOIN departments p ON t.department_id = p.id WHERE t.id >= 4 ORDER BY t.id ASC LIMIT 83;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-074",
    "domain": "hr",
    "level": 2,
    "order": 74,
    "difficulty": "challenging",
    "title": "Volume Distribution: employees by status (Q74)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #74 - David Kim (Director of Talent Acquisition)]: Summarize volume in employees by status. Return status AS group_label and COUNT(*) AS record_count where id >= 5 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 84;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM employees WHERE status IS NOT NULL AND id >= 5 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 84;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-075",
    "domain": "hr",
    "level": 2,
    "order": 75,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in employees (Q75)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #75 - Alicia Gomez (Head of Compensation & Total Rewards)]: Compile aggregated metrics joining salaries_history to employees. Return p.name AS parent_name and total count of children as child_count where p.id >= 1 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 85;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM employees p JOIN salaries_history t ON p.id = t.employee_id WHERE p.id >= 1 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 85;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-076",
    "domain": "hr",
    "level": 2,
    "order": 76,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in employee_benefits (Q76)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #76 - Marcus Vance (Director of Workplace Experience)]: Identify high-density segments in employee_benefits. Group by package_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 126, ordered descending LIMIT 86;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT package_id::text AS segment_key, COUNT(*) AS record_count FROM employee_benefits WHERE package_id::text IS NOT NULL AND id <= 126 GROUP BY package_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 86;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-077",
    "domain": "hr",
    "level": 2,
    "order": 77,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on employees (Q77)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #77 - Maya Thorne (VP of People Operations)]: Perform a LEFT JOIN from employees to performance_reviews. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 3 ordered by p.id ASC LIMIT 87;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM employees p LEFT JOIN performance_reviews t ON p.id = t.employee_id WHERE p.id >= 3 ORDER BY p.id ASC LIMIT 87;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-078",
    "domain": "hr",
    "level": 2,
    "order": 78,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on leave_requests (Q78)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #78 - David Kim (Director of Talent Acquisition)]: Calculate average total_days per parent entity in employees. Return p.name AS parent_name and ROUND(AVG(t.total_days::numeric), 2) AS avg_metric where p.id >= 4 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 88;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.total_days::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.total_days::numeric), 2) AS avg_metric FROM employees p JOIN leave_requests t ON p.id = t.employee_id WHERE p.id >= 4 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 88;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-079",
    "domain": "hr",
    "level": 2,
    "order": 79,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: attendance_logs and employees (Q79)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #79 - Alicia Gomez (Head of Compensation & Total Rewards)]: Connect attendance_logs with employees. Return t.id, t.work_mode AS child_ref, and p.name AS parent_name where t.id >= 5 ordered by t.id ASC LIMIT 89;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.work_mode AS child_ref, p.name AS parent_name FROM attendance_logs t JOIN employees p ON t.employee_id = p.id WHERE t.id >= 5 ORDER BY t.id ASC LIMIT 89;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-080",
    "domain": "hr",
    "level": 2,
    "order": 80,
    "difficulty": "challenging",
    "title": "Volume Distribution: employee_trainings by status (Q80)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #80 - Marcus Vance (Director of Workplace Experience)]: Summarize volume in employee_trainings by status. Return status AS group_label and COUNT(*) AS record_count where id >= 1 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 90;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM employee_trainings WHERE status IS NOT NULL AND id >= 1 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 90;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-081",
    "domain": "hr",
    "level": 2,
    "order": 81,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in departments (Q81)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #81 - Maya Thorne (VP of People Operations)]: Compile aggregated metrics joining job_roles to departments. Return p.name AS parent_name and total count of children as child_count where p.id >= 2 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 91;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM departments p JOIN job_roles t ON p.id = t.department_id WHERE p.id >= 2 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 91;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-082",
    "domain": "hr",
    "level": 2,
    "order": 82,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in employees (Q82)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #82 - David Kim (Director of Talent Acquisition)]: Identify high-density segments in employees. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 132, ordered descending LIMIT 92;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM employees WHERE status IS NOT NULL AND id <= 132 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 92;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-083",
    "domain": "hr",
    "level": 2,
    "order": 83,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on employees (Q83)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #83 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform a LEFT JOIN from employees to salaries_history. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 4 ordered by p.id ASC LIMIT 93;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM employees p LEFT JOIN salaries_history t ON p.id = t.employee_id WHERE p.id >= 4 ORDER BY p.id ASC LIMIT 93;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-084",
    "domain": "hr",
    "level": 2,
    "order": 84,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on employee_benefits (Q84)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #84 - Marcus Vance (Director of Workplace Experience)]: Calculate average id per parent entity in employees. Return p.name AS parent_name and ROUND(AVG(t.id::numeric), 2) AS avg_metric where p.id >= 5 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 94;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.id::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.id::numeric), 2) AS avg_metric FROM employees p JOIN employee_benefits t ON p.id = t.employee_id WHERE p.id >= 5 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 94;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-085",
    "domain": "hr",
    "level": 2,
    "order": 85,
    "difficulty": "challenging",
    "title": "Relational Cross-Link: performance_reviews and employees (Q85)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #85 - Maya Thorne (VP of People Operations)]: Connect performance_reviews with employees. Return t.id, t.employee_id::text AS child_ref, and p.name AS parent_name where t.id >= 1 ordered by t.id ASC LIMIT 95;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.employee_id::text AS child_ref, p.name AS parent_name FROM performance_reviews t JOIN employees p ON t.employee_id = p.id WHERE t.id >= 1 ORDER BY t.id ASC LIMIT 95;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-086",
    "domain": "hr",
    "level": 2,
    "order": 86,
    "difficulty": "challenging",
    "title": "Volume Distribution: leave_requests by status (Q86)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #86 - David Kim (Director of Talent Acquisition)]: Summarize volume in leave_requests by status. Return status AS group_label and COUNT(*) AS record_count where id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 96;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM leave_requests WHERE status IS NOT NULL AND id >= 2 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 96;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-087",
    "domain": "hr",
    "level": 2,
    "order": 87,
    "difficulty": "challenging",
    "title": "Aggregated Volume per Parent Entity in employees (Q87)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #87 - Alicia Gomez (Head of Compensation & Total Rewards)]: Compile aggregated metrics joining attendance_logs to employees. Return p.name AS parent_name and total count of children as child_count where p.id >= 3 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 97;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM employees p JOIN attendance_logs t ON p.id = t.employee_id WHERE p.id >= 3 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 97;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-088",
    "domain": "hr",
    "level": 2,
    "order": 88,
    "difficulty": "challenging",
    "title": "High-Density Thresholds with HAVING in employee_trainings (Q88)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #88 - Marcus Vance (Director of Workplace Experience)]: Identify high-density segments in employee_trainings. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 138, ordered descending LIMIT 98;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM employee_trainings WHERE status IS NOT NULL AND id <= 138 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 98;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-089",
    "domain": "hr",
    "level": 2,
    "order": 89,
    "difficulty": "challenging",
    "title": "Comprehensive Relation Audit: Left Join on departments (Q89)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #89 - Maya Thorne (VP of People Operations)]: Perform a LEFT JOIN from departments to job_roles. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 5 ordered by p.id ASC LIMIT 99;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM departments p LEFT JOIN job_roles t ON p.id = t.department_id WHERE p.id >= 5 ORDER BY p.id ASC LIMIT 99;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-090",
    "domain": "hr",
    "level": 2,
    "order": 90,
    "difficulty": "challenging",
    "title": "Financial Metric Rollup on employees (Q90)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #90 - David Kim (Director of Talent Acquisition)]: Calculate average salary per parent entity in departments. Return p.name AS parent_name and ROUND(AVG(t.salary::numeric), 2) AS avg_metric where p.id >= 1 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 100;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.salary::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.salary::numeric), 2) AS avg_metric FROM departments p JOIN employees t ON p.id = t.department_id WHERE p.id >= 1 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 100;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hr-L2-091",
    "domain": "hr",
    "level": 2,
    "order": 91,
    "difficulty": "boss",
    "title": "Relational Cross-Link: salaries_history and employees (Q91)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #91 - Alicia Gomez (Head of Compensation & Total Rewards)]: Connect salaries_history with employees. Return t.id, t.change_reason AS child_ref, and p.name AS parent_name where t.id >= 2 ordered by t.id ASC LIMIT 101;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.change_reason AS child_ref, p.name AS parent_name FROM salaries_history t JOIN employees p ON t.employee_id = p.id WHERE t.id >= 2 ORDER BY t.id ASC LIMIT 101;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "hr-L2-092",
    "domain": "hr",
    "level": 2,
    "order": 92,
    "difficulty": "boss",
    "title": "Volume Distribution: employee_benefits by package_id::text (Q92)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #92 - Marcus Vance (Director of Workplace Experience)]: Summarize volume in employee_benefits by package_id::text. Return package_id::text AS group_label and COUNT(*) AS record_count where id >= 3 GROUP BY package_id::text ORDER BY record_count DESC, group_label ASC LIMIT 102;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT package_id::text AS group_label, COUNT(*) AS record_count FROM employee_benefits WHERE package_id::text IS NOT NULL AND id >= 3 GROUP BY package_id::text ORDER BY record_count DESC, group_label ASC LIMIT 102;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "hr-L2-093",
    "domain": "hr",
    "level": 2,
    "order": 93,
    "difficulty": "boss",
    "title": "Aggregated Volume per Parent Entity in employees (Q93)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #93 - Maya Thorne (VP of People Operations)]: Compile aggregated metrics joining performance_reviews to employees. Return p.name AS parent_name and total count of children as child_count where p.id >= 4 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 103;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM employees p JOIN performance_reviews t ON p.id = t.employee_id WHERE p.id >= 4 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 103;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "hr-L2-094",
    "domain": "hr",
    "level": 2,
    "order": 94,
    "difficulty": "boss",
    "title": "High-Density Thresholds with HAVING in leave_requests (Q94)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #94 - David Kim (Director of Talent Acquisition)]: Identify high-density segments in leave_requests. Group by status, calculating record_count, having COUNT(*) >= 1 and id <= 144, ordered descending LIMIT 104;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT status AS segment_key, COUNT(*) AS record_count FROM leave_requests WHERE status IS NOT NULL AND id <= 144 GROUP BY status HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 104;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "hr-L2-095",
    "domain": "hr",
    "level": 2,
    "order": 95,
    "difficulty": "boss",
    "title": "Comprehensive Relation Audit: Left Join on employees (Q95)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #95 - Alicia Gomez (Head of Compensation & Total Rewards)]: Perform a LEFT JOIN from employees to attendance_logs. Return p.id, p.name AS parent_name, and COALESCE(t.id, 0) AS matched_id where p.id >= 1 ordered by p.id ASC LIMIT 105;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "LEFT JOIN",
      "COALESCE",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "parent_name",
      "id",
      "matched_id"
    ],
    "reference_sql": "SELECT p.id, p.name AS parent_name, COALESCE(t.id, 0) AS matched_id FROM employees p LEFT JOIN attendance_logs t ON p.id = t.employee_id WHERE p.id >= 1 ORDER BY p.id ASC LIMIT 105;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "hr-L2-096",
    "domain": "hr",
    "level": 2,
    "order": 96,
    "difficulty": "boss",
    "title": "Financial Metric Rollup on employee_trainings (Q96)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #96 - Marcus Vance (Director of Workplace Experience)]: Calculate average score per parent entity in employees. Return p.name AS parent_name and ROUND(AVG(t.score::numeric), 2) AS avg_metric where p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 106;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "parent_name",
      "ROUND(AVG(t.score::numeric)",
      "avg_metric"
    ],
    "reference_sql": "SELECT p.name AS parent_name, ROUND(AVG(t.score::numeric), 2) AS avg_metric FROM employees p JOIN employee_trainings t ON p.id = t.employee_id WHERE p.id >= 2 GROUP BY p.name ORDER BY avg_metric DESC, parent_name ASC LIMIT 106;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "hr-L2-097",
    "domain": "hr",
    "level": 2,
    "order": 97,
    "difficulty": "boss",
    "title": "Relational Cross-Link: job_roles and departments (Q97)",
    "stakeholder": {
      "name": "Maya Thorne",
      "role": "VP of People Operations",
      "department": "HR"
    },
    "request": "From: Maya Thorne (VP of People Operations)\n\n\"[Task #97 - Maya Thorne (VP of People Operations)]: Connect job_roles with departments. Return t.id, t.job_title AS child_ref, and p.name AS parent_name where t.id >= 3 ordered by t.id ASC LIMIT 107;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "child_ref",
      "parent_name"
    ],
    "reference_sql": "SELECT t.id, t.job_title AS child_ref, p.name AS parent_name FROM job_roles t JOIN departments p ON t.department_id = p.id WHERE t.id >= 3 ORDER BY t.id ASC LIMIT 107;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "hr-L2-098",
    "domain": "hr",
    "level": 2,
    "order": 98,
    "difficulty": "boss",
    "title": "Volume Distribution: employees by status (Q98)",
    "stakeholder": {
      "name": "David Kim",
      "role": "Director of Talent Acquisition",
      "department": "Recruitment"
    },
    "request": "From: David Kim (Director of Talent Acquisition)\n\n\"[Task #98 - David Kim (Director of Talent Acquisition)]: Summarize volume in employees by status. Return status AS group_label and COUNT(*) AS record_count where id >= 4 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 108;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "COUNT(*)",
      "ORDER BY"
    ],
    "expected_columns": [
      "group_label",
      "record_count"
    ],
    "reference_sql": "SELECT status AS group_label, COUNT(*) AS record_count FROM employees WHERE status IS NOT NULL AND id >= 4 GROUP BY status ORDER BY record_count DESC, group_label ASC LIMIT 108;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "hr-L2-099",
    "domain": "hr",
    "level": 2,
    "order": 99,
    "difficulty": "boss",
    "title": "Aggregated Volume per Parent Entity in employees (Q99)",
    "stakeholder": {
      "name": "Alicia Gomez",
      "role": "Head of Compensation & Total Rewards",
      "department": "Compensation"
    },
    "request": "From: Alicia Gomez (Head of Compensation & Total Rewards)\n\n\"[Task #99 - Alicia Gomez (Head of Compensation & Total Rewards)]: Compile aggregated metrics joining salaries_history to employees. Return p.name AS parent_name and total count of children as child_count where p.id >= 5 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 109;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "parent_name",
      "child_count"
    ],
    "reference_sql": "SELECT p.name AS parent_name, COUNT(t.id) AS child_count FROM employees p JOIN salaries_history t ON p.id = t.employee_id WHERE p.id >= 5 GROUP BY p.name ORDER BY child_count DESC, parent_name ASC LIMIT 109;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  },
  {
    "id": "hr-L2-100",
    "domain": "hr",
    "level": 2,
    "order": 100,
    "difficulty": "boss",
    "title": "High-Density Thresholds with HAVING in employee_benefits (Q100)",
    "stakeholder": {
      "name": "Marcus Vance",
      "role": "Director of Workplace Experience",
      "department": "Operations"
    },
    "request": "From: Marcus Vance (Director of Workplace Experience)\n\n\"[Task #100 - Marcus Vance (Director of Workplace Experience)]: Identify high-density segments in employee_benefits. Group by package_id::text, calculating record_count, having COUNT(*) >= 1 and id <= 150, ordered descending LIMIT 110;\"",
    "context_notes": "Level 2 Multi-table relational query.",
    "concepts": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "segment_key",
      "record_count"
    ],
    "reference_sql": "SELECT package_id::text AS segment_key, COUNT(*) AS record_count FROM employee_benefits WHERE package_id::text IS NOT NULL AND id <= 150 GROUP BY package_id::text HAVING COUNT(*) >= 1 ORDER BY record_count DESC, segment_key ASC LIMIT 110;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0.01
    },
    "hints": [
      "Join on relational keys."
    ],
    "solution_explanation": "Aggregates and joins relational records across database tables.",
    "xp": 80,
    "estimated_minutes": 20
  }
];
