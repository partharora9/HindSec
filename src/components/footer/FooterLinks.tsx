"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface LinkItem {
  title: string;
  href: string;
}

const column1Links: LinkItem[] = [
  { title: "Proactive Security", href: "/services/proactive-security" },
  { title: "Penetration Testing", href: "/services/penetration-testing" },
  { title: "Endpoint Security", href: "/services/endpoint-security" },
];

const column2Links: LinkItem[] = [
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "Careers", href: "/careers" },
  { title: "404 Page", href: "/404" },
  { title: "Thank you", href: "/thank-you" },
];

function LinkRow({
  item,
  index,
  columnIndex,
  hoveredTitle,
  setHoveredTitle,
  isInView,
}: {
  item: LinkItem;
  index: number;
  columnIndex: number;
  hoveredTitle: string | null;
  setHoveredTitle: (title: string | null) => void;
  isInView: boolean;
}) {
  const prefersReduced = useSafeReducedMotion();
  const isSelfHovered = hoveredTitle === item.title;
  const isDimmed = hoveredTitle !== null && !isSelfHovered;

  const itemDelay = prefersReduced
    ? 0
    : 0.2 + columnIndex * 0.1 + index * 0.06;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
      animate={
        isInView
          ? {
              opacity: isDimmed ? 0.6 : 1,
              y: 0,
            }
          : { opacity: 0, y: prefersReduced ? 0 : 16 }
      }
      transition={{
        opacity: { duration: 0.25 },
        y: {
          duration: prefersReduced ? 0 : 0.55,
          delay: itemDelay,
          ease: "easeOut",
        },
      }}
      className="h-[43px] flex items-center select-none"
    >
      <Link
        href={item.href}
        onMouseEnter={() => setHoveredTitle(item.title)}
        onMouseLeave={() => setHoveredTitle(null)}
        className="relative inline-flex flex-col group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1a5e]"
      >
        <motion.span
          animate={
            isSelfHovered && !prefersReduced ? { x: 4 } : { x: 0 }
          }
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-[17px] sm:text-[18px] font-normal text-white leading-normal tracking-tight"
        >
          {item.title}
        </motion.span>

        {/* 1px white underline growing from left to right on hover */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isSelfHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-[1px] bg-white origin-left w-full mt-[1px]"
        />
      </Link>
    </motion.div>
  );
}

export default function FooterLinks({ isInView }: { isInView: boolean }) {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[60px] lg:gap-x-[110px] w-full">
      {/* Column 1 (3 items) */}
      <div className="flex flex-col">
        {column1Links.map((item, index) => (
          <LinkRow
            key={item.title}
            item={item}
            index={index}
            columnIndex={0}
            hoveredTitle={hoveredTitle}
            setHoveredTitle={setHoveredTitle}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Column 2 (7 items) */}
      <div className="flex flex-col">
        {column2Links.map((item, index) => (
          <LinkRow
            key={item.title}
            item={item}
            index={index}
            columnIndex={1}
            hoveredTitle={hoveredTitle}
            setHoveredTitle={setHoveredTitle}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}
