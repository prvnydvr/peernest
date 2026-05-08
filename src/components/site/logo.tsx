import { cn } from "@/lib/utils"
import Image from "next/image"
import logoImg from "@/components/assets/image/image.png"

export function Logo({ className, size = "default" }: { className?: string; size?: "default" | "large" }) {
  const h = size === "large" ? 32 : 24
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src={logoImg}
        alt="PeerNest"
        height={h}
        width={h * 3.5}
        className="object-contain"
        priority
      />
    </div>
  )
}
