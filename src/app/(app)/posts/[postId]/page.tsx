import Link from "next/link";
import { CheckCircle2, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import { notFound } from "next/navigation";

import { Avatar } from "@/components/app/avatar";
import { EmptyState } from "@/components/app/empty-state";
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

      <section className="panel p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="section-eyebrow">Peer answers</p>
            <h2 className="mt-1 text-xl font-semibold">{data.answers.length} responses</h2>
          </div>
          <a href="#answer" className="btn-secondary">Reply</a>
        </div>
        <div className="mt-5 grid gap-4">
          {data.answers.length ? data.answers.map((answer) => (
            <article key={answer.id} className={`rounded-xl border p-4 ${answer.isAccepted ? "border-emerald-200 bg-emerald-50/50" : "border-border bg-white"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar name={answer.author.name} imageUrl={answer.author.avatarUrl} />
                  <div>
                    <Link href={`/profile/${answer.author.username}`} className="font-semibold hover:text-accent">{answer.author.name}</Link>
                    <p className="text-xs text-muted">{formatRelativeTime(answer.createdAt)}</p>
                  </div>
                </div>
                {answer.isAccepted ? <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white"><CheckCircle2 className="h-4 w-4" /> Accepted</span> : null}
              </div>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-8 text-slate-700">{answer.content}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                <AnswerVote answerId={answer.id} value={1} active={answer.viewerVote === 1} redirectTo={`/posts/${postId}`} />
                <span className="text-sm font-semibold">{answer.upvotes - answer.downvotes}</span>
                <AnswerVote answerId={answer.id} value={-1} active={answer.viewerVote === -1} redirectTo={`/posts/${postId}`} />
                {data.post.author.id === user.id && !answer.isAccepted ? (
                  <form action={`/api/answers/${answer.id}/accept`} method="post" className="ml-auto">
                    <input type="hidden" name="redirectTo" value={`/posts/${postId}`} />
                    <button className="btn-secondary">Mark accepted</button>
                  </form>
                ) : null}
              </div>
            </article>
          )) : (
            <EmptyState
              icon={MessageSquare}
              title="No answers yet"
              body="Be the first to turn this question into a useful thread for the next student who gets stuck."
            />
          )}
        </div>
      </section>
      <section id="answer" className="panel p-5">
        <p className="section-eyebrow">Contribute</p>
        <h2 className="mt-1 text-xl font-semibold">Add an answer</h2>
        <form action={`/api/posts/${postId}/answers`} method="post" className="mt-4 grid gap-4">
          <textarea name="content" required minLength={10} rows={6} className="input-field" placeholder="Share the reasoning, steps, tradeoffs, or resource that helped you solve it." />
          <button className="btn-primary w-fit">Post answer</button>
        </form>
      </section>
    </div>
  );
}

function AnswerVote({ answerId, value, active, redirectTo }: { answerId: string; value: 1 | -1; active: boolean; redirectTo: string }) {
  const Icon = value === 1 ? ThumbsUp : ThumbsDown;
  return (
    <form action={`/api/answers/${answerId}/vote`} method="post">
      <input type="hidden" name="value" value={value} />
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <button className={`rounded-lg border border-border p-2 ${active ? "bg-accent text-white" : "bg-white text-muted hover:bg-slate-950 hover:text-white"}`}>
        <Icon className="h-4 w-4" />
      </button>
    </form>
  );
}
