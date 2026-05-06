import Link from "next/link";
import { CheckCircle2, Flame, MessageSquare } from "lucide-react";

import { Avatar } from "@/components/app/avatar";
import { PostCardActions } from "@/components/app/post-card-actions";
import { formatRelativeTime } from "@/lib/utils";
import type { PostCardData } from "@/lib/view-models";

const kindLabel: Record<PostCardData["kind"], string> = {
  QUESTION: "Question",
  DISCUSSION: "Discussion",
  PROJECT: "Project",
};

export function PostCard({ post, redirectTo }: { post: PostCardData; redirectTo: string }) {
  const score = post.upvotes - post.downvotes;
  const isPopular = post.trendingScore >= 30 || score >= 3 || post.answerCount >= 3;
  const actionState = {
    upvotes: post.upvotes,
    downvotes: post.downvotes,
    viewerVote: post.viewerVote,
    isBookmarked: post.isBookmarked,
  };

  return (
    <article className={`interactive-panel group min-w-0 overflow-hidden ${isPopular ? "ring-1 ring-accent/20" : ""}`}>
      <div className="grid gap-0 md:grid-cols-[76px_1fr]">
        <aside className="hidden border-r border-border bg-slate-50/70 px-3 py-5 md:block">
          <PostCardActions postId={post.id} redirectTo={redirectTo} initialState={actionState} mode="rail" />
        </aside>
        <div className="min-w-0 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar name={post.author.name} imageUrl={post.author.avatarUrl} />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <Link href={`/profile/${post.author.username}`} className="font-semibold text-slate-900 hover:text-accent">
                    {post.author.name}
                  </Link>
                  <span className="text-muted">@{post.author.username}</span>
                  <span className="text-muted">{formatRelativeTime(post.createdAt)}</span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span className="pill border-slate-200 bg-slate-950 text-white">{kindLabel[post.kind]}</span>
                  {post.community ? (
                    <Link href={`/communities/${post.community.slug}`} className="font-semibold hover:text-accent">
                      {post.community.name}
                    </Link>
                  ) : (
                    <span>Open campus</span>
                  )}
                  {post.acceptedAnswerId ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Solved
                    </span>
                  ) : null}
                  {isPopular ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                      <Flame className="h-3.5 w-3.5" />
                      Popular
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
            <PostCardActions postId={post.id} redirectTo={redirectTo} initialState={actionState} mode="bookmark" />
          </div>

          <Link href={`/posts/${post.id}`} className="mt-4 block min-w-0">
            <h2 className="break-words text-xl font-semibold leading-snug text-slate-950 group-hover:text-accent">{post.title}</h2>
            <p className="mt-2 break-words text-[15px] leading-7 text-slate-600">{post.content}</p>
          </Link>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <PostCardActions postId={post.id} redirectTo={redirectTo} initialState={actionState} mode="inline" />
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-accent">Trend {Math.round(post.trendingScore)}</span>
              <Link href={`/posts/${post.id}`} className="inline-flex items-center gap-2 font-semibold text-slate-600 hover:text-accent">
                <MessageSquare className="h-4 w-4" />
                {post.answerCount} answers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
