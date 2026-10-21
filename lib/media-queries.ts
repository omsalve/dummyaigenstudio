// Breakpoint queries shared by JS behaviour and CSS layout. CSS can't import
// these, so each one is repeated verbatim in the @media blocks that use it.

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Narrow screens and touch-first devices get the swipe carousel instead of the hover strip. */
export const CAROUSEL_QUERY = "(max-width: 767.98px), (hover: none) and (pointer: coarse)";

/** Phone layouts: MassField unpins, StringChapter collapses to a top bar. */
export const NARROW_QUERY = "(max-width: 767.98px)";

/** Art direction: portrait and square screens (phones, upright tablets) get the 9:16 crops. */
export const PORTRAIT_QUERY = "(max-aspect-ratio: 1/1)";
