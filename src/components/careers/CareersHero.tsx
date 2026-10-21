"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export default function CareersHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const photoWrapperRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useSafeReducedMotion();
  const [imgError, setImgError] = useState(false);

  // Parallax scroll: photo moves up to 30px inside frame and zooms 1.0 to 1.05;
  // text column moves up 15px slower than scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const photoParallaxY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const photoParallaxScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.05]);
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f0f1f3] text-[#0a0a0a] pt-[140px] lg:pt-[200px] pb-[80px] lg:pb-0 lg:h-[659px] overflow-hidden select-none"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0 flex flex-col lg:flex-row lg:justify-between items-start">
        {/* Left Column: starts at x=309, width about 560px */}
        <motion.div
          style={{ y: prefersReduced ? 0 : textParallaxY }}
          className="w-full lg:w-[560px] flex-shrink-0 z-10"
        >
          {/* Label "JOIN OUR TEAM" at y=211 */}
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0.1 : 0.6, ease: "easeOut" }}
            className="text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a] leading-none"
          >
            JOIN OUR TEAM
          </motion.div>

          {/* 40px below label: Heading on two lines (break after "of") */}
          <h1 className="mt-[40px] text-[34px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a]">
            {/* Line 1: Let’s shape the future of */}
            <div className="overflow-hidden py-0.5">
              <motion.div
                initial={{
                  y: prefersReduced ? 0 : "105%",
                  filter: prefersReduced ? "blur(0px)" : "blur(8px)",
                  opacity: prefersReduced ? 1 : 0,
                }}
                animate={{
                  y: 0,
                  filter: "blur(0px)",
                  opacity: 1,
                }}
                transition={{
                  duration: prefersReduced ? 0.1 : 0.8,
                  delay: prefersReduced ? 0 : 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Let’s shape the future of
              </motion.div>
            </div>

            {/* Line 2: cybersecurity, together (break after "of", with underline sweep on "together") */}
            <div className="overflow-hidden py-0.5">
              <motion.div
                initial={{
                  y: prefersReduced ? 0 : "105%",
                  filter: prefersReduced ? "blur(0px)" : "blur(8px)",
                  opacity: prefersReduced ? 1 : 0,
                }}
                animate={{
                  y: 0,
                  filter: "blur(0px)",
                  opacity: 1,
                }}
                transition={{
                  duration: prefersReduced ? 0.1 : 0.8,
                  delay: prefersReduced ? 0 : 0.22,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                cybersecurity,{" "}
                <span className="relative inline-block">
                  together
                  {/* 1px underline sweep drawn left to right, 600ms, once */}
                  {!prefersReduced && (
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.95,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute left-0 bottom-0 w-full h-[1px] bg-[#0a0a0a] origin-left"
                    />
                  )}
                </span>
              </motion.div>
            </div>
          </h1>

          {/* 44px below heading: Paragraph (18px, line-height 27px, #4a4f5a, max-width 560px, 2 lines) */}
          <div className="mt-[44px] max-w-[560px] text-[16px] sm:text-[18px] leading-[27px] text-[#4a4f5a]">
            <div className="overflow-hidden">
              <motion.p
                initial={{
                  y: prefersReduced ? 0 : 20,
                  opacity: prefersReduced ? 1 : 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: prefersReduced ? 0.1 : 0.7,
                  delay: prefersReduced ? 0 : 0.37,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Join a team focused on practical security work, clear thinking, and protecting businesses from real cyber risk.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Right Photo: 624px x 359px, top at y=200, sharp corners, object-fit cover */}
        <div
          ref={photoWrapperRef}
          className="mt-[48px] lg:mt-0 w-full lg:w-[624px] h-[280px] sm:h-[320px] lg:h-[359px] rounded-none overflow-hidden relative flex-shrink-0 group select-none bg-gradient-to-br from-[#dce5ed] via-[#e5ecf2] to-[#d6e0ea]"
        >
          {/* Photo clip-path wipe from the right (inset(0 0 0 100%) to inset(0), 1000ms, easeOut) */}
          <motion.div
            initial={{
              clipPath: prefersReduced ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)",
            }}
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
            }}
            transition={{
              duration: prefersReduced ? 0.1 : 1.0,
              delay: prefersReduced ? 0 : 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full h-full relative overflow-hidden"
          >
            {/* Inner motion container for initial scale 1.18 -> 1.0, scroll parallax, and hover zoom */}
            <motion.div
              style={{
                y: prefersReduced ? 0 : photoParallaxY,
                scale: prefersReduced ? 1 : photoParallaxScale,
              }}
              initial={{ scale: prefersReduced ? 1 : 1.18 }}
              animate={{ scale: 1 }}
              transition={{
                duration: prefersReduced ? 0.1 : 1.0,
                delay: prefersReduced ? 0 : 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full h-full relative"
            >
              {/* Very slow hover zoom: scale 1.03, 900ms */}
              <motion.div
                whileHover={prefersReduced ? {} : { scale: 1.03 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
              >
                {!imgError ? (
                  <Image
                    src="/images/careers-hero.jpg"
                    alt="Securio cybersecurity team collaboration"
                    fill
                    sizes="(max-width: 1024px) 100vw, 624px"
                    className="object-cover"
                    priority
                    unoptimized
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#d4dee8] via-[#e2e9f0] to-[#ccd7e2] flex items-center justify-center text-[#4a4f5a] text-sm font-medium">
                    Securio Team
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
