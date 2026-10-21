"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export default function HalftoneDotsCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useSafeReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let isVisible = true;
    let width = container.clientWidth || 1900;
    let height = container.clientHeight || 605;

    // Grid coordinates
    let gridX = new Float32Array(0);
    let gridY = new Float32Array(0);
    let gridNx = new Float32Array(0);
    let gridNy = new Float32Array(0);
    let gridBasePhase = new Float32Array(0);
    let dotCount = 0;

    // Mouse tracking with lerp
    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let lastMouseMoveTime = 0;

    // Setup grid layout
    function buildGrid() {
      const isMobile = width < 768;
      const spacing = isMobile ? 16 : 11;
      const rowPitch = spacing * 0.866; // staggered equilateral pitch
      const rows = Math.ceil(height / rowPitch) + 3;
      const cols = Math.ceil(width / spacing) + 4;

      const totalDots = rows * cols;
      if (gridX.length < totalDots) {
        gridX = new Float32Array(totalDots);
        gridY = new Float32Array(totalDots);
        gridNx = new Float32Array(totalDots);
        gridNy = new Float32Array(totalDots);
        gridBasePhase = new Float32Array(totalDots);
      }

      let count = 0;
      let seed = 1337;
      const pseudoRandom = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };

      for (let r = 0; r < rows; r++) {
        const yBase = (r - 1) * rowPitch;
        const xOffset = (r % 2) * (spacing * 0.5);

        for (let c = 0; c < cols; c++) {
          const xBase = (c - 1) * spacing + xOffset;

          const nx = Math.max(0, Math.min(1, xBase / width));
          const ny = Math.max(0, Math.min(1, yBase / height));

          // Gentle perspective warp toward bottom & right
          const warpX = xBase + (nx - 0.5) * 22 * (ny + 0.2);
          const warpY = yBase + ny * 14;

          gridX[count] = warpX;
          gridY[count] = warpY;
          gridNx[count] = nx;
          gridNy[count] = ny;
          gridBasePhase[count] = pseudoRandom() * Math.PI * 2;
          count++;
        }
      }
      dotCount = count;
    }

    function handleResize() {
      if (!canvas || !container || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth || 1900;
      height = container.clientHeight || 605;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      buildGrid();

      if (prefersReduced) {
        drawFrame(3.0);
      }
    }

    // Interactive mouse listeners
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      lastMouseMoveTime = performance.now();
    };

    const onMouseLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    // Main animation draw loop
    function drawFrame(timeSec: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor lerp
      if (targetMouseX > -9000) {
        if (mouseX < -9000) {
          mouseX = targetMouseX;
          mouseY = targetMouseY;
        } else {
          mouseX += (targetMouseX - mouseX) * 0.08;
          mouseY += (targetMouseY - mouseY) * 0.08;
        }
      } else {
        mouseX = -9999;
        mouseY = -9999;
      }

      // Parallax shift calculation (up to 10px)
      let parallaxX = 0;
      let parallaxY = 0;
      if (mouseX > -9000 && !prefersReduced) {
        parallaxX = ((mouseX - width * 0.5) / (width * 0.5)) * 8;
        parallaxY = ((mouseY - height * 0.5) / (height * 0.5)) * 6;
      }

      // Automatic roaming glow along Lissajous path when idle or on touch
      const now = performance.now();
      const isIdle = mouseX < -9000 || now - lastMouseMoveTime > 3000;
      let glowX = mouseX;
      let glowY = mouseY;
      if (isIdle && !prefersReduced) {
        const lissTime = timeSec * 0.35;
        glowX = width * (0.62 + 0.28 * Math.sin(lissTime * 0.9));
        glowY = height * (0.58 + 0.3 * Math.sin(lissTime * 1.4 + 0.8));
      }

      // Light sweep from bottom-right to top-left every 9 seconds
      const sweepCycle = (timeSec % 9.0) / 9.0;
      // Sweep moves diagonally from (1.0, 1.0) towards (0.0, 0.0)
      const sweepFront = sweepCycle * 2.6 - 0.3; // Moves along diagonal projection

      // Path buckets for high-performance batched arc drawing
      // 4 buckets corresponding to luminosity tiers
      const bucketCyanWhite = new Path2D(); // #cfe6ff at 0.9
      const bucketBrightSky = new Path2D(); // #7fb8ff at 0.82
      const bucketMidBlue = new Path2D();   // #3b5fd0 at 0.65
      const bucketDeepNavy = new Path2D();  // #1d338a at 0.4

      let cyanCount = 0;
      let skyCount = 0;
      let midCount = 0;
      let deepCount = 0;

      for (let i = 0; i < dotCount; i++) {
        const nx = gridNx[i];
        const ny = gridNy[i];

        // 1. Base color brightness field:
        // Left 0 to 35% near black navy; 35% to 65% royal blue; 65% to 100% bright cyan/sky
        // Darkened top 120px for navbar, dark bottom-left corner
        let fieldBrightness = 0;
        if (nx < 0.26) {
          fieldBrightness = nx * 0.3; // 0 to ~0.08 (near black)
        } else if (nx < 0.55) {
          const t = (nx - 0.26) / 0.29;
          fieldBrightness = 0.08 + t * 0.32; // 0.08 to 0.40
        } else if (nx < 0.78) {
          const t = (nx - 0.55) / 0.23;
          fieldBrightness = 0.40 + t * 0.38; // 0.40 to 0.78
        } else {
          const t = (nx - 0.78) / 0.22;
          fieldBrightness = 0.78 + t * 0.22; // 0.78 to 1.0
        }

        // Boost lower right corner (x=1500 to 1900, y=350 to 605)
        if (nx > 0.7 && ny > 0.45) {
          const cornerBoost = (nx - 0.7) * (ny - 0.45) * 3.5;
          fieldBrightness = Math.min(1.0, fieldBrightness + cornerBoost * 0.25);
        }

        // Top 120px dark navbar mask
        const yPx = ny * height;
        if (yPx < 120) {
          const topMask = Math.pow(yPx / 120, 1.6);
          fieldBrightness *= topMask;
        }

        // Left edge vignette: keep text area (H1, paragraph, Book a Demo button) dark navy and legible
        const xPx = nx * width;
        if (xPx < 480) {
          const leftVignette = Math.pow(Math.max(0, xPx - 140) / 340, 2.2);
          fieldBrightness *= leftVignette;
        }

        // 2. Slow 3D wave noise drifting up and to the right (30s cycle)
        // Multi-frequency wave synthesis
        const waveTime = timeSec * 0.21;
        const driftX = nx * 3.6 - waveTime * 0.3;
        const driftY = ny * 2.8 - waveTime * 0.25;

        const w1 = Math.sin(driftX * 4.2 + driftY * 2.5);
        const w2 = Math.cos(driftX * 6.5 - driftY * 4.8 + 1.2);
        const w3 = Math.sin((driftX + driftY) * 8.4 + gridBasePhase[i] * 0.2);
        const waveNoise = (w1 * 0.5 + w2 * 0.35 + w3 * 0.15 + 1.0) * 0.5; // [0, 1]

        // 3. Diagonal light sweep (bottom-right to upper-left)
        // Diagonal distance from bottom-right (nx=1, ny=1) is 0, to top-left is ~1.7
        const diagPos = (1.0 - nx) * 1.05 + (1.0 - ny) * 0.65;
        const distToSweep = Math.abs(diagPos - sweepFront);
        let sweepBoost = 0;
        if (distToSweep < 0.28) {
          sweepBoost = Math.pow(1 - distToSweep / 0.28, 2) * 0.55;
        }

        // 4. Combined local luminance
        let luminance = fieldBrightness * (0.65 + waveNoise * 0.55) + sweepBoost * fieldBrightness;

        // 5. Cursor / Roaming glow interaction
        let mouseBoost = 0;
        let repelX = 0;
        let repelY = 0;
        const posX = gridX[i] + parallaxX;
        const posY = gridY[i] + parallaxY;

        if (glowX > -9000) {
          const dx = posX - glowX;
          const dy = posY - glowY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 40000) { // 200px radius
            const dist = Math.sqrt(distSq);
            const prox = 1 - dist / 200;
            mouseBoost = prox * prox * 0.75;
            // Subtle spring repulsion (up to 3.5px)
            const angle = Math.atan2(dy, dx);
            const push = prox * 3.5;
            repelX = Math.cos(angle) * push;
            repelY = Math.sin(angle) * push;
          }
        }

        const effective = Math.min(1.0, luminance + mouseBoost);

        // Dot radius: 0.8px to 3.6px
        // Skip dots in extremely dark areas under 0.5px
        if (effective < 0.06) continue;

        let radius = 0.8 + effective * 2.8;
        if (mouseBoost > 0) {
          radius = Math.min(3.8, radius * (1 + mouseBoost * 0.65));
        }

        if (radius < 0.5) continue;

        const finalX = posX + repelX;
        const finalY = posY + repelY;

        // Categorize into color bucket
        if (effective > 0.68) {
          bucketCyanWhite.moveTo(finalX + radius, finalY);
          bucketCyanWhite.arc(finalX, finalY, radius, 0, Math.PI * 2);
          cyanCount++;
        } else if (effective > 0.44) {
          bucketBrightSky.moveTo(finalX + radius, finalY);
          bucketBrightSky.arc(finalX, finalY, radius, 0, Math.PI * 2);
          skyCount++;
        } else if (effective > 0.22) {
          bucketMidBlue.moveTo(finalX + radius, finalY);
          bucketMidBlue.arc(finalX, finalY, radius, 0, Math.PI * 2);
          midCount++;
        } else {
          bucketDeepNavy.moveTo(finalX + radius, finalY);
          bucketDeepNavy.arc(finalX, finalY, radius, 0, Math.PI * 2);
          deepCount++;
        }
      }

      // Single-batch fills
      if (deepCount > 0) {
        ctx.fillStyle = "rgba(40, 80, 190, 0.45)";
        ctx.fill(bucketDeepNavy);
      }
      if (midCount > 0) {
        ctx.fillStyle = "rgba(65, 120, 235, 0.68)";
        ctx.fill(bucketMidBlue);
      }
      if (skyCount > 0) {
        ctx.fillStyle = "rgba(127, 184, 255, 0.85)";
        ctx.fill(bucketBrightSky);
      }
      if (cyanCount > 0) {
        ctx.fillStyle = "rgba(207, 235, 255, 0.95)";
        ctx.fill(bucketCyanWhite);
      }
    }

    // RAF Loop
    let startTimestamp: number | null = null;
    function loop(now: number) {
      if (!isVisible) return;
      if (!startTimestamp) startTimestamp = now;
      const elapsed = (now - startTimestamp) * 0.001;

      drawFrame(elapsed);

      if (!prefersReduced) {
        animationId = requestAnimationFrame(loop);
      }
    }

    // IntersectionObserver to pause when hero is scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible && !prefersReduced) {
          cancelAnimationFrame(animationId);
          animationId = requestAnimationFrame(loop);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Tab visibility handling
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !prefersReduced) {
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Resize and mouse events
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Initial setup
    handleResize();

    if (prefersReduced) {
      drawFrame(3.0);
    } else {
      animationId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[605px] overflow-hidden select-none bg-[#02030f]"
      style={{
        background: "#02030f",
      }}
    >
      {/* 1. Underlying rich color field with drifting out-of-focus wave shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base dark navy to bright blue gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #02030f 0%, #03061a 25%, #08154e 45%, #18339c 68%, #366fe6 86%, #5296fa 100%)",
          }}
        />

        {/* Drifting wave blob 1: Deep royal blue at x=600 to 1000 */}
        <motion.div
          animate={
            prefersReduced
              ? {}
              : {
                  x: [0, 35, -25, 0],
                  y: [0, -25, 20, 0],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[38%] top-[18%] w-[680px] h-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 38, 142, 0.8) 0%, rgba(9, 21, 88, 0.45) 50%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />

        {/* Drifting wave blob 2: Vibrant mid blue at x=1000 to 1450 */}
        <motion.div
          animate={
            prefersReduced
              ? {}
              : {
                  x: [0, -40, 30, 0],
                  y: [0, 30, -20, 0],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[60%] top-[25%] w-[640px] h-[460px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(42, 90, 215, 0.85) 0%, rgba(24, 58, 170, 0.5) 55%, transparent 80%)",
            filter: "blur(55px)",
          }}
        />

        {/* Drifting wave blob 3: Bright sky and cyan-blue at lower right (x=1350 to 1900, y=320 to 605) */}
        <motion.div
          animate={
            prefersReduced
              ? {}
              : {
                  x: [0, 25, -30, 0],
                  y: [0, -18, 25, 0],
                  scale: [1, 1.05, 0.96, 1],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-100px] bottom-[-80px] w-[950px] h-[550px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 65% 65%, rgba(95, 212, 255, 0.95) 0%, rgba(127, 184, 255, 0.85) 30%, rgba(42, 85, 210, 0.6) 65%, transparent 85%)",
            filter: "blur(50px)",
          }}
        />

        {/* Brilliant cyan-white luminous highlight at the far lower right corner (x=1550-1900, y=380-605) */}
        <div
          className="absolute right-[-60px] bottom-[-40px] w-[550px] h-[380px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 60% 60%, rgba(180, 238, 255, 0.98) 0%, rgba(120, 205, 255, 0.7) 45%, transparent 75%)",
            filter: "blur(45px)",
          }}
        />

        {/* Top 120px Dark Navy Mask for transparent Navbar readability */}
        <div
          className="absolute top-0 left-0 right-0 h-[130px] z-10"
          style={{
            background:
              "linear-gradient(to bottom, #02030f 0%, rgba(2, 3, 15, 0.92) 50px, rgba(2, 3, 15, 0.4) 95px, transparent 130px)",
          }}
        />

        {/* Left edge vignette to black for text readability */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[540px] z-[1]"
          style={{
            background:
              "linear-gradient(to right, #02030f 0%, rgba(2, 3, 15, 0.98) 220px, rgba(2, 3, 15, 0.65) 400px, transparent 540px)",
          }}
        />

        {/* Dark bottom-left corner */}
        <div
          className="absolute bottom-0 left-0 w-[560px] h-[380px] z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 0% 100%, #02030f 0%, rgba(2, 3, 15, 0.92) 45%, transparent 75%)",
          }}
        />
      </div>

      {/* 2. The Halftone Dot Matrix Canvas with radial entrance animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: prefersReduced ? 0.3 : 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0 z-[2] pointer-events-none"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          aria-hidden="true"
        />
      </motion.div>

      {/* 3. Fine Film Grain Overlay (3% opacity) */}
      <div
        className="absolute inset-0 pointer-events-none z-[3] opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
