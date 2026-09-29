import { NextRequest, NextResponse } from "next/server";
import { verifyTwoFactorCode } from "@/lib/auth/two-factor-service";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: "Both email and 6-digit verification code are required." },
        { status: 400 }
      );
    }

    const result = await verifyTwoFactorCode(email, code);

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error || "Verification failed.",
          attemptsRemaining: result.attemptsRemaining,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: result.user,
      message: "Two-step identity verification successful. Access granted.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification evaluation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
