"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface GradientMeshProps {
  parallaxX?: number;
  parallaxY?: number;
}

export default function GradientMesh({
  parallaxX = 0,
  parallaxY = 0,
}: GradientMeshProps) {
  const shouldReduceMotion = useSafeReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* Exact Base Vertical Gradient as specified:
          0% #02030a, 22% #091644, 45% #2b50ae, 65% #6f9be6, 82% #bcd0f4, 96% #eef1f6 */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            linear-gradient(
              180deg,
              #02030a 0%,
              #091644 22%,
              #2b50ae 45%,
              #6f9be6 65%,
              #bcd0f4 82%,
              #f0f1f3 100%
            )
          `,
        }}
      />

      {/* Subtle Drift Container (Parallax shifted up to +/-10px, subtle blob drift of +/-30px) */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translate3d(${parallaxX * 0.6}px, ${parallaxY * 0.6}px, 0)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {/* Top-Right Radial Glow: #5f8de8, fading out by 60% */}
        <motion.div
          animate={
            mounted && !shouldReduceMotion
              ? {
                  x: [-20, 20, -20],
                  y: [-15, 15, -15],
                  opacity: [0.75, 0.95, 0.75],
                }
              : { opacity: 0.85 }
          }
          transition={{
            duration: 14,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute -top-[15%] right-[-10%] w-[850px] h-[850px] rounded-full pointer-events-none will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 60% 35%, rgba(95, 141, 232, 0.75) 0%, rgba(95, 141, 232, 0.35) 30%, rgba(95, 141, 232, 0) 60%)",
          }}
        />

        {/* Mid-Right Soft Royal Blue Glow (Blends seamlessly into middle blue zone) */}
        <motion.div
          animate={
            mounted && !shouldReduceMotion
              ? {
                  x: [-25, 25, -25],
                  y: [15, -15, 15],
                }
              : {}
          }
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute top-[30%] right-[5%] w-[700px] h-[600px] rounded-full pointer-events-none will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(65, 115, 215, 0.45) 0%, rgba(43, 80, 174, 0.2) 40%, rgba(43, 80, 174, 0) 70%)",
          }}
        />

        {/* Lower Sky Blue / Pale Accent (Enhances bright lower section) */}
        <motion.div
          animate={
            mounted && !shouldReduceMotion
              ? {
                  x: [20, -20, 20],
                  y: [-10, 10, -10],
                }
              : {}
          }
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute bottom-[5%] right-[10%] w-[750px] h-[450px] rounded-full pointer-events-none will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(188, 208, 244, 0.45) 0%, rgba(238, 241, 246, 0.2) 45%, rgba(238, 241, 246, 0) 75%)",
          }}
        />
      </motion.div>
    </div>
  );
}
