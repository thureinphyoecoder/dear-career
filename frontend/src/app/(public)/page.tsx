import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFiltersPanel } from "@/components/jobs/JobFiltersPanel";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createPageHref, fetchPublicJobs, parseJobFilters } from "@/lib/api";
import { getDictionary } from "@/lib/i18n";
import type { SearchParams } from "@/lib/types";

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const filters = parseJobFilters(params);
  const jobsResult = await fetchPublicJobs({
    ...filters,
    page: 1,
  });
  const dictionary = getDictionary(filters.lang);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(255,227,227,0.88))] p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--color-primary)]">
            <Sparkles className="size-4" />
            Burmese-first curated jobs
          </div>
          <h1 className="mt-5 max-w-3xl text-[28px] font-semibold leading-tight tracking-[-0.03em] text-[color:var(--color-text)] sm:text-[44px]">
            {dictionary.home.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--color-muted)]">
            {dictionary.home.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className={buttonStyles()} href={createPageHref("/jobs", { lang: filters.lang })}>
                {dictionary.home.cta}
                <ArrowRight className="size-4" />
            </Link>
            <Link
              className={buttonStyles({ variant: "secondary" })}
              href={createPageHref("/about#trust", { lang: filters.lang })}
            >
                {dictionary.home.trustCta}
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { label: "White-collar", value: "white-collar" },
              { label: "Blue-collar", value: "blue-collar" },
              { label: "NGO", value: "ngo" },
            ].map((item) => (
              <Link
                className="inline-flex min-h-11 items-center rounded-full border border-[color:var(--color-border)] bg-white px-4 text-sm font-medium text-[color:var(--color-text)] transition hover:bg-[color:var(--color-primary-soft)]"
                href={createPageHref("/jobs", { lang: filters.lang, category: item.value, page: 1 })}
                key={item.value}
              >
                {item.label}
              </Link>
            ))}
            <span className="inline-flex min-h-11 items-center rounded-full bg-[color:var(--color-primary-soft)] px-4 text-sm font-medium text-[color:var(--color-primary)]">
              {dictionary.home.todayChip}
            </span>
          </div>
        </Card>

        <JobFiltersPanel filters={filters} mode="compact" />
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[color:var(--color-text)]">
              {dictionary.home.latest}
            </h2>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">
              3-4 quality jobs a day, with trusted-source cues before you apply.
            </p>
          </div>
          <Link
            className={buttonStyles({ variant: "secondary" })}
            href={createPageHref("/jobs", { lang: filters.lang })}
          >
              {dictionary.common.seeAll}
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {jobsResult.jobs.slice(0, 6).map((job) => (
            <JobCard job={job} key={job.id} language={filters.lang} />
          ))}
        </div>
      </section>

      <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]">
            <ShieldCheck className="size-4 text-[color:var(--color-primary)]" />
            {dictionary.home.trustStrip}
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
            Verified badge, trusted domains, and external-link warnings are always visible.
          </p>
        </div>
        <Link
          className={cn(buttonStyles({ variant: "secondary" }), "self-start sm:self-auto")}
          href={createPageHref("/about#trust", { lang: filters.lang })}
        >
            {dictionary.home.trustCta}
        </Link>
      </Card>
    </div>
  );
}
