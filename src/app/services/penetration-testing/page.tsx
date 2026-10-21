import type { Metadata } from "next";
import PenetrationTestingClient from "@/components/penetration-testing/PenetrationTestingClient";

export const metadata: Metadata = {
  title: "Penetration Testing | Securio",
  description:
    "Find vulnerabilities before attackers do with controlled testing, clear evidence, and practical remediation guidance from Securio.",
};

export default function PenetrationTestingPage() {
  return <PenetrationTestingClient />;
}
