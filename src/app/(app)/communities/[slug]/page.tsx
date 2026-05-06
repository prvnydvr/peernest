import Link from "next/link";
import { MessageSquare } from "lucide-react";

import { PostCard } from "@/components/app/post-card";
import { ResourceCard } from "@/components/app/resource-card";
import { Avatar } from "@/components/app/avatar";
import { EmptyState } from "@/components/app/empty-state";
import { JoinCommunityButton } from "@/components/app/join-community-button";
import { requireUser } from "@/lib/auth";
import { getCommunityPageData } from "@/server/data";

export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = await requireUser();
  const { slug } = await params;
  const data = await getCommunityPageData(slug, user.id);

  return (
    <div className="grid gap-6">
      <section className="panel overflow-hidden p-6">
        <div className="h-2 w-24 rounded-full" style={{ background: data.community.topicColor }} />
        <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold">{data.community.name}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{data.community.description}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
              <span>{data.community.memberCount ?? 0} members</span>
              <span>{data.community.postCount ?? 0} posts</span>
              <span>{data.community.resourceCount ?? 0} resources</span>
            </div>
          </div>
          <JoinCommunityButton slug={slug} initialJoined={Boolean(data.community.isJoined)} />
        </div>
        <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
          <Avatar name={data.creator.name} imageUrl={data.creator.avatarUrl} size="sm" />
          <p className="text-sm text-muted">Created by <Link href={`/profile/${data.creator.username}`} className="font-semibold text-foreground hover:text-accent">{data.creator.name}</Link></p>
        </div>
      </section>
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <section className="grid gap-5">
          {data.posts.length ? data.posts.map((post) => <PostCard key={post.id} post={post} redirectTo={`/communities/${slug}`} />) : (
            <EmptyState icon={MessageSquare} title="No posts yet" body="Be the first to ask a question, start a discussion, or invite collaborators in this community." actionHref="/ask" actionLabel="Start a post" />
          )}
        </section>
        <aside className="grid content-start gap-5">
          <div className="panel p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Resources</h2>
              <Link href="/resources" className="text-sm font-semibold text-accent">Share</Link>
            </div>
            <div className="mt-4 grid gap-4">
              {data.resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
