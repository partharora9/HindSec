import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { BRAND_NAME } from "@/content/siteContent";

export const metadata = {
  title: `Page Not Found | ${BRAND_NAME}`,
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="w-full bg-[#f0f1f3] text-[#0a0a0a] min-h-screen flex flex-col justify-between select-none font-sans">
      <SmoothScroll />
      <ScrollProgressBar />
      <Navbar theme="light" />

      <div className="max-w-[1280px] mx-auto px-6 pt-[220px] pb-[140px] text-center">
        <span className="text-[14px] uppercase tracking-wider text-[#4a4f5a] font-medium">
          404 Error
        </span>
        <h1 className="text-[48px] font-normal leading-[1.2] text-[#0a0a0a] tracking-tight mt-2">
          Page Not Found
        </h1>
        <p className="mt-4 text-[18px] text-[#4a4f5a] max-w-[500px] mx-auto">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#050505] text-white text-[15px] font-medium hover:bg-[#2b50ae] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#0a0a0a] border border-[#cfd1d5] text-[15px] font-medium hover:bg-[#f0f1f3] transition-colors"
          >
            Contact Team
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
