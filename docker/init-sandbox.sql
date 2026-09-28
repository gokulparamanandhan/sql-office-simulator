-- SQL Office Simulator: Sandbox Database Initialization
-- Provisions restricted read-only role for learners with strict security policies

-- 1. Create a restricted read-only user
DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'sandbox_readonly') THEN
      CREATE ROLE sandbox_readonly WITH LOGIN PASSWORD 'sandbox_readonly_pass';
   END IF;
END
$do$;

-- 2. Configure session defaults on the read-only role
ALTER ROLE sandbox_readonly SET default_transaction_read_only = on;
ALTER ROLE sandbox_readonly SET statement_timeout = '5000'; -- 5 seconds default
ALTER ROLE sandbox_readonly SET lock_timeout = '3000';
ALTER ROLE sandbox_readonly SET idle_in_transaction_session_timeout = '5000';

-- 3. Revoke dangerous functions and schemas
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON DATABASE sql_office_sandbox FROM PUBLIC;
GRANT CONNECT ON DATABASE sql_office_sandbox TO sandbox_readonly;

-- 4. Create ecom_l1 and ecom_l1_val placeholder schemas
CREATE SCHEMA IF NOT EXISTS ecom_l1;
CREATE SCHEMA IF NOT EXISTS ecom_l1_val;

-- Allow sandbox_readonly to access and query schemas
GRANT USAGE ON SCHEMA ecom_l1 TO sandbox_readonly;
GRANT USAGE ON SCHEMA ecom_l1_val TO sandbox_readonly;

ALTER DEFAULT PRIVILEGES IN SCHEMA ecom_l1 GRANT SELECT ON TABLES TO sandbox_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA ecom_l1_val GRANT SELECT ON TABLES TO sandbox_readonly;
