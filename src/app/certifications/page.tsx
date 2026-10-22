import type { Metadata } from "next";
import CertificationsPageClient from "@/components/certifications/CertificationsPageClient";
import { BRAND_NAME, certificationsContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: `Certifications & Standards | ${BRAND_NAME}`,
  description: `${certificationsContent.heading} — ${certificationsContent.subtitle}`,
};

export default function CertificationsPage() {
  return <CertificationsPageClient />;
}
