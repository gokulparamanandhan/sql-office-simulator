import { NextRequest, NextResponse } from "next/server";
import {
  isCurrentAdmin,
  createAdminToken,
  setAdminSessionCookie,
  ADMIN_CREDENTIALS,
} from "@/lib/auth/admin-auth";
import {
  getAdmin2FAConfig,
  saveAdmin2FAConfig,
  verifyTotpCode,
  verifyAdminBackupCode,
} from "@/lib/auth/totp-service";
import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET ||
    "sql-office-simulator-super-secret-development-key-change-in-production-12345"
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, challengeToken, enableSetup } = body;

    if (!code) {
      return NextResponse.json({ error: "Verification code is required." }, { status: 400 });
    }

    const rawClean = String(code).trim();
    const digitsOnly = rawClean.replace(/\s|-/g, "");
    const config = getAdmin2FAConfig();

    // Check if code is a 6-digit TOTP code (tolerant of +-60s drift) OR an emergency backup code
    const isTotpMatch = digitsOnly.length === 6 && verifyTotpCode(config.secret, digitsOnly, 2);
    const isBackupMatch = !isTotpMatch && verifyAdminBackupCode(rawClean);

    if (!isTotpMatch && !isBackupMatch) {
      return NextResponse.json(
        { error: "Invalid authenticator code. Please check your Google Authenticator app or backup code." },
        { status: 400 }
      );
    }

    // CASE 1: Confirming and enabling 2FA setup in Admin Console
    if (enableSetup) {
      const isAdmin = await isCurrentAdmin();
      if (!isAdmin) {
        return NextResponse.json({ error: "Admin session required to enable 2FA." }, { status: 401 });
      }

      config.enabled = true;
      config.lastVerifiedAt = new Date().toISOString();
      saveAdmin2FAConfig(config);

      return NextResponse.json({
        success: true,
        message: "Google Authenticator 2FA enabled successfully!",
        backupCodes: config.backupCodes,
      });
    }

    // CASE 2: Verifying during Admin Login flow
    if (challengeToken) {
      try {
        const { payload } = await jwtVerify(challengeToken, JWT_SECRET);
        if (payload.type !== "admin_2fa_challenge") {
          throw new Error("Invalid challenge token");
        }
      } catch {
        return NextResponse.json({ error: "Session expired. Please log in again." }, { status: 401 });
      }

      // Successful 2FA verification! Issue official Admin session cookie
      const adminToken = await createAdminToken(ADMIN_CREDENTIALS.username);
      await setAdminSessionCookie(adminToken);

      return NextResponse.json({
        success: true,
        message: "Two-factor authentication successful.",
        method: isBackupMatch ? "backup_code" : "totp",
      });
    }

    return NextResponse.json({ error: "Invalid verification request." }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
