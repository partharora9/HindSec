"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface PhilosophySectionProps {
  label: string;
  heading: string;
  paragraphs: string[];
}

export default function PhilosophySection({
  label,
  heading,
  paragraphs,
}: PhilosophySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();

  // Scroll-linked focus on paragraphs (fade 40% to 100% as they cross center)
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: textContainerRef,
    offset: ["start end", "end start"],
  });

  const rawOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.85],
    [0.45, 1.0, 0.55]
  );
  const smoothOpacity = useSpring(rawOpacity, { stiffness: 140, damping: 22 });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f0f1f3] pt-[150px] pb-0 select-none text-[#0a0a0a]"
      id="philosophy"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[600px_1fr] gap-[64px] items-start">
          {/* ================= LEFT COLUMN (600px wide) ================= */}
          <div className="flex flex-col max-w-[600px] w-full">
            {/* Section Label: 15px, uppercase, letter-spacing 0.03em, weight 400, #0a0a0a */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: prefersReduced ? 0 : 16 }
              }
              transition={{
                duration: prefersReduced ? 0.2 : 0.6,
                ease: "easeOut",
              }}
              className="text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a]"
            >
              {label}
            </motion.div>

            {/* 40px below label: Heading "We make complexity feel / simple" (48px) */}
            <h2 className="mt-[40px] text-[34px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a]">
              {/* Line 1: We make complexity feel */}
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
                  className="flex flex-wrap items-center gap-x-[0.28em]"
                >
                  <span>We</span>
                  <span>make</span>
                  {/* "complexity" with subtle 1px underline sweep after reveal */}
                  <span className="relative inline-block">
                    <span>complexity</span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{
                        duration: prefersReduced ? 0 : 0.6,
                        delay: prefersReduced ? 0 : 0.9,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute bottom-1 left-0 w-full h-[1.5px] bg-[#0a0a0a] origin-left pointer-events-none"
                    />
                  </span>
                  <span>feel</span>
                </motion.div>
              </div>

              {/* Line 2: simple */}
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
                    delay: prefersReduced ? 0 : 0.22,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {/* "simple" with subtle 1px underline sweep after reveal */}
                  <span className="relative inline-block">
                    <span>simple</span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{
                        duration: prefersReduced ? 0 : 0.6,
                        delay: prefersReduced ? 0 : 1.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute bottom-1 left-0 w-full h-[1.5px] bg-[#0a0a0a] origin-left pointer-events-none"
                    />
                  </span>
                </motion.div>
              </div>
            </h2>

            {/* 50px below heading: Two paragraphs (17px, line-height 27px, #4a4f5a, 27px gap) */}
            <motion.div
              ref={textContainerRef}
              style={{
                opacity: prefersReduced ? 1 : smoothOpacity,
              }}
              className="mt-[50px] flex flex-col gap-[27px] w-full"
            >
              {paragraphs.map((para, pIdx) => (
                <div key={pIdx} className="overflow-hidden">
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: prefersReduced ? 0 : 20,
                    }}
                    animate={
                      isInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: prefersReduced ? 0 : 20 }
                    }
                    transition={{
                      duration: prefersReduced ? 0.2 : 0.65,
                      delay: prefersReduced ? 0 : 0.35 + pIdx * 0.14,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-[17px] leading-[27px] text-[#4a4f5a] font-normal"
                  >
                    {para}
                  </motion.p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN (Empty on desktop, matching screenshot 3) ================= */}
          <div className="hidden lg:block w-[680px] h-full pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
