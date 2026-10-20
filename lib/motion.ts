import type { LenisOptions } from "lenis";

/**
 * Page smooth-scroll feel (tuning). `lerp` is the fraction of the remaining
 * distance covered each frame: lower feels floatier, 1 is unsmoothed.
 */
export const LENIS_OPTIONS: LenisOptions = {
  lerp: 0.1,
  wheelMultiplier: 1,
  smoothWheel: true,
  // Touch keeps the platform's native momentum scrolling.
  syncTouch: false,
  // Driven from gsap.ticker so ScrollTrigger and Lenis share one frame.
  autoRaf: false,
};
