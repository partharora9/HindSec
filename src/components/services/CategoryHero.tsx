"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Breadcrumbs from "./Breadcrumbs";
import ServiceIcon from "./ServiceIcon";
import { ServiceCategory } from "@/data/services";

interface CategoryHeroProps {
  category: ServiceCategory;
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: category.title },
  ];

  return (
    <section className="relative w-full pt-[130px] pb-[70px] lg:pt-[150px] lg:pb-[90px] px-6 lg:px-0 overflow-hidden border-b border-[#e2e4e8]">
      {/* Subtle background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Hero Content */}
        <div className="max-w-[880px]">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-[#e2e4e8] shadow-xs mb-5"
          >
            <div className="w-5 h-5 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center">
              <ServiceIcon name={category.icon} className="w-3 h-3 text-white" />
            </div>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#4a4f5a]">
              Enterprise Service Offering
            </span>
          </motion.div>

          {/* H1 Title */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-[34px] sm:text-[44px] lg:text-[52px] font-normal tracking-[-0.03em] text-[#0a0a0a] leading-[1.12] mb-5"
          >
            {category.title}
          </motion.h1>

          {/* One-line Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-[19px] sm:text-[22px] font-medium text-[#1c2c4a] leading-snug tracking-tight mb-5"
          >
            {category.tagline}
          </motion.p>

          {/* Short Intro Summary */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-[16px] sm:text-[17px] text-[#4a4f5a] leading-relaxed mb-8 max-w-[780px]"
          >
            {category.summary}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href={category.cta.primaryButtonHref}
              className="inline-flex items-center justify-center h-[46px] px-7 rounded-full bg-[#0a0a0a] text-white text-[15px] font-medium hover:bg-black/85 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              Book a Consultation
            </Link>

            <a
              href="#services-grid"
              className="inline-flex items-center justify-center h-[46px] px-6 rounded-full bg-white text-[#0a0a0a] border border-[#e2e4e8] text-[15px] font-medium hover:bg-[#f8f9fa] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              View Service Modules ({category.services.length})
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
