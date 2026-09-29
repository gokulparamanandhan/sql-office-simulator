import { QuestionDefinition } from "./ecom-l1-questions";

export const HC_L3_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "hc-L3-001",
    "domain": "healthcare",
    "level": 3,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Patients With Out-of-Range High Lab Results",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Clinical safety audit: Find all patients who have at least one lab test result flagged as HIGH. Return patient first name, last name, and city.",
    "context_notes": "Subquery with IN on patient_lab_results WHERE flag = HIGH.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city"
    ],
    "reference_sql": "SELECT first_name, last_name, city FROM patients WHERE id IN (SELECT patient_id FROM patient_lab_results WHERE flag = 'HIGH') ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use WHERE id IN (SELECT patient_id FROM patient_lab_results WHERE flag = 'HIGH').",
      "Project first_name, last_name, city."
    ],
    "solution_explanation": "Identifies patient cohort exhibiting abnormal lab flags needing clinical follow-up.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-002",
    "domain": "healthcare",
    "level": 3,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Physicians With Zero Prescriptions Written",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician practice audit: Which licensed doctors have not authored a single prescription in our electronic health record? Return doctor name and specialty.",
    "context_notes": "Subquery with NOT IN on prescriptions.",
    "concepts": [
      "SELECT",
      "NOT IN SUBQUERY"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty"
    ],
    "reference_sql": "SELECT name AS doctor_name, specialty FROM doctors WHERE id NOT IN (SELECT DISTINCT doctor_id FROM prescriptions WHERE doctor_id IS NOT NULL) ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use WHERE id NOT IN (SELECT DISTINCT doctor_id FROM prescriptions).",
      "Select name AS doctor_name, specialty."
    ],
    "solution_explanation": "Surfaces non-prescribing specialists or newly onboarded clinical physicians.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-003",
    "domain": "healthcare",
    "level": 3,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Appointments Priced Above Hospital Average",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Fee schedule review: Retrieve all appointments whose visit fee is strictly higher than the hospital-wide average appointment fee. Return appointment id, patient id, and fee.",
    "context_notes": "Scalar subquery in WHERE: fee > (SELECT AVG(fee) FROM appointments).",
    "concepts": [
      "SELECT",
      "WHERE",
      "SCALAR SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "patient_id",
      "fee"
    ],
    "reference_sql": "SELECT id, patient_id, fee FROM appointments WHERE fee > (SELECT AVG(fee) FROM appointments) ORDER BY fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compare fee > (SELECT AVG(fee) FROM appointments).",
      "Order by fee descending."
    ],
    "solution_explanation": "Identifies premium or specialized consultations priced above baseline outpatient averages.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-004",
    "domain": "healthcare",
    "level": 3,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Inpatient Rooms More Expensive Than Facility Average",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Facility budgeting: List all rooms whose daily rate is greater than the average room rate across the hospital. Return room number, room type, and daily rate.",
    "context_notes": "Scalar subquery: daily_rate > (SELECT AVG(daily_rate) FROM rooms).",
    "concepts": [
      "SELECT",
      "WHERE",
      "SCALAR SUBQUERY"
    ],
    "expected_columns": [
      "room_number",
      "room_type",
      "daily_rate"
    ],
    "reference_sql": "SELECT room_number, room_type, daily_rate FROM rooms WHERE daily_rate > (SELECT AVG(daily_rate) FROM rooms) ORDER BY daily_rate DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate facility average rate via scalar subquery.",
      "Select room_number, room_type, daily_rate."
    ],
    "solution_explanation": "Filters for specialized inpatient beds carrying premium facility charges.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L3-005",
    "domain": "healthcare",
    "level": 3,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Patients Never Diagnosed With Any Condition",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Preventative care outreach: Identify patients who have registered in our system but have no recorded clinical diagnoses in their chart. Return patient id, first name, last name, and insurance.",
    "context_notes": "Subquery with NOT IN on diagnoses.",
    "concepts": [
      "SELECT",
      "NOT IN SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "first_name",
      "last_name",
      "insurance_provider"
    ],
    "reference_sql": "SELECT id, first_name, last_name, insurance_provider FROM patients WHERE id NOT IN (SELECT DISTINCT patient_id FROM diagnoses WHERE patient_id IS NOT NULL) ORDER BY id;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE id NOT IN (SELECT DISTINCT patient_id FROM diagnoses).",
      "Return id, first_name, last_name, insurance_provider."
    ],
    "solution_explanation": "Pinpoints healthy baseline patients or missing clinical diagnostic codings.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-006",
    "domain": "healthcare",
    "level": 3,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Lab Tests Costing More Than Lab Test Average Fee",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Diagnostic pricing: Which diagnostic lab tests carry a standard fee above the average lab test fee? Return test name, category, and standard fee.",
    "context_notes": "Scalar subquery comparing standard_fee to AVG(standard_fee).",
    "concepts": [
      "SELECT",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "test_name",
      "category",
      "standard_fee"
    ],
    "reference_sql": "SELECT test_name, category, standard_fee FROM lab_tests WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests) ORDER BY standard_fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests).",
      "Order by standard_fee DESC."
    ],
    "solution_explanation": "Identifies complex laboratory panels exceeding benchmark testing fees.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L3-007",
    "domain": "healthcare",
    "level": 3,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Doctors Treating Severe Clinical Diagnoses",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "High-acuity clinical care: Find all doctors who have treated patients with a diagnosis marked as Severe. Return distinct doctor name and medical specialty.",
    "context_notes": "Subquery: doctor id IN appointments linked to diagnoses where severity = Severe.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY",
      "DISTINCT"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty"
    ],
    "reference_sql": "SELECT DISTINCT d.name AS doctor_name, d.specialty FROM doctors d WHERE d.id IN (SELECT a.doctor_id FROM appointments a JOIN diagnoses dg ON a.id = dg.appointment_id WHERE dg.severity = 'Severe') ORDER BY d.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments to diagnoses inside IN subquery filtering for severity = Severe.",
      "Select doctor_name and specialty."
    ],
    "solution_explanation": "Maps clinical physicians managing high-acuity, critical patient diagnoses.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-008",
    "domain": "healthcare",
    "level": 3,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Claims With Settlement Longer Than Average",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer lag analysis: List all insurance claims whose settlement days took longer than the overall average settlement time. Return id, insurance provider, claim amount, and settlement days.",
    "context_notes": "Scalar subquery on insurance_claims: settlement_days > (SELECT AVG(settlement_days)).",
    "concepts": [
      "SELECT",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "insurance_provider",
      "claim_amount",
      "settlement_days"
    ],
    "reference_sql": "SELECT id, insurance_provider, claim_amount, settlement_days FROM insurance_claims WHERE settlement_days > (SELECT AVG(settlement_days) FROM insurance_claims) ORDER BY settlement_days DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compare settlement_days > (SELECT AVG(settlement_days) FROM insurance_claims).",
      "Order descending by settlement_days."
    ],
    "solution_explanation": "Isolates delayed payer claims exceeding standard reimbursement turnaround.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-009",
    "domain": "healthcare",
    "level": 3,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Patients Prescribed Maintenance Cardiovascular Drugs",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Cardiovascular wellness initiative: Find all patients who have been prescribed either Lipitor or Plavix. Return distinct first name, last name, and city.",
    "context_notes": "Subquery with IN on prescriptions for specific medication names.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY",
      "DISTINCT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city"
    ],
    "reference_sql": "SELECT first_name, last_name, city FROM patients WHERE id IN (SELECT patient_id FROM prescriptions WHERE medication_name IN ('Lipitor', 'Plavix')) ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use WHERE id IN (SELECT patient_id FROM prescriptions WHERE medication_name IN ('Lipitor', 'Plavix')).",
      "Return first_name, last_name, city."
    ],
    "solution_explanation": "Identifies cardiovascular maintenance drug patient cohorts.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-010",
    "domain": "healthcare",
    "level": 3,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Billing Invoices Exceeding Average Total Charge",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "High-dollar revenue cycle review: Return all billing records where total charge is greater than the overall average total charge. Return id, patient id, total charge, and status.",
    "context_notes": "Scalar subquery: total_charge > (SELECT AVG(total_charge) FROM billing).",
    "concepts": [
      "SELECT",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "patient_id",
      "total_charge",
      "status"
    ],
    "reference_sql": "SELECT id, patient_id, total_charge, status FROM billing WHERE total_charge > (SELECT AVG(total_charge) FROM billing) ORDER BY total_charge DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use WHERE total_charge > (SELECT AVG(total_charge) FROM billing).",
      "Order by total_charge DESC."
    ],
    "solution_explanation": "Screens for high-cost encounters exceeding average facility billing amounts.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L3-011",
    "domain": "healthcare",
    "level": 3,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Patients With Multiple Clinical Encounters",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Frequent visitor cohort: Which patients have attended more than 1 appointment? Return patient first name, last name, and insurance provider.",
    "context_notes": "Subquery with IN grouping appointments HAVING count > 1.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "insurance_provider"
    ],
    "reference_sql": "SELECT first_name, last_name, insurance_provider FROM patients WHERE id IN (SELECT patient_id FROM appointments GROUP BY patient_id HAVING COUNT(*) > 1) ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by patient_id with HAVING COUNT(*) > 1 inside IN subquery.",
      "Select patient details."
    ],
    "solution_explanation": "Surfaces recurring ambulatory patients utilizing hospital outpatient services.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-012",
    "domain": "healthcare",
    "level": 3,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Doctors Assigned to Departments With Operating Rooms",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Surgical wing roster: List all doctors who belong to departments located in the Surgical Tower. Return doctor name, specialty, and phone.",
    "context_notes": "Subquery with IN on departments WHERE building = Surgical Tower.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "phone"
    ],
    "reference_sql": "SELECT name, specialty, phone FROM doctors WHERE department_id IN (SELECT id FROM departments WHERE building = 'Surgical Tower') ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE department_id IN (SELECT id FROM departments WHERE building = 'Surgical Tower').",
      "Select name, specialty, phone."
    ],
    "solution_explanation": "Directories physicians stationed in or operating out of the surgical wing.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-013",
    "domain": "healthcare",
    "level": 3,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Lab Tests With Abnormal Low Results",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Diagnostic alerts: Which lab test panels have generated at least one LOW result flag? Return distinct test name and category.",
    "context_notes": "Subquery with IN on patient_lab_results WHERE flag = LOW.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY",
      "DISTINCT"
    ],
    "expected_columns": [
      "test_name",
      "category"
    ],
    "reference_sql": "SELECT test_name, category FROM lab_tests WHERE id IN (SELECT DISTINCT test_id FROM patient_lab_results WHERE flag = 'LOW') ORDER BY test_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use WHERE id IN (SELECT DISTINCT test_id FROM patient_lab_results WHERE flag = 'LOW').",
      "Return test_name, category."
    ],
    "solution_explanation": "Highlights diagnostic tests prone to sub-therapeutic or deficient clinical flags.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-014",
    "domain": "healthcare",
    "level": 3,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Patients With Overdue Balances Above $200",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Collections escalation: Find all patients who have an overdue billing record where the patient balance is strictly greater than $200. Return first name, last name, and city.",
    "context_notes": "Subquery with IN on billing WHERE status = overdue AND patient_balance > 200.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city"
    ],
    "reference_sql": "SELECT first_name, last_name, city FROM patients WHERE id IN (SELECT patient_id FROM billing WHERE status = 'overdue' AND patient_balance > 200.00) ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE id IN (SELECT patient_id FROM billing WHERE status = overdue AND patient_balance > 200).",
      "Project patient demographic details."
    ],
    "solution_explanation": "Identifies self-pay accounts subject to overdue collection letters.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-015",
    "domain": "healthcare",
    "level": 3,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Doctors Whose Average Visit Fee Exceeds Overall Benchmark",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Physician fee variance: List doctors whose individual average completed appointment fee exceeds the overall completed appointment fee average. Return doctor name and specialty.",
    "context_notes": "Subquery: doctor_id IN (SELECT doctor_id FROM appointments WHERE status = completed GROUP BY doctor_id HAVING AVG(fee) > ...).",
    "concepts": [
      "SELECT",
      "IN SUBQUERY",
      "HAVING"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty"
    ],
    "reference_sql": "SELECT name AS doctor_name, specialty FROM doctors WHERE id IN (SELECT doctor_id FROM appointments WHERE status = 'completed' GROUP BY doctor_id HAVING AVG(fee) > (SELECT AVG(fee) FROM appointments WHERE status = 'completed')) ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate benchmark average fee across completed appointments.",
      "Find doctors whose AVG(fee) exceeds benchmark in HAVING clause."
    ],
    "solution_explanation": "Identifies physicians commanding higher-than-average encounter reimbursement.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-016",
    "domain": "healthcare",
    "level": 3,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Patients Receiving Glucophage For Diabetes",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Metabolic care protocol: Retrieve all patients who have been prescribed Glucophage. Return first name, last name, and insurance provider.",
    "context_notes": "Subquery with IN on prescriptions WHERE medication_name = Glucophage.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "insurance_provider"
    ],
    "reference_sql": "SELECT first_name, last_name, insurance_provider FROM patients WHERE id IN (SELECT patient_id FROM prescriptions WHERE medication_name = 'Glucophage') ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE id IN (SELECT patient_id FROM prescriptions WHERE medication_name = 'Glucophage').",
      "Select first_name, last_name, insurance_provider."
    ],
    "solution_explanation": "Monitors type 2 diabetic patient prescription coverage.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L3-017",
    "domain": "healthcare",
    "level": 3,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Nurses Working In Departments With Intensive Care Beds",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Critical care nursing roster: Find all registered nurses assigned to departments that maintain ICU rooms. Return nurse name, shift, and certification level.",
    "context_notes": "Subquery with IN on departments that have rooms with room_type = ICU.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "name",
      "shift",
      "certification_level"
    ],
    "reference_sql": "SELECT name, shift, certification_level FROM nurses WHERE department_id IN (SELECT DISTINCT department_id FROM rooms WHERE room_type = 'ICU') ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Find department_ids containing ICU rooms via subquery.",
      "Select nurses in those department_ids."
    ],
    "solution_explanation": "Validates nurse staffing coverage in critical care inpatient units.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-018",
    "domain": "healthcare",
    "level": 3,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Approved Claims Greater Than Overall Approved Average",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Reimbursement performance: Retrieve all insurance claims with status approved where the approved amount exceeds the average approved claim amount. Return id, insurance provider, and approved amount.",
    "context_notes": "Scalar subquery: approved_amount > (SELECT AVG(approved_amount) FROM insurance_claims WHERE status = approved).",
    "concepts": [
      "SELECT",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "insurance_provider",
      "approved_amount"
    ],
    "reference_sql": "SELECT id, insurance_provider, approved_amount FROM insurance_claims WHERE status = 'approved' AND approved_amount > (SELECT AVG(approved_amount) FROM insurance_claims WHERE status = 'approved') ORDER BY approved_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use WHERE status = approved AND approved_amount > (SELECT AVG(approved_amount)...).",
      "Order by approved_amount DESC."
    ],
    "solution_explanation": "Tracks top-tier institutional claim payments approved by health plans.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-019",
    "domain": "healthcare",
    "level": 3,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Patients Diagnosed With Asthma Or Hypertension",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Chronic condition registry: List all patients who have been diagnosed with either Chronic Allergic Asthma (J45) or Essential Hypertension (I10). Return first name, last name, and date of birth.",
    "context_notes": "Subquery with IN on diagnoses WHERE icd10_code IN (J45, I10).",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "dob"
    ],
    "reference_sql": "SELECT first_name, last_name, dob FROM patients WHERE id IN (SELECT patient_id FROM diagnoses WHERE icd10_code IN ('J45', 'I10')) ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE id IN (SELECT patient_id FROM diagnoses WHERE icd10_code IN ('J45', 'I10')).",
      "Select first_name, last_name, dob."
    ],
    "solution_explanation": "Identifies chronic respiratory and cardiovascular patient registry members.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L3-020",
    "domain": "healthcare",
    "level": 3,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Denied Insurance Claims Linked to Billing Records",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer denial investigation: Show billing id, total charge, and copay amount for billing vouchers associated with denied insurance claims.",
    "context_notes": "Subquery with IN on insurance_claims WHERE status = denied.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "total_charge",
      "copay_amount"
    ],
    "reference_sql": "SELECT id, total_charge, copay_amount FROM billing WHERE id IN (SELECT billing_id FROM insurance_claims WHERE status = 'denied') ORDER BY total_charge DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter billing WHERE id IN (SELECT billing_id FROM insurance_claims WHERE status = 'denied').",
      "Order by total_charge DESC."
    ],
    "solution_explanation": "Isolates financial records requiring immediate claims appeal or re-submission.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-021",
    "domain": "healthcare",
    "level": 3,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Patients Having Both Morning And Evening Appointments",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Care scheduling patterns: Which patients have had appointments scheduled at 9:00 AM or earlier? Return distinct patient first name, last name, and city.",
    "context_notes": "Subquery with IN filtering appointment_date time component.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY",
      "DISTINCT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city"
    ],
    "reference_sql": "SELECT first_name, last_name, city FROM patients WHERE id IN (SELECT patient_id FROM appointments WHERE EXTRACT(HOUR FROM appointment_date) <= 9) ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Extract hour from appointment_date <= 9 inside IN subquery.",
      "Select distinct first_name, last_name, city."
    ],
    "solution_explanation": "Identifies early morning outpatient clinic attendee cohort.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-022",
    "domain": "healthcare",
    "level": 3,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Lab Tests With Zero Recorded High Flags",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Quality control: Which lab tests have NEVER yielded a HIGH result flag in any patient test result? Return test name and category.",
    "context_notes": "Subquery with NOT IN on patient_lab_results WHERE flag = HIGH.",
    "concepts": [
      "SELECT",
      "NOT IN SUBQUERY"
    ],
    "expected_columns": [
      "test_name",
      "category"
    ],
    "reference_sql": "SELECT test_name, category FROM lab_tests WHERE id NOT IN (SELECT DISTINCT test_id FROM patient_lab_results WHERE flag = 'HIGH') ORDER BY test_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE id NOT IN (SELECT DISTINCT test_id FROM patient_lab_results WHERE flag = 'HIGH').",
      "Select test_name, category."
    ],
    "solution_explanation": "Validates diagnostic panels exhibiting exclusively normal or low distributions.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-023",
    "domain": "healthcare",
    "level": 3,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Doctors With Urgent Appointments Scheduled",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Urgent clinic coverage: Find all doctors who have conducted at least one appointment marked with appointment_type Urgent. Return doctor name, specialty, and phone.",
    "context_notes": "Subquery with IN on appointments WHERE appointment_type = Urgent.",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "phone"
    ],
    "reference_sql": "SELECT name, specialty, phone FROM doctors WHERE id IN (SELECT DISTINCT doctor_id FROM appointments WHERE appointment_type = 'Urgent') ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter doctors WHERE id IN (SELECT DISTINCT doctor_id FROM appointments WHERE appointment_type = 'Urgent').",
      "Select name, specialty, phone."
    ],
    "solution_explanation": "Surfaces physicians active in acute and urgent outpatient consultations.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L3-024",
    "domain": "healthcare",
    "level": 3,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Prescriptions For Patients Living in Queens or Bronx",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Outer-borough medication audit: Retrieve all prescriptions written for patients whose city is Queens or Bronx. Return prescription id, patient_id, medication name, and dosage.",
    "context_notes": "Subquery with IN on patients WHERE city IN (Queens, Bronx).",
    "concepts": [
      "SELECT",
      "IN SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "patient_id",
      "medication_name",
      "dosage"
    ],
    "reference_sql": "SELECT id, patient_id, medication_name, dosage FROM prescriptions WHERE patient_id IN (SELECT id FROM patients WHERE city IN ('Queens', 'Bronx')) ORDER BY id ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE patient_id IN (SELECT id FROM patients WHERE city IN ('Queens', 'Bronx')).",
      "Select prescription details."
    ],
    "solution_explanation": "Audits regional outpatient pharmacy dispensing patterns across city boroughs.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-025",
    "domain": "healthcare",
    "level": 3,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Billing Records With Copay Above Median Threshold",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Patient financial responsibility: List all billing vouchers where copay_amount exceeds $50.00 and status is paid. Return id, patient id, copay amount, and total charge.",
    "context_notes": "Filter billing WHERE copay_amount > 50 AND status = paid.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "id",
      "patient_id",
      "copay_amount",
      "total_charge"
    ],
    "reference_sql": "SELECT id, patient_id, copay_amount, total_charge FROM billing WHERE copay_amount > 50.00 AND status = 'paid' ORDER BY copay_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE copay_amount > 50.00 AND status = 'paid'.",
      "Order by copay_amount DESC."
    ],
    "solution_explanation": "Identifies settled accounts carrying significant point-of-care patient copays.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L3-026",
    "domain": "healthcare",
    "level": 3,
    "order": 26,
    "difficulty": "core",
    "title": "Patients With At Least One Completed Visit (EXISTS)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Verified clinic attendee roster: Identify all patients who have at least one completed appointment using an EXISTS clause. Return patient first name, last name, and city.",
    "context_notes": "EXISTS clause correlating patients with appointments WHERE status = completed.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.city FROM patients p WHERE EXISTS (SELECT 1 FROM appointments a WHERE a.patient_id = p.id AND a.status = 'completed') ORDER BY p.last_name, p.first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate outer patient p with appointments a on a.patient_id = p.id.",
      "Add condition a.status = 'completed'."
    ],
    "solution_explanation": "Verifies patients with confirmed, completed clinical care visits.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-027",
    "domain": "healthcare",
    "level": 3,
    "order": 27,
    "difficulty": "core",
    "title": "Patients With No Diagnoses Recorded (NOT EXISTS)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Clinical documentation gap: Find all patients who have completed an appointment but have zero recorded diagnoses using NOT EXISTS. Return first name, last name, and insurance provider.",
    "context_notes": "NOT EXISTS correlating patients with diagnoses, while having completed appointment.",
    "concepts": [
      "SELECT",
      "NOT EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "insurance_provider"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.insurance_provider FROM patients p WHERE EXISTS (SELECT 1 FROM appointments a WHERE a.patient_id = p.id AND a.status = 'completed') AND NOT EXISTS (SELECT 1 FROM diagnoses dg WHERE dg.patient_id = p.id) ORDER BY p.last_name, p.first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Check EXISTS completed appointment and NOT EXISTS in diagnoses.",
      "Select first_name, last_name, insurance_provider."
    ],
    "solution_explanation": "Identifies completed visits lacking required clinical diagnostic coding.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-028",
    "domain": "healthcare",
    "level": 3,
    "order": 28,
    "difficulty": "core",
    "title": "Doctors With Above-Average Department Encounter Fees",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Physician rate variance: Find doctors whose individual average appointment fee is strictly greater than the average appointment fee of their department. Return doctor name, specialty, and department id.",
    "context_notes": "Correlated subquery: AVG(fee) for doctor > AVG(fee) for that department.",
    "concepts": [
      "SELECT",
      "CORRELATED SUBQUERY",
      "AVG",
      "GROUP BY"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "department_id"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, d.department_id FROM doctors d WHERE (SELECT AVG(a.fee) FROM appointments a WHERE a.doctor_id = d.id) > (SELECT AVG(a2.fee) FROM appointments a2 JOIN doctors d2 ON a2.doctor_id = d2.id WHERE d2.department_id = d.department_id) ORDER BY d.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compare doctor average fee against department average fee via correlated subqueries.",
      "Select doctor_name, specialty, department_id."
    ],
    "solution_explanation": "Identifies clinicians commanding premium visit fees relative to peers in the same specialty department.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-029",
    "domain": "healthcare",
    "level": 3,
    "order": 29,
    "difficulty": "core",
    "title": "Rooms Priced Higher Than Room Type Benchmark",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Bed pricing consistency: Which rooms are priced above the average daily rate for their specific room type (e.g. Standard, ICU, Suite)? Return room number, room type, and daily rate.",
    "context_notes": "Correlated subquery: daily_rate > (SELECT AVG(r2.daily_rate) FROM rooms r2 WHERE r2.room_type = r.room_type).",
    "concepts": [
      "SELECT",
      "CORRELATED SUBQUERY",
      "AVG"
    ],
    "expected_columns": [
      "room_number",
      "room_type",
      "daily_rate"
    ],
    "reference_sql": "SELECT r.room_number, r.room_type, r.daily_rate FROM rooms r WHERE r.daily_rate > (SELECT AVG(r2.daily_rate) FROM rooms r2 WHERE r2.room_type = r.room_type) ORDER BY r.room_type, r.daily_rate DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate room type average in correlated subquery matching on r2.room_type = r.room_type.",
      "Filter where r.daily_rate exceeds that benchmark."
    ],
    "solution_explanation": "Identifies individual beds priced above category peers.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-030",
    "domain": "healthcare",
    "level": 3,
    "order": 30,
    "difficulty": "core",
    "title": "Patients With Abnormal Lab Results And Active Prescriptions",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Complex patient identification: Find all patients who have both a HIGH lab result flag AND at least one prescription on file. Return distinct first name, last name, and city.",
    "context_notes": "EXISTS for HIGH lab result AND EXISTS for prescription.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "AND",
      "DISTINCT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.city FROM patients p WHERE EXISTS (SELECT 1 FROM patient_lab_results plr WHERE plr.patient_id = p.id AND plr.flag = 'HIGH') AND EXISTS (SELECT 1 FROM prescriptions pr WHERE pr.patient_id = p.id) ORDER BY p.last_name, p.first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use two correlated EXISTS clauses: one for HIGH lab flag and one for prescriptions.",
      "Project patient first_name, last_name, city."
    ],
    "solution_explanation": "Identifies medically managed patients actively monitored with abnormal biomarker flags.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-031",
    "domain": "healthcare",
    "level": 3,
    "order": 31,
    "difficulty": "core",
    "title": "Doctors Who Have Never Had A Patient No-Show",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician schedule reliability: List doctors who have conducted at least one appointment and have never had a no_show status. Return doctor name and specialty.",
    "context_notes": "EXISTS completed appointments AND NOT EXISTS no_show appointments.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "NOT EXISTS"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty FROM doctors d WHERE EXISTS (SELECT 1 FROM appointments a WHERE a.doctor_id = d.id) AND NOT EXISTS (SELECT 1 FROM appointments a2 WHERE a2.doctor_id = d.id AND a2.status = 'no_show') ORDER BY d.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Verify doctor has appointments with EXISTS and zero no_shows with NOT EXISTS.",
      "Select doctor_name and specialty."
    ],
    "solution_explanation": "Highlights physicians with 100% patient attendance compliance.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-032",
    "domain": "healthcare",
    "level": 3,
    "order": 32,
    "difficulty": "core",
    "title": "Billing Records With Balance Exceeding Status Average",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Accounts receivable stratification: Find all billing records where patient balance is strictly greater than the average patient balance for records of that same status. Return id, status, and patient balance.",
    "context_notes": "Correlated subquery: patient_balance > (SELECT AVG(b2.patient_balance) FROM billing b2 WHERE b2.status = b.status).",
    "concepts": [
      "SELECT",
      "CORRELATED SUBQUERY",
      "AVG"
    ],
    "expected_columns": [
      "id",
      "status",
      "patient_balance"
    ],
    "reference_sql": "SELECT b.id, b.status, b.patient_balance FROM billing b WHERE b.patient_balance > (SELECT AVG(b2.patient_balance) FROM billing b2 WHERE b2.status = b.status) ORDER BY b.status, b.patient_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compare patient_balance with correlated status-level average.",
      "Order by status and patient_balance descending."
    ],
    "solution_explanation": "Surfaces balance anomalies within paid, pending, and overdue billing buckets.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-033",
    "domain": "healthcare",
    "level": 3,
    "order": 33,
    "difficulty": "core",
    "title": "Claims Settled Faster Than Payer Average Time",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer adjudication velocity: List insurance claims that settled faster (fewer settlement days) than the average settlement days for that specific insurance provider. Return id, insurance provider, and settlement days.",
    "context_notes": "Correlated subquery: settlement_days < (SELECT AVG(ic2.settlement_days) FROM insurance_claims ic2 WHERE ic2.insurance_provider = ic.insurance_provider).",
    "concepts": [
      "SELECT",
      "CORRELATED SUBQUERY",
      "AVG"
    ],
    "expected_columns": [
      "id",
      "insurance_provider",
      "settlement_days"
    ],
    "reference_sql": "SELECT ic.id, ic.insurance_provider, ic.settlement_days FROM insurance_claims ic WHERE ic.settlement_days < (SELECT AVG(ic2.settlement_days) FROM insurance_claims ic2 WHERE ic2.insurance_provider = ic.insurance_provider) ORDER BY ic.insurance_provider, ic.settlement_days ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate subquery on insurance_provider to compute payer-specific average turnaround.",
      "Filter WHERE settlement_days < payer average."
    ],
    "solution_explanation": "Identifies fast-tracked claim reimbursements beating standard payer averages.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-034",
    "domain": "healthcare",
    "level": 3,
    "order": 34,
    "difficulty": "core",
    "title": "Departments With Higher Than Overall Bed Count (Derived Table)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Facility scale analysis: Find departments whose total bed count is greater than the average bed count per department. Return department name and total beds.",
    "context_notes": "Derived table aggregating room count per department, compared to average in outer WHERE.",
    "concepts": [
      "SELECT",
      "DERIVED TABLE",
      "GROUP BY",
      "AVG"
    ],
    "expected_columns": [
      "department_name",
      "total_beds"
    ],
    "reference_sql": "SELECT dept_beds.name AS department_name, dept_beds.bed_count AS total_beds FROM (SELECT d.name, COUNT(r.id) AS bed_count FROM departments d JOIN rooms r ON d.id = r.department_id GROUP BY d.name) dept_beds WHERE dept_beds.bed_count > (SELECT AVG(sub.cnt) FROM (SELECT COUNT(r2.id) AS cnt FROM rooms r2 GROUP BY r2.department_id) sub) ORDER BY total_beds DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate rooms per department in a derived table.",
      "Filter departments exceeding the average departmental bed count."
    ],
    "solution_explanation": "Identifies primary inpatient clinical units with above-average bed capacity.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-035",
    "domain": "healthcare",
    "level": 3,
    "order": 35,
    "difficulty": "core",
    "title": "Patients Having Diagnoses Across Multiple Specialties",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Complex multimorbidity tracking: Find patients who have received diagnoses from doctors in more than one distinct specialty. Return patient first name, last name, and distinct specialty count.",
    "context_notes": "Derived table or subquery counting distinct doctor specialties per patient > 1.",
    "concepts": [
      "SELECT",
      "JOIN",
      "GROUP BY",
      "HAVING",
      "COUNT DISTINCT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "specialty_count"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, COUNT(DISTINCT d.specialty) AS specialty_count FROM patients p JOIN diagnoses dg ON p.id = dg.patient_id JOIN appointments a ON dg.appointment_id = a.id JOIN doctors d ON a.doctor_id = d.id GROUP BY p.first_name, p.last_name HAVING COUNT(DISTINCT d.specialty) > 1 ORDER BY specialty_count DESC, p.last_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join patients → diagnoses → appointments → doctors.",
      "Group by patient and filter HAVING COUNT(DISTINCT d.specialty) > 1."
    ],
    "solution_explanation": "Highlights multi-disciplinary clinical care patients requiring care coordination.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-036",
    "domain": "healthcare",
    "level": 3,
    "order": 36,
    "difficulty": "core",
    "title": "Patients With No Active Insurance Claims (NOT EXISTS)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Self-pay / Unbilled patients: List all patients who have billing records, but have NO corresponding insurance claims submitted. Return patient id, total billed sum.",
    "context_notes": "NOT EXISTS correlating billing to insurance_claims.",
    "concepts": [
      "SELECT",
      "NOT EXISTS",
      "GROUP BY"
    ],
    "expected_columns": [
      "patient_id",
      "unclaimed_total"
    ],
    "reference_sql": "SELECT b.patient_id, ROUND(SUM(b.total_charge), 2) AS unclaimed_total FROM billing b WHERE NOT EXISTS (SELECT 1 FROM insurance_claims ic WHERE ic.billing_id = b.id) GROUP BY b.patient_id ORDER BY unclaimed_total DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use NOT EXISTS to find billing records absent in insurance_claims.",
      "Group by patient_id and sum total_charge."
    ],
    "solution_explanation": "Surfaces self-pay patient charges or claims not forwarded to third-party payers.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-037",
    "domain": "healthcare",
    "level": 3,
    "order": 37,
    "difficulty": "core",
    "title": "Doctors Handling More Visits Than Department Average",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Clinical productivity: Identify doctors who have completed more appointments than the average doctor in their department. Return doctor name, specialty, and completed visits count.",
    "context_notes": "Correlated subquery comparing doctor completed visits to department average.",
    "concepts": [
      "SELECT",
      "CORRELATED SUBQUERY",
      "COUNT",
      "GROUP BY"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "completed_visits"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, COUNT(a.id) AS completed_visits FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.id, d.name, d.specialty, d.department_id HAVING COUNT(a.id) > (SELECT AVG(sub.cnt) FROM (SELECT COUNT(a2.id) AS cnt FROM appointments a2 JOIN doctors d2 ON a2.doctor_id = d2.id WHERE a2.status = 'completed' AND d2.department_id = d.department_id GROUP BY d2.id) sub) ORDER BY completed_visits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute doctor completed appointments.",
      "Compare in HAVING against average completed appointments for doctors in that department."
    ],
    "solution_explanation": "Highlights high-volume physician performers within clinical departments.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-038",
    "domain": "healthcare",
    "level": 3,
    "order": 38,
    "difficulty": "core",
    "title": "Occupied ICU Bed Directory With Current Nurse On Duty",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "ICU floor monitoring: List all currently occupied ICU rooms with their room number, daily rate, and the department name. Use EXISTS to ensure the department has active day nurses.",
    "context_notes": "EXISTS verifying active Day shift nurses in the department.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "EXISTS"
    ],
    "expected_columns": [
      "room_number",
      "daily_rate",
      "department_name"
    ],
    "reference_sql": "SELECT r.room_number, r.daily_rate, d.name AS department_name FROM rooms r JOIN departments d ON r.department_id = d.id WHERE r.room_type = 'ICU' AND r.is_occupied = TRUE AND EXISTS (SELECT 1 FROM nurses n WHERE n.department_id = d.id AND n.shift = 'Day') ORDER BY r.room_number;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter rooms for ICU and is_occupied = TRUE.",
      "Verify day nurse coverage using EXISTS subquery on nurses."
    ],
    "solution_explanation": "Monitors staffed and active critical care beds.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-039",
    "domain": "healthcare",
    "level": 3,
    "order": 39,
    "difficulty": "core",
    "title": "Patients Prescribed Amoxicillin With Respiratory Diagnosis",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Antibiotic stewardship: Identify patients who were prescribed Amoxicillin and also have an Asthma or respiratory diagnosis (ICD-10 J45). Return first name, last name, and city.",
    "context_notes": "EXISTS checking for prescription Amoxicillin AND diagnosis J45.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "AND"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.city FROM patients p WHERE EXISTS (SELECT 1 FROM prescriptions pr WHERE pr.patient_id = p.id AND pr.medication_name = 'Amoxicillin') AND EXISTS (SELECT 1 FROM diagnoses dg WHERE dg.patient_id = p.id AND dg.icd10_code = 'J45') ORDER BY p.last_name, p.first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Check EXISTS for Amoxicillin prescription and EXISTS for J45 diagnosis.",
      "Select patient details."
    ],
    "solution_explanation": "Clinical pharmacology review for appropriate antibiotic indication.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-040",
    "domain": "healthcare",
    "level": 3,
    "order": 40,
    "difficulty": "core",
    "title": "Insurance Providers With Denial Rates Above Average",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer friction index: Find insurance providers whose percentage of denied claims is strictly greater than the overall hospital claim denial rate. Return insurance provider and denied claim count.",
    "context_notes": "Subquery calculating overall denial percentage compared to payer denial count.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "expected_columns": [
      "insurance_provider",
      "denied_count"
    ],
    "reference_sql": "SELECT insurance_provider, COUNT(*) AS denied_count FROM insurance_claims WHERE status = 'denied' GROUP BY insurance_provider HAVING COUNT(*) > (SELECT AVG(sub.cnt) FROM (SELECT COUNT(*) AS cnt FROM insurance_claims WHERE status = 'denied' GROUP BY insurance_provider) sub) ORDER BY denied_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group denied claims by insurance_provider.",
      "Filter HAVING denied count exceeds the average denied count across payers."
    ],
    "solution_explanation": "Identifies insurers with disproportionate clinical claim rejections.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-041",
    "domain": "healthcare",
    "level": 3,
    "order": 41,
    "difficulty": "core",
    "title": "Patients With Highest Single Billing Voucher",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Top invoice patient audit: Find the patient details for any billing record equal to the maximum total charge in the system. Return first name, last name, total charge, and insurance provider.",
    "context_notes": "Subquery matching total_charge = (SELECT MAX(total_charge) FROM billing).",
    "concepts": [
      "SELECT",
      "JOIN",
      "MAX",
      "SCALAR SUBQUERY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "total_charge",
      "insurance_provider"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, b.total_charge, p.insurance_provider FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.total_charge = (SELECT MAX(total_charge) FROM billing);",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use WHERE total_charge = (SELECT MAX(total_charge) FROM billing).",
      "Join billing to patients."
    ],
    "solution_explanation": "Audits the single largest inpatient/outpatient voucher billed by the hospital.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-042",
    "domain": "healthcare",
    "level": 3,
    "order": 42,
    "difficulty": "core",
    "title": "Departments With Zero Telehealth Consultations",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Virtual care penetration: Which clinical departments have never conducted a Telehealth appointment? Return department name and building.",
    "context_notes": "NOT EXISTS correlating departments through doctors to appointments where appointment_type = Telehealth.",
    "concepts": [
      "SELECT",
      "NOT EXISTS",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "department_name",
      "building"
    ],
    "reference_sql": "SELECT d.name AS department_name, d.building FROM departments d WHERE NOT EXISTS (SELECT 1 FROM doctors doc JOIN appointments a ON doc.id = a.doctor_id WHERE doc.department_id = d.id AND a.appointment_type = 'Telehealth') ORDER BY d.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate department d through doctors doc and appointments a.",
      "Filter NOT EXISTS appointment_type = 'Telehealth'."
    ],
    "solution_explanation": "Surfaces departments lagging in digital telemedicine adoption.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-043",
    "domain": "healthcare",
    "level": 3,
    "order": 43,
    "difficulty": "core",
    "title": "Lab Tests With Fee Higher Than Category Average",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Fee alignment: List all lab tests whose standard fee is strictly above the average standard fee for lab tests in that same category. Return test name, category, and standard fee.",
    "context_notes": "Correlated subquery comparing standard_fee with category average.",
    "concepts": [
      "SELECT",
      "CORRELATED SUBQUERY",
      "AVG"
    ],
    "expected_columns": [
      "test_name",
      "category",
      "standard_fee"
    ],
    "reference_sql": "SELECT lt.test_name, lt.category, lt.standard_fee FROM lab_tests lt WHERE lt.standard_fee > (SELECT AVG(lt2.standard_fee) FROM lab_tests lt2 WHERE lt2.category = lt.category) ORDER BY lt.category, lt.standard_fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute category average standard_fee in correlated subquery.",
      "Select tests priced above their category benchmark."
    ],
    "solution_explanation": "Assesses laboratory pricing consistency across test disciplines.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-044",
    "domain": "healthcare",
    "level": 3,
    "order": 44,
    "difficulty": "core",
    "title": "Patients With Out-Of-Pocket Balance Greater Than Copay",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "High patient liability: Identify patients whose unpaid patient balance is strictly greater than 3 times their copay amount. Return first name, last name, copay amount, and patient balance.",
    "context_notes": "Filter billing WHERE patient_balance > 3 * copay_amount.",
    "concepts": [
      "SELECT",
      "JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "copay_amount",
      "patient_balance"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, b.copay_amount, b.patient_balance FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.patient_balance > (3 * b.copay_amount) ORDER BY b.patient_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing to patients.",
      "Filter WHERE b.patient_balance > 3 * b.copay_amount."
    ],
    "solution_explanation": "Identifies patients facing high deductible or non-covered cost liabilities.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-045",
    "domain": "healthcare",
    "level": 3,
    "order": 45,
    "difficulty": "core",
    "title": "Doctors With More Prescriptions Than The Hospital Average",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Prescribing volume leaders: Which doctors have authored more prescriptions than the average doctor prescription volume? Return doctor name, specialty, and total prescriptions.",
    "context_notes": "Subquery with HAVING COUNT(*) > (SELECT AVG(cnt) FROM (SELECT COUNT(*) ...)).",
    "concepts": [
      "SELECT",
      "JOIN",
      "GROUP BY",
      "HAVING",
      "AVG"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "prescriptions_count"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, COUNT(pr.id) AS prescriptions_count FROM doctors d JOIN prescriptions pr ON d.id = pr.doctor_id GROUP BY d.id, d.name, d.specialty HAVING COUNT(pr.id) > (SELECT AVG(sub.cnt) FROM (SELECT COUNT(pr2.id) AS cnt FROM prescriptions pr2 GROUP BY pr2.doctor_id) sub) ORDER BY prescriptions_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Count prescriptions per doctor.",
      "Filter in HAVING against average prescriptions per doctor."
    ],
    "solution_explanation": "Identifies clinicians driving substantial pharmacotherapy order volume.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-046",
    "domain": "healthcare",
    "level": 3,
    "order": 46,
    "difficulty": "core",
    "title": "Patients With High Cholesterol Lab Results",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Cardiovascular risk screening: Find all patients whose Lipid Panel result value was strictly greater than the test normal_range_max (200.00). Return patient first name, last name, and result value.",
    "context_notes": "JOIN patient_lab_results with patients and lab_tests WHERE test_name = Lipid Panel AND result_value > normal_range_max.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "result_value"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, plr.result_value FROM patient_lab_results plr JOIN patients p ON plr.patient_id = p.id JOIN lab_tests lt ON plr.test_id = lt.id WHERE lt.test_name = 'Lipid Panel' AND plr.result_value > lt.normal_range_max ORDER BY plr.result_value DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join lab results to patients and lab_tests.",
      "Filter for Lipid Panel and result_value > normal_range_max."
    ],
    "solution_explanation": "Identifies hyperlipidemic patients requiring statin therapy titration.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-047",
    "domain": "healthcare",
    "level": 3,
    "order": 47,
    "difficulty": "core",
    "title": "Rooms In Departments Having Full Occupancy",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Inpatient capacity stress: List department names where at least 50% of the department rooms are currently marked is_occupied = TRUE. Return department name and occupied ratio.",
    "context_notes": "Derived table or HAVING comparing SUM(CASE WHEN is_occupied) / COUNT(*).",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "HAVING",
      "CASE"
    ],
    "expected_columns": [
      "department_name",
      "occupied_count",
      "total_rooms"
    ],
    "reference_sql": "SELECT d.name AS department_name, SUM(CASE WHEN r.is_occupied THEN 1 ELSE 0 END) AS occupied_count, COUNT(r.id) AS total_rooms FROM departments d JOIN rooms r ON d.id = r.department_id GROUP BY d.name HAVING SUM(CASE WHEN r.is_occupied THEN 1 ELSE 0 END)::FLOAT / COUNT(r.id) >= 0.50 ORDER BY occupied_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group rooms by department.",
      "Filter HAVING occupied percentage >= 50%."
    ],
    "solution_explanation": "Highlights hospital departments experiencing high bed census utilization.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-048",
    "domain": "healthcare",
    "level": 3,
    "order": 48,
    "difficulty": "core",
    "title": "Patients With Multiple Severe Diagnoses",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "High-risk clinical cohort: Find patients who have been diagnosed with more than 1 distinct condition marked as Severe. Return first name, last name, and severe condition count.",
    "context_notes": "GROUP BY patient HAVING COUNT(*) > 1 with severity = Severe.",
    "concepts": [
      "SELECT",
      "JOIN",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "severe_count"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, COUNT(dg.id) AS severe_count FROM patients p JOIN diagnoses dg ON p.id = dg.patient_id WHERE dg.severity = 'Severe' GROUP BY p.id, p.first_name, p.last_name HAVING COUNT(dg.id) > 1 ORDER BY severe_count DESC, p.last_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join patients to diagnoses filtering for severity = Severe.",
      "Group by patient and filter HAVING COUNT > 1."
    ],
    "solution_explanation": "Pins down patients with multiple critical life-threatening conditions.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-049",
    "domain": "healthcare",
    "level": 3,
    "order": 49,
    "difficulty": "core",
    "title": "Claims With Approval Percentage Below Payer Average",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Adjudication haircut audit: List insurance claims where the approved_amount is less than 85% of claim_amount. Return id, insurance provider, claim amount, and approved amount.",
    "context_notes": "Filter claims WHERE approved_amount < 0.85 * claim_amount.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ARITHMETIC"
    ],
    "expected_columns": [
      "id",
      "insurance_provider",
      "claim_amount",
      "approved_amount"
    ],
    "reference_sql": "SELECT id, insurance_provider, claim_amount, approved_amount FROM insurance_claims WHERE approved_amount < (0.85 * claim_amount) ORDER BY claim_amount DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE approved_amount < (0.85 * claim_amount).",
      "Order by claim_amount DESC."
    ],
    "solution_explanation": "Surfaces claims experiencing steep contractual underpayments or payer reductions.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-050",
    "domain": "healthcare",
    "level": 3,
    "order": 50,
    "difficulty": "core",
    "title": "Doctors With Highest Fee-To-Appointment Ratio",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Outpatient consultation yield: Calculate average fee per completed appointment for each doctor, returning only those whose average fee exceeds $200. Return doctor name, specialty, and average fee.",
    "context_notes": "GROUP BY doctor HAVING AVG(fee) > 200 on completed appointments.",
    "concepts": [
      "SELECT",
      "JOIN",
      "GROUP BY",
      "HAVING",
      "AVG"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "avg_fee"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, ROUND(AVG(a.fee), 2) AS avg_fee FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.id, d.name, d.specialty HAVING AVG(a.fee) > 200.00 ORDER BY avg_fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join doctors to completed appointments.",
      "Group by doctor and filter HAVING AVG(fee) > 200.00."
    ],
    "solution_explanation": "Identifies clinicians with top billing realization per outpatient visit.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-051",
    "domain": "healthcare",
    "level": 3,
    "order": 51,
    "difficulty": "advanced",
    "title": "Patient Age Cohort Classification",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Demographic segmentation: Classify each patient into an age group based on their date of birth: Senior (born before 1965), Middle-Aged (1965 to 1985), Young Adult (after 1985). Return patient name, birth date, and age group.",
    "context_notes": "CASE statement evaluating dob year.",
    "concepts": [
      "SELECT",
      "CASE WHEN"
    ],
    "expected_columns": [
      "name",
      "dob",
      "age_group"
    ],
    "reference_sql": "SELECT (first_name || ' ' || last_name) AS name, dob, CASE WHEN dob < '1965-01-01' THEN 'Senior' WHEN dob BETWEEN '1965-01-01' AND '1985-12-31' THEN 'Middle-Aged' ELSE 'Young Adult' END AS age_group FROM patients ORDER BY dob ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use CASE WHEN dob < '1965-01-01' THEN 'Senior'...",
      "Concatenate first_name and last_name."
    ],
    "solution_explanation": "Demographic cohort analysis for specialized clinical care pathways.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-052",
    "domain": "healthcare",
    "level": 3,
    "order": 52,
    "difficulty": "advanced",
    "title": "Payer Settlement Speed Performance Tiers",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Reimbursement cycle categorization: Categorize each insurance claim into settlement tiers: Fast (< 20 days), Standard (20 to 35 days), Slow (> 35 days). Return claim id, insurance provider, settlement days, and speed tier.",
    "context_notes": "CASE statement on settlement_days.",
    "concepts": [
      "SELECT",
      "CASE WHEN"
    ],
    "expected_columns": [
      "id",
      "insurance_provider",
      "settlement_days",
      "speed_tier"
    ],
    "reference_sql": "SELECT id, insurance_provider, settlement_days, CASE WHEN settlement_days < 20 THEN 'Fast' WHEN settlement_days BETWEEN 20 AND 35 THEN 'Standard' ELSE 'Slow' END AS speed_tier FROM insurance_claims ORDER BY settlement_days DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Evaluate settlement_days using CASE WHEN.",
      "Select id, insurance_provider, settlement_days, speed_tier."
    ],
    "solution_explanation": "Classifies payer turnaround speed into operational service-level tiers.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-053",
    "domain": "healthcare",
    "level": 3,
    "order": 53,
    "difficulty": "advanced",
    "title": "Abnormal Lab Result Flagging Logic",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Laboratory validation engine: Categorize lab results based on standard reference ranges: Low (result_value < normal_range_min), High (result_value > normal_range_max), Normal (otherwise). Return patient_id, test_name, result_value, and calculated_flag.",
    "context_notes": "JOIN patient_lab_results with lab_tests, CASE statement evaluating result_value vs normal ranges.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "CASE WHEN"
    ],
    "expected_columns": [
      "patient_id",
      "test_name",
      "result_value",
      "calculated_flag"
    ],
    "reference_sql": "SELECT plr.patient_id, lt.test_name, plr.result_value, CASE WHEN plr.result_value < lt.normal_range_min THEN 'Low' WHEN plr.result_value > lt.normal_range_max THEN 'High' ELSE 'Normal' END AS calculated_flag FROM patient_lab_results plr JOIN lab_tests lt ON plr.test_id = lt.id ORDER BY plr.patient_id, lt.test_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join patient_lab_results to lab_tests.",
      "Evaluate result_value against normal_range_min and normal_range_max in CASE."
    ],
    "solution_explanation": "Recomputes clinical abnormality flags against canonical reference thresholds.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-054",
    "domain": "healthcare",
    "level": 3,
    "order": 54,
    "difficulty": "advanced",
    "title": "Billing Collection Risk Matrix",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Financial risk profiling: Classify billing vouchers into risk categories: Resolved (status = paid), Pending Insurance (status = pending_insurance), High Risk Delinquent (status = overdue). Return billing id, patient balance, and risk category.",
    "context_notes": "CASE statement evaluating billing status.",
    "concepts": [
      "SELECT",
      "CASE WHEN"
    ],
    "expected_columns": [
      "id",
      "patient_balance",
      "risk_category"
    ],
    "reference_sql": "SELECT id, patient_balance, CASE WHEN status = 'paid' THEN 'Resolved' WHEN status = 'pending_insurance' THEN 'Pending Insurance' ELSE 'High Risk Delinquent' END AS risk_category FROM billing ORDER BY patient_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Map billing status to risk tier via CASE.",
      "Select id, patient_balance, risk_category."
    ],
    "solution_explanation": "Structures accounts receivable portfolios for targeted financial collections.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L3-055",
    "domain": "healthcare",
    "level": 3,
    "order": 55,
    "difficulty": "advanced",
    "title": "Diagnosis Severity Case Breakdown per Department",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Departmental morbidity mix: Count mild, moderate, and severe diagnoses recorded across each department using conditional SUM(CASE ...). Return department name, mild count, moderate count, and severe count.",
    "context_notes": "3-way JOIN: diagnoses → appointments → doctors → departments, conditional aggregation with SUM(CASE).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "department_name",
      "mild_cases",
      "moderate_cases",
      "severe_cases"
    ],
    "reference_sql": "SELECT dept.name AS department_name, SUM(CASE WHEN dg.severity = 'Mild' THEN 1 ELSE 0 END) AS mild_cases, SUM(CASE WHEN dg.severity = 'Moderate' THEN 1 ELSE 0 END) AS moderate_cases, SUM(CASE WHEN dg.severity = 'Severe' THEN 1 ELSE 0 END) AS severe_cases FROM diagnoses dg JOIN appointments a ON dg.appointment_id = a.id JOIN doctors doc ON a.doctor_id = doc.id JOIN departments dept ON doc.department_id = dept.id GROUP BY dept.name ORDER BY severe_cases DESC, moderate_cases DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses to appointments to doctors to departments.",
      "Pivot severity counts using conditional SUM(CASE WHEN severity = ...)."
    ],
    "solution_explanation": "Evaluates clinical acuity distribution across inpatient and outpatient service lines.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-056",
    "domain": "healthcare",
    "level": 3,
    "order": 56,
    "difficulty": "advanced",
    "title": "Payer Claim Denial Rate and Approval Ratio",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Health plan scorecard: For each insurance provider, compute total claims, total approved claims, total denied claims, and approval rate percentage.",
    "context_notes": "GROUP BY insurance_provider, conditional SUM(CASE) and COUNT(*).",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM CASE",
      "ROUND"
    ],
    "expected_columns": [
      "insurance_provider",
      "total_claims",
      "approved_count",
      "denied_count",
      "approval_rate_pct"
    ],
    "reference_sql": "SELECT insurance_provider, COUNT(*) AS total_claims, SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_count, SUM(CASE WHEN status = 'denied' THEN 1 ELSE 0 END) AS denied_count, ROUND(SUM(CASE WHEN status = 'approved' THEN 1.0 ELSE 0.0 END) / COUNT(*) * 100.0, 1) AS approval_rate_pct FROM insurance_claims GROUP BY insurance_provider ORDER BY approval_rate_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group insurance_claims by provider.",
      "Calculate counts and approval percentage via conditional SUM."
    ],
    "solution_explanation": "Benchmarking payer adjudication friction and claim approval integrity.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-057",
    "domain": "healthcare",
    "level": 3,
    "order": 57,
    "difficulty": "advanced",
    "title": "Appointment Completion Rate by Doctor Specialty",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Specialty encounter adherence: Calculate total appointments, completed count, no-show count, and completion percentage for each doctor specialty.",
    "context_notes": "JOIN appointments with doctors, GROUP BY specialty, conditional aggregation.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "specialty",
      "total_appts",
      "completed_count",
      "no_show_count",
      "completion_rate_pct"
    ],
    "reference_sql": "SELECT d.specialty, COUNT(a.id) AS total_appts, SUM(CASE WHEN a.status = 'completed' THEN 1 ELSE 0 END) AS completed_count, SUM(CASE WHEN a.status = 'no_show' THEN 1 ELSE 0 END) AS no_show_count, ROUND(SUM(CASE WHEN a.status = 'completed' THEN 1.0 ELSE 0.0 END) / COUNT(a.id) * 100.0, 1) AS completion_rate_pct FROM appointments a JOIN doctors d ON a.doctor_id = d.id GROUP BY d.specialty ORDER BY completion_rate_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments to doctors.",
      "Aggregate total, completed, and no-shows per specialty.",
      "Compute completion percentage."
    ],
    "solution_explanation": "Identifies specialties with high patient no-show rates needing reminder protocols.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-058",
    "domain": "healthcare",
    "level": 3,
    "order": 58,
    "difficulty": "advanced",
    "title": "Patient Out-of-Pocket Expense Stratification",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Financial toxicity audit: Categorize patient balance obligations into tiers: Minimal (< $50), Moderate ($50 to $200), Substantial (> $200). Return patient id, balance, and tier.",
    "context_notes": "CASE statement evaluating patient_balance.",
    "concepts": [
      "SELECT",
      "CASE WHEN"
    ],
    "expected_columns": [
      "id",
      "patient_balance",
      "exposure_tier"
    ],
    "reference_sql": "SELECT id, patient_balance, CASE WHEN patient_balance < 50.00 THEN 'Minimal' WHEN patient_balance BETWEEN 50.00 AND 200.00 THEN 'Moderate' ELSE 'Substantial' END AS exposure_tier FROM billing ORDER BY patient_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Evaluate patient_balance across expense tiers using CASE.",
      "Order by patient_balance descending."
    ],
    "solution_explanation": "Surfaces patients at risk of medical debt or needing financial assistance counseling.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-059",
    "domain": "healthcare",
    "level": 3,
    "order": 59,
    "difficulty": "advanced",
    "title": "Abnormal Biomarker Ratio by Test Category",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Laboratory diagnostic surveillance: For each lab test category, calculate total tests performed, abnormal count (flag HIGH or LOW), and abnormal rate percentage.",
    "context_notes": "JOIN patient_lab_results with lab_tests, GROUP BY category, conditional aggregation.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "category",
      "total_tests",
      "abnormal_count",
      "abnormal_rate_pct"
    ],
    "reference_sql": "SELECT lt.category, COUNT(plr.id) AS total_tests, SUM(CASE WHEN plr.flag IN ('HIGH', 'LOW') THEN 1 ELSE 0 END) AS abnormal_count, ROUND(SUM(CASE WHEN plr.flag IN ('HIGH', 'LOW') THEN 1.0 ELSE 0.0 END) / COUNT(plr.id) * 100.0, 1) AS abnormal_rate_pct FROM patient_lab_results plr JOIN lab_tests lt ON plr.test_id = lt.id GROUP BY lt.category ORDER BY abnormal_rate_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join patient_lab_results to lab_tests.",
      "Group by category.",
      "Compute abnormal count and percentage using conditional SUM."
    ],
    "solution_explanation": "Pinpoints laboratory disciplines detecting the highest pathological variances.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-060",
    "domain": "healthcare",
    "level": 3,
    "order": 60,
    "difficulty": "advanced",
    "title": "Prescription Refill Policy Compliance Audit",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Pharmacy protocol: Classify prescriptions into Single Fill (refills = 0), Limited Refill (refills = 1), Maintenance Extended (refills > 1). Return id, medication name, refills, and refill category.",
    "context_notes": "CASE statement evaluating refills column.",
    "concepts": [
      "SELECT",
      "CASE WHEN"
    ],
    "expected_columns": [
      "id",
      "medication_name",
      "refills",
      "refill_category"
    ],
    "reference_sql": "SELECT id, medication_name, refills, CASE WHEN refills = 0 THEN 'Single Fill' WHEN refills = 1 THEN 'Limited Refill' ELSE 'Maintenance Extended' END AS refill_category FROM prescriptions ORDER BY refills DESC, medication_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Classify prescriptions based on refill count using CASE.",
      "Select id, medication_name, refills, refill_category."
    ],
    "solution_explanation": "Audits compliance with chronic therapy vs acute short-course medication guidelines.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-061",
    "domain": "healthcare",
    "level": 3,
    "order": 61,
    "difficulty": "advanced",
    "title": "Payer Reimbursement Efficiency Ratio",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Contractual yield analysis: For each insurance carrier, compute total claim amount, total approved amount, and contractual realization percentage (approved / claim * 100).",
    "context_notes": "GROUP BY insurance_provider on insurance_claims, SUM(claim_amount), SUM(approved_amount).",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM",
      "ROUND"
    ],
    "expected_columns": [
      "insurance_provider",
      "gross_claimed",
      "net_approved",
      "realization_pct"
    ],
    "reference_sql": "SELECT insurance_provider, ROUND(SUM(claim_amount), 2) AS gross_claimed, ROUND(SUM(approved_amount), 2) AS net_approved, ROUND(SUM(approved_amount) / SUM(claim_amount) * 100.0, 1) AS realization_pct FROM insurance_claims GROUP BY insurance_provider ORDER BY realization_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group claims by insurance_provider.",
      "Sum claim_amount and approved_amount.",
      "Calculate net realization percentage."
    ],
    "solution_explanation": "Measures net realized dollar yield against gross billed charges across payers.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-062",
    "domain": "healthcare",
    "level": 3,
    "order": 62,
    "difficulty": "advanced",
    "title": "Inpatient Daily Room Occupancy Potential vs Actual",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Facility bed economics: Calculate total potential daily revenue (sum of all room daily rates) vs currently realized daily revenue (sum of occupied room rates) per department.",
    "context_notes": "JOIN rooms with departments, GROUP BY dept.name, conditional SUM(CASE).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "department_name",
      "potential_revenue",
      "realized_revenue"
    ],
    "reference_sql": "SELECT d.name AS department_name, ROUND(SUM(r.daily_rate), 2) AS potential_revenue, ROUND(SUM(CASE WHEN r.is_occupied THEN r.daily_rate ELSE 0 END), 2) AS realized_revenue FROM rooms r JOIN departments d ON r.department_id = d.id GROUP BY d.name ORDER BY realized_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms to departments.",
      "Sum total daily_rate for potential revenue.",
      "Sum daily_rate where is_occupied is true for realized revenue."
    ],
    "solution_explanation": "Calculates inpatient capacity monetization and vacant bed revenue leakage.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-063",
    "domain": "healthcare",
    "level": 3,
    "order": 63,
    "difficulty": "advanced",
    "title": "High-Cost Medication Utilization by Specialty",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Formulary expense audit: How many times has each specialty prescribed high-cost medications (unit cost > $20.00)? Return specialty, high cost prescriptions count, and total refills.",
    "context_notes": "JOIN prescriptions with doctors and medications WHERE unit_cost > 20, GROUP BY specialty.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "specialty",
      "high_cost_prescriptions",
      "total_refills"
    ],
    "reference_sql": "SELECT d.specialty, COUNT(pr.id) AS high_cost_prescriptions, SUM(pr.refills) AS total_refills FROM prescriptions pr JOIN doctors d ON pr.doctor_id = d.id JOIN medications m ON pr.medication_name = m.name WHERE m.unit_cost > 20.00 GROUP BY d.specialty ORDER BY high_cost_prescriptions DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions to doctors and medications.",
      "Filter for m.unit_cost > 20.00.",
      "Group by specialty and count."
    ],
    "solution_explanation": "Monitors expensive drug therapy prescribing across clinical service lines.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-064",
    "domain": "healthcare",
    "level": 3,
    "order": 64,
    "difficulty": "advanced",
    "title": "Nurse Certification Mix per Clinical Department",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Workforce qualification census: For each department, count how many Nurse Practitioners (NP) and Bachelor of Science in Nursing (BSN) nurses are staffed. Return department name, NP count, and BSN count.",
    "context_notes": "JOIN nurses with departments, GROUP BY dept.name, conditional SUM(CASE).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "department_name",
      "np_count",
      "bsn_count"
    ],
    "reference_sql": "SELECT d.name AS department_name, SUM(CASE WHEN n.certification_level = 'NP' THEN 1 ELSE 0 END) AS np_count, SUM(CASE WHEN n.certification_level = 'BSN' THEN 1 ELSE 0 END) AS bsn_count FROM nurses n JOIN departments d ON n.department_id = d.id GROUP BY d.name ORDER BY np_count DESC, bsn_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join nurses to departments.",
      "Pivot certification levels using conditional SUM(CASE)."
    ],
    "solution_explanation": "Assesses advanced practice nursing coverage across clinical departments.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-065",
    "domain": "healthcare",
    "level": 3,
    "order": 65,
    "difficulty": "advanced",
    "title": "Patient Visit Adherence by Metropolitan Borough",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Geographic health access: For each patient city, calculate total scheduled appointments, completed visits, and attendance rate percentage.",
    "context_notes": "JOIN appointments with patients, GROUP BY city, conditional aggregation.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "city",
      "total_encounters",
      "completed_visits",
      "adherence_pct"
    ],
    "reference_sql": "SELECT p.city, COUNT(a.id) AS total_encounters, SUM(CASE WHEN a.status = 'completed' THEN 1 ELSE 0 END) AS completed_visits, ROUND(SUM(CASE WHEN a.status = 'completed' THEN 1.0 ELSE 0.0 END) / COUNT(a.id) * 100.0, 1) AS adherence_pct FROM appointments a JOIN patients p ON a.patient_id = p.id GROUP BY p.city ORDER BY adherence_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments to patients.",
      "Group by patient city.",
      "Calculate attendance rate using conditional SUM."
    ],
    "solution_explanation": "Surfaces geographic barriers to outpatient care completion.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-066",
    "domain": "healthcare",
    "level": 3,
    "order": 66,
    "difficulty": "advanced",
    "title": "Doctor Daily Schedule Capacity Utilization",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician caseload tiering: Categorize doctors by their total scheduled appointment volume: High Volume (>= 8 appts), Moderate Volume (4 to 7 appts), Low Volume (< 4 appts). Return doctor name, specialty, total appointments, and volume tier.",
    "context_notes": "JOIN doctors with appointments, GROUP BY doctor, CASE on COUNT(a.id).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "CASE WHEN"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "total_appts",
      "volume_tier"
    ],
    "reference_sql": "SELECT d.name, d.specialty, COUNT(a.id) AS total_appts, CASE WHEN COUNT(a.id) >= 8 THEN 'High Volume' WHEN COUNT(a.id) BETWEEN 4 AND 7 THEN 'Moderate Volume' ELSE 'Low Volume' END AS volume_tier FROM doctors d JOIN appointments a ON d.id = a.doctor_id GROUP BY d.id, d.name, d.specialty ORDER BY total_appts DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by doctor.",
      "Classify appointment counts into volume tiers using CASE."
    ],
    "solution_explanation": "Balances patient visit demand across active medical staff.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-067",
    "domain": "healthcare",
    "level": 3,
    "order": 67,
    "difficulty": "advanced",
    "title": "Multimorbid Chronic Disease Prevalence",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Chronic complex care management: Find all patients who have been diagnosed with both Hypertension (I10) and Diabetes Mellitus (E11.9). Return patient first name, last name, and city.",
    "context_notes": "Subquery with INTERSECT or dual EXISTS.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "AND"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.city FROM patients p WHERE EXISTS (SELECT 1 FROM diagnoses dg WHERE dg.patient_id = p.id AND dg.icd10_code = 'I10') AND EXISTS (SELECT 1 FROM diagnoses dg2 WHERE dg2.patient_id = p.id AND dg2.icd10_code = 'E11.9') ORDER BY p.last_name, p.first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use two correlated EXISTS clauses: one for I10 and one for E11.9.",
      "Select patient details."
    ],
    "solution_explanation": "Clinical cohort tracking for dual hypertensive-diabetic chronic syndrome.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-068",
    "domain": "healthcare",
    "level": 3,
    "order": 68,
    "difficulty": "advanced",
    "title": "Revenue Leakage From Cancelled & No-Show Appointments",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Unrealized outpatient revenue: Calculate total uncollected encounter fees lost due to cancelled or no_show appointments across each doctor specialty. Return specialty, lost appointments count, and lost revenue.",
    "context_notes": "JOIN appointments with doctors WHERE status IN (cancelled, no_show), GROUP BY specialty.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "WHERE",
      "GROUP BY"
    ],
    "expected_columns": [
      "specialty",
      "lost_encounters",
      "lost_revenue"
    ],
    "reference_sql": "SELECT d.specialty, COUNT(a.id) AS lost_encounters, ROUND(SUM(a.fee), 2) AS lost_revenue FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status IN ('cancelled', 'no_show') GROUP BY d.specialty ORDER BY lost_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments to doctors.",
      "Filter WHERE status IN ('cancelled', 'no_show').",
      "Group by specialty, count visits and sum fee."
    ],
    "solution_explanation": "Quantifies top-line revenue lost to patient scheduling friction.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-069",
    "domain": "healthcare",
    "level": 3,
    "order": 69,
    "difficulty": "advanced",
    "title": "Accounts Receivable Recovery Rate by Payer",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer collections yield: For each insurance carrier, compute total billed charges, total paid amounts, and collection efficiency percentage (paid / total * 100).",
    "context_notes": "JOIN billing with patients, GROUP BY insurance_provider, conditional aggregation.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "insurance_provider",
      "total_billed",
      "paid_amount",
      "collection_pct"
    ],
    "reference_sql": "SELECT p.insurance_provider, ROUND(SUM(b.total_charge), 2) AS total_billed, ROUND(SUM(CASE WHEN b.status = 'paid' THEN b.total_charge ELSE 0 END), 2) AS paid_amount, ROUND(SUM(CASE WHEN b.status = 'paid' THEN b.total_charge ELSE 0 END) / SUM(b.total_charge) * 100.0, 1) AS collection_pct FROM billing b JOIN patients p ON b.patient_id = p.id GROUP BY p.insurance_provider ORDER BY collection_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing to patients.",
      "Group by insurance_provider.",
      "Compute total billed and paid amounts via conditional SUM.",
      "Calculate collection percentage."
    ],
    "solution_explanation": "Measures cash conversion efficiency per third-party health plan.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-070",
    "domain": "healthcare",
    "level": 3,
    "order": 70,
    "difficulty": "advanced",
    "title": "Hospital Inpatient Bed Occupancy Rate by Room Type",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Bed management dashboard: For each room type (Standard, ICU, Semi-Private, Suite), calculate total beds, occupied beds, and occupancy percentage.",
    "context_notes": "GROUP BY room_type on rooms, conditional aggregation with SUM(CASE).",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "SUM CASE",
      "ROUND"
    ],
    "expected_columns": [
      "room_type",
      "total_beds",
      "occupied_beds",
      "occupancy_pct"
    ],
    "reference_sql": "SELECT room_type, COUNT(*) AS total_beds, SUM(CASE WHEN is_occupied THEN 1 ELSE 0 END) AS occupied_beds, ROUND(SUM(CASE WHEN is_occupied THEN 1.0 ELSE 0.0 END) / COUNT(*) * 100.0, 1) AS occupancy_pct FROM rooms GROUP BY room_type ORDER BY occupancy_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group rooms by room_type.",
      "Count total rooms and occupied rooms using SUM(CASE).",
      "Calculate occupancy rate percentage."
    ],
    "solution_explanation": "Inpatient capacity census monitoring critical for bed management and triage.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-071",
    "domain": "healthcare",
    "level": 3,
    "order": 71,
    "difficulty": "advanced",
    "title": "Physicians Prescribing Multiple Distinct Medications",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Formulary breadth audit: Which physicians have prescribed at least 3 distinct medication names? Return doctor name, specialty, and unique medications count.",
    "context_notes": "JOIN prescriptions with doctors, GROUP BY doctor HAVING COUNT(DISTINCT medication_name) >= 3.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "COUNT DISTINCT"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "distinct_meds"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, COUNT(DISTINCT pr.medication_name) AS distinct_meds FROM prescriptions pr JOIN doctors d ON pr.doctor_id = d.id GROUP BY d.id, d.name, d.specialty HAVING COUNT(DISTINCT pr.medication_name) >= 3 ORDER BY distinct_meds DESC, d.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions to doctors.",
      "Group by doctor and filter HAVING COUNT(DISTINCT medication_name) >= 3."
    ],
    "solution_explanation": "Identifies clinicians managing broad-spectrum therapeutic pharmacotherapy.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-072",
    "domain": "healthcare",
    "level": 3,
    "order": 72,
    "difficulty": "advanced",
    "title": "Diagnostic Fee Spread Between Outpatient & Inpatient Labs",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Pricing spread: Calculate minimum fee, maximum fee, and price spread (max - min) for each lab test category. Return category, min fee, max fee, and fee spread.",
    "context_notes": "GROUP BY category on lab_tests, MIN, MAX, and arithmetic difference.",
    "concepts": [
      "SELECT",
      "GROUP BY",
      "MIN",
      "MAX"
    ],
    "expected_columns": [
      "category",
      "min_fee",
      "max_fee",
      "fee_spread"
    ],
    "reference_sql": "SELECT category, ROUND(MIN(standard_fee), 2) AS min_fee, ROUND(MAX(standard_fee), 2) AS max_fee, ROUND(MAX(standard_fee) - MIN(standard_fee), 2) AS fee_spread FROM lab_tests GROUP BY category ORDER BY fee_spread DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group lab_tests by category.",
      "Compute MIN(standard_fee) and MAX(standard_fee).",
      "Calculate fee_spread as max - min."
    ],
    "solution_explanation": "Analyzes pricing variance across pathology and diagnostic disciplines.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-073",
    "domain": "healthcare",
    "level": 3,
    "order": 73,
    "difficulty": "advanced",
    "title": "Uninsured or Self-Pay Out-of-Pocket Burden",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Self-pay exposure: For each billing voucher where copay equals zero, classify whether patient balance owes over $1000 (Major Debt) or under $1000 (Moderate Debt). Return id, patient_id, total charge, and debt category.",
    "context_notes": "Filter billing WHERE copay_amount = 0, CASE on patient_balance.",
    "concepts": [
      "SELECT",
      "CASE WHEN",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "patient_id",
      "total_charge",
      "debt_category"
    ],
    "reference_sql": "SELECT id, patient_id, total_charge, CASE WHEN patient_balance >= 1000.00 THEN 'Major Debt' ELSE 'Moderate Debt' END AS debt_category FROM billing WHERE copay_amount = 0.00 ORDER BY total_charge DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter billing for copay_amount = 0.",
      "Classify patient_balance via CASE statement."
    ],
    "solution_explanation": "Profiles high-exposure self-pay receivables needing hardship evaluation.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-074",
    "domain": "healthcare",
    "level": 3,
    "order": 74,
    "difficulty": "advanced",
    "title": "Departments With High Severe Acuity Burden",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Acuity indexing: Calculate the percentage of severe diagnoses handled by each department relative to total diagnoses in that department. Return department name, severe count, total count, and severe ratio.",
    "context_notes": "JOIN diagnoses → appointments → doctors → departments, GROUP BY dept.name, conditional aggregation.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "SUM CASE"
    ],
    "expected_columns": [
      "department_name",
      "severe_count",
      "total_diagnoses",
      "severe_pct"
    ],
    "reference_sql": "SELECT dept.name AS department_name, SUM(CASE WHEN dg.severity = 'Severe' THEN 1 ELSE 0 END) AS severe_count, COUNT(dg.id) AS total_diagnoses, ROUND(SUM(CASE WHEN dg.severity = 'Severe' THEN 1.0 ELSE 0.0 END) / COUNT(dg.id) * 100.0, 1) AS severe_pct FROM diagnoses dg JOIN appointments a ON dg.appointment_id = a.id JOIN doctors doc ON a.doctor_id = doc.id JOIN departments dept ON doc.department_id = dept.id GROUP BY dept.name ORDER BY severe_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses to appointments to doctors to departments.",
      "Group by department.",
      "Calculate severe diagnosis count and percentage."
    ],
    "solution_explanation": "Evaluates department case-mix index and clinical complexity burden.",
    "xp": 25,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-075",
    "domain": "healthcare",
    "level": 3,
    "order": 75,
    "difficulty": "advanced",
    "title": "Patients With Outstanding Bills And Pending Insurance",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Accounts receivable overlap: Identify patients who have at least one bill with status pending_insurance AND at least one bill with status overdue. Return distinct patient first name, last name, and city.",
    "context_notes": "Correlated dual EXISTS on billing for pending_insurance and overdue.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "AND",
      "DISTINCT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.city FROM patients p WHERE EXISTS (SELECT 1 FROM billing b WHERE b.patient_id = p.id AND b.status = 'pending_insurance') AND EXISTS (SELECT 1 FROM billing b2 WHERE b2.patient_id = p.id AND b2.status = 'overdue') ORDER BY p.last_name, p.first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use two correlated EXISTS clauses on billing: status pending_insurance and overdue.",
      "Select distinct first_name, last_name, city."
    ],
    "solution_explanation": "Identifies complex billing accounts with mixed insurer adjudication and self-pay arrears.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-076",
    "domain": "healthcare",
    "level": 3,
    "order": 76,
    "difficulty": "boss",
    "title": "Hospital Clinical Staff Unified Directory (UNION)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Master clinical workforce directory: Combine all doctors and all registered nurses into a unified roster showing staff name, professional role (Doctor vs Nurse), and assigned department id.",
    "context_notes": "UNION combining doctors and nurses.",
    "concepts": [
      "SELECT",
      "UNION",
      "ORDER BY"
    ],
    "expected_columns": [
      "staff_name",
      "staff_role",
      "department_id"
    ],
    "reference_sql": "SELECT name AS staff_name, 'Doctor' AS staff_role, department_id FROM doctors UNION SELECT name AS staff_name, 'Nurse' AS staff_role, department_id FROM nurses ORDER BY department_id, staff_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select name, 'Doctor', department_id from doctors.",
      "UNION select name, 'Nurse', department_id from nurses.",
      "Order by department_id and staff_name."
    ],
    "solution_explanation": "Creates an integrated clinical staff roster spanning physicians and nursing personnel.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-077",
    "domain": "healthcare",
    "level": 3,
    "order": 77,
    "difficulty": "boss",
    "title": "Diabetic Care Gap Audit (EXCEPT)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Clinical quality metric: Find all patients diagnosed with Type 2 Diabetes Mellitus (E11.9) EXCEPT those who have been prescribed Glucophage. Return patient id.",
    "context_notes": "EXCEPT comparing diagnosed diabetics against prescribed patients.",
    "concepts": [
      "SELECT",
      "EXCEPT",
      "ORDER BY"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT patient_id AS id FROM diagnoses WHERE icd10_code = 'E11.9' EXCEPT SELECT patient_id AS id FROM prescriptions WHERE medication_name = 'Glucophage' ORDER BY id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select patient_id from diagnoses WHERE icd10_code = 'E11.9'.",
      "EXCEPT select patient_id from prescriptions WHERE medication_name = 'Glucophage'.",
      "Order by id."
    ],
    "solution_explanation": "Identifies clinical gaps in pharmacotherapy guidelines for diabetic patients.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-078",
    "domain": "healthcare",
    "level": 3,
    "order": 78,
    "difficulty": "boss",
    "title": "Patients With Multi-Month Appointment Encounters (INTERSECT)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Longitudinal care continuity: Which patients attended an appointment in January 2024 AND attended an appointment in February 2024? Return patient id.",
    "context_notes": "INTERSECT comparing patient appointments across two date ranges.",
    "concepts": [
      "SELECT",
      "INTERSECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT patient_id AS id FROM appointments WHERE appointment_date >= '2024-01-01' AND appointment_date < '2024-02-01' INTERSECT SELECT patient_id AS id FROM appointments WHERE appointment_date >= '2024-02-01' AND appointment_date < '2024-03-01' ORDER BY id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select patient_id from appointments in January 2024.",
      "INTERSECT select patient_id from appointments in February 2024."
    ],
    "solution_explanation": "Surfaces chronic patients requiring high-frequency monthly clinical follow-ups.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-079",
    "domain": "healthcare",
    "level": 3,
    "order": 79,
    "difficulty": "boss",
    "title": "Unified Hospital Service Catalog (UNION ALL)",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Hospital charge master index: Create a unified price listing of clinical offerings by combining lab tests and medications. Return service name, service category, and unit fee.",
    "context_notes": "UNION ALL combining lab_tests and medications.",
    "concepts": [
      "SELECT",
      "UNION ALL",
      "ORDER BY"
    ],
    "expected_columns": [
      "service_name",
      "service_type",
      "fee"
    ],
    "reference_sql": "SELECT test_name AS service_name, category AS service_type, standard_fee AS fee FROM lab_tests UNION ALL SELECT name AS service_name, dosage_form AS service_type, unit_cost AS fee FROM medications ORDER BY fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select test_name, category, standard_fee from lab_tests.",
      "UNION ALL select name, dosage_form, unit_cost from medications.",
      "Order by fee descending."
    ],
    "solution_explanation": "Consolidates hospital clinical charge master into a single billing reference.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-080",
    "domain": "healthcare",
    "level": 3,
    "order": 80,
    "difficulty": "boss",
    "title": "Completed Visits Lacking Billing Invoices (EXCEPT)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Revenue leakage audit: Find all completed appointment IDs that do NOT exist in the billing table using an EXCEPT query. Return appointment id.",
    "context_notes": "EXCEPT comparing completed appointments with billing appointment_ids.",
    "concepts": [
      "SELECT",
      "EXCEPT",
      "ORDER BY"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id FROM appointments WHERE status = 'completed' EXCEPT SELECT appointment_id AS id FROM billing WHERE appointment_id IS NOT NULL ORDER BY id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select id from appointments WHERE status = 'completed'.",
      "EXCEPT select appointment_id from billing.",
      "Order by id."
    ],
    "solution_explanation": "Critical revenue assurance: detects completed patient visits missing an invoice voucher.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-081",
    "domain": "healthcare",
    "level": 3,
    "order": 81,
    "difficulty": "boss",
    "title": "Cardiology & Primary Care Shared Patients (INTERSECT)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Coordinated care pathways: Identify patients who have had appointments in both the Cardiology department AND the Primary Care department. Return patient id.",
    "context_notes": "INTERSECT comparing patient IDs across Cardiology and Primary Care.",
    "concepts": [
      "SELECT",
      "INTERSECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "patient_id"
    ],
    "reference_sql": "SELECT a.patient_id FROM appointments a JOIN doctors d ON a.doctor_id = d.id JOIN departments dept ON d.department_id = dept.id WHERE dept.name = 'Cardiology' INTERSECT SELECT a2.patient_id FROM appointments a2 JOIN doctors d2 ON a2.doctor_id = d2.id JOIN departments dept2 ON d2.department_id = dept2.id WHERE dept2.name = 'Primary Care' ORDER BY patient_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select patient_id from appointments in Cardiology.",
      "INTERSECT select patient_id from appointments in Primary Care."
    ],
    "solution_explanation": "Tracks referral adherence and shared care between primary care and specialty cardiology.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-082",
    "domain": "healthcare",
    "level": 3,
    "order": 82,
    "difficulty": "boss",
    "title": "Available Critical Care Beds (EXCEPT)",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Emergency surge capacity: Find room numbers of all ICU rooms EXCEPT those that are currently occupied. Return room number.",
    "context_notes": "EXCEPT comparing ICU rooms with occupied ICU rooms.",
    "concepts": [
      "SELECT",
      "EXCEPT",
      "ORDER BY"
    ],
    "expected_columns": [
      "room_number"
    ],
    "reference_sql": "SELECT room_number FROM rooms WHERE room_type = 'ICU' EXCEPT SELECT room_number FROM rooms WHERE room_type = 'ICU' AND is_occupied = TRUE ORDER BY room_number;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select room_number from rooms WHERE room_type = 'ICU'.",
      "EXCEPT select room_number from rooms WHERE room_type = 'ICU' AND is_occupied = TRUE."
    ],
    "solution_explanation": "Identifies immediate available critical care intensive care beds.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-083",
    "domain": "healthcare",
    "level": 3,
    "order": 83,
    "difficulty": "boss",
    "title": "Patients With Abnormal Labs But No Active Diagnosis (EXCEPT)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Unassigned diagnostic workup: Identify patients who have received a HIGH or LOW lab test result EXCEPT those who have a diagnosis recorded in their file. Return patient id.",
    "context_notes": "EXCEPT comparing patients with abnormal lab flags against diagnosed patients.",
    "concepts": [
      "SELECT",
      "EXCEPT",
      "ORDER BY"
    ],
    "expected_columns": [
      "patient_id"
    ],
    "reference_sql": "SELECT DISTINCT patient_id FROM patient_lab_results WHERE flag IN ('HIGH', 'LOW') EXCEPT SELECT DISTINCT patient_id FROM diagnoses ORDER BY patient_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select distinct patient_id with abnormal lab flags.",
      "EXCEPT select distinct patient_id from diagnoses.",
      "Order by patient_id."
    ],
    "solution_explanation": "Highlights patients exhibiting pathology without an established clinical diagnosis.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-084",
    "domain": "healthcare",
    "level": 3,
    "order": 84,
    "difficulty": "boss",
    "title": "Cross-Borough Clinical Encounter Touchpoints (UNION)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Master patient location directory: Combine all distinct patient cities from patients who had appointments with cities of patients who have inpatient billing records. Return city.",
    "context_notes": "UNION of patient cities across appointments and billing.",
    "concepts": [
      "SELECT",
      "UNION",
      "ORDER BY"
    ],
    "expected_columns": [
      "city"
    ],
    "reference_sql": "SELECT DISTINCT p.city FROM patients p JOIN appointments a ON p.id = a.patient_id UNION SELECT DISTINCT p2.city FROM patients p2 JOIN billing b ON p2.id = b.patient_id ORDER BY city;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select distinct city from patients with appointments.",
      "UNION select distinct city from patients with billing records."
    ],
    "solution_explanation": "Surfaces geographic footprint of active outpatient and billing operations.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L3-085",
    "domain": "healthcare",
    "level": 3,
    "order": 85,
    "difficulty": "boss",
    "title": "Doctors Prescribing Both Statins and Beta-Blockers (INTERSECT)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician cardiovascular protocol: Which doctors have prescribed Lipitor (Atorvastatin) AND have also prescribed Plavix (Clopidogrel)? Return doctor id.",
    "context_notes": "INTERSECT comparing doctor IDs for both medications.",
    "concepts": [
      "SELECT",
      "INTERSECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "doctor_id"
    ],
    "reference_sql": "SELECT DISTINCT doctor_id FROM prescriptions WHERE medication_name = 'Lipitor' INTERSECT SELECT DISTINCT doctor_id FROM prescriptions WHERE medication_name = 'Plavix' ORDER BY doctor_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select doctor_id from prescriptions for Lipitor.",
      "INTERSECT select doctor_id from prescriptions for Plavix."
    ],
    "solution_explanation": "Identifies cardiologists adhering to dual anti-platelet and lipid-lowering guidelines.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-086",
    "domain": "healthcare",
    "level": 3,
    "order": 86,
    "difficulty": "boss",
    "title": "Overdue Balance Patients Without Insurance Claims (EXCEPT)",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Pure self-pay collections: Find patient IDs with overdue billing balances EXCEPT those who have had any insurance claim filed on their behalf. Return patient id.",
    "context_notes": "EXCEPT comparing overdue billing patients against insurance claim patients.",
    "concepts": [
      "SELECT",
      "EXCEPT",
      "ORDER BY"
    ],
    "expected_columns": [
      "patient_id"
    ],
    "reference_sql": "SELECT DISTINCT patient_id FROM billing WHERE status = 'overdue' EXCEPT SELECT DISTINCT b.patient_id FROM billing b JOIN insurance_claims ic ON b.id = ic.billing_id ORDER BY patient_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select distinct patient_id from billing WHERE status = overdue.",
      "EXCEPT select distinct patient_id from billing joined to insurance_claims."
    ],
    "solution_explanation": "Targets pure self-pay patients in arrears without insurance adjudication pending.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-087",
    "domain": "healthcare",
    "level": 3,
    "order": 87,
    "difficulty": "boss",
    "title": "Multi-Tier Outlier Charges Across Clinical Diagnoses",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Clinical cost variance: Find billing vouchers whose total charge is strictly higher than the average charge for all patients who share the same ICD-10 diagnosis code. Return billing id, total charge, and diagnosis code.",
    "context_notes": "Subquery joining billing to diagnoses and comparing against correlated average.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "total_charge",
      "icd10_code"
    ],
    "reference_sql": "SELECT b.id, b.total_charge, dg.icd10_code FROM billing b JOIN diagnoses dg ON b.appointment_id = dg.appointment_id WHERE b.total_charge > (SELECT AVG(b2.total_charge) FROM billing b2 JOIN diagnoses dg2 ON b2.appointment_id = dg2.appointment_id WHERE dg2.icd10_code = dg.icd10_code) ORDER BY dg.icd10_code, b.total_charge DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing to diagnoses.",
      "Correlate subquery on icd10_code to calculate diagnosis-specific average charge.",
      "Filter WHERE total_charge > diagnosis average."
    ],
    "solution_explanation": "Identifies high-cost outlier encounters within standardized diagnosis-related groups.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L3-088",
    "domain": "healthcare",
    "level": 3,
    "order": 88,
    "difficulty": "boss",
    "title": "Comprehensive Patient Clinical Journey Audit",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "360-degree patient audit: Find all patients who have completed an appointment, received an ICD-10 diagnosis, been prescribed a medication, and had a lab test performed. Return patient first name, last name, and city.",
    "context_notes": "Quadruple EXISTS verifying clinical lifecycle touchpoints.",
    "concepts": [
      "SELECT",
      "EXISTS",
      "AND"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.city FROM patients p WHERE EXISTS (SELECT 1 FROM appointments a WHERE a.patient_id = p.id AND a.status = 'completed') AND EXISTS (SELECT 1 FROM diagnoses dg WHERE dg.patient_id = p.id) AND EXISTS (SELECT 1 FROM prescriptions pr WHERE pr.patient_id = p.id) AND EXISTS (SELECT 1 FROM patient_lab_results plr WHERE plr.patient_id = p.id) ORDER BY p.last_name, p.first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate 4 separate EXISTS clauses for appointments, diagnoses, prescriptions, and lab results.",
      "Select patient demographic details."
    ],
    "solution_explanation": "Identifies fully engaged patients navigating the comprehensive health system continuum.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L3-089",
    "domain": "healthcare",
    "level": 3,
    "order": 89,
    "difficulty": "boss",
    "title": "Physicians With Zero Completed Encounters (EXCEPT)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician onboarding audit: Find all doctor IDs in our medical staff EXCEPT doctors who have at least one completed appointment. Return doctor id.",
    "context_notes": "EXCEPT comparing all doctors against doctors with completed visits.",
    "concepts": [
      "SELECT",
      "EXCEPT",
      "ORDER BY"
    ],
    "expected_columns": [
      "id"
    ],
    "reference_sql": "SELECT id FROM doctors EXCEPT SELECT DISTINCT doctor_id AS id FROM appointments WHERE status = 'completed' AND doctor_id IS NOT NULL ORDER BY id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select id from doctors.",
      "EXCEPT select distinct doctor_id from appointments WHERE status = completed."
    ],
    "solution_explanation": "Surfaces inactive, newly credentialed, or research-only medical staff.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L3-090",
    "domain": "healthcare",
    "level": 3,
    "order": 90,
    "difficulty": "boss",
    "title": "Payer Claim Settlement Time Outliers",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer lag anomaly: Find insurance claims whose settlement days took more than 1.5 times the average settlement days of all claims in the hospital. Return id, insurance provider, settlement days, and claim amount.",
    "context_notes": "Scalar subquery: settlement_days > 1.5 * (SELECT AVG(settlement_days) FROM insurance_claims).",
    "concepts": [
      "SELECT",
      "SCALAR SUBQUERY",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "insurance_provider",
      "settlement_days",
      "claim_amount"
    ],
    "reference_sql": "SELECT id, insurance_provider, settlement_days, claim_amount FROM insurance_claims WHERE settlement_days > (1.5 * (SELECT AVG(settlement_days) FROM insurance_claims)) ORDER BY settlement_days DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Calculate hospital average settlement days in scalar subquery.",
      "Filter claims exceeding 1.5 times that average."
    ],
    "solution_explanation": "Pinpoints extreme settlement delay outliers requiring executive payer escalation.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-091",
    "domain": "healthcare",
    "level": 3,
    "order": 91,
    "difficulty": "boss",
    "title": "Top Revenue Yielding Specialties Above Hospital Average",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Specialty line profitability: Find medical specialties whose total completed appointment revenue exceeds the average completed revenue generated per specialty. Return specialty and gross revenue.",
    "context_notes": "Subquery with HAVING SUM(a.fee) > (SELECT AVG(rev) FROM (SELECT SUM(a2.fee)...)).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "AVG"
    ],
    "expected_columns": [
      "specialty",
      "gross_revenue"
    ],
    "reference_sql": "SELECT d.specialty, ROUND(SUM(a.fee), 2) AS gross_revenue FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.specialty HAVING SUM(a.fee) > (SELECT AVG(sub.rev) FROM (SELECT SUM(a2.fee) AS rev FROM appointments a2 JOIN doctors d2 ON a2.doctor_id = d2.id WHERE a2.status = 'completed' GROUP BY d2.specialty) sub) ORDER BY gross_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute revenue per specialty.",
      "Compare in HAVING against average revenue across specialties."
    ],
    "solution_explanation": "Highlights marquee clinical service lines driving outpatient financial contribution.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L3-092",
    "domain": "healthcare",
    "level": 3,
    "order": 92,
    "difficulty": "boss",
    "title": "Patients With Inconsistent Blood Pressure Lab & Diagnosis",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Clinical consistency review: Find patients who have been prescribed Zestril (Lisinopril) EXCEPT those who have an Essential Hypertension (I10) diagnosis code. Return patient id.",
    "context_notes": "EXCEPT comparing prescribed patients with diagnosed patients.",
    "concepts": [
      "SELECT",
      "EXCEPT",
      "ORDER BY"
    ],
    "expected_columns": [
      "patient_id"
    ],
    "reference_sql": "SELECT DISTINCT patient_id FROM prescriptions WHERE medication_name = 'Zestril' EXCEPT SELECT DISTINCT patient_id FROM diagnoses WHERE icd10_code = 'I10' ORDER BY patient_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select patient_id prescribed Zestril.",
      "EXCEPT select patient_id diagnosed with I10."
    ],
    "solution_explanation": "Audits off-label prescribing or missing secondary hypertension diagnostic codes.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-093",
    "domain": "healthcare",
    "level": 3,
    "order": 93,
    "difficulty": "boss",
    "title": "Departments With Both Inpatient Rooms And Emergency Consultations",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Acuity infrastructure audit: Find department IDs that have both inpatient rooms assigned AND have doctors who conducted Urgent appointments. Return department id.",
    "context_notes": "INTERSECT comparing room departments with urgent appointment departments.",
    "concepts": [
      "SELECT",
      "INTERSECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_id"
    ],
    "reference_sql": "SELECT DISTINCT department_id FROM rooms INTERSECT SELECT DISTINCT d.department_id FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.appointment_type = 'Urgent' ORDER BY department_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select department_id from rooms.",
      "INTERSECT select department_id from doctors handling Urgent appointments."
    ],
    "solution_explanation": "Surfaces full-service acute clinical units combining inpatient beds and urgent care.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-094",
    "domain": "healthcare",
    "level": 3,
    "order": 94,
    "difficulty": "boss",
    "title": "Patients Having Abnormal Metabolic & Blood Count Labs",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Hematology-biochemistry comorbidity: Find patient IDs who have a HIGH or LOW flag on Complete Blood Count (CBC) AND a HIGH or LOW flag on Comprehensive Metabolic Panel (CMP). Return patient id.",
    "context_notes": "INTERSECT comparing patients with abnormal CBC and CMP results.",
    "concepts": [
      "SELECT",
      "INTERSECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "patient_id"
    ],
    "reference_sql": "SELECT plr.patient_id FROM patient_lab_results plr JOIN lab_tests lt ON plr.test_id = lt.id WHERE lt.test_name = 'Complete Blood Count (CBC)' AND plr.flag IN ('HIGH', 'LOW') INTERSECT SELECT plr2.patient_id FROM patient_lab_results plr2 JOIN lab_tests lt2 ON plr2.test_id = lt2.id WHERE lt2.test_name = 'Comprehensive Metabolic Panel (CMP)' AND plr2.flag IN ('HIGH', 'LOW') ORDER BY patient_id;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select patient_id with abnormal CBC.",
      "INTERSECT select patient_id with abnormal CMP."
    ],
    "solution_explanation": "Clinical risk stratification for multi-organ or systemic pathological dysfunction.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L3-095",
    "domain": "healthcare",
    "level": 3,
    "order": 95,
    "difficulty": "boss",
    "title": "Consolidated Healthcare Encounter Log (UNION ALL)",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Enterprise encounter ledger: Combine all completed appointments and all recorded lab test encounters into a unified chronological log showing patient id, encounter date, and encounter type. Return top 25 records.",
    "context_notes": "UNION ALL combining appointments and patient_lab_results.",
    "concepts": [
      "SELECT",
      "UNION ALL",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "patient_id",
      "encounter_date",
      "encounter_type"
    ],
    "reference_sql": "SELECT patient_id, appointment_date::DATE AS encounter_date, 'Appointment' AS encounter_type FROM appointments WHERE status = 'completed' UNION ALL SELECT patient_id, performed_date AS encounter_date, 'Lab Test' AS encounter_type FROM patient_lab_results ORDER BY encounter_date DESC, patient_id LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select patient_id, appointment_date, 'Appointment' from completed appointments.",
      "UNION ALL select patient_id, performed_date, 'Lab Test' from patient_lab_results.",
      "Order by encounter_date DESC LIMIT 25."
    ],
    "solution_explanation": "Integrates clinical ambulatory visits and diagnostic orders into a single timeline.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-096",
    "domain": "healthcare",
    "level": 3,
    "order": 96,
    "difficulty": "boss",
    "title": "High-Acuity Doctors Treating Multiple Severe Patients",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician acuity load: Find doctors who have treated at least 2 distinct patients diagnosed with Severe conditions. Return doctor name, specialty, and severe patients count.",
    "context_notes": "JOIN doctors to appointments to diagnoses WHERE severity = Severe, GROUP BY doctor HAVING COUNT(DISTINCT patient_id) >= 2.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "COUNT DISTINCT"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "severe_patients_count"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, COUNT(DISTINCT dg.patient_id) AS severe_patients_count FROM doctors d JOIN appointments a ON d.id = a.doctor_id JOIN diagnoses dg ON a.id = dg.appointment_id WHERE dg.severity = 'Severe' GROUP BY d.id, d.name, d.specialty HAVING COUNT(DISTINCT dg.patient_id) >= 2 ORDER BY severe_patients_count DESC, d.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join doctors to appointments to diagnoses with severity = Severe.",
      "Group by doctor and filter HAVING COUNT(DISTINCT dg.patient_id) >= 2."
    ],
    "solution_explanation": "Surfaces physician leaders managing multi-patient high-complexity clinical cohorts.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L3-097",
    "domain": "healthcare",
    "level": 3,
    "order": 97,
    "difficulty": "boss",
    "title": "Billing Records With Overdue Balances Above Median Carrier Average",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Delinquent exposure analysis: Find overdue billing records where the patient balance exceeds the average balance of all overdue records for that patient insurance carrier. Return billing id, insurance provider, and balance.",
    "context_notes": "JOIN billing to patients, correlated subquery comparing patient_balance to carrier average.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "CORRELATED SUBQUERY"
    ],
    "expected_columns": [
      "id",
      "insurance_provider",
      "patient_balance"
    ],
    "reference_sql": "SELECT b.id, p.insurance_provider, b.patient_balance FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.status = 'overdue' AND b.patient_balance > (SELECT AVG(b2.patient_balance) FROM billing b2 JOIN patients p2 ON b2.patient_id = p2.id WHERE b2.status = 'overdue' AND p2.insurance_provider = p.insurance_provider) ORDER BY p.insurance_provider, b.patient_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing to patients with status = overdue.",
      "Correlate subquery on insurance_provider to compute carrier overdue average.",
      "Filter balance exceeding that benchmark."
    ],
    "solution_explanation": "Focuses bad debt write-off evaluations on extreme debtor accounts per payer.",
    "xp": 30,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L3-098",
    "domain": "healthcare",
    "level": 3,
    "order": 98,
    "difficulty": "boss",
    "title": "Top 5 Most Expensive Medications vs Top 5 Lab Tests (UNION ALL)",
    "stakeholder": {
      "name": "Dr. Anthony Clark",
      "role": "Director of Pathology & Lab"
    },
    "request": "Catalog pricing benchmark: Combine the 5 most expensive medications (by unit cost) with the 5 most expensive lab tests (by standard fee). Return item name, category, and fee.",
    "context_notes": "UNION ALL combining two subqueries each limited to 5 records.",
    "concepts": [
      "SELECT",
      "UNION ALL",
      "SUBQUERY",
      "LIMIT"
    ],
    "expected_columns": [
      "item_name",
      "category",
      "fee"
    ],
    "reference_sql": "(SELECT name AS item_name, dosage_form AS category, unit_cost AS fee FROM medications ORDER BY unit_cost DESC LIMIT 5) UNION ALL (SELECT test_name AS item_name, category, standard_fee AS fee FROM lab_tests ORDER BY standard_fee DESC LIMIT 5) ORDER BY fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select top 5 medications by unit_cost.",
      "UNION ALL select top 5 lab tests by standard_fee.",
      "Order combined result by fee descending."
    ],
    "solution_explanation": "Evaluates price ceilings across pharmaceuticals and diagnostic services.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-099",
    "domain": "healthcare",
    "level": 3,
    "order": 99,
    "difficulty": "boss",
    "title": "Chronic Care Coordination: Triple-Payer Inpatient Exposure",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer concentration analysis: Find patients insured by BlueCross, Aetna, or UnitedHealth whose total hospital billed charges exceed $2,500. Return patient first name, last name, insurance, and total charges.",
    "context_notes": "JOIN billing to patients WHERE insurance_provider IN (...) GROUP BY patient HAVING SUM > 2500.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "GROUP BY",
      "HAVING",
      "SUM"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "insurance_provider",
      "total_billed"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.insurance_provider, ROUND(SUM(b.total_charge), 2) AS total_billed FROM billing b JOIN patients p ON b.patient_id = p.id WHERE p.insurance_provider IN ('BlueCross', 'Aetna', 'UnitedHealth') GROUP BY p.id, p.first_name, p.last_name, p.insurance_provider HAVING SUM(b.total_charge) > 2500.00 ORDER BY total_billed DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing to patients.",
      "Filter for top commercial carriers.",
      "Group by patient and filter HAVING total charges > 2500."
    ],
    "solution_explanation": "Identifies high-utilization commercial insurer patient accounts.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L3-100",
    "domain": "healthcare",
    "level": 3,
    "order": 100,
    "difficulty": "boss",
    "title": "Chief Medical Officer Master Clinical Acuity Index",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Executive Board Patient Audit: Rank patients with the highest composite clinical complexity — patients who have attended at least 1 completed visit, have at least 1 severe diagnosis, and have undergone at least 1 lab test with an abnormal flag. Return patient first name, last name, city, and total billed charges across all vouchers.",
    "context_notes": "Complex JOIN spanning patients, appointments, diagnoses, lab results, and billing.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "EXISTS",
      "GROUP BY",
      "SUM"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city",
      "total_hospital_billed"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.city, ROUND(SUM(b.total_charge), 2) AS total_hospital_billed FROM patients p JOIN billing b ON p.id = b.patient_id WHERE EXISTS (SELECT 1 FROM appointments a WHERE a.patient_id = p.id AND a.status = 'completed') AND EXISTS (SELECT 1 FROM diagnoses dg WHERE dg.patient_id = p.id AND dg.severity = 'Severe') AND EXISTS (SELECT 1 FROM patient_lab_results plr WHERE plr.patient_id = p.id AND plr.flag IN ('HIGH', 'LOW')) GROUP BY p.id, p.first_name, p.last_name, p.city ORDER BY total_hospital_billed DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Correlate 3 clinical criteria (completed appointment, severe diagnosis, abnormal lab).",
      "Join with billing to aggregate total hospital charges.",
      "Order by total billed DESC LIMIT 10."
    ],
    "solution_explanation": "Capstone executive patient complexity audit linking high clinical risk to aggregate health system financial charges.",
    "xp": 30,
    "estimated_minutes": 10
  }
];
