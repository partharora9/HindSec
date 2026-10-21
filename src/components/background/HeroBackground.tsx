"use client";

import React from "react";
import { useMouse } from "@/hooks/useMouse";
import GradientMesh from "./GradientMesh";
import RisingDotBoxes from "./RisingDotBoxes";
import Atmosphere from "./Atmosphere";

export default function HeroBackground() {
  const { parallaxBlobX, parallaxBlobY, parallaxCanvasX, parallaxCanvasY } =
    useMouse();

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: Animated Gradient Mesh (Drifting subtle blobs) */}
      <GradientMesh parallaxX={parallaxBlobX} parallaxY={parallaxBlobY} />

      {/* Layer 2: Rising "Boxes of Dots" (Crisp fine grid, 16px spacing, no blur, no halos) */}
      <RisingDotBoxes parallaxX={parallaxCanvasX} parallaxY={parallaxCanvasY} />

      {/* Layer 3: Atmosphere (Film-grain noise overlay & tiny floating particles) */}
      <Atmosphere />

      {/* Hero Bottom Edge Seam Blend: guaranteed transition to #f0f1f3 */}
      <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-b from-transparent to-[#f0f1f3] z-[2] pointer-events-none" />
    </div>
  );
}
