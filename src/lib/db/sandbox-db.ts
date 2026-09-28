import { Pool, QueryResult } from "pg";

/**
 * SQL Sandbox Database Pool Manager (Spec Section 10.3)
 * Provides isolated read-only execution with strict statement timeouts,
 * transaction rollback, and schema sandboxing.
 */

const globalForPool = globalThis as unknown as {
  sandboxPool: Pool | undefined;
  sandboxAdminPool: Pool | undefined;
};

const SANDBOX_URL =
  process.env.SANDBOX_DATABASE_URL ||
  "postgresql://sandbox_readonly:sandbox_readonly_pass@localhost:5433/sql_office_sandbox";

const SANDBOX_ADMIN_URL =
  process.env.SANDBOX_DATABASE_ADMIN_URL ||
  "postgresql://postgres:sandboxtopsecret@localhost:5433/sql_office_sandbox";

// Read-only pool for learner query execution
export const sandboxPool =
  globalForPool.sandboxPool ??
  new Pool({
    connectionString: SANDBOX_URL,
    max: 20,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000,
    statement_timeout: 5000,
  });

// Admin pool strictly for seeding/dataset generators
export const sandboxAdminPool =
  globalForPool.sandboxAdminPool ??
  new Pool({
    connectionString: SANDBOX_ADMIN_URL,
    max: 5,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPool.sandboxPool = sandboxPool;
  globalForPool.sandboxAdminPool = sandboxAdminPool;
}

export interface SandboxExecutionResult {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  durationMs: number;
  error?: string;
}

/**
 * Execute a query safely within a sandboxed schema
 */
export async function executeSandboxQuery(
  sql: string,
  schema: string = "ecom_l1",
  maxRows: number = 100
): Promise<SandboxExecutionResult> {
  const startTime = Date.now();
  const client = await sandboxPool.connect();

  try {
    // 1. Begin read-only transaction
    await client.query("BEGIN TRANSACTION READ ONLY;");
    
    // 2. Set search path to isolated schema
    await client.query(`SET LOCAL search_path = "${schema}", pg_temp;`);
    
    // 3. Set statement timeout (5s default)
    await client.query("SET LOCAL statement_timeout = 5000;");

    // 4. Execute the learner's query
    const res: QueryResult = await client.query(sql);

    // 5. Always rollback transaction so no state can ever mutate
    await client.query("ROLLBACK;");

    const durationMs = Date.now() - startTime;
    const columns = res.fields ? res.fields.map((f) => f.name) : [];
    const rows = res.rows ? res.rows.slice(0, maxRows) : [];

    return {
      columns,
      rows,
      rowCount: res.rowCount ?? rows.length,
      durationMs,
    };
  } catch (err: unknown) {
    try {
      await client.query("ROLLBACK;");
    } catch {
      // Ignore rollback failure if already closed
    }
    const durationMs = Date.now() - startTime;
    const errorMessage = err instanceof Error ? err.message : String(err);
    return {
      columns: [],
      rows: [],
      rowCount: 0,
      durationMs,
      error: errorMessage,
    };
  } finally {
    client.release();
  }
}
