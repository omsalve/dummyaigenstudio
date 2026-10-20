"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, RefObject, SyntheticEvent } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NARROW_QUERY, REDUCED_MOTION_QUERY } from "@/lib/media-queries";
import { useMediaQuery } from "@/lib/use-media-query";
import styles from "./MassField.module.css";

// Tuning: the bracket curve. Each column bows out to the screen edge at the
// hairline and swings in toward the image above and below it, so the two
// columns frame the image as a "(" and a ")".
/** One full swing, inward peak to inward peak, in stage heights. */
const CURVE_PERIOD = 0.72;
/** Largest swing, as a fraction of viewport width. Columns with long words swing less. */
const CURVE_MAX_VW = 0.15;
const CURVE_MAX_VW_NARROW = 0.06;
/** Closest a swung word may come to the centre line, as a fraction of viewport width. */
const CURVE_INNER_VW = 0.09;
// Tuning: notes
/** How far a note's lines fly in from and out to, as a fraction of viewport width. */
const NOTE_TRAVEL_VW = 0.22;
/** Seconds between one line of a note and the next. */
const NOTE_STAGGER = 0.08;
/** Seconds per typed character. */
const TYPE_STEP = 0.05;
// Tuning: light
/** Seconds the glow takes to catch up with the pointer. */
const GLOW_LAG = 1.6;
/** Frame shape until the active image reports its own. Keep in sync with --frame-ratio in the CSS. */
const DEFAULT_RATIO = 4 / 5;
/**
 * When each note slot is shown, as ScrollTrigger [start, end]. Each window keeps
 * its slot ([data-slot] in the CSS) in a stretch the curve leaves clear: slot 0
 * sits top right, where the words have swung in; slots 1 and 2 sit between the
 * frame and the right column, near the hairline. Notes past the last slot reuse them.
 */
const NOTE_WINDOWS = [
  ["top 26%", "bottom 2%"],
  ["top 60%", "top 26%"],
  ["top 60%", "top 26%"],
] as const;
/** The cue's pixel chevron, as [column, row] cells on a 5 × 3 grid. */
const CHEVRON = [
  [1, 1],
  [5, 1],
  [2, 2],
  [4, 2],
  [3, 3],
] as const;

type Mode = "pinned" | "flow" | "static";

export interface MassFieldGroup {
  name: string;
  items: readonly string[];
}

export interface MassFieldServiceGroup extends MassFieldGroup {
  image: string;
}

export interface MassFieldNote {
  lines: readonly string[];
  /** Typed out behind a block cursor instead of flying in as set. */
  typed?: boolean;
}

interface MassFieldProps {
  /** Section heading for assistive tech. */
  title: string;
  servicesLabel: string;
  industriesLabel: string;
  /** Bracketed line above the image. */
  tagline: string;
  /** Bracketed label set over the image. */
  frameLabel: string;
  /** Scroll cue under the image. */
  cue: string;
  notes: readonly MassFieldNote[];
  services: readonly MassFieldServiceGroup[];
  industries: readonly MassFieldGroup[];
}

interface FieldColumn {
  el: HTMLElement;
  words: HTMLElement[];
  /** Word centres: column coordinates when pinned, page coordinates in flow. */
  centres: number[];
  /** Peak inward swing, px. */
  swing: number;
  /** 1 swings words right (services, the left column), -1 swings them left (industries). */
  inward: 1 | -1;
  /** Column translation that sets the first word on the hairline. */
  base: number;
  /** Row the column stops at: its last word, on the hairline. */
  lastRow: number;
  lastY: number;
  lastX: number[];
}

interface Active {
  services: number;
  industries: number;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function countWords(groups: readonly MassFieldGroup[]) {
  return groups.reduce((sum, group) => sum + 1 + group.items.length, 0);
}

/** A word as listed, and the bracketed form it turns into on the hairline (or under the pointer). */
function WordFace({ label }: { label: string }) {
  return (
    <>
      <span className={styles.wordText} data-word-text>
        {label}
      </span>
      <span className={styles.wordAlt} aria-hidden="true">
        {label}
      </span>
    </>
  );
}

interface ColumnProps {
  label: string;
  groups: readonly MassFieldGroup[];
  /** Index of the lit word in the column's flat word order; -1 for none. */
  active: number;
  className: string;
  columnRef: RefObject<HTMLDivElement | null>;
}

/** One column: each group's name, then its items, all set at one size on one pitch. */
function FieldList({ label, groups, active, className, columnRef }: ColumnProps) {
  // Index of each group's name in the column's flat word order.
  const firstWord = groups.map((_, index) => countWords(groups.slice(0, index)));

  return (
    <div ref={columnRef} className={className}>
      <ul className={styles.list} aria-label={label}>
        {groups.map((group, index) => (
          <li key={group.name} className={styles.group}>
            <h3 className={styles.word} data-word data-active={firstWord[index] === active || undefined}>
              <span className={styles.wordIndex} aria-hidden="true">
                {pad(index + 1)}
              </span>
              <WordFace label={group.name} />
            </h3>
            <ul className={styles.list}>
              {group.items.map((item, itemIndex) => (
                <li
                  key={item}
                  className={styles.word}
                  data-word
                  data-active={firstWord[index] + 1 + itemIndex === active || undefined}
                >
                  <WordFace label={item} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MassField({
  title,
  servicesLabel,
  industriesLabel,
  tagline,
  frameLabel,
  cue,
  notes,
  services,
  industries,
}: MassFieldProps) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const narrow = useMediaQuery(NARROW_QUERY);
  const mode: Mode = reducedMotion ? "static" : narrow ? "flow" : "pinned";
  const [active, setActive] = useState<Active>({ services: 0, industries: 0 });
  const [ratios, setRatios] = useState<(number | undefined)[]>([]);

  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

  // Category of each service word, in column order: the frame shows the lit word's category.
  const serviceGroupOf = services.flatMap((group, index) => [index, ...group.items.map(() => index)]);
  const rows = Math.max(serviceGroupOf.length, countWords(industries));
  // Reduced motion lights nothing: every word stays at full strength.
  const lit: Active = mode === "static" ? { services: -1, industries: -1 } : active;
  const activeImage = serviceGroupOf[Math.max(0, lit.services)] ?? 0;
  const frameRatio = ratios[activeImage] ?? DEFAULT_RATIO;

  function handleImageLoad(index: number, event: SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (!naturalWidth || !naturalHeight) return;
    const ratio = naturalWidth / naturalHeight;
    setRatios((current) => {
      if (current[index] === ratio) return current;
      const next = [...current];
      next[index] = ratio;
      return next;
    });
  }

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const servicesEl = servicesRef.current;
    const industriesEl = industriesRef.current;
    // Reduced motion: a static layout with every word at full strength; nothing to drive.
    if (mode === "static" || !root || !stage || !servicesEl || !industriesEl) return;

    gsap.registerPlugin(ScrollTrigger);
    const pinned = mode === "pinned";

    const makeColumn = (el: HTMLElement, inward: 1 | -1): FieldColumn => {
      const words = [...el.querySelectorAll<HTMLElement>("[data-word]")];
      // Infinity (not NaN) so the first comparison against them always writes.
      return {
        el,
        words,
        centres: [],
        swing: 0,
        inward,
        base: 0,
        lastRow: Math.max(0, words.length - 1),
        lastY: Infinity,
        lastX: words.map(() => Infinity),
      };
    };
    const columns = [makeColumn(servicesEl, 1), makeColumn(industriesEl, -1)];
    const rowCount = Math.max(...columns.map((column) => column.words.length));

    // Cached measurements, refreshed with ScrollTrigger (load, resize, font swap).
    let pitch = 0;
    /** The hairline: stage coordinates when pinned, viewport coordinates in flow. */
    let lineY = 0;
    let period = 1;
    let reported: Active = { services: -1, industries: -1 };

    const measure = () => {
      const width = root.clientWidth;
      const scrollY = window.scrollY;
      const maxSwing = width * (pinned ? CURVE_MAX_VW : CURVE_MAX_VW_NARROW);
      lineY = (pinned ? stage.clientHeight : window.innerHeight) / 2;
      period = CURVE_PERIOD * lineY * 2;

      for (const column of columns) {
        const widest = Math.max(
          0,
          ...column.words.map((word) => word.querySelector<HTMLElement>("[data-word-text]")?.offsetWidth ?? 0),
        );
        if (pinned) {
          column.centres = column.words.map((word) => word.offsetTop + word.offsetHeight / 2);
          // From the column's outer edge to the closest a word may come to the centre line.
          const outer =
            column.inward === 1 ? column.el.offsetLeft : width - column.el.offsetLeft - column.el.offsetWidth;
          const room = width / 2 - width * CURVE_INNER_VW - outer;
          column.swing = Math.min(maxSwing, Math.max(0, room - widest));
          column.base = lineY - column.el.offsetTop - (column.centres[0] ?? 0);
        } else {
          column.centres = column.words.map((word) => {
            const box = word.getBoundingClientRect();
            return box.top + scrollY + box.height / 2;
          });
          column.swing = Math.min(maxSwing, Math.max(0, column.el.clientWidth - widest));
        }
      }
      const [first, second] = columns[0].centres;
      pitch = second !== undefined ? second - first : (columns[0].words[0]?.offsetHeight ?? 0);
    };

    const render = (trigger: ScrollTrigger) => {
      // Pinned: both columns rise together, one row per pitch. The shorter one
      // stops once its last word is on the hairline, a whole row out, so rows stay level.
      const progressRow = pinned ? trigger.progress * Math.max(0, rowCount - 1) : 0;
      const scrollY = trigger.scroll();
      const next: Active = { services: 0, industries: 0 };

      columns.forEach((column, columnIndex) => {
        const { centres, words } = column;
        if (!centres.length) return;

        // Offset that turns a word centre into its distance from the hairline.
        let shift: number;
        if (pinned) {
          const position = Math.min(progressRow, column.lastRow);
          const y = column.base - position * pitch;
          if (Math.abs(y - column.lastY) > 0.05) {
            column.el.style.transform = `translate3d(0,${y.toFixed(2)}px,0)`;
            column.lastY = y;
          }
          shift = -centres[0] - position * pitch;
        } else {
          shift = -scrollY - lineY;
        }

        let nearest = 0;
        let best = Infinity;
        for (let i = 0; i < centres.length; i++) {
          const distance = centres[i] + shift;
          if (Math.abs(distance) < best) {
            best = Math.abs(distance);
            nearest = i;
          }
          // Well off stage: leave the word where it is until it comes back.
          if (Math.abs(distance) > lineY * 1.5) continue;
          const x = (column.inward * column.swing * (1 - Math.cos((2 * Math.PI * distance) / period))) / 2;
          if (Math.abs(x - column.lastX[i]) > 0.05) {
            words[i].style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
            column.lastX[i] = x;
          }
        }
        if (columnIndex === 0) next.services = nearest;
        else next.industries = nearest;
      });

      if (next.services !== reported.services || next.industries !== reported.industries) {
        reported = next;
        setActive(next);
      }
      // The cue hides once the last row has arrived.
      root.toggleAttribute("data-end", pinned && trigger.progress > 0.97);
    };

    let frameId = 0;
    let handlePointerMove: ((event: PointerEvent) => void) | null = null;
    // Every tween and trigger made here, or later by a contextSafe function, is undone by context.revert().
    const context = gsap.context((_self, contextSafe) => {
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: pinned ? "top top" : "top bottom",
        end: pinned ? "bottom bottom" : "bottom top",
        onUpdate: render,
        onRefresh: (self) => {
          measure();
          render(self);
        },
      });
      frameId = requestAnimationFrame(() => {
        measure();
        render(trigger);
      });
      if (!pinned) return;

      // The light drifts after a fine pointer; otherwise it rests where the CSS puts it.
      const glow = glowRef.current;
      if (glow && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const toX = gsap.quickTo(glow, "x", { duration: GLOW_LAG, ease: "power3" });
        const toY = gsap.quickTo(glow, "y", { duration: GLOW_LAG, ease: "power3" });
        handlePointerMove = (event) => {
          const box = stage.getBoundingClientRect();
          // x/y move the glow's centre from where the CSS rests it.
          toX(event.clientX - box.left - glow.offsetLeft - glow.offsetWidth / 2);
          toY(event.clientY - box.top - glow.offsetTop - glow.offsetHeight / 2);
        };
        root.addEventListener("pointermove", handlePointerMove);
      }

      // Notes drift past at page speed while the field is pinned; each one's
      // lines fly in one after another as it rises into view, and out again.
      if (!contextSafe) return;
      const travel = () => -window.innerWidth * NOTE_TRAVEL_VW;
      root.querySelectorAll<HTMLElement>("[data-note]").forEach((note, index) => {
        const [start, end] = NOTE_WINDOWS[index % NOTE_WINDOWS.length];
        const lines = [...note.querySelectorAll<HTMLElement>("[data-note-line]")];
        const typed = [...note.querySelectorAll<HTMLElement>("[data-typed]")];
        let typing: gsap.core.Timeline | null = null;
        gsap.set(lines, { x: travel, autoAlpha: 0 });

        const show = contextSafe(() => {
          gsap.to(lines, {
            x: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "expo.out",
            stagger: NOTE_STAGGER,
            overwrite: true,
          });
          if (!typed.length) return;
          typing?.kill();
          typing = gsap.timeline({ delay: 0.35 });
          for (const el of typed) {
            const text = el.dataset.typed ?? "";
            const state = { count: 0 };
            el.textContent = "";
            typing.to(state, {
              count: text.length,
              duration: text.length * TYPE_STEP,
              ease: "none",
              onUpdate: () => {
                el.textContent = text.slice(0, Math.floor(state.count));
              },
            });
          }
        }) as () => void;
        const hide = contextSafe(() => {
          gsap.to(lines, {
            x: travel,
            autoAlpha: 0,
            duration: 0.7,
            ease: "expo.in",
            stagger: NOTE_STAGGER,
            overwrite: true,
          });
        }) as () => void;

        ScrollTrigger.create({
          trigger: note,
          start,
          end,
          onEnter: show,
          onEnterBack: show,
          onLeave: hide,
          onLeaveBack: hide,
        });
      });
    }, root);

    root.dataset.ready = "";

    return () => {
      cancelAnimationFrame(frameId);
      if (handlePointerMove) root.removeEventListener("pointermove", handlePointerMove);
      context.revert();
      delete root.dataset.ready;
      root.removeAttribute("data-end");
      for (const column of columns) {
        column.el.style.removeProperty("transform");
        for (const word of column.words) word.style.removeProperty("transform");
      }
    };
    // The content props only change with new content; the effect drives the words they render.
  }, [mode, services, industries, notes]);

  return (
    <section
      ref={rootRef}
      className={styles.root}
      aria-labelledby="mass-field-title"
      data-mode={mode}
      style={{ "--field-rows": rows } as CSSProperties}
    >
      <h2 id="mass-field-title" className="sr-only">
        {title}
      </h2>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.backdrop} aria-hidden="true">
          <div ref={glowRef} className={styles.glow} />
        </div>

        <div className={styles.mass} aria-hidden="true">
          <span className={styles.hairline} />
          <div className={styles.frame} style={{ "--frame-ratio": frameRatio } as CSSProperties}>
            {services.map((group, index) => (
              <Image
                key={group.name}
                className={styles.image}
                src={group.image}
                alt=""
                fill
                sizes="(max-width: 767.98px) 46vw, 15vw"
                data-active={index === activeImage || undefined}
                onLoad={(event) => handleImageLoad(index, event)}
              />
            ))}
          </div>
          <span className={styles.frameLabel}>{frameLabel}</span>
        </div>

        <p className={styles.tagline}>{tagline}</p>
        <p className={`${styles.caption} ${styles.captionServices}`} aria-hidden="true">
          {servicesLabel}
        </p>
        <p className={`${styles.caption} ${styles.captionIndustries}`} aria-hidden="true">
          {industriesLabel}
        </p>

        <FieldList
          label={servicesLabel}
          groups={services}
          active={lit.services}
          className={`${styles.column} ${styles.columnServices}`}
          columnRef={servicesRef}
        />
        <FieldList
          label={industriesLabel}
          groups={industries}
          active={lit.industries}
          className={`${styles.column} ${styles.columnIndustries}`}
          columnRef={industriesRef}
        />

        <p className={styles.cue} aria-hidden="true">
          <span className={styles.chevron}>
            {CHEVRON.map(([column, row]) => (
              <span key={`${column}-${row}`} style={{ gridColumn: column, gridRow: row }} />
            ))}
          </span>
          {cue}
        </p>
        <span className={styles.grain} aria-hidden="true" />
      </div>

      {notes.length > 0 && (
        <div className={styles.notes} aria-hidden="true">
          {notes.map((note, index) => (
            <p key={index} className={styles.note} data-note data-slot={index % NOTE_WINDOWS.length}>
              {note.lines.map((line, lineIndex) => (
                <span key={lineIndex} className={styles.noteLine} data-note-line>
                  {note.typed ? <span data-typed={line} /> : line}
                </span>
              ))}
              {note.typed && (
                <span className={styles.noteLine} data-note-line>
                  <span className={styles.caret} />
                </span>
              )}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
