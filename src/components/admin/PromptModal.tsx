"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, X } from "lucide-react";

interface PromptModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  placeholder?: string;
  initialValue?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: (value: string) => void | Promise<void>;
  onClose: () => void;
}

export default function PromptModal({
  isOpen,
  title,
  message,
  placeholder = "Type here...",
  initialValue = "",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onClose,
}: PromptModalProps) {
  const [value, setValue] = useState(initialValue);

  // Sync initial value when open changes or initialValue changes
  useEffect(() => {
    if (isOpen) {
      setValue(initialValue);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialValue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onConfirm(value);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4 items-start">
                {/* Icon Container */}
                <div className="rounded-2xl p-3 shrink-0 bg-primary-500/10 text-primary-500 border border-primary-500/20">
                  <Link2 className="h-6 w-6" />
                </div>

                {/* Text Context */}
                <div className="space-y-1.5 flex-1 pr-6">
                  <h3 className="font-serif text-lg font-bold text-white leading-tight">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {message}
                  </p>
                </div>
              </div>

              {/* Input field */}
              <div className="pt-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none focus:border-primary-500 placeholder-slate-600 transition-colors"
                  autoFocus
                />
              </div>

              {/* Actions Button Row */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4.5 py-2.5 bg-slate-800 hover:bg-slate-700/80 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border border-slate-700/50"
                >
                  {cancelText}
                </button>
                <button
                  type="submit"
                  className="px-4.5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-primary-950/30"
                >
                  {confirmText}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
