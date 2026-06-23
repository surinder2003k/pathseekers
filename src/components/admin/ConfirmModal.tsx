"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, HelpCircle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
  isDestructive?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  isDestructive = true,
}: ConfirmModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleConfirm = async () => {
    await onConfirm();
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

            {/* Content layout */}
            <div className="flex gap-4 items-start">
              {/* Icon Container */}
              <div
                className={`rounded-2xl p-3 shrink-0 ${
                  isDestructive
                    ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                    : "bg-primary-500/10 text-primary-500 border border-primary-500/20"
                }`}
              >
                {isDestructive ? (
                  <AlertTriangle className="h-6 w-6" />
                ) : (
                  <HelpCircle className="h-6 w-6" />
                )}
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

            {/* Actions Button Row */}
            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800/60">
              <button
                type="button"
                onClick={onClose}
                className="px-4.5 py-2.5 bg-slate-800 hover:bg-slate-700/80 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border border-slate-700/50"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className={`px-4.5 py-2.5 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg ${
                  isDestructive
                    ? "bg-rose-600 hover:bg-rose-500 shadow-rose-950/30"
                    : "bg-primary-600 hover:bg-primary-500 shadow-primary-950/30"
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
