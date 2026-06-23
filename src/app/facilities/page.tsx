import { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Compass, BookOpen, Shield, GraduationCap, Microscope, Wifi, Library, MonitorPlay } from "lucide-react";

export const metadata: Metadata = {
  title: "Campus Facilities | Pathseekers School",
  description: "Explore the modern campus facilities, labs, libraries, and infrastructure at Pathseekers School Beas.",
};

const DETAILED_FACILITIES = [
  {
    title: "Hi-Tech Science Laboratories",
    desc: "Fully equipped Physics, Chemistry, and Biology laboratories encouraging hands-on experimentation. Our labs are built to CBSE standards and include modern safety equipment, specialized instruments, and dedicated demonstration zones to help students bridge theoretical concepts with practical realities.",
    image: "/school/chemistry1.jpg",
    icon: Microscope,
  },
  {
    title: "Modern Resource Library",
    desc: "A sprawling library housing over 15,000 volumes, international journals, encyclopedias, and a digital research section. We heavily support the Drop Everything And Read (DEAR) initiative to inculcate strong reading habits. The peaceful, well-lit environment makes it the perfect space for deep study.",
    image: "/school/3.jpg",
    icon: Library,
  },
  {
    title: "School Assembly & Athletics Grounds",
    desc: "Spacious assembly grounds surrounded by greenery, along with modern athletic facilities. We maintain well-kept tracks, basketball courts, and large multi-purpose fields to encourage physical health, teamwork, and competitive sportsmanship under the guidance of expert coaches.",
    image: "/school/6.jpg",
    icon: Shield,
  },
  {
    title: "Advanced ICT Classrooms",
    desc: "Every classroom is equipped with smart interactive boards, high-speed Wi-Fi access, and individual computing resources to enable modern digital education. Our dedicated Robotics and AI labs further allow middle and high school students to explore the future of technology.",
    image: "/school/robotics1.jpg",
    icon: MonitorPlay,
  }
];

export default function FacilitiesPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-stone-50 border-b border-stone-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">World-Class Infrastructure</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight mb-6">
            Modern Campus Facilities
          </h1>
          <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover a learning environment designed to nurture curiosity, foster innovation, and support holistic development at every step of a student's journey.
          </p>
        </div>
      </section>

      {/* Facilities List */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {DETAILED_FACILITIES.map((fac, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`flex flex-col gap-10 lg:gap-16 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative h-64 sm:h-80 lg:h-[400px] rounded-3xl overflow-hidden shadow-md group">
                  <Image
                    src={fac.image}
                    alt={fac.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-60"></div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-700 mb-6 border border-primary-100 shadow-sm">
                    <fac.icon className="w-6 h-6" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4">{fac.title}</h2>
                  <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                    {fac.desc}
                  </p>
                  
                  <div className="mt-8 border-t border-stone-100 pt-6">
                    <ul className="space-y-3">
                      {[
                        "Supervised by Expert Faculty",
                        "Maintained to International Standards",
                        "Accessible to All Enrolled Students"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-stone-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}
