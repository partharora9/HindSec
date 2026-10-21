import React from "react";
import { motion } from "framer-motion";
import { ServicePageData } from "@/types/service";
import AuroraBackground from "@/components/proactive-security/AuroraBackground";

export const proactiveSecurityData: ServicePageData = {
  hero: {
    title: "Proactive Security",
    paragraph: (
      <>
        Detect risks earlier, reduce exposure, and strengthen security before threats{" "}
        <br className="hidden sm:inline" />
        become incidents.
      </>
    ),
    background: <AuroraBackground />,
  },
  cards: [
    {
      id: "continuous-monitoring",
      title: "Continuous threat monitoring",
      description:
        "We track suspicious activity, review signals, and help your team act before small risks become larger security issues.",
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
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="4.8"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="1"
            fill="#0a0a0a"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: delay + 0.3 }}
          />
          <motion.path
            d="M12 3V6M12 18V21M3 12H6M18 12H21"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          <motion.g
            animate={isHovered ? { rotate: 360 } : { rotate: 45 }}
            transition={
              isHovered
                ? { duration: 1.2, ease: "linear", repeat: Infinity }
                : { duration: 0.4 }
            }
            style={{ transformOrigin: "12px 12px" }}
          >
            <line x1="12" y1="12" x2="19.5" y2="7" stroke="#0a0a0a" strokeWidth="1.5" />
          </motion.g>
        </svg>
      ),
    },
    {
      id: "attack-surface",
      title: "Attack surface management",
      description:
        "We track suspicious activity, review signals, and help your team act before small risks become larger security issues.",
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
          <motion.g
            animate={isHovered ? { x: [0, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <motion.rect
              x="3"
              y="4.5"
              width="18"
              height="14"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            <motion.path
              d="M3 9.2H21M3 13.8H21"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            <motion.path
              d="M12 4.5V9.2M7.5 9.2V13.8M16.5 9.2V13.8M12 13.8V18.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            <motion.path
              d="M18 13.5L14.5 15V17.8C14.5 20 16 21.7 18 22.2C20 21.7 21.5 20 21.5 17.8V15L18 13.5Z"
              fill="#ffffff"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      ),
    },
    {
      id: "posture-review",
      title: "Security posture review",
      description:
        "We assess your current controls, gaps, and priorities to help improve security with clear next steps.",
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
            d="M5 8V6a2 2 0 0 1 2-2h2M15 4h2a2 2 0 0 1 2 2v2M5 16v2a2 2 0 0 0 2 2h2M15 20h2a2 2 0 0 0 2-2v-2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          <motion.g
            animate={isHovered ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ transformOrigin: "12px 12px" }}
          >
            <motion.path
              d="M3 12C3 12 6.5 7.5 12 7.5C17.5 7.5 21 12 21 12C21 12 17.5 16.5 12 16.5C6.5 16.5 3 12 3 12Z"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            <motion.circle
              cx="12"
              cy="12"
              r="2.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      ),
    },
  ],
  whatIs: {
    heading: "What is Proactive Security?",
    paragraphs: [
      "Proactive Security focuses on finding and reducing risk before an incident happens. Instead of waiting for alerts after damage begins, it helps your team understand where exposure exists, which systems need attention, and what actions should come first.",
      "Securio helps businesses monitor threats, review security posture, and close gaps across critical systems. The result is stronger visibility, faster decisions, and a security program that supports daily operations.",
    ],
    checklistLabel: "WITH PROACTIVE SECURITY, YOU CAN:",
    checklist: [
      "Identify risks before they escalate",
      "Improve visibility across key systems",
      "Reduce gaps in your security controls",
      "Prioritize the issues that matter most",
      "Strengthen defenses over time",
    ],
  },
  delivery: {
    heading: (
      <>
        How Do We Deliver
        <br />
        Proactive Security?
      </>
    ),
    items: [
      {
        number: 1,
        title: "Identify active risks",
        description:
          "We review your environment, assets, and security signals to find risks that need attention before they create business impact.",
      },
      {
        number: 2,
        title: "Monitor threat signals",
        description:
          "We track suspicious patterns, alerts, and changes across your systems to help your team respond with more context.",
      },
      {
        number: 3,
        title: "Close security gaps",
        description:
          "We help prioritize fixes, improve controls, and reduce exposure across the systems your business depends on.",
      },
    ],
    photo: {
      src: "/images/proactive-delivery.jpg",
      alt: "Security professional delivering proactive security solutions",
    },
  },
  outcomes: [
    {
      id: "earlier-threat-detection",
      title: "Earlier threat detection",
      description:
        "Spot suspicious activity sooner and give your team more time to investigate, contain, and respond.",
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
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="4.8"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="1"
            fill="#0a0a0a"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: delay + 0.3 }}
          />
          <motion.path
            d="M12 3V6M12 18V21M3 12H6M18 12H21"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          <motion.g
            animate={isHovered ? { rotate: 360 } : { rotate: 45 }}
            transition={
              isHovered
                ? { duration: 1.2, ease: "linear", repeat: Infinity }
                : { duration: 0.4 }
            }
            style={{ transformOrigin: "12px 12px" }}
          >
            <line x1="12" y1="12" x2="19.5" y2="7" stroke="#0a0a0a" strokeWidth="1.5" />
          </motion.g>
        </svg>
      ),
    },
    {
      id: "reduced-attack-exposure",
      title: "Reduced attack exposure",
      description:
        "Find exposed assets, weak controls, and security gaps before attackers can use them.",
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
          <motion.g
            animate={isHovered ? { x: [0, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <motion.rect
              x="3"
              y="4.5"
              width="18"
              height="14"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            <motion.path
              d="M3 9.2H21M3 13.8H21"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            <motion.path
              d="M12 4.5V9.2M7.5 9.2V13.8M16.5 9.2V13.8M12 13.8V18.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            <motion.path
              d="M18 13.5L14.5 15V17.8C14.5 20 16 21.7 18 22.2C20 21.7 21.5 20 21.5 17.8V15L18 13.5Z"
              fill="#f0f1f3"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      ),
    },
    {
      id: "faster-risk-response",
      title: "Faster risk response",
      description:
        "Prioritize issues by impact so your team can act quickly and focus on what matters first.",
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
          <motion.g
            animate={isHovered ? { scale: [1, 1.12, 1] } : { scale: 1 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            style={{ transformOrigin: "12px 12px" }}
          >
            <motion.path
              d="M12 2.5L4.5 5.5V11.5C4.5 16.8 7.7 21.2 12 22.5C16.3 21.2 19.5 16.8 19.5 11.5V5.5L12 2.5Z"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            <motion.path
              d="M9 12L11 14L15 9.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.2, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      ),
    },
    {
      id: "clearer-security-visibility",
      title: "Clearer security visibility",
      description:
        "Understand what is happening across your systems with cleaner reporting and better context.",
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
            d="M5 8V6a2 2 0 0 1 2-2h2M15 4h2a2 2 0 0 1 2 2v2M5 16v2a2 2 0 0 0 2 2h2M15 20h2a2 2 0 0 0 2-2v-2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          <motion.g
            animate={isHovered ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ transformOrigin: "12px 12px" }}
          >
            <motion.path
              d="M3 12C3 12 6.5 7.5 12 7.5C17.5 7.5 21 12 21 12C21 12 17.5 16.5 12 16.5C6.5 16.5 3 12 3 12Z"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            <motion.circle
              cx="12"
              cy="12"
              r="2.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      ),
    },
    {
      id: "stronger-security-posture",
      title: "Stronger security posture",
      description:
        "Improve your controls, processes, and monitoring with a practical plan for long-term protection.",
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
            d="M12 2.5L4.5 5.5V11.5C4.5 16.8 7.7 21.2 12 22.5C16.3 21.2 19.5 16.8 19.5 11.5V5.5L12 2.5Z"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          <motion.g
            animate={isHovered ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            style={{ transformOrigin: "12px 13px" }}
          >
            <motion.circle
              cx="12"
              cy="13"
              r="2.6"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            <motion.path
              d="M12 9.5V10.5M12 15.5V16.5M8.5 13H9.5M14.5 13H15.5M9.8 10.8L10.5 11.5M13.5 14.5L14.2 15.2M14.2 10.8L13.5 11.5M10.5 14.5L9.8 15.2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      ),
    },
    {
      id: "lower-incident-impact",
      title: "Lower incident impact",
      description:
        "Reduce the chance of disruption by preparing your systems, teams, and response process in advance.",
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
            d="M5 16.5C3.3 16.5 2 15.2 2 13.5C2 12 3 10.7 4.5 10.5C4.7 7.5 7.2 5 10.3 5C12.7 5 14.7 6.5 15.6 8.7C16.1 8.5 16.6 8.3 17.2 8.3C19.3 8.3 21 10 21 12.1C21 12.4 20.9 12.8 20.8 13.1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          <motion.g
            animate={isHovered ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ transformOrigin: "14px 16px" }}
          >
            <motion.path
              d="M11 16.5A3.5 3.5 0 1 1 14.5 20"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            <motion.path
              d="M14.5 17.5V20H12"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      ),
    },
  ],
};
