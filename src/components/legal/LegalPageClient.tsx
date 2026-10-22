"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";

interface LegalSection {
  title: string;
  content: string;
}

interface LegalPageClientProps {
  heading: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export default function LegalPageClient({
  heading,
  lastUpdated,
  intro,
  sections,
}: LegalPageClientProps) {
  return (
    <main className="w-full bg-[#f0f1f3] text-[#0a0a0a] min-h-screen overflow-x-hidden select-none font-sans">
      <SmoothScroll />
      <ScrollProgressBar />

      <Navbar theme="light" />

      <section className="pt-[160px] pb-[120px] px-6">
        <div className="max-w-[860px] mx-auto bg-white p-8 sm:p-14 shadow-sm border border-[#e5e7eb]">
          <div className="text-[14px] uppercase tracking-wider text-[#4a4f5a] font-medium mb-3">
            Legal & Compliance
          </div>
          <h1 className="text-[36px] sm:text-[44px] font-normal tracking-tight text-[#0a0a0a] leading-tight">
            {heading}
          </h1>
          <p className="text-[14px] text-[#8a8e96] mt-2 mb-8">
            Last updated: {lastUpdated}
          </p>

          <p className="text-[17px] leading-[28px] text-[#4a4f5a] pb-8 border-b border-[#e5e7eb]">
            {intro}
          </p>

          <div className="mt-8 space-y-8">
            {sections.map((section, idx) => (
              <div key={idx} className="flex flex-col">
                <h2 className="text-[22px] font-normal text-[#0a0a0a] tracking-tight mb-3">
                  {section.title}
                </h2>
                <p className="text-[16px] leading-[26px] text-[#4a4f5a]">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
