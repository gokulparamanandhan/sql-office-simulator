import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/db/health-check";

export const dynamic = "force-dynamic";

export async function GET() {
  const health = await checkDatabaseHealth();
  const allConnected =
    health.appDb.status === "connected" && health.sandboxDb.status === "connected";

  return NextResponse.json(
    {
      status: allConnected ? "ok" : "degraded",
      databases: health,
      environment: process.env.NODE_ENV,
    },
    { status: allConnected ? 200 : 503 }
  );
}
