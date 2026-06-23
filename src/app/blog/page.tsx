import Link from "next/link";
import Image from "next/image";
import { BookOpen, Search, Calendar, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import BlogListingClient from "./BlogListingClient";

export const revalidate = 60; // Revalidate every minute

export const metadata = {
  title: "Educational Blog & School Journal | Pathseekers",
  description: "Explore articles, student guides, academic highlights, pedagogical initiatives, and insights from Pathseekers School in Beas, Punjab.",
};

export default async function BlogPage() {
  const publishedBlogs = await db.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" }
  });

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/school/3.jpg"
            alt="Pathseekers Journal"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-8 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/80 via-accent-cream/60 to-white"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-primary-200 rounded-full shadow-sm mb-6">
            <BookOpen className="w-4 h-4 text-primary-700" />
            <span className="text-xs font-bold text-primary-900 tracking-wide uppercase">School Journal</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6">
            Educational <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-500">Journal</span><br />
            &amp; Academic Insights.
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Read expert perspectives on foundational literacy, board prep strategies, coding classes, and institutional milestones in Beas.
          </p>
        </div>
      </section>

      {/* Search & Listing */}
      <BlogListingClient initialBlogs={publishedBlogs} />

      <Footer />
    </>
  );
}
