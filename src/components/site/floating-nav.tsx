"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Logo } from "./logo"
import { cn } from "@/lib/utils"

const links = [
  { label: "Product", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Community", href: "#testimonials" },
  { label: "Access", href: "#cta" },
]

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative flex w-full max-w-5xl items-center justify-between rounded-full border border-border/60 px-4 py-2 transition-all duration-500",
          scrolled
            ? "bg-background/70 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(76,29,149,0.15)]"
            : "bg-background/40 backdrop-blur-md"
        )}
      >
        <Link href="/" className="flex items-center pl-1">
          <Logo />
        </Link>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative px-3.5 py-1.5 text-[13px] font-medium tracking-[-0.005em] text-muted-foreground transition-colors hover:text-foreground group"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-0 rounded-full bg-foreground/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="hidden sm:inline-flex text-[13px] font-medium tracking-[-0.005em] text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
          >
            Log in
          </Link>
          <Link
            href="#cta"
            className="group relative inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-1.5 text-[13px] font-medium tracking-[-0.005em] shadow-[0_4px_14px_-4px_rgba(24,24,27,0.4)] hover:shadow-[0_6px_20px_-4px_rgba(76,29,149,0.5)] transition-all duration-300"
          >
            <span>Get early access</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-foreground/5"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-20 left-4 right-4 rounded-2xl border border-border/60 bg-background/90 backdrop-blur-xl p-3 shadow-xl"
          >
            <div className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm text-foreground/80 hover:bg-foreground/5 rounded-lg"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border/60 pt-3">
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-center text-sm font-medium text-foreground/80 hover:bg-foreground/5"
                >
                  Log in
                </Link>
                <Link
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-foreground px-3 py-2.5 text-center text-sm font-medium text-background"
                >
                  Early access
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
