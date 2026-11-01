"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import FooterBackground from "@/components/footer/FooterBackground";
import MagneticButton from "@/components/footer/MagneticButton";
import FooterLinks from "@/components/footer/FooterLinks";

import { footerContent, BRAND_NAME } from "@/content/siteContent";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });
  const prefersReduced = useSafeReducedMotion();

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const headingParallaxY = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const bgShiftY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const darkExpandScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  // Hover state for interactive underline links
  const [hoveredBottomLink, setHoveredBottomLink] = useState<string | null>(null);

  const bottomLinks = footerContent.bottomLinks;

  return (
    <footer
      ref={footerRef}
      className="relative w-full min-h-0 lg:min-h-[860px] lg:h-auto overflow-hidden select-none font-sans text-white z-20"
      style={{
        marginTop: 0,
      }}
    >
      {/* ================= DYNAMIC BACKGROUND ================= */}
      <FooterBackground
        parallaxY={bgShiftY}
        darkScale={darkExpandScale}
      />

      {/* ================= 1280px CONTENT CONTAINER ================= */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-0 flex flex-col justify-between pt-[50px] pb-[40px] lg:pt-[80px] lg:pb-[53px]">
        {/* Main Content Layout: Left and Right Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-y-0 w-full items-start">
          {/* ================= LEFT COLUMN (Cols 1-4) ================= */}
          <div
            className="lg:col-span-4 flex flex-col items-start order-2 lg:order-1 pt-6 lg:pt-[250px]"
            style={{
              textShadow: "0 1px 14px rgba(10, 30, 100, 0.4)",
            }}
          >
            {/* HindSec Official Logo - Clean Transparent */}
            <Link
              href="/"
              className="group inline-flex items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b16] rounded-lg"
              aria-label="HindSec – Cybersecurity & AI Security Services"
            >
              <Image
                src="/images/hindsec-logo.png"
                alt="HindSec – Cybersecurity & AI Security Services"
                width={204}
                height={64}
                className="h-[48px] sm:h-[56px] lg:h-[64px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </Link>

            {/* Tagline: "Find it before attackers do" (18px, weight 400) */}
            <motion.p
              initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: prefersReduced ? 0 : 14 }
              }
              transition={{
                duration: prefersReduced ? 0 : 0.65,
                delay: prefersReduced ? 0 : 0.45,
                ease: "easeOut",
              }}
              className="mt-[24px] sm:mt-[36px] text-[16px] sm:text-[18px] font-normal text-white tracking-tight"
            >
              {footerContent.tagline}
            </motion.p>
          </div>

          {/* ================= RIGHT COLUMN (Cols 5-12) ================= */}
          <div className="lg:col-span-8 flex flex-col items-start lg:pl-10 xl:pl-14 order-1 lg:order-2 w-full">
            {/* Heading */}
            <motion.div
              style={{ y: prefersReduced ? 0 : headingParallaxY }}
              className="flex flex-col items-start"
            >
              <h2 className="text-[26px] sm:text-[38px] lg:text-[48px] font-normal leading-[1.2] sm:leading-[1.22] tracking-tight sm:tracking-[-1px] text-white">
                {/* Line 1: Request a free */}
                <div className="overflow-hidden py-0.5">
                  <motion.div
                    initial={{
                      y: prefersReduced ? "0%" : "105%",
                      filter: prefersReduced ? "blur(0px)" : "blur(6px)",
                      opacity: prefersReduced ? 1 : 0,
                    }}
                    animate={
                      isInView
                        ? { y: "0%", filter: "blur(0px)", opacity: 1 }
                        : {}
                    }
                    transition={{
                      duration: prefersReduced ? 0 : 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex flex-wrap"
                  >
                    {footerContent.headingLine1.split(" ").map((word, wIdx) => (
                      <motion.span
                        key={wIdx}
                        whileHover={prefersReduced ? {} : { y: -3 }}
                        transition={{ duration: 0.15 }}
                        className="inline-block cursor-default mr-[0.25em]"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Line 2: VAPT scoping call */}
                <div className="overflow-hidden py-0.5">
                  <motion.div
                    initial={{
                      y: prefersReduced ? "0%" : "105%",
                      filter: prefersReduced ? "blur(0px)" : "blur(6px)",
                      opacity: prefersReduced ? 1 : 0,
                    }}
                    animate={
                      isInView
                        ? { y: "0%", filter: "blur(0px)", opacity: 1 }
                        : {}
                    }
                    transition={{
                      duration: prefersReduced ? 0 : 0.8,
                      delay: prefersReduced ? 0 : 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex flex-wrap"
                  >
                    {footerContent.headingLine2.split(" ").map((word, wIdx) => (
                      <motion.span
                        key={wIdx}
                        whileHover={prefersReduced ? {} : { y: -3 }}
                        transition={{ duration: 0.15 }}
                        className="inline-block cursor-default mr-[0.25em]"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </h2>
            </motion.div>

            {/* White pill button: Get a Free Quote */}
            <div className="mt-[24px] sm:mt-[36px]">
              <MagneticButton isInView={isInView} delay={0.28} />
            </div>

            {/* Link columns responsive gap */}
            <div className="mt-[36px] sm:mt-[50px] lg:mt-[78px] w-full">
              <FooterLinks isInView={isInView} />
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR (y=693 to 762) ================= */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between pt-12 lg:pt-0 gap-y-4">
          {/* Bottom Left: Links & Credits */}
          <div className="flex flex-col items-start gap-y-[26px]">
            {/* Links row: Privacy Policy, Terms of Service */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: prefersReduced ? 0 : 10 }
              }
              transition={{
                duration: prefersReduced ? 0 : 0.55,
                delay: prefersReduced ? 0 : 0.5,
              }}
              className="flex items-center gap-[16px]"
            >
              {bottomLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onMouseEnter={() => setHoveredBottomLink(link.title)}
                  onMouseLeave={() => setHoveredBottomLink(null)}
                  className="relative inline-flex flex-col group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                >
                  <span className="text-[14px] sm:text-[15px] font-normal text-white">
                    {link.title}
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: hoveredBottomLink === link.title ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-[1px] bg-white origin-left w-full mt-[1px]"
                  />
                </Link>
              ))}
            </motion.div>

            {/* Credit line: © <current year> HindSEC. All rights reserved. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: prefersReduced ? 0 : 0.55,
                delay: prefersReduced ? 0 : 0.6,
              }}
              className="text-[14px] text-white/70"
            >
              {footerContent.copyrightText}
            </motion.div>
          </div>

          {/* Bottom Right: Authorized testing only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: prefersReduced ? 0 : 0.55,
              delay: prefersReduced ? 0 : 0.65,
            }}
            className="text-[14px] text-white/70 self-start sm:self-end"
          >
            {footerContent.authorizedNotice}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
