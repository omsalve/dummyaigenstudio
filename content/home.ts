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

export const about = {
  /** Small label over the statement. */
  eyebrow: "About us",
  /** The section's heading. */
  statement: "We were here before AI.",
  /** Set in the script. A word or two, lowercase, verbatim from the statement. */
  statementAccent: "before",
  body: "We’re an end-to-end production partner. Anything that needs real-world production (shoots, sets, crews, edits) we cover too. AI makes us faster. Years of doing it the hard way make us good.",
  /** The disciplines in the studio, set small under the body. Optional: an empty list hides the line. */
  disciplines: ["Filmmakers", "Cinematographers", "Designers", "Editors", "Strategists", "Creative directors"],
} as const;

/** The Services index. The services themselves live in content/services.ts. */
export const servicesIndex = {
  title: "Services",
  /** [COPY] One short line beside the heading. */
  subline: "From one scroll-stopping post to a full launch, made under one roof.",
} as const;

/** The consultation tile that closes the Services index. */
export const consultation = {
  title: "Something else?",
  body: "Get on a free 30-minute consultation call. We’ll find where AI can help you hit your business goals.",
  label: "Book a free call",
  /** [CONTENT] booking URL */
  href: "#",
} as const;

/** The "Platforms we use" row. The platforms themselves live in content/platforms.ts. */
export const platformsRow = {
  title: "Platforms we use",
  /** Closes the row, on its own line. */
  coda: "+ the right human minds",
  /** Set in the script: the punchline, verbatim from the coda. */
  codaAccent: "human minds",
} as const;

/**
 * From the Lab, on the homepage and its own pages (/lab, /lab/[slug]). The
 * posts live in content/lab.ts. {keyword} is replaced with each post's keyword.
 */
export const lab = {
  title: "From the Lab",
  /** [COPY] One line beside the heading. */
  intro: "Free prompt packs, templates and workflows from the work we do every day.",
  /** The homepage shows the latest few. */
  latestCount: 3,
  allLabel: "Everything from the Lab",
  readLabel: "Read",
  commentLabel: "Comment “{keyword}” on the reel",
  /** Read after an external link's label by assistive tech. */
  newTab: "opens in a new tab",
  /** The article page's call to comment. */
  getItTitle: "Get it free",
  getItBody: "Comment “{keyword}” on the reel and we’ll send it to you by DM.",
  backLabel: "From the Lab",
  /** The index page's description; each post's is its excerpt. [COPY] */
  description: "Free prompt packs, templates and workflows from an AI-led creative studio in Mumbai.",
} as const;

/** Why the work is unbranded: the last section before the contact slot. The industries chapter links here. */
export const discretion = {
  /** Anchor for the "Why is this work unbranded?" link (stringChapter.coda). */
  id: "discretion",
  eyebrow: "A note on what you’re seeing",
  headline: "Our clients are discreet. So are we.",
  body: "A lot of the work on this site is unbranded or recreated, on purpose. The brands we work with value their privacy, and we intend to keep it that way. That should tell you something: your confidentiality is safe with us too. Dummy or not, every frame you see here is 101% created or recreated by our team.",
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
  /** Small link under the last card, to the note on why the work is unbranded. */
  coda: { label: "Why is this work unbranded?", href: `#${discretion.id}` },
} as const;
