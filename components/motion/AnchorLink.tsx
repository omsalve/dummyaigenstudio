"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { getLenis } from "./SmoothScroll";

interface AnchorLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: `#${string}`;
}

/**
 * In-page link. While Lenis runs it glides to the target instead of jumping,
 * then hands the target focus, so keyboard users continue from there. Without
 * Lenis (reduced motion, before mount) it's a plain anchor.
 */
export function AnchorLink({ href, onClick, ...rest }: AnchorLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const lenis = getLenis();
    const target = document.getElementById(href.slice(1));
    if (!lenis || !target) return;

    event.preventDefault();
    history.pushState(null, "", href);
    lenis.scrollTo(target);
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }

  return <a href={href} onClick={handleClick} {...rest} />;
}
