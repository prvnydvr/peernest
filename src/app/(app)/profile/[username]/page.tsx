import Link from "next/link";
import { Award, LibraryBig, MessageSquare, PenLine, UsersRound } from "lucide-react";

import { Avatar } from "@/components/app/avatar";
import { EmptyState } from "@/components/app/empty-state";
import { PostCard } from "@/components/app/post-card";
import { ResourceCard } from "@/components/app/resource-card";
import { requireUser } from "@/lib/auth";
import { formatRelativeTime } from "@/lib/utils";
import { getProfilePageData } from "@/server/data";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const viewer = await requireUser();
  const { username } = await params;
  const data = await getProfilePageData(username, viewer.id);

  return (
    <div className="grid gap-6">
      <section className="panel overflow-hidden">
        <div className="h-28 bg-[linear-gradient(135deg,#111827,#0f766e)]" />
        <div className="p-6 pt-0">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="-mt-8 flex items-start gap-4">
            <Avatar name={data.user.name} imageUrl={data.user.avatarUrl} size="lg" />
            <div>
              <h1 className="pt-8 text-3xl font-semibold text-slate-950">{data.user.name}</h1>
              <p className="mt-1 text-sm text-muted">@{data.user.username} · {data.user.college}</p>
              <p className="mt-3 max-w-2xl text-sm leading-6">{data.user.bio || "No bio yet."}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {data.user.isCurrentUser ? (
              <Link href="/settings" className="btn-secondary">Edit profile</Link>
            ) : (
              <Link href={`/messages?compose=${data.user.username}`} className="btn-primary">Message</Link>
            )}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat icon={Award} label="Reputation" value={data.user.reputation ?? 0} />
          <Stat icon={PenLine} label="Posts" value={data.user.counts.posts} />
          <Stat icon={MessageSquare} label="Answers" value={data.user.counts.answers} />
          <Stat icon={LibraryBig} label="Resources" value={data.user.counts.resources} />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <PillList title="Interests" items={data.user.interests} />
          <PillList title="Skills" items={data.user.skills} />
        </div>
        </div>
      </section>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="grid gap-5">
          <div className="flex items-end justify-between px-1">
            <div>
              <p className="section-eyebrow">Activity</p>
              <h2 className="mt-1 text-xl font-semibold">Recent posts</h2>
            </div>
          </div>
          {data.posts.length ? data.posts.map((post) => <PostCard key={post.id} post={post} redirectTo={`/profile/${username}`} />) : (
            <EmptyState icon={PenLine} title="No posts yet" body="Questions, discussions, and project calls will appear here once this student starts contributing." />
          )}
        </section>
        <aside className="grid content-start gap-5">
          <section className="panel p-5">
            <div className="flex items-center gap-2">
              <UsersRound className="h-4 w-4 text-accent" />
              <h2 className="font-semibold">Communities</h2>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.communities.map((community) => <Link key={community.id} href={`/communities/${community.slug}`} className="pill hover:border-slate-300 hover:bg-white">{community.name}</Link>)}
            </div>
          </section>
          <section className="panel p-5">
            <h2 className="font-semibold">Recent answers</h2>
            <div className="mt-4 grid gap-3">
              {data.recentAnswers.length ? data.recentAnswers.map((answer) => (
                <Link key={answer.id} href={`/posts/${answer.postId}`} className="rounded-lg border border-border bg-white p-3 text-sm hover:-translate-y-0.5 hover:bg-slate-50">
                  <p className="font-semibold">{answer.postTitle}</p>
                  <p className="mt-1 text-xs text-muted">{formatRelativeTime(answer.createdAt)} · {answer.upvotes} upvotes</p>
                </Link>
              )) : <p className="text-sm leading-6 text-muted">Accepted and upvoted answers will show here.</p>}
            </div>
          </section>
          <section className="grid gap-4">
            {data.resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
          </section>
        </aside>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Award; label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
      <Icon className="mb-3 h-4 w-4 text-accent" />
      <p className="text-2xl font-semibold text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-medium text-muted">{label}</p>
    </div>
  );
}

function PillList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {(items.length ? items : ["Not set"]).map((item) => <span key={item} className="pill">{item}</span>)}
      </div>
    </div>
  );
}
