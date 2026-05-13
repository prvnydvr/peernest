import { cn } from "@/lib/utils"
import Image from "next/image"

export function Logo({ className, size = "default" }: { className?: string; size?: "default" | "large" }) {
  const h = size === "large" ? 32 : 24
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/image.png"
        alt="PeerNest"
        height={h}
        width={h * 3.5}
        className="object-contain"
        priority
      />
    </div>
  )
}
