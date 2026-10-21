/**
 * Page metadata, from content/copy.json › home.meta.
 * [COPY] The deck's description says "architecture"; it reads "interiors" here
 * to match the verticals. Confirm the wording.
 */
export const meta = {
  description:
    "Film, design and web for jewellery, real estate, interiors and pharma. An AI-led Mumbai studio built by people who learnt the craft before AI.",
} as const;

export const hero = {
  /**
   * The h1, as two lines: each `lead` word in full white, the `rest` at half strength.
   * [COPY] Alternates:
   *   "Light, bent to your story." / "Matter, made worth wanting."
   *   "Light, directed." / "Matter, made tangible."
   */
  lines: [
    { lead: "Light", rest: " that stops the scroll." },
    { lead: "Matter", rest: " that makes them buy." },
  ],
  /**
   * Set huge in the script between the plate and its subject. Decorative on
   * screen; the h1 ends on it for assistive tech, completing the trio.
   */
  reality: "Reality",
  /** Primary action, as on the palette board's hero panels. Points at the industries chapter. */
  action: { label: "Explore work", href: "#work" },
  /**
   * One image built as a depth sandwich: `background` is the full plate and
   * `subject` a cut-out with alpha on the same canvas (same size, same
   * registration), with "Reality" set between them. Desktop crops are 16:9,
   * mobile crops 9:16; portrait screens get the mobile crop.
   * [ASSET] Generated placeholders in /public/media/hero. Keep the subject
   * clear of the lower left, where the copy sits.
   */
  image: {
    background: { desktop: "/media/hero/hero-bg.jpg", mobile: "/media/hero/hero-bg-mobile.jpg" },
    subject: { desktop: "/media/hero/hero-subject.png", mobile: "/media/hero/hero-subject-mobile.png" },
    /** [COPY] One line describing the final image. This one describes the placeholder. */
    alt: "An orange sphere hanging in front of a flat cobalt backdrop.",
    /** Tuning: where the centre of "Reality" sits on each crop. */
    realityPosition: {
      desktop: { x: "50%", y: "38%" },
      mobile: { x: "50%", y: "30%" },
    },
  },
} as const;

/** [PARKED] Copy for HeroReel, which the hero no longer uses. */
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
