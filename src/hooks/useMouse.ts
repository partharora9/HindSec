"use client";

import { useState, useEffect, useRef } from "react";

export interface MouseState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  normX: number;
  normY: number;
  parallaxBlobX: number;
  parallaxBlobY: number;
  parallaxCanvasX: number;
  parallaxCanvasY: number;
  isInside: boolean;
  isTouchDevice: boolean;
}

export function useMouse() {
  const [mouseState, setMouseState] = useState<MouseState>({
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    normX: 0,
    normY: 0,
    parallaxBlobX: 0,
    parallaxBlobY: 0,
    parallaxCanvasX: 0,
    parallaxCanvasY: 0,
    isInside: false,
    isTouchDevice: false,
  });

  const stateRef = useRef(mouseState);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    let rafId: number;
    let targetX = -9999;
    let targetY = -9999;
    let currentX = -9999;
    let currentY = -9999;
    let isInside = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isInside = true;
    };

    const handleMouseLeave = () => {
      isInside = false;
      targetX = -9999;
      targetY = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const updateLoop = () => {
      const width = window.innerWidth || 1920;
      const height = window.innerHeight || 1080;
      const halfW = width / 2;
      const halfH = height / 2;

      if (isInside && targetX > -9000) {
        if (currentX < -9000) {
          currentX = targetX;
          currentY = targetY;
        } else {
          // Smooth lerp (0.08 smoothing as specified)
          currentX += (targetX - currentX) * 0.08;
          currentY += (targetY - currentY) * 0.08;
        }

        const normX = Math.max(-1, Math.min(1, (currentX - halfW) / halfW));
        const normY = Math.max(-1, Math.min(1, (currentY - halfH) / halfH));

        // Parallax: Blobs shift by up to 12px; Canvas shifts by up to 6px in opposite direction
        const parallaxBlobX = normX * 12;
        const parallaxBlobY = normY * 12;
        const parallaxCanvasX = -normX * 6;
        const parallaxCanvasY = -normY * 6;

        const next = {
          x: currentX,
          y: currentY,
          targetX,
          targetY,
          normX,
          normY,
          parallaxBlobX,
          parallaxBlobY,
          parallaxCanvasX,
          parallaxCanvasY,
          isInside: true,
          isTouchDevice: isTouch,
        };

        stateRef.current = next;
        setMouseState(next);
      } else {
        // Return to center when mouse leaves
        const decayRate = 0.05;
        const nextBlobX = stateRef.current.parallaxBlobX * (1 - decayRate);
        const nextBlobY = stateRef.current.parallaxBlobY * (1 - decayRate);
        const nextCanvasX = stateRef.current.parallaxCanvasX * (1 - decayRate);
        const nextCanvasY = stateRef.current.parallaxCanvasY * (1 - decayRate);

        if (
          Math.abs(nextBlobX) > 0.01 ||
          Math.abs(nextCanvasX) > 0.01 ||
          stateRef.current.isInside
        ) {
          const next = {
            x: -9999,
            y: -9999,
            targetX: -9999,
            targetY: -9999,
            normX: 0,
            normY: 0,
            parallaxBlobX: nextBlobX,
            parallaxBlobY: nextBlobY,
            parallaxCanvasX: nextCanvasX,
            parallaxCanvasY: nextCanvasY,
            isInside: false,
            isTouchDevice: isTouch,
          };
          stateRef.current = next;
          setMouseState(next);
        }
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return mouseState;
}
