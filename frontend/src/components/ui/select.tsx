import type { ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
};

export function Select({ children, className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full rounded-2xl border border-[color:var(--line-strong)] bg-white/90 px-4 py-3 outline-none transition focus:border-[color:var(--sage-deep)]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
