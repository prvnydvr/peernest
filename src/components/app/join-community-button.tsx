"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { CheckCircle2, Loader2, UsersRound } from "lucide-react";
import { toast } from "sonner";

import { submitMutation } from "@/components/app/mutation-client";

export function JoinCommunityButton({ slug, initialJoined }: { slug: string; initialJoined: boolean }) {
  const router = useRouter();
  const [joined, setJoined] = useState(initialJoined);
  const [pending, setPending] = useState(false);

  async function join() {
    if (joined || pending) return;

    setJoined(true);
    setPending(true);

    try {
      const result = await submitMutation(`/api/communities/${slug}/join`, new FormData());
      if (!result.success) {
        setJoined(false);
        toast.error(result.error);
        return;
      }

      toast.success("Community joined.");
      startTransition(() => router.refresh());
    } catch (error) {
      setJoined(false);
      toast.error(error instanceof Error ? error.message : "Community could not be joined.");
    } finally {
      setPending(false);
    }
  }

  if (joined) {
    return (
      <Link href="/ask" className="btn-primary">
        <CheckCircle2 className="h-4 w-4" />
        Post here
      </Link>
    );
  }

  return (
    <button type="button" className="btn-primary" disabled={pending} onClick={join}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UsersRound className="h-4 w-4" />}
      {pending ? "Joining..." : "Join community"}
    </button>
  );
}
