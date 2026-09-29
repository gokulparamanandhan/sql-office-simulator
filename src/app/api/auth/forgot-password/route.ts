import { NextRequest, NextResponse } from "next/server";
import { userExists, createPasswordResetRequest } from "@/lib/auth/password-reset-service";
import { sendPasswordResetEmail } from "@/lib/email/email-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email address is required." }, { status: 400 });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const exists = await userExists(cleanEmail);

    // If account exists, generate token and dispatch email securely
    if (exists) {
      const { token } = await createPasswordResetRequest(cleanEmail);

      // Determine application base URL
      const host = req.headers.get("host") || "localhost:3000";
      const protocol = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
      const resetUrl = `${protocol}://${host}/auth/reset-password?token=${token}`;

      // Dispatches actual email (or logs to server terminal if SMTP credentials are not yet configured)
      await sendPasswordResetEmail({
        to: cleanEmail,
        resetUrl,
        expiresInMinutes: 60,
      });
    }

    // Always return a generic success response to prevent email enumeration and completely block account hijacking
    return NextResponse.json({
      success: true,
      message:
        "If an account exists with that email address, password reset instructions have been sent to your inbox.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to process password reset.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

