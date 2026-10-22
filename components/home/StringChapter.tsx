"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnchorLink } from "@/components/motion/AnchorLink";
import { getLenis } from "@/components/motion/SmoothScroll";
import type { ProjectTag, VerticalId } from "@/content/types";
import { NARROW_QUERY, REDUCED_MOTION_QUERY } from "@/lib/media-queries";
import { useMediaQuery } from "@/lib/use-media-query";
import styles from "./StringChapter.module.css";

// Tuning: string physics
/** Resting sag under the dot's weight, px. */
const SAG_BASE = 9;
/** Extra dip per px/s of scroll speed, and its cap in px. */
const SAG_VELOCITY_GAIN = 0.011;
const SAG_MAX_DIP = 26;
/** Damped spring on the dip, unit mass. ζ ≈ 0.64: one small overshoot, then rest. */
const SPRING_STIFFNESS = 120;
const SPRING_DAMPING = 14;
/** Low-pass on the measured scroll speed, 0–1 (higher reacts faster). */
const VELOCITY_SMOOTHING = 0.25;
/** px. Keep --string-sag-room in the CSS ≥ SAG_BASE + SAG_MAX_DIP + DOT_RADIUS. */
const DOT_RADIUS = 6;
// Tuning: dot travel
/** Share of each vertical's scroll range the dot rests on its stop before moving on. */
const DOT_HOLD = 0.5;
const DOT_EASE = gsap.parseEase("power3.inOut");
/** Seconds for the smooth scroll when a stop is clicked. */
const STOP_SCROLL_DURATION = 1.4;
// Tuning: card stack
/** Scale a card settles to once the next card has stacked over it. */
const STACK_SCALE = 0.94;
/**
 * Cards under the top card that stay glass. Deeper ones switch to a solid
 * fill: three cards cover them, and backdrop-filter is the costly part.
 */
const GLASS_DEPTH = 2;

/** Fine pointers get the glint that follows the pointer across a card. */
const GLINT_QUERY = "(hover: hover) and (pointer: fine)";

/**
 * Chromium alone can run an SVG filter inside backdrop-filter (the liquid
 * refraction); Safari drops the whole declaration on sight, which is why this
 * is a check rather than @supports.
 */
function isChromium() {
  const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands;
  return Boolean(brands?.some(({ brand }) => brand === "Chromium"));
}

type Mode = "full" | "narrow" | "static";

export interface StringChapterCard {
  title: string;
  summary: string;
  tag: ProjectTag;
  image: string;
  href: string;
}

export interface StringChapterVertical {
  id: VerticalId;
  name: string;
  headline: string;
  description: string;
  cards: readonly StringChapterCard[];
}

interface StringChapterProps {
  /** Anchor id for in-page links to this chapter. */
  id?: string;
  /** Section heading for assistive tech. */
  title: string;
  /** Accessible name for the string navigation. */
  navLabel: string;
  /** Word in "OF 04". */
  countJoiner: string;
  verticals: readonly StringChapterVertical[];
  /** Small link under the last card. */
  coda?: { label: string; href: `#${string}` };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

interface IntroProps {
  number: string;
  count: string;
  name: string;
  headline: string;
  description: string;
  nameAs?: "p" | "h3";
}

/** Numeral, count, label and copy for one vertical: the sticky panel on desktop, a header on phones. */
function ChapterIntro({ number, count, name, headline, description, nameAs: Name = "p" }: IntroProps) {
  return (
    <>
      <p className={styles.count}>
        <span className={styles.numeral}>{number}</span>
        <span className={styles.countLabel}>{count}</span>
      </p>
      <Name className={styles.label}>
        <span className={styles.labelRule} aria-hidden="true" />
        {name}
      </Name>
      <p className={styles.headline}>{headline}</p>
      <p className={styles.description}>{description}</p>
    </>
  );
}

export function StringChapter({ id, title, navLabel, countJoiner, verticals, coda }: StringChapterProps) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const narrow = useMediaQuery(NARROW_QUERY);
  const mode: Mode = reducedMotion ? "static" : narrow ? "narrow" : "full";
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const stopsRef = useRef<HTMLOListElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const passedPathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const headerRefs = useRef<(HTMLElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const readingLineRef = useRef(0);

  const total = verticals.length;
  const count = `${countJoiner} ${pad(total)}`;
  // Index of each vertical's first card in the single stack.
  const firstCard = verticals.map((_, index) =>
    verticals.slice(0, index).reduce((sum, vertical) => sum + vertical.cards.length, 0),
  );

  useEffect(() => {
    const root = rootRef.current;
    const head = headRef.current;
    const nav = navRef.current;
    const stops = stopsRef.current;
    const cardsColumn = cardsRef.current;
    const basePath = basePathRef.current;
    const passedPath = passedPathRef.current;
    const dot = dotRef.current;
    if (!root || !head || !nav || !stops || !cardsColumn || !basePath || !passedPath || !dot) return;

    gsap.registerPlugin(ScrollTrigger);
    const headers = headerRefs.current.filter((el): el is HTMLElement => el !== null);
    const cards = cardRefs.current.filter((el): el is HTMLElement => el !== null);
    const stacking = mode === "full";

    // Cached measurements, refreshed with ScrollTrigger (load, resize, font swap).
    let width = 0;
    let baseline = 0;
    let viewport = 0;
    let readingLine = 0;
    let markers: number[] = [];
    let cardTops: number[] = [];
    let stickTops: number[] = [];
    const lastScale = cards.map(() => 1);

    // Spring and scroll state.
    let dip = 0;
    let dipVelocity = 0;
    let speed = 0;
    let lastScroll = window.scrollY;
    let drawnX = NaN;
    let drawnY = NaN;
    let reported = -1;
    let running = false;
    let lastTop = -1;

    const stopX = (index: number) => ((index + 0.5) / total) * width;

    const measure = () => {
      const scrollY = window.scrollY;
      width = nav.clientWidth;
      baseline = stops.offsetHeight;
      viewport = window.innerHeight;
      markers = headers.map((header) => header.getBoundingClientRect().top + scrollY);
      if (stacking && cards.length) {
        stickTops = cards.map((card) => parseFloat(getComputedStyle(card).top) || 0);
        readingLine = stickTops[0];
        // Natural (unstuck) positions: switch stickiness off for the read.
        cardsColumn.setAttribute("data-measuring", "");
        cardTops = cards.map((card) => card.getBoundingClientRect().top + scrollY);
        cardsColumn.removeAttribute("data-measuring");
      } else {
        readingLine = head.offsetHeight + 24;
      }
      readingLineRef.current = readingLine;
      drawnX = NaN;
    };

    // Continuous stop index: rests on a stop, then eases to the next one.
    const positionAt = (scrollY: number) => {
      const line = scrollY + readingLine + 1;
      if (!markers.length || line <= markers[0]) return 0;
      for (let k = 0; k < markers.length - 1; k++) {
        if (line < markers[k + 1]) {
          if (mode === "static") return k;
          const t = (line - markers[k]) / (markers[k + 1] - markers[k]);
          return k + DOT_EASE(Math.max(0, (t - DOT_HOLD) / (1 - DOT_HOLD)));
        }
      }
      return markers.length - 1;
    };

    // One path from anchor to anchor through the dot; the passed half is drawn again in the accent.
    const draw = (position: number, sag: number) => {
      const from = Math.floor(position);
      const to = Math.min(from + 1, total - 1);
      const x = stopX(from) + (stopX(to) - stopX(from)) * (position - from);
      const y = baseline + sag;
      if (Math.abs(x - drawnX) < 0.05 && Math.abs(y - drawnY) < 0.05) return;
      drawnX = x;
      drawnY = y;
      const xs = x.toFixed(2);
      const ys = y.toFixed(2);
      const passed = `M0 ${baseline} Q${(x / 2).toFixed(2)} ${ys} ${xs} ${ys}`;
      passedPath.setAttribute("d", passed);
      basePath.setAttribute("d", `${passed} Q${((x + width) / 2).toFixed(2)} ${ys} ${width} ${baseline}`);
      dot.style.transform = `translate(${xs}px, ${ys}px)`;
      nav.dataset.drawn = "";
    };

    // Each card eases down to STACK_SCALE while the next one rises to stack over it.
    const stack = (scrollY: number) => {
      if (!stacking) return;
      for (let i = 0; i < cards.length - 1; i++) {
        const start = cardTops[i + 1] - viewport;
        const end = cardTops[i + 1] - stickTops[i + 1];
        const t = Math.min(1, Math.max(0, (scrollY - start) / Math.max(1, end - start)));
        const scale = 1 - (1 - STACK_SCALE) * t;
        if (Math.abs(scale - lastScale[i]) > 0.0005) {
          cards[i].style.transform = `scale(${scale.toFixed(4)})`;
          lastScale[i] = scale;
        }
      }
      // The top card is the last to have come into view; cards deeper than GLASS_DEPTH under it go
      // solid, and only the top card (the one fully seen) refracts.
      let top = 0;
      while (top < cards.length - 1 && scrollY >= cardTops[top + 1] - viewport) top++;
      if (top !== lastTop) {
        cards.forEach((card, i) => {
          card.toggleAttribute("data-solid", i < top - GLASS_DEPTH);
          card.toggleAttribute("data-top", i === top);
        });
        lastTop = top;
      }
    };

    const report = (position: number) => {
      const index = Math.round(position);
      if (index !== reported) {
        reported = index;
        setActive(index);
      }
    };

    const tick = (_time: number, deltaMs: number) => {
      const scrollY = window.scrollY;
      const dt = Math.min(deltaMs, 64) / 1000;
      if (dt > 0) speed += ((scrollY - lastScroll) / dt - speed) * VELOCITY_SMOOTHING;
      lastScroll = scrollY;

      // Sag = base weight + a damped spring chasing a dip proportional to scroll speed.
      const target = Math.min(SAG_MAX_DIP, Math.abs(speed) * SAG_VELOCITY_GAIN);
      for (let left = dt; left > 1e-6; left -= 1 / 120) {
        const step = Math.min(left, 1 / 120);
        dipVelocity += (SPRING_STIFFNESS * (target - dip) - SPRING_DAMPING * dipVelocity) * step;
        dip += dipVelocity * step;
      }

      const position = positionAt(scrollY);
      draw(position, SAG_BASE + dip);
      stack(scrollY);
      report(position);
    };

    const startTicker = () => {
      if (running) return;
      running = true;
      lastScroll = window.scrollY;
      speed = 0;
      gsap.ticker.add(tick);
    };
    const stopTicker = () => {
      if (!running) return;
      running = false;
      gsap.ticker.remove(tick);
    };

    // Reduced motion: a straight string, and the dot jumps from stop to stop.
    const renderStatic = (scrollY: number) => {
      const position = positionAt(scrollY);
      draw(position, 0);
      report(position);
    };

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        if (mode === "static") return;
        if (self.isActive) startTicker();
        else stopTicker();
      },
      onUpdate: (self) => {
        if (mode === "static") renderStatic(self.scroll());
      },
      onRefresh: (self) => {
        measure();
        const scrollY = self.scroll();
        if (mode === "static") renderStatic(scrollY);
        else {
          const position = positionAt(scrollY);
          draw(position, SAG_BASE + dip);
          stack(scrollY);
          report(position);
        }
      },
    });

    const frameId = requestAnimationFrame(() => {
      measure();
      if (mode === "static") renderStatic(window.scrollY);
      else {
        tick(0, 0);
        if (trigger.isActive) startTicker();
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
      stopTicker();
      trigger.kill();
      for (const card of cards) {
        card.style.removeProperty("transform");
        card.removeAttribute("data-solid");
        card.removeAttribute("data-top");
      }
    };
  }, [mode, total]);

  // The glass: Chromium gets the liquid refraction, and fine pointers a glint that follows them.
  useEffect(() => {
    const root = rootRef.current;
    const cardsColumn = cardsRef.current;
    if (!root || !cardsColumn) return;
    root.toggleAttribute("data-refract", isChromium());
    if (mode === "static" || !window.matchMedia(GLINT_QUERY).matches) return;

    const handleMove = (event: PointerEvent) => {
      const card = (event.target as Element).closest<HTMLElement>("[data-card]");
      if (!card) return;
      const box = card.getBoundingClientRect();
      card.style.setProperty("--glint-x", `${(event.clientX - box.left).toFixed(1)}px`);
      card.style.setProperty("--glint-y", `${(event.clientY - box.top).toFixed(1)}px`);
    };
    cardsColumn.addEventListener("pointermove", handleMove);
    return () => cardsColumn.removeEventListener("pointermove", handleMove);
  }, [mode]);

  function handleStopClick(event: MouseEvent<HTMLAnchorElement>, index: number) {
    const header = headerRefs.current[index];
    if (!header) return;
    event.preventDefault();
    const top = header.getBoundingClientRect().top + window.scrollY - readingLineRef.current + 1;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(top, { duration: STOP_SCROLL_DURATION });
    else window.scrollTo({ top, behavior: "auto" });
    header.focus({ preventScroll: true });
  }

  return (
    <section
      ref={rootRef}
      id={id}
      className={styles.root}
      aria-labelledby="string-chapter-title"
      data-mode={mode}
    >
      <h2 id="string-chapter-title" className="sr-only">
        {title}
      </h2>
      {/*
        The liquid refraction, used through backdrop-filter in Chromium ([data-refract]):
        a slow, low-frequency warp, smoothed, that bends what's behind the glass.
      */}
      <svg className={styles.filters} aria-hidden="true" focusable="false">
        <filter id="lmr-liquid" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="3" result="swell" />
          <feDisplacementMap in="SourceGraphic" in2="swell" scale="42" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div ref={headRef} className={styles.head}>
        <div className={styles.headGrid}>
          <nav ref={navRef} className={styles.nav} aria-label={navLabel} data-vertical={verticals[active]?.id}>
            <svg className={styles.string} aria-hidden="true">
              <path ref={basePathRef} className={styles.stringBase} />
              <path ref={passedPathRef} className={styles.stringPassed} />
              <circle ref={dotRef} className={styles.dot} r={DOT_RADIUS} />
            </svg>
            <ol ref={stopsRef} className={styles.stops}>
              {verticals.map((vertical, index) => (
                <li
                  key={vertical.id}
                  className={styles.stop}
                  style={{ "--stop-x": `${((index + 0.5) / total) * 100}%` } as CSSProperties}
                >
                  <a
                    href={`#industry-${vertical.id}`}
                    className={styles.stopLink}
                    aria-current={index === active ? "true" : undefined}
                    onClick={(event) => handleStopClick(event, index)}
                  >
                    <span className={styles.stopNumber}>{pad(index + 1)}</span>
                    <span className={styles.stopName}>{vertical.name}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.panel} aria-hidden="true">
          {verticals.map((vertical, index) => (
            <div
              key={vertical.id}
              className={styles.panelItem}
              data-active={index === active || undefined}
            >
              <ChapterIntro
                number={pad(index + 1)}
                count={count}
                name={vertical.name}
                headline={vertical.headline}
                description={vertical.description}
              />
            </div>
          ))}
        </div>

        <div ref={cardsRef} className={styles.cards}>
          {/* Light for the glass to bend: the active vertical's accent and sand, drifting behind the stack. */}
          <div className={styles.ambientTrack} aria-hidden="true">
            <div className={styles.ambient}>
              {verticals.map((vertical, index) => (
                <div
                  key={vertical.id}
                  className={styles.ambientLayer}
                  data-vertical={vertical.id}
                  data-active={index === active || undefined}
                >
                  <span className={styles.blob} data-blob="accent" />
                  <span className={styles.blob} data-blob="sand" />
                  <span className={styles.blob} data-blob="glow" />
                </div>
              ))}
            </div>
          </div>
          {verticals.map((vertical, index) => (
            <Fragment key={vertical.id}>
              <header
                ref={(header) => {
                  headerRefs.current[index] = header;
                }}
                id={`industry-${vertical.id}`}
                className={styles.groupHeader}
                tabIndex={-1}
              >
                <ChapterIntro
                  number={pad(index + 1)}
                  count={count}
                  name={vertical.name}
                  headline={vertical.headline}
                  description={vertical.description}
                  nameAs="h3"
                />
              </header>
              {vertical.cards.map((card, cardIndex) => {
                const stackIndex = firstCard[index] + cardIndex;
                return (
                  <article
                    key={`${vertical.id}-${cardIndex}`}
                    ref={(element) => {
                      cardRefs.current[stackIndex] = element;
                    }}
                    className={styles.card}
                    data-card
                    data-vertical={vertical.id}
                    style={{ "--stack-index": stackIndex } as CSSProperties}
                  >
                    <span className={styles.glint} aria-hidden="true" />
                    <div className={styles.cardBody}>
                      <p className={styles.cardMeta}>
                        <span>
                          {pad(index + 1)}.{cardIndex + 1}
                        </span>
                        <span>{card.tag}</span>
                      </p>
                      <div>
                        <h4 className={styles.cardTitle}>
                          <Link href={card.href} className={styles.cardLink}>
                            {card.title}
                          </Link>
                        </h4>
                        <p className={styles.cardSummary}>{card.summary}</p>
                      </div>
                    </div>
                    <div className={styles.cardMedia}>
                      <Image
                        className={styles.cardImage}
                        src={card.image}
                        alt=""
                        fill
                        sizes="(max-width: 767.98px) 100vw, 40vw"
                      />
                    </div>
                  </article>
                );
              })}
            </Fragment>
          ))}
        </div>

        {coda && (
          <p className={styles.coda}>
            <AnchorLink href={coda.href} className={styles.codaLink}>
              {coda.label}
              <svg viewBox="0 0 18 10" width="18" height="10" aria-hidden="true">
                <path d="M0 5h16.5M12.5 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </AnchorLink>
          </p>
        )}
      </div>
    </section>
  );
}
