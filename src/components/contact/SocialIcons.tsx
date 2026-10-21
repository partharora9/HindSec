"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SocialLink } from "@/data/contactInfo";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export function FacebookIcon() {
  return (
    <svg
      className="w-[20px] h-[20px] text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg
      className="w-[20px] h-[20px] text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg
      className="w-[20px] h-[20px] text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.66-.74 1.66-1.66 0-.92-.74-1.66-1.66-1.66-.92 0-1.66.74-1.66 1.66 0 .92.74 1.66 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

export function XIcon() {
  return (
    <svg
      className="w-[20px] h-[20px] text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const iconComponents: Record<string, React.FC> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
};

interface SocialIconsProps {
  socials: SocialLink[];
  isInView: boolean;
}

export default function SocialIcons({ socials, isInView }: SocialIconsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const prefersReduced = useSafeReducedMotion();

  return (
    <div className="flex items-center gap-[16px] relative select-none">
      {socials.map((social, idx) => {
        const IconComponent = iconComponents[social.id] || FacebookIcon;
        const isHovered = hoveredId === social.id;
        const isOtherHovered = hoveredId !== null && !isHovered;

        return (
          <div key={social.id} className="relative">
            {/* Tooltip label (black pill, 12px, network name) fading in 8px above */}
            <AnimatePresence>
              {isHovered && !prefersReduced && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute -top-[34px] left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-[#050505] text-white text-[12px] font-medium leading-none whitespace-nowrap shadow-md pointer-events-none z-30"
                >
                  {social.name}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              onMouseEnter={() => setHoveredId(social.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{
                scale: prefersReduced ? 1 : 0,
                opacity: prefersReduced ? 1 : 0,
              }}
              animate={
                isInView
                  ? {
                      scale: 1,
                      opacity: isOtherHovered ? 0.6 : 1,
                    }
                  : {
                      scale: prefersReduced ? 1 : 0,
                      opacity: prefersReduced ? 1 : 0,
                    }
              }
              transition={{
                duration: prefersReduced ? 0.1 : 0.4,
                delay: prefersReduced ? 0 : 0.4 + idx * 0.06,
                type: prefersReduced ? "tween" : "spring",
                stiffness: 300,
                damping: 20,
              }}
              whileHover={
                prefersReduced
                  ? {}
                  : {
                      scale: 1.12,
                      backgroundColor: "#2b50ae",
                    }
              }
              className="w-[40px] h-[40px] rounded-full bg-[#0a0a0a] flex items-center justify-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b50ae] focus-visible:ring-offset-2 cursor-pointer"
            >
              <motion.div
                animate={isHovered && !prefersReduced ? { rotate: 12 } : { rotate: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                className="flex items-center justify-center"
              >
                <IconComponent />
              </motion.div>
            </motion.a>
          </div>
        );
      })}
    </div>
  );
}
