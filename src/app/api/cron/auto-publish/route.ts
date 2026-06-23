import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateBlogWithAI, generateTopicsForCategory } from "@/lib/gemini";
import { searchImages } from "@/lib/pexels";

const TOPIC_SUGGESTIONS: Record<string, string[]> = {
  "Education": [
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
  "Achievements": [
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
  "News": [
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
  "Autopost": [
    "5 Ways to Enhance Daily Productivity in School",
    "How Extracurriculars Shape a Child's Future",
    "The Evolution of Smart Classrooms",
    "A Guide to Effective Parent-Teacher Collaboration",
    "Building Resilience in Modern Students",
    "Top Study Hacks for Exam Seasons",
    "Why Nutrition Plays a Crucial Role in Student Focus",
    "Nurturing Emotional Intelligence Early On",
    "The Benefits of Learning Multiple Languages",
    "Celebrating Student Inclusivity and Diversity on Campus"
  ]
};

export async function GET(req: Request) {
  return handleAutoPublish(req);
}

export async function POST(req: Request) {
  return handleAutoPublish(req);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 80);
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
    let topics = TOPIC_SUGGESTIONS[category];

    // If suggestions for the category don't exist (e.g. custom category), generate them dynamically using AI
    if (!topics || topics.length === 0) {
      try {
        console.log(`No hardcoded topics for "${category}". Generating dynamically using AI...`);
        topics = await generateTopicsForCategory(category);
      } catch (err: any) {
        console.error("Failed to generate topics dynamically:", err);
        topics = TOPIC_SUGGESTIONS["Education"];
      }
    }

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

      // Generate a unique slug
      const baseSlug = slugify(blogContent.title || topic);
      const slug = `${baseSlug}-${Date.now()}-${createdBlogs.length}`;

      // C. Save to DB
      const newBlog = await db.blogPost.create({
        data: {
          title: blogContent.title,
          slug,
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
