"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import MegaDropdown, {
  whyHindSecMenuItems,
} from "./MegaDropdown";
import { BRAND_NAME, navContent } from "@/content/siteContent";
import { serviceCategories } from "@/data/services";

export interface NavbarProps {
  theme?: "dark" | "light";
}

export default function Navbar({ theme }: NavbarProps = {}) {
  const pathname = usePathname();
  const isLight =
    theme === "light" ||
    pathname === "/about" ||
    pathname === "/careers" ||
    pathname === "/contact" ||
    pathname === "/compliance" ||
    pathname === "/services" ||
    pathname.startsWith("/services/");

  const isServicesActive = pathname === "/services" || (pathname.startsWith("/services/") && pathname !== "/services/vapt-compliance-services");
  const isComplianceActive = pathname === "/compliance" || pathname === "/services/vapt-compliance-services";
  const isWhyActive =
    pathname === "/about" || pathname === "/certifications" || pathname === "/careers";
  const isContactActive = pathname === "/contact";

  const [scrolled, setScrolled] = useState(false);
  const [isOverWhite, setIsOverWhite] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<
    "services" | "compliance" | "why" | null
  >(null);
  const [panelLeft, setPanelLeft] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveAccordion, setMobileActiveAccordion] = useState<
    "services" | "compliance" | "why" | null
  >(null);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);

  const navRef = useRef<HTMLElement | null>(null);
  const servicesTriggerRef = useRef<HTMLDivElement | null>(null);
  const complianceTriggerRef = useRef<HTMLDivElement | null>(null);
  const whyTriggerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const whiteSections = document.querySelectorAll('[data-navbar-bg="white"]');
    if (!whiteSections.length) {
      setIsOverWhite(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const anyIntersecting = entries.some((entry) => entry.isIntersecting);
        setIsOverWhite(anyIntersecting);
      },
      {
        rootMargin: "-94px 0px 0px 0px",
        threshold: 0,
      }
    );

    whiteSections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const updatePanelPosition = (menu: "services" | "compliance" | "why") => {
    if (!navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const triggerEl =
      menu === "services"
        ? servicesTriggerRef.current
        : menu === "compliance"
        ? complianceTriggerRef.current
        : whyTriggerRef.current;
    if (triggerEl) {
      const triggerRect = triggerEl.getBoundingClientRect();
      if (menu === "services" || menu === "compliance") {
        // Center the mega-panel relative to trigger and clamp to avoid viewport spill
        const triggerCenter = triggerRect.left + triggerRect.width / 2;
        const panelWidth = menu === "services" ? 960 : 880;
        let leftInNav = triggerCenter - navRect.left - panelWidth / 2;

        const screenLeft = navRect.left + leftInNav;
        if (screenLeft < 20) {
          leftInNav = 20 - navRect.left;
        }
        setPanelLeft(leftInNav);
      } else {
        const offset = triggerRect.left - navRect.left - 20;
        setPanelLeft(offset);
      }
    }
  };

  const handleMouseEnterTrigger = (menu: "services" | "compliance" | "why") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    updatePanelPosition(menu);
    setActiveDropdown(menu);
  };

  const handleMouseLeaveTriggerOrPanel = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  const handleMouseEnterPanel = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const toggleDropdown = (menu: "services" | "compliance" | "why") => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      updatePanelPosition(menu);
      setActiveDropdown(menu);
    }
  };

  // Close on outside click and Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[250ms] ${
        scrolled
          ? isLight
            ? isOverWhite
              ? "bg-white/85 backdrop-blur-md border-b border-[#e2e4e8] shadow-sm"
              : "bg-[#f0f1f3]/85 backdrop-blur-md border-b border-[#e2e4e8] shadow-sm"
            : "bg-[#02030a]/75 backdrop-blur-md border-b border-white/[0.09] shadow-lg shadow-black/25"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0 h-[72px] sm:h-[84px] lg:h-[94px] flex items-center justify-between">
        {/* Left: HindSec Official Logo */}
        <Link
          href="/"
          className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg py-1"
          aria-label="HindSec – Cybersecurity & AI Security Services"
        >
          <Image
            src="/images/hindsec-logo.png"
            alt="HindSec – Cybersecurity & AI Security Services"
            width={148}
            height={46}
            priority
            className="h-[34px] sm:h-[40px] lg:h-[46px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Center: Desktop Navigation Links (hidden below 900px) */}
        <nav
          ref={navRef}
          className="hidden min-[900px]:flex items-center gap-[36px] relative"
          aria-label="Main Navigation"
        >
          {/* 1. Services Trigger */}
          <div
            ref={servicesTriggerRef}
            className="relative"
            onMouseEnter={() => handleMouseEnterTrigger("services")}
            onMouseLeave={handleMouseLeaveTriggerOrPanel}
          >
            <button
              onClick={() => toggleDropdown("services")}
              aria-expanded={activeDropdown === "services"}
              aria-haspopup="true"
              className={`group relative flex items-center gap-1.5 py-2 text-[15px] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md px-1 cursor-pointer ${
                isServicesActive || activeDropdown === "services"
                  ? isLight
                    ? "text-[#0a0a0a] font-semibold"
                    : "text-white font-semibold"
                  : isLight
                  ? "text-[#0a0a0a] hover:text-[#0a0a0a]/75"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <span>Services</span>
              <motion.div
                animate={{ rotate: activeDropdown === "services" ? 180 : 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                <ChevronDown
                  className={`w-[14px] h-[14px] transition-colors ${
                    isLight
                      ? "text-[#0a0a0a]"
                      : "text-white/80 group-hover:text-white"
                  }`}
                />
              </motion.div>
              {/* Animated underline */}
              <span
                className={`absolute bottom-0 left-0 h-[2px] transition-all duration-200 ease-out ${
                  isLight ? "bg-[#0a0a0a]" : "bg-white"
                } ${
                  isServicesActive || activeDropdown === "services"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          </div>

          {/* 2. Compliance Services Trigger */}
          <div
            ref={complianceTriggerRef}
            className="relative"
            onMouseEnter={() => handleMouseEnterTrigger("compliance")}
            onMouseLeave={handleMouseLeaveTriggerOrPanel}
          >
            <button
              onClick={() => toggleDropdown("compliance")}
              aria-expanded={activeDropdown === "compliance"}
              aria-haspopup="true"
              className={`group relative flex items-center gap-1.5 py-2 text-[15px] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md px-1 cursor-pointer ${
                isComplianceActive || activeDropdown === "compliance"
                  ? isLight
                    ? "text-[#0a0a0a] font-semibold"
                    : "text-white font-semibold"
                  : isLight
                  ? "text-[#0a0a0a] hover:text-[#0a0a0a]/75"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <span>Compliance Services</span>
              <motion.div
                animate={{ rotate: activeDropdown === "compliance" ? 180 : 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                <ChevronDown
                  className={`w-[14px] h-[14px] transition-colors ${
                    isLight
                      ? "text-[#0a0a0a]"
                      : "text-white/80 group-hover:text-white"
                  }`}
                />
              </motion.div>
              {/* Animated underline */}
              <span
                className={`absolute bottom-0 left-0 h-[2px] transition-all duration-200 ease-out ${
                  isLight ? "bg-[#0a0a0a]" : "bg-white"
                } ${
                  isComplianceActive || activeDropdown === "compliance"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          </div>

          {/* 3. Why HindSEC Trigger */}
          <div
            ref={whyTriggerRef}
            className="relative"
            onMouseEnter={() => handleMouseEnterTrigger("why")}
            onMouseLeave={handleMouseLeaveTriggerOrPanel}
          >
            <button
              onClick={() => toggleDropdown("why")}
              aria-expanded={activeDropdown === "why"}
              aria-haspopup="true"
              className={`group relative flex items-center gap-1.5 py-2 text-[15px] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md px-1 cursor-pointer ${
                isWhyActive || activeDropdown === "why"
                  ? isLight
                    ? "text-[#0a0a0a] font-semibold"
                    : "text-white font-semibold"
                  : isLight
                  ? "text-[#0a0a0a] hover:text-[#0a0a0a]/75"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <span>Why {BRAND_NAME}</span>
              <motion.div
                animate={{ rotate: activeDropdown === "why" ? 180 : 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                <ChevronDown
                  className={`w-[14px] h-[14px] transition-colors ${
                    isLight
                      ? "text-[#0a0a0a]"
                      : "text-white/80 group-hover:text-white"
                  }`}
                />
              </motion.div>
              {/* Animated underline */}
              <span
                className={`absolute bottom-0 left-0 h-[2px] transition-all duration-200 ease-out ${
                  isLight ? "bg-[#0a0a0a]" : "bg-white"
                } ${
                  isWhyActive || activeDropdown === "why"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          </div>

          {/* 4. Contact */}
          <Link
            href="/contact"
            className={`group relative py-2 text-[15px] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md px-1 ${
              isContactActive
                ? isLight
                  ? "text-[#0a0a0a] font-semibold"
                  : "text-white font-semibold"
                : isLight
                ? "text-[#0a0a0a] hover:text-[#0a0a0a]/75"
                : "text-white/90 hover:text-white"
            }`}
          >
            <span>Contact</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] transition-all duration-200 ease-out ${
                isLight ? "bg-[#0a0a0a]" : "bg-white"
              } ${
                isContactActive
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          {/* Desktop Mega Dropdown Panel */}
          <AnimatePresence>
            {activeDropdown && (
              <MegaDropdown
                type={activeDropdown}
                leftOffset={panelLeft}
                onMouseEnter={handleMouseEnterPanel}
                onMouseLeave={handleMouseLeaveTriggerOrPanel}
                onClose={() => setActiveDropdown(null)}
                currentPath={pathname}
              />
            )}
          </AnimatePresence>
        </nav>

        {/* Right: Book a Demo Button (Desktop) & Hamburger (Mobile) */}
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact"
              className={`relative overflow-hidden inline-flex items-center justify-center h-[40px] px-[21px] rounded-full text-[15px] font-medium tracking-tight transition-all duration-200 group focus:outline-none focus-visible:ring-2 ${
                isLight
                  ? "bg-[#050505] text-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_22px_rgba(0,0,0,0.35)] focus-visible:ring-black focus-visible:ring-offset-white"
                  : "bg-white text-black shadow-[0_2px_10px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_22px_rgba(255,255,255,0.4)] focus-visible:ring-white focus-visible:ring-offset-black"
              }`}
            >
              <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-full">
                <div
                  className={`w-1/2 h-full bg-gradient-to-r ${
                    isLight
                      ? "from-transparent via-white/15 to-transparent"
                      : "from-transparent via-black/10 to-transparent"
                  } transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out`}
                />
              </div>
              <span className="relative z-10">{navContent.ctaButton}</span>
            </Link>
          </motion.div>

          {/* Mobile hamburger button (< 900px, 44x44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`min-[900px]:hidden w-[44px] h-[44px] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              isLight
                ? "text-[#0a0a0a] hover:text-black"
                : "text-white/90 hover:text-white"
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Panel (< 900px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="min-[900px]:hidden overflow-hidden bg-[#06102f]/98 backdrop-blur-2xl border-b border-white/15 px-6 py-6 space-y-4 max-h-[calc(100dvh-72px)] sm:max-h-[calc(100dvh-84px)] overflow-y-auto overscroll-contain"
          >
            <div className="space-y-3">
              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() =>
                    setMobileActiveAccordion(
                      mobileActiveAccordion === "services" ? null : "services"
                    )
                  }
                  className="flex items-center justify-between w-full py-2 text-white text-[17px] font-medium"
                >
                  <span className={isServicesActive ? "text-blue-300 font-semibold" : ""}>
                    Services
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileActiveAccordion === "services" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileActiveAccordion === "services" && (
                  <div className="py-2 space-y-2.5 border-l border-white/10 ml-2 pl-3 mt-1">
                    {/* All Services Overview Link */}
                    <Link
                      href="/services"
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white text-[14px] font-semibold transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>All Services Overview</span>
                      <span>→</span>
                    </Link>

                    {/* 6 Category Sub-Accordions */}
                    {serviceCategories.map((cat) => {
                      const isCatExpanded = mobileExpandedCategory === cat.slug;
                      const isCatActive = pathname === `/services/${cat.slug}`;

                      return (
                        <div
                          key={cat.slug}
                          className="rounded-lg bg-white/[0.03] border border-white/5 overflow-hidden"
                        >
                          <button
                            onClick={() =>
                              setMobileExpandedCategory(
                                isCatExpanded ? null : cat.slug
                              )
                            }
                            className="flex items-center justify-between w-full p-2.5 text-left text-white text-[14px] font-medium hover:bg-white/[0.06] transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isCatActive ? "bg-blue-400" : "bg-white/40"
                                }`}
                              />
                              <span className={isCatActive ? "text-blue-300 font-semibold" : ""}>
                                {cat.title}
                              </span>
                            </div>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform ${
                                isCatExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {isCatExpanded && (
                            <div className="px-3 pb-3 pt-1 space-y-2 border-t border-white/5 bg-black/20">
                              <Link
                                href={`/services/${cat.slug}`}
                                className="block text-[12.5px] font-semibold text-blue-300 hover:underline py-1"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                View {cat.title} Category Page →
                              </Link>
                              <div className="space-y-1 pt-1">
                                {cat.services.map((svc) => (
                                  <Link
                                    key={svc.slug}
                                    href={`/services/${cat.slug}#services-grid`}
                                    className="block text-[12px] text-white/70 hover:text-white py-0.5 truncate"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    • {svc.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile Compliance Services Accordion */}
              <div>
                <button
                  onClick={() =>
                    setMobileActiveAccordion(
                      mobileActiveAccordion === "compliance" ? null : "compliance"
                    )
                  }
                  className="flex items-center justify-between w-full py-2 text-white text-[17px] font-medium"
                >
                  <span className={isComplianceActive ? "text-blue-300 font-semibold" : ""}>
                    Compliance Services
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileActiveAccordion === "compliance" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileActiveAccordion === "compliance" && (
                  <div className="py-2 space-y-2 border-l border-white/10 ml-2 pl-3 mt-1">
                    <Link
                      href="/compliance"
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white text-[14px] font-semibold transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>Compliance Hub & Standards</span>
                      <span>→</span>
                    </Link>
                    <div className="space-y-1 pt-1">
                      {navContent.compliance.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="block p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="text-[13px] font-medium text-white">{item.title}</div>
                          <div className="text-[11.5px] text-white/60 line-clamp-1">{item.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Why HindSEC Accordion */}
              <div>
                <button
                  onClick={() =>
                    setMobileActiveAccordion(
                      mobileActiveAccordion === "why" ? null : "why"
                    )
                  }
                  className="flex items-center justify-between w-full py-2 text-white text-[17px] font-medium"
                >
                  <span className={isWhyActive ? "text-blue-300 font-semibold" : ""}>
                    Why {BRAND_NAME}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileActiveAccordion === "why" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileActiveAccordion === "why" && (
                  <div className="py-2 space-y-2 border-l border-white/10 ml-2 pl-3 mt-1">
                    {whyHindSecMenuItems.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href || `#${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="w-[30px] h-[30px] bg-[#0a0a0a] flex items-center justify-center flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-[14px] font-medium text-white">
                            {item.title}
                          </div>
                          <div className="text-[12px] text-white/60">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className={`block py-2 text-[17px] font-medium ${
                  isContactActive ? "text-blue-300 font-semibold" : "text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/contact"
                className="w-full h-[46px] rounded-full bg-white text-black font-medium flex items-center justify-center text-[15px]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {navContent.ctaButton}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
