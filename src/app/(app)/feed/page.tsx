import Link from "next/link";
import { ArrowUpRight, Flame, Plus, Sparkles } from "lucide-react";

import { Avatar } from "@/components/app/avatar";
import { EmptyState } from "@/components/app/empty-state";
import { PostCard } from "@/components/app/post-card";
import { requireUser } from "@/lib/auth";
import { getFeedPageData } from "@/server/data";

export default async function FeedPage({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
  const user = await requireUser();
  const params = await searchParams;
  const sort = params.sort === "latest" ? "latest" : "trending";
  const data = await getFeedPageData(user.id, sort);
  const topPost = data.feedPosts[0];

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <section className="min-w-0 grid gap-4">
        <div className="panel overflow-hidden p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="section-eyebrow">Live campus signal</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-950">Your academic feed</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                Questions, project calls, and discussions from the communities where you can actually contribute.
              </p>
            </div>
            <Link href="/ask" className="btn-primary">
              <Plus className="h-4 w-4" />
              Ask
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
            <div className="inline-flex rounded-lg border border-border bg-slate-50 p-1">
              <Link href="/feed?sort=trending" className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${sort === "trending" ? "bg-white text-slate-950 shadow-sm" : "text-muted hover:text-slate-950"}`}>
                <Flame className="h-4 w-4" />
                Trending
              </Link>
              <Link href="/feed?sort=latest" className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${sort === "latest" ? "bg-white text-slate-950 shadow-sm" : "text-muted hover:text-slate-950"}`}>
                Latest
              </Link>
            </div>
            {topPost ? (
              <Link href={`/posts/${topPost.id}`} className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-accent hover:text-accent-strong">
                <Sparkles className="h-4 w-4" />
                <span className="truncate">Top thread: {topPost.answerCount} answers</span>
              </Link>
            ) : null}
          </div>
        </div>
        {data.feedPosts.length ? (
          data.feedPosts.map((post) => <PostCard key={post.id} post={post} redirectTo={`/feed?sort=${sort}`} />)
        ) : (
          <EmptyState
            icon={Sparkles}
            title="Your feed is ready for its first useful thread"
            body="Join a community or ask an open-campus question to start getting peer answers and resources."
            actionHref="/communities"
            actionLabel="Explore communities"
          />
        )}
      </section>
      <aside className="grid content-start gap-4">
        <section className="panel p-5">
          <p className="section-eyebrow">Your network</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-950 p-4 text-white shadow-sm">
              <p className="text-2xl font-semibold">{data.joinedCommunityCount}</p>
              <p className="mt-1 text-xs text-white/70">communities</p>
            </div>
            <div className="rounded-xl bg-accent p-4 text-white shadow-sm">
              <p className="text-2xl font-semibold">{user.reputation}</p>
              <p className="mt-1 text-xs text-white/80">reputation</p>
            </div>
          </div>
        </section>
        <section className="panel p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Explore communities</h2>
            <Link href="/communities" className="text-sm font-semibold text-accent">All</Link>
          </div>
          <div className="mt-4 grid gap-3">
            {data.suggestedCommunities.map((community) => (
              <Link key={community.id} href={`/communities/${community.slug}`} className="rounded-lg border border-border p-3 hover:-translate-y-0.5 hover:bg-slate-50">
                <p className="font-semibold">{community.name}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{community.description}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="panel p-5">
          <h2 className="font-semibold">Top contributors</h2>
          <div className="mt-4 grid gap-3">
            {data.topContributors.map((person) => (
              <Link key={person.id} href={`/profile/${person.username}`} className="flex items-center gap-3 rounded-lg p-2 hover:-translate-y-0.5 hover:bg-slate-50">
                <Avatar name={person.name} imageUrl={person.avatarUrl} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{person.name}</p>
                  <p className="text-xs text-muted">{person.reputation} rep</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted" />
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
