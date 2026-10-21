"use client";

import React, { useRef, useEffect } from "react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

interface Bar {
  x: number;
  y: number;
  baseH: number;
  w: number;
  color: string;
  r: number;
  g: number;
  b: number;
  baseAlpha: number;
  speed: number;
  phase: number;
  cluster: number; // 1: main, 2: upper-mid, 3: small, 4: teal, 7: bottom
}

interface Ray {
  angle: number;
  length: number;
  width: number;
  speed: number;
  phase: number;
  baseAlpha: number;
}

export default function DigitalBarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useSafeReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let isVisible = true;
    let width = container.clientWidth || 1900;
    let height = container.clientHeight || 605;

    // Mouse tracking
    let mouseX = -9999;
    let mouseY = -9999;
    let coreX = 1500;
    let coreY = 395;
    let targetCoreX = 1500;
    let targetCoreY = 395;

    // Create Bars from Seeded Data
    const bars: Bar[] = [];

    // Helper random seeded function
    let seed = 42;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    // 1. MAIN Cluster (x=1250 to 1850, y=320 to 440)
    // Bars are bright electric blue to white (#2f6bff to #cfe4ff)
    for (let x = 1250; x <= 1850; x += 9) {
      const distToCore = Math.abs(x - 1500);
      const isNearCore = distToCore < 90;
      const baseH = isNearCore
        ? 80 + pseudoRandom() * 45
        : 45 + pseudoRandom() * 60;
      const t = pseudoRandom();
      // Near core: closer to white #cfe4ff, outer: electric blue #2f6bff
      const r = isNearCore ? 180 + Math.floor(t * 70) : 47 + Math.floor(t * 80);
      const g = isNearCore ? 210 + Math.floor(t * 45) : 107 + Math.floor(t * 80);
      const b = 255;
      const color = `rgb(${r},${g},${b})`;
      const baseAlpha = isNearCore ? 0.95 : 0.65 + pseudoRandom() * 0.3;

      bars.push({
        x,
        y: 380,
        baseH,
        w: 3.5,
        color,
        r,
        g,
        b,
        baseAlpha,
        speed: 1.8 + pseudoRandom() * 2.2,
        phase: pseudoRandom() * Math.PI * 2,
        cluster: 1,
      });
    }

    // 2. Upper-middle cluster (x=760 to 1060, y=70 to 185, #5d7aa8 at 35%)
    for (let x = 760; x <= 1060; x += 10) {
      const baseH = 25 + pseudoRandom() * 50;
      bars.push({
        x,
        y: 125,
        baseH,
        w: 3,
        color: "rgb(93, 122, 168)",
        r: 93,
        g: 122,
        b: 168,
        baseAlpha: 0.32 + pseudoRandom() * 0.1,
        speed: 0.5 + pseudoRandom() * 0.5,
        phase: pseudoRandom() * Math.PI * 2,
        cluster: 2,
      });
    }

    // 3. Small clusters
    // x=590 to 660, y=150 to 250 (grey-blue, 30%)
    for (let x = 590; x <= 660; x += 9) {
      bars.push({
        x,
        y: 200,
        baseH: 30 + pseudoRandom() * 40,
        w: 3,
        color: "rgb(105, 130, 170)",
        r: 105,
        g: 130,
        b: 170,
        baseAlpha: 0.3,
        speed: 0.6 + pseudoRandom() * 0.6,
        phase: pseudoRandom() * Math.PI * 2,
        cluster: 3,
      });
    }

    // x=1440 to 1575, y=145 to 225 (blue, 45%)
    for (let x = 1440; x <= 1575; x += 8) {
      bars.push({
        x,
        y: 185,
        baseH: 25 + pseudoRandom() * 35,
        w: 3,
        color: "rgb(60, 120, 240)",
        r: 60,
        g: 120,
        b: 240,
        baseAlpha: 0.45,
        speed: 0.9 + pseudoRandom() * 0.8,
        phase: pseudoRandom() * Math.PI * 2,
        cluster: 3,
      });
    }

    // x=1450 to 1570, y=450 to 540 (blue, 30%)
    for (let x = 1450; x <= 1570; x += 9) {
      bars.push({
        x,
        y: 495,
        baseH: 25 + pseudoRandom() * 35,
        w: 3,
        color: "rgb(50, 110, 230)",
        r: 50,
        g: 110,
        b: 230,
        baseAlpha: 0.3,
        speed: 0.8 + pseudoRandom() * 0.7,
        phase: pseudoRandom() * Math.PI * 2,
        cluster: 3,
      });
    }

    // x=620 to 700, y=0 to 100
    for (let x = 620; x <= 700; x += 10) {
      bars.push({
        x,
        y: 50,
        baseH: 20 + pseudoRandom() * 30,
        w: 3,
        color: "rgb(85, 115, 160)",
        r: 85,
        g: 115,
        b: 160,
        baseAlpha: 0.25,
        speed: 0.5 + pseudoRandom() * 0.5,
        phase: pseudoRandom() * Math.PI * 2,
        cluster: 3,
      });
    }

    // 4. TEAL Cluster (x=700 to 890, y=195 to 310, bright cyan-teal #3fe0d0 to #1aa6b8)
    for (let x = 700; x <= 890; x += 9) {
      const t = pseudoRandom();
      const r = Math.floor(26 + t * 37);
      const g = Math.floor(166 + t * 58);
      const b = Math.floor(184 + t * 24);
      bars.push({
        x,
        y: 250,
        baseH: 35 + pseudoRandom() * 55,
        w: 3.5,
        color: `rgb(${r},${g},${b})`,
        r,
        g,
        b,
        baseAlpha: 0.75 + pseudoRandom() * 0.2,
        speed: 1.2 + pseudoRandom() * 1.5,
        phase: pseudoRandom() * Math.PI * 2,
        cluster: 4,
      });
    }

    // 7. Bottom Bars (y=570 to 605, x=570 to 690 & x=900 to 1150)
    for (let x = 570; x <= 690; x += 11) {
      bars.push({
        x,
        y: 588,
        baseH: 15 + pseudoRandom() * 20,
        w: 3,
        color: "rgb(65, 125, 230)",
        r: 65,
        g: 125,
        b: 230,
        baseAlpha: 0.45,
        speed: 0.7 + pseudoRandom() * 0.8,
        phase: pseudoRandom() * Math.PI * 2,
        cluster: 7,
      });
    }
    for (let x = 900; x <= 1150; x += 10) {
      bars.push({
        x,
        y: 588,
        baseH: 14 + pseudoRandom() * 22,
        w: 3,
        color: "rgb(55, 115, 220)",
        r: 55,
        g: 115,
        b: 220,
        baseAlpha: 0.4,
        speed: 0.6 + pseudoRandom() * 0.7,
        phase: pseudoRandom() * Math.PI * 2,
        cluster: 7,
      });
    }

    // Create 36 Lens Flare Rays for Main Core
    const rays: Ray[] = [];
    for (let i = 0; i < 36; i++) {
      // bias towards upper-left (around 135 deg / 2.35 rad) and right (around 0 rad)
      const baseAngle = (i / 36) * Math.PI * 2;
      const angle = baseAngle + (pseudoRandom() - 0.5) * 0.15;
      // Ray lengths: 350 to 520px
      const length = 320 + pseudoRandom() * 190;
      const rayWidth = 0.8 + pseudoRandom() * 1.8;
      rays.push({
        angle,
        length,
        width: rayWidth,
        speed: 1.2 + pseudoRandom() * 2.0,
        phase: pseudoRandom() * Math.PI * 2,
        baseAlpha: 0.25 + pseudoRandom() * 0.45,
      });
    }

    // Pre-render core bloom halo sprite on offscreen canvas
    const bloomCanvas = document.createElement("canvas");
    bloomCanvas.width = 440;
    bloomCanvas.height = 440;
    const bloomCtx = bloomCanvas.getContext("2d");
    if (bloomCtx) {
      const grad = bloomCtx.createRadialGradient(220, 220, 0, 220, 220, 220);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      grad.addColorStop(0.12, "rgba(200, 225, 255, 0.85)");
      grad.addColorStop(0.35, "rgba(47, 107, 255, 0.45)");
      grad.addColorStop(0.7, "rgba(26, 63, 208, 0.12)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      bloomCtx.fillStyle = grad;
      bloomCtx.beginPath();
      bloomCtx.arc(220, 220, 220, 0, Math.PI * 2);
      bloomCtx.fill();
    }

    // Pre-render teal glow sprite
    const tealCanvas = document.createElement("canvas");
    tealCanvas.width = 360;
    tealCanvas.height = 360;
    const tealCtx = tealCanvas.getContext("2d");
    if (tealCtx) {
      const grad = tealCtx.createRadialGradient(180, 180, 0, 180, 180, 180);
      grad.addColorStop(0, "rgba(63, 224, 208, 0.4)");
      grad.addColorStop(0.5, "rgba(26, 166, 184, 0.15)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      tealCtx.fillStyle = grad;
      tealCtx.beginPath();
      tealCtx.arc(180, 180, 180, 0, Math.PI * 2);
      tealCtx.fill();
    }

    // Resize handling with devicePixelRatio cap at 2
    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth || 1900;
      height = container.clientHeight || 605;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const scaleX = 1900 / rect.width;
      mouseX = (e.clientX - rect.left) * scaleX;
      mouseY = e.clientY - rect.top;

      // Target core shift toward cursor by up to 40px
      const deltaX = Math.max(-40, Math.min(40, (mouseX - 1500) * 0.08));
      const deltaY = Math.max(-25, Math.min(25, (mouseY - 400) * 0.08));
      targetCoreX = 1500 + deltaX;
      targetCoreY = 395 + deltaY;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      targetCoreX = 1500;
      targetCoreY = 395;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Visibility and Intersection observers
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(container);

    // Entrance animation progress (bars grow from height 0 over 1.4s)
    let startTime = performance.now();

    // Render loop
    const render = (now: number) => {
      if (!isVisible) {
        animationId = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - startTime) / 1000;
      const scaleCoord = width / 1900;

      // Lerp core position toward target
      coreX += (targetCoreX - coreX) * 0.06;
      coreY += (targetCoreY - coreY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Background Glows (Additive blending)
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // Ambient radial deep blue glow at core
      const deepBlueGrad = ctx.createRadialGradient(
        coreX * scaleCoord,
        coreY,
        0,
        coreX * scaleCoord,
        coreY,
        420 * scaleCoord
      );
      deepBlueGrad.addColorStop(0, "rgba(26, 63, 208, 0.45)");
      deepBlueGrad.addColorStop(0.5, "rgba(18, 48, 180, 0.2)");
      deepBlueGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = deepBlueGrad;
      ctx.fillRect(0, 0, width, height);

      // Soft cyan glow behind teal cluster
      // Teal flicker: brief 0.6s flicker every 7s
      const tealCycle = elapsed % 7.5;
      let tealFlicker = 1;
      if (tealCycle > 6.2 && tealCycle < 6.8) {
        tealFlicker = 0.55 + Math.sin((tealCycle - 6.2) * 10) * 0.45;
      }
      ctx.globalAlpha = tealFlicker;
      ctx.drawImage(
        tealCanvas,
        (790 - 180) * scaleCoord,
        250 - 180,
        360 * scaleCoord,
        360
      );
      ctx.restore();

      // 2. Scan Wave (every 8s, moves left to right)
      const scanPeriod = 8.0;
      const scanCycle = elapsed % scanPeriod;
      const scanProgress = scanCycle / 2.8; // wave crosses in first 2.8s of the 8s period
      const scanX = scanProgress <= 1 ? -150 + scanProgress * 2200 : -9999;

      // 3. Draw Digital Signal Bars
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      const isMobile = width < 900;
      const step = isMobile ? 2 : 1;

      for (let i = 0; i < bars.length; i += step) {
        const bar = bars[i];
        const screenX = bar.x * scaleCoord;

        // Equalizer height pulse
        const sineVal = Math.sin(elapsed * bar.speed + bar.phase);
        let heightFactor =
          bar.cluster === 1
            ? 0.5 + 0.5 * sineVal // main cluster pulses 50% to 100%
            : 0.7 + 0.3 * sineVal; // other clusters pulse 70% to 100%

        // Stagger entrance over 1.4s from left to right
        const entranceDelay = (bar.x / 1900) * 1.4;
        const entranceProgress = Math.max(0, Math.min(1, (elapsed - entranceDelay) / 0.5));
        heightFactor *= entranceProgress;

        // Proximity to cursor (< 220px)
        let cursorBoost = 0;
        if (mouseX > 0) {
          const distToMouse = Math.abs(bar.x - mouseX);
          if (distToMouse < 220) {
            cursorBoost = (1 - distToMouse / 220) * 0.4;
          }
        }

        // Scan wave boost
        let scanBoost = 0;
        if (scanX > 0) {
          const distToScan = Math.abs(bar.x - scanX);
          if (distToScan < 80) {
            scanBoost = (1 - distToScan / 80) * 0.5;
          }
        }

        let currentH = bar.baseH * (heightFactor + cursorBoost);
        if (prefersReduced) currentH = bar.baseH;

        let alpha = Math.min(1, bar.baseAlpha + cursorBoost * 0.5 + scanBoost);
        if (bar.cluster === 4) {
          alpha *= tealFlicker;
        }

        ctx.fillStyle = `rgba(${bar.r}, ${bar.g}, ${bar.b}, ${alpha})`;

        const drawY = bar.y - currentH / 2;
        ctx.fillRect(screenX, drawY, bar.w * scaleCoord, currentH);
      }
      ctx.restore();

      // 4. Draw Main Core Lens-Flare Rays & Bloom Core (width >= 600)
      if (width >= 600) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Lens-flare rays: slowly rotating (+/-6deg, 20s) if motion allowed
        const rayRotation = prefersReduced ? 0 : Math.sin(elapsed * 0.3) * 0.1;
        const coreScreenX = coreX * scaleCoord;
        const coreScreenY = coreY;

        // Long thin anamorphic horizontal flare streak through the core
        const streakGrad = ctx.createLinearGradient(
          coreScreenX - 450 * scaleCoord,
          coreScreenY,
          coreScreenX + 450 * scaleCoord,
          coreScreenY
        );
        streakGrad.addColorStop(0, "rgba(47, 107, 255, 0)");
        streakGrad.addColorStop(0.3, "rgba(90, 160, 255, 0.4)");
        streakGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.95)");
        streakGrad.addColorStop(0.7, "rgba(90, 160, 255, 0.4)");
        streakGrad.addColorStop(1, "rgba(47, 107, 255, 0)");
        ctx.fillStyle = streakGrad;
        ctx.fillRect(coreScreenX - 450 * scaleCoord, coreScreenY - 1.5, 900 * scaleCoord, 3);

        // Radiant lens-flare rays
        for (let i = 0; i < rays.length; i++) {
          const ray = rays[i];
          const curAngle = ray.angle + rayRotation;
          const shimmer = prefersReduced ? 1 : 0.7 + 0.3 * Math.sin(elapsed * ray.speed + ray.phase);
          const rayLen = ray.length * scaleCoord;

          const endX = coreScreenX + Math.cos(curAngle) * rayLen;
          const endY = coreScreenY + Math.sin(curAngle) * rayLen;

          const rayGrad = ctx.createLinearGradient(coreScreenX, coreScreenY, endX, endY);
          rayGrad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, ray.baseAlpha * 1.5 * shimmer)})`);
          rayGrad.addColorStop(0.2, `rgba(190, 230, 255, ${Math.min(1, ray.baseAlpha * 1.1 * shimmer)})`);
          rayGrad.addColorStop(0.5, `rgba(47, 107, 255, ${ray.baseAlpha * 0.6 * shimmer})`);
          rayGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.strokeStyle = rayGrad;
          ctx.lineWidth = (ray.width + 0.5) * scaleCoord;
          ctx.beginPath();
          ctx.moveTo(coreScreenX, coreScreenY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }

        // Bloom halo: breathing +/-15%, 4s cycle if motion allowed
        const breathe = prefersReduced ? 1 : 1 + 0.15 * Math.sin(elapsed * (Math.PI * 2 / 4));
        const bloomSize = 520 * scaleCoord * breathe;
        ctx.drawImage(
          bloomCanvas,
          coreScreenX - bloomSize / 2,
          coreScreenY - bloomSize / 2,
          bloomSize,
          bloomSize
        );

        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden bg-[#02030c]"
      style={{
        // Vignette darkening to black at left edge (x < 300) so heading stays readable,
        // and mask fading to black near top for navbar
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Deep blue ambient glow centered around x=1500, y=400 */}
      <div
        className="absolute top-0 right-0 w-[950px] h-[580px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 65% 68%, rgba(47, 107, 255, 0.45) 0%, rgba(26, 63, 208, 0.22) 45%, transparent 75%)",
          filter: "blur(45px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Bokeh out-of-focus lower-left blocks:
          x=350 to 530, y=440 to 560
          x=590 to 700, y=450 to 530
          x=800 to 900, y=440 to 500
          wide, heavily blurred (18 to 24px) steel-blue rectangles at 25-35% opacity drifting translateX +/-30px */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1900px] h-full pointer-events-none">
        <div
          className="absolute rounded-none"
          style={{
            left: "350px",
            top: "440px",
            width: "180px",
            height: "120px",
            background: "rgba(35, 75, 140, 0.32)",
            filter: "blur(22px)",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute rounded-none"
          style={{
            left: "590px",
            top: "450px",
            width: "110px",
            height: "80px",
            background: "rgba(40, 85, 160, 0.28)",
            filter: "blur(20px)",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute rounded-none"
          style={{
            left: "800px",
            top: "440px",
            width: "100px",
            height: "60px",
            background: "rgba(35, 75, 140, 0.25)",
            filter: "blur(20px)",
            mixBlendMode: "screen",
          }}
        />

        {/* Blurred blue blocks on right edge: x=1730 to 1830, y=140 to 290 (#2347e0 at 50%) */}
        <div
          className="absolute rounded-none"
          style={{
            left: "1730px",
            top: "140px",
            width: "100px",
            height: "150px",
            background: "rgba(35, 71, 224, 0.5)",
            filter: "blur(24px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Film grain noise overlay (3%) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)",
          opacity: 0.45,
          mixBlendMode: "overlay",
        }}
      />

      {/* Left vignette mask for heading readability */}
      <div
        className="absolute inset-y-0 left-0 w-[420px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(2, 3, 12, 0.95) 0%, rgba(2, 3, 12, 0.7) 45%, transparent 100%)",
        }}
      />
    </div>
  );
}
