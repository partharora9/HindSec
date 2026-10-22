import type { Metadata } from "next";
import PenetrationTestingClient from "@/components/penetration-testing/PenetrationTestingClient";
import { BRAND_NAME, servicePagesContent } from "@/content/siteContent";

export const metadata: Metadata = {
  title: `Penetration Testing | ${BRAND_NAME}`,
  description: servicePagesContent.penetrationTesting.hero.paragraph,
};

export default function PenetrationTestingPage() {
  return <PenetrationTestingClient />;
}
