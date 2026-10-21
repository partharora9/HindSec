"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface MegaMenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

export const servicesMenuItems: MegaMenuItem[] = [
  {
    title: "Proactive Security",
    description: "Stop threats before impact",
    href: "/services/proactive-security",
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Viewfinder corners */}
        <path d="M4 8V5a1 1 0 0 1 1-1h3" />
        <path d="M16 4h3a1 1 0 0 1 1 1v3" />
        <path d="M4 16v3a1 1 0 0 0 1 1h3" />
        <path d="M16 20h3a1 1 0 0 0 1-1v-3" />
        {/* Center search circle + handle */}
        <circle cx="11.5" cy="11.5" r="3" />
        <path d="m14 14 2.5 2.5" />
      </svg>
    ),
  },
  {
    title: "Penetration Testing",
    description: "Test defenses against real threats",
    href: "/services/penetration-testing",
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
        <path d="m9 11 1.5 1.5 3-3" />
      </svg>
    ),
  },
  {
    title: "Endpoint Security",
    description: "Keep systems and users protected",
    href: "/services/endpoint-security",
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="11" r="1.5" />
        <path d="M12 12.5v2.5" />
      </svg>
    ),
  },
];

export const whySecurioMenuItems: MegaMenuItem[] = [
  {
    title: "About",
    description: "Our mission, values, and experience",
    href: "/about",
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Careers",
    description: "Join a team focused on real impact",
    href: "/careers",
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="1" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <path d="M2 13h20" />
        <circle cx="12" cy="13" r="1" />
      </svg>
    ),
  },
];

interface MegaDropdownProps {
  type: "services" | "why";
  leftOffset: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

export default function MegaDropdown({
  type,
  leftOffset,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: MegaDropdownProps) {
  const [imgError, setImgError] = useState(false);
  const items = type === "services" ? servicesMenuItems : whySecurioMenuItems;
  const label = type === "services" ? "SERVICES" : "WHY SECURIO";

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1, left: leftOffset }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{
        left: { type: "spring", stiffness: 380, damping: 32 },
        opacity: { duration: 0.22, ease: "easeOut" },
        y: { duration: 0.22, ease: "easeOut" },
        scale: { duration: 0.22, ease: "easeOut" },
      }}
      style={{ transformOrigin: "top" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-[calc(100%+8px)] w-[625px] h-[272px] bg-white rounded-none shadow-[0_20px_50px_rgba(2,6,30,0.25)] p-[8px] z-50 flex pointer-events-auto select-none"
      role="menu"
      aria-label={`${label} menu`}
    >
      {/* LEFT COLUMN: Section Label & 3 Item Rows */}
      <div className="w-[352px] h-full flex flex-col justify-between overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="w-full h-full flex flex-col"
          >
            {/* Label: 12px, uppercase, letter-spacing 0.02em, color #4a4f5a, weight 400 */}
            <div className="text-[12px] uppercase tracking-[0.02em] text-[#4a4f5a] font-normal pl-[24px] pt-[14px] pb-[6px]">
              {label}
            </div>

            {/* Three Item Rows (70px tall, 16px left/right padding, hover bg #f0f1f3) */}
            <div className="flex-1 flex flex-col justify-between">
              {items.map((item, idx) => (
                <motion.a
                  key={item.title}
                  href={item.href || `#${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={onClose}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.04 }}
                  className="h-[68px] w-full flex items-center px-[16px] cursor-pointer rounded-none transition-colors duration-150 hover:bg-[#f0f1f3] group focus:outline-none focus-visible:bg-[#f0f1f3] focus-visible:ring-1 focus-visible:ring-black"
                  role="menuitem"
                >
                  {/* 30x30px black (#0a0a0a) square icon tile with sharp corners */}
                  <div className="w-[30px] h-[30px] bg-[#0a0a0a] rounded-none flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>

                  {/* 22px gap, then text stack */}
                  <div className="ml-[22px] flex flex-col">
                    <span className="text-[17px] font-normal text-[#0a0a0a] leading-[1.2]">
                      {item.title}
                    </span>
                    <span className="text-[13px] font-normal text-[#4a4f5a] mt-[4px] leading-tight">
                      {item.description}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT COLUMN: Image Card (w-[257px], sharp corners, flush with 8px panel padding) */}
      <motion.a
        href="#contact"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.08 }}
        className="w-[257px] h-full relative rounded-none overflow-hidden block group cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        role="menuitem"
        aria-label="Talk to a Security Expert"
      >
        {/* Background Image / Gradient Fallback */}
        <div className="w-full h-full bg-gradient-to-br from-[#1c2c4a] via-[#121c2e] to-[#0a101b] absolute inset-0">
          <Image
            src="/images/security-expert.jpg"
            alt="Security Experts collaborating"
            fill
            unoptimized
            sizes="257px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            priority
          />
        </div>

        {/* Dark Gradient Overlay for optimal legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Top-Right Corner White Square Tile (48x48px) with diagonal arrow */}
        <div className="w-[48px] h-[48px] bg-white rounded-none flex items-center justify-center absolute top-0 right-0 z-10 shadow-sm pointer-events-none">
          <svg
            className="w-[18px] h-[18px] text-[#0a0a0a] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] transition-transform duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>

        {/* Text at bottom-left: 16px padding */}
        <div className="absolute bottom-0 left-0 right-0 p-[16px] z-10 flex flex-col justify-end">
          <h3 className="text-[24px] font-normal text-white leading-[1.2] tracking-[-0.01em]">
            Talk to a<br />
            Security Expert
          </h3>
          <span className="text-[13px] font-medium text-white/95 mt-[5px]">
            Plan your next steps
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
}
