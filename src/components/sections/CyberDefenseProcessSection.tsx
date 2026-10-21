"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProcessItem {
  id: number;
  number: string;
  title: string;
  description: string;
}

const processSteps: ProcessItem[] = [
  {
    id: 1,
    number: "1",
    title: "Discovery",
    description:
      "We assess your systems, workflows, risks, and business goals to find weak points, define priorities, and create a clear security baseline before any work begins.",
  },
  {
    id: 2,
    number: "2",
    title: "Design & Architecture",
    description:
      "We design a layered defense architecture with the right controls, tools, and policies for your environment.",
  },
  {
    id: 3,
    number: "3",
    title: "Implementation",
    description:
      "We deploy and tune the controls, monitor results, and hand over clear playbooks so your team stays in control.",
  },
];

export default function CyberDefenseProcessSection() {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section className="w-full bg-[#f0f1f3] mt-[140px] pb-[160px] select-none text-[#0a0a0a]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        {/* Two Columns: Left 608px, Right 608px, Gap 64px, Both 720px tall */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-stretch">
          {/* ================= LEFT COLUMN (608px x 720px) ================= */}
          <div className="w-full lg:w-[608px] h-auto lg:h-[720px] flex flex-col justify-between">
            {/* Top Heading: 48px, line-height 1.22, letter-spacing -1px */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-[36px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a]">
                Cyber defense process
                <br />
                designed for real threats
              </h2>
            </motion.div>

            {/* Bottom Accordion of 3 Items */}
            <div className="mt-12 lg:mt-0 flex flex-col border-t border-[#cfd1d5]">
              {processSteps.map((step) => {
                const isOpen = activeStep === step.id;

                return (
                  <div
                    key={step.id}
                    className="border-b border-[#cfd1d5] flex flex-col"
                  >
                    <button
                      onClick={() => setActiveStep(step.id)}
                      aria-expanded={isOpen}
                      aria-controls={`step-content-${step.id}`}
                      className="w-full text-left py-6 flex items-center justify-between group focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 cursor-pointer"
                    >
                      {/* Title: 26px, weight 400, shifts 6px right on hover */}
                      <span className="text-[26px] font-normal text-[#0a0a0a] transition-all duration-200 group-hover:translate-x-1.5">
                        {step.title}
                      </span>

                      {/* Number: 26px, turns blue (#2b50ae) on hover */}
                      <span
                        className={`text-[26px] font-normal transition-colors duration-200 ${
                          isOpen
                            ? "text-[#2b50ae]"
                            : "text-[#0a0a0a] group-hover:text-[#2b50ae]"
                        }`}
                      >
                        {step.number}
                      </span>
                    </button>

                    {/* Expandable Description */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`step-content-${step.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-10 pt-1 text-[18px] font-normal leading-[1.5] text-[#4a4f5a] max-w-[530px]">
                            {step.description}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT COLUMN (608px x 720px) ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-[608px] h-[520px] sm:h-[620px] lg:h-[720px] rounded-none p-[20px] sm:p-[40px] flex items-center justify-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #8fd0ff 0%, #4a7cf0 38%, #2646c2 72%, #02041a 100%)",
            }}
          >
            {/* Ambient Background Gradient Shift Loop */}
            <motion.div
              animate={{
                opacity: [0.65, 0.9, 0.65],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 75% 25%, rgba(143, 208, 255, 0.45) 0%, transparent 60%)",
              }}
            />

            {/* Centered White Dashboard Panel: 480px x 309px, sharp corners */}
            <div className="w-full max-w-[480px] h-[309px] bg-white rounded-none shadow-[0_24px_60px_rgba(2,4,26,0.35)] flex overflow-hidden relative z-10 text-[6px] text-slate-700 leading-tight">
              {/* Left narrow icon sidebar with 4-dot logo and avatar */}
              <div className="w-[28px] h-full bg-[#f8fafc] border-r border-slate-200/80 flex flex-col justify-between items-center py-2.5 flex-shrink-0">
                <div className="flex flex-col items-center gap-3">
                  {/* 4-dot logo at top */}
                  <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                    <span className="w-1 h-1 rounded-[0.5px] bg-blue-600" />
                    <span className="w-1 h-1 rounded-[0.5px] bg-blue-600" />
                    <span className="w-1 h-1 rounded-[0.5px] bg-blue-600" />
                    <span className="w-1 h-1 rounded-[0.5px] bg-blue-600" />
                  </div>
                  {/* Icons */}
                  <div className="flex flex-col gap-2.5 text-slate-400">
                    <div className="w-2.5 h-2.5 bg-blue-100 rounded-[1px] flex items-center justify-center text-blue-600">
                      <span className="block w-1 h-1 bg-blue-600" />
                    </div>
                    <div className="w-2.5 h-2.5 flex items-center justify-center">
                      <span className="block w-1 h-1 bg-slate-300 rounded-[0.5px]" />
                    </div>
                    <div className="w-2.5 h-2.5 flex items-center justify-center">
                      <span className="block w-1 h-1 bg-slate-300 rounded-[0.5px]" />
                    </div>
                  </div>
                </div>

                {/* Avatar at bottom */}
                <div className="w-3 h-3 rounded-full bg-slate-300 overflow-hidden ring-1 ring-slate-200">
                  <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-400" />
                </div>
              </div>

              {/* Main Content Area (Crossfades 300ms depending on active accordion step) */}
              <div className="flex-1 flex flex-col p-2.5 overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      {/* Top Bar: "Dashboard" + Search + Export report & Saved filters */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-semibold text-slate-900">
                            Dashboard
                          </span>
                          <div className="w-24 h-3.5 bg-slate-50 border border-slate-200 rounded-[2px] flex items-center px-1 text-slate-400 text-[5px]">
                            Search assets...
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[5px] text-slate-500 font-medium">
                          <span>Export report</span>
                          <span>Saved filters</span>
                        </div>
                      </div>

                      {/* Stats Row (Assets 1842, Safe Zone, Newest Alerts) */}
                      <div className="grid grid-cols-3 gap-1.5 my-1.5">
                        {/* Box 1: Assets */}
                        <div className="p-1.5 bg-[#f8fafc] border border-slate-200/60 rounded-[2px] flex flex-col justify-between">
                          <div className="flex justify-between items-center text-slate-500 font-medium">
                            <span>Assets</span>
                            <span className="font-bold text-slate-800">1842</span>
                          </div>
                          <div className="flex items-center justify-between mt-1 text-[5px]">
                            <span className="text-emerald-600">● 1801 safe</span>
                            <span className="text-amber-500">● 41 at risk</span>
                          </div>
                          <div className="w-full h-1 bg-slate-200 rounded-[1px] mt-1 overflow-hidden flex">
                            <div className="w-[96%] bg-emerald-500 h-full" />
                            <div className="w-[4%] bg-amber-500 h-full" />
                          </div>
                        </div>

                        {/* Box 2: Safe zone */}
                        <div className="p-1.5 bg-[#f8fafc] border border-slate-200/60 rounded-[2px] flex flex-col justify-between">
                          <div className="flex justify-between items-center text-slate-500 font-medium">
                            <span>Safe zone</span>
                            <span className="font-bold text-slate-800">98.2%</span>
                          </div>
                          {/* Mini area chart wave */}
                          <div className="h-3 w-full mt-1">
                            <svg
                              className="w-full h-full text-blue-500 stroke-current fill-blue-50"
                              viewBox="0 0 100 24"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M0 18 Q 20 6, 40 14 T 80 8 T 100 12 L 100 24 L 0 24 Z"
                                strokeWidth="1.5"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Box 3: Newest Alerts */}
                        <div className="p-1.5 bg-[#f8fafc] border border-slate-200/60 rounded-[2px] flex flex-col justify-between">
                          <span className="text-slate-500 font-medium">
                            Newest Alerts
                          </span>
                          <div className="space-y-0.5 mt-0.5">
                            <div className="border-l border-red-500 pl-1 text-[5px] text-slate-700 truncate">
                              High: Ingress anomaly
                            </div>
                            <div className="border-l border-red-500 pl-1 text-[5px] text-slate-700 truncate">
                              Med: IAM role drift
                            </div>
                            <div className="border-l border-amber-500 pl-1 text-[5px] text-slate-700 truncate">
                              Low: Certificate expires 14d
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Lower Area: Risks Overview + Top 5 data at risk (4 cards) */}
                      <div className="flex-1 flex flex-col justify-between pt-1 border-t border-slate-100">
                        <div className="flex items-center justify-between text-[5px] text-slate-500 font-medium">
                          <div className="flex gap-2">
                            <span className="text-blue-600 font-bold border-b border-blue-600 pb-0.5">
                              Data at risk
                            </span>
                            <span>Malware</span>
                            <span>Memory Issues</span>
                            <span>Network Issues</span>
                            <span>Reports</span>
                          </div>
                          <span className="text-slate-400">Top 5 data at risk</span>
                        </div>

                        {/* 4 Cards */}
                        <div className="grid grid-cols-4 gap-1.5 mt-1.5">
                          {[
                            { name: "cv-bucket", tag1: "AWS S3", tag2: "Public" },
                            { name: "customer-files-westeurope", tag1: "Azure", tag2: "Unencrypted" },
                            { name: "s3-audit-sync-node", tag1: "GCP", tag2: "Role Drift" },
                            { name: "db-replica-main", tag1: "RDS", tag2: "Exposed" },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className="p-1.5 bg-[#f8fafc] border border-slate-200/80 rounded-[2px] flex flex-col justify-between"
                            >
                              <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                                <span className="font-bold text-slate-800 text-[5px] truncate">
                                  {item.name}
                                </span>
                              </div>
                              <div className="flex gap-1 mt-1">
                                <span className="px-1 py-0.5 bg-blue-50 text-blue-600 rounded-[1px] text-[4px] font-semibold">
                                  {item.tag1}
                                </span>
                                <span className="px-1 py-0.5 bg-red-50 text-red-600 rounded-[1px] text-[4px] font-semibold">
                                  {item.tag2}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      {/* Architecture View Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="text-[9px] font-semibold text-slate-900">
                          Design & Architecture
                        </span>
                        <span className="text-emerald-600 font-semibold text-[5px]">
                          ● Baseline Verified
                        </span>
                      </div>

                      {/* Architecture topology diagram */}
                      <div className="flex-1 my-2 bg-slate-50 border border-slate-200/60 rounded-[2px] p-2 flex flex-col justify-between">
                        <div className="flex justify-between items-center text-[5px] text-slate-500">
                          <div className="border border-blue-400 bg-white p-1 rounded-[2px] shadow-sm font-bold text-slate-800">
                            Client Ingress Gateway
                          </div>
                          <span className="text-blue-500">── TLS 1.3 ──►</span>
                          <div className="border border-emerald-400 bg-white p-1 rounded-[2px] shadow-sm font-bold text-slate-800">
                            Securio Zero-Trust WAF
                          </div>
                          <span className="text-blue-500">── IPS Filter ──►</span>
                          <div className="border border-indigo-400 bg-white p-1 rounded-[2px] shadow-sm font-bold text-slate-800">
                            Secure Core VPC
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div className="bg-white border border-slate-200 p-1.5 rounded-[2px]">
                            <span className="font-bold text-slate-800 text-[5px]">
                              Identity Isolation
                            </span>
                            <p className="text-slate-400 mt-0.5 text-[4px]">
                              mTLS + FIDO2 Hardware Enforcement
                            </p>
                          </div>
                          <div className="bg-white border border-slate-200 p-1.5 rounded-[2px]">
                            <span className="font-bold text-slate-800 text-[5px]">
                              Micro-Segmentation
                            </span>
                            <p className="text-slate-400 mt-0.5 text-[4px]">
                              K8s Calico policies with zero cross-talk
                            </p>
                          </div>
                          <div className="bg-white border border-slate-200 p-1.5 rounded-[2px]">
                            <span className="font-bold text-slate-800 text-[5px]">
                              Telemetry Tap
                            </span>
                            <p className="text-slate-400 mt-0.5 text-[4px]">
                              Real-time eBPF kernel event streamer
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      {/* Implementation View Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="text-[9px] font-semibold text-slate-900">
                          Implementation & Playbook Status
                        </span>
                        <span className="text-blue-600 font-semibold text-[5px]">
                          100% Automated Deployment
                        </span>
                      </div>

                      {/* Checklist and Deployment Progress */}
                      <div className="flex-1 my-2 bg-slate-50 border border-slate-200/60 rounded-[2px] p-2 flex flex-col justify-around">
                        {[
                          { title: "Host EDR Agent Auto-Provisioning", pct: "100%", status: "Live" },
                          { title: "Cloud Perimeter Firewall Hardening", pct: "100%", status: "Synchronized" },
                          { title: "Incident Response Playbook Handover", pct: "100%", status: "Active" },
                          { title: "SOC Telemetry 24/7 Continuous Hunting", pct: "100%", status: "Operational" },
                        ].map((row, idx) => (
                          <div
                            key={idx}
                            className="bg-white border border-slate-200/80 p-1.5 rounded-[2px] flex items-center justify-between"
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span className="font-semibold text-slate-800 text-[5px]">
                                {row.title}
                              </span>
                            </div>
                            <span className="bg-emerald-50 text-emerald-700 px-1 py-0.5 font-bold rounded-[1px] text-[4px]">
                              {row.status} ({row.pct})
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
