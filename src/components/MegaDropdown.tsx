"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navContent } from "@/content/siteContent";
import { serviceCategories } from "@/data/services";
import ServiceIcon from "@/components/services/ServiceIcon";

export interface MegaMenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

export const servicesMenuItems: MegaMenuItem[] = serviceCategories.slice(0, 3).map((cat) => ({
  title: cat.title,
  description: cat.tagline,
  href: `/services/${cat.slug}`,
  icon: <ServiceIcon name={cat.icon} className="w-[18px] h-[18px] text-white" />,
}));

export const whySecurioMenuItems: MegaMenuItem[] = [
  {
    title: navContent.whySecurio[0].title,
    description: navContent.whySecurio[0].description,
    href: navContent.whySecurio[0].href,
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
    title: navContent.whySecurio[1].title,
    description: navContent.whySecurio[1].description,
    href: navContent.whySecurio[1].href,
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
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    title: navContent.whySecurio[2].title,
    description: navContent.whySecurio[2].description,
    href: navContent.whySecurio[2].href,
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
  currentPath?: string;
}

export default function MegaDropdown({
  type,
  leftOffset,
  onMouseEnter,
  onMouseLeave,
  onClose,
  currentPath,
}: MegaDropdownProps) {
  const isServices = type === "services";
  const label = isServices ? navContent.servicesLabel : navContent.whyLabel;

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
      className={`absolute top-[calc(100%+8px)] bg-white rounded-none shadow-[0_20px_50px_rgba(2,6,30,0.25)] border border-[#e2e4e8] z-50 pointer-events-auto select-none ${
        isServices
          ? "w-[960px] p-[20px] max-w-[calc(100vw-32px)]"
          : "w-[625px] h-[272px] p-[8px] flex"
      }`}
      role="menu"
      aria-label={`${label} menu`}
    >
      {isServices ? (
        /* ================= SERVICES MEGA-MENU (6 Categories + Sub-services) ================= */
        <div className="w-full flex flex-col">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#e2e4e8]">
            <div className="flex items-center gap-2.5">
              <span className="text-[12px] uppercase tracking-[0.05em] text-[#4a4f5a] font-semibold">
                Service Categories & Capabilities
              </span>
              <span className="text-[11px] bg-[#f0f1f3] text-[#0a0a0a] px-2 py-0.5 font-medium">
                6 Categories • 48 Modules
              </span>
            </div>
            <Link
              href="/services"
              onClick={onClose}
              className="text-[13px] font-semibold text-[#0a0a0a] hover:text-blue-700 transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
            >
              <span>Explore All Services</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* 3 Columns x 2 Rows Grid of 6 Categories */}
          <div className="grid grid-cols-3 gap-x-6 gap-y-5">
            {serviceCategories.map((category) => {
              const isCategoryActive = currentPath === `/services/${category.slug}`;

              return (
                <div key={category.slug} className="flex flex-col group">
                  {/* Category Title Link */}
                  <Link
                    href={`/services/${category.slug}`}
                    onClick={onClose}
                    className={`flex items-start gap-2.5 p-1.5 -ml-1.5 rounded-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-black ${
                      isCategoryActive
                        ? "bg-[#e8eaee]"
                        : "hover:bg-[#f0f1f3]"
                    }`}
                    role="menuitem"
                  >
                    <div className="w-[28px] h-[28px] bg-[#0a0a0a] rounded-none flex items-center justify-center flex-shrink-0 text-white mt-0.5 group-hover:bg-[#1a2b49] transition-colors">
                      <ServiceIcon name={category.icon} className="w-[15px] h-[15px] text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13.5px] font-semibold text-[#0a0a0a] leading-tight group-hover:text-black flex items-center gap-1.5">
                        <span className="truncate">{category.title}</span>
                        {isCategoryActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-[11px] text-[#6b7078] truncate mt-0.5">
                        {category.services.length} services
                      </div>
                    </div>
                  </Link>

                  {/* Services List beneath each category */}
                  <ul className="mt-1 space-y-0.5 pl-3 border-l border-[#e2e4e8]" role="group">
                    {category.services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${category.slug}#services-grid`}
                          onClick={onClose}
                          className="text-[11.5px] text-[#4a4f5a] hover:text-[#0a0a0a] hover:font-medium block py-0.5 truncate transition-colors focus:outline-none focus-visible:underline"
                          title={service.title}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Footer Bar */}
          <div className="mt-4 pt-3 border-t border-[#f0f1f3] flex items-center justify-between text-[12px] text-[#4a4f5a]">
            <span>Need dedicated architecture or private cloud LLM deployment?</span>
            <Link
              href="/contact"
              onClick={onClose}
              className="font-semibold text-[#0a0a0a] hover:text-black transition-colors focus:outline-none focus-visible:underline"
            >
              Book a Scoping Consultation →
            </Link>
          </div>
        </div>
      ) : (
        /* ================= WHY SECURIO MENU (Existing Layout) ================= */
        <>
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
                <div className="text-[12px] uppercase tracking-[0.02em] text-[#4a4f5a] font-normal pl-[24px] pt-[14px] pb-[6px]">
                  {label}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  {whySecurioMenuItems.map((item, idx) => (
                    <Link
                      key={item.title}
                      href={item.href || `#${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={onClose}
                      className="h-[68px] w-full flex items-center px-[16px] cursor-pointer rounded-none transition-colors duration-150 hover:bg-[#f0f1f3] group focus:outline-none focus-visible:bg-[#f0f1f3] focus-visible:ring-1 focus-visible:ring-black"
                      role="menuitem"
                    >
                      <div className="w-[30px] h-[30px] bg-[#0a0a0a] rounded-none flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>

                      <div className="ml-[22px] flex flex-col">
                        <span className="text-[17px] font-normal text-[#0a0a0a] leading-[1.2]">
                          {item.title}
                        </span>
                        <span className="text-[13px] font-normal text-[#4a4f5a] mt-[4px] leading-tight">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Image Card */}
          <Link
            href={navContent.dropdownCard.href}
            onClick={onClose}
            className="w-[257px] h-full relative rounded-none overflow-hidden block group cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            role="menuitem"
            aria-label={`${navContent.dropdownCard.titleLine1} ${navContent.dropdownCard.titleLine2}`}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#1c2c4a] via-[#121c2e] to-[#0a101b] absolute inset-0">
              <Image
                src={navContent.dropdownCard.imageSrc}
                alt={navContent.dropdownCard.imageAlt}
                fill
                unoptimized
                sizes="257px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                priority
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

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

            <div className="absolute bottom-0 left-0 right-0 p-[16px] z-10 flex flex-col justify-end">
              <h3 className="text-[24px] font-normal text-white leading-[1.2] tracking-[-0.01em]">
                {navContent.dropdownCard.titleLine1}<br />
                {navContent.dropdownCard.titleLine2}
              </h3>
              <span className="text-[13px] font-medium text-white/95 mt-[5px]">
                {navContent.dropdownCard.subtitle}
              </span>
            </div>
          </Link>
        </>
      )}
    </motion.div>
  );
}
