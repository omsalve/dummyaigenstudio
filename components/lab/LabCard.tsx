import Image from "next/image";
import Link from "next/link";
import { lab } from "@/content/home";
import type { LabPost } from "@/content/types";
import { formatLabDate } from "@/lib/lab";
import { ReelLink } from "./ReelLink";
import styles from "./LabCard.module.css";

interface LabCardProps {
  post: LabPost;
  /** h3 under a section heading (the homepage), h2 directly under the page's h1 (/lab). */
  headingLevel?: "h2" | "h3";
}

/**
 * One Lab post, set editorially rather than boxed: the cover on the shared
 * media corner, the kind and date, the title and excerpt, then its two
 * actions, reading the write-up or commenting the keyword on the reel to get
 * the product by DM. "Read" carries the title for assistive tech, so the
 * title itself isn't a second link to the same place.
 */
export function LabCard({ post, headingLevel: Heading = "h3" }: LabCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.cover}>
        <Image
          className={styles.image}
          src={post.cover}
          alt=""
          fill
          sizes="(max-width: 767.98px) 100vw, (max-width: 1099.98px) 50vw, 30vw"
        />
      </div>
      <p className={styles.meta}>
        <span>{post.kind}</span>
        <time dateTime={post.date}>{formatLabDate(post.date)}</time>
      </p>
      <Heading className={styles.title}>{post.title}</Heading>
      <p className={styles.excerpt}>{post.excerpt}</p>
      <p className={styles.actions}>
        <Link href={`/lab/${post.slug}`} className={styles.action}>
          {lab.readLabel}
          <span className="sr-only">: {post.title}</span>
          <svg viewBox="0 0 18 10" width="18" height="10" aria-hidden="true">
            <path d="M0 5h16.5M12.5 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </Link>
        <ReelLink post={post} className={styles.action} />
      </p>
    </article>
  );
}
