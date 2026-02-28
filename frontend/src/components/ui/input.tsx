import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-[10px] border border-[color:var(--color-border)] bg-white px-4 py-3 text-[15px] text-[color:var(--color-text)] outline-none transition placeholder:text-[color:rgba(107,114,128,0.72)] focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:rgba(255,107,107,0.16)]",
        className,
      )}
      {...props}
    />
  );
}
