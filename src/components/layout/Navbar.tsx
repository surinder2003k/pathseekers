"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ShieldCheck, ChevronDown, GraduationCap, Phone, Mail } from "lucide-react";
import NewsTicker from "@/components/ui/NewsTicker";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/academics", label: "Academics" },
  { href: "/faculty", label: "Faculty" },
  { href: "/students-corner", label: "Students" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/alumni", label: "Alumni" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on navigate
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* News Ticker — sits above the fixed header, fixed at very top */}
      <div className={`fixed top-0 left-0 right-0 z-[60] hidden md:block transition-all duration-300 ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        <NewsTicker />
      </div>

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-0 py-2.5 bg-white/90 backdrop-blur-xl shadow-md border-b border-stone-200/50"
            : "top-0 md:top-[32px] py-4 bg-white/60 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105 border border-stone-200">
                <Image 
                  src="/school/ps_logo.png" 
                  alt="Pathseekers Logo" 
                  fill 
                  sizes="48px"
                  priority
                  className="object-contain p-1" 
                />
              </div>
              <div>
                <span className="block font-serif text-lg font-bold tracking-tight text-stone-900 group-hover:text-primary-800 transition-colors">
                  Pathseekers
                </span>
                <span className="block text-[10px] text-stone-500 uppercase tracking-widest -mt-1">
                  Beas, Punjab • CBSE Aff.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
                      isActive ? "text-primary-800" : "text-stone-600 hover:text-primary-700"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary-700 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Enquiry CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="px-5 py-2 bg-gradient-to-r from-primary-800 to-primary-600 text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all tracking-wide glow-button"
              >
                Enquire Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-b border-stone-200 overflow-hidden shadow-inner"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? "bg-primary-50 text-primary-800"
                          : "text-stone-600 hover:bg-stone-50 hover:text-primary-700"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-stone-100 px-4">
                  <Link
                    href="/contact"
                    className="block text-center px-5 py-3 bg-gradient-to-r from-primary-800 to-primary-600 text-white text-sm font-bold rounded-full shadow-md"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
