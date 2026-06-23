import { NextResponse } from "next/server";
import { searchImages } from "@/lib/pexels";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    const images = await searchImages(query);
    return NextResponse.json(images);
  } catch (error: any) {
    console.error("Image search route error:", error);
    return NextResponse.json({ error: error.message || "Failed to search images" }, { status: 500 });
  }
}
