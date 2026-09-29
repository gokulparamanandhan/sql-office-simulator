import { NextRequest, NextResponse } from "next/server";
import { getUserSecurityQuestion } from "@/lib/auth/security-questions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email address is required." }, { status: 400 });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const result = await getUserSecurityQuestion(cleanEmail);

    if (!result.found) {
      return NextResponse.json(
        { error: "No account found with this email address. Please check your spelling or sign up." },
        { status: 404 }
      );
    }

    if (!result.hasSecurityQuestion || !result.question) {
      return NextResponse.json(
        {
          error:
            "This account does not have a security question configured. Please log in with your credentials or contact an administrator.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      email: cleanEmail,
      question: result.question,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch security question.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
