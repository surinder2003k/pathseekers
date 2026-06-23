import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateBlogWithAI } from "@/lib/gemini";
import { searchImages } from "@/lib/pexels";

const TOPIC_SUGGESTIONS: Record<string, string[]> = {
  "Education": [
    "Fostering Critical Thinking in CBSE Primary Classes",
    "Why Foundations Matter: Reading & Math in Classes I-III",
    "Integrating Mindfulness and Yoga in Daily Class Routines",
    "Parent Partnership: Guiding Academic Success at Home"
  ],
  "School Events": [
    "Under the Spotlight: Visual & Performing Arts Celebrations",
    "Green Pathseekers: Replanting Saplings Across Beas Punjab",
    "Highlights of the Zonal Science and STEM Exhibitions 2026",
    "Inside the DEAR Initiative: Fostering Silent Reading Habits"
  ],
  "Achievements": [
    "Triumphant Boards: How Pathseekers Maintains 100% CBSE Pass Rate",
    "Regional Chess Gold: Spotlighting our Junior Competitors",
    "Olympiad Victories: Pathseekers Secures State Math Ranks",
    "Placement Report: Students Placed at India's Top Universities"
  ],
  "News": [
    "Inauguration of new Robotic & IoT Labs in Senior Secondary Wings",
    "Pathseekers Awarded Best Holistic School in District Summit",
    "New Smartboards Enriched with Interactive Pedagogies Installed",
    "Security Upgrades: Implementing Smart Gate Access Protocols"
  ]
};

export async function GET(req: Request) {
  return handleAutoPublish(req);
}

export async function POST(req: Request) {
  return handleAutoPublish(req);
}

async function handleAutoPublish(req: Request) {
  try {
    const url = new URL(req.url);
    const force = url.searchParams.get("force") === "true";

    // 1. Fetch singleton settings
    const settings = await db.syncSettings.findFirst();

    if (!force && (!settings || !settings.autoPublish)) {
      await db.editorialLog.create({
        data: {
          level: "INFO",
          message: "Auto-publish process checked: Disabled in settings panel."
        }
      });
      return NextResponse.json({ status: "skipped", reason: "autoPublish is disabled" });
    }

    const category = settings.category || "Education";
    const topics = TOPIC_SUGGESTIONS[category] || TOPIC_SUGGESTIONS["Education"];

    // Pick 2 random topics (without duplicates)
    const shuffled = [...topics].sort(() => 0.5 - Math.random());
    const selectedTopics = shuffled.slice(0, 2);

    const createdBlogs = [];

    for (const topic of selectedTopics) {
      // A. Generate Blog with AI
      const blogContent = await generateBlogWithAI(topic, category);

      // B. Fetch Image from search
      let imageUrl = "/school/8.jpg";
      try {
        const images = await searchImages(topic);
        if (images && images.length > 0) {
          // Select random image from search results
          const imgIdx = Math.floor(Math.random() * Math.min(images.length, 5));
          imageUrl = images[imgIdx].url;
        }
      } catch (err) {
        console.error("Failed to fetch image for auto-publish topic", err);
      }

      // C. Save to DB
      const newBlog = await db.blogPost.create({
        data: {
          title: blogContent.title,
          excerpt: blogContent.excerpt,
          content: blogContent.content,
          featuredImage: imageUrl,
          status: "PUBLISHED",
          author: "AI Content Engine",
          category: category,
          metaTitle: blogContent.metaTitle,
          metaDescription: blogContent.metaDescription,
          keywords: blogContent.keywords,
          publishedAt: new Date().toISOString()
        }
      });

      createdBlogs.push(newBlog);
    }

    // 2. Log in editorial history
    const titles = createdBlogs.map(b => b.title).join(", ");
    await db.editorialLog.create({
      data: {
        level: "SUCCESS",
        message: `Cron scheduler executed. Generated and auto-published 2 stories in category "${category}": ${titles}`
      }
    });

    // 3. Update execution timestamp
    await db.syncSettings.update({
      data: {
        lastExecutedAt: new Date().toISOString()
      }
    });

    return NextResponse.json({ status: "success", count: createdBlogs.length, published: createdBlogs.map(b => b.title) });
  } catch (error: any) {
    console.error("Auto publish cron job error:", error);
    try {
      await db.editorialLog.create({
        data: {
          level: "ERROR",
          message: `Cron scheduler failed. Error details: ${error.message || error}`
        }
      });
    } catch (_) {}
    return NextResponse.json({ error: error.message || "Failed to run auto-publish cron" }, { status: 500 });
  }
}
