import { PGlite } from "@electric-sql/pglite";
import { getInterviewQuestionById, InterviewQuestion } from "../content/interview-questions";
import { validateSqlSecurity } from "../sandbox/security-guard";
import { transpileDialectToPg, DIALECT_POLYFILL_SQL } from "../dialect/dialect-transpiler";

export { transpileDialectToPg };

let interviewPgInstance: PGlite | null = null;
let interviewPgPromise: Promise<PGlite> | null = null;
const initializedSchemas = new Set<string>();

async function getInterviewPg(): Promise<PGlite> {
  if (interviewPgInstance) return interviewPgInstance;
  if (interviewPgPromise) return interviewPgPromise;

  interviewPgPromise = (async () => {
    const pg = new PGlite();
    await pg.exec(DIALECT_POLYFILL_SQL);
    interviewPgInstance = pg;
    return pg;
  })();

  return interviewPgPromise;
}

function getSchemaName(questionId: string, isValidation: boolean = false): string {
  const cleanId = questionId.toLowerCase().replace(/[^a-z0-9]/g, "_");
  return isValidation ? `int_${cleanId}_val` : `int_${cleanId}`;
}

async function ensureInterviewSchema(pg: PGlite, question: InterviewQuestion, isValidation: boolean = false): Promise<string> {
  const schema = getSchemaName(question.id, isValidation);
  if (initializedSchemas.has(schema)) return schema;

  await pg.exec(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);
  await pg.exec(`SET search_path = "${schema}", public;`);
  await pg.exec(question.schemaSql);
  await pg.exec(`CREATE OR REPLACE VIEW "${schema}".dual AS SELECT 1 AS dummy;`);

  if (isValidation && question.hiddenTestSql) {
    await pg.exec(question.hiddenTestSql);
  }

  initializedSchemas.add(schema);
  return schema;
}

export interface SchemaTablePreview {
  tableName: string;
  columns: Array<{ name: string; type: string }>;
  sampleRows: Record<string, unknown>[];
  totalRows: number;
}

export interface InterviewSchemaPreviewResult {
  success: boolean;
  tables: SchemaTablePreview[];
  expectedColumns?: string[];
  expectedSampleRows?: Record<string, unknown>[];
  error?: string;
}

export async function getInterviewSchemaPreview(
  questionId: string,
  includeExpected: boolean = false
): Promise<InterviewSchemaPreviewResult> {
  const question = getInterviewQuestionById(questionId);
  if (!question) {
    return { success: false, tables: [], error: `Question '${questionId}' not found.` };
  }

  try {
    const pg = await getInterviewPg();
    const schema = await ensureInterviewSchema(pg, question, false);
    await pg.exec(`SET search_path = "${schema}", public;`);

    const tablesRes = await pg.query<{ table_name: string }>(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = $1 AND table_type = 'BASE TABLE' ORDER BY table_name ASC;`,
      [schema]
    );

    const tables: SchemaTablePreview[] = [];
    for (const row of tablesRes.rows) {
      const tbl = row.table_name;
      const safeTbl = `"${schema}"."${tbl.replace(/"/g, '""')}"`;
      const colsRes = await pg.query<{ column_name: string; data_type: string }>(
        `SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2 ORDER BY ordinal_position ASC;`,
        [schema, tbl]
      );
      const countRes = await pg.query<{ cnt: string | number }>(`SELECT COUNT(*) AS cnt FROM ${safeTbl};`);
      const sampleRes = await pg.query<Record<string, unknown>>(`SELECT * FROM ${safeTbl} LIMIT 8;`);

      tables.push({
        tableName: tbl,
        columns: colsRes.rows.map((c) => ({ name: c.column_name, type: c.data_type.toUpperCase() })),
        sampleRows: sampleRes.rows,
        totalRows: Number(countRes.rows[0]?.cnt ?? sampleRes.rows.length),
      });
    }

    let expectedColumns: string[] | undefined;
    let expectedSampleRows: Record<string, unknown>[] | undefined;

    if (includeExpected) {
      const refExec = await pg.exec(question.referenceSql);
      const refRes = refExec[refExec.length - 1];
      expectedColumns = refRes?.fields?.map((f: { name: string }) => f.name) || question.expectedColumns;
      expectedSampleRows = ((refRes?.rows as Record<string, unknown>[]) || []).slice(0, 6);
    }

    return {
      success: true,
      tables,
      expectedColumns,
      expectedSampleRows,
    };
  } catch (err: unknown) {
    return {
      success: false,
      tables: [],
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export interface RunInterviewQueryResult {
  success: boolean;
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  durationMs: number;
  error?: string;
}

export async function runInterviewQuery(
  questionId: string,
  userSql: string,
  maxRows: number = 100,
  dialect: string = "PostgreSQL"
): Promise<RunInterviewQueryResult> {
  const startTime = Date.now();
  const question = getInterviewQuestionById(questionId);

  if (!question) {
    return {
      success: false,
      columns: [],
      rows: [],
      rowCount: 0,
      durationMs: Date.now() - startTime,
      error: `Interview question with ID '${questionId}' not found.`,
    };
  }

  const transpiledSql = transpileDialectToPg(userSql, dialect);

  const security = validateSqlSecurity(transpiledSql);
  if (!security.allowed) {
    return {
      success: false,
      columns: [],
      rows: [],
      rowCount: 0,
      durationMs: Date.now() - startTime,
      error: security.reason || "Query rejected for security policy violations.",
    };
  }

  try {
    const pg = await getInterviewPg();
    const schema = await ensureInterviewSchema(pg, question, false);
    await pg.exec(`SET search_path = "${schema}", public;`);

    const results = await pg.exec(security.sanitizedSql || transpiledSql);
    let finalRes = results[results.length - 1];
    for (let i = results.length - 1; i >= 0; i--) {
      if (results[i]?.fields && results[i].fields.length > 0) {
        finalRes = results[i];
        break;
      }
    }

    const durationMs = Date.now() - startTime;
    const columns = finalRes?.fields ? finalRes.fields.map((f: { name: string }) => f.name) : [];
    const rawRows = (finalRes?.rows as Record<string, unknown>[]) || [];
    const rows = rawRows.slice(0, maxRows);

    return {
      success: true,
      columns,
      rows,
      rowCount: rawRows.length,
      durationMs,
    };
  } catch (err: unknown) {
    const durationMs = Date.now() - startTime;
    const message = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      columns: [],
      rows: [],
      rowCount: 0,
      durationMs,
      error: `SQL Execution Error: ${message}`,
    };
  }
}

export interface InterviewSubmissionResult {
  isCorrect: boolean;
  code:
    | "CORRECT"
    | "ROW_COUNT_MISMATCH"
    | "COLUMN_MISMATCH"
    | "VALUE_MISMATCH"
    | "ORDER_MISMATCH"
    | "HIDDEN_TEST_FAILED"
    | "SYNTAX_ERROR"
    | "SECURITY_VIOLATION";
  message: string;
  diagnosisHint?: string;
  durationMs: number;
  actualRows?: Record<string, unknown>[];
  expectedRows?: Record<string, unknown>[];
  actualColumns?: string[];
  expectedColumns?: string[];
  diff?: {
    rowIndex: number;
    column: string;
    expected: unknown;
    actual: unknown;
  };
}

function normalizeVal(val: unknown, tolerance: number = 0.01): unknown {
  if (val === null || val === undefined) return null;
  if (typeof val === "number") {
    return Math.round(val / tolerance) * tolerance;
  }
  if (typeof val === "string" && !isNaN(Number(val)) && val.trim() !== "") {
    const num = Number(val);
    return Math.round(num / tolerance) * tolerance;
  }
  if (typeof val === "string") {
    return val.trim().toLowerCase();
  }
  return String(val);
}

function rowsMatchAsMultiset(
  actualRows: Record<string, unknown>[],
  expectedRows: Record<string, unknown>[]
): boolean {
  if (actualRows.length !== expectedRows.length) return false;
  const toKey = (r: Record<string, unknown>) =>
    JSON.stringify(Object.values(r).map((v) => normalizeVal(v)));
  const bag = new Map<string, number>();
  for (const r of expectedRows) {
    const k = toKey(r);
    bag.set(k, (bag.get(k) || 0) + 1);
  }
  for (const r of actualRows) {
    const k = toKey(r);
    const c = bag.get(k) || 0;
    if (c <= 0) return false;
    bag.set(k, c - 1);
  }
  return true;
}

function diagnoseSqlMistake(
  userSql: string,
  refSql: string,
  actualRows: Record<string, unknown>[],
  expectedRows: Record<string, unknown>[],
  diff?: { expected: unknown; actual: unknown }
): string | undefined {
  const u = userSql.toUpperCase();
  const r = refSql.toUpperCase();

  if (/\bLAST_VALUE\s*\(/i.test(u) && !/UNBOUNDED\s+FOLLOWING/i.test(u)) {
    return "LAST_VALUE() trap detected: without ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING, PostgreSQL stops at CURRENT ROW.";
  }
  if (/\bDENSE_RANK\s*\(/i.test(r) && (/\bRANK\s*\(/i.test(u) || /\bROW_NUMBER\s*\(/i.test(u)) && !/\bDENSE_RANK\s*\(/i.test(u)) {
    return "Ranking function mismatch: check tie behavior! DENSE_RANK() shares ranks on ties without skipping numbers.";
  }
  if (actualRows.length > expectedRows.length) {
    if (/\bJOIN\b/.test(u) && /\bWITH\b/.test(r) && !/\bWITH\b/.test(u)) {
      return "Possible join fanout: joining one-to-many tables directly can duplicate rows. Pre-aggregate child tables inside a CTE before joining.";
    }
    if (/\bGROUP\s+BY\b/.test(r) && !/\bGROUP\s+BY\b/.test(u)) {
      return "Missing GROUP BY: your query returned ungrouped detail rows instead of one summary row per group.";
    }
    if (/\bDISTINCT\b/.test(r) && !/\bDISTINCT\b/.test(u) && !/\bUNION\b/.test(u)) {
      return "Extra duplicate rows returned—check whether DISTINCT or UNION (instead of UNION ALL) is required.";
    }
    if (/\bLIMIT\b/.test(r) && !/\bLIMIT\b/.test(u)) {
      return "Your query is missing a LIMIT clause to restrict top-N rows.";
    }
  }
  if (actualRows.length < expectedRows.length) {
    if (/\bNOT\s+IN\b/.test(u) && actualRows.length === 0) {
      return "NOT IN returned 0 rows! If the inner column has even one NULL, NOT IN fails. Filter IS NOT NULL or switch to NOT EXISTS.";
    }
    if (/\bJOIN\b/.test(u) && !/\bLEFT\s+JOIN\b/.test(u) && /\bLEFT\s+JOIN\b/.test(r)) {
      return "Missing unmatched rows: INNER JOIN drops zero-activity records. Use LEFT JOIN (and put right-table filters in ON, not WHERE).";
    }
  }
  if (diff && ((diff.actual === null && diff.expected !== null) || (diff.actual !== null && diff.expected === null))) {
    return "NULL mismatch detected: check COALESCE(..., 0) for arithmetic/defaults or NULLIF(..., 0) for denominators.";
  }
  if (/\bOVER\s*\(/i.test(r) && /(ROWS|RANGE)\s+BETWEEN/i.test(r) && !/(ROWS|RANGE)\s+BETWEEN/i.test(u)) {
    return "Check your window frame clause (ROWS BETWEEN ... AND ...): default RANGE frames merge duplicate sort keys together.";
  }
  return undefined;
}

export async function submitInterviewQuery(
  questionId: string,
  userSql: string,
  dialect: string = "PostgreSQL"
): Promise<InterviewSubmissionResult> {
  const startTime = Date.now();
  const question = getInterviewQuestionById(questionId);

  if (!question) {
    return {
      isCorrect: false,
      code: "SYNTAX_ERROR",
      message: `Interview question with ID '${questionId}' not found.`,
      durationMs: Date.now() - startTime,
    };
  }

  const transpiledSql = transpileDialectToPg(userSql, dialect);

  const security = validateSqlSecurity(transpiledSql);
  if (!security.allowed) {
    return {
      isCorrect: false,
      code: "SECURITY_VIOLATION",
      message: security.reason || "SQL contains unauthorized constructs.",
      durationMs: Date.now() - startTime,
    };
  }

  const cleanUserSql = security.sanitizedSql || transpiledSql;

  try {
    const pg = await getInterviewPg();
    const primarySchema = await ensureInterviewSchema(pg, question, false);
    await pg.exec(`SET search_path = "${primarySchema}", public;`);

    let userPrimaryRes;
    try {
      const exec = await pg.exec(cleanUserSql);
      userPrimaryRes = exec[exec.length - 1];
      for (let i = exec.length - 1; i >= 0; i--) {
        if (exec[i]?.fields && exec[i].fields.length > 0) {
          userPrimaryRes = exec[i];
          break;
        }
      }
    } catch (userErr: unknown) {
      const msg = userErr instanceof Error ? userErr.message : String(userErr);
      return {
        isCorrect: false,
        code: "SYNTAX_ERROR",
        message: `Query failed with error: ${msg}`,
        durationMs: Date.now() - startTime,
      };
    }

    const refPrimaryExec = await pg.exec(question.referenceSql);
    const refPrimaryRes = refPrimaryExec[refPrimaryExec.length - 1];

    const actualCols: string[] = userPrimaryRes?.fields?.map((f: { name: string }) => f.name) || [];
    const expectedCols: string[] = refPrimaryRes?.fields?.map((f: { name: string }) => f.name) || question.expectedColumns;
    const actualRows: Record<string, unknown>[] = (userPrimaryRes?.rows as Record<string, unknown>[]) || [];
    const expectedRows: Record<string, unknown>[] = (refPrimaryRes?.rows as Record<string, unknown>[]) || [];

    if (actualCols.length !== expectedCols.length) {
      return {
        isCorrect: false,
        code: "COLUMN_MISMATCH",
        message: `Column count mismatch. Expected ${expectedCols.length} columns (${expectedCols.join(", ")}), but your query returned ${actualCols.length} columns (${actualCols.join(", ")}).`,
        diagnosisHint: "Ensure your final SELECT outputs the exact requested columns in order.",
        durationMs: Date.now() - startTime,
        actualColumns: actualCols,
        expectedColumns: expectedCols,
        actualRows: actualRows.slice(0, 10),
        expectedRows: expectedRows.slice(0, 10),
      };
    }

    if (actualRows.length !== expectedRows.length) {
      return {
        isCorrect: false,
        code: "ROW_COUNT_MISMATCH",
        message: `Row count mismatch on sample data. Expected ${expectedRows.length} rows, but your query returned ${actualRows.length} rows.`,
        diagnosisHint: diagnoseSqlMistake(cleanUserSql, question.referenceSql, actualRows, expectedRows),
        durationMs: Date.now() - startTime,
        actualColumns: actualCols,
        expectedColumns: expectedCols,
        actualRows: actualRows.slice(0, 10),
        expectedRows: expectedRows.slice(0, 10),
      };
    }

    // Check values row by row
    for (let r = 0; r < expectedRows.length; r++) {
      const expRow = expectedRows[r];
      const actRow = actualRows[r];
      const expKeys = Object.keys(expRow);
      const actKeys = Object.keys(actRow);

      for (let c = 0; c < expKeys.length; c++) {
        const expVal = normalizeVal(expRow[expKeys[c]]);
        const actVal = normalizeVal(actRow[actKeys[c]]);

        const mismatch =
          typeof expVal === "number" && typeof actVal === "number"
            ? Math.abs(expVal - actVal) > 0.02
            : expVal !== actVal;

        if (mismatch) {
          if (rowsMatchAsMultiset(actualRows, expectedRows)) {
            if (!question.orderSensitive) {
              break;
            }
            return {
              isCorrect: false,
              code: "ORDER_MISMATCH",
              message: `All ${expectedRows.length} row values match, but their ordering does not match the required sort order.`,
              diagnosisHint: "Check your ORDER BY direction (ASC vs DESC) and tie-breaker columns.",
              durationMs: Date.now() - startTime,
              actualColumns: actualCols,
              expectedColumns: expectedCols,
              actualRows: actualRows.slice(0, 10),
              expectedRows: expectedRows.slice(0, 10),
              diff: {
                rowIndex: r,
                column: actKeys[c],
                expected: expRow[expKeys[c]],
                actual: actRow[actKeys[c]],
              },
            };
          }

          return {
            isCorrect: false,
            code: "VALUE_MISMATCH",
            message: `Value discrepancy at row ${r + 1}, column '${actKeys[c]}'. Expected '${expRow[expKeys[c]]}', but received '${actRow[actKeys[c]]}'.`,
            diagnosisHint: diagnoseSqlMistake(cleanUserSql, question.referenceSql, actualRows, expectedRows, {
              expected: expRow[expKeys[c]],
              actual: actRow[actKeys[c]],
            }),
            durationMs: Date.now() - startTime,
            actualColumns: actualCols,
            expectedColumns: expectedCols,
            actualRows: actualRows.slice(0, 10),
            expectedRows: expectedRows.slice(0, 10),
            diff: {
              rowIndex: r,
              column: actKeys[c],
              expected: expRow[expKeys[c]],
              actual: actRow[actKeys[c]],
            },
          };
        }
      }
      if (!question.orderSensitive && rowsMatchAsMultiset(actualRows, expectedRows)) {
        break;
      }
    }

    if (question.hiddenTestSql) {
      const valSchema = await ensureInterviewSchema(pg, question, true);
      await pg.exec(`SET search_path = "${valSchema}", public;`);

      const userValExec = await pg.exec(cleanUserSql);
      const refValExec = await pg.exec(question.referenceSql);

      const userValRes = userValExec[userValExec.length - 1];
      const refValRes = refValExec[refValExec.length - 1];

      const valActRows = (userValRes?.rows as Record<string, unknown>[]) || [];
      const valExpRows = (refValRes?.rows as Record<string, unknown>[]) || [];

      if (valActRows.length !== valExpRows.length) {
        return {
          isCorrect: false,
          code: "HIDDEN_TEST_FAILED",
          message: `Passed sample data, but failed on hidden edge-case test case! Expected ${valExpRows.length} rows, but got ${valActRows.length}.`,
          diagnosisHint: "Review ties, zero denominators (NULLIF), or NULL handling.",
          durationMs: Date.now() - startTime,
        };
      }
    }

    return {
      isCorrect: true,
      code: "CORRECT",
      message: "Accepted! All sample and hidden interview test cases passed successfully.",
      durationMs: Date.now() - startTime,
      actualColumns: actualCols,
      expectedColumns: expectedCols,
      actualRows: actualRows.slice(0, 10),
      expectedRows: expectedRows.slice(0, 10),
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      isCorrect: false,
      code: "SYNTAX_ERROR",
      message: `System error during execution: ${msg}`,
      durationMs: Date.now() - startTime,
    };
  }
}
