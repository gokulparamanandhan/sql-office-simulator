import { NextRequest, NextResponse } from "next/server";
import { handleGoogleOAuth } from "@/lib/auth/auth-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, avatar } = body;

    const userEmail = email || "learner.alex@gmail.com";
    const userName = name || "Alex Vance";
    const userAvatar = avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";

    const { user } = await handleGoogleOAuth({
      email: userEmail,
      name: userName,
      avatar: userAvatar,
    });

    return NextResponse.json({
      success: true,
      user,
      message: "Signed in with Google successfully.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Google OAuth sign in failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
