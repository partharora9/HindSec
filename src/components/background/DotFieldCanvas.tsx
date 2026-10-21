"use client";

import React, { useEffect, useRef } from "react";

interface DotItem {
  baseX: number;
  baseY: number;
  currentX: number;
  currentY: number;
  isHero: boolean;
  phase: number;
  speed: number;
  diagDist: number;
}

interface DotFieldCanvasProps {
  parallaxX?: number;
  parallaxY?: number;
}

export default function DotFieldCanvas({
  parallaxX = 0,
  parallaxY = 0,
}: DotFieldCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId: number;
    let width = 0;
    let height = 0;
    let isVisible = true;
    let isDocumentVisible = !document.hidden;

    // Mouse & Touch coordinates
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let currentMouseX = -9999;
    let currentMouseY = -9999;

    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Pre-allocated dots array (never re-allocated inside requestAnimationFrame)
    let dots: DotItem[] = [];

    function rebuildGrid() {
      if (!container || !canvas || !ctx) return;
      const rect = container.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // 136px grid spacing (reduced slightly on mobile screens < 768px)
      const spacing = width < 768 ? 96 : 136;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offsetX = (width % spacing) / 2;
      const offsetY = (height % spacing) / 2;

      dots = [];
      const totalDiagonal = width + height || 1;

      for (let r = 0; r < rows; r++) {
        const y = offsetY + r * spacing;
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * spacing;

          // Deterministic hash based on grid coordinate
          const hash = (((c * 7919) ^ (r * 6271)) >>> 0) % 10000 / 10000;
          // ~12% are "hero dots"
          const isHero = hash < 0.12;
          const phase = hash * Math.PI * 2;
          const speed = 0.7 + (hash * 100 % 10) * 0.14; // gentle diverse twinkle speed
          const diagDist = (x + y) / totalDiagonal;

          dots.push({
            baseX: x,
            baseY: y,
            currentX: x,
            currentY: y,
            isHero,
            phase,
            speed,
            diagDist,
          });
        }
      }

      if (prefersReducedMotion) {
        renderFrame(0);
      }
    }

    // Single requestAnimationFrame loop
    function renderFrame(timestamp: number) {
      if (!ctx) return;
      const time = timestamp * 0.001; // seconds

      ctx.clearRect(0, 0, width, height);

      // Determine active cursor coordinates
      let activeCursorX = -9999;
      let activeCursorY = -9999;

      if (isTouch && !prefersReducedMotion) {
        // Automatic roaming light on slow Lissajous path for touch screens
        activeCursorX = width / 2 + width * 0.35 * Math.sin(time * 0.45);
        activeCursorY = height / 2 + height * 0.28 * Math.sin(time * 0.65 + 1.2);
      } else if (targetMouseX > -9000) {
        if (currentMouseX < -9000) {
          currentMouseX = targetMouseX;
          currentMouseY = targetMouseY;
        } else {
          // Lerp smoothing (0.08)
          currentMouseX += (targetMouseX - currentMouseX) * 0.08;
          currentMouseY += (targetMouseY - currentMouseY) * 0.08;
        }
        activeCursorX = currentMouseX;
        activeCursorY = currentMouseY;
      } else {
        currentMouseX = -9999;
        currentMouseY = -9999;
      }

      // Faint radial light following cursor
      if (activeCursorX > -9000 && !prefersReducedMotion) {
        const radGrad = ctx.createRadialGradient(
          activeCursorX,
          activeCursorY,
          0,
          activeCursorX,
          activeCursorY,
          180
        );
        radGrad.addColorStop(0, "rgba(135, 185, 255, 0.14)");
        radGrad.addColorStop(0.5, "rgba(100, 150, 240, 0.06)");
        radGrad.addColorStop(1, "rgba(100, 150, 240, 0)");
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(activeCursorX, activeCursorY, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shimmer wave sweeps every ~7s from top-left to bottom-right
      const shimmerPeriod = 7.0;
      const waveCycle = (time % shimmerPeriod) / shimmerPeriod; // 0 to 1
      const waveFront = waveCycle * 1.35 - 0.15; // smooth entry and exit
      const waveBandWidth = 0.18;

      const dotCount = dots.length;
      for (let i = 0; i < dotCount; i++) {
        const dot = dots[i];

        // 1. Twinkle (sine wave modulating between 0.15 and 0.9)
        const twinkleFactor = prefersReducedMotion
          ? 0.45
          : 0.525 + 0.375 * Math.sin(time * dot.speed + dot.phase);

        // 2. Shimmer Wave Boost
        let shimmerBoost = 0;
        if (!prefersReducedMotion) {
          const distToWave = Math.abs(dot.diagDist - waveFront);
          if (distToWave < waveBandWidth) {
            shimmerBoost = Math.pow(1 - distToWave / waveBandWidth, 1.8) * 0.42;
          }
        }

        // 3. Cursor Interaction (within 180px: brighten, grow up to 2x, push away up to 14px)
        let targetX = dot.baseX;
        let targetY = dot.baseY;
        let cursorGlow = 0;
        let sizeMultiplier = 1;

        if (activeCursorX > -9000 && !prefersReducedMotion) {
          const dx = dot.baseX - activeCursorX;
          const dy = dot.baseY - activeCursorY;
          const dist = Math.hypot(dx, dy);

          if (dist < 180) {
            const proximity = 1 - dist / 180;
            const easePush = Math.pow(proximity, 2) * 14; // up to 14px push with easing
            const angle = Math.atan2(dy, dx);
            targetX = dot.baseX + Math.cos(angle) * easePush;
            targetY = dot.baseY + Math.sin(angle) * easePush;
            cursorGlow = proximity * 0.55;
            sizeMultiplier = 1 + proximity * 0.95; // up to 2x growth
          }
        }

        // Spring back smoothly
        dot.currentX += (targetX - dot.currentX) * 0.15;
        dot.currentY += (targetY - dot.currentY) * 0.15;

        // Base dot radii: regular 1.6px, hero dots 2.5px
        const baseRadius = dot.isHero ? 2.5 : 1.6;
        const currentRadius = baseRadius * sizeMultiplier;

        // Base opacity: regular ~35%, hero dots slightly brighter
        const baseOpacity = dot.isHero ? 0.55 : 0.35;
        const totalOpacity = Math.min(
          1.0,
          Math.max(0.12, baseOpacity * twinkleFactor + shimmerBoost + cursorGlow)
        );

        // Draw Hero Dot Halo Glow
        if (dot.isHero) {
          const haloRadius = currentRadius * 3.2;
          ctx.beginPath();
          ctx.arc(dot.currentX, dot.currentY, haloRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 215, 255, ${(totalOpacity * 0.28).toFixed(3)})`;
          ctx.fill();
        }

        // Draw Dot Core
        ctx.beginPath();
        ctx.arc(dot.currentX, dot.currentY, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${totalOpacity.toFixed(3)})`;
        ctx.fill();
      }

      if (!prefersReducedMotion && isVisible && isDocumentVisible) {
        rafId = requestAnimationFrame(renderFrame);
      }
    }

    function startAnimation() {
      cancelAnimationFrame(rafId);
      if (!prefersReducedMotion && isVisible && isDocumentVisible) {
        rafId = requestAnimationFrame(renderFrame);
      }
    }

    // Passive mouse listeners
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      rebuildGrid();
    });
    resizeObserver.observe(container);

    // VisibilityChange: pause RAF loop when tab hidden
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible) {
        startAnimation();
      } else {
        cancelAnimationFrame(rafId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // IntersectionObserver: pause RAF loop when hero is off-screen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startAnimation();
        } else {
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    rebuildGrid();
    startAnimation();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-[1]"
      style={{
        transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        transition: "transform 0.15s ease-out",
        // Mask canvas so dots fade out smoothly at the bottom (last 20%) as background turns bright
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 98%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 98%)",
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" aria-hidden="true" />
    </div>
  );
}
