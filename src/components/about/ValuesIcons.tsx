"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface IconProps {
  isHovered: boolean;
  isInView: boolean;
  delay?: number;
}

// 1. Concentric circles with a small circle inside at bottom center
export function ConcentricEyeIcon({
  isHovered,
  isInView,
  delay = 0,
}: IconProps) {
  const prefersReduced = useSafeReducedMotion();

  const drawTransition = {
    duration: prefersReduced ? 0 : 0.9,
    delay: prefersReduced ? 0 : delay,
    ease: "easeInOut" as const,
  };

  const pathInitial = { pathLength: prefersReduced ? 1 : 0 };
  const pathAnimate = isInView ? { pathLength: 1 } : pathInitial;

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
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
                transition: { duration: 0.5, ease: "easeInOut" },
              }
            : { scale: 1 }
        }
        style={{ transformOrigin: "20px 22px" }}
      >
        {/* Outer circle */}
        <motion.circle
          cx="20"
          cy="20"
          r="14"
          initial={pathInitial}
          animate={pathAnimate}
          transition={drawTransition}
        />

        {/* Middle circle tangent toward bottom */}
        <motion.circle
          cx="20"
          cy="23.5"
          r="9.5"
          initial={pathInitial}
          animate={pathAnimate}
          transition={{
            ...drawTransition,
            delay: prefersReduced ? 0 : delay + 0.12,
          }}
        />

        {/* Inner small circle at bottom center */}
        <motion.circle
          cx="20"
          cy="27"
          r="4.5"
          initial={pathInitial}
          animate={pathAnimate}
          transition={{
            ...drawTransition,
            delay: prefersReduced ? 0 : delay + 0.24,
          }}
        />
      </motion.g>
    </svg>
  );
}

// 2. Three ascending bar-chart columns (small, medium, tall, outlined)
export function BarsIcon({ isHovered, isInView, delay = 0 }: IconProps) {
  const prefersReduced = useSafeReducedMotion();

  const drawTransition = {
    duration: prefersReduced ? 0 : 0.9,
    delay: prefersReduced ? 0 : delay,
    ease: "easeInOut" as const,
  };

  const pathInitial = { pathLength: prefersReduced ? 1 : 0 };
  const pathAnimate = isInView ? { pathLength: 1 } : pathInitial;

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="#0a0a0a"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="overflow-visible"
    >
      {/* Bar 1 (Short left) */}
      <motion.rect
        x="7"
        y="23"
        width="7"
        height="12"
        initial={pathInitial}
        animate={
          isHovered && !prefersReduced
            ? {
                scaleY: [1, 1.25, 1],
                transition: { duration: 0.4, delay: 0 },
              }
            : pathAnimate
        }
        transition={drawTransition}
        style={{ transformOrigin: "bottom" }}
      />

      {/* Bar 2 (Medium center) */}
      <motion.rect
        x="17"
        y="15"
        width="7"
        height="20"
        initial={pathInitial}
        animate={
          isHovered && !prefersReduced
            ? {
                scaleY: [1, 1.22, 1],
                transition: { duration: 0.4, delay: 0.1 },
              }
            : pathAnimate
        }
        transition={{
          ...drawTransition,
          delay: prefersReduced ? 0 : delay + 0.12,
        }}
        style={{ transformOrigin: "bottom" }}
      />

      {/* Bar 3 (Tall right) */}
      <motion.rect
        x="27"
        y="7"
        width="7"
        height="28"
        initial={pathInitial}
        animate={
          isHovered && !prefersReduced
            ? {
                scaleY: [1, 1.18, 1],
                transition: { duration: 0.4, delay: 0.2 },
              }
            : pathAnimate
        }
        transition={{
          ...drawTransition,
          delay: prefersReduced ? 0 : delay + 0.24,
        }}
        style={{ transformOrigin: "bottom" }}
      />
    </svg>
  );
}

// 3. Circle with inner circle and a center dot
export function TargetDotIcon({ isHovered, isInView, delay = 0 }: IconProps) {
  const prefersReduced = useSafeReducedMotion();

  const drawTransition = {
    duration: prefersReduced ? 0 : 0.9,
    delay: prefersReduced ? 0 : delay,
    ease: "easeInOut" as const,
  };

  const pathInitial = { pathLength: prefersReduced ? 1 : 0 };
  const pathAnimate = isInView ? { pathLength: 1 } : pathInitial;

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="#0a0a0a"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="overflow-visible"
    >
      {/* Outer circle */}
      <motion.circle
        cx="20"
        cy="20"
        r="14"
        initial={pathInitial}
        animate={pathAnimate}
        transition={drawTransition}
      />

      {/* Inner circle */}
      <motion.circle
        cx="20"
        cy="20"
        r="7.5"
        initial={pathInitial}
        animate={pathAnimate}
        transition={{
          ...drawTransition,
          delay: prefersReduced ? 0 : delay + 0.12,
        }}
      />

      {/* Center dot */}
      <motion.circle
        cx="20"
        cy="20"
        r="1.8"
        fill="#0a0a0a"
        stroke="none"
        initial={{ opacity: 0 }}
        animate={
          isHovered && !prefersReduced
            ? {
                scale: [1, 2.2, 1],
                opacity: 1,
                transition: { duration: 0.4, ease: "easeOut" },
              }
            : isInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0 }
        }
        transition={{ delay: prefersReduced ? 0 : delay + 0.3 }}
        style={{ transformOrigin: "20px 20px" }}
      />
    </svg>
  );
}

// 4. Two overlapping circles (Venn diagram style)
export function OverlapCirclesIcon({
  isHovered,
  isInView,
  delay = 0,
}: IconProps) {
  const prefersReduced = useSafeReducedMotion();

  const drawTransition = {
    duration: prefersReduced ? 0 : 0.9,
    delay: prefersReduced ? 0 : delay,
    ease: "easeInOut" as const,
  };

  const pathInitial = { pathLength: prefersReduced ? 1 : 0 };
  const pathAnimate = isInView ? { pathLength: 1 } : pathInitial;

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="#0a0a0a"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="overflow-visible"
    >
      {/* Circle 1 (top-left) */}
      <motion.circle
        cx="16.5"
        cy="16.5"
        r="9"
        initial={pathInitial}
        animate={
          isHovered && !prefersReduced
            ? {
                x: [0, 3, -2, 0],
                y: [0, 3, -2, 0],
                transition: { duration: 0.6, ease: "easeInOut" },
              }
            : { x: 0, y: 0, ...pathAnimate }
        }
        transition={drawTransition}
      />

      {/* Circle 2 (bottom-right) */}
      <motion.circle
        cx="23.5"
        cy="23.5"
        r="9"
        initial={pathInitial}
        animate={
          isHovered && !prefersReduced
            ? {
                x: [0, -3, 2, 0],
                y: [0, -3, 2, 0],
                transition: { duration: 0.6, ease: "easeInOut" },
              }
            : {
                x: 0,
                y: 0,
                ...pathAnimate,
                transition: {
                  ...drawTransition,
                  delay: prefersReduced ? 0 : delay + 0.15,
                },
              }
        }
      />
    </svg>
  );
}
