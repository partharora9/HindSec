"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { caseStudiesContent } from "@/content/siteContent";

interface CaseStudyItem {
  id: string;
  category: string;
  line1: string;
  line2: string;
  imageSrc: string;
  href: string;
  alt?: string;
}

const caseStudies: CaseStudyItem[] = caseStudiesContent.items;

function CaseStudyCard({
  item,
  index,
  sectionInView,
}: {
  item: CaseStudyItem;
  index: number;
  sectionInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const prefersReduced = useSafeReducedMotion();

  // Subtle Parallax: photo moves vertically by up to 20px with scroll
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  const wipeDelay = prefersReduced ? 0 : index * 0.14;

  return (
    <div
      ref={cardRef}
      className="relative w-full h-[420px] lg:h-[480px] rounded-none overflow-hidden group cursor-pointer select-none bg-gradient-to-br from-[#1e293b] to-[#0f172a]"
    >
      <a href={item.href} className="block w-full h-full relative" aria-label={`${item.line1} ${item.line2}`}>
        {/* Full-bleed Photo with reveal scale & hover zoom & scroll parallax */}
        <motion.div
          style={{ y: prefersReduced ? 0 : parallaxY }}
          initial={{ scale: prefersReduced ? 1 : 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: prefersReduced ? 0 : 0.85,
            delay: wipeDelay,
            ease: "easeOut",
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Zoom on hover: scale 1.06 over 700ms */}
          <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.06] relative">
            <Image
              src={item.imageSrc}
              alt={`${item.line1} ${item.line2} - VAPT Engagement`}
              fill
              unoptimized
              priority={index === 0}
              sizes="(max-width: 900px) 100vw, 405px"
              className="object-cover object-center w-full h-full"
            />
          </div>
        </motion.div>

        {/* Wipe reveal curtain from bottom */}
        {!prefersReduced && (
          <motion.div
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.85,
              delay: wipeDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 bg-[#f0f1f3] origin-bottom pointer-events-none z-10"
          />
        )}

        {/* Gradient Overlay: transparent at 45% height to rgba(0,0,0,0.75) at bottom, darkens on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 45%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.88) 100%)",
          }}
        />

        {/* Top-Right Square Tile: 79x79px, flush to corner */}
        <div className="absolute top-0 right-0 w-[79px] h-[79px] bg-white z-20 flex items-center justify-center transition-colors duration-300 ease-out group-hover:bg-[#0a0a0a]">
          {/* 30px thin black diagonal arrow, rotates 45deg to point right, turns white */}
          <div className="w-[30px] h-[30px] flex items-center justify-center text-[#0a0a0a] group-hover:text-white transition-all duration-300 ease-out group-hover:rotate-45">
            <svg
              width="30"
              height="30"
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
          </div>
        </div>

        {/* Bottom-left text: 32px left padding, 40px bottom padding */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pl-[32px] pr-[32px] pb-[40px] pointer-events-none flex flex-col items-start">
          {/* CASE STUDY: 18px, uppercase, weight 400, white, letter-spacing 0.02em */}
          <span className="text-[18px] uppercase font-normal tracking-[0.02em] text-white">
            {item.category}
          </span>

          {/* 30px below: Title in white, 30px, weight 400, line-height 1.25, 2 lines, slides up 6px on hover */}
          <h3 className="mt-[30px] text-[24px] sm:text-[28px] lg:text-[30px] font-normal leading-[1.25] text-white transition-transform duration-300 ease-out group-hover:-translate-y-[6px]">
            {item.line1}
            <br />
            {item.line2}
          </h3>
        </div>
      </a>
    </div>
  );
}

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f0f1f3] pt-0 pb-[150px] select-none text-[#0a0a0a]"
      id="case-studies"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        {/* Section label: 15px, uppercase, letter-spacing 0.03em, weight 400, #0a0a0a */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 16 }}
          transition={{ duration: prefersReduced ? 0 : 0.6, ease: "easeOut" }}
          className="text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a]"
        >
          {caseStudiesContent.label}
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
          {caseStudiesContent.heading}
        </motion.h2>

        {/* 70px below heading: 3 image cards in a row (405px x 480px, 32px gap) */}
        <div className="mt-[70px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {caseStudies.map((item, index) => (
            <CaseStudyCard
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
