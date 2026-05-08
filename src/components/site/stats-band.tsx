"use client"

import { motion } from "motion/react"
import { TrendingUp, Globe2, Users, Zap } from "lucide-react"
import { Aurora } from "./visual/aurora"
import { GridField } from "./visual/grid-field"
import { SignatureMark } from "./visual/signature-mark"

const stats = [
  {
    value: "12,400",
    suffix: "+",
    label: "students inside",
    sub: "Across 280+ campuses",
    icon: Users,
  },
  {
    value: "38",
    suffix: "%",
    label: "top-answer rate",
    sub: "Quality over karma",
    icon: TrendingUp,
  },
  {
    value: "2,140",
    suffix: "",
    label: "projects shipped",
    sub: "This semester alone",
    icon: Zap,
  },
  {
    value: "47",
    suffix: "",
    label: "countries",
    sub: "Async-first, by default",
    icon: Globe2,
  },
]

export function StatsBand() {
  return (
    <section className="relative py-24 sm:py-28 md:py-40 overflow-hidden">
      {/* Signature ambient backdrop */}
      <Aurora variant="ambient" className="-z-10" />
      <GridField mask="radial" className="-z-10" />
      <div className="absolute inset-y-0 left-0 -z-10 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      <div className="absolute inset-y-0 right-0 -z-10 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Editorial intro — asymmetric, off-center */}
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              <SignatureMark size={12} />
              The numbers
            </div>
            <h2 className="mt-5 text-[clamp(32px,7.2vw,88px)] leading-[0.94] sm:leading-[0.92] tracking-[-0.042em] sm:tracking-[-0.045em] font-medium text-balance">
              Built quietly.
              <br />
              Shipping{" "}
              <span className="font-serif italic font-normal text-primary tracking-[-0.025em]">
                loudly
              </span>
              .
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-4 lg:col-start-9 max-w-[42ch] text-[15.5px] leading-[1.7] text-muted-foreground text-pretty"
          >
            Most platforms count signups. We count{" "}
            <span className="text-foreground font-medium">work shipped</span>,{" "}
            <span className="text-foreground font-medium">questions answered</span>, and{" "}
            <span className="text-foreground font-medium">careers changed</span> by the
            people you met here.
          </motion.p>
        </div>

        {/* Stats — 4-up with internal rule lines, offset baseline */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 lg:gap-x-0">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.05 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative ${
                  i > 0 ? "lg:pl-10 lg:border-l lg:border-border/60" : ""
                } ${i % 2 === 1 ? "lg:translate-y-8" : ""}`}
              >
                <div className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {s.label}
                </div>
                <div className="mt-5 flex items-baseline">
                  <span className="text-[clamp(44px,9vw,104px)] leading-none tracking-[-0.048em] font-medium tabular-nums text-foreground">
                    {s.value}
                  </span>
                  <span className="text-[clamp(32px,4vw,48px)] leading-none font-serif italic font-normal text-primary ml-1 tracking-[-0.02em]">
                    {s.suffix}
                  </span>
                </div>
                <div className="mt-4 text-[12.5px] leading-[1.55] text-muted-foreground">{s.sub}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
