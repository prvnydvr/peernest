import { ResourceCard } from "@/components/app/resource-card";
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
        <form action="/api/resources" method="post" encType="multipart/form-data" className="mt-5 grid gap-4">
          <label className="grid gap-2 label-text">
            Title
            <input name="title" required minLength={4} maxLength={120} className="input-field" />
          </label>
          <label className="grid gap-2 label-text">
            Type
            <select name="kind" className="input-field">
              <option value="LINK">Link</option>
              <option value="NOTE">Note</option>
              <option value="PDF">PDF</option>
            </select>
          </label>
          <label className="grid gap-2 label-text">
            Community
            <select name="communityId" className="input-field">
              <option value="">Open campus</option>
              {data.communities.map((community) => (
                <option key={community.id} value={community.id} disabled={!data.canShareToCommunityIds.has(community.id)}>
                  {community.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 label-text">
            Description
            <textarea name="description" required minLength={12} rows={3} className="input-field" />
          </label>
          <label className="grid gap-2 label-text">
            Link URL
            <input name="linkUrl" type="url" className="input-field" />
          </label>
          <label className="grid gap-2 label-text">
            Notes
            <textarea name="notes" rows={4} className="input-field" />
          </label>
          <label className="grid gap-2 label-text">
            PDF file
            <input name="file" type="file" accept="application/pdf" className="input-field" />
          </label>
          <label className="grid gap-2 label-text">
            Tags
            <input name="tags" placeholder="os, notes, semester" className="input-field" />
          </label>
          <button className="btn-primary">Share resource</button>
        </form>
      </aside>
    </div>
  );
}
