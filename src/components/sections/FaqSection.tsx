"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "What types of cyber threats do you protect against?",
    answer:
      "We defend against advanced persistent threats (APTs), zero-day exploits, ransomware campaigns, supply chain compromises, and credential abuse across your hybrid cloud and on-premises environments.",
  },
  {
    id: "faq-2",
    question: "How quickly can you detect and respond to an attack?",
    answer:
      "Our 24/7 Security Operations Center achieves a median time-to-detect (MTTD) under 5 minutes and executes containment playbooks within 15 minutes of verified high-severity signals.",
  },
  {
    id: "faq-3",
    question: "Do you provide 24/7 monitoring and support?",
    answer:
      "Yes, Securio operates multi-region security operations centers delivering uninterrupted 24/7/365 telemetry monitoring, threat hunting, and direct incident commander access.",
  },
  {
    id: "faq-4",
    question: "Can your solutions scale as our business grows?",
    answer:
      "Our cloud-native platform scales automatically to handle exponential telemetry volume, expanding team sizes, and multi-cloud architectures without latency or re-architecture.",
  },
  {
    id: "faq-5",
    question: "How do you ensure compliance with industry standards?",
    answer:
      "We continuously map defenses and telemetry to SOC 2 Type II, ISO 27001, HIPAA, PCI-DSS, and NIST CSF, providing automated audit evidence and real-time posture reporting.",
  },
  {
    id: "faq-6",
    question: "How do you onboard and integrate with our existing infrastructure?",
    answer:
      "Onboarding takes 2 to 5 business days via turnkey API connectors and lightweight agents that integrate natively with existing SIEMs, identity providers, cloud consoles, and endpoint tools.",
  },
  {
    id: "faq-7",
    question: "What level of visibility and reporting will we have?",
    answer:
      "You gain real-time visibility through unified executive dashboards, continuous vulnerability metrics, and bi-weekly strategic threat briefings led by senior security architects.",
  },
];

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
        className="w-full text-left py-[30px] flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b50ae] focus-visible:ring-offset-2 transition-colors cursor-pointer select-none"
      >
        {/* Question Text: 19px, weight 400, #0a0a0a, shifts 6px right on hover when closed */}
        <motion.span
          animate={
            isRowHovered && !isOpen && !prefersReduced ? { x: 6 } : { x: 0 }
          }
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-[17px] sm:text-[18px] lg:text-[19px] font-normal text-[#0a0a0a] leading-[1.35] pr-4 max-w-[530px]"
        >
          {item.question}
        </motion.span>

        {/* Plus Icon (stroke 1.5, 20px, rotates 45deg to x, turns blue on hover when closed) */}
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
              className="pb-[28px] max-w-[520px]"
            >
              <p className="text-[17px] leading-[1.55] text-[#4a4f5a] font-normal">
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
      className="group block w-full lg:w-[608px] h-[205px] bg-[#ffffff] rounded-none p-[24px] relative transition-transform duration-300 ease-out hover:-translate-y-1 select-none cursor-pointer"
      style={{ boxShadow: "none" }}
    >
      {/* Top right diagonal arrow (24px, stroke 1.5, shifts 4px up-right on hover) */}
      <motion.div
        animate={
          isHovered && !prefersReduced
            ? { x: 4, y: -4 }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute top-[24px] right-[24px] w-[24px] h-[24px] flex items-center justify-center text-[#0a0a0a]"
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
      <div className="absolute bottom-[24px] left-[24px] right-[24px] flex flex-col items-start">
        {/* Title: 24px, weight 400, #0a0a0a */}
        <h4 className="text-[20px] sm:text-[22px] lg:text-[24px] font-normal text-[#0a0a0a] leading-[1.25]">
          Can’t find an answer to your question?
        </h4>

        {/* 12px below: Click to book a demo with underline animation on hover */}
        <div className="mt-[12px] relative inline-block">
          <span className="text-[17px] sm:text-[18px] text-[#4a4f5a] font-normal leading-normal">
            Click to book a demo
          </span>
          {/* Thin black underline animating under "Click to book a demo" */}
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
      className="w-full bg-[#f0f1f3] pt-0 pb-[150px] select-none text-[#0a0a0a]"
      id="faq"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        {/* Two Columns: 608px each with 64px gap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-stretch">
          {/* ================= LEFT COLUMN (608px wide, flex space-between) ================= */}
          <div className="w-full lg:w-[608px] flex flex-col justify-between">
            {/* Top: Section label & Heading */}
            <div>
              {/* Section label: 15px, uppercase, letter-spacing 0.03em, weight 400, #0a0a0a */}
              <motion.div
                initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 16 }}
                transition={{ duration: prefersReduced ? 0 : 0.6, ease: "easeOut" }}
                className="text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a]"
              >
                QUESTIONS & ANSWERS
              </motion.div>

              {/* Section heading: 40px below label, on two lines "Frequently / Asked Questions", 48px */}
              <motion.h2
                initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 20 }}
                transition={{
                  duration: prefersReduced ? 0 : 0.7,
                  delay: prefersReduced ? 0 : 0.1,
                  ease: "easeOut",
                }}
                className="mt-[40px] text-[34px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a]"
              >
                Frequently
                <br />
                Asked Questions
              </motion.h2>
            </div>

            {/* Bottom: AskCard (white card 608px x 205px) */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 24 }}
              transition={{
                duration: prefersReduced ? 0 : 0.7,
                delay: prefersReduced ? 0 : 0.25,
                ease: "easeOut",
              }}
              className="mt-[60px] lg:mt-0"
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
