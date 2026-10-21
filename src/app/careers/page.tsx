import type { Metadata } from "next";
import CareersPageClient from "@/components/careers/CareersPageClient";
import { careersData } from "@/data/careersData";

export const metadata: Metadata = {
  title: "Careers | Securio",
  description:
    "Join a team focused on practical security work, clear thinking, and protecting businesses from real cyber risk. Explore our open remote positions.",
};

export default function CareersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": careersData.map((role) => ({
      "@type": "JobPosting",
      title: role.title,
      description: role.description,
      datePosted: role.datePosted || "2025-01-15",
      validThrough: "2026-12-31T23:59:59Z",
      employmentType: "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        "name": "Securio",
        "sameAs": "https://securio.com",
      },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: {
        "@type": "Country",
        "name": "Worldwide",
      },
      directApply: true,
      url: `https://securio.com/careers#${role.slug}`,
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
