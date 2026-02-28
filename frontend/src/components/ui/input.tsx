import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-[color:var(--line-strong)] bg-white/90 px-4 py-3 outline-none transition focus:border-[color:var(--sage-deep)]",
        className,
      )}
      {...props}
    />
  );
}
