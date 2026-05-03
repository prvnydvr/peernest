"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      richColors
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "border border-white/10 bg-slate-950 text-white",
        },
      }}
    />
  );
}
