"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { careersData } from "@/data/careersData";
import RoleRow from "./RoleRow";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export default function OpenRoles() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();

  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      id="open-roles"
      data-navbar-bg="white"
      className="relative w-full bg-[#ffffff] text-[#0a0a0a] pt-[100px] pb-[120px] select-none"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        {/* Section Label: "WE'RE HIRING" (straight apostrophe) at y=770 */}
        <motion.div
          initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 14 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 14 }
          }
          transition={{ duration: prefersReduced ? 0.1 : 0.6, ease: "easeOut" }}
          className="text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a] leading-none"
        >
          WE&#39;RE HIRING
        </motion.div>

        {/* 40px below label: Heading "Open roles" (48px, one line, center at y=836) */}
        <h2 className="mt-[40px] text-[34px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a]">
          <div className="overflow-hidden py-0.5">
            <motion.div
              initial={{
                y: prefersReduced ? 0 : "105%",
                filter: prefersReduced ? "blur(0px)" : "blur(8px)",
                opacity: prefersReduced ? 1 : 0,
              }}
              animate={
                isInView
                  ? {
                      y: 0,
                      filter: "blur(0px)",
                      opacity: 1,
                    }
                  : {
                      y: prefersReduced ? 0 : "105%",
                      filter: prefersReduced ? "blur(0px)" : "blur(8px)",
                      opacity: prefersReduced ? 1 : 0,
                    }
              }
              transition={{
                duration: prefersReduced ? 0.1 : 0.8,
                delay: prefersReduced ? 0 : 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Open roles
            </motion.div>
          </div>
        </h2>

        {/* 100px below heading: List of roles */}
        <div className="mt-[100px] w-full flex flex-col" role="list" aria-label="Open positions">
          {careersData.map((role, idx) => (
            <div key={role.id} role="listitem">
              <RoleRow
                role={role}
                index={idx}
                totalRoles={careersData.length}
                hoveredRowId={hoveredRowId}
                setHoveredRowId={setHoveredRowId}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
