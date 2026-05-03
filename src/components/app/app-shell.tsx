import Link from "next/link";
import { LogOut } from "lucide-react";

import { Avatar } from "@/components/app/avatar";
import { MobileNavLinks, NavLinks } from "@/components/app/nav-link";
import type { AuthUser } from "@/lib/auth";
import type { CommunitySummary } from "@/lib/view-models";

export function AppShell({
  user,
  communities,
  unreadNotifications,
  children,
}: {
  user: NonNullable<AuthUser>;
  communities: CommunitySummary[];
  unreadNotifications: number;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="mx-auto grid w-full max-w-[1440px] min-w-0 gap-4 px-4 py-4 lg:grid-cols-[264px_1fr] lg:gap-5 lg:px-6">
        <header className="panel sticky top-3 z-20 min-w-0 max-w-full overflow-hidden p-3 lg:hidden">
          <div className="mb-3 flex items-center justify-between gap-3">
            <Link href="/feed" className="flex min-w-0 items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-950 text-xs font-bold text-white shadow-sm">
                PN
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-bold">PeerNest</p>
                <p className="truncate text-xs text-muted">Study with peers</p>
              </div>
            </Link>
            <Link href={`/profile/${user.username}`} className="shrink-0">
              <Avatar name={user.name} imageUrl={user.avatarUrl} size="sm" />
            </Link>
          </div>
          <MobileNavLinks unreadNotifications={unreadNotifications} />
        </header>
        <aside className="hidden lg:sticky lg:top-4 lg:block lg:h-[calc(100vh-2rem)]">
          <div className="panel flex h-full flex-col p-3">
            <Link href="/feed" className="mb-4 flex items-center gap-3 rounded-2xl px-2 py-2 hover:bg-slate-50">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-sm font-bold text-white shadow-sm">
                PN
              </div>
              <div>
                <p className="font-display text-xl font-bold">PeerNest</p>
                <p className="text-xs text-muted">Study with peers</p>
              </div>
            </Link>
            <NavLinks unreadNotifications={unreadNotifications} />
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="section-eyebrow">Communities</p>
                <Link href="/communities" className="text-xs font-semibold text-accent">Browse</Link>
              </div>
              <div className="mt-3 grid gap-2">
                {communities.slice(0, 6).map((community) => (
                  <Link key={community.id} href={`/communities/${community.slug}`} className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-medium text-slate-600 hover:bg-white">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: community.topicColor }} />
                    <span className="truncate">{community.name}</span>
                  </Link>
                ))}
                {!communities.length ? <p className="px-3 py-2 text-sm text-muted">Join a community to personalize your feed.</p> : null}
              </div>
            </div>
            <div className="mt-auto border-t border-border pt-4">
              <Link href={`/profile/${user.username}`} className="flex items-center gap-3 rounded-2xl p-2 hover:bg-slate-50">
                <Avatar name={user.name} imageUrl={user.avatarUrl} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted">{user.reputation} reputation</p>
                </div>
              </Link>
              <form action="/api/auth/sign-out" method="post" className="mt-2">
                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-muted hover:bg-slate-950 hover:text-white">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </aside>
        <main className="min-w-0 max-w-full">{children}</main>
      </div>
    </div>
  );
}
