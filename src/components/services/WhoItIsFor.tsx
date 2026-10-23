"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { WhoItIsForAudience } from "@/data/services";

interface WhoItIsForProps {
  heading: string;
  audiences: WhoItIsForAudience[];
}

export default function WhoItIsFor({ heading, audiences }: WhoItIsForProps) {
  return (
    <section className="w-full py-[80px] lg:py-[100px] px-6 lg:px-0 bg-[#e8eaee] border-b border-[#e2e4e8]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="max-w-[720px] mb-12">
          <div className="text-[12px] uppercase tracking-[0.05em] text-[#4a4f5a] font-semibold mb-2">
            Target Audience
          </div>
          <h2 className="text-[30px] sm:text-[38px] font-normal tracking-[-0.02em] text-[#0a0a0a] leading-[1.2]">
            {heading}
          </h2>
        </div>

        {/* Audience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="bg-white border border-[#e2e4e8] p-7 rounded-none flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-8 h-8 rounded-full bg-[#f0f1f3] flex items-center justify-center text-[#0a0a0a] mb-5">
                  <CheckCircle2 className="w-4 h-4 text-[#0a0a0a]" />
                </div>
                <h3 className="text-[19px] font-medium text-[#0a0a0a] tracking-tight mb-3">
                  {audience.title}
                </h3>
                <p className="text-[14.5px] text-[#4a4f5a] leading-relaxed">
                  {audience.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f0f1f3] text-[12px] text-[#6b7078] font-medium">
                Tailored Engagement Scope
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
