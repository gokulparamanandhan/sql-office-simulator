import { appDb } from "./app-db";
import { sandboxPool, sandboxAdminPool } from "./sandbox-db";

export interface DatabaseStatus {
  status: "connected" | "disconnected";
  latencyMs?: number;
  error?: string;
  version?: string;
}

export interface HealthCheckResult {
  appDb: DatabaseStatus;
  sandboxDb: DatabaseStatus;
  timestamp: string;
}

export async function checkDatabaseHealth(): Promise<HealthCheckResult> {
  const result: HealthCheckResult = {
    appDb: { status: "disconnected" },
    sandboxDb: { status: "disconnected" },
    timestamp: new Date().toISOString(),
  };

  // Test App DB
  try {
    const t0 = Date.now();
    const rows = await appDb.$queryRaw<Array<{ version: string }>>`SELECT version();`;
    result.appDb = {
      status: "connected",
      latencyMs: Date.now() - t0,
      version: rows[0]?.version?.split(" ")?.slice(0, 2)?.join(" ") || "PostgreSQL",
    };
  } catch (err: unknown) {
    result.appDb = {
      status: "disconnected",
      error: err instanceof Error ? err.message : String(err),
    };
  }

  // Test Sandbox DB (Read-Only Pool)
  try {
    const t0 = Date.now();
    const res = await sandboxPool.query("SELECT version();");
    result.sandboxDb = {
      status: "connected",
      latencyMs: Date.now() - t0,
      version: res.rows[0]?.version?.split(" ")?.slice(0, 2)?.join(" ") || "PostgreSQL",
    };
  } catch (err: unknown) {
    result.sandboxDb = {
      status: "disconnected",
      error: err instanceof Error ? err.message : String(err),
    };
  }

  return result;
}
