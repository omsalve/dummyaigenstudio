// Shared content types. Components render strings and media only from /content.

/**
 * Palette ids: the palette board's four palettes. The brand brief fixes which
 * vertical takes which (content/verticals.ts), and each id names a
 * [data-vertical] block in styles/tokens.css.
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

/** An image, and the point to keep in view when it's cropped. */
export interface FramedImage {
  src: string;
  /** CSS object-position, e.g. "50% 30%". Defaults to the centre. */
  focus?: string;
}

/** The three practices: Light (moving image), Matter (things we make), Reality (things we build). */
export type ServiceGroupId = "light" | "matter" | "reality";

export interface ServiceGroup {
  id: ServiceGroupId;
  /** Heads the group's run of words in MassField's left column. */
  name: string;
  /**
   * Shown in MassField's frame while this group's words pass the hairline.
   * The frame alternates between 9:16 and 16:9, so it's cropped to both.
   */
  image: FramedImage;
  /** Purpose-cut crops for each frame shape. Either one falls back to `image`. */
  images?: {
    portrait?: FramedImage;
    landscape?: FramedImage;
  };
}

/** A still or a short muted loop. Loops need a poster: their first frame. */
export type ServiceMedia =
  | ({ kind: "image" } & FramedImage)
  | ({ kind: "video"; poster: string } & FramedImage);

export interface Service {
  /** Full name, as the Services section sets it. */
  name: string;
  /** MassField's left column sets this in caps on one line, so keep it short. */
  shortName: string;
  /** One line under the name in the Services section. */
  line: string;
  group: ServiceGroupId;
  /** Revealed beside the row on hover in the Services section. */
  media?: ServiceMedia;
  /** Rows don't link anywhere yet. */
  href?: string;
}

export interface Platform {
  name: string;
  /**
   * The company's official wordmark, an SVG from its press kit, shown in
   * place of the name (which becomes its alt text). Width and height are the
   * file's intrinsic size; the row sets it to the text's height.
   */
  logo?: { src: string; width: number; height: number };
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
