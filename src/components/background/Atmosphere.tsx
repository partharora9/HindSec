"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
}

export default function Atmosphere() {
  const shouldReduceMotion = useSafeReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  // Generate particles ONLY on client inside useEffect to completely eliminate hydration mismatch
  useEffect(() => {
    setMounted(true);
    const items: Particle[] = Array.from({ length: 15 }, (_, i) => {
      const h1 = ((i * 179 + 23) % 100) / 100;
      const h2 = ((i * 263 + 71) % 100) / 100;
      const h3 = ((i * 359 + 11) % 100) / 100;

      return {
        id: i,
        left: `${8 + h1 * 84}%`,
        top: `${14 + h2 * 45}%`,
        size: 1.8 + h3 * 1.2,
        duration: 16 + h1 * 10,
        delay: h2 * 6,
        driftX: (h3 - 0.5) * 30,
      };
    });
    setParticles(items);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-[2]">
      {/* 1. Subtle Film-Grain Noise Overlay (opacity 0.035 to avoid banding) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay pointer-events-none"
        aria-hidden="true"
      >
        <filter id="hero-film-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-film-grain)" />
      </svg>

      {/* 2. Tiny Floating Particles (mounted on client only, no SSR mismatch) */}
      {mounted && (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                left: p.left,
                top: p.top,
                opacity: 0,
                y: 0,
                x: 0,
              }}
              animate={
                shouldReduceMotion
                  ? { opacity: 0.25 }
                  : {
                      opacity: [0, 0.28, 0.28, 0],
                      y: [0, -35, -75],
                      x: [0, p.driftX * 0.5, p.driftX],
                    }
              }
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute rounded-full bg-white pointer-events-none"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
