import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_CREDENTIALS,
  createAdminToken,
  setAdminSessionCookie,
} from "@/lib/auth/admin-auth";
import { appDb } from "@/lib/db/app-db";
import { verifyPassword } from "@/lib/auth/auth-service";
import { getAdmin2FAConfig } from "@/lib/auth/totp-service";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET ||
    "sql-office-simulator-super-secret-development-key-change-in-production-12345"
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    const cleanUsername = String(username).trim();
    const cleanPassword = String(password);

    // 1. Check primary environment / default admin credentials
    const matchesEnvAdmin =
      cleanUsername.toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase() &&
      cleanPassword === ADMIN_CREDENTIALS.password;

    let isAuthorized = matchesEnvAdmin;

    // 2. Fallback: check database for admin role user if applicable
    if (!isAuthorized) {
      try {
        const dbUser = await appDb.user.findFirst({
          where: {
            OR: [
              { email: cleanUsername.toLowerCase() },
              { name: cleanUsername },
            ],
            role: "admin",
          },
        });

        if (dbUser && dbUser.passwordHash) {
          const passMatch = await verifyPassword(cleanPassword, dbUser.passwordHash);
          if (passMatch) {
            isAuthorized = true;
          }
        }
      } catch {
        // DB lookup failure fallback
      }
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Invalid administrative credentials." },
        { status: 401 }
      );
    }

    // 3. Check if 2FA (Google Authenticator) is enabled for Admin
    const config2FA = getAdmin2FAConfig();
    if (config2FA.enabled) {
      // Issue temporary challenge token for Step 2 (Google Authenticator code)
      const challengeToken = await new SignJWT({
        username: cleanUsername,
        type: "admin_2fa_challenge",
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("5m")
        .sign(JWT_SECRET);

      return NextResponse.json({
        success: true,
        requires2FA: true,
        challengeToken,
        message: "Google Authenticator 2FA required.",
      });
    }

    // Generate secure admin token and set HTTP-only cookie directly if 2FA not enabled
    const token = await createAdminToken(cleanUsername);
    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      requires2FA: false,
      message: "Admin authentication successful.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Authentication error.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
