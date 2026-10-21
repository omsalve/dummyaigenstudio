import type { Service, ServiceGroup } from "./types";

/**
 * The three practices, in the order MassField's left column lists them. Each
 * one heads its own run of services (those below that name it as `group`).
 * MassField's frame alternates between 9:16 and 16:9, cropping `image` to each
 * around its `focus`; give `images.portrait` / `images.landscape` to supply
 * purpose-cut crops instead.
 *
 * [ASSET] Frame images are the rendered flagship stand-ins (16:9 stills).
 */
export const serviceGroups: readonly ServiceGroup[] = [
  // Moving image
  { id: "light", name: "Light", image: { src: "/media/flagship/standin/flagship-01.jpg", focus: "55% 45%" } },
  // Things we make
  { id: "matter", name: "Matter", image: { src: "/media/flagship/standin/flagship-04.jpg", focus: "52% 55%" } },
  // Things we build
  { id: "reality", name: "Reality", image: { src: "/media/flagship/standin/flagship-02.jpg", focus: "57% 52%" } },
];

/**
 * Every service, in the order the Services section numbers them (01–10).
 * MassField lists the same services by group, using `shortName`.
 *
 * [ASSET] `media` points at stand-ins already in /public/media: the flagship
 * loops for the moving-image services, flat placeholders for the rest. Swap in
 * a still or a short muted loop (with its first frame as the poster) per service.
 */
export const services: readonly Service[] = [
  {
    name: "Social Media Creatives",
    shortName: "Social creatives",
    line: "Hooky, surreal graphics that stop the scroll.",
    group: "matter",
    media: { kind: "image", src: "/media/services/service-01.jpg" },
  },
  {
    name: "Graphics & Visual Communication",
    shortName: "Graphics",
    line: "Key visuals, packaging, hoardings, printables. Any graphic, any format.",
    group: "matter",
    media: { kind: "image", src: "/media/services/service-02.jpg" },
  },
  {
    name: "Websites",
    shortName: "Websites",
    line: "Next-gen, immersive websites.",
    group: "reality",
    media: { kind: "image", src: "/media/services/service-03.jpg" },
  },
  {
    name: "Ad Films",
    shortName: "Ad films",
    line: "Short, crisp films that sell a feeling.",
    group: "light",
    media: {
      kind: "video",
      src: "/media/flagship/standin/flagship-01.webm",
      poster: "/media/flagship/standin/flagship-01.jpg",
    },
  },
  {
    name: "UGC Videos",
    shortName: "UGC videos",
    line: "AI models showcasing your product.",
    group: "light",
    media: {
      kind: "video",
      src: "/media/flagship/standin/flagship-04.webm",
      poster: "/media/flagship/standin/flagship-04.jpg",
    },
  },
  {
    name: "Brand Films",
    shortName: "Brand films",
    line: "Real production and AI, in one film.",
    group: "light",
    media: {
      kind: "video",
      src: "/media/flagship/standin/flagship-02.webm",
      poster: "/media/flagship/standin/flagship-02.jpg",
    },
  },
  {
    name: "AI VFX",
    shortName: "AI VFX",
    line: "Re-imagine the footage you already have.",
    group: "light",
    media: {
      kind: "video",
      src: "/media/flagship/standin/flagship-03.webm",
      poster: "/media/flagship/standin/flagship-03.jpg",
    },
  },
  {
    name: "Custom Applications",
    shortName: "Custom apps",
    line: "AI-powered workflows, built around how you work.",
    group: "reality",
    media: { kind: "image", src: "/media/industries/industry-01-2.jpg" },
  },
  {
    name: "Real Estate Renders",
    shortName: "Renders",
    line: "Conventional rendering, finished with AI.",
    group: "matter",
    media: { kind: "image", src: "/media/industries/industry-02-1.jpg" },
  },
  {
    name: "Product Ads",
    shortName: "Product ads",
    line: "Cinematic, VO-led product videos with graphics.",
    group: "light",
    media: {
      kind: "video",
      src: "/media/flagship/flagship-01.mp4",
      poster: "/media/flagship/flagship-01.jpg",
    },
  },
];
