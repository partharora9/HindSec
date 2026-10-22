"use client";

import React from "react";
import { marqueeContent } from "@/content/siteContent";

interface LogoItem {
  id: number;
  content: React.ReactNode;
}

const standardItems: LogoItem[] = [
  // 1. OWASP
  {
    id: 1,
    content: (
      <div className="flex items-center gap-3">
        <svg className="w-8 h-8 fill-[#3b3f47]" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 3.99-2.6 7.74-6 8.73-3.4-0.99-6-4.74-6-8.73V6.43l6-2.25z" />
        </svg>
        <div className="flex flex-col text-left leading-[1.05]">
          <span className="text-[20px] font-black tracking-[-0.02em] text-[#3b3f47]">
            OWASP
          </span>
          <span className="text-[9px] uppercase tracking-[0.16em] font-semibold text-[#3b3f47]/75">
            Testing Guide
          </span>
        </div>
      </div>
    ),
  },
  // 2. CVSS
  {
    id: 2,
    content: (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 stroke-[#3b3f47] fill-none" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
        <div className="flex flex-col text-left leading-[1.05]">
          <span className="text-[19px] font-black tracking-tight text-[#3b3f47]">
            CVSS
          </span>
          <span className="text-[9px] uppercase tracking-[0.16em] font-semibold text-[#3b3f47]/75">
            v3.1 & v4.0
          </span>
        </div>
      </div>
    ),
  },
  // 3. NIST
  {
    id: 3,
    content: (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 fill-[#3b3f47]" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h4v16H4V4zm6 0h4v16h-4V4zm6 0h4v16h-4V4z" />
        </svg>
        <div className="flex flex-col text-left leading-[1.05]">
          <span className="text-[19px] font-black tracking-tight text-[#3b3f47]">
            NIST
          </span>
          <span className="text-[9px] uppercase tracking-[0.14em] font-semibold text-[#3b3f47]/75">
            SP 800-115
          </span>
        </div>
      </div>
    ),
  },
  // 4. MITRE ATT&CK
  {
    id: 4,
    content: (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 fill-[#3b3f47]" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
        </svg>
        <div className="flex flex-col text-left leading-[1.05]">
          <span className="text-[18px] font-bold tracking-tight text-[#3b3f47]">
            MITRE ATT&CK
          </span>
          <span className="text-[9px] uppercase tracking-[0.14em] font-semibold text-[#3b3f47]/75">
            Framework
          </span>
        </div>
      </div>
    ),
  },
  // 5. PTES
  {
    id: 5,
    content: (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 stroke-[#3b3f47] fill-none" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
        <div className="flex flex-col text-left leading-[1.05]">
          <span className="text-[19px] font-black tracking-tight text-[#3b3f47]">
            PTES
          </span>
          <span className="text-[9px] uppercase tracking-[0.14em] font-semibold text-[#3b3f47]/75">
            Execution Standard
          </span>
        </div>
      </div>
    ),
  },
  // 6. ISO 27001
  {
    id: 6,
    content: (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 fill-[#3b3f47]" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3L4.3 7.6l5.3-.8L12 2z" />
        </svg>
        <div className="flex flex-col text-left leading-[1.05]">
          <span className="text-[19px] font-bold tracking-tight text-[#3b3f47]">
            ISO 27001
          </span>
          <span className="text-[9px] uppercase tracking-[0.14em] font-semibold text-[#3b3f47]/75">
            Controls Aligned
          </span>
        </div>
      </div>
    ),
  },
  // 7. PCI DSS
  {
    id: 7,
    content: (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 stroke-[#3b3f47] fill-none" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
        <div className="flex flex-col text-left leading-[1.05]">
          <span className="text-[19px] font-black tracking-tight text-[#3b3f47]">
            PCI DSS
          </span>
          <span className="text-[9px] uppercase tracking-[0.14em] font-semibold text-[#3b3f47]/75">
            Requirement 11
          </span>
        </div>
      </div>
    ),
  },
];

export default function LogoMarquee() {
  // Duplicated track (4 sets) for seamless infinite running loop across all screen sizes
  const trackItems = [...standardItems, ...standardItems, ...standardItems, ...standardItems];

  return (
    <section
      aria-label="Industry Standards and Methodologies"
      className="w-full h-[110px] bg-[#f0f1f3] flex items-center overflow-hidden relative select-none z-10 border-b border-[#e2e4e8]"
    >
      <h2 className="sr-only">Testing Aligned with Industry Standards</h2>

      {/* Tiny caption beside the first loop (13px, #4a4f5a) */}
      <div className="hidden lg:flex items-center gap-2 pl-8 pr-6 py-2 border-r border-[#cfd1d5]/70 text-[13px] text-[#4a4f5a] font-normal whitespace-nowrap flex-shrink-0 z-20 bg-[#f0f1f3]">
        <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
        <span>{marqueeContent.caption}</span>
      </div>

      {/* Embedded style tag guarantees running marquee animation is always active */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes logoMarqueeRunningTrack {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            .active-running-marquee {
              display: flex !important;
              width: max-content !important;
              animation: logoMarqueeRunningTrack 45s linear infinite !important;
              will-change: transform;
            }
            .active-running-marquee:hover {
              animation-play-state: paused !important;
            }
          `,
        }}
      />

      {/* Marquee viewport with soft fade masks on left and right edges */}
      <div
        className="w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, transparent 100%)",
        }}
      >
        {/* Continuous 45s linear infinite running marquee, pauses on hover */}
        <div className="active-running-marquee flex items-center w-max opacity-80 hover:opacity-100 transition-opacity duration-300">
          {trackItems.map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 px-8 md:px-12 cursor-default hover:scale-[1.02] transition-transform duration-200"
            >
              {logo.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
