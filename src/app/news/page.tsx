import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, Medal, Star, Newspaper, Calendar, BookOpen, Target, Flame, Award, TrendingUp, Volleyball } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "News & Achievements | Pathseekers",
  description: "Stay updated with the latest news, achievements, academic milestones, and sports victories from Pathseekers School, Beas.",
};

const RECENT_ACHIEVEMENTS = [
  {
    title: "100% Pass Rate — CBSE Class X & XII Board Exams 2026",
    description: "All 127 students of Class X and 84 students of Class XII passed with distinction, continuing the school's unbroken streak of 100% results for the fifth consecutive year.",
    icon: Trophy,
    color: "bg-amber-100 text-amber-700",
    tag: "Board Results",
  },
  {
    title: "Gold Medal — National Science Olympiad (NSO)",
    description: "Ananya Sharma of Class IX secured a national Gold Medal in the NSO conducted by SOF, ranking among the top 50 students in India.",
    icon: Medal,
    color: "bg-emerald-100 text-emerald-700",
    tag: "Olympiad",
  },
  {
    title: "1st Prize — CBSE Regional Science Exhibition",
    description: "Our team's project on 'Solar-Powered Water Purification for Rural Punjab' won the 1st prize at the CBSE Regional Science Exhibition held in Chandigarh.",
    icon: Star,
    color: "bg-blue-100 text-blue-700",
    tag: "Science Fair",
  },
  {
    title: "State Topper — International Mathematics Olympiad",
    description: "Gurveer Singh of Class XI emerged as the Punjab State Topper in the IMO, securing a national rank of 23 and an international Silver Medal.",
    icon: Award,
    color: "bg-purple-100 text-purple-700",
    tag: "Olympiad",
  },
  {
    title: "Best School Award — Amritsar District Education Summit",
    description: "Pathseekers was honoured with the 'Best School in Holistic Education' award at the annual Amritsar District Education Summit 2026.",
    icon: Trophy,
    color: "bg-rose-100 text-rose-700",
    tag: "Institutional",
  },
  {
    title: "3 Students Selected for NTSE Scholarship",
    description: "Aarav Kapoor, Manpreet Kaur, and Rohan Gill from Class X have been awarded the prestigious NTSE Scholarship by NCERT for academic excellence.",
    icon: Target,
    color: "bg-sky-100 text-sky-700",
    tag: "Scholarship",
  },
];

const NEWS_TIMELINE = [
  {
    date: "June 12, 2026",
    title: "Annual Day Celebrations Conclude with Grand Cultural Show",
    summary: "Over 400 students participated in theatrical performances, folk dances, and musical acts. Chief Guest Hon'ble MLA Sh. Bikram Singh praised the school's emphasis on cultural heritage.",
  },
  {
    date: "May 28, 2026",
    title: "New Smart Classrooms Inaugurated in Senior Block",
    summary: "12 state-of-the-art interactive smart classrooms equipped with 75-inch touchscreen displays and AI-powered learning aids were inaugurated by the school patron.",
  },
  {
    date: "April 15, 2026",
    title: "CBSE Board Results: School Achieves Record Aggregate",
    summary: "Average aggregate in Class XII reached 87.3%, the highest in school history. Six students scored above 95% in the Science stream.",
  },
  {
    date: "March 22, 2026",
    title: "Earth Day Tree Plantation Drive Covers 5 Acres",
    summary: "Students, staff, and alumni planted over 1,200 saplings on the school campus and surrounding Beas areas as part of the annual Green Pathseekers initiative.",
  },
  {
    date: "February 8, 2026",
    title: "Inter-School Debate Championship — Pathseekers Wins",
    summary: "Our senior debating team won the Amritsar Zonal Inter-School Debate Championship, defeating 24 schools. Riya Malhotra of Class XI was adjudged Best Speaker.",
  },
  {
    date: "January 26, 2026",
    title: "Republic Day Celebration with NCC Parade",
    summary: "The school NCC cadets presented a spectacular parade and drill display. Guest of Honour, Brigadier S. K. Grewal (Retd.), lauded the cadets' discipline and patriotism.",
  },
];

const MEDIA_COVERAGE = [
  {
    outlet: "The Tribune, Chandigarh",
    headline: "Pathseekers School Beas Sets New Benchmark in CBSE Results",
    date: "April 2026",
    excerpt: "The Tribune covered Pathseekers' record-breaking Class XII results, highlighting the school's innovative teaching methodology and low student-teacher ratio.",
  },
  {
    outlet: "Dainik Jagran",
    headline: "ਬਿਆਸ ਦੇ ਪਾਥਸੀਕਰਜ਼ ਸਕੂਲ ਨੇ ਸਾਇੰਸ ਓਲੰਪੀਅਡ ਵਿੱਚ ਗੋਲਡ ਮੈਡਲ ਜਿੱਤਿਆ",
    date: "March 2026",
    excerpt: "The leading Punjabi daily highlighted the school's Science Olympiad gold medallist and the growing trend of competitive exam success from tier-2 towns.",
  },
  {
    outlet: "Education World Magazine",
    headline: "Emerging Schools to Watch: Pathseekers, Beas",
    date: "February 2026",
    excerpt: "Education World featured Pathseekers in its annual 'Emerging Schools' segment, praising its campus security, STEM infrastructure, and value-based education.",
  },
];

const SPORTS_ACHIEVEMENTS = [
  {
    sport: "Athletics",
    achievement: "District Gold — 200m Sprint (Boys U-17)",
    athlete: "Jashandeep Singh, Class XI",
    detail: "Won gold at the Amritsar District Athletics Meet and qualified for the Punjab State Championship.",
  },
  {
    sport: "Kabaddi",
    achievement: "Zonal Champions — CBSE Cluster Kabaddi",
    athlete: "Boys U-19 Team",
    detail: "Defeated teams from 16 schools across the Chandigarh zone to clinch the CBSE Cluster Championship title.",
  },
  {
    sport: "Chess",
    achievement: "State Runner-Up — Punjab Under-14 Chess Championship",
    athlete: "Aanya Gupta, Class VIII",
    detail: "Finished second in the U-14 category and earned a rating of 1450+ in the FIDE Junior Elo system.",
  },
  {
    sport: "Basketball",
    achievement: "Inter-School Champions — Amritsar District",
    athlete: "Girls U-17 Team",
    detail: "The girls' basketball team remained undefeated through five rounds, winning the district championship for the second year running.",
  },
];

const ACADEMIC_MILESTONES = [
  { year: "2026", milestone: "100% CBSE Board pass rate for 5th consecutive year; school average touches 87.3%." },
  { year: "2025", milestone: "First batch of 3 students selected for IIT through JEE Advanced." },
  { year: "2024", milestone: "Introduced Coding & Robotics curriculum for Classes VI–VIII." },
  { year: "2023", milestone: "CBSE Affiliation renewed for 10 years (Affiliation No: 1630982)." },
  { year: "2022", milestone: "Smart Lab and Language Lab inaugurated; digital library launched." },
  { year: "2021", milestone: "School ranked in Top 20 Emerging Schools of Punjab by Education Today." },
  { year: "2020", milestone: "Seamless transition to online learning during COVID-19 with 98% attendance." },
  { year: "2019", milestone: "First student selected for NTSE Scholarship from Beas region." },
];

export default function NewsPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/school/robotics1.jpg"
            alt="Pathseekers News"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-12 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/80 via-accent-cream/60 to-white"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-primary-200 rounded-full shadow-sm mb-6">
            <Newspaper className="w-4 h-4 text-primary-700" />
            <span className="text-xs font-bold text-primary-900 tracking-wide uppercase">News &amp; Achievements</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6">
            Celebrating <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-500">Excellence</span>
            <br />Every Day.
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            From board exam triumphs to olympiad medals, from sports championships to community service — discover the stories that make Pathseekers proud.
          </p>
        </div>
      </section>

      {/* Recent Achievements */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">2025–26 Highlights</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Recent Achievements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RECENT_ACHIEVEMENTS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-stone-200/50 shadow-sm flex flex-col justify-between glow-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${item.color}`}>
                      <item.icon className="w-3.5 h-3.5" />
                      {item.tag}
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Timeline */}
      <section className="py-24 bg-[#fafaf9] border-t border-stone-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">What&apos;s Happening</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">News Timeline</h2>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary-200 -translate-x-1/2"></div>

            <div className="space-y-12">
              {NEWS_TIMELINE.map((item, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row gap-6 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary-600 rounded-full border-2 border-white shadow-sm -translate-x-1/2 mt-2 z-10"></div>

                  {/* Content Card */}
                  <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${idx % 2 === 0 ? "md:pr-0" : "md:pl-0"}`}>
                    <div className="bg-white p-6 rounded-2xl border border-stone-200/50 shadow-sm">
                      <span className="inline-flex items-center gap-1.5 text-xs text-primary-600 font-bold mb-2">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      <h3 className="font-serif text-base font-bold text-stone-900 mb-2">{item.title}</h3>
                      <p className="text-xs text-stone-500 leading-relaxed">{item.summary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-300 uppercase tracking-widest block mb-2">In the Press</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Media Coverage</h2>
            <p className="text-stone-400 text-sm max-w-lg mx-auto">
              Pathseekers has been featured in leading regional and national publications for academic excellence and innovative education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MEDIA_COVERAGE.map((item, idx) => (
              <div key={idx} className="p-8 bg-stone-800 rounded-2xl border border-stone-700/50 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-primary-900/50 text-primary-300 rounded-md text-[10px] font-bold uppercase tracking-wider mb-4">
                    {item.outlet}
                  </span>
                  <h3 className="font-serif text-base font-bold text-white mb-3 leading-snug">{item.headline}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed">{item.excerpt}</p>
                </div>
                <p className="text-[10px] text-stone-500 font-medium mt-4 uppercase tracking-wider">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Achievements */}
      <section className="py-24 bg-white border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Athletic Excellence</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Sports Achievements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SPORTS_ACHIEVEMENTS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#fafaf9] p-8 rounded-2xl border border-stone-200/60 flex gap-5 glow-hover"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                  <Flame className="w-6 h-6 text-primary-700" />
                </div>
                <div>
                  <span className="inline-block text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-1">{item.sport}</span>
                  <h3 className="font-serif text-base font-bold text-stone-900 mb-1">{item.achievement}</h3>
                  <p className="text-xs text-primary-700 font-semibold mb-2">{item.athlete}</p>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Milestones */}
      <section className="py-24 bg-[#fafaf9] border-t border-stone-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Our Journey</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Academic Milestones</h2>
          </div>

          <div className="space-y-4">
            {ACADEMIC_MILESTONES.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200/50 shadow-sm flex items-start gap-5 glow-hover"
              >
                <div className="w-16 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary-800">{item.year}</span>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed pt-1">{item.milestone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-stone-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-10 sm:p-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Have a Story to Share?</h2>
            <p className="text-primary-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              We love hearing about student achievements, community events, and campus milestones. Send us your news tips and press inquiries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary-900 font-bold rounded-full shadow-md hover:bg-stone-50 transition-all text-center tracking-wide"
              >
                Submit a Story
              </Link>
              <Link
                href="/blog"
                className="w-full sm:w-auto px-8 py-3.5 border border-white/40 text-white hover:bg-white/10 font-bold rounded-full transition-all text-center tracking-wide flex items-center justify-center gap-2"
              >
                Read Our Blog
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
