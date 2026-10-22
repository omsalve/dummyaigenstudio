import Image from "next/image";
import { platformsRow } from "@/content/home";
import { platforms } from "@/content/platforms";
import { splitAccent } from "@/lib/accent";
import styles from "./Platforms.module.css";

const coda = splitAccent(platformsRow.coda, platformsRow.codaAccent);

/**
 * Platforms we use: a quiet, static row on ivory (no marquee). The label
 * hangs in the first three columns like About's; from column 4 the platforms
 * run as text wordmarks in Inter, dotted apart, and the row closes on its own
 * line with "+ the right human minds", the punchline in the script. A
 * platform with an official logo in content/platforms.ts shows that instead.
 */
export function Platforms() {
  return (
    <section className={styles.platforms} aria-labelledby="platforms-title">
      <div className={styles.grid}>
        <h2 id="platforms-title" className={styles.label}>
          <span className={styles.rule} aria-hidden="true" />
          {platformsRow.title}
        </h2>
        <div className={styles.row}>
          <ul className={styles.list}>
            {platforms.map((platform) => (
              <li key={platform.name} className={styles.platform}>
                {platform.logo ? (
                  <Image
                    className={styles.logo}
                    src={platform.logo.src}
                    alt={platform.name}
                    width={platform.logo.width}
                    height={platform.logo.height}
                    unoptimized
                  />
                ) : (
                  platform.name
                )}
              </li>
            ))}
          </ul>
          <p className={styles.coda}>
            {coda.before}
            {coda.accent && <span className={styles.accent}>{coda.accent}</span>}
            {coda.after}
          </p>
        </div>
      </div>
    </section>
  );
}
