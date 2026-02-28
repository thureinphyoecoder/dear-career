import Link from "next/link";
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

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <JobFiltersPanel filters={filters} />
      </aside>

      <section className="space-y-6">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[color:var(--color-text)]">
            {dictionary.jobs.title}
          </h1>
          <p className="mt-2 text-base leading-7 text-[color:var(--color-muted)]">
            {dictionary.jobs.subtitle}
          </p>
        </div>

        {jobsResult.jobs.length > 0 ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {jobsResult.jobs.map((job) => (
                <JobCard job={job} key={job.id} language={filters.lang} />
              ))}
            </div>
            <PaginationControls filters={filters} meta={jobsResult.meta} />
          </>
        ) : (
          <EmptyState
            action={
              <Link className={buttonStyles({ variant: "secondary" })} href={createPageHref("/jobs", { lang: filters.lang, page: 1 })}>
                {dictionary.common.reset}
              </Link>
            }
            body={dictionary.jobs.emptyBody}
            title={dictionary.jobs.emptyTitle}
          />
        )}
      </section>
    </div>
  );
}
