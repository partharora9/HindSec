"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useSafeReducedMotion();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const role = params.get("role");
      if (role) {
        const roleTitles: Record<string, string> = {
          "senior-penetration-tester": "Senior Penetration Tester",
          "cloud-security-engineer": "Cloud Security Engineer",
          "security-operations-analyst": "Security Operations Analyst",
          "devsecops-engineer": "DevSecOps Engineer",
        };
        const title =
          roleTitles[role] ||
          role
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
        setFormData((prev) => {
          if (!prev.message) {
            return { ...prev, message: `Applying for: ${title}` };
          }
          return prev;
        });
      }
    }
  }, []);

  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Submit button magnetic hover
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReduced || !submitBtnRef.current) return;
    const rect = submitBtnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.2;
    const deltaY = (e.clientY - centerY) * 0.2;
    setBtnOffset({
      x: Math.max(-6, Math.min(6, deltaX)),
      y: Math.max(-6, Math.min(6, deltaY)),
    });
  };

  const handleBtnMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const data = await res.json();
        setErrors({ email: data.error || "Submission failed. Please try again." });
      }
    } catch {
      setErrors({ email: "Submission failed. Please check your network." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-[#f0f1f3] pt-[130px] pb-[150px] select-none text-[#0a0a0a]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-start">
          {/* ================= LEFT COLUMN (608x641 Photo) ================= */}
          <div className="relative w-full h-[340px] sm:h-[460px] lg:h-[641px] max-w-[608px] overflow-hidden rounded-none bg-gradient-to-br from-[#15233e] via-[#0d1627] to-[#060a12]">
            <motion.div
              initial={{
                opacity: 0,
                scale: prefersReduced ? 1 : 1.1,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: prefersReduced ? 0.2 : 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/contact-team.jpg"
                alt="Securio consulting team discussing security operations"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 608px"
                className="object-cover object-center rounded-none"
                priority
              />
            </motion.div>

            {/* Hardware-accelerated wipe reveal curtain from the right */}
            {!prefersReduced && (
              <motion.div
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 bg-[#f0f1f3] origin-right pointer-events-none z-10"
              />
            )}
          </div>

          {/* ================= RIGHT COLUMN (Heading + Contact Form) ================= */}
          <div className="flex flex-col max-w-[608px] w-full">
            {/* Label: "QUESTIONS & ANSWERS" */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 16 }}
              transition={{ duration: prefersReduced ? 0 : 0.5, ease: "easeOut" }}
              className="text-[15px] font-normal uppercase tracking-[0.03em] text-[#0a0a0a]"
            >
              QUESTIONS & ANSWERS
            </motion.div>

            {/* Heading: "Partner with us for / cybersecurity excellence" (48px) */}
            <motion.h2
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : 20 }}
              transition={{
                duration: prefersReduced ? 0 : 0.6,
                delay: prefersReduced ? 0 : 0.08,
                ease: "easeOut",
              }}
              className="mt-[32px] text-[32px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.22] tracking-[-1px] text-[#0a0a0a]"
            >
              Partner with us for
              <br />
              cybersecurity excellence
            </motion.h2>

            {/* Form Container (70px below heading) */}
            <div className="mt-[70px] w-full" aria-live="polite">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white p-[48px] rounded-none flex flex-col items-center justify-center text-center min-h-[360px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-[60px] h-[60px] rounded-full bg-[#0a0a0a] flex items-center justify-center mb-6"
                  >
                    <svg
                      className="w-[30px] h-[30px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.polyline
                        points="4 12 9 17 20 6"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-[28px] font-normal text-[#0a0a0a] mb-2">
                    Thanks, we will be in touch shortly.
                  </h3>
                  <p className="text-[16px] text-[#4a4f5a]">
                    Our security specialists have received your inquiry and will follow up within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col w-full">
                  {/* Row 1: First Name & Last Name (2 cols, 24px gap) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] mb-[35px]">
                    {/* First Name */}
                    <div className="flex flex-col relative">
                      <label
                        htmlFor="firstName"
                        className={`text-[15px] font-normal mb-[20px] transition-colors duration-200 ${
                          focusedField === "firstName" ? "text-[#2b50ae]" : "text-[#0a0a0a]"
                        }`}
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => {
                            setFormData({ ...formData, firstName: e.target.value });
                            if (errors.firstName) setErrors({ ...errors, firstName: undefined });
                          }}
                          onFocus={() => setFocusedField("firstName")}
                          onBlur={() => setFocusedField(null)}
                          style={{
                            transform: focusedField === "firstName" ? "translateY(-2px)" : "none",
                            transition: "transform 0.2s ease",
                          }}
                          className="w-full sm:w-[292px] h-[48px] bg-white border-none rounded-none px-[17px] text-[15px] text-[#0a0a0a] placeholder-[#8a8e96] focus:outline-none"
                        />
                        {/* 2px bottom line growing on focus */}
                        <div
                          className={`absolute bottom-0 left-0 w-full sm:w-[292px] h-[2px] bg-[#2b50ae] origin-left transition-transform duration-250 ease-out pointer-events-none ${
                            focusedField === "firstName" ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </div>
                      {errors.firstName && (
                        <motion.span
                          initial={{ x: -4, opacity: 0 }}
                          animate={{ x: [-4, 4, -4, 4, 0], opacity: 1 }}
                          transition={{ duration: 0.35 }}
                          className="text-[13px] text-[#c0392b] mt-1.5"
                        >
                          {errors.firstName}
                        </motion.span>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col relative">
                      <label
                        htmlFor="lastName"
                        className={`text-[15px] font-normal mb-[20px] transition-colors duration-200 ${
                          focusedField === "lastName" ? "text-[#2b50ae]" : "text-[#0a0a0a]"
                        }`}
                      >
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => {
                            setFormData({ ...formData, lastName: e.target.value });
                            if (errors.lastName) setErrors({ ...errors, lastName: undefined });
                          }}
                          onFocus={() => setFocusedField("lastName")}
                          onBlur={() => setFocusedField(null)}
                          style={{
                            transform: focusedField === "lastName" ? "translateY(-2px)" : "none",
                            transition: "transform 0.2s ease",
                          }}
                          className="w-full sm:w-[292px] h-[48px] bg-white border-none rounded-none px-[17px] text-[15px] text-[#0a0a0a] placeholder-[#8a8e96] focus:outline-none"
                        />
                        <div
                          className={`absolute bottom-0 left-0 w-full sm:w-[292px] h-[2px] bg-[#2b50ae] origin-left transition-transform duration-250 ease-out pointer-events-none ${
                            focusedField === "lastName" ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </div>
                      {errors.lastName && (
                        <motion.span
                          initial={{ x: -4, opacity: 0 }}
                          animate={{ x: [-4, 4, -4, 4, 0], opacity: 1 }}
                          transition={{ duration: 0.35 }}
                          className="text-[13px] text-[#c0392b] mt-1.5"
                        >
                          {errors.lastName}
                        </motion.span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email Address & Phone (2 cols, 24px gap) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] mb-[35px]">
                    {/* Email */}
                    <div className="flex flex-col relative">
                      <label
                        htmlFor="email"
                        className={`text-[15px] font-normal mb-[20px] transition-colors duration-200 ${
                          focusedField === "email" ? "text-[#2b50ae]" : "text-[#0a0a0a]"
                        }`}
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          placeholder="examples@domain.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          style={{
                            transform: focusedField === "email" ? "translateY(-2px)" : "none",
                            transition: "transform 0.2s ease",
                          }}
                          className="w-full sm:w-[292px] h-[48px] bg-white border-none rounded-none px-[17px] text-[15px] text-[#0a0a0a] placeholder-[#8a8e96] focus:outline-none"
                        />
                        <div
                          className={`absolute bottom-0 left-0 w-full sm:w-[292px] h-[2px] bg-[#2b50ae] origin-left transition-transform duration-250 ease-out pointer-events-none ${
                            focusedField === "email" ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <motion.span
                          initial={{ x: -4, opacity: 0 }}
                          animate={{ x: [-4, 4, -4, 4, 0], opacity: 1 }}
                          transition={{ duration: 0.35 }}
                          className="text-[13px] text-[#c0392b] mt-1.5"
                        >
                          {errors.email}
                        </motion.span>
                      )}
                    </div>

                    {/* Phone (optional) */}
                    <div className="flex flex-col relative">
                      <label
                        htmlFor="phone"
                        className={`text-[15px] font-normal mb-[20px] transition-colors duration-200 ${
                          focusedField === "phone" ? "text-[#2b50ae]" : "text-[#0a0a0a]"
                        }`}
                      >
                        Phone (optional)
                      </label>
                      <div className="relative">
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          style={{
                            transform: focusedField === "phone" ? "translateY(-2px)" : "none",
                            transition: "transform 0.2s ease",
                          }}
                          className="w-full sm:w-[292px] h-[48px] bg-white border-none rounded-none px-[17px] text-[15px] text-[#0a0a0a] placeholder-[#8a8e96] focus:outline-none"
                        />
                        <div
                          className={`absolute bottom-0 left-0 w-full sm:w-[292px] h-[2px] bg-[#2b50ae] origin-left transition-transform duration-250 ease-out pointer-events-none ${
                            focusedField === "phone" ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Message (optional) textarea */}
                  <div className="flex flex-col relative mb-[24px]">
                    <label
                      htmlFor="message"
                      className={`text-[15px] font-normal mb-[20px] transition-colors duration-200 ${
                        focusedField === "message" ? "text-[#2b50ae]" : "text-[#0a0a0a]"
                      }`}
                    >
                      Message (optional)
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        rows={3}
                        placeholder="Type your message..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          transform: focusedField === "message" ? "translateY(-2px)" : "none",
                          transition: "transform 0.2s ease",
                          resize: "vertical",
                        }}
                        className="w-full h-[78px] bg-white border-none rounded-none px-[17px] py-[20px] text-[15px] text-[#0a0a0a] placeholder-[#8a8e96] focus:outline-none"
                      />
                      <div
                        className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#2b50ae] origin-left transition-transform duration-250 ease-out pointer-events-none ${
                          focusedField === "message" ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Submit Button: black pill (#050505), 253px x 56px, text "Submit" white, 15px, weight 500 */}
                  <div className="mt-[24px]">
                    <motion.button
                      ref={submitBtnRef}
                      type="submit"
                      disabled={isSubmitting}
                      onMouseMove={handleBtnMouseMove}
                      onMouseLeave={handleBtnMouseLeave}
                      animate={
                        prefersReduced
                          ? {}
                          : {
                              x: btnOffset.x,
                              y: btnOffset.y,
                            }
                      }
                      whileHover={{ scale: prefersReduced ? 1 : 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className="group relative overflow-hidden w-[253px] h-[56px] rounded-full bg-[#050505] text-white text-[15px] font-medium flex items-center justify-center cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b50ae] focus-visible:ring-offset-2"
                    >
                      {/* Dark-to-blue fill sweep on hover */}
                      <div className="absolute inset-0 bg-[#2b50ae] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            <span>Sending...</span>
                          </>
                        ) : (
                          "Submit"
                        )}
                      </span>
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
