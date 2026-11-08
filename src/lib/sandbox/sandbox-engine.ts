import { validateSqlSecurity } from "./security-guard";
import { sandboxPool, SandboxExecutionResult } from "@/lib/db/sandbox-db";
import { generateDomainSql } from "@/lib/datasets/multi-domain-generators";
import { PGlite } from "@electric-sql/pglite";

/**
 * Universal SQL Sandbox Execution Engine (Spec Section 10.3)
 * Dual-backend:
 * - Uses external PostgreSQL Container (port 5433) when active
 * - Gracefully falls back to embedded in-process PostgreSQL 16 (PGlite WASM)
 *   with preloaded ecom_l1 and ecom_l1_val schemas and on-demand multi-domain schemas.
 */

let embeddedPgInstance: PGlite | null = null;
let embeddedPgInitializing: Promise<PGlite> | null = null;
const seededSchemas = new Set<string>(["ecom_l1", "ecom_l1_val"]);

async function getEmbeddedPg(): Promise<PGlite> {
  if (embeddedPgInstance) return embeddedPgInstance;
  if (embeddedPgInitializing) return embeddedPgInitializing;

  embeddedPgInitializing = (async () => {
    try {
      const pg = new PGlite();
      // Pre-seed ecom_l1 and ecom_l1_val schemas with all 15 operational tables
      const mainSql = generateDomainSql("ecommerce", "main", "ecom_l1");
      const valSql = generateDomainSql("ecommerce", "validation", "ecom_l1_val");

      await pg.exec(mainSql);
      await pg.exec(valSql);

      embeddedPgInstance = pg;
      return pg;
    } catch (err) {
      embeddedPgInitializing = null;
      throw err;
    }
  })();

  return embeddedPgInitializing;
}

async function ensureSchemaSeeded(pg: PGlite, schema: string): Promise<void> {
  if (seededSchemas.has(schema)) return;
  const isVal = schema.endsWith("_val");
  const rawDomain = schema.replace(/_l\d+(_val)?$/, "").replace(/^ecom$/, "ecommerce");
  try {
    const sql = generateDomainSql(rawDomain, isVal ? "validation" : "main", schema);
    if (sql) {
      await pg.exec(sql);
      seededSchemas.add(schema);
    }
  } catch (err) {
    console.warn(`Could not auto-seed schema ${schema}:`, err);
  }
}

function prepareQueryForExecution(sql: string): string {
  const tempMatches = [...sql.matchAll(/CREATE\s+(?:TEMP|TEMPORARY)\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)/gi)];
  const viewMatches = [...sql.matchAll(/CREATE\s+(?:OR\s+REPLACE\s+)?VIEW\s+([a-zA-Z0-9_]+)/gi)];
  const indexMatches = [...sql.matchAll(/CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)/gi)];
  const triggerMatches = [...sql.matchAll(/CREATE\s+TRIGGER\s+([a-zA-Z0-9_]+)\s+[\s\S]*?\s+ON\s+([a-zA-Z0-9_]+)/gi)];
  const procMatches = [...sql.matchAll(/CREATE\s+(?:OR\s+REPLACE\s+)?PROCEDURE\s+([a-zA-Z0-9_]+)/gi)];
  const partMatches = [...sql.matchAll(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)\s+(?:PARTITION\s+OF|\([\s\S]*?\)\s*PARTITION\s+BY)/gi)];

  let prep = "";
  for (const m of tempMatches) {
    prep += `DROP TABLE IF EXISTS "${m[1]}" CASCADE; `;
  }
  for (const m of viewMatches) {
    prep += `DROP VIEW IF EXISTS "${m[1]}" CASCADE; `;
  }
  for (const m of indexMatches) {
    prep += `DROP INDEX IF EXISTS "${m[1]}"; `;
  }
  for (const m of triggerMatches) {
    prep += `DROP TRIGGER IF EXISTS "${m[1]}" ON "${m[2]}"; `;
  }
  for (const m of procMatches) {
    prep += `DROP PROCEDURE IF EXISTS "${m[1]}"; `;
  }
  for (const m of partMatches) {
    prep += `DROP TABLE IF EXISTS "${m[1]}" CASCADE; `;
  }
  return prep + sql;
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

  // 2. Execute via embedded PostgreSQL WASM (PGlite) for instant zero-latency compilation
  // If external DB is explicitly configured via USE_EXTERNAL_DB=true, try TCP pool with short timeout
  if (process.env.USE_EXTERNAL_DB === "true") {
    try {
      const connectPromise = sandboxPool.connect();
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("External DB connection timeout")), 200)
      );
      const client = await Promise.race([connectPromise, timeoutPromise]);
      try {
        await client.query("BEGIN TRANSACTION;");
        await client.query(`SET LOCAL search_path = "${schema}", pg_temp;`);
        await client.query("SET LOCAL statement_timeout = 5000;");

        const executableSql = prepareQueryForExecution(queryToRun);
        const res = await client.query(executableSql);
        await client.query("ROLLBACK;");

        const durationMs = Date.now() - startTime;
        const lastResult = Array.isArray(res) ? res[res.length - 1] : res;
        const columns = lastResult.fields ? lastResult.fields.map((f: { name: string }) => f.name) : [];
        const rows = lastResult.rows ? lastResult.rows.slice(0, maxRows) : [];

        return {
          columns,
          rows,
          rowCount: lastResult.rowCount ?? rows.length,
          durationMs,
        };
      } finally {
        client.release();
      }
    } catch (externalErr: unknown) {
      const externalMsg = externalErr instanceof Error ? externalErr.message : String(externalErr);
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
    }
  }

  // Fast In-Process Embedded PostgreSQL 16 (PGlite)
  try {
    const pg = await getEmbeddedPg();
    await ensureSchemaSeeded(pg, schema);
    await pg.exec(`SET search_path = "${schema}";`);

    const executableSql = prepareQueryForExecution(queryToRun);
    const execResults = await pg.exec(executableSql);

    // Pick the last result containing fields or the final statement
    let finalRes = execResults[execResults.length - 1];
    for (let i = execResults.length - 1; i >= 0; i--) {
      if (execResults[i].fields && execResults[i].fields.length > 0) {
        finalRes = execResults[i];
        break;
      }
    }

    const durationMs = Date.now() - startTime;
    const columns = finalRes?.fields ? finalRes.fields.map((f: { name: string }) => f.name) : [];
    const rows = ((finalRes?.rows as Record<string, unknown>[]) || []).slice(0, maxRows);

    return {
      columns,
      rows,
      rowCount: finalRes?.rows?.length ?? rows.length,
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
