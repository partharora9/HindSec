import type { Metadata } from "next";
import LegalPageClient from "@/components/legal/LegalPageClient";
import { legalContent, BRAND_NAME } from "@/content/siteContent";

export const metadata: Metadata = {
  title: legalContent.terms.title,
  description: `Terms of service and authorized testing rules of engagement for ${BRAND_NAME} VAPT services.`,
};

export default function TermsPage() {
  const { heading, lastUpdated, intro, sections } = legalContent.terms;
  return (
    <LegalPageClient
      heading={heading}
      lastUpdated={lastUpdated}
      intro={intro}
      sections={sections}
    />
  );
}
