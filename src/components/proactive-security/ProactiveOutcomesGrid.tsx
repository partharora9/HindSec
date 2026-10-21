"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface OutcomeItem {
  id: string;
  type: "radar" | "firewall" | "shield-check" | "eye-scan" | "shield-gear" | "cloud-refresh";
  title: string;
  description: string;
}

const outcomesData: OutcomeItem[] = [
  {
    id: "earlier-threat-detection",
    type: "radar",
    title: "Earlier threat detection",
    description:
      "Spot suspicious activity sooner and give your team more time to investigate, contain, and respond.",
  },
  {
    id: "reduced-attack-exposure",
    type: "firewall",
    title: "Reduced attack exposure",
    description:
      "Find exposed assets, weak controls, and security gaps before attackers can use them.",
  },
  {
    id: "faster-risk-response",
    type: "shield-check",
    title: "Faster risk response",
    description:
      "Prioritize issues by impact so your team can act quickly and focus on what matters first.",
  },
  {
    id: "clearer-security-visibility",
    type: "eye-scan",
    title: "Clearer security visibility",
    description:
      "Understand what is happening across your systems with cleaner reporting and better context.",
  },
  {
    id: "stronger-security-posture",
    type: "shield-gear",
    title: "Stronger security posture",
    description:
      "Improve your controls, processes, and monitoring with a practical plan for long-term protection.",
  },
  {
    id: "lower-incident-impact",
    type: "cloud-refresh",
    title: "Lower incident impact",
    description:
      "Reduce the chance of disruption by preparing your systems, teams, and response process in advance.",
  },
];

function OutcomeIcon({
  type,
  isHovered,
  isInView,
  delay = 0,
}: {
  type: OutcomeItem["type"];
  isHovered: boolean;
  isInView: boolean;
  delay?: number;
}) {
  const prefersReduced = useSafeReducedMotion();

  const drawTransition = {
    duration: prefersReduced ? 0 : 0.9,
    ease: "easeInOut" as const,
    delay: prefersReduced ? 0 : delay,
  };

  const pathInitial = {
    pathLength: prefersReduced ? 1 : 0,
    opacity: prefersReduced ? 1 : 0,
  };

  const pathAnimate = isInView ? { pathLength: 1, opacity: 1 } : pathInitial;

  switch (type) {
    case "radar":
      return (
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="overflow-visible"
        >
          <motion.circle
            cx="12"
            cy="12"
            r="9"
            initial={pathInitial}
            animate={pathAnimate}
            transition={drawTransition}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="4.8"
            initial={pathInitial}
            animate={pathAnimate}
            transition={drawTransition}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="1"
            fill="#0a0a0a"
            initial={{ opacity: prefersReduced ? 1 : 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: prefersReduced ? 0 : delay + 0.3 }}
          />
          <motion.path
            d="M12 3V6M12 18V21M3 12H6M18 12H21"
            initial={pathInitial}
            animate={pathAnimate}
            transition={drawTransition}
          />
          <motion.g
            animate={
              isHovered && !prefersReduced
                ? { rotate: 360 }
                : { rotate: 45 }
            }
            transition={
              isHovered && !prefersReduced
                ? { duration: 1.2, ease: "linear", repeat: Infinity }
                : { duration: 0.4 }
            }
            style={{ transformOrigin: "12px 12px" }}
          >
            <line x1="12" y1="12" x2="19.5" y2="7" stroke="#0a0a0a" strokeWidth="1.5" />
          </motion.g>
        </svg>
      );

    case "firewall":
      return (
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="overflow-visible"
        >
          <motion.g
            animate={
              isHovered && !prefersReduced
                ? { x: [0, -3, 3, 0] }
                : { x: 0 }
            }
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <motion.rect
              x="3"
              y="4.5"
              width="18"
              height="14"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            <motion.path
              d="M3 9.2H21M3 13.8H21"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            <motion.path
              d="M12 4.5V9.2M7.5 9.2V13.8M16.5 9.2V13.8M12 13.8V18.5"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            <motion.path
              d="M18 13.5L14.5 15V17.8C14.5 20 16 21.7 18 22.2C20 21.7 21.5 20 21.5 17.8V15L18 13.5Z"
              fill="#f0f1f3"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
          </motion.g>
        </svg>
      );

    case "shield-check":
      return (
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="overflow-visible"
        >
          <motion.g
            animate={
              isHovered && !prefersReduced
                ? { scale: [1, 1.12, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.45, ease: "easeInOut" }}
            style={{ transformOrigin: "12px 12px" }}
          >
            <motion.path
              d="M12 2.5L4.5 5.5V11.5C4.5 16.8 7.7 21.2 12 22.5C16.3 21.2 19.5 16.8 19.5 11.5V5.5L12 2.5Z"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            <motion.path
              d="M9 12L11 14L15 9.5"
              initial={pathInitial}
              animate={pathAnimate}
              transition={{ ...drawTransition, delay: delay + 0.2 }}
            />
          </motion.g>
        </svg>
      );

    case "eye-scan":
      return (
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="overflow-visible"
        >
          <motion.path
            d="M5 8V6a2 2 0 0 1 2-2h2M15 4h2a2 2 0 0 1 2 2v2M5 16v2a2 2 0 0 0 2 2h2M15 20h2a2 2 0 0 0 2-2v-2"
            initial={pathInitial}
            animate={pathAnimate}
            transition={drawTransition}
          />
          <motion.g
            animate={
              isHovered && !prefersReduced
                ? { scaleY: [1, 0.1, 1] }
                : { scaleY: 1 }
            }
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ transformOrigin: "12px 12px" }}
          >
            <motion.path
              d="M3 12C3 12 6.5 7.5 12 7.5C17.5 7.5 21 12 21 12C21 12 17.5 16.5 12 16.5C6.5 16.5 3 12 3 12Z"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            <motion.circle
              cx="12"
              cy="12"
              r="2.5"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
          </motion.g>
        </svg>
      );

    case "shield-gear":
      return (
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="overflow-visible"
        >
          {/* Shield outline */}
          <motion.path
            d="M12 2.5L4.5 5.5V11.5C4.5 16.8 7.7 21.2 12 22.5C16.3 21.2 19.5 16.8 19.5 11.5V5.5L12 2.5Z"
            initial={pathInitial}
            animate={pathAnimate}
            transition={drawTransition}
          />
          {/* Small gear in shield center that rotates 90deg on hover */}
          <motion.g
            animate={
              isHovered && !prefersReduced
                ? { rotate: 90 }
                : { rotate: 0 }
            }
            transition={{ duration: 0.45, ease: "easeInOut" }}
            style={{ transformOrigin: "12px 13px" }}
          >
            <motion.circle
              cx="12"
              cy="13"
              r="2.6"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            <motion.path
              d="M12 9.5V10.5M12 15.5V16.5M8.5 13H9.5M14.5 13H15.5M9.8 10.8L10.5 11.5M13.5 14.5L14.2 15.2M14.2 10.8L13.5 11.5M10.5 14.5L9.8 15.2"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
          </motion.g>
        </svg>
      );

    case "cloud-refresh":
      return (
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="overflow-visible"
        >
          {/* Cloud base */}
          <motion.path
            d="M5 16.5C3.3 16.5 2 15.2 2 13.5C2 12 3 10.7 4.5 10.5C4.7 7.5 7.2 5 10.3 5C12.7 5 14.7 6.5 15.6 8.7C16.1 8.5 16.6 8.3 17.2 8.3C19.3 8.3 21 10 21 12.1C21 12.4 20.9 12.8 20.8 13.1"
            initial={pathInitial}
            animate={pathAnimate}
            transition={drawTransition}
          />
          {/* Circular refresh arrow rotating 180deg on hover */}
          <motion.g
            animate={
              isHovered && !prefersReduced
                ? { rotate: 180 }
                : { rotate: 0 }
            }
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ transformOrigin: "14px 16px" }}
          >
            <motion.path
              d="M11 16.5A3.5 3.5 0 1 1 14.5 20"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            <motion.path
              d="M14.5 17.5V20H12"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
          </motion.g>
        </svg>
      );

    default:
      return null;
  }
}

function OutcomeCard({
  item,
  index,
  sectionInView,
}: {
  item: OutcomeItem;
  index: number;
  sectionInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useSafeReducedMotion();

  const staggerDelay = prefersReduced ? 0 : 0.15 + index * 0.09;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
      animate={
        sectionInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: prefersReduced ? 0 : 30 }
      }
      transition={{
        duration: prefersReduced ? 0 : 0.6,
        delay: staggerDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col items-start w-full cursor-default"
      style={{ minHeight: "220px" }}
    >
      {/* 44px thin-line icon, 40px gap */}
      <div className="w-[44px] h-[44px] flex items-center justify-center mb-[40px]">
        <OutcomeIcon
          type={item.type}
          isHovered={isHovered}
          isInView={sectionInView}
          delay={staggerDelay}
        />
      </div>

      {/* Title with 4px hover shift and growing underline */}
      <div className="relative inline-block">
        <motion.h3
          animate={isHovered && !prefersReduced ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-[26px] sm:text-[28px] lg:text-[30px] font-normal text-[#0a0a0a] leading-[1.2] tracking-normal"
        >
          {item.title}
        </motion.h3>

        {/* 1px line growing under title from left to right */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-[1px] bg-[#0a0a0a] origin-left w-full mt-[3px]"
        />
      </div>

      {/* Description: 14px gap, 17px, line-height 27px, #4a4f5a, max 3 lines */}
      <p className="mt-[14px] text-[17px] leading-[27px] text-[#4a4f5a] font-normal line-clamp-3">
        {item.description}
      </p>
    </motion.div>
  );
}

export default function ProactiveOutcomesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f0f1f3] pt-[150px] pb-[130px] select-none text-[#0a0a0a]"
      id="trusted-outcomes"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        {/* Section label: 15px, uppercase, letter-spacing 0.03em, weight 400, #0a0a0a */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 16 }}
          transition={{ duration: prefersReduced ? 0 : 0.6, ease: "easeOut" }}
          className="text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a]"
        >
          SECURIO SOLUTION SUITE
        </motion.div>

        {/* Section heading: 48px, weight 400, line-height 1.22, letter-spacing -1px, 40px below label */}
        <motion.h2
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 20 }}
          transition={{
            duration: prefersReduced ? 0 : 0.7,
            delay: prefersReduced ? 0 : 0.1,
            ease: "easeOut",
          }}
          className="mt-[40px] text-[34px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a]"
        >
          Trusted outcomes.
        </motion.h2>

        {/* 70px below heading: 3-column x 2-row grid (405px wide, 32px gap, row pitch ~273px) */}
        <div className="mt-[70px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[32px] gap-y-[52px]">
          {outcomesData.map((item, index) => (
            <OutcomeCard
              key={item.id}
              item={item}
              index={index}
              sectionInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
