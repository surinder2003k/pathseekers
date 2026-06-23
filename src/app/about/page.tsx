"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Compass, Award, Shield, Users, Building2, CheckCircle2, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CORE_VALUES = [
  {
    title: "Compassion & Respect",
    desc: "Nurturing empathy and respectful behavior toward all individuals, fostering a warm community.",
    icon: HeartIcon,
  },
  {
    title: "Academic Rigor",
    desc: "Encouraging a deep love for learning, critical questioning, and high intellectual standards.",
    icon: BookOpen,
  },
  {
    title: "Holistic Health",
    desc: "Promoting physical wellness, mental clarity, and emotional stability through sports and yoga.",
    icon: Compass,
  },
  {
    title: "Moral Integrity",
    desc: "Instilling deep ethical values, truthfulness, and social responsibility in every student.",
    icon: Shield,
  },
];

function HeartIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/school/8.jpg"
            alt="Pathseekers Campus"
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
            <span className="text-xs font-bold text-primary-900 tracking-wide uppercase">Discover Our Legacy</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6"
          >
            Nurturing Minds,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-500">Transforming Futures</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed"
          >
            Nestled in the serene locale of Beas, Punjab, Pathseekers is a premier CBSE-affiliated co-educational school offering holistic development from nursery to grade XII.
          </motion.p>
        </div>
      </section>

      {/* School History */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[480px] rounded-3xl overflow-hidden shadow-lg border border-stone-200"
            >
              <Image
                src="/school/3.jpg"
                alt="Pathseekers History Classroom"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block">Our Beginnings</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">A Heritage of Holistic Education</h2>
              <p className="text-stone-600 leading-relaxed text-sm">
                Pathseekers as a school recognizes the uniqueness of each child and gives children an enabling environment where they can discover their own abilities and develop as confident individuals. At Pathseekers, a child can seek his or her own path to success. We at Pathseekers, value the creativity and potential hidden in each child and try to nurture it in a secure environment. We emphasize on helping them evolve as good human beings and achieve academic excellence. We encourage our children to develop self-discipline and respect the freedom and rights of others.
              </p>
              <p className="text-stone-600 leading-relaxed text-sm">
                Pathseekers is run by the RSSB Educational & Environmental Society and is affiliated to CBSE vide Affiliation No. 1630982. Spread over an area of 25.79 acres, presently the school offers high standard of education to students of Pre-school, Primary, Middle, Secondary and Sr. Secondary sections. The school is fortunate to be situated amidst magnificent natural environment. For detailed academic schedules and announcements, parents and guardians are encouraged to reference the official <a href="https://www.pathseekers.edu.in" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:text-primary-900 underline font-semibold">Pathseekers Education Portal</a>.
              </p>
              <div className="pt-4 flex flex-wrap gap-6">
                <div>
                  <h4 className="font-serif text-3xl font-bold text-primary-850">2004</h4>
                  <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mt-1">Year Established</p>
                </div>
                <div className="border-l border-stone-200 pl-6">
                  <h4 className="font-serif text-3xl font-bold text-primary-850">CBSE</h4>
                  <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mt-1">Affiliated Board</p>
                </div>
                <div className="border-l border-stone-200 pl-6">
                  <h4 className="font-serif text-3xl font-bold text-primary-850">1002+</h4>
                  <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mt-1">Enrolled Learners</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Vision & Mission */}
      <section className="py-24 bg-stone-55 bg-[#fafaf9] border-y border-stone-250/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Our Compass</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Vision, Mission & Beliefs</h2>
          </div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/50 shadow-sm flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">Our Vision</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  To establish a dynamic learning hub that inspires students to pursue their unique interests, cultivate a lifelong commitment to wisdom, and emerge as mindful, ethical, and contributing global citizens. We view learning as a personal path of self-discovery rather than a uniform checklist.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/50 shadow-sm flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">Our Mission</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  To design and deliver a progressive CBSE curriculum that integrates core scientific discipline, digital mastery, physical resilience, and emotional intelligence. We empower students by supporting small class sizes, maintaining qualified educators, and offering advanced co-curricular opportunities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Our Pillars</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Core Beliefs & Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CORE_VALUES.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#fafaf9] p-8 rounded-2xl border border-stone-200/50 shadow-sm text-center flex flex-col items-center justify-between glow-hover"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-800 mb-5">
                  <val.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">{val.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{val.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* School Leadership */}
      <section className="py-24 bg-[#fafaf9] border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Founders & Leadership</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Guiding Leadership</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Patron */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/50 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-8 items-start glow-hover"
            >
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-primary-50 flex items-center justify-center text-primary-800 font-serif text-4xl font-bold">
                GD
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Patron</span>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">Gurvinder Singh Dhillon</h3>
                  <p className="text-xs text-stone-400 font-medium">RSSB Educational & Environmental Society</p>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed italic">
                  &ldquo;Our vision is to provide a secure and enabling environment that supports the creation of good human beings by imparting value-based education. We recognise that each child learns differently and at their own pace, and we offer a wide range of learning opportunities.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Principal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/50 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-8 items-start glow-hover"
            >
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-primary-50 flex items-center justify-center text-primary-800 font-serif text-4xl font-bold">
                SJ
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Principal</span>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">Dr. Suneeta Jasrai</h3>
                  <p className="text-xs text-stone-400 font-medium">Academic Head</p>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed italic">
                  &ldquo;We offer a dynamic approach to holistic education in a stress-free environment. Through participatory and experiential learning, our students become independent thinkers, good decision-makers, socially mature and emotionally stable individuals.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infrastructure & Accreditations */}
      <section className="py-24 bg-white border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block">Campus Architecture</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Modern Infrastructure</h2>
              <p className="text-stone-600 leading-relaxed text-sm">
                Spanning across a green campus, Pathseekers houses fully air-conditioned smart classrooms, state-of-the-art physics, chemistry, biology and robotics labs, an expansive digital library, and dedicated spaces for arts and physical culture.
              </p>
              <div className="space-y-3">
                {[
                  "Lush green environment promoting psychological wellness",
                  "24/7 security with smart cameras and emergency protocols",
                  "Advanced ICT resource labs with personal computing access",
                  "Modern cafeteria serving nutritious vegetarian food"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0" />
                    <span className="text-sm text-stone-750 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="relative h-48 rounded-2xl overflow-hidden shadow">
                <Image
                  src="/school/6.jpg"
                  alt="Science Lab"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden shadow">
                <Image
                  src="/school/6.jpg"
                  alt="Library"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden shadow">
                <Image
                  src="/school/8.jpg"
                  alt="Classroom"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden shadow bg-primary-900 text-white p-6 flex flex-col justify-between">
                <Building2 className="w-8 h-8 text-primary-200" />
                <div>
                  <h4 className="font-serif font-bold text-lg">CBSE Code</h4>
                  <p className="text-xs text-primary-200 mt-0.5">Affiliation: 1630982</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-50 border-t border-stone-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-10 sm:p-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10 text-white">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Experience Pathseekers Firsthand</h2>
            <p className="text-primary-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Discover how our values, infrastructure, and academic wings collaborate to carve out a personalized pathway for your child.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 border border-white/40 text-white hover:bg-white/10 font-bold rounded-full transition-all text-center tracking-wide flex items-center justify-center gap-2"
              >
                Contact Admissions
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
