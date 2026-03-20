import type { ContentSeries } from "./registry";

export const seriesMeta: Record<
  ContentSeries,
  { label: string; routeBase: string; deckTag: string }
> = {
  "daily-truth": {
    label: "THE DAILY TRUTH",
    routeBase: "/daily-truth",
    deckTag: "EDITORIAL EXPOSE",
  },
  "architecture-files": {
    label: "INFRASTRUCTURE FILES",
    routeBase: "/architecture-files",
    deckTag: "STRUCTURE MAP",
  },
  "false-belief-systems": {
    label: "FALSE BELIEF SYSTEMS",
    routeBase: "/false-belief-systems",
    deckTag: "MYTH COLLAPSE",
  },
};

