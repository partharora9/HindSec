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
      className="group flex flex-col items-start w-full cursor-default min-h-0 sm:min-h-[220px]"
    >
      {/* 44px thin-line icon, responsive margin above title */}
      <div className="w-[44px] h-[44px] flex items-center justify-center mb-[24px] sm:mb-[40px]">
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
          className="text-[22px] sm:text-[26px] lg:text-[30px] font-normal text-[#0a0a0a] leading-[1.2] tracking-normal"
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

      {/* Description: responsive text & line-height */}
      <p className="mt-[10px] sm:mt-[14px] text-[15px] sm:text-[17px] leading-[24px] sm:leading-[27px] text-[#4a4f5a] font-normal line-clamp-none sm:line-clamp-3">
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
      className="w-full bg-[#f0f1f3] pt-0 pb-[60px] sm:pb-[100px] lg:pb-[150px] select-none text-[#0a0a0a]"
      id="trusted-outcomes"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 16 }}
          transition={{ duration: prefersReduced ? 0 : 0.6, ease: "easeOut" }}
          className="text-[13px] sm:text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a]"
        >
          {solutionSuiteContent.label}
        </motion.div>

        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 20 }}
          transition={{
            duration: prefersReduced ? 0 : 0.7,
            delay: prefersReduced ? 0 : 0.1,
            ease: "easeOut",
          }}
          className="mt-[24px] sm:mt-[32px] lg:mt-[40px] text-[28px] sm:text-[38px] lg:text-[48px] font-normal leading-[1.2] sm:leading-[1.22] tracking-[-0.5px] sm:tracking-[-1px] text-[#0a0a0a]"
        >
          {solutionSuiteContent.heading}
        </motion.h2>

        {/* Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="mt-[36px] sm:mt-[50px] lg:mt-[70px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-[32px] gap-y-8 sm:gap-y-[52px]">
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
