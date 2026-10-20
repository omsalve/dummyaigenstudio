import { BrandLockup } from "@/components/brand/BrandLockup";
import { AnchorLink } from "@/components/motion/AnchorLink";
import { flagship } from "@/content/flagship";
import { flagshipStage, hero } from "@/content/home";
import { verticals } from "@/content/verticals";
import { HeroReel, type HeroReelItem } from "./HeroReel";
import styles from "./Hero.module.css";

// One flagship per vertical, in the brief's vertical order.
const flagshipItems: HeroReelItem[] = verticals.flatMap((vertical) => {
  const project = flagship.find((entry) => entry.vertical === vertical.id);
  return project ? [{ ...project, verticalName: vertical.name }] : [];
});

// The statement around its accent words. Without a match it renders plain.
const accentAt = hero.statement.lastIndexOf(hero.statementAccent);
const statement =
  accentAt === -1
    ? { before: hero.statement, accent: "", after: "" }
    : {
        before: hero.statement.slice(0, accentAt),
        accent: hero.statementAccent,
        after: hero.statement.slice(accentAt + hero.statementAccent.length),
      };

/** Wraps hyphenated words so a line never breaks inside "Real-world". */
function keepCompounds(text: string) {
  return text
    .split(/(\S*\w-\w\S*)/)
    .map((part, index) =>
      index % 2 === 1 ? (
        <span key={index} className={styles.compound}>
          {part}
        </span>
      ) : (
        part
      ),
    );
}

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-statement">
      <HeroReel
        items={flagshipItems}
        label={flagshipStage.label}
        pauseLabel={flagshipStage.pause}
        playLabel={flagshipStage.play}
        subject={flagshipStage.subject}
        filmClassName={styles.films}
        chaptersClassName={styles.chapters}
      />
      <div className={styles.thought}>
        <h1 id="hero-statement" className={styles.statement}>
          {keepCompounds(statement.before)}
          {statement.accent && <span className={styles.accent}>{statement.accent}</span>}
          {keepCompounds(statement.after)}
        </h1>
        <BrandLockup className={styles.lockup} />
        <span className={styles.rule} aria-hidden="true" />
        <AnchorLink href={hero.action.href} className={styles.action}>
          {hero.action.label}
          <svg viewBox="0 0 18 10" width="18" height="10" aria-hidden="true">
            <path d="M0 5h16.5M12.5 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </AnchorLink>
      </div>
    </section>
  );
}
