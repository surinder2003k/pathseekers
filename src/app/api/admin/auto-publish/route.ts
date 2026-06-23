import { NextResponse } from "next/server";
import { generateBlogWithAI } from "@/lib/gemini";
import { db } from "@/lib/db";

// Topics to auto-generate when no specific topic is given
const AUTO_TOPICS: Record<string, string[]> = {
  Education: [
    "How CBSE Education Prepares Students for Real-World Challenges",
    "The Importance of Holistic Learning in Modern Schools",
    "How Technology is Changing Classrooms in Punjab",
    "Building Good Study Habits from an Early Age",
    "Why Physical Education Matters as Much as Academics",
  ],
  "School Events": [
    "Annual Sports Day Celebrations at Pathseekers School",
    "Cultural Festival Highlights and Student Achievements",
    "Science Exhibition Showcases Student Innovation",
    "Independence Day Celebration at Pathseekers School",
    "Annual Prize Distribution Ceremony Recap",
  ],
  Achievements: [
    "Pathseekers Students Win Regional Science Competition",
    "Our Students Excel in National-Level Academic Olympiads",
    "How Pathseekers Alumni Are Making a Difference",
    "CBSE Board Results: Pathseekers Students Shine",
    "Outstanding Achievements in Sports and Athletics",
  ],
  News: [
    "New Digital Library Opens at Pathseekers School",
    "Pathseekers Launches New After-School Programs",
    "School Welcomes New Experienced Faculty Members",
    "Smart Classrooms Now Available for All Grades",
    "Pathseekers Partners with Local NGO for Community Education",
  ],
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 80);
}

function getRandomTopic(category: string): string {
  const topics = AUTO_TOPICS[category] || AUTO_TOPICS["Education"];
  return topics[Math.floor(Math.random() * topics.length)];
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const category = body.category || "Education";
    const count = Math.min(Number(body.count) || 2, 5); // Generate 2-5 blogs max

    const results: { title: string; status: string }[] = [];

    for (let i = 0; i < count; i++) {
      const topic = getRandomTopic(category);
      try {
        // Generate blog content using AI
        const generated = await generateBlogWithAI(topic, category);

        // Build slug and ensure uniqueness
        const baseSlug = slugify(generated.title || topic);
        const slug = `${baseSlug}-${Date.now()}-${i}`;

        // Save to database
        await db.blogPost.create({
          data: {
            title: generated.title || topic,
            slug,
            excerpt: generated.excerpt || "",
            content: generated.content || "",
            featuredImage: "",
            status: "DRAFT", // Save as draft so admin can review before publishing
            author: generated.author || "Academic Excellence Team",
            category,
            metaTitle: generated.metaTitle || generated.title || topic,
            metaDescription: generated.metaDescription || generated.excerpt || "",
            keywords: generated.keywords || "",
          },
        });

        // Log the action
        await db.editorialLog.create({
          data: {
            message: `Auto-generated blog: "${generated.title}" (Category: ${category})`,
            level: "SUCCESS",
          },
        });

        results.push({ title: generated.title, status: "created" });
      } catch (err: any) {
        console.error(`Failed to generate blog ${i + 1}:`, err.message);
        results.push({ title: topic, status: `failed: ${err.message}` });

        // Log the failure
        await db.editorialLog.create({
          data: {
            message: `Auto-generate failed for topic: "${topic}" — ${err.message}`,
            level: "ERROR",
          },
        });
      }
    }

    return NextResponse.json({
      message: `Generated ${results.filter((r) => r.status === "created").length} of ${count} blogs`,
      results,
    });
  } catch (error: any) {
    console.error("Auto-publish route error:", error);
    return NextResponse.json(
      { error: error.message || "Auto-publish failed" },
      { status: 500 }
    );
  }
}
