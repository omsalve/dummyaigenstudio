"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query. The server snapshot is always `false`, so the
 * first client render matches the HTML and React re-renders once with the real
 * value right after hydration.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
