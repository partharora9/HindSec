"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { footerContent } from "@/content/siteContent";

interface LinkItem {
  title: string;
  href: string;
}

const column1Links: LinkItem[] = footerContent.columns.services;
const column2Links: LinkItem[] = footerContent.columns.compliance || [];
const column3Links: LinkItem[] = footerContent.columns.company;

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[40px] lg:gap-x-[48px] gap-y-8 w-full">
      {/* Column 1: Services */}
      <div className="flex flex-col">
        <div className="text-[12px] uppercase tracking-wider text-white/50 font-semibold mb-2">
          {footerContent.columns.servicesTitle}
        </div>
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

      {/* Column 2: Compliance Services */}
      <div className="flex flex-col">
        <div className="text-[12px] uppercase tracking-wider text-white/50 font-semibold mb-2">
          {footerContent.columns.complianceTitle || "Compliance"}
        </div>
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

      {/* Column 3: Company */}
      <div className="flex flex-col">
        <div className="text-[12px] uppercase tracking-wider text-white/50 font-semibold mb-2">
          {footerContent.columns.companyTitle}
        </div>
        {column3Links.map((item, index) => (
          <LinkRow
            key={item.title}
            item={item}
            index={index}
            columnIndex={2}
            hoveredTitle={hoveredTitle}
            setHoveredTitle={setHoveredTitle}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}
