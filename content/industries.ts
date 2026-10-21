import type { Industry } from "./types";

/**
 * The four industries (one per vertical; names and order live in
 * content/verticals.ts). MassField lists each industry with its offerings;
 * StringChapter uses the headline, description and cards.
 *
 * Offerings, headlines and descriptions come from content/copy.json, moved to
 * the brief's palettes: the deck's "Architecture" is Interiors (solar), its
 * "Jewellery & Fashion" is Jewellery (coral) and its Pharma is citrus. The deck
 * keeps three alternates per headline.
 * [CONTENT] Card titles, summaries and links are placeholders; tags follow the
 * deck's, which are placeholders too. Images in /public/media/industries are
 * generated stand-ins, numbered by palette (01 solar, 02 cobalt, 03 citrus,
 * 04 coral), not by display order.
 */
export const industries: readonly Industry[] = [
  {
    vertical: "cobalt",
    offerings: ["Launch campaigns", "Project films", "AI visuals", "CRM workflows"],
    headline: "Every tower says luxury. Yours should say why.",
    description:
      "Launch storytelling for residential projects in Mumbai, Thane and Navi Mumbai. Narrative, films, AI visuals, landing pages and CRM workflows, from pre-launch to possession.",
    cards: [
      {
        title: "Project title 01.1",
        summary: "One-line summary of the project.",
        tag: "Concept",
        image: "/media/industries/industry-02-1.jpg",
        href: "#",
      },
      {
        title: "Project title 01.2",
        summary: "One-line summary of the project.",
        tag: "Client work",
        image: "/media/industries/industry-02-2.jpg",
        href: "#",
      },
    ],
  },
  {
    vertical: "solar",
    offerings: ["Interior shoots", "Walkthrough films", "Portfolio sites", "Practice brands"],
    headline: "Your spaces look expensive. Your portfolio doesn’t.",
    description:
      "Shoots, films and websites for architects and interior designers, so the practice looks as considered as the spaces it creates.",
    cards: [
      {
        title: "Project title 02.1",
        summary: "One-line summary of the project.",
        tag: "Client work",
        image: "/media/industries/industry-01-1.jpg",
        href: "#",
      },
    ],
  },
  {
    vertical: "coral",
    offerings: ["Jewellery shoots", "Festive campaigns", "AI lookbooks", "Brand films"],
    headline: "Show them why it costs what it costs.",
    description:
      "Shoots, films and campaign worlds for jewellers and fashion studios. Bridal gold gets one world, beachwear silver another. Never the same template twice.",
    cards: [
      {
        title: "Project title 03.1",
        summary: "One-line summary of the project.",
        tag: "Client work",
        image: "/media/industries/industry-04-1.jpg",
        href: "#",
      },
      {
        title: "Project title 03.2",
        summary: "One-line summary of the project.",
        tag: "Concept",
        image: "/media/industries/industry-04-2.jpg",
        href: "#",
      },
    ],
  },
  {
    vertical: "citrus",
    offerings: ["Explainer films", "Training videos", "Social strategy", "Websites"],
    headline: "Make the mechanism make sense.",
    description:
      "Explainer films, training videos, social and websites for small and mid pharma companies. Written from your approved claims, and reviewed by your medical team.",
    cards: [
      {
        title: "Project title 04.1",
        summary: "One-line summary of the project.",
        tag: "Concept",
        image: "/media/industries/industry-03-1.jpg",
        href: "#",
      },
      {
        title: "Project title 04.2",
        summary: "One-line summary of the project.",
        tag: "Client work",
        image: "/media/industries/industry-03-2.jpg",
        href: "#",
      },
    ],
  },
];
