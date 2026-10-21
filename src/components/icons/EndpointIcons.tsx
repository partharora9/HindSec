"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface BaseIconProps {
  isHovered: boolean;
  isInView: boolean;
  delay?: number;
}

// 1. Monitor + Phone Icon (Card 1: Device protection & Outcome 1: Safer user devices)
export function MonitorPhoneIcon({
  isHovered,
  isInView,
  delay = 0,
}: BaseIconProps) {
  const prefersReduced = useSafeReducedMotion();
  const transition = {
    duration: prefersReduced ? 0 : 0.9,
    delay: prefersReduced ? 0 : delay,
    ease: "easeInOut" as const,
  };
  const pathInitial = { pathLength: prefersReduced ? 1 : 0 };
  const pathAnimate = isInView ? { pathLength: 1 } : pathInitial;

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
      {/* Desktop monitor: shifts left on hover */}
      <motion.g
        animate={
          isHovered && !prefersReduced
            ? { x: -3, transition: { duration: 0.35, ease: "easeOut" } }
            : { x: 0 }
        }
      >
        {/* Screen frame */}
        <motion.rect
          x="2.5"
          y="3.5"
          width="15"
          height="11"
          rx="1"
          initial={pathInitial}
          animate={pathAnimate}
          transition={transition}
        />
        {/* Monitor stand neck */}
        <motion.line
          x1="9.5"
          y1="14.5"
          x2="9.5"
          y2="17.5"
          initial={pathInitial}
          animate={pathAnimate}
          transition={transition}
        />
        {/* Monitor stand base */}
        <motion.line
          x1="6.5"
          y1="17.5"
          x2="12.5"
          y2="17.5"
          initial={pathInitial}
          animate={pathAnimate}
          transition={transition}
        />
      </motion.g>

      {/* Smartphone in front: shifts right on hover */}
      <motion.g
        animate={
          isHovered && !prefersReduced
            ? { x: 3, transition: { duration: 0.35, ease: "easeOut" } }
            : { x: 0 }
        }
      >
        {/* Phone body */}
        <motion.rect
          x="15"
          y="10"
          width="6.5"
          height="10.5"
          rx="1"
          fill="#f0f1f3"
          initial={pathInitial}
          animate={pathAnimate}
          transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.15 }}
        />
        {/* Phone home dot */}
        <motion.circle
          cx="18.25"
          cy="18.5"
          r="0.65"
          fill="#0a0a0a"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: prefersReduced ? 0 : delay + 0.35 }}
        />
      </motion.g>
    </svg>
  );
}

// 2. Radar Sweep Icon (Card 2: Endpoint detection and response)
export function RadarSweepIcon({
  isHovered,
  isInView,
  delay = 0,
}: BaseIconProps) {
  const prefersReduced = useSafeReducedMotion();
  const transition = {
    duration: prefersReduced ? 0 : 0.9,
    delay: prefersReduced ? 0 : delay,
    ease: "easeInOut" as const,
  };
  const pathInitial = { pathLength: prefersReduced ? 1 : 0 };
  const pathAnimate = isInView ? { pathLength: 1 } : pathInitial;

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
      {/* Outer radar circle */}
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        initial={pathInitial}
        animate={pathAnimate}
        transition={transition}
      />
      {/* Inner circle */}
      <motion.circle
        cx="12"
        cy="12"
        r="5"
        initial={pathInitial}
        animate={pathAnimate}
        transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.1 }}
      />
      {/* Center blip */}
      <motion.circle
        cx="12"
        cy="12"
        r="1"
        fill="#0a0a0a"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: prefersReduced ? 0 : delay + 0.3 }}
      />
      {/* Crosshairs */}
      <motion.path
        d="M12 3V6M12 18V21M3 12H6M18 12H21"
        initial={pathInitial}
        animate={pathAnimate}
        transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.15 }}
      />
      {/* Rotating sweep line and arc */}
      <motion.g
        animate={
          isHovered && !prefersReduced
            ? { rotate: 360 }
            : { rotate: 0 }
        }
        transition={
          isHovered && !prefersReduced
            ? { duration: 1.2, ease: "linear", repeat: Infinity }
            : { duration: 0.45, ease: "easeOut" }
        }
        style={{ transformOrigin: "12px 12px" }}
      >
        <line x1="12" y1="12" x2="19.5" y2="7.5" stroke="#0a0a0a" strokeWidth="1.5" />
        <path
          d="M19.5 7.5A9 9 0 0 0 12 3"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
      </motion.g>
    </svg>
  );
}

// 3. Padlock Icon (Card 3: Patch and policy control & Outcome 3: Centralized device control)
export function PadlockIcon({
  isHovered,
  isInView,
  delay = 0,
}: BaseIconProps) {
  const prefersReduced = useSafeReducedMotion();
  const transition = {
    duration: prefersReduced ? 0 : 0.9,
    delay: prefersReduced ? 0 : delay,
    ease: "easeInOut" as const,
  };
  const pathInitial = { pathLength: prefersReduced ? 1 : 0 };
  const pathAnimate = isInView ? { pathLength: 1 } : pathInitial;

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
      {/* Shackle: rotates/opens 20deg on hover */}
      <motion.path
        d="M8 10V6.5C8 4.3 9.8 2.5 12 2.5C14.2 2.5 16 4.3 16 6.5V10"
        initial={pathInitial}
        animate={
          isHovered && !prefersReduced
            ? { rotate: -20, y: -2 }
            : { rotate: 0, y: 0, ...pathAnimate }
        }
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        style={{ transformOrigin: "8px 10px" }}
      />
      {/* Lock Body */}
      <motion.rect
        x="5"
        y="10"
        width="14"
        height="11"
        rx="1.5"
        initial={pathInitial}
        animate={pathAnimate}
        transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.15 }}
      />
      {/* Keyhole dot & slot */}
      <motion.circle
        cx="12"
        cy="14.5"
        r="1.2"
        fill="#0a0a0a"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: prefersReduced ? 0 : delay + 0.3 }}
      />
      <motion.line
        x1="12"
        y1="15.5"
        x2="12"
        y2="17.5"
        initial={pathInitial}
        animate={pathAnimate}
        transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.25 }}
      />
    </svg>
  );
}

// 4. Sort Arrow Icon (Outcome 2: Reduced malware risk)
export function SortArrowIcon({
  isHovered,
  isInView,
  delay = 0,
}: BaseIconProps) {
  const prefersReduced = useSafeReducedMotion();
  const transition = {
    duration: prefersReduced ? 0 : 0.9,
    delay: prefersReduced ? 0 : delay,
    ease: "easeInOut" as const,
  };
  const pathInitial = { pathLength: prefersReduced ? 1 : 0 };
  const pathAnimate = isInView ? { pathLength: 1 } : pathInitial;

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
      {/* Down arrow on left: slides down 4px on hover */}
      <motion.g
        animate={
          isHovered && !prefersReduced
            ? { y: 4, transition: { duration: 0.35, ease: "easeOut" } }
            : { y: 0 }
        }
      >
        <motion.line
          x1="6"
          y1="5"
          x2="6"
          y2="19"
          initial={pathInitial}
          animate={pathAnimate}
          transition={transition}
        />
        <motion.polyline
          points="3 16 6 19 9 16"
          initial={pathInitial}
          animate={pathAnimate}
          transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.1 }}
        />
      </motion.g>

      {/* Sorting horizontal lines of decreasing length on right */}
      <motion.line
        x1="12"
        y1="7"
        x2="21"
        y2="7"
        initial={pathInitial}
        animate={pathAnimate}
        transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.15 }}
      />
      <motion.line
        x1="12"
        y1="12"
        x2="18"
        y2="12"
        initial={pathInitial}
        animate={pathAnimate}
        transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.22 }}
      />
      <motion.line
        x1="12"
        y1="17"
        x2="15"
        y2="17"
        initial={pathInitial}
        animate={pathAnimate}
        transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.3 }}
      />
    </svg>
  );
}

// 5. Shield Exclamation Icon (Outcome 4: Faster incident response)
export function ShieldExclamationIcon({
  isHovered,
  isInView,
  delay = 0,
}: BaseIconProps) {
  const prefersReduced = useSafeReducedMotion();
  const transition = {
    duration: prefersReduced ? 0 : 0.9,
    delay: prefersReduced ? 0 : delay,
    ease: "easeInOut" as const,
  };
  const pathInitial = { pathLength: prefersReduced ? 1 : 0 };
  const pathAnimate = isInView ? { pathLength: 1 } : pathInitial;

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
            ? {
                scale: [1, 1.12, 1],
                transition: { duration: 0.45, ease: "easeInOut" },
              }
            : { scale: 1 }
        }
        style={{ transformOrigin: "12px 12px" }}
      >
        {/* Shield outline */}
        <motion.path
          d="M12 2.5L4.5 5.5V11.5C4.5 16.8 7.7 21.2 12 22.5C16.3 21.2 19.5 16.8 19.5 11.5V5.5L12 2.5Z"
          initial={pathInitial}
          animate={pathAnimate}
          transition={transition}
        />
        {/* Exclamation vertical stem */}
        <motion.path
          d="M12 8V13.5"
          initial={pathInitial}
          animate={pathAnimate}
          transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.2 }}
        />
        {/* Exclamation dot */}
        <motion.circle
          cx="12"
          cy="16.5"
          r="0.8"
          fill="#0a0a0a"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: prefersReduced ? 0 : delay + 0.35 }}
        />
      </motion.g>
    </svg>
  );
}

// 6. People Icon (Outcome 5: Stronger remote work security)
export function PeopleIcon({
  isHovered,
  isInView,
  delay = 0,
}: BaseIconProps) {
  const prefersReduced = useSafeReducedMotion();
  const transition = {
    duration: prefersReduced ? 0 : 0.9,
    delay: prefersReduced ? 0 : delay,
    ease: "easeInOut" as const,
  };
  const pathInitial = { pathLength: prefersReduced ? 1 : 0 };
  const pathAnimate = isInView ? { pathLength: 1 } : pathInitial;

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
      {/* Left smaller person: shifts left on hover */}
      <motion.g
        animate={
          isHovered && !prefersReduced
            ? { x: -3, transition: { duration: 0.35, ease: "easeOut" } }
            : { x: 0 }
        }
      >
        <motion.circle
          cx="8"
          cy="8"
          r="2.8"
          initial={pathInitial}
          animate={pathAnimate}
          transition={transition}
        />
        <motion.path
          d="M3.5 19C3.5 15.8 5.5 13.5 8 13.5C10.5 13.5 12.5 15.8 12.5 19"
          initial={pathInitial}
          animate={pathAnimate}
          transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.1 }}
        />
      </motion.g>

      {/* Right larger person: shifts right on hover */}
      <motion.g
        animate={
          isHovered && !prefersReduced
            ? { x: 3, transition: { duration: 0.35, ease: "easeOut" } }
            : { x: 0 }
        }
      >
        <motion.circle
          cx="16.5"
          cy="7"
          r="3.2"
          initial={pathInitial}
          animate={pathAnimate}
          transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.15 }}
        />
        <motion.path
          d="M11.5 19C11.5 15.2 13.8 12.5 16.5 12.5C19.2 12.5 21.5 15.2 21.5 19"
          initial={pathInitial}
          animate={pathAnimate}
          transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.25 }}
        />
      </motion.g>
    </svg>
  );
}

// 7. Shield Half Icon (Outcome 6: Cleaner compliance readiness)
export function ShieldHalfIcon({
  isHovered,
  isInView,
  delay = 0,
}: BaseIconProps) {
  const prefersReduced = useSafeReducedMotion();
  const transition = {
    duration: prefersReduced ? 0 : 0.9,
    delay: prefersReduced ? 0 : delay,
    ease: "easeInOut" as const,
  };
  const pathInitial = { pathLength: prefersReduced ? 1 : 0 };
  const pathAnimate = isInView ? { pathLength: 1 } : pathInitial;

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
      {/* Outer shield */}
      <motion.path
        d="M12 2.5L4.5 5.5V11.5C4.5 16.8 7.7 21.2 12 22.5C16.3 21.2 19.5 16.8 19.5 11.5V5.5L12 2.5Z"
        initial={pathInitial}
        animate={pathAnimate}
        transition={transition}
      />
      {/* Center divider line */}
      <motion.line
        x1="12"
        y1="2.5"
        x2="12"
        y2="22.5"
        initial={pathInitial}
        animate={pathAnimate}
        transition={{ ...transition, delay: prefersReduced ? 0 : delay + 0.15 }}
      />
      {/* Right half fills smoothly on hover */}
      <motion.path
        d="M12 2.5L19.5 5.5V11.5C19.5 16.8 16.3 21.2 12 22.5V2.5Z"
        initial={{ fillOpacity: 0 }}
        animate={
          isHovered && !prefersReduced
            ? { fillOpacity: 0.85 }
            : { fillOpacity: 0.15 }
        }
        fill="#0a0a0a"
        stroke="none"
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
    </svg>
  );
}
