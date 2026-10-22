import { lab } from "@/content/home";
import type { LabPost } from "@/content/types";
import { withKeyword } from "@/lib/lab";

interface ReelLinkProps {
  post: LabPost;
  className?: string;
}

/** "Comment “GOLD” on the reel →": opens the post's reel in a new tab, and says so to assistive tech. */
export function ReelLink({ post, className }: ReelLinkProps) {
  return (
    <a href={post.reelUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {withKeyword(lab.commentLabel, post.keyword)}
      <span className="sr-only"> ({lab.newTab})</span>
      <svg viewBox="0 0 18 10" width="18" height="10" aria-hidden="true">
        <path d="M0 5h16.5M12.5 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </a>
  );
}
