"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button if scrolled down past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={scrollToTop}
          type="button"
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary-650 hover:bg-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-950/20 border border-primary-500/20 hover:border-primary-400/50 cursor-pointer group transition-colors duration-300"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="flex items-center justify-center"
            initial={{ y: 0 }}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <ArrowUp className="w-5 h-5 text-white stroke-[2.5]" />
          </motion.div>
          
          {/* Subtle outer pulse effect */}
          <span className="absolute -inset-0.5 rounded-full bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style={{ animationDuration: '2s' }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
