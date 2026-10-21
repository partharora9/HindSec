"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { ValueItem } from "@/types/about";
import {
  ConcentricEyeIcon,
  BarsIcon,
  TargetDotIcon,
  OverlapCirclesIcon,
} from "./ValuesIcons";

interface ValuesListProps {
  label: string;
  heading: string;
  items: ValueItem[];
}

function ValueRow({
  item,
  index,
  sectionInView,
  totalItems,
}: {
  item: ValueItem;
  index: number;
  sectionInView: boolean;
  totalItems: number;
}) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useSafeReducedMotion();

  // Scroll-linked focus: row nearest the center of the viewport stays at 1.0, others dim to 0.6
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  // Map progress [0, 0.5, 1] to opacity [0.6, 1.0, 0.6]
  const rawOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.5, 0.85],
    [0.6, 1.0, 0.6]
  );
  const smoothOpacity = useSpring(rawOpacity, { stiffness: 120, damping: 20 });

  const staggerDelay = prefersReduced ? 0 : 0.15 + index * 0.12;
  const dividerDelay = prefersReduced ? 0 : 0.2 + index * 0.12;

  const renderIcon = () => {
    switch (item.id) {
      case "integrity":
        return (
          <ConcentricEyeIcon
            isHovered={isHovered}
            isInView={sectionInView}
            delay={staggerDelay}
          />
        );
      case "reliability":
        return (
          <BarsIcon
            isHovered={isHovered}
            isInView={sectionInView}
            delay={staggerDelay}
          />
        );
      case "transparency":
        return (
          <TargetDotIcon
            isHovered={isHovered}
            isInView={sectionInView}
            delay={staggerDelay}
          />
        );
      case "resilience":
        return (
          <OverlapCirclesIcon
            isHovered={isHovered}
            isInView={sectionInView}
            delay={staggerDelay}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div ref={rowRef} className="w-full relative">
      {/* Row interactive container with -mx-6 px-6 for seamless 24px background expansion */}
      <motion.div
        style={{
          opacity: prefersReduced ? 1 : smoothOpacity,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full -mx-6 px-6 pt-[40px] pb-[70px] transition-colors duration-300 rounded-none cursor-default group"
      >
        {/* Faint white background highlight on hover (rgba(255,255,255,0.55), 300ms) */}
        <div
          className={`absolute inset-0 bg-white/55 pointer-events-none transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Inner Content Grid: Left icon (x=317), Right text offset by 322px (x=639) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[322px_1fr] items-start w-full">
          {/* Left Column: 40px thin-line icon, aligned with title top */}
          <div className="w-[40px] h-[40px] flex items-center justify-start flex-shrink-0 mb-6 md:mb-0">
            {renderIcon()}
          </div>

          {/* Right Column: Title (30px) + 18px gap + Description (17px, line-height 27px, max-w 954px) */}
          <div className="flex flex-col items-start pr-8 md:pr-12 relative w-full">
            {/* Title with 8px hover shift */}
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

            {/* Description: 18px below title, 17px, line-height 27px, #4a4f5a, 2 lines, max-w 954px */}
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

            {/* Small diagonal arrow sliding in at far right on hover */}
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

      {/* 1px bottom divider (#cfd1d5) under each row (full container width 1280px) */}
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

export default function ValuesList({ label, heading, items }: ValuesListProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();

  const headingLines = heading.split("\n");

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f0f1f3] pt-[150px] pb-0 select-none text-[#0a0a0a]"
      id="values"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        {/* Section Label: 15px, uppercase, letter-spacing 0.03em, weight 400, #0a0a0a */}
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

        {/* 40px below label: Heading on two lines (break after "our", 48px) */}
        <h2 className="mt-[40px] text-[34px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a]">
          {headingLines.map((line, idx) => (
            <div key={idx} className="overflow-hidden py-0.5">
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
                  delay: prefersReduced ? 0 : 0.1 + idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </h2>

        {/* 70px below heading: List of 4 rows separated by 1px dividers */}
        <div className="mt-[70px] w-full flex flex-col">
          {items.map((item, index) => (
            <ValueRow
              key={item.id}
              item={item}
              index={index}
              sectionInView={isInView}
              totalItems={items.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
