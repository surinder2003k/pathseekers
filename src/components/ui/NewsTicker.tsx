"use client";

import { useEffect, useRef } from "react";

const NEWS_ITEMS = [
  "Admissions open for Academic Session 2026-27. Contact administration for details.",
  "Annual Sports Meet scheduled for 15th November 2025.",
  "CBSE Class X and XII Results declared - 100% Pass Rate!",
  "Parent-Teacher Meeting for Middle Section on coming Saturday.",
  "Affiliated to CBSE | Affiliation No. 1630982",
];

export default function NewsTicker() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let pos = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      pos -= speed;
      // Reset when first half has scrolled out
      if (Math.abs(pos) >= el.scrollWidth / 2) {
        pos = 0;
      }
      el.style.transform = `translateX(${pos}px)`;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Duplicate items for seamless loop
  const doubled = [...NEWS_ITEMS, ...NEWS_ITEMS];

  return (
    <div className="bg-primary-900 text-white text-[11px] sm:text-xs font-semibold py-2 overflow-hidden relative flex items-center">
      <div className="absolute left-0 bg-primary-900 z-10 px-4 sm:px-6 h-full flex items-center shadow-[15px_0_15px_-5px_rgba(1,28,60,1)] uppercase tracking-widest text-accent-gold font-bold">
        📢 Updates
      </div>
      <div
        ref={scrollRef}
        className="flex whitespace-nowrap pl-32 sm:pl-40 will-change-transform"
      >
        {doubled.map((item, idx) => (
          <span key={idx} className="mx-8 flex items-center text-stone-200">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mr-3 shrink-0"></span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
