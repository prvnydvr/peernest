"use client"

import { motion } from "motion/react"
import { Quote, Star } from "lucide-react"

const featured = {
  quote:
    "PeerNest is to ambitious students what GitHub was to early open-source — the place where the work actually happens.",
  name: "Jordan Kim",
  role: "Hacker-in-residence, Pioneer",
  gradient: "from-sky-400 to-blue-600",
  meta: "Joined Q1 · 14 projects shipped",
}

const testimonials = [
  {
    quote:
      "I found my two co-founders on PeerNest. Not LinkedIn, not Twitter — here. The signal-to-noise is unreal.",
    name: "Aanya Mehta",
    role: "Founder, Loop AI · Stanford CS",
    gradient: "from-violet-400 to-fuchsia-500",
  },
  {
    quote:
      "It\u2019s the first place online where asking a hard question doesn\u2019t feel embarrassing \u2014 people actually engage with the depth.",
    name: "Marc Lefèvre",
    role: "PhD candidate, ETH Zürich",
    gradient: "from-amber-300 to-orange-500",
  },
  {
    quote:
      "My PeerNest profile got me a research internship at Anthropic. Recruiters can see what I actually built, not what I claimed.",
    name: "Theo Nakamura",
    role: "ML Researcher · MIT",
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    quote:
      "We ran our entire YC application sprint inside a project room. Three time zones, zero chaos.",
    name: "Priya Shah",
    role: "Co-founder, FoundrLetters · IIT Bombay",
    gradient: "from-rose-400 to-pink-600",
  },
  {
    quote:
      "Finally a place that takes student builders seriously without trying to gamify everything.",
    name: "Lina Costa",
    role: "EE @ Cornell · Hardware hacker",
    gradient: "from-fuchsia-400 to-purple-600",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 md:py-44 overflow-hidden">
      {/* Subtle backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Editorial header — asymmetric label + headline */}
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="inline-flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              <span>02</span>
              <span className="h-px w-6 bg-primary/40" />
              <span>Voices</span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="lg:col-span-10 text-[clamp(38px,7vw,84px)] leading-[0.94] tracking-[-0.042em] font-medium text-balance"
          >
            The kind of network you wish existed{" "}
            <span className="font-serif italic font-normal text-primary tracking-[-0.02em]">earlier</span>.
          </motion.h2>
        </div>

        {/* Featured-lead layout: hero quote on left + 2-up stack on right */}
        <div className="mt-20 grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured pull-quote — 7 cols, oversized */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative rounded-3xl border border-border/70 bg-card/70 backdrop-blur-xl p-8 sm:p-12 overflow-hidden"
          >
            {/* Inner ambient */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.06] via-transparent to-fuchsia-300/[0.06]" />
            <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-primary/15 blur-[80px]" />

            <Quote className="h-10 w-10 text-primary/70" />
            <blockquote className="mt-7 text-[clamp(22px,2.6vw,38px)] leading-[1.22] tracking-[-0.022em] font-normal text-foreground text-balance">
              {`\u201C${featured.quote}\u201D`}
            </blockquote>

            <figcaption className="mt-12 flex items-center gap-4">
              <div
                className={`h-12 w-12 rounded-full bg-gradient-to-br ${featured.gradient} ring-2 ring-card`}
              />
              <div className="flex-1 leading-[1.45]">
                <div className="text-[14.5px] font-medium tracking-[-0.005em]">
                  {featured.name}
                </div>
                <div className="mt-0.5 text-[12.5px] text-muted-foreground">{featured.role}</div>
              </div>
              <div className="hidden sm:flex flex-col items-end text-right">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground tabular-nums">
                  {featured.meta}
                </div>
              </div>
            </figcaption>
          </motion.figure>

          {/* Right column: 2 stacked, asymmetric heights */}
          <div className="lg:col-span-5 grid gap-6 lg:gap-8">
            {testimonials.slice(0, 2).map((t, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 hover:border-primary/30 transition-colors"
              >
                <blockquote className="text-[15px] leading-[1.65] text-foreground/90 text-pretty">
                  {`\u201C${t.quote}\u201D`}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full bg-gradient-to-br ${t.gradient}`}
                  />
                  <div className="leading-[1.45]">
                    <div className="text-[13px] font-medium tracking-[-0.005em]">
                      {t.name}
                    </div>
                    <div className="text-[11.5px] text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        {/* Horizontal scrolling track — secondary voices */}
        <div className="relative mt-10 mask-fade-x">
          <div className="flex w-max animate-marquee gap-5 py-2">
            {[...testimonials.slice(2), ...testimonials.slice(2)].map((t, i) => (
              <figure
                key={`scroll-${i}`}
                className="w-[360px] flex-shrink-0 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6"
              >
                <blockquote className="text-[14px] leading-[1.65] text-foreground/85">
                  {`\u201C${t.quote}\u201D`}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full bg-gradient-to-br ${t.gradient}`}
                  />
                  <div className="leading-[1.45]">
                    <div className="text-[12.5px] font-medium tracking-[-0.005em]">
                      {t.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
