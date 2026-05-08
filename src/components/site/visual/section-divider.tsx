import { cn } from "@/lib/utils"
import { Constellation } from "./constellation"
import { SignatureMark } from "./signature-mark"

/**
 * SectionDivider — a thin horizontal interlude between sections.
 *
 * Shows an animated constellation rail with the signature mark anchored
 * in the middle. Used to give the page a recognizable "heartbeat".
 */
export function SectionDivider({
  label,
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      aria-hidden={!label}
      className={cn("relative h-24 sm:h-28 overflow-hidden", className)}
    >
      <Constellation variant="rail" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-3 rounded-full border border-border/60 bg-background/80 backdrop-blur-md px-4 py-1.5 shadow-[0_8px_28px_-12px_oklch(0.52_0.22_280/0.4)]">
          <SignatureMark size={14} />
          {label && (
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              {label}
            </span>
          )}
        </div>
      </div>

      {/* subtle baseline rule */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  )
}
