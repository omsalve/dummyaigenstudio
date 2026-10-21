"use client";

import { useEffect, useRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NARROW_QUERY, REDUCED_MOTION_QUERY } from "@/lib/media-queries";
import { useMediaQuery } from "@/lib/use-media-query";

type Depth = "background" | "reality" | "subject";

// Tuning: parallax as the hero scrolls away. Each layer lags the page by this
// many px per px scrolled, so deeper layers move slower. The subject keeps page
// speed (the fastest of the three), so its cut edges never come into view.
const PARALLAX: Record<Depth, number> = { background: 0.24, reality: 0.12, subject: 0 };
/** Narrow screens get this share of the parallax. */
const PARALLAX_NARROW = 0.5;
// Tuning: pointer drift, px at the hero's edge; nearer layers drift further.
// Keep --hero-bleed (Hero.module.css) above the largest.
const DRIFT: Record<Depth, number> = { background: 3, reality: 6, subject: 11 };
/** Seconds the layers take to catch up with the pointer. */
const DRIFT_LAG = 1.4;

const isDepth = (value: string | undefined): value is Depth =>
  value === "background" || value === "reality" || value === "subject";

type Mode = "full" | "narrow" | "static";

/**
 * The hero's section, with its motion: each [data-hero-layer] lags the page by
 * its depth as the hero scrolls away, and each [data-hero-drift] drifts after a
 * fine pointer. Two elements per layer, so the scroll and the pointer never
 * write the same transform. Narrow screens get half the parallax and no drift;
 * reduced motion gets neither. The load-in is CSS (Hero.module.css), so it
 * doesn't wait for hydration.
 */
export function HeroMotion({ children, ...rest }: ComponentPropsWithoutRef<"section">) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const narrow = useMediaQuery(NARROW_QUERY);
  const mode: Mode = reducedMotion ? "static" : narrow ? "narrow" : "full";
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (mode === "static" || !root) return;

    gsap.registerPlugin(ScrollTrigger);
    const share = mode === "narrow" ? PARALLAX_NARROW : 1;
    let handleMove: ((event: PointerEvent) => void) | null = null;
    let handleLeave: (() => void) | null = null;

    const context = gsap.context(() => {
      for (const layer of root.querySelectorAll<HTMLElement>("[data-hero-layer]")) {
        const depth = layer.dataset.heroLayer;
        const lag = isDepth(depth) ? PARALLAX[depth] * share : 0;
        if (!lag) continue;
        gsap.to(layer, {
          y: () => lag * root.offsetHeight,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        });
      }

      if (mode !== "full" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const drifts = [...root.querySelectorAll<HTMLElement>("[data-hero-drift]")].flatMap((el) => {
        const depth = el.dataset.heroDrift;
        if (!isDepth(depth)) return [];
        return [
          {
            reach: DRIFT[depth],
            toX: gsap.quickTo(el, "x", { duration: DRIFT_LAG, ease: "power3" }),
            toY: gsap.quickTo(el, "y", { duration: DRIFT_LAG, ease: "power3" }),
          },
        ];
      });
      // Layers drift away from the pointer, as if the viewer leant toward it.
      handleMove = (event) => {
        const box = root.getBoundingClientRect();
        const nx = ((event.clientX - box.left) / box.width) * 2 - 1;
        const ny = ((event.clientY - box.top) / box.height) * 2 - 1;
        for (const drift of drifts) {
          drift.toX(-nx * drift.reach);
          drift.toY(-ny * drift.reach);
        }
      };
      handleLeave = () => {
        for (const drift of drifts) {
          drift.toX(0);
          drift.toY(0);
        }
      };
      root.addEventListener("pointermove", handleMove);
      root.addEventListener("pointerleave", handleLeave);
    }, root);

    return () => {
      if (handleMove) root.removeEventListener("pointermove", handleMove);
      if (handleLeave) root.removeEventListener("pointerleave", handleLeave);
      context.revert();
    };
  }, [mode]);

  return (
    <section ref={rootRef} data-mode={mode} {...rest}>
      {children}
    </section>
  );
}
