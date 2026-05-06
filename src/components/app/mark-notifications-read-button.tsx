"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { submitMutation } from "@/components/app/mutation-client";

export function MarkNotificationsReadButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function markRead() {
    if (pending) return;

    setPending(true);

    try {
      const result = await submitMutation("/api/notifications/read", new FormData());
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Notifications marked read.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Notifications could not be updated.");
    } finally {
      setPending(false);
    }
  }

  return (
    <button type="button" className="text-sm font-semibold text-accent hover:text-accent-strong disabled:opacity-60" disabled={pending} onClick={markRead}>
      {pending ? "Marking..." : "Mark read"}
    </button>
  );
}
