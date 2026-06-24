"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Users, GraduationCap, Award, BookOpen, Mail, Compass } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const DEPARTMENTS = [
  { id: "heads", label: "Department Heads" },
  { id: "science", label: "Science & Mathematics" },
  { id: "humanities", label: "Humanities & Languages" },
  { id: "support", label: "Support & Administrative" }
];

const STAFF_MEMBERS = [
  {
    name: "Dr. Vikram Chawla",
    role: "Head of Science Department",
    dept: "heads",
    qualifications: "Ph.D. in Physics, M.Sc. (Hons)",
    exp: "14 Years",
    initials: "VC",
    email: "xxx.science@pathseekers.edu.in",
  },
  {
    name: "Mrs. Harleen Dhillon",
    role: "Head of Mathematics Department",
    dept: "heads",
    qualifications: "M.Sc. Mathematics, B.Ed.",
    exp: "12 Years",
    initials: "HD",
    email: "xxx.maths@pathseekers.edu.in",
  },
  {
    name: "Mr. Deepak Thakur",
    role: "Head of Humanities Wing",
    dept: "heads",
    qualifications: "M.A. History, B.Ed. (Gold Medallist)",
    exp: "10 Years",
    initials: "DT",
    email: "xxx.humanities@pathseekers.edu.in",
  },
  {
    name: "Mrs. Rupinder Bedi",
    role: "Senior Chemistry Educator",
    dept: "science",
    qualifications: "M.Sc. Organic Chemistry, B.Ed.",
    exp: "8 Years",
    initials: "RB",
    email: "xxx.chem@pathseekers.edu.in",
  },
  {
    name: "Mr. Parveen Kumar",
    role: "Senior Biology Teacher",
    dept: "science",
    qualifications: "M.Sc. Botany, B.Ed.",
    exp: "9 Years",
    initials: "PK",
    email: "xxx.bio@pathseekers.edu.in",
  },
  {
    name: "Mr. Sahil Verma",
    role: "ICT & Robotics Lab Coordinator",
    dept: "science",
    qualifications: "B.Tech Computer Science, MCA",
    exp: "7 Years",
    initials: "SV",
    email: "xxx.ict@pathseekers.edu.in",
  },
  {
    name: "Mrs. Anita Kapoor",
    role: "Senior English Language Teacher",
    dept: "humanities",
    qualifications: "M.A. English Literature, B.Ed.",
    exp: "11 Years",
    initials: "AK",
    email: "xxx.english@pathseekers.edu.in",
  },
  {
    name: "Mr. Ravinder Pal",
    role: "Senior Punjabi & Cultural Studies Coordinator",
    dept: "humanities",
    qualifications: "M.A. Punjabi, M.Phil.",
    exp: "15 Years",
    initials: "RP",
    email: "xxx.punjabi@pathseekers.edu.in",
  },
  {
    name: "Mrs. Sunita Rana",
    role: "Senior Social Science Teacher",
    dept: "humanities",
    qualifications: "M.A. Geography, B.Ed.",
    exp: "6 Years",
    initials: "SR",
    email: "xxx.sst@pathseekers.edu.in",
  },
  {
    name: "Mr. Tejinder Bajwa",
    role: "Administrative Registrar & TC Desk",
    dept: "support",
    qualifications: "MBA in Operations, B.Com",
    exp: "16 Years",
    initials: "TB",
    email: "xxx.admin@pathseekers.edu.in",
  },
  {
    name: "Mrs. Kamaljit Sodhi",
    role: "Special Educator & Behavioural Therapist",
    dept: "support",
    qualifications: "M.Ed. in Special Education",
    exp: "9 Years",
    initials: "KS",
    email: "xxx.specialcell@pathseekers.edu.in",
  },
  {
    name: "Mr. Jaspal Gill",
    role: "Sports Academy Head Coach",
    dept: "support",
    qualifications: "B.P.Ed, National Athlete (Kabaddi)",
    exp: "12 Years",
    initials: "JG",
    email: "xxx.sports@pathseekers.edu.in",
  }
];

export default function FacultyPage() {
  const [activeTab, setActiveTab] = useState("heads");

  const filteredStaff = STAFF_MEMBERS.filter(s => s.dept === activeTab);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/school/6.jpg"
            alt="Pathseekers Faculty"
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
            <Users className="w-4 h-4 text-primary-700" />
            <span className="text-xs font-bold text-primary-900 tracking-wide uppercase">Dedicated Educators</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6"
          >
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-500">Mentors</span><br />
            &amp; Specialists.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed"
          >
            A high student-teacher ratio allows our highly qualified, values-driven academic mentors to guide learners individually.
          </motion.p>
        </div>
      </section>

      {/* Tabs Selector */}
      <section className="py-12 bg-white border-y border-stone-200/50 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeTab === dept.id
                    ? "bg-gradient-to-r from-primary-800 to-primary-600 text-white shadow-md border-transparent scale-105"
                    : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Grid List */}
      <section className="py-24 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredStaff.map((staff, idx) => (
                <motion.div
                  key={staff.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-8 rounded-3xl border border-stone-200/50 shadow-sm flex flex-col justify-between glow-hover group"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-800 font-bold text-lg font-serif">
                        {staff.initials}
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-primary-800 transition-colors">
                          {staff.name}
                        </h3>
                        <p className="text-xs text-primary-600 font-semibold uppercase tracking-wider">{staff.role}</p>
                      </div>
                    </div>

                    <div className="space-y-3.5 text-xs text-stone-500 pt-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4.5 h-4.5 text-primary-600 shrink-0" />
                        <span><strong>Qualifications:</strong> {staff.qualifications}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4.5 h-4.5 text-primary-600 shrink-0" />
                        <span><strong>Teaching Experience:</strong> {staff.exp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4.5 h-4.5 text-primary-600 shrink-0" />
                        <a href={`mailto:${staff.email}`} className="hover:underline text-stone-600">
                          {staff.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Join the team CTA */}
      <section className="py-20 bg-stone-50 border-t border-stone-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-10 sm:p-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10 text-white">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Want to Join Our Academic Wing?</h2>
            <p className="text-primary-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              We are constantly seeking passionate, qualified CBSE mentors, counselors, and administrative leaders to expand our departments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary-900 font-bold rounded-full shadow hover:bg-stone-50 transition-all text-center tracking-wide"
              >
                Inquire Careers
              </Link>
              <a
                href="mailto:school_beas@pathseekers.education"
                className="w-full sm:w-auto px-8 py-3.5 border border-white/40 text-white hover:bg-white/10 font-bold rounded-full transition-all text-center tracking-wide"
              >
                Submit Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
