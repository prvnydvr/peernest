"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="surface-card w-full max-w-lg px-8 py-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">Something broke</p>
        <h1 className="mb-3 text-3xl font-semibold">PeerNest hit an unexpected error.</h1>
        <p className="mb-6 text-sm leading-7 text-muted">
          The request did not complete cleanly. Retry first. If it keeps failing, inspect the server logs and env
          configuration.
        </p>
        <button
          className="rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-accent-strong"
          onClick={reset}
          type="button"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
