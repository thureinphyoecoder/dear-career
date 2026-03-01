import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const buttonStyles = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--color-text)] text-white shadow-[var(--shadow-soft)] hover:translate-y-[-1px] hover:shadow-[var(--shadow-glow)]",
        secondary:
          "border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-[color:var(--color-text)] hover:border-[color:var(--color-primary)] hover:bg-white",
        ghost:
          "bg-transparent text-[color:var(--color-text)] hover:bg-white/70",
        danger: "bg-[color:var(--color-danger)] text-white hover:bg-[#dc3b3b]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    children: ReactNode;
  };

export function Button({
  children,
  className,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonStyles({ variant }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
