import { NextRequest, NextResponse } from "next/server";
import { getDomainOfficeMetadata } from "@/lib/office/all-domains-metadata";
import { ECOM_L1_QUESTIONS } from "@/lib/content/ecom-l1-questions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const domain = req.nextUrl.searchParams.get("domain") || "ecommerce";
  const metadata = getDomainOfficeMetadata(domain, id);

  return NextResponse.json({
    levelId: id,
    domain,
    company: metadata.company,
    team: metadata.team,
    schema: metadata.schema,
    questionCount: ECOM_L1_QUESTIONS.length,
  });
}
