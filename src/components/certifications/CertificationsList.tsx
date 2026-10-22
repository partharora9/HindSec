"use client";

// ============================================================================
// IMPORTANT TRUTH RULE:
// Only certifications the team truly holds may be listed here!
// Do not invent, exaggerate, or list credentials not actively held by testers.
// ============================================================================

import React, { useState, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { certificationsContent } from "@/content/siteContent";

interface CertificationItem {
  id: string;
  title: string;
  description: string;
}

function CertRowIcon({ id, isHovered }: { id: string; isHovered: boolean }) {
  const prefersReduced = useSafeReducedMotion();

  switch (id) {
    case "team-certs":
      // Shield / Badge icon
      return (
        <svg
          className="w-[40px] h-[40px] text-[#0a0a0a]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <motion.path
            d="m9 12 2 2 4-4"
            animate={isHovered && !prefersReduced ? { pathLength: [0, 1] } : { pathLength: 1 }}
            transition={{ duration: 0.4 }}
          />
        </svg>
      );
    case "methodologies":
      // Methodology / Framework layers icon
      return (
        <svg
          className="w-[40px] h-[40px] text-[#0a0a0a]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      );
    case "scoring":
      // CVSS / Target / Gauge icon
      return (
        <svg
          className="w-[40px] h-[40px] text-[#0a0a0a]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="22" y1="12" x2="18" y2="12" />
          <line x1="6" y1="12" x2="2" y2="12" />
          <line x1="12" y1="6" x2="12" y2="2" />
          <line x1="12" y1="22" x2="12" y2="18" />
          <motion.circle
            cx="12"
            cy="12"
            r="3"
            animate={isHovered && !prefersReduced ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        </svg>
      );
    case "compliance":
      // Compliance check / document lock icon
      return (
        <svg
          className="w-[40px] h-[40px] text-[#0a0a0a]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    default:
      return (
        <svg
          className="w-[40px] h-[40px] text-[#0a0a0a]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

function CertRow({
  item,
  index,
  sectionInView,
}: {
  item: CertificationItem;
  index: number;
  sectionInView: boolean;
}) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useSafeReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const rawOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.5, 0.85],
    [0.6, 1.0, 0.6]
  );
  const smoothOpacity = useSpring(rawOpacity, { stiffness: 120, damping: 20 });

  const staggerDelay = prefersReduced ? 0 : 0.15 + index * 0.12;
  const dividerDelay = prefersReduced ? 0 : 0.2 + index * 0.12;

  return (
    <div ref={rowRef} className="w-full relative">
      <motion.div
        style={{
          opacity: prefersReduced ? 1 : smoothOpacity,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full -mx-6 px-6 pt-[40px] pb-[70px] transition-colors duration-300 rounded-none cursor-default group"
      >
        <div
          className={`absolute inset-0 bg-white/55 pointer-events-none transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[322px_1fr] items-start w-full">
          <div className="w-[40px] h-[40px] flex items-center justify-start flex-shrink-0 mb-6 md:mb-0">
            <CertRowIcon id={item.id} isHovered={isHovered} />
          </div>

          <div className="flex flex-col items-start pr-8 md:pr-12 relative w-full">
            <div className="relative inline-flex items-center">
              <motion.h3
                initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                animate={
                  sectionInView
                    ? {
                        opacity: 1,
                        y: 0,
                        x: isHovered && !prefersReduced ? 8 : 0,
                      }
                    : { opacity: 0, y: prefersReduced ? 0 : 20 }
                }
                transition={{
                  y: {
                    duration: prefersReduced ? 0.2 : 0.6,
                    delay: staggerDelay,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  x: { duration: 0.25, ease: "easeOut" },
                }}
                className="text-[26px] sm:text-[30px] font-normal text-[#0a0a0a] leading-[1.25] tracking-tight"
              >
                {item.title}
              </motion.h3>
            </div>

            <motion.p
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              animate={
                sectionInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: prefersReduced ? 0 : 24 }
              }
              transition={{
                duration: prefersReduced ? 0.2 : 0.6,
                delay: staggerDelay + 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-[18px] text-[17px] leading-[27px] text-[#4a4f5a] font-normal max-w-[954px]"
            >
              {item.description}
            </motion.p>

            <div className="absolute right-0 top-1 hidden sm:flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={
                  isHovered && !prefersReduced
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -8 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-[20px] h-[20px] text-[#0a0a0a]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={sectionInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: prefersReduced ? 0.2 : 0.7,
          delay: dividerDelay,
          ease: "easeOut",
        }}
        className="w-full h-[1px] bg-[#cfd1d5] origin-left pointer-events-none"
      />
    </div>
  );
}

export default function CertificationsList() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();

  const { label, heading, subtitle, items } = certificationsContent;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f0f1f3] pt-[150px] pb-[120px] select-none text-[#0a0a0a]"
      id="certifications"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 16 }
          }
          transition={{ duration: prefersReduced ? 0.2 : 0.6, ease: "easeOut" }}
          className="text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a]"
        >
          {label}
        </motion.div>

        <h2 className="mt-[40px] text-[34px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a]">
          <div className="overflow-hidden py-0.5">
            <motion.div
              initial={{
                y: prefersReduced ? 0 : "105%",
                filter: prefersReduced ? "blur(0px)" : "blur(8px)",
                opacity: prefersReduced ? 1 : 0,
              }}
              animate={
                isInView
                  ? { y: 0, filter: "blur(0px)", opacity: 1 }
                  : {}
              }
              transition={{
                duration: prefersReduced ? 0.2 : 0.8,
                delay: prefersReduced ? 0 : 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {heading}
            </motion.div>
          </div>
        </h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 16 }
            }
            transition={{
              duration: prefersReduced ? 0.2 : 0.6,
              delay: prefersReduced ? 0 : 0.2,
              ease: "easeOut",
            }}
            className="mt-[20px] text-[18px] text-[#4a4f5a] max-w-[700px] font-normal"
          >
            {subtitle}
          </motion.p>
        )}

        {/* List of 4 certification rows */}
        <div className="mt-[70px] w-full flex flex-col">
          {items.map((item, index) => (
            <CertRow
              key={item.id}
              item={item}
              index={index}
              sectionInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
