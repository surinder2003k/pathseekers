import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Shield, GraduationCap, Award, Compass, Heart, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatsCounter from "@/components/ui/StatsCounter";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

// Facilities list
const FACILITIES = [
  {
    title: "Hi-Tech Science Labs",
    desc: "Fully equipped Physics, Chemistry, and Biology laboratories encouraging hands-on experimentation.",
    image: "/school/chemistry1.jpg",
    icon: Compass,
  },
  {
    title: "Modern Resource Library",
    desc: "A library housing over 15,000 volumes, journals, and a digital research section supporting DEAR time.",
    image: "/school/3.jpg",
    icon: BookOpen,
  },
  {
    title: "School Assembly & Athletics",
    desc: "Spacious assembly grounds and modern athletic facilities.",
    image: "/school/6.jpg",
    icon: Shield,
  },
  {
    title: "Advanced ICT Classrooms",
    desc: "Smart boards, high-speed Wi-Fi, and individual computing resources to enable modern digital education.",
    image: "/school/robotics1.jpg",
    icon: GraduationCap,
  }
];

// Testimonials
const TESTIMONIALS = [
  {
    text: "Pathseekers has given my children not just academic skills, but the confidence to express themselves. The focus on values is what makes it unique.",
    author: "Mrs. Harpreet Kaur",
    role: "Parent of Class X Student"
  },
  {
    text: "The individual attention here is phenomenal. My daughter got placed in one of the top universities in Punjab, and we owe it all to the dedicated staff.",
    author: "Mr. Rajinder Singh",
    role: "Parent of Alumna"
  },
  {
    text: "As a student, I loved the DEAR initiative. It inculcated a reading habit in me that has helped me immensely in my university education.",
    author: "Arshpreet Kaur",
    role: "Alumna (Science Batch Topper)"
  }
];

export default async function Home() {
  // Fetch latest 3 published blog posts
  const latestBlogs = await db.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 3
  });

  const stats = [
    { value: 78, suffix: "+", label: "Experienced Teachers" },
    { value: 611, suffix: "+", label: "Enrolled Students" },
    { value: 24, suffix: "/7", label: "CCTV & Security" },
    { value: 61, suffix: "+", label: "University Placements" },
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-stone-900">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          >
            <source src="https://www.pathseekers.edu.in/videos/virtual%20tour.mp4" type="video/mp4" />
            <track kind="captions" srcLang="en" label="English" default />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/70 via-accent-cream/50 to-white"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
          {/* CBSE Result Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-primary-200 rounded-full shadow-sm mb-8 animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-600"></span>
            <span className="text-xs font-bold text-primary-900 tracking-wide uppercase">
              CBSE Affiliation No: 1630982 • Class X & XII Board Results: 100% Pass Rate!
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-stone-900 tracking-tight leading-tight mb-6 max-w-4xl mx-auto">
            Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-500">path</span>,<br />
            Create your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-500">future</span>.
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Pathseekers, located in Beas, Punjab, offers a premium learning environment designed to nurture curiosity, critical thinking, and character development.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 rounded-full font-bold shadow-sm hover:scale-105 transition-all text-center tracking-wide"
            >
              Learn Our Legacy
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="relative z-20 -mt-16 pb-16 bg-gradient-to-b from-transparent to-white">
        <StatsCounter stats={stats} />
      </section>

      {/* Notice Board & Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-stone-200/50 shadow-sm overflow-hidden flex flex-col lg:flex-row">
            {/* Notice Board */}
            <div className="lg:w-1/3 bg-[#fafaf9] border-r border-stone-200/50">
              <div className="bg-primary-900 p-6 text-white flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-accent-gold" />
                  Notice Board
                </h2>
              </div>
              <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                {[
                  { date: "Oct 25", title: "Admissions Open for Session 2026-27" },
                  { date: "Oct 20", title: "Winter Vacation Schedule Released" },
                  { date: "Oct 15", title: "Annual Sports Meet Guidelines" },
                  { date: "Oct 10", title: "CBSE Registration for Class IX & XI" },
                  { date: "Oct 05", title: "Parent-Teacher Meeting (Middle Wing)" },
                  { date: "Sep 28", title: "Inter-School Debate Competition" },
                ].map((notice, idx) => (
                  <div key={idx} className="flex gap-4 items-start border-b border-stone-200 pb-4 last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-white rounded-xl flex flex-col items-center justify-center shrink-0 border border-stone-200 text-primary-800 shadow-sm">
                      <span className="text-[10px] font-bold uppercase text-stone-500">{notice.date.split(' ')[0]}</span>
                      <span className="text-sm font-bold">{notice.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-800 text-sm hover:text-primary-600 cursor-pointer transition-colors">{notice.title}</h4>
                      <span className="text-[10px] text-primary-600 uppercase tracking-widest mt-1.5 flex items-center gap-1 font-bold cursor-pointer">
                        View Notice <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Welcome Text & Image */}
            <div className="lg:w-2/3 p-8 sm:p-12 flex flex-col justify-center">
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-3">Welcome to Pathseekers</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-6">A Journey of Excellence</h2>
              <p className="text-stone-600 leading-relaxed text-sm mb-6">
                Pathseekers as a school recognizes the uniqueness of each child and gives children an enabling environment where they can discover their own abilities and develop as confident individuals. Spread over an area of 25.79 acres, presently the school offers high standard of education to students of Pre-school, Primary, Middle, Secondary and Sr. Secondary sections. To know more about our official academic guidelines and admissions calendar, visit the official <a href="https://www.pathseekers.edu.in" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:text-primary-900 underline font-semibold">Pathseekers School Portal</a>.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="relative h-40 rounded-2xl overflow-hidden shadow-sm">
                  <Image src="/school/chemistry1.jpg" alt="Pathseekers students performing chemistry experiments in CBSE-standard laboratory at Beas Punjab" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform" />
                </div>
                <div className="relative h-40 rounded-2xl overflow-hidden shadow-sm">
                  <Image src="/school/robotics1.jpg" alt="Pathseekers School campus modern infrastructure and robotics lab in Beas Punjab" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Messages wing (Principal & Patron) */}
      <section className="py-20 bg-stone-50 border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">School Leadership</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Guiding Visionary Minds</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Principal's Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/50 shadow-sm relative overflow-hidden flex flex-col justify-between glow-hover">
              <div className="mb-8">
                <span className="text-6xl font-serif text-primary-200 absolute top-4 left-6 select-none opacity-50">“</span>
                <p className="text-stone-600 leading-relaxed italic text-base relative z-10 pl-6 mb-6">
                  Pathseekers offers a dynamic approach to holistic education in a stress-free environment. Through participatory and experiential learning, we help students become independent thinkers, good decision-makers, socially mature, emotionally stable, and confident individuals rooted in values of love, respect, compassion, and tolerance.
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-stone-100 pt-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-800">SJ</div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900">Dr. Suneeta Jasrai</h4>
                  <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider">Principal, Pathseekers</p>
                </div>
              </div>
            </div>

            {/* Patron's Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/50 shadow-sm relative overflow-hidden flex flex-col justify-between glow-hover">
              <div className="mb-8">
                <span className="text-6xl font-serif text-primary-200 absolute top-4 left-6 select-none opacity-50">“</span>
                <p className="text-stone-600 leading-relaxed italic text-base relative z-10 pl-6 mb-6">
                  Our vision is to provide a secure and enabling environment that supports the creation of Good Human Beings. We believe every child is unique — their traits need to be respected, encouraged, fostered and developed through love, value-based education, and a diverse range of learning opportunities.
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-stone-100 pt-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-800">GD</div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900">Gurvinder Singh Dhillon</h4>
                  <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider">Patron, Pathseekers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Statement */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Our Foundation</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-12">Vision & Mission</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 bg-[#fafaf9] rounded-2xl border border-stone-200/60 flex gap-4">
              <Compass className="w-10 h-10 text-primary-700 shrink-0" />
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">Our Vision</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  To build a nurturing educational community that inspires students to find their individual path, develop a passion for lifelong learning, and emerge as responsible global citizens.
                </p>
              </div>
            </div>
            <div className="p-8 bg-[#fafaf9] rounded-2xl border border-stone-200/60 flex gap-4">
              <Award className="w-10 h-10 text-primary-700 shrink-0" />
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">Our Mission</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  To provide an advanced, balanced curriculum merging STEM innovation, physical development, and moral ethics in a secure environment supported by modern infrastructure and trained faculty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities highlights */}
      <section className="py-24 bg-[#fafaf9] border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">World-Class Infrastructure</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Modern Campus Facilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FACILITIES.map((fac, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-stone-200/40 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={fac.image}
                    alt={`${fac.title} facility at Pathseekers School Beas Punjab`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 p-2 bg-white/95 rounded-xl shadow-sm text-primary-800">
                    <fac.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">{fac.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-primary-300 uppercase tracking-widest block mb-2">Feedback & Reviews</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-16">What Parents & Alumni Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-8 bg-stone-800 rounded-2xl border border-stone-700/50 text-left flex flex-col justify-between">
                <p className="text-stone-300 text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div>
                  <h4 className="font-serif font-bold text-white text-base">{t.author}</h4>
                  <p className="text-xs text-primary-400 font-medium mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Achievements Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">School Journal</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Latest News & Articles</h2>
            </div>
            <Link
              href="/blog"
              className="mt-4 sm:mt-0 flex items-center gap-1.5 text-sm font-bold text-primary-800 hover:text-primary-600 transition-colors"
            >
              View All Stories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map((blog: any) => (
              <article key={blog.id} className="bg-white border border-stone-200/50 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    {blog.featuredImage && (
                      <Image
                        src={blog.featuredImage}
                        alt={`${blog.title} - Pathseekers School Beas Punjab blog article`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-2.5 py-0.5 bg-primary-50 text-primary-800 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3">
                      {blog.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-stone-900 line-clamp-2 mb-2 group-hover:text-primary-800 transition-colors">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-3 mb-4">{blog.excerpt}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-stone-100 text-[11px] text-stone-600 font-medium">
                  <span>{formatDate(blog.publishedAt)}</span>
                  <span>{blog.views} Views</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-stone-50 border-t border-stone-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-10 sm:p-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Begin Your Journey?</h2>
            <p className="text-primary-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Admissions are open for the academic session 2026-27. Secure your child's placement in Beas' leading CBSE school today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary-900 font-bold rounded-full shadow-md hover:bg-stone-50 transition-all text-center tracking-wide"
              >
                Contact Us
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 border border-white/40 text-white hover:bg-white/10 font-bold rounded-full transition-all text-center tracking-wide"
              >
                Request Prospectus
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
