"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import TrustBadge from "./TrustBadge";
import { heroContent } from "@/content/siteContent";

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
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0 pt-[88px] sm:pt-[104px] pb-6 relative z-10">
      <div className="flex flex-col items-start max-w-[760px]">
        {/* 1. Trust Badge */}
        <div className="max-w-full">
          <TrustBadge />
        </div>

        {/* 2. Responsive H1 */}
        <h1 className="mt-[28px] sm:mt-[44px] lg:mt-[61px] text-white text-[32px] min-[390px]:text-[38px] sm:text-[52px] lg:text-[64px] font-normal leading-[1.14] sm:leading-[1.16] tracking-tight sm:tracking-[-1.9px] select-text">
          <div className="overflow-hidden py-1">
            <motion.div
              custom={0}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {heroContent.h1Line1}
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
              {heroContent.h1Line2}
            </motion.div>
          </div>
        </h1>

        {/* 3. Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.44,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="text-white/95 text-[16px] sm:text-[20px] lg:text-[24px] font-normal tracking-[-0.015em] mt-[18px] sm:mt-[24px] leading-relaxed"
        >
          {heroContent.subtext}
        </motion.p>

        {/* 4. CTA Button (Touch target >= 44x44px) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.56,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="mt-[28px] sm:mt-[36px] lg:mt-[42px] w-full sm:w-auto"
        >
          <motion.a
            href={heroContent.ctaHref}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] h-[52px] sm:h-[54px] px-[28px] sm:px-[32px] rounded-full bg-black text-white text-[16px] sm:text-[17px] font-medium tracking-tight shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.6)] hover:bg-[#0c0c0c] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {/* Light sweep shimmer effect */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-full">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
            </div>

            <span className="relative z-10">{heroContent.ctaButton}</span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
