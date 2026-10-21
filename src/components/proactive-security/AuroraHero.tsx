"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface StreakConfig {
  id: number;
  x: number; // reference px out of 1900
  width: number;
  height: number;
  color: string;
  blur: number;
  baseOpacity: number;
  duration: number;
  delay: number;
  swayX: number;
}

// 28 deterministic streaks across 1900px canvas
// Left (x < 450): dark black, almost no light
// Mid-left (x=500 to 900): soft steel/cyan-blue (#2a5f9a to #1d4f8f)
// Mid-right (x=900 to 1300): darker deep blue (#0a1fa8, #0b24b8) with black gaps
// Right (x=1300 to 1900): saturated royal blue (#1230d0 to #2347e0), brightest, widest and tallest
const STREAKS: StreakConfig[] = [
  // Faint transition at x=480
  { id: 1, x: 480, width: 32, height: 320, color: "#1a4270", blur: 18, baseOpacity: 0.35, duration: 9.5, delay: 0.2, swayX: 14 },

  // Steel/cyan blue section (x=500 to 900)
  { id: 2, x: 525, width: 50, height: 370, color: "#1d4f8f", blur: 20, baseOpacity: 0.62, duration: 8.2, delay: 0.5, swayX: 18 },
  { id: 3, x: 575, width: 38, height: 410, color: "#245c9c", blur: 18, baseOpacity: 0.68, duration: 11.0, delay: 1.2, swayX: -16 },
  { id: 4, x: 625, width: 65, height: 390, color: "#2a5f9a", blur: 22, baseOpacity: 0.72, duration: 9.8, delay: 0.8, swayX: 20 },
  { id: 5, x: 685, width: 44, height: 350, color: "#1d4982", blur: 18, baseOpacity: 0.55, duration: 12.5, delay: 2.1, swayX: -15 },
  { id: 6, x: 735, width: 75, height: 430, color: "#265b98", blur: 24, baseOpacity: 0.74, duration: 10.2, delay: 1.5, swayX: 22 },
  { id: 7, x: 805, width: 48, height: 380, color: "#1b4478", blur: 18, baseOpacity: 0.58, duration: 8.8, delay: 0.3, swayX: -18 },
  { id: 8, x: 855, width: 62, height: 420, color: "#225492", blur: 22, baseOpacity: 0.66, duration: 13.0, delay: 2.8, swayX: 19 },

  // Dark deep blue section (x=900 to 1300) with black gaps
  { id: 9, x: 925, width: 36, height: 400, color: "#0c2094", blur: 18, baseOpacity: 0.58, duration: 9.0, delay: 0.6, swayX: -16 },
  { id: 10, x: 980, width: 65, height: 440, color: "#0a1fa8", blur: 22, baseOpacity: 0.70, duration: 11.5, delay: 1.9, swayX: 21 },
  { id: 11, x: 1045, width: 32, height: 360, color: "#081678", blur: 16, baseOpacity: 0.48, duration: 8.5, delay: 0.4, swayX: -14 },
  { id: 12, x: 1095, width: 70, height: 450, color: "#0b24b8", blur: 24, baseOpacity: 0.72, duration: 10.8, delay: 2.4, swayX: 23 },
  { id: 13, x: 1165, width: 40, height: 390, color: "#091b8a", blur: 18, baseOpacity: 0.52, duration: 12.0, delay: 1.1, swayX: -17 },
  { id: 14, x: 1220, width: 60, height: 440, color: "#0c24b2", blur: 22, baseOpacity: 0.68, duration: 9.2, delay: 0.9, swayX: 20 },
  { id: 15, x: 1280, width: 45, height: 420, color: "#0d28ba", blur: 18, baseOpacity: 0.62, duration: 10.4, delay: 1.7, swayX: -15 },

  // Bright saturated royal blue section (x=1300 to 1900) - widest and tallest
  { id: 16, x: 1335, width: 85, height: 480, color: "#1230d0", blur: 24, baseOpacity: 0.78, duration: 10.0, delay: 1.3, swayX: 22 },
  { id: 17, x: 1400, width: 100, height: 500, color: "#1638dd", blur: 26, baseOpacity: 0.84, duration: 8.4, delay: 0.7, swayX: -24 },
  { id: 18, x: 1475, width: 75, height: 460, color: "#1b40e6", blur: 22, baseOpacity: 0.80, duration: 12.2, delay: 2.0, swayX: 19 },
  { id: 19, x: 1530, width: 120, height: 520, color: "#2347e0", blur: 28, baseOpacity: 0.88, duration: 9.6, delay: 0.4, swayX: -24 },
  { id: 20, x: 1610, width: 95, height: 490, color: "#183cee", blur: 24, baseOpacity: 0.85, duration: 11.2, delay: 1.8, swayX: 23 },
  { id: 21, x: 1680, width: 130, height: 530, color: "#2144f2", blur: 30, baseOpacity: 0.90, duration: 8.9, delay: 0.5, swayX: -22 },
  { id: 22, x: 1765, width: 110, height: 510, color: "#2347e0", blur: 26, baseOpacity: 0.88, duration: 10.5, delay: 2.2, swayX: 24 },
  { id: 23, x: 1830, width: 95, height: 480, color: "#1c3ee2", blur: 24, baseOpacity: 0.82, duration: 9.3, delay: 1.0, swayX: -18 },
  { id: 24, x: 1885, width: 80, height: 460, color: "#1534d4", blur: 22, baseOpacity: 0.75, duration: 13.5, delay: 2.6, swayX: 16 },
];

export default function AuroraHero() {
  const prefersReduced = useSafeReducedMotion();
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Mouse parallax and proximity brightening
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const btnRef = useRef<HTMLAnchorElement | null>(null);

  // Periodic traveling wave from right to left every 9s
  const [waveX, setWaveX] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    let startTime = performance.now();
    let animationFrameId: number;

    const loop = (currentTime: number) => {
      const elapsed = (currentTime - startTime) % 9000;
      // Wave travels from 1900 to -200 over 3.5s of the 9s cycle
      if (elapsed < 3500) {
        const progress = elapsed / 3500;
        const currentWave = 1950 - progress * 2200;
        setWaveX(currentWave);
      } else {
        setWaveX(null);
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [prefersReduced]);

  // Mouse move handler for hero
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 1900;
    const relY = e.clientY - rect.top;
    setMousePos({ x: relX, y: relY });

    // Parallax shift up to 14px
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setParallaxOffset({
      x: normX * 14,
      y: normY * 10,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setParallaxOffset({ x: 0, y: 0 });
  };

  // Magnetic hover for button (up to 8px)
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReduced || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.25;
    const deltaY = (e.clientY - centerY) * 0.25;
    const clampedX = Math.max(-8, Math.min(8, deltaX));
    const clampedY = Math.max(-8, Math.min(8, deltaY));
    setBtnOffset({ x: clampedX, y: clampedY });
  };

  const handleBtnMouseLeave = () => {
    setIsBtnHovered(false);
    setBtnOffset({ x: 0, y: 0 });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[605px] bg-[#000000] overflow-hidden select-none"
      style={{
        borderBottom: "1px solid #000000",
      }}
    >
      {/* ================= AURORA LIGHT BEAMS LAYER ================= */}
      <motion.div
        animate={
          prefersReduced
            ? {}
            : {
                x: parallaxOffset.x,
                y: parallaxOffset.y,
              }
        }
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        style={{
          // Fade to pure black at bottom: black 0%, black 55%, transparent 92%
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 92%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 92%)",
        }}
      >
        {/* Container scaled to reference width 1900px */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1900px] h-full pointer-events-none">
          {STREAKS.map((streak) => {
            // Check proximity to cursor (< 250px)
            let proximityBoost = 0;
            if (mousePos) {
              const dist = Math.abs(streak.x - mousePos.x);
              if (dist < 250) {
                proximityBoost = (1 - dist / 250) * 0.45;
              }
            }

            // Check wave pass proximity (< 220px)
            let waveBoost = 0;
            if (waveX !== null) {
              const distToWave = Math.abs(streak.x - waveX);
              if (distToWave < 220) {
                waveBoost = (1 - distToWave / 220) * 0.55;
              }
            }

            const targetOpacity = Math.min(
              1,
              streak.baseOpacity + proximityBoost + waveBoost
            );

            return (
              <motion.div
                key={streak.id}
                initial={{ opacity: 0 }}
                animate={
                  prefersReduced
                    ? { opacity: streak.baseOpacity }
                    : {
                        opacity: [
                          targetOpacity * 0.7,
                          targetOpacity,
                          targetOpacity * 0.75,
                        ],
                        x: [0, streak.swayX, 0],
                        scaleY: [1, 1.08, 0.94, 1],
                      }
                }
                transition={
                  prefersReduced
                    ? { duration: 0.8, delay: (streak.x / 1900) * 0.5 }
                    : {
                        opacity: {
                          duration: streak.duration * 0.7,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                        },
                        x: {
                          duration: streak.duration,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                        },
                        scaleY: {
                          duration: streak.duration * 1.2,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                        },
                      }
                }
                style={{
                  position: "absolute",
                  left: `${streak.x}px`,
                  top: 0,
                  width: `${streak.width}px`,
                  height: `${streak.height}px`,
                  background: `linear-gradient(to bottom, ${streak.color} 0%, ${streak.color}b3 40%, transparent 100%)`,
                  filter: `blur(${streak.blur}px)`,
                  mixBlendMode: "screen",
                  transformOrigin: "top center",
                }}
              />
            );
          })}
        </div>

        {/* Fine vertical-line noise texture overlay (repeating-linear-gradient 1px lines at 3% opacity) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)",
            opacity: 0.6,
            mixBlendMode: "overlay",
          }}
        />
      </motion.div>

      {/* Top soft cyan ambient glow highlight at top-right (x ~ 1400-1800) */}
      <div
        className="absolute top-0 right-0 w-[850px] h-[340px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 75% 0%, rgba(35, 71, 224, 0.35) 0%, rgba(18, 48, 208, 0.15) 50%, transparent 100%)",
          filter: "blur(40px)",
          mixBlendMode: "screen",
        }}
      />

      {/* ================= HERO CONTENT LAYER (Centered 1280px Container, left-aligned at x=310) ================= */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-0 h-full flex flex-col justify-start pt-[256px]">
        {/* H1 "Proactive Security": 64px, weight 400, letter-spacing -1.9px, white */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%", opacity: 0, filter: "blur(12px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: prefersReduced ? 0.3 : 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[40px] sm:text-[52px] lg:text-[64px] font-normal text-white tracking-[-1.9px] leading-[1.08]"
          >
            Proactive Security
          </motion.h1>
        </div>

        {/* Paragraph: 18px, weight 500, line-height 27px, white, max-w 630px, wraps after "threats" */}
        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: prefersReduced ? 0.3 : 0.7,
            delay: prefersReduced ? 0 : 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-[22px] text-[17px] sm:text-[18px] font-medium leading-[27px] text-white max-w-[630px]"
        >
          Detect risks earlier, reduce exposure, and strengthen security before threats{" "}
          <br className="hidden sm:inline" />
          become incidents.
        </motion.p>

        {/* White pill button "Book a Demo" at y=450-505 (156x55px, text #0a0a0a, 15px, weight 500) */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: prefersReduced ? 0.3 : 0.6,
            delay: prefersReduced ? 0 : 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-[29px]"
        >
          <motion.a
            ref={btnRef}
            href="/contact"
            onMouseMove={handleBtnMouseMove}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={handleBtnMouseLeave}
            animate={
              prefersReduced
                ? {}
                : {
                    x: btnOffset.x,
                    y: btnOffset.y,
                    scale: isBtnHovered ? 1.04 : 1,
                  }
            }
            whileTap={{ scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 20,
            }}
            className="inline-flex items-center justify-center w-[156px] h-[55px] rounded-full bg-white text-[#0a0a0a] text-[15px] font-medium shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_28px_rgba(255,255,255,0.45)] transition-shadow duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Book a Demo
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
