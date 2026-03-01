import type { ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
};

export function Select({ children, className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "min-h-11 w-full rounded-[10px] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 py-3 text-[15px] text-[color:var(--color-text)] outline-none transition focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:rgba(160,183,164,0.18)]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
