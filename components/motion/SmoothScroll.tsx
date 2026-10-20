"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REDUCED_MOTION_QUERY } from "@/lib/media-queries";
import { LENIS_OPTIONS } from "@/lib/motion";

let lenis: Lenis | null = null;

/** The running Lenis instance, or null while scroll is native (reduced motion, or before mount). */
export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * Page-wide smooth scroll. Lenis runs on GSAP's ticker so ScrollTrigger reads
 * the same scroll position Lenis just wrote. Under prefers-reduced-motion the
 * page keeps native scrolling, and the instance follows the setting live.
 */
export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);

    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const tick = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (lenis) return;
      lenis = new Lenis(LENIS_OPTIONS);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
    };
    const stop = () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
    const sync = () => (reducedMotion.matches ? stop() : start());

    sync();
    reducedMotion.addEventListener("change", sync);
    // Scroll scenes cache text measurements; re-measure once web fonts swap in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      reducedMotion.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return null;
}
