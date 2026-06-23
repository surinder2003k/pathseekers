"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Download, Award, Newspaper, ArrowRight, BellRing, Compass, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NOTICES = [
  {
    date: "June 20, 2026",
    title: "Summer Vacation Schedule & Homework Portal",
    desc: "Summer vacations will commence from June 25 to July 31, 2026. Grade-wise holiday homework sheets are available under the downloads section below.",
    badge: "Holiday"
  },
  {
    date: "June 18, 2026",
    title: "CBSE Supplementary Exam Registration (Class X & XII)",
    desc: "Eligible students wanting to register for CBSE improvement exams must fill out the form at the front registrar office before June 28.",
    badge: "CBSE Board"
  },
  {
    date: "June 10, 2026",
    title: "Inter-House Debate Competition Shortlist",
    desc: "The shortlist for the senior Inter-House debating teams has been announced on the main board. Practice sessions are scheduled daily during 7th period.",
    badge: "Competitions"
  }
];

const RESOURCES = [
  {
    title: "Holiday Homework Sheets 2026",
    category: "Assignments",
    size: "1.4 MB",
    icon: BookOpen,
    href: "https://www.pathseekers.edu.in"
  },
  {
    title: "Official School Calendar 2026-27",
    category: "Academic Calendar",
    size: "2.1 MB",
    icon: Calendar,
    href: "https://www.pathseekers.edu.in"
  },
  {
    title: "Class I - XII CBSE Board Syllabus",
    category: "Syllabus Core",
    size: "3.5 MB",
    icon: BookOpen,
    href: "https://www.pathseekers.edu.in"
  },
  {
    title: "Smart Lab Safety Standard Handbook",
    category: "Lab Manuals",
    size: "940 KB",
    icon: Shield,
    href: "https://www.pathseekers.edu.in"
  }
];

const STUDENT_ACHIEVEMENTS = [
  {
    title: "Aanya Gupta wins Punjab Junior Chess Championship",
    detail: "Aanya Gupta of Class VIII secured 1st position in the U-14 category of the Punjab Chess Championship and earned eligibility for nationals.",
    image: "/school/chemistry1.jpg"
  },
  {
    title: "Solar Agro-Bot secures 1st prize at Zonal Fair",
    detail: "Class X Science team developed a low-cost, soil-sensing automatic irrigator that won the 1st prize at the CBSE regional technology display.",
    image: "/school/robotics1.jpg"
  }
];

export default function StudentsCornerPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/school/robotics2.jpg"
            alt="Students Corner"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-10 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/80 via-accent-cream/60 to-white"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-primary-200 rounded-full shadow-sm mb-6"
          >
            <Compass className="w-4 h-4 text-primary-700" />
            <span className="text-xs font-bold text-primary-900 tracking-wide uppercase">Student Resource Hub</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6"
          >
            Students <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-500">Corner</span> &amp;<br />
            Notice Board.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed"
          >
            Access general notices, homework assignments, downloadable curricula, and stay updated with student awards without requiring a login.
          </motion.p>
        </div>
      </section>

      {/* Notice Board */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 justify-center mb-16">
            <BellRing className="w-6 h-6 text-primary-700 animate-bounce" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Active Notice Board</h2>
          </div>

          <div className="space-y-6">
            {NOTICES.map((notice, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#fafaf9] p-8 rounded-3xl border border-stone-200/50 shadow-sm glow-hover relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="text-xs text-stone-400 font-bold">{notice.date}</span>
                  <span className="inline-block px-2.5 py-0.5 bg-primary-100 text-primary-800 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {notice.badge}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">{notice.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{notice.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Download Center */}
      <section className="py-24 bg-[#fafaf9] border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Resource Library</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Academic Downloads</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {RESOURCES.map((res, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-stone-200/40 shadow-sm flex flex-col justify-between glow-hover group"
              >
                <div>
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-750 mb-5 group-hover:bg-primary-200 transition-colors">
                    <res.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">{res.category}</span>
                  <h3 className="font-serif text-sm font-bold text-stone-900 mt-1 mb-2 group-hover:text-primary-800 transition-colors">{res.title}</h3>
                  <span className="text-[10px] text-stone-400 font-semibold">{res.size}</span>
                </div>
                <a
                  href={res.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center gap-1 text-xs font-bold text-primary-750 hover:text-primary-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download File
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Co-curricular Awards */}
      <section className="py-24 bg-white border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Student Spotlights</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Student Co-Curricular Awards</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {STUDENT_ACHIEVEMENTS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#fafaf9] p-8 rounded-3xl border border-stone-200/50 flex flex-col sm:flex-row gap-6 glow-hover group"
              >
                <div className="relative w-full sm:w-36 h-36 rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 150px"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center mb-4 text-primary-800">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-50 border-t border-stone-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-10 sm:p-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10 text-white">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Submit Student Contributions</h2>
            <p className="text-primary-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              If your child has secured awards in district tournaments, state chess leagues, or olympiads, submit the verification form to our helpdesk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary-900 font-bold rounded-full shadow hover:bg-stone-50 transition-all text-center tracking-wide"
              >
                Inquire Helpdesk
              </Link>
              <Link
                href="/gallery"
                className="w-full sm:w-auto px-8 py-3.5 border border-white/40 text-white hover:bg-white/10 font-bold rounded-full transition-all text-center tracking-wide flex items-center justify-center gap-2"
              >
                View Campus Gallery
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
