import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/auth/auth-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, honorPledgeAccepted } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required." },
        { status: 400 }
      );
    }

    if (!honorPledgeAccepted) {
      return NextResponse.json(
        { error: "You must accept the honor pledge to create an account." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const { user } = await registerUser({
      email,
      password,
      name,
      honorPledgeAccepted: Boolean(honorPledgeAccepted),
    });

    return NextResponse.json({
      success: true,
      user,
      message: "Account created successfully.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to register user.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
