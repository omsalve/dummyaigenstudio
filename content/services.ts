import type { ServiceCategory } from "./types";

/**
 * Brief section 5: the three service categories and their sub-services.
 * MassField renders exactly these words and adds none of its own.
 *
 * [BRIEF] docs/lmr-brief.md was not in the repo, so every name here is a
 * placeholder. Replace with the brief's categories and sub-services. Images in
 * /public/media/services are generated stand-ins.
 */
export const serviceCategories: readonly ServiceCategory[] = [
  {
    name: "Service category 01",
    services: ["Sub-service 01.1", "Sub-service 01.2", "Sub-service 01.3", "Sub-service 01.4"],
    image: "/media/services/service-01.jpg",
  },
  {
    name: "Service category 02",
    services: ["Sub-service 02.1", "Sub-service 02.2", "Sub-service 02.3", "Sub-service 02.4"],
    image: "/media/services/service-02.jpg",
  },
  {
    name: "Service category 03",
    services: ["Sub-service 03.1", "Sub-service 03.2", "Sub-service 03.3", "Sub-service 03.4"],
    image: "/media/services/service-03.jpg",
  },
];
