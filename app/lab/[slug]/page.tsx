import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "@/components/lab/LabPage.module.css";
import { ReelLink } from "@/components/lab/ReelLink";
import { brand } from "@/content/brand";
import { lab } from "@/content/home";
import { findLabPost, labPosts } from "@/content/lab";
import { formatLabDate, withKeyword } from "@/lib/lab";

// Every post is prerendered. Cache Components needs at least one, and has no
// dynamicParams; an unknown slug reaches the page and gets notFound().
export async function generateStaticParams() {
  return labPosts.map((post) => ({ slug: post.slug }));
}

// Allowed to block: every real post is static (prefetched whole), so only an
// unknown slug renders on demand, and awaiting params up front gives it a true
// 404 status. Streaming it behind <Suspense> would answer 200 first.
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/lab/[slug]">): Promise<Metadata> {
  const post = findLabPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${lab.title} | ${brand.name}`,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date },
  };
}

/**
 * /lab/[slug]: a simple article shell. The kind and date, the title and its
 * standfirst, the cover, the write-up when there is one, and the call to
 * comment the keyword on the reel, repeated from the card.
 */
export default async function LabPostPage({ params }: PageProps<"/lab/[slug]">) {
  const post = findLabPost((await params).slug);
  if (!post) notFound();

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <Link href="/lab" className={styles.back}>
          <svg viewBox="0 0 18 10" width="18" height="10" aria-hidden="true">
            <path d="M18 5H1.5M5.5 1l-4 4 4 4" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          {lab.backLabel}
        </Link>

        <header className={styles.articleHeader}>
          <p className={styles.meta}>
            <span>{post.kind}</span>
            <time dateTime={post.date}>{formatLabDate(post.date)}</time>
          </p>
          <h1 className={styles.articleTitle}>{post.title}</h1>
          <p className={styles.standfirst}>{post.excerpt}</p>
        </header>

        <div className={styles.articleCover}>
          <Image
            className={styles.image}
            src={post.cover}
            alt=""
            fill
            sizes="(max-width: 1279.98px) 100vw, 72rem"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {post.body && (
          <div className={styles.body}>
            {post.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}

        <aside className={styles.getIt} aria-labelledby="get-it-title">
          <h2 id="get-it-title" className={styles.getItTitle}>
            {lab.getItTitle}
          </h2>
          <p className={styles.getItBody}>{withKeyword(lab.getItBody, post.keyword)}</p>
          <ReelLink post={post} className={styles.button} />
        </aside>
      </article>
    </main>
  );
}
