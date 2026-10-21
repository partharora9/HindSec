"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface ContactFormBlockProps {
  isInView: boolean;
}

export default function ContactFormBlock({ isInView }: ContactFormBlockProps) {
  const router = useRouter();
  const prefersReduced = useSafeReducedMotion();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);

  // Submit button magnetic hover
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  // Read ?role=, ?topic=, and ?redirect=1 from URL on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get("role");
      const topicParam = params.get("topic");
      const redirectParam = params.get("redirect");

      if (redirectParam === "1") {
        setRedirectOnSuccess(true);
      }

      if (roleParam) {
        const roleTitles: Record<string, string> = {
          "senior-penetration-tester": "Senior Penetration Tester",
          "cloud-security-engineer": "Cloud Security Engineer",
          "security-operations-analyst": "Security Operations Analyst",
          "devsecops-engineer": "DevSecOps Engineer",
        };
        const title =
          roleTitles[roleParam] ||
          roleParam
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
        setFormData((prev) => ({
          ...prev,
          message: prev.message ? prev.message : `Applying for: ${title}`,
        }));
      } else if (topicParam) {
        setFormData((prev) => ({
          ...prev,
          message: prev.message ? prev.message : `Topic: ${topicParam}`,
        }));
      }
    }
  }, []);

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReduced || !submitBtnRef.current) return;
    const rect = submitBtnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.2;
    const deltaY = (e.clientY - centerY) * 0.2;
    setBtnOffset({
      x: Math.max(-8, Math.min(8, deltaX)),
      y: Math.max(-8, Math.min(8, deltaY)),
    });
  };

  const handleBtnMouseLeave = () => {
    setBtnHovered(false);
    setBtnOffset({ x: 0, y: 0 });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
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

    // Honeypot bot protection
    if (formData.honeypot) return;

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (res.ok) {
        if (redirectOnSuccess) {
          router.push("/thank-you");
        } else {
          setIsSuccess(true);
        }
      } else {
        setErrors({ email: "Submission error. Please try again later." });
      }
    } catch {
      setErrors({ email: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFieldValid = (field: "firstName" | "lastName" | "email") => {
    if (field === "firstName") return formData.firstName.trim().length > 0;
    if (field === "lastName") return formData.lastName.trim().length > 0;
    if (field === "email") return emailRegex.test(formData.email.trim());
    return false;
  };

  return (
    <div className="w-full lg:w-[810px] select-none">
      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full min-h-[380px] bg-white rounded-none p-12 flex flex-col items-center justify-center text-center"
          aria-live="polite"
        >
          {/* Draw-on check icon */}
          <div className="w-16 h-16 rounded-full bg-[#2b50ae]/10 flex items-center justify-center text-[#2b50ae] mb-6">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M20 6L9 17l-5-5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </svg>
          </div>
          <h3 className="text-[28px] font-normal text-[#0a0a0a] tracking-tight">
            Thanks, we will be in touch shortly.
          </h3>
          <p className="mt-2 text-[16px] text-[#4a4f5a] max-w-[420px]">
            Our security team has received your message and will follow up with you as soon as possible.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="w-full" aria-live="assertive">
          {/* Honeypot field hidden from real users */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="_website_security_hp"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, honeypot: e.target.value }))
              }
            />
          </div>

          {/* Row 1: First Name & Last Name (Labels y=331, Inputs y=353 to 401, 393px each, 24px gap) */}
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }
            }
            transition={{
              duration: prefersReduced ? 0.1 : 0.6,
              delay: prefersReduced ? 0 : 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col sm:flex-row gap-[24px] w-full"
          >
            {/* First Name (393px wide) */}
            <div className="w-full sm:w-[393px] flex-shrink-0">
              <label
                htmlFor="firstName"
                className={`block text-[15px] font-normal transition-colors duration-200 mb-[20px] leading-none ${
                  focusedField === "firstName" ? "text-[#2b50ae]" : "text-[#0a0a0a]"
                }`}
              >
                First Name
              </label>
              <motion.div
                animate={
                  errors.firstName && !prefersReduced
                    ? { x: [-8, 8, -6, 6, -3, 3, 0] }
                    : focusedField === "firstName" && !prefersReduced
                    ? { y: -2 }
                    : { y: 0 }
                }
                transition={
                  errors.firstName
                    ? { duration: 0.4 }
                    : { duration: 0.25, ease: "easeOut" }
                }
                className="relative w-full h-[48px] bg-[#ffffff] rounded-none"
              >
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                    if (errors.firstName) {
                      setErrors((prev) => ({ ...prev, firstName: undefined }));
                    }
                  }}
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John"
                  className="w-full h-full bg-transparent px-[17px] text-[15px] font-normal text-[#0a0a0a] placeholder-[#8a8e96] border-none outline-none caret-[#2b50ae] rounded-none focus:ring-0"
                />
                {/* 2px bottom line growing from left on focus */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === "firstName" ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2b50ae] origin-left pointer-events-none"
                />
                {/* Checkmark when valid */}
                {isFieldValid("firstName") && (
                  <div className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#2b50ae] pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
              {errors.firstName && (
                <div className="text-[13px] text-[#c0392b] mt-1.5 leading-none">
                  {errors.firstName}
                </div>
              )}
            </div>

            {/* Last Name (393px wide) */}
            <div className="w-full sm:w-[393px] flex-shrink-0">
              <label
                htmlFor="lastName"
                className={`block text-[15px] font-normal transition-colors duration-200 mb-[20px] leading-none ${
                  focusedField === "lastName" ? "text-[#2b50ae]" : "text-[#0a0a0a]"
                }`}
              >
                Last Name
              </label>
              <motion.div
                animate={
                  errors.lastName && !prefersReduced
                    ? { x: [-8, 8, -6, 6, -3, 3, 0] }
                    : focusedField === "lastName" && !prefersReduced
                    ? { y: -2 }
                    : { y: 0 }
                }
                transition={
                  errors.lastName
                    ? { duration: 0.4 }
                    : { duration: 0.25, ease: "easeOut" }
                }
                className="relative w-full h-[48px] bg-[#ffffff] rounded-none"
              >
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                    if (errors.lastName) {
                      setErrors((prev) => ({ ...prev, lastName: undefined }));
                    }
                  }}
                  onFocus={() => setFocusedField("lastName")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Doe"
                  className="w-full h-full bg-transparent px-[17px] text-[15px] font-normal text-[#0a0a0a] placeholder-[#8a8e96] border-none outline-none caret-[#2b50ae] rounded-none focus:ring-0"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === "lastName" ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2b50ae] origin-left pointer-events-none"
                />
                {isFieldValid("lastName") && (
                  <div className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#2b50ae] pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
              {errors.lastName && (
                <div className="text-[13px] text-[#c0392b] mt-1.5 leading-none">
                  {errors.lastName}
                </div>
              )}
            </div>
          </motion.div>

          {/* Row 2: Email Address & Phone (optional) (Pitch 104px: Label at y=435, Inputs y=456 to 504) */}
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }
            }
            transition={{
              duration: prefersReduced ? 0.1 : 0.6,
              delay: prefersReduced ? 0 : 0.17,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col sm:flex-row gap-[24px] w-full mt-[34px]"
          >
            {/* Email Address (393px wide) */}
            <div className="w-full sm:w-[393px] flex-shrink-0">
              <label
                htmlFor="email"
                className={`block text-[15px] font-normal transition-colors duration-200 mb-[20px] leading-none ${
                  focusedField === "email" ? "text-[#2b50ae]" : "text-[#0a0a0a]"
                }`}
              >
                Email Address
              </label>
              <motion.div
                animate={
                  errors.email && !prefersReduced
                    ? { x: [-8, 8, -6, 6, -3, 3, 0] }
                    : focusedField === "email" && !prefersReduced
                    ? { y: -2 }
                    : { y: 0 }
                }
                transition={
                  errors.email
                    ? { duration: 0.4 }
                    : { duration: 0.25, ease: "easeOut" }
                }
                className="relative w-full h-[48px] bg-[#ffffff] rounded-none"
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="example@domain.com"
                  className="w-full h-full bg-transparent px-[17px] text-[15px] font-normal text-[#0a0a0a] placeholder-[#8a8e96] border-none outline-none caret-[#2b50ae] rounded-none focus:ring-0"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === "email" ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2b50ae] origin-left pointer-events-none"
                />
                {isFieldValid("email") && (
                  <div className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#2b50ae] pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
              {errors.email && (
                <div className="text-[13px] text-[#c0392b] mt-1.5 leading-none">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Phone (optional) (393px wide) */}
            <div className="w-full sm:w-[393px] flex-shrink-0">
              <label
                htmlFor="phone"
                className={`block text-[15px] font-normal transition-colors duration-200 mb-[20px] leading-none ${
                  focusedField === "phone" ? "text-[#2b50ae]" : "text-[#0a0a0a]"
                }`}
              >
                Phone (optional)
              </label>
              <motion.div
                animate={
                  focusedField === "phone" && !prefersReduced
                    ? { y: -2 }
                    : { y: 0 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full h-[48px] bg-[#ffffff] rounded-none"
              >
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full h-full bg-transparent px-[17px] text-[15px] font-normal text-[#0a0a0a] placeholder-[#8a8e96] border-none outline-none caret-[#2b50ae] rounded-none focus:ring-0"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === "phone" ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2b50ae] origin-left pointer-events-none"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Row 3: Message (optional) (Label at y=538, Field y=560 to 637, 810px wide, 77px tall) */}
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }
            }
            transition={{
              duration: prefersReduced ? 0.1 : 0.6,
              delay: prefersReduced ? 0 : 0.24,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full mt-[34px]"
          >
            <label
              htmlFor="message"
              className={`block text-[15px] font-normal transition-colors duration-200 mb-[20px] leading-none ${
                focusedField === "message" ? "text-[#2b50ae]" : "text-[#0a0a0a]"
              }`}
            >
              Message (optional)
            </label>
            <motion.div
              animate={
                focusedField === "message" && !prefersReduced
                  ? { y: -2 }
                  : { y: 0 }
              }
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full h-[77px] bg-[#ffffff] rounded-none"
            >
              <textarea
                id="message"
                name="message"
                rows={2}
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder="Type your message..."
                className="w-full h-full bg-transparent px-[17px] py-[20px] text-[15px] font-normal text-[#0a0a0a] placeholder-[#8a8e96] border-none outline-none caret-[#2b50ae] rounded-none focus:ring-0 resize-y"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2b50ae] origin-left pointer-events-none"
              />
            </motion.div>
          </motion.div>

          {/* Submit Button: black pill (#050505), 253px x 56px, text "Submit" white, 15px, weight 500, 24px below textarea (y=661 to 717) */}
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }
            }
            transition={{
              duration: prefersReduced ? 0.1 : 0.6,
              delay: prefersReduced ? 0 : 0.31,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-[24px]"
          >
            <motion.button
              ref={submitBtnRef}
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={handleBtnMouseLeave}
              onMouseMove={handleBtnMouseMove}
              animate={{
                x: prefersReduced ? 0 : btnOffset.x,
                y: prefersReduced ? 0 : btnOffset.y,
                scale: btnHovered && !prefersReduced ? 1.03 : 1,
              }}
              whileTap={{ scale: prefersReduced ? 1 : 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="w-[253px] h-[56px] rounded-full relative overflow-hidden bg-[#050505] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2b50ae] cursor-pointer"
              aria-label="Submit contact form"
            >
              {/* Blue fill (#2b50ae) sweeps from left (400ms) */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: btnHovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-[#2b50ae] origin-left z-0"
              />

              {/* Centered content shifts left by 7px on hover; button width remains exactly 253px */}
              <motion.div
                animate={{ x: btnHovered && !prefersReduced && !isSubmitting ? -7 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex items-center justify-center text-white text-[15px] font-medium leading-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
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
                  </div>
                ) : (
                  <>
                    <span>Submit</span>
                    {/* Small arrow slides in to right of label */}
                    <motion.div
                      initial={{ width: 0, marginLeft: 0, opacity: 0 }}
                      animate={{
                        width: btnHovered ? 14 : 0,
                        marginLeft: btnHovered ? 8 : 0,
                        opacity: btnHovered ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden flex items-center"
                    >
                      <svg
                        className="w-[14px] h-[14px] text-white flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </motion.button>
          </motion.div>
        </form>
      )}
    </div>
  );
}
