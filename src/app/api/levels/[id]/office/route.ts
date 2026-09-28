import { NextRequest, NextResponse } from "next/server";
import { ECOM_L1_OFFICE_METADATA } from "@/lib/office/office-metadata";
import { ECOM_L1_QUESTIONS } from "@/lib/content/ecom-l1-questions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Returns office simulation context for Level 1
  return NextResponse.json({
    levelId: id,
    company: ECOM_L1_OFFICE_METADATA.company,
    team: ECOM_L1_OFFICE_METADATA.team,
    schema: ECOM_L1_OFFICE_METADATA.schema,
    questionCount: ECOM_L1_QUESTIONS.length,
  });
}
