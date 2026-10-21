"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface FeatureIconProps {
  type: "threat" | "identity" | "network" | "incident" | "data" | "analytics";
  isHovered: boolean;
  isInView: boolean;
  delay?: number;
}

export default function FeatureIcon({
  type,
  isHovered,
  isInView,
  delay = 0,
}: FeatureIconProps) {
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

  const pathAnimate = isInView
    ? { pathLength: 1, opacity: 1 }
    : pathInitial;

  const renderIconContent = () => {
    switch (type) {
      case "threat":
        // Bug with antennae, center bar, and legs
        return (
          <motion.g
            animate={
              isHovered && !prefersReduced
                ? {
                    rotate: [0, -9, 9, -7, 7, 0],
                    transition: { duration: 0.5, ease: "easeInOut" },
                  }
                : { rotate: 0 }
            }
            style={{ transformOrigin: "12px 12.5px" }}
          >
            {/* Bug body */}
            <motion.path
              d="M12 7C9.5 7 8 8.8 8 11.5V14.5C8 17.2 9.5 19 12 19C14.5 19 16 17.2 16 14.5V11.5C16 8.8 14.5 7 12 7Z"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Center horizontal bar */}
            <motion.path
              d="M4.5 13H19.5"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Antennae */}
            <motion.path
              d="M10 7L7 3.5M14 7L17 3.5"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Top legs */}
            <motion.path
              d="M8 10L4.5 8M16 10L19.5 8"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Bottom legs */}
            <motion.path
              d="M8 16L4.5 18M16 16L19.5 18"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
          </motion.g>
        );

      case "identity":
        // Two people (one small, one large)
        return (
          <g>
            {/* Left smaller person */}
            <motion.g
              animate={
                isHovered && !prefersReduced
                  ? { x: -2.5, transition: { duration: 0.3 } }
                  : { x: 0 }
              }
            >
              <motion.circle
                cx="8"
                cy="8"
                r="2.8"
                initial={pathInitial}
                animate={pathAnimate}
                transition={drawTransition}
              />
              <motion.path
                d="M3.5 19C3.5 15.8 5.5 13.5 8 13.5C10.5 13.5 12.5 15.8 12.5 19"
                initial={pathInitial}
                animate={pathAnimate}
                transition={drawTransition}
              />
            </motion.g>

            {/* Right larger person */}
            <motion.g
              animate={
                isHovered && !prefersReduced
                  ? { x: 2.5, transition: { duration: 0.3 } }
                  : { x: 0 }
              }
            >
              <motion.circle
                cx="16.5"
                cy="7"
                r="3.2"
                initial={pathInitial}
                animate={pathAnimate}
                transition={drawTransition}
              />
              <motion.path
                d="M11.5 19C11.5 15.2 13.8 12.5 16.5 12.5C19.2 12.5 21.5 15.2 21.5 19"
                initial={pathInitial}
                animate={pathAnimate}
                transition={drawTransition}
              />
            </motion.g>
          </g>
        );

      case "network":
        // Globe with small padlock on top right
        return (
          <motion.g
            animate={
              isHovered && !prefersReduced
                ? { rotate: 20, transition: { duration: 0.4, ease: "easeOut" } }
                : { rotate: 0 }
            }
            style={{ transformOrigin: "11px 13px" }}
          >
            {/* Globe outline */}
            <motion.circle
              cx="11"
              cy="13"
              r="7.5"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Equator */}
            <motion.path
              d="M3.5 13H18.5"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Meridian */}
            <motion.path
              d="M11 5.5C8.8 8 8.8 18 11 20.5M11 5.5C13.2 8 13.2 18 11 20.5"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Padlock on top-right */}
            <motion.g>
              <motion.path
                d="M17 6V4.2C17 3.3 17.7 2.5 18.7 2.5C19.7 2.5 20.5 3.3 20.5 4.2V6"
                initial={pathInitial}
                animate={pathAnimate}
                transition={drawTransition}
              />
              <motion.rect
                x="15.5"
                y="6"
                width="6.5"
                height="5.5"
                initial={pathInitial}
                animate={pathAnimate}
                transition={drawTransition}
              />
            </motion.g>
          </motion.g>
        );

      case "incident":
        // Shield with exclamation mark
        return (
          <motion.g
            animate={
              isHovered && !prefersReduced
                ? {
                    scale: [1, 1.14, 1],
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
              transition={drawTransition}
            />
            {/* Exclamation mark line */}
            <motion.path
              d="M12 8V13.5"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Exclamation mark dot */}
            <motion.circle
              cx="12"
              cy="16.5"
              r="0.8"
              fill="currentColor"
              initial={{ opacity: prefersReduced ? 1 : 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: prefersReduced ? 0 : delay + 0.4 }}
            />
          </motion.g>
        );

      case "data":
        // Brick firewall with small shield at bottom right
        return (
          <motion.g
            animate={
              isHovered && !prefersReduced
                ? {
                    x: [0, -2.5, 2.5, 0],
                    transition: { duration: 0.4, ease: "easeInOut" },
                  }
                : { x: 0 }
            }
          >
            {/* Wall outer border */}
            <motion.rect
              x="3.5"
              y="4.5"
              width="17"
              height="14"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Horizontal mortar line */}
            <motion.path
              d="M3.5 9.2H20.5M3.5 13.8H20.5"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Vertical mortar lines */}
            <motion.path
              d="M12 4.5V9.2M7.5 9.2V13.8M16.5 9.2V13.8M12 13.8V18.5"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Small shield overlaid at bottom right */}
            <motion.path
              d="M18 14L14.8 15.3V17.8C14.8 19.8 16.1 21.5 18 22C19.9 21.5 21.2 19.8 21.2 17.8V15.3L18 14Z"
              fill="#f0f1f3"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
          </motion.g>
        );

      case "analytics":
        // Pie chart with detached slice
        return (
          <g>
            {/* Main 3/4 pie */}
            <motion.path
              d="M11 4.5A8.5 8.5 0 1 0 19.5 13H11V4.5Z"
              initial={pathInitial}
              animate={pathAnimate}
              transition={drawTransition}
            />
            {/* Detached slice */}
            <motion.path
              d="M14 10V3A8.5 8.5 0 0 1 21 10H14Z"
              initial={pathInitial}
              animate={
                isHovered && !prefersReduced
                  ? {
                      pathLength: 1,
                      opacity: 1,
                      x: 3.5,
                      y: -3.5,
                      transition: { duration: 0.35, ease: "easeOut" },
                    }
                  : {
                      ...pathAnimate,
                      x: 0,
                      y: 0,
                      transition: drawTransition,
                    }
              }
            />
          </g>
        );

      default:
        return null;
    }
  };

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
      {renderIconContent()}
    </svg>
  );
}
