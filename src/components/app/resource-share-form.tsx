"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2, Share2 } from "lucide-react";
import { toast } from "sonner";

import { submitMutation } from "@/components/app/mutation-client";
import type { CommunitySummary } from "@/lib/view-models";

export function ResourceShareForm({
  communities,
  canShareToCommunityIds,
}: {
  communities: CommunitySummary[];
  canShareToCommunityIds: string[];
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function shareResource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setPending(true);

    try {
      const result = await submitMutation<{ redirectTo: string }>("/api/resources", new FormData(form));
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Resource shared.");
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Resource could not be shared.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={shareResource} encType="multipart/form-data" className="mt-5 grid gap-4">
      <label className="grid gap-2 label-text">
        Title
        <input name="title" required minLength={4} maxLength={120} className="input-field" />
      </label>
      <label className="grid gap-2 label-text">
        Type
        <select name="kind" className="input-field">
          <option value="LINK">Link</option>
          <option value="NOTE">Note</option>
          <option value="PDF">PDF</option>
        </select>
      </label>
      <label className="grid gap-2 label-text">
        Community
        <select name="communityId" className="input-field">
          <option value="">Open campus</option>
          {communities.map((community) => (
            <option key={community.id} value={community.id} disabled={!canShareToCommunityIds.includes(community.id)}>
              {community.name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 label-text">
        Description
        <textarea name="description" required minLength={12} rows={3} className="input-field" />
      </label>
      <label className="grid gap-2 label-text">
        Link URL
        <input name="linkUrl" type="url" className="input-field" />
      </label>
      <label className="grid gap-2 label-text">
        Notes
        <textarea name="notes" rows={4} className="input-field" />
      </label>
      <label className="grid gap-2 label-text">
        PDF file
        <input name="file" type="file" accept="application/pdf" className="input-field" />
      </label>
      <label className="grid gap-2 label-text">
        Tags
        <input name="tags" placeholder="os, notes, semester" className="input-field" />
      </label>
      <button className="btn-primary" disabled={pending}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
        {pending ? "Sharing..." : "Share resource"}
      </button>
    </form>
  );
}
