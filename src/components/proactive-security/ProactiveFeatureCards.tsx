"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface CardData {
  id: string;
  type: "radar" | "firewall" | "eye";
  title: string;
  description: string;
}

const cardsData: CardData[] = [
  {
    id: "continuous-monitoring",
    type: "radar",
    title: "Continuous threat monitoring",
    description:
      "We track suspicious activity, review signals, and help your team act before small risks become larger security issues.",
  },
  {
    id: "attack-surface",
    type: "firewall",
    title: "Attack surface management",
    description:
      "We track suspicious activity, review signals, and help your team act before small risks become larger security issues.",
  },
  {
    id: "posture-review",
    type: "eye",
    title: "Security posture review",
    description:
      "We assess your current controls, gaps, and priorities to help improve security with clear next steps.",
  },
];

function CardIcon({
  type,
  isHovered,
  isInView,
  delay = 0,
}: {
  type: "radar" | "firewall" | "eye";
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
          {/* Outer circle */}
          <motion.circle
            cx="12"
            cy="12"
            r="9"
            initial={pathInitial}
            animate={pathAnimate}
            transition={drawTransition}
          />
          {/* Inner circle */}
          <motion.circle
            cx="12"
            cy="12"
            r="4.8"
            initial={pathInitial}
            animate={pathAnimate}
            transition={drawTransition}
          />
          {/* Center target dot */}
          <motion.circle
            cx="12"
            cy="12"
            r="1"
            fill="#0a0a0a"
            initial={{ opacity: prefersReduced ? 1 : 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: prefersReduced ? 0 : delay + 0.3 }}
          />
          {/* Crosshairs */}
          <motion.path
            d="M12 3V6M12 18V21M3 12H6M18 12H21"
            initial={pathInitial}
            animate={pathAnimate}
            transition={drawTransition}
          />
          {/* Radar sweep line that rotates 360deg on hover */}
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
            {/* Wall outer box */}
            <motion.rect
              x="3"
              y="4.5"
              width="18"
              height="14"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Horizontal mortar lines */}
            <motion.path
              d="M3 9.2H21M3 13.8H21"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Vertical brick lines */}
            <motion.path
              d="M12 4.5V9.2M7.5 9.2V13.8M16.5 9.2V13.8M12 13.8V18.5"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Small shield overlaid at bottom right */}
            <motion.path
              d="M18 13.5L14.5 15V17.8C14.5 20 16 21.7 18 22.2C20 21.7 21.5 20 21.5 17.8V15L18 13.5Z"
              fill="#ffffff"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
          </motion.g>
        </svg>
      );

    case "eye":
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
          {/* Rounded scan frame brackets */}
          <motion.path
            d="M5 8V6a2 2 0 0 1 2-2h2M15 4h2a2 2 0 0 1 2 2v2M5 16v2a2 2 0 0 0 2 2h2M15 20h2a2 2 0 0 0 2-2v-2"
            initial={pathInitial}
            animate={pathAnimate}
            transition={drawTransition}
          />
          {/* Eye in center that blinks on hover */}
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

    default:
      return null;
  }
}

export default function ProactiveFeatureCards() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f0f1f3] pt-[89px] pb-0 select-none"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {cardsData.map((card, idx) => {
            const isHovered = hoveredCard === card.id;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 40 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: prefersReduced ? 0 : 40 }
                }
                whileHover={!prefersReduced ? { y: -6 } : {}}
                transition={{
                  duration: prefersReduced ? 0.2 : 0.65,
                  delay: prefersReduced ? 0 : idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative bg-white w-full lg:w-[405px] h-auto lg:h-[320px] p-[32px] rounded-none flex flex-col justify-start cursor-default overflow-hidden"
              >
                {/* 44px thin-line icon at the top (34px from card top) */}
                <div className="w-[44px] h-[44px] flex items-center justify-start flex-shrink-0">
                  <CardIcon
                    type={card.type}
                    isHovered={isHovered}
                    isInView={isInView}
                    delay={idx * 0.12}
                  />
                </div>

                {/* 36px below icon: Title (30px, weight 400, line-height 37px, #0a0a0a, up to 2 lines) */}
                <h3 className="mt-[36px] text-[26px] sm:text-[30px] font-normal leading-[37px] text-[#0a0a0a] tracking-[-0.01em]">
                  {card.title}
                </h3>

                {/* 14px below title: Description (17px, line-height 27px, #4a4f5a, 3 lines) */}
                <p className="mt-[14px] text-[17px] leading-[27px] text-[#4a4f5a] font-normal line-clamp-3">
                  {card.description}
                </p>

                {/* 2px black line growing along the card's bottom edge on hover */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0a0a0a] origin-left pointer-events-none"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
