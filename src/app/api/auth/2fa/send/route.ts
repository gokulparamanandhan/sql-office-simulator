import { NextRequest, NextResponse } from "next/server";
import { createTwoFactorChallenge } from "@/lib/auth/two-factor-service";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, avatar } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required to dispatch verification code." },
        { status: 400 }
      );
    }

    const challenge = createTwoFactorChallenge(email, name, avatar);

    return NextResponse.json({
      success: true,
      requires2FA: true,
      email: challenge.email,
      codePreview: challenge.code,
      message: "Two-step security verification code generated.",
      expiresInSeconds: 600,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to initiate two-step verification.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
