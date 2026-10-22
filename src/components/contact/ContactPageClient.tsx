"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ContactFormBlock from "@/components/contact/ContactFormBlock";
import InfoCard from "@/components/contact/InfoCard";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export default function ContactPageClient() {
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();

  // Scroll parallax: heading and info card move at slightly different speeds (parallax up to 20px)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headingParallaxY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const cardParallaxY = useTransform(scrollYProgress, [0, 1], [0, 14]);

  const headingLetters = "Reach out today".split("");

  return (
    <main
      ref={containerRef}
      className="w-full bg-[#f0f1f3] text-[#0a0a0a] min-h-screen overflow-x-hidden select-none font-sans"
    >
      {/* Smooth Scroll & Top Scroll Progress Bar */}
      <SmoothScroll />
      <ScrollProgressBar />

      {/* Fixed Navbar with Light Variant (height 94px, active "Contact" link in #6b7078, Black "Book a Demo" pill) */}
      <Navbar theme="light" />

      {/* Main Content Container: 1280px centered (x=313 to 1593 at 1900px reference) */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0 pt-[190px] lg:pt-[202px] pb-[150px]">
        {/* ================= HEADING ================= */}
        {/* "Reach out today": 64px, weight 400, letter-spacing -1.9px, line-height 1.1, #0a0a0a, vertical center at y=237 */}
        <motion.div
          style={{ y: prefersReduced ? 0 : headingParallaxY }}
          className="w-full"
        >
          <h1 className="text-[38px] sm:text-[50px] lg:text-[64px] font-normal leading-[1.1] tracking-[-1.9px] text-[#0a0a0a] overflow-hidden py-1">
            <span className="sr-only">Reach out today</span>
            <span aria-hidden="true" className="inline-block">
              {headingLetters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{
                    y: prefersReduced ? 0 : "100%",
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
                    delay: prefersReduced ? 0 : 0.06 + i * 0.02,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </h1>
        </motion.div>

        {/* ================= 60px SPACE BETWEEN HEADING AND CONTENT ================= */}
        {/* Columns: Left Form (810px wide) + Right Info Card (406px wide) with 64px gap */}
        <div className="mt-[60px] flex flex-col lg:flex-row lg:items-start justify-between gap-[48px] lg:gap-[64px]">
          {/* Left Column: Form (x=313 to 1123, 810px wide) */}
          <div className="w-full lg:w-[810px] flex-shrink-0">
            <ContactFormBlock isInView={isInView} />
          </div>

          {/* Right Column: Info Card (x=1187 to 1593, 406px wide, y=321 to 758, 437px tall) */}
          {/* Top at y=321, exactly 10px above the first form label row at y=331 */}
          <motion.div
            style={{ y: prefersReduced ? 0 : cardParallaxY }}
            className="w-full lg:w-[406px] flex-shrink-0 lg:-mt-[10px]"
          >
            <InfoCard isInView={isInView} />
          </motion.div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      {/* Existing Footer component directly below, after ~150px of empty space */}
      <Footer />
    </main>
  );
}
