"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface FooterBackgroundProps {
  parallaxY?: any;
  darkScale?: any;
}

export default function FooterBackground({
  parallaxY,
  darkScale,
}: FooterBackgroundProps) {
  const prefersReduced = useSafeReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Cursor spotlight state with smooth lerping (0.08)
  const [spotlightPos, setSpotlightPos] = useState({ x: -9999, y: -9999 });
  const [isHovered, setIsHovered] = useState(false);
  const targetPos = useRef({ x: -9999, y: -9999 });
  const currentPos = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (prefersReduced) return;

    let rafId: number;

    const loop = () => {
      if (isHovered && targetPos.current.x > -9000) {
        currentPos.current.x +=
          (targetPos.current.x - currentPos.current.x) * 0.08;
        currentPos.current.y +=
          (targetPos.current.y - currentPos.current.y) * 0.08;
        setSpotlightPos({
          x: Math.round(currentPos.current.x),
          y: Math.round(currentPos.current.y),
        });
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [isHovered, prefersReduced]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPos.current = { x, y };
    if (!isHovered) {
      currentPos.current = { x, y };
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetPos.current = { x: -9999, y: -9999 };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto select-none z-0"
    >
      {/* ================= LAYER 1: Base Diagonal Gradient (100deg) ================= */}
      <motion.div
        style={{ y: prefersReduced ? 0 : parallaxY }}
        className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
      >
        <div
          className="w-full h-full"
          style={{
            background: `
              linear-gradient(
                100deg,
                #c2e6ff 0%,
                #a8d4ff 16%,
                #78b4ff 30%,
                #5087e8 42%,
                #3f66cc 50%,
                #20409c 58%,
                #0b1a5e 68%,
                #050c33 78%,
                #02020f 88%,
                #02020f 100%
              )
            `,
          }}
        />
      </motion.div>

      {/* ================= LAYER 2: Bottom-Left Deep Blue Depth Overlay ================= */}
      <motion.div
        animate={
          !prefersReduced
            ? {
                opacity: [0.85, 1, 0.85],
                scale: [1, 1.03, 1],
              }
            : {}
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
        className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[90%] pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 35% 85%, rgba(58, 98, 198, 0.65) 0%, rgba(42, 75, 168, 0.45) 45%, rgba(30, 70, 180, 0) 75%)",
          transformOrigin: "bottom left",
        }}
      />

      {/* Second vertical deepening gradient on the bottom-left as requested */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(30, 70, 180, 0.35) 0%, rgba(30, 70, 180, 0) 55%)",
          maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, transparent 70%)",
        }}
      />

      {/* ================= LAYER 3: Dark Bulging Right Mass ================= */}
      {/* Bulges toward lower middle (at bottom navy starts around x~1000, at top around x~1300) */}
      <motion.div
        style={{
          scaleX: prefersReduced ? 1 : darkScale || 1,
          transformOrigin: "right center",
        }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <motion.div
          animate={
            !prefersReduced
              ? {
                  x: [-15, 15, -15],
                  scale: [0.98, 1.03, 0.98],
                }
              : {}
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
          className="absolute -top-[10%] right-[-15%] w-[75%] h-[125%] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 85% at 85% 65%, #02020f 0%, #030416 38%, #0b1a5e 65%, rgba(11, 26, 94, 0) 85%)",
          }}
        />
      </motion.div>

      {/* ================= LAYER 4: Very Slow Diagonal Light Sweep (every 10s) ================= */}
      <motion.div
        initial={{ x: "-120%" }}
        animate={prefersReduced ? { x: "-120%" } : { x: "250%" }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 2,
        }}
        className={`absolute inset-0 w-[40%] h-full pointer-events-none transform -skew-x-[25deg] ${
          prefersReduced ? "hidden" : "block"
        }`}
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)",
        }}
      />

      {/* ================= LAYER 5: Soft Cursor-following Spotlight (380px, 12% white, soft-light) ================= */}
      {!prefersReduced && isHovered && spotlightPos.x > -9000 && (
        <div
          className="absolute w-[380px] h-[380px] rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            left: `${spotlightPos.x - 190}px`,
            top: `${spotlightPos.y - 190}px`,
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)",
            mixBlendMode: "soft-light",
          }}
        />
      )}

      {/* ================= LAYER 6: Film-Grain Noise Overlay (opacity 0.04) to prevent banding ================= */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
