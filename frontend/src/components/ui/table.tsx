import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Table({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableElement> & { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[color:var(--line)]">
      <table className={cn("w-full border-collapse text-left", className)} {...props}>
        {children}
      </table>
    </div>
  );
}
