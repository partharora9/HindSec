"use client";

import React from "react";
import ServicePage from "@/components/services/ServicePage";
import { applicationSecurityData } from "@/data/services/applicationSecurityData";

export default function ApplicationSecurityClient() {
  return <ServicePage data={applicationSecurityData} />;
}
