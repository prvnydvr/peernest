"use client"

import { motion } from "motion/react"
import { Quote, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Aurora } from "./visual/aurora"
import { GridField } from "./visual/grid-field"
import { Constellation } from "./visual/constellation"
import { SignatureMark } from "./visual/signature-mark"

export function ManifestoSplit() {
  return (
    <section className="relative py-24 sm:py-32 md:py-44 overflow-hidden">
      {/* Signature ambient backdrop */}
      <Aurora variant="ambient" className="-z-10" />
      <GridField size="lg" mask="radial" className="-z-10 opacity-60" />
      <Constellation
        variant="ambient"
        className="-z-10 opacity-40 [mask-image:linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Asymmetric split: 5/7 ratio */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: oversized pull-quote (sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Editorial number */}
              <div className="inline-flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                <SignatureMark size={12} className="text-muted-foreground" />
                <span>01</span>
                <span className="h-px w-6 bg-border" />
                <span>Manifesto</span>
              </div>

              <Quote className="mt-10 h-9 w-9 text-primary/70" />

              <blockquote className="mt-5 text-[clamp(32px,5vw,62px)] leading-[1.02] tracking-[-0.032em] font-medium text-balance">
                The next generation isn&apos;t waiting to graduate to{" "}
                <span className="font-serif italic font-normal text-primary tracking-[-0.015em]">
                  start something
                </span>
                .
              </blockquote>

              <div className="mt-10 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-500 to-rose-500" />
                <div className="leading-[1.45]">
                  <div className="text-[13px] font-medium tracking-[-0.005em]">PeerNest team</div>
                  <div className="text-[12px] text-muted-foreground">
                    Founded by ex-builders from MIT, IIT &amp; Pioneer
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: editorial stack with floating callout */}
          <div className="lg:col-span-7 lg:col-start-7 relative">
            {/* Floating callout — overlapping into the quote column */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -left-20 -top-10 hidden lg:block w-[220px] rotate-[-3deg]"
            >
              <div className="rounded-xl border border-border/70 bg-card/95 backdrop-blur-xl shadow-[0_24px_60px_-16px_rgba(76,29,149,0.32)] p-3.5 animate-float-slow">
                <div className="flex items-center gap-2 mb-2">
                  <SignatureMark size={11} />
                  <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em] text-primary">
                    What we believe
                  </span>
                </div>
                <div className="text-[11.5px] leading-[1.55] text-foreground/90">
                  Reputation should compound from{" "}
                  <span className="font-medium text-foreground">work</span>, not noise.
                </div>
              </div>
            </motion.div>

            <div className="space-y-14">
              {[
                {
                  num: "I",
                  title: "Forums optimized for noise. We optimize for depth.",
                  body: "Threads stay alive as long as they&apos;re useful. Top answers pin themselves. Questions evolve as the field does — the way real research actually moves.",
                },
                {
                  num: "II",
                  title: "Your work is the resume.",
                  body: "Recruiters skim CVs. Founders read GitHub, Twitter, and now PeerNest. Every shipped project, every great answer, every helpful review compounds into a public profile that means something.",
                },
                {
                  num: "III",
                  title: "Async, but not asocial.",
                  body: "Project rooms with shared milestones, lightweight reviews, and a feed that actually understands what you&apos;re working on. Three time zones, zero chaos.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="grid grid-cols-[auto_1fr] gap-7 sm:gap-10"
                >
                  <div className="text-[48px] sm:text-[64px] leading-none font-serif italic font-normal text-primary/80 select-none w-14 tracking-[-0.01em]">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-[21px] sm:text-[26px] leading-[1.2] font-medium tracking-[-0.02em] text-balance">
                      {item.title}
                    </h3>
                    <p
                      className="mt-4 max-w-[58ch] text-[15px] leading-[1.7] text-muted-foreground text-pretty"
                      dangerouslySetInnerHTML={{ __html: item.body }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Read full manifesto link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-14 pt-8 border-t border-border/60"
            >
              <Link
                href="#manifesto"
                className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[-0.005em] text-foreground hover:text-primary transition-colors"
              >
                <span>Read the full manifesto</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
