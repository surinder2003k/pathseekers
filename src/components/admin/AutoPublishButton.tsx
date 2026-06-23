"use client";

import { useState } from "react";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";

interface AutoPublishButtonProps {
  defaultCategory?: string;
}

export default function AutoPublishButton({ defaultCategory = "Education" }: AutoPublishButtonProps) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleAutoPublish = async () => {
    setLoading(true);
    setDone(false);
    setError("");
    try {
      const res = await fetch("/api/admin/auto-publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: 2, category: defaultCategory }),
      });
      const data = await res.json();
      if (res.ok) {
        setDone(true);
        setTimeout(() => setDone(false), 5000);
      } else {
        setError(data.error || "Generation failed");
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleAutoPublish}
        disabled={loading}
        title="Auto-generate 2 blog posts using AI and save them as drafts"
        className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-60"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Generating Blogs…</>
        ) : done ? (
          <><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 2 Blogs Created!</>
        ) : (
          <><Sparkles className="w-4 h-4 text-primary-400" /> Generate 2 Blogs</>
        )}
      </button>
      {error && <p className="text-[10px] text-rose-400 font-semibold max-w-[160px] text-right">{error}</p>}
      {done && <p className="text-[10px] text-emerald-400 font-semibold">Saved as drafts. Review in Blog Posts.</p>}
    </div>
  );
}
