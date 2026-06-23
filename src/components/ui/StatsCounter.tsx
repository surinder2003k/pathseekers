"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export default function StatsCounter({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
      {stats.map((stat, idx) => (
        <StatCard key={idx} stat={stat} delay={idx * 100} />
      ))}
    </div>
  );
}

function StatCard({ stat, delay }: { stat: StatItem; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const end = stat.value;
    if (start === end) return;
    const duration = 1800;
    const step = Math.max(Math.floor(duration / end), 14);
    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start >= end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [visible, stat.value]);

  return (
    <div
      ref={ref}
      className="p-6 bg-white rounded-2xl border border-stone-200/50 shadow-sm text-center flex flex-col items-center justify-center glow-hover stat-card-animate"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <div className="font-serif text-4xl lg:text-5xl font-bold text-primary-800 flex items-center justify-center mb-2">
        <span>{visible ? displayValue : 0}</span>
        <span className="text-primary-500 font-sans text-3xl ml-0.5">{stat.suffix}</span>
      </div>
      <p className="text-sm font-semibold tracking-wider uppercase text-stone-500">{stat.label}</p>
    </div>
  );
}
