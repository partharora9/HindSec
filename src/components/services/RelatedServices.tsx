"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ServiceIcon from "./ServiceIcon";
import { ServiceCategory } from "@/data/services";

interface RelatedServicesProps {
  categories: ServiceCategory[];
}

export default function RelatedServices({ categories }: RelatedServicesProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="w-full py-[80px] lg:py-[100px] px-6 lg:px-0 bg-[#e8eaee] border-b border-[#e2e4e8]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-[12px] uppercase tracking-[0.05em] text-[#4a4f5a] font-semibold mb-2">
              Explore More
            </div>
            <h2 className="text-[28px] sm:text-[34px] font-normal tracking-[-0.02em] text-[#0a0a0a] leading-tight">
              Related Service Categories
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#0a0a0a] hover:text-black transition-colors"
          >
            <span>All 6 categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Related Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-white border border-[#e2e4e8] p-7 rounded-none flex flex-col justify-between shadow-xs group transition-all"
            >
              <div>
                <div className="w-[36px] h-[36px] bg-[#0a0a0a] rounded-none flex items-center justify-center text-white mb-5 group-hover:bg-[#1a2b49] transition-colors">
                  <ServiceIcon name={cat.icon} className="w-[18px] h-[18px] text-white" />
                </div>

                <h3 className="text-[19px] font-medium text-[#0a0a0a] tracking-tight mb-2 group-hover:text-black">
                  {cat.title}
                </h3>

                <p className="text-[14px] text-[#4a4f5a] leading-relaxed line-clamp-3 mb-6">
                  {cat.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-[#f0f1f3]">
                <Link
                  href={`/services/${cat.slug}`}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0a0a0a] group-hover:text-black transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                >
                  <span>View Category Offerings</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
