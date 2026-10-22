import React from "react";
import { motion } from "framer-motion";
import { ServicePageData } from "@/types/service";
import HalftoneDotsCanvas from "@/components/endpoint-security/HalftoneDotsCanvas";
import { BRAND_NAME, servicePagesContent, testimonialContent } from "@/content/siteContent";

const content = servicePagesContent.applicationSecurity;

export const applicationSecurityData: ServicePageData = {
  hero: {
    title: content.hero.title,
    paragraph: (
      <>
        Test web apps, mobile apps, and APIs against real attack techniques and the{" "}
        <br className="hidden sm:inline" />
        OWASP Top 10 before attackers find the gaps.
      </>
    ),
    background: <HalftoneDotsCanvas />,
  },
  cards: [
    {
      id: content.cards[0].id,
      title: content.cards[0].title,
      description: content.cards[0].description,
      icon: (isHovered, isInView, delay = 0) => (
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="overflow-visible"
        >
          <motion.rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.8, delay, ease: "easeInOut" }}
          />
          <motion.line
            x1="3"
            y1="9"
            x2="21"
            y2="9"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.15 }}
          />
          <motion.circle
            cx="6.5"
            cy="6.5"
            r="0.8"
            className="fill-[#0a0a0a]"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
          />
          <motion.circle
            cx="9.5"
            cy="6.5"
            r="0.8"
            className="fill-[#0a0a0a]"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.25 }}
          />
          <motion.g
            animate={isHovered ? { x: 2 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <path d="m8 14 2 2-2 2" stroke="#2563eb" strokeWidth="1.75" />
            <line x1="12" y1="18" x2="16" y2="18" stroke="#2563eb" strokeWidth="1.75" />
          </motion.g>
        </svg>
      ),
    },
    {
      id: content.cards[1].id,
      title: content.cards[1].title,
      description: content.cards[1].description,
      icon: (isHovered, isInView, delay = 0) => (
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="overflow-visible"
        >
          <motion.path
            d="M4 12v-3a2 2 0 0 1 2-2h3m6 0h3a2 2 0 0 1 2 2v3m0 4v3a2 2 0 0 1-2 2h-3m-6 0H6a2 2 0 0 1-2-2v-3"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.8, delay, ease: "easeInOut" }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="3"
            stroke="#2563eb"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          />
          <motion.line
            x1="9"
            y1="12"
            x2="5"
            y2="12"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.3 }}
          />
          <motion.line
            x1="15"
            y1="12"
            x2="19"
            y2="12"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.3 }}
          />
        </svg>
      ),
    },
    {
      id: content.cards[2].id,
      title: content.cards[2].title,
      description: content.cards[2].description,
      icon: (isHovered, isInView, delay = 0) => (
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="overflow-visible"
        >
          <motion.rect
            x="6"
            y="2"
            width="12"
            height="20"
            rx="3"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.8, delay, ease: "easeInOut" }}
          />
          <motion.line
            x1="11"
            y1="18"
            x2="13"
            y2="18"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.2 }}
          />
          <motion.g
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: "12px 10px" }}
          >
            <path
              d="M12 6v4m-2-2h4"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.g>
        </svg>
      ),
    },
  ],
  whatIs: {
    heading: content.whatIs.heading,
    paragraphs: [content.whatIs.paragraphs[0], content.whatIs.paragraphs[1]],
    checklistLabel: content.whatIs.checklistLabel,
    checklist: content.whatIs.checklist,
  },
  delivery: {
    heading: (
      <>
        {content.delivery.headingLine1}
        <br />
        {content.delivery.headingLine2}
      </>
    ),
    items: content.delivery.steps,
    photo: {
      src: "/images/security-expert.jpg",
      alt: `${BRAND_NAME} security engineers performing application and API penetration testing`,
      fallbackGradient: "bg-gradient-to-br from-[#1c2c4a] via-[#121c2e] to-[#0a101b]",
    },
  },
  testimonialAuthor: {
    name: testimonialContent.authorName,
    role: testimonialContent.authorRole,
    className: "text-[22px] font-normal text-[#0a0a0a]",
  },
  outcomes: content.outcomes.map((o) => ({
    id: o.id,
    title: o.title,
    description: o.description,
    icon: (isHovered, isInView, delay = 0) => (
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0a0a0a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="overflow-visible"
      >
        <motion.circle
          cx="12"
          cy="12"
          r="9"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, delay, ease: "easeInOut" }}
        />
        <motion.polyline
          points="8 12 11 15 16 9"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        />
      </svg>
    ),
  })),
};
