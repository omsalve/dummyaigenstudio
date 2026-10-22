import Link from "next/link";
import { LabCard } from "@/components/lab/LabCard";
import { Reveal } from "@/components/motion/Reveal";
import { lab } from "@/content/home";
import { latestLabPosts } from "@/content/lab";
import styles from "./Lab.module.css";

/**
 * From the Lab: the latest free products, three across on desktop (two on
 * tablets, one on phones). The heading and its line rise in like the other
 * light sections; the link to everything sits at the heading's right.
 */
export function Lab() {
  const posts = latestLabPosts(lab.latestCount);

  return (
    <section className={styles.lab} aria-labelledby="lab-title">
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <h2 id="lab-title" className={styles.title} data-reveal>
            {lab.title}
          </h2>
          <p className={styles.intro} data-reveal>
            {lab.intro}
          </p>
          <Link href="/lab" className={styles.all} data-reveal="block">
            {lab.allLabel}
            <svg viewBox="0 0 18 10" width="18" height="10" aria-hidden="true">
              <path d="M0 5h16.5M12.5 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </Reveal>

        <ul className={styles.grid}>
          {posts.map((post) => (
            <li key={post.slug}>
              <LabCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
