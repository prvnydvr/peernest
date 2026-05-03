import Link from "next/link";
import { UsersRound } from "lucide-react";

import type { CommunitySummary } from "@/lib/view-models";

export function CommunityCard({ community }: { community: CommunitySummary }) {
  return (
    <article className="interactive-panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 h-2 w-14 rounded-full" style={{ background: community.topicColor }} />
          <Link href={`/communities/${community.slug}`} className="text-xl font-semibold text-slate-950 hover:text-accent">
            {community.name}
          </Link>
          <p className="mt-2 text-sm leading-6 text-muted">{community.description}</p>
        </div>
        {community.isJoined ? (
          <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">Joined</span>
        ) : null}
      </div>
      <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4 text-sm font-medium text-muted">
        <span className="inline-flex items-center gap-2">
          <UsersRound className="h-4 w-4" />
          {community.memberCount ?? 0} members
        </span>
        <span>{community.postCount ?? 0} posts</span>
        <span>{community.resourceCount ?? 0} resources</span>
      </div>
    </article>
  );
}
