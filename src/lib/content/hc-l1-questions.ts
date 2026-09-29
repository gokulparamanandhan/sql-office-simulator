import { QuestionDefinition } from "./ecom-l1-questions";

export const HC_L1_QUESTIONS: QuestionDefinition[] = [
  {
    "id": "hc-L1-001",
    "domain": "healthcare",
    "level": 1,
    "order": 1,
    "difficulty": "warm-up",
    "title": "Active Hospital Departments",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Could you pull me the names and buildings of all our active hospital departments? I need this for the facility signage board — alphabetical by department name.",
    "context_notes": "SELECT name, building FROM departments ORDER BY name.",
    "concepts": [
      "SELECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "building"
    ],
    "reference_sql": "SELECT name, building FROM departments ORDER BY name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query the departments table.",
      "Return columns name, building.",
      "Order alphabetically by name."
    ],
    "solution_explanation": "Retrieves active medical department locations for directory signage.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-002",
    "domain": "healthcare",
    "level": 1,
    "order": 2,
    "difficulty": "warm-up",
    "title": "Doctor Directory and Specialties",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "I need a quick doctor contact list — doctor name, medical specialty, and work email, ordered alphabetically by doctor name.",
    "context_notes": "SELECT name, specialty, email FROM doctors ORDER BY name.",
    "concepts": [
      "SELECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "email"
    ],
    "reference_sql": "SELECT name, specialty, email FROM doctors ORDER BY name;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query doctors table.",
      "Select name, specialty, email.",
      "Sort alphabetically by name."
    ],
    "solution_explanation": "Generates physician phone and email directory.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-003",
    "domain": "healthcare",
    "level": 1,
    "order": 3,
    "difficulty": "warm-up",
    "title": "Available Inpatient Rooms",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "The evening admissions desk needs to know which rooms are currently unoccupied — show room number, room type, and daily rate.",
    "context_notes": "Filter rooms WHERE is_occupied = FALSE.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "room_number",
      "room_type",
      "daily_rate"
    ],
    "reference_sql": "SELECT room_number, room_type, daily_rate FROM rooms WHERE is_occupied = FALSE ORDER BY room_number;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query rooms table.",
      "Filter WHERE is_occupied = FALSE.",
      "Select room_number, room_type, daily_rate."
    ],
    "solution_explanation": "Identifies ready patient beds for incoming admissions.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-004",
    "domain": "healthcare",
    "level": 1,
    "order": 4,
    "difficulty": "warm-up",
    "title": "Registered Pediatric Patients",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Our pediatric division is sending wellness checkup flyers: pull all patients born in the year 2010 or later — first name, last name, and date of birth.",
    "context_notes": "Filter patients WHERE dob >= 2010-01-01.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "dob"
    ],
    "reference_sql": "SELECT first_name, last_name, dob FROM patients WHERE dob >= '2010-01-01' ORDER BY dob DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients table WHERE dob >= 2010-01-01.",
      "Order descending by dob to list youngest first."
    ],
    "solution_explanation": "Targets adolescent and pediatric cohort for outreach.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-005",
    "domain": "healthcare",
    "level": 1,
    "order": 5,
    "difficulty": "warm-up",
    "title": "Cardiology Specialists Roster",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Show me all physicians practicing in Cardiology — doctor name, office phone, and license number.",
    "context_notes": "Filter doctors WHERE specialty = Cardiology.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "phone",
      "license_number"
    ],
    "reference_sql": "SELECT name, phone, license_number FROM doctors WHERE specialty = 'Cardiology' ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter doctors table with WHERE specialty = Cardiology.",
      "Return name, phone, license_number."
    ],
    "solution_explanation": "Cardiology team contact list for acute cardiac referrals.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-006",
    "domain": "healthcare",
    "level": 1,
    "order": 6,
    "difficulty": "warm-up",
    "title": "Night Shift Nursing Roster",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Who is on the night shift roster? I need all nurses working the Night shift along with their certification level.",
    "context_notes": "Filter nurses WHERE shift = Night.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "certification_level"
    ],
    "reference_sql": "SELECT name, certification_level FROM nurses WHERE shift = 'Night' ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query nurses table with WHERE shift = Night.",
      "Return name, certification_level."
    ],
    "solution_explanation": "Verifies night coverage and advanced practice credentials.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-007",
    "domain": "healthcare",
    "level": 1,
    "order": 7,
    "difficulty": "warm-up",
    "title": "Patients Covered by Medicare",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Medicare claims audit is coming up: list all patients who use Medicare as their primary insurance provider — first name, last name, and city.",
    "context_notes": "Filter patients WHERE insurance_provider = Medicare.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city"
    ],
    "reference_sql": "SELECT first_name, last_name, city FROM patients WHERE insurance_provider = 'Medicare' ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query patients table.",
      "Filter WHERE insurance_provider = Medicare.",
      "Sort by last_name, first_name."
    ],
    "solution_explanation": "Compiles patient roster for federal billing compliance.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-008",
    "domain": "healthcare",
    "level": 1,
    "order": 8,
    "difficulty": "warm-up",
    "title": "Completed Clinic Appointments",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "For daily encounter billing, pull the first 25 completed appointments — show appointment id, appointment date, appointment type, and consultation fee.",
    "context_notes": "Filter appointments WHERE status = completed LIMIT 25.",
    "concepts": [
      "SELECT",
      "WHERE",
      "LIMIT"
    ],
    "expected_columns": [
      "id",
      "appointment_date",
      "appointment_type",
      "fee"
    ],
    "reference_sql": "SELECT id, appointment_date, appointment_type, fee FROM appointments WHERE status = 'completed' ORDER BY appointment_date DESC LIMIT 25;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter appointments WHERE status = completed.",
      "Sort by appointment_date DESC and LIMIT 25."
    ],
    "solution_explanation": "Samples completed clinical visits ready for billing generation.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-009",
    "domain": "healthcare",
    "level": 1,
    "order": 9,
    "difficulty": "warm-up",
    "title": "Intensive Care Unit (ICU) Beds",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "How many ICU beds do we have and where are they located? Show room number, department id, and daily rate for all ICU rooms.",
    "context_notes": "Filter rooms WHERE room_type = ICU.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "room_number",
      "department_id",
      "daily_rate"
    ],
    "reference_sql": "SELECT room_number, department_id, daily_rate FROM rooms WHERE room_type = 'ICU' ORDER BY room_number;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query rooms table with WHERE room_type = ICU.",
      "Select room_number, department_id, daily_rate."
    ],
    "solution_explanation": "Critical care bed inventory for surgical bed-planning.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-010",
    "domain": "healthcare",
    "level": 1,
    "order": 10,
    "difficulty": "warm-up",
    "title": "Universal Donor Blood Type Patients",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Blood bank emergency: pull all patients with blood type O- — show first name, last name, city, and date of birth.",
    "context_notes": "Filter patients WHERE blood_type = O-.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city",
      "dob"
    ],
    "reference_sql": "SELECT first_name, last_name, city, dob FROM patients WHERE blood_type = 'O-' ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients table WHERE blood_type = O-.",
      "Return first_name, last_name, city, dob."
    ],
    "solution_explanation": "Identifies universal donors for emergency donor outreach.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-011",
    "domain": "healthcare",
    "level": 1,
    "order": 11,
    "difficulty": "warm-up",
    "title": "Nurse Practitioners Roster",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "We are delegating minor clinic procedures: list all nurses with certification level NP (Nurse Practitioner) — name and shift.",
    "context_notes": "Filter nurses WHERE certification_level = NP.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "shift"
    ],
    "reference_sql": "SELECT name, shift FROM nurses WHERE certification_level = 'NP' ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query nurses table with WHERE certification_level = NP.",
      "Return name, shift."
    ],
    "solution_explanation": "Lists advanced practice nurses authorized to prescribe.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-012",
    "domain": "healthcare",
    "level": 1,
    "order": 12,
    "difficulty": "warm-up",
    "title": "High-Fee Appointments Over $250",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Find all specialist or surgical appointments where the encounter fee is strictly greater than $250.00.",
    "context_notes": "Filter appointments WHERE fee > 250.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "appointment_date",
      "appointment_type",
      "fee"
    ],
    "reference_sql": "SELECT id, appointment_date, appointment_type, fee FROM appointments WHERE fee > 250.00 ORDER BY fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query appointments table with WHERE fee > 250.00.",
      "Order descending by fee."
    ],
    "solution_explanation": "Surfaces top-bracket consultation charges.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-013",
    "domain": "healthcare",
    "level": 1,
    "order": 13,
    "difficulty": "warm-up",
    "title": "Surgical Tower Departments",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Which departments are housed inside the Surgical Tower? Show department name and floor number.",
    "context_notes": "Filter departments WHERE building = Surgical Tower.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "floor"
    ],
    "reference_sql": "SELECT name, floor FROM departments WHERE building = 'Surgical Tower' ORDER BY floor ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query departments WHERE building = Surgical Tower.",
      "Order by floor ascending."
    ],
    "solution_explanation": "Floor breakdown of surgical wing facilities.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-014",
    "domain": "healthcare",
    "level": 1,
    "order": 14,
    "difficulty": "warm-up",
    "title": "Patients From Brooklyn",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Our Brooklyn satellite health clinic is opening: pull all patients residing in Brooklyn — first name, last name, and insurance provider.",
    "context_notes": "Filter patients WHERE city = Brooklyn.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "insurance_provider"
    ],
    "reference_sql": "SELECT first_name, last_name, insurance_provider FROM patients WHERE city = 'Brooklyn' ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients table with WHERE city = Brooklyn.",
      "Return first_name, last_name, insurance_provider."
    ],
    "solution_explanation": "Geographic patient cohort for local clinic recruitment.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-015",
    "domain": "healthcare",
    "level": 1,
    "order": 15,
    "difficulty": "warm-up",
    "title": "Cancelled and No-Show Clinical Visits",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Clinic utilization audit: pull all appointments that resulted in cancelled or no_show status — show appointment id, date, type, and status.",
    "context_notes": "Filter appointments WHERE status IN (cancelled, no_show).",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "id",
      "appointment_date",
      "appointment_type",
      "status"
    ],
    "reference_sql": "SELECT id, appointment_date, appointment_type, status FROM appointments WHERE status IN ('cancelled', 'no_show') ORDER BY appointment_date DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter appointments WHERE status IN (cancelled, no_show).",
      "Order chronologically descending."
    ],
    "solution_explanation": "Tracks clinic schedule slippage and lost clinical capacity.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-016",
    "domain": "healthcare",
    "level": 1,
    "order": 16,
    "difficulty": "warm-up",
    "title": "Rooms Priced Under $1000 Daily",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Which hospital rooms have a daily charge under $1,000.00? Show room number, room type, and daily rate.",
    "context_notes": "Filter rooms WHERE daily_rate < 1000.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "room_number",
      "room_type",
      "daily_rate"
    ],
    "reference_sql": "SELECT room_number, room_type, daily_rate FROM rooms WHERE daily_rate < 1000.00 ORDER BY daily_rate ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query rooms table with WHERE daily_rate < 1000.00.",
      "Order ascending by daily_rate."
    ],
    "solution_explanation": "Low-cost step-down room tier for convalescent recovery.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-017",
    "domain": "healthcare",
    "level": 1,
    "order": 17,
    "difficulty": "warm-up",
    "title": "Emergency Medicine and Surgery Doctors",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Trauma response list: pull all doctors specializing in either Surgery or Emergency Medicine — doctor name, specialty, and phone extension.",
    "context_notes": "Filter doctors WHERE specialty IN (Surgery, Emergency Medicine).",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "phone"
    ],
    "reference_sql": "SELECT name, specialty, phone FROM doctors WHERE specialty IN ('Surgery', 'Emergency Medicine') ORDER BY specialty, name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter doctors WHERE specialty IN (Surgery, Emergency Medicine).",
      "Return name, specialty, phone."
    ],
    "solution_explanation": "Trauma team on-call directory.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-018",
    "domain": "healthcare",
    "level": 1,
    "order": 18,
    "difficulty": "warm-up",
    "title": "Patients With B-Positive Blood Type",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "List all patients with blood type B+ for clinical trial matching — first name, last name, and gender.",
    "context_notes": "Filter patients WHERE blood_type = B+.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "gender"
    ],
    "reference_sql": "SELECT first_name, last_name, gender FROM patients WHERE blood_type = 'B+' ORDER BY last_name, first_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients table WHERE blood_type = B+."
    ],
    "solution_explanation": "Clinical trial cohort recruitment based on antigen markers.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-019",
    "domain": "healthcare",
    "level": 1,
    "order": 19,
    "difficulty": "warm-up",
    "title": "Telehealth Encounters",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "We are evaluating remote care adoption: pull all appointments categorized as Telehealth — id, appointment date, and status.",
    "context_notes": "Filter appointments WHERE appointment_type = Telehealth.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "appointment_date",
      "status"
    ],
    "reference_sql": "SELECT id, appointment_date, status FROM appointments WHERE appointment_type = 'Telehealth' ORDER BY appointment_date DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query appointments table with WHERE appointment_type = Telehealth."
    ],
    "solution_explanation": "Monitors telemedicine adoption and completion rates.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-020",
    "domain": "healthcare",
    "level": 1,
    "order": 20,
    "difficulty": "warm-up",
    "title": "Nurses Assigned to Department 1",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Who is on the nursing roster for Department 1 (Cardiology)? Show nurse name, shift, and certification level.",
    "context_notes": "Filter nurses WHERE department_id = 1.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "name",
      "shift",
      "certification_level"
    ],
    "reference_sql": "SELECT name, shift, certification_level FROM nurses WHERE department_id = 1 ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Query nurses table with WHERE department_id = 1.",
      "Select name, shift, certification_level."
    ],
    "solution_explanation": "Departmental nursing staff roster for Cardiology.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-021",
    "domain": "healthcare",
    "level": 1,
    "order": 21,
    "difficulty": "warm-up",
    "title": "Distinct Insurance Carriers Accepted",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "For the patient registration intake packet, give me a clean list of all unique insurance providers held by our patients.",
    "context_notes": "SELECT DISTINCT insurance_provider FROM patients.",
    "concepts": [
      "SELECT",
      "DISTINCT"
    ],
    "expected_columns": [
      "insurance_provider"
    ],
    "reference_sql": "SELECT DISTINCT insurance_provider FROM patients ORDER BY insurance_provider ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use SELECT DISTINCT insurance_provider from patients.",
      "Sort alphabetically."
    ],
    "solution_explanation": "Payer directory for intake registration desk.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-022",
    "domain": "healthcare",
    "level": 1,
    "order": 22,
    "difficulty": "warm-up",
    "title": "Occupied Suite and ICU Beds",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "VIP and critical care occupancy check: show room number, room type, and daily rate for all occupied rooms in ICU or Suite tiers.",
    "context_notes": "Filter rooms WHERE is_occupied = TRUE AND room_type IN (ICU, Suite).",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND",
      "IN"
    ],
    "expected_columns": [
      "room_number",
      "room_type",
      "daily_rate"
    ],
    "reference_sql": "SELECT room_number, room_type, daily_rate FROM rooms WHERE is_occupied = TRUE AND room_type IN ('ICU', 'Suite') ORDER BY room_number;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter rooms table WHERE is_occupied = TRUE AND room_type IN (ICU, Suite)."
    ],
    "solution_explanation": "High-acuity bed occupancy tracking.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-023",
    "domain": "healthcare",
    "level": 1,
    "order": 23,
    "difficulty": "warm-up",
    "title": "Senior Patients Born Before 1960",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Geriatric care registry: pull all senior patients born before 1960 — first name, last name, date of birth, and city.",
    "context_notes": "Filter patients WHERE dob < 1960-01-01.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "dob",
      "city"
    ],
    "reference_sql": "SELECT first_name, last_name, dob, city FROM patients WHERE dob < '1960-01-01' ORDER BY dob ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients WHERE dob < 1960-01-01.",
      "Sort ascending by dob (oldest first)."
    ],
    "solution_explanation": "Identifies senior patient cohort for geriatric care management.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-024",
    "domain": "healthcare",
    "level": 1,
    "order": 24,
    "difficulty": "warm-up",
    "title": "Urgent Care Visit Encounters",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Pull all appointments categorized as Urgent — appointment id, date, fee, and status. Urgent visits first.",
    "context_notes": "Filter appointments WHERE appointment_type = Urgent.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "id",
      "appointment_date",
      "fee",
      "status"
    ],
    "reference_sql": "SELECT id, appointment_date, fee, status FROM appointments WHERE appointment_type = 'Urgent' ORDER BY appointment_date DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter appointments WHERE appointment_type = Urgent.",
      "Order by appointment_date DESC."
    ],
    "solution_explanation": "Reviews immediate triage and urgent care workload.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-025",
    "domain": "healthcare",
    "level": 1,
    "order": 25,
    "difficulty": "warm-up",
    "title": "Doctors With License Prefixes",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "State licensing credentialing: list doctor name, email, and license number for all physicians on staff.",
    "context_notes": "SELECT name, email, license_number FROM doctors.",
    "concepts": [
      "SELECT",
      "ORDER BY"
    ],
    "expected_columns": [
      "name",
      "email",
      "license_number"
    ],
    "reference_sql": "SELECT name, email, license_number FROM doctors ORDER BY name ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select name, email, license_number from doctors.",
      "Order alphabetically by name."
    ],
    "solution_explanation": "Physician licensing and medical board credentials audit.",
    "xp": 15,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-026",
    "domain": "healthcare",
    "level": 1,
    "order": 26,
    "difficulty": "core",
    "title": "Patient Count by Insurance Carrier",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Payer mix distribution: how many registered patients do we have with each insurance provider? Largest payer first.",
    "context_notes": "GROUP BY insurance_provider, COUNT(*).",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "patient_count"
    ],
    "reference_sql": "SELECT insurance_provider, COUNT(*) AS patient_count FROM patients GROUP BY insurance_provider ORDER BY patient_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group patients by insurance_provider.",
      "Count records as patient_count.",
      "Order descending by patient_count."
    ],
    "solution_explanation": "Reveals commercial vs government insurance volume.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-027",
    "domain": "healthcare",
    "level": 1,
    "order": 27,
    "difficulty": "core",
    "title": "Total Appointment Revenue Potential",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "What is the total cumulative sum of all appointment fees scheduled across our hospital clinics?",
    "context_notes": "SUM(fee) from appointments.",
    "concepts": [
      "SELECT",
      "SUM"
    ],
    "expected_columns": [
      "total_scheduled_fees"
    ],
    "reference_sql": "SELECT ROUND(SUM(fee), 2) AS total_scheduled_fees FROM appointments;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select SUM(fee) from appointments.",
      "Rounds to 2 decimal places."
    ],
    "solution_explanation": "Measures gross clinic consultation billing capacity.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-028",
    "domain": "healthcare",
    "level": 1,
    "order": 28,
    "difficulty": "core",
    "title": "Average Consultation Fee by Appointment Type",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "What is our average fee charged per appointment type (Checkup, Follow-up, Specialist, Telehealth, Urgent)?",
    "context_notes": "GROUP BY appointment_type, AVG(fee).",
    "concepts": [
      "SELECT",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "appointment_type",
      "avg_fee"
    ],
    "reference_sql": "SELECT appointment_type, ROUND(AVG(fee), 2) AS avg_fee FROM appointments GROUP BY appointment_type ORDER BY avg_fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by appointment_type.",
      "Compute AVG(fee) rounded to 2 decimal places."
    ],
    "solution_explanation": "Analyzes fee schedules across encounter categories.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-029",
    "domain": "healthcare",
    "level": 1,
    "order": 29,
    "difficulty": "core",
    "title": "Hospital Room Occupancy Rate",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "How many rooms are currently occupied versus unoccupied? Show occupancy status and count of rooms.",
    "context_notes": "GROUP BY is_occupied, COUNT(*).",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY"
    ],
    "expected_columns": [
      "is_occupied",
      "room_count"
    ],
    "reference_sql": "SELECT is_occupied, COUNT(*) AS room_count FROM rooms GROUP BY is_occupied ORDER BY is_occupied DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group rooms by is_occupied.",
      "Count rooms in each status."
    ],
    "solution_explanation": "Monitors live bed utilization across nursing units.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-030",
    "domain": "healthcare",
    "level": 1,
    "order": 30,
    "difficulty": "core",
    "title": "Doctors Count by Specialty",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "How is our physician staff distributed across medical specialties? Show specialty and doctor count, most staffed first.",
    "context_notes": "GROUP BY specialty, COUNT(*).",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "specialty",
      "doctor_count"
    ],
    "reference_sql": "SELECT specialty, COUNT(*) AS doctor_count FROM doctors GROUP BY specialty ORDER BY doctor_count DESC, specialty ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group doctors by specialty.",
      "Count doctors in each specialty."
    ],
    "solution_explanation": "Specialty coverage and clinical staffing balance.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-031",
    "domain": "healthcare",
    "level": 1,
    "order": 31,
    "difficulty": "core",
    "title": "Appointment Volume by Status",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Break down all appointments by completion status: completed, cancelled, no_show counts.",
    "context_notes": "GROUP BY status, COUNT(*).",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "status",
      "appointment_count"
    ],
    "reference_sql": "SELECT status, COUNT(*) AS appointment_count FROM appointments GROUP BY status ORDER BY appointment_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by status.",
      "Count total appointments per status."
    ],
    "solution_explanation": "Measures no-show rates vs completed clinical throughput.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-032",
    "domain": "healthcare",
    "level": 1,
    "order": 32,
    "difficulty": "core",
    "title": "Average Daily Rate by Room Type",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "What is the average daily bed charge for each room tier (Standard, ICU, Semi-Private, Suite)?",
    "context_notes": "GROUP BY room_type, AVG(daily_rate).",
    "concepts": [
      "SELECT",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "room_type",
      "avg_daily_rate"
    ],
    "reference_sql": "SELECT room_type, ROUND(AVG(daily_rate), 2) AS avg_daily_rate FROM rooms GROUP BY room_type ORDER BY avg_daily_rate DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group rooms by room_type.",
      "Compute AVG(daily_rate) for each room class."
    ],
    "solution_explanation": "Room rate fee benchmarking for inpatient stay pricing.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-033",
    "domain": "healthcare",
    "level": 1,
    "order": 33,
    "difficulty": "core",
    "title": "Nursing Staff Distribution: Day vs Night",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Compare nursing headcounts between Day and Night shifts — shift name and total nurse count.",
    "context_notes": "GROUP BY shift, COUNT(*).",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY"
    ],
    "expected_columns": [
      "shift",
      "nurse_count"
    ],
    "reference_sql": "SELECT shift, COUNT(*) AS nurse_count FROM nurses GROUP BY shift ORDER BY nurse_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group nurses by shift.",
      "Count nurses on Day vs Night."
    ],
    "solution_explanation": "Validates day vs night staffing coverage ratios.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-034",
    "domain": "healthcare",
    "level": 1,
    "order": 34,
    "difficulty": "core",
    "title": "Patients by Blood Type Distribution",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Blood bank summary: how many registered patients do we have for every blood type? Largest supply group first.",
    "context_notes": "GROUP BY blood_type, COUNT(*).",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "blood_type",
      "patient_count"
    ],
    "reference_sql": "SELECT blood_type, COUNT(*) AS patient_count FROM patients GROUP BY blood_type ORDER BY patient_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group patients by blood_type.",
      "Count total patients per blood group."
    ],
    "solution_explanation": "Hospital blood bank demographic readiness profile.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-035",
    "domain": "healthcare",
    "level": 1,
    "order": 35,
    "difficulty": "core",
    "title": "Total Completed Appointments Revenue",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "How much revenue has been realized strictly from completed appointments?",
    "context_notes": "SUM(fee) WHERE status = completed.",
    "concepts": [
      "SELECT",
      "SUM",
      "WHERE"
    ],
    "expected_columns": [
      "completed_revenue"
    ],
    "reference_sql": "SELECT ROUND(SUM(fee), 2) AS completed_revenue FROM appointments WHERE status = 'completed';",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter appointments WHERE status = completed.",
      "Sum fees into completed_revenue."
    ],
    "solution_explanation": "Net realized revenue from attended patient encounters.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-036",
    "domain": "healthcare",
    "level": 1,
    "order": 36,
    "difficulty": "core",
    "title": "Patients Count by City of Residence",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Geographic outreach: count how many patients live in each metropolitan city in our catchment area.",
    "context_notes": "GROUP BY city, COUNT(*).",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "city",
      "patient_count"
    ],
    "reference_sql": "SELECT city, COUNT(*) AS patient_count FROM patients GROUP BY city ORDER BY patient_count DESC, city ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group patients by city.",
      "Count patients per metropolitan city."
    ],
    "solution_explanation": "Regional patient origin analysis for transport and marketing.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-037",
    "domain": "healthcare",
    "level": 1,
    "order": 37,
    "difficulty": "core",
    "title": "Nurses by Certification Level",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Breakdown of nursing credentials: how many BSN vs NP nurses are on our hospital roster?",
    "context_notes": "GROUP BY certification_level, COUNT(*).",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY"
    ],
    "expected_columns": [
      "certification_level",
      "nurse_count"
    ],
    "reference_sql": "SELECT certification_level, COUNT(*) AS nurse_count FROM nurses GROUP BY certification_level ORDER BY nurse_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group nurses by certification_level.",
      "Count nurses in each degree tier."
    ],
    "solution_explanation": "Credentialing and nursing magnet status assessment.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-038",
    "domain": "healthcare",
    "level": 1,
    "order": 38,
    "difficulty": "core",
    "title": "Oldest and Youngest Patient Date of Birth",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Determine our patient age boundaries: what are the earliest and most recent dates of birth in our patient database?",
    "context_notes": "MIN(dob) and MAX(dob) from patients.",
    "concepts": [
      "SELECT",
      "MIN",
      "MAX"
    ],
    "expected_columns": [
      "earliest_dob",
      "latest_dob"
    ],
    "reference_sql": "SELECT MIN(dob) AS earliest_dob, MAX(dob) AS latest_dob FROM patients;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select MIN(dob) and MAX(dob) from patients."
    ],
    "solution_explanation": "Demographic span from oldest geriatric to youngest patient.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-039",
    "domain": "healthcare",
    "level": 1,
    "order": 39,
    "difficulty": "core",
    "title": "Total Bed Count by Department",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "How many total inpatient beds are assigned to each department? Show department id and room count.",
    "context_notes": "GROUP BY department_id, COUNT(*).",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_id",
      "bed_count"
    ],
    "reference_sql": "SELECT department_id, COUNT(*) AS bed_count FROM rooms GROUP BY department_id ORDER BY bed_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group rooms by department_id.",
      "Count beds allocated to each clinical department."
    ],
    "solution_explanation": "Departmental bed allocation and inpatient capacity.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-040",
    "domain": "healthcare",
    "level": 1,
    "order": 40,
    "difficulty": "core",
    "title": "Average Patient Age Proxy by Insurance Provider",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "For each insurance carrier, calculate the average birth year of their enrolled patients to identify elderly populations.",
    "context_notes": "GROUP BY insurance_provider, AVG(EXTRACT(YEAR FROM dob)).",
    "concepts": [
      "SELECT",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "avg_birth_year"
    ],
    "reference_sql": "SELECT insurance_provider, ROUND(AVG(EXTRACT(YEAR FROM dob)), 0)::INT AS avg_birth_year FROM patients GROUP BY insurance_provider ORDER BY avg_birth_year ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Extract year from dob.",
      "Compute average birth year grouped by insurance_provider."
    ],
    "solution_explanation": "Payer demographic risk profiling.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-041",
    "domain": "healthcare",
    "level": 1,
    "order": 41,
    "difficulty": "core",
    "title": "Highest Single Consultation Fee Recorded",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "What was the single highest consultation fee recorded in our appointment records?",
    "context_notes": "MAX(fee) from appointments.",
    "concepts": [
      "SELECT",
      "MAX"
    ],
    "expected_columns": [
      "max_fee"
    ],
    "reference_sql": "SELECT MAX(fee) AS max_fee FROM appointments;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Select MAX(fee) from appointments."
    ],
    "solution_explanation": "Identifies maximum billing ticket for outpatient care.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-042",
    "domain": "healthcare",
    "level": 1,
    "order": 42,
    "difficulty": "core",
    "title": "Rooms by Building Floor",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Hospital floor management: how many departments are located on each building floor?",
    "context_notes": "GROUP BY floor, COUNT(*) on departments.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "floor",
      "department_count"
    ],
    "reference_sql": "SELECT floor, COUNT(*) AS department_count FROM departments GROUP BY floor ORDER BY floor ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group departments by floor.",
      "Count departments on each floor level."
    ],
    "solution_explanation": "Vertical building facility utilization.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-043",
    "domain": "healthcare",
    "level": 1,
    "order": 43,
    "difficulty": "core",
    "title": "Gender Breakdown of Registered Patients",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "What is the gender ratio in our active patient population? Show gender and patient count.",
    "context_notes": "GROUP BY gender, COUNT(*).",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY"
    ],
    "expected_columns": [
      "gender",
      "count"
    ],
    "reference_sql": "SELECT gender, COUNT(*) AS count FROM patients GROUP BY gender ORDER BY count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group patients by gender.",
      "Count total patient records per gender."
    ],
    "solution_explanation": "Patient demographics for clinical research reporting.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-044",
    "domain": "healthcare",
    "level": 1,
    "order": 44,
    "difficulty": "core",
    "title": "Total Potential Daily Revenue from All Rooms",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "If every single bed in the hospital were occupied, what would our total daily room charge revenue be?",
    "context_notes": "SUM(daily_rate) from rooms.",
    "concepts": [
      "SELECT",
      "SUM"
    ],
    "expected_columns": [
      "max_daily_room_revenue"
    ],
    "reference_sql": "SELECT ROUND(SUM(daily_rate), 2) AS max_daily_room_revenue FROM rooms;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Sum daily_rate across all rooms."
    ],
    "solution_explanation": "100% capacity inpatient bed charge potential.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-045",
    "domain": "healthcare",
    "level": 1,
    "order": 45,
    "difficulty": "core",
    "title": "Total Appointment Encounters per Doctor ID",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Calculate total appointment encounters booked under each doctor id — busiest doctors first.",
    "context_notes": "GROUP BY doctor_id, COUNT(*).",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "doctor_id",
      "total_appointments"
    ],
    "reference_sql": "SELECT doctor_id, COUNT(*) AS total_appointments FROM appointments GROUP BY doctor_id ORDER BY total_appointments DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by doctor_id.",
      "Count encounters per doctor."
    ],
    "solution_explanation": "Physician clinical scheduling and patient panel volume.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-046",
    "domain": "healthcare",
    "level": 1,
    "order": 46,
    "difficulty": "core",
    "title": "Patients Enrolled in 2023",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Count how many new patients registered their primary medical chart with us during calendar year 2023.",
    "context_notes": "COUNT(*) WHERE created_at BETWEEN 2023-01-01 AND 2023-12-31.",
    "concepts": [
      "SELECT",
      "COUNT",
      "WHERE"
    ],
    "expected_columns": [
      "patients_added_2023"
    ],
    "reference_sql": "SELECT COUNT(*) AS patients_added_2023 FROM patients WHERE created_at BETWEEN '2023-01-01' AND '2023-12-31';",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients by created_at in 2023 and count."
    ],
    "solution_explanation": "Annual patient acquisition growth metric.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-047",
    "domain": "healthcare",
    "level": 1,
    "order": 47,
    "difficulty": "core",
    "title": "Average Appointment Fee for Urgent Visits",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "What is the exact average fee billed specifically for Urgent appointment visits?",
    "context_notes": "AVG(fee) WHERE appointment_type = Urgent.",
    "concepts": [
      "SELECT",
      "AVG",
      "WHERE"
    ],
    "expected_columns": [
      "avg_urgent_fee"
    ],
    "reference_sql": "SELECT ROUND(AVG(fee), 2) AS avg_urgent_fee FROM appointments WHERE appointment_type = 'Urgent';",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter appointments WHERE appointment_type = Urgent.",
      "Compute AVG(fee) rounded to 2 decimals."
    ],
    "solution_explanation": "Urgent care fee schedule benchmark.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-048",
    "domain": "healthcare",
    "level": 1,
    "order": 48,
    "difficulty": "core",
    "title": "Occupied Beds Count by Room Type",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Show the count of currently occupied beds broken down by room tier (ICU, Suite, Standard, Semi-Private).",
    "context_notes": "Filter is_occupied = TRUE, GROUP BY room_type.",
    "concepts": [
      "SELECT",
      "COUNT",
      "WHERE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "room_type",
      "occupied_beds"
    ],
    "reference_sql": "SELECT room_type, COUNT(*) AS occupied_beds FROM rooms WHERE is_occupied = TRUE GROUP BY room_type ORDER BY occupied_beds DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter rooms WHERE is_occupied = TRUE.",
      "Group by room_type and count occupied beds."
    ],
    "solution_explanation": "Active bed occupancy distribution by room category.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-049",
    "domain": "healthcare",
    "level": 1,
    "order": 49,
    "difficulty": "core",
    "title": "Lost Revenue from No-Show and Cancelled Visits",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Calculate the total dollar sum of scheduled fees lost due to cancelled or no_show appointments.",
    "context_notes": "SUM(fee) WHERE status IN (cancelled, no_show).",
    "concepts": [
      "SELECT",
      "SUM",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "lost_clinic_revenue"
    ],
    "reference_sql": "SELECT ROUND(SUM(fee), 2) AS lost_clinic_revenue FROM appointments WHERE status IN ('cancelled', 'no_show');",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter appointments WHERE status IN (cancelled, no_show).",
      "Sum lost fees."
    ],
    "solution_explanation": "Financial quantification of clinic schedule abandonment.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-050",
    "domain": "healthcare",
    "level": 1,
    "order": 50,
    "difficulty": "core",
    "title": "Doctors Count per Department ID",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "How many physicians are assigned to each department id? Show department id and doctor count.",
    "context_notes": "GROUP BY department_id on doctors.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_id",
      "doctor_count"
    ],
    "reference_sql": "SELECT department_id, COUNT(*) AS doctor_count FROM doctors GROUP BY department_id ORDER BY doctor_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group doctors by department_id.",
      "Count physicians in each department."
    ],
    "solution_explanation": "Physician department headcount allocation.",
    "xp": 20,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-051",
    "domain": "healthcare",
    "level": 1,
    "order": 51,
    "difficulty": "challenging",
    "title": "Payers With More Than 15 Patients",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "For commercial contract renewals, identify insurance carriers that represent strictly more than 15 enrolled patients.",
    "context_notes": "GROUP BY insurance_provider, HAVING COUNT(*) > 15.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "patient_count"
    ],
    "reference_sql": "SELECT insurance_provider, COUNT(*) AS patient_count FROM patients GROUP BY insurance_provider HAVING COUNT(*) > 15 ORDER BY patient_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group patients by insurance_provider.",
      "Filter HAVING COUNT(*) > 15."
    ],
    "solution_explanation": "Isolates key volume payer relationships for rate negotiation.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L1-052",
    "domain": "healthcare",
    "level": 1,
    "order": 52,
    "difficulty": "challenging",
    "title": "Physicians With 8+ Scheduled Appointments",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Which doctors have handled at least 8 scheduled patient appointments? Show doctor id and encounter count.",
    "context_notes": "GROUP BY doctor_id, HAVING COUNT(*) >= 8.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "doctor_id",
      "encounter_count"
    ],
    "reference_sql": "SELECT doctor_id, COUNT(*) AS encounter_count FROM appointments GROUP BY doctor_id HAVING COUNT(*) >= 8 ORDER BY encounter_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by doctor_id.",
      "Filter HAVING COUNT(*) >= 8."
    ],
    "solution_explanation": "Identifies high-volume clinician practices.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L1-053",
    "domain": "healthcare",
    "level": 1,
    "order": 53,
    "difficulty": "challenging",
    "title": "Departments With Over 6 Total Rooms",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Which departments have more than 6 assigned hospital rooms? Show department id and bed count.",
    "context_notes": "GROUP BY department_id, HAVING COUNT(*) > 6.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_id",
      "total_rooms"
    ],
    "reference_sql": "SELECT department_id, COUNT(*) AS total_rooms FROM rooms GROUP BY department_id HAVING COUNT(*) > 6 ORDER BY total_rooms DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group rooms by department_id.",
      "Filter HAVING COUNT(*) > 6."
    ],
    "solution_explanation": "Finds our largest inpatient clinical divisions.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L1-054",
    "domain": "healthcare",
    "level": 1,
    "order": 54,
    "difficulty": "challenging",
    "title": "Cities With Over 10 Registered Patients",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Identify urban centers that supply over 10 registered patients to our medical center.",
    "context_notes": "GROUP BY city, HAVING COUNT(*) > 10.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "city",
      "patient_count"
    ],
    "reference_sql": "SELECT city, COUNT(*) AS patient_count FROM patients GROUP BY city HAVING COUNT(*) > 10 ORDER BY patient_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group patients by city.",
      "Filter HAVING COUNT(*) > 10."
    ],
    "solution_explanation": "Pinpoints core regional patient density zones.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-055",
    "domain": "healthcare",
    "level": 1,
    "order": 55,
    "difficulty": "challenging",
    "title": "Appointment Types Averaging Over $200",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Which encounter categories command an average fee strictly greater than $200.00?",
    "context_notes": "GROUP BY appointment_type, HAVING AVG(fee) > 200.",
    "concepts": [
      "SELECT",
      "AVG",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "appointment_type",
      "avg_fee"
    ],
    "reference_sql": "SELECT appointment_type, ROUND(AVG(fee), 2) AS avg_fee FROM appointments GROUP BY appointment_type HAVING AVG(fee) > 200.00 ORDER BY avg_fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by appointment_type.",
      "Filter HAVING AVG(fee) > 200.00."
    ],
    "solution_explanation": "Identifies premium outpatient consultation tiers.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L1-056",
    "domain": "healthcare",
    "level": 1,
    "order": 56,
    "difficulty": "challenging",
    "title": "Patients With Rare Negative Rh Factor",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Find all patients with negative Rh blood types (A-, O-, etc.) by searching for a trailing minus sign.",
    "context_notes": "Filter patients WHERE blood_type LIKE %-.",
    "concepts": [
      "SELECT",
      "WHERE",
      "LIKE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "blood_type",
      "city"
    ],
    "reference_sql": "SELECT first_name, last_name, blood_type, city FROM patients WHERE blood_type LIKE '%-' ORDER BY blood_type, last_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients table with WHERE blood_type LIKE %-."
    ],
    "solution_explanation": "Critical blood bank registry for rare negative Rh blood donors.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-057",
    "domain": "healthcare",
    "level": 1,
    "order": 57,
    "difficulty": "challenging",
    "title": "High Cost Rooms With Occupancy Status",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "List all rooms with a daily rate of $1,500 or higher, showing room number, type, daily rate, and whether currently occupied.",
    "context_notes": "Filter rooms WHERE daily_rate >= 1500.",
    "concepts": [
      "SELECT",
      "WHERE"
    ],
    "expected_columns": [
      "room_number",
      "room_type",
      "daily_rate",
      "is_occupied"
    ],
    "reference_sql": "SELECT room_number, room_type, daily_rate, is_occupied FROM rooms WHERE daily_rate >= 1500.00 ORDER BY daily_rate DESC, room_number;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter rooms table WHERE daily_rate >= 1500.00.",
      "Order descending by daily_rate."
    ],
    "solution_explanation": "Premium VIP and intensive care suite capacity tracking.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-058",
    "domain": "healthcare",
    "level": 1,
    "order": 58,
    "difficulty": "challenging",
    "title": "Appointments Scheduled in Morning Hours",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Morning clinic load: find all appointments scheduled before 10:00 AM (hour < 10) with appointment type and fee.",
    "context_notes": "WHERE EXTRACT(HOUR FROM appointment_date) < 10.",
    "concepts": [
      "SELECT",
      "WHERE",
      "EXTRACT"
    ],
    "expected_columns": [
      "id",
      "appointment_date",
      "appointment_type",
      "fee"
    ],
    "reference_sql": "SELECT id, appointment_date, appointment_type, fee FROM appointments WHERE EXTRACT(HOUR FROM appointment_date) < 10 ORDER BY appointment_date ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Extract hour from appointment_date and filter < 10."
    ],
    "solution_explanation": "Early-morning clinic arrival flow and phlebotomy prep.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L1-059",
    "domain": "healthcare",
    "level": 1,
    "order": 59,
    "difficulty": "challenging",
    "title": "Doctors With Specific License Number Patterns",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Credential verification: find all physicians whose New York license number ends with an even digit.",
    "context_notes": "Filter doctors WHERE license_number LIKE %0, %2, etc or regex.",
    "concepts": [
      "SELECT",
      "WHERE",
      "LIKE"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "license_number"
    ],
    "reference_sql": "SELECT name, specialty, license_number FROM doctors WHERE license_number LIKE '%0' OR license_number LIKE '%2' OR license_number LIKE '%4' OR license_number LIKE '%6' OR license_number LIKE '%8' ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter doctors with even-ending license numbers."
    ],
    "solution_explanation": "Randomized sampling for hospital medical executive committee peer review.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L1-060",
    "domain": "healthcare",
    "level": 1,
    "order": 60,
    "difficulty": "challenging",
    "title": "Total Patient Cohort Age in Decades",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Group our patients by birth decade (e.g. 1950s, 1960s, 1970s) and show the count of patients in each generational cohort.",
    "context_notes": "Calculate decade from EXTRACT(YEAR FROM dob), GROUP BY decade.",
    "concepts": [
      "SELECT",
      "COUNT",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "birth_decade",
      "patient_count"
    ],
    "reference_sql": "SELECT (FLOOR(EXTRACT(YEAR FROM dob) / 10) * 10)::INT AS birth_decade, COUNT(*) AS patient_count FROM patients GROUP BY (FLOOR(EXTRACT(YEAR FROM dob) / 10) * 10)::INT ORDER BY birth_decade ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute birth decade using FLOOR(year / 10) * 10.",
      "Group and count patients per generational cohort."
    ],
    "solution_explanation": "Population health generational cohort modeling.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L1-061",
    "domain": "healthcare",
    "level": 1,
    "order": 61,
    "difficulty": "challenging",
    "title": "Nurses Holding Advanced NP Credentials on Night Shifts",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "For overnight clinical escalation protocols, list all Nurse Practitioners (NP) who work the Night shift.",
    "context_notes": "Filter nurses WHERE certification_level = NP AND shift = Night.",
    "concepts": [
      "SELECT",
      "WHERE",
      "AND"
    ],
    "expected_columns": [
      "name",
      "department_id"
    ],
    "reference_sql": "SELECT name, department_id FROM nurses WHERE certification_level = 'NP' AND shift = 'Night' ORDER BY name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter nurses WHERE certification_level = NP AND shift = Night."
    ],
    "solution_explanation": "Nighttime advanced clinical escalation staffing.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-062",
    "domain": "healthcare",
    "level": 1,
    "order": 62,
    "difficulty": "challenging",
    "title": "Appointments Generating Over $2000 by Doctor ID",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Which doctors have generated strictly more than $2,000 in total completed appointment fees?",
    "context_notes": "Filter status = completed, GROUP BY doctor_id, HAVING SUM(fee) > 2000.",
    "concepts": [
      "SELECT",
      "SUM",
      "WHERE",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "doctor_id",
      "total_revenue"
    ],
    "reference_sql": "SELECT doctor_id, ROUND(SUM(fee), 2) AS total_revenue FROM appointments WHERE status = 'completed' GROUP BY doctor_id HAVING SUM(fee) > 2000.00 ORDER BY total_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter status = completed.",
      "Group by doctor_id and check HAVING SUM(fee) > 2000."
    ],
    "solution_explanation": "Top clinician billing contributors.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L1-063",
    "domain": "healthcare",
    "level": 1,
    "order": 63,
    "difficulty": "challenging",
    "title": "Standard Bed Capacity by Department",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Count how many Standard inpatient rooms exist per department id, showing departments with at least 3 standard rooms.",
    "context_notes": "Filter room_type = Standard, GROUP BY department_id, HAVING COUNT >= 3.",
    "concepts": [
      "SELECT",
      "COUNT",
      "WHERE",
      "GROUP BY",
      "HAVING"
    ],
    "expected_columns": [
      "department_id",
      "standard_room_count"
    ],
    "reference_sql": "SELECT department_id, COUNT(*) AS standard_room_count FROM rooms WHERE room_type = 'Standard' GROUP BY department_id HAVING COUNT(*) >= 3 ORDER BY standard_room_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter WHERE room_type = Standard.",
      "Group by department_id and check HAVING COUNT(*) >= 3."
    ],
    "solution_explanation": "General medical-surgical bed allotment.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L1-064",
    "domain": "healthcare",
    "level": 1,
    "order": 64,
    "difficulty": "challenging",
    "title": "Patients With Common Family Names",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Identify any patient last names that appear at least 5 times in our master patient index — last name and frequency count.",
    "context_notes": "GROUP BY last_name, HAVING COUNT(*) >= 5.",
    "concepts": [
      "SELECT",
      "COUNT",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "last_name",
      "family_count"
    ],
    "reference_sql": "SELECT last_name, COUNT(*) AS family_count FROM patients GROUP BY last_name HAVING COUNT(*) >= 5 ORDER BY family_count DESC, last_name ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group patients by last_name.",
      "Filter HAVING COUNT(*) >= 5."
    ],
    "solution_explanation": "Family registry and chart de-duplication audit.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-065",
    "domain": "healthcare",
    "level": 1,
    "order": 65,
    "difficulty": "challenging",
    "title": "Appointments Billed at Non-Standard Fees",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Find appointments where the fee is not an exact round dollar amount (i.e. contains cents).",
    "context_notes": "Filter appointments WHERE fee != FLOOR(fee).",
    "concepts": [
      "SELECT",
      "WHERE",
      "Arithmetic"
    ],
    "expected_columns": [
      "id",
      "fee",
      "appointment_type"
    ],
    "reference_sql": "SELECT id, fee, appointment_type FROM appointments WHERE fee != FLOOR(fee) ORDER BY fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter appointments WHERE fee != FLOOR(fee).",
      "Surfaces fees with fractional cents."
    ],
    "solution_explanation": "Fee schedule override audit.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L1-066",
    "domain": "healthcare",
    "level": 1,
    "order": 66,
    "difficulty": "challenging",
    "title": "Doctors With Specific Medical Specialties",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "List all physicians practicing in Oncology, Neurology, or Pediatrics — doctor name, specialty, and email.",
    "context_notes": "Filter doctors WHERE specialty IN (Oncology, Neurology, Pediatrics).",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "name",
      "specialty",
      "email"
    ],
    "reference_sql": "SELECT name, specialty, email FROM doctors WHERE specialty IN ('Oncology', 'Neurology', 'Pediatrics') ORDER BY specialty, name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter doctors table WHERE specialty IN (Oncology, Neurology, Pediatrics)."
    ],
    "solution_explanation": "Specialty clinic direct referral matrix.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-067",
    "domain": "healthcare",
    "level": 1,
    "order": 67,
    "difficulty": "challenging",
    "title": "Payer Revenue Capacity from Completed Appointments",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Calculate average fee and total completed encounter revenue grouped by appointment type.",
    "context_notes": "Filter status = completed, GROUP BY appointment_type.",
    "concepts": [
      "SELECT",
      "COUNT",
      "AVG",
      "SUM",
      "WHERE",
      "GROUP BY"
    ],
    "expected_columns": [
      "appointment_type",
      "completed_count",
      "avg_fee",
      "total_realized_revenue"
    ],
    "reference_sql": "SELECT appointment_type, COUNT(*) AS completed_count, ROUND(AVG(fee), 2) AS avg_fee, ROUND(SUM(fee), 2) AS total_realized_revenue FROM appointments WHERE status = 'completed' GROUP BY appointment_type ORDER BY total_realized_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter appointments WHERE status = completed.",
      "Aggregate count, avg fee, and sum revenue per appointment type."
    ],
    "solution_explanation": "Encounter profitability by clinical visit type.",
    "xp": 30,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L1-068",
    "domain": "healthcare",
    "level": 1,
    "order": 68,
    "difficulty": "challenging",
    "title": "Room Rates Spread: Maximum vs Minimum Daily Rate",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "What is the difference between the most expensive inpatient room and the least expensive room in the hospital?",
    "context_notes": "MAX(daily_rate) - MIN(daily_rate) from rooms.",
    "concepts": [
      "SELECT",
      "MAX",
      "MIN",
      "Arithmetic"
    ],
    "expected_columns": [
      "max_rate",
      "min_rate",
      "rate_spread"
    ],
    "reference_sql": "SELECT MAX(daily_rate) AS max_rate, MIN(daily_rate) AS min_rate, ROUND(MAX(daily_rate) - MIN(daily_rate), 2) AS rate_spread FROM rooms;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Compute MAX(daily_rate), MIN(daily_rate), and their difference."
    ],
    "solution_explanation": "Hospital inpatient accommodation price bandwidth.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-069",
    "domain": "healthcare",
    "level": 1,
    "order": 69,
    "difficulty": "challenging",
    "title": "Elderly Patient Count by Insurance Carrier",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "For patients born before 1965, count how many belong to each insurance provider.",
    "context_notes": "Filter dob < 1965-01-01, GROUP BY insurance_provider.",
    "concepts": [
      "SELECT",
      "COUNT",
      "WHERE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "senior_patient_count"
    ],
    "reference_sql": "SELECT insurance_provider, COUNT(*) AS senior_patient_count FROM patients WHERE dob < '1965-01-01' GROUP BY insurance_provider ORDER BY senior_patient_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients born before 1965.",
      "Group by insurance_provider and count."
    ],
    "solution_explanation": "Senior patient enrollment distribution across health plans.",
    "xp": 25,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L1-070",
    "domain": "healthcare",
    "level": 1,
    "order": 70,
    "difficulty": "challenging",
    "title": "Doctors in Department 3 and 6 Contact Sheet",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Combined clinic roster: list doctors assigned to departments 3 (Surgery) or 6 (Primary Care) with name, phone, and specialty.",
    "context_notes": "Filter doctors WHERE department_id IN (3, 6).",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "name",
      "department_id",
      "specialty",
      "phone"
    ],
    "reference_sql": "SELECT name, department_id, specialty, phone FROM doctors WHERE department_id IN (3, 6) ORDER BY department_id, name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter doctors table WHERE department_id IN (3, 6)."
    ],
    "solution_explanation": "Surgical and primary care collaborative clinical roster.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-071",
    "domain": "healthcare",
    "level": 1,
    "order": 71,
    "difficulty": "challenging",
    "title": "Occupancy Breakdown: Suites vs Semi-Private",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Compare bed occupancy between Suites and Semi-Private rooms using CASE WHEN inside COUNT.",
    "context_notes": "COUNT(CASE WHEN is_occupied) for Suites and Semi-Private.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN"
    ],
    "expected_columns": [
      "suite_occupied",
      "semi_private_occupied"
    ],
    "reference_sql": "SELECT SUM(CASE WHEN room_type = 'Suite' AND is_occupied = TRUE THEN 1 ELSE 0 END) AS suite_occupied, SUM(CASE WHEN room_type = 'Semi-Private' AND is_occupied = TRUE THEN 1 ELSE 0 END) AS semi_private_occupied FROM rooms;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Use conditional SUM with CASE WHEN for Suite and Semi-Private occupied beds."
    ],
    "solution_explanation": "Executive bed occupancy comparison across premium tiers.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L1-072",
    "domain": "healthcare",
    "level": 1,
    "order": 72,
    "difficulty": "challenging",
    "title": "Patients Registered in the First Half of 2023",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Pull all patient records registered between January 1, 2023 and June 30, 2023 — first name, last name, and city.",
    "context_notes": "Filter patients WHERE created_at BETWEEN 2023-01-01 AND 2023-06-30.",
    "concepts": [
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city",
      "created_at"
    ],
    "reference_sql": "SELECT first_name, last_name, city, created_at FROM patients WHERE created_at BETWEEN '2023-01-01' AND '2023-06-30' ORDER BY created_at ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients table WHERE created_at is in H1 2023."
    ],
    "solution_explanation": "H1 patient cohort registration tracking.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-073",
    "domain": "healthcare",
    "level": 1,
    "order": 73,
    "difficulty": "challenging",
    "title": "Doctors With Top Consultation Fees Across Encounters",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Find doctors whose average appointment fee strictly exceeds $220.00 across all their scheduled visits.",
    "context_notes": "GROUP BY doctor_id, HAVING AVG(fee) > 220.",
    "concepts": [
      "SELECT",
      "AVG",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "doctor_id",
      "avg_fee"
    ],
    "reference_sql": "SELECT doctor_id, ROUND(AVG(fee), 2) AS avg_fee FROM appointments GROUP BY doctor_id HAVING AVG(fee) > 220.00 ORDER BY avg_fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by doctor_id.",
      "Filter HAVING AVG(fee) > 220.00."
    ],
    "solution_explanation": "Identifies premium billing clinical practitioners.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L1-074",
    "domain": "healthcare",
    "level": 1,
    "order": 74,
    "difficulty": "challenging",
    "title": "Emergency Response Department Directory",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Show department name, building, and floor for departments located on floor 1 or floor 4.",
    "context_notes": "Filter departments WHERE floor IN (1, 4).",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN"
    ],
    "expected_columns": [
      "name",
      "building",
      "floor"
    ],
    "reference_sql": "SELECT name, building, floor FROM departments WHERE floor IN (1, 4) ORDER BY floor, name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter departments WHERE floor IN (1, 4)."
    ],
    "solution_explanation": "Ground-floor and top-tier clinical ward directory.",
    "xp": 20,
    "estimated_minutes": 4
  },
  {
    "id": "hc-L1-075",
    "domain": "healthcare",
    "level": 1,
    "order": 75,
    "difficulty": "challenging",
    "title": "Patients With Common Blood Types in Yonkers or Queens",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Find patients in Queens or Yonkers who hold positive blood types (A+, O+, B+, AB+).",
    "context_notes": "Filter city IN (Queens, Yonkers) AND blood_type LIKE %+.",
    "concepts": [
      "SELECT",
      "WHERE",
      "IN",
      "LIKE"
    ],
    "expected_columns": [
      "first_name",
      "last_name",
      "city",
      "blood_type"
    ],
    "reference_sql": "SELECT first_name, last_name, city, blood_type FROM patients WHERE city IN ('Queens', 'Yonkers') AND blood_type LIKE '%+' ORDER BY city, last_name;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients WHERE city IN (Queens, Yonkers) AND blood_type LIKE %+."
    ],
    "solution_explanation": "Regional blood donor outreach campaign.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-076",
    "domain": "healthcare",
    "level": 1,
    "order": 76,
    "difficulty": "boss",
    "title": "Executive Hospital Facility Scorecard",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Comprehensive facility snapshot: total departments, total doctors, total nurses, total rooms, and total registered patients.",
    "context_notes": "Scalar subqueries combining counts from all 5 primary facility tables.",
    "concepts": [
      "SELECT",
      "COUNT",
      "Subquery"
    ],
    "expected_columns": [
      "total_departments",
      "total_physicians",
      "total_nurses",
      "total_inpatient_beds",
      "registered_patients"
    ],
    "reference_sql": "SELECT (SELECT COUNT(*) FROM departments) AS total_departments, (SELECT COUNT(*) FROM doctors) AS total_physicians, (SELECT COUNT(*) FROM nurses) AS total_nurses, (SELECT COUNT(*) FROM rooms) AS total_inpatient_beds, (SELECT COUNT(*) FROM patients) AS registered_patients;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Scalar subqueries combine master headcount and capacity metrics into one row."
    ],
    "solution_explanation": "Executive enterprise asset and resource capacity scorecard.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-077",
    "domain": "healthcare",
    "level": 1,
    "order": 77,
    "difficulty": "boss",
    "title": "Payer Mix & Revenue Capacity Matrix",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Comprehensive payer profile: insurance provider, patient count, percentage share of patient base, and alphabetical ordering.",
    "context_notes": "GROUP BY insurance_provider with percentage calculation.",
    "concepts": [
      "SELECT",
      "COUNT",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "insurance_provider",
      "patient_count",
      "pct_of_patients"
    ],
    "reference_sql": "SELECT insurance_provider, COUNT(*) AS patient_count, ROUND((COUNT(*)::NUMERIC / (SELECT COUNT(*) FROM patients)) * 100, 1) AS pct_of_patients FROM patients GROUP BY insurance_provider ORDER BY patient_count DESC, insurance_provider ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group patients by insurance_provider.",
      "Compute percentage of total patient population."
    ],
    "solution_explanation": "Corporate payer contract volume and commercial dependency ratio.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L1-078",
    "domain": "healthcare",
    "level": 1,
    "order": 78,
    "difficulty": "boss",
    "title": "Inpatient Bed Utilization & Lost Capacity Cost",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Inpatient bed audit: count total rooms, occupied rooms, vacant rooms, and the total daily revenue currently uncollected from empty beds.",
    "context_notes": "Conditional aggregation on rooms table.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "Arithmetic"
    ],
    "expected_columns": [
      "total_rooms",
      "occupied_rooms",
      "vacant_rooms",
      "unrealized_daily_revenue"
    ],
    "reference_sql": "SELECT COUNT(*) AS total_rooms, SUM(CASE WHEN is_occupied = TRUE THEN 1 ELSE 0 END) AS occupied_rooms, SUM(CASE WHEN is_occupied = FALSE THEN 1 ELSE 0 END) AS vacant_rooms, ROUND(SUM(CASE WHEN is_occupied = FALSE THEN daily_rate ELSE 0 END), 2) AS unrealized_daily_revenue FROM rooms;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate rooms with conditional sums for occupied vs vacant beds.",
      "Sum daily_rate for unoccupied rooms to quantify vacancy loss."
    ],
    "solution_explanation": "Daily bed-occupancy leakage report for hospital administration.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L1-079",
    "domain": "healthcare",
    "level": 1,
    "order": 79,
    "difficulty": "boss",
    "title": "Clinical Appointment Encounter Economics",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Full appointment economics: total encounters, completed visits, cancelled/no-shows, gross fees, and completed revenue.",
    "context_notes": "Aggregations on appointments with conditional SUMs.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "Arithmetic"
    ],
    "expected_columns": [
      "total_encounters",
      "completed_encounters",
      "lost_encounters",
      "gross_scheduled_fees",
      "realized_fees"
    ],
    "reference_sql": "SELECT COUNT(*) AS total_encounters, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_encounters, SUM(CASE WHEN status IN ('cancelled', 'no_show') THEN 1 ELSE 0 END) AS lost_encounters, ROUND(SUM(fee), 2) AS gross_scheduled_fees, ROUND(SUM(CASE WHEN status = 'completed' THEN fee ELSE 0 END), 2) AS realized_fees FROM appointments;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Aggregate appointments table with conditional counts and fee totals."
    ],
    "solution_explanation": "Clinical operations and schedule realization dashboard.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L1-080",
    "domain": "healthcare",
    "level": 1,
    "order": 80,
    "difficulty": "boss",
    "title": "Physician Staffing by Department & Average Floor Level",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "For each department id on doctors, show doctor count, distinct specialties present, and list in descending order of doctors.",
    "context_notes": "GROUP BY department_id, COUNT(*), COUNT(DISTINCT specialty).",
    "concepts": [
      "SELECT",
      "COUNT",
      "COUNT DISTINCT",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_id",
      "doctor_count",
      "distinct_specialties"
    ],
    "reference_sql": "SELECT department_id, COUNT(*) AS doctor_count, COUNT(DISTINCT specialty) AS distinct_specialties FROM doctors GROUP BY department_id ORDER BY doctor_count DESC, department_id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group doctors by department_id.",
      "Count total physicians and distinct medical specialties."
    ],
    "solution_explanation": "Departmental clinical specialization breadth.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-081",
    "domain": "healthcare",
    "level": 1,
    "order": 81,
    "difficulty": "boss",
    "title": "Patient Age Demographic Strata Benchmark",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Classify all patients into clinical age groups: Pediatric (<18), Adult (18-64), Geriatric (65+) and count each group.",
    "context_notes": "CASE WHEN on EXTRACT(YEAR FROM AGE(CURRENT_DATE, dob)).",
    "concepts": [
      "SELECT",
      "COUNT",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "age_strata",
      "patient_count"
    ],
    "reference_sql": "SELECT CASE WHEN EXTRACT(YEAR FROM dob) >= 2006 THEN 'Pediatric (<18)' WHEN EXTRACT(YEAR FROM dob) >= 1959 THEN 'Adult (18-64)' ELSE 'Geriatric (65+)' END AS age_strata, COUNT(*) AS patient_count FROM patients GROUP BY CASE WHEN EXTRACT(YEAR FROM dob) >= 2006 THEN 'Pediatric (<18)' WHEN EXTRACT(YEAR FROM dob) >= 1959 THEN 'Adult (18-64)' ELSE 'Geriatric (65+)' END ORDER BY patient_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Classify patients into clinical age cohorts using birth year brackets.",
      "Group and count patients in each demographic tier."
    ],
    "solution_explanation": "Clinical epidemiology age distribution breakdown.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L1-082",
    "domain": "healthcare",
    "level": 1,
    "order": 82,
    "difficulty": "boss",
    "title": "Room Tier Rate Economics & Occupancy Matrix",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "For each room tier (Standard, ICU, Semi-Private, Suite): room count, occupied count, avg daily rate, and total daily revenue.",
    "context_notes": "GROUP BY room_type with multiple conditional aggregates.",
    "concepts": [
      "SELECT",
      "COUNT",
      "AVG",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "room_type",
      "total_beds",
      "occupied_beds",
      "avg_daily_rate",
      "active_daily_revenue"
    ],
    "reference_sql": "SELECT room_type, COUNT(*) AS total_beds, SUM(CASE WHEN is_occupied = TRUE THEN 1 ELSE 0 END) AS occupied_beds, ROUND(AVG(daily_rate), 2) AS avg_daily_rate, ROUND(SUM(CASE WHEN is_occupied = TRUE THEN daily_rate ELSE 0 END), 2) AS active_daily_revenue FROM rooms GROUP BY room_type ORDER BY active_daily_revenue DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group rooms by room_type.",
      "Compute total beds, occupied beds, avg rate, and active revenue."
    ],
    "solution_explanation": "Inpatient accommodation revenue engine breakdown.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L1-083",
    "domain": "healthcare",
    "level": 1,
    "order": 83,
    "difficulty": "boss",
    "title": "Doctor Workload & Schedule Realization Scorecard",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "For each doctor id, calculate total appointments, completed visits, cancelled/no-show visits, and total realized revenue.",
    "context_notes": "GROUP BY doctor_id with conditional counts and fee sums.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "doctor_id",
      "total_booked",
      "completed_visits",
      "unattended_visits",
      "realized_revenue"
    ],
    "reference_sql": "SELECT doctor_id, COUNT(*) AS total_booked, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_visits, SUM(CASE WHEN status IN ('cancelled', 'no_show') THEN 1 ELSE 0 END) AS unattended_visits, ROUND(SUM(CASE WHEN status = 'completed' THEN fee ELSE 0 END), 2) AS realized_revenue FROM appointments GROUP BY doctor_id ORDER BY realized_revenue DESC LIMIT 10;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by doctor_id.",
      "Compute completed visits, lost visits, and revenue realized."
    ],
    "solution_explanation": "Individual physician clinical production scorecard.",
    "xp": 45,
    "estimated_minutes": 11
  },
  {
    "id": "hc-L1-084",
    "domain": "healthcare",
    "level": 1,
    "order": 84,
    "difficulty": "boss",
    "title": "Nursing Workforce Deployment Profile",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "Nursing deployment matrix: for each department id, show total nurses, day shift nurses, night shift nurses, and NP count.",
    "context_notes": "GROUP BY department_id on nurses with conditional sums.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_id",
      "total_nurses",
      "day_nurses",
      "night_nurses",
      "np_count"
    ],
    "reference_sql": "SELECT department_id, COUNT(*) AS total_nurses, SUM(CASE WHEN shift = 'Day' THEN 1 ELSE 0 END) AS day_nurses, SUM(CASE WHEN shift = 'Night' THEN 1 ELSE 0 END) AS night_nurses, SUM(CASE WHEN certification_level = 'NP' THEN 1 ELSE 0 END) AS np_count FROM nurses GROUP BY department_id ORDER BY total_nurses DESC, department_id ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group nurses by department_id.",
      "Compute shift breakdown and nurse practitioner counts."
    ],
    "solution_explanation": "Departmental nursing shift coverage and advanced practice density.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L1-085",
    "domain": "healthcare",
    "level": 1,
    "order": 85,
    "difficulty": "boss",
    "title": "Regional Patient Distribution & Top Payer by City",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "For each metropolitan city: patient count, distinct insurance carriers represented, and earliest registered patient date.",
    "context_notes": "GROUP BY city on patients with multiple aggregates.",
    "concepts": [
      "SELECT",
      "COUNT",
      "COUNT DISTINCT",
      "MIN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "city",
      "patient_count",
      "distinct_insurers",
      "earliest_patient_date"
    ],
    "reference_sql": "SELECT city, COUNT(*) AS patient_count, COUNT(DISTINCT insurance_provider) AS distinct_insurers, MIN(created_at) AS earliest_patient_date FROM patients GROUP BY city ORDER BY patient_count DESC, city ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group patients by city.",
      "Compute patient count, unique insurance providers, and earliest registration date."
    ],
    "solution_explanation": "Market penetration and municipal payer diversification.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L1-086",
    "domain": "healthcare",
    "level": 1,
    "order": 86,
    "difficulty": "boss",
    "title": "Clinic Day-of-Week Appointment Distribution",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Identify which day of the week experiences our heaviest appointment load using EXTRACT(DOW).",
    "context_notes": "GROUP BY EXTRACT(DOW FROM appointment_date).",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "day_of_week_num",
      "total_visits",
      "completed_visits"
    ],
    "reference_sql": "SELECT EXTRACT(DOW FROM appointment_date)::INT AS day_of_week_num, COUNT(*) AS total_visits, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_visits FROM appointments GROUP BY EXTRACT(DOW FROM appointment_date) ORDER BY total_visits DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Extract day of week from appointment_date.",
      "Compute total and completed appointments per weekday."
    ],
    "solution_explanation": "Weekly clinic scheduling cadence and peak staffing requirement.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-087",
    "domain": "healthcare",
    "level": 1,
    "order": 87,
    "difficulty": "boss",
    "title": "Blood Bank Critical Inventory Roster by Blood Type",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "For each blood type: total registered patients, count of male donors, count of female donors, and percentage of patient body.",
    "context_notes": "GROUP BY blood_type on patients with conditional sums and percentages.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "blood_type",
      "donor_count",
      "male_donors",
      "female_donors",
      "pct_of_registry"
    ],
    "reference_sql": "SELECT blood_type, COUNT(*) AS donor_count, SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) AS male_donors, SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) AS female_donors, ROUND((COUNT(*)::NUMERIC / (SELECT COUNT(*) FROM patients)) * 100, 1) AS pct_of_registry FROM patients GROUP BY blood_type ORDER BY donor_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group patients by blood_type.",
      "Breakdown by gender and percentage of total registry."
    ],
    "solution_explanation": "Emergency blood bank transfusion readiness profile.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L1-088",
    "domain": "healthcare",
    "level": 1,
    "order": 88,
    "difficulty": "boss",
    "title": "Top 5 Highest Revenue Generating Clinical Days",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Which 5 calendar days generated the highest total completed appointment revenue? Show date and daily revenue.",
    "context_notes": "Filter status = completed, GROUP BY DATE(appointment_date) LIMIT 5.",
    "concepts": [
      "SELECT",
      "SUM",
      "WHERE",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "clinic_date",
      "daily_completed_revenue"
    ],
    "reference_sql": "SELECT DATE(appointment_date) AS clinic_date, ROUND(SUM(fee), 2) AS daily_completed_revenue FROM appointments WHERE status = 'completed' GROUP BY DATE(appointment_date) ORDER BY daily_completed_revenue DESC LIMIT 5;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group completed appointments by calendar date.",
      "Sum fees and return top 5 dates."
    ],
    "solution_explanation": "Peak outpatient billing collection days.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L1-089",
    "domain": "healthcare",
    "level": 1,
    "order": 89,
    "difficulty": "boss",
    "title": "Physician Email & Domain Governance Audit",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Verify IT security: confirm all doctor emails end with @pulsehealth.org and show doctor count by domain suffix.",
    "context_notes": "Check email suffix pattern on doctors table.",
    "concepts": [
      "SELECT",
      "COUNT",
      "WHERE",
      "LIKE"
    ],
    "expected_columns": [
      "valid_domain_doctors"
    ],
    "reference_sql": "SELECT COUNT(*) AS valid_domain_doctors FROM doctors WHERE email LIKE '%@pulsehealth.org';",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter doctors WHERE email LIKE %@pulsehealth.org and count."
    ],
    "solution_explanation": "IT governance: confirms HIPAA-compliant enterprise email provisioning.",
    "xp": 25,
    "estimated_minutes": 5
  },
  {
    "id": "hc-L1-090",
    "domain": "healthcare",
    "level": 1,
    "order": 90,
    "difficulty": "boss",
    "title": "Inpatient Room Yield: Revenue Generated per Square Foot Proxy",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "For each room type: total rooms, occupied count, occupancy rate %, and total daily revenue.",
    "context_notes": "GROUP BY room_type with percentage calculation.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "AVG",
      "CASE WHEN",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "room_type",
      "total_rooms",
      "occupied_count",
      "occupancy_rate_pct",
      "active_daily_revenue"
    ],
    "reference_sql": "SELECT room_type, COUNT(*) AS total_rooms, SUM(CASE WHEN is_occupied = TRUE THEN 1 ELSE 0 END) AS occupied_count, ROUND((SUM(CASE WHEN is_occupied = TRUE THEN 1 ELSE 0 END)::NUMERIC / COUNT(*)) * 100, 1) AS occupancy_rate_pct, ROUND(SUM(CASE WHEN is_occupied = TRUE THEN daily_rate ELSE 0 END), 2) AS active_daily_revenue FROM rooms GROUP BY room_type ORDER BY occupancy_rate_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group rooms by room_type.",
      "Compute occupancy percentage and active daily revenue."
    ],
    "solution_explanation": "Bed capacity yield and utilization report.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L1-091",
    "domain": "healthcare",
    "level": 1,
    "order": 91,
    "difficulty": "boss",
    "title": "High-Acuity Patient Ratio by City",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "For patients with rare blood types (A-, O-, B-), show count by city for regional blood bank prepositioning.",
    "context_notes": "Filter blood_type LIKE %-, GROUP BY city.",
    "concepts": [
      "SELECT",
      "COUNT",
      "WHERE",
      "LIKE",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "city",
      "rare_donor_count"
    ],
    "reference_sql": "SELECT city, COUNT(*) AS rare_donor_count FROM patients WHERE blood_type LIKE '%-' GROUP BY city ORDER BY rare_donor_count DESC, city ASC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Filter patients with negative Rh blood types.",
      "Group by city and count."
    ],
    "solution_explanation": "Prepositions emergency blood reserves in regional trauma depots.",
    "xp": 30,
    "estimated_minutes": 6
  },
  {
    "id": "hc-L1-092",
    "domain": "healthcare",
    "level": 1,
    "order": 92,
    "difficulty": "boss",
    "title": "Appointment Completion Rate by Visit Type",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "For each appointment type, calculate total scheduled visits, completed visits, and completion rate %.",
    "context_notes": "GROUP BY appointment_type with percentage calculation.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "appointment_type",
      "total_scheduled",
      "completed_count",
      "completion_rate_pct"
    ],
    "reference_sql": "SELECT appointment_type, COUNT(*) AS total_scheduled, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_count, ROUND((SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END)::NUMERIC / COUNT(*)) * 100, 1) AS completion_rate_pct FROM appointments GROUP BY appointment_type ORDER BY completion_rate_pct DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by appointment_type.",
      "Compute completion percentage per visit category."
    ],
    "solution_explanation": "Monitors patient adherence and scheduling leakage by clinic type.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L1-093",
    "domain": "healthcare",
    "level": 1,
    "order": 93,
    "difficulty": "boss",
    "title": "Executive Nursing Coverage Ratio by Department",
    "stakeholder": {
      "name": "Marcus Thorne",
      "role": "Chief Nursing Officer"
    },
    "request": "For each department id present in nurses, calculate total nurses and nurse practitioner ratio.",
    "context_notes": "GROUP BY department_id with NP percentage.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "Arithmetic",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "department_id",
      "total_nurses",
      "np_count",
      "np_ratio_pct"
    ],
    "reference_sql": "SELECT department_id, COUNT(*) AS total_nurses, SUM(CASE WHEN certification_level = 'NP' THEN 1 ELSE 0 END) AS np_count, ROUND((SUM(CASE WHEN certification_level = 'NP' THEN 1 ELSE 0 END)::NUMERIC / COUNT(*)) * 100, 1) AS np_ratio_pct FROM nurses GROUP BY department_id ORDER BY np_ratio_pct DESC, total_nurses DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group nurses by department_id.",
      "Calculate Nurse Practitioner percentage share."
    ],
    "solution_explanation": "Advanced clinical practice density across nursing units.",
    "xp": 40,
    "estimated_minutes": 10
  },
  {
    "id": "hc-L1-094",
    "domain": "healthcare",
    "level": 1,
    "order": 94,
    "difficulty": "boss",
    "title": "Average Fee Variance Across Clinician Panels",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "For doctors with at least 5 appointments, calculate average fee, minimum fee, and maximum fee charged.",
    "context_notes": "GROUP BY doctor_id, HAVING COUNT(*) >= 5.",
    "concepts": [
      "SELECT",
      "COUNT",
      "AVG",
      "MIN",
      "MAX",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
    "expected_columns": [
      "doctor_id",
      "visit_count",
      "avg_fee",
      "min_fee",
      "max_fee"
    ],
    "reference_sql": "SELECT doctor_id, COUNT(*) AS visit_count, ROUND(AVG(fee), 2) AS avg_fee, MIN(fee) AS min_fee, MAX(fee) AS max_fee FROM appointments GROUP BY doctor_id HAVING COUNT(*) >= 5 ORDER BY avg_fee DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group appointments by doctor_id.",
      "Filter doctors with at least 5 encounters.",
      "Compute fee range statistics."
    ],
    "solution_explanation": "Fee schedule compliance and variance audit per clinician.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L1-095",
    "domain": "healthcare",
    "level": 1,
    "order": 95,
    "difficulty": "boss",
    "title": "Total Patient Population Demographic Balance",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Comprehensive demographic table: count of pediatric patients, adult patients, geriatric patients, and total enrolled.",
    "context_notes": "Scalar subqueries or conditional sums on patients table.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN"
    ],
    "expected_columns": [
      "pediatric_count",
      "adult_count",
      "geriatric_count",
      "total_patient_body"
    ],
    "reference_sql": "SELECT SUM(CASE WHEN EXTRACT(YEAR FROM dob) >= 2006 THEN 1 ELSE 0 END) AS pediatric_count, SUM(CASE WHEN EXTRACT(YEAR FROM dob) BETWEEN 1960 AND 2005 THEN 1 ELSE 0 END) AS adult_count, SUM(CASE WHEN EXTRACT(YEAR FROM dob) < 1960 THEN 1 ELSE 0 END) AS geriatric_count, COUNT(*) AS total_patient_body FROM patients;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Conditional sums classify entire patient census into age bands."
    ],
    "solution_explanation": "Master epidemiological age census for hospital strategic planning.",
    "xp": 35,
    "estimated_minutes": 8
  },
  {
    "id": "hc-L1-096",
    "domain": "healthcare",
    "level": 1,
    "order": 96,
    "difficulty": "boss",
    "title": "Hospital Wing Facility Floor Plan Audit",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "Wing architecture breakdown: for each building, calculate total departments housed, floor count span, and department names count.",
    "context_notes": "GROUP BY building on departments.",
    "concepts": [
      "SELECT",
      "COUNT",
      "MIN",
      "MAX",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "building",
      "departments_count",
      "lowest_floor",
      "highest_floor"
    ],
    "reference_sql": "SELECT building, COUNT(*) AS departments_count, MIN(floor) AS lowest_floor, MAX(floor) AS highest_floor FROM departments GROUP BY building ORDER BY departments_count DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group departments by building.",
      "Compute department count and floor span."
    ],
    "solution_explanation": "Medical campus building and pavilion occupancy layout.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L1-097",
    "domain": "healthcare",
    "level": 1,
    "order": 97,
    "difficulty": "boss",
    "title": "Telehealth vs In-Person Clinical Mix",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Calculate volume and realized revenue of Telehealth vs In-Person appointments side-by-side using CASE WHEN.",
    "context_notes": "Conditional sums on appointments table.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "Arithmetic"
    ],
    "expected_columns": [
      "telehealth_visits",
      "telehealth_revenue",
      "in_person_visits",
      "in_person_revenue"
    ],
    "reference_sql": "SELECT SUM(CASE WHEN appointment_type = 'Telehealth' THEN 1 ELSE 0 END) AS telehealth_visits, ROUND(SUM(CASE WHEN appointment_type = 'Telehealth' AND status = 'completed' THEN fee ELSE 0 END), 2) AS telehealth_revenue, SUM(CASE WHEN appointment_type != 'Telehealth' THEN 1 ELSE 0 END) AS in_person_visits, ROUND(SUM(CASE WHEN appointment_type != 'Telehealth' AND status = 'completed' THEN fee ELSE 0 END), 2) AS in_person_revenue FROM appointments;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Separate visits and completed revenue for Telehealth vs In-person."
    ],
    "solution_explanation": "Digital health adoption and revenue realization comparison.",
    "xp": 40,
    "estimated_minutes": 9
  },
  {
    "id": "hc-L1-098",
    "domain": "healthcare",
    "level": 1,
    "order": 98,
    "difficulty": "boss",
    "title": "Highest Yield Clinical Appointment Type",
    "stakeholder": {
      "name": "Jordan Chen",
      "role": "Director of Billing"
    },
    "request": "Rank appointment types by total revenue realized from completed visits, showing visit type, count, and revenue.",
    "context_notes": "Filter status = completed, GROUP BY appointment_type, ORDER BY SUM(fee) DESC LIMIT 1.",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "WHERE",
      "GROUP BY",
      "ORDER BY",
      "LIMIT"
    ],
    "expected_columns": [
      "appointment_type",
      "completed_encounters",
      "total_revenue"
    ],
    "reference_sql": "SELECT appointment_type, COUNT(*) AS completed_encounters, ROUND(SUM(fee), 2) AS total_revenue FROM appointments WHERE status = 'completed' GROUP BY appointment_type ORDER BY total_revenue DESC LIMIT 1;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group completed visits by appointment_type.",
      "Sum fee and return top revenue visit category."
    ],
    "solution_explanation": "Identifies hospital most lucrative outpatient clinical service line.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L1-099",
    "domain": "healthcare",
    "level": 1,
    "order": 99,
    "difficulty": "boss",
    "title": "Executive Hospital Room Revenue Matrix by Wing",
    "stakeholder": {
      "name": "Dr. Sarah Patel",
      "role": "Head of Surgery"
    },
    "request": "For each room type: total rooms, daily price range (min to max), and overall average rate.",
    "context_notes": "GROUP BY room_type on rooms with MIN, MAX, AVG.",
    "concepts": [
      "SELECT",
      "COUNT",
      "MIN",
      "MAX",
      "AVG",
      "GROUP BY",
      "ORDER BY"
    ],
    "expected_columns": [
      "room_type",
      "room_count",
      "min_daily_rate",
      "max_daily_rate",
      "avg_daily_rate"
    ],
    "reference_sql": "SELECT room_type, COUNT(*) AS room_count, MIN(daily_rate) AS min_daily_rate, MAX(daily_rate) AS max_daily_rate, ROUND(AVG(daily_rate), 2) AS avg_daily_rate FROM rooms GROUP BY room_type ORDER BY avg_daily_rate DESC;",
    "validation": {
      "order_sensitive": true,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Group rooms by room_type.",
      "Compute count, min rate, max rate, and avg rate."
    ],
    "solution_explanation": "Master room charge schedule and tier pricing matrix.",
    "xp": 35,
    "estimated_minutes": 7
  },
  {
    "id": "hc-L1-100",
    "domain": "healthcare",
    "level": 1,
    "order": 100,
    "difficulty": "boss",
    "title": "The Grand Level 1 Healthcare Executive Operations Dashboard",
    "stakeholder": {
      "name": "Dr. Evelyn Reed",
      "role": "Chief Medical Officer"
    },
    "request": "Final Level 1 Challenge: Consolidated Hospital Health Card — total active departments, total registered patients, total scheduled appointment fees, realized completed revenue, and overall bed occupancy rate %.",
    "context_notes": "Multi-scalar subquery combining all Level 1 foundational operational metrics. ",
    "concepts": [
      "SELECT",
      "COUNT",
      "SUM",
      "CASE WHEN",
      "Arithmetic",
      "Subquery"
    ],
    "expected_columns": [
      "active_departments",
      "registered_patients",
      "total_scheduled_fees",
      "realized_completed_revenue",
      "hospital_bed_occupancy_pct"
    ],
    "reference_sql": "SELECT (SELECT COUNT(*) FROM departments) AS active_departments, (SELECT COUNT(*) FROM patients) AS registered_patients, (SELECT ROUND(SUM(fee), 2) FROM appointments) AS total_scheduled_fees, (SELECT ROUND(SUM(fee), 2) FROM appointments WHERE status = 'completed') AS realized_completed_revenue, (SELECT ROUND((SUM(CASE WHEN is_occupied = TRUE THEN 1 ELSE 0 END)::NUMERIC / COUNT(*)) * 100, 1) FROM rooms) AS hospital_bed_occupancy_pct;",
    "validation": {
      "order_sensitive": false,
      "column_names_sensitive": false,
      "numeric_tolerance": 0
    },
    "hints": [
      "Scalar subqueries synthesize hospital scale, patient body, clinic billing, and inpatient occupancy."
    ],
    "solution_explanation": "The crowning Level 1 executive operational dashboard for the health system.",
    "xp": 50,
    "estimated_minutes": 15
  }
];
