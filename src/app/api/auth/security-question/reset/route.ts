import { NextRequest, NextResponse } from "next/server";
import { resetPasswordWithSecurityAnswer } from "@/lib/auth/security-questions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, answer, newPassword } = body;

    if (!email || !answer || !newPassword) {
      return NextResponse.json(
        { error: "Email, security answer, and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanAnswer = String(answer).trim();

    const result = await resetPasswordWithSecurityAnswer({
      email: cleanEmail,
      answer: cleanAnswer,
      newPassword,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Password reset failed." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Password updated successfully. You can now sign in with your new password.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to reset password.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
