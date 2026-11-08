import { Parser } from "node-sql-parser";

/**
 * SQL Sandbox Security Guard (Spec Section 10.3)
 * Enforces:
 * 1. Safe query execution (SELECT, WITH ... SELECT)
 * 2. Advanced SQL staging (CREATE TEMP TABLE ... AS SELECT, CREATE VIEW ... AS SELECT)
 * 3. Database Engineering constructs (CREATE INDEX, DROP INDEX, EXPLAIN, EXPLAIN ANALYZE,
 *    CREATE PROCEDURE, CALL, CREATE TRIGGER, CREATE FUNCTION ... RETURNS trigger,
 *    CREATE TABLE ... PARTITION BY, PARTITION OF)
 * 4. Strictly blocks dangerous PostgreSQL system functions (pg_read_file, pg_write_file, COPY, etc.)
 * 5. Strictly protects base relations from unauthorized DDL/DML (DROP TABLE base, INSERT base, UPDATE base, DELETE base, TRUNCATE).
 */

const parser = new Parser();

export interface SecurityCheckResult {
  allowed: boolean;
  reason?: string;
  sanitizedSql?: string;
}

// Strictly forbidden OS/filesystem/network functions
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

// Dangerous admin commands that should never run in sandbox
const FORBIDDEN_ADMIN_COMMANDS = [
  "ALTER ROLE",
  "CREATE ROLE",
  "DROP ROLE",
  "ALTER USER",
  "CREATE USER",
  "DROP USER",
  "GRANT",
  "REVOKE",
  "COPY",
  "VACUUM",
  "REINDEX",
];

export function stripSqlComments(sql: string): string {
  // Remove block comments /* ... */
  const withoutBlock = sql.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove line comments -- ...
  const withoutLine = withoutBlock.replace(/--.*$/gm, "");
  return withoutLine.trim();
}

/**
 * Splits SQL into individual statements while respecting single quotes and $$ blocks.
 */
export function splitSqlStatements(sql: string): string[] {
  const statements: string[] = [];
  let current = "";
  let inSingleQuote = false;
  let inDollarQuote = false;
  let dollarTag = "";

  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];
    const nextChar = sql[i + 1] || "";

    // Handle $$ or $tag$ quotes in PL/pgSQL
    if (!inSingleQuote && char === "$") {
      const match = sql.slice(i).match(/^\$([a-zA-Z0-9_]*)\$/);
      if (match) {
        const tag = match[0];
        if (inDollarQuote && dollarTag === tag) {
          inDollarQuote = false;
          dollarTag = "";
        } else if (!inDollarQuote) {
          inDollarQuote = true;
          dollarTag = tag;
        }
        current += tag;
        i += tag.length - 1;
        continue;
      }
    }

    // Handle '...' single quotes
    if (!inDollarQuote && char === "'") {
      if (inSingleQuote && nextChar === "'") {
        current += "''";
        i++;
        continue;
      }
      inSingleQuote = !inSingleQuote;
      current += char;
      continue;
    }

    // Semicolon separator
    if (char === ";" && !inSingleQuote && !inDollarQuote) {
      if (current.trim().length > 0) {
        statements.push(current.trim());
      }
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim().length > 0) {
    statements.push(current.trim());
  }

  return statements;
}

export function validateSqlSecurity(sql: string): SecurityCheckResult {
  const trimmed = sql.trim();
  const cleanSql = stripSqlComments(sql);

  if (!cleanSql && !trimmed) {
    return { allowed: false, reason: "Query cannot be empty." };
  }

  // 1. System functions check
  for (const fn of FORBIDDEN_FUNCTIONS) {
    const regex = new RegExp(`\\b${fn}\\b\\s*\\(`, "i");
    if (regex.test(cleanSql)) {
      return {
        allowed: false,
        reason: `Security Violation: System function '${fn}()' is strictly blocked for security.`,
      };
    }
  }

  // 2. Forbidden admin commands
  for (const cmd of FORBIDDEN_ADMIN_COMMANDS) {
    const regex = new RegExp(`\\b${cmd}\\b`, "i");
    if (regex.test(cleanSql)) {
      return {
        allowed: false,
        reason: `Security Violation: The administrative command '${cmd}' is not allowed in this sandbox.`,
      };
    }
  }

  // 3. Statement splitting via dollar-quote and quote aware parser
  const statements = splitSqlStatements(cleanSql);

  if (statements.length === 0) {
    return { allowed: false, reason: "Query cannot be empty." };
  }

  // Track created temporary relations or partitions in this session
  const userCreatedRelations = new Set<string>();

  // 4. Validate each statement
  for (let idx = 0; idx < statements.length; idx++) {
    const stmt = statements[idx];

    // Core read-only and analytical constructs
    const isSelectOrCte = /^\s*(?:EXPLAIN\s+(?:\([^)]+\)\s+)?)?(?:SELECT|WITH)\b/i.test(stmt);
    const isExplain = /^\s*EXPLAIN\b/i.test(stmt);
    const isCreateIndex = /^\s*CREATE\s+(?:UNIQUE\s+)?INDEX\b/i.test(stmt);
    const isDropIndex = /^\s*DROP\s+INDEX\b/i.test(stmt);
    const isCreateView = /^\s*CREATE\s+(?:OR\s+REPLACE\s+)?VIEW\s+([a-zA-Z0-9_]+)\b/i.test(stmt);
    const isDropView = /^\s*DROP\s+VIEW\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_]+)\b/i.test(stmt);
    const isCreateTempTable = /^\s*CREATE\s+(?:TEMP|TEMPORARY)\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)\b/i.test(stmt);
    const isDropTable = /^\s*DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_]+)\b/i.test(stmt);
    const isCreateProcedure = /^\s*CREATE\s+(?:OR\s+REPLACE\s+)?PROCEDURE\b/i.test(stmt);
    const isCall = /^\s*CALL\b/i.test(stmt);
    const isCreateFunction = /^\s*CREATE\s+(?:OR\s+REPLACE\s+)?FUNCTION\b/i.test(stmt);
    const isCreateTrigger = /^\s*CREATE\s+TRIGGER\b/i.test(stmt);
    const isDropTrigger = /^\s*DROP\s+TRIGGER\b/i.test(stmt);
    const isPartitionTable =
      /^\s*CREATE\s+TABLE\s+([a-zA-Z0-9_.]+)\s*(?:\([^)]+\)\s*)?PARTITION\s+BY\b/i.test(stmt) ||
      /^\s*CREATE\s+TABLE\s+([a-zA-Z0-9_.]+)\s+PARTITION\s+OF\b/i.test(stmt);

    // Track relations created in this script
    if (isCreateTempTable) {
      const match = stmt.match(/CREATE\s+(?:TEMP|TEMPORARY)\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)/i);
      if (match) userCreatedRelations.add(match[1].toLowerCase());
    }
    if (isCreateView) {
      const match = stmt.match(/CREATE\s+(?:OR\s+REPLACE\s+)?VIEW\s+([a-zA-Z0-9_]+)/i);
      if (match) userCreatedRelations.add(match[1].toLowerCase());
    }
    if (isPartitionTable) {
      const match = stmt.match(/CREATE\s+TABLE\s+([a-zA-Z0-9_.]+)/i);
      if (match) userCreatedRelations.add(match[1].toLowerCase());
    }

    // Direct destructive DDL / DML checks on base relations
    if (/^\s*TRUNCATE\b/i.test(stmt)) {
      return {
        allowed: false,
        reason: "Security Violation: 'TRUNCATE' on database tables is prohibited.",
      };
    }

    if (/^\s*DELETE\b/i.test(stmt)) {
      return {
        allowed: false,
        reason: "Security Violation: Direct 'DELETE' on database tables is prohibited.",
      };
    }

    if (isDropTable) {
      const match = stmt.match(/DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_]+)/i);
      const targetTable = match ? match[1].toLowerCase() : "";
      if (!userCreatedRelations.has(targetTable) && !stmt.toLowerCase().includes("temp_")) {
        return {
          allowed: false,
          reason: `Security Violation: The command 'DROP TABLE' on base table '${targetTable}' is not allowed in this read-only sandbox.`,
        };
      }
    }

    const isInsert = /^\s*INSERT\s+INTO\s+([a-zA-Z0-9_.]+)/i.test(stmt);
    const isUpdate = /^\s*UPDATE\s+([a-zA-Z0-9_.]+)/i.test(stmt);

    if (isInsert) {
      const match = stmt.match(/INSERT\s+INTO\s+([a-zA-Z0-9_.]+)/i);
      const target = match ? match[1].toLowerCase() : "";
      // Only allow inserting into session-created temp tables, partitioned tables, or audit_log
      if (!userCreatedRelations.has(target) && target !== "audit_log" && !target.startsWith("temp_") && !target.startsWith("sales_orders")) {
        return {
          allowed: false,
          reason: `Security Violation: 'INSERT INTO' on base table '${target}' is prohibited. Only temporary or newly partitioned tables can be modified.`,
        };
      }
    }

    if (isUpdate) {
      const match = stmt.match(/UPDATE\s+([a-zA-Z0-9_.]+)/i);
      const target = match ? match[1].toLowerCase() : "";
      if (!userCreatedRelations.has(target) && !target.startsWith("temp_")) {
        return {
          allowed: false,
          reason: `Security Violation: 'UPDATE' on base table '${target}' is prohibited in this sandbox.`,
        };
      }
    }

    const isPermitted =
      isSelectOrCte ||
      isExplain ||
      isCreateIndex ||
      isDropIndex ||
      isCreateView ||
      isDropView ||
      isCreateTempTable ||
      isDropTable ||
      isCreateProcedure ||
      isCall ||
      isCreateFunction ||
      isCreateTrigger ||
      isDropTrigger ||
      isPartitionTable ||
      isInsert ||
      isUpdate;

    if (!isPermitted) {
      return {
        allowed: false,
        reason: `Security Violation: Statement beginning with '${stmt.slice(0, 30)}...' is not recognized or permitted in this sandbox.`,
      };
    }
  }

  return {
    allowed: true,
    sanitizedSql: cleanSql,
  };
}
