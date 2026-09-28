import { runSandboxQuery } from "./sandbox-engine";
import { QuestionDefinition } from "@/lib/content/ecom-l1-questions";

/**
 * Answer Validation Engine (Spec Section 9.5 & Section 8)
 * Compares result sets of learner query vs reference query:
 * - On primary dataset (e.g. ecom_l1)
 * - On hidden validation variant (e.g. ecom_l1_val)
 * Respects order-sensitivity, column counts, and numeric tolerance.
 * NEVER leaks reference SQL or expected rows to the client.
 */

export interface ValidationFeedback {
  isCorrect: boolean;
  code:
    | "CORRECT"
    | "ROW_COUNT_MISMATCH"
    | "COLUMN_COUNT_MISMATCH"
    | "VALUE_MISMATCH"
    | "ORDER_MISMATCH"
    | "HIDDEN_TEST_FAILED"
    | "SYNTAX_ERROR"
    | "SECURITY_VIOLATION";
  message: string;
  durationMs: number;
  rowCount?: number;
  expectedRowCount?: number; // Only row count is shared, never actual data rows
  columnCount?: number;
  expectedColumnCount?: number;
}

function normalizeValue(val: unknown, tolerance: number): unknown {
  if (val === null || val === undefined) return null;
  if (typeof val === "number") {
    return Math.round(val / tolerance) * tolerance;
  }
  // If numeric string
  if (typeof val === "string" && !isNaN(Number(val)) && val.trim() !== "") {
    const num = Number(val);
    return Math.round(num / tolerance) * tolerance;
  }
  if (typeof val === "string") {
    return val.trim().toLowerCase();
  }
  return String(val);
}

function compareRow(
  actualRow: Record<string, unknown>,
  expectedRow: Record<string, unknown>,
  tolerance: number
): boolean {
  const actualVals = Object.values(actualRow);
  const expectedVals = Object.values(expectedRow);

  if (actualVals.length !== expectedVals.length) return false;

  for (let i = 0; i < actualVals.length; i++) {
    const act = normalizeValue(actualVals[i], tolerance);
    const exp = normalizeValue(expectedVals[i], tolerance);

    if (typeof act === "number" && typeof exp === "number") {
      if (Math.abs(act - exp) > tolerance) return false;
    } else if (act !== exp) {
      return false;
    }
  }

  return true;
}

function stringifyRowCanonical(row: Record<string, unknown>, tolerance: number): string {
  const values = Object.values(row).map((v) => normalizeValue(v, tolerance));
  return JSON.stringify(values);
}

export function compareResultSets(
  actualRows: Record<string, unknown>[],
  expectedRows: Record<string, unknown>[],
  orderSensitive: boolean = false,
  tolerance: number = 0.01
): { match: boolean; reason?: string } {
  if (actualRows.length !== expectedRows.length) {
    return {
      match: false,
      reason: `Row count mismatch: got ${actualRows.length}, expected ${expectedRows.length}`,
    };
  }

  if (orderSensitive) {
    for (let i = 0; i < actualRows.length; i++) {
      if (!compareRow(actualRows[i], expectedRows[i], tolerance)) {
        return { match: false, reason: `Value/order mismatch at row ${i + 1}` };
      }
    }
    return { match: true };
  }

  const expectedBag = new Map<string, number>();
  for (const r of expectedRows) {
    const key = stringifyRowCanonical(r, tolerance);
    expectedBag.set(key, (expectedBag.get(key) || 0) + 1);
  }

  for (let i = 0; i < actualRows.length; i++) {
    const key = stringifyRowCanonical(actualRows[i], tolerance);
    const count = expectedBag.get(key) || 0;
    if (count <= 0) {
      return { match: false, reason: `Unexpected row values at index ${i + 1}` };
    }
    expectedBag.set(key, count - 1);
  }

  return { match: true };
}

export async function validateSubmission(
  learnerSql: string,
  question: QuestionDefinition,
  mainSchema: string = "ecom_l1",
  valSchema: string = "ecom_l1_val"
): Promise<ValidationFeedback> {
  const startTime = Date.now();
  const tolerance = question.validation.numeric_tolerance || 0.01;

  // 1. Run learner query on main schema
  const learnerMain = await runSandboxQuery(learnerSql, mainSchema, 1000);
  if (learnerMain.error) {
    const isSec = learnerMain.error.includes("Security Violation");
    return {
      isCorrect: false,
      code: isSec ? "SECURITY_VIOLATION" : "SYNTAX_ERROR",
      message: learnerMain.error,
      durationMs: Date.now() - startTime,
    };
  }

  // 2. Run reference query on main schema
  const refMain = await runSandboxQuery(question.reference_sql, mainSchema, 1000);
  if (refMain.error) {
    return {
      isCorrect: false,
      code: "SYNTAX_ERROR",
      message: `Internal validation reference error: ${refMain.error}`,
      durationMs: Date.now() - startTime,
    };
  }

  // 3. Compare column count
  if (learnerMain.columns.length !== refMain.columns.length) {
    return {
      isCorrect: false,
      code: "COLUMN_COUNT_MISMATCH",
      message: `Your query returned ${learnerMain.columns.length} column(s), but ${refMain.columns.length} column(s) were expected. Check your SELECT clause.`,
      columnCount: learnerMain.columns.length,
      expectedColumnCount: refMain.columns.length,
      durationMs: Date.now() - startTime,
    };
  }

  // 4. Compare row count on main dataset
  if (learnerMain.rowCount !== refMain.rowCount) {
    return {
      isCorrect: false,
      code: "ROW_COUNT_MISMATCH",
      message: `Row count mismatch: Your query returned ${learnerMain.rowCount} rows, but ${refMain.rowCount} rows were expected. Review your WHERE conditions or JOIN filters.`,
      rowCount: learnerMain.rowCount,
      expectedRowCount: refMain.rowCount,
      durationMs: Date.now() - startTime,
    };
  }

  // 5. Compare row values on main dataset
  if (question.validation.order_sensitive) {
    // Exact sequential match required
    for (let i = 0; i < learnerMain.rows.length; i++) {
      const match = compareRow(learnerMain.rows[i], refMain.rows[i], tolerance);
      if (!match) {
        return {
          isCorrect: false,
          code: "ORDER_MISMATCH",
          message: `The ordering or specific values in row #${i + 1} did not match. Please verify your ORDER BY clause.`,
          durationMs: Date.now() - startTime,
        };
      }
    }
  } else {
    // Order-insensitive set comparison
    const expectedBag = new Map<string, number>();
    for (const r of refMain.rows) {
      const key = stringifyRowCanonical(r, tolerance);
      expectedBag.set(key, (expectedBag.get(key) || 0) + 1);
    }

    for (const r of learnerMain.rows) {
      const key = stringifyRowCanonical(r, tolerance);
      const count = expectedBag.get(key) || 0;
      if (count <= 0) {
        return {
          isCorrect: false,
          code: "VALUE_MISMATCH",
          message: "Some calculated values differ from expected business results. Verify your aggregations, formulas, and filters.",
          durationMs: Date.now() - startTime,
        };
      }
      expectedBag.set(key, count - 1);
    }
  }

  // 6. Test on Hidden Validation Dataset (Section 8: Grading Correctness)
  const learnerVal = await runSandboxQuery(learnerSql, valSchema, 1000);
  const refVal = await runSandboxQuery(question.reference_sql, valSchema, 1000);

  if (learnerVal.error || learnerVal.rowCount !== refVal.rowCount) {
    return {
      isCorrect: false,
      code: "HIDDEN_TEST_FAILED",
      message: "Your query produced expected results on the primary dataset, but failed when evaluated against the secondary company dataset. Ensure your SQL does not hardcode values and accounts for general business logic.",
      durationMs: Date.now() - startTime,
    };
  }

  // All checks passed!
  return {
    isCorrect: true,
    code: "CORRECT",
    message: "Accepted! Your query successfully answered the stakeholder's request.",
    rowCount: learnerMain.rowCount,
    columnCount: learnerMain.columns.length,
    durationMs: Date.now() - startTime,
  };
}
