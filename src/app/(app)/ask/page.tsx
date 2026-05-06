import { AskPostForm } from "@/components/app/ask-post-form";
import { requireUser } from "@/lib/auth";
import { getAskPageData } from "@/server/data";

export default async function AskPage() {
  const user = await requireUser();
  const communities = await getAskPageData(user.id);

  return (
    <section className="panel p-6">
      <p className="section-eyebrow">New thread</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-950">Ask or start a discussion</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Post with enough context for a peer to reproduce the doubt, answer it, or decide to collaborate.</p>
      <AskPostForm communities={communities} />
    </section>
  );
}
