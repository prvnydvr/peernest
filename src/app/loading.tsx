export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="surface-card w-full max-w-md px-8 py-10 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-2xl bg-accent/15" />
        <p className="text-sm font-medium text-muted">Loading PeerNest...</p>
      </div>
    </div>
  );
}
