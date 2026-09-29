import { NextRequest, NextResponse } from "next/server";
import { createTwoFactorChallenge, verifyTwoFactorCode } from "@/lib/auth/two-factor-service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const origin = req.nextUrl.origin;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${origin}/api/auth/google/callback`;

  // If real Google OAuth Client ID is configured, redirect to Google OAuth 2.0 Consent Screen
  if (clientId && clientId !== "your-google-client-id.apps.googleusercontent.com") {
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleAuthUrl.searchParams.set("client_id", clientId);
    googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
    googleAuthUrl.searchParams.set("response_type", "code");
    googleAuthUrl.searchParams.set("scope", "openid email profile");
    googleAuthUrl.searchParams.set("prompt", "select_account");
    googleAuthUrl.searchParams.set("access_type", "offline");
    return NextResponse.redirect(googleAuthUrl.toString());
  }

  // Otherwise return status indicating manual input modal or setup
  return NextResponse.json({
    configured: false,
    message: "Google OAuth credentials not configured in environment. Using direct Google account input.",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, avatar, code } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    // Step 2: If 6-digit OTP code is provided, verify it and establish authenticated session
    if (code) {
      const verifyResult = await verifyTwoFactorCode(email, code);
      if (!verifyResult.success) {
        return NextResponse.json(
          {
            error: verifyResult.error || "Invalid verification code.",
            attemptsRemaining: verifyResult.attemptsRemaining,
          },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        user: verifyResult.user,
        message: "Identity verified successfully. Two-step verification complete.",
      });
    }

    // Step 1: Generate Two-Factor Challenge for this Google user
    const challenge = createTwoFactorChallenge(email, name, avatar);

    return NextResponse.json({
      success: true,
      requires2FA: true,
      email: challenge.email,
      name: challenge.name,
      codePreview: challenge.code,
      message: "Two-step security verification code generated.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Google OAuth authentication failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
