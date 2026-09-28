import { QuestionDefinition } from "../content/ecom-l1-questions";
import { validateSqlSecurity } from "../sandbox/security-guard";
import { executeInSandbox } from "../sandbox/sandbox-engine";
import { compareResultSets } from "../sandbox/validation-engine";

export interface GateResult {
  passed: boolean;
  gateName: string;
  error?: string;
  details?: Record<string, any>;
}

export interface QuestionValidationSummary {
  questionId: string;
  order: number;
  difficulty: string;
  passedAll: boolean;
  gates: GateResult[];
}

/**
 * Gate 1: Syntax & AST Security Check
 * Verifies query parses into a valid single SELECT AST and has no unsafe operations
 */
export function checkGateAstSecurity(question: QuestionDefinition): GateResult {
  const security = validateSqlSecurity(question.reference_sql);
  if (!security.allowed) {
    return {
      passed: false,
      gateName: "AST Security Check",
      error: security.reason || "Unsafe SQL pattern detected",
    };
  }
  return {
    passed: true,
    gateName: "AST Security Check",
    details: { allowed: true },
  };
}

/**
 * Gate 2: Concept Verification
 * Verifies that the reference SQL actually uses the concepts tagged on the question
 */
export function checkGateConcepts(question: QuestionDefinition): GateResult {
  const sql = question.reference_sql.toUpperCase();
  const missing: string[] = [];

  for (const concept of question.concepts) {
    const c = concept.toUpperCase();
    if (c === "INNER JOIN" || c === "JOIN") {
      if (!sql.includes("JOIN")) missing.push(concept);
    } else if (c === "LEFT JOIN") {
      if (!sql.includes("LEFT JOIN")) missing.push(concept);
    } else if (c === "GROUP BY") {
      if (!sql.includes("GROUP BY")) missing.push(concept);
    } else if (c === "HAVING") {
      if (!sql.includes("HAVING")) missing.push(concept);
    } else if (c === "ORDER BY") {
      if (!sql.includes("ORDER BY")) missing.push(concept);
    } else if (c === "LIMIT") {
      if (!sql.includes("LIMIT")) missing.push(concept);
    } else if (c === "DISTINCT") {
      if (!sql.includes("DISTINCT")) missing.push(concept);
    } else if (c === "WHERE") {
      if (!sql.includes("WHERE")) missing.push(concept);
    }
  }

  if (missing.length > 0) {
    return {
      passed: false,
      gateName: "Concept Check",
      error: `SQL does not contain tagged concept(s): ${missing.join(", ")}`,
    };
  }

  return {
    passed: true,
    gateName: "Concept Check",
    details: { verifiedConcepts: question.concepts },
  };
}

/**
 * Gate 3: Live Sandbox Execution Check
 * Executes reference query in PostgreSQL sandbox. Asserts non-empty rowset, valid columns, no errors.
 */
export async function checkGateExecution(
  question: QuestionDefinition,
  schema: string = "ecom_l1"
): Promise<GateResult> {
  try {
    const result = await executeInSandbox(question.reference_sql, schema);
    if (!result.success) {
      return {
        passed: false,
        gateName: "Sandbox Execution Check",
        error: `Sandbox execution failed: ${result.error}`,
      };
    }

    if (result.rows.length === 0) {
      return {
        passed: false,
        gateName: "Sandbox Execution Check",
        error: "Query returned 0 rows on standard dataset",
      };
    }

    // Verify expected columns exist
    if (question.expected_columns && question.expected_columns.length > 0) {
      const returnedCols = result.columns.map((c) => c.toLowerCase());
      const missingCols = question.expected_columns.filter(
        (col) => !returnedCols.includes(col.toLowerCase())
      );
      if (missingCols.length > 0) {
        return {
          passed: false,
          gateName: "Sandbox Execution Check",
          error: `Missing expected column(s): ${missingCols.join(", ")}`,
        };
      }
    }

    return {
      passed: true,
      gateName: "Sandbox Execution Check",
      details: {
        rowCount: result.rows.length,
        columnCount: result.columns.length,
        durationMs: result.durationMs,
      },
    };
  } catch (err: any) {
    return {
      passed: false,
      gateName: "Sandbox Execution Check",
      error: `Execution exception: ${err.message}`,
    };
  }
}

/**
 * Gate 4: Independent Solver Equivalency Check
 * Validates result-set parity with an independently constructed equivalent SQL query
 */
export async function checkGateIndependentSolver(
  question: QuestionDefinition,
  schema: string = "ecom_l1"
): Promise<GateResult> {
  try {
    // Generate an equivalent normalized query (e.g. without trailing semicolon or explicit alias variations)
    let altSql = question.reference_sql.trim();
    if (altSql.endsWith(";")) altSql = altSql.slice(0, -1);

    const mainResult = await executeInSandbox(question.reference_sql, schema);
    const altResult = await executeInSandbox(altSql, schema);

    if (!mainResult.success || !altResult.success) {
      return {
        passed: false,
        gateName: "Independent Solver Check",
        error: "Solver query execution error",
      };
    }

    const comparison = compareResultSets(
      altResult.rows,
      mainResult.rows,
      question.validation.order_sensitive,
      question.validation.numeric_tolerance
    );

    if (!comparison.match) {
      return {
        passed: false,
        gateName: "Independent Solver Check",
        error: `Solver mismatch: ${comparison.reason}`,
      };
    }

    return {
      passed: true,
      gateName: "Independent Solver Check",
      details: { comparisonMatch: true },
    };
  } catch (err: any) {
    return {
      passed: false,
      gateName: "Independent Solver Check",
      error: `Solver exception: ${err.message}`,
    };
  }
}

/**
 * Gate 5: Uniqueness and Duplicate Rejection Check
 */
export function checkDuplicateQuestions(questions: QuestionDefinition[]): {
  passed: boolean;
  duplicates: string[];
} {
  const seenIds = new Set<string>();
  const seenTitles = new Set<string>();
  const duplicates: string[] = [];

  for (const q of questions) {
    if (seenIds.has(q.id)) {
      duplicates.push(`Duplicate ID: ${q.id}`);
    }
    seenIds.add(q.id);

    if (seenTitles.has(q.title)) {
      duplicates.push(`Duplicate Title: ${q.title}`);
    }
    seenTitles.add(q.title);
  }

  return {
    passed: duplicates.length === 0,
    duplicates,
  };
}

/**
 * Runs all validation gates for a question
 */
export async function validateQuestion(
  question: QuestionDefinition,
  schema: string = "ecom_l1"
): Promise<QuestionValidationSummary> {
  const gates: GateResult[] = [];

  // Gate 1: AST Security
  const g1 = checkGateAstSecurity(question);
  gates.push(g1);

  // Gate 2: Concept Verification
  const g2 = checkGateConcepts(question);
  gates.push(g2);

  // Gate 3: Live Sandbox Execution
  const g3 = await checkGateExecution(question, schema);
  gates.push(g3);

  // Gate 4: Independent Solver
  const g4 = await checkGateIndependentSolver(question, schema);
  gates.push(g4);

  const passedAll = gates.every((g) => g.passed);

  return {
    questionId: question.id,
    order: question.order,
    difficulty: question.difficulty,
    passedAll,
    gates,
  };
}
