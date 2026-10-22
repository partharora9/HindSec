"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import MegaDropdown, {
  servicesMenuItems,
  whySecurioMenuItems,
} from "./MegaDropdown";
import { BRAND_NAME, navContent } from "@/content/siteContent";

export interface NavbarProps {
  theme?: "dark" | "light";
}

export default function Navbar({ theme }: NavbarProps = {}) {
  const pathname = usePathname();
  const isLight =
    theme === "light" ||
    pathname === "/about" ||
    pathname === "/careers" ||
    pathname === "/contact";

  const [scrolled, setScrolled] = useState(false);
  const [isOverWhite, setIsOverWhite] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"services" | "why" | null>(
    null
  );
  const [panelLeft, setPanelLeft] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveAccordion, setMobileActiveAccordion] = useState<
    "services" | "why" | null
  >(null);

  const navRef = useRef<HTMLElement | null>(null);
  const servicesTriggerRef = useRef<HTMLDivElement | null>(null);
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

  const updatePanelPosition = (menu: "services" | "why") => {
    if (!navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const triggerEl =
      menu === "services" ? servicesTriggerRef.current : whyTriggerRef.current;
    if (triggerEl) {
      const triggerRect = triggerEl.getBoundingClientRect();
      // Shift left by 20px so the left column's 24px label padding aligns under the trigger text
      const offset = triggerRect.left - navRect.left - 20;
      setPanelLeft(offset);
    }
  };

  const handleMouseEnterTrigger = (menu: "services" | "why") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    updatePanelPosition(menu);
    setActiveDropdown(menu);
  };

  const handleMouseLeaveTriggerOrPanel = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // 120ms close delay so moving between trigger and panel doesn't close it
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  const handleMouseEnterPanel = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const toggleDropdown = (menu: "services" | "why") => {
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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0 h-[94px] flex items-center justify-between">
        {/* Left: Securio Logo */}
        <a
          href="/"
          className="flex items-center gap-[14px] group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg p-1"
          aria-label="Securio Home"
        >
          {/* 2x2 grid of dots (10px, 5px gap) */}
          <motion.div
            whileHover={{ rotate: 90, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 280, damping: 16 }}
            className="grid grid-cols-2 gap-[5px] w-[25px] h-[25px] items-center justify-center p-0.5"
          >
            <span
              className={`w-[10px] h-[10px] rounded-full block transition-colors ${
                isLight
                  ? "bg-[#0a0a0a] group-hover:bg-black/70"
                  : "bg-white group-hover:bg-blue-100"
              }`}
            />
            <span
              className={`w-[10px] h-[10px] rounded-full block transition-colors ${
                isLight
                  ? "bg-[#0a0a0a] group-hover:bg-black/70"
                  : "bg-white group-hover:bg-blue-100"
              }`}
            />
            <span
              className={`w-[10px] h-[10px] rounded-full block transition-colors ${
                isLight
                  ? "bg-[#0a0a0a] group-hover:bg-black/70"
                  : "bg-white group-hover:bg-blue-100"
              }`}
            />
            <span
              className={`w-[10px] h-[10px] rounded-full block transition-colors ${
                isLight
                  ? "bg-[#0a0a0a] group-hover:bg-black/70"
                  : "bg-white group-hover:bg-blue-100"
              }`}
            />
          </motion.div>

          {/* Securio text: 34px, weight 400, tight letter-spacing */}
          <span
            className={`text-[34px] font-normal leading-none tracking-[-0.03em] select-none ${
              isLight ? "text-[#0a0a0a]" : "text-white"
            }`}
          >
            {BRAND_NAME}
          </span>
        </a>

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
                activeDropdown === "services"
                  ? isLight
                    ? "text-[#0a0a0a]"
                    : "text-white"
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
                  activeDropdown === "services" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          </div>

          {/* 2. Why Securio Trigger */}
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
                activeDropdown === "why"
                  ? isLight
                    ? "text-[#0a0a0a]"
                    : "text-white"
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
                  activeDropdown === "why" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          </div>

          {/* 3. Case Studies */}
          <a
            href="/#case-studies"
            className={`group relative py-2 text-[15px] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md px-1 ${
              isLight
                ? "text-[#0a0a0a] hover:text-[#0a0a0a]/75"
                : "text-white/90 hover:text-white"
            }`}
          >
            <span>Case Studies</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] transition-all duration-200 ease-out ${
                isLight ? "bg-[#0a0a0a]" : "bg-white"
              } w-0 group-hover:w-full`}
            />
          </a>

          {/* 4. Contact */}
          <a
            href="/contact"
            className={`group relative py-2 text-[15px] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md px-1 ${
              pathname === "/contact"
                ? isLight
                  ? "text-[#6b7078]"
                  : "text-white/60"
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
                pathname === "/contact"
                  ? "w-full opacity-60"
                  : "w-0 group-hover:w-full"
              }`}
            />
          </a>

          {/* Desktop Mega Dropdown Panel (shared, smoothly sliding between triggers) */}
          <AnimatePresence>
            {activeDropdown && (
              <MegaDropdown
                type={activeDropdown}
                leftOffset={panelLeft}
                onMouseEnter={handleMouseEnterPanel}
                onMouseLeave={handleMouseLeaveTriggerOrPanel}
                onClose={() => setActiveDropdown(null)}
              />
            )}
          </AnimatePresence>
        </nav>

        {/* Right: Book a Demo Button (Desktop) & Hamburger (Mobile) */}
        <div className="flex items-center gap-4">
          <motion.a
            href="/contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`relative overflow-hidden inline-flex items-center justify-center h-[40px] px-[21px] rounded-full text-[15px] font-medium tracking-tight transition-all duration-200 group focus:outline-none focus-visible:ring-2 ${
              isLight
                ? "bg-[#050505] text-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_22px_rgba(0,0,0,0.35)] focus-visible:ring-black focus-visible:ring-offset-white"
                : "bg-white text-black shadow-[0_2px_10px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_22px_rgba(255,255,255,0.4)] focus-visible:ring-white focus-visible:ring-offset-black"
            }`}
          >
            {/* Light sweep shimmer */}
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
          </motion.a>

          {/* Mobile hamburger button (< 900px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`min-[900px]:hidden p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
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
            className="min-[900px]:hidden overflow-hidden bg-[#06102f]/98 backdrop-blur-2xl border-b border-white/15 px-6 py-6 space-y-4"
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
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileActiveAccordion === "services" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileActiveAccordion === "services" && (
                  <div className="py-2 space-y-2 border-l border-white/10 ml-2 pl-3 mt-1">
                    {servicesMenuItems.map((item, idx) => (
                      <a
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
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Why Securio Accordion */}
              <div>
                <button
                  onClick={() =>
                    setMobileActiveAccordion(
                      mobileActiveAccordion === "why" ? null : "why"
                    )
                  }
                  className="flex items-center justify-between w-full py-2 text-white text-[17px] font-medium"
                >
                  <span>Why {BRAND_NAME}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileActiveAccordion === "why" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileActiveAccordion === "why" && (
                  <div className="py-2 space-y-2 border-l border-white/10 ml-2 pl-3 mt-1">
                    {whySecurioMenuItems.map((item, idx) => (
                      <a
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
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="/#case-studies"
                className="block py-2 text-[17px] font-medium text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Case Studies
              </a>

              <a
                href="/contact"
                className={`block py-2 text-[17px] font-medium ${
                  pathname === "/contact" ? "text-white/60" : "text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href="/contact"
                className="w-full h-[46px] rounded-full bg-white text-black font-medium flex items-center justify-center text-[15px]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {navContent.ctaButton}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
