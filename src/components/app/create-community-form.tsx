"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { submitMutation } from "@/components/app/mutation-client";

export function CreateCommunityForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function createCommunity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setPending(true);

    try {
      const result = await submitMutation<{ redirectTo: string }>("/api/communities", new FormData(form));
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Community created.");
      form.reset();
      router.push(result.data.redirectTo);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Community could not be created.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={createCommunity} className="mt-5 grid gap-4">
      <label className="grid gap-2 label-text">
        Name
        <input name="name" required minLength={3} maxLength={40} className="input-field" />
      </label>
      <label className="grid gap-2 label-text">
        Description
        <textarea name="description" required minLength={24} maxLength={220} rows={4} className="input-field" />
      </label>
      <label className="grid gap-2 label-text">
        Color
        <input name="topicColor" type="color" defaultValue="#0f766e" className="h-11 rounded-lg border border-border bg-white px-2" />
      </label>
      <button className="btn-primary" disabled={pending}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        {pending ? "Creating..." : "Create community"}
      </button>
    </form>
  );
}
