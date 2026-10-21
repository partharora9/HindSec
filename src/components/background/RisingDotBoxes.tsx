"use client";

import React, { useEffect, useRef } from "react";
import {
  BoxPatch,
  initPatchesList,
  updatePatchesList,
} from "@/hooks/usePatches";

interface RisingDotBoxesProps {
  parallaxX?: number;
  parallaxY?: number;
}

export default function RisingDotBoxes({
  parallaxX = 0,
  parallaxY = 0,
}: RisingDotBoxesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId: number;
    let lastTimestamp = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;
    let isDocumentVisible = !document.hidden;

    // Smooth cursor tracking (lerp 0.1) for subtle brightening only
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

    // 16px base grid cell size (20px on mobile < 768px)
    let cellSize = 16;
    let patchCount = 18;
    let patches: BoxPatch[] = [];

    function resizeCanvas() {
      if (!container || !canvas || !ctx) return;
      const rect = container.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;

      const isMobile = width < 768;
      cellSize = isMobile ? 20 : 16;
      patchCount = isMobile ? 8 : 18;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Disable any smoothing/blur filters for crisp pixel dots
      ctx.imageSmoothingEnabled = false;

      patches = initPatchesList(width, height, cellSize, patchCount);

      if (prefersReducedMotion) {
        drawFrame(0);
      }
    }

    function drawFrame(timestamp: number) {
      if (!ctx) return;

      const time = timestamp * 0.001; // seconds
      const dt = lastTimestamp ? Math.min((timestamp - lastTimestamp) * 0.001, 0.05) : 0.016;
      lastTimestamp = timestamp;

      // Update patch positions moving upward
      updatePatchesList(
        patches,
        dt,
        time,
        width,
        height,
        cellSize,
        prefersReducedMotion
      );

      ctx.clearRect(0, 0, width, height);

      // Mouse lerp (0.1 smoothing)
      if (!isTouch && targetMouseX > -9000) {
        if (currentMouseX < -9000) {
          currentMouseX = targetMouseX;
          currentMouseY = targetMouseY;
        } else {
          currentMouseX += (targetMouseX - currentMouseX) * 0.1;
          currentMouseY += (targetMouseY - currentMouseY) * 0.1;
        }
      } else {
        currentMouseX = -9999;
        currentMouseY = -9999;
      }

      const totalTravel = height + 100;
      const pLen = patches.length;

      for (let pIdx = 0; pIdx < pLen; pIdx++) {
        const patch = patches[pIdx];
        const patchHeightPx = patch.rows * cellSize;

        // Opacity travel envelope (fades in first 15%, fades out last 25%)
        const travelProgress = Math.max(
          0,
          Math.min(1, (height + 20 - patch.pixelY) / (totalTravel + patchHeightPx))
        );

        let envelope = 1.0;
        if (travelProgress < 0.15) {
          envelope = travelProgress / 0.15;
        } else if (travelProgress > 0.75) {
          envelope = Math.max(0, (1 - travelProgress) / 0.25);
        }

        if (envelope <= 0.01) continue;

        // Light band traveling upward through each patch
        const bandProgress = (time * patch.bandSpeed + patch.bandOffset) % 1.0;
        const bandRow = (1 - bandProgress) * patch.rows;

        const dLen = patch.dots.length;
        for (let dIdx = 0; dIdx < dLen; dIdx++) {
          const dot = patch.dots[dIdx];
          if (!dot.alive) continue;

          // X is locked strictly to 16px grid:
          const x = (patch.colStart + dot.c) * cellSize;
          // Y moves continuously with patch
          const y = patch.pixelY + dot.r * cellSize;

          // Top/bottom bound check
          if (y < -10 || y > height + 10) continue;

          // Vertical mask: faint over black top-left, fades near white bottom
          const relY = y / height;
          const relX = x / width;

          // Extra fade over black top-left area (x < 0.35 && y < 0.35)
          let areaMask = 1.0;
          if (relX < 0.35 && relY < 0.35) {
            areaMask = 0.25 + 0.75 * Math.max(relX / 0.35, relY / 0.35);
          }

          let verticalMask = 1.0;
          if (relY < 0.20) {
            verticalMask = Math.max(0.1, (relY - 0.04) / 0.16);
          } else if (relY > 0.76) {
            verticalMask = Math.max(0.08, 1.0 - (relY - 0.76) / 0.22);
          }

          // 1. Soft twinkle sine wave (0.25 to 0.85)
          const twinkle = prefersReducedMotion
            ? 0.55
            : 0.55 + 0.35 * Math.sin(time * dot.speed + dot.phase);

          // 2. Rising light band ripple
          let lightBandBoost = 0;
          if (!prefersReducedMotion) {
            const distFromBand = Math.abs(dot.r - bandRow);
            if (distFromBand < 1.5) {
              lightBandBoost = Math.pow(1 - distFromBand / 1.5, 1.8) * 0.32;
            }
          }

          // 3. Subtle cursor brightening only (no push, no glow circles)
          let cursorBoost = 0;
          if (!isTouch && currentMouseX > -9000 && !prefersReducedMotion) {
            const dx = x - currentMouseX;
            const dy = y - currentMouseY;
            const dist = Math.hypot(dx, dy);
            if (dist < 140) {
              const proximity = 1 - dist / 140;
              cursorBoost = proximity * 0.35; // gentle brightening only
            }
          }

          const alpha = Math.min(
            1.0,
            Math.max(
              0.08,
              (dot.baseAlpha * twinkle + lightBandBoost + cursorBoost) *
                envelope *
                verticalMask *
                areaMask
            )
          );

          // Solid color draw with fillRect or tiny crisp arc - NO shadowBlur, NO blur, NO glow
          const dotSize = dot.size;
          const drawX = Math.round(x - dotSize / 2);
          const drawY = Math.round(y - dotSize / 2);

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.fillRect(drawX, drawY, dotSize, dotSize);
        }
      }

      if (!prefersReducedMotion && isVisible && isDocumentVisible) {
        rafId = requestAnimationFrame(drawFrame);
      }
    }

    function startAnimation() {
      cancelAnimationFrame(rafId);
      if (!prefersReducedMotion && isVisible && isDocumentVisible) {
        rafId = requestAnimationFrame(drawFrame);
      }
    }

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

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible) {
        lastTimestamp = 0;
        startAnimation();
      } else {
        cancelAnimationFrame(rafId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTimestamp = 0;
          startAnimation();
        } else {
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    resizeCanvas();
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
        transform: `translate3d(${parallaxX * 0.5}px, ${parallaxY * 0.5}px, 0)`,
        transition: "transform 0.2s ease-out",
        // Soft CSS vertical mask as specified: transparent at 0%, black at 25%, black at 75%, transparent at 100%
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" aria-hidden="true" />
    </div>
  );
}
