"use client";

import React from "react";
import ServicePage from "@/components/services/ServicePage";
import { endpointSecurityData } from "@/data/services/endpointSecurityData";

export default function EndpointSecurityClient() {
  return <ServicePage data={endpointSecurityData} />;
}
