import { NextResponse } from "next/server";
import { generateBlogWithAI } from "@/lib/gemini";
import { enrichBlogWithExternalLinks } from "@/lib/external-links";

export async function POST(req: Request) {
  try {
    const { topic, category } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const generated = await generateBlogWithAI(topic, category || "Education");

    // Enrich generated blog with external links from partner sitemaps
    try {
      generated.content = await enrichBlogWithExternalLinks(generated.content, topic);
      console.log(`🔗 External links injected for manually generated blog: "${topic}"`);
    } catch (err: any) {
      console.error('⚠️ External link enrichment failed (continuing without):', err.message);
    }

    return NextResponse.json(generated);
  } catch (error: any) {
    console.error("AI Generate route error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate blog content" }, { status: 500 });
  }
}
