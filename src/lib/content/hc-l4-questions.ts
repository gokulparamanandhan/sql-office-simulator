import { QuestionDefinition } from "./ecom-l1-questions";

export const HC_L4_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "hc-L4-001",
    "domain": "healthcare",
    "level": 4,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Physician Ranking by Appointment Volume within Department",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Department clinical leadership: Rank doctors within each department based on their total completed appointment count using ROW_NUMBER. Return department_id, doctor name, completed visits, and rank.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY COUNT(a.id) DESC).",
    "concepts": [
      "SELECT",
      "ROW_NUMBER",
      "PARTITION BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_id",
      "doctor_name",
      "completed_visits",
      "dept_rank"
    ],
    "reference_sql": "SELECT d.department_id, d.name AS doctor_name, COUNT(a.id) AS completed_visits, ROW_NUMBER() OVER (PARTITION BY d.department_id ORDER BY COUNT(a.id) DESC) AS dept_rank FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.department_id, d.id, d.name ORDER BY d.department_id, dept_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group by doctor and department.",
      "Apply ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY COUNT(a.id) DESC)."
    ],
    "solution_explanation": "Ranks physicians by clinical productivity within their respective departments.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-002",
    "domain": "healthcare",
    "level": 4,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Patient Chronological Appointment Sequence",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Patient longitudinal tracking: Number each patient appointments chronologically using ROW_NUMBER. Return patient_id, appointment id, appointment date, and encounter sequence number.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY appointment_date ASC).",
    "concepts": [
      "SELECT",
      "ROW_NUMBER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "patient_id",
      "appointment_id",
      "appointment_date",
      "visit_number"
    ],
    "reference_sql": "SELECT patient_id, id AS appointment_id, appointment_date, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY appointment_date ASC) AS visit_number FROM appointments ORDER BY patient_id, visit_number;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by patient_id.",
      "Order by appointment_date ASC inside ROW_NUMBER()."
    ],
    "solution_explanation": "Generates an ordinal sequence index for every patient encounter.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-003",
    "domain": "healthcare",
    "level": 4,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Inpatient Length of Stay Ranking",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Bed utilization audit: Calculate length of stay in days (discharge_date - admission_date) for all completed inpatient admissions, and rank them from longest to shortest using DENSE_RANK. Return admission id, patient_id, length of stay, and stay rank.",
    "context_notes": "DENSE_RANK() OVER (ORDER BY (discharge_date - admission_date) DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "OVER",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "id",
      "patient_id",
      "length_of_stay",
      "stay_rank"
    ],
    "reference_sql": "SELECT id, patient_id, (discharge_date - admission_date) AS length_of_stay, DENSE_RANK() OVER (ORDER BY (discharge_date - admission_date) DESC) AS stay_rank FROM inpatient_admissions WHERE discharge_date IS NOT NULL ORDER BY stay_rank, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute stay as (discharge_date - admission_date).",
      "Apply DENSE_RANK() OVER (ORDER BY stay DESC)."
    ],
    "solution_explanation": "Ranks inpatient hospitalizations by total duration of stay.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-004",
    "domain": "healthcare",
    "level": 4,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Billing Vouchers Ranked Within Insurance Carrier",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Carrier invoice stratification: Rank billing records by total charge descending within each insurance provider using RANK(). Return insurance provider, billing id, total charge, and payer rank.",
    "context_notes": "RANK() OVER (PARTITION BY p.insurance_provider ORDER BY b.total_charge DESC).",
    "concepts": [
      "SELECT",
      "RANK",
      "PARTITION BY",
      "JOIN"
    ],
    "expected_columns": [
      "insurance_provider",
      "billing_id",
      "total_charge",
      "payer_rank"
    ],
    "reference_sql": "SELECT p.insurance_provider, b.id AS billing_id, b.total_charge, RANK() OVER (PARTITION BY p.insurance_provider ORDER BY b.total_charge DESC) AS payer_rank FROM billing b JOIN patients p ON b.patient_id = p.id ORDER BY p.insurance_provider, payer_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing to patients.",
      "Apply RANK() OVER (PARTITION BY p.insurance_provider ORDER BY b.total_charge DESC)."
    ],
    "solution_explanation": "Surfaces the highest dollar claims per commercial and government health plan.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-005",
    "domain": "healthcare",
    "level": 4,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Top Priced Inpatient Bed in Each Department",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Facility rate hierarchy: Rank rooms by daily rate descending within each department using DENSE_RANK. Return department_id, room number, room type, daily rate, and price rank.",
    "context_notes": "DENSE_RANK() OVER (PARTITION BY department_id ORDER BY daily_rate DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "PARTITION BY"
    ],
    "expected_columns": [
      "department_id",
      "room_number",
      "room_type",
      "daily_rate",
      "price_rank"
    ],
    "reference_sql": "SELECT department_id, room_number, room_type, daily_rate, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY daily_rate DESC) AS price_rank FROM rooms ORDER BY department_id, price_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition rooms by department_id.",
      "Order by daily_rate DESC with DENSE_RANK()."
    ],
    "solution_explanation": "Identifies premier rate accommodations within each clinical care department.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-006",
    "domain": "healthcare",
    "level": 4,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Formulary Unit Cost Ranking per Dosage Form",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Pharmacy formulary cost tiers: Rank medications by unit cost descending within each dosage form (Tablet, Capsule, Inhaler) using ROW_NUMBER. Return dosage form, medication name, unit cost, and cost rank.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY dosage_form ORDER BY unit_cost DESC).",
    "concepts": [
      "SELECT",
      "ROW_NUMBER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "dosage_form",
      "name",
      "unit_cost",
      "cost_rank"
    ],
    "reference_sql": "SELECT dosage_form, name, unit_cost, ROW_NUMBER() OVER (PARTITION BY dosage_form ORDER BY unit_cost DESC) AS cost_rank FROM medications ORDER BY dosage_form, cost_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by dosage_form.",
      "Order by unit_cost DESC inside ROW_NUMBER()."
    ],
    "solution_explanation": "Ranks pharmaceutical agents by procurement expense across dosage categories.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-007",
    "domain": "healthcare",
    "level": 4,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Doctor Outpatient Fee Ranking Across Entire Hospital",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Hospital fee schedule: Rank all completed appointments by visit fee descending across the entire hospital using DENSE_RANK. Return appointment id, doctor id, fee, and overall fee rank.",
    "context_notes": "DENSE_RANK() OVER (ORDER BY fee DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "OVER"
    ],
    "expected_columns": [
      "id",
      "doctor_id",
      "fee",
      "fee_rank"
    ],
    "reference_sql": "SELECT id, doctor_id, fee, DENSE_RANK() OVER (ORDER BY fee DESC) AS fee_rank FROM appointments WHERE status = 'completed' ORDER BY fee_rank, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE status = completed.",
      "Apply DENSE_RANK() OVER (ORDER BY fee DESC)."
    ],
    "solution_explanation": "Ranks completed outpatient consultations by clinical fee value.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-008",
    "domain": "healthcare",
    "level": 4,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Lab Test Diagnostic Fee Ranking by Category",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Pathology pricing analysis: Rank diagnostic lab tests by standard fee descending within each laboratory category using ROW_NUMBER. Return category, test name, standard fee, and category rank.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY category ORDER BY standard_fee DESC).",
    "concepts": [
      "SELECT",
      "ROW_NUMBER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "category",
      "test_name",
      "standard_fee",
      "category_rank"
    ],
    "reference_sql": "SELECT category, test_name, standard_fee, ROW_NUMBER() OVER (PARTITION BY category ORDER BY standard_fee DESC) AS category_rank FROM lab_tests ORDER BY category, category_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by category.",
      "Order by standard_fee DESC in ROW_NUMBER()."
    ],
    "solution_explanation": "Structures diagnostic tests by standard fee tiers within pathology divisions.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-009",
    "domain": "healthcare",
    "level": 4,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Prescriptions Count Rank for Doctors by Specialty",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Prescription distribution: Count total prescriptions written by each doctor and rank doctors within their medical specialty using DENSE_RANK. Return specialty, doctor name, prescription count, and specialty rank.",
    "context_notes": "DENSE_RANK() OVER (PARTITION BY d.specialty ORDER BY COUNT(pr.id) DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "PARTITION BY",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "specialty",
      "doctor_name",
      "prescriptions_count",
      "specialty_rank"
    ],
    "reference_sql": "SELECT d.specialty, d.name AS doctor_name, COUNT(pr.id) AS prescriptions_count, DENSE_RANK() OVER (PARTITION BY d.specialty ORDER BY COUNT(pr.id) DESC) AS specialty_rank FROM doctors d LEFT JOIN prescriptions pr ON d.id = pr.doctor_id GROUP BY d.specialty, d.id, d.name ORDER BY d.specialty, specialty_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group by doctor and specialty.",
      "Apply DENSE_RANK() OVER (PARTITION BY d.specialty ORDER BY COUNT(pr.id) DESC)."
    ],
    "solution_explanation": "Compares physician prescribing patterns against peers in identical specialties.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-010",
    "domain": "healthcare",
    "level": 4,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Insurance Claim Settlement Time Ranking",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer reimbursement velocity: Rank approved insurance claims by settlement days descending within each insurance provider using RANK(). Return insurance provider, claim id, settlement days, and claim rank.",
    "context_notes": "RANK() OVER (PARTITION BY insurance_provider ORDER BY settlement_days DESC).",
    "concepts": [
      "SELECT",
      "RANK",
      "PARTITION BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "id",
      "settlement_days",
      "claim_rank"
    ],
    "reference_sql": "SELECT insurance_provider, id, settlement_days, RANK() OVER (PARTITION BY insurance_provider ORDER BY settlement_days DESC) AS claim_rank FROM insurance_claims WHERE status = 'approved' ORDER BY insurance_provider, claim_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by insurance_provider WHERE status = approved.",
      "Order by settlement_days DESC with RANK()."
    ],
    "solution_explanation": "Identifies the most delayed approved claims within each health plan network.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-011",
    "domain": "healthcare",
    "level": 4,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Patient Diagnostic History Order by Date",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Clinical history sequencing: For each patient, number their diagnoses in chronological order of diagnosis date using ROW_NUMBER. Return patient_id, diagnosis date, ICD-10 code, description, and diagnosis sequence.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY diagnosis_date ASC).",
    "concepts": [
      "SELECT",
      "ROW_NUMBER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "patient_id",
      "diagnosis_date",
      "icd10_code",
      "description",
      "diag_sequence"
    ],
    "reference_sql": "SELECT patient_id, diagnosis_date, icd10_code, description, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY diagnosis_date ASC) AS diag_sequence FROM diagnoses ORDER BY patient_id, diag_sequence;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by patient_id.",
      "Order by diagnosis_date ASC inside ROW_NUMBER()."
    ],
    "solution_explanation": "Constructs a chronological disease onset timeline for each patient chart.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-012",
    "domain": "healthcare",
    "level": 4,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Top 3 Most Expensive Inpatient Admissions per Doctor",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Admitting physician cost review: Rank admissions by room daily rate descending for each admitting doctor using DENSE_RANK. Return doctor id, admission id, room daily rate, and doctor rank.",
    "context_notes": "DENSE_RANK() OVER (PARTITION BY ia.admitting_doctor_id ORDER BY r.daily_rate DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "PARTITION BY",
      "JOIN"
    ],
    "expected_columns": [
      "admitting_doctor_id",
      "admission_id",
      "daily_rate",
      "doctor_rank"
    ],
    "reference_sql": "SELECT ia.admitting_doctor_id, ia.id AS admission_id, r.daily_rate, DENSE_RANK() OVER (PARTITION BY ia.admitting_doctor_id ORDER BY r.daily_rate DESC) AS doctor_rank FROM inpatient_admissions ia JOIN rooms r ON ia.room_id = r.id ORDER BY ia.admitting_doctor_id, doctor_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join inpatient_admissions to rooms.",
      "Apply DENSE_RANK() OVER (PARTITION BY ia.admitting_doctor_id ORDER BY r.daily_rate DESC)."
    ],
    "solution_explanation": "Evaluates inpatient room accommodation intensity per admitting physician.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-013",
    "domain": "healthcare",
    "level": 4,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Patient Outpatient Spending Quartiles (NTILE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Patient financial segmentation: Segment all patients who have billing records into 4 equal financial quartiles using NTILE(4) based on their total billed charge. Return patient_id, total charge, and spend quartile.",
    "context_notes": "NTILE(4) OVER (ORDER BY total_charge DESC).",
    "concepts": [
      "SELECT",
      "NTILE",
      "OVER"
    ],
    "expected_columns": [
      "patient_id",
      "total_charge",
      "spend_quartile"
    ],
    "reference_sql": "SELECT patient_id, total_charge, NTILE(4) OVER (ORDER BY total_charge DESC) AS spend_quartile FROM billing ORDER BY spend_quartile, total_charge DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Apply NTILE(4) OVER (ORDER BY total_charge DESC) to billing.",
      "Project patient_id, total_charge, spend_quartile."
    ],
    "solution_explanation": "Stratifies patient encounters into four statistical financial liability tiers.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-014",
    "domain": "healthcare",
    "level": 4,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Doctor Clinical Caseload Quartiles",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician staffing balance: Group doctors into 4 activity quartiles using NTILE(4) based on total completed visits. Return doctor name, specialty, completed visits, and quartile tier.",
    "context_notes": "NTILE(4) OVER (ORDER BY COUNT(a.id) DESC).",
    "concepts": [
      "SELECT",
      "NTILE",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "completed_visits",
      "caseload_tier"
    ],
    "reference_sql": "SELECT d.name, d.specialty, COUNT(a.id) AS completed_visits, NTILE(4) OVER (ORDER BY COUNT(a.id) DESC) AS caseload_tier FROM doctors d LEFT JOIN appointments a ON d.id = a.doctor_id AND a.status = 'completed' GROUP BY d.id, d.name, d.specialty ORDER BY caseload_tier, completed_visits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by doctor.",
      "Apply NTILE(4) OVER (ORDER BY COUNT(a.id) DESC)."
    ],
    "solution_explanation": "Segments active medical staff into four clinical encounter workload cohorts.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-015",
    "domain": "healthcare",
    "level": 4,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Abnormal Lab Value Severity Rank per Test",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Extreme value detection: For each diagnostic lab test, rank patient lab results by result value descending using DENSE_RANK. Return test_id, patient_id, result_value, and result rank.",
    "context_notes": "DENSE_RANK() OVER (PARTITION BY test_id ORDER BY result_value DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "PARTITION BY"
    ],
    "expected_columns": [
      "test_id",
      "patient_id",
      "result_value",
      "result_rank"
    ],
    "reference_sql": "SELECT test_id, patient_id, result_value, DENSE_RANK() OVER (PARTITION BY test_id ORDER BY result_value DESC) AS result_rank FROM patient_lab_results ORDER BY test_id, result_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition patient_lab_results by test_id.",
      "Order by result_value DESC with DENSE_RANK()."
    ],
    "solution_explanation": "Surfaces the highest recorded biomarker values per clinical diagnostic panel.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-016",
    "domain": "healthcare",
    "level": 4,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Consecutive Prescription Refill Comparison",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Maintenance dosage stability: For each patient, retrieve their prescriptions in order of id and show the refills of the PREVIOUS prescription using LAG(). Return patient_id, medication name, refills, and previous refills.",
    "context_notes": "LAG(refills, 1) OVER (PARTITION BY patient_id ORDER BY id ASC).",
    "concepts": [
      "SELECT",
      "LAG",
      "PARTITION BY",
      "OVER"
    ],
    "expected_columns": [
      "patient_id",
      "medication_name",
      "refills",
      "prev_refills"
    ],
    "reference_sql": "SELECT patient_id, medication_name, refills, LAG(refills, 1) OVER (PARTITION BY patient_id ORDER BY id ASC) AS prev_refills FROM prescriptions ORDER BY patient_id, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition prescriptions by patient_id.",
      "Apply LAG(refills, 1) OVER (PARTITION BY patient_id ORDER BY id ASC)."
    ],
    "solution_explanation": "Tracks changes in authorized medication refill quantities across serial orders.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-017",
    "domain": "healthcare",
    "level": 4,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Consecutive Encounter Fee Tracking (LAG)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Visit fee trajectory: For each patient, show each appointment date, fee, and the fee of their immediately preceding appointment using LAG(). Return patient_id, appointment_date, fee, and previous fee.",
    "context_notes": "LAG(fee, 1) OVER (PARTITION BY patient_id ORDER BY appointment_date ASC).",
    "concepts": [
      "SELECT",
      "LAG",
      "PARTITION BY",
      "OVER"
    ],
    "expected_columns": [
      "patient_id",
      "appointment_date",
      "fee",
      "prev_fee"
    ],
    "reference_sql": "SELECT patient_id, appointment_date, fee, LAG(fee, 1) OVER (PARTITION BY patient_id ORDER BY appointment_date ASC) AS prev_fee FROM appointments ORDER BY patient_id, appointment_date;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition appointments by patient_id.",
      "Apply LAG(fee, 1) OVER (PARTITION BY patient_id ORDER BY appointment_date ASC)."
    ],
    "solution_explanation": "Monitors patient appointment charge escalation or de-escalation over time.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-018",
    "domain": "healthcare",
    "level": 4,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Insurance Claim Turnaround Comparison With Next Claim (LEAD)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer processing trend: For claims sorted by id within each insurance provider, display the settlement days alongside the settlement days of the NEXT claim using LEAD(). Return insurance provider, id, settlement days, and next settlement days.",
    "context_notes": "LEAD(settlement_days, 1) OVER (PARTITION BY insurance_provider ORDER BY id ASC).",
    "concepts": [
      "SELECT",
      "LEAD",
      "PARTITION BY",
      "OVER"
    ],
    "expected_columns": [
      "insurance_provider",
      "id",
      "settlement_days",
      "next_settlement_days"
    ],
    "reference_sql": "SELECT insurance_provider, id, settlement_days, LEAD(settlement_days, 1) OVER (PARTITION BY insurance_provider ORDER BY id ASC) AS next_settlement_days FROM insurance_claims ORDER BY insurance_provider, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by insurance_provider.",
      "Apply LEAD(settlement_days, 1) OVER (PARTITION BY insurance_provider ORDER BY id ASC)."
    ],
    "solution_explanation": "Tracks sequential claim adjudication velocity trends for health plans.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-019",
    "domain": "healthcare",
    "level": 4,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Patient Age Ranking Within City of Residence",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Community geriatric distribution: Rank patients by date of birth ascending (oldest first) within their city using DENSE_RANK. Return city, first name, last name, dob, and age rank.",
    "context_notes": "DENSE_RANK() OVER (PARTITION BY city ORDER BY dob ASC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "PARTITION BY"
    ],
    "expected_columns": [
      "city",
      "first_name",
      "last_name",
      "dob",
      "age_rank"
    ],
    "reference_sql": "SELECT city, first_name, last_name, dob, DENSE_RANK() OVER (PARTITION BY city ORDER BY dob ASC) AS age_rank FROM patients ORDER BY city, age_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by city.",
      "Order by dob ASC in DENSE_RANK()."
    ],
    "solution_explanation": "Surfaces the senior patient cohort within each municipal jurisdiction.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-020",
    "domain": "healthcare",
    "level": 4,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Department Nurse Shift Sequence",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Nursing roster ordering: Number nurses sequentially within their assigned department using ROW_NUMBER, sorted by shift and nurse name. Return department_id, name, shift, certification, and roster number.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY shift, name).",
    "concepts": [
      "SELECT",
      "ROW_NUMBER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "department_id",
      "name",
      "shift",
      "certification_level",
      "roster_number"
    ],
    "reference_sql": "SELECT department_id, name, shift, certification_level, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY shift, name) AS roster_number FROM nurses ORDER BY department_id, roster_number;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition nurses by department_id.",
      "Order by shift and name inside ROW_NUMBER()."
    ],
    "solution_explanation": "Creates an organized departmental nursing shift roster.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-021",
    "domain": "healthcare",
    "level": 4,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Cumulative Revenue by Appointment Date (SUM OVER)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Outpatient revenue accumulation: Calculate a running total of appointment fees chronologically ordered by appointment date for completed visits using SUM() OVER. Return id, appointment date, fee, and running revenue.",
    "context_notes": "SUM(fee) OVER (ORDER BY appointment_date ASC, id ASC).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "ORDER BY"
    ],
    "expected_columns": [
      "id",
      "appointment_date",
      "fee",
      "running_revenue"
    ],
    "reference_sql": "SELECT id, appointment_date, fee, ROUND(SUM(fee) OVER (ORDER BY appointment_date ASC, id ASC), 2) AS running_revenue FROM appointments WHERE status = 'completed' ORDER BY appointment_date ASC, id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE status = completed.",
      "Apply SUM(fee) OVER (ORDER BY appointment_date ASC, id ASC)."
    ],
    "solution_explanation": "Generates a cumulative cash inflow curve from outpatient clinical encounters.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-022",
    "domain": "healthcare",
    "level": 4,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Patient Cumulative Billed Total Over Time",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Patient ledger accumulation: For each patient, compute the running total of their billing charges sorted by billing id using SUM() OVER. Return patient_id, billing id, total charge, and running patient total.",
    "context_notes": "SUM(total_charge) OVER (PARTITION BY patient_id ORDER BY id ASC).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "patient_id",
      "id",
      "total_charge",
      "running_patient_total"
    ],
    "reference_sql": "SELECT patient_id, id, total_charge, ROUND(SUM(total_charge) OVER (PARTITION BY patient_id ORDER BY id ASC), 2) AS running_patient_total FROM billing ORDER BY patient_id, id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by patient_id.",
      "Order by id ASC in SUM(total_charge) OVER (...)."
    ],
    "solution_explanation": "Tracks individual patient cumulative healthcare expenditure accumulation.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-023",
    "domain": "healthcare",
    "level": 4,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Department Average Fee Benchmark Comparison (AVG OVER)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Physician pricing variance: Display each appointment id, fee, and the overall average fee across all completed appointments alongside it using AVG() OVER(). Return id, doctor_id, fee, and overall avg fee.",
    "context_notes": "AVG(fee) OVER () across completed appointments.",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "doctor_id",
      "fee",
      "hospital_avg_fee"
    ],
    "reference_sql": "SELECT id, doctor_id, fee, ROUND(AVG(fee) OVER (), 2) AS hospital_avg_fee FROM appointments WHERE status = 'completed' ORDER BY id ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute AVG(fee) OVER () across completed visits.",
      "Project alongside encounter fee."
    ],
    "solution_explanation": "Benchmarks individual visit fees directly against the global outpatient mean.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-024",
    "domain": "healthcare",
    "level": 4,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Doctor Specialty Average Fee Comparison",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Specialty benchmark: For each completed appointment, show the doctor specialty, fee, and the average fee for that specific doctor specialty using AVG() OVER (PARTITION BY specialty). Return appointment id, specialty, fee, and specialty avg fee.",
    "context_notes": "AVG(a.fee) OVER (PARTITION BY d.specialty).",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "PARTITION BY",
      "JOIN"
    ],
    "expected_columns": [
      "id",
      "specialty",
      "fee",
      "specialty_avg_fee"
    ],
    "reference_sql": "SELECT a.id, d.specialty, a.fee, ROUND(AVG(a.fee) OVER (PARTITION BY d.specialty), 2) AS specialty_avg_fee FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed' ORDER BY d.specialty, a.id;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments to doctors.",
      "Apply AVG(a.fee) OVER (PARTITION BY d.specialty)."
    ],
    "solution_explanation": "Compares each appointment fee against the normative rate for that specialty.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-025",
    "domain": "healthcare",
    "level": 4,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Inpatient Daily Rate vs Department Minimum Rate",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Room pricing floor: For each room, display room number, department_id, daily rate, and the minimum daily rate available in that department using MIN() OVER (PARTITION BY department_id). Return room number, department_id, daily rate, and dept min rate.",
    "context_notes": "MIN(daily_rate) OVER (PARTITION BY department_id).",
    "concepts": [
      "SELECT",
      "MIN OVER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "room_number",
      "department_id",
      "daily_rate",
      "dept_min_rate"
    ],
    "reference_sql": "SELECT room_number, department_id, daily_rate, MIN(daily_rate) OVER (PARTITION BY department_id) AS dept_min_rate FROM rooms ORDER BY department_id, room_number;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition rooms by department_id.",
      "Compute MIN(daily_rate) OVER (PARTITION BY department_id)."
    ],
    "solution_explanation": "Evaluates room premium markups relative to departmental base accommodation rates.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-026",
    "domain": "healthcare",
    "level": 4,
    "order": 26,
    "difficulty": "core",
    "title": "Days Elapsed Between Serial Patient Appointments (LAG)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Appointment adherence & intervals: For patients with repeat appointments, calculate the days elapsed since their immediately preceding appointment using LAG(). Return patient_id, appointment date, previous date, and days elapsed.",
    "context_notes": "EXTRACT(DAY FROM (appointment_date - LAG(appointment_date) OVER (PARTITION BY patient_id ORDER BY appointment_date ASC))).",
    "concepts": [
      "SELECT",
      "LAG",
      "PARTITION BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "patient_id",
      "appointment_date",
      "prev_date",
      "days_elapsed"
    ],
    "reference_sql": "SELECT patient_id, appointment_date, LAG(appointment_date, 1) OVER (PARTITION BY patient_id ORDER BY appointment_date ASC) AS prev_date, ROUND(EXTRACT(EPOCH FROM (appointment_date - LAG(appointment_date, 1) OVER (PARTITION BY patient_id ORDER BY appointment_date ASC))) / 86400, 1) AS days_elapsed FROM appointments ORDER BY patient_id, appointment_date;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by patient_id, order by appointment_date ASC.",
      "Compute days_elapsed via EPOCH difference divided by 86400."
    ],
    "solution_explanation": "Measures outpatient recall intervals and clinical follow-up compliance.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-027",
    "domain": "healthcare",
    "level": 4,
    "order": 27,
    "difficulty": "core",
    "title": "Running Total of Cumulative Insurance Claims by Provider",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer cash flow accumulation: For each insurance provider, compute a running total of approved claim dollars ordered by claim id using SUM() OVER. Return insurance provider, claim id, approved amount, and cumulative approved.",
    "context_notes": "SUM(approved_amount) OVER (PARTITION BY insurance_provider ORDER BY id ASC).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "id",
      "approved_amount",
      "cumulative_approved"
    ],
    "reference_sql": "SELECT insurance_provider, id, approved_amount, ROUND(SUM(approved_amount) OVER (PARTITION BY insurance_provider ORDER BY id ASC), 2) AS cumulative_approved FROM insurance_claims WHERE status = 'approved' ORDER BY insurance_provider, id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by insurance_provider.",
      "Order by id ASC in SUM(approved_amount) OVER (...)."
    ],
    "solution_explanation": "Visualizes progressive reimbursement recovery per health plan.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-028",
    "domain": "healthcare",
    "level": 4,
    "order": 28,
    "difficulty": "core",
    "title": "Difference From Department Average Inpatient Bed Rate",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Facility cost delta: Calculate each room daily rate difference from the department average daily rate (daily_rate - dept_avg_rate) using AVG() OVER. Return department_id, room number, daily rate, and rate difference.",
    "context_notes": "daily_rate - AVG(daily_rate) OVER (PARTITION BY department_id).",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "PARTITION BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "department_id",
      "room_number",
      "daily_rate",
      "rate_diff"
    ],
    "reference_sql": "SELECT department_id, room_number, daily_rate, ROUND(daily_rate - AVG(daily_rate) OVER (PARTITION BY department_id), 2) AS rate_diff FROM rooms ORDER BY department_id, room_number;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by department_id.",
      "Subtract AVG(daily_rate) OVER (...) from daily_rate."
    ],
    "solution_explanation": "Surfaces positive or negative price deviations across hospital room stock.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-029",
    "domain": "healthcare",
    "level": 4,
    "order": 29,
    "difficulty": "core",
    "title": "Consecutive Inpatient Admissions Gap (Hospital Readmission Tracking)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Readmission surveillance: For patients with multiple inpatient hospitalizations, calculate days elapsed between the previous discharge date and the next admission date using LAG(). Return patient_id, admission date, previous discharge, and days between.",
    "context_notes": "admission_date - LAG(discharge_date) OVER (PARTITION BY patient_id ORDER BY admission_date ASC).",
    "concepts": [
      "SELECT",
      "LAG",
      "PARTITION BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "patient_id",
      "admission_date",
      "prev_discharge",
      "days_between"
    ],
    "reference_sql": "SELECT patient_id, admission_date, LAG(discharge_date, 1) OVER (PARTITION BY patient_id ORDER BY admission_date ASC) AS prev_discharge, (admission_date - LAG(discharge_date, 1) OVER (PARTITION BY patient_id ORDER BY admission_date ASC)) AS days_between FROM inpatient_admissions ORDER BY patient_id, admission_date;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition admissions by patient_id.",
      "Subtract LAG(discharge_date) from admission_date."
    ],
    "solution_explanation": "Critical 30-day hospital readmission surveillance metric.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-030",
    "domain": "healthcare",
    "level": 4,
    "order": 30,
    "difficulty": "core",
    "title": "Top 2 Doctors per Department by Appointment Revenue",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Department rainmakers: Using DENSE_RANK() in a CTE or subquery, find the top 2 highest revenue-generating doctors in each department based on completed appointments. Return department_id, doctor name, and total revenue.",
    "context_notes": "CTE with DENSE_RANK() OVER (PARTITION BY department_id ORDER BY rev DESC) WHERE rank <= 2.",
    "concepts": [
      "SELECT",
      "CTE",
      "DENSE_RANK",
      "PARTITION BY"
    ],
    "expected_columns": [
      "department_id",
      "doctor_name",
      "total_revenue",
      "dept_rank"
    ],
    "reference_sql": "WITH doc_rev AS (SELECT d.department_id, d.name AS doctor_name, ROUND(SUM(a.fee), 2) AS total_revenue, DENSE_RANK() OVER (PARTITION BY d.department_id ORDER BY SUM(a.fee) DESC) AS dept_rank FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.department_id, d.id, d.name) SELECT department_id, doctor_name, total_revenue, dept_rank FROM doc_rev WHERE dept_rank <= 2 ORDER BY department_id, dept_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate total revenue per doctor in CTE.",
      "Rank with DENSE_RANK() partitioned by department_id.",
      "Filter WHERE dept_rank <= 2 in outer SELECT."
    ],
    "solution_explanation": "Surfaces top-performing clinical physicians driving outpatient service line revenues.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-031",
    "domain": "healthcare",
    "level": 4,
    "order": 31,
    "difficulty": "core",
    "title": "Lab Result Variance from Panel Normal Maximum",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Biomarker delta: For each patient lab result, calculate the difference between result value and the test normal_range_max. Return patient_id, test_name, result_value, normal max, and variance.",
    "context_notes": "plr.result_value - lt.normal_range_max.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "patient_id",
      "test_name",
      "result_value",
      "normal_range_max",
      "variance_from_max"
    ],
    "reference_sql": "SELECT plr.patient_id, lt.test_name, plr.result_value, lt.normal_range_max, ROUND(plr.result_value - lt.normal_range_max, 2) AS variance_from_max FROM patient_lab_results plr JOIN lab_tests lt ON plr.test_id = lt.id ORDER BY variance_from_max DESC, plr.patient_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join patient_lab_results to lab_tests.",
      "Subtract normal_range_max from result_value."
    ],
    "solution_explanation": "Quantifies magnitude of clinical hyper-pathology across diagnostic results.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-032",
    "domain": "healthcare",
    "level": 4,
    "order": 32,
    "difficulty": "core",
    "title": "Billing Voucher Ratio to Patient Historical Average Spend",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Invoice anomaly detection: For each billing voucher, show total charge alongside the average total charge of all bills for that patient using AVG() OVER (PARTITION BY patient_id). Return id, patient_id, total charge, and patient avg charge.",
    "context_notes": "AVG(total_charge) OVER (PARTITION BY patient_id).",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "patient_id",
      "total_charge",
      "patient_avg_charge"
    ],
    "reference_sql": "SELECT id, patient_id, total_charge, ROUND(AVG(total_charge) OVER (PARTITION BY patient_id), 2) AS patient_avg_charge FROM billing ORDER BY patient_id, id;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition billing by patient_id.",
      "Apply AVG(total_charge) OVER (PARTITION BY patient_id)."
    ],
    "solution_explanation": "Detects abnormal encounter charge spikes relative to patient baseline spending.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-033",
    "domain": "healthcare",
    "level": 4,
    "order": 33,
    "difficulty": "core",
    "title": "Most Recent Diagnosis for Each Patient (ROW_NUMBER)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Current clinical active status: Using ROW_NUMBER() in a CTE or subquery, retrieve the single most recent diagnosis recorded for each patient based on diagnosis date. Return patient_id, ICD-10 code, description, and diagnosis date.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY diagnosis_date DESC, id DESC) WHERE row_num = 1.",
    "concepts": [
      "SELECT",
      "CTE",
      "ROW_NUMBER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "patient_id",
      "icd10_code",
      "description",
      "diagnosis_date"
    ],
    "reference_sql": "WITH ranked_diag AS (SELECT patient_id, icd10_code, description, diagnosis_date, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY diagnosis_date DESC, id DESC) AS rn FROM diagnoses) SELECT patient_id, icd10_code, description, diagnosis_date FROM ranked_diag WHERE rn = 1 ORDER BY patient_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Assign ROW_NUMBER() partitioned by patient_id ordered by diagnosis_date DESC.",
      "Filter for rn = 1 in outer query."
    ],
    "solution_explanation": "Isolates the most proximate clinical diagnosis per patient chart.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-034",
    "domain": "healthcare",
    "level": 4,
    "order": 34,
    "difficulty": "core",
    "title": "Cumulative Inpatient Admission Days by Admitting Doctor",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Physician hospital bed impact: For each admitting doctor, compute running cumulative inpatient admission days (discharge_date - admission_date) ordered by admission date using SUM() OVER. Return doctor id, admission id, length of stay, and running stay days.",
    "context_notes": "SUM(discharge_date - admission_date) OVER (PARTITION BY admitting_doctor_id ORDER BY admission_date ASC, id ASC).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "admitting_doctor_id",
      "admission_id",
      "length_of_stay",
      "running_stay_days"
    ],
    "reference_sql": "SELECT admitting_doctor_id, id AS admission_id, (discharge_date - admission_date) AS length_of_stay, SUM(discharge_date - admission_date) OVER (PARTITION BY admitting_doctor_id ORDER BY admission_date ASC, id ASC) AS running_stay_days FROM inpatient_admissions WHERE discharge_date IS NOT NULL ORDER BY admitting_doctor_id, admission_date ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by admitting_doctor_id.",
      "Sum (discharge_date - admission_date) with SUM() OVER."
    ],
    "solution_explanation": "Tracks cumulative physician inpatient bed-day utilization over time.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-035",
    "domain": "healthcare",
    "level": 4,
    "order": 35,
    "difficulty": "core",
    "title": "Consecutive Billing Charge Delta (LEAD)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Charge trend progression: Compare each patient billing total charge with their subsequent billing total charge using LEAD(). Return patient_id, billing id, current charge, and next charge.",
    "context_notes": "LEAD(total_charge, 1) OVER (PARTITION BY patient_id ORDER BY id ASC).",
    "concepts": [
      "SELECT",
      "LEAD",
      "PARTITION BY",
      "OVER"
    ],
    "expected_columns": [
      "patient_id",
      "id",
      "current_charge",
      "next_charge"
    ],
    "reference_sql": "SELECT patient_id, id, total_charge AS current_charge, LEAD(total_charge, 1) OVER (PARTITION BY patient_id ORDER BY id ASC) AS next_charge FROM billing ORDER BY patient_id, id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition billing by patient_id.",
      "Apply LEAD(total_charge, 1) OVER (PARTITION BY patient_id ORDER BY id ASC)."
    ],
    "solution_explanation": "Monitors sequential invoice fee shifts across episodic clinical encounters.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-036",
    "domain": "healthcare",
    "level": 4,
    "order": 36,
    "difficulty": "core",
    "title": "Top 3 Most Expensive Diagnostic Tests per Category",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Laboratory price leaders: Using DENSE_RANK() in a CTE, return the top 3 most expensive diagnostic tests in each category. Return category, test name, standard fee, and price rank.",
    "context_notes": "DENSE_RANK() OVER (PARTITION BY category ORDER BY standard_fee DESC) WHERE rank <= 3.",
    "concepts": [
      "SELECT",
      "CTE",
      "DENSE_RANK",
      "PARTITION BY"
    ],
    "expected_columns": [
      "category",
      "test_name",
      "standard_fee",
      "price_rank"
    ],
    "reference_sql": "WITH ranked_tests AS (SELECT category, test_name, standard_fee, DENSE_RANK() OVER (PARTITION BY category ORDER BY standard_fee DESC) AS price_rank FROM lab_tests) SELECT category, test_name, standard_fee, price_rank FROM ranked_tests WHERE price_rank <= 3 ORDER BY category, price_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by category and rank by standard_fee DESC.",
      "Filter WHERE price_rank <= 3 in outer SELECT."
    ],
    "solution_explanation": "Highlights fee ceilings within each pathology diagnostic division.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-037",
    "domain": "healthcare",
    "level": 4,
    "order": 37,
    "difficulty": "core",
    "title": "Doctor Appointment Volume Share Within Department (RATIO)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Workload distribution: For each doctor, calculate what percentage of their department completed appointments they conducted using COUNT() and SUM() OVER (PARTITION BY department_id). Return doctor name, specialty, visits count, and department visits pct.",
    "context_notes": "COUNT(a.id)::FLOAT / SUM(COUNT(a.id)) OVER (PARTITION BY d.department_id) * 100.0.",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "PARTITION BY",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "visits_count",
      "dept_visits_pct"
    ],
    "reference_sql": "SELECT d.name, d.specialty, COUNT(a.id) AS visits_count, ROUND(COUNT(a.id)::NUMERIC / SUM(COUNT(a.id)) OVER (PARTITION BY d.department_id) * 100.0, 1) AS dept_visits_pct FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.department_id, d.id, d.name, d.specialty ORDER BY d.department_id, dept_visits_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group by doctor and department.",
      "Divide doctor visit count by department total using SUM(COUNT) OVER (PARTITION BY department_id)."
    ],
    "solution_explanation": "Evaluates physician clinical market share within department clinics.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-038",
    "domain": "healthcare",
    "level": 4,
    "order": 38,
    "difficulty": "core",
    "title": "Insurance Claim Approval Ratio Quartiles (NTILE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer contractual tiering: Segment insurance claims into 4 quartiles using NTILE(4) based on the ratio of approved_amount to claim_amount. Return id, insurance provider, approved ratio, and quartile tier.",
    "context_notes": "NTILE(4) OVER (ORDER BY (approved_amount / claim_amount) DESC).",
    "concepts": [
      "SELECT",
      "NTILE",
      "OVER",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "id",
      "insurance_provider",
      "approval_ratio",
      "quartile_tier"
    ],
    "reference_sql": "SELECT id, insurance_provider, ROUND(approved_amount / claim_amount, 2) AS approval_ratio, NTILE(4) OVER (ORDER BY (approved_amount / claim_amount) DESC) AS quartile_tier FROM insurance_claims WHERE status = 'approved' ORDER BY quartile_tier, approval_ratio DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute approval_ratio as approved_amount / claim_amount.",
      "Apply NTILE(4) OVER (ORDER BY approval_ratio DESC)."
    ],
    "solution_explanation": "Stratifies claim reimbursement efficiency into 4 operational tiers.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-039",
    "domain": "healthcare",
    "level": 4,
    "order": 39,
    "difficulty": "core",
    "title": "First and Last Recorded Appointment Dates per Patient",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Patient tenure span: For each patient, show patient id, first recorded appointment date using MIN() OVER, and most recent appointment date using MAX() OVER. Return distinct patient_id, first appointment date, and last appointment date.",
    "context_notes": "MIN(appointment_date) OVER (PARTITION BY patient_id) and MAX(appointment_date) OVER (PARTITION BY patient_id).",
    "concepts": [
      "SELECT",
      "MIN OVER",
      "MAX OVER",
      "DISTINCT"
    ],
    "expected_columns": [
      "patient_id",
      "first_visit",
      "last_visit"
    ],
    "reference_sql": "SELECT DISTINCT patient_id, MIN(appointment_date) OVER (PARTITION BY patient_id) AS first_visit, MAX(appointment_date) OVER (PARTITION BY patient_id) AS last_visit FROM appointments ORDER BY patient_id;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by patient_id.",
      "Apply MIN and MAX OVER (PARTITION BY patient_id).",
      "Select DISTINCT patient_id, first_visit, last_visit."
    ],
    "solution_explanation": "Tracks patient relationship lifespan and longitudinal care window.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-040",
    "domain": "healthcare",
    "level": 4,
    "order": 40,
    "difficulty": "core",
    "title": "Consecutive Lab Test Biomarker Change (LAG)",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Biomarker trajectory: For patients undergoing multiple tests of the same lab test, calculate the change in result value compared to their immediately prior test result using LAG(). Return patient_id, test_id, performed date, result value, and value delta.",
    "context_notes": "result_value - LAG(result_value) OVER (PARTITION BY patient_id, test_id ORDER BY performed_date ASC).",
    "concepts": [
      "SELECT",
      "LAG",
      "PARTITION BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "patient_id",
      "test_id",
      "performed_date",
      "result_value",
      "value_delta"
    ],
    "reference_sql": "SELECT patient_id, test_id, performed_date, result_value, ROUND(result_value - LAG(result_value, 1) OVER (PARTITION BY patient_id, test_id ORDER BY performed_date ASC), 2) AS value_delta FROM patient_lab_results ORDER BY patient_id, test_id, performed_date ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by patient_id and test_id.",
      "Subtract LAG(result_value) from result_value."
    ],
    "solution_explanation": "Monitors clinical disease progression or therapeutic efficacy over serial lab panels.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-041",
    "domain": "healthcare",
    "level": 4,
    "order": 41,
    "difficulty": "core",
    "title": "Most Recent Prescription Written by Each Doctor",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician prescribing activity: Using ROW_NUMBER() in a CTE, find the single most recent prescription authored by each doctor based on prescription id. Return doctor id, medication name, dosage, and refills.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY doctor_id ORDER BY id DESC) WHERE rn = 1.",
    "concepts": [
      "SELECT",
      "CTE",
      "ROW_NUMBER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "doctor_id",
      "medication_name",
      "dosage",
      "refills"
    ],
    "reference_sql": "WITH ranked_rx AS (SELECT doctor_id, medication_name, dosage, refills, ROW_NUMBER() OVER (PARTITION BY doctor_id ORDER BY id DESC) AS rn FROM prescriptions WHERE doctor_id IS NOT NULL) SELECT doctor_id, medication_name, dosage, refills FROM ranked_rx WHERE rn = 1 ORDER BY doctor_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition prescriptions by doctor_id.",
      "Rank descending by id with ROW_NUMBER().",
      "Filter rn = 1 in outer query."
    ],
    "solution_explanation": "Audits the most recent medication order authorized by each clinical physician.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-042",
    "domain": "healthcare",
    "level": 4,
    "order": 42,
    "difficulty": "core",
    "title": "Department Running Total of Available Inpatient Beds",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Inpatient capacity cumulative index: Calculate running total of rooms ordered by room number within each department using COUNT() OVER. Return department_id, room number, room type, and running bed count.",
    "context_notes": "COUNT(id) OVER (PARTITION BY department_id ORDER BY room_number ASC).",
    "concepts": [
      "SELECT",
      "COUNT OVER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "department_id",
      "room_number",
      "room_type",
      "running_bed_count"
    ],
    "reference_sql": "SELECT department_id, room_number, room_type, COUNT(id) OVER (PARTITION BY department_id ORDER BY room_number ASC) AS running_bed_count FROM rooms ORDER BY department_id, room_number;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by department_id.",
      "Order by room_number ASC in COUNT(id) OVER (...)."
    ],
    "solution_explanation": "Numbers cumulative physical beds assigned across clinical hospital units.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-043",
    "domain": "healthcare",
    "level": 4,
    "order": 43,
    "difficulty": "core",
    "title": "Highest Copay Voucher per Insurance Provider (RANK)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer patient copay ceiling: Using RANK() in a CTE, find the billing records that have the highest copay_amount for each insurance provider. Return insurance provider, billing id, copay amount, and total charge.",
    "context_notes": "RANK() OVER (PARTITION BY p.insurance_provider ORDER BY b.copay_amount DESC) WHERE rk = 1.",
    "concepts": [
      "SELECT",
      "CTE",
      "RANK",
      "PARTITION BY",
      "JOIN"
    ],
    "expected_columns": [
      "insurance_provider",
      "id",
      "copay_amount",
      "total_charge"
    ],
    "reference_sql": "WITH ranked_bills AS (SELECT p.insurance_provider, b.id, b.copay_amount, b.total_charge, RANK() OVER (PARTITION BY p.insurance_provider ORDER BY b.copay_amount DESC) AS rk FROM billing b JOIN patients p ON b.patient_id = p.id) SELECT insurance_provider, id, copay_amount, total_charge FROM ranked_bills WHERE rk = 1 ORDER BY insurance_provider, id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing to patients in CTE.",
      "Rank by copay_amount DESC partitioned by insurance_provider.",
      "Filter rk = 1."
    ],
    "solution_explanation": "Surfaces maximum patient copay liabilities per insurance carrier.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-044",
    "domain": "healthcare",
    "level": 4,
    "order": 44,
    "difficulty": "core",
    "title": "Moving Average of Appointment Fees Over 3 Consecutive Encounters",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Rolling fee smoothing: For completed appointments ordered by id, calculate a 3-encounter centered moving average of visit fees using AVG() OVER (ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING). Return id, appointment date, fee, and 3-visit moving avg fee.",
    "context_notes": "AVG(fee) OVER (ORDER BY id ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING).",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "WINDOW FRAME",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "appointment_date",
      "fee",
      "moving_avg_fee"
    ],
    "reference_sql": "SELECT id, appointment_date, fee, ROUND(AVG(fee) OVER (ORDER BY id ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS moving_avg_fee FROM appointments WHERE status = 'completed' ORDER BY id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Specify window frame ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING.",
      "Calculate moving average fee."
    ],
    "solution_explanation": "Smoothes volatile visit fees to observe underlying outpatient price trends.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-045",
    "domain": "healthcare",
    "level": 4,
    "order": 45,
    "difficulty": "core",
    "title": "Inpatient Admission Sequence Number per Patient",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Admission chronology: Number inpatient admissions sequentially for each patient based on admission date using ROW_NUMBER. Return patient_id, admission id, admission date, discharge disposition, and admission sequence.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY admission_date ASC).",
    "concepts": [
      "SELECT",
      "ROW_NUMBER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "patient_id",
      "id",
      "admission_date",
      "discharge_disposition",
      "adm_sequence"
    ],
    "reference_sql": "SELECT patient_id, id, admission_date, discharge_disposition, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY admission_date ASC) AS adm_sequence FROM inpatient_admissions ORDER BY patient_id, adm_sequence;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition admissions by patient_id.",
      "Order by admission_date ASC in ROW_NUMBER()."
    ],
    "solution_explanation": "Generates an encounter sequence index for recurrent inpatient admissions.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-046",
    "domain": "healthcare",
    "level": 4,
    "order": 46,
    "difficulty": "core",
    "title": "Physician Prescribing Diversity Ranking",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Formulary breadth: Count distinct medications prescribed by each doctor and rank doctors overall using DENSE_RANK. Return doctor name, specialty, distinct drugs count, and diversity rank.",
    "context_notes": "DENSE_RANK() OVER (ORDER BY COUNT(DISTINCT medication_name) DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "GROUP BY",
      "COUNT DISTINCT"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "distinct_drugs",
      "diversity_rank"
    ],
    "reference_sql": "SELECT d.name, d.specialty, COUNT(DISTINCT pr.medication_name) AS distinct_drugs, DENSE_RANK() OVER (ORDER BY COUNT(DISTINCT pr.medication_name) DESC) AS diversity_rank FROM doctors d JOIN prescriptions pr ON d.id = pr.doctor_id GROUP BY d.id, d.name, d.specialty ORDER BY diversity_rank, d.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group prescriptions by doctor.",
      "Count distinct medication_name.",
      "Apply DENSE_RANK() OVER (ORDER BY distinct_drugs DESC)."
    ],
    "solution_explanation": "Ranks physicians by breadth of pharmaceutical agents prescribed.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-047",
    "domain": "healthcare",
    "level": 4,
    "order": 47,
    "difficulty": "core",
    "title": "Patient Incurred Charges as Percentage of Total Hospital Billing",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Patient revenue concentration: For each patient, compute their total billed charges and their percentage contribution to all hospital billing charges using SUM() and SUM() OVER(). Return patient_id, patient total billed, and hospital billing share pct.",
    "context_notes": "SUM(total_charge) / SUM(SUM(total_charge)) OVER () * 100.0.",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "GROUP BY",
      "ROUND"
    ],
    "expected_columns": [
      "patient_id",
      "patient_total_billed",
      "hospital_share_pct"
    ],
    "reference_sql": "SELECT patient_id, ROUND(SUM(total_charge), 2) AS patient_total_billed, ROUND(SUM(total_charge) / SUM(SUM(total_charge)) OVER () * 100.0, 2) AS hospital_share_pct FROM billing GROUP BY patient_id ORDER BY patient_total_billed DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group billing by patient_id.",
      "Calculate grand total using window function SUM(SUM(total_charge)) OVER ().",
      "Compute share percentage."
    ],
    "solution_explanation": "Identifies patient accounts generating outsized institutional billing volume.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-048",
    "domain": "healthcare",
    "level": 4,
    "order": 48,
    "difficulty": "core",
    "title": "Abnormal Flag Frequency Rank per Lab Test",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Pathology diagnostic yield: For each lab test, count abnormal results (flag HIGH or LOW) and rank tests by abnormal result frequency using DENSE_RANK. Return test_name, category, abnormal count, and risk rank.",
    "context_notes": "DENSE_RANK() OVER (ORDER BY SUM(CASE WHEN plr.flag IN (HIGH, LOW) THEN 1 ELSE 0 END) DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "test_name",
      "category",
      "abnormal_count",
      "risk_rank"
    ],
    "reference_sql": "SELECT lt.test_name, lt.category, SUM(CASE WHEN plr.flag IN ('HIGH', 'LOW') THEN 1 ELSE 0 END) AS abnormal_count, DENSE_RANK() OVER (ORDER BY SUM(CASE WHEN plr.flag IN ('HIGH', 'LOW') THEN 1 ELSE 0 END) DESC) AS risk_rank FROM lab_tests lt LEFT JOIN patient_lab_results plr ON lt.id = plr.test_id GROUP BY lt.id, lt.test_name, lt.category ORDER BY risk_rank, lt.test_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join lab_tests to patient_lab_results.",
      "Count abnormal flags via conditional SUM.",
      "Rank with DENSE_RANK() OVER (...)."
    ],
    "solution_explanation": "Ranks diagnostic panels detecting the highest volume of patient clinical abnormalities.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-049",
    "domain": "healthcare",
    "level": 4,
    "order": 49,
    "difficulty": "core",
    "title": "Insurance Provider Claim Rejection Speed Comparison",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer denial turnaround: For denied insurance claims, display settlement days and compare it to the average denial turnaround of that specific provider using AVG() OVER (PARTITION BY insurance_provider). Return id, insurance provider, settlement days, and provider avg denial days.",
    "context_notes": "AVG(settlement_days) OVER (PARTITION BY insurance_provider) WHERE status = denied.",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "PARTITION BY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "insurance_provider",
      "settlement_days",
      "provider_avg_denial_days"
    ],
    "reference_sql": "SELECT id, insurance_provider, settlement_days, ROUND(AVG(settlement_days) OVER (PARTITION BY insurance_provider), 1) AS provider_avg_denial_days FROM insurance_claims WHERE status = 'denied' ORDER BY insurance_provider, settlement_days DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE status = denied.",
      "Apply AVG(settlement_days) OVER (PARTITION BY insurance_provider)."
    ],
    "solution_explanation": "Monitors administrative latency in receiving claim denials across health plans.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-050",
    "domain": "healthcare",
    "level": 4,
    "order": 50,
    "difficulty": "core",
    "title": "Doctors With Highest Fee Increase Between Consecutive Visits",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Pricing progression: For completed appointments ordered by date for each doctor, compute fee increase over their immediately preceding appointment using LAG(). Return doctor_id, appointment id, fee, previous fee, and fee difference.",
    "context_notes": "fee - LAG(fee) OVER (PARTITION BY doctor_id ORDER BY appointment_date ASC, id ASC).",
    "concepts": [
      "SELECT",
      "LAG",
      "PARTITION BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "doctor_id",
      "id",
      "fee",
      "prev_fee",
      "fee_diff"
    ],
    "reference_sql": "SELECT doctor_id, id, fee, LAG(fee, 1) OVER (PARTITION BY doctor_id ORDER BY appointment_date ASC, id ASC) AS prev_fee, ROUND(fee - LAG(fee, 1) OVER (PARTITION BY doctor_id ORDER BY appointment_date ASC, id ASC), 2) AS fee_diff FROM appointments WHERE status = 'completed' ORDER BY doctor_id, appointment_date ASC, id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition appointments by doctor_id.",
      "Subtract LAG(fee) from current visit fee."
    ],
    "solution_explanation": "Tracks fee changes across consecutive consultations for each physician.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-051",
    "domain": "healthcare",
    "level": 4,
    "order": 51,
    "difficulty": "advanced",
    "title": "Patient Cumulative Out-of-Pocket Balance Running Total",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Financial toxicity tracking: Compute a running cumulative sum of patient out-of-pocket balance obligations sorted chronologically by id. Return id, patient_id, patient balance, and cumulative balance.",
    "context_notes": "SUM(patient_balance) OVER (PARTITION BY patient_id ORDER BY id ASC).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "patient_id",
      "patient_balance",
      "cumulative_balance"
    ],
    "reference_sql": "SELECT id, patient_id, patient_balance, ROUND(SUM(patient_balance) OVER (PARTITION BY patient_id ORDER BY id ASC), 2) AS cumulative_balance FROM billing ORDER BY patient_id, id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition billing by patient_id.",
      "Order by id ASC in SUM(patient_balance) OVER (...)."
    ],
    "solution_explanation": "Tracks individual patient liability accumulation over successive hospital billing cycles.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-052",
    "domain": "healthcare",
    "level": 4,
    "order": 52,
    "difficulty": "advanced",
    "title": "Inpatient Daily Room Occupancy Running Census",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Inpatient capacity accumulation: For rooms sorted by room number within each floor, calculate the running count of occupied rooms using SUM(CASE) OVER. Return floor, room number, is_occupied, and running occupied beds on floor.",
    "context_notes": "SUM(CASE WHEN r.is_occupied THEN 1 ELSE 0 END) OVER (PARTITION BY d.floor ORDER BY r.room_number ASC).",
    "concepts": [
      "SELECT",
      "SUM CASE OVER",
      "PARTITION BY",
      "JOIN"
    ],
    "expected_columns": [
      "floor",
      "room_number",
      "is_occupied",
      "running_occupied_on_floor"
    ],
    "reference_sql": "SELECT d.floor, r.room_number, r.is_occupied, SUM(CASE WHEN r.is_occupied THEN 1 ELSE 0 END) OVER (PARTITION BY d.floor ORDER BY r.room_number ASC) AS running_occupied_on_floor FROM rooms r JOIN departments d ON r.department_id = d.id ORDER BY d.floor, r.room_number;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms to departments.",
      "Partition by d.floor.",
      "Apply conditional running sum on is_occupied."
    ],
    "solution_explanation": "Visualizes bed census accumulation across hospital floors.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-053",
    "domain": "healthcare",
    "level": 4,
    "order": 53,
    "difficulty": "advanced",
    "title": "Earliest and Latest Inpatient Admissions per Department",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Department admission boundary dates: For each department, find the earliest admission date using FIRST_VALUE and most recent admission date using LAST_VALUE or MIN/MAX OVER. Return department name, earliest admission, and latest admission.",
    "context_notes": "MIN(ia.admission_date) OVER (PARTITION BY d.id) and MAX(ia.admission_date) OVER (PARTITION BY d.id).",
    "concepts": [
      "SELECT",
      "MIN OVER",
      "MAX OVER",
      "DISTINCT",
      "JOIN"
    ],
    "expected_columns": [
      "department_name",
      "earliest_admission",
      "latest_admission"
    ],
    "reference_sql": "SELECT DISTINCT d.name AS department_name, MIN(ia.admission_date) OVER (PARTITION BY d.id) AS earliest_admission, MAX(ia.admission_date) OVER (PARTITION BY d.id) AS latest_admission FROM departments d JOIN doctors doc ON d.id = doc.department_id JOIN inpatient_admissions ia ON doc.id = ia.admitting_doctor_id ORDER BY department_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join departments to doctors and inpatient_admissions.",
      "Apply MIN and MAX OVER (PARTITION BY d.id).",
      "Select DISTINCT department_name and admission boundaries."
    ],
    "solution_explanation": "Identifies operational timeline ranges of inpatient admissions per service line.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-054",
    "domain": "healthcare",
    "level": 4,
    "order": 54,
    "difficulty": "advanced",
    "title": "Doctor Revenue Decile Distribution (NTILE 10)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Executive physician compensation & production: Group doctors into 10 decile performance tiers using NTILE(10) based on their total completed visit revenue. Return doctor name, specialty, total revenue, and decile rank.",
    "context_notes": "NTILE(10) OVER (ORDER BY SUM(a.fee) DESC).",
    "concepts": [
      "SELECT",
      "NTILE",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "total_revenue",
      "revenue_decile"
    ],
    "reference_sql": "SELECT d.name, d.specialty, ROUND(SUM(a.fee), 2) AS total_revenue, NTILE(10) OVER (ORDER BY SUM(a.fee) DESC) AS revenue_decile FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.id, d.name, d.specialty ORDER BY revenue_decile, total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group completed appointments by doctor.",
      "Calculate total revenue.",
      "Apply NTILE(10) OVER (ORDER BY SUM(a.fee) DESC)."
    ],
    "solution_explanation": "Segments physicians into ten granular production deciles for executive practice benchmarking.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-055",
    "domain": "healthcare",
    "level": 4,
    "order": 55,
    "difficulty": "advanced",
    "title": "Serial Lab Results Moving 2-Test Average",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Biomarker smoothing: For each patient undergoing the same lab test over time, calculate a 2-result moving average of result value using AVG() OVER (ROWS BETWEEN 1 PRECEDING AND CURRENT ROW). Return patient_id, test_id, performed date, result value, and moving avg result.",
    "context_notes": "AVG(result_value) OVER (PARTITION BY patient_id, test_id ORDER BY performed_date ASC ROWS BETWEEN 1 PRECEDING AND CURRENT ROW).",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "WINDOW FRAME",
      "PARTITION BY"
    ],
    "expected_columns": [
      "patient_id",
      "test_id",
      "performed_date",
      "result_value",
      "moving_avg_result"
    ],
    "reference_sql": "SELECT patient_id, test_id, performed_date, result_value, ROUND(AVG(result_value) OVER (PARTITION BY patient_id, test_id ORDER BY performed_date ASC ROWS BETWEEN 1 PRECEDING AND CURRENT ROW), 2) AS moving_avg_result FROM patient_lab_results ORDER BY patient_id, test_id, performed_date ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by patient_id and test_id.",
      "Specify ROWS BETWEEN 1 PRECEDING AND CURRENT ROW in AVG()."
    ],
    "solution_explanation": "Smoothes episodic biomarker fluctuations across longitudinal patient monitoring.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-056",
    "domain": "healthcare",
    "level": 4,
    "order": 56,
    "difficulty": "advanced",
    "title": "Patient Encounter Frequency Ranking by City",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Metropolitan healthcare demand: For each city, rank patients based on their total appointment visits using DENSE_RANK. Return city, first name, last name, total visits, and city rank.",
    "context_notes": "DENSE_RANK() OVER (PARTITION BY p.city ORDER BY COUNT(a.id) DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "PARTITION BY",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "city",
      "first_name",
      "last_name",
      "total_visits",
      "city_rank"
    ],
    "reference_sql": "SELECT p.city, p.first_name, p.last_name, COUNT(a.id) AS total_visits, DENSE_RANK() OVER (PARTITION BY p.city ORDER BY COUNT(a.id) DESC) AS city_rank FROM patients p JOIN appointments a ON p.id = a.patient_id GROUP BY p.city, p.id, p.first_name, p.last_name ORDER BY p.city, city_rank, p.last_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join patients to appointments.",
      "Group by patient and city.",
      "Apply DENSE_RANK() OVER (PARTITION BY p.city ORDER BY COUNT(a.id) DESC)."
    ],
    "solution_explanation": "Ranks high-utilization patients within each geographic municipality.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-057",
    "domain": "healthcare",
    "level": 4,
    "order": 57,
    "difficulty": "advanced",
    "title": "Percentage of Total Payer Claims Denied (SUM OVER)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Carrier dispute concentration: For each insurance provider, compute total claims, denied claims count, and denied claim percentage relative to total claims for that carrier using SUM(CASE) OVER. Return insurance provider, total claims, denied claims, and denial percentage.",
    "context_notes": "COUNT(id) and SUM(CASE WHEN status = denied) per provider.",
    "concepts": [
      "SELECT",
      "SUM CASE",
      "GROUP BY",
      "ROUND"
    ],
    "expected_columns": [
      "insurance_provider",
      "total_claims",
      "denied_claims",
      "denial_pct"
    ],
    "reference_sql": "SELECT insurance_provider, COUNT(id) AS total_claims, SUM(CASE WHEN status = 'denied' THEN 1 ELSE 0 END) AS denied_claims, ROUND(SUM(CASE WHEN status = 'denied' THEN 1.0 ELSE 0.0 END) / COUNT(id) * 100.0, 1) AS denial_pct FROM insurance_claims GROUP BY insurance_provider ORDER BY denial_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group claims by insurance_provider.",
      "Compute total and denied claims.",
      "Calculate denial percentage."
    ],
    "solution_explanation": "Surfaces health plans with elevated claim denial propensities.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-058",
    "domain": "healthcare",
    "level": 4,
    "order": 58,
    "difficulty": "advanced",
    "title": "Top Ranked Diagnosis per Specialty (ROW_NUMBER)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Specialty morbidity leader: Using ROW_NUMBER() in a CTE, identify the single most frequent ICD-10 diagnosis recorded by doctors in each medical specialty. Return specialty, ICD-10 code, description, and diagnosis count.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY d.specialty ORDER BY COUNT(dg.id) DESC) WHERE rn = 1.",
    "concepts": [
      "SELECT",
      "CTE",
      "ROW_NUMBER",
      "PARTITION BY",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "specialty",
      "icd10_code",
      "description",
      "diagnosis_count"
    ],
    "reference_sql": "WITH diag_counts AS (SELECT d.specialty, dg.icd10_code, dg.description, COUNT(dg.id) AS diagnosis_count, ROW_NUMBER() OVER (PARTITION BY d.specialty ORDER BY COUNT(dg.id) DESC) AS rn FROM doctors d JOIN appointments a ON d.id = a.doctor_id JOIN diagnoses dg ON a.id = dg.appointment_id GROUP BY d.specialty, dg.icd10_code, dg.description) SELECT specialty, icd10_code, description, diagnosis_count FROM diag_counts WHERE rn = 1 ORDER BY specialty;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group diagnoses by specialty and ICD code in CTE.",
      "Rank with ROW_NUMBER() partitioned by specialty.",
      "Filter rn = 1."
    ],
    "solution_explanation": "Identifies the signature clinical condition managed within each medical department.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L4-059",
    "domain": "healthcare",
    "level": 4,
    "order": 59,
    "difficulty": "advanced",
    "title": "Cumulative Billed Dollars by Department Over Time",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Department financial ramp: For each department, calculate a running cumulative total of appointment fees ordered by appointment date using SUM() OVER. Return department name, appointment id, fee, and cumulative department fee.",
    "context_notes": "SUM(a.fee) OVER (PARTITION BY dept.id ORDER BY a.appointment_date ASC, a.id ASC).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "PARTITION BY",
      "JOIN"
    ],
    "expected_columns": [
      "department_name",
      "id",
      "fee",
      "cumulative_dept_fee"
    ],
    "reference_sql": "SELECT dept.name AS department_name, a.id, a.fee, ROUND(SUM(a.fee) OVER (PARTITION BY dept.id ORDER BY a.appointment_date ASC, a.id ASC), 2) AS cumulative_dept_fee FROM appointments a JOIN doctors doc ON a.doctor_id = doc.id JOIN departments dept ON doc.department_id = dept.id WHERE a.status = 'completed' ORDER BY dept.name, a.appointment_date ASC, a.id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments to doctors to departments.",
      "Partition by department id and calculate cumulative fee with SUM() OVER."
    ],
    "solution_explanation": "Tracks fiscal outpatient revenue progression across hospital service lines.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-060",
    "domain": "healthcare",
    "level": 4,
    "order": 60,
    "difficulty": "advanced",
    "title": "Inpatient Admission Length of Stay Percentile Tiers (NTILE 5)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Inpatient utilization quintiles: Stratify completed inpatient admissions into 5 length of stay quintiles using NTILE(5). Return admission id, length of stay in days, and stay quintile.",
    "context_notes": "NTILE(5) OVER (ORDER BY (discharge_date - admission_date) DESC).",
    "concepts": [
      "SELECT",
      "NTILE",
      "OVER",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "id",
      "length_of_stay",
      "stay_quintile"
    ],
    "reference_sql": "SELECT id, (discharge_date - admission_date) AS length_of_stay, NTILE(5) OVER (ORDER BY (discharge_date - admission_date) DESC) AS stay_quintile FROM inpatient_admissions WHERE discharge_date IS NOT NULL ORDER BY stay_quintile, length_of_stay DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate length of stay.",
      "Apply NTILE(5) OVER (ORDER BY stay DESC)."
    ],
    "solution_explanation": "Classifies inpatient bed stays into five duration quintiles for length-of-stay management.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-061",
    "domain": "healthcare",
    "level": 4,
    "order": 61,
    "difficulty": "advanced",
    "title": "Doctor Prescription Count vs Department Average Prescriptions",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician prescribing variance: For each doctor, show doctor name, specialty, total prescriptions written, and the average number of prescriptions written by doctors in that department using AVG() OVER. Return doctor name, specialty, prescriptions count, and dept avg prescriptions.",
    "context_notes": "AVG(COUNT(pr.id)) OVER (PARTITION BY d.department_id).",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "PARTITION BY",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "prescriptions_count",
      "dept_avg_prescriptions"
    ],
    "reference_sql": "SELECT d.name, d.specialty, COUNT(pr.id) AS prescriptions_count, ROUND(AVG(COUNT(pr.id)) OVER (PARTITION BY d.department_id), 1) AS dept_avg_prescriptions FROM doctors d LEFT JOIN prescriptions pr ON d.id = pr.doctor_id GROUP BY d.department_id, d.id, d.name, d.specialty ORDER BY d.department_id, prescriptions_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group prescriptions by doctor and department.",
      "Apply AVG(COUNT) OVER (PARTITION BY d.department_id)."
    ],
    "solution_explanation": "Compares physician prescribing frequency directly against department peers.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-062",
    "domain": "healthcare",
    "level": 4,
    "order": 62,
    "difficulty": "advanced",
    "title": "Inpatient Room Rate Percentile Distribution",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Accommodation cost quartiles: Segment all hospital rooms into 4 pricing quartiles using NTILE(4) based on their daily rate. Return room number, room type, daily rate, and pricing quartile.",
    "context_notes": "NTILE(4) OVER (ORDER BY daily_rate DESC).",
    "concepts": [
      "SELECT",
      "NTILE",
      "OVER"
    ],
    "expected_columns": [
      "room_number",
      "room_type",
      "daily_rate",
      "pricing_quartile"
    ],
    "reference_sql": "SELECT room_number, room_type, daily_rate, NTILE(4) OVER (ORDER BY daily_rate DESC) AS pricing_quartile FROM rooms ORDER BY pricing_quartile, daily_rate DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Apply NTILE(4) OVER (ORDER BY daily_rate DESC) to rooms.",
      "Select room attributes."
    ],
    "solution_explanation": "Organizes hospital bed inventory into four facility pricing tiers.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-063",
    "domain": "healthcare",
    "level": 4,
    "order": 63,
    "difficulty": "advanced",
    "title": "Prior and Next Inpatient Room Occupancy Change (LAG / LEAD)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Inpatient floor bed inspection: For rooms ordered by room number within each department, show the daily rate of the PREVIOUS room and the daily rate of the NEXT room using LAG() and LEAD(). Return department_id, room number, daily rate, previous rate, and next rate.",
    "context_notes": "LAG(daily_rate) and LEAD(daily_rate) OVER (PARTITION BY department_id ORDER BY room_number ASC).",
    "concepts": [
      "SELECT",
      "LAG",
      "LEAD",
      "PARTITION BY"
    ],
    "expected_columns": [
      "department_id",
      "room_number",
      "daily_rate",
      "prev_rate",
      "next_rate"
    ],
    "reference_sql": "SELECT department_id, room_number, daily_rate, LAG(daily_rate, 1) OVER (PARTITION BY department_id ORDER BY room_number ASC) AS prev_rate, LEAD(daily_rate, 1) OVER (PARTITION BY department_id ORDER BY room_number ASC) AS next_rate FROM rooms ORDER BY department_id, room_number ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition rooms by department_id.",
      "Apply LAG and LEAD on daily_rate ordered by room_number.",
      "Select department_id, room_number, daily_rate, prev_rate, next_rate."
    ],
    "solution_explanation": "Inspects sequential pricing parity across adjacent hospital rooms.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-064",
    "domain": "healthcare",
    "level": 4,
    "order": 64,
    "difficulty": "advanced",
    "title": "Consecutive Days Between Chronic Diagnoses per Patient",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Morbidity onset rate: For patients with multiple recorded diagnoses, calculate days elapsed between successive diagnosis dates using LAG(). Return patient_id, ICD-10 code, diagnosis date, and days since previous diagnosis.",
    "context_notes": "diagnosis_date - LAG(diagnosis_date) OVER (PARTITION BY patient_id ORDER BY diagnosis_date ASC).",
    "concepts": [
      "SELECT",
      "LAG",
      "PARTITION BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "patient_id",
      "icd10_code",
      "diagnosis_date",
      "days_since_prev_diag"
    ],
    "reference_sql": "SELECT patient_id, icd10_code, diagnosis_date, (diagnosis_date - LAG(diagnosis_date, 1) OVER (PARTITION BY patient_id ORDER BY diagnosis_date ASC)) AS days_since_prev_diag FROM diagnoses ORDER BY patient_id, diagnosis_date ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition diagnoses by patient_id.",
      "Subtract LAG(diagnosis_date) from diagnosis_date."
    ],
    "solution_explanation": "Tracks diagnostic velocity and clinical complication emergence intervals.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-065",
    "domain": "healthcare",
    "level": 4,
    "order": 65,
    "difficulty": "advanced",
    "title": "Department Revenue Contribution Ranking Across Hospital",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Institutional service line ranking: Calculate total completed appointment revenue for each department and rank departments overall using DENSE_RANK. Return department name, completed appointments count, gross revenue, and hospital revenue rank.",
    "context_notes": "DENSE_RANK() OVER (ORDER BY SUM(a.fee) DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "department_name",
      "completed_appointments",
      "gross_revenue",
      "hospital_rank"
    ],
    "reference_sql": "SELECT dept.name AS department_name, COUNT(a.id) AS completed_appointments, ROUND(SUM(a.fee), 2) AS gross_revenue, DENSE_RANK() OVER (ORDER BY SUM(a.fee) DESC) AS hospital_rank FROM departments dept JOIN doctors doc ON dept.id = doc.department_id JOIN appointments a ON doc.id = a.doctor_id WHERE a.status = 'completed' GROUP BY dept.id, dept.name ORDER BY hospital_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join departments to doctors to completed appointments.",
      "Group by department.",
      "Rank by SUM(fee) DESC with DENSE_RANK()."
    ],
    "solution_explanation": "Ranks hospital clinical departments by overall top-line fee generation.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-066",
    "domain": "healthcare",
    "level": 4,
    "order": 66,
    "difficulty": "advanced",
    "title": "Outpatient Visit Fee Variance From Moving 5-Encounter Benchmark",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Pricing volatility index: For completed appointments ordered by id, compute a 5-visit centered moving average fee and calculate the absolute difference between visit fee and moving average. Return id, fee, 5-visit moving avg, and fee variance.",
    "context_notes": "ABS(fee - AVG(fee) OVER (ORDER BY id ASC ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING)).",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "WINDOW FRAME",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "id",
      "fee",
      "moving_avg_fee",
      "fee_variance"
    ],
    "reference_sql": "SELECT id, fee, ROUND(AVG(fee) OVER (ORDER BY id ASC ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING), 2) AS moving_avg_fee, ROUND(ABS(fee - AVG(fee) OVER (ORDER BY id ASC ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING)), 2) AS fee_variance FROM appointments WHERE status = 'completed' ORDER BY fee_variance DESC, id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute moving average across 5 rows.",
      "Calculate ABS(fee - moving_avg_fee)."
    ],
    "solution_explanation": "Pinpoints consultations experiencing extreme pricing deviations from baseline trends.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L4-067",
    "domain": "healthcare",
    "level": 4,
    "order": 67,
    "difficulty": "advanced",
    "title": "Patient Cumulative Insurance Covered vs Cumulative Patient Balance",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer vs patient burden progression: For each patient, compute running cumulative insurance covered dollars alongside running cumulative patient balance dollars ordered by id. Return patient_id, billing id, cumulative insurance covered, and cumulative patient balance.",
    "context_notes": "SUM(insurance_covered) OVER (PARTITION BY patient_id ORDER BY id ASC) and SUM(patient_balance) OVER (...).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "patient_id",
      "id",
      "cumulative_insurance_covered",
      "cumulative_patient_balance"
    ],
    "reference_sql": "SELECT patient_id, id, ROUND(SUM(insurance_covered) OVER (PARTITION BY patient_id ORDER BY id ASC), 2) AS cumulative_insurance_covered, ROUND(SUM(patient_balance) OVER (PARTITION BY patient_id ORDER BY id ASC), 2) AS cumulative_patient_balance FROM billing ORDER BY patient_id, id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition billing by patient_id.",
      "Compute dual running totals for insurance_covered and patient_balance."
    ],
    "solution_explanation": "Compares institutional payer reimbursement accumulation against out-of-pocket patient debt.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-068",
    "domain": "healthcare",
    "level": 4,
    "order": 68,
    "difficulty": "advanced",
    "title": "Physician Cancellation Rate Ranking Across Medical Staff",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Schedule reliability ranking: For each doctor with scheduled appointments, calculate their appointment cancellation percentage and rank doctors overall using DENSE_RANK. Return doctor name, specialty, total appointments, cancellation pct, and rank.",
    "context_notes": "DENSE_RANK() OVER (ORDER BY SUM(CASE WHEN a.status = cancelled THEN 1.0 ELSE 0.0 END) / COUNT(a.id) DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "total_appts",
      "cancellation_pct",
      "cancel_rank"
    ],
    "reference_sql": "SELECT d.name, d.specialty, COUNT(a.id) AS total_appts, ROUND(SUM(CASE WHEN a.status = 'cancelled' THEN 1.0 ELSE 0.0 END) / COUNT(a.id) * 100.0, 1) AS cancellation_pct, DENSE_RANK() OVER (ORDER BY SUM(CASE WHEN a.status = 'cancelled' THEN 1.0 ELSE 0.0 END) / COUNT(a.id) DESC) AS cancel_rank FROM doctors d JOIN appointments a ON d.id = a.doctor_id GROUP BY d.id, d.name, d.specialty HAVING COUNT(a.id) >= 3 ORDER BY cancel_rank, d.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by doctor.",
      "Calculate cancellation percentage.",
      "Rank with DENSE_RANK() descending by cancellation percentage."
    ],
    "solution_explanation": "Surfaces physicians with the highest cancellation ratios for scheduling intervention.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-069",
    "domain": "healthcare",
    "level": 4,
    "order": 69,
    "difficulty": "advanced",
    "title": "Consecutive Claim Amount Delta by Insurance Provider",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Claim volatility audit: For claims sorted by id within each insurance provider, compute the difference in claim_amount from the immediately preceding claim using LAG(). Return insurance provider, id, claim amount, previous claim amount, and claim delta.",
    "context_notes": "claim_amount - LAG(claim_amount) OVER (PARTITION BY insurance_provider ORDER BY id ASC).",
    "concepts": [
      "SELECT",
      "LAG",
      "PARTITION BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "insurance_provider",
      "id",
      "claim_amount",
      "prev_claim_amount",
      "claim_delta"
    ],
    "reference_sql": "SELECT insurance_provider, id, claim_amount, LAG(claim_amount, 1) OVER (PARTITION BY insurance_provider ORDER BY id ASC) AS prev_claim_amount, ROUND(claim_amount - LAG(claim_amount, 1) OVER (PARTITION BY insurance_provider ORDER BY id ASC), 2) AS claim_delta FROM insurance_claims ORDER BY insurance_provider, id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by insurance_provider.",
      "Subtract LAG(claim_amount) from current claim_amount."
    ],
    "solution_explanation": "Monitors billing batch variance in submission sizes across health insurance plans.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-070",
    "domain": "healthcare",
    "level": 4,
    "order": 70,
    "difficulty": "advanced",
    "title": "Nurse Seniority Sequence by Shift and Certification",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Nursing hierarchy: Number nurses sequentially within each shift (Day, Night) ordered by certification level (NP first, then BSN) and nurse id using ROW_NUMBER. Return shift, certification level, nurse name, and shift rank.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY shift ORDER BY certification_level ASC, id ASC).",
    "concepts": [
      "SELECT",
      "ROW_NUMBER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "shift",
      "certification_level",
      "name",
      "shift_rank"
    ],
    "reference_sql": "SELECT shift, certification_level, name, ROW_NUMBER() OVER (PARTITION BY shift ORDER BY certification_level ASC, id ASC) AS shift_rank FROM nurses ORDER BY shift, shift_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition nurses by shift.",
      "Order by certification_level and id in ROW_NUMBER()."
    ],
    "solution_explanation": "Organizes nursing shift leadership hierarchy based on advanced credentials.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L4-071",
    "domain": "healthcare",
    "level": 4,
    "order": 71,
    "difficulty": "advanced",
    "title": "Moving 3-Admission Rolling Average Length of Stay",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Bed stay rolling benchmark: For completed inpatient admissions ordered by admission date, calculate a 3-admission rolling average length of stay using AVG() OVER (ROWS BETWEEN 2 PRECEDING AND CURRENT ROW). Return admission id, admission date, length of stay, and rolling avg stay.",
    "context_notes": "AVG(discharge_date - admission_date) OVER (ORDER BY admission_date ASC, id ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW).",
    "concepts": [
      "SELECT",
      "AVG OVER",
      "WINDOW FRAME",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "id",
      "admission_date",
      "length_of_stay",
      "rolling_avg_stay"
    ],
    "reference_sql": "SELECT id, admission_date, (discharge_date - admission_date) AS length_of_stay, ROUND(AVG(discharge_date - admission_date) OVER (ORDER BY admission_date ASC, id ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 1) AS rolling_avg_stay FROM inpatient_admissions WHERE discharge_date IS NOT NULL ORDER BY admission_date ASC, id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate length of stay.",
      "Apply 3-row rolling average window frame ROWS BETWEEN 2 PRECEDING AND CURRENT ROW."
    ],
    "solution_explanation": "Smoothes inpatient hospitalization duration trends over calendar time.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-072",
    "domain": "healthcare",
    "level": 4,
    "order": 72,
    "difficulty": "advanced",
    "title": "Prescriptions Authorized by Doctor Ranking within Hospital",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Prescribing leadership roster: Count total prescriptions authored by each doctor and rank doctors hospital-wide using DENSE_RANK. Return doctor name, specialty, total prescriptions, and prescribing rank.",
    "context_notes": "DENSE_RANK() OVER (ORDER BY COUNT(pr.id) DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "prescriptions_count",
      "prescribing_rank"
    ],
    "reference_sql": "SELECT d.name, d.specialty, COUNT(pr.id) AS prescriptions_count, DENSE_RANK() OVER (ORDER BY COUNT(pr.id) DESC) AS prescribing_rank FROM doctors d JOIN prescriptions pr ON d.id = pr.doctor_id GROUP BY d.id, d.name, d.specialty ORDER BY prescribing_rank, d.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group prescriptions by doctor.",
      "Count prescriptions.",
      "Apply DENSE_RANK() OVER (ORDER BY COUNT(pr.id) DESC)."
    ],
    "solution_explanation": "Ranks physicians by total medication order volume authorized.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-073",
    "domain": "healthcare",
    "level": 4,
    "order": 73,
    "difficulty": "advanced",
    "title": "Inpatient Daily Rate Quartile Stratification by Building",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Campus facility rate quartiles: Segment inpatient rooms into 4 pricing quartiles using NTILE(4) within each building location. Return building, room number, daily rate, and building rate quartile.",
    "context_notes": "NTILE(4) OVER (PARTITION BY d.building ORDER BY r.daily_rate DESC).",
    "concepts": [
      "SELECT",
      "NTILE",
      "PARTITION BY",
      "JOIN"
    ],
    "expected_columns": [
      "building",
      "room_number",
      "daily_rate",
      "building_quartile"
    ],
    "reference_sql": "SELECT d.building, r.room_number, r.daily_rate, NTILE(4) OVER (PARTITION BY d.building ORDER BY r.daily_rate DESC) AS building_quartile FROM rooms r JOIN departments d ON r.department_id = d.id ORDER BY d.building, building_quartile, r.daily_rate DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms to departments.",
      "Partition by building.",
      "Apply NTILE(4) OVER (PARTITION BY d.building ORDER BY r.daily_rate DESC)."
    ],
    "solution_explanation": "Compares accommodation rate distributions across physical hospital towers.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-074",
    "domain": "healthcare",
    "level": 4,
    "order": 74,
    "difficulty": "advanced",
    "title": "Consecutive Days Between Patient Lab Tests",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Diagnostic test cadence: For patients undergoing multiple laboratory tests, calculate days elapsed since their immediately preceding lab test using LAG(). Return patient_id, test_id, performed date, and days since previous test.",
    "context_notes": "performed_date - LAG(performed_date) OVER (PARTITION BY patient_id ORDER BY performed_date ASC).",
    "concepts": [
      "SELECT",
      "LAG",
      "PARTITION BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "patient_id",
      "test_id",
      "performed_date",
      "days_since_prev_test"
    ],
    "reference_sql": "SELECT patient_id, test_id, performed_date, (performed_date - LAG(performed_date, 1) OVER (PARTITION BY patient_id ORDER BY performed_date ASC)) AS days_since_prev_test FROM patient_lab_results ORDER BY patient_id, performed_date ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition lab results by patient_id.",
      "Subtract LAG(performed_date) from performed_date."
    ],
    "solution_explanation": "Evaluates re-testing frequency and laboratory surveillance intervals.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L4-075",
    "domain": "healthcare",
    "level": 4,
    "order": 75,
    "difficulty": "advanced",
    "title": "Physician Completed Encounter Share of Specialty Volume",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Specialty production share: For each doctor, compute completed appointments and their percentage of all completed visits within their medical specialty using COUNT() and SUM() OVER (PARTITION BY specialty). Return specialty, doctor name, visits count, and specialty share pct.",
    "context_notes": "COUNT(a.id)::FLOAT / SUM(COUNT(a.id)) OVER (PARTITION BY d.specialty) * 100.0.",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "PARTITION BY",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "specialty",
      "name",
      "visits_count",
      "specialty_share_pct"
    ],
    "reference_sql": "SELECT d.specialty, d.name, COUNT(a.id) AS visits_count, ROUND(COUNT(a.id)::NUMERIC / SUM(COUNT(a.id)) OVER (PARTITION BY d.specialty) * 100.0, 1) AS specialty_share_pct FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.specialty, d.id, d.name ORDER BY d.specialty, specialty_share_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group by doctor and specialty.",
      "Compute total specialty visits via SUM(COUNT) OVER (PARTITION BY specialty).",
      "Calculate share percentage."
    ],
    "solution_explanation": "Measures doctor clinical market share within specialty practices.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-076",
    "domain": "healthcare",
    "level": 4,
    "order": 76,
    "difficulty": "boss",
    "title": "Hospital Revenue Cycle Quartile Segmentation (NTILE)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Executive Board Briefing: We require a strategic stratification of clinical billing charges into 4 equal quartiles (using NTILE(4)) to identify high-acuity patient revenue drivers. Return patient_id, total_charge, and revenue_quartile, sorted by quartile and charge.",
    "context_notes": "WITH billing_quartiles AS (SELECT patient_id, total_charge, NTILE(4) OVER (ORDER BY total_charge DESC) AS revenue_quartile FROM billing) SELECT patient_id, total_charge, revenue_quartile FROM billing_quartiles ORDER BY revenue_quartile, total_charge DESC LIMIT 30;",
    "concepts": [
      "SELECT",
      "CTE",
      "NTILE",
      "ORDER BY"
    ],
    "expected_columns": [
      "patient_id",
      "total_charge",
      "revenue_quartile"
    ],
    "reference_sql": "WITH billing_quartiles AS (SELECT patient_id, total_charge, NTILE(4) OVER (ORDER BY total_charge DESC) AS revenue_quartile FROM billing) SELECT patient_id, total_charge, revenue_quartile FROM billing_quartiles ORDER BY revenue_quartile, total_charge DESC LIMIT 30;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use NTILE(4) OVER (ORDER BY total_charge DESC) inside CTE.",
      "Order by revenue_quartile, total_charge DESC LIMIT 30."
    ],
    "solution_explanation": "Enterprise statistical windowing to partition clinical billing charges into four operational revenue quartiles.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L4-077",
    "domain": "healthcare",
    "level": 4,
    "order": 77,
    "difficulty": "boss",
    "title": "Top 2 Longest Inpatient Stays per Clinical Department",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Complex inpatient case review: Using DENSE_RANK() partitioned by department, find the top 2 longest completed inpatient stays in each department. Return department name, patient_id, admission id, length of stay, and stay rank.",
    "context_notes": "CTE with DENSE_RANK() OVER (PARTITION BY d.id ORDER BY (ia.discharge_date - ia.admission_date) DESC) WHERE rank <= 2.",
    "concepts": [
      "SELECT",
      "CTE",
      "DENSE_RANK",
      "PARTITION BY",
      "JOIN"
    ],
    "expected_columns": [
      "department_name",
      "patient_id",
      "admission_id",
      "length_of_stay",
      "stay_rank"
    ],
    "reference_sql": "WITH ranked_stays AS (SELECT d.name AS department_name, ia.patient_id, ia.id AS admission_id, (ia.discharge_date - ia.admission_date) AS length_of_stay, DENSE_RANK() OVER (PARTITION BY d.id ORDER BY (ia.discharge_date - ia.admission_date) DESC) AS stay_rank FROM inpatient_admissions ia JOIN rooms r ON ia.room_id = r.id JOIN departments d ON r.department_id = d.id WHERE ia.discharge_date IS NOT NULL) SELECT department_name, patient_id, admission_id, length_of_stay, stay_rank FROM ranked_stays WHERE stay_rank <= 2 ORDER BY department_name, stay_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute stay in CTE and apply DENSE_RANK() partitioned by department.",
      "Filter stay_rank <= 2 in outer query."
    ],
    "solution_explanation": "Isolates chronic high-utilization inpatient admissions across hospital service lines.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L4-078",
    "domain": "healthcare",
    "level": 4,
    "order": 78,
    "difficulty": "boss",
    "title": "30-Day Hospital Readmission Anomaly Detection",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "CMS readmission penalty audit: Identify all inpatient readmissions where a patient was readmitted within 30 days of their previous discharge date using LAG(). Return patient_id, current admission id, admission date, previous discharge, and days between.",
    "context_notes": "CTE with LAG(discharge_date) OVER (PARTITION BY patient_id ORDER BY admission_date ASC) WHERE days_between <= 30.",
    "concepts": [
      "SELECT",
      "CTE",
      "LAG",
      "PARTITION BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "patient_id",
      "admission_id",
      "admission_date",
      "prev_discharge",
      "days_between"
    ],
    "reference_sql": "WITH readm AS (SELECT patient_id, id AS admission_id, admission_date, LAG(discharge_date, 1) OVER (PARTITION BY patient_id ORDER BY admission_date ASC) AS prev_discharge, (admission_date - LAG(discharge_date, 1) OVER (PARTITION BY patient_id ORDER BY admission_date ASC)) AS days_between FROM inpatient_admissions) SELECT patient_id, admission_id, admission_date, prev_discharge, days_between FROM readm WHERE days_between IS NOT NULL AND days_between <= 30 ORDER BY days_between ASC, patient_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute LAG(discharge_date) in CTE.",
      "Filter WHERE days_between <= 30 in outer query."
    ],
    "solution_explanation": "Flags hospital encounters triggering Medicare 30-day readmission quality penalties.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L4-079",
    "domain": "healthcare",
    "level": 4,
    "order": 79,
    "difficulty": "boss",
    "title": "Physician Productivity Tiering Matrix (Percentile Ranking)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Medical executive committee: Calculate completed visits, gross billing generated, and assign doctors to 4 performance quartiles using NTILE(4) based on gross revenue. Return doctor name, specialty, completed visits, gross revenue, and revenue quartile.",
    "context_notes": "CTE aggregating appointments by doctor, then NTILE(4) OVER (ORDER BY gross_revenue DESC).",
    "concepts": [
      "SELECT",
      "CTE",
      "NTILE",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "completed_visits",
      "gross_revenue",
      "revenue_quartile"
    ],
    "reference_sql": "WITH doc_stats AS (SELECT d.name, d.specialty, COUNT(a.id) AS completed_visits, ROUND(SUM(a.fee), 2) AS gross_revenue FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.id, d.name, d.specialty) SELECT name, specialty, completed_visits, gross_revenue, NTILE(4) OVER (ORDER BY gross_revenue DESC) AS revenue_quartile FROM doc_stats ORDER BY revenue_quartile, gross_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate completed appointments and fees per doctor in CTE.",
      "Apply NTILE(4) OVER (ORDER BY gross_revenue DESC) in outer query."
    ],
    "solution_explanation": "Strategic practice scorecard ranking physicians into production quartiles.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L4-080",
    "domain": "healthcare",
    "level": 4,
    "order": 80,
    "difficulty": "boss",
    "title": "Cumulative Revenue Trajectory by Doctor Specialty Over Time",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Specialty growth tracking: For each medical specialty, compute a running cumulative sum of appointment revenue ordered chronologically by appointment date using SUM() OVER. Return specialty, appointment id, appointment date, fee, and cumulative specialty revenue.",
    "context_notes": "SUM(a.fee) OVER (PARTITION BY d.specialty ORDER BY a.appointment_date ASC, a.id ASC).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "PARTITION BY",
      "JOIN"
    ],
    "expected_columns": [
      "specialty",
      "id",
      "appointment_date",
      "fee",
      "cumulative_specialty_revenue"
    ],
    "reference_sql": "SELECT d.specialty, a.id, a.appointment_date, a.fee, ROUND(SUM(a.fee) OVER (PARTITION BY d.specialty ORDER BY a.appointment_date ASC, a.id ASC), 2) AS cumulative_specialty_revenue FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed' ORDER BY d.specialty, a.appointment_date ASC, a.id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments to doctors.",
      "Partition by specialty and calculate running total with SUM() OVER."
    ],
    "solution_explanation": "Tracks continuous specialty clinic financial velocity.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L4-081",
    "domain": "healthcare",
    "level": 4,
    "order": 81,
    "difficulty": "boss",
    "title": "Patient Biomarker Pathological Progression Index (Dual Window)",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Lab trend audit: For patients undergoing multiple tests of the same lab test, display result value, previous result value using LAG(), and difference from test normal max. Return patient_id, test_id, performed date, result value, prev result, and variance from max.",
    "context_notes": "LAG(result_value) OVER (PARTITION BY patient_id, test_id ORDER BY performed_date ASC) alongside result_value - lt.normal_range_max.",
    "concepts": [
      "SELECT",
      "LAG",
      "INNER JOIN",
      "PARTITION BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "patient_id",
      "test_id",
      "performed_date",
      "result_value",
      "prev_result",
      "variance_from_max"
    ],
    "reference_sql": "SELECT plr.patient_id, plr.test_id, plr.performed_date, plr.result_value, LAG(plr.result_value, 1) OVER (PARTITION BY plr.patient_id, plr.test_id ORDER BY plr.performed_date ASC) AS prev_result, ROUND(plr.result_value - lt.normal_range_max, 2) AS variance_from_max FROM patient_lab_results plr JOIN lab_tests lt ON plr.test_id = lt.id ORDER BY plr.patient_id, plr.test_id, plr.performed_date ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join patient_lab_results to lab_tests.",
      "Apply LAG on result_value.",
      "Compute variance from normal_range_max."
    ],
    "solution_explanation": "Longitudinal pathology surveillance integrating trend history and canonical reference thresholds.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L4-082",
    "domain": "healthcare",
    "level": 4,
    "order": 82,
    "difficulty": "boss",
    "title": "Top 3 Highest Patient Balances per Insurance Provider",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Self-pay exposure by payer: Using DENSE_RANK() in a CTE, find the top 3 largest patient balances owed for each insurance provider. Return insurance provider, billing id, patient_id, patient balance, and balance rank.",
    "context_notes": "DENSE_RANK() OVER (PARTITION BY p.insurance_provider ORDER BY b.patient_balance DESC) WHERE rank <= 3.",
    "concepts": [
      "SELECT",
      "CTE",
      "DENSE_RANK",
      "PARTITION BY",
      "JOIN"
    ],
    "expected_columns": [
      "insurance_provider",
      "id",
      "patient_id",
      "patient_balance",
      "balance_rank"
    ],
    "reference_sql": "WITH ranked_balances AS (SELECT p.insurance_provider, b.id, b.patient_id, b.patient_balance, DENSE_RANK() OVER (PARTITION BY p.insurance_provider ORDER BY b.patient_balance DESC) AS balance_rank FROM billing b JOIN patients p ON b.patient_id = p.id) SELECT insurance_provider, id, patient_id, patient_balance, balance_rank FROM ranked_balances WHERE balance_rank <= 3 ORDER BY insurance_provider, balance_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing to patients in CTE.",
      "Rank by patient_balance DESC partitioned by insurance_provider.",
      "Filter balance_rank <= 3."
    ],
    "solution_explanation": "Identifies key out-of-pocket exposure debt accounts across major health plans.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L4-083",
    "domain": "healthcare",
    "level": 4,
    "order": 83,
    "difficulty": "boss",
    "title": "Moving 7-Day Rolling Revenue Across Hospital Outpatient Clinic",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Clinical cash velocity: For completed appointments ordered by appointment date, compute a 7-encounter rolling sum of visit fees using SUM() OVER (ROWS BETWEEN 6 PRECEDING AND CURRENT ROW). Return id, appointment date, fee, and 7-encounter rolling revenue.",
    "context_notes": "SUM(fee) OVER (ORDER BY appointment_date ASC, id ASC ROWS BETWEEN 6 PRECEDING AND CURRENT ROW).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "WINDOW FRAME",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "appointment_date",
      "fee",
      "rolling_7_revenue"
    ],
    "reference_sql": "SELECT id, appointment_date, fee, ROUND(SUM(fee) OVER (ORDER BY appointment_date ASC, id ASC ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS rolling_7_revenue FROM appointments WHERE status = 'completed' ORDER BY appointment_date ASC, id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Specify window frame ROWS BETWEEN 6 PRECEDING AND CURRENT ROW.",
      "Compute rolling cumulative sum on fee."
    ],
    "solution_explanation": "Monitors short-term operational cash generation across outpatient clinics.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L4-084",
    "domain": "healthcare",
    "level": 4,
    "order": 84,
    "difficulty": "boss",
    "title": "Department Nurse Staffing Ratio Ranking",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Workforce bed-to-nurse ratio: For each department, calculate total beds, total nurses staffed, and beds per nurse ratio, then rank departments by beds per nurse descending using DENSE_RANK. Return department name, total beds, total nurses, beds per nurse, and staffing rank.",
    "context_notes": "CTE calculating beds and nurses per department, then DENSE_RANK() OVER (ORDER BY beds_per_nurse DESC).",
    "concepts": [
      "SELECT",
      "CTE",
      "DENSE_RANK",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "department_name",
      "total_beds",
      "total_nurses",
      "beds_per_nurse",
      "staffing_rank"
    ],
    "reference_sql": "WITH dept_metrics AS (SELECT d.id, d.name AS department_name, COUNT(DISTINCT r.id) AS total_beds, COUNT(DISTINCT n.id) AS total_nurses, ROUND(COUNT(DISTINCT r.id)::NUMERIC / NULLIF(COUNT(DISTINCT n.id), 0), 2) AS beds_per_nurse FROM departments d LEFT JOIN rooms r ON d.id = r.department_id LEFT JOIN nurses n ON d.id = n.department_id GROUP BY d.id, d.name) SELECT department_name, total_beds, total_nurses, beds_per_nurse, DENSE_RANK() OVER (ORDER BY beds_per_nurse DESC) AS staffing_rank FROM dept_metrics ORDER BY staffing_rank, department_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate bed count and nurse count per department in CTE.",
      "Compute beds_per_nurse ratio.",
      "Rank with DENSE_RANK() descending."
    ],
    "solution_explanation": "Evaluates nursing workload stress and patient safety ratios across hospital units.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L4-085",
    "domain": "healthcare",
    "level": 4,
    "order": 85,
    "difficulty": "boss",
    "title": "First Encounter vs Most Recent Encounter Fee Shift per Patient",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Patient economic trajectory: For patients with multiple completed visits, calculate their first visit fee using FIRST_VALUE and most recent visit fee using LAST_VALUE or ROW_NUMBER CTE. Return patient_id, first fee, latest fee, and fee change.",
    "context_notes": "CTE with ROW_NUMBER for first and last visit, joining to calculate fee difference.",
    "concepts": [
      "SELECT",
      "CTE",
      "ROW_NUMBER",
      "JOIN"
    ],
    "expected_columns": [
      "patient_id",
      "first_fee",
      "latest_fee",
      "fee_change"
    ],
    "reference_sql": "WITH ordered_appts AS (SELECT patient_id, fee, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY appointment_date ASC, id ASC) AS first_rn, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY appointment_date DESC, id DESC) AS last_rn FROM appointments WHERE status = 'completed'), first_v AS (SELECT patient_id, fee AS first_fee FROM ordered_appts WHERE first_rn = 1), last_v AS (SELECT patient_id, fee AS latest_fee FROM ordered_appts WHERE last_rn = 1) SELECT f.patient_id, f.first_fee, l.latest_fee, ROUND(l.latest_fee - f.first_fee, 2) AS fee_change FROM first_v f JOIN last_v l ON f.patient_id = l.patient_id WHERE f.first_fee != l.latest_fee ORDER BY fee_change DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Number encounters from start and end in CTE.",
      "Extract first_fee and latest_fee.",
      "Compute fee_change as latest - first."
    ],
    "solution_explanation": "Measures encounter acuity escalation across recurrent patient care episodes.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L4-086",
    "domain": "healthcare",
    "level": 4,
    "order": 86,
    "difficulty": "boss",
    "title": "Formulary Unit Cost Quartiles Within Each Dosage Form (NTILE)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Pharmacy formulary cost tiers: Segment medications into 4 cost quartiles using NTILE(4) within each dosage form (Tablet, Capsule, Inhaler). Return dosage form, medication name, unit cost, and cost quartile.",
    "context_notes": "NTILE(4) OVER (PARTITION BY dosage_form ORDER BY unit_cost DESC).",
    "concepts": [
      "SELECT",
      "NTILE",
      "PARTITION BY"
    ],
    "expected_columns": [
      "dosage_form",
      "name",
      "unit_cost",
      "cost_quartile"
    ],
    "reference_sql": "SELECT dosage_form, name, unit_cost, NTILE(4) OVER (PARTITION BY dosage_form ORDER BY unit_cost DESC) AS cost_quartile FROM medications ORDER BY dosage_form, cost_quartile, unit_cost DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition medications by dosage_form.",
      "Apply NTILE(4) OVER (PARTITION BY dosage_form ORDER BY unit_cost DESC)."
    ],
    "solution_explanation": "Categorizes therapeutic agents into budget tiers per formulation type.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-087",
    "domain": "healthcare",
    "level": 4,
    "order": 87,
    "difficulty": "boss",
    "title": "Top 3 Most Recent Clinical Encounters per Patient (ROW_NUMBER)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Longitudinal chart view: Retrieve the 3 most recent completed appointments for each patient using ROW_NUMBER. Return patient_id, appointment id, appointment date, fee, and recency rank.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY appointment_date DESC) WHERE rn <= 3.",
    "concepts": [
      "SELECT",
      "CTE",
      "ROW_NUMBER",
      "PARTITION BY"
    ],
    "expected_columns": [
      "patient_id",
      "id",
      "appointment_date",
      "fee",
      "recency_rank"
    ],
    "reference_sql": "WITH ranked_encounters AS (SELECT patient_id, id, appointment_date, fee, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY appointment_date DESC, id DESC) AS recency_rank FROM appointments WHERE status = 'completed') SELECT patient_id, id, appointment_date, fee, recency_rank FROM ranked_encounters WHERE recency_rank <= 3 ORDER BY patient_id, recency_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition by patient_id, order by appointment_date DESC.",
      "Filter recency_rank <= 3 in outer query."
    ],
    "solution_explanation": "Extracts proximate patient encounter history for clinical handoffs.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-088",
    "domain": "healthcare",
    "level": 4,
    "order": 88,
    "difficulty": "boss",
    "title": "Insurance Provider Net Reimbursement Realization Ranking",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Contractual yield scorecard: For each insurance provider, compute total claim amount, total approved amount, net approved ratio, and rank providers by approved ratio descending using DENSE_RANK. Return insurance provider, gross claim, net approved, realization pct, and payer rank.",
    "context_notes": "DENSE_RANK() OVER (ORDER BY SUM(approved_amount) / SUM(claim_amount) DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "GROUP BY",
      "ROUND"
    ],
    "expected_columns": [
      "insurance_provider",
      "gross_claim",
      "net_approved",
      "realization_pct",
      "payer_rank"
    ],
    "reference_sql": "SELECT insurance_provider, ROUND(SUM(claim_amount), 2) AS gross_claim, ROUND(SUM(approved_amount), 2) AS net_approved, ROUND(SUM(approved_amount) / SUM(claim_amount) * 100.0, 1) AS realization_pct, DENSE_RANK() OVER (ORDER BY SUM(approved_amount) / SUM(claim_amount) DESC) AS payer_rank FROM insurance_claims GROUP BY insurance_provider ORDER BY payer_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group claims by insurance_provider.",
      "Sum claim and approved amounts.",
      "Apply DENSE_RANK() on realization percentage."
    ],
    "solution_explanation": "Ranks health plans by net contractual recovery performance.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L4-089",
    "domain": "healthcare",
    "level": 4,
    "order": 89,
    "difficulty": "boss",
    "title": "Patient Multi-Specialty Consultation Sequence (ROW_NUMBER)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Referral pathway sequencing: Order completed consultations for each patient showing doctor specialty and visit date, numbering them sequentially with ROW_NUMBER. Return patient_id, appointment date, doctor name, specialty, and visit sequence.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY a.patient_id ORDER BY a.appointment_date ASC).",
    "concepts": [
      "SELECT",
      "ROW_NUMBER",
      "PARTITION BY",
      "JOIN"
    ],
    "expected_columns": [
      "patient_id",
      "appointment_date",
      "doctor_name",
      "specialty",
      "visit_sequence"
    ],
    "reference_sql": "SELECT a.patient_id, a.appointment_date, d.name AS doctor_name, d.specialty, ROW_NUMBER() OVER (PARTITION BY a.patient_id ORDER BY a.appointment_date ASC) AS visit_sequence FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed' ORDER BY a.patient_id, visit_sequence;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments to doctors.",
      "Partition by patient_id, order by appointment_date ASC in ROW_NUMBER()."
    ],
    "solution_explanation": "Maps the longitudinal clinical specialty consultation journey for each patient.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-090",
    "domain": "healthcare",
    "level": 4,
    "order": 90,
    "difficulty": "boss",
    "title": "Department Bed Utilization Rate Ranking Across Hospital",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Campus bed occupancy league table: For each department, calculate total beds, occupied beds, occupancy percentage, and rank departments overall using DENSE_RANK. Return department name, total beds, occupied beds, occupancy pct, and occupancy rank.",
    "context_notes": "DENSE_RANK() OVER (ORDER BY SUM(CASE WHEN r.is_occupied THEN 1.0 ELSE 0.0 END) / COUNT(r.id) DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "department_name",
      "total_beds",
      "occupied_beds",
      "occupancy_pct",
      "occupancy_rank"
    ],
    "reference_sql": "SELECT d.name AS department_name, COUNT(r.id) AS total_beds, SUM(CASE WHEN r.is_occupied THEN 1 ELSE 0 END) AS occupied_beds, ROUND(SUM(CASE WHEN r.is_occupied THEN 1.0 ELSE 0.0 END) / COUNT(r.id) * 100.0, 1) AS occupancy_pct, DENSE_RANK() OVER (ORDER BY SUM(CASE WHEN r.is_occupied THEN 1.0 ELSE 0.0 END) / COUNT(r.id) DESC) AS occupancy_rank FROM departments d JOIN rooms r ON d.id = r.department_id GROUP BY d.id, d.name ORDER BY occupancy_rank, department_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join departments to rooms.",
      "Compute occupancy percentage.",
      "Rank with DENSE_RANK() descending."
    ],
    "solution_explanation": "Evaluates facility strain and bed capacity congestion across hospital divisions.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L4-091",
    "domain": "healthcare",
    "level": 4,
    "order": 91,
    "difficulty": "boss",
    "title": "High-Acuity Diagnosis Prevalence Ranking Across Doctors",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician clinical complexity: For each doctor, count how many Severe diagnoses they have treated and rank doctors overall using DENSE_RANK. Return doctor name, specialty, severe count, and complexity rank.",
    "context_notes": "DENSE_RANK() OVER (ORDER BY COUNT(dg.id) DESC).",
    "concepts": [
      "SELECT",
      "DENSE_RANK",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "severe_cases",
      "complexity_rank"
    ],
    "reference_sql": "SELECT d.name, d.specialty, COUNT(dg.id) AS severe_cases, DENSE_RANK() OVER (ORDER BY COUNT(dg.id) DESC) AS complexity_rank FROM doctors d JOIN appointments a ON d.id = a.doctor_id JOIN diagnoses dg ON a.id = dg.appointment_id WHERE dg.severity = 'Severe' GROUP BY d.id, d.name, d.specialty ORDER BY complexity_rank, d.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join doctors to appointments to diagnoses WHERE severity = Severe.",
      "Group by doctor.",
      "Apply DENSE_RANK() OVER (ORDER BY COUNT(dg.id) DESC)."
    ],
    "solution_explanation": "Ranks physicians managing disproportionately complex and critical clinical cohorts.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L4-092",
    "domain": "healthcare",
    "level": 4,
    "order": 92,
    "difficulty": "boss",
    "title": "Outpatient Fee Dispersion Between Successive Appointments (LAG)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Billing charge consistency: For completed appointments ordered by id, calculate the percentage change in visit fee relative to the previous appointment using LAG(). Return id, appointment date, fee, previous fee, and pct fee change.",
    "context_notes": "ROUND((fee - LAG(fee) OVER (ORDER BY id ASC)) / LAG(fee) OVER (ORDER BY id ASC) * 100.0, 1).",
    "concepts": [
      "SELECT",
      "LAG",
      "WINDOW FRAME",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "id",
      "appointment_date",
      "fee",
      "prev_fee",
      "pct_fee_change"
    ],
    "reference_sql": "SELECT id, appointment_date, fee, LAG(fee, 1) OVER (ORDER BY id ASC) AS prev_fee, ROUND((fee - LAG(fee, 1) OVER (ORDER BY id ASC)) / LAG(fee, 1) OVER (ORDER BY id ASC) * 100.0, 1) AS pct_fee_change FROM appointments WHERE status = 'completed' ORDER BY id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Apply LAG on visit fee ordered by id.",
      "Compute percentage change as (fee - prev) / prev * 100."
    ],
    "solution_explanation": "Measures encounter-to-encounter billing price stability.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L4-093",
    "domain": "healthcare",
    "level": 4,
    "order": 93,
    "difficulty": "boss",
    "title": "Patient Age Decile Stratification (NTILE 10)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Master demographic cohort: Divide all hospital patients into 10 age deciles using NTILE(10) based on date of birth (oldest in decile 1). Return patient_id, first name, last name, dob, and age decile.",
    "context_notes": "NTILE(10) OVER (ORDER BY dob ASC).",
    "concepts": [
      "SELECT",
      "NTILE",
      "OVER"
    ],
    "expected_columns": [
      "id",
      "first_name",
      "last_name",
      "dob",
      "age_decile"
    ],
    "reference_sql": "SELECT id, first_name, last_name, dob, NTILE(10) OVER (ORDER BY dob ASC) AS age_decile FROM patients ORDER BY age_decile, dob ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Apply NTILE(10) OVER (ORDER BY dob ASC) to patients.",
      "Select patient identity and birth date."
    ],
    "solution_explanation": "Granular age decile segmentation for targeted clinical population health programs.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-094",
    "domain": "healthcare",
    "level": 4,
    "order": 94,
    "difficulty": "boss",
    "title": "Department Cumulative Room Rate Capacity Potential",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Facility accommodation cash yield: For rooms ordered by room number within each department, calculate running cumulative daily rate capacity potential using SUM() OVER. Return department name, room number, daily rate, and cumulative department daily revenue.",
    "context_notes": "SUM(r.daily_rate) OVER (PARTITION BY d.id ORDER BY r.room_number ASC).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "PARTITION BY",
      "JOIN"
    ],
    "expected_columns": [
      "department_name",
      "room_number",
      "daily_rate",
      "cumulative_dept_daily_revenue"
    ],
    "reference_sql": "SELECT d.name AS department_name, r.room_number, r.daily_rate, ROUND(SUM(r.daily_rate) OVER (PARTITION BY d.id ORDER BY r.room_number ASC), 2) AS cumulative_dept_daily_revenue FROM rooms r JOIN departments d ON r.department_id = d.id ORDER BY d.name, r.room_number ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms to departments.",
      "Partition by department and compute cumulative daily_rate with SUM() OVER."
    ],
    "solution_explanation": "Models full-capacity daily room accommodation monetization by department.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L4-095",
    "domain": "healthcare",
    "level": 4,
    "order": 95,
    "difficulty": "boss",
    "title": "Top Prescribed Drug per Doctor Specialty (ROW_NUMBER)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Specialty formulary signature: Using ROW_NUMBER() in a CTE, identify the single most frequently prescribed medication in each medical specialty. Return specialty, medication name, and prescription count.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY d.specialty ORDER BY COUNT(pr.id) DESC) WHERE rn = 1.",
    "concepts": [
      "SELECT",
      "CTE",
      "ROW_NUMBER",
      "PARTITION BY",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "specialty",
      "medication_name",
      "prescriptions_count"
    ],
    "reference_sql": "WITH spec_meds AS (SELECT d.specialty, pr.medication_name, COUNT(pr.id) AS prescriptions_count, ROW_NUMBER() OVER (PARTITION BY d.specialty ORDER BY COUNT(pr.id) DESC) AS rn FROM doctors d JOIN prescriptions pr ON d.id = pr.doctor_id GROUP BY d.specialty, pr.medication_name) SELECT specialty, medication_name, prescriptions_count FROM spec_meds WHERE rn = 1 ORDER BY specialty;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group prescriptions by specialty and medication in CTE.",
      "Rank with ROW_NUMBER() partitioned by specialty.",
      "Filter rn = 1."
    ],
    "solution_explanation": "Surfaces the predominant drug therapy for each medical discipline.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L4-096",
    "domain": "healthcare",
    "level": 4,
    "order": 96,
    "difficulty": "boss",
    "title": "Top 3 Delayed Claim Settlements per Insurance Provider",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer lag escalation: Using DENSE_RANK() in a CTE, find the top 3 claims with the longest settlement days for each insurance provider. Return insurance provider, claim id, claim amount, settlement days, and delay rank.",
    "context_notes": "DENSE_RANK() OVER (PARTITION BY insurance_provider ORDER BY settlement_days DESC) WHERE rk <= 3.",
    "concepts": [
      "SELECT",
      "CTE",
      "DENSE_RANK",
      "PARTITION BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "id",
      "claim_amount",
      "settlement_days",
      "delay_rank"
    ],
    "reference_sql": "WITH ranked_claims AS (SELECT insurance_provider, id, claim_amount, settlement_days, DENSE_RANK() OVER (PARTITION BY insurance_provider ORDER BY settlement_days DESC) AS delay_rank FROM insurance_claims) SELECT insurance_provider, id, claim_amount, settlement_days, delay_rank FROM ranked_claims WHERE delay_rank <= 3 ORDER BY insurance_provider, delay_rank;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition claims by insurance_provider and rank by settlement_days DESC.",
      "Filter delay_rank <= 3 in outer query."
    ],
    "solution_explanation": "Pinpoints extreme settlement delay outliers for executive contract renegotiations.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L4-097",
    "domain": "healthcare",
    "level": 4,
    "order": 97,
    "difficulty": "boss",
    "title": "Consecutive Patient Inpatient Admissions Stay Delta (LAG)",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Acuity shift between admissions: For patients with multiple inpatient hospitalizations, calculate the difference in length of stay compared to their immediately prior admission using LAG(). Return patient_id, admission id, current stay, previous stay, and stay difference.",
    "context_notes": "(discharge_date - admission_date) - LAG(discharge_date - admission_date) OVER (PARTITION BY patient_id ORDER BY admission_date ASC).",
    "concepts": [
      "SELECT",
      "LAG",
      "PARTITION BY",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "patient_id",
      "id",
      "current_stay",
      "prev_stay",
      "stay_diff"
    ],
    "reference_sql": "SELECT patient_id, id, (discharge_date - admission_date) AS current_stay, LAG((discharge_date - admission_date), 1) OVER (PARTITION BY patient_id ORDER BY admission_date ASC) AS prev_stay, ((discharge_date - admission_date) - LAG((discharge_date - admission_date), 1) OVER (PARTITION BY patient_id ORDER BY admission_date ASC)) AS stay_diff FROM inpatient_admissions WHERE discharge_date IS NOT NULL ORDER BY patient_id, admission_date ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Partition admissions by patient_id.",
      "Subtract LAG(stay) from current stay."
    ],
    "solution_explanation": "Evaluates clinical deterioration or recovery across serial inpatient admissions.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L4-098",
    "domain": "healthcare",
    "level": 4,
    "order": 98,
    "difficulty": "boss",
    "title": "Doctor Billing Revenue Quartile Segmentation within Department",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Department intra-practice tiering: Segment doctors into 4 revenue quartiles using NTILE(4) within each department based on total completed appointment revenue. Return department_id, doctor name, gross revenue, and revenue quartile.",
    "context_notes": "NTILE(4) OVER (PARTITION BY d.department_id ORDER BY SUM(a.fee) DESC).",
    "concepts": [
      "SELECT",
      "CTE",
      "NTILE",
      "PARTITION BY",
      "JOIN",
      "GROUP BY"
    ],
    "expected_columns": [
      "department_id",
      "doctor_name",
      "gross_revenue",
      "revenue_quartile"
    ],
    "reference_sql": "WITH doc_rev AS (SELECT d.department_id, d.name AS doctor_name, ROUND(SUM(a.fee), 2) AS gross_revenue FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.department_id, d.id, d.name) SELECT department_id, doctor_name, gross_revenue, NTILE(4) OVER (PARTITION BY department_id ORDER BY gross_revenue DESC) AS revenue_quartile FROM doc_rev ORDER BY department_id, revenue_quartile, gross_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate revenue per doctor in CTE.",
      "Partition by department_id with NTILE(4) in outer query."
    ],
    "solution_explanation": "Stratifies physicians into revenue contribution tiers relative to department peers.",
    "xp": 35,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L4-099",
    "domain": "healthcare",
    "level": 4,
    "order": 99,
    "difficulty": "boss",
    "title": "Most Recent Clinical Lab Result per Patient (ROW_NUMBER)",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Proximate diagnostic snapshot: Using ROW_NUMBER() in a CTE, extract the single most recently performed lab test result for each patient. Return patient_id, test name, result value, flag, and performed date.",
    "context_notes": "ROW_NUMBER() OVER (PARTITION BY plr.patient_id ORDER BY plr.performed_date DESC, plr.id DESC) WHERE rn = 1.",
    "concepts": [
      "SELECT",
      "CTE",
      "ROW_NUMBER",
      "PARTITION BY",
      "JOIN"
    ],
    "expected_columns": [
      "patient_id",
      "test_name",
      "result_value",
      "flag",
      "performed_date"
    ],
    "reference_sql": "WITH ranked_labs AS (SELECT plr.patient_id, lt.test_name, plr.result_value, plr.flag, plr.performed_date, ROW_NUMBER() OVER (PARTITION BY plr.patient_id ORDER BY plr.performed_date DESC, plr.id DESC) AS rn FROM patient_lab_results plr JOIN lab_tests lt ON plr.test_id = lt.id) SELECT patient_id, test_name, result_value, flag, performed_date FROM ranked_labs WHERE rn = 1 ORDER BY patient_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join results to lab_tests in CTE.",
      "Rank by performed_date DESC partitioned by patient_id.",
      "Filter rn = 1."
    ],
    "solution_explanation": "Provides the latest diagnostic biomarker status per patient chart.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L4-100",
    "domain": "healthcare",
    "level": 4,
    "order": 100,
    "difficulty": "boss",
    "title": "Master Clinical Encounter Timeline with Moving 5-Visit Charge Benchmark",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Executive Board Clinical Economics: Construct a unified chronological encounter history of completed outpatient visits. Display appointment id, patient_id, appointment date, fee, running cumulative patient revenue, and a 5-visit moving average fee. Return top 25 encounters.",
    "context_notes": "SUM(fee) OVER (PARTITION BY patient_id ORDER BY appointment_date ASC, id ASC) AND AVG(fee) OVER (ORDER BY appointment_date ASC, id ASC ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING).",
    "concepts": [
      "SELECT",
      "SUM OVER",
      "AVG OVER",
      "WINDOW FRAME",
      "PARTITION BY"
    ],
    "expected_columns": [
      "id",
      "patient_id",
      "appointment_date",
      "fee",
      "patient_running_rev",
      "moving_avg_fee"
    ],
    "reference_sql": "SELECT id, patient_id, appointment_date, fee, ROUND(SUM(fee) OVER (PARTITION BY patient_id ORDER BY appointment_date ASC, id ASC), 2) AS patient_running_rev, ROUND(AVG(fee) OVER (ORDER BY appointment_date ASC, id ASC ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING), 2) AS moving_avg_fee FROM appointments WHERE status = 'completed' ORDER BY appointment_date ASC, id ASC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Combine running cumulative patient sum with 5-visit centered moving average across outpatient visits.",
      "Order by appointment_date ASC, id ASC LIMIT 25."
    ],
    "solution_explanation": "Capstone executive window function inquiry uniting longitudinal patient financial accumulation with institutional price trend smoothing.",
    "xp": 35,
    "estimated_minutes": 12
  }
];
