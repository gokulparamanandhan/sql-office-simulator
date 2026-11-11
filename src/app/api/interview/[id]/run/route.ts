import { NextRequest, NextResponse } from "next/server";
import { runInterviewQuery } from "@/lib/interview/interview-engine";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { sql } = body;

    if (!sql || typeof sql !== "string") {
      return NextResponse.json(
        { error: "SQL query string is required." },
        { status: 400 }
      );
    }

    const result = await runInterviewQuery(id, sql);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

