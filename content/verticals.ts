import type { Vertical } from "./types";

/**
 * The four verticals, in the brief's order. Everything that lists verticals
 * (the hero's reel, StringChapter) follows this order.
 *
 * [BRIEF] docs/lmr-brief.md was not in the repo, so names and order are
 * placeholders. Each id maps to a palette in styles/tokens.css.
 */
export const verticals: readonly Vertical[] = [
  { id: "solar", name: "Vertical 01" },
  { id: "cobalt", name: "Vertical 02" },
  { id: "citrus", name: "Vertical 03" },
  { id: "coral", name: "Vertical 04" },
];
