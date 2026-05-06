import { Bell } from "lucide-react";

import { EmptyState } from "@/components/app/empty-state";
import { MarkNotificationsReadButton } from "@/components/app/mark-notifications-read-button";
import { ProfileSettingsForm } from "@/components/app/profile-settings-form";
import { requireUser } from "@/lib/auth";
import { getSettingsPageData } from "@/server/data";
import { formatRelativeTime } from "@/lib/utils";

export default async function SettingsPage() {
  const viewer = await requireUser();
  const { user, notifications } = await getSettingsPageData(viewer.id);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <section className="panel p-6">
        <p className="section-eyebrow">Account</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">Settings</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Keep your student profile accurate so classmates know what you study and where you can help.</p>
        <ProfileSettingsForm user={user} />
      </section>
      <aside className="panel h-fit p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="section-eyebrow">Updates</p>
            <h2 className="mt-1 text-xl font-semibold">Notifications</h2>
          </div>
          <MarkNotificationsReadButton />
        </div>
        <div className="mt-4 grid gap-3">
          {notifications.length ? notifications.map((notification) => (
            <div key={notification.id} className={`rounded-xl border p-3 ${notification.isRead ? "border-border bg-white/60" : "border-blue-100 bg-blue-50"}`}>
              <p className="text-sm font-semibold">{notification.title}</p>
              <p className="mt-1 text-sm text-muted">{notification.body}</p>
              <p className="mt-2 text-xs text-muted">{formatRelativeTime(notification.createdAt)}</p>
            </div>
          )) : (
            <EmptyState icon={Bell} title="No notifications" body="Accepted answers, votes, and community updates will appear here." />
          )}
        </div>
      </aside>
    </div>
  );
}
