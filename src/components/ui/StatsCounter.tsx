"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, useMotionValue, useSpring } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export default function StatsCounter({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
      {stats.map((stat, idx) => (
        <StatCard key={idx} stat={stat} />
      ))}
    </div>
  );
}

function StatCard({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = stat.value;
      if (start === end) return;

      const duration = 2000; // 2 seconds
      const incrementTime = Math.abs(Math.floor(duration / end));

      const timer = setInterval(() => {
        start += 1;
        setDisplayValue(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, Math.max(incrementTime, 15));

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="p-6 bg-white rounded-2xl border border-stone-200/50 shadow-sm text-center flex flex-col items-center justify-center glow-hover"
    >
      <div className="font-serif text-4xl lg:text-5xl font-bold text-primary-800 flex items-center justify-center mb-2">
        <span>{isInView ? displayValue : 0}</span>
        <span className="text-primary-500 font-sans text-3xl ml-0.5">{stat.suffix}</span>
      </div>
      <p className="text-sm font-semibold tracking-wider uppercase text-stone-500">{stat.label}</p>
    </motion.div>
  );
}
