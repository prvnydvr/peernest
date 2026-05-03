import Link from "next/link";
import { FileText, Link2, NotebookText } from "lucide-react";

import { Avatar } from "@/components/app/avatar";
import { formatRelativeTime } from "@/lib/utils";
import type { ResourceCardData } from "@/lib/view-models";

const resourceIcon = {
  LINK: Link2,
  PDF: FileText,
  NOTE: NotebookText,
};

export function ResourceCard({ resource }: { resource: ResourceCardData }) {
  const Icon = resourceIcon[resource.kind];
  const href = resource.kind === "LINK" ? resource.linkUrl : resource.kind === "PDF" ? resource.fileUrl : null;

  return (
    <article className="interactive-panel p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-accent/10 p-3 text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <span>{resource.kind}</span>
            {resource.community ? <Link href={`/communities/${resource.community.slug}`}>{resource.community.name}</Link> : null}
          </div>
          <h2 className="mt-2 text-lg font-semibold text-slate-950">{resource.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{resource.description}</p>
          {resource.notes ? <p className="mt-3 rounded-lg bg-slate-950/5 p-3 text-sm leading-6">{resource.notes}</p> : null}
          {href ? (
            <a href={href} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-accent hover:text-accent-strong">
              Open resource
            </a>
          ) : null}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Avatar name={resource.author.name} imageUrl={resource.author.avatarUrl} size="sm" />
          <Link href={`/profile/${resource.author.username}`} className="font-semibold text-foreground hover:text-accent">
            {resource.author.name}
          </Link>
        </div>
        <span className="text-xs text-muted">{formatRelativeTime(resource.createdAt)}</span>
      </div>
    </article>
  );
}
