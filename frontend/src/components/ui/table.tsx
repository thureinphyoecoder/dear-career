import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TableProps = HTMLAttributes<HTMLTableElement> & {
  children: ReactNode;
};

export function Table({ children, className, ...props }: TableProps) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
      <table className={cn("min-w-full border-collapse text-left", className)} {...props}>
        {children}
      </table>
    </div>
  );
}
