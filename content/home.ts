export const hero = {
  /** [COPY] Placeholder tagline until the final statement is written. */
  statement: "AI-led creativity. Real-world impact.",
  /** The words of the statement set in the accent italic. Must appear in it verbatim. */
  statementAccent: "impact.",
  /** Primary action, as on the palette board's hero panels. Points at the industries chapter. */
  action: { label: "Explore work", href: "#work" },
} as const;

export const flagshipStage = {
  /** Caption over the flagship index, and the list's accessible name. */
  label: "Flagship projects",
  /** The reel's play control. `subject` follows the verb for assistive tech only. */
  pause: "Pause",
  play: "Play",
  subject: "flagship reel",
} as const;

export const massField = {
  /** [COPY] Section heading for assistive tech; the field itself is the visual heading. */
  title: "Services and industries",
  /** Names of the two lists, set small over each column. */
  servicesLabel: "Services",
  industriesLabel: "Industries",
  /** [COPY] Bracketed line above the image. Placeholder lifted from the palette board. */
  tagline: "For a more visual world",
  /** [COPY] Scroll cue under the image while the field is pinned. */
  cue: "Scroll",
  /**
   * [COPY] Small annotations that drift past the pinned field, lifted from the
   * palette board. A `typed` note is typed out behind a block cursor.
   */
  notes: [
    { lines: ["Light", "Matter", "Reality"] },
    { lines: ["Imagery", "Spaces", "Products", "Ideas", "Experiences"] },
    { lines: ["We make ideas tangible"], typed: true },
  ],
} as const;

export const stringChapter = {
  /** Anchor for the hero's "Explore work" link. */
  id: "work",
  /** [COPY] Section heading for assistive tech. */
  title: "Industries",
  /** Accessible name for the string navigation. */
  navLabel: "Industries",
  /** Word between the current numeral and the total, set as "OF 04". */
  countJoiner: "of",
} as const;
