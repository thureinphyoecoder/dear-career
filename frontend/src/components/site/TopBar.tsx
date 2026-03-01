"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { getDictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function withLang(href: string, language: "mm" | "en") {
  return language === "en" ? `${href}?lang=en` : href;
}

export function TopBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const language = searchParams.get("lang") === "en" ? "en" : "mm";
  const dictionary = getDictionary(language);
  const navItems = [
    { href: "/jobs", label: language === "mm" ? "အလုပ်ရှာ" : "Find jobs" },
    { href: "/about", label: language === "mm" ? "ယုံကြည်မှု" : "Trust" },
    { href: "/report", label: language === "mm" ? "Report" : "Report" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[color:rgba(160,183,164,0.25)] bg-[rgba(242,242,242,0.92)] px-2 py-5 backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:gap-10">
        <div className="flex items-center gap-3">
          <Link className="flex items-center gap-3" href={withLang("/", language)}>
            <span className="text-[24px] font-semibold tracking-[-0.04em] text-[color:var(--color-text)]">
              dear<span className="italic text-[color:var(--color-primary)]">career</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                className={cn(
                  "inline-flex min-h-10 items-center rounded-full px-4 text-[13.5px] font-medium tracking-[0.02em] transition",
                  pathname === item.href
                    ? "bg-white text-[color:var(--color-text)] shadow-[var(--shadow-glow)]"
                    : "text-[color:var(--color-muted)] hover:bg-white/80 hover:text-[color:var(--color-text)]",
                )}
                href={withLang(item.href, language)}
                key={`${item.href}-${item.label}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageToggle />
          <Link
            className="hidden min-h-10 items-center rounded-full bg-[color:var(--color-primary)] px-5 text-[13px] font-medium text-white transition hover:opacity-90 md:inline-flex"
            href={withLang("/jobs", language)}
          >
            {language === "mm" ? "အလုပ်ကြည့်မယ်" : "Browse jobs"}
          </Link>
        </div>
      </div>
    </header>
  );
}
