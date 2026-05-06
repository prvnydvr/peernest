import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageSquare, Search, UsersRound } from "lucide-react";

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ next?: string; notice?: string; error?: string }> }) {
  const params = await searchParams;
  const next = params.next ? `?next=${encodeURIComponent(params.next)}` : "";

  return (
    <main className="auth-shell grid place-items-center">
      <section className="auth-card grid max-w-5xl lg:grid-cols-[1fr_420px]">
        <aside className="hidden border-r border-slate-200 bg-slate-50 p-8 lg:block">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-sm font-bold text-white">PN</span>
            <span>
              <span className="block font-display text-xl font-bold text-slate-950">PeerNest</span>
              <span className="block text-xs font-medium text-muted">Study with peers</span>
            </span>
          </Link>
          <div className="mt-14">
            <p className="section-eyebrow">Welcome back</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-950">Return to your active questions and communities.</h1>
          </div>
          <div className="mt-8 grid gap-3">
            {[
              { icon: Search, text: "Track doubts and accepted answers" },
              { icon: UsersRound, text: "Jump back into communities" },
              { icon: MessageSquare, text: "Continue peer conversations" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                {text}
              </div>
            ))}
          </div>
        </aside>
        <div className="p-6 sm:p-8">
          <Link href="/" className="inline-flex items-center gap-3 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-sm font-bold text-white">PN</span>
            <span className="font-display text-xl font-bold">PeerNest</span>
          </Link>
          <h1 className="mt-8 text-3xl font-semibold text-slate-950 lg:mt-0">Sign in</h1>
          <p className="mt-2 text-sm leading-6 text-muted">Use your PeerNest account to continue where you left off.</p>
          {params.notice === "check-email" ? (
            <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
              Check your email to confirm your Supabase account, then sign in.
            </p>
          ) : null}
          {params.notice === "google-disabled" ? (
            <p className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700">
              Google sign-in is paused for now. Use email and password to continue.
            </p>
          ) : null}
          {params.error ? (
            <p className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {params.error}
            </p>
          ) : null}
          <SignInForm action={`/api/auth/sign-in${next}`} />
        </div>
      </section>
    </main>
  );
}

async function SignInForm({ action }: { action: string }) {
  return (
    <>
      <form action={action} method="post" className="mt-7 grid gap-4">
        <label className="grid gap-2 label-text">
          Email
          <input name="email" type="email" required className="input-field" placeholder="ava@peernest.dev" />
        </label>
        <label className="grid gap-2 label-text">
          Password
          <input name="password" type="password" required minLength={8} className="input-field" placeholder="Password123!" />
        </label>
        <button className="btn-primary mt-1 w-full">
          Sign in
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        New here? <Link href="/sign-up" className="font-semibold text-accent">Create an account</Link>
      </p>
      <p className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-center text-xs text-muted">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        Email/password is active. Google sign-in is intentionally hidden until the OAuth provider is ready.
      </p>
    </>
  );
}
