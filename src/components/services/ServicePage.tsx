"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import LogoMarquee from "@/components/LogoMarquee";
import TestimonialSection from "@/components/sections/TestimonialSection";
import ContactSection from "@/components/proactive-security/ContactSection";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ServiceHeroLayout from "./ServiceHeroLayout";
import ServiceFeatureCards from "./ServiceFeatureCards";
import ServiceWhatIs from "./ServiceWhatIs";
import ServiceDelivery from "./ServiceDelivery";
import ServiceOutcomesGrid from "./ServiceOutcomesGrid";
import { ServicePageData } from "@/types/service";
import { testimonialContent } from "@/content/siteContent";

interface ServicePageProps {
  data: ServicePageData;
}

export default function ServicePage({ data }: ServicePageProps) {
  return (
    <main className="w-full bg-[#f0f1f3] text-[#0a0a0a] min-h-screen overflow-x-hidden select-none font-sans">
      {/* Smooth Scroll & Top Scroll Progress Bar */}
      <SmoothScroll />
      <ScrollProgressBar />

      {/* Fixed Navbar (transparent over Hero) */}
      <Navbar />

      {/* ================= SECTION 1: HERO (Exact 605px tall) ================= */}
      <ServiceHeroLayout
        title={data.hero.title}
        paragraph={data.hero.paragraph}
        background={data.hero.background}
      />

      {/* ================= SECTION 2: LOGO ROW (LogoMarquee) ================= */}
      <LogoMarquee />

      {/* ================= SECTION 3: THREE WHITE CARDS ================= */}
      <ServiceFeatureCards cards={data.cards} />

      {/* ================= SECTION 4: WHAT IS [SERVICE]? ================= */}
      <ServiceWhatIs data={data.whatIs} />

      {/* ================= SECTION 5: HOW DO WE DELIVER [SERVICE]? ================= */}
      <ServiceDelivery data={data.delivery} />

      {/* ================= SECTION 6: TESTIMONIAL ================= */}
      <TestimonialSection
        authorName={data.testimonialAuthor?.name || testimonialContent.authorName}
        authorRole={data.testimonialAuthor?.role || testimonialContent.authorRole}
        authorNameClass={
          data.testimonialAuthor?.className || "text-[22px] font-normal text-[#0a0a0a]"
        }
      />

      {/* ================= SECTION 7: TRUSTED OUTCOMES ================= */}
      <ServiceOutcomesGrid outcomes={data.outcomes} />

      {/* ================= SECTION 8: CONTACT FORM ================= */}
      <ContactSection />

      {/* ================= SECTION 9: FOOTER ================= */}
      <Footer />
    </main>
  );
}
