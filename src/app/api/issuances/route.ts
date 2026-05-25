import { NextResponse } from "next/server";
import { IssuanceService } from "@/services/issuance.service";

/**
 * Backend API for Issuances
 * GET /api/issuances - List all memoranda/advisories
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const type = searchParams.get("type") || undefined;

    const data = await IssuanceService.getAll({ category, type });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch issuances" },
      { status: 500 }
    );
  }
}
