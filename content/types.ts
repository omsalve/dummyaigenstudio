// Shared content types. Components render strings and media only from /content.

/**
 * [BRIEF] Placeholder ids named after the palette board's four palettes.
 * Replace with the brief's vertical ids, and rename the matching
 * [data-vertical] blocks in styles/tokens.css.
 */
export type VerticalId = "solar" | "cobalt" | "citrus" | "coral";

export interface Vertical {
  id: VerticalId;
  /** Display name. Components set it in tracked caps. */
  name: string;
}

export type ProjectTag = "Concept" | "Client work";

export interface FlagshipProject {
  vertical: VerticalId;
  title: string;
  tag: ProjectTag;
  /** 16:9 still. Use the clip's first frame so the poster-to-video handoff doesn't jump. */
  poster: string;
  /** 6–8 s, 720p, under 3 MB. Played muted and looped; no audio track needed. */
  video: string;
  href: string;
}

export interface ServiceCategory {
  name: string;
  services: readonly string[];
  /**
   * Shown at the centre of MassField while this category's words pass the
   * hairline. Any aspect ratio: the frame morphs to each image's own shape.
   */
  image: string;
}

export interface IndustryCard {
  title: string;
  summary: string;
  tag: ProjectTag;
  /** Square image; cropped to fit the card. */
  image: string;
  href: string;
}

export interface Industry {
  vertical: VerticalId;
  /** What LMR does for this industry (MassField, right column). */
  offerings: readonly string[];
  /** StringChapter panel copy. */
  headline: string;
  description: string;
  /** One or more stacked cards in StringChapter. */
  cards: readonly IndustryCard[];
}
