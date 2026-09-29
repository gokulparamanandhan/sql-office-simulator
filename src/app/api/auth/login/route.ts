import { NextRequest, NextResponse } from "next/server";
import { loginUser, createSessionToken, setSessionCookie } from "@/lib/auth/auth-service";
import {
  ADMIN_CREDENTIALS,
  createAdminToken,
  setAdminSessionCookie,
} from "@/lib/auth/admin-auth";
import { getAdmin2FAConfig } from "@/lib/auth/totp-service";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET ||
    "sql-office-simulator-super-secret-development-key-change-in-production-12345"
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email or username and password are required." },
        { status: 400 }
      );
    }

    const cleanInput = String(email).trim().toLowerCase();
    const cleanPass = String(password);

    // 1. Seamless Admin Login Support
    const matchesAdminUser =
      cleanInput === ADMIN_CREDENTIALS.username.toLowerCase() ||
      cleanInput === "admin" ||
      cleanInput === "admin@sqloffice.com";

    if (matchesAdminUser && cleanPass === ADMIN_CREDENTIALS.password) {
      const config2FA = getAdmin2FAConfig();
      if (config2FA.enabled) {
        // Issue challenge token for Google Authenticator 2FA step
        const challengeToken = await new SignJWT({
          username: cleanInput,
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
          isAdmin: true,
          message: "Google Authenticator 2FA required.",
        });
      }

      const adminUser = {
        id: "usr_admin",
        email: "admin@sqloffice.com",
        name: "System Administrator",
        role: "admin",
        honorPledgeAccepted: true,
        honorPledgeAcceptedAt: new Date().toISOString(),
      };

      const userToken = await createSessionToken(adminUser);
      await setSessionCookie(userToken);

      const adminToken = await createAdminToken(ADMIN_CREDENTIALS.username);
      await setAdminSessionCookie(adminToken);

      return NextResponse.json({
        success: true,
        user: adminUser,
        isAdmin: true,
        message: "Admin authenticated successfully.",
      });
    }

    // 2. Standard Learner Login
    const { user } = await loginUser({ email, password });

    return NextResponse.json({
      success: true,
      user,
      isAdmin: user.role === "admin",
      message: "Logged in successfully.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid email/username or password.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
