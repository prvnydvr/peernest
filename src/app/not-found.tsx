import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="surface-card max-w-xl px-8 py-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">404</p>
        <h1 className="mb-3 text-3xl font-semibold">This space does not exist.</h1>
        <p className="mb-6 text-sm leading-7 text-muted">
          The page you requested is missing or the route no longer matches the current product structure.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-accent-strong"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
