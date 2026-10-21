"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { contactInfo } from "@/data/contactInfo";
import SocialIcons from "./SocialIcons";
import CopyToast from "./CopyToast";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface InfoCardProps {
  isInView: boolean;
}

export default function InfoCard({ isInView }: InfoCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useSafeReducedMotion();

  // Toast state
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (text: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(text);
    setToastVisible(true);
    toastTimeoutRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 1800);
  };

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
    }
  };

  // 3D Cursor Tilt: max 3deg, perspective 1000px, spring
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateXRaw = useTransform(mouseY, [0, 1], [3, -3]);
  const rotateYRaw = useTransform(mouseX, [0, 1], [-3, 3]);

  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 25 });

  // Light highlight position
  const [lightPos, setLightPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    mouseX.set(xPct);
    mouseY.set(yPct);
    setLightPos({
      x: xPct * 100,
      y: yPct * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setLightPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <>
      <CopyToast isVisible={toastVisible} message={toastMessage} />

      {/* Info Card Container (406px wide, 437px tall on desktop, y=321 to 758) */}
      <div
        className="w-full lg:w-[406px] min-h-[437px] relative select-none"
        style={{ perspective: 1000 }}
      >
        {/* Clip-path wipe reveal from the right: inset(0 0 0 100%) to inset(0), 900ms, easeOut */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{
            clipPath: prefersReduced ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)",
            opacity: prefersReduced ? 1 : 0,
          }}
          animate={
            isInView
              ? {
                  clipPath: "inset(0% 0% 0% 0%)",
                  opacity: 1,
                }
              : {
                  clipPath: prefersReduced ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)",
                  opacity: prefersReduced ? 1 : 0,
                }
          }
          transition={{
            duration: prefersReduced ? 0.1 : 0.9,
            delay: prefersReduced ? 0 : 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            rotateX: prefersReduced ? 0 : rotateX,
            rotateY: prefersReduced ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="w-full h-full bg-[#ffffff] rounded-none p-[32px] relative overflow-hidden flex flex-col justify-between"
        >
          {/* Soft moving light highlight inside the card */}
          {!prefersReduced && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: lightPos.opacity,
                background: `radial-gradient(circle 240px at ${lightPos.x}% ${lightPos.y}%, rgba(43,80,174,0.06), transparent 70%)`,
              }}
            />
          )}

          {/* Staggered items with 98px pitch */}
          <div className="flex flex-col space-y-[42px] relative z-10">
            {/* 1. Email */}
            <motion.div
              initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 }
              }
              transition={{
                duration: prefersReduced ? 0.1 : 0.6,
                delay: prefersReduced ? 0 : 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col items-start"
            >
              <span className="text-[18px] font-normal text-[#4a4f5a] leading-none">
                Email:
              </span>
              <div className="mt-[20px] flex items-center gap-2 relative">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="relative inline-block text-[18px] font-normal text-[#0a0a0a] leading-none transition-transform duration-300 group-hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b50ae] rounded-sm"
                >
                  <span>{contactInfo.email}</span>
                  {/* 1px underline grows under it (300ms) */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#0a0a0a] transition-all duration-300 group-hover:w-full" />
                </a>

                {/* Copy button */}
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, contactInfo.email)}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 text-[#4a4f5a] hover:text-[#0a0a0a] focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b50ae] rounded"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* 2. Phone */}
            <motion.div
              initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 }
              }
              transition={{
                duration: prefersReduced ? 0.1 : 0.6,
                delay: prefersReduced ? 0 : 0.38,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col items-start"
            >
              <span className="text-[18px] font-normal text-[#4a4f5a] leading-none">
                Phone:
              </span>
              <div className="mt-[20px] flex items-center gap-2 relative">
                <a
                  href={`tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`}
                  className="relative inline-block text-[18px] font-normal text-[#0a0a0a] leading-none transition-transform duration-300 group-hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b50ae] rounded-sm"
                >
                  <span>{contactInfo.phone}</span>
                  {/* 1px underline grows under it (300ms) */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#0a0a0a] transition-all duration-300 group-hover:w-full" />
                </a>

                {/* Copy button */}
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, contactInfo.phone)}
                  title="Copy phone to clipboard"
                  aria-label="Copy phone number"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 text-[#4a4f5a] hover:text-[#0a0a0a] focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b50ae] rounded"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* 3. Office */}
            <motion.div
              initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 }
              }
              transition={{
                duration: prefersReduced ? 0.1 : 0.6,
                delay: prefersReduced ? 0 : 0.46,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col items-start"
            >
              <span className="text-[18px] font-normal text-[#4a4f5a] leading-none">
                Office:
              </span>
              <div className="mt-[20px]">
                <a
                  href={contactInfo.addressMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block text-[18px] font-normal text-[#0a0a0a] leading-snug transition-transform duration-300 group-hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b50ae] rounded-sm"
                >
                  {/* Keep double space before NY exactly as shown */}
                  <span>{contactInfo.address}</span>
                  {/* 1px underline grows under it (300ms) */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#0a0a0a] transition-all duration-300 group-hover:w-full" />
                </a>
              </div>
            </motion.div>

            {/* 4. Links */}
            <motion.div
              initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 }
              }
              transition={{
                duration: prefersReduced ? 0.1 : 0.6,
                delay: prefersReduced ? 0 : 0.54,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-start"
            >
              <span className="text-[18px] font-normal text-[#4a4f5a] leading-none">
                Links:
              </span>
              <div className="mt-[20px]">
                <SocialIcons socials={contactInfo.socials} isInView={isInView} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
