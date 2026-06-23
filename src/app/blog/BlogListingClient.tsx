"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Eye, ArrowRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogListingClientProps {
  initialBlogs: any[];
}

const CATEGORIES = ["All", "Education", "School Events", "Achievements", "News"];

export default function BlogListingClient({ initialBlogs }: BlogListingClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleCategoryChange = (cat: string) => {
    setSelectedCat(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const filteredBlogs = initialBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      (blog.keywords && blog.keywords.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCat === "All" || blog.category === selectedCat;

    return matchesSearch && matchesCategory;
  });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-20 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar & Category Selectors */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-16">
          {/* Categories Tab */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  selectedCat === cat
                    ? "bg-gradient-to-r from-primary-800 to-primary-600 text-white border-transparent shadow-md scale-105"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-11 pr-4 py-3 rounded-full border border-stone-200 bg-white text-sm text-stone-850 focus:outline-none focus:ring-2 focus:ring-primary-350 focus:border-primary-400 transition-all shadow-sm"
            />
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Listing Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {paginatedBlogs.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog.id} className="block group">
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-stone-200/50 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-all h-[460px]"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-stone-100 border-b border-stone-100">
                      {blog.featuredImage && (
                        <Image
                          src={blog.featuredImage}
                          alt={blog.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-2.5 py-0.5 bg-primary-50 text-primary-800 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3">
                        {blog.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-stone-900 line-clamp-2 mb-2 group-hover:text-primary-800 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-stone-100 text-[11px] text-stone-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-500" />
                      {formatDate(blog.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-stone-500" />
                      {blog.views} Views
                    </span>
                  </div>
                </motion.article>
              </Link>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2.5 rounded-full border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 transition-all ${
                currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:border-primary-500 hover:text-primary-800"
              }`}
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={`w-10 h-10 rounded-full text-xs font-bold transition-all border ${
                  currentPage === page
                    ? "bg-gradient-to-r from-primary-800 to-primary-600 text-white border-transparent shadow-md scale-105"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-primary-500 hover:text-primary-800"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2.5 rounded-full border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 transition-all ${
                currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:border-primary-500 hover:text-primary-800"
              }`}
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {filteredBlogs.length === 0 && (
          <div className="text-center py-20 bg-white border border-stone-200/50 rounded-3xl p-10">
            <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">No Articles Found</h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              We couldn't find any articles matching "{search}" under the category "{selectedCat}". Please refine your query.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
