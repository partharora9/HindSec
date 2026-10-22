"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { footerContent } from "@/content/siteContent";

interface MagneticButtonProps {
  delay?: number;
  isInView: boolean;
}

export default function MagneticButton({
  delay = 0.32,
  isInView,
}: MagneticButtonProps) {
  const prefersReduced = useSafeReducedMotion();
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 16 });
  const springY = useSpring(y, { stiffness: 220, damping: 16 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReduced || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const pullX = ((e.clientX - centerX) / (rect.width / 2)) * 8;
    const pullY = ((e.clientY - centerY) / (rect.height / 2)) * 8;

    x.set(Math.max(-8, Math.min(8, pullX)));
    y.set(Math.max(-8, Math.min(8, pullY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.9 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: prefersReduced ? 1 : 0.9 }
      }
      transition={{
        duration: prefersReduced ? 0 : 0.6,
        delay: prefersReduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        ref={buttonRef}
        href="/contact"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1a5e] rounded-full"
      >
        <motion.div
          style={{
            x: prefersReduced ? 0 : springX,
            y: prefersReduced ? 0 : springY,
          }}
          whileHover={{
            scale: prefersReduced ? 1 : 1.04,
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.45)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="relative group overflow-hidden w-[156px] h-[55px] rounded-full bg-white flex items-center justify-center cursor-pointer select-none"
        >
          {/* Dark fill sweeps in from left so text turns white (400ms) */}
          <div className="absolute inset-0 bg-[#0a0a0a] rounded-full -translate-x-[102%] group-hover:translate-x-0 transition-transform duration-400 ease-out" />

          {/* Button Text */}
          <span className="relative z-10 text-[#0a0a0a] group-hover:text-white transition-colors duration-400 text-[15px] font-medium tracking-tight">
            {footerContent.ctaButton}
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
