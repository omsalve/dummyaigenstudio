/**
 * Splits `text` around the last occurrence of `accent`, so the accent can be
 * set in the script. Without a match everything lands in `before`, and the
 * line renders plain.
 */
export function splitAccent(text: string, accent: string) {
  const at = accent ? text.lastIndexOf(accent) : -1;
  if (at === -1) return { before: text, accent: "", after: "" };
  return { before: text.slice(0, at), accent, after: text.slice(at + accent.length) };
}
