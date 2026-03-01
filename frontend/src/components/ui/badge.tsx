import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone =
  | "default"
  | "verified"
  | "ngo"
  | "blue-collar"
  | "white-collar"
  | "warning"
  | "muted";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
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
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
        tone === "default" &&
          "border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)]",
        tone === "verified" &&
          "border-transparent bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)]",
        tone === "ngo" && "border-transparent bg-[color:rgba(124,92,255,0.12)] text-[color:var(--color-accent)]",
        tone === "blue-collar" &&
          "border-transparent bg-[color:rgba(14,165,233,0.12)] text-[color:#0369A1]",
        tone === "white-collar" &&
          "border-transparent bg-[color:rgba(71,85,105,0.12)] text-[color:#334155]",
        tone === "warning" &&
          "border-transparent bg-[color:rgba(245,158,11,0.14)] text-[color:var(--color-warning)]",
        tone === "muted" &&
          "border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] text-[color:var(--color-muted)]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
