"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { submitMutation } from "@/components/app/mutation-client";

export function MessageComposer({
  recipientId,
  conversationId,
}: {
  recipientId?: string;
  conversationId?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setPending(true);

    try {
      const result = await submitMutation<{ redirectTo: string }>("/api/messages", new FormData(form));
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      form.reset();
      router.push(result.data.redirectTo);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Message could not be sent.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={send} className="grid gap-3 border-t border-border pt-4">
      {recipientId ? <input type="hidden" name="recipientId" value={recipientId} /> : null}
      {conversationId ? <input type="hidden" name="conversationId" value={conversationId} /> : null}
      <div className="grid gap-3 px-5 pb-5">
        <textarea name="body" required rows={3} className="input-field" placeholder="Write a clear, useful message..." />
        <button className="btn-primary w-fit" disabled={pending}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {pending ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
