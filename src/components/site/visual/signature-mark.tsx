import { cn } from "@/lib/utils"

/**
 * SignatureMark — PeerNest brand glyph.
 *
 * Three connected nodes forming an asymmetric triangle — a tiny
 * "constellation" that's the signature of every section. Use in the
 * logo, beside section eyebrows, and as a section-divider centerpiece.
 */
export function SignatureMark({
  size = 16,
  animated = true,
  className,
}: {
  size?: number
  animated?: boolean
  className?: string
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("inline-block text-primary shrink-0", className)}
    >
      <defs>
        <radialGradient id="sm-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.7" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* edges */}
      <line
        x1="5"
        y1="18"
        x2="19"
        y2="18"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      <line
        x1="5"
        y1="18"
        x2="12"
        y2="5"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      <line
        x1="19"
        y1="18"
        x2="12"
        y2="5"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1"
      />

      {/* halos */}
      <circle cx="12" cy="5" r="4" fill="url(#sm-glow)" />
      <circle cx="5" cy="18" r="3.5" fill="url(#sm-glow)" />
      <circle cx="19" cy="18" r="3.5" fill="url(#sm-glow)" />

      {/* nodes */}
      <circle
        cx="12"
        cy="5"
        r="2"
        fill="currentColor"
        className={animated ? "animate-mark-pulse" : ""}
      />
      <circle
        cx="5"
        cy="18"
        r="1.6"
        fill="currentColor"
        className={animated ? "animate-mark-pulse" : ""}
        style={animated ? { animationDelay: "0.4s" } : undefined}
      />
      <circle
        cx="19"
        cy="18"
        r="1.6"
        fill="currentColor"
        className={animated ? "animate-mark-pulse" : ""}
        style={animated ? { animationDelay: "0.8s" } : undefined}
      />
    </svg>
  )
}
