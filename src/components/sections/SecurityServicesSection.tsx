"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { homeSecurityServices } from "@/content/siteContent";

export default function SecurityServicesSection() {
  const card1 = homeSecurityServices.cards[0];
  const card2 = homeSecurityServices.cards[1];
  const card3 = homeSecurityServices.cards[2];

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

        {/* 70px below: 3 Cards in a row (405px x 480px, 32px gap, sharp corners) */}
        <div className="mt-[70px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {/* ================= CARD 1: Vulnerability Assessment ================= */}
          <Link href={card1.href} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0 }}
              className="flex flex-col cursor-pointer"
            >
              {/* 405x480px Gradient Box with Sharp Corners */}
              <div
                className="w-full h-[480px] rounded-none p-[64px_64px] flex items-center justify-center transition-all duration-600 ease-out"
                style={{
                  background: card1.gradient,
                  backgroundSize: "130% 130%",
                  backgroundPosition: "0% 0%",
                }}
              >
                {/* White Panel (277px x 304px, sharp corners, lifts 6px on hover) */}
                <div className="w-[277px] h-[304px] bg-white rounded-none p-[16px_14px] shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-[6px] flex flex-col justify-between text-[13px] leading-tight text-[#0a0a0a]">
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

                  {/* Step 2: Scan + chip "Complete" */}
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

                  {/* Step 3: Triage + chip "Ranked" */}
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

                  {/* Elbow arrow -> Validated chip */}
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

                  {/* Human review label */}
                  <div className="text-[10px] text-[#64748b] pl-16 -my-0.5">
                    {card1.panel.step4.label}
                  </div>

                  {/* Step 5: Reported + chip "Delivered" */}
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
              <div className="mt-[28px] flex flex-col">
                <h3 className="text-[30px] font-normal text-[#0a0a0a] flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                  <span>{card1.title}</span>
                  <span className="text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    →
                  </span>
                </h3>
                <p className="mt-[8px] text-[16px] font-normal text-[#4a4f5a]">
                  {card1.caption}
                </p>
              </div>
            </motion.div>
          </Link>

          {/* ================= CARD 2: Penetration Testing ================= */}
          <Link href={card2.href} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="flex flex-col cursor-pointer"
            >
              {/* 405x480px Gradient Box with Sharp Corners */}
              <div
                className="w-full h-[480px] rounded-none p-[64px_64px] flex items-center justify-center transition-all duration-600 ease-out"
                style={{
                  background: card2.gradient,
                  backgroundSize: "130% 130%",
                  backgroundPosition: "0% 0%",
                }}
              >
                {/* White Panel (277px x 304px, lifts 6px on hover) */}
                <div className="w-[277px] h-[304px] bg-white rounded-none p-[22px_20px] shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-[6px] flex flex-col text-[#0a0a0a]">
                  <h4 className="text-[22px] font-normal text-[#0a0a0a] leading-tight">
                    {card2.panel.title}
                  </h4>
                  <div className="text-[14px] text-[#4a4f5a] mt-1 font-medium">
                    {card2.panel.score}
                  </div>

                  {/* Progress bar (220px wide, 4px tall, 81%) */}
                  <div className="w-full max-w-[220px] h-[4px] bg-[#e2e4e8] rounded-none mt-3 overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: card2.panel.progress }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                      className="h-full bg-[#e11d48]"
                    />
                  </div>

                  {/* Icon Rows */}
                  <div className="mt-7 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-[22px] h-[22px] bg-[#fee2e2] text-[#e11d48] flex items-center justify-center rounded-[2px] flex-shrink-0">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                          <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" />
                          <circle cx="12" cy="16" r="1" fill="currentColor" />
                        </svg>
                      </div>
                      <span className="text-[13px] font-normal text-[#0a0a0a]">
                        {card2.panel.row1}
                      </span>
                    </div>

                    <div className="pl-2">
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

                    <div className="flex items-center gap-3">
                      <div className="w-[22px] h-[22px] bg-[#dbeafe] text-[#2563eb] flex items-center justify-center rounded-[2px] flex-shrink-0">
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <span className="text-[13px] font-normal text-[#0a0a0a]">
                        {card2.panel.row2}
                      </span>
                    </div>

                    <div className="pl-2">
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

                    <div className="flex items-center gap-3">
                      <div className="w-[22px] h-[22px] bg-[#dcfce7] text-[#16a34a] flex items-center justify-center rounded-[2px] flex-shrink-0">
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-[13px] font-medium text-[#0a0a0a]">
                        {card2.panel.row3}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="mt-[28px] flex flex-col">
                <h3 className="text-[30px] font-normal text-[#0a0a0a] flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                  <span>{card2.title}</span>
                  <span className="text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    →
                  </span>
                </h3>
                <p className="mt-[8px] text-[16px] font-normal text-[#4a4f5a]">
                  {card2.caption}
                </p>
              </div>
            </motion.div>
          </Link>

          {/* ================= CARD 3: Application & API Security ================= */}
          <Link href={card3.href} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="flex flex-col cursor-pointer"
            >
              {/* 405x480px Gradient Box with Sharp Corners */}
              <div
                className="w-full h-[480px] rounded-none p-[64px_64px] flex items-center justify-center transition-all duration-600 ease-out"
                style={{
                  background: card3.gradient,
                  backgroundSize: "130% 130%",
                  backgroundPosition: "0% 0%",
                }}
              >
                {/* White Panel (277px x 304px, lifts 6px on hover) */}
                <div className="w-[277px] h-[304px] bg-white rounded-none p-[22px_20px] shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-[6px] flex flex-col text-[#0a0a0a]">
                  <h4 className="text-[22px] font-normal text-[#0a0a0a] leading-tight mb-5">
                    {card3.panel.title}
                  </h4>

                  {/* 5 rows with 20px green (#3aa14a) icon tiles */}
                  <div className="space-y-[18px]">
                    {card3.panel.tests.map((testLabel, idx) => (
                      <motion.div
                        key={testLabel}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-[20px] h-[20px] bg-[#dcfce7] text-[#3aa14a] flex items-center justify-center rounded-[2px] flex-shrink-0">
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-[14px] font-normal text-[#0a0a0a]">
                          {testLabel}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="mt-[28px] flex flex-col">
                <h3 className="text-[30px] font-normal text-[#0a0a0a] flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                  <span>{card3.title}</span>
                  <span className="text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    →
                  </span>
                </h3>
                <p className="mt-[8px] text-[16px] font-normal text-[#4a4f5a]">
                  {card3.caption}
                </p>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
