"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hydration-safe wrapper around Framer Motion's useReducedMotion().
 * Returns `false` during SSR and initial client hydration so server-rendered
 * markup matches the client tree 100%. After mount, returns the user's
 * actual OS/browser preference.
 */
export function useSafeReducedMotion(): boolean {
  const [mounted, setMounted] = useState(false);
  const motionReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return false;
  }

  return Boolean(motionReduced);
}

export default useSafeReducedMotion;
