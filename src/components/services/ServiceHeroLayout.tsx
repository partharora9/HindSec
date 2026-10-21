"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface ServiceHeroLayoutProps {
  title: string;
  paragraph: React.ReactNode;
  background: React.ReactNode;
}

export default function ServiceHeroLayout({
  title,
  paragraph,
  background,
}: ServiceHeroLayoutProps) {
  const prefersReduced = useSafeReducedMotion();
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Magnetic hover for button
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const btnRef = useRef<HTMLAnchorElement | null>(null);

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReduced || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.25;
    const deltaY = (e.clientY - centerY) * 0.25;
    setBtnOffset({
      x: Math.max(-8, Math.min(8, deltaX)),
      y: Math.max(-8, Math.min(8, deltaY)),
    });
  };

  const handleBtnMouseLeave = () => {
    setIsBtnHovered(false);
    setBtnOffset({ x: 0, y: 0 });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[605px] bg-[#000000] overflow-hidden select-none"
      style={{
        borderBottom: "1px solid #000000",
      }}
    >
      {/* Background layer (Aurora beams or Digital Bars Canvas or Halftone Dots Canvas) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {background}
      </div>

      {/* Hero content layer (Centered 1280px Container, left edge x=313) */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-0 h-full flex flex-col justify-start pt-[256px]">
        {/* H1: 64px, weight 400, letter-spacing -1.9px, white */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%", opacity: 0, filter: "blur(12px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: prefersReduced ? 0.3 : 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[40px] sm:text-[52px] lg:text-[64px] font-normal text-white tracking-[-1.9px] leading-[1.08]"
          >
            {title}
          </motion.h1>
        </div>

        {/* Paragraph: 18px, weight 500, line-height 27px, white, max-w 640px */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: prefersReduced ? 0.3 : 0.7,
            delay: prefersReduced ? 0 : 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-[22px] text-[17px] sm:text-[18px] font-medium leading-[27px] text-white max-w-[640px]"
        >
          {paragraph}
        </motion.div>

        {/* White pill button "Book a Demo" at y=451-506 (156x55px, text #0a0a0a, 15px, weight 500) */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: prefersReduced ? 0.3 : 0.6,
            delay: prefersReduced ? 0 : 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-[29px]"
        >
          <motion.a
            ref={btnRef}
            href="/contact"
            onMouseMove={handleBtnMouseMove}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={handleBtnMouseLeave}
            animate={
              prefersReduced
                ? {}
                : {
                    x: btnOffset.x,
                    y: btnOffset.y,
                    scale: isBtnHovered ? 1.04 : 1,
                  }
            }
            whileTap={{ scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 20,
            }}
            className="inline-flex items-center justify-center w-[156px] h-[55px] rounded-full bg-white text-[#0a0a0a] text-[15px] font-medium shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_28px_rgba(255,255,255,0.45)] transition-shadow duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Book a Demo
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
