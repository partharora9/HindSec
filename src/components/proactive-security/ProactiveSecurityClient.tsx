"use client";

import React from "react";
import ServicePage from "@/components/services/ServicePage";
import { proactiveSecurityData } from "@/data/services/proactiveSecurityData";

export default function ProactiveSecurityClient() {
  return <ServicePage data={proactiveSecurityData} />;
}
