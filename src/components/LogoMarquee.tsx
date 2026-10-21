"use client";

import React from "react";

interface LogoItem {
  id: number;
  content: React.ReactNode;
}

const sevenLogos: LogoItem[] = [
  // 1. "LOGOIPSUM" (circle R mark, bold)
  {
    id: 1,
    content: (
      <div className="flex items-center gap-3">
        <svg className="w-9 h-9 fill-[#3b3f47]" viewBox="0 0 36 36" aria-hidden="true">
          <path d="M18 4C10.268 4 4 10.268 4 18s6.268 14 14 14 14-6.268 14-14S25.732 4 18 4zm0 5c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" />
          <path d="M14 12h5a3.5 3.5 0 0 1 2.8 5.6L24 23h-3.2l-1.9-4.5H16.8V23H14V12zm2.8 4.2h2.2a1.4 1.4 0 1 0 0-2.8h-2.2v2.8z" />
        </svg>
        <span className="text-[21px] font-black tracking-[-0.03em] uppercase text-[#3b3f47]">
          LOGOIPSUM
        </span>
      </div>
    ),
  },
  // 2. "Department of Fictional Logos" (bars mark)
  {
    id: 2,
    content: (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 fill-[#3b3f47]" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M6 6h20v4H6V6zm0 8h14v4H6v-4zm0 8h8v4H6v-4z" />
        </svg>
        <div className="flex flex-col text-left leading-[1.1]">
          <span className="text-[12px] font-semibold text-[#3b3f47]">
            Department of
          </span>
          <span className="text-[14px] font-bold text-[#3b3f47] tracking-tight">
            Fictional Logos
          </span>
        </div>
      </div>
    ),
  },
  // 3. shield + "Logoipsum / ACADEMY"
  {
    id: 3,
    content: (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 fill-[#3b3f47]" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 4L6 8v9c0 6.5 4.3 12.6 10 14 5.7-1.4 10-7.5 10-14V8L16 4zm0 3.3l7 2.8v7.5c0 4.8-3 9.4-7 10.7-4-1.3-7-5.9-7-10.7v-7.5l7-2.8z" />
          <path d="M16 11v11c2.8-.9 5-4.2 5-7.7V12.7L16 11z" opacity="0.4" />
        </svg>
        <div className="flex flex-col text-left leading-[1.1]">
          <span className="text-[18px] font-bold text-[#3b3f47] tracking-tight">
            Logoipsum
          </span>
          <span className="text-[10px] uppercase tracking-[0.14em] font-medium text-[#3b3f47]/80">
            ACADEMY
          </span>
        </div>
      </div>
    ),
  },
  // 4. flower + "Logoipsum"
  {
    id: 4,
    content: (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 fill-[#3b3f47]" viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="9" r="4.5" />
          <circle cx="23" cy="16" r="4.5" opacity="0.7" />
          <circle cx="16" cy="23" r="4.5" opacity="0.85" />
          <circle cx="9" cy="16" r="4.5" opacity="0.55" />
          <circle cx="16" cy="16" r="2.5" />
        </svg>
        <span className="text-[20px] font-bold text-[#3b3f47] tracking-tight">
          Logoipsum
        </span>
      </div>
    ),
  },
  // 5. star + "LOGOIPSUM / ESTD. 2019"
  {
    id: 5,
    content: (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 fill-[#3b3f47]" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 4l3 5 5 1-3 5 1 5-6-2-6 2 1-5-3-5 5-1 3-5zm0 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
        </svg>
        <div className="flex flex-col text-left leading-[1.05]">
          <span className="text-[18px] font-black tracking-tight text-[#3b3f47]">
            LOGOIPSUM
          </span>
          <span className="text-[9px] tracking-[0.16em] uppercase text-[#3b3f47]/75 font-semibold">
            ESTD. 2019
          </span>
        </div>
      </div>
    ),
  },
  // 6. arch + "LOGOIPSUM" (outlined)
  {
    id: 6,
    content: (
      <div className="flex items-center gap-2.5">
        <svg
          className="w-8 h-8 stroke-[#3b3f47] fill-none"
          viewBox="0 0 32 32"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path d="M7 25V14a9 9 0 0 1 18 0v11" />
          <path d="M12 25V15a4 4 0 0 1 8 0v10" />
        </svg>
        <span className="text-[19px] font-bold tracking-tight text-[#3b3f47]">
          LOGOIPSUM
        </span>
      </div>
    ),
  },
  // 7. circle R + "LOGOIPSUM" (bold)
  {
    id: 7,
    content: (
      <div className="flex items-center gap-3">
        <svg className="w-9 h-9 fill-[#3b3f47]" viewBox="0 0 36 36" aria-hidden="true">
          <path d="M18 4C10.268 4 4 10.268 4 18s6.268 14 14 14 14-6.268 14-14S25.732 4 18 4zm0 5c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" />
          <path d="M14 12h5a3.5 3.5 0 0 1 2.8 5.6L24 23h-3.2l-1.9-4.5H16.8V23H14V12zm2.8 4.2h2.2a1.4 1.4 0 1 0 0-2.8h-2.2v2.8z" />
        </svg>
        <span className="text-[21px] font-black tracking-[-0.03em] uppercase text-[#3b3f47]">
          LOGOIPSUM
        </span>
      </div>
    ),
  },
];

export default function LogoMarquee() {
  // Duplicated track (4 sets) for seamless infinite running loop across all screen sizes
  const trackItems = [...sevenLogos, ...sevenLogos, ...sevenLogos, ...sevenLogos];

  return (
    <section
      aria-label="Partner Logos"
      className="w-full h-[110px] bg-[#f0f1f3] flex items-center overflow-hidden relative select-none z-10 border-b border-[#e2e4e8]"
    >
      {/* Running Heading for accessibility & SEO */}
      <h2 className="sr-only">Trusted Partners & Integrations</h2>

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
        <div className="active-running-marquee flex items-center w-max opacity-70 hover:opacity-100 transition-opacity duration-300">
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
