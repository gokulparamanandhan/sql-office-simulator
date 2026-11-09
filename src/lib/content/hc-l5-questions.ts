import { QuestionDefinition } from "./ecom-l1-questions";

export const HC_L5_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "hc-L5-001",
    "domain": "healthcare",
    "level": 5,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Department Procedural Cost Summary (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Surgical and interventional economics: Using a CTE, calculate the total standard procedural cost and average procedure duration in minutes for each clinical department. Return department name, procedure count, and total cost.",
    "context_notes": "WITH proc_summary AS (...) SELECT department_name, procedure_count, total_cost.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "department_name",
      "procedure_count",
      "total_cost"
    ],
    "reference_sql": "WITH proc_summary AS (SELECT d.name AS department_name, COUNT(p.id) AS procedure_count, ROUND(SUM(p.standard_cost), 2) AS total_cost FROM departments d JOIN medical_procedures p ON d.id = p.department_id GROUP BY d.id, d.name) SELECT department_name, procedure_count, total_cost FROM proc_summary ORDER BY total_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Define CTE aggregating medical_procedures joined to departments.",
      "Select department_name, procedure_count, total_cost ordered by total_cost DESC."
    ],
    "solution_explanation": "Aggregates departmental procedural volume and financial cost ceilings.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-002",
    "domain": "healthcare",
    "level": 5,
    "order": 2,
    "difficulty": "warm-up",
    "title": "High-Duration Clinical Procedures (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Operating room scheduling: Using a CTE, identify all medical procedures with a duration strictly greater than 30 minutes, joining with department to show code, procedure name, department name, and duration.",
    "context_notes": "WITH long_procs AS (...) SELECT code, procedure_name, department_name, duration_minutes.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "code",
      "procedure_name",
      "department_name",
      "duration_minutes"
    ],
    "reference_sql": "WITH long_procs AS (SELECT p.code, p.procedure_name, d.name AS department_name, p.duration_minutes FROM medical_procedures p JOIN departments d ON p.department_id = d.id WHERE p.duration_minutes > 30) SELECT code, procedure_name, department_name, duration_minutes FROM long_procs ORDER BY duration_minutes DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter procedures for duration_minutes > 30 in CTE.",
      "Order by duration_minutes DESC."
    ],
    "solution_explanation": "Surfaces complex operative cases requiring dedicated theatre block time.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L5-003",
    "domain": "healthcare",
    "level": 5,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Department Clinical Revenue Streams Breakdown (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Revenue diversification: Using a CTE to aggregate completed appointment fees per department, display department name, completed encounters, and total appointment revenue.",
    "context_notes": "WITH dept_revenue AS (...) SELECT department_name, completed_encounters, total_revenue.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "department_name",
      "completed_encounters",
      "total_revenue"
    ],
    "reference_sql": "WITH dept_revenue AS (SELECT dept.name AS department_name, COUNT(a.id) AS completed_encounters, ROUND(SUM(a.fee), 2) AS total_revenue FROM departments dept JOIN doctors doc ON dept.id = doc.department_id JOIN appointments a ON doc.id = a.doctor_id WHERE a.status = 'completed' GROUP BY dept.id, dept.name) SELECT department_name, completed_encounters, total_revenue FROM dept_revenue ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate completed appointments per department in CTE.",
      "Select department_name, completed_encounters, total_revenue."
    ],
    "solution_explanation": "Quantifies departmental contribution to hospital outpatient cash flow.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-004",
    "domain": "healthcare",
    "level": 5,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Payer Claim Underpayment Variance (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Contractual deduction audit: Using a CTE, calculate the difference between claim_amount and approved_amount for each approved claim (the contractual haircut). Return id, insurance provider, claim amount, approved amount, and deduction.",
    "context_notes": "WITH claim_diffs AS (...) SELECT id, insurance_provider, claim_amount, approved_amount, deduction.",
    "concepts": [
      "WITH CTE",
      "ARITHMETIC",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "insurance_provider",
      "claim_amount",
      "approved_amount",
      "deduction"
    ],
    "reference_sql": "WITH claim_diffs AS (SELECT id, insurance_provider, claim_amount, approved_amount, ROUND(claim_amount - approved_amount, 2) AS deduction FROM insurance_claims WHERE status = 'approved') SELECT id, insurance_provider, claim_amount, approved_amount, deduction FROM claim_diffs ORDER BY deduction DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute deduction as claim_amount - approved_amount in CTE.",
      "Order by deduction DESC."
    ],
    "solution_explanation": "Measures institutional dollar discounts absorbed under payer fee schedules.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L5-005",
    "domain": "healthcare",
    "level": 5,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Inpatient Length of Stay Analysis by Discharge Disposition (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Post-acute discharge planning: Using a CTE, calculate total admissions, average length of stay in days, and maximum stay for each discharge disposition (Home, Rehab, Transfer). Return disposition, admissions count, and avg length of stay.",
    "context_notes": "WITH disp_stats AS (...) SELECT discharge_disposition, admissions_count, avg_stay.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "discharge_disposition",
      "admissions_count",
      "avg_stay"
    ],
    "reference_sql": "WITH disp_stats AS (SELECT discharge_disposition, COUNT(id) AS admissions_count, ROUND(AVG(discharge_date - admission_date), 1) AS avg_stay FROM inpatient_admissions WHERE discharge_date IS NOT NULL GROUP BY discharge_disposition) SELECT discharge_disposition, admissions_count, avg_stay FROM disp_stats ORDER BY avg_stay DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group completed admissions by discharge_disposition in CTE.",
      "Compute admissions count and avg length of stay."
    ],
    "solution_explanation": "Evaluates inpatient hospital discharge bottlenecks and post-acute transfer times.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-006",
    "domain": "healthcare",
    "level": 5,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Top Prescribed Medications by Hospital Expenditure (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Pharmaceutical expense model: Using a CTE that joins prescriptions to medications, calculate total prescribed quantity and total estimated formulary cost (prescriptions * unit_cost). Return medication name, prescription count, unit cost, and total spend.",
    "context_notes": "WITH med_spend AS (...) SELECT medication_name, rx_count, unit_cost, total_spend.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "medication_name",
      "rx_count",
      "unit_cost",
      "total_spend"
    ],
    "reference_sql": "WITH med_spend AS (SELECT pr.medication_name, COUNT(pr.id) AS rx_count, m.unit_cost, ROUND(COUNT(pr.id) * m.unit_cost, 2) AS total_spend FROM prescriptions pr JOIN medications m ON pr.medication_name = m.name GROUP BY pr.medication_name, m.unit_cost) SELECT medication_name, rx_count, unit_cost, total_spend FROM med_spend ORDER BY total_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions to medications in CTE.",
      "Compute total_spend as rx_count * unit_cost.",
      "Order by total_spend DESC."
    ],
    "solution_explanation": "Surfaces top medications by institutional acquisition cost.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-007",
    "domain": "healthcare",
    "level": 5,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Department Inpatient Bed Capacity and Occupancy Yield (CTE)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Facility census analytics: Using a CTE, calculate total rooms, total occupied beds, and total potential daily revenue for each department. Return department name, total rooms, occupied rooms, and daily revenue potential.",
    "context_notes": "WITH bed_metrics AS (...) SELECT department_name, total_rooms, occupied_rooms, daily_capacity_revenue.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "department_name",
      "total_rooms",
      "occupied_rooms",
      "daily_capacity_revenue"
    ],
    "reference_sql": "WITH bed_metrics AS (SELECT d.name AS department_name, COUNT(r.id) AS total_rooms, SUM(CASE WHEN r.is_occupied THEN 1 ELSE 0 END) AS occupied_rooms, ROUND(SUM(r.daily_rate), 2) AS daily_capacity_revenue FROM departments d JOIN rooms r ON d.id = r.department_id GROUP BY d.id, d.name) SELECT department_name, total_rooms, occupied_rooms, daily_capacity_revenue FROM bed_metrics ORDER BY daily_capacity_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute bed counts and potential daily room revenue per department in CTE.",
      "Order by daily_capacity_revenue DESC."
    ],
    "solution_explanation": "Models bed revenue potential across hospital inpatient towers.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-008",
    "domain": "healthcare",
    "level": 5,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Abnormal Biomarker Ratio by Diagnostic Laboratory Panel (CTE)",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Diagnostic yield scorecard: Using a CTE, compute total tests performed, abnormal count (flag HIGH or LOW), and abnormal rate percentage for each lab test panel. Return test name, total tests, abnormal count, and abnormal rate pct.",
    "context_notes": "WITH lab_stats AS (...) SELECT test_name, total_tests, abnormal_count, abnormal_rate_pct.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "test_name",
      "total_tests",
      "abnormal_count",
      "abnormal_rate_pct"
    ],
    "reference_sql": "WITH lab_stats AS (SELECT lt.test_name, COUNT(plr.id) AS total_tests, SUM(CASE WHEN plr.flag IN ('HIGH', 'LOW') THEN 1 ELSE 0 END) AS abnormal_count, ROUND(SUM(CASE WHEN plr.flag IN ('HIGH', 'LOW') THEN 1.0 ELSE 0.0 END) / COUNT(plr.id) * 100.0, 1) AS abnormal_rate_pct FROM lab_tests lt LEFT JOIN patient_lab_results plr ON lt.id = plr.test_id GROUP BY lt.id, lt.test_name) SELECT test_name, total_tests, abnormal_count, abnormal_rate_pct FROM lab_stats ORDER BY abnormal_rate_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate tests and abnormal flags in CTE.",
      "Compute abnormal percentage."
    ],
    "solution_explanation": "Identifies clinical lab tests yielding the highest frequency of pathological anomalies.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-009",
    "domain": "healthcare",
    "level": 5,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Accounts Receivable Aging and Balances by Status (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Collections pipeline: Using a CTE, calculate total vouchers, total charges billed, and total outstanding patient balances grouped by billing status. Return status, total vouchers, total billed, and total patient balance.",
    "context_notes": "WITH ar_summary AS (...) SELECT status, total_vouchers, total_billed, total_patient_balance.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "status",
      "total_vouchers",
      "total_billed",
      "total_patient_balance"
    ],
    "reference_sql": "WITH ar_summary AS (SELECT status, COUNT(id) AS total_vouchers, ROUND(SUM(total_charge), 2) AS total_billed, ROUND(SUM(patient_balance), 2) AS total_patient_balance FROM billing GROUP BY status) SELECT status, total_vouchers, total_billed, total_patient_balance FROM ar_summary ORDER BY total_patient_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group billing vouchers by status in CTE.",
      "Sum total_charge and patient_balance."
    ],
    "solution_explanation": "Summarizes accounts receivable aging buckets across hospital billing.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L5-010",
    "domain": "healthcare",
    "level": 5,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Physician Consultation Fee Variance from Specialty Median (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Doctor fee consistency: Using a CTE that computes average completed visit fee per specialty, identify completed appointments where fee is higher than the specialty average. Return appointment id, specialty, fee, and specialty average fee.",
    "context_notes": "WITH spec_avg AS (...) SELECT a.id, d.specialty, a.fee, s.avg_fee.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "specialty",
      "fee",
      "avg_fee"
    ],
    "reference_sql": "WITH spec_avg AS (SELECT d.specialty, ROUND(AVG(a.fee), 2) AS avg_fee FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed' GROUP BY d.specialty) SELECT a.id, d.specialty, a.fee, s.avg_fee FROM appointments a JOIN doctors d ON a.doctor_id = d.id JOIN spec_avg s ON d.specialty = s.specialty WHERE a.status = 'completed' AND a.fee > s.avg_fee ORDER BY d.specialty, a.fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute specialty average fee in CTE.",
      "Join appointments to doctors and CTE, filtering for fee > avg_fee."
    ],
    "solution_explanation": "Surfaces appointments commanding premium fees relative to specialty peers.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-011",
    "domain": "healthcare",
    "level": 5,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Clinical Diagnostic Prevalence by Severity Tier (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Morbidity profile: Using a CTE, calculate total diagnoses, distinct patients diagnosed, and percentage of severe cases for each ICD-10 condition. Return ICD-10 code, description, total cases, and distinct patients.",
    "context_notes": "WITH diag_summary AS (...) SELECT icd10_code, description, total_cases, distinct_patients.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "COUNT DISTINCT"
    ],
    "expected_columns": [
      "icd10_code",
      "description",
      "total_cases",
      "distinct_patients"
    ],
    "reference_sql": "WITH diag_summary AS (SELECT icd10_code, description, COUNT(id) AS total_cases, COUNT(DISTINCT patient_id) AS distinct_patients FROM diagnoses GROUP BY icd10_code, description) SELECT icd10_code, description, total_cases, distinct_patients FROM diag_summary ORDER BY total_cases DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group diagnoses by code and description in CTE.",
      "Count total cases and distinct patients."
    ],
    "solution_explanation": "Surfaces top clinical conditions diagnosed across the health system.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L5-012",
    "domain": "healthcare",
    "level": 5,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Nursing Shift Staffing Ratios per Department (CTE)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Departmental nursing coverage: Using a CTE, count Day shift nurses and Night shift nurses for each clinical department. Return department name, Day nurse count, and Night nurse count.",
    "context_notes": "WITH shift_counts AS (...) SELECT department_name, day_nurses, night_nurses.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "department_name",
      "day_nurses",
      "night_nurses"
    ],
    "reference_sql": "WITH shift_counts AS (SELECT d.name AS department_name, SUM(CASE WHEN n.shift = 'Day' THEN 1 ELSE 0 END) AS day_nurses, SUM(CASE WHEN n.shift = 'Night' THEN 1 ELSE 0 END) AS night_nurses FROM departments d JOIN nurses n ON d.id = n.department_id GROUP BY d.id, d.name) SELECT department_name, day_nurses, night_nurses FROM shift_counts ORDER BY day_nurses DESC, night_nurses DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join departments to nurses in CTE.",
      "Pivot Day vs Night shift counts using conditional SUM."
    ],
    "solution_explanation": "Assesses departmental nursing shift coverage balance.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-013",
    "domain": "healthcare",
    "level": 5,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Patient Diagnostic Complexity Stratification (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Multimorbidity categorization: Using a CTE that counts diagnoses per patient, categorize patients into: Complex (>= 3 diagnoses), Moderate (2 diagnoses), Single Diagnosis (1 diagnosis). Return patient_id, diagnosis count, and complexity tier.",
    "context_notes": "WITH pt_diags AS (...) SELECT patient_id, diag_count, complexity_tier.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "CASE WHEN"
    ],
    "expected_columns": [
      "patient_id",
      "diag_count",
      "complexity_tier"
    ],
    "reference_sql": "WITH pt_diags AS (SELECT patient_id, COUNT(id) AS diag_count FROM diagnoses GROUP BY patient_id) SELECT patient_id, diag_count, CASE WHEN diag_count >= 3 THEN 'Complex' WHEN diag_count = 2 THEN 'Moderate' ELSE 'Single Diagnosis' END AS complexity_tier FROM pt_diags ORDER BY diag_count DESC, patient_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Count diagnoses per patient in CTE.",
      "Map count to complexity tier using CASE in outer query."
    ],
    "solution_explanation": "Stratifies patient population by clinical comorbidity load.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-014",
    "domain": "healthcare",
    "level": 5,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Insurance Claim Turnaround Days by Payer (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer payment speed: Using a CTE, calculate average settlement days, minimum settlement days, and maximum settlement days for approved claims by insurance provider. Return insurance provider, approved claims, and avg settlement days.",
    "context_notes": "WITH claim_speed AS (...) SELECT insurance_provider, approved_claims, avg_settlement_days.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "insurance_provider",
      "approved_claims",
      "avg_settlement_days"
    ],
    "reference_sql": "WITH claim_speed AS (SELECT insurance_provider, COUNT(id) AS approved_claims, ROUND(AVG(settlement_days), 1) AS avg_settlement_days FROM insurance_claims WHERE status = 'approved' GROUP BY insurance_provider) SELECT insurance_provider, approved_claims, avg_settlement_days FROM claim_speed ORDER BY avg_settlement_days ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter approved claims and group by insurance_provider in CTE.",
      "Compute avg settlement days."
    ],
    "solution_explanation": "Benchmarks health plans by claims payment speed.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L5-015",
    "domain": "healthcare",
    "level": 5,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Physician Encounter Adherence and Cancellation Ratio (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Outpatient schedule performance: Using a CTE, calculate total appointments, completed appointments, and completion percentage for each doctor. Return doctor name, specialty, total appointments, and completion rate pct.",
    "context_notes": "WITH doc_perf AS (...) SELECT doctor_name, specialty, total_appts, completion_rate_pct.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "total_appts",
      "completion_rate_pct"
    ],
    "reference_sql": "WITH doc_perf AS (SELECT d.name AS doctor_name, d.specialty, COUNT(a.id) AS total_appts, ROUND(SUM(CASE WHEN a.status = 'completed' THEN 1.0 ELSE 0.0 END) / COUNT(a.id) * 100.0, 1) AS completion_rate_pct FROM doctors d JOIN appointments a ON d.id = a.doctor_id GROUP BY d.id, d.name, d.specialty) SELECT doctor_name, specialty, total_appts, completion_rate_pct FROM doc_perf ORDER BY completion_rate_pct DESC, total_appts DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute total and completed appointments per doctor in CTE.",
      "Calculate completion percentage."
    ],
    "solution_explanation": "Evaluates physician schedule adherence across clinical staff.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-016",
    "domain": "healthcare",
    "level": 5,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Operating Room Utilization Potential by Specialty (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Surgical procedure capacity: Using a CTE that aggregates medical procedures per department, calculate total procedural minutes and standard cost revenue yield. Return department name, total procedural minutes, and procedural revenue potential.",
    "context_notes": "WITH proc_stats AS (...) SELECT department_name, total_duration_minutes, total_cost_potential.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "department_name",
      "total_duration_minutes",
      "total_cost_potential"
    ],
    "reference_sql": "WITH proc_stats AS (SELECT d.name AS department_name, SUM(p.duration_minutes) AS total_duration_minutes, ROUND(SUM(p.standard_cost), 2) AS total_cost_potential FROM departments d JOIN medical_procedures p ON d.id = p.department_id GROUP BY d.id, d.name) SELECT department_name, total_duration_minutes, total_cost_potential FROM proc_stats ORDER BY total_cost_potential DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Sum duration_minutes and standard_cost per department in CTE.",
      "Select department_name, total_duration_minutes, total_cost_potential."
    ],
    "solution_explanation": "Models theatre time utilization and procedure yield by clinical unit.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-017",
    "domain": "healthcare",
    "level": 5,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Inpatient Admission Disposition Breakdown by Doctor Specialty (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Surgical vs medical discharge: Using a CTE, count inpatient admissions discharged to Home, Rehab, and Transfer for each doctor specialty. Return specialty, Home discharges, and Rehab discharges.",
    "context_notes": "WITH disp_by_spec AS (...) SELECT specialty, home_discharges, rehab_discharges.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "specialty",
      "home_discharges",
      "rehab_discharges"
    ],
    "reference_sql": "WITH disp_by_spec AS (SELECT doc.specialty, SUM(CASE WHEN ia.discharge_disposition = 'Home' THEN 1 ELSE 0 END) AS home_discharges, SUM(CASE WHEN ia.discharge_disposition = 'Rehab' THEN 1 ELSE 0 END) AS rehab_discharges FROM inpatient_admissions ia JOIN doctors doc ON ia.admitting_doctor_id = doc.id GROUP BY doc.specialty) SELECT specialty, home_discharges, rehab_discharges FROM disp_by_spec ORDER BY home_discharges DESC, rehab_discharges DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join admissions to doctors in CTE.",
      "Pivot discharge dispositions by specialty."
    ],
    "solution_explanation": "Assesses post-acute rehabilitation requirements across clinical service lines.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-018",
    "domain": "healthcare",
    "level": 5,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Hospital Lab Revenue Potential by Diagnostic Test (CTE)",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Diagnostic revenue model: Using a CTE that joins lab tests with patient results, calculate total tests ordered, standard fee, and gross diagnostic billed potential (tests * standard_fee). Return test name, tests ordered, standard fee, and gross lab revenue.",
    "context_notes": "WITH lab_rev AS (...) SELECT test_name, tests_ordered, standard_fee, gross_lab_revenue.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "test_name",
      "tests_ordered",
      "standard_fee",
      "gross_lab_revenue"
    ],
    "reference_sql": "WITH lab_rev AS (SELECT lt.test_name, COUNT(plr.id) AS tests_ordered, lt.standard_fee, ROUND(COUNT(plr.id) * lt.standard_fee, 2) AS gross_lab_revenue FROM lab_tests lt LEFT JOIN patient_lab_results plr ON lt.id = plr.test_id GROUP BY lt.id, lt.test_name, lt.standard_fee) SELECT test_name, tests_ordered, standard_fee, gross_lab_revenue FROM lab_rev ORDER BY gross_lab_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute test order count * standard_fee in CTE.",
      "Select test_name, tests_ordered, standard_fee, gross_lab_revenue."
    ],
    "solution_explanation": "Quantifies financial revenue generation across diagnostic testing panels.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-019",
    "domain": "healthcare",
    "level": 5,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Delinquent Patient Balances by Municipal City (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Geographic bad-debt concentration: Using a CTE, calculate total overdue vouchers, total delinquent debt owed, and average overdue balance for each patient city. Return city, overdue vouchers, and total delinquent debt.",
    "context_notes": "WITH overdue_by_city AS (...) SELECT city, overdue_vouchers, total_delinquent_debt.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "city",
      "overdue_vouchers",
      "total_delinquent_debt"
    ],
    "reference_sql": "WITH overdue_by_city AS (SELECT p.city, COUNT(b.id) AS overdue_vouchers, ROUND(SUM(b.patient_balance), 2) AS total_delinquent_debt FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.status = 'overdue' GROUP BY p.city) SELECT city, overdue_vouchers, total_delinquent_debt FROM overdue_by_city ORDER BY total_delinquent_debt DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join overdue billing records to patients in CTE.",
      "Group by city and sum patient_balance."
    ],
    "solution_explanation": "Identifies geographic communities with highest self-pay arrears.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-020",
    "domain": "healthcare",
    "level": 5,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Doctor Prescribing Density per Completed Consultation (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician pharmacotherapy ratio: Using two CTEs (one for completed visits, one for prescriptions authored), calculate the prescriptions-per-consultation ratio for each doctor. Return doctor name, specialty, completed visits, prescriptions written, and Rx per visit ratio.",
    "context_notes": "WITH visits AS (...), rxs AS (...) SELECT doctor name, specialty, completed_visits, rx_count, rx_per_visit.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "JOIN",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "completed_visits",
      "rx_count",
      "rx_per_visit"
    ],
    "reference_sql": "WITH visits AS (SELECT doctor_id, COUNT(id) AS completed_visits FROM appointments WHERE status = 'completed' GROUP BY doctor_id), rxs AS (SELECT doctor_id, COUNT(id) AS rx_count FROM prescriptions GROUP BY doctor_id) SELECT d.name, d.specialty, v.completed_visits, COALESCE(r.rx_count, 0) AS rx_count, ROUND(COALESCE(r.rx_count, 0)::NUMERIC / NULLIF(v.completed_visits, 0), 2) AS rx_per_visit FROM doctors d JOIN visits v ON d.id = v.doctor_id LEFT JOIN rxs r ON d.id = r.doctor_id ORDER BY rx_per_visit DESC, v.completed_visits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute completed visits and prescriptions per doctor in dual CTEs.",
      "Calculate prescriptions-per-visit ratio in final SELECT."
    ],
    "solution_explanation": "Measures physician prescribing propensity per outpatient consultation.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-021",
    "domain": "healthcare",
    "level": 5,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Department Inpatient Bed Turnover and Census Ratio (CTE)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Inpatient bed turnover: Using a CTE, calculate total admissions and bed occupancy percentage for each department. Return department name, total admissions, and bed count.",
    "context_notes": "WITH dept_census AS (...) SELECT department_name, total_admissions, bed_count.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "COUNT"
    ],
    "expected_columns": [
      "department_name",
      "total_admissions",
      "bed_count"
    ],
    "reference_sql": "WITH dept_census AS (SELECT d.name AS department_name, COUNT(DISTINCT ia.id) AS total_admissions, COUNT(DISTINCT r.id) AS bed_count FROM departments d LEFT JOIN rooms r ON d.id = r.department_id LEFT JOIN inpatient_admissions ia ON r.id = ia.room_id GROUP BY d.id, d.name) SELECT department_name, total_admissions, bed_count FROM dept_census ORDER BY total_admissions DESC, bed_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join departments to rooms and admissions in CTE.",
      "Count admissions and total beds per department."
    ],
    "solution_explanation": "Evaluates inpatient capacity turnover and demand across service lines.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-022",
    "domain": "healthcare",
    "level": 5,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Top Billed Clinical Encounter per Doctor (ROW_NUMBER CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Physician encounter ceiling: Using a CTE with ROW_NUMBER, find the single highest fee completed appointment for each doctor. Return doctor name, specialty, appointment id, and fee.",
    "context_notes": "WITH ranked_encounters AS (...) SELECT doctor_name, specialty, id, fee WHERE rn = 1.",
    "concepts": [
      "WITH CTE",
      "ROW_NUMBER",
      "PARTITION BY",
      "WHERE"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "id",
      "fee"
    ],
    "reference_sql": "WITH ranked_encounters AS (SELECT d.name AS doctor_name, d.specialty, a.id, a.fee, ROW_NUMBER() OVER (PARTITION BY d.id ORDER BY a.fee DESC, a.id ASC) AS rn FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed') SELECT doctor_name, specialty, id, fee FROM ranked_encounters WHERE rn = 1 ORDER BY fee DESC, doctor_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Rank completed visits by fee DESC partitioned by doctor in CTE.",
      "Filter rn = 1."
    ],
    "solution_explanation": "Surfaces the maximum single encounter fee achieved by each clinical physician.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-023",
    "domain": "healthcare",
    "level": 5,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Severe Diagnoses Patient Age Profile (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Clinical risk epidemiology: Using a CTE, calculate average age and patient count for patients diagnosed with Severe conditions compared to Mild conditions. Return severity, patient count, and average patient age in years.",
    "context_notes": "WITH sev_age AS (...) SELECT severity, patient_count, avg_age_years.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "severity",
      "patient_count",
      "avg_age_years"
    ],
    "reference_sql": "WITH sev_age AS (SELECT dg.severity, COUNT(DISTINCT p.id) AS patient_count, ROUND(AVG(EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM p.dob)), 1) AS avg_age_years FROM diagnoses dg JOIN patients p ON dg.patient_id = p.id GROUP BY dg.severity) SELECT severity, patient_count, avg_age_years FROM sev_age ORDER BY patient_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses to patients in CTE.",
      "Compute distinct patient count and average age per severity tier."
    ],
    "solution_explanation": "Profiles demographic age variance across clinical acuity tiers.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-024",
    "domain": "healthcare",
    "level": 5,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Payer Claim Settlement Efficiency Index (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer speed-to-value score: Using a CTE, compute total claims, total approved dollars, and average settlement days for each health insurance carrier. Return insurance provider, approved claims, approved dollars, and avg settlement days.",
    "context_notes": "WITH payer_eff AS (...) SELECT insurance_provider, approved_claims, total_approved, avg_settlement_days.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "SUM",
      "AVG"
    ],
    "expected_columns": [
      "insurance_provider",
      "approved_claims",
      "total_approved",
      "avg_settlement_days"
    ],
    "reference_sql": "WITH payer_eff AS (SELECT insurance_provider, COUNT(id) AS approved_claims, ROUND(SUM(approved_amount), 2) AS total_approved, ROUND(AVG(settlement_days), 1) AS avg_settlement_days FROM insurance_claims WHERE status = 'approved' GROUP BY insurance_provider) SELECT insurance_provider, approved_claims, total_approved, avg_settlement_days FROM payer_eff ORDER BY total_approved DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate approved claims, approved dollars, and avg settlement days per payer in CTE.",
      "Order by total_approved DESC."
    ],
    "solution_explanation": "Comprehensive executive summary of third-party payer reimbursement yield.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-025",
    "domain": "healthcare",
    "level": 5,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Hospital Diagnostic panels Standard Pricing Index (CTE)",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Laboratory price list benchmark: Using a CTE, calculate the minimum standard fee, maximum standard fee, and average fee for lab tests in each category. Return category, test count, min fee, max fee, and avg fee.",
    "context_notes": "WITH lab_pricing AS (...) SELECT category, test_count, min_fee, max_fee, avg_fee.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "MIN",
      "MAX",
      "AVG"
    ],
    "expected_columns": [
      "category",
      "test_count",
      "min_fee",
      "max_fee",
      "avg_fee"
    ],
    "reference_sql": "WITH lab_pricing AS (SELECT category, COUNT(id) AS test_count, ROUND(MIN(standard_fee), 2) AS min_fee, ROUND(MAX(standard_fee), 2) AS max_fee, ROUND(AVG(standard_fee), 2) AS avg_fee FROM lab_tests GROUP BY category) SELECT category, test_count, min_fee, max_fee, avg_fee FROM lab_pricing ORDER BY avg_fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute min, max, avg fee per category in CTE.",
      "Select category, test_count, min_fee, max_fee, avg_fee."
    ],
    "solution_explanation": "Benchmarks price ranges across pathology divisions.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L5-026",
    "domain": "healthcare",
    "level": 5,
    "order": 26,
    "difficulty": "core",
    "title": "Comprehensive Hospital Outpatient Service Line P&L (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Department outpatient financial scorecard: Construct a 2-stage CTE pipeline. In Stage 1, calculate completed appointment count, total visit revenue, and total doctors per department. In Stage 2, compute revenue per doctor. Return department name, completed visits, doctors count, total revenue, and revenue per doctor.",
    "context_notes": "WITH dept_appts AS (...), dept_docs AS (...) SELECT department_name, visits, doctors, revenue, rev_per_doc.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "INNER JOIN",
      "GROUP BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "department_name",
      "completed_visits",
      "doctors_count",
      "total_revenue",
      "revenue_per_doctor"
    ],
    "reference_sql": "WITH dept_appts AS (SELECT d.id AS department_id, d.name AS department_name, COUNT(a.id) AS completed_visits, ROUND(SUM(a.fee), 2) AS total_revenue FROM departments d JOIN doctors doc ON d.id = doc.department_id JOIN appointments a ON doc.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.id, d.name), dept_docs AS (SELECT department_id, COUNT(id) AS doctors_count FROM doctors GROUP BY department_id) SELECT a.department_name, a.completed_visits, d.doctors_count, a.total_revenue, ROUND(a.total_revenue / NULLIF(d.doctors_count, 0), 2) AS revenue_per_doctor FROM dept_appts a JOIN dept_docs d ON a.department_id = d.department_id ORDER BY a.total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate completed appointments in dept_appts.",
      "Count doctors per department in dept_docs.",
      "Join and calculate revenue_per_doctor."
    ],
    "solution_explanation": "Executive department service line P&L measuring clinical revenue productivity per staffed physician.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-027",
    "domain": "healthcare",
    "level": 5,
    "order": 27,
    "difficulty": "core",
    "title": "Hospital Inpatient Accommodation Revenue Yield (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Inpatient capacity monetization: Using a 2-stage CTE, calculate total rooms, total occupied beds, and daily realized room revenue (occupied rooms * rate) per building location. Return building, total rooms, occupied rooms, occupancy pct, and daily realized revenue.",
    "context_notes": "WITH room_counts AS (...) SELECT building, total_rooms, occupied_rooms, occupancy_pct, realized_revenue.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "building",
      "total_rooms",
      "occupied_rooms",
      "occupancy_pct",
      "realized_revenue"
    ],
    "reference_sql": "WITH room_stats AS (SELECT d.building, COUNT(r.id) AS total_rooms, SUM(CASE WHEN r.is_occupied THEN 1 ELSE 0 END) AS occupied_rooms, ROUND(SUM(CASE WHEN r.is_occupied THEN r.daily_rate ELSE 0 END), 2) AS realized_revenue FROM rooms r JOIN departments d ON r.department_id = d.id GROUP BY d.building) SELECT building, total_rooms, occupied_rooms, ROUND(occupied_rooms::NUMERIC / NULLIF(total_rooms, 0) * 100.0, 1) AS occupancy_pct, realized_revenue FROM room_stats ORDER BY realized_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute rooms, occupied beds, and realized revenue per building in CTE.",
      "Calculate occupancy percentage in outer query."
    ],
    "solution_explanation": "Tracks inpatient room occupancy monetization across physical hospital towers.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-028",
    "domain": "healthcare",
    "level": 5,
    "order": 28,
    "difficulty": "core",
    "title": "Payer Net Realization vs Contractual Denial Scorecard (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer adjudication matrix: Using a 2-stage CTE, calculate gross claim dollars, approved dollars, and denied claims count for each insurance carrier. In Stage 2, calculate net realization percentage and denial percentage. Return carrier, gross claims, net approved, realization pct, and denial pct.",
    "context_notes": "WITH payer_claims AS (...) SELECT insurance_provider, gross_claim, net_approved, realization_pct, denial_pct.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "insurance_provider",
      "gross_claim",
      "net_approved",
      "realization_pct",
      "denial_pct"
    ],
    "reference_sql": "WITH payer_raw AS (SELECT insurance_provider, COUNT(id) AS total_claims, ROUND(SUM(claim_amount), 2) AS gross_claim, ROUND(SUM(approved_amount), 2) AS net_approved, SUM(CASE WHEN status = 'denied' THEN 1 ELSE 0 END) AS denied_count FROM insurance_claims GROUP BY insurance_provider) SELECT insurance_provider, gross_claim, net_approved, ROUND(net_approved / NULLIF(gross_claim, 0) * 100.0, 1) AS realization_pct, ROUND(denied_count::NUMERIC / NULLIF(total_claims, 0) * 100.0, 1) AS denial_pct FROM payer_raw ORDER BY realization_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute claim sums and denied count per payer in CTE.",
      "Calculate realization and denial percentages in outer query."
    ],
    "solution_explanation": "Payer scorecard benchmarking contractual yield and administrative friction.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-029",
    "domain": "healthcare",
    "level": 5,
    "order": 29,
    "difficulty": "core",
    "title": "Patient 360: Clinical Encounters, Diagnoses & Lab Volume (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Longitudinal patient summary: Using multi-stage CTEs, compute completed appointments count, diagnoses count, and lab tests count for each patient. Return patient first name, last name, completed visits, diagnoses count, and lab tests count.",
    "context_notes": "WITH appts AS (...), diags AS (...), labs AS (...) SELECT first_name, last_name, visits, diags, labs.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LEFT JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "completed_visits",
      "diagnoses_count",
      "lab_tests_count"
    ],
    "reference_sql": "WITH appts AS (SELECT patient_id, COUNT(id) AS completed_visits FROM appointments WHERE status = 'completed' GROUP BY patient_id), diags AS (SELECT patient_id, COUNT(id) AS diagnoses_count FROM diagnoses GROUP BY patient_id), labs AS (SELECT patient_id, COUNT(id) AS lab_tests_count FROM patient_lab_results GROUP BY patient_id) SELECT p.first_name, p.last_name, COALESCE(a.completed_visits, 0) AS completed_visits, COALESCE(d.diagnoses_count, 0) AS diagnoses_count, COALESCE(l.lab_tests_count, 0) AS lab_tests_count FROM patients p LEFT JOIN appts a ON p.id = a.patient_id LEFT JOIN diags d ON p.id = d.patient_id LEFT JOIN labs l ON p.id = l.patient_id ORDER BY completed_visits DESC, diagnoses_count DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate encounters across 3 CTEs (appointments, diagnoses, lab results).",
      "Join to patients table with COALESCE.",
      "Order by completed_visits DESC LIMIT 25."
    ],
    "solution_explanation": "Integrated patient 360 overview uniting clinical outpatient visits, diagnoses, and diagnostic labs.",
    "xp": 40,
    "estimated_minutes": 11
  },
  {
    "id": "hc-L5-030",
    "domain": "healthcare",
    "level": 5,
    "order": 30,
    "difficulty": "core",
    "title": "Physician Comprehensive Outpatient Billing & Prescribing Scorecard (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician 360 evaluation: Using multi-stage CTEs, compute total completed appointments, gross appointment revenue, and total prescriptions written per doctor. Return doctor name, specialty, completed visits, gross revenue, and total prescriptions.",
    "context_notes": "WITH doc_appts AS (...), doc_rxs AS (...) SELECT name, specialty, completed_visits, gross_revenue, total_prescriptions.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LEFT JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "completed_visits",
      "gross_revenue",
      "total_prescriptions"
    ],
    "reference_sql": "WITH doc_appts AS (SELECT doctor_id, COUNT(id) AS completed_visits, ROUND(SUM(fee), 2) AS gross_revenue FROM appointments WHERE status = 'completed' GROUP BY doctor_id), doc_rxs AS (SELECT doctor_id, COUNT(id) AS total_prescriptions FROM prescriptions GROUP BY doctor_id) SELECT d.name, d.specialty, COALESCE(a.completed_visits, 0) AS completed_visits, COALESCE(a.gross_revenue, 0.00) AS gross_revenue, COALESCE(r.total_prescriptions, 0) AS total_prescriptions FROM doctors d LEFT JOIN doc_appts a ON d.id = a.doctor_id LEFT JOIN doc_rxs r ON d.id = r.doctor_id ORDER BY gross_revenue DESC, total_prescriptions DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute visit revenue and prescriptions in dual CTEs.",
      "Join to doctors table.",
      "Order by gross_revenue DESC."
    ],
    "solution_explanation": "Clinical practice balance sheet tracking consultation productivity and pharmacotherapy authorization.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-031",
    "domain": "healthcare",
    "level": 5,
    "order": 31,
    "difficulty": "core",
    "title": "Hospital Total Inpatient Bed Days and Occupancy Rate (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Inpatient utilization census: Using a CTE, calculate total inpatient admissions, total cumulative bed days (discharge_date - admission_date), and average length of stay per admitting doctor. Return doctor name, specialty, total admissions, and total bed days.",
    "context_notes": "WITH adm_stats AS (...) SELECT doc.name, doc.specialty, adm.admissions_count, adm.total_bed_days.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "admissions_count",
      "total_bed_days",
      "avg_stay_days"
    ],
    "reference_sql": "WITH adm_stats AS (SELECT admitting_doctor_id, COUNT(id) AS admissions_count, SUM(discharge_date - admission_date) AS total_bed_days, ROUND(AVG(discharge_date - admission_date), 1) AS avg_stay_days FROM inpatient_admissions WHERE discharge_date IS NOT NULL GROUP BY admitting_doctor_id) SELECT d.name, d.specialty, a.admissions_count, a.total_bed_days, a.avg_stay_days FROM doctors d JOIN adm_stats a ON d.id = a.admitting_doctor_id ORDER BY a.total_bed_days DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate admissions and length of stay per admitting doctor in CTE.",
      "Join to doctors and order by total_bed_days DESC."
    ],
    "solution_explanation": "Measures physician inpatient bed utilization impact across surgical and medical services.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-032",
    "domain": "healthcare",
    "level": 5,
    "order": 32,
    "difficulty": "core",
    "title": "Clinical Diagnostic Prevalence vs Prescription Adherence (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Care gap surveillance: Using multi-stage CTEs, count how many patients have received an ICD-10 diagnosis code vs how many have received a prescription for that condition. Return ICD-10 code, diagnosis description, and total diagnosed cases.",
    "context_notes": "WITH diag_cases AS (...) SELECT icd10_code, description, diagnosed_patients.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "COUNT DISTINCT"
    ],
    "expected_columns": [
      "icd10_code",
      "description",
      "diagnosed_patients"
    ],
    "reference_sql": "WITH diag_cases AS (SELECT icd10_code, description, COUNT(DISTINCT patient_id) AS diagnosed_patients FROM diagnoses GROUP BY icd10_code, description) SELECT icd10_code, description, diagnosed_patients FROM diag_cases ORDER BY diagnosed_patients DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate diagnosed patients per ICD code in CTE.",
      "Select icd10_code, description, diagnosed_patients."
    ],
    "solution_explanation": "Epidemiological foundation for monitoring clinical chronic disease management.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-033",
    "domain": "healthcare",
    "level": 5,
    "order": 33,
    "difficulty": "core",
    "title": "Accounts Receivable Outstanding Balances by Patient City (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Community financial exposure: Using a CTE, calculate total billed charges, total insurance covered, and total patient balance owed across all patient cities. Return city, total billed, insurance covered, and patient balance.",
    "context_notes": "WITH city_ar AS (...) SELECT city, total_billed, total_insurance_covered, total_patient_balance.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "city",
      "total_billed",
      "total_insurance_covered",
      "total_patient_balance"
    ],
    "reference_sql": "WITH city_ar AS (SELECT p.city, ROUND(SUM(b.total_charge), 2) AS total_billed, ROUND(SUM(b.insurance_covered), 2) AS total_insurance_covered, ROUND(SUM(b.patient_balance), 2) AS total_patient_balance FROM billing b JOIN patients p ON b.patient_id = p.id GROUP BY p.city) SELECT city, total_billed, total_insurance_covered, total_patient_balance FROM city_ar ORDER BY total_patient_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing to patients in CTE.",
      "Sum total_charge, insurance_covered, and patient_balance per city."
    ],
    "solution_explanation": "Evaluates community health system financial receivables and self-pay burden.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-034",
    "domain": "healthcare",
    "level": 5,
    "order": 34,
    "difficulty": "core",
    "title": "Operating Room Capacity and Procedural Cost by Floor (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Campus surgical facilities: Using a multi-stage CTE, calculate total surgical procedures, total procedural duration minutes, and total procedural cost for each hospital floor. Return building, floor, procedure count, and total cost.",
    "context_notes": "WITH dept_procs AS (...) SELECT building, floor, procedure_count, total_cost.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "building",
      "floor",
      "procedure_count",
      "total_cost"
    ],
    "reference_sql": "WITH dept_procs AS (SELECT d.building, d.floor, COUNT(p.id) AS procedure_count, ROUND(SUM(p.standard_cost), 2) AS total_cost FROM departments d JOIN medical_procedures p ON d.id = p.department_id GROUP BY d.building, d.floor) SELECT building, floor, procedure_count, total_cost FROM dept_procs ORDER BY total_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join departments to medical_procedures in CTE.",
      "Aggregate by building and floor."
    ],
    "solution_explanation": "Maps procedural throughput and infrastructure cost across hospital facilities.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-035",
    "domain": "healthcare",
    "level": 5,
    "order": 35,
    "difficulty": "core",
    "title": "Top Revenue Generating Doctors by Department (ROW_NUMBER CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Department clinical leadership: Using a CTE with ROW_NUMBER, find the single highest completed revenue generating doctor in each department. Return department name, doctor name, completed visits, and gross revenue.",
    "context_notes": "WITH doc_rev AS (...) SELECT department_name, doctor_name, completed_visits, gross_revenue WHERE rn = 1.",
    "concepts": [
      "WITH CTE",
      "ROW_NUMBER",
      "PARTITION BY",
      "INNER JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "department_name",
      "doctor_name",
      "completed_visits",
      "gross_revenue"
    ],
    "reference_sql": "WITH doc_rev AS (SELECT dept.name AS department_name, doc.name AS doctor_name, COUNT(a.id) AS completed_visits, ROUND(SUM(a.fee), 2) AS gross_revenue, ROW_NUMBER() OVER (PARTITION BY dept.id ORDER BY SUM(a.fee) DESC) AS rn FROM departments dept JOIN doctors doc ON dept.id = doc.department_id JOIN appointments a ON doc.id = a.doctor_id WHERE a.status = 'completed' GROUP BY dept.id, dept.name, doc.id, doc.name) SELECT department_name, doctor_name, completed_visits, gross_revenue FROM doc_rev WHERE rn = 1 ORDER BY gross_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute revenue and rank with ROW_NUMBER() partitioned by department in CTE.",
      "Filter rn = 1 in outer query."
    ],
    "solution_explanation": "Surfaces premier clinical revenue leaders across every hospital department.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-036",
    "domain": "healthcare",
    "level": 5,
    "order": 36,
    "difficulty": "core",
    "title": "Patient Incurred Hospital Charges Stratification (NTILE CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Patient financial segmentation: Using a CTE, aggregate total billed charges per patient, then divide patients into 4 financial liability quartiles using NTILE(4). Return patient_id, total billed, and quartile tier.",
    "context_notes": "WITH pt_totals AS (...) SELECT patient_id, total_billed, NTILE(4) OVER (ORDER BY total_billed DESC).",
    "concepts": [
      "WITH CTE",
      "NTILE",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "patient_id",
      "total_billed",
      "liability_quartile"
    ],
    "reference_sql": "WITH pt_totals AS (SELECT patient_id, ROUND(SUM(total_charge), 2) AS total_billed FROM billing GROUP BY patient_id) SELECT patient_id, total_billed, NTILE(4) OVER (ORDER BY total_billed DESC) AS liability_quartile FROM pt_totals ORDER BY liability_quartile, total_billed DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Sum total_charge per patient in CTE.",
      "Apply NTILE(4) OVER (ORDER BY total_billed DESC) in outer query."
    ],
    "solution_explanation": "Classifies patient population into 4 financial liability tiers for credit risk analysis.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-037",
    "domain": "healthcare",
    "level": 5,
    "order": 37,
    "difficulty": "core",
    "title": "Pathology Diagnostic Panel Turnaround and Volume (CTE)",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Laboratory activity review: Using a CTE, compute total tests ordered, abnormal result flags count, and total standard fee billing potential for each diagnostic category. Return category, tests ordered, abnormal count, and gross billing potential.",
    "context_notes": "WITH lab_summary AS (...) SELECT category, tests_ordered, abnormal_count, gross_billing_potential.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "category",
      "tests_ordered",
      "abnormal_count",
      "gross_billing_potential"
    ],
    "reference_sql": "WITH lab_summary AS (SELECT lt.category, COUNT(plr.id) AS tests_ordered, SUM(CASE WHEN plr.flag IN ('HIGH', 'LOW') THEN 1 ELSE 0 END) AS abnormal_count, ROUND(SUM(lt.standard_fee), 2) AS gross_billing_potential FROM lab_tests lt LEFT JOIN patient_lab_results plr ON lt.id = plr.test_id GROUP BY lt.category) SELECT category, tests_ordered, abnormal_count, gross_billing_potential FROM lab_summary ORDER BY gross_billing_potential DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate tests, abnormal flags, and standard fee potential per category in CTE.",
      "Order by gross_billing_potential DESC."
    ],
    "solution_explanation": "Evaluates laboratory test volumes and diagnostic service billing yield.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-038",
    "domain": "healthcare",
    "level": 5,
    "order": 38,
    "difficulty": "core",
    "title": "Department Nurse-to-Patient Appointment Load Ratio (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Staffing workload balance: Using a multi-stage CTE, count completed appointments and total staffed nurses in each department. Calculate the appointments-per-nurse workload ratio. Return department name, completed visits, nurse count, and visits per nurse.",
    "context_notes": "WITH appts AS (...), nurses_count AS (...) SELECT department_name, visits, nurses, visits_per_nurse.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "INNER JOIN",
      "GROUP BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "department_name",
      "completed_visits",
      "nurses_count",
      "visits_per_nurse"
    ],
    "reference_sql": "WITH appts AS (SELECT d.id AS department_id, d.name AS department_name, COUNT(a.id) AS completed_visits FROM departments d JOIN doctors doc ON d.id = doc.department_id JOIN appointments a ON doc.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.id, d.name), nurses_count AS (SELECT department_id, COUNT(id) AS nurse_count FROM nurses GROUP BY department_id) SELECT a.department_name, a.completed_visits, n.nurse_count AS nurses_count, ROUND(a.completed_visits::NUMERIC / NULLIF(n.nurse_count, 0), 1) AS visits_per_nurse FROM appts a JOIN nurses_count n ON a.department_id = n.department_id ORDER BY visits_per_nurse DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute completed appointments and nurse count per department in dual CTEs.",
      "Calculate visits_per_nurse ratio."
    ],
    "solution_explanation": "Evaluates nursing workload strain relative to outpatient clinical throughput.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-039",
    "domain": "healthcare",
    "level": 5,
    "order": 39,
    "difficulty": "core",
    "title": "Insurance Claims Settlement Delay Outliers (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Adjudication latency audit: Using a CTE that computes average settlement days per insurance provider, identify claims that took strictly longer than their provider average plus 5 days. Return claim id, insurance provider, settlement days, and provider avg settlement days.",
    "context_notes": "WITH payer_avg AS (...) SELECT c.id, c.insurance_provider, c.settlement_days, p.avg_days WHERE settlement_days > avg_days + 5.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "WHERE",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "id",
      "insurance_provider",
      "settlement_days",
      "avg_settlement_days"
    ],
    "reference_sql": "WITH payer_avg AS (SELECT insurance_provider, ROUND(AVG(settlement_days), 1) AS avg_settlement_days FROM insurance_claims GROUP BY insurance_provider) SELECT c.id, c.insurance_provider, c.settlement_days, p.avg_settlement_days FROM insurance_claims c JOIN payer_avg p ON c.insurance_provider = p.insurance_provider WHERE c.settlement_days > (p.avg_settlement_days + 5) ORDER BY c.settlement_days DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute average settlement days per provider in CTE.",
      "Filter claims where settlement_days > avg_settlement_days + 5."
    ],
    "solution_explanation": "Isolates severe claim adjudication delays exceeding health plan benchmarks.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-040",
    "domain": "healthcare",
    "level": 5,
    "order": 40,
    "difficulty": "core",
    "title": "Clinical Diagnostic Acuity Breakdown per Hospital Department (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Department clinical complexity index: Using a CTE, count mild, moderate, and severe diagnoses for each department. Compute the severe case percentage. Return department name, severe count, total diagnoses, and severe case pct.",
    "context_notes": "WITH dept_diags AS (...) SELECT department_name, severe_count, total_diagnoses, severe_case_pct.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "department_name",
      "severe_count",
      "total_diagnoses",
      "severe_case_pct"
    ],
    "reference_sql": "WITH dept_diags AS (SELECT dept.name AS department_name, SUM(CASE WHEN dg.severity = 'Severe' THEN 1 ELSE 0 END) AS severe_count, COUNT(dg.id) AS total_diagnoses FROM departments dept JOIN doctors doc ON dept.id = doc.department_id JOIN appointments a ON doc.id = a.doctor_id JOIN diagnoses dg ON a.id = dg.appointment_id GROUP BY dept.id, dept.name) SELECT department_name, severe_count, total_diagnoses, ROUND(severe_count::NUMERIC / NULLIF(total_diagnoses, 0) * 100.0, 1) AS severe_case_pct FROM dept_diags ORDER BY severe_case_pct DESC, severe_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate severe and total diagnoses per department in CTE.",
      "Compute severe percentage in outer query."
    ],
    "solution_explanation": "Assesses case-mix acuity across hospital clinical divisions.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-041",
    "domain": "healthcare",
    "level": 5,
    "order": 41,
    "difficulty": "core",
    "title": "Most Frequent Clinical Diagnoses with Average Incurred Bill (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Diagnosis financial footprint: Using a CTE that links diagnoses to billing via appointments, compute total recorded cases and average total billed charge for each ICD-10 diagnosis. Return ICD-10 code, description, case count, and average charge.",
    "context_notes": "WITH diag_billing AS (...) SELECT icd10_code, description, case_count, avg_charge.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "icd10_code",
      "description",
      "case_count",
      "avg_charge"
    ],
    "reference_sql": "WITH diag_billing AS (SELECT dg.icd10_code, dg.description, COUNT(dg.id) AS case_count, ROUND(AVG(b.total_charge), 2) AS avg_charge FROM diagnoses dg JOIN billing b ON dg.appointment_id = b.appointment_id GROUP BY dg.icd10_code, dg.description) SELECT icd10_code, description, case_count, avg_charge FROM diag_billing ORDER BY case_count DESC, avg_charge DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses to billing in CTE.",
      "Group by ICD code and description, computing count and avg charge."
    ],
    "solution_explanation": "Links clinical disease prevalence directly to encounter financial charges.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-042",
    "domain": "healthcare",
    "level": 5,
    "order": 42,
    "difficulty": "core",
    "title": "Hospital Inpatient Bed Occupancy Revenue Potential (CTE)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Bed capacity economics: Using a CTE, calculate total rooms, total occupied rooms, and currently realized daily revenue (occupied rooms * rate) per room type. Return room type, total rooms, occupied rooms, and daily realized revenue.",
    "context_notes": "WITH room_type_stats AS (...) SELECT room_type, total_rooms, occupied_rooms, daily_revenue.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "room_type",
      "total_rooms",
      "occupied_rooms",
      "daily_revenue"
    ],
    "reference_sql": "WITH room_type_stats AS (SELECT room_type, COUNT(id) AS total_rooms, SUM(CASE WHEN is_occupied THEN 1 ELSE 0 END) AS occupied_rooms, ROUND(SUM(CASE WHEN is_occupied THEN daily_rate ELSE 0 END), 2) AS daily_revenue FROM rooms GROUP BY room_type) SELECT room_type, total_rooms, occupied_rooms, daily_revenue FROM room_type_stats ORDER BY daily_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group rooms by room_type in CTE.",
      "Compute total rooms, occupied count, and realized revenue."
    ],
    "solution_explanation": "Monitors inpatient revenue yield by accommodation category.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-043",
    "domain": "healthcare",
    "level": 5,
    "order": 43,
    "difficulty": "core",
    "title": "Physician Practice Diversity: Consultations, Prescriptions & Inpatient (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Full practice clinical profile: Using a 3-stage CTE, count completed appointments, prescriptions authorized, and inpatient admissions managed per doctor. Return doctor name, specialty, completed visits, prescriptions, and inpatient admissions.",
    "context_notes": "WITH appts AS (...), rxs AS (...), adms AS (...) SELECT name, specialty, visits, rxs, adms.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LEFT JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "completed_visits",
      "prescriptions_count",
      "admissions_count"
    ],
    "reference_sql": "WITH appts AS (SELECT doctor_id, COUNT(id) AS completed_visits FROM appointments WHERE status = 'completed' GROUP BY doctor_id), rxs AS (SELECT doctor_id, COUNT(id) AS prescriptions_count FROM prescriptions GROUP BY doctor_id), adms AS (SELECT admitting_doctor_id, COUNT(id) AS admissions_count FROM inpatient_admissions GROUP BY admitting_doctor_id) SELECT d.name, d.specialty, COALESCE(a.completed_visits, 0) AS completed_visits, COALESCE(r.prescriptions_count, 0) AS prescriptions_count, COALESCE(ad.admissions_count, 0) AS admissions_count FROM doctors d LEFT JOIN appts a ON d.id = a.doctor_id LEFT JOIN rxs r ON d.id = r.doctor_id LEFT JOIN adms ad ON d.id = ad.admitting_doctor_id ORDER BY completed_visits DESC, admissions_count DESC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate encounters across 3 CTEs (outpatient visits, prescriptions, inpatient admissions).",
      "Join to doctors table.",
      "Order by completed_visits DESC LIMIT 24."
    ],
    "solution_explanation": "Holistic 360-degree physician practice profile integrating outpatient, inpatient, and pharmacy activity.",
    "xp": 40,
    "estimated_minutes": 11
  },
  {
    "id": "hc-L5-044",
    "domain": "healthcare",
    "level": 5,
    "order": 44,
    "difficulty": "core",
    "title": "Health Plan Inpatient Financial Liability Exposure (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Carrier inpatient risk: Using a CTE that joins inpatient admissions to rooms, patients, and billing, calculate total billed charges, insurance covered, and patient balance owed by insurance provider. Return insurance provider, total billed, insurance covered, and patient balance.",
    "context_notes": "WITH payer_inpatient AS (...) SELECT insurance_provider, total_billed, insurance_covered, patient_balance.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "insurance_provider",
      "total_billed",
      "insurance_covered",
      "patient_balance"
    ],
    "reference_sql": "WITH payer_inpatient AS (SELECT p.insurance_provider, ROUND(SUM(b.total_charge), 2) AS total_billed, ROUND(SUM(b.insurance_covered), 2) AS total_insurance_covered, ROUND(SUM(b.patient_balance), 2) AS total_patient_balance FROM billing b JOIN patients p ON b.patient_id = p.id GROUP BY p.insurance_provider) SELECT insurance_provider, total_billed, total_insurance_covered, total_patient_balance FROM payer_inpatient ORDER BY total_billed DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing to patients in CTE.",
      "Sum total_charge, insurance_covered, and patient_balance per provider."
    ],
    "solution_explanation": "Profiles financial exposure across commercial and government health plans.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-045",
    "domain": "healthcare",
    "level": 5,
    "order": 45,
    "difficulty": "core",
    "title": "Emergency and High-Severity Outpatient Consultations by Department (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Acuity surge review: Using a CTE, count Urgent appointments and high-fee consultations (fee > $200) for each clinical department. Return department name, urgent appointments, and high-fee encounters count.",
    "context_notes": "WITH urgent_stats AS (...) SELECT department_name, urgent_count, high_fee_count.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "department_name",
      "urgent_count",
      "high_fee_count"
    ],
    "reference_sql": "WITH urgent_stats AS (SELECT dept.name AS department_name, SUM(CASE WHEN a.appointment_type = 'Urgent' THEN 1 ELSE 0 END) AS urgent_count, SUM(CASE WHEN a.fee > 200.00 THEN 1 ELSE 0 END) AS high_fee_count FROM departments dept JOIN doctors doc ON dept.id = doc.department_id JOIN appointments a ON doc.id = a.doctor_id GROUP BY dept.id, dept.name) SELECT department_name, urgent_count, high_fee_count FROM urgent_stats ORDER BY urgent_count DESC, high_fee_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join departments to doctors to appointments in CTE.",
      "Compute urgent count and high-fee count."
    ],
    "solution_explanation": "Identifies acute care demand distribution across hospital service lines.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-046",
    "domain": "healthcare",
    "level": 5,
    "order": 46,
    "difficulty": "core",
    "title": "Diabetic vs Hypertensive Patient Incurred Charge Comparison (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Chronic disease economics: Using a 2-stage CTE, calculate total patients, total hospital billing, and average charge per patient for Type 2 Diabetes (E11.9) vs Essential Hypertension (I10). Return ICD-10 code, description, patient count, and average charge.",
    "context_notes": "WITH diag_pts AS (...), diag_spend AS (...) SELECT icd10_code, description, patient_count, avg_charge.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "INNER JOIN",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "icd10_code",
      "description",
      "patient_count",
      "avg_charge"
    ],
    "reference_sql": "WITH diag_billing AS (SELECT dg.icd10_code, dg.description, dg.patient_id, b.total_charge FROM diagnoses dg JOIN billing b ON dg.appointment_id = b.appointment_id WHERE dg.icd10_code IN ('E11.9', 'I10')) SELECT icd10_code, description, COUNT(DISTINCT patient_id) AS patient_count, ROUND(AVG(total_charge), 2) AS avg_charge FROM diag_billing GROUP BY icd10_code, description ORDER BY avg_charge DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter diagnoses for diabetes and hypertension joined to billing in CTE.",
      "Compute distinct patient count and average charge."
    ],
    "solution_explanation": "Compares disease-specific healthcare expenditure for dominant chronic conditions.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-047",
    "domain": "healthcare",
    "level": 5,
    "order": 47,
    "difficulty": "core",
    "title": "Hospital Inpatient Readmission Rate by Admitting Doctor (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician readmission index: Using a CTE with LAG(), count total admissions and readmissions occurring within 30 days for each admitting doctor. Return doctor name, specialty, total admissions, and readmission count.",
    "context_notes": "WITH readms AS (...) SELECT name, specialty, total_admissions, readmission_count.",
    "concepts": [
      "WITH CTE",
      "LAG",
      "PARTITION BY",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "total_admissions",
      "readmission_count"
    ],
    "reference_sql": "WITH readms AS (SELECT admitting_doctor_id, id, admission_date, (admission_date - LAG(discharge_date, 1) OVER (PARTITION BY patient_id ORDER BY admission_date ASC)) AS days_between FROM inpatient_admissions) SELECT d.name, d.specialty, COUNT(r.id) AS total_admissions, SUM(CASE WHEN r.days_between IS NOT NULL AND r.days_between <= 30 THEN 1 ELSE 0 END) AS readmission_count FROM doctors d JOIN readms r ON d.id = r.admitting_doctor_id GROUP BY d.id, d.name, d.specialty ORDER BY readmission_count DESC, total_admissions DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute readmission interval with LAG() in CTE.",
      "Aggregate admissions and 30-day readmissions per admitting physician."
    ],
    "solution_explanation": "Evaluates clinical physician performance against quality readmission metrics.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-048",
    "domain": "healthcare",
    "level": 5,
    "order": 48,
    "difficulty": "core",
    "title": "Top Cost Medication Prescriptions by Specialty (ROW_NUMBER CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Specialty pharmacotherapy expense ceiling: Using a CTE with ROW_NUMBER, find the single highest unit-cost medication prescribed by each doctor specialty. Return specialty, medication name, and unit cost.",
    "context_notes": "WITH ranked_meds AS (...) SELECT specialty, medication_name, unit_cost WHERE rn = 1.",
    "concepts": [
      "WITH CTE",
      "ROW_NUMBER",
      "PARTITION BY",
      "INNER JOIN"
    ],
    "expected_columns": [
      "specialty",
      "medication_name",
      "unit_cost"
    ],
    "reference_sql": "WITH ranked_meds AS (SELECT d.specialty, pr.medication_name, m.unit_cost, ROW_NUMBER() OVER (PARTITION BY d.specialty ORDER BY m.unit_cost DESC, pr.medication_name ASC) AS rn FROM prescriptions pr JOIN doctors d ON pr.doctor_id = d.id JOIN medications m ON pr.medication_name = m.name) SELECT specialty, medication_name, unit_cost FROM ranked_meds WHERE rn = 1 ORDER BY unit_cost DESC, specialty;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions to doctors and medications in CTE.",
      "Rank by unit_cost DESC partitioned by specialty.",
      "Filter rn = 1."
    ],
    "solution_explanation": "Surfaces the peak-cost therapeutic agent authorized in each medical discipline.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-049",
    "domain": "healthcare",
    "level": 5,
    "order": 49,
    "difficulty": "core",
    "title": "Hospital Outpatient Visit Adherence by Day of Week (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Operational clinic flow: Using a CTE, calculate completed visits and no-show appointments for each day of the week (using EXTRACT DOW). Return day of week number, completed count, and no-show count.",
    "context_notes": "WITH dow_stats AS (...) SELECT day_of_week, completed_count, no_show_count.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "SUM CASE",
      "EXTRACT"
    ],
    "expected_columns": [
      "day_of_week",
      "completed_count",
      "no_show_count"
    ],
    "reference_sql": "WITH dow_stats AS (SELECT EXTRACT(DOW FROM appointment_date) AS day_of_week, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_count, SUM(CASE WHEN status = 'no_show' THEN 1 ELSE 0 END) AS no_show_count FROM appointments GROUP BY EXTRACT(DOW FROM appointment_date)) SELECT day_of_week, completed_count, no_show_count FROM dow_stats ORDER BY day_of_week ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Extract DOW from appointment_date in CTE.",
      "Aggregate completed and no-show counts by day of week."
    ],
    "solution_explanation": "Optimizes outpatient clinic scheduling and front-desk staffing across the weekly calendar.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-050",
    "domain": "healthcare",
    "level": 5,
    "order": 50,
    "difficulty": "core",
    "title": "Integrated Payer Financial Health and Claim Velocity (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer master intelligence: Using a 2-stage CTE, calculate gross claims, approved claims, total approved dollars, and average settlement days for each insurance provider. Return insurance provider, total claims, approved claims, approved dollars, and avg settlement days.",
    "context_notes": "WITH payer_claims AS (...) SELECT insurance_provider, total_claims, approved_claims, total_approved, avg_settlement_days.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "SUM",
      "AVG"
    ],
    "expected_columns": [
      "insurance_provider",
      "total_claims",
      "approved_claims",
      "total_approved",
      "avg_settlement_days"
    ],
    "reference_sql": "WITH payer_claims AS (SELECT insurance_provider, COUNT(id) AS total_claims, SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_claims, ROUND(SUM(approved_amount), 2) AS total_approved, ROUND(AVG(settlement_days), 1) AS avg_settlement_days FROM insurance_claims GROUP BY insurance_provider) SELECT insurance_provider, total_claims, approved_claims, total_approved, avg_settlement_days FROM payer_claims ORDER BY total_approved DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate claim metrics per insurance provider in CTE.",
      "Select carrier financial and velocity KPIs."
    ],
    "solution_explanation": "Executive health plan review benchmarking contractual yield and settlement turnaround.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-051",
    "domain": "healthcare",
    "level": 5,
    "order": 51,
    "difficulty": "advanced",
    "title": "Hospital Consolidated Department Revenue Model (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Service line consolidated revenue: Construct a multi-stage CTE combining outpatient appointment fees, inpatient room daily rates for occupied rooms, and standard medical procedure costs per department. Return department name, appointment revenue, room revenue, and procedure revenue.",
    "context_notes": "WITH appt_rev AS (...), room_rev AS (...), proc_rev AS (...) SELECT department_name, appt_rev, room_rev, proc_rev.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LEFT JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "department_name",
      "appt_revenue",
      "room_revenue",
      "proc_revenue"
    ],
    "reference_sql": "WITH appt_rev AS (SELECT dept.id AS department_id, dept.name AS department_name, ROUND(SUM(a.fee), 2) AS appt_revenue FROM departments dept JOIN doctors doc ON dept.id = doc.department_id JOIN appointments a ON doc.id = a.doctor_id WHERE a.status = 'completed' GROUP BY dept.id, dept.name), room_rev AS (SELECT department_id, ROUND(SUM(daily_rate), 2) AS room_revenue FROM rooms WHERE is_occupied = TRUE GROUP BY department_id), proc_rev AS (SELECT department_id, ROUND(SUM(standard_cost), 2) AS proc_revenue FROM medical_procedures GROUP BY department_id) SELECT a.department_name, COALESCE(a.appt_revenue, 0.00) AS appt_revenue, COALESCE(r.room_revenue, 0.00) AS room_revenue, COALESCE(p.proc_revenue, 0.00) AS proc_revenue FROM appt_rev a LEFT JOIN room_rev r ON a.department_id = r.department_id LEFT JOIN proc_rev p ON a.department_id = p.department_id ORDER BY a.appt_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate revenue streams in 3 separate CTEs (outpatient, inpatient beds, procedures).",
      "Join on department_id with COALESCE.",
      "Order by appt_revenue DESC."
    ],
    "solution_explanation": "Enterprise consolidated revenue breakdown uniting ambulatory, bed, and surgical income streams.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L5-052",
    "domain": "healthcare",
    "level": 5,
    "order": 52,
    "difficulty": "advanced",
    "title": "Physician Productivity vs Prescription Volume Matrix (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician efficiency matrix: Using a CTE, calculate completed consultations, total visit fees, and prescriptions written for each doctor. Categorize doctors into: High Productivity (fees >= $1000), Moderate ($500-$999), Low (< $500). Return doctor name, specialty, completed visits, total fees, and productivity tier.",
    "context_notes": "WITH doc_matrix AS (...) SELECT name, specialty, visits, total_fees, productivity_tier.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "CASE WHEN"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "completed_visits",
      "total_fees",
      "productivity_tier"
    ],
    "reference_sql": "WITH doc_matrix AS (SELECT d.name, d.specialty, COUNT(a.id) AS completed_visits, ROUND(SUM(a.fee), 2) AS total_fees FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.id, d.name, d.specialty) SELECT name, specialty, completed_visits, total_fees, CASE WHEN total_fees >= 1000.00 THEN 'High Productivity' WHEN total_fees BETWEEN 500.00 AND 999.99 THEN 'Moderate' ELSE 'Low' END AS productivity_tier FROM doc_matrix ORDER BY total_fees DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute completed visits and total fees in CTE.",
      "Classify into productivity tiers using CASE in outer query."
    ],
    "solution_explanation": "Segments medical staff into clinical productivity cohorts for leadership reviews.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-053",
    "domain": "healthcare",
    "level": 5,
    "order": 53,
    "difficulty": "advanced",
    "title": "Hospital Inpatient Bed Occupancy and Staffing Balance (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Campus acuity staffing index: Using a 2-stage CTE, calculate total beds, occupied beds, and Day shift nurses per department. Calculate the occupied-beds-per-day-nurse ratio. Return department name, occupied beds, Day nurses, and bed-to-nurse ratio.",
    "context_notes": "WITH bed_stats AS (...), nurse_stats AS (...) SELECT department_name, occupied_beds, day_nurses, ratio.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "INNER JOIN",
      "GROUP BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "department_name",
      "occupied_beds",
      "day_nurses",
      "beds_per_day_nurse"
    ],
    "reference_sql": "WITH bed_stats AS (SELECT d.id AS department_id, d.name AS department_name, SUM(CASE WHEN r.is_occupied THEN 1 ELSE 0 END) AS occupied_beds FROM departments d LEFT JOIN rooms r ON d.id = r.department_id GROUP BY d.id, d.name), nurse_stats AS (SELECT department_id, SUM(CASE WHEN shift = 'Day' THEN 1 ELSE 0 END) AS day_nurses FROM nurses GROUP BY department_id) SELECT b.department_name, b.occupied_beds, n.day_nurses, ROUND(b.occupied_beds::NUMERIC / NULLIF(n.day_nurses, 0), 2) AS beds_per_day_nurse FROM bed_stats b JOIN nurse_stats n ON b.department_id = n.department_id ORDER BY beds_per_day_nurse DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute occupied beds and day nurses in dual CTEs.",
      "Calculate beds_per_day_nurse ratio."
    ],
    "solution_explanation": "Evaluates critical nurse-to-patient staffing safety thresholds.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-054",
    "domain": "healthcare",
    "level": 5,
    "order": 54,
    "difficulty": "advanced",
    "title": "Payer Bad Debt & Overdue Balance Aging Risk (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Health plan risk profiling: Using a CTE, calculate total overdue vouchers, overdue patient balance sum, and average overdue balance for each insurance carrier. Return insurance provider, overdue count, total overdue balance, and average balance.",
    "context_notes": "WITH overdue_stats AS (...) SELECT insurance_provider, overdue_count, total_overdue_balance, avg_overdue_balance.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "AVG"
    ],
    "expected_columns": [
      "insurance_provider",
      "overdue_count",
      "total_overdue_balance",
      "avg_overdue_balance"
    ],
    "reference_sql": "WITH overdue_stats AS (SELECT p.insurance_provider, COUNT(b.id) AS overdue_count, ROUND(SUM(b.patient_balance), 2) AS total_overdue_balance, ROUND(AVG(b.patient_balance), 2) AS avg_overdue_balance FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.status = 'overdue' GROUP BY p.insurance_provider) SELECT insurance_provider, overdue_count, total_overdue_balance, avg_overdue_balance FROM overdue_stats ORDER BY total_overdue_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join overdue billing records to patients in CTE.",
      "Sum and average patient_balance per insurance provider."
    ],
    "solution_explanation": "Evaluates bad-debt write-off risks across commercial and public health plans.",
    "xp": 45,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-055",
    "domain": "healthcare",
    "level": 5,
    "order": 55,
    "difficulty": "advanced",
    "title": "High Acuity Patient Clinical Touchpoint Summary (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Severe patient clinical audit: Using a 3-stage CTE, identify patients diagnosed with Severe conditions, and calculate their completed appointments count and total laboratory tests performed. Return patient first name, last name, severe diagnoses count, completed visits, and lab tests count.",
    "context_notes": "WITH sev_pts AS (...), appt_counts AS (...), lab_counts AS (...) SELECT first_name, last_name, severe_count, visits, labs.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "INNER JOIN",
      "LEFT JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "severe_diagnoses_count",
      "completed_visits",
      "lab_tests_count"
    ],
    "reference_sql": "WITH sev_pts AS (SELECT patient_id, COUNT(id) AS severe_count FROM diagnoses WHERE severity = 'Severe' GROUP BY patient_id), appt_counts AS (SELECT patient_id, COUNT(id) AS completed_visits FROM appointments WHERE status = 'completed' GROUP BY patient_id), lab_counts AS (SELECT patient_id, COUNT(id) AS lab_tests_count FROM patient_lab_results GROUP BY patient_id) SELECT p.first_name, p.last_name, s.severe_count AS severe_diagnoses_count, COALESCE(a.completed_visits, 0) AS completed_visits, COALESCE(l.lab_tests_count, 0) AS lab_tests_count FROM patients p JOIN sev_pts s ON p.id = s.patient_id LEFT JOIN appt_counts a ON p.id = a.patient_id LEFT JOIN lab_counts l ON p.id = l.patient_id ORDER BY s.severe_count DESC, completed_visits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients with Severe diagnoses in sev_pts CTE.",
      "Join with outpatient visits and lab test counts.",
      "Order by severe diagnoses count DESC."
    ],
    "solution_explanation": "Surfaces clinical utilization intensity for high-acuity patient cohorts.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "hc-L5-056",
    "domain": "healthcare",
    "level": 5,
    "order": 56,
    "difficulty": "advanced",
    "title": "Physician Outpatient Visit Revenue Quartiles within Specialty (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Intra-specialty fee benchmarking: Using a CTE, calculate gross completed visit revenue per doctor, then apply NTILE(4) partitioned by specialty to assign doctors to quartile tiers. Return specialty, doctor name, gross revenue, and revenue quartile.",
    "context_notes": "WITH doc_rev AS (...) SELECT specialty, name, gross_revenue, NTILE(4) OVER (PARTITION BY specialty ORDER BY gross_revenue DESC).",
    "concepts": [
      "WITH CTE",
      "NTILE",
      "PARTITION BY",
      "INNER JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "specialty",
      "name",
      "gross_revenue",
      "revenue_quartile"
    ],
    "reference_sql": "WITH doc_rev AS (SELECT d.specialty, d.name, ROUND(SUM(a.fee), 2) AS gross_revenue FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.id, d.specialty, d.name) SELECT specialty, name, gross_revenue, NTILE(4) OVER (PARTITION BY specialty ORDER BY gross_revenue DESC) AS revenue_quartile FROM doc_rev ORDER BY specialty, revenue_quartile, gross_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute revenue per doctor in CTE.",
      "Apply NTILE(4) partitioned by specialty in outer query."
    ],
    "solution_explanation": "Compares clinician financial production relative to peers within the same clinical specialty.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-057",
    "domain": "healthcare",
    "level": 5,
    "order": 57,
    "difficulty": "advanced",
    "title": "Operating Room Duration and Procedure Cost Efficiency (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Surgical cost-per-minute index: Using a CTE, calculate cost-per-minute (standard_cost / duration_minutes) for each medical procedure, joined with department name. Return code, procedure name, department name, duration minutes, standard cost, and cost per minute.",
    "context_notes": "WITH proc_eff AS (...) SELECT code, procedure_name, department_name, duration_minutes, standard_cost, cost_per_minute.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "ARITHMETIC",
      "ROUND"
    ],
    "expected_columns": [
      "code",
      "procedure_name",
      "department_name",
      "duration_minutes",
      "standard_cost",
      "cost_per_minute"
    ],
    "reference_sql": "WITH proc_eff AS (SELECT p.code, p.procedure_name, d.name AS department_name, p.duration_minutes, p.standard_cost, ROUND(p.standard_cost / NULLIF(p.duration_minutes, 0), 2) AS cost_per_minute FROM medical_procedures p JOIN departments d ON p.department_id = d.id) SELECT code, procedure_name, department_name, duration_minutes, standard_cost, cost_per_minute FROM proc_eff ORDER BY cost_per_minute DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute cost_per_minute in CTE.",
      "Order by cost_per_minute DESC."
    ],
    "solution_explanation": "Measures procedural revenue yield per minute of operating room time.",
    "xp": 45,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-058",
    "domain": "healthcare",
    "level": 5,
    "order": 58,
    "difficulty": "advanced",
    "title": "Inpatient 30-Day Readmission Clinical Cost Impact (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Readmission financial burden: Using a multi-stage CTE, identify inpatient readmissions within 30 days, join to billing to aggregate the total billed charges incurred by readmitted patients. Return patient_id, readmission count, and total charges billed.",
    "context_notes": "WITH readms AS (...), pt_bills AS (...) SELECT patient_id, readmissions_count, total_billed.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LAG",
      "PARTITION BY",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "patient_id",
      "readmissions_count",
      "total_billed"
    ],
    "reference_sql": "WITH readms AS (SELECT patient_id, id, admission_date, (admission_date - LAG(discharge_date, 1) OVER (PARTITION BY patient_id ORDER BY admission_date ASC)) AS days_between FROM inpatient_admissions), readm_pts AS (SELECT patient_id, COUNT(id) AS readmissions_count FROM readms WHERE days_between IS NOT NULL AND days_between <= 30 GROUP BY patient_id), pt_bills AS (SELECT patient_id, ROUND(SUM(total_charge), 2) AS total_billed FROM billing GROUP BY patient_id) SELECT r.patient_id, r.readmissions_count, b.total_billed FROM readm_pts r JOIN pt_bills b ON r.patient_id = b.patient_id ORDER BY b.total_billed DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Identify 30-day readmissions with LAG in readms CTE.",
      "Aggregate hospital billing for readmitted patients in pt_bills CTE.",
      "Order by total_billed DESC."
    ],
    "solution_explanation": "Quantifies financial charges tied to hospital readmission penalty cases.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "hc-L5-059",
    "domain": "healthcare",
    "level": 5,
    "order": 59,
    "difficulty": "advanced",
    "title": "Diagnostic Laboratory Yield and Abnormal Flag Concentration (CTE)",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Diagnostic abnormality index: Using a CTE, calculate total tests performed, High flags count, Low flags count, and total abnormal percentage for each lab test. Return test name, category, total tests, High count, Low count, and abnormal pct.",
    "context_notes": "WITH lab_yield AS (...) SELECT test_name, category, total_tests, high_flags, low_flags, abnormal_pct.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "test_name",
      "category",
      "total_tests",
      "high_flags",
      "low_flags",
      "abnormal_pct"
    ],
    "reference_sql": "WITH lab_yield AS (SELECT lt.test_name, lt.category, COUNT(plr.id) AS total_tests, SUM(CASE WHEN plr.flag = 'HIGH' THEN 1 ELSE 0 END) AS high_flags, SUM(CASE WHEN plr.flag = 'LOW' THEN 1 ELSE 0 END) AS low_flags FROM lab_tests lt LEFT JOIN patient_lab_results plr ON lt.id = plr.test_id GROUP BY lt.id, lt.test_name, lt.category) SELECT test_name, category, total_tests, high_flags, low_flags, ROUND((high_flags + low_flags)::NUMERIC / NULLIF(total_tests, 0) * 100.0, 1) AS abnormal_pct FROM lab_yield ORDER BY abnormal_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute high and low flags per lab test in CTE.",
      "Calculate combined abnormal percentage in outer query."
    ],
    "solution_explanation": "Pinpoints diagnostic tests with the highest clinical abnormality detection rate.",
    "xp": 45,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-060",
    "domain": "healthcare",
    "level": 5,
    "order": 60,
    "difficulty": "advanced",
    "title": "Hospital Formulary Spend Contribution by Clinical Specialty (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Specialty medication expenditure: Using a multi-stage CTE, calculate total prescriptions authored and total estimated medication cost (prescriptions * unit_cost) for each medical specialty. Return specialty, prescriptions count, and total spend.",
    "context_notes": "WITH spec_rx AS (...) SELECT specialty, rx_count, total_formulary_spend.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "specialty",
      "rx_count",
      "total_formulary_spend"
    ],
    "reference_sql": "WITH spec_rx AS (SELECT d.specialty, COUNT(pr.id) AS rx_count, ROUND(SUM(m.unit_cost), 2) AS total_formulary_spend FROM prescriptions pr JOIN doctors d ON pr.doctor_id = d.id JOIN medications m ON pr.medication_name = m.name GROUP BY d.specialty) SELECT specialty, rx_count, total_formulary_spend FROM spec_rx ORDER BY total_formulary_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions to doctors and medications in CTE.",
      "Sum unit_cost per specialty."
    ],
    "solution_explanation": "Evaluates specialty-level pharmacotherapy budget utilization.",
    "xp": 45,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-061",
    "domain": "healthcare",
    "level": 5,
    "order": 61,
    "difficulty": "advanced",
    "title": "Hospital Inpatient Accommodation Yield vs Capacity Floor (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Department capacity economics: Using a 2-stage CTE, compute total potential daily room revenue (all rooms * rate) and actual realized daily room revenue (occupied rooms * rate) per department. In Stage 2, compute the revenue realization percentage. Return department name, potential revenue, realized revenue, and realization pct.",
    "context_notes": "WITH dept_rooms AS (...) SELECT department_name, potential_revenue, realized_revenue, realization_pct.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "department_name",
      "potential_revenue",
      "realized_revenue",
      "realization_pct"
    ],
    "reference_sql": "WITH dept_rooms AS (SELECT d.name AS department_name, ROUND(SUM(r.daily_rate), 2) AS potential_revenue, ROUND(SUM(CASE WHEN r.is_occupied THEN r.daily_rate ELSE 0 END), 2) AS realized_revenue FROM departments d JOIN rooms r ON d.id = r.department_id GROUP BY d.id, d.name) SELECT department_name, potential_revenue, realized_revenue, ROUND(realized_revenue / NULLIF(potential_revenue, 0) * 100.0, 1) AS realization_pct FROM dept_rooms ORDER BY realized_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute potential and realized daily revenue in CTE.",
      "Calculate realization percentage."
    ],
    "solution_explanation": "Evaluates departmental bed accommodation monetization efficiency.",
    "xp": 45,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-062",
    "domain": "healthcare",
    "level": 5,
    "order": 62,
    "difficulty": "advanced",
    "title": "Chronic Comorbidity Patient Incurred Billing Exposure (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Multimorbid financial burden: Using a CTE, identify patients diagnosed with at least 2 distinct conditions, and join to billing to compute their total billed charges. Return patient first name, last name, distinct diagnoses count, and total billed charges.",
    "context_notes": "WITH multi_diag AS (...) SELECT p.first_name, p.last_name, m.diag_count, SUM(b.total_charge).",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "COUNT DISTINCT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "diagnoses_count",
      "total_hospital_billed"
    ],
    "reference_sql": "WITH multi_diag AS (SELECT patient_id, COUNT(DISTINCT icd10_code) AS diag_count FROM diagnoses GROUP BY patient_id HAVING COUNT(DISTINCT icd10_code) >= 2) SELECT p.first_name, p.last_name, m.diag_count AS diagnoses_count, ROUND(SUM(b.total_charge), 2) AS total_hospital_billed FROM multi_diag m JOIN patients p ON m.patient_id = p.id JOIN billing b ON p.id = b.patient_id GROUP BY p.id, p.first_name, p.last_name, m.diag_count ORDER BY total_hospital_billed DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients with >= 2 distinct diagnoses in multi_diag CTE.",
      "Join to patients and billing to aggregate total hospital charges."
    ],
    "solution_explanation": "Quantifies financial charges for chronic multimorbid patient cohorts.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-063",
    "domain": "healthcare",
    "level": 5,
    "order": 63,
    "difficulty": "advanced",
    "title": "Clinical Laboratory Pricing Spread and Standard Deviation Proxy (CTE)",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Pathology pricing dispersion: Using a CTE, calculate standard fee variance (max_fee - min_fee) and average standard fee across diagnostic categories. Return category, test count, min fee, max fee, fee spread, and average fee.",
    "context_notes": "WITH cat_pricing AS (...) SELECT category, test_count, min_fee, max_fee, fee_spread, avg_fee.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "MIN",
      "MAX",
      "AVG"
    ],
    "expected_columns": [
      "category",
      "test_count",
      "min_fee",
      "max_fee",
      "fee_spread",
      "avg_fee"
    ],
    "reference_sql": "WITH cat_pricing AS (SELECT category, COUNT(id) AS test_count, ROUND(MIN(standard_fee), 2) AS min_fee, ROUND(MAX(standard_fee), 2) AS max_fee, ROUND(MAX(standard_fee) - MIN(standard_fee), 2) AS fee_spread, ROUND(AVG(standard_fee), 2) AS avg_fee FROM lab_tests GROUP BY category) SELECT category, test_count, min_fee, max_fee, fee_spread, avg_fee FROM cat_pricing ORDER BY fee_spread DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute min, max, spread, and avg fee per category in CTE.",
      "Order by fee_spread DESC."
    ],
    "solution_explanation": "Analyzes price variance across pathology diagnostic disciplines.",
    "xp": 45,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-064",
    "domain": "healthcare",
    "level": 5,
    "order": 64,
    "difficulty": "advanced",
    "title": "Physician Scheduling Utilization and Patient Adherence (CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Clinical schedule yield: Using a CTE, calculate total scheduled visits, completed encounters, cancelled encounters, and no-show encounters for each doctor specialty. Return specialty, total scheduled, completed, cancelled, and no-shows.",
    "context_notes": "WITH spec_sched AS (...) SELECT specialty, total_scheduled, completed, cancelled, no_shows.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "specialty",
      "total_scheduled",
      "completed",
      "cancelled",
      "no_shows"
    ],
    "reference_sql": "WITH spec_sched AS (SELECT d.specialty, COUNT(a.id) AS total_scheduled, SUM(CASE WHEN a.status = 'completed' THEN 1 ELSE 0 END) AS completed, SUM(CASE WHEN a.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled, SUM(CASE WHEN a.status = 'no_show' THEN 1 ELSE 0 END) AS no_shows FROM doctors d JOIN appointments a ON d.id = a.doctor_id GROUP BY d.specialty) SELECT specialty, total_scheduled, completed, cancelled, no_shows FROM spec_sched ORDER BY total_scheduled DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join doctors to appointments in CTE.",
      "Pivot schedule status counts per specialty."
    ],
    "solution_explanation": "Evaluates outpatient clinic operational throughput and cancellation friction.",
    "xp": 45,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-065",
    "domain": "healthcare",
    "level": 5,
    "order": 65,
    "difficulty": "advanced",
    "title": "Payer Contractual Realization Index by Commercial Health Plan (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Commercial payer scorecard: Using a CTE that filters for major commercial payers (BlueCross, Aetna, UnitedHealth, Cigna), calculate claim count, total claim amount, approved amount, and realization percentage. Return insurance provider, claims count, gross claimed, net approved, and realization pct.",
    "context_notes": "WITH comm_payers AS (...) SELECT insurance_provider, claims_count, gross_claimed, net_approved, realization_pct.",
    "concepts": [
      "WITH CTE",
      "WHERE",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "insurance_provider",
      "claims_count",
      "gross_claimed",
      "net_approved",
      "realization_pct"
    ],
    "reference_sql": "WITH comm_payers AS (SELECT insurance_provider, COUNT(id) AS claims_count, ROUND(SUM(claim_amount), 2) AS gross_claimed, ROUND(SUM(approved_amount), 2) AS net_approved FROM insurance_claims WHERE insurance_provider IN ('BlueCross', 'Aetna', 'UnitedHealth', 'Cigna') GROUP BY insurance_provider) SELECT insurance_provider, claims_count, gross_claimed, net_approved, ROUND(net_approved / NULLIF(gross_claimed, 0) * 100.0, 1) AS realization_pct FROM comm_payers ORDER BY realization_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter commercial payers in CTE and aggregate claim totals.",
      "Calculate net contractual realization percentage."
    ],
    "solution_explanation": "Benchmarks commercial payer contract recovery efficiency.",
    "xp": 45,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-066",
    "domain": "healthcare",
    "level": 5,
    "order": 66,
    "difficulty": "advanced",
    "title": "Inpatient Length of Stay vs Daily Accommodation Charges (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Inpatient financial intensity: Using a CTE that joins inpatient admissions to rooms, calculate total inpatient days and total accommodation charges (days * daily_rate) for each completed admission. Return admission id, patient_id, length of stay, daily rate, and total room charges.",
    "context_notes": "WITH stay_charges AS (...) SELECT id, patient_id, length_of_stay, daily_rate, total_room_charges.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "WHERE",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "id",
      "patient_id",
      "length_of_stay",
      "daily_rate",
      "total_room_charges"
    ],
    "reference_sql": "WITH stay_charges AS (SELECT ia.id, ia.patient_id, (ia.discharge_date - ia.admission_date) AS length_of_stay, r.daily_rate, ROUND((ia.discharge_date - ia.admission_date) * r.daily_rate, 2) AS total_room_charges FROM inpatient_admissions ia JOIN rooms r ON ia.room_id = r.id WHERE ia.discharge_date IS NOT NULL) SELECT id, patient_id, length_of_stay, daily_rate, total_room_charges FROM stay_charges ORDER BY total_room_charges DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute stay and room charges as days * daily_rate in CTE.",
      "Order by total_room_charges DESC."
    ],
    "solution_explanation": "Calculates inpatient room and board charge generation per hospitalization.",
    "xp": 45,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-067",
    "domain": "healthcare",
    "level": 5,
    "order": 67,
    "difficulty": "advanced",
    "title": "Diagnostic Biopsy and Procedure Durations Across Clinical Towers (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Facility procedural block allocation: Using a CTE that joins medical procedures to departments, calculate average procedure duration and total procedural standard cost per building tower. Return building, procedure count, avg duration minutes, and total cost.",
    "context_notes": "WITH bldg_procs AS (...) SELECT building, procedure_count, avg_duration_minutes, total_cost.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "AVG",
      "SUM"
    ],
    "expected_columns": [
      "building",
      "procedure_count",
      "avg_duration_minutes",
      "total_cost"
    ],
    "reference_sql": "WITH bldg_procs AS (SELECT d.building, COUNT(p.id) AS procedure_count, ROUND(AVG(p.duration_minutes), 1) AS avg_duration_minutes, ROUND(SUM(p.standard_cost), 2) AS total_cost FROM departments d JOIN medical_procedures p ON d.id = p.department_id GROUP BY d.building) SELECT building, procedure_count, avg_duration_minutes, total_cost FROM bldg_procs ORDER BY total_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join departments to procedures in CTE.",
      "Compute procedure count, avg duration, and total cost per building."
    ],
    "solution_explanation": "Models surgical block time and procedural revenue potential across hospital towers.",
    "xp": 45,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-068",
    "domain": "healthcare",
    "level": 5,
    "order": 68,
    "difficulty": "advanced",
    "title": "Senior Patient Polypharmacy and Diagnostic Risk Profile (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Geriatric polypharmacy audit: Using a multi-stage CTE, identify senior patients (born before 1965), and calculate their distinct medications prescribed count and distinct diagnoses count. Return patient first name, last name, date of birth, prescriptions count, and diagnoses count.",
    "context_notes": "WITH sr_pts AS (...), rx_counts AS (...), diag_counts AS (...) SELECT first_name, last_name, dob, rxs, diags.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LEFT JOIN",
      "GROUP BY",
      "COUNT DISTINCT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "dob",
      "prescriptions_count",
      "diagnoses_count"
    ],
    "reference_sql": "WITH sr_pts AS (SELECT id, first_name, last_name, dob FROM patients WHERE dob < '1965-01-01'), rx_counts AS (SELECT patient_id, COUNT(id) AS rx_cnt FROM prescriptions GROUP BY patient_id), diag_counts AS (SELECT patient_id, COUNT(id) AS diag_cnt FROM diagnoses GROUP BY patient_id) SELECT s.first_name, s.last_name, s.dob, COALESCE(r.rx_cnt, 0) AS prescriptions_count, COALESCE(d.diag_cnt, 0) AS diagnoses_count FROM sr_pts s LEFT JOIN rx_counts r ON s.id = r.patient_id LEFT JOIN diag_counts d ON s.id = d.patient_id ORDER BY prescriptions_count DESC, diagnoses_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter senior patients in sr_pts CTE.",
      "Join with prescription and diagnosis counts.",
      "Order by prescriptions count DESC."
    ],
    "solution_explanation": "Surfaces vulnerable geriatric patients managing complex polypharmacy regimens.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "hc-L5-069",
    "domain": "healthcare",
    "level": 5,
    "order": 69,
    "difficulty": "advanced",
    "title": "Hospital Billing Cash Recovery Efficiency Ratio (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Cash conversion efficiency: Using a CTE, calculate total billed charges, total copays collected, total insurance covered, and total uncollected patient balance across all hospital billing records. Return total billed, total copays, insurance covered, and uncollected balance.",
    "context_notes": "WITH ar_totals AS (...) SELECT total_billed, total_copays, total_insurance_covered, total_patient_balance.",
    "concepts": [
      "WITH CTE",
      "SUM"
    ],
    "expected_columns": [
      "total_billed",
      "total_copays",
      "total_insurance_covered",
      "total_patient_balance"
    ],
    "reference_sql": "WITH ar_totals AS (SELECT ROUND(SUM(total_charge), 2) AS total_billed, ROUND(SUM(copay_amount), 2) AS total_copays, ROUND(SUM(insurance_covered), 2) AS total_insurance_covered, ROUND(SUM(patient_balance), 2) AS total_patient_balance FROM billing) SELECT total_billed, total_copays, total_insurance_covered, total_patient_balance FROM ar_totals;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute grand totals for charges, copays, insurance covered, and patient balance in CTE.",
      "Select financial summary."
    ],
    "solution_explanation": "Executive hospital billing reconciliation balancing collected cash against uncollected receivables.",
    "xp": 45,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-070",
    "domain": "healthcare",
    "level": 5,
    "order": 70,
    "difficulty": "advanced",
    "title": "Physician Outpatient Clinical Revenue Decile Distribution (NTILE CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Medical staff production deciles: Using a CTE, compute gross completed appointment revenue for each doctor, then apply NTILE(10) to assign doctors to performance deciles. Return doctor name, specialty, gross revenue, and production decile.",
    "context_notes": "WITH doc_rev AS (...) SELECT name, specialty, gross_revenue, NTILE(10) OVER (ORDER BY gross_revenue DESC).",
    "concepts": [
      "WITH CTE",
      "NTILE",
      "INNER JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "gross_revenue",
      "production_decile"
    ],
    "reference_sql": "WITH doc_rev AS (SELECT d.name, d.specialty, ROUND(SUM(a.fee), 2) AS gross_revenue FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.id, d.name, d.specialty) SELECT name, specialty, gross_revenue, NTILE(10) OVER (ORDER BY gross_revenue DESC) AS production_decile FROM doc_rev ORDER BY production_decile, gross_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute revenue per doctor in CTE.",
      "Apply NTILE(10) OVER (ORDER BY gross_revenue DESC) in outer query."
    ],
    "solution_explanation": "Segments physicians into ten granular production deciles for medical executive committee reviews.",
    "xp": 45,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-071",
    "domain": "healthcare",
    "level": 5,
    "order": 71,
    "difficulty": "advanced",
    "title": "Nursing Workforce Certification and Shift Distribution (CTE)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Nursing workforce matrix: Using a CTE, count Nurse Practitioners (NP) and Bachelor of Science in Nursing (BSN) nurses across Day and Night shifts. Return shift, NP count, BSN count, and total nurses.",
    "context_notes": "WITH nurse_matrix AS (...) SELECT shift, np_count, bsn_count, total_nurses.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "shift",
      "np_count",
      "bsn_count",
      "total_nurses"
    ],
    "reference_sql": "WITH nurse_matrix AS (SELECT shift, SUM(CASE WHEN certification_level = 'NP' THEN 1 ELSE 0 END) AS np_count, SUM(CASE WHEN certification_level = 'BSN' THEN 1 ELSE 0 END) AS bsn_count, COUNT(id) AS total_nurses FROM nurses GROUP BY shift) SELECT shift, np_count, bsn_count, total_nurses FROM nurse_matrix ORDER BY shift ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group nurses by shift in CTE.",
      "Pivot certification levels and calculate total nurses per shift."
    ],
    "solution_explanation": "Assesses credentialing mix across daytime and nocturnal nursing rosters.",
    "xp": 45,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-072",
    "domain": "healthcare",
    "level": 5,
    "order": 72,
    "difficulty": "advanced",
    "title": "Clinical Procedural Revenue Contribution by Medical Specialty (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Procedural service line economics: Using a CTE that joins medical procedures to departments and doctors, calculate total procedures and total procedural cost potential for each department. Return department name, procedure count, and total cost potential.",
    "context_notes": "WITH proc_rev AS (...) SELECT department_name, procedure_count, total_cost_potential.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "department_name",
      "procedure_count",
      "total_cost_potential"
    ],
    "reference_sql": "WITH proc_rev AS (SELECT d.name AS department_name, COUNT(p.id) AS procedure_count, ROUND(SUM(p.standard_cost), 2) AS total_cost_potential FROM departments d JOIN medical_procedures p ON d.id = p.department_id GROUP BY d.id, d.name) SELECT department_name, procedure_count, total_cost_potential FROM proc_rev ORDER BY total_cost_potential DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join departments to procedures in CTE.",
      "Compute procedure count and total standard_cost."
    ],
    "solution_explanation": "Highlights procedural contribution to department gross clinical margins.",
    "xp": 45,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-073",
    "domain": "healthcare",
    "level": 5,
    "order": 73,
    "difficulty": "advanced",
    "title": "Inpatient Admission Length of Stay and Discharge Velocity (CTE)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Hospital bed throughput: Using a CTE, calculate average length of stay in days and total admissions count for each room type. Return room type, total admissions, and avg stay days.",
    "context_notes": "WITH room_adms AS (...) SELECT room_type, total_admissions, avg_stay_days.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "AVG",
      "ROUND"
    ],
    "expected_columns": [
      "room_type",
      "total_admissions",
      "avg_stay_days"
    ],
    "reference_sql": "WITH room_adms AS (SELECT r.room_type, COUNT(ia.id) AS total_admissions, ROUND(AVG(ia.discharge_date - ia.admission_date), 1) AS avg_stay_days FROM inpatient_admissions ia JOIN rooms r ON ia.room_id = r.id WHERE ia.discharge_date IS NOT NULL GROUP BY r.room_type) SELECT room_type, total_admissions, avg_stay_days FROM room_adms ORDER BY avg_stay_days DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join admissions to rooms in CTE.",
      "Compute admissions count and avg length of stay per room type."
    ],
    "solution_explanation": "Evaluates hospitalization durations across intensive care vs standard beds.",
    "xp": 45,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L5-074",
    "domain": "healthcare",
    "level": 5,
    "order": 74,
    "difficulty": "advanced",
    "title": "Payer Claim Approval Ratio and Settlement Turnaround Correlation (CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer operational matrix: Using a CTE, calculate total claims, approved claims count, approval rate pct, and average settlement days for each insurance provider. Return insurance provider, total claims, approval rate pct, and avg settlement days.",
    "context_notes": "WITH payer_matrix AS (...) SELECT insurance_provider, total_claims, approval_rate_pct, avg_settlement_days.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "SUM CASE",
      "AVG"
    ],
    "expected_columns": [
      "insurance_provider",
      "total_claims",
      "approval_rate_pct",
      "avg_settlement_days"
    ],
    "reference_sql": "WITH payer_matrix AS (SELECT insurance_provider, COUNT(id) AS total_claims, ROUND(SUM(CASE WHEN status = 'approved' THEN 1.0 ELSE 0.0 END) / COUNT(id) * 100.0, 1) AS approval_rate_pct, ROUND(AVG(settlement_days), 1) AS avg_settlement_days FROM insurance_claims GROUP BY insurance_provider) SELECT insurance_provider, total_claims, approval_rate_pct, avg_settlement_days FROM payer_matrix ORDER BY approval_rate_pct DESC, avg_settlement_days ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute claims count, approval percentage, and average settlement turnaround in CTE.",
      "Select payer performance KPIs."
    ],
    "solution_explanation": "Correlates claims approval efficiency with adjudication turnaround velocity.",
    "xp": 45,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-075",
    "domain": "healthcare",
    "level": 5,
    "order": 75,
    "difficulty": "advanced",
    "title": "Patient Cumulative Outpatient and Inpatient Billing Burden (Multi-Stage CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Comprehensive patient liability: Using a multi-stage CTE, calculate total billed charges, insurance covered, and remaining balance for each patient. Categorize patients with balance > $500 as High Burden. Return patient_id, total billed, patient balance, and liability category.",
    "context_notes": "WITH pt_billing AS (...) SELECT patient_id, total_billed, patient_balance, liability_category.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "SUM",
      "CASE WHEN"
    ],
    "expected_columns": [
      "patient_id",
      "total_billed",
      "patient_balance",
      "liability_category"
    ],
    "reference_sql": "WITH pt_billing AS (SELECT patient_id, ROUND(SUM(total_charge), 2) AS total_billed, ROUND(SUM(patient_balance), 2) AS patient_balance FROM billing GROUP BY patient_id) SELECT patient_id, total_billed, patient_balance, CASE WHEN patient_balance >= 500.00 THEN 'High Burden' ELSE 'Standard' END AS liability_category FROM pt_billing ORDER BY patient_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Sum total_charge and patient_balance per patient in CTE.",
      "Classify balance liability in outer query."
    ],
    "solution_explanation": "Identifies patient accounts requiring financial counseling or hardship payment plans.",
    "xp": 45,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L5-076",
    "domain": "healthcare",
    "level": 5,
    "order": 76,
    "difficulty": "boss",
    "title": "Hospital Master Clinical Service Line Revenue and Margin Model",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Executive Board Briefing: Construct an enterprise clinical service line financial model across all departments. Combine total outpatient appointment revenue, total daily bed revenue from occupied rooms, and total medical procedures standard cost. Return department name, building, appointment revenue, bed revenue, procedure revenue, and total service line revenue.",
    "context_notes": "Multi-stage CTE integrating 3 revenue streams, summing total service line revenue.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LEFT JOIN",
      "GROUP BY",
      "SUM",
      "COALESCE"
    ],
    "expected_columns": [
      "department_name",
      "building",
      "appointment_revenue",
      "bed_revenue",
      "procedure_revenue",
      "total_service_line_revenue"
    ],
    "reference_sql": "WITH appt_rev AS (SELECT dept.id AS department_id, dept.name AS department_name, dept.building, ROUND(SUM(a.fee), 2) AS appt_revenue FROM departments dept JOIN doctors doc ON dept.id = doc.department_id JOIN appointments a ON doc.id = a.doctor_id WHERE a.status = 'completed' GROUP BY dept.id, dept.name, dept.building), bed_rev AS (SELECT department_id, ROUND(SUM(daily_rate), 2) AS bed_revenue FROM rooms WHERE is_occupied = TRUE GROUP BY department_id), proc_rev AS (SELECT department_id, ROUND(SUM(standard_cost), 2) AS proc_revenue FROM medical_procedures GROUP BY department_id) SELECT a.department_name, a.building, COALESCE(a.appt_revenue, 0.00) AS appointment_revenue, COALESCE(b.bed_revenue, 0.00) AS bed_revenue, COALESCE(p.proc_revenue, 0.00) AS procedure_revenue, ROUND(COALESCE(a.appt_revenue, 0.00) + COALESCE(b.bed_revenue, 0.00) + COALESCE(p.proc_revenue, 0.00), 2) AS total_service_line_revenue FROM appt_rev a LEFT JOIN bed_rev b ON a.department_id = b.department_id LEFT JOIN proc_rev p ON a.department_id = p.department_id ORDER BY total_service_line_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute revenue in 3 CTEs (appointments, rooms, procedures).",
      "Join on department_id with COALESCE.",
      "Sum all 3 streams into total_service_line_revenue."
    ],
    "solution_explanation": "Master hospital service line financial model integrating ambulatory visits, inpatient beds, and procedural throughput.",
    "xp": 50,
    "estimated_minutes": 15
  },
  {
    "id": "hc-L5-077",
    "domain": "healthcare",
    "level": 5,
    "order": 77,
    "difficulty": "boss",
    "title": "Physician 360 Enterprise Clinical and Financial Productivity Index",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Medical Executive Board Audit: Construct a 360-degree physician practice evaluation using multi-stage CTEs. For each doctor, calculate completed appointments, gross appointment revenue, total prescriptions authored, and total inpatient admissions managed. Return doctor name, specialty, completed visits, gross revenue, prescriptions count, and admissions count.",
    "context_notes": "4-stage CTE uniting doctor encounters across appointments, prescriptions, and admissions.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LEFT JOIN",
      "GROUP BY",
      "COALESCE"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "completed_visits",
      "gross_revenue",
      "prescriptions_count",
      "admissions_count"
    ],
    "reference_sql": "WITH appts AS (SELECT doctor_id, COUNT(id) AS completed_visits, ROUND(SUM(fee), 2) AS gross_revenue FROM appointments WHERE status = 'completed' GROUP BY doctor_id), rxs AS (SELECT doctor_id, COUNT(id) AS prescriptions_count FROM prescriptions GROUP BY doctor_id), adms AS (SELECT admitting_doctor_id, COUNT(id) AS admissions_count FROM inpatient_admissions GROUP BY admitting_doctor_id) SELECT d.name, d.specialty, COALESCE(a.completed_visits, 0) AS completed_visits, COALESCE(a.gross_revenue, 0.00) AS gross_revenue, COALESCE(r.prescriptions_count, 0) AS prescriptions_count, COALESCE(ad.admissions_count, 0) AS admissions_count FROM doctors d LEFT JOIN appts a ON d.id = a.doctor_id LEFT JOIN rxs r ON d.id = r.doctor_id LEFT JOIN adms ad ON d.id = ad.admitting_doctor_id ORDER BY gross_revenue DESC, completed_visits DESC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate encounters in 3 CTEs (appointments, prescriptions, admissions).",
      "Join to doctors table with COALESCE.",
      "Order by gross_revenue DESC LIMIT 24."
    ],
    "solution_explanation": "Comprehensive executive scorecard ranking clinical medical staff across clinical, pharmaceutical, and inpatient activities.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hc-L5-078",
    "domain": "healthcare",
    "level": 5,
    "order": 78,
    "difficulty": "boss",
    "title": "Chief Medical Officer Patient Clinical Risk and Journey Audit",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Master Patient Journey Audit: Identify patients who have navigated the entire clinical continuum — attending a completed appointment, receiving an ICD-10 diagnosis, undergoing a lab test with an abnormal flag, and having an inpatient admission or prescription. Return patient first name, last name, city, diagnoses count, lab count, and total billed hospital charges.",
    "context_notes": "Multi-stage CTE joining patients, diagnoses, lab results, and billing.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city",
      "diagnoses_count",
      "abnormal_labs_count",
      "total_hospital_billed"
    ],
    "reference_sql": "WITH pt_diags AS (SELECT patient_id, COUNT(id) AS diagnoses_count FROM diagnoses GROUP BY patient_id), pt_labs AS (SELECT patient_id, COUNT(id) AS abnormal_labs_count FROM patient_lab_results WHERE flag IN ('HIGH', 'LOW') GROUP BY patient_id), pt_billing AS (SELECT patient_id, ROUND(SUM(total_charge), 2) AS total_hospital_billed FROM billing GROUP BY patient_id) SELECT p.first_name, p.last_name, p.city, d.diagnoses_count, l.abnormal_labs_count, b.total_hospital_billed FROM patients p JOIN pt_diags d ON p.id = d.patient_id JOIN pt_labs l ON p.id = l.patient_id JOIN pt_billing b ON p.id = b.patient_id ORDER BY b.total_hospital_billed DESC LIMIT 15;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate diagnoses, abnormal labs, and billing in 3 CTEs.",
      "Join to patients table.",
      "Order by total_hospital_billed DESC LIMIT 15."
    ],
    "solution_explanation": "Capstone executive patient complexity audit linking high clinical risk to aggregate health system financial charges.",
    "xp": 50,
    "estimated_minutes": 15
  },
  {
    "id": "hc-L5-079",
    "domain": "healthcare",
    "level": 5,
    "order": 79,
    "difficulty": "boss",
    "title": "Hospital Accounts Receivable Aging and Contractual Yield Reconciliation",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Financial reconciliation: Using a multi-stage CTE, calculate total billed charges, insurance covered, patient balance, and average claim settlement days for each health insurance provider. Return insurance provider, total billed, insurance covered, patient balance, and avg settlement days.",
    "context_notes": "Multi-stage CTE combining billing and claims metrics per payer.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LEFT JOIN",
      "GROUP BY",
      "SUM",
      "AVG"
    ],
    "expected_columns": [
      "insurance_provider",
      "total_billed",
      "total_insurance_covered",
      "total_patient_balance",
      "avg_settlement_days"
    ],
    "reference_sql": "WITH billing_stats AS (SELECT p.insurance_provider, ROUND(SUM(b.total_charge), 2) AS total_billed, ROUND(SUM(b.insurance_covered), 2) AS total_insurance_covered, ROUND(SUM(b.patient_balance), 2) AS total_patient_balance FROM billing b JOIN patients p ON b.patient_id = p.id GROUP BY p.insurance_provider), claim_stats AS (SELECT insurance_provider, ROUND(AVG(settlement_days), 1) AS avg_settlement_days FROM insurance_claims GROUP BY insurance_provider) SELECT b.insurance_provider, b.total_billed, b.total_insurance_covered, b.total_patient_balance, COALESCE(c.avg_settlement_days, 0.0) AS avg_settlement_days FROM billing_stats b LEFT JOIN claim_stats c ON b.insurance_provider = c.insurance_provider ORDER BY b.total_billed DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute billing metrics in billing_stats CTE.",
      "Compute claim settlement speed in claim_stats CTE.",
      "Join on insurance_provider and order by total_billed DESC."
    ],
    "solution_explanation": "Executive payer balance sheet reconciling institutional revenue cycle performance with payer adjudication velocity.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hc-L5-080",
    "domain": "healthcare",
    "level": 5,
    "order": 80,
    "difficulty": "boss",
    "title": "Inpatient 30-Day Readmission Rate and Financial Exposure Audit",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "CMS readmission penalty and cost impact: Using a multi-stage CTE, identify all patients with a 30-day inpatient readmission, and calculate the total hospital billing charges incurred by each readmitted patient. Return patient first name, last name, readmission interval days, and total hospital charges.",
    "context_notes": "Multi-stage CTE with LAG() on admissions joined to patients and billing.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LAG",
      "PARTITION BY",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "days_between",
      "total_hospital_charges"
    ],
    "reference_sql": "WITH readms AS (SELECT patient_id, (admission_date - LAG(discharge_date, 1) OVER (PARTITION BY patient_id ORDER BY admission_date ASC)) AS days_between FROM inpatient_admissions), readm_pts AS (SELECT patient_id, MIN(days_between) AS days_between FROM readms WHERE days_between IS NOT NULL AND days_between <= 30 GROUP BY patient_id), pt_billing AS (SELECT patient_id, ROUND(SUM(total_charge), 2) AS total_hospital_charges FROM billing GROUP BY patient_id) SELECT p.first_name, p.last_name, r.days_between, b.total_hospital_charges FROM readm_pts r JOIN patients p ON r.patient_id = p.id JOIN pt_billing b ON p.id = b.patient_id ORDER BY b.total_hospital_charges DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Identify 30-day readmissions using LAG in readms CTE.",
      "Join with patients and aggregate billing charges in pt_billing CTE.",
      "Order by total_hospital_charges DESC."
    ],
    "solution_explanation": "Critical health system quality assurance metric quantifying readmission penalties and patient financial liabilities.",
    "xp": 50,
    "estimated_minutes": 15
  },
  {
    "id": "hc-L5-081",
    "domain": "healthcare",
    "level": 5,
    "order": 81,
    "difficulty": "boss",
    "title": "Operating Room Surgical Throughput and Capacity Yield Model",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Surgical block optimization: Using a multi-stage CTE, calculate total procedural minutes, average procedure duration, total procedural cost potential, and procedure count for each clinical department. Return department name, building, floor, procedure count, total duration minutes, and total cost potential.",
    "context_notes": "CTE aggregating medical_procedures joined to departments.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "AVG"
    ],
    "expected_columns": [
      "department_name",
      "building",
      "floor",
      "procedure_count",
      "total_duration_minutes",
      "total_cost_potential"
    ],
    "reference_sql": "WITH proc_model AS (SELECT d.name AS department_name, d.building, d.floor, COUNT(p.id) AS procedure_count, SUM(p.duration_minutes) AS total_duration_minutes, ROUND(SUM(p.standard_cost), 2) AS total_cost_potential FROM departments d JOIN medical_procedures p ON d.id = p.department_id GROUP BY d.id, d.name, d.building, d.floor) SELECT department_name, building, floor, procedure_count, total_duration_minutes, total_cost_potential FROM proc_model ORDER BY total_cost_potential DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate procedures per department in CTE.",
      "Select department_name, building, floor, procedure_count, total_duration_minutes, total_cost_potential."
    ],
    "solution_explanation": "Models operative block scheduling and procedural yield across surgical tower facilities.",
    "xp": 50,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L5-082",
    "domain": "healthcare",
    "level": 5,
    "order": 82,
    "difficulty": "boss",
    "title": "Chronic Care Management: Diabetic Patient Care Continuum Audit",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Diabetic clinical pathway scorecard: Using multi-stage CTEs, identify all patients diagnosed with Type 2 Diabetes (E11.9). Determine whether they have a prescription for Glucophage, whether they had an A1c or metabolic lab test, and calculate their total hospital spend. Return patient first name, last name, has_prescription, has_lab, and total billed charges.",
    "context_notes": "Multi-stage CTE checking care pathway compliance for diabetic cohort.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LEFT JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "has_prescription",
      "has_lab",
      "total_billed"
    ],
    "reference_sql": "WITH diab_pts AS (SELECT DISTINCT patient_id FROM diagnoses WHERE icd10_code = 'E11.9'), rx_check AS (SELECT DISTINCT patient_id FROM prescriptions WHERE medication_name = 'Glucophage'), lab_check AS (SELECT DISTINCT patient_id FROM patient_lab_results), bill_totals AS (SELECT patient_id, ROUND(SUM(total_charge), 2) AS total_billed FROM billing GROUP BY patient_id) SELECT p.first_name, p.last_name, (CASE WHEN r.patient_id IS NOT NULL THEN 'Yes' ELSE 'No' END) AS has_prescription, (CASE WHEN l.patient_id IS NOT NULL THEN 'Yes' ELSE 'No' END) AS has_lab, COALESCE(b.total_billed, 0.00) AS total_billed FROM diab_pts d JOIN patients p ON d.patient_id = p.id LEFT JOIN rx_check r ON d.patient_id = r.patient_id LEFT JOIN lab_check l ON d.patient_id = l.patient_id LEFT JOIN bill_totals b ON d.patient_id = b.patient_id ORDER BY total_billed DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Isolate diabetic patients in diab_pts CTE.",
      "Check prescription and lab presence in separate CTEs.",
      "Join to patients and billing."
    ],
    "solution_explanation": "Audits clinical quality protocol compliance for diabetes mellitus population health.",
    "xp": 50,
    "estimated_minutes": 15
  },
  {
    "id": "hc-L5-083",
    "domain": "healthcare",
    "level": 5,
    "order": 83,
    "difficulty": "boss",
    "title": "Department Bed Census Monetization and Vacancy Cost Analysis",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Inpatient vacancy financial leakage: Using a multi-stage CTE, calculate total beds, occupied beds, vacant beds, daily realized revenue, and unrealized daily revenue lost to vacant beds per department. Return department name, total beds, occupied beds, vacant beds, realized revenue, and unrealized vacancy loss.",
    "context_notes": "Multi-stage CTE calculating occupied and vacant bed revenue deltas.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "department_name",
      "total_beds",
      "occupied_beds",
      "vacant_beds",
      "realized_revenue",
      "unrealized_vacancy_loss"
    ],
    "reference_sql": "WITH bed_census AS (SELECT d.name AS department_name, COUNT(r.id) AS total_beds, SUM(CASE WHEN r.is_occupied THEN 1 ELSE 0 END) AS occupied_beds, SUM(CASE WHEN NOT r.is_occupied THEN 1 ELSE 0 END) AS vacant_beds, ROUND(SUM(CASE WHEN r.is_occupied THEN r.daily_rate ELSE 0 END), 2) AS realized_revenue, ROUND(SUM(CASE WHEN NOT r.is_occupied THEN r.daily_rate ELSE 0 END), 2) AS unrealized_vacancy_loss FROM departments d JOIN rooms r ON d.id = r.department_id GROUP BY d.id, d.name) SELECT department_name, total_beds, occupied_beds, vacant_beds, realized_revenue, unrealized_vacancy_loss FROM bed_census ORDER BY unrealized_vacancy_loss DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute occupied and vacant bed metrics in CTE.",
      "Select department_name, total_beds, occupied_beds, vacant_beds, realized_revenue, unrealized_vacancy_loss."
    ],
    "solution_explanation": "Quantifies financial capacity leakage from empty hospital beds across inpatient service lines.",
    "xp": 50,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L5-084",
    "domain": "healthcare",
    "level": 5,
    "order": 84,
    "difficulty": "boss",
    "title": "Physician Master Clinical Practice Profile (Multi-Specialty Benchmark)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Executive Medical Staff Benchmark: Using multi-stage CTEs, compute completed consultations, total visit fees, distinct medications prescribed, and severe diagnoses treated per doctor. Return doctor name, specialty, completed visits, gross revenue, distinct medications, and severe diagnoses.",
    "context_notes": "4-stage CTE linking doctor consultations, fees, medications, and severe diagnoses.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LEFT JOIN",
      "GROUP BY",
      "COUNT DISTINCT"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "completed_visits",
      "gross_revenue",
      "distinct_medications",
      "severe_diagnoses"
    ],
    "reference_sql": "WITH appts AS (SELECT doctor_id, COUNT(id) AS completed_visits, ROUND(SUM(fee), 2) AS gross_revenue FROM appointments WHERE status = 'completed' GROUP BY doctor_id), rxs AS (SELECT doctor_id, COUNT(DISTINCT medication_name) AS distinct_medications FROM prescriptions GROUP BY doctor_id), diags AS (SELECT a.doctor_id, COUNT(dg.id) AS severe_diagnoses FROM appointments a JOIN diagnoses dg ON a.id = dg.appointment_id WHERE dg.severity = 'Severe' GROUP BY a.doctor_id) SELECT d.name, d.specialty, COALESCE(a.completed_visits, 0) AS completed_visits, COALESCE(a.gross_revenue, 0.00) AS gross_revenue, COALESCE(r.distinct_medications, 0) AS distinct_medications, COALESCE(dg.severe_diagnoses, 0) AS severe_diagnoses FROM doctors d LEFT JOIN appts a ON d.id = a.doctor_id LEFT JOIN rxs r ON d.id = r.doctor_id LEFT JOIN diags dg ON d.id = dg.doctor_id ORDER BY gross_revenue DESC, completed_visits DESC LIMIT 24;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute metrics in 3 CTEs (appointments, prescriptions, diagnoses).",
      "Join to doctors with COALESCE.",
      "Order by gross_revenue DESC LIMIT 24."
    ],
    "solution_explanation": "Comprehensive medical staff benchmark integrating clinical revenue, formulary diversity, and case-mix acuity.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hc-L5-085",
    "domain": "healthcare",
    "level": 5,
    "order": 85,
    "difficulty": "boss",
    "title": "Hospital Revenue Cycle Payer Adjudication and Denial Leakage Scorecard",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer adjudication master audit: Using a 3-stage CTE, calculate total claim amount, approved amount, denied claim amount, and contractual write-off haircut per insurance provider. Return insurance provider, total claims, gross claimed, net approved, denied amount, and realization pct.",
    "context_notes": "3-stage CTE calculating payer metrics and contractual write-off percentages.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "insurance_provider",
      "total_claims",
      "gross_claimed",
      "net_approved",
      "denied_amount",
      "realization_pct"
    ],
    "reference_sql": "WITH payer_totals AS (SELECT insurance_provider, COUNT(id) AS total_claims, ROUND(SUM(claim_amount), 2) AS gross_claimed, ROUND(SUM(approved_amount), 2) AS net_approved, ROUND(SUM(CASE WHEN status = 'denied' THEN claim_amount ELSE 0 END), 2) AS denied_amount FROM insurance_claims GROUP BY insurance_provider) SELECT insurance_provider, total_claims, gross_claimed, net_approved, denied_amount, ROUND(net_approved / NULLIF(gross_claimed, 0) * 100.0, 1) AS realization_pct FROM payer_totals ORDER BY gross_claimed DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate claim totals and denied amounts per payer in CTE.",
      "Compute contractual realization percentage in outer query."
    ],
    "solution_explanation": "Master executive payer revenue cycle scorecard isolating claim rejection dollars and recovery yields.",
    "xp": 50,
    "estimated_minutes": 13
  },
  {
    "id": "hc-L5-086",
    "domain": "healthcare",
    "level": 5,
    "order": 86,
    "difficulty": "boss",
    "title": "Hospital Senior Patient Longitudinal Clinical and Billing Ledger",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Geriatric health economics: Using a 3-stage CTE, identify senior patients (born before 1965), and calculate their completed appointments count, total diagnoses recorded, and total hospital billing charges. Return patient first name, last name, date of birth, completed visits, diagnoses count, and total billed charges.",
    "context_notes": "3-stage CTE linking senior patients, visits, diagnoses, and billing.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LEFT JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "dob",
      "completed_visits",
      "diagnoses_count",
      "total_hospital_billed"
    ],
    "reference_sql": "WITH sr_pts AS (SELECT id, first_name, last_name, dob FROM patients WHERE dob < '1965-01-01'), appts AS (SELECT patient_id, COUNT(id) AS completed_visits FROM appointments WHERE status = 'completed' GROUP BY patient_id), diags AS (SELECT patient_id, COUNT(id) AS diagnoses_count FROM diagnoses GROUP BY patient_id), bills AS (SELECT patient_id, ROUND(SUM(total_charge), 2) AS total_hospital_billed FROM billing GROUP BY patient_id) SELECT s.first_name, s.last_name, s.dob, COALESCE(a.completed_visits, 0) AS completed_visits, COALESCE(d.diagnoses_count, 0) AS diagnoses_count, COALESCE(b.total_hospital_billed, 0.00) AS total_hospital_billed FROM sr_pts s LEFT JOIN appts a ON s.id = a.patient_id LEFT JOIN diags d ON s.id = d.patient_id LEFT JOIN bills b ON s.id = b.patient_id ORDER BY total_hospital_billed DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter senior cohort in sr_pts CTE.",
      "Join with visits, diagnoses, and billing CTEs.",
      "Order by total_hospital_billed DESC LIMIT 20."
    ],
    "solution_explanation": "Longitudinal clinical and financial master profile for senior hospital patient population.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hc-L5-087",
    "domain": "healthcare",
    "level": 5,
    "order": 87,
    "difficulty": "boss",
    "title": "Department Operating Room Duration Capacity vs Nursing Shift Ratio",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Surgical operating room and nursing staffing alignment: Using a multi-stage CTE, calculate total procedural minutes and Day shift nurses staffed per department. Compute the procedural minutes per Day nurse ratio. Return department name, total procedural minutes, Day nurses count, and minutes per Day nurse.",
    "context_notes": "Multi-stage CTE joining procedures and nursing shifts per department.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "department_name",
      "total_procedural_minutes",
      "day_nurses_count",
      "minutes_per_day_nurse"
    ],
    "reference_sql": "WITH proc_mins AS (SELECT department_id, SUM(duration_minutes) AS total_procedural_minutes FROM medical_procedures GROUP BY department_id), nurse_staff AS (SELECT department_id, SUM(CASE WHEN shift = 'Day' THEN 1 ELSE 0 END) AS day_nurses_count FROM nurses GROUP BY department_id) SELECT d.name AS department_name, p.total_procedural_minutes, n.day_nurses_count, ROUND(p.total_procedural_minutes::NUMERIC / NULLIF(n.day_nurses_count, 0), 1) AS minutes_per_day_nurse FROM departments d JOIN proc_mins p ON d.id = p.department_id JOIN nurse_staff n ON d.id = n.department_id ORDER BY minutes_per_day_nurse DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute procedural minutes and day nurses in dual CTEs.",
      "Join on department_id and calculate workload ratio."
    ],
    "solution_explanation": "Aligns operative surgical block scheduling with departmental daytime nursing resources.",
    "xp": 50,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L5-088",
    "domain": "healthcare",
    "level": 5,
    "order": 88,
    "difficulty": "boss",
    "title": "Comprehensive Pathology and Diagnostic Abnormality Profile per Specialty",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Specialty diagnostic surveillance: Using a multi-stage CTE, calculate total lab tests ordered and abnormal test flags recorded for patients treated by each doctor specialty. Return specialty, total tests ordered, abnormal flags count, and abnormal flag percentage.",
    "context_notes": "Multi-stage CTE joining doctors, appointments, patients, and lab results.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "specialty",
      "total_tests_ordered",
      "abnormal_flags_count",
      "abnormal_flag_pct"
    ],
    "reference_sql": "WITH spec_labs AS (SELECT d.specialty, COUNT(plr.id) AS total_tests_ordered, SUM(CASE WHEN plr.flag IN ('HIGH', 'LOW') THEN 1 ELSE 0 END) AS abnormal_flags_count FROM doctors d JOIN appointments a ON d.id = a.doctor_id JOIN patient_lab_results plr ON a.patient_id = plr.patient_id GROUP BY d.specialty) SELECT specialty, total_tests_ordered, abnormal_flags_count, ROUND(abnormal_flags_count::NUMERIC / NULLIF(total_tests_ordered, 0) * 100.0, 1) AS abnormal_flag_pct FROM spec_labs ORDER BY abnormal_flag_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join doctors to appointments and lab results in CTE.",
      "Calculate abnormal percentage per specialty."
    ],
    "solution_explanation": "Surfaces medical specialties detecting the highest proportion of pathological biomarker abnormalities.",
    "xp": 50,
    "estimated_minutes": 13
  },
  {
    "id": "hc-L5-089",
    "domain": "healthcare",
    "level": 5,
    "order": 89,
    "difficulty": "boss",
    "title": "Executive Hospital Inpatient Bed Capacity and Staffing Equilibrium",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Inpatient capacity equilibrium: Construct a comprehensive model combining total beds, occupied beds, Day nurses, and Night nurses for each department. Return department name, total beds, occupied beds, Day nurses, Night nurses, and beds per total nurse ratio.",
    "context_notes": "Multi-stage CTE aggregating rooms and nursing shifts per department.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "department_name",
      "total_beds",
      "occupied_beds",
      "day_nurses",
      "night_nurses",
      "beds_per_nurse_ratio"
    ],
    "reference_sql": "WITH bed_stats AS (SELECT department_id, COUNT(id) AS total_beds, SUM(CASE WHEN is_occupied THEN 1 ELSE 0 END) AS occupied_beds FROM rooms GROUP BY department_id), nurse_stats AS (SELECT department_id, SUM(CASE WHEN shift = 'Day' THEN 1 ELSE 0 END) AS day_nurses, SUM(CASE WHEN shift = 'Night' THEN 1 ELSE 0 END) AS night_nurses, COUNT(id) AS total_nurses FROM nurses GROUP BY department_id) SELECT d.name AS department_name, b.total_beds, b.occupied_beds, n.day_nurses, n.night_nurses, ROUND(b.total_beds::NUMERIC / NULLIF(n.total_nurses, 0), 2) AS beds_per_nurse_ratio FROM departments d JOIN bed_stats b ON d.id = b.department_id JOIN nurse_stats n ON d.id = n.department_id ORDER BY b.occupied_beds DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute bed metrics and nursing shifts in dual CTEs.",
      "Calculate beds_per_nurse ratio."
    ],
    "solution_explanation": "Evaluates facility infrastructure and workforce staffing equilibrium across hospital divisions.",
    "xp": 50,
    "estimated_minutes": 13
  },
  {
    "id": "hc-L5-090",
    "domain": "healthcare",
    "level": 5,
    "order": 90,
    "difficulty": "boss",
    "title": "Master Hospital Outpatient Fee Schedule Yield and Median Benchmark",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Fee schedule optimization: Using a multi-stage CTE, calculate total completed visits, gross revenue, average visit fee, and identify the minimum and maximum visit fee for each medical specialty. Return specialty, completed visits, gross revenue, average fee, min fee, and max fee.",
    "context_notes": "CTE aggregating completed appointments per specialty with MIN, MAX, AVG, SUM.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "AVG",
      "MIN",
      "MAX"
    ],
    "expected_columns": [
      "specialty",
      "completed_visits",
      "gross_revenue",
      "avg_fee",
      "min_fee",
      "max_fee"
    ],
    "reference_sql": "WITH spec_fees AS (SELECT d.specialty, COUNT(a.id) AS completed_visits, ROUND(SUM(a.fee), 2) AS gross_revenue, ROUND(AVG(a.fee), 2) AS avg_fee, ROUND(MIN(a.fee), 2) AS min_fee, ROUND(MAX(a.fee), 2) AS max_fee FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.specialty) SELECT specialty, completed_visits, gross_revenue, avg_fee, min_fee, max_fee FROM spec_fees ORDER BY gross_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate completed visits, fees, and bounds per specialty in CTE.",
      "Order by gross_revenue DESC."
    ],
    "solution_explanation": "Comprehensive outpatient fee schedule yield analysis for hospital executive leadership.",
    "xp": 50,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L5-091",
    "domain": "healthcare",
    "level": 5,
    "order": 91,
    "difficulty": "boss",
    "title": "Multimorbid Patient Polypharmacy and High-Dollar Inpatient Exposure",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Complex case management: Identify patients diagnosed with at least 2 distinct conditions who also have at least 1 completed inpatient admission. Calculate their total hospital billing charges. Return patient first name, last name, distinct diagnoses count, and total billed charges.",
    "context_notes": "Multi-stage CTE filtering multimorbid admitted patients joined to billing.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "COUNT DISTINCT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "diagnoses_count",
      "total_hospital_charges"
    ],
    "reference_sql": "WITH multi_pts AS (SELECT patient_id, COUNT(DISTINCT icd10_code) AS diagnoses_count FROM diagnoses GROUP BY patient_id HAVING COUNT(DISTINCT icd10_code) >= 2), adm_pts AS (SELECT DISTINCT patient_id FROM inpatient_admissions), bill_totals AS (SELECT patient_id, ROUND(SUM(total_charge), 2) AS total_hospital_charges FROM billing GROUP BY patient_id) SELECT p.first_name, p.last_name, m.diagnoses_count, b.total_hospital_charges FROM multi_pts m JOIN adm_pts a ON m.patient_id = a.patient_id JOIN patients p ON m.patient_id = p.id JOIN bill_totals b ON p.id = b.patient_id ORDER BY b.total_hospital_charges DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter multimorbid patients and admitted patients in separate CTEs.",
      "Join with patients and billing totals.",
      "Order by total_hospital_charges DESC."
    ],
    "solution_explanation": "Pins down high-cost multimorbid hospitalized patients requiring intense case management.",
    "xp": 50,
    "estimated_minutes": 14
  },
  {
    "id": "hc-L5-092",
    "domain": "healthcare",
    "level": 5,
    "order": 92,
    "difficulty": "boss",
    "title": "Physician Clinical Workload and Schedule Adherence Decile Distribution",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Medical staff activity deciles: Using a CTE, calculate total scheduled appointments for each doctor, and assign doctors into 10 workload deciles using NTILE(10). Return doctor name, specialty, total appointments, and workload decile.",
    "context_notes": "CTE calculating total appointments per doctor, then NTILE(10) in outer query.",
    "concepts": [
      "WITH CTE",
      "NTILE",
      "INNER JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "total_appointments",
      "workload_decile"
    ],
    "reference_sql": "WITH doc_appts AS (SELECT d.name, d.specialty, COUNT(a.id) AS total_appointments FROM doctors d JOIN appointments a ON d.id = a.doctor_id GROUP BY d.id, d.name, d.specialty) SELECT name, specialty, total_appointments, NTILE(10) OVER (ORDER BY total_appointments DESC) AS workload_decile FROM doc_appts ORDER BY workload_decile, total_appointments DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute total appointments per doctor in CTE.",
      "Apply NTILE(10) OVER (ORDER BY total_appointments DESC) in outer query."
    ],
    "solution_explanation": "Ranks physicians into ten granular scheduling demand deciles.",
    "xp": 50,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-093",
    "domain": "healthcare",
    "level": 5,
    "order": 93,
    "difficulty": "boss",
    "title": "Department Procedural Cost Yield vs Outpatient Consultation Yield",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Ambulatory vs procedural service mix: Using a multi-stage CTE, calculate completed appointment revenue and total medical procedures cost for each department. Return department name, appointment revenue, procedure cost potential, and combined clinical yield.",
    "context_notes": "Multi-stage CTE combining appointment fees and procedure costs per department.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "LEFT JOIN",
      "GROUP BY",
      "SUM",
      "COALESCE"
    ],
    "expected_columns": [
      "department_name",
      "appointment_revenue",
      "procedure_cost_potential",
      "combined_clinical_yield"
    ],
    "reference_sql": "WITH appt_rev AS (SELECT dept.id AS department_id, dept.name AS department_name, ROUND(SUM(a.fee), 2) AS appt_revenue FROM departments dept JOIN doctors doc ON dept.id = doc.department_id JOIN appointments a ON doc.id = a.doctor_id WHERE a.status = 'completed' GROUP BY dept.id, dept.name), proc_rev AS (SELECT department_id, ROUND(SUM(standard_cost), 2) AS proc_cost FROM medical_procedures GROUP BY department_id) SELECT a.department_name, a.appt_revenue AS appointment_revenue, COALESCE(p.proc_cost, 0.00) AS procedure_cost_potential, ROUND(a.appt_revenue + COALESCE(p.proc_cost, 0.00), 2) AS combined_clinical_yield FROM appt_rev a LEFT JOIN proc_rev p ON a.department_id = p.department_id ORDER BY combined_clinical_yield DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute appointment revenue and procedure costs in dual CTEs.",
      "Join on department_id and sum combined yield."
    ],
    "solution_explanation": "Analyzes departmental service line revenue diversification.",
    "xp": 50,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L5-094",
    "domain": "healthcare",
    "level": 5,
    "order": 94,
    "difficulty": "boss",
    "title": "Inpatient Admission Length of Stay and Discharge Disposition Scorecard",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Discharge disposition metrics: Using a CTE, calculate total admissions, average length of stay in days, and total bed days for each discharge disposition. Return discharge disposition, admissions count, avg stay days, and total bed days.",
    "context_notes": "CTE aggregating completed inpatient admissions per discharge disposition.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "AVG",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "discharge_disposition",
      "admissions_count",
      "avg_stay_days",
      "total_bed_days"
    ],
    "reference_sql": "WITH disp_metrics AS (SELECT discharge_disposition, COUNT(id) AS admissions_count, ROUND(AVG(discharge_date - admission_date), 1) AS avg_stay_days, SUM(discharge_date - admission_date) AS total_bed_days FROM inpatient_admissions WHERE discharge_date IS NOT NULL GROUP BY discharge_disposition) SELECT discharge_disposition, admissions_count, avg_stay_days, total_bed_days FROM disp_metrics ORDER BY total_bed_days DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group completed admissions by discharge_disposition in CTE.",
      "Compute admissions, avg stay, and total bed days."
    ],
    "solution_explanation": "Informs post-acute care coordination and skilled nursing facility transfer planning.",
    "xp": 50,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-095",
    "domain": "healthcare",
    "level": 5,
    "order": 95,
    "difficulty": "boss",
    "title": "Hospital Pharmacy Formulary High-Cost Medication Expenditure Breakdown",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Formulary cost tiering: Using a CTE that joins prescriptions to medications, calculate total prescriptions and total formulary cost for medications costing >= $10.00 vs < $10.00. Return cost tier, total prescriptions, and total spend.",
    "context_notes": "CTE categorizing medications by unit cost, then aggregating spend.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM",
      "CASE WHEN"
    ],
    "expected_columns": [
      "cost_tier",
      "total_prescriptions",
      "total_spend"
    ],
    "reference_sql": "WITH rx_costs AS (SELECT pr.id, m.unit_cost, (CASE WHEN m.unit_cost >= 10.00 THEN 'High Cost (>= $10)' ELSE 'Standard (< $10)' END) AS cost_tier FROM prescriptions pr JOIN medications m ON pr.medication_name = m.name) SELECT cost_tier, COUNT(id) AS total_prescriptions, ROUND(SUM(unit_cost), 2) AS total_spend FROM rx_costs GROUP BY cost_tier ORDER BY total_spend DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Categorize medications by unit cost in CTE.",
      "Aggregate prescription counts and total spend."
    ],
    "solution_explanation": "Analyzes pharmacy acquisition budget concentration across expensive formulary agents.",
    "xp": 50,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-096",
    "domain": "healthcare",
    "level": 5,
    "order": 96,
    "difficulty": "boss",
    "title": "Hospital Payer Claims Adjudication Velocity Decile Distribution (NTILE CTE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Claim payment speed deciles: Using a CTE, calculate average settlement days for approved claims per insurance provider, and assign providers to speed tiers. Return insurance provider, approved claims count, average settlement days, and speed rank.",
    "context_notes": "CTE calculating settlement speed, then ranking in outer query.",
    "concepts": [
      "WITH CTE",
      "GROUP BY",
      "AVG",
      "ROUND",
      "ORDER BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "approved_claims",
      "avg_settlement_days",
      "speed_rank"
    ],
    "reference_sql": "WITH payer_speed AS (SELECT insurance_provider, COUNT(id) AS approved_claims, ROUND(AVG(settlement_days), 1) AS avg_settlement_days, DENSE_RANK() OVER (ORDER BY AVG(settlement_days) ASC) AS speed_rank FROM insurance_claims WHERE status = 'approved' GROUP BY insurance_provider) SELECT insurance_provider, approved_claims, avg_settlement_days, speed_rank FROM payer_speed ORDER BY speed_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute avg settlement days and rank with DENSE_RANK() in CTE.",
      "Select carrier speed rankings."
    ],
    "solution_explanation": "Ranks health insurance carriers by claims reimbursement velocity.",
    "xp": 50,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-097",
    "domain": "healthcare",
    "level": 5,
    "order": 97,
    "difficulty": "boss",
    "title": "Department Nursing Shift Coverage and NP Staffing Ratio",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Advanced practice nursing ratio: Using a CTE, calculate total nurses, Nurse Practitioners (NP) count, and NP staffing percentage for each department. Return department name, total nurses, NP count, and NP percentage.",
    "context_notes": "CTE aggregating nurses per department and computing NP percentage.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE",
      "ROUND"
    ],
    "expected_columns": [
      "department_name",
      "total_nurses",
      "np_count",
      "np_percentage"
    ],
    "reference_sql": "WITH dept_nurses AS (SELECT d.name AS department_name, COUNT(n.id) AS total_nurses, SUM(CASE WHEN n.certification_level = 'NP' THEN 1 ELSE 0 END) AS np_count FROM departments d JOIN nurses n ON d.id = n.department_id GROUP BY d.id, d.name) SELECT department_name, total_nurses, np_count, ROUND(np_count::NUMERIC / NULLIF(total_nurses, 0) * 100.0, 1) AS np_percentage FROM dept_nurses ORDER BY np_percentage DESC, total_nurses DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute total nurses and NP count per department in CTE.",
      "Calculate NP percentage."
    ],
    "solution_explanation": "Evaluates advanced clinical nursing deployment across hospital units.",
    "xp": 50,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-098",
    "domain": "healthcare",
    "level": 5,
    "order": 98,
    "difficulty": "boss",
    "title": "Comprehensive Pathology Abnormal Diagnostic Flag Rate by Category",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Laboratory surveillance scorecard: Using a multi-stage CTE, calculate total tests performed, abnormal results count, and abnormal flag percentage for each pathology category. Return category, total tests, abnormal count, and abnormal pct.",
    "context_notes": "Multi-stage CTE computing test volumes and abnormal percentages per category.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE",
      "ROUND"
    ],
    "expected_columns": [
      "category",
      "total_tests",
      "abnormal_count",
      "abnormal_pct"
    ],
    "reference_sql": "WITH lab_cats AS (SELECT lt.category, COUNT(plr.id) AS total_tests, SUM(CASE WHEN plr.flag IN ('HIGH', 'LOW') THEN 1 ELSE 0 END) AS abnormal_count FROM lab_tests lt JOIN patient_lab_results plr ON lt.id = plr.test_id GROUP BY lt.category) SELECT category, total_tests, abnormal_count, ROUND(abnormal_count::NUMERIC / NULLIF(total_tests, 0) * 100.0, 1) AS abnormal_pct FROM lab_cats ORDER BY abnormal_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join lab_tests to patient_lab_results in CTE.",
      "Compute abnormal percentage per category."
    ],
    "solution_explanation": "Highlights pathology divisions detecting elevated disease activity.",
    "xp": 50,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L5-099",
    "domain": "healthcare",
    "level": 5,
    "order": 99,
    "difficulty": "boss",
    "title": "Hospital Accounts Receivable Uncollected Balances Aging Portfolio",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Aging receivables summary: Using a CTE, calculate total vouchers, total billed charges, insurance covered, and remaining patient balance owed for overdue billing vouchers across patient insurance providers. Return insurance provider, overdue vouchers, total billed, insurance covered, and overdue balance.",
    "context_notes": "CTE filtering overdue billing records joined to patients.",
    "concepts": [
      "WITH CTE",
      "INNER JOIN",
      "WHERE",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "insurance_provider",
      "overdue_vouchers",
      "total_billed",
      "total_insurance_covered",
      "overdue_balance"
    ],
    "reference_sql": "WITH overdue_ar AS (SELECT p.insurance_provider, COUNT(b.id) AS overdue_vouchers, ROUND(SUM(b.total_charge), 2) AS total_billed, ROUND(SUM(b.insurance_covered), 2) AS total_insurance_covered, ROUND(SUM(b.patient_balance), 2) AS overdue_balance FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.status = 'overdue' GROUP BY p.insurance_provider) SELECT insurance_provider, overdue_vouchers, total_billed, total_insurance_covered, overdue_balance FROM overdue_ar ORDER BY overdue_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join overdue billing to patients in CTE.",
      "Aggregate charges, insurance covered, and patient balance per provider."
    ],
    "solution_explanation": "Profiles delinquency exposure and bad-debt risk by insurance carrier.",
    "xp": 50,
    "estimated_minutes": 11
  },
  {
    "id": "hc-L5-100",
    "domain": "healthcare",
    "level": 5,
    "order": 100,
    "difficulty": "boss",
    "title": "Chief Executive Officer Hospital Enterprise Master Operational & Financial Summary",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Executive Board Comprehensive Hospital State-of-the-System: Construct an all-encompassing enterprise CTE model uniting hospital operations. Calculate: (1) Total completed outpatient appointments, (2) Total outpatient fee revenue, (3) Total completed inpatient admissions, (4) Total inpatient bed days, (5) Total hospital billing charges across all vouchers, and (6) Total patient balance uncollected. Return total completed visits, outpatient fee revenue, inpatient admissions count, inpatient bed days, total billed charges, and total patient balance owed.",
    "context_notes": "6-stage unified enterprise CTE synthesizing hospital-wide operational and financial KPIs.",
    "concepts": [
      "WITH CTE",
      "MULTI-STAGE CTE",
      "SUM",
      "COUNT"
    ],
    "expected_columns": [
      "total_completed_visits",
      "outpatient_fee_revenue",
      "inpatient_admissions_count",
      "inpatient_bed_days",
      "total_billed_charges",
      "total_patient_balance_owed"
    ],
    "reference_sql": "WITH appt_summary AS (SELECT COUNT(id) AS total_completed_visits, ROUND(SUM(fee), 2) AS outpatient_fee_revenue FROM appointments WHERE status = 'completed'), adm_summary AS (SELECT COUNT(id) AS inpatient_admissions_count, SUM(discharge_date - admission_date) AS inpatient_bed_days FROM inpatient_admissions WHERE discharge_date IS NOT NULL), bill_summary AS (SELECT ROUND(SUM(total_charge), 2) AS total_billed_charges, ROUND(SUM(patient_balance), 2) AS total_patient_balance_owed FROM billing) SELECT a.total_completed_visits, a.outpatient_fee_revenue, ad.inpatient_admissions_count, ad.inpatient_bed_days, b.total_billed_charges, b.total_patient_balance_owed FROM appt_summary a CROSS JOIN adm_summary ad CROSS JOIN bill_summary b;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute outpatient KPIs in appt_summary CTE.",
      "Compute inpatient KPIs in adm_summary CTE.",
      "Compute revenue cycle KPIs in bill_summary CTE.",
      "CROSS JOIN to produce a single executive dashboard row."
    ],
    "solution_explanation": "Grand capstone executive enterprise state-of-the-hospital model uniting clinical throughput, inpatient bed utilization, and gross institutional revenue cycle metrics.",
    "xp": 50,
    "estimated_minutes": 15
  }
];
