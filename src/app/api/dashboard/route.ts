import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth-service";
import { getLearnerDashboard } from "@/lib/domains/domains-service";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dashboardData = await getLearnerDashboard(user.id);

  return NextResponse.json({
    user,
    ...dashboardData,
  });
}
