"use client";

import { useState, useEffect } from "react";
import { Share2, Link2, Check } from "lucide-react";

// Inline SVGs for Facebook and Twitter/X
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

interface ShareButtonsProps {
  slug: string;
  title: string;
}

export default function ShareButtons({ slug, title }: ShareButtonsProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShareUrl(`${window.location.origin}/blog/${slug}`);
  }, [slug]);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: shareUrl,
        });
      } catch (err) {
        // Exclude user-cancellation from errors
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="py-8 flex flex-wrap items-center justify-between gap-4 border-t border-b border-stone-200/60 my-6">
      <div className="flex items-center gap-2">
        <Share2 className="w-4 h-4 text-stone-500" />
        <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Share this article:</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {/* Web Share API Button (WhatsApp, system dialogue, etc.) */}
        <button
          onClick={handleNativeShare}
          className="px-4 py-2 bg-primary-800 hover:bg-primary-900 text-white rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          title="Share globally (WhatsApp, Email, etc.)"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share Article
        </button>

        {/* Facebook Link */}
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl || `https://www.pathseekers.edu.in/blog/${slug}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-stone-200 rounded-full text-xs font-semibold hover:bg-stone-50 text-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Share on Facebook"
        >
          <FacebookIcon className="w-3.5 h-3.5" />
          Facebook
        </a>

        {/* Twitter/X Link */}
        <a 
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl || `https://www.pathseekers.edu.in/blog/${slug}`)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-stone-200 rounded-full text-xs font-semibold hover:bg-stone-50 text-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Share on Twitter"
        >
          <TwitterIcon className="w-3.5 h-3.5" />
          Twitter (X)
        </a>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className={`px-4 py-2 border rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            copied 
              ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold" 
              : "border-stone-200 hover:bg-stone-50 text-stone-700"
          }`}
          title="Copy Link to Clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5" />
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  );
}
