"use client";

import React from "react";
import { motion } from "framer-motion";
import ServiceIcon from "./ServiceIcon";
import { ServiceItem } from "@/data/services";

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col justify-between bg-white border border-[#e2e4e8] p-6 lg:p-7 rounded-none transition-shadow duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-black"
    >
      <div>
        {/* Icon square badge: matching Securio 32x32 / 36x36 dark tile styling */}
        <div className="w-[38px] h-[38px] bg-[#0a0a0a] rounded-none flex items-center justify-center text-white mb-5 group-hover:bg-[#1a2b49] transition-colors">
          <ServiceIcon name={service.icon} className="w-[18px] h-[18px] text-white" />
        </div>

        {/* Service Title */}
        <h3 className="text-[18px] sm:text-[19px] font-medium text-[#0a0a0a] tracking-tight leading-snug mb-3 group-hover:text-black">
          {service.title}
        </h3>

        {/* 1-2 Line Description */}
        <p className="text-[14px] sm:text-[14.5px] text-[#4a4f5a] leading-relaxed">
          {service.shortDescription}
        </p>
      </div>

      {/* Subtle indicator line */}
      <div className="mt-5 pt-4 border-t border-[#f0f1f3] flex items-center justify-between text-[12px] font-medium text-[#6b7078]">
        <span className="uppercase tracking-wider">Modular Offering</span>
        <span className="text-[#0a0a0a] opacity-0 group-hover:opacity-100 transition-opacity">
          Ready to deploy →
        </span>
      </div>
    </motion.div>
  );
}
