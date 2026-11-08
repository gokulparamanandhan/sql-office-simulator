import { PGlite } from "@electric-sql/pglite";
import { generateDomainSql } from "../src/lib/datasets/multi-domain-generators";

async function testCurriculumQueries() {
  const pg = new PGlite();
  const initSql = generateDomainSql("ecommerce", "main", "ecom_l1");
  await pg.exec(initSql);
  await pg.exec(`SET search_path = "ecom_l1";`);

  const tests = [
    { id: 82, sql: `SELECT first_name, email FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE total_amount >= 300) LIMIT 5;` },
    { id: 83, sql: `SELECT c.first_name, c.region FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id) LIMIT 5;` },
    { id: 84, sql: `SELECT ROUND(AVG(item_count)::numeric, 2) AS avg_items_per_cat FROM (SELECT category_id, COUNT(*) AS item_count FROM products GROUP BY category_id) AS cat_counts;` },
    { id: 85, sql: `WITH high_stock AS (SELECT name, stock_quantity FROM products WHERE stock_quantity > 50) SELECT name, stock_quantity FROM high_stock LIMIT 5;` },
    { id: 86, sql: `WITH RECURSIVE num_series AS (SELECT 1 AS step UNION ALL SELECT step + 1 FROM num_series WHERE step < 5) SELECT step FROM num_series;` },
    { id: 87, sql: `CREATE OR REPLACE VIEW v_premium_catalog AS SELECT name, price, stock_quantity FROM products WHERE price >= 100; SELECT name, price, stock_quantity FROM v_premium_catalog LIMIT 5;` },
    { id: 88, sql: `CREATE TEMP TABLE temp_orders_summary AS SELECT customer_id, COUNT(*) AS order_count, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id; SELECT customer_id, order_count, total_spent FROM temp_orders_summary ORDER BY total_spent DESC LIMIT 5;` },
    { id: 89, sql: `CREATE OR REPLACE PROCEDURE update_stock_level(p_product_id INT, p_delta INT) LANGUAGE plpgsql AS $$ BEGIN UPDATE products SET stock_quantity = stock_quantity + p_delta WHERE id = p_product_id; END; $$; CALL update_stock_level(1, 10); SELECT id, name, stock_quantity FROM products WHERE id = 1;` },
    { id: 90, sql: `CREATE OR REPLACE FUNCTION log_price_change() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$; CREATE TRIGGER trg_price_audit BEFORE UPDATE OF price ON products FOR EACH ROW EXECUTE FUNCTION log_price_change(); SELECT name, price FROM products LIMIT 5;` },
    { id: 91, sql: `CREATE INDEX idx_products_price_stock ON products(price DESC, stock_quantity); SELECT name, price, stock_quantity FROM products WHERE price > 50 ORDER BY price DESC LIMIT 5;` },
    { id: 92, sql: `EXPLAIN (FORMAT JSON) SELECT id, total_amount FROM orders WHERE total_amount > 200;` },
    { id: 93, sql: `CREATE TABLE orders_partitioned (id INT, order_date DATE, amount NUMERIC) PARTITION BY RANGE (order_date); CREATE TABLE orders_p2026 PARTITION OF orders_partitioned FOR VALUES FROM ('2026-01-01') TO ('2027-01-01'); INSERT INTO orders_partitioned VALUES (1, '2026-05-10', 99.00); SELECT id, order_date, amount FROM orders_partitioned;` },
    { id: 94, sql: `SELECT name, price, ROW_NUMBER() OVER (ORDER BY price DESC) AS price_rank FROM products LIMIT 5;` },
    { id: 95, sql: `SELECT name, price, DENSE_RANK() OVER (ORDER BY price DESC) AS price_dense_rank FROM products LIMIT 5;` },
    { id: 96, sql: `SELECT name, category_id, price, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC) AS rank_in_category FROM products LIMIT 10;` },
    { id: 97, sql: `SELECT id, order_date, total_amount, SUM(total_amount) OVER (ORDER BY order_date, id) AS running_total FROM orders LIMIT 5;` },
    { id: 98, sql: `SELECT id, order_date, total_amount, LAG(total_amount, 1) OVER (ORDER BY order_date, id) AS prev_amount FROM orders LIMIT 5;` },
    { id: 99, sql: `SELECT id, order_date, total_amount, LEAD(total_amount, 1) OVER (ORDER BY order_date, id) AS next_amount FROM orders LIMIT 5;` },
    { id: 100, sql: `WITH ranked_items AS (SELECT name, price, category_id, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS rnk FROM products) SELECT name, price, category_id FROM ranked_items WHERE rnk = 1 LIMIT 5;` }
  ];

  for (const t of tests) {
    const res = await pg.exec(t.sql);
    const finalRes = res[res.length - 1];
    const cols = finalRes.fields.map(f => f.name);
    console.log(`Q${t.id}: OK (${cols.join(", ")}) [${finalRes.rows.length} rows]`);
  }

  console.log("ALL LEVEL 5 CURRICULUM QUESTIONS VERIFIED WITH REAL PGLITE EXECUTION!");
}

testCurriculumQueries().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
