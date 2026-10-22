"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { heroContent } from "@/content/siteContent";

const avatars = [
  { src: "/avatars/avatar-1.jpg", alt: "Lead Security Auditor" },
  { src: "/avatars/avatar-2.jpg", alt: "Offensive Security Specialist" },
  { src: "/avatars/avatar-3.jpg", alt: "Penetration Testing Engineer" },
  { src: "/avatars/avatar-4.jpg", alt: "Application Security Analyst" },
];

export default function TrustBadge() {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useSafeReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
        delayChildren: 0.15,
        staggerChildren: 0.08,
      },
    },
  };

  const avatarVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 380,
        damping: 24,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex items-center h-[46px] pl-[8px] pr-[18px] rounded-full bg-white/[0.07] backdrop-blur-md border border-white/[0.16] animate-badge-shimmer shadow-[0_4px_24px_rgba(0,0,0,0.2)] cursor-default select-none transition-transform duration-300 hover:scale-[1.015]"
    >
      {/* Overlapping Avatars */}
      <div className="flex items-center -space-x-2">
        {avatars.map((avatar, idx) => (
          <motion.div
            key={idx}
            variants={avatarVariants}
            animate={
              !shouldReduceMotion && isHovered
                ? { x: idx * 4, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }
                : { x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }
            }
            className="relative z-[1] hover:z-10 transition-shadow"
          >
            <div className="relative w-[30px] h-[30px] rounded-full overflow-hidden ring-[1.5px] ring-[#081335] shadow-sm">
              <Image
                src={avatar.src}
                alt={avatar.alt}
                width={30}
                height={30}
                unoptimized
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Badge Text */}
      <span className="ml-[13px] text-[17px] font-medium text-white/95 tracking-[-0.015em] whitespace-nowrap">
        {heroContent.trustBadge}
      </span>
    </motion.div>
  );
}
