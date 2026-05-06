"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { submitMutation } from "@/components/app/mutation-client";
import type { CommunitySummary } from "@/lib/view-models";

export function AskPostForm({ communities }: { communities: CommunitySummary[] }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function submitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pending) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setPending(true);

    try {
      const result = await submitMutation<{ redirectTo: string; postId?: string }>("/api/posts", new FormData(form));
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Post published.");
      router.push(result.data.postId ? `/posts/${result.data.postId}` : result.data.redirectTo);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Post could not be published.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submitPost} className="mt-6 grid gap-5">
      <label className="grid gap-2 label-text">
        Title
        <input name="title" required minLength={8} maxLength={140} className="input-field" placeholder="What are you trying to understand?" />
      </label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 label-text">
          Type
          <select name="kind" className="input-field">
            <option value="QUESTION">Question</option>
            <option value="DISCUSSION">Discussion</option>
            <option value="PROJECT">Project collaboration</option>
          </select>
        </label>
        <label className="grid gap-2 label-text">
          Community
          <select name="communityId" className="input-field">
            <option value="">Open campus</option>
            {communities.map((community) => (
              <option key={community.id} value={community.id}>
                {community.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-2 label-text">
        Details
        <textarea
          name="content"
          required
          minLength={20}
          rows={10}
          className="input-field"
          placeholder="Show what you tried, where you got stuck, and what kind of help would be useful."
        />
      </label>
      <label className="grid gap-2 label-text">
        Tags
        <input name="tags" placeholder="graphs, os, hackathon" className="input-field" />
      </label>
      <button className="btn-primary w-fit" disabled={pending}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        {pending ? "Publishing..." : "Publish post"}
      </button>
    </form>
  );
}
