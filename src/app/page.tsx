"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroBackground from "@/components/background/HeroBackground";
import LogoMarquee from "@/components/LogoMarquee";
import SecurityServicesSection from "@/components/sections/SecurityServicesSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import CyberDefenseProcessSection from "@/components/sections/CyberDefenseProcessSection";
import TrustedOutcomesSection from "@/components/sections/TrustedOutcomesSection";
import FaqSection from "@/components/sections/FaqSection";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export default function Home() {
  return (
    <main className="w-full bg-[#f0f1f3] text-[#0a0a0a] min-h-screen overflow-x-hidden select-none font-sans">
      {/* Smooth Scroll & Top Scroll Progress Bar */}
      <SmoothScroll />
      <ScrollProgressBar />

      {/* ================= HERO SECTION (Exact 100vh) ================= */}
      <section className="relative h-screen min-h-[945px] w-full overflow-hidden">
        {/* Animated Background (GradientMesh ending in #f0f1f3, RisingDotBoxes, Atmosphere) */}
        <HeroBackground />

        {/* Fixed Navbar (Height 94px with MegaDropdowns) */}
        <Navbar />

        {/* Hero Section Content (Fixed vertical positions) */}
        <div className="relative z-10 pt-[94px]">
          <Hero />
        </div>
      </section>

      {/* ================= SECTION 1: LOGO MARQUEE ROW (110px tall, 7 grey logos) ================= */}
      <LogoMarquee />

      {/* ================= SECTION 2: SECURITY SERVICES (3 Gradient Cards + HTML UIs) ================= */}
      <SecurityServicesSection />

      {/* ================= SECTION 3: TESTIMONIAL (Scroll-linked Text Reveal) ================= */}
      <TestimonialSection />

      {/* ================= SECTION 4: CYBER DEFENSE PROCESS (Accordion + Dashboard) ================= */}
      <CyberDefenseProcessSection />

      {/* ================= SECTION 5: TRUSTED OUTCOMES (Feature Grid) ================= */}
      <TrustedOutcomesSection />

      {/* ================= SECTION 6: FAQ (Questions & Answers + AskCard) ================= */}
      <FaqSection />

      {/* ================= FINAL SECTION: FOOTER ================= */}
      <Footer />

      {/* Fixed "Made in Webflow" Badge at bottom-right */}
      <div className="fixed right-6 bottom-4 z-40 hidden sm:flex items-center pointer-events-auto">
        <a
          href="https://webflow.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#111111] px-2.5 py-1 rounded-sm shadow-md flex items-center gap-1.5 text-[11px] font-semibold tracking-tight border border-slate-200/50 hover:bg-slate-50 transition-colors"
        >
          <svg
            className="w-3.5 h-3.5 text-[#146ef5]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16.94 6.94a4.5 4.5 0 0 0-6.36 0L4 13.52V18h4.48l5.88-5.88a1.5 1.5 0 1 1 2.12 2.12L12 18.72 14.12 20.84l4.48-4.48a4.5 4.5 0 0 0 0-6.36l-1.66-1.66z" />
          </svg>
          <span>Made in Webflow</span>
        </a>
      </div>
    </main>
  );
}
