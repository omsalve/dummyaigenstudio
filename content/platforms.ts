import type { Platform } from "./types";

/**
 * The AI platforms the studio works with, in the order the "Platforms we use"
 * row sets them, as text wordmarks in Inter.
 * [ASSET] To show a company's official wordmark instead, add `logo` with the
 * SVG from its press kit. Never redraw or approximate a logo.
 */
export const platforms: readonly Platform[] = [
  { name: "Higgsfield" },
  { name: "Magnific" },
  { name: "ElevenLabs" },
  { name: "Google AI Studio" },
  { name: "Runway" },
];
