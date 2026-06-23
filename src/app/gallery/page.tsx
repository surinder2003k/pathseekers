"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Camera, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CATEGORIES = [
  { id: "all", label: "All Photos" },
  { id: "campus", label: "Campus & Infrastructure" },
  { id: "labs", label: "Labs & Robotics" },
  { id: "sports", label: "Sports & Athletics" },
  { id: "events", label: "Events & Festivals" }
];

const IMAGES = [
  {
    id: "campus-1",
    src: "/school/8.jpg",
    title: "School Campus",
    category: "campus"
  },
  {
    id: "campus-2",
    src: "/school/3.jpg",
    title: "School Assembly Area",
    category: "campus"
  },
  {
    id: "labs-1",
    src: "/school/chemistry1.jpg",
    title: "Chemistry Laboratory",
    category: "labs"
  },
  {
    id: "labs-2",
    src: "/school/robotics1.jpg",
    title: "Junior Robotics Session",
    category: "labs"
  },
  {
    id: "labs-3",
    src: "/school/robotics2.jpg",
    title: "Advanced Robotics Lab",
    category: "labs"
  },
  {
    id: "labs-4",
    src: "/school/physics1.jpg",
    title: "Physics Laboratory",
    category: "labs"
  },
  {
    id: "sports-1",
    src: "/school/6.jpg",
    title: "Sports & Athletics",
    category: "sports"
  },
  {
    id: "events-1",
    src: "/school/6.jpg",
    title: "Cultural Events",
    category: "events"
  },
  {
    id: "campus-3",
    src: "/school/special_education.jpg",
    title: "Special Education Center",
    category: "campus"
  }
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filteredImages = IMAGES.filter(
    (img) => activeTab === "all" || img.category === activeTab
  );

  const openLightbox = (id: string) => {
    const idx = IMAGES.findIndex(img => img.id === id);
    if (idx !== -1) setLightboxIdx(idx);
  };

  const handleNext = () => {
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx + 1) % IMAGES.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx - 1 + IMAGES.length) % IMAGES.length);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/school/8.jpg"
            alt="Pathseekers Gallery"
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
            <Camera className="w-4 h-4 text-primary-700" />
            <span className="text-xs font-bold text-primary-900 tracking-wide uppercase">Campus Photography</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6"
          >
            Visual Journey of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-500">Pathseekers</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed"
          >
            Explore our state-of-the-art physics/biology laboratories, resource libraries, athletic complexes, and glimpses of grand events. For the complete visual history, check out the official <a href="https://www.pathseekers.edu.in" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:text-primary-900 underline font-semibold">Pathseekers Beas Photo Hub</a>.
          </motion.p>
        </div>
      </section>

      {/* Tabs Filter */}
      <section className="py-8 bg-white border-y border-stone-200/50 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeTab === cat.id
                    ? "bg-gradient-to-r from-primary-800 to-primary-600 text-white border-transparent shadow-md scale-105"
                    : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-24 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => openLightbox(img.id)}
                  className="bg-white rounded-3xl border border-stone-200/50 shadow-sm overflow-hidden relative cursor-pointer group glow-hover h-80"
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <Maximize2 className="w-6 h-6 text-white absolute top-6 right-6" />
                    <span className="text-[10px] font-bold text-primary-300 uppercase tracking-widest mb-1.5">{img.category}</span>
                    <h3 className="font-serif text-white font-bold text-base leading-snug">{img.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-6 right-6 p-2.5 bg-stone-900/50 rounded-full hover:bg-stone-800 text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Prev Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-stone-900/50 rounded-full hover:bg-stone-800 text-white transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Main Image View */}
            <motion.div
              key={lightboxIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full h-[70vh] flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src={IMAGES[lightboxIdx].src}
                  alt={IMAGES[lightboxIdx].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                />
              </div>
              <div className="text-center mt-6 text-white space-y-1">
                <h4 className="font-serif font-bold text-lg">{IMAGES[lightboxIdx].title}</h4>
                <p className="text-xs uppercase tracking-widest text-primary-400 font-bold">{IMAGES[lightboxIdx].category}</p>
              </div>
            </motion.div>

            {/* Right Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-stone-900/50 rounded-full hover:bg-stone-800 text-white transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
