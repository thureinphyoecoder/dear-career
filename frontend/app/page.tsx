import { HeroSection } from "@/components/home/HeroSection";
import { JobsSection } from "@/components/home/JobsSection";
import { parseJobFilters } from "@/lib/filters";
import { fetchJobs } from "@/lib/jobs";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const filters = parseJobFilters(params);
  const jobsResult = await fetchJobs(filters);
  const model = {
    ...filters,
    ...jobsResult,
    activeFilters: [filters.q, filters.category, filters.mode].filter(Boolean)
      .length,
    featuredJobsCount: jobsResult.jobs.slice(0, 6).length,
  };

  return (
    <main className="px-4 py-6 text-[color:var(--foreground)] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col gap-6 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4 shadow-[var(--shadow)] backdrop-blur-xl sm:p-6 lg:p-8">
        <HeroSection model={model} />
        <JobsSection model={model} />
      </div>
    </main>
  );
}
