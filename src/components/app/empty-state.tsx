import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  body,
  actionHref,
  actionLabel,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="empty-state">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-border bg-white text-accent shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="mt-4 text-xl font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{body}</p>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="btn-primary mt-5">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
