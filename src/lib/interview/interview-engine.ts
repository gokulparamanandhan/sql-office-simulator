import { PGlite } from "@electric-sql/pglite";
import { getInterviewQuestionById, InterviewQuestion } from "../content/interview-questions";
import { validateSqlSecurity } from "../sandbox/security-guard";

let interviewPgInstance: PGlite | null = null;
let interviewPgPromise: Promise<PGlite> | null = null;
const initializedSchemas = new Set<string>();

async function getInterviewPg(): Promise<PGlite> {
  if (interviewPgInstance) return interviewPgInstance;
  if (interviewPgPromise) return interviewPgPromise;

  interviewPgPromise = (async () => {
    const pg = new PGlite();
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
  await pg.exec(`SET search_path = "${schema}";`);
  await pg.exec(question.schemaSql);

  if (isValidation && question.hiddenTestSql) {
    await pg.exec(question.hiddenTestSql);
  }

  initializedSchemas.add(schema);
  return schema;
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
  maxRows: number = 100
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

  // Ast Security check
  const security = validateSqlSecurity(userSql);
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
    await pg.exec(`SET search_path = "${schema}";`);

    const results = await pg.exec(security.sanitizedSql || userSql);
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

export async function submitInterviewQuery(
  questionId: string,
  userSql: string
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

  // 1. Security Check
  const security = validateSqlSecurity(userSql);
  if (!security.allowed) {
    return {
      isCorrect: false,
      code: "SECURITY_VIOLATION",
      message: security.reason || "SQL contains unauthorized constructs.",
      durationMs: Date.now() - startTime,
    };
  }

  const cleanUserSql = security.sanitizedSql || userSql;

  try {
    const pg = await getInterviewPg();

    // 2. Primary Dataset Evaluation
    const primarySchema = await ensureInterviewSchema(pg, question, false);
    await pg.exec(`SET search_path = "${primarySchema}";`);

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

    // Check Columns count
    if (actualCols.length !== expectedCols.length) {
      return {
        isCorrect: false,
        code: "COLUMN_MISMATCH",
        message: `Column count mismatch. Expected ${expectedCols.length} columns (${expectedCols.join(", ")}), but your query returned ${actualCols.length} columns (${actualCols.join(", ")}).`,
        durationMs: Date.now() - startTime,
        actualColumns: actualCols,
        expectedColumns: expectedCols,
        actualRows: actualRows.slice(0, 10),
        expectedRows: expectedRows.slice(0, 10),
      };
    }

    // Check Row Count
    if (actualRows.length !== expectedRows.length) {
      return {
        isCorrect: false,
        code: "ROW_COUNT_MISMATCH",
        message: `Row count mismatch on sample data. Expected ${expectedRows.length} rows, but your query returned ${actualRows.length} rows. Check your WHERE filters or JOIN conditions.`,
        durationMs: Date.now() - startTime,
        actualColumns: actualCols,
        expectedColumns: expectedCols,
        actualRows: actualRows.slice(0, 10),
        expectedRows: expectedRows.slice(0, 10),
      };
    }

    // Check Values row by row
    for (let r = 0; r < expectedRows.length; r++) {
      const expRow = expectedRows[r];
      const actRow = actualRows[r];

      const expKeys = Object.keys(expRow);
      const actKeys = Object.keys(actRow);

      for (let c = 0; c < expKeys.length; c++) {
        const expVal = normalizeVal(expRow[expKeys[c]]);
        const actVal = normalizeVal(actRow[actKeys[c]]);

        if (typeof expVal === "number" && typeof actVal === "number") {
          if (Math.abs(expVal - actVal) > 0.02) {
            return {
              isCorrect: false,
              code: "VALUE_MISMATCH",
              message: `Value discrepancy at row ${r + 1}, column '${actKeys[c]}'. Expected '${expRow[expKeys[c]]}', but received '${actRow[actKeys[c]]}'.`,
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
        } else if (expVal !== actVal) {
          return {
            isCorrect: false,
            code: "VALUE_MISMATCH",
            message: `Value discrepancy at row ${r + 1}, column '${actKeys[c]}'. Expected '${expRow[expKeys[c]]}', but received '${actRow[actKeys[c]]}'.`,
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
    }

    // 3. Hidden Edge-Case Dataset Evaluation (if defined)
    if (question.hiddenTestSql) {
      const valSchema = await ensureInterviewSchema(pg, question, true);
      await pg.exec(`SET search_path = "${valSchema}";`);

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
          message: `Passed sample data, but failed on hidden edge-case test case! Expected ${valExpRows.length} rows, but got ${valActRows.length}. Review ties, zero denominators, or NULL handling.`,
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

