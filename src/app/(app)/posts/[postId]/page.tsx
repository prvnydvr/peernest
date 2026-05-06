import Link from "next/link";
import { notFound } from "next/navigation";

import { Avatar } from "@/components/app/avatar";
import { PostThreadAnswers } from "@/components/app/post-thread-answers";
import { requireUser } from "@/lib/auth";
import { formatRelativeTime } from "@/lib/utils";
import { getPostThreadData } from "@/server/data";

export default async function PostThreadPage({ params }: { params: Promise<{ postId: string }> }) {
  const user = await requireUser();
  const { postId } = await params;
  const data = await getPostThreadData(postId, user.id);

  if (!data) notFound();

  return (
    <div className="grid gap-5">
      <section className="panel overflow-hidden">
        <div className="border-b border-border bg-slate-50/80 px-6 py-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
            <span className="pill bg-slate-950 text-white">{data.post.kind.toLowerCase()}</span>
            {data.post.community ? <Link href={`/communities/${data.post.community.slug}`}>{data.post.community.name}</Link> : <span>Open campus</span>}
            <span>{formatRelativeTime(data.post.createdAt)}</span>
            {data.post.acceptedAnswerId ? <span className="pill border-emerald-200 bg-emerald-50 text-emerald-700">Solved</span> : null}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar name={data.post.author.name} imageUrl={data.post.author.avatarUrl} />
              <div>
                <Link href={`/profile/${data.post.author.username}`} className="font-semibold hover:text-accent">{data.post.author.name}</Link>
                <p className="text-xs text-muted">@{data.post.author.username}</p>
              </div>
            </div>
            <div className="rounded-xl bg-slate-950 px-3 py-2 text-center text-white">
              <p className="text-lg font-semibold">{data.post.upvotes - data.post.downvotes}</p>
              <p className="text-[11px] text-white/65">score</p>
            </div>
          </div>
          <h1 className="mt-6 max-w-4xl text-3xl font-semibold leading-tight text-slate-950">{data.post.title}</h1>
          <p className="mt-4 whitespace-pre-line text-[15px] leading-8 text-slate-700">{data.post.content}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {data.post.tags.map((tag) => <span key={tag} className="pill">#{tag}</span>)}
          </div>
        </div>
      </section>

      <PostThreadAnswers postId={postId} postAuthorId={data.post.author.id} currentUser={user} initialAnswers={data.answers} />
    </div>
  );
}
