import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notice Board | Pathseekers School",
  description: "Latest notices, circulars, and updates from Pathseekers School, Beas, Punjab.",
};

const NOTICES = [
  { date: "Oct 25, 2026", title: "Admissions Open for Session 2026-27", desc: "We are officially accepting applications for the upcoming academic session. Apply online through the school portal." },
  { date: "Oct 20, 2026", title: "Winter Vacation Schedule Released", desc: "The winter vacation will commence from the last week of December. Please check the detailed circular for exact dates." },
  { date: "Oct 15, 2026", title: "Annual Sports Meet Guidelines", desc: "All participants must register with their respective house captains by the end of this month." },
  { date: "Oct 10, 2026", title: "CBSE Registration for Class IX & XI", desc: "Parents are requested to submit the LOC forms and fee for the CBSE board registration by next Friday." },
  { date: "Oct 05, 2026", title: "Parent-Teacher Meeting (Middle Wing)", desc: "The PTM for classes VI to VIII will be held this Saturday. Timings will be shared via SMS." },
  { date: "Sep 28, 2026", title: "Inter-School Debate Competition", desc: "Congratulations to the senior debate team for securing the first runner-up position at the zonal level." },
];

export default function NoticeBoardPage() {
  return (
    <>
      <Navbar />
      
      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden bg-primary-900/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-12 h-12 text-accent-gold mx-auto mb-4" />
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Notice Board
          </h1>
          <p className="text-primary-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Stay updated with the latest circulars, event schedules, and important announcements from Pathseekers School.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-[#fafaf9] min-h-[50vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {NOTICES.map((notice, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 w-24 h-24 bg-primary-50 rounded-xl flex flex-col items-center justify-center border border-primary-100 text-primary-800">
                  <Calendar className="w-6 h-6 mb-2 opacity-80" />
                  <span className="text-xs font-bold uppercase">{notice.date.split(',')[0]}</span>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">{notice.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">{notice.desc}</p>
                  <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-800 uppercase tracking-wider transition-colors w-fit">
                    Contact Office for Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
