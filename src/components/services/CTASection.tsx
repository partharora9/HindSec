"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function CTASection({
  title = "Book an Engineering Consultation",
  description = "Speak directly with our artificial intelligence and security architects to assess project feasibility, scoping requirements, and implementation timelines.",
  primaryButtonText = "Book a Consultation",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Explore All Services",
  secondaryButtonHref = "/services",
}: CTASectionProps) {
  return (
    <section className="w-full py-[80px] lg:py-[100px] px-6 lg:px-0 bg-[#02030a] text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(30, 70, 180, 0.22) 0%, rgba(11, 26, 94, 0.08) 50%, transparent 80%)",
        }}
      />

      <div className="max-w-[1280px] mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="max-w-[760px] mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/15 text-[12px] font-medium tracking-wide mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Confidential Scoping & NDA Included</span>
          </div>

          {/* Heading */}
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-normal tracking-[-0.03em] leading-[1.15] mb-5 text-white">
            {title}
          </h2>

          {/* Description */}
          <p className="text-[16px] sm:text-[18px] text-white/75 leading-relaxed mb-8 max-w-[640px]">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={primaryButtonHref}
              className="inline-flex items-center justify-center gap-2 h-[48px] px-8 rounded-full bg-white text-black text-[15px] font-medium hover:bg-white/90 transition-all shadow-[0_2px_12px_rgba(255,255,255,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{primaryButtonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {secondaryButtonHref && (
              <Link
                href={secondaryButtonHref}
                className="inline-flex items-center justify-center h-[48px] px-7 rounded-full bg-white/5 border border-white/20 text-white text-[15px] font-medium hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
