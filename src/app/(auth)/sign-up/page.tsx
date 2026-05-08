import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap, Sparkles, UsersRound } from "lucide-react";

const interestOptions = ["DSA", "Engineering", "AI", "Startups", "Design", "Research"];

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; notice?: string }>;
}) {
  const params = await searchParams;
  const earlyAccessEmail = params.email?.trim() ?? "";

  return (
    <main className="auth-shell">
      <section className="auth-card grid lg:grid-cols-[420px_1fr]">
        <aside className="relative border-b border-slate-200 bg-slate-50 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-sm font-bold text-white">PN</span>
            <span>
              <span className="block font-display text-xl font-bold text-slate-950">PeerNest</span>
              <span className="block text-xs font-medium text-muted">Student collaboration network</span>
            </span>
          </Link>

          <div className="mt-10">
            <p className="section-eyebrow">Create account</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-950">Set up your student profile in under a minute.</h1>
            <p className="mt-4 text-sm leading-7 text-muted">
              PeerNest works best when your profile tells classmates what you study, what you can help with, and what topics you care about.
            </p>
          </div>

          <div className="mt-8 grid gap-3">
            <StepCard icon={GraduationCap} title="1. Add academic context" body="Name, college, and a short intro help peers trust your questions." />
            <StepCard icon={Sparkles} title="2. Pick interests" body="Your interests make the feed and communities more relevant." />
            <StepCard icon={UsersRound} title="3. Join conversations" body="Ask doubts, answer peers, and share useful resources." />
          </div>
        </aside>

        <div className="p-5 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Tell PeerNest who you are</h2>
              <p className="mt-1 text-sm text-muted">You can edit everything later from settings.</p>
            </div>
            <Link href="/sign-in" className="btn-secondary">Sign in</Link>
          </div>

          {params.notice === "early-access" ? (
            <div className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800">
              <span className="font-semibold">Early access is ready.</span>{" "}
              Create your PeerNest profile and you can enter the app immediately.
            </div>
          ) : null}

          <form action="/api/auth/sign-up" method="post" className="grid gap-5">
            <section className="form-section">
              <div className="mb-4 flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-950 text-xs font-bold text-white">1</span>
                <h3 className="font-semibold text-slate-950">Account details</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 label-text">
                  Full name
                  <input name="name" required minLength={2} className="input-field" placeholder="Ava Sharma" />
                </label>
                <label className="grid gap-2 label-text">
                  Username
                  <input name="username" required pattern="[a-z0-9_]{3,24}" className="input-field" placeholder="ava_codes" />
                  <span className="field-help">Use lowercase letters, numbers, or underscores.</span>
                </label>
                <label className="grid gap-2 label-text">
                  Email
                  <input name="email" type="email" required defaultValue={earlyAccessEmail} className="input-field" placeholder="you@college.edu" />
                </label>
                <label className="grid gap-2 label-text">
                  Password
                  <input name="password" type="password" required minLength={8} className="input-field" placeholder="Minimum 8 characters" />
                </label>
              </div>
            </section>

            <section className="form-section">
              <div className="mb-4 flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-950 text-xs font-bold text-white">2</span>
                <h3 className="font-semibold text-slate-950">Academic profile</h3>
              </div>
              <div className="grid gap-4">
                <label className="grid gap-2 label-text">
                  College
                  <input name="college" required minLength={2} className="input-field" placeholder="NIT Trichy, BITS Pilani, IIIT Hyderabad..." />
                </label>
                <label className="grid gap-2 label-text">
                  Short bio
                  <textarea
                    name="bio"
                    rows={3}
                    maxLength={280}
                    className="input-field"
                    placeholder="Example: CSE student preparing for interviews. I like DSA, backend systems, and hackathon MVPs."
                  />
                </label>
              </div>
            </section>

            <section className="form-section">
              <div className="mb-4 flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-950 text-xs font-bold text-white">3</span>
                <h3 className="font-semibold text-slate-950">Interests and skills</h3>
              </div>
              <fieldset>
                <legend className="label-text">Choose a few interests</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="cursor-pointer">
                      <input type="checkbox" name="interests" value={interest} className="peer sr-only" />
                      <span className="pill px-3 py-1.5 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white">{interest}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 label-text">
                  Other interests
                  <input name="interests" placeholder="Cybersecurity, economics..." className="input-field" />
                </label>
                <label className="grid gap-2 label-text">
                  Skills
                  <input name="skills" placeholder="React, Python, design, mentoring" className="input-field" />
                </label>
              </div>
            </section>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <p className="text-sm leading-6 text-muted">
                By creating an account, you can ask questions, join communities, share resources, and build reputation.
              </p>
              <button className="btn-primary">
                Create profile
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-center text-xs text-muted">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Email signup is active. Google sign-in is paused until OAuth is ready.
          </div>
        </div>
      </section>
    </main>
  );
}

function StepCard({ icon: Icon, title, body }: { icon: typeof GraduationCap; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-accent">
          <Icon className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-slate-950">{title}</span>
          <span className="mt-1 block text-sm leading-6 text-muted">{body}</span>
        </span>
      </div>
    </div>
  );
}
