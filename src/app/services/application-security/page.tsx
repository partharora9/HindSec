import type { Metadata } from "next";
import ApplicationSecurityClient from "@/components/application-security/ApplicationSecurityClient";
import { BRAND_NAME, servicePagesContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: `Application & API Security | ${BRAND_NAME}`,
  description: servicePagesContent.applicationSecurity.hero.paragraph,
};

export default function ApplicationSecurityPage() {
  return <ApplicationSecurityClient />;
}
