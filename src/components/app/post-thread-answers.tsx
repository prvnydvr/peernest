"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MessageSquare, Send, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

import { Avatar } from "@/components/app/avatar";
import { EmptyState } from "@/components/app/empty-state";
import { submitMutation } from "@/components/app/mutation-client";
import { formatRelativeTime } from "@/lib/utils";
import type { AnswerCardData, UserSummary } from "@/lib/view-models";

type PostThreadAnswersProps = {
  postId: string;
  postAuthorId: string;
  currentUser: UserSummary;
  initialAnswers: AnswerCardData[];
};

type VoteState = {
  upvotes: number;
  downvotes: number;
  viewerVote: number;
};

export function PostThreadAnswers({ postId, postAuthorId, currentUser, initialAnswers }: PostThreadAnswersProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState(initialAnswers);
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  async function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isPosting) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const answerContent = content.trim();
    if (answerContent.length < 10) {
      toast.error("Answer should be at least 10 characters.");
      return;
    }

    const optimisticId = `optimistic-${Date.now()}`;
    const optimisticAnswer: AnswerCardData = {
      id: optimisticId,
      content: answerContent,
      createdAt: new Date(),
      author: currentUser,
      upvotes: 0,
      downvotes: 0,
      viewerVote: 0,
      isAccepted: false,
    };

    setAnswers((current) => [...current, optimisticAnswer]);
    setContent("");
    setIsPosting(true);

    const formData = new FormData();
    formData.set("content", answerContent);

    try {
      const result = await submitMutation<{ redirectTo: string; answerId?: string }>(`/api/posts/${postId}/answers`, formData);
      if (!result.success) {
        setAnswers((current) => current.filter((answer) => answer.id !== optimisticId));
        setContent(answerContent);
        toast.error(result.error);
        return;
      }

      if (result.data.answerId) {
        setAnswers((current) => current.map((answer) => (answer.id === optimisticId ? { ...answer, id: result.data.answerId! } : answer)));
      }

      startTransition(() => router.refresh());
    } catch (error) {
      setAnswers((current) => current.filter((answer) => answer.id !== optimisticId));
      setContent(answerContent);
      toast.error(error instanceof Error ? error.message : "Answer could not be posted.");
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <>
      <section className="panel p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="section-eyebrow">Peer answers</p>
            <h2 className="mt-1 text-xl font-semibold">{answers.length} responses</h2>
          </div>
          <a href="#answer" className="btn-secondary">
            Reply
          </a>
        </div>
        <div className="mt-5 grid gap-4">
          {answers.length ? (
            answers.map((answer) => (
              <AnswerCard
                key={answer.id}
                answer={answer}
                postId={postId}
                canAccept={postAuthorId === currentUser.id && !answer.id.startsWith("optimistic-")}
                onAccepted={(answerId) =>
                  setAnswers((current) => current.map((item) => ({ ...item, isAccepted: item.id === answerId })))
                }
              />
            ))
          ) : (
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
        <form onSubmit={submitAnswer} className="mt-4 grid gap-4">
          <textarea
            name="content"
            aria-label="Your answer"
            required
            minLength={10}
            rows={6}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="input-field"
            placeholder="Share the reasoning, steps, tradeoffs, or resource that helped you solve it."
          />
          <button className="btn-primary w-fit" disabled={isPosting}>
            {isPosting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {isPosting ? "Posting..." : "Post answer"}
          </button>
        </form>
      </section>
    </>
  );
}

function AnswerCard({
  answer,
  postId,
  canAccept,
  onAccepted,
}: {
  answer: AnswerCardData;
  postId: string;
  canAccept: boolean;
  onAccepted: (answerId: string) => void;
}) {
  const router = useRouter();
  const [voteState, setVoteState] = useState<VoteState>({
    upvotes: answer.upvotes,
    downvotes: answer.downvotes,
    viewerVote: answer.viewerVote,
  });
  const [pendingVote, setPendingVote] = useState<1 | -1 | null>(null);
  const [acceptPending, setAcceptPending] = useState(false);

  const isOptimistic = answer.id.startsWith("optimistic-");
  const score = voteState.upvotes - voteState.downvotes;

  async function vote(value: 1 | -1) {
    if (pendingVote || isOptimistic) return;

    const previous = voteState;
    setVoteState(getNextVoteState(voteState, value));
    setPendingVote(value);

    const formData = new FormData();
    formData.set("value", String(value));
    formData.set("redirectTo", `/posts/${postId}`);

    try {
      const result = await submitMutation(`/api/answers/${answer.id}/vote`, formData);
      if (!result.success) {
        setVoteState(previous);
        toast.error(result.error);
        return;
      }

      startTransition(() => router.refresh());
    } catch (error) {
      setVoteState(previous);
      toast.error(error instanceof Error ? error.message : "Vote could not be saved.");
    } finally {
      setPendingVote(null);
    }
  }

  async function accept() {
    if (acceptPending || answer.isAccepted || isOptimistic) return;

    setAcceptPending(true);

    const formData = new FormData();
    formData.set("redirectTo", `/posts/${postId}`);

    try {
      const result = await submitMutation(`/api/answers/${answer.id}/accept`, formData);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Accepted answer updated.");
      onAccepted(answer.id);
      startTransition(() => router.refresh());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Accepted answer could not be updated.");
    } finally {
      setAcceptPending(false);
    }
  }

  return (
    <article className={`rounded-xl border p-4 ${answer.isAccepted ? "border-emerald-200 bg-emerald-50/50" : "border-border bg-white"}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar name={answer.author.name} imageUrl={answer.author.avatarUrl} />
          <div>
            <Link href={`/profile/${answer.author.username}`} className="font-semibold hover:text-accent">
              {answer.author.name}
            </Link>
            <p className="text-xs text-muted">{isOptimistic ? "Posting now" : formatRelativeTime(answer.createdAt)}</p>
          </div>
        </div>
        {answer.isAccepted ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
            <CheckCircle2 className="h-4 w-4" />
            Accepted
          </span>
        ) : null}
      </div>
      <p className="mt-4 whitespace-pre-line text-[15px] leading-8 text-slate-700">{answer.content}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <AnswerVoteButton value={1} active={voteState.viewerVote === 1} pending={pendingVote === 1} disabled={isOptimistic} onClick={() => vote(1)} />
        <span className="text-sm font-semibold">{score}</span>
        <AnswerVoteButton value={-1} active={voteState.viewerVote === -1} pending={pendingVote === -1} disabled={isOptimistic} onClick={() => vote(-1)} />
        {canAccept && !answer.isAccepted ? (
          <button type="button" className="btn-secondary ml-auto" disabled={acceptPending} onClick={accept}>
            {acceptPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            Mark accepted
          </button>
        ) : null}
      </div>
    </article>
  );
}

function AnswerVoteButton({
  value,
  active,
  pending,
  disabled,
  onClick,
}: {
  value: 1 | -1;
  active: boolean;
  pending: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = value === 1 ? ThumbsUp : ThumbsDown;

  return (
    <button
      type="button"
      aria-label={value === 1 ? "Upvote answer" : "Downvote answer"}
      aria-pressed={active}
      disabled={disabled || pending}
      onClick={onClick}
      className={`rounded-lg border border-border p-2 ${
        active ? "bg-accent text-white" : "bg-white text-muted hover:bg-slate-950 hover:text-white"
      } ${pending ? "scale-95 opacity-75" : ""}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function getNextVoteState(state: VoteState, value: 1 | -1): VoteState {
  const next = { ...state };

  if (next.viewerVote === value) {
    next.viewerVote = 0;
    if (value === 1) next.upvotes -= 1;
    else next.downvotes -= 1;
    return next;
  }

  if (next.viewerVote === 1) next.upvotes -= 1;
  if (next.viewerVote === -1) next.downvotes -= 1;

  next.viewerVote = value;
  if (value === 1) next.upvotes += 1;
  else next.downvotes += 1;

  return next;
}
