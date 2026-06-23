import { NextResponse } from "next/server";
import { generateBlogWithAI, generateTopicsForCategory } from "@/lib/gemini";
import { db } from "@/lib/db";

// Expanded default topics to auto-generate when no specific topic is given
const AUTO_TOPICS: Record<string, string[]> = {
  Education: [
    "Fostering Critical Thinking in CBSE Primary Classes",
    "Why Foundations Matter: Reading & Math in Classes I-III",
    "Integrating Mindfulness and Yoga in Daily Class Routines",
    "Parent Partnership: Guiding Academic Success at Home",
    "The Role of STEM Education in Shaping Future-Ready Students",
    "How to Choose the Right Stream After Class 10: Science, Commerce, or Humanities",
    "Encouraging a Growth Mindset in Children: A Guide for Parents",
    "The Importance of Values-Based Education in the 21st Century",
    "How to Reduce Exam Stress: Practical Tips for CBSE Board Students",
    "Supporting Your Child's Emotional Well-being During Teen Years",
    "Why Co-Curricular Activities Are Essential for All-Round Development",
    "Balancing Screen Time and Outdoor Play: Healthy Habits for Kids",
    "The Art of Active Listening: Strengthening Parent-Child Relationships",
    "Cultivating Reading Habits: How to Make Books Your Child's Best Friend",
    "Fostering Creativity through Art and Craft in Early Schooling"
  ],
  "School Events": [
    "Under the Spotlight: Visual & Performing Arts Celebrations",
    "Green Pathseekers: Replanting Saplings Across Beas Punjab",
    "Highlights of the Zonal Science and STEM Exhibitions 2026",
    "Inside the DEAR Initiative: Fostering Silent Reading Habits",
    "Pathseekers Annual Sports Meet: Celebrating Sportsmanship and Athletics",
    "Celebrating Unity in Diversity: Traditional Festivals at Pathseekers",
    "Annual Science and Art Exhibition: Where Innovation Meets Creativity",
    "Glimpses of the Pathseekers Model United Nations (MUN) Conference",
    "Inspiring Young Minds: Guest Lecture Series by Industry Experts",
    "Inter-House Debate Championship: Developing Oratory and Logic",
    "Pathseekers Community Outreach: Spreading Awareness on Health & Sanitation",
    "Earth Day Celebration: School-wide Initiatives for a Greener Planet",
    "Math Week Celebrations: Making Mathematics Fun and Interactive",
    "Field Trips and Educational Tours: Learning Beyond the Classroom",
    "Celebrating Teachers' Day: Students Expressing Gratitude and Respect"
  ],
  Achievements: [
    "Triumphant Boards: How Pathseekers Maintains 100% CBSE Pass Rate",
    "Regional Chess Gold: Spotlighting our Junior Competitors",
    "Olympiad Victories: Pathseekers Secures State Math Ranks",
    "Placement Report: Students Placed at India's Top Universities",
    "Securing Gold at the State-Level Athletics Championship",
    "Pathseekers Innovators Win First Prize in National Robofest",
    "Outstanding CBSE Class 12 Merit List: Meet Our Toppers",
    "Success in IIT-JEE and NEET: Celebrating Our Achievers' Hard Work",
    "Inter-School Singing Trophy Won by Pathseekers Choir",
    "Pathseekers Football Team Clinches the Zonal Championship Cup",
    "Inspiring Journeys: Alumnus Spotlight on International Scholarships",
    "Gold Medalists in Zonal Swimming Championship",
    "Outstanding Performance in CBSE National Table Tennis Tournament",
    "Best Delegate Awards Secured at the Prestigious Delhi MUN",
    "Pathseekers Art Students Selected for National Art Exhibition"
  ],
  News: [
    "Inauguration of new Robotic & IoT Labs in Senior Secondary Wings",
    "Pathseekers Awarded Best Holistic School in District Summit",
    "New Smartboards Enriched with Interactive Pedagogies Installed",
    "Security Upgrades: Implementing Smart Gate Access Protocols",
    "Announcing Admissions for Academic Session 2026-27: Apply Online",
    "Upgrade of School Sports Complex: New Synthetic Athletic Track and Indoor Courts",
    "Pathseekers Introduces Artificial Intelligence (AI) and Coding in Middle School",
    "Welcome Back to School: Message from the Principal for the New Term",
    "Environment Award: Pathseekers Named Greenest Campus in the Region",
    "New Biology and Chemistry Labs Upgraded with Advanced Instruments",
    "Launch of the Pathseekers Career Counseling Cell for Senior Students",
    "Installation of High-Capacity Solar Panels: Moving Towards Clean Energy",
    "Expansion of School Library: Over 5,000 New Titles Added",
    "Introducing Specialized Coaching for Competitive Examinations",
    "State-of-the-Art Language Lab Set Up to Enhance Communication Skills"
  ],
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 80);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const category = body.category || "Education";
    const count = Math.min(Number(body.count) || 2, 5); // Generate 2-5 blogs max

    let topics = AUTO_TOPICS[category];
    
    // If category is custom, generate topics dynamically using AI
    if (!topics || topics.length === 0) {
      try {
        console.log(`No hardcoded topics for "${category}". Generating dynamically using AI...`);
        topics = await generateTopicsForCategory(category);
      } catch (err: any) {
        console.error("Failed to generate topics dynamically:", err);
        topics = AUTO_TOPICS["Education"];
      }
    }

    // Pick unique topics for this batch (without duplicates)
    const shuffled = [...topics].sort(() => 0.5 - Math.random());
    const selectedTopics = shuffled.slice(0, count);

    const results: { title: string; status: string }[] = [];

    for (let i = 0; i < selectedTopics.length; i++) {
      const topic = selectedTopics[i];
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

