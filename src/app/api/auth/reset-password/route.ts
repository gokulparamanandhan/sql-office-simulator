import { NextRequest, NextResponse } from "next/server";
import { completePasswordReset, verifyResetToken } from "@/lib/auth/password-reset-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        { error: "Reset token and new password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const result = await completePasswordReset(token, password);

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to reset password." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      email: result.email,
      message: "Password reset successful! You may now sign in with your new password.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Password reset failed.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
