import { NextRequest, NextResponse } from "next/server";
import { isCurrentAdmin, ADMIN_CREDENTIALS } from "@/lib/auth/admin-auth";
import { getAdmin2FAConfig, saveAdmin2FAConfig } from "@/lib/auth/totp-service";

export async function POST(req: NextRequest) {
  const isAdmin = await isCurrentAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { enabled, password } = body;

    // Require admin password to disable 2FA
    if (enabled === false && password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json({ error: "Incorrect admin password." }, { status: 400 });
    }

    const config = getAdmin2FAConfig();
    config.enabled = Boolean(enabled);
    saveAdmin2FAConfig(config);

    return NextResponse.json({
      success: true,
      enabled: config.enabled,
      message: config.enabled ? "2FA enabled." : "2FA disabled.",
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Failed to update 2FA configuration." }, { status: 500 });
  }
}
