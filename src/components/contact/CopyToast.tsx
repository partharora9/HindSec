"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CopyToastProps {
  isVisible: boolean;
  message?: string;
}

export default function CopyToast({
  isVisible,
  message = "Copied to clipboard",
}: CopyToastProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="px-5 py-2.5 rounded-full bg-[#050505] text-white text-[13px] font-normal leading-none shadow-xl flex items-center gap-2 border border-white/10"
          >
            <svg
              className="w-3.5 h-3.5 text-blue-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
