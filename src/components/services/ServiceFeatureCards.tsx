"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { ServiceCardItem } from "@/types/service";

interface ServiceFeatureCardsProps {
  cards: [ServiceCardItem, ServiceCardItem, ServiceCardItem];
}

export default function ServiceFeatureCards({ cards }: ServiceFeatureCardsProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f0f1f3] pt-[89px] pb-0 select-none"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] items-stretch">
          {cards.map((card, idx) => {
            const isHovered = hoveredCard === card.id;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 40 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: prefersReduced ? 0 : 40 }
                }
                transition={{
                  duration: prefersReduced ? 0.2 : 0.65,
                  delay: prefersReduced ? 0 : idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={!prefersReduced ? { y: -6 } : {}}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative bg-white w-full lg:w-[405px] min-h-[320px] lg:min-h-[345px] p-[32px] rounded-none flex flex-col justify-start cursor-default overflow-hidden"
              >
                {/* 44px thin-line icon at the top (34px from card top) */}
                <div className="w-[44px] h-[44px] flex items-center justify-start flex-shrink-0">
                  {card.icon(isHovered, isInView, idx * 0.12)}
                </div>

                {/* 36px below icon: Title (30px, weight 400, line-height 37px, #0a0a0a, up to 2 lines) */}
                <h3 className="mt-[36px] text-[26px] sm:text-[30px] font-normal leading-[37px] text-[#0a0a0a] tracking-[-0.01em]">
                  {card.title}
                </h3>

                {/* 14px below title: Description (17px, line-height 27px, #4a4f5a, 3 lines) */}
                <p className="mt-[14px] text-[17px] leading-[27px] text-[#4a4f5a] font-normal line-clamp-3">
                  {card.description}
                </p>

                {/* 2px black line growing along the card's bottom edge on hover */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0a0a0a] origin-left pointer-events-none"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
