"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { homeSecurityServices } from "@/content/siteContent";

export default function SecurityServicesSection() {
  const card1 = homeSecurityServices.cards[0];
  const card2 = homeSecurityServices.cards[1];
  const card3 = homeSecurityServices.cards[2];
  const card4 = homeSecurityServices.cards[3];

  return (
    <section className="w-full bg-[#f0f1f3] pt-[80px] pb-[70px] select-none text-[#0a0a0a]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        {/* Label: 15px, uppercase, letter-spacing 0.03em, #0a0a0a, weight 400 */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a]"
        >
          {homeSecurityServices.label}
        </motion.div>

        {/* 40px below: Heading (48px, line-height 1.22, letter-spacing -1px) */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-[40px] text-[36px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a]"
        >
          {homeSecurityServices.headingLine1}
          <br />
          {homeSecurityServices.headingLine2}
        </motion.h2>

        {/* 70px below: 4 Cards in responsive grid */}
        <div className="mt-[70px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[24px]">
          {/* ================= CARD 1: VAPT & Penetration Testing ================= */}
          <Link href={card1.href} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0 }}
              className="flex flex-col cursor-pointer h-full"
            >
              {/* Gradient Box */}
              <div
                className="w-full h-[440px] rounded-none p-[32px_20px] flex items-center justify-center transition-all duration-600 ease-out"
                style={{
                  background: card1.gradient,
                  backgroundSize: "130% 130%",
                  backgroundPosition: "0% 0%",
                }}
              >
                {/* White Panel */}
                <div className="w-[260px] h-[300px] bg-white rounded-none p-[16px_14px] shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-[6px] flex flex-col justify-between text-[13px] leading-tight text-[#0a0a0a]">
                  {/* Step 1: Asset discovered */}
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-[3px] bg-[#f97316] flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                        <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="2" />
                        <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2" />
                        <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="2" />
                        <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    <span className="bg-[#f4f5f7] text-[#0a0a0a] px-2 py-0.5 text-[11px] font-medium rounded-[2px] truncate">
                      {card1.panel.step1}
                    </span>
                  </div>

                  {/* Down arrow */}
                  <div className="pl-2.5 -my-0.5">
                    <svg
                      className="w-3 h-3 text-[#94a3b8]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Step 2: Scan + chip */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-[3px] bg-[#3b82f6] flex items-center justify-center text-white flex-shrink-0">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="11" cy="11" r="7" />
                          <line x1="16" y1="16" x2="21" y2="21" />
                        </svg>
                      </div>
                      <span className="font-normal text-[12px]">{card1.panel.step2.label}</span>
                    </div>
                    <span className="text-[#2563eb] text-[11px] font-medium">
                      {card1.panel.step2.chip}
                    </span>
                  </div>

                  {/* Down arrow */}
                  <div className="pl-2.5 -my-0.5">
                    <svg
                      className="w-3 h-3 text-[#94a3b8]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Step 3: Triage */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-[3px] bg-[#64748b] flex items-center justify-center text-white flex-shrink-0">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="4" y1="6" x2="20" y2="6" />
                          <line x1="7" y1="12" x2="17" y2="12" />
                          <line x1="10" y1="18" x2="14" y2="18" />
                        </svg>
                      </div>
                      <span className="font-normal text-[12px]">{card1.panel.step3.label}</span>
                    </div>
                    <span className="bg-[#f1f5f9] text-[#64748b] text-[10px] px-1.5 py-0.5 rounded-[2px] font-medium">
                      {card1.panel.step3.chip}
                    </span>
                  </div>

                  {/* Step 4: Validated */}
                  <div className="pl-8 flex items-center gap-2 -my-0.5">
                    <div className="w-5 h-5 rounded-[3px] bg-[#22c55e] flex items-center justify-center text-white flex-shrink-0">
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="border border-[#22c55e] text-[#16a34a] text-[10px] px-1.5 py-0.5 rounded-[2px] font-medium">
                      {card1.panel.step4.chip}
                    </span>
                  </div>

                  <div className="text-[10px] text-[#64748b] pl-16 -my-0.5">
                    {card1.panel.step4.label}
                  </div>

                  {/* Step 5: Reported */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-[3px] bg-[#475569] flex items-center justify-center text-white flex-shrink-0">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <span className="font-normal text-[12px]">{card1.panel.step5.label}</span>
                    </div>
                    <span className="bg-[#dcfce7] text-[#15803d] text-[10px] px-2 py-0.5 rounded-[2px] font-semibold">
                      {card1.panel.step5.chip}
                    </span>
                  </div>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="mt-[20px] flex flex-col flex-1">
                <h3 className="text-[22px] font-normal text-[#0a0a0a] flex items-center gap-1.5 group-hover:text-blue-600 transition-colors">
                  <span>{card1.title}</span>
                  <span className="text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    →
                  </span>
                </h3>
                <p className="mt-[6px] text-[14px] font-normal text-[#4a4f5a] leading-relaxed">
                  {card1.caption}
                </p>
              </div>
            </motion.div>
          </Link>

          {/* ================= CARD 2: AI & LLM Security Assessment ================= */}
          <Link href={card2.href} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col cursor-pointer h-full"
            >
              <div
                className="w-full h-[440px] rounded-none p-[32px_20px] flex items-center justify-center transition-all duration-600 ease-out"
                style={{
                  background: card2.gradient,
                  backgroundSize: "130% 130%",
                  backgroundPosition: "0% 0%",
                }}
              >
                <div className="w-[260px] h-[300px] bg-white rounded-none p-[18px_16px] shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-[6px] flex flex-col text-[#0a0a0a]">
                  <h4 className="text-[18px] font-normal text-[#0a0a0a] leading-tight">
                    {card2.panel.title}
                  </h4>
                  <div className="text-[13px] text-[#4a4f5a] mt-1 font-medium">
                    {card2.panel.score}
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-[4px] bg-[#e2e4e8] rounded-none mt-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: card2.panel.progress }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                      className="h-full bg-[#2563eb]"
                    />
                  </div>

                  {/* Telemetry items */}
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-[20px] h-[20px] bg-[#dbeafe] text-[#2563eb] flex items-center justify-center rounded-[2px] flex-shrink-0">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                      <span className="text-[12px] font-normal text-[#0a0a0a]">
                        {card2.panel.row1}
                      </span>
                    </div>

                    <div className="pl-2">
                      <svg
                        className="w-2.5 h-2.5 text-[#94a3b8]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                      </svg>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-[20px] h-[20px] bg-[#fee2e2] text-[#e11d48] flex items-center justify-center rounded-[2px] flex-shrink-0">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="8" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <circle cx="12" cy="16" r="1" fill="currentColor" />
                        </svg>
                      </div>
                      <span className="text-[12px] font-normal text-[#0a0a0a]">
                        {card2.panel.row2}
                      </span>
                    </div>

                    <div className="pl-2">
                      <svg
                        className="w-2.5 h-2.5 text-[#94a3b8]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                      </svg>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-[20px] h-[20px] bg-[#dcfce7] text-[#16a34a] flex items-center justify-center rounded-[2px] flex-shrink-0">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-[12px] font-medium text-[#0a0a0a]">
                        {card2.panel.row3}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[20px] flex flex-col flex-1">
                <h3 className="text-[22px] font-normal text-[#0a0a0a] flex items-center gap-1.5 group-hover:text-blue-600 transition-colors">
                  <span>{card2.title}</span>
                  <span className="text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    →
                  </span>
                </h3>
                <p className="mt-[6px] text-[14px] font-normal text-[#4a4f5a] leading-relaxed">
                  {card2.caption}
                </p>
              </div>
            </motion.div>
          </Link>

          {/* ================= CARD 3: Cybersecurity Training & Phishing ================= */}
          <Link href={card3.href} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col cursor-pointer h-full"
            >
              <div
                className="w-full h-[440px] rounded-none p-[32px_20px] flex items-center justify-center transition-all duration-600 ease-out"
                style={{
                  background: card3.gradient,
                  backgroundSize: "130% 130%",
                  backgroundPosition: "0% 0%",
                }}
              >
                <div className="w-[260px] h-[300px] bg-white rounded-none p-[18px_16px] shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-[6px] flex flex-col text-[#0a0a0a]">
                  <h4 className="text-[18px] font-normal text-[#0a0a0a] leading-tight mb-3">
                    {card3.panel.title}
                  </h4>

                  <div className="space-y-[13px] flex-1">
                    {card3.panel.tests.map((testLabel, idx) => (
                      <motion.div
                        key={testLabel}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.15 + idx * 0.06 }}
                        className="flex items-center gap-2.5"
                      >
                        <div className="w-[18px] h-[18px] bg-[#dcfce7] text-[#16a34a] flex items-center justify-center rounded-[2px] flex-shrink-0">
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-[12px] font-normal text-[#0a0a0a] leading-tight">
                          {testLabel}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] text-[#64748b]">
                    <span>Automated LMS</span>
                    <span className="font-semibold text-emerald-600">Continuous Drill</span>
                  </div>
                </div>
              </div>

              <div className="mt-[20px] flex flex-col flex-1">
                <h3 className="text-[22px] font-normal text-[#0a0a0a] flex items-center gap-1.5 group-hover:text-blue-600 transition-colors">
                  <span>{card3.title}</span>
                  <span className="text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    →
                  </span>
                </h3>
                <p className="mt-[6px] text-[14px] font-normal text-[#4a4f5a] leading-relaxed">
                  {card3.caption}
                </p>
              </div>
            </motion.div>
          </Link>

          {/* ================= CARD 4: VAPT Compliance Services ================= */}
          <Link href={card4.href} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col cursor-pointer h-full"
            >
              <div
                className="w-full h-[440px] rounded-none p-[32px_20px] flex items-center justify-center transition-all duration-600 ease-out"
                style={{
                  background: card4.gradient,
                  backgroundSize: "130% 130%",
                  backgroundPosition: "0% 0%",
                }}
              >
                <div className="w-[260px] h-[300px] bg-white rounded-none p-[18px_16px] shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-[6px] flex flex-col justify-between text-[#0a0a0a]">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-[18px] font-normal text-[#0a0a0a] leading-tight">
                        {card4.panel.title}
                      </h4>
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-[2px]">
                        Audit-Ready
                      </span>
                    </div>
                    <div className="text-[11px] text-[#64748b] mt-0.5 font-normal">
                      Mandatory regulatory verification
                    </div>
                  </div>

                  <div className="space-y-2 my-auto">
                    {card4.panel.frameworks.map((fw) => (
                      <div
                        key={fw.name}
                        className="flex items-center justify-between p-1.5 rounded-[2px] bg-[#f8fafc] border border-[#e2e8f0]"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-[18px] h-[18px] rounded-[2px] bg-[#0284c7] text-white flex items-center justify-center flex-shrink-0">
                            <svg className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-[11.5px] font-medium text-[#0f172a] leading-none">
                              {fw.name}
                            </div>
                            <div className="text-[9.5px] text-[#64748b] mt-0.5">{fw.tag}</div>
                          </div>
                        </div>
                        <span className="text-[9.5px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-[2px]">
                          {fw.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] text-[#475569]">
                    <span>100% Free Retesting</span>
                    <span className="font-semibold text-blue-600">Zero Findings</span>
                  </div>
                </div>
              </div>

              <div className="mt-[20px] flex flex-col flex-1">
                <h3 className="text-[22px] font-normal text-[#0a0a0a] flex items-center gap-1.5 group-hover:text-blue-600 transition-colors">
                  <span>{card4.title}</span>
                  <span className="text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    →
                  </span>
                </h3>
                <p className="mt-[6px] text-[14px] font-normal text-[#4a4f5a] leading-relaxed">
                  {card4.caption}
                </p>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
