"use client";

import React, { useEffect, useRef } from "react";

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for spotlight & repulsion
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let currentMouseX = -9999;
    let currentMouseY = -9999;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gridSpacing = 34; // 34px base grid
    const spotlightRadius = 160;

    // Define drawFrame first so it is available to handleResize and lifecycle hooks
    function drawFrame(timestamp: number) {
      const time = timestamp * 0.001; // seconds

      // Clear frame
      ctx!.clearRect(0, 0, width, height);

      // Smooth cursor lerp
      if (targetMouseX > -9000) {
        if (currentMouseX < -9000) {
          currentMouseX = targetMouseX;
          currentMouseY = targetMouseY;
        } else {
          currentMouseX += (targetMouseX - currentMouseX) * 0.12;
          currentMouseY += (targetMouseY - currentMouseY) * 0.12;
        }
      } else {
        currentMouseX = -9999;
        currentMouseY = -9999;
      }

      // Slow parallax offsets based on mouse offset from center
      const centerX = width / 2;
      const centerY = height / 2;
      const mouseRelX = currentMouseX > -9000 ? currentMouseX - centerX : 0;
      const mouseRelY = currentMouseY > -9000 ? currentMouseY - centerY : 0;

      const parallaxSmallX = mouseRelX * 0.012;
      const parallaxSmallY = mouseRelY * 0.012;
      const parallaxLargeX = mouseRelX * 0.028;
      const parallaxLargeY = mouseRelY * 0.028;

      const cols = Math.ceil(width / gridSpacing) + 1;
      const rows = Math.ceil(height / gridSpacing) + 1;
      const offsetX = (width % gridSpacing) / 2;
      const offsetY = (height % gridSpacing) / 2;

      for (let r = 0; r < rows; r++) {
        const y0 = offsetY + r * gridSpacing;
        const relY = y0 / height;

        // Masking: Invisible near top, strongest in middle/lower
        if (relY < 0.12) continue; // Top 12% completely dark

        let verticalMask = 0;
        if (relY < 0.45) {
          // Smooth ramp from 0.12 to 0.45
          const t = (relY - 0.12) / 0.33;
          verticalMask = Math.pow(t, 1.4);
        } else if (relY < 0.88) {
          // Peak visibility across middle and lower hero
          verticalMask = 1.0;
        } else {
          // Subtle softening into the bottom off-white gradient
          verticalMask = Math.max(0.65, 1.0 - (relY - 0.88) * 1.5);
        }

        for (let c = 0; c < cols; c++) {
          const x0 = offsetX + c * gridSpacing;
          const isLarge = c % 4 === 0 && r % 4 === 0; // ~136px grid for larger dots

          // Twinkle: deterministic hash for each grid coordinate
          const seed = (((c * 7919) ^ (r * 6271)) >>> 0) % 1000;
          const normSeed = seed / 1000;
          const twinkleSpeed = 0.8 + normSeed * 1.6;
          const twinkle = prefersReducedMotion
            ? 0.7
            : 0.5 + 0.5 * Math.sin(time * twinkleSpeed + normSeed * 6.28);

          // Parallax position
          const px = isLarge ? parallaxLargeX : parallaxSmallX;
          const py = isLarge ? parallaxLargeY : parallaxSmallY;
          let dotX = x0 + px;
          let dotY = y0 + py;

          // Mouse spotlight & repulsion
          let extraGlow = 0;
          if (currentMouseX > -9000 && !prefersReducedMotion) {
            const dx = dotX - currentMouseX;
            const dy = dotY - currentMouseY;
            const dist = Math.hypot(dx, dy);

            if (dist < spotlightRadius) {
              const proximity = 1 - dist / spotlightRadius;
              const angle = Math.atan2(dy, dx);
              const repel = Math.pow(proximity, 2) * 8; // gentle push up to 8px
              dotX += Math.cos(angle) * repel;
              dotY += Math.sin(angle) * repel;
              extraGlow = proximity * 0.55;
            }
          }

          // Compute size and opacity
          const baseRadius = isLarge ? 1.75 : 0.85;
          const radius = baseRadius + extraGlow * 0.4;
          const baseOpacity = isLarge ? 0.65 : 0.34;
          const alpha = Math.min(
            1.0,
            verticalMask * (baseOpacity * (0.6 + 0.4 * twinkle) + extraGlow)
          );

          if (alpha <= 0.01) continue;

          ctx!.beginPath();
          ctx!.arc(dotX, dotY, radius, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx!.fill();
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(drawFrame);
      }
    }

    function handleResize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      if (prefersReducedMotion) {
        drawFrame(0);
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

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initial resize call
    handleResize();

    if (prefersReducedMotion) {
      drawFrame(0);
    } else {
      animationFrameId = requestAnimationFrame(drawFrame);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      aria-hidden="true"
    />
  );
}
