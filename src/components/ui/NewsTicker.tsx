// Pure CSS marquee — zero JS, zero forced reflow, zero main-thread work
const NEWS_ITEMS = [
  "Admissions open for Academic Session 2026-27. Contact administration for details.",
  "Annual Sports Meet scheduled for 15th November 2025.",
  "CBSE Class X and XII Results declared - 100% Pass Rate!",
  "Parent-Teacher Meeting for Middle Section on coming Saturday.",
  "Affiliated to CBSE | Affiliation No. 1630982",
];

export default function NewsTicker() {
  // Duplicate for seamless loop
  const doubled = [...NEWS_ITEMS, ...NEWS_ITEMS];

  return (
    <div className="bg-primary-900 text-white text-[11px] sm:text-xs font-semibold py-2 overflow-hidden relative flex items-center">
      <div className="absolute left-0 bg-primary-900 z-10 px-4 sm:px-6 h-full flex items-center shadow-[15px_0_15px_-5px_rgba(1,28,60,1)] uppercase tracking-widest text-accent-gold font-bold">
        📢 Updates
      </div>
      <div className="flex whitespace-nowrap pl-32 sm:pl-40 news-ticker-track">
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
