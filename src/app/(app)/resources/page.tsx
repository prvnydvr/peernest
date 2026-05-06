import { ResourceCard } from "@/components/app/resource-card";
import { ResourceShareForm } from "@/components/app/resource-share-form";
import { requireUser } from "@/lib/auth";
import { getResourcesPageData } from "@/server/data";

export default async function ResourcesPage() {
  const user = await requireUser();
  const data = await getResourcesPageData(user.id);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <section className="grid gap-5">
        <div className="panel p-5">
          <p className="section-eyebrow">Shared knowledge</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">Resource library</h1>
          <p className="mt-2 text-sm text-muted">Notes, PDFs, and links shared by peers with community context.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {data.resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
        </div>
      </section>
      <aside className="panel h-fit p-5">
        <h2 className="text-xl font-semibold">Share a resource</h2>
        <ResourceShareForm communities={data.communities} canShareToCommunityIds={data.canShareToCommunityIds} />
      </aside>
    </div>
  );
}
