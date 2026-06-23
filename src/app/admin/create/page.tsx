"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Search,
  Upload,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  X,
  ImagePlus,
  FileImage,
  Save,
  RefreshCw,
  Activity,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import dynamic from "next/dynamic";

// Load editor client-side only (uses browser APIs)
const RichTextEditor = dynamic(
  () => import("@/components/admin/RichTextEditor"),
  { ssr: false, loading: () => <div className="h-96 bg-slate-50 rounded-2xl animate-pulse" /> }
);

export default function EditorialSuitePage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>}>
      <EditorialSuite />
    </Suspense>
  );
}

function EditorialSuite() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storyId = searchParams.get("id");

  const featuredFileRef = useRef<HTMLInputElement>(null);
  const bodyImageRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  // Right panel tab: image | ai | seo
  const [rightTab, setRightTab] = useState<"image" | "ai" | "seo">("ai");

  const [form, setForm] = useState({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    status: "DRAFT",
    author: "Gurvinder Singh Dhillon",
    category: "Education",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });

  // AI states
  const [topicInput, setTopicInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [aiSuccess, setAiSuccess] = useState(false);

  // Image states
  const [imageQuery, setImageQuery] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [searchingImages, setSearchingImages] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingBody, setUploadingBody] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [bodyInsertHTML, setBodyInsertHTML] = useState("");

  // Word count state
  const [wordCount, setWordCount] = useState(0);

  // SEO score
  const seoScore = (() => {
    let s = 100;
    if (form.title.length < 15) s -= 15;
    if (form.excerpt.length < 50) s -= 15;
    if (wordCount < 300) s -= 20;
    if (wordCount < 100) s -= 15;
    if (!form.keywords) s -= 20;
    if (!form.metaDescription) s -= 10;
    return Math.max(s, 5);
  })();

  // Auto slug from title
  useEffect(() => {
    if (!form.id && form.title) {
      const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      setForm((p) => ({ ...p, slug, metaTitle: p.metaTitle || form.title }));
    }
  }, [form.title]);

  // Load story for editing
  useEffect(() => {
    if (!storyId) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/stories");
        if (res.ok) {
          const all = await res.json();
          const match = all.find((b: any) => b.id === storyId);
          if (match) {
            setForm({
              id: match.id,
              title: match.title,
              slug: match.slug,
              excerpt: match.excerpt || "",
              content: match.content || "",
              featuredImage: match.featuredImage || "",
              status: match.status,
              author: match.author || "Gurvinder Singh Dhillon",
              category: match.category || "Education",
              metaTitle: match.metaTitle || match.title,
              metaDescription: match.metaDescription || match.excerpt || "",
              keywords: match.keywords || "",
            });
          }
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    })();
  }, [storyId]);

  const handleSave = async (publishStatus?: string) => {
    setSaveError(""); setSaveSuccess(false);
    try {
      setSaving(true);
      const body = {
        action: form.id ? "update" : "create",
        ...form,
        status: publishStatus || form.status,
      };
      const res = await fetch("/api/admin/stories", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => router.push("/admin/stories"), 900);
      } else {
        const err = await res.json();
        setSaveError(err.error || "Save failed");
      }
    } catch (e: any) { setSaveError(e.message); } finally { setSaving(false); }
  };

  const handleAIGenerate = async () => {
    if (!topicInput.trim()) return;
    setAiSuccess(false);
    try {
      setGenerating(true);
      const res = await fetch("/api/admin/ai-generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topicInput, category: form.category }),
      });
      if (res.ok) {
        const data = await res.json();
        setForm((p) => ({
          ...p,
          title: data.title || p.title,
          excerpt: data.excerpt || p.excerpt,
          content: data.content || p.content,
          author: data.author || p.author,
          metaTitle: data.metaTitle || data.title || p.metaTitle,
          metaDescription: data.metaDescription || data.excerpt || p.metaDescription,
          keywords: data.keywords || p.keywords,
        }));
        setAiSuccess(true);
      }
    } catch (e) { console.error(e); } finally { setGenerating(false); }
  };

  const handleImageSearch = async () => {
    if (!imageQuery.trim()) return;
    try {
      setSearchingImages(true);
      const res = await fetch(`/api/admin/image-search?query=${encodeURIComponent(imageQuery)}`);
      if (res.ok) setImages(await res.json());
    } catch (e) { console.error(e); } finally { setSearchingImages(false); }
  };

  const uploadFile = async (file: File, forBody: boolean) => {
    setUploadError("");
    if (forBody) setUploadingBody(true); else setUploadingFeatured(true);
    try {
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        if (forBody) {
          // Will be inserted into editor via state change
          setBodyInsertHTML(`<figure style="margin:1.5em 0"><img src="${data.url}" alt="${file.name}" style="max-width:100%;border-radius:12px;" /><figcaption style="text-align:center;font-size:0.8em;color:#9ca3af;margin-top:0.4em">${file.name}</figcaption></figure>`);
        } else {
          setForm((p) => ({ ...p, featuredImage: data.url }));
        }
      } else {
        setUploadError(data.error || "Upload failed");
      }
    } catch (e: any) { setUploadError(e.message); } finally {
      if (forBody) setUploadingBody(false); else setUploadingFeatured(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center py-32"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>
  );

  return (
    <div className="min-h-screen bg-transparent font-sans text-slate-100">
      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-30 bg-[#0a0f1e]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/stories" className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-200 uppercase tracking-wider transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Archive
          </Link>
          <div className="w-px h-4 bg-slate-800" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {form.id ? "Edit Story" : "New Story"}
          </span>
          {wordCount > 0 && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${wordCount >= 2000 ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/50" : "bg-amber-950/40 text-amber-400 border-amber-900/50"}`}>
              {wordCount.toLocaleString()} words
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setPreviewMode((p) => !p)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 rounded-lg transition-all">
            {previewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {previewMode ? "Edit" : "Preview"}
          </button>
          <button onClick={() => handleSave("DRAFT")} disabled={saving} className="px-4 py-1.5 text-xs font-bold text-slate-350 border border-slate-800 hover:bg-slate-900/40 hover:text-slate-200 rounded-lg transition-all flex items-center gap-1.5">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save Draft
          </button>
          <button onClick={() => handleSave("PUBLISHED")} disabled={saving}
            className="px-5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-primary-800 to-primary-600 hover:from-primary-750 hover:to-primary-550 border border-primary-700/30 rounded-lg transition-all flex items-center gap-1.5 shadow-sm shadow-primary-950/30">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
            {saveSuccess ? "Published!" : "Publish Article"}
          </button>
        </div>
      </div>

      {saveError && (
        <div className="mx-6 mt-3 px-4 py-2 bg-rose-950/20 border border-rose-900/30 rounded-lg text-xs font-semibold text-rose-450">
          {saveError}
        </div>
      )}

      {/* ── Main 2-col Layout ── */}
      <div className="max-w-[1400px] mx-auto flex gap-0">

        {/* ── Left: Editor ── */}
        <div className="flex-1 min-w-0 px-8 py-8 border-r border-slate-800/60">
          
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-950/60 text-primary-400 border border-primary-900/30 text-[11px] font-bold uppercase tracking-widest">
              <Activity className="w-3 h-3" />
              Blog Editor
            </span>
          </div>

          {/* Title */}
          <div className="mb-2">
            <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-1.5">Blog Title</label>
            <textarea
              rows={2}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter title..."
              className="w-full text-3xl font-bold text-white placeholder-slate-700 border-0 border-b border-slate-800 focus:outline-none focus:border-primary-550 resize-none bg-transparent pb-3 leading-snug transition-colors"
            />
          </div>

          {/* Excerpt */}
          <div className="mb-6">
            <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span className="w-3 h-px bg-slate-800" />
              Short Description (Excerpt)
            </label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="A concise executive summary for SEO meta tags..."
              className="w-full px-4 py-3 text-sm text-slate-200 placeholder-slate-750 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-900/30 bg-slate-950/50 resize-none transition-all"
            />
          </div>

          {/* Body Editor */}
          <div>
            <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="font-mono text-[9px] text-primary-450">&gt;_</span>
              Article Body (Full Content)
            </label>

            {previewMode ? (
              <div
                className="min-h-96 px-6 py-5 border border-slate-800 rounded-2xl text-slate-200 text-[15px] leading-relaxed prose max-w-none bg-slate-950/30"
                dangerouslySetInnerHTML={{ __html: form.content }}
              />
            ) : (
              <RichTextEditor
                value={form.content}
                onChange={(html) => setForm((p) => ({ ...p, content: html }))}
                onWordCountChange={setWordCount}
                insertHTML={bodyInsertHTML}
                onInsertHTMLDone={() => setBodyInsertHTML("")}
                placeholder="Start writing your article... Use the toolbar above for formatting."
              />
            )}

            {/* Insert body image button */}
            <div className="mt-2 flex items-center gap-2">
              <input ref={bodyImageRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { if (e.target.files?.[0]) uploadFile(e.target.files[0], true); if (bodyImageRef.current) bodyImageRef.current.value = ""; }}
              />
              <button type="button" onClick={() => bodyImageRef.current?.click()} disabled={uploadingBody}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-slate-350 hover:text-white border border-slate-800 hover:border-slate-700 rounded-lg transition-all bg-slate-900/40 uppercase tracking-wider">
                {uploadingBody ? <Loader2 className="w-3 h-3 animate-spin" /> : <ImagePlus className="w-3 h-3" />}
                Insert Image into Article
              </button>
              <span className="text-[10px] text-slate-500">Upload directly into article body</span>
            </div>
          </div>

          {/* Publish controls below editor on mobile */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-1">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-950/80 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-1">Author</label>
              <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full px-3 py-2 text-xs text-slate-350 bg-slate-950/80 border border-slate-800 rounded-lg focus:outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-950/80 border border-slate-800 rounded-lg focus:outline-none focus:border-primary-500">
                <option>Education</option>
                <option>School Events</option>
                <option>Achievements</option>
                <option>News</option>
              </select>
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-1">URL Slug</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-3 py-2 text-xs text-slate-350 bg-slate-950/80 border border-slate-800 rounded-lg focus:outline-none focus:border-primary-500 font-mono" />
            </div>
          </div>
        </div>

        {/* ── Right: Tools Panel ── */}
        <div className="w-[320px] shrink-0 flex flex-col bg-slate-900/10 border-l border-slate-800/80 min-h-screen">

          {/* Right tab switcher */}
          <div className="flex border-b border-slate-800 bg-[#0a0f1e]">
            {(["image", "ai", "seo"] as const).map((tab) => (
              <button key={tab} onClick={() => setRightTab(tab)}
                className={`flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all ${rightTab === tab ? "text-primary-400 border-b-2 border-primary-500 bg-slate-950/40" : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/20"}`}>
                {tab === "image" ? "🖼 Visual Asset" : tab === "ai" ? "✨ AI Co-Author" : "📊 SEO Matrix"}
              </button>
            ))}
          </div>

          <div className="flex-1 p-4 space-y-4 overflow-y-auto">

            {/* ── IMAGE TAB ── */}
            {rightTab === "image" && (
              <div className="space-y-4">
                {/* Current featured image preview */}
                {form.featuredImage && (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-sm">
                    <img src={form.featuredImage} alt="Featured" className="w-full h-40 object-cover" />
                    <button onClick={() => setForm((p) => ({ ...p, featuredImage: "" }))}
                      className="absolute top-2 right-2 w-7 h-7 bg-slate-900/90 hover:bg-rose-950/30 border border-slate-800 rounded-full flex items-center justify-center shadow-sm transition-colors text-slate-400 hover:text-rose-450">
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                      <p className="text-[9px] font-bold text-white uppercase tracking-widest">Featured Image</p>
                    </div>
                  </div>
                )}

                {/* Upload zone */}
                <div>
                  <input ref={featuredFileRef} type="file" accept="image/*" className="hidden"
                    onChange={(e) => { if (e.target.files?.[0]) uploadFile(e.target.files[0], false); if (featuredFileRef.current) featuredFileRef.current.value = ""; }}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setRightTab("image")} className="col-span-1">
                      <div onClick={() => featuredFileRef.current?.click()}
                        className="border-2 border-dashed border-slate-800 hover:border-primary-500 hover:bg-primary-950/10 rounded-xl p-4 text-center cursor-pointer transition-all group">
                        <Upload className="w-5 h-5 text-slate-500 group-hover:text-primary-400 mx-auto mb-1.5 transition-colors" />
                        <p className="text-[10px] font-bold text-slate-400 group-hover:text-primary-350">Upload</p>
                        {uploadingFeatured && <Loader2 className="w-4 h-4 animate-spin text-primary-500 mx-auto mt-1" />}
                      </div>
                    </button>
                    <div className="border-2 border-dashed border-slate-800 hover:border-primary-500 hover:bg-primary-950/10 rounded-xl p-4 text-center cursor-pointer transition-all group"
                      onClick={() => { /* show search */ setImageQuery(""); }}>
                      <Search className="w-5 h-5 text-slate-500 group-hover:text-primary-400 mx-auto mb-1.5 transition-colors" />
                      <p className="text-[10px] font-bold text-slate-400 group-hover:text-primary-350">Search</p>
                    </div>
                  </div>
                  {uploadError && <p className="text-[10px] text-rose-450 font-semibold mt-1.5">{uploadError}</p>}
                </div>

                {/* Image URL input */}
                <div>
                  <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-1">Image URL</label>
                  <input value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                    placeholder="https://... or /school/image.jpg"
                    className="w-full px-3 py-2 text-[11px] text-slate-200 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-slate-950/80" />
                </div>

                {/* Stock search */}
                <div>
                  <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-1.5">
                    Search Global Image Library
                  </label>
                  <div className="flex gap-1.5">
                    <input value={imageQuery} onChange={(e) => setImageQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleImageSearch()}
                      placeholder="classroom, school, Punjab..."
                      className="flex-1 px-3 py-2 text-[11px] text-slate-200 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-slate-950/80" />
                    <button onClick={handleImageSearch} disabled={searchingImages || !imageQuery}
                      className="px-3 py-2 bg-primary-650 hover:bg-primary-550 text-white rounded-lg text-[10px] font-bold transition-all flex items-center gap-1">
                      {searchingImages ? <Loader2 className="w-3 h-3 animate-spin" /> : <Search className="w-3 h-3" />}
                    </button>
                  </div>
                  {!imageQuery && <p className="text-[9px] text-slate-500 mt-1">Images will be displayed below</p>}
                </div>

                {/* Image gallery */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {images.slice(0, 8).map((img) => (
                      <div key={img.id} onClick={() => setForm((p) => ({ ...p, featuredImage: img.url }))}
                        className={`relative h-20 rounded-xl overflow-hidden border-2 cursor-pointer group transition-all ${form.featuredImage === img.url ? "border-primary-500 ring-2 ring-primary-950/40" : "border-transparent hover:border-primary-400"}`}>
                        <img src={img.thumbnail} alt={img.photographer} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <span className="text-[8px] font-bold text-white bg-primary-600 px-2 py-0.5 rounded">Apply</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── AI TAB ── */}
            {rightTab === "ai" && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary-950/40 to-slate-900/30 border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary-650 rounded-xl flex items-center justify-center shadow-md">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">AI Co-Author</p>
                      <p className="text-[9px] text-slate-450">Generates 2000+ word articles</p>
                    </div>
                  </div>

                  {aiSuccess && (
                    <div className="mb-3 flex items-start gap-2 px-3 py-2.5 bg-emerald-950/20 border border-emerald-900/30 rounded-xl">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-450 mt-0.5 shrink-0" />
                      <p className="text-[10px] font-bold text-emerald-400">Article generated! All fields filled. Review in editor.</p>
                    </div>
                  )}

                  {form.title && (
                    <div className="mb-3 p-2.5 bg-slate-950/50 rounded-xl border border-slate-800">
                      <p className="text-[9px] font-bold text-primary-450 uppercase tracking-widest mb-0.5">Last Generated</p>
                      <p className="text-[11px] font-semibold text-slate-350 line-clamp-2">{form.title}</p>
                      <p className="text-[9px] text-slate-500 mt-0.5">{wordCount.toLocaleString()} words written</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Topic / Brief</label>
                    <textarea rows={3} value={topicInput} onChange={(e) => setTopicInput(e.target.value)}
                      placeholder="e.g. Benefits of STEM education in rural Punjab schools for CBSE Class 8-10..."
                      className="w-full px-3 py-2.5 text-xs text-slate-200 border border-slate-800 bg-slate-950/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-900/30 resize-none" />
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-semibold text-slate-300 border border-slate-800 bg-slate-950/80 rounded-xl focus:outline-none">
                      <option>Education</option>
                      <option>School Events</option>
                      <option>Achievements</option>
                      <option>News</option>
                    </select>
                  </div>

                  <button onClick={handleAIGenerate} disabled={generating || !topicInput.trim()}
                    className="w-full mt-3 py-2.5 bg-gradient-to-r from-primary-800 to-primary-600 hover:from-primary-750 hover:to-primary-550 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-primary-950/20 border border-primary-700/30">
                    {generating ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating 2000+ words…</>
                    ) : (
                      <><Sparkles className="w-3.5 h-3.5" /> Generate Narrative →</>
                    )}
                  </button>
                </div>

                <div className="bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 space-y-2">
                  <p className="text-[9px] font-bold text-slate-450 uppercase tracking-widest">What AI fills automatically</p>
                  {["Title", "Excerpt / Summary", "Full 2000+ word HTML body", "Author Name", "Meta Title (SEO)", "Meta Description", "8-10 SEO Keywords"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[11px] text-slate-350">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4">
                  <p className="text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-2">Pipeline Status</p>
                  {[["Nvidia NIM DeepSeek", true], ["Gemini Flash API", true], ["Groq Llama 3.3", true], ["Image Search API", true], ["OpenAI Fallback", false]].map(([label, active]) => (
                    <div key={String(label)} className="flex justify-between items-center text-[10px] font-semibold py-1">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-emerald-500 animate-pulse" : "bg-amber-400"}`} />
                        {String(label)}
                      </span>
                      <span className={active ? "text-emerald-450 font-bold" : "text-amber-500"}>{active ? "ACTIVE" : "STANDBY"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── SEO TAB ── */}
            {rightTab === "seo" && (
              <div className="space-y-4">
                {/* Score */}
                <div className="bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[9px] font-bold text-slate-450 uppercase tracking-widest">SEO Score</p>
                    <span className={`text-sm font-bold ${seoScore >= 80 ? "text-emerald-400" : seoScore >= 50 ? "text-amber-400" : "text-rose-400"}`}>
                      {seoScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-850 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${seoScore >= 80 ? "bg-emerald-500" : seoScore >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
                       style={{ width: `${seoScore}%` }} />
                  </div>
                  <div className="mt-2 space-y-1">
                    {[
                      { ok: form.title.length >= 15, label: "Title length ≥ 15 chars" },
                      { ok: form.excerpt.length >= 50, label: "Excerpt length ≥ 50 chars" },
                      { ok: wordCount >= 300, label: "Content ≥ 300 words" },
                      { ok: wordCount >= 2000, label: "Content ≥ 2000 words" },
                      { ok: !!form.keywords, label: "Keywords filled" },
                      { ok: !!form.metaDescription, label: "Meta description filled" },
                    ].map(({ ok, label }) => (
                      <div key={label} className="flex items-center gap-1.5 text-[10px]">
                        <span className={ok ? "text-emerald-400" : "text-slate-650"}>●</span>
                        <span className={ok ? "text-slate-200 font-semibold" : "text-slate-500"}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 space-y-3">
                  <p className="text-[9px] font-bold text-slate-450 uppercase tracking-widest">SEO Fields</p>

                  <div>
                    <div className="flex justify-between">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Permalink (Slug)</label>
                      <span className="text-[8px] text-primary-400 font-bold bg-primary-950/45 px-1.5 py-0.5 rounded border border-primary-900/20">AUTO</span>
                    </div>
                    <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      placeholder="/blog/slug-url-here"
                      className="w-full mt-1 px-3 py-2 text-[11px] font-mono text-slate-300 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-slate-950/80" />
                    <p className="text-[8px] text-slate-500 mt-0.5">* Guaranteed unique identifier for maximum SEO authority.</p>
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Meta Title</label>
                      <span className="text-[8px] text-slate-500">{form.metaTitle.length}/60</span>
                    </div>
                    <input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                      placeholder="Enter SEO title..."
                      className="w-full mt-1 px-3 py-2 text-[11px] text-slate-300 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-slate-950/80" />
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Meta Description</label>
                      <span className="text-[8px] text-slate-500">{form.metaDescription.length}/160</span>
                    </div>
                    <textarea rows={3} value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                      placeholder="Summarize for Google snippets..."
                      className="w-full mt-1 px-3 py-2 text-[11px] text-slate-350 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-slate-950/80 resize-none" />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Keywords</label>
                    <input value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                      placeholder="comma, separated, keywords"
                      className="w-full mt-1 px-3 py-2 text-[11px] text-slate-300 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 bg-slate-950/80" />
                  </div>
                </div>

                <div className="bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4">
                  <p className="text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-2">Statistics</p>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-550">Word Count</span>
                      <span className={`font-bold ${wordCount >= 2000 ? "text-emerald-400" : "text-slate-300"}`}>{wordCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Reading Time</span>
                      <span className="font-bold text-slate-300">~{Math.max(1, Math.ceil(wordCount / 200))} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Status</span>
                      <span className={`font-bold ${form.status === "PUBLISHED" ? "text-emerald-450" : "text-amber-400"}`}>{form.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
