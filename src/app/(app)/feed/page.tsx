import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Flame, MessageSquare, Plus, Sparkles, TrendingUp, UsersRound } from "lucide-react";

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

  const secondaryPosts = topPost ? data.feedPosts.slice(1) : data.feedPosts;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <section className="min-w-0 grid content-start gap-4">
        <div className="panel relative overflow-hidden border-white/70 bg-white/85 p-5 shadow-xl shadow-slate-200/50">
          <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="section-eyebrow inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]" />
                Live campus signal
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Your academic feed</h1>
              <p className="mt-3 text-sm leading-6 text-muted sm:text-[15px]">
                A focused stream of questions, project calls, and useful discussions from the communities where your next contribution can matter.
              </p>
            </div>
            <Link href="/ask" className="btn-primary shadow-lg shadow-indigo-500/20">
              <Plus className="h-4 w-4" />
              Ask
            </Link>
          </div>
          <div className="relative mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
            <div className="inline-flex rounded-xl border border-border bg-slate-50/80 p-1 shadow-inner">
              <Link href="/feed?sort=trending" className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${sort === "trending" ? "bg-white text-slate-950 shadow-sm" : "text-muted hover:text-slate-950"}`}>
                <Flame className="h-4 w-4" />
                Trending
              </Link>
              <Link href="/feed?sort=latest" className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${sort === "latest" ? "bg-white text-slate-950 shadow-sm" : "text-muted hover:text-slate-950"}`}>
                Latest
              </Link>
            </div>
            {topPost ? (
              <Link href={`/posts/${topPost.id}`} className="inline-flex min-w-0 items-center gap-2 rounded-full bg-accent/10 px-3 py-2 text-sm font-semibold text-accent hover:bg-accent/15 hover:text-accent-strong">
                <Sparkles className="h-4 w-4" />
                <span className="truncate">Top thread: {topPost.answerCount} answers</span>
              </Link>
            ) : null}
          </div>
        </div>

        {topPost ? (
          <Link href={`/posts/${topPost.id}`} className="group relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-slate-400/50">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo-400/25 blur-3xl" />
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/75">
                  <TrendingUp className="h-3.5 w-3.5 text-amber-300" />
                  Spotlight thread
                </div>
                <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight group-hover:text-indigo-100">{topPost.title}</h2>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/70">{topPost.content}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-white/10 px-3 py-2">
                  <p className="text-lg font-semibold">{topPost.upvotes - topPost.downvotes}</p>
                  <p className="text-[10px] uppercase tracking-wide text-white/55">votes</p>
                </div>
                <div className="rounded-xl bg-white/10 px-3 py-2">
                  <p className="text-lg font-semibold">{topPost.answerCount}</p>
                  <p className="text-[10px] uppercase tracking-wide text-white/55">answers</p>
                </div>
                <div className="rounded-xl bg-white/10 px-3 py-2">
                  <p className="text-lg font-semibold">{Math.round(topPost.trendingScore)}</p>
                  <p className="text-[10px] uppercase tracking-wide text-white/55">signal</p>
                </div>
              </div>
            </div>
          </Link>
        ) : null}

        {data.feedPosts.length ? (
          secondaryPosts.map((post) => <PostCard key={post.id} post={post} redirectTo={`/feed?sort=${sort}`} />)
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
        <section className="panel overflow-hidden p-5">
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
          <div className="mt-3 rounded-xl border border-border bg-slate-50 p-3 text-sm leading-6 text-muted">
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-emerald-600" />
            Answer useful threads to grow your public academic reputation.
          </div>
        </section>
        <section className="panel p-5">
          <div className="flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 font-semibold">
              <UsersRound className="h-4 w-4 text-accent" />
              Explore communities
            </h2>
            <Link href="/communities" className="text-sm font-semibold text-accent">All</Link>
          </div>
          <div className="mt-4 grid gap-3">
            {data.suggestedCommunities.map((community) => (
              <Link key={community.id} href={`/communities/${community.slug}`} className="group rounded-xl border border-border bg-white p-3 shadow-sm hover:-translate-y-0.5 hover:border-accent/25 hover:bg-slate-50">
                <p className="font-semibold">{community.name}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{community.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Visit community
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section className="panel p-5">
          <h2 className="inline-flex items-center gap-2 font-semibold">
            <MessageSquare className="h-4 w-4 text-accent" />
            Top contributors
          </h2>
          <div className="mt-4 grid gap-3">
            {data.topContributors.map((person) => (
              <Link key={person.id} href={`/profile/${person.username}`} className="flex items-center gap-3 rounded-xl p-2 hover:-translate-y-0.5 hover:bg-slate-50">
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
