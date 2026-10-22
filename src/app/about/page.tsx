import type { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

import { BRAND_NAME } from "@/content/siteContent";

export const metadata: Metadata = {
  title: `About Us | ${BRAND_NAME}`,
  description:
    `A VAPT partner built for teams that want proof, not just alerts. Learn about ${BRAND_NAME}'s offensive security approach, values, and team.`,
};

export default function AboutPage() {
  return <AboutPageClient />;
}
