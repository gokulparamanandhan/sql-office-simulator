import { Parser } from "node-sql-parser";

/**
 * SQL Sandbox Security Guard (Spec Section 10.3)
 * Enforces:
 * 1. Exactly one statement
 * 2. Only SELECT or WITH ... SELECT allowed
 * 3. Prohibits DDL (DROP, CREATE, ALTER, TRUNCATE)
 * 4. Prohibits DML (INSERT, UPDATE, DELETE)
 * 5. Prohibits dangerous PostgreSQL system functions (pg_read_file, pg_write_file, COPY, etc.)
 */

const parser = new Parser();

export interface SecurityCheckResult {
  allowed: boolean;
  reason?: string;
  sanitizedSql?: string;
}

const FORBIDDEN_KEYWORDS = [
  "DROP",
  "DELETE",
  "INSERT",
  "UPDATE",
  "ALTER",
  "CREATE",
  "TRUNCATE",
  "GRANT",
  "REVOKE",
  "COPY",
  "EXECUTE",
  "VACUUM",
  "REINDEX",
  "SET",
  "RESET",
  "LOCK",
  "CALL",
  "DO",
  "EXPLAIN ANALYZE",
];

const FORBIDDEN_FUNCTIONS = [
  "pg_read_file",
  "pg_read_binary_file",
  "pg_write_file",
  "pg_ls_dir",
  "pg_stat_file",
  "dblink",
  "dblink_exec",
  "lo_export",
  "lo_import",
  "lo_unlink",
  "pg_sleep",
  "system",
  "sh",
  "eval",
  "query_to_xml",
];

export function stripSqlComments(sql: string): string {
  // Remove block comments /* ... */
  const withoutBlock = sql.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove line comments -- ...
  const withoutLine = withoutBlock.replace(/--.*$/gm, "");
  return withoutLine.trim();
}

export function validateSqlSecurity(sql: string): SecurityCheckResult {
  const trimmed = sql.trim();
  const cleanSql = stripSqlComments(sql);

  if (!cleanSql && !trimmed) {
    return { allowed: false, reason: "Query cannot be empty." };
  }

  // 1. Check for multiple statements via semicolons
  // Strip trailing semicolon first
  const withoutTrailingSemicolon = cleanSql.replace(/;\s*$/, "");
  if (withoutTrailingSemicolon.includes(";")) {
    return {
      allowed: false,
      reason: "Security Violation: Multiple statements are not permitted. Please submit a single SELECT query.",
    };
  }

  // 2. Keyword regex check for high-risk commands (case-insensitive word boundary)
  for (const kw of FORBIDDEN_KEYWORDS) {
    const regex = new RegExp(`\\b${kw}\\b`, "i");
    if (regex.test(cleanSql)) {
      return {
        allowed: false,
        reason: `Security Violation: The command '${kw}' is not allowed in this read-only sandbox. Only SELECT queries are permitted.`,
      };
    }
  }

  // 3. System functions check
  for (const fn of FORBIDDEN_FUNCTIONS) {
    const regex = new RegExp(`\\b${fn}\\b\\s*\\(`, "i");
    if (regex.test(cleanSql)) {
      return {
        allowed: false,
        reason: `Security Violation: System function '${fn}()' is strictly blocked for security.`,
      };
    }
  }

  // 4. Must start with SELECT or WITH
  const startsWithAllowed = /^\s*(SELECT|WITH)\b/i.test(cleanSql);
  if (!startsWithAllowed) {
    return {
      allowed: false,
      reason: "Only SELECT or CTE (WITH ... SELECT) queries are accepted.",
    };
  }

  // 5. AST validation via node-sql-parser
  try {
    const ast = parser.astify(withoutTrailingSemicolon, { database: "PostgresQL" });
    const statements = Array.isArray(ast) ? ast : [ast];

    if (statements.length !== 1) {
      return {
        allowed: false,
        reason: "Security Violation: Expected a single query statement.",
      };
    }

    const type = statements[0]?.type?.toUpperCase();
    if (type !== "SELECT") {
      return {
        allowed: false,
        reason: `Security Violation: Statement type '${type}' is prohibited. Only SELECT is permitted.`,
      };
    }
  } catch (err: unknown) {
    // If parser threw on exotic PG syntax or comments, fallback gracefully if cleanSql starts with SELECT/WITH
    const message = err instanceof Error ? err.message : String(err);
    if (!startsWithAllowed) {
      return {
        allowed: false,
        reason: `SQL Syntax or Security issue: ${message}`,
      };
    }
  }

  return {
    allowed: true,
    sanitizedSql: trimmed.replace(/;\s*$/, ""),
  };
}
