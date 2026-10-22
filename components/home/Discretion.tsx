import { Reveal } from "@/components/motion/Reveal";
import { discretion } from "@/content/home";
import styles from "./Discretion.module.css";

/**
 * Discretion: why the work on the site is unbranded. A quiet note rather than
 * a pitch: one centred, narrow column on ivory, the label under a short rule,
 * the headline, then the body in the muted ink. The lines rise in as it
 * arrives (Reveal). The industries chapter's coda links here.
 */
export function Discretion() {
  return (
    <section id={discretion.id} className={styles.discretion} aria-labelledby="discretion-title">
      <Reveal className={styles.column}>
        <p className={styles.eyebrow} data-reveal="block">
          {discretion.eyebrow}
        </p>
        <h2 id="discretion-title" className={styles.headline} data-reveal>
          {discretion.headline}
        </h2>
        <p className={styles.body} data-reveal>
          {discretion.body}
        </p>
      </Reveal>
    </section>
  );
}
