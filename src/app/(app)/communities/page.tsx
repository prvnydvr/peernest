import { CommunityCard } from "@/components/app/community-card";
import { requireUser } from "@/lib/auth";
import { getCommunitiesPageData } from "@/server/data";

export default async function CommunitiesPage() {
  const user = await requireUser();
  const communities = await getCommunitiesPageData(user.id);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <section className="grid gap-5">
        <div className="panel p-5">
          <p className="section-eyebrow">Find your people</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">Communities</h1>
          <p className="mt-2 text-sm text-muted">Subject, interest, and project spaces for focused student collaboration.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {communities.map((community) => <CommunityCard key={community.id} community={community} />)}
        </div>
      </section>
      <aside className="panel h-fit p-5">
        <h2 className="text-xl font-semibold">Start a community</h2>
        <form action="/api/communities" method="post" className="mt-5 grid gap-4">
          <label className="grid gap-2 label-text">
            Name
            <input name="name" required minLength={3} maxLength={40} className="input-field" />
          </label>
          <label className="grid gap-2 label-text">
            Description
            <textarea name="description" required minLength={24} maxLength={220} rows={4} className="input-field" />
          </label>
          <label className="grid gap-2 label-text">
            Color
            <input name="topicColor" type="color" defaultValue="#0f766e" className="h-11 rounded-lg border border-border bg-white px-2" />
          </label>
          <button className="btn-primary">Create community</button>
        </form>
      </aside>
    </div>
  );
}
