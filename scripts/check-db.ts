import { checkDatabaseHealth } from "../src/lib/db/health-check";

async function main() {
  console.log("\n=======================================================");
  console.log(" 🔍 SQL Office Simulator - Database Connectivity Check ");
  console.log("=======================================================\n");

  const health = await checkDatabaseHealth();

  console.log("1. App Database (Prisma / PostgreSQL port 5432):");
  if (health.appDb.status === "connected") {
    console.log(`   ✅ Connected (${health.appDb.latencyMs}ms) - ${health.appDb.version}`);
  } else {
    console.log(`   ❌ Disconnected: ${health.appDb.error}`);
  }

  console.log("\n2. Sandbox Database (Pool / PostgreSQL port 5433):");
  if (health.sandboxDb.status === "connected") {
    console.log(`   ✅ Connected (${health.sandboxDb.latencyMs}ms) - ${health.sandboxDb.version}`);
  } else {
    console.log(`   ❌ Disconnected: ${health.sandboxDb.error}`);
  }

  console.log("\n=======================================================\n");
  process.exit(health.appDb.status === "connected" && health.sandboxDb.status === "connected" ? 0 : 1);
}

main().catch((err) => {
  console.error("Health check error:", err);
  process.exit(1);
});
