"use client";

// [PARKED] The hero stopped using HeroReel (and fluidReel.ts) in homepage v2;
// it's now a layered still (Hero.tsx). Kept intact: the reel may come back
// lower on the page, fed by content/flagship.ts and flagshipStage.

import { useEffect, useId, useRef, useState } from "react";
import type { AnimationEvent, FocusEvent, PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FlagshipProject } from "@/content/types";
import { REDUCED_MOTION_QUERY } from "@/lib/media-queries";
import { useMediaQuery } from "@/lib/use-media-query";
import { FluidReel } from "./fluidReel";
import styles from "./HeroReel.module.css";

// Tuning. The chapter dwell lives in HeroReel.module.css (--reel-dwell).
/** ms the pointer must rest on a chapter before the reel pours it in. */
const HOVER_INTENT_MS = 120;
/** Below this visible fraction the hero counts as off screen: the fluid stops, clips pause. */
const VISIBLE_RATIO = 0.1;

export interface HeroReelItem extends FlagshipProject {
  verticalName: string;
}

interface HeroReelProps {
  items: readonly HeroReelItem[];
  /** Caption over the chapters, and the list's accessible name. */
  label: string;
  pauseLabel: string;
  playLabel: string;
  /** Read after the play/pause verb by assistive tech only. */
  subject: string;
  /** Placement, from the hero: the full-bleed film layers, and the chapter bar. */
  filmClassName?: string;
  chaptersClassName?: string;
}

const pad = (value: number) => String(value).padStart(2, "0");
const cx = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

function parseHex(hex: string): [number, number, number] {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return [1, 1, 1];
  const value = parseInt(match[1], 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

/**
 * The hero's reel: each flagship fills the screen, and the next is poured in
 * as ink rising from its chapter (FluidReel). Without WebGL2 half-float
 * targets, or under reduced motion, the films crossfade instead.
 */
export function HeroReel({ items, label, pauseLabel, playLabel, subject, filmClassName, chaptersClassName }: HeroReelProps) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const labelId = useId();

  // `target` is the chapter asked for; `shown` is the film filling the screen.
  // With the fluid on, `shown` catches up when the ink lands.
  const [target, setTarget] = useState(0);
  const [shown, setShown] = useState(0);
  // The fluid turns on with its first real frame; null until then, false if it can't run.
  const [fluidState, setFluidState] = useState<boolean | null>(null);
  const [paused, setPaused] = useState(false);
  const [onscreen, setOnscreen] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [focusing, setFocusing] = useState(false);
  // Bit i set: film i's clip has a frame up, so it shows over its poster.
  const [ready, setReady] = useState(0);

  const fluid = fluidState === true && !reducedMotion;
  const displayed = fluid ? shown : target;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filmRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const chapterRefs = useRef<(HTMLLIElement | null)[]>([]);
  const reelRef = useRef<FluidReel | null>(null);
  const displayedRef = useRef(displayed);
  const targetRef = useRef(target);
  const intent = useRef<number | undefined>(undefined);

  const canPlay = !reducedMotion && !paused && onscreen;

  // The film to draw for chapter `index`: its clip once it has a frame, else its poster.
  const sourceOf = (index: number) => {
    const video = videoRefs.current[index];
    if (video && video.readyState >= 2 && video.videoWidth > 0) return video;
    const image = filmRefs.current[index]?.querySelector("img");
    return image && image.complete && image.naturalWidth > 0 ? image : null;
  };

  // Clips: the film on show plays, and so does the one pouring in.
  useEffect(() => {
    displayedRef.current = displayed;
    targetRef.current = target;
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      const wanted = index === displayed || (fluid && index === target);
      if (wanted && canPlay) {
        // preload="none" until a film is first wanted, then fetch its clip.
        if (!video.getAttribute("src")) video.src = items[index].video;
        video.play().catch(() => {
          // Autoplay refused or interrupted: the poster stays up.
        });
        return;
      }
      if (!video.paused) video.pause();
      if (!wanted && video.currentTime > 0) {
        video.currentTime = 0;
        setReady((mask) => mask & ~(1 << index));
      }
    });
  }, [displayed, target, fluid, canPlay, items]);

  // The fluid: created once, unless motion is reduced or the GPU can't host it.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const reel = FluidReel.create(canvas, () => {
      setShown(targetRef.current);
      setFluidState(true);
    });
    if (!reel) {
      queueMicrotask(() => setFluidState(false));
      return;
    }
    reelRef.current = reel;
    reel.setFilm(() => sourceOf(displayedRef.current));

    const host = canvas.parentElement;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.intersectionRatio > VISIBLE_RATIO;
        setOnscreen(visible);
        if (visible) reel.start();
        else reel.stop();
      },
      { threshold: [0, VISIBLE_RATIO] },
    );
    visibility.observe(canvas);
    const resize = new ResizeObserver(() => reel.resize());
    resize.observe(canvas);
    const stir = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const box = canvas.getBoundingClientRect();
      reel.stir(event.clientX - box.left, event.clientY - box.top);
    };
    const endStir = () => reel.endStir();
    host?.addEventListener("pointermove", stir, { passive: true });
    host?.addEventListener("pointerleave", endStir);
    reel.start();

    return () => {
      visibility.disconnect();
      resize.disconnect();
      host?.removeEventListener("pointermove", stir);
      host?.removeEventListener("pointerleave", endStir);
      reel.dispose();
      reelRef.current = null;
      setFluidState(null);
    };
  }, [reducedMotion]);

  // Pour the asked-for chapter in, rising from that chapter. One pour at a
  // time; if the ask moved on meanwhile, the next pour follows on landing.
  useEffect(() => {
    const reel = reelRef.current;
    const canvas = canvasRef.current;
    if (!fluid || !reel || !canvas || target === shown || reel.pouring) return;
    const chapter = chapterRefs.current[target];
    const box = canvas.getBoundingClientRect();
    const from = chapter?.getBoundingClientRect();
    const origin = from
      ? { x: from.left + from.width * 0.3 - box.left, y: from.top - box.top }
      : { x: box.width * 0.5, y: box.height };
    const colour = chapter ? parseHex(getComputedStyle(chapter).getPropertyValue("--v-deep")) : [1, 1, 1];
    const next = target;
    reel.setFilm(() => sourceOf(shown));
    reel.pour(() => sourceOf(next), origin, colour as [number, number, number], () => {
      reel.setFilm(() => sourceOf(next));
      setShown(next);
    });
  }, [fluid, target, shown]);

  useEffect(() => {
    const videos = videoRefs.current;
    return () => {
      window.clearTimeout(intent.current);
      videos.forEach((video) => video?.pause());
    };
  }, []);

  function handleChapterPointerEnter(event: ReactPointerEvent<HTMLAnchorElement>, index: number) {
    if (event.pointerType === "touch") return;
    setHovering(true);
    window.clearTimeout(intent.current);
    intent.current = window.setTimeout(() => setTarget(index), HOVER_INTENT_MS);
  }

  function handleChaptersPointerLeave(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    window.clearTimeout(intent.current);
    setHovering(false);
  }

  function handleChapterFocus(event: FocusEvent<HTMLAnchorElement>, index: number) {
    // Mouse clicks focus links too; only keyboard focus should change the film.
    if (!event.currentTarget.matches(":focus-visible")) return;
    setFocusing(true);
    setTarget(index);
  }

  // The active chapter's progress line is the reel's timer: when it fills, move on.
  function handleDwellEnd(event: AnimationEvent<HTMLSpanElement>) {
    if (event.target !== event.currentTarget) return;
    setTarget((targetRef.current + 1) % items.length);
  }

  function handlePlaying(index: number) {
    setReady((mask) => mask | (1 << index));
  }

  if (items.length === 0) return null;

  return (
    <>
      <div className={cx(styles.films, filmClassName)} aria-hidden="true">
        {items.map((item, index) => (
          <div
            key={item.vertical}
            ref={(film) => {
              filmRefs.current[index] = film;
            }}
            className={styles.film}
            data-active={index === displayed || undefined}
            data-ready={(ready & (1 << index)) !== 0 || undefined}
          >
            <Image
              className={styles.poster}
              src={item.poster}
              alt=""
              fill
              sizes="100vw"
              // Every poster loads up front: each one is a pour waiting to happen.
              loading="eager"
              fetchPriority={index === 0 ? "high" : undefined}
            />
            <video
              ref={(video) => {
                videoRefs.current[index] = video;
                // Set the property as well as the attribute: autoplay
                // policies check it when play() is called.
                if (video) video.muted = true;
              }}
              className={styles.video}
              muted
              loop
              playsInline
              preload="none"
              disablePictureInPicture
              disableRemotePlayback
              onPlaying={() => handlePlaying(index)}
            />
          </div>
        ))}
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          data-ready={fluid || undefined}
        />
        <span className={styles.shade} />
      </div>

      <div
        className={cx(styles.chapters, chaptersClassName)}
        data-hold={hovering || focusing || undefined}
        data-paused={paused || undefined}
        data-offscreen={!onscreen || undefined}
      >
        <div className={styles.head}>
          <p id={labelId} className={styles.label}>
            {label}
          </p>
          {!reducedMotion && (
            <button type="button" className={styles.toggle} onClick={() => setPaused((value) => !value)}>
              <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
                {paused ? (
                  <path d="M2 1.2v7.6L8.6 5z" fill="currentColor" />
                ) : (
                  <path d="M2 1.2h2.2v7.6H2zM5.8 1.2H8v7.6H5.8z" fill="currentColor" />
                )}
              </svg>
              {paused ? playLabel : pauseLabel}
              <span className="sr-only"> {subject}</span>
            </button>
          )}
        </div>
        <ol className={styles.list} aria-labelledby={labelId} onPointerLeave={handleChaptersPointerLeave}>
          {items.map((item, index) => (
            <li
              key={item.vertical}
              ref={(chapter) => {
                chapterRefs.current[index] = chapter;
              }}
              className={styles.chapter}
              data-vertical={item.vertical}
              data-active={index === target || undefined}
            >
              <span className={styles.dwell} aria-hidden="true">
                <span className={styles.dwellFill} onAnimationEnd={handleDwellEnd} />
              </span>
              <Link
                href={item.href}
                className={styles.link}
                onPointerEnter={(event) => handleChapterPointerEnter(event, index)}
                onFocus={(event) => handleChapterFocus(event, index)}
                onBlur={() => setFocusing(false)}
              >
                <span className={styles.num} aria-hidden="true">
                  {pad(index + 1)}
                </span>
                <span className={styles.title}>{item.title}</span>
                <span className="sr-only">, </span>
                <span className={styles.meta}>
                  {item.verticalName}
                  <span className="sr-only">, </span>
                  <span className={styles.tag}>{item.tag}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
