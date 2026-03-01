import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-[10px] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 py-3 text-[15px] text-[color:var(--color-text)] outline-none transition placeholder:text-[color:rgba(107,114,128,0.72)] focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:rgba(160,183,164,0.18)]",
        className,
      )}
      {...props}
    />
  );
}
