import { cn } from "@/lib/utils"

/**
 * Aurora — PeerNest signature ambient lighting.
 *
 * A cluster of layered, differently-timed gradient orbs that drift
 * and breathe. Use as an absolute-positioned backdrop layer.
 *
 * Variants:
 *  - "ambient"  : light, subtle (default for content sections)
 *  - "stage"    : richer, used behind hero / showcase stages
 *  - "finale"   : maximum intensity for the closer / CTA
 *  - "rail"     : narrow horizontal aurora band for dividers
 */
type AuroraVariant = "ambient" | "stage" | "finale" | "rail"

export function Aurora({
  variant = "ambient",
  className,
}: {
  variant?: AuroraVariant
  className?: string
}) {
  if (variant === "rail") {
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className,
        )}
      >
        <div className="absolute inset-y-0 left-1/4 -translate-x-1/2 w-[60%] h-full">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.18_290/0.35),transparent_60%)] animate-aurora-a animate-aurora-hue" />
        </div>
        <div className="absolute inset-y-0 right-0 w-[40%] h-full">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.14_320/0.28),transparent_60%)] animate-aurora-b" />
        </div>
      </div>
    )
  }

  // intensity multipliers per variant
  const isFinale = variant === "finale"
  const isStage = variant === "stage"

  // size + opacity tokens
  const sizes = isFinale
    ? { a: "h-[680px] w-[680px]", b: "h-[560px] w-[560px]", c: "h-[480px] w-[480px]", d: "h-[420px] w-[420px]" }
    : isStage
    ? { a: "h-[560px] w-[560px]", b: "h-[460px] w-[460px]", c: "h-[400px] w-[400px]", d: "h-[340px] w-[340px]" }
    : { a: "h-[420px] w-[420px]", b: "h-[360px] w-[360px]", c: "h-[300px] w-[300px]", d: "h-[260px] w-[260px]" }

  const opa = isFinale ? "opacity-90" : isStage ? "opacity-75" : "opacity-55"

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        opa,
        className,
      )}
    >
      {/* Orb A — primary violet, top-left */}
      <div
        className={cn(
          "absolute -top-32 -left-24 rounded-full blur-[80px] animate-aurora-a animate-aurora-hue",
          sizes.a,
          "bg-[radial-gradient(circle_at_30%_30%,oklch(0.66_0.22_280/0.55),oklch(0.7_0.2_295/0.35)_45%,transparent_70%)]",
        )}
      />
      {/* Orb B — fuchsia / magenta, top-right */}
      <div
        className={cn(
          "absolute -top-24 right-[-10%] rounded-full blur-[80px] animate-aurora-b",
          sizes.b,
          "bg-[radial-gradient(circle_at_60%_40%,oklch(0.78_0.18_330/0.5),oklch(0.82_0.12_340/0.3)_50%,transparent_75%)]",
        )}
      />
      {/* Orb C — soft cyan/teal accent, bottom-left */}
      <div
        className={cn(
          "absolute bottom-[-15%] left-[15%] rounded-full blur-[80px] animate-aurora-c",
          sizes.c,
          "bg-[radial-gradient(circle_at_50%_50%,oklch(0.85_0.1_220/0.32),oklch(0.88_0.06_240/0.18)_55%,transparent_75%)]",
        )}
      />
      {/* Orb D — warm amber whisper, bottom-right */}
      <div
        className={cn(
          "absolute bottom-[-10%] right-[5%] rounded-full blur-[80px] animate-aurora-a",
          sizes.d,
          "bg-[radial-gradient(circle_at_40%_60%,oklch(0.88_0.1_70/0.28),oklch(0.92_0.06_60/0.14)_55%,transparent_75%)]",
        )}
      />

      {/* Specular highlight strip (finale only) */}
      {isFinale && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[2px] w-[70%] bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-[2px]" />
      )}
    </div>
  )
}
