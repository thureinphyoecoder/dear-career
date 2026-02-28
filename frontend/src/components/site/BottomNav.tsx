"use client";

import Link from "next/link";
import { BriefcaseBusiness, CircleHelp, Home } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function withLang(href: string, language: "mm" | "en") {
  return language === "en" ? `${href}?lang=en` : href;
}

export function BottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const language = searchParams.get("lang") === "en" ? "en" : "mm";
  const dictionary = getDictionary(language);

  const items = [
    { href: "/", label: dictionary.nav.home, icon: Home },
    { href: "/jobs", label: dictionary.nav.jobs, icon: BriefcaseBusiness },
    { href: "/about", label: dictionary.nav.about, icon: CircleHelp },
  ];

  return (
    <nav className="fixed inset-x-4 bottom-4 z-40 rounded-[18px] border border-[color:var(--color-border)] bg-[rgba(255,255,255,0.94)] p-2 shadow-[var(--shadow-soft)] backdrop-blur md:hidden">
      <ul className="grid grid-cols-3 gap-1">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-1 rounded-[14px] text-xs font-medium transition",
                  active
                    ? "bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)]"
                    : "text-[color:var(--color-muted)] hover:bg-[color:var(--color-surface-muted)]",
                )}
                href={withLang(item.href, language)}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
