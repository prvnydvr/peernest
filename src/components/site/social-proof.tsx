"use client"

import { motion } from "motion/react"

const logos = [
  "Y Combinator",
  "MIT Sloan",
  "Stanford HCI",
  "ETH Zürich",
  "IIT Bombay",
  "HackMIT",
  "Cornell Tech",
  "Pioneer",
]

export function SocialProof() {
  return (
    <section className="relative py-16 sm:py-20 border-y border-border/50 bg-background/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
            Trusted by student builders, hackers and innovation cells at
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-8 items-center">
          {logos.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="text-center text-[14px] font-medium tracking-[-0.015em] text-muted-foreground/80 hover:text-foreground transition-colors duration-300 whitespace-nowrap"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
