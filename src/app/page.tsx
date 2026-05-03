import Link from "next/link";
import { ArrowRight, Layers3, MessagesSquare, Network, Sparkles, UsersRound } from "lucide-react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

const featureCards = [
  {
    icon: MessagesSquare,
    title: "Ask better questions",
    body: "Structured peer answers, best-answer marking, and community-first discovery keep help high-signal.",
  },
  {
    icon: Layers3,
    title: "Share real resources",
    body: "Links, notes, and PDFs live alongside the community context that makes them useful.",
  },
  {
    icon: UsersRound,
    title: "Find serious collaborators",
    body: "Project posts and 1:1 messaging make it easier to build teams that actually ship work.",
  },
];

export default async function MarketingPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/feed");
  }

  return (
    <main className="hero-grid min-h-screen px-6 py-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col gap-6">
        <header className="surface-card flex items-center justify-between px-6 py-4">
          <div>
            <p className="font-display text-xl font-bold tracking-tight">PeerNest</p>
            <p className="text-sm text-muted">Student collaboration network</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="rounded-2xl px-4 py-2 text-sm font-semibold text-foreground hover:bg-slate-950/5">
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-accent-strong"
            >
              Create account
            </Link>
          </div>
        </header>

        <section className="surface-card mask-noise relative overflow-hidden px-8 py-12 sm:px-12 sm:py-16">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-accent/12 via-white/40 to-transparent blur-3xl" />
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                Student-first network
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-slate-950 sm:text-6xl">
                A clean academic network for asking, sharing, and building together.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                PeerNest combines discussion, community, and networking into one student-native workspace. Ask doubts,
                share resources, form project teams, and grow a visible reputation for useful contributions.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                >
                  Launch your profile
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/sign-in"
                  className="rounded-2xl border border-border bg-white/70 px-5 py-3 text-sm font-semibold text-foreground hover:-translate-y-0.5"
                >
                  Explore the product
                </Link>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-border/80 bg-white/70 p-5">
                  <p className="text-3xl font-semibold text-slate-950">3x</p>
                  <p className="mt-1 text-sm leading-6 text-muted">Faster peer response loops inside focused communities</p>
                </div>
                <div className="rounded-3xl border border-border/80 bg-white/70 p-5">
                  <p className="text-3xl font-semibold text-slate-950">One feed</p>
                  <p className="mt-1 text-sm leading-6 text-muted">Questions, project opportunities, and trusted resources</p>
                </div>
                <div className="rounded-3xl border border-border/80 bg-white/70 p-5">
                  <p className="text-3xl font-semibold text-slate-950">Real rep</p>
                  <p className="mt-1 text-sm leading-6 text-muted">Contribution-based reputation that rewards useful work</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="surface-card-strong rounded-[2rem] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">Live student activity</p>
                    <p className="text-xs text-muted">A feed designed for signal over noise</p>
                  </div>
                  <div className="rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Active now
                  </div>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="rounded-3xl border border-border/80 bg-slate-950 px-5 py-4 text-white">
                    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/60">
                      <Network className="h-3.5 w-3.5" />
                      Trending in DSA
                    </div>
                    <p className="text-lg font-semibold">How do you optimize Dijkstra when weights are tiny?</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      12 replies, accepted answer, and 4 students discussing tradeoffs across contest settings.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-border/80 bg-white/80 p-4">
                      <p className="text-sm font-semibold text-slate-950">Notes drop</p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        OS revision pack shared in Engineering with short viva prompts and one-session recap structure.
                      </p>
                    </div>
                    <div className="rounded-3xl border border-border/80 bg-white/80 p-4">
                      <p className="text-sm font-semibold text-slate-950">Project match</p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        Startup community post seeking a full-stack and ML teammate for a 3-week campus MVP sprint.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {featureCards.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="surface-card px-5 py-5">
                    <div className="mb-4 inline-flex rounded-2xl bg-accent/10 p-3 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
