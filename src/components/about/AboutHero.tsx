"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface AboutHeroProps {
  label: string;
  heading: string;
  photo: {
    src: string;
    alt: string;
  };
}

export default function AboutHero({ label, heading, photo }: AboutHeroProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const photoContainerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useSafeReducedMotion();
  const [imgError, setImgError] = useState(false);

  // Parallax on photo: moves vertically up to 40px inside its frame & zooms from 1.0 to 1.06 as page scrolls
  const { scrollYProgress } = useScroll({
    target: photoContainerRef,
    offset: ["start end", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const photoScrollScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.06]);

  const headingLines = heading.split("\n");

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f0f1f3] pt-[212px] pb-0 select-none text-[#0a0a0a]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        {/* Section Label: 15px, uppercase, letter-spacing 0.03em, weight 400, #0a0a0a */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0.2 : 0.6, ease: "easeOut" }}
          className="text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a]"
        >
          {label}
        </motion.div>

        {/* 40px below label: Heading revealed line-by-line (48px, line-height 1.22, letter-spacing -1px) */}
        <h1 className="mt-[40px] text-[34px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a] max-w-[830px]">
          {headingLines.map((line, idx) => (
            <div key={idx} className="overflow-hidden py-0.5">
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
                  duration: prefersReduced ? 0.2 : 0.8,
                  delay: prefersReduced ? 0 : 0.12 + idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* 70px below heading: Full-width Photo (1280px x 720px, sharp corners) */}
        <div
          ref={photoContainerRef}
          className="mt-[70px] relative w-full h-[360px] sm:h-[500px] lg:h-[720px] rounded-none overflow-hidden group select-none bg-gradient-to-br from-[#d4dee8] via-[#e2e9f0] to-[#ccd7e2]"
        >
          {/* Parallax & Scale container */}
          <motion.div
            style={{
              y: prefersReduced ? 0 : photoY,
              scale: prefersReduced ? 1 : photoScrollScale,
            }}
            initial={{
              scale: prefersReduced ? 1 : 1.15,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: prefersReduced ? 0.2 : 1.0,
              delay: prefersReduced ? 0 : 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full h-[115%] -top-[7.5%] relative transition-transform duration-900 ease-out group-hover:scale-[1.03]"
          >
            <div className="w-full h-full relative">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                unoptimized
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center rounded-none"
                priority
              />
            </div>
          </motion.div>

          {/* Wipe reveal curtain from bottom */}
          {!prefersReduced && (
            <motion.div
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{
                duration: 1.0,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0 bg-[#f0f1f3] origin-bottom pointer-events-none z-10"
            />
          )}
        </div>
      </div>
    </section>
  );
}
