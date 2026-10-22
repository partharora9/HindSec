"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { testimonialContent } from "@/content/siteContent";

function CharSpan({
  char,
  progress,
  range,
  shouldReduceMotion,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  shouldReduceMotion: boolean | null;
}) {
  const color = useTransform(progress, range, ["#c6c8cc", "#0a0a0a"]);

  return (
    <motion.span
      style={{
        color: shouldReduceMotion ? "#0a0a0a" : color,
      }}
    >
      {char}
    </motion.span>
  );
}

interface TestimonialSectionProps {
  quote?: string;
  authorName?: string;
  authorRole?: string;
  authorNameClass?: string;
}

export default function TestimonialSection({
  quote = testimonialContent.quote,
  authorName = testimonialContent.authorName,
  authorRole = testimonialContent.authorRole,
  authorNameClass = "text-[18px] font-medium text-[#0a0a0a]",
}: TestimonialSectionProps = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useSafeReducedMotion();

  // Scroll-linked progress from "start 0.8" to "end 0.45"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.45"],
  });

  const totalChars = quote.length;

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#f0f1f3] mt-[150px] pb-[60px] select-none text-[#0a0a0a]"
    >
      <div className="max-w-[850px] mx-auto px-6 text-center flex flex-col items-center">
        {/* Big black closing quotation mark glyph (56px wide, heavy 99 style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-[56px] h-[40px] text-[#0a0a0a] flex items-center justify-center"
        >
          <svg
            className="w-[56px] h-[56px] fill-[#0a0a0a]"
            viewBox="0 0 24 24"
          >
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
          </svg>
        </motion.div>

        {/* 50px below: Quote with scroll-linked character-by-character color reveal */}
        <div className="mt-[50px] text-[24px] sm:text-[30px] lg:text-[36px] font-normal leading-[1.6] tracking-[-0.015em] text-center max-w-[840px]">
          {quote.split("").map((char, index) => {
            const start = index / totalChars;
            const end = Math.min(1, (index + 1) / totalChars);
            return (
              <CharSpan
                key={index}
                char={char}
                progress={scrollYProgress}
                range={[start, end]}
                shouldReduceMotion={shouldReduceMotion}
              />
            );
          })}
        </div>

        {/* Below Quote: Author Name & Role */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-[36px] flex flex-col items-center"
        >
          <span className={authorNameClass}>
            {authorName}
          </span>
          <span className="text-[18px] font-normal text-[#4a4f5a] mt-[3px]">
            {authorRole}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
