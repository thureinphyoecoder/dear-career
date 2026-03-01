"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TrustBadge({
  label,
  domain,
  note,
}: {
  label: string;
  domain: string;
  note: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="group"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <Badge tone="verified" className="cursor-pointer gap-1.5">
          <ShieldCheck className="size-3.5" />
          {label}
          <ChevronDown className={cn("size-3.5 transition", open && "rotate-180")} />
        </Badge>
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-20 w-72 rounded-[14px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 text-left shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold text-[color:var(--color-text)]">{domain}</p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{note}</p>
        </div>
      ) : null}
    </div>
  );
}
