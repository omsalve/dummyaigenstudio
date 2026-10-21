import { Reveal } from "@/components/motion/Reveal";
import { about } from "@/content/home";
import { splitAccent } from "@/lib/accent";
import styles from "./About.module.css";

const statement = splitAccent(about.statement, about.statementAccent);

/**
 * About: the first light section after the dark hero and field. Purely
 * typographic, set on the 12-column grid with a lot of air: a small label
 * hung in the first three columns, then the statement (its key word in the
 * script), the body and the disciplines from column 4. The lines rise in as
 * the section arrives (Reveal).
 */
export function About() {
  return (
    <section className={styles.about} aria-labelledby="about-title">
      <Reveal className={styles.grid}>
        <p className={styles.eyebrow} data-reveal="block">
          <span className={styles.rule} aria-hidden="true" />
          {about.eyebrow}
        </p>
        <h2 id="about-title" className={styles.statement} data-reveal>
          {statement.before}
          {statement.accent && <span className={styles.accent}>{statement.accent}</span>}
          {statement.after}
        </h2>
        <p className={styles.body} data-reveal>
          {about.body}
        </p>
        {about.disciplines.length > 0 && (
          <ul className={styles.disciplines} data-reveal="block">
            {about.disciplines.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>
        )}
      </Reveal>
    </section>
  );
}
