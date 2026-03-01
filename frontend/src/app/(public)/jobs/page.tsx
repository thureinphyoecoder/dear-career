import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { EmptyState } from "@/components/jobs/EmptyState";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFiltersPanel } from "@/components/jobs/JobFiltersPanel";
import { PaginationControls } from "@/components/jobs/PaginationControls";
import { buttonStyles } from "@/components/ui/button";
import { createPageHref, fetchPublicJobs, parseJobFilters } from "@/lib/api";
import { getDictionary } from "@/lib/i18n";
import type { SearchParams } from "@/lib/types";

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export const dynamic = "force-dynamic";

export default async function JobsPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const filters = parseJobFilters(params);
  const jobsResult = await fetchPublicJobs(filters);
  const dictionary = getDictionary(filters.lang);
  const activeFilters = [
    filters.q ? `Search: ${filters.q}` : null,
    filters.category ? `Category: ${filters.category}` : null,
    filters.type ? `Type: ${filters.type}` : null,
    filters.mode ? `Mode: ${filters.mode}` : null,
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-8">
      <section className="grid gap-6 border-b border-[color:var(--color-border)] pb-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
        <div>
          <h1 className="text-[34px] font-semibold tracking-[-0.05em] text-[color:var(--color-text)] sm:text-[48px]">
            {dictionary.jobs.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[color:var(--color-soft)]">
            {dictionary.jobs.subtitle}
          </p>
          {activeFilters.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {activeFilters.map((item) => (
                <span
                  className="inline-flex min-h-10 items-center rounded-full border border-[color:rgba(160,183,164,0.4)] bg-white px-4 text-sm font-medium text-[color:var(--color-text)]"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="text-left lg:text-right">
          <div className="text-[28px] font-semibold tracking-[-0.04em] text-[color:var(--color-text)]">
            {jobsResult.meta.total}
          </div>
          <div className="mt-1 text-sm font-medium text-[color:var(--color-soft)]">jobs</div>
        </div>
      </section>

      <div className="grid gap-10 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <JobFiltersPanel filters={filters} />
        </aside>

        <section className="space-y-6">
          <div className="flex flex-col gap-4 rounded-[18px] border border-[color:var(--color-border)] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm font-medium text-[color:var(--color-text)]">
              <ShieldCheck className="size-4 text-[color:var(--color-primary)]" />
              Verified badges and source domains stay visible before apply.
            </p>
            <Link className={buttonStyles({ variant: "secondary" })} href={createPageHref("/about#trust", { lang: filters.lang })}>
              Trust & Safety
            </Link>
          </div>

          {jobsResult.jobs.length > 0 ? (
            <>
              <div className="grid gap-5 xl:grid-cols-2">
                {jobsResult.jobs.map((job) => (
                  <JobCard job={job} key={job.id} language={filters.lang} />
                ))}
              </div>
              <PaginationControls filters={filters} meta={jobsResult.meta} />
            </>
          ) : (
            <div className="rounded-[22px] border border-[color:var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
              <EmptyState
                action={
                  <Link className={buttonStyles({ variant: "secondary" })} href={createPageHref("/jobs", { lang: filters.lang, page: 1 })}>
                    {dictionary.common.reset}
                  </Link>
                }
                body={dictionary.jobs.emptyBody}
                title={dictionary.jobs.emptyTitle}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
