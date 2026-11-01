"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export interface FooterLinkItem {
  label: string;
  fullLabel: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

export const footerColumnsData: FooterColumn[] = [
  {
    title: "Services",
    links: [
      {
        label: "VAPT Services",
        fullLabel: "Vulnerability Assessment & Penetration Testing",
        href: "/services/vapt-services",
      },
      {
        label: "AI & LLM Security",
        fullLabel: "AI & LLM Security Assessment",
        href: "/services/ai-llm-security-assessment",
      },
      {
        label: "Security Training & Phishing",
        fullLabel: "Cybersecurity Training & Phishing Simulation",
        href: "/services/security-awareness-training",
      },
      {
        label: "AI Security Products",
        fullLabel: "AI Security Product Development",
        href: "/services/ai-security-products",
      },
      {
        label: "Custom LLM Development",
        fullLabel: "Custom LLM Development",
        href: "/services/custom-llm-development",
      },
      {
        label: "Enterprise AI Assistants",
        fullLabel: "Enterprise AI Knowledge Assistants",
        href: "/services/enterprise-ai-knowledge-assistants",
      },
    ],
  },
  {
    title: "Compliance Services",
    links: [
      {
        label: "ISO 27001 ISMS Audit",
        fullLabel: "ISO/IEC 27001 Technical VAPT Audit",
        href: "/services/vapt-compliance-services#iso-27001-vapt-audit",
      },
      {
        label: "SOC 2 Type II VAPT",
        fullLabel: "SOC 2 Type II Penetration Testing & Controls",
        href: "/services/vapt-compliance-services#soc2-type-2-penetration-testing",
      },
      {
        label: "PCI-DSS 4.0 Testing",
        fullLabel: "PCI-DSS v4.0 Vulnerability Assessment & Pentest",
        href: "/services/vapt-compliance-services#pci-dss-penetration-testing",
      },
      {
        label: "DPDP Act Privacy Audit",
        fullLabel: "DPDP Act 2023 & GDPR Technical Privacy Pentest",
        href: "/services/vapt-compliance-services#dpdp-gdpr-privacy-security-testing",
      },
      {
        label: "HIPAA Security Rule",
        fullLabel: "HIPAA Technical Safeguards & ePHI Pentest",
        href: "/services/vapt-compliance-services#hipaa-technical-safeguards-audit",
      },
      {
        label: "RBI / SEBI Cyber Audit",
        fullLabel: "RBI & SEBI Cybersecurity Regulatory Framework Audit",
        href: "/services/vapt-compliance-services#rbi-sebi-irdai-cyber-framework",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About",
        fullLabel: "About HindSec",
        href: "/about",
      },
      {
        label: "Contact",
        fullLabel: "Contact Our Security Team",
        href: "/contact",
      },
      {
        label: "Certifications",
        fullLabel: "Team Certifications & Standards",
        href: "/certifications",
      },
      {
        label: "Careers",
        fullLabel: "Join the HindSec Team",
        href: "/careers",
      },
    ],
  },
];

export default function FooterLinks({ isInView = true }: { isInView?: boolean }) {
  const prefersReduced = useSafeReducedMotion();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_1fr] gap-x-8 sm:gap-x-12 lg:gap-x-[64px] gap-y-8 w-full select-none">
      {footerColumnsData.map((column, colIdx) => (
        <motion.div
          key={column.title}
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: prefersReduced ? 0 : 16 }
          }
          transition={{
            duration: prefersReduced ? 0 : 0.5,
            delay: prefersReduced ? 0 : 0.2 + colIdx * 0.08,
            ease: "easeOut",
          }}
          className="flex flex-col"
        >
          {/* Column Heading: 13px, uppercase, 0.08em letter-spacing, weight 600, color rgba(255,255,255,0.65), mb 20px, 1px rgba(255,255,255,0.12) divider */}
          <h3 className="text-[13px] uppercase tracking-[0.08em] font-semibold text-white/65 mb-[20px] pb-[10px] border-b border-white/[0.12] select-none">
            {column.title}
          </h3>

          {/* Links list: <ul> with list-style: none and margin: 0 */}
          <ul className="list-none m-0 p-0 flex flex-col">
            {column.links.map((link) => (
              <li key={link.href} className="mb-[12px] last:mb-0">
                <Link
                  href={link.href}
                  title={link.fullLabel}
                  aria-label={link.fullLabel}
                  className="block py-[7px] text-[15px] leading-[1.4] text-white/85 hover:text-white transition-all duration-150 ease-out hover:translate-x-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b16] focus-visible:rounded min-h-[44px] sm:min-h-0 flex items-center group cursor-pointer"
                >
                  <span className="leading-[1.35] group-hover:text-white transition-colors duration-150">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
