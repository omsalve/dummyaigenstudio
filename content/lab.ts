import type { LabPost } from "./types";

/**
 * From the Lab: free digital products (prompt packs, templates, workflows)
 * and the write-ups behind them. Each one also goes out as an Instagram reel;
 * people comment the post's `keyword` on it to get the product by DM.
 *
 * [CONTENT] All three posts are placeholders: the titles are the planned
 * first three, everything else is stand-in, reel links included.
 * [ASSET] Covers are the rendered flagship stand-ins.
 */
export const labPosts: readonly LabPost[] = [
  {
    slug: "jewellery-lighting-prompt-pack",
    title: "The jewellery lighting prompt pack",
    kind: "Free prompt pack",
    excerpt: "The prompts we start from when gold has to look like gold: rim light, soft boxes and the reflections that sell a piece.",
    cover: "/media/flagship/standin/flagship-01.jpg",
    keyword: "GOLD",
    reelUrl: "https://www.instagram.com/",
    date: "2026-10-06",
  },
  {
    slug: "render-to-reel-real-estate-workflow",
    title: "Render to reel: our real estate workflow",
    kind: "Workflow",
    excerpt: "How a conventional render becomes a launch reel: the passes we run, the AI steps in between and where a human signs off.",
    cover: "/media/flagship/standin/flagship-02.jpg",
    keyword: "RENDER",
    reelUrl: "https://www.instagram.com/",
    date: "2026-10-13",
  },
  {
    slug: "ugc-without-the-shoot-starter-kit",
    title: "UGC without the shoot: a starter kit",
    kind: "Template",
    excerpt: "A starter kit for UGC-style product videos with AI models: briefs, shot lists and the checks that keep them believable.",
    cover: "/media/flagship/standin/flagship-03.jpg",
    keyword: "UGC",
    reelUrl: "https://www.instagram.com/",
    date: "2026-10-20",
  },
];

/** Posts newest first; `count` keeps only the latest few. */
export function latestLabPosts(count?: number): LabPost[] {
  const sorted = [...labPosts].sort((a, b) => b.date.localeCompare(a.date));
  return count === undefined ? sorted : sorted.slice(0, count);
}

export function findLabPost(slug: string): LabPost | undefined {
  return labPosts.find((post) => post.slug === slug);
}
