import { stringChapter } from "@/content/home";
import { industries } from "@/content/industries";
import { verticals } from "@/content/verticals";
import { StringChapter, type StringChapterVertical } from "./StringChapter";

// One chapter stop per vertical, in the brief's order.
const chapterVerticals: StringChapterVertical[] = verticals.flatMap((vertical) => {
  const industry = industries.find((entry) => entry.vertical === vertical.id);
  return industry
    ? [
        {
          id: vertical.id,
          name: vertical.name,
          headline: industry.headline,
          description: industry.description,
          cards: industry.cards,
        },
      ]
    : [];
});

export function IndustriesSection() {
  return (
    <StringChapter
      id={stringChapter.id}
      title={stringChapter.title}
      navLabel={stringChapter.navLabel}
      countJoiner={stringChapter.countJoiner}
      verticals={chapterVerticals}
    />
  );
}
