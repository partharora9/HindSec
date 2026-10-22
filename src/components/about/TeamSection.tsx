"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { TeamMember } from "@/types/about";

interface TeamSectionProps {
  label: string;
  heading: string;
  members: TeamMember[];
}

export default function TeamSection({
  label,
  heading,
  members,
}: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Cursor following tooltip pill state
  const [tooltipPos, setTooltipPos] = useState({ x: -9999, y: -9999 });
  const [showTooltip, setShowTooltip] = useState(false);
  const targetPos = useRef({ x: -9999, y: -9999 });
  const currentPos = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (prefersReduced) return;

    let rafId: number;
    const loop = () => {
      if (showTooltip && targetPos.current.x > -9000) {
        currentPos.current.x +=
          (targetPos.current.x - currentPos.current.x) * 0.18;
        currentPos.current.y +=
          (targetPos.current.y - currentPos.current.y) * 0.18;
        setTooltipPos({
          x: Math.round(currentPos.current.x),
          y: Math.round(currentPos.current.y),
        });
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [showTooltip, prefersReduced]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const headingLines = heading.split("\n");

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#f0f1f3] pt-[130px] pb-[100px] select-none text-[#0a0a0a]"
      id="team"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        {/* Section Label: 15px, uppercase, letter-spacing 0.03em, weight 400, #0a0a0a */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReduced ? 0 : 16 }
          }
          transition={{ duration: prefersReduced ? 0.2 : 0.6, ease: "easeOut" }}
          className="text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a]"
        >
          {label}
        </motion.div>

        {/* 40px below label: Heading "Experts in security &\ncompliance" (48px) */}
        <h2 className="mt-[40px] text-[34px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a]">
          {headingLines.map((line, idx) => (
            <div key={idx} className="overflow-hidden py-0.5">
              <motion.div
                initial={{
                  y: prefersReduced ? 0 : "105%",
                  filter: prefersReduced ? "blur(0px)" : "blur(8px)",
                  opacity: prefersReduced ? 1 : 0,
                }}
                animate={
                  isInView
                    ? { y: 0, filter: "blur(0px)", opacity: 1 }
                    : {}
                }
                transition={{
                  duration: prefersReduced ? 0.2 : 0.8,
                  delay: prefersReduced ? 0 : 0.1 + idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </h2>

        {/* 80px below heading: 4-column team row (328px pitch, text only, no photos) */}
        <div className="mt-[80px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 gap-x-[32px] w-full">
          {members.map((member, idx) => {
            const isHovered = hoveredIndex === idx;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
                animate={
                  isInView
                    ? {
                        opacity: isDimmed ? 0.55 : 1,
                        y: 0,
                      }
                    : { opacity: 0, y: prefersReduced ? 0 : 24 }
                }
                transition={{
                  y: {
                    duration: prefersReduced ? 0.2 : 0.6,
                    delay: prefersReduced ? 0 : 0.15 + idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  opacity: { duration: 0.25 },
                }}
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  setShowTooltip(true);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setShowTooltip(false);
                }}
                className="flex flex-col items-start cursor-pointer group select-none relative"
              >
                {/* Member Portrait Photo (Square, sharp corners, matching screenshot) */}
                {member.image && (
                  <div className="relative w-full aspect-square overflow-hidden rounded-none mb-[20px] bg-[#dbe1e8]">
                    <Image
                      src={member.image}
                      alt={member.alt || `${member.name} - ${member.role}`}
                      fill
                      unoptimized
                      priority={idx < 2}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 296px"
                      className="object-cover object-center rounded-none transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />

                    {/* Wipe reveal curtain from bottom */}
                    {!prefersReduced && (
                      <motion.div
                        initial={{ scaleY: 1 }}
                        whileInView={{ scaleY: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.15 + idx * 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute inset-0 bg-[#f0f1f3] origin-bottom pointer-events-none z-10"
                      />
                    )}
                  </div>
                )}

                {/* Member Name (26px, weight 400, shifts 6px right on hover) */}
                <div className="relative inline-block">
                  <motion.h3
                    animate={
                      isHovered && !prefersReduced ? { x: 6 } : { x: 0 }
                    }
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-[22px] sm:text-[24px] lg:text-[26px] font-normal text-[#0a0a0a] leading-[1.25] tracking-tight"
                  >
                    {member.name}
                  </motion.h3>

                  {/* 1px underline growing under name on hover (300ms) */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-[1px] bg-[#0a0a0a] origin-left w-full mt-[3px]"
                  />
                </div>

                {/* Role: 14px below name, 17px, turns #0a0a0a on hover */}
                <span
                  className={`mt-[14px] text-[16px] sm:text-[17px] font-normal leading-normal transition-colors duration-250 ${
                    isHovered ? "text-[#0a0a0a]" : "text-[#4a4f5a]"
                  }`}
                >
                  {member.role}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cursor-following floating decoration tooltip pill */}
      {!prefersReduced && showTooltip && tooltipPos.x > -9000 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-[135%]"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <div className="bg-[#050505] text-white text-[13px] font-medium px-3.5 py-1.5 rounded-full shadow-lg shadow-black/25 flex items-center justify-center whitespace-nowrap">
            View profile
          </div>
        </motion.div>
      )}
    </section>
  );
}
