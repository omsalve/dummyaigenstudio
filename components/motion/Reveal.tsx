"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { REDUCED_MOTION_QUERY } from "@/lib/media-queries";
import { useMediaQuery } from "@/lib/use-media-query";

// Tuning
/** px each line rises as it fades in. */
const RISE = 12;
const DURATION = 0.9;
/** Seconds between one line and the next, across every [data-reveal] in order. */
const STAGGER = 0.07;
/** Where the reveal starts: the wrapper's top at this share of the viewport. */
const START = "top 82%";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * A scroll reveal for typographic sections. Every [data-reveal] inside is
 * split into its rendered lines (re-split on resize and font loads until it
 * plays); [data-reveal="block"] moves as one piece instead (lists, flex rows).
 * The first time the wrapper comes into view, the lines rise and fade in one
 * after another, in document order, and then the text is unsplit. Phones get
 * the same reveal; under reduced motion the text simply sits there.
 */
export function Reveal({ children, className }: RevealProps) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (reducedMotion || !root) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    let played = false;
    // Undone by context.revert(), splits included. The lines only ever fade (no
    // visibility: hidden, no aria rewrite), so screen readers read the text as set.
    const context = gsap.context(() => {
      const targets = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
      const splits = targets.map((el) =>
        el.dataset.reveal === "block"
          ? null
          : SplitText.create(el, {
              type: "lines",
              aria: "none",
              autoSplit: true,
              onSplit: (self) => {
                if (!played) gsap.set(self.lines, { y: RISE, opacity: 0 });
              },
            }),
      );
      const blocks = targets.filter((_, index) => !splits[index]);
      gsap.set(blocks, { y: RISE, opacity: 0 });

      ScrollTrigger.create({
        trigger: root,
        start: START,
        once: true,
        onEnter: () => {
          played = true;
          gsap.to(
            targets.flatMap((el, index) => splits[index]?.lines ?? [el]),
            {
              y: 0,
              opacity: 1,
              duration: DURATION,
              ease: "power3.out",
              stagger: STAGGER,
              onComplete: () => {
                for (const split of splits) {
                  split?.revert();
                  split?.kill();
                }
                gsap.set(blocks, { clearProps: "transform,opacity" });
              },
            },
          );
        },
      });
    }, root);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
