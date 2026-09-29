import { NextRequest, NextResponse } from "next/server";
import { handleGoogleOAuth } from "@/lib/auth/auth-service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");
  const origin = req.nextUrl.origin;

  if (error || !code) {
    return NextResponse.redirect(`${origin}/auth/login?error=Google authentication was cancelled.`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${origin}/api/auth/google/callback`;

  try {
    // 1. Exchange code for access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId || "",
        client_secret: clientSecret || "",
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      throw new Error(tokenData.error_description || "Failed to exchange token with Google.");
    }

    // 2. Fetch user profile from Google UserInfo endpoint
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await profileRes.json();
    if (!profileRes.ok || !profile.email) {
      throw new Error("Failed to retrieve user profile from Google.");
    }

    // 3. Persist user into database & set session cookie
    await handleGoogleOAuth({
      email: profile.email,
      name: profile.name || profile.email.split("@")[0],
      avatar: profile.picture,
    });

    return NextResponse.redirect(`${origin}/dashboard`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Google authentication failed.";
    return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(msg)}`);
  }
}
