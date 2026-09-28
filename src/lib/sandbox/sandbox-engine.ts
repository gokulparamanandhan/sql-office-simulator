import { validateSqlSecurity } from "./security-guard";
import { sandboxPool, SandboxExecutionResult } from "@/lib/db/sandbox-db";
import { generateEcomL1Sql } from "@/lib/datasets/ecom-l1-generator";
import { PGlite } from "@electric-sql/pglite";

/**
 * Universal SQL Sandbox Execution Engine (Spec Section 10.3)
 * Dual-backend:
 * - Uses external PostgreSQL Container (port 5433) when active
 * - Gracefully falls back to embedded in-process PostgreSQL 16 (PGlite WASM)
 *   with preloaded ecom_l1 and ecom_l1_val schemas.
 */

let embeddedPgInstance: PGlite | null = null;
let embeddedPgInitializing: Promise<PGlite> | null = null;

async function getEmbeddedPg(): Promise<PGlite> {
  if (embeddedPgInstance) return embeddedPgInstance;
  if (embeddedPgInitializing) return embeddedPgInitializing;

  embeddedPgInitializing = (async () => {
    const pg = new PGlite();
    // Pre-seed ecom_l1 and ecom_l1_val schemas
    const mainSql = generateEcomL1Sql("main");
    const valSql = generateEcomL1Sql("validation");

    await pg.exec(mainSql);
    await pg.exec(valSql);

    embeddedPgInstance = pg;
    return pg;
  })();

  return embeddedPgInitializing;
}

export async function runSandboxQuery(
  rawSql: string,
  schema: string = "ecom_l1",
  maxRows: number = 100
): Promise<SandboxExecutionResult> {
  const startTime = Date.now();

  // 1. Enforce AST Security Checks (Section 10.3)
  const security = validateSqlSecurity(rawSql);
  if (!security.allowed) {
    return {
      columns: [],
      rows: [],
      rowCount: 0,
      durationMs: Date.now() - startTime,
      error: security.reason,
    };
  }

  const queryToRun = security.sanitizedSql!;

  // 2. Try External PostgreSQL Practice Database first
  try {
    const client = await sandboxPool.connect();
    try {
      await client.query("BEGIN TRANSACTION READ ONLY;");
      await client.query(`SET LOCAL search_path = "${schema}", pg_temp;`);
      await client.query("SET LOCAL statement_timeout = 5000;");

      const res = await client.query(queryToRun);
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
    } finally {
      client.release();
    }
  } catch (externalErr: unknown) {
    // If external DB is offline or refused connection, fallback to embedded PGlite
    const externalMsg = externalErr instanceof Error ? externalErr.message : String(externalErr);

    // If it was a SQL syntax error inside the query itself, return the error
    if (
      externalMsg.includes("syntax error") ||
      externalMsg.includes("does not exist") ||
      externalMsg.includes("column")
    ) {
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        durationMs: Date.now() - startTime,
        error: `SQL Error: ${externalMsg}`,
      };
    }

    // Otherwise fallback to embedded PostgreSQL 16
    try {
      const pg = await getEmbeddedPg();
      // Set schema search path
      await pg.exec(`SET search_path = "${schema}";`);
      const res = await pg.query(queryToRun);

      const durationMs = Date.now() - startTime;
      const columns = res.fields ? res.fields.map((f: { name: string }) => f.name) : [];
      const rows = (res.rows as Record<string, unknown>[]).slice(0, maxRows);

      return {
        columns,
        rows,
        rowCount: res.rows.length,
        durationMs,
      };
    } catch (embeddedErr: unknown) {
      const durationMs = Date.now() - startTime;
      const message = embeddedErr instanceof Error ? embeddedErr.message : String(embeddedErr);
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        durationMs,
        error: `SQL Error: ${message}`,
      };
    }
  }
}

export async function executeInSandbox(
  sql: string,
  schema: string = "ecom_l1",
  maxRows: number = 100
) {
  const result = await runSandboxQuery(sql, schema, maxRows);
  return {
    success: !result.error,
    columns: result.columns,
    rows: result.rows,
    rowCount: result.rowCount,
    durationMs: result.durationMs,
    error: result.error,
  };
}
