"use client"

import { motion } from "motion/react"
import {
  MessageSquareQuote,
  Users,
  BookMarked,
  Award,
  GitMerge,
  Globe2,
  ArrowUpRight,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react"
import type { ReactNode } from "react"
import { Aurora } from "./visual/aurora"
import { GridField } from "./visual/grid-field"
import { SignatureMark } from "./visual/signature-mark"

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 md:py-44 overflow-hidden">
      {/* Signature ambient backdrop */}
      <Aurora variant="ambient" className="-z-10 opacity-40" />
      <GridField mask="top" className="-z-10 opacity-50" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Section header */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur-md px-3 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
          >
            <SignatureMark size={12} />
            What makes PeerNest different
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-7 text-[clamp(36px,6vw,72px)] leading-[0.96] tracking-[-0.04em] font-medium text-balance"
          >
            Built for the students who{" "}
            <span className="font-serif italic font-normal text-primary tracking-[-0.02em]">
              actually ship
            </span>
            .
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-[44ch] text-[16px] leading-[1.7] text-muted-foreground text-pretty"
          >
            Six tools designed around how serious students actually work — not Q&amp;A
            forums, not group chats, not LMS dashboards.
          </motion.p>
        </div>

        {/* Asymmetric bento grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[minmax(220px,auto)]">
          {/* Ask better questions - tall */}
          <FeatureCard
            className="md:col-span-3 md:row-span-2"
            icon={MessageSquareQuote}
            eyebrow="Discussions"
            title="Ask better questions. Get sharper answers."
            description="A discussion model designed for depth — not karma-farming. Questions get scored on quality, answers get peer-reviewed, and useful threads stay alive instead of dying in 24 hours."
          >
            <div className="mt-6 space-y-2.5">
              {[
                {
                  text: "How do I structure a multi-tenant Postgres schema for my YC app?",
                  badge: "+47",
                  active: true,
                },
                {
                  text: "Best path from CS undergrad to ML research role?",
                  badge: "+128",
                },
                {
                  text: "Anyone here actually shipped with Rust + WASM at scale?",
                  badge: "+62",
                },
              ].map((q, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-xl border ${
                    q.active
                      ? "border-primary/30 bg-primary/[0.04]"
                      : "border-border/60 bg-background/50"
                  } px-3.5 py-2.5 transition-all hover:border-primary/40`}
                >
                  <div className="text-[12px] text-foreground flex-1 truncate">
                    {q.text}
                  </div>
                  <div
                    className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-md ${
                      q.active
                        ? "bg-primary/15 text-primary"
                        : "bg-foreground/[0.05] text-muted-foreground"
                    }`}
                  >
                    {q.badge}
                  </div>
                </div>
              ))}
            </div>
          </FeatureCard>

          {/* Find collaborators */}
          <FeatureCard
            className="md:col-span-3"
            icon={Users}
            eyebrow="Project matching"
            title="Find serious collaborators."
            description="Match by skills, ambition, and timezone — not vibes."
          >
            <div className="mt-5 flex items-center gap-2">
              <div className="flex -space-x-2">
                <Avatar gradient="from-violet-400 to-fuchsia-500" />
                <Avatar gradient="from-amber-300 to-orange-500" />
                <Avatar gradient="from-emerald-400 to-teal-600" />
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              <div className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[10.5px] font-medium text-primary">
                93% match
              </div>
            </div>
          </FeatureCard>

          {/* Resources */}
          <FeatureCard
            className="md:col-span-3"
            icon={BookMarked}
            eyebrow="Resources"
            title="Share notes that actually help."
            description="Curated, peer-verified study material from people who&apos;ve been there."
          >
            <div className="mt-5 grid grid-cols-3 gap-2">
              {["MIT 6.824", "CS229", "MLOps"].map((r) => (
                <div
                  key={r}
                  className="rounded-lg border border-border/60 bg-background/60 px-2.5 py-2 text-center"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-500 mx-auto mb-1" />
                  <div className="text-[10.5px] font-medium truncate">{r}</div>
                </div>
              ))}
            </div>
          </FeatureCard>

          {/* Reputation - wide */}
          <FeatureCard
            className="md:col-span-4"
            icon={Award}
            eyebrow="Reputation"
            title="Build a reputation that actually means something."
            description="Every answer, every shipped project, every thoughtful review compounds into a public profile recruiters and founders genuinely look at."
          >
            <div className="mt-5 grid grid-cols-3 gap-3">
              <Stat label="Projects shipped" value="14" />
              <Stat label="Reputation" value="2.4k" accent />
              <Stat label="Top answer rate" value="38%" />
            </div>
          </FeatureCard>

          {/* Project matching */}
          <FeatureCard
            className="md:col-span-2"
            icon={GitMerge}
            eyebrow="Pull requests"
            title="Ship side-by-side."
            description="Project rooms with shared notes, milestones, and reviews."
          >
            <div className="mt-5 space-y-1.5">
              {[
                { label: "design system", state: "merged" },
                { label: "auth refactor", state: "review" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-2 text-[11px] text-muted-foreground"
                >
                  <GitMerge className="h-3 w-3 text-primary" />
                  <span className="font-mono">{b.label}</span>
                  <span
                    className={`ml-auto rounded px-1.5 py-0.5 text-[9.5px] font-medium ${
                      b.state === "merged"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-amber-500/10 text-amber-600"
                    }`}
                  >
                    {b.state}
                  </span>
                </div>
              ))}
            </div>
          </FeatureCard>

          {/* Communities */}
          <FeatureCard
            className="md:col-span-6"
            icon={Globe2}
            eyebrow="Communities"
            title="Join the rooms where the next thing is being built."
            description="Vetted communities for ML researchers, hackers, indie founders, robotics nerds, and design-engineers. No spam, no recruiters, no noise."
            horizontal
          >
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "ml-research",
                "yc-builders",
                "robotics-cell",
                "design-engineers",
                "rust-club",
                "quant-circle",
                "neuroscience",
                "hardware-hackers",
              ].map((c) => (
                <div
                  key={c}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-[12px] font-medium text-foreground/80 hover:border-primary/40 hover:text-foreground transition-all cursor-pointer"
                >
                  <span className="text-primary">#</span>
                  {c}
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  className = "",
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
  horizontal,
}: {
  className?: string
  icon: LucideIcon
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
  horizontal?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 sm:p-7 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_24px_60px_-20px_rgba(76,29,149,0.3),0_8px_20px_-12px_rgba(76,29,149,0.15)] hover:-translate-y-0.5 ${className}`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        className={`flex h-full ${
          horizontal ? "flex-col md:flex-row md:items-end md:gap-12" : "flex-col"
        }`}
      >
        <div className={horizontal ? "md:max-w-md" : ""}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </div>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {eyebrow}
            </span>
          </div>
          <h3 className="mt-5 text-[19px] sm:text-[20.5px] leading-[1.22] font-medium tracking-[-0.015em] text-balance">
            {title}
          </h3>
          <p className="mt-3 text-[13.5px] leading-[1.65] text-muted-foreground text-pretty">
            {description}
          </p>
        </div>
        {children && <div className={horizontal ? "flex-1 mt-4 md:mt-0" : ""}>{children}</div>}
      </div>
    </motion.div>
  )
}

function Avatar({ gradient }: { gradient: string }) {
  return (
    <div
      className={`h-7 w-7 rounded-full bg-gradient-to-br ${gradient} ring-2 ring-card`}
    />
  )
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/50 p-3">
      <div
        className={`text-[24px] leading-none font-medium tracking-[-0.025em] tabular-nums ${
          accent ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="mt-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
    </div>
  )
}
