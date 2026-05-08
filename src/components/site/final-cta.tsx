"use client"

import { motion } from "motion/react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Aurora } from "./visual/aurora"
import { Constellation } from "./visual/constellation"
import { GridField } from "./visual/grid-field"
import { SignatureMark } from "./visual/signature-mark"

export function FinalCTA() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [focused, setFocused] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail) return

    setSubmitting(true)
    try {
      window.localStorage.setItem("peernest_early_access_email", normalizedEmail)
    } catch {
      // Local storage can be blocked; the signup URL still carries the email.
    }

    router.push(`/sign-up?notice=early-access&email=${encodeURIComponent(normalizedEmail)}`)
  }

  return (
    <section
      id="cta"
      className="relative pt-28 pb-36 sm:pt-36 sm:pb-44 md:pt-52 md:pb-64 overflow-hidden"
    >
      {/* Cinematic finale backdrop — multi-layer ambient lighting */}
      <Aurora variant="finale" className="-z-10" />
      <Constellation
        variant="dense"
        className="-z-10 opacity-90 [mask-image:radial-gradient(ellipse_at_50%_55%,black_20%,transparent_75%)]"
      />
      <GridField size="lg" mask="radial" className="-z-10" />

      {/* Ceiling spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 0%, oklch(0.78 0.16 295 / 0.35), transparent 70%)",
        }}
      />

      {/* Floor halo glow under content */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 -z-10"
      >
        <div className="h-[420px] w-[820px] rounded-full bg-primary/25 blur-[120px] animate-glow-pulse" />
      </div>

      {/* Edge rails */}
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-5xl px-5 sm:px-6 text-center relative">
        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-border/60 bg-background/70 backdrop-blur-md px-3.5 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
        >
          <SignatureMark size={12} />
          <span>Invitations going out weekly</span>
          <span className="mx-0.5 h-3 w-px bg-border" />
          <span className="inline-flex items-center gap-1.5 text-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="tabular-nums">342</span> joined this week
          </span>
        </motion.div>

        {/* Headline — cinematic scale */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 sm:mt-8 text-[clamp(40px,10.4vw,140px)] leading-[0.90] sm:leading-[0.88] tracking-[-0.048em] sm:tracking-[-0.052em] font-medium text-balance"
        >
          <span className="relative inline-block">
            Stop building
          </span>
          <br />
          <span className="relative inline-block font-serif italic font-normal tracking-[-0.025em]">
            <span
              className="bg-clip-text text-transparent bg-gradient-to-br from-primary via-fuchsia-500 to-rose-500 animate-wordmark-shimmer"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, oklch(0.52 0.22 280) 0%, oklch(0.62 0.24 320) 35%, oklch(0.7 0.2 350) 60%, oklch(0.52 0.22 280) 100%)",
              }}
            >
              alone
            </span>
            <span className="absolute -inset-x-2 -inset-y-1 rounded-full bg-primary/15 blur-2xl -z-10 animate-ambient-breathe" />
          </span>
          <span className="text-foreground">.</span>
        </motion.h2>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-8 max-w-[44ch] mx-auto text-[17px] sm:text-[18px] leading-[1.6] tracking-[-0.005em] text-muted-foreground text-pretty"
        >
          Find the people you should&apos;ve met earlier. Join the campus where
          serious students already build, ship, and answer.
        </motion.p>

        {/* Email capture — elegant integrated field */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="mt-12 max-w-xl mx-auto"
        >
          <form
            onSubmit={onSubmit}
            className="relative group"
            aria-label="Request access"
          >
            {/* Outer ambient glow that intensifies on focus */}
            <div
              aria-hidden
              className={`absolute -inset-[2px] rounded-full bg-gradient-to-r from-primary/40 via-fuchsia-400/40 to-primary/40 blur-md transition-opacity duration-500 ${
                focused ? "opacity-100" : "opacity-60"
              }`}
            />

            <div className="relative flex items-center gap-2 rounded-full border border-border/60 bg-card/80 backdrop-blur-xl pl-5 pr-1.5 py-1.5 shadow-[0_24px_60px_-20px_rgba(76,29,149,0.35)]">
              {/* Tiny live signal */}
              <span
                aria-hidden
                className="relative flex h-2 w-2 shrink-0"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary animate-live-dot" />
              </span>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="you@university.edu"
                disabled={submitting}
                className="flex-1 bg-transparent text-[15px] tracking-[-0.005em] py-3 placeholder:text-muted-foreground/70 focus:outline-none disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={submitting}
                className="group/btn relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13.5px] font-medium tracking-[-0.005em] text-primary-foreground overflow-hidden disabled:opacity-90"
              >
                {/* conic spin */}
                <span
                  aria-hidden
                  className="absolute -inset-px rounded-full opacity-90"
                  style={{
                    background:
                      "conic-gradient(from 0deg, oklch(0.52 0.22 280), oklch(0.7 0.2 320), oklch(0.85 0.12 60), oklch(0.52 0.22 280))",
                  }}
                />
                <span
                  aria-hidden
                  className="absolute -inset-px rounded-full animate-conic-spin opacity-70 mix-blend-screen"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, oklch(0.92 0.06 60 / 0.7), transparent 40%)",
                  }}
                />
                {/* dark inner pill so we keep contrast */}
                <span className="absolute inset-[2px] rounded-full bg-foreground" />
                <span className="relative z-10 inline-flex items-center gap-2">
                  {submitting ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Opening signup
                    </>
                  ) : (
                    <>
                      Get early access
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Microcopy + avatar proof */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-3 text-[12.5px] text-muted-foreground">
            <div className="flex -space-x-2">
              {[
                "from-violet-400 to-fuchsia-500",
                "from-amber-300 to-orange-500",
                "from-cyan-300 to-blue-500",
                "from-emerald-300 to-teal-500",
                "from-rose-300 to-pink-500",
              ].map((g, i) => (
                <div
                  key={i}
                  className={`h-6 w-6 rounded-full bg-gradient-to-br ${g} ring-2 ring-background`}
                />
              ))}
            </div>
            <span className="tracking-[-0.005em]">
              Join <span className="text-foreground font-medium tabular-nums">2,400+</span>{" "}
              students already inside
              <span className="mx-2 text-border">·</span>
              Free for students
              <span className="mx-2 text-border">·</span>
              .edu welcome
            </span>
          </div>

          {/* Live join feed — rotating ticker */}
          <div className="mt-9 inline-flex items-center gap-3 text-[12.5px] text-muted-foreground">
            <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
              Live
            </span>
            <span className="h-3 w-px bg-border" />
            <div className="relative h-5 w-[260px] sm:w-[320px] overflow-hidden text-left mask-fade-x">
              <div className="animate-join-feed">
                {[
                  { name: "Maya, MIT", action: "joined PeerNest" },
                  { name: "Ren, NUS", action: "shipped a project" },
                  { name: "Kofi, ETH Zürich", action: "answered a thread" },
                  { name: "Lia, Stanford", action: "started a room" },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="h-5 flex items-center gap-2 whitespace-nowrap"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-primary"
                      aria-hidden
                    />
                    <span className="text-foreground font-medium tracking-[-0.005em]">{f.name}</span>
                    <span>{f.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
