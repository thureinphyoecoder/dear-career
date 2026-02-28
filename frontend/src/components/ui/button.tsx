import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition",
        variant === "primary" &&
          "bg-[color:var(--foreground)] text-[color:var(--background)] hover:bg-[color:var(--sage-deep)]",
        variant === "secondary" &&
          "border border-[color:var(--line-strong)] bg-white/70 hover:bg-[color:var(--surface-muted)]",
        variant === "ghost" &&
          "border border-[color:var(--line)] hover:bg-white/60",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
