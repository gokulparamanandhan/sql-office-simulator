import { PGlite } from "@electric-sql/pglite";

async function main() {
  console.log("Starting test of all 9 Advanced SQL constructs in PGlite...");
  const pg = new PGlite();

  // Initialize test schema
  await pg.exec(`
    CREATE TABLE employees (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      department_id INT,
      salary NUMERIC(10, 2),
      manager_id INT
    );

    INSERT INTO employees (name, department_id, salary, manager_id) VALUES
      ('Alice', 1, 120000, NULL),
      ('Bob', 1, 95000, 1),
      ('Charlie', 2, 80000, 1),
      ('Diana', 2, 110000, NULL),
      ('Evan', 1, 60000, 2);

    CREATE TABLE audit_log (
      id SERIAL PRIMARY KEY,
      event_type VARCHAR(50),
      details TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Base tables created.");

  // 1. Subqueries (Correlated subquery)
  const subqueryRes = await pg.exec(`
    SELECT name, salary
    FROM employees e
    WHERE salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id);
  `);
  console.log("1. Subquery success:", subqueryRes[0].rows.length, "rows");

  // 2. CTE (Recursive CTE for hierarchy)
  const cteRes = await pg.exec(`
    WITH RECURSIVE org_chart AS (
      SELECT id, name, manager_id, 1 as level
      FROM employees
      WHERE manager_id IS NULL
      UNION ALL
      SELECT e.id, e.name, e.manager_id, o.level + 1
      FROM employees e
      INNER JOIN org_chart o ON e.manager_id = o.id
    )
    SELECT * FROM org_chart ORDER BY level, name;
  `);
  console.log("2. Recursive CTE success:", cteRes[0].rows.length, "rows");

  // 3. Views
  const viewRes = await pg.exec(`
    CREATE OR REPLACE VIEW high_earners_view AS
    SELECT name, salary FROM employees WHERE salary >= 90000;

    SELECT * FROM high_earners_view ORDER BY salary DESC;
  `);
  console.log("3. View success:", viewRes[viewRes.length - 1].rows.length, "rows");

  // 4. CTAS and Temp Tables
  const tempRes = await pg.exec(`
    CREATE TEMP TABLE temp_dept_summary AS
    SELECT department_id, COUNT(*) as emp_count, AVG(salary) as avg_sal
    FROM employees
    GROUP BY department_id;

    SELECT * FROM temp_dept_summary;
  `);
  console.log("4. CTAS & Temp Table success:", tempRes[tempRes.length - 1].rows.length, "rows");

  // 5. Stored Procedures
  const procRes = await pg.exec(`
    CREATE OR REPLACE PROCEDURE give_bonus(dept_id INT, bonus_pct NUMERIC)
    LANGUAGE plpgsql
    AS $$
    BEGIN
      UPDATE employees
      SET salary = salary * (1 + bonus_pct / 100)
      WHERE department_id = dept_id;

      INSERT INTO audit_log (event_type, details)
      VALUES ('BONUS_APPLIED', 'Applied bonus to dept ' || dept_id);
    END;
    $$;

    CALL give_bonus(1, 10);

    SELECT * FROM audit_log WHERE event_type = 'BONUS_APPLIED';
  `);
  console.log("5. Stored Procedure success:", procRes[procRes.length - 1].rows.length, "audit row logged");

  // 6. Triggers
  const triggerRes = await pg.exec(`
    CREATE OR REPLACE FUNCTION audit_salary_change()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
      IF NEW.salary <> OLD.salary THEN
        INSERT INTO audit_log (event_type, details)
        VALUES ('SALARY_CHANGE', 'Emp ' || OLD.name || ' salary changed from ' || OLD.salary || ' to ' || NEW.salary);
      END IF;
      RETURN NEW;
    END;
    $$;

    CREATE TRIGGER trg_employee_salary_audit
    AFTER UPDATE OF salary ON employees
    FOR EACH ROW
    EXECUTE FUNCTION audit_salary_change();

    UPDATE employees SET salary = salary + 5000 WHERE name = 'Bob';

    SELECT * FROM audit_log WHERE event_type = 'SALARY_CHANGE';
  `);
  console.log("6. Trigger success:", triggerRes[triggerRes.length - 1].rows.length, "audit trigger fired");

  // 7. Indexes
  const indexRes = await pg.exec(`
    CREATE INDEX idx_employees_dept_salary ON employees(department_id, salary DESC);

    SELECT indexname, tablename FROM pg_indexes WHERE tablename = 'employees';
  `);
  console.log("7. Index created successfully:", indexRes[indexRes.length - 1].rows.map(r => r.indexname));

  // 8. Execution Plan (EXPLAIN & EXPLAIN ANALYZE FORMAT JSON)
  const planRes = await pg.exec(`
    EXPLAIN (ANALYZE, FORMAT JSON)
    SELECT * FROM employees WHERE department_id = 1 AND salary > 100000;
  `);
  const planJson = planRes[0].rows[0]["QUERY PLAN"];
  console.log("8. Execution Plan success! Top Node Type:", planJson[0].Plan["Node Type"]);

  // 9. Partitions (Declarative Partitioning)
  const partitionRes = await pg.exec(`
    CREATE TABLE sales_orders (
      id INT,
      order_date DATE,
      amount NUMERIC
    ) PARTITION BY RANGE (order_date);

    CREATE TABLE sales_orders_2025 PARTITION OF sales_orders
      FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

    CREATE TABLE sales_orders_2026 PARTITION OF sales_orders
      FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

    INSERT INTO sales_orders VALUES
      (1, '2025-06-15', 150.00),
      (2, '2026-03-20', 320.00);

    EXPLAIN (FORMAT JSON)
    SELECT * FROM sales_orders WHERE order_date >= '2026-01-01';
  `);
  const partPlan = partitionRes[partitionRes.length - 1].rows[0]["QUERY PLAN"];
  console.log("9. Partition & Pruning success! Plan:", JSON.stringify(partPlan[0].Plan["Plans"] || partPlan[0].Plan["Node Type"]));

  console.log("\nALL 9 ADVANCED SQL CONSTRUCTS SUCCEEDED NATIVELY IN PGLITE!");
}

main().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});

