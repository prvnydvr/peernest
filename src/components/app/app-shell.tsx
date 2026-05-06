import Link from "next/link";
import { LogOut } from "lucide-react";
import { Suspense } from "react";

import { Avatar } from "@/components/app/avatar";
import { MobileNavLinks, NavLinks } from "@/components/app/nav-link";
import type { AuthUser } from "@/lib/auth";
import type { CommunitySummary } from "@/lib/view-models";

type ShellData = {
  sidebarCommunities: CommunitySummary[];
  unreadNotifications: number;
};

export function AppShell({
  user,
  shell,
  children,
}: {
  user: NonNullable<AuthUser>;
  shell: Promise<ShellData>;
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
          <Suspense fallback={<MobileNavLinks unreadNotifications={0} />}>
            <ShellNav shell={shell} mobile />
          </Suspense>
        </header>
        <aside className="hidden lg:sticky lg:top-4 lg:block lg:h-[calc(100vh-2rem)]">
          <div className="panel relative overflow-hidden flex h-full flex-col p-3 border-white/40 bg-white/60 shadow-xl shadow-slate-200/50 backdrop-blur-3xl">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-accent/5 blur-3xl" />
            <Link href="/feed" className="relative z-10 mb-4 flex items-center gap-3 rounded-2xl px-2 py-2 transition-all duration-300 hover:bg-white/80 hover:shadow-sm">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 text-sm font-bold text-white shadow-md">
                PN
              </div>
              <div>
                <p className="font-display text-xl font-bold">PeerNest</p>
                <p className="text-xs text-muted">Study with peers</p>
              </div>
            </Link>
            <div className="relative z-10">
              <Suspense fallback={<NavLinks unreadNotifications={0} />}>
                <ShellNav shell={shell} />
              </Suspense>
            </div>
            <div className="relative z-10 mt-6 rounded-2xl border border-white/50 bg-white/40 p-3 backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="section-eyebrow">Communities</p>
                <Link href="/communities" className="text-xs font-semibold text-accent">Browse</Link>
              </div>
              <Suspense fallback={<SidebarCommunitiesFallback />}>
                <SidebarCommunities shell={shell} />
              </Suspense>
            </div>
            <div className="relative z-10 mt-auto border-t border-white/40 pt-4">
              <Link href={`/profile/${user.username}`} className="flex items-center gap-3 rounded-2xl p-2 transition-all duration-300 hover:bg-white/80 hover:shadow-sm">
                <Avatar name={user.name} imageUrl={user.avatarUrl} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted">{user.reputation} reputation</p>
                </div>
              </Link>
              <form action="/api/auth/sign-out" method="post" className="mt-2">
                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white hover:shadow-md">
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

async function ShellNav({ shell, mobile = false }: { shell: Promise<ShellData>; mobile?: boolean }) {
  const { unreadNotifications } = await shell;
  return mobile ? <MobileNavLinks unreadNotifications={unreadNotifications} /> : <NavLinks unreadNotifications={unreadNotifications} />;
}

async function SidebarCommunities({ shell }: { shell: Promise<ShellData> }) {
  const { sidebarCommunities } = await shell;

  return (
    <div className="mt-3 grid gap-2">
      {sidebarCommunities.slice(0, 6).map((community) => (
        <Link key={community.id} href={`/communities/${community.slug}`} className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 hover:shadow-sm">
          <span className="h-2.5 w-2.5 rounded-full shadow-sm" style={{ background: community.topicColor }} />
          <span className="truncate">{community.name}</span>
        </Link>
      ))}
      {!sidebarCommunities.length ? <p className="px-3 py-2 text-sm text-muted">Join a community to personalize your feed.</p> : null}
    </div>
  );
}

function SidebarCommunitiesFallback() {
  return (
    <div className="mt-3 grid gap-2">
      <div className="skeleton h-9 rounded-xl" />
      <div className="skeleton h-9 rounded-xl" />
      <div className="skeleton h-9 rounded-xl" />
    </div>
  );
}
