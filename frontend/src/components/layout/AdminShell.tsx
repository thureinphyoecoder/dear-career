import type { ReactNode } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { PublicShell } from "@/components/layout/PublicShell";

const navItems = [
  { href: "/admin/login", label: "Login" },
  { href: "/admin/submissions", label: "Submissions" },
  { href: "/admin/trusted-sources", label: "Trusted sources" },
];

export function AdminShell({
  children,
  eyebrow = "Admin",
  title,
}: {
  children: ReactNode;
  eyebrow?: string;
  title: string;
}) {
  return (
    <PublicShell>
      <section className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:rgba(160,183,164,0.16)] p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
              <ShieldCheck className="size-4" />
              {eyebrow}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em]">
              {title}
            </h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                className="rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-sm font-medium transition hover:bg-[color:var(--surface-muted)]"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      {children}
    </PublicShell>
  );
}
