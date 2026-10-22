"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CareersHero from "@/components/careers/CareersHero";
import OpenRoles from "@/components/careers/OpenRoles";

export default function CareersPageClient() {
  return (
    <main className="w-full bg-[#f0f1f3] text-[#0a0a0a] min-h-screen overflow-x-hidden select-none font-sans">
      {/* Smooth Scroll & Top Scroll Progress Bar */}
      <SmoothScroll />
      <ScrollProgressBar />

      {/* Fixed Navbar with Light Variant (Black dots, black text, black pill button, soft blurred backdrop on scroll) */}
      <Navbar theme="light" />

      {/* ================= SECTION 1: HERO (Image 1, background #f0f1f3, ends at y=659) ================= */}
      <CareersHero />

      {/* ================= SECTION 2: OPEN ROLES (Images 1 and 2, full-width white #ffffff) ================= */}
      <OpenRoles />

      {/* ================= SECTION 3: FOOTER (Reused unchanged) ================= */}
      <Footer />
    </main>
  );
}
