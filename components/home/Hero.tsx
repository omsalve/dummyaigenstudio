import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { AnchorLink } from "@/components/motion/AnchorLink";
import { hero } from "@/content/home";
import { PORTRAIT_QUERY } from "@/lib/media-queries";
import { HeroMotion } from "./HeroMotion";
import styles from "./Hero.module.css";

interface Crops {
  desktop: string;
  mobile: string;
}

interface PlateProps {
  crops: Crops;
  alt: string;
  depth: "background" | "subject";
}

/**
 * One layer of the plate, art-directed: the 9:16 crop on portrait screens, the
 * 16:9 crop otherwise. A <picture> fetches only the source it shows, so both
 * layers load eagerly at high priority (they're the LCP); a preload link would
 * fetch the wrong crop on one of the two.
 */
function PlateLayer({ crops, alt, depth }: PlateProps) {
  const common = { alt, fill: true, sizes: "100vw", loading: "eager", fetchPriority: "high" } as const;
  const {
    props: { srcSet: portrait },
  } = getImageProps({ ...common, src: crops.mobile });
  const { props: landscape } = getImageProps({ ...common, src: crops.desktop });

  return (
    <div className={styles.layer} data-hero-layer={depth}>
      <picture className={styles.picture} data-hero-drift={depth}>
        <source media={PORTRAIT_QUERY} srcSet={portrait} sizes={common.sizes} />
        <img {...landscape} alt={alt} className={styles.image} />
      </picture>
    </div>
  );
}

export function Hero() {
  const { image } = hero;
  const placement = {
    "--reality-x": image.realityPosition.desktop.x,
    "--reality-y": image.realityPosition.desktop.y,
    "--reality-x-portrait": image.realityPosition.mobile.x,
    "--reality-y-portrait": image.realityPosition.mobile.y,
  } as CSSProperties;

  return (
    <HeroMotion className={styles.hero} aria-labelledby="hero-title" style={placement}>
      {/* Back to front: plate, "Reality", subject. The copy sits above them all. */}
      <div className={styles.plate}>
        <PlateLayer crops={image.background} alt={image.alt} depth="background" />
        <div className={styles.realityLayer} data-hero-layer="reality">
          <p className={styles.reality} aria-hidden="true" data-hero-drift="reality">
            <span className={styles.realityWord}>{hero.reality}</span>
          </p>
        </div>
        {/* The subject repeats part of the background image, so it has no alt of its own. */}
        <PlateLayer crops={image.subject} alt="" depth="subject" />
      </div>

      <div className={styles.copy}>
        <h1 id="hero-title" className={styles.title}>
          {hero.lines.map((line, index) => (
            <span key={line.lead} className={styles.line} style={{ "--line": index } as CSSProperties}>
              <span className={styles.lead}>{line.lead}</span>
              <span className={styles.rest}>{line.rest}</span>{" "}
            </span>
          ))}
          {/* Ends the trio for assistive tech: as its own sentence, since the last line ends in a full stop. */}
          <span className="sr-only">{hero.reality}.</span>
        </h1>
        <div className={styles.after}>
          <BrandLockup className={styles.lockup} />
          <span className={styles.rule} aria-hidden="true" />
          <AnchorLink href={hero.action.href} className={styles.action}>
            {hero.action.label}
            <svg viewBox="0 0 18 10" width="18" height="10" aria-hidden="true">
              <path d="M0 5h16.5M12.5 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </AnchorLink>
        </div>
      </div>
    </HeroMotion>
  );
}
