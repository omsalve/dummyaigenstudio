// Formatting for Lab posts (content/lab.ts).

// UTC on both sides, so a YYYY-MM-DD date never slips a day with the server's time zone.
const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** "2026-10-06" → "6 Oct 2026". */
export function formatLabDate(date: string) {
  return dateFormat.format(new Date(`${date}T00:00:00Z`));
}

/** Fills a label's {keyword} slot. */
export function withKeyword(label: string, keyword: string) {
  return label.replace("{keyword}", keyword);
}
