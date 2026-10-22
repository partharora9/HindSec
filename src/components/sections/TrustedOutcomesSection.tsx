"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import FeatureIcon from "@/components/FeatureIcon";
import { solutionSuiteContent } from "@/content/siteContent";

interface FeatureItem {
  id: string;
  type: "threat" | "identity" | "network" | "incident" | "data" | "analytics";
  title: string;
  description: string;
}

const features: FeatureItem[] = solutionSuiteContent.items;

function FeatureGridCard({
  item,
  index,
  sectionInView,
}: {
  item: FeatureItem;
  index: number;
  sectionInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useSafeReducedMotion();

  const staggerDelay = prefersReduced ? 0 : 0.15 + index * 0.09;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
      animate={
        sectionInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: prefersReduced ? 0 : 30 }
      }
      transition={{
        duration: prefersReduced ? 0 : 0.6,
        delay: staggerDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col items-start w-full cursor-default"
      style={{ minHeight: "220px" }}
    >
      {/* 44px thin-line icon, 40px above title */}
      <div className="w-[44px] h-[44px] flex items-center justify-center mb-[40px]">
        <FeatureIcon
          type={item.type}
          isHovered={isHovered}
          isInView={sectionInView}
          delay={staggerDelay}
        />
      </div>

      {/* Title with hover shift and growing underline */}
      <div className="relative inline-block">
        <motion.h3
          animate={isHovered && !prefersReduced ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-[26px] sm:text-[28px] lg:text-[30px] font-normal text-[#0a0a0a] leading-[1.2] tracking-normal"
        >
          {item.title}
        </motion.h3>

        {/* 1px line growing under title from left to right */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-[1px] bg-[#0a0a0a] origin-left w-full mt-[3px]"
        />
      </div>

      {/* Description: 17px, line-height 27px, #4a4f5a, max 3 lines, 14px below title */}
      <p className="mt-[14px] text-[17px] leading-[27px] text-[#4a4f5a] font-normal line-clamp-3">
        {item.description}
      </p>
    </motion.div>
  );
}

export default function TrustedOutcomesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f0f1f3] pt-0 pb-[150px] select-none text-[#0a0a0a]"
      id="trusted-outcomes"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        {/* Section label: 15px, uppercase, letter-spacing 0.03em, weight 400, #0a0a0a */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 16 }}
          transition={{ duration: prefersReduced ? 0 : 0.6, ease: "easeOut" }}
          className="text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a]"
        >
          {solutionSuiteContent.label}
        </motion.div>

        {/* Section heading: 48px, weight 400, line-height 1.22, letter-spacing -1px, 40px below label */}
        <motion.h2
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 20 }}
          transition={{
            duration: prefersReduced ? 0 : 0.7,
            delay: prefersReduced ? 0 : 0.1,
            ease: "easeOut",
          }}
          className="mt-[40px] text-[34px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a]"
        >
          {solutionSuiteContent.heading}
        </motion.h2>

        {/* 70px below heading: 3-column x 2-row grid (405px wide, 32px gap, row pitch ~272px) */}
        <div className="mt-[70px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[32px] gap-y-[52px]">
          {features.map((item, index) => (
            <FeatureGridCard
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
