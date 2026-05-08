"use client"

import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import {
  MessageSquare,
  Sparkles,
  GitBranch,
  ArrowUp,
  CheckCircle2,
  Code2,
  FileText,
  Hash,
  Search,
  TrendingUp,
  Command,
  CornerDownLeft,
  Compass,
  Bell,
  Mic,
} from "lucide-react"
import type React from "react"

/**
 * Cinematic hero mockup — multi-layer "internet campus" stage.
 *
 * Layers (back to front):
 *  - Specular halo + ambient orbs
 *  - Constellation glints
 *  - Main app surface (with chrome, sidebar, live feed, dock)
 *  - Floating profile card (left, parallax shift -)
 *  - Floating reputation card (right top, parallax shift +)
 *  - Floating command palette (right bottom, parallax shift +-)
 *  - "Joining now" presence ping (rises through scene)
 */
export function HeroMockup() {
  // Pointer-driven parallax tilt
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const rotX = useSpring(useTransform(mvY, [-0.5, 0.5], [4, -4]), { stiffness: 80, damping: 14 })
  const rotY = useSpring(useTransform(mvX, [-0.5, 0.5], [-6, 6]), { stiffness: 80, damping: 14 })

  // Parallax depth shifts for floating layers
  const fLeftX = useSpring(useTransform(mvX, [-0.5, 0.5], [10, -10]), { stiffness: 60, damping: 16 })
  const fLeftY = useSpring(useTransform(mvY, [-0.5, 0.5], [8, -8]), { stiffness: 60, damping: 16 })
  const fRightX = useSpring(useTransform(mvX, [-0.5, 0.5], [-14, 14]), { stiffness: 60, damping: 16 })
  const fRightY = useSpring(useTransform(mvY, [-0.5, 0.5], [-10, 10]), { stiffness: 60, damping: 16 })
  const fCmdX = useSpring(useTransform(mvX, [-0.5, 0.5], [-8, 8]), { stiffness: 60, damping: 16 })
  const fCmdY = useSpring(useTransform(mvY, [-0.5, 0.5], [-6, 6]), { stiffness: 60, damping: 16 })

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mvX.set((e.clientX - r.left) / r.width - 0.5)
    mvY.set((e.clientY - r.top) / r.height - 0.5)
  }
  function handleLeave() {
    mvX.set(0)
    mvY.set(0)
  }

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative w-full max-w-[680px] mx-auto lg:mx-0 lg:ml-auto"
      style={{ perspective: 1400 }}
    >
      {/* Specular halo behind stage */}
      <div className="absolute -inset-24 -z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 h-80 w-80 rounded-full bg-primary/30 animate-glow-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-fuchsia-400/25 animate-glow-pulse"
          style={{ animationDelay: "1.4s" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.85_0.06_280/0.18),transparent_60%)]" />
      </div>

      {/* Glints */}
      <div className="absolute -inset-10 -z-10 pointer-events-none">
        <span className="absolute top-[12%] left-[8%] h-1 w-1 rounded-full bg-primary/70 animate-node-twinkle" />
        <span
          className="absolute top-[78%] right-[6%] h-1 w-1 rounded-full bg-fuchsia-400 animate-node-twinkle"
          style={{ animationDelay: "1.1s" }}
        />
        <span
          className="absolute top-[40%] right-[-2%] h-1.5 w-1.5 rounded-full bg-amber-300 animate-node-twinkle"
          style={{ animationDelay: "2.3s" }}
        />
      </div>

      {/* ============================================================
          MAIN STAGE — the "internet campus" application window
         ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 36, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.05, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-[22px] border border-border/70 bg-card/85 backdrop-blur-2xl overflow-hidden shadow-[0_60px_120px_-30px_rgba(76,29,149,0.45),0_30px_60px_-25px_rgba(76,29,149,0.25),0_8px_24px_-8px_rgba(0,0,0,0.1),inset_0_1px_0_0_oklch(1_0_0/0.5)]"
      >
        {/* Inner top sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/40 via-white/0 to-transparent mix-blend-overlay" />
        {/* Inner side reflection */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent" />

        {/* OS-style chrome */}
        <div className="relative flex items-center gap-3 px-4 py-3 border-b border-border/60 bg-background/70">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          </div>
          <div className="flex-1 flex justify-center px-2">
            <div className="flex items-center gap-2 rounded-md bg-foreground/[0.04] border border-border/40 px-3 py-1 text-[11px] text-muted-foreground w-full max-w-[260px]">
              <Search className="h-3 w-3 shrink-0" />
              <span className="truncate">peernest.io / feed</span>
              <span className="ml-auto flex shrink-0 items-center gap-1 text-[9.5px] font-medium uppercase tracking-wider text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-live-dot" />
                Live
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-md border border-border/60 bg-background/40 grid place-items-center">
              <Bell className="h-3 w-3 text-muted-foreground" />
            </div>
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-400 via-fuchsia-400 to-rose-400 ring-2 ring-card" />
          </div>
        </div>

        {/* App body */}
        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] min-h-[520px]">
          {/* Sidebar */}
          <div className="hidden sm:block border-r border-border/60 bg-background/40 p-3 space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 px-2 mb-2">
              Workspace
            </div>
            {[
              { icon: TrendingUp, label: "Feed", active: true },
              { icon: MessageSquare, label: "Discussions" },
              { icon: GitBranch, label: "Projects" },
              { icon: FileText, label: "Resources" },
              { icon: Hash, label: "Communities" },
              { icon: Compass, label: "Discover" },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] transition-colors ${
                  item.active
                    ? "bg-foreground/[0.06] text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
                {item.active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </div>
            ))}

            <div className="pt-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 px-2 mb-2">
                Active
              </div>
              {[
                { tag: "ml-research", count: 12, hot: true },
                { tag: "yc-builders", count: 8 },
                { tag: "rust-club", count: 4 },
                { tag: "ship-fridays", count: 6 },
              ].map((c) => (
                <div
                  key={c.tag}
                  className="flex items-center justify-between px-2 py-1.5 text-[12px] text-muted-foreground"
                >
                  <span>#{c.tag}</span>
                  <span
                    className={`text-[10px] font-medium ${c.hot ? "text-primary" : "text-muted-foreground/70"}`}
                  >
                    {c.count}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 px-2 mb-2">
                Now collaborating
              </div>
              <div className="px-2 flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {[
                    "from-violet-400 to-fuchsia-500",
                    "from-amber-300 to-orange-500",
                    "from-sky-400 to-blue-600",
                    "from-emerald-400 to-teal-600",
                  ].map((g, i) => (
                    <div
                      key={i}
                      className={`relative h-5 w-5 rounded-full bg-gradient-to-br ${g} ring-2 ring-background`}
                    >
                      {i < 2 && (
                        <span className="absolute -bottom-px -right-px h-1.5 w-1.5 rounded-full bg-emerald-500 ring-1 ring-background" />
                      )}
                    </div>
                  ))}
                  <div className="h-5 w-5 rounded-full bg-foreground/[0.06] ring-2 ring-background grid place-items-center text-[8.5px] font-medium text-muted-foreground">
                    +9
                  </div>
                </div>
              </div>
              {/* Live typing indicator */}
              <div className="px-2 mt-2 flex items-center gap-1.5 text-[9.5px] text-muted-foreground">
                <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500" />
                <span className="text-foreground/80">priya</span>
                <span className="inline-flex items-end gap-0.5">
                  <span className="h-0.5 w-0.5 rounded-full bg-current animate-typing-dot" style={{ animationDelay: '0ms' }} />
                  <span className="h-0.5 w-0.5 rounded-full bg-current animate-typing-dot" style={{ animationDelay: '180ms' }} />
                  <span className="h-0.5 w-0.5 rounded-full bg-current animate-typing-dot" style={{ animationDelay: '360ms' }} />
                </span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="relative p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-semibold">Today&apos;s feed</div>
                <span className="text-[10px] text-muted-foreground/80">
                  curated for ML &amp; systems
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-live-dot" />
                <span>342 online</span>
              </div>
            </div>

            {/* Live activity ticker — three rotating headlines */}
            <div className="relative h-7 overflow-hidden rounded-md border border-border/50 bg-background/50 px-2.5">
              <div className="flex items-center h-7 gap-2 text-[10.5px] uppercase tracking-wider text-primary font-medium">
                <Sparkles className="h-3 w-3" />
                <span>Live on PeerNest</span>
              </div>
              <div className="absolute inset-0 left-[140px] flex flex-col text-[11.5px] text-foreground/85 animate-activity-tick">
                {[
                  "Mira just shipped agentic-rag v0.3 — 28 reviews",
                  "Theo opened: rust-club / async traits primer",
                  "Aanya answered: how to eval llama on $0",
                  "Priya posted: real-time collab editor (3 spots)",
                ].map((line, i) => (
                  <div key={i} className="h-7 flex items-center">
                    {line}
                  </div>
                ))}
              </div>
            </div>

            {/* Discussion card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="rounded-xl border border-border/60 bg-background/70 p-3 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-2.5">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 flex-shrink-0 ring-2 ring-background" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className="font-medium text-foreground">aanya.dev</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">2h</span>
                    <span className="ml-auto px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[9px] font-medium">
                      ML
                    </span>
                  </div>
                  <div className="text-[12.5px] font-medium text-foreground mt-0.5 leading-snug">
                    How are you running fine-tuning evals on a $0 budget?
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                    Building a small adapter on top of Llama. Looking for benchmarks
                    that don&apos;t need an A100…
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ArrowUp className="h-3 w-3" /> 47
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> 23 replies
                    </span>
                    <span className="flex items-center gap-1 text-primary">
                      <Sparkles className="h-3 w-3" /> Trending
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="relative rounded-xl border border-border/60 bg-gradient-to-br from-primary/[0.07] via-card/40 to-transparent p-3 overflow-hidden"
            >
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_-20%,oklch(0.7_0.2_290/0.18),transparent_55%)]" />
              <div className="flex items-center gap-2 text-[11px] mb-2">
                <Code2 className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium">Looking for collaborator</span>
                <span className="ml-auto text-muted-foreground">3 spots</span>
              </div>
              <div className="text-[12.5px] font-medium leading-snug">
                Real-time collab editor for student research papers
              </div>
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex -space-x-1.5">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 ring-2 ring-card" />
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 ring-2 ring-card" />
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 ring-2 ring-card" />
                </div>
                <span className="text-[10px] text-muted-foreground">
                  Priya, Marc, Theo + 2
                </span>
                <button className="ml-auto inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/[0.08] text-primary px-2 py-0.5 text-[10px] font-medium hover:bg-primary/[0.14] transition-colors">
                  Join
                  <CornerDownLeft className="h-3 w-3" />
                </button>
              </div>
            </motion.div>

            {/* Resource card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="rounded-xl border border-border/60 bg-background/70 p-3"
            >
              <div className="flex items-center gap-2 text-[11px]">
                <div className="h-6 w-6 rounded-md bg-emerald-500/10 flex items-center justify-center">
                  <FileText className="h-3 w-3 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium truncate">
                    System Design Notes — Stanford CS244
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Shared by jordan.k · 124 saves
                  </div>
                </div>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              </div>
            </motion.div>

            {/* Bottom OS dock */}
            <div className="absolute left-4 right-4 bottom-3">
              <div className="relative rounded-xl border border-border/60 bg-card/85 backdrop-blur-xl px-2.5 py-1.5 flex items-center gap-1 shadow-[0_10px_30px_-12px_rgba(76,29,149,0.4)]">
                <div className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground px-1.5">
                  <Command className="h-3 w-3" />
                  <span>K</span>
                </div>
                <div className="h-3 w-px bg-border/80 mx-1" />
                {[
                  { icon: Compass, label: "Discover" },
                  { icon: GitBranch, label: "New project" },
                  { icon: MessageSquare, label: "Ask peers" },
                  { icon: Mic, label: "Hop in voice" },
                ].map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[10.5px] text-foreground/80 hover:bg-foreground/[0.05] transition-colors"
                  >
                    <d.icon className="h-3 w-3 text-primary" />
                    <span className="hidden sm:inline">{d.label}</span>
                  </div>
                ))}
                <div className="ml-auto inline-flex items-center gap-1 rounded-md bg-primary/[0.1] text-primary px-2 py-0.5 text-[10px] font-medium">
                  <Sparkles className="h-3 w-3" />
                  ⌘ ask
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============================================================
          FLOATING LAYER — Profile (left, parallax shift)
         ============================================================ */}
      <motion.div
        initial={{ opacity: 0, x: -24, y: 24 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.85, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        style={{ x: fLeftX, y: fLeftY }}
        className="absolute -left-6 sm:-left-16 bottom-12 sm:bottom-20 w-[244px] hidden sm:block"
      >
        <div className="relative rounded-2xl border border-border/70 bg-card/90 backdrop-blur-xl p-3.5 shadow-[0_30px_60px_-15px_rgba(76,29,149,0.45),0_8px_20px_-8px_rgba(0,0,0,0.1)] animate-float-slow">
          {/* Card halo */}
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-primary/15 via-fuchsia-400/10 to-transparent blur-2xl" />
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-rose-400" />
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-card animate-live-dot" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold leading-tight">Priya Shah</div>
              <div className="text-[10.5px] text-muted-foreground">
                CS @ IIT · Builder
              </div>
            </div>
            <div className="rounded-md border border-border/60 bg-background/60 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
              L4
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
            <div className="rounded-md bg-foreground/[0.03] py-1.5">
              <div className="text-[12px] font-semibold">28</div>
              <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
                Projects
              </div>
            </div>
            <div className="rounded-md bg-foreground/[0.03] py-1.5">
              <div className="text-[12px] font-semibold text-primary">1.2k</div>
              <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
                Rep
              </div>
            </div>
            <div className="rounded-md bg-foreground/[0.03] py-1.5">
              <div className="text-[12px] font-semibold">42</div>
              <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
                Answers
              </div>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Now editing</span>
            <span className="font-medium text-foreground/85">paper / abstract.md</span>
          </div>
        </div>
      </motion.div>

      {/* ============================================================
          FLOATING LAYER — Reputation (top right, parallax)
         ============================================================ */}
      <motion.div
        initial={{ opacity: 0, x: 24, y: -12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.85, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ x: fRightX, y: fRightY }}
        className="absolute -right-3 sm:-right-12 top-14 sm:top-20 w-[224px] hidden sm:block"
      >
        <div className="relative rounded-2xl border border-border/70 bg-card/90 backdrop-blur-xl p-3 shadow-[0_30px_60px_-15px_rgba(76,29,149,0.4),0_8px_20px_-8px_rgba(0,0,0,0.1)] animate-float-slower">
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-primary/15 to-fuchsia-400/10 blur-2xl" />
          <div className="flex items-center gap-2 mb-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-fuchsia-500 flex items-center justify-center shadow-lg shadow-primary/30 animate-hue-drift">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <div className="text-[11.5px] font-semibold leading-tight">
                Reputation +120
              </div>
              <div className="text-[10px] text-muted-foreground">
                Top answer this week
              </div>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "78%" }}
              transition={{ duration: 1.6, delay: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-fuchsia-500 rounded-full"
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[9.5px] text-muted-foreground">
            <span>Builder · Level 4</span>
            <span>78%</span>
          </div>
        </div>
      </motion.div>

      {/* ============================================================
          FLOATING LAYER — Command palette (right bottom, parallax)
         ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ x: fCmdX, y: fCmdY }}
        className="absolute -right-1 sm:-right-8 bottom-2 sm:bottom-6 w-[260px] hidden md:block"
      >
        <div className="relative rounded-2xl border border-border/70 bg-card/95 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(76,29,149,0.45),0_10px_25px_-10px_rgba(0,0,0,0.12)] overflow-hidden">
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-primary/15 to-fuchsia-400/10 blur-2xl" />
          {/* Input row */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border/60">
            <Command className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[12px] text-foreground/85">Find a peer who&apos;s shipped</span>
            <span className="ml-1 inline-block h-3 w-[2px] bg-primary animate-caret" />
            <kbd className="ml-auto rounded-md border border-border/60 bg-background/60 px-1.5 py-0.5 text-[9.5px] font-mono text-muted-foreground">
              ⌘K
            </kbd>
          </div>
          {/* Results */}
          <div className="px-2 py-2 space-y-0.5">
            {[
              { label: "Mira Chen — Agentic RAG, A11y", hint: "→ project", hot: true },
              { label: "Theo K. — Distributed systems", hint: "→ profile" },
              { label: "Compose new question", hint: "⏎" },
            ].map((r, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11.5px] ${
                  i === 0 ? "bg-primary/[0.08] text-foreground" : "text-foreground/80"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${r.hot ? "bg-primary" : "bg-muted-foreground/50"}`}
                />
                <span className="flex-1 truncate">{r.label}</span>
                <span className="text-[10px] text-muted-foreground">{r.hint}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ============================================================
          FLOATING PING — "Mira just joined" presence bubble
         ============================================================ */}
      <div
        aria-hidden
        className="absolute left-[42%] sm:left-[44%] -top-3 hidden sm:block"
        style={{ animationDelay: "2.4s" }}
      >
        <div className="animate-ping-rise">
          <div className="relative rounded-full border border-border/70 bg-card/95 backdrop-blur-xl pl-1.5 pr-3 py-1 flex items-center gap-2 shadow-[0_10px_30px_-10px_rgba(76,29,149,0.4)]">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-rose-400" />
            <span className="text-[11px] text-foreground">
              <span className="font-semibold">Mira</span> joined
              <span className="text-muted-foreground"> · #ml-research</span>
            </span>
          </div>
        </div>
      </div>

      {/* Subtle floating cursors over the stage */}
      <div aria-hidden className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-[36%] left-[58%] animate-drift-a">
          <CursorChip name="theo" tone="violet" />
        </div>
        <div className="absolute top-[68%] left-[34%] animate-drift-b">
          <CursorChip name="mira" tone="rose" />
        </div>
      </div>
    </div>
  )
}

function CursorChip({ name, tone }: { name: string; tone: "violet" | "rose" }) {
  const palette =
    tone === "violet"
      ? { fill: "oklch(0.6 0.22 285)", bg: "bg-primary text-primary-foreground" }
      : { fill: "oklch(0.7 0.18 15)", bg: "bg-rose-500 text-white" }
  return (
    <div className="flex items-start gap-1">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2 2 L11 6 L6 7.5 L4.5 12 Z"
          fill={palette.fill}
          stroke="white"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`mt-1 rounded-md px-1.5 py-0.5 text-[9px] font-medium leading-none ${palette.bg} shadow-sm`}
      >
        {name}
      </span>
    </div>
  )
}
