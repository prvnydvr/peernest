"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { Bookmark, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

import { submitMutation } from "@/components/app/mutation-client";

type PostActionState = {
  upvotes: number;
  downvotes: number;
  viewerVote: number;
  isBookmarked: boolean;
};

type PostCardActionsProps = {
  postId: string;
  redirectTo: string;
  initialState: PostActionState;
  mode: "rail" | "inline" | "bookmark";
};

export function PostCardActions({ postId, redirectTo, initialState, mode }: PostCardActionsProps) {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [pendingVote, setPendingVote] = useState<1 | -1 | null>(null);
  const [bookmarkPending, setBookmarkPending] = useState(false);

  const score = state.upvotes - state.downvotes;

  async function vote(value: 1 | -1) {
    if (pendingVote) return;

    const previous = state;
    const next = getNextVoteState(state, value);
    setState(next);
    setPendingVote(value);

    const formData = new FormData();
    formData.set("value", String(value));
    formData.set("redirectTo", redirectTo);

    try {
      const result = await submitMutation(`/api/posts/${postId}/vote`, formData);
      if (!result.success) {
        setState(previous);
        toast.error(result.error);
        return;
      }

      startTransition(() => router.refresh());
    } catch (error) {
      setState(previous);
      toast.error(error instanceof Error ? error.message : "Vote could not be saved.");
    } finally {
      setPendingVote(null);
    }
  }

  async function toggleBookmark() {
    if (bookmarkPending) return;

    const previous = state;
    setState((current) => ({ ...current, isBookmarked: !current.isBookmarked }));
    setBookmarkPending(true);

    const formData = new FormData();
    formData.set("redirectTo", redirectTo);

    try {
      const result = await submitMutation(`/api/posts/${postId}/bookmark`, formData);
      if (!result.success) {
        setState(previous);
        toast.error(result.error);
        return;
      }

      startTransition(() => router.refresh());
    } catch (error) {
      setState(previous);
      toast.error(error instanceof Error ? error.message : "Bookmark could not be saved.");
    } finally {
      setBookmarkPending(false);
    }
  }

  if (mode === "bookmark") {
    return (
      <button
        type="button"
        className="icon-button"
        title={state.isBookmarked ? "Remove bookmark" : "Save bookmark"}
        aria-label={state.isBookmarked ? "Remove bookmark" : "Save bookmark"}
        aria-pressed={state.isBookmarked}
        disabled={bookmarkPending}
        onClick={toggleBookmark}
      >
        <Bookmark className={`h-4 w-4 ${state.isBookmarked ? "fill-current text-accent" : ""}`} />
      </button>
    );
  }

  if (mode === "inline") {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-1 md:hidden">
        <VoteButton value={1} active={state.viewerVote === 1} pending={pendingVote === 1} onClick={() => vote(1)} />
        <span className="min-w-7 text-center text-sm font-semibold">{score}</span>
        <VoteButton value={-1} active={state.viewerVote === -1} pending={pendingVote === -1} onClick={() => vote(-1)} />
      </div>
    );
  }

  return (
    <div className="grid justify-items-center gap-2">
      <VoteButton value={1} active={state.viewerVote === 1} pending={pendingVote === 1} onClick={() => vote(1)} />
      <span className="text-lg font-bold text-slate-950">{score}</span>
      <VoteButton value={-1} active={state.viewerVote === -1} pending={pendingVote === -1} onClick={() => vote(-1)} />
      <span className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-muted">votes</span>
    </div>
  );
}

function VoteButton({
  value,
  active,
  pending,
  onClick,
}: {
  value: 1 | -1;
  active: boolean;
  pending: boolean;
  onClick: () => void;
}) {
  const Icon = value === 1 ? ThumbsUp : ThumbsDown;

  return (
    <button
      type="button"
      title={value === 1 ? "Upvote" : "Downvote"}
      aria-label={value === 1 ? "Upvote" : "Downvote"}
      aria-pressed={active}
      disabled={pending}
      onClick={onClick}
      className={`rounded-md p-2 ${active ? "bg-accent text-white shadow-sm" : "text-muted hover:bg-white hover:text-slate-950"} ${
        pending ? "scale-95 opacity-75" : ""
      }`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function getNextVoteState(state: PostActionState, value: 1 | -1): PostActionState {
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
