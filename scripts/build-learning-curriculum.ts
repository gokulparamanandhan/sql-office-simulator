import fs from "fs";
import path from "path";

// Define 100 questions across 5 levels (20 questions per level)
const questions = [];

// Level 1: Foundations & Projections (1 to 20)
const l1Data = [
  {
    topic: "SELECT Specific Columns",
    badge: "SELECT",
    title: "1. Selecting Columns",
    conceptSummary: "The SELECT statement retrieves specified columns from a database table.",
    conceptExample: "SELECT name, price FROM products;",
    task: "Write a query to select 'name' and 'price' from products.",
    starterSql: "SELECT name, price FROM products;",
    referenceSql: "SELECT name, price FROM products;",
    expectedColumns: ["name", "price"]
  },
  {
    topic: "Column Aliasing",
    badge: "AS",
    title: "2. Column Aliasing with AS",
    conceptSummary: "Use AS to rename a column in the output for cleaner reporting.",
    conceptExample: "SELECT name AS item_title, price AS retail_cost FROM products;",
    task: "Select 'name' aliased as 'product_title' and 'stock_quantity' aliased as 'stock_count' from products.",
    starterSql: "SELECT name AS product_title, stock_quantity AS stock_count FROM products;",
    referenceSql: "SELECT name AS product_title, stock_quantity AS stock_count FROM products;",
    expectedColumns: ["product_title", "stock_count"]
  },
  {
    topic: "Basic Arithmetic",
    badge: "ARITHMETIC",
    title: "3. Calculated Columns",
    conceptSummary: "Perform math operations (+, -, *, /) directly inside your SELECT statement.",
    conceptExample: "SELECT name, price, (price - cost) AS profit_margin FROM products;",
    task: "Select 'name', 'price', and calculate (price - cost) aliased as 'unit_profit' from products.",
    starterSql: "SELECT name, price, (price - cost) AS unit_profit FROM products;",
    referenceSql: "SELECT name, price, (price - cost) AS unit_profit FROM products;",
    expectedColumns: ["name", "price", "unit_profit"]
  },
  {
    topic: "Unique Values",
    badge: "DISTINCT",
    title: "4. Removing Duplicates with DISTINCT",
    conceptSummary: "DISTINCT removes duplicate values from query results.",
    conceptExample: "SELECT DISTINCT region FROM customers;",
    task: "Select all distinct regions from the customers table aliased as 'region'.",
    starterSql: "SELECT DISTINCT region FROM customers;",
    referenceSql: "SELECT DISTINCT region FROM customers;",
    expectedColumns: ["region"]
  },
  {
    topic: "String Concatenation",
    badge: "CONCAT",
    title: "5. Combining Text Fields",
    conceptSummary: "In PostgreSQL, use || or CONCAT() to join strings together.",
    conceptExample: "SELECT name || ' (' || status || ')' AS product_status FROM products;",
    task: "Select 'name' and combine carrier with tracking_number as 'shipment_code' from shipments.",
    starterSql: "SELECT carrier, tracking_number, (carrier || '-' || tracking_number) AS shipment_code FROM shipments;",
    referenceSql: "SELECT carrier, tracking_number, (carrier || '-' || tracking_number) AS shipment_code FROM shipments;",
    expectedColumns: ["carrier", "tracking_number", "shipment_code"]
  },
  {
    topic: "Limiting Output",
    badge: "LIMIT",
    title: "6. Restricting Row Count",
    conceptSummary: "LIMIT limits the total number of records returned by a query.",
    conceptExample: "SELECT name, price FROM products LIMIT 5;",
    task: "Select 'name' and 'price' from products, restricted to 10 rows.",
    starterSql: "SELECT name, price FROM products LIMIT 10;",
    referenceSql: "SELECT name, price FROM products LIMIT 10;",
    expectedColumns: ["name", "price"]
  },
  {
    topic: "Skipping Rows",
    badge: "OFFSET",
    title: "7. Paginating with OFFSET",
    conceptSummary: "OFFSET skips a specified number of initial rows before returning data.",
    conceptExample: "SELECT name, price FROM products LIMIT 5 OFFSET 5;",
    task: "Select 'name' and 'price' from products with LIMIT 5 OFFSET 5.",
    starterSql: "SELECT name, price FROM products LIMIT 5 OFFSET 5;",
    referenceSql: "SELECT name, price FROM products LIMIT 5 OFFSET 5;",
    expectedColumns: ["name", "price"]
  },
  {
    topic: "Simple Equality",
    badge: "WHERE =",
    title: "8. Filtering with WHERE =",
    conceptSummary: "The WHERE clause filters rows matching a condition.",
    conceptExample: "SELECT name, price FROM products WHERE status = 'active';",
    task: "Select 'name' and 'price' of active products.",
    starterSql: "SELECT name, price FROM products WHERE status = 'active';",
    referenceSql: "SELECT name, price FROM products WHERE status = 'active';",
    expectedColumns: ["name", "price"]
  },
  {
    topic: "Inequality Filter",
    badge: "WHERE !=",
    title: "9. Filtering Inactive Records",
    conceptSummary: "Use != or <> to exclude rows matching a specific value.",
    conceptExample: "SELECT name, status FROM products WHERE status != 'discontinued';",
    task: "Select 'name' and 'status' from products where status != 'discontinued'.",
    starterSql: "SELECT name, status FROM products WHERE status != 'discontinued';",
    referenceSql: "SELECT name, status FROM products WHERE status != 'discontinued';",
    expectedColumns: ["name", "status"]
  },
  {
    topic: "Comparison Operators",
    badge: "WHERE >",
    title: "10. Greater Than Filters",
    conceptSummary: "Use > to filter rows strictly above a numeric threshold.",
    conceptExample: "SELECT name, price FROM products WHERE price > 50;",
    task: "Select 'name' and 'price' from products where price > 100.",
    starterSql: "SELECT name, price FROM products WHERE price > 100;",
    referenceSql: "SELECT name, price FROM products WHERE price > 100;",
    expectedColumns: ["name", "price"]
  },
  {
    topic: "Comparison Operators",
    badge: "WHERE <=",
    title: "11. Less Than or Equal",
    conceptSummary: "Use <= to filter rows at or below a certain limit.",
    conceptExample: "SELECT name, stock_quantity FROM products WHERE stock_quantity <= 15;",
    task: "Select 'name' and 'stock_quantity' for products with stock_quantity <= 20.",
    starterSql: "SELECT name, stock_quantity FROM products WHERE stock_quantity <= 20;",
    referenceSql: "SELECT name, stock_quantity FROM products WHERE stock_quantity <= 20;",
    expectedColumns: ["name", "stock_quantity"]
  },
  {
    topic: "Logical AND",
    badge: "AND",
    title: "12. Multi-Condition Filtering",
    conceptSummary: "AND requires all combined conditions to evaluate to TRUE.",
    conceptExample: "SELECT name, price, stock_quantity FROM products WHERE price > 50 AND stock_quantity > 0;",
    task: "Select 'name', 'price', and 'stock_quantity' where price >= 50 AND stock_quantity > 10.",
    starterSql: "SELECT name, price, stock_quantity FROM products WHERE price >= 50 AND stock_quantity > 10;",
    referenceSql: "SELECT name, price, stock_quantity FROM products WHERE price >= 50 AND stock_quantity > 10;",
    expectedColumns: ["name", "price", "stock_quantity"]
  },
  {
    topic: "Logical OR",
    badge: "OR",
    title: "13. Alternative Conditions",
    conceptSummary: "OR satisfies the filter if at least one of the conditions is TRUE.",
    conceptExample: "SELECT name, region FROM customers WHERE region = 'North' OR region = 'South';",
    task: "Select 'name' and 'region' from customers where region = 'East' OR region = 'West'.",
    starterSql: "SELECT name, region FROM customers WHERE region = 'East' OR region = 'West';",
    referenceSql: "SELECT name, region FROM customers WHERE region = 'East' OR region = 'West';",
    expectedColumns: ["name", "region"]
  },
  {
    topic: "Parenthesized Logic",
    badge: "AND / OR",
    title: "14. Grouping Boolean Logic",
    conceptSummary: "Use parentheses to enforce evaluation order between AND and OR clauses.",
    conceptExample: "SELECT name, price, status FROM products WHERE (status = 'active' OR status = 'new') AND price < 100;",
    task: "Select 'name', 'price', and 'status' from products where (status = 'active' OR status = 'new') AND price < 80.",
    starterSql: "SELECT name, price, status FROM products WHERE (status = 'active' OR status = 'new') AND price < 80;",
    referenceSql: "SELECT name, price, status FROM products WHERE (status = 'active' OR status = 'new') AND price < 80;",
    expectedColumns: ["name", "price", "status"]
  },
  {
    topic: "Sorting Ascending",
    badge: "ORDER BY",
    title: "15. Sorting Results Ascending",
    conceptSummary: "ORDER BY arranges output rows. The default order is ASC (lowest to highest).",
    conceptExample: "SELECT name, price FROM products ORDER BY price ASC;",
    task: "Select 'name' and 'price' from products ordered by price ascending.",
    starterSql: "SELECT name, price FROM products ORDER BY price ASC;",
    referenceSql: "SELECT name, price FROM products ORDER BY price ASC;",
    expectedColumns: ["name", "price"]
  },
  {
    topic: "Sorting Descending",
    badge: "ORDER BY DESC",
    title: "16. Sorting Results Descending",
    conceptSummary: "Add DESC to ORDER BY to sort from highest to lowest or Z to A.",
    conceptExample: "SELECT name, price FROM products ORDER BY price DESC;",
    task: "Select 'name' and 'price' from products ordered by price descending.",
    starterSql: "SELECT name, price FROM products ORDER BY price DESC;",
    referenceSql: "SELECT name, price FROM products ORDER BY price DESC;",
    expectedColumns: ["name", "price"]
  },
  {
    topic: "Multi-Column Sorting",
    badge: "ORDER BY",
    title: "17. Multi-Level Sort Hierarchy",
    conceptSummary: "Separate columns by comma to break ties in preceding sort columns.",
    conceptExample: "SELECT category_id, name, price FROM products ORDER BY category_id ASC, price DESC;",
    task: "Select 'category_id', 'name', and 'price' from products ORDER BY category_id ASC, price DESC.",
    starterSql: "SELECT category_id, name, price FROM products ORDER BY category_id ASC, price DESC;",
    referenceSql: "SELECT category_id, name, price FROM products ORDER BY category_id ASC, price DESC;",
    expectedColumns: ["category_id", "name", "price"]
  },
  {
    topic: "Alias Sorting",
    badge: "ORDER BY ALIAS",
    title: "18. Sorting by Calculated Aliases",
    conceptSummary: "In SQL, ORDER BY can directly reference column aliases created in SELECT.",
    conceptExample: "SELECT name, (price - cost) AS profit FROM products ORDER BY profit DESC;",
    task: "Select 'name' and (price - cost) AS 'profit' from products ORDER BY profit DESC.",
    starterSql: "SELECT name, (price - cost) AS profit FROM products ORDER BY profit DESC;",
    referenceSql: "SELECT name, (price - cost) AS profit FROM products ORDER BY profit DESC;",
    expectedColumns: ["name", "profit"]
  },
  {
    topic: "Top N Analysis",
    badge: "LIMIT + ORDER",
    title: "19. Finding Top N Records",
    conceptSummary: "Combine ORDER BY DESC with LIMIT N to find the top performing items.",
    conceptExample: "SELECT name, price FROM products ORDER BY price DESC LIMIT 3;",
    task: "Select 'name' and 'price' of the top 5 most expensive products.",
    starterSql: "SELECT name, price FROM products ORDER BY price DESC LIMIT 5;",
    referenceSql: "SELECT name, price FROM products ORDER BY price DESC LIMIT 5;",
    expectedColumns: ["name", "price"]
  },
  {
    topic: "Milestone Practice",
    badge: "MILESTONE",
    title: "20. Level 1 Foundation Milestone",
    conceptSummary: "Put all Level 1 concepts together: SELECT, Aliasing, Math, Filtering, Sorting, and LIMIT.",
    conceptExample: "SELECT name AS item, (price * stock_quantity) AS inventory_value FROM products WHERE status = 'active' ORDER BY inventory_value DESC LIMIT 5;",
    task: "Select 'name' as item, (price * stock_quantity) as total_val from products where status = 'active' order by total_val desc limit 5.",
    starterSql: "SELECT name AS item, (price * stock_quantity) AS total_val FROM products WHERE status = 'active' ORDER BY total_val DESC LIMIT 5;",
    referenceSql: "SELECT name AS item, (price * stock_quantity) AS total_val FROM products WHERE status = 'active' ORDER BY total_val DESC LIMIT 5;",
    expectedColumns: ["item", "total_val"]
  }
];

// Level 2: Advanced Filtering & Text Operators (21 to 40)
const l2Data = [
  {
    topic: "List Filtering",
    badge: "IN",
    title: "21. Matching Items with IN",
    conceptSummary: "IN allows you to specify multiple discrete values in a WHERE clause.",
    conceptExample: "SELECT name, region FROM customers WHERE region IN ('North', 'East');",
    task: "Select 'name' and 'region' from customers where region is in ('North', 'South').",
    starterSql: "SELECT name, region FROM customers WHERE region IN ('North', 'South');",
    referenceSql: "SELECT name, region FROM customers WHERE region IN ('North', 'South');",
    expectedColumns: ["name", "region"]
  },
  {
    topic: "Excluding Lists",
    badge: "NOT IN",
    title: "22. Excluding Items with NOT IN",
    conceptSummary: "NOT IN filters out any row matching elements in the target list.",
    conceptExample: "SELECT name, status FROM orders WHERE status NOT IN ('cancelled', 'returned');",
    task: "Select 'id' and 'status' from orders where status NOT IN ('cancelled', 'returned');",
    starterSql: "SELECT id, status FROM orders WHERE status NOT IN ('cancelled', 'returned');",
    referenceSql: "SELECT id, status FROM orders WHERE status NOT IN ('cancelled', 'returned');",
    expectedColumns: ["id", "status"]
  },
  {
    topic: "Range Filtering",
    badge: "BETWEEN",
    title: "23. Inclusive Ranges with BETWEEN",
    conceptSummary: "BETWEEN selects values within an inclusive range (low AND high).",
    conceptExample: "SELECT name, price FROM products WHERE price BETWEEN 20 AND 80;",
    task: "Select 'name' and 'price' for products with price BETWEEN 30 AND 70.",
    starterSql: "SELECT name, price FROM products WHERE price BETWEEN 30 AND 70;",
    referenceSql: "SELECT name, price FROM products WHERE price BETWEEN 30 AND 70;",
    expectedColumns: ["name", "price"]
  },
  {
    topic: "Range Exclusion",
    badge: "NOT BETWEEN",
    title: "24. Outlier Ranges with NOT BETWEEN",
    conceptSummary: "NOT BETWEEN filters rows outside of the specified boundary.",
    conceptExample: "SELECT name, price FROM products WHERE price NOT BETWEEN 20 AND 100;",
    task: "Select 'name' and 'price' from products where price NOT BETWEEN 25 AND 120.",
    starterSql: "SELECT name, price FROM products WHERE price NOT BETWEEN 25 AND 120;",
    referenceSql: "SELECT name, price FROM products WHERE price NOT BETWEEN 25 AND 120;",
    expectedColumns: ["name", "price"]
  },
  {
    topic: "Wildcard Matching",
    badge: "LIKE %",
    title: "25. Prefix Search with LIKE",
    conceptSummary: "The percent sign (%) wildcard represents zero, one, or multiple characters.",
    conceptExample: "SELECT name FROM customers WHERE name LIKE 'A%';",
    task: "Select 'name' and 'email' from customers where name starts with 'J'.",
    starterSql: "SELECT name, email FROM customers WHERE name LIKE 'J%';",
    referenceSql: "SELECT name, email FROM customers WHERE name LIKE 'J%';",
    expectedColumns: ["name", "email"]
  },
  {
    topic: "Wildcard Matching",
    badge: "LIKE %",
    title: "26. Suffix Search with LIKE",
    conceptSummary: "Use '%value' to match strings ending with a specific character sequence.",
    conceptExample: "SELECT name, email FROM customers WHERE email LIKE '%@gmail.com';",
    task: "Select 'name' and 'email' from customers with emails ending in '.com'.",
    starterSql: "SELECT name, email FROM customers WHERE email LIKE '%.com';",
    referenceSql: "SELECT name, email FROM customers WHERE email LIKE '%.com';",
    expectedColumns: ["name", "email"]
  },
  {
    topic: "Substring Matching",
    badge: "LIKE %text%",
    title: "27. Substring Search with LIKE",
    conceptSummary: "Surround your target term with % signs to match text appearing anywhere.",
    conceptExample: "SELECT name FROM products WHERE name LIKE '%Pro%';",
    task: "Select 'name' and 'price' from products containing 'Wireless' in the name.",
    starterSql: "SELECT name, price FROM products WHERE name LIKE '%Wireless%';",
    referenceSql: "SELECT name, price FROM products WHERE name LIKE '%Wireless%';",
    expectedColumns: ["name", "price"]
  },
  {
    topic: "Case-Insensitive Search",
    badge: "ILIKE",
    title: "28. Case-Insensitive Matching with ILIKE",
    conceptSummary: "PostgreSQL supports ILIKE for case-insensitive pattern matching.",
    conceptExample: "SELECT name FROM products WHERE name ILIKE '%desk%';",
    task: "Select 'name' and 'price' from products where name ILIKE '%desk%'.",
    starterSql: "SELECT name, price FROM products WHERE name ILIKE '%desk%';",
    referenceSql: "SELECT name, price FROM products WHERE name ILIKE '%desk%';",
    expectedColumns: ["name", "price"]
  },
  {
    topic: "Single Character Wildcard",
    badge: "LIKE _",
    title: "29. Exact Character Length with Underscore",
    conceptSummary: "The underscore (_) wildcard matches exactly one character.",
    conceptExample: "SELECT name FROM departments WHERE name LIKE 'E__%';",
    task: "Select 'id' and 'name' from categories where name LIKE 'B____';",
    starterSql: "SELECT id, name FROM categories WHERE name LIKE 'B____';",
    referenceSql: "SELECT id, name FROM categories WHERE name LIKE 'B____';",
    expectedColumns: ["id", "name"]
  },
  {
    topic: "Missing Data",
    badge: "IS NULL",
    title: "30. Finding Missing Data with IS NULL",
    conceptSummary: "In SQL, NULL cannot be compared with =. You must use IS NULL.",
    conceptExample: "SELECT id, tracking_number FROM shipments WHERE delivered_at IS NULL;",
    task: "Select 'id', 'carrier', and 'tracking_number' from shipments where delivered_at IS NULL.",
    starterSql: "SELECT id, carrier, tracking_number FROM shipments WHERE delivered_at IS NULL;",
    referenceSql: "SELECT id, carrier, tracking_number FROM shipments WHERE delivered_at IS NULL;",
    expectedColumns: ["id", "carrier", "tracking_number"]
  },
  {
    topic: "Complete Data",
    badge: "IS NOT NULL",
    title: "31. Filtering Out Nulls with IS NOT NULL",
    conceptSummary: "IS NOT NULL selects only rows that have a populated value.",
    conceptExample: "SELECT id, delivered_at FROM shipments WHERE delivered_at IS NOT NULL;",
    task: "Select 'id', 'carrier', and 'delivered_at' from shipments where delivered_at IS NOT NULL.",
    starterSql: "SELECT id, carrier, delivered_at FROM shipments WHERE delivered_at IS NOT NULL;",
    referenceSql: "SELECT id, carrier, delivered_at FROM shipments WHERE delivered_at IS NOT NULL;",
    expectedColumns: ["id", "carrier", "delivered_at"]
  },
  {
    topic: "Null Fallbacks",
    badge: "COALESCE",
    title: "32. Fallback Values with COALESCE",
    conceptSummary: "COALESCE returns the first non-null argument in its list.",
    conceptExample: "SELECT id, COALESCE(delivered_at::text, 'In Transit') AS delivery_status FROM shipments;",
    task: "Select 'id', COALESCE(delivered_at::text, 'Pending') as delivery_info from shipments.",
    starterSql: "SELECT id, COALESCE(delivered_at::text, 'Pending') AS delivery_info FROM shipments;",
    referenceSql: "SELECT id, COALESCE(delivered_at::text, 'Pending') AS delivery_info FROM shipments;",
    expectedColumns: ["id", "delivery_info"]
  },
  {
    topic: "Math Functions",
    badge: "ROUND",
    title: "33. Rounding Numbers with ROUND()",
    conceptSummary: "ROUND(numeric_expression, decimals) rounds values to the specified decimal precision.",
    conceptExample: "SELECT name, ROUND(price::numeric, 1) AS rounded_price FROM products;",
    task: "Select 'name' and ROUND(price::numeric, 0) as rounded_price from products.",
    starterSql: "SELECT name, ROUND(price::numeric, 0) AS rounded_price FROM products;",
    referenceSql: "SELECT name, ROUND(price::numeric, 0) AS rounded_price FROM products;",
    expectedColumns: ["name", "rounded_price"]
  },
  {
    topic: "Text Formatting",
    badge: "UPPER",
    title: "34. Capitalizing Text with UPPER()",
    conceptSummary: "UPPER(string) converts all letters to uppercase.",
    conceptExample: "SELECT UPPER(name) AS loud_name FROM departments;",
    task: "Select UPPER(name) as department_name from departments.",
    starterSql: "SELECT UPPER(name) AS department_name FROM departments;",
    referenceSql: "SELECT UPPER(name) AS department_name FROM departments;",
    expectedColumns: ["department_name"]
  },
  {
    topic: "Text Formatting",
    badge: "LOWER",
    title: "35. Lowercasing Text with LOWER()",
    conceptSummary: "LOWER(string) converts all letters to lowercase.",
    conceptExample: "SELECT LOWER(email) AS clean_email FROM customers;",
    task: "Select 'name' and LOWER(email) as clean_email from customers.",
    starterSql: "SELECT name, LOWER(email) AS clean_email FROM customers;",
    referenceSql: "SELECT name, LOWER(email) AS clean_email FROM customers;",
    expectedColumns: ["name", "clean_email"]
  },
  {
    topic: "Text Analysis",
    badge: "LENGTH",
    title: "36. String Length with LENGTH()",
    conceptSummary: "LENGTH(string) returns the character count of a string.",
    conceptExample: "SELECT name, LENGTH(name) AS char_count FROM products;",
    task: "Select 'name' and LENGTH(name) as char_count from products ORDER BY char_count DESC LIMIT 5.",
    starterSql: "SELECT name, LENGTH(name) AS char_count FROM products ORDER BY char_count DESC LIMIT 5;",
    referenceSql: "SELECT name, LENGTH(name) AS char_count FROM products ORDER BY char_count DESC LIMIT 5;",
    expectedColumns: ["name", "char_count"]
  },
  {
    topic: "Date Comparison",
    badge: "DATE >=",
    title: "37. Filtering by Date",
    conceptSummary: "Dates can be compared using standard comparison operators (>=, <=, =).",
    conceptExample: "SELECT id, order_date, total_amount FROM orders WHERE order_date >= '2023-01-01';",
    task: "Select 'id', 'order_date', and 'total_amount' from orders where order_date >= '2023-01-01';",
    starterSql: "SELECT id, order_date, total_amount FROM orders WHERE order_date >= '2023-01-01';",
    referenceSql: "SELECT id, order_date, total_amount FROM orders WHERE order_date >= '2023-01-01';",
    expectedColumns: ["id", "order_date", "total_amount"]
  },
  {
    topic: "Date Ranges",
    badge: "BETWEEN DATES",
    title: "38. Date Ranges with BETWEEN",
    conceptSummary: "Filter records between two calendar dates.",
    conceptExample: "SELECT id, order_date FROM orders WHERE order_date BETWEEN '2023-01-01' AND '2023-06-30';",
    task: "Select 'id', 'order_date', and 'total_amount' from orders where order_date BETWEEN '2023-01-01' AND '2023-06-30';",
    starterSql: "SELECT id, order_date, total_amount FROM orders WHERE order_date BETWEEN '2023-01-01' AND '2023-06-30';",
    referenceSql: "SELECT id, order_date, total_amount FROM orders WHERE order_date BETWEEN '2023-01-01' AND '2023-06-30';",
    expectedColumns: ["id", "order_date", "total_amount"]
  },
  {
    topic: "Date Extraction",
    badge: "EXTRACT",
    title: "39. Extracting Calendar Parts with EXTRACT()",
    conceptSummary: "EXTRACT(YEAR FROM date_col) or EXTRACT(MONTH FROM date_col) pulls individual components.",
    conceptExample: "SELECT id, EXTRACT(YEAR FROM order_date) AS order_year FROM orders;",
    task: "Select 'id', EXTRACT(YEAR FROM order_date) as order_year from orders LIMIT 10.",
    starterSql: "SELECT id, EXTRACT(YEAR FROM order_date) AS order_year FROM orders LIMIT 10;",
    referenceSql: "SELECT id, EXTRACT(YEAR FROM order_date) AS order_year FROM orders LIMIT 10;",
    expectedColumns: ["id", "order_year"]
  },
  {
    topic: "Milestone Practice",
    badge: "MILESTONE",
    title: "40. Level 2 Filtering Milestone",
    conceptSummary: "Master pattern matching, null safety, and string formatting in one query.",
    conceptExample: "SELECT name, email, region FROM customers WHERE region IN ('North', 'Central') AND email LIKE '%.com' ORDER BY name ASC LIMIT 5;",
    task: "Select 'name', 'email', and 'region' from customers where region IN ('North', 'Central') and email LIKE '%.com' order by name asc limit 5.",
    starterSql: "SELECT name, email, region FROM customers WHERE region IN ('North', 'Central') AND email LIKE '%.com' ORDER BY name ASC LIMIT 5;",
    referenceSql: "SELECT name, email, region FROM customers WHERE region IN ('North', 'Central') AND email LIKE '%.com' ORDER BY name ASC LIMIT 5;",
    expectedColumns: ["name", "email", "region"]
  }
];

// Level 3: Aggregations & Grouping (41 to 60)
const l3Data = [
  {
    topic: "Row Counting",
    badge: "COUNT(*)",
    title: "41. Total Row Count with COUNT(*)",
    conceptSummary: "COUNT(*) counts the total number of rows matching the query condition.",
    conceptExample: "SELECT COUNT(*) AS total_customers FROM customers;",
    task: "Select COUNT(*) aliased as 'total_customers' from customers.",
    starterSql: "SELECT COUNT(*) AS total_customers FROM customers;",
    referenceSql: "SELECT COUNT(*) AS total_customers FROM customers;",
    expectedColumns: ["total_customers"]
  },
  {
    topic: "Column Counting",
    badge: "COUNT(col)",
    title: "42. Counting Non-Null Values",
    conceptSummary: "COUNT(column) only counts rows where that specific column is NOT NULL.",
    conceptExample: "SELECT COUNT(delivered_at) AS delivered_count FROM shipments;",
    task: "Select COUNT(delivered_at) as 'delivered_count' from shipments.",
    starterSql: "SELECT COUNT(delivered_at) AS delivered_count FROM shipments;",
    referenceSql: "SELECT COUNT(delivered_at) AS delivered_count FROM shipments;",
    expectedColumns: ["delivered_count"]
  },
  {
    topic: "Distinct Counting",
    badge: "COUNT(DISTINCT)",
    title: "43. Counting Unique Entities",
    conceptSummary: "COUNT(DISTINCT column) tallies unique values, ignoring repeats.",
    conceptExample: "SELECT COUNT(DISTINCT customer_id) AS active_buyers FROM orders;",
    task: "Select COUNT(DISTINCT customer_id) as 'unique_buyers' from orders.",
    starterSql: "SELECT COUNT(DISTINCT customer_id) AS unique_buyers FROM orders;",
    referenceSql: "SELECT COUNT(DISTINCT customer_id) AS unique_buyers FROM orders;",
    expectedColumns: ["unique_buyers"]
  },
  {
    topic: "Summation",
    badge: "SUM",
    title: "44. Adding Values with SUM()",
    conceptSummary: "SUM(column) computes the grand total of numeric values.",
    conceptExample: "SELECT SUM(total_amount) AS gross_sales FROM orders;",
    task: "Select SUM(total_amount) as 'gross_sales' from orders.",
    starterSql: "SELECT SUM(total_amount) AS gross_sales FROM orders;",
    referenceSql: "SELECT SUM(total_amount) AS gross_sales FROM orders;",
    expectedColumns: ["gross_sales"]
  },
  {
    topic: "Averages",
    badge: "AVG",
    title: "45. Calculating Means with AVG()",
    conceptSummary: "AVG(column) calculates the arithmetic average of numeric values.",
    conceptExample: "SELECT AVG(price) AS average_price FROM products;",
    task: "Select ROUND(AVG(price)::numeric, 2) as 'average_price' from products.",
    starterSql: "SELECT ROUND(AVG(price)::numeric, 2) AS average_price FROM products;",
    referenceSql: "SELECT ROUND(AVG(price)::numeric, 2) AS average_price FROM products;",
    expectedColumns: ["average_price"]
  },
  {
    topic: "Maximums",
    badge: "MAX",
    title: "46. Finding Peaks with MAX()",
    conceptSummary: "MAX(column) retrieves the highest value in a column.",
    conceptExample: "SELECT MAX(price) AS highest_price FROM products;",
    task: "Select MAX(price) as 'highest_price' from products.",
    starterSql: "SELECT MAX(price) AS highest_price FROM products;",
    referenceSql: "SELECT MAX(price) AS highest_price FROM products;",
    expectedColumns: ["highest_price"]
  },
  {
    topic: "Minimums",
    badge: "MIN",
    title: "47. Finding Lows with MIN()",
    conceptSummary: "MIN(column) retrieves the lowest value in a column.",
    conceptExample: "SELECT MIN(price) AS lowest_price FROM products;",
    task: "Select MIN(price) as 'lowest_price' from products.",
    starterSql: "SELECT MIN(price) AS lowest_price FROM products;",
    referenceSql: "SELECT MIN(price) AS lowest_price FROM products;",
    expectedColumns: ["lowest_price"]
  },
  {
    topic: "Multi-Aggregates",
    badge: "AGGREGATES",
    title: "48. Combining Summary Metrics",
    conceptSummary: "You can calculate multiple summary statistics in a single query.",
    conceptExample: "SELECT MIN(total_amount) AS min_order, MAX(total_amount) AS max_order FROM orders;",
    task: "Select MIN(total_amount) as min_val, MAX(total_amount) as max_val, COUNT(*) as order_count from orders.",
    starterSql: "SELECT MIN(total_amount) AS min_val, MAX(total_amount) AS max_val, COUNT(*) AS order_count FROM orders;",
    referenceSql: "SELECT MIN(total_amount) AS min_val, MAX(total_amount) AS max_val, COUNT(*) AS order_count FROM orders;",
    expectedColumns: ["min_val", "max_val", "order_count"]
  },
  {
    topic: "Single Grouping",
    badge: "GROUP BY",
    title: "49. Segmenting with GROUP BY",
    conceptSummary: "GROUP BY collapses rows with identical values into summary rows.",
    conceptExample: "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region;",
    task: "Select 'region' and COUNT(*) as customer_count from customers GROUP BY region.",
    starterSql: "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region;",
    referenceSql: "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region;",
    expectedColumns: ["region", "customer_count"]
  },
  {
    topic: "Grouping with SUM",
    badge: "GROUP BY + SUM",
    title: "50. Categorical Totals with GROUP BY",
    conceptSummary: "Calculate totals broken down by a categorical dimension.",
    conceptExample: "SELECT status, SUM(total_amount) AS status_revenue FROM orders GROUP BY status;",
    task: "Select 'status' and SUM(total_amount) as total_revenue from orders GROUP BY status.",
    starterSql: "SELECT status, SUM(total_amount) AS total_revenue FROM orders GROUP BY status;",
    referenceSql: "SELECT status, SUM(total_amount) AS total_revenue FROM orders GROUP BY status;",
    expectedColumns: ["status", "total_revenue"]
  },
  {
    topic: "Grouping with AVG",
    badge: "GROUP BY + AVG",
    title: "51. Categorical Averages",
    conceptSummary: "Compute averages per category by combining AVG with GROUP BY.",
    conceptExample: "SELECT category_id, AVG(price) AS avg_cat_price FROM products GROUP BY category_id;",
    task: "Select 'category_id' and ROUND(AVG(price)::numeric, 2) as avg_price from products GROUP BY category_id.",
    starterSql: "SELECT category_id, ROUND(AVG(price)::numeric, 2) AS avg_price FROM products GROUP BY category_id;",
    referenceSql: "SELECT category_id, ROUND(AVG(price)::numeric, 2) AS avg_price FROM products GROUP BY category_id;",
    expectedColumns: ["category_id", "avg_price"]
  },
  {
    topic: "Multi-Column Grouping",
    badge: "GROUP BY a, b",
    title: "52. Grouping by Multiple Dimensions",
    conceptSummary: "Group by two or more columns to produce nested segment breakdowns.",
    conceptExample: "SELECT carrier, status, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier, status;",
    task: "Select 'carrier', COUNT(*) as shipment_count from shipments GROUP BY carrier;",
    starterSql: "SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier;",
    referenceSql: "SELECT carrier, COUNT(*) AS shipment_count FROM shipments GROUP BY carrier;",
    expectedColumns: ["carrier", "shipment_count"]
  },
  {
    topic: "Group Filtering",
    badge: "HAVING",
    title: "53. Filtering Groups with HAVING",
    conceptSummary: "HAVING filters aggregated groups, whereas WHERE filters individual rows before aggregation.",
    conceptExample: "SELECT region, COUNT(*) AS count FROM customers GROUP BY region HAVING COUNT(*) > 50;",
    task: "Select 'region' and COUNT(*) as customer_count from customers GROUP BY region HAVING COUNT(*) > 80;",
    starterSql: "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region HAVING COUNT(*) > 80;",
    referenceSql: "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region HAVING COUNT(*) > 80;",
    expectedColumns: ["region", "customer_count"]
  },
  {
    topic: "HAVING vs WHERE",
    badge: "WHERE + HAVING",
    title: "54. Combining WHERE and HAVING",
    conceptSummary: "Use WHERE to filter input rows first, then GROUP BY, then HAVING to filter the groups.",
    conceptExample: "SELECT region, COUNT(*) AS count FROM customers WHERE email LIKE '%.com' GROUP BY region HAVING COUNT(*) > 20;",
    task: "Select 'region' and COUNT(*) as customer_count from customers WHERE email LIKE '%.com' GROUP BY region HAVING COUNT(*) > 50;",
    starterSql: "SELECT region, COUNT(*) AS customer_count FROM customers WHERE email LIKE '%.com' GROUP BY region HAVING COUNT(*) > 50;",
    referenceSql: "SELECT region, COUNT(*) AS customer_count FROM customers WHERE email LIKE '%.com' GROUP BY region HAVING COUNT(*) > 50;",
    expectedColumns: ["region", "customer_count"]
  },
  {
    topic: "HAVING with SUM",
    badge: "HAVING SUM",
    title: "55. Filtering Revenue Thresholds",
    conceptSummary: "Filter grouped segments based on aggregate monetary sums.",
    conceptExample: "SELECT status, SUM(total_amount) AS revenue FROM orders GROUP BY status HAVING SUM(total_amount) > 10000;",
    task: "Select 'status' and SUM(total_amount) as revenue from orders GROUP BY status HAVING SUM(total_amount) > 5000;",
    starterSql: "SELECT status, SUM(total_amount) AS revenue FROM orders GROUP BY status HAVING SUM(total_amount) > 5000;",
    referenceSql: "SELECT status, SUM(total_amount) AS revenue FROM orders GROUP BY status HAVING SUM(total_amount) > 5000;",
    expectedColumns: ["status", "revenue"]
  },
  {
    topic: "Sorting Aggregates",
    badge: "GROUP + ORDER",
    title: "56. Ranking Aggregated Groups",
    conceptSummary: "Use ORDER BY aggregate_function DESC to order groups from highest to lowest metric.",
    conceptExample: "SELECT region, COUNT(*) AS total FROM customers GROUP BY region ORDER BY total DESC;",
    task: "Select 'region' and COUNT(*) as customer_count from customers GROUP BY region ORDER BY customer_count DESC;",
    starterSql: "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region ORDER BY customer_count DESC;",
    referenceSql: "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region ORDER BY customer_count DESC;",
    expectedColumns: ["region", "customer_count"]
  },
  {
    topic: "Top Aggregated Groups",
    badge: "TOP GROUPS",
    title: "57. Finding Top Group Performers",
    conceptSummary: "Combine GROUP BY, ORDER BY DESC, and LIMIT to extract the top category or entity.",
    conceptExample: "SELECT category_id, COUNT(*) AS product_count FROM products GROUP BY category_id ORDER BY product_count DESC LIMIT 3;",
    task: "Select 'category_id' and COUNT(*) as total_items from products GROUP BY category_id ORDER BY total_items DESC LIMIT 3;",
    starterSql: "SELECT category_id, COUNT(*) AS total_items FROM products GROUP BY category_id ORDER BY total_items DESC LIMIT 3;",
    referenceSql: "SELECT category_id, COUNT(*) AS total_items FROM products GROUP BY category_id ORDER BY total_items DESC LIMIT 3;",
    expectedColumns: ["category_id", "total_items"]
  },
  {
    topic: "Multi-metric Groups",
    badge: "GROUP METRICS",
    title: "58. Comprehensive Group Summaries",
    conceptSummary: "Display counts, averages, and totals side-by-side for each group.",
    conceptExample: "SELECT status, COUNT(*) AS order_count, SUM(total_amount) AS sum_total FROM orders GROUP BY status;",
    task: "Select 'status', COUNT(*) as order_count, SUM(total_amount) as total_volume from orders GROUP BY status;",
    starterSql: "SELECT status, COUNT(*) AS order_count, SUM(total_amount) AS total_volume FROM orders GROUP BY status;",
    referenceSql: "SELECT status, COUNT(*) AS order_count, SUM(total_amount) AS total_volume FROM orders GROUP BY status;",
    expectedColumns: ["status", "order_count", "total_volume"]
  },
  {
    topic: "Inventory Value per Category",
    badge: "COMPUTED AGG",
    title: "59. Aggregating Calculated Fields",
    conceptSummary: "Wrap mathematical formulas inside aggregate functions: SUM(price * stock).",
    conceptExample: "SELECT category_id, SUM(price * stock_quantity) AS inventory_worth FROM products GROUP BY category_id;",
    task: "Select 'category_id' and SUM(price * stock_quantity) as total_worth from products GROUP BY category_id ORDER BY total_worth DESC;",
    starterSql: "SELECT category_id, SUM(price * stock_quantity) AS total_worth FROM products GROUP BY category_id ORDER BY total_worth DESC;",
    referenceSql: "SELECT category_id, SUM(price * stock_quantity) AS total_worth FROM products GROUP BY category_id ORDER BY total_worth DESC;",
    expectedColumns: ["category_id", "total_worth"]
  },
  {
    topic: "Milestone Practice",
    badge: "MILESTONE",
    title: "60. Level 3 Aggregation Milestone",
    conceptSummary: "Execute complete analytical query with WHERE, GROUP BY, HAVING, and ORDER BY.",
    conceptExample: "SELECT region, COUNT(*) AS total FROM customers WHERE email LIKE '%.com' GROUP BY region HAVING COUNT(*) > 10 ORDER BY total DESC;",
    task: "Select 'region' and COUNT(*) as customers_in_region from customers WHERE email LIKE '%.com' GROUP BY region HAVING COUNT(*) > 15 ORDER BY customers_in_region DESC;",
    starterSql: "SELECT region, COUNT(*) AS customers_in_region FROM customers WHERE email LIKE '%.com' GROUP BY region HAVING COUNT(*) > 15 ORDER BY customers_in_region DESC;",
    referenceSql: "SELECT region, COUNT(*) AS customers_in_region FROM customers WHERE email LIKE '%.com' GROUP BY region HAVING COUNT(*) > 15 ORDER BY customers_in_region DESC;",
    expectedColumns: ["region", "customers_in_region"]
  }
];

// Level 4: Relational Table Joins (61 to 80)
const l4Data = [
  {
    topic: "Basic INNER JOIN",
    badge: "INNER JOIN",
    title: "61. Connecting Two Tables",
    conceptSummary: "INNER JOIN matches rows between two tables based on a shared key.",
    conceptExample: "SELECT p.name, c.name AS category FROM products p INNER JOIN categories c ON p.category_id = c.id;",
    task: "Select p.name as product_name and c.name as category_name by joining products and categories.",
    starterSql: "SELECT p.name AS product_name, c.name AS category_name FROM products p INNER JOIN categories c ON p.category_id = c.id;",
    referenceSql: "SELECT p.name AS product_name, c.name AS category_name FROM products p INNER JOIN categories c ON p.category_id = c.id;",
    expectedColumns: ["product_name", "category_name"]
  },
  {
    topic: "JOIN with Aliases",
    badge: "TABLE ALIAS",
    title: "62. Cleaner Queries with Table Aliases",
    conceptSummary: "Table aliases (e.g., 'FROM products p') prevent ambiguity and shorten syntax.",
    conceptExample: "SELECT c.name, d.name AS dept FROM categories c INNER JOIN departments d ON c.department_id = d.id;",
    task: "Select c.name as category, d.name as department from categories c INNER JOIN departments d ON c.department_id = d.id;",
    starterSql: "SELECT c.name AS category, d.name AS department FROM categories c INNER JOIN departments d ON c.department_id = d.id;",
    referenceSql: "SELECT c.name AS category, d.name AS department FROM categories c INNER JOIN departments d ON c.department_id = d.id;",
    expectedColumns: ["category", "department"]
  },
  {
    topic: "JOIN with Filtering",
    badge: "JOIN + WHERE",
    title: "63. Filtering Joined Records",
    conceptSummary: "Add WHERE clauses to filter results from joined tables.",
    conceptExample: "SELECT p.name, p.price, c.name AS category FROM products p INNER JOIN categories c ON p.category_id = c.id WHERE c.name = 'Electronics';",
    task: "Select p.name, p.price, c.name as category from products p INNER JOIN categories c ON p.category_id = c.id WHERE c.name = 'Electronics';",
    starterSql: "SELECT p.name, p.price, c.name AS category FROM products p INNER JOIN categories c ON p.category_id = c.id WHERE c.name = 'Electronics';",
    referenceSql: "SELECT p.name, p.price, c.name AS category FROM products p INNER JOIN categories c ON p.category_id = c.id WHERE c.name = 'Electronics';",
    expectedColumns: ["name", "price", "category"]
  },
  {
    topic: "JOIN with Sorting",
    badge: "JOIN + ORDER",
    title: "64. Sorting Joined Data",
    conceptSummary: "Sort by columns from either the primary or joined table.",
    conceptExample: "SELECT p.name, c.name AS category, p.price FROM products p INNER JOIN categories c ON p.category_id = c.id ORDER BY p.price DESC;",
    task: "Select p.name, c.name as category, p.price from products p INNER JOIN categories c ON p.category_id = c.id ORDER BY p.price DESC LIMIT 5;",
    starterSql: "SELECT p.name, c.name AS category, p.price FROM products p INNER JOIN categories c ON p.category_id = c.id ORDER BY p.price DESC LIMIT 5;",
    referenceSql: "SELECT p.name, c.name AS category, p.price FROM products p INNER JOIN categories c ON p.category_id = c.id ORDER BY p.price DESC LIMIT 5;",
    expectedColumns: ["name", "category", "price"]
  },
  {
    topic: "Preserving Records",
    badge: "LEFT JOIN",
    title: "65. Complete Lists with LEFT JOIN",
    conceptSummary: "LEFT JOIN keeps all rows from the left table even if no match exists in the right table.",
    conceptExample: "SELECT c.name, o.id AS order_id FROM customers c LEFT JOIN orders o ON c.id = o.customer_id;",
    task: "Select c.name as customer_name, o.id as order_id from customers c LEFT JOIN orders o ON c.id = o.customer_id LIMIT 10;",
    starterSql: "SELECT c.name AS customer_name, o.id AS order_id FROM customers c LEFT JOIN orders o ON c.id = o.customer_id LIMIT 10;",
    referenceSql: "SELECT c.name AS customer_name, o.id AS order_id FROM customers c LEFT JOIN orders o ON c.id = o.customer_id LIMIT 10;",
    expectedColumns: ["customer_name", "order_id"]
  },
  {
    topic: "Finding Missing Matches",
    badge: "LEFT JOIN + NULL",
    title: "66. Detecting Orphan Rows",
    conceptSummary: "Use LEFT JOIN with WHERE right_table.id IS NULL to find items that have no relational record.",
    conceptExample: "SELECT c.name FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL;",
    task: "Select c.name as inactive_customer from customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL LIMIT 5;",
    starterSql: "SELECT c.name AS inactive_customer FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL LIMIT 5;",
    referenceSql: "SELECT c.name AS inactive_customer FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL LIMIT 5;",
    expectedColumns: ["inactive_customer"]
  },
  {
    topic: "Joined Aggregations",
    badge: "JOIN + GROUP",
    title: "67. Grouping Across Tables",
    conceptSummary: "Join two tables and group by the parent key to calculate aggregate volumes.",
    conceptExample: "SELECT c.name, COUNT(o.id) AS total_orders FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name;",
    task: "Select c.name as customer_name, COUNT(o.id) as order_count from customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name ORDER BY order_count DESC LIMIT 5;",
    starterSql: "SELECT c.name AS customer_name, COUNT(o.id) AS order_count FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name ORDER BY order_count DESC LIMIT 5;",
    referenceSql: "SELECT c.name AS customer_name, COUNT(o.id) AS order_count FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name ORDER BY order_count DESC LIMIT 5;",
    expectedColumns: ["customer_name", "order_count"]
  },
  {
    topic: "Customer Spending",
    badge: "JOIN + SUM",
    title: "68. Aggregating Monetary Metrics",
    conceptSummary: "Calculate customer lifetime revenue by joining customer and order entities.",
    conceptExample: "SELECT c.name, SUM(o.total_amount) AS lifetime_spend FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name;",
    task: "Select c.name as customer_name, SUM(o.total_amount) as total_spent from customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name ORDER BY total_spent DESC LIMIT 5;",
    starterSql: "SELECT c.name AS customer_name, SUM(o.total_amount) AS total_spent FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name ORDER BY total_spent DESC LIMIT 5;",
    referenceSql: "SELECT c.name AS customer_name, SUM(o.total_amount) AS total_spent FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name ORDER BY total_spent DESC LIMIT 5;",
    expectedColumns: ["customer_name", "total_spent"]
  },
  {
    topic: "3-Table Join",
    badge: "MULTI-JOIN",
    title: "69. Joining Three Relational Tables",
    conceptSummary: "Chain multiple JOIN statements sequentially to traverse relationships.",
    conceptExample: "SELECT p.name, c.name AS category, d.name AS department FROM products p INNER JOIN categories c ON p.category_id = c.id INNER JOIN departments d ON c.department_id = d.id;",
    task: "Select p.name as product, c.name as category, d.name as department from products p INNER JOIN categories c ON p.category_id = c.id INNER JOIN departments d ON c.department_id = d.id LIMIT 5;",
    starterSql: "SELECT p.name AS product, c.name AS category, d.name AS department FROM products p INNER JOIN categories c ON p.category_id = c.id INNER JOIN departments d ON c.department_id = d.id LIMIT 5;",
    referenceSql: "SELECT p.name AS product, c.name AS category, d.name AS department FROM products p INNER JOIN categories c ON p.category_id = c.id INNER JOIN departments d ON c.department_id = d.id LIMIT 5;",
    expectedColumns: ["product", "category", "department"]
  },
  {
    topic: "Order Lines Analysis",
    badge: "ORDER ITEMS",
    title: "70. Joining Orders and Order Items",
    conceptSummary: "Order items connect high-level transactions with specific catalog SKUs.",
    conceptExample: "SELECT oi.order_id, p.name, oi.quantity FROM order_items oi INNER JOIN products p ON oi.product_id = p.id;",
    task: "Select oi.order_id, p.name as product_name, oi.quantity from order_items oi INNER JOIN products p ON oi.product_id = p.id LIMIT 10;",
    starterSql: "SELECT oi.order_id, p.name AS product_name, oi.quantity FROM order_items oi INNER JOIN products p ON oi.product_id = p.id LIMIT 10;",
    referenceSql: "SELECT oi.order_id, p.name AS product_name, oi.quantity FROM order_items oi INNER JOIN products p ON oi.product_id = p.id LIMIT 10;",
    expectedColumns: ["order_id", "product_name", "quantity"]
  },
  {
    topic: "Shipment Fulfillment",
    badge: "JOIN SHIPMENTS",
    title: "71. Tracking Orders with Shipments",
    conceptSummary: "Link sales orders to fulfillment carrier logistics.",
    conceptExample: "SELECT o.id AS order_id, s.carrier, s.tracking_number FROM orders o INNER JOIN shipments s ON o.id = s.order_id;",
    task: "Select o.id as order_id, s.carrier, s.tracking_number from orders o INNER JOIN shipments s ON o.id = s.order_id LIMIT 10;",
    starterSql: "SELECT o.id AS order_id, s.carrier, s.tracking_number FROM orders o INNER JOIN shipments s ON o.id = s.order_id LIMIT 10;",
    referenceSql: "SELECT o.id AS order_id, s.carrier, s.tracking_number FROM orders o INNER JOIN shipments s ON o.id = s.order_id LIMIT 10;",
    expectedColumns: ["order_id", "carrier", "tracking_number"]
  },
  {
    topic: "Joined Group by Category",
    badge: "JOIN + GROUP",
    title: "72. Departmental Product Metrics",
    conceptSummary: "Group products by department name through the categories table.",
    conceptExample: "SELECT d.name AS department, COUNT(p.id) AS total_products FROM departments d INNER JOIN categories c ON d.id = c.department_id INNER JOIN products p ON c.id = p.category_id GROUP BY d.name;",
    task: "Select d.name as department, COUNT(p.id) as product_count from departments d INNER JOIN categories c ON d.id = c.department_id INNER JOIN products p ON c.id = p.category_id GROUP BY d.name;",
    starterSql: "SELECT d.name AS department, COUNT(p.id) AS product_count FROM departments d INNER JOIN categories c ON d.id = c.department_id INNER JOIN products p ON c.id = p.category_id GROUP BY d.name;",
    referenceSql: "SELECT d.name AS department, COUNT(p.id) AS product_count FROM departments d INNER JOIN categories c ON d.id = c.department_id INNER JOIN products p ON c.id = p.category_id GROUP BY d.name;",
    expectedColumns: ["department", "product_count"]
  },
  {
    topic: "Carrier Delivery Stats",
    badge: "CARRIER AGG",
    title: "73. Logistics Performance by Carrier",
    conceptSummary: "Aggregate shipment counts and tracking assignments per carrier.",
    conceptExample: "SELECT s.carrier, COUNT(s.id) AS total_shipments FROM shipments s GROUP BY s.carrier;",
    task: "Select carrier, COUNT(id) as total_shipments from shipments GROUP BY carrier ORDER BY total_shipments DESC;",
    starterSql: "SELECT carrier, COUNT(id) AS total_shipments FROM shipments GROUP BY carrier ORDER BY total_shipments DESC;",
    referenceSql: "SELECT carrier, COUNT(id) AS total_shipments FROM shipments GROUP BY carrier ORDER BY total_shipments DESC;",
    expectedColumns: ["carrier", "total_shipments"]
  },
  {
    topic: "Joining with Date Filters",
    badge: "JOIN + DATES",
    title: "74. Order Fulfillment Timelines",
    conceptSummary: "Filter records by order dates while joining carrier details.",
    conceptExample: "SELECT o.id, o.order_date, s.carrier FROM orders o INNER JOIN shipments s ON o.id = s.order_id WHERE o.order_date >= '2023-01-01';",
    task: "Select o.id, o.order_date, s.carrier from orders o INNER JOIN shipments s ON o.id = s.order_id WHERE o.order_date >= '2023-01-01' LIMIT 5;",
    starterSql: "SELECT o.id, o.order_date, s.carrier FROM orders o INNER JOIN shipments s ON o.id = s.order_id WHERE o.order_date >= '2023-01-01' LIMIT 5;",
    referenceSql: "SELECT o.id, o.order_date, s.carrier FROM orders o INNER JOIN shipments s ON o.id = s.order_id WHERE o.order_date >= '2023-01-01' LIMIT 5;",
    expectedColumns: ["id", "order_date", "carrier"]
  },
  {
    topic: "Joined Having Filters",
    badge: "JOIN + HAVING",
    title: "75. Filtering Joined Summaries",
    conceptSummary: "Use HAVING to filter aggregated metrics produced across joined tables.",
    conceptExample: "SELECT c.name, COUNT(o.id) AS orders_placed FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name HAVING COUNT(o.id) >= 2;",
    task: "Select c.name as customer_name, COUNT(o.id) as orders_placed from customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name HAVING COUNT(o.id) >= 2 LIMIT 5;",
    starterSql: "SELECT c.name AS customer_name, COUNT(o.id) AS orders_placed FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name HAVING COUNT(o.id) >= 2 LIMIT 5;",
    referenceSql: "SELECT c.name AS customer_name, COUNT(o.id) AS orders_placed FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name HAVING COUNT(o.id) >= 2 LIMIT 5;",
    expectedColumns: ["customer_name", "orders_placed"]
  },
  {
    topic: "Customer Regional Revenue",
    badge: "MULTI-GROUP",
    title: "76. Regional Revenue Analytics",
    conceptSummary: "Aggregate monetary transactions by customer geographical region.",
    conceptExample: "SELECT c.region, SUM(o.total_amount) AS regional_sales FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.region;",
    task: "Select c.region, SUM(o.total_amount) as regional_sales from customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.region ORDER BY regional_sales DESC;",
    starterSql: "SELECT c.region, SUM(o.total_amount) AS regional_sales FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.region ORDER BY regional_sales DESC;",
    referenceSql: "SELECT c.region, SUM(o.total_amount) AS regional_sales FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.region ORDER BY regional_sales DESC;",
    expectedColumns: ["region", "regional_sales"]
  },
  {
    topic: "High Value Product Categories",
    badge: "CAT SALES",
    title: "77. Category Inventory Valuations",
    conceptSummary: "Join categories and products to calculate total catalog inventory value per category.",
    conceptExample: "SELECT c.name AS category, SUM(p.price * p.stock_quantity) AS inventory_val FROM categories c INNER JOIN products p ON c.id = p.category_id GROUP BY c.name;",
    task: "Select c.name as category, SUM(p.price * p.stock_quantity) as inventory_val from categories c INNER JOIN products p ON c.id = p.category_id GROUP BY c.name ORDER BY inventory_val DESC;",
    starterSql: "SELECT c.name AS category, SUM(p.price * p.stock_quantity) AS inventory_val FROM categories c INNER JOIN products p ON c.id = p.category_id GROUP BY c.name ORDER BY inventory_val DESC;",
    referenceSql: "SELECT c.name AS category, SUM(p.price * p.stock_quantity) AS inventory_val FROM categories c INNER JOIN products p ON c.id = p.category_id GROUP BY c.name ORDER BY inventory_val DESC;",
    expectedColumns: ["category", "inventory_val"]
  },
  {
    topic: "Customer Order Status Breakdown",
    badge: "ORDER STATUS",
    title: "78. Order Delivery Rates",
    conceptSummary: "Break down order volumes by customer region and order fulfillment status.",
    conceptExample: "SELECT c.region, o.status, COUNT(o.id) AS order_count FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.region, o.status;",
    task: "Select c.region, o.status, COUNT(o.id) as order_count from customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.region, o.status ORDER BY c.region ASC LIMIT 10;",
    starterSql: "SELECT c.region, o.status, COUNT(o.id) AS order_count FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.region, o.status ORDER BY c.region ASC LIMIT 10;",
    referenceSql: "SELECT c.region, o.status, COUNT(o.id) AS order_count FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.region, o.status ORDER BY c.region ASC LIMIT 10;",
    expectedColumns: ["region", "status", "order_count"]
  },
  {
    topic: "Product Item Quantities",
    badge: "SALES VOLUME",
    title: "79. Best-Selling Products by Quantity",
    conceptSummary: "Join products and order_items to find which products sold the highest units.",
    conceptExample: "SELECT p.name, SUM(oi.quantity) AS total_units_sold FROM products p INNER JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name ORDER BY total_units_sold DESC LIMIT 5;",
    task: "Select p.name as product_name, SUM(oi.quantity) as total_units_sold from products p INNER JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name ORDER BY total_units_sold DESC LIMIT 5;",
    starterSql: "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p INNER JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name ORDER BY total_units_sold DESC LIMIT 5;",
    referenceSql: "SELECT p.name AS product_name, SUM(oi.quantity) AS total_units_sold FROM products p INNER JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id, p.name ORDER BY total_units_sold DESC LIMIT 5;",
    expectedColumns: ["product_name", "total_units_sold"]
  },
  {
    topic: "Milestone Practice",
    badge: "MILESTONE",
    title: "80. Level 4 Relational Joins Milestone",
    conceptSummary: "Traverse 3 tables (departments, categories, products) and generate a complete business inventory summary.",
    conceptExample: "SELECT d.name AS dept, c.name AS cat, COUNT(p.id) AS items FROM departments d INNER JOIN categories c ON d.id = c.department_id INNER JOIN products p ON c.id = p.category_id GROUP BY d.name, c.name ORDER BY items DESC LIMIT 5;",
    task: "Select d.name as department, c.name as category, COUNT(p.id) as items from departments d INNER JOIN categories c ON d.id = c.department_id INNER JOIN products p ON c.id = p.category_id GROUP BY d.name, c.name ORDER BY items DESC LIMIT 5;",
    starterSql: "SELECT d.name AS department, c.name AS category, COUNT(p.id) AS items FROM departments d INNER JOIN categories c ON d.id = c.department_id INNER JOIN products p ON c.id = p.category_id GROUP BY d.name, c.name ORDER BY items DESC LIMIT 5;",
    referenceSql: "SELECT d.name AS department, c.name AS category, COUNT(p.id) AS items FROM departments d INNER JOIN categories c ON d.id = c.department_id INNER JOIN products p ON c.id = p.category_id GROUP BY d.name, c.name ORDER BY items DESC LIMIT 5;",
    expectedColumns: ["department", "category", "items"]
  }
];

// Level 5: Conditionals, Subqueries, CTEs & Window Functions (81 to 100)
const l5Data = [
  {
    topic: "Conditional Labels",
    badge: "CASE WHEN",
    title: "81. Conditional Logic with CASE WHEN",
    conceptSummary: "CASE WHEN condition THEN result ELSE default END dynamically categorizes rows.",
    conceptExample: "SELECT name, price, CASE WHEN price >= 100 THEN 'Premium' ELSE 'Standard' END AS tier FROM products;",
    task: "Select 'name', 'price', and CASE WHEN price >= 100 THEN 'Premium' ELSE 'Budget' END as 'price_tier' from products.",
    starterSql: "SELECT name, price, CASE WHEN price >= 100 THEN 'Premium' ELSE 'Budget' END AS price_tier FROM products;",
    referenceSql: "SELECT name, price, CASE WHEN price >= 100 THEN 'Premium' ELSE 'Budget' END AS price_tier FROM products;",
    expectedColumns: ["name", "price", "price_tier"]
  },
  {
    topic: "Multi-branch Case",
    badge: "CASE WHEN",
    title: "82. Multiple Classification Branches",
    conceptSummary: "Chain multiple WHEN clauses to define granular classification tiers.",
    conceptExample: "SELECT name, stock_quantity, CASE WHEN stock_quantity = 0 THEN 'Out of Stock' WHEN stock_quantity < 10 THEN 'Low Stock' ELSE 'In Stock' END AS stock_status FROM products;",
    task: "Select 'name', 'stock_quantity', and CASE WHEN stock_quantity < 15 THEN 'Restock' ELSE 'Adequate' END as 'inventory_status' from products.",
    starterSql: "SELECT name, stock_quantity, CASE WHEN stock_quantity < 15 THEN 'Restock' ELSE 'Adequate' END AS inventory_status FROM products;",
    referenceSql: "SELECT name, stock_quantity, CASE WHEN stock_quantity < 15 THEN 'Restock' ELSE 'Adequate' END AS inventory_status FROM products;",
    expectedColumns: ["name", "stock_quantity", "inventory_status"]
  },
  {
    topic: "Conditional Counting",
    badge: "COUNT(CASE)",
    title: "83. Counting with Conditional CASE",
    conceptSummary: "Embed CASE WHEN inside COUNT to tally rows satisfying a condition into distinct columns.",
    conceptExample: "SELECT region, COUNT(CASE WHEN email LIKE '%.com' THEN 1 END) AS dot_com_count FROM customers GROUP BY region;",
    task: "Select region, COUNT(CASE WHEN email LIKE '%.com' THEN 1 END) as dot_com_users from customers GROUP BY region;",
    starterSql: "SELECT region, COUNT(CASE WHEN email LIKE '%.com' THEN 1 END) AS dot_com_users FROM customers GROUP BY region;",
    referenceSql: "SELECT region, COUNT(CASE WHEN email LIKE '%.com' THEN 1 END) AS dot_com_users FROM customers GROUP BY region;",
    expectedColumns: ["region", "dot_com_users"]
  },
  {
    topic: "Conditional Summation",
    badge: "SUM(CASE)",
    title: "84. Conditional Totals with SUM(CASE)",
    conceptSummary: "SUM(CASE WHEN condition THEN amount ELSE 0 END) creates pivot-like category totals.",
    conceptExample: "SELECT customer_id, SUM(CASE WHEN status = 'delivered' THEN total_amount ELSE 0 END) AS delivered_spend FROM orders GROUP BY customer_id;",
    task: "Select customer_id, SUM(CASE WHEN status = 'delivered' THEN total_amount ELSE 0 END) as delivered_spend from orders GROUP BY customer_id LIMIT 5;",
    starterSql: "SELECT customer_id, SUM(CASE WHEN status = 'delivered' THEN total_amount ELSE 0 END) AS delivered_spend FROM orders GROUP BY customer_id LIMIT 5;",
    referenceSql: "SELECT customer_id, SUM(CASE WHEN status = 'delivered' THEN total_amount ELSE 0 END) AS delivered_spend FROM orders GROUP BY customer_id LIMIT 5;",
    expectedColumns: ["customer_id", "delivered_spend"]
  },
  {
    topic: "Scalar Subqueries",
    badge: "SUBQUERY",
    title: "85. Scalar Subqueries in SELECT",
    conceptSummary: "A subquery returning a single value can be embedded directly in the SELECT list.",
    conceptExample: "SELECT name, price, (SELECT ROUND(AVG(price)::numeric, 2) FROM products) AS overall_avg FROM products;",
    task: "Select 'name', 'price', and (SELECT ROUND(AVG(price)::numeric, 2) FROM products) as overall_avg from products LIMIT 5;",
    starterSql: "SELECT name, price, (SELECT ROUND(AVG(price)::numeric, 2) FROM products) AS overall_avg FROM products LIMIT 5;",
    referenceSql: "SELECT name, price, (SELECT ROUND(AVG(price)::numeric, 2) FROM products) AS overall_avg FROM products LIMIT 5;",
    expectedColumns: ["name", "price", "overall_avg"]
  },
  {
    topic: "Filtering with Subqueries",
    badge: "WHERE SUBQUERY",
    title: "86. Filtering Against Benchmarks",
    conceptSummary: "Compare values against an aggregated subquery result in WHERE.",
    conceptExample: "SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products);",
    task: "Select 'name' and 'price' of all products priced above the overall average product price.",
    starterSql: "SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products);",
    referenceSql: "SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products);",
    expectedColumns: ["name", "price"]
  },
  {
    topic: "Subquery with IN",
    badge: "IN (SELECT)",
    title: "87. Dynamic Lists with IN Subqueries",
    conceptSummary: "Use IN (SELECT ...) to filter records whose foreign keys exist in a filtered dataset.",
    conceptExample: "SELECT name, email FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE total_amount > 500);",
    task: "Select 'name', 'email' from customers WHERE id IN (SELECT customer_id FROM orders WHERE total_amount >= 300) LIMIT 5;",
    starterSql: "SELECT name, email FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE total_amount >= 300) LIMIT 5;",
    referenceSql: "SELECT name, email FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE total_amount >= 300) LIMIT 5;",
    expectedColumns: ["name", "email"]
  },
  {
    topic: "Subquery with NOT IN",
    badge: "NOT IN (SELECT)",
    title: "88. Identifying Non-Transacting Users",
    conceptSummary: "Use NOT IN (SELECT ...) to find records without corresponding activity.",
    conceptExample: "SELECT name FROM customers WHERE id NOT IN (SELECT DISTINCT customer_id FROM orders WHERE customer_id IS NOT NULL);",
    task: "Select 'id', 'name' from customers WHERE id NOT IN (SELECT DISTINCT customer_id FROM orders WHERE customer_id IS NOT NULL) LIMIT 5;",
    starterSql: "SELECT id, name FROM customers WHERE id NOT IN (SELECT DISTINCT customer_id FROM orders WHERE customer_id IS NOT NULL) LIMIT 5;",
    referenceSql: "SELECT id, name FROM customers WHERE id NOT IN (SELECT DISTINCT customer_id FROM orders WHERE customer_id IS NOT NULL) LIMIT 5;",
    expectedColumns: ["id", "name"]
  },
  {
    topic: "Correlated Subqueries",
    badge: "EXISTS",
    title: "89. Checking Existence with EXISTS",
    conceptSummary: "EXISTS returns TRUE as soon as a matching record is found in the subquery.",
    conceptExample: "SELECT c.name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
    task: "Select c.name, c.region from customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id) LIMIT 5;",
    starterSql: "SELECT c.name, c.region FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id) LIMIT 5;",
    referenceSql: "SELECT c.name, c.region FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id) LIMIT 5;",
    expectedColumns: ["name", "region"]
  },
  {
    topic: "Correlated Negation",
    badge: "NOT EXISTS",
    title: "90. Non-Existence with NOT EXISTS",
    conceptSummary: "NOT EXISTS tests that no corresponding row satisfies the relationship.",
    conceptExample: "SELECT c.name FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
    task: "Select c.name, c.email from customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id) LIMIT 5;",
    starterSql: "SELECT c.name, c.email FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id) LIMIT 5;",
    referenceSql: "SELECT c.name, c.email FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id) LIMIT 5;",
    expectedColumns: ["name", "email"]
  },
  {
    topic: "Derived Tables",
    badge: "FROM (SELECT)",
    title: "91. Subqueries in FROM Clauses",
    conceptSummary: "A query in the FROM clause acts as a temporary inline table.",
    conceptExample: "SELECT AVG(order_count) AS avg_orders_per_buyer FROM (SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id) AS buyer_stats;",
    task: "Select ROUND(AVG(item_count)::numeric, 2) as avg_items_per_cat from (SELECT category_id, COUNT(*) as item_count FROM products GROUP BY category_id) as cat_counts;",
    starterSql: "SELECT ROUND(AVG(item_count)::numeric, 2) AS avg_items_per_cat FROM (SELECT category_id, COUNT(*) AS item_count FROM products GROUP BY category_id) AS cat_counts;",
    referenceSql: "SELECT ROUND(AVG(item_count)::numeric, 2) AS avg_items_per_cat FROM (SELECT category_id, COUNT(*) AS item_count FROM products GROUP BY category_id) AS cat_counts;",
    expectedColumns: ["avg_items_per_cat"]
  },
  {
    topic: "Common Table Expressions",
    badge: "WITH (CTE)",
    title: "92. Modular SQL with CTEs (WITH Clause)",
    conceptSummary: "WITH cte_name AS (SELECT ...) creates a named temporary result set for clean query architecture.",
    conceptExample: "WITH premium_items AS (SELECT * FROM products WHERE price >= 100) SELECT name, price FROM premium_items;",
    task: "Write a query using a CTE named 'high_stock' selecting name and stock_quantity from products where stock_quantity > 50.",
    starterSql: "WITH high_stock AS (\n  SELECT name, stock_quantity FROM products WHERE stock_quantity > 50\n)\nSELECT name, stock_quantity FROM high_stock LIMIT 5;",
    referenceSql: "WITH high_stock AS (\n  SELECT name, stock_quantity FROM products WHERE stock_quantity > 50\n)\nSELECT name, stock_quantity FROM high_stock LIMIT 5;",
    expectedColumns: ["name", "stock_quantity"]
  },
  {
    topic: "CTE Aggregations",
    badge: "CTE + AGG",
    title: "93. Aggregating CTE Results",
    conceptSummary: "Compute complex intermediate summaries inside a CTE, then query them cleanly.",
    conceptExample: "WITH customer_orders AS (SELECT customer_id, COUNT(*) AS total_orders FROM orders GROUP BY customer_id) SELECT MAX(total_orders) AS max_orders FROM customer_orders;",
    task: "Use a CTE 'cat_stats' grouping products by category_id to find MAX(product_count) as max_products.",
    starterSql: "WITH cat_stats AS (\n  SELECT category_id, COUNT(*) AS product_count FROM products GROUP BY category_id\n)\nSELECT MAX(product_count) AS max_products FROM cat_stats;",
    referenceSql: "WITH cat_stats AS (\n  SELECT category_id, COUNT(*) AS product_count FROM products GROUP BY category_id\n)\nSELECT MAX(product_count) AS max_products FROM cat_stats;",
    expectedColumns: ["max_products"]
  },
  {
    topic: "Chaining Multiple CTEs",
    badge: "CHAINED CTE",
    title: "94. Multi-Stage Pipeline with Multiple CTEs",
    conceptSummary: "Define multiple CTEs separated by commas to build clear data pipelines.",
    conceptExample: "WITH active_orders AS (SELECT * FROM orders WHERE status = 'delivered'), high_val AS (SELECT * FROM active_orders WHERE total_amount > 200) SELECT id, total_amount FROM high_val LIMIT 5;",
    task: "Write a query with two chained CTEs filtering orders to delivered status and amount >= 150.",
    starterSql: "WITH delivered_orders AS (\n  SELECT * FROM orders WHERE status = 'delivered'\n),\nlarge_delivered AS (\n  SELECT * FROM delivered_orders WHERE total_amount >= 150\n)\nSELECT id, total_amount FROM large_delivered LIMIT 5;",
    referenceSql: "WITH delivered_orders AS (\n  SELECT * FROM orders WHERE status = 'delivered'\n),\nlarge_delivered AS (\n  SELECT * FROM delivered_orders WHERE total_amount >= 150\n)\nSELECT id, total_amount FROM large_delivered LIMIT 5;",
    expectedColumns: ["id", "total_amount"]
  },
  {
    topic: "Row Numbering",
    badge: "ROW_NUMBER",
    title: "95. Sequential Rankings with ROW_NUMBER()",
    conceptSummary: "ROW_NUMBER() OVER (ORDER BY col DESC) assigns sequential rankings without collapsing rows.",
    conceptExample: "SELECT name, price, ROW_NUMBER() OVER (ORDER BY price DESC) AS price_rank FROM products;",
    task: "Select 'name', 'price', and ROW_NUMBER() OVER (ORDER BY price DESC) as 'price_rank' from products LIMIT 5.",
    starterSql: "SELECT name, price, ROW_NUMBER() OVER (ORDER BY price DESC) AS price_rank FROM products LIMIT 5;",
    referenceSql: "SELECT name, price, ROW_NUMBER() OVER (ORDER BY price DESC) AS price_rank FROM products LIMIT 5;",
    expectedColumns: ["name", "price", "price_rank"]
  },
  {
    topic: "Ranking Ties",
    badge: "RANK()",
    title: "96. Handling Ties with RANK() & DENSE_RANK()",
    conceptSummary: "RANK() assigns identical ranks to ties and skips ranks; DENSE_RANK() does not skip.",
    conceptExample: "SELECT name, price, RANK() OVER (ORDER BY price DESC) AS price_rank FROM products;",
    task: "Select 'name', 'price', and DENSE_RANK() OVER (ORDER BY price DESC) as 'price_dense_rank' from products LIMIT 5.",
    starterSql: "SELECT name, price, DENSE_RANK() OVER (ORDER BY price DESC) AS price_dense_rank FROM products LIMIT 5;",
    referenceSql: "SELECT name, price, DENSE_RANK() OVER (ORDER BY price DESC) AS price_dense_rank FROM products LIMIT 5;",
    expectedColumns: ["name", "price", "price_dense_rank"]
  },
  {
    topic: "Window Partitions",
    badge: "PARTITION BY",
    title: "97. Partitioned Windows",
    conceptSummary: "PARTITION BY resets the window calculation independently within each category or segment.",
    conceptExample: "SELECT name, category_id, price, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC) AS rank_in_cat FROM products;",
    task: "Select 'name', 'category_id', 'price', and ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC) as rank_in_category from products LIMIT 10.",
    starterSql: "SELECT name, category_id, price, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC) AS rank_in_category FROM products LIMIT 10;",
    referenceSql: "SELECT name, category_id, price, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC) AS rank_in_category FROM products LIMIT 10;",
    expectedColumns: ["name", "category_id", "price", "rank_in_category"]
  },
  {
    topic: "Running Totals",
    badge: "SUM() OVER",
    title: "98. Running Accumulators with Window Aggregates",
    conceptSummary: "SUM(amount) OVER (ORDER BY date) calculates cumulative running totals.",
    conceptExample: "SELECT id, order_date, total_amount, SUM(total_amount) OVER (ORDER BY order_date, id) AS running_total FROM orders LIMIT 5;",
    task: "Select 'id', 'order_date', 'total_amount', and SUM(total_amount) OVER (ORDER BY order_date, id) as running_total from orders LIMIT 5.",
    starterSql: "SELECT id, order_date, total_amount, SUM(total_amount) OVER (ORDER BY order_date, id) AS running_total FROM orders LIMIT 5;",
    referenceSql: "SELECT id, order_date, total_amount, SUM(total_amount) OVER (ORDER BY order_date, id) AS running_total FROM orders LIMIT 5;",
    expectedColumns: ["id", "order_date", "total_amount", "running_total"]
  },
  {
    topic: "Offset Windows",
    badge: "LAG / LEAD",
    title: "99. Comparing Rows with LAG()",
    conceptSummary: "LAG(column, 1) retrieves the value from the preceding row for period-over-period delta analysis.",
    conceptExample: "SELECT id, order_date, total_amount, LAG(total_amount, 1) OVER (ORDER BY order_date, id) AS prev_amount FROM orders LIMIT 5;",
    task: "Select 'id', 'order_date', 'total_amount', and LAG(total_amount, 1) OVER (ORDER BY order_date, id) as prev_amount from orders LIMIT 5.",
    starterSql: "SELECT id, order_date, total_amount, LAG(total_amount, 1) OVER (ORDER BY order_date, id) AS prev_amount FROM orders LIMIT 5;",
    referenceSql: "SELECT id, order_date, total_amount, LAG(total_amount, 1) OVER (ORDER BY order_date, id) AS prev_amount FROM orders LIMIT 5;",
    expectedColumns: ["id", "order_date", "total_amount", "prev_amount"]
  },
  {
    topic: "Master Capstone",
    badge: "CAPSTONE",
    title: "100. Master SQL Analytics Capstone",
    conceptSummary: "Unite CTEs, conditional aggregations, and window functions to solve a complete executive business inquiry.",
    conceptExample: "WITH ranked_products AS (SELECT name, price, category_id, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS rank FROM products) SELECT name, price, category_id FROM ranked_products WHERE rank = 1;",
    task: "Write a query using a CTE named 'ranked_items' to find the top 1 most expensive product per category.",
    starterSql: "WITH ranked_items AS (\n  SELECT name, price, category_id, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS rnk\n  FROM products\n)\nSELECT name, price, category_id FROM ranked_items WHERE rnk = 1 LIMIT 5;",
    referenceSql: "WITH ranked_items AS (\n  SELECT name, price, category_id, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS rnk\n  FROM products\n)\nSELECT name, price, category_id FROM ranked_items WHERE rnk = 1 LIMIT 5;",
    expectedColumns: ["name", "price", "category_id"]
  }
];

// Combine all 100 questions
const levelsConfig = [
  { level: 1, name: "Level 1: Query Fundamentals", data: l1Data },
  { level: 2, name: "Level 2: Filtering & Ordering", data: l2Data },
  { level: 3, name: "Level 3: Aggregations & Grouping", data: l3Data },
  { level: 4, name: "Level 4: Multi-Table Joins", data: l4Data },
  { level: 5, name: "Level 5: Advanced SQL & Analytics", data: l5Data },
];

let globalId = 1;
for (const lvl of levelsConfig) {
  for (const item of lvl.data) {
    questions.push({
      id: globalId,
      level: lvl.level,
      levelName: lvl.name,
      topic: item.topic,
      badge: item.badge,
      title: item.title,
      conceptSummary: item.conceptSummary,
      conceptExample: item.conceptExample,
      task: item.task,
      starterSql: item.starterSql,
      referenceSql: item.referenceSql,
      expectedColumns: item.expectedColumns,
    });
    globalId++;
  }
}

const fileContent = `export interface LearningQuestion {
  id: number;
  level: number;
  levelName: string;
  topic: string;
  badge: string;
  title: string;
  conceptSummary: string;
  conceptExample: string;
  task: string;
  starterSql: string;
  referenceSql: string;
  expectedColumns: string[];
}

export const LEARNING_LEVELS = [
  { level: 1, name: "Level 1: Query Fundamentals", questionsCount: 20 },
  { level: 2, name: "Level 2: Filtering & Ordering", questionsCount: 20 },
  { level: 3, name: "Level 3: Aggregations & Grouping", questionsCount: 20 },
  { level: 4, name: "Level 4: Multi-Table Joins", questionsCount: 20 },
  { level: 5, name: "Level 5: CTEs, Subqueries & Analytics", questionsCount: 20 },
];

export const LEARNING_QUESTIONS: LearningQuestion[] = ${JSON.stringify(questions, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), "src/lib/content/learning-curriculum.ts"), fileContent, "utf8");
console.log(`Generated curriculum with ${questions.length} questions.`);
