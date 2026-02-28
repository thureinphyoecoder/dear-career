"use client";

import { Languages } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLanguage = searchParams.get("lang") === "en" ? "en" : "mm";
  const dictionary = getDictionary(currentLanguage);

  function handleToggle(nextLanguage: "mm" | "en") {
    const params = new URLSearchParams(searchParams.toString());

    if (nextLanguage === "mm") {
      params.delete("lang");
    } else {
      params.set("lang", nextLanguage);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border)] bg-white p-1 shadow-[var(--shadow-soft)]">
      <span className="px-2 text-[color:var(--color-muted)]" aria-hidden="true">
        <Languages className="size-4" />
      </span>
      {(["mm", "en"] as const).map((language) => (
        <button
          className={cn(
            "min-h-10 rounded-full px-3 text-sm font-semibold transition",
            currentLanguage === language
              ? "bg-[color:var(--color-primary)] text-white"
              : "text-[color:var(--color-muted)] hover:bg-[color:var(--color-primary-soft)]",
          )}
          key={language}
          onClick={() => handleToggle(language)}
          type="button"
        >
          {language === "mm" ? dictionary.languageName : "EN"}
        </button>
      ))}
    </div>
  );
}
