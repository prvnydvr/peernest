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
      <form action="/api/posts" method="post" className="mt-6 grid gap-5">
        <label className="grid gap-2 label-text">
          Title
          <input name="title" required minLength={8} maxLength={140} className="input-field" placeholder="What are you trying to understand?" />
        </label>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 label-text">
            Type
            <select name="kind" className="input-field">
              <option value="QUESTION">Question</option>
              <option value="DISCUSSION">Discussion</option>
              <option value="PROJECT">Project collaboration</option>
            </select>
          </label>
          <label className="grid gap-2 label-text">
            Community
            <select name="communityId" className="input-field">
              <option value="">Open campus</option>
              {communities.map((community) => (
                <option key={community.id} value={community.id}>{community.name}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="grid gap-2 label-text">
          Details
          <textarea name="content" required minLength={20} rows={10} className="input-field" placeholder="Show what you tried, where you got stuck, and what kind of help would be useful." />
        </label>
        <label className="grid gap-2 label-text">
          Tags
          <input name="tags" placeholder="graphs, os, hackathon" className="input-field" />
        </label>
        <button className="btn-primary w-fit">Publish post</button>
      </form>
    </section>
  );
}
