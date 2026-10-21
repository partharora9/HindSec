"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

const checklistItems = [
  "Identify risks before they escalate",
  "Improve visibility across key systems",
  "Reduce gaps in your security controls",
  "Prioritize the issues that matter most",
  "Strengthen defenses over time",
];

function ChecklistRow({
  text,
  index,
  isInView,
}: {
  text: string;
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useSafeReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, x: prefersReduced ? 0 : 24 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: prefersReduced ? 0 : 24 }
      }
      transition={{
        duration: prefersReduced ? 0.2 : 0.5,
        delay: prefersReduced ? 0 : 0.2 + index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-[16px] min-h-[43px] cursor-default group"
      style={{ perspective: 600 }}
    >
      {/* Black 24x24px square with sharp corners, flips 180deg on hover */}
      <motion.div
        animate={
          isHovered && !prefersReduced
            ? { rotateY: 180 }
            : { rotateY: 0 }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-[24px] h-[24px] bg-[#0a0a0a] rounded-none flex items-center justify-center flex-shrink-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg
          className="w-[14px] h-[14px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.polyline
            points="4 12 9 17 20 6"
            initial={{ pathLength: prefersReduced ? 1 : 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: prefersReduced ? 0 : 0.6,
              delay: prefersReduced ? 0 : 0.35 + index * 0.09,
              ease: "easeOut",
            }}
          />
        </svg>
      </motion.div>

      {/* Text: 18px, #4a4f5a, shifts 6px right on hover */}
      <motion.span
        animate={isHovered && !prefersReduced ? { x: 6 } : { x: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="text-[17px] sm:text-[18px] text-[#4a4f5a] font-normal leading-normal"
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

export default function WhatIsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f0f1f3] pt-[130px] pb-0 select-none text-[#0a0a0a]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        {/* Section Heading: "What is Proactive Security?" (48px, one line) */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: prefersReduced ? 0.2 : 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[34px] sm:text-[40px] lg:text-[48px] font-normal text-[#0a0a0a] leading-[1.22] tracking-[-1px]"
          >
            What is Proactive Security?
          </motion.h2>
        </div>

        {/* 60px below, two columns of 608px with 64px gap */}
        <div className="mt-[60px] grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-start">
          {/* Left Column: Two paragraphs with 35px gap */}
          <div className="flex flex-col gap-[35px] max-w-[608px]">
            <motion.p
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 20 }}
              transition={{
                duration: prefersReduced ? 0.2 : 0.6,
                delay: prefersReduced ? 0 : 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[18px] leading-[27px] text-[#4a4f5a] font-normal"
            >
              Proactive Security focuses on finding and reducing risk before an incident happens.
              Instead of waiting for alerts after damage begins, it helps your team understand
              where exposure exists, which systems need attention, and what actions should come first.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 20 }}
              transition={{
                duration: prefersReduced ? 0.2 : 0.6,
                delay: prefersReduced ? 0 : 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[18px] leading-[27px] text-[#4a4f5a] font-normal"
            >
              Securio helps businesses monitor threats, review security posture, and close gaps
              across critical systems. The result is stronger visibility, faster decisions, and a
              security program that supports daily operations.
            </motion.p>
          </div>

          {/* Right Column: Label & Checklist */}
          <div className="flex flex-col max-w-[608px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReduced ? 0.2 : 0.5, delay: 0.1 }}
              className="text-[16px] uppercase tracking-[0.02em] font-normal text-[#0a0a0a]"
            >
              WITH PROACTIVE SECURITY, YOU CAN:
            </motion.div>

            {/* Checklist with 43px row pitch, 28px below label */}
            <div className="mt-[28px] flex flex-col gap-[14px]">
              {checklistItems.map((item, idx) => (
                <ChecklistRow
                  key={idx}
                  text={item}
                  index={idx}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
