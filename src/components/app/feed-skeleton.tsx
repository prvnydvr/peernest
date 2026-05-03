export function FeedSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="panel p-5">
          <div className="flex items-center gap-3">
            <div className="skeleton h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-3 w-36" />
              <div className="skeleton h-3 w-24" />
            </div>
          </div>
          <div className="mt-5 space-y-3">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-2/3" />
          </div>
          <div className="mt-5 flex gap-2">
            <div className="skeleton h-8 w-20" />
            <div className="skeleton h-8 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
