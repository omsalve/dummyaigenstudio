import type { Metadata } from "next";
import Link from "next/link";
import { LabCard } from "@/components/lab/LabCard";
import styles from "@/components/lab/LabPage.module.css";
import { brand } from "@/content/brand";
import { lab } from "@/content/home";
import { latestLabPosts } from "@/content/lab";

export const metadata: Metadata = {
  title: `${lab.title} | ${brand.name}`,
  description: lab.description,
};

/** /lab: every Lab post, newest first, as the homepage section sets them. */
export default function LabIndexPage() {
  const posts = latestLabPosts();

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>
          <svg viewBox="0 0 18 10" width="18" height="10" aria-hidden="true">
            <path d="M18 5H1.5M5.5 1l-4 4 4 4" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          {brand.name}
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>{lab.title}</h1>
          <p className={styles.intro}>{lab.intro}</p>
        </header>

        <ul className={styles.grid}>
          {posts.map((post) => (
            <li key={post.slug}>
              <LabCard post={post} headingLevel="h2" />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
