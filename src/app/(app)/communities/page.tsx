import { CommunityCard } from "@/components/app/community-card";
import { CreateCommunityForm } from "@/components/app/create-community-form";
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
        <CreateCommunityForm />
      </aside>
    </div>
  );
}
