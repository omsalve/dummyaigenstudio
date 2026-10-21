import type { FlagshipProject } from "./types";

/**
 * One flagship project per vertical. HeroReel orders them by
 * content/verticals.ts, so the order here doesn't matter.
 * [PARKED] HeroReel, the only thing that renders these, is parked.
 *
 * [CONTENT] Titles and links are placeholders; tags follow content/copy.json,
 * moved to the brief's palettes. The posters and clips in
 * /public/media/flagship/standin are rendered stand-ins: one lit still life per
 * palette (numbered by palette: 01 solar, 02 cobalt, 03 citrus, 04 coral), each
 * poster its clip's first frame, each clip an 8 s seamless WebM loop. Drop the
 * real media in and point these paths at it. The older flat-shape
 * placeholders still sit in /public/media/flagship.
 */
export const flagship: readonly FlagshipProject[] = [
  {
    vertical: "cobalt",
    title: "Flagship project 01",
    tag: "Client work",
    poster: "/media/flagship/standin/flagship-02.jpg",
    video: "/media/flagship/standin/flagship-02.webm",
    href: "#",
  },
  {
    vertical: "solar",
    title: "Flagship project 02",
    tag: "Client work",
    poster: "/media/flagship/standin/flagship-01.jpg",
    video: "/media/flagship/standin/flagship-01.webm",
    href: "#",
  },
  {
    vertical: "coral",
    title: "Flagship project 03",
    tag: "Concept",
    poster: "/media/flagship/standin/flagship-04.jpg",
    video: "/media/flagship/standin/flagship-04.webm",
    href: "#",
  },
  {
    vertical: "citrus",
    title: "Flagship project 04",
    tag: "Concept",
    poster: "/media/flagship/standin/flagship-03.jpg",
    video: "/media/flagship/standin/flagship-03.webm",
    href: "#",
  },
];
