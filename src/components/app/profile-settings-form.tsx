"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { submitMutation } from "@/components/app/mutation-client";

export function ProfileSettingsForm({
  user,
}: {
  user: {
    name: string;
    college: string | null;
    bio: string | null;
    interests: string[];
    skills: string[];
  };
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setPending(true);

    try {
      const result = await submitMutation<{ redirectTo: string }>("/api/profile", new FormData(form));
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Profile saved.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Profile could not be saved.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={saveProfile} className="mt-6 grid gap-4">
      <label className="grid gap-2 label-text">
        Name
        <input name="name" defaultValue={user.name} required className="input-field" />
      </label>
      <label className="grid gap-2 label-text">
        College
        <input name="college" defaultValue={user.college ?? ""} required className="input-field" />
      </label>
      <label className="grid gap-2 label-text">
        Bio
        <textarea name="bio" defaultValue={user.bio ?? ""} rows={4} maxLength={280} className="input-field" />
      </label>
      <label className="grid gap-2 label-text">
        Interests
        <input name="interests" defaultValue={user.interests.join(", ")} className="input-field" />
      </label>
      <label className="grid gap-2 label-text">
        Skills
        <input name="skills" defaultValue={user.skills.join(", ")} className="input-field" />
      </label>
      <button className="btn-primary w-fit" disabled={pending}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {pending ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
