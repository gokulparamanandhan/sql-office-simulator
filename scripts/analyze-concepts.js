const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../src/lib/content');
const files = fs.readdirSync(dir).filter(f => f.endsWith('-questions.ts') && !f.includes('multi'));

const sqlPatternsByLevel = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {} };

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const levelMatch = f.match(/l(\d)/i);
  if (!levelMatch) continue;
  const lvl = parseInt(levelMatch[1]);
  
  const regex = /reference_sql["']?\s*:\s*["'`]([\s\S]*?)["'`]\s*,/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const sql = match[1].toLowerCase();
    if (sql.includes('with ') || sql.includes('with\n')) sqlPatternsByLevel[lvl]['cte'] = (sqlPatternsByLevel[lvl]['cte'] || 0) + 1;
    if (sql.includes('union')) sqlPatternsByLevel[lvl]['union'] = (sqlPatternsByLevel[lvl]['union'] || 0) + 1;
    if (sql.includes('lag(')) sqlPatternsByLevel[lvl]['lag'] = (sqlPatternsByLevel[lvl]['lag'] || 0) + 1;
    if (sql.includes('lead(')) sqlPatternsByLevel[lvl]['lead'] = (sqlPatternsByLevel[lvl]['lead'] || 0) + 1;
    if (sql.includes('(select')) sqlPatternsByLevel[lvl]['subquery'] = (sqlPatternsByLevel[lvl]['subquery'] || 0) + 1;
    if (sql.includes('view')) sqlPatternsByLevel[lvl]['view'] = (sqlPatternsByLevel[lvl]['view'] || 0) + 1;
    if (sql.includes('temp') || sql.includes('create table')) sqlPatternsByLevel[lvl]['temp_ctas'] = (sqlPatternsByLevel[lvl]['temp_ctas'] || 0) + 1;
    if (sql.includes('group by')) sqlPatternsByLevel[lvl]['group_by'] = (sqlPatternsByLevel[lvl]['group_by'] || 0) + 1;
    if (sql.includes('join')) sqlPatternsByLevel[lvl]['join'] = (sqlPatternsByLevel[lvl]['join'] || 0) + 1;
  }
}

console.log('SQL Pattern counts by Level across all domain files:');
console.log(JSON.stringify(sqlPatternsByLevel, null, 2));

