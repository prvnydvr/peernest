"use client"

import { motion } from "motion/react"
import {
  MessageSquare,
  ArrowUp,
  Sparkles,
  Hash,
  TrendingUp,
  Users,
  Star,
  GitBranch,
  CheckCircle2,
  Zap,
  Bell,
  MousePointer2,
  Send,
  Heart,
  GitPullRequest,
  Plus,
  Trophy,
  ChevronRight,
} from "lucide-react"
import { Aurora } from "./visual/aurora"
import { GridField } from "./visual/grid-field"
import { Constellation } from "./visual/constellation"
import { SignatureMark } from "./visual/signature-mark"

export function ProductShowcase() {
  return (
    <section id="showcase" className="relative py-24 sm:py-32 md:py-44 overflow-hidden">
      {/* Signature ambient backdrop */}
      <Aurora variant="ambient" className="-z-10" />
      <GridField mask="radial" className="-z-10 opacity-50" />
      <Constellation
        variant="ambient"
        className="-z-10 opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Editorial intro — left-aligned, asymmetric */}
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              <SignatureMark size={12} />
              <span>03</span>
              <span className="h-px w-6 bg-primary/40" />
              <span>A glimpse inside</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 text-[clamp(40px,7.2vw,88px)] leading-[0.92] tracking-[-0.042em] font-medium text-balance"
            >
              A platform that feels{" "}
              <span className="font-serif italic font-normal text-primary tracking-[-0.025em]">alive</span>.
            </motion.h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 lg:col-start-8 max-w-[42ch] text-[15.5px] leading-[1.7] text-muted-foreground text-pretty"
          >
            Real conversations, real projects, real reputation — surfaced through a feed
            that actually understands what you&apos;re working on.
          </motion.p>
        </div>

        {/* Row 1: Discussions — narrow copy / wide visual (5/7) */}
        <ShowcaseRow
          number="i"
          eyebrow="Live discussions"
          title={"Threads that don\u2019t die after 24 hours."}
          description={
            "Discussions stay open as long as they\u2019re useful. Top answers get pinned, new context gets folded in, and you can subscribe to the questions you actually care about."
          }
          variant="text-narrow-left"
        >
          <DiscussionScene />
        </ShowcaseRow>

        {/* Row 2: Project rooms — full-width immersive with floating copy */}
        <ShowcaseRow
          number="ii"
          eyebrow="Project rooms"
          title="Build out loud, together."
          description="Project rooms with shared milestones, an activity feed, and lightweight reviews. Bring your repo, your figma, your notes — keep everyone on the same page."
          variant="full-bleed"
        >
          <ProjectRoomScene />
        </ShowcaseRow>

        {/* Row 3: Reputation — wide visual / narrow copy on right (7/5 reversed) */}
        <ShowcaseRow
          number="iii"
          eyebrow="Public reputation"
          title="A profile worth showing recruiters."
          description="Every shipped project, every great answer, every helpful review compounds into a credible public profile — not a list of unfinished side projects."
          variant="text-narrow-right"
        >
          <ProfileScene />
        </ShowcaseRow>
      </div>
    </section>
  )
}

type ShowcaseVariant = "text-narrow-left" | "text-narrow-right" | "full-bleed"

function ShowcaseRow({
  number,
  eyebrow,
  title,
  description,
  variant,
  children,
}: {
  number: string
  eyebrow: string
  title: string
  description: string
  variant: ShowcaseVariant
  children: React.ReactNode
}) {
  if (variant === "full-bleed") {
    return (
      <div className="mt-32 sm:mt-44 relative">
        {/* Editorial header band — full width, asymmetric */}
        <div className="grid lg:grid-cols-12 gap-6 items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="flex items-baseline gap-4">
              <span className="text-[clamp(36px,4vw,52px)] leading-none font-serif italic font-normal text-primary/70 select-none tracking-[-0.015em]">
                {number}
              </span>
              <div>
                <div className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                  {eyebrow}
                </div>
                <h3 className="mt-3.5 text-[clamp(28px,4.4vw,56px)] leading-[1.02] tracking-[-0.035em] font-medium text-balance">
                  {title}
                </h3>
              </div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-4 lg:col-start-9 max-w-[40ch] text-[14.5px] leading-[1.7] text-muted-foreground text-pretty"
          >
            {description}
          </motion.p>
        </div>

        {/* Wide stage with internal padding */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[28px] border border-border/60 bg-gradient-to-br from-card/40 via-card/20 to-card/40 backdrop-blur-md overflow-hidden p-6 sm:p-10 lg:p-14"
        >
          {/* Signature stage ambient */}
          <Aurora variant="stage" className="-z-10 opacity-60" />
          <GridField mask="radial" className="-z-10" />
          <Constellation
            variant="ambient"
            className="-z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
          />
          {children}
        </motion.div>
      </div>
    )
  }

  const isLeft = variant === "text-narrow-left"
  return (
    <div className="mt-28 sm:mt-36 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={
          isLeft
            ? "lg:col-span-5 lg:order-1"
            : "lg:col-span-4 lg:col-start-9 lg:order-2"
        }
      >
        <div className="flex items-baseline gap-3">
          <span className="text-[28px] leading-none font-serif italic font-normal text-primary/60 select-none tracking-[-0.015em]">
            {number}
          </span>
          <div className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </div>
        </div>
        <h3 className="mt-4 text-[clamp(26px,3.6vw,46px)] leading-[1.06] tracking-[-0.03em] font-medium text-balance">
          {title}
        </h3>
        <p className="mt-5 max-w-[42ch] text-[15.5px] leading-[1.7] text-muted-foreground text-pretty">
          {description}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`relative ${
          isLeft
            ? "lg:col-span-7 lg:col-start-6 lg:order-2"
            : "lg:col-span-7 lg:col-start-1 lg:order-1"
        }`}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ============================================================
 * Reusable bits
 * ============================================================ */

function WindowChrome({
  label,
  meta,
  accent = "violet",
}: {
  label: string
  meta?: React.ReactNode
  accent?: "violet" | "emerald" | "amber"
}) {
  const accentMap = {
    violet: "text-primary",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
  }
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-border/60 bg-background/55 backdrop-blur-md">
      <div className="flex gap-1.5">
        <div className="h-2 w-2 rounded-full bg-foreground/12" />
        <div className="h-2 w-2 rounded-full bg-foreground/12" />
        <div className="h-2 w-2 rounded-full bg-foreground/12" />
      </div>
      <div className={`flex items-center gap-1.5 text-[11.5px] font-medium ${accentMap[accent]}`}>
        <Hash className="h-3 w-3" />
        <span>{label}</span>
      </div>
      <div className="ml-auto text-[10px] text-muted-foreground flex items-center gap-2">
        {meta}
      </div>
    </div>
  )
}

function PresenceDot({ color = "emerald" }: { color?: "emerald" | "amber" | "rose" }) {
  const map = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
  }
  return (
    <span className="relative inline-flex h-1.5 w-1.5">
      <span className={`absolute inset-0 rounded-full ${map[color]} animate-ping opacity-60`} />
      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${map[color]}`} />
    </span>
  )
}

function TypingDots({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-0.5 ${className}`}>
      <span
        className="h-1 w-1 rounded-full bg-current animate-typing-dot"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="h-1 w-1 rounded-full bg-current animate-typing-dot"
        style={{ animationDelay: "180ms" }}
      />
      <span
        className="h-1 w-1 rounded-full bg-current animate-typing-dot"
        style={{ animationDelay: "360ms" }}
      />
    </span>
  )
}

function FakeCursor({
  name,
  color = "violet",
  className = "",
  drift = 1,
}: {
  name: string
  color?: "violet" | "rose" | "amber" | "emerald"
  className?: string
  drift?: 1 | 2
}) {
  const colorMap = {
    violet: { dot: "fill-violet-500", chip: "bg-violet-500" },
    rose: { dot: "fill-rose-500", chip: "bg-rose-500" },
    amber: { dot: "fill-amber-500", chip: "bg-amber-500" },
    emerald: { dot: "fill-emerald-500", chip: "bg-emerald-500" },
  }
  const c = colorMap[color]
  const driftClass = drift === 1 ? "animate-cursor-drift" : "animate-cursor-drift-2"
  return (
    <div className={`pointer-events-none absolute z-30 ${className}`}>
      <div className={driftClass}>
        <div className="relative">
          <MousePointer2 className={`h-4 w-4 ${c.dot} drop-shadow-[0_2px_3px_rgba(0,0,0,0.18)]`} />
          <div
            className={`absolute left-3 top-3 whitespace-nowrap rounded-md ${c.chip} px-1.5 py-0.5 text-[9.5px] font-medium text-white shadow-md`}
          >
            {name}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
 * Scene 1 — Live discussions
 * ============================================================ */

function DiscussionScene() {
  return (
    <div className="relative h-[420px] sm:h-[560px]">
      {/* Ambient lighting */}
      <div className="absolute -inset-10 -z-10">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />
        <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-fuchsia-400/15 blur-[100px]" />
      </div>

      {/* Floor reflection */}
      <div className="absolute inset-x-6 bottom-0 h-32 bg-gradient-to-b from-foreground/[0.03] to-transparent rounded-[28px] blur-2xl" />

      {/* Main thread window — slight tilt for depth */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotateX: 6 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1400 }}
        className="absolute inset-x-0 top-4 mx-auto w-full max-w-[520px] rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-[0_40px_100px_-20px_rgba(76,29,149,0.28),0_8px_24px_-12px_rgba(0,0,0,0.12)] overflow-hidden text-[13px] sm:text-[14px]"
      >
        {/* Top sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

        <WindowChrome
          label="ml-research"
          meta={
            <>
              <PresenceDot />
              <span className="font-mono">42 active</span>
            </>
          }
        />

        <div className="p-4 space-y-3">
          {/* Question */}
          <div className="flex gap-3 rounded-xl border border-border/50 bg-background/50 p-3">
            <div className="flex flex-col items-center pt-0.5">
              <button className="h-7 w-7 rounded-md border border-primary/30 bg-primary/[0.06] hover:bg-primary/10 flex items-center justify-center transition-colors" aria-label="Upvote">
                <ArrowUp className="h-3.5 w-3.5 text-primary" />
              </button>
              <div className="text-[11.5px] font-mono font-semibold text-primary mt-1 tabular-nums">
                284
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[11px] mb-1">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500" />
                <span className="font-medium">aanya.dev</span>
                <span className="text-muted-foreground">· 2h</span>
                <span className="rounded-md bg-primary/10 text-primary px-1.5 py-0.5 text-[9.5px] font-medium ml-1">
                  Researcher
                </span>
                <span className="ml-auto inline-flex items-center gap-1 text-[9.5px] text-primary/90">
                  <Sparkles className="h-2.5 w-2.5" />
                  Pinned
                </span>
              </div>
              <div className="text-[13.5px] font-semibold leading-snug">
                What&apos;s the smallest model where reasoning fine-tuning actually
                works?
              </div>
              <div className="mt-1.5 text-[12px] text-muted-foreground leading-relaxed">
                Trying to build an agent that runs on-device. Anyone got real benchmarks
                for sub-3B models on GSM8K-style tasks?
              </div>

              {/* Reaction row with floating reactions */}
              <div className="relative mt-2.5">
                <div className="flex items-center gap-3 text-[10.5px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> 38
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-rose-500/80" /> 96
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-500" /> Saved by 24
                  </span>
                </div>
                {/* Floating reaction emojis */}
                <span
                  className="pointer-events-none absolute -top-1 left-[58px] text-[13px] animate-reaction-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  ❤
                </span>
                <span
                  className="pointer-events-none absolute -top-1 left-[18px] text-[12px] animate-reaction-up"
                  style={{ animationDelay: "1.8s" }}
                >
                  ↑
                </span>
              </div>
            </div>
          </div>

          {/* Top answer */}
          <div className="ml-9 relative rounded-xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.05] to-emerald-500/[0.01] p-3">
            <div className="absolute -left-2 top-4 h-4 w-4 rotate-45 border-l border-b border-emerald-500/25 bg-emerald-500/[0.04]" />
            <div className="flex items-center gap-2 text-[11px] mb-1.5">
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600" />
              <span className="font-medium">jordan.k</span>
              <span className="text-muted-foreground">· 1h</span>
              <span className="ml-auto inline-flex items-center gap-1 text-emerald-600 text-[10px] font-semibold">
                <CheckCircle2 className="h-3 w-3" /> Top answer · +124
              </span>
            </div>
            <div className="text-[12px] leading-relaxed">
              Phi-3.5 mini gave us a real bump after PPO with verifier feedback — but
              honestly the unlock is the data, not the model size. Happy to share our
              eval rig.
            </div>
          </div>

          {/* Live typing reply */}
          <div className="ml-9 flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground/[0.03] border border-border/50">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-rose-400 to-pink-600" />
            <span className="text-[11.5px] text-muted-foreground">
              <span className="font-medium text-foreground">marc</span> is typing
            </span>
            <TypingDots className="text-primary ml-1" />
          </div>
        </div>

        {/* Animated cursor on upvote */}
        <FakeCursor
          name="priya"
          color="violet"
          className="left-[48px] top-[112px]"
          drift={1}
        />
      </motion.div>

      {/* Floating reply composer (overlapping window, top-right) */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 w-[220px] sm:w-[260px] rounded-2xl border border-border/70 bg-card/90 backdrop-blur-xl shadow-[0_24px_60px_-16px_rgba(76,29,149,0.32)] overflow-hidden animate-float-slower hidden sm:block"
      >
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border/60 bg-background/60">
          <div className="h-5 w-5 rounded-md bg-primary/10 flex items-center justify-center">
            <Send className="h-2.5 w-2.5 text-primary" />
          </div>
          <span className="text-[11px] font-medium">Quick reply</span>
          <span className="ml-auto text-[9.5px] text-muted-foreground font-mono">
            ⌘ ↵
          </span>
        </div>
        <div className="p-3">
          <div className="text-[11.5px] leading-relaxed text-foreground/90">
            On a 1.5B you can get there with synthetic CoT
            <span className="ml-0.5 inline-block w-[1.5px] h-3 bg-primary align-middle animate-caret" />
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[9.5px] font-medium">
              #fine-tuning
            </span>
            <span className="rounded-full bg-foreground/[0.05] px-2 py-0.5 text-[9.5px] text-muted-foreground">
              #evals
            </span>
            <button className="ml-auto rounded-md bg-primary px-2 py-1 text-[10px] font-semibold text-primary-foreground shadow-sm shadow-primary/30">
              Reply
            </button>
          </div>
        </div>
      </motion.div>

      {/* Floating notification (bottom-left, slide-in loop) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-2 sm:left-2 bottom-2 sm:bottom-6 w-[200px] sm:w-[240px]"
      >
        <div className="animate-notif-loop rounded-xl border border-border/70 bg-card/95 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(76,29,149,0.3)] p-3">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-fuchsia-500 flex items-center justify-center shadow-md shadow-primary/30">
              <Bell className="h-3 w-3 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11.5px] font-semibold leading-tight">
                jordan.k pinned an answer
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                in #ml-research · just now
              </div>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>
      </motion.div>

      {/* Cursor 2 */}
      <FakeCursor
        name="theo"
        color="rose"
        className="right-[40px] bottom-[120px]"
        drift={2}
      />
    </div>
  )
}

/* ============================================================
 * Scene 2 — Project rooms
 * ============================================================ */

function ProjectRoomScene() {
  return (
    <div className="relative h-[450px] sm:h-[580px]">
      {/* Ambient */}
      <div className="absolute -inset-10 -z-10">
        <div className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-primary/15 blur-[100px]" />
      </div>

      {/* Background secondary window (peeking, slight rotate) */}
      <motion.div
        initial={{ opacity: 0, x: 30, rotate: 3 }}
        whileInView={{ opacity: 1, x: 0, rotate: 2.5 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-2 w-[240px] sm:w-[280px] rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md shadow-[0_24px_60px_-20px_rgba(76,29,149,0.2)] overflow-hidden hidden sm:block"
      >
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border/50 bg-background/50">
          <GitPullRequest className="h-3 w-3 text-primary" />
          <span className="text-[10.5px] font-medium">PR #42 · Sequence builder</span>
          <span className="ml-auto rounded-full bg-emerald-500/15 text-emerald-600 px-1.5 py-0.5 text-[9px] font-semibold">
            +124 / -38
          </span>
        </div>
        <div className="p-3 space-y-1.5 font-mono text-[10px] leading-relaxed">
          <div className="flex gap-2">
            <span className="text-muted-foreground/60 select-none w-4 text-right">
              42
            </span>
            <span className="text-muted-foreground">{"const sequence = ["}</span>
          </div>
          <div className="flex gap-2 bg-emerald-500/[0.07] -mx-1 px-1 rounded">
            <span className="text-emerald-600/70 select-none w-4 text-right">+</span>
            <span className="text-foreground/90">
              {"  { step: 'warmup', delay: 24 },"}
            </span>
          </div>
          <div className="flex gap-2 bg-emerald-500/[0.07] -mx-1 px-1 rounded">
            <span className="text-emerald-600/70 select-none w-4 text-right">+</span>
            <span className="text-foreground/90">
              {"  { step: 'send', template: tpl },"}
            </span>
          </div>
          <div className="flex gap-2 bg-rose-500/[0.06] -mx-1 px-1 rounded">
            <span className="text-rose-600/70 select-none w-4 text-right">-</span>
            <span className="text-muted-foreground/80 line-through">
              {"  { step: 'send' },"}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground/60 select-none w-4 text-right">
              45
            </span>
            <span className="text-muted-foreground">{"]"}</span>
          </div>
        </div>
        <div className="px-3 py-2 border-t border-border/50 bg-background/40 flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-300 to-orange-500" />
          <span className="text-[10px] text-muted-foreground">
            <span className="text-foreground font-medium">theo</span>: nice — ship it
          </span>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 ml-auto" />
        </div>
      </motion.div>

      {/* Main project window */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-12 w-full max-w-[460px] rounded-2xl border border-border/70 bg-card/85 backdrop-blur-xl shadow-[0_40px_100px_-20px_rgba(76,29,149,0.28)] overflow-hidden"
      >
        {/* Top sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

        <div className="border-b border-border/60 bg-background/55 backdrop-blur-md px-4 py-3 flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-fuchsia-500 flex items-center justify-center shadow-md shadow-primary/30">
            <Zap className="h-3.5 w-3.5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-[12.5px] font-semibold leading-tight">FoundrLetters</div>
            <div className="text-[10px] text-muted-foreground">
              Cold-email tool · 5 collaborators
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 ring-2 ring-card">
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-card" />
              </div>
              <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 ring-2 ring-card">
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-card" />
              </div>
              <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 ring-2 ring-card">
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-card" />
              </div>
              <div className="h-6 w-6 rounded-full bg-foreground/[0.06] ring-2 ring-card text-[9px] font-semibold flex items-center justify-center text-muted-foreground">
                +2
              </div>
            </div>
            <button className="rounded-md border border-border/60 bg-background/80 hover:border-primary/40 transition-colors p-1" aria-label="Add collaborator">
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Milestones with progress */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
              This week
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="font-mono tabular-nums">2/4</span>
              <div className="w-16 h-1 rounded-full bg-foreground/[0.06] overflow-hidden">
                <div className="h-full w-1/2 bg-gradient-to-r from-primary to-fuchsia-500 rounded-full" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "Auth & onboarding", done: true, by: "marc", color: "from-violet-400 to-purple-600" },
              { label: "Sequence builder UI", done: true, by: "priya", color: "from-rose-400 to-pink-600" },
              { label: "Inbox warmup logic", done: false, by: "theo", color: "from-amber-300 to-orange-500", live: true },
              { label: "Beta with 20 founders", done: false, by: "team", color: "from-sky-400 to-blue-600" },
            ].map((m) => (
              <div
                key={m.label}
                className={`group relative flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors ${
                  m.live
                    ? "border-primary/30 bg-primary/[0.04]"
                    : "border-border/50 bg-background/55"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-md flex items-center justify-center ${
                    m.done
                      ? "bg-emerald-500/15 text-emerald-600"
                      : "border border-border bg-background"
                  }`}
                >
                  {m.done && <CheckCircle2 className="h-3 w-3" />}
                </div>
                <span
                  className={`text-[12.5px] ${
                    m.done ? "text-muted-foreground line-through" : "text-foreground"
                  }`}
                >
                  {m.label}
                </span>
                {m.live && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-1.5 py-0.5 text-[9px] font-medium">
                    <PresenceDot />
                    in progress
                  </span>
                )}
                <div className={`ml-auto flex items-center gap-1.5`}>
                  <div className={`h-4 w-4 rounded-full bg-gradient-to-br ${m.color}`} />
                  <span className="text-[10px] text-muted-foreground font-mono">
                    @{m.by}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Live activity */}
          <div className="mt-4 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
                Activity
              </div>
              <div className="flex items-center gap-1 text-[9.5px] text-emerald-600">
                <PresenceDot />
                live
              </div>
            </div>
            <div className="space-y-1.5 text-[11.5px]">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GitBranch className="h-3 w-3 text-primary flex-shrink-0" />
                <span className="truncate">
                  <span className="text-foreground font-medium">priya</span> opened PR{" "}
                  <span className="font-mono text-primary">#42</span>
                </span>
                <span className="ml-auto text-[10px] font-mono">2m</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-3 w-3 text-amber-500 flex-shrink-0" />
                <span className="truncate">
                  <span className="text-foreground font-medium">theo</span> approved &
                  merged
                </span>
                <span className="ml-auto text-[10px] font-mono">just now</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="h-3 w-3 text-fuchsia-500 flex-shrink-0" />
                <span className="truncate inline-flex items-center gap-1.5">
                  <span className="text-foreground font-medium">marc</span> is writing
                  <TypingDots className="text-fuchsia-500" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Fake cursor on the live milestone */}
        <FakeCursor
          name="theo"
          color="amber"
          className="left-[200px] top-[230px]"
          drift={1}
        />
      </motion.div>

      {/* Floating "merged" notification */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-2 bottom-2 w-[230px]"
      >
        <div className="animate-notif-loop rounded-xl border border-emerald-500/30 bg-card/95 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(16,185,129,0.25)] p-3">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/30">
              <CheckCircle2 className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11.5px] font-semibold leading-tight">
                PR #42 merged
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                by theo · sequence builder
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating chat bubble */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-3 bottom-32 w-[200px] animate-float-slow"
      >
        <div className="rounded-2xl border border-border/70 bg-card/95 backdrop-blur-xl shadow-[0_20px_50px_-14px_rgba(76,29,149,0.28)] p-2.5">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-rose-400 to-pink-600" />
            <span className="text-[10.5px] font-medium">priya</span>
            <span className="text-[9.5px] text-muted-foreground ml-auto">now</span>
          </div>
          <div className="text-[11px] leading-relaxed text-foreground/90">
            warmup logic ready for review — pushing in 5
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ============================================================
 * Scene 3 — Profile / reputation
 * ============================================================ */

function ProfileScene() {
  // Build a soft sparkline path
  const points = [12, 18, 14, 22, 19, 28, 26, 34, 30, 42, 40, 52, 58]
  const w = 220
  const h = 60
  const stepX = w / (points.length - 1)
  const max = Math.max(...points)
  const min = Math.min(...points)
  const norm = (v: number) => h - ((v - min) / (max - min)) * (h - 6) - 3
  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i * stepX).toFixed(1)},${norm(p).toFixed(1)}`)
    .join(" ")
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`

  return (
    <div className="relative h-[480px] sm:h-[600px]">
      {/* Ambient */}
      <div className="absolute -inset-10 -z-10">
        <div className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 h-60 w-60 rounded-full bg-amber-300/20 blur-[100px]" />
      </div>

      {/* Background activity feed (peeking from right) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-2 w-[260px] rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md shadow-[0_24px_60px_-20px_rgba(76,29,149,0.2)] overflow-hidden"
      >
        <div className="px-3 py-2 border-b border-border/50 bg-background/55 flex items-center gap-2">
          <TrendingUp className="h-3 w-3 text-primary" />
          <span className="text-[10.5px] font-medium">Recent activity</span>
          <PresenceDot />
        </div>
        <div className="divide-y divide-border/40">
          {[
            { t: "Top answer in", topic: "#ml-research", delta: "+124", color: "text-emerald-600" },
            { t: "Shipped", topic: "FoundrLetters v0.4", delta: "+48", color: "text-primary" },
            { t: "Helpful review on", topic: "@marc/cold-emails", delta: "+18", color: "text-emerald-600" },
            { t: "Pinned by mods in", topic: "#yc-builders", delta: "+62", color: "text-primary" },
          ].map((a, i) => (
            <div key={i} className="px-3 py-2 flex items-center gap-2 text-[11px]">
              <Sparkles className="h-3 w-3 text-primary/70 flex-shrink-0" />
              <span className="text-muted-foreground truncate">
                {a.t} <span className="text-foreground font-medium">{a.topic}</span>
              </span>
              <span className={`ml-auto font-mono text-[10.5px] font-semibold ${a.color}`}>
                {a.delta}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main profile card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-10 w-full max-w-[420px] rounded-2xl border border-border/70 bg-card/85 backdrop-blur-xl shadow-[0_40px_100px_-20px_rgba(76,29,149,0.28)] overflow-hidden"
      >
        {/* Top sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

        {/* Cover with mesh + sweeping sheen */}
        <div className="relative h-24 bg-gradient-to-br from-primary/30 via-fuchsia-300/30 to-amber-200/40 overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay" />
          <div className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-sheen" />
        </div>

        <div className="px-5 pb-5 -mt-10">
          <div className="flex items-end justify-between">
            <div className="relative">
              <div className="h-[72px] w-[72px] rounded-2xl bg-gradient-to-br from-violet-400 via-fuchsia-500 to-rose-500 ring-4 ring-card shadow-lg shadow-primary/20" />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 ring-[3px] ring-card" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <button className="rounded-full border border-border/60 bg-background/80 px-2.5 py-1 text-[10.5px] font-medium hover:border-primary/40 transition-colors">
                Message
              </button>
              <button className="rounded-full bg-primary px-2.5 py-1 text-[10.5px] font-semibold text-primary-foreground shadow-sm shadow-primary/30">
                Follow
              </button>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[18px] font-semibold">Priya Shah</span>
              <span className="rounded-md bg-primary/10 text-primary px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide">
                Builder · L4
              </span>
              <span className="rounded-md bg-amber-500/15 text-amber-700 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide inline-flex items-center gap-1">
                <Trophy className="h-2.5 w-2.5" />
                Top 1%
              </span>
            </div>
            <div className="text-[12px] text-muted-foreground mt-0.5">
              CS @ IIT Bombay · ex-intern @ Linear · shipping FoundrLetters
            </div>
          </div>

          {/* Reputation chart card */}
          <div className="mt-4 rounded-xl border border-border/60 bg-background/60 p-3 relative overflow-hidden">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Reputation · 30d
                </div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-[20px] font-semibold tabular-nums">2,418</span>
                  <span className="text-[11px] font-medium text-emerald-600">
                    +312
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                <span className="font-mono">+14.8%</span>
              </div>
            </div>

            <svg
              viewBox={`0 0 ${w} ${h}`}
              className="w-full h-14 animate-spark-breathe"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.52 0.22 280)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="oklch(0.52 0.22 280)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="sparkLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="oklch(0.52 0.22 280)" />
                  <stop offset="100%" stopColor="oklch(0.7 0.2 320)" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#sparkFill)" />
              <path
                d={linePath}
                fill="none"
                stroke="url(#sparkLine)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* head dot */}
              <circle
                cx={(points.length - 1) * stepX}
                cy={norm(points[points.length - 1])}
                r="2.6"
                fill="oklch(0.52 0.22 280)"
              />
              <circle
                cx={(points.length - 1) * stepX}
                cy={norm(points[points.length - 1])}
                r="5"
                fill="oklch(0.52 0.22 280)"
                opacity="0.25"
                className="animate-pulse-ring"
              />
            </svg>
          </div>

          {/* Stats grid */}
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {[
              { label: "Shipped", value: "14" },
              { label: "Answers", value: "62" },
              { label: "Rooms", value: "8" },
              { label: "Followers", value: "1.2k", accent: true },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-border/60 bg-background/60 p-2"
              >
                <div
                  className={`text-[14px] font-semibold tabular-nums ${
                    s.accent ? "text-primary" : ""
                  }`}
                >
                  {s.value}
                </div>
                <div className="text-[9px] uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="mt-3 space-y-1.5">
            {[
              { icon: Sparkles, text: "Top 1% answer in #ml-research", color: "text-primary" },
              { icon: TrendingUp, text: "FoundrLetters trending #2 this week", color: "text-emerald-600" },
              { icon: Users, text: "Mentored 12 first-time builders", color: "text-amber-600" },
            ].map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[11.5px] rounded-lg px-2 py-1.5 hover:bg-foreground/[0.03] transition-colors"
              >
                <div className="h-5 w-5 rounded-md bg-foreground/[0.04] flex items-center justify-center">
                  <h.icon className={`h-2.5 w-2.5 ${h.color}`} />
                </div>
                <span className="text-foreground/90">{h.text}</span>
                <ChevronRight className="ml-auto h-3 w-3 text-muted-foreground/60" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating reputation gain notification */}
      <motion.div
        initial={{ opacity: 0, x: -16, y: 8 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-3 top-[330px] w-[230px] animate-float-slow"
      >
        <div className="rounded-xl border border-border/70 bg-card/95 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(76,29,149,0.3)] p-3 relative overflow-hidden">
          {/* Subtle inner glow sweep */}
          <div className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-sheen" />
          <div className="relative flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-fuchsia-500 flex items-center justify-center shadow-md shadow-primary/40">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold leading-tight">
                Reputation +120
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Top answer this week
              </div>
            </div>
          </div>
          <div className="relative mt-2.5">
            <div className="h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "78%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 1.0, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-fuchsia-500 rounded-full"
              />
            </div>
            <div className="mt-1 flex items-center justify-between text-[9.5px] text-muted-foreground">
              <span>Builder · L4</span>
              <span>78% to L5</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating achievement badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-2 bottom-6 w-[210px] animate-float-slower"
      >
        <div className="rounded-2xl border border-amber-500/30 bg-card/95 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(245,158,11,0.25)] p-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/40">
              <Trophy className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11.5px] font-semibold leading-tight">
                New achievement
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Mentor · 10+ helped
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cursor on profile */}
      <FakeCursor
        name="recruiter@vercel"
        color="emerald"
        className="left-[260px] top-[70px]"
        drift={2}
      />
    </div>
  )
}
