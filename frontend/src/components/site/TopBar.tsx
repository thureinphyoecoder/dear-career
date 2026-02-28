"use client";

import Link from "next/link";
import { BriefcaseBusiness, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { getDictionary } from "@/lib/i18n";

function withLang(href: string, language: "mm" | "en") {
  return language === "en" ? `${href}?lang=en` : href;
}

export function TopBar() {
  const searchParams = useSearchParams();
  const language = searchParams.get("lang") === "en" ? "en" : "mm";
  const dictionary = getDictionary(language);

  return (
    <header className="rounded-[18px] border border-[color:var(--color-border)] bg-[rgba(255,255,255,0.86)] px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur sm:px-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link className="flex items-center gap-3" href={withLang("/", language)}>
            <span className="flex size-11 items-center justify-center rounded-[14px] bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)]">
              <BriefcaseBusiness className="size-5" />
            </span>
            <span>
              <span className="block text-base font-semibold text-[color:var(--color-text)]">
                {dictionary.appName}
              </span>
              <span className="flex items-center gap-1 text-xs text-[color:var(--color-muted)]">
                <ShieldCheck className="size-3.5 text-[color:var(--color-primary)]" />
                Trusted-source jobs
              </span>
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <nav className="hidden items-center gap-2 md:flex">
            {[
              { href: "/", label: dictionary.nav.home },
              { href: "/jobs", label: dictionary.nav.jobs },
              { href: "/about", label: dictionary.nav.about },
              { href: "/report", label: dictionary.nav.report },
            ].map((item) => (
              <Link
                className="inline-flex min-h-11 items-center rounded-[12px] px-4 text-sm font-medium text-[color:var(--color-text)] transition hover:bg-[color:var(--color-primary-soft)]"
                href={withLang(item.href, language)}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
