"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SecurityServicesSection() {
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
          SECURITY SERVICES
        </motion.div>

        {/* 40px below: Heading (48px, line-height 1.22, letter-spacing -1px) */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-[40px] text-[36px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a]"
        >
          Every action visible.
          <br />
          Every decision defensible.
        </motion.h2>

        {/* 70px below: 3 Cards in a row (405px x 480px, 32px gap, sharp corners) */}
        <div className="mt-[70px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {/* ================= CARD 1: Proactive Security ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0 }}
            className="flex flex-col group cursor-pointer"
          >
            {/* 405x480px Gradient Box with Sharp Corners */}
            <div
              className="w-full h-[480px] rounded-none p-[64px_64px] flex items-center justify-center transition-all duration-600 ease-out"
              style={{
                background:
                  "linear-gradient(135deg, #d9f1ff 0%, #8ccbff 35%, #4a7cf0 70%, #2c4fc4 100%)",
                backgroundSize: "130% 130%",
                backgroundPosition: "0% 0%",
              }}
            >
              {/* White Panel (277px x 304px, sharp corners, lifts 6px on hover) */}
              <div className="w-[277px] h-[304px] bg-white rounded-none p-[16px_14px] shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-[6px] flex flex-col justify-between text-[13px] leading-tight text-[#0a0a0a]">
                {/* Step 1: High-risk event detected */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-[3px] bg-[#f97316] flex items-center justify-center text-white flex-shrink-0">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                    </svg>
                  </div>
                  <span className="bg-[#f4f5f7] text-[#0a0a0a] px-2 py-0.5 text-[11px] font-medium rounded-[2px] truncate">
                    High-risk event detected
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

                {/* Step 2: Investigation -> Complete */}
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
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <span className="font-normal text-[12px]">Investigation</span>
                  </div>
                  <span className="text-[#2563eb] text-[11px] font-medium">
                    Complete
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

                {/* Step 3: Containment -> Staged */}
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
                        <circle cx="12" cy="12" r="10" />
                        <line x1="22" y1="12" x2="18" y2="12" />
                        <line x1="6" y1="12" x2="2" y2="12" />
                        <line x1="12" y1="6" x2="12" y2="2" />
                        <line x1="12" y1="22" x2="12" y2="18" />
                      </svg>
                    </div>
                    <span className="font-normal text-[12px]">Containment</span>
                  </div>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-[10px] px-1.5 py-0.5 rounded-[2px] font-medium">
                    Staged
                  </span>
                </div>

                {/* Elbow arrow -> Approved */}
                <div className="pl-8 flex items-center gap-2 -my-0.5">
                  <div className="w-5 h-5 rounded-[3px] bg-[#22c55e] flex items-center justify-center text-white flex-shrink-0">
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <span className="border border-[#22c55e] text-[#16a34a] text-[10px] px-1.5 py-0.5 rounded-[2px] font-medium">
                    Approved
                  </span>
                </div>

                {/* Human-in-the-loop label */}
                <div className="text-[10px] text-[#64748b] pl-16 -my-0.5">
                  Human-in-the-loop
                </div>

                {/* Step 5: Logged -> Resolved */}
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
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <span className="font-normal text-[12px]">Logged</span>
                  </div>
                  <span className="bg-[#dcfce7] text-[#15803d] text-[10px] px-2 py-0.5 rounded-[2px] font-semibold">
                    Resolved
                  </span>
                </div>
              </div>
            </div>

            {/* Title & Caption */}
            <div className="mt-[28px] flex flex-col">
              <h3 className="text-[30px] font-normal text-[#0a0a0a] flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                <span>Proactive Security</span>
                <span className="text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                  →
                </span>
              </h3>
              <p className="mt-[8px] text-[16px] font-normal text-[#4a4f5a]">
                Threats handled before the team wakes up.
              </p>
            </div>
          </motion.div>

          {/* ================= CARD 2: Penetration Testing ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="flex flex-col group cursor-pointer"
          >
            {/* 405x480px Gradient Box with Sharp Corners */}
            <div
              className="w-full h-[480px] rounded-none p-[64px_64px] flex items-center justify-center transition-all duration-600 ease-out"
              style={{
                background:
                  "linear-gradient(135deg, #5aa0f8 0%, #2f5be0 40%, #0b1a66 75%, #040a2c 100%)",
                backgroundSize: "130% 130%",
                backgroundPosition: "0% 0%",
              }}
            >
              {/* White Panel (277px x 304px, lifts 6px on hover) */}
              <div className="w-[277px] h-[304px] bg-white rounded-none p-[22px_20px] shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-[6px] flex flex-col text-[#0a0a0a]">
                <h4 className="text-[22px] font-normal text-[#0a0a0a] leading-tight">
                  Security Audit
                </h4>
                <div className="text-[14px] text-[#4a4f5a] mt-1">
                  Score: 80/100
                </div>

                {/* Progress bar (220px wide, 4px tall, green 73%) */}
                <div className="w-full max-w-[220px] h-[4px] bg-[#e2e4e8] rounded-none mt-3 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "73%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                    className="h-full bg-[#3aa14a]"
                  />
                </div>

                {/* Icon Rows */}
                <div className="mt-7 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-[22px] h-[22px] bg-[#ffedd5] text-[#ea580c] flex items-center justify-center rounded-[2px] flex-shrink-0">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                      </svg>
                    </div>
                    <span className="text-[13px] font-normal text-[#0a0a0a]">
                      Context applied
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
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>
                    <span className="text-[13px] font-normal text-[#0a0a0a]">
                      Action staged
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
                      Issue resolved
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Caption */}
            <div className="mt-[28px] flex flex-col">
              <h3 className="text-[30px] font-normal text-[#0a0a0a] flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                <span>Penetration Testing</span>
                <span className="text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                  →
                </span>
              </h3>
              <p className="mt-[8px] text-[16px] font-normal text-[#4a4f5a]">
                Know what&apos;s coming before it arrives.
              </p>
            </div>
          </motion.div>

          {/* ================= CARD 3: Endpoint Security ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="flex flex-col group cursor-pointer"
          >
            {/* 405x480px Gradient Box with Sharp Corners */}
            <div
              className="w-full h-[480px] rounded-none p-[64px_64px] flex items-center justify-center transition-all duration-600 ease-out"
              style={{
                background:
                  "linear-gradient(135deg, #2a4fc0 0%, #152c80 30%, #02030f 75%, #000108 100%)",
                backgroundSize: "130% 130%",
                backgroundPosition: "0% 0%",
              }}
            >
              {/* White Panel (277px x 304px, lifts 6px on hover) */}
              <div className="w-[277px] h-[304px] bg-white rounded-none p-[22px_20px] shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-[6px] flex flex-col text-[#0a0a0a]">
                <h4 className="text-[22px] font-normal text-[#0a0a0a] leading-tight mb-5">
                  Endpoint Security
                </h4>

                {/* 5 rows with 20px green (#3aa14a) icon tiles (40px row spacing) */}
                <div className="space-y-[18px]">
                  {[
                    { label: "Device protection", icon: "laptop" },
                    { label: "Network control", icon: "network" },
                    { label: "Browse protection", icon: "globe" },
                    { label: "Data control", icon: "database" },
                    { label: "Application control", icon: "grid" },
                  ].map((row, idx) => (
                    <motion.div
                      key={row.label}
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
                        {row.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Title & Caption */}
            <div className="mt-[28px] flex flex-col">
              <h3 className="text-[30px] font-normal text-[#0a0a0a] flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                <span>Endpoint Security</span>
                <span className="text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                  →
                </span>
              </h3>
              <p className="mt-[8px] text-[16px] font-normal text-[#4a4f5a]">
                Every device protected. Every edge secured.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
