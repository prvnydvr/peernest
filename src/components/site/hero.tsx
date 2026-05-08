"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { ArrowRight, Play, ChevronDown } from "lucide-react"
import { HeroMockup } from "./hero-mockup"
import { Aurora } from "./visual/aurora"
import { Constellation } from "./visual/constellation"
import { GridField } from "./visual/grid-field"
import { SignatureMark } from "./visual/signature-mark"

export function Hero() {
  return (
    <section className="relative pt-28 sm:pt-32 md:pt-40 pb-20 sm:pb-24 md:pb-32 overflow-hidden">
      {/* ===== Cinematic backdrop stack ===== */}
      {/* 1. Stage aurora — primary lighting */}
      <Aurora variant="stage" className="-z-10" />
      {/* 2. Constellation network — depth + collaboration metaphor */}
      <Constellation
        variant="dense"
        className="-z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_50%_40%,black_15%,transparent_80%)]"
      />
      {/* 3. Soft dot field — ambient grain */}
      <GridField mask="radial" className="-z-10" />
      {/* 4. Specular ceiling glow — gives the section a "stage light" feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,oklch(0.78_0.16_290/0.45),transparent_70%)]"
      />
      {/* 5. Floor fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-b from-transparent to-background"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          {/* ============== LEFT: Cinematic copy ============== */}
          <div className="relative">
            {/* Live status row — eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur-md pl-1.5 pr-3 py-1 text-[11.5px] font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-1.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.16em] uppercase">
                  <SignatureMark size={10} animated={false} />
                  v1
                </span>
                <span className="tracking-[-0.005em]">Project matching is live</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.02em] text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-live-dot" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="tabular-nums">342 building right now</span>
              </span>
            </motion.div>

            {/* Headline — cinematic scale, editorial weight */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 sm:mt-8 text-[clamp(38px,9.2vw,108px)] leading-[0.90] sm:leading-[0.88] tracking-[-0.045em] sm:tracking-[-0.048em] font-medium text-foreground text-balance"
            >
              The internet
              <br />
              campus for{" "}
              <span className="relative inline-block">
                <span className="font-serif italic font-normal text-primary tracking-[-0.02em]">
                  ambitious
                </span>
                {/* Multi-layer glow for cinematic depth */}
                <span
                  aria-hidden
                  className="absolute -inset-x-4 -inset-y-2 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.16_290/0.55),transparent_65%)] blur-2xl"
                />
                <span
                  aria-hidden
                  className="absolute -inset-x-8 -inset-y-4 -z-20 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.85_0.1_280/0.3),transparent_70%)] blur-3xl animate-ambient-breathe"
                />
              </span>
              <br />
              students.
            </motion.h1>

            {/* Subtext — restrained, editorial */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18 }}
              className="mt-6 sm:mt-8 max-w-[44ch] text-[15px] sm:text-[17px] leading-[1.6] sm:leading-[1.65] tracking-[-0.005em] text-muted-foreground text-pretty"
            >
              The operating system where builders, hackers and researchers ship
              together. Ask sharper questions, find serious collaborators, build
              a public reputation that{" "}
              <span className="text-foreground/85 font-medium">actually compounds</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.28 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/sign-up?notice=early-access"
                className="group relative inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-5 pr-4 py-3 text-[13.5px] font-medium tracking-[-0.005em] overflow-hidden transition-all duration-300 hover:-translate-y-0.5 shadow-[0_18px_40px_-14px_rgba(76,29,149,0.55),0_4px_12px_-4px_rgba(0,0,0,0.15)]"
              >
                {/* Inner glow on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_120%,oklch(0.6_0.22_290/0.55),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span className="relative">Claim your handle</span>
                <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-background/15 group-hover:bg-background/25 transition-colors">
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link
                href="#showcase"
                className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/40 backdrop-blur-md px-5 py-3 text-[13.5px] font-medium tracking-[-0.005em] text-foreground hover:bg-background/80 transition-all duration-300"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-foreground/[0.06] group-hover:bg-foreground/[0.1] transition-colors">
                  <Play className="h-2.5 w-2.5 fill-current" />
                </span>
                <span>Watch the tour</span>
                <span className="font-mono text-muted-foreground text-[10.5px] tracking-[0.05em] tabular-nums">90s</span>
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[
                  "from-violet-400 to-fuchsia-500",
                  "from-amber-300 to-orange-500",
                  "from-sky-400 to-blue-600",
                  "from-emerald-400 to-teal-600",
                  "from-rose-400 to-pink-600",
                ].map((g, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full bg-gradient-to-br ${g} ring-2 ring-background shadow-sm`}
                  />
                ))}
                <div className="h-8 w-8 rounded-full bg-foreground/[0.06] ring-2 ring-background grid place-items-center text-[10px] font-medium text-muted-foreground">
                  +9
                </div>
              </div>
              <div className="leading-[1.45]">
                <div className="text-[12.5px] font-medium tracking-[-0.005em] text-foreground">
                  <span className="tabular-nums">12,400+</span> students already inside
                </div>
                <div className="mt-0.5 text-[11.5px] text-muted-foreground">
                  From MIT, IIT, Stanford, ETH &amp; <span className="tabular-nums">280+</span> more
                </div>
              </div>
            </motion.div>
          </div>

          {/* ============== RIGHT: Cinematic mockup ============== */}
          <div className="relative">
            <HeroMockup />
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-16 sm:mt-24 flex flex-col items-center text-muted-foreground"
        >
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em]">
            Scroll to explore
          </span>
          <ChevronDown className="mt-2 h-4 w-4 animate-float-slow" />
        </motion.div>
      </div>
    </section>
  )
}
