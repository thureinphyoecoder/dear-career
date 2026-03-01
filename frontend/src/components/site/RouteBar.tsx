"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getDictionary } from "@/lib/i18n";

const LABELS: Record<string, { mm: string; en: string; noteMm: string; noteEn: string }> = {
  "/": {
    mm: "ပင်မ",
    en: "Home",
    noteMm: "Curated job discovery landing page",
    noteEn: "Curated job discovery landing page",
  },
  "/jobs": {
    mm: "အလုပ်များ",
    en: "Jobs",
    noteMm: "Filter လုပ်ပြီး original listing ဆီသွားမယ့် desktop listing view",
    noteEn: "Desktop listing view with filters and original listing links",
  },
  "/about": {
    mm: "ယုံကြည်မှု",
    en: "Trust",
    noteMm: "Trust & Safety, sources, and curation policy",
    noteEn: "Trust & Safety, sources, and curation policy",
  },
  "/report": {
    mm: "Report",
    en: "Report",
    noteMm: "Misleading or suspicious jobs ကို report လုပ်ရန်",
    noteEn: "Report misleading or suspicious jobs",
  },
  "/privacy": {
    mm: "Privacy",
    en: "Privacy",
    noteMm: "Privacy policy",
    noteEn: "Privacy policy",
  },
  "/terms": {
    mm: "Terms",
    en: "Terms",
    noteMm: "Terms and usage rules",
    noteEn: "Terms and usage rules",
  },
};

function resolveRoute(pathname: string) {
  if (pathname.startsWith("/jobs/")) {
    return {
      mm: "အလုပ်အသေးစိတ်",
      en: "Job Detail",
      noteMm: "Selected job summary, trust note, and original apply link",
      noteEn: "Selected job summary, trust note, and original apply link",
    };
  }

  return LABELS[pathname] ?? LABELS["/"];
}

export function RouteBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const language = searchParams.get("lang") === "en" ? "en" : "mm";
  const dictionary = getDictionary(language);

  if (pathname === "/") {
    return null;
  }

  const route = resolveRoute(pathname);
  const visiblePath = language === "en"
    ? pathname
    : pathname === "/"
      ? "/"
      : `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  return (
    <div className="hidden items-center justify-between border-b border-[color:var(--color-border)] py-4 lg:flex">
      <div>
        <div className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-soft)]">
          {dictionary.appName}
        </div>
        <div className="mt-1 flex items-center gap-3">
          <p className="text-lg font-semibold text-[color:var(--color-text)]">
            {language === "mm" ? route.mm : route.en}
          </p>
          <span className="rounded-full border border-[color:rgba(160,183,164,0.35)] bg-white px-3 py-1 text-xs font-medium text-[color:var(--color-muted)]">
            {visiblePath}
          </span>
        </div>
      </div>
      <p className="max-w-xl text-right text-sm text-[color:var(--color-soft)]">
        {language === "mm" ? route.noteMm : route.noteEn}
      </p>
    </div>
  );
}
