"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { ServiceDeliveryData } from "@/types/service";

interface ServiceDeliveryProps {
  data: ServiceDeliveryData;
}

export default function ServiceDelivery({ data }: ServiceDeliveryProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();
  const [imgError, setImgError] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Scroll tracking to calculate active step nearest to center of screen
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const photoParallax = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.33) {
        setActiveStep(0);
      } else if (latest < 0.66) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f0f1f3] pt-[130px] pb-0 select-none text-[#0a0a0a]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] lg:h-[720px] items-stretch">
          {/* ================= LEFT COLUMN (Heading + 3 Delivery Items) ================= */}
          <div className="flex flex-col justify-between h-full max-w-[608px]">
            {/* Top Heading */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{
                  duration: prefersReduced ? 0.2 : 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[34px] sm:text-[40px] lg:text-[48px] font-normal text-[#0a0a0a] leading-[1.22] tracking-[-1px]"
              >
                {data.heading}
              </motion.h2>
            </div>

            {/* Bottom: 3 Items aligned to bottom edge of photo */}
            <div className="mt-[60px] lg:mt-0 flex flex-col justify-end">
              {data.items.map((item, idx) => {
                const isActive = activeStep === idx;
                const isHovered = hoveredIndex === idx;

                return (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
                    animate={
                      isInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: prefersReduced ? 0 : 24 }
                    }
                    transition={{
                      duration: prefersReduced ? 0.2 : 0.6,
                      delay: prefersReduced ? 0 : 0.15 + idx * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="flex flex-col justify-between py-[24px] cursor-default group"
                  >
                    {/* Top line divider above each item */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{
                        duration: prefersReduced ? 0 : 0.6,
                        delay: prefersReduced ? 0 : 0.1 + idx * 0.12,
                        ease: "easeOut",
                      }}
                      className="w-full h-[1px] bg-[#cfd1d5] origin-left mb-[20px]"
                    />

                    {/* Title & Number */}
                    <div className="flex items-center justify-between">
                      <motion.h3
                        animate={
                          isHovered && !prefersReduced
                            ? { x: 6, opacity: 1 }
                            : {
                                x: 0,
                                opacity: isActive || isHovered ? 1 : 0.55,
                              }
                        }
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="text-[22px] sm:text-[26px] font-normal text-[#0a0a0a] tracking-normal transition-opacity duration-200"
                      >
                        {item.title}
                      </motion.h3>

                      {/* Number: right-aligned, turns #2b50ae when active */}
                      <span
                        className={`text-[22px] sm:text-[26px] font-normal transition-colors duration-200 ${
                          isActive || isHovered ? "text-[#2b50ae]" : "text-[#0a0a0a]"
                        }`}
                      >
                        {item.number}
                      </span>
                    </div>

                    {/* Description: 24px below title, 17px, line-height 27px, #4a4f5a, 2 lines */}
                    <p className="mt-[20px] text-[17px] leading-[27px] text-[#4a4f5a] font-normal">
                      {item.description}
                    </p>

                    {/* Bottom line divider after the last item */}
                    {idx === data.items.length - 1 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{
                          duration: prefersReduced ? 0 : 0.6,
                          delay: prefersReduced ? 0 : 0.45,
                          ease: "easeOut",
                        }}
                        className="w-full h-[1px] bg-[#cfd1d5] origin-left mt-[24px]"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Photo) ================= */}
          <div className={`relative w-full h-[440px] sm:h-[540px] lg:h-[720px] max-w-[608px] overflow-hidden rounded-none ${data.photo.fallbackGradient || "bg-gradient-to-br from-[#123145] via-[#1a445d] to-[#0d2232]"}`}>
            <motion.div
              initial={{
                opacity: 0,
                scale: prefersReduced ? 1 : 1.1,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: prefersReduced ? 0.2 : 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={prefersReduced ? {} : { y: photoParallax }}
              className="relative w-full h-full"
            >
              <Image
                src={data.photo.src}
                alt={data.photo.alt}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 608px"
                className="object-cover object-center rounded-none"
                priority
              />
            </motion.div>

            {/* Hardware-accelerated wipe reveal curtain from bottom */}
            {!prefersReduced && (
              <motion.div
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 bg-[#f0f1f3] origin-bottom pointer-events-none z-10"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
