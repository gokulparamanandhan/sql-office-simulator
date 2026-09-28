async function testHttpEndpoints() {
  console.log("Testing HTTP API Endpoints on http://localhost:3000...\n");

  // 1. Test Run API with valid query
  const runRes = await fetch("http://localhost:3000/api/questions/ecom-L1-001/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sql: "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Electronics' LIMIT 3;",
    }),
  });
  const runData = await runRes.json();
  console.log("1. /api/questions/:id/run (Valid SELECT):");
  console.log(`   Status: ${runRes.status}, Rows: ${runData.rowCount}, Columns: [${runData.columns.join(", ")}], Duration: ${runData.durationMs}ms`);

  // 2. Test Run API with Security Violation (DROP TABLE)
  const secRes = await fetch("http://localhost:3000/api/questions/ecom-L1-001/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sql: "DROP TABLE customers;" }),
  });
  const secData = await secRes.json();
  console.log("\n2. /api/questions/:id/run (DROP TABLE Security Check):");
  console.log(`   Blocked: ${Boolean(secData.error)}, Error: ${secData.error}`);

  // 3. Test Submit API with Correct Answer
  const submitRes = await fetch("http://localhost:3000/api/questions/ecom-L1-001/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sql: "SELECT p.name, p.price, p.stock_quantity FROM products p JOIN categories c ON p.category_id = c.id WHERE c.name = 'Electronics' ORDER BY p.name;",
    }),
  });
  const submitData = await submitRes.json();
  console.log("\n3. /api/questions/:id/submit (Grading Correct Answer):");
  console.log(`   isCorrect: ${submitData.isCorrect}, Code: ${submitData.code}, XP Earned: ${submitData.xpEarned}, Message: ${submitData.message}`);

  // 4. Test Submit API with Incomplete Query
  const wrongRes = await fetch("http://localhost:3000/api/questions/ecom-L1-001/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sql: "SELECT p.name FROM products p;",
    }),
  });
  const wrongData = await wrongRes.json();
  console.log("\n4. /api/questions/:id/submit (Grading Incorrect Answer):");
  console.log(`   isCorrect: ${wrongData.isCorrect}, Code: ${wrongData.code}, Message: ${wrongData.message}`);

  // 5. Test Question Detail Route (never exposes reference SQL)
  const qRes = await fetch("http://localhost:3000/api/questions/ecom-L1-001");
  const qData = await qRes.json();
  console.log("\n5. /api/questions/:id (Question Detail):");
  console.log(`   Title: ${qData.question.title}, Stakeholder: ${qData.question.stakeholder.name} (${qData.question.stakeholder.role})`);
  console.log(`   Has reference_sql leaked?: ${qData.question.reference_sql !== undefined}`);

  console.log("\n✅ All HTTP API tests completed successfully.");
}

testHttpEndpoints().catch(console.error);
