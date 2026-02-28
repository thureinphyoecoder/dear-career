import type { ReactNode } from "react";
import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const navItems = [
  { href: "/admin/new", label: "New job" },
  { href: "/admin/sources", label: "Trusted sources" },
];

export function AdminShell({
  children,
  title,
  eyebrow = "Locked admin",
}: {
  children: ReactNode;
  title: string;
  eyebrow?: string;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-[14px] border border-[color:var(--color-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,227,227,0.66))] p-6 shadow-[var(--shadow-soft)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              <LockKeyhole className="size-4" />
              {eyebrow}
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[color:var(--color-text)]">
              {title}
            </h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                className="inline-flex min-h-11 items-center rounded-[12px] border border-[color:var(--color-border)] bg-white px-4 text-sm font-medium text-[color:var(--color-text)] transition hover:bg-[color:var(--color-primary-soft)]"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <Card className="mt-6 p-4 text-sm text-[color:var(--color-muted)]">
        <p className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-[color:var(--color-primary)]" />
          Minimal admin only. Public discovery stays separate from ingestion tools.
        </p>
      </Card>

      <div className="mt-6">{children}</div>
    </div>
  );
}
