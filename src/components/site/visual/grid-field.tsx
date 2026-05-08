import { cn } from "@/lib/utils"

/**
 * GridField — PeerNest signature dot constellation backdrop.
 *
 * Replaces generic line grids with a soft dot field. Optional radial
 * mask for a "spotlight from the center" feel.
 */
export function GridField({
  size = "md",
  mask = "radial",
  className,
}: {
  size?: "md" | "lg"
  mask?: "radial" | "top" | "none"
  className?: string
}) {
  const maskClass =
    mask === "radial"
      ? "[mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
      : mask === "top"
      ? "[mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      : ""
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        size === "lg" ? "bg-constellation-lg" : "bg-constellation",
        maskClass,
        className,
      )}
    />
  )
}
