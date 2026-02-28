import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: "default" | "soft";
};

export function Badge({
  children,
  className,
  tone = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.16em]",
        tone === "default" &&
          "border-[color:var(--line)] bg-white/80 text-[color:var(--foreground)]",
        tone === "soft" &&
          "border-[color:var(--line)] bg-[color:var(--surface-muted)] text-[color:var(--sage-deep)]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
