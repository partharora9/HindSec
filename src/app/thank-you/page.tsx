import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export const metadata: Metadata = {
  title: "Thank You | Securio",
  description: "Thank you for reaching out to Securio. Our security team will be in touch shortly.",
};

export default function ThankYouPage() {
  return (
    <main className="w-full bg-[#f0f1f3] text-[#0a0a0a] min-h-screen flex flex-col justify-between select-none font-sans">
      <SmoothScroll />
      <ScrollProgressBar />
      <Navbar theme="light" />

      <div className="max-w-[1280px] mx-auto px-6 pt-[220px] pb-[140px] text-center">
        <h1 className="text-[48px] font-normal leading-[1.2] text-[#0a0a0a] tracking-tight">
          Thank you
        </h1>
        <p className="mt-4 text-[18px] text-[#4a4f5a] max-w-[500px] mx-auto">
          We have received your message and will be in touch shortly.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#050505] text-white text-[15px] font-medium hover:bg-[#2b50ae] transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
