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
    </main>
  );
}
