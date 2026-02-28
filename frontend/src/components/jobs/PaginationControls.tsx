import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createPageHref } from "@/lib/api";
import { getDictionary } from "@/lib/i18n";
import type { JobFilters, PaginationMeta } from "@/lib/types";

export function PaginationControls({
  filters,
  meta,
}: {
  filters: JobFilters;
  meta: PaginationMeta;
}) {
  const dictionary = getDictionary(filters.lang);

  if (meta.lastPage <= 1) {
    return null;
  }

  const pages = Array.from({ length: meta.lastPage }, (_, index) => index + 1);

  return (
    <div className="space-y-4">
      <div className="flex md:hidden">
        {meta.page < meta.lastPage ? (
          <Link
            className="inline-flex min-h-11 items-center rounded-[12px] bg-[color:var(--color-primary)] px-5 text-sm font-semibold text-white"
            href={createPageHref("/jobs", { ...filters, page: meta.page + 1 })}
          >
            {dictionary.common.loadMore}
          </Link>
        ) : null}
      </div>

      <div className="hidden items-center gap-2 md:flex">
        {pages.map((page) => (
          <Link href={createPageHref("/jobs", { ...filters, page })} key={page}>
            <Button variant={page === meta.page ? "primary" : "secondary"} type="button">
              {page}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
