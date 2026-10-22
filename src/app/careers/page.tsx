import type { Metadata } from "next";
import CareersPageClient from "@/components/careers/CareersPageClient";
import { BRAND_NAME, siteMetadata, careersContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: `Careers | ${BRAND_NAME}`,
  description:
    `Join a team focused on real offensive security impact, vulnerability research, and practical defense. Explore open VAPT roles at ${BRAND_NAME}.`,
};

export default function CareersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": careersContent.openRoles.map((role) => ({
      "@type": "JobPosting",
      title: role.title,
      description: role.description,
      datePosted: role.datePosted || "2025-01-15",
      validThrough: "2026-12-31T23:59:59Z",
      employmentType: "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        "name": BRAND_NAME,
        "sameAs": siteMetadata.siteUrl,
      },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: {
        "@type": "Country",
        "name": "Worldwide",
      },
      directApply: true,
      url: `${siteMetadata.siteUrl}/careers#${role.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareersPageClient />
    </>
  );
}
