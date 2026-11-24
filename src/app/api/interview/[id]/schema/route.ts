import { NextRequest, NextResponse } from "next/server";
import { getInterviewSchemaPreview } from "@/lib/interview/interview-engine";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const includeExpected = req.nextUrl.searchParams.get("includeExpected") === "1";
    const result = await getInterviewSchemaPreview(id, includeExpected);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, tables: [], error: message }, { status: 500 });
  }
}
