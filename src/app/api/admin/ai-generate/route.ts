import { NextResponse } from "next/server";
import { generateBlogWithAI } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { topic, category } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const generated = await generateBlogWithAI(topic, category || "Education");
    return NextResponse.json(generated);
  } catch (error: any) {
    console.error("AI Generate route error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate blog content" }, { status: 500 });
  }
}
