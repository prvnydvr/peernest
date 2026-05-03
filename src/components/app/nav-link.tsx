"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Home, LibraryBig, MessageSquare, PlusCircle, Settings, UsersRound } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { href: "/feed", label: "Feed", icon: Home },
  { href: "/ask", label: "Ask", icon: PlusCircle },
  { href: "/communities", label: "Communities", icon: UsersRound },
  { href: "/resources", label: "Resources", icon: LibraryBig },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function NavLinks({ unreadNotifications }: { unreadNotifications: number }) {
  return (
    <nav className="grid gap-1.5">
      {navItems.map(({ href, label, icon: Icon }) => (
        <NavItem
          key={href}
          href={href}
          label={label}
          icon={<Icon className="h-4 w-4" />}
          badge={label === "Settings" ? unreadNotifications : undefined}
        />
      ))}
    </nav>
  );
}

export function MobileNavLinks({ unreadNotifications }: { unreadNotifications: number }) {
  return (
    <nav className="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
      {navItems.map(({ href, label, icon: Icon }) => (
        <MobileNavItem
          key={href}
          href={href}
          label={label}
          icon={<Icon className="h-4 w-4" />}
          badge={label === "Settings" ? unreadNotifications : undefined}
        />
      ))}
    </nav>
  );
}

function NavItem({ href, label, icon, badge }: { href: string; label: string; icon: ReactNode; badge?: number }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/feed" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${
        isActive ? "nav-active" : "text-slate-600 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-950"
      }`}
    >
      {icon}
      {label}
      {badge ? <span className="ml-auto rounded-md bg-accent px-2 py-0.5 text-xs text-white">{badge}</span> : null}
    </Link>
  );
}

function MobileNavItem({ href, label, icon, badge }: { href: string; label: string; icon: ReactNode; badge?: number }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/feed" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={`relative inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold ${
        isActive ? "border-slate-950 bg-slate-950 text-white" : "border-border bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950"
      }`}
    >
      {icon}
      {label}
      {badge ? <span className="grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] leading-none text-white">{badge}</span> : null}
    </Link>
  );
}
