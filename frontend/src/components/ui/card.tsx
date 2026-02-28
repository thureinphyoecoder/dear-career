import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.5rem] border border-[color:var(--line)] bg-white/78",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
