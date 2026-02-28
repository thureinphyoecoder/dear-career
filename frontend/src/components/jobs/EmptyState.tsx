import type { ReactNode } from "react";
import { SearchX } from "lucide-react";
import { Card } from "@/components/ui/card";

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)]">
        <SearchX className="size-7" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-[color:var(--color-text)]">{title}</h2>
        <p className="max-w-md text-sm leading-6 text-[color:var(--color-muted)]">{body}</p>
      </div>
      {action}
    </Card>
  );
}
