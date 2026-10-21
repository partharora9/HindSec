import type { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About | Securio",
  description:
    "A security partner built for businesses that need clarity before the next step. Learn about Securio's mission, values, and security team.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
