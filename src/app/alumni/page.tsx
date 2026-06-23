import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, Briefcase, Stethoscope, Scale, Palette, Code, Trophy, Calendar, MapPin, Users, Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Alumni Network | Pathseekers",
  description: "Stay connected with the Pathseekers alumni community. Explore achievements, events, and success stories of our graduates.",
};

const NOTABLE_ALUMNI = [
  {
    name: "Dr. Simranpreet Kaur",
    initials: "SK",
    batch: "Batch of 2014",
    achievement: "AIIMS New Delhi — MBBS & MD (Cardiology)",
    description: "Topped the Punjab state merit list and secured admission to AIIMS. Currently practising interventional cardiology at a premier Delhi hospital.",
    icon: Stethoscope,
    color: "bg-rose-100 text-rose-700",
  },
  {
    name: "Arjun Mehta",
    initials: "AM",
    batch: "Batch of 2015",
    achievement: "IIT Delhi — B.Tech Computer Science",
    description: "Cleared JEE Advanced with an All-India Rank under 500. Now leads AI research at a Fortune 500 tech company in Bengaluru.",
    icon: Code,
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Navdeep Singh",
    initials: "NS",
    batch: "Batch of 2013",
    achievement: "IAS Officer — Punjab Cadre (Civil Services)",
    description: "Cleared UPSC Civil Services on his second attempt. Currently serving as Sub-Divisional Magistrate in Amritsar district.",
    icon: Scale,
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Harleen Kaur Sandhu",
    initials: "HS",
    batch: "Batch of 2016",
    achievement: "National Institute of Design — Communication Design",
    description: "Recipient of the President's Gold Medal at NID. Runs an award-winning branding studio serving clients across South-East Asia.",
    icon: Palette,
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Raghav Sharma",
    initials: "RS",
    batch: "Batch of 2017",
    achievement: "Indian Army — Lt. Colonel, Parachute Regiment",
    description: "Passed out from IMA Dehradun with the Sword of Honour. Served two tours in high-altitude sectors and received a commendation.",
    icon: Trophy,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Priya Bhatia",
    initials: "PB",
    batch: "Batch of 2018",
    achievement: "London School of Economics — MSc Economics",
    description: "Awarded the Tata Scholarship for higher studies. Currently an economist with the World Bank, working on rural development policy.",
    icon: Briefcase,
    color: "bg-sky-100 text-sky-700",
  },
];

const ALUMNI_TESTIMONIALS = [
  {
    text: "Pathseekers gave me the discipline and curiosity that carried me through the gruelling UPSC preparation. The teachers here taught me how to think, not just what to memorise.",
    author: "Navdeep Singh",
    role: "IAS Officer, Punjab Cadre (Batch of 2013)",
  },
  {
    text: "The science labs and project-based learning at Pathseekers ignited my passion for engineering. I still remember the Robotics Club weekends that shaped my career trajectory.",
    author: "Arjun Mehta",
    role: "AI Research Lead, IIT Delhi Alumnus (Batch of 2015)",
  },
  {
    text: "Coming from a small town like Beas, Pathseekers showed me the world was within reach. The school's focus on holistic growth gave me confidence to excel at NID.",
    author: "Harleen Kaur Sandhu",
    role: "NID Gold Medallist, Design Entrepreneur (Batch of 2016)",
  },
];

const ALUMNI_EVENTS = [
  {
    title: "Annual Alumni Homecoming 2026",
    date: "December 15, 2026",
    location: "Pathseekers Campus, Beas",
    description: "Reconnect with classmates, tour the upgraded campus, and share your journey with current students during our grand annual reunion.",
  },
  {
    title: "Alumni Career Mentorship Drive",
    date: "August 22–24, 2026",
    location: "Virtual (Zoom / Google Meet)",
    description: "A three-day online mentorship series where alumni professionals guide Class XI and XII students on career paths in engineering, medicine, law, and the arts.",
  },
  {
    title: "Pathseekers Cricket Premier League",
    date: "October 5, 2026",
    location: "School Sports Complex, Beas",
    description: "The much-loved alumni vs. students cricket tournament returns. Register your team of 6 and compete for the rolling Founder's Trophy.",
  },
  {
    title: "Alumni Excellence Awards Night",
    date: "January 26, 2027",
    location: "Pathseekers Auditorium, Beas",
    description: "Honouring alumni who have made outstanding contributions in their fields. Nominations open until December 2026.",
  },
];

export default function AlumniPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/school/physics1.jpg"
            alt="Pathseekers Alumni"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-12 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/80 via-accent-cream/60 to-white"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-primary-200 rounded-full shadow-sm mb-6">
            <GraduationCap className="w-4 h-4 text-primary-700" />
            <span className="text-xs font-bold text-primary-900 tracking-wide uppercase">Alumni Network</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6">
            Once a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-500">Pathseeker</span>,
            <br />Always a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-500">Pathseeker</span>.
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Our alumni are our proudest achievement. From IIT lecture halls to civil service offices, Pathseekers graduates carry the school&apos;s values wherever they go.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#register"
              className="glow-button w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-800 to-primary-600 text-white rounded-full font-bold shadow-lg hover:shadow-primary-300 hover:scale-105 transition-all text-center tracking-wide"
            >
              Join the Alumni Network
            </a>
            <a
              href="#notable"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 rounded-full font-bold shadow-sm hover:scale-105 transition-all text-center tracking-wide"
            >
              Meet Our Alumni
            </a>
          </div>
        </div>
      </section>

      {/* Notable Alumni Section */}
      <section id="notable" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Proud Graduates</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Notable Alumni</h2>
            <p className="text-stone-500 mt-3 max-w-xl mx-auto text-sm">
              Our alumni have excelled across diverse fields — from medicine and engineering to civil services and the arts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NOTABLE_ALUMNI.map((alumnus, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-stone-200/50 shadow-sm flex flex-col justify-between glow-hover group"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-800 text-lg font-serif">
                      {alumnus.initials}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">{alumnus.name}</h3>
                      <p className="text-xs text-primary-600 font-semibold uppercase tracking-wider">{alumnus.batch}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4 ${alumnus.color}`}>
                    <alumnus.icon className="w-3.5 h-3.5" />
                    {alumnus.achievement}
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">{alumnus.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Testimonials */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-primary-300 uppercase tracking-widest block mb-2">In Their Own Words</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-16">Alumni Testimonials</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ALUMNI_TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-8 bg-stone-800 rounded-2xl border border-stone-700/50 text-left flex flex-col justify-between">
                <p className="text-stone-300 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
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

      {/* Alumni Events */}
      <section className="py-24 bg-[#fafaf9] border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Upcoming Gatherings</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Alumni Events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ALUMNI_EVENTS.map((event, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-stone-200/50 shadow-sm glow-hover flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">{event.title}</h3>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-primary-600" />
                      {event.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-primary-600" />
                      {event.location}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-white border-t border-stone-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1,200+", label: "Alumni Worldwide" },
              { value: "95%", label: "Higher Education Rate" },
              { value: "18+", label: "Graduating Batches" },
              { value: "50+", label: "IIT/NIT/AIIMS Selections" },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-primary-800">{stat.value}</p>
                <p className="text-xs text-stone-500 mt-1 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Connected CTA */}
      <section id="register" className="py-20 bg-stone-50 border-t border-stone-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-10 sm:p-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <Heart className="w-8 h-8 text-primary-200" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Stay Connected</h2>
            <p className="text-primary-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Register on our Alumni Network to receive invitations to reunions, mentorship drives, and exclusive events. Help shape the next generation of Pathseekers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.pathseekers.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary-900 font-bold rounded-full shadow-md hover:bg-stone-50 transition-all text-center tracking-wide"
              >
                Official Alumni Registry
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 border border-white/40 text-white hover:bg-white/10 font-bold rounded-full transition-all text-center tracking-wide"
              >
                Inquire Local Chapters
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
