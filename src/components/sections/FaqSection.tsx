"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { faqContent } from "@/content/siteContent";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = faqContent.items;

function FaqRow({
  item,
  index,
  isOpen,
  onToggle,
  sectionInView,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  sectionInView: boolean;
}) {
  const [isRowHovered, setIsRowHovered] = useState(false);
  const prefersReduced = useSafeReducedMotion();

  const rowDelay = prefersReduced ? 0 : 0.12 + index * 0.07;
  const dividerDelay = prefersReduced ? 0 : 0.2 + index * 0.07;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
      animate={
        sectionInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: prefersReduced ? 0 : 16 }
      }
      transition={{
        duration: prefersReduced ? 0 : 0.5,
        delay: rowDelay,
        ease: "easeOut",
      }}
      className="w-full flex flex-col relative"
      onMouseEnter={() => setIsRowHovered(true)}
      onMouseLeave={() => setIsRowHovered(false)}
    >
      {/* Clickable Row Button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-btn-${item.id}`}
        className="w-full text-left py-5 sm:py-[30px] flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b50ae] focus-visible:ring-offset-2 transition-colors cursor-pointer select-none min-h-[44px]"
      >
        {/* Question Text: shifts 6px right on hover when closed */}
        <motion.span
          animate={
            isRowHovered && !isOpen && !prefersReduced ? { x: 6 } : { x: 0 }
          }
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-[16px] sm:text-[18px] lg:text-[19px] font-normal text-[#0a0a0a] leading-[1.35] pr-4 max-w-[530px]"
        >
          {item.question}
        </motion.span>

        {/* Plus Icon (rotates 45deg to x, turns blue on hover when closed) */}
        <motion.div
          animate={{
            rotate: isOpen && !prefersReduced ? 45 : 0,
            color:
              isRowHovered && !isOpen
                ? "#2b50ae"
                : "#0a0a0a",
          }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 24,
          }}
          className="w-[20px] h-[20px] flex-shrink-0 flex items-center justify-center"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </button>

      {/* Accordion Answer Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${item.id}`}
            role="region"
            aria-labelledby={`faq-btn-${item.id}`}
            initial={{
              height: prefersReduced ? "auto" : 0,
              opacity: prefersReduced ? 1 : 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: prefersReduced ? "auto" : 0,
              opacity: prefersReduced ? 1 : 0,
            }}
            transition={{
              duration: prefersReduced ? 0 : 0.35,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: prefersReduced ? 0 : 6, opacity: prefersReduced ? 1 : 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: prefersReduced ? 0 : 6, opacity: prefersReduced ? 1 : 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.25 }}
              className="pb-5 sm:pb-[28px] max-w-[520px]"
            >
              <p className="text-[15px] sm:text-[17px] leading-[1.55] text-[#4a4f5a] font-normal">
                {item.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1px bottom divider (#cfd1d5), draws left to right on scroll reveal */}
      <motion.div
        initial={{ scaleX: prefersReduced ? 1 : 0 }}
        animate={sectionInView ? { scaleX: 1 } : { scaleX: prefersReduced ? 1 : 0 }}
        transition={{
          duration: prefersReduced ? 0 : 0.6,
          delay: dividerDelay,
          ease: "easeOut",
        }}
        className="w-full h-[1px] bg-[#cfd1d5] origin-left"
      />
    </motion.div>
  );
}

function AskCard() {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useSafeReducedMotion();

  return (
    <a
      href="/contact"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block w-full lg:w-[608px] min-h-[160px] sm:h-[185px] lg:h-[205px] bg-[#ffffff] rounded-none p-5 sm:p-[24px] relative transition-transform duration-300 ease-out hover:-translate-y-1 select-none cursor-pointer"
      style={{ boxShadow: "none" }}
    >
      {/* Top right diagonal arrow */}
      <motion.div
        animate={
          isHovered && !prefersReduced
            ? { x: 4, y: -4 }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute top-5 right-5 sm:top-[24px] sm:right-[24px] w-[24px] h-[24px] flex items-center justify-center text-[#0a0a0a]"
      >
        <svg
          width="24"
          height="24"
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
      </motion.div>

      {/* Bottom-left content */}
      <div className="absolute bottom-5 left-5 right-5 sm:bottom-[24px] sm:left-[24px] sm:right-[24px] flex flex-col items-start">
        {/* Title */}
        <h4 className="text-[18px] sm:text-[22px] lg:text-[24px] font-normal text-[#0a0a0a] leading-[1.25]">
          {faqContent.askCard.title}
        </h4>

        {/* Talk to our team with underline animation on hover */}
        <div className="mt-2 sm:mt-[12px] relative inline-block">
          <span className="text-[15px] sm:text-[17px] lg:text-[18px] text-[#4a4f5a] font-normal leading-normal">
            {faqContent.askCard.sub}
          </span>
          {/* Thin black underline animating under "Talk to our team" */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-[1px] bg-[#0a0a0a] origin-left w-full mt-[2px]"
          />
        </div>
      </div>
    </a>
  );
}

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();

  // State: single open item, or null (all closed)
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f0f1f3] pt-0 pb-[60px] sm:pb-[100px] lg:pb-[150px] select-none text-[#0a0a0a]"
      id="faq"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0">
        {/* Two Columns: 608px each with responsive gap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-[64px] items-stretch">
          {/* ================= LEFT COLUMN ================= */}
          <div className="w-full lg:w-[608px] flex flex-col justify-between">
            {/* Top: Section label & Heading */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 16 }}
                transition={{ duration: prefersReduced ? 0 : 0.6, ease: "easeOut" }}
                className="text-[13px] sm:text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a]"
              >
                {faqContent.label}
              </motion.div>

              {/* Section heading: responsive size */}
              <motion.h2
                initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 20 }}
                transition={{
                  duration: prefersReduced ? 0 : 0.7,
                  delay: prefersReduced ? 0 : 0.1,
                  ease: "easeOut",
                }}
                className="mt-[24px] sm:mt-[32px] lg:mt-[40px] text-[28px] sm:text-[38px] lg:text-[48px] font-normal leading-[1.2] sm:leading-[1.22] tracking-[-0.5px] sm:tracking-[-1px] text-[#0a0a0a]"
              >
                {faqContent.headingLine1}
                <br />
                {faqContent.headingLine2}
              </motion.h2>
            </div>

            {/* Bottom: AskCard */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 24 }}
              transition={{
                duration: prefersReduced ? 0 : 0.7,
                delay: prefersReduced ? 0 : 0.25,
                ease: "easeOut",
              }}
              className="mt-8 sm:mt-12 lg:mt-0"
            >
              <AskCard />
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN (608px wide, 7 accordion rows) ================= */}
          <div className="w-full lg:w-[608px] flex flex-col justify-start">
            {faqs.map((faq, index) => (
              <FaqRow
                key={faq.id}
                item={faq}
                index={index}
                isOpen={openId === faq.id}
                onToggle={() => handleToggle(faq.id)}
                sectionInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
