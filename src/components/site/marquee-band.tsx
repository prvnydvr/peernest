"use client"

import { motion } from "motion/react"
import { ArrowUpRight, Sparkles, Zap, GitBranch, Trophy, Users, Star } from "lucide-react"

const topics = [
  { label: "ml-research", icon: Sparkles },
  { label: "yc-builders", icon: Zap },
  { label: "rust-club", icon: GitBranch },
  { label: "robotics-cell", icon: Trophy },
  { label: "design-engineers", icon: Star },
  { label: "quant-circle", icon: Users },
  { label: "neuroscience", icon: Sparkles },
  { label: "hardware-hackers", icon: Zap },
  { label: "indie-os", icon: GitBranch },
  { label: "compilers-club", icon: Trophy },
  { label: "biotech", icon: Star },
  { label: "graphics-cell", icon: Users },
]

const headlines = [
  "Top answer pinned in #ml-research",
  "FoundrLetters shipped v0.4",
  "PR #42 merged in 14 minutes",
  "Priya joined as a collaborator",
  "Reputation +312 this week",
  "New project room: edge-rl",
  "Theo accepted at Anthropic Labs",
  "ETH Zürich · 38 new builders",
]

export function MarqueeBand() {
  return (
    <section
      aria-hidden
      className="relative -mt-px border-y border-border/60 bg-background/40 backdrop-blur-sm overflow-hidden"
    >
      {/* Section header strip */}
      <div className="mx-auto max-w-7xl px-6 py-7 flex items-center gap-4">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Live on PeerNest right now
        </span>
        <div className="ml-auto hidden sm:flex items-baseline gap-1.5 text-[11.5px] text-muted-foreground">
          <span className="font-mono text-[13px] font-medium tabular-nums tracking-[-0.01em] text-foreground">2,418</span>
          <span>active builders</span>
        </div>
      </div>

      {/* Topic pills row — left to right */}
      <div className="relative mask-fade-x py-2">
        <div className="flex w-max animate-marquee gap-3 pr-3">
          {[...topics, ...topics].map((t, i) => {
            const Icon = t.icon
            return (
              <div
                key={`t1-${i}`}
                className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 backdrop-blur-sm pl-2.5 pr-3.5 py-1.5 text-[12.5px] font-medium tracking-[-0.005em] text-foreground/85 hover:border-primary/40 hover:text-foreground transition-colors"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-3 w-3" />
                </span>
                <span className="font-mono">#{t.label}</span>
                <ArrowUpRight className="h-3 w-3 text-muted-foreground/70" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Headline ticker — right to left */}
      <div className="relative mask-fade-x py-2 pb-6">
        <div className="flex w-max animate-marquee-reverse gap-10 pr-10">
          {[...headlines, ...headlines].map((h, i) => (
            <motion.div
              key={`h1-${i}`}
              className="inline-flex items-center gap-3 text-[13px] text-muted-foreground"
            >
              <span className="h-1 w-1 rounded-full bg-primary/70" />
              <span className="font-medium tracking-[-0.005em] text-foreground/85">{h}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                · just now
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
