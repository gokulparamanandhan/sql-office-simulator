/**
 * Universal Multi-Dialect SQL Transpiler (MySQL, MSSQL, Oracle -> PostgreSQL 16+)
 * 
 * Supports:
 * - MySQL: Backticks, LIMIT offset, count, IF(), IFNULL(), GROUP_CONCAT(), DATE_ADD(), DATE_SUB(),
 *          DATEDIFF(2-arg), YEAR(), MONTH(), DAY(), HOUR(), MINUTE(), SECOND(), QUARTER(), WEEK(),
 *          REGEXP, RLIKE, UCASE(), LCASE(), MID(), INSTR(), CURDATE(), CURTIME(), NOW()
 * - MSSQL (T-SQL): SELECT TOP N, SELECT TOP (N), Square bracket quoting [col], ISNULL(), LEN(),
 *                  IIF(), DATEADD(), DATEDIFF(3-arg), DATEPART(), CHARINDEX(), GETDATE(), GETUTCDATE()
 * - Oracle SQL: FROM DUAL, ROWNUM filtering (WHERE/AND ROWNUM <= N, = 1), ROWNUM projection,
 *               NVL(), NVL2(), DECODE(), ADD_MONTHS(), MONTHS_BETWEEN(), TRUNC(), SYSDATE, SYSTIMESTAMP, INSTR()
 */

export function transpileDialectToPg(sql: string, dialect: string = "PostgreSQL"): string {
  if (!sql || typeof sql !== "string") return sql;

  // 1. Mask string literals, dollar quotes, and comments to prevent accidental replacements
  const literals: string[] = [];
  let masked = sql;

  // Mask dollar-quoted strings: $$...$$ or $tag$...$tag$
  masked = masked.replace(/\$([a-zA-Z0-9_]*)\$[\s\S]*?\$\1\$/g, (match) => {
    const placeholder = `___SQL_LITERAL_${literals.length}___`;
    literals.push(match);
    return placeholder;
  });

  // Mask block comments: /* ... */
  masked = masked.replace(/\/\*[\s\S]*?\*\//g, (match) => {
    const placeholder = `___SQL_LITERAL_${literals.length}___`;
    literals.push(match);
    return placeholder;
  });

  // Mask line comments: -- ...
  masked = masked.replace(/--.*$/gm, (match) => {
    const placeholder = `___SQL_LITERAL_${literals.length}___`;
    literals.push(match);
    return placeholder;
  });

  // Mask single-quoted string literals: '...' with '' escaping
  masked = masked.replace(/'(?:[^']|'')*'/g, (match) => {
    const placeholder = `___SQL_LITERAL_${literals.length}___`;
    literals.push(match);
    return placeholder;
  });

  const normalizedDialect = (dialect || "").toLowerCase();
  const isMySql = normalizedDialect.includes("mysql");
  const isMssql = normalizedDialect.includes("mssql") || normalizedDialect.includes("t-sql");
  const isOracle = normalizedDialect.includes("oracle");
  // If dialect is "PostgreSQL" or unspecified, apply universal safe transformations
  const isAllOrAuto = !isMySql && !isMssql && !isOracle;

  // Helper for parsing balanced function arguments
  function parseBalancedArgs(str: string, openIndex: number): { args: string[]; endIndex: number } | null {
    let depth = 1;
    let currentArg = "";
    const args: string[] = [];

    for (let i = openIndex + 1; i < str.length; i++) {
      const char = str[i];
      if (char === "(") {
        depth++;
        currentArg += char;
      } else if (char === ")") {
        depth--;
        if (depth === 0) {
          args.push(currentArg.trim());
          return { args, endIndex: i };
        }
        currentArg += char;
      } else if (char === "," && depth === 1) {
        args.push(currentArg.trim());
        currentArg = "";
      } else {
        currentArg += char;
      }
    }
    return null;
  }

  // Helper to replace function calls from inside out (handles arbitrary nesting)
  function replaceFuncCalls(
    input: string,
    funcName: string,
    replacer: (args: string[]) => string | null
  ): string {
    let out = input;
    const regex = new RegExp(`\\b${funcName}\\s*\\(`, "gi");

    let match: RegExpExecArray | null;
    let found = true;
    let iterations = 0;
    while (found && iterations < 50) {
      iterations++;
      found = false;
      regex.lastIndex = 0;
      const matches: { index: number; openParen: number }[] = [];
      while ((match = regex.exec(out)) !== null) {
        matches.push({ index: match.index, openParen: match.index + match[0].length - 1 });
      }

      // Process last match first (innermost / rightmost)
      for (let i = matches.length - 1; i >= 0; i--) {
        const { index, openParen } = matches[i];
        const parsed = parseBalancedArgs(out, openParen);
        if (parsed) {
          const replacement = replacer(parsed.args);
          if (replacement !== null) {
            out = out.slice(0, index) + replacement + out.slice(parsed.endIndex + 1);
            found = true;
            break;
          }
        }
      }
    }
    return out;
  }

  // 2. MySQL Identifier Quoting: `column` -> "column"
  if (isMySql || isAllOrAuto) {
    masked = masked.replace(/`([a-zA-Z0-9_]+)`/g, '"$1"');
  }

  // 3. MSSQL Identifier Quoting: [column] -> "column"
  if (isMssql || isAllOrAuto) {
    masked = masked.replace(/\[([a-zA-Z_][a-zA-Z0-9_ ]*)\]/g, '"$1"');
  }

  // 4. MSSQL SELECT TOP N [PERCENT]
  if (isMssql || isAllOrAuto) {
    const topRegex = /\bSELECT\s+(DISTINCT\s+)?TOP\s*\(?\s*(\d+)\s*\)?(?:\s+WITH\s+TIES)?\s*/gi;
    let match: RegExpExecArray | null;
    const topMatches: { index: number; fullLength: number; distinct: string; limit: string }[] = [];
    while ((match = topRegex.exec(masked)) !== null) {
      topMatches.push({
        index: match.index,
        fullLength: match[0].length,
        distinct: match[1] || "",
        limit: match[2],
      });
    }

    for (let i = topMatches.length - 1; i >= 0; i--) {
      const tm = topMatches[i];
      const beforeTop = masked.slice(0, tm.index);
      const afterTop = masked.slice(tm.index + tm.fullLength);
      const newSelect = `SELECT ${tm.distinct}`;

      // Find query boundary (before ;, closing paren of subquery, or union/intersect/except)
      let boundary = afterTop.length;
      let depth = 0;
      for (let j = 0; j < afterTop.length; j++) {
        const c = afterTop[j];
        if (c === "(") depth++;
        else if (c === ")") {
          if (depth === 0) {
            boundary = j;
            break;
          }
          depth--;
        } else if (c === ";" && depth === 0) {
          boundary = j;
          break;
        } else if (depth === 0) {
          const rest = afterTop.slice(j);
          if (/^\s*\b(UNION|INTERSECT|EXCEPT)\b/i.test(rest)) {
            boundary = j;
            break;
          }
        }
      }

      const queryBody = afterTop.slice(0, boundary);
      const restOfSql = afterTop.slice(boundary);

      if (!/\bLIMIT\s+\d+\b/i.test(queryBody)) {
        masked = beforeTop + newSelect + queryBody + ` LIMIT ${tm.limit}` + restOfSql;
      } else {
        masked = beforeTop + newSelect + queryBody + restOfSql;
      }
    }
  }

  // 5. MySQL LIMIT offset, count -> LIMIT count OFFSET offset
  if (isMySql || isAllOrAuto) {
    masked = masked.replace(/\bLIMIT\s+(\d+)\s*,\s*(\d+)\b/gi, "LIMIT $2 OFFSET $1");
  }

  // 6. Oracle ROWNUM in WHERE clauses -> LIMIT N
  if (isOracle || isAllOrAuto) {
    let limitVal: number | null = null;

    masked = masked.replace(
      /(?:\bWHERE\s+ROWNUM\s*(<=|=|<)\s*(\d+)\s+AND\b)/gi,
      (_m, op, num) => {
        const raw = parseInt(num, 10);
        limitVal = op === "<" ? Math.max(1, raw - 1) : raw;
        return "WHERE ";
      }
    );

    masked = masked.replace(
      /(?:\bAND\s+ROWNUM\s*(<=|=|<)\s*(\d+)\b)/gi,
      (_m, op, num) => {
        const raw = parseInt(num, 10);
        limitVal = op === "<" ? Math.max(1, raw - 1) : raw;
        return "";
      }
    );

    masked = masked.replace(
      /(?:\bWHERE\s+ROWNUM\s*(<=|=|<)\s*(\d+)\b)/gi,
      (_m, op, num) => {
        const raw = parseInt(num, 10);
        limitVal = op === "<" ? Math.max(1, raw - 1) : raw;
        return "";
      }
    );

    if (limitVal !== null && !/\bLIMIT\s+\d+\b/i.test(masked)) {
      masked = masked.replace(/;?\s*$/, ` LIMIT ${limitVal};`).replace(/;;$/, ";");
    }

    // Replace ROWNUM in SELECT expressions: ROWNUM -> (ROW_NUMBER() OVER ())
    masked = masked.replace(/\bROWNUM\b(?!\s*[<=><])/gi, "(ROW_NUMBER() OVER ())");

    // Normalize FROM DUAL to FROM dual
    masked = masked.replace(/\bFROM\s+DUAL\b/gi, "FROM dual");
  }

  // 7. Conditional Functions: IF(...) (MySQL), IIF(...) (MSSQL), NVL2(...) (Oracle), DECODE(...) (Oracle)
  if (isMySql || isAllOrAuto) {
    masked = replaceFuncCalls(masked, "IF", (args) => {
      if (args.length === 3) {
        return `CASE WHEN (${args[0]}) THEN (${args[1]}) ELSE (${args[2]}) END`;
      }
      return null;
    });
  }

  if (isMssql || isAllOrAuto) {
    masked = replaceFuncCalls(masked, "IIF", (args) => {
      if (args.length === 3) {
        return `CASE WHEN (${args[0]}) THEN (${args[1]}) ELSE (${args[2]}) END`;
      }
      return null;
    });
  }

  if (isOracle || isAllOrAuto) {
    masked = replaceFuncCalls(masked, "NVL2", (args) => {
      if (args.length === 3) {
        return `CASE WHEN (${args[0]}) IS NOT NULL THEN (${args[1]}) ELSE (${args[2]}) END`;
      }
      return null;
    });

    masked = replaceFuncCalls(masked, "DECODE", (args) => {
      if (args.length < 3) return null;
      const expr = args[0];
      const hasDefault = args.length % 2 === 0;
      const defaultVal = hasDefault ? args[args.length - 1] : "NULL";
      const pairsCount = Math.floor((args.length - 1) / 2);

      let caseStmt = `CASE (${expr})`;
      for (let p = 0; p < pairsCount; p++) {
        const search = args[1 + p * 2];
        const result = args[2 + p * 2];
        caseStmt += ` WHEN ${search} THEN ${result}`;
      }
      caseStmt += ` ELSE ${defaultVal} END`;
      return caseStmt;
    });
  }

  // 8. MySQL GROUP_CONCAT(...) -> STRING_AGG(...)
  if (isMySql || isAllOrAuto) {
    masked = replaceFuncCalls(masked, "GROUP_CONCAT", (args) => {
      const inner = args.join(", ");
      let distinct = "";
      let separator = "','";
      let orderBy = "";
      let expr = inner;

      // Extract SEPARATOR
      const sepMatch = expr.match(/\bSEPARATOR\s+((?:'[\s\S]*?'|"[\s\S]*?"|___SQL_LITERAL_\d+___))/i);
      if (sepMatch) {
        separator = sepMatch[1];
        expr = expr.replace(sepMatch[0], "");
      }

      // Extract ORDER BY
      const orderMatch = expr.match(/\bORDER\s+BY\s+[\s\S]*?$/i);
      if (orderMatch) {
        orderBy = ` ${orderMatch[0]}`;
        expr = expr.replace(orderMatch[0], "");
      }

      // Extract DISTINCT
      if (/^\s*DISTINCT\b/i.test(expr)) {
        distinct = "DISTINCT ";
        expr = expr.replace(/^\s*DISTINCT\b/i, "");
      }

      return `STRING_AGG(${distinct}(${expr.trim()})::text, ${separator}${orderBy})`;
    });
  }

  // 9. Null Functions: IFNULL, ISNULL, NVL -> COALESCE
  masked = masked.replace(/\b(?:IFNULL|ISNULL|NVL)\s*\(/gi, "COALESCE(");

  // 10. String Functions: LEN -> LENGTH, UCASE -> UPPER, LCASE -> LOWER, MID -> SUBSTR
  masked = masked.replace(/\bLEN\s*\(/gi, "LENGTH(");
  masked = masked.replace(/\bUCASE\s*\(/gi, "UPPER(");
  masked = masked.replace(/\bLCASE\s*\(/gi, "LOWER(");
  masked = masked.replace(/\bMID\s*\(/gi, "SUBSTR(");

  // INSTR(str, substr) -> STRPOS(str, substr)
  if (isMySql || isOracle || isAllOrAuto) {
    masked = replaceFuncCalls(masked, "INSTR", (args) => {
      if (args.length === 2) {
        return `STRPOS(${args[0]}, ${args[1]})`;
      }
      return null;
    });
  }

  // CHARINDEX(substr, str [, start]) -> STRPOS(str, substr)
  if (isMssql || isAllOrAuto) {
    masked = replaceFuncCalls(masked, "CHARINDEX", (args) => {
      if (args.length === 2) {
        return `STRPOS(${args[1]}, ${args[0]})`;
      }
      if (args.length === 3) {
        return `(CASE WHEN STRPOS(SUBSTRING(${args[1]} FROM (${args[2]})::integer), ${args[0]}) > 0 THEN STRPOS(SUBSTRING(${args[1]} FROM (${args[2]})::integer), ${args[0]}) + (${args[2]})::integer - 1 ELSE 0 END)`;
      }
      return null;
    });
  }

  // 11. Regex Operators (MySQL): REGEXP / RLIKE -> ~
  if (isMySql || isAllOrAuto) {
    masked = masked.replace(/\bNOT\s+(?:REGEXP|RLIKE)\b/gi, "!~");
    masked = masked.replace(/\b(?:REGEXP|RLIKE)\b/gi, "~");
  }

  // 12. Date Add / Sub / Diff
  // MSSQL DATEADD(part, num, dt)
  if (isMssql || isAllOrAuto) {
    masked = replaceFuncCalls(masked, "DATEADD", (args) => {
      if (args.length === 3) {
        let part = args[0].toLowerCase().replace(/['"]/g, "");
        if (["year", "yy", "yyyy"].includes(part)) part = "year";
        else if (["quarter", "qq", "q"].includes(part)) part = "quarter";
        else if (["month", "mm", "m"].includes(part)) part = "month";
        else if (["day", "dd", "d", "dayofyear", "dy", "y"].includes(part)) part = "day";
        else if (["week", "wk", "ww"].includes(part)) part = "week";
        else if (["hour", "hh"].includes(part)) part = "hour";
        else if (["minute", "mi", "n"].includes(part)) part = "minute";
        else if (["second", "ss", "s"].includes(part)) part = "second";
        return `((${args[2]})::timestamp + ((${args[1]})::numeric * INTERVAL '1 ${part}'))`;
      }
      return null;
    });
  }

  // MySQL DATE_ADD / DATE_SUB
  if (isMySql || isAllOrAuto) {
    masked = masked.replace(
      /\bDATE_ADD\s*\(\s*([\s\S]*?),\s*INTERVAL\s+([\s\S]*?)\s+([a-zA-Z]+)\s*\)/gi,
      "(($1)::timestamp + (($2)::numeric * INTERVAL '1 $3'))"
    );
    masked = masked.replace(
      /\bDATE_SUB\s*\(\s*([\s\S]*?),\s*INTERVAL\s+([\s\S]*?)\s+([a-zA-Z]+)\s*\)/gi,
      "(($1)::timestamp - (($2)::numeric * INTERVAL '1 $3'))"
    );
  }

  // DATEDIFF (MySQL 2-args or MSSQL 3-args)
  masked = replaceFuncCalls(masked, "DATEDIFF", (args) => {
    if (args.length === 2) {
      // MySQL: DATEDIFF(d1, d2) => d1 - d2 in days
      return `((${args[0]})::date - (${args[1]})::date)`;
    }
    if (args.length === 3) {
      // MSSQL: DATEDIFF(part, start, end)
      let part = args[0].toLowerCase().replace(/['"]/g, "");
      const start = args[1];
      const end = args[2];
      if (["day", "dd", "d"].includes(part)) {
        return `((${end})::date - (${start})::date)`;
      }
      if (["year", "yy", "yyyy"].includes(part)) {
        return `CAST(EXTRACT(YEAR FROM (${end})) - EXTRACT(YEAR FROM (${start})) AS INTEGER)`;
      }
      if (["month", "mm", "m"].includes(part)) {
        return `CAST((EXTRACT(YEAR FROM (${end})) - EXTRACT(YEAR FROM (${start}))) * 12 + EXTRACT(MONTH FROM (${end})) - EXTRACT(MONTH FROM (${start})) AS INTEGER)`;
      }
      if (["hour", "hh"].includes(part)) {
        return `CAST(FLOOR(EXTRACT(EPOCH FROM ((${end})::timestamp - (${start})::timestamp)) / 3600) AS INTEGER)`;
      }
      if (["minute", "mi", "n"].includes(part)) {
        return `CAST(FLOOR(EXTRACT(EPOCH FROM ((${end})::timestamp - (${start})::timestamp)) / 60) AS INTEGER)`;
      }
      if (["second", "ss", "s"].includes(part)) {
        return `CAST(FLOOR(EXTRACT(EPOCH FROM ((${end})::timestamp - (${start})::timestamp))) AS INTEGER)`;
      }
      return `((${end})::date - (${start})::date)`;
    }
    return null;
  });

  // DATEPART (MSSQL)
  if (isMssql || isAllOrAuto) {
    masked = replaceFuncCalls(masked, "DATEPART", (args) => {
      if (args.length === 2) {
        let part = args[0].toLowerCase().replace(/['"]/g, "");
        const dt = args[1];
        if (["year", "yy", "yyyy"].includes(part)) part = "YEAR";
        else if (["quarter", "qq", "q"].includes(part)) part = "QUARTER";
        else if (["month", "mm", "m"].includes(part)) part = "MONTH";
        else if (["day", "dd", "d"].includes(part)) part = "DAY";
        else if (["hour", "hh"].includes(part)) part = "HOUR";
        else if (["minute", "mi", "n"].includes(part)) part = "MINUTE";
        else if (["second", "ss", "s"].includes(part)) part = "SECOND";
        else if (["week", "wk", "ww"].includes(part)) part = "WEEK";
        return `CAST(EXTRACT(${part} FROM (${dt})) AS INTEGER)`;
      }
      return null;
    });
  }

  // Oracle ADD_MONTHS / MONTHS_BETWEEN / TRUNC
  if (isOracle || isAllOrAuto) {
    masked = replaceFuncCalls(masked, "ADD_MONTHS", (args) => {
      if (args.length === 2) {
        return `((${args[0]})::timestamp + ((${args[1]})::numeric * INTERVAL '1 month'))`;
      }
      return null;
    });

    masked = replaceFuncCalls(masked, "MONTHS_BETWEEN", (args) => {
      if (args.length === 2) {
        return `CAST((EXTRACT(YEAR FROM (${args[0]})) - EXTRACT(YEAR FROM (${args[1]}))) * 12 + EXTRACT(MONTH FROM (${args[0]})) - EXTRACT(MONTH FROM (${args[1]})) AS NUMERIC)`;
      }
      return null;
    });

    masked = replaceFuncCalls(masked, "TRUNC", (args) => {
      if (args.length === 1) {
        return `DATE_TRUNC('day', (${args[0]})::timestamp)`;
      }
      if (args.length === 2) {
        const fmt = args[1].toUpperCase();
        if (fmt.includes("Y")) return `DATE_TRUNC('year', (${args[0]})::timestamp)`;
        if (fmt.includes("M")) return `DATE_TRUNC('month', (${args[0]})::timestamp)`;
        if (fmt.includes("D")) return `DATE_TRUNC('day', (${args[0]})::timestamp)`;
        if (fmt.includes("Q")) return `DATE_TRUNC('quarter', (${args[0]})::timestamp)`;
        if (fmt.includes("H")) return `DATE_TRUNC('hour', (${args[0]})::timestamp)`;
        return `DATE_TRUNC('day', (${args[0]})::timestamp)`;
      }
      return null;
    });
  }

  // 13. Year / Month / Day extraction functions
  masked = masked.replace(/\bYEAR\s*\(([\s\S]*?)\)/gi, "CAST(EXTRACT(YEAR FROM ($1)) AS INTEGER)");
  masked = masked.replace(/\bMONTH\s*\(([\s\S]*?)\)/gi, "CAST(EXTRACT(MONTH FROM ($1)) AS INTEGER)");
  masked = masked.replace(/\bDAY\s*\(([\s\S]*?)\)/gi, "CAST(EXTRACT(DAY FROM ($1)) AS INTEGER)");
  masked = masked.replace(/\bDAYOFMONTH\s*\(([\s\S]*?)\)/gi, "CAST(EXTRACT(DAY FROM ($1)) AS INTEGER)");
  masked = masked.replace(/\bHOUR\s*\(([\s\S]*?)\)/gi, "CAST(EXTRACT(HOUR FROM ($1)) AS INTEGER)");
  masked = masked.replace(/\bMINUTE\s*\(([\s\S]*?)\)/gi, "CAST(EXTRACT(MINUTE FROM ($1)) AS INTEGER)");
  masked = masked.replace(/\bSECOND\s*\(([\s\S]*?)\)/gi, "CAST(EXTRACT(SECOND FROM ($1)) AS INTEGER)");
  masked = masked.replace(/\bQUARTER\s*\(([\s\S]*?)\)/gi, "CAST(EXTRACT(QUARTER FROM ($1)) AS INTEGER)");
  masked = masked.replace(/\bWEEK\s*\(([\s\S]*?)\)/gi, "CAST(EXTRACT(WEEK FROM ($1)) AS INTEGER)");

  // 14. Current date / timestamps
  masked = masked.replace(/\bGETDATE\s*\(\s*\)/gi, "CURRENT_TIMESTAMP");
  masked = masked.replace(/\bGETUTCDATE\s*\(\s*\)/gi, "(CURRENT_TIMESTAMP AT TIME ZONE 'UTC')");
  masked = masked.replace(/\bSYSDATETIME\s*\(\s*\)/gi, "CURRENT_TIMESTAMP");
  masked = masked.replace(/\bSYSDATE\s*\(\s*\)/gi, "CURRENT_TIMESTAMP");
  masked = masked.replace(/\bSYSDATE\b(?!\s*\()/gi, "CURRENT_TIMESTAMP");
  masked = masked.replace(/\bSYSTIMESTAMP\b/gi, "CURRENT_TIMESTAMP");
  masked = masked.replace(/\bCURDATE\s*\(\s*\)/gi, "CURRENT_DATE");
  masked = masked.replace(/\bCURTIME\s*\(\s*\)/gi, "CURRENT_TIME");

  // 15. Restore string literals and comments
  for (let i = 0; i < literals.length; i++) {
    masked = masked.replace(`___SQL_LITERAL_${i}___`, literals[i]);
  }

  return masked;
}

/**
 * SQL statements to seed PGlite with compatibility polyfill functions and views.
 * Ensures functions like YEAR(), MONTH(), LEN(), UCASE(), DATEDIFF(), INSTR() and FROM DUAL
 * execute smoothly even if raw SQL is evaluated directly.
 */
export const DIALECT_POLYFILL_SQL = `
CREATE OR REPLACE VIEW dual AS SELECT 1 AS dummy;

CREATE OR REPLACE FUNCTION len(text) RETURNS integer AS $$
  SELECT LENGTH($1);
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION ucase(text) RETURNS text AS $$
  SELECT UPPER($1);
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION lcase(text) RETURNS text AS $$
  SELECT LOWER($1);
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION getdate() RETURNS timestamp AS $$
  SELECT CURRENT_TIMESTAMP::timestamp;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION getutcdate() RETURNS timestamp AS $$
  SELECT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')::timestamp;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION curdate() RETURNS date AS $$
  SELECT CURRENT_DATE;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION curtime() RETURNS time AS $$
  SELECT CURRENT_TIME;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION year(timestamp) RETURNS integer AS $$
  SELECT EXTRACT(YEAR FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION year(date) RETURNS integer AS $$
  SELECT EXTRACT(YEAR FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION month(timestamp) RETURNS integer AS $$
  SELECT EXTRACT(MONTH FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION month(date) RETURNS integer AS $$
  SELECT EXTRACT(MONTH FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION day(timestamp) RETURNS integer AS $$
  SELECT EXTRACT(DAY FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION day(date) RETURNS integer AS $$
  SELECT EXTRACT(DAY FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION dayofmonth(timestamp) RETURNS integer AS $$
  SELECT EXTRACT(DAY FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION dayofmonth(date) RETURNS integer AS $$
  SELECT EXTRACT(DAY FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION hour(timestamp) RETURNS integer AS $$
  SELECT EXTRACT(HOUR FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION minute(timestamp) RETURNS integer AS $$
  SELECT EXTRACT(MINUTE FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION second(timestamp) RETURNS integer AS $$
  SELECT EXTRACT(SECOND FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION quarter(timestamp) RETURNS integer AS $$
  SELECT EXTRACT(QUARTER FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION quarter(date) RETURNS integer AS $$
  SELECT EXTRACT(QUARTER FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION week(timestamp) RETURNS integer AS $$
  SELECT EXTRACT(WEEK FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION week(date) RETURNS integer AS $$
  SELECT EXTRACT(WEEK FROM $1)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION instr(text, text) RETURNS integer AS $$
  SELECT STRPOS($1, $2);
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION charindex(text, text) RETURNS integer AS $$
  SELECT STRPOS($2, $1);
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION charindex(text, text, integer) RETURNS integer AS $$
  SELECT CASE 
    WHEN $3 <= 0 THEN 0
    WHEN STRPOS(SUBSTRING($2 FROM $3), $1) > 0 THEN STRPOS(SUBSTRING($2 FROM $3), $1) + $3 - 1
    ELSE 0
  END;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION datediff(text, timestamp, timestamp) RETURNS integer AS $$
  SELECT CASE LOWER($1)
    WHEN 'year' THEN (EXTRACT(YEAR FROM $3) - EXTRACT(YEAR FROM $2))::integer
    WHEN 'yy' THEN (EXTRACT(YEAR FROM $3) - EXTRACT(YEAR FROM $2))::integer
    WHEN 'yyyy' THEN (EXTRACT(YEAR FROM $3) - EXTRACT(YEAR FROM $2))::integer
    WHEN 'month' THEN (((EXTRACT(YEAR FROM $3) - EXTRACT(YEAR FROM $2)) * 12) + (EXTRACT(MONTH FROM $3) - EXTRACT(MONTH FROM $2)))::integer
    WHEN 'mm' THEN (((EXTRACT(YEAR FROM $3) - EXTRACT(YEAR FROM $2)) * 12) + (EXTRACT(MONTH FROM $3) - EXTRACT(MONTH FROM $2)))::integer
    WHEN 'm' THEN (((EXTRACT(YEAR FROM $3) - EXTRACT(YEAR FROM $2)) * 12) + (EXTRACT(MONTH FROM $3) - EXTRACT(MONTH FROM $2)))::integer
    WHEN 'day' THEN ($3::date - $2::date)::integer
    WHEN 'dd' THEN ($3::date - $2::date)::integer
    WHEN 'd' THEN ($3::date - $2::date)::integer
    WHEN 'hour' THEN FLOOR(EXTRACT(EPOCH FROM ($3 - $2)) / 3600)::integer
    WHEN 'hh' THEN FLOOR(EXTRACT(EPOCH FROM ($3 - $2)) / 3600)::integer
    WHEN 'minute' THEN FLOOR(EXTRACT(EPOCH FROM ($3 - $2)) / 60)::integer
    WHEN 'mi' THEN FLOOR(EXTRACT(EPOCH FROM ($3 - $2)) / 60)::integer
    WHEN 'n' THEN FLOOR(EXTRACT(EPOCH FROM ($3 - $2)) / 60)::integer
    WHEN 'second' THEN FLOOR(EXTRACT(EPOCH FROM ($3 - $2)))::integer
    WHEN 'ss' THEN FLOOR(EXTRACT(EPOCH FROM ($3 - $2)))::integer
    WHEN 's' THEN FLOOR(EXTRACT(EPOCH FROM ($3 - $2)))::integer
    WHEN 'week' THEN FLOOR(($3::date - $2::date) / 7.0)::integer
    WHEN 'wk' THEN FLOOR(($3::date - $2::date) / 7.0)::integer
    WHEN 'ww' THEN FLOOR(($3::date - $2::date) / 7.0)::integer
    ELSE ($3::date - $2::date)::integer
  END;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION datediff(timestamp, timestamp) RETURNS integer AS $$
  SELECT ($1::date - $2::date)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION datediff(date, date) RETURNS integer AS $$
  SELECT ($1 - $2)::integer;
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION add_months(timestamp, numeric) RETURNS timestamp AS $$
  SELECT $1 + ($2 * INTERVAL '1 month');
$$ LANGUAGE sql IMMUTABLE;

CREATE OR REPLACE FUNCTION add_months(date, numeric) RETURNS date AS $$
  SELECT ($1 + ($2 * INTERVAL '1 month'))::date;
$$ LANGUAGE sql IMMUTABLE;
`;
