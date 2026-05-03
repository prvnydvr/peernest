import { FeedSkeleton } from "@/components/app/feed-skeleton";

export default function AppLoading() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <FeedSkeleton />
      <aside className="hidden content-start gap-4 xl:grid">
        <div className="panel p-5">
          <div className="skeleton h-4 w-32" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="skeleton h-20" />
            <div className="skeleton h-20" />
          </div>
        </div>
        <div className="panel p-5">
          <div className="skeleton h-4 w-36" />
          <div className="mt-4 grid gap-3">
            <div className="skeleton h-14" />
            <div className="skeleton h-14" />
            <div className="skeleton h-14" />
          </div>
        </div>
      </aside>
    </div>
  );
}
