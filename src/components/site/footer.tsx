import Link from "next/link"
import { Logo } from "./logo"
import { ArrowUpRight, Code2, MessageCircle, Network } from "lucide-react"
import { Aurora } from "./visual/aurora"
import { GridField } from "./visual/grid-field"
import { SignatureMark } from "./visual/signature-mark"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-background">
      {/* Ambient backdrop — softer than CTA */}
      <Aurora variant="ambient" className="-z-10 opacity-50" />
      <GridField mask="top" className="-z-10 opacity-40" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 pt-20 pb-10 sm:pt-24 sm:pb-12">
        {/* Top row — brand + nav */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-[44ch] text-[14px] leading-[1.7] tracking-[-0.005em] text-muted-foreground text-pretty">
              The internet campus for ambitious students. Where builders, hackers,
              and researchers actually ship.
            </p>

            {/* Status row */}
            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 backdrop-blur px-3 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span>All systems operational</span>
              <span className="mx-0.5 h-3 w-px bg-border" />
              <Link
                href="#"
                className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors"
              >
                Status
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Socials */}
            <div className="mt-7 flex items-center gap-2">
              {[
                { icon: MessageCircle, href: "#", label: "Twitter" },
                { icon: Code2, href: "#", label: "GitHub" },
                { icon: Network, href: "#", label: "LinkedIn" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/60 backdrop-blur text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-card transition-colors"
                >
                  <s.icon className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Spacer column on desktop */}
          <div className="hidden md:block md:col-span-1" />

          {/* Link columns — wider gutters, smaller groups */}
          <FooterCol
            className="col-span-1 md:col-span-2"
            title="Product"
            links={["Discussions", "Project rooms", "Reputation", "Communities"]}
          />
          <FooterCol
            className="col-span-1 md:col-span-2"
            title="Company"
            links={["About", "Manifesto", "Careers", "Press kit"]}
          />
          <FooterCol
            className="col-span-2 md:col-span-2"
            title="Resources"
            links={["Changelog", "Guides", "Status", "Support"]}
          />
        </div>

        {/* Cinematic giant wordmark — Linear / Stripe style */}
        <div
          aria-hidden
          className="relative mt-24 sm:mt-36 select-none"
        >
          {/* soft halo behind */}
          <div className="absolute inset-x-0 -bottom-8 h-48 bg-[radial-gradient(ellipse_at_50%_100%,oklch(0.7_0.18_290/0.3),transparent_65%)] blur-3xl -z-10" />
          <div
            className="text-center font-medium tracking-[-0.06em] leading-[0.84] text-transparent bg-clip-text bg-[length:200%_100%] animate-wordmark-shimmer"
            style={{
              fontSize: "clamp(52px, 15.5vw, 280px)",
              backgroundImage:
                "linear-gradient(110deg, oklch(0.52 0.22 280) 0%, oklch(0.62 0.24 320) 30%, oklch(0.78 0.16 350) 50%, oklch(0.62 0.24 320) 70%, oklch(0.52 0.22 280) 100%)",
            }}
          >
            PeerNest
          </div>
          {/* Bottom edge fade so it dissolves into the page */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background"
          />
        </div>

        {/* Bottom row — legal */}
        <div className="mt-14 pt-7 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
            <SignatureMark size={11} />
            <span>
              © <span className="tabular-nums">{new Date().getFullYear()}</span> PeerNest Inc. Built by students, for students.
            </span>
          </div>
          <div className="flex items-center gap-1 text-[12.5px]">
            {["Privacy", "Terms", "Security", "Cookies"].map((l) => (
              <Link
                key={l}
                href="#"
                className="rounded-full px-3 py-1 tracking-[-0.005em] text-muted-foreground hover:text-foreground hover:bg-card/60 transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
  className,
}: {
  title: string
  links: string[]
  className?: string
}) {
  return (
    <div className={className}>
      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/80">
        {title}
      </div>
      <ul className="mt-6 space-y-3.5">
        {links.map((l) => (
          <li key={l}>
            <Link
              href="#"
              className="group inline-flex items-center gap-1 text-[13.5px] tracking-[-0.005em] text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{l}</span>
              <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
