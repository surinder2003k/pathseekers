"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Star, Award, Compass, CheckCircle2, ChevronRight, GraduationCap, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const INITIATIVES = [
  {
    title: "Foundational Literacy & Numeracy (FLN)",
    tagline: "NEP 2020 Framework",
    desc: "A comprehensive initiative targeting Classes I to III, ensuring that every child achieves mastery in basic phonics, expression, reading comprehension, and math operations through play-based concrete utilities.",
    image: "/school/chemistry1.jpg"
  },
  {
    title: "Drop Everything And Read (DEAR)",
    tagline: "Cultivating Reading Habit",
    desc: "A silent reading program scheduled twice a week where every individual on campus (students, staff, visitors) pauses all activities for 20 minutes to read a book of choice, fostering an immersive literacy culture.",
    image: "/school/robotics1.jpg"
  },
  {
    title: "Special Education Cell",
    tagline: "Inclusive Classrooms",
    desc: "Dedicated cell consisting of trained special educators and behavioral therapists addressing learning differences and providing individual educational plans (IEPs) within mainstream modules.",
    image: "/school/chemistry1.jpg"
  }
];

const WINGS = [
  {
    title: "Primary Wing (Class I-V)",
    focus: "Experiential Play-Way Learning",
    subjects: ["English Phonics", "Mathematics (Concrete Labs)", "Environmental Studies", "Punjabi", "Hindi", "Fine Arts & Music"]
  },
  {
    title: "Middle Wing (Class VI-VIII)",
    focus: "Inquiry & Application-Based STEM",
    subjects: ["English Literature", "Mathematics & Coding", "General Sciences", "Social Sciences", "Punjabi / Hindi", "Robotics & Design Thinking"]
  },
  {
    title: "Secondary Level (Class IX-X)",
    focus: "Rigorous Board Preparation",
    subjects: [
      "Languages: English, Punjabi, Hindi",
      "Main: Mathematics (Std & Basic), Science, Social Sciences",
      "Electives: Computer App, Painting, Music, Food Production",
      "Co-Scholastic: Art Ed (Cooking, Carpentry), Health & PE"
    ]
  }
];

export default function AcademicsPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/school/robotics1.jpg"
            alt="Pathseekers Class"
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
            <GraduationCap className="w-4 h-4 text-primary-700" />
            <span className="text-xs font-bold text-primary-900 tracking-wide uppercase">CBSE Curriculum Framework</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6"
          >
            Educational <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-500">Initiatives</span><br />
            &amp; Curriculum.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed"
          >
            Following standard CBSE guidelines, we focus on experiential learning and character growth across primary, middle, and senior secondary blocks.
          </motion.p>
        </div>
      </section>

      {/* CBSE Curriculum & Wings */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Structure of Studies</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Academic Wings</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {WINGS.map((wing, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-[#fafaf9] p-8 rounded-3xl border border-stone-200/50 shadow-sm flex flex-col justify-between glow-hover"
              >
                <div>
                  <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{wing.focus}</span>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mt-2 mb-6">{wing.title}</h3>
                  <div className="space-y-3.5">
                    {wing.subjects.map((sub, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-stone-750">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Results Overview */}
      <section className="py-24 bg-stone-900 text-white border-y border-stone-850">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-300 uppercase tracking-widest block mb-2">Excellence in Numbers</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">CBSE Board Results</h2>
            <p className="text-stone-400 text-sm mt-3 max-w-md mx-auto">
              Our batch toppers continue to secure centums and get placed in premier technology, medical, and liberal arts universities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Class XII */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-stone-800 rounded-3xl border border-stone-700/50 flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-md text-[10px] font-bold uppercase tracking-wider mb-4">
                  Class XII Highlights
                </span>
                <h3 className="font-serif text-xl font-bold text-white mb-6">Class XII Senior Secondary</h3>
                <div className="space-y-4 text-sm text-stone-300">
                  <div className="flex justify-between border-b border-stone-700/40 pb-2">
                    <span>Total Pass Rate</span>
                    <strong className="text-white">100%</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-700/40 pb-2">
                    <span>Highest Merit Score</span>
                    <strong className="text-white">98.4% (Science)</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-700/40 pb-2">
                    <span>Students Above 90%</span>
                    <strong className="text-white">28 Students</strong>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span>Distinctions Scored</span>
                    <strong className="text-white">85%+ of Batch</strong>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Class X */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-stone-800 rounded-3xl border border-stone-700/50 flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-md text-[10px] font-bold uppercase tracking-wider mb-4">
                  Class X Highlights
                </span>
                <h3 className="font-serif text-xl font-bold text-white mb-6">Class X Secondary Board</h3>
                <div className="space-y-4 text-sm text-stone-300">
                  <div className="flex justify-between border-b border-stone-700/40 pb-2">
                    <span>Total Pass Rate</span>
                    <strong className="text-white">100%</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-700/40 pb-2">
                    <span>Highest Merit Score</span>
                    <strong className="text-white">97.8%</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-700/40 pb-2">
                    <span>Students Above 90%</span>
                    <strong className="text-white">34 Students</strong>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span>Distinctions Scored</span>
                    <strong className="text-white">90%+ of Batch</strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Educational Initiatives */}
      <section className="py-24 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Innovative Pedagogy</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Educational Initiatives</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {INITIATIVES.map((init, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-stone-200/50 shadow-sm overflow-hidden flex flex-col justify-between glow-hover"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={init.image}
                    alt={init.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent"></div>
                  <span className="absolute bottom-4 left-6 text-xs text-primary-200 font-bold uppercase tracking-wider">
                    {init.tagline}
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-3">{init.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{init.desc}</p>
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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Empower Your Child's Future</h2>
            <p className="text-primary-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Admissions are open for the upcoming academic session. Explore our step-by-step admission process or query fees.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.pathseekers.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary-900 hover:bg-primary-50 font-bold rounded-full transition-all text-center tracking-wide shadow-md flex items-center justify-center gap-2"
              >
                Online Registration Portal
                <ChevronRight className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 border border-white/40 text-white hover:bg-white/10 font-bold rounded-full transition-all text-center tracking-wide flex items-center justify-center gap-2"
              >
                Inquire Now
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
