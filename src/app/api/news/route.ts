import { NextResponse } from "next/server";
import { NewsService } from "@/services/news.service";

/**
 * Backend API for News
 * GET /api/news - List all news
 */
export async function GET() {
  try {
    const news = await NewsService.getAll();
    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
