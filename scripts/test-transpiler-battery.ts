import { PGlite } from "@electric-sql/pglite";

// We'll import or implement the transpiler here to test it thoroughly
export function transpileDialectToPg(sql: string, dialect: string = "PostgreSQL"): string {
  if (!sql) return "";

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

  const isMySql = !dialect || dialect.toLowerCase().includes("mysql");
  const isMssql = !dialect || dialect.toLowerCase().includes("mssql") || dialect.toLowerCase().includes("t-sql");
  const isOracle = !dialect || dialect.toLowerCase().includes("oracle");
  const isAllOrAuto = !dialect || (!isMySql && !isMssql && !isOracle);

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

  // Helper to replace function calls from inside out
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

      // Process last match first (innermost/rightmost)
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
    // Process SELECT TOP N from last to first
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
      // Replace SELECT TOP N with SELECT [DISTINCT]
      const beforeTop = masked.slice(0, tm.index);
      const afterTop = masked.slice(tm.index + tm.fullLength);
      const newSelect = `SELECT ${tm.distinct}`;

      // Now find where this query ends (before ;) or closing paren of subquery or union)
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

      // Check if LIMIT already present in queryBody
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
    // Check for ROWNUM <= N or ROWNUM < N or ROWNUM = 1 in WHERE clause
    const rownumRegex = /(?:(\bAND\s+)?\bROWNUM\s*(<=|=|<)\s*(\d+)(\s+AND\b)?|(\bWHERE\s+)\bROWNUM\s*(<=|=|<)\s*(\d+))/gi;
    let match: RegExpExecArray | null;
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

    // Replace FROM DUAL
    masked = masked.replace(/\bFROM\s+DUAL\b/gi, "FROM dual");
  }

  // 7. Conditional Functions: IF(...) (MySQL), IIF(...) (MSSQL), NVL2(...) (Oracle), DECODE(...) (Oracle)
  if (isMySql || isAllOrAuto) {
    masked = replaceFuncCalls(masked, "IF", (args) => {
      if (args.length === 3) {
        return `CASE WHEN ${args[0]} THEN ${args[1]} ELSE ${args[2]} END`;
      }
      return null;
    });
  }

  if (isMssql || isAllOrAuto) {
    masked = replaceFuncCalls(masked, "IIF", (args) => {
      if (args.length === 3) {
        return `CASE WHEN ${args[0]} THEN ${args[1]} ELSE ${args[2]} END`;
      }
      return null;
    });
  }

  if (isOracle || isAllOrAuto) {
    masked = replaceFuncCalls(masked, "NVL2", (args) => {
      if (args.length === 3) {
        return `CASE WHEN (${args[0]}) IS NOT NULL THEN ${args[1]} ELSE ${args[2]} END`;
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

  // 10. String Functions: LEN -> LENGTH, UCASE -> UPPER, LCASE -> LOWER, MID -> SUBSTR, INSTR, CHARINDEX
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

  // Oracle ADD_MONTHS
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

  // 13. Year / Month / Day extraction
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

async function runBattery() {
  const pg = new PGlite();
  await pg.exec(`
    CREATE OR REPLACE VIEW dual AS SELECT 1 AS dummy;

    CREATE TABLE products (
      id INT PRIMARY KEY,
      name VARCHAR(100),
      category VARCHAR(50),
      price NUMERIC,
      stock INT,
      created_at TIMESTAMP
    );

    INSERT INTO products VALUES
      (1, 'Alpha Laptop', 'Electronics', 1200, 10, '2025-01-10 10:00:00'),
      (2, 'Beta Mouse', 'Electronics', 25, 100, '2025-01-15 11:00:00'),
      (3, 'Gamma Chair', 'Furniture', 150, 0, '2025-02-01 12:00:00'),
      (4, 'Delta Desk', 'Furniture', 350, 5, '2025-02-10 14:00:00'),
      (5, 'Epsilon Monitor', 'Electronics', 300, 20, '2025-03-01 09:00:00');
  `);

  const tests = [
    // MySQL tests
    {
      name: "MySQL Backticks and LIMIT offset, count",
      dialect: "MySQL",
      sql: "SELECT `id`, `name`, `price` FROM `products` ORDER BY `id` LIMIT 1, 2;",
      check: (rows: any[]) => rows.length === 2 && rows[0].id === 2,
    },
    {
      name: "MySQL IF() Conditional",
      dialect: "MySQL",
      sql: "SELECT name, IF(price > 100, 'Expensive', 'Cheap') AS tier FROM products ORDER BY id LIMIT 2;",
      check: (rows: any[]) => rows[0].tier === "Expensive" && rows[1].tier === "Cheap",
    },
    {
      name: "MySQL GROUP_CONCAT with SEPARATOR",
      dialect: "MySQL",
      sql: "SELECT GROUP_CONCAT(name SEPARATOR ', ') AS names FROM products WHERE category = 'Furniture';",
      check: (rows: any[]) => rows[0].names === "Gamma Chair, Delta Desk",
    },
    {
      name: "MySQL DATE_ADD and DATEDIFF",
      dialect: "MySQL",
      sql: "SELECT name, DATEDIFF(DATE_ADD(created_at, INTERVAL 7 DAY), created_at) AS diff_days FROM products LIMIT 1;",
      check: (rows: any[]) => Number(rows[0].diff_days) === 7,
    },
    {
      name: "MySQL YEAR() and MONTH()",
      dialect: "MySQL",
      sql: "SELECT YEAR(created_at) AS yr, MONTH(created_at) AS mo FROM products ORDER BY id LIMIT 1;",
      check: (rows: any[]) => rows[0].yr === 2025 && rows[0].mo === 1,
    },

    // MSSQL tests
    {
      name: "MSSQL SELECT TOP N",
      dialect: "MSSQL",
      sql: "SELECT TOP 3 name, price FROM products ORDER BY price DESC;",
      check: (rows: any[]) => rows.length === 3 && rows[0].name === "Alpha Laptop",
    },
    {
      name: "MSSQL Square Brackets",
      dialect: "MSSQL",
      sql: "SELECT [name], [price] FROM [products] WHERE [category] = 'Furniture' ORDER BY [id];",
      check: (rows: any[]) => rows.length === 2 && rows[0].name === "Gamma Chair",
    },
    {
      name: "MSSQL IIF and LEN and ISNULL",
      dialect: "MSSQL",
      sql: "SELECT [name], IIF(LEN([name]) > 10, 'Long', 'Short') AS len_label, ISNULL([price], 0) AS safe_p FROM [products] ORDER BY [id] LIMIT 1;",
      check: (rows: any[]) => rows[0].len_label === "Long" && Number(rows[0].safe_p) === 1200,
    },
    {
      name: "MSSQL DATEADD and DATEDIFF (3-arg)",
      dialect: "MSSQL",
      sql: "SELECT DATEDIFF(day, created_at, DATEADD(day, 10, created_at)) AS diff_days FROM products LIMIT 1;",
      check: (rows: any[]) => Number(rows[0].diff_days) === 10,
    },
    {
      name: "MSSQL CHARINDEX",
      dialect: "MSSQL",
      sql: "SELECT CHARINDEX('Chair', name) AS pos FROM products WHERE name LIKE '%Chair%';",
      check: (rows: any[]) => Number(rows[0].pos) === 7,
    },

    // Oracle tests
    {
      name: "Oracle FROM DUAL and SYSDATE",
      dialect: "Oracle",
      sql: "SELECT 42 AS answer FROM DUAL;",
      check: (rows: any[]) => Number(rows[0].answer) === 42,
    },
    {
      name: "Oracle WHERE ROWNUM <= N",
      dialect: "Oracle",
      sql: "SELECT name, price FROM products WHERE ROWNUM <= 2;",
      check: (rows: any[]) => rows.length === 2,
    },
    {
      name: "Oracle NVL and NVL2",
      dialect: "Oracle",
      sql: "SELECT name, NVL(price, 0) AS p, NVL2(stock, 'Has Stock', 'No Stock') AS st FROM products ORDER BY id LIMIT 1;",
      check: (rows: any[]) => Number(rows[0].p) === 1200 && rows[0].st === "Has Stock",
    },
    {
      name: "Oracle DECODE",
      dialect: "Oracle",
      sql: "SELECT name, DECODE(category, 'Electronics', 'Tech', 'Furniture', 'Home', 'Misc') AS cat_label FROM products ORDER BY id LIMIT 2;",
      check: (rows: any[]) => rows[0].cat_label === "Tech",
    },
    {
      name: "Oracle ADD_MONTHS and TRUNC",
      dialect: "Oracle",
      sql: "SELECT ADD_MONTHS(created_at, 2) AS future_dt, TRUNC(created_at, 'MM') AS month_start FROM products ORDER BY id LIMIT 1;",
      check: (rows: any[]) => rows[0].future_dt !== undefined && rows[0].month_start !== undefined,
    },
    {
      name: "MySQL Nested IF() Calls",
      dialect: "MySQL",
      sql: "SELECT name, IF(price > 500, 'Ultra', IF(price > 50, 'Mid', 'Low')) AS tier FROM products ORDER BY id LIMIT 2;",
      check: (rows: any[]) => rows[0].tier === "Ultra" && rows[1].tier === "Low",
    },
    {
      name: "MSSQL Subquery with TOP N",
      dialect: "MSSQL",
      sql: "SELECT * FROM (SELECT TOP 2 id, name FROM products ORDER BY price DESC) sub ORDER BY id;",
      check: (rows: any[]) => rows.length === 2 && rows[0].id === 1 && rows[1].id === 4,
    },
    {
      name: "MSSQL CTE with TOP N",
      dialect: "MSSQL",
      sql: "WITH TopProd AS (SELECT TOP 2 id, name FROM products ORDER BY price DESC) SELECT * FROM TopProd ORDER BY id;",
      check: (rows: any[]) => rows.length === 2 && rows[0].id === 1 && rows[1].id === 4,
    },
    {
      name: "Oracle ROWNUM in SELECT list",
      dialect: "Oracle",
      sql: "SELECT ROWNUM AS row_id, name FROM products ORDER BY id LIMIT 3;",
      check: (rows: any[]) => rows.length === 3 && Number(rows[0].row_id) === 1,
    },
    {
      name: "Oracle Filter with AND ROWNUM <= N",
      dialect: "Oracle",
      sql: "SELECT name FROM products WHERE category = 'Electronics' AND ROWNUM <= 2;",
      check: (rows: any[]) => rows.length === 2,
    },
    {
      name: "MySQL REGEXP and NOT REGEXP",
      dialect: "MySQL",
      sql: "SELECT name FROM products WHERE name REGEXP '^Alpha' AND name NOT REGEXP 'Chair';",
      check: (rows: any[]) => rows.length === 1 && rows[0].name === "Alpha Laptop",
    },
    {
      name: "String Literal with Escaped Quotes Preserved",
      dialect: "MySQL",
      sql: "SELECT 'It''s TOP 5' AS note, name FROM products WHERE name = 'Alpha Laptop';",
      check: (rows: any[]) => rows.length === 1 && rows[0].note === "It's TOP 5",
    },
  ];

  let passed = 0;
  for (const t of tests) {
    const transpiled = transpileDialectToPg(t.sql, t.dialect);
    try {
      const res = await pg.query(transpiled);
      const ok = t.check(res.rows);
      if (ok) {
        console.log(`[PASS] ${t.name}`);
        passed++;
      } else {
        console.error(`[FAIL - Check returned false] ${t.name}`, res.rows);
      }
    } catch (err: any) {
      console.error(`[FAIL - Error] ${t.name}: ${err.message}`);
      console.error(`Original SQL:   ${t.sql}`);
      console.error(`Transpiled SQL: ${transpiled}`);
    }
  }

  console.log(`\nBATTERY RESULT: ${passed} / ${tests.length} tests passed.`);
  await pg.close();
  if (passed !== tests.length) process.exit(1);
}

runBattery().catch((err) => {
  console.error("Battery execution error:", err);
  process.exit(1);
});
