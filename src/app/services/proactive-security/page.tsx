import type { Metadata } from "next";
import ProactiveSecurityClient from "@/components/proactive-security/ProactiveSecurityClient";

export const metadata: Metadata = {
  title: "Proactive Security | Securio",
  description:
    "Detect risks earlier, reduce exposure, and strengthen security before threats become incidents with Securio proactive security solutions.",
};

export default function ProactiveSecurityPage() {
  return <ProactiveSecurityClient />;
}
