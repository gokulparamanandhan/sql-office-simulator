import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/lib/auth/auth-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const { user } = await loginUser({ email, password });

    return NextResponse.json({
      success: true,
      user,
      message: "Logged in successfully.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid email or password.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
