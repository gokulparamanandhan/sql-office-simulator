import { QuestionDefinition } from "./ecom-l1-questions";

export const HC_L2_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "hc-L2-001",
    "domain": "healthcare",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Appointments With Doctor Names",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "I need to see our upcoming appointments with the treating physician name — show appointment id, patient id, doctor name, and appointment date.",
    "context_notes": "JOIN appointments with doctors.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "appointment_id",
      "patient_id",
      "doctor_name",
      "appointment_date"
    ],
    "reference_sql": "SELECT a.id AS appointment_id, a.patient_id, d.name AS doctor_name, a.appointment_date FROM appointments a JOIN doctors d ON a.doctor_id = d.id ORDER BY a.appointment_date DESC LIMIT 20;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments a with doctors d on a.doctor_id = d.id.",
      "Select appointment_id, patient_id, doctor_name, appointment_date."
    ],
    "solution_explanation": "Joins appointments to doctors to resolve treating physician names.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-002",
    "domain": "healthcare",
    "level": 2,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Diagnoses Linked to Patient Names",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Pull all clinical diagnoses with the actual patient name — show first name, last name, ICD-10 code, and description.",
    "context_notes": "JOIN diagnoses with patients.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "icd10_code",
      "description"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, dg.icd10_code, dg.description FROM diagnoses dg JOIN patients p ON dg.patient_id = p.id ORDER BY p.last_name, p.first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses dg with patients p on dg.patient_id = p.id.",
      "Return first_name, last_name, icd10_code, description."
    ],
    "solution_explanation": "Links clinical diagnoses directly to patient demographic records.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-003",
    "domain": "healthcare",
    "level": 2,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Prescriptions Issued by Doctor",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Pharmacy dispatch log: show each prescription with the prescribing doctor name — medication name, dosage, and doctor name.",
    "context_notes": "JOIN prescriptions with doctors.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "medication_name",
      "dosage",
      "doctor_name"
    ],
    "reference_sql": "SELECT pr.medication_name, pr.dosage, d.name AS doctor_name FROM prescriptions pr JOIN doctors d ON pr.doctor_id = d.id ORDER BY d.name, pr.medication_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions pr with doctors d on pr.doctor_id = d.id.",
      "Return medication_name, dosage, d.name AS doctor_name."
    ],
    "solution_explanation": "Connects prescribed medications to the authorizing physician.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-004",
    "domain": "healthcare",
    "level": 2,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Billing Invoices With Patient Insurance",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "For accounts receivable reconciliation, show every billing record with the patient insurance carrier: billing id, total charge, and insurance provider.",
    "context_notes": "JOIN billing with patients.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "billing_id",
      "total_charge",
      "insurance_provider",
      "status"
    ],
    "reference_sql": "SELECT b.id AS billing_id, b.total_charge, p.insurance_provider, b.status FROM billing b JOIN patients p ON b.patient_id = p.id ORDER BY b.id ASC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing b with patients p on b.patient_id = p.id.",
      "Select billing_id, total_charge, insurance_provider, status."
    ],
    "solution_explanation": "Links patient billing vouchers to primary health plan payers.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-005",
    "domain": "healthcare",
    "level": 2,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Rooms With Department Names",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "For our facility bed directory, list every hospital room with its actual department name — room number, room type, and department name.",
    "context_notes": "JOIN rooms with departments.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "room_number",
      "room_type",
      "department_name"
    ],
    "reference_sql": "SELECT r.room_number, r.room_type, d.name AS department_name FROM rooms r JOIN departments d ON r.department_id = d.id ORDER BY d.name, r.room_number;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms r with departments d on r.department_id = d.id.",
      "Return room_number, room_type, d.name AS department_name."
    ],
    "solution_explanation": "Maps physical inpatient beds to clinical department names.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-006",
    "domain": "healthcare",
    "level": 2,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Severe Diagnoses With Patient City",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "High-acuity patient tracking: pull all diagnoses marked with Severe severity, showing patient first name, last name, city, and diagnosis description.",
    "context_notes": "JOIN diagnoses with patients WHERE severity = Severe.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city",
      "description"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.city, dg.description FROM diagnoses dg JOIN patients p ON dg.patient_id = p.id WHERE dg.severity = 'Severe' ORDER BY p.city, p.last_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses with patients.",
      "Filter WHERE dg.severity = Severe."
    ],
    "solution_explanation": "Identifies severe clinical disease manifestations across patient communities.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-007",
    "domain": "healthcare",
    "level": 2,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Prescriptions For Brooklyn Residents",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Community health review: show all medications prescribed to patients who live in Brooklyn — patient name, city, and medication name.",
    "context_notes": "JOIN prescriptions with patients WHERE city = Brooklyn.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city",
      "medication_name"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.city, pr.medication_name FROM prescriptions pr JOIN patients p ON pr.patient_id = p.id WHERE p.city = 'Brooklyn' ORDER BY p.last_name, pr.medication_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions with patients.",
      "Filter WHERE p.city = Brooklyn."
    ],
    "solution_explanation": "Tracks pharmaceutical utilization for Brooklyn patient population.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-008",
    "domain": "healthcare",
    "level": 2,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Overdue Patient Balances With Name",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Delinquent collections sheet: list all overdue bills with patient first name, last name, patient balance, and total charge.",
    "context_notes": "JOIN billing with patients WHERE status = overdue.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "patient_balance",
      "total_charge"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, b.patient_balance, b.total_charge FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.status = 'overdue' ORDER BY b.patient_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Filter WHERE b.status = overdue. Order by patient_balance DESC."
    ],
    "solution_explanation": "Compiles collections follow-up roster for overdue balances.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-009",
    "domain": "healthcare",
    "level": 2,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Appointments in Surgery Department",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Show all appointments scheduled with doctors belonging to the Surgery department — appointment id, doctor name, and fee.",
    "context_notes": "3-way JOIN: appointments JOIN doctors JOIN departments WHERE name = Surgery.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "appointment_id",
      "doctor_name",
      "fee"
    ],
    "reference_sql": "SELECT a.id AS appointment_id, d.name AS doctor_name, a.fee FROM appointments a JOIN doctors d ON a.doctor_id = d.id JOIN departments dept ON d.department_id = dept.id WHERE dept.name = 'Surgery' ORDER BY a.appointment_date DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments to doctors to departments.",
      "Filter WHERE dept.name = Surgery."
    ],
    "solution_explanation": "Surfaces outpatient surgical consultation bookings.",
    "xp": 20,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-010",
    "domain": "healthcare",
    "level": 2,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Nurses Working in Cardiology Wing",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "List all registered nurses assigned to the Cardiology department — nurse name, building, floor, and shift.",
    "context_notes": "JOIN nurses with departments WHERE departments.name = Cardiology.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "nurse_name",
      "building",
      "floor",
      "shift"
    ],
    "reference_sql": "SELECT n.name AS nurse_name, d.building, d.floor, n.shift FROM nurses n JOIN departments d ON n.department_id = d.id WHERE d.name = 'Cardiology' ORDER BY n.shift, n.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join nurses n with departments d on n.department_id = d.id.",
      "Filter WHERE d.name = Cardiology."
    ],
    "solution_explanation": "Departmental nursing directory for cardiovascular unit.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-011",
    "domain": "healthcare",
    "level": 2,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Billing Linked to Completed Appointments",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "For daily claims release, show billing id, appointment date, appointment fee, and total billing charge for completed visits.",
    "context_notes": "JOIN billing with appointments WHERE appointments.status = completed.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "billing_id",
      "appointment_date",
      "fee",
      "total_charge"
    ],
    "reference_sql": "SELECT b.id AS billing_id, a.appointment_date, a.fee, b.total_charge FROM billing b JOIN appointments a ON b.appointment_id = a.id WHERE a.status = 'completed' ORDER BY a.appointment_date DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with appointments.",
      "Filter WHERE a.status = completed."
    ],
    "solution_explanation": "Reconciles encounter visit fee with master inpatient/outpatient charge.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-012",
    "domain": "healthcare",
    "level": 2,
    "order": 12,
    "difficulty": "warm-up",
    "title": "Patients Diagnosed With Diabetes Mellitus",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Endocrinology registry: list all patients who have been diagnosed with Type 2 Diabetes Mellitus — first name, last name, and diagnosis date.",
    "context_notes": "JOIN diagnoses with patients WHERE icd10_code = E11.9.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "diagnosis_date"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, dg.diagnosis_date FROM diagnoses dg JOIN patients p ON dg.patient_id = p.id WHERE dg.icd10_code = 'E11.9' ORDER BY dg.diagnosis_date DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses with patients.",
      "Filter WHERE dg.icd10_code = E11.9."
    ],
    "solution_explanation": "Clinical cohort tracking for diabetic disease management.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-013",
    "domain": "healthcare",
    "level": 2,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Prescriptions Allowing Multiple Refills",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Identify maintenance medications: show all prescriptions where refills are strictly greater than 1, with patient name and medication.",
    "context_notes": "JOIN prescriptions with patients WHERE refills > 1.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "medication_name",
      "refills"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, pr.medication_name, pr.refills FROM prescriptions pr JOIN patients p ON pr.patient_id = p.id WHERE pr.refills > 1 ORDER BY pr.refills DESC, p.last_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions with patients.",
      "Filter WHERE pr.refills > 1."
    ],
    "solution_explanation": "Surfaces chronic disease recurring maintenance medications.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-014",
    "domain": "healthcare",
    "level": 2,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Doctor Directory With Department Location",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician directory update: show each doctor name, medical specialty, assigned department name, and building location.",
    "context_notes": "JOIN doctors with departments.",
    "concepts": [
      "SELECT",
      "INNER JOIN"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "department_name",
      "building"
    ],
    "reference_sql": "SELECT doc.name AS doctor_name, doc.specialty, dept.name AS department_name, dept.building FROM doctors doc JOIN departments dept ON doc.department_id = dept.id ORDER BY dept.name, doc.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join doctors with departments.",
      "Select doctor_name, specialty, department_name, building."
    ],
    "solution_explanation": "Hospital-wide physician campus directory.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-015",
    "domain": "healthcare",
    "level": 2,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Zero Copay Patient Invoices",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Find all billing records where the patient copay amount was exactly $0.00 — billing id, patient name, and total charge.",
    "context_notes": "JOIN billing with patients WHERE copay_amount = 0.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "billing_id",
      "first_name",
      "last_name",
      "total_charge"
    ],
    "reference_sql": "SELECT b.id AS billing_id, p.first_name, p.last_name, b.total_charge FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.copay_amount = 0 ORDER BY b.total_charge DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Filter WHERE b.copay_amount = 0."
    ],
    "solution_explanation": "Identifies full coverage waivers or preventative visits with zero copay.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-016",
    "domain": "healthcare",
    "level": 2,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Pediatric Care Appointments",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Show all appointments attended by doctors in the Pediatrics department — appointment id, doctor name, appointment date, and status.",
    "context_notes": "JOIN appointments with doctors WHERE specialty = Pediatrics.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "appointment_id",
      "doctor_name",
      "appointment_date",
      "status"
    ],
    "reference_sql": "SELECT a.id AS appointment_id, d.name AS doctor_name, a.appointment_date, a.status FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE d.specialty = 'Pediatrics' ORDER BY a.appointment_date DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments with doctors.",
      "Filter WHERE d.specialty = Pediatrics."
    ],
    "solution_explanation": "Outpatient pediatric clinic encounter log.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-017",
    "domain": "healthcare",
    "level": 2,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Patients Diagnosed With Essential Hypertension",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Cardiology registry: find all patients diagnosed with Essential Hypertension (ICD-10 I10) — patient name, city, and diagnosis date.",
    "context_notes": "JOIN diagnoses with patients WHERE icd10_code = I10.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city",
      "diagnosis_date"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.city, dg.diagnosis_date FROM diagnoses dg JOIN patients p ON dg.patient_id = p.id WHERE dg.icd10_code = 'I10' ORDER BY dg.diagnosis_date DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses with patients.",
      "Filter WHERE dg.icd10_code = I10."
    ],
    "solution_explanation": "Cardiovascular disease prevalence mapping.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-018",
    "domain": "healthcare",
    "level": 2,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Paid Invoices Over $1500",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Accounts settled report: list all billing records with status paid where total charge exceeded $1,500 — billing id, patient name, and total.",
    "context_notes": "JOIN billing with patients WHERE status = paid AND total_charge > 1500.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "billing_id",
      "first_name",
      "last_name",
      "total_charge"
    ],
    "reference_sql": "SELECT b.id AS billing_id, p.first_name, p.last_name, b.total_charge FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.status = 'paid' AND b.total_charge > 1500.00 ORDER BY b.total_charge DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Filter WHERE b.status = paid AND b.total_charge > 1500."
    ],
    "solution_explanation": "Successfully collected high-dollar inpatient/outpatient claims.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-019",
    "domain": "healthcare",
    "level": 2,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Unoccupied Intensive Care Unit Rooms",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "We have incoming emergency transfers: list all ICU rooms that are currently unoccupied with their room number, floor, and rate.",
    "context_notes": "JOIN rooms with departments WHERE room_type = ICU AND is_occupied = FALSE.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "room_number",
      "floor",
      "daily_rate"
    ],
    "reference_sql": "SELECT r.room_number, d.floor, r.daily_rate FROM rooms r JOIN departments d ON r.department_id = d.id WHERE r.room_type = 'ICU' AND r.is_occupied = FALSE ORDER BY r.room_number;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms with departments.",
      "Filter WHERE room_type = ICU AND is_occupied = FALSE."
    ],
    "solution_explanation": "Critical surge capacity check for trauma bed routing.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-020",
    "domain": "healthcare",
    "level": 2,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Senior Patients With Active Appointments",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Geriatric encounters: show all appointments for patients born before 1960 — patient first name, last name, birth date, and appointment date.",
    "context_notes": "JOIN appointments with patients WHERE dob < 1960-01-01.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "dob",
      "appointment_date"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.dob, a.appointment_date FROM appointments a JOIN patients p ON a.patient_id = p.id WHERE p.dob < '1960-01-01' ORDER BY a.appointment_date DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments with patients.",
      "Filter WHERE p.dob < 1960-01-01."
    ],
    "solution_explanation": "Vulnerable senior outpatient appointment attendance.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-021",
    "domain": "healthcare",
    "level": 2,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Prescriptions for Inhalers or Tablets",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "List all prescriptions where the dosage instructions contain either daily or Inhaler — medication name, dosage, and patient name.",
    "context_notes": "JOIN prescriptions with patients WHERE dosage LIKE %daily%.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "LIKE"
    ],
    "expected_columns": [
      "medication_name",
      "dosage",
      "first_name",
      "last_name"
    ],
    "reference_sql": "SELECT pr.medication_name, pr.dosage, p.first_name, p.last_name FROM prescriptions pr JOIN patients p ON pr.patient_id = p.id WHERE pr.dosage LIKE '%daily%' ORDER BY p.last_name, pr.medication_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions with patients.",
      "Filter WHERE pr.dosage LIKE %daily%."
    ],
    "solution_explanation": "Daily maintenance medication dosing review.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-022",
    "domain": "healthcare",
    "level": 2,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Billing Invoices With High Patient Balance",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Self-pay balance review: pull all billing records where the patient balance owes strictly more than $300 — patient name, balance, and status.",
    "context_notes": "JOIN billing with patients WHERE patient_balance > 300.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "patient_balance",
      "status"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, b.patient_balance, b.status FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.patient_balance > 300.00 ORDER BY b.patient_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Filter WHERE b.patient_balance > 300.00."
    ],
    "solution_explanation": "Identifies patients carrying high out-of-pocket balances.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-023",
    "domain": "healthcare",
    "level": 2,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Mild Severity Diagnoses With Encounter Date",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Routine care diagnoses: show all diagnoses with Mild severity — patient first name, last name, ICD-10 description, and diagnosis date.",
    "context_notes": "JOIN diagnoses with patients WHERE severity = Mild.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "description",
      "diagnosis_date"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, dg.description, dg.diagnosis_date FROM diagnoses dg JOIN patients p ON dg.patient_id = p.id WHERE dg.severity = 'Mild' ORDER BY dg.diagnosis_date DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses with patients.",
      "Filter WHERE dg.severity = Mild."
    ],
    "solution_explanation": "Monitors mild ambulatory disease presentations.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-024",
    "domain": "healthcare",
    "level": 2,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Doctors in Ambulatory Clinic Building",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Who sees patients in the Ambulatory Clinic? List doctor name, specialty, and phone for doctors assigned to that building.",
    "context_notes": "JOIN doctors with departments WHERE building = Ambulatory Clinic.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "phone"
    ],
    "reference_sql": "SELECT doc.name AS doctor_name, doc.specialty, doc.phone FROM doctors doc JOIN departments dept ON doc.department_id = dept.id WHERE dept.building = 'Ambulatory Clinic' ORDER BY doc.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join doctors with departments.",
      "Filter WHERE dept.building = Ambulatory Clinic."
    ],
    "solution_explanation": "Ambulatory primary care building physician directory.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-025",
    "domain": "healthcare",
    "level": 2,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Patient Appointments With BlueCross Insurance",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer visit schedule: list all appointments for BlueCross patients — patient name, insurance, appointment date, and status.",
    "context_notes": "JOIN appointments with patients WHERE insurance_provider = BlueCross.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "insurance_provider",
      "appointment_date",
      "status"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.insurance_provider, a.appointment_date, a.status FROM appointments a JOIN patients p ON a.patient_id = p.id WHERE p.insurance_provider = 'BlueCross' ORDER BY a.appointment_date DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments with patients.",
      "Filter WHERE p.insurance_provider = BlueCross."
    ],
    "solution_explanation": "BlueCross patient appointment volume and status log.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-026",
    "domain": "healthcare",
    "level": 2,
    "order": 26,
    "difficulty": "core",
    "title": "Total Billing Revenue by Insurance Provider",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer financial performance: calculate total billed charges and total insurance covered dollars grouped by patient insurance carrier.",
    "context_notes": "JOIN billing with patients, SUM(total_charge) and SUM(insurance_covered) GROUP BY carrier.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "gross_billed",
      "insurance_paid"
    ],
    "reference_sql": "SELECT p.insurance_provider, ROUND(SUM(b.total_charge), 2) AS gross_billed, ROUND(SUM(b.insurance_covered), 2) AS insurance_paid FROM billing b JOIN patients p ON b.patient_id = p.id GROUP BY p.insurance_provider ORDER BY gross_billed DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Group by p.insurance_provider.",
      "Sum total_charge and insurance_covered."
    ],
    "solution_explanation": "Revenue cycle: evaluates reimbursement volume per payer.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-027",
    "domain": "healthcare",
    "level": 2,
    "order": 27,
    "difficulty": "core",
    "title": "Most Frequent Clinical Diagnoses",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Clinical epidemiology: count how many times each ICD-10 diagnosis has been recorded across all patients, most prevalent first.",
    "context_notes": "GROUP BY icd10_code, description, COUNT(*).",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "icd10_code",
      "description",
      "diagnosis_count"
    ],
    "reference_sql": "SELECT icd10_code, description, COUNT(*) AS diagnosis_count FROM diagnoses GROUP BY icd10_code, description ORDER BY diagnosis_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group diagnoses by icd10_code and description.",
      "Count occurrences."
    ],
    "solution_explanation": "Top morbidity causes across the hospital system.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-028",
    "domain": "healthcare",
    "level": 2,
    "order": 28,
    "difficulty": "core",
    "title": "Appointments Count by Department Name",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Clinic utilization: how many total appointments have been scheduled across each clinical department? Busiest department first.",
    "context_notes": "3-way JOIN: appointments JOIN doctors JOIN departments, GROUP BY dept.name.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "appointment_count"
    ],
    "reference_sql": "SELECT dept.name AS department_name, COUNT(a.id) AS appointment_count FROM appointments a JOIN doctors doc ON a.doctor_id = doc.id JOIN departments dept ON doc.department_id = dept.id GROUP BY dept.name ORDER BY appointment_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments → doctors → departments.",
      "Group by department name and count appointments."
    ],
    "solution_explanation": "Departmental outpatient clinic workload volume.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-029",
    "domain": "healthcare",
    "level": 2,
    "order": 29,
    "difficulty": "core",
    "title": "Total Prescriptions per Physician",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Prescribing habits audit: count total prescriptions issued by each doctor — doctor name, specialty, and total prescriptions written.",
    "context_notes": "JOIN prescriptions with doctors, GROUP BY doctor.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "prescriptions_written"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, COUNT(pr.id) AS prescriptions_written FROM prescriptions pr JOIN doctors d ON pr.doctor_id = d.id GROUP BY d.name, d.specialty ORDER BY prescriptions_written DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions with doctors.",
      "Group by doctor name, specialty and count prescriptions."
    ],
    "solution_explanation": "Physician medication prescribing volume.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-030",
    "domain": "healthcare",
    "level": 2,
    "order": 30,
    "difficulty": "core",
    "title": "Outstanding Patient Balances by Billing Status",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Accounts receivable aging: calculate total patient balance owed grouped by billing status (paid, pending_insurance, overdue).",
    "context_notes": "GROUP BY status on billing, SUM(patient_balance).",
    "concepts": [
      "SELECT",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "total_balance_owed"
    ],
    "reference_sql": "SELECT status, ROUND(SUM(patient_balance), 2) AS total_balance_owed FROM billing GROUP BY status ORDER BY total_balance_owed DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group billing by status.",
      "Sum patient_balance for each status bucket."
    ],
    "solution_explanation": "Quantifies uncollected patient receivables by billing lifecycle stage.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-031",
    "domain": "healthcare",
    "level": 2,
    "order": 31,
    "difficulty": "core",
    "title": "Diagnoses Count by Severity Level",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Acuity distribution: count total diagnoses recorded for each severity level (Mild, Moderate, Severe).",
    "context_notes": "GROUP BY severity on diagnoses.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "severity",
      "case_count"
    ],
    "reference_sql": "SELECT severity, COUNT(*) AS case_count FROM diagnoses GROUP BY severity ORDER BY case_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group diagnoses by severity.",
      "Count cases in each acuity tier."
    ],
    "solution_explanation": "Patient population clinical acuity breakdown.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-032",
    "domain": "healthcare",
    "level": 2,
    "order": 32,
    "difficulty": "core",
    "title": "Average Patient Balance by Insurance Carrier",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Which health plans leave patients with the highest out-of-pocket balance? Carrier name and average patient balance.",
    "context_notes": "JOIN billing with patients, GROUP BY carrier, AVG(patient_balance).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "avg_patient_balance"
    ],
    "reference_sql": "SELECT p.insurance_provider, ROUND(AVG(b.patient_balance), 2) AS avg_patient_balance FROM billing b JOIN patients p ON b.patient_id = p.id GROUP BY p.insurance_provider ORDER BY avg_patient_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Group by insurance_provider and calculate AVG(patient_balance)."
    ],
    "solution_explanation": "Out-of-pocket patient cost sharing across health plans.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-033",
    "domain": "healthcare",
    "level": 2,
    "order": 33,
    "difficulty": "core",
    "title": "Total Inpatient Bed Capacity by Building",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Hospital campus bed allocation: join rooms to departments and compute total bed count in each building.",
    "context_notes": "JOIN rooms with departments, GROUP BY building.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "building",
      "bed_capacity"
    ],
    "reference_sql": "SELECT d.building, COUNT(r.id) AS bed_capacity FROM rooms r JOIN departments d ON r.department_id = d.id GROUP BY d.building ORDER BY bed_capacity DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms with departments.",
      "Group by d.building and count rooms."
    ],
    "solution_explanation": "Campus master facility bed distribution.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-034",
    "domain": "healthcare",
    "level": 2,
    "order": 34,
    "difficulty": "core",
    "title": "Most Prescribed Medication Names",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Hospital formulary review: which medications are most frequently prescribed? Medication name and prescription count.",
    "context_notes": "GROUP BY medication_name on prescriptions.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "medication_name",
      "prescriptions_count"
    ],
    "reference_sql": "SELECT medication_name, COUNT(*) AS prescriptions_count FROM prescriptions GROUP BY medication_name ORDER BY prescriptions_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group prescriptions by medication_name.",
      "Count total prescriptions per drug."
    ],
    "solution_explanation": "Hospital formulary utilization and pharmacy order frequency.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-035",
    "domain": "healthcare",
    "level": 2,
    "order": 35,
    "difficulty": "core",
    "title": "Completed Appointment Revenue by Doctor Specialty",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Specialty service line economics: calculate total completed appointment fees realized by each medical specialty.",
    "context_notes": "JOIN appointments with doctors WHERE status = completed, GROUP BY specialty.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "WHERE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "specialty",
      "realized_revenue"
    ],
    "reference_sql": "SELECT d.specialty, ROUND(SUM(a.fee), 2) AS realized_revenue FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed' GROUP BY d.specialty ORDER BY realized_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments with doctors.",
      "Filter WHERE a.status = completed.",
      "Group by d.specialty and sum fee."
    ],
    "solution_explanation": "Specialty clinic contribution to outpatient top-line revenue.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-036",
    "domain": "healthcare",
    "level": 2,
    "order": 36,
    "difficulty": "core",
    "title": "Patient Count by Diagnosed ICD-10 Condition",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Chronic disease surveillance: how many distinct patients have received each ICD-10 diagnosis code?",
    "context_notes": "GROUP BY icd10_code, description, COUNT(DISTINCT patient_id).",
    "concepts": [
      "SELECT",
      "COUNT DISTINCT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "icd10_code",
      "description",
      "distinct_patients"
    ],
    "reference_sql": "SELECT icd10_code, description, COUNT(DISTINCT patient_id) AS distinct_patients FROM diagnoses GROUP BY icd10_code, description ORDER BY distinct_patients DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group diagnoses by code and description.",
      "Count distinct patient_id values."
    ],
    "solution_explanation": "Unique patient disease prevalence epidemiology.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-037",
    "domain": "healthcare",
    "level": 2,
    "order": 37,
    "difficulty": "core",
    "title": "Total Copay Collected by Insurance Carrier",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Front-desk copay audit: calculate total copay dollars collected from patients under each insurance carrier.",
    "context_notes": "JOIN billing with patients, GROUP BY carrier, SUM(copay_amount).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "total_copays_collected"
    ],
    "reference_sql": "SELECT p.insurance_provider, ROUND(SUM(b.copay_amount), 2) AS total_copays_collected FROM billing b JOIN patients p ON b.patient_id = p.id GROUP BY p.insurance_provider ORDER BY total_copays_collected DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Group by insurance_provider and sum copay_amount."
    ],
    "solution_explanation": "Point-of-service patient copay collections by payer.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-038",
    "domain": "healthcare",
    "level": 2,
    "order": 38,
    "difficulty": "core",
    "title": "Occupied Beds by Clinical Department",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Inpatient unit occupancy: join rooms to departments and count currently occupied beds in each department.",
    "context_notes": "JOIN rooms with departments WHERE is_occupied = TRUE, GROUP BY dept.name.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "WHERE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "occupied_beds"
    ],
    "reference_sql": "SELECT d.name AS department_name, COUNT(r.id) AS occupied_beds FROM rooms r JOIN departments d ON r.department_id = d.id WHERE r.is_occupied = TRUE GROUP BY d.name ORDER BY occupied_beds DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms with departments.",
      "Filter WHERE is_occupied = TRUE.",
      "Group by department name."
    ],
    "solution_explanation": "Active departmental bed census.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-039",
    "domain": "healthcare",
    "level": 2,
    "order": 39,
    "difficulty": "core",
    "title": "Average Completed Appointment Fee by Department",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Calculate average completed encounter fee across each department: department name, completed count, and average fee.",
    "context_notes": "3-way JOIN: appointments JOIN doctors JOIN departments WHERE completed, GROUP BY dept.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "WHERE",
      "GROUP BY"
    ],
    "expected_columns": [
      "department_name",
      "completed_encounters",
      "avg_fee"
    ],
    "reference_sql": "SELECT dept.name AS department_name, COUNT(a.id) AS completed_encounters, ROUND(AVG(a.fee), 2) AS avg_fee FROM appointments a JOIN doctors doc ON a.doctor_id = doc.id JOIN departments dept ON doc.department_id = dept.id WHERE a.status = 'completed' GROUP BY dept.name ORDER BY avg_fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments → doctors → departments.",
      "Filter WHERE a.status = completed.",
      "Compute count and avg fee grouped by department."
    ],
    "solution_explanation": "Fee schedule yield by clinical department.",
    "xp": 25,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-040",
    "domain": "healthcare",
    "level": 2,
    "order": 40,
    "difficulty": "core",
    "title": "Refills Distribution Across Medical Specialties",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Which medical specialties authorize the highest total number of prescription refills? Specialty and total refills.",
    "context_notes": "JOIN prescriptions with doctors, GROUP BY specialty, SUM(refills).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "specialty",
      "total_refills_authorized"
    ],
    "reference_sql": "SELECT d.specialty, SUM(pr.refills) AS total_refills_authorized FROM prescriptions pr JOIN doctors d ON pr.doctor_id = d.id GROUP BY d.specialty ORDER BY total_refills_authorized DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions with doctors.",
      "Group by d.specialty and sum pr.refills."
    ],
    "solution_explanation": "Prescription refill authorization policy audit.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-041",
    "domain": "healthcare",
    "level": 2,
    "order": 41,
    "difficulty": "core",
    "title": "Pending Insurance Claims Dollars by Carrier",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer delay analysis: calculate total insurance covered dollars currently locked in pending_insurance status per carrier.",
    "context_notes": "JOIN billing with patients WHERE status = pending_insurance, GROUP BY carrier.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "WHERE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "pending_insurance_dollars"
    ],
    "reference_sql": "SELECT p.insurance_provider, ROUND(SUM(b.insurance_covered), 2) AS pending_insurance_dollars FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.status = 'pending_insurance' GROUP BY p.insurance_provider ORDER BY pending_insurance_dollars DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Filter WHERE b.status = pending_insurance.",
      "Group by carrier and sum insurance_covered."
    ],
    "solution_explanation": "Accounts receivable aging: payer claims in adjudication pipeline.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-042",
    "domain": "healthcare",
    "level": 2,
    "order": 42,
    "difficulty": "core",
    "title": "Diagnoses Recorded by City of Patient",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Geographic morbidity: count total diagnoses recorded for patients living in each city, highest burden first.",
    "context_notes": "JOIN diagnoses with patients, GROUP BY city.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "city",
      "diagnoses_recorded"
    ],
    "reference_sql": "SELECT p.city, COUNT(dg.id) AS diagnoses_recorded FROM diagnoses dg JOIN patients p ON dg.patient_id = p.id GROUP BY p.city ORDER BY diagnoses_recorded DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses with patients.",
      "Group by patient city and count total diagnoses."
    ],
    "solution_explanation": "Regional disease burden assessment.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-043",
    "domain": "healthcare",
    "level": 2,
    "order": 43,
    "difficulty": "core",
    "title": "Total Potential Daily Revenue by Department Beds",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Inpatient revenue capacity: for each department, sum the daily bed rate of all its assigned rooms.",
    "context_notes": "JOIN rooms with departments, GROUP BY dept.name, SUM(daily_rate).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "daily_bed_revenue_potential"
    ],
    "reference_sql": "SELECT d.name AS department_name, ROUND(SUM(r.daily_rate), 2) AS daily_bed_revenue_potential FROM rooms r JOIN departments d ON r.department_id = d.id GROUP BY d.name ORDER BY daily_bed_revenue_potential DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms with departments.",
      "Group by department name and sum daily_rate."
    ],
    "solution_explanation": "Potential daily revenue contribution from inpatient bed allocations.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-044",
    "domain": "healthcare",
    "level": 2,
    "order": 44,
    "difficulty": "core",
    "title": "Doctors With Both Checkup and Followup Visits",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Identify doctor IDs that have handled at least 3 Checkup appointments and at least 3 Follow-up appointments.",
    "context_notes": "HAVING conditional sums on appointments grouped by doctor_id.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "doctor_id",
      "checkup_count",
      "followup_count"
    ],
    "reference_sql": "SELECT doctor_id, SUM(CASE WHEN appointment_type = 'Checkup' THEN 1 ELSE 0 END) AS checkup_count, SUM(CASE WHEN appointment_type = 'Follow-up' THEN 1 ELSE 0 END) AS followup_count FROM appointments GROUP BY doctor_id HAVING SUM(CASE WHEN appointment_type = 'Checkup' THEN 1 ELSE 0 END) >= 3 AND SUM(CASE WHEN appointment_type = 'Follow-up' THEN 1 ELSE 0 END) >= 3 ORDER BY checkup_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by doctor_id.",
      "Count Checkups and Follow-ups conditionally with CASE WHEN.",
      "Filter HAVING both >= 3."
    ],
    "solution_explanation": "Primary care practice continuity benchmark.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-045",
    "domain": "healthcare",
    "level": 2,
    "order": 45,
    "difficulty": "core",
    "title": "Average Patient Balance for Senior vs Non-Senior Patients",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Do senior patients (born before 1960) owe higher out-of-pocket balances on average than younger patients?",
    "context_notes": "JOIN billing with patients, CASE WHEN on dob with AVG(patient_balance).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "CASE WHEN",
      "GROUP BY"
    ],
    "expected_columns": [
      "patient_cohort",
      "avg_balance_owed"
    ],
    "reference_sql": "SELECT CASE WHEN p.dob < '1960-01-01' THEN 'Senior Patient' ELSE 'Non-Senior Patient' END AS patient_cohort, ROUND(AVG(b.patient_balance), 2) AS avg_balance_owed FROM billing b JOIN patients p ON b.patient_id = p.id GROUP BY CASE WHEN p.dob < '1960-01-01' THEN 'Senior Patient' ELSE 'Non-Senior Patient' END ORDER BY avg_balance_owed DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Group by Senior vs Non-Senior cohort and calculate AVG(patient_balance)."
    ],
    "solution_explanation": "Geriatric financial hardship and medical debt analysis.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-046",
    "domain": "healthcare",
    "level": 2,
    "order": 46,
    "difficulty": "core",
    "title": "Doctors With More Than 5 Completed Encounters",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician productivity: show doctor name, medical specialty, and count of completed appointments for doctors with > 5 completed visits.",
    "context_notes": "JOIN appointments with doctors WHERE status = completed, GROUP BY doctor, HAVING COUNT > 5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "WHERE",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "completed_visits"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, COUNT(a.id) AS completed_visits FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed' GROUP BY d.name, d.specialty HAVING COUNT(a.id) > 5 ORDER BY completed_visits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments with doctors.",
      "Filter WHERE a.status = completed.",
      "Group by doctor and check HAVING COUNT(a.id) > 5."
    ],
    "solution_explanation": "Recognizes highly active clinical providers.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-047",
    "domain": "healthcare",
    "level": 2,
    "order": 47,
    "difficulty": "core",
    "title": "Total Billed Charges by Billing Status",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Portfolio revenue ledger: calculate total gross charges and patient balance owed grouped by billing status.",
    "context_notes": "GROUP BY status on billing with multiple sums.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "invoice_count",
      "total_charge_sum",
      "total_patient_balance"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS invoice_count, ROUND(SUM(total_charge), 2) AS total_charge_sum, ROUND(SUM(patient_balance), 2) AS total_patient_balance FROM billing GROUP BY status ORDER BY total_charge_sum DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group billing by status.",
      "Aggregate invoice count, gross charges, and patient balances."
    ],
    "solution_explanation": "Revenue cycle status ledger.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-048",
    "domain": "healthcare",
    "level": 2,
    "order": 48,
    "difficulty": "core",
    "title": "Patients Prescribed Multiple Distinct Drugs",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Polypharmacy risk audit: find patients who have received prescriptions for at least 2 distinct medications — patient name and drug count.",
    "context_notes": "JOIN prescriptions with patients, GROUP BY patient, HAVING COUNT(DISTINCT medication_name) >= 2.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT DISTINCT",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "distinct_medications"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, COUNT(DISTINCT pr.medication_name) AS distinct_medications FROM prescriptions pr JOIN patients p ON pr.patient_id = p.id GROUP BY p.id, p.first_name, p.last_name HAVING COUNT(DISTINCT pr.medication_name) >= 2 ORDER BY distinct_medications DESC, p.last_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions with patients.",
      "Group by patient and check HAVING COUNT(DISTINCT medication_name) >= 2."
    ],
    "solution_explanation": "Polypharmacy adverse interaction surveillance.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-049",
    "domain": "healthcare",
    "level": 2,
    "order": 49,
    "difficulty": "core",
    "title": "Average Daily Rate for Occupied vs Vacant Beds",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Compare the average daily room rate between occupied beds and currently vacant beds.",
    "context_notes": "GROUP BY is_occupied on rooms, AVG(daily_rate).",
    "concepts": [
      "SELECT",
      "AVG",
      "GROUP BY"
    ],
    "expected_columns": [
      "is_occupied",
      "avg_daily_rate"
    ],
    "reference_sql": "SELECT is_occupied, ROUND(AVG(daily_rate), 2) AS avg_daily_rate FROM rooms GROUP BY is_occupied ORDER BY is_occupied DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group rooms by is_occupied.",
      "Compute average daily rate."
    ],
    "solution_explanation": "Evaluates if premium suites are disproportionately vacant.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-050",
    "domain": "healthcare",
    "level": 2,
    "order": 50,
    "difficulty": "core",
    "title": "Encounter Completion Rate by Department",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Which department achieves the highest appointment completion rate? Department name, total booked, and completed percentage.",
    "context_notes": "3-way JOIN: appointments JOIN doctors JOIN departments, GROUP BY dept.name.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "department_name",
      "total_appointments",
      "completed_count",
      "completion_pct"
    ],
    "reference_sql": "SELECT dept.name AS department_name, COUNT(a.id) AS total_appointments, SUM(CASE WHEN a.status = 'completed' THEN 1 ELSE 0 END) AS completed_count, ROUND((SUM(CASE WHEN a.status = 'completed' THEN 1 ELSE 0 END)::NUMERIC / COUNT(a.id)) * 100, 1) AS completion_pct FROM appointments a JOIN doctors doc ON a.doctor_id = doc.id JOIN departments dept ON doc.department_id = dept.id GROUP BY dept.name ORDER BY completion_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments → doctors → departments.",
      "Compute completion percentage per department."
    ],
    "solution_explanation": "Clinic adherence and scheduling integrity by specialty department.",
    "xp": 30,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L2-051",
    "domain": "healthcare",
    "level": 2,
    "order": 51,
    "difficulty": "challenging",
    "title": "Appointments Without Billing Records",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Revenue leakage audit: find any appointments that have NO corresponding billing record in the billing table.",
    "context_notes": "LEFT JOIN appointments with billing WHERE billing.id IS NULL.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "WHERE",
      "IS NULL"
    ],
    "expected_columns": [
      "appointment_id",
      "appointment_date",
      "fee",
      "status"
    ],
    "reference_sql": "SELECT a.id AS appointment_id, a.appointment_date, a.fee, a.status FROM appointments a LEFT JOIN billing b ON a.id = b.appointment_id WHERE b.id IS NULL ORDER BY a.appointment_date DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Left join appointments a with billing b on a.id = b.appointment_id.",
      "Filter WHERE b.id IS NULL."
    ],
    "solution_explanation": "Detects unbilled clinical encounters that failed to generate an invoice.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-052",
    "domain": "healthcare",
    "level": 2,
    "order": 52,
    "difficulty": "challenging",
    "title": "Doctors Who Have Written Zero Prescriptions",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician prescribing audit: list doctors who have NEVER written a single prescription in our system.",
    "context_notes": "LEFT JOIN doctors with prescriptions WHERE prescriptions.id IS NULL.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "WHERE",
      "IS NULL"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "email"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, d.email FROM doctors d LEFT JOIN prescriptions pr ON d.id = pr.doctor_id WHERE pr.id IS NULL ORDER BY d.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Left join doctors d with prescriptions pr on d.id = pr.doctor_id.",
      "Filter WHERE pr.id IS NULL."
    ],
    "solution_explanation": "Surfaces non-prescribing specialists (e.g. Radiologists, Pathologists).",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-053",
    "domain": "healthcare",
    "level": 2,
    "order": 53,
    "difficulty": "challenging",
    "title": "Patients With Diagnoses but No Prescriptions",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Identify patients who have received a documented clinical diagnosis but have zero prescriptions issued to them.",
    "context_notes": "LEFT JOIN patients with diagnoses and prescriptions.",
    "concepts": [
      "SELECT",
      "DISTINCT",
      "INNER JOIN",
      "LEFT JOIN",
      "WHERE",
      "IS NULL"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city"
    ],
    "reference_sql": "SELECT DISTINCT p.first_name, p.last_name, p.city FROM patients p JOIN diagnoses dg ON p.id = dg.patient_id LEFT JOIN prescriptions pr ON p.id = pr.patient_id WHERE pr.id IS NULL ORDER BY p.last_name, p.first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join patients with diagnoses, left join prescriptions.",
      "Filter WHERE pr.id IS NULL."
    ],
    "solution_explanation": "Care pathway compliance: diagnosed patients without active pharmacotherapy.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-054",
    "domain": "healthcare",
    "level": 2,
    "order": 54,
    "difficulty": "challenging",
    "title": "Departments With Over $5,000 in Total Billed Charges",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Find clinical departments that have generated strictly over $5,000 in gross patient billing charges.",
    "context_notes": "4-way JOIN: departments, doctors, appointments, billing. HAVING SUM > 5000.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "department_name",
      "total_billed"
    ],
    "reference_sql": "SELECT dept.name AS department_name, ROUND(SUM(b.total_charge), 2) AS total_billed FROM departments dept JOIN doctors doc ON dept.id = doc.department_id JOIN appointments a ON doc.id = a.doctor_id JOIN billing b ON a.id = b.appointment_id GROUP BY dept.name HAVING SUM(b.total_charge) > 5000.00 ORDER BY total_billed DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join departments → doctors → appointments → billing.",
      "Group by department name and filter HAVING total charges > 5000."
    ],
    "solution_explanation": "Identifies hospital premier revenue-generating clinical divisions.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L2-055",
    "domain": "healthcare",
    "level": 2,
    "order": 55,
    "difficulty": "challenging",
    "title": "Doctors With 100% Appointment Completion Rate",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician dependability: find doctors who have at least 4 scheduled appointments and maintain a 100% completion rate (zero cancelled/no-shows).",
    "context_notes": "GROUP BY doctor, HAVING COUNT >= 4 AND SUM(cancelled/no-show) = 0.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "completed_appointments"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, COUNT(a.id) AS completed_appointments FROM appointments a JOIN doctors d ON a.doctor_id = d.id GROUP BY d.name, d.specialty HAVING COUNT(a.id) >= 4 AND SUM(CASE WHEN a.status != 'completed' THEN 1 ELSE 0 END) = 0 ORDER BY completed_appointments DESC, d.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments with doctors.",
      "Group by doctor and check HAVING COUNT >= 4 and zero non-completed visits."
    ],
    "solution_explanation": "Recognizes exemplary clinic adherence and attendance.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-056",
    "domain": "healthcare",
    "level": 2,
    "order": 56,
    "difficulty": "challenging",
    "title": "Unoccupied Rooms Value by Department",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "For each department, calculate how many beds are vacant and the uncollected daily revenue resulting from these empty rooms.",
    "context_notes": "JOIN rooms with departments WHERE is_occupied = FALSE, GROUP BY dept.name.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "WHERE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "vacant_rooms",
      "unrealized_daily_revenue"
    ],
    "reference_sql": "SELECT d.name AS department_name, COUNT(r.id) AS vacant_rooms, ROUND(SUM(r.daily_rate), 2) AS unrealized_daily_revenue FROM rooms r JOIN departments d ON r.department_id = d.id WHERE r.is_occupied = FALSE GROUP BY d.name ORDER BY unrealized_daily_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms with departments.",
      "Filter WHERE is_occupied = FALSE.",
      "Compute count and sum of daily rates per department."
    ],
    "solution_explanation": "Departmental inpatient bed vacancy cost analysis.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-057",
    "domain": "healthcare",
    "level": 2,
    "order": 57,
    "difficulty": "challenging",
    "title": "Patients With Overdue Balances Above $200",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Collection agency escalation: find patients with overdue billing records where the patient balance owed exceeds $200.",
    "context_notes": "JOIN billing with patients WHERE status = overdue AND patient_balance > 200.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "insurance_provider",
      "patient_balance",
      "city"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.insurance_provider, b.patient_balance, p.city FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.status = 'overdue' AND b.patient_balance > 200.00 ORDER BY b.patient_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Filter WHERE b.status = overdue AND b.patient_balance > 200."
    ],
    "solution_explanation": "High-priority collections list for past-due self-pay accounts.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-058",
    "domain": "healthcare",
    "level": 2,
    "order": 58,
    "difficulty": "challenging",
    "title": "Diagnoses Breakdown for Diabetic Patients",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Comorbidity check: what other diagnoses have been recorded for patients diagnosed with Type 2 Diabetes (E11.9)?",
    "context_notes": "Subquery matching patient IDs diagnosed with E11.9, GROUP BY diagnosis.",
    "concepts": [
      "SELECT",
      "COUNT",
      "WHERE",
      "IN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "icd10_code",
      "description",
      "patient_case_count"
    ],
    "reference_sql": "SELECT icd10_code, description, COUNT(*) AS patient_case_count FROM diagnoses WHERE patient_id IN (SELECT patient_id FROM diagnoses WHERE icd10_code = 'E11.9') GROUP BY icd10_code, description ORDER BY patient_case_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subquery finds patient_id values with diagnosis E11.9.",
      "Outer query groups all diagnoses for those diabetic patients."
    ],
    "solution_explanation": "Comorbidity epidemiology: tracks conditions co-occurring with diabetes.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L2-059",
    "domain": "healthcare",
    "level": 2,
    "order": 59,
    "difficulty": "challenging",
    "title": "Disproportionate Patient Balances: Patients Balance > 30% of Total Charge",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Find billing records where the patient out-of-pocket balance represents more than 30% of the gross total medical charge.",
    "context_notes": "Filter billing WHERE (patient_balance / total_charge) > 0.30.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "Arithmetic"
    ],
    "expected_columns": [
      "billing_id",
      "first_name",
      "last_name",
      "total_charge",
      "patient_balance",
      "patient_share_pct"
    ],
    "reference_sql": "SELECT b.id AS billing_id, p.first_name, p.last_name, b.total_charge, b.patient_balance, ROUND((b.patient_balance / b.total_charge) * 100, 1) AS patient_share_pct FROM billing b JOIN patients p ON b.patient_id = p.id WHERE (b.patient_balance / b.total_charge) > 0.30 ORDER BY patient_share_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Filter WHERE (patient_balance / total_charge) > 0.30."
    ],
    "solution_explanation": "High-deductible health plan financial toxicity monitor.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-060",
    "domain": "healthcare",
    "level": 2,
    "order": 60,
    "difficulty": "challenging",
    "title": "Doctors With Patients Across at Least 3 Cities",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Regional doctor catchment: find doctors whose patient appointments draw from at least 3 distinct residential cities.",
    "context_notes": "JOIN appointments with doctors and patients, GROUP BY doctor, HAVING COUNT(DISTINCT city) >= 3.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT DISTINCT",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "cities_served"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, COUNT(DISTINCT p.city) AS cities_served FROM appointments a JOIN doctors d ON a.doctor_id = d.id JOIN patients p ON a.patient_id = p.id GROUP BY d.name, d.specialty HAVING COUNT(DISTINCT p.city) >= 3 ORDER BY cities_served DESC, d.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments → doctors and patients.",
      "Group by doctor and check HAVING COUNT(DISTINCT p.city) >= 3."
    ],
    "solution_explanation": "Physician regional draw and specialty reputation spread.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L2-061",
    "domain": "healthcare",
    "level": 2,
    "order": 61,
    "difficulty": "challenging",
    "title": "All Departments With Assigned Doctor Count Including Zero",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Facility governance: list all departments with the count of doctors assigned to them — including departments with zero doctors.",
    "context_notes": "LEFT JOIN departments with doctors, GROUP BY department.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "building",
      "doctor_count"
    ],
    "reference_sql": "SELECT dept.name AS department_name, dept.building, COUNT(doc.id) AS doctor_count FROM departments dept LEFT JOIN doctors doc ON dept.id = doc.department_id GROUP BY dept.name, dept.building ORDER BY doctor_count DESC, dept.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Left join departments with doctors.",
      "Group by department and count doc.id."
    ],
    "solution_explanation": "Validates clinical division medical staffing coverage.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-062",
    "domain": "healthcare",
    "level": 2,
    "order": 62,
    "difficulty": "challenging",
    "title": "Prescriptions Written for Pediatric Patients",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Pediatric pharmacology audit: list all prescriptions issued to patients born in 2006 or later — medication name, dosage, and child name.",
    "context_notes": "JOIN prescriptions with patients WHERE dob >= 2006-01-01.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "medication_name",
      "dosage",
      "first_name",
      "last_name",
      "dob"
    ],
    "reference_sql": "SELECT pr.medication_name, pr.dosage, p.first_name, p.last_name, p.dob FROM prescriptions pr JOIN patients p ON pr.patient_id = p.id WHERE p.dob >= '2006-01-01' ORDER BY p.dob DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions with patients.",
      "Filter WHERE p.dob >= 2006-01-01."
    ],
    "solution_explanation": "Pediatric dosing safety and medication administration tracking.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-063",
    "domain": "healthcare",
    "level": 2,
    "order": 63,
    "difficulty": "challenging",
    "title": "Billing Records Where Insurance Covered Zero Dollars",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Insurance denial or unapplied insurance audit: find all billing records where insurance_covered is exactly $0.00.",
    "context_notes": "JOIN billing with patients WHERE insurance_covered = 0.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "billing_id",
      "first_name",
      "last_name",
      "insurance_provider",
      "total_charge"
    ],
    "reference_sql": "SELECT b.id AS billing_id, p.first_name, p.last_name, p.insurance_provider, b.total_charge FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.insurance_covered = 0.00 ORDER BY b.total_charge DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Filter WHERE b.insurance_covered = 0.00."
    ],
    "solution_explanation": "Spots denied or unapplied commercial insurance claims.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-064",
    "domain": "healthcare",
    "level": 2,
    "order": 64,
    "difficulty": "challenging",
    "title": "Severe Diagnoses Concentration by Department",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Acuity burden by service line: count how many Severe diagnoses have been diagnosed in each department via appointments.",
    "context_notes": "4-way JOIN: diagnoses, appointments, doctors, departments WHERE severity = Severe.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "WHERE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "severe_diagnoses_count"
    ],
    "reference_sql": "SELECT dept.name AS department_name, COUNT(dg.id) AS severe_diagnoses_count FROM diagnoses dg JOIN appointments a ON dg.appointment_id = a.id JOIN doctors doc ON a.doctor_id = doc.id JOIN departments dept ON doc.department_id = dept.id WHERE dg.severity = 'Severe' GROUP BY dept.name ORDER BY severe_diagnoses_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses → appointments → doctors → departments.",
      "Filter WHERE severity = Severe and group by department."
    ],
    "solution_explanation": "High-risk patient acuity concentration across clinical specialties.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L2-065",
    "domain": "healthcare",
    "level": 2,
    "order": 65,
    "difficulty": "challenging",
    "title": "Doctors Generating Above Average Appointment Billing",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Find doctors whose total completed encounter fees exceed the average doctor total completed fees.",
    "context_notes": "JOIN appointments with doctors, HAVING SUM(fee) > subquery average.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "WHERE",
      "GROUP BY",
      "HAVING",
      "Subquery"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "completed_revenue"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, ROUND(SUM(a.fee), 2) AS completed_revenue FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed' GROUP BY d.name, d.specialty HAVING SUM(a.fee) > (SELECT AVG(doc_rev) FROM (SELECT SUM(fee) AS doc_rev FROM appointments WHERE status = 'completed' GROUP BY doctor_id) sub) ORDER BY completed_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter completed appointments.",
      "Group by doctor and check HAVING revenue > subquery average."
    ],
    "solution_explanation": "Identifies star clinician financial contributors.",
    "xp": 35,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L2-066",
    "domain": "healthcare",
    "level": 2,
    "order": 66,
    "difficulty": "challenging",
    "title": "Patients With Both Hypertension and Diabetes Diagnoses",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Cardiometabolic comorbidity: find patients who have been diagnosed with BOTH Hypertension (I10) and Type 2 Diabetes (E11.9).",
    "context_notes": "INTERSECT matching patients with I10 and patients with E11.9.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "INTERSECT"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.city FROM patients p JOIN diagnoses d1 ON p.id = d1.patient_id WHERE d1.icd10_code = 'I10' INTERSECT SELECT p.first_name, p.last_name, p.city FROM patients p JOIN diagnoses d2 ON p.id = d2.patient_id WHERE d2.icd10_code = 'E11.9' ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query patients with I10 INTERSECT patients with E11.9."
    ],
    "solution_explanation": "High-risk chronic cardiometabolic cohort for intensive care management.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L2-067",
    "domain": "healthcare",
    "level": 2,
    "order": 67,
    "difficulty": "challenging",
    "title": "Inpatient Capacity by Floor Across All Wings",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Floor by floor bed allotment: join rooms to departments and compute total rooms and occupied rooms by building floor.",
    "context_notes": "JOIN rooms with departments, GROUP BY floor.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "floor",
      "total_beds",
      "occupied_beds"
    ],
    "reference_sql": "SELECT d.floor, COUNT(r.id) AS total_beds, SUM(CASE WHEN r.is_occupied = TRUE THEN 1 ELSE 0 END) AS occupied_beds FROM rooms r JOIN departments d ON r.department_id = d.id GROUP BY d.floor ORDER BY d.floor ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms with departments.",
      "Group by floor and compute total beds and occupied beds."
    ],
    "solution_explanation": "Vertical floor hospital bed census.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-068",
    "domain": "healthcare",
    "level": 2,
    "order": 68,
    "difficulty": "challenging",
    "title": "Doctors Prescribing Atorvastatin or Lisinopril",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Cardiovascular pharmacology: list all doctors who have prescribed either Lipitor (Atorvastatin) or Zestril (Lisinopril).",
    "context_notes": "JOIN prescriptions with doctors WHERE medication_name LIKE %Atorvastatin% OR %Lisinopril%.",
    "concepts": [
      "SELECT",
      "DISTINCT",
      "INNER JOIN",
      "WHERE",
      "LIKE"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "phone"
    ],
    "reference_sql": "SELECT DISTINCT d.name AS doctor_name, d.specialty, d.phone FROM prescriptions pr JOIN doctors d ON pr.doctor_id = d.id WHERE pr.medication_name LIKE '%Atorvastatin%' OR pr.medication_name LIKE '%Lisinopril%' ORDER BY d.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions with doctors.",
      "Filter WHERE medication_name LIKE %Atorvastatin% OR %Lisinopril%."
    ],
    "solution_explanation": "Physicians actively managing cardiovascular lipid and blood pressure regimens.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-069",
    "domain": "healthcare",
    "level": 2,
    "order": 69,
    "difficulty": "challenging",
    "title": "Billing Collection Rate by Payer",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Net collection ratio: calculate the percentage of total billed charges actually settled (status paid) for each insurance provider.",
    "context_notes": "JOIN billing with patients, SUM(CASE WHEN paid) / SUM(total_charge) * 100.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "CASE WHEN",
      "Arithmetic",
      "GROUP BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "gross_billed",
      "paid_billed",
      "collection_rate_pct"
    ],
    "reference_sql": "SELECT p.insurance_provider, ROUND(SUM(b.total_charge), 2) AS gross_billed, ROUND(SUM(CASE WHEN b.status = 'paid' THEN b.total_charge ELSE 0 END), 2) AS paid_billed, ROUND((SUM(CASE WHEN b.status = 'paid' THEN b.total_charge ELSE 0 END) / SUM(b.total_charge)) * 100, 1) AS collection_rate_pct FROM billing b JOIN patients p ON b.patient_id = p.id GROUP BY p.insurance_provider ORDER BY collection_rate_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Compute paid charges over gross charges as collection rate %."
    ],
    "solution_explanation": "Payer contract realization and cash conversion efficiency.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L2-070",
    "domain": "healthcare",
    "level": 2,
    "order": 70,
    "difficulty": "challenging",
    "title": "Completed Encounters With Both Diagnosis and Prescription",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Comprehensive outpatient visits: find appointment IDs that have BOTH a clinical diagnosis AND a pharmacy prescription recorded.",
    "context_notes": "INTERSECT appointment IDs from diagnoses and prescriptions.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "INTERSECT"
    ],
    "expected_columns": [
      "appointment_id"
    ],
    "reference_sql": "SELECT a.id AS appointment_id FROM appointments a JOIN diagnoses dg ON a.id = dg.appointment_id WHERE a.status = 'completed' INTERSECT SELECT a.id AS appointment_id FROM appointments a JOIN prescriptions pr ON a.id = pr.appointment_id WHERE a.status = 'completed' ORDER BY appointment_id;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query completed appointments with diagnosis INTERSECT completed appointments with prescription."
    ],
    "solution_explanation": "Tracks full-cycle outpatient clinical encounters.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L2-071",
    "domain": "healthcare",
    "level": 2,
    "order": 71,
    "difficulty": "challenging",
    "title": "Average Patient Copay Across Specialties",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Which medical specialties require the highest patient copay on average? Specialty, bill count, and avg copay amount.",
    "context_notes": "3-way JOIN: billing JOIN appointments JOIN doctors, GROUP BY specialty.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "specialty",
      "invoice_count",
      "avg_copay"
    ],
    "reference_sql": "SELECT doc.specialty, COUNT(b.id) AS invoice_count, ROUND(AVG(b.copay_amount), 2) AS avg_copay FROM billing b JOIN appointments a ON b.appointment_id = a.id JOIN doctors doc ON a.doctor_id = doc.id GROUP BY doc.specialty ORDER BY avg_copay DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing → appointments → doctors.",
      "Group by specialty and compute invoice count and avg copay."
    ],
    "solution_explanation": "Outpatient specialty copay burden across clinical lines.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-072",
    "domain": "healthcare",
    "level": 2,
    "order": 72,
    "difficulty": "challenging",
    "title": "Nurses Working Day Shifts in West Pavilion",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Floor staffing: list all registered nurses assigned to departments located in the West Pavilion working Day shift.",
    "context_notes": "JOIN nurses with departments WHERE building = West Pavilion AND shift = Day.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "nurse_name",
      "department_name",
      "certification_level"
    ],
    "reference_sql": "SELECT n.name AS nurse_name, d.name AS department_name, n.certification_level FROM nurses n JOIN departments d ON n.department_id = d.id WHERE d.building = 'West Pavilion' AND n.shift = 'Day' ORDER BY n.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join nurses with departments.",
      "Filter WHERE building = West Pavilion AND shift = Day."
    ],
    "solution_explanation": "West Pavilion daytime clinical nursing deployment.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L2-073",
    "domain": "healthcare",
    "level": 2,
    "order": 73,
    "difficulty": "challenging",
    "title": "High Cost Inpatient Rooms With Dedicated Department Heads",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "List rooms with daily rate >= $1,200 showing room number, room type, rate, and the department name.",
    "context_notes": "JOIN rooms with departments WHERE daily_rate >= 1200.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE"
    ],
    "expected_columns": [
      "room_number",
      "room_type",
      "daily_rate",
      "department_name"
    ],
    "reference_sql": "SELECT r.room_number, r.room_type, r.daily_rate, d.name AS department_name FROM rooms r JOIN departments d ON r.department_id = d.id WHERE r.daily_rate >= 1200.00 ORDER BY r.daily_rate DESC, r.room_number;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms with departments.",
      "Filter WHERE daily_rate >= 1200.00."
    ],
    "solution_explanation": "High-acuity room inventory linked to responsible clinical department.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-074",
    "domain": "healthcare",
    "level": 2,
    "order": 74,
    "difficulty": "challenging",
    "title": "Doctors With Highest Patient Diversity",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician panel breadth: calculate the count of distinct patients treated by each doctor, returning top 5 doctors.",
    "context_notes": "JOIN appointments with doctors, GROUP BY doctor, COUNT(DISTINCT patient_id) LIMIT 5.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT DISTINCT",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "unique_patients_treated"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, COUNT(DISTINCT a.patient_id) AS unique_patients_treated FROM appointments a JOIN doctors d ON a.doctor_id = d.id GROUP BY d.name, d.specialty ORDER BY unique_patients_treated DESC, d.name LIMIT 5;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments with doctors.",
      "Group by doctor and count distinct patient_id."
    ],
    "solution_explanation": "Broadest clinical reach and physician panel size.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-075",
    "domain": "healthcare",
    "level": 2,
    "order": 75,
    "difficulty": "challenging",
    "title": "Reconciliation of Appointment Fees Against Total Billed Charges",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "For each billing invoice, compare the scheduled appointment fee with the total billing charge and calculate the billing uplift.",
    "context_notes": "JOIN billing with appointments, compute total_charge - fee.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "Arithmetic",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "billing_id",
      "appointment_date",
      "fee",
      "total_charge",
      "billing_uplift"
    ],
    "reference_sql": "SELECT b.id AS billing_id, a.appointment_date, a.fee, b.total_charge, ROUND(b.total_charge - a.fee, 2) AS billing_uplift FROM billing b JOIN appointments a ON b.appointment_id = a.id ORDER BY billing_uplift DESC LIMIT 20;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with appointments.",
      "Compute total_charge - a.fee as billing_uplift."
    ],
    "solution_explanation": "Measures ancillary facility, medication, and supply billing add-ons over base fee.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-076",
    "domain": "healthcare",
    "level": 2,
    "order": 76,
    "difficulty": "boss",
    "title": "Master Revenue Cycle Statement: Claims, Copays, and Balances",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Consolidated revenue ledger: total invoices, gross charges billed, total copays collected, insurance covered dollars, and total patient balances.",
    "context_notes": "Aggregate all monetary streams in the billing table.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "Arithmetic"
    ],
    "expected_columns": [
      "total_invoices",
      "gross_charges_billed",
      "total_copays_collected",
      "total_insurance_covered",
      "total_patient_balances_owed"
    ],
    "reference_sql": "SELECT COUNT(*) AS total_invoices, ROUND(SUM(total_charge), 2) AS gross_charges_billed, ROUND(SUM(copay_amount), 2) AS total_copays_collected, ROUND(SUM(insurance_covered), 2) AS total_insurance_covered, ROUND(SUM(patient_balance), 2) AS total_patient_balances_owed FROM billing;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Full-table aggregate on billing synthesizing all revenue cycle streams."
    ],
    "solution_explanation": "The definitive hospital accounts receivable financial summary statement.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L2-077",
    "domain": "healthcare",
    "level": 2,
    "order": 77,
    "difficulty": "boss",
    "title": "Departmental Productivity & Revenue Scorecard",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Comprehensive department scorecard: department name, doctor count, total appointments booked, and total completed revenue.",
    "context_notes": "Multi-table JOIN: departments, doctors, appointments with conditional aggregates.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "COUNT DISTINCT",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "building",
      "doctor_count",
      "total_appointments",
      "completed_revenue"
    ],
    "reference_sql": "SELECT dept.name AS department_name, dept.building, COUNT(DISTINCT doc.id) AS doctor_count, COUNT(DISTINCT a.id) AS total_appointments, ROUND(COALESCE(SUM(CASE WHEN a.status = 'completed' THEN a.fee ELSE 0 END), 0), 2) AS completed_revenue FROM departments dept LEFT JOIN doctors doc ON dept.id = doc.department_id LEFT JOIN appointments a ON doc.id = a.doctor_id GROUP BY dept.name, dept.building ORDER BY completed_revenue DESC;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Consolidates departments, doctors, and appointments into productivity scorecard."
    ],
    "solution_explanation": "Departmental clinical productivity and revenue contribution matrix.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L2-078",
    "domain": "healthcare",
    "level": 2,
    "order": 78,
    "difficulty": "boss",
    "title": "Payer Performance Scorecard: Volume, Claims, and Bad Debt Exposure",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer performance matrix: insurance carrier, patient count, total charges billed, insurance paid dollars, and overdue debt balance.",
    "context_notes": "JOIN patients with billing, conditional SUMs grouped by insurance provider.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT DISTINCT",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "patient_count",
      "gross_charges",
      "insurance_paid",
      "overdue_debt"
    ],
    "reference_sql": "SELECT p.insurance_provider, COUNT(DISTINCT p.id) AS patient_count, ROUND(SUM(b.total_charge), 2) AS gross_charges, ROUND(SUM(b.insurance_covered), 2) AS insurance_paid, ROUND(SUM(CASE WHEN b.status = 'overdue' THEN b.patient_balance ELSE 0 END), 2) AS overdue_debt FROM patients p JOIN billing b ON p.id = b.patient_id GROUP BY p.insurance_provider ORDER BY gross_charges DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join patients with billing.",
      "Compute patient count, charges, paid insurance, and overdue balance per carrier."
    ],
    "solution_explanation": "Commercial payer scorecard: profitability vs bad debt exposure.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L2-079",
    "domain": "healthcare",
    "level": 2,
    "order": 79,
    "difficulty": "boss",
    "title": "Physician Clinical & Prescribing Excellence Dashboard",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "For each doctor: name, specialty, completed visits, total appointment revenue, and total prescriptions written.",
    "context_notes": "LEFT JOIN doctors with appointments and prescriptions.",
    "concepts": [
      "SELECT",
      "LEFT JOIN",
      "COUNT DISTINCT",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "completed_visits",
      "realized_revenue",
      "prescriptions_count"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, COUNT(DISTINCT CASE WHEN a.status = 'completed' THEN a.id END) AS completed_visits, ROUND(COALESCE(SUM(CASE WHEN a.status = 'completed' THEN a.fee ELSE 0 END), 0), 2) AS realized_revenue, COUNT(DISTINCT pr.id) AS prescriptions_count FROM doctors d LEFT JOIN appointments a ON d.id = a.doctor_id LEFT JOIN prescriptions pr ON d.id = pr.doctor_id GROUP BY d.id, d.name, d.specialty ORDER BY realized_revenue DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join doctors with appointments and prescriptions.",
      "Compute completed visits, revenue, and prescription volume per doctor."
    ],
    "solution_explanation": "Individual physician clinical and pharmacology productivity dashboard.",
    "xp": 45,
    "estimated_minutes": 12
  },
  {
    "id": "hc-L2-080",
    "domain": "healthcare",
    "level": 2,
    "order": 80,
    "difficulty": "boss",
    "title": "Inpatient Bed Utilization & Daily Capacity Yield Matrix",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Hospital bed yield by department: department name, total beds, occupied beds, occupancy %, and active daily revenue.",
    "context_notes": "JOIN departments with rooms, multiple aggregates.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "total_beds",
      "occupied_beds",
      "occupancy_pct",
      "active_daily_revenue"
    ],
    "reference_sql": "SELECT d.name AS department_name, COUNT(r.id) AS total_beds, SUM(CASE WHEN r.is_occupied = TRUE THEN 1 ELSE 0 END) AS occupied_beds, ROUND((SUM(CASE WHEN r.is_occupied = TRUE THEN 1 ELSE 0 END)::NUMERIC / COUNT(r.id)) * 100, 1) AS occupancy_pct, ROUND(SUM(CASE WHEN r.is_occupied = TRUE THEN r.daily_rate ELSE 0 END), 2) AS active_daily_revenue FROM departments d JOIN rooms r ON d.id = r.department_id GROUP BY d.name ORDER BY occupancy_pct DESC, active_daily_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join departments with rooms.",
      "Compute total beds, occupied beds, occupancy %, and revenue."
    ],
    "solution_explanation": "Bed allocation yield and hospital census optimization.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "hc-L2-081",
    "domain": "healthcare",
    "level": 2,
    "order": 81,
    "difficulty": "boss",
    "title": "Chronic Disease Care Gap: Hypertension Patients Without Medications",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Quality assurance care gap: identify patients diagnosed with Hypertension (I10) who have ZERO prescriptions on file.",
    "context_notes": "Patients with diagnosis I10 LEFT JOIN prescriptions WHERE prescriptions.id IS NULL.",
    "concepts": [
      "SELECT",
      "DISTINCT",
      "INNER JOIN",
      "LEFT JOIN",
      "WHERE",
      "IS NULL"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city",
      "insurance_provider"
    ],
    "reference_sql": "SELECT DISTINCT p.first_name, p.last_name, p.city, p.insurance_provider FROM patients p JOIN diagnoses dg ON p.id = dg.patient_id LEFT JOIN prescriptions pr ON p.id = pr.patient_id WHERE dg.icd10_code = 'I10' AND pr.id IS NULL ORDER BY p.last_name, p.first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients diagnosed with I10.",
      "Left join prescriptions and filter WHERE pr.id IS NULL."
    ],
    "solution_explanation": "Clinical quality measure (HEDIS): hypertension care gap outreach.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L2-082",
    "domain": "healthcare",
    "level": 2,
    "order": 82,
    "difficulty": "boss",
    "title": "Overdue Billing Exposure by Clinical Specialty",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Which medical specialties carry the highest total volume of overdue patient debt? Specialty, overdue invoices, and debt total.",
    "context_notes": "3-way JOIN: billing JOIN appointments JOIN doctors WHERE status = overdue, GROUP BY specialty.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "WHERE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "specialty",
      "overdue_invoices_count",
      "overdue_debt_total"
    ],
    "reference_sql": "SELECT doc.specialty, COUNT(b.id) AS overdue_invoices_count, ROUND(SUM(b.patient_balance), 2) AS overdue_debt_total FROM billing b JOIN appointments a ON b.appointment_id = a.id JOIN doctors doc ON a.doctor_id = doc.id WHERE b.status = 'overdue' GROUP BY doc.specialty ORDER BY overdue_debt_total DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing → appointments → doctors.",
      "Filter WHERE b.status = overdue.",
      "Group by specialty and compute overdue debt volume."
    ],
    "solution_explanation": "Identifies clinical departments with bad-debt vulnerability.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L2-083",
    "domain": "healthcare",
    "level": 2,
    "order": 83,
    "difficulty": "boss",
    "title": "Comorbidity Matrix: Patient Burden Count Across Multiple ICD-10 Codes",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Identify complex multimorbid patients: find patients who have received 2 or more distinct ICD-10 diagnoses.",
    "context_notes": "JOIN diagnoses with patients, GROUP BY patient, HAVING COUNT(DISTINCT code) >= 2.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT DISTINCT",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city",
      "distinct_conditions_count"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.city, COUNT(DISTINCT dg.icd10_code) AS distinct_conditions_count FROM diagnoses dg JOIN patients p ON dg.patient_id = p.id GROUP BY p.id, p.first_name, p.last_name, p.city HAVING COUNT(DISTINCT dg.icd10_code) >= 2 ORDER BY distinct_conditions_count DESC, p.last_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses with patients.",
      "Group by patient and filter HAVING COUNT(DISTINCT icd10_code) >= 2."
    ],
    "solution_explanation": "High-need high-cost multimorbid patient identification.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L2-084",
    "domain": "healthcare",
    "level": 2,
    "order": 84,
    "difficulty": "boss",
    "title": "Nursing Staff to Inpatient Bed Ratio by Department",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Clinical safety ratio: for each department, calculate nurse headcount, total inpatient beds, and the nurse-to-bed ratio.",
    "context_notes": "Join departments with nurses and rooms counts via subqueries.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "building",
      "nurse_headcount",
      "total_beds",
      "nurses_per_bed"
    ],
    "reference_sql": "SELECT d.name AS department_name, d.building, (SELECT COUNT(*) FROM nurses n WHERE n.department_id = d.id) AS nurse_headcount, COUNT(r.id) AS total_beds, ROUND((SELECT COUNT(*) FROM nurses n WHERE n.department_id = d.id)::NUMERIC / NULLIF(COUNT(r.id), 0), 2) AS nurses_per_bed FROM departments d LEFT JOIN rooms r ON d.id = r.department_id GROUP BY d.id, d.name, d.building ORDER BY nurses_per_bed DESC NULLS LAST;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute nurse count and room count per department.",
      "Calculate nurses_per_bed ratio."
    ],
    "solution_explanation": "Mandatory state nursing-to-patient staffing ratio audit.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "hc-L2-085",
    "domain": "healthcare",
    "level": 2,
    "order": 85,
    "difficulty": "boss",
    "title": "Top 3 Highest Paid Doctors by Encounter Revenue Realization",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Rank doctors by total realized consultation revenue from completed visits, returning the top 3 doctors with name and specialty.",
    "context_notes": "JOIN appointments with doctors WHERE status = completed, GROUP BY doctor LIMIT 3.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "WHERE",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "completed_revenue"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, ROUND(SUM(a.fee), 2) AS completed_revenue FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed' GROUP BY d.name, d.specialty ORDER BY completed_revenue DESC LIMIT 3;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments with doctors.",
      "Filter completed visits and return top 3 billing clinicians."
    ],
    "solution_explanation": "Podium ranking of top clinical revenue producers.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-086",
    "domain": "healthcare",
    "level": 2,
    "order": 86,
    "difficulty": "boss",
    "title": "Inpatient Occupancy vs Potential Lost Revenue by Wing",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "For each hospital building: total beds, occupied beds, vacant beds, and daily vacant bed dollar loss.",
    "context_notes": "JOIN rooms with departments, GROUP BY building with conditional aggregates.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "building",
      "total_beds",
      "occupied_beds",
      "vacant_beds",
      "daily_vacancy_loss"
    ],
    "reference_sql": "SELECT d.building, COUNT(r.id) AS total_beds, SUM(CASE WHEN r.is_occupied = TRUE THEN 1 ELSE 0 END) AS occupied_beds, SUM(CASE WHEN r.is_occupied = FALSE THEN 1 ELSE 0 END) AS vacant_beds, ROUND(SUM(CASE WHEN r.is_occupied = FALSE THEN r.daily_rate ELSE 0 END), 2) AS daily_vacancy_loss FROM rooms r JOIN departments d ON r.department_id = d.id GROUP BY d.building ORDER BY daily_vacancy_loss DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms with departments.",
      "Group by building and compute bed occupancy and vacancy dollar loss."
    ],
    "solution_explanation": "Campus-level facility utilization and revenue leakage.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L2-087",
    "domain": "healthcare",
    "level": 2,
    "order": 87,
    "difficulty": "boss",
    "title": "Polypharmacy Audit: Patients With 3+ Active Prescriptions",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Geriatric polypharmacy: find senior patients (dob < 1965) who have been prescribed 3 or more total prescriptions.",
    "context_notes": "JOIN prescriptions with patients WHERE dob < 1965-01-01, GROUP BY patient, HAVING COUNT >= 3.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "WHERE",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "dob",
      "prescription_count"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, p.dob, COUNT(pr.id) AS prescription_count FROM prescriptions pr JOIN patients p ON pr.patient_id = p.id WHERE p.dob < '1965-01-01' GROUP BY p.id, p.first_name, p.last_name, p.dob HAVING COUNT(pr.id) >= 3 ORDER BY prescription_count DESC, p.last_name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions with patients.",
      "Filter senior patients and check HAVING COUNT >= 3."
    ],
    "solution_explanation": "High-priority patient list for clinical pharmacist drug regimen review.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L2-088",
    "domain": "healthcare",
    "level": 2,
    "order": 88,
    "difficulty": "boss",
    "title": "Net Collection Percentage by Billing Status Category",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "For each billing status, compute total charge, insurance covered, copay collected, and patient balance owed side-by-side.",
    "context_notes": "GROUP BY status on billing with all 4 component sums.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "invoice_count",
      "total_charge_sum",
      "insurance_sum",
      "copay_sum",
      "balance_sum"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS invoice_count, ROUND(SUM(total_charge), 2) AS total_charge_sum, ROUND(SUM(insurance_covered), 2) AS insurance_sum, ROUND(SUM(copay_amount), 2) AS copay_sum, ROUND(SUM(patient_balance), 2) AS balance_sum FROM billing GROUP BY status ORDER BY total_charge_sum DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group billing by status.",
      "Aggregate gross charge, insurance portion, copay, and balance."
    ],
    "solution_explanation": "Full four-tier accounts receivable balance sheet reconciliation.",
    "xp": 40,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L2-089",
    "domain": "healthcare",
    "level": 2,
    "order": 89,
    "difficulty": "boss",
    "title": "Doctors With Mixed Case Mix: Diagnoses Across 3+ Different ICD Codes",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Physician case mix breadth: find doctors who have recorded diagnoses across at least 3 distinct ICD-10 codes.",
    "context_notes": "JOIN appointments with diagnoses and doctors, GROUP BY doctor, HAVING COUNT(DISTINCT code) >= 3.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT DISTINCT",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "doctor_name",
      "specialty",
      "distinct_icd_codes"
    ],
    "reference_sql": "SELECT d.name AS doctor_name, d.specialty, COUNT(DISTINCT dg.icd10_code) AS distinct_icd_codes FROM diagnoses dg JOIN appointments a ON dg.appointment_id = a.id JOIN doctors d ON a.doctor_id = d.id GROUP BY d.name, d.specialty HAVING COUNT(DISTINCT dg.icd10_code) >= 3 ORDER BY distinct_icd_codes DESC, d.name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses → appointments → doctors.",
      "Group by doctor and filter HAVING COUNT(DISTINCT icd10_code) >= 3."
    ],
    "solution_explanation": "Measures clinician case-mix complexity and diagnostic variety.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L2-090",
    "domain": "healthcare",
    "level": 2,
    "order": 90,
    "difficulty": "boss",
    "title": "Average Bed Rate Comparison by Clinical Department",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Hospital pricing equity: compare average daily bed rates across clinical departments, ranking from highest to lowest.",
    "context_notes": "JOIN rooms with departments, GROUP BY dept.name, AVG(daily_rate).",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "AVG",
      "MIN",
      "MAX",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "building",
      "avg_daily_rate",
      "min_rate",
      "max_rate"
    ],
    "reference_sql": "SELECT d.name AS department_name, d.building, ROUND(AVG(r.daily_rate), 2) AS avg_daily_rate, MIN(r.daily_rate) AS min_rate, MAX(r.daily_rate) AS max_rate FROM rooms r JOIN departments d ON r.department_id = d.id GROUP BY d.name, d.building ORDER BY avg_daily_rate DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join rooms with departments.",
      "Compute avg, min, and max daily room rate per department."
    ],
    "solution_explanation": "Clinical department room fee tiering analysis.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-091",
    "domain": "healthcare",
    "level": 2,
    "order": 91,
    "difficulty": "boss",
    "title": "Uncollected Insurance Recovery Opportunities",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Identify all pending_insurance billing records where the uncollected insurance portion is strictly greater than $1,000.",
    "context_notes": "JOIN billing with patients WHERE status = pending_insurance AND insurance_covered > 1000.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "billing_id",
      "first_name",
      "last_name",
      "insurance_provider",
      "insurance_covered"
    ],
    "reference_sql": "SELECT b.id AS billing_id, p.first_name, p.last_name, p.insurance_provider, b.insurance_covered FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.status = 'pending_insurance' AND b.insurance_covered > 1000.00 ORDER BY b.insurance_covered DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Filter WHERE status = pending_insurance AND insurance_covered > 1000."
    ],
    "solution_explanation": "Targets high-dollar insurance claims for expedited payer resolution.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-092",
    "domain": "healthcare",
    "level": 2,
    "order": 92,
    "difficulty": "boss",
    "title": "Diagnostic Prevalence in Senior vs Non-Senior Patients",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Compare frequency of Type 2 Diabetes (E11.9) between senior patients (<1960) and non-seniors.",
    "context_notes": "JOIN diagnoses with patients WHERE icd10_code = E11.9, CASE WHEN on dob.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "CASE WHEN",
      "WHERE",
      "GROUP BY"
    ],
    "expected_columns": [
      "patient_cohort",
      "diabetes_diagnoses_count"
    ],
    "reference_sql": "SELECT CASE WHEN p.dob < '1960-01-01' THEN 'Senior Patient' ELSE 'Non-Senior Patient' END AS patient_cohort, COUNT(dg.id) AS diabetes_diagnoses_count FROM diagnoses dg JOIN patients p ON dg.patient_id = p.id WHERE dg.icd10_code = 'E11.9' GROUP BY CASE WHEN p.dob < '1960-01-01' THEN 'Senior Patient' ELSE 'Non-Senior Patient' END ORDER BY diabetes_diagnoses_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join diagnoses with patients.",
      "Filter for diabetes and group by Senior vs Non-Senior."
    ],
    "solution_explanation": "Epidemiological age disparity in chronic metabolic disease.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L2-093",
    "domain": "healthcare",
    "level": 2,
    "order": 93,
    "difficulty": "boss",
    "title": "Clinical Appointment Realization by Doctor Specialty",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "For each doctor specialty, calculate total scheduled fee volume and total fee realized from completed visits.",
    "context_notes": "JOIN appointments with doctors, compute gross scheduled vs realized fees by specialty.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "specialty",
      "gross_scheduled_fees",
      "realized_fees"
    ],
    "reference_sql": "SELECT d.specialty, ROUND(SUM(a.fee), 2) AS gross_scheduled_fees, ROUND(SUM(CASE WHEN a.status = 'completed' THEN a.fee ELSE 0 END), 2) AS realized_fees FROM appointments a JOIN doctors d ON a.doctor_id = d.id GROUP BY d.specialty ORDER BY realized_fees DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join appointments with doctors.",
      "Group by specialty and compute scheduled vs realized fee sums."
    ],
    "solution_explanation": "Service line revenue realization and schedule efficiency.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L2-094",
    "domain": "healthcare",
    "level": 2,
    "order": 94,
    "difficulty": "boss",
    "title": "Total Medication Doses Prescribed by Day of Week",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Hospital pharmacy workload: determine which day of the week sees the highest volume of diagnoses recorded.",
    "context_notes": "GROUP BY EXTRACT(DOW FROM diagnosis_date) on diagnoses.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "day_of_week_num",
      "diagnoses_logged"
    ],
    "reference_sql": "SELECT EXTRACT(DOW FROM diagnosis_date)::INT AS day_of_week_num, COUNT(*) AS diagnoses_logged FROM diagnoses GROUP BY EXTRACT(DOW FROM diagnosis_date) ORDER BY diagnoses_logged DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Extract day of week from diagnosis_date.",
      "Count diagnoses logged per weekday."
    ],
    "solution_explanation": "Weekly clinical encounter and diagnostic documentation cycle.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-095",
    "domain": "healthcare",
    "level": 2,
    "order": 95,
    "difficulty": "boss",
    "title": "Physician Staffing Density vs Department Headcount",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "For each department, display department name, building location, doctor count, and total hospital rooms assigned.",
    "context_notes": "JOIN departments with doctor and room counts via subqueries.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_name",
      "building",
      "doctor_count",
      "rooms_assigned"
    ],
    "reference_sql": "SELECT dept.name AS department_name, dept.building, (SELECT COUNT(*) FROM doctors doc WHERE doc.department_id = dept.id) AS doctor_count, (SELECT COUNT(*) FROM rooms r WHERE r.department_id = dept.id) AS rooms_assigned FROM departments dept ORDER BY doctor_count DESC, dept.name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Subqueries compute doctor count and assigned room count per department."
    ],
    "solution_explanation": "Integrated clinical and physical facility asset inventory.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L2-096",
    "domain": "healthcare",
    "level": 2,
    "order": 96,
    "difficulty": "boss",
    "title": "Patients Carrying Unpaid Balances With Medicare Insurance",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Compliance check: find all Medicare patients who currently hold an overdue billing balance.",
    "context_notes": "JOIN billing with patients WHERE insurance_provider = Medicare AND status = overdue.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "patient_balance",
      "total_charge",
      "city"
    ],
    "reference_sql": "SELECT p.first_name, p.last_name, b.patient_balance, b.total_charge, p.city FROM billing b JOIN patients p ON b.patient_id = p.id WHERE p.insurance_provider = 'Medicare' AND b.status = 'overdue' ORDER BY b.patient_balance DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join billing with patients.",
      "Filter WHERE insurance = Medicare AND status = overdue."
    ],
    "solution_explanation": "Federal Medicare beneficiary balance billing audit.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-097",
    "domain": "healthcare",
    "level": 2,
    "order": 97,
    "difficulty": "boss",
    "title": "Total Value of Prescribed Regimens by Medical Specialty",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Prescribing volume leaderboard: rank medical specialties by total prescriptions authorized using COUNT.",
    "context_notes": "JOIN prescriptions with doctors, GROUP BY specialty, ORDER BY COUNT DESC.",
    "concepts": [
      "SELECT",
      "INNER JOIN",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "specialty",
      "total_prescriptions"
    ],
    "reference_sql": "SELECT d.specialty, COUNT(pr.id) AS total_prescriptions FROM prescriptions pr JOIN doctors d ON pr.doctor_id = d.id GROUP BY d.specialty ORDER BY total_prescriptions DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Join prescriptions with doctors.",
      "Group by specialty and count total prescriptions."
    ],
    "solution_explanation": "Ranks medical departments by pharmaceutical utilization.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L2-098",
    "domain": "healthcare",
    "level": 2,
    "order": 98,
    "difficulty": "boss",
    "title": "High-Acuity ICU Rooms Utilization Rate",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Critical care bed census: count total ICU rooms, occupied ICU rooms, and compute ICU bed occupancy percentage.",
    "context_notes": "Filter room_type = ICU on rooms table with conditional sums.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "Arithmetic",
      "WHERE"
    ],
    "expected_columns": [
      "total_icu_beds",
      "occupied_icu_beds",
      "icu_occupancy_rate_pct"
    ],
    "reference_sql": "SELECT COUNT(*) AS total_icu_beds, SUM(CASE WHEN is_occupied = TRUE THEN 1 ELSE 0 END) AS occupied_icu_beds, ROUND((SUM(CASE WHEN is_occupied = TRUE THEN 1 ELSE 0 END)::NUMERIC / COUNT(*)) * 100, 1) AS icu_occupancy_rate_pct FROM rooms WHERE room_type = 'ICU';",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter rooms WHERE room_type = ICU.",
      "Compute occupied count and percentage."
    ],
    "solution_explanation": "Emergency management: ICU critical care surge capacity.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L2-099",
    "domain": "healthcare",
    "level": 2,
    "order": 99,
    "difficulty": "boss",
    "title": "Comprehensive Outpatient Visit Reconciliation Statement",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Master encounter reconciliation: total appointments scheduled, total completed, total completed revenue, and total billing invoices created.",
    "context_notes": "Scalar subqueries combining appointments and billing metrics.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "Subquery"
    ],
    "expected_columns": [
      "total_appointments_scheduled",
      "completed_visits_count",
      "realized_appointment_revenue",
      "master_billing_invoices_count",
      "gross_hospital_charges"
    ],
    "reference_sql": "SELECT (SELECT COUNT(*) FROM appointments) AS total_appointments_scheduled, (SELECT COUNT(*) FROM appointments WHERE status = 'completed') AS completed_visits_count, (SELECT ROUND(SUM(fee), 2) FROM appointments WHERE status = 'completed') AS realized_appointment_revenue, (SELECT COUNT(*) FROM billing) AS master_billing_invoices_count, (SELECT ROUND(SUM(total_charge), 2) FROM billing) AS gross_hospital_charges;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Scalar subqueries compile encounter scheduling and billing reconciliation."
    ],
    "solution_explanation": "Consolidated outpatient encounter to billing conversion scorecard.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L2-100",
    "domain": "healthcare",
    "level": 2,
    "order": 100,
    "difficulty": "boss",
    "title": "The Grand Level 2 Clinical & Financial Hospital Masterpiece",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Grand Level 2 Finale: Complete Hospital Operational Health Scorecard — total active clinical departments, total registered patients, total completed appointment revenue, gross charges billed across all patients, and net uncollected patient debt.",
    "context_notes": "Multi-scalar subquery synthesizing Level 2 master clinical and revenue cycle metrics into one definitive executive statement. ",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "Arithmetic",
      "Subquery"
    ],
    "expected_columns": [
      "active_clinical_departments",
      "total_registered_patients",
      "realized_appointment_revenue",
      "gross_patient_charges",
      "uncollected_patient_debt"
    ],
    "reference_sql": "SELECT (SELECT COUNT(*) FROM departments) AS active_clinical_departments, (SELECT COUNT(*) FROM patients) AS total_registered_patients, (SELECT ROUND(SUM(fee), 2) FROM appointments WHERE status = 'completed') AS realized_appointment_revenue, (SELECT ROUND(SUM(total_charge), 2) FROM billing) AS gross_patient_charges, (SELECT ROUND(SUM(patient_balance), 2) FROM billing WHERE status = 'overdue') AS uncollected_patient_debt;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Scalar subqueries synthesize hospital scale, patient body, realized encounter revenue, gross billings, and bad debt exposure."
    ],
    "solution_explanation": "The crowning Level 2 executive clinical and financial dashboard for the health system.",
    "xp": 50,
    "estimated_minutes": 15
  }
];
