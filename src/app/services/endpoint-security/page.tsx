import type { Metadata } from "next";
import EndpointSecurityClient from "@/components/endpoint-security/EndpointSecurityClient";

export const metadata: Metadata = {
  title: "Endpoint Security | Securio",
  description:
    "Protect every device, user, and access point with endpoint security built to detect threats early and reduce exposure from Securio.",
};

export default function EndpointSecurityPage() {
  return <EndpointSecurityClient />;
}
