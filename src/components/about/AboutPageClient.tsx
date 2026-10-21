"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import LogoMarquee from "@/components/LogoMarquee";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import AboutHero from "@/components/about/AboutHero";
import ValuesList from "@/components/about/ValuesList";
import PhilosophySection from "@/components/about/PhilosophySection";
import TeamSection from "@/components/about/TeamSection";
import { aboutContent } from "@/data/aboutContent";

export default function AboutPageClient() {
  return (
    <main className="w-full bg-[#f0f1f3] text-[#0a0a0a] min-h-screen overflow-x-hidden select-none font-sans">
      {/* Smooth Scroll & Top Scroll Progress Bar */}
      <SmoothScroll />
      <ScrollProgressBar />

      {/* Fixed Navbar with Light Variant (Black dots, black text, black pill button, soft blurred backdrop on scroll) */}
      <Navbar theme="light" />

      {/* ================= SECTION 1: HERO HEADING + PHOTO (Image 1) ================= */}
      <AboutHero
        label={aboutContent.hero.label}
        heading={aboutContent.hero.heading}
        photo={aboutContent.hero.photo}
      />

      {/* ================= SECTION 2: OUR VALUES (Images 2 and 3) ================= */}
      <ValuesList
        label={aboutContent.values.label}
        heading={aboutContent.values.heading}
        items={aboutContent.values.items}
      />

      {/* ================= SECTION 3: PHILOSOPHY (Image 3) ================= */}
      <PhilosophySection
        label={aboutContent.philosophy.label}
        heading={aboutContent.philosophy.heading}
        paragraphs={aboutContent.philosophy.paragraphs}
      />

      {/* ================= SECTION 4: LOGO MARQUEE (Image 3, bottom - 120px gap, single row) ================= */}
      <div className="mt-[120px]">
        <LogoMarquee />
      </div>

      {/* ================= SECTION 5: MEET THE TEAM (Image 4 - 130px gap below marquee) ================= */}
      <TeamSection
        label={aboutContent.team.label}
        heading={aboutContent.team.heading}
        members={aboutContent.team.members}
      />

      {/* ================= SECTION 6: FOOTER (Reused unchanged) ================= */}
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
