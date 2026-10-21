"use client";

import React from "react";
import ServicePage from "@/components/services/ServicePage";
import { penetrationTestingData } from "@/data/services/penetrationTestingData";

export default function PenetrationTestingClient() {
  return <ServicePage data={penetrationTestingData} />;
}
