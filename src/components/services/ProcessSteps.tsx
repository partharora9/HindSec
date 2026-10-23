"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProcessStep } from "@/data/services";

interface ProcessStepsProps {
  heading: string;
  steps: ProcessStep[];
}

export default function ProcessSteps({ heading, steps }: ProcessStepsProps) {
  return (
    <section className="w-full py-[80px] lg:py-[100px] px-6 lg:px-0 bg-[#f0f1f3] border-b border-[#e2e4e8]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="max-w-[720px] mb-12">
          <div className="text-[12px] uppercase tracking-[0.05em] text-[#4a4f5a] font-semibold mb-2">
            Engagement Methodology
          </div>
          <h2 className="text-[30px] sm:text-[38px] font-normal tracking-[-0.02em] text-[#0a0a0a] leading-[1.2]">
            {heading}
          </h2>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="relative bg-white border border-[#e2e4e8] p-6 rounded-none flex flex-col justify-between shadow-xs hover:border-[#a0a5ad] transition-colors"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="w-8 h-8 rounded-none bg-[#0a0a0a] text-white flex items-center justify-center text-[14px] font-bold">
                    0{step.number}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#6b7078] font-semibold">
                    Step {step.number}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-[17px] font-medium text-[#0a0a0a] tracking-tight leading-snug mb-3">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[13.5px] text-[#4a4f5a] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step indicator footer */}
              <div className="mt-6 pt-3 border-t border-[#f0f1f3] text-[11px] text-[#8a909b]">
                Verified Deliverable
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
