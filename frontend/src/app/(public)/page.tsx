import { JobLanding } from "@/components/layout/JobLanding";
import { PublicShell } from "@/components/layout/PublicShell";
import { fetchPublicJobs, parseJobFilters } from "@/lib/api";
import type { SearchParams } from "@/lib/types";

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export const dynamic = "force-dynamic";

export default async function PublicHomePage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const filters = parseJobFilters(params);
  const jobsResult = await fetchPublicJobs(filters);

  const model = {
    ...filters,
    ...jobsResult,
    activeFilters: [filters.q, filters.category, filters.mode].filter(Boolean)
      .length,
    featuredJobsCount: jobsResult.jobs.slice(0, 6).length,
  };

  return (
    <PublicShell>
      <JobLanding model={model} />
    </PublicShell>
  );
}
