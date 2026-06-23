"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export default function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch((err) => {
        console.error("Failed to play video:", err);
      });
      setIsPlaying(true);
    }
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-stone-900">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        id="hero-bg-video"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
      >
        <source src="https://www.pathseekers.edu.in/videos/virtual%20tour.mp4" type="video/mp4" />
        <track kind="captions" srcLang="en" label="English" default />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/70 via-accent-cream/50 to-white"></div>

      {/* WCAG Compliance Play/Pause Button */}
      <div className="absolute bottom-6 right-6 z-30">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          aria-controls="hero-bg-video"
          className="w-10 h-10 rounded-full bg-white/70 hover:bg-white text-stone-800 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 border border-stone-200/50"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-stone-800 text-stone-800" />
          ) : (
            <Play className="w-4 h-4 fill-stone-800 text-stone-800 translate-x-[1px]" />
          )}
        </button>
      </div>
    </div>
  );
}
