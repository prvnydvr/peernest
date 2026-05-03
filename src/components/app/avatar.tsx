import { initials } from "@/lib/utils";

export function Avatar({ name, imageUrl, size = "md" }: { name: string; imageUrl?: string | null; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "h-14 w-14 text-lg" : size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  if (imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageUrl} alt="" className={`${sizeClass} rounded-lg object-cover ring-1 ring-border`} />;
  }

  return (
    <div className={`${sizeClass} grid shrink-0 place-items-center rounded-lg bg-slate-950 font-semibold text-white`}>
      {initials(name)}
    </div>
  );
}
