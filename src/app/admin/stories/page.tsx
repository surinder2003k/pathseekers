"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Loader2, 
  ChevronDown, 
  Check, 
  X,
  FileText,
  Globe,
  EyeOff
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function EditorialStories() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string }>({
    isOpen: false,
    id: ""
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/stories");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const executeDelete = async (id: string) => {
    try {
      const res = await fetch("/api/admin/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          id
        })
      });
      if (res.ok) {
        fetchBlogs();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to delete story");
      }
    } catch (e) {
      console.error(e);
    }
  };



  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch("/api/admin/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id,
          status: nextStatus
        })
      });
      if (res.ok) {
        fetchBlogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const uniqueCategories = Array.from(new Set([
    "Education",
    "School Events",
    "Achievements",
    "News",
    ...blogs.map((b) => b.category).filter(Boolean)
  ]));

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCat === "All" || blog.category === selectedCat;
    const matchesStatus = selectedStatus === "All" || blog.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-8 text-slate-200">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight">Content Archive</h1>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Archive search indexing stories. Toggle drafts, duplicate items, or edit SEO matrices.
          </p>
        </div>

        <Link
          href="/admin/create"
          className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-primary-850 to-primary-655 hover:from-primary-750 hover:to-primary-555 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Story
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-xs">
          {error}
        </div>
      )}

      {/* Main Grid Filters */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4">
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search content archive..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-250 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-250 focus:outline-none w-full sm:w-36"
            >
              <option value="All">All Categories</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-250 focus:outline-none w-full sm:w-36"
            >
              <option value="All">All Status</option>
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="DRAFT">DRAFT</option>
              <option value="SCHEDULED">SCHEDULED</option>
            </select>
          </div>
        </div>

        {/* Listing Table */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-primary-550 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto border-t border-slate-800/60 pt-4">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-slate-400 font-bold uppercase tracking-wider border-b border-slate-850 pb-2">
                  <th className="pb-3 px-2">Article Story</th>
                  <th className="pb-3 px-2">Category</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2">Date Created</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-850/30 transition-colors">
                    
                    {/* Title & Excerpt */}
                    <td className="py-4 px-2 max-w-sm">
                      <span className="block font-bold text-white leading-snug group-hover:text-primary-400 transition-colors">
                        {blog.title}
                      </span>
                      <span className="block text-[10px] text-slate-400 line-clamp-1 mt-0.5">{blog.excerpt}</span>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-2">
                      <span className="inline-block px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[9px] font-bold">
                        {blog.category}
                      </span>
                    </td>



                    {/* Status Toggle */}
                    <td className="py-4 px-2">
                      <button
                        onClick={() => handleStatusToggle(blog.id, blog.status)}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer transition-colors border ${
                          blog.status === "PUBLISHED"
                            ? "bg-emerald-950/60 border-emerald-800/40 text-emerald-350"
                            : "bg-amber-900/60 border-amber-800/40 text-amber-350"
                        }`}
                      >
                        {blog.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT"}
                      </button>
                    </td>

                    {/* Created Date */}
                    <td className="py-4 px-2 text-slate-400 font-semibold">{formatDate(blog.createdAt)}</td>

                    {/* Actions */}
                    <td className="py-4 px-2 text-right">
                      <div className="flex justify-end gap-1.5">
                        <Link
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-750"
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => router.push(`/admin/create?id=${blog.id}`)}
                          className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-750"
                          title="Edit Editorial"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleStatusToggle(blog.id, blog.status)}
                          className={`p-1 rounded transition-colors ${
                            blog.status === "PUBLISHED"
                              ? "bg-amber-950/80 text-amber-350 hover:bg-amber-900"
                              : "bg-emerald-950/80 text-emerald-350 hover:bg-emerald-900"
                          }`}
                          title={blog.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                        >
                          {blog.status === "PUBLISHED" ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Globe className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-1 rounded bg-rose-950/80 text-rose-350 hover:bg-rose-900"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}

                {filteredBlogs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-slate-500 font-semibold">
                      No stories archived inside these configurations.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Story"
        message="Are you sure you want to delete this story? This action cannot be undone."
        onConfirm={async () => {
          if (deleteConfirm.id) {
            await executeDelete(deleteConfirm.id);
          }
        }}
        onClose={() => setDeleteConfirm({ isOpen: false, id: "" })}
      />
    </div>
  );
}
