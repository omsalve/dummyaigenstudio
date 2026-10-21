import type { Vertical } from "./types";

/**
 * The four verticals, in the brief's order. Everything that lists verticals
 * (MassField's right column, StringChapter) follows this order.
 *
 * The brand brief fixes each vertical's palette (an id in styles/tokens.css).
 * content/copy.json maps them differently; the brief wins.
 */
export const verticals: readonly Vertical[] = [
  { id: "cobalt", name: "Real Estate" },
  { id: "solar", name: "Interiors" },
  { id: "coral", name: "Jewellery" },
  { id: "citrus", name: "Pharma" },
];
