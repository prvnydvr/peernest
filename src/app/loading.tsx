export default function Loading() {
  return (
    <div className="min-h-screen bg-background px-4 py-4 lg:px-6">
      <div className="mx-auto grid w-full max-w-[1440px] gap-5 lg:grid-cols-[264px_1fr]">
        <aside className="hidden h-[calc(100vh-2rem)] rounded-3xl border border-white/60 bg-white/70 p-4 shadow-xl shadow-slate-200/50 lg:block">
          <div className="flex items-center gap-3">
            <div className="skeleton h-11 w-11 rounded-2xl" />
            <div className="grid gap-2">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-3 w-20" />
            </div>
          </div>
          <div className="mt-6 grid gap-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="skeleton h-10 rounded-xl" />
            ))}
          </div>
        </aside>
        <main className="grid gap-4">
          <div className="panel p-5">
            <div className="skeleton h-4 w-40" />
            <div className="mt-3 skeleton h-8 w-72 max-w-full" />
            <div className="mt-3 skeleton h-4 w-full max-w-2xl" />
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="panel p-5">
              <div className="flex items-center gap-3">
                <div className="skeleton h-10 w-10 rounded-lg" />
                <div className="grid flex-1 gap-2">
                  <div className="skeleton h-4 w-44" />
                  <div className="skeleton h-3 w-28" />
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-2/3" />
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
