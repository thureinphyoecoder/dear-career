import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const buttonStyles = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--color-primary)] text-white shadow-[0_10px_24px_rgba(255,107,107,0.22)] hover:bg-[#f65b5b]",
        secondary:
          "border border-[color:var(--color-border)] bg-white text-[color:var(--color-text)] hover:bg-[color:var(--color-primary-soft)]",
        ghost:
          "bg-transparent text-[color:var(--color-text)] hover:bg-[color:rgba(255,255,255,0.65)]",
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
