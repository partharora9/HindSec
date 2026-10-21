"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { JobRole } from "@/types/careers";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface RoleRowProps {
  role: JobRole;
  index: number;
  totalRoles: number;
  hoveredRowId: string | null;
  setHoveredRowId: (id: string | null) => void;
}

export default function RoleRow({
  role,
  index,
  hoveredRowId,
  setHoveredRowId,
}: RoleRowProps) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();

  // Apply button state
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  // Scroll-linked focus: row nearest the vertical center stays at full opacity while others dim to 70%
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const scrollOpacityRaw = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.7, 0.88, 1, 0.88, 0.7]
  );
  const springScrollOpacity = useSpring(scrollOpacityRaw, {
    stiffness: 140,
    damping: 24,
  });

  // Calculate current opacity based on hover precedence and scroll focus
  const isSelfHovered = hoveredRowId === role.id;
  const isOtherHovered = hoveredRowId !== null && !isSelfHovered;

  let computedOpacity: number | any = springScrollOpacity;
  if (prefersReduced) {
    computedOpacity = 1;
  } else if (isSelfHovered) {
    computedOpacity = 1;
  } else if (isOtherHovered) {
    computedOpacity = 0.6;
  }

  // Magnetic hover for button: up to 8px
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReduced || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
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
    setBtnHovered(false);
    setBtnOffset({ x: 0, y: 0 });
  };

  const rowEntranceDelay = prefersReduced ? 0 : 0.12 * index;

  return (
    <div ref={rowRef} className="relative w-full">
      {/* 1px divider across full container width (#e2e4e8). First row has NO top divider */}
      {index > 0 && (
        <div className="w-full h-[1px] overflow-hidden">
          <motion.div
            initial={{ scaleX: prefersReduced ? 1 : 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: prefersReduced ? 1 : 0 }}
            transition={{
              duration: prefersReduced ? 0.1 : 0.7,
              delay: prefersReduced ? 0 : rowEntranceDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full h-[1px] bg-[#e2e4e8] origin-left"
          />
        </div>
      )}

      {/* Main Row Content */}
      <motion.div
        onMouseEnter={() => setHoveredRowId(role.id)}
        onMouseLeave={() => setHoveredRowId(null)}
        style={{
          opacity: computedOpacity,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative py-[48px] select-none"
      >
        {/* Hover background wash: rgba(240,241,243,0.7) extending 24px beyond text on both sides */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isSelfHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-y-0 -left-6 -right-6 bg-[rgba(240,241,243,0.7)] pointer-events-none z-0"
        />

        {/* 3 Columns Layout on 1280px Container */}
        <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-0">
          {/* Column 1: Job Title (x=309, 336px wide on 1280 container) */}
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 24 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 24 }
            }
            transition={{
              duration: prefersReduced ? 0.1 : 0.7,
              delay: prefersReduced ? 0 : rowEntranceDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full lg:w-[336px] flex-shrink-0"
          >
            {/* Title shifts 8px right on row hover */}
            <motion.h3
              animate={{ x: isSelfHovered && !prefersReduced ? 8 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[20px] sm:text-[22px] font-normal text-[#0a0a0a] leading-[27px] tracking-tight"
            >
              {role.title}
            </motion.h3>
          </motion.div>

          {/* Column 2: Location (x=645, 336px wide on 1280 container) */}
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 24 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 24 }
            }
            transition={{
              duration: prefersReduced ? 0.1 : 0.7,
              delay: prefersReduced ? 0 : rowEntranceDelay + 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full lg:w-[336px] flex-shrink-0"
          >
            <div className="text-[20px] sm:text-[22px] font-normal text-[#0a0a0a] leading-[27px] tracking-tight">
              {role.location}
            </div>
          </motion.div>

          {/* Column 3: Description & Apply Button (x=981 to 1589, 608px wide) */}
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 24 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 24 }
            }
            transition={{
              duration: prefersReduced ? 0.1 : 0.7,
              delay: prefersReduced ? 0 : rowEntranceDelay + 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full lg:w-[608px] flex-shrink-0 flex flex-col items-start"
          >
            {/* Description: 17px, line-height 27px, #4a4f5a, 2 to 3 lines */}
            <p className="text-[17px] leading-[27px] text-[#4a4f5a]">
              {role.description}
            </p>

            {/* 44px below description: Apply button */}
            <div className="mt-[44px]">
              <motion.a
                ref={buttonRef}
                href={`/contact?role=${role.slug}`}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={handleBtnMouseLeave}
                onMouseMove={handleBtnMouseMove}
                animate={{
                  x: prefersReduced ? 0 : btnOffset.x,
                  y: prefersReduced ? 0 : btnOffset.y,
                  scale: btnHovered && !prefersReduced ? 1.04 : 1,
                }}
                whileTap={{ scale: prefersReduced ? 1 : 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="w-[103px] h-[55px] rounded-full relative overflow-hidden bg-[#050505] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2b50ae] cursor-pointer"
                aria-label={`Apply for ${role.title}`}
              >
                {/* Blue fill (#2b50ae) sweeps in from the left on hover (400ms) */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: btnHovered ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-[#2b50ae] origin-left z-0"
                />

                {/* Centered content shifts left by 7px on hover; no layout shift of button width */}
                <motion.div
                  animate={{ x: btnHovered && !prefersReduced ? -7 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 flex items-center justify-center text-white text-[15px] font-medium leading-none"
                >
                  <span>Apply</span>
                  {/* Small arrow slides in to right of label (width 0 to 14px with 8px gap) */}
                  <motion.div
                    initial={{ width: 0, marginLeft: 0, opacity: 0 }}
                    animate={{
                      width: btnHovered ? 14 : 0,
                      marginLeft: btnHovered ? 8 : 0,
                      opacity: btnHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden flex items-center"
                  >
                    <svg
                      className="w-[14px] h-[14px] text-white flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
