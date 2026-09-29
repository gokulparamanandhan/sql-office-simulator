const fs = require('fs');
const path = require('path');

// Helper to define a question
const q = (id, domain, level, order, difficulty, title, name, role, request, notes, concepts, cols, sql, order_sensitive, hints, explanation, xp, mins) => ({
  id, domain, level, order, difficulty, title,
  stakeholder: { name, role },
  request, context_notes: notes, concepts,
  expected_columns: cols,
  reference_sql: sql,
  validation: { order_sensitive: order_sensitive === 't', column_names_sensitive: false, numeric_tolerance: 0 },
  hints: Array.isArray(hints) ? hints : [hints],
  solution_explanation: explanation,
  xp, estimated_minutes: mins
});

const L3 = [
  // 1–25: Warm-up (Subqueries in WHERE, IN / NOT IN, Scalar Subqueries)
  q('hc-L3-001','healthcare',3,1,'warm-up','Patients With Out-of-Range High Lab Results','Dr. Evelyn Reed','Chief Medical Officer',
    'Clinical safety audit: Find all patients who have at least one lab test result flagged as HIGH. Return patient first name, last name, and city.','Subquery with IN on patient_lab_results WHERE flag = HIGH.',['SELECT','IN SUBQUERY'],['first_name','last_name','city'],
    "SELECT first_name, last_name, city FROM patients WHERE id IN (SELECT patient_id FROM patient_lab_results WHERE flag = 'HIGH') ORDER BY last_name, first_name;",'f',
    ['Use WHERE id IN (SELECT patient_id FROM patient_lab_results WHERE flag = \'HIGH\').','Project first_name, last_name, city.'],'Identifies patient cohort exhibiting abnormal lab flags needing clinical follow-up.',25,6),

  q('hc-L3-002','healthcare',3,2,'warm-up','Physicians With Zero Prescriptions Written','Dr. Evelyn Reed','Chief Medical Officer',
    'Physician practice audit: Which licensed doctors have not authored a single prescription in our electronic health record? Return doctor name and specialty.','Subquery with NOT IN on prescriptions.',['SELECT','NOT IN SUBQUERY'],['doctor_name','specialty'],
    "SELECT name AS doctor_name, specialty FROM doctors WHERE id NOT IN (SELECT DISTINCT doctor_id FROM prescriptions WHERE doctor_id IS NOT NULL) ORDER BY name;",'f',
    ['Use WHERE id NOT IN (SELECT DISTINCT doctor_id FROM prescriptions).','Select name AS doctor_name, specialty.'],'Surfaces non-prescribing specialists or newly onboarded clinical physicians.',25,6),

  q('hc-L3-003','healthcare',3,3,'warm-up','Appointments Priced Above Hospital Average','Jordan Chen','Director of Billing',
    'Fee schedule review: Retrieve all appointments whose visit fee is strictly higher than the hospital-wide average appointment fee. Return appointment id, patient id, and fee.','Scalar subquery in WHERE: fee > (SELECT AVG(fee) FROM appointments).',['SELECT','WHERE','SCALAR SUBQUERY'],['id','patient_id','fee'],
    "SELECT id, patient_id, fee FROM appointments WHERE fee > (SELECT AVG(fee) FROM appointments) ORDER BY fee DESC;",'t',
    ['Compare fee > (SELECT AVG(fee) FROM appointments).','Order by fee descending.'],'Identifies premium or specialized consultations priced above baseline outpatient averages.',25,6),

  q('hc-L3-004','healthcare',3,4,'warm-up','Inpatient Rooms More Expensive Than Facility Average','Dr. Sarah Patel','Head of Surgery',
    'Facility budgeting: List all rooms whose daily rate is greater than the average room rate across the hospital. Return room number, room type, and daily rate.','Scalar subquery: daily_rate > (SELECT AVG(daily_rate) FROM rooms).',['SELECT','WHERE','SCALAR SUBQUERY'],['room_number','room_type','daily_rate'],
    "SELECT room_number, room_type, daily_rate FROM rooms WHERE daily_rate > (SELECT AVG(daily_rate) FROM rooms) ORDER BY daily_rate DESC;",'t',
    ['Calculate facility average rate via scalar subquery.','Select room_number, room_type, daily_rate.'],'Filters for specialized inpatient beds carrying premium facility charges.',25,5),

  q('hc-L3-005','healthcare',3,5,'warm-up','Patients Never Diagnosed With Any Condition','Dr. Evelyn Reed','Chief Medical Officer',
    'Preventative care outreach: Identify patients who have registered in our system but have no recorded clinical diagnoses in their chart. Return patient id, first name, last name, and insurance.','Subquery with NOT IN on diagnoses.',['SELECT','NOT IN SUBQUERY'],['id','first_name','last_name','insurance_provider'],
    "SELECT id, first_name, last_name, insurance_provider FROM patients WHERE id NOT IN (SELECT DISTINCT patient_id FROM diagnoses WHERE patient_id IS NOT NULL) ORDER BY id;",'f',
    ['Filter WHERE id NOT IN (SELECT DISTINCT patient_id FROM diagnoses).','Return id, first_name, last_name, insurance_provider.'],'Pinpoints healthy baseline patients or missing clinical diagnostic codings.',25,6),

  q('hc-L3-006','healthcare',3,6,'warm-up','Lab Tests Costing More Than Lab Test Average Fee','Dr. Anthony Clark','Director of Pathology & Lab',
    'Diagnostic pricing: Which diagnostic lab tests carry a standard fee above the average lab test fee? Return test name, category, and standard fee.','Scalar subquery comparing standard_fee to AVG(standard_fee).',['SELECT','SCALAR SUBQUERY','WHERE'],['test_name','category','standard_fee'],
    "SELECT test_name, category, standard_fee FROM lab_tests WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests) ORDER BY standard_fee DESC;",'t',
    ['Use WHERE standard_fee > (SELECT AVG(standard_fee) FROM lab_tests).','Order by standard_fee DESC.'],'Identifies complex laboratory panels exceeding benchmark testing fees.',25,5),

  q('hc-L3-007','healthcare',3,7,'warm-up','Doctors Treating Severe Clinical Diagnoses','Dr. Evelyn Reed','Chief Medical Officer',
    'High-acuity clinical care: Find all doctors who have treated patients with a diagnosis marked as Severe. Return distinct doctor name and medical specialty.','Subquery: doctor id IN appointments linked to diagnoses where severity = Severe.',['SELECT','IN SUBQUERY','DISTINCT'],['doctor_name','specialty'],
    "SELECT DISTINCT d.name AS doctor_name, d.specialty FROM doctors d WHERE d.id IN (SELECT a.doctor_id FROM appointments a JOIN diagnoses dg ON a.id = dg.appointment_id WHERE dg.severity = 'Severe') ORDER BY d.name;",'f',
    ['Join appointments to diagnoses inside IN subquery filtering for severity = Severe.','Select doctor_name and specialty.'],'Maps clinical physicians managing high-acuity, critical patient diagnoses.',25,7),

  q('hc-L3-008','healthcare',3,8,'warm-up','Claims With Settlement Longer Than Average','Jordan Chen','Director of Billing',
    'Payer lag analysis: List all insurance claims whose settlement days took longer than the overall average settlement time. Return id, insurance provider, claim amount, and settlement days.','Scalar subquery on insurance_claims: settlement_days > (SELECT AVG(settlement_days)).',['SELECT','SCALAR SUBQUERY','WHERE'],['id','insurance_provider','claim_amount','settlement_days'],
    "SELECT id, insurance_provider, claim_amount, settlement_days FROM insurance_claims WHERE settlement_days > (SELECT AVG(settlement_days) FROM insurance_claims) ORDER BY settlement_days DESC;",'t',
    ['Compare settlement_days > (SELECT AVG(settlement_days) FROM insurance_claims).','Order descending by settlement_days.'],'Isolates delayed payer claims exceeding standard reimbursement turnaround.',25,6),

  q('hc-L3-009','healthcare',3,9,'warm-up','Patients Prescribed Maintenance Cardiovascular Drugs','Dr. Evelyn Reed','Chief Medical Officer',
    'Cardiovascular wellness initiative: Find all patients who have been prescribed either Lipitor or Plavix. Return distinct first name, last name, and city.','Subquery with IN on prescriptions for specific medication names.',['SELECT','IN SUBQUERY','DISTINCT'],['first_name','last_name','city'],
    "SELECT first_name, last_name, city FROM patients WHERE id IN (SELECT patient_id FROM prescriptions WHERE medication_name IN ('Lipitor', 'Plavix')) ORDER BY last_name, first_name;",'f',
    ['Use WHERE id IN (SELECT patient_id FROM prescriptions WHERE medication_name IN (\'Lipitor\', \'Plavix\')).','Return first_name, last_name, city.'],'Identifies cardiovascular maintenance drug patient cohorts.',25,6),

  q('hc-L3-010','healthcare',3,10,'warm-up','Billing Invoices Exceeding Average Total Charge','Jordan Chen','Director of Billing',
    'High-dollar revenue cycle review: Return all billing records where total charge is greater than the overall average total charge. Return id, patient id, total charge, and status.','Scalar subquery: total_charge > (SELECT AVG(total_charge) FROM billing).',['SELECT','SCALAR SUBQUERY','WHERE'],['id','patient_id','total_charge','status'],
    "SELECT id, patient_id, total_charge, status FROM billing WHERE total_charge > (SELECT AVG(total_charge) FROM billing) ORDER BY total_charge DESC;",'t',
    ['Use WHERE total_charge > (SELECT AVG(total_charge) FROM billing).','Order by total_charge DESC.'],'Screens for high-cost encounters exceeding average facility billing amounts.',25,5),

  q('hc-L3-011','healthcare',3,11,'warm-up','Patients With Multiple Clinical Encounters','Dr. Evelyn Reed','Chief Medical Officer',
    'Frequent visitor cohort: Which patients have attended more than 1 appointment? Return patient first name, last name, and insurance provider.','Subquery with IN grouping appointments HAVING count > 1.',['SELECT','IN SUBQUERY','GROUP BY','HAVING'],['first_name','last_name','insurance_provider'],
    "SELECT first_name, last_name, insurance_provider FROM patients WHERE id IN (SELECT patient_id FROM appointments GROUP BY patient_id HAVING COUNT(*) > 1) ORDER BY last_name, first_name;",'f',
    ['Group appointments by patient_id with HAVING COUNT(*) > 1 inside IN subquery.','Select patient details.'],'Surfaces recurring ambulatory patients utilizing hospital outpatient services.',25,6),

  q('hc-L3-012','healthcare',3,12,'warm-up','Doctors Assigned to Departments With Operating Rooms','Dr. Sarah Patel','Head of Surgery',
    'Surgical wing roster: List all doctors who belong to departments located in the Surgical Tower. Return doctor name, specialty, and phone.','Subquery with IN on departments WHERE building = Surgical Tower.',['SELECT','IN SUBQUERY'],['name','specialty','phone'],
    "SELECT name, specialty, phone FROM doctors WHERE department_id IN (SELECT id FROM departments WHERE building = 'Surgical Tower') ORDER BY name;",'f',
    ['Filter WHERE department_id IN (SELECT id FROM departments WHERE building = \'Surgical Tower\').','Select name, specialty, phone.'],'Directories physicians stationed in or operating out of the surgical wing.',25,6),

  q('hc-L3-013','healthcare',3,13,'warm-up','Lab Tests With Abnormal Low Results','Dr. Anthony Clark','Director of Pathology & Lab',
    'Diagnostic alerts: Which lab test panels have generated at least one LOW result flag? Return distinct test name and category.','Subquery with IN on patient_lab_results WHERE flag = LOW.',['SELECT','IN SUBQUERY','DISTINCT'],['test_name','category'],
    "SELECT test_name, category FROM lab_tests WHERE id IN (SELECT DISTINCT test_id FROM patient_lab_results WHERE flag = 'LOW') ORDER BY test_name;",'f',
    ['Use WHERE id IN (SELECT DISTINCT test_id FROM patient_lab_results WHERE flag = \'LOW\').','Return test_name, category.'],'Highlights diagnostic tests prone to sub-therapeutic or deficient clinical flags.',25,6),

  q('hc-L3-014','healthcare',3,14,'warm-up','Patients With Overdue Balances Above $200','Jordan Chen','Director of Billing',
    'Collections escalation: Find all patients who have an overdue billing record where the patient balance is strictly greater than $200. Return first name, last name, and city.','Subquery with IN on billing WHERE status = overdue AND patient_balance > 200.',['SELECT','IN SUBQUERY'],['first_name','last_name','city'],
    "SELECT first_name, last_name, city FROM patients WHERE id IN (SELECT patient_id FROM billing WHERE status = 'overdue' AND patient_balance > 200.00) ORDER BY last_name, first_name;",'f',
    ['Filter WHERE id IN (SELECT patient_id FROM billing WHERE status = overdue AND patient_balance > 200).','Project patient demographic details.'],'Identifies self-pay accounts subject to overdue collection letters.',25,6),

  q('hc-L3-015','healthcare',3,15,'warm-up','Doctors Whose Average Visit Fee Exceeds Overall Benchmark','Jordan Chen','Director of Billing',
    'Physician fee variance: List doctors whose individual average completed appointment fee exceeds the overall completed appointment fee average. Return doctor name and specialty.','Subquery: doctor_id IN (SELECT doctor_id FROM appointments WHERE status = completed GROUP BY doctor_id HAVING AVG(fee) > ...).',['SELECT','IN SUBQUERY','HAVING'],['doctor_name','specialty'],
    "SELECT name AS doctor_name, specialty FROM doctors WHERE id IN (SELECT doctor_id FROM appointments WHERE status = 'completed' GROUP BY doctor_id HAVING AVG(fee) > (SELECT AVG(fee) FROM appointments WHERE status = 'completed')) ORDER BY name;",'f',
    ['Calculate benchmark average fee across completed appointments.','Find doctors whose AVG(fee) exceeds benchmark in HAVING clause.'],'Identifies physicians commanding higher-than-average encounter reimbursement.',25,7),

  q('hc-L3-016','healthcare',3,16,'warm-up','Patients Receiving Glucophage For Diabetes','Dr. Evelyn Reed','Chief Medical Officer',
    'Metabolic care protocol: Retrieve all patients who have been prescribed Glucophage. Return first name, last name, and insurance provider.','Subquery with IN on prescriptions WHERE medication_name = Glucophage.',['SELECT','IN SUBQUERY'],['first_name','last_name','insurance_provider'],
    "SELECT first_name, last_name, insurance_provider FROM patients WHERE id IN (SELECT patient_id FROM prescriptions WHERE medication_name = 'Glucophage') ORDER BY last_name, first_name;",'f',
    ['Filter WHERE id IN (SELECT patient_id FROM prescriptions WHERE medication_name = \'Glucophage\').','Select first_name, last_name, insurance_provider.'],'Monitors type 2 diabetic patient prescription coverage.',25,5),

  q('hc-L3-017','healthcare',3,17,'warm-up','Nurses Working In Departments With Intensive Care Beds','Marcus Thorne','Chief Nursing Officer',
    'Critical care nursing roster: Find all registered nurses assigned to departments that maintain ICU rooms. Return nurse name, shift, and certification level.','Subquery with IN on departments that have rooms with room_type = ICU.',['SELECT','IN SUBQUERY'],['name','shift','certification_level'],
    "SELECT name, shift, certification_level FROM nurses WHERE department_id IN (SELECT DISTINCT department_id FROM rooms WHERE room_type = 'ICU') ORDER BY name;",'f',
    ['Find department_ids containing ICU rooms via subquery.','Select nurses in those department_ids.'],'Validates nurse staffing coverage in critical care inpatient units.',25,6),

  q('hc-L3-018','healthcare',3,18,'warm-up','Approved Claims Greater Than Overall Approved Average','Jordan Chen','Director of Billing',
    'Reimbursement performance: Retrieve all insurance claims with status approved where the approved amount exceeds the average approved claim amount. Return id, insurance provider, and approved amount.','Scalar subquery: approved_amount > (SELECT AVG(approved_amount) FROM insurance_claims WHERE status = approved).',['SELECT','SCALAR SUBQUERY','WHERE'],['id','insurance_provider','approved_amount'],
    "SELECT id, insurance_provider, approved_amount FROM insurance_claims WHERE status = 'approved' AND approved_amount > (SELECT AVG(approved_amount) FROM insurance_claims WHERE status = 'approved') ORDER BY approved_amount DESC;",'t',
    ['Use WHERE status = approved AND approved_amount > (SELECT AVG(approved_amount)...).','Order by approved_amount DESC.'],'Tracks top-tier institutional claim payments approved by health plans.',25,6),

  q('hc-L3-019','healthcare',3,19,'warm-up','Patients Diagnosed With Asthma Or Hypertension','Dr. Evelyn Reed','Chief Medical Officer',
    'Chronic condition registry: List all patients who have been diagnosed with either Chronic Allergic Asthma (J45) or Essential Hypertension (I10). Return first name, last name, and date of birth.','Subquery with IN on diagnoses WHERE icd10_code IN (J45, I10).',['SELECT','IN SUBQUERY'],['first_name','last_name','dob'],
    "SELECT first_name, last_name, dob FROM patients WHERE id IN (SELECT patient_id FROM diagnoses WHERE icd10_code IN ('J45', 'I10')) ORDER BY last_name, first_name;",'f',
    ['Filter WHERE id IN (SELECT patient_id FROM diagnoses WHERE icd10_code IN (\'J45\', \'I10\')).','Select first_name, last_name, dob.'],'Identifies chronic respiratory and cardiovascular patient registry members.',25,5),

  q('hc-L3-020','healthcare',3,20,'warm-up','Denied Insurance Claims Linked to Billing Records','Jordan Chen','Director of Billing',
    'Payer denial investigation: Show billing id, total charge, and copay amount for billing vouchers associated with denied insurance claims.','Subquery with IN on insurance_claims WHERE status = denied.',['SELECT','IN SUBQUERY'],['id','total_charge','copay_amount'],
    "SELECT id, total_charge, copay_amount FROM billing WHERE id IN (SELECT billing_id FROM insurance_claims WHERE status = 'denied') ORDER BY total_charge DESC;",'t',
    ['Filter billing WHERE id IN (SELECT billing_id FROM insurance_claims WHERE status = \'denied\').','Order by total_charge DESC.'],'Isolates financial records requiring immediate claims appeal or re-submission.',25,6),

  q('hc-L3-021','healthcare',3,21,'warm-up','Patients Having Both Morning And Evening Appointments','Dr. Evelyn Reed','Chief Medical Officer',
    'Care scheduling patterns: Which patients have had appointments scheduled at 9:00 AM or earlier? Return distinct patient first name, last name, and city.','Subquery with IN filtering appointment_date time component.',['SELECT','IN SUBQUERY','DISTINCT'],['first_name','last_name','city'],
    "SELECT first_name, last_name, city FROM patients WHERE id IN (SELECT patient_id FROM appointments WHERE EXTRACT(HOUR FROM appointment_date) <= 9) ORDER BY last_name, first_name;",'f',
    ['Extract hour from appointment_date <= 9 inside IN subquery.','Select distinct first_name, last_name, city.'],'Identifies early morning outpatient clinic attendee cohort.',25,6),

  q('hc-L3-022','healthcare',3,22,'warm-up','Lab Tests With Zero Recorded High Flags','Dr. Anthony Clark','Director of Pathology & Lab',
    'Quality control: Which lab tests have NEVER yielded a HIGH result flag in any patient test result? Return test name and category.','Subquery with NOT IN on patient_lab_results WHERE flag = HIGH.',['SELECT','NOT IN SUBQUERY'],['test_name','category'],
    "SELECT test_name, category FROM lab_tests WHERE id NOT IN (SELECT DISTINCT test_id FROM patient_lab_results WHERE flag = 'HIGH') ORDER BY test_name;",'f',
    ['Filter WHERE id NOT IN (SELECT DISTINCT test_id FROM patient_lab_results WHERE flag = \'HIGH\').','Select test_name, category.'],'Validates diagnostic panels exhibiting exclusively normal or low distributions.',25,6),

  q('hc-L3-023','healthcare',3,23,'warm-up','Doctors With Urgent Appointments Scheduled','Dr. Sarah Patel','Head of Surgery',
    'Urgent clinic coverage: Find all doctors who have conducted at least one appointment marked with appointment_type Urgent. Return doctor name, specialty, and phone.','Subquery with IN on appointments WHERE appointment_type = Urgent.',['SELECT','IN SUBQUERY'],['name','specialty','phone'],
    "SELECT name, specialty, phone FROM doctors WHERE id IN (SELECT DISTINCT doctor_id FROM appointments WHERE appointment_type = 'Urgent') ORDER BY name;",'f',
    ['Filter doctors WHERE id IN (SELECT DISTINCT doctor_id FROM appointments WHERE appointment_type = \'Urgent\').','Select name, specialty, phone.'],'Surfaces physicians active in acute and urgent outpatient consultations.',25,5),

  q('hc-L3-024','healthcare',3,24,'warm-up','Prescriptions For Patients Living in Queens or Bronx','Dr. Evelyn Reed','Chief Medical Officer',
    'Outer-borough medication audit: Retrieve all prescriptions written for patients whose city is Queens or Bronx. Return prescription id, patient_id, medication name, and dosage.','Subquery with IN on patients WHERE city IN (Queens, Bronx).',['SELECT','IN SUBQUERY'],['id','patient_id','medication_name','dosage'],
    "SELECT id, patient_id, medication_name, dosage FROM prescriptions WHERE patient_id IN (SELECT id FROM patients WHERE city IN ('Queens', 'Bronx')) ORDER BY id ASC;",'f',
    ['Filter WHERE patient_id IN (SELECT id FROM patients WHERE city IN (\'Queens\', \'Bronx\')).','Select prescription details.'],'Audits regional outpatient pharmacy dispensing patterns across city boroughs.',25,6),

  q('hc-L3-025','healthcare',3,25,'warm-up','Billing Records With Copay Above Median Threshold','Jordan Chen','Director of Billing',
    'Patient financial responsibility: List all billing vouchers where copay_amount exceeds $50.00 and status is paid. Return id, patient id, copay amount, and total charge.','Filter billing WHERE copay_amount > 50 AND status = paid.',['SELECT','WHERE','AND'],['id','patient_id','copay_amount','total_charge'],
    "SELECT id, patient_id, copay_amount, total_charge FROM billing WHERE copay_amount > 50.00 AND status = 'paid' ORDER BY copay_amount DESC;",'t',
    ['Filter WHERE copay_amount > 50.00 AND status = \'paid\'.','Order by copay_amount DESC.'],'Identifies settled accounts carrying significant point-of-care patient copays.',25,5),

  // 26–50: Core (Correlated Subqueries, EXISTS / NOT EXISTS, Derived Tables)
  q('hc-L3-026','healthcare',3,26,'core','Patients With At Least One Completed Visit (EXISTS)','Dr. Evelyn Reed','Chief Medical Officer',
    'Verified clinic attendee roster: Identify all patients who have at least one completed appointment using an EXISTS clause. Return patient first name, last name, and city.','EXISTS clause correlating patients with appointments WHERE status = completed.',['SELECT','EXISTS','CORRELATED SUBQUERY'],['first_name','last_name','city'],
    "SELECT p.first_name, p.last_name, p.city FROM patients p WHERE EXISTS (SELECT 1 FROM appointments a WHERE a.patient_id = p.id AND a.status = 'completed') ORDER BY p.last_name, p.first_name;",'f',
    ['Correlate outer patient p with appointments a on a.patient_id = p.id.','Add condition a.status = \'completed\'.'],'Verifies patients with confirmed, completed clinical care visits.',25,6),

  q('hc-L3-027','healthcare',3,27,'core','Patients With No Diagnoses Recorded (NOT EXISTS)','Dr. Evelyn Reed','Chief Medical Officer',
    'Clinical documentation gap: Find all patients who have completed an appointment but have zero recorded diagnoses using NOT EXISTS. Return first name, last name, and insurance provider.','NOT EXISTS correlating patients with diagnoses, while having completed appointment.',['SELECT','NOT EXISTS','CORRELATED SUBQUERY'],['first_name','last_name','insurance_provider'],
    "SELECT p.first_name, p.last_name, p.insurance_provider FROM patients p WHERE EXISTS (SELECT 1 FROM appointments a WHERE a.patient_id = p.id AND a.status = 'completed') AND NOT EXISTS (SELECT 1 FROM diagnoses dg WHERE dg.patient_id = p.id) ORDER BY p.last_name, p.first_name;",'f',
    ['Check EXISTS completed appointment and NOT EXISTS in diagnoses.','Select first_name, last_name, insurance_provider.'],'Identifies completed visits lacking required clinical diagnostic coding.',25,7),

  q('hc-L3-028','healthcare',3,28,'core','Doctors With Above-Average Department Encounter Fees','Jordan Chen','Director of Billing',
    'Physician rate variance: Find doctors whose individual average appointment fee is strictly greater than the average appointment fee of their department. Return doctor name, specialty, and department id.','Correlated subquery: AVG(fee) for doctor > AVG(fee) for that department.',['SELECT','CORRELATED SUBQUERY','AVG','GROUP BY'],['doctor_name','specialty','department_id'],
    "SELECT d.name AS doctor_name, d.specialty, d.department_id FROM doctors d WHERE (SELECT AVG(a.fee) FROM appointments a WHERE a.doctor_id = d.id) > (SELECT AVG(a2.fee) FROM appointments a2 JOIN doctors d2 ON a2.doctor_id = d2.id WHERE d2.department_id = d.department_id) ORDER BY d.name;",'f',
    ['Compare doctor average fee against department average fee via correlated subqueries.','Select doctor_name, specialty, department_id.'],'Identifies clinicians commanding premium visit fees relative to peers in the same specialty department.',25,8),

  q('hc-L3-029','healthcare',3,29,'core','Rooms Priced Higher Than Room Type Benchmark','Dr. Sarah Patel','Head of Surgery',
    'Bed pricing consistency: Which rooms are priced above the average daily rate for their specific room type (e.g. Standard, ICU, Suite)? Return room number, room type, and daily rate.','Correlated subquery: daily_rate > (SELECT AVG(r2.daily_rate) FROM rooms r2 WHERE r2.room_type = r.room_type).',['SELECT','CORRELATED SUBQUERY','AVG'],['room_number','room_type','daily_rate'],
    "SELECT r.room_number, r.room_type, r.daily_rate FROM rooms r WHERE r.daily_rate > (SELECT AVG(r2.daily_rate) FROM rooms r2 WHERE r2.room_type = r.room_type) ORDER BY r.room_type, r.daily_rate DESC;",'t',
    ['Calculate room type average in correlated subquery matching on r2.room_type = r.room_type.','Filter where r.daily_rate exceeds that benchmark.'],'Identifies individual beds priced above category peers.',25,7),

  q('hc-L3-030','healthcare',3,30,'core','Patients With Abnormal Lab Results And Active Prescriptions','Dr. Evelyn Reed','Chief Medical Officer',
    'Complex patient identification: Find all patients who have both a HIGH lab result flag AND at least one prescription on file. Return distinct first name, last name, and city.','EXISTS for HIGH lab result AND EXISTS for prescription.',['SELECT','EXISTS','AND','DISTINCT'],['first_name','last_name','city'],
    "SELECT p.first_name, p.last_name, p.city FROM patients p WHERE EXISTS (SELECT 1 FROM patient_lab_results plr WHERE plr.patient_id = p.id AND plr.flag = 'HIGH') AND EXISTS (SELECT 1 FROM prescriptions pr WHERE pr.patient_id = p.id) ORDER BY p.last_name, p.first_name;",'f',
    ['Use two correlated EXISTS clauses: one for HIGH lab flag and one for prescriptions.','Project patient first_name, last_name, city.'],'Identifies medically managed patients actively monitored with abnormal biomarker flags.',25,7),

  q('hc-L3-031','healthcare',3,31,'core','Doctors Who Have Never Had A Patient No-Show','Dr. Evelyn Reed','Chief Medical Officer',
    'Physician schedule reliability: List doctors who have conducted at least one appointment and have never had a no_show status. Return doctor name and specialty.','EXISTS completed appointments AND NOT EXISTS no_show appointments.',['SELECT','EXISTS','NOT EXISTS'],['doctor_name','specialty'],
    "SELECT d.name AS doctor_name, d.specialty FROM doctors d WHERE EXISTS (SELECT 1 FROM appointments a WHERE a.doctor_id = d.id) AND NOT EXISTS (SELECT 1 FROM appointments a2 WHERE a2.doctor_id = d.id AND a2.status = 'no_show') ORDER BY d.name;",'f',
    ['Verify doctor has appointments with EXISTS and zero no_shows with NOT EXISTS.','Select doctor_name and specialty.'],'Highlights physicians with 100% patient attendance compliance.',25,7),

  q('hc-L3-032','healthcare',3,32,'core','Billing Records With Balance Exceeding Status Average','Jordan Chen','Director of Billing',
    'Accounts receivable stratification: Find all billing records where patient balance is strictly greater than the average patient balance for records of that same status. Return id, status, and patient balance.','Correlated subquery: patient_balance > (SELECT AVG(b2.patient_balance) FROM billing b2 WHERE b2.status = b.status).',['SELECT','CORRELATED SUBQUERY','AVG'],['id','status','patient_balance'],
    "SELECT b.id, b.status, b.patient_balance FROM billing b WHERE b.patient_balance > (SELECT AVG(b2.patient_balance) FROM billing b2 WHERE b2.status = b.status) ORDER BY b.status, b.patient_balance DESC;",'t',
    ['Compare patient_balance with correlated status-level average.','Order by status and patient_balance descending.'],'Surfaces balance anomalies within paid, pending, and overdue billing buckets.',25,7),

  q('hc-L3-033','healthcare',3,33,'core','Claims Settled Faster Than Payer Average Time','Jordan Chen','Director of Billing',
    'Payer adjudication velocity: List insurance claims that settled faster (fewer settlement days) than the average settlement days for that specific insurance provider. Return id, insurance provider, and settlement days.','Correlated subquery: settlement_days < (SELECT AVG(ic2.settlement_days) FROM insurance_claims ic2 WHERE ic2.insurance_provider = ic.insurance_provider).',['SELECT','CORRELATED SUBQUERY','AVG'],['id','insurance_provider','settlement_days'],
    "SELECT ic.id, ic.insurance_provider, ic.settlement_days FROM insurance_claims ic WHERE ic.settlement_days < (SELECT AVG(ic2.settlement_days) FROM insurance_claims ic2 WHERE ic2.insurance_provider = ic.insurance_provider) ORDER BY ic.insurance_provider, ic.settlement_days ASC;",'t',
    ['Correlate subquery on insurance_provider to compute payer-specific average turnaround.','Filter WHERE settlement_days < payer average.'],'Identifies fast-tracked claim reimbursements beating standard payer averages.',25,7),

  q('hc-L3-034','healthcare',3,34,'core','Departments With Higher Than Overall Bed Count (Derived Table)','Marcus Thorne','Chief Nursing Officer',
    'Facility scale analysis: Find departments whose total bed count is greater than the average bed count per department. Return department name and total beds.','Derived table aggregating room count per department, compared to average in outer WHERE.',['SELECT','DERIVED TABLE','GROUP BY','AVG'],['department_name','total_beds'],
    "SELECT dept_beds.name AS department_name, dept_beds.bed_count AS total_beds FROM (SELECT d.name, COUNT(r.id) AS bed_count FROM departments d JOIN rooms r ON d.id = r.department_id GROUP BY d.name) dept_beds WHERE dept_beds.bed_count > (SELECT AVG(sub.cnt) FROM (SELECT COUNT(r2.id) AS cnt FROM rooms r2 GROUP BY r2.department_id) sub) ORDER BY total_beds DESC;",'t',
    ['Aggregate rooms per department in a derived table.','Filter departments exceeding the average departmental bed count.'],'Identifies primary inpatient clinical units with above-average bed capacity.',25,8),

  q('hc-L3-035','healthcare',3,35,'core','Patients Having Diagnoses Across Multiple Specialties','Dr. Evelyn Reed','Chief Medical Officer',
    'Complex multimorbidity tracking: Find patients who have received diagnoses from doctors in more than one distinct specialty. Return patient first name, last name, and distinct specialty count.','Derived table or subquery counting distinct doctor specialties per patient > 1.',['SELECT','JOIN','GROUP BY','HAVING','COUNT DISTINCT'],['first_name','last_name','specialty_count'],
    "SELECT p.first_name, p.last_name, COUNT(DISTINCT d.specialty) AS specialty_count FROM patients p JOIN diagnoses dg ON p.id = dg.patient_id JOIN appointments a ON dg.appointment_id = a.id JOIN doctors d ON a.doctor_id = d.id GROUP BY p.first_name, p.last_name HAVING COUNT(DISTINCT d.specialty) > 1 ORDER BY specialty_count DESC, p.last_name;",'t',
    ['Join patients → diagnoses → appointments → doctors.','Group by patient and filter HAVING COUNT(DISTINCT d.specialty) > 1.'],'Highlights multi-disciplinary clinical care patients requiring care coordination.',25,8),

  q('hc-L3-036','healthcare',3,36,'core','Patients With No Active Insurance Claims (NOT EXISTS)','Jordan Chen','Director of Billing',
    'Self-pay / Unbilled patients: List all patients who have billing records, but have NO corresponding insurance claims submitted. Return patient id, total billed sum.','NOT EXISTS correlating billing to insurance_claims.',['SELECT','NOT EXISTS','GROUP BY'],['patient_id','unclaimed_total'],
    "SELECT b.patient_id, ROUND(SUM(b.total_charge), 2) AS unclaimed_total FROM billing b WHERE NOT EXISTS (SELECT 1 FROM insurance_claims ic WHERE ic.billing_id = b.id) GROUP BY b.patient_id ORDER BY unclaimed_total DESC;",'t',
    ['Use NOT EXISTS to find billing records absent in insurance_claims.','Group by patient_id and sum total_charge.'],'Surfaces self-pay patient charges or claims not forwarded to third-party payers.',25,7),

  q('hc-L3-037','healthcare',3,37,'core','Doctors Handling More Visits Than Department Average','Dr. Evelyn Reed','Chief Medical Officer',
    'Clinical productivity: Identify doctors who have completed more appointments than the average doctor in their department. Return doctor name, specialty, and completed visits count.','Correlated subquery comparing doctor completed visits to department average.',['SELECT','CORRELATED SUBQUERY','COUNT','GROUP BY'],['doctor_name','specialty','completed_visits'],
    "SELECT d.name AS doctor_name, d.specialty, COUNT(a.id) AS completed_visits FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.id, d.name, d.specialty, d.department_id HAVING COUNT(a.id) > (SELECT AVG(sub.cnt) FROM (SELECT COUNT(a2.id) AS cnt FROM appointments a2 JOIN doctors d2 ON a2.doctor_id = d2.id WHERE a2.status = 'completed' AND d2.department_id = d.department_id GROUP BY d2.id) sub) ORDER BY completed_visits DESC;",'t',
    ['Compute doctor completed appointments.','Compare in HAVING against average completed appointments for doctors in that department.'],'Highlights high-volume physician performers within clinical departments.',25,8),

  q('hc-L3-038','healthcare',3,38,'core','Occupied ICU Bed Directory With Current Nurse On Duty','Marcus Thorne','Chief Nursing Officer',
    'ICU floor monitoring: List all currently occupied ICU rooms with their room number, daily rate, and the department name. Use EXISTS to ensure the department has active day nurses.','EXISTS verifying active Day shift nurses in the department.',['SELECT','INNER JOIN','EXISTS'],['room_number','daily_rate','department_name'],
    "SELECT r.room_number, r.daily_rate, d.name AS department_name FROM rooms r JOIN departments d ON r.department_id = d.id WHERE r.room_type = 'ICU' AND r.is_occupied = TRUE AND EXISTS (SELECT 1 FROM nurses n WHERE n.department_id = d.id AND n.shift = 'Day') ORDER BY r.room_number;",'f',
    ['Filter rooms for ICU and is_occupied = TRUE.','Verify day nurse coverage using EXISTS subquery on nurses.'],'Monitors staffed and active critical care beds.',25,7),

  q('hc-L3-039','healthcare',3,39,'core','Patients Prescribed Amoxicillin With Respiratory Diagnosis','Dr. Evelyn Reed','Chief Medical Officer',
    'Antibiotic stewardship: Identify patients who were prescribed Amoxicillin and also have an Asthma or respiratory diagnosis (ICD-10 J45). Return first name, last name, and city.','EXISTS checking for prescription Amoxicillin AND diagnosis J45.',['SELECT','EXISTS','AND'],['first_name','last_name','city'],
    "SELECT p.first_name, p.last_name, p.city FROM patients p WHERE EXISTS (SELECT 1 FROM prescriptions pr WHERE pr.patient_id = p.id AND pr.medication_name = 'Amoxicillin') AND EXISTS (SELECT 1 FROM diagnoses dg WHERE dg.patient_id = p.id AND dg.icd10_code = 'J45') ORDER BY p.last_name, p.first_name;",'f',
    ['Check EXISTS for Amoxicillin prescription and EXISTS for J45 diagnosis.','Select patient details.'],'Clinical pharmacology review for appropriate antibiotic indication.',25,7),

  q('hc-L3-040','healthcare',3,40,'core','Insurance Providers With Denial Rates Above Average','Jordan Chen','Director of Billing',
    'Payer friction index: Find insurance providers whose percentage of denied claims is strictly greater than the overall hospital claim denial rate. Return insurance provider and denied claim count.','Subquery calculating overall denial percentage compared to payer denial count.',['SELECT','GROUP BY','HAVING','COUNT'],['insurance_provider','denied_count'],
    "SELECT insurance_provider, COUNT(*) AS denied_count FROM insurance_claims WHERE status = 'denied' GROUP BY insurance_provider HAVING COUNT(*) > (SELECT AVG(sub.cnt) FROM (SELECT COUNT(*) AS cnt FROM insurance_claims WHERE status = 'denied' GROUP BY insurance_provider) sub) ORDER BY denied_count DESC;",'t',
    ['Group denied claims by insurance_provider.','Filter HAVING denied count exceeds the average denied count across payers.'],'Identifies insurers with disproportionate clinical claim rejections.',25,8),

  q('hc-L3-041','healthcare',3,41,'core','Patients With Highest Single Billing Voucher','Jordan Chen','Director of Billing',
    'Top invoice patient audit: Find the patient details for any billing record equal to the maximum total charge in the system. Return first name, last name, total charge, and insurance provider.','Subquery matching total_charge = (SELECT MAX(total_charge) FROM billing).',['SELECT','JOIN','MAX','SCALAR SUBQUERY'],['first_name','last_name','total_charge','insurance_provider'],
    "SELECT p.first_name, p.last_name, b.total_charge, p.insurance_provider FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.total_charge = (SELECT MAX(total_charge) FROM billing);",'f',
    ['Use WHERE total_charge = (SELECT MAX(total_charge) FROM billing).','Join billing to patients.'],'Audits the single largest inpatient/outpatient voucher billed by the hospital.',25,6),

  q('hc-L3-042','healthcare',3,42,'core','Departments With Zero Telehealth Consultations','Dr. Evelyn Reed','Chief Medical Officer',
    'Virtual care penetration: Which clinical departments have never conducted a Telehealth appointment? Return department name and building.','NOT EXISTS correlating departments through doctors to appointments where appointment_type = Telehealth.',['SELECT','NOT EXISTS','CORRELATED SUBQUERY'],['department_name','building'],
    "SELECT d.name AS department_name, d.building FROM departments d WHERE NOT EXISTS (SELECT 1 FROM doctors doc JOIN appointments a ON doc.id = a.doctor_id WHERE doc.department_id = d.id AND a.appointment_type = 'Telehealth') ORDER BY d.name;",'f',
    ['Correlate department d through doctors doc and appointments a.','Filter NOT EXISTS appointment_type = \'Telehealth\'.' ],'Surfaces departments lagging in digital telemedicine adoption.',25,7),

  q('hc-L3-043','healthcare',3,43,'core','Lab Tests With Fee Higher Than Category Average','Dr. Anthony Clark','Director of Pathology & Lab',
    'Fee alignment: List all lab tests whose standard fee is strictly above the average standard fee for lab tests in that same category. Return test name, category, and standard fee.','Correlated subquery comparing standard_fee with category average.',['SELECT','CORRELATED SUBQUERY','AVG'],['test_name','category','standard_fee'],
    "SELECT lt.test_name, lt.category, lt.standard_fee FROM lab_tests lt WHERE lt.standard_fee > (SELECT AVG(lt2.standard_fee) FROM lab_tests lt2 WHERE lt2.category = lt.category) ORDER BY lt.category, lt.standard_fee DESC;",'t',
    ['Compute category average standard_fee in correlated subquery.','Select tests priced above their category benchmark.'],'Assesses laboratory pricing consistency across test disciplines.',25,7),

  q('hc-L3-044','healthcare',3,44,'core','Patients With Out-Of-Pocket Balance Greater Than Copay','Jordan Chen','Director of Billing',
    'High patient liability: Identify patients whose unpaid patient balance is strictly greater than 3 times their copay amount. Return first name, last name, copay amount, and patient balance.','Filter billing WHERE patient_balance > 3 * copay_amount.',['SELECT','JOIN','WHERE'],['first_name','last_name','copay_amount','patient_balance'],
    "SELECT p.first_name, p.last_name, b.copay_amount, b.patient_balance FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.patient_balance > (3 * b.copay_amount) ORDER BY b.patient_balance DESC;",'t',
    ['Join billing to patients.','Filter WHERE b.patient_balance > 3 * b.copay_amount.'],'Identifies patients facing high deductible or non-covered cost liabilities.',25,6),

  q('hc-L3-045','healthcare',3,45,'core','Doctors With More Prescriptions Than The Hospital Average','Dr. Evelyn Reed','Chief Medical Officer',
    'Prescribing volume leaders: Which doctors have authored more prescriptions than the average doctor prescription volume? Return doctor name, specialty, and total prescriptions.','Subquery with HAVING COUNT(*) > (SELECT AVG(cnt) FROM (SELECT COUNT(*) ...)).',['SELECT','JOIN','GROUP BY','HAVING','AVG'],['doctor_name','specialty','prescriptions_count'],
    "SELECT d.name AS doctor_name, d.specialty, COUNT(pr.id) AS prescriptions_count FROM doctors d JOIN prescriptions pr ON d.id = pr.doctor_id GROUP BY d.id, d.name, d.specialty HAVING COUNT(pr.id) > (SELECT AVG(sub.cnt) FROM (SELECT COUNT(pr2.id) AS cnt FROM prescriptions pr2 GROUP BY pr2.doctor_id) sub) ORDER BY prescriptions_count DESC;",'t',
    ['Count prescriptions per doctor.','Filter in HAVING against average prescriptions per doctor.'],'Identifies clinicians driving substantial pharmacotherapy order volume.',25,8),

  q('hc-L3-046','healthcare',3,46,'core','Patients With High Cholesterol Lab Results','Dr. Anthony Clark','Director of Pathology & Lab',
    'Cardiovascular risk screening: Find all patients whose Lipid Panel result value was strictly greater than the test normal_range_max (200.00). Return patient first name, last name, and result value.','JOIN patient_lab_results with patients and lab_tests WHERE test_name = Lipid Panel AND result_value > normal_range_max.',['SELECT','INNER JOIN','WHERE'],['first_name','last_name','result_value'],
    "SELECT p.first_name, p.last_name, plr.result_value FROM patient_lab_results plr JOIN patients p ON plr.patient_id = p.id JOIN lab_tests lt ON plr.test_id = lt.id WHERE lt.test_name = 'Lipid Panel' AND plr.result_value > lt.normal_range_max ORDER BY plr.result_value DESC;",'t',
    ['Join lab results to patients and lab_tests.','Filter for Lipid Panel and result_value > normal_range_max.'],'Identifies hyperlipidemic patients requiring statin therapy titration.',25,7),

  q('hc-L3-047','healthcare',3,47,'core','Rooms In Departments Having Full Occupancy','Dr. Sarah Patel','Head of Surgery',
    'Inpatient capacity stress: List department names where at least 50% of the department rooms are currently marked is_occupied = TRUE. Return department name and occupied ratio.','Derived table or HAVING comparing SUM(CASE WHEN is_occupied) / COUNT(*).',['SELECT','GROUP BY','HAVING','CASE'],['department_name','occupied_count','total_rooms'],
    "SELECT d.name AS department_name, SUM(CASE WHEN r.is_occupied THEN 1 ELSE 0 END) AS occupied_count, COUNT(r.id) AS total_rooms FROM departments d JOIN rooms r ON d.id = r.department_id GROUP BY d.name HAVING SUM(CASE WHEN r.is_occupied THEN 1 ELSE 0 END)::FLOAT / COUNT(r.id) >= 0.50 ORDER BY occupied_count DESC;",'t',
    ['Group rooms by department.','Filter HAVING occupied percentage >= 50%.'],'Highlights hospital departments experiencing high bed census utilization.',25,8),

  q('hc-L3-048','healthcare',3,48,'core','Patients With Multiple Severe Diagnoses','Dr. Evelyn Reed','Chief Medical Officer',
    'High-risk clinical cohort: Find patients who have been diagnosed with more than 1 distinct condition marked as Severe. Return first name, last name, and severe condition count.','GROUP BY patient HAVING COUNT(*) > 1 with severity = Severe.',['SELECT','JOIN','GROUP BY','HAVING'],['first_name','last_name','severe_count'],
    "SELECT p.first_name, p.last_name, COUNT(dg.id) AS severe_count FROM patients p JOIN diagnoses dg ON p.id = dg.patient_id WHERE dg.severity = 'Severe' GROUP BY p.id, p.first_name, p.last_name HAVING COUNT(dg.id) > 1 ORDER BY severe_count DESC, p.last_name;",'t',
    ['Join patients to diagnoses filtering for severity = Severe.','Group by patient and filter HAVING COUNT > 1.'],'Pins down patients with multiple critical life-threatening conditions.',25,7),

  q('hc-L3-049','healthcare',3,49,'core','Claims With Approval Percentage Below Payer Average','Jordan Chen','Director of Billing',
    'Adjudication haircut audit: List insurance claims where the approved_amount is less than 85% of claim_amount. Return id, insurance provider, claim amount, and approved amount.','Filter claims WHERE approved_amount < 0.85 * claim_amount.',['SELECT','WHERE','ARITHMETIC'],['id','insurance_provider','claim_amount','approved_amount'],
    "SELECT id, insurance_provider, claim_amount, approved_amount FROM insurance_claims WHERE approved_amount < (0.85 * claim_amount) ORDER BY claim_amount DESC;",'t',
    ['Filter WHERE approved_amount < (0.85 * claim_amount).','Order by claim_amount DESC.'],'Surfaces claims experiencing steep contractual underpayments or payer reductions.',25,6),

  q('hc-L3-050','healthcare',3,50,'core','Doctors With Highest Fee-To-Appointment Ratio','Jordan Chen','Director of Billing',
    'Outpatient consultation yield: Calculate average fee per completed appointment for each doctor, returning only those whose average fee exceeds $200. Return doctor name, specialty, and average fee.','GROUP BY doctor HAVING AVG(fee) > 200 on completed appointments.',['SELECT','JOIN','GROUP BY','HAVING','AVG'],['doctor_name','specialty','avg_fee'],
    "SELECT d.name AS doctor_name, d.specialty, ROUND(AVG(a.fee), 2) AS avg_fee FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.id, d.name, d.specialty HAVING AVG(a.fee) > 200.00 ORDER BY avg_fee DESC;",'t',
    ['Join doctors to completed appointments.','Group by doctor and filter HAVING AVG(fee) > 200.00.'],'Identifies clinicians with top billing realization per outpatient visit.',25,7),

  // 51–75: Advanced (CASE Statements, Conditional Aggregations, Complex Subqueries)
  q('hc-L3-051','healthcare',3,51,'advanced','Patient Age Cohort Classification','Dr. Evelyn Reed','Chief Medical Officer',
    'Demographic segmentation: Classify each patient into an age group based on their date of birth: Senior (born before 1965), Middle-Aged (1965 to 1985), Young Adult (after 1985). Return patient name, birth date, and age group.','CASE statement evaluating dob year.',['SELECT','CASE WHEN'],['name','dob','age_group'],
    "SELECT (first_name || ' ' || last_name) AS name, dob, CASE WHEN dob < '1965-01-01' THEN 'Senior' WHEN dob BETWEEN '1965-01-01' AND '1985-12-31' THEN 'Middle-Aged' ELSE 'Young Adult' END AS age_group FROM patients ORDER BY dob ASC;",'t',
    ['Use CASE WHEN dob < \'1965-01-01\' THEN \'Senior\'...','Concatenate first_name and last_name.'],'Demographic cohort analysis for specialized clinical care pathways.',25,6),

  q('hc-L3-052','healthcare',3,52,'advanced','Payer Settlement Speed Performance Tiers','Jordan Chen','Director of Billing',
    'Reimbursement cycle categorization: Categorize each insurance claim into settlement tiers: Fast (< 20 days), Standard (20 to 35 days), Slow (> 35 days). Return claim id, insurance provider, settlement days, and speed tier.','CASE statement on settlement_days.',['SELECT','CASE WHEN'],['id','insurance_provider','settlement_days','speed_tier'],
    "SELECT id, insurance_provider, settlement_days, CASE WHEN settlement_days < 20 THEN 'Fast' WHEN settlement_days BETWEEN 20 AND 35 THEN 'Standard' ELSE 'Slow' END AS speed_tier FROM insurance_claims ORDER BY settlement_days DESC;",'t',
    ['Evaluate settlement_days using CASE WHEN.','Select id, insurance_provider, settlement_days, speed_tier.'],'Classifies payer turnaround speed into operational service-level tiers.',25,6),

  q('hc-L3-053','healthcare',3,53,'advanced','Abnormal Lab Result Flagging Logic','Dr. Anthony Clark','Director of Pathology & Lab',
    'Laboratory validation engine: Categorize lab results based on standard reference ranges: Low (result_value < normal_range_min), High (result_value > normal_range_max), Normal (otherwise). Return patient_id, test_name, result_value, and calculated_flag.','JOIN patient_lab_results with lab_tests, CASE statement evaluating result_value vs normal ranges.',['SELECT','INNER JOIN','CASE WHEN'],['patient_id','test_name','result_value','calculated_flag'],
    "SELECT plr.patient_id, lt.test_name, plr.result_value, CASE WHEN plr.result_value < lt.normal_range_min THEN 'Low' WHEN plr.result_value > lt.normal_range_max THEN 'High' ELSE 'Normal' END AS calculated_flag FROM patient_lab_results plr JOIN lab_tests lt ON plr.test_id = lt.id ORDER BY plr.patient_id, lt.test_name;",'f',
    ['Join patient_lab_results to lab_tests.','Evaluate result_value against normal_range_min and normal_range_max in CASE.'],'Recomputes clinical abnormality flags against canonical reference thresholds.',25,7),

  q('hc-L3-054','healthcare',3,54,'advanced','Billing Collection Risk Matrix','Jordan Chen','Director of Billing',
    'Financial risk profiling: Classify billing vouchers into risk categories: Resolved (status = paid), Pending Insurance (status = pending_insurance), High Risk Delinquent (status = overdue). Return billing id, patient balance, and risk category.','CASE statement evaluating billing status.',['SELECT','CASE WHEN'],['id','patient_balance','risk_category'],
    "SELECT id, patient_balance, CASE WHEN status = 'paid' THEN 'Resolved' WHEN status = 'pending_insurance' THEN 'Pending Insurance' ELSE 'High Risk Delinquent' END AS risk_category FROM billing ORDER BY patient_balance DESC;",'t',
    ['Map billing status to risk tier via CASE.','Select id, patient_balance, risk_category.'],'Structures accounts receivable portfolios for targeted financial collections.',25,5),

  q('hc-L3-055','healthcare',3,55,'advanced','Diagnosis Severity Case Breakdown per Department','Dr. Evelyn Reed','Chief Medical Officer',
    'Departmental morbidity mix: Count mild, moderate, and severe diagnoses recorded across each department using conditional SUM(CASE ...). Return department name, mild count, moderate count, and severe count.','3-way JOIN: diagnoses → appointments → doctors → departments, conditional aggregation with SUM(CASE).',['SELECT','INNER JOIN','GROUP BY','SUM CASE'],['department_name','mild_cases','moderate_cases','severe_cases'],
    "SELECT dept.name AS department_name, SUM(CASE WHEN dg.severity = 'Mild' THEN 1 ELSE 0 END) AS mild_cases, SUM(CASE WHEN dg.severity = 'Moderate' THEN 1 ELSE 0 END) AS moderate_cases, SUM(CASE WHEN dg.severity = 'Severe' THEN 1 ELSE 0 END) AS severe_cases FROM diagnoses dg JOIN appointments a ON dg.appointment_id = a.id JOIN doctors doc ON a.doctor_id = doc.id JOIN departments dept ON doc.department_id = dept.id GROUP BY dept.name ORDER BY severe_cases DESC, moderate_cases DESC;",'t',
    ['Join diagnoses to appointments to doctors to departments.','Pivot severity counts using conditional SUM(CASE WHEN severity = ...).'],'Evaluates clinical acuity distribution across inpatient and outpatient service lines.',25,8),

  q('hc-L3-056','healthcare',3,56,'advanced','Payer Claim Denial Rate and Approval Ratio','Jordan Chen','Director of Billing',
    'Health plan scorecard: For each insurance provider, compute total claims, total approved claims, total denied claims, and approval rate percentage.','GROUP BY insurance_provider, conditional SUM(CASE) and COUNT(*).',['SELECT','GROUP BY','SUM CASE','ROUND'],['insurance_provider','total_claims','approved_count','denied_count','approval_rate_pct'],
    "SELECT insurance_provider, COUNT(*) AS total_claims, SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_count, SUM(CASE WHEN status = 'denied' THEN 1 ELSE 0 END) AS denied_count, ROUND(SUM(CASE WHEN status = 'approved' THEN 1.0 ELSE 0.0 END) / COUNT(*) * 100.0, 1) AS approval_rate_pct FROM insurance_claims GROUP BY insurance_provider ORDER BY approval_rate_pct DESC;",'t',
    ['Group insurance_claims by provider.','Calculate counts and approval percentage via conditional SUM.'],'Benchmarking payer adjudication friction and claim approval integrity.',25,8),

  q('hc-L3-057','healthcare',3,57,'advanced','Appointment Completion Rate by Doctor Specialty','Dr. Evelyn Reed','Chief Medical Officer',
    'Specialty encounter adherence: Calculate total appointments, completed count, no-show count, and completion percentage for each doctor specialty.','JOIN appointments with doctors, GROUP BY specialty, conditional aggregation.',['SELECT','INNER JOIN','GROUP BY','SUM CASE'],['specialty','total_appts','completed_count','no_show_count','completion_rate_pct'],
    "SELECT d.specialty, COUNT(a.id) AS total_appts, SUM(CASE WHEN a.status = 'completed' THEN 1 ELSE 0 END) AS completed_count, SUM(CASE WHEN a.status = 'no_show' THEN 1 ELSE 0 END) AS no_show_count, ROUND(SUM(CASE WHEN a.status = 'completed' THEN 1.0 ELSE 0.0 END) / COUNT(a.id) * 100.0, 1) AS completion_rate_pct FROM appointments a JOIN doctors d ON a.doctor_id = d.id GROUP BY d.specialty ORDER BY completion_rate_pct DESC;",'t',
    ['Join appointments to doctors.','Aggregate total, completed, and no-shows per specialty.','Compute completion percentage.'],'Identifies specialties with high patient no-show rates needing reminder protocols.',25,8),

  q('hc-L3-058','healthcare',3,58,'advanced','Patient Out-of-Pocket Expense Stratification','Jordan Chen','Director of Billing',
    'Financial toxicity audit: Categorize patient balance obligations into tiers: Minimal (< $50), Moderate ($50 to $200), Substantial (> $200). Return patient id, balance, and tier.','CASE statement evaluating patient_balance.',['SELECT','CASE WHEN'],['id','patient_balance','exposure_tier'],
    "SELECT id, patient_balance, CASE WHEN patient_balance < 50.00 THEN 'Minimal' WHEN patient_balance BETWEEN 50.00 AND 200.00 THEN 'Moderate' ELSE 'Substantial' END AS exposure_tier FROM billing ORDER BY patient_balance DESC;",'t',
    ['Evaluate patient_balance across expense tiers using CASE.','Order by patient_balance descending.'],'Surfaces patients at risk of medical debt or needing financial assistance counseling.',25,6),

  q('hc-L3-059','healthcare',3,59,'advanced','Abnormal Biomarker Ratio by Test Category','Dr. Anthony Clark','Director of Pathology & Lab',
    'Laboratory diagnostic surveillance: For each lab test category, calculate total tests performed, abnormal count (flag HIGH or LOW), and abnormal rate percentage.','JOIN patient_lab_results with lab_tests, GROUP BY category, conditional aggregation.',['SELECT','INNER JOIN','GROUP BY','SUM CASE'],['category','total_tests','abnormal_count','abnormal_rate_pct'],
    "SELECT lt.category, COUNT(plr.id) AS total_tests, SUM(CASE WHEN plr.flag IN ('HIGH', 'LOW') THEN 1 ELSE 0 END) AS abnormal_count, ROUND(SUM(CASE WHEN plr.flag IN ('HIGH', 'LOW') THEN 1.0 ELSE 0.0 END) / COUNT(plr.id) * 100.0, 1) AS abnormal_rate_pct FROM patient_lab_results plr JOIN lab_tests lt ON plr.test_id = lt.id GROUP BY lt.category ORDER BY abnormal_rate_pct DESC;",'t',
    ['Join patient_lab_results to lab_tests.','Group by category.','Compute abnormal count and percentage using conditional SUM.'],'Pinpoints laboratory disciplines detecting the highest pathological variances.',25,8),

  q('hc-L3-060','healthcare',3,60,'advanced','Prescription Refill Policy Compliance Audit','Dr. Evelyn Reed','Chief Medical Officer',
    'Pharmacy protocol: Classify prescriptions into Single Fill (refills = 0), Limited Refill (refills = 1), Maintenance Extended (refills > 1). Return id, medication name, refills, and refill category.','CASE statement evaluating refills column.',['SELECT','CASE WHEN'],['id','medication_name','refills','refill_category'],
    "SELECT id, medication_name, refills, CASE WHEN refills = 0 THEN 'Single Fill' WHEN refills = 1 THEN 'Limited Refill' ELSE 'Maintenance Extended' END AS refill_category FROM prescriptions ORDER BY refills DESC, medication_name;",'f',
    ['Classify prescriptions based on refill count using CASE.','Select id, medication_name, refills, refill_category.'],'Audits compliance with chronic therapy vs acute short-course medication guidelines.',25,6),

  q('hc-L3-061','healthcare',3,61,'advanced','Payer Reimbursement Efficiency Ratio','Jordan Chen','Director of Billing',
    'Contractual yield analysis: For each insurance carrier, compute total claim amount, total approved amount, and contractual realization percentage (approved / claim * 100).','GROUP BY insurance_provider on insurance_claims, SUM(claim_amount), SUM(approved_amount).',['SELECT','GROUP BY','SUM','ROUND'],['insurance_provider','gross_claimed','net_approved','realization_pct'],
    "SELECT insurance_provider, ROUND(SUM(claim_amount), 2) AS gross_claimed, ROUND(SUM(approved_amount), 2) AS net_approved, ROUND(SUM(approved_amount) / SUM(claim_amount) * 100.0, 1) AS realization_pct FROM insurance_claims GROUP BY insurance_provider ORDER BY realization_pct DESC;",'t',
    ['Group claims by insurance_provider.','Sum claim_amount and approved_amount.','Calculate net realization percentage.'],'Measures net realized dollar yield against gross billed charges across payers.',25,8),

  q('hc-L3-062','healthcare',3,62,'advanced','Inpatient Daily Room Occupancy Potential vs Actual','Marcus Thorne','Chief Nursing Officer',
    'Facility bed economics: Calculate total potential daily revenue (sum of all room daily rates) vs currently realized daily revenue (sum of occupied room rates) per department.','JOIN rooms with departments, GROUP BY dept.name, conditional SUM(CASE).',['SELECT','INNER JOIN','GROUP BY','SUM CASE'],['department_name','potential_revenue','realized_revenue'],
    "SELECT d.name AS department_name, ROUND(SUM(r.daily_rate), 2) AS potential_revenue, ROUND(SUM(CASE WHEN r.is_occupied THEN r.daily_rate ELSE 0 END), 2) AS realized_revenue FROM rooms r JOIN departments d ON r.department_id = d.id GROUP BY d.name ORDER BY realized_revenue DESC;",'t',
    ['Join rooms to departments.','Sum total daily_rate for potential revenue.','Sum daily_rate where is_occupied is true for realized revenue.'],'Calculates inpatient capacity monetization and vacant bed revenue leakage.',25,8),

  q('hc-L3-063','healthcare',3,63,'advanced','High-Cost Medication Utilization by Specialty','Dr. Evelyn Reed','Chief Medical Officer',
    'Formulary expense audit: How many times has each specialty prescribed high-cost medications (unit cost > $20.00)? Return specialty, high cost prescriptions count, and total refills.','JOIN prescriptions with doctors and medications WHERE unit_cost > 20, GROUP BY specialty.',['SELECT','INNER JOIN','GROUP BY','SUM'],['specialty','high_cost_prescriptions','total_refills'],
    "SELECT d.specialty, COUNT(pr.id) AS high_cost_prescriptions, SUM(pr.refills) AS total_refills FROM prescriptions pr JOIN doctors d ON pr.doctor_id = d.id JOIN medications m ON pr.medication_name = m.name WHERE m.unit_cost > 20.00 GROUP BY d.specialty ORDER BY high_cost_prescriptions DESC;",'t',
    ['Join prescriptions to doctors and medications.','Filter for m.unit_cost > 20.00.','Group by specialty and count.'],'Monitors expensive drug therapy prescribing across clinical service lines.',25,8),

  q('hc-L3-064','healthcare',3,64,'advanced','Nurse Certification Mix per Clinical Department','Marcus Thorne','Chief Nursing Officer',
    'Workforce qualification census: For each department, count how many Nurse Practitioners (NP) and Bachelor of Science in Nursing (BSN) nurses are staffed. Return department name, NP count, and BSN count.','JOIN nurses with departments, GROUP BY dept.name, conditional SUM(CASE).',['SELECT','INNER JOIN','GROUP BY','SUM CASE'],['department_name','np_count','bsn_count'],
    "SELECT d.name AS department_name, SUM(CASE WHEN n.certification_level = 'NP' THEN 1 ELSE 0 END) AS np_count, SUM(CASE WHEN n.certification_level = 'BSN' THEN 1 ELSE 0 END) AS bsn_count FROM nurses n JOIN departments d ON n.department_id = d.id GROUP BY d.name ORDER BY np_count DESC, bsn_count DESC;",'t',
    ['Join nurses to departments.','Pivot certification levels using conditional SUM(CASE).'],'Assesses advanced practice nursing coverage across clinical departments.',25,7),

  q('hc-L3-065','healthcare',3,65,'advanced','Patient Visit Adherence by Metropolitan Borough','Dr. Evelyn Reed','Chief Medical Officer',
    'Geographic health access: For each patient city, calculate total scheduled appointments, completed visits, and attendance rate percentage.','JOIN appointments with patients, GROUP BY city, conditional aggregation.',['SELECT','INNER JOIN','GROUP BY','SUM CASE'],['city','total_encounters','completed_visits','adherence_pct'],
    "SELECT p.city, COUNT(a.id) AS total_encounters, SUM(CASE WHEN a.status = 'completed' THEN 1 ELSE 0 END) AS completed_visits, ROUND(SUM(CASE WHEN a.status = 'completed' THEN 1.0 ELSE 0.0 END) / COUNT(a.id) * 100.0, 1) AS adherence_pct FROM appointments a JOIN patients p ON a.patient_id = p.id GROUP BY p.city ORDER BY adherence_pct DESC;",'t',
    ['Join appointments to patients.','Group by patient city.','Calculate attendance rate using conditional SUM.'],'Surfaces geographic barriers to outpatient care completion.',25,8),

  q('hc-L3-066','healthcare',3,66,'advanced','Doctor Daily Schedule Capacity Utilization','Dr. Evelyn Reed','Chief Medical Officer',
    'Physician caseload tiering: Categorize doctors by their total scheduled appointment volume: High Volume (>= 8 appts), Moderate Volume (4 to 7 appts), Low Volume (< 4 appts). Return doctor name, specialty, total appointments, and volume tier.','JOIN doctors with appointments, GROUP BY doctor, CASE on COUNT(a.id).',['SELECT','INNER JOIN','GROUP BY','CASE WHEN'],['name','specialty','total_appts','volume_tier'],
    "SELECT d.name, d.specialty, COUNT(a.id) AS total_appts, CASE WHEN COUNT(a.id) >= 8 THEN 'High Volume' WHEN COUNT(a.id) BETWEEN 4 AND 7 THEN 'Moderate Volume' ELSE 'Low Volume' END AS volume_tier FROM doctors d JOIN appointments a ON d.id = a.doctor_id GROUP BY d.id, d.name, d.specialty ORDER BY total_appts DESC;",'t',
    ['Group appointments by doctor.','Classify appointment counts into volume tiers using CASE.'],'Balances patient visit demand across active medical staff.',25,7),

  q('hc-L3-067','healthcare',3,67,'advanced','Multimorbid Chronic Disease Prevalence','Dr. Evelyn Reed','Chief Medical Officer',
    'Chronic complex care management: Find all patients who have been diagnosed with both Hypertension (I10) and Diabetes Mellitus (E11.9). Return patient first name, last name, and city.','Subquery with INTERSECT or dual EXISTS.',['SELECT','EXISTS','AND'],['first_name','last_name','city'],
    "SELECT p.first_name, p.last_name, p.city FROM patients p WHERE EXISTS (SELECT 1 FROM diagnoses dg WHERE dg.patient_id = p.id AND dg.icd10_code = 'I10') AND EXISTS (SELECT 1 FROM diagnoses dg2 WHERE dg2.patient_id = p.id AND dg2.icd10_code = 'E11.9') ORDER BY p.last_name, p.first_name;",'f',
    ['Use two correlated EXISTS clauses: one for I10 and one for E11.9.','Select patient details.'],'Clinical cohort tracking for dual hypertensive-diabetic chronic syndrome.',25,8),

  q('hc-L3-068','healthcare',3,68,'advanced','Revenue Leakage From Cancelled & No-Show Appointments','Jordan Chen','Director of Billing',
    'Unrealized outpatient revenue: Calculate total uncollected encounter fees lost due to cancelled or no_show appointments across each doctor specialty. Return specialty, lost appointments count, and lost revenue.','JOIN appointments with doctors WHERE status IN (cancelled, no_show), GROUP BY specialty.',['SELECT','INNER JOIN','SUM','WHERE','GROUP BY'],['specialty','lost_encounters','lost_revenue'],
    "SELECT d.specialty, COUNT(a.id) AS lost_encounters, ROUND(SUM(a.fee), 2) AS lost_revenue FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status IN ('cancelled', 'no_show') GROUP BY d.specialty ORDER BY lost_revenue DESC;",'t',
    ['Join appointments to doctors.','Filter WHERE status IN (\'cancelled\', \'no_show\').','Group by specialty, count visits and sum fee.'],'Quantifies top-line revenue lost to patient scheduling friction.',25,7),

  q('hc-L3-069','healthcare',3,69,'advanced','Accounts Receivable Recovery Rate by Payer','Jordan Chen','Director of Billing',
    'Payer collections yield: For each insurance carrier, compute total billed charges, total paid amounts, and collection efficiency percentage (paid / total * 100).','JOIN billing with patients, GROUP BY insurance_provider, conditional aggregation.',['SELECT','INNER JOIN','GROUP BY','SUM'],['insurance_provider','total_billed','paid_amount','collection_pct'],
    "SELECT p.insurance_provider, ROUND(SUM(b.total_charge), 2) AS total_billed, ROUND(SUM(CASE WHEN b.status = 'paid' THEN b.total_charge ELSE 0 END), 2) AS paid_amount, ROUND(SUM(CASE WHEN b.status = 'paid' THEN b.total_charge ELSE 0 END) / SUM(b.total_charge) * 100.0, 1) AS collection_pct FROM billing b JOIN patients p ON b.patient_id = p.id GROUP BY p.insurance_provider ORDER BY collection_pct DESC;",'t',
    ['Join billing to patients.','Group by insurance_provider.','Compute total billed and paid amounts via conditional SUM.','Calculate collection percentage.'],'Measures cash conversion efficiency per third-party health plan.',25,8),

  q('hc-L3-070','healthcare',3,70,'advanced','Hospital Inpatient Bed Occupancy Rate by Room Type','Marcus Thorne','Chief Nursing Officer',
    'Bed management dashboard: For each room type (Standard, ICU, Semi-Private, Suite), calculate total beds, occupied beds, and occupancy percentage.','GROUP BY room_type on rooms, conditional aggregation with SUM(CASE).',['SELECT','GROUP BY','SUM CASE','ROUND'],['room_type','total_beds','occupied_beds','occupancy_pct'],
    "SELECT room_type, COUNT(*) AS total_beds, SUM(CASE WHEN is_occupied THEN 1 ELSE 0 END) AS occupied_beds, ROUND(SUM(CASE WHEN is_occupied THEN 1.0 ELSE 0.0 END) / COUNT(*) * 100.0, 1) AS occupancy_pct FROM rooms GROUP BY room_type ORDER BY occupancy_pct DESC;",'t',
    ['Group rooms by room_type.','Count total rooms and occupied rooms using SUM(CASE).','Calculate occupancy rate percentage.'],'Inpatient capacity census monitoring critical for bed management and triage.',25,7),

  q('hc-L3-071','healthcare',3,71,'advanced','Physicians Prescribing Multiple Distinct Medications','Dr. Evelyn Reed','Chief Medical Officer',
    'Formulary breadth audit: Which physicians have prescribed at least 3 distinct medication names? Return doctor name, specialty, and unique medications count.','JOIN prescriptions with doctors, GROUP BY doctor HAVING COUNT(DISTINCT medication_name) >= 3.',['SELECT','INNER JOIN','GROUP BY','HAVING','COUNT DISTINCT'],['doctor_name','specialty','distinct_meds'],
    "SELECT d.name AS doctor_name, d.specialty, COUNT(DISTINCT pr.medication_name) AS distinct_meds FROM prescriptions pr JOIN doctors d ON pr.doctor_id = d.id GROUP BY d.id, d.name, d.specialty HAVING COUNT(DISTINCT pr.medication_name) >= 3 ORDER BY distinct_meds DESC, d.name;",'t',
    ['Join prescriptions to doctors.','Group by doctor and filter HAVING COUNT(DISTINCT medication_name) >= 3.'],'Identifies clinicians managing broad-spectrum therapeutic pharmacotherapy.',25,7),

  q('hc-L3-072','healthcare',3,72,'advanced','Diagnostic Fee Spread Between Outpatient & Inpatient Labs','Dr. Anthony Clark','Director of Pathology & Lab',
    'Pricing spread: Calculate minimum fee, maximum fee, and price spread (max - min) for each lab test category. Return category, min fee, max fee, and fee spread.','GROUP BY category on lab_tests, MIN, MAX, and arithmetic difference.',['SELECT','GROUP BY','MIN','MAX'],['category','min_fee','max_fee','fee_spread'],
    "SELECT category, ROUND(MIN(standard_fee), 2) AS min_fee, ROUND(MAX(standard_fee), 2) AS max_fee, ROUND(MAX(standard_fee) - MIN(standard_fee), 2) AS fee_spread FROM lab_tests GROUP BY category ORDER BY fee_spread DESC;",'t',
    ['Group lab_tests by category.','Compute MIN(standard_fee) and MAX(standard_fee).','Calculate fee_spread as max - min.'],'Analyzes pricing variance across pathology and diagnostic disciplines.',25,6),

  q('hc-L3-073','healthcare',3,73,'advanced','Uninsured or Self-Pay Out-of-Pocket Burden','Jordan Chen','Director of Billing',
    'Self-pay exposure: For each billing voucher where copay equals zero, classify whether patient balance owes over $1000 (Major Debt) or under $1000 (Moderate Debt). Return id, patient_id, total charge, and debt category.','Filter billing WHERE copay_amount = 0, CASE on patient_balance.',['SELECT','CASE WHEN','WHERE'],['id','patient_id','total_charge','debt_category'],
    "SELECT id, patient_id, total_charge, CASE WHEN patient_balance >= 1000.00 THEN 'Major Debt' ELSE 'Moderate Debt' END AS debt_category FROM billing WHERE copay_amount = 0.00 ORDER BY total_charge DESC;",'t',
    ['Filter billing for copay_amount = 0.','Classify patient_balance via CASE statement.'],'Profiles high-exposure self-pay receivables needing hardship evaluation.',25,6),

  q('hc-L3-074','healthcare',3,74,'advanced','Departments With High Severe Acuity Burden','Dr. Evelyn Reed','Chief Medical Officer',
    'Acuity indexing: Calculate the percentage of severe diagnoses handled by each department relative to total diagnoses in that department. Return department name, severe count, total count, and severe ratio.','JOIN diagnoses → appointments → doctors → departments, GROUP BY dept.name, conditional aggregation.',['SELECT','INNER JOIN','GROUP BY','SUM CASE'],['department_name','severe_count','total_diagnoses','severe_pct'],
    "SELECT dept.name AS department_name, SUM(CASE WHEN dg.severity = 'Severe' THEN 1 ELSE 0 END) AS severe_count, COUNT(dg.id) AS total_diagnoses, ROUND(SUM(CASE WHEN dg.severity = 'Severe' THEN 1.0 ELSE 0.0 END) / COUNT(dg.id) * 100.0, 1) AS severe_pct FROM diagnoses dg JOIN appointments a ON dg.appointment_id = a.id JOIN doctors doc ON a.doctor_id = doc.id JOIN departments dept ON doc.department_id = dept.id GROUP BY dept.name ORDER BY severe_pct DESC;",'t',
    ['Join diagnoses to appointments to doctors to departments.','Group by department.','Calculate severe diagnosis count and percentage.'],'Evaluates department case-mix index and clinical complexity burden.',25,8),

  q('hc-L3-075','healthcare',3,75,'advanced','Patients With Outstanding Bills And Pending Insurance','Jordan Chen','Director of Billing',
    'Accounts receivable overlap: Identify patients who have at least one bill with status pending_insurance AND at least one bill with status overdue. Return distinct patient first name, last name, and city.','Correlated dual EXISTS on billing for pending_insurance and overdue.',['SELECT','EXISTS','AND','DISTINCT'],['first_name','last_name','city'],
    "SELECT p.first_name, p.last_name, p.city FROM patients p WHERE EXISTS (SELECT 1 FROM billing b WHERE b.patient_id = p.id AND b.status = 'pending_insurance') AND EXISTS (SELECT 1 FROM billing b2 WHERE b2.patient_id = p.id AND b2.status = 'overdue') ORDER BY p.last_name, p.first_name;",'f',
    ['Use two correlated EXISTS clauses on billing: status pending_insurance and overdue.','Select distinct first_name, last_name, city.'],'Identifies complex billing accounts with mixed insurer adjudication and self-pay arrears.',25,7),

  // 76–100: Boss / Capstone (Set Operations: UNION / INTERSECT / EXCEPT, Multi-tier Subqueries)
  q('hc-L3-076','healthcare',3,76,'boss','Hospital Clinical Staff Unified Directory (UNION)','Dr. Evelyn Reed','Chief Medical Officer',
    'Master clinical workforce directory: Combine all doctors and all registered nurses into a unified roster showing staff name, professional role (Doctor vs Nurse), and assigned department id.','UNION combining doctors and nurses.',['SELECT','UNION','ORDER BY'],['staff_name','staff_role','department_id'],
    "SELECT name AS staff_name, 'Doctor' AS staff_role, department_id FROM doctors UNION SELECT name AS staff_name, 'Nurse' AS staff_role, department_id FROM nurses ORDER BY department_id, staff_name;",'t',
    ['Select name, \'Doctor\', department_id from doctors.','UNION select name, \'Nurse\', department_id from nurses.','Order by department_id and staff_name.'],'Creates an integrated clinical staff roster spanning physicians and nursing personnel.',30,7),

  q('hc-L3-077','healthcare',3,77,'boss','Diabetic Care Gap Audit (EXCEPT)','Dr. Evelyn Reed','Chief Medical Officer',
    'Clinical quality metric: Find all patients diagnosed with Type 2 Diabetes Mellitus (E11.9) EXCEPT those who have been prescribed Glucophage. Return patient id.','EXCEPT comparing diagnosed diabetics against prescribed patients.',['SELECT','EXCEPT','ORDER BY'],['id'],
    "SELECT patient_id AS id FROM diagnoses WHERE icd10_code = 'E11.9' EXCEPT SELECT patient_id AS id FROM prescriptions WHERE medication_name = 'Glucophage' ORDER BY id;",'t',
    ['Select patient_id from diagnoses WHERE icd10_code = \'E11.9\'.','EXCEPT select patient_id from prescriptions WHERE medication_name = \'Glucophage\'.','Order by id.'],'Identifies clinical gaps in pharmacotherapy guidelines for diabetic patients.',30,8),

  q('hc-L3-078','healthcare',3,78,'boss','Patients With Multi-Month Appointment Encounters (INTERSECT)','Dr. Evelyn Reed','Chief Medical Officer',
    'Longitudinal care continuity: Which patients attended an appointment in January 2024 AND attended an appointment in February 2024? Return patient id.','INTERSECT comparing patient appointments across two date ranges.',['SELECT','INTERSECT','ORDER BY'],['id'],
    "SELECT patient_id AS id FROM appointments WHERE appointment_date >= '2024-01-01' AND appointment_date < '2024-02-01' INTERSECT SELECT patient_id AS id FROM appointments WHERE appointment_date >= '2024-02-01' AND appointment_date < '2024-03-01' ORDER BY id;",'t',
    ['Select patient_id from appointments in January 2024.','INTERSECT select patient_id from appointments in February 2024.'],'Surfaces chronic patients requiring high-frequency monthly clinical follow-ups.',30,8),

  q('hc-L3-079','healthcare',3,79,'boss','Unified Hospital Service Catalog (UNION ALL)','Dr. Anthony Clark','Director of Pathology & Lab',
    'Hospital charge master index: Create a unified price listing of clinical offerings by combining lab tests and medications. Return service name, service category, and unit fee.','UNION ALL combining lab_tests and medications.',['SELECT','UNION ALL','ORDER BY'],['service_name','service_type','fee'],
    "SELECT test_name AS service_name, category AS service_type, standard_fee AS fee FROM lab_tests UNION ALL SELECT name AS service_name, dosage_form AS service_type, unit_cost AS fee FROM medications ORDER BY fee DESC;",'t',
    ['Select test_name, category, standard_fee from lab_tests.','UNION ALL select name, dosage_form, unit_cost from medications.','Order by fee descending.'],'Consolidates hospital clinical charge master into a single billing reference.',30,7),

  q('hc-L3-080','healthcare',3,80,'boss','Completed Visits Lacking Billing Invoices (EXCEPT)','Jordan Chen','Director of Billing',
    'Revenue leakage audit: Find all completed appointment IDs that do NOT exist in the billing table using an EXCEPT query. Return appointment id.','EXCEPT comparing completed appointments with billing appointment_ids.',['SELECT','EXCEPT','ORDER BY'],['id'],
    "SELECT id FROM appointments WHERE status = 'completed' EXCEPT SELECT appointment_id AS id FROM billing WHERE appointment_id IS NOT NULL ORDER BY id;",'t',
    ['Select id from appointments WHERE status = \'completed\'.','EXCEPT select appointment_id from billing.','Order by id.'],'Critical revenue assurance: detects completed patient visits missing an invoice voucher.',30,8),

  q('hc-L3-081','healthcare',3,81,'boss','Cardiology & Primary Care Shared Patients (INTERSECT)','Dr. Evelyn Reed','Chief Medical Officer',
    'Coordinated care pathways: Identify patients who have had appointments in both the Cardiology department AND the Primary Care department. Return patient id.','INTERSECT comparing patient IDs across Cardiology and Primary Care.',['SELECT','INTERSECT','ORDER BY'],['patient_id'],
    "SELECT a.patient_id FROM appointments a JOIN doctors d ON a.doctor_id = d.id JOIN departments dept ON d.department_id = dept.id WHERE dept.name = 'Cardiology' INTERSECT SELECT a2.patient_id FROM appointments a2 JOIN doctors d2 ON a2.doctor_id = d2.id JOIN departments dept2 ON d2.department_id = dept2.id WHERE dept2.name = 'Primary Care' ORDER BY patient_id;",'t',
    ['Select patient_id from appointments in Cardiology.','INTERSECT select patient_id from appointments in Primary Care.'],'Tracks referral adherence and shared care between primary care and specialty cardiology.',30,8),

  q('hc-L3-082','healthcare',3,82,'boss','Available Critical Care Beds (EXCEPT)','Marcus Thorne','Chief Nursing Officer',
    'Emergency surge capacity: Find room numbers of all ICU rooms EXCEPT those that are currently occupied. Return room number.','EXCEPT comparing ICU rooms with occupied ICU rooms.',['SELECT','EXCEPT','ORDER BY'],['room_number'],
    "SELECT room_number FROM rooms WHERE room_type = 'ICU' EXCEPT SELECT room_number FROM rooms WHERE room_type = 'ICU' AND is_occupied = TRUE ORDER BY room_number;",'t',
    ['Select room_number from rooms WHERE room_type = \'ICU\'.','EXCEPT select room_number from rooms WHERE room_type = \'ICU\' AND is_occupied = TRUE.'],'Identifies immediate available critical care intensive care beds.',30,7),

  q('hc-L3-083','healthcare',3,83,'boss','Patients With Abnormal Labs But No Active Diagnosis (EXCEPT)','Dr. Evelyn Reed','Chief Medical Officer',
    'Unassigned diagnostic workup: Identify patients who have received a HIGH or LOW lab test result EXCEPT those who have a diagnosis recorded in their file. Return patient id.','EXCEPT comparing patients with abnormal lab flags against diagnosed patients.',['SELECT','EXCEPT','ORDER BY'],['patient_id'],
    "SELECT DISTINCT patient_id FROM patient_lab_results WHERE flag IN ('HIGH', 'LOW') EXCEPT SELECT DISTINCT patient_id FROM diagnoses ORDER BY patient_id;",'t',
    ['Select distinct patient_id with abnormal lab flags.','EXCEPT select distinct patient_id from diagnoses.','Order by patient_id.'],'Highlights patients exhibiting pathology without an established clinical diagnosis.',30,8),

  q('hc-L3-084','healthcare',3,84,'boss','Cross-Borough Clinical Encounter Touchpoints (UNION)','Dr. Evelyn Reed','Chief Medical Officer',
    'Master patient location directory: Combine all distinct patient cities from patients who had appointments with cities of patients who have inpatient billing records. Return city.','UNION of patient cities across appointments and billing.',['SELECT','UNION','ORDER BY'],['city'],
    "SELECT DISTINCT p.city FROM patients p JOIN appointments a ON p.id = a.patient_id UNION SELECT DISTINCT p2.city FROM patients p2 JOIN billing b ON p2.id = b.patient_id ORDER BY city;",'t',
    ['Select distinct city from patients with appointments.','UNION select distinct city from patients with billing records.'],'Surfaces geographic footprint of active outpatient and billing operations.',30,6),

  q('hc-L3-085','healthcare',3,85,'boss','Doctors Prescribing Both Statins and Beta-Blockers (INTERSECT)','Dr. Evelyn Reed','Chief Medical Officer',
    'Physician cardiovascular protocol: Which doctors have prescribed Lipitor (Atorvastatin) AND have also prescribed Plavix (Clopidogrel)? Return doctor id.','INTERSECT comparing doctor IDs for both medications.',['SELECT','INTERSECT','ORDER BY'],['doctor_id'],
    "SELECT DISTINCT doctor_id FROM prescriptions WHERE medication_name = 'Lipitor' INTERSECT SELECT DISTINCT doctor_id FROM prescriptions WHERE medication_name = 'Plavix' ORDER BY doctor_id;",'t',
    ['Select doctor_id from prescriptions for Lipitor.','INTERSECT select doctor_id from prescriptions for Plavix.'],'Identifies cardiologists adhering to dual anti-platelet and lipid-lowering guidelines.',30,8),

  q('hc-L3-086','healthcare',3,86,'boss','Overdue Balance Patients Without Insurance Claims (EXCEPT)','Jordan Chen','Director of Billing',
    'Pure self-pay collections: Find patient IDs with overdue billing balances EXCEPT those who have had any insurance claim filed on their behalf. Return patient id.','EXCEPT comparing overdue billing patients against insurance claim patients.',['SELECT','EXCEPT','ORDER BY'],['patient_id'],
    "SELECT DISTINCT patient_id FROM billing WHERE status = 'overdue' EXCEPT SELECT DISTINCT b.patient_id FROM billing b JOIN insurance_claims ic ON b.id = ic.billing_id ORDER BY patient_id;",'t',
    ['Select distinct patient_id from billing WHERE status = overdue.','EXCEPT select distinct patient_id from billing joined to insurance_claims.'],'Targets pure self-pay patients in arrears without insurance adjudication pending.',30,8),

  q('hc-L3-087','healthcare',3,87,'boss','Multi-Tier Outlier Charges Across Clinical Diagnoses','Jordan Chen','Director of Billing',
    'Clinical cost variance: Find billing vouchers whose total charge is strictly higher than the average charge for all patients who share the same ICD-10 diagnosis code. Return billing id, total charge, and diagnosis code.','Subquery joining billing to diagnoses and comparing against correlated average.',['SELECT','INNER JOIN','CORRELATED SUBQUERY'],['id','total_charge','icd10_code'],
    "SELECT b.id, b.total_charge, dg.icd10_code FROM billing b JOIN diagnoses dg ON b.appointment_id = dg.appointment_id WHERE b.total_charge > (SELECT AVG(b2.total_charge) FROM billing b2 JOIN diagnoses dg2 ON b2.appointment_id = dg2.appointment_id WHERE dg2.icd10_code = dg.icd10_code) ORDER BY dg.icd10_code, b.total_charge DESC;",'t',
    ['Join billing to diagnoses.','Correlate subquery on icd10_code to calculate diagnosis-specific average charge.','Filter WHERE total_charge > diagnosis average.'],'Identifies high-cost outlier encounters within standardized diagnosis-related groups.',30,9),

  q('hc-L3-088','healthcare',3,88,'boss','Comprehensive Patient Clinical Journey Audit','Dr. Evelyn Reed','Chief Medical Officer',
    '360-degree patient audit: Find all patients who have completed an appointment, received an ICD-10 diagnosis, been prescribed a medication, and had a lab test performed. Return patient first name, last name, and city.','Quadruple EXISTS verifying clinical lifecycle touchpoints.',['SELECT','EXISTS','AND'],['first_name','last_name','city'],
    "SELECT p.first_name, p.last_name, p.city FROM patients p WHERE EXISTS (SELECT 1 FROM appointments a WHERE a.patient_id = p.id AND a.status = 'completed') AND EXISTS (SELECT 1 FROM diagnoses dg WHERE dg.patient_id = p.id) AND EXISTS (SELECT 1 FROM prescriptions pr WHERE pr.patient_id = p.id) AND EXISTS (SELECT 1 FROM patient_lab_results plr WHERE plr.patient_id = p.id) ORDER BY p.last_name, p.first_name;",'f',
    ['Correlate 4 separate EXISTS clauses for appointments, diagnoses, prescriptions, and lab results.','Select patient demographic details.'],'Identifies fully engaged patients navigating the comprehensive health system continuum.',30,9),

  q('hc-L3-089','healthcare',3,89,'boss','Physicians With Zero Completed Encounters (EXCEPT)','Dr. Evelyn Reed','Chief Medical Officer',
    'Physician onboarding audit: Find all doctor IDs in our medical staff EXCEPT doctors who have at least one completed appointment. Return doctor id.','EXCEPT comparing all doctors against doctors with completed visits.',['SELECT','EXCEPT','ORDER BY'],['id'],
    "SELECT id FROM doctors EXCEPT SELECT DISTINCT doctor_id AS id FROM appointments WHERE status = 'completed' AND doctor_id IS NOT NULL ORDER BY id;",'t',
    ['Select id from doctors.','EXCEPT select distinct doctor_id from appointments WHERE status = completed.'],'Surfaces inactive, newly credentialed, or research-only medical staff.',30,7),

  q('hc-L3-090','healthcare',3,90,'boss','Payer Claim Settlement Time Outliers','Jordan Chen','Director of Billing',
    'Payer lag anomaly: Find insurance claims whose settlement days took more than 1.5 times the average settlement days of all claims in the hospital. Return id, insurance provider, settlement days, and claim amount.','Scalar subquery: settlement_days > 1.5 * (SELECT AVG(settlement_days) FROM insurance_claims).',['SELECT','SCALAR SUBQUERY','WHERE'],['id','insurance_provider','settlement_days','claim_amount'],
    "SELECT id, insurance_provider, settlement_days, claim_amount FROM insurance_claims WHERE settlement_days > (1.5 * (SELECT AVG(settlement_days) FROM insurance_claims)) ORDER BY settlement_days DESC;",'t',
    ['Calculate hospital average settlement days in scalar subquery.','Filter claims exceeding 1.5 times that average.'],'Pinpoints extreme settlement delay outliers requiring executive payer escalation.',30,8),

  q('hc-L3-091','healthcare',3,91,'boss','Top Revenue Yielding Specialties Above Hospital Average','Jordan Chen','Director of Billing',
    'Specialty line profitability: Find medical specialties whose total completed appointment revenue exceeds the average completed revenue generated per specialty. Return specialty and gross revenue.','Subquery with HAVING SUM(a.fee) > (SELECT AVG(rev) FROM (SELECT SUM(a2.fee)...)).',['SELECT','INNER JOIN','GROUP BY','HAVING','AVG'],['specialty','gross_revenue'],
    "SELECT d.specialty, ROUND(SUM(a.fee), 2) AS gross_revenue FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.specialty HAVING SUM(a.fee) > (SELECT AVG(sub.rev) FROM (SELECT SUM(a2.fee) AS rev FROM appointments a2 JOIN doctors d2 ON a2.doctor_id = d2.id WHERE a2.status = 'completed' GROUP BY d2.specialty) sub) ORDER BY gross_revenue DESC;",'t',
    ['Compute revenue per specialty.','Compare in HAVING against average revenue across specialties.'],'Highlights marquee clinical service lines driving outpatient financial contribution.',30,9),

  q('hc-L3-092','healthcare',3,92,'boss','Patients With Inconsistent Blood Pressure Lab & Diagnosis','Dr. Evelyn Reed','Chief Medical Officer',
    'Clinical consistency review: Find patients who have been prescribed Zestril (Lisinopril) EXCEPT those who have an Essential Hypertension (I10) diagnosis code. Return patient id.','EXCEPT comparing prescribed patients with diagnosed patients.',['SELECT','EXCEPT','ORDER BY'],['patient_id'],
    "SELECT DISTINCT patient_id FROM prescriptions WHERE medication_name = 'Zestril' EXCEPT SELECT DISTINCT patient_id FROM diagnoses WHERE icd10_code = 'I10' ORDER BY patient_id;",'t',
    ['Select patient_id prescribed Zestril.','EXCEPT select patient_id diagnosed with I10.'],'Audits off-label prescribing or missing secondary hypertension diagnostic codes.',30,8),

  q('hc-L3-093','healthcare',3,93,'boss','Departments With Both Inpatient Rooms And Emergency Consultations','Dr. Sarah Patel','Head of Surgery',
    'Acuity infrastructure audit: Find department IDs that have both inpatient rooms assigned AND have doctors who conducted Urgent appointments. Return department id.','INTERSECT comparing room departments with urgent appointment departments.',['SELECT','INTERSECT','ORDER BY'],['department_id'],
    "SELECT DISTINCT department_id FROM rooms INTERSECT SELECT DISTINCT d.department_id FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.appointment_type = 'Urgent' ORDER BY department_id;",'t',
    ['Select department_id from rooms.','INTERSECT select department_id from doctors handling Urgent appointments.'],'Surfaces full-service acute clinical units combining inpatient beds and urgent care.',30,8),

  q('hc-L3-094','healthcare',3,94,'boss','Patients Having Abnormal Metabolic & Blood Count Labs','Dr. Anthony Clark','Director of Pathology & Lab',
    'Hematology-biochemistry comorbidity: Find patient IDs who have a HIGH or LOW flag on Complete Blood Count (CBC) AND a HIGH or LOW flag on Comprehensive Metabolic Panel (CMP). Return patient id.','INTERSECT comparing patients with abnormal CBC and CMP results.',['SELECT','INTERSECT','ORDER BY'],['patient_id'],
    "SELECT plr.patient_id FROM patient_lab_results plr JOIN lab_tests lt ON plr.test_id = lt.id WHERE lt.test_name = 'Complete Blood Count (CBC)' AND plr.flag IN ('HIGH', 'LOW') INTERSECT SELECT plr2.patient_id FROM patient_lab_results plr2 JOIN lab_tests lt2 ON plr2.test_id = lt2.id WHERE lt2.test_name = 'Comprehensive Metabolic Panel (CMP)' AND plr2.flag IN ('HIGH', 'LOW') ORDER BY patient_id;",'t',
    ['Select patient_id with abnormal CBC.','INTERSECT select patient_id with abnormal CMP.'],'Clinical risk stratification for multi-organ or systemic pathological dysfunction.',30,9),

  q('hc-L3-095','healthcare',3,95,'boss','Consolidated Healthcare Encounter Log (UNION ALL)','Dr. Evelyn Reed','Chief Medical Officer',
    'Enterprise encounter ledger: Combine all completed appointments and all recorded lab test encounters into a unified chronological log showing patient id, encounter date, and encounter type. Return top 25 records.','UNION ALL combining appointments and patient_lab_results.',['SELECT','UNION ALL','ORDER BY','LIMIT'],['patient_id','encounter_date','encounter_type'],
    "SELECT patient_id, appointment_date::DATE AS encounter_date, 'Appointment' AS encounter_type FROM appointments WHERE status = 'completed' UNION ALL SELECT patient_id, performed_date AS encounter_date, 'Lab Test' AS encounter_type FROM patient_lab_results ORDER BY encounter_date DESC, patient_id LIMIT 25;",'t',
    ['Select patient_id, appointment_date, \'Appointment\' from completed appointments.','UNION ALL select patient_id, performed_date, \'Lab Test\' from patient_lab_results.','Order by encounter_date DESC LIMIT 25.'],'Integrates clinical ambulatory visits and diagnostic orders into a single timeline.',30,8),

  q('hc-L3-096','healthcare',3,96,'boss','High-Acuity Doctors Treating Multiple Severe Patients','Dr. Evelyn Reed','Chief Medical Officer',
    'Physician acuity load: Find doctors who have treated at least 2 distinct patients diagnosed with Severe conditions. Return doctor name, specialty, and severe patients count.','JOIN doctors to appointments to diagnoses WHERE severity = Severe, GROUP BY doctor HAVING COUNT(DISTINCT patient_id) >= 2.',['SELECT','INNER JOIN','GROUP BY','HAVING','COUNT DISTINCT'],['doctor_name','specialty','severe_patients_count'],
    "SELECT d.name AS doctor_name, d.specialty, COUNT(DISTINCT dg.patient_id) AS severe_patients_count FROM doctors d JOIN appointments a ON d.id = a.doctor_id JOIN diagnoses dg ON a.id = dg.appointment_id WHERE dg.severity = 'Severe' GROUP BY d.id, d.name, d.specialty HAVING COUNT(DISTINCT dg.patient_id) >= 2 ORDER BY severe_patients_count DESC, d.name;",'t',
    ['Join doctors to appointments to diagnoses with severity = Severe.','Group by doctor and filter HAVING COUNT(DISTINCT dg.patient_id) >= 2.'],'Surfaces physician leaders managing multi-patient high-complexity clinical cohorts.',30,9),

  q('hc-L3-097','healthcare',3,97,'boss','Billing Records With Overdue Balances Above Median Carrier Average','Jordan Chen','Director of Billing',
    'Delinquent exposure analysis: Find overdue billing records where the patient balance exceeds the average balance of all overdue records for that patient insurance carrier. Return billing id, insurance provider, and balance.','JOIN billing to patients, correlated subquery comparing patient_balance to carrier average.',['SELECT','INNER JOIN','CORRELATED SUBQUERY'],['id','insurance_provider','patient_balance'],
    "SELECT b.id, p.insurance_provider, b.patient_balance FROM billing b JOIN patients p ON b.patient_id = p.id WHERE b.status = 'overdue' AND b.patient_balance > (SELECT AVG(b2.patient_balance) FROM billing b2 JOIN patients p2 ON b2.patient_id = p2.id WHERE b2.status = 'overdue' AND p2.insurance_provider = p.insurance_provider) ORDER BY p.insurance_provider, b.patient_balance DESC;",'t',
    ['Join billing to patients with status = overdue.','Correlate subquery on insurance_provider to compute carrier overdue average.','Filter balance exceeding that benchmark.'],'Focuses bad debt write-off evaluations on extreme debtor accounts per payer.',30,9),

  q('hc-L3-098','healthcare',3,98,'boss','Top 5 Most Expensive Medications vs Top 5 Lab Tests (UNION ALL)','Dr. Anthony Clark','Director of Pathology & Lab',
    'Catalog pricing benchmark: Combine the 5 most expensive medications (by unit cost) with the 5 most expensive lab tests (by standard fee). Return item name, category, and fee.','UNION ALL combining two subqueries each limited to 5 records.',['SELECT','UNION ALL','SUBQUERY','LIMIT'],['item_name','category','fee'],
    "(SELECT name AS item_name, dosage_form AS category, unit_cost AS fee FROM medications ORDER BY unit_cost DESC LIMIT 5) UNION ALL (SELECT test_name AS item_name, category, standard_fee AS fee FROM lab_tests ORDER BY standard_fee DESC LIMIT 5) ORDER BY fee DESC;",'t',
    ['Select top 5 medications by unit_cost.','UNION ALL select top 5 lab tests by standard_fee.','Order combined result by fee descending.'],'Evaluates price ceilings across pharmaceuticals and diagnostic services.',30,8),

  q('hc-L3-099','healthcare',3,99,'boss','Chronic Care Coordination: Triple-Payer Inpatient Exposure','Jordan Chen','Director of Billing',
    'Payer concentration analysis: Find patients insured by BlueCross, Aetna, or UnitedHealth whose total hospital billed charges exceed $2,500. Return patient first name, last name, insurance, and total charges.','JOIN billing to patients WHERE insurance_provider IN (...) GROUP BY patient HAVING SUM > 2500.',['SELECT','INNER JOIN','GROUP BY','HAVING','SUM'],['first_name','last_name','insurance_provider','total_billed'],
    "SELECT p.first_name, p.last_name, p.insurance_provider, ROUND(SUM(b.total_charge), 2) AS total_billed FROM billing b JOIN patients p ON b.patient_id = p.id WHERE p.insurance_provider IN ('BlueCross', 'Aetna', 'UnitedHealth') GROUP BY p.id, p.first_name, p.last_name, p.insurance_provider HAVING SUM(b.total_charge) > 2500.00 ORDER BY total_billed DESC;",'t',
    ['Join billing to patients.','Filter for top commercial carriers.','Group by patient and filter HAVING total charges > 2500.'],'Identifies high-utilization commercial insurer patient accounts.',30,8),

  q('hc-L3-100','healthcare',3,100,'boss','Chief Medical Officer Master Clinical Acuity Index','Dr. Evelyn Reed','Chief Medical Officer',
    'Executive Board Patient Audit: Rank patients with the highest composite clinical complexity — patients who have attended at least 1 completed visit, have at least 1 severe diagnosis, and have undergone at least 1 lab test with an abnormal flag. Return patient first name, last name, city, and total billed charges across all vouchers.','Complex JOIN spanning patients, appointments, diagnoses, lab results, and billing.',['SELECT','INNER JOIN','EXISTS','GROUP BY','SUM'],['first_name','last_name','city','total_hospital_billed'],
    "SELECT p.first_name, p.last_name, p.city, ROUND(SUM(b.total_charge), 2) AS total_hospital_billed FROM patients p JOIN billing b ON p.id = b.patient_id WHERE EXISTS (SELECT 1 FROM appointments a WHERE a.patient_id = p.id AND a.status = 'completed') AND EXISTS (SELECT 1 FROM diagnoses dg WHERE dg.patient_id = p.id AND dg.severity = 'Severe') AND EXISTS (SELECT 1 FROM patient_lab_results plr WHERE plr.patient_id = p.id AND plr.flag IN ('HIGH', 'LOW')) GROUP BY p.id, p.first_name, p.last_name, p.city ORDER BY total_hospital_billed DESC LIMIT 10;",'t',
    ['Correlate 3 clinical criteria (completed appointment, severe diagnosis, abnormal lab).','Join with billing to aggregate total hospital charges.','Order by total billed DESC LIMIT 10.'],'Capstone executive patient complexity audit linking high clinical risk to aggregate health system financial charges.',30,10)
];

const outPath = path.resolve(__dirname, '../src/lib/content/hc-l3-questions.ts');
const fileContent = `import { QuestionDefinition } from "./ecom-l1-questions";

export const HC_L3_QUESTIONS: QuestionDefinition[] = ${JSON.stringify(L3, null, 2)};
`;

fs.writeFileSync(outPath, fileContent, 'utf-8');
console.log('Successfully generated HC_L3_QUESTIONS: ' + L3.length + ' questions.');
