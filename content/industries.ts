import type { Industry } from "./types";

/**
 * The four industries (one per vertical; names live in content/verticals.ts).
 * MassField lists each industry with its offerings; StringChapter uses the
 * headline, description and cards.
 *
 * [BRIEF] Offerings come from the brief, which wasn't in the repo, so they're
 * placeholders. [COPY] Headlines and descriptions are placeholders too.
 * [CONTENT] Cards are stand-ins; images in /public/media/industries are generated.
 */
export const industries: readonly Industry[] = [
  {
    vertical: "solar",
    offerings: ["Offering 01.1", "Offering 01.2", "Offering 01.3"],
    headline: "Headline for vertical 01",
    description: "A short description of what LMR does for this vertical, in one or two sentences.",
    cards: [
      {
        title: "Project title 01.1",
        summary: "One-line summary of the project.",
        tag: "Client work",
        image: "/media/industries/industry-01-1.jpg",
        href: "#",
      },
      {
        title: "Project title 01.2",
        summary: "One-line summary of the project.",
        tag: "Concept",
        image: "/media/industries/industry-01-2.jpg",
        href: "#",
      },
    ],
  },
  {
    vertical: "cobalt",
    offerings: ["Offering 02.1", "Offering 02.2", "Offering 02.3"],
    headline: "Headline for vertical 02",
    description: "A short description of what LMR does for this vertical, in one or two sentences.",
    cards: [
      {
        title: "Project title 02.1",
        summary: "One-line summary of the project.",
        tag: "Concept",
        image: "/media/industries/industry-02-1.jpg",
        href: "#",
      },
      {
        title: "Project title 02.2",
        summary: "One-line summary of the project.",
        tag: "Client work",
        image: "/media/industries/industry-02-2.jpg",
        href: "#",
      },
    ],
  },
  {
    vertical: "citrus",
    offerings: ["Offering 03.1", "Offering 03.2", "Offering 03.3"],
    headline: "Headline for vertical 03",
    description: "A short description of what LMR does for this vertical, in one or two sentences.",
    cards: [
      {
        title: "Project title 03.1",
        summary: "One-line summary of the project.",
        tag: "Client work",
        image: "/media/industries/industry-03-1.jpg",
        href: "#",
      },
    ],
  },
  {
    vertical: "coral",
    offerings: ["Offering 04.1", "Offering 04.2", "Offering 04.3"],
    headline: "Headline for vertical 04",
    description: "A short description of what LMR does for this vertical, in one or two sentences.",
    cards: [
      {
        title: "Project title 04.1",
        summary: "One-line summary of the project.",
        tag: "Concept",
        image: "/media/industries/industry-04-1.jpg",
        href: "#",
      },
      {
        title: "Project title 04.2",
        summary: "One-line summary of the project.",
        tag: "Client work",
        image: "/media/industries/industry-04-2.jpg",
        href: "#",
      },
    ],
  },
];
