"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import LogoMarquee from "@/components/LogoMarquee";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CertificationsList from "./CertificationsList";

export default function CertificationsPageClient() {
  return (
    <main className="w-full bg-[#f0f1f3] text-[#0a0a0a] min-h-screen overflow-x-hidden select-none font-sans">
      {/* Smooth Scroll & Top Scroll Progress Bar */}
      <SmoothScroll />
      <ScrollProgressBar />

      {/* Fixed Navbar with Light Variant */}
      <Navbar theme="light" />

      {/* ================= CERTIFICATIONS LIST ================= */}
      <CertificationsList />

      {/* ================= STANDARDS MARQUEE ================= */}
      <div className="pb-[120px]">
        <LogoMarquee />
      </div>

      {/* ================= FOOTER ================= */}
      <Footer />
    </main>
  );
}
