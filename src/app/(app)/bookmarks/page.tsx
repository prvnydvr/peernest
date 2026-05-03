import { Bookmark } from "lucide-react";

import { EmptyState } from "@/components/app/empty-state";
import { PostCard } from "@/components/app/post-card";
import { requireUser } from "@/lib/auth";
import { getBookmarksPageData } from "@/server/data";

export default async function BookmarksPage() {
  const user = await requireUser();
  const posts = await getBookmarksPageData(user.id);

  return (
    <section className="grid gap-5">
      <div className="panel p-5">
        <p className="section-eyebrow">Saved for later</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">Bookmarks</h1>
        <p className="mt-2 text-sm text-muted">Questions and discussions you saved for later.</p>
      </div>
      {posts.length ? posts.map((post) => <PostCard key={post.id} post={post} redirectTo="/bookmarks" />) : (
        <EmptyState icon={Bookmark} title="No bookmarks yet" body="Save high-signal posts from your feed or communities, then return here when you are ready to study." actionHref="/feed" actionLabel="Browse feed" />
      )}
    </section>
  );
}
