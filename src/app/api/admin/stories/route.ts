import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const blogs = await db.blogPost.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error("GET stories error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch stories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, id, title, excerpt, content, featuredImage, status, category, metaTitle, metaDescription, keywords, author } = body;

    if (action === "create") {
      if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
      }
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const blog = await db.blogPost.create({
        data: {
          title,
          slug,
          excerpt: excerpt || "",
          content: content || "",
          featuredImage: featuredImage || "/school/special_education.jpg",
          status: status || "DRAFT",
          author: author || "Administrator",
          category: category || "Education",
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || excerpt || "",
          keywords: keywords || "",
          publishedAt: status === "PUBLISHED" ? new Date().toISOString() : null
        }
      });
      return NextResponse.json(blog);
    }

    if (action === "update") {
      if (!id) {
        return NextResponse.json({ error: "Story ID is required" }, { status: 400 });
      }
      
      const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined;
      
      // Build data object dynamically to avoid sending undefined fields or erasing database properties
      const data: any = {};
      if (title !== undefined) { data.title = title; data.slug = slug; }
      if (excerpt !== undefined) data.excerpt = excerpt;
      if (content !== undefined) data.content = content;
      if (featuredImage !== undefined) data.featuredImage = featuredImage;
      if (status !== undefined) {
        data.status = status;
        data.publishedAt = status === "PUBLISHED" ? new Date().toISOString() : null;
      }
      if (category !== undefined) data.category = category;
      if (metaTitle !== undefined) data.metaTitle = metaTitle;
      if (metaDescription !== undefined) data.metaDescription = metaDescription;
      if (keywords !== undefined) data.keywords = keywords;
      if (author !== undefined) data.author = author;

      const updated = await db.blogPost.update({
        where: { id },
        data
      });
      return NextResponse.json(updated);
    }

    if (action === "delete") {
      if (!id) {
        return NextResponse.json({ error: "Story ID is required" }, { status: 400 });
      }
      const deleted = await db.blogPost.delete({
        where: { id }
      });
      return NextResponse.json(deleted);
    }

    if (action === "duplicate") {
      if (!id) {
        return NextResponse.json({ error: "Story ID is required" }, { status: 400 });
      }
      const source = await db.blogPost.findUnique({
        where: { id }
      });
      if (!source) {
        return NextResponse.json({ error: "Source story not found" }, { status: 404 });
      }
      const newBlog = await db.blogPost.create({
        data: {
          title: `${source.title} (Copy)`,
          slug: `${source.slug}-copy-${Date.now()}`,
          excerpt: source.excerpt,
          content: source.content,
          featuredImage: source.featuredImage,
          status: "DRAFT",
          author: source.author,
          category: source.category,
          metaTitle: source.metaTitle ? `${source.metaTitle} (Copy)` : null,
          metaDescription: source.metaDescription,
          keywords: source.keywords
        }
      });
      return NextResponse.json(newBlog);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("POST stories error:", error);
    return NextResponse.json({ error: error.message || "Failed to perform story action" }, { status: 500 });
  }
}
