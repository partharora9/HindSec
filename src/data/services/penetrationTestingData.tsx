import React from "react";
import { motion } from "framer-motion";
import { ServicePageData } from "@/types/service";
import DigitalBarsCanvas from "@/components/penetration-testing/DigitalBarsCanvas";

export const penetrationTestingData: ServicePageData = {
  hero: {
    title: "Penetration Testing",
    paragraph: (
      <>
        Find vulnerabilities before attackers do with controlled testing, clear evidence,{" "}
        <br className="hidden sm:inline" />
        and practical remediation guidance.
      </>
    ),
    background: <DigitalBarsCanvas />,
  },
  cards: [
    {
      id: "web-app-testing",
      title: "Web application testing",
      description:
        "We test web apps, portals, and APIs for exploitable flaws that could expose users, data, or business systems.",
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
          {/* Browser window outer rectangle */}
          <motion.rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          {/* Top header bar */}
          <motion.line
            x1="3"
            y1="9"
            x2="21"
            y2="9"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay: delay + 0.15, ease: "easeInOut" }}
          />
          {/* Left dot */}
          <motion.circle
            cx="6.5"
            cy="6.5"
            r="0.9"
            fill="#0a0a0a"
            animate={
              isHovered
                ? { opacity: [1, 0.2, 1] }
                : { opacity: 1 }
            }
            transition={{ duration: 0.4 }}
          />
          {/* Right dot */}
          <motion.circle
            cx="9.5"
            cy="6.5"
            r="0.9"
            fill="#0a0a0a"
            animate={
              isHovered
                ? { opacity: [1, 0.2, 1] }
                : { opacity: 1 }
            }
            transition={{ duration: 0.4, delay: 0.15 }}
          />
        </svg>
      ),
    },
    {
      id: "network-pentest",
      title: "Network penetration testing",
      description:
        "We assess internal and external networks to find weak access points, misconfigurations, and paths attackers could use.",
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
            animate={isHovered ? { rotate: 30 } : { rotate: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{ transformOrigin: "11px 13px" }}
          >
            {/* Globe outline */}
            <motion.circle
              cx="11"
              cy="13"
              r="7.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            {/* Equator */}
            <motion.path
              d="M3.5 13H18.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.1, ease: "easeInOut" }}
            />
            {/* Meridian curves */}
            <motion.path
              d="M11 5.5C8.8 8 8.8 18 11 20.5M11 5.5C13.2 8 13.2 18 11 20.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.2, ease: "easeInOut" }}
            />
          </motion.g>
          {/* Padlock on top-right */}
          <motion.g>
            <motion.path
              d="M17 6V4.2C17 3.3 17.7 2.5 18.7 2.5C19.7 2.5 20.5 3.3 20.5 4.2V6"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.25, ease: "easeInOut" }}
            />
            <motion.rect
              x="15.5"
              y="6"
              width="6.5"
              height="5.5"
              rx="0.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.3, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      ),
    },
    {
      id: "cloud-security-testing",
      title: "Cloud security testing",
      description:
        "We review cloud environments, permissions, and configurations to identify exposure across modern infrastructure.",
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
          {/* Cloud base */}
          <motion.path
            d="M5 16.5C3.3 16.5 2 15.2 2 13.5C2 12 3 10.7 4.5 10.5C4.7 7.5 7.2 5 10.3 5C12.7 5 14.7 6.5 15.6 8.7C16.1 8.5 16.6 8.3 17.2 8.3C19.3 8.3 21 10 21 12.1C21 12.4 20.9 12.8 20.8 13.1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          {/* Small gear in lower-right that rotates 90deg on hover */}
          <motion.g
            animate={isHovered ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            style={{ transformOrigin: "15px 16px" }}
          >
            <motion.circle
              cx="15"
              cy="16"
              r="2.8"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.15, ease: "easeInOut" }}
            />
            <motion.path
              d="M15 12.5V13.5M15 18.5V19.5M11.5 16H12.5M17.5 16H18.5M12.5 13.5L13.2 14.2M16.8 17.8L17.5 18.5M17.5 13.5L16.8 14.2M13.2 17.8L12.5 18.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.25, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      ),
    },
  ],
  whatIs: {
    heading: "What Is Penetration Testing?",
    paragraphs: [
      "Penetration Testing is a controlled security assessment that simulates real attack methods to find vulnerabilities before they are exploited. It helps your team understand where risk exists, how serious each issue is, and what needs to be fixed first.",
      "Securio tests applications, networks, cloud systems, and infrastructure with a clear focus on business impact. You get evidence-based findings, practical recommendations, and a better understanding of your real security posture.",
    ],
    checklistLabel: "WITH PENETRATION TESTING, YOU CAN:",
    checklist: [
      "Find exploitable vulnerabilities",
      "Validate existing security controls",
      "Understand real attack paths",
      "Prioritize remediation work",
      "Reduce security risk before incidents happen",
    ],
  },
  delivery: {
    heading: (
      <>
        How Do We Deliver
        <br />
        Penetration Testing?
      </>
    ),
    items: [
      {
        number: 1,
        title: "Map the attack surface",
        description:
          "We review your systems, applications, access points, and exposed assets to understand where testing should focus first.",
      },
      {
        number: 2,
        title: "Test real attack paths",
        description:
          "We use controlled testing methods to validate vulnerabilities and show how an attacker could move through your environment.",
      },
      {
        number: 3,
        title: "Report clear next steps",
        description:
          "We deliver clear findings, risk ratings, evidence, and remediation guidance your technical and leadership teams can act on.",
      },
    ],
    photo: {
      src: "/images/security-expert.jpg",
      alt: "Securio security engineers evaluating penetration test telemetry on laptop",
      fallbackGradient: "bg-gradient-to-br from-[#1c2c4a] via-[#121c2e] to-[#0a101b]",
    },
  },
  outcomes: [
    {
      id: "verified-security-gaps",
      title: "Verified security gaps",
      description:
        "Confirm which vulnerabilities are real, exploitable, and important enough to require action.",
      icon: (isHovered, isInView, delay = 0) => (
        // Incognito spy (hat with round glasses)
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
          {/* Hat brim */}
          <motion.line
            x1="3"
            y1="10"
            x2="21"
            y2="10"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          {/* Hat crown */}
          <motion.path
            d="M6.5 10L8 4H16L17.5 10"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay: delay + 0.1, ease: "easeInOut" }}
          />
          {/* Glasses bridge */}
          <motion.line
            x1="10.5"
            y1="14.5"
            x2="13.5"
            y2="14.5"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay: delay + 0.2, ease: "easeInOut" }}
          />
          {/* Glasses circles that blink on hover */}
          <motion.g
            animate={
              isHovered
                ? { scaleY: [1, 0.1, 1] }
                : { scaleY: 1 }
            }
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ transformOrigin: "12px 15px" }}
          >
            <motion.circle
              cx="8"
              cy="14.5"
              r="2.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.2, ease: "easeInOut" }}
            />
            <motion.circle
              cx="16"
              cy="14.5"
              r="2.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.25, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      ),
    },
    {
      id: "lower-breach-risk",
      title: "Lower breach risk",
      description:
        "Reduce the chance of compromise by fixing weak points before attackers can use them.",
      icon: (isHovered, isInView, delay = 0) => (
        // Down arrow with sorting lines of decreasing length
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
          {/* Sorting lines of decreasing length on the right */}
          <motion.line
            x1="12"
            y1="6"
            x2="21"
            y2="6"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          <motion.line
            x1="12"
            y1="11"
            x2="19"
            y2="11"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay: delay + 0.1, ease: "easeInOut" }}
          />
          <motion.line
            x1="12"
            y1="16"
            x2="16.5"
            y2="16"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay: delay + 0.2, ease: "easeInOut" }}
          />
          {/* Down arrow that slides down 4px on hover */}
          <motion.g
            animate={isHovered ? { y: [0, 4, 0] } : { y: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <motion.line
              x1="6.5"
              y1="4.5"
              x2="6.5"
              y2="18.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.15, ease: "easeInOut" }}
            />
            <motion.polyline
              points="3.5 15.5 6.5 18.5 9.5 15.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.25, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      ),
    },
    {
      id: "clear-remediation-priorities",
      title: "Clear remediation priorities",
      description:
        "Focus your team on the issues that carry the most risk and need attention first.",
      icon: (isHovered, isInView, delay = 0) => (
        // Stacked layers (three diamonds)
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
          {/* Top diamond */}
          <motion.path
            d="M12 3L20 7.5L12 12L4 7.5L12 3Z"
            initial={{ pathLength: 0 }}
            animate={
              isHovered
                ? { y: -3, pathLength: 1 }
                : { y: 0, pathLength: isInView ? 1 : 0 }
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
          {/* Middle layer */}
          <motion.path
            d="M4 12L12 16.5L20 12"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay: delay + 0.15, ease: "easeInOut" }}
          />
          {/* Bottom layer */}
          <motion.path
            d="M4 16.5L12 21L20 16.5"
            initial={{ pathLength: 0 }}
            animate={
              isHovered
                ? { y: 3, pathLength: 1 }
                : { y: 0, pathLength: isInView ? 1 : 0 }
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </svg>
      ),
    },
    {
      id: "stronger-application-security",
      title: "Stronger application security",
      description:
        "Improve the protection of web apps, APIs, and digital platforms used by your business.",
      icon: (isHovered, isInView, delay = 0) => (
        // Browser window
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
            transition={{ duration: 0.9, delay, ease: "easeInOut" }}
          />
          <motion.line
            x1="3"
            y1="9"
            x2="21"
            y2="9"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.9, delay: delay + 0.15, ease: "easeInOut" }}
          />
          <motion.circle
            cx="6.5"
            cy="6.5"
            r="0.9"
            fill="#0a0a0a"
            animate={isHovered ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.circle
            cx="9.5"
            cy="6.5"
            r="0.9"
            fill="#0a0a0a"
            animate={isHovered ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          />
        </svg>
      ),
    },
    {
      id: "safer-network-access",
      title: "Safer network access",
      description:
        "Identify weak network paths, exposed services, and access risks across your environment.",
      icon: (isHovered, isInView, delay = 0) => (
        // Globe with padlock
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
            animate={isHovered ? { rotate: 30 } : { rotate: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{ transformOrigin: "11px 13px" }}
          >
            <motion.circle
              cx="11"
              cy="13"
              r="7.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            <motion.path
              d="M3.5 13H18.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.1, ease: "easeInOut" }}
            />
            <motion.path
              d="M11 5.5C8.8 8 8.8 18 11 20.5M11 5.5C13.2 8 13.2 18 11 20.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.2, ease: "easeInOut" }}
            />
          </motion.g>
          <motion.g>
            <motion.path
              d="M17 6V4.2C17 3.3 17.7 2.5 18.7 2.5C19.7 2.5 20.5 3.3 20.5 4.2V6"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.25, ease: "easeInOut" }}
            />
            <motion.rect
              x="15.5"
              y="6"
              width="6.5"
              height="5.5"
              rx="0.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.3, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      ),
    },
    {
      id: "better-compliance-readiness",
      title: "Better compliance readiness",
      description:
        "Support audits and security reviews with documented findings, evidence, and remediation progress.",
      icon: (isHovered, isInView, delay = 0) => (
        // Shield with vertical split line (half outlined)
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
            animate={
              isHovered
                ? { scale: [1, 1.12, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.45, ease: "easeInOut" }}
            style={{ transformOrigin: "12px 12px" }}
          >
            {/* Shield outline */}
            <motion.path
              d="M12 2.5L4.5 5.5V11.5C4.5 16.8 7.7 21.2 12 22.5C16.3 21.2 19.5 16.8 19.5 11.5V5.5L12 2.5Z"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay, ease: "easeInOut" }}
            />
            {/* Center vertical dividing line */}
            <motion.line
              x1="12"
              y1="2.5"
              x2="12"
              y2="22.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.15, ease: "easeInOut" }}
            />
            {/* Half hatch / horizontal lines on right half */}
            <motion.path
              d="M12 7H17M12 11H18M12 15H17"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: delay + 0.25, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      ),
    },
  ],
};
