"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import TrustBadge from "./TrustBadge";

export default function Hero() {
  const lineVariants: Variants = {
    hidden: { y: "115%", opacity: 0, filter: "blur(10px)" },
    visible: (custom: number) => ({
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.2 + custom * 0.14,
      },
    }),
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-0 pt-[104px] pb-6 relative z-10">
      <div className="flex flex-col items-start max-w-[760px]">
        {/* 1. Trust Badge (top at y=198px, height 46px -> bottom at y=244px) */}
        <div>
          <TrustBadge />
        </div>

        {/* 2. H1 (first line at y=305, second line at y=380; mt=61px from badge bottom) */}
        <h1 className="mt-[61px] text-white text-[42px] sm:text-[54px] lg:text-[64px] font-normal leading-[1.16] tracking-[-1.9px] select-text">
          <div className="overflow-hidden py-1">
            <motion.div
              custom={0}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              Cybersecurity services
            </motion.div>
          </div>
          <div className="overflow-hidden py-1">
            <motion.div
              custom={1}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              for a new era of risk
            </motion.div>
          </div>
        </h1>

        {/* 3. Subtext (at y=448px; mt=24px from H1 line 2) */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.44,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="text-white/95 text-[19px] sm:text-[24px] font-normal tracking-[-0.015em] mt-[24px]"
        >
          Protect your business from cyber threats.
        </motion.p>

        {/* 4. CTA Button (top at y=516 to 570; mt=42px from subtext) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.56,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="mt-[42px]"
        >
          <motion.a
            href="/contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden inline-flex items-center justify-center h-[54px] px-[32px] rounded-full bg-black text-white text-[16px] sm:text-[17px] font-medium tracking-tight shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.6)] hover:bg-[#0c0c0c] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {/* Light sweep shimmer effect */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-full">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
            </div>

            <span className="relative z-10">Book a Demo</span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
