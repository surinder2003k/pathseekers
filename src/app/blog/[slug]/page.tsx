import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Eye, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShareButtons from "@/components/blog/ShareButtons";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { getBaseUrl } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await db.blogPost.findUnique({
    where: { slug }
  });

  if (!blog) {
    return {
      title: "Article Not Found | Pathseekers"
    };
  }

  const baseUrl = getBaseUrl();
  // Use blog featured image, or fallback to school campus image
  const ogImage = blog.featuredImage || "/school/8.jpg";
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;

  return {
    title: `${blog.metaTitle || blog.title} | Pathseekers School`,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.keywords ? blog.keywords.split(",").map((k: string) => k.trim()) : [],
    alternates: {
      canonical: `${baseUrl}/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.metaDescription || blog.excerpt,
      url: `${baseUrl}/blog/${blog.slug}`,
      siteName: "Pathseekers School Beas Punjab",
      locale: "en_IN",
      type: "article",
      publishedTime: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : undefined,
      modifiedTime: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: [ogImageUrl],
    },
  };
}


export default async function BlogPostPage({ params, searchParams }: PageProps & { searchParams?: Record<string, string> }) {
  const { slug } = await params;
  const blog = await db.blogPost.findUnique({
    where: { slug }
  });

    // Allow preview of drafts via ?preview=true query param
  const previewMode = searchParams?.preview === "true";
  if (!blog || (blog.status !== "PUBLISHED" && !previewMode)) {
    notFound();
  }

  // Increment views logic has been removed from server render to prevent Next.js 15 crashing.
  // Should be implemented via an API route triggered by a client component if needed.

  // Fetch related posts (same category, excluding current)
  const related = await db.blogPost.findMany({
    where: {
      category: blog.category,
      status: "PUBLISHED"
    },
    take: 3
  });
  const filteredRelated = related.filter((b: any) => b.id !== blog.id).slice(0, 3);

  // Article Structured Data Schema
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": blog.title,
    "image": [blog.featuredImage],
    "datePublished": blog.publishedAt || blog.createdAt,
    "dateModified": blog.updatedAt,
    "author": [{
      "@type": "Person",
      "name": blog.author,
      "url": "https://pathseekers.edu.in/about"
    }]
  };

  return (
    <>
      <Navbar />

      {/* JSON-LD Structured Data Schema for Search Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <article className="min-h-screen bg-[#fafaf9] pt-32 pb-24 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary-850 hover:text-primary-650 transition-colors uppercase tracking-wider mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journal
          </Link>

          {/* Heading Block */}
          <header className="mb-10 space-y-4">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-850 rounded-md text-[10px] font-bold uppercase tracking-wider">
              {blog.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-2 border-y border-stone-200/50 py-3">
              <span>By <strong className="text-stone-850 font-semibold">{blog.author}</strong></span>
              <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(blog.publishedAt || blog.createdAt)}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {blog.views} Views
              </span>
            </div>
          </header>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="relative h-96 sm:h-[480px] w-full rounded-3xl overflow-hidden shadow border border-stone-200/50 mb-12">
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Main Body Content */}
          <div 
            className="prose max-w-none text-stone-750 font-medium pb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* SEO Backlink Attribution */}
          <div className="py-6 mb-4 border-t border-b border-stone-200/60 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-stone-500">
              Published by{" "}
              <a
                href="https://www.pathseekers.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary-700 hover:text-primary-600 transition-colors"
              >
                Pathseekers School, Beas
              </a>
              {" "}— A leading CBSE school in Amritsar, Punjab.
            </p>
            <a
              href="https://www.pathseekers.edu.in/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 hover:text-primary-500 transition-colors"
            >
              More articles on our official portal
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Share Section */}
          <ShareButtons slug={blog.slug} title={blog.title} />

          {/* Related Stories */}
          {filteredRelated.length > 0 && (
            <div className="pt-16 border-t border-stone-200/60">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">Related Journal Stories</h3>
                <a
                  href="https://www.pathseekers.edu.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-primary-600 hover:text-primary-500 transition-colors inline-flex items-center gap-1"
                >
                  Visit Pathseekers Official Site
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {filteredRelated.map((post: any) => (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <div className="relative h-32 w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/50 mb-3">
                      {post.featuredImage && (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          loading="lazy"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <span className="text-[9px] font-bold text-primary-600 uppercase tracking-widest block mb-1">
                      {post.category}
                    </span>
                    <h4 className="font-serif font-bold text-stone-900 text-sm line-clamp-2 group-hover:text-primary-850 transition-colors leading-snug">
                      {post.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>

      <Footer />
    </>
  );
}
