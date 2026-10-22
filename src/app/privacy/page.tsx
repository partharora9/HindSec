import type { Metadata } from "next";
import LegalPageClient from "@/components/legal/LegalPageClient";
import { legalContent, BRAND_NAME } from "@/content/siteContent";

export const metadata: Metadata = {
  title: legalContent.privacy.title,
  description: `Privacy policy for ${BRAND_NAME} VAPT services website. Cookie-free and client-confidential.`,
};

export default function PrivacyPage() {
  const { heading, lastUpdated, intro, sections } = legalContent.privacy;
  return (
    <LegalPageClient
      heading={heading}
      lastUpdated={lastUpdated}
      intro={intro}
      sections={sections}
    />
  );
}
