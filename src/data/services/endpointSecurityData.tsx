import React from "react";
import { ServicePageData } from "@/types/service";
import HalftoneDotsCanvas from "@/components/endpoint-security/HalftoneDotsCanvas";
import {
  MonitorPhoneIcon,
  RadarSweepIcon,
  PadlockIcon,
  SortArrowIcon,
  ShieldExclamationIcon,
  PeopleIcon,
  ShieldHalfIcon,
} from "@/components/icons/EndpointIcons";

export const endpointSecurityData: ServicePageData = {
  hero: {
    title: "Endpoint Security",
    paragraph: (
      <>
        Protect every device, user, and access point with endpoint security built to{" "}
        <br className="hidden sm:inline" />
        detect threats early and reduce exposure.
      </>
    ),
    background: <HalftoneDotsCanvas />,
  },
  cards: [
    {
      id: "device-protection",
      title: "Device protection",
      description:
        "Secure laptops, desktops, and user devices with controls that reduce malware, misuse, and unauthorized access.",
      icon: (isHovered, isInView, delay = 0) => (
        <MonitorPhoneIcon isHovered={isHovered} isInView={isInView} delay={delay} />
      ),
    },
    {
      id: "endpoint-detection-response",
      title: "Endpoint detection and response",
      description:
        "Detect suspicious activity on endpoints, investigate threats faster, and respond before incidents spread.",
      icon: (isHovered, isInView, delay = 0) => (
        <RadarSweepIcon isHovered={isHovered} isInView={isInView} delay={delay} />
      ),
    },
    {
      id: "patch-policy-control",
      title: "Patch and policy control",
      description:
        "Keep devices aligned with security policies, patch priorities, and protection standards across your environment.",
      icon: (isHovered, isInView, delay = 0) => (
        <PadlockIcon isHovered={isHovered} isInView={isInView} delay={delay} />
      ),
    },
  ],
  whatIs: {
    heading: "What Is Endpoint Security?",
    paragraphs: [
      "Endpoint Security protects the devices your team uses every day, including laptops, desktops, and remote workstations. These devices are common entry points for malware, phishing, account misuse, and unauthorized access.",
      "Securio helps businesses improve endpoint visibility, strengthen device controls, and respond faster when suspicious activity appears. The goal is to reduce risk at the user and device level before threats reach critical systems.",
    ],
    checklistLabel: "WITH ENDPOINT SECURITY, YOU CAN:",
    checklist: [
      "Protect business devices",
      "Detect endpoint threats earlier",
      "Reduce malware and misuse risk",
      "Improve remote work security",
      "Strengthen policy and patch control",
    ],
  },
  delivery: {
    heading: (
      <>
        How Do We Deliver
        <br />
        Endpoint Security?
      </>
    ),
    items: [
      {
        number: 1,
        title: "Secure every device",
        description:
          "We help protect endpoints with the right controls, visibility, and policies across your business devices and user environments.",
      },
      {
        number: 2,
        title: "Detect endpoint threats",
        description:
          "We monitor device activity, review alerts, and identify suspicious behavior before it can spread across your systems.",
      },
      {
        number: 3,
        title: "Respond before spread",
        description:
          "We help contain threats, reduce impact, and support faster response when endpoint activity needs attention.",
      },
    ],
    photo: {
      src: "/images/endpoint-delivery.jpg",
      alt: "Securio security engineer analyzing endpoint telemetry across multi-monitor workstation",
      fallbackGradient: "bg-gradient-to-br from-[#1c2c4a] via-[#121c2e] to-[#0a101b]",
    },
  },
  testimonialAuthor: {
    name: "John Lee",
    role: "CEO, Tech Innovations",
    className: "text-[22px] font-normal text-[#0a0a0a]",
  },
  outcomes: [
    {
      id: "safer-user-devices",
      title: "Safer user devices",
      description:
        "Protect laptops, desktops, and workstations from malware, misuse, and unauthorized access.",
      icon: (isHovered, isInView, delay = 0) => (
        <MonitorPhoneIcon isHovered={isHovered} isInView={isInView} delay={delay} />
      ),
    },
    {
      id: "reduced-malware-risk",
      title: "Reduced malware risk",
      description:
        "Detect suspicious files, behaviors, and activity before they create wider business impact.",
      icon: (isHovered, isInView, delay = 0) => (
        <SortArrowIcon isHovered={isHovered} isInView={isInView} delay={delay} />
      ),
    },
    {
      id: "centralized-device-control",
      title: "Centralized device control",
      description:
        "Manage endpoint security policies, visibility, and response across distributed teams and systems.",
      icon: (isHovered, isInView, delay = 0) => (
        <PadlockIcon isHovered={isHovered} isInView={isInView} delay={delay} />
      ),
    },
    {
      id: "faster-incident-response",
      title: "Faster incident response",
      description:
        "Investigate endpoint alerts faster and take action before threats move further into your environment.",
      icon: (isHovered, isInView, delay = 0) => (
        <ShieldExclamationIcon isHovered={isHovered} isInView={isInView} delay={delay} />
      ),
    },
    {
      id: "stronger-remote-work-security",
      title: (
        <>
          Stronger remote work
          <br />
          security
        </>
      ),
      description:
        "Protect users and devices outside the office with controls built for modern work environments.",
      icon: (isHovered, isInView, delay = 0) => (
        <PeopleIcon isHovered={isHovered} isInView={isInView} delay={delay} />
      ),
    },
    {
      id: "cleaner-compliance-readiness",
      title: (
        <>
          Cleaner compliance
          <br />
          readiness
        </>
      ),
      description:
        "Support security reviews with better device visibility, policy control, and documented protection.",
      icon: (isHovered, isInView, delay = 0) => (
        <ShieldHalfIcon isHovered={isHovered} isInView={isInView} delay={delay} />
      ),
    },
  ],
};

export default endpointSecurityData;
