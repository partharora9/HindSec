import { AboutContentData } from "@/types/about";

export const aboutContent: AboutContentData = {
  hero: {
    label: "ABOUT SECURIO",
    heading: "A security partner built for businesses\nthat need clarity before the next step.",
    photo: {
      src: "/images/about-team.jpg",
      alt: "Securio security consulting team collaborating in open office",
    },
  },
  values: {
    label: "OUR VALUES",
    heading: "The values behind our\nsecurity approach",
    items: [
      {
        id: "integrity",
        title: "Integrity",
        description:
          "We work with clear priorities, honest reporting, and security decisions your team can trust. Every recommendation is grounded in real risk, business context, and what your environment actually needs.",
      },
      {
        id: "reliability",
        title: "Reliability",
        description:
          "We build security processes that work in daily operations, not only on paper. Your team gets consistent protection, clear ownership, and support that helps you respond with confidence.",
      },
      {
        id: "transparency",
        title: "Transparency",
        description:
          "We make risks, alerts, and actions easy to understand. Your team gets clear visibility into what is happening, why it matters, and what should happen next.",
      },
      {
        id: "resilience",
        title: "Resilience",
        description:
          "We help your business prepare for threats, recover faster, and keep critical systems protected as conditions change. The goal is security that holds up under pressure.",
      },
    ],
  },
  philosophy: {
    label: "PHILOSOPHY",
    heading: "We make complexity feel\nsimple",
    paragraphs: [
      "Cybersecurity can be difficult to manage when tools, alerts, risks, and responsibilities are spread across different teams. We help turn that complexity into a clear security approach your business can understand and act on.",
      "Our work focuses on practical protection, clear communication, and security decisions tied to real business needs. Your team gets stronger visibility, better control, and a partner who keeps the process focused.",
    ],
  },
  team: {
    label: "MEET THE TEAM",
    heading: "Experts in security &\ncompliance",
    members: [
      {
        name: "Alex Roberson",
        role: "Managing partner",
        image: "/images/team-alex.jpg",
      },
      {
        name: "Kamila Grey",
        role: "Head of Infrastructure",
        image: "/images/team-kamila.jpg",
      },
      {
        name: "Bill Dalton",
        role: "Lead Security Engineer",
        image: "/images/team-bill.jpg",
      },
      {
        name: "Andy Stevenson",
        role: "Client Success Manager",
        image: "/images/team-andy.jpg",
      },
    ],
  },
};
